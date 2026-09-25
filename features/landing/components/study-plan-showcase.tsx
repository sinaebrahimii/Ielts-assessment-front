"use client";

import React, { useMemo, useState } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Target,
  BookOpen,
  GitBranch,
  PenLine,
  Clock,
  Gauge,
  Flag,
  CalendarCheck,
  Sparkles,
} from "lucide-react";

// ------------------------------------------------------------------
// Static config
// ------------------------------------------------------------------

const CURRENT_OPTIONS = [5.0, 5.5, 6.0, 6.5, 7.0];
const TARGET_OPTIONS = [6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0];
const WEEKS_OPTIONS = [4, 6, 8, 12];

const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
const toFa = (value: number) =>
  String(value)
    .split("")
    .map((ch) => (/\d/.test(ch) ? FA_DIGITS[Number(ch)] : ch))
    .join("");

const formatBand = (value: number) => value.toFixed(1);

type CriterionKey = "tr" | "cc" | "lr" | "gra";

const CRITERIA_META: Record<
  CriterionKey,
  {
    label: string;
    shortLabel: string;
    icon: React.ElementType;
    color: string;
    offset: number; // typical gap from overall band for this criterion today
    focus: string[];
  }
> = {
  tr: {
    label: "پاسخ به سؤال",
    shortLabel: "Task Response",
    icon: Target,
    color: "#818cf8",
    offset: 0,
    focus: [
      "تحلیل دقیق نوع سؤال پیش از شروع نگارش، برای پوشش کامل تمام بخش‌های آن",
      "تمرین ساخت پاراگراف مقدمه با بیان روشن دیدگاه شخصی",
      "افزودن مثال و شواهد مشخص به‌جای جملات کلی و عمومی",
    ],
  },
  cc: {
    label: "انسجام و پیوستگی",
    shortLabel: "Coherence & Cohesion",
    icon: GitBranch,
    color: "#22d3ee",
    offset: 0.5,
    focus: [
      "استفاده متنوع از ابزارهای ربط به‌جای تکرار «Moreover» و «In addition»",
      "تمرین تقسیم منطقی مقاله به پاراگراف‌های تک‌ایده",
      "بررسی ارجاعات ضمیری (this, it, these) برای جلوگیری از ابهام",
    ],
  },
  lr: {
    label: "دامنه واژگان",
    shortLabel: "Lexical Resource",
    icon: BookOpen,
    color: "#f472b6",
    offset: -0.5,
    focus: [
      "جایگزینی واژگان پرتکرار روزمره با کالوکیشن‌های آکادمیک متناسب با موضوع",
      "تمرین هفتگی پارافریز جملات سؤال با حفظ معنا",
      "کنترل غلط‌های املایی و کاربرد نادرست واژگان شبه‌مترادف",
    ],
  },
  gra: {
    label: "دامنه و دقت گرامری",
    shortLabel: "Grammatical Range & Accuracy",
    icon: PenLine,
    color: "#34d399",
    offset: -0.5,
    focus: [
      "تمرین متمرکز روی جملات مرکب و شرطی برای افزایش تنوع ساختاری",
      "مرور خطاهای تکرارشونده در Subject-Verb Agreement و زمان افعال",
      "تمرین کنترل نقطه‌گذاری در جملات پیچیده و بندهای وابسته",
    ],
  },
};

const PHASES = [
  {
    title: "ارزیابی و پایه‌ریزی",
    description:
      "تحلیل ۲ مقاله اولیه برای شناسایی دقیق نقاط ضعف در هر چهار معیار و تعیین اولویت تمرین.",
  },
  {
    title: "تقویت واژگان و گرامر",
    description:
      "تمرین متمرکز روی کالوکیشن‌های آکادمیک و ساختارهای گرامری پرتکرار در تسک ۱ و تسک ۲.",
  },
  {
    title: "انسجام و پاسخ‌گویی دقیق",
    description:
      "نگارش مقالات کامل با تمرکز بر پیوستگی پاراگراف‌ها و پوشش کامل خواسته‌های سؤال.",
  },
  {
    title: "شبیه‌سازی نهایی آزمون",
    description:
      "نگارش زمان‌دار مطابق شرایط واقعی آزمون و رفع نقاط ضعف باقی‌مانده پیش از روز امتحان.",
  },
];

function splitWeeks(total: number, parts = 4) {
  const base = Math.floor(total / parts);
  const remainder = total - base * parts;
  return Array.from(
    { length: parts },
    (_, i) => base + (i < remainder ? 1 : 0),
  );
}

