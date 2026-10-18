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

  return (
    <section id="how-it-works" className="pt-20 sm:pt-28 pb-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Pure Clean Typography, NO Background Island, NO Emoji */}
        <PencilyScrollReveal animation="bounce-up" delay={50}>
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-[#4F7ECB] mb-2">
              Peer-tutoring model
            </p>
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-[#0F2747] tracking-tight mb-3">
              {isVi ? "Cách The Pencily hoạt động" : "How The Pencily Works"}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
              {isVi
                ? "Mô hình kèm cặp đồng đẳng phi lợi nhuận: các buổi học 60 phút gọn gàng, nhóm nhỏ thân mật và không áp lực điểm số."
                : "A non-profit peer-tutoring ecosystem: concise 60-minute sessions, cozy small pods, and zero pressure."}
            </p>
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

                {/* Inside Bubble Content: Pure typography, NO background island pills, strictly the core item */}
                <div className="relative z-10 flex flex-col items-center justify-center max-w-[170px] sm:max-w-[190px] select-none px-2">
                  {/* Big Highlighted Number */}
                  <span className="font-poppins font-black text-4xl sm:text-5xl text-[#0F2747] tracking-tight leading-none mb-1.5 drop-shadow-[0_1px_3px_rgba(255,255,255,0.95)]">
                    {b.number}
                  </span>

                  {/* Title / Mục: Concise, non-repetitive */}
                  <h3 className="font-poppins font-bold text-sm sm:text-base text-[#0F2747] tracking-tight leading-snug drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
                    {b.title}
                  </h3>
                </div>
              </div>
            </PencilyScrollReveal>
          ))}
        </div>

        {/* Clean, Straight Action Card */}
        <PencilyScrollReveal animation="bounce-up" delay={200} className="mt-14 sm:mt-16">
          <div className="bg-white rounded-md border-2 border-slate-300 p-6 sm:p-7 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-poppins font-bold text-base sm:text-lg text-[#0F2747]">
                {isVi
                  ? "Tìm buổi học phù hợp với thời gian biểu của bạn"
                  : "Find a session matching your schedule"}
              </h4>
              <p className="text-xs text-slate-500">
                {isVi
                  ? "Đăng ký chỉ với 1 click, vào học trực tiếp trên Discord hoặc Web."
                  : "One-click registration, jump straight into study pods on Discord or Web."}
              </p>
            </div>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#0F2747] hover:bg-slate-800 text-white font-bold text-xs shadow-2xs transition active:scale-98 shrink-0"
            >
              <span>{isVi ? "Xem lịch mở lớp" : "Browse Open Classes"}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FFC83D]" />
            </Link>
          </div>
        </PencilyScrollReveal>
      </div>
    </section>
  );
}
