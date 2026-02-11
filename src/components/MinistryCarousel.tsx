"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Slide = {
  title: string;
  subtitle: string;
  src: string;
  href?: string;
};

type MinistryCarouselProps = {
  slides?: Slide[];
  detailsLabel?: string;
};

export default function MinistryCarousel({ slides, detailsLabel }: MinistryCarouselProps) {
  const effectiveSlides = slides ?? [];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (effectiveSlides.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % effectiveSlides.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [effectiveSlides.length]);

  if (effectiveSlides.length === 0) {
    return null;
  }

  const active = effectiveSlides[index] ?? effectiveSlides[0];

  return (
    <div className="w-full">
      <div className="relative h-[420px] w-full overflow-hidden bg-zinc-100">
        <Image src={active.src} alt={active.title} fill className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <div className="text-2xl font-semibold">{active.title}</div>
          <div className="mt-1 text-sm text-zinc-200">{active.subtitle}</div>
          {active.href && detailsLabel ? (
            <Link
              href={active.href}
              className="mt-3 inline-flex text-sm font-medium text-white underline underline-offset-2"
            >
              {detailsLabel}
            </Link>
          ) : null}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-2">
        {effectiveSlides.map((slide, i) => (
          <button
            key={`${slide.title}-${i}`}
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
