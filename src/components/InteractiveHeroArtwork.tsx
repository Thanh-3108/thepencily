"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Code, Calculator, Atom, Compass, Lightbulb } from "lucide-react";

interface FormulaParticle {
  id: number;
  text: string;
  category: "math" | "code" | "physics" | "logic";
  x: number;
  y: number;
  size: string;
  color: string;
  delay: string;
  duration: string;
}

export function InteractiveHeroArtwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState<"math" | "code" | "science">("math");
  const [clickSparks, setClickSparks] = useState<Array<{ id: number; x: number; y: number; label: string }>>([]);

  // Handle mouse movement for subtle interactive tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Spark burst on click
  const formulasPool = [
    "O(n log n)",
    "∫ f(x) dx",
    "e^(iπ) + 1 = 0",
    "E = mc²",
    "∑ 1/n² = π²/6",
    "λ = h / p",
    "∇ × E = -∂B/∂t",
    "P(A|B) = P(B|A)P(A)/P(B)",
    "lim (1 + 1/n)ⁿ = e",
    "F = ma",
  ];

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const randomFormula = formulasPool[Math.floor(Math.random() * formulasPool.length)];
    
    const newSpark = {
      id: Date.now(),
      x: clickX,
      y: clickY,
      label: randomFormula,
    };

    setClickSparks((prev) => [...prev.slice(-4), newSpark]);

    // remove spark after 2.2s
    setTimeout(() => {
      setClickSparks((prev) => prev.filter((s) => s.id !== newSpark.id));
    }, 2200);
  };

  // Floating background educational formulas
  const floatingFormulas: FormulaParticle[] = [
    { id: 1, text: "O(n log n)", category: "code", x: 18, y: 15, size: "text-xs sm:text-sm font-mono", color: "text-[#4F7ECB]", delay: "0s", duration: "6s" },
    { id: 2, text: "∫ eˣ dx = eˣ + C", category: "math", x: 62, y: 12, size: "text-xs sm:text-sm font-serif", color: "text-[#0F2747]", delay: "1.5s", duration: "7s" },
    { id: 3, text: "E = mc²", category: "physics", x: 12, y: 68, size: "text-xs sm:text-sm font-semibold", color: "text-[#D97706]", delay: "0.8s", duration: "6.5s" },
    { id: 4, text: "∑_{i=1}^n i = n(n+1)/2", category: "math", x: 68, y: 78, size: "text-[11px] sm:text-xs font-mono", color: "text-[#2563EB]", delay: "2.2s", duration: "8s" },
    { id: 5, text: "f(x) = lim Δy/Δx", category: "math", x: 74, y: 44, size: "text-xs font-serif", color: "text-[#0F2747]", delay: "1s", duration: "7.5s" },
    { id: 6, text: "while(learn) grow();", category: "code", x: 26, y: 84, size: "text-[11px] font-mono", color: "text-[#059669]", delay: "2.8s", duration: "6.8s" },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleContainerClick}
      className="relative w-full max-w-[560px] aspect-[1.15/1] mx-auto select-none cursor-crosshair group overflow-hidden rounded-3xl"
    >
      {/* 1. Organic Background Soft Blobs (Smooth Vector) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 600 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft Warm Yellow Blob in center */}
        <path
          d="M240 70C340 50 430 110 460 210C490 310 420 410 320 430C220 450 140 380 120 280C100 180 140 90 240 70Z"
          fill="#FFF4D6"
          opacity="0.8"
          className="transition-all duration-700 ease-out"
          style={{
            transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
          }}
        />

        {/* Soft Blue Wave Shape on Bottom-Right */}
        <path
          d="M480 160C450 220 460 290 500 350C530 395 560 420 600 440V520H450C380 520 370 480 390 440C420 380 440 330 420 270C400 210 420 160 480 160Z"
          fill="#8BB4F2"
          opacity="0.9"
          className="transition-all duration-700 ease-out"
          style={{
            transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`,
          }}
        />
      </svg>

      {/* 2. Floating Educational Formulas & Algorithms Particles */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {floatingFormulas.map((item) => (
          <div
            key={item.id}
            className={`absolute px-2.5 py-1 rounded-lg backdrop-blur-xs bg-white/75 shadow-xs border border-white/80 transition-all duration-500 ease-out ${item.size} ${item.color}`}
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: `translate(${mousePos.x * (item.id % 2 === 0 ? 30 : -25)}px, ${mousePos.y * (item.id % 2 === 0 ? -25 : 30)}px)`,
              animation: `floatFormula ${item.duration} ease-in-out infinite alternate`,
              animationDelay: item.delay,
              opacity: isHovered ? 0.95 : 0.65,
            }}
          >
            {item.text}
          </div>
        ))}
      </div>

      {/* 3. Click-Spawned Interactive Sparkles & Formulas */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {clickSparks.map((spark) => (
          <div
            key={spark.id}
            className="absolute px-3 py-1.5 rounded-full bg-[#0F2747] text-[#FFC83D] font-mono text-xs font-bold shadow-lg animate-sparkPop whitespace-nowrap"
            style={{
              left: `${spark.x}px`,
              top: `${spark.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            ✦ {spark.label}
          </div>
        ))}
      </div>

      {/* 4. Crystal-Sharp Vector Pencil & Animated Drawn Loop Line */}
      <div
        className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 15}px, ${mousePos.y * 15}px, 0) rotate(${mousePos.x * 4}deg)`,
        }}
      >
        <svg
          className="w-full h-full max-w-[520px] max-h-[460px] overflow-visible"
          viewBox="0 0 500 440"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* DEFINITIONS & FILTERS */}
          <defs>
            {/* Pencil Shadow */}
            <filter id="pencilShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="3" dy="8" stdDeviation="8" floodColor="#0F2747" floodOpacity="0.16" />
            </filter>
            
            {/* Lead Gradient */}
            <linearGradient id="leadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F2747" />
            </linearGradient>

            {/* Wood Yellow Gradient */}
            <linearGradient id="woodYellow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFC83D" />
              <stop offset="100%" stopColor="#EAB308" />
            </linearGradient>
          </defs>

          {/* A. Dynamic Animated Scribble Line from Pencil Tip */}
          {/* Path starts exactly at pencil graphite tip (x: 135, y: 312) */}
          <g>
            {/* Shadow path */}
            <path
              d="M 135 312 C 105 322, 60 326, 40 280 C 20 234, 52 200, 95 204 C 145 208, 142 270, 185 264 C 215 260, 230 252, 245 248"
              stroke="#0F2747"
              strokeWidth="6.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.15"
              transform="translate(2, 4)"
            />
            {/* Main Drawn Loop Path with live animated dash */}
            <path
              d="M 135 312 C 105 322, 60 326, 40 280 C 20 234, 52 200, 95 204 C 145 208, 142 270, 185 264 C 215 260, 230 252, 245 248"
              stroke="#0F2747"
              strokeWidth="6.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="transition-all duration-500"
              style={{
                strokeDasharray: "600",
                strokeDashoffset: isHovered ? "0" : "40",
                animation: "drawLoop 4s ease-in-out infinite alternate",
              }}
            />
          </g>

          {/* B. The Iconic Crisp Diagonal Vector Pencil */}
          <g filter="url(#pencilShadow)" className="transition-transform duration-300">
            {/* Top Eraser / Collar (Navy Rounded Cap) */}
            <path
              d="M 226 84 C 235 73, 248 73, 257 84 L 261 89 C 270 100, 270 113, 261 124 L 253 133 L 218 94 Z"
              fill="#0F2747"
              stroke="#0F2747"
              strokeWidth="4"
              strokeLinejoin="round"
            />

            {/* Pencil Body - Yellow Wood Core (Main Hexagonal Facet) */}
            <path
              d="M 218 94 L 253 133 L 166 242 L 131 203 Z"
              fill="url(#woodYellow)"
              stroke="#0F2747"
              strokeWidth="7"
              strokeLinejoin="round"
            />

            {/* Pencil Body Inner Highlight Facet */}
            <path
              d="M 230 107 L 244 122 L 163 224 L 149 209 Z"
              fill="#FFE885"
              stroke="#0F2747"
              strokeWidth="4"
              strokeLinejoin="round"
            />

            {/* Sharpened Wooden Collar (Cream Wood Tone) */}
            <path
              d="M 131 203 L 166 242 L 142 272 C 140 275, 137 277, 133 277 C 129 277, 126 275, 124 272 L 115 261 C 113 258, 110 256, 106 256 L 95 244 Z"
              fill="#FFF9EF"
              stroke="#0F2747"
              strokeWidth="6"
              strokeLinejoin="round"
            />

            {/* Wood Scallop Collar Edge Details */}
            <path
              d="M 131 203 C 138 215, 142 225, 166 242"
              stroke="#0F2747"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Sharp Graphite Lead Tip */}
            <path
              d="M 124 272 L 142 272 L 135 312 Z"
              fill="url(#leadGrad)"
              stroke="#0F2747"
              strokeWidth="5"
              strokeLinejoin="round"
            />

            {/* White Graphite Light Glint on Tip */}
            <path
              d="M 133 282 L 137 304"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.85"
            />
          </g>

          {/* C. Vector Hand-Drawn "Small steps. big dreams." Typography */}
          <g className="transition-transform duration-300" style={{ transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 8}px)` }}>
            {/* "Small" */}
            <text
              x="265"
              y="185"
              fill="#0F2747"
              fontFamily="var(--font-poppins), system-ui, sans-serif"
              fontSize="34"
              fontWeight="800"
              fontStyle="italic"
              letterSpacing="-0.5px"
            >
              Small
            </text>

            {/* "steps." */}
            <text
              x="285"
              y="226"
              fill="#0F2747"
              fontFamily="var(--font-poppins), system-ui, sans-serif"
              fontSize="34"
              fontWeight="800"
              fontStyle="italic"
              letterSpacing="-0.5px"
            >
              steps.
            </text>

            {/* "big dreams." */}
            <text
              x="272"
              y="278"
              fill="#0F2747"
              fontFamily="var(--font-poppins), system-ui, sans-serif"
              fontSize="37"
              fontWeight="900"
              fontStyle="italic"
              letterSpacing="-0.5px"
            >
              big dreams.
            </text>

            {/* Dynamic Hand-Drawn Underline under "big dreams." */}
            <path
              d="M 270 292 Q 330 286, 395 272"
              stroke="#0F2747"
              strokeWidth="4.5"
              strokeLinecap="round"
              className="transition-all duration-300"
              style={{
                strokeDasharray: "150",
                strokeDashoffset: isHovered ? "0" : "15",
              }}
            />

            {/* Little golden star sparkles */}
            <path
              d="M 405 170 Q 412 170, 412 163 Q 412 170, 419 170 Q 412 170, 412 177 Q 412 170, 405 170 Z"
              fill="#FFC83D"
            />
            <path
              d="M 425 240 Q 429 240, 429 236 Q 429 240, 433 240 Q 429 240, 429 244 Q 429 240, 425 240 Z"
              fill="#FFC83D"
            />
          </g>
        </svg>
      </div>

      {/* 5. Subtle Interactive Hint Pill on Bottom-Left */}
      <div className="absolute bottom-3 left-4 z-20 pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#0F2747]/10 text-[11px] font-semibold text-[#0F2747] shadow-xs">
          <Sparkles className="w-3 h-3 text-[#FFC83D]" />
          <span>Di chuột & nhấp để gieo công thức tri thức</span>
        </span>
      </div>

      {/* CSS Keyframe Animations */}
      <style jsx>{`
        @keyframes floatFormula {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          100% {
            transform: translateY(-10px) rotate(2deg);
          }
        }
        @keyframes drawLoop {
          0% {
            stroke-dashoffset: 60;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        @keyframes sparkPop {
          0% {
            opacity: 0;
            transform: translate(-50%, -30%) scale(0.6);
          }
          20% {
            opacity: 1;
            transform: translate(-50%, -60%) scale(1.1);
          }
          80% {
            opacity: 0.9;
            transform: translate(-50%, -90%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -120%) scale(0.8);
          }
        }
        .animate-sparkPop {
          animation: sparkPop 2.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
