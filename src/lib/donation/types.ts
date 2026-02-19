export type DonationProvider = "legacy_wp" | "supabase_portal";

export type DonationPortalConfig = {
  provider: DonationProvider;
  donateUrl: string;
};
