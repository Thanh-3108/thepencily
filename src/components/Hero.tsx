"use client";

import React from "react";
import Link from "next/link";
import { InteractiveDoodleHero } from "./InteractiveDoodleHero";
import { ArrowRight, Users, HeartHandshake, GraduationCap } from "lucide-react";
import { usePencily } from "@/context/PencilyContext";

export function Hero({ onExploreClick }: { onExploreClick?: () => void }) {
  const { language } = usePencily();
  const isVi = language === "vi";

  return (
    <div className="relative w-full overflow-hidden flex flex-col justify-center py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full">
        {/* Main 2-Column Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Warm, Inviting Typography & Story */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-left z-10">
            <h1 className="font-poppins font-bold text-4xl sm:text-5xl lg:text-[60px] text-[#0F2747] tracking-tight leading-[1.12]">
              The Pencily.
              <br />
              <span className="relative inline-block text-[#0F2747] whitespace-nowrap">
                {isVi ? "Do Học Sinh," : "Built by Students,"}
                {/* Hand-drawn warm highlighter sweep SVG */}
                <svg
                  viewBox="0 0 280 18"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="absolute -bottom-0.5 left-0 w-full h-4 -z-10 pointer-events-none"
                >
                  <path
                    d="M 3 12 Q 70 6, 145 11 T 277 9"
                    fill="none"
                    stroke="#FFC83D"
                    strokeOpacity="0.58"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <br />
              <span className="text-[#4F7ECB] whitespace-nowrap">
                {isVi ? "Vì Học Sinh." : "For Students."}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#384A61] max-w-xl leading-relaxed font-normal">
              {isVi
                ? "Không gian học nhóm & kèm cặp đồng đẳng phi lợi nhuận. Mỗi buổi học 60 phút thân mật từ 3–8 bạn, thoải mái hỏi bài khó và cùng nhau tiến bộ mỗi ngày."
                : "A joyful non-profit peer-tutoring space. Intimate 60-minute study pods of 3–8 peers where asking questions feels safe, natural, and completely free."}
            </p>

            {/* Playful Pill Action Buttons */}
            <div className="pt-1 flex flex-wrap items-center gap-3.5">
              <Link
                href="/signin?mode=register"
                className="group inline-flex items-center gap-3 pl-7 pr-5 py-3.5 rounded-full bg-[#0F2747] hover:bg-[#193B6B] text-white font-semibold text-sm sm:text-base shadow-tactile-navy transition-all cursor-pointer"
              >
                <span>{isVi ? "Tham gia học ngay" : "Join for Free"}</span>
                <span className="w-7 h-7 rounded-full bg-[#FFC83D] text-[#0F2747] flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>

              <a
                href="#about"
                onClick={() => onExploreClick && undefined}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/95 hover:bg-white text-[#0F2747] border border-[#E5DEC9] hover:border-[#4F7ECB]/40 font-semibold text-sm sm:text-base shadow-tactile-slate transition-all cursor-pointer"
              >
                <span>{isVi ? "Khám phá mô hình" : "How It Works"}</span>
              </a>
            </div>

            {/* Warm, Airy Friendliness Strip (NO boxed monospace micro-tags, NO dots) */}
            <div className="pt-5 border-t border-[#0F2747]/10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs sm:text-sm text-[#384A61]">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-4 h-4" />
                </span>
                <span className="font-medium text-[#0F2747]">
                  {isVi ? "Miễn phí 100%" : "Always 100% Free"}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-sky-100/80 text-[#4F7ECB] flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </span>
                <span className="font-medium text-[#0F2747]">
                  {isVi ? "Peer Tutors tận tâm" : "Friendly Peer Tutors"}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-100/80 text-amber-700 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </span>
                <span className="font-medium text-[#0F2747]">
                  {isVi ? "Nhóm nhỏ 3–8 bạn" : "Cozy Pods of 3–8"}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Interactive Animated Doodle Desk Stage */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <InteractiveDoodleHero />
          </div>
        </div>
      </div>
    </div>
  );
}
