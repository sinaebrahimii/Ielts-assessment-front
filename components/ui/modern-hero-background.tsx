"use client";

import React from "react";
import { motion } from "motion/react";

export function ModernHeroBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10">
      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Primary Hardware-Accelerated Ambient Glows */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.35, 0.5, 0.35],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-gradient-to-tr from-purple-600/30 via-indigo-600/25 to-pink-500/20 blur-[130px] transform-gpu will-change-transform"
      />

      {/* Secondary Dynamic Spotlight Accent */}
      <motion.div
        animate={{
          x: [-20, 20, -20],
          y: [-10, 15, -10],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-24 right-1/4 w-[450px] h-[300px] rounded-full bg-indigo-500/20 blur-[110px] transform-gpu will-change-transform"
      />

      {/* Bottom Fade to blend seamlessly with next section */}
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-bg-dark to-transparent" />
    </div>
  );
}
