export default function CodelyPremium() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 backdrop-blur sticky top-0 z-50 bg-slate-950/70">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">Codely AI</div>
          <nav className="hidden md:flex gap-8 text-sm text-slate-300">
            <a>Templates</a><a>Docs</a><a>Pricing</a><a>Community</a>
          </nav>
          <button className="px-5 py-2 rounded-2xl bg-white text-slate-900 font-semibold">Get Started</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <section className="text-center py-14">
          <div className="inline-block px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 text-sm mb-6">Build SaaS with AI</div>
          <h1 className="text-6xl font-bold leading-tight max-w-4xl mx-auto">Describe your app. <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">Codely builds it.</span></h1>
          <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-lg">Generate full-stack apps, connect databases, deploy instantly, and iterate with natural language.</p>
          <div className="mt-10 max-w-4xl mx-auto rounded-3xl border border-white/10 bg-white/5 p-3 flex gap-3 shadow-2xl">
            <input className="flex-1 bg-transparent outline-none px-4 text-lg" placeholder="Build an OLX-style marketplace with chat, auth, and admin dashboard..." />
            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 font-semibold">Generate App</button>
          </div>
        </section>

        <section className="grid grid-cols-12 gap-6 mt-10">
          <aside className="col-span-2 rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="space-y-4 text-slate-300">
              <div>Projects</div><div>Templates</div><div>Assets</div><div>Database</div><div>Deploy</div><div>Settings</div>
            </div>
          </aside>

          <section className="col-span-5 rounded-3xl border border-white/10 bg-slate-900 p-5 min-h-[600px]">
            <div className="flex gap-2 mb-4"><span className="px-3 py-1 rounded-xl bg-white/10">app.tsx</span><span className="px-3 py-1 rounded-xl text-slate-400">styles.css</span></div>
            <pre className="text-sm text-cyan-300 overflow-auto">{`// AI generated code appears here\nfunction Marketplace(){\n  return <PremiumApp />\n}`}</pre>
          </section>

          <section className="col-span-5 rounded-3xl border border-white/10 bg-white p-5 text-slate-900 min-h-[600px]">
            <div className="font-semibold mb-4">Live Preview</div>
            <div className="rounded-2xl border h-[520px] grid place-items-center text-2xl font-bold">Your app preview renders here</div>
          </section>
        </section>
      </main>
    </div>
  )
}
