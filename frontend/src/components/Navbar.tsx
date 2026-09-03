import React from 'react';
import { Search, Bell, ShieldCheck, User } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab }) => {
  const getPageTitle = (tab: string) => {
    switch (tab) {
      case 'dashboard': return 'Operational Dashboard';
      case 'workbench': return 'AI Workbench';
      case 'agent-runs': return 'Agent Runs';
      case 'knowledge-base': return 'Knowledge Base';
      case 'documents': return 'Document Viewer';
      case 'models': return 'Model Manager';
      case 'tools': return 'Tool Registry';
      case 'deliverables': return 'Generated Deliverables';
      case 'approvals': return 'Approvals & Human Review';
      case 'audit-logs': return 'Audit Logs';
      case 'security':
      case 'sovereignty': return 'Sovereignty Monitor';
      case 'settings': return 'System Settings';
      case 'sih-demo': return 'SIH 2026 Guided Demonstration';
      default: return 'Workbench';
    }
  };

  return (
    <header className="h-14 bg-[#0D131F] border-b border-[#1E293B] px-6 flex items-center justify-between shrink-0 select-none">
      {/* Current Page Title */}
      <div className="flex items-center space-x-3">
        <h2 className="text-sm font-semibold text-slate-100 font-sans tracking-tight">
          {getPageTitle(activeTab)}
        </h2>
        <span className="hidden sm:inline-block text-[10px] text-slate-500 font-mono">
          SIH26117 · MRPL Mangalore
        </span>
      </div>

      {/* Center Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search documents, equipment, agents…"
            className="w-full bg-[#131B2A] border border-[#1E293B] rounded-md pl-9 pr-8 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 font-sans"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] font-mono text-slate-500 bg-[#0A0E17] px-1.5 py-0.5 rounded border border-[#1E293B]">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button 
          title="Notifications"
          className="relative p-1.5 text-slate-400 hover:text-slate-200 hover:bg-[#162032] rounded transition-colors"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
        </button>

        {/* Security Status Badge: ● LOCAL ONLY */}
        <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#0A1A17] border border-emerald-900/60 text-[11px] font-medium text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-mono font-semibold tracking-wide">LOCAL ONLY</span>
        </div>

        {/* User Profile: Engineer */}
        <div className="flex items-center space-x-2 pl-3 border-l border-[#1E293B]">
          <div className="w-7 h-7 rounded bg-[#1A2538] border border-[#2D3D58] flex items-center justify-center text-slate-200">
            <User className="w-3.5 h-3.5 text-slate-300" />
          </div>
          <div className="text-left hidden lg:block leading-tight">
            <div className="text-xs font-semibold text-slate-200">Engineer</div>
            <div className="text-[10px] text-slate-500 font-mono">Er. K. Sharma (MRPL)</div>
          </div>
        </div>
      </div>
    </header>
  );
};
