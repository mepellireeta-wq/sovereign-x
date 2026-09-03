import React from 'react';
import { 
  LayoutDashboard,
  Bot, 
  Cpu, 
  FileText, 
  Wrench, 
  CheckSquare, 
  FileSpreadsheet, 
  History, 
  ShieldCheck, 
  Settings,
  Database,
  PlayCircle
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
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'workbench', label: 'AI Workbench', icon: Bot },
        { id: 'agent-runs', label: 'Agent Runs', icon: Cpu },
        { id: 'knowledge-base', label: 'Knowledge Base', icon: Database },
        { id: 'documents', label: 'Documents', icon: FileText },
      ]
    },
    {
      title: 'INTELLIGENCE',
      items: [
        { id: 'models', label: 'Models', icon: Cpu },
        { id: 'tools', label: 'Tools', icon: Wrench },
        { id: 'deliverables', label: 'Deliverables', icon: FileSpreadsheet },
      ]
    },
    {
      title: 'GOVERNANCE',
      items: [
        { id: 'approvals', label: 'Approvals', icon: CheckSquare, badge: '1' },
        { id: 'audit-logs', label: 'Audit Logs', icon: History },
        { id: 'security', label: 'Security', icon: ShieldCheck, badge: 'SAFE' },
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
    <aside className="w-64 bg-[#0A0E17] border-r border-[#1E293B] flex flex-col h-screen select-none shrink-0">
      {/* Brand Header */}
      <div className="px-5 py-4 border-b border-[#1E293B] flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded bg-blue-600/90 flex items-center justify-center font-bold text-white shadow-sm">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-wide text-white font-sans">SOVEREIGN-X</h1>
            <p className="text-[11px] text-slate-400 font-medium">Private Industrial AI</p>
          </div>
        </div>
      </div>

      {/* SIH Hackathon Demo Quick Launch Banner */}
      <div className="px-3 pt-3 pb-1">
        <button
          onClick={() => setActiveTab('sih-demo')}
          className={`w-full flex items-center justify-between px-3 py-2 rounded border text-xs font-semibold transition-colors ${
            activeTab === 'sih-demo'
              ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
              : 'bg-[#121A2A] text-blue-300 border-blue-900/60 hover:bg-blue-950/60'
          }`}
        >
          <div className="flex items-center space-x-2">
            <PlayCircle className="w-4 h-4 text-blue-400" />
            <span>SIH26117 Demo Mode</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono">
            GUIDED
          </span>
        </button>
      </div>

      {/* Categorized Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-4">
        {sections.map((sec) => (
          <div key={sec.title} className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-bold text-slate-500 tracking-wider font-mono uppercase">
              {sec.title}
            </div>
            {sec.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#1E293B] text-white border-l-2 border-blue-500 font-semibold'
                      : 'text-slate-400 hover:bg-[#131D2E] hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-1.5 py-0.2 text-[9px] font-mono font-bold rounded ${
                      item.badge === 'SAFE'
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                        : 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom Status Row */}
      <div className="px-4 py-3 border-t border-[#1E293B] bg-[#080B12]">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-[11px] font-medium text-slate-300">System Online</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">v2.4-LOCAL</span>
        </div>
      </div>
    </aside>
  );
};
