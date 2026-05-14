'use client';

import Editor from '@monaco-editor/react';
import { Bot, CheckCircle2, Play, Sparkles, Terminal } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useFileStore } from '../../store/useFileStore';

const languageByExtension: Record<string, string> = {
  css: 'css',
  html: 'html',
  js: 'javascript',
  jsx: 'javascript',
  json: 'json',
  md: 'markdown',
  ts: 'typescript',
  tsx: 'typescript',
};

export default function CodeEditor() {
  const [output, setOutput] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [running, setRunning] = useState(false);
  const [thinking, setThinking] = useState(false);
  const currentFile = useFileStore((state) => state.currentFile);
  const code = useFileStore((state) => state.currentContent);
  const updateFileContent = useFileStore((state) => state.updateFileContent);

  const language = useMemo(() => {
    const extension = currentFile?.split('.').pop() || 'tsx';
    return languageByExtension[extension] || 'typescript';
  }, [currentFile]);

  const runCode = async () => {
    setRunning(true);
    setOutput('Running...');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          language: language === 'typescript' ? 'javascript' : language,
        }),
      });
      const data = await response.json();
      setOutput(data.output || 'Finished.');
    } catch {
      setOutput('Error executing code.');
    }

    setRunning(false);
  };

  const applyAiEdit = async () => {
    if (!aiPrompt.trim()) {
      setOutput('Add an AI request first.');
      return;
    }

    setThinking(true);
    setOutput('Codely AI is working...');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'ai',
          code,
          prompt: aiPrompt,
          fileName: currentFile || 'file.tsx',
        }),
      });
      const data = await response.json();

      if (data.code) {
        updateFileContent(currentFile || 'app/page.tsx', data.code);
      }

      setOutput(data.output || 'AI edit finished.');
    } catch {
      setOutput('AI edit failed.');
    }

    setThinking(false);
  };

  return (
    <div className="grid min-h-0 grid-cols-1 bg-[#0b1020] xl:grid-cols-[minmax(0,1fr)_340px]">
      <section className="grid min-h-0 grid-rows-[42px_minmax(0,1fr)_190px]">
        <div className="flex items-center justify-between border-b border-slate-800 bg-[#111827] px-4">
          <div className="flex min-w-0 items-center gap-2 text-sm text-slate-300">
            <CheckCircle2 size={16} className="shrink-0 text-emerald-300" />
            <span className="truncate">{currentFile}</span>
          </div>
          <button
            type="button"
            onClick={runCode}
            disabled={running}
            className="inline-flex h-8 items-center gap-2 rounded bg-emerald-400 px-3 text-xs font-semibold text-slate-950 transition hover:bg-emerald-300 disabled:opacity-60"
          >
            <Play size={14} />
            {running ? 'Running' : 'Run'}
          </button>
        </div>

        <div className="min-h-0">
          <Editor
            height="100%"
            language={language}
            value={code}
            onChange={(value) => updateFileContent(currentFile || 'app/page.tsx', value || '')}
            theme="vs-dark"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              padding: { top: 18 },
              scrollBeyondLastLine: false,
              wordWrap: 'on',
            }}
          />
        </div>

        <div className="min-h-0 border-t border-slate-800 bg-black">
          <div className="flex h-10 items-center gap-2 border-b border-slate-800 px-4 text-sm text-slate-300">
            <Terminal size={16} className="text-emerald-300" />
            Output
          </div>
          <pre className="h-[150px] overflow-auto p-4 text-sm leading-6 text-emerald-300">
            {output || 'Ready.'}
          </pre>
        </div>
      </section>

      <aside className="grid min-h-0 grid-rows-[auto_1fr] border-l border-slate-800 bg-[#0f172a]">
        <div className="border-b border-slate-800 p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-100">
            <Bot size={17} className="text-cyan-300" />
            Codely AI
          </div>
          <textarea
            value={aiPrompt}
            onChange={(event) => setAiPrompt(event.target.value)}
            placeholder="Refactor this file, add a hero, fix the button..."
            className="h-28 w-full resize-none rounded-md border border-slate-700 bg-slate-950 p-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
          />
          <button
            type="button"
            onClick={applyAiEdit}
            disabled={thinking}
            className="mt-3 inline-flex h-9 w-full items-center justify-center gap-2 rounded bg-cyan-300 px-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:opacity-60"
          >
            <Sparkles size={15} />
            {thinking ? 'Applying' : 'Apply AI Edit'}
          </button>
        </div>

        <div className="min-h-0 overflow-auto p-4">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Preview
          </div>
          <div className="rounded-md border border-slate-700 bg-white p-5 text-slate-950 shadow-2xl shadow-black/20">
            <div className="mb-3 h-2 w-24 rounded-full bg-slate-200" />
            <div className="space-y-2 text-sm">
              <div className="h-4 w-4/5 rounded bg-slate-900" />
              <div className="h-3 w-full rounded bg-slate-200" />
              <div className="h-3 w-3/4 rounded bg-slate-200" />
            </div>
            <div className="mt-5 h-24 rounded bg-gradient-to-br from-cyan-100 to-emerald-100" />
          </div>
        </div>
      </aside>
    </div>
  );
}
