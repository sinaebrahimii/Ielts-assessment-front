"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  GraduationCap,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Compass,
  SpellCheck,
  Award,
  ArrowLeft,
  Quote,
} from "lucide-react";

interface Agent {
  id: string;
  badge: string;
  name: string;
  mentorTitle: string;
  themeColor: string;
  glowColor: string;
  lightBg: string;
  borderColor: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  summary: string;
  focusAreas: string[];
  feedbackExample: {
    studentText: string;
    highlightedPart: string;
    suggestion: string;
    mentorNote: string;
  };
}

const agents: Agent[] = [
  {
    id: "task-response",
    badge: "پاسخ به سوال (Task Response)",
    name: "استاد راهنمای ساختار و استدلال",
    mentorTitle: "راهنمای منطق و شفافیت ایده",
    themeColor: "#818cf8", // indigo-400
    glowColor: "rgba(129, 140, 248, 0.15)",
    lightBg: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    borderColor: "border-indigo-500/40",
    icon: Compass,
    summary:
      "مطمئن می‌شود که دقیقا به صورت سوال پاسخ داده‌اید، پاراگراف‌ها با مثال‌های ملموس پشتیبانی شده‌اند و دیدگاه شما در سراسر متن شفاف و پایدار است.",
    focusAreas: [
      "بررسی تک‌تک بخش‌های سوال تسک ۲",
      "پرهیز از کلی‌گویی و ارائه دلایل منسجم",
      "شفافیت دیدگاه و نتیجه‌گیری روشن",
    ],
    feedbackExample: {
      studentText:
        "Many people believe technology makes life easier. However, I think it has negative sides too.",
      highlightedPart: "However, I think it has negative sides too.",
      suggestion:
        "Nevertheless, its adverse ramifications on human interaction cannot be overlooked.",
      mentorNote:
        "موضع خود را از ابتدا با یک بیانیه شفاف (Clear Thesis Statement) بیان کنید تا ممتحن بداند چه روندی را قرار است اثبات کنید.",
    },
  },
  {
    id: "lexical-resource",
    badge: "دایره واژگان (Lexical Resource)",
    name: "مربی واژگان آکادمیک و کالوکیشن",
    mentorTitle: "مشاور زبان طبیعی و لحن دانشگاهی",
    themeColor: "#f472b6", // pink-400
    glowColor: "rgba(244, 114, 182, 0.15)",
    lightBg: "bg-pink-500/10 text-pink-300 border-pink-500/20",
    borderColor: "border-pink-500/40",
    icon: BookOpen,
    summary:
      "عبارات روزمره و تکراری را به ترکیب‌های طبیعی (Collocations) و اصطلاحات متناسب با مقالات آکادمیک ارتقا می‌دهد، بدون آنکه جمله مصنوعی یا ثقیل شود.",
    focusAreas: [
      "کالوکیشن‌های طبیعی به سبک افراد بومی (Native-like)",
      "جلوگیری از تکرار چندباره کلمات کلیدی",
      "دقت مفهومی در انتخاب صفت‌ها و افعال قوی",
    ],
    feedbackExample: {
      studentText:
        "Air pollution is a very serious problem that brings severe danger to health.",
      highlightedPart: "very serious problem that brings severe danger",
      suggestion:
        "pressing dilemma that poses substantial threats to public well-being",
      mentorNote:
        "به جای صفت‌های عمومی مثل 'serious problem'، ترکیب 'pressing dilemma' و کالوکیشن 'poses threats' امتیاز شما را در این بخش تا نمره ۸ ارتقا می‌دهد.",
    },
  },
  {
    id: "cohesion-grammar",
    badge: "دستور زبان و اتصال جملات (GRA & CC)",
    name: "ویراستار گرامر و جریان پیوسته متن",
    mentorTitle: "کنترل روانی خواندن و تنوع ساختاری",
    themeColor: "#34d399", // emerald-400
    glowColor: "rgba(52, 211, 153, 0.15)",
    lightBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    borderColor: "border-emerald-500/40",
    icon: SpellCheck,
    summary:
      "متن شما را از نظر روانی خوانش، تعادل میان جملات ساده و مرکب، و سلامت علائم نگارشی صیقل داده تا ایده شما نرم و بدون لکنت جریان یابد.",
    focusAreas: [
      "استفاده صحیح از حروف ربط و رابط‌های پیوستگی (Cohesive Devices)",
      "ساختارهای پیچیده ایمن (Inversion, Conditionals, Relative clauses)",
      "اصلاح نشانه‌گذاری و فاصله‌گذاری‌های نگارشی",
    ],
    feedbackExample: {
      studentText:
        "People drive cars every day. Therefore traffic increases and this makes delay.",
      highlightedPart: "Therefore traffic increases and this makes delay.",
      suggestion:
        "Consequently, traffic congestion intensifies, leading to widespread commuting delays.",
      mentorNote:
        "با ترکیب دو جمله کوتاه به یک جمله مجهز به participle clause (leading to...)، مهارت خود را در ایجاد ساختارهای مرکب نشان می‌دهید.",
    },
  },
];

