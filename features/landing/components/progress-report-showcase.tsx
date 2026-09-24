"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Flame,
  BookOpen,
  Sparkles,
  TrendingUp,
  Award,
  CheckCircle2,
  CalendarCheck,
  Zap,
} from "lucide-react";

// Mock Progress Data across 6 consecutive evaluation essays
const scoreHistoryData = [
  { essay: "مقاله ۱", overall: 6.0, tr: 6.0, lr: 5.5, gra: 6.0, cc: 6.5 },
  { essay: "مقاله ۲", overall: 6.5, tr: 6.5, lr: 6.0, gra: 6.5, cc: 6.5 },
  { essay: "مقاله ۳", overall: 6.5, tr: 6.5, lr: 6.5, gra: 6.5, cc: 7.0 },
  { essay: "مقاله ۴", overall: 7.0, tr: 7.0, lr: 7.0, gra: 7.0, cc: 7.0 },
  { essay: "مقاله ۵", overall: 7.5, tr: 7.5, lr: 7.5, gra: 7.0, cc: 7.5 },
  { essay: "مقاله ۶", overall: 8.0, tr: 8.0, lr: 8.5, gra: 7.5, cc: 8.0 },
];

const vocabularyGrowthData = [
  { week: "هفته ۱", collocations: 18, c1Words: 12 },
  { week: "هفته ۲", collocations: 34, c1Words: 26 },
  { week: "هفته ۳", collocations: 58, c1Words: 44 },
  { week: "هفته ۴", collocations: 89, c1Words: 72 },
  { week: "هفته ۵", collocations: 124, c1Words: 98 },
  { week: "هفته ۶", collocations: 168, c1Words: 135 },
];

const scoreChartConfig = {
  overall: {
    label: "نمره کلی (Overall Band)",
    color: "#a855f7", // purple-500
  },
  lr: {
    label: "واژگان (Lexical Resource)",
    color: "#f472b6", // pink-400
  },
  tr: {
    label: "استدلال (Task Response)",
    color: "#818cf8", // indigo-400
  },
} satisfies ChartConfig;

const vocabChartConfig = {
  collocations: {
    label: "کالوکیشن‌های فعال آکادمیک",
    color: "#a855f7",
  },
  c1Words: {
    label: "لغات سطح C1/C2 ثبت‌شده",
    color: "#34d399", // emerald-400
  },
} satisfies ChartConfig;

