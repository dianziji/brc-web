"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import type { CampaignBannerModel } from "@/lib/featured-campaign";
import { CAMPAIGN_HTML_ATTRIBUTE, markCampaignDismissed } from "./campaign-dismissal";

type CampaignBannerProps = {
  banner: CampaignBannerModel;
  ctaLabel: string;
  closeLabel: string;
};

/**
 * High-contrast announcement strip rendered inside the fixed header, above the
 * nav row. Visibility is driven by `html[data-campaign-banner]` (set before
 * first paint by the boot script in the site layout) so there is no flash and
 * the body padding that makes room for it is right from the first frame.
 */
export default function CampaignBanner({ banner, ctaLabel, closeLabel }: CampaignBannerProps) {
  // A banner dismissed on a previous visit is hidden by CSS via the html
  // attribute the boot script sets, so no storage read is needed here.
  const [dismissed, setDismissed] = useState(false);

  const dismiss = useCallback(() => {
    markCampaignDismissed("banner", banner.id);
    document.documentElement.setAttribute(CAMPAIGN_HTML_ATTRIBUTE, "dismissed");
    setDismissed(true);
  }, [banner.id]);

  if (dismissed) return null;

  return (
    <div className="campaign-banner" data-tone={banner.tone} role="region" aria-label={banner.message}>
      <div className="section-container-medium campaign-banner-inner">
        <span className="campaign-banner-tag" aria-hidden="true">
          {banner.tag}
        </span>
        <Link href={banner.href} className="campaign-banner-message focus-ring-token">
          <span className="campaign-banner-text">{banner.message}</span>
          <span className="campaign-banner-cta">
            <span className="campaign-banner-cta-label">{ctaLabel}</span>
            <span aria-hidden="true"> →</span>
          </span>
        </Link>
        <button type="button" className="campaign-banner-close focus-ring-token" aria-label={closeLabel} onClick={dismiss}>
          <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true" focusable="false">
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        </button>
      </div>
    </div>
  );
}
