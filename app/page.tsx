import {
  ArrowRight,
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
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Header />

      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[520px] bg-gradient-to-br from-blue-50 via-cyan-50 to-white" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
              <Sparkles size={16} />
              AI app builder for non-coders
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
              What do you want to build?
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Turn ideas into websites, apps and tools without coding.
            </p>

            <Card className="mx-auto mt-9 max-w-4xl p-3 text-left">
              <form action="/builder" method="get" className="flex flex-col gap-3 lg:flex-row">
                <label className="sr-only" htmlFor="homepage-prompt">
                  Describe what you want to build
                </label>
                <textarea
                  id="homepage-prompt"
                  name="prompt"
                  className="min-h-32 flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 p-5 text-base outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white"
                  placeholder="Create a CRM for small businesses"
                />
                <input type="hidden" name="category" value="custom-project" />
                <Button type="submit" className="h-14 px-8 text-base lg:h-auto">
                  Generate
                  <ArrowRight size={18} />
                </Button>
              </form>
            </Card>

            <div className="mx-auto mt-5 flex max-w-4xl flex-wrap justify-center gap-2">
              {examples.map((example) => (
                <Button
                  key={example}
                  href={`/builder?prompt=${encodeURIComponent(example)}`}
                  variant="secondary"
                  className="h-9 rounded-full px-3 text-xs"
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
