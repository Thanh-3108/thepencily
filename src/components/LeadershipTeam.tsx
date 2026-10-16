import React from "react";
import Image from "next/image";
import {
  Users,
  Shield,
  BookCheck,
  Terminal,
  Megaphone,
  Handshake,
  Heart,
  Award,
  Mail,
  Phone,
  GraduationCap,
  ExternalLink,
} from "lucide-react";
import { FacebookLogo, DiscordLogo } from "@/components/BrandIcons";

export function LeadershipTeam() {
  const boardOfDirectors = [
    {
      role: "President",
      name: "Huỳnh Công Thành",
      title: "Chủ tịch Điều hành Dự án",
      level: "THPT",
      school: "Phổ Thông Năng Khiếu, ĐHQG-HCM",
      desc: "Đưa ra quyết định cuối cùng về sản phẩm, tầm nhìn, hệ thống vận hành và định vị chiến lược phát triển của The Pencily qua các thế hệ.",
      badge: "Vision & Strategy",
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
      title: "Phó Chủ tịch Vận hành & Kỷ luật",
      level: "THPT",
      school: "Phổ Thông Năng Khiếu, ĐHQG-HCM",
      desc: "Quản trị tiến độ thực thi, kỷ luật nhân sự và quy trình tổ chức lớp; làm chủ hệ thống dữ liệu Keep Track, Master Sheet và Runsheet điều phối.",
      badge: "Operations & Quality",
      email: "hobaongan1707@gmail.com",
      phone: "0777170711",
      facebook: {
        label: "Bảo Ngân",
        url: "https://www.facebook.com/bao.ngan.981769/",
      },
      discord: "selene_1711",
      initials: "BN",
    },
    {
      role: "Vice Community President",
      name: "Nguyễn Dương Thuỷ Trâm",
      title: "Phó Chủ tịch Phụ trách Cộng đồng",
      level: "Đại học",
      school: "Dong A University",
      desc: "Quản lý và định hướng trải nghiệm cho cộng đồng Tutor - Học sinh; kiến tạo văn hóa gắn kết, đa dạng và bảo vệ an toàn tâm lý học đường.",
      badge: "Community & Culture",
      email: "ngdttram07@gmail.com",
      phone: "0388272007",
      facebook: {
        label: "Thủy Trâm",
        url: "https://www.facebook.com/share/18F3kZ2Vv7/?mibextid=wwXIfr",
      },
      initials: "TT",
    },
    {
      role: "Senior Advisor",
      name: "Dương Quang Minh Khoa",
      title: "Cố Vấn Cấp Cao & Đồng Sáng Lập",
      level: "THPT",
      school: "Phổ Thông Năng Khiếu, ĐHQG-HCM",
      desc: "Đồng hành định hình chiến lược dài hạn, tiêu chuẩn kiểm định học thuật và cố vấn định hướng phát triển toàn diện của The Pencily.",
      badge: "Senior Advisory",
      discord: "god_daren",
      image: "/co-founder.png",
      initials: "MK",
    },
  ];

  const departments = [
    {
      code: "ACA",
      name: "Academic & Quality",
      vn: "Ban Học thuật & Kiểm duyệt",
      icon: BookCheck,
      duties: "Thẩm định giáo trình, dự giờ thử nghiệm giảng dạy, đánh giá tài liệu và giám sát chất lượng buổi học.",
      color: "border-amber-400/40 bg-amber-500/5 text-amber-700",
    },
    {
      code: "HR-ADLOGS",
      name: "Human Resources & Logistics",
      vn: "Ban Nhân sự & Hậu cần Số",
      icon: Shield,
      duties: "Quản trị tiến độ công việc, văn hóa tổ chức, lưu trữ văn bản, chuẩn hóa pháp lý và quản lý cấp chứng nhận Tutor Certificate.",
      color: "border-blue-400/40 bg-blue-500/5 text-blue-700",
    },
    {
      code: "DISCORD",
      name: "Discord Community",
      vn: "Ban Quản trị Máy chủ",
      icon: Users,
      duties: "Điều phối server Discord, thiết lập quyền hạn lớp học, trực giám sát trật tự, duy trì nhịp tương tác và tổ chức hoạt động nội bộ.",
      color: "border-indigo-400/40 bg-indigo-500/5 text-indigo-700",
    },
    {
      code: "TECH",
      name: "Technical & Platform",
      vn: "Ban Công nghệ & Nền tảng",
      icon: Terminal,
      duties: "Phát triển và vận hành website The Pencily, tích hợp hệ thống form, webhook thông báo tự động và quản lý kho tài liệu số.",
      color: "border-emerald-400/40 bg-emerald-500/5 text-emerald-700",
    },
    {
      code: "PR & MEDIA",
      name: "Communications & Design",
      vn: "Ban Truyền thông & Thiết kế",
      icon: Megaphone,
      duties: "Quản lý Fanpage Facebook, xây dựng content calendar, sáng tạo bộ nhận diện thương hiệu, ấn phẩm truyền thông và dựng video lưu trữ bài học.",
      color: "border-rose-400/40 bg-rose-500/5 text-rose-700",
    },
    {
      code: "ER",
      name: "External Relations & Partners",
      vn: "Ban Đối ngoại & Hợp tác",
      icon: Handshake,
      duties: "Mở rộng mạng lưới đối tác trường THPT, câu lạc bộ học thuật liên trường, tìm kiếm nguồn bảo trợ và kết nối diễn giả khách mời.",
      color: "border-purple-400/40 bg-purple-500/5 text-purple-700",
    },
  ];

  return (
    <section id="team" className="py-16 sm:py-24 bg-[#FFF9EF] border-b border-[#0F2747]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F2747] text-[#FFF9EF] text-xs font-bold uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5 text-[#FFC83D]" />
            <span>Bộ Máy Tổ Chức</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2747] font-heading tracking-tight">
            Ban Điều Hành & Các Ban Chuyên Môn
          </h2>
          <p className="mt-4 text-base text-[#4B5563]">
            Cơ cấu tổ chức chuyên nghiệp, phân công nhiệm vụ minh bạch giữa Ban Điều hành, 6 Ban Chuyên môn cùng Mạng lưới Tutor và Executive Members.
          </p>
        </div>

        {/* 1. Ban Điều Hành / Board of Directors */}
        <div className="mb-14">
          <div className="text-xs font-extrabold uppercase tracking-widest text-[#4F7ECB] mb-2 text-center">
            Bộ Máy Lãnh Đạo Dự Án
          </div>
          <h3 className="text-2xl font-poppins font-black text-[#0F2747] text-center mb-8">
            Ban Giám Đốc (Board of Directors)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {boardOfDirectors.map((member) => (
              <div
                key={member.role}
                className="bg-white rounded-md border-2 border-slate-300 p-6 shadow-xs hover:border-[#0F2747] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
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
                          {member.badge}
                        </span>
                        <span className="text-[11px] font-bold text-slate-500">
                          {member.role}
                        </span>
                      </div>

                      <h4 className="font-poppins font-bold text-lg text-[#0F2747] truncate">
                        {member.name}
                      </h4>
                      <p className="text-xs font-bold text-[#4F7ECB]">
                        {member.title}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xs bg-[#FAF7F2] border border-slate-200 mb-3 text-xs text-slate-700">
                    <GraduationCap className="w-4 h-4 text-[#4F7ECB] shrink-0" />
                    <span className="font-bold text-[#0F2747]">{member.level}</span>
                    <span className="text-slate-300">|</span>
                    <span className="truncate">{member.school}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {member.desc}
                  </p>
                </div>

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

        {/* 2. Sáu Ban Chuyên Môn */}
        <div>
          <div className="text-xs font-extrabold uppercase tracking-widest text-[#6B7280] mb-4 text-center">
            6 Ban Chuyên Môn Nòng Cốt (Core Team Departments)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => {
              const Icon = dept.icon;
              return (
                <div
                  key={dept.code}
                  className={`bg-white rounded-2xl border-2 p-6 transition-all hover:shadow-md flex flex-col justify-between ${dept.color}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded bg-white/80 border border-current">
                        {dept.code}
                      </span>
                      <Icon className="w-5 h-5" />
                    </div>

                    <h4 className="text-lg font-extrabold text-[#0F2747] font-heading mb-0.5">
                      {dept.name}
                    </h4>
                    <div className="text-xs font-semibold text-[#6B7280] mb-3">
                      {dept.vn}
                    </div>

                    <p className="text-xs text-[#4B5563] leading-relaxed">
                      {dept.duties}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#0F2747]/10 flex items-center justify-between text-[11px] font-bold text-[#0F2747]">
                    <span>Head & Vice Head</span>
                    <span>Tuyển theo nhiệm kỳ</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
