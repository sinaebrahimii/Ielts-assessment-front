"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Award,
  BookOpen,
  SpellCheck,
  Compass,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

type ActiveCriterion = "tr" | "lr" | "gra";

interface CriterionData {
  id: ActiveCriterion;
  titleFa: string;
  nameEn: string;
  score: string;
  color: string;
  borderClass: string;
  bgBadgeClass: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  original: string;
  enhanced: string;
  examinerNote: string;
}

const criteriaList: CriterionData[] = [
  {
    id: "lr",
    titleFa: "دایره واژگان آکادمیک",
    nameEn: "Lexical Resource",
    score: "8.5",
    color: "#f472b6", // pink-400
    borderClass: "border-pink-500/40",
    bgBadgeClass: "bg-pink-500/10 text-pink-300 border-pink-500/30",
    icon: BookOpen,
    original: "is a very big issue for modern countries",
    enhanced: "constitutes a formidable impediment to sustainable growth",
    examinerNote:
      "جایگزینی عبارت محاوره‌ای 'big issue' با کالوکیشن آکادمیک و ساختار دقیق.",
  },
  {
    id: "tr",
    titleFa: "استدلال و پاسخ به سوال",
    nameEn: "Task Response",
    score: "8.0",
    color: "#818cf8", // indigo-400
    borderClass: "border-indigo-500/40",
    bgBadgeClass: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30",
    icon: Compass,
    original: "I think that both opinions have good points.",
    enhanced:
      "While merit exists in both perspectives, empirical evidence favors the latter.",
    examinerNote:
      "ارائه بیانیه تز شفاف (Clear Thesis) و پرهیز از لحن غیررسمی شخصی.",
  },
  {
    id: "gra",
    titleFa: "تنوع گرامر و صحت ساختاری",
    nameEn: "Grammatical Range",
    score: "8.0",
    color: "#34d399", // emerald-400
    borderClass: "border-emerald-500/40",
    bgBadgeClass: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    icon: SpellCheck,
    original: "Cities become crowded and people get late.",
    enhanced:
      "Urban centers become congested, precipitating extensive commuting delays.",
    examinerNote:
      "کاربرد ساختار مجهز به Participle Clause و پیوستگی بی‌نقص ایده.",
  },
];

export function HeroExaminerStudio() {
  const [selectedCriterion, setSelectedCriterion] =
    useState<ActiveCriterion>("lr");
  const current =
    criteriaList.find((c) => c.id === selectedCriterion) ?? criteriaList[0];

  return (
    <div
      dir="rtl"
      className="w-full max-w-4xl mx-auto rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden font-vazirmatn text-right"
    >
      {/* Header bar / Window Chrome */}
      <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 ml-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <span className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
            <Sparkles size={14} className="text-purple-400" />
            شبیه‌ساز ارزیابی زنده اگزمینر رسمی آیلتس
          </span>
        </div>

        {/* Live Score Counter Card */}
        <div className="flex items-center gap-2 bg-purple-500/15 border border-purple-500/30 px-3 py-1 rounded-full">
          <TrendingUp size={13} className="text-purple-300" />
          <span className="text-xs text-purple-200 font-medium">
            نمره پیش‌بینی شده:
          </span>
          <span className="text-xs font-black font-mono text-white bg-purple-600 px-1.5 py-0.2 rounded">
            Band 8.5
          </span>
        </div>
      </div>

      {/* Main Content: Split Studio */}
      <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Side (Rubrics Controller) */}
        <div className="lg:col-span-4 space-y-2.5">
          <span className="text-[11px] font-semibold text-neutral-400 block mb-1">
            معیارهای رسمی ارزیابی (کلیک کنید):
          </span>
          {criteriaList.map((criterion) => {
            const isSelected = selectedCriterion === criterion.id;
            const Icon = criterion.icon;

            return (
              <button
                key={criterion.id}
                type="button"
                onClick={() => setSelectedCriterion(criterion.id)}
                className={`w-full p-3 rounded-xl border text-right transition-colors cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? "border-purple-500/50 bg-white/[0.06] shadow-sm"
                    : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04] text-neutral-400"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center border"
                    style={{
                      backgroundColor: `${criterion.color}15`,
                      borderColor: `${criterion.color}35`,
                      color: criterion.color,
                    }}
                  >
                    <Icon size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-100">
                      {criterion.titleFa}
                    </h4>
                    <span className="text-[10px] text-neutral-400 font-mono block">
                      {criterion.nameEn}
                    </span>
                  </div>
                </div>

                <span
                  className="text-xs font-mono font-bold px-2 py-0.5 rounded border"
                  style={{
                    color: criterion.color,
                    borderColor: `${criterion.color}35`,
                    backgroundColor: `${criterion.color}10`,
                  }}
                >
                  {criterion.score}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Side (Active Inspection Box) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="space-y-3.5"
            >
              {/* English Essay Passage LTR */}
              <div
                dir="ltr"
                className="p-4 sm:p-5 rounded-2xl bg-white/[0.025] border border-white/10 space-y-3 font-sans"
              >
                <div className="flex items-center justify-between text-xs pb-2 border-b border-white/5">
                  <span className="font-mono text-neutral-400 text-[11px] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                    Student Submission (Task 2 Sample)
                  </span>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-md border font-mono ${current.bgBadgeClass}`}
                  >
                    {current.nameEn}
                  </span>
                </div>

                <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  <span>
                    It is widely argued that environmental degradation{" "}
                  </span>
                  <span className="bg-red-500/20 text-red-300 px-1 py-0.5 rounded line-through decoration-red-400 font-normal">
                    {current.original}
                  </span>
                  <span>.</span>
                </div>

                {/* Refined Band 8.5 Snippet */}
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-start gap-2">
                  <Award
                    size={16}
                    className="text-purple-400 shrink-0 mt-0.5"
                  />
                  <div className="text-xs sm:text-[13px] text-purple-100 font-medium leading-relaxed">
                    <span className="text-purple-300 text-[11px] uppercase tracking-wider block font-mono">
                      Refined by Examiner Agent:
                    </span>
                    &ldquo;{current.enhanced}&rdquo;
                  </div>
                </div>
              </div>

              {/* Teaching Explanatory Note RTL */}
              <div className="p-3 sm:p-3.5 rounded-xl border border-white/5 bg-white/[0.015] flex items-center justify-between text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: current.color }}
                  />
                  <span>{current.examinerNote}</span>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-purple-300 font-medium">
                  افزایش تراز
                  <ArrowUpRight size={13} />
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
