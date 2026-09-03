import React from 'react';
import { 
  ShieldCheck, 
  Bot, 
  Cpu, 
  FileText, 
  Terminal, 
  CheckSquare, 
  FileSpreadsheet, 
  History, 
  Activity, 
  PlayCircle,
  Settings,
  Database
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'sih-demo', label: 'SIH Demo Mode', icon: PlayCircle, highlight: true },
    { id: 'dashboard', label: 'Executive Dashboard', icon: Activity },
    { id: 'workbench', label: 'AI Workbench', icon: Bot },
    { id: 'agent-runs', label: 'Agent Runs & Plans', icon: Cpu },
    { id: 'knowledge-base', label: 'RAG Knowledge Base', icon: Database },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'models', label: 'Model Manager', icon: Cpu },
    { id: 'tools', label: 'Local Tool Suite', icon: Terminal },
    { id: 'deliverables', label: 'Deliverables (DOCX/XLSX)', icon: FileSpreadsheet },
    { id: 'audit-logs', label: 'Audit Trail', icon: History },
    { id: 'sovereignty', label: 'Sovereignty Monitor', icon: ShieldCheck, badge: 'AIRGAP' },
  ];

  return (
    <div className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col h-screen select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center space-x-3">
        <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-extrabold text-lg text-white tracking-tight">SOVEREIGN-X</h1>
          <p className="text-[10px] uppercase tracking-wider text-blue-400 font-semibold">MRPL Industrial AI</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : item.highlight
                  ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50 hover:bg-emerald-900/60'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer / Status */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/80">
        <div className="flex items-center space-x-2 text-[11px] text-emerald-400 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Air-Gapped Sovereign Active</span>
        </div>
      </div>
    </div>
  );
};
