import { motion } from "framer-motion";
import { downloadExtensionZip } from "@/utils/extensionDownloader";

export default function SlabExtension() {
  return (
    <section id="extension-section" className="relative w-full max-w-7xl mx-auto px-6 py-28 z-10 border-t border-white/5">
      <motion.div 
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="rounded-3xl border border-sky-500/40 bg-gradient-to-br from-slate-900/90 via-black/95 to-slate-950/90 backdrop-blur-2xl p-8 sm:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(56,189,248,0.2)] flex flex-col lg:flex-row items-center justify-between gap-10"
      >
        <div className="flex-1">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">
            Browser Extension v1.0.0
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-2 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            SLAB AI Voice Extension
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl">
            Install the autonomous voice assistant directly into Google Chrome. Features Web Speech STT/TTS, active tab text summarization, streaming typewriter chat, custom skills CRUD, and MCP tool orchestration.
          </p>

          <div className="flex flex-col gap-3 mt-6">
            {[
              "1. Download and extract slab-agent-extension.zip",
              "2. Open chrome://extensions/ and toggle Developer Mode",
              "3. Click Load unpacked and select the extracted folder"
            ].map((step, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-xs shrink-0">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="shrink-0">
          <a
            href="/slab-extension.zip"
            download="slab-extension.zip"
            onClick={(e) => downloadExtensionZip('slab-extension.zip', e)}
            className="px-8 py-5 bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 text-white font-black text-lg rounded-2xl shadow-[0_0_40px_rgba(56,189,248,0.6)] hover:scale-105 hover:shadow-[0_0_60px_rgba(56,189,248,0.9)] transition-all flex items-center gap-3 border border-white/30 cursor-pointer"
          >
            <span>⬇️ Download Extension (.ZIP)</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