export function AgentArchitectureSection() {
  const [activeAgent, setActiveAgent] = useState<Agent>(agents[0]);

  return (
    <section
      dir="rtl"
      className="w-full relative py-20 px-4 sm:px-6 md:px-12 bg-bg-dark font-vazirmatn overflow-hidden border-t border-white/5"
    >
      {/* Subtle academic ambient light */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 opacity-25"
        style={{ backgroundColor: activeAgent.themeColor }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-purple-400/20 bg-purple-900/20 text-purple-200 text-xs sm:text-sm font-medium backdrop-blur-sm"
          >
            <GraduationCap size={16} className="text-purple-300" />
            <span>تیم منتورهای تخصصی برای هر معیار آیلتس</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl font-extrabold text-white leading-snug"
          >
            یک دستیار کلی‌گو نه، بلکه{" "}
            <span className="bg-linear-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent">
              ۳ متخصص همراه
            </span>{" "}
            برای بازخورد به متن شما
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-neutral-300 leading-relaxed"
          >
            همانند میز تصحیح اساتید باسابقه، متن شما تفکیک شده و هر بخش بر اساس
            معیارهای رسمی جدول نمره‌دهی ممتحن (IELTS Band Descriptors) تحلیل
            آموزشی می‌شود.
          </motion.p>
        </div>

        {/* 3 Academic Persona Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {agents.map((agent) => {
            const isSelected = activeAgent.id === agent.id;
            const IconComponent = agent.icon;

            return (
              <motion.div
                key={agent.id}
                whileHover={{ y: -3 }}
                onClick={() => setActiveAgent(agent)}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 backdrop-blur-sm border flex flex-col justify-between relative ${
                  isSelected
                    ? `${agent.borderColor} bg-white/[0.05] shadow-lg`
                    : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.03]"
                }`}
                style={{
                  boxShadow: isSelected
                    ? `0 10px 30px -10px ${agent.glowColor}`
                    : undefined,
                }}
              >
                {/* Active Indicator Line */}
                {isSelected && (
                  <motion.div
                    layoutId="cathovenActiveLine"
                    className="absolute top-0 right-8 left-8 h-1 rounded-b-md"
                    style={{ backgroundColor: agent.themeColor }}
                  />
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="p-3 rounded-xl border flex items-center justify-center transition-colors"
                      style={{
                        backgroundColor: `${agent.themeColor}15`,
                        borderColor: `${agent.themeColor}35`,
                        color: agent.themeColor,
                      }}
                    >
                      <IconComponent size={22} />
                    </div>

                    <span
                      className={`text-[11px] px-2.5 py-0.5 rounded-full border font-medium ${agent.lightBg}`}
                    >
                      {agent.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-neutral-100 mb-1">
                    {agent.name}
                  </h3>
                  <span className="text-xs text-neutral-400 font-normal block mb-3">
                    {agent.mentorTitle}
                  </span>

                  <p className="text-xs sm:text-[13px] text-neutral-300 leading-relaxed">
                    {agent.summary}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/5 space-y-1.5">
                  {agent.focusAreas.map((point, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs text-neutral-300"
                    >
                      <CheckCircle2
                        size={13}
                        style={{ color: agent.themeColor }}
                        className="shrink-0"
                      />
                      <span className="truncate">{point}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Cathoven-style Interactive Teaching Sandbox */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeAgent.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 sm:p-8"
          >
            {/* Box Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <Award size={20} style={{ color: activeAgent.themeColor }} />
                <h4 className="text-sm sm:text-base font-bold text-neutral-100">
                  نمونه یادداشت آموزشی و اصلاحی {activeAgent.name}
                </h4>
              </div>
              <span className="text-xs text-neutral-400">
                بر اساس نمره‌دهی رسمی Cambridge IELTS
              </span>
            </div>

            {/* Split Classroom View */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-start">
              {/* Left Column (Student Text & Enhancement) */}
              <div className="lg:col-span-7 space-y-4" dir="ltr">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                  <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                    Original Draft
                  </span>
                  <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
                    {activeAgent.feedbackExample.studentText.replace(
                      activeAgent.feedbackExample.highlightedPart,
                      "",
                    )}
                    <span className="text-amber-300 bg-amber-400/10 px-1.5 py-0.5 rounded border-b-2 border-amber-400/60 font-medium">
                      {activeAgent.feedbackExample.highlightedPart}
                    </span>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-2">
                  <span
                    className="text-[11px] uppercase tracking-wider font-mono flex items-center gap-1.5"
                    style={{ color: activeAgent.themeColor }}
                  >
                    <Sparkles size={13} />
                    Academic Refinement
                  </span>
                  <p className="text-sm sm:text-base text-neutral-100 font-sans font-medium leading-relaxed">
                    &quot;{activeAgent.feedbackExample.suggestion}&quot;
                  </p>
                </div>
              </div>

              {/* Right Column (Mentor Teaching Note) */}
              <div
                className="lg:col-span-5 flex flex-col justify-between p-5 rounded-xl border border-white/10 bg-white/[0.015]"
                dir="rtl"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Quote
                      size={18}
                      style={{ color: activeAgent.themeColor }}
                    />
                    <span className="text-xs font-bold text-neutral-200">
                      چرا این تغییر نمره شما را بالاتر می‌برد؟
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {activeAgent.feedbackExample.mentorNote}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400">
                  <span>تأثیر در کارنامه آزمون</span>
                  <span
                    className="font-bold flex items-center gap-1"
                    style={{ color: activeAgent.themeColor }}
                  >
                    ارتقا به سطح Band 8+
                    <ArrowLeft size={13} />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
