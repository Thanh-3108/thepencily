"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { TutorApplicationModal } from "@/components/Modals";

import { Users, GraduationCap, FileText, Sparkles, ShieldCheck, Heart, Award, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [isApplyTutorOpen, setIsApplyTutorOpen] = useState(false);

  return (
    <div className="relative bg-[#FFF9EF] text-[#0F2747]">
      {/* 1. STICKY FULL-SCREEN HERO VIEWPORT (Stays fixed while scrolling) */}
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-between z-0 bg-[#FFF9EF] overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Hero Section: Centered in full viewport */}
        <main className="flex-1 flex items-center justify-center">
          <Hero onExploreClick={() => router.push("/dashboard")} />
        </main>

        {/* Subtle Scroll Hint */}
        <div className="pb-4 flex justify-center items-center">
          <a
            href="#about"
            className="inline-flex flex-col items-center gap-1 text-xs text-[#687280] hover:text-[#0F2747] transition group cursor-pointer"
          >
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#0F2747]/50 group-hover:text-[#0F2747]">
              Cuộn để khám phá
            </span>
            <svg
              className="w-4 h-4 text-[#0F2747]/60 group-hover:text-[#0F2747] animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>

      {/* 2. REVEAL OVERLAY: About section glides UP over the sticky hero */}
      <section
        id="about"
        className="relative z-10 min-h-screen bg-[#FAF7F2] rounded-t-[36px] sm:rounded-t-[48px] border-t border-slate-200/80 shadow-[0_-25px_60px_-15px_rgba(15,39,71,0.18)] py-16 sm:py-24"
      >
        {/* Top Sheet Pill Accent */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto -mt-8 mb-10" />

        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60 mb-3.5">
              Về The Pencily
            </span>
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-[#0F2747] tracking-tight max-w-xl mx-auto text-balance">
              Cộng đồng học tập do học sinh, vì học sinh
            </h2>
            <p className="mt-3.5 text-[#475569] text-base sm:text-lg leading-relaxed text-balance">
              Nơi bạn có thể vừa học hỏi từ bạn bè đồng trang lứa, vừa chia sẻ kiến thức môn học thế mạnh — 100% miễn phí và cởi mở.
            </p>
          </div>

            {/* 4 Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-poppins font-bold text-[#0F2747] text-base mb-2">
                  Học tập Peer-to-Peer
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Lớp học nhỏ trên Discord & Google Meet do chính các bạn học sinh dẫn dắt. Thảo luận tự nhiên, không áp lực điểm số.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="font-poppins font-bold text-[#0F2747] text-base mb-2">
                  Trở thành Tutor
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Bạn tự tin môn nào? Ứng tuyển làm tutor để mở lớp chia sẻ, rèn luyện kỹ năng thuyết trình và giúp đỡ cộng đồng.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
                <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-poppins font-bold text-[#0F2747] text-base mb-2">
                  Chia sẻ tài liệu
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Trao đổi đề cương, tài liệu tóm tắt và mẹo ôn thi thực chiến từ học sinh trường chuyên và các bạn chăm chỉ.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
                <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-poppins font-bold text-[#0F2747] text-base mb-2">
                  Kết nối liên trường
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Gặp gỡ những người bạn cùng mục tiêu thi đại học, săn học bổng hoặc đơn giản là cùng nhau học mỗi tối.
                </p>
              </div>
            </div>

            {/* Commitments & Call to Action */}
            <div className="bg-[#0F2747] text-white rounded-2xl p-6 sm:p-9 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/15">
                    Cam kết giá trị
                  </span>
                  <h3 className="font-poppins font-bold text-xl sm:text-2xl text-white">
                    Môi trường học tập an toàn & hoàn toàn phi lợi nhuận
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                    <div className="flex items-start gap-2.5">
                      <ShieldCheck className="w-5 h-5 text-[#FFC83D] shrink-0 mt-0.5" />
                      <div className="text-xs text-slate-300 leading-relaxed">
                        <strong className="text-white block text-sm mb-0.5">100% Miễn phí</strong>
                        Không thu bất kỳ khoản học phí hay phụ phí nào.
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Heart className="w-5 h-5 text-[#FFC83D] shrink-0 mt-0.5" />
                      <div className="text-xs text-slate-300 leading-relaxed">
                        <strong className="text-white block text-sm mb-0.5">Tôn trọng & Lắng nghe</strong>
                        Red Line Policy nghiêm ngặt: không kỳ thị hay xúc phạm.
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Award className="w-5 h-5 text-[#FFC83D] shrink-0 mt-0.5" />
                      <div className="text-xs text-slate-300 leading-relaxed">
                        <strong className="text-white block text-sm mb-0.5">Duyệt đề cương</strong>
                        Nội dung buổi học được ban nội dung kiểm tra kỹ trước khi host.
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 pt-2 leading-relaxed border-t border-white/10">
                    * Lưu ý: Tutor tại The Pencily là các bạn học sinh có tinh thần chia sẻ kiến thức, không thay thế chương trình học chính khóa hay thầy cô giáo trên lớp.
                  </p>
                </div>

                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                  <Link
                    href="/dashboard"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-[#0F2747] font-bold text-sm shadow-xs transition active:scale-98 text-center"
                  >
                    <span>Xem các lớp đang mở</span>
                    <ArrowRight className="w-4 h-4 text-[#0F2747]" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsApplyTutorOpen(true)}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-sm transition active:scale-98 cursor-pointer"
                  >
                    <span>Trở thành Peer Tutor</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* 3. Footer */}
      <div className="relative z-10 bg-[#FFF9EF]">
        <Footer />
      </div>

      <TutorApplicationModal
        isOpen={isApplyTutorOpen}
        onClose={() => setIsApplyTutorOpen(false)}
      />
    </div>
  );
}

