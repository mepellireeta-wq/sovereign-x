import React, { useState } from 'react';
import { 
  Send, 
  Paperclip, 
  Database, 
  Wrench, 
  Cpu, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink,
  Bot,
  User,
  Sparkles,
  Layers,
  ChevronRight,
  Eye,
  Check
} from 'lucide-react';

export const AIWorkbench: React.FC = () => {
  const [prompt, setPrompt] = useState('Analyze the inspection report and determine whether maintenance is required.');
  const [selectedModel, setSelectedModel] = useState('Sovereign Reasoning Model (Qwen2.5-72B)');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedCitation, setSelectedCitation] = useState<string | null>(null);

  const messages = [
    {
      id: 1,
      sender: 'user',
      text: 'Analyze the inspection report and determine whether maintenance is required.',
      timestamp: '10:41 AM'
    },
    {
      id: 2,
      sender: 'agent',
      model: 'Sovereign Reasoning Model',
      agentRole: 'Industrial Analysis Agent',
      timestamp: '10:42 AM',
      text: `I reviewed the inspection report, equipment image, sensor data, and relevant maintenance procedure.

I found three relevant indicators:

• Abnormal vibration (6.8 mm/s peak vs ISO limit 4.5 mm/s)
• Bearing wear (surface fatigue detected at NDE collar)
• Increased temperature (localized elevation to 88°C)

The available maintenance procedure supports a maintenance review.

I recommend sending the equipment for maintenance inspection.`,
      evidence: [
        { doc: 'Maintenance_SOP.pdf', page: 'Page 24', excerpt: 'MRPL-SOP-MECH-042: Centrifugal pump bearing vibration exceeding 4.5 mm/s requires immediate controlled shutdown and overhaul within 24 hours.' },
        { doc: 'Inspection_Report.pdf', page: 'Page 4', excerpt: 'Section 3.2 Field Findings: Audible metal-on-metal rattling recorded near drive-end shaft collar. Inspector recommends NDE ultrasonic check.' },
        { doc: 'Pump_Manual.pdf', page: 'Page 87', excerpt: 'Sulzer OH2 Standard Maintenance Limits: Maximum permissible operating bearing housing temperature: 80°C. Current reading: 88°C.' }
      ]
    }
  ];

  const handleRun = () => {
    if (!prompt.trim()) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col lg:flex-row overflow-hidden bg-[#0A0E17]">
      {/* LEFT/CENTER: Conversation & Workstation Execution (70% on large) */}
      <div className="flex-1 flex flex-col h-full border-r border-[#1E293B] min-w-0">
        {/* Workstation Sub-header */}
        <div className="px-6 py-3.5 bg-[#0D131F] border-b border-[#1E293B] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-sm font-bold text-white tracking-tight">AI Workbench</h1>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              <span className="text-xs text-slate-400">Private AI environment · Local inference</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono">
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#131B2A] border border-[#1E293B] text-slate-300">
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-slate-400">Model:</span>
              <span className="font-semibold text-slate-200">Sovereign Reasoning Model</span>
            </div>
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#131B2A] border border-[#1E293B] text-slate-300">
              <Bot className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-400">Agent:</span>
              <span className="font-semibold text-slate-200">Industrial Analysis Agent</span>
            </div>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className="space-y-2 max-w-4xl">
              {msg.sender === 'user' ? (
                /* User Message */
                <div className="flex items-start space-x-3">
                  <div className="w-7 h-7 rounded bg-[#1E293B] border border-[#2D3D58] flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                    <User className="w-4 h-4 text-slate-300" />
                  </div>
                  <div className="bg-[#121A2A] border border-[#1E293B] rounded-lg p-3.5 text-xs text-slate-200 font-sans shadow-sm flex-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mb-1">
                      <span className="font-bold text-slate-400">Engineer</span>
                      <span>{msg.timestamp}</span>
                    </div>
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ) : (
                /* Agent Response */
                <div className="flex items-start space-x-3">
                  <div className="w-7 h-7 rounded bg-blue-900/60 border border-blue-700/60 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-[#0E1624] border border-[#1E293B] rounded-lg p-4 text-xs text-slate-200 font-sans shadow-sm flex-1 space-y-4">
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono border-b border-[#1E293B] pb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-blue-400">{msg.agentRole}</span>
                        <span className="text-slate-600">·</span>
                        <span className="text-slate-400">{msg.model}</span>
                      </div>
                      <span>{msg.timestamp}</span>
                    </div>

                    {/* Formatted Agent Content */}
                    <div className="space-y-3 leading-relaxed text-slate-200">
                      <p>I reviewed the inspection report, equipment image, sensor data, and relevant maintenance procedure.</p>
                      
                      <div>
                        <div className="font-semibold text-white mb-1">I found three relevant indicators:</div>
                        <ul className="list-disc list-inside space-y-1 pl-1 text-slate-300">
                          <li><strong className="text-slate-100">Abnormal vibration</strong> (6.8 mm/s peak vs ISO limit 4.5 mm/s)</li>
                          <li><strong className="text-slate-100">Bearing wear</strong> (surface fatigue detected at NDE collar)</li>
                          <li><strong className="text-slate-100">Increased temperature</strong> (localized elevation to 88°C)</li>
                        </ul>
                      </div>

                      <p>The available maintenance procedure supports a maintenance review.</p>
                      <p className="font-semibold text-emerald-400">I recommend sending the equipment for maintenance inspection.</p>
                    </div>

                    {/* Evidence Box */}
                    {msg.evidence && (
                      <div className="pt-2 border-t border-[#1E293B] space-y-2">
                        <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                          <Layers className="w-3.5 h-3.5 text-blue-400" />
                          <span>Supporting Evidence & Grounded Citations</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {msg.evidence.map((ev, i) => (
                            <button
                              key={i}
                              onClick={() => setSelectedCitation(ev.doc + ' — ' + ev.page + ': ' + ev.excerpt)}
                              className="text-left p-2 rounded bg-[#090D15] hover:bg-[#131B2A] border border-[#1E293B] hover:border-blue-500/60 transition-all text-[11px] group"
                            >
                              <div className="flex items-center justify-between font-mono font-bold text-blue-400 group-hover:text-blue-300 truncate">
                                <span>{ev.doc}</span>
                                <ExternalLink className="w-3 h-3 text-slate-500 shrink-0 ml-1" />
                              </div>
                              <div className="text-[10px] text-slate-400 font-mono mt-0.5">{ev.page}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Citation Preview Modal/Toast */}
          {selectedCitation && (
            <div className="p-3.5 rounded-lg bg-[#141F32] border border-blue-500/40 text-xs text-slate-200 shadow-xl space-y-1.5 animate-in fade-in duration-150">
              <div className="flex items-center justify-between font-bold text-blue-300 font-mono text-[11px]">
                <span>GROUNDED PASSAGE VERIFICATION</span>
                <button 
                  onClick={() => setSelectedCitation(null)}
                  className="text-slate-400 hover:text-white px-1.5 py-0.5 rounded text-[10px]"
                >
                  ✕ Close
                </button>
              </div>
              <p className="text-slate-300 font-serif leading-relaxed italic bg-[#0A0E17] p-2.5 rounded border border-[#1E293B]">
                "{selectedCitation}"
              </p>
            </div>
          )}
        </div>

        {/* Practical AI Input Bar (Bottom) */}
        <div className="p-4 bg-[#0D131F] border-t border-[#1E293B] space-y-3 shrink-0">
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={2}
              placeholder="Ask about documents, equipment, procedures or data…"
              className="w-full bg-[#0A0E17] border border-[#1E293B] rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-sans resize-none"
            />
          </div>

          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center space-x-1.5 text-xs text-slate-400">
              <button 
                title="Attach Document or Image"
                className="flex items-center space-x-1 px-2.5 py-1 rounded bg-[#131B2A] hover:bg-[#1A2538] border border-[#1E293B] text-slate-300 hover:text-white text-[11px]"
              >
                <Paperclip className="w-3.5 h-3.5 text-slate-400" />
                <span>Attach</span>
              </button>

              <button 
                title="Knowledge Base Selection"
                className="flex items-center space-x-1 px-2.5 py-1 rounded bg-[#131B2A] hover:bg-[#1A2538] border border-[#1E293B] text-slate-300 hover:text-white text-[11px]"
              >
                <Database className="w-3.5 h-3.5 text-slate-400" />
                <span>Knowledge Base</span>
              </button>

              <button 
                title="Tools Selection"
                className="flex items-center space-x-1 px-2.5 py-1 rounded bg-[#131B2A] hover:bg-[#1A2538] border border-[#1E293B] text-slate-300 hover:text-white text-[11px]"
              >
                <Wrench className="w-3.5 h-3.5 text-slate-400" />
                <span>Tools</span>
              </button>

              <button 
                title="Local Model Selector"
                className="hidden sm:flex items-center space-x-1 px-2.5 py-1 rounded bg-[#131B2A] hover:bg-[#1A2538] border border-[#1E293B] text-slate-300 hover:text-white text-[11px]"
              >
                <Cpu className="w-3.5 h-3.5 text-blue-400" />
                <span>Model</span>
              </button>
            </div>

            <button
              onClick={handleRun}
              disabled={isProcessing}
              className="flex items-center space-x-2 px-5 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-sm transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isProcessing ? 'Analyzing...' : 'Run Agent'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Context & Evidence Inspector (30% on large) */}
      <div className="w-full lg:w-80 bg-[#0C111C] p-5 space-y-5 overflow-y-auto shrink-0 border-t lg:border-t-0 border-[#1E293B]">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Context</h2>
          <p className="text-[11px] text-slate-500 mt-0.5">Payload currently available to local context window</p>
        </div>

        {/* Selected Artifacts Breakdown */}
        <div className="space-y-2">
          <div className="bg-[#101726] p-2.5 rounded-lg border border-[#1E293B] flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Documents</span>
            <span className="font-mono font-bold text-white bg-[#0A0E17] px-2 py-0.5 rounded border border-[#1E293B]">3 selected</span>
          </div>

          <div className="bg-[#101726] p-2.5 rounded-lg border border-[#1E293B] flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Images</span>
            <span className="font-mono font-bold text-white bg-[#0A0E17] px-2 py-0.5 rounded border border-[#1E293B]">1 selected</span>
          </div>

          <div className="bg-[#101726] p-2.5 rounded-lg border border-[#1E293B] flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Data</span>
            <span className="font-mono font-bold text-white bg-[#0A0E17] px-2 py-0.5 rounded border border-[#1E293B]">1 CSV</span>
          </div>

          <div className="bg-[#101726] p-2.5 rounded-lg border border-[#1E293B] flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Knowledge Base</span>
            <span className="font-mono font-bold text-blue-300 text-[11px] truncate max-w-[140px]">Maintenance Procedures</span>
          </div>
        </div>

        {/* Evidence List */}
        <div className="space-y-3 pt-3 border-t border-[#1E293B]">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Evidence</h3>
            <span className="text-[10px] text-slate-500 font-mono">3 citations</span>
          </div>

          <div className="space-y-2">
            <div className="bg-[#090D15] p-3 rounded-lg border border-[#1E293B] text-xs space-y-1">
              <div className="font-bold text-slate-200 font-mono">Maintenance_SOP.pdf</div>
              <div className="text-[11px] text-blue-400 font-mono">Page 24</div>
              <p className="text-[10px] text-slate-400 mt-1">MRPL vibration limit thresholds & emergency changeover procedure.</p>
            </div>

            <div className="bg-[#090D15] p-3 rounded-lg border border-[#1E293B] text-xs space-y-1">
              <div className="font-bold text-slate-200 font-mono">Pump_Inspection_Report.pdf</div>
              <div className="text-[11px] text-blue-400 font-mono">Page 4</div>
              <p className="text-[10px] text-slate-400 mt-1">Physical inspector notes noting abnormal audible rattling at NDE.</p>
            </div>

            <div className="bg-[#090D15] p-3 rounded-lg border border-[#1E293B] text-xs space-y-1">
              <div className="font-bold text-slate-200 font-mono">Pump_Manual.pdf</div>
              <div className="text-[11px] text-blue-400 font-mono">Page 87</div>
              <p className="text-[10px] text-slate-400 mt-1">OEM manufacturer design tolerances and bearing overhaul intervals.</p>
            </div>
          </div>

          <button className="w-full flex items-center justify-center space-x-2 py-2 px-3 rounded bg-[#131B2A] hover:bg-[#1A2538] border border-[#1E293B] text-slate-200 text-xs font-semibold transition-colors mt-2">
            <Eye className="w-3.5 h-3.5 text-slate-400" />
            <span>View Sources</span>
          </button>
        </div>
      </div>
    </div>
  );
};
