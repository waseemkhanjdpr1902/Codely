import { NextRequest, NextResponse } from 'next/server';
import vm from 'node:vm';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type GenerateMode = 'execute' | 'ai' | 'app' | 'code' | 'error' | 'ui' | 'prompt-app';
type ProviderName = 'gemini' | 'openai' | 'groq';

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
  template?: string;
  techStack?: string[];
};

type ProviderDetail = {
  provider: ProviderName | 'server';
  status?: number;
  reason: string;
};

type GeneratedFile = {
  path: string;
  content: string;
};

type CodelyOutput = {
  plan: string;
  pages: string[];
  features: string[];
  code: string;
  readme: string;
  files: GeneratedFile[];
};

type ProviderAttempt = {
  provider: ProviderName;
  text: string;
};

class ProviderError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ProviderError';
    this.status = status;
  }
}

const noKeyMessage = 'AI generation is not configured correctly. Please check API keys in Vercel.';
const geminiModels = ['gemini-1.5-flash', 'gemini-1.5-flash-latest', 'gemini-2.0-flash'];

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Codely generation API is ready',
    modes: ['execute', 'app', 'code', 'error', 'ui', 'prompt-app'],
    providers: ['gemini', 'openai', 'groq'],
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await readBody(request);

    if (!body.mode || body.mode === 'execute') {
      return NextResponse.json(await executeCode(body));
    }

    const validationError = validateBody(body);
    if (validationError) {
      return NextResponse.json({
        success: false,
        message: validationError,
        details: [{ provider: 'server', reason: validationError }],
      });
    }

    const generationRequest = createGenerationRequest(body);
    const result = await runProviderFallback(generationRequest.system, generationRequest.user);

    if (!result.success) {
      return NextResponse.json(result);
    }

    const normalized = normalizeAiOutput(result.output, body);
    const techStack = body.techStack?.length ? body.techStack : ['Next.js', 'React', 'TypeScript', 'Tailwind'];

    return NextResponse.json({
      success: true,
      provider: result.provider,
      output: normalized,
      // Backward-compatible fields used by the current builder UI.
      title: getTitle(body),
      summary: normalized.plan,
      files: normalized.files,
      app:
        body.mode === 'app'
          ? {
              appName: getTitle(body),
              description: normalized.plan,
              plan: normalized.plan,
              pages: normalized.pages,
              components: normalized.features,
              techStack,
              files: normalized.files,
            }
          : undefined,
    });
  } catch (error) {
    const detail = normalizeUnknownError(error);
    logGenerateError('server', detail);
    return NextResponse.json({
      success: false,
      message: 'AI generation failed.',
      details: [detail],
    });
  }
}

async function readBody(request: NextRequest): Promise<GenerateBody> {
  try {
    return (await request.json()) as GenerateBody;
  } catch {
    throw new ProviderError('Request body must be valid JSON.', 400);
  }
}

function validateBody(body: GenerateBody) {
  if (body.mode === 'app' || body.mode === 'code' || body.mode === 'ai' || body.mode === 'prompt-app') {
    if (!body.prompt?.trim()) return 'Please enter a prompt before generating.';
  }

  if (body.mode === 'error') {
    if (!body.errorMessage?.trim()) return 'Please paste the error message.';
    if (!body.code?.trim()) return 'Please paste the code snippet.';
  }

  if (body.mode === 'ui') {
    if (!body.code?.trim()) return 'Please paste the UI code to improve.';
  }

  return '';
}

function createGenerationRequest(body: GenerateBody) {
  const mode = body.mode === 'ai' ? 'code' : body.mode;
  const schema = [
    'Return only JSON with this exact shape:',
    '{"plan":"","pages":[],"features":[],"code":"","readme":"","files":[{"path":"","content":""}]}',
    'All array items must be strings. files must contain safe relative paths and complete file contents.',
    'Return a complete Next.js TypeScript project. Do not return static HTML only. Do not return README only.',
    'Required file paths include app/page.tsx, components/AppShell.tsx, lib/utils.ts, hooks/use-project.ts, public/.gitkeep, styles/globals.css, package.json, README.md, and .env.example.',
  ].join('\n');

  const system = [
    'You are Codely, an AI app and tool builder for non-coders.',
    'Use simple English. Avoid jargon unless code requires it.',
    'Do not include markdown fences around the JSON response.',
    'Never include secrets or API keys.',
    schema,
  ].join('\n');

  const user = [
    `Mode: ${mode}`,
    `Category: ${body.category || getTitle(body)}`,
    body.template ? `Template: ${body.template}` : '',
    body.techStack?.length ? `Selected tech stack: ${body.techStack.join(', ')}` : '',
    body.prompt ? `Prompt: ${body.prompt}` : '',
    body.targetUsers ? `Target users: ${body.targetUsers}` : '',
    body.features ? `Features needed: ${body.features}` : '',
    body.designStyle ? `Design style: ${body.designStyle}` : '',
    body.errorMessage ? `Error message:\n${body.errorMessage}` : '',
    body.code ? `Code:\n${body.code}` : '',
    getModeInstructions(mode || 'app'),
  ]
    .filter(Boolean)
    .join('\n\n');

  return { system, user };
}

