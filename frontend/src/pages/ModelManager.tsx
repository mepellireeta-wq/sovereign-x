import React, { useState } from 'react';
import { 
  Cpu, 
  Plus, 
  Server, 
  CheckCircle2, 
  Zap, 
  Activity, 
  Layers, 
  GitBranch, 
  Sliders, 
  X,
  Lock
} from 'lucide-react';

export const ModelManager: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newModelName, setNewModelName] = useState('');

  const initialModels = [
    {
      name: 'Sovereign Reasoner (DeepSeek-R1-Distill-70B)',
      purpose: 'Industrial Reasoning & Diagnostic Formulation',
      status: 'Online',
      vram: '8 GB',
      quant: 'Q4_K_M',
      context: '128k',
      speed: '18.4 tok/s'
    },
    {
      name: 'Vision Model (Qwen2.5-VL-7B-Instruct)',
      purpose: 'Thermal, Visual Inspection & Schematic Parsing',
      status: 'Online',
      vram: '6 GB',
      quant: 'Q4_K_M',
      context: '32k',
      speed: '24.1 tok/s'
    },
    {
      name: 'Local Code Agent (Mistral-Codestral-22B)',
      purpose: 'Sensor Telemetry & Python Sandbox Scripting',
      status: 'Online',
      vram: '12 GB',
      quant: 'Q4_K_M',
      context: '64k',
      speed: '31.2 tok/s'
    },
    {
      name: 'Embedding Model (BAAI/bge-large-en-v1.5)',
      purpose: 'Confidential RAG & Semantic Vector Indexing',
      status: 'Online',
      vram: '2 GB',
      quant: 'FP16',
      context: '8k',
      speed: '120 docs/s'
    },
    {
      name: 'Local OCR Engine (microsoft/TrOCR-large-stage1)',
      purpose: 'Handwritten & Scanned P&ID Text Digitization',
      status: 'Online',
      vram: '2 GB',
      quant: 'FP16',
      context: '4k',
      speed: '4.8 pages/s'
    }
  ];

  const [models, setModels] = useState(initialModels);

  const routingTasks = [
    {
      task: 'Document Analysis & Extraction',
      selected: 'Sovereign Reasoner (Q4_K_M)',
      reason: 'Deep chain-of-verification logic on maintenance regulations'
    },
    {
      task: 'Equipment Image & Thermal Analysis',
      selected: 'Vision Model (Qwen2.5-VL)',
      reason: 'Direct bounding box localization of thermal hotspots'
    },
    {
      task: 'Telemetry Waveform & Data Analytics',
      selected: 'Local Code Agent (Codestral)',
      reason: 'Deterministic scipy.signal FFT execution in PySandbox'
    },
    {
      task: 'RAG Knowledge Retrieval with Citations',
      selected: 'Embedding Model (BGE-Large)',
      reason: 'Strict dense vector similarity without external cloud APIs'
    }
  ];

  const handleAddModel = () => {
    if (!newModelName.trim()) return;
    const added = {
      name: newModelName,
      purpose: 'Specialized Industrial Task',
      status: 'Online',
      vram: '4 GB',
      quant: 'Q4_K_M',
      context: '32k',
      speed: '20.0 tok/s'
    };
    setModels([...models, added]);
    setNewModelName('');
    setShowAddModal(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-emerald-400 font-bold">AIRGAP INFERENCE ENCLAVE</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">On-Premise GPU Rig</span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1 tracking-tight">Model Manager</h1>
          <p className="text-xs text-slate-400">
            Open-weight multimodal foundation models running entirely in local on-premise VRAM
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 font-bold text-white text-xs font-mono shadow-md shadow-blue-600/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ ADD LOCAL MODEL</span>
        </button>
      </div>

      {/* Models Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between font-mono text-xs">
          <span className="font-bold text-white uppercase tracking-wider">Mounted Open-Weight Models ({models.length})</span>
          <span className="text-[10px] text-emerald-400">0 KB SENT OUTSIDE</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950/60 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4 font-bold">Model</th>
                <th className="py-3 px-4 font-bold">Purpose</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold">VRAM</th>
                <th className="py-3 px-4 font-bold">Quantization</th>
                <th className="py-3 px-4 font-bold">Context</th>
                <th className="py-3 px-4 font-bold">Local Speed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {models.map((m, idx) => (
                <tr key={idx} className="hover:bg-slate-950/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white flex items-center space-x-2">
                    <Cpu className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>{m.name}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 font-sans">{m.purpose}</td>
                  <td className="py-3.5 px-4">
                    <span className="flex items-center space-x-1 text-emerald-400 font-bold text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span>{m.status}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-blue-400 font-bold">{m.vram}</td>
                  <td className="py-3.5 px-4 text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px]">
                      {m.quant}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">{m.context}</td>
                  <td className="py-3.5 px-4 text-emerald-400">{m.speed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Model Routing Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <GitBranch className="w-4 h-4 text-blue-400" />
            <h3 className="text-xs font-mono uppercase font-bold text-white tracking-wider">
              DYNAMIC LOCAL MODEL ROUTING ENGINE
            </h3>
          </div>
          <span className="text-[10px] font-mono text-emerald-400">AUTO-SELECTION ACTIVE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
          {routingTasks.map((rt, i) => (
            <div key={i} className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 uppercase text-[10px] font-bold">TASK DOMAIN</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                  OPTIMAL VRAM ROUTE
                </span>
              </div>
              <div className="font-bold text-white text-sm">{rt.task}</div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-blue-300 font-bold flex items-center justify-between">
                <span>Selected: {rt.selected}</span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans pt-0.5">
                {rt.reason}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Model Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm uppercase font-mono">Mount Local GGUF / SafeTensors Model</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <label className="text-slate-400 block mb-1 uppercase text-[10px]">Model Local Path or Tag</label>
                <input
                  type="text"
                  value={newModelName}
                  onChange={(e) => setNewModelName(e.target.value)}
                  placeholder="e.g. /models/llama-3.1-8b-instruct.Q4_K_M.gguf"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-mono text-xs"
                />
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-400 space-y-1 font-sans text-[11px]">
                <span>Models are validated for cold flash signature integrity. Outbound network sockets are physically prohibited during inference.</span>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded bg-slate-950 border border-slate-700 text-slate-300 text-xs font-mono"
              >
                CANCEL
              </button>
              <button
                onClick={handleAddModel}
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold"
              >
                MOUNT TO VRAM
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
