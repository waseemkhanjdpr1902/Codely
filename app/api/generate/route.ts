import { NextRequest, NextResponse } from 'next/server';
import { consumeBuildCredits, isFirebaseAdminConfigured, verifyFirebaseRequest } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type GenerateMode = 'execute' | 'ai' | 'app' | 'revise' | 'code' | 'error' | 'ui' | 'prompt-app';
type ProviderName = 'gemini' | 'openai' | 'groq';
type SuccessProviderName = ProviderName | 'codely-local';

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
  existingFiles?: GeneratedFile[];
  revision?: string;
};

type ProviderDetail = {
  provider: ProviderName | 'server';
  status?: number;
  reason: string;
};

type GeneratedFile = {
  path: string;
  language?: string;
  content: string;
};

type CodelyOutput = {
  summary: string;
  projectType: 'nextjs';
  files: GeneratedFile[];
  runCommands: string[];
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

const geminiModels = ['gemini-1.5-flash', 'gemini-1.5-flash-latest', 'gemini-2.0-flash'];

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Codely generation API is ready',
    modes: ['execute', 'app', 'revise', 'code', 'error', 'ui', 'prompt-app'],
    providers: ['gemini', 'openai', 'groq'],
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await readBody(request);

    if (!body.mode || body.mode === 'execute') {
      return NextResponse.json({ success: false, message: 'Public code execution is disabled for security.' }, { status: 403 });
    }

    const validationError = validateBody(body);
    if (validationError) {
      return NextResponse.json({
        success: false,
        message: validationError,
        details: [{ provider: 'server', reason: validationError }],
      });
    }

    let creditUsage = null;
    if (isFirebaseAdminConfigured()) {
      const user = await verifyFirebaseRequest(request);
      if (!user) throw new Error('AUTH_REQUIRED');
      creditUsage = await consumeBuildCredits(user.uid);
    }

    const generationRequest = createGenerationRequest(body);
    const result = await runProviderFallback(generationRequest.system, generationRequest.user);

    if (!result.success) {
      return NextResponse.json(result);
    }

    const normalized = normalizeAiOutput(result.output);
    const techStack = body.techStack?.length ? body.techStack : ['Next.js', 'React', 'TypeScript', 'Tailwind'];

    return NextResponse.json({
      success: true,
      provider: result.provider,
      creditUsage,
      output: normalized,
      // Backward-compatible fields used by the current builder UI.
      title: getTitle(body),
      summary: normalized.summary,
      files: normalized.files,
      projectType: normalized.projectType,
      runCommands: normalized.runCommands,
      app:
        body.mode === 'app'
          ? {
              appName: getTitle(body),
              description: normalized.summary,
              plan: normalized.summary,
              pages: inferPages(normalized.files),
              components: inferComponents(normalized.files),
              techStack,
              files: normalized.files,
            }
          : undefined,
    });
  } catch (error) {
    if (error instanceof Error && (error.message === 'AUTH_REQUIRED' || error.message === 'AUTH_INVALID')) {
      return NextResponse.json({ success: false, message: 'Please sign in again.' }, { status: 401 });
    }
    if (error instanceof Error && error.message === 'INSUFFICIENT_CREDITS') {
      return NextResponse.json({ success: false, message: 'You have used your available credits.' }, { status: 402 });
    }
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
  const requestSize = [body.prompt, body.code, body.errorMessage, body.features].filter(Boolean).join('').length;
  if (requestSize > 30000) return 'Request is too large. Keep the combined input below 30,000 characters.';
  if (body.mode === 'app' || body.mode === 'code' || body.mode === 'ai' || body.mode === 'prompt-app') {
    if (!body.prompt?.trim()) return 'Please enter a prompt before generating.';
  }

  if (body.mode === 'revise') {
    if (!body.revision?.trim()) return 'Describe the change you want to make.';
    if (!Array.isArray(body.existingFiles) || body.existingFiles.length === 0) return 'Generate an app before requesting changes.';
    if (body.existingFiles.length > 30) return 'This project has too many files to revise safely.';
    const totalSize = body.existingFiles.reduce((size, file) => size + String(file?.content || '').length, 0);
    if (totalSize > 500_000) return 'This project is too large to revise in one request.';
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
    '{"summary":"","projectType":"nextjs","files":[{"path":"preview.html","language":"html","content":""},{"path":"package.json","language":"json","content":""},{"path":"app/page.tsx","language":"tsx","content":""},{"path":"components/MainTool.tsx","language":"tsx","content":""},{"path":"app/globals.css","language":"css","content":""},{"path":"README.md","language":"markdown","content":""}],"runCommands":["npm install","npm run dev"]}',
    'Return a complete modern Next.js TypeScript project using React and Tailwind CSS.',
    'Do not return only planning text.',
    'Do not return only static HTML unless the user specifically asks for HTML.',
    'Every file must include a safe relative path, language, and complete content.',
    'Required file paths: preview.html, package.json, app/page.tsx, components/MainTool.tsx, app/globals.css, README.md.',
    'preview.html must be a complete standalone interactive preview with inline CSS and JavaScript, no external scripts, no network requests, and no secrets.',
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
    body.revision ? `Requested change: ${body.revision}` : '',
    body.mode === 'revise' && body.existingFiles
      ? `Current project files (return the complete updated project, not a patch):\n${JSON.stringify(body.existingFiles)}`
      : '',
    getModeInstructions(mode || 'app'),
  ]
    .filter(Boolean)
    .join('\n\n');

  return { system, user };
}

