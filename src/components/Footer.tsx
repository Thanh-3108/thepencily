"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { usePencily } from "@/context/PencilyContext";
import { FacebookLogo } from "@/components/BrandIcons";
import { ExternalLink, Heart, ShieldCheck, Mail } from "lucide-react";

export function Footer() {
  const { language } = usePencily();
  const isVi = language === "vi";

  return (
    <footer className="w-full bg-[#FFF9EF] border-t border-[#E6DEC8] pt-14 pb-24 sm:pb-16 text-[#0F2747]">
      <div className="max-w-7xl mx-auto pl-6 sm:pl-10 lg:pl-12 pr-24 sm:pr-28 lg:pr-32">
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-10 border-b border-[#E6DEC8]/80">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" title="The Pencily" className="inline-block">
              <Logo variant="nav" size="md" />
            </Link>

            <p className="font-serif italic text-sm sm:text-base text-[#0F2747]/85 leading-relaxed max-w-sm">
              {isVi
                ? "“Học để hiểu. Chia sẻ để lan tỏa. Cùng nhau, chúng ta lớn lên.”"
                : "“Learn to understand. Share to empower. Together, we grow.”"}
            </p>

            <p className="text-xs sm:text-sm text-[#526277] leading-relaxed max-w-md">
              {isVi
                ? "Dự án học tập đồng đẳng phi lợi nhuận do học sinh Phổ Thông Năng Khiếu (ĐHQG-HCM) sáng lập, lan tỏa cơ hội học tập chất lượng đến mọi bạn học sinh."
                : "A student-founded non-profit peer-learning initiative from High School for the Gifted (VNU-HCM), sharing accessible academic support with students everywhere."}
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.facebook.com/UncleRoThanh/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#1877F2] hover:bg-[#0c63d4] text-white flex items-center justify-center transition shadow-xs hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                title="Facebook"
              >
                <FacebookLogo className="w-4 h-4 text-white" />
              </a>

              <a
                href="mailto:thepencily@gmail.com"
                className="w-9 h-9 rounded-full bg-[#0F2747] hover:bg-[#193B6B] text-white flex items-center justify-center transition shadow-xs hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                title="Email"
              >
                <Mail className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Col 3: Khám Phá */}
          <div className="space-y-3">
            <h4 className="font-poppins font-bold text-xs sm:text-sm text-[#3B6FD8]">
              {isVi ? "Khám phá" : "Explore"}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#0F2747]/85">
              <li>
                <Link href="/dashboard?tab=classes" className="hover:text-[#3B6FD8] transition-colors">
                  {isVi ? "Lớp học trực tuyến" : "Live Study Rooms"}
                </Link>
              </li>
              <li>
                <Link href="/dashboard?tab=videos" className="hover:text-[#3B6FD8] transition-colors">
                  {isVi ? "Thư viện video" : "Video Library"}
                </Link>
              </li>
              <li>
                <Link href="/dashboard?tab=resources" className="hover:text-[#3B6FD8] transition-colors">
                  {isVi ? "Kho tài liệu" : "Resource Library"}
                </Link>
              </li>
              <li>
                <Link href="/dashboard?tab=shop" className="hover:text-amber-700 transition-colors font-semibold text-amber-800">
                  {isVi ? "Cửa hàng điểm PP" : "PP Rewards Shop"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Đồng Hành */}
          <div className="space-y-3">
            <h4 className="font-poppins font-bold text-xs sm:text-sm text-[#3B6FD8]">
              {isVi ? "Đồng hành" : "Peer Tutors"}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#0F2747]/85">
              <li>
                <Link href="/dashboard?tab=become-tutor" className="hover:text-[#3B6FD8] transition-colors">
                  {isVi ? "Ứng tuyển Peer Tutor" : "Apply as Peer Tutor"}
                </Link>
              </li>
              <li>
                <Link href="/#portfolio" className="hover:text-[#3B6FD8] transition-colors">
                  {isVi ? "Hồ sơ ngoại khóa" : "Extracurricular Portfolio"}
                </Link>
              </li>
              <li>
                <Link href="/#programs" className="hover:text-[#3B6FD8] transition-colors">
                  {isVi ? "Chương trình IELTS & SAT" : "IELTS & SAT Programs"}
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-[#3B6FD8] transition-colors">
                  {isVi ? "Cam kết an toàn" : "Safety Guidelines"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Về Dự Án */}
          <div className="space-y-3">
            <h4 className="font-poppins font-bold text-xs sm:text-sm text-[#3B6FD8]">
              {isVi ? "Dự án" : "Organization"}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#0F2747]/85">
              <li>
                <Link href="/#about" className="hover:text-[#3B6FD8] transition-colors">
                  {isVi ? "Về The Pencily" : "About Us"}
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-[#3B6FD8] transition-colors">
                  {isVi ? "Cách hoạt động" : "How It Works"}
                </Link>
              </li>
              <li>
                <Link href="/#stories" className="hover:text-[#3B6FD8] transition-colors">
                  {isVi ? "Đội ngũ sáng lập" : "Founding Team"}
                </Link>
              </li>
              <li>
                <Link href="/dashboard?tab=academic" className="hover:text-[#3B6FD8] transition-colors">
                  {isVi ? "Khu vực Academic" : "Academic Workspace"}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7A90]">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 font-medium">
            <span>© {new Date().getFullYear()} The Pencily</span>
            <span className="text-[#0F2747] font-semibold">
              {isVi ? "100% Phi lợi nhuận — Do học sinh khởi xướng" : "100% Non-Profit — Student-Led"}
            </span>
          </div>

          <div className="text-xs text-[#6B7A90]">
            Phổ Thông Năng Khiếu, ĐHQG-HCM
          </div>
        </div>
      </div>
    </footer>
  );
}
