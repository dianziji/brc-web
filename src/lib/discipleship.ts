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
    typeZh: "BRC TEE 核心课程",
    typeEn: "BRC TEE Core Track",
    summaryZh:
      "以四福音至使徒行传为主轴，系统认识基督生平五个阶段，并理解圣经历史、政治与地理背景。",
    summaryEn:
      "A structured study from the Gospels to Acts, focusing on the five stages of Christ's life with biblical historical and geographical context.",
    detailUrl:
      "https://newbethelrc.org/%E5%9F%BA%E7%9D%A3%E7%94%9F%E5%B9%B3%E8%AF%BE%E7%A8%8B%E8%AF%A6%E6%83%85/",
    applyUrl: sharedApplyFormUrl,
    status: "ready",
  },
  {
    id: "paul-life-letters",
    track: "discipleship",
    nameZh: "保罗生平与书信",
    nameEn: "Paul's Life and Epistles",
    typeZh: "BRC TEE 进阶课程",
    typeEn: "BRC TEE Advanced Track",
    summaryZh:
      "以使徒保罗宣教旅程与13卷书信为主轴，建立教义与神学基础，装备宣教和教导工人。",
    summaryEn:
      "An advanced track built on Paul's missionary journeys and 13 epistles, strengthening doctrine and theology for teaching and mission work.",
    detailUrl:
      "https://newbethelrc.org/%E4%BF%9D%E7%BD%97%E7%94%9F%E5%B9%B3%E4%B8%8E%E4%B9%A6%E4%BF%A1%E8%AF%BE%E7%A8%8B%E8%AF%A6%E6%83%85/",
    applyUrl: sharedApplyFormUrl,
    status: "ready",
    prereqZh: "建议先完成：基督生平",
    prereqEn: "Recommended prerequisite: Life of Christ",
  },
  {
    id: "bethel-series",
    track: "discipleship",
    nameZh: "伯特利圣经系列（全景圣经课程）",
    nameEn: "The Bethel Series (Panoramic Bible)",
    typeZh: "BRC 圣经系列",
    typeEn: "BRC Bible Series",
    summaryZh:
      "以全景方式连结新旧约主题，帮助学员将各卷书置于整本圣经救恩脉络中理解。",
    summaryEn:
      "A panoramic Bible curriculum connecting Old and New Testament themes to see Scripture within God's redemptive storyline.",
    detailUrl:
      "https://newbethelrc.org/%E5%85%A8%E6%99%AF%E5%9C%A3%E7%BB%8F%E8%AF%BE%E7%A8%8B%E8%AF%A6%E6%83%85/",
    applyUrl: sharedApplyFormUrl,
    status: "ready",
  },
  {
    id: "pentateuch",
    track: "discipleship",
    nameZh: "摩西五经",
    nameEn: "Pentateuch",
    typeZh: "BRC TEE 进阶课程",
    typeEn: "BRC TEE Advanced Track",
    summaryZh:
      "从创世记到申命记，串联亚伯拉罕家族、出埃及与律法，建立旧约根基。",
    summaryEn:
      "A focused study from Genesis to Deuteronomy, connecting Abraham's family, Exodus, and the Law.",
    detailUrl: "https://newbethelrc.org/underconstruction/",
    applyUrl: sharedApplyFormUrl,
    status: "comingSoon",
  },
  {
    id: "zume",
    track: "equipping",
    nameZh: "天国酵母（Zume）",
    nameEn: "Zume Training",
    typeZh: "网络训练（外部）",
    typeEn: "External Online Training",
    summaryZh:
      "装备信徒在当代成为门徒倍增的酵母，带出生生不息的主门徒，推动神国扩展。",
    summaryEn:
      "An online disciple-multiplication pathway equipping believers to make reproducing disciples in everyday life.",
    detailUrl: "https://zume.training/zhcn/about/",
    status: "external",
  },
  {
    id: "coworker",
    track: "equipping",
    nameZh: "同工训练",
    nameEn: "Coworker Training",
    typeZh: "BRC 内部训练",
    typeEn: "BRC Internal Training",
    summaryZh:
      "不定期开设灵魂关怀读书会、敬拜赞美研习会等，帮助同工持续成长与彼此学习。",
    summaryEn:
      "Periodic internal trainings such as soul-care reading groups and worship workshops for ongoing coworker formation.",
    detailUrl: "https://newbethelrc.org/underconstruction/",
    status: "comingSoon",
  },
  {
    id: "leadership",
    track: "equipping",
    nameZh: "领袖培训",
    nameEn: "Leadership Development",
    typeZh: "BRC 领袖课程",
    typeEn: "BRC Leadership Track",
    summaryZh: "领袖培育课程（当前使用外部资源），用于强化异象、组织与带领能力。",
    summaryEn:
      "Leadership development track currently linked to an external resource for vision, team, and leadership skills.",
    detailUrl: "https://www.globalleadership.org/",
    status: "external",
  },
];

