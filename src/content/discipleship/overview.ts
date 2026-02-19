type LocalizedText = {
  zh: string;
  en: string;
};

export type DiscipleshipTrackKey = "discipleship" | "equipping";

export type DiscipleshipTrackSection = {
  key: DiscipleshipTrackKey;
  title: LocalizedText;
  description: LocalizedText;
};

export type LearningPathStep = {
  title: LocalizedText;
  description: LocalizedText;
};

export const discipleshipTrackSections: DiscipleshipTrackSection[] = [
  {
    key: "discipleship",
    title: {
      zh: "A 軌：課程型門徒訓練",
      en: "Track A: Course-Based Discipleship",
    },
    description: {
      zh: "以 TEE 與聖經課程為核心，強調聖經根基、神學整合與可復制門訓。",
      en: "Centered on TEE and Bible curriculum, focused on biblical foundation, theology integration, and reproducible discipleship.",
    },
  },
  {
    key: "equipping",
    title: {
      zh: "B 軌：事奉裝備與領袖發展",
      en: "Track B: Ministry Equipping & Leadership",
    },
    description: {
      zh: "聚焦同工生命、領袖能力與外部工具，支持教會團隊持續成長。",
      en: "Focused on coworker formation, leadership growth, and external tools for sustainable ministry development.",
    },
  },
];

export const discipleshipLearningPathSteps: LearningPathStep[] = [
  {
    title: {
      zh: "核心基礎",
      en: "Core Foundation",
    },
    description: {
      zh: "基督生平",
      en: "Life of Christ",
    },
  },
  {
    title: {
      zh: "進階深化",
      en: "Advanced Formation",
    },
    description: {
      zh: "保羅生平與書信 / 摩西五經",
      en: "Paul's Life & Epistles / Pentateuch",
    },
  },
  {
    title: {
      zh: "聖經全景",
      en: "Panoramic Bible",
    },
    description: {
      zh: "伯特利聖經系列（兩年制）",
      en: "The Bethel Series (2-year track)",
    },
  },
  {
    title: {
      zh: "事奉擴展",
      en: "Ministry Multiplication",
    },
    description: {
      zh: "同工訓練 / 領袖培訓 / Zume",
      en: "Coworker / Leadership / Zume",
    },
  },
];

export const discipleshipImprovementItems: LocalizedText[] = [
  {
    zh: "為每個課程配置獨立修課報名表，不再共用同一連結。",
    en: "Use independent registration forms per course instead of one shared link.",
  },
  {
    zh: "將 under construction 臨時頁面替換為完整課程內容頁。",
    en: "Replace any temporary under-construction links with complete BRC-owned course pages.",
  },
  {
    zh: "持續補齊籌備中課程的完整中英雙語內容。",
    en: "Continue building full English content for all upcoming tracks.",
  },
  {
    zh: "在後續版本中進一步強化先修要求與課程路徑說明。",
    en: "Clarify prerequisites and pathway transitions in future revisions.",
  },
];
