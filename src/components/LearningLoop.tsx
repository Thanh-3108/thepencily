import React from "react";
import { Search, GraduationCap, Share2, Award, Users2, Sprout, ArrowRight } from "lucide-react";

export function LearningLoop() {
  const steps = [
    {
      step: "01",
      name: "Find",
      title: "Tìm kiếm cơ hội",
      desc: "Khám phá các lớp học bổ trợ, study group hoặc kho tài liệu phù hợp mục tiêu của bạn trên Website và Discord The Pencily.",
      icon: Search,
      badgeColor: "bg-[#4F7ECB] text-white",
    },
    {
      step: "02",
      name: "Learn",
      title: "Tiếp thu tri thức",
      desc: "Tham gia các buổi học tương tác hai chiều, thoải mái đặt câu hỏi và thảo luận bình đẳng cùng bạn học và Tutor.",
      icon: GraduationCap,
      badgeColor: "bg-[#FFC83D] text-[#0F2747]",
    },
    {
      step: "03",
      name: "Share",
      title: "Đóng góp tài liệu",
      desc: "Gửi tặng cộng đồng những bản ghi chú tỉ mỉ, công thức tóm tắt hoặc lời giải bài tập sáng tạo của chính bạn.",
      icon: Share2,
      badgeColor: "bg-[#0F2747] text-white",
    },
    {
      step: "04",
      name: "Teach",
      title: "Đứng lớp dẫn dắt",
      desc: "Ứng tuyển Tutor sau khi qua vòng thẩm định đề cương và dự giờ thử nghiệm của ban Academic & Quality.",
      icon: Award,
      badgeColor: "bg-[#FFC83D] text-[#0F2747]",
    },
    {
      step: "05",
      name: "Collaborate",
      title: "Hợp tác liên ngành",
      desc: "Bắt tay cùng các thành viên khác triển khai dự án thực tế: ví dụ Tutor Toán phối hợp cùng bạn Lập trình số hóa bộ công cụ học tập.",
      icon: Users2,
      badgeColor: "bg-[#4F7ECB] text-white",
    },
    {
      step: "06",
      name: "Grow",
      title: "Trưởng thành toàn diện",
      desc: "Tích lũy giờ tình nguyện, rèn luyện tư duy lãnh đạo, nâng tầm portfolio và nhận chứng nhận Tutor Certificate danh giá.",
      icon: Sprout,
      badgeColor: "bg-[#22C55E] text-white",
    },
  ];

  return (
    <section id="loop" className="py-16 sm:py-24 bg-[#FFF9EF] relative overflow-hidden border-b-2 border-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-[#0F2747] text-[#FFF9EF] border-2 border-[#0F2747] text-xs font-black uppercase tracking-wider mb-3">
            <span>The Learner-to-Contributor Loop</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0F2747] font-heading tracking-tight">
            Vòng Đời Người Tham Gia 6 Giai Đoạn
          </h2>
          <p className="mt-4 text-base text-[#4B5563] leading-relaxed">
            Tại The Pencily, bạn không bao giờ chỉ dừng lại ở vai trò người nghe. Hành trình của bạn là một chuỗi chuyển hóa liên tục từ người học trở thành người dẫn dắt và kiến tạo cộng đồng.
          </p>
        </div>

        {/* 6 Step Interactive Visual Path */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="group relative bg-[#FFFDF9] rounded-sm border-2 border-slate-300 p-6 hover:border-[#0F2747] transition-all hover:shadow-xs"
              >
                {/* Step badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2.5 py-1 rounded-xs border text-xs font-black uppercase tracking-wider ${item.badgeColor}`}>
                    Stage {item.step}: {item.name}
                  </span>
                  <div className="w-10 h-10 rounded-sm bg-[#FFF9EF] border-2 border-slate-300 flex items-center justify-center text-[#0F2747] group-hover:bg-[#FFC83D] transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-xl font-extrabold text-[#0F2747] font-heading mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-[#4B5563] leading-relaxed mb-4">
                  {item.desc}
                </p>

                {/* Bottom line */}
                <div className="pt-3 border-t-2 border-slate-100 flex items-center justify-between text-xs font-bold text-[#6B7280]">
                  <span>Vòng lặp phát triển</span>
                  <ArrowRight className="w-4 h-4 text-[#0F2747] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom banner */}
        <div className="mt-12 text-center">
          <div className="inline-block p-4 sm:p-5 bg-white border-2 border-[#0F2747] rounded-sm shadow-xs">
            <p className="text-sm sm:text-base font-bold text-[#0F2747]">
              “Từ một học sinh băn khoăn tìm lời giải → Đến người Tutor tự tin truyền cảm hứng cho hàng trăm bạn bè.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
