export type DonationProvider = "legacy_wp" | "supabase_portal";
export type DonationLocale = "zh" | "en";

export type DonationPortalConfig = {
  provider: DonationProvider;
  donateUrl: string;
};
