import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Download, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  Calendar,
  Layers,
  FileText
} from 'lucide-react';

export const AuditLogs: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState('All');
  const [selectedLog, setSelectedLog] = useState<any>(null);

  const logs = [
    { timestamp: '10:42:20', actor: 'Agent', action: 'Generate', resource: 'Approval Note (DOCX)', result: 'Success', details: 'Generated official Maintenance Approval Note with cryptographic hash and equipment metadata.' },
    { timestamp: '10:42:16', actor: 'Agent', action: 'Python Sandbox', resource: 'Sensor Analysis', result: 'Success', details: 'Executed AST-validated numpy/pandas script. 128 telemetry records calculated with peak vibration 6.8 mm/s.' },
    { timestamp: '10:42:08', actor: 'System', action: 'Network Block', resource: 'api.openai.com', result: 'Blocked', details: 'Outbound TCP connection blocked by Zero-Egress network guard policy.' },
    { timestamp: '10:42:07', actor: 'Agent', action: 'RAG Search', resource: 'Maintenance SOP', result: 'Success', details: 'Retrieved MRPL-SOP-MECH-042 Page 24 vibration threshold passages via cosine similarity.' },
    { timestamp: '10:42:03', actor: 'Engineer', action: 'Upload', resource: 'Inspection_Report.pdf', result: 'Success', details: 'Ingested 12-page scanned physical inspection document for equipment 02-P-102B.' },
    { timestamp: '10:41:50', actor: 'Engineer', action: 'Login', resource: 'Workstation Session', result: 'Success', details: 'Authenticated via local JWT with role Engineer.' },
  ];

  const filteredLogs = logs.filter(l => {
    const matchesSearch = l.action.toLowerCase().includes(search.toLowerCase()) ||
                          l.resource.toLowerCase().includes(search.toLowerCase()) ||
                          l.actor.toLowerCase().includes(search.toLowerCase());
    const matchesUser = selectedUser === 'All' || l.actor === selectedUser;
    return matchesSearch && matchesUser;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Audit Logs</h1>
          <p className="text-xs text-slate-400 mt-0.5">Immutable on-premise activity record for compliance & governance</p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#131B2A] hover:bg-[#1A2538] border border-[#1E293B] text-slate-300 hover:text-white text-xs font-medium transition-colors">
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-[#0E1624] border border-[#1E293B] rounded-xl p-4 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search actions, users, resources…"
              className="w-full bg-[#0A0E17] border border-[#1E293B] rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-sans"
            />
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-500 font-medium">Actor:</span>
            {['All', 'Engineer', 'Agent', 'System'].map((act) => (
              <button
                key={act}
                onClick={() => setSelectedUser(act)}
                className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                  selectedUser === act
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-[#121A2A] text-slate-400 hover:text-slate-200 border border-[#1E293B]'
                }`}
              >
                {act}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Audit Table */}
      <div className="bg-[#0E1624] border border-[#1E293B] rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead>
              <tr className="border-b border-[#1E293B] bg-[#0A0E17] text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">Timestamp</th>
                <th className="py-3 px-4 font-semibold">Actor</th>
                <th className="py-3 px-4 font-semibold">Action</th>
                <th className="py-3 px-4 font-semibold">Resource</th>
                <th className="py-3 px-4 font-semibold">Result</th>
                <th className="py-3 px-4 font-semibold text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B]/50 font-sans">
              {filteredLogs.map((log, idx) => (
                <tr key={idx} className="hover:bg-[#131D2E] transition-colors">
                  <td className="py-3 px-4 font-mono text-slate-400">{log.timestamp}</td>
                  <td className="py-3 px-4 font-semibold text-slate-200 font-mono">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${
                      log.actor === 'Agent' ? 'bg-blue-950 text-blue-300 border border-blue-800' :
                      log.actor === 'System' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                      'bg-slate-800 text-slate-200 border border-slate-700'
                    }`}>
                      {log.actor}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-100">{log.action}</td>
                  <td className="py-3 px-4 font-mono text-slate-300">{log.resource}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center space-x-1 text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                      log.result === 'Success'
                        ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-900/50'
                        : 'text-amber-400 bg-amber-950/40 border border-amber-900/50'
                    }`}>
                      <span>● {log.result}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button 
                      onClick={() => setSelectedLog(log)}
                      className="text-xs text-blue-400 hover:text-blue-300 font-medium"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-[#0E1624] border border-[#1E293B] rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
              <h3 className="text-sm font-bold text-white font-mono">Audit Event Details</h3>
              <button 
                onClick={() => setSelectedLog(null)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 bg-[#0A0E17] p-3 rounded border border-[#1E293B] font-mono">
                <div><span className="text-slate-500">Timestamp:</span> {selectedLog.timestamp}</div>
                <div><span className="text-slate-500">Actor:</span> {selectedLog.actor}</div>
                <div><span className="text-slate-500">Action:</span> {selectedLog.action}</div>
                <div><span className="text-slate-500">Result:</span> {selectedLog.result}</div>
              </div>

              <div>
                <div className="text-slate-400 font-semibold mb-1">Resource:</div>
                <div className="bg-[#0A0E17] p-2 rounded border border-[#1E293B] font-mono text-slate-200">
                  {selectedLog.resource}
                </div>
              </div>

              <div>
                <div className="text-slate-400 font-semibold mb-1">Full Trace Details:</div>
                <p className="bg-[#0A0E17] p-3 rounded border border-[#1E293B] text-slate-300 leading-relaxed font-sans">
                  {selectedLog.details}
                </p>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button 
                onClick={() => setSelectedLog(null)}
                className="px-4 py-1.5 rounded bg-[#131B2A] hover:bg-[#1A2538] text-slate-200 text-xs font-semibold border border-[#1E293B]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
