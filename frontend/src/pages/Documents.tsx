import React, { useEffect, useState } from 'react';
import { FileText, Upload } from 'lucide-react';
import { fetchDocuments } from '../services/api';

export const Documents: React.FC = () => {
  const [docs, setDocs] = useState<any[]>([]);

  useEffect(() => {
    fetchDocuments().then(res => setDocs(res.documents || [])).catch(console.error);
  }, []);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Confidential Organizational Documents</h1>
        <button className="px-4 py-2 rounded bg-blue-600 font-bold text-white text-xs flex items-center space-x-2">
          <Upload className="w-4 h-4" />
          <span>Upload File</span>
        </button>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 font-mono uppercase">
            <tr>
              <th className="p-4">Filename</th>
              <th className="p-4">Category</th>
              <th className="p-4">Security Level</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {docs.map((d, i) => (
              <tr key={i} className="hover:bg-slate-950/50">
                <td className="p-4 font-bold text-white">{d.filename}</td>
                <td className="p-4 text-slate-300">{d.source}</td>
                <td className="p-4 font-bold text-emerald-400">MRPL STRICT ON-PREM</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