export function ProgressReportShowcase() {
  const [metricView, setMetricView] = useState<"overall" | "criteria">(
    "overall",
  );

  return (
    <div
      dir="rtl"
      className="w-full max-w-6xl mx-auto rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-5 sm:p-8 space-y-8 font-vazirmatn text-right shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
    >
      {/* Top Banner: Quick User Metric KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1: Streak */}
        <div className="p-4 rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] backdrop-blur-sm relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-amber-200/80 font-medium">
              استمرار تمرین
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Flame size={17} className="animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black font-mono text-white">
                ۲۱
              </span>
              <span className="text-xs text-amber-300">روز پیوسته</span>
            </div>
            <span className="text-[11px] text-neutral-400 mt-1 block">
              رتبه برتر ۷٪ داوطلبان منظم
            </span>
          </div>
        </div>

        {/* Metric 2: Mastered Collocations */}
        <div className="p-4 rounded-2xl border border-purple-500/20 bg-purple-500/[0.04] backdrop-blur-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-purple-200/80 font-medium">
              کالوکیشن‌های ملکه شده
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <BookOpen size={17} />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black font-mono text-white">
                ۱۶۸
              </span>
              <span className="text-xs text-emerald-400 font-mono font-bold">
                +۳۸ این هفته
              </span>
            </div>
            <span className="text-[11px] text-neutral-400 mt-1 block">
              استفاده طبیعی در ۴ مقاله اخیر
            </span>
          </div>
        </div>

        {/* Metric 3: Score Progress */}
        <div className="p-4 rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.04] backdrop-blur-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-indigo-200/80 font-medium">
              جهش نمره تخمینی
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <TrendingUp size={17} />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black font-mono text-white">
                8.0
              </span>
              <span className="text-xs text-purple-300 font-mono">
                از 6.0 اولیه
              </span>
            </div>
            <span className="text-[11px] text-neutral-400 mt-1 block">
              رشد +۲.۰ نمره در ۶ مقاله
            </span>
          </div>
        </div>

        {/* Metric 4: Grammar Accuracy */}
        <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] backdrop-blur-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-emerald-200/80 font-medium">
              کاهش خطاهای گرامری
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Zap size={17} />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black font-mono text-white">
                ۸۲٪
              </span>
              <span className="text-xs text-emerald-300">دقت ساختاری</span>
            </div>
            <span className="text-[11px] text-neutral-400 mt-1 block">
              میانگین کمتر از ۲ خطا در هر تسک
            </span>
          </div>
        </div>
      </div>

      {/* Main Visuals Grid: Area Chart + Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Primary Chart: Score Progression Area Chart */}
        <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
            <div>
              <div className="flex items-center gap-2">
                <Award size={18} className="text-purple-400" />
                <h4 className="text-sm sm:text-base font-bold text-neutral-100">
                  تحلیل صعود نمره در طول زمان
                </h4>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                تغییرات مرحله‌به‌مرحله نمره بر اساس استانداردهای رسمی کمبریج
              </p>
            </div>

            {/* Toggle Filters */}
            <div className="flex items-center gap-1 p-1 bg-white/[0.04] rounded-lg border border-white/5 self-start sm:self-center">
              <button
                type="button"
                onClick={() => setMetricView("overall")}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  metricView === "overall"
                    ? "bg-purple-600 text-white font-medium"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                نمره کل
              </button>
              <button
                type="button"
                onClick={() => setMetricView("criteria")}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  metricView === "criteria"
                    ? "bg-purple-600 text-white font-medium"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                معیارهای تفکیکی
              </button>
            </div>
          </div>

          {/* shadcn Area Chart */}
          <div className="w-full pt-2" dir="ltr">
            <ChartContainer
              config={scoreChartConfig}
              className="h-64 sm:h-72 w-full"
            >
              <AreaChart
                data={scoreHistoryData}
                margin={{ top: 12, right: 12, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="scoreOverallGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient
                    id="scoreLrGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#f472b6" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#f472b6" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient
                    id="scoreTrGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="rgba(255,255,255,0.06)"
                />
                <XAxis
                  dataKey="essay"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  stroke="#a3a3a3"
                  fontSize={11}
                />
                <YAxis
                  domain={[5.0, 9.0]}
                  ticks={[5.0, 6.0, 7.0, 8.0, 9.0]}
                  tickLine={false}
                  axisLine={false}
                  stroke="#a3a3a3"
                  fontSize={11}
                />
                <ChartTooltip content={<ChartTooltipContent />} />

                {metricView === "overall" ? (
                  <Area
                    type="natural"
                    dataKey="overall"
                    stroke="#a855f7"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#scoreOverallGradient)"
                    dot={{
                      fill: "#a855f7",
                      stroke: "#000",
                      strokeWidth: 2,
                      r: 4,
                    }}
                    activeDot={{ r: 6, fill: "#c084fc", stroke: "#fff" }}
                  />
                ) : (
                  <>
                    <Area
                      type="natural"
                      dataKey="lr"
                      stroke="#f472b6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#scoreLrGradient)"
                    />
                    <Area
                      type="natural"
                      dataKey="tr"
                      stroke="#818cf8"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#scoreTrGradient)"
                    />
                  </>
                )}
              </AreaChart>
            </ChartContainer>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between text-xs text-neutral-400 border-t border-white/5">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              پیش‌بینی اگزمینر برای آزمون نهایی:{" "}
              <strong className="text-white font-mono">Band 7.5 - 8.0</strong>
            </span>
            <span className="text-[11px] text-neutral-500">
              به‌روزرسانی خودکار پس از هر ثبت مقاله
            </span>
          </div>
        </div>

        {/* Secondary Chart: Vocabulary & Collocation Accumulation */}
        <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 space-y-4">
          <div className="pb-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-pink-400" />
              <h4 className="text-sm sm:text-base font-bold text-neutral-100">
                گنجینه واژگان و کالوکیشن‌ها
              </h4>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              تعداد عبارات آکادمیک که به شکل فعال در رایتینگ‌ها به کار گرفته‌اید
            </p>
          </div>

          {/* Bar Chart */}
          <div className="w-full pt-2" dir="ltr">
            <ChartContainer
              config={vocabChartConfig}
              className="h-64 sm:h-72 w-full"
            >
              <BarChart
                data={vocabularyGrowthData}
                margin={{ top: 12, right: 12, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="rgba(255,255,255,0.06)"
                />
                <XAxis
                  dataKey="week"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  stroke="#a3a3a3"
                  fontSize={11}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  stroke="#a3a3a3"
                  fontSize={11}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="collocations"
                  fill="#a855f7"
                  radius={[4, 4, 0, 0]}
                  barSize={14}
                />
                <Bar
                  dataKey="c1Words"
                  fill="#34d399"
                  radius={[4, 4, 0, 0]}
                  barSize={14}
                />
              </BarChart>
            </ChartContainer>
          </div>

          {/* Legend */}
          <div className="pt-2 flex items-center justify-between text-xs text-neutral-400 border-t border-white/5">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-purple-500" />
                کالوکیشن آکادمیک
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400" />
                واژگان پیشرفته (C1/C2)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Insights Note */}
      <div className="rounded-xl border border-purple-500/20 bg-purple-500/[0.05] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-300">
        <div className="flex items-center gap-2.5">
          <CalendarCheck size={18} className="text-purple-300 shrink-0" />
          <span>
            سیستم گزارش‌دهی هوشمند پس از هر مقاله، تکرار اشتباهات گذشته را رصد
            کرده و برای تسک بعدی تمرین اختصاصی پیشنهاد می‌دهد.
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-purple-300 font-bold shrink-0">
          <CheckCircle2 size={15} />
          <span>هماهنگ با فرمت آزمون کامپیوتری و کاغذی</span>
        </div>
      </div>
    </div>
  );
}
