"use client";

import React from "react";
import Link from "next/link";
import { InteractiveDoodleHero } from "./InteractiveDoodleHero";
import { ArrowRight, Sparkles, BookOpen, Users, ShieldCheck, Heart } from "lucide-react";
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
            <h1 className="font-poppins font-black text-4xl sm:text-5xl lg:text-[62px] text-[#0F2747] tracking-tight leading-[1.08]">
              The Pencily.
              <br />
              <span className="relative inline-block text-[#0F2747] whitespace-nowrap">
                {isVi ? "Do Học Sinh," : "Built by Students,"}
                <span className="absolute bottom-1 left-0 right-0 h-3.5 sm:h-4 bg-[#FFC83D]/45 -z-10 -rotate-[0.8deg] rounded-xs pointer-events-none" />
              </span>
              <br />
              <span className="text-[#4F7ECB] whitespace-nowrap">
                {isVi ? "Vì Học Sinh." : "For Students."}
              </span>
            </h1>

            <p className="font-inter text-base sm:text-lg text-[#3B4C63] max-w-xl leading-relaxed font-normal">
              {isVi
                ? "Nền tảng học nhóm & gia sư đồng đẳng phi thương mại. Mỗi buổi học 60 phút cô đọng, quy mô nhỏ 3–8 bạn thân mật, giải đáp cởi mở và hoàn toàn miễn phí."
                : "A non-profit peer-tutoring ecosystem. Intimate 60-minute study pods of 3–8 students, open discussions, and zero grade pressure."}
            </p>

            {/* Action Buttons: Tham gia ngay & Khám phá lớp */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/signin?mode=register"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-md bg-[#0F2747] hover:bg-[#1A3A63] text-white font-bold text-sm sm:text-base border-2 border-[#0F2747] shadow-tactile-navy transition-all cursor-pointer"
              >
                <span>{isVi ? "Tham gia học ngay" : "Join Now"}</span>
                <ArrowRight className="w-4 h-4 text-[#FFC83D]" />
              </Link>

              <a
                href="#about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-white hover:bg-slate-50 text-[#0F2747] border-2 border-slate-300 hover:border-[#0F2747] font-bold text-sm sm:text-base shadow-tactile-slate transition-all cursor-pointer"
              >
                <span>{isVi ? "Khám phá mô hình" : "Learn More"}</span>
              </a>
            </div>

            {/* Micro Trust Indicators (Strictly NO dots - square/rounded-xs badges only) */}
            <div className="pt-4 border-t-2 border-slate-200/80 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-xs font-semibold text-[#0F2747]">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-xs bg-emerald-100 text-emerald-900 border border-emerald-300 font-mono text-[10px] font-bold">
                  100% FREE
                </span>
                <span className="text-slate-600 font-medium">
                  {isVi ? "Không thu học phí trọn đời" : "Always 100% Free"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-xs bg-blue-100 text-blue-900 border border-blue-300 font-mono text-[10px] font-bold">
                  P2P TUTORS
                </span>
                <span className="text-slate-600 font-medium">
                  {isVi ? "Học sinh trường chuyên & thủ khoa" : "Gifted Peer Mentors"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-xs bg-amber-100 text-amber-900 border border-amber-300 font-mono text-[10px] font-bold">
                  PODS 3–8
                </span>
                <span className="text-slate-600 font-medium">
                  {isVi ? "Nhóm nhỏ không áp lực" : "Small Cozy Groups"}
                </span>
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
