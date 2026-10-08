"use client";

import * as React from "react";
import {
  BookOpen,
  CircleCheck,
  Lightbulb,
  Link2,
  Repeat,
  Sparkles,
  SpellCheck,
  Target,
  TriangleAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  LexicalResourceAssessment,
  RepeatedWordDiagnostic,
} from "../api/essay-api";

/* -------------------------------------------------------------------------- */
/*  Band tiers: what feedback looks like at each score level                  */
/* -------------------------------------------------------------------------- */

type TierId = "foundation" | "limited" | "adequate" | "good" | "expert";

interface BandTier {
  id: TierId;
  label: string; // short Persian name of the level
  color: string; // accent used for the scale / badge
  examinerView: string; // what an examiner perceives at this level
  nextTarget: number | null; // next whole band to aim for
  gap: string[]; // what separates this level from the next
  /** problems-first for low bands, strengths-first for high bands */
  problemsFirst: boolean;
}

const TIERS: Record<TierId, BandTier> = {
  foundation: {
    id: "foundation",
    label: "واژگان محدود",
    color: "#f87171",
    examinerView:
      "دایره‌ی واژگان در حد واژه‌های پایه است، تکرار زیاد دیده می‌شود و خطاهای املا یا ساخت واژه گاهی فهم جمله را برای خواننده سخت می‌کند.",
    nextTarget: 5,
    problemsFirst: true,
    gap: [
      "برای موضوعات رایج رایتینگ (آموزش، فناوری، محیط زیست، سلامت) فهرست واژه‌های پرکاربرد بسازید و هر هفته آن را در جمله‌های خودتان به کار ببرید.",
      "املای واژه‌هایی که اشتباه نوشته‌اید را اصلاح و در یک فهرست شخصی مرور کنید؛ در این باند خطای املا مستقیماً روی فهم متن اثر می‌گذارد.",
      "هر واژه‌ی جدید را همراه با شکل‌های دیگرش (اسم، صفت، قید، فعل) یاد بگیرید تا در ساخت واژه اشتباه نکنید.",
    ],
  },
  limited: {
    id: "limited",
    label: "محدود اما قابل‌فهم",
    color: "#fb923c",
    examinerView:
      "واژگان برای انتقال معنا کافی است ولی دامنه‌ی آن محدود و تکراری است. خطاهای املا و ساخت واژه دیده می‌شود و گاهی خواننده مجبور به حدس زدن معنا می‌شود.",
    nextTarget: 6,
    problemsFirst: true,
    gap: [
      "واژه‌های ساده‌ی تکراری (مثل good، important، people، thing) را با هم‌معنی‌های دقیق‌تر جایگزین کنید.",
      "به‌جای یادگیری واژه‌ی تکی، ترکیب‌های همایند (collocation) را یاد بگیرید؛ مثلاً make a decision، نه do a decision.",
      "تعداد خطاهای املا و ساخت واژه را کم کنید تا متن بدون نیاز به حدس زدن خوانده شود.",
    ],
  },
  adequate: {
    id: "adequate",
    label: "کافی و قابل‌قبول",
    color: "#fbbf24",
    examinerView:
      "دامنه‌ی واژگان برای موضوع کافی است و تلاش برای استفاده از واژه‌های کم‌کاربردتر دیده می‌شود، اما دقت انتخاب و ترکیب‌ها هنوز ناپایدار است. خطاها مانع فهم نمی‌شوند.",
    nextTarget: 7,
    problemsFirst: true,
    gap: [
      "واژه‌های کم‌کاربردتر را فقط وقتی به کار ببرید که معنی و ترکیب‌های همراه آن را دقیق می‌دانید؛ استفاده‌ی نادرست از واژه‌ی سخت از ساده‌ی درست امتیاز کمتری دارد.",
      "با بازنویسی (paraphrase) عبارت‌های سؤال و ایده‌های خودتان، تکرار را از متن حذف کنید.",
      "عبارت‌های عمومی را با ترکیب‌های همایند طبیعی و مخصوص موضوع جایگزین کنید.",
    ],
  },
  good: {
    id: "good",
    label: "منعطف و دقیق",
    color: "#34d399",
    examinerView:
      "دامنه‌ی واژگان برای بیان منعطف و دقیق کافی است. واژه‌ها و ترکیب‌های کم‌کاربرد به‌خوبی استفاده شده‌اند و تنها لغزش‌های گاه‌به‌گاه در املا یا انتخاب واژه دیده می‌شود.",
    nextTarget: 8,
    problemsFirst: false,
    gap: [
      "دقت معنایی را بالا ببرید: واژه‌ای انتخاب کنید که دقیقاً همان بار معنایی مورد نظر شما را برساند، نه نزدیک به آن.",
      "لحن آکادمیک را یکدست نگه دارید و از عبارت‌های محاوره‌ای یا کلیشه‌ای پرهیز کنید.",
      "با یک بازخوانی نهایی، لغزش‌های کوچک املایی و collocation را حذف کنید؛ فاصله‌ی این سطح تا باند ۸ معمولاً همین یکی دو مورد است.",
    ],
  },
  expert: {
    id: "expert",
    label: "پیشرفته و طبیعی",
    color: "#22d3ee",
    examinerView:
      "دامنه‌ی واژگان گسترده است و واژه‌ها با مهارت، دقت و طبیعی‌بودن به کار رفته‌اند. خطا بسیار نادر و جزئی است.",
    nextTarget: 9,
    problemsFirst: false,
    gap: [
      "هدف اصلی حفظ سطح فعلی است: انتخاب واژه‌ی دقیق و طبیعی و نبود هر گونه خطای املایی.",
      "از واژه‌های سنگین بی‌دلیل پرهیز کنید؛ طبیعی‌بودن مهم‌تر از نمایش دایره‌ی واژگان است.",
      "ایدیوم‌ها و ترکیب‌های کم‌کاربرد را فقط وقتی به کار ببرید که کاملاً در جای خود هستند.",
    ],
  },
};

