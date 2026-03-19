import type { Locale } from "@/lib/i18n";
import type { MediaKey } from "@/content/media";

export type FixedTopSection = {
  slug: string;
  titleZh: string;
  titleEn: string;
  descZh: string;
  descEn: string;
  imageKey: MediaKey;
};

export const fixedTopSections: FixedTopSection[] = [
  {
    slug: "missions",
    titleZh: "宣教事工",
    titleEn: "Mission",
    descZh: "跨文化與社區關懷的宣教與服務。",
    descEn: "Cross-cultural and community outreach ministries.",
    imageKey: "ministriesTopMissions",
  },
  {
    slug: "young-adult",
    titleZh: "青年事工",
    titleEn: "Young Adult",
    descZh: "裝備青年、建造下一代門徒。",
    descEn: "Equip young adults and build the next generation of disciples.",
    imageKey: "ministriesTopYoungAdult",
  },
  {
    slug: "family",
    titleZh: "家庭事工",
    titleEn: "Family",
    descZh: "支持家庭與婚姻的成長與更新。",
    descEn: "Support families and marriages for growth and renewal.",
    imageKey: "ministriesTopFamily",
  },
];

export function getFixedTopSection(top: string): FixedTopSection | null {
  if (top === "mission") {
    return fixedTopSections.find((item) => item.slug === "missions") || null;
  }
  return fixedTopSections.find((item) => item.slug === top) || null;
}

export function getFixedTopTitle(top: string, locale: Locale): string {
  const item = getFixedTopSection(top);
  if (item) return locale === "en" ? item.titleEn : item.titleZh;
  return top.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
