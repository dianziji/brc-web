import test from "node:test";
import assert from "node:assert/strict";
import { formatEventDateTimeRange } from "../src/lib/event-schedule.ts";

test("formatEventDateTimeRange formats same-day event with date and time", () => {
  const label = formatEventDateTimeRange({
    date: "2026-05-08",
    time: "2:00 PM - 11:00 PM",
    endAt: "2026-05-08T23:00:00+00:00",
  });

  assert.equal(label, "2026-05-08 2:00 PM - 11:00 PM");
});

test("formatEventDateTimeRange formats cross-day event with both dates", () => {
  const label = formatEventDateTimeRange({
    date: "2026-05-08",
    time: "2:00 PM - 11:00 AM",
    endAt: "2026-05-10T11:00:00+00:00",
  });

  assert.equal(label, "2026-05-08 2:00 PM - 2026-05-10 11:00 AM");
});
