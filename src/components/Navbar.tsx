"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { usePencily } from "@/context/PencilyContext";
import { Languages, ChevronDown } from "lucide-react";

interface NavbarProps {
  onOpenJoinModal?: () => void;
  onOpenStudentHub?: () => void;
  onOpenTutorModal?: () => void;
}

export function Navbar({ onOpenJoinModal, onOpenStudentHub, onOpenTutorModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, isLoggedIn } = usePencily();
  const isVi = language === "vi";

  const mainLinks = [
    { name: isVi ? "Về Pencily" : "About Pencily", href: "/#about" },
    { name: isVi ? "Chương trình" : "Programs", href: "/#programs" },
    { name: isVi ? "Portfolio Tutor" : "Tutor Portfolio", href: "/#portfolio" },
  ];

  const exploreLinks = [
    { name: isVi ? "Vận hành" : "How it Works", href: "/#how-it-works" },
    { name: isVi ? "Lãnh đạo & Chia sẻ" : "Leadership & Stories", href: "/#stories" },
    { name: isVi ? "Lớp học & Thư viện" : "Classrooms & Library", href: "/classes" },
    { name: isVi ? "Cộng đồng học sinh" : "Student Community", href: "/community" },
  ];

  return (
    <header className="w-full bg-[#FAF7EE] relative z-40 border-b border-[#0F2747]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-3 sm:py-4 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-7 lg:gap-10">
          <Link href="/" className="flex items-center gap-3 shrink-0" title="The Pencily">
            <Logo variant="nav" size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7">
            {mainLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs sm:text-sm font-medium whitespace-nowrap transition-colors duration-150 py-1 ${
                    isActive
                      ? "text-[#0F2747] font-semibold"
                      : "text-[#0F2747]/80 hover:text-[#0F2747]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Dropdown: Khám phá ⌵ */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setExploreOpen(!exploreOpen)}
                onBlur={() => setTimeout(() => setExploreOpen(false), 200)}
                className="flex items-center gap-1 text-xs sm:text-sm font-medium text-[#0F2747]/80 hover:text-[#0F2747] transition-colors py-1 cursor-pointer"
              >
                <span>{isVi ? "Khám phá" : "Explore"}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${exploreOpen ? "rotate-180" : ""}`} />
              </button>

              {exploreOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg py-1.5 z-50 animate-fadeIn">
                  {exploreLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setExploreOpen(false)}
                      className="block px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:text-[#0F2747] hover:bg-[#FAF7EE] transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Right: Language Switcher & Dashboard */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Switcher Card Button */}
          <button
            type="button"
            onClick={() => setLanguage(isVi ? "en" : "vi")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-slate-50 text-xs font-semibold text-[#0F2747] border border-slate-200/90 cursor-pointer transition shadow-2xs active:scale-95"
            title="Đổi ngôn ngữ / Change language"
            aria-label="Change language"
          >
            <Languages className="w-3.5 h-3.5 text-[#4F7ECB]" />
            <span>{isVi ? "EN" : "VI"}</span>
          </button>

          {/* Direct Link into Dashboard */}
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#0F2747] hover:bg-[#1A3A63] text-white text-xs sm:text-sm font-semibold transition shadow-xs cursor-pointer active:scale-95 whitespace-nowrap"
          >
            <span>Dashboard →</span>
          </Link>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-sm border-2 border-slate-300 text-[#0F2747] bg-white cursor-pointer"
            aria-label="Toggle menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Clean, straightforward link list) */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 py-4 bg-[#FFFDF9] border-t-2 border-slate-200 flex flex-col gap-2.5 text-[#0F2747] animate-fadeIn">
          {[...mainLinks, ...exploreLinks].map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-sm font-semibold border-b border-slate-100 hover:text-[#4F7ECB]"
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-2 flex flex-col gap-2">
            {!isLoggedIn ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenTutorModal) onOpenTutorModal();
                    else window.location.href = "/dashboard?tab=become-tutor";
                  }}
                  className="w-full py-2.5 rounded-sm bg-[#FFC83D] text-[#0F2747] border-2 border-[#0F2747] font-bold text-xs text-center"
                >
                  {language === "vi" ? "Ứng tuyển Peer Tutor" : "Apply as Peer Tutor"}
                </button>
                <Link
                  href="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-sm bg-[#0F2747] text-white font-bold text-xs text-center border-2 border-[#0F2747]"
                >
                  {language === "vi" ? "Đăng nhập / Sign in" : "Sign in"}
                </Link>
              </>
            ) : (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-sm bg-[#0F2747] text-white font-bold text-xs text-center border-2 border-[#0F2747]"
              >
                {language === "vi" ? "Vào Dashboard Học Tập →" : "Go to Student Dashboard →"}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
