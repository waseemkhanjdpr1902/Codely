'use client';

export type GeneratedFile = {
  path: string;
  content: string;
};

export type CodelyProject = {
  id: string;
  name: string;
  category: string;
  prompt: string;
  output: string;
  files: GeneratedFile[];
  createdAt: string;
  updatedAt: string;
};

export type UsageState = {
  aiGenerations: number;
  errorFixes: number;
  uiImprovements: number;
  exports: number;
  resetAt: string;
  plan: PlanName;
};

export type PlanName = 'Free' | 'Starter' | 'Pro' | 'Lifetime';

const PROJECTS_KEY = 'codely.projects.v1';
const USAGE_KEY = 'codely.usage.v1';
const PLAN_KEY = 'codely.plan.v1';

const planLimits: Record<PlanName, number> = {
  Free: Number.POSITIVE_INFINITY,
  Starter: Number.POSITIVE_INFINITY,
  Pro: Number.POSITIVE_INFINITY,
  Lifetime: Number.POSITIVE_INFINITY,
};

export function getPlanLimit(plan: PlanName) {
  return planLimits[plan];
}

export function getProjects(): CodelyProject[] {
  if (!canUseStorage()) return [];
  return readJson<CodelyProject[]>(PROJECTS_KEY, []);
}

export function saveProject(project: Omit<CodelyProject, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }) {
  const now = new Date().toISOString();
  const projects = getProjects();
  const id = project.id || createId('project');
  const existing = projects.find((item) => item.id === id);
  const nextProject: CodelyProject = {
    ...project,
    id,
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };
  const nextProjects = existing
    ? projects.map((item) => (item.id === id ? nextProject : item))
    : [nextProject, ...projects];

  writeJson(PROJECTS_KEY, nextProjects);
  return nextProject;
}

export function deleteProject(projectId: string) {
  writeJson(
    PROJECTS_KEY,
    getProjects().filter((project) => project.id !== projectId)
  );
}

export function renameProject(projectId: string, name: string) {
  const cleanName = name.trim();
  if (!cleanName) return;
  writeJson(
    PROJECTS_KEY,
    getProjects().map((project) =>
      project.id === projectId ? { ...project, name: cleanName, updatedAt: new Date().toISOString() } : project
    )
  );
}

export function getUsage(): UsageState {
  const storedPlan = getStoredPlan();
  const usage = readJson<UsageState | null>(USAGE_KEY, null);

  if (!usage || shouldResetUsage(usage.resetAt)) {
    const next = createDefaultUsage(storedPlan);
    writeJson(USAGE_KEY, next);
    return next;
  }

  if (usage.plan !== storedPlan) {
    const next = { ...usage, plan: storedPlan };
    writeJson(USAGE_KEY, next);
    return next;
  }

  return usage;
}

export function getRemainingGenerations(usage = getUsage()) {
  const limit = getPlanLimit(usage.plan);
  if (!Number.isFinite(limit)) return Number.POSITIVE_INFINITY;
  return Math.max(0, limit - usage.aiGenerations);
}

export function canGenerate() {
  return true;
}

export function recordUsage(kind: 'aiGenerations' | 'errorFixes' | 'uiImprovements' | 'exports') {
  const usage = getUsage();
  const next = {
    ...usage,
    [kind]: usage[kind] + 1,
  };
  writeJson(USAGE_KEY, next);
  return next;
}

export function setPlan(plan: PlanName) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(PLAN_KEY, plan);
  const usage = getUsage();
  writeJson(USAGE_KEY, { ...usage, plan });
}

export function getStoredPlan(): PlanName {
  if (!canUseStorage()) return 'Free';
  const plan = window.localStorage.getItem(PLAN_KEY) as PlanName | null;
  return plan && ['Free', 'Starter', 'Pro', 'Lifetime'].includes(plan) ? plan : 'Free';
}

export function downloadTextFile(fileName: string, content: string, type = 'text/plain') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

export function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function createDefaultUsage(plan: PlanName): UsageState {
  const reset = new Date();
  reset.setMonth(reset.getMonth() + 1);
  reset.setDate(1);
  reset.setHours(0, 0, 0, 0);

  return {
    aiGenerations: 0,
    errorFixes: 0,
    uiImprovements: 0,
    exports: 0,
    resetAt: reset.toISOString(),
    plan,
  };
}

function shouldResetUsage(resetAt: string) {
  return new Date(resetAt).getTime() <= Date.now();
}

function readJson<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function canUseStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage);
}
