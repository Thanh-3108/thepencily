"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Quote,
  Mail,
  GraduationCap,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { FacebookLogo } from "@/components/BrandIcons";
import { usePencily } from "@/context/PencilyContext";
import { PencilyScrollReveal } from "@/components/PencilyScrollReveal";
import { OwlMascot, PencilMascot } from "@/components/Logo";

export function HomeStudentStories() {
  const { language } = usePencily();
  const isVi = language === "vi";

  const boardOfDirectors = [
    {
      roleVi: "Chủ tịch & Sáng lập",
      roleEn: "President & Founder",
      name: "Huỳnh Công Thành",
      school: "Phổ Thông Năng Khiếu, ĐHQG-HCM",
      quoteVi: "“Dậy sớm lúc 3 giờ sáng vì muốn nhìn The Pencily ngày một hoàn thiện hơn mỗi ngày.”",
      quoteEn: "“Waking up at 3 AM to make sure every corner of The Pencily feels genuinely welcoming.”",
      tapeColor: "#FCE7A2",
      tapeRotate: "-rotate-2",
      badgeBg: "bg-[#FFF6DC] text-amber-800",
      email: "hhuuyynnhhccoonnggtthhaannhh@gmail.com",
      facebook: {
        label: "Cong Thanh",
        url: "https://www.facebook.com/UncleRoThanh/",
      },
      image: "/founder.png",
      rotation: "sm:-rotate-[0.75deg]",
    },
    {
      roleVi: "Phó Chủ tịch Vận hành",
      roleEn: "Vice Operational President",
      name: "Hồ Bảo Ngân",
      school: "Phổ Thông Năng Khiếu, ĐHQG-HCM",
      quoteVi: "“Nói ít làm nhiều, âm thầm giữ nhịp để mỗi buổi học nhóm đều diễn ra trọn vẹn.”",
      quoteEn: "“Actions speak louder than words, keeping every weekly study pod running seamlessly.”",
      tapeColor: "#D8E8FF",
      tapeRotate: "rotate-2",
      badgeBg: "bg-[#EEF5FF] text-[#3B6FD8]",
      email: "hobaongan1707@gmail.com",
      facebook: {
        label: "Bảo Ngân",
        url: "https://www.facebook.com/bao.ngan.981769/",
      },
      image: "/bao-ngan.jpg",
      rotation: "sm:rotate-[0.75deg]",
    },
    {
      roleVi: "Phó Chủ tịch Cộng đồng",
      roleEn: "Vice Community President",
      name: "Nguyễn Dương Thuỷ Trâm",
      school: "Dong A University",
      quoteVi: "“Dễ tính nhưng cầu toàn — chỉ mong bạn nào vào lớp cũng cảm thấy được lắng nghe.”",
      quoteEn: "“Warm and detail-oriented — making sure every student feels truly heard and supported.”",
      tapeColor: "#D6F5E3",
      tapeRotate: "-rotate-1",
      badgeBg: "bg-[#E8F8F0] text-emerald-700",
      email: "ngdttram07@gmail.com",
      facebook: {
        label: "Thủy Trâm",
        url: "https://www.facebook.com/share/18F3kZ2Vv7/?mibextid=wwXIfr",
      },
      image: "/thuy-tram.png",
      rotation: "sm:-rotate-[0.5deg]",
    },
    {
      roleVi: "Cố vấn & Đồng sáng lập",
      roleEn: "Advisor & Co-Founder",
      name: "Dương Quang Minh Khoa",
      school: "Phổ Thông Năng Khiếu, ĐHQG-HCM",
      quoteVi: "“Châm ngôn làm việc: im lặng tập trung vào chất lượng học thuật và sản phẩm.”",
      quoteEn: "“Quiet focus, deep academic rigor, and thoughtful guidance behind the scenes.”",
      tapeColor: "#E8E3FF",
      tapeRotate: "rotate-2",
      badgeBg: "bg-[#F0EDFF] text-indigo-700",
      image: "/co-founder.png",
      rotation: "sm:rotate-[0.5deg]",
    },
  ];

  return (
    <section id="stories" className="scroll-mt-6 pt-20 sm:pt-28 pb-6">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <PencilyScrollReveal animation="bounce-up" delay={50}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div className="max-w-xl">
              <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#F0EDFF] text-indigo-700 text-xs font-semibold mb-3">
                {isVi ? "Đội ngũ đứng sau The Pencily" : "The Students Behind The Pencily"}
              </div>
              <h2 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-[42px] text-[#0F2747] tracking-tight text-balance leading-tight">
                {isVi ? "Những người bạn sáng lập & điều hành" : "Meet Our Founding Team"}
              </h2>
              <p className="text-sm sm:text-base text-[#526277] mt-2 leading-relaxed">
                {isVi
                  ? "Từ những buổi tự học nhóm tại trường Phổ Thông Năng Khiếu đến một dự án học tập mở cho mọi học sinh."
                  : "Started by high school students who believe great peer support should belong to everyone."}
              </p>
            </div>

            {/* Official Paper Sticker Badge */}
            <PencilyScrollReveal animation="stamp" delay={120} rotate="-6deg" className="shrink-0 self-start sm:self-auto">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 select-none pointer-events-none transform -rotate-6 hover:rotate-0 transition-transform">
                <Image
                  src="/brand/elements/pencily-paper-badge.png"
                  alt="The Pencily Official Badge"
                  fill
                  className="object-contain drop-shadow-sm"
                />
              </div>
            </PencilyScrollReveal>
          </div>
        </PencilyScrollReveal>

        {/* Unified 4 Warm Leadership Cards with Crisp Vector Washi Tape (Zero Blurry JPG Boxes, Zero Placeholder Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {boardOfDirectors.map((member, idx) => (
            <PencilyScrollReveal
              key={member.name}
              animation={idx % 2 === 0 ? "tilt-left" : "tilt-right"}
              delay={idx * 100}
              rotate={member.rotation?.includes("-") ? "-0.5deg" : "0.5deg"}
              className="h-full"
            >
              <div
                className={`bg-white rounded-3xl p-7 border border-[#E6DEC8] hover:border-[#4F7ECB]/40 shadow-pencily-soft shadow-pencily-hover transition-all duration-300 flex flex-col justify-between relative group ${member.rotation} hover:rotate-0 h-full`}
              >
                {/* Clean Semi-Translucent SVG Washi Tape */}
                <div
                  aria-hidden="true"
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 ${member.tapeRotate} pointer-events-none select-none opacity-90 drop-shadow-2xs`}
                >
                  <svg viewBox="0 0 120 28" className="w-full h-full">
                    <path
                      d="M4,2 L116,3 L112,14 L117,25 L3,26 L7,14 Z"
                      fill={member.tapeColor}
                    />
                    <path
                      d="M15,14 L30,10 M45,17 L65,12 M85,15 L100,11"
                      stroke="#0F2747"
                      strokeOpacity="0.12"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div>
                  {/* Top: Warm Portrait & Role */}
                  <div className="flex items-center gap-4 mb-5 pt-2">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl border-2 border-[#FFF6DC] bg-[#FAF7EE] shrink-0 overflow-hidden relative shadow-sm group-hover:scale-105 transition-transform">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="72px"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className={`inline-block text-[11px] font-semibold px-3 py-0.5 rounded-full mb-1.5 ${member.badgeBg}`}>
                        {isVi ? member.roleVi : member.roleEn}
                      </span>
                      <h3 className="font-poppins font-bold text-lg sm:text-xl text-[#0F2747] truncate">
                        {member.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-[#6B7A90] mt-0.5">
                        <GraduationCap className="w-3.5 h-3.5 text-[#4F7ECB] shrink-0" />
                        <span className="truncate">{member.school}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quote Card */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7EE]/85 border border-[#ECE4CE] mb-5 relative">
                    <Quote className="w-4 h-4 text-[#FFC83D] shrink-0 mb-1.5" />
                    <p className="font-serif italic text-sm text-[#0F2747] leading-relaxed">
                      {isVi ? member.quoteVi : member.quoteEn}
                    </p>
                  </div>
                </div>

                {/* Soft Contact Pills */}
                <div className="flex flex-wrap gap-2 text-xs">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      title={member.email}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF7EE] hover:bg-[#FFF6DC] text-[#0F2747] border border-[#E6DEC8] transition font-medium cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#4F7ECB]" />
                      <span className="max-w-[165px] truncate">{member.email}</span>
                    </a>
                  )}

                  {member.facebook && (
                    <a
                      href={member.facebook.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EEF5FF] hover:bg-[#DDEBFF] text-[#1877F2] transition font-medium cursor-pointer"
                    >
                      <FacebookLogo className="w-3.5 h-3.5" />
                      <span>{member.facebook.label}</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  )}
                </div>
              </div>
            </PencilyScrollReveal>
          ))}
        </div>

        {/* Joyful Closing Invitation Banner (Replaces the Slop Placeholder Cards!) */}
        <PencilyScrollReveal animation="bounce-up" delay={100}>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFF6DC] via-[#FFFDF8] to-[#EAF2FF] border border-[#E6DEC8] p-8 sm:p-12 shadow-pencily-soft">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/90 border border-[#E6DEC8] text-[#0F2747] text-xs font-semibold">
                  <span>{isVi ? "Cùng bắt đầu nhé!" : "Ready to start?"}</span>
                </div>
                <h2 className="font-poppins font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0F2747] tracking-tight text-balance">
                  {isVi
                    ? "Tìm cho mình một nhóm học nhỏ ấm áp ngay hôm nay"
                    : "Find your supportive study pod today"}
                </h2>
                <p className="text-sm sm:text-base text-[#526277] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  {isVi
                    ? "Hoàn toàn miễn phí, không áp lực điểm số. Bạn có thể tham gia học cùng Peer Tutor hoặc đăng ký mở lớp chia sẻ kiến thức của riêng mình."
                    : "Completely free and pressure-free. Join an interactive session with Peer Tutors or apply to host a study pod of your own."}
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
                  <Link
                    href="/dashboard?tab=classes"
                    className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#0F2747] hover:bg-[#193B6B] text-white font-semibold text-sm shadow-tactile-navy transition-all"
                  >
                    <span>{isVi ? "Khám phá các lớp học" : "Explore Study Rooms"}</span>
                    <ArrowRight className="w-4 h-4 text-[#FFC83D] transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href="/signin?mode=register"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#FAF7EE] text-[#0F2747] border border-[#DED5BE] font-semibold text-sm shadow-tactile-slate transition-all"
                  >
                    <span>{isVi ? "Tạo tài khoản miễn phí" : "Create Free Account"}</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4 flex items-center justify-center gap-2">
                <div className="animate-bubble-float-a">
                  <OwlMascot size="xl" className="drop-shadow-md" />
                </div>
                <div className="animate-bubble-float-b hidden sm:block">
                  <PencilMascot size="lg" className="drop-shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        </PencilyScrollReveal>
      </div>
    </section>
  );
}
