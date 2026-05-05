"use client";

import { useState } from "react";

export default function Home() {
  const [preview, setPreview] = useState(
    "<h1 style='font-family:sans-serif'>Your app preview renders here</h1>"
  );

  const generate = () => {
    setPreview(`
      <div style="padding:40px;font-family:sans-serif">
        <h1>Generated Demo App</h1>
        <button style="
          padding:12px 24px;
          border:none;
          border-radius:12px;
          background:#06b6d4;
          color:white;
          cursor:pointer;
        ">
          Working Button
        </button>
      </div>
    `);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 sticky top-0 bg-slate-950/80 backdrop-blur z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
            Codely AI
          </h1>

          <button className="px-5 py-2 rounded-xl bg-white text-black font-semibold">
            Login
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="text-center">
          <h2 className="text-6xl font-bold leading-tight">
            Describe your app.
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Codely builds it.
            </span>
          </h2>

          <p className="text-slate-400 mt-6 text-lg">
            Generate SaaS products with AI
          </p>

          <div className="mt-10 flex gap-3 max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-3">
            <input
              className="flex-1 bg-transparent outline-none px-4 text-lg"
              placeholder="Build an ecommerce website..."
            />

            <button
              onClick={generate}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 font-semibold"
            >
              Generate App
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-16">
          <div className="rounded-3xl border border-white/10 bg-slate-900 p-6 min-h-[500px]">
            <h3 className="font-semibold mb-5">Generated Code</h3>

            <pre className="text-cyan-300 text-sm">
{`function Demo(){
  return <PremiumApp/>
}`}
            </pre>
          </div>

          <div className="rounded-3xl bg-white p-6 text-black min-h-[500px]">
            <h3 className="font-semibold mb-5">Live Preview</h3>

            <iframe
              srcDoc={preview}
              className="w-full h-[420px] rounded-xl border"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