function getTier(score: number): BandTier {
  if (score < 5) return TIERS.foundation;
  if (score < 6) return TIERS.limited;
  if (score < 7) return TIERS.adequate;
  if (score < 8) return TIERS.good;
  return TIERS.expert;
}

/* -------------------------------------------------------------------------- */
/*  Small building blocks                                                     */
/* -------------------------------------------------------------------------- */

function BandScale({ score, color }: { score: number; color: string }) {
  const clamped = Math.min(Math.max(score, 0), 9);
  const pct = (clamped / 9) * 100;
  return (
    <div dir="ltr" className="space-y-1.5">
      <div className="relative h-2.5 rounded-full bg-muted">
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
        <div
          className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background shadow"
          style={{ left: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <div className="flex justify-between px-0.5 font-mono text-[10px] text-muted-foreground">
        {Array.from({ length: 10 }, (_, i) => (
          <span
            key={i}
            className={cn(
              Math.floor(clamped) === i && "font-bold text-foreground",
            )}
          >
            {i}
          </span>
        ))}
      </div>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  subtitle,
  count,
  tone = "neutral",
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle?: string;
  count?: number;
  tone?: "neutral" | "problem" | "strength";
  children: React.ReactNode;
}) {
  const toneClass = {
    neutral: "text-muted-foreground bg-muted",
    problem: "text-rose-500 bg-rose-500/10",
    strength: "text-emerald-500 bg-emerald-500/10",
  }[tone];
  return (
    <section className="space-y-3 rounded-xl border border-border/60 bg-background/40 p-4 sm:p-5">
      <header className="flex items-start gap-3">
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-lg",
            toneClass,
          )}
        >
          <Icon className="size-4" />
        </span>
        <div className="min-w-0 flex-1">
          <h5 className="text-sm font-bold text-foreground">{title}</h5>
          {subtitle && (
            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
        {typeof count === "number" && count > 0 && (
          <span className="rounded-full bg-muted px-2 py-0.5 font-mono text-[11px] font-semibold text-muted-foreground tabular-nums">
            {count}
          </span>
        )}
      </header>
      {children}
    </section>
  );
}

function EmptyNote({
  tone,
  children,
}: {
  tone: "good" | "hint";
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "rounded-lg px-3 py-2.5 text-xs leading-relaxed",
        tone === "good"
          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          : "bg-muted text-muted-foreground",
      )}
    >
      {children}
    </p>
  );
}

