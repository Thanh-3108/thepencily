"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { TutorApplicationModal } from "@/components/Modals";
import { HomePrograms } from "@/components/HomePrograms";
import { HomePlatformJourney } from "@/components/HomePlatformJourney";
import { HomeTutorPortfolio } from "@/components/HomeTutorPortfolio";
import { HomeStudentStories } from "@/components/HomeStudentStories";

import { Users, GraduationCap, FileText, ShieldCheck, Heart, Award, ArrowRight, Compass } from "lucide-react";
import Link from "next/link";
import { usePencily } from "@/context/PencilyContext";

export default function Home() {
  const router = useRouter();
  const { language } = usePencily();
  const [isApplyTutorOpen, setIsApplyTutorOpen] = useState(false);

  return (
    <div className="relative bg-[#FAF7EE] text-[#0F2747]">
      {/* 1. STICKY FULL-SCREEN HERO VIEWPORT */}
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-between z-0 bg-[#FAF7EE] overflow-hidden">
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

      {/* 2. REVEAL OVERLAY: About section glides UP over the sticky hero (Samsung squarish style, thick borders) */}
      <section
        id="about"
        className="relative z-10 min-h-screen bg-[#FAF7F2] rounded-t-xl sm:rounded-t-2xl border-t-2 border-[#0F2747]/20 shadow-[0_-20px_50px_-15px_rgba(15,39,71,0.18)] py-16 sm:py-24"
      >
        {/* Top Sheet Pill Accent */}
        <div className="w-12 h-1.5 bg-slate-400 rounded-sm mx-auto -mt-8 mb-10" />

        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#4F7ECB] mb-2">
              {language === "vi" ? "Về The Pencily" : "About The Pencily"}
            </div>
            <h2 className="font-poppins font-black text-3xl sm:text-4xl text-[#0F2747] tracking-tight max-w-xl mx-auto text-balance">
              {language === "vi"
                ? "Cộng đồng học tập do học sinh, vì học sinh"
                : "A learning community built by students, for students"}
            </h2>
            <div className="mt-3">
              <a
                href="#stories"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4F7ECB] hover:text-[#0F2747] underline underline-offset-4 transition cursor-pointer"
              >
                <span>{language === "vi" ? "Gặp gỡ ban sáng lập & ban giám đốc ↓" : "Meet founders & board of directors ↓"}</span>
              </a>
            </div>
          </div>

          {/* 4 Feature Cards (Interactive, clickable, Samsung squarish style: rounded-md, border-2) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {/* Card 1: Học tập Peer-to-Peer -> Đến Dashboard / Tìm lớp */}
            <Link
              href="/dashboard?tab=classes"
              className="group bg-white rounded-md p-6 border-2 border-slate-300 hover:border-[#0F2747] shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer hover:-translate-y-1 active:translate-y-0 text-left"
            >
              <div>
                <div className="w-11 h-11 rounded-sm border-2 border-blue-200 bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-[#0F2747] group-hover:text-white group-hover:border-[#0F2747] transition-colors">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-poppins font-bold text-[#0F2747] text-base mb-2 group-hover:text-[#4F7ECB] transition-colors flex items-center justify-between">
                  <span>{language === "vi" ? "Học tập Peer-to-Peer" : "Peer-to-Peer Learning"}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#4F7ECB]" />
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  {language === "vi"
                    ? "Lớp học nhỏ trên Discord & Google Meet do chính các bạn học sinh dẫn dắt. Thảo luận tự nhiên, không áp lực điểm số."
                    : "Small interactive study groups led by students on Discord & Google Meet. Natural discussions, zero grade pressure."}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-[#4F7ECB] flex items-center gap-1 group-hover:underline">
                <span>{language === "vi" ? "Khám phá lớp học" : "Explore classes"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            {/* Card 2: Trở thành Tutor -> Mở modal ứng tuyển */}
            <button
              type="button"
              onClick={() => setIsApplyTutorOpen(true)}
              className="group bg-white rounded-md p-6 border-2 border-slate-300 hover:border-[#0F2747] shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer hover:-translate-y-1 active:translate-y-0 text-left"
            >
              <div>
                <div className="w-11 h-11 rounded-sm border-2 border-emerald-200 bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-colors">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="font-poppins font-bold text-[#0F2747] text-base mb-2 group-hover:text-emerald-700 transition-colors flex items-center justify-between">
                  <span>{language === "vi" ? "Trở thành Tutor" : "Become a Peer Tutor"}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-emerald-600" />
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  {language === "vi"
                    ? "Bạn tự tin môn nào? Ứng tuyển làm tutor để mở lớp chia sẻ, rèn luyện kỹ năng thuyết trình và giúp đỡ cộng đồng."
                    : "Excel in a subject? Become a peer tutor to host classes, hone public speaking, and empower your community."}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-emerald-600 flex items-center gap-1 group-hover:underline">
                <span>{language === "vi" ? "Ứng tuyển ngay" : "Apply now"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>

            {/* Card 3: Chia sẻ tài liệu -> Đến Thư viện tài liệu */}
            <Link
              href="/dashboard?tab=resources"
              className="group bg-white rounded-md p-6 border-2 border-slate-300 hover:border-[#0F2747] shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer hover:-translate-y-1 active:translate-y-0 text-left"
            >
              <div>
                <div className="w-11 h-11 rounded-sm border-2 border-amber-200 bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600 transition-colors">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-poppins font-bold text-[#0F2747] text-base mb-2 group-hover:text-amber-700 transition-colors flex items-center justify-between">
                  <span>{language === "vi" ? "Chia sẻ tài liệu" : "Resource Sharing"}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-amber-600" />
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  {language === "vi"
                    ? "Trao đổi đề cương, tài liệu tóm tắt và mẹo ôn thi thực chiến từ học sinh trường chuyên và các bạn chăm chỉ."
                    : "Exchange study guides, concise Cornell summaries, and exam tips from top high school students."}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-amber-600 flex items-center gap-1 group-hover:underline">
                <span>{language === "vi" ? "Mở kho tài liệu" : "Open library"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            {/* Card 4: Hành trình 5 trụ cột -> Đến #journey */}
            <a
              href="#journey"
              className="group bg-white rounded-md p-6 border-2 border-slate-300 hover:border-[#0F2747] shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer hover:-translate-y-1 active:translate-y-0 text-left"
            >
              <div>
                <div className="w-11 h-11 rounded-sm border-2 border-indigo-200 bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:bg-[#0F2747] group-hover:text-white group-hover:border-[#0F2747] transition-colors">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-poppins font-bold text-[#0F2747] text-base mb-2 group-hover:text-indigo-700 transition-colors flex items-center justify-between">
                  <span>{language === "vi" ? "Hành trình nền tảng" : "Platform Journey"}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-indigo-600" />
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  {language === "vi"
                    ? "Khám phá 5 trụ cột: phòng WebRTC P2P, gia sư chuyên ban, kho Cornell, điểm thưởng PP và chứng nhận."
                    : "Discover 5 core pillars: WebRTC study pods, peer mentors, Cornell vault, PP rewards, and verified credentials."}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-indigo-600 flex items-center gap-1 group-hover:underline">
                <span>{language === "vi" ? "Khám phá ngay" : "Explore pillars"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </a>
          </div>

          {/* Commitments & Call to Action (Samsung squarish style: rounded-md, border-2) */}
          <div className="bg-white text-[#0F2747] rounded-md p-6 sm:p-9 border-2 border-[#0F2747] shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-[#4F7ECB]">
                  {language === "vi" ? "Cam kết giá trị" : "Our Commitments"}
                </div>
                <h3 className="font-poppins font-bold text-xl sm:text-2xl text-[#0F2747]">
                  {language === "vi"
                    ? "Môi trường học tập an toàn & hoàn toàn phi lợi nhuận"
                    : "A safe, supportive & completely non-profit space"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-[#4F7ECB] shrink-0 mt-0.5" />
                    <div className="text-xs text-[#475569] leading-relaxed">
                      <strong className="text-[#0F2747] block text-sm mb-0.5">
                        {language === "vi" ? "100% Miễn phí" : "100% Free"}
                      </strong>
                      {language === "vi"
                        ? "Không thu bất kỳ khoản học phí hay phụ phí nào."
                        : "Never charges any tuition or hidden fees."}
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Heart className="w-5 h-5 text-[#EF4444] shrink-0 mt-0.5" />
                    <div className="text-xs text-[#475569] leading-relaxed">
                      <strong className="text-[#0F2747] block text-sm mb-0.5">
                        {language === "vi" ? "Tôn trọng & Lắng nghe" : "Respect & Equality"}
                      </strong>
                      {language === "vi"
                        ? "Red Line Policy nghiêm ngặt: không kỳ thị hay xúc phạm."
                        : "Strict Red Line Policy: zero tolerance for harassment."}
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Award className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
                    <div className="text-xs text-[#475569] leading-relaxed">
                      <strong className="text-[#0F2747] block text-sm mb-0.5">
                        {language === "vi" ? "Duyệt đề cương" : "Vetted Syllabi"}
                      </strong>
                      {language === "vi"
                        ? "Nội dung buổi học được ban nội dung kiểm tra kỹ trước khi host."
                        : "Session outlines are quality-checked prior to going live."}
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-[#64748B] pt-2 leading-relaxed border-t border-slate-200">
                  {language === "vi"
                    ? "* Lưu ý: Tutor tại The Pencily là các bạn học sinh có tinh thần chia sẻ kiến thức, không thay thế chương trình học chính khóa hay thầy cô giáo trên lớp."
                    : "* Note: Tutors at The Pencily are passionate peer students sharing knowledge, not a replacement for formal school curricula or certified teachers."}
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <Link
                  href="/dashboard"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-[#0F2747] hover:bg-slate-800 text-white font-bold text-sm shadow-2xs transition active:scale-98 text-center"
                >
                  <span>{language === "vi" ? "Xem các lớp đang mở" : "Explore Open Classes"}</span>
                  <ArrowRight className="w-4 h-4 text-[#FFC83D]" />
                </Link>
                <button
                  type="button"
                  onClick={() => setIsApplyTutorOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-white hover:bg-slate-50 text-[#0F2747] border-2 border-slate-300 hover:border-[#0F2747] font-bold text-sm shadow-2xs transition active:scale-98 cursor-pointer"
                >
                  <span>{language === "vi" ? "Trở thành Peer Tutor" : "Become a Peer Tutor"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EXTENDED SECTIONS: Platform Discovery Journey, Programs, Tutor Portfolio, Student Stories / Founder's Words */}
      <div className="relative z-10 bg-[#FAF7F2] pb-12">
        <HomePlatformJourney />
        <HomePrograms />
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
