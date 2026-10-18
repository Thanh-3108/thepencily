"use client";

import React from "react";
import Image from "next/image";
import {
  Quote,
  User,
  Mail,
  Phone,
  GraduationCap,
  ExternalLink,
} from "lucide-react";
import { FacebookLogo, DiscordLogo } from "@/components/BrandIcons";
import { usePencily } from "@/context/PencilyContext";
import { PencilyScrollReveal } from "@/components/PencilyScrollReveal";

export function HomeStudentStories() {
  const { language } = usePencily();
  const isVi = language === "vi";

  const boardOfDirectors = [
    {
      role: "President",
      name: "Huỳnh Công Thành",
      titleVi: "Chủ tịch Điều hành Dự án",
      titleEn: "Project President",
      levelVi: "THPT",
      levelEn: "High School",
      school: "Phổ Thông Năng Khiếu, ĐHQG-HCM",
      quoteVi: "“Dậy sớm lúc 3 giờ sáng vì phải quản lý The Pencily.”",
      quoteEn: "“Waking up at 3 AM because I have to manage The Pencily.”",
      washiTape: "/brand/elements/washi-tape.jpg",
      hasClip: true,
      email: "hhuuyynnhhccoonnggtthhaannhh@gmail.com",
      phone: "0909945423",
      facebook: {
        label: "Cong Thanh",
        url: "https://www.facebook.com/UncleRoThanh/",
      },
      discord: "hcongthanh",
      image: "/founder.png",
      initials: "CT",
      rotation: "sm:-rotate-[0.75deg]",
    },
    {
      role: "Vice Operational President",
      name: "Hồ Bảo Ngân",
      titleVi: "Phó Chủ tịch Vận hành & Kỷ luật",
      titleEn: "Vice Operational President",
      levelVi: "THPT",
      levelEn: "High School",
      school: "Phổ Thông Năng Khiếu, ĐHQG-HCM",
      quoteVi: "[placeholder]",
      quoteEn: "[placeholder]",
      washiTape: "/brand/elements/washi-tape-blue.jpg",
      hasClip: false,
      email: "hobaongan1707@gmail.com",
      phone: "0777170711",
      facebook: {
        label: "Bảo Ngân",
        url: "https://www.facebook.com/bao.ngan.981769/",
      },
      discord: "selene_1711",
      image: "/bao-ngan.jpg",
      initials: "BN",
      rotation: "sm:rotate-[0.75deg]",
    },
    {
      role: "Vice Community President",
      name: "Nguyễn Dương Thuỷ Trâm",
      titleVi: "Phó Chủ tịch Phụ trách Cộng đồng",
      titleEn: "Vice Community President",
      levelVi: "Đại học",
      levelEn: "University",
      school: "Dong A University",
      quoteVi: "[placeholder]",
      quoteEn: "[placeholder]",
      washiTape: "/brand/elements/washi-tape.jpg",
      hasClip: false,
      email: "ngdttram07@gmail.com",
      phone: "0388272007",
      facebook: {
        label: "Thủy Trâm",
        url: "https://www.facebook.com/share/18F3kZ2Vv7/?mibextid=wwXIfr",
      },
      image: "/thuy-tram.png",
      initials: "TT",
      rotation: "sm:-rotate-[0.5deg]",
    },
    {
      role: "Advisor",
      name: "Dương Quang Minh Khoa",
      titleVi: "Cố Vấn & Đồng Sáng Lập",
      titleEn: "Advisor & Co-Founder",
      levelVi: "THPT",
      levelEn: "High School",
      school: "Phổ Thông Năng Khiếu, ĐHQG-HCM",
      quoteVi: "“Châm ngôn làm việc không chat, không lộ mặt”",
      quoteEn: "“Working motto: no chatting, no face reveal”",
      washiTape: "/brand/elements/washi-tape-blue.jpg",
      hasClip: true,
      discord: "god_daren",
      image: "/co-founder.png",
      initials: "MK",
      rotation: "sm:rotate-[0.5deg]",
    },
  ];

  return (
    <section id="stories" className="pt-20 sm:pt-28">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <PencilyScrollReveal animation="bounce-up" delay={50}>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="text-xs font-bold uppercase tracking-wider text-[#4F7ECB] mb-2">
              {isVi ? "Sáng lập dự án" : "Founders"}
            </div>
            <h2 className="font-poppins font-black text-2xl sm:text-3xl text-[#0F2747] tracking-tight text-balance">
              {isVi ? "Ban Sáng Lập" : "Founding Board"}
            </h2>
          </div>
        </PencilyScrollReveal>

        {/* 1. FOUNDING BOARD: Clean & minimal - Just Avatar & Name */}
        <div className="flex items-center justify-center gap-12 sm:gap-24 mb-16">
          {/* Huỳnh Công Thành */}
          <PencilyScrollReveal animation="tilt-left" delay={100} rotate="-1.2deg">
            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-md border-2 border-[#0F2747] bg-[#FAF7F2] overflow-hidden relative shadow-sm group-hover:scale-105 transition-transform">
                <Image
                  src="/founder.png"
                  alt="Huỳnh Công Thành"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 640px) 96px, 112px"
                />
              </div>
              <h3 className="font-poppins font-black text-base sm:text-lg text-[#0F2747] mt-3 tracking-tight">
                Huỳnh Công Thành
              </h3>
            </div>
          </PencilyScrollReveal>

          {/* Dương Quang Minh Khoa */}
          <PencilyScrollReveal animation="tilt-right" delay={220} rotate="1.2deg">
            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-md border-2 border-[#0F2747] bg-[#FAF7F2] overflow-hidden relative shadow-sm group-hover:scale-105 transition-transform">
                <Image
                  src="/co-founder.png"
                  alt="Dương Quang Minh Khoa"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 96px, 112px"
                />
              </div>
              <h3 className="font-poppins font-black text-base sm:text-lg text-[#0F2747] mt-3 tracking-tight">
                Dương Quang Minh Khoa
              </h3>
            </div>
          </PencilyScrollReveal>
        </div>

        {/* 2. BOARD OF DIRECTORS (Trang Sổ Nháp & Băng Keo Washi / Doodle Notebook Spread) */}
        <div className="mb-16 relative">
          {/* Notebook Header with Official Rubber Stamp */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b-2 border-dashed border-[#0F2747]/20 relative">
            <div>
              <h3 className="font-poppins font-black text-2xl sm:text-3xl text-[#0F2747] tracking-tight">
                Board of Directors
              </h3>
            </div>

            {/* Official Pencily Paper Badge Asset */}
            <PencilyScrollReveal animation="stamp" delay={120} rotate="-6deg" className="shrink-0 self-start sm:self-auto -mt-2 sm:mt-0">
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

          {/* 4 Tactile Notebook Member Cards (with washi tape & paperclips) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            {boardOfDirectors.map((member, idx) => (
              <PencilyScrollReveal
                key={idx}
                animation={idx % 2 === 0 ? "tilt-left" : "tilt-right"}
                delay={idx * 160}
                rotate={member.rotation?.includes("-") ? "-0.75deg" : "0.5deg"}
                className="h-full"
              >
                <div
                  className={`bg-white rounded-md p-6 sm:p-7 border-2 border-slate-300 hover:border-[#0F2747] shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group ${member.rotation} hover:rotate-0 h-full`}
                >
                {/* Authentic Washi Tape Strip at the Top */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-32 h-8 z-20 pointer-events-none select-none">
                  <Image
                    src={member.washiTape}
                    alt="Washi Tape"
                    fill
                    className="object-contain mix-blend-multiply drop-shadow-xs"
                  />
                </div>

                {/* Authentic Metallic Paperclip for specific cards */}
                {member.hasClip && (
                  <div className="absolute -top-3.5 right-6 w-6 h-12 z-20 pointer-events-none select-none -rotate-12">
                    <Image
                      src="/brand/elements/paperclip.jpg"
                      alt="Paperclip"
                      fill
                      className="object-contain mix-blend-multiply drop-shadow-2xs"
                    />
                  </div>
                )}

                <div>
                  {/* Top: Avatar & Role Header */}
                  <div className="flex items-start gap-4 mb-4 pt-1">
                    {member.image ? (
                      <div className="w-16 h-16 rounded-sm border-2 border-[#0F2747] bg-[#FAF7F2] shrink-0 overflow-hidden relative shadow-2xs">
                        <Image
                          src={member.image}
                          alt={`${member.name} - ${member.role}`}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-sm bg-[#0F2747] text-[#FFC83D] border-2 border-[#0F2747] font-black text-lg flex items-center justify-center shrink-0 shadow-2xs">
                        {member.initials}
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className="text-[11px] font-black text-[#4F7ECB] uppercase tracking-wider bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-xs">
                          {member.role}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-slate-400">
                          #00{idx + 1}
                        </span>
                      </div>

                      <h4 className="font-poppins font-black text-lg sm:text-xl text-[#0F2747] truncate">
                        {member.name}
                      </h4>
                    </div>
                  </div>

                  {/* School / Education Badge */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xs bg-[#FAF7F2] border border-slate-200 mb-4 text-xs text-slate-700">
                    <GraduationCap className="w-4 h-4 text-[#4F7ECB] shrink-0" />
                    <span className="font-bold text-[#0F2747]">
                      {isVi ? member.levelVi : member.levelEn}
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="truncate font-medium">{member.school}</span>
                  </div>

                  {/* Prominently Highlighted Quote Box */}
                  <div className="p-4 rounded-sm bg-[#FAF7F2] border-2 border-slate-200/90 shadow-2xs mb-4 relative overflow-hidden">
                    <Quote className="w-5 h-5 text-[#FFC83D] shrink-0 mb-1.5 opacity-90" />
                    <p className={`font-serif italic text-sm text-[#0F2747] leading-relaxed font-medium ${member.quoteVi === "[placeholder]" ? "text-slate-400 font-sans not-italic text-xs" : ""}`}>
                      {isVi ? member.quoteVi : member.quoteEn}
                    </p>
                  </div>
                </div>

                {/* Contact methods as Tactile Stickers */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2 text-xs">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      title={member.email}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-slate-50 hover:bg-slate-100 text-[#0F2747] border border-slate-200 hover:border-[#0F2747] transition font-medium active:scale-95 cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#4F7ECB]" />
                      <span className="max-w-[150px] truncate">{member.email}</span>
                    </a>
                  )}

                  {member.phone && (
                    <a
                      href={`tel:${member.phone}`}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-slate-50 hover:bg-slate-100 text-[#0F2747] border border-slate-200 hover:border-emerald-500 transition font-medium active:scale-95 cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{member.phone}</span>
                    </a>
                  )}

                  {member.facebook && (
                    <a
                      href={member.facebook.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-blue-50/70 hover:bg-blue-100 text-[#1877F2] border border-blue-200 hover:border-[#1877F2] transition font-medium active:scale-95 cursor-pointer"
                    >
                      <FacebookLogo className="w-3.5 h-3.5" />
                      <span>{member.facebook.label}</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  )}

                  {member.discord && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-[#5865F2]/10 text-[#5865F2] border border-[#5865F2]/30 font-medium">
                      <DiscordLogo className="w-3.5 h-3.5" />
                      <span>@{member.discord}</span>
                    </div>
                  )}
                </div>
              </div>
            </PencilyScrollReveal>
          ))}
          </div>
        </div>

        {/* 3. STUDENT & TUTOR VOICES (3 Clean placeholder cards for team proofchecking) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              roleVi: "<Peer Tutor Toán / THPT>",
              roleEn: "<Peer Tutor Math / High School>",
              badgeVi: "Placeholder Tutor",
              badgeEn: "Tutor Placeholder",
              defaultTextVi: "\"[Placeholder] Chia sẻ từ Peer Tutor về trải nghiệm giảng giải đề cương, cảm giác khi giúp bạn cùng lứa hiểu bài và quá trình xây dựng Portfolio cống hiến...\"",
              defaultTextEn: "\"[Placeholder] Thoughts from a Peer Tutor on reviewing mock tests, guiding fellow classmates, and building an extracurricular portfolio...\"",
            },
            {
              roleVi: "<Học sinh IELTS / SAT>",
              roleEn: "<IELTS / SAT Student>",
              badgeVi: "Placeholder Student",
              badgeEn: "Student Placeholder",
              defaultTextVi: "\"[Placeholder] Cảm nhận từ học sinh tham gia lớp Flagship: Môi trường luyện Speaking không phán xét, phản hồi chữa Writing 1-1 và sự tiến bộ sau khóa học...\"",
              defaultTextEn: "\"[Placeholder] Feedback from a Flagship student: Supportive Speaking practice rooms, 1-on-1 essay feedback, and measurable score progress...\"",
            },
            {
              roleVi: "<Học sinh Khóa Bổ trợ THPT>",
              roleEn: "<THPT Prep Student>",
              badgeVi: "Placeholder Member",
              badgeEn: "Member Placeholder",
              defaultTextVi: "\"[Placeholder] Trải nghiệm học nhóm nhỏ lúc 21h trên Discord: Sự cởi mở, không sợ bị chê cười khi hỏi bài tập khó và nguồn tài liệu tóm tắt miễn phí...\"",
              defaultTextEn: "\"[Placeholder] Experience joining small nightly study pods on Discord: Welcoming peers, zero fear of asking tough homework questions, and free study notes...\"",
            },
          ].map((item, idx) => (
            <PencilyScrollReveal
              key={idx}
              animation="bounce-up"
              delay={idx * 150}
              className="h-full"
            >
              <div
                className="bg-white rounded-md p-6 border-2 border-slate-300 hover:border-[#0F2747] transition-all flex flex-col justify-between shadow-xs h-full"
              >
                <div>
                  {/* Placeholder Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-sm border-2 border-dashed border-slate-300 bg-[#FAF7F2] flex items-center justify-center text-slate-400">
                      <User className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded-xs border border-slate-200">
                      {isVi ? item.badgeVi : item.badgeEn}
                    </span>
                  </div>

                  {/* Name & Role placeholder */}
                  <h4 className="font-poppins font-bold text-sm text-[#0F2747]">
                    {isVi ? `<Tên Người Chia Sẻ #${idx + 1}>` : `<Member Name #${idx + 1}>`}
                  </h4>
                  <div className="text-[11px] font-semibold text-[#4F7ECB] mb-3">
                    {isVi ? item.roleVi : item.roleEn}
                  </div>

                  {/* Content placeholder */}
                  <p className="text-xs text-slate-500 leading-relaxed italic p-3 rounded-xs bg-[#FAF7F2] border border-slate-200/80">
                    {isVi ? item.defaultTextVi : item.defaultTextEn}
                  </p>
                </div>

                {/* Status footer */}
                <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{isVi ? "Trạng thái: Chờ duyệt" : "Status: Draft"}</span>
                  <span className="font-bold text-[#0F2747]">{isVi ? "Sẵn sàng Proofcheck" : "Ready for Review"}</span>
                </div>
              </div>
            </PencilyScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
