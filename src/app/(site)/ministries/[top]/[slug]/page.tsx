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
  
  import { headers } from "next/headers";

  async function getDetail(slug: string): Promise<Detail> {
    const h = await headers();
    const host = h.get("x-forwarded-host") ?? h.get("host");
    const proto = h.get("x-forwarded-proto") ?? "http";
  
    if (!host) throw new Error("Unable to determine host for internal API request");
  
    const url = `${proto}://${host}/api/ministries/${encodeURIComponent(slug)}`;
    const res = await fetch(url, { cache: "no-store" });
  
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Ministry API failed: ${res.status} ${res.statusText}. ${body}`);
    }
  
    return res.json();
  }
  export default async function Page({ params }: { params: Promise<{ top: string; slug: string }> }) {
    const { top, slug } = await params;
    const data = await getDetail(slug);
  
    // 可选：校验 URL 的 top 是否和推导 top 一致（避免错误链接）
    // 如果不一致，你可以 redirect 到正确的 URL（后续我带你做）
    const title = data.fields.titleEn || data.fields.titleZh || data.slug;
  
    return (
      <main className="mx-auto max-w-4xl p-6 space-y-6">
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