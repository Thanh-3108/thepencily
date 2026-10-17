"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { usePencily } from "@/context/PencilyContext";

export function Footer() {
  const { language } = usePencily();
  const isVi = language === "vi";

  return (
    <footer className="w-full bg-[#FFF9EF] border-t-2 border-[#0F2747]/15 pt-10 pb-20 sm:pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pr-24 sm:pr-28">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-200/80">
          {/* Left: Brand Logo & Tagline */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 text-center sm:text-left">
            <Link href="/" title="The Pencily" className="shrink-0">
              <Logo variant="nav" size="sm" />
            </Link>
            <span className="text-xs text-[#6B7280] font-medium">
              {isVi
                ? "“Học để hiểu. Chia sẻ để lan tỏa. Cùng nhau, chúng ta lớn lên.”"
                : "“Learn to understand. Share to empower. Together, we grow.”"}
            </span>
          </div>

          {/* Links: Clean squarish row */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-bold text-[#0F2747]">
            <Link href="/dashboard" className="px-2 py-1 rounded-sm hover:bg-[#0F2747]/5 transition-colors">
              Dashboard
            </Link>
            <Link href="/#about" className="px-2 py-1 rounded-sm hover:bg-[#0F2747]/5 transition-colors">
              {isVi ? "Về Pencily" : "About"}
            </Link>
            <Link href="/#programs" className="px-2 py-1 rounded-sm hover:bg-[#0F2747]/5 transition-colors">
              {isVi ? "Chương trình" : "Programs"}
            </Link>
            <Link href="/#how-it-works" className="px-2 py-1 rounded-sm hover:bg-[#0F2747]/5 transition-colors">
              {isVi ? "Vận hành" : "How it Works"}
            </Link>
            <Link href="/#portfolio" className="px-2 py-1 rounded-sm hover:bg-[#0F2747]/5 transition-colors">
              {isVi ? "Tutors" : "Tutors"}
            </Link>
            <Link href="/#stories" className="px-2 py-1 rounded-sm hover:bg-[#0F2747]/5 transition-colors">
              Board of Directors
            </Link>
            <Link href="/dashboard?tab=shop" className="px-2 py-1 rounded-sm hover:bg-[#0F2747]/5 transition-colors text-amber-900 font-black">
              {isVi ? "Cửa Hàng PP" : "PP Shop"}
            </Link>
          </div>
        </div>

        {/* Bottom Sub-row: Safe from floating bubble */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B7280]">
          <p className="font-medium text-center sm:text-left">
            © {new Date().getFullYear()} The Pencily. All rights reserved.
          </p>
          <p className="text-[11px] text-slate-500 font-medium">
            {isVi ? "Nền tảng học tập đồng đẳng phi lợi nhuận" : "Student-led non-profit peer-learning platform"}
          </p>
        </div>
      </div>
    </footer>
  );
}
