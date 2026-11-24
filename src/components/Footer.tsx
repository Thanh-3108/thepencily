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
    <footer className="w-full bg-[#FFF9EF] border-t-2 border-[#0F2747]/15 pt-12 pb-24 sm:pb-16 text-[#0F2747]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pr-24 sm:pr-28">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-10 border-b border-slate-300/70">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" title="The Pencily" className="inline-block">
              <Logo variant="nav" size="md" />
            </Link>

            <p className="font-serif italic text-sm text-[#0F2747]/80 leading-relaxed max-w-sm font-medium">
              {isVi
                ? "“Học để hiểu. Chia sẻ để lan tỏa. Cùng nhau, chúng ta lớn lên.”"
                : "“Learn to understand. Share to empower. Together, we grow.”"}
            </p>

            <p className="text-xs text-[#475569] leading-relaxed max-w-md">
              {isVi
                ? "Dự án học tập đồng đẳng phi lợi nhuận do học sinh sáng lập từ Phổ Thông Năng Khiếu (ĐHQG-HCM), hướng tới mục tiêu bình đẳng cơ hội học tập chất lượng cao cho học sinh cả nước."
                : "A student-founded non-profit peer-learning initiative originating from High School for the Gifted (VNU-HCM), democratizing high-quality academic support for all students."}
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.facebook.com/UncleRoThanh/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xs bg-[#1877F2] hover:bg-[#0c63d4] text-white flex items-center justify-center transition shadow-2xs active:scale-95 cursor-pointer"
                title="Facebook"
              >
                <FacebookLogo className="w-4 h-4 text-white" />
              </a>

              <a
                href="mailto:thepencily@gmail.com"
                className="w-8 h-8 rounded-xs bg-[#0F2747] hover:bg-slate-800 text-white flex items-center justify-center transition shadow-2xs active:scale-95 cursor-pointer"
                title="Email"
              >
                <Mail className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Col 3: Khám Phá */}
          <div className="space-y-3">
            <h4 className="font-poppins font-black text-xs uppercase tracking-wider text-[#4F7ECB]">
              {isVi ? "Khám Phá" : "Explore"}
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-[#0F2747]/85">
              <li>
                <Link href="/dashboard?tab=classes" className="hover:text-[#4F7ECB] transition-colors">
                  {isVi ? "Lớp Học Trực Tuyến" : "Live Study Rooms"}
                </Link>
              </li>
              <li>
                <Link href="/dashboard?tab=videos" className="hover:text-[#4F7ECB] transition-colors">
                  {isVi ? "Thư Viện Video H5P" : "H5P Interactive Video"}
                </Link>
              </li>
              <li>
                <Link href="/dashboard?tab=resources" className="hover:text-[#4F7ECB] transition-colors">
                  {isVi ? "Kho Tài Liệu Lớp 12" : "Resource Library"}
                </Link>
              </li>
              <li>
                <Link href="/dashboard?tab=shop" className="hover:text-amber-800 transition-colors font-bold text-amber-900">
                  {isVi ? "Cửa Hàng Đổi Điểm PP" : "PP Rewards Shop"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Đồng Hành */}
          <div className="space-y-3">
            <h4 className="font-poppins font-black text-xs uppercase tracking-wider text-[#4F7ECB]">
              {isVi ? "Đồng Hành" : "Peer Tutors"}
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-[#0F2747]/85">
              <li>
                <Link href="/dashboard?tab=become-tutor" className="hover:text-[#4F7ECB] transition-colors">
                  {isVi ? "Ứng Tuyển Peer Tutor" : "Apply as Peer Tutor"}
                </Link>
              </li>
              <li>
                <Link href="/#portfolio" className="hover:text-[#4F7ECB] transition-colors">
                  {isVi ? "Hồ Sơ Hoạt Động Ngoại Khóa" : "Extracurricular Portfolio"}
                </Link>
              </li>
              <li>
                <Link href="/#programs" className="hover:text-[#4F7ECB] transition-colors">
                  {isVi ? "Chương Trình IELTS & SAT" : "IELTS & SAT Programs"}
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-[#4F7ECB] transition-colors">
                  {isVi ? "Red Line Policy (An Toàn)" : "Red Line Policy"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Về Dự Án */}
          <div className="space-y-3">
            <h4 className="font-poppins font-black text-xs uppercase tracking-wider text-[#4F7ECB]">
              {isVi ? "Dự Án" : "Organization"}
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-[#0F2747]/85">
              <li>
                <Link href="/#about" className="hover:text-[#4F7ECB] transition-colors">
                  {isVi ? "Về The Pencily" : "About Us"}
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-[#4F7ECB] transition-colors">
                  {isVi ? "Quy Trình Hoạt Động" : "How It Works"}
                </Link>
              </li>
              <li>
                <Link href="/#stories" className="hover:text-[#4F7ECB] transition-colors">
                  {isVi ? "Ban Sáng Lập & BOD" : "Board of Directors"}
                </Link>
              </li>
              <li>
                <Link href="/dashboard?tab=academic" className="hover:text-[#4F7ECB] transition-colors">
                  {isVi ? "Khu Vực Academic" : "Academic Workspace"}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 font-medium">
            <span>© {new Date().getFullYear()} The Pencily. Tất cả quyền được bảo lưu.</span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="text-[#0F2747] font-semibold">100% Phi Lợi Nhuận • Do Học Sinh Khởi Xướng</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span>Phổ Thông Năng Khiếu, ĐHQG-HCM</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