function getModeInstructions(mode: GenerateMode) {
  if (mode === 'app') {
    return 'Create a complete Next.js TypeScript app project and a matching interactive standalone preview.html.';
  }

  if (mode === 'revise') {
    return 'Apply the requested change consistently to the existing app and preview. Preserve features that were not changed. Return every project file.';
  }

  if (mode === 'code') {
    return 'Generate a complete Next.js TypeScript project for the requested tool or component. Include package.json, app/page.tsx, components/MainTool.tsx, app/globals.css, README.md, and run commands.';
  }

  if (mode === 'error') {
    return 'Explain the likely reason for the error in simple language and provide fixed code.';
  }

  if (mode === 'ui') {
    return 'Improve the UI code and list practical design improvements.';
  }

  if (mode === 'prompt-app') {
    return 'Turn the plain English idea into a complete Next.js TypeScript starter project with real files and run commands.';
  }

  return 'Generate a useful result for the request.';
}

async function runProviderFallback(
  system: string,
  user: string
): Promise<
  | { success: true; provider: SuccessProviderName; output: CodelyOutput }
  | { success: false; message: string; details: ProviderDetail[] }
> {
  const providers = getConfiguredProviders();

  if (providers.length === 0) {
    return {
      success: true,
      provider: 'codely-local',
      output: createLocalProjectOutput(user),
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

  console.warn('[api/generate] all configured providers failed, using local project generator', {
    providers: details.map((detail) => ({ provider: detail.provider, status: detail.status || null, reason: redactSecrets(detail.reason) })),
  });

  return {
    success: true,
    provider: 'codely-local',
    output: createLocalProjectOutput(user),
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
  const summary = stringValue(parsed.summary || parsed.plan || parsed.description, 'Codely generated a complete modern app project for you.');
  const files = normalizeFiles(parsed.files, summary);
  const runCommands = normalizeRunCommands(parsed.runCommands);

  return {
    summary,
    projectType: 'nextjs',
    files,
    runCommands,
  };
}

function normalizeAiOutput(output: CodelyOutput): CodelyOutput {
  return {
    ...output,
    summary: output.summary || 'Codely generated a complete modern app project for you.',
    projectType: 'nextjs',
    files: ensureRequiredProjectFiles(output.files, output.summary),
    runCommands: output.runCommands?.length ? output.runCommands : ['npm install', 'npm run dev'],
  };
}

function ensureRequiredProjectFiles(files: GeneratedFile[], summary = '') {
  const requiredFiles = createDefaultProjectFiles(summary);
  const existingPaths = new Set(files.map((file) => file.path));
  const missingFiles = requiredFiles.filter((file) => !existingPaths.has(file.path));
  return [...files, ...missingFiles].slice(0, 24);
}

function normalizeFiles(value: unknown, summary = ''): GeneratedFile[] {
  const files = Array.isArray(value)
    ? value
        .filter((file) => file?.path && typeof file.content === 'string')
        .map((file) => ({
          path: sanitizePath(String(file.path)),
          language: typeof file.language === 'string' ? file.language : inferLanguage(String(file.path)),
          content: String(file.content),
        }))
        .filter((file) => file.path)
        .slice(0, 24)
    : [];

  return files.length ? ensureRequiredProjectFiles(files, summary) : createDefaultProjectFiles(summary);
}

function createDefaultProjectFiles(summary = ''): GeneratedFile[] {
  return createLocalProjectFiles('generic', 'Codely App', summary || 'A modern Next.js TypeScript app generated by Codely.');
}

function createLocalProjectOutput(requestText: string): CodelyOutput {
  const idea = extractPromptFromRequest(requestText);
  const kind = detectLocalProjectKind(idea);
  const title = toTitle(kind === 'generic' ? idea || 'Codely App' : kind);
  const summary = createLocalSummary(kind, idea);

  return {
    summary,
    projectType: 'nextjs',
    files: createLocalProjectFiles(kind, title, summary),
    runCommands: ['npm install', 'npm run dev'],
  };
}

function extractPromptFromRequest(requestText: string) {
  const promptLine = requestText
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line.toLowerCase().startsWith('prompt:'));

  return (promptLine ? promptLine.replace(/^prompt:\s*/i, '') : requestText).trim();
}

function detectLocalProjectKind(idea: string) {
  const text = idea.toLowerCase();
  if (text.includes('emi') || text.includes('loan') || text.includes('calculator')) return 'loan EMI calculator';
  if (text.includes('resume') || text.includes('cv')) return 'resume builder';
  if (text.includes('admission') || text.includes('school') || text.includes('registration form')) return 'school admission form';
  if (text.includes('expense') || text.includes('budget') || text.includes('tracker')) return 'expense tracker';
  if (text.includes('landing') || text.includes('coaching') || text.includes('classes')) return 'coaching landing page';
  return 'generic';
}

function createLocalSummary(kind: string, idea: string) {
  if (kind === 'loan EMI calculator') {
    return 'A complete loan EMI calculator with amount, interest rate, months, EMI result, total payable amount, total interest, and CSV download.';
  }
  if (kind === 'resume builder') {
    return 'A complete resume builder with editable profile, skills, experience, education, live preview, and downloadable text resume.';
  }
  if (kind === 'school admission form') {
    return 'A complete school admission form with student details, guardian details, class selection, validation, and printable summary.';
  }
  if (kind === 'expense tracker') {
    return 'A complete expense tracker with add expense form, category totals, monthly total, list view, and CSV export.';
  }
  if (kind === 'coaching landing page') {
    return 'A complete coaching classes landing page with hero, courses, benefits, testimonials, contact form, and call-to-action sections.';
  }
  return `A complete modern Next.js app generated for: ${idea || 'your app idea'}.`;
}

function createLocalProjectFiles(kind: string, title: string, summary: string): GeneratedFile[] {
  const mainTool = createMainToolComponent(kind, title);

  return [
    {
      path: 'preview.html',
      language: 'html',
      content: createStandalonePreview(title, summary),
    },
    {
      path: 'package.json',
      language: 'json',
      content: JSON.stringify(
        {
          name: slugifyTitle(title),
          version: '0.1.0',
          private: true,
          scripts: {
            dev: 'next dev',
            build: 'next build',
            start: 'next start',
          },
          dependencies: {
            next: '^16.2.9',
            react: '^19.2.7',
            'react-dom': '^19.2.7',
          },
          devDependencies: {
            '@types/node': '^20.0.0',
            '@types/react': '^19.2.17',
            '@types/react-dom': '^19.2.3',
            autoprefixer: '^10.4.22',
            postcss: '^8.5.15',
            tailwindcss: '^3.4.17',
            typescript: '^5.0.0',
          },
        },
        null,
        2
      ),
    },
    {
      path: 'app/layout.tsx',
      language: 'tsx',
      content: `import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "${escapeTsString(title)}",
  description: "${escapeTsString(summary)}",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`,
    },
    {
      path: 'app/page.tsx',
      language: 'tsx',
      content: `import MainTool from "@/components/MainTool";

export default function Page() {
  return <MainTool />;
}
`,
    },
    {
      path: 'components/MainTool.tsx',
      language: 'tsx',
      content: mainTool,
    },
    {
      path: 'app/globals.css',
      language: 'css',
      content: `@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: #f8fafc;
  color: #0f172a;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

input,
select,
textarea,
button {
  font: inherit;
}
`,
    },
    {
      path: 'tailwind.config.ts',
      language: 'ts',
      content: `import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
`,
    },
    {
      path: 'postcss.config.js',
      language: 'js',
      content: `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`,
    },
    {
      path: 'tsconfig.json',
      language: 'json',
      content: JSON.stringify(
        {
          compilerOptions: {
            target: 'ES2017',
            lib: ['dom', 'dom.iterable', 'esnext'],
            allowJs: true,
            skipLibCheck: true,
            strict: false,
            noEmit: true,
            esModuleInterop: true,
            module: 'esnext',
            moduleResolution: 'bundler',
            resolveJsonModule: true,
            isolatedModules: true,
            jsx: 'preserve',
            incremental: true,
            plugins: [{ name: 'next' }],
            paths: { '@/*': ['./*'] },
          },
          include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
          exclude: ['node_modules'],
        },
        null,
        2
      ),
    },
    {
      path: 'README.md',
      language: 'markdown',
      content: `# ${title}

${summary}

## Run on your computer

\`\`\`bash
npm install
npm run dev
\`\`\`

Open http://localhost:3000 in your browser.

## Files

- app/page.tsx
- app/layout.tsx
- components/MainTool.tsx
- app/globals.css
`,
    },
    {
      path: '.env.example',
      language: 'text',
      content: 'NEXT_PUBLIC_APP_URL=http://localhost:3000\n',
    },
  ];
}

function createStandalonePreview(title: string, summary: string) {
  const safeTitle = escapeHtml(title);
  const safeSummary = escapeHtml(summary);
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${safeTitle}</title><style>*{box-sizing:border-box}body{margin:0;font-family:Inter,system-ui,sans-serif;background:linear-gradient(135deg,#eff6ff,#fff);color:#0f172a;min-height:100vh;padding:32px}.app{max-width:860px;margin:auto}.badge{color:#1d4ed8;font-weight:700}.card{margin-top:24px;background:#fff;border:1px solid #dbeafe;border-radius:20px;padding:28px;box-shadow:0 18px 50px #1e3a8a18}h1{font-size:clamp(2rem,6vw,3.6rem);margin:12px 0}p{color:#475569;line-height:1.7}.row{display:flex;gap:12px;margin-top:22px;flex-wrap:wrap}input{flex:1;min-width:220px;padding:14px;border:1px solid #cbd5e1;border-radius:12px}button{border:0;border-radius:12px;background:#2563eb;color:#fff;padding:14px 20px;font-weight:700;cursor:pointer}#result{margin-top:16px;padding:14px;background:#f8fafc;border-radius:12px;display:none}</style></head><body><main class="app"><span class="badge">LIVE CODELY PREVIEW</span><h1>${safeTitle}</h1><p>${safeSummary}</p><section class="card"><h2>Try your app</h2><p>This preview is interactive. Enter a value to test it.</p><div class="row"><input id="input" placeholder="Type something…"/><button id="action">Run</button></div><div id="result"></div></section></main><script>document.getElementById('action').addEventListener('click',function(){var input=document.getElementById('input');var result=document.getElementById('result');result.textContent=input.value?'Your app received: '+input.value:'Enter a value first.';result.style.display='block'});</script></body></html>`;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character] || character);
}

function createMainToolComponent(kind: string, title: string) {
  if (kind === 'loan EMI calculator') return loanEmiTool();
  if (kind === 'resume builder') return resumeBuilderTool();
  if (kind === 'school admission form') return schoolAdmissionTool();
  if (kind === 'expense tracker') return expenseTrackerTool();
  if (kind === 'coaching landing page') return coachingLandingPageTool();
  return genericTool(title);
}

function loanEmiTool() {
  return `'use client';

import { useMemo, useState } from "react";

export default function MainTool() {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(9);
  const [months, setMonths] = useState(60);

  const result = useMemo(() => {
    const monthlyRate = rate / 100 / 12;
    const emi =
      monthlyRate === 0
        ? amount / months
        : (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
          (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = emi * months;
    const totalInterest = totalPayment - amount;
    return {
      emi: Number.isFinite(emi) ? emi : 0,
      totalPayment: Number.isFinite(totalPayment) ? totalPayment : 0,
      totalInterest: Number.isFinite(totalInterest) ? totalInterest : 0,
    };
  }, [amount, rate, months]);

  const downloadResult = () => {
    const rows = [
      ["Loan Amount", amount],
      ["Annual Interest Rate", rate + "%"],
      ["Months", months],
      ["Monthly EMI", result.emi.toFixed(2)],
      ["Total Interest", result.totalInterest.toFixed(2)],
      ["Total Payment", result.totalPayment.toFixed(2)],
    ];
    const csv = rows.map((row) => row.join(",")).join("\\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "emi-result.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <section className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold text-blue-700">Loan Tool</p>
          <h1 className="mt-2 text-4xl font-bold text-slate-950">Loan EMI Calculator</h1>
          <p className="mt-3 text-slate-600">Calculate monthly EMI, total interest, and download the result.</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="grid gap-4">
              <label className="text-sm font-semibold text-slate-700">
                Loan amount
                <input value={amount} onChange={(event) => setAmount(Number(event.target.value))} type="number" className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4" />
              </label>
              <label className="text-sm font-semibold text-slate-700">
                Annual interest rate (%)
                <input value={rate} onChange={(event) => setRate(Number(event.target.value))} type="number" className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4" />
              </label>
              <label className="text-sm font-semibold text-slate-700">
                Loan duration in months
                <input value={months} onChange={(event) => setMonths(Number(event.target.value))} type="number" className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4" />
              </label>
              <button onClick={downloadResult} className="h-12 rounded-xl bg-blue-600 font-semibold text-white hover:bg-blue-700">Download Result</button>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-950 p-6 text-white shadow-sm">
            <p className="text-sm text-slate-300">Monthly EMI</p>
            <p className="mt-2 text-5xl font-bold">₹{result.emi.toFixed(0)}</p>
            <div className="mt-8 space-y-4">
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-slate-300">Total interest</p>
                <p className="text-2xl font-bold">₹{result.totalInterest.toFixed(0)}</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-slate-300">Total payment</p>
                <p className="text-2xl font-bold">₹{result.totalPayment.toFixed(0)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
`;
}

function resumeBuilderTool() {
  return `'use client';

import { useState } from "react";

export default function MainTool() {
  const [name, setName] = useState("Aisha Khan");
  const [role, setRole] = useState("Marketing Executive");
  const [email, setEmail] = useState("aisha@example.com");
  const [skills, setSkills] = useState("Communication, Excel, Social Media, Teamwork");
  const [experience, setExperience] = useState("Managed campaigns, prepared reports, and coordinated client work.");
  const [education, setEducation] = useState("BBA, Delhi University");

  const resumeText = \`\${name}\\n\${role}\\n\${email}\\n\\nSkills: \${skills}\\n\\nExperience: \${experience}\\n\\nEducation: \${education}\`;

  const downloadResume = () => {
    const blob = new Blob([resumeText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "resume.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold">Resume Builder</h1>
          <p className="mt-3 text-slate-600">Fill the form and see a clean resume preview instantly.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="grid gap-4">
              {[
                ["Name", name, setName],
                ["Role", role, setRole],
                ["Email", email, setEmail],
                ["Skills", skills, setSkills],
                ["Experience", experience, setExperience],
                ["Education", education, setEducation],
              ].map(([label, value, setter]) => (
                <label key={String(label)} className="text-sm font-semibold text-slate-700">
                  {String(label)}
                  <textarea value={String(value)} onChange={(event) => (setter as (next: string) => void)(event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 px-4 py-3" />
                </label>
              ))}
              <button onClick={downloadResume} className="h-12 rounded-xl bg-blue-600 font-semibold text-white">Download Resume</button>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold">{name}</h2>
            <p className="mt-1 text-blue-700">{role}</p>
            <p className="text-sm text-slate-500">{email}</p>
            <hr className="my-5" />
            <Section title="Skills" text={skills} />
            <Section title="Experience" text={experience} />
            <Section title="Education" text={education} />
          </div>
        </div>
      </section>
    </main>
  );
}

function Section({ title, text }: { title: string; text: string }) {
  return (
    <div className="mb-5">
      <h3 className="font-bold text-slate-950">{title}</h3>
      <p className="mt-2 leading-7 text-slate-600">{text}</p>
    </div>
  );
}
`;
}

function schoolAdmissionTool() {
  return `'use client';

import { useState } from "react";

export default function MainTool() {
  const [form, setForm] = useState({ student: "", parent: "", phone: "", className: "Class 1", address: "" });
  const [submitted, setSubmitted] = useState(false);

  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));

  return (
    <main className="min-h-screen bg-blue-50 p-6">
      <section className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold">School Admission Form</h1>
          <p className="mt-3 text-slate-600">Collect student and guardian details with a simple admission summary.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="grid gap-4">
              <Input label="Student name" value={form.student} onChange={(value) => update("student", value)} />
              <Input label="Parent/guardian name" value={form.parent} onChange={(value) => update("parent", value)} />
              <Input label="Phone number" value={form.phone} onChange={(value) => update("phone", value)} />
              <label className="text-sm font-semibold text-slate-700">
                Class
                <select value={form.className} onChange={(event) => update("className", event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4">
                  {["Nursery", "KG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5"].map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <Input label="Address" value={form.address} onChange={(value) => update("address", value)} />
              <button className="h-12 rounded-xl bg-blue-600 font-semibold text-white">Submit Application</button>
            </div>
          </form>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Application Summary</h2>
            {submitted ? (
              <div className="mt-5 space-y-3 text-slate-700">
                <p><strong>Student:</strong> {form.student}</p>
                <p><strong>Guardian:</strong> {form.parent}</p>
                <p><strong>Phone:</strong> {form.phone}</p>
                <p><strong>Class:</strong> {form.className}</p>
                <p><strong>Address:</strong> {form.address}</p>
              </div>
            ) : (
              <p className="mt-5 text-slate-500">Submit the form to see the summary here.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="text-sm font-semibold text-slate-700">
      {label}
      <input value={value} onChange={(event) => onChange(event.target.value)} required className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4" />
    </label>
  );
}
`;
}

function expenseTrackerTool() {
  return `'use client';

import { useMemo, useState } from "react";

type Expense = { title: string; amount: number; category: string };

export default function MainTool() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("Food");
  const [expenses, setExpenses] = useState<Expense[]>([
    { title: "Lunch", amount: 250, category: "Food" },
    { title: "Bus pass", amount: 800, category: "Travel" },
  ]);

  const total = useMemo(() => expenses.reduce((sum, item) => sum + item.amount, 0), [expenses]);

  const addExpense = () => {
    if (!title || amount <= 0) return;
    setExpenses((current) => [{ title, amount, category }, ...current]);
    setTitle("");
    setAmount(0);
  };

  const exportCsv = () => {
    const csv = ["Title,Amount,Category", ...expenses.map((item) => \`\${item.title},\${item.amount},\${item.category}\`)].join("\\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "expenses.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <section className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold">Expense Tracker</h1>
          <p className="mt-3 text-slate-600">Track spending, view totals, and export expenses.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1fr]">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Add expense</h2>
            <div className="mt-5 grid gap-4">
              <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Expense title" className="h-12 rounded-xl border border-slate-200 px-4" />
              <input value={amount} onChange={(event) => setAmount(Number(event.target.value))} type="number" placeholder="Amount" className="h-12 rounded-xl border border-slate-200 px-4" />
              <select value={category} onChange={(event) => setCategory(event.target.value)} className="h-12 rounded-xl border border-slate-200 px-4">
                {["Food", "Travel", "Bills", "Shopping", "Other"].map((item) => <option key={item}>{item}</option>)}
              </select>
              <button onClick={addExpense} className="h-12 rounded-xl bg-blue-600 font-semibold text-white">Add Expense</button>
              <button onClick={exportCsv} className="h-12 rounded-xl border border-slate-200 font-semibold">Export CSV</button>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold">This month</h2>
              <p className="rounded-xl bg-blue-50 px-4 py-2 font-bold text-blue-700">₹{total}</p>
            </div>
            <div className="space-y-3">
              {expenses.map((expense, index) => (
                <div key={index} className="flex items-center justify-between rounded-xl border border-slate-100 p-4">
                  <div>
                    <p className="font-semibold">{expense.title}</p>
                    <p className="text-sm text-slate-500">{expense.category}</p>
                  </div>
                  <p className="font-bold">₹{expense.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
`;
}

function coachingLandingPageTool() {
  return `export default function MainTool() {
  const courses = ["Maths Foundation", "Science Batch", "English Speaking", "Exam Preparation"];

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="bg-gradient-to-br from-blue-50 to-white px-6 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm font-semibold text-blue-700">Coaching Classes</p>
          <h1 className="mt-4 text-5xl font-bold">Learn better with expert teachers</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">Join focused classes with simple notes, regular tests, doubt support, and parent updates.</p>
          <div className="mt-8 flex justify-center gap-3">
            <a href="#contact" className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white">Book Free Demo</a>
            <a href="#courses" className="rounded-xl border border-slate-200 px-6 py-3 font-semibold">View Courses</a>
          </div>
        </div>
      </section>
      <section id="courses" className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold">Popular courses</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {courses.map((course) => (
              <div key={course} className="rounded-2xl border border-slate-200 p-5 shadow-sm">
                <h3 className="font-bold">{course}</h3>
                <p className="mt-2 text-sm text-slate-600">Small batch, weekly tests, and personal attention.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="contact" className="bg-slate-50 px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold">Book a free demo class</h2>
            <p className="mt-3 text-slate-600">Share your details and our team will call you back.</p>
          </div>
          <form className="rounded-2xl bg-white p-6 shadow-sm">
            <input placeholder="Student name" className="mb-3 h-12 w-full rounded-xl border border-slate-200 px-4" />
            <input placeholder="Phone number" className="mb-3 h-12 w-full rounded-xl border border-slate-200 px-4" />
            <select className="mb-3 h-12 w-full rounded-xl border border-slate-200 px-4">
              {courses.map((course) => <option key={course}>{course}</option>)}
            </select>
            <button className="h-12 w-full rounded-xl bg-blue-600 font-semibold text-white">Send Enquiry</button>
          </form>
        </div>
      </section>
    </main>
  );
}
`;
}

function genericTool(title: string) {
  return `'use client';

import { useState } from "react";

export default function MainTool() {
  const [items, setItems] = useState<string[]>(["First item", "Second item"]);
  const [input, setInput] = useState("");

  const addItem = () => {
    if (!input.trim()) return;
    setItems((current) => [input, ...current]);
    setInput("");
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <section className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold text-blue-700">Generated by Codely</p>
        <h1 className="mt-3 text-4xl font-bold">${escapeTsString(title)}</h1>
        <p className="mt-3 text-slate-600">A clean starter app with form input, saved list, and modern layout.</p>
        <div className="mt-8 flex gap-3">
          <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Add an item" className="h-12 flex-1 rounded-xl border border-slate-200 px-4" />
          <button onClick={addItem} className="rounded-xl bg-blue-600 px-5 font-semibold text-white">Add</button>
        </div>
        <div className="mt-6 space-y-3">
          {items.map((item) => (
            <div key={item} className="rounded-xl border border-slate-100 p-4 font-semibold">{item}</div>
          ))}
        </div>
      </section>
    </main>
  );
}
`;
}

function toTitle(value: string) {
  return value
    .split(/\\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function slugifyTitle(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'codely-app';
}

function escapeTsString(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, ' ');
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

function getTitle(body: GenerateBody) {
  if (body.mode === 'code' || body.mode === 'ai') return 'Generated code';
  if (body.mode === 'error') return 'Fixed error';
  if (body.mode === 'ui') return 'Improved UI';
  if (body.mode === 'prompt-app') return 'Prompt to app';
  return body.category || 'Generated Codely App';
}

function stringValue(value: unknown, fallback: string) {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function normalizeRunCommands(value: unknown) {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean).slice(0, 6);
  return ['npm install', 'npm run dev'];
}

function inferLanguage(path: string) {
  if (path.endsWith('.tsx')) return 'tsx';
  if (path.endsWith('.ts')) return 'ts';
  if (path.endsWith('.css')) return 'css';
  if (path.endsWith('.json')) return 'json';
  if (path.endsWith('.md')) return 'markdown';
  return 'text';
}

function inferPages(files: GeneratedFile[]) {
  const pages = files
    .filter((file) => file.path.startsWith('app/') && file.path.endsWith('page.tsx'))
    .map((file) => file.path.replace(/^app\//, '').replace(/\/page\.tsx$/, '') || 'Home');
  return pages.length ? pages : ['Home'];
}

function inferComponents(files: GeneratedFile[]) {
  const components = files
    .filter((file) => file.path.startsWith('components/') && file.path.endsWith('.tsx'))
    .map((file) => file.path.replace(/^components\//, '').replace(/\.tsx$/, ''));
  return components.length ? components : ['MainTool'];
}

function escapeTemplateText(value: string) {
  return value.replace(/[`$\\]/g, '');
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
