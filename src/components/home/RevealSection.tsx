"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type RevealSectionProps = {
  className?: string;
  children: ReactNode;
  threshold?: number;
  rootMargin?: string;
};

export default function RevealSection({
  className = "",
  children,
  threshold = 0.18,
  rootMargin = "0px 0px -8% 0px",
}: RevealSectionProps) {
  const [revealState, setRevealState] = useState<"pending" | "visible">("pending");
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const hasIntersectionObserver = typeof globalThis.IntersectionObserver !== "undefined";
    if (!hasIntersectionObserver) {
      const id = globalThis.setTimeout(() => {
        setRevealState("visible");
      }, 0);
      return () => globalThis.clearTimeout(id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setRevealState("visible");
          observer.unobserve(node);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <section ref={ref} data-reveal={revealState} className={`section-reveal ${className}`.trim()}>
      {children}
    </section>
  );
}
