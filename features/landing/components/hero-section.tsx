"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModernHeroBackground } from "@/components/ui/modern-hero-background";
import { HeroExaminerStudio } from "@/features/landing/components/hero-examiner-studio";

export default function HeroSection() {
  return (
    <section
      dir="rtl"
      className="relative min-h-screen w-full flex flex-col items-center justify-center font-vazirmatn bg-bg-dark overflow-hidden pt-20 pb-16 sm:py-24 px-4 sm:px-6 md:px-12"
    >
      {/* 60fps Hardware-Accelerated Modern Background */}
      <ModernHeroBackground />

      <div className="max-w-5xl mx-auto flex flex-col items-center z-10 relative text-center">
        {/* Top Tagline Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/40 text-purple-200 text-xs sm:text-sm backdrop-blur-md">
          <Sparkles size={14} className="text-purple-400" />
          <span>پلتفرم تخصصی تصحیح و شبیه‌سازی نمره رایتینگ آیلتس</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-extrabold tracking-tight text-3xl sm:text-5xl md:text-6xl text-white leading-tight sm:leading-snug max-w-4xl">
          رایتینگ خود را با دقت ممتحن رسمی بسنجید و به{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-300 bg-clip-text text-transparent">
            Band 8.5
          </span>{" "}
          برسید
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl text-sm sm:text-lg text-neutral-300 font-normal leading-relaxed">
          تحلیل خط‌به‌خط مقالات Task 1 و Task 2، ارتقای واژگان عمومی به ترکیبات
          آکادمیک و تصحیح ساختارهای گرامری بر پایه استانداردهای رسمی کمبریج.
        </p>

        {/* CTA & Trust Badges */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-sm sm:max-w-none">
          <Link href="/login" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-64 h-12 bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-[0_0_25px_rgba(168,85,247,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>شروع ارزیابی رایگان مقاله</span>
              <ArrowLeft size={18} />
            </Button>
          </Link>
        </div>

        {/* Micro-props List */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-neutral-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-400" />
            منطبق با جدول نمره‌دهی ممتحن
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-purple-400" />
            تحلیل فوری در کمتر از ۳۰ ثانیه
          </span>
        </div>

        {/* Modern Live Examiner Studio Preview */}
        <div className="w-full mt-12 sm:mt-16">
          <HeroExaminerStudio />
        </div>
      </div>
    </section>
  );
}
