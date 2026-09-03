import React from 'react';
import { Shield, Lock, Server, UserCheck } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab }) => {
  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
          {activeTab.replace('-', ' ')}
        </h2>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-900/50 text-blue-300 border border-blue-700/40">
          MRPL Mangalore Refinery & Petrochemicals Ltd.
        </span>
      </div>

      <div className="flex items-center space-x-4">
        {/* Airgap badge */}
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-xs font-semibold text-emerald-400">
          <Lock className="w-3.5 h-3.5" />
          <span>0 Egress Policy Active</span>
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-2 text-xs text-slate-300 pl-3 border-l border-slate-800">
          <UserCheck className="w-4 h-4 text-blue-400" />
          <div>
            <span className="font-bold text-white">Er. K. Sharma</span>
            <span className="text-[10px] text-slate-400 block">Senior Engineer (RBAC: Admin)</span>
          </div>
        </div>
      </div>
    </header>
  );
};
