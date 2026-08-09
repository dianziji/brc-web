import type { Localized } from "@/lib/i18n";

export type StatementBlock = {
  title: Localized<string>;
  body: Localized<string>;
};

export const crownIntro: Localized<string[]> = {
  zh: [
    "冠冕是一個超宗派的國際性基督教非營利事工組織，為全球最大的基督教理財及管家職份事工。",
    "四十多年來，冠冕的事工已發展至全球五大洲、九十餘個國家，至少有六千萬人次以上接受冠冕的聖經理財教導。",
  ],
  en: [
    "Crown is an interdenominational, international Christian nonprofit ministry—one of the largest Christian ministries devoted to biblical finance and stewardship worldwide.",
    "Over more than forty years, Crown's ministry has reached five continents and more than ninety countries, with over sixty million people receiving Crown's biblical financial teaching.",
  ],
};

export const northAmericaHistory: Localized<string[]> = {
  zh: [
    "北美華文外展事工成立於 2011 年。冠冕任命溫英幹教授為首任 Director，帶領同工在加州、德州、紐約州、新澤西、馬里蘭、賓州、加拿大及中國地區等地服事。",
    "神於 2020 年 6 月 11 日接祂忠心的僕人溫教授回天家。依溫教授遺願，同年 6 月 23 日，冠冕正式任命邱燕惠姊妹接任冠冕北美華文外展事工部。",
    "北美華文外展事工部以義工方式參與事奉。謝謝有感動為我們事工需要的奉獻。",
  ],
  en: [
    "The North American Chinese Outreach Ministry was founded in 2011. Crown appointed Professor Ying-Gan Wen (溫英幹) as its first Director, leading coworkers serving in California, Texas, New York, New Jersey, Maryland, Pennsylvania, Canada, and China.",
    "On June 11, 2020, God called His faithful servant Professor Wen home. In keeping with his wishes, on June 23 of the same year Crown officially appointed Olive Chiu (邱燕惠) to lead the North American Chinese Outreach Ministry.",
    "The North American Chinese Outreach Ministry serves entirely through volunteers. We are grateful for gifts given as the Lord leads for the needs of this ministry.",
  ],
};

export const visionStatement: StatementBlock = {
  title: { zh: "冠冕的異象", en: "Vision Statement" },
  body: {
    zh: "每一個國家的基督徒，都忠心地在生活的每一個層面遵循上帝的財務原則。",
    en: "Christians in every nation faithfully following God's financial principles in every area of life.",
  },
};

export const missionStatement: StatementBlock = {
  title: { zh: "冠冕的使命", en: "Mission Statement" },
  body: {
    zh: "讓全世界的人們能學習、應用並教導上帝的財務原則，使人可以更親密地認識基督、更自由地服事祂，並支持神所託付的大使命。",
    en: "Equipping people worldwide to learn, apply, and teach God's financial principles, so that they may know Christ more intimately, serve Him more freely, and support the Great Commission He has entrusted to us.",
  },
};

export const northAmericaVision: Localized<string[]> = {
  zh: ["遵行神的旨意事奉", "效法耶穌陪訓門徒", "財務忠心事奉忠心", "實踐大誡命大使命"],
  en: [
    "Serve according to God's will",
    "Follow Jesus in discipling others",
    "Faithful in finances, faithful in service",
    "Live out the Great Commandment and the Great Commission",
  ],
};
