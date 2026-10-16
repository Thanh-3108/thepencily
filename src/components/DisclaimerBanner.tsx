import React from "react";
import { ShieldAlert, Info, Award } from "lucide-react";

export function DisclaimerBanner() {
  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-md bg-white border-2 border-[#0F2747] p-5 sm:p-7 shadow-xs">
        {/* Accent indicator bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#FFC83D]" />

        <div className="flex flex-col md:flex-row items-start gap-4 sm:gap-6">
          <div className="p-3 bg-amber-100 border-2 border-amber-300 rounded-sm text-[#0F2747] flex-shrink-0">
            <Info className="w-6 h-6 text-[#0F2747]" />
          </div>

          <div className="flex-1 space-y-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-xs bg-[#0F2747] text-[#FFF9EF]">
                Thông Điệp & Tôn Chỉ Minh Bạch
              </span>
              <span className="text-xs font-bold text-[#4F7ECB]">
                Disclaimer chính thức The Pencily
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-extrabold text-[#0F2747] font-heading">
              Học Tập Bình Đẳng (Peer-to-Peer) & Bổ Trợ Năng Lực Toàn Diện
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-[#4B5563] pt-1">
              <div className="p-3.5 bg-[#FFF9EF] rounded-sm border-2 border-amber-300">
                <div className="font-bold text-[#0F2747] mb-1">
                  Đội ngũ Peer Tutor
                </div>
                Tutor tại The Pencily là các bạn học sinh có năng lực học thuật xuất sắc và đam mê truyền đạt; <b>không phải là giáo viên chuyên nghiệp có bằng cấp sư phạm</b>.
              </div>

              <div className="p-3.5 bg-[#FFF9EF] rounded-sm border-2 border-[#4F7ECB]/40">
                <div className="font-bold text-[#0F2747] mb-1">
                  Phương pháp & Giáo trình
                </div>
                Nội dung học tập và tài liệu được tổng hợp từ trải nghiệm thực tế với tinh thần học tập bình đẳng, đối thoại hai chiều giữa bạn cùng lứa.
              </div>

              <div className="p-3.5 bg-[#FFF9EF] rounded-sm border-2 border-slate-300">
                <div className="font-bold text-[#0F2747] mb-1">
                  Mục đích Bổ trợ
                </div>
                Mọi hoạt động mang tính phát phát triển tư duy, kỹ năng mềm và phương pháp tự học, <b>hoàn toàn không thay thế chương trình chính khóa của Bộ GD&ĐT</b>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
