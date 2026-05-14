import CodeEditor from "./components/editor/CodeEditor";
import FileSidebar from "./components/sidebar/FileSidebar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b1020] text-slate-100">
      <div className="grid min-h-screen grid-rows-[56px_1fr]">
        <header className="flex items-center justify-between border-b border-slate-800 bg-[#0f172a] px-5">
          <div className="flex items-center gap-3">
            <div className="grid h-8 w-8 place-items-center rounded-md bg-cyan-400 font-bold text-slate-950">
              C
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-wide">Codely</h1>
              <p className="text-xs text-slate-400">AI coding workspace</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Live
          </div>
        </header>

        <section className="grid min-h-0 grid-cols-1 lg:grid-cols-[260px_1fr]">
          <FileSidebar />
          <CodeEditor />
        </section>
      </div>
    </main>
  );
}
