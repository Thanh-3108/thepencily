"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { usePencily } from "@/context/PencilyContext";
import { PencilyScrollReveal } from "@/components/PencilyScrollReveal";

export function HomeHowItWorks() {
  const { language } = usePencily();
  const isVi = language === "vi";

  // 4 Core Floating Bubbles (Authentic Watercolor Artwork, strictly aligned, NO background islands, NO text repetition)
  const bubbles = [
    {
      id: 1,
      number: "100%",
      title: isVi ? "Lớp tình nguyện" : "Volunteer Classes",
      image: "/brand/elements/bubble-volunteer.png",
      floatClass: "animate-bubble-float-a",
    },
    {
      id: 2,
      number: "60'",
      title: isVi ? "Mỗi buổi học" : "Per Session",
      image: "/brand/elements/bubble-duration.png",
      floatClass: "animate-bubble-float-b",
    },
    {
      id: 3,
      number: "Peer",
      title: isVi ? "Tutor là học sinh" : "Student Mentors",
      image: "/brand/elements/bubble-peer.png",
      floatClass: "animate-bubble-float-c",
    },
    {
      id: 4,
      number: "3 – 8",
      title: isVi ? "Bạn mỗi phòng" : "Students Per Pod",
      image: "/brand/elements/bubble-pod.png",
      floatClass: "animate-bubble-float-d",
    },
  ];

  const steps = isVi
    ? ["Chọn môn & lịch học", "Tham gia buổi 60 phút", "Đồng hành cùng Peer Tutor", "Học nhóm thân mật 3–8 bạn"]
    : ["Pick subject & slot", "60-minute live session", "Learn with Peer Tutor", "Cozy pod of 3–8"];

  return (
    <section id="how-it-works" className="pt-20 sm:pt-24 pb-3 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <PencilyScrollReveal animation="bounce-up" delay={50}>
          <div className="text-center max-w-2xl mx-auto mb-9 sm:mb-10">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#EEF5FF] text-[#3B6FD8] text-xs font-semibold mb-3">
              <span>{isVi ? "Mô hình học đồng đẳng" : "Peer-tutoring flow"}</span>
            </div>
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-[42px] text-[#0F2747] tracking-tight">
              {isVi ? "Cách The Pencily hoạt động" : "How The Pencily Works"}
            </h2>
          </div>
        </PencilyScrollReveal>

        {/* Soft Numbered Journey Chips (Friendly rounded-full pills + crisp step numbers, NO boxy wireframe) */}
        <PencilyScrollReveal animation="stamp" delay={75}>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10 max-w-5xl mx-auto">
            {steps.map((label, idx) => (
              <React.Fragment key={label}>
                <div className="inline-flex items-center gap-2.5 pl-2 pr-4 py-2 rounded-full bg-white border border-[#E6DEC8] shadow-2xs text-xs sm:text-sm font-medium text-[#0F2747]">
                  <span className="w-6 h-6 rounded-full bg-[#FFC83D] text-[#0F2747] font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span>{label}</span>
                </div>
                {idx < steps.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-[#4F7ECB]/60 hidden md:inline shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </PencilyScrollReveal>

        {/* 4 Straight, Balanced Floating Bubbles with High-Res Transparent Watercolor Artwork */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-center justify-items-center">
          {bubbles.map((b, idx) => (
            <PencilyScrollReveal
              key={b.id}
              animation="bounce-up"
              delay={idx * 100}
              className="w-full flex justify-center"
            >
              {/* Floating Bubble Container: Seamless transparent sphere with organic drop-shadow */}
              <div
                className={`relative ${b.floatClass} w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center p-6 text-center transition-transform duration-300 hover:scale-105 cursor-pointer filter drop-shadow-[0_16px_28px_rgba(15,39,71,0.08)]`}
              >
                {/* Authentic Watercolor Soap Bubble Texture */}
                <div className="absolute inset-0 select-none pointer-events-none">
                  <Image
                    src={b.image}
                    alt={b.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 256px, 288px"
                  />
                </div>

                {/* Inside Bubble Content */}
                <div className="relative z-10 flex flex-col items-center justify-center max-w-[170px] sm:max-w-[190px] select-none px-2">
                  <span className="font-poppins font-black text-4xl sm:text-5xl text-[#0F2747] tracking-tight leading-none mb-1.5 drop-shadow-[0_1px_3px_rgba(255,255,255,0.95)]">
                    {b.number}
                  </span>
                  <h3 className="font-poppins font-bold text-sm sm:text-base text-[#0F2747] tracking-tight leading-snug drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
                    {b.title}
                  </h3>
                </div>
              </div>
            </PencilyScrollReveal>
          ))}
        </div>

        {/* Vibrant Warm Navy + Sunlit Gold Action Card */}
        <PencilyScrollReveal animation="bounce-up" delay={200} className="mt-8 sm:mt-10">
          <div className="relative overflow-hidden bg-[#0F2747] text-white rounded-3xl p-7 sm:p-9 shadow-pencily-soft flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
            <div
              aria-hidden="true"
              className="absolute -right-12 -top-12 w-56 h-56 rounded-full bg-[#FFC83D]/15 blur-2xl pointer-events-none"
            />
            <div className="space-y-1.5 text-center sm:text-left relative z-10">
              <h4 className="font-poppins font-bold text-lg sm:text-xl text-white">
                {isVi
                  ? "Tìm buổi học phù hợp với thời gian biểu của bạn"
                  : "Find a session matching your schedule"}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                {isVi
                  ? "Đăng ký chỉ với 1 chạm, tham gia học trực tiếp trên Web hoặc Google Meet hoàn toàn miễn phí."
                  : "One-click registration, jump straight into live study pods on Web or Google Meet."}
              </p>
            </div>

            <Link
              href="/dashboard"
              className="group relative z-10 inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#FFC83D] hover:bg-[#f2bb2e] text-[#0F2747] font-bold text-xs sm:text-sm shadow-sm transition-all hover:-translate-y-0.5 active:scale-98 shrink-0"
            >
              <span>{isVi ? "Xem lịch mở lớp" : "Browse Open Classes"}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </PencilyScrollReveal>
      </div>
    </section>
  );
}
