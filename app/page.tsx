"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bot,
  ChevronRight,
  Code2,
  Copy,
  FileCode2,
  Folder,
  Github,
  Globe2,
  LayoutDashboard,
  Loader2,
  LogIn,
  LogOut,
  Menu,
  MonitorPlay,
  Play,
  Plus,
  Save,
  Search,
  Sparkles,
  TerminalSquare,
  X,
} from "lucide-react";

type CodelyFile = {
  id: string;
  name: string;
  language: "javascript" | "html" | "css" | "markdown";
  content: string;
};

type UserSession = {
  name: string;
  email: string;
  avatar?: string;
};

const STORAGE_KEY = "codely.workspace.v1";
const SESSION_KEY = "codely.session.v1";

const starterFiles: CodelyFile[] = [
  {
    id: "app",
    name: "app.js",
    language: "javascript",
    content: `const todos = ["Build UI", "Run code", "Ship project"];

function render(items) {
  return items.map((item, index) => {
    return \`\${index + 1}. \${item}\`;
  }).join("\\n");
}

console.log("Welcome to Codely");
console.log(render(todos));`,
  },
  {
    id: "page",
    name: "index.html",
    language: "html",
    content: `<main class="preview">
  <h1>Codely Preview</h1>
  <p>Edit this HTML and open the Preview tab.</p>
  <button>Launch workspace</button>
</main>`,
  },
  {
    id: "styles",
    name: "styles.css",
    language: "css",
    content: `.preview {
  min-height: 100vh;
  display: grid;
  place-items: center;
  gap: 16px;
  background: #0f172a;
  color: white;
  font-family: Inter, system-ui, sans-serif;
}

button {
  border: 0;
  border-radius: 10px;
  padding: 12px 16px;
  background: #22d3ee;
  color: #082f49;
  font-weight: 800;
}`,
  },
];

