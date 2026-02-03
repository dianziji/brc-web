// src/app/api/ministries/[slug]/route.ts
import { NextResponse } from "next/server";
import { getMinistryDetail } from "@/lib/ministries";

export const revalidate = 60;

export async function GET(_: Request, ctx: { params: Promise<{ slug: string }> }) {
  // Next 16: `params` is async (Promise) in route handlers
  const { slug } = await ctx.params;
  const startedAt = Date.now();

  try {
    const data = await getMinistryDetail(slug);
    if (!data) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } finally {
    const elapsed = Date.now() - startedAt;
    console.log(`[api] /api/ministries/${slug} ${elapsed}ms`);
  }
}