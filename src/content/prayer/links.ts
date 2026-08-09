export type PrayerCardSecondaryLinkField = "cta2" | "cta3" | "cta4" | "cta5";

export type PrayerCardLinkConfig = {
  primaryHref: string;
  secondary: Array<{
    href: string;
    labelField: PrayerCardSecondaryLinkField;
  }>;
};

export const PRAYER_MORNING_PDF_URL =
  "https://archive.bethelrc.org/images/stories/feature/MP/%E5%A6%82%E4%BD%95%E5%8A%A0%E5%85%A5BRC%E6%99%A8%E7%A6%B1ZoomMeeting.pdf";

export const PRAYER_WEEKLY_SHARING_DOC_URL =
  "https://docs.google.com/document/d/10o7j7-wkujRHFk2_nz_W8V8aVXOnRbagzTUDS_oEDSc/edit?usp=sharing";

export const PRAYER_CARD_LINK_CONFIG: PrayerCardLinkConfig[] = [
  {
    primaryHref: "https://us06web.zoom.us/j/88081177356?pwd=txHMfslJe9WPc4laR8eAm7NnGOnk5V.1",
    secondary: [
      { href: "https://archive.bethelrc.org/index.php/9-feature/312-24x7-prayer", labelField: "cta2" },
      {
        href: "https://docs.google.com/spreadsheets/d/1bHV9o1poaXOmpEF5rai40jMv30KphtcB/edit?gid=1236658947#gid=1236658947",
        labelField: "cta3",
      },
    ],
  },
  {
    primaryHref: "https://zoom.us/j/561386692?pwd=T0dWYi9HMFZMSUZ0SzJ6bld6cFJIUT09",
    secondary: [],
  },
  {
    primaryHref: "https://zoom.us/j/561386692?pwd=T0dWYi9HMFZMSUZ0SzJ6bld6cFJIUT09",
    secondary: [],
  },
  {
    primaryHref: "",
    secondary: [
      {
        href: "https://docs.google.com/document/d/1_OMA3jncsX-jnq6yglOUexxawwuaqrfSLQ0kh_keDrY/edit?usp=sharing",
        labelField: "cta2",
      },
    ],
  },
];
