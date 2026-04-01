// app/layout.tsx (丸ごと上書き)
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OS.Alignment",
  description: "組織OS - Notion-like Builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {/* Google Fontsの読み込み設定を追加 */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+JP:wght@400;500;700;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
