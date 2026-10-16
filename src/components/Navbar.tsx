"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { usePencily } from "@/context/PencilyContext";
import { Languages } from "lucide-react";

interface NavbarProps {
  onOpenJoinModal?: () => void;
  onOpenStudentHub?: () => void;
  onOpenTutorModal?: () => void;
}

export function Navbar({ onOpenJoinModal, onOpenStudentHub, onOpenTutorModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, isLoggedIn } = usePencily();

  const navLinks = [
    { name: language === "vi" ? "Về Pencily" : "About", href: "/#about" },
    { name: language === "vi" ? "Chương trình" : "Programs", href: "/#programs" },
    { name: language === "vi" ? "Vận hành" : "How it Works", href: "/#how-it-works" },
    { name: language === "vi" ? "Portfolio Tutor" : "Tutor Portfolio", href: "/#portfolio" },
    { name: language === "vi" ? "Lãnh đạo & Chia sẻ" : "Leadership & Stories", href: "/#stories" },
  ];

  return (
    <header className="w-full bg-[#FFF9EF] relative z-40 border-b-2 border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-3.5 sm:py-4 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-8 lg:gap-10">
          <Link href="/" className="flex items-center gap-3 shrink-0" title="The Pencily">
            <Logo variant="nav" size="md" />
          </Link>

          {/* Desktop Navigation Links (Spacious, clean, single line, no wrapping) */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors duration-150 py-1 ${
                    isActive
                      ? "text-[#0F2747] font-bold border-b-2 border-[#0F2747]"
                      : "text-slate-600 hover:text-[#0F2747]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Language Switcher (Synced Picture 2 style) + Sign In */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Switcher Pill (Matching Picture 2 with Languages Icon) */}
          <button
            type="button"
            onClick={() => setLanguage(language === "vi" ? "en" : "vi")}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm bg-white hover:bg-slate-50 text-xs font-bold text-[#0F2747] border-2 border-slate-300 cursor-pointer transition shadow-2xs active:scale-95"
            title="Đổi ngôn ngữ / Change language"
            aria-label="Change language"
          >
            <Languages className="w-3.5 h-3.5 text-[#4F7ECB]" />
            <span>{language === "vi" ? "EN" : "VI"}</span>
          </button>

          {/* If Logged In: Direct Link into Dashboard */}
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-[#0F2747] hover:bg-[#1A3E6D] text-white text-xs sm:text-sm font-bold border-2 border-[#0F2747] transition shadow-xs cursor-pointer active:scale-95 whitespace-nowrap"
            >
              <span>{language === "vi" ? "Dashboard →" : "Dashboard →"}</span>
            </Link>
          ) : (
            /* If Guest / Public Visitor: Clean Sign-In button */
            <Link
              href="/signin"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] border-2 border-slate-300 hover:border-[#0F2747] text-xs sm:text-sm font-bold transition shadow-2xs cursor-pointer active:scale-95 whitespace-nowrap"
            >
              <span>{language === "vi" ? "Đăng nhập" : "Sign in"}</span>
            </Link>
          )}

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
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-sm font-bold border-b border-slate-100 hover:text-[#4F7ECB]"
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
