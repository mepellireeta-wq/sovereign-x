import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  ShieldCheck, 
  WifiOff, 
  HardDrive, 
  Users, 
  Cpu, 
  Server,
  Lock,
  CheckCircle2,
  Check
} from 'lucide-react';

export const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('Network');

  const sections = [
    { id: 'General', icon: SettingsIcon },
    { id: 'Models', icon: Cpu },
    { id: 'Security', icon: ShieldCheck },
    { id: 'Network', icon: WifiOff },
    { id: 'Storage', icon: HardDrive },
    { id: 'Users & Roles', icon: Users },
    { id: 'System', icon: Server },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">System Settings</h1>
        <p className="text-xs text-slate-400 mt-0.5">Platform configuration, security policies, and air-gap network guard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Navigation Tabs (3 cols) */}
        <div className="md:col-span-3 space-y-1 bg-[#0E1624] border border-[#1E293B] rounded-xl p-3 h-fit">
          {sections.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:bg-[#131D2E] hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{sec.id}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area (9 cols) */}
        <div className="md:col-span-9 space-y-6">
          {activeSection === 'Network' && (
            <div className="space-y-6">
              {/* Network Policy Card */}
              <div className="bg-[#0E1624] border border-[#1E293B] rounded-xl p-5 shadow-sm space-y-4">
                <div className="border-b border-[#1E293B] pb-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <WifiOff className="w-4 h-4 text-emerald-400" />
                    <h2 className="text-sm font-bold text-white">Network Policy</h2>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                    AIRGAP ACTIVE
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="bg-[#0A0E17] border border-[#1E293B] rounded-lg p-3.5 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Local Only Enforcement</div>
                      <div className="text-[11px] text-slate-400">All outbound network traffic blocked at Python socket layer</div>
                    </div>
                    <span className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span>● Enabled</span>
                    </span>
                  </div>

                  <div className="bg-[#0A0E17] border border-[#1E293B] rounded-lg p-3.5 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">External AI APIs</div>
                      <div className="text-[11px] text-slate-400">api.openai.com, api.anthropic.com, generativelanguage.googleapis.com</div>
                    </div>
                    <span className="text-xs font-mono font-bold text-rose-400 bg-rose-950/60 px-2.5 py-1 rounded border border-rose-800">
                      Blocked
                    </span>
                  </div>

                  <div className="bg-[#0A0E17] border border-[#1E293B] rounded-lg p-3.5 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">External Network</div>
                      <div className="text-[11px] text-slate-400">Non-RFC1918 public IP addresses & unverified DNS lookups</div>
                    </div>
                    <span className="text-xs font-mono font-bold text-rose-400 bg-rose-950/60 px-2.5 py-1 rounded border border-rose-800">
                      Blocked
                    </span>
                  </div>
                </div>
              </div>

              {/* Endpoint Whitelist */}
              <div className="bg-[#0E1624] border border-[#1E293B] rounded-xl p-5 shadow-sm space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Permitted Local Interfaces
                </h3>
                <div className="space-y-2 text-xs font-mono text-slate-300">
                  <div className="p-2.5 bg-[#0A0E17] rounded border border-[#1E293B] flex justify-between items-center">
                    <span>localhost (127.0.0.1)</span>
                    <span className="text-emerald-400 font-bold">ALLOWED</span>
                  </div>
                  <div className="p-2.5 bg-[#0A0E17] rounded border border-[#1E293B] flex justify-between items-center">
                    <span>Ollama LLM Serving (127.0.0.1:11434)</span>
                    <span className="text-emerald-400 font-bold">ALLOWED</span>
                  </div>
                  <div className="p-2.5 bg-[#0A0E17] rounded border border-[#1E293B] flex justify-between items-center">
                    <span>Internal Plant LAN Subnet (192.168.1.0/24)</span>
                    <span className="text-blue-400 font-bold">RESTRICTED</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection !== 'Network' && (
            <div className="bg-[#0E1624] border border-[#1E293B] rounded-xl p-6 shadow-sm space-y-4">
              <h2 className="text-sm font-bold text-white">{activeSection} Configuration</h2>
              <p className="text-xs text-slate-400">
                Enterprise parameters for {activeSection.toLowerCase()} configured per MRPL industrial IT standards.
              </p>
              <div className="bg-[#0A0E17] p-4 rounded border border-[#1E293B] text-xs font-mono text-slate-300">
                Status: Verified compliant with ISO/IEC 27001 industrial air-gap specifications.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
