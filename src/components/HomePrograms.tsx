"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, HelpCircle, ArrowRight, Check, Award, Clock, Target } from "lucide-react";
import { usePencily } from "@/context/PencilyContext";
import { PencilyScrollReveal } from "@/components/PencilyScrollReveal";

interface ProgramItem {
  id: string;
  category: "english" | "vietnamese";
  categoryLabelVi: string;
  categoryLabelEn: string;
  titleVi: string;
  titleEn: string;
  badgeVi: string;
  badgeEn: string;
  targetVi: string;
  targetEn: string;
  formatVi: string;
  formatEn: string;
  taglineVi: string;
  taglineEn: string;
  descriptionVi: string;
  descriptionEn: string;
  highlightsVi: string[];
  highlightsEn: string[];
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  logoUrl?: string;
  isFlagship?: boolean;
}

const ENGLISH_PROGRAMS: ProgramItem[] = [
  {
    id: "flagship-ielts",
    category: "english",
    categoryLabelVi: "Tiếng Anh",
    categoryLabelEn: "English",
    titleVi: "IELTS: Road to 6.5 / 7.0+",
    titleEn: "IELTS: Road to 6.5 / 7.0+",
    badgeVi: "Lớp Học IELTS",
    badgeEn: "IELTS Program",
    targetVi: "Target: 6.5 – 7.5+",
    targetEn: "Target: 6.5 – 7.5+",
    formatVi: "Phòng 3–6 bạn • 60 phút • Google Meet",
    formatEn: "3–6 students • 60 mins • Google Meet",
    taglineVi: "Chiến thuật bứt phá band điểm cùng Peer Tutors 7.5 – 8.5+",
    taglineEn: "Score breakthrough strategy with 7.5 – 8.5+ Peer Tutors",
    descriptionVi: "Lớp học tương tác nhóm nhỏ do các bạn học sinh đạt band cao trực tiếp chia sẻ mẹo làm bài, rèn phản xạ Speaking và chữa Writing sát thực tế.",
    descriptionEn: "Small interactive peer-led classes helping students master IELTS exam strategies, Speaking fluency, and Writing rubrics.",
    highlightsVi: [
      "Luyện phản xạ Speaking 1-1 theo ngân hàng đề dự đoán quý",
      "Chữa chi tiết bài Writing Task 1 & 2 theo tiêu chuẩn chấm thi",
      "Chia sẻ chiến thuật tránh bẫy đề thi thật Listening & Reading",
    ],
    highlightsEn: [
      "1-on-1 Speaking practice based on seasonal cue-card forecasts",
      "Detailed Writing Task 1 & 2 reviews matching official scoring rubrics",
      "Insider strategies for eliminating traps in Listening & Reading tests",
    ],
    icon: Award,
    iconBg: "bg-red-50",
    iconColor: "text-red-600",
    logoUrl: "/brand/ielts-logo.png",
    isFlagship: true,
  },
  {
    id: "flagship-sat",
    category: "english",
    categoryLabelVi: "Tiếng Anh",
    categoryLabelEn: "English",
    titleVi: "SAT: Road to 1400 / 1500+",
    titleEn: "SAT: Road to 1400 / 1500+",
    badgeVi: "Lớp Học SAT",
    badgeEn: "SAT Program",
    targetVi: "Target: 1400 – 1550+",
    targetEn: "Target: 1400 – 1550+",
    formatVi: "Phòng 3–6 bạn • 60 phút • Desmos Lab",
    formatEn: "3–6 students • 60 mins • Desmos Lab",
    taglineVi: "Chinh phục Digital SAT cùng Tutors 1450 – 1560+",
    taglineEn: "Master Digital SAT alongside 1450 – 1560+ Tutors",
    descriptionVi: "Đồng hành cùng học sinh có mục tiêu du học và xét tuyển đại học sớm, khai thác tối đa công cụ máy tính Desmos và bẻ khóa logic Reading & Writing.",
    descriptionEn: "Supporting study-abroad and early university admissions with Desmos calculator mastery and analytical Reading & Writing strategies.",
    highlightsVi: [
      "Bí quyết tối ưu điểm số Math 800 với kỹ thuật bấm máy tính Desmos",
      "Phương pháp phân tích ngữ cảnh, từ vựng học thuật và cấu trúc văn bản",
      "Luyện đề mô phỏng chuẩn Digital SAT bám sát ngân hàng đề Bluebook",
    ],
    highlightsEn: [
      "Tactics for scoring 800 Math leveraging advanced Desmos graphing tricks",
      "Analytical reading frameworks for vocabulary in context and syntax",
      "Realistic Digital SAT mock test walkthroughs aligned with Bluebook exams",
    ],
    icon: Award,
    iconBg: "bg-blue-50",
    iconColor: "text-[#4F7ECB]",
    logoUrl: "/brand/sat-logo.png",
    isFlagship: true,
  },
];

