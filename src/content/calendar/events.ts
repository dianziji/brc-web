export type EventLifecycleStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "REG_OPEN"
  | "REG_CLOSED"
  | "LIVE"
  | "ENDED"
  | "ARCHIVED";

export type EventRegistrationMode = "external" | "internal";

export type EventPaymentMode = "none" | "fee" | "donation";

export type CalendarEventItem = {
  id: string;
  titleEn: string;
  titleZh: string;
  summaryEn?: string;
  summaryZh?: string;
  date: string; // YYYY-MM-DD
  time: string;
  location: string;
  image: string;
  startAt?: string;
  endAt?: string;
  archiveAt?: string;
  lifecycleStatus?: EventLifecycleStatus;
  registrationMode?: EventRegistrationMode;
  registrationUrl?: string;
  paymentMode?: EventPaymentMode;
  paymentAmount?: number;
  donationLink?: string;
  donationPurposeCode?: string;
  primaryMinistrySlug?: string;
  relatedMinistrySlugs?: string[];
};

export const calendarEvents: CalendarEventItem[] = [
  {
    id: "event-vision-night",
    titleEn: "Vision Night",
    titleZh: "異象之夜",
    summaryEn: "A yearly vision-sharing gathering with worship and prayer for the new season.",
    summaryZh: "年度異象分享聚會，包含敬拜與禱告，為新季節同心尋求。",
    date: "2026-02-02",
    time: "7:30 PM",
    location: "Main Sanctuary",
    image: "/images/hero.jpeg",
    lifecycleStatus: "REG_OPEN",
    registrationMode: "external",
    registrationUrl: "https://newbethelrc.org",
    donationLink: "/zh/donation",
    donationPurposeCode: "donation_vision_night_2026",
    primaryMinistrySlug: "family",
    relatedMinistrySlugs: ["missions"],
  },
  {
    id: "event-young-adult-camp",
    titleEn: "Young Adult Camp",
    titleZh: "青年成長營",
    summaryEn: "Three-day young adult discipleship camp focused on identity, calling, and mission.",
    summaryZh: "三天青年門訓營，聚焦身份、呼召與使命。",
    date: "2026-02-09",
    time: "9:00 AM",
    location: "Camp Center",
    image: "/images/hero.jpeg",
    lifecycleStatus: "REG_OPEN",
    registrationMode: "external",
    registrationUrl: "https://newbethelrc.org",
    donationLink: "/zh/donation",
    donationPurposeCode: "donation_young_adult_camp_2026",
    primaryMinistrySlug: "young-adult",
  },
  {
    id: "event-family-night",
    titleEn: "Family Night",
    titleZh: "家庭事工之夜",
    summaryEn: "An evening for family worship, testimony sharing, and ministry updates.",
    summaryZh: "家庭敬拜、見證分享與事工更新交流之夜。",
    date: "2026-02-16",
    time: "6:30 PM",
    location: "Fellowship Hall",
    image: "/images/hero.jpeg",
    lifecycleStatus: "PUBLISHED",
    registrationMode: "external",
    registrationUrl: "https://newbethelrc.org",
    donationLink: "/zh/donation",
    donationPurposeCode: "donation_family_night_2026",
    primaryMinistrySlug: "family",
  },
  {
    id: "event-mission-briefing",
    titleEn: "Mission Briefing",
    titleZh: "宣教分享會",
    summaryEn: "Mission updates, partner stories, and practical ways to serve in upcoming trips.",
    summaryZh: "宣教近況、夥伴見證與未來短宣參與說明。",
    date: "2026-02-23",
    time: "1:00 PM",
    location: "Room 201",
    image: "/images/hero.jpeg",
    lifecycleStatus: "PUBLISHED",
    registrationMode: "external",
    registrationUrl: "https://newbethelrc.org",
    donationLink: "/zh/donation",
    donationPurposeCode: "donation_mission_briefing_2026",
    primaryMinistrySlug: "missions",
  },
  {
    id: "event-chista-summit-2025",
    titleEn: "CHISTA Student Summit 2025",
    titleZh: "CHISTA 學生峰會 2025",
    summaryEn: "Student leader summit recap and testimonies from the summer outreach season.",
    summaryZh: "學生領袖峰會回顧，分享暑期外展成果與見證。",
    date: "2025-06-15",
    time: "10:00 AM",
    location: "BRC Main Hall",
    image: "/images/hero.jpeg",
    lifecycleStatus: "ARCHIVED",
    archiveAt: "2025-06-30T00:00:00-04:00",
    registrationMode: "external",
    registrationUrl: "https://newbethelrc.org",
    donationLink: "/zh/donation",
    donationPurposeCode: "donation_chista_summit_2025",
    primaryMinistrySlug: "chista",
    relatedMinistrySlugs: ["young-adult"],
  },
];
