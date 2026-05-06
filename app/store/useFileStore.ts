// app/store/useFileStore.ts
import { create } from 'zustand';

export type FileNode = {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileNode[];
  path: string;
};

type FileStore = {
  files: FileNode[];
  currentFile: string | null;
  currentContent: string;

  setCurrentFile: (path: string, content: string) => void;
  updateFileContent: (path: string, content: string) => void;
  addFile: (name: string, type: 'file' | 'folder', parentPath?: string) => void;
  // More actions will be added later
};

export const useFileStore = create<FileStore>((set) => ({
  files: [
    {
      id: '1',
      name: 'app',
      type: 'folder',
      path: 'app',
      children: [
        { id: '2', name: 'index.tsx', type: 'file', content: '// Welcome to Codely\nconsole.log("Hello, World!");', path: 'app/index.tsx' },
        { id: '3', name: 'globals.css', type: 'file', content: '/* Global styles */', path: 'app/globals.css' },
      ]
    },
    { id: '4', name: 'README.md', type: 'file', content: '# Codely\n\nYour online IDE', path: 'README.md' },
  ],
  currentFile: 'app/index.tsx',
  currentContent: '// Welcome to Codely\nconsole.log("Hello, World!");',

  setCurrentFile: (path, content) =>
    set({ currentFile: path, currentContent: content }),

  updateFileContent: (path, content) =>
    set((state) => ({
      currentContent: content,
      files: updateContentInTree(state.files, path, content),
    })),

  addFile: (name, type, parentPath) =>
    set((state) => ({
      files: addNodeToTree(state.files, name, type, parentPath),
    })),
}));

// Helper functions
function updateContentInTree(tree: FileNode[], path: string, content: string): FileNode[] {
  return tree.map(node => {
    if (node.path === path) return { ...node, content };
    if (node.children) {
      return { ...node, children: updateContentInTree(node.children, path, content) };
    }
    return node;
  });
}

function addNodeToTree(tree: FileNode[], name: string, type: 'file' | 'folder', parentPath?: string): FileNode[] {
  // Simple implementation - we'll improve this later
  if (!parentPath) {
    return [...tree, {
      id: Date.now().toString(),
      name,
      type,
      path: name,
      content: type === 'file' ? '// New file' : undefined,
      children: type === 'folder' ? [] : undefined
    }];
  }
  return tree; // TODO: handle nested later
}
