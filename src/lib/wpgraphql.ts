// src/lib/wpgraphql.ts
import "server-only";

type WpGraphQLErrorType = "config" | "timeout" | "http" | "graphql" | "invalid_response" | "network";

export class WpGraphQLRequestError extends Error {
  readonly type: WpGraphQLErrorType;
  readonly statusCode?: number;

  constructor(type: WpGraphQLErrorType, message: string, options?: { statusCode?: number; cause?: unknown }) {
    super(message, options?.cause ? { cause: options.cause } : undefined);
    this.name = "WpGraphQLRequestError";
    this.type = type;
    this.statusCode = options?.statusCode;
  }
}

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

type WpGraphqlOptions = {
  revalidate?: number;
  label?: string;
  timeoutMs?: number;
  retryCount?: number;
  retryBackoffMs?: number;
};

function getGraphqlTimeoutMs(): number {
  const raw = process.env.WP_GRAPHQL_TIMEOUT_MS?.trim();
  if (!raw) return 5000;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed <= 0) return 5000;
  return Math.floor(parsed);
}

function getGraphqlRetryCount(): number {
  const raw = process.env.WP_GRAPHQL_RETRY_COUNT?.trim();
  if (!raw) return 1;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < 0) return 1;
  return Math.min(3, Math.floor(parsed));
}

function getGraphqlRetryBackoffMs(): number {
  const raw = process.env.WP_GRAPHQL_RETRY_BACKOFF_MS?.trim();
  if (!raw) return 250;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < 0) return 250;
  return Math.floor(parsed);
}

function isAbortLikeError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    (error as { name?: string }).name === "AbortError"
  );
}

function isRetryableError(error: unknown): boolean {
  if (!(error instanceof WpGraphQLRequestError)) return false;
  return error.type === "timeout" || error.type === "network";
}

async function sleep(ms: number): Promise<void> {
  if (ms <= 0) return;
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function wpgraphqlRequestOnce<T>(params: {
  url: string;
  query: string;
  variables?: Record<string, unknown>;
  revalidate: number;
  timeoutMs: number;
}): Promise<T> {
  const { url, query, variables, revalidate, timeoutMs } = params;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    let res: Response;
    try {
      res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 未來做 RBAC/私有內容時，在這裡加 Authorization
          // "Authorization": "Basic ...",
        },
        body: JSON.stringify({ query, variables }),
        // 緩存策略：Phase 1 建議用短緩存（例如 60s）
        next: { revalidate },
        signal: controller.signal,
      });
    } catch (error) {
      if (isAbortLikeError(error)) {
        throw new WpGraphQLRequestError("timeout", `WPGraphQL request timeout after ${timeoutMs}ms`, {
          cause: error,
        });
      }
      throw new WpGraphQLRequestError("network", "WPGraphQL network request failed", { cause: error });
    }

    if (!res.ok) {
      const text = await res.text();
      throw new WpGraphQLRequestError("http", `WPGraphQL HTTP ${res.status}: ${text}`, {
        statusCode: res.status,
      });
    }

    let json: GraphQLResponse<T>;
    try {
      json = (await res.json()) as GraphQLResponse<T>;
    } catch (error) {
      throw new WpGraphQLRequestError("invalid_response", "WPGraphQL returned invalid JSON", {
        cause: error,
      });
    }

    if (json.errors?.length) {
      throw new WpGraphQLRequestError("graphql", `WPGraphQL error: ${json.errors.map((e) => e.message).join(" | ")}`);
    }
    if (!json.data) {
      throw new WpGraphQLRequestError("invalid_response", "WPGraphQL: missing data");
    }
    return json.data;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function wpgraphql<T>(
  query: string,
  variables?: Record<string, unknown>,
  options?: WpGraphqlOptions
): Promise<T> {
  const label = options?.label ?? "wpgraphql";
  const startedAt = Date.now();
  const url = process.env.WP_GRAPHQL_URL;
  if (!url) {
    throw new WpGraphQLRequestError("config", "Missing WP_GRAPHQL_URL in .env.local");
  }

  const timeoutMs = options?.timeoutMs ?? getGraphqlTimeoutMs();
  const revalidate = options?.revalidate ?? 60;
  const retryCount = options?.retryCount ?? getGraphqlRetryCount();
  const retryBackoffMs = options?.retryBackoffMs ?? getGraphqlRetryBackoffMs();
  let attempts = 0;

  try {
    for (let attempt = 0; attempt <= retryCount; attempt += 1) {
      attempts = attempt + 1;

      try {
        return await wpgraphqlRequestOnce<T>({ url, query, variables, revalidate, timeoutMs });
      } catch (error) {
        const isLastAttempt = attempt === retryCount;
        if (!isRetryableError(error) || isLastAttempt) {
          throw error;
        }

        const waitMs = retryBackoffMs * (attempt + 1);
        console.warn(
          `[${label}] retry attempt=${attempt + 1}/${retryCount} errorType=${(error as WpGraphQLRequestError).type} backoffMs=${waitMs}`
        );
        await sleep(waitMs);
      }
    }

    throw new WpGraphQLRequestError("network", "WPGraphQL request failed unexpectedly");
  } finally {
    const elapsed = Date.now() - startedAt;
    console.log(`[${label}] ${elapsed}ms attempts=${attempts}`);
  }
}
