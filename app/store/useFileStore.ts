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
};

export const useFileStore = create<FileStore>((set, get) => ({
  files: [
    {
      id: '1',
      name: 'app',
      type: 'folder',
      path: 'app',
      children: [
        { 
          id: '2', 
          name: 'index.tsx', 
          type: 'file', 
          content: '// Welcome to Codely\nconsole.log("Hello, World!");', 
          path: 'app/index.tsx' 
        },
        { 
          id: '3', 
          name: 'globals.css', 
          type: 'file', 
          content: '/* Global styles */', 
          path: 'app/globals.css' 
        },
      ]
    },
    { 
      id: '4', 
      name: 'README.md', 
      type: 'file', 
      content: '# Codely\n\nYour powerful online IDE', 
      path: 'README.md' 
    },
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
}));

function updateContentInTree(tree: FileNode[], path: string, content: string): FileNode[] {
  return tree.map(node => {
    if (node.path === path) {
      return { ...node, content };
    }
    if (node.children) {
      return { 
        ...node, 
        children: updateContentInTree(node.children, path, content) 
      };
    }
    return node;
  });
}
