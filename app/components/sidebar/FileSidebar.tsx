'use client';

import { Folder, File } from 'lucide-react';

export default function FileSidebar() {
  return (
    <div className="h-full bg-zinc-950 border-r border-zinc-800 p-4">
      <h3 className="font-medium mb-4">EXPLORER</h3>
      <div className="space-y-1 text-sm">
        <div className="flex items-center gap-2 text-white bg-zinc-800 p-2 rounded">
          📄 index.tsx
        </div>
        <div className="flex items-center gap-2 p-2 text-zinc-400 hover:bg-zinc-800 rounded cursor-pointer">
          📁 app
        </div>
        <div className="flex items-center gap-2 p-2 text-zinc-400 hover:bg-zinc-800 rounded cursor-pointer">
          📄 README.md
        </div>
      </div>
    </div>
  );
}