export const detailBlocks: DetailBlock[] = [
  {
    id: "christ-life",
    titleZh: "TEE「基督生平」课程",
    titleEn: 'TEE "Life of Christ"',
    subtitleZh: "S.E.A.N. TEE 门徒训练 — 核心课程",
    subtitleEn: "S.E.A.N. TEE Discipleship — Core Course",
    purposeZh:
      "教导学员更清楚认识耶稣基督和十字架救赎，成为有使命感并能清楚传讲福音的门徒。",
    purposeEn:
      "To help learners clearly know Christ and the cross, and become mission-minded disciples who can communicate the gospel clearly.",
    targetZh: "以跨文化门训为导向，培训当地教牧老师，更有效装备普世宣教。",
    targetEn:
      "Cross-cultural discipleship orientation for training local pastors/teachers and equipping global mission more effectively.",
    pointsZh: [
      "系统查考四福音（以马太福音为主轴）至使徒行传。",
      "建立系统神学基础：神论、人论、三位一体、救赎论、圣灵论。",
      "应用性主题圣经课程，快速训练门徒并复制师资。",
      "简明护教学训练，掌握圣经统一性。",
      "整全门徒栽培课程，配合教导技巧训练。",
    ],
    pointsEn: [
      "Systematic study from the Gospels (Matthew-centered) to Acts.",
      "Foundational theology: God, humanity, Trinity, salvation, and the Holy Spirit.",
      "Application-oriented modules for effective disciple-making and teacher multiplication.",
      "Practical apologetics with emphasis on biblical unity.",
      "Holistic discipleship formation with teaching-skills practice.",
    ],
    scheduleZh: [
      "共六册，每册十个单元；每周一个单元。",
      "每三个月完成一册，完整课程约一年半（可弹性安排）。",
      "小班制（约15人），网络或实体授课，含期中/期末测验。",
      "成绩合格颁发结业证书。",
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
    titleZh: "TEE「保罗生平与书信」课程",
    titleEn: 'TEE "Paul\'s Life and Epistles"',
    subtitleZh: "S.E.A.N. TEE 门徒训练 — 进阶课程",
    subtitleEn: "S.E.A.N. TEE Discipleship — Advanced Course",
    purposeZh:
      "延续核心门训，透过保罗生平与书信建立更完整的教义与神学装备，强化宣教与教导能力。",
    purposeEn:
      "An advanced follow-up track using Paul's life and letters to deepen doctrine/theology and strengthen mission and teaching capacity.",
    targetZh: "以宣教与传福音使命为定位，培养可教导、可差派、可复制的工人。",
    targetEn:
      "Mission and evangelism oriented, forming workers who can teach, be sent, and multiply.",
    pointsZh: [
      "系统查考保罗宣教旅程、被囚与殉道，以及相关13卷书信。",
      "深度探讨保罗生命转化与呼召。",
      "建立神论、圣灵论、救恩论、基督论、教会论、末世论框架。",
      "连接基督与教会关系，落实恩典时代信徒生活。",
    ],
    pointsEn: [
      "Systematic study of Paul's journeys, imprisonment/martyrdom, and 13 epistles.",
      "In-depth exploration of Paul's transformation and calling.",
      "Solid doctrinal framework: theology proper, pneumatology, soteriology, Christology, ecclesiology, eschatology.",
      "Application to Christian life and church identity in the age of grace.",
    ],
    scheduleZh: [
      "共3册，30课，每册期末考。",
      "每周一课（90分钟），约9个月完成（可弹性安排）。",
      "学员课前自学并完成练习，课堂强调讨论与分享。",
      "成绩合格颁发结业证书。",
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
    titleZh: "《全景圣经课程》",
    titleEn: "The Bethel Series (Panoramic Bible)",
    subtitleZh: "BRC 圣经系列新旧约课程",
    subtitleEn: "BRC Old/New Testament Bible Series",
    purposeZh:
      "提供一套全面且严谨的福音派研经课程，帮助学员以全景方式连结整本圣经。",
    purposeEn:
      "A comprehensive evangelical Bible curriculum helping learners connect all parts of Scripture through a panoramic framework.",
    targetZh:
      "学员修毕后可将圣经各卷与整本圣经主题联系，并参与教会成人主日学及小组带领。",
    targetEn:
      "After completion, learners can connect each biblical part to the whole and serve in adult teaching and small-group leadership.",
    pointsZh: [
      "旧约+新约共40课，两年制训练（约2.5小时/课）。",
      "强调“像希伯来人那样思考”，建立救恩历史框架。",
      "图文并茂、内容严谨，兼顾神学深度与教学可用性。",
      "全球多语言、多教会采用，长期实践验证。",
    ],
    pointsEn: [
      "40 lessons across OT/NT, two-year track (~2.5 hours per lesson).",
      'Emphasizes "thinking like Hebrews" and redemptive-history integration.',
      "Rich visual + structured content for both theological depth and teaching usability.",
      "Widely adopted globally with long-term practical validation.",
    ],
    scheduleZh: [
      "两年课程，每课含小测验与作业。",
      "完成全套学习后可承担成人主日学老师、团契同工或小组负责人。",
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
