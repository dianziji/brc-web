import test from "node:test";
import assert from "node:assert/strict";
import { WpGraphQLRequestError, wpgraphql } from "../src/lib/wpgraphql.ts";

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

test("wpgraphql throws config error when WP_GRAPHQL_URL is missing", async () => {
  delete process.env.WP_GRAPHQL_URL;

  await assert.rejects(
    () => wpgraphql<{ ok: boolean }>("query { ok }"),
    (error: unknown) => {
      assert.ok(error instanceof WpGraphQLRequestError);
      assert.equal(error.type, "config");
      return true;
    }
  );
});

test("wpgraphql maps HTTP errors", async () => {
  process.env.WP_GRAPHQL_URL = "https://example.org/graphql";
  let called = 0;
  setFetch(async () => {
    called += 1;
    return new Response("Server down", { status: 503 });
  });

  await assert.rejects(
    () => wpgraphql<{ ok: boolean }>("query { ok }", undefined, { retryCount: 2 }),
    (error: unknown) => {
      assert.ok(error instanceof WpGraphQLRequestError);
      assert.equal(error.type, "http");
      assert.equal(error.statusCode, 503);
      return true;
    }
  );
  assert.equal(called, 1, "HTTP errors should not be retried");
});

test("wpgraphql maps GraphQL errors", async () => {
  process.env.WP_GRAPHQL_URL = "https://example.org/graphql";
  setFetch(async () =>
    Response.json({
      errors: [{ message: "Cannot query field testField" }],
    })
  );

  await assert.rejects(
    () => wpgraphql<{ ok: boolean }>("query { ok }"),
    (error: unknown) => {
      assert.ok(error instanceof WpGraphQLRequestError);
      assert.equal(error.type, "graphql");
      return true;
    }
  );
});

test("wpgraphql maps timeout errors", async () => {
  process.env.WP_GRAPHQL_URL = "https://example.org/graphql";

  setFetch(
    (_input, init) =>
      new Promise((_resolve, reject) => {
        const signal = init?.signal;
        if (!signal) {
          reject(new Error("signal is required"));
          return;
        }
        signal.addEventListener("abort", () => {
          reject(new DOMException("Aborted", "AbortError"));
        });
      })
  );

  await assert.rejects(
    () => wpgraphql<{ ok: boolean }>("query { ok }", undefined, { timeoutMs: 20, retryCount: 0 }),
    (error: unknown) => {
      assert.ok(error instanceof WpGraphQLRequestError);
      assert.equal(error.type, "timeout");
      return true;
    }
  );
});

test("wpgraphql retries once for network error then succeeds", async () => {
  process.env.WP_GRAPHQL_URL = "https://example.org/graphql";
  let called = 0;
  setFetch(async () => {
    called += 1;
    if (called === 1) throw new Error("temporary network issue");
    return Response.json({ data: { ok: true } });
  });

  const result = await wpgraphql<{ ok: boolean }>("query { ok }", undefined, {
    retryCount: 1,
    retryBackoffMs: 1,
  });
  assert.deepEqual(result, { ok: true });
  assert.equal(called, 2, "request should be retried once");
});

test("wpgraphql returns parsed data for successful response", async () => {
  process.env.WP_GRAPHQL_URL = "https://example.org/graphql";
  setFetch(async () => Response.json({ data: { ok: true } }));

  const result = await wpgraphql<{ ok: boolean }>("query { ok }");
  assert.deepEqual(result, { ok: true });
});
