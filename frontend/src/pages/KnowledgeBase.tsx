import React, { useEffect, useState } from 'react';
import { Database, FileText } from 'lucide-react';
import { fetchDocuments } from '../services/api';

export const KnowledgeBase: React.FC = () => {
  const [docs, setDocs] = useState<any[]>([]);

  useEffect(() => {
    fetchDocuments().then(res => setDocs(res.documents || [])).catch(console.error);
  }, []);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-xl font-bold text-white">Local RAG Knowledge Base</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {docs.map((d, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Database className="w-5 h-5 text-blue-400" />
              <div>
                <h3 className="font-bold text-white text-xs">{d.filename}</h3>
                <p className="text-[10px] text-slate-400">{d.source}</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
              INDEXED
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
