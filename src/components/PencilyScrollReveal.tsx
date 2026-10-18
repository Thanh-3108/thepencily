"use client";

import React, { useRef, useEffect, useState } from "react";

export type PencilyAnimationType =
  | "bounce-up"
  | "tilt-left"
  | "tilt-right"
  | "stamp"
  | "slide-right"
  | "slide-left"
  | "float";

interface PencilyScrollRevealProps {
  children: React.ReactNode;
  animation?: PencilyAnimationType;
  delay?: number;
  duration?: number;
  rotate?: string;
  threshold?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function PencilyScrollReveal({
  children,
  animation = "bounce-up",
  delay = 0,
  duration = 550,
  rotate,
  threshold = 0.12,
  className = "",
  style = {},
}: PencilyScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // If user prefers reduced motion, show immediately
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const el = ref.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [threshold]);

  // Determine animation style
  const getAnimationName = () => {
    switch (animation) {
      case "tilt-left":
        return "pencilyTiltLeft";
      case "tilt-right":
        return "pencilyTiltRight";
      case "stamp":
        return "pencilyStamp";
      case "slide-right":
        return "pencilySlideRight";
      case "slide-left":
        return "pencilySlideLeft";
      case "float":
        return "pencilyBounceUp";
      case "bounce-up":
      default:
        return "pencilyBounceUp";
    }
  };

  const animStyle: React.CSSProperties = isVisible
    ? {
        ...style,
        animationName: getAnimationName(),
        animationDuration: `${duration}ms`,
        animationDelay: `${delay}ms`,
        animationTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        animationFillMode: "both",
        // Pass custom target rotation via CSS custom property
        ...(rotate ? ({ "--pencily-rotate": rotate, "--stamp-rotate": rotate } as any) : {}),
      }
    : {
        ...style,
        opacity: 0,
        pointerEvents: "none",
        visibility: "hidden",
      };

  return (
    <div ref={ref} style={animStyle} className={className}>
      {children}
    </div>
  );
}

// ----------------------------------------------------
// PLAYFUL RULER & PENCIL SCROLL PROGRESS BAR
// ----------------------------------------------------
export function PencilyScrollProgressBar() {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const percent = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
        setScrollPercent(percent);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (scrollPercent <= 0.5) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 h-1.5 bg-[#FAF7EE]/90 border-b border-slate-300 pointer-events-none select-none backdrop-blur-xs"
    >
      {/* Golden Pencil Fill Bar */}
      <div
        className="h-full bg-[#FFC83D] transition-[width] duration-150 ease-out relative flex items-center justify-end"
        style={{ width: `${scrollPercent}%` }}
      >
        {/* Pencil lead indicator (Sharp rectangular nib - NO DOTS) */}
        <div className="w-2 h-3 bg-[#0F2747] border border-[#FFC83D] rounded-xs shadow-2xs -mr-1" />
      </div>
    </div>
  );
}
