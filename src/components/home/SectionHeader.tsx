import type { SectionHeaderProps } from "./types";

export default function SectionHeader({
  title,
  cta,
  className = "",
  titleClassName = "",
}: SectionHeaderProps) {
  return (
    <div className={`section-heading-row ${className}`.trim()}>
      <h2 className={`font-display text-h2-token text-heading-token font-semibold ${titleClassName}`.trim()}>
        {title}
      </h2>
      {cta ? (
        <a className={`focus-ring-token text-body-token link-primary ${cta.className ?? ""}`.trim()} href={cta.href} aria-label={cta.ariaLabel}>
          {cta.label}
        </a>
      ) : null}
    </div>
  );
}
