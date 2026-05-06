'use client';

import Editor from '@monaco-editor/react';

export default function CodeEditor({ value, onChange }: { 
  value: string; 
  onChange: (value: string | undefined) => void 
}) {
  return (
    <Editor
      height="100%"
      language="typescript"
      value={value}
      onChange={onChange}
      theme="vs-dark"
      options={{
        minimap: { enabled: true },
        fontSize: 14,
        automaticLayout: true,
      }}
    />
  );
}
