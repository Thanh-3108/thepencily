"use client";

import React from "react";

export interface PencilyIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
  className?: string;
}

/**
 * THE PENCILY ICON SYSTEM
 * Aesthetic Guidelines:
 * - Soft rounded line-art with smooth continuous contours (strokeWidth: 1.75 - 2px)
 * - Friendly rounded caps & joints (strokeLinecap="round", strokeLinejoin="round")
 * - Rounded squircle geometry (rx="3" to rx="6", rounded-2xl)
 * - Harmonious pastel color pairing (Sky Blue, Emerald Green, Warm Amber, Lilac Purple)
 * - STRICT RULE: ABSOLUTELY NO decorative status dots / sparkles / "nốt ruồi"
 */

/* ==========================================================================
   1. CORE 4 LANGUAGE & ACADEMIC SKILLS (Reference: The Pencily Signature Vibe)
   ========================================================================== */

/**
 * 1. Listening Skill Icon (Headphones with acoustic wave arcs in sky blue tone)
 */
export function PencilyListeningIcon({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  ...props
}: PencilyIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Outer Headband Arch */}
      <path d="M4 14v-2.5a8 8 0 0 1 16 0V14" />
      {/* Inner Headband Cushion Curve */}
      <path d="M6.5 11.5a5.5 5.5 0 0 1 11 0" />
      {/* Left Rounded Ear Cup */}
      <rect x="2.5" y="12.5" width="3.5" height="7" rx="1.75" />
      {/* Right Rounded Ear Cup */}
      <rect x="18" y="12.5" width="3.5" height="7" rx="1.75" />
      {/* Left Acoustic Sound Chime */}
      <path d="M8.5 14.5a3 3 0 0 1 0 3" />
      {/* Right Acoustic Sound Chime */}
      <path d="M15.5 14.5a3 3 0 0 0 0 3" />
    </svg>
  );
}

/**
 * 2. Reading Skill Icon (Open spread book with layered pages in mint green tone)
 */
export function PencilyReadingIcon({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  ...props
}: PencilyIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Open Book Spine Center */}
      <line x1="12" y1="4.5" x2="12" y2="18.5" />
      {/* Left Main Page Arch */}
      <path d="M12 4.5C9.5 3.2 5.5 3.2 3 4.5v13.5c2.5-1.2 6.5-1.2 9 0" />
      {/* Right Main Page Arch */}
      <path d="M12 4.5C14.5 3.2 18.5 3.2 21 4.5v13.5c-2.5-1.2-6.5-1.2-9 0" />
      {/* Bottom Layered Page Contour for Volume Depth */}
      <path d="M3 20.5c2.5-1.2 6.5-1.2 9 0c2.5-1.2 6.5-1.2 9 0" />
    </svg>
  );
}

/**
 * 3. Writing Skill Icon (Document sheet with lines and angled drafting pencil in warm amber tone)
 */
export function PencilyWritingIcon({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  ...props
}: PencilyIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Document Sheet with Folded Dog-Ear Corner */}
      <path d="M14 2.5H6a2.5 2.5 0 0 0-2.5 2.5v14a2.5 2.5 0 0 0 2.5 2.5h11a2.5 2.5 0 0 0 2.5-2.5V7.5L14 2.5z" />
      <path d="M14 2.5v5h5" />
      {/* Document Text Content Lines */}
      <line x1="7" y1="9" x2="11.5" y2="9" />
      <line x1="7" y1="12" x2="12" y2="12" />
      <line x1="7" y1="15" x2="10" y2="15" />
      {/* Angled Drafting Pencil Laid Across */}
      <path d="M12.5 17.5l5.5-5.5a1.5 1.5 0 0 1 2.1 2.1l-5.5 5.5l-3 1z" />
    </svg>
  );
}

/**
 * 4. Speaking Skill Icon (Dual conversational speech bubbles with profile silhouettes in lilac purple tone)
 */
