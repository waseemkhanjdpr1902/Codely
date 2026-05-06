'use client';

import CodeEditor from './components/editor/CodeEditor';
import FileSidebar from './components/sidebar/FileSidebar';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './components/ui/resizable';

export default function Codely() {
  return (
    <div className="flex h-screen bg-zinc-950 text-white overflow-hidden flex-col">
      {/* Top Bar */}
      <div className="h-14 border-b border-zinc-800 flex items-center px-4 bg-zinc-900">
        <h1 className="font-bold text-2xl">Codely</h1>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          
          {/* Sidebar */}
          <ResizablePanel defaultSize={22} minSize={18}>
            <FileSidebar />
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Editor */}
          <ResizablePanel defaultSize={55}>
            <CodeEditor value="// Start coding here" onChange={() => {}} />
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right Panel */}
          <ResizablePanel defaultSize={23}>
            <div className="h-full bg-zinc-900 p-4 text-zinc-400">
              Preview / Console coming soon...
            </div>
          </ResizablePanel>

        </ResizablePanelGroup>
      </div>
    </div>
  );
}
