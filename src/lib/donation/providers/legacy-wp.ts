import { getDonationPageUrl } from "@/lib/donation/links";
import type { DonationLocale, DonationPortalConfig } from "@/lib/donation/types";

function pickLocalizedDonationUrl(
  locale: DonationLocale,
  urls: {
    zh?: string;
    en?: string;
    fallback?: string;
  }
): string {
  if (locale === "en") return urls.en || urls.fallback || urls.zh || getDonationPageUrl("en");
  return urls.zh || urls.fallback || urls.en || getDonationPageUrl("zh");
}

export function getLegacyWpDonationConfig(locale: DonationLocale): DonationPortalConfig {
  const configuredUrl = process.env.DONATION_LEGACY_FORM_URL?.trim();
  const configuredZhUrl = process.env.DONATION_LEGACY_FORM_URL_ZH?.trim();
  const configuredEnUrl = process.env.DONATION_LEGACY_FORM_URL_EN?.trim();

  return {
    provider: "legacy_wp",
    donateUrl: pickLocalizedDonationUrl(locale, {
      zh: configuredZhUrl,
      en: configuredEnUrl,
      fallback: configuredUrl,
    }),
  };
}
