"use client";

import React from "react";
import {
  Calendar,
  Milestone,
  CheckCircle2,
  Clock,
  Flag,
  Award,
  ArrowRight,
} from "lucide-react";
import { usePencily } from "@/context/PencilyContext";

export function AboutRoadmapView() {
  const { language } = usePencily();
  const isVi = language === "vi";

  const phases = [
    {
      phaseVi: "GIAI ĐOẠN 1",
      phaseEn: "PHASE 1",
      timeVi: "Khởi Đầu",
      timeEn: "Foundation",
      titleVi: "Xây Dựng Nền Tảng & Hạ Tầng Số",
      titleEn: "Foundation & Digital Infrastructure",
      statusVi: "Đã hoàn thành",
      statusEn: "Completed",
      tasksVi: [
        "Hoàn thiện Project Brief và ký cam kết nguyên tắc hoạt động Core Team",
        "Thiết lập Website The Pencily với danh mục lớp học, giao diện phòng học tương tác và cơ chế tích điểm",
        "Tái cấu trúc máy chủ Discord: thiết lập phân quyền vai trò tự động, bot ghi âm lớp học",
        "Xây dựng quy chế tuyển chọn và đào tạo phương pháp giảng dạy căn bản cho Tutor",
        "Biên soạn bộ tài liệu chuẩn bị cho các lớp học Flagship đầu tiên",
      ],
      tasksEn: [
        "Finalized Project Brief and Core Team Charter commitments",
        "Launched The Pencily platform with classroom studio, interactive rooms, and points system",
        "Restructured Discord server: automated role dispatch and voice pod organization",
        "Authored tutor vetting rubrics and 15-minute mock teaching criteria",
        "Compiled foundational syllabus notes for first flagship tracks",
      ],
    },
    {
      phaseVi: "GIAI ĐOẠN 2",
      phaseEn: "PHASE 2",
      timeVi: "Hiện Tại",
      timeEn: "Active",
      titleVi: "Chiêu Mộ Tutor & Khởi Động Cộng Đồng",
      titleEn: "Tutor Recruitment & Community Launch",
      statusVi: "Đang triển khai",
      statusEn: "In Progress",
      tasksVi: [
        "Mở đợt tuyển dụng Tutor trên mạng xã hội; tiến hành phỏng vấn & dự giờ Mock Teaching 15 phút",
        "Khai trương Website chính thức và công bố thời khóa biểu lớp học hàng tuần",
        "Tổ chức sự kiện Kick-off Webinar: 'Học tập bình đẳng: Tự tin làm chủ tri thức'",
        "Mở cổng ghi danh học viên và phân quyền vào các study group chuyên biệt",
      ],
      tasksEn: [
        "Open high school tutor recruiting campaigns, candidate interviews, and mock teaching reviews",
        "Public launch of classroom schedules and direct enrollment links",
        "Host community kick-off webinar on peer-to-peer learning empowerment",
        "Distribute learner roles and onboard students into dedicated Discord pods",
      ],
    },
    {
      phaseVi: "GIAI ĐOẠN 3",
      phaseEn: "PHASE 3",
      timeVi: "Sắp Diễn Ra",
      timeEn: "Upcoming",
      titleVi: "Vận Hành Thử Nghiệm & Chuẩn Hóa Thư Viện",
      titleEn: "Cohort Pilot & Resource Library Standardization",
      statusVi: "Kế hoạch",
      statusEn: "Planned",
      tasksVi: [
        "Vận hành các chuỗi lớp học ngắn hạn (3–4 tuần) trên phòng Voice chuyên biệt",
        "Thu thập biểu mẫu đánh giá sau mỗi buổi học để Tutor liên tục nâng cấp chất lượng",
        "Đưa các ghi chú học tập, bài giải hay đạt chuẩn lên chuyên mục Thư Viện Tài Liệu Mở",
        "Tổ chức các buổi Study Group & Q&A giải bài tập ôn thi hàng tuần",
      ],
      tasksEn: [
        "Run 3 to 4-week intensive sprint courses in dedicated voice pods",
        "Gather post-class peer feedback forms for iterative tutor coaching",
        "Publish vetted student study notes to the Open Resource Library",
        "Host regular weekend live study halls and problem-solving clinics",
      ],
    },
    {
      phaseVi: "GIAI ĐOẠN 4",
      phaseEn: "PHASE 4",
      timeVi: "Mục Tiêu Năm",
      timeEn: "Annual Goal",
      titleVi: "Cấp Chứng Nhận & Mở Rộng Quy Mô Liên Trường",
      titleEn: "Tutor Certification & Nationwide Expansion",
      statusVi: "Kế hoạch dài hạn",
      statusEn: "Long-term",
      tasksVi: [
        "Cấp chứng nhận Verified Tutor Certificate chính thức xác nhận bởi Ban Điều Hành",
        "Đánh giá các chỉ số KPIs: số lượng học sinh tiếp cận, mức độ tiến bộ và sự hài lòng",
        "Tổ chức buổi vinh danh và tổng kết thành tựu của các bạn Tutor",
        "Mở rộng câu lạc bộ đại sứ học tập tới hơn 50 trường THPT trên toàn quốc",
      ],
      tasksEn: [
        "Issue verified Tutor Certificates validated by the Executive Board",
        "Audit core impact metrics: student reach, academic improvement, and engagement",
        "Host annual tutor recognition ceremony",
        "Expand peer-learning student ambassador chapters to 50+ high schools nationwide",
      ],
    },
  ];

  return (
    <div className="space-y-12">
      {/* Roadmap Hero */}
      <div className="bg-white rounded-md p-6 sm:p-8 border-2 border-[#0F2747] shadow-xs">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-[#0F2747] text-white text-xs font-bold uppercase tracking-wider mb-4">
          <Milestone className="w-4 h-4 text-[#FFC83D]" />
          <span>{isVi ? "Kế Hoạch Thực Thi" : "Strategic Roadmap"}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-poppins font-black text-[#0F2747] tracking-tight mb-3">
          {isVi
            ? "Lộ Trình Phát Triển Từng Giai Đoạn"
            : "Multi-Phase Project Development Roadmap"}
        </h2>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          {isVi
            ? "The Pencily được xây dựng với tầm nhìn bài bản và từng bước đi chắc chắn: từ hoàn thiện hạ tầng số, tuyển chọn Tutor chất lượng, đến mở rộng mạng lưới liên trường trên khắp Việt Nam."
            : "The Pencily is constructed with systematic discipline: from building reliable digital infrastructure and vetting high-caliber tutors, to expanding a nationwide inter-school learning network."}
        </p>
      </div>

      {/* 4 Phases */}
      <div className="space-y-6">
        {phases.map((phase, idx) => (
          <div
            key={idx}
            className="bg-white rounded-md p-6 sm:p-8 border-2 border-slate-300 hover:border-[#0F2747] shadow-xs transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-xs bg-[#0F2747] text-[#FFC83D]">
                  {isVi ? phase.phaseVi : phase.phaseEn}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {isVi ? phase.timeVi : phase.timeEn}
                </span>
              </div>

              <span className="inline-block text-xs font-bold px-3 py-1 rounded-xs bg-slate-100 border border-slate-300 text-slate-700 w-fit">
                {isVi ? phase.statusVi : phase.statusEn}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-poppins font-bold text-[#0F2747] mb-4">
              {isVi ? phase.titleVi : phase.titleEn}
            </h3>

            <div className="space-y-2">
              {(isVi ? phase.tasksVi : phase.tasksEn).map((task, tIdx) => (
                <div key={tIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{task}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
