"use client";

import React, { useState } from "react";
import { usePencily } from "@/context/PencilyContext";
import { User, GraduationCap, Building2, Calendar, ShieldCheck, X, Pencil, Check } from "lucide-react";

interface CompleteProfileModalProps {
  isOpen: boolean;
  onClose?: () => void;
  required?: boolean;
}

export default function CompleteProfileModal({
  isOpen,
  onClose,
  required = false,
}: CompleteProfileModalProps) {
  const { user, completeProfile, language } = usePencily();

  const [realName, setRealName] = useState(user.realName || (user.name !== "Học sinh Pencily" && !user.name.includes("#") ? user.name : ""));
  const [age, setAge] = useState(user.age ? String(user.age) : "17");
  const [school, setSchool] = useState(user.school !== "Chưa cập nhật" ? user.school : "");
  const [grade, setGrade] = useState(user.grade !== "Học sinh" ? user.grade : "Lớp 11");
  const [error, setError] = useState<string | null>(null);

  const [customDisplayName, setCustomDisplayName] = useState<string | null>(null);
  const [isEditingDisplayName, setIsEditingDisplayName] = useState(false);

  const getGivenName = (fullName: string) => {
    if (!fullName) return "";
    const parts = fullName.trim().split(/\s+/).filter(Boolean);
    return parts.length > 0 ? parts[parts.length - 1] : "";
  };

  const defaultDisplayName = getGivenName(realName);
  const effectiveDisplayName = customDisplayName !== null ? customDisplayName : defaultDisplayName;

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = realName.trim();
    if (!trimmed || trimmed.length < 3) {
      setError(language === "vi" ? "Vui lòng điền đầy đủ Họ và tên thật của bạn." : "Please enter your full real name.");
      return;
    }

    if (!school.trim()) {
      setError(language === "vi" ? "Vui lòng nhập trường học bạn đang theo học." : "Please enter your school name.");
      return;
    }

    if (customDisplayName !== null && customDisplayName.trim().length >= 10) {
      setError(language === "vi" ? "Tên hiển thị phải dưới 10 ký tự." : "Display name must be under 10 characters.");
      return;
    }

    completeProfile({
      realName: trimmed,
      displayName: effectiveDisplayName.trim() || undefined,
      age: age ? Number(age) : 17,
      school: school.trim(),
      grade,
    });

    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F2747]/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-md max-w-lg w-full p-6 sm:p-8 border-2 border-[#0F2747] shadow-2xl relative">
        {!required && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-sm border-2 border-transparent hover:border-slate-300 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition cursor-pointer"
            title={language === "vi" ? "Đóng" : "Close"}
            aria-label={language === "vi" ? "Đóng" : "Close"}
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto rounded-sm bg-amber-100 border-2 border-amber-300 text-[#0F2747] flex items-center justify-center mb-3">
            <ShieldCheck className="w-6 h-6 text-[#0F2747]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0F2747] font-poppins">
            {language === "vi" ? "Xác nhận thông tin học sinh" : "Confirm Learner Profile"}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {language === "vi" ? "Thông tin giúp lớp học và gia sư kết nối tốt nhất" : "Helps peer tutors and classes connect accurately"}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-sm bg-red-50 border-2 border-red-300 text-xs text-red-700 font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          {/* Họ tên thật */}
          <div>
            <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1.5">
              {language === "vi" ? "Họ và tên thật *" : "Real Full Name *"}
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={realName}
                onChange={(e) => setRealName(e.target.value)}
                placeholder={language === "vi" ? "Ví dụ: Huỳnh Công Thành" : "e.g. Alex Nguyen"}
                className="w-full pl-10 pr-4 py-2.5 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none text-slate-800 bg-[#FFFDF9]"
              />
            </div>
            {/* Tên hiển thị (dưới 10 ký tự) */}
            {!isEditingDisplayName ? (
              <div className="flex items-center justify-between mt-2 px-3 py-2 rounded-sm bg-[#FFFDF9] border-2 border-slate-200">
                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                  <span>{language === "vi" ? "Tên hiển thị:" : "Display Name:"}</span>
                  <span className="font-bold text-[#0F2747]">{effectiveDisplayName || (language === "vi" ? "Chưa nhập" : "Not set")}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (customDisplayName === null) {
                      setCustomDisplayName(defaultDisplayName);
                    }
                    setIsEditingDisplayName(true);
                  }}
                  className="p-1 rounded-sm border-2 border-transparent hover:border-slate-300 hover:bg-slate-100 text-slate-600 hover:text-[#0F2747] transition cursor-pointer flex items-center gap-1 text-[11px] font-bold"
                  title="Chỉnh sửa tên hiển thị (dưới 10 ký tự)"
                >
                  <Pencil className="w-3.5 h-3.5 text-[#0F2747]" />
                  <span>{language === "vi" ? "Sửa" : "Edit"}</span>
                </button>
              </div>
            ) : (
              <div className="mt-2 p-2.5 rounded-sm bg-[#FFFDF9] border-2 border-slate-300 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600 font-bold shrink-0">{language === "vi" ? "Tên hiển thị:" : "Display Name:"}</span>
                  <input
                    type="text"
                    maxLength={9}
                    autoFocus
                    value={customDisplayName ?? defaultDisplayName}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val.length < 10) {
                        setCustomDisplayName(val);
                      }
                    }}
                    placeholder={language === "vi" ? "Dưới 10 ký tự" : "< 10 chars"}
                    className="flex-1 px-2.5 py-1 text-xs rounded-sm border-2 border-slate-300 bg-white text-[#0F2747] font-bold focus:outline-none focus:border-[#0F2747]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingDisplayName(false);
                    }}
                    className="px-2.5 py-1 rounded-sm bg-white border-2 border-slate-300 text-[#0F2747] hover:bg-slate-50 text-xs font-bold transition cursor-pointer flex items-center gap-1 shadow-xs"
                    title="Lưu tên hiển thị"
                  >
                    <Check className="w-3.5 h-3.5 text-[#4F7ECB]" />
                    <span>{language === "vi" ? "Lưu" : "Save"}</span>
                  </button>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 px-0.5">
                  <span>{language === "vi" ? "Yêu cầu: Dưới 10 ký tự" : "Max: Under 10 characters"}</span>
                  <span>{(customDisplayName ?? defaultDisplayName).length}/9</span>
                </div>
              </div>
            )}
          </div>

          {/* Tuổi & Khối lớp */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1.5">
                {language === "vi" ? "Tuổi *" : "Age *"}
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="number"
                  min="10"
                  max="90"
                  required
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="17"
                  className="w-full pl-10 pr-3 py-2.5 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none text-slate-800 bg-[#FFFDF9]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1.5">
                {language === "vi" ? "Khối lớp *" : "Grade *"}
              </label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none text-slate-800 bg-[#FFFDF9] cursor-pointer"
                >
                  <option value="Lớp 9">{language === "vi" ? "Lớp 9" : "Grade 9"}</option>
                  <option value="Lớp 10">{language === "vi" ? "Lớp 10" : "Grade 10"}</option>
                  <option value="Lớp 11">{language === "vi" ? "Lớp 11" : "Grade 11"}</option>
                  <option value="Lớp 12">{language === "vi" ? "Lớp 12" : "Grade 12"}</option>
                  <option value="Đại học">{language === "vi" ? "Đại học / Sinh viên" : "University / College"}</option>
                  <option value="Khác">{language === "vi" ? "Khác" : "Other"}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Trường học */}
          <div>
            <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1.5">
              {language === "vi" ? "Trường đang theo học *" : "Current School *"}
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder={language === "vi" ? "Ví dụ: THPT Gia Định, THPT Chuyên..." : "e.g. Gifted High School..."}
                className="w-full pl-10 pr-4 py-2.5 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none text-slate-800 bg-[#FFFDF9]"
              />
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3 px-6 rounded-sm bg-[#FFC83D] hover:bg-[#EAB308] text-[#0F2747] border-2 border-[#0F2747] font-bold text-sm shadow-xs transition active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{language === "vi" ? "Xác nhận thông tin & Tiếp tục" : "Confirm Profile & Continue"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
