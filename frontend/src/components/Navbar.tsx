import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Search, 
  Bell, 
  UserCheck, 
  Server, 
  AlertCircle,
  CheckCircle2,
  X
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const formatTitle = (tab: string) => {
    switch (tab) {
      case 'dashboard': return 'Operational Dashboard';
      case 'workbench': return 'AI Engineering Workbench';
      case 'agent-runs': return 'Agent Runs & Execution Trace';
      case 'knowledge-base': return 'Knowledge Base & Vector Index';
      case 'documents': return 'Document Viewer & Inspection Analysis';
      case 'models': return 'Local Model Manager';
      case 'tools': return 'Tool Suite Registry';
      case 'deliverables': return 'Generated Deliverables (DOCX / XLSX)';
      case 'approvals': return 'Human-in-the-Loop Approvals';
      case 'audit-logs': return 'Cryptographic Audit Trail';
      case 'sovereignty': return 'Sovereignty & Air-Gap Monitor';
      case 'settings': return 'System Configuration';
      case 'sih-demo': return 'SIH26117 Hackathon Presentation Mode';
      default: return 'Workbench';
    }
  };

  return (
    <header className="h-16 bg-slate-950/90 border-b border-slate-800/80 px-6 flex items-center justify-between z-10 shrink-0 backdrop-blur font-sans">
      {/* Page Title & Breadcrumbs */}
      <div className="flex items-center space-x-3 min-w-0">
        <h2 className="text-sm font-bold text-white tracking-tight truncate uppercase font-mono">
          {formatTitle(activeTab)}
        </h2>
        <span className="hidden lg:inline-flex text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800/40">
          MRPL REFINERY · CDU UNIT
        </span>
      </div>

      {/* Center Global Search */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents, equipment, procedures, agents..."
            className="w-full bg-slate-900/90 border border-slate-800 rounded-lg pl-9 pr-14 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/80 font-sans"
          />
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
            Ctrl+K
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3">
        {/* Airgap / Local Only Badge */}
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-950/70 border border-emerald-800/70 text-xs font-mono font-bold text-emerald-400 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span>LOCAL ONLY</span>
        </div>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all relative"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 bg-amber-500 rounded-full absolute top-1.5 right-1.5"></span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-4 space-y-3 z-50">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-white uppercase font-mono">System Notifications</span>
                <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1">
                  <div className="flex items-center space-x-1.5 text-amber-400 font-bold text-[11px]">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Human Approval Required</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    Pump P-102 maintenance recommendation awaiting engineer sign-off.
                  </p>
                  <span className="text-[9px] text-slate-500 font-mono">2 mins ago · Node #04</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1">
                  <div className="flex items-center space-x-1.5 text-emerald-400 font-bold text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Zero-Egress Netfilter Sweep</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    All outbound ports verified closed. 0 external calls initiated.
                  </p>
                  <span className="text-[9px] text-slate-500 font-mono">14 mins ago · Kernel Filter</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-2.5 pl-3 border-l border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center font-bold text-white text-xs shadow-md shadow-blue-500/10">
            RS
          </div>
          <div className="hidden sm:block text-left">
            <span className="font-bold text-white text-xs block leading-tight">R. Sharma</span>
            <span className="text-[10px] text-slate-400 font-mono block">Senior Plant Engineer</span>
          </div>
        </div>
      </div>
    </header>
  );
};
