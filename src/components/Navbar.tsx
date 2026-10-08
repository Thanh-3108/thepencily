"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { LogOut } from "lucide-react";
import { usePencily } from "@/context/PencilyContext";

interface NavbarProps {
  onOpenJoinModal?: () => void;
  onOpenStudentHub?: () => void;
}

export function Navbar({ onOpenJoinModal, onOpenStudentHub }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isLoggedIn, logout } = usePencily();

  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "About", href: "/#about" },
  ];

  return (
    <header className="w-full bg-[#FFF9EF] relative z-40">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-5 sm:py-7 flex items-center justify-between">
        {/* Left: Brand Logo + Nav Links beside each other */}
        <div className="flex items-center gap-7 sm:gap-9">
          <Link href="/" className="flex items-center gap-3 group shrink-0" title="The Pencily">
            <Logo variant="nav" size="md" />
          </Link>

          {/* Navigation Links right next to logo */}
          <nav className="hidden md:flex items-center gap-6 sm:gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#0F2747] font-bold underline underline-offset-4 decoration-[#FFC83D] decoration-2"
                      : "text-[#0F2747] hover:text-[#4F7ECB]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: User Profile or Sign In CTA */}
        <div className="flex items-center gap-2.5">
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#0F2747]/15 hover:border-[#0F2747]/30 transition shadow-2xs group"
                title="Đến Dashboard"
              >
                <div className="w-6 h-6 rounded-full overflow-hidden bg-[#5865F2] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                  {user.avatar?.startsWith("http") ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    user.avatar || "P"
                  )}
                </div>
                <span className="text-xs font-bold text-[#0F2747] max-w-[100px] sm:max-w-[140px] truncate group-hover:text-[#4F7ECB]">
                  {user.name}
                </span>
              </Link>

              <button
                onClick={() => logout()}
                title="Đăng xuất"
                className="p-2 text-[#687280] hover:text-red-600 rounded-full hover:bg-black/5 transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/signin"
              className="inline-flex items-center gap-2 px-5 py-2 sm:py-2.5 rounded-full bg-[#0F2747] hover:bg-[#1A3E6D] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all active:scale-95 cursor-pointer"
            >
              <span>Đăng nhập</span>
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-[#0F2747]"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 py-4 bg-[#FFF9EF] border-b border-[#0F2747]/10 flex flex-col gap-3 text-center animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-sm font-medium text-[#0F2747]"
            >
              {link.name}
            </Link>
          ))}
          {!isLoggedIn && (
            <Link
              href="/signin"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-4 mt-1 rounded-full bg-[#0F2747] text-white text-xs font-bold flex items-center justify-center gap-2"
            >
              <span>Đăng nhập</span>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
