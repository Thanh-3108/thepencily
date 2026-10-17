"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  DashboardSidebar,
  DashboardTab,
} from "@/components/DashboardSidebar";
import { SchoolhouseDashboard } from "@/components/SchoolhouseDashboard";
import {
  TutorApplicationModal,
  RequestClassModal,
  EditProfileModal,
} from "@/components/Modals";
import { TutorClassStudioDrawer } from "@/components/TutorClassStudioDrawer";
import { CreatePostModal } from "@/components/CreatePostModal";
import { ClassVideoLibrary } from "@/components/ClassVideoLibrary";
import { DashboardLeaderboard } from "@/components/DashboardLeaderboard";
import { DashboardShop } from "@/components/DashboardShop";
import { PPExchangeShopModal } from "@/components/PPExchangeShopModal";
import { OnboardingTourModal } from "@/components/OnboardingTourModal";
import { DashboardSettings } from "@/components/DashboardSettings";
import { TutorWorkspace } from "./TutorWorkspace";
import { AcademicWorkspace } from "./AcademicWorkspace";
import { AssistantWorkspace } from "./AssistantWorkspace";
import { isSupabaseConfigured } from "@/lib/supabaseClient";
import {
  ReferFriendModal,
  ReportBugModal,
  HelpCenterModal,
  SafetyReportModal,
} from "@/components/SupportModals";
import { Calendar, Volume2, Clock, Trophy, Award, CheckCircle2, ExternalLink, BookOpen, ArrowRight, Hash, Plus, Users, Search, Heart, MessageSquare, Download, ShieldCheck, Layers, Edit3, ThumbsUp, Bot, X, ChevronDown, Gift, Languages } from "lucide-react";

import { usePencily } from "@/context/PencilyContext";
import { Logo, PencilMascot, OwlMascot } from "@/components/Logo";
import { DiscordLogo } from "@/components/BrandIcons";
import { PencilyProfileIcon } from "./icons/PencilyIcons";
import { SchoolhouseHeaderMenu } from "./SchoolhouseHeaderMenu";
import { downloadPencilyCertificatePdf } from "@/lib/certificatePdf";

