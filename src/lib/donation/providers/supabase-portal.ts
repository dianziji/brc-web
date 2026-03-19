import type { DonationLocale, DonationPortalConfig } from "@/lib/donation/types";

function pickLocalizedDonationUrl(
  locale: DonationLocale,
  urls: {
    zh?: string;
    en?: string;
    fallback?: string;
  }
): string | null {
  if (locale === "en") return urls.en || urls.fallback || urls.zh || null;
  return urls.zh || urls.fallback || urls.en || null;
}

export function getSupabaseDonationConfig(locale: DonationLocale): DonationPortalConfig | null {
  const configuredUrl = process.env.DONATION_SUPABASE_PORTAL_URL?.trim();
  const configuredZhUrl = process.env.DONATION_SUPABASE_PORTAL_URL_ZH?.trim();
  const configuredEnUrl = process.env.DONATION_SUPABASE_PORTAL_URL_EN?.trim();
  const donateUrl = pickLocalizedDonationUrl(locale, {
    zh: configuredZhUrl,
    en: configuredEnUrl,
    fallback: configuredUrl,
  });
  if (!donateUrl) return null;

  return {
    provider: "supabase_portal",
    donateUrl,
  };
}
