"use client";

import React, { useState } from "react";

import { Clock } from "lucide-react";
import { usePencily } from "@/context/PencilyContext";
import { PencilMascot } from "@/components/Logo";

interface ClassDirectoryProps {
  onSelectClassToRegister: (className: string) => void;
}

export function ClassDirectory({ onSelectClassToRegister }: ClassDirectoryProps) {
  const { classes } = usePencily();
  const [activeTab, setActiveTab] = useState<"all" | "cohort" | "group" | "workshop">("all");

  const filtered = classes;

  return (
    <section id="classes" className="py-20 sm:py-28 bg-[#FFFDF9] border-t border-[#0F2747]/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Simple Section Header */}
        <div className="max-w-xl mb-12">
          <h2 className="font-poppins font-black text-3xl sm:text-4xl text-[#0F2747] tracking-tight mb-3">
            Explore Classes.
          </h2>
          <p className="font-inter text-sm sm:text-base text-[#4B5563] leading-relaxed">
            Các lớp học và nhóm học tập peer-to-peer hoàn toàn miễn phí, được tổ chức trực tiếp qua máy chủ Discord.
          </p>

          {/* Clean Filter Tabs without background block */}
          <div className="flex items-center gap-6 border-b border-[#0F2747]/10 mt-6 pb-0.5">
            {[
              { id: "all", label: "Tất cả" },
              { id: "cohort", label: "Cohort Classes" },
              { id: "group", label: "Study Groups" },
              { id: "workshop", label: "Workshops" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-2 text-xs font-semibold transition-all cursor-pointer border-b-2 ${
                  activeTab === tab.id
                    ? "text-[#0F2747] font-bold border-[#0F2747]"
                    : "text-[#64748B] font-medium border-transparent hover:text-[#0F2747]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Class Grid or Empty State */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 border border-slate-200/80 text-center space-y-4">
            <PencilMascot size="lg" className="mx-auto" />
            <div className="max-w-md mx-auto">
              <h4 className="font-bold text-base text-[#0F2747]">
                Cú Pencily chưa thấy lớp học nào trong mục này!
              </h4>
              <p className="text-xs sm:text-sm text-[#4B5563] mt-1 leading-relaxed">
                Các bạn peer tutor sẽ sớm cập nhật lịch lớp mới. Bạn cũng có thể đề xuất chủ đề bạn muốn học nhé!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-7 border border-[#0F2747]/10 hover:border-[#0F2747]/30 transition-all hover:shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#4F7ECB] shrink-0">
                      {item.categoryLabel}
                    </span>
                    <span className="text-xs text-[#6B7280] font-medium whitespace-normal flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#6B7280] shrink-0" />
                      <span>{item.schedule}</span>
                    </span>
                  </div>

                  <h3 className="font-poppins font-bold text-xl text-[#0F2747] mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="text-xs text-[#6B7280]">
                    Tutor hướng dẫn: <b className="text-[#0F2747]">{item.tutorName}</b> ({item.tutorSchool})
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#16A34A]">
                    ✓ Học phí 0đ (Miễn phí)
                  </span>
                  <button
                    onClick={() => onSelectClassToRegister(item.title)}
                    className="px-5 py-2 rounded-full bg-[#FFC83D] hover:bg-[#EAB308] text-[#0F2747] text-xs font-bold transition-all active:scale-95"
                  >
                    Đăng ký tham gia →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
