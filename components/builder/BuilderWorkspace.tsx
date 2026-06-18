'use client';

import {
  AlertTriangle,
  Bot,
  CheckCircle2,
  Clipboard,
  Cloud,
  Code2,
  Database,
  Download,
  FileCode2,
  Folder,
  Loader2,
  Play,
  Rocket,
  Save,
  Settings2,
  Sparkles,
  TerminalSquare,
} from 'lucide-react';
import { type ComponentType, type ReactNode, useEffect, useMemo, useState } from 'react';
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

type BuilderMode =
  | 'Website'
  | 'Mobile App'
  | 'SaaS Tool'
  | 'Calculator'
  | 'Form Builder'
  | 'Dashboard'
  | 'AI Tool'
  | 'Browser Extension'
  | 'API Backend'
  | 'Games'
  | 'Animation'
  | 'Custom Project';

type OutputTab = 'Overview' | 'Preview' | 'Files' | 'Code' | 'Dependencies' | 'Run' | 'Deploy' | 'API Setup';

type GenerationResult = {
  title: string;
  plan: string;
  pages: string[];
  features: string[];
  code: string;
  readme: string;
  files: GeneratedFile[];
  provider?: string;
};

const categories: Array<{ title: BuilderMode; description: string; examples: string[] }> = [
  { title: 'Website', description: 'Landing pages, business sites, and portfolio websites.', examples: ['Business Website', 'Portfolio Website', 'Landing Page'] },
  { title: 'Mobile App', description: 'React Native, Expo, and APK-ready app plans.', examples: ['Quran App', 'Habit Tracker', 'Task Manager'] },
  { title: 'SaaS Tool', description: 'Resume builders, dashboards, CRM, and admin panels.', examples: ['CRM', 'School ERP', 'WhatsApp CRM'] },
  { title: 'Calculator', description: 'EMI, BMI, GST, Zakat, and financial calculators.', examples: ['Loan EMI Calculator', 'GST Calculator', 'Zakat Calculator'] },
  { title: 'Form Builder', description: 'Contact, registration, booking, and survey forms.', examples: ['Contact Form', 'Registration Form', 'Survey Form'] },
  { title: 'Dashboard', description: 'Analytics, sales, and admin dashboards.', examples: ['Sales Dashboard', 'Admin Dashboard', 'Expense Tracker'] },
  { title: 'AI Tool', description: 'Chatbots, AI assistants, and generators.', examples: ['AI Chatbot', 'SEO Generator', 'Email Assistant'] },
  { title: 'Browser Extension', description: 'Small browser helpers and page tools.', examples: ['Bookmark Helper', 'Reading Tool', 'Form Filler'] },
  { title: 'API Backend', description: 'Backend APIs with database-ready routes.', examples: ['Auth API', 'Inventory API', 'Order API'] },
  { title: 'Games', description: 'Simple learning games and quizzes.', examples: ['Quiz Game', 'Memory Game', 'Typing Game'] },
  { title: 'Animation', description: 'Animated pages and interactive demos.', examples: ['Animated Landing Page', 'Product Demo', 'Story Page'] },
  { title: 'Custom Project', description: 'Any idea you want to turn into an app.', examples: ['Custom App', 'Business Tool', 'Internal Tool'] },
];

const templates = [
  'CRM',
  'Task Manager',
  'Invoice Generator',
  'Resume Builder',
  'Expense Tracker',
  'Habit Tracker',
  'Quran App',
  'Portfolio Website',
  'Landing Page',
  'Blog',
  'Todo App',
  'Inventory Management',
  'School ERP',
  'Restaurant Management',
  'WhatsApp CRM',
];

const techStackOptions = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind',
  'shadcn/ui',
  'Firebase',
  'Supabase',
  'Node.js',
  'Express',
  'Prisma',
  'MongoDB',
  'PostgreSQL',
  'Redis',
  'Stripe',
  'Razorpay',
  'Clerk',
  'Auth.js',
  'Capacitor',
  'React Native',
  'Expo',
];

const outputTabs: OutputTab[] = ['Overview', 'Preview', 'Files', 'Code', 'Dependencies', 'Run', 'Deploy', 'API Setup'];

