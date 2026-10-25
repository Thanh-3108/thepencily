import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const poppins = Plus_Jakarta_Sans({
  variable: "--font-poppins",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Pencily",
  description:
    "A student-led peer-learning community built by students, for students. Nền tảng học tập đồng đẳng do học sinh khởi xướng.",
  keywords: [
    "The Pencily",
    "Peer Learning",
    "Học sinh",
    "Tutor",
    "Study Group",
    "Schoolhouse",
    "Cộng đồng học tập",
  ],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/brand/app_icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

import { PencilyProvider } from "@/context/PencilyContext";
import { PencilyMascotCompanion } from "@/components/PencilyMascotCompanion";
import { SiteClosureNotice } from "@/components/SiteClosureNotice";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF7EE] text-[#0F2747]">
        <PencilyProvider>
          <SiteClosureNotice />
          {children}
          <PencilyMascotCompanion />
        </PencilyProvider>
      </body>
    </html>
  );
}

