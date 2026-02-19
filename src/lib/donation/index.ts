import "server-only";
import { getLegacyWpDonationConfig } from "@/lib/donation/providers/legacy-wp";
import { getSupabaseDonationConfig } from "@/lib/donation/providers/supabase-portal";
import type { DonationPortalConfig, DonationProvider } from "@/lib/donation/types";

const DEFAULT_DONATION_PROVIDER: DonationProvider = "legacy_wp";

function resolveDonationProvider(): DonationProvider {
  const raw = process.env.DONATION_PROVIDER?.trim();
  if (raw === "legacy_wp" || raw === "supabase_portal") return raw;
  return DEFAULT_DONATION_PROVIDER;
}

export function getDonationPortalConfig(): DonationPortalConfig {
  const provider = resolveDonationProvider();

  if (provider === "supabase_portal") {
    const supabaseConfig = getSupabaseDonationConfig();
    if (supabaseConfig) return supabaseConfig;
    console.warn(
      "[donation] DONATION_PROVIDER=supabase_portal but DONATION_SUPABASE_PORTAL_URL is missing, fallback to legacy_wp"
    );
  }

  return getLegacyWpDonationConfig();
}
