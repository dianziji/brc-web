"use client";

import { useMemo, useRef, useState } from "react";
import type { ArchiveItem } from "@/content/ministries/archive";
import { pickLocalized, type Locale } from "@/lib/i18n";

type ArchiveGridProps = {
  items: ArchiveItem[];
  detailsLabel: string;
  locale: Locale;
};

export default function ArchiveGrid({ items, detailsLabel, locale }: ArchiveGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [overlay, setOverlay] = useState<{
    dx: number;
    dy: number;
    scale: number;
    width: number;
  } | null>(null);
  const closeTimer = useRef<number | null>(null);
  const cards = useMemo(() => items, [items]);
  const activeItem = activeIndex !== null ? cards[activeIndex] : null;
  const activeSummary =
    activeItem &&
    pickLocalized(locale, {
      zh: activeItem.summary,
      en: activeItem.summaryEn,
      fallback: activeItem.summary,
    });
  const activeCategory =
    activeItem &&
    pickLocalized(locale, {
      zh: activeItem.category,
      en: activeItem.categoryEn,
      fallback: activeItem.category,
    });
  const activeSubcategory =
    activeItem &&
    pickLocalized(locale, {
      zh: activeItem.subcategory,
      en: activeItem.subcategoryEn,
      fallback: activeItem.subcategory,
    });
  const activeTitle =
    activeItem &&
    pickLocalized(locale, {
      zh: activeItem.title,
      en: activeItem.titleEn,
      fallback: activeItem.title,
    });
  const activeDate =
    activeItem &&
    pickLocalized(locale, {
      zh: activeItem.date,
      en: activeItem.dateEn,
      fallback: activeItem.date,
    });

  const openFromImage = (index: number, element: HTMLElement) => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    const rect = element.getBoundingClientRect();
    const targetWidth = Math.min(640, window.innerWidth - 32);
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const rectCenterX = rect.left + rect.width / 2;
    const rectCenterY = rect.top + rect.height / 2;
    const deltaX = rectCenterX - centerX;
    const deltaY = rectCenterY - centerY;
    const scale = rect.width / targetWidth;

    setActiveIndex(index);
    setIsOpen(false);
    setOverlay({ dx: deltaX, dy: deltaY, scale, width: targetWidth });
    requestAnimationFrame(() => {
      setIsOpen(true);
    });
  };

  const closeOverlay = () => {
    setIsOpen(false);
    closeTimer.current = window.setTimeout(() => {
      setActiveIndex(null);
      setOverlay(null);
    }, 220);
  };
  const fallbackSrc = "/assets/images/logo.png";
  const fallbackThumbClass = "h-20 w-full rounded-md bg-surface-a object-contain p-2";
  const fallbackHeroClass = "h-56 w-full rounded-t-2xl bg-surface-a object-contain p-8";

  return (
    <div className="relative">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards.map((item, index) => (
          <article
            key={`${item.category}-${item.title}-${item.date}-grid`}
            className="group relative cursor-pointer rounded-lg border border-token bg-surface-a p-2 text-heading-token shadow-sm transition-transform duration-200 hover:-translate-y-1"
            onClick={(event) => openFromImage(index, event.currentTarget)}
          >
            {item.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.imageUrl}
                alt={item.title}
                className="h-20 w-full rounded-md object-cover"
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
            <div className="mt-2 text-[10px] uppercase tracking-wide text-muted-token">
              {pickLocalized(locale, {
                zh: item.category,
                en: item.categoryEn,
                fallback: item.category,
              })}{" "}
              ·{" "}
              {pickLocalized(locale, {
                zh: item.subcategory,
                en: item.subcategoryEn,
                fallback: item.subcategory,
              }) || "—"}
            </div>
            <div className="mt-1 text-xs font-semibold text-heading-token">
              {pickLocalized(locale, {
                zh: item.title,
                en: item.titleEn,
                fallback: item.title,
              })}
            </div>
            {item.date ? (
              <div className="mt-1 text-xs text-muted-token">
                {pickLocalized(locale, {
                  zh: item.date,
                  en: item.dateEn,
                  fallback: item.date,
                })}
              </div>
            ) : null}
          </article>
        ))}
      </div>

      {activeItem ? (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity duration-200 ${
            isOpen ? "bg-surface-a/70 opacity-100" : "bg-surface-a/0 opacity-0"
          }`}
          onClick={closeOverlay}
        >
          <article
            className={`rounded-2xl border border-token bg-surface-a text-heading-token shadow-2xl transition-transform duration-200 ${
              isOpen ? "scale-100" : "scale-95"
            }`}
            style={{
              width: overlay ? `${overlay.width}px` : "min(640px, 90vw)",
              maxWidth: "90vw",
              maxHeight: "80vh",
              transform: isOpen
                ? "translate(-50%, -50%) scale(1)"
                : `translate(calc(-50% + ${overlay?.dx ?? 0}px), calc(-50% + ${overlay?.dy ?? 0}px)) scale(${
                    overlay?.scale ?? 1
                  })`,
              position: "fixed",
              left: "50%",
              top: "50%",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            {activeItem.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={activeItem.imageUrl}
                alt={activeItem.title}
                className="h-56 w-full rounded-t-2xl object-cover"
                loading="lazy"
                onError={(event) => {
                  const target = event.currentTarget;
                  if (target.src.endsWith(fallbackSrc)) return;
                  target.src = fallbackSrc;
                  target.className = fallbackHeroClass;
                }}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={fallbackSrc}
                alt="BRC logo"
                className={fallbackHeroClass}
                loading="lazy"
              />
            )}
            <div className="p-6">
              <div className="text-xs uppercase tracking-wide text-muted-token">
                {activeCategory} · {activeSubcategory || "—"}
              </div>
              <div className="mt-2 text-xl font-semibold">{activeTitle}</div>
              {activeDate ? <div className="mt-2 text-sm text-muted-token">{activeDate}</div> : null}
              {activeSummary ? <p className="mt-4 text-sm text-body-color-token">{activeSummary}</p> : null}
              {activeItem.link ? (
                <a
                  className="mt-5 inline-flex text-sm font-medium text-heading-token underline"
                  href={activeItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {detailsLabel}
                </a>
              ) : null}
            </div>
          </article>
        </div>
      ) : null}
    </div>
  );
}