function getModeInstructions(mode: GenerateMode) {
  if (mode === 'app') {
    return 'Create a complete Next.js TypeScript project with App Router files, reusable components, package.json, README, and .env.example.';
  }

  if (mode === 'code') {
    return 'Generate a complete Next.js TypeScript project for the requested tool or component. Include App Router files, package.json, README, and .env.example.';
  }

  if (mode === 'error') {
    return 'Explain the likely reason for the error in simple language and provide fixed code.';
  }

  if (mode === 'ui') {
    return 'Improve the UI code and list practical design improvements.';
  }

  if (mode === 'prompt-app') {
    return 'Turn the plain English idea into a step-by-step MVP plan and complete Next.js TypeScript starter project.';
  }

  return 'Generate a useful result for the request.';
}

async function runProviderFallback(
  system: string,
  user: string
): Promise<
  | { success: true; provider: ProviderName; output: CodelyOutput }
  | { success: false; message: string; details: ProviderDetail[] }
> {
  const providers = getConfiguredProviders();

  if (providers.length === 0) {
    return {
      success: false,
      message: noKeyMessage,
      details: [
        { provider: 'gemini', reason: 'GEMINI_API_KEY is missing.' },
        { provider: 'openai', reason: 'OPENAI_API_KEY is missing.' },
        { provider: 'groq', reason: 'GROQ_API_KEY is missing.' },
      ],
    };
  }

  const details: ProviderDetail[] = [];

  for (const provider of providers) {
    try {
      const attempt = await callProvider(provider, system, user);
      const output = parseProviderOutput(attempt.text);
      return { success: true, provider: attempt.provider, output };
    } catch (error) {
      const detail = normalizeProviderError(provider, error);
      details.push(detail);
      logGenerateError(provider, detail);
    }
  }

  return {
    success: false,
    message: 'AI generation failed.',
    details,
  };
}

function getConfiguredProviders(): ProviderName[] {
  const providers: ProviderName[] = [];
  if (hasEnv('GEMINI_API_KEY')) providers.push('gemini');
  if (hasEnv('OPENAI_API_KEY')) providers.push('openai');
  if (hasEnv('GROQ_API_KEY')) providers.push('groq');
  return providers;
}

async function callProvider(provider: ProviderName, system: string, user: string): Promise<ProviderAttempt> {
  if (provider === 'gemini') {
    return { provider, text: await generateWithGemini(system, user) };
  }

  if (provider === 'openai') {
    return { provider, text: await generateWithOpenAI(system, user) };
  }

  return { provider, text: await generateWithGroq(system, user) };
}

async function generateWithGemini(system: string, user: string) {
  const configuredModel = process.env.GEMINI_MODEL?.trim();
  const models = configuredModel ? [configuredModel] : geminiModels;
  const details: ProviderDetail[] = [];

  for (const model of models) {
    try {
      return await callGeminiModel(model, system, user);
    } catch (error) {
      details.push(normalizeProviderError('gemini', error));
    }
  }

  const reason = details.map((detail) => `${detail.status || 'unknown'} ${detail.reason}`).join(' | ');
  throw new ProviderError(reason || 'Gemini request failed.', details.find((detail) => detail.status)?.status);
}

async function callGeminiModel(model: string, system: string, user: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          generationConfig: {
            temperature: 0.25,
            responseMimeType: 'application/json',
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

    if (!response.ok) {
      throw new ProviderError(await getProviderReason(response, 'gemini'), response.status);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new ProviderError('Gemini returned an empty response.');
    }

    return text;
  } finally {
    clearTimeout(timeout);
  }
}

async function generateWithOpenAI(system: string, user: string) {
  const OpenAI = (await import('openai')).default;
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, timeout: 30000 });
  const completion = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
  });

  const text = completion.choices[0]?.message?.content;
  if (!text) throw new ProviderError('OpenAI returned an empty response.');
  return text;
}

