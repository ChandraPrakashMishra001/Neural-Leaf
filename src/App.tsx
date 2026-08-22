import { ShaderAnimation } from '@/components/ui/shader-animation';
import { SparklesCore } from '@/components/ui/sparkles';
import { SplineScene } from '@/components/ui/splite';
import { Spotlight } from '@/components/ui/spotlight';
import { LiquidHoverButton } from '@/components/ui/button-1';
import { AuroraBackground } from '@/components/ui/aurora-background';
import AnimatedTextCycle from '@/components/ui/animated-text-cycle';
import { AuroraHero } from '@/components/ui/futuristic-hero-section';
import SlabProblem from '@/components/ui/slab-problem';
import SlabArchitecture from '@/components/ui/slab-architecture';
import SlabVoiceAgent from '@/components/ui/slab-voice-agent';
import SlabToolkit from '@/components/ui/slab-toolkit';
import SlabExtension from '@/components/ui/slab-extension';
import PrivacyPolicy from '@/components/ui/privacy-policy';
import TermsOfService from '@/components/ui/terms-of-service';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import Lenis from 'lenis';
import logoImg from '@/assets/image.jpg';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'farmer' | 'privacy' | 'terms'>('home');
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const productMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (productMenuRef.current && !productMenuRef.current.contains(event.target as Node)) {
        setIsProductMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    
    return () => {
      lenis.destroy();
    }
  }, []);

  return (
    <div className="dark relative w-full min-h-screen overflow-x-hidden bg-black">
      {/* Liquid Reflective Glass Navigation Bar */}
      <nav className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1600px] h-20 glass-liquid-nav z-20 flex items-center justify-start gap-16 px-10 rounded-b-3xl">
        {/* Logo Area */}
        <div 
          className="flex items-center h-full gap-3 relative cursor-pointer"
          onClick={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="h-10 w-10 rounded-full overflow-hidden flex items-center justify-center shadow-lg relative z-10 border border-white/20 bg-white/5">
            <img 
              src={logoImg} 
              alt="Neural Logo" 
              className="h-full w-full object-cover"
            />
          </div>
          <span 
            className="text-[24px] tracking-tight text-white relative z-10"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span className="font-bold tracking-tight">Neural</span>
          </span>
        </div>
        
        {/* Navigation Links from user design */}
        <div className="hidden lg:flex items-center gap-8 ml-4 z-50">
          <button 
            onClick={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-[16px] font-semibold text-white/90 hover:text-white transition-colors tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Home
          </button>
          
          <button 
            onClick={() => {
              const el = document.getElementById('problem-section') || document.getElementById('about');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' });
            }}
            className="text-[16px] font-semibold text-white/80 hover:text-white transition-colors tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Problem
          </button>

          <button 
            onClick={() => {
              const el = document.getElementById('loop-section') || document.getElementById('architecture');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else window.scrollTo({ top: window.innerHeight * 1.6, behavior: 'smooth' });
            }}
            className="text-[16px] font-semibold text-white/80 hover:text-white transition-colors tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            4-Layer Loop
          </button>

          <button 
            onClick={() => {
              const el = document.getElementById('voice-section') || document.getElementById('agent-demo');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else window.scrollTo({ top: window.innerHeight * 2.4, behavior: 'smooth' });
            }}
            className="text-[16px] font-semibold text-white/80 hover:text-white transition-colors tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Voice Agent
          </button>

          <button 
            onClick={() => {
              const el = document.getElementById('toolkit-section') || document.getElementById('toolkit');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else window.scrollTo({ top: window.innerHeight * 3.2, behavior: 'smooth' });
            }}
            className="text-[16px] font-semibold text-white/80 hover:text-white transition-colors tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Toolkit
          </button>

          {/* Product Dropdown for Chrome Extension */}
          <div 
            className="relative ml-2" 
            ref={productMenuRef}
            onMouseEnter={() => setIsProductMenuOpen(true)}
            onMouseLeave={() => setIsProductMenuOpen(false)}
          >
            <LiquidHoverButton className="h-10 min-w-[120px]">
              Product
              <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-300 ${isProductMenuOpen ? '-rotate-180' : 'rotate-0'}`} />
            </LiquidHoverButton>
            <AnimatePresence>
              {isProductMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 pt-4 w-[480px] z-50"
                >
                  <div className="rounded-2xl border border-white/10 bg-black/80 backdrop-blur-2xl shadow-2xl overflow-hidden p-6 w-full">
                    <h4 className="text-[13px] text-gray-400 mb-4 font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Products & Tools</h4>
                    <a 
                      href="/slab-agent-extension.zip" 
                      download="slab-agent-extension.zip" 
                      className="flex items-center gap-4 group hover:bg-white/5 p-3 rounded-xl transition-colors border border-white/5 hover:border-sky-500/30"
                      onClick={() => setIsProductMenuOpen(false)}
                    >
                      <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 font-bold text-lg shadow-[0_0_15px_rgba(56,189,248,0.35)]">
                        ⬇️
                      </div>
                      <div className="flex flex-col">
                        <span className="text-base font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-sky-400 leading-tight">
                          Chrome Extension (.ZIP)
                        </span>
                        <span className="text-[11px] text-gray-400 tracking-[0.08em] uppercase font-medium mt-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          (Voice & Autonomous Webcmd Agent)
                        </span>
                      </div>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="ml-auto hidden lg:flex items-center gap-4 z-50">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-cyan-500/30 text-xs text-gray-200 backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.15)] font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-bold text-white tracking-wide">IEEE VSSUT SB</span>
            <span className="text-cyan-400 font-semibold">×</span>
            <span className="font-bold text-sky-300">webcmd</span>
          </div>

          <a href="mailto:mishrac373@gmail.com">
            <LiquidHoverButton className="h-10 min-w-[110px]">
              Contact
            </LiquidHoverButton>
          </a>
        </div>
        
        {/* Mobile Hamburger Icon */}
        <div className="ml-auto lg:hidden z-50">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2 focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center pt-24 pb-10 px-6 gap-8"
          >
            <button 
              onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-2xl font-light tracking-wide text-white"
            >
              Home
            </button>
            <button 
              onClick={() => { setIsMobileMenuOpen(false); window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' }); }}
              className="text-2xl font-light tracking-wide text-white"
            >
              Problem
            </button>
            <button 
              onClick={() => { setIsMobileMenuOpen(false); window.scrollTo({ top: window.innerHeight * 1.6, behavior: 'smooth' }); }}
              className="text-2xl font-light tracking-wide text-white"
            >
              4-Layer Loop
            </button>
            <button 
              onClick={() => { setIsMobileMenuOpen(false); window.scrollTo({ top: window.innerHeight * 2.4, behavior: 'smooth' }); }}
              className="text-2xl font-light tracking-wide text-white"
            >
              Voice Agent
            </button>
            <button 
              onClick={() => { setIsMobileMenuOpen(false); window.scrollTo({ top: window.innerHeight * 3.2, behavior: 'smooth' }); }}
              className="text-2xl font-light tracking-wide text-white"
            >
              Toolkit
            </button>
            <a 
              href="/slab-agent-extension.zip" 
              download="slab-agent-extension.zip" 
              className="text-2xl font-light tracking-wide text-sky-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Chrome Extension (.ZIP)
            </a>
            <a 
              href="mailto:mishrac373@gmail.com"
              className="text-2xl font-light tracking-wide text-gray-400 mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {currentPage === 'home' ? (
          <motion.div 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col items-center"
          >
            {/* First Section: Main Page */}
            <section className="relative w-full h-[100dvh] md:h-screen flex flex-col items-center justify-center overflow-hidden">
              {/* Background Shader Animation (restricted to first section) */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <ShaderAnimation />
              </div>

              {/* Main Content Area */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 md:px-6 text-center text-white w-full max-w-6xl pt-24 md:pt-20">
        
        {/* Main Quote with CSS Chrome Effect */}
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-8xl font-normal tracking-normal mb-2 text-chrome animate-chrome-shimmer py-4"
          style={{ fontFamily: "'Great Vibes', cursive", paddingBottom: "0.2em" }}
          initial={{ clipPath: 'inset(-20% 50% -20% 50%)', opacity: 0 }}
          animate={{ clipPath: 'inset(-20% -10% -20% -10%)', opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          One Neural Canvas.<br className="hidden md:block"/> Endless Worlds to Explore.
        </motion.h1>

        {/* Sparkles Divider */}
        <div className="w-full max-w-3xl h-24 relative mb-6">
          {/* Gradients */}
          <div className="absolute inset-x-[10%] top-0 bg-gradient-to-r from-transparent via-white to-transparent h-[2px] w-[80%] blur-sm" />
          <div className="absolute inset-x-[10%] top-0 bg-gradient-to-r from-transparent via-white to-transparent h-px w-[80%]" />
          <div className="absolute inset-x-[30%] top-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent h-[5px] w-[40%] blur-sm" />
          <div className="absolute inset-x-[30%] top-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent h-px w-[40%]" />

          {/* Core component */}
          <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(ellipse_at_top,white,transparent_80%)]">
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={80}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />
          </div>
        </div>

        {/* Paragraph */}
        <motion.p 
          className="text-sm sm:text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
        >
          Intelligent autonomous agents that explore websites, learn workflows, and execute deterministic browser tasks with voice navigation and <strong>98% token reduction</strong>.
        </motion.p>

        {/* SLAB Branding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.1, ease: 'easeOut' }}
          className="flex flex-col items-center justify-center mt-2"
        >
          <span 
            className="text-2xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-indigo-400 tracking-[0.45em] uppercase font-mono pl-3"
            style={{ fontFamily: "'Space Grotesk', monospace" }}
          >
            S &nbsp;L &nbsp;A &nbsp;B
          </span>
          <span className="text-xs sm:text-sm font-medium tracking-[0.25em] text-neutral-400 uppercase mt-2">
            Self Learning Agent Browser
          </span>
        </motion.div>
      </div>
      </section>

      {/* Second Section: 3D Interactive Hero with Aurora */}
      <section className="cv-auto relative w-full h-[100dvh] md:h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 pointer-events-none hidden md:block">
          <AuroraBackground className="w-full h-full bg-black dark:bg-black" />
        </div>
        
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        
        <div className="relative h-full w-full max-w-[1600px] z-10 flex items-center">
          
          {/* Main 3D content (Centered) */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-auto"
            initial={{ scale: 2.8, x: 0, y: 20, opacity: 0 }}
            whileInView={{ scale: 1, x: 0, y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </motion.div>

          {/* Left Animated Text (Overlay) */}
          <div className="absolute top-[5.5rem] left-0 p-5 md:p-10 lg:pl-20 md:relative md:top-auto z-20 flex flex-col justify-start md:justify-center text-left w-full md:w-1/2 pointer-events-none">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              variants={{
                visible: { transition: { staggerChildren: 0.5, delayChildren: 0.6 } },
                hidden: {}
              }}
              className="space-y-4 md:space-y-12 pointer-events-auto"
            >
              {[
                { title: 'Explores.', desc: 'sandboxed playwright DOM sessions' },
                { title: 'Learns.', desc: 'endpoint graphs & auth memory' },
                { title: 'Automates.', desc: 'sub-second CLI execution' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: -40 },
                    visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: "easeOut" } }
                  }}
                  className="flex flex-col"
                >
                  <h3 className="text-3xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-300 to-neutral-600 mb-0.5 md:mb-2">{item.title}</h3>
                  <p className="text-xs md:text-xl text-neutral-400 font-light uppercase tracking-[0.2em]">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Animated Text (Overlay) */}
          <div className="absolute bottom-6 right-0 p-5 md:h-full md:bottom-auto md:p-10 lg:pr-20 z-20 flex flex-col justify-end md:justify-center items-end text-right w-full md:w-1/2 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.2, delay: 1.0, ease: "easeOut" }}
              className="pointer-events-auto max-w-lg"
            >
              <h2 className="text-2xl md:text-5xl font-extralight text-white leading-tight tracking-wide">
                <span className="opacity-70">Redefining the</span> <br className="hidden md:block" /> 
                <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-500">boundaries of</span> <br/>
                <div className="mt-3">
                  <AnimatedTextCycle 
                    words={[
                      "Browser Automation.",
                      "Voice Navigation.",
                      "Token Reduction.",
                      "Self-Learning Agents."
                    ]}
                    interval={2800}
                    className="pb-3 pr-2 font-semibold italic bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-400 drop-shadow-lg" 
                  />
                </div>
              </h2>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SLAB Sections 3, 4, 5, 6, 7 with Cosmic Starfield Backdrop */}
      <div className="cv-auto relative bg-black">
        <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
          <SparklesCore
            id="tsparticles-sections-3-7"
            background="transparent"
            minSize={0.5}
            maxSize={1.8}
            particleDensity={60}
            className="w-full h-full"
            particleColor="#FFFFFF"
            isStatic={true}
          />
        </div>

        {/* Section 3: Problem Statement */}
        <SlabProblem />

        {/* Section 4: 4-Layer Architecture */}
        <SlabArchitecture />

        {/* Section 5: Live Voice Browser Agent Arena */}
        <SlabVoiceAgent />

        {/* Section 6: Developer Toolkit */}
        <SlabToolkit />

        {/* Section 7: Chrome Extension & MCP */}
        <SlabExtension />
      </div>

      {/* Last Section of Old Website: Aurora Hero Ending */}
      <AuroraHero />
          </motion.div>
        ) : currentPage === 'farmer' ? (
          <motion.div 
            key="farmer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full min-h-screen bg-black flex flex-col items-center pt-32 pb-24 overflow-hidden"
          >
            <SlabVoiceAgent />
          </motion.div>
        ) : currentPage === 'privacy' ? (
          <PrivacyPolicy key="privacy" />
        ) : currentPage === 'terms' ? (
          <TermsOfService key="terms" />
        ) : null}
      </AnimatePresence>

      {/* Footer */}
      <footer className="w-full bg-[#020617] border-t border-white/10 py-8 flex flex-col items-center justify-center text-neutral-400">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-9 w-9 rounded-full overflow-hidden flex items-center justify-center shadow-md border border-white/20 bg-white/5">
            <img src={logoImg} alt="Neural Logo" className="h-full w-full object-cover" />
          </div>
          <span className="text-xl tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <span className="font-bold">Neural</span> <span className="font-light text-cyan-400">Agent</span>
          </span>
        </div>
        <p className="text-sm font-light">© 2026 IEEE VSSUT SB × webcmd (Host). Autonomous AI Browser Agents.</p>
        <div className="flex gap-6 mt-4 text-xs tracking-wider uppercase">
          <button onClick={() => { setCurrentPage('privacy'); window.scrollTo(0,0); }} className="hover:text-white transition-colors uppercase tracking-wider">Privacy Policy</button>
          <button onClick={() => { setCurrentPage('terms'); window.scrollTo(0,0); }} className="hover:text-white transition-colors uppercase tracking-wider">Terms of Service</button>
          <a href="mailto:mishrac373@gmail.com" className="hover:text-white transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
