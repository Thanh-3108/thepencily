"use client";

import React, { useState, useEffect, useMemo } from "react";
import { VIETNAM_PROVINCES_DATA, detectSchoolInfo } from "@/data/vietnamSchools";
import { Building2, Search, Edit3, ListFilter, RotateCcw } from "lucide-react";

export interface SchoolSelectDropdownProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  className?: string;
  label?: string;
  language?: "vi" | "en";
}

export default function SchoolSelectDropdown({
  value,
  onChange,
  required = false,
  placeholder,
  className = "",
  label,
  language = "vi",
}: SchoolSelectDropdownProps) {
  const isVi = language === "vi";

  // Initial detection
  const detected = useMemo(() => detectSchoolInfo(value), [value]);

  const [provinceId, setProvinceId] = useState<string>(() => detected.provinceId || "hcm");
  const [level, setLevel] = useState<"all" | "highSchool" | "university">(() => detected.level);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCustomInput, setIsCustomInput] = useState<boolean>(() => {
    if (!value || !value.trim()) return false;
    return !detected.found;
  });

  // Current province data
  const currentProvince = useMemo(() => {
    return VIETNAM_PROVINCES_DATA.find((p) => p.id === provinceId) || VIETNAM_PROVINCES_DATA[0];
  }, [provinceId]);

  // Available schools in selected province based on level
  const availableSchools = useMemo(() => {
    let list: { name: string; level: "highSchool" | "university" }[] = [];
    if (level === "all" || level === "university") {
      if (currentProvince.universities) {
        list.push(...currentProvince.universities.map((u) => ({ name: u, level: "university" as const })));
      }
    }
    if (level === "all" || level === "highSchool") {
      list.push(...currentProvince.highSchools.map((h) => ({ name: h, level: "highSchool" as const })));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((s) => s.name.toLowerCase().includes(q));
    }
    return list;
  }, [currentProvince, level, searchQuery]);

  // Handle school select dropdown change
  const handleSelectSchool = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === "__custom__") {
      setIsCustomInput(true);
      onChange("");
    } else {
      onChange(val);
    }
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Mode 1: Custom Text Input */}
      {isCustomInput ? (
        <div className="space-y-1.5 animate-fadeIn">
          <div className="relative">
            <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4F7ECB]" />
            <input
              type="text"
              required={required}
              value={value}
              onChange={handleCustomChange}
              placeholder={placeholder || (isVi ? "Nhập tên trường của bạn..." : "Enter your school name...")}
              className="w-full pl-10 pr-24 py-2.5 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none text-xs font-semibold text-[#0F2747] bg-white transition"
            />
            <button
              type="button"
              onClick={() => {
                setIsCustomInput(false);
                setSearchQuery("");
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-xs bg-slate-100 hover:bg-slate-200 text-[#0F2747] text-[11px] font-bold border border-slate-300 transition flex items-center gap-1 cursor-pointer"
              title={isVi ? "Chọn lại từ danh sách tỉnh / trường" : "Pick from list"}
            >
              <RotateCcw className="w-3 h-3 text-[#4F7ECB]" />
              <span>{isVi ? "Danh sách" : "From list"}</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-500">
            {isVi
              ? "Đang ở chế độ tự nhập. Nhấp 'Danh sách' để chọn theo Tỉnh / Thành toàn quốc."
              : "Manual input mode. Click 'From list' to browse nationwide school directory."}
          </p>
        </div>
      ) : (
        /* Mode 2: Cascading Selectors */
        <div className="space-y-2 bg-[#FAF7F2] p-2.5 sm:p-3 rounded-sm border-2 border-slate-300">
          {/* Row 1: Tỉnh / Thành + Cấp học */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                {isVi ? "1. Tỉnh / Thành phố:" : "1. Province / City:"}
              </label>
              <select
                value={provinceId}
                onChange={(e) => {
                  setProvinceId(e.target.value);
                  setSearchQuery("");
                }}
                className="w-full px-2.5 py-1.5 rounded-xs border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none bg-white text-xs font-semibold text-[#0F2747] cursor-pointer"
              >
                {VIETNAM_PROVINCES_DATA.map((prov) => (
                  <option key={prov.id} value={prov.id}>
                    {prov.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                {isVi ? "2. Cấp học:" : "2. Education Level:"}
              </label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: "all", labelVi: "Tất cả", labelEn: "All" },
                  { id: "highSchool", labelVi: "THPT", labelEn: "High School" },
                  { id: "university", labelVi: "Đại học", labelEn: "University" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setLevel(item.id as "all" | "highSchool" | "university");
                      setSearchQuery("");
                    }}
                    className={`py-1 text-[11px] font-bold rounded-xs border transition cursor-pointer text-center ${
                      level === item.id
                        ? "bg-[#0F2747] text-white border-[#0F2747]"
                        : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    {isVi ? item.labelVi : item.labelEn}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Search filter if needed */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isVi ? "Tìm nhanh tên trường trong tỉnh..." : "Quick filter school in province..."}
              className="w-full pl-8 pr-3 py-1 text-xs rounded-xs border border-slate-300 bg-white focus:outline-none focus:border-[#0F2747] placeholder:text-slate-400"
            />
          </div>

          {/* Row 3: School Dropdown Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1 flex items-center justify-between">
              <span>{isVi ? "3. Chọn trường học:" : "3. Select School:"}</span>
              <button
                type="button"
                onClick={() => setIsCustomInput(true)}
                className="text-[11px] font-bold text-[#4F7ECB] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3 h-3" />
                <span>{isVi ? "Không thấy trường? Tự gõ" : "Write in custom"}</span>
              </button>
            </label>
            <select
              required={required}
              value={availableSchools.some((s) => s.name === value) ? value : ""}
              onChange={handleSelectSchool}
              className="w-full px-3 py-2 rounded-xs border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none bg-white text-xs font-bold text-[#0F2747] cursor-pointer"
            >
              <option value="" disabled>
                {isVi ? "-- Bấm để chọn trường học --" : "-- Select your school --"}
              </option>
              {availableSchools.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.level === "university" ? "[ĐH] " : "[THPT] "}
                  {item.name}
                </option>
              ))}
              <option value="__custom__">
                {isVi ? "+ Nhập tên trường khác..." : "+ Write in another school..."}
              </option>
            </select>
          </div>

          {/* Active indicator summary */}
          {value && (
            <div className="flex items-center justify-between text-[11px] text-slate-600 bg-white/70 px-2 py-1 rounded-xs border border-slate-200">
              <span className="truncate">
                <b>{isVi ? "Đã chọn: " : "Selected: "}</b>
                <span className="text-[#0F2747] font-semibold">{value}</span>
              </span>
              <button
                type="button"
                onClick={() => onChange("")}
                className="text-slate-400 hover:text-red-500 font-bold ml-2 shrink-0 cursor-pointer"
                title={isVi ? "Bỏ chọn" : "Clear"}
              >
                ✕
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