const aiTools = [
  'Code Generator',
  'App Builder',
  'Error Fixer',
  'UI Enhancer',
  'Prompt to App',
  'Database Designer',
  'API Generator',
  'Component Generator',
  'Schema Generator',
  'Auth Generator',
  'Payment Integration',
  'Email Integration',
  'SEO Optimizer',
  'Debug Assistant',
  'Refactor Code',
  'Documentation Generator',
];

const deployOptions = ['Vercel', 'Netlify', 'Firebase', 'Render', 'Railway', 'Docker', 'APK (Capacitor)', 'PWA'];

const starterFiles: GeneratedFile[] = [
  {
    path: 'app/page.tsx',
    content: `export default function Page() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">Your Codely project will appear here</h1>
    </main>
  );
}
`,
  },
  { path: 'components/AppShell.tsx', content: 'export default function AppShell() {\n  return <div>Generated component</div>;\n}\n' },
  { path: 'lib/utils.ts', content: 'export function cn(...classes: string[]) {\n  return classes.filter(Boolean).join(" ");\n}\n' },
  { path: 'hooks/use-project.ts', content: 'export function useProject() {\n  return { ready: true };\n}\n' },
  { path: 'public/.gitkeep', content: '' },
  { path: 'styles/globals.css', content: '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n' },
  { path: 'package.json', content: '{\n  "scripts": { "dev": "next dev", "build": "next build", "start": "next start" }\n}\n' },
  { path: 'README.md', content: '# Codely project\n\nGenerated project notes will appear here.\n' },
  { path: '.env.example', content: 'NEXT_PUBLIC_APP_URL=\n' },
];

