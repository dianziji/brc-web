import { NextResponse } from "next/server";

// Phase 1：先給前端一個穩定的接口形狀，後續再接 WP 菜單/自定義導航。
export async function GET() {
  return NextResponse.json({ items: [] });
}

