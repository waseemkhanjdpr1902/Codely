'use client';

import { ReactNode } from 'react';
import { LockKeyhole, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useAuth } from './AuthProvider';

export default function AuthGate({ children }: { children: ReactNode }) {
  const { user, loading, loginWithDemo, firebaseConfigured, message } = useAuth();

  if (loading) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
          <Loader2 size={16} className="animate-spin text-blue-600" />
          Loading your workspace...
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto grid min-h-[70vh] max-w-xl place-items-center">
        <Card className="p-8 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-lg bg-blue-50 text-blue-700">
            <LockKeyhole size={22} />
          </div>
          <h1 className="mt-5 text-2xl font-bold text-slate-950">Sign in to continue</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Your Codely workspace saves projects, generated code, usage, and plan details in your browser first.
          </p>
          {!firebaseConfigured && (
            <p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm font-semibold text-amber-800">
              Firebase Auth is not configured yet. You can use local launch mode for testing.
            </p>
          )}
          {message && <p className="mt-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">{message}</p>}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Button href="/login">Login</Button>
            <Button href="/signup" variant="secondary">
              Create account
            </Button>
          </div>
          <Button onClick={loginWithDemo} variant="ghost" className="mt-3 w-full">
            Continue in local demo mode
          </Button>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