export default function BuilderWorkspace() {
  const [category, setCategory] = useState<BuilderMode>('Website');
  const [idea, setIdea] = useState('Create a CRM for small businesses');
  const [selectedTemplate, setSelectedTemplate] = useState('CRM');
  const [selectedTech, setSelectedTech] = useState<string[]>(['Next.js', 'React', 'TypeScript', 'Tailwind']);
  const [activeTab, setActiveTab] = useState<OutputTab>('Overview');
  const [activeTool, setActiveTool] = useState('App Builder');
  const [selectedFile, setSelectedFile] = useState('app/page.tsx');
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [developerDetails, setDeveloperDetails] = useState('');
  const [toast, setToast] = useState('');
  const [usage, setUsage] = useState(getUsage);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const prompt = params.get('prompt');
    const template = params.get('template');
    const categoryParam = params.get('category');

    const matchedCategory = categories.find((item) => slugify(item.title) === categoryParam);
    window.setTimeout(() => {
      if (prompt) setIdea(prompt);
      if (template) setSelectedTemplate(template);
      if (matchedCategory) setCategory(matchedCategory.title);
    }, 0);
  }, []);

  const files = result?.files.length ? result.files : starterFiles;
  const currentFile = files.find((file) => file.path === selectedFile) || files[0];
  const remaining = getRemainingGenerations(usage);
  const fileTree = useMemo(() => buildFileTree(files), [files]);
  const packageJson = files.find((file) => file.path === 'package.json')?.content || starterFiles.find((file) => file.path === 'package.json')?.content || '';
  const envExample = files.find((file) => file.path === '.env.example')?.content || 'NEXT_PUBLIC_APP_URL=\n';

  async function generateProject() {
    if (!canGenerate(usage)) {
      setError('You have 0 generations left this month. Upgrade to continue building.');
      return;
    }

    if (!idea.trim()) {
      setError('Describe what you want to build first.');
      return;
    }

    setLoading(true);
    setError('');
    setDeveloperDetails('');
    setActiveTab('Overview');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: activeTool === 'Error Fixer' ? 'error' : activeTool === 'UI Enhancer' ? 'ui' : activeTool === 'Code Generator' ? 'code' : 'app',
          prompt: idea,
          errorMessage: activeTool === 'Error Fixer' ? idea : undefined,
          code: activeTool === 'Error Fixer' || activeTool === 'UI Enhancer' ? idea : undefined,
          category,
          template: selectedTemplate,
          techStack: selectedTech,
          targetUsers: 'Non-coders, small teams, business owners and students',
          features: `Template: ${selectedTemplate}. Build mode: ${category}. Tech stack: ${selectedTech.join(', ')}.`,
          designStyle: 'Simple, clean, guided, mobile-friendly',
        }),
      });
      const data = await response.json().catch(() => ({ success: false, message: 'Generation endpoint did not return JSON.' }));

      if (!response.ok || !data.success) {
        setError('AI generation is not configured correctly. Please check API keys in Vercel.');
        setDeveloperDetails(formatDeveloperDetails(data, response.status));
        showToast('Generation failed');
        return;
      }

      const output = data.output || {};
      const nextFiles = normalizeFiles(output.files || data.files || data.app?.files || []);
      setResult({
        title: selectedTemplate || category,
        plan: output.plan || data.summary || 'Generated a complete Next.js TypeScript project.',
        pages: normalizeList(output.pages, ['Home page', 'Dashboard page', 'Settings page']),
        features: normalizeList(output.features, ['Guided form', 'Saved data area', 'Deploy-ready structure']),
        code: output.code || nextFiles[0]?.content || '',
        readme: output.readme || nextFiles.find((file) => file.path === 'README.md')?.content || '',
        files: nextFiles,
        provider: data.provider,
      });
      setSelectedFile(nextFiles[0]?.path || 'app/page.tsx');
      setUsage(recordUsage('aiGenerations'));
      showToast('Project generated');
    } catch (generationError: any) {
      setError('AI generation is not configured correctly. Please check API keys in Vercel.');
      setDeveloperDetails(generationError?.message || 'Unknown browser-side generation error.');
      showToast('Generation failed');
    } finally {
      setLoading(false);
    }
  }

  function toggleTech(option: string) {
    setSelectedTech((current) => (current.includes(option) ? current.filter((item) => item !== option) : [...current, option]));
  }

  function chooseTemplate(template: string) {
    setSelectedTemplate(template);
    setIdea(`Create a ${template}`);
    setError('');
    setDeveloperDetails('');
  }

  function runAiTool(tool: string) {
    setActiveTool(tool);
    if (tool === 'Error Fixer') setIdea('Paste your error message and code here. Explain the bug and generate fixed Next.js TypeScript files.');
    if (tool === 'UI Enhancer') setIdea('Improve this UI and return a cleaner Next.js TypeScript component with Tailwind.');
    if (tool === 'Database Designer') setIdea(`Design the database for a ${selectedTemplate} using ${selectedTech.includes('Supabase') ? 'Supabase' : 'PostgreSQL'} and generate project files.`);
    if (tool === 'API Generator') setIdea(`Generate API routes for a ${selectedTemplate} as a Next.js TypeScript project.`);
    showToast(`${tool} selected`);
  }

  function saveCurrentProject() {
    if (!result) {
      setError('Generate a project before saving.');
      return;
    }

    saveProject({
      name: `${selectedTemplate} - ${category}`,
      category,
      prompt: idea,
      output: result.plan,
      files: result.files,
    });
    showToast('Project saved');
  }

  async function copyCurrentCode() {
    await navigator.clipboard.writeText(currentFile?.content || result?.code || '');
    showToast('Copied code');
  }

  function downloadCurrentCode() {
    downloadTextFile(currentFile?.path.split('/').pop() || 'codely-file.txt', currentFile?.content || '');
    showToast('Downloaded file');
  }

  function exportProject() {
    const exportData = {
      category,
      template: selectedTemplate,
      idea,
      techStack: selectedTech,
      result,
      files,
    };
    downloadTextFile(`${slugify(selectedTemplate || category)}-codely-project.json`, JSON.stringify(exportData, null, 2), 'application/json');
    setUsage(recordUsage('exports'));
    showToast('Project exported');
  }

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(''), 2400);
  }

  return (
    <>
      {toast && <div className="fixed right-4 top-4 z-50 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-lg">{toast}</div>}

      <div className="grid gap-4 xl:grid-cols-[360px_1fr]">
        <aside className="space-y-4">
          <Card className="p-5">
            <p className="text-sm font-semibold text-blue-600">Step 1</p>
            <h2 className="mt-1 text-xl font-bold text-slate-950">Choose category</h2>
            <div className="mt-4 grid gap-2">
              {categories.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setCategory(item.title)}
                  className={`rounded-xl border p-3 text-left transition ${
                    category === item.title ? 'border-blue-300 bg-blue-50 text-blue-800' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-semibold">{item.title}</span>
                  <span className="mt-1 block text-xs leading-5">{item.description}</span>
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <p className="text-sm font-semibold text-blue-600">Templates</p>
            <h2 className="mt-1 text-xl font-bold text-slate-950">Popular starts</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {templates.map((template) => (
                <button
                  key={template}
                  type="button"
                  onClick={() => chooseTemplate(template)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                    selectedTemplate === template ? 'border-blue-300 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {template}
                </button>
              ))}
            </div>
          </Card>
        </aside>

        <section className="space-y-4">
          <Card className="p-5">
            <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
              <div>
                <p className="text-sm font-semibold text-blue-600">Step 2</p>
                <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">Describe idea</h1>
                <textarea
                  value={idea}
                  onChange={(event) => setIdea(event.target.value)}
                  className="mt-4 h-44 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none transition focus:border-blue-300 focus:bg-white"
                  placeholder="Create a CRM for small businesses..."
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-600">Step 3</p>
                <h2 className="mt-1 text-xl font-bold text-slate-950">Select tech stack</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {techStackOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleTech(option)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                        selectedTech.includes(option) ? 'border-blue-300 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-600">
                  Codely will generate a complete Next.js TypeScript project. Extra tools are added as setup instructions and files when useful.
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-5 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
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
                  </div>
                </div>
              </div>
            )}

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm font-semibold text-slate-600">
                {Number.isFinite(remaining) ? `${remaining} generations left this month` : 'Unlimited fair-use active'}
              </div>
              <div className="flex flex-wrap gap-2">
                <Button onClick={generateProject} disabled={loading}>
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                  {loading ? 'Generating' : 'Generate Project'}
                </Button>
                <Button onClick={generateProject} variant="secondary" disabled={loading}>
                  Retry
                </Button>
                <Button onClick={saveCurrentProject} variant="secondary">
                  <Save size={16} />
                  Save
                </Button>
                <Button onClick={exportProject} variant="secondary">
                  <Download size={16} />
                  Export
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-600">AI tools</p>
                <h2 className="text-xl font-bold text-slate-950">Agent actions</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Build', 'Fix', 'Improve', 'Deploy', 'Continue'].map((action) => (
                  <Button key={action} onClick={() => showToast(`${action} mode selected`)} variant="secondary" className="h-9">
                    {action}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {aiTools.map((tool) => (
                <button
                  key={tool}
                  type="button"
                  onClick={() => runAiTool(tool)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                    activeTool === tool ? 'border-blue-300 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {tool}
                </button>
              ))}
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="border-b border-slate-200 p-4">
              <div className="flex flex-wrap gap-2">
                {outputTabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                      activeTab === tab ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-5">{renderTab()}</div>
          </Card>
        </section>
      </div>
    </>
  );

  function renderTab() {
    if (activeTab === 'Overview') {
      return (
        <div className="grid gap-4 lg:grid-cols-3">
          <InfoCard icon={Bot} title={result?.title || selectedTemplate} text={result?.plan || 'Generate a project to see the app overview, pages, features and file structure.'} />
          <InfoCard icon={Settings2} title="Selected stack" text={selectedTech.join(', ')} />
          <InfoCard icon={CheckCircle2} title="Features" text={(result?.features || ['Generated files', 'Run steps', 'Deploy guide']).join(', ')} />
        </div>
      );
    }

    if (activeTab === 'Preview') {
      return (
        <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 to-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <div className="h-3 w-28 rounded-full bg-slate-900" />
              <div className="flex gap-2">
                <div className="h-3 w-10 rounded-full bg-slate-200" />
                <div className="h-3 w-10 rounded-full bg-slate-200" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-950">{selectedTemplate}</h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">{result?.plan || idea}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {(result?.features || ['Input form', 'Dashboard', 'Saved records']).slice(0, 3).map((feature) => (
                <div key={feature} className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-slate-950">{feature}</p>
                  <div className="mt-3 h-2 rounded-full bg-blue-100" />
                </div>
              ))}
            </div>
          </div>
          <InfoCard icon={Cloud} title="AI screenshots" text="When image generation is connected, screenshots can appear here. For now, Codely shows a live-style project preview and page tree." />
        </div>
      );
    }

    if (activeTab === 'Files') {
      return (
        <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
          <div className="rounded-xl border border-slate-200 p-3">{fileTree.map((node) => renderFileNode(node))}</div>
          <pre className="max-h-[520px] overflow-auto rounded-xl bg-slate-950 p-4 text-xs leading-6 text-slate-100">
            <code>{currentFile?.content || 'Select a file.'}</code>
          </pre>
        </div>
      );
    }

    if (activeTab === 'Code') {
      return (
        <div>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <p className="font-semibold text-slate-950">{currentFile?.path}</p>
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
          <pre className="max-h-[560px] overflow-auto rounded-xl bg-slate-950 p-4 text-xs leading-6 text-slate-100">
            <code>{currentFile?.content || result?.code || 'Generated code will appear here.'}</code>
          </pre>
        </div>
      );
    }

    if (activeTab === 'Dependencies') {
      return (
        <div className="grid gap-4 lg:grid-cols-2">
          <InfoCard icon={FileCode2} title="package.json" text="Codely generates a package.json with scripts and dependencies for the project." />
          <pre className="max-h-96 overflow-auto rounded-xl bg-slate-950 p-4 text-xs leading-6 text-slate-100">{packageJson}</pre>
        </div>
      );
    }

    if (activeTab === 'Run') {
      return (
        <div className="grid gap-4 lg:grid-cols-3">
          {['npm install', 'npm run dev', 'Open http://localhost:3000'].map((step, index) => (
            <InfoCard key={step} icon={index === 0 ? Download : index === 1 ? Play : TerminalSquare} title={`Step ${index + 1}`} text={step} />
          ))}
        </div>
      );
    }

    if (activeTab === 'Deploy') {
      return (
        <div>
          <p className="mb-4 text-sm leading-6 text-slate-600">Choose a deployment target. Each button shows what to do next.</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {deployOptions.map((option) => (
              <Button key={option} onClick={() => showToast(`${option}: export project, add env keys, then deploy`)} variant="secondary" className="h-12 justify-start">
                <Rocket size={16} />
                {option}
              </Button>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="grid gap-4 lg:grid-cols-2">
        <InfoCard icon={Database} title="Environment file" text="Add keys in Vercel or your hosting provider. Never paste secret keys into browser code." />
        <pre className="max-h-96 overflow-auto rounded-xl bg-slate-950 p-4 text-xs leading-6 text-slate-100">{envExample}</pre>
      </div>
    );
  }

  function renderFileNode(node: TreeNode, depth = 0): ReactNode {
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
        onClick={() => setSelectedFile(node.path)}
        className={`flex h-8 w-full items-center gap-2 rounded-lg px-2 text-left text-sm transition ${
          selectedFile === node.path ? 'bg-blue-50 font-semibold text-blue-700' : 'text-slate-600 hover:bg-slate-50'
        }`}
        style={{ paddingLeft: 8 + depth * 14 }}
      >
        <Code2 size={14} className="text-slate-400" />
        <span className="truncate">{node.name}</span>
      </button>
    );
  }
}

function InfoCard({ icon: Icon, title, text }: { icon: ComponentType<{ className?: string; size?: number }>; title: string; text: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <Icon className="text-blue-600" size={20} />
      <h3 className="mt-3 font-semibold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

type TreeNode = {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children: TreeNode[];
};

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

function normalizeFiles(files: GeneratedFile[]) {
  const usable = files
    .filter((file) => file?.path && typeof file.content === 'string')
    .map((file) => ({ path: file.path, content: file.content }))
    .slice(0, 24);
  return usable.length ? usable : starterFiles;
}

function normalizeList(value: unknown, fallback: string[]) {
  if (Array.isArray(value)) return value.map((item) => String(item)).filter(Boolean);
  if (typeof value === 'string' && value.trim()) return [value.trim()];
  return fallback;
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

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
