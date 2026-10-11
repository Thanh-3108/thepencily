"use client";

import React, { useState } from "react";
import {
  Trophy,
  Award,
  Medal,
  Clock,
  BookOpen,
  Sparkles,
  ArrowRight,
  TrendingUp,
  UserCheck,
  Star,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import { usePencily } from "@/context/PencilyContext";
import { PencilMascot } from "./Logo";

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  school: string;
  grade: string;
  points: number;
  learningMinutes: number;
  sessionsAttended: number;
  roleTitle: string;
  isTutor?: boolean;
}

interface DashboardLeaderboardProps {
  onGoToClasses: () => void;
  onGoToVideos?: () => void;
}

export function DashboardLeaderboard({ onGoToClasses, onGoToVideos }: DashboardLeaderboardProps) {
  const { user } = usePencily();
  const [timeframe, setTimeframe] = useState<"week" | "month" | "all">("week");

  // Build authentic rankings from real participants only (Zero fake people)
  // If the logged-in student has earned points, they are genuinely ranked here
  const realParticipants: LeaderboardEntry[] = [];

  if (user && user.points > 0) {
    realParticipants.push({
      rank: 1,
      name: user.name || "Học sinh Pencily",
      avatar: user.avatar || "P",
      school: user.school || "The Pencily",
      grade: user.grade || "Học sinh",
      points: user.points,
      learningMinutes: user.learningMinutes || 0,
      sessionsAttended: user.sessionsAttended || 0,
      roleTitle: user.role || "Học viên Gen 1.0",
      isTutor: user.tutorProgress?.isVerifiedTutor,
    });
  }

  const top1 = realParticipants[0];
  const top2 = realParticipants[1];
  const top3 = realParticipants[2];

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#0F2747]/10">
        <div>
          <h2 className="font-poppins font-black text-2xl sm:text-3xl text-[#0F2747] tracking-tight">
            Bảng Xếp Hạng Học Tập
          </h2>
          <p className="text-sm text-[#475569] mt-1">
            Ghi nhận nỗ lực rèn luyện, cống hiến hỗ trợ bạn bè và tích lũy điểm Pencily Points (PP) thực tế.
          </p>
        </div>

        {/* Timeframe Filter Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white border border-slate-200/80 shadow-2xs self-start md:self-auto">
          <button
            onClick={() => setTimeframe("week")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              timeframe === "week"
                ? "bg-[#0F2747] text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Tuần này
          </button>
          <button
            onClick={() => setTimeframe("month")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              timeframe === "month"
                ? "bg-[#0F2747] text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Tháng này
          </button>
          <button
            onClick={() => setTimeframe("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              timeframe === "all"
                ? "bg-[#0F2747] text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Toàn thời gian
          </button>
        </div>
      </div>

      {/* 1. PERSONAL STANDING CARD (Thực tế của chính bạn) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-amber-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#FFC83D] text-[#0F2747] font-black text-xl flex items-center justify-center shrink-0 shadow-xs border border-[#0F2747]/10 overflow-hidden">
            {user.avatar?.startsWith("http") ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              user.avatar || "P"
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-poppins font-bold text-lg text-[#0F2747]">{user.name}</h3>
              {user.points > 0 ? (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200/50">
                  Hạng #1
                </span>
              ) : (
                <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md">
                  Chưa xếp hạng
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {user.school || "Chưa cập nhật trường"} / {user.grade || "Học sinh"}
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-600 font-medium mt-2">
              <span>
                <strong className="text-[#D97706] font-bold">{user.points} PP</strong> tích lũy
              </span>
              <span>/</span>
              <span>{user.sessionsAttended} buổi học</span>
              <span>/</span>
              <span>{user.learningMinutes}p rèn luyện</span>
            </div>
          </div>
        </div>

        <button
          onClick={onGoToClasses}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-xs sm:text-sm transition shrink-0 shadow-2xs active:scale-95 cursor-pointer"
        >
          <span>Tham gia lớp học (+10 PP)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 2. AUTHENTIC LEADERBOARD OR EMPTY STATE (Zero fake people) */}
      {realParticipants.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-slate-200/90 shadow-2xs text-center space-y-6">
          <PencilMascot size="lg" className="mx-auto" />

          <div className="max-w-xl mx-auto space-y-2.5">
            <h3 className="font-poppins font-bold text-xl sm:text-2xl text-[#0F2747]">
              Mùa Vinh Danh Gen 1.0 Đang Bắt Đầu!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Hiện tại chưa có học sinh nào đạt điểm đua top trong kỳ này. Hệ thống sẽ tự động ghi danh khi bạn tham gia các buổi học trực tuyến, trao đổi bài tập hoặc hoàn thành buổi học để tích lũy <strong>Pencily Points (PP)</strong>!
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onGoToClasses}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#0F2747] hover:bg-[#1E3A8A] text-white text-xs sm:text-sm font-bold shadow-xs active:scale-95 transition cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Khám phá phòng học (+10 PP)</span>
            </button>

            {onGoToVideos && (
              <button
                onClick={onGoToVideos}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 text-[#0F2747] border border-slate-300 text-xs sm:text-sm font-semibold shadow-2xs active:scale-95 transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                <span>Xem video bài học (+5 PP)</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* PODIUM FOR REAL PARTICIPANTS */}
          {top1 && (
            <div className="max-w-md mx-auto pt-2">
              <div className="bg-gradient-to-b from-amber-50/70 to-white rounded-3xl p-7 border-2 border-amber-300 text-center space-y-4 shadow-md relative">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-500 text-slate-900 font-black text-[11px] uppercase tracking-wider shadow-xs flex items-center gap-1">
                  <span>👑 Dẫn Đầu Bảng Vàng</span>
                </div>
                <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 text-amber-800 font-black text-base flex items-center justify-center border border-amber-300 mt-2">
                  🥇 #1
                </div>
                <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden border-3 border-amber-400 shadow-md bg-[#0F2747] text-[#FFC83D] flex items-center justify-center font-black text-2xl">
                  {top1.avatar?.startsWith("http") ? (
                    <img src={top1.avatar} alt={top1.name} className="w-full h-full object-cover" />
                  ) : (
                    top1.avatar || "P"
                  )}
                </div>
                <div>
                  <h4 className="font-poppins font-extrabold text-lg text-[#0F2747]">{top1.name}</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{top1.school}</p>
                  <div className="text-xs font-bold text-amber-700 mt-1">{top1.roleTitle}</div>
                </div>
                <div className="pt-2 border-t border-amber-200/60 flex items-center justify-around text-xs text-slate-600">
                  <div>
                    <span className="font-black text-[#D97706] text-base block">{top1.points}</span>
                    <span className="text-[10px] text-slate-500 font-bold">Pencily Points</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#0F2747] text-base block">{top1.sessionsAttended}</span>
                    <span className="text-[10px] text-slate-500">Buổi học</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TABLE OF REAL PARTICIPANTS */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
              <h4 className="font-poppins font-bold text-base text-[#0F2747]">
                Bảng Thứ Hạng Chi Tiết (Thực tế)
              </h4>
              <span className="text-xs text-slate-500 font-medium">
                Dữ liệu học sinh thật
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#FAF8F5] text-slate-500 uppercase tracking-wider text-[11px] font-bold border-b border-slate-200/70">
                  <tr>
                    <th className="py-3 px-4 sm:px-6">Hạng</th>
                    <th className="py-3 px-4 sm:px-6">Học sinh</th>
                    <th className="py-3 px-4 sm:px-6 hidden sm:table-cell">Trường & Khối</th>
                    <th className="py-3 px-4 sm:px-6 hidden md:table-cell">Số buổi học</th>
                    <th className="py-3 px-4 sm:px-6 text-right">Điểm PP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {realParticipants.map((item) => (
                    <tr key={item.rank} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-[#0F2747]">
                        🥇 #1
                      </td>
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-[#0F2747] text-[#FFC83D] flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden">
                            {item.avatar?.startsWith("http") ? (
                              <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                            ) : (
                              item.avatar || "P"
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-[#0F2747] block">{item.name}</span>
                            <span className="text-[11px] text-slate-500 sm:hidden block">
                              {item.school}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-slate-600 hidden sm:table-cell">
                        {item.school} • {item.grade}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-slate-600 hidden md:table-cell">
                        {item.sessionsAttended} buổi
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-right font-black text-[#D97706]">
                        {item.points} PP
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
