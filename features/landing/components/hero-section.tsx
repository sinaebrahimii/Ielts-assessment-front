"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import { CanvasText } from "@/components/ui/canvas-text";
import { Highlighter } from "@/components/ui/highlighter";
import { AssessmentCard } from "@/features/landing/components/assesment-card";
import { LineByLineAssessmentCard } from "@/features/landing/components/line-by-line-assessment";
import { ProgressCard } from "@/features/landing/components/progress-card";
import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";

const HeroSection = () => {
  return (
    <div
      dir="rtl"
      className="min-h-screen w-full font-vazirmatn bg-bg-dark relative flex flex-col items-center justify-center antialiased overflow-hidden py-16 sm:py-24"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center z-10 relative">
        {/* Top Agent Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/40 text-purple-200 text-xs sm:text-sm backdrop-blur-md">
          <Sparkles size={14} className="text-purple-400 animate-pulse" />
          <span>نسل جدید اگزمینر هوشمند با مدل‌های استدلال عمیق</span>
        </div>

        {/* Heading */}
        <div className="relative z-20 w-full text-center">
          <h1 className="font-sans font-extrabold tracking-tight leading-[1.3] sm:leading-[1.5] text-3xl sm:text-5xl md:text-6xl text-white">
            تقویت مهارت‌های رایتینگ آیلتس با{" "}
            <span className="inline-block mt-2 sm:mt-0">
              <CanvasText
                text="هوش مصنوعی"
                className="font-extrabold inline-block"
                backgroundClassName="bg-purple-600 dark:bg-purple-800"
                colors={[
                  "rgba(168, 85, 247, 1)",
                  "rgba(147, 51, 234, 0.9)",
                  "rgba(126, 34, 206, 0.8)",
                  "rgba(192, 132, 252, 0.7)",
                ]}
                lineGap={5}
                animationDuration={15}
              />
            </span>
          </h1>

          <div className="mt-6 max-w-2xl mx-auto space-y-4">
            <h2 className="text-base sm:text-xl text-neutral-300 leading-relaxed font-normal">
              رایتینگ بنویسید، در لحظه نمره رسمی آزمون را دریافت کنید و با فیدبک
              اختصاصی ایجنت‌ها، اشتباهات ساختاری و گرامری خود را برطرف کنید.
            </h2>

            <h3 className="text-lg sm:text-2xl font-light text-white">
              <Highlighter action="highlight" color="#413185">
                هدفمند و هوشمند
              </Highlighter>
              <span className="mx-2">تمرین کنید،</span>
              <Highlighter action="underline" color="#E09779">
                نه در تاریکی!
              </Highlighter>
            </h3>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xs sm:max-w-none">
          <Link href="/login" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-60 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold h-12 rounded-xl shadow-[0_0_25px_rgba(168,85,247,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>ارزیابی رایگان اولین متن</span>
              <ArrowLeft size={18} />
            </Button>
          </Link>
        </div>

        {/* Interactive Floating / Layered Cards Showcase */}
        <div className="relative w-full mt-12 sm:mt-16 flex flex-col items-center justify-center gap-6 lg:gap-0 lg:h-[420px]">
          {/* Card 1 */}
          <div className="w-full max-w-sm lg:max-w-none lg:w-auto lg:absolute lg:z-10 lg:-translate-x-72 lg:rotate-[-6deg] lg:hover:rotate-0 lg:hover:z-40 transition-transform duration-300">
            <AssessmentCard />
          </div>

          {/* Center Card */}
          <div className="w-full max-w-sm lg:max-w-none lg:w-auto lg:absolute lg:z-30 lg:hover:scale-105 transition-transform duration-300">
            <ProgressCard />
          </div>

          {/* Card 3 */}
          <div className="w-full max-w-sm lg:max-w-none lg:w-auto lg:absolute lg:z-20 lg:translate-x-72 lg:translate-y-4 lg:rotate-[6deg] lg:hover:rotate-0 lg:hover:z-40 transition-transform duration-300">
            <LineByLineAssessmentCard />
          </div>
        </div>
      </div>

      <BackgroundBeams className="bg-bg-dark" />
    </div>
  );
};

export default HeroSection;
