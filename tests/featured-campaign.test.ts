import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import type { CalendarEventItem } from "../src/content/calendar/events.ts";
import { normalizeCampaignTone } from "../src/content/home/featured-campaign.ts";
import {
  pickFeaturedCampaign,
  splitHighlights,
  summaryToBlurb,
  toCampaignBannerModel,
  toCampaignPopupModel,
  type FeaturedCampaignNode,
} from "../src/lib/featured-campaign.ts";
import { campaignBannerBootScript, campaignStorageKey } from "../src/components/campaign/campaign-dismissal.ts";

const LABELS_ZH = { eyebrow: "當前重點事工", defaultTag: "重點" };
const LABELS_EN = { eyebrow: "Featured ministry", defaultTag: "Featured" };

function event(overrides: Partial<CalendarEventItem> & { id: string }): CalendarEventItem {
  return {
    titleEn: `${overrides.id} EN`,
    titleZh: `${overrides.id} ZH`,
    date: "2030-01-01",
    time: "",
    location: "",
    image: "https://cms.example.org/poster.jpg",
    endAt: "2030-12-31T00:00:00+00:00",
    ...overrides,
  };
}

function node(slug: string, date: string, extra: Partial<FeaturedCampaignNode["eventCampaign"]> = {}): FeaturedCampaignNode {
  return { slug, status: "publish", date, eventCampaign: { featuredCampaign: true, ...extra } };
}

const events = [event({ id: "older" }), event({ id: "newer" }), event({ id: "ended", endAt: "2020-01-01T00:00:00+00:00" })];

test("no flagged event → no campaign", () => {
  assert.equal(pickFeaturedCampaign([], events), null);
  assert.equal(pickFeaturedCampaign([{ ...node("older", "2026-01-01"), eventCampaign: { featuredCampaign: false } }], events), null);
});

test("most recently published flagged event wins", () => {
  const picked = pickFeaturedCampaign([node("older", "2026-01-01T10:00:00"), node("newer", "2026-03-01T10:00:00")], events);
  assert.equal(picked?.event.id, "newer");
});

test("ended, draft, or unknown events are skipped", () => {
  const picked = pickFeaturedCampaign(
    [
      node("ended", "2026-09-01T10:00:00"),
      { ...node("older", "2026-08-01T10:00:00"), status: "draft" },
      node("missing-from-events", "2026-08-15T10:00:00"),
      node("older", "2026-02-01T10:00:00"),
    ],
    events
  );
  assert.equal(picked?.event.id, "older");
});

test("flag accepts WordPress-style truthy strings", () => {
  const picked = pickFeaturedCampaign([node("older", "2026-01-01", { featuredCampaign: "1" as unknown as boolean })], events);
  assert.equal(picked?.event.id, "older");
});

test("banner and popup models fall back to event data when optional fields are blank", () => {
  const campaign = pickFeaturedCampaign(
    [node("newer", "2026-03-01", { campaignTone: "purple", campaignBannerZh: "  " })],
    [
      event({
        id: "newer",
        titleZh: "為尼泊爾站在破口中",
        titleEn: "Standing in the Breach for Nepal",
        summaryZh: "<p>第一段。第二句。</p>\n<p>第二段不應出現。</p>",
        donationLink: "/nepal-relief",
      }),
    ]
  );
  assert.ok(campaign);

  const banner = toCampaignBannerModel(campaign, "zh", LABELS_ZH);
  assert.equal(banner.id, "event:newer");
  assert.equal(banner.tone, "gold");
  assert.equal(banner.tag, "重點");
  assert.equal(banner.message, "為尼泊爾站在破口中");
  assert.equal(banner.href, "/zh/events/newer");

  const popup = toCampaignPopupModel(campaign, "zh", LABELS_ZH);
  assert.equal(popup.title, "為尼泊爾站在破口中");
  assert.equal(popup.subtitle, "Standing in the Breach for Nepal");
  assert.equal(popup.summary, "第一段。第二句。");
  assert.deepEqual(popup.highlights, []);
  assert.equal(popup.learnMoreHref, "/zh/events/newer");
  assert.equal(popup.donateHref, "/zh/nepal-relief");
  assert.equal(popup.posterSrc, "https://cms.example.org/poster.jpg");
});

