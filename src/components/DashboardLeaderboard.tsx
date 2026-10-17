"use client";

import React, { useState } from "react";
import { Trophy, Award, Medal, Clock, BookOpen, ArrowRight, TrendingUp, UserCheck, ShieldCheck, Calendar } from "lucide-react";
import { usePencily } from "@/context/PencilyContext";
import { OwlMascot } from "./Logo";

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
  const { user, language } = usePencily();
  const [timeframe, setTimeframe] = useState<"week" | "month" | "all">("week");

  // Build authentic rankings from real participants only
  const realParticipants: LeaderboardEntry[] = [];

  if (user && user.points > 0) {
    realParticipants.push({
      rank: 1,
      name: user.name || (language === "vi" ? "Học sinh Pencily" : "Pencily Student"),
      avatar: user.avatar || "P",
      school: user.school || "The Pencily",
      grade: user.grade || (language === "vi" ? "Học sinh" : "Student"),
      points: user.points,
      learningMinutes: user.learningMinutes || 0,
      sessionsAttended: user.sessionsAttended || 0,
      roleTitle: user.role || (language === "vi" ? "Học viên The Pencily" : "The Pencily Learner"),
      isTutor: user.tutorProgress?.isVerifiedTutor,
    });
  }

  const top1 = realParticipants[0];

  return (
    <div className="w-full space-y-6 animate-fadeIn select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b-2 border-slate-300">
        <div>
          <h2 className="font-poppins font-black text-2xl sm:text-3xl text-[#0F2747] tracking-tight">
            {language === "vi" ? "Bảng Xếp Hạng Học Tập" : "Academic Leaderboard"}
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] mt-1 font-medium">
            {language === "vi"
              ? "Ghi nhận nỗ lực rèn luyện, cống hiến hỗ trợ bạn bè và tích lũy điểm Pencily Points (PP) thực tế."
              : "Recognizing study consistency, peer mentorship, and earned Pencily Points (PP)."}
          </p>
        </div>

        {/* Timeframe Filter Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-sm bg-white border-2 border-slate-300 shadow-2xs self-start md:self-auto">
          <button
            onClick={() => setTimeframe("week")}
            className={`px-3 py-1.5 rounded-xs text-xs font-bold transition cursor-pointer ${
              timeframe === "week"
                ? "bg-[#0F2747] text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            {language === "vi" ? "Tuần này" : "This Week"}
          </button>
          <button
            onClick={() => setTimeframe("month")}
            className={`px-3 py-1.5 rounded-xs text-xs font-bold transition cursor-pointer ${
              timeframe === "month"
                ? "bg-[#0F2747] text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            {language === "vi" ? "Tháng này" : "This Month"}
          </button>
          <button
            onClick={() => setTimeframe("all")}
            className={`px-3 py-1.5 rounded-xs text-xs font-bold transition cursor-pointer ${
              timeframe === "all"
                ? "bg-[#0F2747] text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            {language === "vi" ? "Toàn thời gian" : "All Time"}
          </button>
        </div>
      </div>

      {/* 1. PERSONAL STANDING CARD */}
      <div className="p-5 sm:p-6 rounded-md bg-white border-2 border-amber-300 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-sm bg-[#FFC83D] text-[#0F2747] font-black text-xl flex items-center justify-center shrink-0 shadow-xs border-2 border-amber-400 overflow-hidden">
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
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-sm border-2 border-emerald-300">
                  {language === "vi" ? "Hạng #1" : "Rank #1"}
                </span>
              ) : (
                <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-sm border border-slate-300">
                  {language === "vi" ? "Chưa xếp hạng" : "Unranked"}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {user.school || (language === "vi" ? "Chưa cập nhật trường" : "School not set")} / {user.grade || (language === "vi" ? "Học sinh" : "Student")}
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-600 font-medium mt-2">
              <span>
                <strong className="text-[#D97706] font-bold">{user.points} PP</strong> {language === "vi" ? "tích lũy" : "earned"}
              </span>
              <span>/</span>
              <span>{user.sessionsAttended} {language === "vi" ? "buổi học" : "sessions"}</span>
              <span>/</span>
              <span>{user.learningMinutes}m {language === "vi" ? "rèn luyện" : "study time"}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onGoToClasses}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold text-xs sm:text-sm transition shrink-0 shadow-2xs active:scale-95 cursor-pointer border-2 border-amber-600"
        >
          <span>{language === "vi" ? "Tham gia lớp học (+10 PP)" : "Join Class (+10 PP)"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 2. AUTHENTIC LEADERBOARD OR EMPTY STATE */}
      {realParticipants.length === 0 ? (
        <div className="bg-white rounded-md p-8 sm:p-14 border-2 border-slate-300 shadow-2xs text-center space-y-6">
          <OwlMascot size="lg" className="mx-auto" />

          <div className="max-w-xl mx-auto space-y-2.5">
            <h3 className="font-poppins font-bold text-xl sm:text-2xl text-[#0F2747]">
              {language === "vi" ? "Mùa Vinh Danh Đang Bắt Đầu!" : "Leaderboard Season Is Live!"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {language === "vi"
                ? "Hiện tại chưa có học sinh nào đạt điểm đua top trong kỳ này. Hệ thống sẽ tự động ghi danh khi bạn tham gia các buổi học trực tuyến, trao đổi bài tập hoặc hoàn thành buổi học để tích lũy Pencily Points (PP)!"
                : "No students have ranked yet this season. You will automatically be featured here by attending live rooms, helping peers, and completing study sessions to earn Pencily Points (PP)!"}
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onGoToClasses}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-sm bg-[#0F2747] hover:bg-[#1E3A8A] text-white text-xs sm:text-sm font-bold shadow-xs active:scale-95 transition cursor-pointer border-2 border-slate-700"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>{language === "vi" ? "Khám phá phòng học (+10 PP)" : "Explore Study Rooms (+10 PP)"}</span>
            </button>

            {onGoToVideos && (
              <button
                onClick={onGoToVideos}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] border-2 border-slate-300 text-xs sm:text-sm font-semibold shadow-2xs active:scale-95 transition cursor-pointer"
              >
                <Award className="w-4 h-4 text-[#F59E0B]" />
                <span>{language === "vi" ? "Xem video bài học (+5 PP)" : "Watch Video Lessons (+5 PP)"}</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* PODIUM FOR REAL PARTICIPANTS */}
          {top1 && (
            <div className="max-w-md mx-auto pt-2">
              <div className="bg-gradient-to-b from-amber-50/70 to-white rounded-md p-7 border-2 border-amber-400 text-center space-y-4 shadow-md relative">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-sm bg-amber-500 text-slate-900 font-black text-[11px] uppercase tracking-wider shadow-xs flex items-center gap-1 border-2 border-amber-600">
                  <span>👑 {language === "vi" ? "Dẫn Đầu Bảng Vàng" : "Leaderboard Leader"}</span>
                </div>
                <div className="w-10 h-10 mx-auto rounded-sm bg-amber-100 text-amber-900 font-black text-sm flex items-center justify-center border-2 border-amber-400 mt-2">
                  🥇 #1
                </div>
                <div className="w-20 h-20 mx-auto rounded-sm overflow-hidden border-2 border-amber-400 shadow-md bg-[#0F2747] text-[#FFC83D] flex items-center justify-center font-black text-2xl">
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
                <div className="pt-2 border-t-2 border-amber-200 flex items-center justify-around text-xs text-slate-600">
                  <div>
                    <span className="font-black text-[#D97706] text-base block">{top1.points}</span>
                    <span className="text-[10px] text-slate-500 font-bold">Pencily Points</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#0F2747] text-base block">{top1.sessionsAttended}</span>
                    <span className="text-[10px] text-slate-500">{language === "vi" ? "Buổi học" : "Sessions"}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TABLE OF REAL PARTICIPANTS */}
          <div className="bg-white rounded-md border-2 border-slate-300 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b-2 border-slate-200 flex items-center justify-between">
              <h4 className="font-poppins font-bold text-sm sm:text-base text-[#0F2747]">
                {language === "vi" ? "Bảng Thứ Hạng Chi Tiết (Thực tế)" : "Detailed Rankings"}
              </h4>
              <span className="text-xs text-slate-500 font-medium">
                {language === "vi" ? "Dữ liệu học sinh thật" : "Verified Learner Data"}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#FAF8F5] text-slate-500 uppercase tracking-wider text-[11px] font-bold border-b-2 border-slate-200">
                  <tr>
                    <th className="py-3 px-4 sm:px-6">{language === "vi" ? "Hạng" : "Rank"}</th>
                    <th className="py-3 px-4 sm:px-6">{language === "vi" ? "Học sinh" : "Student"}</th>
                    <th className="py-3 px-4 sm:px-6 hidden sm:table-cell">{language === "vi" ? "Trường & Khối" : "School & Grade"}</th>
                    <th className="py-3 px-4 sm:px-6 hidden md:table-cell">{language === "vi" ? "Số buổi học" : "Sessions"}</th>
                    <th className="py-3 px-4 sm:px-6 text-right">PP</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-slate-100">
                  {realParticipants.map((item) => (
                    <tr key={item.rank} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-[#0F2747]">
                        🥇 #1
                      </td>
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-sm bg-[#0F2747] text-[#FFC83D] flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden border-2 border-slate-300">
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
                        {item.sessionsAttended} {language === "vi" ? "buổi" : "sessions"}
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
