import Image from "next/image";
import LiquidEther from "@/components/LiquidEther";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const words = [
  {
    text: "upload",
    className:
      "text-lg sm:text-4xl font-bold font-outfit mx-1 sm:mx-2 text-purple-50",
  },
  {
    text: "->",
    className: "text-lg sm:text-4xl mx-1 sm:mx-2 text-purple-400",
  },
  {
    text: "score",
    className:
      "text-lg sm:text-4xl font-bold font-outfit mx-1 sm:mx-2 text-purple-50",
  },
  {
    text: "->",
    className: "text-xl sm:text-4xl mx-1 sm:mx-2 text-purple-400",
  },
  {
    text: "imporve",
    className:
      "text-lg sm:text-4xl font-bold font-outfit mx-1 sm:mx-2 text-purple-50",
  },
];

export default function Home() {
  return (
    <div className="bg-mainBg relative h-[600px] w-full">
      <LiquidEther
        colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
        mouseForce={20}
        cursorSize={100}
        isViscous={false}
        viscous={30}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.5}
        isBounce={false}
        autoDemo={true}
        autoSpeed={0.5}
        autoIntensity={2.2}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="px-4 sm:px-6"
      >
        <h1 className="font-outfit text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white text-center leading-tight">
          STOP GUESSING , START SCORING
        </h1>
        <TypewriterEffect words={words} className="mt-3 sm:mt-5 " />
        <div className="flex mt-4 sm:mt-5 justify-center gap-3 sm:gap-4 flex-wrap">
          <Link
            href={"/login"}
            className="bg-white/15 p-2 px-4 sm:p-2 sm:px-6 border border-white hover:bg-white/40 transition-colors z-50 cursor-pointer rounded-2xl font-vazir text-white text-sm sm:text-base pointer-events-auto"
          >
            ثبت نام
          </Link>
          <Link
            href={"/login"}
            className="bg-white/15 p-2 px-4 sm:p-2 sm:px-6 border border-white hover:bg-white/40 transition-colors z-50 cursor-pointer rounded-2xl font-vazir text-white text-sm sm:text-base pointer-events-auto"
          >
            ورود
          </Link>
        </div>
      </div>
    </div>
  );
}