export function PencilySpeakingIcon({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  ...props
}: PencilyIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Left Rounded Speech Bubble */}
      <path d="M10.5 3.5H4.5a2.5 2.5 0 0 0-2.5 2.5v7.5a2.5 2.5 0 0 0 2.5 2.5h1v3l3.5-3h1.5a2.5 2.5 0 0 0 2.5-2.5V6a2.5 2.5 0 0 0-2.5-2.5z" />
      {/* Left Student Profile Silhouette Contour */}
      <path d="M5.5 6.5h1.2a1 1 0 0 1 .8.4l.7 1.2a.8.8 0 0 1-.2 1.1l-.7.4c-.2.1-.3.3-.2.5l.3.8c.2.4.6.6 1 .6h.6" />
      
      {/* Right Rounded Speech Bubble */}
      <path d="M13.5 6.5h6a2.5 2.5 0 0 1 2.5 2.5v7.5a2.5 2.5 0 0 1-2.5 2.5h-1v3l-3.5-3h-1.5a2.5 2.5 0 0 1-2.5-2.5V9a2.5 2.5 0 0 1 2.5-2.5z" />
      {/* Right Student Profile Silhouette Contour Facing Left */}
      <path d="M18.5 9.5h-1.2a1 1 0 0 0-.8.4l-.7 1.2a.8.8 0 0 0 .2 1.1l.7.4c.2.1.3.3.2.5l-.3.8a1 1 0 0 0 1 .6h.6" />
    </svg>
  );
}

/* ==========================================================================
   2. STANDARDIZED TEST BRAND LOGOS (IELTS & SAT)
   ========================================================================== */

/** Official IELTS Red Wordmark */
export function PencilyIeltsIcon({
  size = 24,
  className = "",
}: {
  size?: number | string;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center justify-center shrink-0 ${className}`}>
      <img
        src="/brand/ielts-logo.png"
        alt="IELTS"
        className="object-contain max-h-full"
        style={{ height: size, width: "auto" }}
      />
    </span>
  );
}

/** Official College Board SAT Acorn & Blue Wordmark */
export function PencilySatIcon({
  size = 24,
  className = "",
}: {
  size?: number | string;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center justify-center shrink-0 ${className}`}>
      <img
        src="/brand/sat-logo.png"
        alt="College Board SAT"
        className="object-contain max-h-full"
        style={{ height: size, width: "auto" }}
      />
    </span>
  );
}

/* ==========================================================================
   3. SQUIRCLE PASTEL TILE CONTAINER (The signature soft aesthetic wrapper)
   ========================================================================== */

export interface PencilySquircleTileProps {
  children: React.ReactNode;
  variant?: "sky" | "emerald" | "amber" | "purple" | "navy" | "rose" | "slate";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  border?: boolean;
}

export function PencilySquircleTile({
  children,
  variant = "sky",
  size = "md",
  className = "",
  border = true,
}: PencilySquircleTileProps) {
  const variantStyles = {
    sky: "bg-[#EAF3FA] text-[#1E3A5F] border-[#CDE1F4]",
    emerald: "bg-[#EAF6EE] text-[#166534] border-[#CCEAD5]",
    amber: "bg-[#FEF1E4] text-[#B45309] border-[#FBD9B9]",
    purple: "bg-[#F3EDF8] text-[#6B2D78] border-[#DFCEEE]",
    navy: "bg-[#EDF2F7] text-[#0F2747] border-[#CBD5E1]",
    rose: "bg-[#FDF2F2] text-[#BE123C] border-[#FECDD3]",
    slate: "bg-slate-100 text-slate-700 border-slate-200",
  }[variant];

  const sizeStyles = {
    xs: "w-7 h-7 rounded-lg text-xs",
    sm: "w-9 h-9 rounded-xl text-sm",
    md: "w-11 h-11 rounded-2xl text-base",
    lg: "w-13 h-13 rounded-2xl text-lg",
    xl: "w-16 h-16 rounded-3xl text-2xl",
  }[size];

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 select-none ${sizeStyles} ${variantStyles} ${
        border ? "border-2 shadow-2xs" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ==========================================================================
   4. PENCILY SIGNATURE PLATFORM ICONS (Revamped with smooth curves & warmth)
   ========================================================================== */

/** 1. My Profile / Student Identity */
export function PencilyProfileIcon({
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  ...props
}: PencilyIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Friendly rounded student head */}
      <circle cx="12" cy="7.5" r="4.5" />
      {/* Soft rounded student hoodie / torso shoulders */}
      <path d="M4.5 20.5c0-3.8 3.3-6.5 7.5-6.5s7.5 2.7 7.5 6.5" />
      {/* Gentle academic neckline */}
      <path d="M9.5 15l2.5 2.5 2.5-2.5" />
    </svg>
  );
}

/** 2. Portfolio / Academic Dossier / Certificate Vault */
export function PencilyPortfolioIcon({
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  ...props
}: PencilyIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Smooth rounded academic case */}
      <rect x="3" y="6" width="18" height="15" rx="3" />
      {/* Rounded ergonomic carry handle */}
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      {/* Clean dossier divider line */}
      <line x1="3" y1="11" x2="21" y2="11" />
      {/* File folder tabs */}
      <line x1="9" y1="11" x2="9" y2="15" />
      <line x1="15" y1="11" x2="15" y2="15" />
    </svg>
  );
}

