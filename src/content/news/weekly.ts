/**
 * 每週固定聚會。
 *
 * These are recurring gatherings with no single date, so they cannot be modelled
 * by `CalendarEventItem` (which requires `date`). They live here until the CMS
 * gains a `recurrenceRule` field on `eventFields`; at that point this file
 * becomes the fallback and `src/lib/news.ts` reads the CMS values instead.
 */
export type WeeklyMeeting = {
  id: string;
  /** Short cadence label rendered in the badge, e.g. "每週二" / "Tuesdays". */
  cadenceZh: string;
  cadenceEn: string;
  /** 0 = Sunday. Omit for gatherings with no fixed weekday (e.g. 24/7 watches). */
  weekday?: number;
  /** Local start time, already formatted for display. Empty when round-the-clock. */
  time: string;
  titleZh: string;
  titleEn: string;
  locationZh: string;
  locationEn: string;
};

export const weeklyMeetings: WeeklyMeeting[] = [
  {
    id: "brcprayernight",
    cadenceZh: "每週二",
    cadenceEn: "Tuesdays",
    weekday: 2,
    time: "20:00 EST",
    titleZh: "BRC 晚禱會",
    titleEn: "BRC Prayer Night",
    locationZh: "線上",
    locationEn: "Online",
  },
  {
    id: "247fireprayermeeting",
    cadenceZh: "24/7",
    cadenceEn: "24/7",
    time: "",
    titleZh: "247 烈火禱告會",
    titleEn: "247 Fire Prayer Meeting",
    locationZh: "輪班守望 · 可認領時段",
    locationEn: "Rotating watch · sign up for a slot",
  },
  {
    id: "brcprayer-worship-and-praise-altar",
    cadenceZh: "每週",
    cadenceEn: "Weekly",
    time: "",
    titleZh: "BRC 禱告敬拜讚美祭壇",
    titleEn: "BRC Prayer, Worship and Praise Altar",
    locationZh: "主堂",
    locationEn: "Main Sanctuary",
  },
];
