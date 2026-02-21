"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ArchiveItem } from "@/content/ministries/archive";
import { pickLocalized, type Locale } from "@/lib/i18n";

type ArchiveScene3DProps = {
  items: ArchiveItem[];
  detailsLabel: string;
  locale: Locale;
};

type CardLayout = {
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
};

function createSeededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

function layoutCards(items: ArchiveItem[]): CardLayout[] {
  const rand = createSeededRandom(42);
  const layouts: CardLayout[] = [];
  const zSpacing = 180;
  const diagX = 140;
  const diagY = 90;
  const jitterX = 40;
  const jitterY = 30;
  const offsetX = -((items.length - 1) * diagX) / 2;
  const offsetY = ((items.length - 1) * diagY) / 2;

  for (let i = 0; i < items.length; i += 1) {
    // Axis-aligned diagonal from bottom-left to top-right.
    const baseX = i * diagX;
    const baseY = -i * diagY;
    const x = offsetX + baseX + (rand() - 0.5) * jitterX;
    const y = offsetY + baseY + (rand() - 0.5) * jitterY;
    // Deeper cards sit farther back along Z.
    const z = -i * zSpacing - rand() * 60;
    // Slight per-card tilt to avoid uniform look.
    const rx = 16 + rand() * 6;
    const ry = -20 + rand() * 6;
    const rz = 32 + rand() * 8;
    layouts.push({ x, y, z, rx, ry, rz });
  }

  return layouts;
}

export default function ArchiveScene3D({ items, detailsLabel, locale }: ArchiveScene3DProps) {
  const viewRef = useRef<HTMLDivElement | null>(null);
  const camRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const fallbackSrc = "/images/logo.png";
  const fallbackThumbClass = "h-32 w-full rounded-t-2xl bg-white object-contain p-3";

  const cards = useMemo(() => items.slice(0, 50), [items]);
  const layout = useMemo(() => layoutCards(cards), [cards]);
  const minZ = useMemo(() => Math.min(...layout.map((card) => card.z)), [layout]);
  const depthRange = Math.abs(minZ) + 400;

  useEffect(() => {
    const view = viewRef.current;
    const cam = camRef.current;
    if (!view || !cam) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let targetZ = 0;
    let targetX = 0;
    let targetY = 0;
    let currentZ = 0;
    let currentX = 0;
    let currentY = 0;
    let lastTouchY: number | null = null;
    let frame = 0;

    const maxTravel = Math.abs(minZ) + 600;

    const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

    // Use wheel to move the camera, without scrolling the page.
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const next = targetZ + event.deltaY * 1.1;
      targetZ = clamp(next, 0, maxTravel);
    };

    // Subtle parallax based on pointer position.
    const onMouseMove = (event: MouseEvent) => {
      const rect = view.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 40;
      targetY = y * 25;
    };

    const onMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    // Touch-drag fallback so mobile users can move through depth.
    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      lastTouchY = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length !== 1 || lastTouchY === null) return;
      event.preventDefault();
      const currentTouchY = event.touches[0]?.clientY ?? lastTouchY;
      const delta = lastTouchY - currentTouchY;
      const next = targetZ + delta * 1.2;
      targetZ = clamp(next, 0, maxTravel);
      lastTouchY = currentTouchY;
    };

    const onTouchEnd = () => {
      lastTouchY = null;
    };

    // RAF loop with lerp smoothing for premium motion.
    const tick = () => {
      if (!reducedMotion) {
        currentZ += (targetZ - currentZ) * 0.08;
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;
      } else {
        currentZ = targetZ;
        currentX = targetX;
        currentY = targetY;
      }

      cam.style.transform = `translate3d(${currentX}px, ${currentY}px, ${currentZ}px)`;
      frame = requestAnimationFrame(tick);
    };

    view.addEventListener("wheel", onWheel, { passive: false });
    view.addEventListener("mousemove", onMouseMove);
    view.addEventListener("mouseleave", onMouseLeave);
    view.addEventListener("touchstart", onTouchStart, { passive: true });
    view.addEventListener("touchmove", onTouchMove, { passive: false });
    view.addEventListener("touchend", onTouchEnd);
    view.addEventListener("touchcancel", onTouchEnd);
    frame = requestAnimationFrame(tick);

    return () => {
      view.removeEventListener("wheel", onWheel);
      view.removeEventListener("mousemove", onMouseMove);
      view.removeEventListener("mouseleave", onMouseLeave);
      view.removeEventListener("touchstart", onTouchStart);
      view.removeEventListener("touchmove", onTouchMove);
      view.removeEventListener("touchend", onTouchEnd);
      view.removeEventListener("touchcancel", onTouchEnd);
      cancelAnimationFrame(frame);
    };
  }, [minZ]);

  return (
    // Viewport -> camera -> scene structure keeps 3D transforms manageable.
    <div className="archive-viewport" ref={viewRef}>
      <div className="archive-camera" ref={camRef}>
        <div className="archive-scene" style={{ height: "900px" }}>
          {cards.map((item, index) => {
            const card = layout[index];
            const depthFade = Math.max(0.25, 1 - Math.abs(card.z) / depthRange);
            const depthScale = 0.92 + depthFade * 0.08;
            const style: Record<string, string> = {
              "--card-x": `${card.x}px`,
              "--card-y": `${card.y}px`,
              "--card-z": `${card.z}px`,
              "--card-rx": `${card.rx}deg`,
              "--card-ry": `${card.ry}deg`,
              "--card-rz": `${card.rz}deg`,
              "--card-scale": `${depthScale}`,
              opacity: `${depthFade}`,
            };

            const summary = pickLocalized(locale, {
              zh: item.summary,
              en: item.summaryEn,
              fallback: item.summary,
            });
            const category = pickLocalized(locale, {
              zh: item.category,
              en: item.categoryEn,
              fallback: item.category,
            });
            const subcategory = pickLocalized(locale, {
              zh: item.subcategory,
              en: item.subcategoryEn,
              fallback: item.subcategory,
            });
            const title = pickLocalized(locale, {
              zh: item.title,
              en: item.titleEn,
              fallback: item.title,
            });
            const date = pickLocalized(locale, {
              zh: item.date,
              en: item.dateEn,
              fallback: item.date,
            });

            return (
              <article
                key={`${item.category}-${item.title}-${item.date}-3d`}
                className={`archive-card-3d ${activeIndex === index ? "is-active" : ""}`}
                style={style}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <div className="archive-card-inner">
                  {item.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="h-32 w-full rounded-t-2xl object-cover"
                      loading="lazy"
                      onError={(event) => {
                        const target = event.currentTarget;
                        if (target.src.endsWith(fallbackSrc)) return;
                        target.src = fallbackSrc;
                        target.className = fallbackThumbClass;
                      }}
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={fallbackSrc}
                      alt="BRC logo"
                      className={fallbackThumbClass}
                      loading="lazy"
                    />
                  )}
                  <div className="p-4">
                    <div className="text-[11px] uppercase tracking-wide text-zinc-400">
                      {category} · {subcategory || "—"}
                    </div>
                    <div className="mt-2 text-sm font-semibold text-zinc-100">{title}</div>
                    {date ? <div className="mt-1 text-xs text-zinc-400">{date}</div> : null}
                    <p className="mt-2 text-xs text-zinc-300">{summary}</p>
                    {item.link ? (
                      <a
                        className="mt-3 inline-flex text-xs font-medium text-zinc-100 underline"
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(event) => event.stopPropagation()}
                      >
                        {detailsLabel}
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
