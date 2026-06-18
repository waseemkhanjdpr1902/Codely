'use client';

import { useEffect, useState } from 'react';
import { CreditCard, KeyRound, Rocket, ShieldCheck, UserRound } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useAuth } from '@/components/auth/AuthProvider';
import { UsageState, getUsage } from '@/lib/local-workspace';

const settings = [
  {
    id: 'profile',
    title: 'Profile',
    icon: UserRound,
    text: 'View your local profile and auth provider.',
  },
  {
    id: 'ai',
    title: 'AI keys',
    icon: KeyRound,
    text: 'Server-side Gemini, OpenAI, and Groq setup.',
  },
  {
    id: 'auth',
    title: 'Authentication',
    icon: ShieldCheck,
    text: 'Firebase signup, login, Google login, and session persistence.',
  },
  {
    id: 'billing',
    title: 'Billing',
    icon: CreditCard,
    text: 'Razorpay subscription setup and plan storage.',
  },
  {
    id: 'deployment',
    title: 'Deployment',
    icon: Rocket,
    text: 'Vercel build, env, and launch checklist.',
  },
];

export default function SettingsClient() {
  const { user, firebaseConfigured } = useAuth();
  const [active, setActive] = useState('profile');
  const [usage, setUsage] = useState<UsageState | null>(null);

  useEffect(() => {
    setUsage(getUsage());
  }, []);

  return (
    <>
      <div className="mb-8">
        <p className="text-sm font-semibold text-blue-600">Settings</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">Workspace settings</h1>
        <p className="mt-2 text-slate-600">Manage local profile details and see what to configure in Vercel for production.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        {settings.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.id} className={`p-5 ${active === item.id ? 'border-blue-300' : ''}`}>
              <Icon className="text-blue-600" />
              <h2 className="mt-4 font-semibold text-slate-950">{item.title}</h2>
              <p className="mt-2 min-h-16 text-sm leading-6 text-slate-600">{item.text}</p>
              <Button onClick={() => setActive(item.id)} variant={active === item.id ? 'primary' : 'secondary'} className="mt-5 w-full">
                Manage
              </Button>
            </Card>
          );
        })}
      </div>

      <Card className="mt-6 p-6">
        {active === 'profile' && (
          <Panel title="Profile">
            <Info label="Name" value={user?.name || 'Guest'} />
            <Info label="Email" value={user?.email || 'Not signed in'} />
            <Info label="Auth provider" value={user?.provider === 'firebase' ? 'Firebase Auth' : 'Local launch mode'} />
            <Info label="Current plan" value={usage?.plan || 'Free'} />
          </Panel>
        )}

        {active === 'ai' && (
          <Panel title="AI API setup">
            <p className="text-sm leading-6 text-slate-600">
              Add at least one AI key in Vercel. Codely uses server-side API routes only and tries providers in this order:
              Gemini, OpenAI, then Groq.
            </p>
            <CodeBlock lines={['GEMINI_API_KEY=', 'OPENAI_API_KEY=', 'GROQ_API_KEY=']} />
            <p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm font-semibold text-amber-800">
              If no key is configured, users see: AI service is not configured yet. Please add API key in Vercel.
            </p>
          </Panel>
        )}

        {active === 'auth' && (
          <Panel title="Authentication setup">
            <Info label="Firebase configured in this build" value={firebaseConfigured ? 'Yes' : 'No'} />
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Firebase Auth supports email/password signup, login, Google login, logout, and session persistence when these
              public variables are set.
            </p>
            <CodeBlock
              lines={[
                'NEXT_PUBLIC_FIREBASE_API_KEY=',
                'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=',
                'NEXT_PUBLIC_FIREBASE_PROJECT_ID=',
                'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=',
                'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=',
                'NEXT_PUBLIC_FIREBASE_APP_ID=',
              ]}
            />
          </Panel>
        )}

        {active === 'billing' && (
          <Panel title="Billing setup">
            <p className="text-sm leading-6 text-slate-600">
              Razorpay checkout is wired through server-side order creation and payment verification. The secret key is never
              exposed to the frontend.
            </p>
            <CodeBlock lines={['NEXT_PUBLIC_RAZORPAY_KEY_ID=', 'RAZORPAY_KEY_ID=', 'RAZORPAY_KEY_SECRET=']} />
            <Button href="/pricing" className="mt-5">
              Open Pricing
            </Button>
          </Panel>
        )}

        {active === 'deployment' && (
          <Panel title="Vercel deployment">
            <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
              <li>Framework preset: Next.js</li>
              <li>Install command: npm install</li>
              <li>Build command: npm run build</li>
              <li>Output directory: leave blank</li>
              <li>Add AI, Firebase, and Razorpay environment variables before launch.</li>
            </ul>
            <Button href="/help" variant="secondary" className="mt-5">
              Open Help Guide
            </Button>
          </Panel>
        )}
      </Card>
    </>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-950">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col justify-between gap-1 border-b border-slate-100 py-3 sm:flex-row">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-semibold text-slate-950">{value}</span>
    </div>
  );
}

function CodeBlock({ lines }: { lines: string[] }) {
  return (
    <pre className="mt-4 overflow-auto rounded-lg bg-slate-950 p-4 text-sm leading-6 text-slate-100">
      {lines.join('\n')}
    </pre>
  );
}
