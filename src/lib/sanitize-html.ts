import sanitizeHtml from "sanitize-html";

const ALLOWED_TAGS = [
  "p",
  "br",
  "hr",
  "strong",
  "em",
  "b",
  "i",
  "u",
  "s",
  "ul",
  "ol",
  "li",
  "blockquote",
  "code",
  "pre",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "a",
  "span",
] as const;

const ALLOWED_TARGETS = new Set(["_blank", "_self", "_parent", "_top"]);

export function sanitizeRichHtml(input: string): string {
  if (!input) return "";

  return sanitizeHtml(input, {
    allowedTags: [...ALLOWED_TAGS],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesAppliedToAttributes: ["href"],
    allowProtocolRelative: false,
    disallowedTagsMode: "discard",
    transformTags: {
      a: (tagName, attribs) => {
        const href = attribs.href?.trim();
        const title = attribs.title?.trim();
        const target = attribs.target?.trim();
        const isExternalHttp = typeof href === "string" && /^https?:\/\//i.test(href);

        const nextAttribs: Record<string, string> = {};
        if (href) nextAttribs.href = href;
        if (title) nextAttribs.title = title.slice(0, 300);

        if (isExternalHttp) {
          nextAttribs.target = "_blank";
          nextAttribs.rel = "noopener noreferrer";
        } else if (target && ALLOWED_TARGETS.has(target)) {
          nextAttribs.target = target;
        }

        return { tagName, attribs: nextAttribs };
      },
    },
    // Drop empty/invalid anchors and keep inner text.
    exclusiveFilter: (frame) => frame.tag === "a" && !frame.attribs.href ? "excludeTag" : false,
  });
}

export function stripRichHtml(input: string): string {
  if (!input) return "";

  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {},
    disallowedTagsMode: "discard",
  })
    .replace(/\s+/g, " ")
    .trim();
}
