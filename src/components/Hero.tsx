"use client";

import React from "react";
import Link from "next/link";
import { InteractiveDoodleHero } from "./InteractiveDoodleHero";
import { ArrowRight } from "lucide-react";

import { usePencily } from "@/context/PencilyContext";

export function Hero({ onExploreClick }: { onExploreClick?: () => void }) {
  const { language } = usePencily();

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
              {language === "vi"
                ? "Mang đến cho học sinh Việt Nam những buổi học kèm peer-tutoring miễn phí và là không gian phát triển bản thân dành cho mọi người."
                : "Empowering Vietnamese students with free peer-tutoring sessions and an inclusive space for personal growth."}
            </p>

            {/* Action Buttons: Tham gia ngay & Tìm hiểu thêm */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <Link
                href="/signin?mode=register"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#0F2747] hover:bg-[#1A3A63] text-white font-medium text-sm sm:text-base transition-all active:scale-98 cursor-pointer shadow-xs"
              >
                <span>{language === "vi" ? "Tham gia ngay →" : "Join Now →"}</span>
              </Link>

              <a
                href="#about"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] border border-slate-300 hover:border-[#0F2747] font-medium text-sm sm:text-base transition-all active:scale-98 cursor-pointer shadow-2xs"
              >
                <span>{language === "vi" ? "Tìm hiểu thêm" : "Learn More"}</span>
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
