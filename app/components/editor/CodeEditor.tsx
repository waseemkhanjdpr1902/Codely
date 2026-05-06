'use client';
import { useState } from 'react';
import Editor from '@monaco-editor/react';

export default function CodeEditor() {
  const [code, setCode] = useState('console.log("Hello World");');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          code, 
          language: 'javascript' 
        })
      });
      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      setOutput('Error executing code');
    }
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: { enabled: false }
          }}
        />
      </div>
      <div className="h-48 border-t border-gray-700">
        <div className="flex justify-between p-2">
          <span>Output:</span>
          <button 
            onClick={runCode}
            disabled={loading}
            className="px-4 py-1 bg-blue-600 rounded disabled:opacity-50"
          >
            {loading ? 'Running...' : '▶ Run'}
          </button>
        </div>
        <pre className="p-2 overflow-auto h-36 bg-black text-green-400">
          {output}
        </pre>
      </div>
    </div>
  );
}
