import React, { useState } from 'react';
import { Terminal, Play } from 'lucide-react';
import { executeSandboxCode } from '../services/api';

export const ToolsPage: React.FC = () => {
  const [code, setCode] = useState("import pandas as pd\nimport numpy as np\n\ndata = {'sensor': ['P-102B Vibration'], 'value': [6.8], 'unit': ['mm/s']}\ndf = pd.DataFrame(data)\nprint(df)");
  const [output, setOutput] = useState<any>(null);

  const handleRunCode = async () => {
    try {
      const res = await executeSandboxCode(code);
      setOutput(res);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-xl font-bold text-white">Local Sandboxed Python Execution Engine</h1>
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase font-mono">Python Code Editor (AST Safe Sandbox)</span>
          <button onClick={handleRunCode} className="px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 font-bold text-white text-xs flex items-center space-x-1">
            <Play className="w-3.5 h-3.5" />
            <span>Run Sandbox</span>
          </button>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={6}
          className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-xs text-white font-mono"
        />
        {output && (
          <div className="bg-slate-950 p-4 rounded border border-slate-800 text-xs font-mono text-emerald-400 space-y-1">
            <div>Status: {output.status} ({output.duration_ms}ms)</div>
            <pre className="text-slate-300 whitespace-pre-wrap">{output.stdout}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
