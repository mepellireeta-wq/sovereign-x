import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Download, 
  Filter, 
  CheckCircle2, 
  ShieldCheck, 
  AlertTriangle,
  Lock,
  Layers,
  FileSpreadsheet
} from 'lucide-react';

export const AuditLogs: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterActor, setFilterActor] = useState('All');

  const logs = [
    {
      id: 1,
      time: '10:42:20',
      actor: 'Agent',
      action: 'Generate',
      resource: 'Maintenance_Approval_Note.docx',
      result: 'Success',
      sha: 'SHA256: 7f4a..19c2',
      ip: '127.0.0.1 (Local)'
    },
    {
      id: 2,
      time: '10:42:16',
      actor: 'Agent',
      action: 'Python Sandbox',
      resource: 'Sensor Analysis (scipy FFT)',
      result: 'Success',
      sha: 'SHA256: 9b20..31ad',
      ip: '127.0.0.1 (Sandbox)'
    },
    {
      id: 3,
      time: '10:42:07',
      actor: 'Agent',
      action: 'RAG Search',
      resource: 'Maintenance SOP — MRPL-042',
      result: 'Success',
      sha: 'SHA256: 3c11..bb89',
      ip: '127.0.0.1 (Milvus)'
    },
    {
      id: 4,
      time: '10:42:03',
      actor: 'Engineer',
      action: 'Upload',
      resource: 'Inspection_Report.pdf',
      result: 'Success',
      sha: 'SHA256: 4b21..c89a',
      ip: '10.14.0.4 (Node-04)'
    },
    {
      id: 5,
      time: '10:41:40',
      actor: 'System',
      action: 'Airgap Sweep',
      resource: 'WAN Netfilter Interface',
      result: 'Success',
      sha: 'SHA256: 1109..aef1',
      ip: 'Kernel PHY Relay'
    },
    {
      id: 6,
      time: '10:39:12',
      actor: 'Engineer',
      action: 'Auth Login',
      resource: 'Workstation Session TTY_0',
      result: 'Success',
      sha: 'SHA256: 89ee..543b',
      ip: '10.14.0.4 (Local)'
    }
  ];

  const filteredLogs = logs.filter(l => {
    const matchesActor = filterActor === 'All' || l.actor.toLowerCase() === filterActor.toLowerCase();
    const matchesSearch = l.resource.toLowerCase().includes(search.toLowerCase()) ||
                          l.action.toLowerCase().includes(search.toLowerCase());
    return matchesActor && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-emerald-400 font-bold">IMMUTABLE LOG CHAIN</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">ISO-55000 Audited</span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1 tracking-tight">Audit Logs</h1>
          <p className="text-xs text-slate-400">
            Cryptographically sealed and signed records of all actions, models, sandboxes, and file modifications
          </p>
        </div>

        <button className="flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono shadow-sm transition-all self-start sm:self-auto">
          <Download className="w-4 h-4" />
          <span>EXPORT CSV / JSON</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search actions, users, resources, hashes..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-sans"
          />
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          {['All', 'Engineer', 'Agent', 'System'].map((act) => (
            <button
              key={act}
              onClick={() => setFilterActor(act)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                filterActor === act
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {act}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4 font-bold">Timestamp</th>
                <th className="py-3 px-4 font-bold">Actor</th>
                <th className="py-3 px-4 font-bold">Action</th>
                <th className="py-3 px-4 font-bold">Resource</th>
                <th className="py-3 px-4 font-bold">Result</th>
                <th className="py-3 px-4 font-bold">Host / Enclave</th>
                <th className="py-3 px-4 font-bold">Cryptographic Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredLogs.map((l) => (
                <tr key={l.id} className="hover:bg-slate-950/50 transition-colors">
                  <td className="py-3.5 px-4 text-slate-400">{l.time}</td>
                  <td className="py-3.5 px-4 font-bold text-white">
                    <span className={`px-2 py-0.5 rounded text-[10px] border ${
                      l.actor === 'Agent'
                        ? 'bg-blue-950 text-blue-400 border-blue-800'
                        : l.actor === 'Engineer'
                        ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}>
                      {l.actor}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-200">{l.action}</td>
                  <td className="py-3.5 px-4 text-slate-300 font-sans">{l.resource}</td>
                  <td className="py-3.5 px-4">
                    <span className="flex items-center space-x-1 text-emerald-400 font-bold text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{l.result}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 text-[11px]">{l.ip}</td>
                  <td className="py-3.5 px-4 text-slate-500 text-[10px]">{l.sha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>CRYPTOGRAPHIC INTEGRITY: <strong className="text-emerald-400">100% VERIFIED</strong></span>
          </div>
          <span className="text-[10px] text-slate-500">TAMPER-PROOF LEDGER #04</span>
        </div>
      </div>
    </div>
  );
};
