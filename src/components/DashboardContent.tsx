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
import { PPExchangeShopModal } from "@/components/PPExchangeShopModal";
import {
  Sparkles,
  Calendar,
  Volume2,
  Clock,
  Trophy,
  Award,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Hash,
  Plus,
  Users,
  Search,
  Heart,
  MessageSquare,
  Download,
  ShieldCheck,
  Layers,
  Edit3,
  ThumbsUp,
  Bot,
  X,
  ChevronDown,
  Gift,
} from "lucide-react";

import { usePencily } from "@/context/PencilyContext";
import { Logo, PencilMascot } from "@/components/Logo";
import { DiscordLogo } from "@/components/BrandIcons";

export function DashboardContent({ defaultTab = "classes" }: { defaultTab?: DashboardTab }) {
  const searchParams = useSearchParams();
  const queryTab = searchParams.get("tab") as DashboardTab | null;
  const initialTab = queryTab || defaultTab;

  const {
    user,
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

  const tabTitles: Record<DashboardTab, string> = {
    calendar: "Lớp của tôi",
    classes: "Khám phá lớp học",
    videos: "Thư viện",
    leaderboard: "Bảng xếp hạng",
    community: "Cộng đồng & Hỏi bài",
    discord: "Discord Server",
    profile: "Hồ sơ học sinh",
    "become-tutor": "Trở thành Peer Tutor",
  };

  return (
    <div className="min-h-screen flex bg-[#FFF9EF] text-[#0F2747]">
      {/* 1. IMMERSIVE LEFT SIDEBAR (The anchor of the whole platform) */}
      <DashboardSidebar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      {/* 2. UNIFIED MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Sticky Workspace Top Header */}
        <header className="sticky top-0 z-30 backdrop-blur-md h-18 sm:h-20 border-b bg-[#FFF9EF]/90 border-[#0F2747]/10 text-[#0F2747]">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 h-full flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-2 group text-sm font-semibold"
                title="Về trang chủ The Pencily"
              >
                <Logo variant="nav" size="sm" priority />
              </Link>
              <span className="text-gray-400 hidden sm:inline">/</span>
              <span className="font-bold text-sm sm:text-base text-[#0F2747]">
                {tabTitles[activeTab]}
              </span>
            </div>

            <div className="flex items-center gap-3.5">
              <a
                href="https://discord.gg/6hpEf4wC4z"
                target="_blank"
                rel="noreferrer"
                className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#5865F2]/10 text-[#5865F2] hover:bg-[#5865F2]/15 text-sm font-semibold transition cursor-pointer"
              >
                <span>{onlineStudentsCount} online • {activeVoiceRoomsCount} Voice Rooms</span>
              </a>

              {/* Robux-style PP pill & popover */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsPointsMenuOpen(!isPointsMenuOpen)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-full border transition cursor-pointer text-sm font-bold active:scale-95 shadow-2xs ${
                    isPointsMenuOpen
                      ? "bg-[#FFF9EF] border-[#F59E0B] text-[#0F2747] ring-2 ring-[#F59E0B]/20"
                      : "bg-white border-[#0F2747]/10 hover:border-[#F59E0B]/50 hover:bg-[#FFF9EF]/50 text-[#0F2747]"
                  }`}
                  aria-expanded={isPointsMenuOpen}
                  aria-label="Xem quy chế và số dư Pencily Points"
                >
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-white flex items-center justify-center shadow-2xs text-[11px] font-black">
                    P
                  </div>
                  <span>{user.points} PP</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${
                      isPointsMenuOpen ? "rotate-180 text-[#F59E0B]" : ""
                    }`}
                  />
                </button>

                {isPointsMenuOpen && (
                  <>
                    {/* Click-away backdrop (no blur) */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsPointsMenuOpen(false)}
                      aria-hidden="true"
                    />

                    {/* Roblox-style PP Popover */}
                    <div className="absolute right-0 mt-2.5 w-80 sm:w-96 rounded-2xl bg-[#FFFDF9] border border-slate-200/90 shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      {/* Popover Header: Clean White */}
                      <div className="p-4 bg-white border-b border-slate-200/90 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center font-black text-slate-950 text-base shadow-xs">
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
                          className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition cursor-pointer"
                          aria-label="Đóng"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Popover Body */}
                      <div className="p-4 max-h-[70vh] overflow-y-auto space-y-4 text-xs text-[#0F2747]">
                        <div>
                          <div className="font-bold text-[13px] text-[#0F2747] mb-2 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                            <span>Quy chế tích luỹ PP</span>
                          </div>
                          <div className="space-y-1.5 bg-white p-3 rounded-xl border border-[#0F2747]/8">
                            <div className="flex items-center justify-between py-1 border-b border-gray-100 last:border-0">
                              <span className="text-gray-700">🎓 Tham gia học tương tác</span>
                              <span className="font-bold text-[#10B981]">+10 PP / buổi</span>
                            </div>
                            <div className="flex items-center justify-between py-1 border-b border-gray-100 last:border-0">
                              <span className="text-gray-700">🎬 Xem video bài học</span>
                              <span className="font-bold text-[#10B981]">+5 PP / video</span>
                            </div>
                            <div className="flex items-center justify-between py-1 border-b border-gray-100 last:border-0">
                              <span className="text-gray-700">✍️ Đăng thảo luận chia sẻ bài</span>
                              <span className="font-bold text-[#10B981]">+5 PP / bài</span>
                            </div>
                            <div className="flex items-center justify-between py-1 border-b border-gray-100 last:border-0">
                              <span className="text-gray-700">💬 Giải đáp & bình luận hỗ trợ</span>
                              <span className="font-bold text-[#10B981]">+2 PP / cmt</span>
                            </div>
                            <div className="flex items-center justify-between py-1 border-b border-gray-100 last:border-0">
                              <span className="text-gray-700">❤️ Nhận lượt thích từ bạn bè</span>
                              <span className="font-bold text-[#10B981]">+1 PP / like</span>
                            </div>
                            <div className="flex items-center justify-between py-1 border-b border-gray-100 last:border-0">
                              <span className="text-gray-700">👨‍🏫 Giảng dạy / Làm gia sư</span>
                              <span className="font-bold text-[#10B981]">+30 PP / buổi</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="font-bold text-[13px] text-[#0F2747] mb-2 flex items-center gap-1.5">
                            <Trophy className="w-3.5 h-3.5 text-[#F59E0B]" />
                            <span>Quyền lợi điểm thưởng</span>
                          </div>
                          <ul className="space-y-1 bg-white p-3 rounded-xl border border-[#0F2747]/8 text-gray-700">
                            <li className="flex items-start gap-2 py-0.5">
                              <span className="font-bold text-[#0F2747]">1.</span>
                              <span>Đổi tài liệu độc quyền & đề thi chuyên tại Exchange Shop.</span>
                            </li>
                            <li className="flex items-start gap-2 py-0.5">
                              <span className="font-bold text-[#0F2747]">2.</span>
                              <span>Đua top bảng xếp hạng vinh danh tháng & kỳ thi.</span>
                            </li>
                            <li className="flex items-start gap-2 py-0.5">
                              <span className="font-bold text-[#0F2747]">3.</span>
                              <span>Mở khoá quyền đăng ký trở thành Gia sư uy tín (Tutor).</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* Popover Footer Shortcuts with Exchange Shop */}
                      <div className="p-3 bg-gray-50/90 border-t border-[#0F2747]/8 space-y-2">
                        <button
                          type="button"
                          onClick={() => {
                            setIsExchangeShopOpen(true);
                            setIsPointsMenuOpen(false);
                          }}
                          className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs transition cursor-pointer text-center flex items-center justify-center gap-1.5 shadow-2xs active:scale-95"
                        >
                          <Gift className="w-3.5 h-3.5 fill-current" />
                          <span>Cửa Hàng Đổi Quà PP (Exchange Shop)</span>
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              handleSelectTab("videos");
                              setIsPointsMenuOpen(false);
                            }}
                            className="flex-1 py-2 px-3 rounded-xl bg-[#FFF9EF] hover:bg-amber-100 text-[#0F2747] border border-[#F59E0B]/30 font-bold text-xs transition cursor-pointer text-center"
                          >
                            Vào Thư viện (+5 PP)
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              handleSelectTab("leaderboard");
                              setIsPointsMenuOpen(false);
                            }}
                            className="flex-1 py-2 px-3 rounded-xl bg-[#0F2747] hover:bg-[#1E3A8A] text-white font-bold text-xs transition cursor-pointer text-center"
                          >
                            Bảng Xếp Hạng
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {activeTab === "community" && (
                <button
                  onClick={() => setIsCreatePostOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 text-[#0F2747] border border-slate-300 hover:border-slate-400 text-sm font-semibold transition shadow-2xs active:scale-95 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#4F7ECB]" />
                  <span>Đăng bài (+5 PP)</span>
                </button>
              )}

              {activeTab === "classes" && (
                <button
                  onClick={() => handleSelectTab("calendar")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 text-[#0F2747] border border-slate-300 hover:border-slate-400 text-sm font-semibold transition shadow-2xs active:scale-95 cursor-pointer"
                >
                  <span>Xem lịch ({registeredClassIds.length})</span>
                  <ArrowRight className="w-4 h-4 text-[#4F7ECB]" />
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Content Container (Pristine grid alignment with header above) */}
        <main className="flex-1 py-8 sm:py-10">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 space-y-8">
          {/* Toast notifications */}
          {bookingToast && (
            <div className="p-4 rounded-2xl bg-[#0F2747] text-white flex items-center justify-between gap-4 animate-slideDown shadow-lg border border-[#FFC83D]/40">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#FFC83D] text-[#0F2747] flex items-center justify-center font-black text-sm shrink-0">
                  ✓
                </span>
                <p className="text-sm font-medium">{bookingToast}</p>
              </div>
              <button
                onClick={() => handleSelectTab("calendar")}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-[#FFC83D] text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer"
              >
                Mở Lịch của tôi →
              </button>
            </div>
          )}

          {postToast && (
            <div className="p-4 rounded-2xl bg-[#0F2747] text-white flex items-center justify-between gap-4 animate-slideDown shadow-lg border border-[#FFC83D]/40">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#FFC83D] text-[#0F2747] flex items-center justify-center font-black text-sm shrink-0">
                  ★
                </span>
                <p className="text-sm font-medium">{postToast}</p>
              </div>
              <span className="text-[#FFC83D] text-xs sm:text-sm font-bold whitespace-nowrap">
                +5 PP đã cộng vào tài khoản
              </span>
            </div>
          )}

          {/* Non-intrusive Onboarding Reminder (Zero blur, zero popup) */}
          {!user.hasCompletedProfile && (
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-amber-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center shrink-0">
                  <PencilMascot size={28} />
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-sm text-[#0F2747]">
                    Chào bạn mới! Hãy hoàn thiện hồ sơ để học tập cùng The Pencily
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Cập nhật trường học, khối lớp và môn quan tâm qua trang Onboarding chỉ với 3 bước đơn giản.
                  </p>
                </div>
              </div>
              <Link
                href="/onboarding"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-xs transition shrink-0 shadow-2xs"
              >
                <span>Mở trang Onboarding</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 1: CALENDAR (Lịch & Phiên học của tôi - Streamlined) */}
          {/* ============================================================== */}
          {activeTab === "calendar" && (
            <div className="space-y-8 animate-fadeIn">
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
            <div className="space-y-6 animate-fadeIn">
              {/* Header & Main Create Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#0F2747]/10">
                <div>
                  <h2 className="font-poppins font-black text-2xl sm:text-3xl text-[#0F2747] tracking-tight">
                    Phòng Học Trực Tuyến
                  </h2>
                </div>

                <button
                  onClick={() => setIsCreateClassOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#0F2747] border border-slate-300 hover:border-slate-400 text-sm font-semibold shadow-2xs active:scale-95 transition cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4 text-[#4F7ECB]" />
                  <span>Soạn & Mở phòng học</span>
                </button>
              </div>

              {/* Rooms Grid or Clean Minimalist Empty State */}
              {classes.length === 0 ? (
                <div className="bg-white rounded-3xl p-10 sm:p-14 border border-slate-200/80 text-center space-y-5 shadow-xs">
                  <PencilMascot size="lg" className="mx-auto" />
                  <div className="max-w-2xl mx-auto space-y-2">
                    <h3 className="font-poppins font-bold text-xl sm:text-2xl text-[#0F2747]">
                      Cú Pencily chưa thấy phòng học nào đang mở
                    </h3>
                    <p className="text-sm text-[#4B5563] leading-relaxed max-w-lg mx-auto">
                      Hãy tạo phòng học đầu tiên để cùng bạn bè trao đổi bài tập và học tập trực tuyến ngay!
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => setIsCreateClassOpen(true)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-[#0F2747] border border-slate-300 hover:border-slate-400 text-sm font-semibold shadow-2xs active:scale-95 transition cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-[#4F7ECB]" />
                      <span>Soạn & Mở phòng học</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {classes.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Status bar: Dynamic scaling without text truncation */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 shrink-0">
                            <span>{item.meetUrl?.startsWith("/room/") ? "Phòng Web trực tiếp" : "Đang mở"}</span>
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
                          {item.description || "Phòng học trao đổi kiến thức trực tiếp."}
                        </p>

                        {/* Host profile preview */}
                        <div className="p-3 bg-[#FAF8F5] rounded-xl border border-slate-200/60 mb-5 flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#0F2747] text-[#FFC83D] font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                            {item.tutorName?.charAt(0) || "P"}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-xs text-[#0F2747] break-words">
                              {item.tutorName}
                            </div>
                            <div className="text-[11px] text-[#687280]">
                              Host phòng học
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Direct Join Action & Delete Option */}
                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        <a
                          href={item.meetUrl || "https://discord.gg/6hpEf4wC4z"}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-[#0F2747] bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 flex items-center justify-center gap-2 shadow-2xs transition active:scale-98 cursor-pointer group"
                        >
                          <span>Vào phòng học ngay</span>
                          <ArrowRight className="w-4 h-4 text-[#4F7ECB] group-hover:translate-x-0.5 transition-transform" />
                        </a>

                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Bạn có chắc muốn xóa phòng "${item.title}"?`)) {
                              deleteClass(item.id);
                            }
                          }}
                          className="w-full py-1.5 text-xs text-slate-400 hover:text-red-600 transition text-center cursor-pointer"
                        >
                          Xóa phòng này
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: COMMUNITY (Cộng đồng & Bảng tin - De-cluttered) */}
          {/* ============================================================== */}
          {activeTab === "community" && (
            <div className="space-y-6 animate-fadeIn">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-poppins font-black text-3xl sm:text-4xl text-[#0F2747] tracking-tight">
                    Cộng Đồng & Bảng Tin
                  </h2>
                </div>

                <button
                  onClick={() => setIsCreatePostOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 text-[#0F2747] border border-slate-300 hover:border-slate-400 text-sm font-semibold shadow-2xs active:scale-95 transition cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4 text-[#4F7ECB]" />
                  <span>Đăng bài / Hỏi đáp (+5 PP)</span>
                </button>
              </div>

              {/* Filter Tabs - Clean underline tabs without background block */}
              <div className="flex items-center gap-6 overflow-x-auto border-b border-[#0F2747]/10 no-scrollbar pb-0.5">
                {[
                  { id: "all", label: "Tất cả bài viết" },
                  { id: "docs", label: "Tài liệu Cornell" },
                  { id: "doubt", label: "Hỏi bài Doubt-Clearing" },
                  { id: "announcement", label: "Thông báo lớp mới" },
                  { id: "tips", label: "Kinh nghiệm học tập" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCommunityCategory(cat.id)}
                    className={`pb-2.5 text-sm whitespace-nowrap transition-all cursor-pointer border-b-2 ${
                      communityCategory === cat.id
                        ? "text-[#0F2747] font-bold border-[#0F2747]"
                        : "text-[#64748B] font-medium border-transparent hover:text-[#0F2747]"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Posts Feed Grid or Clean Empty State */}
              {filteredPosts.length === 0 ? (
                <div className="bg-white rounded-3xl p-10 sm:p-14 border border-slate-200/80 text-center space-y-5 shadow-2xs">
                  <PencilMascot size="lg" className="mx-auto" />
                  <div className="max-w-lg mx-auto space-y-2">
                    <h3 className="font-poppins font-black text-2xl text-[#0F2747]">
                      Cú Pencily chưa thấy bài thảo luận nào
                    </h3>
                    <p className="text-sm text-[#4B5563] leading-relaxed">
                      Hãy là người đầu tiên đặt câu hỏi về bài tập khó, chia sẻ tài liệu Cornell hoặc kinh nghiệm tự học của bạn cùng các bạn học sinh!
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => setIsCreatePostOpen(true)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-[#0F2747] border border-slate-300 hover:border-slate-400 text-sm font-semibold shadow-2xs active:scale-95 transition cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-[#4F7ECB]" />
                      <span>Đăng bài thảo luận đầu tiên (+5 PP)</span>
                    </button>
                    <a
                      href="https://discord.gg/6hpEf4wC4z"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-[#0F2747] border border-slate-300 hover:border-slate-400 text-sm font-semibold shadow-2xs active:scale-95 transition"
                    >
                      <span>Thảo luận trên Discord</span>
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
                        className="bg-white rounded-3xl p-7 sm:p-8 border border-[#0F2747]/10 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                      >
                        <div>
                          {/* Author info */}
                          <div className="flex items-start justify-between gap-3 mb-4">
                            <div className="flex items-center gap-3.5">
                              <div className="w-11 h-11 rounded-full bg-[#0F2747] text-[#FFC83D] font-extrabold text-sm flex items-center justify-center shadow-2xs">
                                {post.author.avatar}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-sm sm:text-base text-[#0F2747]">
                                    {post.author.name}
                                  </span>
                                  {post.author.verified && (
                                    <span className="text-xs font-bold bg-[#22C55E]/15 text-[#16A34A] px-2 py-0.5 rounded-md flex items-center gap-1">
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
                              className={`text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wider ${post.categoryBadge}`}
                            >
                              {post.categoryLabel}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="font-poppins font-bold text-lg sm:text-xl text-[#0F2747] leading-snug mb-2.5">
                            {post.title}
                          </h3>

                          {/* Content text */}
                          <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed mb-5 whitespace-pre-line">
                            {post.content}
                          </p>

                          {/* Attached Material (if any) */}
                          {post.attachment && (
                            <div className="p-4 bg-[#FFF9EF] rounded-2xl border border-[#0F2747]/10 flex items-center justify-between mb-5">
                              <div className="flex items-center gap-3 text-sm text-[#0F2747]">
                                <BookOpen className="w-5 h-5 text-[#4F7ECB]" />
                                <div>
                                  <div className="font-bold">{post.attachment.name}</div>
                                  <div className="text-xs text-[#687280]">
                                    {post.attachment.size} • Đã kiểm duyệt
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => alert(`Đã tải tài liệu: ${post.attachment?.name}`)}
                                className="p-2.5 rounded-xl bg-white border border-[#0F2747]/10 hover:bg-[#FFC83D] text-[#0F2747] transition cursor-pointer"
                                title="Tải tài liệu"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Footer Actions */}
                        <div className="pt-4 border-t border-[#0F2747]/10 flex items-center justify-between">
                          <div className="flex items-center gap-5">
                            <button
                              onClick={() => toggleLikePost(post.id)}
                              className={`flex items-center gap-2 text-sm font-semibold transition cursor-pointer ${
                                isLiked ? "text-[#EF4444]" : "text-[#687280] hover:text-[#0F2747]"
                              }`}
                            >
                              <Heart
                                className={`w-4.5 h-4.5 ${isLiked ? "fill-[#EF4444]" : ""}`}
                              />
                              <span>{post.likes}</span>
                            </button>

                            <button
                              onClick={() =>
                                setActiveCommentPostId(
                                  activeCommentPostId === post.id ? null : post.id
                                )
                              }
                              className="flex items-center gap-2 text-sm font-semibold text-[#687280] hover:text-[#0F2747] transition cursor-pointer"
                            >
                              <MessageSquare className="w-4.5 h-4.5" />
                              <span>{post.commentsCount} trả lời</span>
                            </button>
                          </div>

                          <a
                            href={post.discordThreadUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#5865F2] hover:text-[#4752C4] bg-[#5865F2]/10 px-3.5 py-2 rounded-xl transition"
                          >
                            <Volume2 className="w-4 h-4" />
                            <span>{post.discordChannel}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>

                        {/* Interactive Comments Drawer */}
                        {activeCommentPostId === post.id && (
                          <div className="pt-4 border-t border-[#0F2747]/10 space-y-3 mt-4 animate-fadeIn">
                            {/* Existing comments list */}
                            {post.comments && post.comments.length > 0 ? (
                              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                                {post.comments.map((comment) => (
                                  <div
                                    key={comment.id}
                                    className="p-3 bg-[#FFF9EF] rounded-2xl border border-[#0F2747]/10 text-xs text-[#0F2747]"
                                  >
                                    <div className="flex items-center justify-between font-bold mb-1">
                                      <span>{comment.authorName}</span>
                                      <span className="text-[10px] text-[#687280] font-normal">
                                        {comment.createdAt}
                                      </span>
                                    </div>
                                    <p className="text-[#4B5563] whitespace-pre-line leading-relaxed">
                                      {comment.text}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-xs text-[#687280] italic">
                                Chưa có câu trả lời nào. Hãy là người đầu tiên giải đáp!
                              </p>
                            )}

                            {/* Inline reply form */}
                            <div className="flex items-center gap-2 pt-1">
                              <input
                                type="text"
                                placeholder="Viết câu trả lời hoặc trao đổi thêm..."
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
                                className="flex-1 px-4 py-2 bg-white rounded-xl border border-[#0F2747]/15 text-xs focus:outline-none focus:border-[#0F2747]"
                              />
                              <button
                                onClick={() => {
                                  if (commentInputs[post.id]?.trim()) {
                                    addCommentToPost(post.id, commentInputs[post.id]);
                                    setCommentInputs({ ...commentInputs, [post.id]: "" });
                                  }
                                }}
                                className="px-4 py-2 bg-[#0F2747] hover:bg-[#1A3E6D] text-white rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer"
                              >
                                Gửi (+2 PP)
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
            <div className="max-w-4xl mx-auto space-y-6 py-4 animate-fadeIn">
              {/* Header */}
              <div className="text-center">
                <h2 className="font-jakarta font-extrabold text-2xl sm:text-3xl text-[#0F2747] tracking-tight">
                  Máy Chủ Discord The Pencily
                </h2>
              </div>

              {/* Discord UI Mockup */}
              <div className="rounded-2xl bg-[#1E1F22] text-slate-200 border border-[#0F2747]/20 shadow-lg overflow-hidden">
                {/* Title Bar */}
                <div className="bg-[#111214] px-4 py-3 flex items-center justify-between border-b border-[#2B2D31]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">The Pencily • Discord Community</span>
                  </div>
                  <span className="inline-flex items-center text-[11px] font-semibold text-[#57F287] bg-[#57F287]/10 px-2 py-0.5 rounded">
                    Online
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 min-h-[360px]">
                  {/* Sidebar Channels */}
                  <div className="md:col-span-4 bg-[#2B2D31] p-3 border-r border-[#1E1F22] space-y-3">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-[#1E1F22]">
                      <span className="font-extrabold text-sm text-white">
                        The Pencily Server
                      </span>
                      <span className="text-[10px] bg-[#5865F2] text-white px-2 py-0.5 rounded font-bold">Gen 1.0</span>
                    </div>

                    {/* Channel Categories */}
                    <div className="space-y-2.5 text-xs">
                      <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-1 mb-1">Chào Mừng</div>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-slate-400">
                            <Hash className="w-3.5 h-3.5" />
                            <span>thong-bao-gen-1</span>
                          </div>
                          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-slate-400">
                            <Hash className="w-3.5 h-3.5" />
                            <span>quy-tac-ung-xu</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-1 mb-1">Diễn Đàn Học Tập</div>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-[#35373C] text-white font-bold">
                            <Hash className="w-3.5 h-3.5" />
                            <span>hoi-dap-toan-hoc</span>
                          </div>
                          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-slate-400">
                            <Hash className="w-3.5 h-3.5" />
                            <span>ielts-peer-practice</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-1 mb-1">Phòng Học Trực Tuyến</div>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[#57F287]">
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>🔊 Phòng Học Tập 24/7</span>
                          </div>
                          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[#57F287]">
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>🔊 Lớp Web Dev</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Roles */}
                    <div className="pt-3 border-t border-[#35373C] text-[11px] space-y-1.5">
                      <div className="text-slate-400 font-bold uppercase text-[10px] tracking-wider px-1">Vai trò</div>
                      <div className="flex flex-wrap gap-1">
                        <span className="px-2 py-0.5 rounded bg-[#ED4245]/20 text-[#ED4245] font-bold border border-[#ED4245]/30">
                          👑 Core Team
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#FAA81A]/20 text-[#FAA81A] font-bold border border-[#FAA81A]/30">
                          ✏️ Tutor
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#5865F2]/20 text-[#5865F2] font-bold border border-[#5865F2]/30">
                          🎓 Learner
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Chat Area */}
                  <div className="md:col-span-8 bg-[#313338] p-5 flex flex-col justify-between">
                    <div className="flex items-center gap-2 pb-3 border-b border-[#3F4147] text-sm font-bold text-white">
                      <Hash className="w-4 h-4 text-slate-400" />
                      <span>thong-bao-gen-1</span>
                    </div>

                    {/* Messages */}
                    <div className="py-4 space-y-4 text-xs sm:text-sm flex-1">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#5865F2] flex items-center justify-center text-white flex-shrink-0">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#5865F2]">Pencily Bot</span>
                            <span className="bg-[#5865F2] text-white text-[9px] px-1 rounded font-semibold">BOT</span>
                          </div>
                          <p className="mt-1 text-slate-200 leading-relaxed bg-[#2B2D31] p-3 rounded-xl border border-[#3F4147]">
                            🎉 Chào mừng đến với <strong>The Pencily Gen 1.0</strong>! Chọn môn học tại kênh <code className="text-[#FFC83D] bg-[#1E1F22] px-1 rounded text-[11px]">#nhan-role</code> để nhận quyền truy cập phòng voice tương ứng nhé!
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#FFC83D] flex items-center justify-center text-[#0F2747] font-bold text-xs flex-shrink-0">
                          👑
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#FFC83D]">Academic Team</span>
                          </div>
                          <p className="mt-1 text-slate-300 leading-relaxed">
                            Tất cả phòng Voice học tập 24/7 và giải đáp bài vở đều mở tự do, hoàn toàn phi lợi nhuận. Cùng nhau học hỏi nhé! 📚
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Join Banner */}
                    <div className="pt-4 border-t border-[#3F4147] flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="text-xs text-slate-300 text-center sm:text-left">
                        Tham gia ngay để học cùng bạn bè!
                      </div>
                      <a
                        href="https://discord.gg"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-xs shadow transition-colors"
                      >
                        <DiscordLogo className="w-3.5 h-3.5" />
                        <span>Tham gia Discord</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-5 border border-[#0F2747]/10 shadow-xs text-center">
                  <Volume2 className="w-6 h-6 text-[#5865F2] mx-auto mb-2" />
                  <div className="font-jakarta font-bold text-sm text-[#0F2747]">Voice 24/7</div>
                  <p className="text-xs text-[#687280] mt-1">Phòng học mở tự do, bật mic hỏi bài bất kỳ lúc nào.</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-[#0F2747]/10 shadow-xs text-center">
                  <MessageSquare className="w-6 h-6 text-[#FFC83D] mx-auto mb-2" />
                  <div className="font-jakarta font-bold text-sm text-[#0F2747]">Hỏi đáp theo môn</div>
                  <p className="text-xs text-[#687280] mt-1">Kênh text riêng cho Toán, Lý, Hóa, Anh, Tin,...</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-[#0F2747]/10 shadow-xs text-center">
                  <Users className="w-6 h-6 text-[#22C55E] mx-auto mb-2" />
                  <div className="font-jakarta font-bold text-sm text-[#0F2747]">Kết nối bạn bè</div>
                  <p className="text-xs text-[#687280] mt-1">Gặp gỡ học sinh từ các trường khác cùng chí hướng.</p>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 5: PROFILE (Hồ sơ học sinh & Lộ trình Peer Tutor) */}
          {/* ============================================================== */}
          {activeTab === "profile" && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="font-poppins font-black text-3xl sm:text-4xl text-[#0F2747] tracking-tight">
                  Hồ Sơ Học Sinh & Chứng Nhận
                </h2>
              </div>

              {/* Top Identity Card */}
              <div className="bg-white rounded-3xl p-7 sm:p-9 border border-[#0F2747]/10 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-3xl bg-[#0F2747] text-[#FFC83D] font-black text-3xl flex items-center justify-center shadow-md shrink-0 overflow-hidden">
                    {user.avatar?.startsWith("http") ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      user.avatar || "P"
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-bold text-2xl text-[#0F2747]">{user.name}</h3>
                      <span className="text-xs font-bold bg-[#22C55E]/15 text-[#16A34A] px-3 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified
                      </span>
                    </div>
                    <p className="text-sm text-[#687280] mt-1">
                      {user.school} • {user.grade} • {user.role}
                    </p>
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-[#5865F2] mt-1.5">
                      <DiscordLogo className="w-4 h-4" />
                      <span>Discord: {user.discord || "Chưa liên kết"}</span>
                      {user.isDiscordLinked && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#5865F2]/15 text-[#5865F2] font-sans font-bold">
                          OAuth2 Linked
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={() => setIsEditProfileOpen(true)}
                    className="px-5 py-3 rounded-full bg-[#0F2747] hover:bg-[#1A3E6D] text-white text-sm font-bold shadow-xs transition active:scale-95 cursor-pointer flex items-center gap-2"
                  >
                    <Edit3 className="w-4 h-4 text-[#FFC83D]" />
                    <span>Sửa thông tin</span>
                  </button>
                  <button
                    onClick={() => handleSelectTab("become-tutor")}
                    className="px-6 py-3 rounded-full bg-[#FFC83D] hover:bg-[#EAB308] text-[#0F2747] text-sm font-bold shadow-xs transition active:scale-95 cursor-pointer"
                  >
                    Trở thành Peer Tutor
                  </button>
                </div>
              </div>

              {/* 4 Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#0F2747]/10 shadow-2xs">
                  <div className="text-sm text-[#687280] flex items-center justify-between font-medium">
                    <span>Điểm tích lũy</span>
                    <Trophy className="w-5 h-5 text-[#EAB308]" />
                  </div>
                  <div className="font-extrabold text-3xl sm:text-4xl text-[#0F2747] mt-2">
                    {user.points} PP
                  </div>
                </div>

                <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#0F2747]/10 shadow-2xs">
                  <div className="text-sm text-[#687280] flex items-center justify-between font-medium">
                    <span>Thời gian học</span>
                    <Clock className="w-5 h-5 text-[#4F7ECB]" />
                  </div>
                  <div className="font-extrabold text-3xl sm:text-4xl text-[#0F2747] mt-2">
                    {user.learningMinutes}p
                  </div>
                </div>

                <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#0F2747]/10 shadow-2xs">
                  <div className="text-sm text-[#687280] flex items-center justify-between font-medium">
                    <span>Buổi đã học</span>
                    <BookOpen className="w-5 h-5 text-[#16A34A]" />
                  </div>
                  <div className="font-extrabold text-3xl sm:text-4xl text-[#0F2747] mt-2">
                    {user.sessionsAttended} buổi
                  </div>
                </div>

                <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#0F2747]/10 shadow-2xs">
                  <div className="text-sm text-[#687280] flex items-center justify-between font-medium">
                    <span>Xếp hạng tuần</span>
                    <Award className="w-5 h-5 text-[#EF4444]" />
                  </div>
                  <div className="font-extrabold text-3xl sm:text-4xl text-[#0F2747] mt-2">
                    Hạng #{user.rank}
                  </div>
                </div>
              </div>

              {/* Badges Grid */}
              <div className="bg-white p-7 sm:p-8 rounded-3xl border border-[#0F2747]/10 shadow-2xs space-y-4">
                <h4 className="font-bold text-sm text-[#0F2747] uppercase tracking-wider">
                  Bộ Sưu Tập Huy Hiệu
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                  {user.badges.map((b, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl text-center text-sm font-bold ${b.color}`}
                    >
                      🏅 {b.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* ============================================================== */}
          {/* TAB: BECOME TUTOR (Trở thành Peer Tutor - Streamlined) */}
          {/* ============================================================== */}
          {activeTab === "become-tutor" && (
            <div className="space-y-6 animate-fadeIn max-w-4xl">
              {/* Header: Exactly 1 clean external button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#0F2747]/10">
                <div>
                  <h2 className="font-poppins font-black text-2xl sm:text-3xl text-[#0F2747] tracking-tight">
                    Trở thành Peer Tutor
                  </h2>
                  <p className="text-xs sm:text-sm text-[#475569] mt-1">
                    Đơn đăng ký ứng tuyển Peer Tutor & Mentor • The Pencily Gen 1.0
                  </p>
                </div>

                <a
                  href="https://forms.gle/y7143v1g2qCMjPZU8"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#0F2747] border border-slate-300 hover:border-slate-400 text-xs sm:text-sm font-bold shadow-2xs active:scale-95 transition cursor-pointer shrink-0"
                >
                  <span>Mở trên Google Forms</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#4F7ECB]" />
                </a>
              </div>

              {/* Google Form Embed Container */}
              <div className="bg-white rounded-3xl border border-[#0F2747]/10 shadow-xs overflow-hidden">
                <div className="w-full relative min-h-[820px] bg-slate-50 flex flex-col justify-center items-center">
                  <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSfNSYz6QjgEi_C_yx2TAFdtYkus8_ncFT-SKnk_-4IargrFTg/viewform?embedded=true"
                    width="100%"
                    height="850"
                    className="w-full min-h-[850px] border-0"
                    title="Đơn đăng ký Peer Tutor The Pencily"
                  >
                    Đang tải biểu mẫu...
                  </iframe>
                </div>
              </div>
            </div>
          )}

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
        onSubmitCreate={(data) => {
          addClass(data);
          setBookingToast(`Đã mở lớp học "${data.title}" thành công! Lớp học đã được xuất bản.`);
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
    </div>
  );
}