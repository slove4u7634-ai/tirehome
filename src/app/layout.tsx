import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "타이어투데이 | 프리미엄 타이어 전문 쇼핑몰",
  description: "최고의 품질과 서비스로 안전한 드라이빙을 약속합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.className} flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans antialiased pb-16 md:pb-0`}>
        <Header />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}
