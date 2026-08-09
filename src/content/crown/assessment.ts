import type { Localized } from "@/lib/i18n";

export type AssessmentQuestion = {
  id: number;
  question: Localized<string>;
  reference: Localized<string>;
};

export type AssessmentBand = {
  key: "freedom" | "crisis" | "confusion" | "bondage";
  min: number;
  max: number;
  label: Localized<string>;
  description: Localized<string>;
};

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 1,
    question: {
      zh: "今天早晨，你是否有意識地向上帝詢問了今天需要做的事？",
      en: "This morning, did you consciously ask God about what you needed to do today?",
    },
    reference: { zh: "馬太福音 6:9-15", en: "Matthew 6:9-15" },
  },
  {
    id: 2,
    question: {
      zh: "你能列出上帝對錢財的三項基本目的嗎？",
      en: "Can you list God's three basic purposes for money?",
    },
    reference: {
      zh: "提摩太前書 6:8、瑪拉基書 3:10、哥林多後書 8:14-15",
      en: "1 Timothy 6:8; Malachi 3:10; 2 Corinthians 8:14-15",
    },
  },
  {
    id: 3,
    question: {
      zh: "一個人是否需要更多周密計畫和辛勤工作才能變得富有？",
      en: "Does a person need more careful planning and hard work in order to become wealthy?",
    },
    reference: { zh: "申命記 8:18", en: "Deuteronomy 8:18" },
  },
  {
    id: 4,
    question: {
      zh: "自從前次金融危機以來，你對上帝聖言的研究有所增加嗎？",
      en: "Since the last financial crisis, has your study of God's Word increased?",
    },
    reference: { zh: "哈該書 1:9", en: "Haggai 1:9" },
  },
  {
    id: 5,
    question: {
      zh: "你是否曾因為拒絕妥協而失去了金錢、升遷、工作或朋友？",
      en: "Have you ever lost money, a promotion, a job, or friends because you refused to compromise?",
    },
    reference: { zh: "箴言 29:25", en: "Proverbs 29:25" },
  },
  {
    id: 6,
    question: {
      zh: "你是否一直堅持將你收入的十分之一奉獻給教會和宣教事工？",
      en: "Have you consistently given a tenth of your income to the church and to mission work?",
    },
    reference: { zh: "瑪拉基書 3:10", en: "Malachi 3:10" },
  },
  {
    id: 7,
    question: {
      zh: "你是否已經償還所有債務？",
      en: "Have you paid off all your debts?",
    },
    reference: { zh: "羅馬書 13:8", en: "Romans 13:8" },
  },
  {
    id: 8,
    question: {
      zh: "得勝的基督徒是否仍可能遭受財務上的需要或難處？",
      en: "Can a victorious Christian still experience financial need or hardship?",
    },
    reference: { zh: "腓立比書 4:12", en: "Philippians 4:12" },
  },
  {
    id: 9,
    question: {
      zh: "閱讀銷售目錄時，你是否總是在研究產品之前比較價格？",
      en: "When reading a sales catalog, do you always compare prices before studying a product?",
    },
    reference: { zh: "路加福音 14:28", en: "Luke 14:28" },
  },
  {
    id: 10,
    question: {
      zh: "如果有人為你提供一個快速合法賺錢的方法，你會拒絕嗎？",
      en: "If someone offered you a quick, legal way to make money, would you decline it?",
    },
    reference: { zh: "箴言 28:22", en: "Proverbs 28:22" },
  },
  {
    id: 11,
    question: {
      zh: "你是否曾經研究過消費者指南或消費者報告中的項目？",
      en: "Have you ever researched an item in a consumer guide or consumer report?",
    },
    reference: { zh: "箴言 14:15", en: "Proverbs 14:15" },
  },
  {
    id: 12,
    question: {
      zh: "你是否將所有的支出做準確的記錄？",
      en: "Do you keep accurate records of all your expenses?",
    },
    reference: { zh: "哥林多前書 4:2", en: "1 Corinthians 4:2" },
  },
  {
    id: 13,
    question: {
      zh: "你是否拒絕為任何人簽字擔保？",
      en: "Do you refuse to co-sign (guarantee a loan) for anyone?",
    },
    reference: { zh: "箴言 6:1-2", en: "Proverbs 6:1-2" },
  },
  {
    id: 14,
    question: {
      zh: "你是否相信一位全職母親比外出工作的職業婦女對家庭經濟貢獻更大？",
      en: "Do you believe a full-time mother contributes more to the family economy than a working career woman?",
    },
    reference: { zh: "箴言 31:10-31", en: "Proverbs 31:10-31" },
  },
  {
    id: 15,
    question: {
      zh: "你是否曾經遵守過口頭承諾，縱然必須付出高昂的代價？",
      en: "Have you ever kept a verbal promise even when it cost you dearly?",
    },
    reference: { zh: "詩篇 15:4", en: "Psalm 15:4" },
  },
  {
    id: 16,
    question: {
      zh: "在你的回憶中，你能舉出三個你收到的金錢、商品或服務，是神回應你特別禱告的例子嗎？",
      en: "Can you recall three examples of money, goods, or services you received as God's answer to a specific prayer?",
    },
    reference: { zh: "約翰福音 16:24", en: "John 16:24" },
  },
  {
    id: 17,
    question: {
      zh: "你是否曾避免過與人有商業夥伴的關係，尤其是平等的合作夥伴關係？",
      en: "Have you avoided business partnerships with others, especially equal partnerships?",
    },
    reference: { zh: "馬太福音 6:24", en: "Matthew 6:24" },
  },
  {
    id: 18,
    question: {
      zh: "一個人只要身體健全健康，工作到退休年齡以上是否明智？",
      en: "Is it wise for a person in good health to keep working beyond retirement age?",
    },
    reference: { zh: "路加福音 12:19-20", en: "Luke 12:19-20" },
  },
  {
    id: 19,
    question: {
      zh: "你是否曾經因為聽了妻子的建言而避免了不明智的商業或經濟活動？",
      en: "Have you ever avoided an unwise business or financial venture because you listened to your wife's advice?",
    },
    reference: { zh: "箴言 31:11、26", en: "Proverbs 31:11, 26" },
  },
  {
    id: 20,
    question: {
      zh: "你是否曾經有過大筆奉獻給上帝的事？",
      en: "Have you ever made a large gift to God?",
    },
    reference: { zh: "馬太福音 6:19-20", en: "Matthew 6:19-20" },
  },
];

