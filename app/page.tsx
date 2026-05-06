'use client';

import CodeEditor from '@/components/editor/CodeEditor';
import FileSidebar from '@/components/sidebar/FileSidebar';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { useFileStore } from '@/store/useFileStore';

export default function Codely() {
  const { currentContent, updateFileContent, currentFile } = useFileStore();

  return (
    <div className="flex h-screen bg-zinc-950 text-white overflow-hidden flex-col">
      {/* Top Navigation Bar */}
      <div className="h-14 border-b border-zinc-800 flex items-center px-4 bg-zinc-900 z-10">
        <div className="flex items-center gap-4 flex-1">
          <h1 className="font-bold text-2xl tracking-tight text-white">Codely</h1>
          <div className="text-sm text-zinc-400">• Untitled Project</div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            className="px-6 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-sm font-medium transition-all active:scale-95 flex items-center gap-2"
          >
            ▶ Run
          </button>
          
          <button className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm transition-colors">
            Share
          </button>
          
          <button className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm transition-colors">
            Deploy
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          
          {/* Left Sidebar - File Explorer */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={35}>
            <FileSidebar />
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Center - Monaco Editor */}
          <ResizablePanel defaultSize={55} minSize={40}>
            <CodeEditor 
              value={currentContent} 
              onChange={(value) => updateFileContent(currentFile || '', value || '')}
              language="typescript"
            />
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right Panel - Preview + Console */}
          <ResizablePanel defaultSize={25} minSize={20}>
            <div className="h-full flex flex-col bg-zinc-900 border-l border-zinc-800">
              
              {/* Preview Tab */}
              <div className="h-11 border-b border-zinc-800 flex items-center px-4 text-sm font-medium bg-zinc-950">
                Preview
              </div>
              <div className="flex-1 flex items-center justify-center p-8 text-zinc-500 border-b border-zinc-800">
                <div className="text-center">
                  <div className="text-4xl mb-4">🖼️</div>
                  <p>Live Preview will appear here</p>
                  <p className="text-xs mt-2">HTML / React / Next.js preview</p>
                </div>
              </div>

              {/* Console */}
              <div className="h-11 border-b border-zinc-800 flex items-center px-4 text-sm font-medium bg-zinc-950">
                Console
              </div>
              <div className="flex-1 p-4 font-mono text-sm text-emerald-400 overflow-auto bg-black/50">
                {`> Console output will appear here...\n`}
                {`> Ready to run your code`}
              </div>
            </div>
          </ResizablePanel>

        </ResizablePanelGroup>
      </div>
    </div>
  );
}
