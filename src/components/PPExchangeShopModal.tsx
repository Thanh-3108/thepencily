"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Sparkles,
  BookOpen,
  Award,
  Download,
  CheckCircle2,
  Lock,
  ExternalLink,
  Gift,
  HelpCircle,
  FileText,
  UserCheck,
  Zap,
} from "lucide-react";
import { usePencily } from "@/context/PencilyContext";
import { DiscordLogo } from "./BrandIcons";

export interface ShopItem {
  id: string;
  category: "materials" | "privilege" | "profile";
  title: string;
  cost: number;
  description: string;
  badgeText: string;
  rewardType: "download" | "discord" | "booking" | "badge";
  actionText: string;
  actionUrl?: string;
  previewNote: string;
}

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: "item-mindmap",
    category: "materials",
    title: "Trọn bộ Mindmap & Flashcard 12 Môn Thi Tốt Nghiệp",
    cost: 50,
    description: "Hệ thống sơ đồ tư duy cô đọng công thức Toán, Lý, Hóa, Sinh, Anh và mốc Lịch sử do chính Top Tutor biên soạn, tối ưu hóa ôn cấp tốc.",
    badgeText: "PDF & Anki Deck",
    rewardType: "download",
    actionText: "Tải trọn bộ tài liệu",
    actionUrl: "https://drive.google.com",
    previewNote: "Định dạng PDF chất lượng cao in ấn + file Anki import điện thoại",
  },
  {
    id: "item-chuyen-exams",
    category: "materials",
    title: "Tuyển Tập Đề Thi Thử & Lời Giải Chi Tiết Từ Các Trường Chuyên",
    cost: 40,
    description: "Bộ đề tuyển chọn từ THPT Chuyên Ams, Lê Hồng Phong, KHTN kèm hướng dẫn giải chi tiết từng bước và chỉ ra các bẫy điểm 9+.",
    badgeText: "Có đáp án chi tiết",
    rewardType: "download",
    actionText: "Mở kho đề thi",
    actionUrl: "https://drive.google.com",
    previewNote: "Gồm hơn 30 đề kèm barem chấm điểm chuẩn Bộ Giáo Dục",
  },
  {
    id: "item-ielts-essay",
    category: "materials",
    title: "1 Suất Chữa Chi Tiết Writing / Essay IELTS (Tutor 8.0+)",
    cost: 75,
    description: "Gửi 1 bài viết Task 1 hoặc Task 2, Tutor IELTS 8.0+ sẽ chữa chi tiết ngữ pháp, nâng cấp từ vựng C1/C2 và nhận xét 4 tiêu chí chấm thi.",
    badgeText: "Chữa bài 1-1",
    rewardType: "booking",
    actionText: "Gửi bài viết để chữa",
    actionUrl: "https://discord.gg/6hpEf4wC4z",
    previewNote: "Nhận kết quả và lời nhận xét chi tiết trong vòng 24 - 48 giờ",
  },
  {
    id: "item-dgnl-handbook",
    category: "materials",
    title: "Sổ Tay Bứt Phá ĐGNL ĐHQG 900+ & Tư Duy Định Lượng",
    cost: 35,
    description: "Tổng hợp mẹo xử lý bảng số liệu, suy luận logic, giải nhanh biểu đồ và kinh nghiệm phân bổ thời gian phòng thi từ cựu thí sinh 1000+.",
    badgeText: "Bí kíp thực chiến",
    rewardType: "download",
    actionText: "Tải sổ tay ĐGNL",
    actionUrl: "https://drive.google.com",
    previewNote: "Đúc kết từ 3 năm đề thi thực tế ĐHQG Hà Nội & TP.HCM",
  },
  {
    id: "item-tutor-1on1",
    category: "privilege",
    title: "Vé Ưu Tiên Kèm 1-on-1 với Top Tutor (30 Phút)",
    cost: 100,
    description: "Đặt lịch học riêng 1-kèm-1 qua Voice Room hoặc Google Meet với một Peer Tutor giỏi nhất để gỡ rối bài tập khó trước kỳ thi.",
    badgeText: "Đặt lịch riêng",
    rewardType: "booking",
    actionText: "Đặt lịch với Tutor",
    actionUrl: "https://discord.gg/6hpEf4wC4z",
    previewNote: "Được chọn Tutor môn mong muốn và linh hoạt khung giờ hẹn",
  },
  {
    id: "item-discord-role",
    category: "privilege",
    title: "Huy Hiệu & Role VIP Discord @Pencily Scholar",
    cost: 60,
    description: "Sở hữu màu tên vàng cam nổi bật trên toàn bộ Server Discord The Pencily, mở khóa phòng chat đặc quyền giao lưu cùng các gia sư.",
    badgeText: "Role Discord độc quyền",
    rewardType: "discord",
    actionText: "Kích hoạt trên Discord",
    actionUrl: "https://discord.gg/6hpEf4wC4z",
    previewNote: "Tự động đồng bộ vai trò khi tài khoản Discord đã liên kết",
  },
  {
    id: "item-private-room",
    category: "privilege",
    title: "Quyền Mở Phòng Học Voice Riêng Tư Cho Nhóm Bạn",
    cost: 45,
    description: "Đặc quyền tạo phòng học Voice Room VIP trên Discord không giới hạn thời gian để cùng nhóm bạn thân cày đề và ôn thi đêm.",
    badgeText: "Voice Room VIP",
    rewardType: "discord",
    actionText: "Tạo phòng riêng",
    actionUrl: "https://discord.gg/6hpEf4wC4z",
    previewNote: "Có quyền quản lý micro và mời bạn bè tham gia",
  },
  {
    id: "item-avatar-frame",
    category: "profile",
    title: "Khung Avatar 'Cú Bác Học' Trên Hồ Sơ The Pencily",
    cost: 50,
    description: "Trang trí avatar cá nhân của bạn với khung viền linh vật Cú Pencily vàng cam, khẳng định thành tích học tập chăm chỉ.",
    badgeText: "Khung Hồ Sơ",
    rewardType: "badge",
    actionText: "Kích hoạt khung avatar",
    previewNote: "Hiển thị trên hồ sơ cá nhân và danh sách lớp học",
  },
  {
    id: "item-stickers",
    category: "profile",
    title: "Bộ Sticker The Pencily & Cú Bác Học Dán Laptop",
    cost: 120,
    description: "Bộ 6 sticker hoạt hình The Pencily chống nước, chống trầy xước dành tặng học sinh đổi điểm nhận qua bưu điện hoặc sự kiện offline.",
    badgeText: "Quà tặng hiện vật",
    rewardType: "booking",
    actionText: "Đăng ký nhận quà",
    actionUrl: "https://discord.gg/6hpEf4wC4z",
    previewNote: "Hỗ trợ gửi bưu điện toàn quốc vào mỗi đợt cuối tháng",
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
  const { user, addPoints } = usePencily();
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
      {/* Invisible backdrop click-away (no blur) */}
      <div
        className="fixed inset-0 bg-slate-900/60"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl border border-slate-200/90 shadow-2xl flex flex-col overflow-hidden z-10">
        {/* Header (Clean White / Warm Paper Aesthetic, NO blue gradients) */}
        <div className="p-5 sm:p-6 bg-white border-b border-slate-200/90 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center text-slate-950 font-black text-xl shadow-xs shrink-0">
              P
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-poppins font-black text-lg sm:text-xl text-[#0F2747]">
                  Cửa Hàng Đổi Quà Pencily (PP Exchange)
                </h3>
                <span className="text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300/80 px-2.5 py-0.5 rounded-full">
                  Dành cho Học Sinh
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Dùng số điểm bạn đã tích lũy từ việc học để đổi các tài liệu độc quyền và đặc quyền giá trị.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Live Balance Chip */}
            <div className="px-4 py-2 rounded-2xl bg-[#FFF9EF] border border-amber-300/80 flex items-center gap-2 shadow-2xs">
              <span className="text-xs text-amber-700 font-bold">Số dư:</span>
              <span className="text-base font-black text-[#0F2747]">
                {user.points.toLocaleString("vi-VN")} PP
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition cursor-pointer"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="px-6 py-3.5 bg-slate-50/60 border-b border-slate-200/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
              activeCategory === "all"
                ? "bg-[#0F2747] text-white shadow-2xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            Tất cả ({SHOP_ITEMS.length})
          </button>
          <button
            onClick={() => setActiveCategory("materials")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeCategory === "materials"
                ? "bg-[#0F2747] text-white shadow-2xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Tài liệu & Đề thi chuyên</span>
          </button>
          <button
            onClick={() => setActiveCategory("privilege")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeCategory === "privilege"
                ? "bg-[#0F2747] text-white shadow-2xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Đặc quyền Tutor & Discord</span>
          </button>
          <button
            onClick={() => setActiveCategory("profile")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeCategory === "profile"
                ? "bg-[#0F2747] text-white shadow-2xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Gift className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Hồ sơ & Quà lưu niệm</span>
          </button>
        </div>

        {/* Items Grid */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item) => {
              const isRedeemed = redeemedIds.includes(item.id);
              const canAfford = user.points >= item.cost;
              const pointsNeeded = item.cost - user.points;

              return (
                <div
                  key={item.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 ${
                    isRedeemed
                      ? "bg-emerald-50/50 border-emerald-300 shadow-2xs"
                      : canAfford
                      ? "bg-white border-[#0F2747]/12 hover:border-[#F59E0B]/60 shadow-2xs hover:shadow-sm"
                      : "bg-slate-50/70 border-slate-200 opacity-90"
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 border border-amber-200/60">
                        {item.badgeText}
                      </span>
                      <div className="flex items-center gap-1.5 bg-[#FFF9EF] px-3 py-1 rounded-full border border-amber-300/80 font-black text-xs text-[#0F2747]">
                        <span className="w-4 h-4 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-white flex items-center justify-center text-[10px]">
                          P
                        </span>
                        <span>{item.cost} PP</span>
                      </div>
                    </div>

                    <h4 className="font-poppins font-bold text-sm sm:text-base text-[#0F2747] leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="text-[11px] text-slate-400 italic">
                      ℹ️ {item.previewNote}
                    </div>
                  </div>

                  {/* Action Row */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    {isRedeemed ? (
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Đã mở khóa</span>
                        </span>
                        <button
                          onClick={() => setSelectedReward(item)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition cursor-pointer"
                        >
                          Xem quyền lợi
                        </button>
                      </div>
                    ) : canAfford ? (
                      <button
                        onClick={() => handleRedeem(item)}
                        className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black text-xs transition active:scale-95 shadow-2xs cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-3.5 h-3.5 fill-current" />
                        <span>Đổi ngay bằng {item.cost} PP</span>
                      </button>
                    ) : (
                      <div className="w-full flex items-center justify-between gap-2">
                        <span className="text-[11px] text-slate-500 font-medium">
                          Thiếu <strong className="text-amber-700 font-bold">{pointsNeeded} PP</strong>
                        </span>
                        <button
                          onClick={() => {
                            onClose();
                            if (onGoToVideos) onGoToVideos();
                          }}
                          className="py-1.5 px-3 rounded-xl bg-slate-200 hover:bg-amber-100 text-slate-700 hover:text-amber-900 text-[11px] font-bold transition cursor-pointer flex items-center gap-1"
                          title="Học bài & xem video để nhận thêm PP"
                        >
                          <span>Xem video nhận +5 PP →</span>
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
        <div className="p-4 bg-white border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#0F2747]">
          <div className="flex items-center gap-2 text-slate-600">
            <Sparkles className="w-4 h-4 text-[#F59E0B] shrink-0" />
            <span>
              Tất cả các tài liệu và quyền lợi đều do cộng đồng Peer Tutor The Pencily tự nguyện đóng góp phi lợi nhuận.
            </span>
          </div>

          <a
            href="https://discord.gg/6hpEf4wC4z"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5865F2] hover:underline shrink-0"
          >
            <DiscordLogo className="w-3.5 h-3.5 fill-current" />
            <span>Hỗ trợ nhận quà trên Discord</span>
          </a>
        </div>
      </div>

      {/* SUCCESS MODAL OVERLAY */}
      {selectedReward && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-950/70"
            onClick={() => setSelectedReward(null)}
          />
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 border-2 border-emerald-400 shadow-2xl z-10 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Mở khóa thành công!</span>
              </div>
              <button
                onClick={() => setSelectedReward(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center py-2 space-y-2">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl font-black shadow-inner">
                🎁
              </div>
              <h4 className="font-poppins font-bold text-base text-[#0F2747]">
                {selectedReward.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedReward.description}
              </p>
            </div>

            <div className="bg-[#FFF9EF] p-4 rounded-2xl border border-amber-300/80 space-y-2 text-xs">
              <div className="font-bold text-[#0F2747]">Hướng dẫn sử dụng quyền lợi:</div>
              <p className="text-slate-700 leading-relaxed">
                {selectedReward.rewardType === "download" &&
                  "Nhấp vào nút bên dưới để mở liên kết tải trực tiếp tài liệu từ Google Drive của The Pencily."}
                {selectedReward.rewardType === "discord" &&
                  "Truy cập máy chủ Discord của The Pencily để nhận vai trò VIP hoặc mở phòng học Voice nhóm."}
                {selectedReward.rewardType === "booking" &&
                  "Liên hệ ban điều phối hoặc kênh #ho-tro-tutor trên Discord để xếp lịch kèm 1-1 với Peer Tutor."}
                {selectedReward.rewardType === "badge" &&
                  "Khung avatar đã được kích hoạt thành công trên hồ sơ của bạn!"}
              </p>
            </div>

            <div className="pt-2 flex items-center gap-2">
              {selectedReward.actionUrl ? (
                <a
                  href={selectedReward.actionUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#0F2747] hover:bg-[#1E3A8A] text-white text-xs font-bold transition text-center flex items-center justify-center gap-1.5"
                >
                  <span>{selectedReward.actionText}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <button
                  onClick={() => setSelectedReward(null)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#0F2747] hover:bg-[#1E3A8A] text-white text-xs font-bold transition text-center"
                >
                  Hoàn tất
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
