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
  const { user, completeProfile } = usePencily();

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
      setError("Vui lòng điền đầy đủ Họ và tên thật của bạn.");
      return;
    }

    if (!school.trim()) {
      setError("Vui lòng nhập trường học bạn đang theo học.");
      return;
    }

    if (customDisplayName !== null && customDisplayName.trim().length >= 10) {
      setError("Tên hiển thị phải dưới 10 ký tự.");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F2747]/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#0F2747]/10 shadow-2xl relative animate-scaleUp">
        {!required && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition cursor-pointer"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#FFC83D]/25 text-[#0F2747] flex items-center justify-center mb-3">
            <ShieldCheck className="w-6 h-6 text-[#0F2747]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0F2747] font-poppins">
            Xác nhận thông tin
          </h2>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          {/* Họ tên thật */}
          <div>
            <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1.5">
              Họ và tên thật *
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={realName}
                onChange={(e) => setRealName(e.target.value)}
                placeholder="Ví dụ: Huỳnh Công Thành"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-[#0F2747]/15 focus:border-[#0F2747] focus:outline-none text-slate-800 bg-[#FFFDF9]"
              />
            </div>
            {/* Tên hiển thị với nút cây bút để chỉnh sửa manual (dưới 10 ký tự) */}
            {!isEditingDisplayName ? (
              <div className="flex items-center justify-between mt-2 px-3 py-2 rounded-xl bg-[#FFFDF9] border border-[#0F2747]/10">
                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                  <span>Tên hiển thị:</span>
                  <span className="font-bold text-[#0F2747]">{effectiveDisplayName || "Chưa nhập"}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (customDisplayName === null) {
                      setCustomDisplayName(defaultDisplayName);
                    }
                    setIsEditingDisplayName(true);
                  }}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-[#0F2747] transition cursor-pointer flex items-center gap-1 text-[11px] font-bold"
                  title="Chỉnh sửa tên hiển thị (dưới 10 ký tự)"
                >
                  <Pencil className="w-3.5 h-3.5 text-[#0F2747]" />
                  <span>Sửa</span>
                </button>
              </div>
            ) : (
              <div className="mt-2 p-2.5 rounded-xl bg-[#FFFDF9] border border-[#0F2747]/20 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600 font-bold shrink-0">Tên hiển thị:</span>
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
                    placeholder="Dưới 10 ký tự"
                    className="flex-1 px-2.5 py-1 text-xs rounded-lg border border-[#0F2747]/20 bg-white text-[#0F2747] font-bold focus:outline-none focus:border-[#0F2747]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingDisplayName(false);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-[#0F2747] hover:bg-slate-50 text-xs font-bold transition cursor-pointer flex items-center gap-1 shadow-2xs"
                    title="Lưu tên hiển thị"
                  >
                    <Check className="w-3.5 h-3.5 text-[#4F7ECB]" />
                    <span>Lưu</span>
                  </button>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 px-0.5">
                  <span>Yêu cầu: Dưới 10 ký tự</span>
                  <span>{(customDisplayName ?? defaultDisplayName).length}/9</span>
                </div>
              </div>
            )}
          </div>

          {/* Tuổi & Khối lớp */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1.5">
                Tuổi *
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
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border-2 border-[#0F2747]/15 focus:border-[#0F2747] focus:outline-none text-slate-800 bg-[#FFFDF9]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1.5">
                Khối lớp *
              </label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border-2 border-[#0F2747]/15 focus:border-[#0F2747] focus:outline-none text-slate-800 bg-[#FFFDF9] cursor-pointer"
                >
                  <option value="Lớp 9">Lớp 9</option>
                  <option value="Lớp 10">Lớp 10</option>
                  <option value="Lớp 11">Lớp 11</option>
                  <option value="Lớp 12">Lớp 12</option>
                  <option value="Đại học">Đại học / Sinh viên</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>
            </div>
          </div>

          {/* Trường học */}
          <div>
            <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1.5">
              Trường đang theo học *
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="Ví dụ: THPT Gia Định, THPT Chuyên Lê Hồng Phong..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-[#0F2747]/15 focus:border-[#0F2747] focus:outline-none text-slate-800 bg-[#FFFDF9]"
              />
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-white hover:bg-slate-50 text-[#0F2747] border border-slate-300 hover:border-slate-400 font-bold text-sm shadow-2xs transition active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Xác nhận thông tin & Tiếp tục</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