export function DashboardContent({ defaultTab = "classes" }: { defaultTab?: DashboardTab }) {
  const searchParams = useSearchParams();
  const queryTab = searchParams.get("tab") as DashboardTab | null;
  const initialTab = queryTab || defaultTab;

  const {
    user,
    backendAuthenticated,
    apiNotice,
    clearNotice,
    updateUser,
    classes,
    addClass,
    deleteClass,
    registeredClassIds,
    registerClass,
    cancelClassRegistration,
    isRegistered,
    classRequests,
    requestClass,
    voteClassRequest,
    posts,
    createPost,
    toggleLikePost,
    addCommentToPost,
    addLearningMinutes,
    advanceTutorStep,
    onlineStudentsCount,
    activeVoiceRoomsCount,
    language,
    setLanguage,
  } = usePencily();

  const [activeTab, setActiveTab] = useState<DashboardTab>(initialTab);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isRequestClassOpen, setIsRequestClassOpen] = useState(false);
  const [isCreateClassOpen, setIsCreateClassOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [isPointsMenuOpen, setIsPointsMenuOpen] = useState(false);
  const [isExchangeShopOpen, setIsExchangeShopOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isReferModalOpen, setIsReferModalOpen] = useState(false);
  const [isBugModalOpen, setIsBugModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);

  // Auto-launch onboarding tour for first-time or incomplete profile users
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasSeen = localStorage.getItem("pencily_has_seen_tour");
      if (!hasSeen && !user.hasCompletedProfile) {
        const timer = setTimeout(() => setIsTourOpen(true), 500);
        return () => clearTimeout(timer);
      }
    }
  }, [user.hasCompletedProfile]);

  const handleSelectTab = (tab: DashboardTab) => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", tab);
      window.history.replaceState(null, "", url.toString());
    }
  };

  // Synchronize tab when query changes
  useEffect(() => {
    if (queryTab && queryTab !== activeTab) {
      setActiveTab(queryTab);
    }
  }, [queryTab]);

  // Handle Discord OAuth2 callback notifications
  useEffect(() => {
    const authStatus = searchParams.get("auth");
    const authError = searchParams.get("auth_error");

    if (authStatus === "discord_success") {
      setPostToast("🎉 Đăng nhập Discord OAuth2 thành công! Chào mừng bạn đến với The Pencily.");
      setTimeout(() => setPostToast(null), 5000);
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.delete("auth");
        window.history.replaceState(null, "", url.toString());
      }
    } else if (authError) {
      if (authError === "missing_discord_credentials" || authError === "missing_credentials") {
        setPostToast("⚠️ Chưa cấu hình DISCORD_CLIENT_ID trong .env.local. Bạn có thể dùng chế độ Demo.");
      } else if (authError === "cancelled") {
        setPostToast("ℹ️ Đã hủy quá trình ủy quyền Discord.");
      } else {
        setPostToast("❌ Đăng nhập Discord không thành công. Vui lòng thử lại.");
      }
      setTimeout(() => setPostToast(null), 5000);
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.delete("auth_error");
        window.history.replaceState(null, "", url.toString());
      }
    }
  }, [searchParams]);

  const [isApplyTutorOpen, setIsApplyTutorOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  // Search & Filter state for Classes tab
  const [classSearch, setClassSearch] = useState("");
  const [classCategory, setClassCategory] = useState("all");
  const [bookingToast, setBookingToast] = useState<string | null>(null);

  // Filter state for Community tab
  const [communityCategory, setCommunityCategory] = useState("all");
  const [postToast, setPostToast] = useState<string | null>(null);


  const handleBooking = (classId: string, classTitle: string) => {
    if (isRegistered(classId)) {
      cancelClassRegistration(classId);
      setBookingToast(`Đã hủy đăng ký: ${classTitle}`);
    } else {
      registerClass(classId);
      setBookingToast(`Đã giữ chỗ thành công (+10 PP)! Lớp học đã được đồng bộ vào Lịch của tôi.`);
    }

    setTimeout(() => {
      setBookingToast(null);
    }, 4000);
  };

  const handleCreateNewPost = (data: {
    title: string;
    content: string;
    category: "docs" | "doubt" | "announcement" | "tips";
    subworld: string;
    discordChannel: string;
    authorName: string;
    authorSchool: string;
  }) => {
    createPost(data);
    setPostToast("Bài đăng đã được xuất bản (+5 PP) và thông báo lên Discord!");
    setTimeout(() => {
      setPostToast(null);
    }, 4000);
  };

  const filteredClasses = classes.filter((item) => {
    const matchesCat = classCategory === "all" || item.category === classCategory;
    const q = classSearch.toLowerCase().trim();
    const matchesQuery =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.tutorName.toLowerCase().includes(q) ||
      (item.tutorSchool ? item.tutorSchool.toLowerCase().includes(q) : false) ||
      (item.categoryLabel ? item.categoryLabel.toLowerCase().includes(q) : false);
    return matchesCat && matchesQuery;
  });

  const filteredPosts =
    communityCategory === "all"
      ? posts
      : posts.filter((p) => p.category === communityCategory);

  const tabTitlesVi: Record<DashboardTab, string> = {
    calendar: "Lớp của tôi",
    classes: "Tìm lớp",
    videos: "Thư viện",
    leaderboard: "Xếp hạng",
    community: "Cộng đồng",
    discord: "Discord",
    shop: "Cửa hàng PP",
    profile: "Hồ sơ",
    "become-tutor": "Tutor",
    settings: "Cài đặt",
    academic: "Academic",
    assistant: "Hỏi Cú Pencily",
  };

  const tabTitlesEn: Record<DashboardTab, string> = {
    calendar: "Schedule",
    classes: "Classes",
    videos: "Library",
    leaderboard: "Leaderboard",
    community: "Community",
    discord: "Discord",
    shop: "PP Shop",
    profile: "Profile",
    "become-tutor": "Tutor",
    settings: "Settings",
    academic: "Academic",
    assistant: "Ask Pencily",
  };

  const currentTabTitle = language === "vi" ? tabTitlesVi[activeTab] : tabTitlesEn[activeTab];

  return (
    <div className="h-screen flex bg-[#FFF9EF] text-[#0F2747] overflow-hidden">
      {/* 1. IMMERSIVE LEFT SIDEBAR (The anchor of the whole platform) */}
      <DashboardSidebar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        onStartTour={() => setIsTourOpen(true)}
      />

      {/* 2. UNIFIED MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-scroll overflow-x-hidden [scrollbar-gutter:stable]">
        {/* Clean, Logical Workspace Header */}
        <header className="sticky top-0 z-30 backdrop-blur-md h-14 sm:h-16 border-b-2 bg-[#FFF9EF]/95 border-slate-300 text-[#0F2747] shrink-0">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-10 h-full flex items-center justify-between gap-4">
            {/* Left: Clean Breadcrumb title (No duplicate Logo since Sidebar already has it) */}
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-extrabold text-[#4F7ECB]">
                Dashboard
              </span>
              <span className="text-slate-400 font-bold">/</span>
              <h1 className="font-poppins font-black text-base sm:text-lg text-[#0F2747] tracking-tight">
                {currentTabTitle}
              </h1>
            </div>

            {/* Right: Unified, logical action group */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Language Switcher Pill */}
              <button
                type="button"
                onClick={() => setLanguage(language === "vi" ? "en" : "vi")}
                className="h-9 flex items-center gap-1.5 px-3 rounded-md bg-white hover:bg-slate-50 text-xs font-bold text-[#0F2747] border-2 border-slate-300 hover:border-[#0F2747] cursor-pointer transition shadow-2xs shrink-0"
                title="Đổi ngôn ngữ / Change language"
              >
                <Languages className="w-3.5 h-3.5 text-[#4F7ECB]" />
                <span>{language === "vi" ? "EN" : "VI"}</span>
              </button>

              {/* PP pill & popover */}
              <div id="tour-points-pill" className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setIsPointsMenuOpen(!isPointsMenuOpen)}
                  className={`h-9 flex items-center gap-2 px-3 rounded-md border-2 transition cursor-pointer text-xs font-bold active:scale-95 shadow-2xs ${
                    isPointsMenuOpen
                      ? "bg-[#FFF9EF] border-[#F59E0B] text-[#0F2747] ring-2 ring-[#F59E0B]/20"
                      : "bg-white border-slate-300 hover:border-amber-400 hover:bg-[#FFF9EF]/50 text-[#0F2747]"
                  }`}
                  aria-expanded={isPointsMenuOpen}
                  aria-label="Xem quy chế và số dư Pencily Points"
                >
                  <div className="w-4.5 h-4.5 rounded-xs bg-[#F59E0B] text-slate-900 border border-amber-600 flex items-center justify-center text-[10px] font-black shrink-0">
                    P
                  </div>
                  <span className="font-mono">{user.points} PP</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${
                      isPointsMenuOpen ? "rotate-180 text-[#F59E0B]" : ""
                    }`}
                  />
                </button>

                {isPointsMenuOpen && (
                  <>
                    {/* Click-away backdrop */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsPointsMenuOpen(false)}
                      aria-hidden="true"
                    />

                    {/* PP Popover */}
                    <div className="absolute right-0 mt-2.5 w-80 sm:w-96 rounded-md bg-[#FFFDF9] border-2 border-[#0F2747] shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      {/* Popover Header */}
                      <div className="p-4 bg-white border-b-2 border-slate-200 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#F59E0B] to-[#D97706] border-2 border-amber-500 flex items-center justify-center font-black text-slate-950 text-base shadow-xs">
                            P
                          </div>
                          <div>
                            <div className="text-[11px] uppercase tracking-wider text-amber-800 font-bold">
                              Pencily Points (PP)
                            </div>
                            <div className="text-lg font-black text-[#0F2747] leading-tight">
                              {user.points.toLocaleString("vi-VN")} PP
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsPointsMenuOpen(false)}
                          className="w-7 h-7 rounded-sm hover:bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-500 hover:text-slate-800 transition cursor-pointer"
                          aria-label="Đóng"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Popover Body */}
                      <div className="p-4 max-h-[70vh] overflow-y-auto space-y-4 text-xs text-[#0F2747]">
                        <div>
                          <div className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">
                            <span>{language === "vi" ? "Quy chế tích luỹ điểm thưởng" : "PP Earning Structure"}</span>
                          </div>
                          <div className="space-y-1.5 bg-white p-3 rounded-sm border-2 border-slate-300 shadow-2xs">
                            <div className="flex items-center justify-between py-1 border-b border-slate-100 last:border-0">
                              <span className="text-slate-700 font-medium">{language === "vi" ? "Tham gia phòng học tương tác" : "Join live study pod"}</span>
                              <span className="font-black text-emerald-700 font-mono">+10 PP</span>
                            </div>
                            <div className="flex items-center justify-between py-1 border-b border-slate-100 last:border-0">
                              <span className="text-slate-700 font-medium">{language === "vi" ? "Xem video bài học & tài liệu" : "Watch lesson video"}</span>
                              <span className="font-black text-emerald-700 font-mono">+5 PP</span>
                            </div>
                            <div className="flex items-center justify-between py-1 border-b border-slate-100 last:border-0">
                              <span className="text-slate-700 font-medium">{language === "vi" ? "Đăng bài chia sẻ thảo luận" : "Post study discussion"}</span>
                              <span className="font-black text-emerald-700 font-mono">+5 PP</span>
                            </div>
                            <div className="flex items-center justify-between py-1 border-b border-slate-100 last:border-0">
                              <span className="text-slate-700 font-medium">{language === "vi" ? "Bình luận giải đáp hữu ích" : "Helpful reply"}</span>
                              <span className="font-black text-emerald-700 font-mono">+2 PP</span>
                            </div>
                            <div className="flex items-center justify-between py-1 border-b border-slate-100 last:border-0">
                              <span className="text-slate-700 font-medium">{language === "vi" ? "Nhận lượt thích từ bạn học" : "Received upvote"}</span>
                              <span className="font-black text-emerald-700 font-mono">+1 PP</span>
                            </div>
                            <div className="flex items-center justify-between py-1 border-b border-slate-100 last:border-0">
                              <span className="text-slate-700 font-medium">{language === "vi" ? "Giảng dạy & Hướng dẫn Pod" : "Host peer tutoring"}</span>
                              <span className="font-black text-emerald-700 font-mono">+30 PP</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                            <Trophy className="w-3.5 h-3.5 text-amber-600" />
                            <span>{language === "vi" ? "Quyền lợi điểm thưởng" : "Points Benefits"}</span>
                          </div>
                          <ul className="space-y-1.5 bg-white p-3 rounded-sm border-2 border-slate-300 text-slate-700 text-xs shadow-2xs">
                            <li className="flex items-start gap-2 py-0.5">
                              <span className="font-bold text-[#0F2747] font-mono">1.</span>
                              <span>{language === "vi" ? "Đổi tài liệu đề thi và đặc quyền tại PP Shop." : "Redeem exclusive notes & mock exams at PP Shop."}</span>
                            </li>
                            <li className="flex items-start gap-2 py-0.5">
                              <span className="font-bold text-[#0F2747] font-mono">2.</span>
                              <span>{language === "vi" ? "Ghi danh bảng xếp hạng vinh danh tháng và kỳ thi." : "Climb monthly and exam leaderboards."}</span>
                            </li>
                            <li className="flex items-start gap-2 py-0.5">
                              <span className="font-bold text-[#0F2747] font-mono">3.</span>
                              <span>{language === "vi" ? "Mở khóa chứng nhận Peer Tutor chính thức." : "Unlock certified Peer Tutor credentials."}</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* Popover Footer Shortcuts with Exchange Shop */}
                      <div className="p-3 bg-slate-50 border-t-2 border-slate-200 space-y-2">
                        <button
                          type="button"
                          onClick={() => {
                            handleSelectTab("shop");
                            setIsPointsMenuOpen(false);
                          }}
                          className="w-full py-2.5 px-3 rounded-sm bg-[#0F2747] hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer text-center flex items-center justify-center gap-1.5 shadow-2xs active:scale-98 border-2 border-[#0F2747]"
                        >
                          <Gift className="w-3.5 h-3.5 text-[#FFC83D]" />
                          <span>{language === "vi" ? "Mở Cửa Hàng Đổi Đặc Quyền PP →" : "Open PP Rewards Shop →"}</span>
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              handleSelectTab("videos");
                              setIsPointsMenuOpen(false);
                            }}
                            className="flex-1 py-2 px-3 rounded-sm bg-[#FFF9EF] hover:bg-amber-100 text-[#0F2747] border-2 border-amber-300 font-bold text-xs transition cursor-pointer text-center"
                          >
                            {language === "vi" ? "Thư viện (+5 PP)" : "Library (+5 PP)"}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              handleSelectTab("leaderboard");
                              setIsPointsMenuOpen(false);
                            }}
                            className="flex-1 py-2 px-3 rounded-sm bg-[#0F2747] hover:bg-[#1E3A8A] text-white font-bold text-xs transition cursor-pointer text-center border-2 border-slate-700"
                          >
                            {language === "vi" ? "Bảng Xếp Hạng" : "Leaderboard"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Dedicated Vertical Divider */}
              <div className="h-6 w-[2px] bg-slate-300 mx-0.5 shrink-0" aria-hidden="true" />

              {/* Schoolhouse Workspace Menu (Chat, Bell, User Profile Dropdown) */}
              <div id="tour-header-menu" className="shrink-0">
                <SchoolhouseHeaderMenu
                  onOpenTutorModal={() => handleSelectTab("become-tutor")}
                  onOpenSettingsTab={() => handleSelectTab("settings")}
                  onOpenReferModal={() => setIsReferModalOpen(true)}
                  onOpenBugModal={() => setIsBugModalOpen(true)}
                  onOpenHelpModal={() => setIsHelpModalOpen(true)}
                  onOpenSafetyModal={() => setIsSafetyModalOpen(true)}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Content Container (Pristine grid alignment with header above) */}
        <main className="flex-1 py-6 sm:py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-10 space-y-6">
          {!isSupabaseConfigured && <p role="status" className="border-2 border-amber-300 bg-amber-50 p-4 text-sm">Đang xem giao diện. Backend chưa cấu hình Supabase; chưa thể tạo lớp, duyệt hồ sơ hoặc tính điểm thật. Xem BACKEND_SETUP.md.</p>}
          {isSupabaseConfigured && !backendAuthenticated && <p className="border-2 border-slate-300 bg-white p-4 text-sm">Hãy <Link href="/signin" className="underline font-bold">đăng nhập</Link> để ghi danh và lưu hoạt động học tập.</p>}
          {apiNotice && <div role="status" className="bg-blue-50 border-2 border-blue-200 p-4 flex justify-between gap-3"><p>{apiNotice}</p><button aria-label="Đóng thông báo" onClick={clearNotice}><X size={16}/></button></div>}
          {/* Toast notifications */}
          {bookingToast && (
            <div className="p-4 rounded-md bg-[#0F2747] text-white flex items-center justify-between gap-4 animate-slideDown shadow-lg border-2 border-amber-400">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-sm bg-[#FFC83D] text-[#0F2747] flex items-center justify-center font-black text-sm shrink-0 border-2 border-slate-300">
                  ✓
                </span>
                <p className="text-sm font-medium">{bookingToast}</p>
              </div>
              <button
                onClick={() => handleSelectTab("calendar")}
                className="px-4 py-2 rounded-sm bg-white/10 hover:bg-white/20 text-[#FFC83D] text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer border-2 border-amber-400/40"
              >
                {language === "vi" ? "Mở Lịch của tôi →" : "Open My Schedule →"}
              </button>
            </div>
          )}

          {postToast && (
            <div className="p-4 rounded-md bg-[#0F2747] text-white flex items-center justify-between gap-4 animate-slideDown shadow-lg border-2 border-amber-400">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-sm bg-[#FFC83D] text-[#0F2747] flex items-center justify-center font-black text-sm shrink-0 border-2 border-slate-300">
                  
                </span>
                <p className="text-sm font-medium">{postToast}</p>
              </div>
              <span className="text-[#FFC83D] text-xs sm:text-sm font-bold whitespace-nowrap">
                {language === "vi" ? "+5 PP đã cộng vào tài khoản" : "+5 PP added to account"}
              </span>
            </div>
          )}



          {/* ============================================================== */}
          {/* TOUR WORKSPACE WRAPPER (Targeted by Onboarding Tour Step 2) */}
          {/* ============================================================== */}
          <div id="tour-workspace" className="w-full">
          {/* TAB 1: CALENDAR (Lịch & Phiên học của tôi - Streamlined) */}
          {/* ============================================================== */}
          {activeTab === "calendar" && (
            <div className="w-full space-y-6 animate-fadeIn">
              <SchoolhouseDashboard
                onOpenApplyTutor={() => setIsApplyTutorOpen(true)}
                onNavigateClasses={() => handleSelectTab("classes")}
              />
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB: PHÒNG HỌC TRỰC TUYẾN (Clean MVP Room Hub) */}
          {/* ============================================================== */}
          {activeTab === "classes" && (
            <div className="w-full space-y-6 animate-fadeIn">
              {/* Header & Main Create Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-slate-300">
                <div>
                  <h2 className="font-poppins font-black text-2xl sm:text-3xl text-[#0F2747] tracking-tight">
                    {language === "vi" ? "Phòng Học Trực Tuyến" : "Live Study Rooms"}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#475569] mt-1 font-medium">
                    {language === "vi"
                      ? "Danh sách các buổi học kèm nhóm và phòng tự học tương tác"
                      : "Live study pods, peer mentoring sessions, and open study rooms"}
                  </p>
                </div>

                <button
                  onClick={() => setIsCreateClassOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] border-2 border-slate-300 hover:border-slate-400 text-xs font-bold shadow-2xs active:scale-95 transition cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4 text-[#4F7ECB]" />
                  <span>{language === "vi" ? "Soạn & Mở phòng học" : "Create Study Room"}</span>
                </button>
              </div>

              {/* Rooms Grid or Clean Minimalist Empty State */}
              {classes.length === 0 ? (
                <div className="bg-white rounded-md p-10 sm:p-14 border-2 border-slate-300 text-center space-y-5 shadow-xs">
                  <OwlMascot size="lg" className="mx-auto" />
                  <div className="max-w-2xl mx-auto space-y-2">
                    <h3 className="font-poppins font-bold text-xl sm:text-2xl text-[#0F2747]">
                      {language === "vi" ? "Cú Pencily chưa thấy phòng học nào đang mở" : "No live study rooms available right now"}
                    </h3>
                    <p className="text-sm text-[#4B5563] leading-relaxed max-w-lg mx-auto">
                      {language === "vi"
                        ? "Hãy tạo phòng học đầu tiên để cùng bạn bè trao đổi bài tập và học tập trực tuyến ngay!"
                        : "Be the first to open a study room and collaborate with peers online!"}
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => setIsCreateClassOpen(true)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] border-2 border-slate-300 hover:border-slate-400 text-xs font-bold shadow-2xs active:scale-95 transition cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-[#4F7ECB]" />
                      <span>{language === "vi" ? "Soạn & Mở phòng học" : "Create Study Room"}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {classes.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-md p-6 border-2 border-slate-300 hover:border-[#0F2747] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Status bar */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-sm text-xs font-semibold bg-emerald-50 text-emerald-800 border-2 border-emerald-300 shrink-0">
                            <span>
                              {item.meetUrl?.startsWith("/room/")
                                ? language === "vi" ? "Phòng Web trực tiếp" : "Web Live Room"
                                : language === "vi" ? "Đang mở" : "Active"}
                            </span>
                          </span>

                          <span className="text-xs text-[#687280] font-medium whitespace-normal flex items-center gap-1.5 ml-auto text-right">
                            <Clock className="w-3.5 h-3.5 text-[#687280] shrink-0" />
                            <span>{item.schedule}</span>
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-poppins font-bold text-lg text-[#0F2747] leading-snug mb-2">
                          {item.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-[#4B5563] line-clamp-2 leading-relaxed mb-4">
                          {item.description || (language === "vi" ? "Phòng học trao đổi kiến thức trực tiếp." : "Peer learning live room.")}
                        </p>

                        {/* Host profile preview */}
                        <div className="p-3 bg-[#FAF8F5] rounded-sm border-2 border-slate-200 mb-5 flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-sm bg-[#0F2747] text-[#FFC83D] font-bold text-xs flex items-center justify-center shrink-0 border border-slate-300">
                            {item.tutorName?.charAt(0) || "P"}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-xs text-[#0F2747] break-words">
                              {item.tutorName}
                            </div>
                            <div className="text-[11px] text-[#687280]">
                              {language === "vi" ? "Host phòng học" : "Room Host"}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Direct Join Action & Delete Option */}
                      <div className="space-y-2 pt-2 border-t-2 border-slate-100">
                        <a
                          href={item.meetUrl || "https://discord.gg/6hpEf4wC4z"}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full py-2.5 px-4 rounded-sm text-xs font-bold text-[#0F2747] bg-white hover:bg-slate-50 border-2 border-slate-300 hover:border-slate-400 flex items-center justify-center gap-2 shadow-2xs transition active:scale-98 cursor-pointer group"
                        >
                          <span>{language === "vi" ? "Vào phòng học ngay" : "Join Room Now"}</span>
                          <ArrowRight className="w-4 h-4 text-[#4F7ECB] group-hover:translate-x-0.5 transition-transform" />
                        </a>

                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Bạn có chắc muốn xóa phòng "${item.title}"?`)) {
                              deleteClass(item.id);
                            }
                          }}
                          className="w-full py-1 text-xs text-slate-400 hover:text-red-600 transition text-center cursor-pointer"
                        >
                          {language === "vi" ? "Xóa phòng này" : "Delete room"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: COMMUNITY (Cộng đồng & Bảng tin) */}
          {/* ============================================================== */}
          {activeTab === "community" && (
            <div className="w-full space-y-6 animate-fadeIn">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-slate-300">
                <div>
                  <h2 className="font-poppins font-black text-2xl sm:text-3xl text-[#0F2747] tracking-tight">
                    {language === "vi" ? "Cộng Đồng & Bảng Tin" : "Community & Bulletin Board"}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#475569] mt-1 font-medium">
                    {language === "vi"
                      ? "Diễn đàn trao đổi học thuật, chia sẻ tài liệu và hỏi đáp đồng trang lứa"
                      : "Academic peer discussions, notes exchange, and community Q&A"}
                  </p>
                </div>

                <button
                  onClick={() => setIsCreatePostOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] border-2 border-slate-300 hover:border-slate-400 text-xs font-bold shadow-2xs active:scale-95 transition cursor-pointer self-start sm:self-auto shrink-0"
                >
                  <Plus className="w-3.5 h-3.5 text-[#4F7ECB]" />
                  <span>{language === "vi" ? "Đăng bài / Hỏi đáp (+5 PP)" : "Post / Q&A (+5 PP)"}</span>
                </button>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-4 overflow-x-auto border-b-2 border-slate-300 no-scrollbar pb-0.5">
                {[
                  { id: "all", labelVi: "Tất cả bài viết", labelEn: "All Posts" },
                  { id: "docs", labelVi: "Tài liệu Cornell", labelEn: "Cornell Notes" },
                  { id: "doubt", labelVi: "Hỏi bài Doubt-Clearing", labelEn: "Doubt-Clearing" },
                  { id: "announcement", labelVi: "Thông báo lớp mới", labelEn: "Class Alerts" },
                  { id: "tips", labelVi: "Kinh nghiệm học tập", labelEn: "Study Tips" },
                ].map((cat) => {
                  const label = language === "vi" ? cat.labelVi : cat.labelEn;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setCommunityCategory(cat.id)}
                      className={`pb-2.5 text-xs font-bold whitespace-nowrap transition-all cursor-pointer border-b-2 -mb-[2px] ${
                        communityCategory === cat.id
                          ? "text-[#0F2747] border-[#0F2747]"
                          : "text-[#64748B] border-transparent hover:text-[#0F2747]"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Posts Feed Grid or Clean Empty State */}
              {filteredPosts.length === 0 ? (
                <div className="bg-white rounded-md p-10 sm:p-14 border-2 border-slate-300 text-center space-y-5 shadow-2xs">
                  <OwlMascot size="lg" className="mx-auto" />
                  <div className="max-w-lg mx-auto space-y-2">
                    <h3 className="font-poppins font-black text-xl text-[#0F2747]">
                      {language === "vi" ? "Cú Pencily chưa thấy bài thảo luận nào" : "No discussions yet"}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                      {language === "vi"
                        ? "Hãy là người đầu tiên đặt câu hỏi về bài tập khó, chia sẻ tài liệu Cornell hoặc kinh nghiệm tự học của bạn cùng các bạn học sinh!"
                        : "Be the first to ask questions, share Cornell notes, or post study experiences!"}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => setIsCreatePostOpen(true)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] border-2 border-slate-300 hover:border-slate-400 text-xs font-bold shadow-2xs active:scale-95 transition cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#4F7ECB]" />
                      <span>{language === "vi" ? "Đăng bài thảo luận đầu tiên (+5 PP)" : "Create First Post (+5 PP)"}</span>
                    </button>
                    <a
                      href="https://discord.gg/6hpEf4wC4z"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] border-2 border-slate-300 hover:border-slate-400 text-xs font-bold shadow-2xs active:scale-95 transition"
                    >
                      <span>{language === "vi" ? "Thảo luận trên Discord" : "Discuss on Discord"}</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.map((post) => {
                    const isLiked = !!post.hasLiked;
                    return (
                      <div
                        key={post.id}
                        className="bg-white rounded-md p-6 sm:p-7 border-2 border-slate-300 hover:border-[#0F2747] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                      >
                        <div>
                          {/* Author info */}
                          <div className="flex items-start justify-between gap-3 mb-4">
                            <div className="flex items-center gap-3.5">
                              <div className="w-10 h-10 rounded-sm bg-[#0F2747] text-[#FFC83D] font-extrabold text-sm flex items-center justify-center border-2 border-slate-300 shadow-2xs">
                                {post.author.avatar}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-sm text-[#0F2747]">
                                    {post.author.name}
                                  </span>
                                  {post.author.verified && (
                                    <span className="text-xs font-bold bg-[#22C55E]/15 text-[#16A34A] px-2 py-0.5 rounded-sm border border-emerald-300 flex items-center gap-1">
                                      <CheckCircle2 className="w-3 h-3" />
                                      Tutor
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-[#687280] mt-0.5">
                                  {post.author.school} • {post.timeAgo}
                                </p>
                              </div>
                            </div>

                            <span
                              className={`text-xs font-bold px-2.5 py-0.5 rounded-sm uppercase tracking-wider border-2 border-slate-200 ${post.categoryBadge}`}
                            >
                              {post.categoryLabel}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="font-poppins font-bold text-base sm:text-lg text-[#0F2747] leading-snug mb-2.5">
                            {post.title}
                          </h3>

                          {/* Content text */}
                          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-5 whitespace-pre-line">
                            {post.content}
                          </p>

                          {/* Attached Material (if any) */}
                          {post.attachment && (
                            <div className="p-3 bg-[#FFF9EF] rounded-sm border-2 border-slate-300 flex items-center justify-between mb-5">
                              <div className="flex items-center gap-3 text-xs text-[#0F2747]">
                                <BookOpen className="w-4 h-4 text-[#4F7ECB]" />
                                <div>
                                  <div className="font-bold">{post.attachment.name}</div>
                                  <div className="text-[11px] text-[#687280]">
                                    {post.attachment.size} • {language === "vi" ? "Đã kiểm duyệt" : "Verified"}
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => alert(`Đã tải tài liệu: ${post.attachment?.name}`)}
                                className="p-2 rounded-sm bg-white border-2 border-slate-300 hover:border-[#0F2747] text-[#0F2747] transition cursor-pointer"
                                title={language === "vi" ? "Tải tài liệu" : "Download"}
                              >
                                <Download className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Footer Actions */}
                        <div className="pt-3 border-t-2 border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => toggleLikePost(post.id)}
                              className={`flex items-center gap-1.5 text-xs font-bold transition cursor-pointer ${
                                isLiked ? "text-[#EF4444]" : "text-[#687280] hover:text-[#0F2747]"
                              }`}
                            >
                              <Heart
                                className={`w-4 h-4 ${isLiked ? "fill-[#EF4444]" : ""}`}
                              />
                              <span>{post.likes}</span>
                            </button>

                            <button
                              onClick={() =>
                                setActiveCommentPostId(
                                  activeCommentPostId === post.id ? null : post.id
                                )
                              }
                              className="flex items-center gap-1.5 text-xs font-bold text-[#687280] hover:text-[#0F2747] transition cursor-pointer"
                            >
                              <MessageSquare className="w-4 h-4" />
                              <span>{post.commentsCount} {language === "vi" ? "trả lời" : "replies"}</span>
                            </button>
                          </div>

                          <a
                            href={post.discordThreadUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5865F2] hover:text-[#4752C4] bg-[#5865F2]/10 border-2 border-[#5865F2]/30 px-2.5 py-1.5 rounded-sm transition"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>{post.discordChannel}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>

                        {/* Interactive Comments Drawer */}
                        {activeCommentPostId === post.id && (
                          <div className="pt-3 border-t-2 border-slate-100 space-y-3 mt-3 animate-fadeIn">
                            {/* Existing comments list */}
                            {post.comments && post.comments.length > 0 ? (
                              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                                {post.comments.map((comment) => (
                                  <div
                                    key={comment.id}
                                    className="p-2.5 bg-[#FFF9EF] rounded-sm border-2 border-slate-200 text-xs text-[#0F2747]"
                                  >
                                    <div className="flex items-center justify-between font-bold mb-1">
                                      <span>{comment.authorName}</span>
                                      <span className="text-[10px] text-[#687280] font-normal">
                                        {comment.createdAt}
                                      </span>
                                    </div>
                                    <p className="text-[#4B5563] whitespace-pre-line leading-relaxed text-xs">
                                      {comment.text}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-xs text-[#687280] italic">
                                {language === "vi"
                                  ? "Chưa có câu trả lời nào. Hãy là người đầu tiên giải đáp!"
                                  : "No replies yet. Be the first to answer!"}
                              </p>
                            )}

                            {/* Inline reply form */}
                            <div className="flex items-center gap-2 pt-1">
                              <input
                                type="text"
                                placeholder={
                                  language === "vi"
                                    ? "Viết câu trả lời hoặc trao đổi thêm..."
                                    : "Write a helpful reply..."
                                }
                                value={commentInputs[post.id] || ""}
                                onChange={(e) =>
                                  setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" && commentInputs[post.id]?.trim()) {
                                    addCommentToPost(post.id, commentInputs[post.id]);
                                    setCommentInputs({ ...commentInputs, [post.id]: "" });
                                  }
                                }}
                                className="flex-1 px-3 py-2 bg-white rounded-sm border-2 border-slate-300 text-xs focus:outline-none focus:border-[#0F2747]"
                              />
                              <button
                                onClick={() => {
                                  if (commentInputs[post.id]?.trim()) {
                                    addCommentToPost(post.id, commentInputs[post.id]);
                                    setCommentInputs({ ...commentInputs, [post.id]: "" });
                                  }
                                }}
                                className="px-3.5 py-2 bg-[#0F2747] hover:bg-[#1A3E6D] text-white rounded-sm text-xs font-bold transition shadow-2xs cursor-pointer border-2 border-slate-700"
                              >
                                {language === "vi" ? "Gửi (+2 PP)" : "Reply (+2 PP)"}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 4: DISCORD SERVER (Giới thiệu máy chủ Discord) */}
          {/* ============================================================== */}
          {activeTab === "discord" && (
            <div className="w-full space-y-6 animate-fadeIn">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-slate-300">
                <div>
                  <h2 className="font-poppins font-black text-2xl sm:text-3xl text-[#0F2747] tracking-tight">
                    {language === "vi" ? "Máy Chủ Discord The Pencily" : "The Pencily Discord Community"}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#475569] mt-1 font-medium">
                    {language === "vi"
                      ? "Không gian học tập thời gian thực, phòng học thoại và kết nối trực tiếp với Peer Tutors"
                      : "Real-time study voice rooms, live channels, and direct peer tutor mentorship"}
                  </p>
                </div>
                <a
                  href="https://discord.gg/6hpEf4wC4z"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold shadow-2xs active:scale-95 transition cursor-pointer shrink-0"
                >
                  <DiscordLogo className="w-4 h-4 fill-white" />
                  <span>{language === "vi" ? "Tham gia Discord" : "Join Discord"}</span>
                </a>
              </div>

              {/* Discord UI Mockup */}
              <div className="rounded-md bg-[#1E1F22] text-slate-200 border-2 border-slate-600 shadow-lg overflow-hidden">
                {/* Title Bar */}
                <div className="bg-[#111214] px-4 py-3 flex items-center justify-between border-b-2 border-[#2B2D31]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">The Pencily: Discord Community</span>
                  </div>
                  <span className="inline-flex items-center text-[11px] font-semibold text-[#57F287] bg-[#57F287]/10 px-2 py-0.5 rounded-sm border border-[#57F287]/30">
                    Online
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 min-h-[360px]">
                  {/* Sidebar Channels */}
                  <div className="md:col-span-4 bg-[#2B2D31] p-3 border-r-2 border-[#1E1F22] space-y-3">
                    <div className="flex items-center justify-between p-2 rounded-sm bg-[#1E1F22]">
                      <span className="font-extrabold text-sm text-white">
                        The Pencily Server
                      </span>
                    </div>

                    {/* Channel Categories */}
                    <div className="space-y-2.5 text-xs">
                      <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-1 mb-1">
                          {language === "vi" ? "Chào Mừng" : "Welcome"}
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-sm text-slate-400">
                            <Hash className="w-3.5 h-3.5" />
                            <span>thong-bao-chung</span>
                          </div>
                          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-sm text-slate-400">
                            <Hash className="w-3.5 h-3.5" />
                            <span>quy-tac-ung-xu</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-1 mb-1">
                          {language === "vi" ? "Diễn Đàn Học Tập" : "Study Forum"}
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-sm bg-[#35373C] text-white font-bold">
                            <Hash className="w-3.5 h-3.5" />
                            <span>hoi-dap-toan-hoc</span>
                          </div>
                          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-sm text-slate-400">
                            <Hash className="w-3.5 h-3.5" />
                            <span>ielts-peer-practice</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-1 mb-1">
                          {language === "vi" ? "Phòng Học Trực Tuyến" : "Voice Rooms"}
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-sm text-[#57F287]">
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>🔊 {language === "vi" ? "Phòng Học Tập 24/7" : "Study Room 24/7"}</span>
                          </div>
                          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-sm text-[#57F287]">
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>🔊 Lớp Web Dev</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Roles */}
                    <div className="pt-3 border-t-2 border-[#35373C] text-[11px] space-y-1.5">
                      <div className="text-slate-400 font-bold uppercase text-[10px] tracking-wider px-1">
                        {language === "vi" ? "Vai trò" : "Roles"}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <span className="px-2 py-0.5 rounded-sm bg-[#ED4245]/20 text-[#ED4245] font-bold border border-[#ED4245]/30">
                          👑 Core Team
                        </span>
                        <span className="px-2 py-0.5 rounded-sm bg-[#FAA81A]/20 text-[#FAA81A] font-bold border border-[#FAA81A]/30">
                          ✏️ Tutor
                        </span>
                        <span className="px-2 py-0.5 rounded-sm bg-[#5865F2]/20 text-[#5865F2] font-bold border border-[#5865F2]/30">
                          🎓 Learner
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Chat Area */}
                  <div className="md:col-span-8 bg-[#313338] p-5 flex flex-col justify-between">
                    <div className="flex items-center gap-2 pb-3 border-b-2 border-[#3F4147] text-sm font-bold text-white">
                      <Hash className="w-4 h-4 text-slate-400" />
                      <span>thong-bao-chung</span>
                    </div>

                    {/* Messages */}
                    <div className="py-4 space-y-4 text-xs sm:text-sm flex-1">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-sm bg-[#5865F2] flex items-center justify-center text-white flex-shrink-0">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#5865F2]">Pencily Bot</span>
                            <span className="bg-[#5865F2] text-white text-[9px] px-1 rounded-xs font-semibold">BOT</span>
                          </div>
                          <p className="mt-1 text-slate-200 leading-relaxed bg-[#2B2D31] p-3 rounded-sm border-2 border-[#3F4147]">
                            🎉 Chào mừng đến với <strong>The Pencily</strong>! Chọn môn học tại kênh <code className="text-[#FFC83D] bg-[#1E1F22] px-1 rounded-xs text-[11px]">#nhan-role</code> để nhận quyền truy cập phòng voice tương ứng nhé!
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-sm bg-[#FFC83D] flex items-center justify-center text-[#0F2747] font-bold text-xs flex-shrink-0 border border-amber-500">
                          👑
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#FFC83D]">Academic Team</span>
                          </div>
                          <p className="mt-1 text-slate-300 leading-relaxed">
                            {language === "vi"
                              ? "Tất cả phòng Voice học tập 24/7 và giải đáp bài vở đều mở tự do, hoàn toàn phi lợi nhuận. Cùng nhau học hỏi nhé! 📚"
                              : "All 24/7 study rooms and Q&A spaces are completely free and non-profit. Let's learn together! 📚"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Join Banner */}
                    <div className="pt-4 border-t-2 border-[#3F4147] flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="text-xs text-slate-300 text-center sm:text-left">
                        {language === "vi" ? "Tham gia ngay để học cùng bạn bè!" : "Join now to study with peers!"}
                      </div>
                      <a
                        href="https://discord.gg"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-xs border-2 border-indigo-400 shadow transition-colors"
                      >
                        <DiscordLogo className="w-3.5 h-3.5" />
                        <span>{language === "vi" ? "Tham gia Discord" : "Join Discord"}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-sm p-5 border-2 border-slate-300 shadow-xs text-center">
                  <Volume2 className="w-6 h-6 text-[#5865F2] mx-auto mb-2" />
                  <div className="font-jakarta font-bold text-sm text-[#0F2747]">
                    {language === "vi" ? "Voice 24/7" : "24/7 Voice Rooms"}
                  </div>
                  <p className="text-xs text-[#687280] mt-1">
                    {language === "vi" ? "Phòng học mở tự do, bật mic hỏi bài bất kỳ lúc nào." : "Open study rooms, speak and ask questions anytime."}
                  </p>
                </div>
                <div className="bg-white rounded-sm p-5 border-2 border-slate-300 shadow-xs text-center">
                  <MessageSquare className="w-6 h-6 text-[#FFC83D] mx-auto mb-2" />
                  <div className="font-jakarta font-bold text-sm text-[#0F2747]">
                    {language === "vi" ? "Hỏi đáp theo môn" : "Subject Channels"}
                  </div>
                  <p className="text-xs text-[#687280] mt-1">
                    {language === "vi" ? "Kênh text riêng cho Toán, Lý, Hóa, Anh, Tin,..." : "Dedicated channels for Math, Physics, English, Coding..."}
                  </p>
                </div>
                <div className="bg-white rounded-sm p-5 border-2 border-slate-300 shadow-xs text-center">
                  <Users className="w-6 h-6 text-[#22C55E] mx-auto mb-2" />
                  <div className="font-jakarta font-bold text-sm text-[#0F2747]">
                    {language === "vi" ? "Kết nối bạn bè" : "Peer Network"}
                  </div>
                  <p className="text-xs text-[#687280] mt-1">
                    {language === "vi" ? "Gặp gỡ học sinh từ các trường khác cùng chí hướng." : "Connect with like-minded high schoolers across Vietnam."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 5: PROFILE (Hồ sơ học sinh & Lộ trình Peer Tutor) */}
          {/* ============================================================== */}
          {activeTab === "profile" && (
            <div className="w-full space-y-6 animate-fadeIn">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-slate-300">
                <div>
                  <h2 className="font-poppins font-black text-2xl sm:text-3xl text-[#0F2747] tracking-tight">
                    {language === "vi" ? "Hồ Sơ Học Sinh & Chứng Nhận" : "Student Profile & Credentials"}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#475569] mt-1 font-medium">
                    {language === "vi"
                      ? "Thông tin tài khoản, danh hiệu cống hiến và chứng chỉ hoạt động ngoại khóa"
                      : "Student profile, community credentials, and verified extracurricular certificate"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] border-2 border-slate-300 hover:border-[#0F2747] text-xs font-bold shadow-2xs active:scale-95 transition cursor-pointer shrink-0 self-start sm:self-auto"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#4F7ECB]" />
                  <span>{language === "vi" ? "Chỉnh sửa hồ sơ" : "Edit Profile"}</span>
                </button>
              </div>

              {/* 1. OFFICIAL CERTIFICATION PORTFOLIO BANNER (Schoolhouse.world Style) */}
              <div className="bg-gradient-to-r from-emerald-50/80 via-teal-50/40 to-white rounded-md border-2 border-emerald-600/50 p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
                <div className="flex items-center gap-5 sm:gap-6 z-10">
                  {/* Certification Ribbon Badge */}
                  <div className="relative shrink-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-md bg-emerald-800 text-white flex flex-col items-center justify-center font-black border-2 border-emerald-950 shadow-sm">
                      <Award className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-200" />
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] uppercase tracking-wider font-extrabold text-emerald-800 flex items-center gap-1.5">
                      <span>{language === "vi" ? "HỒ SƠ CHỨNG NHẬN HOẠT ĐỘNG" : "CERTIFICATION PORTFOLIO"}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <h3 className="font-poppins font-black text-2xl sm:text-3xl text-[#0F2747]">
                        {user.realName || user.name}
                      </h3>
                      <button
                        onClick={() => setIsEditProfileOpen(true)}
                        className="p-1 hover:bg-slate-200/50 rounded-xs text-slate-500 hover:text-[#0F2747] transition cursor-pointer"
                        title={language === "vi" ? "Chỉnh sửa họ tên hiển thị" : "Edit display name"}
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 font-medium">
                      {language === "vi"
                        ? "Thành viên The Pencily • Tham gia từ tháng 04/2026"
                        : "Member since April 2026 • The Pencily"}
                    </p>
                  </div>
                </div>

                {/* Right Actions: Direct Download Certificate & Edit Profile */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 z-10">
                  {/* DOWNLOAD CERTIFICATE BUTTON (Downloads PDF directly to disk) */}
                  <button
                    onClick={() => downloadPencilyCertificatePdf(user, language)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm border-2 border-emerald-900 shadow-2xs transition active:scale-95 cursor-pointer shrink-0"
                  >
                    <Download className="w-4 h-4 text-emerald-100" />
                    <span>{language === "vi" ? "Download Certificate (PDF)" : "Download Certificate (PDF)"}</span>
                  </button>

                  <button
                    onClick={() => setIsEditProfileOpen(true)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] border-2 border-slate-300 hover:border-[#0F2747] text-xs font-semibold shadow-2xs transition active:scale-95 cursor-pointer shrink-0"
                  >
                    <span>{language === "vi" ? "Sửa Thông Tin" : "Edit Profile"}</span>
                  </button>
                </div>
              </div>

              {/* Sub-bar: Certified By & Issue Date */}
              <div className="px-4 py-2.5 bg-white rounded-sm border-2 border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-600 -mt-2">
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-slate-400 font-bold uppercase">{language === "vi" ? "Chứng thực bởi:" : "Certified by:"}</span>
                  <span className="font-bold text-[#0F2747]">Academic Board • The Pencily</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-slate-400 font-bold uppercase">{language === "vi" ? "Ngày cấp:" : "Issue Date:"}</span>
                  <span className="font-bold text-[#0F2747]">
                    {new Date().toLocaleDateString("en-US")}
                  </span>
                </div>
              </div>

              {/* 2. Top Identity Card */}
              <div className="bg-white rounded-md p-6 sm:p-7 border-2 border-slate-300 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-sm bg-[#0F2747] text-[#FFC83D] font-black text-2xl flex items-center justify-center shadow-md shrink-0 overflow-hidden border-2 border-slate-300">
                    {user.avatar?.startsWith("http") ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      user.avatar || "P"
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-bold text-lg sm:text-xl text-[#0F2747]">{user.name}</h3>
                      <span className="text-xs font-bold bg-[#22C55E]/15 text-[#16A34A] px-2.5 py-0.5 rounded-sm border border-emerald-300 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#687280] mt-1 font-medium">
                      {user.school} • {user.grade} • {user.role}
                    </p>
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-[#5865F2] mt-1.5">
                      <DiscordLogo className="w-4 h-4" />
                      <span>Discord: {user.discord || (language === "vi" ? "Chưa liên kết" : "Not connected")}</span>
                      {user.isDiscordLinked && (
                        <span className="text-[10px] px-2 py-0.5 rounded-sm bg-[#5865F2]/15 text-[#5865F2] font-sans font-bold border border-[#5865F2]/30">
                          OAuth2 Linked
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={() => handleSelectTab("become-tutor")}
                    className="px-4 py-2.5 rounded-sm bg-[#FFC83D] hover:bg-[#EAB308] text-[#0F2747] text-xs sm:text-sm font-bold shadow-xs transition active:scale-95 cursor-pointer border-2 border-amber-500"
                  >
                    {language === "vi" ? "Trở thành Peer Tutor" : "Become Peer Tutor"}
                  </button>
                </div>
              </div>

              {/* 4 Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-5 sm:p-6 rounded-sm border-2 border-slate-300 shadow-2xs">
                  <div className="text-xs text-[#687280] flex items-center justify-between font-bold uppercase tracking-wider">
                    <span>{language === "vi" ? "Điểm tích lũy" : "Points"}</span>
                    <Trophy className="w-4 h-4 text-[#EAB308]" />
                  </div>
                  <div className="font-black text-2xl sm:text-3xl text-[#0F2747] mt-2">
                    {user.points} PP
                  </div>
                </div>

                <div className="bg-white p-5 sm:p-6 rounded-sm border-2 border-slate-300 shadow-2xs">
                  <div className="text-xs text-[#687280] flex items-center justify-between font-bold uppercase tracking-wider">
                    <span>{language === "vi" ? "Thời gian học" : "Study Time"}</span>
                    <Clock className="w-4 h-4 text-[#4F7ECB]" />
                  </div>
                  <div className="font-black text-2xl sm:text-3xl text-[#0F2747] mt-2">
                    {user.learningMinutes}m
                  </div>
                </div>

                <div className="bg-white p-5 sm:p-6 rounded-sm border-2 border-slate-300 shadow-2xs">
                  <div className="text-xs text-[#687280] flex items-center justify-between font-bold uppercase tracking-wider">
                    <span>{language === "vi" ? "Buổi đã học" : "Sessions"}</span>
                    <BookOpen className="w-4 h-4 text-[#16A34A]" />
                  </div>
                  <div className="font-black text-2xl sm:text-3xl text-[#0F2747] mt-2">
                    {user.sessionsAttended}
                  </div>
                </div>

                <div className="bg-white p-5 sm:p-6 rounded-sm border-2 border-slate-300 shadow-2xs">
                  <div className="text-xs text-[#687280] flex items-center justify-between font-bold uppercase tracking-wider">
                    <span>{language === "vi" ? "Xếp hạng tuần" : "Weekly Rank"}</span>
                    <Award className="w-4 h-4 text-[#EF4444]" />
                  </div>
                  <div className="font-black text-2xl sm:text-3xl text-[#0F2747] mt-2">
                    #{user.rank}
                  </div>
                </div>
              </div>

              {/* Badges Grid */}
              <div className="bg-white p-6 sm:p-7 rounded-md border-2 border-slate-300 shadow-2xs space-y-4">
                <h4 className="font-bold text-xs text-[#0F2747] uppercase tracking-wider">
                  {language === "vi" ? "Bộ Sưu Tập Huy Hiệu" : "Badges Collection"}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {user.badges.map((b, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-sm border-2 text-center text-xs font-bold ${b.color}`}
                    >
                      🏅 {b.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB: BECOME TUTOR (Trở thành Peer Tutor - 2-Column Split View) */}
          {/* ============================================================== */}
          {activeTab === "become-tutor" && (
            <div className="space-y-6 animate-fadeIn w-full">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-slate-300">
                <div>
                  <h2 className="font-poppins font-black text-2xl sm:text-3xl text-[#0F2747] tracking-tight">
                    {language === "vi" ? "Trở thành Peer Tutor" : "Become a Peer Tutor"}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#475569] mt-1 font-medium">
                    {language === "vi"
                      ? "Đơn đăng ký ứng tuyển Peer Tutor (Học kèm bạn bè) • The Pencily"
                      : "Peer Tutor Application Form • The Pencily"}
                  </p>
                </div>

                <a
                  href="https://forms.gle/y7143v1g2qCMjPZU8"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] border-2 border-slate-300 hover:border-[#0F2747] text-xs sm:text-sm font-bold shadow-2xs active:scale-95 transition cursor-pointer shrink-0"
                >
                  <span>{language === "vi" ? "Mở trên Google Forms" : "Open in Google Forms"}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#4F7ECB]" />
                </a>
              </div>

              {/* 2-Column Grid: Form Embed on Left + Informative Companion Panel on Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
                {/* Left Column: Google Form Embed (Optimized naturally fitting frame) */}
                <div className="lg:col-span-7 xl:col-span-8 min-w-0 w-full bg-white rounded-md border-2 border-slate-300 shadow-2xs overflow-hidden">
                  <div className="px-4 py-2.5 bg-[#FFFDF9] border-b-2 border-slate-200 flex items-center justify-between text-xs font-bold text-[#0F2747]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-[#FFC83D] border border-[#0F2747]" />
                      <span>{language === "vi" ? "Biểu Mẫu Google Forms Trực Tiếp" : "Live Google Forms Application"}</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 font-normal">
                      The Pencily
                    </span>
                  </div>
                  <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSfNSYz6QjgEi_C_yx2TAFdtYkus8_ncFT-SKnk_-4IargrFTg/viewform?embedded=true"
                    width="100%"
                    height="920"
                    className="w-full max-w-full min-h-[920px] border-0 overflow-hidden"
                    title="Đơn đăng ký Peer Tutor The Pencily"
                  >
                    {language === "vi" ? "Đang tải biểu mẫu ứng tuyển..." : "Loading application form..."}
                  </iframe>
                </div>

                {/* Right Column: Perks, Selection Timeline & Support Sidebar */}
                <div className="lg:col-span-5 xl:col-span-4 min-w-0 w-full space-y-4">
                  {/* Card 1: Quyền lợi & Minh chứng ngoại khóa */}
                  <div className="p-5 rounded-md bg-white border-2 border-slate-300 shadow-2xs space-y-3.5">
                    <div className="flex items-center gap-2 pb-2 border-b-2 border-slate-100">
                      <Award className="w-4 h-4 text-amber-600" />
                      <h3 className="font-poppins font-black text-xs uppercase tracking-wider text-[#0F2747]">
                        {language === "vi" ? "Quyền Lợi Peer Tutor" : "Tutor Perks & Verification"}
                      </h3>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="p-2.5 rounded-sm bg-[#FFFDF9] border border-amber-200/80">
                        <div className="font-bold text-[#0F2747] flex items-center gap-1.5">
                          <span>📜</span>
                          <span>{language === "vi" ? "Chứng Nhận Ngoại Khóa Verified" : "Verified Activity Certificate"}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                          {language === "vi"
                            ? "Chứng nhận số có mã xác thực cho bài luận xin học bổng, du học và xét tuyển đại học."
                            : "Digital verifiable certificate for scholarship essays and admissions dossiers."}
                        </p>
                      </div>

                      <div className="p-2.5 rounded-sm bg-slate-50 border border-slate-200">
                        <div className="font-bold text-[#0F2747] flex items-center gap-1.5">
                          <span>⚡</span>
                          <span>{language === "vi" ? "+30 PP / Mỗi Giờ Đứng Lớp" : "+30 PP / Each Teaching Hour"}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                          {language === "vi"
                            ? "Tích lũy điểm Pencily Points vượt trội để mở khóa kho tài liệu nâng cao và đặc quyền tại PP Shop."
                            : "Accelerated PP accumulation to redeem exclusive study vaults and academic perks."}
                        </p>
                      </div>

                      <div className="p-2.5 rounded-sm bg-slate-50 border border-slate-200">
                        <div className="font-bold text-[#0F2747] flex items-center gap-1.5">
                          <span>🤝</span>
                          <span>{language === "vi" ? "Mạng Lưới Tutor Xuất Sắc" : "Elite Peer Network"}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                          {language === "vi"
                            ? "Đồng hành cùng học sinh chuyên, Tutors SAT 1500+, IELTS 8.0+ và giải HSG quốc gia."
                            : "Collaborate directly alongside specialized peers, SAT 1500+ and IELTS 8.0+ mentors."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Lộ trình tuyển chọn 4 bước */}
                  <div className="p-5 rounded-md bg-white border-2 border-slate-300 shadow-2xs space-y-3.5">
                    <div className="flex items-center gap-2 pb-2 border-b-2 border-slate-100">
                      <Clock className="w-4 h-4 text-[#4F7ECB]" />
                      <h3 className="font-poppins font-black text-xs uppercase tracking-wider text-[#0F2747]">
                        {language === "vi" ? "Lộ Trình Tuyển Chọn (4 Bước)" : "Selection Process (4 Steps)"}
                      </h3>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-xs bg-[#0F2747] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                          1
                        </span>
                        <div>
                          <span className="font-bold text-[#0F2747]">{language === "vi" ? "Nộp đơn Google Form" : "Submit Form"}</span>
                          <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                            {language === "vi" ? "Điền đầy đủ thông tin vào biểu mẫu bên cạnh." : "Complete the adjacent form."}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-xs bg-slate-200 text-[#0F2747] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 border border-slate-300">
                          2
                        </span>
                        <div>
                          <span className="font-bold text-[#0F2747]">{language === "vi" ? "Thẩm định hồ sơ" : "Screening"}</span>
                          <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                            {language === "vi" ? "Đối chiếu học bạ, điểm test SAT/IELTS hoặc giải HSG." : "Review academic track record & scores."}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-xs bg-slate-200 text-[#0F2747] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 border border-slate-300">
                          3
                        </span>
                        <div>
                          <span className="font-bold text-[#0F2747]">{language === "vi" ? "Dạy thử 15 phút" : "15-min Mock Session"}</span>
                          <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                            {language === "vi" ? "Buổi demo ngắn trên Discord Voice Pod." : "Short demo on Discord Voice Pod."}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-xs bg-emerald-700 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                          4
                        </span>
                        <div>
                          <span className="font-bold text-[#0F2747]">{language === "vi" ? "Cấp quyền & Khai giảng" : "Certification & Launch"}</span>
                          <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                            {language === "vi" ? "Gia nhập ban học vụ và bắt đầu đứng lớp." : "Join academic team and start hosting pods."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Cam kết & Hỗ trợ Discord */}
                  <div className="p-4 rounded-md bg-[#FFFDF9] border-2 border-slate-300 shadow-2xs space-y-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span className="font-bold text-xs text-[#0F2747]">
                        {language === "vi" ? "The Pencily Honor Code" : "The Pencily Honor Code"}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {language === "vi"
                        ? "100% Phi lợi nhuận: Mọi buổi dạy kèm đều miễn phí cho học sinh. Tutors cam kết chia sẻ tận tâm và tôn trọng mọi người học."
                        : "100% Non-profit: All sessions are free. Peer tutors pledge patience, kindness, and equity."}
                    </p>
                    <a
                      href="https://discord.gg/6hpEf4wC4z"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-sm bg-[#0F2747] hover:bg-[#1A3E6D] text-white text-xs font-bold transition shadow-2xs cursor-pointer"
                    >
                      <span>{language === "vi" ? "Kênh Hỏi Đáp Ứng Tuyển Trên Discord" : "Join Tutor Discord Channel"}</span>
                      <ExternalLink className="w-3 h-3 text-[#FFC83D]" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "academic" && <AcademicWorkspace />}
          {activeTab === "assistant" && <AssistantWorkspace />}

          {/* ============================================================== */}
          {/* TAB: CLASS VIDEOS LIBRARY (Thư viện video lớp học) */}
          {/* ============================================================== */}
          {activeTab === "videos" && (
            <ClassVideoLibrary
              onGoToProfile={() => handleSelectTab("profile")}
              onOpenExchangeShop={() => setIsExchangeShopOpen(true)}
              onGoToClasses={() => handleSelectTab("classes")}
            />
          )}

          {/* ============================================================== */}
          {/* TAB: LEADERBOARD (Bảng xếp hạng) */}
          {/* ============================================================== */}
          {activeTab === "leaderboard" && (
            <DashboardLeaderboard
              onGoToClasses={() => handleSelectTab("classes")}
              onGoToVideos={() => handleSelectTab("videos")}
            />
          )}

          {/* ============================================================== */}
          {/* TAB: SHOP (Cửa hàng đổi đặc quyền PP) */}
          {/* ============================================================== */}
          {activeTab === "shop" && (
            <DashboardShop onSelectTab={handleSelectTab} />
          )}

          {/* ============================================================== */}
          {/* TAB: SETTINGS (Cài đặt hệ thống & Hồ sơ học sinh) */}
          {/* ============================================================== */}
          {activeTab === "settings" && (
            <DashboardSettings
              onOpenEditProfile={() => setIsEditProfileOpen(true)}
              onStartTour={() => setIsTourOpen(true)}
              onOpenReferModal={() => setIsReferModalOpen(true)}
            />
          )}
          </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <PPExchangeShopModal
        isOpen={isExchangeShopOpen}
        onClose={() => setIsExchangeShopOpen(false)}
        onGoToVideos={() => handleSelectTab("videos")}
      />

      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onSubmitPost={handleCreateNewPost}
      />

      <TutorApplicationModal
        isOpen={isApplyTutorOpen}
        onClose={() => setIsApplyTutorOpen(false)}
      />

      <RequestClassModal
        isOpen={isRequestClassOpen}
        onClose={() => setIsRequestClassOpen(false)}
        onSubmitRequest={(data) => {
          requestClass(data);
          setPostToast("Đã gửi đề xuất môn học (+5 PP) thành công!");
          setTimeout(() => setPostToast(null), 4000);
        }}
      />

      <TutorClassStudioDrawer
        isOpen={isCreateClassOpen}
        onClose={() => setIsCreateClassOpen(false)}
        tutorName={user.name}
        tutorSchool={user.school}
        onSubmitCreate={async (data) => {
          await addClass(data);
          setBookingToast(`Đã nộp lớp "${data.title}". Lớp chờ demo và Academic duyệt, chưa công khai.`);
          setTimeout(() => setBookingToast(null), 4000);
        }}
      />

      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        initialData={{
          name: user.name,
          school: user.school,
          grade: user.grade,
          discord: user.discord,
        }}
        onSave={(data) => {
          updateUser(data);
          setPostToast("Đã cập nhật thông tin hồ sơ thành công!");
          setTimeout(() => setPostToast(null), 4000);
        }}
      />

      <OnboardingTourModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onCompleteProfileSuccess={() => {
          setPostToast("🎉 Hoàn tất nhiệm vụ tân thủ! Bạn nhận được +20 PP!");
          setTimeout(() => setPostToast(null), 5000);
        }}
      />

      <ReferFriendModal
        isOpen={isReferModalOpen}
        onClose={() => setIsReferModalOpen(false)}
      />

      <ReportBugModal
        isOpen={isBugModalOpen}
        onClose={() => setIsBugModalOpen(false)}
        onSubmitSuccess={() => {
          setPostToast("Cảm ơn bạn! Đã ghi nhận báo cáo sự cố thành công.");
          setTimeout(() => setPostToast(null), 4000);
        }}
      />

      <HelpCenterModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />

      <SafetyReportModal
        isOpen={isSafetyModalOpen}
        onClose={() => setIsSafetyModalOpen(false)}
      />
    </div>
  );
}