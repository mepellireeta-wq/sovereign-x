import React, { useEffect, useState } from 'react';
import { Cpu, Server, CheckCircle2 } from 'lucide-react';
import { fetchModels } from '../services/api';

export const ModelManager: React.FC = () => {
  const [models, setModels] = useState<any[]>([]);

  useEffect(() => {
    fetchModels().then(res => setModels(res.models || [])).catch(console.error);
  }, []);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Local Model Serving Layer</h1>
          <p className="text-xs text-slate-400 mt-1">
            Configurable open-weight models serving general reasoning, vision, code analysis, document QA, and embeddings.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {models.map((m) => (
          <div key={m.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-white text-sm">{m.name}</h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                {m.status}
              </span>
            </div>

            <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded border border-slate-800">
              {m.default_use_case}
            </p>

            <div className="grid grid-cols-3 gap-2 text-[11px] font-mono text-slate-400">
              <div>Type: <span className="text-white">{m.model_type}</span></div>
              <div>Quant: <span className="text-white">{m.quantization}</span></div>
              <div>Context: <span className="text-white">{m.context_length}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
