import "server-only";
import { unstable_cache } from "next/cache";
import {
  type CalendarEventItem,
  type EventLifecycleStatus,
  type EventPaymentMode,
  type EventRegistrationMode,
} from "@/content/calendar/events";
import { resolveCmsImageUrl } from "@/lib/cms-media";
import { WpGraphQLRequestError, wpgraphql } from "@/lib/wpgraphql";

const EVENT_REVALIDATE_SECONDS = 60;
const FALLBACK_EVENT_IMAGE = "/images/hero.jpeg";
const DRAFT_STATUSES = new Set<EventLifecycleStatus>(["DRAFT"]);
const ARCHIVED_STATUSES = new Set<EventLifecycleStatus>(["ARCHIVED", "ENDED"]);
const DEFAULT_EVENT_DISPLAY_TIME_ZONE = "America/New_York";
const USE_WALL_CLOCK_EVENT_TIME = process.env.EVENT_TIME_DISPLAY_MODE?.trim().toLowerCase() !== "timezone";

type EventFieldImage =
  | string
  | {
      node?: { sourceUrl?: string | null; mediaItemUrl?: string | null } | null;
      sourceUrl?: string | null;
      mediaItemUrl?: string | null;
      url?: string | null;
    }
  | null;

type EventFields = {
  titleEn?: string | null;
  titleZh?: string | null;
  summaryEn?: string | null;
  summaryZh?: string | null;
  startAt?: string | null;
  endAt?: string | null;
  time?: string | null;
  location?: string | null;
  archiveAt?: string | null;
  lifecycleStatus?: unknown;
  registrationMode?: unknown;
  registrationUrl?: string | null;
  paymentMode?: unknown;
  paymentAmount?: number | null;
  donationLink?: string | null;
  donationPurposeCode?: string | null;
  primaryMinistrySlug?: string | null;
  relatedMinistrySlugs?: unknown;
  coverImage?: EventFieldImage;
};

type WpEventNode = {
  id: string;
  slug: string;
  status?: string | null;
  date?: string | null;
  title?: string | null;
  featuredImage?: { node?: { sourceUrl?: string | null } | null } | null;
  eventFields?: EventFields | null;
};

type EventsGQL = {
  events: {
    nodes: WpEventNode[];
  };
};

export type CalendarEventsSafeResult = {
  items: CalendarEventItem[];
  degraded: boolean;
  errorType: string | null;
};

const EVENTS_QUERY_FULL = /* GraphQL */ `
query EventsListFull($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventFields {
        titleEn
        titleZh
        summaryEn
        summaryZh
        startAt
        endAt
        time
        location
        archiveAt
        lifecycleStatus: status
        registrationMode
        registrationUrl
        paymentMode
        paymentAmount
        donationLink
        donationPurposeCode
        primaryMinistrySlug
        relatedMinistrySlugs
        coverImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
}
`;

const EVENTS_QUERY_FULL_MEDIA = /* GraphQL */ `
query EventsListFullMedia($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventFields {
        titleEn
        titleZh
        summaryEn
        summaryZh
        startAt
        endAt
        time
        location
        archiveAt
        lifecycleStatus: status
        registrationMode
        registrationUrl
        paymentMode
        paymentAmount
        donationLink
        donationPurposeCode
        primaryMinistrySlug
        relatedMinistrySlugs
        coverImage {
          sourceUrl
        }
      }
    }
  }
}
`;

const EVENTS_QUERY_FULL_SCALAR = /* GraphQL */ `
query EventsListFullScalar($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventFields {
        titleEn
        titleZh
        summaryEn
        summaryZh
        startAt
        endAt
        time
        location
        archiveAt
        lifecycleStatus: status
        registrationMode
        registrationUrl
        paymentMode
        paymentAmount
        donationLink
        donationPurposeCode
        primaryMinistrySlug
        relatedMinistrySlugs
        coverImage
      }
    }
  }
}
`;

const EVENTS_QUERY_FULL_MIXED = /* GraphQL */ `
query EventsListFullMixed($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventFields {
        titleEn
        titleZh
        summaryEn
        summaryZh
        startAt: startat
        endAt: endat
        time
        location
        archiveAt: archiveat
        lifecycleStatus: status
        registrationMode
        registrationUrl
        paymentMode
        paymentAmount
        donationLink
        donationPurposeCode
        primaryMinistrySlug
        relatedMinistrySlugs
        coverImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
}
`;

const EVENTS_QUERY_FULL_MIXED_MEDIA = /* GraphQL */ `
query EventsListFullMixedMedia($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventFields {
        titleEn
        titleZh
        summaryEn
        summaryZh
        startAt: startat
        endAt: endat
        time
        location
        archiveAt: archiveat
        lifecycleStatus: status
        registrationMode
        registrationUrl
        paymentMode
        paymentAmount
        donationLink
        donationPurposeCode
        primaryMinistrySlug
        relatedMinistrySlugs
        coverImage {
          sourceUrl
        }
      }
    }
  }
}
`;