/** 3. Classrooms / Virtual Blackboard Studio */
export function PencilyClassroomsIcon({
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  ...props
}: PencilyIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Rounded whiteboard screen */}
      <rect x="2.5" y="3.5" width="19" height="13.5" rx="3" />
      {/* Easel stand legs */}
      <path d="M12 17v4.5" />
      <path d="M7 21.5h10" />
      {/* Teaching lesson diagram waveform */}
      <path d="M6 10c2-2.5 4-2.5 6 0s4 2.5 6 0" />
    </svg>
  );
}

/** 4. Settings / Technical Drafting Gear */
export function PencilySettingsIcon({
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  ...props
}: PencilyIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Center circle */}
      <circle cx="12" cy="12" r="3" />
      {/* Friendly rounded gear teeth */}
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

/** 5. Refer a Friend / Peer Megaphone */
export function PencilyReferFriendIcon({
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  ...props
}: PencilyIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Sound propagation waves */}
      <path d="M18 8.5a4 4 0 0 1 0 7" />
      <path d="M21 6a7.5 7.5 0 0 1 0 12" />
      {/* Bullhorn cone */}
      <path d="M15 8L6 4.5a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1l9-3.5V8z" />
      {/* Rounded grip handle */}
      <path d="M5.5 12.5v5a1.5 1.5 0 0 0 1.5 1.5h1.5a1.5 1.5 0 0 0 1.5-1.5v-5" />
    </svg>
  );
}

/** 6. Report a Bug / Geometric Debug Icon */
export function PencilyBugReportIcon({
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  ...props
}: PencilyIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Rounded oval ladybug body */}
      <rect x="6.5" y="8" width="11" height="12" rx="5.5" />
      {/* Head */}
      <path d="M9 8a3 3 0 0 1 6 0" />
      <line x1="12" y1="11" x2="12" y2="18" />
      {/* Curved antennae */}
      <path d="M9 5.5C8 4.2 6.5 4.5 5.5 5" />
      <path d="M15 5.5c1-1.3 2.5-1 3.5-.5" />
      {/* Rounded legs */}
      <path d="M3.5 10l3 1.5M3.5 14h3M3.5 18l3-1.5" />
      <path d="M20.5 10l-3 1.5M20.5 14h-3M20.5 18l-3-1.5" />
    </svg>
  );
}

/** 7. Help Desk / Knowledge Dossier & Guide */
export function PencilyHelpDeskIcon({
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  ...props
}: PencilyIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect x="4" y="3" width="16" height="18" rx="3" />
      {/* Bookmark ribbon */}
      <path d="M8 3v6l2.5-1.5L13 9V3" />
      {/* Help Question mark */}
      <path d="M12 11.5a1.75 1.75 0 0 1 1.75 1.75c0 1.25-1.75 1.5-1.75 2.5" />
      <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth={2.5} />
    </svg>
  );
}

/** 8. Chat with Support / Peer Mentors Desk */
export function PencilySupportChatIcon({
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  ...props
}: PencilyIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Smooth rounded chat bubble with tail */}
      <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.4 0-2.8-.3-4-.9L3 21l1.8-4.8A8.4 8.4 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.5 8.5 0 0 1 21 11.5z" />
      <line x1="8.5" y1="10" x2="16.5" y2="10" />
      <line x1="8.5" y1="13.5" x2="13.5" y2="13.5" />
    </svg>
  );
}

/** 9. Safety Concern & Honor Code Flag */
export function PencilySafetyFlagIcon({
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  ...props
}: PencilyIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <line x1="4.5" y1="2.5" x2="4.5" y2="21.5" />
      {/* Fluttering pennant flag with rounded corners */}
      <path d="M4.5 4h13.5a1.5 1.5 0 0 1 1.2 2.4L16.5 10l2.7 3.6a1.5 1.5 0 0 1-1.2 2.4H4.5" />
    </svg>
  );
}

/** 10. Header Notification Bell */
export function PencilyBellIcon({
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  ...props
}: PencilyIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M6 9a6 6 0 0 1 12 0c0 5.5 2 7.5 2 7.5H4s2-2 2-7.5" />
      <path d="M10.2 19.5a2 2 0 0 0 3.6 0" />
      <path d="M12 2.5v1.5" />
    </svg>
  );
}

