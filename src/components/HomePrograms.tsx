"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, MessageSquareQuote, HelpCircle, Compass, ArrowRight, Check } from "lucide-react";

interface ProgramItem {
  id: string;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  subjects: string[];
  highlights: string[];
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
}

const PROGRAMS: ProgramItem[] = [
  {
    id: "bootcamps",
    title: "Luyện Đề & Chuyên Đề Trọng Tâm",
    badge: "Bootcamp Nhóm Nhỏ",
    tagline: "Ôn thi tốt nghiệp THPT & Đánh giá Năng lực (ĐGNL)",
    description: "Nhóm học nhỏ từ 4–8 bạn cùng làm đề theo thời gian thực. Peer tutor phân tích bẫy đề thi, chia sẻ mẹo bấm máy tính Casio và phương pháp loại trừ đáp án nhanh.",
    subjects: ["Toán học", "Vật lý", "Hóa học", "Sinh học", "Ngữ văn"],
    highlights: [
      "Giải đề thi thử từ các trường chuyên toàn quốc",
      "Thảo luận cách tư duy thay vì học vẹt công thức",
      "Không khí cởi mở, không áp lực so bì điểm số"
    ],
    icon: BookOpen,
    iconBg: "bg-blue-50",
    iconColor: "text-[#4F7ECB]",
  },
  {
    id: "dialogues",
    title: "Thảo Luận Học Thuật & Ngoại Ngữ",
    badge: "Academic Dialogues",
    tagline: "Rèn luyện tư duy phản biện & kỹ năng tự học",
    description: "Các buổi đàm thoại hai chiều về phương pháp học tập hiệu quả: kỹ thuật ghi chép Cornell, quản lý thời gian trước kỳ thi và thực hành nói tiếng Anh (IELTS/SAT Speaking).",
    subjects: ["IELTS / SAT", "Phương pháp học", "Kỹ năng phản biện"],
    highlights: [
      "Thực hành phản xạ tiếng Anh theo cặp hoặc nhóm 3",
      "Trao đổi cách xây dựng thói quen tự học kỷ luật",
      "Khuyến khích góc nhìn đa chiều và tôn trọng sự khác biệt"
    ],
    icon: MessageSquareQuote,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    id: "doubt-clearing",
    title: "Gỡ Rối Bài Tập 24/7 (Doubt Clearing)",
    badge: "Hỗ Trợ Không Phán Xét",
    tagline: "Kẹt ở bài toán khó? Luôn có bạn học sẵn sàng giúp",
    description: "Không còn cảnh loay hoay một mình lúc 23h đêm. Đăng bài lên cộng đồng hoặc ghé phòng voice Discord để được peer tutors hướng dẫn từng bước chi tiết.",
    subjects: ["Tất cả phân môn", "Bài tập về nhà", "Câu hỏi nâng cao"],
    highlights: [
      "Không bao giờ bị chê 'câu này dễ sao không biết làm'",
      "Giải thích từng bước bản chất, không chỉ đưa đáp án",
      "Hỗ trợ cả trên diễn đàn và phòng voice trực tiếp"
    ],
    icon: HelpCircle,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    id: "mentorship",
    title: "Hành Trang THPT & Săn Học Bổng",
    badge: "Mentorship Mở",
    tagline: "Kinh nghiệm thực chiến từ các bạn đi trước",
    description: "Tọa đàm trực tuyến định kỳ cuối tuần: kinh nghiệm chọn khối thi, chọn ngành đại học, phương pháp chuẩn bị hồ sơ du học và săn học bổng từ cựu học sinh.",
    subjects: ["Định hướng ngành", "Hồ sơ du học", "Hoạt động ngoại khóa"],
    highlights: [
      "Hỏi đáp trực tiếp (AMA) cùng các bạn đã đạt học bổng",
      "Kinh nghiệm cân bằng giữa học trên lớp và dự án xã hội",
      "Hoàn toàn miễn phí, chia sẻ minh bạch không giấu nghề"
    ],
    icon: Compass,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
];

export function HomePrograms() {
  return (
    <section id="programs" className="pt-20 sm:pt-28">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-[#4F7ECB] mb-2">
            Mô hình đồng hành • The Pencily
          </div>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-[#0F2747] tracking-tight text-balance">
            Các chương trình học tập bình đẳng
          </h2>
          <p className="mt-3.5 text-[#475569] text-base leading-relaxed text-balance">
            Tất cả hoạt động đều diễn ra trên Discord & Web Pencily, hoàn toàn miễn phí và do chính các bạn học sinh có năng lực dẫn dắt.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROGRAMS.map((prog) => {
            const Icon = prog.icon;
            return (
              <div
                key={prog.id}
                className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Lockup */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl ${prog.iconBg} ${prog.iconColor} flex items-center justify-center shrink-0`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#4F7ECB] bg-slate-100/90 px-3 py-1 rounded-md">
                      {prog.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-poppins font-bold text-xl text-[#0F2747] mb-1">
                    {prog.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#4F7ECB] mb-3">
                    {prog.tagline}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#475569] leading-relaxed mb-5">
                    {prog.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 mb-5">
                    {prog.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#0F2747]/90 leading-relaxed">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Subjects & CTA */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {prog.subjects.map((sub) => (
                      <span
                        key={sub}
                        className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/classes"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F2747] hover:text-[#4F7ECB] transition-colors"
                  >
                    <span>Xem các phòng</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
