"use client";

import { motion } from "framer-motion";
import { FileSearch } from "lucide-react";
import React from "react";

const CustomHighlight = ({
  children,
  color,
}: {
  color: string;
  children: React.ReactNode;
}) => {
  return (
    <span className="relative inline-block mx-1">
      <motion.span
        className="absolute inset-0 z-0 rounded-sm"
        style={{ backgroundColor: color }}
        initial={{ width: "0%", opacity: 0.3 }}
        animate={{ width: "100%", opacity: 0.5 }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <span className="relative z-10">{children}</span>
    </span>
  );
};

const CustomUnderline = ({
  children,
  color,
}: {
  color: string;
  children: React.ReactNode;
}) => {
  return (
    <span className="relative inline-block mx-1">
      {children}
      <motion.span
        className="absolute -bottom-1 left-0 h-0.5 rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </span>
  );
};

export function LineByLineAssessmentCard() {
  return (
    <div
      className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-[#2563eb]/20 bg-linear-to-br from-[#0f172a] to-zinc-950 p-6 shadow-xl backdrop-blur-sm"
      dir="rtl"
    >
      {/* Decorative background glow (Dark Blue Tone) */}
      <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-[#3b82f6] opacity-15 blur-3xl"></div>

      {/* Header & Typography */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 flex flex-col gap-4"
      >
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2563eb]/20 text-blue-400">
            <FileSearch size={20} strokeWidth={2.5} />
          </div>
          <h3 className="text-base font-bold leading-relaxed text-neutral-100 font-vazirmatn">
            ارزیابی خط‌به‌خط رایتینگ شما توسط دستیار هوشمند.
          </h3>
        </div>
      </motion.div>

      {/* Sample Writing Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-10 mt-6 rounded-xl border border-white/5 bg-white/5 p-4 text-[13px] leading-relaxed text-neutral-300 shadow-inner font-sans"
        dir="ltr"
      >
        <p className="leading-loose">
          The provided chart illustrates the
          <CustomHighlight color="#16a34a">
            substantial fluctuation
          </CustomHighlight>
          in global energy consumption over a decade. However, the data
          <CustomUnderline color="#ef4444">don't demonstrate</CustomUnderline>
          the underlying economic factors clearly.
        </p>
      </motion.div>
    </div>
  );
}
