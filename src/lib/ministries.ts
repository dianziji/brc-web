// src/lib/ministries.ts
import "server-only";
import { wpgraphql } from "@/lib/wpgraphql";
import { pickLeafSection, getTopSectionSlug, SectionNode } from "@/lib/sections";

type MinistryFields = {
  titleEn?: string;
  titleZh?: string;
  summaryEn?: string;
  summaryZh?: string;
  displayOrder?: number;
  visibility?: string;
  heroImage?: { node?: { sourceUrl?: string; altText?: string } };
};

export type MinistryListItem = {
  slug: string;
  date: string | null;
  fields: MinistryFields;
  section: { top: string | null; leaf: { name: string; slug: string } | null };
};

export type MinistryDetail = {
  slug: string;
  date: string | null;
  fields: MinistryFields;
  section: {
    top: string | null;
    leaf: { name: string; slug: string } | null;
    parent: { name: string; slug: string } | null;
  };
};

const LIST_QUERY = /* GraphQL */ `
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
        displayOrder
        visibility
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

const DETAIL_QUERY = /* GraphQL */ `
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

type ListGQL = {
  ministries: {
    nodes: Array<{
      id: string;
      slug: string;
      status: string;
      date: string | null;
      ministryFields: MinistryFields;
      sections: { nodes: SectionNode[] };
    }>;
  };
};

type DetailGQL = {
  ministryBy: null | {
    slug: string;
    status: string;
    date: string | null;
    ministryFields: MinistryFields;
    sections: { nodes: SectionNode[] };
  };
};

export async function getMinistriesList(top?: string | null): Promise<MinistryListItem[]> {
  const data = await wpgraphql<ListGQL>(
    LIST_QUERY,
    { first: 50 },
    { revalidate: 60, label: "wpgraphql:ministries-list" }
  );

  return data.ministries.nodes
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
}

export async function getMinistryDetail(slug: string): Promise<MinistryDetail | null> {
  const data = await wpgraphql<DetailGQL>(
    DETAIL_QUERY,
    { slug },
    { revalidate: 60, label: "wpgraphql:ministries-detail" }
  );
  const m = data.ministryBy;

  if (!m || m.status?.toLowerCase() !== "publish") {
    return null;
  }

  const leaf = pickLeafSection(m.sections.nodes);
  const top = getTopSectionSlug(leaf);

  return {
    slug: m.slug,
    date: m.date,
    fields: m.ministryFields,
    section: {
      leaf: leaf ? { name: leaf.name, slug: leaf.slug } : null,
      top,
      parent: leaf?.parent?.node ?? null,
    },
  };
}
