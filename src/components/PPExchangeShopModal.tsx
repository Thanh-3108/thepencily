"use client";

import React, { useState } from "react";
import { X, BookOpen, Award, Download, CheckCircle2, Lock, ExternalLink, Gift, HelpCircle, FileText, UserCheck, Zap } from "lucide-react";
import { useEffect } from "react";
import { api } from "@/lib/api";
import { usePencily } from "@/context/PencilyContext";

export interface ShopItem {
  id: string;
  category: "materials" | "privilege" | "profile";
  title: string;
  titleEn: string;
  cost: number;
  description: string;
  descriptionEn: string;
  badgeText: string;
  badgeTextEn: string;
  rewardType: "download" | "booking" | "badge";
  actionText: string;
  actionTextEn: string;
  actionUrl?: string;
  previewNote: string;
  previewNoteEn: string;
}

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: "item-placeholder-mentoring",
    category: "privilege",
    title: "Suất Kèm 1-1 & Tham Vấn Chuyên Sâu Cùng Peer Tutor",
    titleEn: "1-on-1 Peer Mentorship & Strategy Pass",
    cost: 50,
    description: "Buổi đồng hành 60 phút cùng các Peer Tutor đạt IELTS 8.0+, SAT 1500+ hoặc thủ khoa trường chuyên để giải đáp bài khó, sửa bài luận hoặc tư vấn chiến lược học tập.",
    descriptionEn: "A 60-minute private consultation with top student mentors (IELTS 8.0+, SAT 1500+, or gifted school toppers) for deep essay reviews and exam strategies.",
    badgeText: "ĐẶC QUYỀN HOT",
    badgeTextEn: "TOP PRIVILEGE",
    rewardType: "booking",
    actionText: "Đặt lịch học trực tuyến",
    actionTextEn: "Book online session",
    actionUrl: "/classes",
    previewNote: "Xếp lịch theo yêu cầu trong vòng 48h",
    previewNoteEn: "Scheduled on demand within 48h",
  },
  {
    id: "item-placeholder-materials",
    category: "materials",
    title: "Sổ Tay Toàn Diện: Tổng Hợp Công Thức & Dạng Bài Lớp 12",
    titleEn: "Ultimate STEM Handbook: Grade 12 High-Yield Formula Vault",
    cost: 30,
    description: "Bộ cẩm nang tóm tắt cô đọng 100% công thức Toán, Lý, Hóa, Sinh lớp 12 do Ban Học thuật The Pencily biên soạn và kiểm duyệt, kèm ví dụ mẫu minh họa trực quan.",
    descriptionEn: "Condensed formula cheat sheets covering 100% core Grade 12 STEM topics, curated and verified by The Pencily Academic Board with step-by-step illustrations.",
    badgeText: "TÀI LIỆU VÀNG",
    badgeTextEn: "GOLDEN GUIDE",
    rewardType: "download",
    actionText: "Tải file PDF trọn bộ",
    actionTextEn: "Download Full PDF",
    actionUrl: "https://drive.google.com",
    previewNote: "Bản quyền The Pencily • Cập nhật 2026",
    previewNoteEn: "Official Pencily Edition • 2026",
  },
  {
    id: "item-placeholder-exams",
    category: "materials",
    title: "Kho Tuyển Tập Đề Thi Thử & Barem Chấm Các Trường Chuyên",
    titleEn: "Gifted Schools Mock Exam Bank & Step-by-Step Solutions",
    cost: 40,
    description: "Bộ đề thi thử tuyển chọn từ Phổ Thông Năng Khiếu, Chuyên Lê Hồng Phong, Chuyên Hà Nội - Amsterdam có đáp án và phân tích lỗi sai từng bước.",
    descriptionEn: "Selected mock exams from Vietnam's leading gifted high schools with detailed rubrics and common pitfall explanations.",
    badgeText: "NGÂN HÀNG ĐỀ",
    badgeTextEn: "EXAM VAULT",
    rewardType: "download",
    actionText: "Mở kho đề trực tuyến",
    actionTextEn: "Open Exam Vault",
    actionUrl: "https://drive.google.com",
    previewNote: "Hơn 50 bộ đề kèm barem chấm chi tiết",
    previewNoteEn: "Over 50 curated mock tests with keys",
  },
  {
    id: "item-placeholder-discord-role",
    category: "privilege",
    title: "Huy Hiệu Học Bá VIP & Khung Hồ Sơ Đặc Biệt",
    titleEn: "VIP Scholar Badge & Special Profile Recognition",
    cost: 25,
    description: "Kích hoạt danh hiệu VIP trên nền tảng The Pencily, mở khóa quyền ưu tiên tham vấn chuyên đề cùng gia sư và hiển thị nổi bật trên bảng xếp hạng.",
    descriptionEn: "Unlocks the distinguished VIP badge on The Pencily platform, priority access to study lounges, and recognition on community leaderboards.",
    badgeText: "DANH HIỆU VIP",
    badgeTextEn: "VIP BADGE",
    rewardType: "badge",
    actionText: "Xem trên hồ sơ",
    actionTextEn: "View on Profile",
    actionUrl: "/dashboard?tab=profile",
    previewNote: "Hiển thị vĩnh viễn trên hồ sơ The Pencily",
    previewNoteEn: "Permanently linked to your account",
  },
  {
    id: "item-placeholder-avatar-frame",
    category: "profile",
    title: "Khung Avatar Danh Dự: Học Giả Tinh Hoa The Pencily",
    titleEn: "Elite Scholar Profile Frame & Honor Badge",
    cost: 20,
    description: "Khung trang trí avatar phong cách sổ tay thủ công danh dự hiển thị trên hồ sơ cá nhân và danh sách thành viên trong các phòng học trực tuyến.",
    descriptionEn: "Exclusive handcrafted stationery avatar border displayed on your profile and live classroom rosters.",
    badgeText: "KHUNG HỒ SƠ",
    badgeTextEn: "PROFILE FRAME",
    rewardType: "badge",
    actionText: "Kích hoạt trên hồ sơ",
    actionTextEn: "Equip on Profile",
    previewNote: "Hiển thị vĩnh viễn trên tài khoản",
    previewNoteEn: "Permanently linked to your account",
  },
];

