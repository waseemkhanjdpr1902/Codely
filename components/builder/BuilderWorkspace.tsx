'use client';

import { AlertTriangle, CheckCircle2, Clipboard, Code2, Download, FileText, Folder, Loader2, Rocket, Save, Sparkles } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { auth } from '@/lib/firebase-client';
import { GeneratedFile, canGenerate, recordUsage, saveProject } from '@/lib/local-workspace';

type ProjectType = 'Website' | 'Mobile App' | 'SaaS Tool' | 'Calculator' | 'Dashboard' | 'Form' | 'AI Tool' | 'Custom';
type OutputTab = 'Preview' | 'Files' | 'Code' | 'Run & Deploy';

type ProjectFile = GeneratedFile & {
  language?: string;
};

type GenerationResult = {
  summary: string;
  projectType: string;
  files: ProjectFile[];
  runCommands: string[];
  provider?: string;
};

type TreeNode = {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children: TreeNode[];
};

const projectTypes: ProjectType[] = ['Website', 'Mobile App', 'SaaS Tool', 'Calculator', 'Dashboard', 'Form', 'AI Tool', 'Custom'];
const advancedOptions = ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Firebase', 'Supabase', 'Razorpay', 'Stripe', 'API Backend', 'Mobile APK/PWA'];
const outputTabs: OutputTab[] = ['Preview', 'Files', 'Code', 'Run & Deploy'];

const starterFiles: ProjectFile[] = [
  {
    path: 'package.json',
    language: 'json',
    content: '{\n  "scripts": {\n    "dev": "next dev",\n    "build": "next build",\n    "start": "next start"\n  }\n}\n',
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
    content: `export default function MainTool() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <section className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">Your app preview will appear here</h1>
        <p className="mt-3 text-slate-600">Describe your idea and click Generate My App.</p>
      </section>
    </main>
  );
}
`,
  },
  { path: 'app/globals.css', language: 'css', content: '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n' },
  { path: 'README.md', language: 'markdown', content: '# Codely app\n\nGenerated project notes will appear here.\n' },
];

