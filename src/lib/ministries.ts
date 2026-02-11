// src/lib/ministries.ts
import "server-only";
import { wpgraphql } from "@/lib/wpgraphql";
import { pickLeafSection, getTopSectionSlug, SectionNode } from "@/lib/sections";

type MinistryFields = {
  titleEn?: string;
  titleZh?: string;
  summaryEn?: string;
  summaryZh?: string;
  externalUrl?: string | null;
  displayOrder?: number;
  visibility?: string;
  heroImage?: { node?: { sourceUrl?: string; altText?: string } };
};

type DetailNode = {
  slug: string;
  status: string;
  date: string | null;
  ministryFields: MinistryFields;
  sections: { nodes: SectionNode[] };
};

export type MinistryListItem = {
  slug: string;
  date: string | null;
  fields: MinistryFields;
  section: {
    top: string | null;
    topName: string | null;
    leaf: { name: string; slug: string } | null;
  };
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

const PRIMARY_EXTERNAL_URL_FIELD =
  process.env.WP_MINISTRY_EXTERNAL_URL_FIELD?.trim() || "website";
const FALLBACK_EXTERNAL_URL_FIELD = "linkUrl";

function externalFieldCandidates(): string[] {
  const out = [PRIMARY_EXTERNAL_URL_FIELD];
  if (!out.includes(FALLBACK_EXTERNAL_URL_FIELD)) {
    out.push(FALLBACK_EXTERNAL_URL_FIELD);
  }
  return out;
}

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
}
`;

function buildDetailBySlugQuery(externalUrlField?: string): string {
  const externalUrlBlock = externalUrlField ? `externalUrl: ${externalUrlField}` : "";
  return /* GraphQL */ `
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
      ${externalUrlBlock}
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
}

function buildDetailFromListQuery(externalUrlField?: string): string {
  const externalUrlBlock = externalUrlField ? `externalUrl: ${externalUrlField}` : "";
  return /* GraphQL */ `
query OneMinistryFromList($slug: String!) {
  ministries(first: 1, where: { name: $slug, status: PUBLISH }) {
    nodes {
      slug
      status
      date
      ministryFields {
        titleEn
        titleZh
        summaryEn
        summaryZh
        ${externalUrlBlock}
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
}
`;
}

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

type DetailBySlugGQL = {
  ministryBy: DetailNode | null;
};

type DetailFromListGQL = {
  ministries: {
    nodes: DetailNode[];
  };
};

function normalizeExternalUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const cleaned = value.trim();
  if (!cleaned) return null;

  try {
    const parsed = new URL(cleaned);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.toString();
    }
  } catch {
    return null;
  }

  return null;
}

function isUnknownFieldError(error: unknown): boolean {
  return error instanceof Error && /Cannot query field/i.test(error.message);
}

function isPublished(status?: string): boolean {
  return (status || "").toLowerCase() === "publish";
}

function mapDetailNode(node: DetailNode, resolvedExternalUrl: string | null): MinistryDetail {
  const leaf = pickLeafSection(node.sections.nodes);
  const top = getTopSectionSlug(leaf);

  return {
    slug: node.slug,
    date: node.date,
    fields: {
      ...node.ministryFields,
      externalUrl: resolvedExternalUrl ?? normalizeExternalUrl(node.ministryFields.externalUrl),
    },
    section: {
      leaf: leaf ? { name: leaf.name, slug: leaf.slug } : null,
      top,
      parent: leaf?.parent?.node ?? null,
    },
  };
}

async function fetchDetailBySlug(
  slug: string,
  externalField?: string
): Promise<{ unsupportedField: boolean; node: DetailNode | null }> {
  try {
    const data = await wpgraphql<DetailBySlugGQL>(
      buildDetailBySlugQuery(externalField),
      { slug },
      { revalidate: 60, label: externalField ? `wpgraphql:ministries-detail:${externalField}` : "wpgraphql:ministries-detail" }
    );
    return { unsupportedField: false, node: data.ministryBy };
  } catch (error) {
    if (externalField && isUnknownFieldError(error)) {
      return { unsupportedField: true, node: null };
    }
    throw error;
  }
}

