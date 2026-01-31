import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "연차/수당 계산기 엑셀 다운로드 | 무료 온라인 계산기",
  description: "연차와 수당을 쉽게 계산하고 엑셀 파일로 다운로드하세요. 무료 온라인 연차계산기, 수당계산기로 근로기준법에 따른 정확한 계산을 제공합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2695727848475573"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
