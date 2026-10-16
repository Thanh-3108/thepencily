import React from "react";
import Image from "next/image";

interface IconProps {
  className?: string;
  size?: number;
}

/**
 * Brand Pillar: Learn (Cử nhân / Học tập)
 * Original Authentic Artwork from The Pencily Brand Sheet
 */
export function IconLearn({ className = "", size = 48 }: IconProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/brand/icons/brand-learn-clean.png"
        alt="Learn - Học tập"
        width={size}
        height={size}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  );
}

/**
 * Brand Pillar: Share (Cộng đồng 3 người / Chia sẻ)
 * Original Authentic Artwork from The Pencily Brand Sheet
 */
export function IconShare({ className = "", size = 48 }: IconProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/brand/icons/brand-share-clean.png"
        alt="Share - Chia sẻ"
        width={size}
        height={size}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  );
}

/**
 * Brand Pillar: Teach (Bóng đèn tri thức / Dạy học)
 * Original Authentic Artwork from The Pencily Brand Sheet
 */
export function IconTeach({ className = "", size = 48 }: IconProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/brand/icons/brand-teach-clean.png"
        alt="Teach - Giảng dạy"
        width={size}
        height={size}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  );
}

/**
 * Brand Pillar: Collaborate (Bắt tay hợp tác)
 * Original Authentic Artwork from The Pencily Brand Sheet
 */
export function IconCollaborate({ className = "", size = 48 }: IconProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/brand/icons/brand-collaborate-clean.png"
        alt="Collaborate - Hợp tác"
        width={size}
        height={size}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  );
}

/**
 * Brand Pillar: Grow (Mầm cây phát triển)
 * Original Authentic Artwork from The Pencily Brand Sheet
 */
export function IconGrow({ className = "", size = 48 }: IconProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/brand/icons/brand-grow-clean.png"
        alt="Grow - Phát triển"
        width={size}
        height={size}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  );
}

/** Official Discord Clyde mark: use for Discord CTAs and nav, not generic headphones. */
export function DiscordLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.363 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

/** Official Facebook mark for social contact links */
export function FacebookLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export {
  LibraryAnimatedBookIcon,
  LibraryOpenBookLogo,
  LibraryClosedBookIcon,
} from "./LibraryBookLogo";

/** High-DPI Library Deck / Tray icon matching YouTube-style video repository navigation */
export function LibraryDeckIcon({
  className = "",
  size,
  color,
  strokeWidth = 2,
  ...props
}: React.SVGProps<SVGSVGElement> & {
  size?: number | string;
  strokeWidth?: number | string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {/* Tier 1 handle */}
      <path d="M 9.5 6.25 V 5.25 C 9.5 4.56 10.06 4 10.75 4 H 13.25 C 13.94 4 14.5 4.56 14.5 5.25 V 6.25" />

      {/* Tier 2 handle */}
      <path d="M 6.75 10.25 V 9 C 6.75 8.17 7.42 7.5 8.25 7.5 H 15.75 C 16.58 7.5 17.25 8.17 17.25 9 V 10.25" />

      {/* Main bottom tray container */}
      <path d="M 6.2 12.5 H 17.8 C 18.8 12.5 19.6 13.3 19.4 14.3 L 18.2 19.4 C 18.0 20.3 17.2 21 16.3 21 H 7.7 C 6.8 21 6.0 20.3 5.8 19.4 L 4.6 14.3 C 4.4 13.3 5.2 12.5 6.2 12.5 Z" />
    </svg>
  );
}

export function BrandIcon({
  name,
  className = "",
  size = 48,
}: {
  name: "learn" | "share" | "teach" | "collaborate" | "grow";
  className?: string;
  size?: number;
}) {
  switch (name) {
    case "learn":
      return <IconLearn className={className} size={size} />;
    case "share":
      return <IconShare className={className} size={size} />;
    case "teach":
      return <IconTeach className={className} size={size} />;
    case "collaborate":
      return <IconCollaborate className={className} size={size} />;
    case "grow":
      return <IconGrow className={className} size={size} />;
    default:
      return null;
  }
}
