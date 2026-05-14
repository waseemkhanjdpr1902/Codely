'use client';

import { ChevronDown, File, Folder } from 'lucide-react';
import { FileNode, useFileStore } from '../../store/useFileStore';

export default function FileSidebar() {
  const files = useFileStore((state) => state.files);
  const currentFile = useFileStore((state) => state.currentFile);
  const setCurrentFile = useFileStore((state) => state.setCurrentFile);

  return (
    <aside className="h-full min-h-0 border-r border-slate-800 bg-[#0a0f1d]">
      <div className="border-b border-slate-800 px-4 py-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Explorer
        </h2>
      </div>
      <div className="space-y-1 p-3 text-sm">
        {files.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            currentFile={currentFile}
            onSelect={setCurrentFile}
          />
        ))}
      </div>
    </aside>
  );
}

function TreeNode({
  node,
  currentFile,
  onSelect,
  depth = 0,
}: {
  node: FileNode;
  currentFile: string | null;
  onSelect: (path: string, content: string) => void;
  depth?: number;
}) {
  if (node.type === 'folder') {
    return (
      <div>
        <div
          className="flex h-8 items-center gap-2 rounded px-2 text-slate-300"
          style={{ paddingLeft: 8 + depth * 14 }}
        >
          <ChevronDown size={14} className="text-slate-500" />
          <Folder size={15} className="text-cyan-300" />
          <span>{node.name}</span>
        </div>
        <div>
          {node.children?.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              currentFile={currentFile}
              onSelect={onSelect}
              depth={depth + 1}
            />
          ))}
        </div>
      </div>
    );
  }

  const selected = currentFile === node.path;

  return (
    <button
      type="button"
      onClick={() => onSelect(node.path, node.content || '')}
      className={`flex h-8 w-full items-center gap-2 rounded px-2 text-left transition ${
        selected
          ? 'bg-slate-800 text-white'
          : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
      }`}
      style={{ paddingLeft: 8 + depth * 14 }}
    >
      <File size={15} className={selected ? 'text-emerald-300' : 'text-slate-500'} />
      <span className="truncate">{node.name}</span>
    </button>
  );
}
