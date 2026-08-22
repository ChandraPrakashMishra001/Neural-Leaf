import { motion } from "framer-motion";

export default function SlabArchitecture() {
  const layers = [
    {
      layer: "Layer 0",
      tag: "EXPLORE",
      title: "🔭 Explore",
      desc: "Live sandboxed Playwright session. Explores unfamiliar websites, inspects DOM elements, and maps network endpoints.",
      accent: "from-blue-500/20 to-cyan-500/10",
      border: "border-blue-500/30",
      color: "text-sky-400"
    },
    {
      layer: "Layer 1",
      tag: "LEARN",
      title: "🧠 Learn",
      desc: "Preserves endpoint graphs, authentication cookies, and DOM selector memory for persistent re-use.",
      accent: "from-purple-500/20 to-indigo-500/10",
      border: "border-purple-500/30",
      color: "text-purple-400"
    },
    {
      layer: "Layer 2",
      tag: "ADAPT",
      title: "🛠️ Adapt",
      desc: "Synthesizes reliable TypeScript CLI adapters with structured -f json output schemas.",
      accent: "from-emerald-500/20 to-teal-500/10",
      border: "border-emerald-500/30",
      color: "text-emerald-400"
    },
    {
      layer: "Layer 3",
      tag: "AUTOMATE",
      title: "⚡ Automate",
      desc: "Instant deterministic execution via webcmd <site> -f json with up to 98% token reduction.",
      accent: "from-rose-500/20 to-orange-500/10",
      border: "border-rose-500/30",
      color: "text-rose-400"
    }
  ];

  return (
    <section id="loop-section" className="relative w-full max-w-7xl mx-auto px-6 py-28 z-10 border-t border-white/5">
      <div className="text-center mb-16">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase font-mono"
        >
          Core Philosophy
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black tracking-tight text-white mt-2"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          4-Layer Self-Learning Architecture
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mt-3"
        >
          Explore once. Learn the workflow. Reuse the command deterministically.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {layers.map((l, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className={`rounded-3xl border ${l.border} bg-gradient-to-b ${l.accent} bg-black/60 backdrop-blur-xl p-7 flex flex-col justify-between shadow-2xl relative overflow-hidden group`}
          >
            <div className="absolute top-0 right-0 px-4 py-2 bg-white/5 rounded-bl-2xl border-l border-b border-white/10 font-mono text-[10px] tracking-widest uppercase text-gray-400">
              {l.tag}
            </div>
            <div>
              <span className={`text-xs font-black tracking-wider uppercase font-mono ${l.color}`}>
                {l.layer}
              </span>
              <h3 className="text-2xl font-bold text-white mt-2 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {l.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {l.desc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
              <span>Deterministic</span>
              <span className="font-mono text-cyan-400 font-semibold">98% Savings</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