const EVENTS_QUERY_FULL_MIXED_SCALAR = /* GraphQL */ `
query EventsListFullMixedScalar($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventFields {
        titleEn
        titleZh
        summaryEn
        summaryZh
        startAt: startat
        endAt: endat
        time
        location
        archiveAt: archiveat
        lifecycleStatus: status
        registrationMode
        registrationUrl
        paymentMode
        paymentAmount
        donationLink
        donationPurposeCode
        primaryMinistrySlug
        relatedMinistrySlugs
        coverImage
      }
    }
  }
}
`;

const EVENTS_QUERY_CONTENT_MIXED = /* GraphQL */ `
query EventsListContentMixed($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventFields {
        titleEn
        titleZh
        summaryEn
        summaryZh
        startAt: startat
        endAt: endat
        time
        location
        archiveAt: archiveat
        coverImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
}
`;

const EVENTS_QUERY_CONTENT_MIXED_MEDIA = /* GraphQL */ `
query EventsListContentMixedMedia($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventFields {
        titleEn
        titleZh
        summaryEn
        summaryZh
        startAt: startat
        endAt: endat
        time
        location
        archiveAt: archiveat
        coverImage {
          sourceUrl
        }
      }
    }
  }
}
`;

const EVENTS_QUERY_CONTENT_MIXED_SCALAR = /* GraphQL */ `
query EventsListContentMixedScalar($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventFields {
        titleEn
        titleZh
        summaryEn
        summaryZh
        startAt: startat
        endAt: endat
        time
        location
        archiveAt: archiveat
        coverImage
      }
    }
  }
}
`;

const EVENTS_QUERY_CORE = /* GraphQL */ `
query EventsListCore($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventFields {
        titleEn
        titleZh
        startAt
        endAt
        time
        location
        coverImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
}
`;

const EVENTS_QUERY_CORE_MEDIA = /* GraphQL */ `
query EventsListCoreMedia($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventFields {
        titleEn
        titleZh
        startAt
        endAt
        time
        location
        coverImage {
          sourceUrl
        }
      }
    }
  }
}
`;

const EVENTS_QUERY_CORE_SCALAR = /* GraphQL */ `
query EventsListCoreScalar($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventFields {
        titleEn
        titleZh
        startAt
        endAt
        time
        location
        coverImage
      }
    }
  }
}
`;

const EVENTS_QUERY_FULL_LOWER = /* GraphQL */ `
query EventsListFullLower($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventFields {
        titleEn: titleen
        titleZh: titlezh
        summaryEn: summaryen
        summaryZh: summaryzh
        startAt: startat
        endAt: endat
        time
        location
        archiveAt: archiveat
        lifecycleStatus: status
        registrationMode: registrationmode
        registrationUrl: registrationurl
        paymentMode: paymentmode
        paymentAmount: paymentamount
        donationLink: donationlink
        donationPurposeCode: donationpurposecode
        primaryMinistrySlug: primaryministryslug
        relatedMinistrySlugs: relatedministryslugs
        coverImage: coverimage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
}
`;

const EVENTS_QUERY_FULL_LOWER_MEDIA = /* GraphQL */ `
query EventsListFullLowerMedia($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventFields {
        titleEn: titleen
        titleZh: titlezh
        summaryEn: summaryen
        summaryZh: summaryzh
        startAt: startat
        endAt: endat
        time
        location
        archiveAt: archiveat
        lifecycleStatus: status
        registrationMode: registrationmode
        registrationUrl: registrationurl
        paymentMode: paymentmode
        paymentAmount: paymentamount
        donationLink: donationlink
        donationPurposeCode: donationpurposecode
        primaryMinistrySlug: primaryministryslug
        relatedMinistrySlugs: relatedministryslugs
        coverImage: coverimage {
          sourceUrl
        }
      }
    }
  }
}
`;

const EVENTS_QUERY_FULL_LOWER_SCALAR = /* GraphQL */ `
query EventsListFullLowerScalar($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventFields {
        titleEn: titleen
        titleZh: titlezh
        summaryEn: summaryen
        summaryZh: summaryzh
        startAt: startat
        endAt: endat
        time
        location
        archiveAt: archiveat
        lifecycleStatus: status
        registrationMode: registrationmode
        registrationUrl: registrationurl
        paymentMode: paymentmode
        paymentAmount: paymentamount
        donationLink: donationlink
        donationPurposeCode: donationpurposecode
        primaryMinistrySlug: primaryministryslug
        relatedMinistrySlugs: relatedministryslugs
        coverImage: coverimage
      }
    }
  }
}
`;

const EVENTS_QUERY_CORE_LOWER = /* GraphQL */ `
query EventsListCoreLower($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventFields {
        titleEn: titleen
        titleZh: titlezh
        startAt: startat
        endAt: endat
        time
        location
        coverImage: coverimage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
}
`;

