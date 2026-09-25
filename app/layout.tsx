import type { Metadata } from "next";
// @ts-expect-error CSS side-effect imports are processed by Next.js.
import "./globals.css";

export const metadata: Metadata = {
  title: "Dashboard Siswa & Absensi",
  description: "Dashboard interaktif data siswa dan log absensi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}