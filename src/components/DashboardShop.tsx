"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Check,
  CheckCircle2,
  Lock,
  ArrowRight,
  Download,
  Calendar,
  ExternalLink,
  HelpCircle,
  X,
  Award,
  ShoppingBag,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import { useEffect } from "react";
import { api } from "@/lib/api";
import { usePencily } from "@/context/PencilyContext";
import { DiscordLogo } from "@/components/BrandIcons";
import { DashboardTab } from "@/components/DashboardSidebar";

export interface ShopItem {
  id: string;
  category: "materials" | "privilege" | "exams" | "profile";
  categoryLabelVi: string;
  categoryLabelEn: string;
  titleVi: string;
  titleEn: string;
  cost: number;
  descriptionVi: string;
  descriptionEn: string;
  badgeTextVi: string;
  badgeTextEn: string;
  badgeStyle: "hot" | "flagship" | "limited" | "exclusive" | "standard";
  fulfillmentType: "download" | "booking" | "discord" | "badge";
  fulfillmentTextVi: string;
  fulfillmentTextEn: string;
  previewNoteVi: string;
  previewNoteEn: string;
  actionUrl?: string;
  accentBg: string;
  accentColor: string;
  isFeatured?: boolean;
}

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: "item-placeholder-mentoring",
    category: "privilege",
    categoryLabelVi: "Vé kèm 1-1 & Flagship",
    categoryLabelEn: "1-on-1 & Flagship",
    titleVi: "[Placeholder] <Tên Suất Kèm 1-1 / Tham Vấn Peer Tutor>",
    titleEn: "[Placeholder] <1-on-1 Tutoring / Mentorship Pass>",
    cost: 50,
    descriptionVi: "<Mô tả chi tiết hình thức kèm 1-1, thời lượng buổi học, môn học hỗ trợ gồm IELTS, SAT, THPT và quy trình đặt lịch với Peer Tutor trên Discord...>",
    descriptionEn: "<Detailed description of 1-on-1 mentoring format, duration, subject coverage (IELTS/SAT/THPT), and Discord booking process...>",
    badgeTextVi: "CHỜ PROOFCHECK",
    badgeTextEn: "PENDING PROOFCHECK",
    badgeStyle: "exclusive",
    fulfillmentType: "booking",
    fulfillmentTextVi: "<Đặt lịch qua Discord>",
    fulfillmentTextEn: "<Book via Discord>",
    previewNoteVi: "<Thời gian phản hồi và xếp lịch theo tuần>",
    previewNoteEn: "<Weekly response and scheduling turnaround>",
    actionUrl: "https://discord.gg/6hpEf4wC4z",
    accentBg: "bg-blue-50",
    accentColor: "text-blue-600",
    isFeatured: true,
  },
  {
    id: "item-placeholder-materials",
    category: "materials",
    categoryLabelVi: "Tài liệu & Mindmap",
    categoryLabelEn: "Study Materials",
    titleVi: "[Placeholder] <Tên Bộ Tài Liệu / Sổ Tay Kiến Thức>",
    titleEn: "[Placeholder] <Study Guide / Knowledge Handbook>",
    cost: 30,
    descriptionVi: "<Mô tả nội dung tài liệu ôn tập, cấu trúc bài học, công thức cô đọng hoặc ghi chú phương pháp học do ban học thuật phụ trách...>",
    descriptionEn: "<Description of review material content, lesson structure, condensed formulas, or study notes provided by academic team...>",
    badgeTextVi: "TÀI LIỆU MẪU",
    badgeTextEn: "SAMPLE GUIDE",
    badgeStyle: "flagship",
    fulfillmentType: "download",
    fulfillmentTextVi: "<Tải file PDF / Drive>",
    fulfillmentTextEn: "<Download PDF / Drive>",
    previewNoteVi: "<Định dạng tài liệu và hướng dẫn truy cập file>",
    previewNoteEn: "<File format and access details>",
    actionUrl: "https://drive.google.com",
    accentBg: "bg-amber-50",
    accentColor: "text-amber-600",
    isFeatured: true,
  },
  {
    id: "item-placeholder-exams",
    category: "exams",
    categoryLabelVi: "Kho Đề Chuyên & Forecast",
    categoryLabelEn: "Exam Vault",
    titleVi: "[Placeholder] <Tên Tuyển Tập Đề Thi & Barem Điểm>",
    titleEn: "[Placeholder] <Mock Exam Bank & Solution Keys>",
    cost: 40,
    descriptionVi: "<Mô tả nguồn tuyển chọn đề thi, mức độ phân loại điểm số, barem đáp án và hướng dẫn giải thích từng câu...>",
    descriptionEn: "<Description of exam sources, score distinction levels, answer rubrics, and detailed step-by-step solutions...>",
    badgeTextVi: "KHO ĐỀ MẪU",
    badgeTextEn: "SAMPLE VAULT",
    badgeStyle: "standard",
    fulfillmentType: "download",
    fulfillmentTextVi: "<Mở kho đề lưu trữ>",
    fulfillmentTextEn: "<Open Drive Repository>",
    previewNoteVi: "<Số lượng đề thi kèm barem chấm chính thức>",
    previewNoteEn: "<Number of mock exams and official rubrics>",
    actionUrl: "https://drive.google.com",
    accentBg: "bg-indigo-50",
    accentColor: "text-indigo-600",
  },
  {
    id: "item-placeholder-discord-role",
    category: "profile",
    categoryLabelVi: "Hồ sơ & Discord VIP",
    categoryLabelEn: "Profile & Discord",
    titleVi: "[Placeholder] <Tên Role VIP / Huy Hiệu Discord The Pencily>",
    titleEn: "[Placeholder] <Discord VIP Role & Badge Name>",
    cost: 25,
    descriptionVi: "<Mô tả vai trò đặc quyền trên server Discord The Pencily, quyền hạn truy cập các phòng chat hoặc kênh trao đổi cùng gia sư...>",
    descriptionEn: "<Description of Discord server role privileges, badge styling, and access permissions for specialized discussion channels...>",
    badgeTextVi: "ROLE DISCORD",
    badgeTextEn: "DISCORD ROLE",
    badgeStyle: "hot",
    fulfillmentType: "discord",
    fulfillmentTextVi: "<Tự động đồng bộ Discord>",
    fulfillmentTextEn: "<Auto-sync Discord>",
    previewNoteVi: "<Thời hạn và quyền lợi tương ứng trên máy chủ>",
    previewNoteEn: "<Duration and associated server permissions>",
    actionUrl: "https://discord.gg/6hpEf4wC4z",
    accentBg: "bg-purple-50",
    accentColor: "text-purple-600",
  },
  {
    id: "item-placeholder-avatar-frame",
    category: "profile",
    categoryLabelVi: "Hồ sơ & Discord VIP",
    categoryLabelEn: "Profile & Discord",
    titleVi: "[Placeholder] <Tên Khung Avatar Trang Trí Hồ Sơ>",
    titleEn: "[Placeholder] <Custom Avatar Profile Frame Name>",
    cost: 20,
    descriptionVi: "<Mô tả khung viền avatar cá nhân hiển thị trên hồ sơ học sinh và danh sách lớp học của The Pencily...>",
    descriptionEn: "<Description of decorative avatar border displayed on student profile and live class attendance lists...>",
    badgeTextVi: "KHUNG HỒ SƠ",
    badgeTextEn: "PROFILE FRAME",
    badgeStyle: "standard",
    fulfillmentType: "badge",
    fulfillmentTextVi: "<Kích hoạt trên hồ sơ web>",
    fulfillmentTextEn: "<Equip on Web Profile>",
    previewNoteVi: "<Hiển thị trực tiếp trên tài khoản cá nhân>",
    previewNoteEn: "<Visible on personal account card>",
    accentBg: "bg-emerald-50",
    accentColor: "text-emerald-600",
  },
];

