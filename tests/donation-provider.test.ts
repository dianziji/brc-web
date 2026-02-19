import test from "node:test";
import assert from "node:assert/strict";
import { getDonationPortalConfig } from "../src/lib/donation/index.ts";
import { DEFAULT_LEGACY_DONATION_URL } from "../src/lib/donation/providers/legacy-wp.ts";

const ORIGINAL_PROVIDER = process.env.DONATION_PROVIDER;
const ORIGINAL_LEGACY_URL = process.env.DONATION_LEGACY_FORM_URL;
const ORIGINAL_SUPABASE_URL = process.env.DONATION_SUPABASE_PORTAL_URL;

test.afterEach(() => {
  process.env.DONATION_PROVIDER = ORIGINAL_PROVIDER;
  process.env.DONATION_LEGACY_FORM_URL = ORIGINAL_LEGACY_URL;
  process.env.DONATION_SUPABASE_PORTAL_URL = ORIGINAL_SUPABASE_URL;
});

test("donation provider defaults to legacy wp config", () => {
  delete process.env.DONATION_PROVIDER;
  delete process.env.DONATION_LEGACY_FORM_URL;
  delete process.env.DONATION_SUPABASE_PORTAL_URL;

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

test("donation provider uses supabase portal config when enabled and configured", () => {
  process.env.DONATION_PROVIDER = "supabase_portal";
  process.env.DONATION_SUPABASE_PORTAL_URL = "https://portal.example.org/donations";

  const config = getDonationPortalConfig();
  assert.equal(config.provider, "supabase_portal");
  assert.equal(config.donateUrl, "https://portal.example.org/donations");
});

test("donation provider falls back to legacy when supabase portal url is missing", () => {
  process.env.DONATION_PROVIDER = "supabase_portal";
  delete process.env.DONATION_SUPABASE_PORTAL_URL;
  process.env.DONATION_LEGACY_FORM_URL = "https://legacy.example.org/donate";

  const config = getDonationPortalConfig();
  assert.equal(config.provider, "legacy_wp");
  assert.equal(config.donateUrl, "https://legacy.example.org/donate");
});
