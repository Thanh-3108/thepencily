"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ArrowLeft,
  X,
  CheckCircle2,
  Sparkles,
  Trophy,
  GraduationCap,
  BookOpen,
  MessageSquare,
  Bell,
  Layers,
  ChevronRight,
  School,
  User,
  Award,
  Compass,
  Check,
} from "lucide-react";
import { OwlMascot } from "./Logo";
import { usePencily } from "@/context/PencilyContext";

interface OnboardingTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteProfileSuccess?: () => void;
}

interface TourStepConfig {
  id: number;
  targetId: string;
  questTitleVi: string;
  questTitleEn: string;
  cardTitleVi: string;
  cardTitleEn: string;
  dialogueVi: string;
  dialogueEn: string;
  badgeVi: string;
  badgeEn: string;
  preferredPlacement: "right" | "bottom" | "left" | "top" | "center";
}

const TOUR_STEPS: TourStepConfig[] = [
  {
    id: 1,
    targetId: "tour-sidebar",
    questTitleVi: "Bước 1/5: Menu Chính",
    questTitleEn: "Step 1/5: Navigation",
    cardTitleVi: "Thanh Điều Hướng",
    cardTitleEn: "Navigation Hub",
    badgeVi: "Menu",
    badgeEn: "Menu",
    dialogueVi: "Truy cập nhanh lớp học, thư viện tài liệu và bảng xếp hạng.",
    dialogueEn: "Quick access to classrooms, resource library, and leaderboard.",
    preferredPlacement: "right",
  },
  {
    id: 2,
    targetId: "tour-workspace",
    questTitleVi: "Bước 2/5: Lớp Học",
    questTitleEn: "Step 2/5: Classrooms",
    cardTitleVi: "Không Gian Lớp Học",
    cardTitleEn: "Live Classrooms",
    badgeVi: "Phòng Học",
    badgeEn: "Live Pods",
    dialogueVi: "Các phòng học nhóm 100% miễn phí cùng Peer Tutor trên Discord & Meet.",
    dialogueEn: "100% free peer-led study rooms on Discord Voice & Google Meet.",
    preferredPlacement: "bottom",
  },
  {
    id: 3,
    targetId: "tour-points-pill",
    questTitleVi: "Bước 3/5: Điểm PP",
    questTitleEn: "Step 3/5: Points",
    cardTitleVi: "Pencily Points",
    cardTitleEn: "Pencily Points",
    badgeVi: "Điểm Thưởng",
    badgeEn: "PP Balance",
    dialogueVi: "Tích lũy điểm khi học tập và giúp bạn bè để đổi quà tại Cửa Hàng PP.",
    dialogueEn: "Earn points by studying and helping peers to redeem rewards in shop.",
    preferredPlacement: "bottom",
  },
  {
    id: 4,
    targetId: "tour-header-menu",
    questTitleVi: "Bước 4/5: Thông Báo",
    questTitleEn: "Step 4/5: Notifications",
    cardTitleVi: "Nhắc Lịch & Tin Nhắn",
    cardTitleEn: "Alerts & Chat",
    badgeVi: "Tương Tác",
    badgeEn: "Alerts",
    dialogueVi: "Nhận thông báo nhắc lịch học tự động và nhắn tin trực tiếp với Peer Tutor.",
    dialogueEn: "Automated class reminders and direct chat with peer tutors.",
    preferredPlacement: "bottom",
  },
  {
    id: 5,
    targetId: "center",
    questTitleVi: "Bước 5/5: Nhận +20 PP",
    questTitleEn: "Step 5/5: Claim +20 PP",
    cardTitleVi: "Thiết Lập Hồ Sơ",
    cardTitleEn: "Profile Setup",
    badgeVi: "Quà Tân Thủ",
    badgeEn: "Starter Bonus",
    dialogueVi: "Điền nhanh trường và lớp của bạn để nhận ngay +20 PP tân thủ!",
    dialogueEn: "Enter your high school and grade to claim +20 PP right away!",
    preferredPlacement: "center",
  },
];

