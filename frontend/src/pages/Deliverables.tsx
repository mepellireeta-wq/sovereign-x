import React, { useEffect, useState } from 'react';
import { FileSpreadsheet, Download, FileText } from 'lucide-react';
import { fetchDeliverables } from '../services/api';

export const Deliverables: React.FC = () => {
  const [deliverables, setDeliverables] = useState<any[]>([]);

  useEffect(() => {
    fetchDeliverables().then(res => setDeliverables(res.deliverables || [])).catch(console.error);
  }, []);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Generated Deliverables Repository</h1>
        <span className="text-xs bg-slate-900 px-3 py-1 rounded border border-slate-800 text-slate-400">
          DOCX, XLSX, PPTX Artifacts
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {deliverables.map((d, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-blue-950 text-blue-400 flex items-center justify-center font-bold text-sm border border-blue-800">
                {d.file_type}
              </div>
              <div className="truncate flex-1">
                <h3 className="font-bold text-white text-xs truncate">{d.file_name}</h3>
                <p className="text-[10px] text-slate-400">Official MRPL Output Document</p>
              </div>
            </div>
            <a
              href={d.download_url}
              download
              className="w-full flex items-center justify-center space-x-2 py-2 rounded bg-blue-600 hover:bg-blue-500 font-bold text-white text-xs shadow"
            >
              <Download className="w-4 h-4" />
              <span>Download Deliverable</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
