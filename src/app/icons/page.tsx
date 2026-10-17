"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { 
  ArrowLeft, 
  Search, 
  Copy, 
  Check, 
  Download, 
  SlidersHorizontal, 
  Eye, 
  Sparkles,
  Layers,
  FileCode,
  ExternalLink,
  Printer
} from "lucide-react";
import { ICONS_INVENTORY, CATEGORIES, IconItem } from "./iconInventoryData";

// Custom Pencily Kit Icons
import {
  PencilyProfileIcon,
  PencilyPortfolioIcon,
  PencilyClassroomsIcon,
  PencilySettingsIcon,
  PencilyReferFriendIcon,
  PencilyBugReportIcon,
  PencilyHelpDeskIcon,
  PencilySupportChatIcon,
  PencilySafetyFlagIcon,
  PencilyBellIcon,
  PencilyCalendarIcon,
  PencilyChatBubbleIcon,
  PencilyLogOutIcon,
  PencilyPointsToken,
  PencilyCompassIcon,
  PencilyStoreIcon,
  PencilyCommunityIcon,
  PencilyShieldIcon,
  PencilyListeningIcon,
  PencilyReadingIcon,
  PencilyWritingIcon,
  PencilySpeakingIcon,
  PencilyIeltsIcon,
  PencilySatIcon,
  PencilyTrophyIcon,
  PencilyMicIcon,
  PencilyVideoIcon,
  PencilySearchIcon,
  PencilySquircleTile,
} from "@/components/icons/PencilyIcons";

// Brand Artworks
import {
  IconLearn,
  IconShare,
  IconTeach,
  IconCollaborate,
  IconGrow,
  DiscordLogo,
  LibraryDeckIcon,
} from "@/components/BrandIcons";

import {
  LibraryClosedBookIcon,
  LibraryOpenBookLogo,
} from "@/components/LibraryBookLogo";

import {
  BrandAppIcon,
  PencilMascot,
  OwlMascot,
} from "@/components/Logo";

import {
  YellowScribble,
  DoodleArrow,
  WavyLine,
  ZigzagLine,
  PencilDoodleParticle,
} from "@/components/BrandDecorations";

