"use client";

import { motion } from "framer-motion";
import { Target } from "lucide-react";

export function AssessmentCard() {
  const rubrics = [
    "Task Response",
    "Coherence & Cohesion",
    "Lexical Resource",
    "Grammatical Range",
  ];

  return (
    <div
      className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-[#ea580c]/20 bg-gradient-to-br from-[#2a1d18] to-zinc-950 p-6 shadow-xl backdrop-blur-sm"
      dir="rtl"
    >
      {/* Decorative background glow (Pinch of Orange) */}
      <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-[#ea580c] opacity-15 blur-3xl"></div>

      {/* Header & Typography */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 flex flex-col gap-4"
      >
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ea580c]/20 text-orange-400">
            <Target size={20} strokeWidth={2.5} />
          </div>
          <h3 className="text-base font-bold leading-relaxed text-neutral-100 font-vazirmatn">
            ساختار، گرامر و دایره لغات خود را با استانداردهای واقعی آیلتس
            بسنجید.
          </h3>
        </div>
      </motion.div>

      {/* Animated Rubrics Badges */}
      <div className="relative z-10 mt-6 flex flex-wrap gap-2" dir="ltr">
        {rubrics.map((rubric, index) => (
          <motion.span
            key={rubric}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
              delay: index * 0.7, // Staggers the fading effect between badges
            }}
            className="rounded-full border border-orange-500/30 bg-orange-950/40 px-3 py-1.5 text-xs font-medium tracking-wide text-orange-200"
          >
            {rubric}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
