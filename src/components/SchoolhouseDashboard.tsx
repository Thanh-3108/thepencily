"use client";

import React from "react";
import { usePencily } from "@/context/PencilyContext";
import { OwlMascot } from "@/components/Logo";
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
    language,
  } = usePencily();

  // Registered classes from shared context
  const mySessions = classes.filter((c) => registeredClassIds.includes(c.id));

  return (
    <div className="w-full space-y-6">
      {/* 1. CALENDAR HEADER & METRICS BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b-2 border-slate-300">
        <div>
          <h2 className="font-poppins font-black text-2xl sm:text-3xl text-[#0F2747] tracking-tight">
            {language === "vi" ? "Lịch Học & Buổi Thảo Luận" : "My Study Schedule & Sessions"}
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] mt-1 font-medium">
            {language === "vi"
              ? "Theo dõi các buổi học kèm đã đăng ký và thời gian tích lũy"
              : "Track your enrolled peer sessions and accumulated study hours"}
          </p>
        </div>

        {/* Live Synced Stat Badges */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-2 rounded-sm bg-white border-2 border-slate-300 shadow-2xs text-xs font-bold text-[#0F2747]">
            <Trophy className="w-4 h-4 text-[#EAB308]" />
            <span>{user.points} PP</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-sm bg-white border-2 border-slate-300 shadow-2xs text-xs font-bold text-[#0F2747]">
            <Clock className="w-4 h-4 text-[#4F7ECB]" />
            <span>{user.learningMinutes} {language === "vi" ? "phút học" : "mins"}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-sm bg-[#22C55E]/15 border-2 border-emerald-400 text-xs font-bold text-[#16A34A]">
            <span>{mySessions.length} {language === "vi" ? "buổi đã giữ chỗ" : "sessions booked"}</span>
          </div>
        </div>
      </div>

      {/* 2. UPCOMING SESSIONS */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <h3 className="font-bold text-base sm:text-lg text-[#0F2747]">
              {language === "vi" ? "Lịch học của tôi" : "Booked Sessions"}
            </h3>
            <span className="text-xs font-bold text-[#16A34A] bg-[#22C55E]/15 px-2.5 py-0.5 rounded-sm border-2 border-emerald-300">
              {mySessions.length} {language === "vi" ? "buổi" : "classes"}
            </span>
          </div>
          {onNavigateClasses && (
            <button
              onClick={onNavigateClasses}
              className="text-xs text-[#4F7ECB] font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{language === "vi" ? "Xem danh mục lớp" : "Browse all classes"}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Registered Sessions List */}
        {mySessions.length > 0 ? (
          <div className="space-y-4">
            {mySessions.map((session) => (
              <div
                key={session.id}
                className="bg-white rounded-md p-6 sm:p-7 border-2 border-slate-300 hover:border-[#0F2747] shadow-xs space-y-4 transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2.5">
                  <span className="text-xs font-bold text-[#16A34A] bg-[#22C55E]/15 px-2.5 py-1 rounded-sm border-2 border-emerald-300 shrink-0">
                    {session.dayLabel} • {session.timeSlot}
                  </span>
                  <span className="text-xs font-bold text-[#5865F2] flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4 shrink-0" />
                    <span>{session.discordRoom}</span>
                  </span>
                </div>

                <div>
                  <h4 className="font-poppins font-bold text-base sm:text-lg text-[#0F2747] leading-snug">
                    {session.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#4B5563] mt-1.5">
                    {language === "vi" ? "Tutor hướng dẫn: " : "Peer Tutor: "}
                    <strong className="text-[#0F2747]">{session.tutorName}</strong> ({session.tutorSchool})
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t-2 border-slate-100">
                  <button
                    onClick={() => cancelClassRegistration(session.id)}
                    className="text-xs text-slate-400 hover:text-red-500 font-semibold transition flex items-center gap-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>{language === "vi" ? "Hủy giữ chỗ" : "Cancel booking"}</span>
                  </button>

                  <a
                    href={session.meetUrl || "https://discord.gg/6hpEf4wC4z"}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-sm bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold transition shadow-xs flex items-center gap-2 cursor-pointer active:scale-95 border-2 border-indigo-400"
                  >
                    <span>{language === "vi" ? "Vào phòng học online" : "Join Room"}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-md p-10 border-2 border-slate-300 text-center space-y-4">
            <OwlMascot size="lg" className="mx-auto" />
            <div>
              <div className="font-bold text-base sm:text-lg text-[#0F2747]">
                {language === "vi"
                  ? "Cú Pencily chưa thấy bạn có lịch học nào tuần này!"
                  : "No sessions booked for this week yet!"}
              </div>
              <p className="text-xs sm:text-sm text-[#687280] max-w-md mx-auto mt-1 leading-relaxed">
                {language === "vi"
                  ? "Đăng ký các lớp học nhóm nhỏ để cùng ôn thi THPT & IELTS hoàn toàn miễn phí trên Discord Voice."
                  : "Book a peer study session to practice IELTS, SAT, and High School subjects for free."}
              </p>
            </div>
            {onNavigateClasses && (
              <button
                onClick={onNavigateClasses}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-sm bg-[#FFC83D] text-[#0F2747] text-xs font-bold shadow-xs hover:bg-[#EAB308] transition cursor-pointer active:scale-95 border-2 border-amber-500"
              >
                <span>{language === "vi" ? "Khám phá lớp học ngay (+10 PP)" : "Explore Classes (+10 PP)"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
