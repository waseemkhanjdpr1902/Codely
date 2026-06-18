'use client';

import { useState } from 'react';
import { Download, Edit3, FolderPlus, Trash2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { CodelyProject, deleteProject, downloadTextFile, formatDate, getProjects, renameProject } from '@/lib/local-workspace';

export default function ProjectsClient() {
  const [projects, setProjects] = useState<CodelyProject[]>(() => getProjects());
  const [activeProject, setActiveProject] = useState<CodelyProject | null>(null);
  const [message, setMessage] = useState('');

  function refreshProjects() {
    setProjects(getProjects());
  }

  function handleRename(project: CodelyProject) {
    const name = window.prompt('Rename project', project.name);
    if (!name?.trim()) return;
    renameProject(project.id, name);
    refreshProjects();
    setMessage('Project renamed.');
  }

  function handleDelete(project: CodelyProject) {
    if (!window.confirm(`Delete "${project.name}"? This only removes the local browser copy.`)) return;
    deleteProject(project.id);
    if (activeProject?.id === project.id) setActiveProject(null);
    refreshProjects();
    setMessage('Project deleted.');
  }

  function handleExport(project: CodelyProject) {
    downloadTextFile(`${slugify(project.name)}.json`, JSON.stringify(project, null, 2), 'application/json');
    setMessage('Project export downloaded.');
  }

  return (
    <>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-blue-600">Projects</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">Your Codely projects</h1>
          <p className="mt-2 text-slate-600">Saved projects live in local storage first and are ready for Firebase/Supabase later.</p>
        </div>
        <Button href="/builder">
          <FolderPlus size={16} />
          Create Project
        </Button>
      </div>

      {message && <div className="mb-4 rounded-lg bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">{message}</div>}

      {projects.length === 0 ? (
        <Card className="p-10 text-center">
          <p className="font-semibold text-slate-950">No projects yet</p>
          <p className="mt-2 text-sm text-slate-600">Generate an app or tool, then click Save Project in the builder.</p>
          <Button href="/builder" className="mt-5">
            Create Project
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <Card key={project.id} className="p-5">
                <div className="mb-5 flex items-start justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-blue-50 text-blue-700">
                    <FolderPlus size={20} />
                  </div>
                  <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">{project.category}</span>
                </div>
                <h2 className="font-semibold text-slate-950">{project.name}</h2>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{project.prompt}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Updated {formatDate(project.updatedAt)}
                </p>
                <div className="mt-5 grid grid-cols-2 gap-2">
                  <Button onClick={() => setActiveProject(project)} className="h-9">
                    Open
                  </Button>
                  <Button onClick={() => handleExport(project)} variant="secondary" className="h-9">
                    <Download size={14} />
                    Export
                  </Button>
                  <Button onClick={() => handleRename(project)} variant="secondary" className="h-9">
                    <Edit3 size={14} />
                    Rename
                  </Button>
                  <Button onClick={() => handleDelete(project)} variant="ghost" className="h-9 text-red-600">
                    <Trash2 size={14} />
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-5">
            <h2 className="font-semibold text-slate-950">Project preview</h2>
            {activeProject ? (
              <div className="mt-4">
                <p className="text-xl font-bold text-slate-950">{activeProject.name}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{activeProject.output}</p>
                <div className="mt-5 space-y-2">
                  {activeProject.files.map((file) => (
                    <details key={file.path} className="rounded-lg border border-slate-200 p-3">
                      <summary className="cursor-pointer text-sm font-semibold text-slate-700">{file.path}</summary>
                      <pre className="mt-3 max-h-64 overflow-auto rounded-lg bg-slate-950 p-3 text-xs text-slate-100">
                        <code>{file.content}</code>
                      </pre>
                    </details>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-4 rounded-lg border border-dashed border-slate-200 p-8 text-center">
                <p className="font-semibold text-slate-950">Open a project</p>
                <p className="mt-2 text-sm text-slate-600">Project details and saved code will appear here.</p>
              </div>
            )}
          </Card>
        </div>
      )}
    </>
  );
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'codely-project';
}
