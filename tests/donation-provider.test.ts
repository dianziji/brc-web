import test from "node:test";
import assert from "node:assert/strict";
import { getDonationPortalConfig } from "../src/lib/donation/index.ts";
import { DEFAULT_LEGACY_DONATION_URL } from "../src/lib/donation/providers/legacy-wp.ts";

const ORIGINAL_PROVIDER = process.env.DONATION_PROVIDER;
const ORIGINAL_LEGACY_URL = process.env.DONATION_LEGACY_FORM_URL;
const ORIGINAL_LEGACY_URL_ZH = process.env.DONATION_LEGACY_FORM_URL_ZH;
const ORIGINAL_LEGACY_URL_EN = process.env.DONATION_LEGACY_FORM_URL_EN;
const ORIGINAL_SUPABASE_URL = process.env.DONATION_SUPABASE_PORTAL_URL;
const ORIGINAL_SUPABASE_URL_ZH = process.env.DONATION_SUPABASE_PORTAL_URL_ZH;
const ORIGINAL_SUPABASE_URL_EN = process.env.DONATION_SUPABASE_PORTAL_URL_EN;

function restoreEnv(name: string, value: string | undefined) {
  if (value === undefined) {
    delete process.env[name];
    return;
  }
  process.env[name] = value;
}

test.afterEach(() => {
  restoreEnv("DONATION_PROVIDER", ORIGINAL_PROVIDER);
  restoreEnv("DONATION_LEGACY_FORM_URL", ORIGINAL_LEGACY_URL);
  restoreEnv("DONATION_LEGACY_FORM_URL_ZH", ORIGINAL_LEGACY_URL_ZH);
  restoreEnv("DONATION_LEGACY_FORM_URL_EN", ORIGINAL_LEGACY_URL_EN);
  restoreEnv("DONATION_SUPABASE_PORTAL_URL", ORIGINAL_SUPABASE_URL);
  restoreEnv("DONATION_SUPABASE_PORTAL_URL_ZH", ORIGINAL_SUPABASE_URL_ZH);
  restoreEnv("DONATION_SUPABASE_PORTAL_URL_EN", ORIGINAL_SUPABASE_URL_EN);
});

test("donation provider defaults to legacy wp config", () => {
  delete process.env.DONATION_PROVIDER;
  delete process.env.DONATION_LEGACY_FORM_URL;
  delete process.env.DONATION_LEGACY_FORM_URL_ZH;
  delete process.env.DONATION_LEGACY_FORM_URL_EN;
  delete process.env.DONATION_SUPABASE_PORTAL_URL;
  delete process.env.DONATION_SUPABASE_PORTAL_URL_ZH;
  delete process.env.DONATION_SUPABASE_PORTAL_URL_EN;

  const config = getDonationPortalConfig();
  assert.equal(config.provider, "legacy_wp");
  assert.equal(config.donateUrl, DEFAULT_LEGACY_DONATION_URL);
});

test("donation provider uses custom legacy form url when provided", () => {
  process.env.DONATION_PROVIDER = "legacy_wp";
  process.env.DONATION_LEGACY_FORM_URL = "https://example.org/donate";

  const config = getDonationPortalConfig();
  assert.equal(config.provider, "legacy_wp");
  assert.equal(config.donateUrl, "https://example.org/donate");
});

test("donation provider uses locale-specific legacy form urls when provided", () => {
  process.env.DONATION_PROVIDER = "legacy_wp";
  process.env.DONATION_LEGACY_FORM_URL = "https://example.org/donate-default";
  process.env.DONATION_LEGACY_FORM_URL_ZH = "https://example.org/donate-zh";
  process.env.DONATION_LEGACY_FORM_URL_EN = "https://example.org/donate-en";

  const zhConfig = getDonationPortalConfig("zh");
  const enConfig = getDonationPortalConfig("en");

  assert.equal(zhConfig.provider, "legacy_wp");
  assert.equal(zhConfig.donateUrl, "https://example.org/donate-zh");
  assert.equal(enConfig.provider, "legacy_wp");
  assert.equal(enConfig.donateUrl, "https://example.org/donate-en");
});

test("donation provider uses supabase portal config when enabled and configured", () => {
  process.env.DONATION_PROVIDER = "supabase_portal";
  process.env.DONATION_SUPABASE_PORTAL_URL_EN = "https://portal.example.org/donations-en";

  const config = getDonationPortalConfig("en");
  assert.equal(config.provider, "supabase_portal");
  assert.equal(config.donateUrl, "https://portal.example.org/donations-en");
});

test("donation provider falls back to legacy when supabase portal url is missing", () => {
  process.env.DONATION_PROVIDER = "supabase_portal";
  delete process.env.DONATION_SUPABASE_PORTAL_URL;
  delete process.env.DONATION_SUPABASE_PORTAL_URL_ZH;
  delete process.env.DONATION_SUPABASE_PORTAL_URL_EN;
  process.env.DONATION_LEGACY_FORM_URL = "https://legacy.example.org/donate";

  const config = getDonationPortalConfig();
  assert.equal(config.provider, "legacy_wp");
  assert.equal(config.donateUrl, "https://legacy.example.org/donate");
});
