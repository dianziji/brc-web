export type ProgramStatus = "ready" | "comingSoon" | "external";

export type Program = {
  id: string;
  track: "discipleship" | "equipping";
  nameZh: string;
  nameEn: string;
  typeZh: string;
  typeEn: string;
  summaryZh: string;
  summaryEn: string;
  homeImage?: string;
  detailUrl?: string;
  applyUrl?: string;
  status: ProgramStatus;
  prereqZh?: string;
  prereqEn?: string;
};

export type DetailBlock = {
  id: string;
  titleZh: string;
  titleEn: string;
  subtitleZh: string;
  subtitleEn: string;
  purposeZh: string;
  purposeEn: string;
  targetZh: string;
  targetEn: string;
  pointsZh: string[];
  pointsEn: string[];
  scheduleZh: string[];
  scheduleEn: string[];
  referenceUrl?: string;
};

export const sharedApplyFormUrl =
  "https://forms.office.com/Pages/DesignPageV2.aspx?subpage=design&token=ff649b08589d47d0b4fb68b536f1dea9&id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAMAAL50yaRUQ1oyN01TNk5GUjNSNFVXR1lCNlBWQjcxRi4u";

export const programs: Program[] = [
  {
    id: "christ-life",
    track: "discipleship",
    nameZh: "基督生平",
    nameEn: "Life of Christ",
    typeZh: "BRC TEE 核心課程",
    typeEn: "BRC TEE Core Track",
    summaryZh:
      "以四福音至使徒行傳為主軸，系統認識基督生平五個階段，並理解聖經歷史、政治與地理背景。",
    summaryEn:
      "A structured study from the Gospels to Acts, focusing on the five stages of Christ's life with biblical historical and geographical context.",
    homeImage: "/images/christ-life.jpeg",
    detailUrl:
      "https://newbethelrc.org/%E5%9F%BA%E7%9D%A3%E7%94%9F%E5%B9%B3%E8%AF%BE%E7%A8%8B%E8%AF%A6%E6%83%85/",
    applyUrl: sharedApplyFormUrl,
    status: "ready",
  },
  {
    id: "paul-life-letters",
    track: "discipleship",
    nameZh: "保羅生平與書信",
    nameEn: "Paul's Life and Epistles",
    typeZh: "BRC TEE 進階課程",
    typeEn: "BRC TEE Advanced Track",
    summaryZh:
      "以使徒保羅宣教旅程與13卷書信為主軸，建立教義與神學基礎，裝備宣教和教導工人。",
    summaryEn:
      "An advanced track built on Paul's missionary journeys and 13 epistles, strengthening doctrine and theology for teaching and mission work.",
    homeImage: "/images/paulLetters.jpeg",
    detailUrl:
      "https://newbethelrc.org/%E4%BF%9D%E7%BD%97%E7%94%9F%E5%B9%B3%E4%B8%8E%E4%B9%A6%E4%BF%A1%E8%AF%BE%E7%A8%8B%E8%AF%A6%E6%83%85/",
    applyUrl: sharedApplyFormUrl,
    status: "ready",
    prereqZh: "建議先完成：基督生平",
    prereqEn: "Recommended prerequisite: Life of Christ",
  },
  {
    id: "bethel-series",
    track: "discipleship",
    nameZh: "伯特利聖經系列（全景聖經課程）",
    nameEn: "The Bethel Series (Panoramic Bible)",
    typeZh: "BRC 聖經系列",
    typeEn: "BRC Bible Series",
    summaryZh:
      "以全景方式連結新舊約主題，幫助學員將各卷書置於整本聖經救恩脈絡中理解。",
    summaryEn:
      "A panoramic Bible curriculum connecting Old and New Testament themes to see Scripture within God's redemptive storyline.",
    homeImage: "/images/discipleship.png",
    detailUrl:
      "https://newbethelrc.org/%E5%85%A8%E6%99%AF%E5%9C%A3%E7%BB%8F%E8%AF%BE%E7%A8%8B%E8%AF%A6%E6%83%85/",
    applyUrl: sharedApplyFormUrl,
    status: "ready",
  },
  {
    id: "pentateuch",
    track: "discipleship",
    nameZh: "摩西五經",
    nameEn: "Pentateuch",
    typeZh: "BRC TEE 進階課程",
    typeEn: "BRC TEE Advanced Track",
    summaryZh:
      "從創世記到申命記，串聯亞伯拉罕家族、出埃及與律法，建立舊約根基。",
    summaryEn:
      "A focused study from Genesis to Deuteronomy, connecting Abraham's family, Exodus, and the Law.",
    detailUrl: "https://newbethelrc.org/underconstruction/",
    applyUrl: sharedApplyFormUrl,
    status: "comingSoon",
  },
  {
    id: "zume",
    track: "equipping",
    nameZh: "天國酵母（Zume）",
    nameEn: "Zume Training",
    typeZh: "網絡訓練（外部）",
    typeEn: "External Online Training",
    summaryZh:
      "裝備信徒在當代成為門徒倍增的酵母，帶出生生不息的主門徒，推動神國擴展。",
    summaryEn:
      "An online disciple-multiplication pathway equipping believers to make reproducing disciples in everyday life.",
    detailUrl: "https://zume.training/zhcn/about/",
    status: "external",
  },
  {
    id: "coworker",
    track: "equipping",
    nameZh: "同工訓練",
    nameEn: "Coworker Training",
    typeZh: "BRC 內部訓練",
    typeEn: "BRC Internal Training",
    summaryZh:
      "不定期開設靈魂關懷讀書會、敬拜讚美研習會等，幫助同工持續成長與彼此學習。",
    summaryEn:
      "Periodic internal trainings such as soul-care reading groups and worship workshops for ongoing coworker formation.",
    detailUrl: "https://newbethelrc.org/underconstruction/",
    status: "comingSoon",
  },
  {
    id: "leadership",
    track: "equipping",
    nameZh: "領袖培訓",
    nameEn: "Leadership Development",
    typeZh: "BRC 領袖課程",
    typeEn: "BRC Leadership Track",
    summaryZh: "領袖培育課程（當前使用外部資源），用於強化異象、組織與帶領能力。",
    summaryEn:
      "Leadership development track currently linked to an external resource for vision, team, and leadership skills.",
    detailUrl: "https://www.globalleadership.org/",
    status: "external",
  },
];

