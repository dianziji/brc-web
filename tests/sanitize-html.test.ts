import test from "node:test";
import assert from "node:assert/strict";
import { sanitizeRichHtml } from "../src/lib/sanitize-html.ts";

test("sanitizeRichHtml removes dangerous tags and attributes", () => {
  const dirty = `<p onclick="alert(1)">Hello<script>alert(1)</script></p>`;
  const clean = sanitizeRichHtml(dirty);

  assert.equal(clean, "<p>Hello</p>");
  assert.ok(!clean.includes("onclick"));
  assert.ok(!clean.includes("<script"));
});

test("sanitizeRichHtml removes unsafe javascript links but keeps text", () => {
  const dirty = `<a href="javascript:alert(1)">Click me</a>`;
  const clean = sanitizeRichHtml(dirty);

  assert.ok(!clean.includes("<a"));
  assert.ok(clean.includes("Click me"));
});

test("sanitizeRichHtml enforces noopener noreferrer for external links", () => {
  const dirty = `<a href="https://example.org/path">External</a>`;
  const clean = sanitizeRichHtml(dirty);

  assert.ok(clean.includes(`href="https://example.org/path"`));
  assert.ok(clean.includes(`target="_blank"`));
  assert.ok(clean.includes(`rel="noopener noreferrer"`));
});

test("sanitizeRichHtml keeps relative links without forcing rel", () => {
  const dirty = `<a href="/ministries/youth">Youth</a>`;
  const clean = sanitizeRichHtml(dirty);

  assert.ok(clean.includes(`href="/ministries/youth"`));
  assert.ok(!clean.includes(`rel="noopener noreferrer"`));
});
