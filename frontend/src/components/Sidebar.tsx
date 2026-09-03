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
  Database,
  Lock,
  Layers,
  Server
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const sections = [
    {
      title: 'WORKSPACE',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: Activity },
        { id: 'workbench', label: 'AI Workbench', icon: Bot },
        { id: 'agent-runs', label: 'Agent Runs', icon: Cpu, badge: '1 ACTIVE' },
        { id: 'knowledge-base', label: 'Knowledge Base', icon: Database },
        { id: 'documents', label: 'Document Viewer', icon: FileText },
      ]
    },
    {
      title: 'INTELLIGENCE',
      items: [
        { id: 'models', label: 'Models', icon: Server, badge: '5 LOCAL' },
        { id: 'tools', label: 'Tools', icon: Terminal, badge: '7 READY' },
        { id: 'deliverables', label: 'Deliverables', icon: FileSpreadsheet },
      ]
    },
    {
      title: 'GOVERNANCE',
      items: [
        { id: 'approvals', label: 'Approvals', icon: CheckSquare, badge: '1 PENDING', badgeColor: 'amber' },
        { id: 'audit-logs', label: 'Audit Logs', icon: History },
        { id: 'sovereignty', label: 'Security', icon: ShieldCheck, badge: 'AIRGAP', badgeColor: 'emerald' },
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { id: 'settings', label: 'Settings', icon: Settings },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800/80 flex flex-col h-screen select-none shrink-0 font-sans z-20">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800/80 flex items-center space-x-3 bg-slate-950">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-600/20 border border-blue-400/20 shrink-0">
          <ShieldCheck className="w-5 h-5 text-white" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center space-x-1.5">
            <h1 className="font-black text-base text-white tracking-tight leading-none">SOVEREIGN-X</h1>
          </div>
          <p className="text-[10px] tracking-wider text-slate-400 font-mono mt-1 truncate">
            Private Industrial AI
          </p>
        </div>
      </div>

      {/* SIH Demo Mode Hero Button */}
      <div className="p-3 pb-1">
        <button
          onClick={() => setActiveTab('sih-demo')}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all border ${
            activeTab === 'sih-demo'
              ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/20'
              : 'bg-gradient-to-r from-emerald-950/70 to-slate-900 border-emerald-800/60 text-emerald-300 hover:border-emerald-600 hover:bg-emerald-900/40'
          }`}
        >
          <div className="flex items-center space-x-2.5 truncate">
            <PlayCircle className={`w-4 h-4 shrink-0 ${activeTab === 'sih-demo' ? 'text-white' : 'text-emerald-400 animate-pulse'}`} />
            <span className="truncate">SIH Demo Mode</span>
          </div>
          <span className="text-[9px] font-mono font-black uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            SIH26117
          </span>
        </button>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-4">
        {sections.map((sec) => (
          <div key={sec.title} className="space-y-1">
            <div className="px-2 text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase">
              {sec.title}
            </div>
            <div className="space-y-0.5">
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/20'
                        : 'text-slate-400 hover:bg-slate-900/80 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded border ${
                        item.badgeColor === 'amber'
                          ? 'bg-amber-950/80 text-amber-300 border-amber-800/60'
                          : item.badgeColor === 'emerald'
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer / System Online Badge */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950 text-[11px] space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-emerald-400 font-semibold font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Air-Gapped Sovereign Active</span>
          </div>
        </div>
        <div className="text-[10px] text-slate-500 font-mono flex items-center justify-between pt-0.5">
          <span>Cluster Node #04</span>
          <span className="text-slate-400">SYNTHETIC DEMO DATA</span>
        </div>
      </div>
    </aside>
  );
};
