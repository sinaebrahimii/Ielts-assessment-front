import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
  IconBallpen,
} from "@tabler/icons-react";

export function FeaturesBento() {
  return (
    <BentoGrid className="max-w-4xl mx-auto text-white ">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={`${i === 3 || i === 6 ? "md:col-span-3" : ""} bg-bg-light text-white`}
        />
      ))}
    </BentoGrid>
  );
}

interface GridImageProps {
  src: string;
  alt: string;
  className?: string; // Allows passing additional classes to the wrapper
  imageClassName?: string; // Allows passing additional classes to the img element
}

const GridImage = ({ src, alt, className, imageClassName }: GridImageProps) => (
  <div
    className={cn(
      "flex flex-1 w-full h-full min-h-24 rounded-xl overflow-hidden dark:bg-neutral-900",
      className,
    )}
  >
    <img
      src={src}
      alt={alt}
      // Changed "object-center" to "object-top" or custom percentages to shift the X/Y view
      className={cn(
        "w-full h-full object-cover object-[50%_50%] transition duration-200",
        imageClassName,
      )}
    />
  </div>
);

// Swap out the generic "/images/..." paths with your actual filenames inside the public folder
const items = [
  {
    title: "دریافت نقاط قوت و ضعف",
    description:
      "نقاط ضعف و قوت خود را در هر چهار معیار اصلی آیلتس شناسایی کنید.",
    header: (
      <GridImage src="/images/writing_closeup.webp" alt="writing close up" />
    ),
    icon: <IconBallpen className="h-4 w-4 text-pink-300" />,
  },
  {
    title: "دریافت نمره واقعی",
    description: "نمره دهی writing شما توسط هوش مصنوعی",
    header: <GridImage src="/images/ielts_score.webp" alt="Digital" />,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "تحلیل نوشته شما بر اساس معیار های Ielts",
    description: "بازخورد آنی و موشکافانه روی گرامر، لغت و ساختار رایتینگ شما",
    header: <GridImage src="/images/rubrics.webp" alt="Ielts Rubrics" />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: " ارتقای خط به خط نوشته‌های شما",
    description:
      "هوش مصنوعی نقاط ضعف متن شما را ردیابی کرده و به شما می‌آموزد چطور روان‌تر و حرفه‌ای‌تر بنویسید.",
    header: (
      <GridImage
        src="/images/enhance.webp"
        alt="Enhance"
        imageClassName="object-[95%_5%]"
      />
    ),
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
];
