import { motion, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Maximize2, Minimize2, Sparkles, Cpu, Play } from "lucide-react";

export default function NeuralAiPreview() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-150px" });
  const appUrl = "https://neural-leafv1.lovable.app";

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section id="ai-section" ref={sectionRef} className="relative w-full max-w-7xl mx-auto px-6 py-28 z-10 border-t border-white/5">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-purple-500/15 border border-cyan-400/40 text-cyan-300 text-xs font-mono mb-3 shadow-[0_0_25px_rgba(56,189,248,0.25)]"
        >
          <Sparkles size={14} className="text-cyan-400 animate-pulse" />
          <span className="font-bold tracking-widest uppercase">Powered by Gemini 3.5 Flash</span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black tracking-tight text-white mt-2"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          x-ARM 1.0 — Futuristic AI
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mt-3"
        >
          Direct conversational intelligence and real-time reasoning powered by <strong className="text-cyan-400 font-semibold">Gemini 3.5 Flash</strong>.
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`rounded-3xl border border-cyan-500/40 bg-gradient-to-b from-slate-900/90 via-black/95 to-slate-950/95 backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,0,0,0.95),0_0_50px_rgba(56,189,248,0.25)] overflow-hidden transition-all duration-500 ${
          isExpanded ? "fixed inset-4 z-50 rounded-2xl" : "relative w-full h-[720px] md:h-[820px]"
        }`}
      >
        {/* Frame Top Header */}
        <div className="w-full h-14 bg-slate-950/90 border-b border-white/10 px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            <span className="text-xs font-mono text-gray-400 ml-2 hidden sm:inline-block">
              x-ARM 1.0 · Gemini 3.5 Flash Core
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-xs text-cyan-300 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>x-ARM 1.0 ONLINE</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-cyan-400 transition-all text-xs flex items-center gap-1.5"
              title={isExpanded ? "Minimize" : "Expand to Full Space"}
            >
              {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              <span>{isExpanded ? "Minimize" : "Full Space"}</span>
            </button>
          </div>
        </div>

        {/* Live App Frame / Lazy Mount Container */}
        <div className="w-full h-[calc(100%-3.5rem)] relative bg-black flex items-center justify-center">
          {isLoaded ? (
            <iframe
              src={appUrl}
              title="x-ARM 1.0 AI"
              tabIndex={-1}
              className="w-full h-full border-0"
              allow="camera; microphone; clipboard-write; autoplay; fullscreen"
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 text-center p-8">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shadow-[0_0_30px_rgba(56,189,248,0.3)]">
                <Cpu size={32} className="animate-spin" />
              </div>
              <h3 className="text-xl font-bold text-white">x-ARM 1.0 AI Session</h3>
              <p className="text-xs text-gray-400 max-w-sm">
                Powered by Gemini 3.5 Flash. Scroll here to activate the interactive live session.
              </p>
              <button
                onClick={() => setIsLoaded(true)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs flex items-center gap-2 hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-all"
              >
                <Play size={14} />
                <span>Initialize AI Now</span>
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
