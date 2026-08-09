import type { MediaKey } from "@/content/media";
import type { Localized } from "@/lib/i18n";

export type CrownBook = {
  title: Localized<string>;
  description: Localized<string>;
  image?: MediaKey;
};

// 購書者請洽「使者書房」(AFC / Ambassadors for Christ bookstore).
export const bookstoreName: Localized<string> = { zh: "使者書房", en: "AFC Bookstore (使者書房)" };
export const bookstoreUrl = "https://www.afcresources.org/";

export const booksIntro: Localized<string> = {
  zh: "以下是冠冕推薦的聖經理財好書，幫助你在婚姻、家庭與日常生活中應用上帝的財務原則。",
  en: "Below are books recommended by Crown to help you apply God's financial principles in marriage, family, and daily life.",
};

export const crownBooks: CrownBook[] = [
  {
    title: { zh: "《金錢與婚姻─蒙福之道》", en: "Money and Marriage—God's Way" },
    description: {
      zh: "冠冕共同創辦人戴浩華（Howard Dayton）著。以聖經原則幫助未婚與已婚夫妻經營婚姻與家庭的財務，藉著財務健全使婚姻關係更穩固。",
      en: "By Crown co-founder Howard Dayton. Uses biblical principles to help couples—engaged or married—manage their finances, strengthening the marriage through financial health.",
    },
    image: "crownBookMoneyMarriage",
  },
  {
    title: { zh: "《享受財務自由的十二堂必修課》", en: "Twelve Essential Lessons for Financial Freedom" },
    description: {
      zh: "循序漸進的聖經理財課程，帶你認識管家職份、建立預算、脫離負債，邁向真正的財務自由。",
      en: "A step-by-step biblical finance course that introduces stewardship, budgeting, and getting out of debt on the way to true financial freedom.",
    },
    image: "crownBookFinancialFreedom12",
  },
  {
    title: { zh: "《2350－聖經財務管理解密》", en: "2350: Biblical Financial Management Decoded" },
    description: {
      zh: "書名取自聖經中約 2350 節談論錢財的經文，系統整理聖經的理財原則，帶讀者認識管家職份、奉獻、負債與儲蓄等主題。",
      en: "Named after the roughly 2,350 verses in Scripture that speak about money, it lays out the Bible's financial principles—stewardship, giving, debt, and saving.",
    },
    image: "crownBook2350",
  },
  {
    title: { zh: "《得力有魚─9'59\" 靈修計劃》", en: "Strength and Fish — the 9'59\" Devotional Plan" },
    description: {
      zh: "以每日約十分鐘的靈修設計，幫助信徒在忙碌生活中親近神，操練以聖經真理面對金錢與生活。",
      en: "A daily devotional of about ten minutes, helping believers draw near to God amid busy lives and meet money and daily life with biblical truth.",
    },
    image: "crownBookStrengthFish",
  },
  {
    title: { zh: "《在餘震後存活─從經濟地震中復原》", en: "Surviving the Aftershock — Recovering from an Economic Earthquake" },
    description: {
      zh: "冠冕執行長班查克（Chuck Bentley）著。面對經濟震盪與不確定，以聖經智慧幫助個人與家庭穩住財務、重新站立。",
      en: "By Crown CEO Chuck Bentley. Facing economic turmoil and uncertainty, it offers biblical wisdom to help individuals and families steady their finances and recover.",
    },
    image: "crownBookAftershock",
  },
  {
    title: { zh: "《財富之根》", en: "The Root of Riches" },
    description: {
      zh: "班查克（Chuck Bentley）著。從心思意念的根源談起，重新定義何為真正的財富，帶讀者建立合神心意的金錢觀。",
      en: "By Chuck Bentley. Going to the root of our thinking, it redefines what true wealth is and helps readers build a God-honoring view of money.",
    },
    image: "crownBookRootOfRiches",
  },
  {
    title: { zh: "《經商有道 DVD：合神心意的經營管理》", en: "Business by the Book (DVD): Managing Business God's Way" },
    description: {
      zh: "冠冕「經商有道」影音教材，以聖經原則裝備工商界基督徒，在職場與事業的經營管理上榮神益人。",
      en: "Crown's “Business by the Book” video course, equipping Christians in the marketplace to run and manage their work and business by biblical principles.",
    },
    image: "crownBookBusinessDvd",
  },
  {
    title: { zh: "《理財贏家》", en: "Your Money Counts" },
    description: {
      zh: "戴浩華（Howard Dayton）著。應用聖經原則理財的入門讀物，也是參加冠冕「理財有道」小組研習前的必讀書。",
      en: "By Howard Dayton. An introduction to handling money by biblical principles, and the required pre-reading before joining the Crown Biblical Financial Study small group.",
    },
    image: "crownBookYourMoneyCounts",
  },
];
