"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCheck,
  Sparkles,
  Zap,
  Layers,
  ArrowRightLeft,
} from "lucide-react";

type CriterionKey = "all" | "lexical" | "cohesion" | "grammar";

export function InteractiveFeedbackDemo() {
  const [activeCriterion, setActiveCriterion] = useState<CriterionKey>("all");

  const criteriaFilters: { id: CriterionKey; label: string }[] = [
    { id: "all", label: "تمام اصلاحات" },
    { id: "lexical", label: "ارتقای واژگان (Band 8+)" },
    { id: "cohesion", label: "انسجام و پیوستگی (Cohesion)" },
    { id: "grammar", label: "ساختارهای پیچیده گرامری" },
  ];

  return (
    <section
      dir="rtl"
      className="w-full py-20 px-4 sm:px-6 md:px-12 bg-linear-to-b from-bg to-bg-dark font-vazirmatn relative border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-medium">
            <Sparkles size={14} />
            <span>مشاهده زنده نحوه عملکرد ایجنت</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            تبدیل رایتینگ Band 6 به شاهکار Band 8.5
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            تغییرات هوشمند ایجنت را بر اساس فیلترهای استاندارد اگزمینر بررسی
            کنید.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {criteriaFilters.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCriterion(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer border ${
                activeCriterion === tab.id
                  ? "bg-primary-600 text-white border-primary-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                  : "bg-white/[0.03] text-neutral-400 border-white/10 hover:text-neutral-200 hover:border-white/20"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Before vs After Dual Pane */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" dir="ltr">
          {/* Original Text Pane */}
          <div className="rounded-2xl border border-red-500/20 bg-red-950/[0.06] p-6 backdrop-blur-md relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-red-500/10 mb-4">
                <span className="text-xs font-mono tracking-wider uppercase text-red-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  Original Submission (Estimated 6.0)
                </span>
                <span className="text-xs bg-red-500/10 text-red-300 px-2 py-0.5 rounded border border-red-500/20 font-mono">
                  Repetitive Lexis
                </span>
              </div>
              <p className="text-neutral-300 leading-relaxed text-sm sm:text-base font-sans">
                Nowadays, pollution is a{" "}
                <span className="bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded line-through decoration-red-400">
                  big problem
                </span>{" "}
                for big cities. Government{" "}
                <span className="bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded line-through decoration-red-400">
                  should make strict rules
                </span>{" "}
                because people keep driving their personal cars everywhere and
                this{" "}
                <span className="bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded line-through decoration-red-400">
                  makes the air very dirty
                </span>
                .
              </p>
            </div>

            <div
              className="mt-6 pt-4 border-t border-white/5 text-xs text-neutral-400 flex items-center justify-between"
              dir="rtl"
            >
              <span>
                ایرادات: واژگان عمومی، افعال ضعیف و عدم ترکیب‌های آکادمیک.
              </span>
            </div>
          </div>

          {/* AI Enhanced Pane */}
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/[0.08] p-6 backdrop-blur-md relative flex flex-col justify-between shadow-[0_0_30px_rgba(16,185,129,0.05)]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-emerald-500/10 mb-4">
                <span className="text-xs font-mono tracking-wider uppercase text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Agent Refactored (Estimated 8.5)
                </span>
                <span className="text-xs bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
                  Lexical Precision
                </span>
              </div>

              <p className="text-neutral-100 leading-relaxed text-sm sm:text-base font-sans">
                In the contemporary era, environmental degradation represents a{" "}
                <span
                  className={`transition-all duration-300 px-1.5 py-0.5 rounded font-semibold ${
                    activeCriterion === "all" || activeCriterion === "lexical"
                      ? "bg-purple-500/30 text-purple-200 border border-purple-500/50 shadow-xs"
                      : "text-neutral-100"
                  }`}
                >
                  pressing dilemma
                </span>{" "}
                plaguing metropolitan hubs. Authorities must{" "}
                <span
                  className={`transition-all duration-300 px-1.5 py-0.5 rounded font-semibold ${
                    activeCriterion === "all" || activeCriterion === "grammar"
                      ? "bg-emerald-500/30 text-emerald-200 border border-emerald-500/50 shadow-xs"
                      : "text-neutral-100"
                  }`}
                >
                  implement stringent statutory frameworks
                </span>
                , given that commuter dependence on private transit{" "}
                <span
                  className={`transition-all duration-300 px-1.5 py-0.5 rounded font-semibold ${
                    activeCriterion === "all" || activeCriterion === "cohesion"
                      ? "bg-sky-500/30 text-sky-200 border border-sky-500/50 shadow-xs"
                      : "text-neutral-100"
                  }`}
                >
                  exacerbates atmospheric contamination exponentially
                </span>
                .
              </p>
            </div>

            <div
              className="mt-6 pt-4 border-t border-white/5 text-xs text-emerald-300 flex items-center justify-between"
              dir="rtl"
            >
              <span className="flex items-center gap-1">
                <CheckCheck size={16} className="text-emerald-400" />
                افزایش دامنه واژگان دانشگاهی و استفاده از افعال قوی
                (Collocations).
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
