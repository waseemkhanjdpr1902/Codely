'use client';

import { ReactNode } from 'react';
import AuthGate from '@/components/auth/AuthGate';
import AppSidebar from './AppSidebar';

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[256px_1fr]">
        <AppSidebar />
        <section className="min-w-0 p-4 sm:p-6 lg:p-8">
          <AuthGate>{children}</AuthGate>
        </section>
      </div>
    </main>
  );
}
