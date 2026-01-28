// src/app/api/ministries/route.ts
import { NextResponse } from "next/server";
import { wpgraphql } from "@/lib/wpgraphql";
import { pickLeafSection, getTopSectionSlug, SectionNode } from "@/lib/sections";

const QUERY = /* GraphQL */ `
query MinistriesList($first: Int!) {
  ministries(first: $first) {
    nodes {
      id
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
        heroImage {
          node { sourceUrl altText }
        }
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
}
`;

type GQL = {
  ministries: {
    nodes: Array<{
      id: string;
      slug: string;
      status: string;
      date: string | null;
      ministryFields: any;
      sections: { nodes: SectionNode[] };
    }>;
  };
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const top = url.searchParams.get("top"); // e.g. youth / missions / family

  try {
    const data = await wpgraphql<GQL>(QUERY, { first: 100 }, { revalidate: 60 });

    // Phase 1：只返回公开 + 已发布（你未来 RBAC 会在这里扩展）
    const normalized = data.ministries.nodes
      .filter(n => n.status?.toLowerCase() === "publish")
      .map(n => {
        const leaf = pickLeafSection(n.sections.nodes);
        const topSection = getTopSectionSlug(leaf);

        return {
          slug: n.slug,
          date: n.date,
          fields: n.ministryFields,
          section: {
            leaf: leaf ? { name: leaf.name, slug: leaf.slug } : null,
            top: topSection,
          },
        };
      })
      .filter(item => (top ? item.section.top === top : true))
      .sort((a, b) => {
        const ao = a.fields?.displayOrder ?? 9999;
        const bo = b.fields?.displayOrder ?? 9999;
        return ao - bo;
      });

    return NextResponse.json({ items: normalized });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ items: [], error: message });
  }
}