"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Shield,
  BookCheck,
  Terminal,
  Megaphone,
  Handshake,
  Award,
  ArrowRight,
  Sparkles,
  Mail,
  Phone,
  GraduationCap,
  ExternalLink,
} from "lucide-react";
import { FacebookLogo, DiscordLogo } from "@/components/BrandIcons";
import { usePencily } from "@/context/PencilyContext";

interface AboutTeamViewProps {
  onOpenTutorModal?: () => void;
}

export function AboutTeamView({ onOpenTutorModal }: AboutTeamViewProps) {
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
      descVi:
        "Đưa ra quyết định cuối cùng về định hướng sản phẩm, tầm nhìn, hệ thống vận hành và chiến lược phát triển của The Pencily qua các thế hệ.",
      descEn:
        "Final decision-maker for platform strategy, organization vision, operational framework, and cross-generational growth.",
      badgeVi: "Tầm Nhìn & Chiến Lược",
      badgeEn: "Vision & Strategy",
      email: "hhuuyynnhhccoonnggtthhaannhh@gmail.com",
      phone: "0909945423",
      facebook: {
        label: "Cong Thanh",
        url: "https://www.facebook.com/UncleRoThanh/",
      },
      discord: "hcongthanh",
      image: "/founder.png",
      initials: "CT",
    },
    {
      role: "Vice Operational President",
      name: "Hồ Bảo Ngân",
      titleVi: "Phó Chủ tịch Vận hành & Kỷ luật",
      titleEn: "Vice Operational President",
      levelVi: "THPT",
      levelEn: "High School",
      school: "Phổ Thông Năng Khiếu, ĐHQG-HCM",
      descVi:
        "Quản trị tiến độ thực thi, kỷ luật nhân sự và quy trình tổ chức lớp học; làm chủ hệ thống dữ liệu theo dõi và điều phối buổi học.",
      descEn:
        "Directs execution timelines, team discipline, and master session runsheets across all active cohorts.",
      badgeVi: "Vận Hành & Kỷ Luật",
      badgeEn: "Operations & Discipline",
      email: "hobaongan1707@gmail.com",
      phone: "0777170711",
      facebook: {
        label: "Bảo Ngân",
        url: "https://www.facebook.com/bao.ngan.981769/",
      },
      discord: "selene_1711",
      image: "/bao-ngan.jpg",
      initials: "BN",
    },
    {
      role: "Vice Community President",
      name: "Nguyễn Dương Thuỷ Trâm",
      titleVi: "Phó Chủ tịch Phụ trách Cộng đồng",
      titleEn: "Vice Community President",
      levelVi: "Đại học",
      levelEn: "University",
      school: "Dong A University",
      descVi:
        "Quản lý và định hướng trải nghiệm cho cộng đồng Tutor và Học sinh; xây dựng văn hóa gắn kết, đa dạng và bảo vệ an toàn tâm lý học đường.",
      descEn:
        "Oversees tutor and student experience; nurtures inclusive culture, belonging, and strict psychological safety.",
      badgeVi: "Cộng Đồng & Văn Hóa",
      badgeEn: "Community & Culture",
      email: "ngdttram07@gmail.com",
      phone: "0388272007",
      facebook: {
        label: "Thủy Trâm",
        url: "https://www.facebook.com/share/18F3kZ2Vv7/?mibextid=wwXIfr",
      },
      image: "/thuy-tram.png",
      initials: "TT",
    },
    {
      role: "Advisor",
      name: "Dương Quang Minh Khoa",
      titleVi: "Cố Vấn & Đồng Sáng Lập",
      titleEn: "Advisor & Co-Founder",
      levelVi: "THPT",
      levelEn: "High School",
      school: "Phổ Thông Năng Khiếu, ĐHQG-HCM",
      descVi:
        "Tham gia định hình chiến lược phát triển, chuẩn mực chất lượng học thuật và cố vấn các quyết định trọng yếu của tổ chức.",
      descEn:
        "Advises on strategic growth, academic quality standards, and high-level organizational decision-making.",
      badgeVi: "Cố Vấn",
      badgeEn: "Advisory",
      discord: "god_daren",
      image: "/co-founder.png",
      initials: "MK",
    },
  ];

  const departments = [
    {
      code: "ACA",
      titleVi: "Ban Học thuật & Kiểm duyệt",
      titleEn: "Academic & Quality Review",
      icon: BookCheck,
      descVi:
        "Thẩm định giáo trình, dự giờ thử nghiệm giảng dạy, đánh giá chất lượng tài liệu và giám sát nội dung buổi học.",
      descEn:
        "Reviews syllabi, assesses mock teaching sessions, evaluates study materials, and monitors session standards.",
    },
    {
      code: "HR-ADLOGS",
      titleVi: "Ban Nhân sự & Hậu cần Số",
      titleEn: "Human Resources & Logistics",
      icon: Shield,
      descVi:
        "Quản trị tiến độ công việc, văn hóa tổ chức, lưu trữ văn bản, chuẩn hóa quy trình và quản lý cấp chứng nhận Tutor Certificate.",
      descEn:
        "Manages project progress, internal culture, documentation archives, and formal Tutor Certificate verification.",
    },
    {
      code: "DISCORD",
      titleVi: "Ban Quản trị Máy chủ",
      titleEn: "Discord Server Administration",
      icon: Users,
      descVi:
        "Điều phối máy chủ học tập, thiết lập quyền hạn lớp học, trực giám sát trật tự và duy trì nhịp tương tác hàng ngày.",
      descEn:
        "Maintains study server operations, manages role permissions, moderates active voice pods, and organizes community events.",
    },
    {
      code: "TECH",
      titleVi: "Ban Công nghệ & Nền tảng",
      titleEn: "Engineering & Platform",
      icon: Terminal,
      descVi:
        "Phát triển và vận hành website The Pencily, tích hợp các công cụ hỗ trợ lớp học, cơ chế tính điểm và kho lưu trữ tài liệu.",
      descEn:
        "Develops and runs The Pencily platform, classroom utilities, gamification logic, and open resource archives.",
    },
    {
      code: "PR & MEDIA",
      titleVi: "Ban Truyền thông & Thiết kế",
      titleEn: "Communications & Design",
      icon: Megaphone,
      descVi:
        "Xây dựng nội dung chia sẻ học tập, phát triển bộ nhận diện thương hiệu, ấn phẩm truyền thông và lưu trữ bài giảng mẫu.",
      descEn:
        "Creates educational content, brand assets, social media campaigns, and class archive recordings.",
    },
    {
      code: "ER",
      titleVi: "Ban Đối ngoại & Hợp tác",
      titleEn: "External Relations & Partnerships",
      icon: Handshake,
      descVi:
        "Mở rộng mạng lưới đối tác với các trường THPT, câu lạc bộ học thuật liên trường và kết nối diễn giả khách mời.",
      descEn:
        "Expands school partnerships, links inter-school academic clubs, and invites guest high-achiever speakers.",
    },
  ];

  return (
    <div className="space-y-12">
      {/* 1. FOUNDING BOARD: Clean & minimal - Just Avatar & Name */}
      <div className="flex items-center justify-center gap-12 sm:gap-24 py-4">
        {/* Huỳnh Công Thành */}
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

        {/* Dương Quang Minh Khoa */}
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
      </div>

      {/* 2. BOARD OF DIRECTORS */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-poppins font-black text-[#0F2747] tracking-tight">
              Board of Directors
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-xs self-start sm:self-auto">
            {isVi ? "Nhiệm kỳ Hoạt động 2026" : "2026 Active Cohort"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {boardOfDirectors.map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-md p-6 border-2 border-slate-300 hover:border-[#0F2747] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Photo / Initials + Role Badge + Title */}
                <div className="flex items-start gap-4 mb-4">
                  {member.image ? (
                    <div className="w-14 h-14 rounded-sm border-2 border-[#0F2747] bg-[#FAF7F2] shrink-0 overflow-hidden relative shadow-2xs">
                      <Image
                        src={member.image}
                        alt={`${member.name} - ${member.role}`}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-sm bg-[#0F2747] text-[#FFC83D] border-2 border-[#0F2747] font-black text-base flex items-center justify-center shrink-0 shadow-2xs">
                      {member.initials}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-xs bg-[#FFC83D]/30 text-[#0F2747] border border-[#FFC83D]">
                        {isVi ? member.badgeVi : member.badgeEn}
                      </span>
                      <span className="text-[11px] font-bold text-slate-500">
                        {member.role}
                      </span>
                    </div>

                    <h4 className="font-poppins font-bold text-lg text-[#0F2747] truncate">
                      {member.name}
                    </h4>
                  </div>
                </div>

                {/* Education / School Tag */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xs bg-[#FAF7F2] border border-slate-200 mb-3 text-xs text-slate-700">
                  <GraduationCap className="w-4 h-4 text-[#4F7ECB] shrink-0" />
                  <span className="font-bold text-[#0F2747]">
                    {isVi ? member.levelVi : member.levelEn}
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="truncate">{member.school}</span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {isVi ? member.descVi : member.descEn}
                </p>
              </div>

              {/* Contact methods */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2 text-xs">
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    title={member.email}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-slate-50 hover:bg-slate-100 text-[#0F2747] border border-slate-200 transition font-medium"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#4F7ECB]" />
                    <span className="max-w-[160px] truncate">{member.email}</span>
                  </a>
                )}

                {member.phone && (
                  <a
                    href={`tel:${member.phone}`}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-slate-50 hover:bg-slate-100 text-[#0F2747] border border-slate-200 transition font-medium"
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
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-blue-50 hover:bg-blue-100 text-[#1877F2] border border-blue-200 transition font-medium"
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
          ))}
        </div>
      </div>

      {/* 3. CORE DEPARTMENTS */}
      <div>
        <div className="text-xs font-black uppercase tracking-wider text-[#4F7ECB] mb-2">
          {isVi ? "Ban Chuyên Môn Nòng Cốt" : "Core Departments"}
        </div>
        <h3 className="text-xl sm:text-2xl font-poppins font-black text-[#0F2747] tracking-tight mb-6">
          {isVi ? "6 Ban Chuyên Môn Vận Hành" : "6 Operational Departments"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {departments.map((dept, idx) => {
            const Icon = dept.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-md p-5 border-2 border-slate-300 hover:border-[#0F2747] shadow-xs transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-xs bg-slate-100 border border-slate-300 text-slate-700">
                    {dept.code}
                  </span>
                  <div className="w-8 h-8 rounded-sm bg-[#FAF7F2] border border-slate-300 flex items-center justify-center text-[#4F7ECB]">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h4 className="font-poppins font-bold text-sm sm:text-base text-[#0F2747] mb-2">
                  {isVi ? dept.titleVi : dept.titleEn}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {isVi ? dept.descVi : dept.descEn}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. TUTOR VETTING PROCESS */}
      <div className="bg-[#FAF7F2] rounded-md p-6 sm:p-8 border-2 border-slate-300">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-poppins font-bold text-lg sm:text-xl text-[#0F2747]">
              {isVi ? "Quy Trình Tuyển Chọn & Thẩm Định Tutor" : "Tutor Vetting & Certification"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {isVi
                ? "Mọi Tutor tại The Pencily đều phải vượt qua 3 vòng kiểm tra nghiêm ngặt."
                : "All tutors undergo rigorous 3-step quality verification."}
            </p>
          </div>

          {onOpenTutorModal && (
            <button
              type="button"
              onClick={onOpenTutorModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[#0F2747] hover:bg-slate-800 text-white text-xs font-bold border-2 border-[#0F2747] shadow-xs transition active:scale-95 shrink-0 cursor-pointer"
            >
              <span>{isVi ? "Ứng tuyển Tutor" : "Apply as Tutor"}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FFC83D]" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              round: "VÒNG 1",
              titleVi: "Thẩm Định Đơn & Bảng Điểm",
              titleEn: "Application & Transcript Review",
              descVi:
                "Kiểm tra thành tích học thuật, chứng chỉ ngoại ngữ (IELTS/SAT nếu có), kinh nghiệm hoạt động và đề cương buổi học dự kiến.",
              descEn:
                "Review academic transcript, standardized tests (IELTS/SAT), background, and proposed lesson plan outline.",
            },
            {
              round: "VÒNG 2",
              titleVi: "Phỏng Vấn & Định Hướng",
              titleEn: "Interview & Alignment",
              descVi:
                "Trao đổi trực tiếp về tinh thần đồng hành, trách nhiệm học thuật, phương pháp tương tác và cam kết tuân thủ Red-Line Policy.",
              descEn:
                "Direct interview assessing communication skills, peer mindset, and commitment to the Red-Line Policy.",
            },
            {
              round: "VÒNG 3",
              titleVi: "Giảng Thử Nghiệm 15 Phút",
              titleEn: "15-Minute Mock Teaching",
              descVi:
                "Tutor trình bày một chuyên đề mẫu trước Ban Học thuật (ACA). Được góp ý chi tiết về cách dùng slide, tông giọng và tính dễ hiểu.",
              descEn:
                "Sample lesson delivered in front of the Academic committee with constructive feedback on pacing and clarity.",
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-sm p-4 border-2 border-slate-200">
              <span className="text-[10px] font-black uppercase text-[#4F7ECB] block mb-1">
                {item.round}
              </span>
              <div className="font-poppins font-bold text-sm text-[#0F2747] mb-1">
                {isVi ? item.titleVi : item.titleEn}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isVi ? item.descVi : item.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
