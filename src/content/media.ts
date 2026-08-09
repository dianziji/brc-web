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
  // Crown ministry — reuses an existing background for now; swap the src when a
  // dedicated Crown hero image is added under /assets/images/crown/.
  crownHero: {
    src: "/assets/images/mission&vision.jpeg",
    alt: { zh: "冠冕北美華文外展事工", en: "Crown North American Chinese Outreach Ministry" },
  },
  crownLogo: {
    src: "/assets/images/crown/crown-logo.jpg",
    alt: { zh: "冠冕財務事工標誌", en: "Crown Financial Ministries logo" },
  },
  crownBooksBanner: {
    src: "/assets/images/crown/books-banner.jpg",
    alt: { zh: "冠冕好書", en: "Crown recommended books" },
  },
  crownBookMoneyMarriage: {
    src: "/assets/images/crown/book-money-marriage.jpg",
    alt: { zh: "《金錢與婚姻─蒙福之道》書封", en: "Money and Marriage — God's Way (book cover)" },
  },
  crownBookFinancialFreedom12: {
    src: "/assets/images/crown/book-financial-freedom-12.png",
    alt: { zh: "《享受財務自由的十二堂必修課》書封", en: "Twelve Lessons to Enjoy Financial Freedom (book cover)" },
  },
  crownBook2350: {
    src: "/assets/images/crown/book-2350.jpg",
    alt: { zh: "《2350－聖經財務管理解密》書封", en: "2350: Biblical Financial Management Decoded (book cover)" },
  },
  crownBookStrengthFish: {
    src: "/assets/images/crown/book-strength-and-fish.jpg",
    alt: { zh: "《得力有魚 9'59\" 靈修計劃》書封", en: "Strength and Fish 9'59\" Devotional Plan (book cover)" },
  },
  crownBookAftershock: {
    src: "/assets/images/crown/book-surviving-aftershock.jpg",
    alt: { zh: "《在餘震後存活》書封", en: "Surviving the Aftershock (book cover)" },
  },
  crownBookRootOfRiches: {
    src: "/assets/images/crown/book-root-of-riches.jpg",
    alt: { zh: "《財富之根》書封", en: "The Root of Riches (book cover)" },
  },
  crownBookBusinessDvd: {
    src: "/assets/images/crown/book-business-dvd.jpg",
    alt: { zh: "《經商有道 DVD：合神心意的經營管理》", en: "Business by the Book DVD (cover)" },
  },
  crownBookYourMoneyCounts: {
    src: "/assets/images/crown/book-your-money-counts.jpg",
    alt: { zh: "《理財贏家》書封", en: "Your Money Counts (book cover)" },
  },
  crownArticleFinancialDestiny: {
    src: "/assets/images/crown/article-financial-destiny.jpeg",
    alt: { zh: "如何反轉「財務命運」？", en: "How to reverse your financial destiny?" },
  },
  crownMaterialFinancialStudent: {
    src: "/assets/images/crown/material-sg3.jpg",
    alt: { zh: "理財有道 學員手冊", en: "Biblical Financial Study — Student Manual" },
  },
  crownMaterialFinancialLeader: {
    src: "/assets/images/crown/material-sg4.jpg",
    alt: { zh: "理財有道 小組長手冊", en: "Biblical Financial Study — Leader's Guide" },
  },
  crownMaterialBusinessStudent: {
    src: "/assets/images/crown/material-sg1.jpg",
    alt: { zh: "經營有道 學員手冊", en: "Business by the Book — Student Manual" },
  },
  crownMaterialBusinessLeader: {
    src: "/assets/images/crown/material-sg2.jpg",
    alt: { zh: "經商有道 小組長手冊", en: "Business by the Book — Leader's Guide" },
  },
} as const satisfies Record<string, MediaItem>;

export type MediaKey = keyof typeof mediaRegistry;

export function getMediaSrc(key: MediaKey): string {
  return mediaRegistry[key].src;
}

export function getMediaAlt(key: MediaKey, locale: Locale): string {
  return mediaRegistry[key].alt[locale];
}
