"use client";

import React from "react";
import { Quote } from "lucide-react";

interface StoryItem {
  name: string;
  role: string;
  school: string;
  subject: string;
  content: string;
  initials: string;
}

const STORIES: StoryItem[] = [
  {
    name: "Lê Gia Huy",
    role: "Học sinh Lớp 12",
    school: "THPT Bùi Thị Xuân, TP.HCM",
    subject: "Luyện đề Toán & Vật lý",
    initials: "GH",
    content: "Trước đây mình rất ngại hỏi bài thầy cô trên lớp vì sợ làm mất thời gian của cả lớp. Lên Pencily vào phòng giải đề lúc 21h, bạn tutor cùng lứa chỉ cho mình từng bước bấm máy Casio Oxyz cực kỳ kiên nhẫn. Cảm giác áp lực trước kỳ thi giảm đi hẳn!",
  },
  {
    name: "Trần Mai Phương",
    role: "Peer Tutor Tiếng Anh",
    school: "THPT Chuyên Quốc Học Huế",
    subject: "IELTS Speaking & Academic Essay",
    initials: "MP",
    content: "Làm Peer Tutor giúp mình từ một người nhút nhát trở nên tự tin khi thuyết trình và nói tiếng Anh trước đám đông. Tụi mình cùng chữa essay IELTS, trao đổi tài liệu mà không có bất kỳ khoảng cách hay phán xét nào.",
  },
  {
    name: "Phạm Tuấn Khang",
    role: "Học sinh Lớp 11",
    school: "THPT Chuyên Nguyễn Huệ, Hà Nội",
    subject: "Hóa học & Phương pháp Cornell",
    initials: "TK",
    content: "Kho tài liệu ở đây được các bạn tóm tắt lại bằng phương pháp Cornell rất trực quan và dễ nhớ. Thích nhất là không hề có quảng cáo, không ép mua khóa học, hoàn toàn là tinh thần học sinh giúp đỡ nhau thật lòng.",
  },
];

export function HomeStudentStories() {
  return (
    <section id="stories" className="pt-20 sm:pt-28">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-[#4F7ECB] mb-2">
            Góc nhìn người trong cuộc
          </div>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-[#0F2747] tracking-tight text-balance">
            Tiếng nói học sinh • Khi chúng mình cùng tiến bộ
          </h2>
          <p className="mt-3.5 text-[#475569] text-base leading-relaxed text-balance">
            Những chia sẻ chân thật từ các bạn học sinh và peer tutor đang cùng học tập tại The Pencily mỗi tối.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STORIES.map((story, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Quote Icon */}
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#4F7ECB] flex items-center justify-center mb-5">
                  <Quote className="w-5 h-5" />
                </div>

                {/* Content */}
                <p className="text-sm text-[#475569] leading-relaxed mb-6">
                  “{story.content}”
                </p>
              </div>

              {/* Student Info */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#0F2747] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {story.initials}
                </div>
                <div className="min-w-0">
                  <div className="font-poppins font-bold text-sm text-[#0F2747] truncate">
                    {story.name}
                  </div>
                  <div className="text-[11px] text-[#64748B] truncate">
                    {story.role} • {story.school}
                  </div>
                  <div className="text-[11px] font-semibold text-[#4F7ECB] truncate mt-0.5">
                    {story.subject}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
