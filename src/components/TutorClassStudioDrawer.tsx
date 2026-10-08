"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Sparkles,
  Layers,
  Link as LinkIcon,
  Video,
  ArrowRight,
  ExternalLink,
  GraduationCap,
  Users,
  Compass,
  Check,
} from "lucide-react";
import { PencilMascot } from "./Logo";

export interface TutorClassFormData {
  title: string;
  category: "toan" | "tin" | "ielts" | "ly" | "sat" | "khac";
  categoryLabel: string;
  badge: "BOOTCAMP" | "WORKSHOP" | "VOICE" | "OPEN";
  badgeColor: string;
  tutorName: string;
  tutorSchool: string;
  tutorRole: string;
  schedule: string;
  timeSlot: string;
  dayLabel: string;
  discordChannel: string;
  discordRoom: string;
  meetUrl: string;
  maxSeats: number;
  description: string;
  programType: "basic_science" | "flagship" | "liberal_arts" | "study_buddy";
  objectives: string;
  materialsUrl: string;
  demoDate: string;
}

interface TutorClassStudioDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  tutorName: string;
  tutorSchool?: string;
  onSubmitCreate: (data: TutorClassFormData) => void;
}

const PROGRAM_TYPES = [
  {
    id: "study_buddy" as const,
    title: "Bạn cùng tiến",
    subtitle: "Ôn tập nhóm hàng ngày",
    badge: "OPEN" as const,
    badgeColor: "bg-emerald-50 text-emerald-800 border border-emerald-200",
    icon: Users,
  },
  {
    id: "basic_science" as const,
    title: "Toán & KHTN",
    subtitle: "Giải tích, Lý, Hóa, Tin",
    badge: "WORKSHOP" as const,
    badgeColor: "bg-blue-50 text-blue-800 border border-blue-200",
    icon: GraduationCap,
  },
  {
    id: "flagship" as const,
    title: "Flagship",
    subtitle: "Chuyên sâu, IELTS, SAT",
    badge: "BOOTCAMP" as const,
    badgeColor: "bg-amber-50 text-amber-800 border border-amber-200",
    icon: Sparkles,
  },
  {
    id: "liberal_arts" as const,
    title: "Khai phóng",
    subtitle: "Art, Lịch sử, Kỹ năng",
    badge: "VOICE" as const,
    badgeColor: "bg-purple-50 text-purple-800 border border-purple-200",
    icon: Compass,
  },
];

