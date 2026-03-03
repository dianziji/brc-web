"use client";

import Image from "next/image";
import type { MediaCardProps } from "@/components/home/types";

type Slide = Pick<MediaCardProps, "title" | "subtitle" | "href"> & {
  src: string;
};

type MobileMinistryScrollerProps = {
  slides: Slide[];
};

export default function MobileMinistryScroller({ slides }: MobileMinistryScrollerProps) {
  return (
    <div className="relative mt-2.5">
      <div
        className="flex snap-x gap-1 overflow-x-auto pb-1 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((item) => (
          <a key={`${item.href}-${item.title}`} href={item.href} className="card-overlay-card relative min-h-[170px] min-w-[92%] snap-start overflow-hidden">
            <Image src={item.src} alt={item.title} fill className="object-cover object-center" />
            <div className="media-overlay-strong absolute inset-0" />
            <div className="absolute inset-x-0 bottom-0 space-y-1.5 px-4 pb-4 text-center text-white">
              <div className="font-display text-h3-token font-semibold">{item.title}</div>
              <div className="text-caption-token text-dk-title-token">{item.subtitle}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