const EVENTS_QUERY_CORE_LOWER_MEDIA = /* GraphQL */ `
query EventsListCoreLowerMedia($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventFields {
        titleEn: titleen
        titleZh: titlezh
        startAt: startat
        endAt: endat
        time
        location
        coverImage: coverimage {
          sourceUrl
        }
      }
    }
  }
}
`;

const EVENTS_QUERY_CORE_LOWER_SCALAR = /* GraphQL */ `
query EventsListCoreLowerScalar($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventFields {
        titleEn: titleen
        titleZh: titlezh
        startAt: startat
        endAt: endat
        time
        location
        coverImage: coverimage
      }
    }
  }
}
`;

const EVENTS_QUERY_MINIMAL = /* GraphQL */ `
query EventsListMinimal($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventFields {
        startAt
      }
    }
  }
}
`;

const EVENTS_QUERY_MINIMAL_MIXED_MEDIA_NODE_FRAGMENT_REG_LOWER = /* GraphQL */ `
query EventsListMinimalMixedMediaNodeFragmentRegLower($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventFields {
        startAt: startat
        registrationMode: registrationmode
        registrationUrl: registrationurl
        primaryMinistrySlug: primaryministryslug
        relatedMinistrySlugs: relatedministryslugs
        coverImage {
          node {
            id
            ... on MediaItem {
              sourceUrl
              mediaItemUrl
            }
          }
        }
      }
    }
  }
}
`;

const EVENTS_QUERY_MINIMAL_MIXED_MEDIA_NODE_FRAGMENT_REG_MINISTRY_CAMEL = /* GraphQL */ `
query EventsListMinimalMixedMediaNodeFragmentRegMinistryCamel($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventFields {
        startAt: startat
        registrationMode
        registrationUrl
        primaryMinistrySlug
        relatedMinistrySlugs
        coverImage {
          node {
            id
            ... on MediaItem {
              sourceUrl
              mediaItemUrl
            }
          }
        }
      }
    }
  }
}
`;

const EVENTS_QUERY_MINIMAL_MIXED_MEDIA_NODE_FRAGMENT_REG_MINISTRY_LOWER = /* GraphQL */ `
query EventsListMinimalMixedMediaNodeFragmentRegMinistryLower($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventFields {
        startAt: startat
        registrationMode: registrationmode
        registrationUrl: registrationurl
        primaryMinistrySlug: primaryministryslug
        relatedMinistrySlugs: relatedministryslugs
        coverImage {
          node {
            id
            ... on MediaItem {
              sourceUrl
              mediaItemUrl
            }
          }
        }
      }
    }
  }
}
`;

const EVENTS_QUERY_MINIMAL_MIXED_MEDIA_NODE_FRAGMENT_REG_CAMEL = /* GraphQL */ `
query EventsListMinimalMixedMediaNodeFragmentRegCamel($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventFields {
        startAt: startat
        registrationMode
        registrationUrl
        coverImage {
          node {
            id
            ... on MediaItem {
              sourceUrl
              mediaItemUrl
            }
          }
        }
      }
    }
  }
}
`;

const EVENTS_QUERY_MINIMAL_MIXED_MEDIA_NODE_FRAGMENT = /* GraphQL */ `
query EventsListMinimalMixedMediaNodeFragment($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventFields {
        startAt: startat
        coverImage {
          node {
            id
            ... on MediaItem {
              sourceUrl
              mediaItemUrl
            }
          }
        }
      }
    }
  }
}
`;

const EVENTS_QUERY_MINIMAL_MIXED_MEDIA_NODE = /* GraphQL */ `
query EventsListMinimalMixedMediaNode($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventFields {
        startAt: startat
        coverImage {
          node {
            id
            sourceUrl
            mediaItemUrl
          }
        }
      }
    }
  }
}
`;

const EVENTS_QUERY_MINIMAL_MIXED_MEDIA = /* GraphQL */ `
query EventsListMinimalMixedMedia($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventFields {
        startAt: startat
        coverImage {
          sourceUrl
        }
      }
    }
  }
}
`;

const EVENTS_QUERY_MINIMAL_MIXED_SCALAR = /* GraphQL */ `
query EventsListMinimalMixedScalar($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventFields {
        startAt: startat
        coverImage
      }
    }
  }
}
`;

const EVENTS_QUERY_MINIMAL_MEDIA = /* GraphQL */ `
query EventsListMinimalMedia($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventFields {
        startAt
        coverImage {
          node {
            id
            sourceUrl
            mediaItemUrl
          }
          sourceUrl
        }
      }
    }
  }
}
`;

const EVENTS_QUERY_MINIMAL_MEDIA_NODE = /* GraphQL */ `
query EventsListMinimalMediaNode($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventFields {
        startAt
        coverImage {
          node {
            id
            sourceUrl
            mediaItemUrl
          }
        }
      }
    }
  }
}
`;

