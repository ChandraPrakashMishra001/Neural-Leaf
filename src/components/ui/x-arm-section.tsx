import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';


const TITLE_CHARS = ['x', '-', 'A', 'R', 'M', '1', '.', '0'];

export default function XArmSection() {
  const [glitch, setGlitch] = useState(false);

  // Trigger a glitch burst every 5 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 400);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative w-full bg-black flex flex-col items-center overflow-hidden border-t border-white/5 pb-28">


      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-8 pt-20 md:pt-28 flex flex-col items-center">

        {/* Pulsing badge */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-10 inline-flex items-center gap-2.5 rounded-full border border-violet-500/40 bg-violet-950/50 backdrop-blur-sm px-5 py-2 shadow-[0_0_24px_rgba(139,92,246,0.15)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
          </span>
          <span
            className="text-[11px] font-semibold tracking-[0.3em] text-violet-300 uppercase"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Neural Leaf AI Interface
          </span>
        </motion.div>

        {/* x-ARM1.0 — character-by-character 3D flip-in */}
        <div className="mb-5 overflow-visible" style={{ perspective: '1200px' }}>
          <div
            className={`flex items-baseline justify-center flex-wrap gap-0 ${glitch ? 'xarm-glitch' : ''}`}
          >
            {TITLE_CHARS.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 80, rotateX: -90 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.65,
                  delay: 0.08 + i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block font-black tracking-tighter leading-none select-none
                           bg-gradient-to-b from-white via-violet-200 to-violet-600
                           bg-clip-text text-transparent"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(4rem, 14vw, 11rem)',
                  lineHeight: 1,
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Scan-line underline */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-lg h-px mb-10 origin-left"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.8), rgba(139,92,246,0.3), transparent)',
          }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
          className="text-center text-sm md:text-lg text-violet-200/55 max-w-2xl mb-16 font-light leading-relaxed"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          An advanced AI reasoning interface built on the Neural Leaf core architecture.
          <br className="hidden md:block" />
          Experience x-ARM1.0 live — interact directly below.
        </motion.p>

        {/* iframe — glass browser mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl relative"
        >
          {/* Ambient glow */}
          <div
            className="absolute -inset-2 rounded-[2.2rem] pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.2) 0%, rgba(99,102,241,0.08) 50%, transparent 70%)',
              filter: 'blur(24px)',
            }}
          />

          {/* Glass frame */}
          <div
            className="relative rounded-[2rem] border border-white/10 overflow-hidden
                       shadow-[0_32px_80px_rgba(139,92,246,0.12),inset_0_1px_1px_rgba(255,255,255,0.15)]"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {/* Fake browser chrome */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.07] bg-white/[0.02]">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-white/15" />
                <div className="h-3 w-3 rounded-full bg-white/15" />
                <div className="h-3 w-3 rounded-full bg-white/15" />
              </div>
              <div className="flex-1 mx-3 h-6 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center gap-2 px-3">
                <span className="h-2.5 w-2.5 rounded-full border border-violet-400/50 flex items-center justify-center">
                  <span className="h-1 w-1 rounded-full bg-violet-400/60" />
                </span>
                <span className="text-[11px] text-white/25 font-mono tracking-wide">
                  neural-leafv1.lovable.app
                </span>
              </div>
            </div>

            {/* The iframe */}
            <div className="w-full" style={{ height: '680px' }}>
              <iframe
                src="https://neural-leafv1.lovable.app"
                className="w-full h-full border-0 block"
                title="x-ARM1.0 — Neural Leaf AI Interface"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; microphone; camera; fullscreen"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
