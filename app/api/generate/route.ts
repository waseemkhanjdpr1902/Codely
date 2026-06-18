import { NextRequest, NextResponse } from 'next/server';
import vm from 'node:vm';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type GenerateMode = 'execute' | 'ai' | 'app' | 'code' | 'error' | 'ui' | 'prompt-app';

type GenerateBody = {
  mode?: GenerateMode;
  code?: string;
  language?: string;
  prompt?: string;
  fileName?: string;
  category?: string;
  targetUsers?: string;
  features?: string;
  designStyle?: string;
  errorMessage?: string;
};

type GeneratedFile = {
  path: string;
  content: string;
};

type GeneratedApp = {
  appName: string;
  description: string;
  plan: string;
  pages: string[];
  components: string[];
  techStack: string[];
  files: GeneratedFile[];
};

const notConfiguredMessage = 'AI service is not configured yet. Please add API key in Vercel.';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Codely API is ready',
    modes: ['execute', 'app', 'code', 'error', 'ui', 'prompt-app'],
    providers: ['gemini', 'openai', 'groq'],
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as GenerateBody;

    if (!body.mode || body.mode === 'execute') {
      return NextResponse.json(await executeCode(body));
    }

    if (body.mode === 'ai' || body.mode === 'code') {
      return NextResponse.json(await generateCode(body));
    }

    if (body.mode === 'app') {
      return NextResponse.json(await generateApp(body));
    }

    if (body.mode === 'error') {
      return NextResponse.json(await fixError(body));
    }

    if (body.mode === 'ui') {
      return NextResponse.json(await improveUi(body));
    }

    if (body.mode === 'prompt-app') {
      return NextResponse.json(await promptToApp(body));
    }

    return NextResponse.json({ success: false, error: 'Unsupported generation mode.' }, { status: 400 });
  } catch (error: any) {
    const status = error?.message === notConfiguredMessage ? 503 : 500;
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Request failed.',
        output: error.message || 'Request failed.',
      },
      { status }
    );
  }
}

async function generateApp({ prompt = '', targetUsers = '', features = '', designStyle = '', category = 'App Builder' }: GenerateBody) {
  const cleanPrompt = prompt.trim();
  if (!cleanPrompt) return { success: false, error: 'Describe the app you want Codely to generate.' };

  const raw = await generateAiText({
    json: true,
    system: getJsonSystemPrompt(
      '{"appName":"","description":"","plan":"","pages":[""],"components":[""],"techStack":[""],"files":[{"path":"app/page.tsx","content":""}]}'
    ),
    user: [
      `Tool category: ${category}`,
      `App request: ${cleanPrompt}`,
      `Target users: ${targetUsers || 'Non-technical users'}`,
      `Features needed: ${features || 'Simple core features'}`,
      `Design style: ${designStyle || 'Clean and mobile friendly'}`,
      'Return a clear plan for non-coders and 4 to 8 starter files for a Next.js App Router app.',
    ].join('\n'),
  });

  return {
    success: true,
    provider: raw.provider,
    app: parseGeneratedApp(raw.text),
  };
}

async function generateCode({ prompt = '', category = 'Code Generator' }: GenerateBody) {
  const cleanPrompt = prompt.trim();
  if (!cleanPrompt) return { success: false, error: 'Describe the code you want Codely to generate.' };

  const raw = await generateAiText({
    json: true,
    system: getJsonSystemPrompt('{"title":"","summary":"","output":"","files":[{"path":"index.html","content":""}]}'),
    user: [
      `Tool category: ${category}`,
      `Requirement: ${cleanPrompt}`,
      'Generate practical working code. Prefer HTML/CSS/JS for simple tools or React/Next.js when the request asks for a component.',
      'Explain the result in simple English in output, and include copyable code files.',
    ].join('\n'),
  });

  return normalizeGenericGeneration(raw.text, raw.provider, 'Generated code');
}

