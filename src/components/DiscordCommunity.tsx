"use client";

import React, { useState } from "react";
import { Hash, Volume2, ShieldCheck, Users, Sparkles, MessageSquare, ExternalLink, Bot, Bell } from "lucide-react";
import { DiscordLogo } from "./BrandIcons";

export function DiscordCommunity() {
  const [activeChannel, setActiveChannel] = useState("thong-bao-gen-1");

  const channels = [
    { id: "thong-bao-gen-1", name: "thong-bao-gen-1", type: "text", category: "CHÀO MỪNG" },
    { id: "luat-server", name: "quy-tac-ung-xu", type: "text", category: "CHÀO MỪNG" },
    { id: "giai-dap-toan", name: "hoi-dap-toan-hoc", type: "forum", category: "DIỄN ĐÀN HỌC TẬP" },
    { id: "lap-trinh-web", name: "lap-trinh-khoa-hoc", type: "forum", category: "DIỄN ĐÀN HỌC TẬP" },
    { id: "ielts-club", name: "ielts-peer-practice", type: "text", category: "DIỄN ĐÀN HỌC TẬP" },
    { id: "voice-study-pomodoro", name: "🔊 Phòng Học Tập Pomodoro", type: "voice", category: "PHÒNG HỌC TRỰC TUYẾN" },
    { id: "voice-lop-cohort-1", name: "🔊 Lớp Web Dev (Cohort 1)", type: "voice", category: "PHÒNG HỌC TRỰC TUYẾN" },
  ];

  return (
    <section id="discord" className="py-16 sm:py-24 bg-[#FFF9EF] border-b border-[#0F2747]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5865F2]/15 text-[#5865F2] text-xs font-extrabold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Trái Tim Kết Nối Của Dự Án</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2747] font-heading tracking-tight">
            Máy Chủ Học Tập Discord The Pencily
          </h2>
          <p className="mt-4 text-base text-[#4B5563]">
            Nơi hàng trăm bạn học sinh cùng học tập, bật mic trao đổi bài vở, tham gia các buổi voice class và kết nối bạn bè cùng chí hướng.
          </p>
        </div>

        {/* Discord UI Mockup */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#1E1F22] text-slate-200 border-3 border-[#0F2747] shadow-2xl overflow-hidden">
          {/* Top Discord Title Bar */}
          <div className="bg-[#111214] px-4 py-3 flex items-center justify-between border-b border-[#2B2D31]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ED4245]" />
              <div className="w-3 h-3 rounded-full bg-[#FAA81A]" />
              <div className="w-3 h-3 rounded-full bg-[#57F287]" />
              <span className="ml-3 text-xs font-bold text-slate-400">The Pencily • Official Discord Community</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#57F287] bg-[#57F287]/10 px-2 py-0.5 rounded">
                128 bạn đang online
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[420px]">
            {/* Sidebar Channels (4 cols) */}
            <div className="md:col-span-4 bg-[#2B2D31] p-3 border-r border-[#1E1F22] space-y-3">
              {/* Server Name Header */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#1E1F22]">
                <span className="font-extrabold text-sm text-white">
                  The Pencily Server
                </span>
                <span className="text-[10px] bg-[#5865F2] text-white px-2 py-0.5 rounded font-bold">Gen 1.0</span>
              </div>

              {/* Channels List */}
              <div className="space-y-1 text-xs">
                {channels.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChannel(ch.id)}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-left transition-colors ${
                      activeChannel === ch.id
                        ? "bg-[#35373C] text-white font-bold"
                        : "text-slate-400 hover:bg-[#313338] hover:text-slate-200"
                    }`}
                  >
                    {ch.type === "voice" ? (
                      <Volume2 className="w-4 h-4 text-[#57F287]" />
                    ) : (
                      <Hash className="w-4 h-4 text-slate-400" />
                    )}
                    <span className="truncate">{ch.name}</span>
                  </button>
                ))}
              </div>

              {/* Roles Badge List in sidebar */}
              <div className="pt-4 border-t border-[#35373C] text-[11px] space-y-1.5">
                <div className="text-slate-400 font-bold uppercase text-[10px] tracking-wider px-1">Vai trò thành viên</div>
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-0.5 rounded bg-[#ED4245]/20 text-[#ED4245] font-bold border border-[#ED4245]/30">
                    👑 Core Team
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#FAA81A]/20 text-[#FAA81A] font-bold border border-[#FAA81A]/30">
                    ✏️ Tutor Gen 1.0
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#5865F2]/20 text-[#5865F2] font-bold border border-[#5865F2]/30">
                    🎓 Active Learner
                  </span>
                </div>
              </div>
            </div>

            {/* Chat Area (8 cols) */}
            <div className="md:col-span-8 bg-[#313338] p-5 flex flex-col justify-between">
              {/* Active Channel Header */}
              <div className="flex items-center gap-2 pb-3 border-b border-[#3F4147] text-sm font-bold text-white">
                <Hash className="w-5 h-5 text-slate-400" />
                <span>{activeChannel}</span>
                <span className="text-xs text-slate-400 font-normal ml-2 hidden sm:inline">
                  • Kênh chính thức The Pencily
                </span>
              </div>

              {/* Messages feed */}
              <div className="py-4 space-y-4 text-xs sm:text-sm">
                {/* Bot Message */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#5865F2] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#5865F2]">Pencily Bot</span>
                      <span className="bg-[#5865F2] text-white text-[9px] px-1 rounded font-semibold">BOT</span>
                      <span className="text-[10px] text-slate-400">Hôm nay lúc 20:00</span>
                    </div>
                    <p className="mt-1 text-slate-200 leading-relaxed bg-[#2B2D31] p-3 rounded-xl border border-[#3F4147]">
                      🎉 Chào mừng các bạn học sinh đến với **The Pencily Gen 1.0**! Hãy chọn môn học bạn muốn bổ trợ tại kênh `#nhan-role` để nhận quyền truy cập phòng học voice tương ứng nhé!
                    </p>
                  </div>
                </div>

                {/* Core Team Announcement */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FFC83D] flex items-center justify-center text-[#0F2747] font-bold text-xs flex-shrink-0">
                    👑
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#FFC83D]">The Pencily Academic Team</span>
                      <span className="text-[10px] text-slate-400">Gen 1.0</span>
                    </div>
                    <p className="mt-1 text-slate-300 leading-relaxed">
                      Chào đón các bạn học sinh đến với máy chủ Discord học tập! Tất cả các phòng Voice học tập 24/7 và giải đáp bài vở đều mở tự do và hoàn toàn phi lợi nhuận. Hãy giữ thái độ hòa nhã và cùng nhau học hỏi nhé.
                    </p>
                  </div>
                </div>
              </div>

              {/* Discord Join Action Banner */}
              <div className="pt-4 border-t border-[#3F4147] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-300 text-center sm:text-left">
                  Tham gia ngay để nhận vai trò lớp học và học cùng bạn bè!
                </div>
                <a
                  href="https://discord.gg"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-xs shadow transition-colors"
                >
                  <DiscordLogo className="w-3.5 h-3.5" />
                  <span>Tham gia Discord The Pencily</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
