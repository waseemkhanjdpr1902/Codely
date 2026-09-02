'use client';

import { FolderKanban, HelpCircle, Home, LogOut, Settings, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';

const links = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/builder', label: 'Builder', icon: Sparkles },
  { href: '/projects', label: 'Projects', icon: FolderKanban },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="flex w-full flex-col border-b border-slate-200 bg-white px-3 py-3 lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r lg:py-4">
      <Link href="/" className="mb-3 flex items-center gap-2 px-2 lg:mb-6">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-950 text-sm font-bold text-white">
          C
        </span>
        <span className="text-lg font-bold text-slate-950">Codely</span>
      </Link>

      <nav className="grid grid-cols-3 gap-1 lg:block lg:space-y-1">
        {links.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-semibold transition ${
                active
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
              }`}
            >
              <Icon size={18} />
              <span className="truncate">{item.label === 'Builder' ? 'Build App' : item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto hidden space-y-3 lg:block">
        <div className="grid grid-cols-2 gap-1">
          <Link href="/settings" className="flex items-center gap-2 rounded-lg px-2 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"><Settings size={15} />Settings</Link>
          <Link href="/help" className="flex items-center gap-2 rounded-lg px-2 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"><HelpCircle size={15} />Help</Link>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Signed in as</p>
          <p className="mt-2 truncate text-sm font-semibold text-slate-950">{user?.name || 'Guest'}</p>
          <p className="truncate text-xs text-slate-500">{user?.email || 'Use local demo or login'}</p>
          {user && (
            <button
              type="button"
              onClick={logout}
              className="mt-3 inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <LogOut size={15} />
              Logout
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
