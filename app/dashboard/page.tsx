import { BarChart3, Clock, FolderPlus, Sparkles } from 'lucide-react';
import AppShell from '@/components/layout/AppShell';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-blue-600">Dashboard</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">Welcome back to Codely</h1>
          <p className="mt-2 text-slate-600">Start a project, review recent work, and track your workspace usage.</p>
        </div>
        <Button href="/builder">
          <FolderPlus size={16} />
          New Project
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <Sparkles className="text-blue-600" />
            <div>
              <h2 className="font-semibold text-slate-950">Create your next app</h2>
              <p className="text-sm text-slate-600">Use the builder to shape your idea into screens and code.</p>
            </div>
          </div>
          <div className="mt-6 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 p-5">
            <p className="text-sm font-semibold text-slate-950">Suggested prompt</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Build a SaaS landing page with pricing, auth screens, dashboard, and settings.
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <BarChart3 className="text-blue-600" />
            <h2 className="font-semibold text-slate-950">Usage</h2>
          </div>
          <div className="mt-5 space-y-4">
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-600">AI generations</span>
                <span className="font-semibold text-slate-950">0 / 20</span>
              </div>
              <div className="h-2 rounded-lg bg-slate-100">
                <div className="h-2 w-1 rounded-lg bg-blue-600" />
              </div>
            </div>
            <Button href="/pricing" variant="secondary" className="w-full">
              Upgrade
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <Clock className="text-blue-600" />
            <h2 className="font-semibold text-slate-950">Recent projects</h2>
          </div>
          <div className="rounded-lg border border-dashed border-slate-200 p-8 text-center">
            <p className="font-semibold text-slate-950">No projects yet</p>
            <p className="mt-2 text-sm text-slate-600">Your generated apps will appear here.</p>
          </div>
        </Card>

        <Card className="bg-slate-950 p-6 text-white">
          <h2 className="font-semibold">Pro workspace</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Unlock higher limits, export options, and SaaS launch tools in upcoming phases.
          </p>
          <Button href="/pricing" variant="primary" className="mt-5 w-full">
            View Plans
          </Button>
        </Card>
      </div>
    </AppShell>
  );
}
