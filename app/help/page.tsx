import { HelpCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const guides = [
  {
    title: 'Start building',
    text: 'Open Builder, choose a category, fill the simple fields, and click Generate App, Generate Code, Fix Error, or Improve UI.',
  },
  {
    title: 'Save and manage projects',
    text: 'After generation, click Save Project. Saved projects appear on Dashboard and Projects using local storage first.',
  },
  {
    title: 'AI setup',
    text: 'Add GEMINI_API_KEY, OPENAI_API_KEY, or GROQ_API_KEY in Vercel. Codely tries Gemini first, then OpenAI, then Groq.',
  },
  {
    title: 'Auth setup',
    text: 'Add Firebase public environment variables to enable production signup, login, Google login, logout, and session persistence.',
  },
  {
    title: 'Payments',
    text: 'Add Razorpay public key, key id, and secret. Orders and verification run on server API routes.',
  },
  {
    title: 'Deploy to Vercel',
    text: 'Use Next.js preset, npm install, npm run build, and leave output directory blank. Add environment variables before launch.',
  },
];

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <Header />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-blue-600">Help</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">Codely launch guide</h1>
          <p className="mt-4 text-slate-600">
            Use this guide to test Codely as a non-coder and prepare the production Vercel deployment.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <Card key={guide.title} className="p-5">
              <HelpCircle className="text-blue-600" size={22} />
              <h2 className="mt-4 font-semibold text-slate-950">{guide.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{guide.text}</p>
            </Card>
          ))}
        </div>

        <Card className="mt-8 p-6">
          <h2 className="text-xl font-bold text-slate-950">Required environment variables</h2>
          <pre className="mt-4 overflow-auto rounded-lg bg-slate-950 p-4 text-sm leading-6 text-slate-100">
{`GEMINI_API_KEY=
OPENAI_API_KEY=
GROQ_API_KEY=

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=`}
          </pre>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href="/builder">Open Builder</Button>
            <Button href="/settings" variant="secondary">
              Open Settings
            </Button>
          </div>
        </Card>
      </section>
    </main>
  );
}
