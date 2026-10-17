"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { RotateCcw } from "lucide-react";

export function InteractiveDoodleHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Physics states stored in refs for animation loop (immune to refresh rate variations)
  const physicsRef = useRef({
    // Pencil tip coordinates on virtual 540x380 canvas matching the official mockup
    x: 85,
    y: 295,
    targetX: 85,
    targetY: 295,
    prevTargetX: 85,
    prevTargetY: 295,
    // Smoothed mouse velocity in px/sec
    smoothedVx: 0,
    smoothedVy: 0,
    // Angle: baseline rest angle is -14 deg
    angle: -14,
    // Continuous slow orbit rotation
    rotationAngle: 0,
    // Parallax offsets
    parallaxX: 0,
    parallaxY: 0,
    // Drawing state
    isDrawing: false,
    prevDrawX: 85,
    prevDrawY: 295,
    dashAccumulator: 0,
    lastMoveTime: 0,
  });

  const [renderState, setRenderState] = useState({
    pencilX: 85,
    pencilY: 295,
    pencilAngle: -14,
    isDrawing: false,
    parallaxX: 0,
    parallaxY: 0,
    rotationAngle: 0,
  });

  // Draw authentic signature brand doodle loop
  const drawSignatureDoodle = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();

    ctx.strokeStyle = "#0F2747";
    ctx.lineWidth = 3.6;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    // Signature flourish: sweeps from upper-middle, forms smooth left C-loop, and glides under big dreams
    ctx.moveTo(215, 175);
    ctx.bezierCurveTo(160, 175, 110, 205, 110, 245);
    ctx.bezierCurveTo(110, 280, 150, 305, 205, 300);
    ctx.bezierCurveTo(260, 295, 310, 270, 370, 245);
    ctx.stroke();
  }, []);

  // Main High-Performance Animation Loop (Independent of 60Hz/144Hz/240Hz)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 3) : 1;
    canvas.width = 540 * dpr;
    canvas.height = 380 * dpr;
    ctx.scale(dpr, dpr);
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

      // When drawing, tip applies slight deliberate pressure (-16°)
      const baseAngle = p.isDrawing ? -16 : -14;
      const targetAngle = baseAngle + tiltOffset + idleSway;

      // Smooth angle transition (tau = 0.065s)
      const angleAlpha = 1 - Math.exp(-dt / 0.065);
      p.angle += (targetAngle - p.angle) * angleAlpha;

      // 4. Parallax offsets
      const targetParallaxX = (p.targetX - 270) / 270;
      const targetParallaxY = (p.targetY - 190) / 190;
      const parallaxAlpha = 1 - Math.exp(-dt / 0.12);
      p.parallaxX += (targetParallaxX - p.parallaxX) * parallaxAlpha;
      p.parallaxY += (targetParallaxY - p.parallaxY) * parallaxAlpha;

      // 5. Orbit rotation
      p.rotationAngle = (p.rotationAngle + dt * 4.0) % 360;

      // 6. Visual Pencil Tracking State
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

    const handleGlobalPointerUp = () => {
      physicsRef.current.isDrawing = false;
    };
    window.addEventListener("pointerup", handleGlobalPointerUp);
    window.addEventListener("pointercancel", handleGlobalPointerUp);

    animationFrameId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointerup", handleGlobalPointerUp);
      window.removeEventListener("pointercancel", handleGlobalPointerUp);
    };
  }, [drawSignatureDoodle]);

  // Helper to draw a crisp contact dot (for quick clicks, taps, or punctuation marks like dots on 'i')
  const drawDot = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#0F2747";
    ctx.beginPath();
    ctx.arc(x, y, 2.1, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  // Helper to draw a continuous smooth stroke segment directly on the canvas
  const drawSegment = useCallback((fromX: number, fromY: number, toX: number, toY: number, width: number = 4.2) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = "#0F2747";
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
  }, []);

  // Pointer event handlers: Instant event-driven drawing completely independent of screen refresh rate
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scaleX = 540 / rect.width;
    const scaleY = 420 / rect.height;

    const p = physicsRef.current;
    const now = performance.now();
    const dt = Math.max(1, now - (p.lastMoveTime || now));
    p.lastMoveTime = now;

    // Safety: check if primary button is actually held down right now
    const isPrimaryDown = e.pointerType === "mouse"
      ? (e.buttons & 1) === 1
      : e.buttons === 1 || e.pressure > 0;

    if (!isPrimaryDown) {
      p.isDrawing = false;
      p.dashAccumulator = 0;
    }

    // Capture coalesced events for precision mice and trackpads
    const rawEvents = (e.nativeEvent && typeof (e.nativeEvent as any).getCoalescedEvents === "function")
      ? (e.nativeEvent as any).getCoalescedEvents()
      : [e.nativeEvent || e];

    for (let i = 0; i < rawEvents.length; i++) {
      const ev = rawEvents[i];
      const curX = (ev.clientX - rect.left) * scaleX;
      const curY = (ev.clientY - rect.top) * scaleY;

      const evDown = ev.buttons !== undefined ? (ev.buttons & 1) === 1 : isPrimaryDown;

      if (p.isDrawing && evDown) {
        const dist = Math.hypot(curX - p.prevDrawX, curY - p.prevDrawY);
        if (dist >= 1.0) {
          // Instant velocity in px/ms
          const speed = dist / Math.max(0.5, dt / rawEvents.length);
          const isFastFlick = speed >= 1.35; // Threshold for fast flicking / sketching

          if (!isFastFlick) {
            // Slow / Normal drawing: 100% Solid Continuous Line (NÉT LIỀN)
            p.dashAccumulator = 0;
            drawSegment(p.prevDrawX, p.prevDrawY, curX, curY, 4.2);
          } else {
            // Fast drawing / flicking: Breaks into clean dashed sketch marks (NÉT ĐỨT RỜI)
            const cycle = 22; // 12px dash, 10px spacing
            const dashLength = 12;
            const stepSize = 3;
            const steps = Math.max(1, Math.ceil(dist / stepSize));

            let prevSubX = p.prevDrawX;
            let prevSubY = p.prevDrawY;

            for (let s = 1; s <= steps; s++) {
              const t = s / steps;
              const subX = p.prevDrawX + (curX - p.prevDrawX) * t;
              const subY = p.prevDrawY + (curY - p.prevDrawY) * t;
              const subDist = Math.hypot(subX - prevSubX, subY - prevSubY);

              p.dashAccumulator += subDist;
              const inDash = (p.dashAccumulator % cycle) < dashLength;

              if (inDash) {
                drawSegment(prevSubX, prevSubY, subX, subY, 3.6);
              }

              prevSubX = subX;
              prevSubY = subY;
            }
          }

          p.prevDrawX = curX;
          p.prevDrawY = curY;
        }
      } else {
        // When not drawing (hovering between words/letters), keep sync so next press never bridges
        p.dashAccumulator = 0;
        p.prevDrawX = curX;
        p.prevDrawY = curY;
      }

      p.targetX = curX;
      p.targetY = curY;
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only accept primary button (left click) or touch/pen contact
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const scaleX = 540 / rect.width;
    const scaleY = 420 / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const p = physicsRef.current;
    p.isDrawing = true;
    p.dashAccumulator = 0;
    p.lastMoveTime = performance.now();
    p.targetX = x;
    p.targetY = y;
    p.x = x;
    p.y = y;
    p.prevTargetX = x;
    p.prevTargetY = y;
    p.prevDrawX = x;
    p.prevDrawY = y;

    // Stamp a clean contact point immediately
    drawDot(x, y);
  };

  const handlePointerUp = () => {
    const p = physicsRef.current;
    p.isDrawing = false;
    p.dashAccumulator = 0;
  };

  const handleResetCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawSignatureDoodle(ctx);

    const p = physicsRef.current;
    p.targetX = 85;
    p.targetY = 295;
    p.prevTargetX = 85;
    p.prevTargetY = 295;
    p.smoothedVx = 0;
    p.smoothedVy = 0;
    p.prevDrawX = 85;
    p.prevDrawY = 295;
    p.dashAccumulator = 0;
    p.lastMoveTime = 0;
    p.isDrawing = false;
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => {
        setIsHovered(false);
        const p = physicsRef.current;
        p.isDrawing = false;
        p.targetX = 85;
        p.targetY = 295;
      }}
      className="relative w-full max-w-[540px] aspect-[540/380] select-none cursor-crosshair group touch-none mx-auto"
    >
      {/* 1. FLAWLESS, ELEGANT ARCHITECTURAL OUTLINE SHAPES (No distortion, pure geometry) */}
      <svg
        viewBox="0 0 540 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      >
        {/* Parallax Group for background circles: shifts subtly with mouse */}
        <g
          style={{
            transform: `translate(${renderState.parallaxX * 6}px, ${renderState.parallaxY * 4}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          {/* Main Sun Circle (Clean, perfectly circular dashed outline with steady slow rotation) */}
          <circle
            cx="285"
            cy="195"
            r="125"
            stroke="#DEB841"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            style={{
              transformOrigin: "285px 195px",
              transform: `rotate(${renderState.rotationAngle}deg)`,
              opacity: isHovered ? 0.95 : 0.85,
            }}
          />

          {/* Inner Counter-Rotating Orbit Ring */}
          <circle
            cx="285"
            cy="195"
            r="105"
            stroke="#DEB841"
            strokeWidth="1.2"
            strokeDasharray="5 5"
            opacity="0.65"
            style={{
              transformOrigin: "285px 195px",
              transform: `rotate(${-renderState.rotationAngle * 0.7}deg)`,
            }}
          />
        </g>

        {/* Outer Right Blue Dashed Arc */}
        <path
          d="M 365 75 C 420 135, 430 240, 395 320"
          stroke="#4F7ECB"
          strokeWidth="1.8"
          strokeDasharray="6 6"
          opacity={isHovered ? 0.9 : 0.75}
          className="transition-opacity duration-300"
          style={{
            transform: `translate(${renderState.parallaxX * 10}px, ${renderState.parallaxY * 6}px)`,
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
        className="absolute top-[20%] right-[10%] z-20 pointer-events-none w-[205px] sm:w-[225px] transition-transform duration-200 ease-out"
        style={{
          transform: `translate(${-renderState.parallaxX * 5}px, ${-renderState.parallaxY * 3}px)`,
        }}
      >
        <Image
          src="/brand/pencily-text-clean.png"
          alt="Small steps. big dreams."
          width={225}
          height={180}
          priority
          className="w-full h-auto object-contain select-none"
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
          width: "95px",
        }}
      >
        <Image
          src="/brand/pencily-pencil-clean.png"
          alt="The Pencily"
          width={120}
          height={170}
          priority
          className="w-full h-auto object-contain drop-shadow-sm select-none"
        />
      </div>

      {/* 5. MINIMAL ICON-ONLY RESET BUTTON */}
      <div className="absolute bottom-2 left-3 z-30">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleResetCanvas();
          }}
          title="Vẽ lại nét chữ ký"
          className="w-7 h-7 flex items-center justify-center bg-white/80 hover:bg-white text-[#0F2747] rounded-sm border border-slate-300 hover:border-[#0F2747] shadow-2xs transition active:scale-95 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