async function fixError({ errorMessage = '', code = '', category = 'Error Fixer' }: GenerateBody) {
  if (!errorMessage.trim() || !code.trim()) {
    return { success: false, error: 'Paste both the error message and the code snippet.' };
  }

  const raw = await generateAiText({
    json: true,
    system: getJsonSystemPrompt('{"title":"","summary":"","output":"","files":[{"path":"fixed-code.txt","content":""}]}'),
    user: [
      `Tool category: ${category}`,
      `Error message:\n${errorMessage}`,
      `Broken code:\n${code}`,
      'Explain the reason in simple language, then provide fixed code.',
    ].join('\n\n'),
  });

  return normalizeGenericGeneration(raw.text, raw.provider, 'Fixed code');
}

async function improveUi({ code = '', designStyle = '', category = 'UI Enhancer' }: GenerateBody) {
  if (!code.trim()) return { success: false, error: 'Paste the component or code you want to improve.' };

  const raw = await generateAiText({
    json: true,
    system: getJsonSystemPrompt('{"title":"","summary":"","output":"","files":[{"path":"improved-ui.tsx","content":""}]}'),
    user: [
      `Tool category: ${category}`,
      `Desired style: ${designStyle || 'Clean, modern, mobile friendly'}`,
      `Existing code:\n${code}`,
      'Improve the UI code and list the design suggestions in simple English.',
    ].join('\n\n'),
  });

  return normalizeGenericGeneration(raw.text, raw.provider, 'Improved UI');
}

async function promptToApp({ prompt = '', category = 'Prompt to App' }: GenerateBody) {
  const cleanPrompt = prompt.trim();
  if (!cleanPrompt) return { success: false, error: 'Describe your app idea in plain English.' };

  const raw = await generateAiText({
    json: true,
    system: getJsonSystemPrompt('{"title":"","summary":"","output":"","files":[{"path":"starter.tsx","content":""}]}'),
    user: [
      `Tool category: ${category}`,
      `Plain English idea: ${cleanPrompt}`,
      'Return a step-by-step build plan, MVP features, and starter code. Keep the explanation beginner friendly.',
    ].join('\n'),
  });

  return normalizeGenericGeneration(raw.text, raw.provider, 'Prompt to app');
}

async function generateAiText({
  system,
  user,
  json,
}: {
  system: string;
  user: string;
  json?: boolean;
}): Promise<{ provider: 'gemini' | 'openai' | 'groq'; text: string }> {
  const errors: string[] = [];

  if (process.env.GEMINI_API_KEY) {
    try {
      return { provider: 'gemini', text: await generateWithGemini(system, user, Boolean(json)) };
    } catch (error: any) {
      errors.push(`Gemini: ${error.message || 'failed'}`);
    }
  }

  if (process.env.OPENAI_API_KEY) {
    try {
      return { provider: 'openai', text: await generateWithOpenAI(system, user, Boolean(json)) };
    } catch (error: any) {
      errors.push(`OpenAI: ${error.message || 'failed'}`);
    }
  }

  if (process.env.GROQ_API_KEY) {
    try {
      return { provider: 'groq', text: await generateWithGroq(system, user, Boolean(json)) };
    } catch (error: any) {
      errors.push(`Groq: ${error.message || 'failed'}`);
    }
  }

  if (!process.env.GEMINI_API_KEY && !process.env.OPENAI_API_KEY && !process.env.GROQ_API_KEY) {
    throw new Error(notConfiguredMessage);
  }

  throw new Error(`AI providers failed. ${errors.join(' | ')}`);
}

async function generateWithGemini(system: string, user: string, json: boolean) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          generationConfig: {
            temperature: 0.35,
            ...(json ? { responseMimeType: 'application/json' } : {}),
          },
          contents: [
            {
              role: 'user',
              parts: [{ text: `${system}\n\n${user}` }],
            },
          ],
        }),
      }
    );

    if (!response.ok) throw new Error(`Gemini returned ${response.status}`);
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  } finally {
    clearTimeout(timeout);
  }
}

async function generateWithOpenAI(system: string, user: string, json: boolean) {
  const OpenAI = (await import('openai')).default;
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, timeout: 30000 });
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    ...(json ? { response_format: { type: 'json_object' as const } } : {}),
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
  });

  return completion.choices[0]?.message?.content || '';
}

