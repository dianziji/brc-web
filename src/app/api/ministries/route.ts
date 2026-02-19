// src/app/api/ministries/route.ts
import { NextResponse } from "next/server";
import { getMinistriesList } from "@/lib/ministries";
import { WpGraphQLRequestError } from "@/lib/wpgraphql";

export const revalidate = 60;

function getErrorType(error: unknown): string {
  if (error instanceof WpGraphQLRequestError) return error.type;
  return "unknown";
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const top = url.searchParams.get("top"); // e.g. youth / missions / family
  const startedAt = Date.now();
  const route = top ? `/api/ministries?top=${top}` : "/api/ministries";

  try {
    const items = await getMinistriesList(top);
    return NextResponse.json({ items });
  } catch (error) {
    const errorType = getErrorType(error);
    console.error("[api] ministries list failed", { route, top, errorType, error });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    const elapsed = Date.now() - startedAt;
    console.log(`[api] route=${route} elapsed=${elapsed}ms cacheHit=unknown`);
  }
}
