import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "대동밥지도",
  description: "한국의 식당 정보 기반의 커뮤니티",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
