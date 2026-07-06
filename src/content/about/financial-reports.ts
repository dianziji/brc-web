export type FinancialReportItem = {
  year: number;
  titleZh: string | null;
  titleEn: string | null;
  pdfUrl: string;
};

// Phase 1: hardcoded list. Phase 2 replaces this with a WP-backed fetch
// (getFinancialReportsListSafeResult) returning the same FinancialReportItem shape,
// so the About page section does not change. See the plan / docs for the CMS upgrade.
export const FINANCIAL_REPORTS: FinancialReportItem[] = [
  {
    year: 2024,
    titleZh: "BRC 2024 Financial Statements",
    titleEn: "BRC 2024 Financial Statements",
    pdfUrl:
      "https://cms.bethelrc.org/wp-content/uploads/2026/07/2024-BRC-compilation-v2-signed.pdf",
  },
];
