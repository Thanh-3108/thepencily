import React from "react";

// Hand-drawn 4-pointed golden sparkle
export function StarSparkle({ className = "", size = 28 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M20 2C21 14 26 19 38 20C26 21 21 26 20 38C19 26 14 21 2 20C14 19 19 14 20 2Z"
        fill="#FFC83D"
        stroke="#FFC83D"
        strokeWidth="1.5"
      />
    </svg>
  );
}

// Yellow hand-drawn scribble stroke
export function YellowScribble({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 35C45 10 110 5 195 25"
        stroke="#FFC83D"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Navy Hand-drawn Doodle Arrow
export function DoodleArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      width="44"
      height="30"
      viewBox="0 0 54 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 28C16 28 32 20 46 10M46 10L36 7M46 10L42 22"
        stroke="#0F2747"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Yellow wavy line
export function WavyLine({ className = "" }: { className?: string }) {
  return (
    <svg
      width="50"
      height="24"
      viewBox="0 0 60 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 14C12 4 20 4 28 14C36 24 44 24 56 14"
        stroke="#FFC83D"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Navy Zigzag line
export function ZigzagLine({ className = "" }: { className?: string }) {
  return (
    <svg
      width="40"
      height="24"
      viewBox="0 0 50 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 22L16 6L28 22L44 14"
        stroke="#0F2747"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Authentic Pencil Doodle Particle (Crisp Vector)
export function PencilDoodleParticle({
  variant = "navy",
  size = 32,
  className = "",
  rotation = 15,
}: {
  variant?: "navy" | "yellow";
  size?: number;
  className?: string;
  rotation?: number;
}) {
  const isYellow = variant === "yellow";

  return (
    <div
      className={`inline-block select-none pointer-events-none transition-transform duration-300 ${className}`}
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <svg
        viewBox="0 0 140 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain opacity-85"
      >
        <path
          d="M48 94 L88 32 C91 27 97 26 102 30 L110 36 C114 40 114 46 110 51 L70 113 L36 116 Z"
          fill={isYellow ? "#FFC83D" : "#0F2747"}
          stroke={isYellow ? "#0F2747" : "#FFFFFF"}
          strokeWidth="6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d="M68 37 L94 32 L66 106 L48 108 Z"
          fill="#FFF9EF"
          stroke={isYellow ? "#0F2747" : "#FFFFFF"}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M48 94 L36 116 L70 113 Z"
          fill="#FFF9EF"
          stroke={isYellow ? "#0F2747" : "#FFFFFF"}
          strokeWidth="5"
          strokeLinejoin="round"
        />
        <polygon points="36,116 48,103 44,97 36,116" fill={isYellow ? "#0F2747" : "#FFFFFF"} />
      </svg>
    </div>
  );
}

// Ambient Floating Doodle Particles container for page / section backgrounds
export function FloatingDoodleParticles({
  count = 6,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const positions = [
    { top: "10%", left: "4%", rot: 25, size: 28, variant: "navy" as const },
    { top: "22%", right: "6%", rot: -35, size: 24, variant: "yellow" as const },
    { top: "48%", left: "2%", rot: 15, size: 30, variant: "yellow" as const },
    { top: "65%", right: "3%", rot: -15, size: 26, variant: "navy" as const },
    { top: "85%", left: "5%", rot: 40, size: 24, variant: "navy" as const },
    { top: "92%", right: "5%", rot: -25, size: 28, variant: "yellow" as const },
  ];

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    >
      {positions.slice(0, count).map((p, i) => (
        <div
          key={i}
          className="absolute animate-pulse"
          style={{
            top: p.top,
            left: p.left,
            right: p.right,
            animationDuration: `${3 + (i % 3) * 1.5}s`,
          }}
        >
          <PencilDoodleParticle
            variant={p.variant}
            size={p.size}
            rotation={p.rot}
            className="hover:scale-125 transition-transform"
          />
        </div>
      ))}
    </div>
  );
}
