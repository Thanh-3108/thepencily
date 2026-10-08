"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  User,
  Search,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
  Home,
  ExternalLink,
  GraduationCap,
} from "lucide-react";

import { usePencily } from "@/context/PencilyContext";
import { Logo, PencilMascot } from "./Logo";
import { DiscordLogo } from "./BrandIcons";

export type DashboardTab = "calendar" | "classes" | "community" | "discord" | "profile" | "become-tutor";

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
  const [userMenuOpen, setUserMenuOpen] = useState(false);

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
      className={`h-screen sticky top-0 flex flex-col justify-between bg-white/95 backdrop-blur-md text-[#0F2747] border-r border-[#0F2747]/10 transition-all duration-300 ease-in-out z-40 select-none shrink-0 shadow-xs ${
        isCollapsed ? "w-[78px]" : "w-64 lg:w-72"
      }`}
    >
      {/* TOP SECTION: Header & Navigation */}
      <div className="flex flex-col p-4 space-y-4">
        {/* Brand Header */}
        <div
          className={`h-12 flex items-center transition-all ${
            isCollapsed ? "justify-center" : "justify-between px-2"
          }`}
        >
          <Link
            href="/"
            className="flex items-center gap-2 group"
            title="Về trang chủ The Pencily"
          >
            {isCollapsed ? (
              <PencilMascot size="sm" priority />
            ) : (
              <Logo variant="nav" size="sm" priority />
            )}
          </Link>

          {!isCollapsed && (
            <Link
              href="/"
              className="text-[#0F2747]/60 hover:text-[#0F2747] p-2 rounded-xl hover:bg-[#FFF9EF] transition"
              title="Về trang chủ"
            >
              <Home className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5 pt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center rounded-2xl transition-all duration-150 cursor-pointer relative group ${
                  isCollapsed ? "h-12 justify-center" : "h-12 px-4 gap-3.5"
                } ${
                  isActive
                    ? "bg-[#FFC83D]/25 text-[#0F2747] font-bold border border-[#FFC83D]/60 shadow-xs"
                    : "text-[#0F2747]/70 hover:text-[#0F2747] hover:bg-[#FFF9EF] font-medium border border-transparent"
                }`}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? "text-[#D97706]" : "text-[#0F2747]/60 group-hover:text-[#0F2747]"
                  }`}
                />

                {!isCollapsed && (
                  <span className="text-sm lg:text-base truncate leading-none">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* BOTTOM SECTION: User Card & Collapse Toggle */}
      <div className="p-4 space-y-3 border-t border-[#0F2747]/10">
        {/* User Account Card */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className={`w-full flex items-center rounded-2xl transition-all cursor-pointer ${
              isCollapsed
                ? "justify-center p-1.5 hover:bg-[#FFF9EF]"
                : "p-2.5 bg-[#FFF9EF] hover:bg-[#FFF4DC] border border-[#0F2747]/10 justify-between shadow-xs"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-[#FFC83D] text-[#0F2747] font-black text-sm flex items-center justify-center shadow-xs shrink-0 border border-[#0F2747]/10 overflow-hidden">
                {user.avatar?.startsWith("http") ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user.avatar || "P"
                )}
              </div>

              {!isCollapsed && (
                <div className="flex flex-col text-left leading-tight overflow-hidden min-w-0">
                  <span className="font-bold text-sm text-[#0F2747] truncate">
                    {user.name}
                  </span>
                  <span className="text-xs text-[#0F2747]/70 truncate mt-0.5 font-medium">
                    <span className="text-[#D97706] font-bold">{user.points} PP</span> • {user.school || "The Pencily"}
                  </span>
                </div>
              )}
            </div>

            {!isCollapsed && (
              <ChevronDown
                className={`w-4 h-4 text-[#0F2747]/60 transition-transform shrink-0 ${
                  userMenuOpen ? "rotate-180" : ""
                }`}
              />
            )}
          </button>

          {/* User Popover Menu */}
          {userMenuOpen && (
            <div
              className={`absolute bottom-full mb-2 bg-white border border-[#0F2747]/10 rounded-2xl p-2 shadow-xl z-50 text-sm text-[#0F2747] ${
                isCollapsed ? "left-0 w-56" : "left-0 right-0"
              }`}
            >
              <div className="px-3 py-2 text-xs uppercase font-bold text-[#0F2747]/50 border-b border-[#0F2747]/10">
                Tài khoản học sinh
              </div>
              <button
                onClick={() => {
                  onSelectTab("profile");
                  setUserMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-[#FFF9EF] transition flex items-center gap-2.5 cursor-pointer font-medium"
              >
                <User className="w-4 h-4 text-[#FFC83D]" />
                <span>Xem Hồ sơ ({user.points} PP)</span>
              </button>
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noreferrer"
                className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-[#5865F2]/10 transition flex items-center justify-between text-[#5865F2] font-medium"
              >
                <span className="inline-flex items-center gap-2.5">
                  <DiscordLogo className="w-4 h-4" />
                  Cộng đồng Discord
                </span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          )}
        </div>

        {/* Collapse / Expand Sidebar Button */}
        <div className="pt-1 border-t border-[#0F2747]/10">
          <button
            onClick={onToggleCollapse}
            title={isCollapsed ? "Mở rộng menu" : "Thu gọn menu"}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[#0F2747]/60 hover:text-[#0F2747] hover:bg-[#0F2747]/5 transition cursor-pointer ${
              isCollapsed ? "justify-center" : "justify-start"
            }`}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="w-4 h-4 text-[#0F2747]/70" />
            ) : (
              <>
                <PanelLeftClose className="w-4 h-4 text-[#0F2747]/60" />
                <span className="font-medium text-xs">Thu gọn menu</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