const VIETNAMESE_PROGRAMS: ProgramItem[] = [
  {
    id: "bootcamps",
    category: "vietnamese",
    categoryLabelVi: "Tiếng Việt",
    categoryLabelEn: "Vietnamese",
    titleVi: "Chinh Phục Kỳ Thi ĐGNL & TN THPT",
    titleEn: "Competency Assessment & National Exam Prep",
    badgeVi: "Luyện Đề Trọng Tâm",
    badgeEn: "Exam Mastery",
    targetVi: "Target: 900+ ĐGNL / 27+ THPT",
    targetEn: "Target: 900+ ĐGNL / 27+ National",
    formatVi: "Phòng 4–8 bạn • 60 phút • Google Meet",
    formatEn: "4–8 students • 60 mins • Google Meet",
    taglineVi: "Hệ thống hóa kiến thức các môn Toán, Vật lý, Hóa học, Sinh học",
    taglineEn: "Systematic core review for Mathematics, Physics, Chemistry, and Biology",
    descriptionVi: "Các chuyên đề tổng ôn kiến thức cốt lõi lớp 11-12, rèn luyện kỹ năng phân tích số liệu và mẹo giải nhanh trắc nghiệm nhiều phương án.",
    descriptionEn: "Comprehensive review cohorts for high school grades 11-12, developing analytical data interpretation and exam time management.",
    highlightsVi: [
      "Tổng hợp sổ tay công thức, dạng bài xuất hiện nhiều nhất trong đề thi",
      "Rèn luyện kỹ năng xử lý câu hỏi logic và phân tích biểu đồ trong đề ĐGNL",
      "Giải chi tiết các đề thi thử nghiệm trường chuyên với hướng dẫn từng bước",
    ],
    highlightsEn: [
      "Curated formula handbooks and frequent high-yield exam patterns",
      "Logical reasoning and graph analysis practice for Competency exams",
      "Step-by-step walkthroughs of mock tests from top gifted high schools",
    ],
    icon: BookOpen,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    id: "doubt-mentorship",
    category: "vietnamese",
    categoryLabelVi: "Tiếng Việt",
    categoryLabelEn: "Vietnamese",
    titleVi: "Nhóm Học Kèm 1-3 & Giải Đáp Thắc Mắc",
    titleEn: "Peer Study Pods & Doubt-Clearing Mentorship",
    badgeVi: "Kèm Cặp Thân Mật",
    badgeEn: "Small Study Pods",
    targetVi: "Target: Lấy Lại Gốc & Tự Tin",
    targetEn: "Target: Core Mastery & Confidence",
    formatVi: "Phòng 2–4 bạn • 60 phút • Web Whiteboard",
    formatEn: "2–4 students • 60 mins • Web Whiteboard",
    taglineVi: "Không gian học tập cởi mở, chia sẻ bài khó không áp lực",
    taglineEn: "Open, welcoming study space to solve tough homework together",
    descriptionVi: "Học sinh có thể mang bài tập khó, kiến thức chưa hiểu rõ trên lớp đến để cùng thảo luận, nghe giảng lại từ các bạn học sinh giỏi phụ trách.",
    descriptionEn: "Bring your challenging assignments or confusing textbook topics to friendly student tutors who explain concepts in plain language.",
    highlightsVi: [
      "Quy mô nhóm nhỏ chỉ từ 3 đến 8 bạn mỗi phòng, tương tác thân mật",
      "Giải đáp trực tiếp qua micro, bảng vẽ số và khung chat tức thì",
      "Lịch học buổi tối thuận tiện, đăng ký tham gia chỉ với 1 click",
    ],
    highlightsEn: [
      "Intimate small-group pods with 3 to 8 students per room",
      "Live explanations through microphone, virtual whiteboard, and chat",
      "Convenient evening schedules with one-click instant registration",
    ],
    icon: HelpCircle,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
];

export function HomePrograms() {
  const { language } = usePencily();
  const [activeTab, setActiveTab] = useState<"english" | "vietnamese">("english");

  const renderCard = (prog: ProgramItem) => {
    const Icon = prog.icon;
    const isVi = language === "vi";
    const title = isVi ? prog.titleVi : prog.titleEn;
    const badge = isVi ? prog.badgeVi : prog.badgeEn;
    const tagline = isVi ? prog.taglineVi : prog.taglineEn;
    const description = isVi ? prog.descriptionVi : prog.descriptionEn;
    const highlights = isVi ? prog.highlightsVi : prog.highlightsEn;
    const categoryLabel = isVi ? prog.categoryLabelVi : prog.categoryLabelEn;

    const isIelts = prog.id === "flagship-ielts";
    const isSat = prog.id === "flagship-sat";

    const target = isVi ? prog.targetVi : prog.targetEn;
    const format = isVi ? prog.formatVi : prog.formatEn;

    let cardContainerClasses = "bg-white rounded-3xl p-7 sm:p-8 border border-[#E6DEC8] shadow-pencily-soft shadow-pencily-hover transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 h-full";
    let accentBarClasses = "";
    let badgeClasses = "text-emerald-800 bg-emerald-100/80";
    let taglineClasses = "text-emerald-700";
    let checkBgClasses = "bg-emerald-100 text-emerald-700";
    let ctaClasses = "text-[#0F2747] hover:text-emerald-700";

    if (isIelts) {
      cardContainerClasses = "bg-gradient-to-b from-[#FFF7F7] to-white rounded-3xl p-7 sm:p-8 border border-rose-200/80 shadow-pencily-soft shadow-pencily-hover transition-all duration-300 flex flex-col justify-between relative overflow-hidden hover:-translate-y-1.5 h-full";
      accentBarClasses = "absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#E01A22] via-rose-400 to-amber-300";
      badgeClasses = "text-rose-800 bg-rose-100/80";
      taglineClasses = "text-rose-700";
      checkBgClasses = "bg-rose-100 text-rose-600";
      ctaClasses = "text-[#0F2747] hover:text-rose-700";
    } else if (isSat) {
      cardContainerClasses = "bg-gradient-to-b from-[#F3F8FF] to-white rounded-3xl p-7 sm:p-8 border border-sky-200/80 shadow-pencily-soft shadow-pencily-hover transition-all duration-300 flex flex-col justify-between relative overflow-hidden hover:-translate-y-1.5 h-full";
      accentBarClasses = "absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#0077C8] via-sky-400 to-[#FFC83D]";
      badgeClasses = "text-sky-800 bg-sky-100/80";
      taglineClasses = "text-[#2563EB]";
      checkBgClasses = "bg-sky-100 text-[#2563EB]";
      ctaClasses = "text-[#0F2747] hover:text-[#2563EB]";
    } else if (prog.id === "doubt-mentorship") {
      cardContainerClasses = "bg-gradient-to-b from-[#FFFBF0] to-white rounded-3xl p-7 sm:p-8 border border-amber-200/80 shadow-pencily-soft shadow-pencily-hover transition-all duration-300 flex flex-col justify-between relative overflow-hidden hover:-translate-y-1.5 h-full";
      accentBarClasses = "absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-400 via-[#FFC83D] to-orange-300";
      badgeClasses = "text-amber-800 bg-amber-100/80";
      taglineClasses = "text-amber-700";
      checkBgClasses = "bg-amber-100 text-amber-700";
      ctaClasses = "text-[#0F2747] hover:text-amber-700";
    } else {
      accentBarClasses = "absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-300";
    }

    return (
      <PencilyScrollReveal key={prog.id} animation="bounce-up" delay={120} className="h-full">
        <div className={cardContainerClasses}>
          {accentBarClasses && <div className={accentBarClasses} />}

          <div>
            {/* Top Lockup */}
            <div className="flex items-center justify-between gap-4 mb-5">
              {prog.logoUrl ? (
                <div className={`inline-flex items-center shrink-0 ${prog.id === "flagship-sat" ? "rounded-xl overflow-hidden shadow-2xs border border-slate-200" : "bg-white px-2.5 py-1.5 rounded-xl border border-rose-100 shadow-2xs"}`}>
                  <img
                    src={prog.logoUrl}
                    alt={prog.titleVi}
                    className={`object-contain ${
                      prog.id === "flagship-ielts"
                        ? "h-8 sm:h-9 w-auto"
                        : "h-8 sm:h-9 w-auto"
                    }`}
                  />
                </div>
              ) : (
                <div className={`w-12 h-12 rounded-2xl ${prog.iconBg} ${prog.iconColor} flex items-center justify-center shrink-0 shadow-2xs`}>
                  <Icon className="w-6 h-6" />
                </div>
              )}

              <span className={`text-xs font-semibold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 ${badgeClasses}`}>
                <Award className="w-3.5 h-3.5 shrink-0" />
                <span>{badge}</span>
              </span>
            </div>

            {/* Title & Tagline */}
            <h3 className="font-poppins font-bold text-xl sm:text-2xl text-[#0F2747] mb-1.5">
              {title}
            </h3>
            <div className={`text-sm font-medium mb-4 ${taglineClasses}`}>
              {tagline}
            </div>

            {/* Clean Warm Info Strip (No dangling separators when wrapping) */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-5 gap-y-1.5 mb-4 py-2.5 px-4 rounded-2xl bg-[#FAF7EE]/90 border border-[#ECE4CE] text-xs font-medium text-[#0F2747]">
              <span className="inline-flex items-center gap-1.5 shrink-0">
                <Target className="w-3.5 h-3.5 text-[#4F7ECB] shrink-0" />
                <span>{target}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-[#526277]">
                <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>{format.replace(/ • /g, ", ")}</span>
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-[#4A5B72] leading-relaxed mb-5">
              {description}
            </p>

            {/* Highlights */}
            <div className="space-y-2.5 pt-4 border-t border-[#ECE4CE]/70 mb-6">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0F2747]/90 leading-relaxed">
                  <span className={`w-5 h-5 rounded-full ${checkBgClasses} flex items-center justify-center shrink-0 mt-0.5`}>
                    <Check className="w-3 h-3" />
                  </span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="pt-4 border-t border-[#ECE4CE]/70 flex items-center justify-between">
            <span className="text-xs text-[#6B7A90] font-medium">
              {categoryLabel}
            </span>
            <Link
              href="/classes"
              className={`group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E5DEC9] hover:border-[#0F2747]/30 text-xs sm:text-sm font-semibold shadow-2xs transition-all ${ctaClasses}`}
            >
              <span>{isVi ? "Xem các phòng học" : "Explore Rooms"}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </PencilyScrollReveal>
    );
  };

  return (
    <section id="programs" className="pt-20 sm:pt-28">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <PencilyScrollReveal animation="bounce-up" delay={50}>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFF6DC] text-amber-800 text-xs font-semibold mb-3">
              <span>{language === "vi" ? "Chương trình học đồng hành" : "Companion Study Tracks"}</span>
            </div>
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-[42px] text-[#0F2747] tracking-tight text-balance">
              {language === "vi" ? "Các chương trình học tập bình đẳng" : "Equal Learning Programs"}
            </h2>
          </div>
        </PencilyScrollReveal>

        {/* Smooth Capsule Segmented Pill Switcher */}
        <PencilyScrollReveal animation="stamp" delay={100}>
          <div className="flex justify-center mb-12">
            <div className="inline-flex flex-wrap items-center justify-center p-1.5 rounded-full bg-white border border-[#E6DEC8] shadow-pencily-soft gap-1.5">
              <button
                type="button"
                onClick={() => setActiveTab("english")}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === "english"
                    ? "bg-[#0F2747] text-white shadow-sm"
                    : "text-[#526277] hover:text-[#0F2747] hover:bg-[#FAF7EE]"
                }`}
              >
                <Award className={`w-4 h-4 ${activeTab === "english" ? "text-[#FFC83D]" : "text-[#4F7ECB]"}`} />
                <span>{language === "vi" ? "Chương trình Tiếng Anh" : "English Programs"}</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("vietnamese")}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === "vietnamese"
                    ? "bg-[#0F2747] text-white shadow-sm"
                    : "text-[#526277] hover:text-[#0F2747] hover:bg-[#FAF7EE]"
                }`}
              >
                <BookOpen className={`w-4 h-4 ${activeTab === "vietnamese" ? "text-[#FFC83D]" : "text-emerald-600"}`} />
                <span>{language === "vi" ? "Chương trình Tiếng Việt" : "Vietnamese Programs"}</span>
              </button>
            </div>
          </div>
        </PencilyScrollReveal>

        {/* Content Divided into Two Tracks (No redundant subheader bar) */}
        <div>
          {activeTab === "english" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 animate-fade-quick">
              {ENGLISH_PROGRAMS.map(renderCard)}
            </div>
          )}

          {activeTab === "vietnamese" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 animate-fade-quick">
              {VIETNAMESE_PROGRAMS.map(renderCard)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
