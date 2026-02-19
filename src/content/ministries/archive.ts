import archiveItems from "@/data/ministryArchive.json";

export type ArchiveItem = {
  category: string;
  categoryEn?: string;
  subcategory: string;
  subcategoryEn?: string;
  title: string;
  titleEn?: string;
  date: string;
  dateEn?: string;
  summary: string;
  summaryEn?: string;
  imageUrl: string;
  videoUrl: string;
  link: string;
};

function parseDateKey(value: string): number {
  if (!value) return 0;
  const match = String(value).match(/(19|20)\d{2}/g);
  if (!match) return 0;
  const year = parseInt(match[0], 10);
  const monthMatch = String(value).match(/(0?[1-9]|1[0-2])/);
  const month = monthMatch ? parseInt(monthMatch[0], 10) : 1;
  return year * 100 + month;
}

export function getSortedArchiveItems(): ArchiveItem[] {
  return (archiveItems as ArchiveItem[]).slice().sort((a, b) => parseDateKey(b.date) - parseDateKey(a.date));
}
