"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { VIETNAM_PROVINCES_DATA, detectSchoolInfo, getAllSchoolsFlat } from "@/data/vietnamSchools";
import { Building2, MapPin, X, Check, Search } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto detect province from value if available
  const initialDetection = useMemo(() => detectSchoolInfo(value), [value]);
  const [selectedProvinceId, setSelectedProvinceId] = useState<string>(
    initialDetection.provinceId || "hcm"
  );

  // Get active province object
  const activeProvince = useMemo(() => {
    return (
      VIETNAM_PROVINCES_DATA.find((p) => p.id === selectedProvinceId) ||
      VIETNAM_PROVINCES_DATA[0]
    );
  }, [selectedProvinceId]);

  // All schools nationwide flat list for universal search
  const allSchoolsFlat = useMemo(() => getAllSchoolsFlat(), []);

  // Filtered list based on province and search term
  const filteredSchools = useMemo(() => {
    const q = (value || "").trim().toLowerCase();

    // If search term is typed, search across the active province first, then nationwide
    if (q) {
      // 1. Province matches
      const provinceMatches = [
        ...(activeProvince.highSchools || []).map((h) => ({
          name: h,
          province: activeProvince.name,
          level: "THPT" as const,
        })),
        ...(activeProvince.universities || []).map((u) => ({
          name: u,
          province: activeProvince.name,
          level: "ĐH" as const,
        })),
      ].filter((s) => s.name.toLowerCase().includes(q));

      // 2. Other nationwide matches
      const nationwideMatches = allSchoolsFlat
        .filter(
          (s) =>
            s.provinceId !== selectedProvinceId &&
            (s.name.toLowerCase().includes(q) || s.provinceName.toLowerCase().includes(q))
        )
        .map((s) => ({
          name: s.name,
          province: s.provinceName,
          level: (s.level === "university" ? "ĐH" : "THPT") as "THPT" | "ĐH",
        }));

      return [...provinceMatches, ...nationwideMatches].slice(0, 35);
    }

    // Default: show schools of selected province
    const list: { name: string; province: string; level: "THPT" | "ĐH" }[] = [];
    (activeProvince.highSchools || []).forEach((h) => {
      list.push({ name: h, province: activeProvince.name, level: "THPT" });
    });
    (activeProvince.universities || []).forEach((u) => {
      list.push({ name: u, province: activeProvince.name, level: "ĐH" });
    });
    return list;
  }, [value, activeProvince, allSchoolsFlat, selectedProvinceId]);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (schoolName: string) => {
    onChange(schoolName);
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange("");
    setIsOpen(true);
  };

  return (
    <div ref={containerRef} className={`relative space-y-1 ${className}`}>
      {label && (
        <label className="block text-[11px] font-bold text-[#0F2747] uppercase tracking-wider">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* 1-ROW COMPACT COMBO: Province Selector (35%) + School Autocomplete (65%) */}
      <div className="grid grid-cols-12 gap-1.5 items-center">
        {/* Province / City Selector */}
        <div className="col-span-5 sm:col-span-4 relative">
          <select
            value={selectedProvinceId}
            onChange={(e) => {
              setSelectedProvinceId(e.target.value);
              setIsOpen(true);
            }}
            title={isVi ? "Chọn Tỉnh / Thành phố" : "Select Province / City"}
            className="w-full px-2 py-1.5 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none text-xs font-bold text-[#0F2747] bg-white transition cursor-pointer truncate"
          >
            {VIETNAM_PROVINCES_DATA.map((prov) => (
              <option key={prov.id} value={prov.id}>
                {prov.name}
              </option>
            ))}
          </select>
        </div>

        {/* School Input Field */}
        <div className="col-span-7 sm:col-span-8 relative">
          <Building2 className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#4F7ECB] pointer-events-none" />
          <input
            type="text"
            required={required}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              if (!isOpen) setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder={
              placeholder ||
              (isVi
                ? `Gõ tìm trường ở ${activeProvince.name}...`
                : `Search schools in ${activeProvince.name}...`)
            }
            className="w-full pl-8 pr-7 py-1.5 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none text-xs font-semibold text-[#0F2747] placeholder:text-slate-400 bg-white transition"
            autoComplete="off"
          />

          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer"
              aria-label="Xóa"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Floating Suggestion Popover (Absolute, doesn't push form down) */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 max-h-52 overflow-y-auto bg-white rounded-sm border-2 border-[#0F2747] shadow-xl z-50 divide-y divide-slate-100 animate-fadeIn">
          {/* Header pill indicator */}
          <div className="px-3 py-1.5 bg-[#FAF7EE] flex items-center justify-between text-[10px] font-bold text-[#0F2747] sticky top-0 border-b border-slate-200 z-10">
            <span>
              {isVi
                ? `Danh sách trường tại ${activeProvince.name} (hoặc toàn quốc):`
                : `Schools in ${activeProvince.name} (or nationwide):`}
            </span>
            <span className="font-mono text-slate-500">
              {filteredSchools.length} {isVi ? "trường" : "items"}
            </span>
          </div>

          {filteredSchools.length > 0 ? (
            filteredSchools.map((item, idx) => {
              const isSelected = item.name.toLowerCase() === (value || "").trim().toLowerCase();
              return (
                <button
                  key={`${item.name}-${idx}`}
                  type="button"
                  onClick={() => handleSelect(item.name)}
                  className={`w-full text-left px-3 py-1.5 text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                    isSelected
                      ? "bg-[#FAF7EE] text-[#0F2747] font-bold"
                      : "hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-1.5 truncate pr-2">
                    <span className="text-[10px] font-mono px-1 py-0.2 rounded-xs bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
                      {item.level}
                    </span>
                    <span className="truncate">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] font-mono text-slate-400">
                      {item.province}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                  </div>
                </button>
              );
            })
          ) : (
            <div className="p-3 text-center text-xs text-slate-500">
              {isVi
                ? `Không thấy trường "${value}" trong danh mục. Bạn vẫn có thể dùng tên trường tự do này!`
                : `"${value}" not in catalog. You can still proceed with this custom school name!`}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
