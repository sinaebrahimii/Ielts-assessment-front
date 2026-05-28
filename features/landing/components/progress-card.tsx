"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";

export function ProgressCard() {
  return (
    <div
      className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-[#413185]/20 bg-gradient-to-br from-[#1b1633] to-zinc-950 p-6 shadow-xl backdrop-blur-sm"
      dir="rtl"
    >
      {/* Decorative background glow */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#4f27ff] opacity-10 blur-3xl"></div>

      {/* Header & Typography */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 flex flex-col gap-3"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#413185]/30 text-indigo-300">
            <Activity size={20} strokeWidth={2.5} />
          </div>
          <h3 className="text-xl font-bold text-neutral-100 font-vazirmatn">
            گزارشات پیشرفت
          </h3>
        </div>
        <p className="text-sm font-medium leading-relaxed text-neutral-400 font-vazirmatn">
          روند پیشرفت خود را به صورت لحظه ای ببینید !
        </p>
      </motion.div>

      {/* Animated Line Chart */}
      <div className="relative z-10 mt-6 h-24 w-full">
        <svg
          className="h-full w-full overflow-visible"
          viewBox="0 0 200 80"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          <line
            x1="0"
            y1="20"
            x2="200"
            y2="20"
            stroke="#ffffff08"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <line
            x1="0"
            y1="60"
            x2="200"
            y2="60"
            stroke="#ffffff08"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* Infinite Animated Line */}
          <motion.path
            d="M0 70 Q 30 70, 50 50 T 100 40 T 150 20 T 200 5"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.5 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />

          {/* Infinite Animated Data Point */}
          <motion.circle
            cx="200"
            cy="5"
            r="4"
            fill="#c4b5fd"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]"
          />
        </svg>
      </div>
    </div>
  );
}