function rangeLabel(start: number, length: number) {
  if (length <= 0) return "";
  if (length === 1) return `هفته ${toFa(start)}`;
  return `هفته ${toFa(start)} تا ${toFa(start + length - 1)}`;
}

const radarChartConfig = {
  current: {
    label: "سطح فعلی شما",
    color: "#818cf8",
  },
  target: {
    label: "نمره هدف",
    color: "#a855f7",
  },
} satisfies ChartConfig;

// ------------------------------------------------------------------
// Small presentational bits
// ------------------------------------------------------------------

function PillGroup<T extends number>({
  icon: Icon,
  label,
  options,
  value,
  onChange,
  formatOption,
}: {
  icon: React.ElementType;
  label: string;
  options: T[];
  value: T;
  onChange: (v: T) => void;
  formatOption: (v: T) => string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="flex items-center gap-1.5 text-xs font-medium text-neutral-400">
        <Icon size={14} className="text-purple-400" />
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-1 p-1 bg-white/[0.04] rounded-lg border border-white/5 w-fit">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
              value === opt
                ? "bg-purple-600 text-white font-medium"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            {formatOption(opt)}
          </button>
        ))}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// Main component
// ------------------------------------------------------------------

export function StudyPlanShowcase() {
  const [currentLevel, setCurrentLevel] = useState(6.0);
  const [targetLevel, setTargetLevel] = useState(7.5);
  const [weeksLeft, setWeeksLeft] = useState(8);

  const availableTargets = useMemo(
    () => TARGET_OPTIONS.filter((t) => t > currentLevel),
    [currentLevel],
  );

  const handleCurrentChange = (value: number) => {
    setCurrentLevel(value);
    if (targetLevel <= value) {
      const next = TARGET_OPTIONS.find((t) => t > value);
      if (next) setTargetLevel(next);
    }
  };

  const gap = Math.max(targetLevel - currentLevel, 0.5);
  const weeklyPace = gap / weeksLeft;

  const radarData = useMemo(
    () =>
      (Object.keys(CRITERIA_META) as CriterionKey[]).map((key) => {
        const meta = CRITERIA_META[key];
        const current = Math.min(9, Math.max(4, currentLevel + meta.offset));
        return {
          criterion: meta.label,
          current: Number(current.toFixed(1)),
          target: targetLevel,
        };
      }),
    [currentLevel, targetLevel],
  );

  const phaseLengths = useMemo(() => splitWeeks(weeksLeft, 4), [weeksLeft]);

  return (
    <div
      dir="rtl"
      className="w-full max-w-6xl mx-auto rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-5 sm:p-8 space-y-8 font-vazirmatn text-right shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
    >
      {/* Intro + controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300 text-xs font-semibold">
            <Sparkles size={13} />
            <span>برنامه‌ای که فقط برای شما ساخته می‌شود</span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-neutral-100">
            سطح فعلی، نمره هدف و زمان باقی‌مانده‌تان را مشخص کنید
          </h4>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            بر اساس همین سه مورد، مسیر تمرینی و اولویت هر یک از معیارهای
            نمره‌دهی رایتینگ به‌طور اختصاصی برای شما بازچینی می‌شود.
          </p>
        </div>

        <div className="flex flex-wrap gap-5">
          <PillGroup
            icon={Gauge}
            label="سطح فعلی"
            options={CURRENT_OPTIONS}
            value={currentLevel}
            onChange={handleCurrentChange}
            formatOption={formatBand}
          />
          <PillGroup
            icon={Flag}
            label="نمره هدف"
            options={availableTargets}
            value={targetLevel}
            onChange={setTargetLevel}
            formatOption={formatBand}
          />
          <PillGroup
            icon={Clock}
            label="زمان باقی‌مانده"
            options={WEEKS_OPTIONS}
            value={weeksLeft}
            onChange={setWeeksLeft}
            formatOption={(v) => `${toFa(v)} هفته`}
          />
        </div>
      </div>

      {/* Radar chart + weekly roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Radar: current vs target across the 4 criteria */}
        <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 space-y-4">
          <div className="pb-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <Target size={18} className="text-purple-400" />
              <h4 className="text-sm sm:text-base font-bold text-neutral-100">
                فاصله فعلی تا نمره هدف در هر معیار
              </h4>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              نقشه نمره در چهار معیار رسمی رایتینگ آیلتس
            </p>
          </div>

          <div className="w-full pt-1" dir="ltr">
            <ChartContainer
              config={radarChartConfig}
              className="h-64 sm:h-72 w-full"
            >
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis
                  dataKey="criterion"
                  tick={{ fill: "#a3a3a3", fontSize: 10 }}
                />
                <PolarRadiusAxis
                  domain={[4, 9]}
                  tick={{ fill: "#71717a", fontSize: 9 }}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Radar
                  dataKey="current"
                  stroke="#818cf8"
                  fill="#818cf8"
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
                <Radar
                  dataKey="target"
                  stroke="#a855f7"
                  fill="#a855f7"
                  fillOpacity={0.12}
                  strokeWidth={2}
                  strokeDasharray="4 3"
                />
              </RadarChart>
            </ChartContainer>
          </div>

          <div className="flex items-center gap-4 text-xs text-neutral-400 pt-2 border-t border-white/5">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              سطح فعلی
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              نمره هدف
            </span>
          </div>
        </div>

        {/* Weekly roadmap */}
        <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 space-y-4">
          <div className="pb-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <CalendarCheck size={18} className="text-purple-400" />
              <h4 className="text-sm sm:text-base font-bold text-neutral-100">
                نقشه راه {toFa(weeksLeft)} هفته پیش رو
              </h4>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              زمان‌بندی متناسب با فاصله شما تا Band {formatBand(targetLevel)}
            </p>
          </div>

          <ol className="space-y-3">
            {PHASES.map((phase, index) => {
              const start =
                phaseLengths.slice(0, index).reduce((a, b) => a + b, 0) + 1;
              const length = phaseLengths[index];
              if (length === 0) return null;
              return (
                <li
                  key={phase.title}
                  className="flex gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3.5"
                >
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300 font-mono text-xs font-bold">
                    {toFa(index + 1)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span className="text-sm font-bold text-neutral-100">
                        {phase.title}
                      </span>
                      <span className="text-[11px] text-purple-300 font-mono">
                        {rangeLabel(start, length)}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* Per-criterion focus cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(Object.keys(CRITERIA_META) as CriterionKey[]).map((key) => {
          const meta = CRITERIA_META[key];
          const Icon = meta.icon;
          const current = Math.min(9, Math.max(4, currentLevel + meta.offset));
          const progressPct = Math.min(
            100,
            Math.max(4, ((current - 4) / (targetLevel - 4)) * 100),
          );

          return (
            <div
              key={key}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 space-y-3.5"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-9 h-9 rounded-lg border flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: `${meta.color}1f`,
                      borderColor: `${meta.color}4d`,
                      color: meta.color,
                    }}
                  >
                    <Icon size={16} />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-neutral-100 leading-tight">
                      {meta.label}
                    </h5>
                    <span className="text-[10px] text-neutral-500 font-mono">
                      {meta.shortLabel}
                    </span>
                  </div>
                </div>
                <div className="text-left shrink-0">
                  <span className="font-mono text-sm font-bold text-white">
                    {formatBand(current)}
                  </span>
                  <span className="text-neutral-500 font-mono text-xs">
                    {" "}
                    ←{" "}
                  </span>
                  <span
                    className="font-mono text-sm font-bold"
                    style={{ color: meta.color }}
                  >
                    {formatBand(targetLevel)}
                  </span>
                </div>
              </div>

              {/* progress bar */}
              <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${progressPct}%`,
                    backgroundColor: meta.color,
                  }}
                />
              </div>

              <ul className="space-y-1.5">
                {meta.focus.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs text-neutral-400 leading-relaxed"
                  >
                    <span
                      className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                      style={{ backgroundColor: meta.color }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Bottom pace insight */}
      <div className="rounded-xl border border-purple-500/20 bg-purple-500/[0.05] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-300">
        <div className="flex items-center gap-2.5">
          <Sparkles size={18} className="text-purple-300 shrink-0" />
          <span>
            برای رسیدن از Band {formatBand(currentLevel)} به{" "}
            {formatBand(targetLevel)} در {toFa(weeksLeft)} هفته، برنامه شما هر
            هفته حدود{" "}
            <strong className="text-white font-mono">
              {weeklyPace.toFixed(2)}
            </strong>{" "}
            نمره پیشرفت در نظر می‌گیرد.
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-purple-300 font-bold shrink-0">
          <CalendarCheck size={15} />
          <span>به‌روزرسانی خودکار پس از هر مقاله جدید</span>
        </div>
      </div>
    </div>
  );
}

export default StudyPlanShowcase;
