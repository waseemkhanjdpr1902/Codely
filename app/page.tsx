"use client";
import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Editor from "@monaco-editor/react";

export default function CodelyApp() {
  const [code, setCode] = useState("<!DOCTYPE html>\n<html>\n<body>\n  <h1>Ready to Build?</h1>\n</body>\n</html>");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  // FEATURE: LOGIN
  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      alert("Successfully logged in to Codely!");
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login failed. Check if Google Auth is enabled in Firebase.");
    }
  };

  // FEATURE: AI GENERATION (THE LINK)
  const generateCode = async () => {
    if (!prompt) return alert("Please enter a description first!");
    
    setLoading(true);
    try {
      // This fetch call links directly to app/api/generate/route.js
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to connect to AI");
      }

      if (data.output) {
        // Update the editor and the live preview
        setCode(data.output);
      }
    } catch (error) {
      console.error("Linking Error:", error);
      alert("AI Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen font-sans bg-gray-100">
      <nav className="flex justify-between items-center p-4 bg-white border-b shadow-sm">
        <span className="text-2xl font-bold text-blue-600">Codely AI</span>
        <button onClick={handleLogin} className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
          Login with Google
        </button>
      </nav>

      <div className="p-4 flex gap-2 bg-white border-b">
        <input 
          className="flex-1 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="e.g., Build a modern login page with a purple theme"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button 
          onClick={generateCode}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold disabled:bg-gray-400"
        >
          {loading ? "Generating..." : "Generate App"}
        </button>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-2 p-2 overflow-hidden">
        <div className="rounded-xl overflow-hidden border shadow-lg">
          <Editor height="100%" defaultLanguage="html" theme="vs-dark" value={code} onChange={(v) => setCode(v || "")} />
        </div>
        <div className="rounded-xl overflow-hidden border shadow-lg bg-white">
          <iframe srcDoc={code} className="w-full h-full border-none" title="preview" />
        </div>
      </div>
    </div>
  );
}