export const assessmentBands: AssessmentBand[] = [
  {
    key: "freedom",
    min: 20,
    max: 20,
    label: { zh: "財務自由", en: "Financial Freedom" },
    description: {
      zh: "你在財務上以上帝為中心，忠心作管家。願你持守真理，繼續在錢財上敬畏神、愛人如己。",
      en: "You are God-centered in your finances and a faithful steward. Keep holding to the truth—continuing to honor God and love others through the way you handle money.",
    },
  },
  {
    key: "crisis",
    min: 15,
    max: 19,
    label: { zh: "財務危機", en: "Financial Crisis" },
    description: {
      zh: "你已建立不少合乎聖經的理財習慣，但仍有需要調整之處。求神幫助你在軟弱的環節上重新校正。",
      en: "You have built many biblical financial habits, but some areas still need adjustment. Ask God to help you realign where you are weak.",
    },
  },
  {
    key: "confusion",
    min: 10,
    max: 14,
    label: { zh: "財務混亂", en: "Financial Confusion" },
    description: {
      zh: "你的財務原則尚未清晰，容易受環境與慾望牽動。建議透過聖經理財課程與小組，建立穩固的管家根基。",
      en: "Your financial principles are not yet clear, and you can be swayed by circumstances and desires. Consider a biblical finance course and small group to build a firm stewardship foundation.",
    },
  },
  {
    key: "bondage",
    min: 0,
    max: 9,
    label: { zh: "財務束縛", en: "Financial Bondage" },
    description: {
      zh: "錢財可能正捆綁著你的生活與心。這是恩典的邀請——回到上帝面前，學習以祂的話語重整你的財務。",
      en: "Money may be holding your life and heart in bondage. This is an invitation of grace—return to God and learn to reorder your finances by His Word.",
    },
  },
];

export function bandForScore(score: number): AssessmentBand {
  return (
    assessmentBands.find((band) => score >= band.min && score <= band.max) ??
    assessmentBands[assessmentBands.length - 1]
  );
}
