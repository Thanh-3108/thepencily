"use client";

import React from "react";
import Link from "next/link";
import { Search, Users, Award, ArrowRight } from "lucide-react";
import { usePencily } from "@/context/PencilyContext";
import { PencilyScrollReveal } from "@/components/PencilyScrollReveal";

export function HomeHowItWorks() {
  const { language } = usePencily();
  const isVi = language === "vi";

  const steps = [
    {
      step: "01",
      title: isVi ? "Khám phá & Chọn chủ đề bạn cần" : "Explore & Pick What You Need",
      subtitle: isVi ? "Dễ dàng tra cứu trên Dashboard" : "Browse on Dashboard with Ease",
      description: isVi
        ? "Xem lịch các buổi bootcamp đang mở, lọc theo phân môn (Toán, Lý, Hóa, Ngoại ngữ...) hoặc gửi yêu cầu đề xuất chủ đề bạn đang bị hổng kiến thức để tutor mở lớp."
        : "Check open bootcamp schedules, filter by subject (Math, Science, English...), or submit requests for topics you need help with.",
      icon: Search,
      iconBg: "bg-blue-50 text-blue-600",
    },
    {
      step: "02",
      title: isVi ? "Vào phòng học Discord hoặc Web" : "Join via Discord or Web Rooms",
      subtitle: isVi ? "Không khí nhóm nhỏ ấm cúng" : "Cozy Small-Group Atmosphere",
      description: isVi
        ? "Tham gia cùng 3–8 bạn học sinh. Bật mic, chia sẻ màn hình bài giải hoặc sử dụng bảng ghi chú The Pencily. Thoải mái đặt câu hỏi mà không sợ bị phán xét hay chê cười."
        : "Study in pods of 3–8 students. Turn on your mic, screen-share solutions, or use interactive whiteboards without fear of judgment.",
      icon: Users,
      iconBg: "bg-amber-50 text-amber-600",
    },
    {
      step: "03",
      title: isVi ? "Làm chủ kiến thức & Lan tỏa trở lại" : "Master Knowledge & Give Back",
      subtitle: isVi ? "Xây dựng Portfolio cống hiến" : "Build Your Contribution Portfolio",
      description: isVi
        ? "Khi đã tự tin môn học, bạn có thể ứng tuyển làm Peer Tutor để giúp đỡ các bạn khóa dưới, tích lũy điểm Pencily Points (PP) và nhận chứng nhận hoạt động ngoại khóa."
        : "Once confident, apply as a Peer Tutor to guide junior peers, earn Pencily Points (PP), and receive official extracurricular certificates.",
      icon: Award,
      iconBg: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <section id="how-it-works" className="pt-20 sm:pt-28">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <PencilyScrollReveal animation="bounce-up" delay={50}>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-xs font-bold uppercase tracking-wider text-[#4F7ECB] mb-2">
              {isVi ? "Vận hành minh bạch" : "Transparent Operation"}
            </div>
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-[#0F2747] tracking-tight text-balance">
              {isVi ? "Cách The Pencily hoạt động" : "How The Pencily Works"}
            </h2>
          </div>
        </PencilyScrollReveal>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            const rotation = idx === 0 ? "-1.2deg" : idx === 1 ? "1deg" : "-0.8deg";
            return (
              <PencilyScrollReveal
                key={item.step}
                animation={idx % 2 === 0 ? "tilt-left" : "tilt-right"}
                delay={idx * 160}
                rotate={rotation}
                className="h-full"
              >
                <div
                  className="bg-white rounded-md p-6 sm:p-7 border-2 border-slate-300 hover:border-[#0F2747] shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-full"
                >
                <div>
                  {/* Top Step Number & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-poppins font-black text-2xl text-[#0F2747]/25 tracking-wider">
                      {item.step}
                    </span>
                    <div className={`w-11 h-11 rounded-sm border-2 border-slate-200 ${item.iconBg} flex items-center justify-center`}>
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

                <div className="pt-5 mt-5 border-t-2 border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    {isVi ? "100% Miễn phí & Tự nguyện" : "100% Free & Voluntary"}
                  </span>
                  <Link
                    href="/dashboard"
                    className="text-xs font-bold text-[#0F2747] hover:text-[#4F7ECB] flex items-center gap-1 transition-colors"
                  >
                    <span>{isVi ? "Khám phá" : "Explore"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </PencilyScrollReveal>
          );
          })}
        </div>
      </div>
    </section>
  );
}