/** 11. Header Calendar / Class Schedule */
export function PencilyCalendarIcon({
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  ...props
}: PencilyIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect x="3" y="4" width="18" height="17" rx="3" />
      <line x1="3" y1="9.5" x2="21" y2="9.5" />
      <line x1="8" y1="2" x2="8" y2="5" />
      <line x1="16" y1="2" x2="16" y2="5" />
      {/* Calendar date grid tiles */}
      <rect x="7" y="12.5" width="3" height="3" rx="1" fill="currentColor" stroke="none" />
      <rect x="14" y="12.5" width="3" height="3" rx="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** 12. Message Bubble */
export function PencilyChatBubbleIcon({
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  ...props
}: PencilyIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M20.5 14.5a3 3 0 0 1-3 3H7.5l-4 3.5V5.5a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3z" />
      <line x1="8" y1="8.5" x2="16" y2="8.5" />
      <line x1="8" y1="12" x2="13.5" y2="12" />
    </svg>
  );
}

/** 13. Clean Exit / Logout */
export function PencilyLogOutIcon({
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  ...props
}: PencilyIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

/** 14. Exclusive Pencily Points Token */
export function PencilyPointsToken({
  size = 20,
  className = "",
}: {
  size?: number | string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center font-black text-[10px] tracking-tight bg-[#FFC83D] text-[#0F2747] border-2 border-[#0F2747] rounded-md shadow-2xs select-none shrink-0 ${className}`}
      style={{ width: size, height: size }}
      title="Pencily Points (PP)"
    >
      PP
    </span>
  );
}

/** 15. Explore & Navigation Compass */
export function PencilyCompassIcon({
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  ...props
}: PencilyIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <polygon points="16 8 13.5 13.5 8 16 10.5 10.5 16 8" />
    </svg>
  );
}

/** 16. Store & Point Redemption */
export function PencilyStoreIcon({
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  ...props
}: PencilyIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Scalloped storefront awning canopy */}
      <path d="M3 9l1.5-5h15l1.5 5" />
      <path d="M3 9c0 1.5 1.5 2.5 3 2.5s3-1 3-2.5c0 1.5 1.5 2.5 3 2.5s3-1 3-2.5c0 1.5 1.5 2.5 3 2.5s3-1 3-2.5" />
      <rect x="3.5" y="11.5" width="17" height="9.5" rx="2" />
      <path d="M9 21v-5.5a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5V21" />
    </svg>
  );
}

/** 17. Community & Peer Network */
export function PencilyCommunityIcon({
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  ...props
}: PencilyIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Center primary peer */}
      <circle cx="12" cy="7" r="3.5" />
      <path d="M7 19.5c0-2.8 2.2-5 5-5s5 2.2 5 5" />
      {/* Left peer */}
      <circle cx="5" cy="9" r="2.5" />
      <path d="M1.5 19c0-2 1.8-3.5 3.8-3.5" />
      {/* Right peer */}
      <circle cx="19" cy="9" r="2.5" />
      <path d="M18.7 15.5c2 0 3.8 1.5 3.8 3.5" />
    </svg>
  );
}

/** 18. Shield & Honor Code */
export function PencilyShieldIcon({
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  ...props
}: PencilyIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12 22s8-4 8-10V5.5l-8-3-8 3V12c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

/** 19. Victor Trophy / Academic Honors */
export function PencilyTrophyIcon({
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  ...props
}: PencilyIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M6 3h12v7a6 6 0 0 1-12 0V3z" />
      <path d="M6 5H3.5a2 2 0 0 0-2 2v1a4 4 0 0 0 4 4H6" />
      <path d="M18 5h2.5a2 2 0 0 1 2 2v1a4 4 0 0 1-4 4H18" />
      <path d="M12 16v3" />
      <path d="M8 21h8" />
    </svg>
  );
}

/** 20. Video Classroom Camera */
export function PencilyVideoIcon({
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  ...props
}: PencilyIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect x="2.5" y="5" width="13.5" height="14" rx="3" />
      <path d="M16 10l5.2-3.3a1 1 0 0 1 1.5.9v8.8a1 1 0 0 1-1.5.9L16 14" />
    </svg>
  );
}

/** 21. Microphone Voice Chat */
export function PencilyMicIcon({
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  ...props
}: PencilyIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 10v1a7 7 0 0 0 14 0v-1" />
      <line x1="12" y1="18" x2="12" y2="21" />
      <line x1="8" y1="21" x2="16" y2="21" />
    </svg>
  );
}

/** 22. Search / Magnifying Glass */
export function PencilySearchIcon({
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  ...props
}: PencilyIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="11" cy="11" r="7.5" />
      <line x1="20.5" y1="20.5" x2="16.5" y2="16.5" />
      <path d="M8.5 8.5a3.5 3.5 0 0 1 3.5-1" />
    </svg>
  );
}
