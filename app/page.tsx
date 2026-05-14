import { ArrowRight, Boxes, Code2, CreditCard, Github, Rocket, Search, Sparkles } from 'lucide-react';
import Header from '@/components/layout/Header';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const features = [
  { title: 'AI App Builder', icon: Sparkles, text: 'Turn a plain-language idea into an app plan and starter UI.' },
  { title: 'Code Generator', icon: Code2, text: 'Generate clean component and page structures for modern web apps.' },
  { title: 'GitHub Export', icon: Github, text: 'Prepare projects for repository export in the next phase.' },
  { title: 'One-click Deployment', icon: Rocket, text: 'Designed around a simple path from prompt to live app.' },
  { title: 'Payment Ready SaaS', icon: CreditCard, text: 'Plan pricing, billing, and SaaS screens before wiring payments.' },
  { title: 'SEO Friendly Tools', icon: Search, text: 'Create pages with clear content sections and metadata in mind.' },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Header />

      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-br from-blue-50 via-cyan-50 to-white" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-blue-100 bg-white px-3 py-1 text-sm font-semibold text-blue-700 shadow-sm">
              <Boxes size={16} />
              Codely Phase 2 UI
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
              Build apps from ideas in minutes
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Describe your app. Codely creates the structure, UI, and code.
            </p>

            <Card className="mx-auto mt-8 max-w-3xl p-3">
              <div className="flex flex-col gap-3 sm:flex-row">
                <textarea
                  className="min-h-28 flex-1 resize-none rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white"
                  placeholder="Describe the app you want to build..."
                />
                <Button href="/builder" className="h-12 sm:h-auto">
                  Start Building
                  <ArrowRight size={16} />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Features</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">Everything an app idea needs to feel real.</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="p-5">
                <Icon className="mb-4 text-blue-600" size={22} />
                <h3 className="font-semibold text-slate-950">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{feature.text}</p>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}
