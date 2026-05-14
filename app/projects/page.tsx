import { FolderPlus, MoreHorizontal } from 'lucide-react';
import AppShell from '@/components/layout/AppShell';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const projects = [
  { name: 'SaaS Starter', status: 'Draft', updated: 'Placeholder' },
  { name: 'Portfolio Builder', status: 'Draft', updated: 'Placeholder' },
  { name: 'Admin Dashboard', status: 'Draft', updated: 'Placeholder' },
];

export default function ProjectsPage() {
  return (
    <AppShell>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-blue-600">Projects</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">Your Codely projects</h1>
          <p className="mt-2 text-slate-600">Project storage will be connected in a later phase.</p>
        </div>
        <Button href="/builder">
          <FolderPlus size={16} />
          Create Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card className="p-10 text-center">
          <p className="font-semibold text-slate-950">No projects yet</p>
          <p className="mt-2 text-sm text-slate-600">Create your first app from the builder.</p>
          <Button href="/builder" className="mt-5">Create Project</Button>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.name} className="p-5">
              <div className="mb-8 flex items-start justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-blue-50 text-blue-700">
                  <FolderPlus size={20} />
                </div>
                <Button variant="ghost" actionMessage="Coming in next phase" className="h-9 w-9 p-0 text-slate-400">
                  <MoreHorizontal size={18} />
                </Button>
              </div>
              <h2 className="font-semibold text-slate-950">{project.name}</h2>
              <p className="mt-1 text-sm text-slate-500">{project.status}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{project.updated}</p>
            </Card>
          ))}
        </div>
      )}
    </AppShell>
  );
}
