// src/app/api/ministries/[slug]/route.ts
import { NextResponse } from "next/server";
import { wpgraphql } from "@/lib/wpgraphql";
import { pickLeafSection, getTopSectionSlug, SectionNode } from "@/lib/sections";

const QUERY = /* GraphQL */ `
query OneMinistry($slug: String!) {
  ministryBy(slug: $slug) {
    slug
    status
    date
    ministryFields {
      titleEn
      titleZh
      summaryEn
      summaryZh
      displayOrder
      visibility
      heroImage { node { sourceUrl altText } }
    }
    sections {
      nodes {
        name
        slug
        parent { node { name slug } }
      }
    }
  }
}
`;

type GQL = {
  ministryBy: null | {
    slug: string;
    status: string;
    date: string | null;
    ministryFields: any;
    sections: { nodes: SectionNode[] };
  };
};

export async function GET(_: Request, ctx: { params: Promise<{ slug: string }> }) {
  // Next 16: `params` is async (Promise) in route handlers
  const { slug } = await ctx.params;

  const data = await wpgraphql<GQL>(QUERY, { slug }, { revalidate: 60 });
  const m = data.ministryBy;

  if (!m || m.status?.toLowerCase() !== "publish") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const leaf = pickLeafSection(m.sections.nodes);
  const top = getTopSectionSlug(leaf);

  return NextResponse.json({
    slug: m.slug,
    date: m.date,
    fields: m.ministryFields,
    section: {
      leaf: leaf ? { name: leaf.name, slug: leaf.slug } : null,
      top,
      // 同时给你 parent 信息，方便将来做面包屑
      parent: leaf?.parent?.node ?? null,
    },
  });
}