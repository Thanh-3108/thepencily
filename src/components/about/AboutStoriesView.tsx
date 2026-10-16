"use client";

import React from "react";
import Image from "next/image";
import { MessageSquareQuote, Quote, User, Sparkles } from "lucide-react";
import { usePencily } from "@/context/PencilyContext";

export function AboutStoriesView() {
  const { language } = usePencily();
  const isVi = language === "vi";

  const studentStories = [
    {
      name: "Minh Anh",
      roleVi: "Peer Tutor IELTS 8.0",
      roleEn: "Peer Tutor IELTS 8.0",
      schoolVi: "THPT Chuyên Ngoại Ngữ",
      schoolEn: "Foreign Language Specialized High School",
      quoteVi:
        "Trước đây mình rất ngại nói tiếng Anh trước đông người vì sợ phát âm sai. Nhưng khi tham gia làm Tutor tại The Pencily, không khí giữa các bạn học sinh rất cởi mở, không có khoảng cách thầy - trò. Nhờ vậy mà cả mình và các bạn học viên đều tiến bộ vượt bậc.",
      quoteEn:
        "I used to hesitate speaking English in public out of fear of mispronunciation. Becoming a tutor at The Pencily changed that completely. The peer-to-peer atmosphere is so welcoming that both my students and I progressed rapidly.",
    },
    {
      name: "Quốc Bảo",
      roleVi: "Tutor Toán 12 & ĐGNL",
      roleEn: "Math & Competency Exam Tutor",
      schoolVi: "THPT Chuyên Khoa Học Tự Nhiên",
      schoolEn: "HUS High School for Gifted Students",
      quoteVi:
        "Dạy lại kiến thức cho bạn bè chính là cách ôn thi đại học hiệu quả nhất đối với mình. Khi phải tìm cách giải thích cho bạn hiểu một bài toán khó, tư duy của mình cũng được sắp xếp lại gọn gàng và gãy gọn hơn.",
      quoteEn:
        "Teaching my peers turned out to be the best way to study for national exams. Explaining complex problems simply forced my own mathematical reasoning to become much sharper and more structured.",
    },
    {
      name: "Thuỳ Linh",
      roleVi: "Học Viên Lớp Flagship IELTS",
      roleEn: "IELTS Flagship Learner",
      schoolVi: "THPT Chuyên Lê Hồng Phong",
      schoolEn: "Le Hong Phong High School for the Gifted",
      quoteVi:
        "Điểm Speaking của mình từng bị kẹt ở mức 5.5 suốt 6 tháng. Nhờ các buổi luyện Voice 1-1 hàng tuần với Tutor của The Pencily, mình đã tự tin phản xạ và đạt 7.0 ngay trong lần thi thật vừa rồi.",
      quoteEn:
        "My IELTS Speaking was stuck at 5.5 for months. The weekly 1-on-1 voice practice with Pencily peer mentors gave me real confidence, propelling me to a 7.0 in my official exam.",
    },
    {
      name: "Hoàng Long",
      roleVi: "Học Viên Lớp Ôn Thi THPT Quốc Gia",
      roleEn: "National Exam Learner",
      schoolVi: "THPT Yên Hòa",
      schoolEn: "Yen Hoa High School",
      quoteVi:
        "Tài liệu tóm tắt và các mẹo giải nhanh của các bạn Tutor tại đây rất thực tế. Không lý thuyết hàn lâm, mọi ghi chú đều đi thẳng vào bản chất câu hỏi thi đại học.",
      quoteEn:
        "The concise Cornell notes and practical problem-solving tips shared by tutors are immediately actionable. No fluff, straight to what matters for exam mastery.",
    },
  ];

  return (
    <div className="space-y-12">
      {/* 1. FOUNDER & CO-FOUNDER'S WORDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Founder */}
        <div className="bg-white rounded-md p-6 sm:p-8 border-2 border-[#0F2747] shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#FFC83D]" />

          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-4">
              <div className="w-24 h-24 sm:w-26 sm:h-26 rounded-md border-2 border-[#0F2747] bg-[#FAF7F2] shrink-0 overflow-hidden relative shadow-2xs">
                <Image
                  src="/founder.png"
                  alt="Huỳnh Công Thành - Founder & President Gen 1.0"
                  fill
                  className="object-cover object-[55%_48%]"
                  priority
                  sizes="(max-width: 640px) 96px, 104px"
                />
              </div>

              <div className="flex-1 space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-xs inline-block mb-1">
                      {isVi ? "Lời Người Sáng Lập" : "Founder's Words"}
                    </span>
                    <h3 className="font-poppins font-bold text-xl sm:text-2xl text-[#0F2747]">
                      Huỳnh Công Thành
                    </h3>
                    <p className="text-xs font-semibold text-[#4F7ECB]">
                      Founder &amp; President Gen 1.0
                    </p>
                  </div>

                  <span className="text-[11px] font-bold text-[#0F2747] bg-[#FFF9EF] border-2 border-[#0F2747] px-2.5 py-1 rounded-xs">
                    {isVi ? "Người Sáng Lập" : "Founder"}
                  </span>
                </div>

                <p className="font-serif italic text-sm sm:text-base text-[#0F2747] border-l-3 border-[#FFC83D] pl-3 py-0.5">
                  “Chào buổi sáng mọi người lúc 3 giờ sáng nha”
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-3 border-t border-slate-100">
              {isVi
                ? "The Pencily khởi đầu từ những đêm thức khuya giải bài tập và những buổi học nhóm trực tuyến nhỏ giữa những người bạn. Mình mong muốn xây dựng một nơi mà bất kỳ ai, dù ở thành phố lớn hay tỉnh xa, trường chuyên hay không chuyên, đều tìm thấy một người bạn đồng hành đáng tin cậy trên con đường học tập."
                : "The Pencily began with late nights studying and small impromptu study groups among friends. I envision a home where any student, whether from a bustling city or a distant province, specialized or regular school, finds an empowering peer mentor on their learning journey."}
            </p>
          </div>
        </div>

        {/* Co-Founder */}
        <div className="bg-white rounded-md p-6 sm:p-8 border-2 border-[#0F2747] shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#4F7ECB]" />

          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-4">
              <div className="w-24 h-24 sm:w-26 sm:h-26 rounded-md border-2 border-[#0F2747] bg-[#FAF7F2] shrink-0 overflow-hidden relative shadow-2xs">
                <Image
                  src="/co-founder.png"
                  alt="Dương Quang Minh Khoa - Co-Founder, Senior Advisor"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 96px, 104px"
                />
              </div>

              <div className="flex-1 space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-blue-900 bg-blue-100 border border-blue-300 px-2 py-0.5 rounded-xs inline-block mb-1">
                      {isVi ? "Cố Vấn Cấp Cao" : "Senior Advisor"}
                    </span>
                    <h3 className="font-poppins font-bold text-xl sm:text-2xl text-[#0F2747]">
                      Dương Quang Minh Khoa
                    </h3>
                    <p className="text-xs font-semibold text-[#4F7ECB]">
                      Co-Founder, Senior Advisor
                    </p>
                  </div>

                  <span className="text-[11px] font-bold text-[#0F2747] bg-[#F0F6FF] border-2 border-[#0F2747] px-2.5 py-1 rounded-xs">
                    {isVi ? "Đồng Sáng Lập" : "Co-Founder"}
                  </span>
                </div>

                <p className="font-serif italic text-sm sm:text-base text-[#0F2747] border-l-3 border-[#4F7ECB] pl-3 py-0.5">
                  {isVi
                    ? "“Kiên định với giá trị đồng đẳng, trao quyền cho từng thành viên phát triển.”"
                    : "“Steadfast in peer values, empowering every member to thrive.”"}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-3 border-t border-slate-100">
              {isVi
                ? "Sự khác biệt của The Pencily nằm ở sự bình đẳng và tôn trọng tri thức của từng cá nhân. Chúng mình không xây dựng áp lực điểm số, mà tạo ra không gian để mỗi bạn học sinh tự tin khai phá tiềm năng và chia sẻ hiểu biết với cộng đồng."
                : "The hallmark of The Pencily is authentic equality and mutual intellectual respect. We don't build grade anxiety; we cultivate a safe haven where every learner uncovers their potential and gives back to the community."}
            </p>
          </div>
        </div>
      </div>

      {/* 2. VOICES FROM TUTORS & LEARNERS */}
      <div>
        <div className="text-xs font-black uppercase tracking-wider text-[#4F7ECB] mb-2">
          {isVi ? "Góc nhìn thành viên" : "Member Stories"}
        </div>
        <h3 className="text-xl sm:text-2xl font-poppins font-black text-[#0F2747] tracking-tight mb-6">
          {isVi ? "Trải Nghiệm Từ Người Trong Cuộc" : "Real Learning Experiences"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {studentStories.map((story, idx) => (
            <div
              key={idx}
              className="bg-white rounded-md p-6 border-2 border-slate-300 hover:border-[#0F2747] shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <Quote className="w-6 h-6 text-[#4F7ECB]/40 mb-3" />
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  “{isVi ? story.quoteVi : story.quoteEn}”
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-poppins font-bold text-sm text-[#0F2747]">
                    {story.name}
                  </h4>
                  <p className="text-xs font-medium text-slate-500">
                    {isVi ? story.schoolVi : story.schoolEn}
                  </p>
                </div>

                <span className="text-[11px] font-bold text-[#0F2747] bg-[#FAF7F2] border border-slate-300 px-2 py-0.5 rounded-xs">
                  {isVi ? story.roleVi : story.roleEn}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
