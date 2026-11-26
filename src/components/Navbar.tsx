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
    { name: isVi ? "Hành trình nền tảng" : "Platform Journey", href: "/#journey" },
    { name: isVi ? "Lãnh đạo & Chia sẻ" : "Leadership & Stories", href: "/#stories" },
    { name: isVi ? "Lớp học & Thư viện" : "Classrooms & Library", href: "/dashboard?tab=classes" },
    { name: isVi ? "Hệ sinh thái Dashboard" : "Dashboard Hub", href: "/dashboard" },
  ];

  return (
    <header className="w-full bg-[#FAF7EE]/85 backdrop-blur-md relative z-40 border-b border-[#0F2747]/8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-3.5 sm:py-4 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-7 lg:gap-10">
          <Link href="/" className="flex items-center gap-3 shrink-0 transition-transform hover:scale-[1.02]" title="The Pencily">
            <Logo variant="nav" size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-3">
            {mainLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-150 px-3.5 py-2 rounded-full ${
                    isActive
                      ? "text-[#0F2747] font-semibold bg-[#FFC83D]/25"
                      : "text-[#0F2747]/80 hover:text-[#0F2747] hover:bg-white/80"
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
                className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#0F2747]/80 hover:text-[#0F2747] hover:bg-white/80 px-3.5 py-2 rounded-full transition-all cursor-pointer"
              >
                <span>{isVi ? "Khám phá" : "Explore"}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${exploreOpen ? "rotate-180" : ""}`} />
              </button>

              {exploreOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-[#FFFDF9] border border-[#E5DEC9] rounded-2xl shadow-pencily-soft py-2 z-50 animate-fade-quick">
                  {exploreLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setExploreOpen(false)}
                      className="block px-4 py-2.5 text-xs sm:text-sm font-medium text-[#0F2747]/85 hover:text-[#0F2747] hover:bg-[#FFF6DC]/70 transition-colors"
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
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Language Switcher Pill */}
          <button
            type="button"
            onClick={() => setLanguage(isVi ? "en" : "vi")}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/95 hover:bg-white text-xs font-semibold text-[#0F2747] border border-[#0F2747]/12 hover:border-[#4F7ECB]/40 cursor-pointer transition shadow-2xs active:scale-95"
            title="Đổi ngôn ngữ / Change language"
            aria-label="Change language"
          >
            <Languages className="w-3.5 h-3.5 text-[#4F7ECB]" />
            <span>{isVi ? "EN" : "VI"}</span>
          </button>

          {/* Direct Link into Dashboard */}
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0F2747] hover:bg-[#193B6B] text-white text-xs sm:text-sm font-semibold transition-all shadow-tactile-navy cursor-pointer whitespace-nowrap"
          >
            <span>Dashboard</span>
            <span className="text-[#FFC83D]">→</span>
          </Link>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border border-[#0F2747]/12 text-[#0F2747] bg-white/90 hover:bg-white cursor-pointer transition"
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 py-5 bg-[#FFFDF9] border-t border-[#E5DEC9] flex flex-col gap-2 text-[#0F2747] animate-fade-quick shadow-lg">
          {[...mainLinks, ...exploreLinks].map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl text-sm font-medium hover:bg-[#FFF6DC]/60 hover:text-[#0F2747] transition-colors"
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-3 mt-1 border-t border-[#E5DEC9] flex flex-col gap-2.5">
            {!isLoggedIn ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenTutorModal) onOpenTutorModal();
                    else window.location.href = "/dashboard?tab=become-tutor";
                  }}
                  className="w-full py-2.5 rounded-full bg-[#FFC83D] hover:bg-[#f2bb2e] text-[#0F2747] font-bold text-xs text-center shadow-xs transition cursor-pointer"
                >
                  {language === "vi" ? "Ứng tuyển Peer Tutor" : "Apply as Peer Tutor"}
                </button>
                <div className="grid grid-cols-2 gap-2.5">
                  <Link
                    href="/signin?mode=signin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 rounded-full bg-white hover:bg-slate-50 text-[#0F2747] font-semibold text-xs text-center border border-[#0F2747]/15"
                  >
                    {language === "vi" ? "Đăng nhập" : "Sign in"}
                  </Link>
                  <Link
                    href="/signin?mode=register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 rounded-full bg-[#0F2747] hover:bg-[#193B6B] text-white font-semibold text-xs text-center"
                  >
                    {language === "vi" ? "Tạo tài khoản" : "Register"}
                  </Link>
                </div>
              </>
            ) : (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-full bg-[#0F2747] text-white font-semibold text-xs text-center"
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
