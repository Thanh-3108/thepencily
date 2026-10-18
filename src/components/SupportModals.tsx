"use client";

import React, { useState } from "react";
import {
  X,
  Copy,
  Check,
  Sparkles,
  Share2,
  Bug,
  Send,
  HelpCircle,
  Search,
  ShieldAlert,
  ChevronDown,
  ExternalLink,
  MessageSquare,
  Lock,
  BookOpen,
} from "lucide-react";
import { usePencily } from "@/context/PencilyContext";
import { DiscordLogo } from "./BrandIcons";

// =========================================================================
// 1. REFER A FRIEND MODAL (Mời Bạn Học Cùng)
// =========================================================================
interface ReferFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReferFriendModal({ isOpen, onClose }: ReferFriendModalProps) {
  const { user, language, addPoints } = usePencily();
  const isVi = language === "vi";
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const referralCode = `PENCILY-${(user.realName || user.name || "STUDENT")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 8) || "LEARN"}-2026`;

  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/signin?ref=${referralCode}` : "";

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl || referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#FFFDF9] rounded-md border-2 border-[#0F2747] shadow-2xl p-6 sm:p-7 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-amber-100 border-2 border-amber-500 text-amber-800 flex items-center justify-center font-black">
              <Sparkles className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-poppins font-black text-lg text-[#0F2747]">
                {isVi ? "Mời Bạn Học Cùng" : "Refer a Friend"}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {isVi ? "Lan tỏa học tập đồng đẳng & Nhận thưởng PP" : "Spread peer learning & earn Pencily Points"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-sm hover:bg-slate-100 text-slate-500 hover:text-[#0F2747] border border-slate-300 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Reward Pill */}
        <div className="p-4 rounded-sm bg-[#FFF9EF] border-2 border-amber-300 flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <span className="text-xs font-black text-[#0F2747] block">
              {isVi ? "Phần thưởng đôi bạn cùng tiến" : "Dual Learning Reward"}
            </span>
            <span className="text-[11px] text-slate-600 block">
              {isVi
                ? "Bạn nhận +10 PP và người bạn được mời cũng nhận +10 PP khi tạo hồ sơ!"
                : "Both of you earn +10 PP when your friend signs up!"}
            </span>
          </div>
          <div className="px-3 py-1.5 rounded-xs bg-[#F59E0B] text-slate-900 border border-amber-600 font-black text-xs shrink-0">
            +10 PP
          </div>
        </div>

        {/* Unique Referral Code Box */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-600 block uppercase tracking-wider">
            {isVi ? "Mã giới thiệu độc quyền của bạn" : "Your Unique Referral Code"}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={referralCode}
              className="flex-1 px-3.5 py-2.5 rounded-sm bg-white border-2 border-[#0F2747] font-mono font-black text-sm text-[#0F2747] select-all tracking-wider"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-2.5 rounded-sm bg-[#0F2747] hover:bg-[#1A3E6D] text-white font-bold text-xs border-2 border-[#0F2747] transition flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-95 shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{isVi ? "Đã chép!" : "Copied!"}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{isVi ? "Sao chép link" : "Copy Link"}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 3 Step Instruction */}
        <div className="grid grid-cols-3 gap-2.5 pt-2 text-center text-xs">
          <div className="p-2.5 rounded-sm bg-[#FAF7F2] border border-slate-200 space-y-1">
            <span className="font-black text-[#4F7ECB] text-xs">1. Gửi link</span>
            <p className="text-[10px] text-slate-500 leading-tight">Chia sẻ mã hoặc link tới bạn bè</p>
          </div>
          <div className="p-2.5 rounded-sm bg-[#FAF7F2] border border-slate-200 space-y-1">
            <span className="font-black text-[#4F7ECB] text-xs">2. Đăng ký</span>
            <p className="text-[10px] text-slate-500 leading-tight">Bạn bè tham gia &amp; hoàn tất hồ sơ</p>
          </div>
          <div className="p-2.5 rounded-sm bg-[#FAF7F2] border border-slate-200 space-y-1">
            <span className="font-black text-amber-600 text-xs">3. Nhận PP</span>
            <p className="text-[10px] text-slate-500 leading-tight">Cả hai cùng nhận điểm thưởng</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] font-bold text-xs border-2 border-slate-300 transition cursor-pointer"
        >
          {isVi ? "Đóng cửa sổ" : "Close"}
        </button>
      </div>
    </div>
  );
}

// =========================================================================
// 2. REPORT A BUG MODAL (Báo Cáo Lỗi)
// =========================================================================
interface ReportBugModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: () => void;
}

export function ReportBugModal({ isOpen, onClose, onSubmitSuccess }: ReportBugModalProps) {
  const { user, language } = usePencily();
  const isVi = language === "vi";

  const [category, setCategory] = useState("room");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsDone(true);
      if (onSubmitSuccess) onSubmitSuccess();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#FFFDF9] rounded-md border-2 border-[#0F2747] shadow-2xl p-6 sm:p-7 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-red-100 border-2 border-red-500 text-red-800 flex items-center justify-center font-black">
              <Bug className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-poppins font-black text-lg text-[#0F2747]">
                {isVi ? "Báo Cáo Sự Cố & Lỗi Kỹ Thuật" : "Report a Bug"}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {isVi ? "Giúp đội ngũ hoàn thiện nền tảng học tập tốt hơn" : "Help our dev team improve the platform"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-sm hover:bg-slate-100 text-slate-500 hover:text-[#0F2747] border border-slate-300 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isDone ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-sm bg-emerald-100 border-2 border-emerald-600 text-emerald-800 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 text-emerald-700" />
            </div>
            <h4 className="font-poppins font-black text-base text-[#0F2747]">
              {isVi ? "Đã Gửi Báo Cáo Thành Công!" : "Bug Report Submitted!"}
            </h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              {isVi
                ? "Cảm ơn bạn đã đóng góp! Đội ngũ kỹ thuật sẽ kiểm tra và khắc phục sớm nhất. Bạn có thể theo dõi qua kênh #bug-reports trên Discord."
                : "Thank you! Our engineering team will review this shortly. You can track updates on Discord."}
            </p>
            <button
              type="button"
              onClick={() => {
                setIsDone(false);
                setTitle("");
                setDescription("");
                onClose();
              }}
              className="px-5 py-2 rounded-sm bg-[#0F2747] text-white text-xs font-bold border-2 border-[#0F2747] transition cursor-pointer shadow-2xs"
            >
              {isVi ? "Hoàn tất" : "Done"}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                {isVi ? "Khu vực gặp sự cố" : "Problem Category"}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 rounded-sm bg-white border-2 border-slate-300 text-xs font-semibold text-[#0F2747] focus:border-[#0F2747] focus:outline-none"
              >
                <option value="room">{isVi ? "Phòng học trực tuyến / Meet / Video" : "Virtual Room / Meet / Audio"}</option>
                <option value="dashboard">{isVi ? "Dashboard / Bảng điều khiển / Lịch học" : "Dashboard / Schedule"}</option>
                <option value="points">{isVi ? "Pencily Points (PP) / Đổi quà Shop" : "Pencily Points / Shop"}</option>
                <option value="library">{isVi ? "Thư viện Tài liệu & Ghi chú" : "Library / Materials"}</option>
                <option value="other">{isVi ? "Vấn đề khác" : "Other Issue"}</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                {isVi ? "Tiêu đề lỗi tóm tắt" : "Bug Summary"}
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={isVi ? "VD: Nút mở micro phản hồi chậm khi vào phòng học..." : "E.g. Microphone mute button latency..."}
                className="w-full px-3.5 py-2 rounded-sm bg-white border-2 border-slate-300 text-xs font-semibold text-[#0F2747] focus:border-[#0F2747] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                {isVi ? "Mô tả chi tiết & Các bước tái hiện" : "Detailed Description"}
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={isVi ? "Mô tả điều đã xảy ra và thiết bị/trình duyệt bạn đang sử dụng..." : "Describe what happened..."}
                className="w-full px-3.5 py-2 rounded-sm bg-white border-2 border-slate-300 text-xs text-[#0F2747] focus:border-[#0F2747] focus:outline-none resize-none"
              />
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <a
                href="https://discord.gg/6hpEf4wC4z"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#4F7ECB] hover:underline font-bold inline-flex items-center gap-1"
              >
                <span>{isVi ? "Hoặc báo qua Discord" : "Or report on Discord"}</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] border-2 border-slate-300 text-xs font-bold transition cursor-pointer"
                >
                  {isVi ? "Hủy" : "Cancel"}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-sm bg-[#0F2747] hover:bg-[#1A3E6D] text-white border-2 border-[#0F2747] text-xs font-bold transition cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? (isVi ? "Đang gửi..." : "Sending...") : (isVi ? "Gửi báo cáo" : "Submit")}</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// =========================================================================
// 3. HELP CENTER MODAL (Trung Tâm Trợ Giúp)
// =========================================================================
interface HelpCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToDocs?: () => void;
}

export function HelpCenterModal({ isOpen, onClose, onGoToDocs }: HelpCenterModalProps) {
  const { language } = usePencily();
  const isVi = language === "vi";

  const [search, setSearch] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      qVi: "Tham gia các lớp học trên The Pencily có mất phí không?",
      qEn: "Is joining classes on The Pencily free?",
      aVi: "The Pencily là nền tảng học tập cộng đồng phi lợi nhuận 100%. Tất cả các buổi học, tài liệu ôn tập và chứng nhận đều hoàn toàn miễn phí.",
      aEn: "Yes! The Pencily is 100% non-profit. All classes, study sheets, and certificates are free for all students.",
    },
    {
      qVi: "Làm thế nào để tích lũy Pencily Points (PP) và đổi quà?",
      qEn: "How do I earn Pencily Points (PP) and redeem rewards?",
      aVi: "Bạn nhận +5 PP khi hoàn thành buổi học hoặc đóng góp tài liệu, +10 PP khi mời bạn bè học cùng, và +20 PP khi hoàn tất hồ sơ cá nhân. PP có thể đổi quà độc quyền tại Cửa hàng PP.",
      aEn: "Earn +5 PP for attending classes or sharing notes, +10 PP for referring friends, and +20 PP for completing onboarding.",
    },
    {
      qVi: "Ai có thể trở thành Peer Tutor giảng dạy?",
      qEn: "Who can apply to become a Peer Tutor?",
      aVi: "Bất kỳ học sinh THPT nào có niềm đam mê chia sẻ kiến thức đều có thể ứng tuyển qua tab 'Trở thành Peer Tutor'. Bạn sẽ được ban học vụ hỗ trợ duyệt syllabus và tập giảng thử.",
      aEn: "Any high school student passionate about peer learning can apply via the 'Become a Peer Tutor' tab.",
    },
    {
      qVi: "Nếu tôi gặp sự cố âm thanh hoặc không vào được phòng Meet?",
      qEn: "What if I experience audio issues or cannot join Meet?",
      aVi: "Hãy kiểm tra quyền micro trên trình duyệt của bạn hoặc tham gia phòng học qua máy chủ Discord backup 24/7 của The Pencily.",
      aEn: "Check your browser microphone permissions or jump into our Discord backup voice pods.",
    },
  ];

  if (!isOpen) return null;

  const filtered = faqs.filter((f) => {
    const q = isVi ? f.qVi : f.qEn;
    const a = isVi ? f.aVi : f.aEn;
    const term = search.toLowerCase();
    return q.toLowerCase().includes(term) || a.toLowerCase().includes(term);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#FFFDF9] rounded-md border-2 border-[#0F2747] shadow-2xl p-6 sm:p-7 space-y-5 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-slate-200 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-blue-100 border-2 border-blue-500 text-blue-800 flex items-center justify-center font-black">
              <HelpCircle className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <h3 className="font-poppins font-black text-lg text-[#0F2747]">
                {isVi ? "Trung Tâm Trợ Giúp" : "Help Desk"}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {isVi ? "Cẩm nang học tập & Giải đáp thắc mắc thường gặp" : "Student handbook & Frequently Asked Questions"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-sm hover:bg-slate-100 text-slate-500 hover:text-[#0F2747] border border-slate-300 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isVi ? "Tìm kiếm câu hỏi, cách tích điểm PP, lớp học..." : "Search FAQs..."}
            className="w-full pl-9 pr-3.5 py-2 rounded-sm bg-white border-2 border-slate-300 text-xs font-medium text-[#0F2747] focus:border-[#0F2747] focus:outline-none"
          />
        </div>

        {/* FAQ Accordion List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {filtered.map((item, idx) => {
            const isOpenAccordion = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-sm border-2 border-slate-200 bg-white overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpenAccordion ? null : idx)}
                  className="w-full p-3 text-left font-bold text-xs text-[#0F2747] flex items-center justify-between gap-3 hover:bg-slate-50 transition cursor-pointer"
                >
                  <span>{isVi ? item.qVi : item.qEn}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isOpenAccordion ? "rotate-180 text-[#0F2747]" : ""
                    }`}
                  />
                </button>
                {isOpenAccordion && (
                  <div className="px-3.5 pb-3.5 pt-1 text-xs text-slate-600 border-t border-slate-100 bg-[#FAF7F2] leading-relaxed">
                    {isVi ? item.aVi : item.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Support Prompt */}
        <div className="pt-2 border-t border-slate-200 shrink-0 flex items-center justify-between gap-3">
          <span className="text-xs text-slate-500 font-medium">
            {isVi ? "Cần trợ giúp trực tiếp?" : "Need live support?"}
          </span>
          <a
            href="https://discord.gg/6hpEf4wC4z"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#0F2747] text-white text-xs font-bold border border-[#0F2747] hover:bg-[#1A3E6D] transition shadow-2xs"
          >
            <span>{isVi ? "Mở Ticket Trên Discord" : "Discord Support Ticket"}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// 4. SAFETY CONCERN REPORT MODAL (Báo Cáo An Toàn Học Đường)
// =========================================================================
interface SafetyReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SafetyReportModal({ isOpen, onClose }: SafetyReportModalProps) {
  const { language } = usePencily();
  const isVi = language === "vi";

  const [concernType, setConcernType] = useState("conduct");
  const [reportText, setReportText] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportText.trim()) return;
    setIsSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#FFFDF9] rounded-md border-2 border-[#0F2747] shadow-2xl p-6 sm:p-7 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-amber-100 border-2 border-amber-500 text-amber-800 flex items-center justify-center font-black">
              <ShieldAlert className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h3 className="font-poppins font-black text-lg text-[#0F2747]">
                {isVi ? "Báo Cáo An Toàn Học Đường" : "Share Safety Concern"}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {isVi ? "Cam kết bảo vệ môi trường học tập bình đẳng & an toàn" : "Committed to student psychological safety"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-sm hover:bg-slate-100 text-slate-500 hover:text-[#0F2747] border border-slate-300 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSent ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-sm bg-emerald-100 border-2 border-emerald-600 text-emerald-800 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 text-emerald-700" />
            </div>
            <h4 className="font-poppins font-black text-base text-[#0F2747]">
              {isVi ? "Đã Ghi Nhận Báo Cáo Bảo Mật" : "Report Securely Received"}
            </h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              {isVi
                ? "Báo cáo của bạn đã được chuyển thẳng tới Ban Kỷ luật & An toàn Học viện. Danh tính của bạn hoàn toàn được giữ bí mật theo quy chuẩn Red Line Policy."
                : "Your safety report has been routed directly to our Safety Committee under strict confidentiality."}
            </p>
            <button
              type="button"
              onClick={() => {
                setIsSent(false);
                setReportText("");
                onClose();
              }}
              className="px-5 py-2 rounded-sm bg-[#0F2747] text-white text-xs font-bold border-2 border-[#0F2747] transition cursor-pointer"
            >
              {isVi ? "Đóng" : "Close"}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-3 rounded-sm bg-amber-50 border border-amber-300 flex items-center gap-2 text-xs text-amber-950 font-medium">
              <Lock className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                {isVi
                  ? "Báo cáo này được mã hóa bảo mật 100% và bảo vệ bởi Ban Điều hành Gen 1.0."
                  : "All safety reports are 100% confidential and reviewed by the Executive Team."}
              </span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                {isVi ? "Loại vi phạm / Vấn đề an toàn" : "Safety Concern Category"}
              </label>
              <select
                value={concernType}
                onChange={(e) => setConcernType(e.target.value)}
                className="w-full px-3.5 py-2 rounded-sm bg-white border-2 border-slate-300 text-xs font-semibold text-[#0F2747] focus:border-[#0F2747] focus:outline-none"
              >
                <option value="conduct">{isVi ? "Hành vi không phù hợp trong phòng học" : "Inappropriate conduct in classroom"}</option>
                <option value="harassment">{isVi ? "Quấy rối / Bắt nạt tâm lý học đường" : "Bullying or harassment"}</option>
                <option value="integrity">{isVi ? "Vi phạm liêm chính học thuật / Gian lận" : "Academic dishonesty"}</option>
                <option value="privacy">{isVi ? "Vi phạm bảo mật / Thu thập thông tin cá nhân" : "Privacy invasion"}</option>
                <option value="other">{isVi ? "Vấn đề nghiêm trọng khác" : "Other serious safety issue"}</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                {isVi ? "Mô tả sự việc chi tiết" : "Incident Details"}
              </label>
              <textarea
                required
                rows={3}
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                placeholder={isVi ? "Cung cấp thời gian, phòng học hoặc tên đối tượng liên quan nếu có..." : "Provide context..."}
                className="w-full px-3.5 py-2 rounded-sm bg-white border-2 border-slate-300 text-xs text-[#0F2747] focus:border-[#0F2747] focus:outline-none resize-none"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="anonCheck"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 rounded-xs border-2 border-[#0F2747] text-[#0F2747] focus:ring-0 cursor-pointer"
              />
              <label htmlFor="anonCheck" className="text-xs font-bold text-slate-700 cursor-pointer select-none">
                {isVi ? "Giữ danh tính của tôi hoàn toàn ẩn danh" : "Keep my identity 100% anonymous"}
              </label>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] border-2 border-slate-300 text-xs font-bold transition cursor-pointer"
              >
                {isVi ? "Hủy" : "Cancel"}
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-sm bg-red-600 hover:bg-red-700 text-white border-2 border-red-800 text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{isVi ? "Gửi báo cáo an toàn" : "Submit Safety Report"}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
