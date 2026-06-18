import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function PaymentSuccessPage({ searchParams }: { searchParams: { plan?: string } }) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <Header />
      <section className="mx-auto grid max-w-xl place-items-center px-4 py-16">
        <Card className="p-8 text-center">
          <CheckCircle2 className="mx-auto text-emerald-600" size={44} />
          <h1 className="mt-5 text-3xl font-bold">Payment successful</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Your {searchParams.plan || 'selected'} plan is active in this browser. Connect a database later to sync plan
            updates across devices.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Button href="/dashboard">Go to Dashboard</Button>
            <Button href="/builder" variant="secondary">
              Start Building
            </Button>
          </div>
          <p className="mt-5 text-xs text-slate-500">
            Need help? <Link href="/help" className="font-semibold text-blue-600">Open the guide</Link>.
          </p>
        </Card>
      </section>
    </main>
  );
}
