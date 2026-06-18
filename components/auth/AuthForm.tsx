'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Mail, UserPlus } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useAuth } from './AuthProvider';

export default function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const router = useRouter();
  const { loginWithEmail, signupWithEmail, loginWithGoogle, loginWithDemo, firebaseConfigured, message } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const isSignup = mode === 'signup';

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Enter your email and password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setBusy(true);
    try {
      if (isSignup) {
        await signupWithEmail(name, email.trim(), password);
      } else {
        await loginWithEmail(email.trim(), password);
      }
      router.push('/dashboard');
    } catch (authError: any) {
      setError(formatFirebaseError(authError?.message || 'Authentication failed.'));
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setBusy(true);
    try {
      await loginWithGoogle();
      if (firebaseConfigured) router.push('/dashboard');
    } catch (authError: any) {
      setError(formatFirebaseError(authError?.message || 'Google login failed.'));
    } finally {
      setBusy(false);
    }
  };

  const handleDemo = () => {
    loginWithDemo();
    router.push('/dashboard');
  };

  return (
    <Card className="p-6">
      <h1 className="text-2xl font-bold">{isSignup ? 'Create your Codely account' : 'Log in to Codely'}</h1>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        {firebaseConfigured
          ? 'Firebase Auth is ready. Your session will stay active on this device.'
          : 'Firebase Auth is not configured yet. Email login uses local launch mode for testing.'}
      </p>

      <form className="mt-6 space-y-4" onSubmit={submit}>
        {isSignup && (
          <label className="block text-sm font-semibold">
            Name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 outline-none focus:border-blue-300"
              placeholder="Your name"
              autoComplete="name"
            />
          </label>
        )}
        <label className="block text-sm font-semibold">
          Email
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 outline-none focus:border-blue-300"
            placeholder="you@example.com"
            type="email"
            autoComplete="email"
          />
        </label>
        <label className="block text-sm font-semibold">
          Password
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 outline-none focus:border-blue-300"
            placeholder={isSignup ? 'Create password' : 'Password'}
            type="password"
            autoComplete={isSignup ? 'new-password' : 'current-password'}
          />
        </label>

        {(error || message) && (
          <p className={`rounded-lg p-3 text-sm ${error ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-800'}`}>
            {error || message}
          </p>
        )}

        <Button type="submit" disabled={busy} className="w-full">
          {busy ? <Loader2 size={16} className="animate-spin" /> : isSignup ? <UserPlus size={16} /> : <Mail size={16} />}
          {isSignup ? 'Create Account' : 'Login'}
        </Button>
      </form>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Button onClick={handleGoogle} disabled={busy} variant="secondary" className="w-full">
          Google login
        </Button>
        <Button onClick={handleDemo} disabled={busy} variant="ghost" className="w-full">
          Local demo
        </Button>
      </div>
    </Card>
  );
}

function formatFirebaseError(message: string) {
  if (message.includes('auth/invalid-credential')) return 'Email or password is incorrect.';
  if (message.includes('auth/email-already-in-use')) return 'This email already has an account.';
  if (message.includes('auth/popup-closed-by-user')) return 'Google login was closed before it finished.';
  if (message.includes('auth/configuration-not-found')) return 'Firebase Auth is not enabled for this project yet.';
  return message.replace(/^Firebase:\s*/i, '');
}
