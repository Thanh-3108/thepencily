"use client";

import React from "react";

export interface PencilyIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
  className?: string;
}

/**
 * THE PENCILY EXCLUSIVE SIGNATURE ICON KIT
 * Design System Rules:
 * - Technical hand-drafted sharp stroke (2px - 2.5px default)
 * - Samsung Galaxy squarish micro-radius (rounded-[1.5px] corners)
 * - Sharp architectural geometry (NO generic rounded chatbot shapes)
 * - Zero decorative status dots / sparkles
 */

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
      {/* Square-cut head with micro corner */}
      <rect x="8" y="3" width="8" height="8" rx="1.5" />
      {/* Angular student collar & torso */}
      <path d="M4 21v-2.5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3V21" />
      <path d="M9 15.5L12 18l3-2.5" />
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
      {/* Architectural portfolio case */}
      <rect x="3" y="6" width="18" height="15" rx="1.5" />
      {/* Crisp technical binder handle */}
      <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
      {/* Notebook ribbon / ruler slot */}
      <line x1="3" y1="11" x2="21" y2="11" />
      <line x1="10" y1="11" x2="10" y2="15" />
      <line x1="14" y1="11" x2="14" y2="15" />
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
      {/* Drafting screen / blackboard */}
      <rect x="2" y="4" width="20" height="13" rx="1.5" />
      {/* Technical stand base */}
      <path d="M12 17v4" />
      <path d="M7 21h10" />
      {/* Chalk / pencil guideline */}
      <line x1="6" y1="9" x2="13" y2="9" />
      <line x1="6" y1="12" x2="18" y2="12" />
    </svg>
  );
}

/** 4. Settings / Technical Drafting Gear (Hexagonal architectural cog) */
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
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
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
      {/* Sharp angled bullhorn */}
      <path d="M18 8a3 3 0 0 1 0 6" />
      <path d="M21 6a6 6 0 0 1 0 10" />
      <path d="M15 8L6 4v12l9-4v-4z" />
      <path d="M6 12v5a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-5" />
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
      {/* Angular bug body */}
      <rect x="7" y="8" width="10" height="11" rx="2" />
      <path d="M10 5a2 2 0 0 1 4 0v3h-4V5z" />
      <line x1="12" y1="11" x2="12" y2="17" />
      {/* Sharp angled legs */}
      <path d="M3 9l4 2M3 14h4M3 19l4-2" />
      <path d="M21 9l-4 2M21 14h-4M21 19l-4-2" />
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
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M9 8h6M9 12h6M9 16h4" />
      <circle cx="16" cy="16" r="0.8" fill="currentColor" />
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
      {/* Geometric sharp speech box */}
      <path d="M4 4h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H8l-5 4V5a1 1 0 0 1 1-1z" />
      <line x1="8" y1="9" x2="16" y2="9" />
      <line x1="8" y1="12" x2="13" y2="12" />
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
      {/* Sharp flag pole & geometric pennant */}
      <line x1="4" y1="3" x2="4" y2="21" />
      <path d="M4 4h14l-3 5 3 5H4V4z" />
    </svg>
  );
}

/** 10. Header Notification Bell (Architectural curved bell) */
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
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
      <rect x="3" y="4" width="18" height="17" rx="1.5" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="8" y1="2" x2="8" y2="5" />
      <line x1="16" y1="2" x2="16" y2="5" />
      {/* Calendar grid check */}
      <rect x="7" y="12" width="3" height="3" fill="currentColor" stroke="none" />
      <rect x="14" y="12" width="3" height="3" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** 12. Message Bubble with Badge counter */
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
      {/* Elegant speech bubble with rounded corners and message lines */}
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <line x1="8" y1="9" x2="16" y2="9" />
      <line x1="8" y1="13" x2="13" y2="13" />
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
      <path d="M9 21H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

/** 14. Exclusive Pencily Points Token (Replaces generic sparkles/stars) */
export function PencilyPointsToken({
  size = 18,
  className = "",
}: {
  size?: number | string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center font-black text-[10px] tracking-tight bg-[#FFC83D] text-[#0F2747] border border-[#0F2747] rounded-xs select-none shrink-0 ${className}`}
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
      <rect x="3" y="3" width="18" height="18" rx="2" />
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
      <path d="M3 9l2-5h14l2 5" />
      <rect x="3" y="9" width="18" height="12" rx="1.5" />
      <path d="M9 21v-7h6v7" />
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
      <rect x="2" y="5" width="6" height="6" rx="1" />
      <path d="M2 17v-1.5a2.5 2.5 0 0 1 2.5-2.5h1" />
      <rect x="16" y="5" width="6" height="6" rx="1" />
      <path d="M22 17v-1.5a2.5 2.5 0 0 0-2.5-2.5h-1" />
      <rect x="9" y="3" width="6" height="6" rx="1" />
      <path d="M6 19v-2a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v2" />
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}