const GRADES = [
  { value: "Lớp 10", labelVi: "Khối Lớp 10 THPT", labelEn: "10th Grade" },
  { value: "Lớp 11", labelVi: "Khối Lớp 11 THPT", labelEn: "11th Grade" },
  { value: "Lớp 12", labelVi: "Khối Lớp 12 THPT", labelEn: "12th Grade" },
  { value: "Cựu học sinh / Đại học", labelVi: "Cựu học sinh / Đại học", labelEn: "University / Alumni" },
];

const INTEREST_TAGS = [
  "Toán học 10-12",
  "Tiếng Anh / IELTS",
  "Ôn thi ĐGNL 900+",
  "SAT Math 800",
  "Vật lý & Hóa học",
  "Lập trình Web",
  "Kỹ năng Tự học",
];

// Helper: Synthesize game audio effects via Web Audio API (zero external assets)
function playAudioFeedback(type: "pop" | "victory") {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    if (type === "pop") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(740, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === "victory") {
      // 4-note celebration arpeggio
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = ctx.currentTime + idx * 0.09;
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.15, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.35);
      });
    }
  } catch {
    // Audio context may be restricted by autoplay policy; fail gracefully
  }
}

function getElementRect(targetId: string): DOMRect | null {
  if (typeof document === "undefined" || targetId === "center") return null;
  const el = document.getElementById(targetId);
  return el ? el.getBoundingClientRect() : null;
}

