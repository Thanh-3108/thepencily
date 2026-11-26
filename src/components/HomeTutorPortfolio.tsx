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
    <section id="portfolio" className="pt-8 sm:pt-12">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <PencilyScrollReveal animation="stamp" delay={80}>
          <div className="bg-white rounded-3xl p-7 sm:p-12 border border-[#E6DEC8] shadow-pencily-soft">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Value Proposition */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#EEF5FF] text-[#3B6FD8] text-xs font-semibold mb-3">
                    {isVi ? "Hồ sơ hoạt động ngoại khóa" : "Extracurricular Portfolio"}
                  </div>
                  <h2 className="font-poppins font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0F2747] tracking-tight text-balance">
                    {isVi
                      ? "Pencily Peer Portfolio: Ghi dấu năng lực & Tinh thần sẻ chia"
                      : "Pencily Peer Portfolio: Showcase Skills & Spirit of Giving"}
                  </h2>
                </div>

                {/* 3 Warm Benefits (NO micro monospace uppercase spam) */}
                <div className="space-y-3.5 pt-1">
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF7EE]/85 border border-[#ECE4CE]">
                    <div className="w-10 h-10 rounded-xl bg-[#EAF2FF] text-[#3B6FD8] flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-poppins font-bold text-sm sm:text-base text-[#0F2747] mb-0.5">
                        {isVi ? "Minh chứng số giờ cống hiến minh bạch" : "Verified Contribution Hours"}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#526277] leading-relaxed">
                        {isVi
                          ? "Tự động lưu lại số giờ mở lớp, số bạn học đã tham gia và phản hồi tích cực sau mỗi buổi chia sẻ."
                          : "Automatically records hosted hours, attending students, and authentic post-session feedback."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF7EE]/85 border border-[#ECE4CE]">
                    <div className="w-10 h-10 rounded-xl bg-[#FFF6DC] text-amber-600 flex items-center justify-center shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-poppins font-bold text-sm sm:text-base text-[#0F2747] mb-0.5">
                        {isVi ? "Chứng nhận ngoại khóa phi lợi nhuận" : "Official Non-Profit Certification"}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#526277] leading-relaxed">
                        {isVi
                          ? "Giấy chứng nhận chính thức từ The Pencily, điểm nhấn chân thực trong bài luận và hồ sơ xét tuyển tài năng."
                          : "Official verified certificate from The Pencily for admissions essays and scholarship dossiers."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF7EE]/85 border border-[#ECE4CE]">
                    <div className="w-10 h-10 rounded-xl bg-[#E8F8F0] text-emerald-600 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-poppins font-bold text-sm sm:text-base text-[#0F2747] mb-0.5">
                        {isVi ? "Làm chủ kiến thức theo tư duy Feynman" : "Master Concepts via Feynman Method"}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#526277] leading-relaxed">
                        {isVi
                          ? "Khi bạn có thể giảng giải một bài toán khó cho bạn bè hiểu sâu, đó là lúc chính bạn hiểu rõ nhất."
                          : "Explaining complex problems simply to peers is the strongest proof of deep understanding."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Friendly Pill Action Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onOpenTutorModal}
                    className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#0F2747] hover:bg-[#193B6B] text-white font-semibold text-sm shadow-tactile-navy transition cursor-pointer"
                  >
                    <span>{isVi ? "Ứng tuyển Peer Tutor" : "Apply as Peer Tutor"}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#FFC83D] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Verified Tutor Portfolio Showcase */}
              <div className="lg:col-span-5">
                <div className="bg-gradient-to-b from-[#FAF7EE] to-[#FFFDF9] rounded-3xl p-6 sm:p-7 border border-[#E6DEC8] shadow-pencily-soft space-y-5 relative overflow-hidden">
                  {/* Top Golden Ribbon */}
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#FFC83D] via-amber-400 to-[#4F7ECB]" />

                  <div className="flex items-center justify-between pb-3 border-b border-[#E6DEC8]/70 text-xs font-semibold text-[#526277]">
                    <span>{isVi ? "Hồ sơ Peer Tutor mẫu" : "Sample Verified Portfolio"}</span>
                    <span className="text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
                      {isVi ? "Đã xác thực" : "Verified"}
                    </span>
                  </div>

                  {/* Tutor Card Header */}
                  <div className="flex items-center gap-4">
                    <div className="w-15 h-15 rounded-2xl bg-[#0F2747] text-white border-2 border-white shadow-sm flex items-center justify-center shrink-0 overflow-hidden">
                      <img
                        src="/bao-ngan.jpg"
                        alt="Hồ Bảo Ngân"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-poppins font-bold text-base sm:text-lg text-[#0F2747]">
                          Hồ Bảo Ngân
                        </h4>
                        <CheckCircle2 className="w-4 h-4 text-[#3B6FD8]" />
                      </div>
                      <div className="text-xs text-[#526277]">
                        {isVi ? "Phổ Thông Năng Khiếu, ĐHQG-HCM" : "High School for the Gifted, VNU-HCM"}
                      </div>
                      <div className="text-xs font-semibold text-[#3B6FD8] mt-0.5">
                        {isVi ? "Chuyên đề: Toán & Giải đề ĐGNL" : "Focus: Math & Exam Strategy"}
                      </div>
                    </div>
                  </div>

                  {/* Stats 3 Columns */}
                  <div className="grid grid-cols-3 gap-2 text-center py-3 bg-white rounded-2xl border border-[#ECE4CE] shadow-2xs">
                    <div>
                      <div className="font-poppins font-bold text-lg text-[#0F2747]">52h</div>
                      <div className="text-[11px] text-[#6B7A90] font-medium">{isVi ? "Giờ cống hiến" : "Hours Shared"}</div>
                    </div>
                    <div className="border-x border-[#F0EAE0]">
                      <div className="font-poppins font-bold text-lg text-[#0F2747]">26</div>
                      <div className="text-[11px] text-[#6B7A90] font-medium">{isVi ? "Buổi chia sẻ" : "Sessions"}</div>
                    </div>
                    <div>
                      <div className="font-poppins font-bold text-lg text-amber-600 flex items-center justify-center gap-0.5">
                        <span>5.0</span>
                        <span className="text-xs text-amber-500">★</span>
                      </div>
                      <div className="text-[11px] text-[#6B7A90] font-medium">{isVi ? "48 đánh giá" : "48 Reviews"}</div>
                    </div>
                  </div>

                  {/* Testimonial Quote */}
                  <div className="p-4 bg-white rounded-2xl border border-[#ECE4CE] text-xs sm:text-sm text-[#4A5B72] leading-relaxed italic font-serif">
                    {isVi
                      ? "“Kèm bạn học hiểu sâu một bài toán khó chính là phương pháp ôn tập chủ động giúp mình ghi nhớ bản chất kiến thức lâu nhất.”"
                      : "“Explaining complex problems simply to my peers is the most effective way to truly master the fundamental principles.”"}
                  </div>

                  {/* Certificate Stamp */}
                  <div className="flex items-center justify-between text-xs text-[#6B7A90] pt-1">
                    <div className="flex items-center gap-2">
                      <PencilyPortfolioIcon size={18} className="text-[#0F2747]" />
                      <span className="font-medium text-[#0F2747]">
                        ID: PCY-VN-2026-0842
                      </span>
                    </div>
                    <span className="text-emerald-700 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
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
