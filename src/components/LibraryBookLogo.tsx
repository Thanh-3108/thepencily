"use client";

import React from "react";

export interface LibraryBookIconProps extends React.SVGProps<SVGSVGElement> {
  isActive?: boolean;
  size?: number | string;
  className?: string;
}

/** 
 * High-DPI Closed Book Icon (Inactive state - Black/White Monochrome)
 * Designed in the exact same 3/4 perspective, angle, and direction as the open book logo:
 * - Outer cover rim corresponds to the red bottom cover
 * - Inner stacked paper block corresponds to the blue fanning pages
 */
export function LibraryClosedBookIcon({
  className = "",
  size = 24,
  ...props
}: React.SVGProps<SVGSVGElement> & { size?: number | string }) {
  return (
    <svg
      viewBox="0 0 100 80"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {/* Bottom Cover Rim (Viền sách dưới - đồng bộ với viền đỏ khi mở) */}
      <path d="M 8 57 C 22 53 42 54 66 57 C 76 56 82 52 84 46" />

      {/* Book Spine (Gáy sách) */}
      <path d="M 84 46 C 85 41 83 35 78 33" />

      {/* Top Cover Rim (Viền sách trên đóng úp lại) */}
      <path d="M 78 33 C 58 31 36 34 8 43" />

      {/* Left opening edge (Mép mở sách hướng sang trái) */}
      <path d="M 8 43 C 6 47 6 53 8 57" />

      {/* Closed Paper Pages Block (Giấy sách - các lớp trang xếp phẳng khép lại bên trong) */}
      <path d="M 13 46.5 C 31 39.5 49 38.5 72 40" strokeWidth={1.8} opacity={0.8} />
      <path d="M 12 49.5 C 30 43.5 48 43 73 45" strokeWidth={1.8} opacity={0.65} />
      <path d="M 11 53 C 27 48 45 48 74 51" strokeWidth={1.8} opacity={0.75} />
      <path d="M 13 46.5 L 11 53" strokeWidth={1.8} opacity={0.8} />
    </svg>
  );
}

/** 
 * High-DPI Open Book Logo (Active state - Full Color Wings & Gradient Ribbon)
 * Exact vector recreation of the brand library logo:
 * - Red-to-purple bottom ribbon = Book cover rim (Viền sách)
 * - 5 Vibrant blue fan wings = Paper pages fluttering open (Giấy sách)
 */
export function LibraryOpenBookLogo({
  className = "",
  size = 24,
  ...props
}: React.SVGProps<SVGSVGElement> & { size?: number | string }) {
  return (
    <svg
      viewBox="0 0 100 80"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <defs>
        {/* Ribbon Gradient: Red -> Crimson -> Violet -> Deep Purple */}
        <linearGradient id="pencilyRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="22%" stopColor="#DC2626" />
          <stop offset="48%" stopColor="#BE123C" />
          <stop offset="65%" stopColor="#8B5CF6" />
          <stop offset="85%" stopColor="#6D28D9" />
          <stop offset="100%" stopColor="#4C1D95" />
        </linearGradient>

        {/* 5 Blue Fanning Pages Gradients */}
        <linearGradient id="pencilyPetalG1" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#0369A1" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>

        <linearGradient id="pencilyPetalG2" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0EA5E9" />
        </linearGradient>

        <linearGradient id="pencilyPetalG3" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>

        <linearGradient id="pencilyPetalG4" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#0369A1" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>

        <linearGradient id="pencilyPetalG5" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#00BAFF" />
        </linearGradient>
      </defs>

      {/* Petal 1 (Lowest horizontal page) */}
      <path
        d="M 40 49.5 C 28 48.5 16 47 4 44 C 11 41 23 41.5 38 45.5 Z"
        fill="url(#pencilyPetalG1)"
      />

      {/* Petal 2 (~35 deg page) */}
      <path
        d="M 41.5 48.5 C 31 43.5 21 35.5 12 28.5 C 18 26.5 28.5 31.5 39 43.5 Z"
        fill="url(#pencilyPetalG2)"
      />

      {/* Petal 3 (~55 deg page) */}
      <path
        d="M 42.5 47.5 C 34.5 37.5 27 25.5 21 16.5 C 27 15.5 35 23.5 41 40 Z"
        fill="url(#pencilyPetalG3)"
      />

      {/* Petal 4 (~75 deg tallest page) */}
      <path
        d="M 43.5 46.5 C 39.5 32 36 17 36 5.5 C 41 7.5 45.5 18 44 39 Z"
        fill="url(#pencilyPetalG4)"
      />

      {/* Petal 5 (Rightmost forward curving wing page) */}
      <path
        d="M 44.5 46.5 C 45.5 34.5 48.5 19.5 54.5 10.5 C 55 17.5 51.5 29.5 46 41.5 Z"
        fill="url(#pencilyPetalG5)"
      />

      {/* Bottom Cover Rim (Viền sách dưới) */}
      <path
        d="M 2 53.5 C 14 50.5 28 51.5 40 55.5 C 46 53.5 51 52.5 55 56.5 C 62 54.5 72 54.5 93 55.5 C 80 57.5 68 58.5 56 60.5 C 51 57.5 45 57.5 39 60.5 C 26 57.5 13 57.5 2 60.5 Z"
        fill="url(#pencilyRibbon)"
      />
    </svg>
  );
}

/** 
 * Animated Book Icon:
 * - Inactive: Closed Monochrome Book with identical 3/4 perspective & direction
 * - Active: Smoothly blossoms open into the full color open book logo
 */
export function LibraryAnimatedBookIcon({
  isActive = false,
  className = "",
  size = 24,
}: LibraryBookIconProps) {
  return (
    <div
      className={`relative w-6 h-6 flex items-center justify-center shrink-0 ${className}`}
      aria-label="Thư viện"
    >
      {/* 1. Closed Book Layer (Visible when NOT active) */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out transform-gpu ${
          isActive
            ? "opacity-0 scale-75 -translate-y-1 pointer-events-none"
            : "opacity-100 scale-100 translate-y-0 text-current"
        }`}
      >
        <LibraryClosedBookIcon size={size} />
      </div>

      {/* 2. Open Colorful Book Logo Layer (Visible when active with blossom effect) */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-350 ease-out transform-gpu ${
          isActive
            ? "opacity-100 scale-110 translate-y-0"
            : "opacity-0 scale-60 translate-y-1 pointer-events-none"
        }`}
      >
        <LibraryOpenBookLogo size={size} />
      </div>
    </div>
  );
}
