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
} from "lucide-react";

import { usePencily } from "@/context/PencilyContext";
import { Logo, PencilMascot } from "./Logo";
import { DiscordLogo } from "./BrandIcons";

export type DashboardTab =
  | "calendar"
  | "classes"
  | "videos"
  | "leaderboard"
  | "community"
  | "discord"
  | "profile"
  | "become-tutor";

interface DashboardSidebarProps {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  themeMode?: "light" | "dark" | "palette";
  onThemeModeChange?: (mode: "light" | "dark" | "palette") => void;
}

export function DashboardSidebar({
  activeTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
}: DashboardSidebarProps) {
  const { user } = usePencily();

  const navItems = [
    {
      id: "classes" as const,
      label: "Tìm lớp học",
      icon: Search,
    },
    {
      id: "calendar" as const,
      label: "Lớp của tôi",
      icon: Calendar,
    },
    {
      id: "videos" as const,
      label: "Thư viện",
      icon: BookOpen,
    },
    {
      id: "leaderboard" as const,
      label: "Xếp hạng",
      icon: Trophy,
    },
    {
      id: "discord" as const,
      label: "Discord Server",
      icon: DiscordLogo,
    },
    {
      id: "become-tutor" as const,
      label: "Trở thành Peer Tutor",
      icon: GraduationCap,
    },
    {
      id: "profile" as const,
      label: "Hồ sơ cá nhân",
      icon: User,
    },
  ];

  return (
    <aside
      className={`h-screen sticky top-0 flex flex-col justify-between bg-white/95 backdrop-blur-md text-[#0F2747] border-r border-[#0F2747]/10 transition-[width] duration-300 ease-in-out z-40 select-none shrink-0 shadow-xs overflow-hidden ${
        isCollapsed ? "w-[78px]" : "w-64 lg:w-72"
      }`}
    >
      {/* TOP SECTION: Header & Navigation (Fixed width wrapper prevents layout squishing during animation) */}
      <div className="flex flex-col p-3.5 space-y-3.5 w-64 lg:w-72 shrink-0">
        {/* Brand Header */}
        <div className="h-12 flex items-center justify-between px-1">
          <Link
            href="/"
            className="flex items-center gap-2.5 group overflow-hidden"
            title="Về trang chủ The Pencily"
          >
            <div className="w-9 h-9 flex items-center justify-center shrink-0">
              <PencilMascot size="sm" priority />
            </div>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${
                isCollapsed
                  ? "opacity-0 max-w-0 -translate-x-2 pointer-events-none"
                  : "opacity-100 max-w-[180px] translate-x-0"
              }`}
            >
              <Logo variant="nav" size="sm" priority />
            </div>
          </Link>

          <Link
            href="/"
            className={`text-[#0F2747]/60 hover:text-[#0F2747] p-2 rounded-xl hover:bg-[#FFF9EF] transition-all duration-300 ease-in-out shrink-0 ${
              isCollapsed ? "opacity-0 pointer-events-none scale-75" : "opacity-100 scale-100"
            }`}
            title="Về trang chủ"
          >
            <Home className="w-4 h-4" />
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5 pt-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                title={isCollapsed ? item.label : undefined}
                className={`w-full h-11 flex items-center rounded-2xl transition-colors duration-150 cursor-pointer relative group px-2.5 gap-3.5 overflow-hidden ${
                  isActive
                    ? "bg-[#FFC83D]/25 text-[#0F2747] font-bold border border-[#FFC83D]/60 shadow-xs"
                    : "text-[#0F2747]/70 hover:text-[#0F2747] hover:bg-[#FFF9EF] font-medium border border-transparent"
                }`}
              >
                <div className="w-7 h-7 flex items-center justify-center shrink-0">
                  <Icon
                    className={`w-[21px] h-[21px] transition-transform group-hover:scale-110 ${
                      isActive ? "text-[#D97706]" : "text-[#0F2747]/60 group-hover:text-[#0F2747]"
                    }`}
                  />
                </div>

                <span
                  className={`text-sm lg:text-base leading-normal py-0.5 whitespace-nowrap truncate transition-all duration-300 ease-in-out ${
                    isCollapsed
                      ? "opacity-0 max-w-0 -translate-x-2 pointer-events-none"
                      : "opacity-100 max-w-[180px] translate-x-0"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* BOTTOM SECTION: User Card & Collapse Toggle (Fixed width wrapper prevents vertical word wrapping) */}
      <div className="border-t border-[#0F2747]/10 p-3.5 space-y-2.5 w-64 lg:w-72 shrink-0">
        {/* User Account Card: Direct navigation to Profile */}
        <button
          onClick={() => onSelectTab("profile")}
          title={isCollapsed ? user.name : "Hồ sơ học sinh"}
          className={`w-full p-2 rounded-2xl flex items-center gap-3 transition-colors duration-150 cursor-pointer overflow-hidden ${
            activeTab === "profile"
              ? "bg-[#FFC83D]/25 border border-[#FFC83D]/60 shadow-2xs"
              : "bg-[#FFF9EF] hover:bg-[#FFF4DC] border border-[#0F2747]/10 shadow-xs"
          }`}
        >
          {/* Avatar (always stable at left) */}
          <div className="w-8 h-8 rounded-xl bg-[#FFC83D] text-[#0F2747] font-black text-xs flex items-center justify-center shadow-2xs shrink-0 border border-[#0F2747]/10 overflow-hidden">
            {user.avatar?.startsWith("http") ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              user.avatar || "P"
            )}
          </div>

          {/* User details (smoothly fades and slides in/out) */}
          <div
            className={`flex flex-col text-left leading-snug overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${
              isCollapsed
                ? "opacity-0 max-w-0 -translate-x-2 pointer-events-none"
                : "opacity-100 max-w-[180px] translate-x-0"
            }`}
          >
            <span className="font-bold text-sm text-[#0F2747] truncate pb-0.5">
              {user.name}
            </span>
            <span className="text-xs text-[#0F2747]/70 truncate pb-0.5 font-medium">
              <span className="text-[#D97706] font-bold">{user.points} PP</span> • {user.school || "The Pencily"}
            </span>
          </div>
        </button>

        {/* Collapse / Expand Sidebar Button */}
        <div className="pt-1 border-t border-[#0F2747]/10">
          <button
            onClick={onToggleCollapse}
            title={isCollapsed ? "Mở rộng menu" : "Thu gọn menu"}
            className="w-full h-9 flex items-center gap-3 px-2 rounded-xl transition-colors duration-150 cursor-pointer text-xs text-[#0F2747]/70 hover:text-[#0F2747] hover:bg-[#0F2747]/5 overflow-hidden"
          >
            <div className="w-7 h-7 flex items-center justify-center shrink-0">
              {isCollapsed ? (
                <PanelLeftOpen className="w-4 h-4 text-[#0F2747]/70" />
              ) : (
                <PanelLeftClose className="w-4 h-4 text-[#0F2747]/60" />
              )}
            </div>

            <span
              className={`font-semibold text-xs whitespace-nowrap transition-all duration-300 ease-in-out ${
                isCollapsed
                  ? "opacity-0 max-w-0 -translate-x-2 pointer-events-none"
                  : "opacity-100 max-w-[180px] translate-x-0"
              }`}
            >
              Thu gọn menu
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}
