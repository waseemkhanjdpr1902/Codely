'use client';
import { useState } from 'react';

export default function Home() {
  const [code, setCode] = useState(`// Try running this code
console.log("Hello from your code editor!");
console.log("2 + 2 =", 2 + 2);

// Try a function
const greet = (name) => "Hello, " + name + "!";
console.log(greet("Developer"));

// Even arrays work
console.log([1, 2, 3].map(x => x * 2));
`);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    setLoading(true);
    setOutput('Running...');
    
    try {
      const response = await fetch('/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      
      const data = await response.json();
      setOutput(data.output || 'No output');
    } catch (error: any) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#1e1e1e', color: '#fff' }}>
      {/* Toolbar */}
      <div style={{ padding: '10px', backgroundColor: '#2d2d2d', borderBottom: '1px solid #3d3d3d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'monospace' }}>✧ Code Editor</span>
        <button 
          onClick={runCode}
          disabled={loading}
          style={{
            padding: '8px 16px',
            backgroundColor: loading ? '#555' : '#0e639c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: 'monospace'
          }}
        >
          {loading ? '⏳ Running...' : '▶ Run Code'}
        </button>
      </div>
      
      {/* Editor and Output */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Editor */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderRight: '1px solid #3d3d3d' }}>
          <div style={{ padding: '5px 10px', backgroundColor: '#2d2d2d', fontSize: '12px', fontFamily: 'monospace' }}>
            Editor
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{
              flex: 1,
              backgroundColor: '#1e1e1e',
              color: '#d4d4d4',
              border: 'none',
              padding: '10px',
              fontFamily: 'Monaco, "Courier New", monospace',
              fontSize: '14px',
              resize: 'none',
              outline: 'none'
            }}
            spellCheck={false}
          />
        </div>
        
        {/* Output */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '5px 10px', backgroundColor: '#2d2d2d', fontSize: '12px', fontFamily: 'monospace' }}>
            Output
          </div>
          <pre style={{
            flex: 1,
            margin: 0,
            padding: '10px',
            backgroundColor: '#1e1e1e',
            color: '#4ec9b0',
            fontFamily: 'Monaco, "Courier New", monospace',
            fontSize: '14px',
            overflow: 'auto',
            whiteSpace: 'pre-wrap'
          }}>
            {output || 'Click "Run Code" to see output here'}
          </pre>
        </div>
      </div>
    </div>
  );
}
