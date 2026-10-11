"use client";

import React from "react";
import Link from "next/link";
import { Search, Users, Award, ArrowRight } from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Khám phá & Chọn chủ đề bạn cần",
    subtitle: "Dễ dàng tra cứu trên Dashboard",
    description: "Xem lịch các buổi bootcamp đang mở, lọc theo phân môn (Toán, Lý, Hóa, Ngoại ngữ...) hoặc gửi yêu cầu đề xuất chủ đề bạn đang bị hổng kiến thức để tutor mở lớp.",
    icon: Search,
    iconBg: "bg-blue-50 text-blue-600",
  },
  {
    step: "02",
    title: "Vào phòng học Discord hoặc Web",
    subtitle: "Không khí nhóm nhỏ ấm cúng",
    description: "Tham gia cùng 3–8 bạn học sinh. Bật mic, chia sẻ màn hình bài giải hoặc sử dụng bảng ghi chú The Pencily. Thoải mái đặt câu hỏi mà không sợ bị phán xét hay chê cười.",
    icon: Users,
    iconBg: "bg-amber-50 text-amber-600",
  },
  {
    step: "03",
    title: "Làm chủ kiến thức & Lan tỏa trở lại",
    subtitle: "Xây dựng Portfolio cống hiến",
    description: "Khi đã tự tin môn học, bạn có thể ứng tuyển làm Peer Tutor để giúp đỡ các bạn khóa dưới, tích lũy điểm Pencily Points (PP) và nhận chứng nhận hoạt động ngoại khóa.",
    icon: Award,
    iconBg: "bg-emerald-50 text-emerald-600",
  },
];

export function HomeHowItWorks() {
  return (
    <section id="how-it-works" className="pt-20 sm:pt-28">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-[#4F7ECB] mb-2">
            Vận hành minh bạch
          </div>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-[#0F2747] tracking-tight text-balance">
            Cách The Pencily hoạt động
          </h2>
          <p className="mt-3.5 text-[#475569] text-base leading-relaxed text-balance">
            Mọi thứ được tinh giản tối đa: không thủ tục đăng ký rườm rà, không thu bất kỳ chi phí nào.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Step Number & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-poppins font-black text-2xl text-[#0F2747]/25 tracking-wider">
                      {item.step}
                    </span>
                    <div className={`w-11 h-11 rounded-xl ${item.iconBg} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-poppins font-bold text-lg text-[#0F2747] mb-1">
                    {item.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#4F7ECB] mb-3">
                    {item.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#475569] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    100% Miễn phí & Tự nguyện
                  </span>
                  <Link
                    href="/dashboard"
                    className="text-xs font-bold text-[#0F2747] hover:text-[#4F7ECB] flex items-center gap-1 transition-colors"
                  >
                    <span>Khám phá</span>
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