/** Splits strings like "recieve -> receive" so the fix is easy to scan. */
function parseCorrection(raw: string): [string, string] | null {
  const parts = raw.split(/\s*(?:->|→|=>|⇒)\s*/);
  if (parts.length === 2 && parts[0].trim() && parts[1].trim()) {
    return [parts[0].trim(), parts[1].trim()];
  }
  return null;
}

function RepeatedWordRow({
  item,
  max,
}: {
  item: RepeatedWordDiagnostic;
  max: number;
}) {
  const width = max > 0 ? Math.max((item.count / max) * 100, 8) : 8;
  return (
    <li className="space-y-2 rounded-lg border border-border/50 bg-card p-3">
      <div className="flex items-center gap-3">
        <bdi className="font-sans text-sm font-bold text-foreground">
          {item.word}
        </bdi>
        <div dir="ltr" className="h-1.5 flex-1 rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-rose-400"
            style={{ width: `${width}%` }}
          />
        </div>
        <span className="font-mono text-xs font-semibold text-rose-500 tabular-nums">
          ×{item.count}
        </span>
      </div>
      {item.suggested_alternatives?.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-muted-foreground">جایگزین‌ها:</span>
          {item.suggested_alternatives.map((alt) => (
            <bdi
              key={alt}
              className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-sans text-xs text-emerald-700 dark:text-emerald-300"
            >
              {alt}
            </bdi>
          ))}
        </div>
      )}
    </li>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main component                                                            */
/* -------------------------------------------------------------------------- */

interface LexicalResourceFeedbackProps {
  assessment: LexicalResourceAssessment;
  /** Accent color of the criterion; matches the tab icon. */
  accent?: string;
}

export function LexicalResourceFeedback({
  assessment,
  accent = "#f472b6",
}: LexicalResourceFeedbackProps) {
  const score = assessment.score;
  const tier = getTier(score);
  const lowBand = score <= 6.5;

  const repeated = (assessment.repeated_words ?? []).filter((w) => w?.word);
  const collocations = assessment.inaccurate_collocations ?? [];
  const spelling = assessment.spelling_and_formation_errors ?? [];
  const advanced = assessment.effective_advanced_vocabulary ?? [];
  const advice = assessment.actionable_advice ?? [];
  const maxCount = Math.max(0, ...repeated.map((w) => w.count));

  const stats = [
    { label: "واژه تکراری", value: repeated.length, bad: true },
    { label: "ترکیب نادرست", value: collocations.length, bad: true },
    { label: "خطای املا / ساخت واژه", value: spelling.length, bad: true },
    { label: "واژه پیشرفته", value: advanced.length, bad: false },
  ];

  /* ---- sections (order depends on band) ---- */

  const repeatedSection = (
    <Section
      key="repeated"
      icon={Repeat}
      tone="problem"
      title="واژه‌های تکراری"
      subtitle="این واژه‌ها بیش از حد تکرار شده‌اند و تنوع واژگانی را کم کرده‌اند."
      count={repeated.length}
    >
      {repeated.length > 0 ? (
        <ul className="space-y-2">
          {repeated.map((item) => (
            <RepeatedWordRow key={item.word} item={item} max={maxCount} />
          ))}
        </ul>
      ) : lowBand ? (
        <EmptyNote tone="good">
          تکرار قابل‌توجهی در متن شما پیدا نشد. مشکل اصلی نمره در بخش‌های دیگر
          است.
        </EmptyNote>
      ) : (
        <EmptyNote tone="good">
          تنوع واژگان شما خوب است و تکرار آزاردهنده‌ای دیده نشد.
        </EmptyNote>
      )}
    </Section>
  );

  const collocationSection = (
    <Section
      key="collocations"
      icon={Link2}
      tone="problem"
      title="ترکیب‌های همایند نادرست"
      subtitle="جفت‌واژه‌هایی که در انگلیسی طبیعی به این شکل کنار هم نمی‌آیند."
      count={collocations.length}
    >
      {collocations.length > 0 ? (
        <ul className="space-y-2">
          {collocations.map((c, i) => (
            <li
              key={`${c}-${i}`}
              dir="auto"
              className="rounded-lg border border-border/50 bg-card px-3 py-2 font-sans text-sm leading-relaxed text-foreground/90"
            >
              {c}
            </li>
          ))}
        </ul>
      ) : (
        <EmptyNote tone="good">
          ترکیب نادرستی پیدا نشد. استفاده‌ی شما از collocationها طبیعی بود.
        </EmptyNote>
      )}
    </Section>
  );

  const spellingSection = (
    <Section
      key="spelling"
      icon={SpellCheck}
      tone="problem"
      title="خطاهای املا و ساخت واژه"
      subtitle="املای نادرست یا استفاده از شکل اشتباه یک کلمه (مثلاً صفت به‌جای اسم)."
      count={spelling.length}
    >
      {spelling.length > 0 ? (
        <ul className="space-y-2">
          {spelling.map((s, i) => {
            const fix = parseCorrection(s);
            return (
              <li
                key={`${s}-${i}`}
                className="rounded-lg border border-border/50 bg-card px-3 py-2 text-sm"
              >
                {fix ? (
                  <div
                    dir="ltr"
                    className="flex flex-wrap items-center gap-2 font-sans"
                  >
                    <span className="text-rose-500 line-through decoration-rose-500/50">
                      {fix[0]}
                    </span>
                    <span className="text-muted-foreground">→</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      {fix[1]}
                    </span>
                  </div>
                ) : (
                  <p
                    dir="auto"
                    className="font-sans leading-relaxed text-foreground/90"
                  >
                    {s}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <EmptyNote tone="good">
          خطای املایی یا ساخت واژه‌ی مهمی ثبت نشد.
        </EmptyNote>
      )}
    </Section>
  );

  const advancedSection = (
    <Section
      key="advanced"
      icon={Sparkles}
      tone="strength"
      title="واژگان پیشرفته‌ی درست‌استفاده‌شده"
      subtitle="نقاط قوت شما؛ این موارد را در نوشته‌های بعدی هم حفظ کنید."
      count={advanced.length}
    >
      {advanced.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {advanced.map((w) => (
            <bdi
              key={w}
              className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-sans text-xs font-medium text-emerald-700 dark:text-emerald-300"
            >
              {w}
            </bdi>
          ))}
        </div>
      ) : (
        <EmptyNote tone="hint">
          واژه یا ترکیب کم‌کاربردِ درست‌استفاده‌شده‌ای ثبت نشد.{" "}
          {score < 7
            ? "برای رسیدن به باند ۷ چند واژه یا ترکیب دقیق و کمتر رایج را، با اطمینان از کاربرد درست، وارد متن کنید."
            : "برای حفظ این سطح، چند واژه‌ی دقیق‌تر را جایگزین واژه‌های عمومی کنید."}
        </EmptyNote>
      )}
    </Section>
  );

  const problemSections = [
    repeatedSection,
    collocationSection,
    spellingSection,
  ];
  const orderedSections = tier.problemsFirst
    ? [...problemSections, advancedSection]
    : [advancedSection, ...problemSections];

  return (
    <div className="space-y-5 text-start">
      {/* ---------- 1. Score + level ---------- */}
      <div className="space-y-5 rounded-xl border border-border/60 bg-background/40 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="flex size-11 items-center justify-center rounded-xl border"
              style={{
                backgroundColor: `${accent}15`,
                borderColor: `${accent}30`,
                color: accent,
              }}
            >
              <BookOpen className="size-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-foreground">
                دایره واژگان
              </h4>
              <span className="font-mono text-[11px] text-muted-foreground">
                Lexical Resource
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <span
              className="font-mono text-3xl font-black leading-none tabular-nums"
              style={{ color: tier.color }}
            >
              {score.toFixed(1)}
            </span>
            <span
              className="rounded-full px-2.5 py-0.5 text-[11px] font-bold"
              style={{
                backgroundColor: `${tier.color}1f`,
                color: tier.color,
              }}
            >
              {tier.label}
            </span>
          </div>
        </div>

        <BandScale score={score} color={tier.color} />

        <p className="text-xs leading-relaxed text-muted-foreground">
          <span className="font-bold text-foreground">در این باند: </span>
          {tier.examinerView}
        </p>
      </div>

      {/* ---------- 2. Examiner justification ---------- */}
      {assessment.justification && (
        <div className="space-y-2 rounded-xl border border-border/60 bg-background/40 p-4 sm:p-5">
          <h5 className="text-sm font-bold text-foreground">
            توضیح اگزمینر برای این نمره
          </h5>
          <p
            dir="auto"
            className="font-sans text-sm leading-7 text-foreground/85 select-text"
          >
            {assessment.justification}
          </p>
        </div>
      )}

      {/* ---------- 3. Diagnostic strip ---------- */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {stats.map((s) => {
          const flagged = s.bad && s.value > 0;
          return (
            <div
              key={s.label}
              className={cn(
                "rounded-xl border px-3 py-2.5",
                flagged
                  ? "border-rose-500/30 bg-rose-500/5"
                  : !s.bad && s.value > 0
                    ? "border-emerald-500/30 bg-emerald-500/5"
                    : "border-border/60 bg-background/40",
              )}
            >
              <div
                className={cn(
                  "font-mono text-xl font-extrabold tabular-nums",
                  flagged
                    ? "text-rose-500"
                    : !s.bad && s.value > 0
                      ? "text-emerald-500"
                      : "text-muted-foreground",
                )}
              >
                {s.value}
              </div>
              <div className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                {s.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* ---------- 4. Detail sections (order depends on band) ---------- */}
      {orderedSections}

      {/* ---------- 5. Path to the next band ---------- */}
      <section
        className="space-y-4 rounded-xl border p-4 sm:p-5"
        style={{
          borderColor: `${tier.color}40`,
          backgroundColor: `${tier.color}0d`,
        }}
      >
        <header className="flex items-center gap-3">
          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${tier.color}25`, color: tier.color }}
          >
            <Target className="size-4" />
          </span>
          <div>
            <h5 className="text-sm font-bold text-foreground">
              {tier.nextTarget
                ? `مسیر رسیدن به باند ${tier.nextTarget}`
                : "حفظ سطح فعلی"}
            </h5>
            <p className="text-xs text-muted-foreground">
              {tier.nextTarget
                ? "آنچه معمولاً سطح فعلی شما را از باند بعدی جدا می‌کند."
                : "شما در بالاترین سطح هستید."}
            </p>
          </div>
        </header>

        <ul className="space-y-2.5">
          {tier.gap.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <TriangleAlert
                className="mt-0.5 size-4 shrink-0"
                style={{ color: tier.color }}
              />
              <span className="text-sm leading-7 text-foreground/85">
                {item}
              </span>
            </li>
          ))}
        </ul>

        {advice.length > 0 && (
          <div className="space-y-2.5 border-t border-border/50 pt-4">
            <div className="flex items-center gap-2 text-xs font-bold text-foreground">
              <Lightbulb className="size-4 text-amber-500" />
              <span>توصیه‌های اختصاصی برای نوشته‌ی شما</span>
            </div>
            <ul className="space-y-2.5">
              {advice.map((a, i) => (
                <li key={`${a}-${i}`} className="flex items-start gap-2.5">
                  <CircleCheck className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                  <span
                    dir="auto"
                    className="font-sans text-sm leading-7 text-foreground/85 select-text"
                  >
                    {a}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
