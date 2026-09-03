import React from 'react';
import { ShieldCheck, Lock, Activity } from 'lucide-react';

interface NavbarProps {
  title?: string;
  subtitle?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  title = "SOVEREIGN-X", 
  subtitle = "PRIVATE INDUSTRIAL AI" 
}) => {
  return (
    <header className="bg-slate-950 border-b border-slate-800/80 px-4 py-2.5 flex items-center justify-between font-sans">
      {/* Brand Header */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-blue-950 border border-blue-600/50 flex items-center justify-center text-blue-400 shadow-lg shadow-blue-900/30">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-black text-sm text-white tracking-wider font-mono">{title}</h1>
            <span className="text-[10px] text-slate-400 uppercase font-mono tracking-widest">DASHBOARD</span>
          </div>
          <p className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold">{subtitle}</p>
        </div>
      </div>

      {/* Center & Right Badges */}
      <div className="flex items-center space-x-3">
        <div className="px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold font-mono flex items-center space-x-1.5 shadow-sm">
          <Lock className="w-3 h-3 text-emerald-400" />
          <span>LOCAL ONLY</span>
        </div>

        <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center text-xs font-bold text-slate-300">
          <span className="w-full h-full bg-slate-700 flex items-center justify-center">RE</span>
        </div>
      </div>
    </header>
  );
};
