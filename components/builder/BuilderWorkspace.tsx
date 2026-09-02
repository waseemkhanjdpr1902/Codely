'use client';

import { AlertTriangle, Clipboard, Code2, Download, FileText, Folder, Loader2, Monitor, Rocket, Save, Smartphone, Sparkles } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { auth } from '@/lib/firebase-client';
import { GeneratedFile, canGenerate, recordUsage, saveProject } from '@/lib/local-workspace';

type ProjectType = 'Website' | 'Mobile App' | 'SaaS Tool' | 'Calculator' | 'Dashboard' | 'Form' | 'AI Tool' | 'Custom';
type PreviewSize = 'desktop' | 'mobile';
type OutputTab = 'Result' | 'Project Files' | 'Code' | 'Launch';

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
const outputTabs: OutputTab[] = ['Result', 'Project Files', 'Code', 'Launch'];
const quickIdeas = ['Booking website for my service business', 'Expense tracker for my small team', 'Customer enquiry form with email alerts'];

const starterFiles: ProjectFile[] = [
  {
    path: 'preview.html',
    language: 'html',
    content: '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{font-family:system-ui;margin:0;display:grid;min-height:100vh;place-items:center;background:#eff6ff;color:#0f172a}.card{max-width:600px;margin:24px;padding:32px;border-radius:20px;background:white;box-shadow:0 20px 50px #1e3a8a18}p{color:#475569}</style></head><body><main class="card"><h1>Your app preview will appear here</h1><p>Describe your idea and click Generate My App.</p></main></body></html>',
  },
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
  const [prompt, setPrompt] = useState('');
  const [projectType, setProjectType] = useState<ProjectType>('Calculator');
  const [selectedAdvanced, setSelectedAdvanced] = useState<string[]>(['Next.js', 'React', 'TypeScript', 'Tailwind']);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activeTab, setActiveTab] = useState<OutputTab>('Result');
  const [selectedPath, setSelectedPath] = useState('app/page.tsx');
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [developerDetails, setDeveloperDetails] = useState('');
  const [toast, setToast] = useState('');
  const [showDeployGuide, setShowDeployGuide] = useState(false);
  const [revision, setRevision] = useState('');
  const [previewSize, setPreviewSize] = useState<PreviewSize>('desktop');

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
    setActiveTab('Result');

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

  async function reviseApp() {
    if (!result || !revision.trim()) {
      setError('Generate an app, then describe the change you want.');
      return;
    }

    setLoading(true);
    setError('');
    setDeveloperDetails('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'revise',
          prompt,
          category: projectType,
          techStack: selectedAdvanced,
          revision,
          existingFiles: result.files,
        }),
      });
      const data = await response.json().catch(() => ({ success: false, message: 'Generation endpoint did not return JSON.' }));
      if (!response.ok || !data.success) {
        setError(data.message || 'Codely could not apply that change.');
        setDeveloperDetails(formatDeveloperDetails(data, response.status));
        return;
      }

      const output = data.output || data;
      const nextFiles = normalizeFiles(output.files || data.files || []);
      setResult({
        summary: output.summary || result.summary,
        projectType: output.projectType || result.projectType,
        files: nextFiles,
        runCommands: normalizeRunCommands(output.runCommands),
        provider: data.provider,
      });
      setRevision('');
      setActiveTab('Result');
      recordUsage('aiGenerations');
      showToast('Change applied');
    } catch (revisionError: any) {
      setError('Codely could not apply that change.');
      setDeveloperDetails(revisionError?.message || 'Unknown revision error.');
    } finally {
      setLoading(false);
    }
  }

  function updateSelectedFile(content: string) {
    if (!result || !selectedFile) return;
    setResult({ ...result, files: result.files.map((file) => (file.path === selectedFile.path ? { ...file, content } : file)) });
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
          <p className="text-sm font-semibold text-blue-600">Step 1 of 3</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Describe your app idea</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Use everyday language. Include who will use it and the main things it should do.
          </p>
        </div>

        <Card className="mt-8 p-4 sm:p-5">
          <label className="text-sm font-semibold text-slate-950" htmlFor="builder-prompt">
            What should your app do?
          </label>
          <textarea
            id="builder-prompt"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            className="mt-3 min-h-44 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-5 text-base outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white"
            placeholder="Example: Build a booking website for my cleaning business. Customers should choose a service, date and time, then send a booking request."
          />

          {!prompt && (
            <div className="mt-3 flex flex-wrap gap-2">
              {quickIdeas.map((idea) => (
                <button key={idea} type="button" onClick={() => setPrompt(idea)} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-left text-xs font-medium text-slate-600 hover:border-blue-200 hover:bg-blue-50">
                  {idea}
                </button>
              ))}
            </div>
          )}

          <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
            <label className="text-sm font-semibold text-slate-950" htmlFor="project-type">
              App type
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
              {loading ? 'Building your app...' : 'Build my app'}
            </Button>
          </div>

          <details className="mt-4 rounded-2xl border border-slate-200 bg-white p-4" open={showAdvanced} onToggle={(event) => setShowAdvanced(event.currentTarget.open)}>
            <summary className="cursor-pointer text-sm font-semibold text-slate-700">Optional settings</summary>
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
    if (activeTab === 'Result') {
      const previewHtml = files.find((file) => file.path === 'preview.html')?.content;
      return (
        <div className="space-y-4">
          {result && (
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
              <label htmlFor="revision" className="text-sm font-semibold text-slate-950">What would you like to change?</label>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                <input id="revision" value={revision} onChange={(event) => setRevision(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') reviseApp(); }} className="h-11 flex-1 rounded-xl border border-blue-200 bg-white px-4 text-sm outline-none focus:border-blue-400" placeholder="Example: Make it green and add an email field" />
                <Button onClick={reviseApp} disabled={loading || !revision.trim()} className="h-11">
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                  Apply change
                </Button>
              </div>
            </div>
          )}
          <div className="rounded-2xl border border-slate-200 bg-slate-100 p-3">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-950">Interactive preview</p>
                <p className="text-xs text-slate-500">Runs in an isolated browser frame</p>
              </div>
              <div className="flex rounded-xl bg-white p-1 shadow-sm">
                <button type="button" onClick={() => setPreviewSize('desktop')} aria-label="Desktop preview" className={`rounded-lg p-2 ${previewSize === 'desktop' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}><Monitor size={16} /></button>
                <button type="button" onClick={() => setPreviewSize('mobile')} aria-label="Mobile preview" className={`rounded-lg p-2 ${previewSize === 'mobile' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}><Smartphone size={16} /></button>
              </div>
            </div>
            <div className="mx-auto overflow-hidden rounded-xl bg-white shadow-sm transition-all" style={{ maxWidth: previewSize === 'mobile' ? 390 : 1200 }}>
              {previewHtml ? (
                <iframe title="Generated app preview" sandbox="allow-scripts allow-forms allow-modals allow-downloads" srcDoc={securePreviewHtml(previewHtml)} className="h-[620px] w-full border-0" />
              ) : (
                <div className="grid h-[420px] place-items-center p-8 text-center text-sm text-slate-500">Generate your app to open its live preview.</div>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'Project Files') {
      return <div className="rounded-2xl border border-slate-200 p-4">{fileTree.map((node) => renderFileNode(node))}</div>;
    }

    if (activeTab === 'Code') {
      return (
        <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
          <div className="rounded-2xl border border-slate-200 p-3">{fileTree.map((node) => renderFileNode(node))}</div>
          <div>
            <div className="mb-2 flex items-center justify-between"><p className="text-sm font-semibold text-slate-950">{selectedFile?.path}</p><span className="text-xs text-slate-500">Changes are included when you save or download</span></div>
            <textarea aria-label={`Edit ${selectedFile?.path || 'generated file'}`} value={selectedFile?.content || ''} onChange={(event) => updateSelectedFile(event.target.value)} spellCheck={false} className="h-[560px] w-full resize-none overflow-auto rounded-2xl border-0 bg-slate-950 p-4 font-mono text-xs leading-6 text-slate-100 outline-none ring-blue-400 focus:ring-2" />
          </div>
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

function securePreviewHtml(html: string) {
  const policy = `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src data: blob:; font-src data:; media-src data: blob:;">`;
  if (/<head[\s>]/i.test(html)) return html.replace(/<head([^>]*)>/i, `<head$1>${policy}`);
  return `${policy}${html}`;
}

function inferLanguage(path: string) {
  if (path.endsWith('.html')) return 'html';
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
