"use client";

import { useState } from "react";

export default function CodelyPremium() {
  const [prompt, setPrompt] = useState("");
  const [code, setCode] = useState("// AI generated code appears here");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const generateApp = async () => {
    if (!prompt) return;

    setLoading(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    if (data.html) {
      setCode(data.html);

      setPreview(`
        <style>${data.css || ""}</style>
        ${data.html}
        <script>${data.js || ""}</script>
      `);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 sticky top-0 z-50 bg-slate-950/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
            Codely AI
          </h1>

          <button className="px-5 py-2 rounded-xl bg-white text-black font-semibold">
            Login
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <section className="text-center mb-12">
          <h2 className="text-6xl font-bold">
            Describe your app.
          </h2>

          <p className="text-slate-400 mt-4 text-lg">
            Codely builds it instantly.
          </p>

          <div className="mt-8 max-w-4xl mx-auto flex gap-3 bg-white/5 border border-white/10 rounded-3xl p-3">
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Build OLX clone with login, chat, dashboard..."
              className="flex-1 bg-transparent outline-none px-4"
            />

            <button
              onClick={generateApp}
              className="px-7 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 font-semibold"
            >
              {loading ? "Generating..." : "Generate App"}
            </button>
          </div>
        </section>

        <section className="grid grid-cols-12 gap-6">
          <aside className="col-span-2 rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="space-y-4 text-slate-300">
              <div>Projects</div>
              <div>Templates</div>
              <div>Assets</div>
              <div>Database</div>
              <div>Deploy</div>
              <div>Settings</div>
            </div>
          </aside>

          <section className="col-span-5 rounded-3xl border border-white/10 bg-slate-900 p-5 min-h-[650px]">
            <div className="font-semibold mb-4">
              Generated Code
            </div>

            <pre className="text-sm text-cyan-300 whitespace-pre-wrap overflow-auto">
              {code}
            </pre>
          </section>

          <section className="col-span-5 rounded-3xl bg-white p-5 min-h-[650px]">
            <div className="font-semibold text-black mb-4">
              Live Preview
            </div>

            <iframe
              title="preview"
              srcDoc={preview}
              className="w-full h-[560px] rounded-xl border"
            />
          </section>
        </section>
      </main>
    </div>
  );
}