export default function BuilderWorkspace() {
  const [prompt, setPrompt] = useState('Create a loan EMI calculator with amount, interest rate, months, EMI result, and download option.');
  const [projectType, setProjectType] = useState<ProjectType>('Calculator');
  const [selectedAdvanced, setSelectedAdvanced] = useState<string[]>(['Next.js', 'React', 'TypeScript', 'Tailwind']);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activeTab, setActiveTab] = useState<OutputTab>('Preview');
  const [selectedPath, setSelectedPath] = useState('app/page.tsx');
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [developerDetails, setDeveloperDetails] = useState('');
  const [toast, setToast] = useState('');
  const [showDeployGuide, setShowDeployGuide] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryPrompt = params.get('prompt');
    const category = params.get('category');
    window.setTimeout(() => {
      if (queryPrompt) setPrompt(queryPrompt);
      if (category) setProjectType(matchProjectType(category));
    }, 0);
  }, []);

  const files = result?.files.length ? result.files : starterFiles;
  const selectedFile = files.find((file) => file.path === selectedPath) || files[0];
  const fileTree = useMemo(() => buildFileTree(files), [files]);

  async function generateApp() {
    if (!prompt.trim()) {
      setError('Describe your idea first.');
      return;
    }

    if (!canGenerate()) {
      setError('You have used your available credits. Upgrade or wait for the next monthly reset.');
      return;
    }

    setLoading(true);
    setError('');
    setDeveloperDetails('');
    setActiveTab('Preview');

    try {
      const token = await auth?.currentUser?.getIdToken();
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({
          mode: 'app',
          prompt,
          category: projectType,
          techStack: selectedAdvanced,
          targetUsers: 'Non-coders and small teams',
          features: `Project type: ${projectType}. Selected options: ${selectedAdvanced.join(', ')}.`,
          designStyle: 'Modern, simple, responsive, Tailwind CSS',
        }),
      });
      const data = await response.json().catch(() => ({ success: false, message: 'Generation endpoint did not return JSON.' }));

      if (!response.ok || !data.success) {
        setError('AI service is not configured correctly. Please check API keys in Vercel.');
        setDeveloperDetails(formatDeveloperDetails(data, response.status));
        showToast('Generation failed');
        return;
      }

      const output = data.output || data;
      const nextFiles = normalizeFiles(output.files || data.files || []);
      setResult({
        summary: output.summary || data.summary || 'Codely generated a complete modern app project for you.',
        projectType: output.projectType || 'nextjs',
        files: nextFiles,
        runCommands: normalizeRunCommands(output.runCommands),
        provider: data.provider,
      });
      setSelectedPath(nextFiles.find((file) => file.path === 'app/page.tsx')?.path || nextFiles[0]?.path || 'app/page.tsx');
      recordUsage('aiGenerations');
      showToast('App generated');
    } catch (generationError: any) {
      setError('AI service is not configured correctly. Please check API keys in Vercel.');
      setDeveloperDetails(generationError?.message || 'Unknown browser-side generation error.');
      showToast('Generation failed');
    } finally {
      setLoading(false);
    }
  }

  function toggleAdvanced(option: string) {
    setSelectedAdvanced((current) => (current.includes(option) ? current.filter((item) => item !== option) : [...current, option]));
  }

  async function copyCode() {
    await navigator.clipboard.writeText(selectedFile?.content || '');
    showToast('Code copied');
  }

  async function downloadProject() {
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();

    files.forEach((file) => {
      zip.file(file.path, file.content);
    });

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${slugify(projectType)}-codely-app.zip`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast('Project downloaded');
  }

  function saveCurrentProject() {
    if (!result) {
      setError('Generate an app before saving.');
      return;
    }

    saveProject({
      name: `${projectType} project`,
      category: projectType,
      prompt,
      output: result.summary,
      files,
    });
    showToast('Project saved');
  }

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(''), 2400);
  }

  return (
    <>
      {toast && <div className="fixed right-4 top-4 z-50 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-lg">{toast}</div>}

      <section className="mx-auto max-w-5xl">
        <div className="text-center">
          <div className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-700">
            <Sparkles size={22} />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">What do you want to build?</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Describe your idea. Codely will generate a complete modern app project for you.
          </p>
        </div>

        <Card className="mt-8 p-4 sm:p-5">
          <label className="text-sm font-semibold text-slate-950" htmlFor="builder-prompt">
            Describe your idea
          </label>
          <textarea
            id="builder-prompt"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            className="mt-3 min-h-44 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-5 text-base outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white"
            placeholder="Example: Create a loan EMI calculator with amount, interest rate, months, EMI result, and download option."
          />

          <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
            <label className="text-sm font-semibold text-slate-950" htmlFor="project-type">
              What type of project?
              <select
                id="project-type"
                value={projectType}
                onChange={(event) => setProjectType(event.target.value as ProjectType)}
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-300"
              >
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <Button onClick={generateApp} disabled={loading} className="h-11 px-6">
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
              {loading ? 'Generating' : 'Generate My App'}
            </Button>
          </div>

          <details className="mt-4 rounded-2xl border border-slate-200 bg-white p-4" open={showAdvanced} onToggle={(event) => setShowAdvanced(event.currentTarget.open)}>
            <summary className="cursor-pointer text-sm font-semibold text-slate-700">Advanced settings</summary>
            <div className="mt-4 flex flex-wrap gap-2">
              {advancedOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleAdvanced(option)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                    selectedAdvanced.includes(option) ? 'border-blue-300 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </details>

          {error && (
            <div className="mt-4 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
              <div className="flex gap-2">
                <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold">{error}</p>
                  {developerDetails && (
                    <details className="mt-3 rounded-lg border border-red-100 bg-white p-3 text-slate-700">
                      <summary className="cursor-pointer text-sm font-semibold text-slate-900">Developer details</summary>
                      <pre className="mt-3 max-h-52 overflow-auto whitespace-pre-wrap text-xs leading-5">{developerDetails}</pre>
                    </details>
                  )}
                  <Button onClick={generateApp} variant="secondary" disabled={loading} className="mt-3">
                    Retry
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card>

        <Card className="mt-5 overflow-hidden">
          <div className="border-b border-slate-200 p-3">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2">
                {outputTabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                      activeTab === tab ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              {result && (
                <div className="flex flex-wrap gap-2">
                  <Button onClick={copyCode} variant="secondary" className="h-9">
                    <Clipboard size={15} />
                    Copy Code
                  </Button>
                  <Button onClick={downloadProject} variant="secondary" className="h-9">
                    <Download size={15} />
                    Download Project
                  </Button>
                  <Button onClick={saveCurrentProject} variant="secondary" className="h-9">
                    <Save size={15} />
                    Save Project
                  </Button>
                  <Button onClick={() => setShowDeployGuide(true)} variant="dark" className="h-9">
                    <Rocket size={15} />
                    Deploy Guide
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="p-5">{renderOutput()}</div>
        </Card>
      </section>

      {showDeployGuide && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4">
          <Card className="max-w-xl p-6">
            <h2 className="text-2xl font-bold text-slate-950">Deploy to Vercel</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Download the project, add it to GitHub, import it in Vercel, add your API keys, then deploy. Use
              <span className="font-semibold"> npm run build</span> as the build command.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Button href="/help" variant="secondary">
                Open full guide
              </Button>
              <Button onClick={() => setShowDeployGuide(false)}>Got it</Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );

  function renderOutput() {
    if (activeTab === 'Preview') {
      return (
        <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 to-white p-6">
            <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-blue-700">
              <CheckCircle2 size={16} />
              Preview
            </div>
            <h2 className="text-2xl font-bold text-slate-950">{projectType} project</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {result?.summary || 'After generation, Codely will show a clear preview explanation here. If the preview cannot run inside the browser, you will still see the pages and project files.'}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {['Modern UI', 'Real files', 'Run locally'].map((item) => (
                <div key={item} className="rounded-xl bg-white p-4 text-sm font-semibold text-slate-700 shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 p-4">
            <p className="mb-3 text-sm font-semibold text-slate-950">File tree</p>
            {fileTree.map((node) => renderFileNode(node))}
          </div>
        </div>
      );
    }

    if (activeTab === 'Files') {
      return <div className="rounded-2xl border border-slate-200 p-4">{fileTree.map((node) => renderFileNode(node))}</div>;
    }

    if (activeTab === 'Code') {
      return (
        <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
          <div className="rounded-2xl border border-slate-200 p-3">{fileTree.map((node) => renderFileNode(node))}</div>
          <pre className="max-h-[560px] overflow-auto rounded-2xl bg-slate-950 p-4 text-xs leading-6 text-slate-100">
            <code>{selectedFile?.content || 'Generated code will appear here.'}</code>
          </pre>
        </div>
      );
    }

    return (
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-5">
          <FileText className="text-blue-600" size={22} />
          <h3 className="mt-3 font-semibold text-slate-950">Run on your computer</h3>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-600">
            {(result?.runCommands || ['npm install', 'npm run dev']).map((command) => (
              <li key={command}>
                <code>{command}</code>
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-2xl border border-slate-200 p-5">
          <Rocket className="text-blue-600" size={22} />
          <h3 className="mt-3 font-semibold text-slate-950">Deploy to Vercel</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Download Project, push it to GitHub, import it in Vercel, add environment variables, then deploy.
          </p>
          <Button onClick={() => setShowDeployGuide(true)} className="mt-4">
            Deploy Guide
          </Button>
        </div>
      </div>
    );
  }

  function renderFileNode(node: TreeNode, depth = 0): React.ReactNode {
    if (node.type === 'folder') {
      return (
        <div key={node.path}>
          <div className="flex h-8 items-center gap-2 text-sm font-semibold text-slate-700" style={{ paddingLeft: depth * 14 }}>
            <Folder size={15} className="text-blue-500" />
            {node.name}
          </div>
          {node.children.map((child) => renderFileNode(child, depth + 1))}
        </div>
      );
    }

    return (
      <button
        key={node.path}
        type="button"
        onClick={() => setSelectedPath(node.path)}
        className={`flex h-8 w-full items-center gap-2 rounded-lg px-2 text-left text-sm transition ${
          selectedPath === node.path ? 'bg-blue-50 font-semibold text-blue-700' : 'text-slate-600 hover:bg-slate-50'
        }`}
        style={{ paddingLeft: 8 + depth * 14 }}
      >
        <Code2 size={14} className="text-slate-400" />
        <span className="truncate">{node.name}</span>
      </button>
    );
  }
}

function buildFileTree(files: ProjectFile[]): TreeNode[] {
  const root: TreeNode[] = [];

  files.forEach((file) => {
    const parts = file.path.split('/').filter(Boolean);
    let currentLevel = root;
    let currentPath = '';

    parts.forEach((part, index) => {
      currentPath = currentPath ? `${currentPath}/${part}` : part;
      const isFile = index === parts.length - 1;
      let node = currentLevel.find((item) => item.name === part);

      if (!node) {
        node = { name: part, path: currentPath, type: isFile ? 'file' : 'folder', children: [] };
        currentLevel.push(node);
      }

      currentLevel = node.children;
    });
  });

  return root;
}

function normalizeFiles(files: ProjectFile[]) {
  const usable = files
    .filter((file) => file?.path && typeof file.content === 'string')
    .map((file) => ({ path: file.path, language: file.language || inferLanguage(file.path), content: file.content }))
    .slice(0, 24);
  return usable.length ? usable : starterFiles;
}

function normalizeRunCommands(commands: unknown) {
  if (Array.isArray(commands)) return commands.map((command) => String(command)).filter(Boolean);
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

function matchProjectType(value: string): ProjectType {
  const normalized = value.toLowerCase();
  if (normalized.includes('mobile')) return 'Mobile App';
  if (normalized.includes('saas')) return 'SaaS Tool';
  if (normalized.includes('calculator')) return 'Calculator';
  if (normalized.includes('dashboard')) return 'Dashboard';
  if (normalized.includes('form')) return 'Form';
  if (normalized.includes('ai')) return 'AI Tool';
  if (normalized.includes('website')) return 'Website';
  return 'Custom';
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'codely';
}

function formatDeveloperDetails(data: any, status: number) {
  const lines = [`HTTP status: ${status}`];
  if (data?.message) lines.push(`Message: ${data.message}`);
  if (Array.isArray(data?.details)) {
    lines.push('Provider details:');
    data.details.forEach((detail: any) => {
      lines.push(`- ${detail.provider || 'unknown'}${detail.status ? ` (${detail.status})` : ''}: ${detail.reason || 'No reason provided.'}`);
    });
  }
  return lines.join('\n');
}
