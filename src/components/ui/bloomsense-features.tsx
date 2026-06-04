import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Leaf } from 'lucide-react';
import { ButtonColorful } from '@/components/ui/button-colorful';

export default function BloomSenseFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center start"]
  });

  // "bloomsense which vanishes" - fade it out as you scroll past
  const titleOpacity = useTransform(scrollYProgress, [0.3, 0.6], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0.3, 0.6], [0, -50]);

  return (
    <div ref={containerRef} className="relative z-10 w-full max-w-[1200px] mx-auto px-4 md:px-6 py-16 md:py-32 flex flex-col items-center">
      
      {/* Top Title that vanishes on scroll */}
      <motion.div 
        style={{ opacity: titleOpacity, y: titleY }}
        className="mb-16 w-full relative z-20 flex justify-center items-center"
      >
        <h2 
          className="text-white text-5xl md:text-[100px] font-light tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Meet BloomSense
        </h2>
      </motion.div>

      {/* Main Container */}
      <div className="w-full flex flex-col md:flex-row gap-6 items-stretch">
        
        {/* Left Side: Glassmorphism Design Box */}
        <motion.div 
          initial={{ opacity: 0, x: -50, rotateY: -10 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ perspective: 1000 }}
          className="w-full md:w-5/12 relative rounded-[2.5rem] p-6 md:p-10 flex flex-col justify-between overflow-hidden group shadow-[0_32px_64px_rgba(0,0,0,0.5)] transform transition-all duration-500 hover:scale-[1.01]"
        >
          {/* Glass Base & Borders */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-black/20 backdrop-blur-3xl border border-white/20 group-hover:border-emerald-500/20 transition-all duration-500 z-0 rounded-[2.5rem] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.5)]"></div>
          
          {/* Reflective Shine */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000 -translate-x-full group-hover:translate-x-full z-0 pointer-events-none rounded-[2.5rem]"></div>
          
          <div className="relative z-10">
            {/* New Logo matching uploaded image */}
            <div className="w-16 h-16 rounded-full bg-[#E8D9D9] flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(232,217,217,0.15)] border border-white/10">
              <Leaf className="w-8 h-8 text-[#0a8c54]" strokeWidth={2.5} />
            </div>
            
            <h3 className="text-3xl text-white font-medium mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              What is BloomSense?
            </h3>
            <p className="text-emerald-100/60 leading-relaxed font-light mb-8 text-sm md:text-base">
              A decentralized, edge-AI diagnostics ecosystem that puts frontier computer vision directly into the hands of farmers, turning raw crop feeds into immediate, clinical-grade actions.
            </p>

            <h3 className="text-2xl text-white font-medium mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Why choose us
            </h3>
            <ul className="space-y-6 relative pl-6">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/0 via-emerald-500/50 to-emerald-500/0"></div>
              {[
                {
                  title: "Instant crop analysis",
                  desc: "Get immediate, expert agronomic advice right in the field."
                },
                {
                  title: "Hyperlocal warning networks",
                  desc: "A community alerts one another dynamically, minimizing regional crop losses."
                },
                {
                  title: "Precision recommendations",
                  desc: "Farmers apply only what is needed, reducing input costs by up to 40%."
                },
                {
                  title: "Weather integration",
                  desc: "Treatment plans adapt dynamically to upcoming weather conditions."
                }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-emerald-100/70 font-light text-sm">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-emerald-300 font-medium block mb-1">{item.title}</strong>
                    <p className="leading-relaxed text-[13px]">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Right Side: Features List */}
        <div className="w-full md:w-7/12 relative flex flex-col gap-5">
          <div className="absolute inset-0 pointer-events-none z-0" style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(34,197,94,0.08) 0%, transparent 60%)' }}></div>
          
          {[
            {
              number: "01",
              title: "AI Diagnostics",
              desc: "Detect over 500 crop pathogens with 98.4% clinical accuracy in under 500 milliseconds."
            },
            {
              number: "02",
              title: "Outbreak Alerts",
              desc: "Receive real-time push alerts when verified diseases are logged by other farms within a 5km radius."
            },
            {
              number: "03",
              title: "Precision Treatment",
              desc: "Get dosage-specific, phase-appropriate biochemical recipes tailored to exact soil and crop stages."
            },
            {
              number: "04",
              title: "Meteorological Sync",
              desc: "Anticipate pest risks by cross-referencing live weather patterns with your unique crop calendar."
            },
            {
              number: "05",
              title: "Experience BloomSense",
              desc: "Launch the live decentralized edge-AI platform. Click here to open the BloomSense application now.",
              link: "https://bloomsense.co.in"
            }
          ].map((feature, idx) => {
            const CardWrapper = feature.link ? motion.a : motion.div;
            return (
            <CardWrapper 
              href={feature.link}
              target={feature.link ? "_blank" : undefined}
              rel={feature.link ? "noopener noreferrer" : undefined}
              key={idx}
              initial={{ opacity: 0, y: 60, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: "easeOut" }}
              style={{ transformPerspective: 1000 }}
              className="group relative w-full p-6 md:p-8 overflow-hidden z-10 flex flex-col justify-center cursor-pointer transition-all duration-500
                         bg-gradient-to-br from-white/10 to-white/[0.01] backdrop-blur-[24px] border border-white/20 rounded-[24px]
                         shadow-[0_16px_40px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_-1px_1px_rgba(0,0,0,0.3)]
                         hover:shadow-[0_20px_50px_rgba(34,197,94,0.15),inset_0_1px_2px_rgba(255,255,255,0.6)]
                         hover:-translate-y-2 hover:scale-[1.02] hover:border-emerald-500/40"
            >
              {/* Reflective Diagonal Shine */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transform -translate-x-full group-hover:translate-x-full z-0" style={{ transition: 'all 0.8s ease' }}></div>
              
              <span 
                className="absolute top-2 left-4 text-7xl font-bold text-emerald-500/10 pointer-events-none select-none transition-colors duration-300 group-hover:text-emerald-500/20 z-0"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {feature.number}
              </span>
              
              <div className="relative z-10 pl-2">
                <h4 className="text-xl text-white font-bold mb-2 transition-colors duration-300" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {feature.title}
                </h4>
                <p className="text-[14px] text-gray-400 font-light leading-relaxed transition-colors duration-300">
                  {feature.desc}
                </p>
                {feature.link && (
                  <div className="mt-6">
                    <ButtonColorful label="Launch Platform" className="rounded-full !bg-white/5 border border-white/10 pointer-events-none" />
                  </div>
                )}
              </div>
            </CardWrapper>
          )})}
        </div>

      </div>
    </div>
  );
}
