import { NextRequest, NextResponse } from "next/server";
import vm from "node:vm";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type GenerateBody = {
  mode?: "execute" | "ai";
  code?: string;
  language?: string;
  prompt?: string;
  fileName?: string;
};

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Codely API is ready",
    modes: ["execute", "ai"],
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as GenerateBody;

    if (body.mode === "ai") {
      return NextResponse.json(await generateCode(body));
    }

    return NextResponse.json(await executeCode(body));
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        output: `Error: ${error.message || "Request failed"}`,
      },
      { status: 500 }
    );
  }
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
