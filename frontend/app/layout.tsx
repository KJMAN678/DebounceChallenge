import type { Metadata } from "next";

import "./globals.css";



export const metadata: Metadata = {
  title: "Debouncing比較デモ",
  description: "検索機能におけるdebouncingの効果を比較するデモアプリケーション",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
