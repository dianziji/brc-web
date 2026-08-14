"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export type NewsHeroSlide = {
  id: string;
  title: string;
  tag: string;
  meta: string;
  summary?: string;
  ctaLabel: string;
  href: string;
  image: string;
};

type NewsHeroCarouselProps = {
  slides: NewsHeroSlide[];
  previousLabel: string;
  nextLabel: string;
  /** e.g. "第 {index} 張：{title}" — interpolated here because a server
   *  component cannot hand a function across the client boundary. */
  slideLabelTemplate: string;
};

const AUTOPLAY_MS = 5500;

export default function NewsHeroCarousel({
  slides,
  previousLabel,
  nextLabel,
  slideLabelTemplate,
}: NewsHeroCarouselProps) {
  const slideLabel = (index: number, title: string) =>
    slideLabelTemplate.replace("{index}", String(index)).replace("{title}", title);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // Bumped on every change so the progress-bar animation restarts from zero.
  const [cycle, setCycle] = useState(0);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = query.matches;
    const onChange = () => {
      reducedMotionRef.current = query.matches;
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const goTo = useCallback(
    (next: number) => {
      if (slides.length === 0) return;
      setIndex(((next % slides.length) + slides.length) % slides.length);
      setCycle((value) => value + 1);
    },
    [slides.length],
  );

  useEffect(() => {
    if (slides.length <= 1 || paused || reducedMotionRef.current) return;
    const id = window.setTimeout(() => goTo(index + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [index, cycle, paused, slides.length, goTo]);

  if (slides.length === 0) return null;

  return (
    <div
      className="news-hero"
      data-paused={paused ? "true" : "false"}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {slides.map((slide, slideIndex) => (
        <div
          key={slide.id}
          className="news-hero-slide"
          data-active={slideIndex === index ? "true" : "false"}
          aria-hidden={slideIndex === index ? undefined : "true"}
        >
          <div className="news-hero-inner">
            <Image
              className="news-hero-poster"
              src={slide.image}
              alt={slide.title}
              width={1000}
              height={1500}
              priority={slideIndex === 0}
              // Eager for every slide: the poster is sized from its natural
              // ratio, so an unloaded slide has a zero-sized box — and a
              // zero-sized lazy image never counts as in-viewport, so it would
              // never load. Only a handful of slides, all above the fold.
              loading={slideIndex === 0 ? undefined : "eager"}
              sizes="(max-width: 640px) 82vw, 56vw"
            />
            <div className="news-hero-copy">
              <span className="news-hero-tag">{slide.tag}</span>
              <h3 className="font-display news-hero-title">{slide.title}</h3>
              <p className="news-hero-meta">{slide.meta}</p>
              {slide.summary ? <p className="news-hero-summary">{slide.summary}</p> : null}
              <Link className="news-hero-cta focus-ring-token" href={slide.href} tabIndex={slideIndex === index ? undefined : -1}>
                {slide.ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {slides.length > 1 ? (
        <>
          <button
            type="button"
            className="news-hero-arrow focus-ring-token"
            style={{ left: "0.625rem" }}
            aria-label={previousLabel}
            onClick={() => goTo(index - 1)}
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            type="button"
            className="news-hero-arrow focus-ring-token"
            style={{ right: "0.625rem" }}
            aria-label={nextLabel}
            onClick={() => goTo(index + 1)}
          >
            <span aria-hidden="true">›</span>
          </button>

          <div className="news-hero-nav">
            {slides.map((slide, slideIndex) => (
              <button
                key={`${slide.id}-nav`}
                type="button"
                className="focus-ring-token"
                aria-label={slideLabel(slideIndex + 1, slide.title)}
                aria-current={slideIndex === index ? "true" : undefined}
                onClick={() => goTo(slideIndex)}
              >
                <span className="news-hero-track">
                  <span
                    className="news-hero-fill"
                    // Remounting on each cycle restarts the countdown fill.
                    key={`${slide.id}-fill-${cycle}`}
                  />
                </span>
              </button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