const EVENTS_QUERY_MINIMAL_MEDIA_NODE_FRAGMENT = /* GraphQL */ `
query EventsListMinimalMediaNodeFragment($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventFields {
        startAt
        coverImage {
          node {
            id
            ... on MediaItem {
              sourceUrl
              mediaItemUrl
            }
          }
        }
      }
    }
  }
}
`;

const EVENTS_QUERY_MINIMAL_SCALAR = /* GraphQL */ `
query EventsListMinimalScalar($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventFields {
        startAt
        coverImage
      }
    }
  }
}
`;

const EVENTS_QUERY_MINIMAL_LOWER = /* GraphQL */ `
query EventsListMinimalLower($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventFields {
        startAt: startat
      }
    }
  }
}
`;

const EVENTS_QUERY_MINIMAL_LOWER_MEDIA = /* GraphQL */ `
query EventsListMinimalLowerMedia($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventFields {
        startAt: startat
        coverImage: coverimage {
          node {
            id
            sourceUrl
            mediaItemUrl
          }
          sourceUrl
        }
      }
    }
  }
}
`;

const EVENTS_QUERY_MINIMAL_LOWER_MEDIA_NODE = /* GraphQL */ `
query EventsListMinimalLowerMediaNode($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventFields {
        startAt: startat
        coverImage: coverimage {
          node {
            id
            sourceUrl
            mediaItemUrl
          }
        }
      }
    }
  }
}
`;

const EVENTS_QUERY_MINIMAL_LOWER_MEDIA_NODE_FRAGMENT = /* GraphQL */ `
query EventsListMinimalLowerMediaNodeFragment($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventFields {
        startAt: startat
        coverImage: coverimage {
          node {
            id
            ... on MediaItem {
              sourceUrl
              mediaItemUrl
            }
          }
        }
      }
    }
  }
}
`;

const EVENTS_QUERY_MINIMAL_LOWER_SCALAR = /* GraphQL */ `
query EventsListMinimalLowerScalar($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      eventFields {
        startAt: startat
        coverImage: coverimage
      }
    }
  }
}
`;

const EVENTS_QUERY_BASE = /* GraphQL */ `
query EventsListBase($first: Int!) {
  events(first: $first) {
    nodes {
      id
      slug
      status
      date
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
}
`;

function getErrorType(error: unknown): string {
  if (error instanceof WpGraphQLRequestError) return error.type;
  return "unknown";
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

function getUnknownFieldName(error: unknown): string | null {
  if (!(error instanceof Error)) return null;
  const matched = error.message.match(/Cannot query field "([^"]+)"/i);
  return matched?.[1] || null;
}

function isInternalServerError(error: unknown): boolean {
  return (
    error instanceof WpGraphQLRequestError &&
    error.type === "http" &&
    typeof error.statusCode === "number" &&
    error.statusCode >= 500
  );
}

function shouldTryAlternateEventsQuery(error: unknown): boolean {
  const unknownField = getUnknownFieldName(error);
  if (unknownField) return unknownField !== "events";
  return isInternalServerError(error);
}

function isPublished(status?: string | null): boolean {
  return (status || "").toLowerCase() === "publish";
}

function normalizeLifecycleStatus(raw?: unknown): EventLifecycleStatus | undefined {
  const value = normalizeScalarText(raw);
  if (!value) return undefined;
  const normalized = value.toUpperCase();
  if (
    normalized === "DRAFT" ||
    normalized === "PUBLISHED" ||
    normalized === "REG_OPEN" ||
    normalized === "REG_CLOSED" ||
    normalized === "LIVE" ||
    normalized === "ENDED" ||
    normalized === "ARCHIVED"
  ) {
    return normalized;
  }
  return undefined;
}

function normalizeRegistrationMode(raw?: unknown): EventRegistrationMode | undefined {
  const value = normalizeScalarText(raw);
  if (!value) return undefined;
  const normalized = value.toLowerCase();
  if (normalized === "external" || normalized === "internal") return normalized;
  return undefined;
}

function normalizePaymentMode(raw?: unknown): EventPaymentMode | undefined {
  const value = normalizeScalarText(raw);
  if (!value) return undefined;
  const normalized = value.toLowerCase();
  if (normalized === "none" || normalized === "fee" || normalized === "donation") return normalized;
  return undefined;
}

function resolveEventDisplayTimeZone(): string {
  const raw = process.env.EVENT_DISPLAY_TIME_ZONE?.trim();
  const candidate = raw || DEFAULT_EVENT_DISPLAY_TIME_ZONE;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: candidate }).format(new Date());
    return candidate;
  } catch {
    return DEFAULT_EVENT_DISPLAY_TIME_ZONE;
  }
}

const EVENT_DISPLAY_TIME_ZONE = resolveEventDisplayTimeZone();

function toDateKeyInTimeZone(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: EVENT_DISPLAY_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  if (!year || !month || !day) return "";
  return `${year}-${month}-${day}`;
}

