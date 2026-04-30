"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MediaCardProps } from "@/components/home/types";

type Slide = Pick<MediaCardProps, "title" | "subtitle" | "href"> & {
  src: string;
};

type MinistryCarouselProps = {
  slides?: Slide[];
  detailsLabel?: string;
};

const TRANSITION_MS = 420;

function getSlideDirection(from: number, to: number, total: number): 1 | -1 {
  if (to === from) return 1;
  if (from === total - 1 && to === 0) return 1;
  if (from === 0 && to === total - 1) return -1;
  return to > from ? 1 : -1;
}

export default function MinistryCarousel({ slides, detailsLabel }: MinistryCarouselProps) {
  const effectiveSlides = slides ?? [];
  const [index, setIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const transitionTimerRef = useRef<number | null>(null);

  const startTransition = useCallback(
    (nextIndex: number, nextDirection: 1 | -1) => {
      if (nextIndex === index) return;
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
      }
      setPreviousIndex(index);
      setDirection(nextDirection);
      setIndex(nextIndex);
      transitionTimerRef.current = window.setTimeout(() => {
        setPreviousIndex(null);
        transitionTimerRef.current = null;
      }, TRANSITION_MS);
    },
    [index],
  );

  useEffect(() => {
    if (effectiveSlides.length <= 1) return;
    const id = window.setInterval(() => {
      const nextIndex = (index + 1) % effectiveSlides.length;
      startTransition(nextIndex, 1);
    }, 4500);
    return () => window.clearInterval(id);
  }, [effectiveSlides.length, index, startTransition]);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  if (effectiveSlides.length === 0) {
    return null;
  }

  const active = effectiveSlides[index] ?? effectiveSlides[0];
  const previous =
    previousIndex !== null ? effectiveSlides[previousIndex] ?? null : null;

  const onSelectSlide = (nextIndex: number) => {
    const nextDirection = getSlideDirection(index, nextIndex, effectiveSlides.length);
    startTransition(nextIndex, nextDirection);
  };

  return (
    <div className="w-full">
      <div className="card-media card-base-hover relative h-[260px] w-full sm:h-[320px] md:h-[420px]">
        {previous ? (
          <div
            aria-hidden="true"
            className={`carousel-slide-layer pointer-events-none ${
              direction === 1 ? "carousel-slide-exit-to-left" : "carousel-slide-exit-to-right"
            }`}
          >
            <Image src={previous.src} alt="" fill sizes="100vw" className="object-cover object-center" />
            <div className="media-overlay-strong absolute inset-0" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="font-display text-h2-token font-semibold">{previous.title}</div>
              <div className="text-caption-token mt-1 text-dk-title-token">{previous.subtitle}</div>
            </div>
          </div>
        ) : null}

        <div
          className={`carousel-slide-layer ${
            previous ? (direction === 1 ? "carousel-slide-enter-from-right" : "carousel-slide-enter-from-left") : ""
          }`}
        >
          <Image src={active.src} alt={active.title} fill sizes="100vw" className="object-cover object-center" />
          <div className="media-overlay-strong absolute inset-0" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="font-display text-h2-token font-semibold">{active.title}</div>
            <div className="text-caption-token mt-1 text-dk-title-token">{active.subtitle}</div>
            {active.href && detailsLabel ? (
              <Link
                href={active.href}
                className="focus-ring-token link-inverse mt-3 inline-flex text-sm"
              >
                {detailsLabel}
              </Link>
            ) : null}
            {effectiveSlides.length > 1 ? (
              <div className="mt-3 flex items-center gap-1.5">
                {effectiveSlides.map((slide, i) => (
                  <button
                    key={`${slide.title}-${i}`}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => onSelectSlide(i)}
                    className="focus-ring-token inline-flex h-6 items-center justify-center"
                  >
                    <span
                      className={`carousel-indicator ${
                        i === index ? "carousel-indicator-active" : ""
                      }`}
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
