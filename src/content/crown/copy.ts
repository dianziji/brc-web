import type { Localized } from "@/lib/i18n";

export const crownScripture: Localized<string> = {
  zh: "耶和華啊，尊大、能力、榮耀、強勝、威嚴都是你的；凡天上地下的都是你的，國度也是你的，並且你為至高，為萬有之首。豐富尊榮都從你而來，你也治理萬物；在你手裡有大能大力，使人尊大強盛都出於你。",
  en: "Yours, Lord, is the greatness and the power and the glory and the majesty and the splendor, for everything in heaven and earth is yours. Yours, Lord, is the kingdom; you are exalted as head over all. Wealth and honor come from you; you are the ruler of all things. In your hands are strength and power to exalt and give strength to all.",
};

export const crownScriptureRef: Localized<string> = {
  zh: "歷代志上 29:11-12",
  en: "1 Chronicles 29:11-12",
};

export const crownPageCopy = {
  heroTitle: { zh: "冠冕北美華文外展事工", en: "Crown North American Chinese Outreach Ministry" },
  heroTagline: {
    zh: "讓全世界的人們學習、應用並教導上帝的財務原則，更親密地認識基督、更自由地服事祂。",
    en: "Equipping people worldwide to learn, apply, and teach God's financial principles—to know Christ more intimately and serve Him more freely.",
  },
  aboutTitle: { zh: "關於冠冕", en: "About Crown" },
  coursesTitle: { zh: "課程簡介", en: "Courses" },
  booksTitle: { zh: "冠冕好書", en: "Recommended Books" },
  assessmentTitle: { zh: "財務自由評量表", en: "Financial Freedom Assessment" },
  articlesTitle: { zh: "文章分享", en: "Articles" },
  givingTitle: { zh: "奉獻支持", en: "Giving" },

  // Landing-page section entry cards
  exploreTitle: { zh: "探索冠冕事工", en: "Explore Crown" },
  sections: {
    about: {
      title: { zh: "關於冠冕", en: "About Crown" },
      description: {
        zh: "認識冠冕的異象、使命，以及北美華文外展事工的故事。",
        en: "The vision, mission, and story of Crown's North American Chinese Outreach Ministry.",
      },
    },
    courses: {
      title: { zh: "課程簡介", en: "Courses" },
      description: {
        zh: "聖經觀生命查經小組課程與教材，與小組研習目標。",
        en: "The biblical-worldview life-study small group, its materials, and its goals.",
      },
    },
    books: {
      title: { zh: "冠冕好書", en: "Books" },
      description: {
        zh: "冠冕推薦的聖經理財好書。",
        en: "Books on biblical finance recommended by Crown.",
      },
    },
    assessment: {
      title: { zh: "財務自由評量表", en: "Financial Freedom Assessment" },
      description: {
        zh: "透過 20 道題目，檢視你在錢財上與上帝的關係。",
        en: "A 20-question self-check on your relationship with God in matters of money.",
      },
    },
    articles: {
      title: { zh: "文章分享", en: "Articles" },
      description: {
        zh: "聖經理財與管家職份的分享文章。",
        en: "Reflections on biblical finance and stewardship.",
      },
    },
  },

  // Assessment tool UI
  assessmentIntro: {
    zh: "以下是「基督徒財務自由個人評量表」。請依你的實際情況，逐題選擇「是」或「否」，完成後即可看到你的評量結果。",
    en: "Below is the Christian Financial Freedom Personal Assessment. Answer each question “Yes” or “No” based on your actual situation; your result appears when you finish.",
  },
  answerYes: { zh: "是", en: "Yes" },
  answerNo: { zh: "否", en: "No" },
  assessmentProgress: { zh: "已回答", en: "Answered" },
  assessmentScore: { zh: "「是」的總數", en: "Total “Yes” answers" },
  assessmentResultTitle: { zh: "你的評量結果", en: "Your Result" },
  assessmentReset: { zh: "重新評量", en: "Start Over" },
  assessmentIncomplete: {
    zh: "請完成全部 20 題後查看結果。",
    en: "Answer all 20 questions to see your result.",
  },

  // Giving
  givingIntro: {
    zh: "冠冕北美華文外展事工目前委託 BRC（伯特利中心）代理財務收支，包括教材費用及事工支持奉獻款。",
    en: "Crown's North American Chinese Outreach Ministry currently entrusts its finances to BRC (Bethel Renewal Center), including course materials and ministry-support gifts.",
  },
  givingCta: { zh: "前往奉獻頁面", en: "Go to the Giving Page" },

  // Generic CTAs
  learnMore: { zh: "了解更多", en: "Learn more" },
  registerCta: { zh: "冠冕課程報名表", en: "Course Registration Form" },
  visitBookstore: { zh: "前往購書", en: "Visit the Bookstore" },
  readArticle: { zh: "閱讀全文", en: "Read the article" },
  externalBlogCta: { zh: "前往外部部落格", en: "Visit external blog" },
  backToArticles: { zh: "返回文章列表", en: "Back to articles" },
  backToCrown: { zh: "返回冠冕首頁", en: "Back to Crown home" },
} as const;
