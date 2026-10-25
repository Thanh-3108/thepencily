"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  AlertTriangle,
  Mail,
  ExternalLink,
  ChevronDown,
  X,
  FileText,
  Clock,
  Shield,
  Layers,
  Sparkles,
} from "lucide-react";
import { DiscordLogo, FacebookLogo } from "@/components/BrandIcons";
import { usePencily } from "@/context/PencilyContext";

export function SiteClosureNotice() {
  const { language } = usePencily();
  const isVi = language === "vi";

  // State to track if the full notice modal is open or minimized to a persistent top banner
  const [isOpen, setIsOpen] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check if the user previously minimized the modal during this browser session
    const hasMinimized = sessionStorage.getItem("pencily_closure_minimized");
    if (hasMinimized === "true") {
      setIsOpen(false);
    }
  }, []);

  const handleMinimize = () => {
    setIsOpen(false);
    try {
      sessionStorage.setItem("pencily_closure_minimized", "true");
    } catch {}
  };

  const handleReopen = () => {
    setIsOpen(true);
    try {
      sessionStorage.removeItem("pencily_closure_minimized");
    } catch {}
  };

  if (!isMounted) return null;

  return (
    <>
      {/* 1. PERSISTENT TOP ALERT STRIP (Visible when minimized, so users always know the site is temporarily offline) */}
      {!isOpen && (
        <aside
          aria-label="Thông báo trạng thái website"
          className="sticky top-0 z-[99990] w-full bg-[#0F2747] text-white border-b-2 border-[#FFC83D] px-4 py-2 text-xs select-none shadow-md"
        >
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 font-medium">
              <span className="px-1.5 py-0.5 rounded-xs bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider">
                {isVi ? "TẠM ĐÓNG CỬA" : "OFFLINE"}
              </span>
              <span className="text-amber-200">
                {isVi
                  ? "Website The Pencily đang tạm thời ngưng hoạt động trực tuyến."
                  : "The Pencily website is temporarily offline."}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://discord.gg/6hpEf4wC4z"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-white/90 hover:text-amber-300 underline font-semibold transition"
              >
                <DiscordLogo className="w-3.5 h-3.5 text-[#5865F2]" />
                <span>Discord</span>
              </a>

              <span className="hidden sm:inline text-white/30">|</span>

              <button
                type="button"
                onClick={handleReopen}
                className="px-2.5 py-1 rounded-xs bg-[#FFC83D] hover:bg-amber-300 text-[#0F2747] font-bold text-xs shadow-2xs transition active:scale-95 cursor-pointer"
              >
                {isVi ? "Xem toàn văn thông báo" : "Read full notice"}
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* 2. FULL OFFICIAL CLOSURE ANNOUNCEMENT MODAL */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="closure-notice-title"
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
        >
          {/* Tactile Parchment Paper Card Container */}
          <div className="relative w-full max-w-2xl bg-[#FFFDF8] rounded-md border-2 border-[#0F2747] shadow-2xl p-6 sm:p-9 my-auto text-[#0F2747]">
            {/* Top Washi Tape Strip */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-36 h-8 pointer-events-none select-none z-20">
              <Image
                src="/brand/elements/washi-tape.jpg"
                alt="Washi Tape"
                fill
                className="object-contain mix-blend-multiply drop-shadow-xs"
              />
            </div>

            {/* Paperclip in corner */}
            <div className="absolute -top-3.5 right-6 w-6 h-12 pointer-events-none select-none z-20 -rotate-12">
              <Image
                src="/brand/elements/paperclip.jpg"
                alt="Paperclip"
                fill
                className="object-contain mix-blend-multiply drop-shadow-2xs"
              />
            </div>

            {/* Header: Official Badge + Title */}
            <div className="text-center pt-2 pb-5 border-b-2 border-slate-200/90">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs bg-amber-100 border border-amber-300 text-amber-950 text-xs font-mono font-bold tracking-widest uppercase mb-3 shadow-2xs">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>
                  {isVi ? "THÔNG BÁO CHÍNH THỨC DỰ ÁN" : "OFFICIAL PROJECT NOTICE"}
                </span>
              </div>

              <h2
                id="closure-notice-title"
                className="font-poppins font-black text-2xl sm:text-3xl text-[#0F2747] tracking-tight text-balance leading-snug"
              >
                {isVi
                  ? "Thông Báo Tạm Dừng Hoạt Động Website"
                  : "Notice of Temporary Website Hiatus"}
              </h2>

              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                {isVi
                  ? "Dự án Học tập Đồng đẳng Phi lợi nhuận The Pencily"
                  : "The Pencily Non-Profit Peer-Learning Initiative"}
              </p>
            </div>

            {/* Status Warning Banner */}
            <div className="mt-5 p-3.5 sm:p-4 rounded-xs bg-amber-50 border-2 border-amber-300/80 text-amber-950 text-xs sm:text-sm leading-relaxed flex items-start gap-3 shadow-2xs">
              <Clock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold text-amber-950 mb-0.5">
                  {isVi
                    ? "Tình trạng hiện tại: Tạm thời không sử dụng Website"
                    : "Current Status: Website is temporarily offline"}
                </strong>
                <span className="text-amber-900/90 text-xs">
                  {isVi
                    ? "Hệ thống web tạm ngưng phục vụ tất cả các tính năng phòng học, thư viện bài giảng và đăng nhập trực tuyến để phục vụ công tác bảo trì & định hướng lại nền tảng."
                    : "All interactive classrooms, video libraries, and web portals are temporarily suspended for system maintenance and strategic restructuring."}
                </span>
              </div>
            </div>

            {/* Letter Body: Heartfelt & Clear Announcement */}
            <div className="my-5 text-xs sm:text-sm leading-relaxed text-slate-700 space-y-3 font-serif">
              <p>
                {isVi
                  ? "Kính gửi quý học sinh, quý phụ huynh, các bạn Peer Tutor và toàn thể cộng đồng The Pencily,"
                  : "To our dear students, parents, peer tutors, and the entire Pencily community,"}
              </p>
              <p className="font-sans text-xs sm:text-sm text-slate-800">
                {isVi
                  ? "Ban Điều Hành The Pencily xin trân trọng gửi lời cảm ơn sâu sắc nhất tới tất cả các bạn đã luôn đồng hành, chia sẻ kiến thức và ủng hộ dự án trong suốt thời gian qua. Để chuẩn bị tốt hơn cho các giai đoạn tiếp theo, website của chúng mình sẽ tạm thời ngưng hoạt động trong thời gian này."
                  : "The Pencily Board of Directors sincerely thanks everyone for learning and sharing with us. To better prepare for our upcoming journey, our web platform is temporarily pausing all online operations at this time."}
              </p>

              <div className="p-3.5 rounded-xs bg-slate-50 border border-slate-200 font-sans not-italic text-xs text-slate-700 space-y-2">
                <div className="font-bold text-[#0F2747] uppercase text-[11px] tracking-wider">
                  {isVi ? "Kênh duy trì hoạt động & liên hệ:" : "Ongoing Channels & Contact:"}
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="px-1.5 py-0.5 rounded-xs bg-slate-200 text-[#0F2747] font-mono font-bold text-[10px] shrink-0 mt-0.5">
                      01
                    </span>
                    <div>
                      <strong className="text-[#0F2747]">Discord:</strong>{" "}
                      {isVi
                        ? "Các hoạt động học tập, chia sẻ tài liệu và kết nối nhóm vẫn tiếp tục diễn ra tại máy chủ Discord."
                        : "Study groups, materials, and peer connections continue actively on our Discord server."}
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="px-1.5 py-0.5 rounded-xs bg-slate-200 text-[#0F2747] font-mono font-bold text-[10px] shrink-0 mt-0.5">
                      02
                    </span>
                    <div>
                      <strong className="text-[#0F2747]">Facebook:</strong>{" "}
                      {isVi
                        ? "Kênh phát hành các thông báo cập nhật, tin tức và kế hoạch tiếp theo của dự án."
                        : "Follow our official page for updates, news, and future roadmaps."}
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="px-1.5 py-0.5 rounded-xs bg-slate-200 text-[#0F2747] font-mono font-bold text-[10px] shrink-0 mt-0.5">
                      03
                    </span>
                    <div>
                      <strong className="text-[#0F2747]">Email:</strong>{" "}
                      {isVi
                        ? "Mọi trao đổi, hỗ trợ hoặc đề xuất hợp tác xin gửi về thepencily@gmail.com."
                        : "For inquiries or partnerships, reach us at thepencily@gmail.com."}
                    </div>
                  </div>
                </div>
              </div>

              <p className="italic text-xs text-slate-600">
                {isVi
                  ? "Rất mong nhận được sự thông cảm của các bạn về sự gián đoạn này. Chúng mình sẽ sớm trở lại với phiên bản hoàn thiện và thiết thực hơn nữa!"
                  : "We appreciate your kind understanding regarding this temporary interruption. We look forward to seeing you soon!"}
              </p>
            </div>

            {/* Official Signature Box */}
            <div className="pt-3 pb-4 border-t border-slate-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xs border-2 border-[#0F2747] overflow-hidden relative shrink-0 shadow-2xs">
                  <Image
                    src="/founder.png"
                    alt="Huỳnh Công Thành - Founder"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-poppins font-black text-xs sm:text-sm text-[#0F2747]">
                    Huỳnh Công Thành
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {isVi ? "Chủ tịch Điều hành & Ban Sáng Lập" : "President & Founder, The Pencily"}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">
                  {isVi ? "HẠN ĐÓNG CỬA" : "STATUS"}
                </span>
                <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-xs inline-block mt-0.5">
                  {isVi ? "Tạm Dừng Web" : "Temporarily Offline"}
                </span>
              </div>
            </div>

            {/* Quick Community Action Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <a
                href="https://discord.gg/6hpEf4wC4z"
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-[#5865F2] hover:bg-[#4752c4] text-white font-bold text-xs shadow-2xs transition active:scale-98 cursor-pointer"
              >
                <DiscordLogo className="w-4 h-4 text-white" />
                <span>{isVi ? "Tham gia Máy chủ Discord" : "Join Pencily Discord"}</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/80" />
              </a>

              <a
                href="https://www.facebook.com/UncleRoThanh/"
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-[#1877F2] hover:bg-[#0c63d4] text-white font-bold text-xs shadow-2xs transition active:scale-98 cursor-pointer"
              >
                <FacebookLogo className="w-4 h-4 text-white" />
                <span>{isVi ? "Ghé thăm Facebook" : "Visit Facebook Page"}</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/80" />
              </a>
            </div>

            {/* Footer with subtle bypass/minimize button for administrators & internal inspection */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <a
                href="mailto:thepencily@gmail.com"
                className="inline-flex items-center gap-1.5 text-slate-500 hover:text-[#0F2747] font-medium"
              >
                <Mail className="w-3.5 h-3.5 text-[#4F7ECB]" />
                <span>thepencily@gmail.com</span>
              </a>

              <button
                type="button"
                onClick={handleMinimize}
                className="text-[11px] text-slate-400 hover:text-slate-700 underline font-medium cursor-pointer transition"
                title="Bỏ qua để xem bản xem trước giao diện nội bộ"
              >
                {isVi ? "Tiếp tục xem giao diện (Nội bộ)" : "Preview interface (Internal)"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
