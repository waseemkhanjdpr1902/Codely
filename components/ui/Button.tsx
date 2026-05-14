'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark';
  className?: string;
  actionMessage?: string;
  type?: 'button' | 'submit';
};

const variants = {
  primary: 'bg-[#2563eb] text-white shadow-sm shadow-blue-200 hover:bg-[#1d4ed8]',
  secondary: 'border border-slate-200 bg-white text-slate-900 hover:bg-slate-50',
  ghost: 'text-slate-700 hover:bg-slate-100',
  dark: 'bg-slate-950 text-white hover:bg-slate-800',
};

export default function Button({
  children,
  href,
  variant = 'primary',
  className = '',
  actionMessage,
  type = 'button',
}: ButtonProps) {
  const classes = `inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={() => {
        if (actionMessage) {
          window.alert(actionMessage);
        }
      }}
    >
      {children}
    </button>
  );
}
