"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Slide = {
  title: string;
  subtitle: string;
  src: string;
};

type MinistryCarouselProps = {
  slides?: Slide[];
};

const fallbackSlides: Slide[] = [
  { title: "Life Impact Ministries", subtitle: "生命影响力事工", src: "/images/hero.jpeg" },
  { title: "Cross Culture Ministries", subtitle: "跨文化宣教", src: "/images/hero.jpeg" },
  { title: "CHISTA", subtitle: "基督徒学生行动", src: "/images/hero.jpeg" },
];

export default function MinistryCarousel({ slides }: MinistryCarouselProps) {
  const effectiveSlides = slides && slides.length > 0 ? slides : fallbackSlides;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % effectiveSlides.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [effectiveSlides.length]);

  const active = effectiveSlides[index] ?? effectiveSlides[0];

  return (
    <div className="w-full">
      <div className="relative h-[420px] w-full overflow-hidden bg-zinc-100">
        <Image src={active.src} alt={active.title} fill className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <div className="text-2xl font-semibold">{active.title}</div>
          <div className="mt-1 text-sm text-zinc-200">{active.subtitle}</div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-2">
        {effectiveSlides.map((slide, i) => (
          <button
            key={slide.title}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full transition ${
              i === index ? "bg-zinc-900" : "bg-zinc-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

