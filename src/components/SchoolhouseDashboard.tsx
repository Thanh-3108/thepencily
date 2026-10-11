"use client";

import React from "react";
import { usePencily } from "@/context/PencilyContext";
import { PencilMascot } from "@/components/Logo";
import {
  Calendar,
  Clock,
  Trophy,
  ChevronRight,
  ExternalLink,
  Volume2,
  X,
  ArrowRight,
} from "lucide-react";

interface SchoolhouseDashboardProps {
  onOpenApplyTutor?: () => void;
  onNavigateClasses?: () => void;
}

export function SchoolhouseDashboard({
  onOpenApplyTutor,
  onNavigateClasses,
}: SchoolhouseDashboardProps) {
  const {
    user,
    classes,
    registeredClassIds,
    cancelClassRegistration,
  } = usePencily();

  // Registered classes from shared context
  const mySessions = classes.filter((c) => registeredClassIds.includes(c.id));

  return (
    <div className="w-full space-y-8">
      {/* 1. CALENDAR HEADER & METRICS BAR (Friendly, Generous & Clean) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-4 border-b border-[#0F2747]/10">
        <div>
          <h2 className="font-extrabold text-3xl sm:text-4xl text-[#0F2747] tracking-tight">
            Lịch Học & Buổi Thảo Luận
          </h2>
        </div>

        {/* Live Synced Stat Badges */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white border border-[#0F2747]/10 shadow-2xs text-sm font-bold text-[#0F2747]">
            <Trophy className="w-4 h-4 text-[#EAB308]" />
            <span>{user.points} PP</span>
          </div>
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white border border-[#0F2747]/10 shadow-2xs text-sm font-bold text-[#0F2747]">
            <Clock className="w-4 h-4 text-[#4F7ECB]" />
            <span>{user.learningMinutes} phút học</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#22C55E]/15 border border-[#22C55E]/30 text-sm font-bold text-[#16A34A]">
            <span>{mySessions.length} buổi đã giữ chỗ</span>
          </div>
        </div>
      </div>

      {/* 2. UPCOMING SESSIONS */}
      <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <h3 className="font-bold text-lg sm:text-xl text-[#0F2747]">
                Lịch học của tôi
              </h3>
              <span className="text-xs font-bold text-[#16A34A] bg-[#22C55E]/15 px-3 py-1 rounded-full">
                {mySessions.length} buổi đã giữ chỗ
              </span>
            </div>
            {onNavigateClasses && (
              <button
                onClick={onNavigateClasses}
                className="text-sm text-[#4F7ECB] font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Xem danh mục lớp</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Registered Sessions List */}
          {mySessions.length > 0 ? (
            <div className="space-y-4">
              {mySessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-[#22C55E]/35 bg-[#F0FDF4]/20 shadow-xs space-y-4 hover:border-[#22C55E] transition-all"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2.5">
                    <span className="text-xs font-bold text-[#16A34A] bg-[#22C55E]/15 px-3 py-1 rounded-lg shrink-0">
                      {session.dayLabel} • {session.timeSlot}
                    </span>
                    <span className="text-sm font-bold text-[#5865F2] flex items-center gap-2">
                      <Volume2 className="w-4 h-4 shrink-0" />
                      <span>{session.discordRoom}</span>
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg sm:text-xl text-[#0F2747] leading-snug">
                      {session.title}
                    </h4>
                    <p className="text-sm text-[#4B5563] mt-2">
                      Tutor hướng dẫn: <strong className="text-[#0F2747]">{session.tutorName}</strong> ({session.tutorSchool})
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => cancelClassRegistration(session.id)}
                      className="text-sm text-gray-400 hover:text-red-500 transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                      <span>Hủy giữ chỗ</span>
                    </button>

                    <a
                      href={session.meetUrl || "https://discord.gg/6hpEf4wC4z"}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-2.5 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white text-sm font-bold transition shadow-xs flex items-center gap-2 cursor-pointer active:scale-95"
                    >
                      <span>Vào phòng học online</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-10 border border-slate-200/80 text-center space-y-4">
              <PencilMascot size="lg" className="mx-auto" />
              <div>
                <div className="font-bold text-lg text-[#0F2747]">
                  Cú Pencily chưa thấy bạn có lịch học nào tuần này!
                </div>
                <p className="text-sm text-[#687280] max-w-md mx-auto mt-1.5 leading-relaxed">
                  Đăng ký các lớp học nhóm nhỏ để cùng ôn thi THPT & IELTS hoàn toàn miễn phí trên Discord Voice.
                </p>
              </div>
              {onNavigateClasses && (
                <button
                  onClick={onNavigateClasses}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFC83D] text-[#0F2747] text-sm font-bold shadow-xs hover:bg-[#EAB308] transition cursor-pointer active:scale-95"
                >
                  <span>Khám phá lớp học ngay (+10 PP)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
    </div>
  );
}