export function OnboardingTourModal({
  isOpen,
  onClose,
  onCompleteProfileSuccess,
}: OnboardingTourModalProps) {
  const { user, completeProfile, addPoints, language } = usePencily();
  const isVi = language === "vi";

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [enableAnimation, setEnableAnimation] = useState(false);

  // Final Step Form State
  const [realName, setRealName] = useState(user.realName || user.name || "");
  const [school, setSchool] = useState(
    user.school !== "Chưa cập nhật" && user.school !== "The Pencily Academy"
      ? user.school
      : ""
  );
  const [grade, setGrade] = useState(
    user.grade && user.grade !== "Học sinh" ? user.grade : "Lớp 11"
  );
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "Toán học 10-12",
    "Tiếng Anh / IELTS",
  ]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isFinishing, setIsFinishing] = useState(false);

  const step = TOUR_STEPS[currentStepIndex];
  const totalSteps = TOUR_STEPS.length;

  // Measure target element synchronously before browser paint
  const updateSpotlight = useCallback(() => {
    if (!step || step.targetId === "center") {
      setTargetRect(null);
      setIsReady(true);
      return;
    }
    const rect = getElementRect(step.targetId);
    if (rect) {
      setTargetRect(rect);
      setIsReady(true);
      // Auto-scroll target into view if outside viewport (avoid scrolling sticky sidebar)
      if (
        step.targetId !== "tour-sidebar" &&
        typeof window !== "undefined" &&
        (rect.top < 0 || rect.bottom > window.innerHeight)
      ) {
        const el = document.getElementById(step.targetId);
        el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    } else {
      setTargetRect(null);
      setIsReady(true);
    }
  }, [step]);

  // Synchronous layout effect before paint to prevent any center flicker
  React.useLayoutEffect(() => {
    if (!isOpen) {
      setIsReady(false);
      setEnableAnimation(false);
      setCurrentStepIndex(0);
      setTargetRect(null);
      return;
    }

    updateSpotlight();

    // Enable smooth transitions only after the initial position has been established
    const animTimer = setTimeout(() => {
      setEnableAnimation(true);
    }, 60);

    return () => clearTimeout(animTimer);
  }, [isOpen, currentStepIndex, updateSpotlight]);

  useEffect(() => {
    if (isOpen) {
      const handleResize = () => updateSpotlight();
      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", handleResize, true);
      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("scroll", handleResize, true);
      };
    }
  }, [isOpen, updateSpotlight]);

  // Keyboard navigation: Esc to skip, Right arrow for Next, Left arrow for Prev
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleSkip();
      } else if (e.key === "ArrowRight" && currentStepIndex < totalSteps - 1) {
        handleNext();
      } else if (e.key === "ArrowLeft" && currentStepIndex > 0) {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentStepIndex, totalSteps]);

  if (!isOpen) return null;

  const toggleInterest = (tag: string) => {
    setSelectedInterests((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleNext = () => {
    playAudioFeedback("pop");
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    playAudioFeedback("pop");
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    try {
      localStorage.setItem("pencily_has_seen_tour", "true");
    } catch {}
    onClose();
  };

  const handleFinishProfileQuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!realName.trim()) {
      setErrorMsg(isVi ? "Vui lòng nhập tên của bạn." : "Please enter your name.");
      return;
    }
    if (!school.trim()) {
      setErrorMsg(isVi ? "Vui lòng nhập trường THPT của bạn." : "Please enter your high school.");
      return;
    }

    setErrorMsg(null);
    setIsFinishing(true);

    // Save profile to context
    completeProfile({
      realName: realName.trim(),
      school: school.trim(),
      grade: grade,
    });

    // Award +20 PP
    addPoints(20, isVi ? "Hoàn thành Quest Nhập Môn & Thiết lập hồ sơ" : "Academy Starter Quest Complete");

    playAudioFeedback("victory");

    try {
      localStorage.setItem("pencily_has_seen_tour", "true");
    } catch {}

    setTimeout(() => {
      if (onCompleteProfileSuccess) onCompleteProfileSuccess();
      onClose();
      setIsFinishing(false);
    }, 700);
  };

  // Determine floating card position based on spotlighted target
  const getCardStyle = (): React.CSSProperties => {
    const cardWidth = 440;
    const estimatedCardHeight = step.id === 5 ? 480 : 270;
    const padding = 16;
    const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    const isMobile = vw < 768;

    // Center step or no target
    if (!targetRect || step.targetId === "center") {
      return {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "520px",
        width: "calc(100vw - 32px)",
      };
    }

    // Mobile: bottom dock
    if (isMobile) {
      return {
        bottom: "16px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "calc(100vw - 24px)",
        maxWidth: "440px",
      };
    }

    // Step 1: Sidebar (targetId === "tour-sidebar")
    if (step.preferredPlacement === "right") {
      const left = targetRect.right + padding;
      const top = Math.max(
        padding,
        Math.min(targetRect.top + 40, vh - estimatedCardHeight - padding)
      );
      return {
        left: `${left}px`,
        top: `${top}px`,
        width: `${cardWidth}px`,
      };
    }

    // Header elements (Points pill or notifications dock)
    if (targetRect.top < 120 && targetRect.bottom < 160) {
      const top = targetRect.bottom + padding;
      const left = Math.max(
        padding,
        Math.min(
          targetRect.left + targetRect.width / 2 - cardWidth / 2,
          vw - cardWidth - padding
        )
      );
      return {
        top: `${top}px`,
        left: `${left}px`,
        width: `${cardWidth}px`,
      };
    }

    // Workspace & other general elements
    const spaceBelow = vh - targetRect.bottom - padding;
    const spaceAbove = targetRect.top - padding;

    if (spaceBelow >= estimatedCardHeight) {
      const top = targetRect.bottom + padding;
      const left = Math.max(
        padding,
        Math.min(
          targetRect.left + targetRect.width / 2 - cardWidth / 2,
          vw - cardWidth - padding
        )
      );
      return {
        top: `${top}px`,
        left: `${left}px`,
        width: `${cardWidth}px`,
      };
    } else if (spaceAbove >= estimatedCardHeight) {
      const top = targetRect.top - estimatedCardHeight - padding;
      const left = Math.max(
        padding,
        Math.min(
          targetRect.left + targetRect.width / 2 - cardWidth / 2,
          vw - cardWidth - padding
        )
      );
      return {
        top: `${top}px`,
        left: `${left}px`,
        width: `${cardWidth}px`,
      };
    } else {
      // Tall element: dock at bottom-center cleanly
      return {
        bottom: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        width: `${cardWidth}px`,
        maxWidth: "calc(100vw - 32px)",
      };
    }
  };

  return (
    <div className="fixed inset-0 z-50 select-none overflow-hidden animate-fadeIn">
      {/* 1. SPOTLIGHT HOLE CUTOUT (Live hardware-accelerated dark mask with transparent window over target) */}
      {targetRect && step.targetId !== "center" ? (
        <div
          className={`fixed pointer-events-none rounded-sm z-50 border-2 border-[#FFC83D] shadow-[0_0_25px_rgba(255,200,61,0.65)] ${
            enableAnimation ? "transition-all duration-300 ease-out" : ""
          }`}
          style={{
            top: `${Math.max(4, targetRect.top - 6)}px`,
            left: `${Math.max(4, targetRect.left - 6)}px`,
            width: `${Math.max(20, Math.min(window.innerWidth - Math.max(4, targetRect.left - 6) - 8, targetRect.width + 12))}px`,
            height: `${Math.max(20, Math.min(window.innerHeight - Math.max(4, targetRect.top - 6) - 8, targetRect.height + 12))}px`,
            boxShadow: "0 0 0 9999px rgba(15, 23, 42, 0.72)",
          }}
        >
          {/* Subtle Corner Brackets for game feel */}
          <span className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-amber-300" />
          <span className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-amber-300" />
          <span className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-amber-300" />
          <span className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-amber-300" />
        </div>
      ) : (
        /* Dark backdrop for center step */
        <div className="fixed inset-0 bg-[#0F2747]/75 backdrop-blur-[2px] transition-opacity" />
      )}

      {/* 2. CÚ PENCILY FLOATING INTERACTIVE QUEST CARD */}
      <div
        className={`fixed z-50 bg-[#FFF9EF] rounded-md border-2 border-[#0F2747] shadow-2xl p-5 sm:p-6 text-[#0F2747] max-h-[90vh] overflow-y-auto ${
          enableAnimation ? "transition-all duration-300 ease-out" : ""
        } ${!isReady && step.targetId !== "center" ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        style={getCardStyle()}
      >
        {/* Top Quest Bar */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-300">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-xs bg-[#0F2747] text-[#FFC83D] font-mono font-black text-[10px] tracking-wider uppercase">
              {isVi ? step.badgeVi : step.badgeEn}
            </span>
            <span className="text-xs font-bold text-slate-700">
              {isVi ? step.questTitleVi : step.questTitleEn}
            </span>
          </div>

          <button
            type="button"
            onClick={handleSkip}
            className="text-xs font-bold text-slate-500 hover:text-[#0F2747] px-2 py-0.5 rounded-xs hover:bg-slate-200 transition cursor-pointer flex items-center gap-1"
            title={isVi ? "Bỏ qua hướng dẫn (Esc)" : "Skip walkthrough (Esc)"}
          >
            <span>{isVi ? "Bỏ qua" : "Skip"}</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quest Progress Bar (Strictly no dots) */}
        <div className="w-full h-1.5 bg-slate-200 rounded-xs overflow-hidden mb-4">
          <div
            className="h-full bg-[#FFC83D] transition-all duration-300 ease-out"
            style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
          />
        </div>

        {/* Cú Pencily Speech Balloon */}
        <div className="flex items-start gap-3.5 bg-white p-3.5 sm:p-4 rounded-sm border-2 border-slate-300 shadow-2xs mb-4">
          <div className="shrink-0 pt-0.5">
            <div className="w-10 h-10 rounded-sm bg-amber-50 border-2 border-amber-300 p-0.5 flex items-center justify-center shadow-2xs">
              <OwlMascot size="sm" />
            </div>
          </div>
          <div className="flex-1">
            <div className="font-bold text-xs text-amber-900 mb-1 flex items-center gap-1.5">
              <span>{isVi ? "Cú Pencily" : "Pencily Owl"}</span>
              <span className="font-mono text-[10px] text-slate-500 font-normal">Mentor</span>
            </div>
            <p className="text-xs sm:text-[13px] text-slate-800 leading-relaxed font-medium">
              {isVi ? step.dialogueVi : step.dialogueEn}
            </p>
          </div>
        </div>

        {/* STEP 5: INTERACTIVE PROFILE SETUP QUEST FORM */}
        {step.id === 5 ? (
          <form onSubmit={handleFinishProfileQuest} className="space-y-4 pt-1">
            {errorMsg && (
              <div className="p-2.5 rounded-xs bg-red-50 text-red-700 text-xs font-semibold border-2 border-red-300">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-[#0F2747] mb-1">
                  {isVi ? "Họ & Tên bạn *" : "Your Name *"}
                </label>
                <input
                  type="text"
                  placeholder={isVi ? "Nguyễn Văn A" : "Alex Nguyen"}
                  value={realName}
                  onChange={(e) => setRealName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xs border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none bg-white text-xs font-medium text-[#0F2747]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-[#0F2747] mb-1">
                  {isVi ? "Khối Lớp *" : "Grade Level *"}
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-3 py-2 rounded-xs border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none bg-white text-xs font-bold text-[#0F2747]"
                >
                  {GRADES.map((g) => (
                    <option key={g.value} value={g.value}>
                      {isVi ? g.labelVi : g.labelEn}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-[#0F2747] mb-1">
                {isVi ? "Trường THPT Đang Học *" : "Your High School *"}
              </label>
              <input
                type="text"
                placeholder={isVi ? "THPT Chuyên Hà Nội - Amsterdam / THPT Lê Quý Đôn..." : "High School Name..."}
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className="w-full px-3 py-2 rounded-xs border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none bg-white text-xs font-medium text-[#0F2747]"
              />
            </div>

            {/* Interest Tags */}
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-[#0F2747] mb-1.5">
                {isVi ? "Môn Học Bạn Muốn Ôn Luyện" : "Subjects of Interest"}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {INTEREST_TAGS.map((tag) => {
                  const isSelected = selectedInterests.includes(tag);
                  return (
                    <button
                      type="button"
                      key={tag}
                      onClick={() => toggleInterest(tag)}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-xs border transition cursor-pointer flex items-center gap-1 ${
                        isSelected
                          ? "bg-[#0F2747] text-white border-[#0F2747]"
                          : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-[#FFC83D]" />}
                      <span>{tag}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit & Reward Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isFinishing}
                className="w-full py-3 rounded-sm bg-[#0F2747] hover:bg-slate-800 text-white font-bold text-xs sm:text-sm border-2 border-[#0F2747] shadow-xs active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#FFC83D]" />
                <span>
                  {isFinishing
                    ? isVi
                      ? "Đang lưu & cộng điểm..."
                      : "Claiming..."
                    : isVi
                    ? "Nhận +20 PP & Hoàn tất"
                    : "Claim +20 PP & Finish"}
                </span>
              </button>
            </div>
          </form>
        ) : (
          /* STEP 1-4 ACTIONS */
          <div className="flex items-center justify-between pt-2">
            <div>
              {currentStepIndex > 0 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-3.5 py-2 rounded-sm border-2 border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-[#0F2747] transition active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{isVi ? "Quay lại" : "Back"}</span>
                </button>
              ) : (
                <span className="text-[11px] text-slate-500 font-semibold">
                  {isVi ? "Dùng phím ← → để di chuyển" : "Use ← → keys"}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="px-4 sm:px-5 py-2 rounded-sm bg-[#0F2747] hover:bg-slate-800 text-white text-xs sm:text-sm font-bold border-2 border-[#0F2747] shadow-2xs transition active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span>{isVi ? "Tiếp theo" : "Next"}</span>
              <ArrowRight className="w-4 h-4 text-[#FFC83D]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
