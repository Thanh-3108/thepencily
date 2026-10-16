import React from "react";
import { Calendar, CheckCircle2, Clock, Award, Flag } from "lucide-react";

export function RoadmapTimeline() {
  const phases = [
    {
      phase: "GIAI ĐOẠN 1",
      weeks: "Tuần 1 – Tuần 2",
      dates: "04/09 – 18/09",
      title: "Xây Dựng Nền Tảng & Hạ Tầng Số",
      status: "Đang triển khai",
      statusBadge: "bg-[#22C55E]/15 text-[#16A34A] border-[#22C55E]/30",
      tasks: [
        "Hoàn thiện Project Brief và ký cam kết nguyên tắc hoạt động Core Team",
        "Thiết lập Website phiên bản 1.0 (Landing page, Sứ mệnh, Danh mục lớp học & Form đăng ký)",
        "Tái cấu trúc máy chủ Discord: thiết lập phân quyền role tự động, bot ghi âm lớp học",
        "Xây dựng quy chế tuyển chọn và đào tạo phương pháp giảng dạy căn bản cho Tutor",
        "Biên soạn bộ tài liệu chuẩn bị cho các lớp học Flagship đầu tiên",
      ],
    },
    {
      phase: "GIAI ĐOẠN 2",
      weeks: "Tuần 5 – Tuần 8",
      dates: "Tuyển Sinh & Truyền Thông",
      title: "Chiêu Mộ Tutor & Khởi Động Cộng Đồng",
      status: "Sắp diễn ra",
      statusBadge: "bg-[#FFC83D]/25 text-[#0F2747] border-[#FFC83D]",
      tasks: [
        "Mở đợt tuyển sinh Tutor trên Fanpage Facebook; tiến hành phỏng vấn & dự giờ Mock Teaching",
        "Khai trương Website chính thức và công bố thời khóa biểu lớp học",
        "Tổ chức sự kiện Kick-off Webinar: 'Học tập bình đẳng: Tự tin làm chủ tri thức'",
        "Mở cổng ghi danh học viên và phân quyền vào máy chủ Discord",
      ],
    },
    {
      phase: "GIAI ĐOẠN 3",
      weeks: "Tuần 9 – Tuần 11",
      dates: "Vận Hành Thử Nghiệm",
      title: "Chuỗi Lớp Học & Chuẩn Hóa Thư Viện",
      status: "Kế hoạch",
      statusBadge: "bg-gray-100 text-[#6B7280] border-gray-200",
      tasks: [
        "Vận hành các chuỗi lớp học ngắn hạn (3–4 tuần) trên Discord Voice chuyên biệt",
        "Thu thập feedback form sau mỗi buổi học để Tutor liên tục nâng cấp chất lượng",
        "Đưa các ghi chú học tập, bài giải hay đạt chuẩn lên chuyên mục Resource Library",
        "Tổ chức các buổi Study Group & Q&A giải bài tập hàng tuần",
      ],
    },
    {
      phase: "GIAI ĐOẠN 4",
      weeks: "Tuần 12",
      dates: "Tổng Kết & Chuyển Giao",
      title: "Cấp Chứng Nhận & Mở Rộng Quy Mô",
      status: "Kế hoạch",
      statusBadge: "bg-gray-100 text-[#6B7280] border-gray-200",
      tasks: [
        "Cấp chứng nhận hoàn thành giảng dạy chính thức xác nhận bởi Ban Điều Hành",
        "Đánh giá các chỉ số KPIs: số lượng học sinh, mức độ hài lòng, độ ổn định hệ thống",
        "Tổ chức buổi vinh danh và tổng kết thành tựu",
        "Lập kế hoạch chuyển giao và mở rộng quy mô cho mùa tiếp theo",
      ],
    },
  ];

  return (
    <section id="roadmap" className="py-16 sm:py-24 bg-white border-b border-[#0F2747]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFC83D]/25 text-[#0F2747] text-xs font-bold uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>Timeline 12 Tuần</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2747] font-heading tracking-tight">
            Lộ Trình Triển Khai The Pencily
          </h2>
          <p className="mt-4 text-base text-[#4B5563]">
            Kế hoạch hành động 12 tuần được chia thành 4 giai đoạn cụ thể, đảm bảo tính kỷ luật, chất lượng học thuật và trải nghiệm tốt nhất cho người học.
          </p>
        </div>

        {/* Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {phases.map((phase, idx) => (
            <div
              key={phase.phase}
              className="bg-[#FFFDF9] rounded-3xl border-2 border-[#0F2747]/15 hover:border-[#0F2747] p-6 transition-all hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#4F7ECB]">
                    {phase.phase}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${phase.statusBadge}`}>
                    {phase.status}
                  </span>
                </div>

                <div className="text-xs font-extrabold text-[#0F2747] bg-[#FFC83D]/20 px-2.5 py-1 rounded-md w-fit mb-3">
                  {phase.weeks} ({phase.dates})
                </div>

                <h3 className="text-lg font-extrabold text-[#0F2747] font-heading mb-4 leading-tight">
                  {phase.title}
                </h3>

                <div className="space-y-2.5 text-xs text-[#4B5563]">
                  {phase.tasks.map((task, tIdx) => (
                    <div key={tIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] flex-shrink-0 mt-0.5" />
                      <span>{task}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-[#0F2747]/10 flex items-center justify-between text-xs font-bold text-[#6B7280]">
                <span>Cột mốc 0{idx + 1}</span>
                <Clock className="w-3.5 h-3.5 text-[#0F2747]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
