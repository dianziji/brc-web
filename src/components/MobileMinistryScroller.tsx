"use client";

import Image from "next/image";
import { useRef } from "react";

type Slide = {
  title: string;
  subtitle: string;
  src: string;
  href?: string;
};

export default function MobileMinistryScroller({ slides }: { slides: Slide[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByPage(direction: 1 | -1) {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const delta = Math.max(220, Math.round(scroller.clientWidth * 0.92)) * direction;
    scroller.scrollBy({ left: delta, behavior: "smooth" });
  }

  return (
    <div className="relative mt-3">
      <button
        type="button"
        aria-label="Previous ministries"
        onClick={() => scrollByPage(-1)}
        className="absolute left-2 top-1/2 z-20 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-lg text-white backdrop-blur-sm"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next ministries"
        onClick={() => scrollByPage(1)}
        className="absolute right-2 top-1/2 z-20 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-lg text-white backdrop-blur-sm"
      >
        ›
      </button>

      <div
        ref={scrollerRef}
        className="flex snap-x gap-1 overflow-x-auto pb-1 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((item) => (
          <a key={`${item.href}-${item.title}`} href={item.href} className="relative min-h-[190px] min-w-full snap-start overflow-hidden">
            <Image src={item.src} alt={item.title} fill className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/35 to-black/75" />
            <div className="absolute inset-x-0 bottom-0 space-y-1.5 px-4 pb-4 text-center text-white">
              <div className="text-sm font-semibold">{item.title}</div>
              <div className="text-xs text-white/85">{item.subtitle}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
