"use client";

import React from "react";
import { ShieldCheck, Award, Clock, Users, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { PencilyPortfolioIcon } from "@/components/icons/PencilyIcons";
import { usePencily } from "@/context/PencilyContext";
import { PencilyScrollReveal } from "@/components/PencilyScrollReveal";

interface HomeTutorPortfolioProps {
  onOpenTutorModal: () => void;
}

export function HomeTutorPortfolio({ onOpenTutorModal }: HomeTutorPortfolioProps) {
  const { language } = usePencily();
  const isVi = language === "vi";

  return (
    <section id="portfolio" className="pt-3 sm:pt-4">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <PencilyScrollReveal animation="stamp" delay={80}>
          <div className="bg-white rounded-md p-8 sm:p-12 border-2 border-slate-300 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Value Proposition */}
              <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#4F7ECB] mb-2">
                  {isVi ? "Hồ sơ hoạt động ngoại khóa" : "Extracurricular Portfolio"}
                </div>
                <h2 className="font-poppins font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0F2747] tracking-tight text-balance">
                  {isVi
                    ? "Pencily Peer Portfolio: Khẳng định năng lực & Tinh thần sẻ chia"
                    : "Pencily Peer Portfolio: Showcase Skills & Spirit of Giving"}
                </h2>
              </div>

              {/* 3 Value Points */}
              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-sm bg-blue-50 text-[#4F7ECB] border-2 border-blue-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#0F2747]">
                      {isVi ? "Minh chứng số giờ cống hiến thực tế" : "Verified Contribution Hours"}
                    </h4>
                    <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                      {isVi
                        ? "Hệ thống tự động ghi nhận số giờ host lớp học, số bạn học đã tham gia và phản hồi thực tế sau mỗi buổi chia sẻ."
                        : "The system automatically tracks hosted hours, attending students, and authentic post-session feedback."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-sm bg-amber-50 text-amber-600 border-2 border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#0F2747]">
                      {isVi ? "Chứng nhận hoạt động ngoại khóa phi lợi nhuận" : "Official Non-Profit Certification"}
                    </h4>
                    <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                      {isVi
                        ? "Giấy chứng nhận chính thức từ The Pencily, điểm sáng nổi bật trong bài luận và hồ sơ xét tuyển phương thức tài năng."
                        : "Official verified certificate from The Pencily, a standout asset for admissions essays and scholarship portfolios."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-sm bg-emerald-50 text-emerald-600 border-2 border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#0F2747]">
                      {isVi ? "Phương pháp tốt nhất để làm chủ kiến thức" : "The Best Way to Master Concepts"}
                    </h4>
                    <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                      {isVi
                        ? "Giảng giải được một vấn đề phức tạp cho người khác hiểu là đỉnh cao của sự thấu hiểu theo phương pháp Feynman."
                        : "Explaining complex concepts simply to fellow peers represents the pinnacle of mastery."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={onOpenTutorModal}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-white hover:bg-slate-50 text-[#0F2747] border-2 border-slate-300 hover:border-[#0F2747] font-semibold text-sm shadow-2xs transition active:scale-98 cursor-pointer"
                >
                  <span>{isVi ? "Ứng tuyển Peer Tutor" : "Apply as Peer Tutor"}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#4F7ECB]" />
                </button>
              </div>
            </div>

            {/* Right Column: Verified Tutor Portfolio Showcase */}
            <div className="lg:col-span-5">
              <div className="bg-[#FAF7F2] rounded-md p-6 sm:p-7 border-2 border-slate-300 shadow-xs space-y-5 relative">
                {/* Verified Header Tag */}
                <div className="flex items-center justify-between pb-3 border-b-2 border-slate-200 text-[10px] font-black uppercase tracking-wider text-slate-500">
                  <span>{isVi ? "Hồ Sơ Peer Tutor Xác Thực" : "Verified Peer Tutor Portfolio"}</span>
                  <span className="text-emerald-700 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-xs font-bold">
                    {isVi ? "Đã Xác Thực" : "Verified Badge"}
                  </span>
                </div>

                {/* Tutor Card Header */}
                <div className="flex items-center gap-3.5 pb-1">
                  <div className="w-14 h-14 rounded-sm bg-[#0F2747] text-white border-2 border-[#0F2747] flex items-center justify-center font-black text-lg shrink-0 shadow-2xs overflow-hidden relative">
                    <img
                      src="/bao-ngan.jpg"
                      alt="Hồ Bảo Ngân"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-poppins font-bold text-base text-[#0F2747]">
                        Hồ Bảo Ngân
                      </h4>
                      <CheckCircle2 className="w-4 h-4 text-[#4F7ECB]" />
                    </div>
                    <div className="text-xs text-[#64748B]">
                      {isVi ? "Phổ Thông Năng Khiếu, ĐHQG-HCM" : "High School for the Gifted, VNU-HCM"}
                    </div>
                    <div className="text-[11px] font-bold text-[#4F7ECB] mt-0.5">
                      {isVi ? "Chuyên đề: Toán & Kỹ năng giải đề ĐGNL" : "Focus: Math & Competency Exam Tactics"}
                    </div>
                  </div>
                </div>

                {/* Stats 3 Columns */}
                <div className="grid grid-cols-3 gap-2 text-center py-2 bg-white rounded-sm border-2 border-slate-200 p-3 shadow-2xs">
                  <div>
                    <div className="font-poppins font-bold text-lg text-[#0F2747]">52h</div>
                    <div className="text-[11px] text-slate-500 font-medium">{isVi ? "Giờ cống hiến" : "Hours Shared"}</div>
                  </div>
                  <div className="border-x-2 border-slate-100">
                    <div className="font-poppins font-bold text-lg text-[#0F2747]">26</div>
                    <div className="text-[11px] text-slate-500 font-medium">{isVi ? "Buổi chia sẻ" : "Sessions"}</div>
                  </div>
                  <div>
                    <div className="font-poppins font-bold text-lg text-amber-600 flex items-center justify-center gap-0.5">
                      <span>5.0</span>
                      <span className="text-xs text-amber-600 font-bold">★</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">{isVi ? "48 đánh giá" : "48 Reviews"}</div>
                  </div>
                </div>

                {/* Testimonial Quote */}
                <div className="p-3.5 bg-white rounded-sm border-2 border-slate-200 text-xs text-[#475569] leading-relaxed italic font-serif">
                  {isVi
                    ? "“Kèm bạn học hiểu sâu một bài toán khó chính là phương pháp ôn tập chủ động giúp mình ghi nhớ bản chất kiến thức lâu nhất.”"
                    : "“Explaining complex problems simply to my peers is the most effective way to truly master the fundamental principles.”"}
                </div>

                {/* Certificate Stamp */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t-2 border-slate-200">
                  <div className="flex items-center gap-2">
                    <PencilyPortfolioIcon size={18} className="text-[#0F2747]" />
                    <span className="font-mono font-bold text-[#0F2747]">
                      ID: PCY-VN-2026-0842
                    </span>
                  </div>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-xs border-2 border-emerald-300">
                    {isVi ? "Chứng chỉ chính thức" : "Official Certificate"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </PencilyScrollReveal>
      </div>
    </section>
  );
}
