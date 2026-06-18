import AppShell from '@/components/layout/AppShell';
import BuilderWorkspace from '@/components/builder/BuilderWorkspace';

export default function BuilderPage() {
  return (
    <AppShell>
      <div className="mb-8">
        <p className="text-sm font-semibold text-blue-600">AI App Builder</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">Build a complete project step by step</h1>
        <p className="mt-2 text-slate-600">Choose a category, describe your idea, select a tech stack, then generate project files, run steps, and deploy guidance.</p>
      </div>

      <BuilderWorkspace />
    </AppShell>
  );
}
