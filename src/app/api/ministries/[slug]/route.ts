// src/app/api/ministries/[slug]/route.ts
import { NextResponse } from "next/server";
import { getMinistryDetail } from "@/lib/ministries";
import { WpGraphQLRequestError } from "@/lib/wpgraphql";

export const revalidate = 60;

function getErrorType(error: unknown): string {
  if (error instanceof WpGraphQLRequestError) return error.type;
  return "unknown";
}

export async function GET(_: Request, ctx: { params: Promise<{ slug: string }> }) {
  // Next 16: `params` is async (Promise) in route handlers
  const { slug } = await ctx.params;
  const startedAt = Date.now();
  const route = `/api/ministries/${slug}`;

  try {
    const data = await getMinistryDetail(slug);
    if (!data) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    const errorType = getErrorType(error);
    console.error("[api] ministries detail failed", { route, slug, errorType, error });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    const elapsed = Date.now() - startedAt;
    console.log(`[api] route=${route} slug=${slug} elapsed=${elapsed}ms cacheHit=unknown`);
  }
}
