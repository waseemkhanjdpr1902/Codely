'use client';

import { useState } from 'react';
import { BarChart3, Clock, Code2, FolderPlus, Sparkles, Tags } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useAuth } from '@/components/auth/AuthProvider';
import { CodelyProject, GENERATION_CREDIT_COST, UsageState, formatDate, getPlanLimit, getProjects, getRemainingGenerations, getUsage } from '@/lib/local-workspace';

export default function DashboardClient() {
  const { user } = useAuth();
  const [projects] = useState<CodelyProject[]>(() => getProjects());
  const [usage] = useState<UsageState>(() => getUsage());

  const limit = getPlanLimit(usage.plan);
  const remaining = getRemainingGenerations(usage);
  const usagePercent = Number.isFinite(limit) ? Math.min(100, (usage.aiGenerations / limit) * 100) : 12;

  return (
    <>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-blue-600">Dashboard</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">Welcome, {user?.name || 'builder'}</h1>
          <p className="mt-2 text-slate-600">Create tools, review saved work, and track your monthly usage.</p>
        </div>
        <Button href="/builder">
          <FolderPlus size={16} />
          Create New Project
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <Sparkles className="text-blue-600" />
            <div>
              <h2 className="font-semibold text-slate-950">Start with a simple idea</h2>
              <p className="text-sm text-slate-600">Codely turns plain English into a plan, pages, components, and code.</p>
            </div>
          </div>
          <div className="mt-6 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 p-5">
            <p className="text-sm font-semibold text-slate-950">Suggested prompt</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Build a booking website for a local service business with a form, pricing section, testimonials, and contact details.
            </p>
            <Button href="/builder?tool=app" className="mt-4">
              Start Building
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <BarChart3 className="text-blue-600" />
            <h2 className="font-semibold text-slate-950">Usage this month</h2>
          </div>
          <div className="mt-5 space-y-4">
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-600">Credits used</span>
                <span className="font-semibold text-slate-950">
                  {usage.aiGenerations} / {limit}
                </span>
              </div>
              <div className="h-2 rounded-lg bg-slate-100">
                <div className="h-2 rounded-lg bg-blue-600" style={{ width: `${usagePercent}%` }} />
              </div>
              <p className="mt-2 text-xs text-slate-500">
                About {remaining} standard builds remaining at {GENERATION_CREDIT_COST} credits per build.
              </p>
            </div>
            <Button href="/pricing" variant="secondary" className="w-full">
              Upgrade
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <Clock className="text-blue-600" />
            <h2 className="font-semibold text-slate-950">My Projects</h2>
          </div>
          {projects.length ? (
            <div className="space-y-3">
              {projects.slice(0, 4).map((project) => (
                <div key={project.id} className="flex flex-col justify-between gap-3 rounded-lg border border-slate-200 p-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="font-semibold text-slate-950">{project.name}</p>
                    <p className="text-sm text-slate-500">{project.category} - updated {formatDate(project.updatedAt)}</p>
                  </div>
                  <Button href="/projects" variant="secondary" className="h-9">
                    Open
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-slate-200 p-8 text-center">
              <p className="font-semibold text-slate-950">No projects yet</p>
              <p className="mt-2 text-sm text-slate-600">Generate and save a project from the builder.</p>
              <Button href="/builder" className="mt-5">
                Create New Project
              </Button>
            </div>
          )}
        </Card>

        <Card className="p-6">
          <div className="grid gap-3">
            <Metric icon={Code2} label="Saved code files" value={String(projects.reduce((total, project) => total + project.files.length, 0))} />
            <Metric icon={Clock} label="Recent generations" value={String(projects.length)} />
            <Metric icon={Tags} label="Current plan" value={usage.plan} />
          </div>
          <Button href="/pricing" variant="primary" className="mt-5 w-full">
            View Plans
          </Button>
        </Card>
      </div>
    </>
  );
}

function Metric({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
      <div className="flex items-center gap-3">
        <Icon className="text-blue-600" size={18} />
        <span className="text-sm text-slate-600">{label}</span>
      </div>
      <span className="font-semibold text-slate-950">{value}</span>
    </div>
  );
}
