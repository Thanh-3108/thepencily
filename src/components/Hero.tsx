"use client";

import React from "react";
import Link from "next/link";
import { InteractiveDoodleHero } from "./InteractiveDoodleHero";
import { ArrowRight, Sparkles, ShieldCheck, Heart } from "lucide-react";
import { usePencily } from "@/context/PencilyContext";

export function Hero({ onExploreClick }: { onExploreClick?: () => void }) {
  const { language } = usePencily();
  const isVi = language === "vi";

  return (
    <div className="relative w-full overflow-hidden flex flex-col justify-center py-2 sm:py-6">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full">
        {/* Main 2-Column Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Punchy, Tactile Typography */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-left z-10">
            {/* Top Pill Accent */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xs bg-white/95 border-2 border-[#0F2747]/15 text-[#0F2747] text-xs font-mono font-bold uppercase tracking-wider shadow-2xs">
              <span className="text-amber-500 font-black">✦</span>
              <span>
                {isVi
                  ? "Cộng đồng học tập đồng đẳng • 100% Phi lợi nhuận"
                  : "Peer-Learning Community • 100% Non-Profit"}
              </span>
            </div>

            <h1 className="font-poppins font-black text-4xl sm:text-5xl lg:text-[64px] text-[#0F2747] tracking-tight leading-[1.06]">
              The Pencily.
              <br />
              <span className="text-[#4F7ECB]">Built by Students,</span>
              <br />
              For Students.
            </h1>

            <p className="font-inter text-base sm:text-lg text-[#3B4C63] max-w-xl leading-relaxed font-normal">
              {isVi
                ? "Nền tảng học nhóm & gia sư đồng trang lứa do học sinh khởi xướng. Hoàn toàn miễn phí, nhóm nhỏ thân mật và không áp lực điểm số."
                : "A student-led peer-tutoring and collaborative study platform. Completely free, intimate small pods, and zero grade pressure."}
            </p>

            {/* Action Buttons: Tham gia ngay & Khám phá lớp */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/signin?mode=register"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#0F2747] hover:bg-[#1A3A63] text-white font-bold text-sm sm:text-base transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-sm hover:shadow-md border-2 border-[#0F2747]"
              >
                <span>{isVi ? "Tham gia học ngay" : "Join Now"}</span>
                <ArrowRight className="w-4 h-4 text-[#FFC83D]" />
              </Link>

              <a
                href="#about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-white hover:bg-slate-50 text-[#0F2747] border-2 border-slate-300 hover:border-[#0F2747] font-bold text-sm sm:text-base transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-2xs"
              >
                <span>{isVi ? "Khám phá mô hình" : "Learn More"}</span>
              </a>
            </div>

            {/* Micro Trust Indicators (Strictly NO dots) */}
            <div className="pt-3 border-t border-slate-300/60 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-[#0F2747]/80">
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded-xs bg-emerald-100 text-emerald-900 border border-emerald-300 font-mono text-[10px] font-bold">100%</span>
                <span>{isVi ? "Miễn phí trọn đời" : "Always Free"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded-xs bg-blue-100 text-blue-900 border border-blue-300 font-mono text-[10px] font-bold">P2P</span>
                <span>{isVi ? "Tutor học sinh giỏi" : "Verified Student Tutors"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded-xs bg-amber-100 text-amber-900 border border-amber-300 font-mono text-[10px] font-bold">PODS</span>
                <span>{isVi ? "Phòng 3–8 bạn" : "Cozy Study Pods"}</span>
              </div>
            </div>
          </div>

          {/* Right: The Interactive Animated Doodle Artwork */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <InteractiveDoodleHero />
          </div>
        </div>
      </div>
    </div>
  );
}