async function generateWithGroq(system: string, user: string, json: boolean) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        temperature: 0.35,
        ...(json ? { response_format: { type: 'json_object' } } : {}),
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
      }),
    });

    if (!response.ok) throw new Error(`Groq returned ${response.status}`);
    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
  } finally {
    clearTimeout(timeout);
  }
}

function getJsonSystemPrompt(schema: string) {
  return [
    'You are Codely, an AI app and tool builder for non-coders.',
    'Use simple English and avoid developer jargon unless code requires it.',
    'Return only valid JSON. Do not include markdown fences.',
    `The JSON schema must match this shape: ${schema}`,
    'All files must include a safe relative path and complete file content.',
    'Do not include secrets, private API keys, or instructions that expose environment variables to the browser.',
  ].join('\n');
}

function parseGeneratedApp(raw: string): GeneratedApp {
  const parsed = JSON.parse(extractJson(raw));
  const files = normalizeFiles(parsed.files);
  if (!parsed.appName || !files.length) throw new Error('AI response did not include a usable app.');

  return {
    appName: String(parsed.appName).slice(0, 80),
    description: String(parsed.description || 'A generated Codely app.').slice(0, 240),
    plan: String(parsed.plan || parsed.description || 'Build the core screen first, then add saving and deployment.'),
    pages: normalizeStringArray(parsed.pages),
    components: normalizeStringArray(parsed.components),
    techStack: normalizeStringArray(parsed.techStack),
    files,
  };
}

function normalizeGenericGeneration(raw: string, provider: string, fallbackTitle: string) {
  const parsed = JSON.parse(extractJson(raw));
  const files = normalizeFiles(parsed.files);

  return {
    success: true,
    provider,
    title: String(parsed.title || fallbackTitle).slice(0, 100),
    summary: String(parsed.summary || 'Codely generated a result.').slice(0, 240),
    output: String(parsed.output || parsed.summary || 'Generation complete.'),
    files,
  };
}

function normalizeFiles(value: any): GeneratedFile[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((file) => file?.path && typeof file.content === 'string')
    .map((file) => ({
      path: sanitizePath(String(file.path)),
      content: String(file.content),
    }))
    .filter((file) => file.path)
    .slice(0, 12);
}

function normalizeStringArray(value: any): string[] {
  if (Array.isArray(value)) return value.map((item) => String(item)).filter(Boolean).slice(0, 12);
  if (typeof value === 'string' && value.trim()) return [value.trim()];
  return [];
}

function extractJson(raw: string) {
  const trimmed = raw.trim();
  if (!trimmed) throw new Error('AI returned an empty response.');
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) return trimmed;

  const start = trimmed.indexOf('{');
  const end = trimmed.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) throw new Error('AI response did not contain JSON.');
  return trimmed.slice(start, end + 1);
}

function sanitizePath(path: string) {
  return path
    .replace(/\\/g, '/')
    .replace(/^\/+/, '')
    .split('/')
    .filter((part) => part && part !== '.' && part !== '..')
    .join('/');
}

async function executeCode({ code = '', language = 'javascript' }: GenerateBody) {
  if (!code.trim()) return { success: false, output: 'No code provided.' };
  if (language === 'javascript') return executeJavaScriptLocally(code);

  try {
    const response = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language,
        version: '*',
        files: [{ content: code }],
      }),
    });

    if (!response.ok) throw new Error(`Runner returned ${response.status}`);
    const data = await response.json();
    return {
      success: true,
      output: data.run?.output || data.message || 'Program finished with no output.',
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
      log: (...args: unknown[]) => logs.push(args.map(formatLogArg).join(' ')),
      error: (...args: unknown[]) => logs.push(args.map(formatLogArg).join(' ')),
    },
  };

  try {
    vm.createContext(sandbox);
    vm.runInContext(code, sandbox, { timeout: 1500 });
    return {
      success: true,
      output: logs.join('\n') || 'Program finished with no output.',
    };
  } catch (error: any) {
    return {
      success: false,
      output: `Runtime error: ${error.message}`,
    };
  }
}

function formatLogArg(arg: unknown) {
  return typeof arg === 'string' ? arg : JSON.stringify(arg);
}
