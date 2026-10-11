"use client";

import React from "react";
import { ShieldCheck, Award, Clock, Star, Users, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { PencilMascot } from "@/components/Logo";

interface HomeTutorPortfolioProps {
  onOpenTutorModal: () => void;
}

export function HomeTutorPortfolio({ onOpenTutorModal }: HomeTutorPortfolioProps) {
  return (
    <section id="portfolio" className="pt-20 sm:pt-28">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#4F7ECB] mb-2">
                  Hồ sơ hoạt động ngoại khóa • Gen 1.0
                </div>
                <h2 className="font-poppins font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0F2747] tracking-tight text-balance">
                  Pencily Peer Portfolio • Khẳng định năng lực & Tinh thần sẻ chia
                </h2>
                <p className="mt-3.5 text-[#475569] text-base leading-relaxed text-balance">
                  Khi đồng hành làm Peer Tutor, bạn không chỉ giúp đỡ bạn bè cùng tiến bộ mà còn xây dựng một minh chứng năng lực uy tín cho hồ sơ học bổng, du học và tuyển sinh đại học.
                </p>
              </div>

              {/* 3 Value Points */}
              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#4F7ECB] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#0F2747]">
                      Minh chứng số giờ cống hiến thực tế
                    </h4>
                    <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                      Hệ thống tự động ghi nhận số giờ host lớp học, số bạn học đã tham gia và phản hồi thực tế sau mỗi buổi chia sẻ.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#0F2747]">
                      Chứng nhận hoạt động ngoại khóa phi lợi nhuận
                    </h4>
                    <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                      Giấy chứng nhận chính thức từ The Pencily Gen 1.0 — điểm sáng nổi bật trong bài luận và hồ sơ xét tuyển phương thức tài năng.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#0F2747]">
                      Phương pháp tốt nhất để làm chủ kiến thức
                    </h4>
                    <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                      Giảng giải được một vấn đề phức tạp cho người khác hiểu là đỉnh cao của sự thấu hiểu (Feynman Technique).
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={onOpenTutorModal}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#0F2747] border border-slate-300 hover:border-slate-400 font-semibold text-sm shadow-2xs transition active:scale-98 cursor-pointer"
                >
                  <span>Ứng tuyển Peer Tutor Gen 1.0</span>
                  <ArrowUpRight className="w-4 h-4 text-[#4F7ECB]" />
                </button>
              </div>
            </div>

            {/* Right Column: Visual Mockup Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#FAF7F2] rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5">
                {/* Tutor Card Header */}
                <div className="flex items-center gap-3.5 pb-4 border-b border-slate-200/80">
                  <div className="w-14 h-14 rounded-2xl bg-[#0F2747] text-white flex items-center justify-center font-bold text-xl shrink-0">
                    QA
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-poppins font-bold text-base text-[#0F2747]">
                        Nguyễn Lê Quỳnh Anh
                      </h4>
                      <CheckCircle2 className="w-4 h-4 text-[#4F7ECB]" />
                    </div>
                    <div className="text-xs text-[#64748B]">
                      Học sinh Lớp 12 • THPT Chuyên Hà Nội - Amsterdam
                    </div>
                    <div className="text-[11px] font-bold text-[#4F7ECB] mt-0.5">
                      Peer Tutor: Toán học 12 & Giải tích
                    </div>
                  </div>
                </div>

                {/* Stats 3 Columns */}
                <div className="grid grid-cols-3 gap-2 text-center py-2 bg-white rounded-xl border border-slate-200/60 p-3">
                  <div>
                    <div className="font-poppins font-bold text-base text-[#0F2747]">48h</div>
                    <div className="text-[11px] text-slate-500 font-medium">Giờ chia sẻ</div>
                  </div>
                  <div className="border-x border-slate-100">
                    <div className="font-poppins font-bold text-base text-[#0F2747]">18</div>
                    <div className="text-[11px] text-slate-500 font-medium">Buổi học</div>
                  </div>
                  <div>
                    <div className="font-poppins font-bold text-base text-amber-600 flex items-center justify-center gap-0.5">
                      <span>4.9</span>
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">Đánh giá</div>
                  </div>
                </div>

                {/* Testimonial Quote */}
                <div className="p-3.5 bg-white rounded-xl border border-slate-200/60 text-xs text-[#475569] leading-relaxed italic">
                  “Việc cùng các bạn giải đề thi thử mỗi tối thứ Tư giúp mình ôn lại kỹ năng Casio cực kỳ nhuần nhuyễn. Cảm ơn The Pencily đã tạo một sân chơi học thuật tử tế!”
                </div>

                {/* Certificate Stamp */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <PencilMascot size={22} />
                    <span className="font-bold text-[#0F2747]">
                      Chứng nhận ID: #PEN-TUT-2026-089
                    </span>
                  </div>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/50">
                    Verified Gen 1.0
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
