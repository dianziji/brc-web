export type CalendarEventItem = {
  id: string;
  titleEn: string;
  titleZh: string;
  date: string; // YYYY-MM-DD
  time: string;
  location: string;
  image: string;
};

export const calendarEvents: CalendarEventItem[] = [
  {
    id: "event-vision-night",
    titleEn: "Vision Night",
    titleZh: "異象之夜",
    date: "2026-02-02",
    time: "7:30 PM",
    location: "Main Sanctuary",
    image: "/images/hero.jpeg",
  },
  {
    id: "event-youth-camp",
    titleEn: "Youth Camp",
    titleZh: "青年成長營",
    date: "2026-02-09",
    time: "9:00 AM",
    location: "Camp Center",
    image: "/images/hero.jpeg",
  },
  {
    id: "event-family-night",
    titleEn: "Family Night",
    titleZh: "家庭事工之夜",
    date: "2026-02-16",
    time: "6:30 PM",
    location: "Fellowship Hall",
    image: "/images/hero.jpeg",
  },
  {
    id: "event-mission-briefing",
    titleEn: "Mission Briefing",
    titleZh: "宣教分享會",
    date: "2026-02-23",
    time: "1:00 PM",
    location: "Room 201",
    image: "/images/hero.jpeg",
  },
];
