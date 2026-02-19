import type { DonationPortalConfig } from "@/lib/donation/types";

export const DEFAULT_LEGACY_DONATION_URL = "https://newbethelrc.org/donations/donation-form/";

export function getLegacyWpDonationConfig(): DonationPortalConfig {
  const configuredUrl = process.env.DONATION_LEGACY_FORM_URL?.trim();
  return {
    provider: "legacy_wp",
    donateUrl: configuredUrl || DEFAULT_LEGACY_DONATION_URL,
  };
}
