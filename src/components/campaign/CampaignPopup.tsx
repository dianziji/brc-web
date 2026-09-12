"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CampaignPopupModel } from "@/lib/featured-campaign";
import { isCampaignDismissed, markCampaignDismissed } from "./campaign-dismissal";

type CampaignPopupProps = {
  campaign: CampaignPopupModel;
  labels: {
    learnMore: string;
    donate: string;
    close: string;
  };
  /** Delay before the popup appears, so the hero gets its first paint. */
  openDelayMs?: number;
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * One-time "featured ministry" dialog for the home page. Closing it (or
 * following either call to action) snoozes it for `campaign.snoozeHours`.
 */
export default function CampaignPopup({ campaign, labels, openDelayMs = 700 }: CampaignPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  // Falls back to the bundled poster if the CMS image fails to load.
  const [posterSrc, setPosterSrc] = useState(campaign.posterSrc);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isCampaignDismissed("popup", campaign.id, campaign.snoozeHours)) return;
    const timer = window.setTimeout(() => setIsOpen(true), openDelayMs);
    return () => window.clearTimeout(timer);
  }, [campaign.id, campaign.snoozeHours, openDelayMs]);

  const dismiss = useCallback(() => {
    markCampaignDismissed("popup", campaign.id);
    setIsOpen(false);
  }, [campaign.id]);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        dismiss();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused.current?.focus?.();
    };
  }, [isOpen, dismiss]);

  if (!isOpen) return null;

  const titleId = `campaign-popup-title-${campaign.id}`;
  const descriptionId = `campaign-popup-desc-${campaign.id}`;

  return (
    <div className="campaign-popup-root" data-tone={campaign.tone}>
      <button type="button" className="campaign-popup-backdrop" aria-label={labels.close} onClick={dismiss} />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="campaign-popup-dialog"
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="campaign-popup-close focus-ring-token"
          aria-label={labels.close}
          onClick={dismiss}
        >
          <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false">
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        </button>

        <div className="campaign-popup-poster">
          <Image
            src={posterSrc}
            alt={campaign.posterAlt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 320px"
            className="object-cover object-top"
            onError={() => {
              if (posterSrc !== campaign.posterFallbackSrc) setPosterSrc(campaign.posterFallbackSrc);
            }}
          />
        </div>

        <div className="campaign-popup-body">
          <p className="campaign-popup-eyebrow">{campaign.eyebrow}</p>
          <h2 id={titleId} className="font-display campaign-popup-title text-heading-token">
            {campaign.title}
          </h2>
          {campaign.subtitle ? <p className="campaign-popup-subtitle text-muted-token">{campaign.subtitle}</p> : null}
          <p id={descriptionId} className="campaign-popup-summary text-body-color-token">
            {campaign.summary}
          </p>
          {campaign.highlights.length > 0 ? (
            <ul className="campaign-popup-highlights text-body-color-token">
              {campaign.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          <div className="campaign-popup-actions">
            <a className="btn-base btn-donation-cta focus-ring-token campaign-popup-btn" href={campaign.donateHref} onClick={dismiss}>
              {labels.donate}
            </a>
            <Link className="btn-base btn-secondary focus-ring-token campaign-popup-btn" href={campaign.learnMoreHref} onClick={dismiss}>
              {labels.learnMore}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
