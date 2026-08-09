import { pickLocalizedValue, type Locale, type Localized } from "@/lib/i18n";

type CoreValue = {
  gridClass: string;
  keyword: Localized<string>;
  description: Localized<string>;
};

const heading: Localized<string> = { zh: "冠冕核心價值", en: "Crown Core Values" };
const roleTop: Localized<string> = { zh: "神的角色", en: "God's role" };
const roleBottom: Localized<string> = { zh: "我們的角色", en: "Our role" };
const coreLines: Localized<string[]> = {
  zh: ["以基督為中心", "以聖經為基礎"],
  en: ["Christ at the center", "Founded on Scripture"],
};

// Order matters for the mobile stack (center first, then the four values).
const values: CoreValue[] = [
  {
    gridClass: "md:col-start-2 md:row-start-1",
    keyword: { zh: "所有權", en: "Ownership" },
    description: { zh: "承認上帝擁有一切", en: "Acknowledging that God owns everything" },
  },
  {
    gridClass: "md:col-start-1 md:row-start-2",
    keyword: { zh: "卓越", en: "Excellence" },
    description: { zh: "以卓越的服事裝備他人", en: "Equipping others through excellent service" },
  },
  {
    gridClass: "md:col-start-3 md:row-start-2",
    keyword: { zh: "合宜", en: "Relevance" },
    description: {
      zh: "以各文化與世代都能明白的方式教導",
      en: "Teaching in ways every culture and generation can understand",
    },
  },
  {
    gridClass: "md:col-start-2 md:row-start-3",
    keyword: { zh: "禱告", en: "Prayer" },
    description: { zh: "凡事禱告", en: "Praying about everything" },
  },
];

function RoleLabel({ locale, value }: { locale: Locale; value: Localized<string> }) {
  return (
    <div className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-muted-token">
      <span className="h-px w-8 bg-[var(--border)]" aria-hidden="true" />
      {pickLocalizedValue(locale, value)}
      <span className="h-px w-8 bg-[var(--border)]" aria-hidden="true" />
    </div>
  );
}

export default function CrownCoreValues({ locale }: { locale: Locale }) {
  return (
    <figure className="overflow-hidden rounded-3xl border border-token bg-[linear-gradient(160deg,var(--accent-weak)_0%,var(--sec-a)_55%)] p-6 md:p-10">
      <figcaption className="text-center text-h3-token font-semibold text-heading-token">
        {pickLocalizedValue(locale, heading)}
      </figcaption>

      <div className="mt-6 space-y-4">
        <RoleLabel locale={locale} value={roleTop} />

        <div className="grid gap-4 md:grid-cols-3 md:grid-rows-3 md:items-center">
          {/* Center emblem */}
          <div className="md:col-start-2 md:row-start-2 flex justify-center">
            <div className="relative flex aspect-square w-44 flex-col items-center justify-center rounded-full bg-[var(--accent-strong)] p-6 text-center text-white shadow-lg md:w-48">
              <span
                aria-hidden="true"
                className="absolute -inset-3 rounded-full border border-dashed border-[color-mix(in_srgb,var(--accent)_45%,transparent)]"
              />
              <svg viewBox="0 0 24 24" className="h-6 w-6 opacity-90" fill="currentColor" aria-hidden="true">
                <path d="M10.5 2h3v6h6v3h-6v11h-3V11h-6V8h6z" />
              </svg>
              <div className="mt-2 space-y-0.5">
                {pickLocalizedValue(locale, coreLines).map((line) => (
                  <div key={line} className="text-base font-semibold leading-snug">
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Four surrounding values */}
          {values.map((value) => (
            <div
              key={value.keyword.en}
              className={`card-base bg-surface-a p-4 text-center shadow-sm ${value.gridClass}`}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
                <span className="text-lg font-semibold text-[var(--accent-strong)]">
                  {pickLocalizedValue(locale, value.keyword)}
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-body-color-token">
                {pickLocalizedValue(locale, value.description)}
              </p>
            </div>
          ))}
        </div>

        <RoleLabel locale={locale} value={roleBottom} />
      </div>
    </figure>
  );
}
