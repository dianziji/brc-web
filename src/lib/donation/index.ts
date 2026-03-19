import "server-only";
import { getLegacyWpDonationConfig } from "@/lib/donation/providers/legacy-wp";
import { getSupabaseDonationConfig } from "@/lib/donation/providers/supabase-portal";
import type { DonationLocale, DonationPortalConfig, DonationProvider } from "@/lib/donation/types";

const DEFAULT_DONATION_PROVIDER: DonationProvider = "legacy_wp";

function resolveDonationProvider(): DonationProvider {
  const raw = process.env.DONATION_PROVIDER?.trim();
  if (raw === "legacy_wp" || raw === "supabase_portal") return raw;
  return DEFAULT_DONATION_PROVIDER;
}

export function getDonationPortalConfig(locale: DonationLocale = "zh"): DonationPortalConfig {
  const provider = resolveDonationProvider();

  if (provider === "supabase_portal") {
    const supabaseConfig = getSupabaseDonationConfig(locale);
    if (supabaseConfig) return supabaseConfig;
    console.warn(
      `[donation] DONATION_PROVIDER=supabase_portal but no Supabase donation URL is configured for locale="${locale}", fallback to legacy_wp`
    );
  }

  return getLegacyWpDonationConfig(locale);
}
