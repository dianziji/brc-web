"use client";

type ScrollToSectionButtonProps = {
  targetId: string;
  ariaLabel: string;
  className?: string;
  children: React.ReactNode;
};

export default function ScrollToSectionButton({
  targetId,
  ariaLabel,
  className = "",
  children,
}: ScrollToSectionButtonProps) {
  const handleClick = () => {
    const target = document.getElementById(targetId);
    if (!target) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({
      block: "start",
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <button type="button" className={className} aria-label={ariaLabel} onClick={handleClick}>
      {children}
    </button>
  );
}
