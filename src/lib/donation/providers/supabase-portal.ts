import type { DonationPortalConfig } from "@/lib/donation/types";

export function getSupabaseDonationConfig(): DonationPortalConfig | null {
  const configuredUrl = process.env.DONATION_SUPABASE_PORTAL_URL?.trim();
  if (!configuredUrl) return null;

  return {
    provider: "supabase_portal",
    donateUrl: configuredUrl,
  };
}
