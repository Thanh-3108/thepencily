"use client";

import React from "react";
import {
  Network,
  BookOpenCheck,
  Share2,
  TrendingUp,
  Target,
  Sparkles,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";
import { usePencily } from "@/context/PencilyContext";

export function AboutMissionView() {
  const { language } = usePencily();
  const isVi = language === "vi";

  const pillars = [
    {
      id: "connect",
      code: "CONNECT",
      titleVi: "Kết Nối Liên Trường",
      titleEn: "Inter-School Connection",
      descVi:
        "Xây dựng mạng lưới liên kết học sinh giữa các trường THPT trên toàn quốc, xóa bỏ khoảng cách địa lý và ranh giới chuyên / không chuyên.",
      descEn:
        "Building a nationwide high-school network breaking geographic boundaries and closing disparities between specialized and regular schools.",
      icon: Network,
      color: "border-blue-300 bg-blue-50/40 text-blue-700",
    },
    {
      id: "learn",
      code: "LEARN",
      titleVi: "Học Hỏi Đa Chiều",
      titleEn: "Multidimensional Learning",
      descVi:
        "Tổ chức các lớp học chuyên đề bổ trợ, study group nhỏ và phòng Voice giải đáp thắc mắc bài tập trong không khí cởi mở, tôn trọng.",
      descEn:
        "Hosting focused study groups and live interactive voice pods for homework troubleshooting in an open, respectful space.",
      icon: BookOpenCheck,
      color: "border-amber-300 bg-amber-50/40 text-amber-700",
    },
    {
      id: "share",
      code: "SHARE",
      titleVi: "Sẻ Chia Tri Thức",
      titleEn: "Open Knowledge Sharing",
      descVi:
        "Trao quyền cho học sinh đóng góp tri thức thông qua tài liệu tự biên soạn, slide bài giảng thực tế và phương pháp tự học độc đáo cá nhân.",
      descEn:
        "Empowering students to share self-curated study guides, interactive presentation decks, and authentic study methodologies.",
      icon: Share2,
      color: "border-emerald-300 bg-emerald-50/40 text-emerald-700",
    },
    {
      id: "grow",
      code: "GROW",
      titleVi: "Phát Triển Toàn Diện",
      titleEn: "Holistic Development",
      descVi:
        "Rèn luyện bộ kỹ năng thế kỷ 21: Giao tiếp, Giảng dạy, Lãnh đạo, Hợp tác và Tư duy phản biện để tự tin bước vào giảng đường và tương lai.",
      descEn:
        "Honing 21st-century competencies: Communication, Teaching, Leadership, Collaboration, and Critical Thinking for university readiness.",
      icon: TrendingUp,
      color: "border-indigo-300 bg-indigo-50/40 text-indigo-700",
    },
  ];

  const skills = [
    {
      titleVi: "Kỹ Năng Giao Tiếp",
      titleEn: "Communication Skills",
      descVi: "Trình bày mạch lạc, lắng nghe tích cực và phản hồi mang tính xây dựng.",
      descEn: "Articulating ideas clearly, active listening, and providing constructive feedback.",
    },
    {
      titleVi: "Kỹ Năng Giảng Dạy",
      titleEn: "Pedagogical Delivery",
      descVi: "Đóng gói kiến thức phức tạp thành những ví dụ trực quan, dễ hiểu nhất.",
      descEn: "Deconstructing intricate concepts into relatable, intuitive examples.",
    },
    {
      titleVi: "Năng Lực Lãnh Đạo",
      titleEn: "Empowered Leadership",
      descVi: "Dẫn dắt study group, điều phối dự án và truyền cảm hứng cho người học.",
      descEn: "Leading study pods, coordinating peer projects, and motivating others.",
    },
    {
      titleVi: "Hợp Tác Đa Ngành",
      titleEn: "Cross-Disciplinary Teamwork",
      descVi: "Làm việc nhóm cùng các bạn học sinh có thế mạnh và góc nhìn khác nhau.",
      descEn: "Collaborating with peers possessing diverse strengths and backgrounds.",
    },
    {
      titleVi: "Tư Duy Phản Biện",
      titleEn: "Critical Thinking",
      descVi: "Đào sâu bản chất vấn đề, không học vẹt, tranh luận học thuật văn minh.",
      descEn: "Digging into core principles, avoiding rote memorization, and constructive debate.",
    },
  ];

  return (
    <div className="space-y-12">
      {/* Strategic Vision Hero */}
      <div className="bg-white rounded-md p-6 sm:p-8 border-2 border-[#0F2747] shadow-xs">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-[#0F2747] text-white text-xs font-bold uppercase tracking-wider mb-4">
          <Target className="w-4 h-4 text-[#FFC83D]" />
          <span>{isVi ? "Tôn Chỉ Chiến Lược" : "Mission & Vision"}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-poppins font-black text-[#0F2747] tracking-tight mb-3">
          {isVi
            ? "Bình Đẳng Hóa Cơ Hội Học Tập Cho Học Sinh Việt Nam"
            : "Democratizing Peer Learning for Students"}
        </h2>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          {isVi
            ? "The Pencily hướng tới một hệ sinh thái học tập không rào cản, nơi mọi học sinh đều có quyền tiếp cận những người bạn học giỏi, những tài liệu ôn thi chất lượng cao và môi trường phát triển kỹ năng mềm mà không phải trả bất kỳ khoản phí nào."
            : "The Pencily strives for a borderless learning community where any student can access high-achieving peer mentors, top-tier exam preparation materials, and essential soft-skill development completely free of charge."}
        </p>
      </div>

      {/* 4 Pillars */}
      <div>
        <div className="text-xs font-black uppercase tracking-wider text-[#4F7ECB] mb-2">
          {isVi ? "4 Giá trị cốt lõi" : "4 Core Pillars"}
        </div>
        <h3 className="text-xl sm:text-2xl font-poppins font-black text-[#0F2747] tracking-tight mb-6">
          {isVi ? "Tôn Chỉ Hoạt Động" : "Guiding Principles"}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                className="bg-white rounded-md p-6 border-2 border-slate-300 hover:border-[#0F2747] shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-sm border-2 border-slate-300 bg-[#FAF7F2] flex items-center justify-center mb-4 text-[#0F2747]">
                    <Icon className="w-5 h-5 text-[#4F7ECB]" />
                  </div>

                  <span className="text-[10px] font-black uppercase tracking-wider text-[#4F7ECB] block mb-1">
                    {p.code}
                  </span>

                  <h4 className="font-poppins font-bold text-base text-[#0F2747] mb-2">
                    {isVi ? p.titleVi : p.titleEn}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {isVi ? p.descVi : p.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feynman Technique Philosophy */}
      <div className="bg-[#FAF7F2] rounded-md p-6 sm:p-8 border-2 border-slate-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-sm bg-[#FFC83D] border-2 border-[#0F2747] flex items-center justify-center text-[#0F2747]">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-poppins font-bold text-lg sm:text-xl text-[#0F2747]">
              {isVi ? "Phương Pháp Feynman Trong Học Tập" : "The Feynman Peer Learning Model"}
            </h3>
            <span className="text-xs font-semibold text-slate-600">
              {isVi ? "Học để dạy – Dạy để thấu hiểu tường tận" : "Learn to teach, teach to truly master"}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-3xl mb-6">
          {isVi
            ? "Nhà vật lý học Richard Feynman từng chỉ ra: Thước đo tốt nhất của việc bạn có thực sự hiểu một vấn đề hay không là khả năng giải thích nó một cách đơn giản cho một người khác. Tại The Pencily, Tutor học được nhiều nhất khi các bạn truyền đạt lại kiến thức, và người học nhận được giải thích trực quan, gần gũi từ góc nhìn của bạn bè đồng trang lứa."
            : "Physicist Richard Feynman asserted that the ultimate test of your mastery of a concept is your ability to explain it simply to someone else. At The Pencily, peer tutors solidify their own expertise by teaching, while learners receive relatable, intuitive guidance from peers who recently mastered the same concepts."}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
          <div className="bg-white rounded-sm p-4 border border-slate-300">
            <span className="text-[10px] font-black uppercase text-[#4F7ECB] block mb-1">
              BƯỚC 1
            </span>
            <div className="font-bold text-xs sm:text-sm text-[#0F2747] mb-1">
              {isVi ? "Hệ Thống Kiến Thức" : "Concept Synthesis"}
            </div>
            <p className="text-xs text-slate-600">
              {isVi
                ? "Tự tổng hợp lý thuyết thành sơ đồ và ghi chú cô đọng."
                : "Condensing complex textbook theory into clean mental frameworks."}
            </p>
          </div>

          <div className="bg-white rounded-sm p-4 border border-slate-300">
            <span className="text-[10px] font-black uppercase text-[#4F7ECB] block mb-1">
              BƯỚC 2
            </span>
            <div className="font-bold text-xs sm:text-sm text-[#0F2747] mb-1">
              {isVi ? "Truyền Đạt Trực Tiếp" : "Peer Delivery"}
            </div>
            <p className="text-xs text-slate-600">
              {isVi
                ? "Trình bày trực tiếp qua phòng Voice hoặc lớp học Meet."
                : "Explaining the concept live in simple, everyday language."}
            </p>
          </div>

          <div className="bg-white rounded-sm p-4 border border-slate-300">
            <span className="text-[10px] font-black uppercase text-[#4F7ECB] block mb-1">
              BƯỚC 3
            </span>
            <div className="font-bold text-xs sm:text-sm text-[#0F2747] mb-1">
              {isVi ? "Lấp Lỗ Hổng Tư Duy" : "Refining Understanding"}
            </div>
            <p className="text-xs text-slate-600">
              {isVi
                ? "Nhận câu hỏi từ bạn học để nhận ra điểm chưa hiểu sâu và hoàn thiện."
                : "Discovering conceptual blindspots via peer questions and mastering them."}
            </p>
          </div>
        </div>
      </div>

      {/* 21st Century Skills */}
      <div>
        <div className="text-xs font-black uppercase tracking-wider text-[#4F7ECB] mb-2">
          {isVi ? "Kỹ năng thời đại mới" : "Future-Ready Readiness"}
        </div>
        <h3 className="text-xl sm:text-2xl font-poppins font-black text-[#0F2747] tracking-tight mb-6">
          {isVi ? "Bộ 5 Kỹ Năng Thế Kỷ 21" : "5 Core 21st-Century Competencies"}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((s, idx) => (
            <div
              key={idx}
              className="bg-white rounded-md p-5 border-2 border-slate-300 shadow-xs"
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-[#4F7ECB] shrink-0" />
                <h4 className="font-poppins font-bold text-sm text-[#0F2747]">
                  {isVi ? s.titleVi : s.titleEn}
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">
                {isVi ? s.descVi : s.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
