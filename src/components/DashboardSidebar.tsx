"use client";

import React from "react";
import Link from "next/link";
import {
  Calendar,
  User,
  Search,
  PanelLeftClose,
  PanelLeftOpen,
  Home,
  GraduationCap,
  Trophy,
  BookOpen,
  MessageSquare,
  Compass,
  Settings,
  ShieldCheck,
} from "lucide-react";

import { isReviewer } from "@/lib/platform";
import { usePencily } from "@/context/PencilyContext";
import { Logo } from "./Logo";
import { DiscordLogo } from "./BrandIcons";
import { PencilyStoreIcon } from "./icons/PencilyIcons";

export type DashboardTab =
  | "calendar"
  | "classes"
  | "videos"
  | "leaderboard"
  | "discord"
  | "shop"
  | "profile"
  | "become-tutor"
  | "settings"
  | "academic";

interface DashboardSidebarProps {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onStartTour?: () => void;
  themeMode?: "light" | "dark" | "palette";
  onThemeModeChange?: (mode: "light" | "dark" | "palette") => void;
}

export function DashboardSidebar({
  activeTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
  onStartTour,
}: DashboardSidebarProps) {
  const { user, language } = usePencily();

  // KHU VỰC 1: HỌC TẬP (Tìm lớp học, Lớp của tôi, Thư viện, Xếp hạng)
  const learningItems = [
    {
      id: "classes" as const,
      labelVi: "Tìm lớp học",
      labelEn: "Find a Session",
      icon: Search,
    },
    {
      id: "calendar" as const,
      labelVi: "Lớp của tôi",
      labelEn: "My Schedule",
      icon: Calendar,
    },
    {
      id: "videos" as const,
      labelVi: "Thư viện",
      labelEn: "Library",
      icon: BookOpen,
    },
    {
      id: "leaderboard" as const,
      labelVi: "Xếp hạng",
      labelEn: "Leaderboard",
      icon: Trophy,
    },
  ];

  interface SecondaryItem {
    id: DashboardTab;
    labelVi: string;
    labelEn: string;
    icon: React.ElementType;
    isTab: boolean;
    href?: string;
  }

  // KHU VỰC 2: CÁC KHU VỰC CÒN LẠI (Dạy kèm, Discord, Cửa hàng PP, Hồ sơ)
  const secondaryItems: SecondaryItem[] = [
    ...(user.platformRole === "admin" ||
    user.role === "admin" ||
    user.role === "Admin" ||
    user.email === "hhuuyynnhhccoonnggtthhaannhh@gmail.com" ||
    user.email === "thepencily@gmail.com"
      ? [
          {
            id: "academic" as const,
            labelVi: "Bảng Quản Trị Admin",
            labelEn: "Admin Deck",
            icon: ShieldCheck,
            isTab: false,
            href: "/admin",
          },
        ]
      : []),
    ...(isReviewer(user.platformRole) ? [{ id:"academic" as const,labelVi:"Ban Academic",labelEn:"Academic",icon:GraduationCap,isTab:true }] : []),
    {
      id: "become-tutor" as const,
      labelVi: "Trở thành Peer Tutor",
      labelEn: "My Tutoring",
      icon: GraduationCap,
      isTab: true,
    },
    {
      id: "discord" as const,
      labelVi: "Máy chủ Discord",
      labelEn: "Discord Server",
      icon: DiscordLogo,
      isTab: true,
    },
    {
      id: "shop" as const,
      labelVi: "Cửa hàng PP",
      labelEn: "PP Shop",
      icon: PencilyStoreIcon,
      isTab: true,
    },
    {
      id: "profile" as const,
      labelVi: "Hồ sơ cá nhân",
      labelEn: "My Profile",
      icon: User,
      isTab: true,
    },
    {
      id: "settings" as const,
      labelVi: "Cài đặt tài khoản",
      labelEn: "Settings",
      icon: Settings,
      isTab: true,
    },
  ];

  return (
    <aside
      id="tour-sidebar"
      className={`h-[100dvh] max-h-[100dvh] sticky top-0 flex flex-col justify-between bg-white/95 backdrop-blur-md text-[#0F2747] border-r-2 border-slate-300 transition-[width] duration-300 ease-in-out z-40 select-none shrink-0 shadow-xs overflow-hidden ${
        isCollapsed ? "w-[68px]" : "w-64 lg:w-72"
      }`}
    >
      {/* TOP SECTION: Header & 2 Distinct Navigation Areas */}
      <div className={`flex flex-col p-2 space-y-2 flex-1 overflow-y-auto overflow-x-hidden scrollbar-none transition-all ${isCollapsed ? "w-[68px] items-center" : "w-64 lg:w-72"}`}>
        {/* Brand Header with Instant Top Retract / Collapse Button */}
        <div className={`h-10 sm:h-11 flex items-center px-1 shrink-0 ${isCollapsed ? "w-full justify-center" : "w-full justify-between"}`}>
          {!isCollapsed ? (
            <>
              <Link
                href="/"
                className="flex items-center group overflow-hidden"
                title={language === "vi" ? "Về trang chủ The Pencily" : "Back to Pencily Home"}
              >
                <Logo variant="nav" size="sm" priority />
              </Link>

              {/* Top Quick Actions: Home & Collapse Toggle */}
              <div className="flex items-center gap-1 shrink-0">
                <Link
                  href="/"
                  className="text-[#0F2747]/60 hover:text-[#0F2747] p-1.5 rounded-sm border-2 border-transparent hover:border-slate-300 hover:bg-[#FFF9EF] transition cursor-pointer"
                  title={language === "vi" ? "Về trang chủ" : "Home"}
                >
                  <Home className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={onToggleCollapse}
                  title={language === "vi" ? "Thu gọn menu" : "Collapse menu"}
                  className="p-1.5 rounded-sm text-[#0F2747]/70 hover:text-[#0F2747] hover:bg-[#FFF9EF] border-2 border-transparent hover:border-slate-300 transition cursor-pointer flex items-center justify-center"
                  aria-label="Collapse sidebar"
                >
                  <PanelLeftClose className="w-4.5 h-4.5 text-[#0F2747]" />
                </button>
              </div>
            </>
          ) : (
            /* COLLAPSED HEADER: Single centered expand button with pencil branding */
            <div className="w-full flex items-center justify-center">
              <button
                type="button"
                onClick={onToggleCollapse}
                title={language === "vi" ? "Mở rộng menu" : "Expand menu"}
                className="w-10 h-10 rounded-sm flex items-center justify-center text-[#0F2747] hover:bg-[#FFF9EF] border-2 border-transparent hover:border-slate-300 transition cursor-pointer group"
                aria-label="Expand sidebar"
              >
                <PanelLeftOpen className="w-5 h-5 text-[#0F2747] group-hover:scale-110 transition-transform" />
              </button>
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* KHU VỰC 1: HỌC TẬP (Tìm lớp học, Lớp của tôi, Thư viện, Xếp hạng) */}
        {/* ============================================================== */}
        {isCollapsed ? (
          /* COLLAPSED POD 1: Floating Vertical Capsule */
          <div className="flex justify-center w-[50px]">
            <div className="w-11 py-1.5 flex flex-col items-center gap-1.5 rounded-md border-2 border-slate-300 bg-white shadow-2xs">
              {learningItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                const label = language === "vi" ? item.labelVi : item.labelEn;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id)}
                    title={label}
                    className={`w-8 h-8 flex items-center justify-center rounded-sm transition-all duration-150 cursor-pointer ${
                      isActive
                        ? "bg-[#FFC83D]/35 text-[#0F2747] font-bold border-2 border-[#0F2747] shadow-2xs"
                        : "text-[#0F2747]/70 hover:text-[#0F2747] hover:bg-[#FFF9EF] border-2 border-transparent hover:border-slate-300"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* EXPANDED SECTION 1: Enclosed Architectural Card */
          <div className="rounded-md border-2 border-slate-300 bg-white p-1.5 shadow-2xs">
            <div className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-slate-500 border-b border-slate-100 mb-1">
              {language === "vi" ? "Học Tập & Lớp Học" : "Learning & Classes"}
            </div>
            <nav className="space-y-0.5">
              {learningItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                const label = language === "vi" ? item.labelVi : item.labelEn;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id)}
                    className={`w-full min-h-[36px] py-1.5 flex items-center rounded-sm transition-colors duration-150 cursor-pointer px-2.5 gap-2.5 ${
                      isActive
                        ? "bg-[#FFC83D]/30 text-[#0F2747] font-bold border-2 border-[#0F2747] shadow-2xs"
                        : "text-[#0F2747]/70 hover:text-[#0F2747] hover:bg-[#FFF9EF] font-medium border-2 border-transparent hover:border-slate-200"
                    }`}
                  >
                    <div className="w-4.5 h-4.5 flex items-center justify-center shrink-0">
                      <Icon
                        className={`w-4 h-4 transition-transform ${
                          isActive ? "text-[#0F2747]" : "text-[#0F2747]/60"
                        }`}
                      />
                    </div>
                    <span className="text-xs whitespace-nowrap truncate leading-normal py-0.5">
                      {label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        )}

        {/* ============================================================== */}
        {/* KHU VỰC 2: KHU VỰC CÒN LẠI (Diễn đàn, Dạy kèm, Discord, Shop, Hồ sơ) */}
        {/* ============================================================== */}
        {isCollapsed ? (
          /* COLLAPSED POD 2: Floating Vertical Capsule */
          <div className="flex justify-center w-[50px]">
            <div className="w-11 py-1.5 flex flex-col items-center gap-1.5 rounded-md border-2 border-slate-300 bg-white shadow-2xs">
              {secondaryItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.isTab && activeTab === item.id;
                const label = language === "vi" ? item.labelVi : item.labelEn;

                if (!item.isTab && item.href) {
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      title={label}
                      className="w-8 h-8 flex items-center justify-center rounded-sm transition-all duration-150 cursor-pointer text-[#0F2747]/70 hover:text-[#0F2747] hover:bg-[#FFF9EF] border-2 border-transparent hover:border-slate-300"
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                    </Link>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.isTab) onSelectTab(item.id as DashboardTab);
                    }}
                    title={label}
                    className={`w-8 h-8 flex items-center justify-center rounded-sm transition-all duration-150 cursor-pointer ${
                      isActive
                        ? "bg-[#FFC83D]/35 text-[#0F2747] font-bold border-2 border-[#0F2747] shadow-2xs"
                        : "text-[#0F2747]/70 hover:text-[#0F2747] hover:bg-[#FFF9EF] border-2 border-transparent hover:border-slate-300"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* EXPANDED SECTION 2: Enclosed Architectural Card */
          <div className="rounded-md border-2 border-slate-300 bg-white p-1.5 shadow-2xs">
            <div className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-slate-500 border-b border-slate-100 mb-1">
              {language === "vi" ? "Phát Triển & Cộng Đồng" : "Tutoring & Community"}
            </div>
            <nav className="space-y-0.5">
              {secondaryItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.isTab && activeTab === item.id;
                const label = language === "vi" ? item.labelVi : item.labelEn;

                if (!item.isTab && item.href) {
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="w-full min-h-[36px] py-1.5 flex items-center rounded-sm transition-colors duration-150 cursor-pointer px-2.5 gap-2.5 text-[#0F2747]/70 hover:text-[#0F2747] hover:bg-[#FFF9EF] font-medium border-2 border-transparent hover:border-slate-200"
                    >
                      <div className="w-4.5 h-4.5 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-[#0F2747]/60" />
                      </div>
                      <span className="text-xs whitespace-nowrap truncate leading-normal py-0.5">
                        {label}
                      </span>
                    </Link>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.isTab) onSelectTab(item.id as DashboardTab);
                    }}
                    className={`w-full min-h-[36px] py-1.5 flex items-center rounded-sm transition-colors duration-150 cursor-pointer px-2.5 gap-2.5 ${
                      isActive
                        ? "bg-[#FFC83D]/30 text-[#0F2747] font-bold border-2 border-[#0F2747] shadow-2xs"
                        : "text-[#0F2747]/70 hover:text-[#0F2747] hover:bg-[#FFF9EF] font-medium border-2 border-transparent hover:border-slate-200"
                    }`}
                  >
                    <div className="w-4.5 h-4.5 flex items-center justify-center shrink-0">
                      <Icon
                        className={`w-4 h-4 transition-transform ${
                          isActive ? "text-[#0F2747]" : "text-[#0F2747]/60"
                        }`}
                      />
                    </div>
                    <span className="text-xs whitespace-nowrap truncate leading-normal py-0.5">
                      {label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </div>

      {/* BOTTOM SECTION: User Card & Tour Trigger (Equalized pb-3 on both states) */}
      <div className={`border-t-2 border-slate-300 p-2 pb-3 shrink-0 bg-white/50 transition-all ${isCollapsed ? "w-[68px] flex flex-col items-center gap-1.5" : "w-64 lg:w-72 space-y-1.5"}`}>
        {/* Onboarding Tour Walkthrough Button */}
        {onStartTour && (
          <button
            type="button"
            onClick={onStartTour}
            title={language === "vi" ? "Hướng dẫn nhập môn" : "Academy Walkthrough"}
            className={`rounded-sm flex items-center transition cursor-pointer ${
              isCollapsed
                ? "w-9 h-9 justify-center p-0 bg-white hover:bg-slate-50 border-2 border-slate-300 text-[#0F2747] shadow-2xs"
                : "w-full min-h-[36px] py-1 px-2.5 gap-2 bg-amber-50 hover:bg-amber-100/80 border-2 border-amber-300 text-amber-950 font-bold text-xs shadow-2xs"
            }`}
          >
            <Compass className="w-4 h-4 text-amber-700 shrink-0" />
            {!isCollapsed && (
              <span className="truncate leading-normal py-0.5">
                {language === "vi" ? "Hướng Dẫn Nhập Môn" : "Academy Tour"}
              </span>
            )}
          </button>
        )}

        {/* User Account Card */}
        <button
          onClick={() => onSelectTab("profile")}
          title={isCollapsed ? user.name : language === "vi" ? "Hồ sơ học sinh" : "Student Profile"}
          className={`rounded-sm flex items-center transition-colors duration-150 cursor-pointer overflow-hidden ${
            isCollapsed
              ? "w-9 h-9 justify-center p-0 bg-[#FFF9EF] hover:bg-[#FFF4DC] border-2 border-slate-300 shadow-xs"
              : `w-full h-11 p-1.5 gap-2 ${activeTab === "profile" ? "bg-[#FFC83D]/30 border-2 border-[#0F2747] shadow-2xs" : "bg-[#FFF9EF] hover:bg-[#FFF4DC] border-2 border-slate-300 shadow-xs"}`
          }`}
        >
          {/* Avatar */}
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-sm bg-[#FFC83D] text-[#0F2747] font-black text-xs flex items-center justify-center shadow-2xs shrink-0 border-2 border-slate-300 overflow-hidden">
            {user.avatar?.startsWith("http") ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              user.avatar || "P"
            )}
          </div>

          {/* User details */}
          <div
            className={`flex flex-col text-left leading-tight overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${
              isCollapsed
                ? "opacity-0 max-w-0 -translate-x-2 pointer-events-none"
                : "opacity-100 max-w-[170px] translate-x-0"
            }`}
          >
            <span className="font-bold text-xs text-[#0F2747] truncate">
              {user.name}
            </span>
            <span className="text-[10px] text-[#0F2747]/70 truncate font-medium">
              <span className="text-[#D97706] font-bold">{user.points} PP</span> • {user.school || "The Pencily"}
            </span>
          </div>
        </button>
      </div>
    </aside>
  );
}
