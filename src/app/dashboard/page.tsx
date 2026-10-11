"use client";

import React, { Suspense } from "react";
import { DashboardContent } from "@/components/DashboardContent";

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFF9EF]" />}>
      <DashboardContent defaultTab="calendar" />
    </Suspense>
  );
}
