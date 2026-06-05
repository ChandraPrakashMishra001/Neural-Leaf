import { SparklesCore } from "./sparkles";
import React, { useEffect } from "react";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export const AuroraHero = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #000000 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative grid w-full min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
    >
      <div className="relative z-20 flex flex-col items-start px-6 md:px-24 w-full max-w-7xl mx-auto h-full justify-center pb-16 md:pb-32">
        <span className="mb-4 inline-block rounded-full bg-emerald-900/50 border border-emerald-500/30 px-4 py-1.5 text-sm font-medium tracking-wide text-emerald-200">
          The Neural Leaf Network
        </span>
        <h1 className="max-w-4xl bg-gradient-to-br from-white to-neutral-400 bg-clip-text text-left text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight pb-2">
          One Core. Endless Growth.
        </h1>
      </div>

      {/* Massive Antigravity-style Footer Text */}
      <div className="absolute bottom-0 left-0 w-full flex justify-center items-end overflow-hidden pointer-events-none z-10 translate-y-[15%]">
        <h1 
          className="text-[20vw] font-medium tracking-[-0.06em] text-white leading-[0.8] select-none opacity-90"
          style={{ fontFamily: "'Inter', sans-serif, system-ui" }}
        >
          Neural leaf
        </h1>
      </div>

      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
        <SparklesCore
          id="tsparticles-section4"
          background="transparent"
          minSize={0.5}
          maxSize={1.5}
          particleDensity={150}
          className="w-full h-full"
          particleColor="#FFFFFF"
          isStatic={true}
        />
      </div>
    </motion.section>
  );
};
