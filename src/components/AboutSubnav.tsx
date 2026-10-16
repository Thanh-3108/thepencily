"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  GraduationCap,
  Users,
  Target,
  ShieldCheck,
  Milestone,
  MessageSquareQuote,
  ChevronRight,
  Home,
} from "lucide-react";
import { usePencily } from "@/context/PencilyContext";

export interface AboutTabItem {
  id: string;
  slug: string;
  labelVi: string;
  labelEn: string;
  icon: React.ElementType;
}

export const ABOUT_TABS: AboutTabItem[] = [
  {
    id: "overview",
    slug: "",
    labelVi: "Tổng quan",
    labelEn: "Overview",
    icon: Compass,
  },
  {
    id: "chuong-trinh",
    slug: "chuong-trinh",
    labelVi: "Chương trình",
    labelEn: "Programs",
    icon: GraduationCap,
  },
  {
    id: "doi-ngu",
    slug: "doi-ngu",
    labelVi: "Đội ngũ",
    labelEn: "Team & Leaders",
    icon: Users,
  },
  {
    id: "su-menh",
    slug: "su-menh",
    labelVi: "Sứ mệnh & Giá trị",
    labelEn: "Mission & Values",
    icon: Target,
  },
  {
    id: "chinh-sach",
    slug: "chinh-sach",
    labelVi: "Chính sách & An toàn",
    labelEn: "Safety & Policies",
    icon: ShieldCheck,
  },
  {
    id: "lo-trinh",
    slug: "lo-trinh",
    labelVi: "Lộ trình",
    labelEn: "Roadmap",
    icon: Milestone,
  },
  {
    id: "cau-chuyen",
    slug: "cau-chuyen",
    labelVi: "Tiếng nói cộng đồng",
    labelEn: "Community Voices",
    icon: MessageSquareQuote,
  },
];

interface AboutSubnavProps {
  currentSlug?: string;
  title?: string;
}

export function AboutSubnav({ currentSlug = "" }: AboutSubnavProps) {
  const pathname = usePathname();
  const { language } = usePencily();
  const isVi = language === "vi";

  // Determine current active tab
  const activeTab =
    ABOUT_TABS.find((tab) => {
      if (!tab.slug) {
        return pathname === "/about" || pathname === "/about/";
      }
      return pathname.startsWith(`/about/${tab.slug}`);
    }) || ABOUT_TABS[0];

  return (
    <div className="w-full bg-[#FFF9EF] border-b-2 border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-5 pb-3">
        {/* Breadcrumb row */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-slate-500 mb-4"
        >
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-[#0F2747] font-semibold transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{isVi ? "Trang chủ" : "Home"}</span>
          </Link>

          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

          <Link
            href="/about"
            className={`font-semibold hover:text-[#0F2747] transition-colors ${
              activeTab.slug === "" ? "text-[#0F2747] font-bold" : ""
            }`}
          >
            {isVi ? "Về The Pencily" : "About The Pencily"}
          </Link>

          {activeTab.slug !== "" && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="font-bold text-[#0F2747]">
                {isVi ? activeTab.labelVi : activeTab.labelEn}
              </span>
            </>
          )}
        </nav>

        {/* Header title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-[#4F7ECB]">
              {isVi ? "Thông Tin Minh Bạch & Vận Hành" : "Transparency & Organization"}
            </span>
            <h1 className="text-2xl sm:text-3xl font-poppins font-black text-[#0F2747] tracking-tight">
              {isVi ? "Giới Thiệu The Pencily" : "About The Pencily"}
            </h1>
          </div>

          <div className="text-xs font-semibold text-slate-600">
            {isVi
              ? "Cộng đồng học tập đồng đẳng phi lợi nhuận"
              : "Non-profit peer-learning community"}
          </div>
        </div>

        {/* Tab Pills Bar - Horizontal scrollable on small screens, squarish Samsung design, NO DOTS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
          {ABOUT_TABS.map((tab) => {
            const href = tab.slug ? `/about/${tab.slug}` : "/about";
            const isActive =
              (tab.slug === "" && (pathname === "/about" || pathname === "/about/")) ||
              (tab.slug !== "" && pathname.startsWith(`/about/${tab.slug}`));
            const Icon = tab.icon;

            return (
              <Link
                key={tab.id}
                href={href}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-sm text-xs font-bold whitespace-nowrap transition-all border-2 active:scale-95 cursor-pointer ${
                  isActive
                    ? "bg-[#0F2747] text-white border-[#0F2747] shadow-xs"
                    : "bg-white text-slate-700 border-slate-300 hover:border-[#0F2747] hover:text-[#0F2747] hover:bg-slate-50"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? "text-[#FFC83D]" : "text-[#4F7ECB]"
                  }`}
                />
                <span>{isVi ? tab.labelVi : tab.labelEn}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
