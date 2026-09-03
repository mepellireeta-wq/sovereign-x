import React, { useState } from 'react';
import { 
  Terminal, 
  FileText, 
  Database, 
  Code, 
  FileSpreadsheet, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  Layers, 
  Cpu,
  Search,
  Filter
} from 'lucide-react';

export const ToolsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const tools = [
    {
      id: 1,
      name: 'PDF & Scanned Doc Parser',
      category: 'Documents',
      icon: FileText,
      desc: 'Local Poppler & pdfminer engine extracting text, metadata, and structural tables without external OCR APIs.',
      permission: 'Read-Only / Local Sandbox',
      status: 'Available',
      invocations: 1420
    },
    {
      id: 2,
      name: 'On-Premise OCR Engine',
      category: 'Documents',
      icon: Layers,
      desc: 'Local TrOCR deep learning model converting scanned P&IDs, handwritten inspection stamps, and notes into plain text.',
      permission: 'Inference Only / Zero Egress',
      status: 'Available',
      invocations: 890
    },
    {
      id: 3,
      name: 'Semantic Vector Search',
      category: 'Knowledge',
      icon: Database,
      desc: 'Air-gapped Milvus & Chroma vector retrieval querying local refinery standard operating procedures (SOPs).',
      permission: 'Role-Based Read',
      status: 'Available',
      invocations: 3412
    },
    {
      id: 4,
      name: 'Isolated Python Analytics Sandbox',
      category: 'Code',
      icon: Code,
      desc: 'Isolated sub-process sandbox executing numpy, pandas, and scipy telemetry analytics with zero outbound socket access.',
      permission: 'Memory Capped (512MB) / Airgap',
      status: 'Available',
      invocations: 512
    },
    {
      id: 5,
      name: 'DOCX Approval Note Generator',
      category: 'Generation',
      icon: FileText,
      desc: 'Synthesizes official Microsoft Word (.docx) maintenance approval notes with cryptographic watermarks and signatures.',
      permission: 'Write to /data/deliverables',
      status: 'Available',
      invocations: 142
    },
    {
      id: 6,
      name: 'XLSX Telemetry Workbook Generator',
      category: 'Generation',
      icon: FileSpreadsheet,
      desc: 'Generates ISO 10816 compliant multi-tab Excel spreadsheets with conditional color-coded vibration alert thresholds.',
      permission: 'Write to /data/deliverables',
      status: 'Available',
      invocations: 180
    },
    {
      id: 7,
      name: 'Zero-Egress Kernel Interceptor',
      category: 'System',
      icon: ShieldCheck,
      desc: 'Kernel packet filter dropping all TCP/UDP connections destined for WAN / Public IP ranges (0.0.0.0/0).',
      permission: 'Root / Hardware Bound',
      status: 'Available',
      invocations: 12840
    }
  ];

  const filteredTools = selectedCategory === 'All'
    ? tools
    : tools.filter(t => t.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-emerald-400 font-bold">AIRGAP EXECUTION SUITE</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Strict Subprocess Jails</span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1 tracking-tight">Tool Registry</h1>
          <p className="text-xs text-slate-400">
            Certified deterministic tools and sandboxes available for autonomous industrial agent execution
          </p>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs text-emerald-400 bg-slate-950 px-3 py-2 rounded-lg border border-slate-800">
          <Lock className="w-4 h-4 text-emerald-400" />
          <span>7/7 TOOLS CERTIFIED AIR-GAP COMPLIANT</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {['All', 'Documents', 'Knowledge', 'Data', 'Code', 'Generation', 'System'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tool Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map((t) => {
          const Icon = t.icon;
          return (
            <div key={t.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-blue-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-800/60 text-emerald-400 text-[10px] font-mono font-bold flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>{t.status}</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white font-mono">{t.name}</h3>
                  <span className="text-[10px] text-blue-400 font-mono uppercase block mt-0.5">{t.category}</span>
                </div>

                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {t.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 space-y-1.5 font-mono text-[10px]">
                <div className="flex justify-between text-slate-400">
                  <span>PERMISSION:</span>
                  <span className="text-slate-200">{t.permission}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>INVOCATIONS:</span>
                  <span className="text-emerald-400 font-bold">{t.invocations.toLocaleString()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
