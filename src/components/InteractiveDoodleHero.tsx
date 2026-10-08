"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { RotateCcw } from "lucide-react";
import { StarSparkle } from "./BrandDecorations";

export function InteractiveDoodleHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Physics states stored in refs for animation loop (immune to refresh rate variations)
  const physicsRef = useRef({
    // Pencil tip coordinates on virtual 540x420 canvas
    x: 185,
    y: 230,
    targetX: 185,
    targetY: 230,
    prevTargetX: 185,
    prevTargetY: 230,
    // Smoothed mouse velocity in px/sec
    smoothedVx: 0,
    smoothedVy: 0,
    // Angle: baseline rest angle is -24 deg (natural pencil writing angle)
    angle: -24,
    // Continuous slow orbit rotation
    rotationAngle: 0,
    // Parallax offsets
    parallaxX: 0,
    parallaxY: 0,
    // Drawing state
    isDrawing: false,
    prevDrawX: 185,
    prevDrawY: 230,
  });

  const [renderState, setRenderState] = useState({
    pencilX: 185,
    pencilY: 230,
    pencilAngle: -24,
    isDrawing: false,
    parallaxX: 0,
    parallaxY: 0,
    rotationAngle: 0,
  });

  // Draw authentic signature brand doodle loop
  const drawSignatureDoodle = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, 540, 420);

    ctx.strokeStyle = "#0F2747";
    ctx.lineWidth = 4.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    // Smooth, graceful continuous loop
    ctx.moveTo(185, 230);
    ctx.bezierCurveTo(110, 250, 85, 300, 115, 330);
    ctx.bezierCurveTo(145, 360, 220, 360, 270, 320);
    ctx.bezierCurveTo(320, 280, 370, 290, 420, 310);
    ctx.stroke();
  }, []);

  // Main High-Performance Animation Loop (Independent of 60Hz/144Hz/240Hz)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 540;
    canvas.height = 420;
    drawSignatureDoodle(ctx);

    let animationFrameId: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      // dt in seconds, clamped between 0.001s (high refresh PC) and 0.05s (laptop low power)
      const rawDt = (currentTime - lastTime) / 1000;
      const dt = Math.max(0.001, Math.min(rawDt, 0.05));
      lastTime = currentTime;

      const p = physicsRef.current;

      // 1. Calculate actual mouse movement velocity (px/second)
      const instantVx = (p.targetX - p.prevTargetX) / dt;
      const instantVy = (p.targetY - p.prevTargetY) / dt;
      p.prevTargetX = p.targetX;
      p.prevTargetY = p.targetY;

      // Smooth velocity with time-constant tau = 0.09s (framerate-independent exponential smoothing)
      // This eliminates high-frequency jitter on PC gaming mice and jumps on laptop trackpads
      const velSmoothing = 1 - Math.exp(-dt / 0.09);
      p.smoothedVx += (instantVx - p.smoothedVx) * velSmoothing;
      p.smoothedVy += (instantVy - p.smoothedVy) * velSmoothing;

      // 2. Position tracking: silky smooth exponential follow (critically damped, responsive)
      // Follow time-constant tau = 0.038s gives immediate responsiveness with organic smoothness
      const posAlpha = 1 - Math.exp(-dt / 0.038);
      p.x += (p.targetX - p.x) * posAlpha;
      p.y += (p.targetY - p.y) * posAlpha;

      // 3. Dynamic tilt angle:
      // Rest angle: -24° (classic natural drafting angle)
      // Moving right -> tilts upright (up to -16°)
      // Moving left -> tilts slanted (down to -32°)
      // Clamped strictly to [-32°, -16°] so it NEVER sways wildly or feels "ỏng ẹo"
      const tiltOffset = Math.max(-8, Math.min(8, p.smoothedVx * 0.016));
      
      // Gentle idle breathing sway (±0.8°) when hovered or standing still
      const idleSway = Math.sin(currentTime * 0.0025) * 0.8;

      // When drawing, tip applies slight deliberate pressure (-26°)
      const baseAngle = p.isDrawing ? -26 : -24;
      const targetAngle = baseAngle + tiltOffset + idleSway;

      // Smooth angle transition (tau = 0.065s)
      const angleAlpha = 1 - Math.exp(-dt / 0.065);
      p.angle += (targetAngle - p.angle) * angleAlpha;

      // 4. Parallax offsets
      const targetParallaxX = (p.targetX - 270) / 270;
      const targetParallaxY = (p.targetY - 210) / 210;
      const parallaxAlpha = 1 - Math.exp(-dt / 0.12);
      p.parallaxX += (targetParallaxX - p.parallaxX) * parallaxAlpha;
      p.parallaxY += (targetParallaxY - p.parallaxY) * parallaxAlpha;

      // 5. Orbit rotation
      p.rotationAngle = (p.rotationAngle + dt * 4.0) % 360;

      // 6. Smooth Drawing on Canvas
      if (p.isDrawing && ctx) {
        ctx.strokeStyle = "#0F2747";
        ctx.lineWidth = 4;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.beginPath();
        ctx.moveTo(p.prevDrawX, p.prevDrawY);
        const midX = (p.prevDrawX + p.x) / 2;
        const midY = (p.prevDrawY + p.y) / 2;
        ctx.quadraticCurveTo(p.prevDrawX, p.prevDrawY, midX, midY);
        ctx.stroke();

        p.prevDrawX = p.x;
        p.prevDrawY = p.y;
      }

      setRenderState({
        pencilX: p.x,
        pencilY: p.y,
        pencilAngle: p.angle,
        isDrawing: p.isDrawing,
        parallaxX: p.parallaxX,
        parallaxY: p.parallaxY,
        rotationAngle: p.rotationAngle,
      });

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [drawSignatureDoodle]);

  // Pointer event handlers
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scaleX = 540 / rect.width;
    const scaleY = 420 / rect.height;

    const targetX = (e.clientX - rect.left) * scaleX;
    const targetY = (e.clientY - rect.top) * scaleY;

    const p = physicsRef.current;
    p.targetX = targetX;
    p.targetY = targetY;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scaleX = 540 / rect.width;
    const scaleY = 420 / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const p = physicsRef.current;
    p.isDrawing = true;
    p.targetX = x;
    p.targetY = y;
    p.prevTargetX = x;
    p.prevTargetY = y;
    p.prevDrawX = p.x;
    p.prevDrawY = p.y;
  };

  const handlePointerUp = () => {
    physicsRef.current.isDrawing = false;
  };

  const handleResetCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawSignatureDoodle(ctx);

    const p = physicsRef.current;
    p.targetX = 185;
    p.targetY = 230;
    p.prevTargetX = 185;
    p.prevTargetY = 230;
    p.smoothedVx = 0;
    p.smoothedVy = 0;
    p.prevDrawX = 185;
    p.prevDrawY = 230;
    p.isDrawing = false;
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => {
        setIsHovered(false);
        physicsRef.current.isDrawing = false;
      }}
      className="relative w-full max-w-[520px] aspect-[540/420] select-none cursor-crosshair group touch-none mx-auto"
    >
      {/* 1. FLAWLESS, ELEGANT ARCHITECTURAL OUTLINE SHAPES (No distortion, pure geometry) */}
      <svg
        viewBox="0 0 540 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      >

        {/* Parallax Group for background circles: shifts subtly with mouse */}
        <g
          style={{
            transform: `translate(${renderState.parallaxX * 8}px, ${renderState.parallaxY * 6}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          {/* Main Sun Circle (Clean, perfectly circular dashed outline with steady slow rotation) */}
          <circle
            cx="240"
            cy="210"
            r="165"
            stroke="#FFC83D"
            strokeWidth="1.8"
            strokeDasharray="8 8"
            style={{
              transformOrigin: "240px 210px",
              transform: `rotate(${renderState.rotationAngle}deg)`,
              opacity: isHovered ? 0.95 : 0.8,
            }}
          />

          {/* Inner Counter-Rotating Orbit Ring */}
          <circle
            cx="240"
            cy="210"
            r="138"
            stroke="#0F2747"
            strokeWidth="1"
            strokeDasharray="3 9"
            opacity="0.25"
            style={{
              transformOrigin: "240px 210px",
              transform: `rotate(${-renderState.rotationAngle * 0.6}deg)`,
            }}
          />
        </g>

        {/* Smooth, Elegant Architectural S-Curve Wave on Right (Permanently smooth, no kinks) */}
        <path
          d="M 400 30 C 455 100, 485 180, 465 260 C 445 330, 475 380, 510 415"
          stroke="#4F7ECB"
          strokeWidth="2.2"
          strokeDasharray="7 5"
          opacity={isHovered ? 0.85 : 0.65}
          className="transition-opacity duration-300"
          style={{
            transform: `translate(${renderState.parallaxX * 12}px, ${renderState.parallaxY * 8}px)`,
            transition: "transform 0.15s ease-out",
          }}
        />
      </svg>

      {/* 2. REAL CANVAS: CONTINUOUS INTERACTIVE DOODLE */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
      />

      {/* 3. PENCILY BRAND TYPOGRAPHY: "Small steps. big dreams." */}
      <div
        className="absolute top-[28%] right-[4%] z-20 pointer-events-none w-[220px] sm:w-[245px] transition-transform duration-200 ease-out"
        style={{
          transform: `translate(${-renderState.parallaxX * 6}px, ${-renderState.parallaxY * 4}px)`,
        }}
      >
        <Image
          src="/brand/pencily-text-clean.png"
          alt="Small steps. big dreams."
          width={245}
          height={200}
          priority
          className="w-full h-auto object-contain drop-shadow-2xs select-none"
        />
      </div>

      {/* 4. THE AUTHENTIC PENCIL (Follows mouse with smooth physics & pivots around tip) */}
      <div
        className="absolute z-30 pointer-events-none will-change-transform"
        style={{
          left: `${renderState.pencilX}px`,
          top: `${renderState.pencilY}px`,
          transform: `translate(-22%, -100%) rotate(${renderState.pencilAngle}deg) scale(${renderState.isDrawing ? 0.96 : 1})`,
          transformOrigin: "22% 100%",
          width: "125px",
        }}
      >
        <Image
          src="/brand/pencily-pencil-clean.png"
          alt="The Pencily"
          width={150}
          height={215}
          priority
          className="w-full h-auto object-contain drop-shadow-md select-none"
        />
      </div>

      {/* 5. MINIMALIST OUTLINE SPARKLES */}
      <div
        className="absolute top-[8%] right-[28%] z-20 pointer-events-none transition-transform duration-300"
        style={{
          transform: isHovered
            ? `translate(${renderState.parallaxX * 10}px, ${renderState.parallaxY * 8}px) scale(1.2)`
            : "scale(1)",
        }}
      >
        <StarSparkle size={20} className="text-[#FFC83D] opacity-90 animate-pulse" />
      </div>

      <div
        className="absolute bottom-[22%] right-[8%] z-20 pointer-events-none transition-transform duration-300"
        style={{
          transform: isHovered
            ? `translate(${renderState.parallaxX * -8}px, ${renderState.parallaxY * -6}px) scale(1.15)`
            : "scale(1)",
        }}
      >
        <StarSparkle size={16} className="text-[#FFC83D] opacity-75" />
      </div>

      {/* 6. MINIMAL ICON-ONLY RESET BUTTON */}
      <div className="absolute bottom-2 left-3 z-30">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleResetCanvas();
          }}
          title="Vẽ lại nét chữ ký"
          className="w-8 h-8 flex items-center justify-center bg-white/90 hover:bg-white text-[#0F2747] rounded-full border border-[#0F2747]/15 shadow-2xs hover:shadow-xs transition active:scale-95 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
