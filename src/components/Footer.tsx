import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="w-full bg-[#FFF9EF] border-t border-[#0F2747]/10 py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand Logo & Tagline */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <Link href="/" title="The Pencily">
            <Logo variant="nav" size="sm" />
          </Link>
          <span className="text-xs text-[#6B7280]">
            “Học để hiểu. Chia sẻ để lan tỏa. Cùng nhau, chúng ta lớn lên.”
          </span>
        </div>

        {/* Center: Minimal Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-7 text-xs font-medium text-[#0F2747]">
          <Link href="/dashboard" className="hover:text-[#4F7ECB] transition-colors">
            Dashboard
          </Link>
          <Link href="/#programs" className="hover:text-[#4F7ECB] transition-colors">
            Chương trình
          </Link>
          <Link href="/#how-it-works" className="hover:text-[#4F7ECB] transition-colors">
            Vận hành
          </Link>
          <Link href="/#portfolio" className="hover:text-[#4F7ECB] transition-colors">
            Portfolio Tutor
          </Link>
          <Link href="/#stories" className="hover:text-[#4F7ECB] transition-colors">
            Câu chuyện
          </Link>
          <Link href="/#about" className="hover:text-[#4F7ECB] transition-colors">
            About
          </Link>
        </div>

        {/* Right: Copyright */}
        <div className="text-xs text-[#6B7280] text-center md:text-right">
          © {new Date().getFullYear()} The Pencily Gen 1.0. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
