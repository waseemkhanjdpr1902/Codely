import AppShell from '@/components/layout/AppShell';
import BuilderWorkspace from '@/components/builder/BuilderWorkspace';

export default function BuilderPage() {
  return (
    <AppShell>
      <div className="mb-8">
        <p className="text-sm font-semibold text-blue-600">Builder</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">Build simple apps and tools with AI</h1>
        <p className="mt-2 text-slate-600">Choose a tool, describe what you need in plain English, then copy, download, save, or export the result.</p>
      </div>

      <BuilderWorkspace />
    </AppShell>
  );
}
