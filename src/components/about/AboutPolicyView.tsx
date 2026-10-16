"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  AlertOctagon,
  FileCheck,
  DollarSign,
  Scale,
  HeartHandshake,
  Lock,
  ArrowRight,
  Info,
} from "lucide-react";
import { usePencily } from "@/context/PencilyContext";
import { SafetyReportModal } from "@/components/SupportModals";

export function AboutPolicyView() {
  const { language } = usePencily();
  const isVi = language === "vi";
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);

  const policies = [
    {
      number: "01",
      titleVi: "An Toàn & Chống Bắt Nạt Trực Tuyến",
      titleEn: "Safety & Anti-Harassment",
      icon: ShieldCheck,
      descVi:
        "Nghiêm cấm tuyệt đối mọi hành vi xúc phạm danh dự, bắt nạt trực tuyến, quấy rối bằng lời nói hay tin nhắn, đe dọa dưới mọi hình thức. Vấn đề an toàn tâm lý của học sinh luôn được ưu tiên xử lý cao hơn mọi hoạt động học thuật.",
      descEn:
        "Zero tolerance for any form of harassment, cyberbullying, personal insults, or intimidation. Student psychological safety takes precedence over all other academic activities.",
      accent: "border-red-300 bg-red-50/40 text-red-700",
    },
    {
      number: "02",
      titleVi: "Liêm Chính Học Thuật Tuyệt Đối",
      titleEn: "Strict Academic Integrity",
      icon: FileCheck,
      descVi:
        "Nghiêm cấm đạo văn, làm hộ bài thi cử, phát tán đề thi mật hoặc tiếp tay cho gian lận điểm số. Tutor tuyệt đối không khai khống hồ sơ năng lực, điểm thi hay làm giả chứng chỉ cá nhân.",
      descEn:
        "Strict prohibition against plagiarism, exam impersonation, or leak of confidential tests. Tutors must never forge academic credentials, transcripts, or awards.",
      accent: "border-amber-300 bg-amber-50/40 text-amber-700",
    },
    {
      number: "03",
      titleVi: "100% Phi Lợi Nhuận & Hoàn Toàn Miễn Phí",
      titleEn: "100% Non-Profit Education",
      icon: DollarSign,
      descVi:
        "Toàn bộ lớp học cộng đồng tại The Pencily là 100% miễn phí. Nghiêm cấm tutor hoặc thành viên tự ý thu tiền người học, bán tài liệu, hoặc thu thập thông tin để chào mời dịch vụ gia sư thương mại bên ngoài.",
      descEn:
        "All community classes at The Pencily are 100% free. Any solicitation of fees, selling of notes, or commercial tutoring pitching outside platform bounds is grounds for immediate expulsion.",
      accent: "border-emerald-300 bg-emerald-50/40 text-emerald-700",
    },
    {
      number: "04",
      titleVi: "Tôn Trọng Bản Quyền & Sở Hữu Trí Tuệ",
      titleEn: "Intellectual Property & Fair Use",
      icon: Scale,
      descVi:
        "Tutor giữ bản quyền đối với bài giảng do chính mình biên soạn. Khi sử dụng nguồn học liệu hoặc hình ảnh của bên thứ ba, bắt buộc phải trích dẫn nguồn gốc tác giả minh bạch và ưu tiên tài nguyên mở.",
      descEn:
        "Tutors retain authorship rights over self-compiled slides. Third-party content, diagrams, and external excerpts must be transparently cited adhering to fair use.",
      accent: "border-blue-300 bg-blue-50/40 text-blue-700",
    },
    {
      number: "05",
      titleVi: "Văn Hóa Học Tập Bình Đẳng & Tôn Trọng",
      titleEn: "Inclusive & Equal Culture",
      icon: HeartHandshake,
      descVi:
        "Nghiêm cấm định kiến và phân biệt đối xử dựa trên xuất thân trường lớp (chuyên / không chuyên), vùng miền, giới tính hay trình độ khởi đầu. Mọi học sinh đều có quyền được học hỏi và được tôn trọng như nhau.",
      descEn:
        "Zero discrimination based on school reputation (specialized vs non-specialized), geography, gender, or initial academic baseline. Every student is treated with equal dignity.",
      accent: "border-indigo-300 bg-indigo-50/40 text-indigo-700",
    },
  ];

  return (
    <div className="space-y-12">
      {/* Policy Hero */}
      <div className="bg-white rounded-md p-6 sm:p-8 border-2 border-[#0F2747] shadow-xs">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-red-100 text-red-800 text-xs font-black uppercase tracking-wider mb-4 border border-red-300">
          <AlertOctagon className="w-4 h-4 text-red-600" />
          <span>{isVi ? "Nguyên Tắc Giới Hạn Đỏ" : "Red-Line Policy"}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-poppins font-black text-[#0F2747] tracking-tight mb-3">
          {isVi
            ? "Bộ Quy Chuẩn An Toàn & Kỷ Luật Học Thuật"
            : "Community Safety & Academic Standards"}
        </h2>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          {isVi
            ? "Để duy trì một môi trường học tập lành mạnh, văn minh và an toàn cho tất cả học sinh, The Pencily áp dụng 5 Nguyên tắc Giới Hạn Đỏ bắt buộc đối với toàn bộ thành viên: Ban Điều Hành, Ban Chuyên Môn, Peer Tutor và Người Học."
            : "To preserve a safe, civilized, and wholesome peer-learning environment, The Pencily enforces 5 non-negotiable Red-Line principles across all participants: Leaders, Department Staff, Peer Tutors, and Learners."}
        </p>

        <div className="mt-6 pt-5 border-t border-slate-200 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setIsSafetyModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold border-2 border-red-700 shadow-2xs transition active:scale-95 cursor-pointer"
          >
            <Lock className="w-4 h-4" />
            <span>{isVi ? "Báo cáo vi phạm an toàn bí mật" : "Confidential safety report"}</span>
          </button>
        </div>
      </div>

      {/* 5 Policies */}
      <div>
        <div className="text-xs font-black uppercase tracking-wider text-[#4F7ECB] mb-2">
          {isVi ? "5 Điều khoản cốt lõi" : "5 Core Principles"}
        </div>
        <h3 className="text-xl sm:text-2xl font-poppins font-black text-[#0F2747] tracking-tight mb-6">
          {isVi ? "Chi Tiết 5 Nguyên Tắc Bắt Buộc" : "Mandatory Ground Rules"}
        </h3>

        <div className="space-y-4">
          {policies.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.number}
                className="bg-white rounded-md p-6 border-2 border-slate-300 hover:border-[#0F2747] shadow-xs transition-all flex flex-col md:flex-row items-start gap-5"
              >
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-poppins font-black text-2xl text-[#0F2747]">
                    {p.number}
                  </span>
                  <div className="w-10 h-10 rounded-sm border-2 border-slate-300 bg-[#FAF7F2] flex items-center justify-center text-[#0F2747]">
                    <Icon className="w-5 h-5 text-[#4F7ECB]" />
                  </div>
                </div>

                <div className="flex-1 space-y-1.5">
                  <h4 className="font-poppins font-bold text-base sm:text-lg text-[#0F2747]">
                    {isVi ? p.titleVi : p.titleEn}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {isVi ? p.descVi : p.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Official Transparency Disclaimer */}
      <div className="bg-[#FAF7F2] rounded-md p-6 sm:p-8 border-2 border-slate-300 border-l-4 border-l-[#FFC83D]">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-4 h-4 text-[#0F2747]" />
          <h3 className="font-poppins font-bold text-base sm:text-lg text-[#0F2747] uppercase tracking-wide">
            {isVi ? "Thông Điệp Minh Bạch Của Dự Án" : "Official Transparency Notice"}
          </h3>
        </div>

        <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>
            • {isVi
              ? "Tutor tại The Pencily là các bạn học sinh có năng lực, tâm huyết và đam mê chia sẻ kiến thức, rèn luyện kỹ năng truyền đạt; các bạn không phải là giáo viên chuyên nghiệp có bằng cấp sư phạm."
              : "Peer tutors at The Pencily are passionate high-achieving student peers, not certified pedagogical schoolteachers."}
          </p>
          <p>
            • {isVi
              ? "Nội dung các buổi học và tài liệu được xây dựng dựa trên sự tìm hiểu, tổng hợp và kinh nghiệm cá nhân với tinh thần học tập bình đẳng (peer-to-peer), học hỏi đa chiều."
              : "Session content and study resources reflect personal synthesis and shared peer learning insights."}
          </p>
          <p>
            • {isVi
              ? "Mọi hoạt động học tập tại The Pencily mang tính chất bổ trợ năng lực, phát triển tư duy và kỹ năng mềm, hoàn toàn không thay thế chương trình giảng dạy chính khóa của Bộ Giáo dục và Đào tạo."
              : "All activities are supplementary, focusing on soft skills and critical thinking, never replacing official national curricula."}
          </p>
        </div>
      </div>

      <SafetyReportModal
        isOpen={isSafetyModalOpen}
        onClose={() => setIsSafetyModalOpen(false)}
      />
    </div>
  );
}
