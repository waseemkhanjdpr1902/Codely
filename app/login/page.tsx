import Link from 'next/link';
import Header from '@/components/layout/Header';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <Header />
      <section className="mx-auto grid max-w-md px-4 py-16">
        <Card className="p-6">
          <h1 className="text-2xl font-bold">Log in to Codely</h1>
          <p className="mt-2 text-sm text-slate-600">Authentication will be connected in a later phase.</p>
          <div className="mt-6 space-y-4">
            <label className="block text-sm font-semibold">
              Email
              <input className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 outline-none focus:border-blue-300" placeholder="you@example.com" />
            </label>
            <label className="block text-sm font-semibold">
              Password
              <input className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 outline-none focus:border-blue-300" placeholder="Password" type="password" />
            </label>
            <Button actionMessage="Coming in next phase" className="w-full">Login</Button>
          </div>
          <p className="mt-6 text-center text-sm text-slate-600">
            New to Codely? <Link href="/signup" className="font-semibold text-blue-600">Create account</Link>
          </p>
        </Card>
      </section>
    </main>
  );
}
