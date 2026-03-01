"use client";

import Image from "next/image";
import { useRef } from "react";
import type { MediaCardProps } from "@/components/home/types";

type Slide = Pick<MediaCardProps, "title" | "subtitle" | "href"> & {
  src: string;
};

type MobileMinistryScrollerProps = {
  slides: Slide[];
  previousAriaLabel: string;
  nextAriaLabel: string;
};

export default function MobileMinistryScroller({
  slides,
  previousAriaLabel,
  nextAriaLabel,
}: MobileMinistryScrollerProps) {
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
        aria-label={previousAriaLabel}
        onClick={() => scrollByPage(-1)}
        className="icon-btn-inverse focus-ring-token absolute left-2 top-1/2 z-20 -translate-y-1/2 text-lg"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label={nextAriaLabel}
        onClick={() => scrollByPage(1)}
        className="icon-btn-inverse focus-ring-token absolute right-2 top-1/2 z-20 -translate-y-1/2 text-lg"
      >
        ›
      </button>

      <div
        ref={scrollerRef}
        className="flex snap-x gap-1 overflow-x-auto pb-1 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((item) => (
          <a key={`${item.href}-${item.title}`} href={item.href} className="card-overlay-card relative min-h-[190px] min-w-full snap-start overflow-hidden">
            <Image src={item.src} alt={item.title} fill className="object-cover object-center" />
            <div className="media-overlay-strong absolute inset-0" />
            <div className="absolute inset-x-0 bottom-0 space-y-1.5 px-4 pb-4 text-center text-white">
              <div className="font-display text-h3-token font-semibold">{item.title}</div>
              <div className="text-caption-token text-dk-title-token">{item.subtitle}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