export default function IconsInventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");
  const [bgMode, setBgMode] = useState<"cream" | "navy" | "white">("cream");
  const [viewMode, setViewMode] = useState<"cards" | "compact">("cards");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  // Filter items
  const filteredItems = useMemo(() => {
    return ICONS_INVENTORY.filter((item) => {
      // Category match
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      // Type match
      if (selectedType !== "all" && item.type !== selectedType) {
        return false;
      }
      // Priority match
      if (selectedPriority !== "all" && item.priority !== selectedPriority) {
        return false;
      }
      // Search match
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchLabel = item.labelVi.toLowerCase().includes(query);
        const matchLoc = item.location.toLowerCase().includes(query);
        const matchNote = item.noteVi.toLowerCase().includes(query);
        const matchSymbol = item.symbol ? item.symbol.includes(query) : false;
        return matchName || matchLabel || matchLoc || matchNote || matchSymbol;
      }
      return true;
    });
  }, [selectedCategory, selectedType, selectedPriority, searchTerm]);

  // Statistics
  const stats = useMemo(() => {
    const total = ICONS_INVENTORY.length;
    const lucide = ICONS_INVENTORY.filter(i => i.type === "lucide").length;
    const brand = ICONS_INVENTORY.filter(i => i.type === "brand" || i.type === "decoration").length;
    const kit = ICONS_INVENTORY.filter(i => i.type === "pencily-kit").length;
    const emojis = ICONS_INVENTORY.filter(i => i.type === "emoji").length;
    const highPrio = ICONS_INVENTORY.filter(i => i.priority === "high").length;
    return { total, lucide, brand, kit, emojis, highPrio };
  }, []);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleCopyFullMarkdown = () => {
    let md = `# THE PENCILY - MASTER ICON & EMOJI SPECIFICATION\n`;
    md += `Quy chuẩn thiết kế: Stroke 2px, Grid 24x24 px, Squarish 1.5px, Tuyệt đối KHÔNG dùng nốt ruồi / status dots.\n\n`;
    md += `| STT | Ký hiệu / Component | Phân loại | Tên nghiệp vụ | Vị trí sử dụng | Yêu cầu thiết kế cho Designer |\n`;
    md += `| --- | --- | --- | --- | --- | --- |\n`;

    filteredItems.forEach((item, idx) => {
      const sym = item.symbol || item.componentName || item.name;
      md += `| ${idx + 1} | ${sym} | ${item.type.toUpperCase()} | ${item.labelVi} | \`${item.location.split(',')[0]}\` | ${item.noteVi} |\n`;
    });

    navigator.clipboard.writeText(md);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  // Render icon preview
  const renderIconPreview = (item: IconItem, size = 28) => {
    const isDark = bgMode === "navy";
    const defaultColor = isDark ? "#FFFFFF" : "#0F2747";

    // 1. Custom Brand or Pencily Kit Component
    if (item.componentName) {
      switch (item.componentName) {
        // Brand Pillars
        case "IconLearn": return <IconLearn size={size} />;
        case "IconShare": return <IconShare size={size} />;
        case "IconTeach": return <IconTeach size={size} />;
        case "IconCollaborate": return <IconCollaborate size={size} />;
        case "IconGrow": return <IconGrow size={size} />;
        case "DiscordLogo": return <DiscordLogo className="w-7 h-7 text-[#5865F2]" />;
        case "LibraryDeckIcon": return <LibraryDeckIcon size={size} color={defaultColor} />;
        case "LibraryOpenBookLogo": return <LibraryOpenBookLogo className="w-8 h-8" />;
        case "LibraryClosedBookIcon": return <LibraryClosedBookIcon className="w-7 h-7 text-[#0F2747]" />;
        case "BrandAppIcon": return <BrandAppIcon size={size > 30 ? "lg" : "sm"} />;
        case "PencilMascot": return <PencilMascot size={size} />;
        case "OwlMascot": return <OwlMascot size={size} />;
        
        // Brand Decorations
        case "PencilDoodleParticle": return <PencilDoodleParticle size={size} variant={isDark ? "yellow" : "navy"} />;
        case "YellowScribble": return <YellowScribble className="w-14 h-4" />;
        case "DoodleArrow": return <DoodleArrow className="w-8 h-6" />;
        case "WavyLine": return <WavyLine className="w-9 h-5" />;
        case "ZigzagLine": return <ZigzagLine className="w-8 h-5" />;

        // Pencily Kit
        case "PencilyProfileIcon": return <PencilyProfileIcon size={size} color={defaultColor} />;
        case "PencilyPortfolioIcon": return <PencilyPortfolioIcon size={size} color={defaultColor} />;
        case "PencilyClassroomsIcon": return <PencilyClassroomsIcon size={size} color={defaultColor} />;
        case "PencilySettingsIcon": return <PencilySettingsIcon size={size} color={defaultColor} />;
        case "PencilyReferFriendIcon": return <PencilyReferFriendIcon size={size} color={defaultColor} />;
        case "PencilyBugReportIcon": return <PencilyBugReportIcon size={size} color={defaultColor} />;
        case "PencilyHelpDeskIcon": return <PencilyHelpDeskIcon size={size} color={defaultColor} />;
        case "PencilySupportChatIcon": return <PencilySupportChatIcon size={size} color={defaultColor} />;
        case "PencilySafetyFlagIcon": return <PencilySafetyFlagIcon size={size} color={defaultColor} />;
        case "PencilyBellIcon": return <PencilyBellIcon size={size} color={defaultColor} />;
        case "PencilyCalendarIcon": return <PencilyCalendarIcon size={size} color={defaultColor} />;
        case "PencilyChatBubbleIcon": return <PencilyChatBubbleIcon size={size} color={defaultColor} />;
        case "PencilyLogOutIcon": return <PencilyLogOutIcon size={size} color={defaultColor} />;
        case "PencilyPointsToken": return <PencilyPointsToken size={size} />;
        case "PencilyCompassIcon": return <PencilyCompassIcon size={size} color={defaultColor} />;
        case "PencilyStoreIcon": return <PencilyStoreIcon size={size} color={defaultColor} />;
        case "PencilyCommunityIcon": return <PencilyCommunityIcon size={size} color={defaultColor} />;
        case "PencilyShieldIcon": return <PencilyShieldIcon size={size} color={defaultColor} />;
        case "PencilyListeningIcon": return (
          <PencilySquircleTile variant="sky" size="sm" border={false}>
            <PencilyListeningIcon size={size - 4} color="#1E3A5F" />
          </PencilySquircleTile>
        );
        case "PencilyReadingIcon": return (
          <PencilySquircleTile variant="emerald" size="sm" border={false}>
            <PencilyReadingIcon size={size - 4} color="#166534" />
          </PencilySquircleTile>
        );
        case "PencilyWritingIcon": return (
          <PencilySquircleTile variant="amber" size="sm" border={false}>
            <PencilyWritingIcon size={size - 4} color="#B45309" />
          </PencilySquircleTile>
        );
        case "PencilySpeakingIcon": return (
          <PencilySquircleTile variant="purple" size="sm" border={false}>
            <PencilySpeakingIcon size={size - 4} color="#6B2D78" />
          </PencilySquircleTile>
        );
        case "PencilyIeltsIcon": return <PencilyIeltsIcon size={size - 4} />;
        case "PencilySatIcon": return <PencilySatIcon size={size - 4} />;
        case "PencilyTrophyIcon": return <PencilyTrophyIcon size={size} color={defaultColor} />;
        case "PencilyMicIcon": return <PencilyMicIcon size={size} color={defaultColor} />;
        case "PencilyVideoIcon": return <PencilyVideoIcon size={size} color={defaultColor} />;
        case "PencilySearchIcon": return <PencilySearchIcon size={size} color={defaultColor} />;
      }
    }

    // 2. Emoji or raw symbol
    if (item.symbol) {
      return (
        <span 
          style={{ fontSize: size }} 
          className="leading-none select-none inline-flex items-center justify-center"
        >
          {item.symbol}
        </span>
      );
    }

    // 3. Lucide Icon lookup
    const LucideComp = (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; color?: string; strokeWidth?: number; className?: string }>>)[item.name];
    if (LucideComp) {
      return <LucideComp size={size} color={defaultColor} strokeWidth={2} />;
    }

    // Fallback
    return <span className="text-xs font-mono text-slate-400">SVG</span>;
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      bgMode === "navy" 
        ? "bg-[#0F2747] text-white" 
        : bgMode === "white" 
        ? "bg-[#F8FAFC] text-[#0F2747]" 
        : "bg-[#FFF9EF] text-[#0F2747]"
    }`}>
      {/* 1. TOP STICKY BAR */}
      <header className={`sticky top-0 z-30 border-b backdrop-blur-md transition-colors ${
        bgMode === "navy" 
          ? "bg-[#0F2747]/95 border-slate-700/80" 
          : bgMode === "white" 
          ? "bg-white/95 border-slate-200" 
          : "bg-[#FFF9EF]/95 border-amber-200/60"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className={`p-2 rounded-md border transition-all ${
                bgMode === "navy" 
                  ? "border-slate-700 hover:bg-slate-800 text-white" 
                  : "border-slate-300 hover:bg-white text-[#0F2747]"
              }`}
              title="Về Trang Chủ"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-wider uppercase px-2 py-0.5 rounded-xs bg-[#FFC83D] text-[#0F2747] border border-[#0F2747]">
                  DESIGN SYSTEM SPEC
                </span>
                <span className="text-xs font-semibold opacity-75">
                  The Pencily • Toàn Bộ Assets
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight">
                Tổng Hợp Toàn Bộ Icon, Emoji & Brand Assets
              </h1>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md border transition-all ${
                bgMode === "navy"
                  ? "bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
                  : "bg-white border-slate-300 text-[#0F2747] hover:bg-slate-50 shadow-xs"
              }`}
              title="In hoặc lưu dạng PDF để gửi design"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>In / Chụp Trang</span>
            </button>

            <button
              onClick={handleCopyFullMarkdown}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-md bg-[#0F2747] text-white border border-[#0F2747] hover:bg-[#1A3A63] transition-all shadow-xs"
              title="Sao chép toàn bộ danh sách Markdown vào Clipboard"
            >
              {copiedAll ? <Check className="w-3.5 h-3.5 text-[#FFC83D]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedAll ? "Đã chép Markdown!" : "Copy Bảng Cho Design"}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* 2. DESIGN BRIEF CARD & GUIDELINES */}
        <div className={`p-6 rounded-xl border-2 transition-all ${
          bgMode === "navy"
            ? "bg-slate-900/90 border-[#FFC83D]/40 text-slate-100"
            : "bg-white border-slate-300 shadow-sm"
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#FFC83D]/20 border border-[#FFC83D] text-[#0F2747] dark:text-amber-300 text-xs font-black uppercase tracking-wider">
                Yêu Cầu Thiết Kế Custom Cho Đội Ngũ Designer (Design Brief)
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-balance">
                Bộ Nhận Diện Biểu Tượng & Ký Hiệu Độc Quyền Của The Pencily
              </h2>
              <p className="text-sm leading-relaxed opacity-90">
                Toàn bộ nền tảng học tập đồng đẳng The Pencily gồm <strong>180 biểu tượng</strong> (109 Lucide Icons, 34 Brand Assets/Pencily Signature Kit, và 37 Emoji nghiệp vụ). Để mang lại cảm xúc học đường chân thực, kiến trúc và đáng tin cậy, đội ngũ Design cần chuyển đổi toàn bộ icon & emoji sang bộ vector riêng biệt theo đúng quy chuẩn dưới đây.
              </p>
            </div>

            {/* Quick Stat Pill */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
              <div className={`p-3 rounded-lg border text-center ${bgMode === "navy" ? "bg-slate-800/80 border-slate-700" : "bg-[#FFF9EF] border-amber-200"}`}>
                <div className="text-2xl font-black text-[#FFC83D]">{stats.total}</div>
                <div className="text-[11px] font-bold opacity-75 uppercase">Tổng Số Items</div>
              </div>
              <div className={`p-3 rounded-lg border text-center ${bgMode === "navy" ? "bg-slate-800/80 border-slate-700" : "bg-white border-slate-200"}`}>
                <div className="text-2xl font-black text-[#0F2747] dark:text-white">{stats.lucide}</div>
                <div className="text-[11px] font-bold opacity-75 uppercase">Lucide Icons</div>
              </div>
              <div className={`p-3 rounded-lg border text-center ${bgMode === "navy" ? "bg-slate-800/80 border-slate-700" : "bg-white border-slate-200"}`}>
                <div className="text-2xl font-black text-rose-500">{stats.emojis}</div>
                <div className="text-[11px] font-bold opacity-75 uppercase">Cần Thay Emoji</div>
              </div>
            </div>
          </div>

          {/* 4 Critical Golden Rules for Design Team */}
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`p-3.5 rounded-lg border ${bgMode === "navy" ? "bg-slate-800/50 border-slate-700" : "bg-slate-50 border-slate-200"}`}>
              <div className="text-xs font-extrabold uppercase text-[#FFC83D] tracking-wide mb-1">
                1. Hệ Lưới & Độ Dày Nét
              </div>
              <p className="text-xs leading-relaxed opacity-85">
                • Grid cơ sở: <strong>24x24 px</strong> (UI icons) & <strong>48x48 px</strong> (Pillars / Badges).<br />
                • Độ dày nét đồng nhất: <strong>2.0 px stroke</strong>, đường viền vector sạch (clean bezier).
              </p>
            </div>

            <div className={`p-3.5 rounded-lg border ${bgMode === "navy" ? "bg-slate-800/50 border-slate-700" : "bg-slate-50 border-slate-200"}`}>
              <div className="text-xs font-extrabold uppercase text-[#FFC83D] tracking-wide mb-1">
                2. Hình Khối Kiến Trúc
              </div>
              <p className="text-xs leading-relaxed opacity-85">
                • Bo góc siêu nhẹ: <strong>1.5px corner radius</strong> (Samsung squarish micro-radius).<br />
                • Tránh hoàn toàn bo tròn trơn xoe kiểu bong bóng chatbot.
              </p>
            </div>

            <div className={`p-3.5 rounded-lg border ${bgMode === "navy" ? "bg-rose-950/40 border-rose-800/60" : "bg-rose-50/60 border-rose-200"}`}>
              <div className="text-xs font-extrabold uppercase text-rose-600 dark:text-rose-400 tracking-wide mb-1">
                3. Quy Tắc Tuyệt Đối (Red Line)
              </div>
              <p className="text-xs leading-relaxed opacity-85 text-rose-900 dark:text-rose-200">
                • <strong>KHÔNG VẼ NỐT RUỒI</strong> (status / indicator / pulse dots).<br />
                • Không vẽ hoa văn lấp lánh / sparkle tròn kiểu AI chatbot generic.
              </p>
            </div>

            <div className={`p-3.5 rounded-lg border ${bgMode === "navy" ? "bg-slate-800/50 border-slate-700" : "bg-slate-50 border-slate-200"}`}>
              <div className="text-xs font-extrabold uppercase text-[#FFC83D] tracking-wide mb-1">
                4. Bảng Màu Thương Hiệu
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-5 h-5 rounded-xs bg-[#0F2747] border border-white/20" title="#0F2747 Navy" />
                <span className="w-5 h-5 rounded-xs bg-[#FFC83D] border border-black/20" title="#FFC83D Yellow" />
                <span className="w-5 h-5 rounded-xs bg-[#FFF9EF] border border-black/20" title="#FFF9EF Cream" />
                <span className="w-5 h-5 rounded-xs bg-[#FFFFFF] border border-black/20" title="#FFFFFF White" />
                <span className="text-[11px] font-mono opacity-80">Navy & Yellow</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. TOOLBAR CONTROLS (SEARCH, FILTERS, BG TOGGLE) */}
        <div className={`p-4 rounded-xl border transition-all space-y-4 ${
          bgMode === "navy" ? "bg-slate-900/80 border-slate-800" : "bg-white border-slate-300 shadow-xs"
        }`}>
          {/* Row 1: Search + Background Switcher + Density Switcher */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm theo tên icon, emoji, môn học, vị trí..."
                className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg border transition-all outline-hidden ${
                  bgMode === "navy"
                    ? "bg-slate-800 border-slate-700 text-white focus:border-[#FFC83D]"
                    : "bg-slate-50 border-slate-300 text-[#0F2747] focus:bg-white focus:border-[#0F2747]"
                }`}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs opacity-60 hover:opacity-100"
                >
                  Xóa
                </button>
              )}
            </div>

            {/* Preview Background & Density Controls */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
              {/* Background Color Mode */}
              <div className="flex items-center gap-1 p-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-bold">
                <span className="px-2 text-[10px] uppercase opacity-60">Nền:</span>
                <button
                  onClick={() => setBgMode("cream")}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    bgMode === "cream" ? "bg-[#FFF9EF] text-[#0F2747] shadow-xs border border-amber-300" : "opacity-75 hover:opacity-100"
                  }`}
                >
                  Kem Giấy
                </button>
                <button
                  onClick={() => setBgMode("navy")}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    bgMode === "navy" ? "bg-[#0F2747] text-white shadow-xs border border-slate-600" : "opacity-75 hover:opacity-100"
                  }`}
                >
                  Navy Tối
                </button>
                <button
                  onClick={() => setBgMode("white")}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    bgMode === "white" ? "bg-white text-[#0F2747] shadow-xs border border-slate-300" : "opacity-75 hover:opacity-100"
                  }`}
                >
                  Trắng Sáng
                </button>
              </div>

              {/* View Layout Mode */}
              <div className="flex items-center gap-1 p-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-bold">
                <button
                  onClick={() => setViewMode("cards")}
                  className={`px-3 py-1 rounded-md transition-all ${
                    viewMode === "cards" ? "bg-white dark:bg-slate-700 shadow-xs" : "opacity-75 hover:opacity-100"
                  }`}
                >
                  Thẻ Chi Tiết
                </button>
                <button
                  onClick={() => setViewMode("compact")}
                  className={`px-3 py-1 rounded-md transition-all ${
                    viewMode === "compact" ? "bg-white dark:bg-slate-700 shadow-xs" : "opacity-75 hover:opacity-100"
                  }`}
                >
                  Bảng Thu Gọn
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-[#0F2747] text-white border-[#0F2747] shadow-xs"
                      : bgMode === "navy"
                      ? "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                      : "bg-white border-slate-200 text-[#0F2747] hover:border-slate-400"
                  }`}
                >
                  {cat.nameVi}
                </button>
              );
            })}
          </div>

          {/* Row 3: Secondary filters (Type & Priority) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold opacity-60">Phân loại:</span>
              <div className="flex items-center gap-1">
                {[
                  { id: "all", label: "Tất cả" },
                  { id: "emoji", label: "Emoji cần vẽ lại" },
                  { id: "pencily-kit", label: "Pencily Signature Kit" },
                  { id: "brand", label: "Brand Artworks" },
                  { id: "lucide", label: "Lucide Standard" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedType(t.id)}
                    className={`px-2 py-0.5 rounded-md font-semibold transition-all ${
                      selectedType === t.id
                        ? "bg-[#FFC83D] text-[#0F2747] font-black"
                        : "opacity-75 hover:opacity-100"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold opacity-60">Độ ưu tiên:</span>
              <div className="flex items-center gap-1">
                {[
                  { id: "all", label: "Tất cả" },
                  { id: "high", label: "Ưu tiên Cao (Cốt lõi)" },
                  { id: "medium", label: "Trung bình" },
                  { id: "low", label: "Phụ trợ" },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPriority(p.id)}
                    className={`px-2 py-0.5 rounded-md font-semibold transition-all ${
                      selectedPriority === p.id
                        ? "bg-[#0F2747] text-white dark:bg-white dark:text-[#0F2747]"
                        : "opacity-75 hover:opacity-100"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="font-bold opacity-75">
              Hiển thị: <span className="font-black text-[#FFC83D]">{filteredItems.length}</span> / {stats.total}
            </div>
          </div>
        </div>

        {/* 4. CONTENT DISPLAY */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <p className="text-base font-bold opacity-70">
              Không tìm thấy icon hoặc emoji nào khớp với bộ lọc & từ khóa &quot;{searchTerm}&quot;.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedType("all");
                setSelectedPriority("all");
              }}
              className="px-4 py-2 text-xs font-bold rounded-lg bg-[#FFC83D] text-[#0F2747]"
            >
              Đặt lại tất cả bộ lọc
            </button>
          </div>
        ) : viewMode === "cards" ? (
          /* ========================================================
             VIEW MODE 1: RICH CARDS (Tối ưu để chụp màn hình từng nhóm)
             ======================================================== */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems.map((item) => {
              const isEmoji = item.type === "emoji";
              const isPencilyKit = item.type === "pencily-kit";
              const isBrand = item.type === "brand" || item.type === "decoration";

              return (
                <div
                  key={item.id}
                  className={`group relative flex flex-col justify-between p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                    bgMode === "navy"
                      ? "bg-slate-900/90 border-slate-800 hover:border-slate-600"
                      : "bg-white border-slate-300 hover:border-slate-500 shadow-2xs"
                  }`}
                >
                  <div className="space-y-3">
                    {/* Header badge & Priority */}
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-xs tracking-wider border ${
                        isEmoji 
                          ? "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-800"
                          : isPencilyKit
                          ? "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800"
                          : isBrand
                          ? "bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-800"
                          : "bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700"
                      }`}>
                        {item.type.toUpperCase()}
                      </span>

                      {item.priority === "high" && (
                        <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded-xs bg-[#FFC83D] text-[#0F2747] border border-[#0F2747]">
                          ƯU TIÊN CAO
                        </span>
                      )}
                    </div>

                    {/* Preview Area (Dual Size: Large 36px & Normal 20px) */}
                    <div className={`p-4 rounded-lg border flex items-center justify-around gap-4 ${
                      bgMode === "navy" 
                        ? "bg-slate-800/70 border-slate-700" 
                        : bgMode === "white"
                        ? "bg-slate-50 border-slate-200"
                        : "bg-[#FFF9EF]/80 border-amber-200/60"
                    }`}>
                      {/* Zoomed size */}
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="h-10 flex items-center justify-center">
                          {renderIconPreview(item, 36)}
                        </div>
                        <span className="text-[9px] font-mono opacity-50 uppercase">Size 36px</span>
                      </div>

                      <div className="h-8 w-px bg-slate-300 dark:bg-slate-700" />

                      {/* Standard 20px size */}
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="h-10 flex items-center justify-center">
                          {renderIconPreview(item, 20)}
                        </div>
                        <span className="text-[9px] font-mono opacity-50 uppercase">Size 20px</span>
                      </div>
                    </div>

                    {/* Item Information */}
                    <div>
                      <h3 className="text-sm font-extrabold flex items-center justify-between gap-2">
                        <span>{item.name}</span>
                        {item.symbol && (
                          <span className="text-base select-none">{item.symbol}</span>
                        )}
                      </h3>
                      <p className="text-xs font-semibold opacity-90 mt-0.5">
                        {item.labelVi}
                      </p>
                    </div>

                    {/* File / Component usage location */}
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                      <div className="text-[10px] font-bold opacity-60 uppercase mb-0.5">Vị trí sử dụng:</div>
                      <div className="text-[11px] font-mono opacity-85 truncate" title={item.location}>
                        {item.location}
                      </div>
                    </div>

                    {/* Design Brief Note */}
                    <div className={`p-2.5 rounded-md border text-xs leading-relaxed ${
                      isEmoji
                        ? "bg-rose-50/70 border-rose-200 text-rose-950 dark:bg-rose-950/30 dark:border-rose-900 dark:text-rose-200"
                        : bgMode === "navy"
                        ? "bg-slate-800/50 border-slate-700/80 text-slate-300"
                        : "bg-slate-50 border-slate-200 text-slate-800"
                    }`}>
                      <span className="font-bold text-[#FFC83D] dark:text-amber-300 block mb-0.5">
                        Yêu cầu thiết kế:
                      </span>
                      {item.noteVi}
                    </div>
                  </div>

                  {/* Copy Button */}
                  <div className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end">
                    <button
                      onClick={() => handleCopy(item.id, `${item.name}: ${item.labelVi} - ${item.noteVi}`)}
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-sm border transition-all ${
                        copiedId === item.id
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : bgMode === "navy"
                          ? "bg-slate-800 border-slate-700 text-slate-300 hover:text-white"
                          : "bg-white border-slate-300 text-slate-700 hover:text-[#0F2747]"
                      }`}
                    >
                      {copiedId === item.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === item.id ? "Đã chép" : "Copy Brief"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ========================================================
             VIEW MODE 2: COMPACT TABLE (Tối ưu để chụp toàn màn hình)
             ======================================================== */
          <div className={`rounded-xl border-2 overflow-hidden ${
            bgMode === "navy" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-300 shadow-sm"
          }`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className={`border-b ${
                    bgMode === "navy" ? "bg-slate-800/80 border-slate-700 text-white" : "bg-slate-100 border-slate-300 text-[#0F2747]"
                  }`}>
                    <th className="py-3 px-4 font-black uppercase text-[11px] w-12 text-center">STT</th>
                    <th className="py-3 px-4 font-black uppercase text-[11px] w-24 text-center">Preview (32px)</th>
                    <th className="py-3 px-4 font-black uppercase text-[11px] w-16 text-center">20px</th>
                    <th className="py-3 px-4 font-black uppercase text-[11px] w-48">Tên Component / Ký hiệu</th>
                    <th className="py-3 px-4 font-black uppercase text-[11px] w-32">Phân loại</th>
                    <th className="py-3 px-4 font-black uppercase text-[11px] w-52">Nghiệp Vụ Nền Tảng</th>
                    <th className="py-3 px-4 font-black uppercase text-[11px] w-64">Vị Trí Code</th>
                    <th className="py-3 px-4 font-black uppercase text-[11px]">Yêu Cầu Cho Đội Ngũ Design</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {filteredItems.map((item, idx) => (
                    <tr 
                      key={item.id}
                      className={`hover:bg-amber-500/5 transition-colors ${
                        item.priority === "high" ? (bgMode === "navy" ? "bg-slate-800/20" : "bg-amber-50/20") : ""
                      }`}
                    >
                      <td className="py-3 px-4 text-center font-mono opacity-60 font-bold">{idx + 1}</td>
                      <td className="py-3 px-4 text-center">
                        <div className="inline-flex items-center justify-center p-1 rounded-sm bg-black/5 dark:bg-white/5">
                          {renderIconPreview(item, 32)}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="inline-flex items-center justify-center p-1">
                          {renderIconPreview(item, 20)}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-extrabold flex items-center gap-1.5">
                          <span>{item.name}</span>
                          {item.symbol && <span className="text-sm">{item.symbol}</span>}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-xs border ${
                          item.type === "emoji"
                            ? "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-200"
                            : item.type === "pencily-kit"
                            ? "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200"
                            : "bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-200"
                        }`}>
                          {item.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold">{item.labelVi}</td>
                      <td className="py-3 px-4 font-mono text-[11px] opacity-80 max-w-xs truncate" title={item.location}>
                        {item.location}
                      </td>
                      <td className="py-3 px-4 text-[11px] leading-relaxed">
                        <div className={item.type === "emoji" ? "text-rose-700 dark:text-rose-300 font-semibold" : ""}>
                          {item.noteVi}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. FOOTER NOTES FOR DESIGN TEAM */}
        <div className={`p-6 rounded-xl border text-center space-y-2 ${
          bgMode === "navy" ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200 shadow-2xs"
        }`}>
          <p className="text-xs font-bold text-[#FFC83D] uppercase tracking-wider">
            THE PENCILY ARCHITECTURAL DESIGN SYSTEM • TẤT CẢ TÀI NGUYÊN BẢN QUYỀN
          </p>
          <p className="text-xs opacity-75 max-w-2xl mx-auto leading-relaxed">
            Trang này được cấu hình riêng để chụp ảnh toàn màn hình hoặc xuất tài liệu gửi cho đối tác / đội ngũ Designer. Khi vẽ xong icon custom, chỉ cần thay thế các file SVG tương ứng trong thư mục <code className="px-1.5 py-0.5 rounded-sm bg-slate-200 dark:bg-slate-800 font-mono">public/brand/icons/</code> và <code className="px-1.5 py-0.5 rounded-sm bg-slate-200 dark:bg-slate-800 font-mono">src/components/icons/PencilyIcons.tsx</code>.
          </p>
        </div>
      </main>
    </div>
  );
}
