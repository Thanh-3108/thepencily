"use client";

import React, { useState, useEffect } from "react";

export function SiteClosureNotice() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[99999] flex items-center justify-center p-6 backdrop-blur-md bg-[#FAF7EE]/80 select-none"
    >
      <p className="font-poppins font-medium text-base sm:text-lg text-[#0F2747] text-center tracking-tight max-w-lg leading-relaxed">
        Trang web tạm chưa hoạt động, vui lòng đợi thông báo chính thức
      </p>
    </div>
  );
}
