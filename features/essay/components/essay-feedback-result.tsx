"use client";

import * as React from "react";
import {
  Award,
  Calendar,
  Compass,
  GitBranch,
  BookOpen,
  SpellCheck,
  RotateCcw,
  FileQuestion,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LexicalResourceFeedback } from "./lexical-resource-feedback";
import type {
  CriterionType,
  EssayFeedbackResponse,
  EssaySubmissionPayload,
} from "../api/essay-api";

interface EssayFeedbackResultProps {
  data: EssayFeedbackResponse;
  originalInput: EssaySubmissionPayload;
  onReset: () => void;
}

interface CriterionConfig {
  id: CriterionType;
  titleFa: string;
  titleEn: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const CRITERIA_CONFIG: CriterionConfig[] = [
  {
    id: "task_response",
    titleFa: "پاسخ به سوال",
    titleEn: "Task Response",
    icon: Compass,
    color: "#818cf8",
  },
  {
    id: "coherence_cohesion",
    titleFa: "انسجام و پیوستگی",
    titleEn: "Coherence & Cohesion",
    icon: GitBranch,
    color: "#22d3ee",
  },
  {
    id: "lexical_resource",
    titleFa: "دایره واژگان",
    titleEn: "Lexical Resource",
    icon: BookOpen,
    color: "#f472b6",
  },
  {
    id: "grammatical_range_accuracy",
    titleFa: "تنوع و صحت گرامری",
    titleEn: "Grammatical Range & Accuracy",
    icon: SpellCheck,
    color: "#34d399",
  },
];

export function EssayFeedbackResult({
  data,
  originalInput,
  onReset,
}: EssayFeedbackResultProps) {
  const formattedDate = new Date(data.created_at).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const wordCount = originalInput.essay.trim()
    ? originalInput.essay.trim().split(/\s+/).length
    : 0;

  return (
    <div className="space-y-8 font-vazirmatn" dir="rtl">
      {/* ---------------- 1. Top Score & Submission Bar ---------------- */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-card p-6 shadow-md">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
              <Award className="size-3.5" />
              <span>نتیجه رسمی ارزیابی اگزمینر</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
              کارنامه تحلیلی رایتینگ تسک ۲
            </h2>
            <div className="flex items-center gap-2 pt-1 font-mono text-xs text-muted-foreground">
              <Calendar className="size-3.5" />
              <span>{formattedDate}</span>
              <span>•</span>
              <span>کد پیگیری: {data.submission_id.slice(0, 8)}</span>
            </div>
          </div>

          {/* Overall Band */}
          <div className="flex items-center gap-4 rounded-xl border border-border/80 bg-background/80 px-5 py-3 shadow-sm self-start sm:self-auto">
            <div className="text-left font-mono">
              <span className="block text-[11px] text-muted-foreground">
                Overall Band
              </span>
              <span className="text-xs font-semibold text-primary">
                نمره کل
              </span>
            </div>
            <span className="font-mono text-3xl sm:text-4xl font-black text-foreground tabular-nums">
              {data.overall_band !== null ? data.overall_band.toFixed(1) : "—"}
            </span>
          </div>
        </div>
      </div>

      {/* ---------------- 2. Question & Answer Summary ---------------- */}
      <div className="space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm">
        {/* Question / Prompt */}
        <div className="space-y-2 border-b border-border/60 pb-5">
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
            <FileQuestion className="size-4 text-primary" />
            <span>صورت سؤال (Prompt)</span>
          </div>
          <p
            dir="ltr"
            className="rounded-xl border border-border/50 bg-background/60 p-4 font-sans text-sm sm:text-base leading-relaxed text-foreground select-text"
          >
            {originalInput.essay_prompt}
          </p>
        </div>

        {/* Candidate Essay Answer */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2 font-bold">
              <FileText className="size-4 text-primary" />
              <span>پاسخ نگارش‌شده (Your Essay)</span>
            </div>
            <span className="font-mono text-[11px] text-muted-foreground">
              {wordCount} Words
            </span>
          </div>
          <div
            dir="ltr"
            className="max-h-72 overflow-y-auto whitespace-pre-wrap rounded-xl border border-border/50 bg-background/60 p-4 font-sans text-sm sm:text-base leading-relaxed text-foreground/90 select-text"
          >
            {originalInput.essay}
          </div>
        </div>
      </div>

      {/* ---------------- 3. Rubric Tabs Structure ---------------- */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-6">
        <div>
          <h3 className="text-base font-bold text-foreground">
            بررسی تخصصی بر اساس معیارهای چهارگانه
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            برای مشاهده وضعیت هر معیار، تب مورد نظر را انتخاب کنید.
          </p>
        </div>

        <Tabs defaultValue={CRITERIA_CONFIG[0].id} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto p-1 bg-muted/60 gap-1 rounded-xl">
            {CRITERIA_CONFIG.map((criterion) => {
              const Icon = criterion.icon;
              return (
                <TabsTrigger
                  key={criterion.id}
                  value={criterion.id}
                  className="flex items-center justify-center gap-2 py-2.5 text-xs sm:text-sm font-semibold rounded-lg data-active:bg-background data-active:text-foreground data-active:shadow-xs transition-all"
                >
                  <Icon className="size-4" />
                  <span className="truncate">{criterion.titleFa}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Tab Contents: Clean Rubric Titles */}
          {CRITERIA_CONFIG.map((criterion) => {
            const Icon = criterion.icon;
            return (
              <TabsContent
                key={criterion.id}
                value={criterion.id}
                className="mt-6 focus-visible:outline-none"
              >
                {criterion.id === "lexical_resource" ? (
                  <LexicalResourceFeedback
                    assessment={data.details.lexical_resource}
                    accent={criterion.color}
                  />
                ) : (
                  <div className="rounded-xl border border-border/60 bg-background/40 p-6 sm:p-8 min-h-[220px] flex flex-col items-center justify-center text-center space-y-3">
                    <div
                      className="flex size-12 items-center justify-center rounded-xl border"
                      style={{
                        backgroundColor: `${criterion.color}15`,
                        borderColor: `${criterion.color}30`,
                        color: criterion.color,
                      }}
                    >
                      <Icon className="size-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-foreground">
                        {criterion.titleFa}
                      </h4>
                      <span className="text-xs font-mono text-muted-foreground">
                        {criterion.titleEn}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground/70 max-w-sm pt-2">
                      جزئیات ارزیابی و بازخوردهای مربوط به این معیار در این بخش
                      قرار می‌گیرد.
                    </p>
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>

      {/* ---------------- 4. Bottom Reset CTA ---------------- */}
      <div className="flex items-center justify-end pt-2">
        <Button
          type="button"
          onClick={onReset}
          variant="outline"
          className="flex items-center gap-2 rounded-xl px-5 text-xs font-semibold hover:bg-muted"
        >
          <RotateCcw className="size-3.5" />
          <span>ارزیابی مقاله جدید</span>
        </Button>
      </div>
    </div>
  );
}
