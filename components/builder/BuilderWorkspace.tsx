'use client';

import { CheckCircle2, ChevronRight, File, FileCode2, Folder, Globe2, Loader2, Monitor, Rocket, Save, Send, Workflow } from 'lucide-react';
import { useMemo, useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

type GeneratedFile = {
  path: string;
  content: string;
};

type GeneratedApp = {
  appName: string;
  description: string;
  files: GeneratedFile[];
};

type TreeNode = {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children: TreeNode[];
};

const categories = ['Website', 'SaaS App', 'Dashboard', 'Landing Page', 'API Tool'];
const progressSteps = ['Understanding prompt', 'Planning architecture', 'Generating files', 'Creating UI', 'Preparing preview'];

const starterFiles: GeneratedFile[] = [
  { path: 'app/page.tsx', content: '// Generated page code will appear here after you run Codely AI.' },
  { path: 'components/Hero.tsx', content: '// Component files will be added here.' },
  { path: 'README.md', content: '# Codely\n\nGenerated project notes will appear here.' },
];

export default function BuilderWorkspace() {
  const [prompt, setPrompt] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Website');
  const [selectedPath, setSelectedPath] = useState(starterFiles[0].path);
  const [generatedApp, setGeneratedApp] = useState<GeneratedApp>({
    appName: 'Preview placeholder',
    description: 'Generated UI preview will appear here.',
    files: starterFiles,
  });
  const [logs, setLogs] = useState<string[]>(['Ready. Describe your app and click Generate App.']);
  const [activeStep, setActiveStep] = useState(-1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [toast, setToast] = useState('');
  const [error, setError] = useState('');

  const selectedFile = generatedApp.files.find((file) => file.path === selectedPath) || generatedApp.files[0];
  const progress = activeStep < 0 ? 0 : Math.min(100, ((activeStep + 1) / progressSteps.length) * 100);
  const fileTree = useMemo(() => buildFileTree(generatedApp.files), [generatedApp.files]);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2400);
  };

  const addLog = (message: string) => {
    setLogs((current) => [...current, message]);
  };

  const runProgressStep = async (step: string, index: number) => {
    setActiveStep(index);
    addLog(step);
    await wait(450);
  };

  const generateApp = async () => {
    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt) {
      setError('Describe the app you want Codely to generate first.');
      showToast('Add a prompt first');
      return;
    }

    setError('');
    setLogs([]);
    setIsGenerating(true);
    setActiveStep(0);
    addLog('Starting Codely generation...');

    try {
      await runProgressStep('Understanding prompt', 0);
      await runProgressStep('Planning architecture', 1);
      await runProgressStep('Generating files', 2);

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'app',
          prompt: trimmedPrompt,
          category: selectedCategory,
        }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || data.output || 'Generation failed.');
      }

      const app = normalizeGeneratedApp(data.app);
      await runProgressStep('Creating UI', 3);
      await runProgressStep('Preparing preview', 4);

      setGeneratedApp(app);
      setSelectedPath(app.files[0]?.path || '');
      addLog(`Generated ${app.files.length} files for ${app.appName}.`);
      showToast('App generated');
    } catch (generationError: any) {
      const message = generationError?.message || 'Codely could not generate the app.';
      setError(message);
      addLog(`Error: ${message}`);
      showToast('Generation failed');
    } finally {
      setIsGenerating(false);
    }
  };

  const placeholderAction = () => showToast('Coming in next phase');

  return (
    <>
      {toast && (
        <div className="fixed right-4 top-4 z-50 rounded-lg bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-lg">
          {toast}
        </div>
      )}

      <div className="grid gap-4 xl:grid-cols-[0.9fr_0.7fr_1fr]">
        <Card className="p-5">
          <label className="text-sm font-semibold text-slate-950" htmlFor="builder-prompt">
            App prompt
          </label>
          <textarea
            id="builder-prompt"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            disabled={isGenerating}
            className="mt-3 h-48 w-full resize-none rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white disabled:opacity-70"
            placeholder="Example: Build a subscription CRM for small agencies with dashboard, auth, pricing, and settings."
          />
          {error && <p className="mt-2 text-sm font-semibold text-red-600">{error}</p>}

          <div className="mt-5">
            <p className="mb-3 text-sm font-semibold text-slate-950">Category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  disabled={isGenerating}
                  onClick={() => setSelectedCategory(category)}
                  className={`h-9 rounded-lg border px-3 text-sm font-semibold transition ${
                    selectedCategory === category
                      ? 'border-blue-200 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  } disabled:opacity-60`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-950">Generation progress</p>
              <span className="text-xs font-semibold text-slate-500">{Math.round(progress)}%</span>
            </div>
            <div className="mb-4 h-2 overflow-hidden rounded-lg bg-white">
              <div className="h-full rounded-lg bg-blue-600 transition-all" style={{ width: `${progress}%` }} />
            </div>
            <div className="space-y-2">
              {progressSteps.map((step, index) => (
                <div key={step} className="flex items-center gap-2 text-sm text-slate-600">
                  {isGenerating && activeStep === index ? (
                    <Loader2 size={15} className="animate-spin text-blue-600" />
                  ) : activeStep >= index ? (
                    <CheckCircle2 size={15} className="text-emerald-600" />
                  ) : (
                    <span className="h-[15px] w-[15px] rounded-full border border-slate-300" />
                  )}
                  {step}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={generateApp}
              disabled={isGenerating}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#2563eb] px-4 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition hover:bg-[#1d4ed8] disabled:opacity-60"
            >
              {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              {isGenerating ? 'Generating' : 'Generate App'}
            </button>
            <Button variant="secondary" actionMessage="Coming in next phase">
              <Save size={16} />
              Save Project
            </Button>
            <Button variant="secondary" actionMessage="Coming in next phase">
              <Workflow size={16} />
              Export to GitHub
            </Button>
            <Button variant="dark" actionMessage="Coming in next phase">
              <Rocket size={16} />
              Deploy to Vercel
            </Button>
          </div>
        </Card>

        <Card className="p-5">
          <div className="mb-4 flex items-center gap-2">
            <FileCode2 className="text-blue-600" size={20} />
            <h2 className="font-semibold text-slate-950">Generated files</h2>
          </div>
          {isGenerating && generatedApp.files === starterFiles ? <ShimmerFiles /> : null}
          <div className="space-y-1">
            {fileTree.map((node) => (
              <FileTreeNode key={node.path} node={node} selectedPath={selectedPath} onSelect={setSelectedPath} />
            ))}
          </div>

          <div className="mt-5 rounded-lg border border-slate-200 bg-slate-950">
            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
              <p className="truncate text-sm font-semibold text-slate-100">{selectedFile?.path || 'No file selected'}</p>
              <span className="text-xs text-slate-500">{getLanguage(selectedFile?.path || '')}</span>
            </div>
            <pre className="max-h-80 overflow-auto p-4 text-xs leading-6 text-slate-100">
              <code>{selectedFile?.content || 'Select a generated file.'}</code>
            </pre>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="flex items-center gap-2 border-b border-slate-200 px-5 py-4">
            <Monitor className="text-blue-600" size={20} />
            <h2 className="font-semibold text-slate-950">Preview</h2>
          </div>
          <div className="bg-slate-100 p-5">
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <div className="mb-6 flex items-center justify-between">
                <div className="h-3 w-24 rounded-lg bg-slate-900" />
                <div className="flex gap-2">
                  <div className="h-3 w-10 rounded-lg bg-slate-200" />
                  <div className="h-3 w-10 rounded-lg bg-slate-200" />
                </div>
              </div>
              <MockPreview app={generatedApp} prompt={prompt} isGenerating={isGenerating} />
            </div>
          </div>
          <div className="border-t border-slate-200 bg-white p-5">
            <p className="mb-3 text-sm font-semibold text-slate-950">Logs</p>
            <div className="max-h-44 overflow-auto rounded-lg bg-slate-950 p-4 font-mono text-xs leading-6 text-emerald-300">
              {logs.map((log, index) => (
                <div key={`${log}-${index}`}>{`> ${log}`}</div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

function FileTreeNode({
  node,
  selectedPath,
  onSelect,
  depth = 0,
}: {
  node: TreeNode;
  selectedPath: string;
  onSelect: (path: string) => void;
  depth?: number;
}) {
  if (node.type === 'folder') {
    return (
      <div>
        <div className="flex h-8 items-center gap-2 text-sm font-semibold text-slate-700" style={{ paddingLeft: depth * 14 }}>
          <ChevronRight size={14} className="rotate-90 text-slate-400" />
          <Folder size={15} className="text-blue-500" />
          {node.name}
        </div>
        {node.children.map((child) => (
          <FileTreeNode key={child.path} node={child} selectedPath={selectedPath} onSelect={onSelect} depth={depth + 1} />
        ))}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(node.path)}
      className={`flex h-8 w-full items-center gap-2 rounded-lg px-2 text-left text-sm transition ${
        selectedPath === node.path ? 'bg-blue-50 font-semibold text-blue-700' : 'text-slate-600 hover:bg-slate-50'
      }`}
      style={{ paddingLeft: 8 + depth * 14 }}
    >
      <File size={15} className="text-slate-400" />
      <span className="truncate">{node.name}</span>
    </button>
  );
}

function MockPreview({ app, prompt, isGenerating }: { app: GeneratedApp; prompt: string; isGenerating: boolean }) {
  const isDashboard = /dashboard|admin|analytics|crm/i.test(`${prompt} ${app.appName}`);
  const isStore = /shop|store|commerce|payment|product/i.test(`${prompt} ${app.appName}`);

  if (isGenerating) {
    return (
      <div className="min-h-64 rounded-lg bg-gradient-to-br from-blue-50 via-cyan-50 to-white p-6">
        <div className="mb-5 h-4 w-2/3 animate-pulse rounded bg-slate-200" />
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="h-28 animate-pulse rounded-lg bg-white" />
          <div className="h-28 animate-pulse rounded-lg bg-white" />
          <div className="h-28 animate-pulse rounded-lg bg-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-64 rounded-lg bg-gradient-to-br from-blue-50 via-cyan-50 to-white p-6">
      <div className="max-w-xl">
        <Globe2 className="mb-3 text-blue-600" />
        <h3 className="text-2xl font-bold tracking-tight text-slate-950">{app.appName}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{app.description}</p>
      </div>

      {isDashboard ? (
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {['Revenue', 'Users', 'Tasks'].map((label) => (
            <div key={label} className="rounded-lg bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
              <div className="mt-3 h-6 w-20 rounded bg-slate-900" />
            </div>
          ))}
        </div>
      ) : isStore ? (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="h-28 rounded-lg bg-white p-4 shadow-sm">
            <div className="h-12 rounded bg-blue-100" />
            <div className="mt-3 h-3 w-3/4 rounded bg-slate-200" />
          </div>
          <div className="h-28 rounded-lg bg-white p-4 shadow-sm">
            <div className="h-12 rounded bg-cyan-100" />
            <div className="mt-3 h-3 w-3/4 rounded bg-slate-200" />
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-lg bg-white p-5 shadow-sm">
          <div className="h-4 w-4/5 rounded bg-slate-900" />
          <div className="mt-3 h-3 w-full rounded bg-slate-200" />
          <div className="mt-2 h-3 w-2/3 rounded bg-slate-200" />
          <div className="mt-5 h-10 w-32 rounded-lg bg-blue-600" />
        </div>
      )}
    </div>
  );
}

function ShimmerFiles() {
  return (
    <div className="mb-4 space-y-2">
      <div className="h-9 animate-pulse rounded-lg bg-slate-100" />
      <div className="h-9 animate-pulse rounded-lg bg-slate-100" />
      <div className="h-9 animate-pulse rounded-lg bg-slate-100" />
    </div>
  );
}

function buildFileTree(files: GeneratedFile[]): TreeNode[] {
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

function normalizeGeneratedApp(app: GeneratedApp): GeneratedApp {
  if (!app || !Array.isArray(app.files) || app.files.length === 0) {
    throw new Error('AI returned no files. Try a more specific prompt.');
  }

  return {
    appName: app.appName || 'Generated Codely App',
    description: app.description || 'A generated app structure from your prompt.',
    files: app.files
      .filter((file) => file.path && typeof file.content === 'string')
      .slice(0, 12),
  };
}

function getLanguage(path: string) {
  if (path.endsWith('.tsx')) return 'TSX';
  if (path.endsWith('.ts')) return 'TypeScript';
  if (path.endsWith('.css')) return 'CSS';
  if (path.endsWith('.md')) return 'Markdown';
  if (path.endsWith('.json')) return 'JSON';
  return 'Code';
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
