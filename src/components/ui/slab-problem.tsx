import { motion } from "framer-motion";

export default function SlabProblem() {
  return (
    <section id="problem-section" className="relative w-full max-w-7xl mx-auto px-6 py-28 z-10">
      <div className="text-center mb-12">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase font-mono"
        >
          Hackathon Brief
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black tracking-tight text-white mt-2"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          The Challenge & Mandate
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mt-3"
        >
          Official Problem Statement for SLAB Hackathon 2026 hosted by Webcmd at VSSUT.
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl border border-sky-500/30 bg-gradient-to-br from-slate-900/80 via-black/90 to-slate-950/90 backdrop-blur-2xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(56,189,248,0.15)] flex flex-col md:flex-row items-center gap-8 mb-8"
      >
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-3xl shrink-0 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          🎯
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
            Official Problem Statement
          </span>
          <p className="text-lg md:text-2xl text-slate-100 font-normal leading-relaxed mt-1">
            Build an <strong className="text-white font-bold">AI-powered Browser Agent</strong> that can explore websites, learn real-world workflows, and reliably automate and reuse those workflows with <strong className="text-cyan-400 font-bold">structured outputs</strong>.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: "✅", title: "GitHub Account", desc: "Mandatory entry repo requirement" },
          { icon: "⚡", title: "Webcmd Integration", desc: "Layered CLI adapter synthesis" },
          { icon: "👥", title: "Team Registration", desc: "Full team verified for submission" },
          { icon: "⏱️", title: "Hackathon Window", desc: "Official deadline countdown" }
        ].map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 hover:border-cyan-500/40 hover:bg-white/[0.06] transition-all"
          >
            <div className="text-2xl mb-2">{item.icon}</div>
            <h4 className="text-white font-bold text-base">{item.title}</h4>
            <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
