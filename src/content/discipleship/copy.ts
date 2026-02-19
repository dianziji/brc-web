import type { Localized } from "@/lib/i18n";

export const discipleshipStatusLabels: Record<"ready" | "comingSoon" | "external", Localized<string>> = {
  ready: { zh: "開放中", en: "Open" },
  comingSoon: { zh: "籌備中", en: "Coming Soon" },
  external: { zh: "外部資源", en: "External" },
};

export const discipleshipPageCopy = {
  heroTitle: { zh: "門徒訓練", en: "Discipleship & Training" },
  heroBody: {
    zh: "以系統聖經學習與門訓實踐為核心，裝備信徒靈命成長、教導服事與宣教使命。",
    en: "Structured Bible and discipleship tracks for spiritual formation, teaching readiness, and mission practice.",
  },
  openPrograms: { zh: "開放課程", en: "Open Programs" },
  comingSoonPrograms: { zh: "籌備中課程", en: "Coming Soon" },
  externalTracks: { zh: "外部資源課程", en: "External Tracks" },
  registrationFormTitle: { zh: "報名表狀態說明", en: "Registration Form Status" },
  registrationFormBody: {
    zh: "當前核心課程共用同一個 Microsoft Forms 連結，且連結形態為設計模式 URL。建議僅作過渡使用，並盡快替換為學員填寫版表單。",
    en: "Current core tracks share one Microsoft Forms link and the URL appears to be in design mode. Keep using it only as a temporary placeholder before replacing with learner-facing forms.",
  },
  twoTrackTitle: { zh: "雙軌道訓練結構", en: "Two-Track Structure" },
  twoTrackBody: {
    zh: "保留舊站原有的兩條邏輯並做清晰呈現：A 軌為課程型門訓，B 軌為同工/領袖與外部裝備。",
    en: "Retaining the original page logic with a clearer display: Track A is course-based discipleship, Track B is ministry equipping and leadership formation.",
  },
  courseDetailsCta: { zh: "課程詳情", en: "Course details" },
  externalLinkCta: { zh: "外部連結", en: "External link" },
  applyCta: { zh: "填寫修課意向表（共用）", en: "Apply (shared form)" },
  learningPathTitle: { zh: "學習路徑", en: "Learning Path" },
  improvementTitle: { zh: "當前可優化項", en: "Current Gaps to Improve" },
  supportTitle: { zh: "需要報名協助？", en: "Need Enrollment Support?" },
  supportBody: {
    zh: "若你不確定從哪一門開始，歡迎聯繫訓練團隊進行課程建議與分流。",
    en: "If you are unsure which track to start with, contact the training team for placement guidance.",
  },
  contactCta: { zh: "聯繫我們", en: "Contact Us" },
} as const;

export const discipleshipDetailPageCopy = {
  backToDiscipleship: { zh: "← 返回門徒訓練", en: "← Back to Discipleship" },
  purposeTitle: { zh: "課程宗旨", en: "Purpose" },
  goalTitle: { zh: "培養目標", en: "Goal" },
  learningContentTitle: { zh: "學習內容", en: "Learning Content" },
  scheduleTitle: { zh: "課程安排", en: "Schedule & Format" },
  applyCta: { zh: "填寫修課意向表（共用）", en: "Apply (shared form)" },
  externalReferenceCta: { zh: "外部參考資料", en: "External reference" },
} as const;

export function discipleshipLearningStepLabel(step: number): Localized<string> {
  return {
    zh: `階段 ${step}`,
    en: `Step ${step}`,
  };
}
