import React, { useState } from 'react';
import { 
  Cpu, 
  Plus, 
  CheckCircle2, 
  Layers, 
  ArrowRight, 
  Server, 
  Sliders, 
  Zap,
  ShieldCheck
} from 'lucide-react';

export const ModelManager: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const models = [
    { name: 'Sovereign Reasoner', fullName: 'Qwen2.5-72B-Instruct-Q4', purpose: 'Reasoning', status: 'Online', vram: '8 GB', quantization: 'Q4', endpoint: 'http://localhost:11434' },
    { name: 'Vision Model', fullName: 'Llama-3.2-11B-Vision-Instruct', purpose: 'Image Analysis', status: 'Online', vram: '6 GB', quantization: 'Q4', endpoint: 'http://localhost:11434' },
    { name: 'Local Code Agent', fullName: 'DeepSeek-R1-Distill-Qwen-14B', purpose: 'Code & Calculations', status: 'Online', vram: '8 GB', quantization: 'Q5', endpoint: 'http://localhost:11434' },
    { name: 'CodeLlama Specialist', fullName: 'CodeLlama-34B-Instruct', purpose: 'Code Synthesis', status: 'Online', vram: '20 GB', quantization: 'Q4', endpoint: 'http://localhost:11434' },
    { name: 'Embedding Model', fullName: 'bge-m3-large', purpose: 'RAG', status: 'Online', vram: '2 GB', quantization: 'FP16', endpoint: 'http://localhost:11434' },
    { name: 'Fast Document QA', fullName: 'Mistral-7B-Instruct-v0.3', purpose: 'Document QA', status: 'Online', vram: '4 GB', quantization: 'Q4', endpoint: 'http://localhost:11434' },
  ];

  const routingRules = [
    { task: 'Document Analysis', keywords: 'sop, manual, report, procedure', selected: 'Sovereign Reasoner', type: 'general' },
    { task: 'Image Analysis', keywords: 'photo, visual, inspection, image', selected: 'Vision Model', type: 'vision' },
    { task: 'Data Analysis', keywords: 'csv, statistic, calculate, trend', selected: 'Local Code Agent', type: 'coding' },
    { task: 'P&ID Engineering Drawings', keywords: 'p&id, engineering drawings, schematic', selected: 'Vision Model', type: 'vision' },
    { task: 'Financial Audit Requests', keywords: 'financial audit, audit request, compliance', selected: 'Fast Document QA', type: 'document' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Model Manager</h1>
          <p className="text-xs text-slate-400 mt-0.5">Local open-weight LLMs running exclusively on air-gapped GPU hardware</p>
        </div>

        <button className="flex items-center space-x-2 px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-sm transition-colors shrink-0">
          <Plus className="w-3.5 h-3.5" />
          <span>+ Add Local Model</span>
        </button>
      </div>

      {/* Model Registry Table */}
      <div className="bg-[#0E1624] border border-[#1E293B] rounded-xl overflow-hidden shadow-sm space-y-2">
        <div className="p-4 border-b border-[#1E293B] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-blue-400" />
            <h2 className="text-sm font-bold text-white">Local Model Registry</h2>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
            6 MODELS LOADED (OLLAMA / vLLM AIRGAP)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead>
              <tr className="border-b border-[#1E293B] bg-[#0A0E17] text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">Model</th>
                <th className="py-3 px-4 font-semibold">Purpose</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">VRAM</th>
                <th className="py-3 px-4 font-semibold">Quantization</th>
                <th className="py-3 px-4 font-semibold text-right">Local Endpoint</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B]/50 font-sans">
              {models.map((m, idx) => (
                <tr key={idx} className="hover:bg-[#131D2E] transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-white">{m.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">{m.fullName}</div>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-300">{m.purpose}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center space-x-1.5 text-[11px] font-mono font-medium text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span>● {m.status}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-200">{m.vram}</td>
                  <td className="py-3 px-4 font-mono">
                    <span className="bg-[#121A2A] px-2 py-0.5 rounded border border-[#1E293B] text-[10px] font-bold text-blue-300">
                      {m.quantization}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-[11px] text-slate-500">{m.endpoint}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Model Routing Section */}
      <div className="bg-[#0E1624] border border-[#1E293B] rounded-xl p-5 shadow-sm space-y-4">
        <div className="border-b border-[#1E293B] pb-3 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">Intelligent Task Routing</h3>
            <p className="text-xs text-slate-400 mt-0.5">Deterministic intent router directing user requests to specialized models</p>
          </div>
          <span className="text-[10px] font-mono text-slate-500">app/models_engine/router.py</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {routingRules.map((rule, idx) => (
            <div key={idx} className="bg-[#0A0E17] border border-[#1E293B] rounded-lg p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{rule.task}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-950 text-blue-400 border border-blue-800 uppercase">
                  {rule.type}
                </span>
              </div>
              <div className="text-[10px] text-slate-500 font-mono truncate">Keywords: {rule.keywords}</div>
              <div className="pt-2 border-t border-[#1E293B] flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 text-[11px]">Selected:</span>
                <span className="text-emerald-400 font-semibold">{rule.selected}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