function toDateKey(input?: string | null): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  if (!trimmed) return null;

  const matched = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (matched) return `${matched[1]}-${matched[2]}-${matched[3]}`;

  const dateOnlyMatched = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (dateOnlyMatched) return `${dateOnlyMatched[1]}-${dateOnlyMatched[2]}-${dateOnlyMatched[3]}`;

  const date = new Date(trimmed);
  if (Number.isNaN(date.getTime())) return null;
  const byTimeZone = toDateKeyInTimeZone(date);
  if (byTimeZone) return byTimeZone;
  return null;
}

function toTwelveHourTimeLabel(hour24: number, minute: number): string {
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 || 12;
  const minuteText = String(minute).padStart(2, "0");
  return `${hour12}:${minuteText} ${period}`;
}

function isoToTimeLabel(input?: string | null): string | null {
  if (!input) return null;
  if (USE_WALL_CLOCK_EVENT_TIME) {
    const matched = input.match(/T(\d{2}):(\d{2})/);
    if (matched) {
      const hour24 = Number(matched[1]);
      const minute = Number(matched[2]);
      if (
        Number.isInteger(hour24) &&
        Number.isInteger(minute) &&
        hour24 >= 0 &&
        hour24 <= 23 &&
        minute >= 0 &&
        minute <= 59
      ) {
        return toTwelveHourTimeLabel(hour24, minute);
      }
    }
  }

  const date = new Date(input);
  if (!Number.isFinite(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-US", {
    timeZone: EVENT_DISPLAY_TIME_ZONE,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

function normalizeTimeLabel(fields?: EventFields | null): string {
  const explicit = typeof fields?.time === "string" ? fields.time.trim() : "";
  if (explicit) return explicit;

  const start = isoToTimeLabel(fields?.startAt);
  const end = isoToTimeLabel(fields?.endAt);
  if (start && end) return `${start} - ${end}`;
  if (start) return start;
  return "";
}

function normalizeLocation(fields?: EventFields | null): string {
  return normalizeText(fields?.location) || "";
}

function normalizeScalarText(input?: unknown): string | undefined {
  if (typeof input === "string") {
    const trimmed = input.trim();
    return trimmed ? trimmed : undefined;
  }

  if (Array.isArray(input)) {
    for (const item of input) {
      const normalized = normalizeScalarText(item);
      if (normalized) return normalized;
    }
  }

  return undefined;
}

function normalizeText(input?: unknown): string | undefined {
  const scalar = normalizeScalarText(input);
  if (scalar) return scalar;

  if (typeof input === "object" && input !== null) {
    if ("url" in input && typeof (input as { url?: unknown }).url === "string") {
      const urlTrimmed = (input as { url: string }).url.trim();
      return urlTrimmed ? urlTrimmed : undefined;
    }
    if ("href" in input && typeof (input as { href?: unknown }).href === "string") {
      const hrefTrimmed = (input as { href: string }).href.trim();
      return hrefTrimmed ? hrefTrimmed : undefined;
    }
  }
  return undefined;
}

function resolveEventFieldImageUrl(image: EventFieldImage | undefined): string | null {
  if (!image) return null;
  if (typeof image === "string") return resolveCmsImageUrl(image);

  return (
    resolveCmsImageUrl(image.node?.mediaItemUrl) ||
    resolveCmsImageUrl(image.node?.sourceUrl) ||
    resolveCmsImageUrl(image.mediaItemUrl) ||
    resolveCmsImageUrl(image.sourceUrl) ||
    resolveCmsImageUrl(image.url) ||
    null
  );
}

function normalizeRelatedMinistrySlugs(value: unknown): string[] | undefined {
  if (Array.isArray(value)) {
    const out = value
      .map((item) => (typeof item === "string" ? item : ""))
      .map((item) => item.trim().toLowerCase())
      .filter((item) => item.length > 0);
    return out.length > 0 ? Array.from(new Set(out)) : undefined;
  }

  if (typeof value === "string") {
    const out = value
      .split(",")
      .map((item) => item.trim().toLowerCase())
      .filter((item) => item.length > 0);
    return out.length > 0 ? Array.from(new Set(out)) : undefined;
  }

  return undefined;
}

function canonicalizeSlug(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function slugMatches(left: string | undefined, right: string): boolean {
  if (!left) return false;
  const leftNormalized = left.trim().toLowerCase();
  const rightNormalized = right.trim().toLowerCase();
  if (!leftNormalized || !rightNormalized) return false;
  if (leftNormalized === rightNormalized) return true;
  const leftCanonical = canonicalizeSlug(leftNormalized);
  const rightCanonical = canonicalizeSlug(rightNormalized);
  return Boolean(leftCanonical && rightCanonical && leftCanonical === rightCanonical);
}

function parseDate(value?: string): Date | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

function inferLifecycleStatus(item: Pick<CalendarEventItem, "lifecycleStatus" | "archiveAt" | "endAt">): EventLifecycleStatus {
  if (item.lifecycleStatus) return item.lifecycleStatus;
  const now = new Date();
  const archiveAtDate = parseDate(item.archiveAt);
  if (archiveAtDate && archiveAtDate.getTime() <= now.getTime()) return "ARCHIVED";
  const endAtDate = parseDate(item.endAt);
  if (endAtDate && endAtDate.getTime() < now.getTime()) return "ENDED";
  return "PUBLISHED";
}

export function isArchivedEvent(item: Pick<CalendarEventItem, "lifecycleStatus" | "archiveAt" | "endAt">): boolean {
  const status = inferLifecycleStatus(item);
  if (ARCHIVED_STATUSES.has(status)) return true;
  const archiveAtDate = parseDate(item.archiveAt);
  if (archiveAtDate && archiveAtDate.getTime() <= Date.now()) return true;
  const endAtDate = parseDate(item.endAt);
  return Boolean(endAtDate && endAtDate.getTime() < Date.now());
}

function isVisibleOnSite(item: CalendarEventItem): boolean {
  const status = inferLifecycleStatus(item);
  return !DRAFT_STATUSES.has(status);
}

function mapWpEventNode(node: WpEventNode): CalendarEventItem | null {
  if (!isPublished(node.status)) return null;

  const date = toDateKey(node.eventFields?.startAt || node.date);
  if (!date) return null;

  const titleBase = node.title?.trim() || node.slug || "event";
  const localizedTitleEn = normalizeText(node.eventFields?.titleEn);
  const localizedTitleZh = normalizeText(node.eventFields?.titleZh);
  const localizedSummaryEn = normalizeText(node.eventFields?.summaryEn);
  const localizedSummaryZh = normalizeText(node.eventFields?.summaryZh);
  const titleEn = localizedTitleEn || localizedTitleZh || titleBase;
  const titleZh = localizedTitleZh || localizedTitleEn || titleBase;
  const image =
    resolveEventFieldImageUrl(node.eventFields?.coverImage) ||
    resolveCmsImageUrl(node.featuredImage?.node?.sourceUrl) ||
    FALLBACK_EVENT_IMAGE;

  const item: CalendarEventItem = {
    id: node.slug || node.id,
    titleEn,
    titleZh,
    summaryEn: localizedSummaryEn || localizedSummaryZh,
    summaryZh: localizedSummaryZh || localizedSummaryEn,
    date,
    time: normalizeTimeLabel(node.eventFields),
    location: normalizeLocation(node.eventFields),
    image,
    startAt: normalizeText(node.eventFields?.startAt),
    endAt: normalizeText(node.eventFields?.endAt),
    archiveAt: normalizeText(node.eventFields?.archiveAt),
    lifecycleStatus: normalizeLifecycleStatus(node.eventFields?.lifecycleStatus),
    registrationMode: normalizeRegistrationMode(node.eventFields?.registrationMode),
    registrationUrl: normalizeText(node.eventFields?.registrationUrl),
    paymentMode: normalizePaymentMode(node.eventFields?.paymentMode),
    paymentAmount: typeof node.eventFields?.paymentAmount === "number" ? node.eventFields.paymentAmount : undefined,
    donationLink: normalizeText(node.eventFields?.donationLink),
    donationPurposeCode: normalizeText(node.eventFields?.donationPurposeCode),
    primaryMinistrySlug: normalizeText(node.eventFields?.primaryMinistrySlug)?.toLowerCase(),
    relatedMinistrySlugs: normalizeRelatedMinistrySlugs(node.eventFields?.relatedMinistrySlugs),
  };

  return isVisibleOnSite(item) ? item : null;
}

function sortEvents(items: CalendarEventItem[]): CalendarEventItem[] {
  return [...items].sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    if (dateCompare !== 0) return dateCompare;
    return a.id.localeCompare(b.id);
  });
}

async function queryWpEvents(): Promise<EventsGQL> {
  try {
    return await wpgraphql<EventsGQL>(
      EVENTS_QUERY_FULL,
      { first: 120 },
      { revalidate: EVENT_REVALIDATE_SECONDS, label: "wpgraphql:events-list:full" }
    );
  } catch (error) {
    if (!shouldTryAlternateEventsQuery(error)) throw error;

    const attempts: Array<{ query: string; label: string }> = [
      { query: EVENTS_QUERY_FULL_MIXED, label: "wpgraphql:events-list:full-mixed" },
      { query: EVENTS_QUERY_FULL_MIXED_MEDIA, label: "wpgraphql:events-list:full-mixed-media" },
      { query: EVENTS_QUERY_FULL_MIXED_SCALAR, label: "wpgraphql:events-list:full-mixed-scalar" },
      { query: EVENTS_QUERY_CONTENT_MIXED, label: "wpgraphql:events-list:content-mixed" },
      { query: EVENTS_QUERY_CONTENT_MIXED_MEDIA, label: "wpgraphql:events-list:content-mixed-media" },
      { query: EVENTS_QUERY_CONTENT_MIXED_SCALAR, label: "wpgraphql:events-list:content-mixed-scalar" },
      { query: EVENTS_QUERY_FULL_LOWER, label: "wpgraphql:events-list:full-lower" },
      {
        query: EVENTS_QUERY_MINIMAL_MIXED_MEDIA_NODE_FRAGMENT_REG_MINISTRY_LOWER,
        label: "wpgraphql:events-list:minimal-mixed-media-node-fragment-reg-ministry-lower",
      },
      {
        query: EVENTS_QUERY_MINIMAL_MIXED_MEDIA_NODE_FRAGMENT_REG_MINISTRY_CAMEL,
        label: "wpgraphql:events-list:minimal-mixed-media-node-fragment-reg-ministry-camel",
      },
      { query: EVENTS_QUERY_MINIMAL_MIXED_MEDIA_NODE_FRAGMENT_REG_LOWER, label: "wpgraphql:events-list:minimal-mixed-media-node-fragment-reg-lower" },
      { query: EVENTS_QUERY_MINIMAL_MIXED_MEDIA_NODE_FRAGMENT_REG_CAMEL, label: "wpgraphql:events-list:minimal-mixed-media-node-fragment-reg-camel" },
      { query: EVENTS_QUERY_MINIMAL_MIXED_MEDIA_NODE_FRAGMENT, label: "wpgraphql:events-list:minimal-mixed-media-node-fragment" },
      { query: EVENTS_QUERY_MINIMAL_MIXED_MEDIA_NODE, label: "wpgraphql:events-list:minimal-mixed-media-node" },
      { query: EVENTS_QUERY_MINIMAL_MIXED_MEDIA, label: "wpgraphql:events-list:minimal-mixed-media" },
      { query: EVENTS_QUERY_MINIMAL_MIXED_SCALAR, label: "wpgraphql:events-list:minimal-mixed-scalar" },
      { query: EVENTS_QUERY_MINIMAL_LOWER_MEDIA_NODE_FRAGMENT, label: "wpgraphql:events-list:minimal-lower-media-node-fragment" },
      { query: EVENTS_QUERY_MINIMAL_LOWER_MEDIA_NODE, label: "wpgraphql:events-list:minimal-lower-media-node" },
      { query: EVENTS_QUERY_MINIMAL_LOWER_MEDIA, label: "wpgraphql:events-list:minimal-lower-media" },
      { query: EVENTS_QUERY_MINIMAL_LOWER_SCALAR, label: "wpgraphql:events-list:minimal-lower-scalar" },
      { query: EVENTS_QUERY_MINIMAL_LOWER, label: "wpgraphql:events-list:minimal-lower" },
      { query: EVENTS_QUERY_FULL_MEDIA, label: "wpgraphql:events-list:full-media" },
      { query: EVENTS_QUERY_FULL_SCALAR, label: "wpgraphql:events-list:full-scalar" },
      { query: EVENTS_QUERY_FULL_LOWER_MEDIA, label: "wpgraphql:events-list:full-lower-media" },
      { query: EVENTS_QUERY_FULL_LOWER_SCALAR, label: "wpgraphql:events-list:full-lower-scalar" },
      { query: EVENTS_QUERY_CORE, label: "wpgraphql:events-list:core" },
      { query: EVENTS_QUERY_CORE_MEDIA, label: "wpgraphql:events-list:core-media" },
      { query: EVENTS_QUERY_CORE_SCALAR, label: "wpgraphql:events-list:core-scalar" },
      { query: EVENTS_QUERY_CORE_LOWER, label: "wpgraphql:events-list:core-lower" },
      { query: EVENTS_QUERY_CORE_LOWER_MEDIA, label: "wpgraphql:events-list:core-lower-media" },
      { query: EVENTS_QUERY_CORE_LOWER_SCALAR, label: "wpgraphql:events-list:core-lower-scalar" },
      { query: EVENTS_QUERY_MINIMAL_MEDIA_NODE_FRAGMENT, label: "wpgraphql:events-list:minimal-media-node-fragment" },
      { query: EVENTS_QUERY_MINIMAL_MEDIA_NODE, label: "wpgraphql:events-list:minimal-media-node" },
      { query: EVENTS_QUERY_MINIMAL_MEDIA, label: "wpgraphql:events-list:minimal-media" },
      { query: EVENTS_QUERY_MINIMAL_SCALAR, label: "wpgraphql:events-list:minimal-scalar" },
      { query: EVENTS_QUERY_MINIMAL, label: "wpgraphql:events-list:minimal" },
      { query: EVENTS_QUERY_BASE, label: "wpgraphql:events-list:base" },
    ];

    let lastError: unknown = error;

    for (const attempt of attempts) {
      try {
        return await wpgraphql<EventsGQL>(
          attempt.query,
          { first: 120 },
          { revalidate: EVENT_REVALIDATE_SECONDS, label: attempt.label }
        );
      } catch (attemptError) {
        if (!shouldTryAlternateEventsQuery(attemptError)) {
          throw attemptError;
        }
        lastError = attemptError;
      }
    }

    throw lastError;
  }
}

async function fetchAllEvents(): Promise<CalendarEventItem[]> {
  const data = await queryWpEvents();
  const mapped = data.events.nodes.map(mapWpEventNode).filter((item): item is CalendarEventItem => Boolean(item));
  return sortEvents(mapped);
}

const getAllEventsCached = unstable_cache(async () => fetchAllEvents(), ["events:all:v1"], {
  revalidate: EVENT_REVALIDATE_SECONDS,
  tags: ["events", "events-list", "calendar-events"],
});

export async function getAllEvents(): Promise<CalendarEventItem[]> {
  const startedAt = Date.now();
  try {
    return await getAllEventsCached();
  } finally {
    const elapsed = Date.now() - startedAt;
    console.log(`[events] route=/events elapsed=${elapsed}ms cacheHit=unknown`);
  }
}

function uniqueById(items: CalendarEventItem[]): CalendarEventItem[] {
  const map = new Map<string, CalendarEventItem>();
  for (const item of items) map.set(item.id, item);
  return Array.from(map.values());
}

export async function getCalendarEvents(): Promise<CalendarEventItem[]> {
  const all = await getAllEvents();
  return all.filter((item) => !isArchivedEvent(item));
}

export async function getArchivedEvents(): Promise<CalendarEventItem[]> {
  const all = await getAllEvents();
  return all.filter((item) => isArchivedEvent(item));
}

export async function getEventBySlug(slug: string): Promise<CalendarEventItem | null> {
  const normalized = slug.trim().toLowerCase();
  if (!normalized) return null;
  const all = await getAllEvents();
  return all.find((item) => item.id.toLowerCase() === normalized) || null;
}

export async function getEventsByMinistry(
  ministrySlug: string,
  options?: { includeArchived?: boolean; limit?: number }
): Promise<CalendarEventItem[]> {
  const normalized = ministrySlug.trim().toLowerCase();
  if (!normalized) return [];
  const includeArchived = options?.includeArchived ?? true;
  const limit = options?.limit ?? 6;
  const all = await getAllEvents();

  const items = all.filter((item) => {
    const primaryMatched = slugMatches(item.primaryMinistrySlug, normalized);
    const relatedMatched = item.relatedMinistrySlugs?.some((slug) => slugMatches(slug, normalized)) || false;
    const archivedMatched = includeArchived ? true : !isArchivedEvent(item);
    return (primaryMatched || relatedMatched) && archivedMatched;
  });

  return uniqueById(items).slice(0, Math.max(1, limit));
}

export async function getAllEventsSafeResult(): Promise<CalendarEventsSafeResult> {
  try {
    const items = await getAllEvents();
    return { items, degraded: false, errorType: null };
  } catch (error) {
    const errorType = getErrorType(error);
    const message = getErrorMessage(error);
    console.warn("[events] wp events unavailable, return empty list", { errorType, message });
    return { items: [], degraded: true, errorType };
  }
}

export async function getCalendarEventsSafeResult(): Promise<CalendarEventsSafeResult> {
  const result = await getAllEventsSafeResult();
  return { ...result, items: result.items.filter((item) => !isArchivedEvent(item)) };
}

export async function getArchivedEventsSafeResult(): Promise<CalendarEventsSafeResult> {
  const result = await getAllEventsSafeResult();
  return { ...result, items: result.items.filter((item) => isArchivedEvent(item)) };
}

export async function getEventBySlugSafeResult(
  slug: string
): Promise<{ data: CalendarEventItem | null; degraded: boolean; errorType: string | null }> {
  const result = await getAllEventsSafeResult();
  const normalized = slug.trim().toLowerCase();
  const data = result.items.find((item) => item.id.toLowerCase() === normalized) || null;
  return { data, degraded: result.degraded, errorType: result.errorType };
}

export async function getEventsByMinistrySafeResult(
  ministrySlug: string,
  options?: { includeArchived?: boolean; limit?: number }
): Promise<CalendarEventsSafeResult> {
  const result = await getAllEventsSafeResult();
  const normalized = ministrySlug.trim().toLowerCase();
  const includeArchived = options?.includeArchived ?? true;
  const limit = options?.limit ?? 6;
  const items = result.items
    .filter((item) => {
      const primaryMatched = slugMatches(item.primaryMinistrySlug, normalized);
      const relatedMatched = item.relatedMinistrySlugs?.some((slug) => slugMatches(slug, normalized)) || false;
      const archivedMatched = includeArchived ? true : !isArchivedEvent(item);
      return (primaryMatched || relatedMatched) && archivedMatched;
    })
    .slice(0, Math.max(1, limit));

  return { ...result, items };
}
