// app/essay/page.tsx
import type { Metadata } from "next";
import { PenTool, CheckCircle2 } from "lucide-react";
import { EssayForm } from "@/features/essay/components/essay-form";
import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `نگارش و ارزیابی رایتینگ | ${APP_NAME}`,
  description: "ارزیابی تخصصی و هوشمند مقاله آیلتس بر اساس معیارهای رسمی ممتحن",
};

export default function EssayPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6 md:py-10">
      {/* Top Header */}
      <div className="mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <PenTool className="size-3.5" />
          <span>استودیوی سنجش هوشمند آیلتس</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
          ثبت رایتینگ و دریافت بازخورد رسمی
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          صورت سوال و رایتینگ خود را وارد کنید. سیستم پس از تحلیل، نمره تخمینی
          تراز (Band Score) و پیشنهادات تصحیح برای هر بخش را ارائه می‌دهد.
        </p>

        {/* Quick Criteria Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 font-medium">
            <CheckCircle2 className="size-3 text-primary" /> Task Response
          </span>
          <span className="flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 font-medium">
            <CheckCircle2 className="size-3 text-primary" /> Coherence &
            Cohesion
          </span>
          <span className="flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 font-medium">
            <CheckCircle2 className="size-3 text-primary" /> Lexical Resource
          </span>
          <span className="flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 font-medium">
            <CheckCircle2 className="size-3 text-primary" /> Grammatical Range &
            Accuracy
          </span>
        </div>
      </div>

      {/* TanStack Form Component */}
      <EssayForm />
    </div>
  );
}
