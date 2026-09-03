import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  ShieldCheck, 
  Lock, 
  Server, 
  Database, 
  Users, 
  Radio, 
  CheckCircle2, 
  AlertTriangle,
  HardDrive,
  Cpu
} from 'lucide-react';

export const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('Network Policy');

  const sections = [
    'General',
    'Models',
    'Security',
    'Network Policy',
    'Storage',
    'Users & Roles',
    'System'
  ];

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto font-sans">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-emerald-400 font-bold">NODE #04 CONFIGURATION</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Airgap Enclave</span>
        </div>
        <h1 className="text-2xl font-black text-white mt-1 tracking-tight">System Settings</h1>
        <p className="text-xs text-slate-400">
          Hardware boundaries, local model execution policies, and cryptographic security configurations
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Navigation Sidebar */}
        <div className="w-full md:w-56 space-y-1 font-mono text-xs shrink-0">
          {sections.map((sec) => (
            <button
              key={sec}
              onClick={() => setActiveSection(sec)}
              className={`w-full text-left px-3 py-2.5 rounded-lg font-semibold transition-all ${
                activeSection === sec
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6 shadow-xl">
          {activeSection === 'Network Policy' && (
            <div className="space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white font-mono uppercase">Network Policy Configuration</h3>
                <p className="text-xs text-slate-400">Strict hardware and software boundary enforcement</p>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white block">Local Only Mode</span>
                    <span className="text-[11px] text-slate-400 font-sans">Physical and logical network loopback restriction</span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold text-[10px]">
                    ● ENABLED
                  </span>
                </div>

                <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white block">External Cloud AI APIs (OpenAI / Anthropic / Cohere)</span>
                    <span className="text-[11px] text-slate-400 font-sans">Strict DNS sinkhole and netfilter port drop</span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-rose-950 text-rose-400 border border-rose-800 font-bold text-[10px]">
                    BLOCKED
                  </span>
                </div>

                <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white block">External Internet WAN Access</span>
                    <span className="text-[11px] text-slate-400 font-sans">0.0.0.0/0 route removed from local routing table</span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-rose-950 text-rose-400 border border-rose-800 font-bold text-[10px]">
                    BLOCKED
                  </span>
                </div>

                <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white block">Local SCADA & Historian Read Interface</span>
                    <span className="text-[11px] text-slate-400 font-sans">Unidirectional optical data diode configuration</span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-blue-950 text-blue-400 border border-blue-800 font-bold text-[10px]">
                    READ-ONLY
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'Security' && (
            <div className="space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white font-mono uppercase">Cryptographic & Enclave Security</h3>
                <p className="text-xs text-slate-400">Tamper-proof storage and execution guarantees</p>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex justify-between text-white font-bold">
                    <span>Model Weights Checksum Validation</span>
                    <span className="text-emerald-400">PASS (SHA-256)</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans">
                    All GGUF foundation model binaries are validated against offline cryptographic signatures prior to GPU memory allocation.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex justify-between text-white font-bold">
                    <span>Python Sandbox Syscall Filter</span>
                    <span className="text-emerald-400">SECCOMP HARDENED</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans">
                    Socket, bind, connect, and fork system calls are strictly intercepted and terminated within the analytics sandbox.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection !== 'Network Policy' && activeSection !== 'Security' && (
            <div className="space-y-4 font-mono text-xs">
              <h3 className="text-sm font-bold text-white uppercase">{activeSection} Overview</h3>
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2 text-slate-300">
                <p>Node ID: <strong>Node-04</strong></p>
                <p>Target Deployment: <strong>Mangalore Refinery and Petrochemicals Limited (MRPL)</strong></p>
                <p>Hardware Host: <strong>2x NVIDIA RTX 6000 Ada (96GB Total VRAM)</strong></p>
                <p>Prototype Designation: <strong>Smart India Hackathon 2026 — SIH26117</strong></p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
