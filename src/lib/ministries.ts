// src/lib/ministries.ts
import "server-only";
import { unstable_cache } from "next/cache";
import { WpGraphQLRequestError, wpgraphql } from "@/lib/wpgraphql";
import { getTopSectionSlug, pickLeafSection, SectionNode } from "@/lib/sections";

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

export type MinistriesSafeListResult = {
  items: MinistryListItem[];
  degraded: boolean;
  errorType: string | null;
};

export type MinistriesSafeDetailResult = {
  data: MinistryDetail | null;
  degraded: boolean;
  errorType: string | null;
};

const MINISTRY_REVALIDATE_SECONDS = 60;
const DEFAULT_EXTERNAL_URL_FIELD = "website";
const PRIMARY_EXTERNAL_URL_FIELD =
  process.env.WP_MINISTRY_EXTERNAL_URL_FIELD?.trim() || DEFAULT_EXTERNAL_URL_FIELD;
const FALLBACK_EXTERNAL_URL_FIELD = "linkUrl";

let resolvedExternalUrlFieldPromise: Promise<string | null> | null = null;

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

function buildExternalFieldProbeQuery(field: string): string {
  return /* GraphQL */ `
query ProbeExternalField {
  ministries(first: 1) {
    nodes {
      ministryFields {
        ${field}
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

type ProbeExternalFieldGQL = {
  ministries: {
    nodes: Array<{
      ministryFields: Record<string, unknown>;
    }>;
  };
};

function externalFieldCandidates(): string[] {
  const isValidFieldName = (field: string): boolean => /^[A-Za-z_][A-Za-z0-9_]*$/.test(field);
  const out = [PRIMARY_EXTERNAL_URL_FIELD];
  if (!out.includes(FALLBACK_EXTERNAL_URL_FIELD)) {
    out.push(FALLBACK_EXTERNAL_URL_FIELD);
  }
  const valid = out.filter(isValidFieldName);
  if (valid.length !== out.length) {
    console.warn("[ministries] invalid external-url field name configured, ignoring invalid candidate");
  }
  return valid;
}

function resetResolvedExternalUrlField(): void {
  resolvedExternalUrlFieldPromise = null;
}

function getErrorType(error: unknown): string {
  if (error instanceof WpGraphQLRequestError) return error.type;
  return "unknown";
}

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

async function probeExternalUrlField(field: string): Promise<boolean> {
  try {
    await wpgraphql<ProbeExternalFieldGQL>(buildExternalFieldProbeQuery(field), undefined, {
      revalidate: MINISTRY_REVALIDATE_SECONDS,
      label: `wpgraphql:ministries-probe:${field}`,
    });
    return true;
  } catch (error) {
    if (isUnknownFieldError(error)) return false;
    throw error;
  }
}

async function resolveExternalUrlField(): Promise<string | null> {
  if (!resolvedExternalUrlFieldPromise) {
    resolvedExternalUrlFieldPromise = (async () => {
      const candidates = externalFieldCandidates();
      for (const field of candidates) {
        try {
          const supported = await probeExternalUrlField(field);
          if (supported) {
            console.log(
              `[ministries] external-url-field resolved field=${field} fallbackUsed=${field !== PRIMARY_EXTERNAL_URL_FIELD}`
            );
            return field;
          }
          console.warn(`[ministries] external-url-field unsupported field=${field}`);
        } catch (error) {
          console.error("[ministries] external-url-field probe failed", {
            field,
            errorType: getErrorType(error),
            error,
          });
          break;
        }
      }

      console.warn("[ministries] external-url-field not available, fallback to base detail query");
      return null;
    })();
  }

  return resolvedExternalUrlFieldPromise;
}

async function fetchDetailBySlug(
  slug: string,
  externalField?: string
): Promise<{ unsupportedField: boolean; node: DetailNode | null }> {
  try {
    const data = await wpgraphql<DetailBySlugGQL>(
      buildDetailBySlugQuery(externalField),
      { slug },
      {
        revalidate: MINISTRY_REVALIDATE_SECONDS,
        label: externalField
          ? `wpgraphql:ministries-detail:${externalField}`
          : "wpgraphql:ministries-detail",
      }
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
        revalidate: MINISTRY_REVALIDATE_SECONDS,
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

async function getMinistriesListUncached(top?: string | null): Promise<MinistryListItem[]> {
  const data = await wpgraphql<ListGQL>(
    LIST_QUERY,
    { first: 50 },
    { revalidate: MINISTRY_REVALIDATE_SECONDS, label: "wpgraphql:ministries-list" }
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

const getMinistriesListCached = unstable_cache(
  async (top: string | null) => getMinistriesListUncached(top),
  ["ministries:list:v1"],
  { revalidate: MINISTRY_REVALIDATE_SECONDS, tags: ["ministries", "ministries-list"] }
);

async function getMinistryDetailFromListFallback(slug: string): Promise<MinistryDetail | null> {
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

async function getMinistryDetailUncachedByField(
  slug: string,
  externalField: string | null,
  allowRetryWithoutField: boolean
): Promise<MinistryDetail | null> {
  const bySlug = await fetchDetailBySlug(slug, externalField ?? undefined);
  if (bySlug.unsupportedField) {
    if (allowRetryWithoutField) {
      resetResolvedExternalUrlField();
      return getMinistryDetailUncachedByField(slug, null, false);
    }
    return null;
  }

  if (bySlug.node) {
    if (!isPublished(bySlug.node.status)) return null;
    const url = normalizeExternalUrl(bySlug.node.ministryFields.externalUrl);
    return mapDetailNode(bySlug.node, url);
  }

  const byList = await fetchDetailFromList(slug, externalField ?? undefined);
  if (byList.unsupportedField) {
    if (allowRetryWithoutField) {
      resetResolvedExternalUrlField();
      return getMinistryDetailUncachedByField(slug, null, false);
    }
    return null;
  }

  if (byList.node) {
    if (!isPublished(byList.node.status)) return null;
    const url = normalizeExternalUrl(byList.node.ministryFields.externalUrl);
    return mapDetailNode(byList.node, url);
  }

  return getMinistryDetailFromListFallback(slug);
}

async function getMinistryDetailUncached(slug: string): Promise<MinistryDetail | null> {
  const externalField = await resolveExternalUrlField();
  return getMinistryDetailUncachedByField(slug, externalField, true);
}

const getMinistryDetailCached = unstable_cache(
  async (slug: string) => getMinistryDetailUncached(slug),
  ["ministries:detail:v1"],
  { revalidate: MINISTRY_REVALIDATE_SECONDS, tags: ["ministries", "ministries-detail"] }
);

export async function getMinistriesList(top?: string | null): Promise<MinistryListItem[]> {
  const startedAt = Date.now();
  const route = top ? `/ministries?top=${top}` : "/ministries";
  try {
    return await getMinistriesListCached(top ?? null);
  } finally {
    const elapsed = Date.now() - startedAt;
    console.log(`[ministries] route=${route} elapsed=${elapsed}ms cacheHit=unknown`);
  }
}

export async function getMinistriesListSafe(top?: string | null): Promise<MinistryListItem[]> {
  const result = await getMinistriesListSafeResult(top);
  return result.items;
}

export async function getMinistriesListSafeResult(top?: string | null): Promise<MinistriesSafeListResult> {
  try {
    const items = await getMinistriesList(top);
    return { items, degraded: false, errorType: null };
  } catch (error) {
    const errorType = getErrorType(error);
    console.error("[ministries] getMinistriesListSafe failed", {
      top,
      errorType,
      error,
    });
    return { items: [], degraded: true, errorType };
  }
}

export async function getMinistryDetail(slug: string): Promise<MinistryDetail | null> {
  const startedAt = Date.now();
  try {
    return await getMinistryDetailCached(slug);
  } finally {
    const elapsed = Date.now() - startedAt;
    console.log(`[ministries] route=/ministries/[slug] slug=${slug} elapsed=${elapsed}ms cacheHit=unknown`);
  }
}

export async function getMinistryDetailSafe(slug: string): Promise<MinistryDetail | null> {
  const result = await getMinistryDetailSafeResult(slug);
  return result.data;
}

export async function getMinistryDetailSafeResult(slug: string): Promise<MinistriesSafeDetailResult> {
  try {
    const data = await getMinistryDetail(slug);
    return { data, degraded: false, errorType: null };
  } catch (error) {
    const errorType = getErrorType(error);
    console.error("[ministries] getMinistryDetailSafe failed", {
      slug,
      errorType,
      error,
    });
    return { data: null, degraded: true, errorType };
  }
}