export function TutorClassStudioDrawer({
  isOpen,
  onClose,
  tutorName,
  tutorSchool,
  onSubmitCreate,
}: TutorClassStudioDrawerProps) {
  const [programType, setProgramType] = useState<
    "basic_science" | "flagship" | "liberal_arts" | "study_buddy"
  >("study_buddy");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<
    "toan" | "tin" | "ielts" | "ly" | "sat" | "khac"
  >("toan");
  const [objectives, setObjectives] = useState("");
  const [materialsUrl, setMaterialsUrl] = useState("");
  const [roomType, setRoomType] = useState<"web" | "discord" | "meet">("web");
  const [externalUrl, setExternalUrl] = useState("");
  const [scheduleTime, setScheduleTime] = useState("19:30 - 21:00");
  const [demoDate, setDemoDate] = useState("Demo trước 2 ngày");
  const [hostName, setHostName] = useState(tutorName || "Học sinh Pencily");
  const [school, setSchool] = useState(tutorSchool || "The Pencily");

  useEffect(() => {
    if (tutorName) setHostName(tutorName);
    if (tutorSchool) setSchool(tutorSchool);
  }, [tutorName, tutorSchool]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentProgram =
    PROGRAM_TYPES.find((p) => p.id === programType) || PROGRAM_TYPES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    let finalMeetUrl = "";
    if (roomType === "web") {
      const uniqueCode = `room-${Date.now().toString(36)}`;
      finalMeetUrl = `/room/${uniqueCode}`;
    } else {
      let trimmed = externalUrl.trim();
      if (!trimmed) {
        trimmed =
          roomType === "discord"
            ? "https://discord.gg"
            : "https://meet.google.com";
      } else if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
        trimmed = `https://${trimmed}`;
      }
      finalMeetUrl = trimmed;
    }

    const categoryLabels: Record<string, string> = {
      toan: "Toán học",
      tin: "Lập trình & Tin",
      ielts: "IELTS & Tiếng Anh",
      ly: "Vật lý & KHTN",
      sat: "Luyện thi SAT",
      khac: currentProgram.title,
    };

    onSubmitCreate({
      title: title.trim(),
      category,
      categoryLabel: categoryLabels[category] || currentProgram.title,
      badge: currentProgram.badge,
      badgeColor: currentProgram.badgeColor,
      tutorName: hostName.trim() || "Tutor Pencily",
      tutorSchool: school.trim() || "The Pencily",
      tutorRole:
        programType === "flagship"
          ? "Flagship Tutor"
          : programType === "study_buddy"
          ? "Host Nhóm học"
          : "Peer Tutor",
      schedule: scheduleTime.trim() || "Hôm nay",
      timeSlot: scheduleTime.trim(),
      dayLabel: "Hôm nay",
      discordChannel: "#voice-phong-hoc",
      discordRoom: "#voice-phong-hoc",
      meetUrl: finalMeetUrl,
      maxSeats: programType === "flagship" ? 25 : 15,
      description:
        objectives.trim() ||
        "Buổi học theo tinh thần bình đẳng, trao đổi tri thức peer-to-peer.",
      programType,
      objectives: objectives.trim(),
      materialsUrl: materialsUrl.trim(),
      demoDate: demoDate.trim(),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop mượt mà */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#0F2747]/30 backdrop-blur-xs transition-opacity duration-300 cursor-pointer"
        aria-hidden="true"
      />

      {/* Slide-over Workspace từ bên phải */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <aside className="w-screen max-w-4xl bg-[#FFFDF9] border-l border-[#0F2747]/15 shadow-2xl flex flex-col justify-between overflow-hidden animate-drawer">
          {/* Header gọn gàng */}
          <div className="px-6 sm:px-8 py-4.5 border-b border-[#0F2747]/10 bg-white/90 backdrop-blur-md flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <PencilMascot size="sm" priority />
              <div>
                <h3 className="font-poppins font-black text-lg sm:text-xl text-[#0F2747] leading-tight">
                  Tutor Studio
                </h3>
                <p className="text-xs text-[#687280]">
                  Soạn đề cương & mở lớp học trực tuyến
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#0F2747]/70 hover:text-[#0F2747] hover:bg-[#FFF9EF] transition active:scale-90 cursor-pointer"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body: Split View 2 cột trên Desktop (Không bị cuộn stacked mỏi mắt) */}
          <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* CỘT TRÁI (7/12): Form siêu tinh gọn, ít chữ thừa */}
              <form
                id="tutor-drawer-form"
                onSubmit={handleSubmit}
                className="lg:col-span-7 space-y-5"
              >
                {/* 1. Chọn loại chương trình */}
                <div>
                  <label className="block text-xs font-black text-[#0F2747] uppercase tracking-wider mb-2">
                    Chương trình học
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {PROGRAM_TYPES.map((pt) => {
                      const Icon = pt.icon;
                      const isSelected = programType === pt.id;
                      return (
                        <button
                          key={pt.id}
                          type="button"
                          onClick={() => setProgramType(pt.id)}
                          className={`p-3 rounded-2xl border text-left transition-all duration-150 cursor-pointer active:scale-95 flex items-start gap-2.5 ${
                            isSelected
                              ? "bg-[#0F2747] text-white border-[#0F2747] shadow-xs"
                              : "bg-white text-[#0F2747] border-[#0F2747]/15 hover:border-[#0F2747]/35"
                          }`}
                        >
                          <Icon
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              isSelected ? "text-[#FFC83D]" : "text-[#4F7ECB]"
                            }`}
                          />
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-xs sm:text-sm leading-tight truncate">
                              {pt.title}
                            </div>
                            <div
                              className={`text-[11px] truncate mt-0.5 ${
                                isSelected ? "text-slate-300" : "text-[#687280]"
                              }`}
                            >
                              {pt.subtitle}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Tiêu đề lớp học */}
                <div>
                  <label className="block text-xs font-black text-[#0F2747] uppercase tracking-wider mb-1.5">
                    Tên chủ đề buổi học *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Ôn tập Giải tích 12, Luyện IELTS Speaking Task 2..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#0F2747]/20 focus:border-[#0F2747] focus:outline-none bg-white text-sm font-semibold text-[#0F2747] transition shadow-2xs"
                  />
                </div>

                {/* 3. Môn học & Người đứng lớp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black text-[#0F2747] uppercase tracking-wider mb-1.5">
                      Môn học
                    </label>
                    <select
                      value={category}
                      onChange={(e) =>
                        setCategory(
                          e.target.value as "toan" | "tin" | "ielts" | "ly" | "sat" | "khac"
                        )
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#0F2747]/20 focus:border-[#0F2747] focus:outline-none bg-white text-sm text-[#0F2747]"
                    >
                      <option value="toan">Toán học</option>
                      <option value="tin">Lập trình & Tin</option>
                      <option value="ielts">IELTS & Tiếng Anh</option>
                      <option value="ly">Vật lý & KHTN</option>
                      <option value="sat">Luyện thi SAT</option>
                      <option value="khac">Khai phóng / Kỹ năng</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-[#0F2747] uppercase tracking-wider mb-1.5">
                      Host đứng lớp
                    </label>
                    <input
                      type="text"
                      value={hostName}
                      onChange={(e) => setHostName(e.target.value)}
                      placeholder="Tên của bạn"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#0F2747]/20 focus:border-[#0F2747] focus:outline-none bg-white text-sm text-[#0F2747]"
                    />
                  </div>
                </div>

                {/* 4. Mục tiêu & Slide/Tài liệu */}
                <div>
                  <label className="block text-xs font-black text-[#0F2747] uppercase tracking-wider mb-1.5">
                    Mục tiêu & Nội dung cốt lõi
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tóm tắt 1-2 câu về kiến thức sẽ chia sẻ trong buổi học..."
                    value={objectives}
                    onChange={(e) => setObjectives(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#0F2747]/20 focus:border-[#0F2747] focus:outline-none bg-white text-sm text-[#0F2747] leading-relaxed resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-[#0F2747] uppercase tracking-wider mb-1.5">
                    Link Slide / Tài liệu (Google Drive / Canva)
                  </label>
                  <div className="relative">
                    <LinkIcon className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="url"
                      placeholder="https://drive.google.com/..."
                      value={materialsUrl}
                      onChange={(e) => setMaterialsUrl(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#0F2747]/20 focus:border-[#0F2747] focus:outline-none bg-white text-xs text-[#0F2747]"
                    />
                  </div>
                </div>

                {/* 5. Nền tảng phòng học */}
                <div>
                  <label className="block text-xs font-black text-[#0F2747] uppercase tracking-wider mb-2">
                    Nền tảng học
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "web" as const, label: "Web Pencily" },
                      { id: "discord" as const, label: "Discord" },
                      { id: "meet" as const, label: "Google Meet" },
                    ].map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setRoomType(p.id)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer text-center ${
                          roomType === p.id
                            ? "bg-[#0F2747] text-white shadow-xs"
                            : "bg-white border border-[#0F2747]/15 text-[#4B5563] hover:text-[#0F2747]"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>

                  {roomType !== "web" && (
                    <input
                      type="text"
                      placeholder={
                        roomType === "discord"
                          ? "Link Discord Voice (https://...)"
                          : "Link Google Meet / Zoom"
                      }
                      value={externalUrl}
                      onChange={(e) => setExternalUrl(e.target.value)}
                      className="w-full mt-2.5 px-3.5 py-2 rounded-xl border border-[#0F2747]/20 focus:border-[#0F2747] focus:outline-none bg-white text-xs text-[#0F2747]"
                    />
                  )}
                </div>

                {/* 6. Khung giờ & Demo trước 2 ngày */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-[#687280] uppercase mb-1">
                      Giờ học
                    </label>
                    <input
                      type="text"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      placeholder="19:30 - 21:00"
                      className="w-full px-3 py-2 rounded-xl border border-[#0F2747]/15 text-xs text-[#0F2747] bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#687280] uppercase mb-1">
                      Lịch Demo Class
                    </label>
                    <input
                      type="text"
                      value={demoDate}
                      onChange={(e) => setDemoDate(e.target.value)}
                      placeholder="Demo trước 2 ngày"
                      className="w-full px-3 py-2 rounded-xl border border-[#0F2747]/15 text-xs text-[#0F2747] bg-white"
                    />
                  </div>
                </div>
              </form>

              {/* CỘT PHẢI (5/12): Live Preview Card đồng hành chạy song song (Không bị đẩy xuống đáy) */}
              <div className="lg:col-span-5 lg:sticky lg:top-0 space-y-3 pt-2 lg:pt-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-[#687280]">
                    Live Preview
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#FFC83D]/25 text-[#0F2747]">
                    Thẻ hiển thị
                  </span>
                </div>

                {/* Card xem trước chuyển động mượt mà */}
                <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-md transition-all duration-200 hover:shadow-lg space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${currentProgram.badgeColor}`}
                    >
                      <span>
                        {roomType === "web" ? "Web trực tiếp" : currentProgram.badge}
                      </span>
                    </span>

                    <span className="text-xs text-[#687280] font-medium truncate">
                      {scheduleTime || "Đang mở"}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-poppins font-bold text-base text-[#0F2747] leading-snug line-clamp-2">
                      {title || "Chủ đề lớp học của bạn"}
                    </h4>
                    <p className="text-xs text-[#4B5563] line-clamp-2 mt-1.5 leading-relaxed">
                      {objectives ||
                        "Nội dung và mục tiêu buổi học sẽ hiển thị ở đây..."}
                    </p>
                  </div>

                  {/* Host info preview */}
                  <div className="p-2.5 bg-[#FAF8F5] rounded-xl border border-slate-200/60 flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#0F2747] text-[#FFC83D] font-bold text-xs flex items-center justify-center shrink-0">
                      {hostName.charAt(0) || "P"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-xs text-[#0F2747] truncate">
                        {hostName}
                      </div>
                      <div className="text-[10px] text-[#687280] truncate">
                        {school} • {currentProgram.title}
                      </div>
                    </div>
                  </div>

                  <div className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-[#0F2747] flex items-center justify-center gap-1.5 shadow-2xs">
                    <span>Vào phòng học</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#FFC83D]" />
                  </div>
                </div>

                <p className="text-[11px] text-[#687280] text-center pt-1 leading-relaxed">
                  Lớp học tuân thủ kiểm duyệt Demo trước 2 ngày từ Ban Academic.
                </p>
              </div>
            </div>
          </div>

          {/* Footer bar */}
          <div className="px-6 sm:px-8 py-4 border-t border-[#0F2747]/10 bg-white flex items-center justify-between shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#687280] hover:text-[#0F2747] hover:bg-[#FFF9EF] transition active:scale-95 cursor-pointer"
            >
              Hủy
            </button>

            <button
              type="submit"
              form="tutor-drawer-form"
              className="px-7 py-3 rounded-xl bg-[#0F2747] hover:bg-[#1A3E6D] text-white text-xs font-black shadow-md hover:shadow-lg active:scale-95 transition-all duration-150 flex items-center gap-2 cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 text-[#FFC83D] group-hover:rotate-12 transition-transform" />
              <span>Hoàn tất & Mở phòng học</span>
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
