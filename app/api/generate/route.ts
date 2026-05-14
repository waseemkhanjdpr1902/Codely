import { NextRequest, NextResponse } from "next/server";
import vm from "node:vm";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type GenerateBody = {
  mode?: "execute" | "ai" | "app";
  code?: string;
  language?: string;
  prompt?: string;
  fileName?: string;
  category?: string;
};

type GeneratedApp = {
  appName: string;
  description: string;
  files: Array<{
    path: string;
    content: string;
  }>;
};

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Codely API is ready",
    modes: ["execute", "ai", "app"],
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as GenerateBody;

    if (body.mode === "app") {
      return NextResponse.json(await generateApp(body));
    }

    if (body.mode === "ai") {
      return NextResponse.json(await generateCode(body));
    }

    return NextResponse.json(await executeCode(body));
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Request failed.",
        output: `Error: ${error.message || "Request failed"}`,
      },
      { status: 500 }
    );
  }
}

async function generateApp({ prompt = "", category = "Website" }: GenerateBody) {
  const cleanPrompt = prompt.trim();

  if (!cleanPrompt) {
    return {
      success: false,
      error: "Describe the app you want Codely to generate.",
    };
  }

  if (process.env.OPENAI_API_KEY) {
    try {
      const raw = await generateWithOpenAI(cleanPrompt, category);
      return {
        success: true,
        provider: "openai",
        app: parseGeneratedApp(raw),
      };
    } catch (error: any) {
      return {
        success: false,
        error: `OpenAI generation failed: ${error.message || "Unknown error"}`,
      };
    }
  }

  if (process.env.GEMINI_API_KEY) {
    try {
      const raw = await generateWithGemini(cleanPrompt, category);
      return {
        success: true,
        provider: "gemini",
        app: parseGeneratedApp(raw),
      };
    } catch (error: any) {
      return {
        success: false,
        error: `Gemini generation failed: ${error.message || "Unknown error"}`,
      };
    }
  }

  return {
    success: false,
    error: "Missing API key. Add OPENAI_API_KEY or GEMINI_API_KEY in Vercel environment variables.",
  };
}

async function generateWithOpenAI(prompt: string, category: string) {
  const OpenAI = (await import("openai")).default;
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    timeout: 25000,
  });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: getAppGenerationSystemPrompt(),
      },
      {
        role: "user",
        content: `Category: ${category}\nApp request: ${prompt}`,
      },
    ],
  });

  return completion.choices[0]?.message?.content || "";
}

async function generateWithGemini(prompt: string, category: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.4,
          },
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `${getAppGenerationSystemPrompt()}\n\nCategory: ${category}\nApp request: ${prompt}`,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini returned ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  } finally {
    clearTimeout(timeout);
  }
}

function getAppGenerationSystemPrompt() {
  return [
    "You are Codely, an AI app builder.",
    "Return only valid JSON. Do not include markdown fences.",
    "The JSON schema must be exactly:",
    '{"appName":"","description":"","files":[{"path":"app/page.tsx","content":""}]}',
    "Generate an MVP Next.js App Router project structure.",
    "Include 4 to 8 useful files.",
    "Use TypeScript/TSX, simple Tailwind classes, and clean readable code.",
    "Do not include secrets, package installation steps, Supabase, Razorpay, or GitHub API code.",
    "Recommended paths include app/page.tsx, app/layout.tsx, components/*.tsx, styles/globals.css, README.md.",
  ].join("\n");
}

function parseGeneratedApp(raw: string): GeneratedApp {
  if (!raw.trim()) {
    throw new Error("AI returned an empty response.");
  }

  const jsonText = extractJson(raw);
  let parsed: GeneratedApp;

  try {
    parsed = JSON.parse(jsonText);
  } catch {
    throw new Error("AI returned malformed JSON.");
  }

  if (!parsed.appName || !parsed.description || !Array.isArray(parsed.files)) {
    throw new Error("AI response is missing appName, description, or files.");
  }

  const files = parsed.files
    .filter((file) => file?.path && typeof file.content === "string")
    .map((file) => ({
      path: sanitizePath(file.path),
      content: file.content,
    }))
    .filter((file) => file.path)
    .slice(0, 12);

  if (files.length === 0) {
    throw new Error("AI response did not include usable files.");
  }

  return {
    appName: parsed.appName.slice(0, 80),
    description: parsed.description.slice(0, 240),
    files,
  };
}

function extractJson(raw: string) {
  const trimmed = raw.trim();

  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    return trimmed;
  }

  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    throw new Error("AI response did not contain JSON.");
  }

  return trimmed.slice(start, end + 1);
}

function sanitizePath(path: string) {
  return path
    .replace(/\\/g, "/")
    .replace(/^\/+/, "")
    .split("/")
    .filter((part) => part && part !== "." && part !== "..")
    .join("/");
}

async function executeCode({ code = "", language = "javascript" }: GenerateBody) {
  if (!code.trim()) {
    return { success: false, output: "No code provided." };
  }

  if (language === "javascript") {
    return executeJavaScriptLocally(code);
  }

  try {
    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language,
        version: "*",
        files: [{ content: code }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Runner returned ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      output: data.run?.output || data.message || "Program finished with no output.",
    };
  } catch (error: any) {
    return {
      success: false,
      output: `Remote runner unavailable: ${error.message}`,
    };
  }
}

function executeJavaScriptLocally(code: string) {
  const logs: string[] = [];
  const sandbox = {
    console: {
      log: (...args: unknown[]) =>
        logs.push(args.map((arg) => (typeof arg === "string" ? arg : JSON.stringify(arg))).join(" ")),
      error: (...args: unknown[]) =>
        logs.push(args.map((arg) => (typeof arg === "string" ? arg : JSON.stringify(arg))).join(" ")),
    },
  };

  try {
    vm.createContext(sandbox);
    vm.runInContext(code, sandbox, { timeout: 1500 });

    return {
      success: true,
      output: logs.join("\n") || "Program finished with no output.",
    };
  } catch (error: any) {
    return {
      success: false,
      output: `Runtime error: ${error.message}`,
    };
  }
}

async function generateCode({ code = "", prompt = "", fileName = "file.js" }: GenerateBody) {
  if (!prompt.trim()) {
    return { success: false, output: "Describe the change you want AI to make." };
  }

  if (process.env.OPENAI_API_KEY) {
    try {
      const OpenAI = (await import("openai")).default;
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are Codely, a concise coding assistant. Return only the complete updated file contents, no markdown fences.",
          },
          {
            role: "user",
            content: `File: ${fileName}\nRequest: ${prompt}\n\nCurrent file:\n${code}`,
          },
        ],
      });

      const nextCode = completion.choices[0]?.message?.content?.trim();
      if (nextCode) {
        return {
          success: true,
          code: nextCode,
          output: `AI updated ${fileName}.`,
        };
      }
    } catch (error: any) {
      return localAiSuggestion(code, prompt, fileName, error.message);
    }
  }

  return localAiSuggestion(code, prompt, fileName);
}

function localAiSuggestion(code: string, prompt: string, fileName: string, reason?: string) {
  const banner =
    fileName.endsWith(".css")
      ? `/* Codely AI note: ${prompt} */\n`
      : fileName.endsWith(".html")
        ? `<!-- Codely AI note: ${prompt} -->\n`
        : `// Codely AI note: ${prompt}\n`;

  return {
    success: true,
    code: `${banner}${code}`,
    output: reason
      ? `OpenAI was unavailable (${reason}). Added a local AI note to ${fileName}.`
      : `OpenAI is not configured. Added a local AI note to ${fileName}.`,
  };
}
