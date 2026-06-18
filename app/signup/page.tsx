import Link from 'next/link';
import Header from '@/components/layout/Header';
import AuthForm from '@/components/auth/AuthForm';

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <Header />
      <section className="mx-auto grid max-w-md px-4 py-16">
        <AuthForm mode="signup" />
          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account? <Link href="/login" className="font-semibold text-blue-600">Login</Link>
          </p>
      </section>
    </main>
  );
}
