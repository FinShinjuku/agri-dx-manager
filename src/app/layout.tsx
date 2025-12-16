import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "スプラウト生産管理システム | Sprout DX Manager",
  description: "豆苗農家のための発注・在庫・生産管理システム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.variable} font-sans antialiased bg-gray-50`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
