"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Users, GraduationCap, HeartHandshake, BookOpen, Sparkles } from "lucide-react";
import { usePencily } from "@/context/PencilyContext";
import { PencilyScrollReveal } from "@/components/PencilyScrollReveal";

export function HomeHowItWorks() {
  const { language } = usePencily();
  const isVi = language === "vi";
  const [activeBubble, setActiveBubble] = useState<number | null>(null);

  // 5 Signature Floating Bubbles with numbers & core metrics requested by user
  const bubbles = [
    {
      id: 1,
      number: "100%",
      numberLabel: isVi ? "Phi lợi nhuận" : "Non-Profit",
      title: isVi ? "Lớp tình nguyện" : "Volunteer Classes",
      subtitle: isVi ? "100% Miễn phí & Tự nguyện" : "100% Free & Open Access",
      desc: isVi
        ? "Mọi lớp học và tài liệu tại The Pencily đều hoàn toàn không thu phí. Hoạt động trên tinh thần chia sẻ phi lợi nhuận từ học sinh dành cho học sinh."
        : "All classes and materials are completely free of charge, operating on a student-to-student non-profit spirit.",
      highlight: isVi ? "0đ Phí • Mở cho mọi học sinh" : "0 VND • Open for all",
      icon: HeartHandshake,
      accentColor: "#10B981", // Emerald
      glowColor: "rgba(16, 185, 129, 0.16)",
      ringColor: "border-emerald-200/90",
      pillBg: "bg-emerald-50 text-emerald-800 border-emerald-200",
      floatClass: "animate-bubble-float-a",
      bubbleSize: "w-[295px] h-[295px] sm:w-[330px] sm:h-[330px]",
    },
    {
      id: 2,
      number: "60'",
      numberLabel: isVi ? "Thời lượng vàng" : "Golden Duration",
      title: isVi ? "60 Phút mỗi buổi" : "60-Min Sessions",
      subtitle: isVi ? "Gọn gàng - Thực chiến - Không dàn trải" : "Concise & Focused Structure",
      desc: isVi
        ? "Thiết kế chuẩn khung giờ tập trung cao độ của học sinh: 15' tóm lược kiến thức cốt lõi, 35' chữa bài giải đề trực tiếp và 10' giải đáp mọi thắc mắc."
        : "Optimized for prime student focus: 15m core theory, 35m hands-on problem solving, and 10m interactive Q&A.",
      highlight: isVi ? "15' Lý thuyết • 35' Chữa đề • 10' Q&A" : "15m Theory • 35m Practice • 10m Q&A",
      icon: Clock,
      accentColor: "#FFC83D", // Golden Pencil
      glowColor: "rgba(255, 200, 61, 0.22)",
      ringColor: "border-amber-200/90",
      pillBg: "bg-amber-50 text-amber-900 border-amber-200",
      floatClass: "animate-bubble-float-b",
      bubbleSize: "w-[290px] h-[290px] sm:w-[320px] sm:h-[320px]",
    },
    {
      id: 3,
      number: "Peer",
      numberLabel: isVi ? "Học sinh dạy học sinh" : "Student to Student",
      title: isVi ? "Tutor là học sinh" : "Student Peer Tutors",
      subtitle: isVi ? "Đồng đẳng - Thấu hiểu - Không khoảng cách" : "Empathetic & Relatable Guidance",
      desc: isVi
        ? "Người hướng dẫn là chính các bạn học sinh chuyên hoặc đạt thành tích xuất sắc. Cùng thế hệ nên dễ đồng cảm với áp lực, giải thích mộc mạc và dễ hiểu."
        : "Tutors are high-achieving peers from specialized schools who explain tough concepts with zero pressure or condescension.",
      highlight: isVi ? "Không sợ hỏi câu ngố • Dễ đồng cảm" : "Zero judgment • Shared perspective",
      icon: GraduationCap,
      accentColor: "#4F7ECB", // Brand Ink Blue
      glowColor: "rgba(79, 126, 203, 0.2)",
      ringColor: "border-blue-200/90",
      pillBg: "bg-blue-50 text-blue-900 border-blue-200",
      floatClass: "animate-bubble-float-c",
      bubbleSize: "w-[295px] h-[295px] sm:w-[330px] sm:h-[330px]",
    },
    {
      id: 4,
      number: "3 – 8",
      numberLabel: isVi ? "Quy mô nhóm nhỏ" : "Cozy Micro-Pods",
      title: isVi ? "Nhóm nhỏ ấm cúng" : "Small Study Pods",
      subtitle: isVi ? "Tương tác sâu - Mọi câu hỏi đều được đáp" : "High Engagement & Open Voice",
      desc: isVi
        ? "Mỗi phòng học chỉ duy trì từ 3 đến 8 bạn. Không gian thân mật giúp bạn thoải mái bật mic, chia sẻ màn hình bài làm mà không ngại đám đông."
        : "Pods of only 3 to 8 learners ensure everyone can turn on their mic, share problem steps, and get direct tutor attention.",
      highlight: isVi ? "Bật mic tự do • Không bị bỏ lại phía sau" : "Open mic • No one left behind",
      icon: Users,
      accentColor: "#8B5CF6", // Violet (matching reference image)
      glowColor: "rgba(139, 92, 246, 0.18)",
      ringColor: "border-purple-200/90",
      pillBg: "bg-purple-50 text-purple-900 border-purple-200",
      floatClass: "animate-bubble-float-d",
      bubbleSize: "w-[290px] h-[290px] sm:w-[320px] sm:h-[320px]",
    },
    {
      id: 5,
      number: "24/7",
      numberLabel: isVi ? "Kho lưu trữ mở" : "Open Archives",
      title: isVi ? "Cornell & Discord" : "Cornell Notes & Discord",
      subtitle: isVi ? "Học mọi lúc - Ôn tập mọi nơi" : "Learn anytime, Anywhere",
      desc: isVi
        ? "Đề cương Cornell tổng hợp, sơ đồ tư duy và phòng tự học voice Discord luôn sẵn sàng 24/7 để bạn xem lại bài giảng và tự học bất cứ khi nào."
        : "Cornell study sheets, summary mindmaps, and 24/7 Discord study voice lounges are always open whenever inspiration strikes.",
      highlight: isVi ? "Đề cương chuẩn hóa • Phòng voice Discord" : "Vetted notes • 24/7 voice pods",
      icon: BookOpen,
      accentColor: "#0284C7", // Cyan / Ocean
      glowColor: "rgba(2, 132, 199, 0.18)",
      ringColor: "border-sky-200/90",
      pillBg: "bg-sky-50 text-sky-900 border-sky-200",
      floatClass: "animate-bubble-float-e",
      bubbleSize: "w-[290px] h-[290px] sm:w-[320px] sm:h-[320px]",
    },
  ];

  // Whimsical micro satellite bubbles drifting around the scene (like in the reference image)
  const satelliteBubbles = [
    { textVi: "0đ Học phí", textEn: "0 VND Tuition", top: "8%", left: "6%", size: "w-20 h-20", anim: "animate-bubble-float-c" },
    { textVi: "Live Discord", textEn: "Live Discord", top: "18%", right: "8%", size: "w-24 h-24", anim: "animate-bubble-float-a" },
    { textVi: "Cornell Notes", textEn: "Cornell Notes", top: "52%", left: "4%", size: "w-22 h-22", anim: "animate-bubble-float-e" },
    { textVi: "Bật mic hỏi bài", textEn: "Open Mic", top: "68%", right: "6%", size: "w-24 h-24", anim: "animate-bubble-float-b" },
    { textVi: "Không phán xét", textEn: "Zero Stress", bottom: "10%", left: "10%", size: "w-22 h-22", anim: "animate-bubble-float-d" },
  ];

  return (
    <section id="how-it-works" className="pt-20 sm:pt-28 pb-16 relative overflow-hidden">
      {/* Background Soft Watercolor / Graphite Wash reflecting The Pencily Stationery Vibe */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none -z-10"
      >
        {/* Soft atmospheric gradient glows in brand colors */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-b from-sky-100/40 via-blue-50/20 to-transparent rounded-full blur-3xl opacity-70" />
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl" />

        {/* Delicate stationery grid watermark */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#0F2747 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <PencilyScrollReveal animation="bounce-up" delay={50}>
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs bg-blue-50 border border-blue-200 text-xs font-bold uppercase tracking-wider text-[#4F7ECB] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#FFC83D]" />
              <span>{isVi ? "Mô hình vận hành đồng đẳng" : "Peer-to-Peer Operating Model"}</span>
            </div>
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0F2747] tracking-tight text-balance mb-4">
              {isVi ? "Cách The Pencily hoạt động" : "How The Pencily Works"}
            </h2>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-2xl mx-auto">
              {isVi
                ? "Các buổi học được vận hành như những quả bong bóng tri thức nổi nhẹ nhàng: hoàn toàn tự nguyện, không áp lực điểm số, thời lượng 60 phút gọn gàng và tương tác trực tiếp."
                : "Sessions float like lightweight bubbles of insight: 100% voluntary, zero judgment, compact 60-minute duration, and interactive peer guidance."}
            </p>
          </div>
        </PencilyScrollReveal>

        {/* Small floating satellite bubbles (Reference image aesthetic) */}
        <div className="hidden lg:block pointer-events-none select-none" aria-hidden="true">
          {satelliteBubbles.map((sat, idx) => (
            <div
              key={idx}
              className={`absolute ${sat.anim} ${sat.size} rounded-full backdrop-blur-md bg-white/70 border-2 border-white/80 flex items-center justify-center p-2 text-center shadow-[0_8px_24px_rgba(15,39,71,0.06),inset_0_2px_8px_rgba(255,255,255,0.9)]`}
              style={{
                top: sat.top,
                bottom: sat.bottom,
                left: sat.left,
                right: sat.right,
              }}
            >
              {/* Bubble reflection highlight */}
              <div className="absolute top-1.5 left-2.5 w-4 h-2 rounded-full bg-white/80 blur-[0.5px] -rotate-45" />
              <span className="text-[10px] font-bold text-[#0F2747]/70 leading-tight">
                {isVi ? sat.textVi : sat.textEn}
              </span>
            </div>
          ))}
        </div>

        {/* Constellation / Ascension Connecting Lines (Desktop SVG) */}
        <div className="relative">
          <svg
            aria-hidden="true"
            className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none -z-10"
            viewBox="0 0 1000 850"
            fill="none"
          >
            {/* Soft ascending connecting constellation lines */}
            <path
              d="M 500 130 C 580 180, 680 240, 720 320"
              stroke="#4F7ECB"
              strokeWidth="1.8"
              strokeDasharray="4 6"
              strokeOpacity="0.4"
            />
            <path
              d="M 500 130 C 420 180, 320 240, 280 320"
              stroke="#4F7ECB"
              strokeWidth="1.8"
              strokeDasharray="4 6"
              strokeOpacity="0.4"
            />
            <path
              d="M 280 380 C 340 480, 420 500, 500 520"
              stroke="#FFC83D"
              strokeWidth="1.8"
              strokeDasharray="4 6"
              strokeOpacity="0.5"
            />
            <path
              d="M 720 380 C 660 480, 580 500, 500 520"
              stroke="#FFC83D"
              strokeWidth="1.8"
              strokeDasharray="4 6"
              strokeOpacity="0.5"
            />
            <path
              d="M 500 580 C 500 640, 500 680, 500 720"
              stroke="#10B981"
              strokeWidth="1.8"
              strokeDasharray="4 6"
              strokeOpacity="0.4"
            />
          </svg>

          {/* Floating Bubbles Ascension Grid (Organic, whimsical layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 items-center justify-items-center relative z-10 py-6">
            {bubbles.map((b, idx) => {
              const Icon = b.icon;
              const isActive = activeBubble === b.id;

              // Give staggered vertical positioning on desktop to mimic the organic ascension in reference image
              const desktopOffsetClass =
                idx === 0
                  ? "lg:col-span-3 lg:mb-4" // Apex Bubble
                  : idx === 1
                  ? "lg:col-span-1 lg:-translate-y-4"
                  : idx === 2
                  ? "lg:col-span-1 lg:translate-y-6"
                  : idx === 3
                  ? "lg:col-span-1 lg:-translate-y-2"
                  : "lg:col-span-3 lg:mt-6"; // Foundation Bubble

              return (
                <div
                  key={b.id}
                  className={`w-full flex justify-center ${desktopOffsetClass}`}
                  onMouseEnter={() => setActiveBubble(b.id)}
                  onMouseLeave={() => setActiveBubble(null)}
                >
                  <PencilyScrollReveal
                    animation="bounce-up"
                    delay={idx * 120}
                    className="flex justify-center"
                  >
                    {/* The Buoyant Floating Bubble Container */}
                    <div
                      className={`group relative ${b.floatClass} ${b.bubbleSize} rounded-full transition-transform duration-500 ease-out hover:scale-105 cursor-pointer`}
                      style={{
                        // 3D Glassmorphic Spherical Soap Bubble with specular reflections
                        background:
                          "radial-gradient(circle at 35% 28%, rgba(255, 255, 255, 0.98) 0%, rgba(250, 247, 242, 0.88) 50%, rgba(240, 246, 255, 0.78) 100%)",
                        boxShadow: `0 22px 50px -10px ${b.glowColor}, inset 0 2px 20px rgba(255, 255, 255, 0.95), inset 0 -12px 28px ${b.glowColor}`,
                      }}
                    >
                      {/* Specular curved reflection glare at top-left (Soap bubble sheen) */}
                      <div
                        aria-hidden="true"
                        className="absolute top-4 left-8 sm:top-5 sm:left-10 w-24 sm:w-28 h-10 sm:h-12 rounded-full bg-white/70 blur-[1px] -rotate-35 pointer-events-none select-none"
                      />

                      {/* Secondary soft rim highlight at bottom-right */}
                      <div
                        aria-hidden="true"
                        className="absolute bottom-5 right-8 w-16 h-8 rounded-full bg-sky-200/40 blur-[2px] -rotate-25 pointer-events-none select-none"
                      />

                      {/* Bubble Outer Ring Border */}
                      <div
                        className={`absolute inset-0 rounded-full border-2 ${b.ringColor} transition-colors group-hover:border-[#0F2747]/40 pointer-events-none`}
                      />

                      {/* Inside Bubble: Crisp, Readable Micro-Interface (as in user image) */}
                      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 sm:p-8 text-center select-none">
                        {/* Top Category Chip */}
                        <div
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-xs border text-[10px] font-bold uppercase tracking-wider mb-1.5 ${b.pillBg} shadow-2xs`}
                        >
                          <Icon className="w-3 h-3" />
                          <span>{b.numberLabel}</span>
                        </div>

                        {/* Large Highlighted Number/Metric */}
                        <div className="font-poppins font-black text-3xl sm:text-4xl lg:text-[42px] tracking-tight text-[#0F2747] leading-none mb-1 group-hover:text-[#4F7ECB] transition-colors">
                          {b.number}
                        </div>

                        {/* Title */}
                        <h3 className="font-poppins font-bold text-sm sm:text-base text-[#0F2747] mb-1 leading-snug">
                          {b.title}
                        </h3>

                        {/* Subtitle / Value prop */}
                        <div className="text-[11px] font-semibold text-[#4F7ECB] mb-2 leading-tight">
                          {b.subtitle}
                        </div>

                        {/* Description (Tailored for concise bubble display) */}
                        <p className="text-[11px] sm:text-xs text-[#475569] leading-relaxed max-w-[210px] sm:max-w-[240px] mb-2.5 line-clamp-3">
                          {b.desc}
                        </p>

                        {/* Micro Highlight Tag */}
                        <div className="mt-auto pt-1">
                          <span className="inline-block text-[10px] font-bold text-[#0F2747] bg-white/90 border border-slate-200 px-2 py-0.5 rounded-xs shadow-2xs">
                            {b.highlight}
                          </span>
                        </div>
                      </div>
                    </div>
                  </PencilyScrollReveal>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Stationery Prompt & Direct Link to Classes */}
        <PencilyScrollReveal animation="stamp" delay={200} className="mt-12 sm:mt-16">
          <div className="bg-white rounded-md border-2 border-slate-300 p-6 sm:p-7 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-xs font-bold uppercase tracking-wider text-[#4F7ECB]">
                {isVi ? "Sẵn sàng trải nghiệm?" : "Ready to Experience?"}
              </div>
              <h4 className="font-poppins font-bold text-lg text-[#0F2747]">
                {isVi
                  ? "Tìm một buổi học phù hợp với thời gian biểu của bạn"
                  : "Find a study session matching your schedule"}
              </h4>
              <p className="text-xs text-slate-500">
                {isVi
                  ? "Đăng ký chỉ với 1 click, không thủ tục rườm rà, vào học ngay trên Discord hoặc Web."
                  : "One-click registration, zero red tape, jump straight into study pods on Discord or Web."}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#0F2747] hover:bg-slate-800 text-white font-bold text-xs shadow-2xs transition active:scale-98"
              >
                <span>{isVi ? "Xem lịch mở lớp" : "Browse Open Classes"}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FFC83D]" />
              </Link>
            </div>
          </div>
        </PencilyScrollReveal>
      </div>
    </section>
  );
}
