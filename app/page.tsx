// app/page.tsx
'use client';

import { useState } from 'react';
import CodeEditor from '@/components/editor/CodeEditor';
import FileSidebar from '@/components/sidebar/FileSidebar';

export default function Codely() {
  const [currentFile, setCurrentFile] = useState('index.tsx');
  const [fileContent, setFileContent] = useState('// Welcome to Codely\nconsole.log("Hello World!");');

  return (
    <div className="flex h-screen bg-zinc-950 text-white overflow-hidden">
      {/* Sidebar */}
      <FileSidebar 
        currentFile={currentFile} 
        onFileSelect={setCurrentFile} 
      />

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-14 border-b border-zinc-800 flex items-center px-4 justify-between bg-zinc-900">
          <div className="flex items-center gap-4">
            <h1 className="font-semibold text-lg">Codely</h1>
            <div className="text-sm text-zinc-400">{currentFile}</div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-md text-sm font-medium">
              Run
            </button>
            <button className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-md text-sm">
              Share
            </button>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1">
          <CodeEditor 
            value={fileContent} 
            onChange={setFileContent}
            language="typescript"
          />
        </div>
      </div>

      {/* Preview / Terminal Area (Right Panel) */}
      <div className="w-96 border-l border-zinc-800 bg-zinc-900">
        <div className="h-14 border-b border-zinc-800 flex items-center px-4">
          Preview
        </div>
        <div className="h-full p-4 text-sm text-zinc-400">
          Preview / Console will appear here
        </div>
      </div>
    </div>
  );
}
