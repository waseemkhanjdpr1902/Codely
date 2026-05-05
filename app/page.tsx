"use client";
import { useState } from 'react';
import { auth } from '@/lib/firebase'; // Ensure your firebase.js is in the 'lib' folder
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Editor from "@monaco-editor/react";

export default function CodelyApp() {
  const [code, setCode] = useState("<!DOCTYPE html>\n<html>\n<body>\n  <h1>Live Preview Active</h1>\n</body>\n</html>");
  const [prompt, setPrompt] = useState("");

  // --- FEATURE 3: FIREBASE LOGIN LOGIC ---
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      alert(`Welcome to Codely, ${result.user.displayName}!`);
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Check Firebase Console Auth settings.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation with Login Button */}
      <nav className="p-4 bg-white border-b flex justify-between items-center">
        <h1 className="text-xl font-bold">Codely</h1>
        <button 
          onClick={handleLogin} 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Login with Google
        </button>
      </nav>

      <main className="flex-1 p-6 flex flex-col gap-4">
        {/* Input Area */}
        <div className="flex gap-2">
          <input 
            className="flex-1 p-3 border rounded shadow-sm"
            placeholder="Describe your app..."
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button className="px-6 bg-black text-white rounded">Generate</button>
        </div>

        {/* --- FEATURE 4: SIDE-BY-SIDE EDITOR & PREVIEW --- */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 h-[600px]">
          {/* Left: Code Editor */}
          <div className="border rounded-xl overflow-hidden shadow-lg">
            <Editor 
              height="100%" 
              defaultLanguage="html" 
              theme="vs-dark" 
              value={code} 
              onChange={(val) => setCode(val || "")} 
            />
          </div>

          {/* Right: Live Preview Rendering */}
          <div className="border rounded-xl overflow-hidden shadow-lg bg-white">
            <div className="bg-gray-100 p-2 text-xs font-mono border-b">LIVE PREVIEW</div>
            <iframe 
              srcDoc={code} 
              className="w-full h-full border-none" 
              title="Codely Live Preview"
              sandbox="allow-scripts"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
