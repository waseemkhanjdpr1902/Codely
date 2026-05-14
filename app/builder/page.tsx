import AppShell from '@/components/layout/AppShell';
import BuilderWorkspace from '@/components/builder/BuilderWorkspace';

export default function BuilderPage() {
  return (
    <AppShell>
      <div className="mb-8">
        <p className="text-sm font-semibold text-blue-600">Builder</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">Describe your app idea</h1>
        <p className="mt-2 text-slate-600">Generate an MVP file tree, code preview, logs, and mock preview from one prompt.</p>
      </div>

      <BuilderWorkspace />
    </AppShell>
  );
}
