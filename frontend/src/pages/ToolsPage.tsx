import React, { useState } from 'react';
import { 
  Wrench, 
  FileText, 
  Database, 
  Code, 
  FileSpreadsheet, 
  ShieldCheck, 
  Search,
  CheckCircle2,
  Terminal,
  Layers
} from 'lucide-react';

export const ToolsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Documents', 'Knowledge', 'Data', 'Code', 'Generation', 'System'];

  const tools = [
    { name: 'PDF Parser', category: 'Documents', description: 'Extracts formatted text, table structures, and metadata from industrial PDF manuals.', permission: 'Read-Only', status: 'Available' },
    { name: 'OCR Engine', category: 'Documents', description: 'Local optical character recognition for scanned reports, physical logbooks, and drawing labels.', permission: 'Read-Only', status: 'Available' },
    { name: 'Semantic Search', category: 'Knowledge', description: 'Cosine vector retrieval across local industrial knowledge base embeddings.', permission: 'Read-Only', status: 'Available' },
    { name: 'Tabular Telemetry Reader', category: 'Data', description: 'Reads sensor CSV time-series data, detects numeric anomalies, and computes descriptive statistics.', permission: 'Read-Only', status: 'Available' },
    { name: 'Python Sandbox', category: 'Code', description: 'Restricted execution sandbox with AST static inspection, time limits, and zero outbound network access.', permission: 'Isolated Exec', status: 'Available' },
    { name: 'DOCX Generator', category: 'Generation', description: 'Synthesizes official Microsoft Word Maintenance Approval Notes with audit metadata.', permission: 'Write File', status: 'Available' },
    { name: 'XLSX Generator', category: 'Generation', description: 'Builds multi-tab Excel workbooks with ISO-10816 conditional formatting and telemetry plots.', permission: 'Write File', status: 'Available' },
    { name: 'PPTX Generator', category: 'Generation', description: 'Generates executive PowerPoint briefing slide decks with embedded findings and charts.', permission: 'Write File', status: 'Available' },
    { name: 'Zero-Egress Network Guard', category: 'System', description: 'Kernel and runtime socket interceptor enforcing complete local airgap protection.', permission: 'System Core', status: 'Available' },
  ];

  const filteredTools = tools.filter(t => 
    activeCategory === 'All' || t.category === activeCategory
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Tool Registry</h1>
          <p className="text-xs text-slate-400 mt-0.5">Isolated capabilities callable by local multi-step AI agents</p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded border border-emerald-800">
            9 TOOLS MOUNTED & RESTRICTED
          </span>
        </div>
      </div>

      {/* Categories Filter Bar */}
      <div className="flex items-center space-x-1 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`px-3 py-1.5 rounded text-xs font-medium font-sans whitespace-nowrap transition-colors ${
              activeCategory === c
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'bg-[#121A2A] text-slate-400 hover:text-slate-200 border border-[#1E293B]'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map((tool, idx) => (
          <div key={idx} className="bg-[#0E1624] border border-[#1E293B] rounded-xl p-5 shadow-sm space-y-3 flex flex-col justify-between hover:border-blue-900/80 transition-colors">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white tracking-tight">{tool.name}</h3>
                <span className="inline-flex items-center space-x-1.5 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>● {tool.status}</span>
                </span>
              </div>
              <div className="text-[10px] text-blue-400 font-mono mt-0.5 uppercase tracking-wider">{tool.category}</div>
              <p className="text-xs text-slate-400 leading-relaxed mt-2.5">
                {tool.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[#1E293B] flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500 text-[11px]">Permission:</span>
              <span className="text-slate-300 font-semibold bg-[#0A0E17] px-2 py-0.5 rounded border border-[#1E293B]">
                {tool.permission}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
