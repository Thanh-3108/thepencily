"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, HelpCircle, ArrowRight, Check, Award } from "lucide-react";
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

    let cardContainerClasses = "bg-white rounded-md p-6 sm:p-7 border-2 border-slate-300 shadow-xs hover:border-[#0F2747] hover:shadow-md transition-all flex flex-col justify-between hover:-translate-y-1.5";
    let ribbonClasses = "";
    let badgeClasses = "text-[#0F2747] bg-slate-100 border-slate-300 font-bold";
    let taglineClasses = "text-[#4F7ECB]";
    let ctaClasses = "text-[#0F2747] hover:text-[#4F7ECB]";

    if (isIelts) {
      // IELTS Authentic Red Theme
      cardContainerClasses = "bg-[#FFF8F8] rounded-md p-6 sm:p-7 border-2 border-red-300 shadow-xs hover:border-red-500 hover:shadow-lg transition-all flex flex-col justify-between relative overflow-hidden hover:-translate-y-1.5";
      ribbonClasses = "absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-[#E01A22] via-red-500 to-rose-600";
      badgeClasses = "text-red-950 bg-red-100 border-red-300 shadow-2xs font-black";
      taglineClasses = "text-red-700";
      ctaClasses = "text-[#0F2747] hover:text-red-700 font-bold";
    } else if (isSat) {
      // SAT Authentic Blue Theme
      cardContainerClasses = "bg-[#F4F9FF] rounded-md p-6 sm:p-7 border-2 border-blue-300 shadow-xs hover:border-blue-500 hover:shadow-lg transition-all flex flex-col justify-between relative overflow-hidden hover:-translate-y-1.5";
      ribbonClasses = "absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-[#0077C8] via-blue-500 to-[#002D62]";
      badgeClasses = "text-blue-950 bg-blue-100 border-blue-300 shadow-2xs font-black";
      taglineClasses = "text-blue-700";
      ctaClasses = "text-[#0F2747] hover:text-blue-700 font-bold";
    }

    return (
      <PencilyScrollReveal key={prog.id} animation="bounce-up" delay={120} className="h-full">
        <div className={cardContainerClasses}>
          {ribbonClasses && <div className={ribbonClasses} />}

        <div>
          {/* Top Lockup */}
          <div className="flex items-start justify-between gap-4 mb-4">
            {prog.logoUrl ? (
              <div className="flex items-center shrink-0">
                <img
                  src={prog.logoUrl}
                  alt={prog.titleVi}
                  className={`object-contain ${
                    prog.id === "flagship-ielts"
                      ? "h-10 sm:h-11 w-auto"
                      : "h-9 sm:h-10 w-auto rounded-xs"
                  }`}
                />
              </div>
            ) : (
              <div className={`w-12 h-12 rounded-xl ${prog.iconBg} ${prog.iconColor} border-2 border-slate-200 flex items-center justify-center shrink-0`}>
                <Icon className="w-6 h-6" />
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-white/80 border border-slate-300 px-2 py-0.5 rounded-xs">
                {categoryLabel}
              </span>
              <span className={`text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-sm flex items-center gap-1.5 border-2 ${badgeClasses}`}>
                {(isIelts || isSat) && (
                  <Award className={`w-3.5 h-3.5 shrink-0 ${isIelts ? "text-red-600" : "text-blue-600"}`} />
                )}
                {badge}
              </span>
            </div>
          </div>

          {/* Title & Tagline */}
          <h3 className="font-poppins font-black text-xl text-[#0F2747] mb-1">
            {title}
          </h3>
          <div className={`text-xs font-semibold mb-3 ${taglineClasses}`}>
            {tagline}
          </div>

          {/* Target Score & Cohort Format Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3.5 pt-1">
            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-xs bg-[#0F2747] text-white">
              {target}
            </span>
            <span className="font-mono text-[10px] text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-xs">
              {format}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-[#475569] leading-relaxed mb-5 min-h-[44px]">
            {description}
          </p>

          {/* Highlights */}
          <div className="space-y-2 pt-3 border-t-2 border-slate-200/70 mb-5">
            {highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-[#0F2747]/90 leading-relaxed">
                <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isIelts ? "text-red-600" : isSat ? "text-blue-600" : "text-emerald-600"}`} />
                <span>
                  {h}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="pt-4 border-t-2 border-slate-200/70 flex items-center justify-end">
          <Link
            href="/classes"
            className={`inline-flex items-center gap-1.5 text-xs font-bold transition-colors ${ctaClasses}`}
          >
            <span>{isVi ? "Xem các phòng" : "Explore Rooms"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
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
            <div className="text-xs font-bold uppercase tracking-wider text-[#4F7ECB] mb-2">
              {language === "vi" ? "Mô hình đồng hành: The Pencily" : "Companion Model: The Pencily"}
            </div>
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-[#0F2747] tracking-tight text-balance">
              {language === "vi" ? "Các chương trình học tập bình đẳng" : "Equal Learning Programs"}
            </h2>
          </div>
        </PencilyScrollReveal>

        {/* Segmented Filter Tabs: Tiếng Anh / Tiếng Việt */}
        <PencilyScrollReveal animation="stamp" delay={100}>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <button
              type="button"
              onClick={() => setActiveTab("english")}
              className={`px-5 py-2.5 rounded-md text-xs sm:text-sm font-bold border-2 transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "english"
                  ? "bg-[#0F2747] text-white border-[#0F2747] shadow-xs"
                  : "bg-white text-slate-700 hover:text-[#0F2747] border-slate-300 hover:bg-slate-50"
              }`}
            >
              <Award className={`w-4 h-4 ${activeTab === "english" ? "text-white" : "text-[#4F7ECB]"}`} />
              <span>{language === "vi" ? "Chương trình Tiếng Anh" : "English Programs"}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("vietnamese")}
              className={`px-5 py-2.5 rounded-md text-xs sm:text-sm font-bold border-2 transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "vietnamese"
                  ? "bg-[#0F2747] text-white border-[#0F2747] shadow-xs"
                  : "bg-white text-slate-700 hover:text-[#0F2747] border-slate-300 hover:bg-slate-50"
              }`}
            >
              <BookOpen className={`w-4 h-4 ${activeTab === "vietnamese" ? "text-emerald-300" : "text-emerald-600"}`} />
              <span>{language === "vi" ? "Chương trình Tiếng Việt" : "Vietnamese Programs"}</span>
            </button>
          </div>
        </PencilyScrollReveal>

        {/* Content Divided into Two Tracks */}
        <div>
          {/* Track 1: Tiếng Anh (IELTS & SAT) */}
          {activeTab === "english" && (
            <div className="animate-fadeIn">
              <div className="flex items-center gap-3 mb-6 pb-2.5 border-b-2 border-slate-200">
                <div className="w-8 h-8 rounded-sm bg-blue-100 text-[#0F2747] border-2 border-slate-300 flex items-center justify-center font-black text-xs shrink-0">
                  EN
                </div>
                <div>
                  <h3 className="font-poppins font-black text-lg sm:text-xl text-[#0F2747] leading-tight">
                    {language === "vi" ? "Chương trình Tiếng Anh" : "English Programs"}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ENGLISH_PROGRAMS.map(renderCard)}
              </div>
            </div>
          )}

          {/* Track 2: Tiếng Việt (THPT & ĐGNL) */}
          {activeTab === "vietnamese" && (
            <div className="animate-fadeIn">
              <div className="flex items-center gap-3 mb-6 pb-2.5 border-b-2 border-slate-200">
                <div className="w-8 h-8 rounded-sm bg-emerald-100 text-[#0F2747] border-2 border-slate-300 flex items-center justify-center font-black text-xs shrink-0">
                  VN
                </div>
                <div>
                  <h3 className="font-poppins font-black text-lg sm:text-xl text-[#0F2747] leading-tight">
                    {language === "vi" ? "Chương trình Tiếng Việt" : "Vietnamese Programs"}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {VIETNAMESE_PROGRAMS.map(renderCard)}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
