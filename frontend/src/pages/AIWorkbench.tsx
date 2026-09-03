import React, { useState } from 'react';
import { 
  Bot, 
  Cpu, 
  Send, 
  Paperclip, 
  FileText, 
  ExternalLink, 
  ShieldCheck, 
  Zap, 
  Database, 
  CheckCircle2, 
  AlertTriangle,
  RefreshCw,
  Sliders,
  Terminal,
  Layers,
  Sparkles,
  ChevronRight,
  Maximize2
} from 'lucide-react';

export const AIWorkbench: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([
    {
      sender: 'user',
      name: 'CHIEF RELIABILITY ENGINEER',
      time: '10:41:22 AM · TTY_LOCAL_0',
      text: 'Analyze the inspection report and determine whether maintenance is required.'
    },
    {
      sender: 'ai',
      name: 'SOVEREIGN REASONER',
      speed: '18.4 tokens/sec',
      hardware: 'Local GPU',
      text: 'I reviewed the inspection report, equipment image, sensor data, and relevant maintenance procedure.',
      indicators: [
        {
          type: 'Abnormal vibration',
          icon: AlertTriangle,
          color: 'rose',
          desc: 'RMS velocity exceeded 4.5 mm/s on Bearing #2 (Acceptable threshold: 2.8 mm/s).'
        },
        {
          type: 'Bearing wear',
          icon: Layers,
          color: 'amber',
          desc: 'Acoustic emission spikes detected in high-frequency spectrum (40–100 kHz).'
        },
        {
          type: 'Increased temperature',
          icon: Zap,
          color: 'rose',
          desc: 'Stator housing delta +14°C above steady-state baseline.'
        }
      ],
      verdict: 'I recommend sending the equipment for maintenance inspection immediately.',
      hasOverlay: true,
      citations: [
        {
          title: 'Maintenance_SOP.pdf — Page 24',
          sub: 'Section 4.2 Bearing Limits & Degradation Tolerances',
          excerpt: 'Clause 4.12: Radial vibration velocity exceeding 4.5 mm/s on Class II induction pump bearings mandates mechanical seal overhaul and immediate replacement to avert rotor unbalance.'
        },
        {
          title: 'Inspection_Report.pdf — Page 4',
          sub: 'Vibration Spectrum Plot & High-Frequency Demodulation',
          excerpt: 'Peak spectral acceleration reached 6.82 mm/s at 108.4 Hz coinciding with ball pass frequency inner ring (BPFI). Thermal discoloration verified on NDE bearing cover.'
        },
        {
          title: 'Pump_Manual.pdf — Page 87',
          sub: 'Lubrication Tolerances & Max Operating Temperature',
          excerpt: 'Maximum allowable stator shell temperature is 75°C. Current reading 68.4°C represents a +20.4°C deviation above 48°C continuous duty baseline.'
        }
      ],
      determinism: {
        temp: '0.0 (Strict)',
        latency: '314 ms',
        hardware: 'RTX-A6000 #0',
        sha: 'e3b0c44298fc1c14b87...'
      }
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeExcerpt, setActiveExcerpt] = useState<any>(null);
  const [showSwitchModel, setShowSwitchModel] = useState(false);
  const [selectedModel, setSelectedModel] = useState('Sovereign Reasoning Model (Q4_K_M · 8GB VRAM)');

  const handleSend = () => {
    if (!inputVal.trim()) return;

    const userMsg = {
      sender: 'user',
      name: 'CHIEF RELIABILITY ENGINEER',
      time: new Date().toLocaleTimeString() + ' · TTY_LOCAL_0',
      text: inputVal
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsProcessing(true);

    setTimeout(() => {
      const aiMsg = {
        sender: 'ai',
        name: 'SOVEREIGN REASONER',
        speed: '19.2 tokens/sec',
        hardware: 'Local GPU',
        text: `Based on local RAG retrieval and Python sandbox calculation for "${inputVal}":\n\nHydrocarbon seal integrity for Pump P-102 is currently calculated at 18.2% remaining useful life. ISO-10816 Zone C limits have been breached. Proceeding with Human-in-the-loop Dispatch recommendation.`,
        citations: [
          {
            title: 'Maintenance_SOP.pdf — Page 24',
            sub: 'Clause 4.12 Bearing Limits',
            excerpt: 'Vibration limits verified against API 610 standards.'
          }
        ],
        determinism: {
          temp: '0.0 (Strict)',
          latency: '298 ms',
          hardware: 'RTX-A6000 #0',
          sha: 'fa4910bc482...'
        }
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] overflow-hidden font-sans">
      {/* Center Main Workstation Panel (Conversation) */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-900 border-r border-slate-800">
        {/* Top Control Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-black text-white uppercase font-mono tracking-tight">AI Workbench</h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                LOCAL INFERENCE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans mt-0.5">
              Private AI environment · Local hardware execution only · Zero Cloud Telemetry
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {/* Active Model Pill */}
            <div className="relative">
              <button
                onClick={() => setShowSwitchModel(!showSwitchModel)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 hover:border-blue-500 transition-all"
              >
                <Cpu className="w-3.5 h-3.5 text-blue-400" />
                <span className="truncate max-w-[200px]">{selectedModel}</span>
                <span className="text-[10px] text-blue-400 uppercase font-bold pl-1">SWITCH</span>
              </button>

              {showSwitchModel && (
                <div className="absolute right-0 mt-2 w-72 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl p-2 space-y-1 z-50 font-mono text-xs">
                  <div className="px-2 py-1 text-[10px] text-slate-500 uppercase font-bold">Select Local Weight Model</div>
                  {[
                    'Sovereign Reasoning Model (Q4_K_M · 8GB VRAM)',
                    'Qwen2.5-VL-7B (Vision · 6GB VRAM)',
                    'Mistral-Codestral-22B (Code Sandbox · 12GB VRAM)',
                    'BGE-Large-En (Embedding · 2GB VRAM)'
                  ].map((m) => (
                    <button
                      key={m}
                      onClick={() => {
                        setSelectedModel(m);
                        setShowSwitchModel(false);
                      }}
                      className={`w-full text-left p-2 rounded text-xs transition-all ${
                        selectedModel === m ? 'bg-blue-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-900'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Agent Pill */}
            <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300">
              <Bot className="w-3.5 h-3.5 text-emerald-400" />
              <span>Industrial Agent · PID #4092</span>
            </div>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {messages.map((msg, idx) => (
            <div key={idx} className="space-y-2">
              {/* Message Header */}
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center space-x-2">
                  {msg.sender === 'user' ? (
                    <span className="w-6 h-6 rounded bg-blue-900/60 border border-blue-700 text-blue-300 flex items-center justify-center font-bold text-[10px]">
                      EN
                    </span>
                  ) : (
                    <span className="w-6 h-6 rounded bg-emerald-950 border border-emerald-700 text-emerald-400 flex items-center justify-center font-bold text-[10px]">
                      AI
                    </span>
                  )}
                  <span className="font-bold text-white tracking-wide">{msg.name}</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono flex items-center space-x-2">
                  {msg.speed && (
                    <span className="text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40">
                      {msg.speed}
                    </span>
                  )}
                  {msg.hardware && <span>{msg.hardware}</span>}
                  {msg.time && <span>{msg.time}</span>}
                </div>
              </div>

              {/* Message Body */}
              <div className={`p-4 rounded-xl text-xs leading-relaxed space-y-3 font-sans ${
                msg.sender === 'user'
                  ? 'bg-slate-950 border border-slate-800 text-slate-200'
                  : 'bg-slate-950/90 border border-slate-800 text-slate-300 shadow-md'
              }`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>

                {/* Identified Indicators Box */}
                {msg.indicators && (
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider block">
                      IDENTIFIED DIAGNOSTIC INDICATORS
                    </span>
                    <div className="space-y-1.5">
                      {msg.indicators.map((ind: any, i: number) => (
                        <div key={i} className="flex items-start space-x-2 bg-slate-900 p-2.5 rounded border border-slate-800 font-mono text-[11px]">
                          <AlertTriangle className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                            ind.color === 'rose' ? 'text-rose-400' : 'text-amber-400'
                          }`} />
                          <div>
                            <span className="font-bold text-white">{ind.type}: </span>
                            <span className="text-slate-300">{ind.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Verdict */}
                {msg.verdict && (
                  <div className="p-3 rounded-lg bg-emerald-950/50 border border-emerald-700/60 space-y-1">
                    <div className="flex items-center space-x-2 text-emerald-400 font-mono font-bold text-xs uppercase">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>ACTION VERDICT</span>
                    </div>
                    <p className="text-xs text-white font-medium pl-6">{msg.verdict}</p>
                  </div>
                )}

                {/* Thermal & Acoustic Overlay Visual */}
                {msg.hasOverlay && (
                  <div className="bg-slate-900 rounded-lg p-3 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span className="font-bold text-white uppercase">THERMAL & ACOUSTIC SENSOR OVERLAY</span>
                      <span className="text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/50">
                        BEARING_NODE_2 [FAIL_RISK_HIGH] SENSOR_ID #9914
                      </span>
                    </div>

                    {/* Visual Mock of Equipment Sensor Overlay */}
                    <div className="relative bg-slate-950 rounded border border-slate-800 h-40 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-radial from-blue-900/20 via-transparent to-black/60"></div>
                      <div className="text-center font-mono space-y-2 z-10">
                        <div className="w-16 h-16 rounded-full border-2 border-dashed border-rose-500/80 mx-auto flex items-center justify-center animate-pulse">
                          <span className="text-xs font-bold text-rose-400">68.4°C</span>
                        </div>
                        <span className="text-[10px] text-slate-400 block">
                          Ultrasonic Demodulation Peak: 108.4 Hz (BPFI Harmonics Active)
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Evidence Citations */}
                {msg.citations && (
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider">
                        EVIDENCE CITATIONS (LOCAL VERIFIED)
                      </span>
                      <span className="text-[9px] font-mono text-emerald-400 flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Zero Egress Verified</span>
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {msg.citations.map((c: any, i: number) => (
                        <div key={i} className="flex items-center justify-between bg-slate-900 p-2.5 rounded border border-slate-800 text-xs">
                          <div>
                            <span className="font-bold text-white font-mono text-[11px] block">{c.title}</span>
                            <span className="text-[10px] text-slate-400 font-sans block">{c.sub}</span>
                          </div>
                          <button
                            onClick={() => setActiveExcerpt(c)}
                            className="px-2.5 py-1 rounded bg-slate-950 border border-slate-700 text-blue-400 hover:text-blue-300 font-mono text-[10px] uppercase font-bold transition-all shrink-0 ml-2"
                          >
                            VIEW EXCERPT
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Determinism & Checksums Footer */}
                {msg.determinism && (
                  <div className="pt-2 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-slate-500">
                    <div>SHA256: <span className="text-slate-400">{msg.determinism.sha}</span></div>
                    <div className="flex items-center space-x-3">
                      <span>TEMP: <span className="text-slate-300">{msg.determinism.temp}</span></span>
                      <span>LATENCY: <span className="text-emerald-400">{msg.determinism.latency}</span></span>
                      <span>HW: <span className="text-slate-300">{msg.determinism.hardware}</span></span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isProcessing && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono text-blue-400 flex items-center space-x-2">
              <span className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></span>
              <span>Running local reasoning inference on GPU cluster...</span>
            </div>
          )}
        </div>

        {/* Bottom AI Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 space-y-2 shrink-0">
          {/* Action Chips */}
          <div className="flex items-center space-x-2 text-[11px] font-mono">
            <button className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 flex items-center space-x-1">
              <Paperclip className="w-3 h-3" />
              <span>+ ATTACH</span>
            </button>
            <span className="px-2.5 py-1 rounded bg-blue-950/60 border border-blue-800/60 text-blue-300">
              KB: MAINTENANCE
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">
              &lt;&gt; OCR / PYTHON
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">
              8B REAS
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about documents, equipment, procedures, vibration telemetry, or ISO limits..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-sans"
            />
            <button
              onClick={handleSend}
              disabled={isProcessing}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 font-bold text-white text-xs font-mono shadow-md shadow-blue-600/20 transition-all"
            >
              <span>RUN AGENT</span>
              <Zap className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Context Panel */}
      <div className="w-full lg:w-80 bg-slate-950 border-t lg:border-t-0 lg:border-l border-slate-800 p-5 space-y-5 overflow-y-auto shrink-0 font-sans">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold uppercase text-white tracking-wider flex items-center space-x-2">
            <Layers className="w-4 h-4 text-blue-400" />
            <span>MOUNTED CONTEXT</span>
          </span>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
            AIRGAP ACTIVE
          </span>
        </div>

        {/* Selected Context Counts */}
        <div className="space-y-2 font-mono text-xs">
          <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex justify-between">
            <span className="text-slate-400">Documents</span>
            <span className="font-bold text-white">3 Selected</span>
          </div>

          <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex justify-between">
            <span className="text-slate-400">Images</span>
            <span className="font-bold text-white">1 Selected</span>
          </div>

          <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex justify-between">
            <span className="text-slate-400">Telemetry Data</span>
            <span className="font-bold text-white">1 CSV (14,400 pts)</span>
          </div>

          <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex justify-between">
            <span className="text-slate-400">Knowledge Base</span>
            <span className="font-bold text-blue-400">Maintenance SOPs</span>
          </div>
        </div>

        {/* Grounded Evidence List */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider block">
            GROUNDED SOURCES
          </span>
          <div className="space-y-2 font-mono text-xs">
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-white font-bold block truncate">Maintenance_SOP.pdf</span>
              <span className="text-[10px] text-emerald-400 block">Page 24 · Vector Distance 0.114</span>
            </div>

            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-white font-bold block truncate">Pump_Inspection_Report.pdf</span>
              <span className="text-[10px] text-emerald-400 block">Page 4 · OCR Confidence 99.4%</span>
            </div>

            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-white font-bold block truncate">Pump_Manual.pdf</span>
              <span className="text-[10px] text-emerald-400 block">Page 87 · Vector Distance 0.142</span>
            </div>
          </div>
        </div>

        {/* VRAM & Hardware Widget */}
        <div className="pt-4 border-t border-slate-800 space-y-2 font-mono text-xs">
          <div className="flex justify-between text-slate-400 text-[11px]">
            <span>GPU VRAM In-Use</span>
            <span className="text-emerald-400 font-bold">18.4 / 48.0 GB</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-800">
            <div className="bg-gradient-to-r from-blue-500 to-emerald-500 h-1.5 rounded-full w-[38%]"></div>
          </div>
        </div>
      </div>

      {/* Modal for Excerpt Preview */}
      {activeExcerpt && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-sm font-mono">{activeExcerpt.title}</h3>
                <span className="text-[10px] text-blue-400">{activeExcerpt.sub}</span>
              </div>
              <button
                onClick={() => setActiveExcerpt(null)}
                className="text-slate-400 hover:text-white text-xs font-mono px-2 py-1 bg-slate-800 rounded"
              >
                ESC / CLOSE
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2 text-xs font-mono text-slate-200 leading-relaxed">
              <span className="text-[10px] text-slate-500 uppercase block">AUTHENTICATED LOCAL VECTOR CHUNK</span>
              <p>{activeExcerpt.excerpt}</p>
            </div>

            <div className="text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-800 flex justify-between">
              <span>CIPHER: SHA256 VERIFIED</span>
              <span>EGRESS: 0.00 BPS (AIR-GAP)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
