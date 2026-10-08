"use client";

import React from "react";

interface AboutSectionProps {
  onOpenTutorModal: () => void;
}

export function AboutSection({ onOpenTutorModal }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#FFFDF9] border-t border-[#0F2747]/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="max-w-3xl space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#FFC83D] bg-[#0F2747] px-3 py-1 rounded-full">
              About The Pencily
            </span>
            <h2 className="font-poppins font-black text-3xl sm:text-4xl text-[#0F2747] tracking-tight mt-4 mb-3">
              Lớp học mở đồng hành cùng thế hệ học sinh.
            </h2>
            <p className="font-inter text-base text-[#4B5563] leading-relaxed">
              The Pencily là một cộng đồng học tập do học sinh khởi xướng và vận hành (Gen 1.0). Nền tảng cốt lõi là peer learning: học sinh vừa là người tiếp nhận kiến thức, vừa có thể trở thành người chia sẻ, mentor và contributor.
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
              <div key={p.en} className="p-4 bg-white rounded-xl border border-[#0F2747]/10">
                <div className="font-poppins font-bold text-sm text-[#0F2747]">{p.en}</div>
                <div className="text-xs text-[#6B7280] mt-0.5">{p.vn}</div>
              </div>
            ))}
          </div>

          {/* Official Transparent Disclaimer */}
          <div className="p-6 bg-white rounded-2xl border-l-4 border-[#FFC83D] shadow-xs text-xs sm:text-sm text-[#4B5563] space-y-2">
            <div className="font-bold text-[#0F2747] uppercase tracking-wider text-xs">
              Thông Điệp Minh Bạch (Disclaimer)
            </div>
            <p className="leading-relaxed">
              • Tutor tại The Pencily là các bạn học sinh có năng lực và đam mê chia sẻ kiến thức, rèn luyện kỹ năng truyền đạt; các bạn <b>không phải là giáo viên chuyên nghiệp có bằng cấp sư phạm</b>.
            </p>
            <p className="leading-relaxed">
              • Nội dung các buổi học và tài liệu được xây dựng dựa trên sự tìm hiểu, tổng hợp và kinh nghiệm cá nhân với tinh thần học tập bình đẳng (peer-to-peer), học hỏi đa chiều.
            </p>
            <p className="leading-relaxed">
              • Mọi hoạt động học tập tại The Pencily mang tính chất bổ trợ năng lực, phát triển tư duy và kỹ năng mềm, <b>hoàn toàn không thay thế chương trình giảng dạy chính khóa của Bộ Giáo dục và Đào tạo</b>.
            </p>
          </div>

          {/* Become a Tutor Callout */}
          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={onOpenTutorModal}
              className="px-6 py-3 rounded-full bg-[#0F2747] hover:bg-[#1A3E6D] text-white text-xs sm:text-sm font-semibold shadow-xs transition-all active:scale-95"
            >
              Ứng tuyển trở thành Tutor Gen 1.0 →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
