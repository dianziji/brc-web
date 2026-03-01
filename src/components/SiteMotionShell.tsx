"use client";

import { ReactNode, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const BLOCK_SELECTOR = "main > :is(section, article, div, aside, ul, ol, form)";

function isHiddenElement(node: HTMLElement) {
  const style = window.getComputedStyle(node);
  return style.display === "none" || style.visibility === "hidden";
}

export default function SiteMotionShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const revealTargets: HTMLElement[] = [];
    const mains = Array.from(root.querySelectorAll<HTMLElement>("main"));

    mains.forEach((main) => {
      const candidates = Array.from(main.querySelectorAll<HTMLElement>(BLOCK_SELECTOR)).filter((node) => {
        if (node.matches(".section-reveal, [data-reveal], [data-motion-skip='true']")) return false;
        if (node.closest("[data-motion-skip='true']")) return false;
        if (isHiddenElement(node)) return false;
        return true;
      });

      if (candidates.length > 0) {
        revealTargets.push(...candidates);
      } else {
        revealTargets.push(main);
      }
    });

    revealTargets.forEach((node, index) => {
      node.dataset.autoReveal = "pending";
      node.style.setProperty("--reveal-delay", `${Math.min(index * 44, 260)}ms`);
      if (node.children.length > 1) {
        node.dataset.autoStagger = "true";
      } else {
        node.removeAttribute("data-auto-stagger");
      }
    });

    if (!("IntersectionObserver" in window)) {
      revealTargets.forEach((node) => {
        node.dataset.autoReveal = "visible";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const node = entry.target as HTMLElement;
          if (!entry.isIntersecting) return;
          node.dataset.autoReveal = "visible";
          observer.unobserve(node);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    revealTargets.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [pathname]);

  return <div ref={rootRef}>{children}</div>;
}
