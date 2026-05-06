'use client';

import CodeEditor from './components/editor/CodeEditor';
import FileSidebar from './components/sidebar/FileSidebar';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './components/ui/resizable';

export default function Codely() {
  return (
    <div className="flex h-screen bg-zinc-950 text-white overflow-hidden flex-col">
      {/* Top Bar */}
      <div className="h-14 border-b border-zinc-800 bg-zinc-900 flex items-center px-4 z-10">
        <h1 className="font-bold text-2xl tracking-tight">Codely</h1>
        <div className="ml-4 text-sm text-zinc-400">• Untitled Project</div>

        <div className="ml-auto flex items-center gap-3">
          <button className="px-6 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-sm font-medium transition-colors">
            ▶ Run
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          
          {/* Sidebar */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={35}>
            <FileSidebar />
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Editor */}
          <ResizablePanel defaultSize={55} minSize={40}>
            <CodeEditor 
              value="// Welcome to Codely\nconsole.log('Hello from Codely!');" 
              onChange={() => {}} 
            />
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right Panel */}
          <ResizablePanel defaultSize={25} minSize={20}>
            <div className="h-full bg-zinc-900 flex flex-col">
              <div className="h-12 border-b border-zinc-800 flex items-center px-4 text-sm font-medium">
                Preview
              </div>
              <div className="flex-1 p-8 flex items-center justify-center text-zinc-500">
                Live Preview Coming Soon...
              </div>
            </div>
          </ResizablePanel>

        </ResizablePanelGroup>
      </div>
    </div>
  );
}