async function generateWithGroq(system: string, user: string) {
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
        model: process.env.GROQ_MODEL || 'llama-3.1-8b-instant',
        temperature: 0.25,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
      }),
    });

    if (!response.ok) {
      throw new ProviderError(await getProviderReason(response, 'groq'), response.status);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;

    if (!text) {
      throw new ProviderError('Groq returned an empty response.');
    }

    return text;
  } finally {
    clearTimeout(timeout);
  }
}

async function getProviderReason(response: Response, provider: ProviderName) {
  const fallback = `${provider} returned HTTP ${response.status}.`;

  if (provider === 'gemini' && response.status === 403) {
    return 'API key unauthorized or model not enabled.';
  }

  if (response.status === 401 || response.status === 403) {
    return 'API key unauthorized or provider access denied.';
  }

  try {
    const data = await response.json();
    return data.error?.message || data.error?.description || data.message || fallback;
  } catch {
    return fallback;
  }
}

function parseProviderOutput(raw: string): CodelyOutput {
  const parsed = JSON.parse(extractJson(raw));
  const plan = stringValue(parsed.plan || parsed.summary || parsed.description, 'Generated a practical plan for your request.');
  const pages = stringArray(parsed.pages);
  const features = stringArray(parsed.features || parsed.components);
  const code = stringValue(parsed.code || firstFileContent(parsed.files), '');
  const readme = stringValue(parsed.readme, createReadme(plan, pages, features));
  const files = normalizeFiles(parsed.files, code, readme);

  return {
    plan,
    pages: pages.length ? pages : ['Main screen', 'Results screen'],
    features: features.length ? features : ['Simple input form', 'Generated output', 'Copy and download actions'],
    code: code || files.find((file) => file.path !== 'README.md')?.content || '',
    readme,
    files,
  };
}

function normalizeAiOutput(output: CodelyOutput, body: GenerateBody): CodelyOutput {
  if (output.files.length > 0) {
    return {
      ...output,
      files: ensureRequiredProjectFiles(output.files, output.code, output.readme, body.mode),
    };
  }

  return {
    ...output,
    files: normalizeFiles([], output.code, output.readme || createReadme(output.plan, output.pages, output.features), body.mode),
  };
}

function ensureRequiredProjectFiles(files: GeneratedFile[], code = '', readme = '', mode: GenerateMode = 'app') {
  const requiredFiles = normalizeFiles([], code, readme, mode);
  const existingPaths = new Set(files.map((file) => file.path));
  const missingFiles = requiredFiles.filter((file) => !existingPaths.has(file.path));
  return [...files, ...missingFiles].slice(0, 24);
}

function normalizeFiles(value: unknown, code = '', readme = '', mode: GenerateMode = 'app'): GeneratedFile[] {
  const files = Array.isArray(value)
    ? value
        .filter((file) => file?.path && typeof file.content === 'string')
        .map((file) => ({
          path: sanitizePath(String(file.path)),
          content: String(file.content),
        }))
        .filter((file) => file.path)
        .slice(0, 12)
    : [];

  if (files.length > 0) return files;

  return [
    {
      path: 'app/page.tsx',
      content:
        code ||
        `import AppShell from "@/components/AppShell";

export default function Page() {
  return <AppShell />;
}
`,
    },
    {
      path: 'components/AppShell.tsx',
      content: `export default function AppShell() {
  return (
    <main className="min-h-screen bg-slate-50 p-8 text-slate-950">
      <section className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold text-blue-600">Generated by Codely</p>
        <h1 className="mt-3 text-3xl font-bold">Your app is ready to customize</h1>
        <p className="mt-3 text-slate-600">Use this starter project as the first version of your idea.</p>
      </section>
    </main>
  );
}
`,
    },
    {
      path: 'lib/utils.ts',
      content: `export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
`,
    },
    {
      path: 'hooks/use-project.ts',
      content: `export function useProject() {
  return {
    status: "ready",
  };
}
`,
    },
    {
      path: 'public/.gitkeep',
      content: '',
    },
    {
      path: 'styles/globals.css',
      content: '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n',
    },
    {
      path: 'package.json',
      content: JSON.stringify(
        {
          scripts: {
            dev: 'next dev',
            build: 'next build',
            start: 'next start',
          },
          dependencies: {
            next: 'latest',
            react: 'latest',
            'react-dom': 'latest',
          },
          devDependencies: {
            typescript: 'latest',
            tailwindcss: 'latest',
          },
        },
        null,
        2
      ),
    },
    {
      path: 'README.md',
      content: readme || '# Codely generated project\n\nRun `npm install` and `npm run dev` to start.\n',
    },
    {
      path: '.env.example',
      content: 'NEXT_PUBLIC_APP_URL=\n',
    },
  ];
}

