// app/page.tsx
'use client';

import { useState } from 'react';
import CodeEditor from '@/components/editor/CodeEditor';
import FileSidebar from '@/components/sidebar/FileSidebar';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

export default function Codely() {
  const [currentFile, setCurrentFile] = useState('index.tsx');
  const [fileContent, setFileContent] = useState('// Welcome to Codely\nconsole.log("Hello, World!");');

  return (
    <div className="flex h-screen bg-zinc-950 text-white overflow-hidden">
      {/* Top Navigation Bar */}
      <div className="h-14 border-b border-zinc-800 flex items-center px-4 bg-zinc-900 z-10">
        <div className="flex items-center gap-4 flex-1">
          <h1 className="font-bold text-xl tracking-tight">Codely</h1>
          <div className="text-sm text-zinc-400 ml-2">• My Project</div>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-6 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-sm font-medium transition-colors">
            ▶ Run
          </button>
          <button className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm">
            Share
          </button>
          <button className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm">
            Deploy
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden pt-0">
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          
          {/* Left Sidebar - File Explorer */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={35}>
            <FileSidebar 
              currentFile={currentFile} 
              onFileSelect={setCurrentFile} 
            />
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Center - Code Editor */}
          <ResizablePanel defaultSize={55} minSize={40}>
            <CodeEditor 
              value={fileContent} 
              onChange={setFileContent}
              language="typescript"
            />
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right Panel - Preview / Terminal */}
          <ResizablePanel defaultSize={25} minSize={20}>
            <div className="h-full flex flex-col bg-zinc-900">
              <div className="h-11 border-b border-zinc-800 flex items-center px-4 text-sm font-medium">
                Preview
              </div>
              <div className="flex-1 p-4 text-zinc-400 text-sm flex items-center justify-center border-b border-zinc-800">
                Live Preview will appear here
              </div>

              <div className="h-11 border-b border-zinc-800 flex items-center px-4 text-sm font-medium">
                Console
              </div>
              <div className="flex-1 p-4 font-mono text-sm text-emerald-400 overflow-auto">
                Console output will appear here...
              </div>
            </div>
          </ResizablePanel>

        </ResizablePanelGroup>
      </div>
    </div>
  );
}
