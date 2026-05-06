'use client';

import { Folder, File, Plus } from 'lucide-react';

interface FileSidebarProps {
  currentFile: string;
  onFileSelect: (file: string) => void;
}

const sampleFiles = [
  { name: 'index.tsx', type: 'file' },
  { name: 'app.css', type: 'file' },
  { name: 'components', type: 'folder' },
  { name: 'utils.ts', type: 'file' },
];

export default function FileSidebar({ currentFile, onFileSelect }: FileSidebarProps) {
  return (
    <div className="h-full bg-zinc-950 border-r border-zinc-800 flex flex-col">
      {/* Sidebar Header */}
      <div className="h-11 border-b border-zinc-800 flex items-center px-4 justify-between text-sm">
        <span className="font-medium">EXPLORER</span>
        <Plus size={16} className="cursor-pointer hover:text-white" />
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-auto p-2 text-sm">
        {sampleFiles.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer hover:bg-zinc-800 transition-colors ${
              currentFile === item.name ? 'bg-zinc-800 text-white' : 'text-zinc-400'
            }`}
            onClick={() => item.type === 'file' && onFileSelect(item.name)}
          >
            {item.type === 'folder' ? (
              <Folder size={16} />
            ) : (
              <File size={16} />
            )}
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