export const detailBlocks: DetailBlock[] = [
  {
    id: "christ-life",
    titleZh: "TEE「基督生平」課程",
    titleEn: 'TEE "Life of Christ"',
    subtitleZh: "S.E.A.N. TEE 門徒訓練 — 核心課程",
    subtitleEn: "S.E.A.N. TEE Discipleship — Core Course",
    purposeZh:
      "教導學員更清楚認識耶穌基督和十字架救贖，成為有使命感並能清楚傳講福音的門徒。",
    purposeEn:
      "To help learners clearly know Christ and the cross, and become mission-minded disciples who can communicate the gospel clearly.",
    targetZh: "以跨文化門訓為導向，培訓當地教牧老師，更有效裝備普世宣教。",
    targetEn:
      "Cross-cultural discipleship orientation for training local pastors/teachers and equipping global mission more effectively.",
    pointsZh: [
      "系統查考四福音（以馬太福音為主軸）至使徒行傳。",
      "建立系統神學基礎：神論、人論、三位一體、救贖論、聖靈論。",
      "應用性主題聖經課程，快速訓練門徒並復制師資。",
      "簡明護教學訓練，掌握聖經統一性。",
      "整全門徒栽培課程，配合教導技巧訓練。",
    ],
    pointsEn: [
      "Systematic study from the Gospels (Matthew-centered) to Acts.",
      "Foundational theology: God, humanity, Trinity, salvation, and the Holy Spirit.",
      "Application-oriented modules for effective disciple-making and teacher multiplication.",
      "Practical apologetics with emphasis on biblical unity.",
      "Holistic discipleship formation with teaching-skills practice.",
    ],
    scheduleZh: [
      "共六冊，每冊十個單元；每周一個單元。",
      "每三個月完成一冊，完整課程約一年半（可彈性安排）。",
      "小班制（約15人），網絡或實體授課，含期中/期末測驗。",
      "成績合格頒發結業證書。",
    ],
    scheduleEn: [
      "Six volumes, ten units each; one unit per week.",
      "One volume every three months, ~18 months total (flexible schedule possible).",
      "Small class format (~15), online or in-person, with midterm/final assessments.",
      "Completion certificate for qualified learners.",
    ],
    referenceUrl: "https://teetmcc.org/course/tee/",
  },
  {
    id: "paul-life-letters",
    titleZh: "TEE「保羅生平與書信」課程",
    titleEn: 'TEE "Paul\'s Life and Epistles"',
    subtitleZh: "S.E.A.N. TEE 門徒訓練 — 進階課程",
    subtitleEn: "S.E.A.N. TEE Discipleship — Advanced Course",
    purposeZh:
      "延續核心門訓，透過保羅生平與書信建立更完整的教義與神學裝備，強化宣教與教導能力。",
    purposeEn:
      "An advanced follow-up track using Paul's life and letters to deepen doctrine/theology and strengthen mission and teaching capacity.",
    targetZh: "以宣教與傳福音使命為定位，培養可教導、可差派、可復制的工人。",
    targetEn:
      "Mission and evangelism oriented, forming workers who can teach, be sent, and multiply.",
    pointsZh: [
      "系統查考保羅宣教旅程、被囚與殉道，以及相關13卷書信。",
      "深度探討保羅生命轉化與呼召。",
      "建立神論、聖靈論、救恩論、基督論、教會論、末世論框架。",
      "連接基督與教會關系，落實恩典時代信徒生活。",
    ],
    pointsEn: [
      "Systematic study of Paul's journeys, imprisonment/martyrdom, and 13 epistles.",
      "In-depth exploration of Paul's transformation and calling.",
      "Solid doctrinal framework: theology proper, pneumatology, soteriology, Christology, ecclesiology, eschatology.",
      "Application to Christian life and church identity in the age of grace.",
    ],
    scheduleZh: [
      "共3冊，30課，每冊期末考。",
      "每周一課（90分鐘），約9個月完成（可彈性安排）。",
      "學員課前自學並完成練習，課堂強調討論與分享。",
      "成績合格頒發結業證書。",
    ],
    scheduleEn: [
      "3 volumes, 30 lessons total, with end-of-volume exams.",
      "One 90-minute lesson per week, around 9 months (flexible pacing available).",
      "Pre-class self-study and exercises; class focuses on discussion and sharing.",
      "Completion certificate for qualified learners.",
    ],
  },
  {
    id: "bethel-series",
    titleZh: "《全景聖經課程》",
    titleEn: "The Bethel Series (Panoramic Bible)",
    subtitleZh: "BRC 聖經系列新舊約課程",
    subtitleEn: "BRC Old/New Testament Bible Series",
    purposeZh:
      "提供一套全面且嚴謹的福音派研經課程，幫助學員以全景方式連結整本聖經。",
    purposeEn:
      "A comprehensive evangelical Bible curriculum helping learners connect all parts of Scripture through a panoramic framework.",
    targetZh:
      "學員修畢後可將聖經各卷與整本聖經主題聯繫，並參與教會成人主日學及小組帶領。",
    targetEn:
      "After completion, learners can connect each biblical part to the whole and serve in adult teaching and small-group leadership.",
    pointsZh: [
      "舊約+新約共40課，兩年制訓練（約2.5小時/課）。",
      "強調“像希伯來人那樣思考”，建立救恩歷史框架。",
      "圖文並茂、內容嚴謹，兼顧神學深度與教學可用性。",
      "全球多語言、多教會採用，長期實踐驗證。",
    ],
    pointsEn: [
      "40 lessons across OT/NT, two-year track (~2.5 hours per lesson).",
      'Emphasizes "thinking like Hebrews" and redemptive-history integration.',
      "Rich visual + structured content for both theological depth and teaching usability.",
      "Widely adopted globally with long-term practical validation.",
    ],
    scheduleZh: [
      "兩年課程，每課含小測驗與作業。",
      "完成全套學習後可承擔成人主日學老師、團契同工或小組負責人。",
    ],
    scheduleEn: [
      "Two-year curriculum, each lesson includes quiz and assignments.",
      "Completers can serve as adult Sunday school teachers, fellowship coworkers, or small-group leaders.",
    ],
  },
];

export function findProgramById(id: string): Program | undefined {
  return programs.find((item) => item.id === id);
}

export function findDetailById(id: string): DetailBlock | undefined {
  return detailBlocks.find((item) => item.id === id);
}

export function hasLocalDetail(id: string): boolean {
  return detailBlocks.some((item) => item.id === id);
}

export function getFeaturedDiscipleshipPrograms(limit = 3): Program[] {
  return programs
    .filter((item) => item.track === "discipleship" && item.status === "ready")
    .slice(0, limit);
}
