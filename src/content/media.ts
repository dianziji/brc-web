import type { Locale } from "@/lib/i18n";

type MediaItem = {
  src: string;
  alt: {
    zh: string;
    en: string;
  };
};

export const mediaRegistry = {
  heroFallback: {
    src: "/assets/images/hero.jpeg",
    alt: { zh: "預設主圖", en: "Default hero image" },
  },
  logo: {
    src: "/assets/images/logo.png",
    alt: { zh: "BRC 標誌", en: "BRC logo" },
  },
  homeMission: {
    src: "/assets/images/mission.jpeg",
    alt: { zh: "異象與使命", en: "Mission section" },
  },
  homeVision: {
    src: "/assets/images/vision.jpeg",
    alt: { zh: "異象內容", en: "Vision section" },
  },
  homePrayerRoom: {
    src: "/assets/images/prayerRoom.jpeg",
    alt: { zh: "禱告室", en: "Prayer room" },
  },
  aboutHero: {
    src: "/assets/images/hand_b&w.jpeg",
    alt: { zh: "關於伯特利中心", en: "About Bethel Renewal Center" },
  },
  aboutStory: {
    src: "/assets/images/BRCstory.jpeg",
    alt: { zh: "伯特利中心故事", en: "BRC story" },
  },
  aboutMissionVision: {
    src: "/assets/images/mission&vision.jpeg",
    alt: { zh: "使命與異象", en: "Mission and vision" },
  },
  donationHero: {
    src: "/assets/images/donation_hero.png",
    alt: { zh: "奉獻支持", en: "Donation" },
  },
  discipleshipHero: {
    src: "/assets/images/discipleship.png",
    alt: { zh: "門徒訓練", en: "Discipleship" },
  },
  ministriesArchiveHero: {
    src: "/assets/images/AdobeStock_462139672.jpeg",
    alt: { zh: "事工檔案", en: "Ministry archive" },
  },
  ministriesTopMissions: {
    src: "/assets/images/mission.jpeg",
    alt: { zh: "宣教事工", en: "Mission ministries" },
  },
  ministriesTopYoungAdult: {
    src: "/assets/images/youthMinistry2.jpeg",
    alt: { zh: "青年事工", en: "Young Adult ministries" },
  },
  ministriesTopFamily: {
    src: "/assets/images/familyMinistry.jpeg",
    alt: { zh: "家庭事工", en: "Family ministries" },
  },
  prayerHero: {
    src: "/assets/images/prayerRoom.jpeg",
    alt: { zh: "禱告室", en: "Prayer room" },
  },
  prayerCardAltar: {
    src: "/assets/images/24h.jpeg",
    alt: { zh: "24 小時禱告祭壇", en: "24/7 prayer altar" },
  },
  prayerCardPlatform: {
    src: "/assets/images/dailyPrayer.jpeg",
    alt: { zh: "伯特利中心禱告平台", en: "BRC prayer platform" },
  },
  prayerCardRpg: {
    src: "/assets/images/mission.jpeg",
    alt: { zh: "RPG 復興禱告特會", en: "RPG revival prayer gathering" },
  },
  prayerCardSending: {
    src: "/assets/images/amaury-gutierrez-rzmQOng8h8I-unsplash.jpg",
    alt: { zh: "祝福差遣禱告會", en: "Blessing and sending prayer meeting" },
  },
} as const satisfies Record<string, MediaItem>;

export type MediaKey = keyof typeof mediaRegistry;

export function getMediaSrc(key: MediaKey): string {
  return mediaRegistry[key].src;
}

export function getMediaAlt(key: MediaKey, locale: Locale): string {
  return mediaRegistry[key].alt[locale];
}
