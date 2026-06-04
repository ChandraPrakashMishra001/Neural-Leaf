import React from 'react';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <motion.div 
      key="privacy"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full min-h-screen bg-black flex flex-col items-center pt-40 pb-24 overflow-hidden px-6 text-neutral-300"
    >
      <div className="relative z-10 max-w-3xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Privacy Policy</h1>
        <div className="space-y-6 text-sm md:text-base leading-relaxed font-light backdrop-blur-md bg-white/5 p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-2xl">
          <p className="text-emerald-400 font-medium">Last updated: June 2026</p>
          <section>
            <h2 className="text-xl text-white font-medium mb-3 mt-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>1. Information We Collect</h2>
            <p>At Neural Leaf, we collect information you provide directly to us when you use our agricultural intelligence services, including BloomSense, BloomChart, and BloomHealth. This may include GPS coordinates, crop images, environmental data, and contact information.</p>
          </section>
          <section>
            <h2 className="text-xl text-white font-medium mb-3 mt-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>2. How We Use Your Information</h2>
            <p>We use the collected data to provide, maintain, and improve our decentralized AI services. Specifically, crop images and GPS data are used to generate hyperlocal outbreak alerts and precision treatment recommendations for the farming community.</p>
          </section>
          <section>
            <h2 className="text-xl text-white font-medium mb-3 mt-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>3. Data Sharing and Decentralization</h2>
            <p>Neural Leaf operates on a collaborative shield model. Verified disease outbreaks are mapped anonymously to alert nearby farmers. We do not sell your personal data to third-party advertisers. Data is encrypted and securely processed via Amania Cloud and decentralized edge nodes.</p>
          </section>
          <section>
            <h2 className="text-xl text-white font-medium mb-3 mt-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>4. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us directly at <a href="mailto:mishrac373@gmail.com" className="text-emerald-400 hover:underline">mishrac373@gmail.com</a>.</p>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
