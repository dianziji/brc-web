import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

function read(relPath: string): string {
  return fs.readFileSync(path.join(ROOT, relPath), "utf8");
}

function exists(relPath: string): boolean {
  return fs.existsSync(path.join(ROOT, relPath));
}

test("middleware has been migrated to proxy", () => {
  assert.equal(exists("src/proxy.ts"), true, "src/proxy.ts should exist");
  assert.equal(exists("src/middleware.ts"), false, "src/middleware.ts should be removed");
});

test("ministries routes have loading placeholders", () => {
  assert.equal(exists("src/app/[locale]/(site)/ministries/loading.tsx"), true);
  assert.equal(exists("src/app/[locale]/(site)/ministries/[top]/loading.tsx"), true);
  assert.equal(exists("src/app/[locale]/(site)/ministries/[top]/[slug]/loading.tsx"), true);
});

test("ministries pages use safe-result APIs for degraded fallback UI", () => {
  const ministriesIndex = read("src/app/[locale]/(site)/ministries/page.tsx");
  const ministriesTop = read("src/app/[locale]/(site)/ministries/[top]/page.tsx");
  const ministryDetail = read("src/app/[locale]/(site)/ministries/[top]/[slug]/page.tsx");

  assert.ok(ministriesIndex.includes("getMinistriesListSafeResult"));
  assert.ok(ministriesTop.includes("getMinistriesListSafeResult"));
  assert.ok(ministryDetail.includes("getMinistryDetailSafeResult"));

  assert.ok(ministriesIndex.includes("degraded"));
  assert.ok(ministriesTop.includes("degraded"));
  assert.ok(ministryDetail.includes("detailResult.degraded"));
});

test("donation page uses donation adapter instead of hardcoded wp url", () => {
  const donationPage = read("src/app/[locale]/(site)/donation/page.tsx");
  assert.ok(donationPage.includes('from "@/lib/donation"'));
  assert.ok(donationPage.includes("getDonationPortalConfig"));
  assert.ok(!donationPage.includes("https://newbethelrc.org/donations/donation-form/"));
});

test("all _blank links use noopener noreferrer", () => {
  const files = [
    "src/components/ArchiveGrid.tsx",
    "src/components/ArchiveScene3D.tsx",
    "src/app/[locale]/(site)/discipleship/page.tsx",
    "src/app/[locale]/(site)/discipleship/[course]/page.tsx",
    "src/app/[locale]/(site)/ministries/[top]/[slug]/page.tsx",
  ];

  for (const file of files) {
    const content = read(file);
    if (content.includes('target="_blank"')) {
      assert.ok(
        content.includes('rel="noopener noreferrer"'),
        `${file} should include rel="noopener noreferrer" for _blank links`
      );
    }
  }
});

test("canonical top redirect is in place for ministry detail route", () => {
  const detailPage = read("src/app/[locale]/(site)/ministries/[top]/[slug]/page.tsx");
  assert.ok(detailPage.includes("redirect(withLocale"));
  assert.ok(detailPage.includes("data.section.top !== top"));
});

test("calendar events source is centralized under src/content", () => {
  const calendarPage = read("src/app/[locale]/(site)/calendar/page.tsx");
  assert.ok(calendarPage.includes('from "@/content/calendar/events"'));
  assert.ok(!calendarPage.includes("const events:"));
  assert.equal(exists("src/content/calendar/events.ts"), true);
});

test("discipleship overview content is centralized under src/content", () => {
  const discipleshipPage = read("src/app/[locale]/(site)/discipleship/page.tsx");
  assert.ok(discipleshipPage.includes('from "@/content/discipleship/overview"'));
  assert.ok(!discipleshipPage.includes("A 軌：課程型門徒訓練"));
  assert.equal(exists("src/content/discipleship/overview.ts"), true);
});

test("discipleship localized copy is centralized under src/content", () => {
  const discipleshipPage = read("src/app/[locale]/(site)/discipleship/page.tsx");
  const discipleshipDetailPage = read("src/app/[locale]/(site)/discipleship/[course]/page.tsx");

  assert.ok(discipleshipPage.includes('from "@/content/discipleship/copy"'));
  assert.ok(discipleshipDetailPage.includes('from "@/content/discipleship/copy"'));
  assert.ok(!discipleshipPage.includes("const t = ("));
  assert.ok(!discipleshipDetailPage.includes("const t = ("));
  assert.equal(exists("src/content/discipleship/copy.ts"), true);
});

test("ministries archive source is centralized under src/content", () => {
  const archivePage = read("src/app/[locale]/(site)/ministries/archive/page.tsx");
  const archive3dPage = read("src/app/[locale]/(site)/ministries/archive/3d/page.tsx");
  const archiveContent = read("src/content/ministries/archive.ts");

  assert.ok(archivePage.includes('from "@/content/ministries/archive"'));
  assert.ok(archive3dPage.includes('from "@/content/ministries/archive"'));
  assert.ok(!archivePage.includes("function parseDateKey"));
  assert.ok(!archive3dPage.includes("function parseDateKey"));
  assert.ok(archiveContent.includes("export function getSortedArchiveItems"));
});

test("auth and rbac foundation files exist for supabase integration", () => {
  const files = [
    "src/lib/auth/index.ts",
    "src/lib/auth/session.ts",
    "src/lib/auth/types.ts",
    "src/lib/rbac/index.ts",
    "src/lib/rbac/matrix.ts",
    "src/lib/rbac/types.ts",
    "src/lib/donation/index.ts",
    "src/lib/donation/types.ts",
  ];

  for (const file of files) {
    assert.equal(exists(file), true, `${file} should exist`);
  }
});
