"use client";

import React from "react";
import { ShieldCheck, Award, Clock, Users, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { PencilyPortfolioIcon } from "@/components/icons/PencilyIcons";
import { usePencily } from "@/context/PencilyContext";

interface HomeTutorPortfolioProps {
  onOpenTutorModal: () => void;
}

export function HomeTutorPortfolio({ onOpenTutorModal }: HomeTutorPortfolioProps) {
  const { language } = usePencily();
  const isVi = language === "vi";

  return (
    <section id="portfolio" className="pt-20 sm:pt-28">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
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

            {/* Right Column: Visual Mockup Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#FAF7F2] rounded-md p-6 border-2 border-slate-300 shadow-xs space-y-5">
                {/* Proofcheck Tag */}
                <div className="flex items-center justify-between pb-3 border-b-2 border-slate-200 text-[10px] font-black uppercase tracking-wider text-slate-500">
                  <span>{isVi ? "Khung Portfolio Tutor Mẫu" : "Sample Tutor Portfolio Frame"}</span>
                  <span className="text-amber-700 bg-amber-50 border border-amber-300 px-2 py-0.5 rounded-xs">
                    {isVi ? "Chờ proofcheck" : "Proofcheck Draft"}
                  </span>
                </div>

                {/* Tutor Card Header Placeholder */}
                <div className="flex items-center gap-3.5 pb-2">
                  <div className="w-14 h-14 rounded-sm bg-white border-2 border-dashed border-[#0F2747]/40 text-[#0F2747] flex flex-col items-center justify-center font-bold text-[10px] shrink-0 text-center p-1">
                    <span>&lt;Ảnh&gt;</span>
                    <span className="text-[9px] text-slate-500">Avatar</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-poppins font-bold text-base text-[#0F2747]">
                        &lt;Họ & Tên Peer Tutor&gt;
                      </h4>
                      <CheckCircle2 className="w-4 h-4 text-[#4F7ECB]" />
                    </div>
                    <div className="text-xs text-[#64748B]">
                      {isVi ? "<Trường THPT / Đại học / Lớp>" : "<High School / University / Grade>"}
                    </div>
                    <div className="text-[11px] font-bold text-[#4F7ECB] mt-0.5">
                      {isVi ? "<Chuyên đề / Môn học phụ trách>" : "<Focus Subject / Topic>"}
                    </div>
                  </div>
                </div>

                {/* Stats 3 Columns */}
                <div className="grid grid-cols-3 gap-2 text-center py-2 bg-white rounded-sm border-2 border-slate-200 p-3">
                  <div>
                    <div className="font-poppins font-bold text-base text-[#0F2747]">&lt;--h&gt;</div>
                    <div className="text-[11px] text-slate-500 font-medium">{isVi ? "Giờ chia sẻ" : "Hours Shared"}</div>
                  </div>
                  <div className="border-x-2 border-slate-100">
                    <div className="font-poppins font-bold text-base text-[#0F2747]">&lt;--&gt;</div>
                    <div className="text-[11px] text-slate-500 font-medium">{isVi ? "Buổi học" : "Sessions"}</div>
                  </div>
                  <div>
                    <div className="font-poppins font-bold text-base text-amber-600 flex items-center justify-center gap-0.5">
                      <span>&lt;--&gt;</span>
                      <span className="text-xs text-amber-600 font-bold">(5.0)</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">{isVi ? "Đánh giá" : "Rating"}</div>
                  </div>
                </div>

                {/* Testimonial Quote */}
                <div className="p-3.5 bg-white rounded-sm border-2 border-slate-200 text-xs text-[#475569] leading-relaxed italic">
                  {isVi
                    ? "“<Lời chia sẻ trải nghiệm & cảm nghĩ thực tế của Peer Tutor (Placeholder sẵn sàng cập nhật sau khi proofcheck)>”"
                    : "“<Authentic quote and experience from the Peer Tutor (Ready to be filled after team proofcheck)>”"}
                </div>

                {/* Certificate Stamp */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t-2 border-slate-200">
                  <div className="flex items-center gap-2">
                    <PencilyPortfolioIcon size={18} className="text-[#0F2747]" />
                    <span className="font-bold text-[#0F2747]">
                      {isVi ? "Chứng nhận ID: &lt;Mã số ID&gt;" : "Certificate ID: &lt;ID Number&gt;"}
                    </span>
                  </div>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-xs border-2 border-emerald-300">
                    Verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
