"use client";

import React, { useState, useEffect } from "react";
import { X, Layers, Link as LinkIcon, Video, ArrowRight, ExternalLink, GraduationCap, Users, Compass, Check, Clock, Award } from "lucide-react";
import { usePencily } from "@/context/PencilyContext";
import { PencilyClassroomsIcon } from "./icons/PencilyIcons";

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
    titleVi: "Bạn cùng tiến",
    titleEn: "Study Buddy",
    subtitleVi: "Ôn tập nhóm hàng ngày",
    subtitleEn: "Daily peer study",
    badge: "OPEN" as const,
    badgeColor: "bg-emerald-50 text-emerald-800 border-2 border-emerald-300",
    icon: Users,
  },
  {
    id: "basic_science" as const,
    titleVi: "Toán & KHTN",
    titleEn: "Math & Science",
    subtitleVi: "Giải tích, Lý, Hóa, Tin",
    subtitleEn: "Calculus, Physics, Chem, CS",
    badge: "WORKSHOP" as const,
    badgeColor: "bg-blue-50 text-blue-800 border-2 border-blue-300",
    icon: GraduationCap,
  },
  {
    id: "flagship" as const,
    titleVi: "Flagship",
    titleEn: "Flagship",
    subtitleVi: "Chuyên sâu, IELTS, SAT",
    subtitleEn: "Intensive, IELTS, SAT",
    badge: "BOOTCAMP" as const,
    badgeColor: "bg-amber-50 text-amber-800 border-2 border-amber-300",
    icon: Award,
  },
  {
    id: "liberal_arts" as const,
    titleVi: "Khai phóng",
    titleEn: "Liberal Arts",
    subtitleVi: "Art, Lịch sử, Kỹ năng",
    subtitleEn: "Arts, History, Skills",
    badge: "VOICE" as const,
    badgeColor: "bg-purple-50 text-purple-800 border-2 border-purple-300",
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
  const { language } = usePencily();
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
            ? "https://discord.gg/6hpEf4wC4z"
            : "https://meet.google.com";
      } else if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
        trimmed = `https://${trimmed}`;
      }
      finalMeetUrl = trimmed;
    }

    const currentTitle = language === "vi" ? currentProgram.titleVi : currentProgram.titleEn;
    const categoryLabels: Record<string, string> = {
      toan: "Toán học",
      tin: "Lập trình & Tin",
      ielts: "IELTS & Tiếng Anh",
      ly: "Vật lý & KHTN",
      sat: "Luyện thi SAT",
      khac: currentTitle,
    };

    onSubmitCreate({
      title: title.trim(),
      category,
      categoryLabel: categoryLabels[category] || currentTitle,
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
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#0F2747]/30 backdrop-blur-xs transition-opacity duration-300 cursor-pointer"
        aria-hidden="true"
      />

      {/* Slide-over Workspace */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <aside className="w-screen max-w-4xl bg-[#FFFDF9] border-l-2 border-slate-300 shadow-2xl flex flex-col justify-between overflow-hidden animate-drawer">
          {/* Header */}
          <div className="px-6 sm:px-8 py-4 border-b-2 border-slate-200 bg-white/90 backdrop-blur-md flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm bg-[#0F2747] text-white flex items-center justify-center shrink-0 border-2 border-slate-300">
                <PencilyClassroomsIcon size={18} />
              </div>
              <div>
                <h3 className="font-poppins font-black text-lg sm:text-xl text-[#0F2747] leading-tight">
                  Tutor Studio
                </h3>
                <p className="text-xs text-[#687280]">
                  {language === "vi" ? "Soạn đề cương & mở phòng học trực tuyến" : "Design session syllabus & host room"}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-sm border-2 border-transparent hover:border-slate-300 text-[#0F2747]/70 hover:text-[#0F2747] hover:bg-[#FFF9EF] transition active:scale-90 cursor-pointer"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* LEFT COLUMN: Form */}
              <form
                id="tutor-drawer-form"
                onSubmit={handleSubmit}
                className="lg:col-span-7 space-y-5"
              >
                {/* 1. Chọn loại chương trình */}
                <div>
                  <label className="block text-xs font-black text-[#0F2747] uppercase tracking-wider mb-2">
                    {language === "vi" ? "Chương trình học" : "Program Category"}
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {PROGRAM_TYPES.map((pt) => {
                      const Icon = pt.icon;
                      const isSelected = programType === pt.id;
                      const titleText = language === "vi" ? pt.titleVi : pt.titleEn;
                      const subText = language === "vi" ? pt.subtitleVi : pt.subtitleEn;
                      return (
                        <button
                          key={pt.id}
                          type="button"
                          onClick={() => setProgramType(pt.id)}
                          className={`p-3 rounded-sm border-2 text-left transition-all duration-150 cursor-pointer active:scale-95 flex items-start gap-2.5 ${
                            isSelected
                              ? "bg-white text-[#0F2747] border-[#0F2747] shadow-2xs"
                              : "bg-white text-[#0F2747] border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <Icon
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              isSelected ? "text-[#0F2747]" : "text-[#4F7ECB]"
                            }`}
                          />
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-xs sm:text-sm leading-tight truncate">
                              {titleText}
                            </div>
                            <div
                              className={`text-[11px] truncate mt-0.5 ${
                                isSelected ? "text-[#0F2747]/80 font-medium" : "text-[#687280]"
                              }`}
                            >
                              {subText}
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
                    {language === "vi" ? "Tên chủ đề buổi học *" : "Session Title *"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={language === "vi" ? "Ví dụ: Ôn tập Giải tích 12, Luyện IELTS Speaking..." : "e.g. Calculus 12 Review, IELTS Speaking Fluency..."}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none bg-white text-xs font-semibold text-[#0F2747] transition shadow-2xs"
                  />
                </div>

                {/* 3. Môn học & Người đứng lớp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black text-[#0F2747] uppercase tracking-wider mb-1.5">
                      {language === "vi" ? "Môn học" : "Subject"}
                    </label>
                    <select
                      value={category}
                      onChange={(e) =>
                        setCategory(
                          e.target.value as "toan" | "tin" | "ielts" | "ly" | "sat" | "khac"
                        )
                      }
                      className="w-full px-3.5 py-2.5 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none bg-white text-xs text-[#0F2747]"
                    >
                      <option value="toan">Toán học / Math</option>
                      <option value="tin">Lập trình & Tin / CS</option>
                      <option value="ielts">IELTS & Tiếng Anh</option>
                      <option value="ly">Vật lý & KHTN / Physics</option>
                      <option value="sat">Luyện thi SAT</option>
                      <option value="khac">Khai phóng / Liberal Arts</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-[#0F2747] uppercase tracking-wider mb-1.5">
                      {language === "vi" ? "Host đứng lớp" : "Host Name"}
                    </label>
                    <input
                      type="text"
                      value={hostName}
                      onChange={(e) => setHostName(e.target.value)}
                      placeholder={language === "vi" ? "Tên của bạn" : "Your Name"}
                      className="w-full px-3.5 py-2.5 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none bg-white text-xs text-[#0F2747]"
                    />
                  </div>
                </div>

                {/* 4. Mục tiêu & Slide/Tài liệu */}
                <div>
                  <label className="block text-xs font-black text-[#0F2747] uppercase tracking-wider mb-1.5">
                    {language === "vi" ? "Mục tiêu & Nội dung cốt lõi" : "Objectives & Core Concepts"}
                  </label>
                  <textarea
                    rows={2}
                    placeholder={language === "vi" ? "Tóm tắt 1-2 câu về kiến thức sẽ chia sẻ trong buổi học..." : "Brief summary of what peers will learn..."}
                    value={objectives}
                    onChange={(e) => setObjectives(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none bg-white text-xs text-[#0F2747] leading-relaxed resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-[#0F2747] uppercase tracking-wider mb-1.5">
                    {language === "vi" ? "Link Slide hoặc Tài liệu bài giảng" : "Slide or Lecture Materials Link"}
                  </label>
                  <div className="relative">
                    <LinkIcon className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="url"
                      placeholder="https://drive.google.com/..."
                      value={materialsUrl}
                      onChange={(e) => setMaterialsUrl(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none bg-white text-xs text-[#0F2747]"
                    />
                  </div>
                </div>

                {/* 5. Nền tảng phòng học */}
                <div>
                  <label className="block text-xs font-black text-[#0F2747] uppercase tracking-wider mb-2">
                    {language === "vi" ? "Nền tảng học" : "Learning Platform"}
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
                        className={`py-2 px-3 rounded-sm text-xs font-bold transition-all active:scale-95 cursor-pointer text-center border-2 ${
                          roomType === p.id
                            ? "bg-white text-[#0F2747] border-[#0F2747] shadow-2xs"
                            : "bg-white border-slate-200 text-slate-600 hover:text-[#0F2747] hover:border-slate-300"
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
                      className="w-full mt-2.5 px-3.5 py-2 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none bg-white text-xs text-[#0F2747]"
                    />
                  )}
                </div>

                {/* 6. Khung giờ */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-[#687280] uppercase mb-1">
                      {language === "vi" ? "Giờ học" : "Time"}
                    </label>
                    <input
                      type="text"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      placeholder="19:30 - 21:00"
                      className="w-full px-3 py-2 rounded-sm border-2 border-slate-300 text-xs text-[#0F2747] bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#687280] uppercase mb-1">
                      {language === "vi" ? "Lịch Demo Class" : "Demo Schedule"}
                    </label>
                    <input
                      type="text"
                      value={demoDate}
                      onChange={(e) => setDemoDate(e.target.value)}
                      placeholder={language === "vi" ? "Demo trước 2 ngày" : "Demo 2 days prior"}
                      className="w-full px-3 py-2 rounded-sm border-2 border-slate-300 text-xs text-[#0F2747] bg-white"
                    />
                  </div>
                </div>
              </form>

              {/* RIGHT COLUMN: Live Preview Card */}
              <div className="lg:col-span-5 lg:sticky lg:top-0 space-y-3 pt-2 lg:pt-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-[#687280]">
                    Live Preview
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-sm bg-[#FFC83D]/25 text-[#0F2747] border border-amber-300">
                    {language === "vi" ? "Thẻ hiển thị" : "Display Card"}
                  </span>
                </div>

                {/* Card preview */}
                <div className="bg-white rounded-md p-5 border-2 border-slate-300 shadow-sm space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-sm text-[11px] font-bold ${currentProgram.badgeColor} shrink-0`}
                    >
                      <span>
                        {roomType === "web"
                          ? language === "vi" ? "Web trực tiếp" : "Web Live"
                          : currentProgram.badge}
                      </span>
                    </span>

                    <span className="text-xs text-[#687280] font-medium whitespace-normal text-right flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#687280] shrink-0" />
                      <span>{scheduleTime || (language === "vi" ? "Đang mở" : "Live now")}</span>
                    </span>
                  </div>

                  <div>
                    <h4 className="font-poppins font-bold text-base text-[#0F2747] leading-snug line-clamp-2">
                      {title || (language === "vi" ? "Chủ đề lớp học của bạn" : "Your session title")}
                    </h4>
                    <p className="text-xs text-[#4B5563] line-clamp-2 mt-1.5 leading-relaxed">
                      {objectives || (language === "vi" ? "Nội dung và mục tiêu buổi học sẽ hiển thị ở đây..." : "Objectives and summary will show here...")}
                    </p>
                  </div>

                  {/* Host info preview */}
                  <div className="p-2.5 bg-[#FAF8F5] rounded-sm border-2 border-slate-200 flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-sm bg-[#0F2747] text-[#FFC83D] font-bold text-xs flex items-center justify-center shrink-0 border border-slate-300">
                      {hostName.charAt(0) || "P"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-xs text-[#0F2747] truncate">
                        {hostName}
                      </div>
                      <div className="text-[10px] text-[#687280] truncate">
                        {school} • {language === "vi" ? currentProgram.titleVi : currentProgram.titleEn}
                      </div>
                    </div>
                  </div>

                  <div className="w-full py-2 px-3 rounded-sm text-xs font-bold text-white bg-[#0F2747] flex items-center justify-center gap-1.5 shadow-2xs border-2 border-slate-700">
                    <span>{language === "vi" ? "Vào phòng học" : "Enter Room"}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#FFC83D]" />
                  </div>
                </div>

                <p className="text-[11px] text-[#687280] text-center pt-1 leading-relaxed">
                  {language === "vi"
                    ? "Lớp học tuân thủ kiểm duyệt Demo trước 2 ngày từ Ban Academic."
                    : "Sessions adhere to quality verification 2 days prior by Academic Team."}
                </p>
              </div>
            </div>
          </div>

          {/* Footer bar */}
          <div className="px-6 sm:px-8 py-4 border-t-2 border-slate-200 bg-white flex items-center justify-between shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-sm text-xs font-bold text-[#687280] hover:text-[#0F2747] hover:bg-[#FFF9EF] border-2 border-transparent hover:border-slate-300 transition active:scale-95 cursor-pointer"
            >
              {language === "vi" ? "Hủy" : "Cancel"}
            </button>

            <button
              type="submit"
              form="tutor-drawer-form"
              className="px-6 py-2.5 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] border-2 border-slate-300 hover:border-slate-400 text-xs font-bold shadow-2xs active:scale-95 transition-all duration-150 flex items-center gap-2 cursor-pointer group"
            >
              <Award className="w-4 h-4 text-[#4F7ECB] group-hover:rotate-12 transition-transform" />
              <span>{language === "vi" ? "Hoàn tất & Mở phòng học" : "Complete & Open Room"}</span>
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
