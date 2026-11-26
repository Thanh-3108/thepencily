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
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    // If user prefers reduced motion, or page has a URL hash, or element is near/above viewport, show cleanly
    const reveal = () => setIsVisible(true);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
      return;
    }

    const checkPosition = () => {
      const rect = el.getBoundingClientRect();
      // Reveal if within or already scrolled past the viewport
      if (rect.top <= window.innerHeight * 1.15) {
        reveal();
        return true;
      }
      return false;
    };

    if (checkPosition()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.boundingClientRect.top <= window.innerHeight) {
          reveal();
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.01,
        rootMargin: "120px 0px 120px 0px",
      }
    );

    observer.observe(el);

    const handleScrollOrHash = () => {
      if (checkPosition()) {
        observer.unobserve(el);
        window.removeEventListener("scroll", handleScrollOrHash);
        window.removeEventListener("hashchange", handleHashJump);
      }
    };

    // When user clicks an anchor link (like #stories or #about), re-check after smooth scroll frames
    const handleHashJump = () => {
      [50, 250, 600, 1000].forEach((ms) => {
        window.setTimeout(handleScrollOrHash, ms);
      });
    };

    window.addEventListener("scroll", handleScrollOrHash, { passive: true });
    window.addEventListener("hashchange", handleHashJump);

    return () => {
      observer.unobserve(el);
      window.removeEventListener("scroll", handleScrollOrHash);
      window.removeEventListener("hashchange", handleHashJump);
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
        ...(rotate ? ({ "--pencily-rotate": rotate, "--stamp-rotate": rotate } as any) : {}),
      }
    : {
        ...style,
        opacity: 0.02,
        transform: "translateY(12px)",
        transition: "opacity 0.25s ease-out, transform 0.25s ease-out",
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
      className="fixed top-0 left-0 right-0 z-50 h-1.5 bg-[#FAF7EE]/90 border-b border-slate-300 pointer-events-none select-none backdrop-blur-xs overflow-hidden"
    >
      {/* Golden Pencil Fill Bar */}
      <div
        className="h-full bg-[#FFC83D] transition-[width] duration-150 ease-out relative flex items-center justify-end"
        style={{ width: `${scrollPercent}%` }}
      >
        {/* Pencil lead indicator (Sharp rectangular nib - strictly flush with yellow bar) */}
        <div className="w-2.5 h-full bg-[#0F2747] shrink-0" />
      </div>
    </div>
  );
}
