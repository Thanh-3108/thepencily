"use client";

import React from "react";
import Link from "next/link";
import { InteractiveDoodleHero } from "./InteractiveDoodleHero";
import { ArrowRight } from "lucide-react";

export function Hero({ onExploreClick }: { onExploreClick?: () => void }) {
  return (
    <div className="relative w-full overflow-hidden flex flex-col justify-center py-2 sm:py-4">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full">
        {/* Main 2-Column Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Punchy, Minimal Text */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5 text-left z-10">

            <h1 className="font-poppins font-black text-4xl sm:text-5xl lg:text-[62px] text-[#0F2747] tracking-tight leading-[1.08]">
              The Pencily.
              <br />
              <span className="text-[#4F7ECB]">Built by Students,</span>
              <br />
              For Students.
            </h1>

            <p className="font-inter text-base sm:text-lg text-[#3B4C63] max-w-2xl leading-relaxed">
              Mang đến cho học sinh Việt Nam những buổi học cố vấn miễn phí và là không gian phát triển bản thân dành cho mọi người.
            </p>

            {/* Action Buttons: Simply Dashboard & About */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-[#0F2747] border border-slate-300 hover:border-slate-400 font-semibold text-sm sm:text-base transition-all active:scale-98 cursor-pointer shadow-2xs"
              >
                <span>Dashboard</span>
                <ArrowRight className="w-4 h-4 text-[#4F7ECB]" />
              </Link>

              <a
                href="#about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-[#0F2747] border border-slate-300 hover:border-slate-400 font-semibold text-sm sm:text-base transition-all active:scale-98 cursor-pointer shadow-2xs"
              >
                <span>About</span>
              </a>
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