interface DashboardShopProps {
  onSelectTab?: (tab: DashboardTab) => void;
}

export function DashboardShop({ onSelectTab }: DashboardShopProps) {
  const { user, redeemReward, backendAuthenticated, language } = usePencily();
  const isVi = language === "vi";

  // Filter & Search states
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activePriceRange, setActivePriceRange] = useState<"all" | "under50" | "50to100" | "over100">("all");
  const [onlyAffordable, setOnlyAffordable] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "title">("featured");

  // Redeemed items tracking
  const [redemptions, setRedemptions] = useState<{userId:string;ids:string[]}>({userId:"",ids:[]});
  const redeemedIds = redemptions.userId === user.id ? redemptions.ids : [];
  const [selectedReward, setSelectedReward] = useState<ShopItem | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isHowToEarnOpen, setIsHowToEarnOpen] = useState(false);
  const [isRedeemedHistoryOpen, setIsRedeemedHistoryOpen] = useState(false);

  useEffect(() => {
    if (!backendAuthenticated) return;
    let active = true;
    void api<{ids:string[]}>("/api/rewards").then((result) => {if(active)setRedemptions({userId:user.id,ids:result.ids});}).catch(() => {});
    return () => {active=false;};
  }, [backendAuthenticated, user.id]);

  const handleRedeem = async (item: ShopItem) => {
    if (user.points < item.cost || redeemedIds.includes(item.id)) return;

    // Deduct points
    if (!(await redeemReward(item.id))) return;

    // Save redemption
    const next = Array.from(new Set([...redeemedIds, item.id]));
    setRedemptions({userId:user.id,ids:next});


    // Open success modal
    setSelectedReward(item);
    setIsSuccessModalOpen(true);
  };

  // Filtered & Sorted items
  const filteredItems = useMemo(() => {
    return SHOP_ITEMS.filter((item) => {
      // Category filter
      if (activeCategory !== "all" && item.category !== activeCategory) {
        return false;
      }
      // Price range
      if (activePriceRange === "under50" && item.cost >= 50) return false;
      if (activePriceRange === "50to100" && (item.cost < 50 || item.cost > 100)) return false;
      if (activePriceRange === "over100" && item.cost <= 100) return false;

      // Only affordable
      if (onlyAffordable && user.points < item.cost) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchTitle = item.titleVi.toLowerCase().includes(query) || item.titleEn.toLowerCase().includes(query);
        const matchDesc = item.descriptionVi.toLowerCase().includes(query) || item.descriptionEn.toLowerCase().includes(query);
        const matchBadge = item.badgeTextVi.toLowerCase().includes(query) || item.badgeTextEn.toLowerCase().includes(query);
        if (!matchTitle && !matchDesc && !matchBadge) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.cost - b.cost;
      if (sortBy === "price-desc") return b.cost - a.cost;
      if (sortBy === "title") return a.titleVi.localeCompare(b.titleVi);
      // "featured" default
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });
  }, [activeCategory, activePriceRange, onlyAffordable, searchQuery, sortBy, user.points]);

  const categories = [
    { id: "all", labelVi: "Tất cả", labelEn: "All", count: SHOP_ITEMS.length },
    { id: "materials", labelVi: "Tài liệu & Mindmap", labelEn: "Study Materials", count: SHOP_ITEMS.filter((i) => i.category === "materials").length },
    { id: "privilege", labelVi: "Vé kèm 1-1 & Flagship", labelEn: "1-on-1 & Flagship", count: SHOP_ITEMS.filter((i) => i.category === "privilege").length },
    { id: "exams", labelVi: "Kho Đề Chuyên & Forecast", labelEn: "Exam Vault", count: SHOP_ITEMS.filter((i) => i.category === "exams").length },
    { id: "profile", labelVi: "Hồ sơ & Discord VIP", labelEn: "Profile & Discord", count: SHOP_ITEMS.filter((i) => i.category === "profile").length },
  ];

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      {/* Standard Tab Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-slate-300">
        <div>
          <h2 className="font-poppins font-black text-2xl sm:text-3xl text-[#0F2747] tracking-tight">
            {isVi ? "Cửa Hàng Pencily Points" : "Pencily Points Shop"}
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] mt-1 font-medium">
            {isVi
              ? "Đổi điểm tích lũy học tập thành đặc quyền học thuật, tài liệu và vé kèm 1-1"
              : "Redeem study points for academic perks, verified vaults, and 1-on-1 passes"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-sm bg-white border-2 border-slate-300 text-xs font-bold text-[#0F2747] flex items-center gap-2 shadow-2xs">
            <span className="text-slate-500">{isVi ? "Số dư:" : "Balance:"}</span>
            <span className="font-mono font-black text-amber-600">{user.points} PP</span>
          </div>
        </div>
      </div>

      {/* 1. HERO BANNER */}
      <div className="relative bg-[#0F2747] text-white rounded-md border-2 border-[#0F2747] p-5 sm:p-7 overflow-hidden shadow-sm">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FFF9EF_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFC83D]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#0F2747] bg-[#FFC83D] px-2 py-0.5 rounded-xs">
                {isVi ? "CỬA HÀNG PP" : "PP SHOP"}
              </span>
              <span className="text-[10px] font-bold text-amber-200 bg-amber-950/40 px-2 py-0.5 rounded-xs border border-amber-400/30">
                {isVi ? "BẢN MẪU PROOFCHECK" : "PROOFCHECK TEMPLATE"}
              </span>
            </div>

            <h2 className="font-poppins font-black text-xl sm:text-2xl lg:text-3xl text-white tracking-tight leading-tight">
              {isVi ? "Cửa Hàng Pencily Points" : "The Pencily Points Shop"}
              <span className="block text-[#FFC83D] text-lg sm:text-xl lg:text-2xl mt-0.5 font-bold">
                {isVi ? "Đổi nỗ lực học tập thành đặc quyền học thuật" : "Turn study effort into academic rewards"}
              </span>
            </h2>

            <p className="text-xs text-slate-300 leading-relaxed">
              {isVi
                ? "Tích lũy điểm PP qua các buổi học, chia sẻ ghi chú và tương tác cộng đồng để mở khóa tài liệu học thuật độc quyền, kho đề thi chuyên và các suất kèm 1-1 cùng Peer Tutor."
                : "Earn PP by joining study pods, sharing notes, and engaging with peers to unlock exclusive academic study vaults, mock exams, and 1-on-1 tutoring passes."}
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setIsHowToEarnOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-white/10 hover:bg-white/20 text-white border-2 border-white/20 font-bold text-xs transition cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#FFC83D]" />
                <span>{isVi ? "Cách kiếm thêm PP" : "How to Earn PP"}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsRedeemedHistoryOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-[#FFC83D] hover:bg-[#f3bd30] text-[#0F2747] font-bold text-xs transition cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{isVi ? `Đã đổi (${redeemedIds.length})` : `Redeemed (${redeemedIds.length})`}</span>
              </button>
            </div>
          </div>

          {/* Right: Balance Card */}
          <div className="w-full lg:w-auto shrink-0 bg-white/95 text-[#0F2747] rounded-sm border-2 border-[#FFC83D] p-4 shadow-md min-w-[240px]">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              {isVi ? "Số dư khả dụng của bạn" : "Your Available Balance"}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-poppins font-black text-3xl text-[#0F2747]">
                {user.points.toLocaleString(isVi ? "vi-VN" : "en-US")}
              </span>
              <span className="font-bold text-sm text-amber-700">PP</span>
            </div>
            <div className="mt-3 pt-3 border-t-2 border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-semibold">{isVi ? "Vật phẩm đã đổi:" : "Items Redeemed:"}</span>
              <span className="font-bold text-[#0F2747]">{redeemedIds.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DRAFT NOTICE BANNER */}
      <div className="p-3 bg-amber-50 border-2 border-amber-300 rounded-sm text-xs text-amber-950 flex items-start gap-2.5">
        <span className="text-amber-600 font-black shrink-0">⚠️</span>
        <div className="leading-relaxed">
          <span className="font-bold">
            {isVi ? "Lưu ý kiểm duyệt:" : "Proofcheck Notice:"}
          </span>{" "}
          {isVi
            ? "Toàn bộ danh mục vật phẩm, mức điểm và quyền lợi dưới đây hiện là khung mẫu placeholder. Ban điều phối The Pencily sẽ cập nhật danh mục chính thức sau khi hoàn tất đối soát quyền lợi thực tế."
            : "The reward items, point costs, and perks below are currently template placeholders. The operations team will publish official listings following finalized verification."}
        </div>
      </div>

      {/* 3. CONTROL & SEARCH BAR */}
      <div className="bg-white rounded-sm border-2 border-slate-300 p-3 sm:p-4 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isVi ? "Tìm tài liệu, đề thi, vé kèm 1-1..." : "Search materials, exams, passes..."}
              className="w-full pl-9 pr-8 py-2 bg-slate-50 border-2 border-slate-200 focus:border-[#0F2747] focus:bg-white rounded-sm text-xs text-[#0F2747] placeholder:text-slate-400 focus:outline-none transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Affordable Toggle */}
            <button
              type="button"
              onClick={() => setOnlyAffordable(!onlyAffordable)}
              className={`px-3 py-2 rounded-sm border-2 text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                onlyAffordable
                  ? "bg-[#0F2747] text-white border-[#0F2747]"
                  : "bg-white text-slate-700 border-slate-300 hover:border-[#0F2747]"
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isVi ? "Đủ điểm đổi" : "Affordable"}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="appearance-none pl-3 pr-7 py-2 bg-white border-2 border-slate-300 focus:border-[#0F2747] rounded-sm text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="featured">{isVi ? "Nổi bật" : "Featured"}</option>
                <option value="price-asc">{isVi ? "PP: Thấp → Cao" : "PP: Low to High"}</option>
                <option value="price-desc">{isVi ? "PP: Cao → Thấp" : "PP: High to Low"}</option>
                <option value="title">{isVi ? "Tên A-Z" : "Name A-Z"}</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-0.5 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-sm text-xs font-bold whitespace-nowrap transition cursor-pointer border-2 ${
                  isSelected
                    ? "bg-[#0F2747] text-white border-[#0F2747]"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400"
                }`}
              >
                <span>{isVi ? cat.labelVi : cat.labelEn}</span>
                <span
                  className={`ml-1.5 text-[10px] px-1.5 py-0.2 rounded-xs ${
                    isSelected ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. ITEMS GRID */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-sm border-2 border-slate-300 p-6 space-y-3">
          <div className="w-12 h-12 mx-auto rounded-sm bg-slate-100 border-2 border-slate-300 text-slate-400 flex items-center justify-center font-bold text-base">
            PP
          </div>
          <h3 className="font-poppins font-black text-base text-[#0F2747]">
            {isVi ? "Không tìm thấy vật phẩm phù hợp" : "No Matching Items Found"}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {isVi
              ? "Hãy thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục khác để xem thêm vật phẩm."
              : "Try adjusting your search query or selecting a different category."}
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory("all");
              setSearchQuery("");
              setOnlyAffordable(false);
            }}
            className="px-4 py-2 rounded-sm bg-[#0F2747] text-white font-bold text-xs transition cursor-pointer"
          >
            {isVi ? "Đặt lại bộ lọc" : "Reset Filters"}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredItems.map((item) => {
            const isRedeemed = redeemedIds.includes(item.id);
            const canAfford = user.points >= item.cost;
            const diff = item.cost - user.points;

            return (
              <div
                key={item.id}
                className="bg-white rounded-sm border-2 border-slate-300 hover:border-[#0F2747] transition flex flex-col justify-between shadow-2xs group"
              >
                <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col">
                  {/* Card Top: Category & Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-[#4F7ECB]">
                      {isVi ? item.categoryLabelVi : item.categoryLabelEn}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-xs">
                      {isVi ? item.badgeTextVi : item.badgeTextEn}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-poppins font-bold text-sm sm:text-base text-[#0F2747] leading-snug line-clamp-2">
                    {isVi ? item.titleVi : item.titleEn}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#475569] leading-relaxed line-clamp-3 flex-1">
                    {isVi ? item.descriptionVi : item.descriptionEn}
                  </p>

                  {/* Fulfillment Type */}
                  <div className="pt-2 border-t-2 border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                    {item.fulfillmentType === "download" && <Download className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                    {item.fulfillmentType === "booking" && <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                    {item.fulfillmentType === "discord" && <DiscordLogo className="w-3.5 h-3.5 fill-[#5865F2] shrink-0" />}
                    {item.fulfillmentType === "badge" && <Award className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                    <span className="truncate">{isVi ? item.fulfillmentTextVi : item.fulfillmentTextEn}</span>
                  </div>
                </div>

                {/* Card Footer: Cost & Action */}
                <div className="p-3.5 bg-[#FAF7F2] border-t-2 border-slate-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-6 h-6 rounded-xs bg-amber-100 border border-amber-300 text-amber-900 font-black text-[10px] flex items-center justify-center">
                      PP
                    </span>
                    <span className="font-poppins font-black text-base text-[#0F2747]">
                      {item.cost}
                    </span>
                  </div>

                  {isRedeemed ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedReward(item);
                        setIsSuccessModalOpen(true);
                      }}
                      className="px-3.5 py-1.5 rounded-sm bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs transition active:scale-98 flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isVi ? "Đã đổi (Mở)" : "Redeemed"}</span>
                    </button>
                  ) : canAfford ? (
                    <button
                      type="button"
                      onClick={() => handleRedeem(item)}
                      className="px-3.5 py-1.5 rounded-sm bg-[#0F2747] hover:bg-slate-800 text-white font-bold text-xs shadow-2xs transition active:scale-98 cursor-pointer"
                    >
                      {isVi ? "Đổi ngay" : "Redeem"}
                    </button>
                  ) : (
                    <div
                      className="px-3 py-1.5 rounded-sm bg-slate-100 text-slate-400 font-bold text-[11px] border border-slate-200 flex items-center gap-1 cursor-not-allowed"
                      title={isVi ? `Bạn còn thiếu ${diff} PP` : `Need ${diff} more PP`}
                    >
                      <Lock className="w-3 h-3" />
                      <span>{isVi ? `Thiếu ${diff} PP` : `Need ${diff} PP`}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. SUCCESS MODAL */}
      {isSuccessModalOpen && selectedReward && (
        <div className="pencily-side-panel">
          <div className="bg-white rounded-md border-2 border-[#0F2747] max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setIsSuccessModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-sm text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-sm bg-emerald-50 border-2 border-emerald-300 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-xs">
                  {isVi ? "Đổi Thưởng Thành Công" : "Redemption Successful"}
                </span>
                <h3 className="font-poppins font-black text-base sm:text-lg text-[#0F2747] mt-0.5">
                  {isVi ? selectedReward.titleVi : selectedReward.titleEn}
                </h3>
              </div>
            </div>

            <div className="p-3.5 rounded-sm bg-[#FAF7F2] border-2 border-slate-200 space-y-2 text-xs">
              <div className="font-bold text-[#0F2747]">
                {isVi ? "Hướng dẫn nhận phần thưởng:" : "How to claim your reward:"}
              </div>
              <p className="text-slate-600 leading-relaxed">
                {isVi ? selectedReward.previewNoteVi : selectedReward.previewNoteEn}
              </p>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                <span>{isVi ? "Chi phí quy đổi:" : "Points Deducted:"} {selectedReward.cost} PP</span>
                <span>{isVi ? "Số dư hiện tại:" : "Current Balance:"} {user.points} PP</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
              {selectedReward.actionUrl ? (
                <a
                  href={selectedReward.actionUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm bg-[#0F2747] hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition"
                >
                  <span>{isVi ? "Mở đường dẫn nhận thưởng" : "Open Reward Link"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsSuccessModalOpen(false)}
                  className="w-full sm:flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-sm bg-[#0F2747] text-white font-bold text-xs"
                >
                  {isVi ? "Đã kích hoạt vào hồ sơ" : "Equipped to Profile"}
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsSuccessModalOpen(false)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-sm bg-white border-2 border-slate-300 hover:border-[#0F2747] text-[#0F2747] font-bold text-xs cursor-pointer"
              >
                {isVi ? "Đóng" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. HOW TO EARN MODAL */}
      {isHowToEarnOpen && (
        <div className="pencily-side-panel">
          <div className="bg-white rounded-md border-2 border-[#0F2747] max-w-xl w-full p-6 sm:p-7 space-y-5 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setIsHowToEarnOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-sm text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-6 rounded-xs bg-amber-100 border border-amber-300 text-amber-900 font-black text-[10px] flex items-center justify-center">
                  PP
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#4F7ECB]">
                  {isVi ? "Cẩm nang học tập" : "Learning Guide"}
                </span>
              </div>
              <h3 className="font-poppins font-black text-xl text-[#0F2747]">
                {isVi ? "Cách Tích Lũy Pencily Points (PP)" : "How to Earn Pencily Points"}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {isVi
                  ? "Điểm PP là minh chứng cho tinh thần học tập chủ động và đóng góp cho cộng đồng."
                  : "PP reflects active learning dedication and mutual contribution to fellow peers."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-sm border-2 border-slate-200 bg-[#FAF7F2] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#0F2747]">
                    {isVi ? "Tham gia lớp học" : "Attend Study Pods"}
                  </span>
                  <span className="text-[11px] font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-xs">
                    1 PP / 12 phút
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {isVi
                    ? "Thời gian học trong phòng web được server xác nhận qua heartbeat hai phía."
                    : "Web room attendance is verified by the server through a two-sided heartbeat."}
                </p>
              </div>

              <div className="p-3.5 rounded-sm border-2 border-slate-200 bg-[#FAF7F2] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#0F2747]">
                    {isVi ? "Chia sẻ tài liệu hay" : "Share Study Guides"}
                  </span>
                  <span className="text-[11px] font-black text-blue-800 bg-blue-100 px-2 py-0.5 rounded-xs">
                    Xem thử · 0 PP
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {isVi
                    ? "Đăng sơ đồ mindmap, đề cương ôn tập có ích lên diễn đàn cộng đồng."
                    : "Post verified mindmaps or Cornell notes to the community feed."}
                </p>
              </div>

              <div className="p-3.5 rounded-sm border-2 border-slate-200 bg-[#FAF7F2] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#0F2747]">
                    {isVi ? "Hỏi đáp & Thảo luận" : "Ask & Discuss"}
                  </span>
                  <span className="text-[11px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-xs">
                    Xem thử · 0 PP
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {isVi
                    ? "Gỡ rối bài tập cho bạn cùng lứa hoặc thảo luận chủ đề ôn thi."
                    : "Help peers solve difficult questions or start constructive discussions."}
                </p>
              </div>

              <div className="p-3.5 rounded-sm border-2 border-slate-200 bg-[#FAF7F2] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#0F2747]">
                    {isVi ? "Host lớp Peer Tutor" : "Host as Peer Tutor"}
                  </span>
                  <span className="text-[11px] font-black text-purple-800 bg-purple-100 px-2 py-0.5 rounded-xs">
                    1 PP / 2 phút
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {isVi
                    ? "Đăng ký làm Peer Tutor, hướng dẫn các bạn khóa dưới và tích lũy portfolio."
                    : "Apply as a Peer Tutor, mentor junior students, and earn verified hours."}
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setIsHowToEarnOpen(false)}
                className="px-5 py-2 rounded-sm bg-[#0F2747] hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
              >
                {isVi ? "Đã hiểu, quay lại cửa hàng" : "Got it, back to Shop"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. REDEEMED ITEMS HISTORY MODAL */}
      {isRedeemedHistoryOpen && (
        <div className="pencily-side-panel">
          <div className="bg-white rounded-md border-2 border-[#0F2747] max-w-xl w-full p-6 space-y-4 shadow-2xl relative max-h-[85vh] flex flex-col">
            <button
              type="button"
              onClick={() => setIsRedeemedHistoryOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-sm text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="shrink-0">
              <div className="text-xs font-bold uppercase tracking-wider text-[#4F7ECB]">
                {isVi ? "Kho phần thưởng của bạn" : "Your Reward Vault"}
              </div>
              <h3 className="font-poppins font-black text-lg sm:text-xl text-[#0F2747]">
                {isVi ? `Vật phẩm đã đổi (${redeemedIds.length})` : `Redeemed Items (${redeemedIds.length})`}
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
              {redeemedIds.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-xs">
                  {isVi ? "Bạn chưa đổi phần thưởng nào. Hãy tích lũy thêm PP nhé!" : "No rewards redeemed yet. Start earning PP!"}
                </div>
              ) : (
                redeemedIds.map((id) => {
                  const item = SHOP_ITEMS.find((i) => i.id === id);
                  if (!item) return null;

                  return (
                    <div
                      key={id}
                      className="p-3.5 rounded-sm border-2 border-slate-200 bg-[#FAF7F2] flex items-center justify-between gap-4"
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-xs text-[#0F2747]">
                          {isVi ? item.titleVi : item.titleEn}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {isVi ? item.fulfillmentTextVi : item.fulfillmentTextEn} · {item.cost} PP
                        </div>
                      </div>

                      {item.actionUrl && (
                        <a
                          href={item.actionUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-sm bg-[#0F2747] hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1 shrink-0"
                        >
                          <span>{isVi ? "Truy cập" : "Access"}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            <div className="pt-2 shrink-0 flex justify-end">
              <button
                type="button"
                onClick={() => setIsRedeemedHistoryOpen(false)}
                className="px-4 py-2 rounded-sm bg-white border-2 border-slate-300 hover:border-[#0F2747] text-[#0F2747] font-bold text-xs cursor-pointer"
              >
                {isVi ? "Đóng" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
