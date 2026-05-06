'use client';

import { Folder, File, Plus } from 'lucide-react';
import { useFileStore, FileNode } from '@/store/useFileStore';

export default function FileSidebar() {
  const { files, currentFile, setCurrentFile } = useFileStore();

  const renderTree = (nodes: FileNode[]) => {
    return nodes.map((node) => (
      <div key={node.id}>
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer hover:bg-zinc-800 transition-colors text-sm
            ${currentFile === node.path ? 'bg-zinc-800 text-white' : 'text-zinc-400'}`}
          onClick={() => node.type === 'file' && setCurrentFile(node.path, node.content || '')}
        >
          {node.type === 'folder' ? <Folder size={16} /> : <File size={16} />}
          <span>{node.name}</span>
        </div>
        
        {/* Render children if folder */}
        {node.type === 'folder' && node.children && (
          <div className="pl-6">
            {renderTree(node.children)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="h-full bg-zinc-950 border-r border-zinc-800 flex flex-col">
      <div className="h-11 border-b border-zinc-800 flex items-center px-4 justify-between text-sm font-medium">
        <span>EXPLORER</span>
        <Plus size={18} className="cursor-pointer hover:text-white" />
      </div>

      <div className="flex-1 overflow-auto p-2 text-sm">
        {renderTree(files)}
      </div>
    </div>
  );
}
