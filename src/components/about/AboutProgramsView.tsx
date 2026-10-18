"use client";

import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  Award,
  BookOpen,
  ArrowRight,
  Headphones,
  Check,
  Video,
  FileText,
  Sparkles,
} from "lucide-react";
import { usePencily } from "@/context/PencilyContext";

interface AboutProgramsViewProps {
  onOpenTutorModal?: () => void;
}

export function AboutProgramsView({ onOpenTutorModal }: AboutProgramsViewProps) {
  const { language } = usePencily();
  const isVi = language === "vi";

  const flagshipPrograms = [
    {
      titleVi: "IELTS: Road to 6.5 / 7.0+",
      titleEn: "IELTS: Road to 6.5 / 7.0+",
      badgeVi: "Flagship Học Thuật",
      badgeEn: "Flagship Program",
      descVi:
        "Tập trung khắc phục hai kỹ năng Writing & Speaking. Sửa chi tiết luận điểm bài viết 1-1, phòng Voice luyện phản xạ Speaking theo bộ đề Forecast mới nhất từ các Peer Tutor đạt band 7.5 – 8.5+.",
      descEn:
        "Specialized intensive curriculum targeting Writing & Speaking. 1-on-1 essay logic reviews and weekly voice practice using current speaking forecast prompts from 7.5 – 8.5+ peer tutors.",
      subjectsVi: ["IELTS Writing Task 1 & 2", "IELTS Speaking Forecast", "Reading Strategy"],
      subjectsEn: ["IELTS Writing Task 1 & 2", "IELTS Speaking Forecast", "Reading Strategy"],
      accent: "border-amber-400 bg-amber-50/50",
    },
    {
      titleVi: "Chiến Thuật Ôn Thi THPT Quốc Gia & ĐGNL",
      titleEn: "National High School Exam & Competency Assessment",
      badgeVi: "Luyện Đề Thực Chiến",
      badgeEn: "Exam Mastery",
      descVi:
        "Hệ thống hóa kiến thức trọng tâm môn Toán, Lý, Hóa, Sinh, Tiếng Anh và Ngữ Văn. Giải đề thi thử, phân tích các bẫy đề thi hay gặp và phương pháp bấm máy tính Casio tối ưu thời gian.",
      descEn:
        "Systematic review of core subjects including Math, Physics, Chemistry, English, and Literature. Mock exam walkthroughs and time management strategies.",
      subjectsVi: ["Toán 12 & Casio", "Tiếng Anh THPTQG", "Tư duy Định tính / Định lượng ĐGNL"],
      subjectsEn: ["12th Grade Math", "National English Exam", "Quantitative & Qualitative Logic"],
      accent: "border-blue-400 bg-blue-50/50",
    },
    {
      titleVi: "Khoa Học Tự Nhiên & Dự Án Học Thuật",
      titleEn: "STEM Discovery & Academic Research",
      badgeVi: "Nghiên Cứu & Trải Nghiệm",
      badgeEn: "STEM Projects",
      descVi:
        "Khám phá các đề tài khoa học ứng dụng, công nghệ thông tin căn bản, phương pháp nghiên cứu khoa học học sinh và chuẩn bị hồ sơ ứng tuyển học bổng du học.",
      descEn:
        "Hands-on STEM topics, intro to programming, high school research methodology, and academic portfolio building for scholarships.",
      subjectsVi: ["Python Căn Bản", "Nghiên Cứu Khoa Học Kỹ Thuật", "Hồ Sơ Hoạt Động"],
      subjectsEn: ["Python Basics", "High School Science Fair", "Extracurricular Portfolio"],
      accent: "border-emerald-400 bg-emerald-50/50",
    },
  ];

  const formats = [
    {
      titleVi: "Phòng Voice Học Nhóm (Discord Pods)",
      titleEn: "Discord Voice Pods",
      icon: Headphones,
      descVi:
        "Quy mô từ 3 đến 6 bạn học sinh. Không khí thảo luận cởi mở, bật mic trao đổi trực tiếp, giải đề theo nhóm mà không bị cảm giác e ngại hay phán xét.",
      descEn:
        "Small 3 to 6-student audio rooms for open, stress-free discussion, real-time problem solving, and peer accountability.",
    },
    {
      titleVi: "Lớp Học Chuyên Đề Trực Tuyến (Meet & Rooms)",
      titleEn: "Interactive Classrooms",
      icon: Video,
      descVi:
        "Tutor chia sẻ màn hình slide, bảng vẽ tương tác, giảng lý thuyết cô đọng trong 45 phút và dành 30 phút còn lại để giải đáp toàn bộ thắc mắc của người học.",
      descEn:
        "Live screen-sharing and interactive whiteboards with 45 minutes of concise concept breakdown followed by 30 minutes of open Q&A.",
    },
    {
      titleVi: "Kho Tài Liệu & Ghi Chú Trọng Tâm (Library)",
      titleEn: "Open Resource Library",
      icon: FileText,
      descVi:
        "Toàn bộ tài liệu tóm tắt trọng tâm, slide bài giảng, đề thi thử có lời giải chi tiết đều được lưu trữ vĩnh viễn và chia sẻ miễn phí 100% cho mọi thành viên.",
      descEn:
        "Curated concise notes, presentation decks, and annotated mock exams stored permanently and shared completely free of charge.",
    },
  ];

  return (
    <div className="space-y-12">
      {/* Intro Hero */}
      <div className="bg-white rounded-md p-6 sm:p-8 border-2 border-[#0F2747] shadow-xs">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-[#0F2747] text-white text-xs font-bold uppercase tracking-wider mb-4">
          <GraduationCap className="w-4 h-4 text-[#FFC83D]" />
          <span>{isVi ? "Mô Hình Học Tập" : "Learning Model"}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-poppins font-black text-[#0F2747] tracking-tight mb-3">
          {isVi
            ? "Chương Trình Học Tập Do Học Sinh Dẫn Dắt"
            : "Student-Led Curriculum & Study Programs"}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          {isVi
            ? "Các chương trình tại The Pencily được thiết kế theo phương pháp Peer Learning (học tập đồng đẳng): học sinh khá giỏi chia sẻ kinh nghiệm và mẹo thực chiến cho các bạn khác trong một môi trường bình đẳng, dễ hiểu và không áp lực."
            : "The Pencily programs are built around peer-to-peer learning: high-achieving student peers share their experience, intuition, and battle-tested strategies in an equal, collaborative, zero-pressure atmosphere."}
        </p>

        <div className="mt-6 pt-5 border-t border-slate-200 flex flex-wrap gap-3">
          <Link
            href="/dashboard?tab=classes"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#0F2747] hover:bg-slate-800 text-white text-xs sm:text-sm font-bold border-2 border-[#0F2747] shadow-2xs transition active:scale-95"
          >
            <span>{isVi ? "Xem lịch lớp học đang mở" : "View open classes schedule"}</span>
            <ArrowRight className="w-4 h-4 text-[#FFC83D]" />
          </Link>
          {onOpenTutorModal && (
            <button
              type="button"
              onClick={onOpenTutorModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] text-xs sm:text-sm font-bold border-2 border-slate-300 hover:border-[#0F2747] shadow-2xs transition active:scale-95 cursor-pointer"
            >
              <span>{isVi ? "Đăng ký mở lớp Tutor" : "Apply to host a class"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Flagship Programs */}
      <div>
        <div className="text-xs font-black uppercase tracking-wider text-[#4F7ECB] mb-2">
          {isVi ? "Chương trình trọng điểm" : "Flagship Tracks"}
        </div>
        <h3 className="text-xl sm:text-2xl font-poppins font-black text-[#0F2747] tracking-tight mb-6">
          {isVi ? "Các Chuỗi Lớp Học Tiêu Biểu" : "Featured Study Tracks"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {flagshipPrograms.map((prog, idx) => (
            <div
              key={idx}
              className={`rounded-md p-6 border-2 border-slate-300 hover:border-[#0F2747] bg-white shadow-xs flex flex-col justify-between transition-all`}
            >
              <div>
                <span className="inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-xs bg-[#0F2747] text-[#FFC83D] mb-3">
                  {isVi ? prog.badgeVi : prog.badgeEn}
                </span>

                <h4 className="text-base sm:text-lg font-poppins font-bold text-[#0F2747] mb-2">
                  {isVi ? prog.titleVi : prog.titleEn}
                </h4>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {isVi ? prog.descVi : prog.descEn}
                </p>

                <div className="space-y-1.5 pt-3 border-t border-slate-100 mb-6">
                  {(isVi ? prog.subjectsVi : prog.subjectsEn).map((sub, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/dashboard?tab=classes"
                className="inline-flex items-center justify-between text-xs font-bold text-[#4F7ECB] hover:text-[#0F2747] pt-3 border-t border-slate-200 transition-colors"
              >
                <span>{isVi ? "Xem thời khóa biểu" : "View class timetable"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Formats */}
      <div>
        <div className="text-xs font-black uppercase tracking-wider text-[#4F7ECB] mb-2">
          {isVi ? "Hình thức tổ chức" : "Format & Methodology"}
        </div>
        <h3 className="text-xl sm:text-2xl font-poppins font-black text-[#0F2747] tracking-tight mb-6">
          {isVi ? "Cách Thức Vận Hành Lớp Học" : "How Classes Are Conducted"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {formats.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-md p-6 border-2 border-slate-300 shadow-xs"
              >
                <div className="w-10 h-10 rounded-sm border-2 border-slate-300 bg-[#FAF7F2] text-[#0F2747] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#4F7ECB]" />
                </div>
                <h4 className="font-poppins font-bold text-sm sm:text-base text-[#0F2747] mb-2">
                  {isVi ? f.titleVi : f.titleEn}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {isVi ? f.descVi : f.descEn}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* How a Student Participates */}
      <div className="bg-[#FAF7F2] rounded-md p-6 sm:p-8 border-2 border-slate-300">
        <h3 className="font-poppins font-bold text-lg sm:text-xl text-[#0F2747] mb-4">
          {isVi ? "4 Bước Để Bắt Đầu Học Tập" : "4 Steps to Start Learning"}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              step: "01",
              titleVi: "Xem Danh Mục Lớp",
              titleEn: "Browse Catalog",
              descVi: "Tìm kiếm môn học bạn cần ôn luyện trên Dashboard lớp học.",
              descEn: "Find the subjects you need help with on the Classes dashboard.",
            },
            {
              step: "02",
              titleVi: "Đăng Ký Tham Gia",
              titleEn: "Enroll with 1-Click",
              descVi: "Bấm ghi danh miễn phí để nhận thông báo và link phòng học.",
              descEn: "Enroll for free to receive session reminders and room links.",
            },
            {
              step: "03",
              titleVi: "Vào Phòng Học",
              titleEn: "Join Study Room",
              descVi: "Tham gia phòng học trực tuyến, thảo luận và làm bài cùng Tutor.",
              descEn: "Join the virtual room, interact live, and practice with peers.",
            },
            {
              step: "04",
              titleVi: "Nhận Tài Liệu & Điểm",
              titleEn: "Get Notes & PP",
              descVi: "Tải slide tài liệu sau buổi học và tích lũy Pencily Points.",
              descEn: "Download slides after class and earn Pencily Points for active learning.",
            },
          ].map((item) => (
            <div key={item.step} className="bg-white rounded-sm p-4 border-2 border-slate-200">
              <span className="text-xs font-black text-[#4F7ECB] block mb-1">
                BƯỚC {item.step}
              </span>
              <div className="font-poppins font-bold text-sm text-[#0F2747] mb-1">
                {isVi ? item.titleVi : item.titleEn}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isVi ? item.descVi : item.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
