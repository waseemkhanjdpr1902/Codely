import { ArrowRight, Briefcase, CheckCircle2, GraduationCap, HelpCircle, type LucideIcon, Sparkles, Users, Wand2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const popularTools = [
  ['Landing Page Builder', 'Create a page for a product, service, class, or event.', 'landing-page-builder'],
  ['Calculator Builder', 'Make price, EMI, marks, fee, and budget calculators.', 'calculator-builder'],
  ['Form Builder', 'Build contact, feedback, lead, and request forms.', 'form-builder'],
  ['Error Fixer', 'Paste an error and get a simple fix with explanation.', 'error-fixer'],
  ['UI Enhancer', 'Improve existing code with cleaner design suggestions.', 'ui'],
  ['Prompt to App', 'Turn a plain English idea into an MVP plan and code.', 'prompt-app'],
];

const audiences: Array<[string, LucideIcon]> = [
  ['Small business owners', Briefcase],
  ['Students', GraduationCap],
  ['Freelancers', Users],
  ['Teachers', GraduationCap],
  ['Non-technical founders', Sparkles],
  ['Office professionals', CheckCircle2],
];

const useCases = [
  'Build a business website',
  'Create a calculator',
  'Generate a resume tool',
  'Fix website errors',
  'Improve UI',
  'Create forms',
  'Build simple dashboards',
];

const faqs = [
  ['Do I need to know coding?', 'No. Describe what you want in simple English and Codely creates a plan and starter code.'],
  ['Can I copy or download code?', 'Yes. Generated code has copy and download buttons, plus project export.'],
  ['What if AI keys are missing?', 'Codely shows a clear Vercel setup message instead of failing silently.'],
  ['Can I deploy to Vercel?', 'Yes. Codely includes a guided Vercel deployment flow and deployment notes.'],
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Header />

      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-br from-blue-50 via-cyan-50 to-white" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-blue-100 bg-white px-3 py-1 text-sm font-semibold text-blue-700 shadow-sm">
              <Wand2 size={16} />
              Build simple apps and tools with AI, without coding.
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
              Build apps, tools, and websites with AI - no coding required.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Codely helps non-coders create landing pages, calculators, forms, dashboards, error fixes, and starter apps
              from plain English prompts.
            </p>

            <Card className="mx-auto mt-8 max-w-3xl p-3">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="min-h-24 flex-1 rounded-lg border border-slate-200 bg-slate-50 p-4 text-left text-sm leading-6 text-slate-500">
                  Example: Build a booking website for my salon with services, prices, testimonials, and a contact form.
                </div>
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
        <SectionIntro label="Popular tools" title="Choose what you want to make." text="Each tool includes a simple description, example prompt, start button, and generated output area in the builder." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popularTools.map(([title, text, tool]) => (
            <Card key={title} className="p-5">
              <Sparkles className="mb-4 text-blue-600" size={22} />
              <h3 className="font-semibold text-slate-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              <Button href={`/builder?tool=${tool}`} variant="secondary" className="mt-5">
                Start
              </Button>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro label="Who it is for" title="Built for people who need small tools quickly." text="Codely keeps the language simple and focuses on practical outputs." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map(([label, Icon]) => (
              <Card key={label as string} className="flex items-center gap-3 p-5">
                <Icon className="text-blue-600" size={22} />
                <span className="font-semibold text-slate-950">{label as string}</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <SectionIntro label="How it works" title="Three simple steps." text="No setup is needed to try the interface. Add API keys in Vercel to enable live AI generation." />
            <div className="space-y-4">
              {['Pick a tool or category', 'Describe your idea in plain English', 'Copy, download, save, export, or deploy with the guide'].map((step, index) => (
                <Card key={step} className="flex gap-4 p-5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-blue-600 text-sm font-bold text-white">{index + 1}</span>
                  <p className="font-semibold text-slate-950">{step}</p>
                </Card>
              ))}
            </div>
          </div>
          <div>
            <SectionIntro label="Example use cases" title="Useful things you can build." text="Start small, then improve the output step by step." />
            <div className="grid gap-3 sm:grid-cols-2">
              {useCases.map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-lg border border-slate-200 p-3 text-sm font-semibold text-slate-700">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">Pricing preview</p>
            <h2 className="mt-3 text-3xl font-bold">Start free, upgrade when you grow.</h2>
            <p className="mt-3 text-slate-300">Free includes 5 AI generations/month. Starter, Pro, and Lifetime unlock more usage and exports.</p>
          </div>
          <Card className="bg-white p-6 text-slate-950">
            <p className="font-semibold">Free - ₹0</p>
            <p className="mt-2 text-sm text-slate-600">5 AI generations/month, basic tools, copy code.</p>
            <Button href="/pricing" className="mt-5 w-full">
              View Pricing
            </Button>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionIntro label="FAQ" title="Common questions." text="Short answers for launch visitors." />
        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map(([question, answer]) => (
            <Card key={question} className="p-5">
              <div className="flex items-center gap-2 font-semibold text-slate-950">
                <HelpCircle size={18} className="text-blue-600" />
                {question}
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{answer}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <Card className="mx-auto max-w-5xl bg-gradient-to-br from-blue-600 to-cyan-500 p-8 text-center text-white">
          <h2 className="text-3xl font-bold">Ready to build your first tool?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-blue-50">Open the builder, choose a category, and let Codely guide you from idea to starter code.</p>
          <Button href="/builder" variant="dark" className="mt-6">
            Start Building
          </Button>
        </Card>
      </section>
    </main>
  );
}

function SectionIntro({ label, title, text }: { label: string; title: string; text: string }) {
  return (
    <div className="mb-8 max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">{label}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}
