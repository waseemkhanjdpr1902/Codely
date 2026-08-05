import Link from 'next/link';
import Header from '@/components/layout/Header';
import AuthForm from '@/components/auth/AuthForm';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <Header />
      <section className="mx-auto grid max-w-md px-4 py-16">
        <AuthForm mode="login" />
          <p className="mt-6 text-center text-sm text-slate-600">
            New to Codely? <Link href="/signup" className="font-semibold text-blue-600">Create account</Link>
          </p>
      </section>
    </main>
  );
}
