// src/app/ministries/[top]/[slug]/page.tsx
type Detail = {
  slug: string;
  fields: {
    titleEn?: string;
    titleZh?: string;
    summaryEn?: string;
    summaryZh?: string;
    heroImage?: { node?: { sourceUrl?: string; altText?: string } };
  };
  section: { top: string | null; leaf: { slug: string } | null; parent?: any };
};

export const revalidate = 60;

async function getDetail(slug: string): Promise<Detail | null> {
  const configuredBaseUrl = process.env.SITE_URL?.replace(/\/$/, "");
  if (!configuredBaseUrl) {
    throw new Error("Missing SITE_URL for internal API request");
  }

  const url = `${configuredBaseUrl}/api/ministries/${encodeURIComponent(slug)}`;
  const res = await fetch(url, { next: { revalidate: 60 } });

  if (!res.ok) {
    if (res.status === 404) return null;
    const body = await res.text().catch(() => "");
    throw new Error(`Ministry API failed: ${res.status} ${res.statusText}. ${body}`);
  }

  return res.json();
}

export default async function Page({ params }: { params: Promise<{ top: string; slug: string }> }) {
  const { top, slug } = await params;
  const data = await getDetail(slug);
  if (!data) {
    return (
      <main className="mx-auto max-w-4xl px-6 pt-28 pb-6 md:pt-32 space-y-6">
        <a className="underline" href={`/ministries/${top}`}>← Back</a>
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          Ministry not found.
        </div>
      </main>
    );
  }

  // 可选：校验 URL 的 top 是否和推导 top 一致（避免错误链接）
  // 如果不一致，你可以 redirect 到正确的 URL（后续我带你做）
  const title = data.fields.titleEn || data.fields.titleZh || data.slug;

  return (
    <main className="mx-auto max-w-4xl px-6 pt-28 pb-6 md:pt-32 space-y-6">
      <a className="underline" href={`/ministries/${top}`}>← Back</a>

      <h1 className="text-3xl font-semibold">{title}</h1>

      {data.fields.heroImage?.node?.sourceUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={data.fields.heroImage.node.sourceUrl}
          alt={data.fields.heroImage.node.altText || ""}
          className="w-full rounded-xl border"
        />
      ) : null}

      <section className="prose max-w-none">
        {/* Phase 1 先直接输出 HTML（你 summary 是富文本） */}
        <div dangerouslySetInnerHTML={{ __html: data.fields.summaryEn || data.fields.summaryZh || "" }} />
      </section>
    </main>
  );
}