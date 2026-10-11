"use client";

import React from "react";
import { X, CheckCircle2, Award, Clock, BookOpen, Volume2, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { BrandIcon } from "./BrandIcons";
import { PencilDoodleParticle } from "./BrandDecorations";
import { usePencily } from "@/context/PencilyContext";

interface StudentProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApplyTutor?: () => void;
}

export function StudentProfileDrawer({
  isOpen,
  onClose,
  onOpenApplyTutor,
}: StudentProfileDrawerProps) {
  const { user, classes, registeredClassIds } = usePencily();

  if (!isOpen) return null;

  const myRegisteredClasses = classes.filter((c) => registeredClassIds.includes(c.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-[#0F2747]/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#FFF9EF] bg-pattern-subtle w-full max-w-lg h-full p-6 sm:p-8 shadow-2xl border-l border-[#0F2747]/15 flex flex-col justify-between overflow-y-auto relative animate-slideInRight">
        {/* Floating pencil particle accent */}
        <div className="absolute top-5 right-16 pointer-events-none opacity-40">
          <PencilDoodleParticle variant="yellow" size={28} rotation={25} />
        </div>

        <div>
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-5 border-b border-[#0F2747]/10">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#FFC83D] bg-[#0F2747] px-3 py-1 rounded-full inline-block">
                Cơ Chế Học Sinh
              </span>
              <h2 className="font-poppins font-black text-2xl text-[#0F2747] mt-2">
                Góc Học Sinh (Student Hub)
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 text-[#687280] hover:text-[#0F2747] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Student Profile Overview Card */}
          <div className="mt-6 p-5 rounded-3xl bg-white border border-[#0F2747]/10 shadow-xs">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#0F2747] text-[#FFC83D] font-poppins font-black text-xl flex items-center justify-center shadow-xs overflow-hidden">
                {user.avatar?.startsWith("http") ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user.avatar || "P"
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-poppins font-bold text-base text-[#0F2747]">
                    {user.name}
                  </h3>
                  {user.verified && (
                    <span className="text-xs font-bold bg-[#22C55E]/15 text-[#16A34A] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#687280] mt-0.5 truncate">
                  {user.school} • {user.grade}
                </p>
                {user.discord && (
                  <div className="flex items-center gap-2 text-xs font-mono text-[#5865F2] mt-1">
                    <span>Discord: {user.discord}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-[#0F2747]/10 text-center">
              <div className="bg-[#FFF9EF] p-2.5 rounded-2xl">
                <div className="font-poppins font-extrabold text-base text-[#0F2747]">
                  {Math.round(user.learningMinutes / 60)}h
                </div>
                <div className="text-xs text-[#687280] mt-0.5">Thời gian học</div>
              </div>
              <div className="bg-[#FFF9EF] p-2.5 rounded-2xl">
                <div className="font-poppins font-extrabold text-base text-[#0F2747]">
                  {myRegisteredClasses.length} Lớp
                </div>
                <div className="text-xs text-[#687280] mt-0.5">Đã đăng ký</div>
              </div>
              <div className="bg-[#FFF9EF] p-2.5 rounded-2xl">
                <div className="font-poppins font-extrabold text-base text-[#0F2747]">
                  {user.points} PP
                </div>
                <div className="text-xs text-[#687280] mt-0.5">Điểm rèn luyện</div>
              </div>
            </div>
          </div>

          {/* Registered Classes */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F2747]">
                Lớp Học Của Tôi (Trên Discord)
              </h4>
              <span className="text-xs text-[#4F7ECB] font-bold bg-[#4F7ECB]/10 px-2.5 py-0.5 rounded-full">
                {myRegisteredClasses.length} Lớp
              </span>
            </div>

            {myRegisteredClasses.length === 0 ? (
              <div className="p-6 bg-white rounded-3xl border border-dashed border-[#0F2747]/20 text-center space-y-2">
                <p className="text-xs text-[#687280]">
                  Bạn chưa đăng ký lớp học nào.
                </p>
                <p className="text-[11px] text-[#4F7ECB] font-medium">
                  Hãy khám phá danh mục lớp học trên Dashboard để giữ chỗ khi có lớp mới mở.
                </p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {myRegisteredClasses.map((cls) => (
                  <div
                    key={cls.id}
                    className="p-4 sm:p-5 bg-white rounded-3xl border border-[#0F2747]/10 shadow-xs relative overflow-hidden"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-[#16A34A] bg-[#22C55E]/10 px-2.5 py-0.5 rounded-md shrink-0">
                        Đã giữ chỗ
                      </span>
                      <span className="text-xs font-mono text-[#5865F2] font-semibold">
                        {cls.discordRoom}
                      </span>
                    </div>

                    <h5 className="font-poppins font-bold text-sm text-[#0F2747] leading-snug">
                      {cls.title}
                    </h5>
                    <p className="text-xs text-[#687280] mt-1">
                      Tutor: {cls.tutorName} ({cls.tutorSchool})
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-[#4F7ECB] mt-1.5 break-words">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>{cls.schedule}</span>
                    </div>

                    <div className="mt-3.5 pt-3 border-t border-[#0F2747]/10 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs text-[#687280] flex items-center gap-1.5 font-medium">
                        <Volume2 className="w-3.5 h-3.5 text-[#5865F2] shrink-0" />
                        <span>{cls.discordChannel}</span>
                      </span>

                      <a
                        href="https://discord.gg/6hpEf4wC4z"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#5865F2] hover:bg-[#4752C4] px-3.5 py-1.5 rounded-xl shadow-xs transition"
                      >
                        <span>Vào Voice</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Learner-to-Tutor Flywheel Progress */}
          <div className="mt-6 p-5 rounded-3xl bg-[#0F2747] text-white space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#FFC83D]">
                Lộ trình Peer Tutor Flywheel
              </span>
              <span className="text-xs font-bold text-white bg-white/10 px-2.5 py-0.5 rounded-full">
                6 / 10 Giờ
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#FFC83D] rounded-full w-[60%]" />
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Bạn chỉ cần tham gia thêm 4 giờ học nhóm và vượt qua bài giảng thử 15 phút (Mock Teaching) để trở thành{" "}
              <strong className="text-[#FFC83D]">Verified Peer Tutor</strong> tại The Pencily.
            </p>

            <div className="pt-2">
              <button
                onClick={() => {
                  onClose();
                  if (onOpenApplyTutor) onOpenApplyTutor();
                }}
                className="w-full text-center text-sm font-bold text-[#0F2747] bg-[#FFC83D] hover:bg-[#EAB308] py-3 rounded-full transition cursor-pointer shadow-xs"
              >
                Đăng ký dự tuyển Peer Tutor ngay
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-5 border-t border-[#0F2747]/10 text-center">
          <div className="text-xs text-[#687280]">
            Mọi thắc mắc và hỗ trợ tài khoản liên hệ qua Discord Ticket.
          </div>
        </div>
      </div>
    </div>
  );
}
