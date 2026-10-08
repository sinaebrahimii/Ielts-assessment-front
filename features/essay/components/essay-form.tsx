"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import {
  HelpCircle,
  Clock,
  Sparkles,
  AlertCircle,
  FileText,
  RotateCcw,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  submitEssayForFeedback,
  type EssayFeedbackResponse,
  type EssaySubmissionPayload,
} from "../api/essay-api";
import { EssayFeedbackResult } from "./essay-feedback-result";

const SAMPLE_PROMPTS = [
  "Some people believe that unpaid community service should be a compulsory part of high school programmes. To what extent do you agree or disagree?",
  "In many countries, an increasing number of people are choosing to live alone. What are the causes of this, and does it have a positive or negative impact on society?",
  "With recent advances in artificial intelligence, many traditional jobs may disappear. Discuss both views and give your own opinion.",
];

export function EssayForm() {
  const [selectedPromptIndex, setSelectedPromptIndex] = React.useState<
    number | null
  >(null);
  const [feedbackResult, setFeedbackResult] =
    React.useState<EssayFeedbackResponse | null>(null);
  const [submittedInput, setSubmittedInput] =
    React.useState<EssaySubmissionPayload | null>(null);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      essay_prompt: "",
      essay: "",
    },
    onSubmit: async ({ value }) => {
      setSubmitError(null);
      try {
        const payload: EssaySubmissionPayload = {
          essay_prompt: value.essay_prompt.trim(),
          essay: value.essay.trim(),
        };
        const response = await submitEssayForFeedback(payload);
        setSubmittedInput(payload);
        setFeedbackResult(response);
      } catch (err: unknown) {
        setSubmitError(
          "خطا در برقراری ارتباط با سرویس ارزیابی. لطفاً مجدداً تلاش کنید.",
        );
      }
    },
  });

  const handleReset = () => {
    setFeedbackResult(null);
    setSubmittedInput(null);
    setSubmitError(null);
    form.reset();
  };

  // When assessment result is received, render the result view
  if (feedbackResult && submittedInput) {
    return (
      <EssayFeedbackResult
        data={feedbackResult}
        originalInput={submittedInput}
        onReset={handleReset}
      />
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      {submitError && (
        <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
          <AlertCircle className="size-4 shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      {/* Part 1: Question / Prompt */}
      <div className="rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary text-xs font-bold">
              ۱
            </span>
            <div>
              <h2 className="text-base font-bold text-foreground">
                صورت سوال (IELTS Prompt)
              </h2>
              <p className="text-xs text-muted-foreground">
                متن موضوع یا تسک آزمون را به انگلیسی وارد کنید یا از نمونه‌های
                استاندارد برگزینید.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <HelpCircle className="size-3.5" />
            <span>حداقل ۱۰ کاراکتر</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            <BookOpen className="size-3" />
            موضوعات پیشنهادی:
          </span>
          {SAMPLE_PROMPTS.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSelectedPromptIndex(idx);
                form.setFieldValue("essay_prompt", sample);
              }}
              className={`rounded-lg border px-2.5 py-1 text-xs transition-colors cursor-pointer ${
                selectedPromptIndex === idx
                  ? "border-primary bg-primary/10 text-primary font-medium"
                  : "border-border/60 bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              نمونه {idx + 1}
            </button>
          ))}
        </div>

        <form.Field
          name="essay_prompt"
          validators={{
            onChange: ({ value }) => {
              if (!value || value.trim().length < 10) {
                return "صورت سوال باید حداقل ۱۰ کاراکتر باشد.";
              }
              if (value.length > 2000) {
                return "صورت سوال نمی‌تواند بیشتر از ۲۰۰۰ کاراکتر باشد.";
              }
              return undefined;
            },
          }}
        >
          {(field) => (
            <div className="mt-3 space-y-1.5">
              <div className="relative rounded-xl border border-input bg-background/50 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <textarea
                  id={field.name}
                  dir="ltr"
                  rows={3}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter the official IELTS Task 2 prompt here..."
                  className="w-full resize-y bg-transparent p-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none font-sans leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-muted-foreground px-1">
                <span>
                  {field.state.meta.errors.length > 0 ? (
                    <span className="text-destructive flex items-center gap-1">
                      <AlertCircle className="size-3" />
                      {field.state.meta.errors[0]}
                    </span>
                  ) : (
                    "انگلیسی تایپ شود"
                  )}
                </span>
                <span className="font-mono tabular-nums">
                  {field.state.value.length} / 2000
                </span>
              </div>
            </div>
          )}
        </form.Field>
      </div>

      {/* Part 2: The Essay Answer */}
      <div className="rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary text-xs font-bold">
              ۲
            </span>
            <div>
              <h2 className="text-base font-bold text-foreground">
                پاسخ و متن مقاله (Candidate&apos;s Essay)
              </h2>
              <p className="text-xs text-muted-foreground">
                متن رایتینگ خود را تایپ یا جای‌گذاری کنید (حداقل ۲۵۰ کلمه
                پیشنهادی).
              </p>
            </div>
          </div>
        </div>

        <form.Field
          name="essay"
          validators={{
            onChange: ({ value }) => {
              if (!value || value.trim().length < 50) {
                return "متن مقاله برای ارزیابی حداقل باید ۵۰ کاراکتر باشد.";
              }
              if (value.length > 10000) {
                return "حجم متن از سقف مجاز (۱۰۰۰۰ کاراکتر) بیشتر است.";
              }
              return undefined;
            },
          }}
        >
          {(field) => {
            const rawText = field.state.value || "";
            const words = rawText.trim()
              ? rawText.trim().split(/\s+/).length
              : 0;
            const paragraphs = rawText.trim()
              ? rawText.split(/\n+/).filter((p) => p.trim().length > 0).length
              : 0;
            const readingTimeMin = Math.ceil(words / 200) || 1;

            return (
              <div className="mt-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/70 bg-muted/30 px-3.5 py-2.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 font-medium text-foreground">
                      <FileText className="size-3.5 text-primary" />
                      تعداد کلمات:{" "}
                      <strong
                        className={`font-mono text-sm font-bold ${
                          words < 250 ? "text-amber-400" : "text-emerald-400"
                        }`}
                      >
                        {words}
                      </strong>
                    </span>

                    <span className="hidden sm:inline-block h-3.5 w-px bg-border" />

                    <span className="hidden sm:flex items-center gap-1.5 font-medium text-foreground">
                      پاراگراف‌ها:{" "}
                      <strong className="font-mono text-xs">
                        {paragraphs}
                      </strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="size-3 text-muted-foreground" />
                      خواندن: ~{readingTimeMin} دقیقه
                    </span>
                    <button
                      type="button"
                      onClick={() => field.handleChange("")}
                      className="inline-flex items-center gap-1 text-[11px] hover:text-destructive transition-colors cursor-pointer"
                    >
                      <RotateCcw className="size-3" />
                      پاکسازی
                    </button>
                  </div>
                </div>

                <div className="relative rounded-2xl border border-input bg-background focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/20 transition-all overflow-hidden">
                  <textarea
                    id={field.name}
                    dir="ltr"
                    rows={14}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Write your essay here..."
                    className="w-full resize-y bg-transparent p-4 sm:p-5 text-sm sm:text-base leading-relaxed tracking-normal text-foreground placeholder:text-muted-foreground/40 outline-none font-sans"
                    style={{ minHeight: "320px", maxHeight: "700px" }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
                  <span>
                    {field.state.meta.errors.length > 0 && (
                      <span className="text-destructive flex items-center gap-1 font-medium">
                        <AlertCircle className="size-3.5" />
                        {field.state.meta.errors[0]}
                      </span>
                    )}
                  </span>
                  <span className="font-mono tabular-nums text-[11px]">
                    {rawText.length} / 10000 کاراکتر
                  </span>
                </div>
              </div>
            );
          }}
        </form.Field>
      </div>

      {/* Action Bar */}
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-2">
            <p className="text-xs text-muted-foreground">
              ارزیابی بر اساس ۴ معیار Task Response، Coherence & Cohesion،
              Lexical Resource و Grammatical Range انجام می‌شود.
            </p>

            <Button
              type="submit"
              size="lg"
              disabled={!canSubmit || isSubmitting}
              className="w-full sm:w-auto h-11 px-8 rounded-xl font-bold bg-primary text-primary-foreground shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>در حال تحلیل و نمره‌دهی...</span>
              ) : (
                <>
                  <Sparkles className="size-4" />
                  <span>ثبت و شروع ارزیابی اگزمینر</span>
                </>
              )}
            </Button>
          </div>
        )}
      </form.Subscribe>
    </form>
  );
}
