// src/app/api/ministries/route.ts
import { NextResponse } from "next/server";
import { getMinistriesList } from "@/lib/ministries";

export const revalidate = 60;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const top = url.searchParams.get("top"); // e.g. youth / missions / family
  const startedAt = Date.now();

  try {
    const items = await getMinistriesList(top);
    return NextResponse.json({ items });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ items: [], error: message });
  } finally {
    const elapsed = Date.now() - startedAt;
    const label = top ? `/api/ministries?top=${top}` : "/api/ministries";
    console.log(`[api] ${label} ${elapsed}ms`);
  }
}