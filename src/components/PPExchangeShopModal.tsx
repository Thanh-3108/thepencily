"use client";

import React, { useState, useEffect } from "react";
import { X, BookOpen, Award, Download, CheckCircle2, Lock, ExternalLink, Gift, HelpCircle, FileText, UserCheck, Zap } from "lucide-react";
import { usePencily } from "@/context/PencilyContext";
import { DiscordLogo } from "./BrandIcons";

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
  rewardType: "download" | "discord" | "booking" | "badge";
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
    title: "[Placeholder] <Tên Suất Kèm 1-1 / Tham Vấn Peer Tutor>",
    titleEn: "[Placeholder] <1-on-1 Tutoring / Mentorship Pass>",
    cost: 50,
    description: "<Mô tả chi tiết hình thức kèm 1-1, thời lượng buổi học, môn học hỗ trợ và quy trình đặt lịch với Peer Tutor trên Discord...>",
    descriptionEn: "<Detailed description of 1-on-1 mentoring format, duration, subject coverage, and Discord booking process...>",
    badgeText: "CHỜ PROOFCHECK",
    badgeTextEn: "PENDING PROOFCHECK",
    rewardType: "booking",
    actionText: "<Đặt lịch qua Discord>",
    actionTextEn: "<Book via Discord>",
    actionUrl: "https://discord.gg/6hpEf4wC4z",
    previewNote: "<Thời gian phản hồi và xếp lịch theo tuần>",
    previewNoteEn: "<Weekly response and scheduling turnaround>",
  },
  {
    id: "item-placeholder-materials",
    category: "materials",
    title: "[Placeholder] <Tên Bộ Tài Liệu / Sổ Tay Kiến Thức>",
    titleEn: "[Placeholder] <Study Guide / Knowledge Handbook>",
    cost: 30,
    description: "<Mô tả nội dung tài liệu ôn tập, cấu trúc bài học, công thức cô đọng hoặc ghi chú phương pháp học do ban học thuật phụ trách...>",
    descriptionEn: "<Description of review material content, lesson structure, condensed formulas, or study notes provided by academic team...>",
    badgeText: "TÀI LIỆU MẪU",
    badgeTextEn: "SAMPLE GUIDE",
    rewardType: "download",
    actionText: "<Tải file PDF / Drive>",
    actionTextEn: "<Download PDF / Drive>",
    actionUrl: "https://drive.google.com",
    previewNote: "<Định dạng tài liệu và hướng dẫn truy cập file>",
    previewNoteEn: "<File format and access details>",
  },
  {
    id: "item-placeholder-exams",
    category: "materials",
    title: "[Placeholder] <Tên Tuyển Tập Đề Thi & Barem Điểm>",
    titleEn: "[Placeholder] <Mock Exam Bank & Solution Keys>",
    cost: 40,
    description: "<Mô tả nguồn tuyển chọn đề thi, mức độ phân loại điểm số, barem đáp án và hướng dẫn giải thích từng câu...>",
    descriptionEn: "<Description of exam sources, score distinction levels, answer rubrics, and detailed step-by-step solutions...>",
    badgeText: "KHO ĐỀ MẪU",
    badgeTextEn: "SAMPLE VAULT",
    rewardType: "download",
    actionText: "<Mở kho đề lưu trữ>",
    actionTextEn: "<Open Drive Repository>",
    actionUrl: "https://drive.google.com",
    previewNote: "<Số lượng đề thi kèm barem chấm chính thức>",
    previewNoteEn: "<Number of mock exams and official rubrics>",
  },
  {
    id: "item-placeholder-discord-role",
    category: "privilege",
    title: "[Placeholder] <Tên Role VIP / Huy Hiệu Discord The Pencily>",
    titleEn: "[Placeholder] <Discord VIP Role & Badge Name>",
    cost: 25,
    description: "<Mô tả vai trò đặc quyền trên server Discord The Pencily, quyền hạn truy cập các phòng chat hoặc kênh trao đổi cùng gia sư...>",
    descriptionEn: "<Description of Discord server role privileges, badge styling, and access permissions for specialized discussion channels...>",
    badgeText: "ROLE DISCORD",
    badgeTextEn: "DISCORD ROLE",
    rewardType: "discord",
    actionText: "<Tự động đồng bộ Discord>",
    actionTextEn: "<Auto-sync Discord>",
    actionUrl: "https://discord.gg/6hpEf4wC4z",
    previewNote: "<Thời hạn và quyền lợi tương ứng trên máy chủ>",
    previewNoteEn: "<Duration and associated server permissions>",
  },
  {
    id: "item-placeholder-avatar-frame",
    category: "profile",
    title: "[Placeholder] <Tên Khung Avatar Trang Trí Hồ Sơ>",
    titleEn: "[Placeholder] <Custom Avatar Profile Frame Name>",
    cost: 20,
    description: "<Mô tả khung viền avatar cá nhân hiển thị trên hồ sơ học sinh và danh sách lớp học của The Pencily...>",
    descriptionEn: "<Description of decorative avatar border displayed on student profile and live class attendance lists...>",
    badgeText: "KHUNG HỒ SƠ",
    badgeTextEn: "PROFILE FRAME",
    rewardType: "badge",
    actionText: "<Kích hoạt trên hồ sơ web>",
    actionTextEn: "<Equip on Web Profile>",
    previewNote: "<Hiển thị trực tiếp trên tài khoản cá nhân>",
    previewNoteEn: "<Visible on personal account card>",
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
  const { user, addPoints, language } = usePencily();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [redeemedIds, setRedeemedIds] = useState<string[]>([]);
  const [selectedReward, setSelectedReward] = useState<ShopItem | null>(null);

  // Load redeemed items from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("pencily_redeemed_items");
      if (saved) {
        setRedeemedIds(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  if (!isOpen) return null;

  const handleRedeem = (item: ShopItem) => {
    if (user.points < item.cost) return;

    // Deduct points
    addPoints(-item.cost, item.title);

    // Save redemption
    const next = Array.from(new Set([...redeemedIds, item.id]));
    setRedeemedIds(next);
    try {
      localStorage.setItem("pencily_redeemed_items", JSON.stringify(next));
    } catch {
      // ignore
    }

    // Open success modal
    setSelectedReward(item);
  };

  const filteredItems =
    activeCategory === "all"
      ? SHOP_ITEMS
      : SHOP_ITEMS.filter((i) => i.category === activeCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none animate-fadeIn">
      {/* Backdrop click-away */}
      <div
        className="fixed inset-0 bg-[#0F2747]/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog (Squarish micro-corners, thick border-2) */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-md border-2 border-[#0F2747] shadow-2xl flex flex-col overflow-hidden z-10">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-white border-b-2 border-slate-300 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-[#F59E0B] to-[#D97706] border-2 border-[#B45309] flex items-center justify-center text-slate-950 font-black text-xl shadow-xs shrink-0">
              P
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-poppins font-black text-lg sm:text-xl text-[#0F2747]">
                  {language === "vi" ? "Cửa Hàng Đổi Đặc Quyền Pencily" : "Pencily Rewards Exchange"}
                </h3>
                <span className="text-[11px] font-bold bg-amber-100 text-amber-900 border-2 border-amber-300 px-2 py-0.5 rounded-xs">
                  {language === "vi" ? "Bản Mẫu Proofcheck" : "Proofcheck Draft"}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === "vi"
                  ? "Khung đổi đặc quyền mẫu chuẩn bị cho team cập nhật quyền lợi và tài liệu học tập thực tế."
                  : "Draft reward framework ready for the team to input real study rewards and perks."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Live Balance Chip */}
            <div className="px-3.5 py-1.5 rounded-sm bg-[#FFF9EF] border-2 border-amber-400 flex items-center gap-2 shadow-xs">
              <span className="text-xs text-amber-800 font-bold">{language === "vi" ? "Số dư:" : "Balance:"}</span>
              <span className="text-sm sm:text-base font-black text-[#0F2747]">
                {user.points.toLocaleString(language === "vi" ? "vi-VN" : "en-US")} PP
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-sm border-2 border-transparent hover:border-slate-300 hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 transition cursor-pointer"
              aria-label={language === "vi" ? "Đóng" : "Close"}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Draft Notice Banner */}
        <div className="px-5 py-2.5 bg-amber-50 border-b-2 border-amber-300 text-xs text-amber-900 flex items-center justify-between">
          <span>
            ⚠️ <b>{language === "vi" ? "Khung Mẫu Chờ Proofcheck:" : "Draft Catalog Template:"}</b>{" "}
            {language === "vi"
              ? "Toàn bộ quyền lợi và tài liệu dưới đây hiện là khung mẫu placeholder để ban điều phối hoàn thiện quyền lợi thực tế trước khi chính thức mở đổi."
              : "The rewards and perks below are placeholder templates for the team to proofcheck and fill in actual offerings."}
          </span>
        </div>

        {/* Category Filters */}
        <div className="px-6 py-3 bg-slate-50 border-b-2 border-slate-300 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-3.5 py-1.5 rounded-sm text-xs font-bold transition cursor-pointer whitespace-nowrap border-2 ${
              activeCategory === "all"
                ? "bg-[#0F2747] text-white border-[#0F2747] shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border-slate-300"
            }`}
          >
            {language === "vi" ? `Tất cả (${SHOP_ITEMS.length})` : `All Items (${SHOP_ITEMS.length})`}
          </button>
          <button
            onClick={() => setActiveCategory("materials")}
            className={`px-3.5 py-1.5 rounded-sm text-xs font-bold transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 border-2 ${
              activeCategory === "materials"
                ? "bg-[#0F2747] text-white border-[#0F2747] shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border-slate-300"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>{language === "vi" ? "Tài liệu & Đề thi mẫu" : "Study Guides & Tests"}</span>
          </button>
          <button
            onClick={() => setActiveCategory("privilege")}
            className={`px-3.5 py-1.5 rounded-sm text-xs font-bold transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 border-2 ${
              activeCategory === "privilege"
                ? "bg-[#0F2747] text-white border-[#0F2747] shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border-slate-300"
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>{language === "vi" ? "Đặc quyền Kèm 1-1 & Discord" : "1-on-1 Mentoring & Discord"}</span>
          </button>
          <button
            onClick={() => setActiveCategory("profile")}
            className={`px-3.5 py-1.5 rounded-sm text-xs font-bold transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 border-2 ${
              activeCategory === "profile"
                ? "bg-[#0F2747] text-white border-[#0F2747] shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border-slate-300"
            }`}
          >
            <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>{language === "vi" ? "Khung hồ sơ & Danh hiệu" : "Profile Frames & Badges"}</span>
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
                          <span>{language === "vi" ? "Xem video nhận +5 PP →" : "Watch video for +5 PP →"}</span>
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

          <a
            href="https://discord.gg/6hpEf4wC4z"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5865F2] hover:underline shrink-0"
          >
            <DiscordLogo className="w-3.5 h-3.5 fill-current" />
            <span>{language === "vi" ? "Góp ý phần thưởng trên Discord" : "Suggest Rewards on Discord"}</span>
          </a>
        </div>
      </div>

      {/* SUCCESS MODAL OVERLAY */}
      {selectedReward && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#0F2747]/80 backdrop-blur-sm"
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
                {language === "vi" ? "Hướng dẫn sử dụng quyền lợi mẫu:" : "How to access reward sample:"}
              </div>
              <p className="text-slate-700 leading-relaxed">
                {selectedReward.rewardType === "download" &&
                  (language === "vi"
                    ? "Nhấp vào nút bên dưới để mở liên kết tải trực tiếp tài liệu từ Google Drive của The Pencily."
                    : "Click the button below to download materials from The Pencily Google Drive.")}
                {selectedReward.rewardType === "discord" &&
                  (language === "vi"
                    ? "Truy cập máy chủ Discord của The Pencily để nhận vai trò VIP hoặc mở phòng học Voice nhóm."
                    : "Join The Pencily Discord server to claim your VIP role or launch group voice rooms.")}
                {selectedReward.rewardType === "booking" &&
                  (language === "vi"
                    ? "Liên hệ ban điều phối hoặc kênh #ho-tro-tutor trên Discord để xếp lịch kèm 1-1 với Peer Tutor."
                    : "Contact support or #tutor-support on Discord to schedule your 1-on-1 session.")}
                {selectedReward.rewardType === "badge" &&
                  (language === "vi"
                    ? "Khung avatar mẫu đã được kích hoạt thử nghiệm trên hồ sơ của bạn!"
                    : "Avatar frame trial has been activated on your profile!")}
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
