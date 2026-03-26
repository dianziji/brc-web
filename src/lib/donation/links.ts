import type { DonationLocale } from "@/lib/donation/types";

export const DONATION_PAGE_URLS = {
  zh: "https://cms.bethelrc.org/donation-zh/",
  en: "https://cms.bethelrc.org/donation-en/",
} as const satisfies Record<DonationLocale, string>;

export function getDonationPageUrl(locale: DonationLocale): string {
  return DONATION_PAGE_URLS[locale];
}

export function withDonationQueryParams(
  locale: DonationLocale,
  params: Record<string, string | undefined>
): string {
  const donationUrl = new URL(getDonationPageUrl(locale));
  for (const [key, value] of Object.entries(params)) {
    if (!value) continue;
    donationUrl.searchParams.set(key, value);
  }
  return donationUrl.toString();
}
