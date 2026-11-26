"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { TutorApplicationModal } from "@/components/Modals";
import { HomePrograms } from "@/components/HomePrograms";
import { HomeHowItWorks } from "@/components/HomeHowItWorks";
import { HomeTutorPortfolio } from "@/components/HomeTutorPortfolio";
import { HomeStudentStories } from "@/components/HomeStudentStories";

import { Users, GraduationCap, FileText, ShieldCheck, Heart, Award, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePencily } from "@/context/PencilyContext";
import { PencilyScrollReveal, PencilyScrollProgressBar } from "@/components/PencilyScrollReveal";
import { OwlMascot } from "@/components/Logo";

export default function Home() {
  const router = useRouter();
  const { language } = usePencily();
  const [isApplyTutorOpen, setIsApplyTutorOpen] = useState(false);

  return (
    <div className="relative bg-[#FAF7EE] text-[#0F2747]">
      {/* 0. PLAYFUL STATIONERY SCROLL PROGRESS BAR */}
      <PencilyScrollProgressBar />

      {/* 1. STICKY FULL-SCREEN HERO VIEWPORT */}
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-between z-0 pencily-hero-canvas overflow-hidden">
        {/* Navbar */}
        <Navbar onOpenTutorModal={() => setIsApplyTutorOpen(true)} />

        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center">
          <Hero onExploreClick={() => router.push("/dashboard")} />
        </main>

        {/* Subtle Scroll Hint */}
        <div className="pb-6 flex justify-center items-center">
          <a
            href="#about"
            className="inline-flex flex-col items-center gap-1.5 text-xs text-[#0F2747]/70 hover:text-[#0F2747] transition group cursor-pointer"
          >
            <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-[#0F2747]/70 group-hover:text-[#0F2747]">
              {language === "vi" ? "Cuộn để khám phá" : "Scroll to explore"}
            </span>
            <svg
              className="w-3.5 h-3.5 text-[#0F2747]/70 group-hover:text-[#0F2747] transition-transform group-hover:translate-y-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>

      {/* 2. REVEAL OVERLAY: Soft rounded paper spread gliding smoothly over Hero */}
      <section
        id="about"
        className="relative z-10 min-h-screen bg-[#FAF7F2] rounded-t-[2rem] sm:rounded-t-[3rem] border-t border-[#E6DEC8] shadow-[0_-24px_60px_-15px_rgba(15,39,71,0.12)] py-16 sm:py-24"
      >
        {/* Soft Sheet Pull Handle */}
        <div className="w-14 h-1.5 bg-[#0F2747]/15 rounded-full mx-auto -mt-8 mb-12" />

        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          {/* Header */}
          <PencilyScrollReveal animation="bounce-up" delay={50}>
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#EEF5FF] text-[#3B6FD8] text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{language === "vi" ? "Về The Pencily" : "About The Pencily"}</span>
              </div>
              <h2 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-[42px] text-[#0F2747] tracking-tight leading-tight text-balance">
                {language === "vi"
                  ? "Cộng đồng học tập do học sinh, vì học sinh"
                  : "A learning community built by students, for students"}
              </h2>
              <p className="text-sm sm:text-base text-[#4A5B72] mt-3 max-w-xl mx-auto leading-relaxed">
                {language === "vi"
                  ? "Nơi kiến thức được truyền lại bằng sự đồng cảm giữa những người bạn đồng trang lứa."
                  : "Where knowledge is passed along through genuine empathy between fellow students."}
              </p>
              <div className="mt-4">
                <a
                  href="#stories"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#4F7ECB] hover:text-[#0F2747] underline decoration-[#FFC83D] decoration-2 underline-offset-4 transition cursor-pointer"
                >
                  <span>{language === "vi" ? "Gặp gỡ đội ngũ sáng lập & điều hành ↓" : "Meet our founders & leadership team ↓"}</span>
                </a>
              </div>
            </div>
          </PencilyScrollReveal>

          {/* 4 Joyful Living Cards (Soft Organic Rounding, Pastel Accents, Zero Box Clutter) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Card 1: Học tập Peer-to-Peer */}
            <PencilyScrollReveal animation="bounce-up" delay={80} className="h-full">
              <Link
                href="/dashboard?tab=classes"
                className="group bg-white rounded-3xl p-7 border border-[#E8E0CB] hover:border-[#4F7ECB]/40 shadow-pencily-soft shadow-pencily-hover transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1.5 text-left h-full relative overflow-hidden"
              >
                <div>
                  <div className="w-13 h-13 rounded-2xl bg-[#EAF2FF] text-[#3B6FD8] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#3B6FD8] group-hover:text-white transition-all duration-300 shadow-2xs">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="font-poppins font-bold text-[#0F2747] text-lg mb-2.5 group-hover:text-[#3B6FD8] transition-colors">
                    {language === "vi" ? "Học tập Peer-to-Peer" : "Peer-to-Peer Learning"}
                  </h3>
                  <p className="text-sm text-[#526277] leading-relaxed">
                    {language === "vi"
                      ? "Lớp học nhỏ trực tuyến 3–8 bạn trên Web & Google Meet. Thảo luận cởi mở và không áp lực điểm số."
                      : "Small interactive study pods of 3–8 students on Web & Google Meet. Open discussion with zero grade pressure."}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#F0EAE0] text-xs sm:text-sm font-semibold text-[#3B6FD8] flex items-center justify-between">
                  <span>{language === "vi" ? "Khám phá lớp học" : "Explore classes"}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </PencilyScrollReveal>

            {/* Card 2: Trở thành Tutor */}
            <PencilyScrollReveal animation="bounce-up" delay={140} className="h-full">
              <button
                type="button"
                onClick={() => setIsApplyTutorOpen(true)}
                className="group bg-white rounded-3xl p-7 border border-[#E8E0CB] hover:border-emerald-400/50 shadow-pencily-soft shadow-pencily-hover transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1.5 text-left h-full w-full relative overflow-hidden"
              >
                <div>
                  <div className="w-13 h-13 rounded-2xl bg-[#E8F8F0] text-emerald-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-2xs">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="font-poppins font-bold text-[#0F2747] text-lg mb-2.5 group-hover:text-emerald-700 transition-colors">
                    {language === "vi" ? "Trở thành Tutor" : "Become a Peer Tutor"}
                  </h3>
                  <p className="text-sm text-[#526277] leading-relaxed">
                    {language === "vi"
                      ? "Chia sẻ thế mạnh môn học, rèn khả năng truyền đạt theo phương pháp Feynman và nhận chứng nhận ngoại khóa."
                      : "Share subjects you love, sharpen presentation skills via the Feynman technique, and build your portfolio."}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#F0EAE0] text-xs sm:text-sm font-semibold text-emerald-700 flex items-center justify-between w-full">
                  <span>{language === "vi" ? "Ứng tuyển ngay" : "Apply now"}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            </PencilyScrollReveal>

            {/* Card 3: Chia sẻ tài liệu */}
            <PencilyScrollReveal animation="bounce-up" delay={200} className="h-full">
              <Link
                href="/dashboard?tab=resources"
                className="group bg-white rounded-3xl p-7 border border-[#E8E0CB] hover:border-amber-400/60 shadow-pencily-soft shadow-pencily-hover transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1.5 text-left h-full relative overflow-hidden"
              >
                <div>
                  <div className="w-13 h-13 rounded-2xl bg-[#FFF6DC] text-amber-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-2xs">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="font-poppins font-bold text-[#0F2747] text-lg mb-2.5 group-hover:text-amber-700 transition-colors">
                    {language === "vi" ? "Chia sẻ tài liệu" : "Resource Sharing"}
                  </h3>
                  <p className="text-sm text-[#526277] leading-relaxed">
                    {language === "vi"
                      ? "Kho đề cương, sổ tay công thức và mẹo ôn thi thực chiến được tổng hợp cẩn thận từ các bạn học sinh giỏi."
                      : "Curated study guides, formula handbooks, and real exam insights shared freely by top student peers."}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#F0EAE0] text-xs sm:text-sm font-semibold text-amber-700 flex items-center justify-between">
                  <span>{language === "vi" ? "Mở kho tài liệu" : "Open library"}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </PencilyScrollReveal>

            {/* Card 4: Kết nối liên trường */}
            <PencilyScrollReveal animation="bounce-up" delay={260} className="h-full">
              <Link
                href="/community"
                className="group bg-white rounded-3xl p-7 border border-[#E8E0CB] hover:border-indigo-400/50 shadow-pencily-soft shadow-pencily-hover transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1.5 text-left h-full relative overflow-hidden"
              >
                <div>
                  <div className="w-13 h-13 rounded-2xl bg-[#F0EDFF] text-indigo-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-2xs">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="font-poppins font-bold text-[#0F2747] text-lg mb-2.5 group-hover:text-indigo-700 transition-colors">
                    {language === "vi" ? "Kết nối liên trường" : "Inter-school Network"}
                  </h3>
                  <p className="text-sm text-[#526277] leading-relaxed">
                    {language === "vi"
                      ? "Tìm những người bạn đồng hành cùng mục tiêu ĐGNL, THPT, SAT/IELTS hoặc đơn giản là cùng nhau tự học mỗi tối."
                      : "Connect with study buddies across schools sharing your university goals or simply co-studying each evening."}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#F0EAE0] text-xs sm:text-sm font-semibold text-indigo-600 flex items-center justify-between">
                  <span>{language === "vi" ? "Tham gia cộng đồng" : "Join community"}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </PencilyScrollReveal>
          </div>

          {/* Warm, Friendly Sunlit Charter Manifesto Card with Owl Mascot */}
          <PencilyScrollReveal animation="stamp" delay={150} className="mt-14">
            <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FFF9E6] to-[#F3F8FF] rounded-3xl border border-[#E6DEC8] p-7 sm:p-10 shadow-pencily-soft relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-5">
                  <div className="flex items-center gap-3.5">
                    <OwlMascot size="md" className="drop-shadow-xs" />
                    <div>
                      <span className="text-xs font-semibold text-[#3B6FD8]">
                        {language === "vi" ? "Cam kết cộng đồng The Pencily" : "The Pencily Community Promise"}
                      </span>
                      <h3 className="font-poppins font-bold text-2xl sm:text-3xl text-[#0F2747] tracking-tight">
                        {language === "vi"
                          ? "An toàn, bình đẳng & 100% phi lợi nhuận"
                          : "Safe, supportive & always non-profit"}
                      </h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                    <div className="p-4 rounded-2xl bg-white/85 border border-[#E6DEC8]/80 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#3B6FD8] shrink-0" />
                        <strong className="text-[#0F2747] text-sm font-bold">
                          {language === "vi" ? "100% Miễn phí" : "100% Free"}
                        </strong>
                      </div>
                      <p className="text-xs text-[#526277] leading-relaxed">
                        {language === "vi"
                          ? "Không thu bất kỳ khoản học phí hay phụ phí thương mại nào."
                          : "Never charges tuition or any hidden commercial fees."}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/85 border border-[#E6DEC8]/80 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-rose-500 shrink-0" />
                        <strong className="text-[#0F2747] text-sm font-bold">
                          {language === "vi" ? "Tôn trọng & Lắng nghe" : "Respect & Kindness"}
                        </strong>
                      </div>
                      <p className="text-xs text-[#526277] leading-relaxed">
                        {language === "vi"
                          ? "Không phán xét khi bạn hỏi lại kiến thức căn bản hay bài khó."
                          : "Zero judgment whenever you ask questions or start fresh."}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/85 border border-[#E6DEC8]/80 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-amber-600 shrink-0" />
                        <strong className="text-[#0F2747] text-sm font-bold">
                          {language === "vi" ? "Duyệt đề cương kỹ" : "Vetted Syllabi"}
                        </strong>
                      </div>
                      <p className="text-xs text-[#526277] leading-relaxed">
                        {language === "vi"
                          ? "Mỗi buổi học đều được ban học thuật góp ý nội dung trước khi mở."
                          : "All session outlines are thoughtfully reviewed beforehand."}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-[#6B7A90] pt-1 leading-relaxed">
                    {language === "vi"
                      ? "* Tutor tại The Pencily là các bạn học sinh yêu thích chia sẻ kiến thức, đồng hành bổ trợ cùng bạn bè chứ không thay thế thầy cô giáo trên lớp."
                      : "* Peer Tutors are helpful fellow students complementing your school learning rather than replacing formal teachers."}
                  </p>
                </div>

                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                  <Link
                    href="/dashboard"
                    className="group w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#0F2747] hover:bg-[#193B6B] text-white font-semibold text-sm shadow-tactile-navy transition-all text-center"
                  >
                    <span>{language === "vi" ? "Xem các lớp đang mở" : "Explore Open Classes"}</span>
                    <ArrowRight className="w-4 h-4 text-[#FFC83D] transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsApplyTutorOpen(true)}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#FFFDF9] text-[#0F2747] border border-[#DED5BE] hover:border-[#4F7ECB]/40 font-semibold text-sm shadow-tactile-slate transition-all cursor-pointer"
                  >
                    <span>{language === "vi" ? "Trở thành Peer Tutor" : "Become a Peer Tutor"}</span>
                  </button>
                </div>
              </div>
            </div>
          </PencilyScrollReveal>
        </div>
      </section>

      {/* 3. EXTENDED SECTIONS: Programs, How It Works, Tutor Portfolio, Student Stories / Founder's Words */}
      <div className="relative z-10 bg-[#FAF7F2] pb-12">
        <HomePrograms />
        <HomeHowItWorks />
        <HomeTutorPortfolio onOpenTutorModal={() => setIsApplyTutorOpen(true)} />
        <HomeStudentStories />
      </div>

      {/* 4. Footer */}
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
