"use client";
import { useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import Editor from "@monaco-editor/react";

export default function CodelyApp() {
  const [prompt, setPrompt] = useState("");
  const [code, setCode] = useState("// Your AI-generated code will appear here...");

  const generateCode = async () => {
    // 1. Call AI API (Simplified example)
    const response = await fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    setCode(data.output);

    // 2. Save to Firebase
    if (auth.currentUser) {
      await addDoc(collection(db, "projects"), {
        userId: auth.currentUser.uid,
        prompt: prompt,
        code: data.output,
        timestamp: new Date()
      });
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section from your UI */}
      <nav className="flex justify-between p-6 border-b">
        <h1 className="text-2xl font-bold">Codely</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
      </nav>

      <div className="p-10 max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold mb-4">What do you want to build?</h2>
          <div className="flex gap-2">
            <input 
              className="flex-1 p-4 border rounded-lg shadow-sm"
              placeholder="e.g. Build a portfolio website with a contact form..."
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button onClick={generateCode} className="bg-black text-white px-8 rounded-lg">Generate</button>
          </div>
        </div>

        {/* The Editor UI */}
        <div className="rounded-xl overflow-hidden border shadow-2xl">
          <Editor
            height="500px"
            defaultLanguage="html"
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val || "")}
          />
        </div>
      </div>
    </main>
  );
}