function extractJson(raw: string) {
  const trimmed = raw.trim().replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim();
  if (!trimmed) throw new ProviderError('AI returned an empty response.');
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) return trimmed;

  const start = trimmed.indexOf('{');
  const end = trimmed.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) {
    throw new ProviderError('AI response did not contain valid JSON.');
  }

  return trimmed.slice(start, end + 1);
}

function firstFileContent(files: unknown) {
  if (!Array.isArray(files)) return '';
  const firstFile = files.find((file) => file && typeof file.content === 'string');
  return firstFile?.content || '';
}

function createReadme(plan: string, pages: string[], features: string[]) {
  return [`# Codely generated output`, '', `## Plan`, plan, '', `## Pages`, ...pages.map((page) => `- ${page}`), '', `## Features`, ...features.map((feature) => `- ${feature}`)].join('\n');
}

function getTitle(body: GenerateBody) {
  if (body.mode === 'code' || body.mode === 'ai') return 'Generated code';
  if (body.mode === 'error') return 'Fixed error';
  if (body.mode === 'ui') return 'Improved UI';
  if (body.mode === 'prompt-app') return 'Prompt to app';
  return body.category || 'Generated Codely App';
}

function stringArray(value: unknown) {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean).slice(0, 12);
  if (typeof value === 'string' && value.trim()) return [value.trim()];
  return [];
}

function stringValue(value: unknown, fallback: string) {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function sanitizePath(path: string) {
  return path
    .replace(/\\/g, '/')
    .replace(/^\/+/, '')
    .split('/')
    .filter((part) => part && part !== '.' && part !== '..')
    .join('/');
}

function normalizeProviderError(provider: ProviderName, error: unknown): ProviderDetail {
  const normalized = normalizeUnknownError(error);
  return {
    provider,
    status: normalized.status,
    reason: redactSecrets(normalized.reason),
  };
}

function normalizeUnknownError(error: unknown): ProviderDetail {
  if (error instanceof ProviderError) {
    return { provider: 'server', status: error.status, reason: error.message };
  }

  if (typeof error === 'object' && error !== null && 'status' in error) {
    const status = typeof (error as { status?: unknown }).status === 'number' ? (error as { status: number }).status : undefined;
    const message = error instanceof Error ? error.message : 'Provider request failed.';
    return { provider: 'server', status, reason: message };
  }

  if (error instanceof Error) {
    if (error.name === 'AbortError') {
      return { provider: 'server', reason: 'Provider request timed out.' };
    }
    return { provider: 'server', reason: error.message || 'Unknown error.' };
  }

  return { provider: 'server', reason: 'Unknown server error.' };
}

function logGenerateError(provider: ProviderName | 'server', detail: ProviderDetail) {
  console.warn('[api/generate] generation attempt failed', {
    provider,
    status: detail.status || null,
    reason: redactSecrets(detail.reason),
  });
}

function hasEnv(name: 'GEMINI_API_KEY' | 'OPENAI_API_KEY' | 'GROQ_API_KEY') {
  return Boolean(process.env[name]?.trim());
}

function redactSecrets(reason: string) {
  let safeReason = reason;
  const secrets = [process.env.GEMINI_API_KEY, process.env.OPENAI_API_KEY, process.env.GROQ_API_KEY].filter(
    (value): value is string => Boolean(value && value.length > 3)
  );

  secrets.forEach((secret) => {
    safeReason = safeReason.split(secret).join('[redacted]');
  });

  return safeReason;
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

    if (!response.ok) throw new ProviderError(`Runner returned ${response.status}`, response.status);
    const data = await response.json();
    return {
      success: true,
      output: data.run?.output || data.message || 'Program finished with no output.',
    };
  } catch (error) {
    const detail = normalizeUnknownError(error);
    return {
      success: false,
      message: 'Code runner failed.',
      details: [detail],
      output: detail.reason,
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
  } catch (error) {
    const detail = normalizeUnknownError(error);
    return {
      success: false,
      message: 'Code runner failed.',
      details: [detail],
      output: detail.reason,
    };
  }
}

function formatLogArg(arg: unknown) {
  return typeof arg === 'string' ? arg : JSON.stringify(arg);
}