test("explicit CMS fields override the fallbacks and absolute URLs pass through", () => {
  const campaign = pickFeaturedCampaign(
    [
      node("newer", "2026-03-01", {
        campaignTone: "crimson",
        campaignTagEn: "Urgent",
        campaignBannerEn: "Help Nepal today",
        campaignBlurbEn: "Short blurb.",
        campaignHighlightsEn: "- $80 care package\n\n2) $480 a year\n",
        campaignLearnMoreUrl: "https://cms.bethelrc.org/nepal-relief-en/",
      }),
    ],
    [event({ id: "newer", donationLink: "https://cms.bethelrc.org/donations/nepal-disaster-relief/" })]
  );
  assert.ok(campaign);
  const banner = toCampaignBannerModel(campaign, "en", LABELS_EN);
  assert.equal(banner.tone, "crimson");
  assert.equal(banner.tag, "Urgent");
  assert.equal(banner.message, "Help Nepal today");
  assert.equal(banner.href, "https://cms.bethelrc.org/nepal-relief-en/");

  const popup = toCampaignPopupModel(campaign, "en", LABELS_EN);
  assert.equal(popup.summary, "Short blurb.");
  assert.deepEqual(popup.highlights, ["$80 care package", "$480 a year"]);
  assert.equal(popup.donateHref, "https://cms.bethelrc.org/donations/nepal-disaster-relief/");
});

test("popup learn-more falls back to the event page when it would duplicate the donate link", () => {
  const campaign = pickFeaturedCampaign(
    [node("newer", "2026-03-01", { campaignLearnMoreUrl: "/nepal-relief" })],
    [event({ id: "newer", donationLink: "/nepal-relief" })]
  );
  assert.ok(campaign);
  const popup = toCampaignPopupModel(campaign, "zh", LABELS_ZH);
  assert.equal(popup.donateHref, "/zh/nepal-relief");
  assert.equal(popup.learnMoreHref, "/zh/events/newer");
  // The banner keeps pointing at the campaign page.
  assert.equal(toCampaignBannerModel(campaign, "zh", LABELS_ZH).href, "/zh/nepal-relief");
});

test("summaryToBlurb keeps the first paragraph and cuts at a sentence boundary", () => {
  const html = "<p>Sentence one is here. Sentence two is fairly long and keeps going for a while.</p><p>Second paragraph.</p>";
  assert.equal(summaryToBlurb(html, 500), "Sentence one is here. Sentence two is fairly long and keeps going for a while.");
  assert.equal(summaryToBlurb(html, 40), "Sentence one is here.");
  assert.equal(summaryToBlurb(undefined, 40), "");
});

test("splitHighlights strips bullets and caps at four", () => {
  assert.deepEqual(splitHighlights("• a\n- b\n3. c\nd\ne"), ["a", "b", "c", "d"]);
  assert.deepEqual(splitHighlights(null), []);
});

test("normalizeCampaignTone falls back to the default", () => {
  assert.equal(normalizeCampaignTone("Forest"), "forest");
  assert.equal(normalizeCampaignTone(["crimson"]), "crimson");
  assert.equal(normalizeCampaignTone("neon"), "gold");
  assert.equal(normalizeCampaignTone(undefined), "gold");
});

test("boot script reads the same storage key the banner component writes", () => {
  const script = campaignBannerBootScript("event:nepal", 6);
  assert.ok(script.includes(JSON.stringify(campaignStorageKey("banner", "event:nepal"))));
  assert.ok(script.includes('"dismissed"'));
  assert.ok(script.includes('"active"'));
  assert.ok(!script.includes("</script"));
});

test("home page and site layout are wired to the featured campaign", () => {
  const root = process.cwd();
  const homePage = fs.readFileSync(path.join(root, "src/app/[locale]/(site)/page.tsx"), "utf8");
  const siteLayout = fs.readFileSync(path.join(root, "src/app/[locale]/(site)/layout.tsx"), "utf8");
  const header = fs.readFileSync(path.join(root, "src/components/Header.tsx"), "utf8");

  assert.ok(homePage.includes("getFeaturedCampaignPopup"));
  assert.ok(homePage.includes("<CampaignPopup"));
  assert.ok(siteLayout.includes("await getFeaturedCampaignBanner"));
  assert.ok(siteLayout.includes("campaignBannerBootScript"));
  assert.ok(header.includes("<CampaignBanner"));
});
