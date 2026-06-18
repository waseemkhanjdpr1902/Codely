'use client';

import {
  AlertTriangle,
  CheckCircle2,
  Clipboard,
  Code2,
  Download,
  FileCode2,
  Loader2,
  Rocket,
  Save,
  Sparkles,
  Wand2,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import {
  GeneratedFile,
  canGenerate,
  downloadTextFile,
  getRemainingGenerations,
  getUsage,
  recordUsage,
  saveProject,
} from '@/lib/local-workspace';

type ToolMode = 'app' | 'code' | 'error' | 'ui' | 'prompt-app';

type ToolCategory = {
  title: string;
  description: string;
  examplePrompt: string;
  mode: ToolMode;
};

type GenerationResult = {
  title: string;
  summary: string;
  output: string;
  files: GeneratedFile[];
  provider?: string;
};

const toolCategories: ToolCategory[] = [
  {
    title: 'Landing Page Builder',
    description: 'Create a simple page that explains an offer and gets visitors to take action.',
    examplePrompt: 'Build a landing page for a home bakery with menu, photos, testimonials, and WhatsApp contact.',
    mode: 'app',
  },
  {
    title: 'Resume Tool Builder',
    description: 'Make a resume helper, cover letter page, or personal portfolio generator.',
    examplePrompt: 'Create a resume builder for students with sections for education, skills, projects, and download tips.',
    mode: 'app',
  },
  {
    title: 'Calculator Builder',
    description: 'Generate a small calculator for pricing, budgets, fees, marks, or estimates.',
    examplePrompt: 'Create a loan EMI calculator with amount, rate, months, and monthly payment output.',
    mode: 'code',
  },
  {
    title: 'Form Builder',
    description: 'Build contact forms, lead forms, feedback forms, and request forms.',
    examplePrompt: 'Build a clean feedback form with name, rating, comments, and a thank-you message.',
    mode: 'code',
  },
  {
    title: 'AI Chatbot Builder',
    description: 'Plan a helpful chatbot for FAQs, support, tutoring, or product guidance.',
    examplePrompt: 'Build a customer support chatbot for a small clothing store with order and return answers.',
    mode: 'app',
  },
  {
    title: 'Dashboard Builder',
    description: 'Create a dashboard layout for tracking sales, tasks, students, or operations.',
    examplePrompt: 'Create a school dashboard showing students, attendance, fees, notices, and quick actions.',
    mode: 'app',
  },
  {
    title: 'Business Website Builder',
    description: 'Generate a professional website structure for local services and small companies.',
    examplePrompt: 'Build a business website for a plumbing service with services, prices, reviews, and booking.',
    mode: 'app',
  },
  {
    title: 'PDF/Document Tool Builder',
    description: 'Plan tools that turn forms into documents, invoices, PDFs, or summaries.',
    examplePrompt: 'Create a tool idea that generates simple invoices from customer, item, tax, and total details.',
    mode: 'prompt-app',
  },
  {
    title: 'Error Fixer',
    description: 'Paste an error and code, then get a simple explanation and a fixed version.',
    examplePrompt: 'Explain why my React button click is not working and show the fixed component.',
    mode: 'error',
  },
  {
    title: 'Code Explainer',
    description: 'Turn confusing code into plain English for non-coders and beginners.',
    examplePrompt: 'Explain this JavaScript function in simple language and list what each line does.',
    mode: 'prompt-app',
  },
];

const modeLabels: Record<ToolMode, string> = {
  app: 'App Builder',
  code: 'Code Generator',
  error: 'Error Fixer',
  ui: 'UI Enhancer',
  'prompt-app': 'Prompt to App',
};

const starterFiles: GeneratedFile[] = [
  {
    path: 'README.md',
    content: 'Generated project notes and code will appear here after you run Codely AI.',
  },
];

export default function BuilderWorkspace() {
  const formRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState(toolCategories[0]);
  const [activeMode, setActiveMode] = useState<ToolMode>('app');
  const [appIdea, setAppIdea] = useState(toolCategories[0].examplePrompt);
  const [targetUsers, setTargetUsers] = useState('Small business owners and non-technical users');
  const [featuresNeeded, setFeaturesNeeded] = useState('Clear homepage, simple form, helpful output, mobile-friendly layout');
  const [designStyle, setDesignStyle] = useState('Clean, modern, friendly, blue accents');
  const [userRequirement, setUserRequirement] = useState(toolCategories[2].examplePrompt);
  const [errorMessage, setErrorMessage] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [selectedPath, setSelectedPath] = useState(starterFiles[0].path);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const [showDeployGuide, setShowDeployGuide] = useState(false);
  const [usage, setUsage] = useState(getUsage);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tool = params.get('tool');
    const category = toolCategories.find((item) => slugify(item.title) === tool || item.mode === tool);
    if (category) {
      window.setTimeout(() => chooseCategory(category, false), 0);
    }
  }, []);

  const files = result?.files.length ? result.files : starterFiles;
  const selectedFile = files.find((file) => file.path === selectedPath) || files[0];
  const remaining = getRemainingGenerations(usage);
  const outputText = result?.output || 'Your generated plan, explanation, and code will appear here.';

  const modeDescription = useMemo(() => {
    if (activeMode === 'app') return 'Describe the app, users, features, and visual style. Codely returns a launch-ready plan and starter code.';
    if (activeMode === 'code') return 'Describe the small tool or component you need. Codely generates copyable HTML/CSS/JS or React code.';
    if (activeMode === 'error') return 'Paste an error and the related code. Codely explains the reason and gives fixed code.';
    if (activeMode === 'ui') return 'Paste a component and desired style. Codely improves the UI and explains the design changes.';
    return 'Write your app idea in plain English. Codely turns it into an MVP plan and starter code.';
  }, [activeMode]);

  function chooseCategory(category: ToolCategory, shouldScroll = true) {
    setActiveCategory(category);
    setActiveMode(category.mode);
    setError('');

    if (category.mode === 'app' || category.mode === 'prompt-app') {
      setAppIdea(category.examplePrompt);
    } else if (category.mode === 'code') {
      setUserRequirement(category.examplePrompt);
    } else if (category.mode === 'error') {
      setErrorMessage('Paste your error message here.');
      setCodeSnippet('// Paste the code that caused the error here.');
    }

    if (shouldScroll) {
      window.setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    }
  }

  async function runGeneration() {
    if (!canGenerate(usage)) {
      setError('You have 0 generations left this month. Upgrade to continue building.');
      return;
    }

    const payload = createPayload();
    if (!payload) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || data.output || 'Generation failed.');
      }

      const nextFiles = normalizeFiles(data.files || data.app?.files || []);
      const nextResult = normalizeResult(data, nextFiles);
      setResult(nextResult);
      setSelectedPath(nextFiles[0]?.path || 'README.md');

      let nextUsage = recordUsage('aiGenerations');
      if (activeMode === 'error') nextUsage = recordUsage('errorFixes');
      if (activeMode === 'ui') nextUsage = recordUsage('uiImprovements');
      setUsage(nextUsage);
      showToast('Generated successfully');
    } catch (generationError: any) {
      setError(generationError?.message || 'Codely could not generate the result.');
      showToast('Generation failed');
    } finally {
      setLoading(false);
    }
  }

  function createPayload() {
    if (activeMode === 'app') {
      if (!appIdea.trim()) {
        setError('Tell Codely what you want to build.');
        return null;
      }
      return {
        mode: 'app',
        prompt: appIdea,
        targetUsers,
        features: featuresNeeded,
        designStyle,
        category: activeCategory.title,
      };
    }

    if (activeMode === 'code') {
      if (!userRequirement.trim()) {
        setError('Describe the code or tool you need.');
        return null;
      }
      return { mode: 'code', prompt: userRequirement, category: activeCategory.title };
    }

    if (activeMode === 'error') {
      if (!errorMessage.trim() || !codeSnippet.trim()) {
        setError('Paste both the error message and code snippet.');
        return null;
      }
      return { mode: 'error', errorMessage, code: codeSnippet, category: activeCategory.title };
    }

    if (activeMode === 'ui') {
      if (!codeSnippet.trim()) {
        setError('Paste the component or code you want to improve.');
        return null;
      }
      return { mode: 'ui', code: codeSnippet, designStyle, category: activeCategory.title };
    }

    if (!appIdea.trim()) {
      setError('Describe your app idea in plain English.');
      return null;
    }
    return { mode: 'prompt-app', prompt: appIdea, category: activeCategory.title };
  }

  function saveCurrentProject() {
    if (!result) {
      setError('Generate something before saving a project.');
      return;
    }

    const name = window.prompt('Project name', result.title || activeCategory.title);
    if (!name?.trim()) return;

    saveProject({
      name: name.trim(),
      category: activeCategory.title,
      prompt: appIdea || userRequirement,
      output: result.output,
      files: result.files,
    });
    showToast('Project saved to dashboard');
  }

  async function copyCurrentCode() {
    const text = selectedFile?.content || outputText;
    await navigator.clipboard.writeText(text);
    showToast('Copied to clipboard');
  }

  function downloadCurrentCode() {
    const fileName = selectedFile?.path?.split('/').pop() || 'codely-output.txt';
    downloadTextFile(fileName, selectedFile?.content || outputText);
    showToast('Downloaded code');
  }

  function exportProject() {
    if (!result) {
      setError('Generate a result before exporting.');
      return;
    }
    const exportData = {
      name: result.title,
      category: activeCategory.title,
      prompt: appIdea || userRequirement,
      generatedAt: new Date().toISOString(),
      result,
    };
    downloadTextFile(`${slugify(result.title)}.json`, JSON.stringify(exportData, null, 2), 'application/json');
    setUsage(recordUsage('exports'));
    showToast('Export downloaded');
  }

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(''), 2400);
  }

  return (
    <>
      {toast && (
        <div className="fixed right-4 top-4 z-50 rounded-lg bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-lg">
          {toast}
        </div>
      )}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {toolCategories.map((category) => (
          <Card key={category.title} className="flex flex-col p-4">
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-950">{category.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{category.description}</p>
              <div className="mt-3 rounded-lg bg-slate-50 p-3 text-xs leading-5 text-slate-600">
                <span className="font-semibold text-slate-950">Example:</span> {category.examplePrompt}
              </div>
              <div className="mt-3 rounded-lg border border-dashed border-slate-200 p-3 text-xs text-slate-500">
                {activeCategory.title === category.title && result
                  ? `Generated output ready in ${modeLabels[activeMode]} below.`
                  : 'Generated output appears after you start this tool.'}
              </div>
            </div>
            <Button onClick={() => chooseCategory(category)} variant={activeCategory.title === category.title ? 'primary' : 'secondary'} className="mt-4 w-full">
              Start
            </Button>
          </Card>
        ))}
      </section>

      <div ref={formRef} className="mt-8 grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
        <Card className="p-5">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="text-sm font-semibold text-blue-600">{activeCategory.title}</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-950">{modeLabels[activeMode]}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{modeDescription}</p>
            </div>
            <div className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">
              {Number.isFinite(remaining) ? `${remaining} generations left` : 'Unlimited fair-use'}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {(Object.keys(modeLabels) as ToolMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => {
                  setActiveMode(mode);
                  setError('');
                }}
                className={`h-9 rounded-lg border px-3 text-sm font-semibold transition ${
                  activeMode === mode ? 'border-blue-200 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {modeLabels[mode]}
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            {(activeMode === 'app' || activeMode === 'prompt-app') && (
              <>
                <label className="block text-sm font-semibold text-slate-950">
                  What do you want to build?
                  <textarea
                    value={appIdea}
                    onChange={(event) => setAppIdea(event.target.value)}
                    className="mt-2 h-28 w-full resize-none rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-blue-300 focus:bg-white"
                    placeholder="Example: Build a booking website for a salon..."
                  />
                </label>
                {activeMode === 'app' && (
                  <>
                    <label className="block text-sm font-semibold text-slate-950">
                      Target users
                      <input
                        value={targetUsers}
                        onChange={(event) => setTargetUsers(event.target.value)}
                        className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-blue-300 focus:bg-white"
                      />
                    </label>
                    <label className="block text-sm font-semibold text-slate-950">
                      Features needed
                      <textarea
                        value={featuresNeeded}
                        onChange={(event) => setFeaturesNeeded(event.target.value)}
                        className="mt-2 h-24 w-full resize-none rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-blue-300 focus:bg-white"
                      />
                    </label>
                  </>
                )}
              </>
            )}

            {activeMode === 'code' && (
              <label className="block text-sm font-semibold text-slate-950">
                User requirement
                <textarea
                  value={userRequirement}
                  onChange={(event) => setUserRequirement(event.target.value)}
                  className="mt-2 h-36 w-full resize-none rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-blue-300 focus:bg-white"
                  placeholder="Describe the code or tool you need."
                />
              </label>
            )}

            {activeMode === 'error' && (
              <>
                <label className="block text-sm font-semibold text-slate-950">
                  Error message
                  <textarea
                    value={errorMessage}
                    onChange={(event) => setErrorMessage(event.target.value)}
                    className="mt-2 h-24 w-full resize-none rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-blue-300 focus:bg-white"
                    placeholder="Paste the full error message."
                  />
                </label>
                <CodeInput value={codeSnippet} onChange={setCodeSnippet} label="Code snippet" />
              </>
            )}

            {activeMode === 'ui' && (
              <>
                <CodeInput value={codeSnippet} onChange={setCodeSnippet} label="Existing component or code" />
                <label className="block text-sm font-semibold text-slate-950">
                  Desired style
                  <input
                    value={designStyle}
                    onChange={(event) => setDesignStyle(event.target.value)}
                    className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-blue-300 focus:bg-white"
                    placeholder="Example: premium SaaS, clean cards, soft shadows"
                  />
                </label>
              </>
            )}

            {activeMode === 'app' && (
              <label className="block text-sm font-semibold text-slate-950">
                Design style
                <input
                  value={designStyle}
                  onChange={(event) => setDesignStyle(event.target.value)}
                  className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-blue-300 focus:bg-white"
                />
              </label>
            )}
          </div>

          {error && (
            <div className="mt-5 rounded-lg border border-red-100 bg-red-50 p-4 text-sm text-red-700">
              <div className="flex gap-2">
                <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold">{error}</p>
                  <Button onClick={runGeneration} variant="secondary" className="mt-3 h-9">
                    Retry
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            <Button onClick={runGeneration} disabled={loading}>
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
              {loading ? 'Generating' : activeMode === 'error' ? 'Fix Error' : activeMode === 'ui' ? 'Improve UI' : activeMode === 'code' ? 'Generate Code' : 'Generate App'}
            </Button>
            <Button onClick={saveCurrentProject} variant="secondary">
              <Save size={16} />
              Save Project
            </Button>
            <Button onClick={exportProject} variant="secondary">
              <Download size={16} />
              Export
            </Button>
            <Button onClick={() => setShowDeployGuide(true)} variant="dark">
              <Rocket size={16} />
              Deploy
            </Button>
          </div>
        </Card>

        <div className="grid gap-4">
          <Card className="p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Wand2 className="text-blue-600" size={20} />
                <h2 className="font-semibold text-slate-950">Generated output</h2>
              </div>
              {result?.provider && <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">AI: {result.provider}</span>}
            </div>
            {loading ? (
              <div className="space-y-3">
                <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
                <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
                <div className="h-4 w-4/5 animate-pulse rounded bg-slate-100" />
                <div className="h-40 animate-pulse rounded-lg bg-slate-100" />
              </div>
            ) : (
              <>
                {result && (
                  <div className="mb-4 rounded-lg border border-emerald-100 bg-emerald-50 p-3 text-sm text-emerald-800">
                    <div className="flex items-center gap-2 font-semibold">
                      <CheckCircle2 size={16} />
                      {result.summary}
                    </div>
                  </div>
                )}
                <pre className="max-h-[420px] overflow-auto rounded-lg bg-slate-950 p-4 text-sm leading-6 text-slate-100 whitespace-pre-wrap">
                  {outputText}
                </pre>
              </>
            )}
          </Card>

          <Card className="p-5">
            <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <FileCode2 className="text-blue-600" size={20} />
                <h2 className="font-semibold text-slate-950">Generated code</h2>
              </div>
              <div className="flex gap-2">
                <Button onClick={copyCurrentCode} variant="secondary" className="h-9">
                  <Clipboard size={15} />
                  Copy Code
                </Button>
                <Button onClick={downloadCurrentCode} variant="secondary" className="h-9">
                  <Download size={15} />
                  Download Code
                </Button>
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
              <div className="space-y-1">
                {files.map((file) => (
                  <button
                    key={file.path}
                    type="button"
                    onClick={() => setSelectedPath(file.path)}
                    className={`flex h-9 w-full items-center gap-2 rounded-lg px-3 text-left text-sm transition ${
                      selectedPath === file.path ? 'bg-blue-50 font-semibold text-blue-700' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Code2 size={14} />
                    <span className="truncate">{file.path}</span>
                  </button>
                ))}
              </div>
              <pre className="max-h-80 overflow-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-slate-100">
                <code>{selectedFile?.content || 'Generated code will appear here.'}</code>
              </pre>
            </div>
          </Card>
        </div>
      </div>

      {showDeployGuide && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4">
          <Card className="max-w-2xl p-6">
            <h2 className="text-2xl font-bold text-slate-950">Deploy to Vercel guide</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Direct one-click deployment can be integrated later. For launch today, export your code and deploy it as a
              standard Next.js project on Vercel.
            </p>
            <ol className="mt-5 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-700">
              <li>Click Export to download your generated project JSON/code.</li>
              <li>Create or update a GitHub repository with the files.</li>
              <li>Import the repository in Vercel and choose the Next.js framework preset.</li>
              <li>Add server environment variables such as GEMINI_API_KEY, OPENAI_API_KEY, GROQ_API_KEY, and Razorpay keys.</li>
              <li>Use build command npm run build and leave the output directory blank.</li>
            </ol>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Button href="/help" variant="secondary" className="w-full">
                Open Help Guide
              </Button>
              <Button onClick={() => setShowDeployGuide(false)} className="w-full">
                Got it
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}

function CodeInput({ value, onChange, label }: { value: string; onChange: (value: string) => void; label: string }) {
  return (
    <label className="block text-sm font-semibold text-slate-950">
      {label}
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-40 w-full resize-none rounded-lg border border-slate-200 bg-slate-950 p-4 font-mono text-sm text-slate-100 outline-none focus:border-blue-300"
        placeholder="Paste code here."
      />
    </label>
  );
}

function normalizeResult(data: any, files: GeneratedFile[]): GenerationResult {
  const app = data.app;
  if (app) {
    const planLines = [
      `App plan: ${app.plan || app.description || 'A simple app based on your prompt.'}`,
      '',
      `Pages required:\n${formatList(app.pages)}`,
      '',
      `Components required:\n${formatList(app.components)}`,
      '',
      `Suggested tech stack:\n${formatList(app.techStack)}`,
      '',
      'Generated code is available in the code panel.',
    ];

    return {
      title: app.appName || data.title || 'Generated Codely App',
      summary: app.description || 'Generated an app plan and starter code.',
      output: planLines.join('\n'),
      files,
      provider: data.provider,
    };
  }

  return {
    title: data.title || 'Codely generation',
    summary: data.summary || 'Generated a useful result.',
    output: data.output || data.code || 'Generation finished.',
    files,
    provider: data.provider,
  };
}

function normalizeFiles(files: GeneratedFile[]) {
  const usable = files
    .filter((file) => file?.path && typeof file.content === 'string')
    .map((file) => ({ path: file.path, content: file.content }))
    .slice(0, 12);
  return usable.length ? usable : starterFiles;
}

function formatList(value: string[] | string | undefined) {
  if (Array.isArray(value)) return value.map((item) => `- ${item}`).join('\n');
  if (typeof value === 'string' && value.trim()) return `- ${value}`;
  return '- Home page\n- Main tool screen\n- Result screen';
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
