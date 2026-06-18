import {
  ArrowRight,
  ArrowLeft,
  Bot,
  Briefcase,
  Calculator,
  ChartNoAxesCombined,
  Code2,
  FileText,
  Gamepad2,
  Globe2,
  Layers3,
  MonitorSmartphone,
  Paintbrush,
  Server,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const examples = [
  'Create a CRM for small businesses',
  'Create a loan EMI calculator',
  'Create a resume builder',
  'Create a Quran app',
  'Create a task manager',
];

const buildModes = [
  {
    title: 'Website',
    slug: 'website',
    icon: Globe2,
    items: ['Landing pages', 'Business sites', 'Portfolio websites'],
  },
  {
    title: 'Mobile App',
    slug: 'mobile-app',
    icon: Smartphone,
    items: ['React Native', 'Expo apps', 'APK-ready projects'],
  },
  {
    title: 'SaaS Tool',
    slug: 'saas-tool',
    icon: Briefcase,
    items: ['Resume builders', 'Dashboards', 'CRM', 'Admin panels'],
  },
  {
    title: 'Calculator',
    slug: 'calculator',
    icon: Calculator,
    items: ['EMI', 'BMI', 'GST', 'Zakat', 'Financial calculators'],
  },
  {
    title: 'Form Builder',
    slug: 'form-builder',
    icon: FileText,
    items: ['Contact forms', 'Registration forms', 'Survey forms'],
  },
  {
    title: 'Dashboard',
    slug: 'dashboard',
    icon: ChartNoAxesCombined,
    items: ['Analytics', 'Sales dashboards', 'Admin dashboards'],
  },
  {
    title: 'AI Tool',
    slug: 'ai-tool',
    icon: Bot,
    items: ['Chatbots', 'AI assistants', 'Generators'],
  },
  {
    title: 'Browser Extension',
    slug: 'browser-extension',
    icon: Layers3,
    items: ['Chrome tools', 'Productivity helpers', 'Page actions'],
  },
  {
    title: 'API Backend',
    slug: 'api-backend',
    icon: Server,
    items: ['APIs', 'Auth backend', 'Database-ready services'],
  },
  {
    title: 'Games',
    slug: 'games',
    icon: Gamepad2,
    items: ['Quizzes', 'Simple web games', 'Learning games'],
  },
  {
    title: 'Animation',
    slug: 'animation',
    icon: Paintbrush,
    items: ['Motion pages', 'Interactive demos', 'Animated cards'],
  },
  {
    title: 'Custom Project',
    slug: 'custom-project',
    icon: Code2,
    items: ['Any idea', 'Guided setup', 'Complete project files'],
  },
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

export default function LandingPage() {
  const quickModes = buildModes.slice(0, 6);

  return (
    <main className="min-h-screen bg-[#fffaf5] text-slate-950">
      <Header />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,200,0.42),transparent_34%),linear-gradient(180deg,#fffaf5_0%,#fff7f1_48%,#ffffff_100%)]" />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-orange-100 bg-white/80 px-4 py-2 text-sm font-semibold text-orange-700 shadow-sm">
              <Sparkles size={16} />
              Codely Agent for simple app building
            </div>
            <h1 className="text-5xl font-semibold tracking-[-0.05em] text-[#33343a] sm:text-7xl">
              What will you build?
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Turn ideas into apps in minutes — no coding needed.
            </p>

            <div className="mx-auto mt-8 max-w-3xl rounded-[28px] border border-slate-200/80 bg-white p-3 text-left shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
              <form action="/builder" method="get" className="flex items-center gap-3">
                <label className="sr-only" htmlFor="homepage-prompt">
                  Describe what you want to build
                </label>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-2xl text-slate-500">+</span>
                <textarea
                  id="homepage-prompt"
                  name="prompt"
                  rows={2}
                  className="min-h-16 flex-1 resize-none border-0 bg-transparent px-1 py-3 text-base outline-none placeholder:text-slate-500"
                  placeholder="Create a CRM for small businesses..."
                />
                <input type="hidden" name="category" value="custom-project" />
                <button
                  type="submit"
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#ff8f86] text-white shadow-sm transition hover:bg-[#ff776d]"
                  aria-label="Generate project"
                >
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>

            <div className="mx-auto mt-5 grid max-w-xl grid-cols-[32px_1fr_32px] items-center gap-3">
              <Button href="/builder" variant="ghost" className="h-8 w-8 rounded-full p-0 text-slate-400" aria-label="Previous build modes">
                <ArrowLeft size={16} />
              </Button>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                {quickModes.map((mode) => {
                  const Icon = mode.icon;
                  return (
                    <Button
                      key={mode.title}
                      href={`/builder?category=${mode.slug}`}
                      variant="ghost"
                      className="h-auto flex-col gap-2 rounded-2xl px-2 py-2 text-slate-600 hover:bg-white"
                    >
                      <span className="grid h-12 w-12 place-items-center rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <Icon size={18} />
                      </span>
                      <span className="text-xs font-semibold">{mode.title.replace(' Builder', '')}</span>
                    </Button>
                  );
                })}
              </div>
              <Button href="/builder" variant="ghost" className="h-8 w-8 rounded-full p-0 text-slate-400" aria-label="More build modes">
                <ArrowRight size={16} />
              </Button>
            </div>

            <p className="mt-5 text-xs font-semibold text-slate-400">Try an example prompt</p>

            <div className="mx-auto mt-3 flex max-w-4xl flex-wrap justify-center gap-2">
              {examples.map((example) => (
                <Button
                  key={example}
                  href={`/builder?prompt=${encodeURIComponent(example)}`}
                  variant="secondary"
                  className="h-9 rounded-lg border-slate-200 bg-white/90 px-3 text-xs text-slate-600 shadow-sm"
                >
                  {example}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SectionIntro
          label="Build modes"
          title="Choose the kind of project."
          text="Start with a simple category. Codely guides you through idea, tech stack, files, run steps and deploy options."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {buildModes.map((mode) => {
            const Icon = mode.icon;
            return (
              <Card key={mode.title} className="flex flex-col p-5">
                <div className="flex items-start gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-700">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-950">{mode.title}</h3>
                    <ul className="mt-2 space-y-1 text-sm leading-6 text-slate-600">
                      {mode.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <Button href={`/builder?category=${mode.slug}`} variant="secondary" className="mt-5 w-full">
                  Start {mode.title}
                </Button>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            label="Popular templates"
            title="Start from a common idea."
            text="Pick a template, then describe what should be different for your business, class, project or community."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {templates.map((template) => (
              <Button
                key={template}
                href={`/builder?template=${encodeURIComponent(template)}&prompt=${encodeURIComponent(`Create a ${template}`)}`}
                variant="secondary"
                className="h-auto min-h-14 justify-start rounded-xl bg-white px-4 py-3 text-left"
              >
                <MonitorSmartphone size={16} className="text-blue-600" />
                {template}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <Card className="mx-auto max-w-5xl bg-slate-950 p-8 text-center text-white">
          <h2 className="text-3xl font-bold">Build, fix, improve, deploy, continue.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-300">
            Codely is moving toward a simple agent mode that thinks like an AI software engineer while staying easy for non-coders.
          </p>
          <Button href="/builder" className="mt-6">
            Open Builder
          </Button>
        </Card>
      </section>
    </main>
  );
}

function SectionIntro({ label, title, text }: { label: string; title: string; text: string }) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">{label}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}
