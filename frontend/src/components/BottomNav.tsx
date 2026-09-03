import React from 'react';
import { LayoutGrid, Cpu, GitMerge, ShieldCheck, CheckSquare } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'status', label: 'STATUS', icon: LayoutGrid },
    { id: 'workbench', label: 'WORKBENCH', icon: Cpu },
    { id: 'runs', label: 'RUNS', icon: GitMerge },
    { id: 'security', label: 'SECURITY', icon: ShieldCheck },
    { id: 'approvals', label: 'APPROVALS', icon: CheckSquare },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 px-2 py-1.5 flex flex-col font-mono text-[10px]">
      {/* Top Status Bar */}
      <div className="flex items-center justify-between px-3 py-1 border-b border-slate-900 text-[9px] text-slate-400">
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>System Online • Air-Gapped Cluster Node #04</span>
        </div>
        <span className="text-slate-500 uppercase font-mono">SYNTHETIC DEMO DATA</span>
      </div>

      {/* 5 Bottom Nav Buttons */}
      <div className="grid grid-cols-5 gap-1 pt-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 rounded transition-all ${
                isActive
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
              <span className="tracking-widest text-[9px]">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </footer>
  );
};