async function fetchDetailFromList(
  slug: string,
  externalField?: string
): Promise<{ unsupportedField: boolean; node: DetailNode | null }> {
  try {
    const data = await wpgraphql<DetailFromListGQL>(
      buildDetailFromListQuery(externalField),
      { slug },
      {
        revalidate: 60,
        label: externalField
          ? `wpgraphql:ministries-detail:list:${externalField}`
          : "wpgraphql:ministries-detail:list",
      }
    );
    return { unsupportedField: false, node: data.ministries.nodes[0] ?? null };
  } catch (error) {
    if (externalField && isUnknownFieldError(error)) {
      return { unsupportedField: true, node: null };
    }
    throw error;
  }
}

export async function getMinistriesList(top?: string | null): Promise<MinistryListItem[]> {
  const data = await wpgraphql<ListGQL>(
    LIST_QUERY,
    { first: 50 },
    { revalidate: 60, label: "wpgraphql:ministries-list" }
  );

  return data.ministries.nodes
    .filter((node) => isPublished(node.status))
    .map((node) => {
      const leaf = pickLeafSection(node.sections.nodes);
      const topSection = getTopSectionSlug(leaf);
      const topName = leaf?.parent?.node?.name ?? leaf?.name ?? null;

      return {
        slug: node.slug,
        date: node.date,
        fields: node.ministryFields,
        section: {
          leaf: leaf ? { name: leaf.name, slug: leaf.slug } : null,
          top: topSection,
          topName,
        },
      };
    })
    .filter((item) => (top ? item.section.top === top : true))
    .sort((a, b) => {
      const ao = a.fields.displayOrder ?? 9999;
      const bo = b.fields.displayOrder ?? 9999;
      return ao - bo;
    });
}

export async function getMinistryDetail(slug: string): Promise<MinistryDetail | null> {
  const candidates = externalFieldCandidates();
  let fallbackPublishedNode: DetailNode | null = null;

  for (const field of candidates) {
    const bySlug = await fetchDetailBySlug(slug, field);
    if (bySlug.unsupportedField) continue;

    if (bySlug.node) {
      if (!isPublished(bySlug.node.status)) return null;
      fallbackPublishedNode = fallbackPublishedNode ?? bySlug.node;

      const maybeUrl = normalizeExternalUrl(bySlug.node.ministryFields.externalUrl);
      if (maybeUrl) {
        return mapDetailNode(bySlug.node, maybeUrl);
      }
      continue;
    }

    const byList = await fetchDetailFromList(slug, field);
    if (byList.unsupportedField) continue;

    if (byList.node) {
      if (!isPublished(byList.node.status)) return null;
      fallbackPublishedNode = fallbackPublishedNode ?? byList.node;

      const maybeUrl = normalizeExternalUrl(byList.node.ministryFields.externalUrl);
      if (maybeUrl) {
        return mapDetailNode(byList.node, maybeUrl);
      }
    }
  }

  if (fallbackPublishedNode) {
    return mapDetailNode(fallbackPublishedNode, null);
  }

  // Base fallback: query detail without external-url field projection.
  const baseBySlug = await fetchDetailBySlug(slug);
  if (baseBySlug.node) {
    if (!isPublished(baseBySlug.node.status)) return null;
    return mapDetailNode(baseBySlug.node, null);
  }

  const baseByList = await fetchDetailFromList(slug);
  if (baseByList.node) {
    if (!isPublished(baseByList.node.status)) return null;
    return mapDetailNode(baseByList.node, null);
  }

  // Last-resort fallback for environments where detail queries are inconsistent by slug.
  const list = await getMinistriesList();
  const fromList = list.find((item) => item.slug === slug);
  if (!fromList) return null;

  return {
    slug: fromList.slug,
    date: fromList.date,
    fields: fromList.fields,
    section: {
      leaf: fromList.section.leaf,
      top: fromList.section.top,
      parent: null,
    },
  };
}
