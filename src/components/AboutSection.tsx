"use client";

import React from "react";
import { usePencily } from "@/context/PencilyContext";

interface AboutSectionProps {
  onOpenTutorModal: () => void;
}

export function AboutSection({ onOpenTutorModal }: AboutSectionProps) {
  const { language } = usePencily();

  return (
    <section id="about" className="py-20 sm:py-28 bg-[#FFFDF9] border-t-2 border-slate-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="max-w-3xl space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#4F7ECB]">
              About The Pencily
            </span>
            <h2 className="font-poppins font-black text-3xl sm:text-4xl text-[#0F2747] tracking-tight mt-4 mb-3">
              {language === "vi" ? "Lớp học mở đồng hành cùng thế hệ học sinh." : "Open classes empowering a generation of learners."}
            </h2>
            <p className="font-inter text-base text-[#4B5563] leading-relaxed">
              {language === "vi"
                ? "The Pencily là một cộng đồng học tập do học sinh khởi xướng và vận hành. Nền tảng cốt lõi là peer learning: học sinh vừa là người tiếp nhận kiến thức, vừa có thể trở thành người chia sẻ, tutor và contributor."
                : "The Pencily is a student-founded and student-led learning ecosystem. Core to our mission is peer-to-peer tutoring: students learn together and can step up as tutors and contributors."}
            </p>
          </div>

          {/* Clean 4 Mission Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {[
              { en: "CONNECT", vn: "Kết nối liên trường" },
              { en: "LEARN", vn: "Học hỏi đa chiều" },
              { en: "SHARE", vn: "Sẻ chia tài liệu" },
              { en: "GROW", vn: "Phát triển toàn diện" },
            ].map((p) => (
              <div key={p.en} className="p-4 bg-white rounded-sm border-2 border-slate-300">
                <div className="font-poppins font-bold text-sm text-[#0F2747]">{p.en}</div>
                <div className="text-xs text-[#6B7280] mt-0.5">{language === "vi" ? p.vn : p.en}</div>
              </div>
            ))}
          </div>

          {/* Official Transparent Disclaimer */}
          <div className="p-6 bg-white rounded-sm border-2 border-slate-300 border-l-4 border-l-[#FFC83D] shadow-xs text-xs sm:text-sm text-[#4B5563] space-y-2">
            <div className="font-bold text-[#0F2747] uppercase tracking-wider text-xs">
              {language === "vi" ? "Thông Điệp Minh Bạch" : "Transparency Notice"}
            </div>
            <p className="leading-relaxed">
              • {language === "vi"
                ? "Tutor tại The Pencily là các bạn học sinh có năng lực và đam mê chia sẻ kiến thức, rèn luyện kỹ năng truyền đạt; các bạn không phải là giáo viên chuyên nghiệp có bằng cấp sư phạm."
                : "Tutors at The Pencily are passionate high-achieving student peers, not licensed pedagogical schoolteachers."}
            </p>
            <p className="leading-relaxed">
              • {language === "vi"
                ? "Nội dung các buổi học và tài liệu được xây dựng dựa trên sự tìm hiểu, tổng hợp và kinh nghiệm cá nhân với tinh thần học tập bình đẳng (peer-to-peer), học hỏi đa chiều."
                : "Course content and study notes reflect personal synthesis with an equal, collaborative peer-to-peer ethos."}
            </p>
            <p className="leading-relaxed">
              • {language === "vi"
                ? "Mọi hoạt động học tập tại The Pencily mang tính chất bổ trợ năng lực, phát triển tư duy và kỹ năng mềm, hoàn toàn không thay thế chương trình giảng dạy chính khóa của Bộ Giáo dục và Đào tạo."
                : "All activities are supplementary and focus on soft skills and critical thinking, never replacing official national curricula."}
            </p>
          </div>

          {/* Become a Tutor Callout */}
          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={onOpenTutorModal}
              className="px-6 py-3 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] border-2 border-slate-300 hover:border-[#0F2747] text-xs sm:text-sm font-semibold shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              {language === "vi" ? "Ứng tuyển trở thành Tutor →" : "Apply as Peer Tutor →"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