interface PPExchangeShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToVideos?: () => void;
}

export function PPExchangeShopModal({
  isOpen,
  onClose,
  onGoToVideos,
}: PPExchangeShopModalProps) {
  const { user, redeemReward, backendAuthenticated, language } = usePencily();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [redemptions, setRedemptions] = useState<{userId:string;ids:string[]}>({userId:"",ids:[]});
  const redeemedIds = redemptions.userId === user.id ? redemptions.ids : [];
  const [selectedReward, setSelectedReward] = useState<ShopItem | null>(null);



  useEffect(() => {
    if (!backendAuthenticated) return;
    let active = true;
    void api<{ids:string[]}>("/api/rewards").then((result) => {if(active)setRedemptions({userId:user.id,ids:result.ids});}).catch(() => {});
    return () => {active=false;};
  }, [backendAuthenticated, user.id]);

  if (!isOpen) return null;

  const handleRedeem = async (item: ShopItem) => {
    if (user.points < item.cost || redeemedIds.includes(item.id)) return;

    // Deduct points
    if (!(await redeemReward(item.id))) return;

    // Save redemption
    const next = Array.from(new Set([...redeemedIds, item.id]));
    setRedemptions({userId:user.id,ids:next});


    // Open success modal
    setSelectedReward(item);
  };

  const filteredItems =
    activeCategory === "all"
      ? SHOP_ITEMS
      : SHOP_ITEMS.filter((i) => i.category === activeCategory);

  return (
    <div className="pencily-side-panel">
      {/* Backdrop click-away */}
      <div
        className="hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl border border-[#E6DEC8] shadow-2xl flex flex-col overflow-hidden z-10">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-white border-b border-[#E6DEC8] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#FFC83D] flex items-center justify-center text-[#0F2747] font-bold text-xl shadow-2xs shrink-0">
              P
            </div>
            <div>
              <h3 className="font-poppins font-bold text-lg sm:text-xl text-[#0F2747]">
                {language === "vi" ? "Cửa hàng đổi đặc quyền Pencily" : "Pencily Rewards Exchange"}
              </h3>
              <p className="text-xs text-[#526277] mt-0.5">
                {language === "vi"
                  ? "Sử dụng điểm học tập PP để mở khóa tài liệu, bộ đề thi và buổi kèm 1-1."
                  : "Redeem Pencily Points for curated materials, exam banks, and 1-on-1 passes."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Live Balance Chip */}
            <div className="px-4 py-1.5 rounded-full bg-[#FFF6DC] border border-[#F5D67B] flex items-center gap-2">
              <span className="text-xs text-amber-800 font-semibold">{language === "vi" ? "Số dư:" : "Balance:"}</span>
              <span className="text-sm font-bold text-[#0F2747]">
                {user.points.toLocaleString(language === "vi" ? "vi-VN" : "en-US")} PP
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full hover:bg-[#FAF7EE] flex items-center justify-center text-slate-500 hover:text-[#0F2747] transition cursor-pointer"
              aria-label={language === "vi" ? "Đóng" : "Close"}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Value Explanation Banner */}
        <div className="px-6 py-3 bg-[#FFFDF8] border-b border-[#ECE4CE] text-xs text-amber-950 flex items-center justify-between">
          <span>
            <b>{language === "vi" ? "Đặc quyền cống hiến:" : "Community Rewards:"}</b>{" "}
            {language === "vi"
              ? "Điểm Pencily Points (PP) được tích lũy từ các buổi học tương tác hoặc host lớp kèm cặp để đổi tài liệu và đặc quyền thành viên."
              : "Pencily Points (PP) are earned through active session attendance and peer tutoring, redeemable for handbooks, exam banks, and community privileges."}
          </span>
        </div>

        {/* Category Filters */}
        <div className="px-6 py-3 bg-[#FAF7EE] border-b border-[#ECE4CE] flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
              activeCategory === "all"
                ? "bg-[#0F2747] text-white shadow-2xs"
                : "bg-white text-[#526277] hover:bg-[#FFF6DC] border border-[#E6DEC8]"
            }`}
          >
            {language === "vi" ? `Tất cả (${SHOP_ITEMS.length})` : `All Items (${SHOP_ITEMS.length})`}
          </button>
          <button
            onClick={() => setActiveCategory("materials")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeCategory === "materials"
                ? "bg-[#0F2747] text-white shadow-2xs"
                : "bg-white text-[#526277] hover:bg-[#FFF6DC] border border-[#E6DEC8]"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>{language === "vi" ? "Tài liệu & Đề thi" : "Study Guides & Tests"}</span>
          </button>
          <button
            onClick={() => setActiveCategory("privilege")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeCategory === "privilege"
                ? "bg-[#0F2747] text-white shadow-2xs"
                : "bg-white text-[#526277] hover:bg-[#FFF6DC] border border-[#E6DEC8]"
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>{language === "vi" ? "Kèm 1-1 & Danh hiệu" : "1-on-1 Mentoring & Badges"}</span>
          </button>
          <button
            onClick={() => setActiveCategory("profile")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeCategory === "profile"
                ? "bg-[#0F2747] text-white shadow-2xs"
                : "bg-white text-[#526277] hover:bg-[#FFF6DC] border border-[#E6DEC8]"
            }`}
          >
            <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>{language === "vi" ? "Khung hồ sơ" : "Profile Frames"}</span>
          </button>
        </div>

        {/* Items Grid */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item) => {
              const isRedeemed = redeemedIds.includes(item.id);
              const canAfford = user.points >= item.cost;
              const pointsNeeded = item.cost - user.points;
              const title = language === "vi" ? item.title : item.titleEn;
              const description = language === "vi" ? item.description : item.descriptionEn;
              const badgeText = language === "vi" ? item.badgeText : item.badgeTextEn;
              const previewNote = language === "vi" ? item.previewNote : item.previewNoteEn;

              return (
                <div
                  key={item.id}
                  className={`p-4 sm:p-5 rounded-sm border-2 transition-all flex flex-col justify-between gap-4 ${
                    isRedeemed
                      ? "bg-emerald-50/50 border-emerald-400 shadow-xs"
                      : canAfford
                      ? "bg-white border-slate-300 hover:border-[#0F2747] shadow-xs hover:shadow-sm"
                      : "bg-slate-50 border-slate-200 opacity-90"
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-xs bg-amber-100 text-amber-900 border-2 border-amber-300">
                        {badgeText}
                      </span>
                      <div className="flex items-center gap-1.5 bg-[#FFF9EF] px-2.5 py-0.5 rounded-xs border-2 border-amber-400 font-black text-xs text-[#0F2747]">
                        <span className="w-3.5 h-3.5 rounded-xs bg-[#F59E0B] text-white flex items-center justify-center text-[9px] font-black">
                          P
                        </span>
                        <span>{item.cost} PP</span>
                      </div>
                    </div>

                    <h4 className="font-poppins font-bold text-sm sm:text-base text-[#0F2747] leading-snug">
                      {title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed font-mono">
                      {description}
                    </p>

                    <div className="text-[11px] text-slate-400 italic">
                      ℹ️ {previewNote}
                    </div>
                  </div>

                  {/* Action Row */}
                  <div className="pt-2 border-t-2 border-slate-100 flex items-center justify-between gap-2">
                    {isRedeemed ? (
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>{language === "vi" ? "Đã mở khóa mẫu" : "Unlocked (Draft)"}</span>
                        </span>
                        <button
                          onClick={() => setSelectedReward(item)}
                          className="px-3 py-1.5 rounded-sm bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition border-2 border-emerald-800 cursor-pointer"
                        >
                          {language === "vi" ? "Xem quyền lợi" : "View Perks"}
                        </button>
                      </div>
                    ) : canAfford ? (
                      <button
                        onClick={() => handleRedeem(item)}
                        className="w-full py-2 px-4 rounded-sm bg-[#FFC83D] hover:bg-[#EAB308] text-[#0F2747] font-black text-xs transition active:scale-95 border-2 border-[#0F2747] shadow-xs cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>
                          {language === "vi" ? `Thử đổi mẫu (${item.cost} PP)` : `Try Redeem (${item.cost} PP)`}
                        </span>
                      </button>
                    ) : (
                      <div className="w-full flex items-center justify-between gap-2">
                        <span className="text-[11px] text-slate-500 font-medium">
                          {language === "vi" ? "Thiếu" : "Need"}{" "}
                          <strong className="text-amber-800 font-bold">{pointsNeeded} PP</strong>
                        </span>
                        <button
                          onClick={() => {
                            onClose();
                            if (onGoToVideos) onGoToVideos();
                          }}
                          className="py-1 px-3 rounded-sm bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 border-2 border-slate-300 text-[11px] font-bold transition cursor-pointer flex items-center gap-1"
                          title="Học bài & xem video để nhận thêm PP"
                        >
                          <span>{language === "vi" ? "Xem thư viện bài học →" : "Explore the lesson library →"}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer info note */}
        <div className="p-4 bg-white border-t-2 border-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#0F2747]">
          <div className="flex items-center gap-2 text-slate-600">
            <Award className="w-4 h-4 text-[#F59E0B] shrink-0" />
            <span>
              {language === "vi"
                ? "Tất cả các tài liệu và quyền lợi đều do cộng đồng Peer Tutor The Pencily tự nguyện đóng góp phi lợi nhuận."
                : "All resources and perks are voluntarily contributed by The Pencily peer tutors non-profit."}
            </span>
          </div>
        </div>
      </div>

      {/* SUCCESS MODAL OVERLAY */}
      {selectedReward && (
        <div className="pencily-side-panel">
          <div
            className="hidden"
            onClick={() => setSelectedReward(null)}
          />
          <div className="relative w-full max-w-md bg-white rounded-md p-6 border-2 border-[#0F2747] shadow-2xl z-10 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b-2 border-slate-100">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>{language === "vi" ? "Thử nghiệm mở khóa thành công!" : "Trial Unlock Succeeded!"}</span>
              </div>
              <button
                onClick={() => setSelectedReward(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-sm border-2 border-transparent hover:border-slate-300 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center py-2 space-y-2">
              <div className="w-12 h-12 mx-auto rounded-sm bg-amber-100 border-2 border-amber-300 text-amber-800 flex items-center justify-center text-2xl font-black">
                🎁
              </div>
              <h4 className="font-poppins font-bold text-base text-[#0F2747]">
                {language === "vi" ? selectedReward.title : selectedReward.titleEn}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-mono">
                {language === "vi" ? selectedReward.description : selectedReward.descriptionEn}
              </p>
            </div>

            <div className="bg-[#FFF9EF] p-4 rounded-sm border-2 border-amber-300 space-y-2 text-xs">
              <div className="font-bold text-[#0F2747]">
                {language === "vi" ? "Hướng dẫn sử dụng quyền lợi:" : "How to access reward:"}
              </div>
              <p className="text-slate-700 leading-relaxed">
                {selectedReward.rewardType === "download" &&
                  (language === "vi"
                    ? "Nhấp vào nút bên dưới để mở liên kết tải trực tiếp tài liệu từ Google Drive của The Pencily."
                    : "Click the button below to download materials from The Pencily Google Drive.")}
                {selectedReward.rewardType === "booking" &&
                  (language === "vi"
                    ? "Liên hệ ban điều phối qua mục Đăng ký Lớp học hoặc email để xếp lịch kèm 1-1 với Peer Tutor."
                    : "Contact support or register via Classes to schedule your 1-on-1 session.")}
                {selectedReward.rewardType === "badge" &&
                  (language === "vi"
                    ? "Danh hiệu và khung avatar đã được kích hoạt trên hồ sơ của bạn!"
                    : "Badge and avatar frame have been activated on your profile!")}
              </p>
            </div>

            <div className="pt-2 flex items-center gap-2">
              {selectedReward.actionUrl ? (
                <a
                  href={selectedReward.actionUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 px-4 rounded-sm bg-[#0F2747] hover:bg-[#1E3A8A] text-white text-xs font-bold transition text-center flex items-center justify-center gap-1.5 border-2 border-[#0F2747]"
                >
                  <span>{language === "vi" ? selectedReward.actionText : selectedReward.actionTextEn}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <button
                  onClick={() => setSelectedReward(null)}
                  className="flex-1 py-2.5 px-4 rounded-sm bg-[#0F2747] hover:bg-[#1E3A8A] text-white text-xs font-bold transition text-center border-2 border-[#0F2747] cursor-pointer"
                >
                  {language === "vi" ? "Hoàn tất" : "Done"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
