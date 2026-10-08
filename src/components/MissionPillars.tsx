import React from "react";
import { Network, BookOpenCheck, Share2, TrendingUp, Users, MessageCircle, Award, Compass, Lightbulb } from "lucide-react";

export function MissionPillars() {
  const pillars = [
    {
      id: "connect",
      name: "CONNECT",
      vietnameseName: "Kết nối",
      desc: "Xây dựng mạng lưới liên kết học sinh giữa các trường học trên toàn quốc, xoá bỏ khoảng cách địa lý và ranh giới chuyên / không chuyên.",
      icon: Network,
      color: "from-blue-500/10 to-indigo-500/10",
      accent: "#4F7ECB",
    },
    {
      id: "learn",
      name: "LEARN",
      vietnameseName: "Học hỏi",
      desc: "Tổ chức các lớp học chuyên đề bổ trợ, study group nhỏ và workshop tương tác cao, giải đáp thắc mắc bài tập trong không khí cởi mở, bình đẳng.",
      icon: BookOpenCheck,
      color: "from-amber-500/10 to-yellow-500/10",
      accent: "#FFC83D",
    },
    {
      id: "share",
      name: "SHARE",
      vietnameseName: "Chia sẻ",
      desc: "Trao quyền cho học sinh đóng góp tri thức thông qua tài liệu tự biên soạn, slide bài giảng thực tế và phương pháp tự học độc đáo cá nhân.",
      icon: Share2,
      color: "from-emerald-500/10 to-teal-500/10",
      accent: "#10B981",
    },
    {
      id: "grow",
      name: "GROW",
      vietnameseName: "Phát triển",
      desc: "Rèn luyện bộ kỹ năng thế kỷ 21: Giao tiếp, Giảng dạy, Lãnh đạo, Làm việc nhóm và Tư duy phản biện để tự tin bước vào giảng đường và tương lai.",
      icon: TrendingUp,
      color: "from-sky-500/10 to-blue-500/10",
      accent: "#0F2747",
    },
  ];

  const skills21st = [
    { title: "Communication", vn: "Kỹ năng Giao tiếp", desc: "Trình bày mạch lạc, lắng nghe và phản hồi xây dựng" },
    { title: "Teaching", vn: "Kỹ năng Giảng dạy", desc: "Đóng gói kiến thức phức tạp thành nội dung dễ hiểu" },
    { title: "Leadership", vn: "Năng lực Lãnh đạo", desc: "Dẫn dắt study group, điều phối dự án cộng đồng" },
    { title: "Collaboration", vn: "Hợp tác Nhóm", desc: "Làm việc liên môn cùng các bạn học sinh đa năng" },
    { title: "Critical Thinking", vn: "Tư duy Phản biện", desc: "Đào sâu bản chất, tranh luận học thuật văn minh" },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 bg-white border-y border-[#0F2747]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFC83D]/25 text-[#0F2747] text-xs font-extrabold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-[#0F2747]" />
            Tôn Chỉ & Sứ Mệnh Chiến Lược
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2747] font-heading tracking-tight">
            4 Trụ Cột Sứ Mệnh Của The Pencily
          </h2>
          <p className="mt-4 text-base text-[#4B5563]">
            Chúng tôi tin rằng việc học không phải là mô hình một chiều đơn tuyến (Teacher → Student) mà hoàn toàn có thể tối ưu hoá qua tương tác đa chiều (Student ↔ Student).
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="group relative bg-[#FFFDF9] rounded-2xl border-2 border-[#0F2747]/15 p-6 hover:border-[#0F2747] transition-all hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${pillar.accent}20`, color: pillar.accent }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-black text-[#6B7280]">0{idx + 1}</span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-2">
                    <h3 className="text-xl font-extrabold text-[#0F2747] font-heading tracking-tight">
                      {pillar.name}
                    </h3>
                    <span className="text-xs font-semibold text-[#6B7280]">
                      ({pillar.vietnameseName})
                    </span>
                  </div>

                  <p className="text-sm text-[#4B5563] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#0F2747]/10 flex items-center justify-between text-xs font-bold text-[#0F2747]">
                  <span className="group-hover:text-[#4F7ECB] transition-colors">Tìm hiểu thêm</span>
                  <span>→</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 21st Century Skills Highlight */}
        <div className="rounded-3xl bg-[#0F2747] text-white p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-[#FFC83D]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <div className="text-xs font-extrabold uppercase tracking-widest text-[#FFC83D] mb-1">
                  21st Century Skills
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                  Rèn Luyện 5 Năng Lực Cốt Lõi Thế Kỷ 21
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md">
                Tại The Pencily, thành viên không chỉ tiếp thu kiến thức học thuật mà còn được tôi luyện bản lĩnh của những người trẻ dẫn đầu.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {skills21st.map((skill, index) => (
                <div
                  key={skill.title}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors"
                >
                  <div className="text-[#FFC83D] font-bold text-xs mb-1">0{index + 1}</div>
                  <div className="font-extrabold text-base text-white">{skill.title}</div>
                  <div className="text-xs text-[#FFC83D] font-medium mb-2">{skill.vn}</div>
                  <div className="text-[12px] text-slate-300 leading-snug">{skill.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
