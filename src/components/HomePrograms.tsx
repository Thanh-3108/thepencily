"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, HelpCircle, ArrowRight, Check, Award } from "lucide-react";
import { usePencily } from "@/context/PencilyContext";

interface ProgramItem {
  id: string;
  category: "english" | "vietnamese";
  categoryLabelVi: string;
  categoryLabelEn: string;
  titleVi: string;
  titleEn: string;
  badgeVi: string;
  badgeEn: string;
  taglineVi: string;
  taglineEn: string;
  descriptionVi: string;
  descriptionEn: string;
  subjectsVi: string[];
  subjectsEn: string[];
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
    taglineVi: "Chiến thuật bứt phá band điểm cùng Peer Tutors 7.5 – 8.5+",
    taglineEn: "Score breakthrough strategy with 7.5 – 8.5+ Peer Tutors",
    descriptionVi: "Lớp học của The Pencily được học sinh giảng dạy để hỗ trợ đạt được band IELTs",
    descriptionEn: "The Pencily peer-led classes designed to help students achieve target IELTS bands",
    subjectsVi: ["IELTS Writing", "IELTS Speaking", "Reading & Listening", "Road to 6.5/7.0+"],
    subjectsEn: ["IELTS Writing", "IELTS Speaking", "Reading & Listening", "Road to 6.5/7.0+"],
    highlightsVi: [
      "[placeholder]",
      "[placeholder]",
      "[placeholder]",
    ],
    highlightsEn: [
      "[placeholder]",
      "[placeholder]",
      "[placeholder]",
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
    titleVi: "SAT: Road to 1300 / 1400 / 1500+",
    titleEn: "SAT: Road to 1300 / 1400 / 1500+",
    badgeVi: "Lớp Học SAT",
    badgeEn: "SAT Program",
    taglineVi: "Chinh phục Digital SAT cùng Tutors 1450 – 1560+",
    taglineEn: "Master Digital SAT alongside 1450 – 1560+ Tutors",
    descriptionVi: "Lớp hỗ trợ học sinh có định hướng du học đạt điểm SAT",
    descriptionEn: "Classes supporting study-abroad oriented students to achieve their target SAT scores",
    subjectsVi: ["Digital SAT", "SAT Math 800", "Reading & Writing", "Road to 1300/1400/1500+"],
    subjectsEn: ["Digital SAT", "SAT Math 800", "Reading & Writing", "Road to 1300/1400/1500+"],
    highlightsVi: [
      "[placeholder]",
      "[placeholder]",
      "[placeholder]",
    ],
    highlightsEn: [
      "[placeholder]",
      "[placeholder]",
      "[placeholder]",
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
    categoryLabelEn: "National",
    titleVi: "Luyện Đề & Chuyên Đề Trọng Tâm THPT",
    titleEn: "National High School Exam Bootcamps",
    badgeVi: "Bootcamp Nhóm Nhỏ",
    badgeEn: "Small Group Bootcamp",
    taglineVi: "Ôn thi tốt nghiệp THPT & Đánh giá Năng lực (ĐGNL)",
    taglineEn: "THPT Graduation & University Competency Assessment Exams",
    descriptionVi: "Nhóm học nhỏ từ 4–8 bạn cùng làm đề theo thời gian thực. Peer tutor phân tích bẫy đề thi, chia sẻ mẹo bấm máy tính Casio và phương pháp loại trừ đáp án nhanh.",
    descriptionEn: "Interactive study pods of 4–8 students solving tests in real-time. Peer tutors dissect test pitfalls, Casio calculator shortcuts, and fast elimination strategies.",
    subjectsVi: ["Toán học", "Vật lý", "Hóa học", "Sinh học", "Ngữ văn"],
    subjectsEn: ["Math", "Physics", "Chemistry", "Biology", "Literature"],
    highlightsVi: [
      "Giải đề thi thử từ các trường chuyên toàn quốc",
      "Thảo luận cách tư duy thay vì học vẹt công thức",
      "Không khí cởi mở, không áp lực so bì điểm số",
    ],
    highlightsEn: [
      "Solve mock tests from top specialized high schools across Vietnam",
      "Foster critical analytical thinking instead of rote formula memorization",
      "Open, supportive, peer-level atmosphere without comparative pressure",
    ],
    icon: BookOpen,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    id: "doubt-mentorship",
    category: "vietnamese",
    categoryLabelVi: "Tiếng Việt",
    categoryLabelEn: "National",
    titleVi: "Gỡ Rối Bài Tập 24/7 & Mentorship",
    titleEn: "24/7 Doubt Clearing & Mentorship",
    badgeVi: "Hỗ Trợ Không Phán Xét",
    badgeEn: "Non-Judgmental Support",
    taglineVi: "Kẹt ở bài toán khó? Luôn có bạn học sẵn sàng giúp",
    taglineEn: "Stuck on a tricky problem? A peer is always here to help",
    descriptionVi: "Không còn cảnh loay hoay một mình lúc 23h đêm. Đăng bài lên cộng đồng hoặc ghé phòng voice Discord để được hướng dẫn từng bước; cùng tọa đàm định hướng chọn ngành, săn học bổng từ cựu học sinh.",
    descriptionEn: "No more struggling alone at midnight. Post on our community boards or join a Discord voice room for step-by-step guidance, alongside weekend panels on college majors and scholarships.",
    subjectsVi: ["Tất cả phân môn", "Bài tập về nhà", "Hồ sơ du học", "Săn học bổng"],
    subjectsEn: ["All Subjects", "Homework Help", "Study Abroad", "Scholarships"],
    highlightsVi: [
      "Không bao giờ bị chê 'câu này dễ sao không biết làm'",
      "Giải thích từng bước bản chất, không chỉ đưa đáp án",
      "Tọa đàm định kỳ chia sẻ kinh nghiệm apply học bổng & du học",
    ],
    highlightsEn: [
      "Never judged with condescending comments, every question is welcomed",
      "Explains foundational concepts step-by-step, never just dropping an answer",
      "Regular community webinars sharing scholarship and college admissions insights",
    ],
    icon: HelpCircle,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
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
    const subjects = isVi ? prog.subjectsVi : prog.subjectsEn;
    const highlights = isVi ? prog.highlightsVi : prog.highlightsEn;
    const categoryLabel = isVi ? prog.categoryLabelVi : prog.categoryLabelEn;

    const isIelts = prog.id === "flagship-ielts";
    const isSat = prog.id === "flagship-sat";

    let cardContainerClasses = "bg-white rounded-md p-6 sm:p-7 border-2 border-slate-300 shadow-xs hover:border-[#0F2747] hover:shadow-md transition-all flex flex-col justify-between";
    let ribbonClasses = "";
    let badgeClasses = "text-[#0F2747] bg-slate-100 border-slate-300 font-bold";
    let taglineClasses = "text-[#4F7ECB]";
    let ctaClasses = "text-[#0F2747] hover:text-[#4F7ECB]";

    if (isIelts) {
      // IELTS Authentic Red Theme
      cardContainerClasses = "bg-[#FFF5F5] rounded-md p-6 sm:p-7 border-2 border-red-300 shadow-xs hover:border-red-500 hover:shadow-lg transition-all flex flex-col justify-between relative overflow-hidden";
      ribbonClasses = "absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-[#E01A22] via-red-500 to-rose-600";
      badgeClasses = "text-red-950 bg-red-100 border-red-300 shadow-2xs font-black";
      taglineClasses = "text-red-700";
      ctaClasses = "text-[#0F2747] hover:text-red-700 font-bold";
    } else if (isSat) {
      // SAT Authentic Blue Theme
      cardContainerClasses = "bg-[#F0F7FF] rounded-md p-6 sm:p-7 border-2 border-blue-300 shadow-xs hover:border-blue-500 hover:shadow-lg transition-all flex flex-col justify-between relative overflow-hidden";
      ribbonClasses = "absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-[#0077C8] via-blue-500 to-[#002D62]";
      badgeClasses = "text-blue-950 bg-blue-100 border-blue-300 shadow-2xs font-black";
      taglineClasses = "text-blue-700";
      ctaClasses = "text-[#0F2747] hover:text-blue-700 font-bold";
    }

    return (
      <div key={prog.id} className={cardContainerClasses}>
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
          <h3 className="font-poppins font-bold text-xl text-[#0F2747] mb-1">
            {title}
          </h3>
          <div className={`text-xs font-semibold mb-3 ${taglineClasses}`}>
            {tagline}
          </div>

          {/* Description */}
          <p className="text-sm text-[#475569] leading-relaxed mb-5">
            {description}
          </p>

          {/* Highlights */}
          <div className="space-y-2 pt-3 border-t-2 border-slate-200/70 mb-5">
            {highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-[#0F2747]/90 leading-relaxed">
                <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isIelts ? "text-red-600" : isSat ? "text-blue-600" : "text-emerald-600"}`} />
                <span className={h === "[placeholder]" ? "text-slate-400 italic font-mono tracking-wider" : ""}>
                  {h}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Subjects & CTA */}
        <div className="pt-4 border-t-2 border-slate-200/70 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {subjects.map((sub) => {
              let subClasses = "text-slate-700 bg-slate-100 font-medium border-slate-200";
              if (isIelts) {
                subClasses = "text-red-950 bg-white/90 font-bold border-red-200";
              } else if (isSat) {
                subClasses = "text-blue-950 bg-white/90 font-bold border-blue-200";
              }
              return (
                <span key={sub} className={`text-[11px] px-2 py-0.5 rounded-xs border ${subClasses}`}>
                  {sub}
                </span>
              );
            })}
          </div>

          <Link
            href="/classes"
            className={`inline-flex items-center gap-1.5 text-xs font-bold transition-colors ${ctaClasses}`}
          >
            <span>{isVi ? "Xem các phòng" : "Explore Rooms"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <section id="programs" className="pt-20 sm:pt-28">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-[#4F7ECB] mb-2">
            {language === "vi" ? "Mô hình đồng hành: The Pencily" : "Companion Model: The Pencily"}
          </div>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-[#0F2747] tracking-tight text-balance">
            {language === "vi" ? "Các chương trình học tập bình đẳng" : "Equal Learning Programs"}
          </h2>
        </div>

        {/* Segmented Filter Tabs: Tiếng Anh / Tiếng Việt */}
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
