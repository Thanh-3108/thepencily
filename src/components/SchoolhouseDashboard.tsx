"use client";

import React, { useState, useMemo, useEffect } from "react";
import { usePencily } from "@/context/PencilyContext";
import {
  Calendar as CalendarIcon,
  Clock,
  Trophy,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Volume2,
  X,
  Plus,
  Check,
  CalendarDays,
  List,
  LayoutGrid,
  Users,
  Compass,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface SchoolhouseDashboardProps {
  onOpenApplyTutor?: () => void;
  onNavigateClasses?: () => void;
  onOpenCreateClass?: () => void;
}

export interface CalendarEventItem {
  id: string;
  title: string;
  category: "toan" | "tin" | "ielts" | "ly" | "sat" | "khac";
  categoryLabel: string;
  dayOfWeek: number; // 0 = Mon, 1 = Tue, 2 = Wed, 3 = Thu, 4 = Fri, 5 = Sat, 6 = Sun
  startHour: number; // e.g. 19.5 for 19:30
  durationHours: number; // e.g. 1.5 for 90m
  timeSlot: string; // e.g. "19:30 – 21:00"
  tutorName: string;
  tutorSchool?: string;
  tutorRole?: string;
  discordRoom?: string;
  meetUrl: string;
  maxSeats: number;
  enrolledCount: number;
  description: string;
  isRegistered?: boolean;
}

// Color styling by subject category (Google Calendar style cards with left border accent)
const CATEGORY_STYLES: Record<
  string,
  {
    border: string;
    bg: string;
    text: string;
    badgeBg: string;
    badgeText: string;
  }
> = {
  toan: {
    border: "border-l-[#D97706] border-slate-200",
    bg: "bg-[#FFFBEB] hover:bg-[#FEF3C7]",
    text: "text-[#92400E]",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-800",
  },
  ielts: {
    border: "border-l-[#2563EB] border-slate-200",
    bg: "bg-[#EFF6FF] hover:bg-[#DBEAFE]",
    text: "text-[#1E40AF]",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-800",
  },
  ly: {
    border: "border-l-[#7C3AED] border-slate-200",
    bg: "bg-[#F5F3FF] hover:bg-[#EDE9FE]",
    text: "text-[#5B21B6]",
    badgeBg: "bg-purple-100",
    badgeText: "text-purple-800",
  },
  tin: {
    border: "border-l-[#059669] border-slate-200",
    bg: "bg-[#ECFDF5] hover:bg-[#D1FAE5]",
    text: "text-[#065F46]",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-800",
  },
  sat: {
    border: "border-l-[#4F46E5] border-slate-200",
    bg: "bg-[#EEF2FF] hover:bg-[#E0E7FF]",
    text: "text-[#3730A3]",
    badgeBg: "bg-indigo-100",
    badgeText: "text-indigo-800",
  },
  khac: {
    border: "border-l-[#0F2747] border-slate-200",
    bg: "bg-[#F8FAFC] hover:bg-[#F1F5F9]",
    text: "text-[#0F2747]",
    badgeBg: "bg-slate-200",
    badgeText: "text-slate-800",
  },
};

// Hourly grid slots from 07:00 to 22:00 for the time grid view
const GRID_HOURS = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
const ROW_HEIGHT_PX = 46;

export function SchoolhouseDashboard({
  onNavigateClasses,
  onOpenCreateClass,
}: SchoolhouseDashboardProps) {
  const {
    user,
    classes,
    registeredClassIds,
    registerClass,
    cancelClassRegistration,
    language,
  } = usePencily();

  // Navigation & View States
  const [weekOffset, setWeekOffset] = useState(0);
  // Default to 'stack' (7-day columns stack) to perfectly fit on screen without page scroll
  const [selectedView, setSelectedView] = useState<"stack" | "grid" | "agenda">("stack");
  const [filterMode, setFilterMode] = useState<"all" | "enrolled">("all");
  const [activeModalEvent, setActiveModalEvent] = useState<CalendarEventItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Helper to get Monday of a week with offset
  const getMonday = (offsetWeeks: number) => {
    const d = new Date();
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday is start of week
    const monday = new Date(d.setDate(diff));
    monday.setHours(0, 0, 0, 0);
    monday.setDate(monday.getDate() + offsetWeeks * 7);
    return monday;
  };

  // Calculate the 7 days of the currently selected week
  const weekDays = useMemo(() => {
    const monday = getMonday(weekOffset);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const viDayNames = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"];
    const enDayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const viFullDayNames = [
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
      "Chủ Nhật",
    ];
    const enFullDayNames = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const isToday = d.getTime() === today.getTime();
      return {
        index: i,
        date: d,
        dayNumber: d.getDate(),
        monthNumber: d.getMonth() + 1,
        year: d.getFullYear(),
        shortName: language === "vi" ? viDayNames[i] : enDayNames[i],
        fullName: language === "vi" ? viFullDayNames[i] : enFullDayNames[i],
        isToday,
      };
    });
  }, [weekOffset, language]);

  // Current live time for red indicator line in Google Calendar grid
  const [currentLiveTime, setCurrentLiveTime] = useState(() => {
    const now = new Date();
    return now.getHours() + now.getMinutes() / 60;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentLiveTime(now.getHours() + now.getMinutes() / 60);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // ONLY real dynamic classes from PencilyContext. ZERO fake / seed data.
  const allCalendarEvents: CalendarEventItem[] = useMemo(() => {
    return classes.map((c) => {
      const isRegistered = registeredClassIds.includes(c.id);
      let dayIndex = 0;
      let startH = 19.0;
      let durationH = 1.5;
      let timeSlot = c.timeSlot || "19:00 – 20:30";

      // Parse schedule string or date
      if (c.schedule) {
        const parsedDate = new Date(c.schedule);
        if (!isNaN(parsedDate.getTime())) {
          dayIndex = (parsedDate.getDay() + 6) % 7; // Monday = 0
          startH = parsedDate.getHours() + parsedDate.getMinutes() / 60;
        } else if (c.schedule.includes("19:30")) {
          startH = 19.5;
        } else if (c.schedule.includes("20:00")) {
          startH = 20.0;
        } else if (c.schedule.includes("09:00") || c.schedule.includes("9:00")) {
          startH = 9.0;
        }
      }

      // Check dayLabel fallback
      if (c.dayLabel) {
        const dl = c.dayLabel.toLowerCase();
        if (dl.includes("2") || dl.includes("hai") || dl.includes("mon")) dayIndex = 0;
        else if (dl.includes("3") || dl.includes("ba") || dl.includes("tue")) dayIndex = 1;
        else if (dl.includes("4") || dl.includes("tư") || dl.includes("wed")) dayIndex = 2;
        else if (dl.includes("5") || dl.includes("năm") || dl.includes("thu")) dayIndex = 3;
        else if (dl.includes("6") || dl.includes("sáu") || dl.includes("fri")) dayIndex = 4;
        else if (dl.includes("7") || dl.includes("bảy") || dl.includes("sat")) dayIndex = 5;
        else if (dl.includes("nhật") || dl.includes("cn") || dl.includes("sun")) dayIndex = 6;
      }

      return {
        id: c.id,
        title: c.title,
        category: c.category || "khac",
        categoryLabel: c.categoryLabel || "Chuyên đề",
        dayOfWeek: dayIndex,
        startHour: startH,
        durationHours: durationH,
        timeSlot,
        tutorName: c.tutorName || "Peer Tutor",
        tutorSchool: c.tutorSchool || "The Pencily",
        tutorRole: c.tutorRole || "Host phòng học",
        discordRoom: c.discordRoom || "#voice-phong-hoc",
        meetUrl: c.meetUrl || `/room/${c.id}`,
        maxSeats: c.maxSeats || 8,
        enrolledCount: c.enrolledCount || 1,
        description: c.description || "Phòng học trực tiếp trên The Pencily.",
        isRegistered,
      };
    });
  }, [classes, registeredClassIds]);

  // Filter events based on user selection (All vs Only Enrolled)
  const filteredEvents = useMemo(() => {
    if (filterMode === "enrolled") {
      return allCalendarEvents.filter((e) => e.isRegistered);
    }
    return allCalendarEvents;
  }, [allCalendarEvents, filterMode]);

  // Total enrolled sessions count
  const enrolledSessionsCount = useMemo(() => {
    return allCalendarEvents.filter((e) => e.isRegistered).length;
  }, [allCalendarEvents]);

  // Format week range label (e.g. "19 Th10 – 25 Th10, 2026")
  const weekRangeLabel = useMemo(() => {
    const firstDay = weekDays[0];
    const lastDay = weekDays[6];
    if (language === "vi") {
      return `${firstDay.dayNumber} Th${firstDay.monthNumber} – ${lastDay.dayNumber} Th${lastDay.monthNumber}, ${lastDay.year}`;
    }
    const monthNamesEn = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${monthNamesEn[firstDay.monthNumber - 1]} ${firstDay.dayNumber} – ${monthNamesEn[lastDay.monthNumber - 1]} ${lastDay.dayNumber}, ${lastDay.year}`;
  }, [weekDays, language]);

  // Handle registration toggle
  const handleToggleRegistration = async (event: CalendarEventItem) => {
    const currentlyRegistered = event.isRegistered;
    if (currentlyRegistered) {
      await cancelClassRegistration(event.id);
      setToastMessage(
        language === "vi"
          ? `Đã hủy giữ chỗ buổi học: "${event.title}"`
          : `Cancelled booking for: "${event.title}"`
      );
    } else {
      await registerClass(event.id);
      setToastMessage(
        language === "vi"
          ? `🎉 Đã giữ chỗ thành công (+10 PP)! Buổi học đã được lưu vào Lịch của bạn.`
          : `🎉 Successfully booked (+10 PP)! Added to your study calendar.`
      );
    }

    if (activeModalEvent && activeModalEvent.id === event.id) {
      setActiveModalEvent({
        ...activeModalEvent,
        isRegistered: !currentlyRegistered,
      });
    }

    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  return (
    <div className="w-full flex flex-col space-y-3">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F2747] text-white px-4 py-2.5 rounded-sm border-2 border-amber-400 shadow-xl flex items-center gap-3 animate-fadeIn text-xs font-semibold max-w-md">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-auto text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 1. COMPACT CALENDAR HEADER & METRICS BAR (Unboxed, strictly NO nốt ruồi) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b-2 border-slate-300 shrink-0">
        <div>
          <h2 className="font-poppins font-black text-xl sm:text-2xl text-[#0F2747] tracking-tight">
            {language === "vi" ? "Lịch Học & Buổi Thảo Luận" : "Study Schedule & Sessions"}
          </h2>
          <p className="text-xs text-[#475569] font-medium mt-0.5">
            {language === "vi"
              ? "Thời khóa biểu tuần các lớp học kèm trực tuyến và phòng tự học"
              : "Weekly timetable for peer study pods and online live rooms"}
          </p>
        </div>

        {/* Live Synced Stat Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-white border-2 border-slate-300 shadow-2xs text-xs font-bold text-[#0F2747]">
            <Trophy className="w-3.5 h-3.5 text-[#EAB308]" />
            <span>{user.points} PP</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-white border-2 border-slate-300 shadow-2xs text-xs font-bold text-[#0F2747]">
            <Clock className="w-3.5 h-3.5 text-[#4F7ECB]" />
            <span>
              {user.learningMinutes} {language === "vi" ? "phút học" : "mins"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#22C55E]/15 border-2 border-emerald-400 text-xs font-bold text-[#16A34A]">
            <CalendarIcon className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>
              {enrolledSessionsCount}{" "}
              {language === "vi" ? "buổi đã giữ chỗ" : "booked"}
            </span>
          </div>
        </div>
      </div>

      {/* 2. COMPACT TOOLBAR (Navigation, Filters, View Modes) */}
      <div className="bg-white rounded-md border-2 border-slate-300 p-2 sm:p-2.5 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 shrink-0">
        {/* Left: Navigation Buttons & Date Range Display */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Today Button */}
          <button
            onClick={() => setWeekOffset(0)}
            className="px-3 py-1 rounded-sm bg-white hover:bg-slate-100 text-[#0F2747] border-2 border-slate-300 text-xs font-bold transition shadow-2xs cursor-pointer active:scale-95"
          >
            {language === "vi" ? "Hôm nay" : "Today"}
          </button>

          {/* Prev / Next Buttons */}
          <div className="flex items-center rounded-sm border-2 border-slate-300 bg-white shadow-2xs overflow-hidden">
            <button
              onClick={() => setWeekOffset((prev) => prev - 1)}
              className="p-1 text-slate-700 hover:bg-slate-100 hover:text-[#0F2747] transition cursor-pointer"
              title={language === "vi" ? "Tuần trước" : "Previous week"}
              aria-label="Previous week"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="w-[1px] h-3.5 bg-slate-200" />
            <button
              onClick={() => setWeekOffset((prev) => prev + 1)}
              className="p-1 text-slate-700 hover:bg-slate-100 hover:text-[#0F2747] transition cursor-pointer"
              title={language === "vi" ? "Tuần sau" : "Next week"}
              aria-label="Next week"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Week Range Display */}
          <div className="font-poppins font-bold text-xs sm:text-sm text-[#0F2747] tracking-tight ml-1">
            {weekRangeLabel}
          </div>
        </div>

        {/* Center: Filter Mode */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-sm border-2 border-slate-300 shrink-0 self-start md:self-auto">
          <button
            onClick={() => setFilterMode("all")}
            className={`px-2.5 py-1 text-xs font-bold rounded-xs transition cursor-pointer ${
              filterMode === "all"
                ? "bg-[#0F2747] text-white shadow-xs"
                : "text-slate-600 hover:text-[#0F2747]"
            }`}
          >
            {language === "vi" ? "Tất cả lịch tuần" : "All Week"} ({allCalendarEvents.length})
          </button>
          <button
            onClick={() => setFilterMode("enrolled")}
            className={`px-2.5 py-1 text-xs font-bold rounded-xs transition cursor-pointer flex items-center gap-1 ${
              filterMode === "enrolled"
                ? "bg-[#0F2747] text-white shadow-xs"
                : "text-slate-600 hover:text-[#0F2747]"
            }`}
          >
            <Check className="w-3 h-3 text-emerald-400" />
            <span>
              {language === "vi" ? "Lớp của tôi" : "My Enrolled"} ({enrolledSessionsCount})
            </span>
          </button>
        </div>

        {/* Right: View Switcher (Stack 7 ngày / Lưới giờ / Danh sách) & Actions */}
        <div className="flex items-center gap-2 justify-between md:justify-end flex-wrap">
          <div className="flex items-center bg-slate-100 p-0.5 rounded-sm border-2 border-slate-300">
            <button
              onClick={() => setSelectedView("stack")}
              className={`px-2 py-1 text-xs font-bold rounded-xs transition cursor-pointer flex items-center gap-1 ${
                selectedView === "stack"
                  ? "bg-white text-[#0F2747] shadow-xs border border-slate-300"
                  : "text-slate-600 hover:text-[#0F2747]"
              }`}
              title={language === "vi" ? "Xếp cột 7 ngày" : "7-Day Stack View"}
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {language === "vi" ? "Cột 7 ngày" : "7-Day Stack"}
              </span>
            </button>
            <button
              onClick={() => setSelectedView("grid")}
              className={`px-2 py-1 text-xs font-bold rounded-xs transition cursor-pointer flex items-center gap-1 ${
                selectedView === "grid"
                  ? "bg-white text-[#0F2747] shadow-xs border border-slate-300"
                  : "text-slate-600 hover:text-[#0F2747]"
              }`}
              title={language === "vi" ? "Xem lưới giờ Google Calendar" : "Time Grid View"}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {language === "vi" ? "Lưới giờ" : "Time Grid"}
              </span>
            </button>
            <button
              onClick={() => setSelectedView("agenda")}
              className={`px-2 py-1 text-xs font-bold rounded-xs transition cursor-pointer flex items-center gap-1 ${
                selectedView === "agenda"
                  ? "bg-white text-[#0F2747] shadow-xs border border-slate-300"
                  : "text-slate-600 hover:text-[#0F2747]"
              }`}
              title={language === "vi" ? "Xem danh sách" : "Agenda View"}
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {language === "vi" ? "Danh sách" : "Agenda"}
              </span>
            </button>
          </div>

          {/* Quick Action Button */}
          {onOpenCreateClass ? (
            <button
              onClick={onOpenCreateClass}
              className="px-3 py-1 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] border-2 border-slate-300 text-xs font-bold shadow-2xs transition active:scale-95 flex items-center gap-1 cursor-pointer shrink-0"
            >
              <Plus className="w-3.5 h-3.5 text-[#4F7ECB]" />
              <span>{language === "vi" ? "Mở phòng học" : "Create Room"}</span>
            </button>
          ) : onNavigateClasses ? (
            <button
              onClick={onNavigateClasses}
              className="px-3 py-1 rounded-sm bg-[#FFC83D] hover:bg-[#EAB308] text-[#0F2747] border-2 border-amber-500 text-xs font-bold shadow-2xs transition active:scale-95 flex items-center gap-1 cursor-pointer shrink-0"
            >
              <Compass className="w-3.5 h-3.5 text-[#0F2747]" />
              <span>{language === "vi" ? "Tìm lớp" : "Browse"}</span>
            </button>
          ) : null}
        </div>
      </div>

      {/* 3. MAIN SCHEDULE CONTAINER (Stacked & fitted to avoid outer page scrolling) */}
      <div className="h-[calc(100vh-215px)] min-h-[350px] max-h-[520px] flex flex-col border-2 border-slate-300 rounded-md bg-white shadow-2xs overflow-hidden">
        {/* VIEW 1: 7-DAY COLUMNS STACK (Default - 100% fits within screen without page scrolling) */}
        {selectedView === "stack" && (
          <div className="flex-1 flex flex-col min-h-0 overflow-x-auto">
            {/* 7 Columns Container */}
            <div className="flex-1 grid grid-cols-7 min-w-[700px] divide-x-2 divide-slate-200">
              {weekDays.map((d) => {
                const dayEvents = filteredEvents.filter((e) => e.dayOfWeek === d.index);

                return (
                  <div
                    key={d.index}
                    className={`flex flex-col h-full overflow-hidden ${
                      d.isToday ? "bg-amber-50/20" : "bg-white"
                    }`}
                  >
                    {/* Day Column Header */}
                    <div
                      className={`p-2 text-center border-b-2 border-slate-200 transition select-none ${
                        d.isToday ? "bg-amber-100/60" : "bg-slate-50"
                      }`}
                    >
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        {d.shortName}
                      </div>
                      <div className="mt-0.5 flex items-center justify-center">
                        <span
                          className={`text-xs sm:text-sm font-black px-1.5 py-0.5 rounded-xs transition ${
                            d.isToday
                              ? "bg-[#0F2747] text-white shadow-2xs"
                              : "text-[#0F2747]"
                          }`}
                        >
                          {d.dayNumber}
                        </span>
                      </div>
                    </div>

                    {/* Day Column Stack Body */}
                    <div className="flex-1 p-2 space-y-2 overflow-y-auto bg-slate-50/30">
                      {dayEvents.length > 0 ? (
                        dayEvents.map((event) => {
                          const style = CATEGORY_STYLES[event.category] || CATEGORY_STYLES.khac;
                          return (
                            <div
                              key={event.id}
                              onClick={() => setActiveModalEvent(event)}
                              className={`p-2 rounded-xs border-2 ${style.border} ${style.bg} transition-all duration-150 cursor-pointer shadow-2xs hover:shadow-xs flex flex-col justify-between gap-1`}
                            >
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-mono text-[10px] font-black text-slate-600 leading-none">
                                  {event.timeSlot}
                                </span>
                                {event.isRegistered ? (
                                  <span className="px-1 py-0.5 rounded-xs bg-[#22C55E]/20 text-[#16A34A] text-[9px] font-black border border-emerald-400">
                                    ✓
                                  </span>
                                ) : (
                                  <span
                                    className={`px-1 py-0.5 rounded-xs ${style.badgeBg} ${style.badgeText} text-[9px] font-bold`}
                                  >
                                    {event.categoryLabel}
                                  </span>
                                )}
                              </div>

                              <h4 className="font-poppins font-bold text-xs text-[#0F2747] leading-snug line-clamp-2">
                                {event.title}
                              </h4>

                              <div className="pt-1 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-600">
                                <span className="truncate">{event.tutorName}</span>
                                <Volume2 className="w-3 h-3 text-[#5865F2] shrink-0" />
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div
                          onClick={() => {
                            if (onOpenCreateClass) onOpenCreateClass();
                            else if (onNavigateClasses) onNavigateClasses();
                          }}
                          className="h-full min-h-[100px] border-2 border-dashed border-slate-200 hover:border-slate-400 hover:bg-slate-100/60 rounded-xs flex flex-col items-center justify-center p-2 text-center transition cursor-pointer text-slate-400 hover:text-slate-600 select-none group"
                        >
                          <Plus className="w-4 h-4 mb-1 group-hover:scale-110 transition text-slate-400 group-hover:text-[#4F7ECB]" />
                          <span className="text-[10px] font-semibold">
                            {language === "vi" ? "Trống" : "Free"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 2: GOOGLE CALENDAR TIME GRID (Internal scroll inside container, outer page never scrolls) */}
        {selectedView === "grid" && (
          <div className="flex-1 flex flex-col min-h-0 overflow-x-auto select-none">
            <div className="min-w-[700px] flex-1 flex flex-col">
              {/* Sticky 7-Day Header */}
              <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b-2 border-slate-300 bg-slate-50 shrink-0">
                <div className="p-2 text-[10px] font-bold text-slate-400 border-r-2 border-slate-300 flex items-center justify-center font-mono">
                  GMT+7
                </div>
                {weekDays.map((d) => (
                  <div
                    key={d.index}
                    className={`p-2 text-center border-r-2 border-slate-200 last:border-r-0 ${
                      d.isToday ? "bg-amber-50/60" : ""
                    }`}
                  >
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {d.shortName}
                    </div>
                    <div className="mt-0.5 flex items-center justify-center">
                      <span
                        className={`text-xs font-black px-1.5 py-0.5 rounded-xs ${
                          d.isToday ? "bg-[#0F2747] text-white shadow-2xs" : "text-[#0F2747]"
                        }`}
                      >
                        {d.dayNumber}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Scrollable Hourly Body */}
              <div className="flex-1 overflow-y-auto relative min-h-0">
                <div
                  className="relative grid grid-cols-[60px_repeat(7,1fr)]"
                  style={{ height: `${GRID_HOURS.length * ROW_HEIGHT_PX}px` }}
                >
                  {/* Grid Lines */}
                  <div className="absolute inset-0 pointer-events-none">
                    {GRID_HOURS.map((hour, idx) => (
                      <div
                        key={hour}
                        className="w-full border-t border-slate-200"
                        style={{
                          top: `${idx * ROW_HEIGHT_PX}px`,
                          height: `${ROW_HEIGHT_PX}px`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Left Gutter */}
                  <div className="border-r-2 border-slate-300 bg-white relative z-10 select-none">
                    {GRID_HOURS.map((hour, idx) => (
                      <div
                        key={hour}
                        className="absolute right-2 text-[10px] font-mono font-bold text-slate-400 transform -translate-y-2"
                        style={{ top: `${idx * ROW_HEIGHT_PX}px` }}
                      >
                        {hour.toString().padStart(2, "0")}:00
                      </div>
                    ))}
                  </div>

                  {/* 7 Columns with Events */}
                  {weekDays.map((d) => {
                    const dayEvents = filteredEvents.filter((e) => e.dayOfWeek === d.index);
                    const isCurrentDay = d.isToday && weekOffset === 0;

                    return (
                      <div
                        key={d.index}
                        className={`relative border-r-2 border-slate-200 last:border-r-0 ${
                          d.isToday ? "bg-amber-50/20" : ""
                        }`}
                      >
                        {/* Live Time Red Marker */}
                        {isCurrentDay &&
                          currentLiveTime >= 7 &&
                          currentLiveTime <= 23 && (
                            <div
                              className="absolute left-0 right-0 z-20 pointer-events-none flex items-center"
                              style={{
                                top: `${(currentLiveTime - 7) * ROW_HEIGHT_PX}px`,
                              }}
                            >
                              <div className="w-1.5 h-1.5 bg-red-600 rounded-xs -ml-1 shadow-2xs" />
                              <div className="h-[2px] bg-red-500 w-full" />
                            </div>
                          )}

                        {/* Events */}
                        {dayEvents.map((event) => {
                          const topPx = (event.startHour - 7) * ROW_HEIGHT_PX;
                          const heightPx = event.durationHours * ROW_HEIGHT_PX - 4;
                          const style = CATEGORY_STYLES[event.category] || CATEGORY_STYLES.khac;

                          return (
                            <div
                              key={event.id}
                              onClick={() => setActiveModalEvent(event)}
                              style={{
                                top: `${Math.max(topPx, 0)}px`,
                                height: `${Math.max(heightPx, 38)}px`,
                              }}
                              className={`absolute left-1 right-1 p-1.5 rounded-xs border-2 ${style.border} ${style.bg} transition cursor-pointer shadow-2xs hover:shadow-xs z-10 flex flex-col justify-between overflow-hidden`}
                            >
                              <div>
                                <span className="font-mono text-[9px] font-black text-slate-600 leading-none">
                                  {event.timeSlot}
                                </span>
                                <h4 className="font-poppins font-bold text-xs text-[#0F2747] leading-tight truncate">
                                  {event.title}
                                </h4>
                              </div>
                              <span className="text-[9px] text-slate-500 truncate">
                                {event.tutorName}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: AGENDA / LIST VIEW */}
        {selectedView === "agenda" && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {filteredEvents.length > 0 ? (
              weekDays.map((d) => {
                const dayEvents = filteredEvents.filter((e) => e.dayOfWeek === d.index);
                if (dayEvents.length === 0) return null;

                return (
                  <div key={d.index} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-black px-2 py-0.5 rounded-sm ${
                          d.isToday ? "bg-[#0F2747] text-white" : "bg-slate-200 text-slate-800"
                        }`}
                      >
                        {d.fullName} ({d.dayNumber}/{d.monthNumber})
                      </span>
                      <div className="flex-1 h-[1px] bg-slate-200" />
                    </div>

                    <div className="space-y-2 pl-3">
                      {dayEvents.map((event) => {
                        const style = CATEGORY_STYLES[event.category] || CATEGORY_STYLES.khac;
                        return (
                          <div
                            key={event.id}
                            onClick={() => setActiveModalEvent(event)}
                            className={`p-3 rounded-sm border-2 ${style.border} ${style.bg} hover:shadow-xs transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2`}
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold text-slate-700 bg-white px-2 py-0.5 rounded-xs border border-slate-300">
                                  {event.timeSlot}
                                </span>
                                <span
                                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-xs ${style.badgeBg} ${style.badgeText}`}
                                >
                                  {event.categoryLabel}
                                </span>
                                {event.isRegistered && (
                                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-xs bg-[#22C55E]/20 text-[#16A34A] border border-emerald-400">
                                    {language === "vi" ? "Đã giữ chỗ" : "Enrolled"}
                                  </span>
                                )}
                              </div>
                              <h4 className="font-poppins font-bold text-sm text-[#0F2747]">
                                {event.title}
                              </h4>
                              <p className="text-xs text-slate-600">
                                {event.tutorName} • {event.discordRoom}
                              </p>
                            </div>

                            <span className="text-xs font-bold text-[#4F7ECB] flex items-center gap-1">
                              <span>{language === "vi" ? "Chi tiết" : "Details"}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-10 space-y-2">
                <CalendarDays className="w-8 h-8 text-slate-400 mx-auto" />
                <div className="font-bold text-sm text-[#0F2747]">
                  {language === "vi"
                    ? "Chưa có buổi học nào được lên lịch trong tuần này"
                    : "No scheduled sessions for this week yet"}
                </div>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {language === "vi"
                    ? "Hãy đăng ký các lớp học nhóm hoặc tự mở phòng học trực tuyến để thảo luận cùng bạn bè."
                    : "Enroll in live study pods or create a new room to collaborate with peers."}
                </p>
              </div>
            )}
          </div>
        )}

        {/* 4. COMPACT FOOTER STRIP WHEN 0 ENROLLED CLASSES */}
        {enrolledSessionsCount === 0 && (
          <div className="p-2 sm:p-2.5 bg-[#FAF7EE] border-t-2 border-slate-300 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2 text-xs text-[#0F2747]">
              <Sparkles className="w-4 h-4 text-[#EAB308] shrink-0" />
              <span className="font-medium">
                {language === "vi"
                  ? "Bạn chưa giữ chỗ buổi học nào trong tuần này."
                  : "You haven't booked any sessions for this week yet."}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {onNavigateClasses && (
                <button
                  onClick={onNavigateClasses}
                  className="px-3 py-1 rounded-sm bg-[#FFC83D] hover:bg-[#EAB308] text-[#0F2747] text-xs font-bold border-2 border-amber-500 shadow-2xs transition active:scale-95 cursor-pointer flex items-center gap-1"
                >
                  <Compass className="w-3.5 h-3.5 text-[#0F2747]" />
                  <span>
                    {language === "vi" ? "Khám phá danh mục lớp (+10 PP)" : "Explore Classes (+10 PP)"}
                  </span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 5. EVENT DETAIL MODAL (Google Calendar Style Detail Card) */}
      {activeModalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0F2747]/70 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white border-2 border-[#0F2747] rounded-md shadow-2xl p-5 sm:p-6 max-h-[90vh] overflow-y-auto space-y-4">
            {/* Top Close Button */}
            <button
              onClick={() => setActiveModalEvent(null)}
              className="absolute top-4 right-4 p-1.5 rounded-sm border-2 border-transparent hover:border-slate-300 text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-xs bg-slate-100 border border-slate-300 text-slate-800">
                  {activeModalEvent.categoryLabel}
                </span>
                {activeModalEvent.isRegistered ? (
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-xs bg-[#22C55E]/20 text-[#16A34A] border border-emerald-400 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>{language === "vi" ? "Bạn đã đăng ký" : "Enrolled"}</span>
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-xs bg-amber-50 text-amber-800 border border-amber-300">
                    {language === "vi" ? "Đang mở giữ chỗ" : "Open for booking"}
                  </span>
                )}
              </div>

              <h3 className="font-poppins font-black text-lg sm:text-xl text-[#0F2747] leading-snug">
                {activeModalEvent.title}
              </h3>
            </div>

            {/* Time & Room details */}
            <div className="space-y-2 bg-slate-50 p-3 rounded-sm border-2 border-slate-200 text-xs">
              <div className="flex items-center gap-2 text-[#0F2747] font-semibold">
                <Clock className="w-4 h-4 text-[#4F7ECB] shrink-0" />
                <span>
                  {weekDays[activeModalEvent.dayOfWeek]?.fullName},{" "}
                  {weekDays[activeModalEvent.dayOfWeek]?.dayNumber} Tháng{" "}
                  {weekDays[activeModalEvent.dayOfWeek]?.monthNumber} •{" "}
                  <strong className="font-mono text-[#0F2747]">
                    {activeModalEvent.timeSlot}
                  </strong>
                </span>
              </div>

              <div className="flex items-center gap-2 text-slate-700">
                <Volume2 className="w-4 h-4 text-[#5865F2] shrink-0" />
                <span>
                  Discord Voice:{" "}
                  <strong className="text-[#5865F2]">
                    {activeModalEvent.discordRoom}
                  </strong>
                </span>
              </div>

              <div className="flex items-center gap-2 text-slate-700">
                <Users className="w-4 h-4 text-[#EAB308] shrink-0" />
                <span>
                  {language === "vi" ? "Tutor hướng dẫn: " : "Peer Tutor: "}
                  <strong className="text-[#0F2747]">
                    {activeModalEvent.tutorName}
                  </strong>{" "}
                  ({activeModalEvent.tutorSchool})
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                {language === "vi" ? "Nội dung buổi học" : "Session Outline"}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed bg-[#FAF7EE] p-2.5 rounded-sm border border-slate-300">
                {activeModalEvent.description || (language === "vi" ? "Phòng học trực tiếp trên The Pencily." : "Live peer study pod on The Pencily.")}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t-2 border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <button
                onClick={() => handleToggleRegistration(activeModalEvent)}
                className={`px-4 py-2 rounded-sm text-xs font-bold transition border-2 cursor-pointer active:scale-95 text-center ${
                  activeModalEvent.isRegistered
                    ? "bg-white hover:bg-red-50 text-red-600 border-red-300"
                    : "bg-[#FFC83D] hover:bg-[#EAB308] text-[#0F2747] border-amber-500 shadow-2xs"
                }`}
              >
                {activeModalEvent.isRegistered
                  ? language === "vi"
                    ? "Hủy giữ chỗ buổi này"
                    : "Cancel Booking"
                  : language === "vi"
                  ? "Đăng ký giữ chỗ (+10 PP)"
                  : "Book Session (+10 PP)"}
              </button>

              <a
                href={activeModalEvent.meetUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-sm bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-2xs border-2 border-indigo-400 cursor-pointer active:scale-95"
              >
                <span>
                  {language === "vi" ? "Vào phòng học" : "Join Room"}
                </span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
