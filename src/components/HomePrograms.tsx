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
      "Chữa bài Writing Task 1 & 2 chi tiết từng luận điểm, từ vựng và ngữ pháp",
      "Phòng Voice 1-1 luyện phản xạ Speaking theo bộ đề Forecast hàng tuần",
      "Chiến thuật gỡ bẫy trắc nghiệm Reading & Listening từ cao thủ 8.0+",
    ],
    highlightsEn: [
      "In-depth 1-on-1 feedback on Task 1 & Task 2 writing logic, vocab, and grammar",
      "Weekly 1-on-1 Voice rooms practicing latest Speaking forecast topics",
      "Proven Reading & Listening multiple-choice trap mitigation strategies from 8.0+ tutors",
    ],
    icon: Award,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
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
      "Luyện trọn bộ đề thi Digital SAT cập nhật theo chuẩn College Board",
      "Tối ưu hóa điểm SAT Math tuyệt đối với thủ thuật máy tính & Desmos",
      "Phương pháp bẻ khóa từ vựng học thuật khó và bẫy logic trong phần RW",
    ],
    highlightsEn: [
      "Full authentic Digital SAT test bank aligned with College Board standards",
      "Maximize SAT Math score with calculator tricks and Desmos speed hacks",
      "Crack tough academic vocabulary and subtle logic traps in the RW section",
    ],
    icon: Award,
    iconBg: "bg-blue-50",
    iconColor: "text-[#4F7ECB]",
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

    return (
      <div
        key={prog.id}
        className={`bg-white rounded-md p-6 sm:p-7 border-2 transition-all flex flex-col justify-between ${
          prog.isFlagship
            ? "border-amber-400 shadow-xs hover:shadow-lg relative overflow-hidden"
            : "border-slate-300 shadow-xs hover:border-[#0F2747] hover:shadow-md"
        }`}
      >
        {/* Flagship top ribbon accent */}
        {prog.isFlagship && (
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-[#F59E0B]" />
        )}

        <div>
          {/* Top Lockup */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className={`w-12 h-12 rounded-sm ${prog.iconBg} ${prog.iconColor} border-2 ${prog.isFlagship ? "border-amber-300" : "border-slate-200"} flex items-center justify-center shrink-0`}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded-xs">
                {categoryLabel}
              </span>
              <span
                className={`text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-sm flex items-center gap-1.5 border-2 ${
                  prog.isFlagship
                    ? "text-amber-950 bg-amber-50 border-amber-400 shadow-2xs font-black"
                    : "text-[#0F2747] bg-slate-100 border-slate-300 font-bold"
                }`}
              >
                {prog.isFlagship && <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                {badge}
              </span>
            </div>
          </div>

          {/* Title & Tagline */}
          <h3 className="font-poppins font-bold text-xl text-[#0F2747] mb-1">
            {title}
          </h3>
          <div className={`text-xs font-semibold mb-3 ${prog.isFlagship ? "text-amber-700" : "text-[#4F7ECB]"}`}>
            {tagline}
          </div>

          {/* Description */}
          <p className="text-sm text-[#475569] leading-relaxed mb-5">
            {description}
          </p>

          {/* Highlights */}
          <div className="space-y-2 pt-3 border-t-2 border-slate-100 mb-5">
            {highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-[#0F2747]/90 leading-relaxed">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Subjects & CTA */}
        <div className="pt-4 border-t-2 border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {subjects.map((sub) => (
              <span
                key={sub}
                className={`text-[11px] px-2 py-0.5 rounded-xs border ${
                  prog.isFlagship && (sub.includes("Road") || sub.includes("SAT") || sub.includes("IELTS"))
                    ? "text-amber-950 bg-amber-50 font-bold border-amber-300"
                    : "text-slate-700 bg-slate-100 font-medium border-slate-200"
                }`}
              >
                {sub}
              </span>
            ))}
          </div>

          <Link
            href="/classes"
            className={`inline-flex items-center gap-1.5 text-xs font-bold transition-colors ${
              prog.isFlagship
                ? "text-[#0F2747] hover:text-amber-700"
                : "text-[#0F2747] hover:text-[#4F7ECB]"
            }`}
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
            <Award className={`w-4 h-4 ${activeTab === "english" ? "text-[#FFC83D]" : "text-amber-600"}`} />
            <span>{language === "vi" ? "Chương trình Tiếng Anh (IELTS & SAT)" : "English Track (IELTS & SAT)"}</span>
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
            <BookOpen className={`w-4 h-4 ${activeTab === "vietnamese" ? "text-emerald-300" : "text-[#4F7ECB]"}`} />
            <span>{language === "vi" ? "Chương trình Tiếng Việt (THPT & ĐGNL)" : "Vietnamese Track (THPT & Exams)"}</span>
          </button>
        </div>

        {/* Content Divided into Two Tracks */}
        <div>
          {/* Track 1: Tiếng Anh (IELTS & SAT) */}
          {activeTab === "english" && (
            <div className="animate-fadeIn">
              <div className="flex items-center gap-3 mb-6 pb-2.5 border-b-2 border-slate-200">
                <div className="w-8 h-8 rounded-sm bg-amber-100 text-amber-900 border-2 border-amber-300 flex items-center justify-center font-black text-xs shrink-0">
                  EN
                </div>
                <div>
                  <h3 className="font-poppins font-black text-lg sm:text-xl text-[#0F2747] leading-tight">
                    {language === "vi" ? "Chương trình Tiếng Anh (IELTS & SAT)" : "English Programs (IELTS & SAT)"}
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
                <div className="w-8 h-8 rounded-sm bg-blue-100 text-[#0F2747] border-2 border-slate-300 flex items-center justify-center font-black text-xs shrink-0">
                  VN
                </div>
                <div>
                  <h3 className="font-poppins font-black text-lg sm:text-xl text-[#0F2747] leading-tight">
                    {language === "vi" ? "Chương trình Tiếng Việt (THPT & ĐGNL)" : "Vietnamese Programs (THPT & Exams)"}
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
