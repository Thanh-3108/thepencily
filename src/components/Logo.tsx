import React from "react";
import Image from "next/image";

export interface LogoProps {
  className?: string;
  variant?: "nav" | "full" | "icon" | "pencil" | "white" | "light" | "monochrome";
  showTagline?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  priority?: boolean;
}

/**
 * The Pencily Official Brand Mascot (Pencil)
 * 100% authentic crop directly from the master brand guidelines sheet
 */
export function PencilMascot({
  className = "",
  inverted = false,
  size,
  priority = false,
}: {
  className?: string;
  inverted?: boolean;
  monochrome?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  priority?: boolean;
}) {
  const sizeClass = size
    ? {
        sm: "h-7 w-auto",
        md: "h-9 sm:h-10 w-auto",
        lg: "h-12 sm:h-14 w-auto",
        xl: "h-16 sm:h-20 w-auto",
      }[size]
    : (!className.includes("w-") && !className.includes("h-") ? "h-10 w-auto" : "");

  const src = inverted
    ? "/brand/pencily-pencil-white.png"
    : "/brand/pencily-pencil-clean.png";

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}>
      <Image
        src={src}
        alt="The Pencily Mascot"
        width={264}
        height={382}
        className={`${sizeClass} object-contain transition-transform duration-200 hover:scale-105`}
        priority={priority}
      />
    </div>
  );
}

/**
 * Official App Icon (Dark Navy Squircle with Yellow Pencil Mascot + Gold Sparks)
 * 100% authentic crop directly from the master brand guidelines sheet
 */
export function BrandAppIcon({
  className = "",
  size,
  priority = false,
}: {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  priority?: boolean;
}) {
  const sizeClass = size
    ? {
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-14 h-14",
        xl: "w-18 h-18",
      }[size]
    : (!className.includes("w-") && !className.includes("h-") ? "w-10 h-10" : "");

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow ${sizeClass} ${className}`}
    >
      <Image
        src="/brand/app_icon.png"
        alt="The Pencily Icon"
        width={512}
        height={512}
        className="w-full h-full object-cover"
        priority={priority}
      />
    </div>
  );
}

/**
 * Universal Synced Logo Component for The Pencily
 * Uses authentic raster assets directly extracted from the official brand board:
 * - variant="icon": Official App Icon squircle
 * - variant="pencil": Official Pencil Mascot
 * - variant="nav": Horizontal lockup (Pencil Mascot + "The Pencily" + dynamic swoosh)
 * - variant="full": Full lockup with tagline "LEARN • SHARE • GROW"
 * - variant="white" / "light": White/Gold lockup for dark navy cards & headers
 */
export function Logo({
  className = "",
  variant = "nav",
  showTagline = false,
  size = "md",
  priority = false,
}: LogoProps) {
  const isLight = variant === "white" || variant === "light";

  // App Icon variant (Squircle)
  if (variant === "icon") {
    return <BrandAppIcon size={size} className={className} priority={priority} />;
  }

  // Standalone Mascot variant
  if (variant === "pencil") {
    return <PencilMascot size={size} inverted={isLight} className={className} priority={priority} />;
  }

  const isFull = variant === "full" || showTagline;

  // Select authentic image source based on variant & contrast mode
  let src = "/brand/logo-nav-clean.png";
  let origWidth = 635;
  let origHeight = 268;

  if (isFull) {
    src = isLight ? "/brand/logo-full-white.png" : "/brand/logo-full-transparent.png";
    origHeight = 336;
  } else if (isLight) {
    src = "/brand/logo-nav-white.png";
  }

  // Height configurations for responsive display
  const heightStyles = {
    sm: isFull ? "h-8 sm:h-9" : "h-7 sm:h-8",
    md: isFull ? "h-11 sm:h-12" : "h-9 sm:h-11",
    lg: isFull ? "h-14 sm:h-16" : "h-12 sm:h-14",
    xl: isFull ? "h-20 sm:h-24" : "h-16 sm:h-20",
  }[size];

  return (
    <div
      className={`inline-flex items-center select-none group cursor-pointer ${className}`}
      style={{ verticalAlign: "middle" }}
    >
      <Image
        src={src}
        alt={isFull ? "The Pencily - Learn • Share • Grow" : "The Pencily"}
        width={origWidth}
        height={origHeight}
        className={`${heightStyles} w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]`}
        priority={priority}
      />
    </div>
  );
}

export default Logo;
