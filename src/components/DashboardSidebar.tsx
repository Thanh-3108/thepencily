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
import { PencilyStoreIcon } from "./icons/PencilyIcons";

export type DashboardTab =
  | "calendar"
  | "classes"
  | "videos"
  | "leaderboard"
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

  // KHU VỰC 2: CÁC KHU VỰC CÒN LẠI (Dạy kèm, Cửa hàng PP, Hồ sơ)
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
      className={`h-[100dvh] max-h-[100dvh] sticky top-0 flex flex-col justify-between bg-[#FFFDF9]/95 backdrop-blur-md text-[#0F2747] border-r border-[#E6DEC8] transition-[width] duration-300 ease-in-out z-40 select-none shrink-0 shadow-pencily-soft overflow-hidden ${
        isCollapsed ? "w-[72px]" : "w-64 lg:w-72"
      }`}
    >
      {/* TOP SECTION: Header & 2 Warm Grouped Navigation Areas */}
      <div className={`flex flex-col p-3 space-y-4 flex-1 overflow-y-auto overflow-x-hidden scrollbar-none transition-all ${isCollapsed ? "w-[72px] items-center" : "w-64 lg:w-72"}`}>
        {/* Brand Header */}
        <div className={`h-11 flex items-center px-1 shrink-0 ${isCollapsed ? "w-full justify-center" : "w-full justify-between"}`}>
          {!isCollapsed ? (
            <>
              <Link
                href="/"
                className="flex items-center group overflow-hidden"
                title={language === "vi" ? "Về trang chủ The Pencily" : "Back to Pencily Home"}
              >
                <Logo variant="nav" size="sm" priority />
              </Link>

              <div className="flex items-center gap-1 shrink-0">
                <Link
                  href="/"
                  className="text-[#0F2747]/65 hover:text-[#0F2747] p-2 rounded-full hover:bg-[#FFF6DC]/70 transition cursor-pointer"
                  title={language === "vi" ? "Về trang chủ" : "Home"}
                >
                  <Home className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={onToggleCollapse}
                  title={language === "vi" ? "Thu gọn menu" : "Collapse menu"}
                  className="p-2 rounded-full text-[#0F2747]/70 hover:text-[#0F2747] hover:bg-[#FFF6DC]/70 transition cursor-pointer flex items-center justify-center"
                  aria-label="Collapse sidebar"
                >
                  <PanelLeftClose className="w-4.5 h-4.5 text-[#0F2747]" />
                </button>
              </div>
            </>
          ) : (
            <div className="w-full flex items-center justify-center">
              <button
                type="button"
                onClick={onToggleCollapse}
                title={language === "vi" ? "Mở rộng menu" : "Expand menu"}
                className="w-10 h-10 rounded-full flex items-center justify-center text-[#0F2747] hover:bg-[#FFF6DC]/70 transition cursor-pointer group"
                aria-label="Expand sidebar"
              >
                <PanelLeftOpen className="w-5 h-5 text-[#0F2747] group-hover:scale-110 transition-transform" />
              </button>
            </div>
          )}
        </div>

        {/* KHU VỰC 1: HỌC TẬP */}
        {isCollapsed ? (
          <div className="flex justify-center w-[52px]">
            <div className="w-12 py-2 flex flex-col items-center gap-1.5 rounded-2xl bg-[#FAF7EE] border border-[#E6DEC8]">
              {learningItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                const label = language === "vi" ? item.labelVi : item.labelEn;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id)}
                    title={label}
                    className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-150 cursor-pointer ${
                      isActive
                        ? "bg-[#FFC83D]/40 text-[#0F2747] shadow-2xs"
                        : "text-[#0F2747]/70 hover:text-[#0F2747] hover:bg-white"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            <div className="px-3 py-1 text-[11px] font-semibold text-[#6B7A90]">
              {language === "vi" ? "Học tập & Lớp học" : "Learning & Classes"}
            </div>
            <nav className="space-y-1">
              {learningItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                const label = language === "vi" ? item.labelVi : item.labelEn;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id)}
                    className={`w-full min-h-[40px] py-2 flex items-center rounded-xl transition-all duration-150 cursor-pointer px-3 gap-3 ${
                      isActive
                        ? "bg-[#FFF6DC] text-[#0F2747] font-semibold border border-[#F5D67B]/70 shadow-2xs"
                        : "text-[#0F2747]/75 hover:text-[#0F2747] hover:bg-[#FAF7EE] font-medium"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? "text-[#0F2747]" : "text-[#0F2747]/55"
                      }`}
                    />
                    <span className="text-xs sm:text-[13px] whitespace-nowrap truncate">
                      {label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        )}

        {/* KHU VỰC 2: PHÁT TRIỂN & CỘNG ĐỒNG */}
        {isCollapsed ? (
          <div className="flex justify-center w-[52px]">
            <div className="w-12 py-2 flex flex-col items-center gap-1.5 rounded-2xl bg-[#FAF7EE] border border-[#E6DEC8]">
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
                      className="w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-150 cursor-pointer text-[#0F2747]/70 hover:text-[#0F2747] hover:bg-white"
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
                    className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-150 cursor-pointer ${
                      isActive
                        ? "bg-[#FFC83D]/40 text-[#0F2747] shadow-2xs"
                        : "text-[#0F2747]/70 hover:text-[#0F2747] hover:bg-white"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            <div className="px-3 py-1 text-[11px] font-semibold text-[#6B7A90]">
              {language === "vi" ? "Phát triển & Đặc quyền" : "Tutoring & Perks"}
            </div>
            <nav className="space-y-1">
              {secondaryItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.isTab && activeTab === item.id;
                const label = language === "vi" ? item.labelVi : item.labelEn;

                if (!item.isTab && item.href) {
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="w-full min-h-[40px] py-2 flex items-center rounded-xl transition-all duration-150 cursor-pointer px-3 gap-3 text-[#0F2747]/75 hover:text-[#0F2747] hover:bg-[#FAF7EE] font-medium"
                    >
                      <Icon className="w-4 h-4 shrink-0 text-[#0F2747]/55" />
                      <span className="text-xs sm:text-[13px] whitespace-nowrap truncate">
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
                    className={`w-full min-h-[40px] py-2 flex items-center rounded-xl transition-all duration-150 cursor-pointer px-3 gap-3 ${
                      isActive
                        ? "bg-[#FFF6DC] text-[#0F2747] font-semibold border border-[#F5D67B]/70 shadow-2xs"
                        : "text-[#0F2747]/75 hover:text-[#0F2747] hover:bg-[#FAF7EE] font-medium"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? "text-[#0F2747]" : "text-[#0F2747]/55"
                      }`}
                    />
                    <span className="text-xs sm:text-[13px] whitespace-nowrap truncate">
                      {label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </div>

      {/* BOTTOM SECTION: User Card & Tour Trigger */}
      <div className={`border-t border-[#E6DEC8] p-3 shrink-0 bg-[#FAF7EE]/60 transition-all ${isCollapsed ? "w-[72px] flex flex-col items-center gap-2" : "w-64 lg:w-72 space-y-2"}`}>
        {onStartTour && (
          <button
            type="button"
            onClick={onStartTour}
            title={language === "vi" ? "Hướng dẫn nhập môn" : "Academy Walkthrough"}
            className={`rounded-full flex items-center transition cursor-pointer ${
              isCollapsed
                ? "w-10 h-10 justify-center p-0 bg-white hover:bg-[#FFF6DC] border border-[#E6DEC8] text-[#0F2747]"
                : "w-full min-h-[38px] py-1.5 px-3.5 gap-2 bg-[#FFF6DC] hover:bg-[#FDEBA8] border border-[#F5D67B]/80 text-[#7A5400] font-semibold text-xs"
            }`}
          >
            <Compass className="w-4 h-4 text-amber-600 shrink-0" />
            {!isCollapsed && (
              <span className="truncate">
                {language === "vi" ? "Hướng dẫn làm quen" : "Academy Tour"}
              </span>
            )}
          </button>
        )}

        {/* User Account Card */}
        <button
          onClick={() => onSelectTab("profile")}
          title={isCollapsed ? user.name : language === "vi" ? "Hồ sơ học sinh" : "Student Profile"}
          className={`rounded-2xl flex items-center transition-all duration-150 cursor-pointer overflow-hidden ${
            isCollapsed
              ? "w-10 h-10 justify-center p-0 bg-white hover:bg-[#FFF6DC] border border-[#E6DEC8]"
              : `w-full p-2 gap-2.5 ${activeTab === "profile" ? "bg-[#FFF6DC] border border-[#F5D67B]" : "bg-white hover:bg-[#FFFDF8] border border-[#E6DEC8]"}`
          }`}
        >
          <div className="w-8 h-8 rounded-xl bg-[#FFC83D] text-[#0F2747] font-bold text-xs flex items-center justify-center shrink-0 overflow-hidden">
            {user.avatar?.startsWith("http") ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              user.avatar || "P"
            )}
          </div>

          <div
            className={`flex flex-col text-left leading-tight overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${
              isCollapsed
                ? "opacity-0 max-w-0 -translate-x-2 pointer-events-none"
                : "opacity-100 max-w-[170px] translate-x-0"
            }`}
          >
            <span className="font-semibold text-xs text-[#0F2747] truncate">
              {user.name}
            </span>
            <span className="text-[11px] text-[#6B7A90] truncate">
              <span className="text-amber-700 font-semibold">{user.points} PP</span> {user.school ? `— ${user.school}` : ""}
            </span>
          </div>
        </button>
      </div>
    </aside>
  );
}
