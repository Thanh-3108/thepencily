import React from "react";
import { Users, Layers, Video, MessageSquare, Calendar, CheckCircle2, Mic, Clock } from "lucide-react";

export function LearningFormats({ onSelectFormat }: { onSelectFormat?: (format: string) => void }) {
  const formats = [
    {
      id: "study-groups",
      tag: "Tự Do Hàng Ngày",
      name: "Study Groups & Q&A",
      tagline: "Nhóm học tập & Giải đáp thắc mắc",
      size: "Nhỏ (5 – 15 bạn)",
      duration: "Diễn ra liên tục hàng ngày",
      platform: "Discord Voice & Forum Channels",
      desc: "Không gian học mở giúp học sinh không bao giờ cảm thấy cô độc. Bạn có thể bật mic hỏi bài tập về nhà, luyện đề chung hoặc bật webcam học Pomodoro cùng bạn bè.",
      highlights: [
        "Hỏi đáp tức thì qua các chuyên mục Forum riêng cho từng môn",
        "Phòng Voice 24/7 với bot đếm thời gian tập trung",
        "Tutor và Core Team túc trực giải đáp khúc mắc",
      ],
      icon: Users,
      accent: "#FFC83D",
      buttonText: "Khám phá Study Groups",
    },
    {
      id: "cohort-classes",
      tag: "Chuyên Sâu Định Kỳ",
      name: "Cohort-based Classes",
      tagline: "Lớp học theo chuỗi chuyên đề",
      size: "Lớp tổ chức (15 – 30 bạn)",
      duration: "Kéo dài 3 – 6 tuần (1-2 buổi/tuần)",
      platform: "Discord Voice (Phòng học có phân quyền)",
      desc: "Lớp học có giáo trình (syllabus) được ban Academic & Quality duyệt nghiêm ngặt. Tutor đồng hành sát sao cùng bài tập thực chiến và đánh giá cuối khoá.",
      highlights: [
        "Giáo trình chuẩn hoá & slide minh họa trực quan",
        "Có điểm danh, theo dõi tiến độ và đánh giá năng lực",
        "Cấp chứng nhận hoàn thành khoá học cho học viên",
      ],
      icon: Layers,
      accent: "#4F7ECB",
      buttonText: "Xem Danh Sách Cohort",
      featured: true,
    },
    {
      id: "workshops",
      tag: "Sự Kiện Đặc Biệt",
      name: "Short Workshops & Seminars",
      tagline: "Hội thảo kỹ năng & Truyền cảm hứng",
      size: "Quy mô lớn (50 – 100+ bạn)",
      duration: "1 – 2 buổi chuyên đề (90 - 120 phút)",
      platform: "Discord Stage / Zoom",
      desc: "Những buổi chia sẻ mở rộng tầm nhìn về phương pháp tự học đỉnh cao, quản lý thời gian, định hướng ngành nghề, chuẩn bị du học và bí quyết săn học bổng.",
      highlights: [
        "Khách mời diễn giả & cựu học sinh xuất sắc",
        "Hỏi đáp trực tiếp (Live Q&A) và nhận tài liệu độc quyền",
        "Giao lưu kết nối mạng lưới học sinh toàn quốc",
      ],
      icon: Video,
      accent: "#0F2747",
      buttonText: "Xem Lịch Workshop",
    },
  ];

  return (
    <section id="formats" className="py-16 sm:py-24 bg-white border-b border-[#0F2747]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F7ECB]/15 text-[#0F2747] text-xs font-bold uppercase tracking-wider mb-3">
            <span>Mô Hình Đa Dạng</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2747] font-heading tracking-tight">
            Ba Hình Thức Học Tập Trọng Tâm
          </h2>
          <p className="mt-4 text-base text-[#4B5563]">
            The Pencily thiết kế hệ sinh thái học tập linh hoạt, đáp ứng trọn vẹn từ nhu cầu giải bài tập hàng ngày cho đến việc theo đuổi các khóa học chuyên sâu dài hơi.
          </p>
        </div>

        {/* 3 Columns Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {formats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`relative flex flex-col justify-between rounded-3xl p-7 sm:p-8 transition-all duration-300 ${
                  item.featured
                    ? "bg-[#FFF9EF] border-3 border-[#0F2747] shadow-xl ring-4 ring-[#FFC83D]/30"
                    : "bg-[#FFFDF9] border-2 border-[#0F2747]/15 hover:border-[#0F2747] shadow-sm hover:shadow-md"
                }`}
              >
                {item.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#0F2747] text-[#FFC83D] text-xs font-black uppercase tracking-wider shadow">
                    ★ Trọng Tâm Gen 1.0
                  </div>
                )}

                <div>
                  {/* Top info */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                      {item.tag}
                    </span>
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${item.accent}25`, color: item.accent === "#FFC83D" ? "#0F2747" : item.accent }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-extrabold text-[#0F2747] font-heading mb-1">
                    {item.name}
                  </h3>
                  <div className="text-xs font-bold text-[#4F7ECB] mb-4">
                    {item.tagline}
                  </div>

                  <p className="text-sm text-[#4B5563] leading-relaxed mb-6">
                    {item.desc}
                  </p>

                  {/* Metadata Chips */}
                  <div className="space-y-2 mb-6 p-4 rounded-xl bg-white/70 border border-[#0F2747]/10 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#6B7280] font-medium flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#0F2747]" /> Quy mô:
                      </span>
                      <span className="font-bold text-[#0F2747]">{item.size}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#6B7280] font-medium flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#0F2747]" /> Thời lượng:
                      </span>
                      <span className="font-bold text-[#0F2747]">{item.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#6B7280] font-medium flex items-center gap-1.5">
                        <Mic className="w-3.5 h-3.5 text-[#0F2747]" /> Nền tảng:
                      </span>
                      <span className="font-bold text-[#4F7ECB]">{item.platform}</span>
                    </div>
                  </div>

                  {/* Key Highlights Checklist */}
                  <div className="space-y-2 mb-6">
                    {item.highlights.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#0F2747]">
                        <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="#classes"
                  className={`w-full py-3 px-4 rounded-xl text-center text-xs font-extrabold uppercase tracking-wider transition-all block ${
                    item.featured
                      ? "bg-[#0F2747] text-white hover:bg-[#1A3E6D] shadow-md"
                      : "border-2 border-[#0F2747] text-[#0F2747] hover:bg-[#FFC83D]/20"
                  }`}
                >
                  {item.buttonText}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
