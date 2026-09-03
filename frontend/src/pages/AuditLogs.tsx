import React, { useEffect, useState } from 'react';
import { History, ShieldCheck } from 'lucide-react';
import { fetchAuditLogs } from '../services/api';

export const AuditLogs: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    fetchAuditLogs().then(res => setLogs(res.audit_logs || [])).catch(console.error);
  }, []);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-xl font-bold text-white">Immutable Governance & Audit Trail</h1>
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 font-mono uppercase">
            <tr>
              <th className="p-4">Timestamp</th>
              <th className="p-4">User / System</th>
              <th className="p-4">Action Event</th>
              <th className="p-4">Resource Target</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-950/50">
                <td className="p-4 font-mono text-slate-400">{log.timestamp}</td>
                <td className="p-4 font-bold text-white">{log.user}</td>
                <td className="p-4 text-blue-300 font-mono">{log.action}</td>
                <td className="p-4 text-slate-300">{log.resource}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
