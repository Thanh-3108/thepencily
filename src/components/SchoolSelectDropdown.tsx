"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { VIETNAM_PROVINCES_DATA } from "@/data/vietnamSchools";
import { Building2, Search, X, Check } from "lucide-react";

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

  // Flatten all schools across provinces once
  const allSchools = useMemo(() => {
    const list: { name: string; province: string; level: "THPT" | "ĐH" }[] = [];
    VIETNAM_PROVINCES_DATA.forEach((prov) => {
      prov.highSchools?.forEach((h) => {
        list.push({ name: h, province: prov.name, level: "THPT" });
      });
      prov.universities?.forEach((u) => {
        list.push({ name: u, province: prov.name, level: "ĐH" });
      });
    });
    return list;
  }, []);

  // Filter schools based on current input
  const filteredSchools = useMemo(() => {
    const q = (value || "").trim().toLowerCase();
    if (!q) {
      // Return top 25 popular schools when empty
      return allSchools.slice(0, 25);
    }
    return allSchools
      .filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.province.toLowerCase().includes(q)
      )
      .slice(0, 30);
  }, [allSchools, value]);

  // Close dropdown when clicking outside
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
        <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#4F7ECB] pointer-events-none" />
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
              ? "Gõ tên trường (VD: THPT Gia Định, Chuyên Lê Hồng Phong...)"
              : "Type school name (e.g. High School)...")
          }
          className="w-full pl-9 pr-8 py-2 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none text-xs font-semibold text-[#0F2747] placeholder:text-slate-400 bg-white transition"
          autoComplete="off"
        />

        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer"
            aria-label="Xóa"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Floating Suggestion Popover (Absolute, doesn't push form down) */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white rounded-sm border-2 border-[#0F2747] shadow-xl z-50 divide-y divide-slate-100 animate-fadeIn">
          {filteredSchools.length > 0 ? (
            filteredSchools.map((item, idx) => {
              const isSelected = item.name.toLowerCase() === (value || "").trim().toLowerCase();
              return (
                <button
                  key={`${item.name}-${idx}`}
                  type="button"
                  onClick={() => handleSelect(item.name)}
                  className={`w-full text-left px-3 py-2 text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                    isSelected
                      ? "bg-[#FAF7EE] text-[#0F2747] font-bold"
                      : "hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span className="truncate">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] font-mono text-slate-400">
                      [{item.level}] {item.province}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                  </div>
                </button>
              );
            })
          ) : (
            <div className="p-3 text-center text-xs text-slate-500">
              {isVi
                ? "Không thấy trong danh mục mẫu. Bạn vẫn có thể tiếp tục với tên trường đã nhập này!"
                : "Not found in directory. You can keep this custom school name!"}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
