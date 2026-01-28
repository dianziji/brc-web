import { NextResponse } from "next/server";

// Phase 1：先给前端一个稳定的接口形状，后续再接 WP 菜单/自定义导航。
export async function GET() {
  return NextResponse.json({ items: [] });
}

