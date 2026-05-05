"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [code, setCode] = useState("");
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
    setCode(data.code);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main className="max-w-7xl mx-auto px-6 py-12">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-4 rounded-xl bg-slate-800"
          placeholder="Describe app..."
        />

        <button
          onClick={generateApp}
          className="mt-4 px-6 py-3 bg-cyan-500 rounded-xl"
        >
          {loading ? "Generating..." : "Generate App"}
        </button>

        <pre className="mt-8 whitespace-pre-wrap">
          {code}
        </pre>
      </main>
    </div>
  );
}
