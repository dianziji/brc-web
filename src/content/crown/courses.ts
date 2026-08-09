import type { MediaKey } from "@/content/media";
import type { Localized } from "@/lib/i18n";

export type CourseGoal = {
  keyword: Localized<string>;
  description: Localized<string>;
};

export type CourseResourceImage = {
  key: MediaKey;
  label: Localized<string>;
};

export type CourseResource = {
  title: Localized<string>;
  description: Localized<string>;
  images: CourseResourceImage[];
};

// 冠冕課程報名表 — Google Form (opens in a new tab).
export const courseRegistrationUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSebAarCRjAkDoUDCUSWSb0NBb8JLtOlhcylTXLXI8Jk-KAyZw/viewform";

export const coursesIntro: Localized<string> = {
  zh: "冠冕系列教材以小組研習的方式進行。透過「聖經觀生命查經小組課程」，學員在群體中一同查考聖經對錢財與管家職份的教導，把真理落實在日常生活裡。",
  en: "Crown's curriculum is taught through small-group study. In the biblical-worldview life-study small group, participants explore together what Scripture teaches about money and stewardship, and put the truth into everyday practice.",
};

export const studentHandbookLabel: Localized<string> = { zh: "學員手冊", en: "Student Manual" };
export const leaderHandbookLabel: Localized<string> = { zh: "小組長手冊", en: "Leader's Guide" };

export const courseResources: CourseResource[] = [
  {
    title: { zh: "理財有道", en: "Biblical Financial Study" },
    description: {
      zh: "冠冕核心的聖經理財小組研習教材，已在全球九十餘國推廣使用；分學員手冊與小組長手冊。",
      en: "Crown's core biblical financial small-group curriculum, used in more than ninety countries worldwide; available as a Student Manual and a Leader's Guide.",
    },
    images: [
      { key: "crownMaterialFinancialStudent", label: studentHandbookLabel },
      { key: "crownMaterialFinancialLeader", label: leaderHandbookLabel },
    ],
  },
  {
    title: { zh: "經營有道", en: "Business by the Book" },
    description: {
      zh: "以聖經原則經營職場與事業的小組研習教材，幫助工商界基督徒在工作中榮神益人；分學員手冊與小組長手冊。",
      en: "A small-group study for running work and business by biblical principles, helping Christians in the marketplace honor God at work; available as a Student Manual and a Leader's Guide.",
    },
    images: [
      { key: "crownMaterialBusinessStudent", label: studentHandbookLabel },
      { key: "crownMaterialBusinessLeader", label: leaderHandbookLabel },
    ],
  },
];

export const smallGroupGoalsTitle: Localized<string> = {
  zh: "生命查經小組目標",
  en: "Goals of the Life-Study Small Group",
};

export const smallGroupGoals: CourseGoal[] = [
  {
    keyword: { zh: "尊榮", en: "Honor" },
    description: { zh: "神的角色和主權", en: "God's role and sovereignty" },
  },
  {
    keyword: { zh: "認識", en: "Understand" },
    description: { zh: "人的角色與責任", en: "Our role and responsibility" },
  },
  {
    keyword: { zh: "依照", en: "Follow" },
    description: { zh: "聖經的教導生活", en: "Living by the teaching of Scripture" },
  },
  {
    keyword: { zh: "活出", en: "Live out" },
    description: { zh: "永恆價值的投資", en: "Investing in what has eternal value" },
  },
];
