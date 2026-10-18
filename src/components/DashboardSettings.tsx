"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  School,
  Languages,
  Shield,
  Volume2,
  Mic,
  Camera,
  Bell,
  Download,
  RotateCcw,
  LogOut,
  Save,
  Check,
  ExternalLink,
  Sliders,
  HelpCircle,
  Eye,
  Award,
  Sparkles,
} from "lucide-react";
import { usePencily } from "@/context/PencilyContext";
import { DiscordLogo } from "./BrandIcons";
import { downloadPencilyCertificatePdf } from "@/lib/certificatePdf";

interface DashboardSettingsProps {
  onOpenEditProfile: () => void;
  onStartTour?: () => void;
  onOpenReferModal?: () => void;
}

export function DashboardSettings({
  onOpenEditProfile,
  onStartTour,
  onOpenReferModal,
}: DashboardSettingsProps) {
  const { user, updateUser, language, setLanguage, logout } = usePencily();
  const isVi = language === "vi";

  // Local settings state stored in localStorage
  const [autoMuteMic, setAutoMuteMic] = useState(true);
  const [autoMuteCam, setAutoMuteCam] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);
  const [notifSchedule, setNotifSchedule] = useState(true);
  const [notifPoints, setNotifPoints] = useState(true);
  const [notifDocs, setNotifDocs] = useState(true);
  const [showOnLeaderboard, setShowOnLeaderboard] = useState(true);
  const [hideSchoolPublic, setHideSchoolPublic] = useState(false);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Load preferences from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("pencily_app_settings");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.autoMuteMic !== undefined) setAutoMuteMic(parsed.autoMuteMic);
          if (parsed.autoMuteCam !== undefined) setAutoMuteCam(parsed.autoMuteCam);
          if (parsed.soundEffects !== undefined) setSoundEffects(parsed.soundEffects);
          if (parsed.notifSchedule !== undefined) setNotifSchedule(parsed.notifSchedule);
          if (parsed.notifPoints !== undefined) setNotifPoints(parsed.notifPoints);
          if (parsed.notifDocs !== undefined) setNotifDocs(parsed.notifDocs);
          if (parsed.showOnLeaderboard !== undefined) setShowOnLeaderboard(parsed.showOnLeaderboard);
          if (parsed.hideSchoolPublic !== undefined) setHideSchoolPublic(parsed.hideSchoolPublic);
        }
      } catch {
        // Fallback to defaults
      }
    }
  }, []);

  const savePreferences = (overrides: Record<string, boolean>) => {
    if (typeof window !== "undefined") {
      const current = {
        autoMuteMic,
        autoMuteCam,
        soundEffects,
        notifSchedule,
        notifPoints,
        notifDocs,
        showOnLeaderboard,
        hideSchoolPublic,
        ...overrides,
      };
      localStorage.setItem("pencily_app_settings", JSON.stringify(current));
      setSaveToast(isVi ? "Đã lưu cài đặt hệ thống" : "Settings saved");
      setTimeout(() => setSaveToast(null), 3000);
    }
  };

  const handleResetTour = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("pencily_has_seen_tour");
    }
    if (onStartTour) {
      onStartTour();
    } else {
      setSaveToast(isVi ? "Đã đặt lại tour hướng dẫn!" : "Walkthrough reset!");
      setTimeout(() => setSaveToast(null), 3000);
    }
  };

  return (
    <div className="w-full space-y-6 animate-fadeIn pb-12">
      {/* Settings Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-slate-300">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-[#4F7ECB] mb-1">
            {isVi ? "Tùy Chỉnh Học Viện" : "Academy Preferences"}
          </div>
          <h2 className="font-poppins font-black text-2xl sm:text-3xl text-[#0F2747] tracking-tight">
            {isVi ? "Cài Đặt Hệ Thống" : "Account & App Settings"}
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] mt-1 font-medium">
            {isVi
              ? "Quản lý hồ sơ học sinh, ngôn ngữ hiển thị, âm thanh phòng học ảo và quyền riêng tư."
              : "Manage student profile, interface language, virtual room audio, and privacy."}
          </p>
        </div>

        {saveToast && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-emerald-100 border-2 border-emerald-600 text-emerald-900 text-xs font-bold shadow-2xs animate-fadeIn">
            <Check className="w-3.5 h-3.5 text-emerald-700" />
            <span>{saveToast}</span>
          </div>
        )}
      </div>

      {/* SECTION 1: PROFILE & IDENTITY */}
      <section className="bg-white rounded-md border-2 border-[#0F2747] p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-[#FFF9EF] border-2 border-[#0F2747] flex items-center justify-center text-[#0F2747]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-poppins font-bold text-base text-[#0F2747]">
                {isVi ? "Hồ Sơ & Danh Tính Học Sinh" : "Student Profile & Identity"}
              </h3>
              <p className="text-xs text-slate-500">
                {isVi ? "Thông tin được chứng nhận trên hệ thống The Pencily" : "Verified credential information"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenEditProfile}
            className="px-3.5 py-1.5 rounded-sm bg-[#0F2747] hover:bg-[#1A3E6D] text-white text-xs font-bold transition border-2 border-[#0F2747] shadow-2xs cursor-pointer active:scale-95"
          >
            {isVi ? "Chỉnh sửa hồ sơ" : "Edit Profile"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t-2 border-slate-100">
          <div className="p-3.5 rounded-sm bg-[#FAF7F2] border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              {isVi ? "Họ và tên thật" : "Real Name"}
            </span>
            <span className="font-bold text-sm text-[#0F2747] block truncate">
              {user.realName || user.name || "Chưa cập nhật"}
            </span>
          </div>

          <div className="p-3.5 rounded-sm bg-[#FAF7F2] border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              {isVi ? "Trường THPT" : "High School"}
            </span>
            <span className="font-bold text-sm text-[#0F2747] block truncate">
              {user.school || "The Pencily Academy"}
            </span>
          </div>

          <div className="p-3.5 rounded-sm bg-[#FAF7F2] border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              {isVi ? "Khối lớp & Số dư PP" : "Grade & PP Balance"}
            </span>
            <span className="font-bold text-sm text-[#0F2747] block">
              {user.grade || "Lớp 11"} • <strong className="text-amber-600">{user.points} PP</strong>
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 2: SYSTEM LANGUAGE (Clean Toggle, No Parentheses) */}
      <section className="bg-white rounded-md border-2 border-slate-300 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-sm bg-blue-50 border-2 border-blue-300 flex items-center justify-center text-blue-700">
            <Languages className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-poppins font-bold text-base text-[#0F2747]">
              {isVi ? "Ngôn Ngữ Giao Diện" : "Display Language"}
            </h3>
            <p className="text-xs text-slate-500">
              {isVi
                ? "Chuyển đổi toàn diện ngôn ngữ trên toàn bộ nền tảng"
                : "Switch application language across the platform"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={() => setLanguage("vi")}
            className={`p-3 rounded-sm border-2 font-bold text-xs flex items-center justify-between transition cursor-pointer ${
              language === "vi"
                ? "bg-[#FFF9EF] border-[#0F2747] text-[#0F2747] shadow-xs"
                : "bg-white border-slate-200 hover:border-slate-400 text-slate-600"
            }`}
          >
            <span>Tiếng Việt</span>
            {language === "vi" && <Check className="w-4 h-4 text-[#0F2747]" />}
          </button>

          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={`p-3 rounded-sm border-2 font-bold text-xs flex items-center justify-between transition cursor-pointer ${
              language === "en"
                ? "bg-[#FFF9EF] border-[#0F2747] text-[#0F2747] shadow-xs"
                : "bg-white border-slate-200 hover:border-slate-400 text-slate-600"
            }`}
          >
            <span>English</span>
            {language === "en" && <Check className="w-4 h-4 text-[#0F2747]" />}
          </button>
        </div>
      </section>

      {/* SECTION 3: DISCORD INTEGRATION */}
      <section className="bg-white rounded-md border-2 border-slate-300 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-indigo-50 border-2 border-indigo-300 flex items-center justify-center text-indigo-700">
              <DiscordLogo className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-poppins font-bold text-base text-[#0F2747]">
                {isVi ? "Liên Kết Máy Chủ Discord" : "Discord Community Link"}
              </h3>
              <p className="text-xs text-slate-500">
                {isVi
                  ? "Đồng bộ quyền hạn phòng học voice và vai trò học sinh trên máy chủ"
                  : "Sync voice pod roles and student channels on Discord"}
              </p>
            </div>
          </div>

          <a
            href="https://discord.gg/6hpEf4wC4z"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition border border-indigo-800 shadow-2xs"
          >
            <span>{isVi ? "Mở Server Discord" : "Open Server"}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="p-4 rounded-sm bg-[#FAF7F2] border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {isVi ? "Tài khoản Discord liên kết" : "Linked Discord Handle"}
            </span>
            <span className="text-sm font-black text-[#0F2747] font-mono">
              {user.discord || "Chưa kết nối"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-xs bg-emerald-100 border border-emerald-300 text-emerald-800 text-[10px] font-bold">
              {isVi ? "Sẵn Sàng Đồng Bộ" : "Ready to Sync"}
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 4: VIRTUAL CLASSROOM & AUDIO */}
      <section className="bg-white rounded-md border-2 border-slate-300 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-sm bg-amber-50 border-2 border-amber-300 flex items-center justify-center text-amber-700">
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-poppins font-bold text-base text-[#0F2747]">
              {isVi ? "Phòng Học Ảo & Thiết Bị" : "Virtual Classroom & Audio"}
            </h3>
            <p className="text-xs text-slate-500">
              {isVi
                ? "Tùy chọn mặc định khi tham gia phòng học trực tuyến"
                : "Default preferences when joining a live session"}
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          {/* Toggle: Auto mute mic */}
          <div className="flex items-center justify-between p-3.5 rounded-sm bg-[#FAF7F2] border border-slate-200">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-[#0F2747] block">
                {isVi ? "Tự động tắt Micro khi vào phòng" : "Auto-mute microphone on join"}
              </span>
              <span className="text-[11px] text-slate-500 block">
                {isVi ? "Tránh tạp âm bất ngờ làm phiền lớp học" : "Avoid sudden background noises"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                const next = !autoMuteMic;
                setAutoMuteMic(next);
                savePreferences({ autoMuteMic: next });
              }}
              className={`w-12 h-6 rounded-sm border-2 transition-colors relative cursor-pointer ${
                autoMuteMic ? "bg-[#0F2747] border-[#0F2747]" : "bg-slate-200 border-slate-300"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-xs border border-slate-300 transition-transform ${
                  autoMuteMic ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* Toggle: Auto disable camera */}
          <div className="flex items-center justify-between p-3.5 rounded-sm bg-[#FAF7F2] border border-slate-200">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-[#0F2747] block">
                {isVi ? "Tự động tắt Camera khi vào phòng" : "Auto-disable camera on join"}
              </span>
              <span className="text-[11px] text-slate-500 block">
                {isVi ? "Chủ động bật webcam khi bạn đã sẵn sàng" : "Only turn on camera when you are ready"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                const next = !autoMuteCam;
                setAutoMuteCam(next);
                savePreferences({ autoMuteCam: next });
              }}
              className={`w-12 h-6 rounded-sm border-2 transition-colors relative cursor-pointer ${
                autoMuteCam ? "bg-[#0F2747] border-[#0F2747]" : "bg-slate-200 border-slate-300"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-xs border border-slate-300 transition-transform ${
                  autoMuteCam ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* Toggle: Sound effects */}
          <div className="flex items-center justify-between p-3.5 rounded-sm bg-[#FAF7F2] border border-slate-200">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-[#0F2747] block">
                {isVi ? "Âm thanh hiệu ứng & chuông tương tác" : "Sound effects & reactions"}
              </span>
              <span className="text-[11px] text-slate-500 block">
                {isVi ? "Phát tiếng click vui nhộn và phản hồi giơ tay" : "Play subtle cues for hand raises and chat"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                const next = !soundEffects;
                setSoundEffects(next);
                savePreferences({ soundEffects: next });
              }}
              className={`w-12 h-6 rounded-sm border-2 transition-colors relative cursor-pointer ${
                soundEffects ? "bg-[#0F2747] border-[#0F2747]" : "bg-slate-200 border-slate-300"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-xs border border-slate-300 transition-transform ${
                  soundEffects ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 5: NOTIFICATIONS */}
      <section className="bg-white rounded-md border-2 border-slate-300 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-sm bg-purple-50 border-2 border-purple-300 flex items-center justify-center text-purple-700">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-poppins font-bold text-base text-[#0F2747]">
              {isVi ? "Thông Báo & Nhắc Nhở Học Tập" : "Notifications & Study Alerts"}
            </h3>
            <p className="text-xs text-slate-500">
              {isVi ? "Lựa chọn các nội dung bạn muốn nhận thông báo" : "Choose which updates notify you"}
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between p-3.5 rounded-sm bg-[#FAF7F2] border border-slate-200">
            <span className="text-xs font-bold text-[#0F2747]">
              {isVi ? "Nhắc lịch học trước 15 phút" : "Remind 15 minutes before session"}
            </span>
            <button
              type="button"
              onClick={() => {
                const next = !notifSchedule;
                setNotifSchedule(next);
                savePreferences({ notifSchedule: next });
              }}
              className={`w-12 h-6 rounded-sm border-2 transition-colors relative cursor-pointer ${
                notifSchedule ? "bg-[#0F2747] border-[#0F2747]" : "bg-slate-200 border-slate-300"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-xs border border-slate-300 transition-transform ${
                  notifSchedule ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-sm bg-[#FAF7F2] border border-slate-200">
            <span className="text-xs font-bold text-[#0F2747]">
              {isVi ? "Thông báo thưởng điểm Pencily Points (PP)" : "Pencily Points (PP) reward alerts"}
            </span>
            <button
              type="button"
              onClick={() => {
                const next = !notifPoints;
                setNotifPoints(next);
                savePreferences({ notifPoints: next });
              }}
              className={`w-12 h-6 rounded-sm border-2 transition-colors relative cursor-pointer ${
                notifPoints ? "bg-[#0F2747] border-[#0F2747]" : "bg-slate-200 border-slate-300"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-xs border border-slate-300 transition-transform ${
                  notifPoints ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-sm bg-[#FAF7F2] border border-slate-200">
            <span className="text-xs font-bold text-[#0F2747]">
              {isVi ? "Thông báo mở lớp học mới theo môn đã lưu" : "New class alerts for followed subjects"}
            </span>
            <button
              type="button"
              onClick={() => {
                const next = !notifDocs;
                setNotifDocs(next);
                savePreferences({ notifDocs: next });
              }}
              className={`w-12 h-6 rounded-sm border-2 transition-colors relative cursor-pointer ${
                notifDocs ? "bg-[#0F2747] border-[#0F2747]" : "bg-slate-200 border-slate-300"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-xs border border-slate-300 transition-transform ${
                  notifDocs ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 6: PRIVACY & CREDENTIALS */}
      <section className="bg-white rounded-md border-2 border-slate-300 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-sm bg-emerald-50 border-2 border-emerald-300 flex items-center justify-center text-emerald-700">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-poppins font-bold text-base text-[#0F2747]">
              {isVi ? "Quyền Riêng Tư & Dữ Liệu Hoạt Động" : "Privacy & Credentials"}
            </h3>
            <p className="text-xs text-slate-500">
              {isVi
                ? "Bảo vệ thông tin học đường và xuất chứng chỉ hoạt động ngoại khóa"
                : "Protect your personal information and export activity credentials"}
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between p-3.5 rounded-sm bg-[#FAF7F2] border border-slate-200">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-[#0F2747] block">
                {isVi ? "Hiển thị trên Bảng xếp hạng học tập" : "Public profile on Leaderboard"}
              </span>
              <span className="text-[11px] text-slate-500 block">
                {isVi ? "Cho phép bạn bè nhìn thấy số phút học và rank của bạn" : "Allow peers to see your learning minutes"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                const next = !showOnLeaderboard;
                setShowOnLeaderboard(next);
                savePreferences({ showOnLeaderboard: next });
              }}
              className={`w-12 h-6 rounded-sm border-2 transition-colors relative cursor-pointer ${
                showOnLeaderboard ? "bg-[#0F2747] border-[#0F2747]" : "bg-slate-200 border-slate-300"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-xs border border-slate-300 transition-transform ${
                  showOnLeaderboard ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* Export Certificate action */}
          <div className="p-4 rounded-sm bg-emerald-50/70 border-2 border-emerald-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="text-xs font-black text-emerald-950 block">
                {isVi ? "Chứng Nhận Hoạt Động Ngoại Khóa" : "Official Extracurricular Certificate"}
              </span>
              <span className="text-[11px] text-emerald-800 block">
                {isVi
                  ? "Tải về chứng chỉ đính kèm hồ sơ du học & xét tuyển đại học"
                  : "Download verified PDF certificate for college application"}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                downloadPencilyCertificatePdf(user, language);
              }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition border border-emerald-900 shadow-2xs cursor-pointer active:scale-95 whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isVi ? "Tải chứng chỉ PDF" : "Download PDF"}</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 7: SYSTEM CONTROLS & LOGOUT */}
      <section className="bg-white rounded-md border-2 border-slate-300 p-6 shadow-xs space-y-4">
        <h3 className="font-poppins font-bold text-base text-[#0F2747]">
          {isVi ? "Tác Vụ Hệ Thống" : "System Actions"}
        </h3>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleResetTour}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-sm bg-[#FFF9EF] hover:bg-[#FFF2D8] text-[#0F2747] border-2 border-amber-400 text-xs font-bold transition cursor-pointer active:scale-95 shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
            <span>{isVi ? "Xem lại Tour Nhập Môn Tân Thủ" : "Replay Walkthrough Tour"}</span>
          </button>

          {onOpenReferModal && (
            <button
              type="button"
              onClick={onOpenReferModal}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-sm bg-blue-50 hover:bg-blue-100 text-[#0F2747] border-2 border-blue-300 text-xs font-bold transition cursor-pointer active:scale-95 shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#4F7ECB]" />
              <span>{isVi ? "Mời Bạn Học (+10 PP)" : "Refer a Friend (+10 PP)"}</span>
            </button>
          )}

          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-sm bg-red-50 hover:bg-red-100 text-red-700 border-2 border-red-300 text-xs font-bold transition cursor-pointer active:scale-95 shadow-2xs ml-auto"
          >
            <LogOut className="w-3.5 h-3.5 text-red-600" />
            <span>{isVi ? "Đăng Xuất Tài Khoản" : "Sign Out"}</span>
          </button>
        </div>
      </section>
    </div>
  );
}
