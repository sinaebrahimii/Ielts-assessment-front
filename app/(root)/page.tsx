"use client";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import { CanvasText } from "@/components/ui/canvas-text";
import { Highlighter } from "@/components/ui/highlighter";
import { AssessmentCard } from "@/features/landing/components/assesment-card";
import { LineByLineAssessmentCard } from "@/features/landing/components/line-by-line-assessment";
import { ProgressCard } from "@/features/landing/components/progress-card";
import Link from "next/link";

export default function Home() {
  return (
    <div
      dir="rtl"
      className="min-h-screen w-full font-vazirmatn  bg-stone-900 relative flex flex-col items-center justify-center antialiased overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 mt-20 sm:px-4 flex flex-col items-center z-10 relative">
        <div dir="rtl" className="relative z-20 px-4 sm:px-6">
          {/* Main heading - centered (wraps nicely on mobile) */}
          <h1
            className="text-center font-sans font-extrabold tracking-tight leading-[1.35] sm:leading-[1.6] md:leading-[1.8]
                 text-2xl sm:text-4xl md:text-5xl xl::text-9xl
                 bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-400"
          >
            <span className="flex flex-wrap md:flex-nowrap justify-center items-center gap-x-2 gap-y-2">
              <span className="whitespace-nowrap flex-1 text-nowrap">
                تقویت مهارت های نوشتار آیلتس با
              </span>

              {/* Keep "هوش مصنوعی" as a single chunk; allow line-break before it on mobile */}
              <span className="shrink-0 whitespace-nowrap">
                <CanvasText
                  text="هوش مصنوعی"
                  className="font-extrabold inline-block"
                  backgroundClassName="bg-purple-500 dark:bg-purple-700"
                  colors={[
                    "rgba(88, 28, 135, 1)",
                    "rgba(88, 28, 135, 0.9)",
                    "rgba(88, 28, 135, 0.8)",
                    "rgba(88, 28, 135, 0.7)",
                    "rgba(88, 28, 135, 0.6)",
                    "rgba(88, 28, 135, 0.5)",
                    "rgba(88, 28, 135, 0.4)",
                    "rgba(88, 28, 135, 0.3)",
                    "rgba(88, 28, 135, 0.2)",
                    "rgba(88, 28, 135, 0.1)",
                  ]}
                  lineGap={4}
                  animationDuration={20}
                />
              </span>
            </span>
          </h1>

          {/* Secondary content - right aligned; better sizing/leading on mobile */}
          <div className="mt-6 sm:mt-8 max-w-3xl mx-auto text-center space-y-3 sm:space-y-4">
            <h2 className="text-base sm:text-xl md:text-2xl   xl:leading-relaxed font-medium leading-7 sm:leading-9 text-gray-300">
              رایتینگ خود را بنویسید و در لحظه نمره بگیرید. با فیدبک دقیق هوش
              مصنوعی، اشتباهاتتان را قبل از آزمون اصلی برطرف کنید.
            </h2>

            <h3 className="text-lg sm:text-2xl md:text-3xl font-light  text-white">
              <Highlighter action="highlight" color="#413185">
                هوشمندانه
              </Highlighter>
              <span className="mx-2">تمرین کنید،</span>
              <Highlighter action="underline" color="#E09779">
                نه بیشتر!
              </Highlighter>
            </h3>
          </div>
        </div>
        <h4 className="my-5 text-sm text-center md:text-2xl  text-gray-300">
          همین حالا با ثبت نام ، اولین متن خود را بدون هزینه برای تحلیل به هوش
          مصنوعی بسپارید.
        </h4>
        <Link href={"/login"}>
          <Button
            variant={"outline"}
            className="bg-transparent w-sm mt-2 text-white md:w-sm mx-auto cursor-pointer"
          >
            ثبت نام
          </Button>
        </Link>

        <div className="relative w-full h-auto md:h-[420px] flex flex-col md:flex-row items-center justify-center py-10 md:py-0 -space-y-[10%] md:-space-y-0">
          {/* Left card - Top on mobile, rotated left on desktop */}
          <div className="relative md:absolute z-10 md:-translate-x-80 md:rotate-[-8deg] scale-90 opacity-90 shadow-xl">
            <AssessmentCard />
          </div>

          {/* Center card - Middle on mobile, front and center on desktop */}
          <div className="relative md:absolute z-30 shadow-2xl scale-95">
            <ProgressCard />
          </div>

          {/* Right card - Bottom on mobile, rotated right on desktop */}
          <div className="relative md:absolute z-20 md:translate-x-76 md:translate-y-5 md:rotate-[10deg] scale-85 opacity-90 shadow-xl">
            <LineByLineAssessmentCard />
          </div>
        </div>
      </div>

      <BackgroundBeams className="bg-zinc-900" />
    </div>
  );
}
