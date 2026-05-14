import { CreditCard, KeyRound, UserRound } from 'lucide-react';
import AppShell from '@/components/layout/AppShell';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const settings = [
  { title: 'Profile', icon: UserRound, text: 'Name, email, and workspace identity placeholders.' },
  { title: 'API keys', icon: KeyRound, text: 'Bring-your-own-key settings will be added later.' },
  { title: 'Billing', icon: CreditCard, text: 'Razorpay billing settings will be connected next phase.' },
];

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="mb-8">
        <p className="text-sm font-semibold text-blue-600">Settings</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">Workspace settings</h1>
        <p className="mt-2 text-slate-600">Profile, API, and billing settings are UI placeholders in this phase.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {settings.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} className="p-6">
              <Icon className="text-blue-600" />
              <h2 className="mt-4 font-semibold text-slate-950">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              <Button variant="secondary" actionMessage="Coming in next phase" className="mt-5 w-full">
                Manage
              </Button>
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}
