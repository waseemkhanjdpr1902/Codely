import { ArrowRight, CheckCircle2, Download, MessageSquareText, Rocket, Sparkles } from 'lucide-react';
import Header from '@/components/layout/Header';
import Button from '@/components/ui/Button';

const examples = ['Build a website for my consulting business', 'Create a simple expense tracker', 'Create a customer enquiry form'];

const steps = [
  { icon: MessageSquareText, title: 'Describe your idea', text: 'Tell Codely what you want in your own words.' },
  { icon: Sparkles, title: 'Codely builds it', text: 'Get a complete working project with the important pages and features.' },
  { icon: Rocket, title: 'Review and launch', text: 'Save your project, download it, or follow the simple launch guide.' },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Header />
      <section className="border-b border-slate-100 bg-gradient-to-b from-blue-50/70 to-white">
        <div className="mx-auto max-w-5xl px-4 pb-20 pt-16 text-center sm:px-6 sm:pt-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-700"><Sparkles size={16} />AI app builder for non-coders</div>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">Turn your idea into a working app</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">Describe what you need. Codely creates the project and guides you through the next steps—no coding knowledge required.</p>
          <form action="/builder" method="get" className="mx-auto mt-9 max-w-3xl rounded-2xl border border-slate-200 bg-white p-3 text-left shadow-xl shadow-blue-100/50">
            <label htmlFor="homepage-prompt" className="sr-only">Describe what you want to build</label>
            <textarea id="homepage-prompt" name="prompt" rows={3} required className="w-full resize-none rounded-xl border-0 bg-slate-50 px-4 py-4 text-base outline-none ring-blue-200 placeholder:text-slate-400 focus:bg-white focus:ring-2" placeholder="Example: Build a booking website for my home cleaning business..." />
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="px-1 text-xs text-slate-500">You can change everything after the first build.</p>
              <button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white transition hover:bg-blue-700">Build my app <ArrowRight size={17} /></button>
            </div>
          </form>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {examples.map((example) => <Button key={example} href={`/builder?prompt=${encodeURIComponent(example)}`} variant="secondary" className="h-auto rounded-full px-4 py-2 text-xs">{example}</Button>)}
          </div>
          <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-600">
            {['Plain-English building', 'Complete project files', 'Download anytime'].map((item) => <span key={item} className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-600" />{item}</span>)}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="text-center"><p className="text-sm font-semibold uppercase tracking-wider text-blue-600">How it works</p><h2 className="mt-3 text-3xl font-bold tracking-tight">Three simple steps</h2></div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => { const Icon = step.icon; return <div key={step.title} className="rounded-2xl border border-slate-200 bg-white p-6"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-700"><Icon size={21} /></span><span className="text-sm font-bold text-slate-300">0{index + 1}</span></div><h3 className="mt-5 text-lg font-bold">{step.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p></div>; })}
        </div>
      </section>
      <section className="border-t border-slate-100 bg-slate-50 px-4 py-16 text-center sm:px-6"><Download className="mx-auto text-blue-600" size={28} /><h2 className="mt-4 text-3xl font-bold">Ready to build your first app?</h2><p className="mx-auto mt-3 max-w-xl text-slate-600">Start free. Upgrade only when you need more building credits.</p><Button href="/builder" className="mt-6 h-12 px-6">Start building</Button></section>
    </main>
  );
}
