import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function WhyChooseBloomSense() {
  return (
    <section id="farmer-use-case" className="py-24 px-6 lg:px-12 max-w-[1400px] mx-auto bg-transparent relative z-10">
      {/* Header Container */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12">
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-5xl text-white tracking-tight mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Why farmers choose BloomSense
          </h2>
          <p className="text-base text-emerald-100/70 max-w-xl leading-relaxed font-light">
            BloomSense elevates agricultural yields and crop security, ensuring unparalleled peace of mind through clinical-grade AI scanning and hyperlocal community warning systems.
          </p>
        </div>
        
        {/* Explore Button */}
        <button 
          onClick={() => {
            const el = document.getElementById('technology');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="self-start px-6 py-3 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 font-bold text-sm rounded-full transition-all shadow-sm flex items-center gap-1.5"
        >
          Explore product <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* 3-Column Card Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Card 1 */}
        <div className="flex flex-col">
          <div className="relative aspect-[4/3] bg-gradient-to-b from-emerald-500/[0.03] to-emerald-500/[0.08] hover:from-emerald-500/[0.06] hover:to-emerald-500/[0.12] border border-emerald-900/30 rounded-[2.5rem] flex items-center justify-center p-8 overflow-hidden transition-all duration-300 group shadow-inner">
            <img 
              src="/leaf_scanner_ui_mockup.png" 
              alt="Diagnostics and Verification Mockup"
              className="max-h-[85%] object-contain rounded-2xl shadow-2xl shadow-emerald-900/20 border border-white/10 transform group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
          <h3 className="text-2xl text-white mt-6 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Diagnostics and Verification
          </h3>
          <p className="text-sm text-emerald-100/60 leading-relaxed font-light">
            Scan crops instantly in the field. Our multi-model consensus AI verifies disease signatures and provides actionable treatment recipes to restore plant health with 98.4% diagnostic accuracy.
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col">
          <div className="relative aspect-[4/3] bg-gradient-to-b from-emerald-500/[0.03] to-emerald-500/[0.08] hover:from-emerald-500/[0.06] hover:to-emerald-500/[0.12] border border-emerald-900/30 rounded-[2.5rem] flex items-center justify-center p-8 overflow-hidden transition-all duration-300 group shadow-inner">
            <img 
              src="/farm_alert_map_mockup.png" 
              alt="Hyperlocal Collaboration Mockup"
              className="max-h-[85%] object-contain rounded-2xl shadow-2xl shadow-emerald-900/20 border border-white/10 transform group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
          <h3 className="text-2xl text-white mt-6 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Hyperlocal Collaboration
          </h3>
          <p className="text-sm text-emerald-100/60 leading-relaxed font-light">
            Get instant warning alerts of nearby outbreaks logged within 5 km. Work together with neighboring farms to isolate and protect your crops before the infection spreads.
          </p>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col">
          <div className="relative aspect-[4/3] bg-gradient-to-b from-emerald-500/[0.03] to-emerald-500/[0.08] hover:from-emerald-500/[0.06] hover:to-emerald-500/[0.12] border border-emerald-900/30 rounded-[2.5rem] flex items-center justify-center p-8 overflow-hidden transition-all duration-300 group shadow-inner">
            <img 
              src="/crop_calendar_mockup.png" 
              alt="Weather to Calendar Insights Mockup"
              className="max-h-[85%] object-contain rounded-2xl shadow-2xl shadow-emerald-900/20 border border-white/10 transform group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
          <h3 className="text-2xl text-white mt-6 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Weather to Calendar Insights
          </h3>
          <p className="text-sm text-emerald-100/60 leading-relaxed font-light">
            Link real-time meteorology with crop stages. Anticipate temperature-driven risks and maintain task lists for critical agricultural interventions.
          </p>
        </div>

      </div>
    </section>
  );
}
