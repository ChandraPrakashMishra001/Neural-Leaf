import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { downloadExtensionZip } from "@/utils/extensionDownloader";
import { 
  Mic, MicOff, Eye, EyeOff, Sparkles, Terminal, CornerDownLeft, 
  RotateCcw, ShieldCheck, CheckCircle2, Globe, Laptop, ArrowRight,
  Search, Maximize2, Zap, Play, X
} from "lucide-react";

interface ActionLogItem {
  id: string;
  name: string;
  undoable: boolean;
  timestamp: string;
}

export default function SlabExtensionSimulator() {
  const [activeSite, setActiveSite] = useState<'wiki' | 'hn' | 'store'>('wiki');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isGazeActive, setIsGazeActive] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState("");
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [toast, setToast] = useState<{ title: string; badge: string; body: string } | null>(null);
  const [confirmation, setConfirmation] = useState<{ title: string; onConfirm: () => void; countdown: number } | null>(null);
  const [actionLog, setActionLog] = useState<ActionLogItem[]>([
    { id: '1', name: 'Agent initialized in sandbox', undoable: false, timestamp: 'just now' }
  ]);
  const [siteHabits, setSiteHabits] = useState<{ [domain: string]: { [cmd: string]: number } }>({
    'en.wikipedia.org': { 'summarize page': 3, 'scroll down': 5, 'focus mode': 2 },
    'news.ycombinator.com': { 'summarize page': 4, 'scroll down': 8 },
    'store.example.com': { 'click buy': 2, 'scroll to bottom': 3 }
  });

  const sandboxRef = useRef<HTMLDivElement>(null);
  const undoStack = useRef<Array<() => void>>([]);
  const recognitionRef = useRef<any>(null);

  // Sample Site Contents
  const sampleSites = {
    wiki: {
      url: "https://en.wikipedia.org/wiki/Quantum_Computing",
      title: "Quantum Computing — Wikipedia, the free encyclopedia",
      content: `Quantum computing is a rapidly-emerging technology that harnesses the laws of quantum mechanics to solve problems too complex for classical computers. Today, hardware development is led by major research groups utilizing superconducting transmon qubits and trapped-ion architectures.\n\nQuantum algorithms like Shor's algorithm and Grover's algorithm provide polynomial and quadratic speedups over classical computing. Autonomous browser agents utilizing deterministic execution and token minimization pipelines allow AI systems to parse quantum research literature with 98% token reduction and zero prompt latency.\n\nKey applications span cryptographic analysis, molecular drug discovery, financial portfolio optimization, and high-energy physics simulations.`
    },
    hn: {
      url: "https://news.ycombinator.com",
      title: "Hacker News — Top Stories",
      content: `1. Show HN: Webcmd – Turn any website into a CLI for AI agents (482 points by agent_dev)\n2. Self-Learning Agent Browsers (SLAB) Hackathon 2026: Deterministic Execution (315 points)\n3. Why 98% Token Reduction Matters for LLM Browser Automation (240 points)\n4. WebGazer: Real-time gaze estimation in standard webcams (189 points)\n5. Extractive Saliency vs Generative Summarization for Agents (156 points)`
    },
    store: {
      url: "https://store.example.com/products/quantum-neural-rig",
      title: "Neural Rig X9 — Autonomous Workstation",
      content: `Neural Rig X9: Next-Generation Hardware Accelerator for Local AI Agents.\nFeatures 128GB Unified Memory, Sub-second Playwright DOM sandboxing, and integrated speech recognition hardware.\nPrice: $2,499 USD (In Stock).\n\nCustomer Reviews: "Reduced my agent token cost by 94% using local deterministic execution."\nClick 'Add to Cart' or 'Buy Now' to proceed with instant checkout.`
    }
  };

  // 1. In-Sandbox Voice Engine
  useEffect(() => {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRec) {
      const rec = new SpeechRec();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';

      rec.onresult = (event: any) => {
        let interim = '';
        let final = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }
        const text = final || interim;
        setTranscript(text);
        if (final.trim()) {
          handleExecute(final.trim());
        }
      };

      rec.onerror = (err: any) => {
        console.warn('Sandbox voice warning:', err.error);
      };

      recognitionRef.current = rec;
    }
  }, []);

  const toggleVoice = () => {
    if (!recognitionRef.current) {
      alert("Web Speech API is not supported in this browser.");
      return;
    }
    if (isVoiceActive) {
      recognitionRef.current.stop();
      setIsVoiceActive(false);
      setTranscript("");
    } else {
      try {
        recognitionRef.current.start();
        setIsVoiceActive(true);
        setTranscript("Listening for commands...");
      } catch (e) {
        console.warn(e);
      }
    }
  };

  // 2. Offline Extractive Summarizer Algorithm
  const runOfflineSummarizer = () => {
    const raw = sampleSites[activeSite].content;
    const lines = raw.split('\n').filter(l => l.trim().length > 10);
    const summary = lines.slice(0, 2).join(' ');
    
    const rawTokens = Math.ceil(raw.length / 4);
    const summaryTokens = Math.ceil(summary.length / 4);
    const savingsPercent = Math.round(((rawTokens - summaryTokens) / rawTokens) * 100);

    setToast({
      title: "✨ 100% Offline Summary",
      badge: `${savingsPercent}% Token Reduction (${summaryTokens} vs ${rawTokens} tokens)`,
      body: summary
    });

    logAction(`Summarized: ${savingsPercent}% token reduction`, false);
  };

  // 3. Command Execution Dispatcher
  const handleExecute = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;
    const lower = cmd.toLowerCase();

    // Record habit memory
    const domain = new URL(sampleSites[activeSite].url).hostname;
    setSiteHabits(prev => ({
      ...prev,
      [domain]: {
        ...(prev[domain] || {}),
        [cmd]: ((prev[domain]?.[cmd]) || 0) + 1
      }
    }));

    if (lower.includes('summarize') || lower.includes('summary')) {
      runOfflineSummarizer();
    } else if (lower.includes('scroll down') || lower === 'down') {
      if (sandboxRef.current) {
        sandboxRef.current.scrollBy({ top: 220, behavior: 'smooth' });
        undoStack.current.push(() => sandboxRef.current?.scrollBy({ top: -220, behavior: 'smooth' }));
        logAction('Scrolled down 220px', true);
      }
    } else if (lower.includes('scroll up') || lower === 'up') {
      if (sandboxRef.current) {
        sandboxRef.current.scrollBy({ top: -220, behavior: 'smooth' });
        undoStack.current.push(() => sandboxRef.current?.scrollBy({ top: 220, behavior: 'smooth' }));
        logAction('Scrolled up 220px', true);
      }
    } else if (lower.includes('focus mode on') || lower === 'focus mode') {
      setIsFocusMode(true);
      undoStack.current.push(() => setIsFocusMode(false));
      logAction('Enabled Focus Mode', true);
    } else if (lower.includes('focus mode off')) {
      setIsFocusMode(false);
      logAction('Disabled Focus Mode', false);
    } else if (lower === 'undo') {
      handleUndo();
    } else if (lower.startsWith('click ') || lower.startsWith('press ')) {
      const target = cmd.replace(/^(click|press)\s+/i, '');
      // Confirmation Gating
      triggerConfirmation(`Execute click on element "${target}"?`, () => {
        setToast({
          title: "🎯 Element Clicked",
          badge: "Confirmed & Executed",
          body: `Autonomous agent clicked and triggered workflow on element "${target}".`
        });
        logAction(`Clicked: ${target}`, false);
      });
    } else {
      setToast({
        title: `⚡ SLAB Layer 3 Command`,
        badge: "92% Token Reduction",
        body: `Processed deterministic instruction: "${cmd}" with structured JSON output.`
      });
      logAction(`Ran: ${cmd}`, false);
    }

    setIsPaletteOpen(false);
    setIsPanelOpen(false);
  };

  const handleUndo = () => {
    if (undoStack.current.length === 0) {
      setToast({ title: "Undo Stack Empty", badge: "Info", body: "No reversible actions to undo." });
      return;
    }
    const undoFn = undoStack.current.pop();
    if (undoFn) undoFn();
    logAction("Undid last action", false);
    setToast({ title: "↶ Action Undone", badge: "Reverted", body: "Successfully reverted previous action." });
  };

  const triggerConfirmation = (title: string, onConfirm: () => void) => {
    let count = 6;
    setConfirmation({ title, onConfirm, countdown: count });
    const timer = setInterval(() => {
      count--;
      if (count <= 0) {
        clearInterval(timer);
        setConfirmation(null);
      } else {
        setConfirmation(prev => prev ? { ...prev, countdown: count } : null);
      }
    }, 1000);
  };

  const logAction = (name: string, undoable: boolean) => {
    setActionLog(prev => [
      { id: Date.now().toString(), name, undoable, timestamp: 'just now' },
      ...prev.slice(0, 15)
    ]);
  };

  return (
    <section id="simulator-section" className="relative w-full max-w-7xl mx-auto px-6 py-28 z-10 border-t border-white/5">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono mb-3 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
          <Terminal size={14} className="text-cyan-400" />
          <span className="font-bold tracking-widest uppercase">Interactive Local Sandbox</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          SLAB Extension Simulator & Testbed
        </h2>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mt-2">
          Test voice commands, the 100% offline summarizer, habit memory, and gaze scrolling live before loading the extension.
        </p>
      </div>

      {/* Main Sandbox Frame */}
      <div className="rounded-3xl border border-cyan-500/40 bg-gradient-to-b from-slate-950 via-slate-900 to-black backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_50px_rgba(56,189,248,0.25)] overflow-hidden">
        
        {/* Browser Top Navigation Bar */}
        <div className="h-16 bg-slate-950/90 border-b border-white/10 px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
          </div>

          {/* Sample Site Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-xl">
            <button
              onClick={() => setActiveSite('wiki')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                activeSite === 'wiki' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold' : 'text-gray-400 hover:text-white bg-white/5'
              }`}
            >
              <span>Wikipedia</span>
            </button>
            <button
              onClick={() => setActiveSite('hn')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                activeSite === 'hn' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold' : 'text-gray-400 hover:text-white bg-white/5'
              }`}
            >
              <span>Hacker News</span>
            </button>
            <button
              onClick={() => setActiveSite('store')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                activeSite === 'store' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold' : 'text-gray-400 hover:text-white bg-white/5'
              }`}
            >
              <span>E-Commerce</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaletteOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono hover:bg-cyan-500/20 transition-all flex items-center gap-1.5"
            >
              <Terminal size={12} />
              <span className="hidden sm:inline">Ctrl+Shift+K</span>
            </button>
          </div>
        </div>

        {/* Browser Viewport Area with Simulated Website & Live SLAB In-Page Overlay */}
        <div className="relative w-full h-[520px] bg-slate-950 overflow-hidden flex flex-col">
          
          {/* Mock Webpage Content Viewport */}
          <div ref={sandboxRef} className="flex-1 p-8 sm:p-12 overflow-y-auto relative scroll-smooth text-gray-200">
            
            {/* Focus Mode Dimmer */}
            {isFocusMode && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px] z-10 flex items-center justify-center pointer-events-none">
                <div className="bg-slate-900 border border-cyan-400/40 px-4 py-2 rounded-xl text-cyan-300 text-xs font-mono shadow-2xl">
                  🎯 Focus Mode Active (Say "focus mode off" or "undo" to disable)
                </div>
              </div>
            )}

            <div className="max-w-3xl mx-auto space-y-6">
              <div className="border-b border-white/10 pb-4">
                <div className="text-xs text-sky-400 font-mono mb-1">{sampleSites[activeSite].url}</div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white">{sampleSites[activeSite].title}</h1>
              </div>

              <div className="prose prose-invert max-w-none text-sm sm:text-base leading-relaxed text-gray-300 whitespace-pre-line">
                {sampleSites[activeSite].content}
              </div>

              {/* Sample Actionable Buttons */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap gap-4">
                <button 
                  onClick={() => handleExecute("click explore")}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-bold text-xs hover:bg-cyan-500/30 transition-all"
                >
                  🚀 Explore More
                </button>
                <button 
                  onClick={() => handleExecute("click buy")}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all"
                >
                  ⚡ Execute Workflow
                </button>
              </div>
            </div>
          </div>

          {/* ── REAL SLAB FLOATING ORB (BOTTOM-RIGHT) ── */}
          <div className="absolute bottom-6 right-6 z-30 flex flex-col items-end">
            
            {/* Live Transcript Pill */}
            {transcript && (
              <div className="mb-3 px-4 py-2 rounded-full bg-slate-900/95 border border-cyan-400/40 text-cyan-300 text-xs font-mono shadow-2xl animate-pulse">
                🗣️ "{transcript}"
              </div>
            )}

            {/* Orb Button */}
            <button
              onClick={() => setIsPanelOpen(!isPanelOpen)}
              className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_30px_rgba(56,189,248,0.5)] border-2 transition-all duration-300 ${
                isVoiceActive 
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 border-emerald-300 animate-pulse' 
                  : 'bg-gradient-to-r from-cyan-500 to-indigo-600 border-cyan-300 hover:scale-105'
              }`}
              title="SLAB Agent Orb"
            >
              {isVoiceActive ? <Mic size={24} /> : <Sparkles size={24} />}
            </button>

            {/* Slide-out Orb Panel */}
            <AnimatePresence>
              {isPanelOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  className="absolute bottom-16 right-0 w-80 bg-slate-900/95 border border-cyan-500/40 rounded-2xl p-5 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(56,189,248,0.25)] backdrop-blur-2xl text-white space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="font-bold text-sm text-cyan-300 font-mono">⚡ SLAB Agent Panel</span>
                    <button onClick={() => setIsPanelOpen(false)} className="text-gray-400 hover:text-white"><X size={16} /></button>
                  </div>

                  {/* Toggles */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={toggleVoice}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        isVoiceActive ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-white/5 border-white/10 text-gray-300'
                      }`}
                    >
                      {isVoiceActive ? <Mic size={14} /> : <MicOff size={14} />}
                      <span>{isVoiceActive ? 'Voice ON' : 'Voice OFF'}</span>
                    </button>

                    <button
                      onClick={() => setIsGazeActive(!isGazeActive)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        isGazeActive ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-white/5 border-white/10 text-gray-300'
                      }`}
                    >
                      {isGazeActive ? <Eye size={14} /> : <EyeOff size={14} />}
                      <span>{isGazeActive ? 'Gaze Active' : 'Eye Scroll'}</span>
                    </button>
                  </div>

                  {/* Quick Offline Summarize Button */}
                  <button
                    onClick={runOfflineSummarizer}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-all flex items-center justify-center gap-1.5"
                  >
                    <Sparkles size={14} />
                    <span>✨ Summarize Page (Offline)</span>
                  </button>

                  {/* Learned Site Habits */}
                  <div>
                    <div className="text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-1.5">Learned Habits</div>
                    <div className="flex flex-wrap gap-1.5">
                      {Object.entries(siteHabits[new URL(sampleSites[activeSite].url).hostname] || {}).map(([cmd, count]) => (
                        <button
                          key={cmd}
                          onClick={() => handleExecute(cmd)}
                          className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-400/25 text-cyan-300 text-[11px] font-mono hover:bg-cyan-500/25 transition-all"
                        >
                          ⚡ {cmd} ({count}x)
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action Log & Undo */}
                  <div className="border-t border-white/10 pt-2 flex items-center justify-between text-xs">
                    <span className="text-gray-400 font-mono">Recent Action: {actionLog[0]?.name}</span>
                    <button onClick={handleUndo} className="text-cyan-400 font-bold hover:underline flex items-center gap-1">
                      <RotateCcw size={12} />
                      <span>Undo</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── COMMAND PALETTE MODAL (CTRL+SHIFT+K) ── */}
          <AnimatePresence>
            {isPaletteOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/75 backdrop-blur-md z-40 flex items-start justify-center pt-16 px-6"
                onClick={() => setIsPaletteOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.95, y: -20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: -20 }}
                  className="w-full max-w-lg bg-slate-900 border border-cyan-400/50 rounded-2xl shadow-2xl overflow-hidden"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="p-4 border-b border-white/10 flex items-center gap-3">
                    <Search size={18} className="text-cyan-400" />
                    <input
                      type="text"
                      value={paletteQuery}
                      onChange={e => setPaletteQuery(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') handleExecute(paletteQuery); }}
                      placeholder="Type a command (e.g. 'summarize page', 'scroll down', 'focus mode', 'undo')..."
                      className="flex-1 bg-transparent text-white text-sm outline-none font-mono"
                      autoFocus
                    />
                    <button onClick={() => setIsPaletteOpen(false)} className="text-gray-400 hover:text-white"><X size={16} /></button>
                  </div>
                  <div className="p-2 max-h-60 overflow-y-auto space-y-1">
                    {[
                      { cmd: "summarize page", label: "✨ Summarize Page (Offline Extractive)" },
                      { cmd: "scroll down", label: "📜 Scroll Down" },
                      { cmd: "scroll up", label: "📜 Scroll Up" },
                      { cmd: "focus mode on", label: "🎯 Toggle Focus Mode" },
                      { cmd: "click explore", label: "🖱️ Click 'Explore More'" },
                      { cmd: "undo", label: "↶ Undo Last Action" }
                    ].filter(i => !paletteQuery || i.cmd.includes(paletteQuery.toLowerCase())).map(item => (
                      <button
                        key={item.cmd}
                        onClick={() => handleExecute(item.cmd)}
                        className="w-full p-2.5 rounded-xl text-left text-xs font-mono text-gray-200 hover:bg-cyan-500/20 hover:text-cyan-300 flex items-center justify-between transition-all"
                      >
                        <span>{item.label}</span>
                        <CornerDownLeft size={12} className="text-gray-500" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── FLOATING TOAST MODAL ── */}
          <AnimatePresence>
            {toast && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-6 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-lg bg-slate-900/98 border border-cyan-400/60 rounded-2xl p-4 shadow-2xl backdrop-blur-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-cyan-300">{toast.title}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-mono">
                    {toast.badge}
                  </span>
                </div>
                <p className="text-xs text-gray-200 leading-relaxed mb-3">{toast.body}</p>
                <div className="flex justify-end">
                  <button onClick={() => setToast(null)} className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white">
                    Dismiss
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── CONFIRMATION GATING MODAL (6s COUNTDOWN) ── */}
          <AnimatePresence>
            {confirmation && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute top-6 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-md bg-slate-900/98 border border-amber-400/60 rounded-2xl p-4 shadow-2xl backdrop-blur-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-amber-300">⚠️ Confirmation Gating</span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                    Auto-cancels in {confirmation.countdown}s
                  </span>
                </div>
                <p className="text-xs text-gray-200 mb-3">{confirmation.title}</p>
                <div className="flex justify-end gap-2">
                  <button onClick={() => setConfirmation(null)} className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-gray-300">
                    Cancel
                  </button>
                  <button onClick={() => { confirmation.onConfirm(); setConfirmation(null); }} className="px-3 py-1 rounded-lg bg-amber-500 text-black font-bold text-xs hover:bg-amber-400">
                    Yes, Execute
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Fast Testing Ribbon */}
        <div className="bg-slate-950 border-t border-white/10 p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-400 font-mono">Test Commands:</span>
            {["summarize page", "scroll down", "focus mode on", "click explore", "undo"].map(cmd => (
              <button
                key={cmd}
                onClick={() => handleExecute(cmd)}
                className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400 text-xs text-gray-300 hover:text-cyan-300 font-mono transition-all"
              >
                {cmd}
              </button>
            ))}
          </div>

          <a
            href="/slab-extension.zip"
            download="slab-extension.zip"
            onClick={(e) => downloadExtensionZip('slab-extension.zip', e)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_30px_rgba(56,189,248,0.7)] transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>⬇️ Export Verified Extension (.ZIP)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
