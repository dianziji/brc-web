import test from "node:test";
import assert from "node:assert/strict";
import { getAllEventsSafeResult } from "../src/lib/events.ts";

const ORIGINAL_FETCH = globalThis.fetch;
const ORIGINAL_URL = process.env.WP_GRAPHQL_URL;

function setFetch(
  impl: (
    input: RequestInfo | URL,
    init?: RequestInit | undefined
  ) => Promise<Response>
) {
  globalThis.fetch = impl as typeof fetch;
}

test.afterEach(() => {
  globalThis.fetch = ORIGINAL_FETCH;
  process.env.WP_GRAPHQL_URL = ORIGINAL_URL;
});

test("events fallback keeps localized summary fields when schema uses mixed casing", async () => {
  process.env.WP_GRAPHQL_URL = "https://example.org/graphql";

  const seenQueries: string[] = [];

  setFetch(async (_input, init) => {
    const payload = JSON.parse(String(init?.body || "{}")) as { query?: string };
    seenQueries.push(payload.query || "");

    if (seenQueries.length === 1) {
      return Response.json({
        errors: [
          {
            message: 'Cannot query field "startAt" on type "EventFields". Did you mean "startat" or "status"?',
          },
        ],
      });
    }

    return Response.json({
      data: {
        events: {
          nodes: [
            {
              id: "post:1",
              slug: "mixed-schema-event",
              status: "publish",
              date: "2026-03-19T13:59:21",
              title: "Fallback Event Title",
              featuredImage: null,
              eventFields: {
                titleEn: null,
                titleZh: "混合欄位活動",
                summaryEn: "<p>Hello retreat</p>",
                summaryZh: null,
                startAt: "2026-05-08T14:00:00+00:00",
                endAt: "2026-05-10T11:00:00+00:00",
                time: null,
                location: "3575 Valley Rd, Basking Ridge, NJ 07920",
                archiveAt: null,
                lifecycleStatus: ["PUBLISHED"],
                registrationMode: ["external"],
                registrationUrl: "https://example.org/register",
                paymentMode: ["donation"],
                paymentAmount: null,
                donationLink: "/donation",
                donationPurposeCode: "retreat_2026",
                primaryMinistrySlug: "chista",
                relatedMinistrySlugs: "young-adult",
                coverImage: {
                  node: {
                    sourceUrl: "https://example.org/cover.jpg",
                  },
                },
              },
            },
          ],
        },
      },
    });
  });

  const result = await getAllEventsSafeResult();

  assert.equal(result.degraded, false);
  assert.equal(result.items.length, 1);
  assert.equal(seenQueries.length, 2, "expected full query to retry once with the mixed fallback");
  assert.match(seenQueries[0], /EventsListFull/);
  assert.match(seenQueries[1], /EventsListFullMixed/);

  const [event] = result.items;
  assert.equal(event.id, "mixed-schema-event");
  assert.equal(event.date, "2026-05-08");
  assert.equal(event.titleEn, "混合欄位活動");
  assert.equal(event.titleZh, "混合欄位活動");
  assert.equal(event.summaryEn, "<p>Hello retreat</p>");
  assert.equal(event.summaryZh, "<p>Hello retreat</p>");
  assert.equal(event.lifecycleStatus, "PUBLISHED");
  assert.equal(event.registrationMode, "external");
  assert.equal(event.paymentMode, "donation");
  assert.equal(event.registrationUrl, "https://example.org/register");
  assert.equal(event.primaryMinistrySlug, "chista");
  assert.deepEqual(event.relatedMinistrySlugs, ["young-adult"]);
  assert.equal(event.image, "https://example.org/cover.jpg");
});
