'use client';

import CodeEditor from './components/editor/CodeEditor';
import FileSidebar from './components/sidebar/FileSidebar';

export default function Codely() {
  return (
    <div className="flex h-screen bg-zinc-950 text-white overflow-hidden flex-col">
      {/* Top Navigation Bar */}
      <div className="h-14 border-b border-zinc-800 bg-zinc-900 flex items-center px-4 z-10">
        <h1 className="font-bold text-2xl tracking-tight">Codely</h1>
        <div className="ml-4 text-sm text-zinc-400">• My Awesome Project</div>

        <div className="ml-auto flex items-center gap-3">
          <button className="px-6 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-sm font-medium">
            ▶ Run
          </button>
          <button className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm">
            Share
          </button>
        </div>
      </div>

      {/* Main Area - Simple Flex Layout */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar */}
        <div className="w-72 border-r border-zinc-800 bg-zinc-950 flex flex-col">
          <FileSidebar />
        </div>

        {/* Code Editor */}
        <div className="flex-1 flex flex-col">
          <CodeEditor 
            value="// Welcome to Codely\n\nconsole.log('Hello, World!');\n\n// Start building something amazing!" 
            onChange={() => {}} 
          />
        </div>

        {/* Right Panel */}
        <div className="w-80 border-l border-zinc-800 bg-zinc-900 flex flex-col">
          <div className="h-12 border-b border-zinc-800 flex items-center px-4 text-sm font-medium">
            Preview
          </div>
          <div className="flex-1 flex items-center justify-center text-zinc-500 p-8 text-center">
            <div>
              <div className="text-5xl mb-4">🖥️</div>
              <p>Live Preview</p>
              <p className="text-xs mt-2">Will be available soon</p>
            </div>
          </div>

          <div className="h-12 border-t border-zinc-800 flex items-center px-4 text-sm font-medium bg-zinc-950">
            Console
          </div>
          <div className="flex-1 p-4 font-mono text-sm text-emerald-400 overflow-auto bg-black/30">
            Console output will appear here...
          </div>
        </div>

      </div>
    </div>
  );
}
