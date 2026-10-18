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

  // 4 Core Floating Bubbles (Authentic Watercolor Artwork, strictly aligned, NO background islands)
  const bubbles = [
    {
      id: 1,
      number: "100%",
      title: isVi ? "Lớp tình nguyện" : "Volunteer Classes",
      detail: isVi ? "0đ Học phí • Tự nguyện" : "0 VND • 100% Free",
      desc: isVi
        ? "Mọi buổi học và tài liệu đều hoàn toàn miễn phí, xây dựng từ tinh thần chia sẻ phi lợi nhuận của học sinh dành cho học sinh."
        : "All sessions and materials are completely free of charge, driven by a pure student-led non-profit spirit.",
      image: "/brand/elements/bubble-volunteer.jpg",
      floatClass: "animate-bubble-float-a",
    },
    {
      id: 2,
      number: "60'",
      title: isVi ? "60 Phút mỗi buổi" : "60-Min Sessions",
      detail: isVi ? "15' Lý thuyết • 35' Chữa đề • 10' Q&A" : "15m Theory • 35m Practice • 10m Q&A",
      desc: isVi
        ? "Thời lượng chuẩn tối ưu sự tập trung của học sinh: tóm gọn trọng tâm, chữa đề thực chiến và giải đáp dứt điểm thắc mắc."
        : "Structured for optimal student focus: concise core theory, direct problem solving, and immediate Q&A.",
      image: "/brand/elements/bubble-duration.jpg",
      floatClass: "animate-bubble-float-b",
    },
    {
      id: 3,
      number: "Peer",
      title: isVi ? "Tutor là học sinh" : "Student Peer Tutors",
      detail: isVi ? "Đồng trang lứa • Không khoảng cách" : "Empathetic • Shared Perspective",
      desc: isVi
        ? "Gia sư là chính các bạn học sinh chuyên hoặc đạt điểm cao. Cùng góc nhìn nên dễ đồng cảm với áp lực và giải thích mộc mạc."
        : "Tutors are high-achieving school peers who break down complex lessons with relatable empathy and zero condescension.",
      image: "/brand/elements/bubble-peer.jpg",
      floatClass: "animate-bubble-float-c",
    },
    {
      id: 4,
      number: "3 – 8",
      title: isVi ? "Nhóm nhỏ thân mật" : "Small Study Pods",
      detail: isVi ? "Bật mic tự do • Không phán xét" : "Interactive • Zero Judgment",
      desc: isVi
        ? "Mỗi phòng chỉ duy trì từ 3 đến 8 bạn. Không gian ấm cúng giúp bạn thoải mái bật mic hỏi bài mà không sợ đám đông hay bị chê cười."
        : "Pods of only 3 to 8 learners give everyone space to speak up, share screens, and get direct tutor guidance without anxiety.",
      image: "/brand/elements/bubble-pod.jpg",
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

        {/* 4 Straight, Balanced Floating Bubbles with High-Res Watercolor Artwork */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-center justify-items-center">
          {bubbles.map((b, idx) => (
            <PencilyScrollReveal
              key={b.id}
              animation="bounce-up"
              delay={idx * 100}
              className="w-full flex justify-center"
            >
              {/* Floating Bubble Container: Perfectly circular, straight grid alignment */}
              <div
                className={`relative ${b.floatClass} w-64 h-64 sm:w-72 sm:h-72 rounded-full flex items-center justify-center p-6 text-center transition-transform duration-300 hover:scale-105 cursor-pointer shadow-[0_14px_35px_rgba(15,39,71,0.07)]`}
              >
                {/* Authentic Watercolor Soap Bubble Texture */}
                <div className="absolute inset-0 rounded-full overflow-hidden select-none pointer-events-none">
                  <Image
                    src={b.image}
                    alt={b.title}
                    fill
                    className="object-cover mix-blend-multiply opacity-95"
                    sizes="(max-width: 640px) 256px, 288px"
                  />
                </div>

                {/* Subtle Glassy Specular Rim */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border border-white/70 shadow-[inset_0_2px_14px_rgba(255,255,255,0.95),inset_0_-6px_14px_rgba(15,39,71,0.06)] pointer-events-none"
                />

                {/* Inside Bubble Content: Pure typography, NO background island pills */}
                <div className="relative z-10 flex flex-col items-center justify-center max-w-[190px] sm:max-w-[210px] select-none">
                  {/* Big Highlighted Number */}
                  <span className="font-poppins font-black text-3xl sm:text-4xl text-[#0F2747] tracking-tight leading-none mb-1.5">
                    {b.number}
                  </span>

                  {/* Title */}
                  <h3 className="font-poppins font-bold text-sm sm:text-base text-[#0F2747] mb-1">
                    {b.title}
                  </h3>

                  {/* Clean detail text (NO background pill) */}
                  <p className="text-[11px] font-semibold text-[#4F7ECB] mb-2 leading-tight">
                    {b.detail}
                  </p>

                  {/* Description */}
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {b.desc}
                  </p>
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
