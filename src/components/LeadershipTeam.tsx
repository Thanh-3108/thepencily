import React from "react";
import { Users, Shield, BookCheck, Terminal, Megaphone, Handshake, Heart, Award } from "lucide-react";

export function LeadershipTeam() {
  const executives = [
    {
      role: "President",
      title: "Chủ tịch Điều hành Dự án",
      desc: "Đưa ra quyết định cuối cùng về sản phẩm, tầm nhìn, hệ thống vận hành và định vị chiến lược phát triển của The Pencily qua các thế hệ.",
      badge: "Vision & Strategy",
      initials: "P",
    },
    {
      role: "Vice Community President",
      title: "Phó Chủ tịch Phụ trách Cộng đồng",
      desc: "Quản lý và định hướng trải nghiệm cho cộng đồng Tutor - Học sinh; kiến tạo văn hóa gắn kết, đa dạng và bảo vệ an toàn tâm lý học đường.",
      badge: "Community & Culture",
      initials: "VCP",
    },
    {
      role: "Vice Operational President",
      title: "Phó Chủ tịch Vận hành & Kỷ luật",
      desc: "Quản trị tiến độ thực thi, kỷ luật nhân sự và quy trình tổ chức lớp; làm chủ hệ thống dữ liệu Keep Track, Master Sheet và Runsheet điều phối.",
      badge: "Operations & Quality",
      initials: "VOP",
    },
  ];

  const departments = [
    {
      code: "ACA",
      name: "Academic & Quality",
      vn: "Ban Học thuật & Kiểm duyệt",
      icon: BookCheck,
      duties: "Thẩm định giáo trình (syllabus review), dự giờ thử nghiệm (mock teaching), đánh giá tài liệu và giám sát chất lượng buổi học.",
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
            <span>Bộ Máy Tổ Chức Gen 1.0</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2747] font-heading tracking-tight">
            Ban Điều Hành & Các Ban Chuyên Môn
          </h2>
          <p className="mt-4 text-base text-[#4B5563]">
            Cơ cấu tổ chức chuyên nghiệp, phân công nhiệm vụ minh bạch giữa Ban Điều hành, 6 Ban Chuyên môn cùng Mạng lưới Tutor và Executive Members.
          </p>
        </div>

        {/* 1. Ban Điều Hành */}
        <div className="mb-14">
          <div className="text-xs font-extrabold uppercase tracking-widest text-[#6B7280] mb-4 text-center">
            Ban Điều Hành Cấp Cao (Executive Board)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {executives.map((exec) => (
              <div
                key={exec.role}
                className="bg-white rounded-3xl border-2 border-[#0F2747]/15 p-6 sm:p-7 shadow-sm hover:border-[#0F2747] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-[#FFC83D]/30 text-[#0F2747]">
                      {exec.badge}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-[#0F2747] text-[#FFC83D] font-black text-sm flex items-center justify-center">
                      {exec.initials}
                    </div>
                  </div>

                  <h3 className="text-xl font-extrabold text-[#0F2747] font-heading mb-1">
                    {exec.role}
                  </h3>
                  <div className="text-xs font-bold text-[#4F7ECB] mb-3">
                    {exec.title}
                  </div>

                  <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                    {exec.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#0F2747]/10 text-xs font-semibold text-[#6B7280]">
                  Nhiệm kỳ Gen 1.0 (2026)
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