export default function Home() {
  const [session, setSession] = useState<UserSession | null>(null);
  const [files, setFiles] = useState<CodelyFile[]>(starterFiles);
  const [activeFileId, setActiveFileId] = useState(starterFiles[0].id);
  const [output, setOutput] = useState("Ready. Run app.js or ask AI to improve a file.");
  const [aiPrompt, setAiPrompt] = useState("Add a clean header and a call-to-action.");
  const [loading, setLoading] = useState<"run" | "ai" | "auth" | null>(null);
  const [activePanel, setActivePanel] = useState<"editor" | "preview" | "terminal" | "ai">("editor");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const storedSession = window.localStorage.getItem(SESSION_KEY);
    const storedFiles = window.localStorage.getItem(STORAGE_KEY);

    if (storedSession) setSession(JSON.parse(storedSession));
    if (storedFiles) setFiles(JSON.parse(storedFiles));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
  }, [files]);

  const activeFile = useMemo(
    () => files.find((file) => file.id === activeFileId) || files[0],
    [activeFileId, files]
  );

  const htmlFile = files.find((file) => file.language === "html");
  const cssFile = files.find((file) => file.language === "css");
  const previewHtml = `<style>${cssFile?.content || ""}</style>${htmlFile?.content || ""}`;

  const loginWithDemo = () => {
    const nextSession = { name: "Codely Builder", email: "demo@codely.dev" };
    setSession(nextSession);
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(nextSession));
  };

  const loginWithGoogle = async () => {
    setLoading("auth");
    setAuthError("");

    try {
      const [{ GoogleAuthProvider, signInWithPopup }, { initFirebase }] = await Promise.all([
        import("firebase/auth"),
        import("@/lib/firebase-client"),
      ]);
      const firebase = initFirebase();

      if (!firebase?.auth) {
        throw new Error("Firebase is not configured. Use demo login or add Firebase environment variables.");
      }

      const credential = await signInWithPopup(firebase.auth, new GoogleAuthProvider());
      const nextSession = {
        name: credential.user.displayName || "Codely User",
        email: credential.user.email || "google@codely.dev",
        avatar: credential.user.photoURL || undefined,
      };

      setSession(nextSession);
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(nextSession));
    } catch (error: any) {
      setAuthError(error.message || "Google login failed.");
    } finally {
      setLoading(null);
    }
  };

  const logout = () => {
    setSession(null);
    window.localStorage.removeItem(SESSION_KEY);
  };

  const updateActiveFile = (content: string) => {
    setFiles((current) =>
      current.map((file) => (file.id === activeFile.id ? { ...file, content } : file))
    );
  };

  const createFile = () => {
    const nextNumber = files.length + 1;
    const nextFile: CodelyFile = {
      id: crypto.randomUUID(),
      name: `component-${nextNumber}.js`,
      language: "javascript",
      content: `export function Component${nextNumber}() {\n  return "New Codely component";\n}\n\nconsole.log(Component${nextNumber}());`,
    };
    setFiles((current) => [...current, nextFile]);
    setActiveFileId(nextFile.id);
    setSidebarOpen(false);
  };

  const runCode = async () => {
    setLoading("run");
    setActivePanel("terminal");
    setOutput("Running code...");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "execute",
          language: activeFile.language === "javascript" ? "javascript" : activeFile.language,
          code: activeFile.content,
        }),
      });
      const data = await response.json();
      setOutput(data.output || data.error || "No output");
    } catch (error: any) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setLoading(null);
    }
  };

  const askAi = async () => {
    setLoading("ai");
    setActivePanel("ai");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "ai",
          prompt: aiPrompt,
          fileName: activeFile.name,
          code: activeFile.content,
        }),
      });
      const data = await response.json();

      if (data.code) {
        updateActiveFile(data.code);
      }

      setOutput(data.output || "AI updated the current file.");
    } catch (error: any) {
      setOutput(`AI error: ${error.message}`);
    } finally {
      setLoading(null);
    }
  };

  const copyCurrentFile = async () => {
    await navigator.clipboard.writeText(activeFile.content);
    setOutput(`${activeFile.name} copied to clipboard.`);
    setActivePanel("terminal");
  };

  if (!session) {
    return (
      <main className="min-h-screen bg-[#070b16] text-white">
        <section className="mx-auto grid min-h-screen w-full max-w-7xl items-center gap-10 px-5 py-10 lg:grid-cols-[1fr_440px]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
              <Sparkles size={16} /> Browser IDE for fast app experiments
            </div>
            <div className="space-y-5">
              <h1 className="max-w-3xl text-5xl font-black tracking-tight text-white md:text-7xl">
                Build, run, preview, and refine code in one Codely workspace.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                A Replit-inspired coding tool with a working editor, file explorer, terminal output, responsive preview, and AI-assisted code edits.
              </p>
            </div>
            <div className="grid max-w-3xl gap-3 sm:grid-cols-3">
              {["Run JavaScript", "Preview HTML/CSS", "AI code edits"].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-200">
                  <ChevronRight className="mb-4 text-cyan-300" size={20} />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-cyan-950/40 backdrop-blur">
            <div className="rounded-3xl bg-[#0c1222] p-6">
              <div className="mb-8 flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300 text-slate-950">
                  <Code2 />
                </div>
                <div>
                  <h2 className="text-2xl font-black">Sign in to Codely</h2>
                  <p className="text-sm text-slate-400">Start with Google or a local demo session.</p>
                </div>
              </div>

              {authError && (
                <div className="mb-4 rounded-2xl border border-rose-400/30 bg-rose-500/10 p-3 text-sm text-rose-100">
                  {authError}
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={loginWithGoogle}
                  disabled={loading === "auth"}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-5 py-4 font-bold text-slate-950 hover:bg-cyan-50"
                >
                  {loading === "auth" ? <Loader2 className="animate-spin" /> : <Globe2 />}
                  Continue with Google
                </button>
                <button
                  onClick={loginWithDemo}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 font-bold text-white hover:bg-white/10"
                >
                  <LogIn /> Use demo workspace
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-[#070b16] text-white">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-[#0b1020]/90 px-4 backdrop-blur">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 lg:hidden"
            aria-label="Open file explorer"
          >
            <Menu size={20} />
          </button>
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-300 text-slate-950">
            <Code2 size={22} />
          </div>
          <div>
            <h1 className="font-black leading-none">Codely</h1>
            <p className="text-xs text-slate-400">Workspace online</p>
          </div>
        </div>

        <div className="hidden flex-1 justify-center px-6 md:flex">
          <div className="flex w-full max-w-md items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-400">
            <Search size={16} />
            Search files, commands, and snippets
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={askAi} className="hidden items-center gap-2 rounded-xl bg-cyan-300 px-4 py-2 text-sm font-black text-slate-950 hover:bg-cyan-200 sm:flex">
            <Sparkles size={16} /> AI
          </button>
          <button onClick={logout} className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-slate-300 hover:bg-white/10" aria-label="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside className={`${sidebarOpen ? "fixed inset-0 z-40 flex" : "hidden"} border-r border-white/10 bg-[#090e1b] lg:static lg:flex lg:w-72 lg:shrink-0`}>
          <div className="flex w-72 flex-col bg-[#090e1b] p-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-400">
                <Folder size={18} /> Explorer
              </div>
              <button onClick={() => setSidebarOpen(false)} className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 lg:hidden">
                <X size={18} />
              </button>
            </div>

            <button onClick={createFile} className="mb-4 flex items-center justify-center gap-2 rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-black text-slate-950 hover:bg-cyan-200">
              <Plus size={18} /> New file
            </button>

            <div className="space-y-2 overflow-auto">
              {files.map((file) => (
                <button
                  key={file.id}
                  onClick={() => {
                    setActiveFileId(file.id);
                    setSidebarOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm ${
                    activeFile.id === file.id ? "bg-cyan-300 text-slate-950" : "bg-white/[0.04] text-slate-300 hover:bg-white/10"
                  }`}
                >
                  <FileCode2 size={18} />
                  <span className="min-w-0 flex-1 truncate font-semibold">{file.name}</span>
                </button>
              ))}
            </div>

            <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-sm font-bold">{session.name}</p>
              <p className="truncate text-xs text-slate-400">{session.email}</p>
            </div>
          </div>
          <button className="flex-1 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar" />
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#0b1020] px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <FileCode2 className="text-cyan-300" size={20} />
              <div className="min-w-0">
                <p className="truncate text-sm font-black">{activeFile.name}</p>
                <p className="text-xs text-slate-400">{activeFile.language}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={copyCurrentFile} className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-slate-200 hover:bg-white/10" aria-label="Copy file">
                <Copy size={17} />
              </button>
              <button onClick={() => setOutput("Saved locally in this browser.")} className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-slate-200 hover:bg-white/10" aria-label="Save">
                <Save size={17} />
              </button>
              <button onClick={runCode} disabled={loading === "run"} className="flex items-center gap-2 rounded-xl bg-emerald-300 px-4 py-2 text-sm font-black text-emerald-950 hover:bg-emerald-200">
                {loading === "run" ? <Loader2 className="animate-spin" size={17} /> : <Play size={17} />} Run
              </button>
            </div>
          </div>

          <div className="flex shrink-0 gap-2 overflow-x-auto border-b border-white/10 bg-[#0b1020] px-4 py-2">
            {[
              ["editor", Code2, "Editor"],
              ["preview", MonitorPlay, "Preview"],
              ["terminal", TerminalSquare, "Terminal"],
              ["ai", Bot, "AI Help"],
            ].map(([id, Icon, label]) => (
              <button
                key={id as string}
                onClick={() => setActivePanel(id as any)}
                className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold ${
                  activePanel === id ? "bg-white text-slate-950" : "bg-white/[0.04] text-slate-300"
                }`}
              >
                <Icon size={16} /> {label as string}
              </button>
            ))}
          </div>

          <div className="grid min-h-0 flex-1 lg:grid-cols-[1fr_380px]">
            <div className={`${activePanel === "editor" ? "block" : "hidden lg:block"} min-h-0`}>
              <textarea
                value={activeFile.content}
                onChange={(event) => updateActiveFile(event.target.value)}
                className="h-full min-h-[420px] w-full resize-none bg-[#08101f] p-5 font-mono text-sm leading-6 text-slate-100 outline-none"
                spellCheck={false}
              />
            </div>

            <div className={`${activePanel === "preview" ? "block" : "hidden lg:block"} min-h-0 border-l border-white/10 bg-white`}>
              <iframe title="Codely preview" srcDoc={previewHtml} className="h-full min-h-[420px] w-full" />
            </div>

            <div className={`${activePanel === "terminal" ? "block" : "hidden"} min-h-0 border-l border-white/10 bg-black lg:col-start-2 lg:row-start-1`}>
              <pre className="h-full min-h-[420px] overflow-auto whitespace-pre-wrap p-5 font-mono text-sm leading-6 text-emerald-300">{output}</pre>
            </div>

            <div className={`${activePanel === "ai" ? "block" : "hidden"} min-h-0 border-l border-white/10 bg-[#0b1020] lg:col-start-2 lg:row-start-1`}>
              <div className="flex h-full min-h-[420px] flex-col gap-4 p-4">
                <div>
                  <h2 className="flex items-center gap-2 text-lg font-black">
                    <Sparkles className="text-cyan-300" /> AI Builder
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">Describe a change. Codely will update the current file or give a safe local suggestion.</p>
                </div>
                <textarea
                  value={aiPrompt}
                  onChange={(event) => setAiPrompt(event.target.value)}
                  className="min-h-32 resize-none rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white outline-none focus:border-cyan-300/60"
                />
                <button onClick={askAi} disabled={loading === "ai"} className="flex items-center justify-center gap-2 rounded-2xl bg-cyan-300 px-4 py-3 font-black text-slate-950 hover:bg-cyan-200">
                  {loading === "ai" ? <Loader2 className="animate-spin" /> : <Sparkles />} Apply AI change
                </button>
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <p className="mb-2 flex items-center gap-2 text-sm font-black text-slate-300">
                    <Github size={16} /> Result
                  </p>
                  <pre className="max-h-64 overflow-auto whitespace-pre-wrap text-sm leading-6 text-slate-300">{output}</pre>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
