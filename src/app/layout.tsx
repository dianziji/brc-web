import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BRC",
  description: "BRC website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

