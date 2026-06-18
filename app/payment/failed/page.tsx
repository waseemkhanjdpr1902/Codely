import { AlertTriangle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function PaymentFailedPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <Header />
      <section className="mx-auto grid max-w-xl place-items-center px-4 py-16">
        <Card className="p-8 text-center">
          <AlertTriangle className="mx-auto text-amber-600" size={44} />
          <h1 className="mt-5 text-3xl font-bold">Payment was not completed</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            No plan change was made. You can try again, choose another plan, or continue using the Free plan.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Button href="/pricing">Try Again</Button>
            <Button href="/dashboard" variant="secondary">
              Dashboard
            </Button>
          </div>
        </Card>
      </section>
    </main>
  );
}
