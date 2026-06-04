import { ShaderAnimation } from '@/components/ui/shader-animation';
import { SparklesCore } from '@/components/ui/sparkles';
import { SplineScene } from '@/components/ui/splite';
import { Spotlight } from '@/components/ui/spotlight';
import { LiquidHoverButton } from '@/components/ui/button-1';
import { AuroraBackground } from '@/components/ui/aurora-background';
import AnimatedTextCycle from '@/components/ui/animated-text-cycle';
import WhyChooseBloomSense from '@/components/ui/why-choose-bloomsense';
import BloomSenseFeatures from '@/components/ui/bloomsense-features';
import { AuroraHero } from '@/components/ui/futuristic-hero-section';
import PrivacyPolicy from '@/components/ui/privacy-policy';
import TermsOfService from '@/components/ui/terms-of-service';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import Lenis from 'lenis';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'farmer' | 'privacy' | 'terms'>('home');
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const [isAiMenuOpen, setIsAiMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const productMenuRef = useRef<HTMLDivElement>(null);
  const aiMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (productMenuRef.current && !productMenuRef.current.contains(event.target as Node)) {
        setIsProductMenuOpen(false);
      }
      if (aiMenuRef.current && !aiMenuRef.current.contains(event.target as Node)) {
        setIsAiMenuOpen(false);
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
      <nav className="absolute top-6 left-1/2 -translate-x-1/2 w-[98%] max-w-[1600px] h-20 rounded-full glass-liquid-nav z-20 flex items-center justify-start gap-16 px-10">
        {/* Logo Area */}
        <div 
          className="flex items-center h-full gap-3 relative cursor-pointer"
          onClick={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="h-10 w-10 rounded-full overflow-hidden flex items-center justify-center shadow-md relative z-10">
            <img 
              src="/images.jpeg" 
              alt="Neural Leaf Logo" 
              className="h-full w-full object-cover"
            />
          </div>
          <span 
            className="text-[22px] tracking-tight text-white relative z-10"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span className="font-semibold">Neural</span> <span className="font-light">Leaf</span>
          </span>
        </div>
        
        {/* Right side Buttons */}
        <div className="hidden lg:flex items-center gap-6 mr-0 z-50">
          <div 
            className="relative" 
            ref={productMenuRef}
            onMouseEnter={() => setIsProductMenuOpen(true)}
            onMouseLeave={() => setIsProductMenuOpen(false)}
          >
            <LiquidHoverButton 
              className="h-10 min-w-[120px]" 
            >
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
                  className="absolute top-full left-0 pt-4 w-[600px] z-50"
                >
                  <div className="rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col md:flex-row w-full h-full">
                  {/* Left Column */}
                  <div className="w-full md:w-5/12 p-8 border-b md:border-b-0 md:border-r border-white/10 bg-white/[0.02]">
                    <h3 
                      className="text-2xl font-normal text-white leading-snug"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Explore our next<br/>generation products
                    </h3>
                  </div>

                  {/* Right Column */}
                  <div className="w-full md:w-7/12 py-8 px-10">
                    <h4 className="text-[14px] text-gray-400 mb-6 font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Products</h4>
                    <div className="flex flex-col gap-4">
                      <a 
                        href="https://bloomsense.co.in" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-4 group hover:bg-white/5 -ml-4 p-4 rounded-xl transition-colors"
                        onClick={() => setIsProductMenuOpen(false)}
                      >
                        <svg viewBox="0 0 24 24" fill="#C0C0C0" className="w-5 h-5 opacity-90" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C7.5 2 2 7 2 13c0 4.5 3 6.5 5.5 8.5C9 23 12 24 12 24s3-1 4.5-2.5C19 19.5 22 17.5 22 13 22 7 16.5 2 12 2z" />
                        </svg>
                        <div className="flex flex-col">
                          <span 
                            className="text-base font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-gray-400 to-slate-300 leading-tight"
                          >
                            BloomSense
                          </span>
                          <span className="text-[10px] text-gray-400 tracking-[0.1em] uppercase font-medium mt-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            (Agricultural AI)
                          </span>
                        </div>
                      </a>
                    </div>
                  </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div 
            className="relative" 
            ref={aiMenuRef}
            onMouseEnter={() => setIsAiMenuOpen(true)}
            onMouseLeave={() => setIsAiMenuOpen(false)}
          >
            <LiquidHoverButton className="h-10 min-w-[140px]">
              AI Interfaces
              <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-300 ${isAiMenuOpen ? '-rotate-180' : 'rotate-0'}`} />
            </LiquidHoverButton>
            <AnimatePresence>
              {isAiMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 pt-4 w-[600px] z-50"
                >
                  <div className="rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col md:flex-row w-full h-full">
                    {/* Left Column */}
                  <div className="w-full md:w-5/12 p-8 border-b md:border-b-0 md:border-r border-white/10 bg-white/[0.02]">
                    <h3 
                      className="text-2xl font-normal text-white leading-snug"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Experience<br/>specialized intelligence
                    </h3>
                  </div>

                  {/* Right Column */}
                  <div className="w-full md:w-7/12 py-8 px-10">
                    <h4 className="text-[14px] text-gray-400 mb-6 font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>AI Interfaces</h4>
                    <div className="flex flex-col gap-4">
                      <a 
                        href="https://cpmishra.lovable.app" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-4 group hover:bg-white/5 -ml-4 p-4 rounded-xl transition-colors"
                        onClick={() => setIsAiMenuOpen(false)}
                      >
                        <svg viewBox="0 0 24 24" fill="#C0C0C0" className="w-5 h-5 opacity-90" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C7.5 2 2 7 2 13c0 4.5 3 6.5 5.5 8.5C9 23 12 24 12 24s3-1 4.5-2.5C19 19.5 22 17.5 22 13 22 7 16.5 2 12 2z" />
                        </svg>
                        <div className="flex flex-col">
                          <span 
                            className="text-base font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-gray-400 to-slate-300 leading-tight"
                          >
                            Amania AI
                          </span>
                          <span className="text-[10px] text-gray-400 tracking-[0.1em] uppercase font-medium mt-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            (Agricultural AI)
                          </span>
                        </div>
                      </a>
                    </div>
                  </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="ml-auto hidden lg:block z-50">
          <a href="mailto:mishrac373@gmail.com">
            <LiquidHoverButton className="h-10 min-w-[120px]">
              Contact
            </LiquidHoverButton>
          </a>
        </div>
        
        {/* Mobile Hamburger Icon */}
        <div className="ml-auto lg:hidden z-50">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2 focus:outline-none">
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
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center pt-24 pb-10 px-6 gap-10"
          >
            <a 
              href="https://bloomsense.co.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-3xl font-light tracking-wide text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              BloomSense
            </a>
            <button 
              onClick={() => { setCurrentPage('farmer'); setIsMobileMenuOpen(false); window.scrollTo(0,0); }} 
              className="text-3xl font-light tracking-wide text-white"
            >
              AI Interfaces
            </button>
            <a 
              href="mailto:mishrac373@gmail.com"
              className="text-3xl font-light tracking-wide text-white mt-8"
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
              <div className="absolute -inset-[100px] z-0 pointer-events-none transform scale-150 md:scale-125">
                <ShaderAnimation />
              </div>

              {/* Main Content Area */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center text-white w-full max-w-6xl pt-20">
        
        {/* Main Quote with CSS Chrome Effect */}
        <motion.h1 
          className="text-5xl md:text-8xl font-normal tracking-normal mb-2 text-chrome animate-chrome-shimmer py-4"
          style={{ fontFamily: "'Great Vibes', cursive", paddingBottom: "0.2em" }}
          initial={{ clipPath: 'inset(-20% 50% -20% 50%)', opacity: 0 }}
          animate={{ clipPath: 'inset(-20% -10% -20% -10%)', opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          One Core Ecosystem.<br className="hidden md:block"/> Endless Ways to Bloom.
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
          className="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
        >
          Neural Leaf is the central engine for next-generation intelligence. By bridging the gap between advanced neural architecture and real-world diagnostics, we power a connected network of specialized ecosystems—from precision agriculture and human health to real-time analytics. We don't just build software; we engineer platforms that grow.
        </motion.p>
      </div>
      </section>

      {/* Second Section: 3D Interactive Hero with Aurora */}
      <section className="relative w-full h-[100dvh] md:h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
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
          <div className="absolute top-10 left-0 p-8 md:p-10 lg:pl-20 md:relative md:top-auto z-20 flex flex-col justify-start md:justify-center text-left w-full md:w-1/2 pointer-events-none">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              variants={{
                visible: { transition: { staggerChildren: 0.5, delayChildren: 0.6 } },
                hidden: {}
              }}
              className="space-y-12 pointer-events-auto"
            >
              {[
                { title: 'Thinks.', desc: 'processes in real time' },
                { title: 'Adapts.', desc: 'learns from every input' },
                { title: 'Decides.', desc: 'without human delay' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: -40 },
                    visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: "easeOut" } }
                  }}
                  className="flex flex-col"
                >
                  <h3 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-300 to-neutral-600 mb-1 md:mb-2">{item.title}</h3>
                  <p className="text-sm md:text-xl text-neutral-400 font-light uppercase tracking-[0.2em]">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Animated Text (Overlay) */}
          <div className="absolute bottom-10 right-0 p-8 md:h-full md:bottom-auto md:p-10 lg:pr-20 z-20 flex flex-col justify-end md:justify-center items-end text-right w-full md:w-1/2 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.2, delay: 1.0, ease: "easeOut" }}
              className="pointer-events-auto max-w-lg"
            >
              <h2 className="text-3xl md:text-5xl font-extralight text-white leading-tight tracking-wide">
                <span className="opacity-70">Redefining the</span> <br className="hidden md:block" /> 
                <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-500">boundaries of</span> <br/>
                <div className="mt-3">
                  <AnimatedTextCycle 
                    words={[
                      "Agriculture.",
                      "Healthcare.",
                      "Communication."
                    ]}
                    interval={3000}
                    className="pb-3 pr-2 font-semibold italic bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500 drop-shadow-lg" 
                  />
                </div>
              </h2>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Third Section: Professional Black with Sparkling Crystals */}
      <section className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden border-t border-white/5">
        
        {/* Full-screen Sparkles Background */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <SparklesCore
            id="tsparticles-section3"
            background="transparent"
            minSize={0.5}
            maxSize={1.5}
            particleDensity={60}
            className="w-full h-full"
            particleColor="#FFFFFF"
            isStatic={true}
          />
        </div>

        <BloomSenseFeatures />
      </section>

      {/* Fourth Section: Aurora Hero Ending */}
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
            {/* Full-screen Sparkles Background */}
            <div className="absolute inset-0 z-0 w-full h-full">
              <SparklesCore
                id="tsparticles-farmer"
                background="transparent"
                minSize={0.5}
                maxSize={1.5}
                particleDensity={150}
                className="w-full h-full"
                particleColor="#FFFFFF"
              />
            </div>
            
            <WhyChooseBloomSense />
          </motion.div>
        ) : currentPage === 'privacy' ? (
          <PrivacyPolicy key="privacy" />
        ) : currentPage === 'terms' ? (
          <TermsOfService key="terms" />
        ) : null}
      </AnimatePresence>

      {/* Footer / Bottom Header */}
      <footer className="w-full bg-[#020617] border-t border-white/10 py-8 flex flex-col items-center justify-center text-neutral-400">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-8 rounded-full overflow-hidden flex items-center justify-center">
            <img src="/images.jpeg" alt="Logo" className="h-full w-full object-cover" />
          </div>
          <span className="text-xl tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <span className="font-semibold">Neural</span> <span className="font-light">Leaf</span>
          </span>
        </div>
        <p className="text-sm font-light">© 2026 Neural Leaf Ecosystem. All rights reserved.</p>
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
