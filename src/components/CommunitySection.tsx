"use client";

import React from "react";
import { DiscordLogo } from "./BrandIcons";

export function CommunitySection() {
  return (
    <section id="community" className="py-20 sm:py-28 bg-[#FFF9EF] border-t border-[#0F2747]/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-poppins font-black text-3xl sm:text-4xl lg:text-5xl text-[#0F2747] tracking-tight leading-tight">
              Good Students
              <br />
              Make Better
              <br />
              Communities.
            </h2>

            <p className="font-inter text-base text-[#4B5563] leading-relaxed max-w-md">
              Môi trường học tập cởi mở kết nối học sinh giữa các trường học. Bạn vừa là người tiếp nhận kiến thức, vừa có thể trở thành người chia sẻ, mentor hoặc tutor cho bạn bè.
            </p>

            <div className="text-xs font-semibold text-[#6B7280] tracking-widest uppercase pt-2">
              Find → Learn → Share → Teach → Collaborate → Grow
            </div>
          </div>

          {/* Right: Clean Discord Invite Box */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-[#0F2747] text-white p-8 sm:p-10 shadow-lg relative overflow-hidden">
              <div className="text-xs font-bold uppercase tracking-widest text-[#FFC83D] mb-3">
                Official Discord Server
              </div>
              <h3 className="font-poppins font-extrabold text-2xl sm:text-3xl text-white mb-3">
                Tham gia không gian học tập cùng The Pencily.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 max-w-md">
                Phòng Voice 24/7 học Pomodoro, kênh hỏi đáp theo từng môn học và link tham gia trực tiếp các buổi lớp học định kỳ.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://discord.gg/6hpEf4wC4z"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all active:scale-95"
                >
                  <DiscordLogo className="w-4 h-4" />
                  Vào Discord The Pencily →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
