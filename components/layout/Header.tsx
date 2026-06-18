'use client';

import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import Button from '../ui/Button';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-950 text-sm font-bold text-white">
            C
          </span>
          <span className="text-lg font-bold text-slate-950">Codely</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <a href="/#features" className="hover:text-slate-950">
            Tools
          </a>
          <Link href="/pricing" className="hover:text-slate-950">
            Pricing
          </Link>
          <Link href="/help" className="hover:text-slate-950">
            Help
          </Link>
          {user ? (
            <Link href="/dashboard" className="hover:text-slate-950">
              Dashboard
            </Link>
          ) : (
            <Link href="/login" className="hover:text-slate-950">
              Login
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Button href="/dashboard" variant="ghost" className="hidden sm:inline-flex">
                {user.name}
              </Button>
              <Button onClick={logout} variant="secondary" className="hidden sm:inline-flex">
                Logout
              </Button>
            </>
          ) : (
            <Button href="/login" variant="ghost" className="hidden sm:inline-flex">
              Login
            </Button>
          )}
          <Button href="/builder">Start Building</Button>
        </div>
      </div>
    </header>
  );
}
