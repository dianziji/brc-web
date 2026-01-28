// src/lib/wpgraphql.ts
import "server-only";

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

export async function wpgraphql<T>(
  query: string,
  variables?: Record<string, any>,
  options?: { revalidate?: number }
): Promise<T> {
  const url = process.env.WP_GRAPHQL_URL;
  if (!url) throw new Error("Missing WP_GRAPHQL_URL in .env.local");

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 未来做 RBAC/私有内容时，在这里加 Authorization
      // "Authorization": "Basic ...",
    },
    body: JSON.stringify({ query, variables }),
    // 缓存策略：Phase 1 建议用短缓存（例如 60s）
    next: { revalidate: options?.revalidate ?? 60 },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`WPGraphQL HTTP ${res.status}: ${text}`);
  }

  const json = (await res.json()) as GraphQLResponse<T>;
  if (json.errors?.length) {
    throw new Error(`WPGraphQL error: ${json.errors.map(e => e.message).join(" | ")}`);
  }
  if (!json.data) throw new Error("WPGraphQL: missing data");
  return json.data;
}