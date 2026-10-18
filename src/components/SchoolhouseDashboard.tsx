"use client";

import React, { useState, useMemo, useEffect } from "react";
import { usePencily } from "@/context/PencilyContext";
import { OwlMascot } from "@/components/Logo";
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
  BookOpen,
} from "lucide-react";

interface SchoolhouseDashboardProps {
  onOpenApplyTutor?: () => void;
  onNavigateClasses?: () => void;
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

// Built-in seed timetable representing genuine high-school & IELTS peer pods
const SEED_WEEKLY_EVENTS: Omit<CalendarEventItem, "isRegistered">[] = [
  {
    id: "seed-toan-12",
    title: "Toán 12: Chinh phục Vận dụng cao Tích phân & Hình Oxyz",
    category: "toan",
    categoryLabel: "Toán học",
    dayOfWeek: 0, // Thứ Hai
    startHour: 19.5,
    durationHours: 1.5,
    timeSlot: "19:30 – 21:00",
    tutorName: "Trần Hoàng Nam",
    tutorSchool: "THPT Chuyên KHTN, Hà Nội",
    tutorRole: "Peer Tutor Toán 12",
    discordRoom: "#voice-toan-12",
    meetUrl: "https://discord.gg/6hpEf4wC4z",
    maxSeats: 8,
    enrolledCount: 6,
    description: "Giải chi tiết 15 câu vận dụng cao đề thi thử THPT Quốc gia 2026. Thảo luận trực tiếp cách bấm máy tính Casio và tư duy bản chất hình học không gian.",
  },
  {
    id: "seed-ielts-speaking",
    title: "IELTS Speaking: Luyện Mock Test Part 2 & 3 Chủ đề Education",
    category: "ielts",
    categoryLabel: "IELTS / Tiếng Anh",
    dayOfWeek: 1, // Thứ Ba
    startHour: 20.0,
    durationHours: 1.5,
    timeSlot: "20:00 – 21:30",
    tutorName: "Lê Thảo Vy",
    tutorSchool: "IELTS 8.0, THPT Chuyên Lê Hồng Phong",
    tutorRole: "Peer Tutor IELTS",
    discordRoom: "#voice-ielts-pod",
    meetUrl: "https://discord.gg/6hpEf4wC4z",
    maxSeats: 6,
    enrolledCount: 5,
    description: "Luyện phản xạ nói theo cặp 1-1, chỉnh phát âm và từ vựng band 7.5+ trực tiếp trên Discord Voice room cùng các bạn học.",
  },
  {
    id: "seed-ly-12",
    title: "Vật Lý 12: Chinh phục Sóng cơ & Giao thoa Ánh sáng",
    category: "ly",
    categoryLabel: "Vật lý",
    dayOfWeek: 2, // Thứ Tư
    startHour: 19.0,
    durationHours: 1.5,
    timeSlot: "19:00 – 20:30",
    tutorName: "Nguyễn Đức Huy",
    tutorSchool: "Huy chương Bạc Vật Lý Quốc gia",
    tutorRole: "Peer Tutor Vật Lý",
    discordRoom: "#voice-vat-ly",
    meetUrl: "https://discord.gg/6hpEf4wC4z",
    maxSeats: 8,
    enrolledCount: 7,
    description: "Hệ thống hóa toàn bộ công thức sóng dừng, sóng âm và phân tích các dạng bài tập thực tế giao thoa ánh sáng trắng.",
  },
  {
    id: "seed-ielts-writing",
    title: "IELTS Writing Task 2: Brainstorming Ideas & Paraphrasing",
    category: "ielts",
    categoryLabel: "IELTS / Tiếng Anh",
    dayOfWeek: 3, // Thứ Năm
    startHour: 20.5,
    durationHours: 1.5,
    timeSlot: "20:30 – 22:00",
    tutorName: "Phạm Minh Quân",
    tutorSchool: "IELTS 8.5 (Writing 8.0)",
    tutorRole: "Peer Tutor IELTS Writing",
    discordRoom: "#voice-ielts-writing",
    meetUrl: "https://discord.gg/6hpEf4wC4z",
    maxSeats: 6,
    enrolledCount: 4,
    description: "Sửa bài viết trực tiếp của thành viên trong phòng, phân tích cách triển khai ý tưởng mạch lạc và cấu trúc câu ăn điểm Lexical Resource.",
  },
  {
    id: "seed-tin-hoc",
    title: "Tin học: Thuật toán Quy hoạch động & Đồ thị cơ bản",
    category: "tin",
    categoryLabel: "Tin học",
    dayOfWeek: 4, // Thứ Sáu
    startHour: 19.5,
    durationHours: 1.5,
    timeSlot: "19:30 – 21:00",
    tutorName: "Đặng Quang Minh",
    tutorSchool: "THPT Chuyên ĐH Sư Phạm",
    tutorRole: "Peer Tutor Tin học",
    discordRoom: "#voice-tin-hoc",
    meetUrl: "https://discord.gg/6hpEf4wC4z",
    maxSeats: 8,
    enrolledCount: 5,
    description: "Dành cho các bạn làm quen giải thuật và chuẩn bị cho kỳ thi HSG Tin hoặc nhập môn lập trình Python / C++. Phân tích bảng phương án và truy vết kết quả.",
  },
  {
    id: "seed-sat-math",
    title: "Digital SAT Math: Master Advanced Math & Desmos Hacks",
    category: "sat",
    categoryLabel: "Digital SAT",
    dayOfWeek: 5, // Thứ Bảy
    startHour: 9.5,
    durationHours: 1.5,
    timeSlot: "09:30 – 11:00",
    tutorName: "Vũ Hoàng Long",
    tutorSchool: "SAT 1550 (Math 800)",
    tutorRole: "Peer Mentor SAT",
    discordRoom: "#voice-sat-mastery",
    meetUrl: "https://discord.gg/6hpEf4wC4z",
    maxSeats: 8,
    enrolledCount: 6,
    description: "Chiến thuật xử lý câu hỏi Module 2 khó nhất trong bài thi Digital SAT bằng máy tính đồ thị Desmos trong chưa đầy 30 giây.",
  },
  {
    id: "seed-study-with-me",
    title: "Study Pod Đêm: Pomodoro 50/10 & Trao Đổi Bài Tập",
    category: "khac",
    categoryLabel: "Study Pod",
    dayOfWeek: 5, // Thứ Bảy
    startHour: 20.0,
    durationHours: 1.5,
    timeSlot: "20:00 – 21:30",
    tutorName: "Ban Học Thuật Pencily",
    tutorSchool: "The Pencily Community",
    tutorRole: "Host Phòng Tự Học",
    discordRoom: "#voice-phong-tu-hoc-1",
    meetUrl: "https://discord.gg/6hpEf4wC4z",
    maxSeats: 20,
    enrolledCount: 14,
    description: "Phiên học tập trung cuối tuần có nhạc lofi nhẹ nhàng, bật camera/màn hình chia sẻ tiến độ học và giải đáp nhanh mọi câu hỏi bài tập về nhà.",
  },
  {
    id: "seed-toan-tong-on",
    title: "Tổng Ôn Cuối Tuần: Chữa Đề Thi Thử Liên Trường THPTQG",
    category: "toan",
    categoryLabel: "Toán học",
    dayOfWeek: 6, // Chủ Nhật
    startHour: 15.0,
    durationHours: 2.0,
    timeSlot: "15:00 – 17:00",
    tutorName: "Trần Hoàng Nam & Đội Ngũ Peer Tutors",
    tutorSchool: "The Pencily Academic Team",
    tutorRole: "Host Buổi Livestream Giải Đề",
    discordRoom: "#voice-hoi-truong-pencily",
    meetUrl: "https://discord.gg/6hpEf4wC4z",
    maxSeats: 30,
    enrolledCount: 22,
    description: "Buổi livestream chữa đề 50 câu chọn lọc từ các trường chuyên trên cả nước, cung cấp tài liệu PDF kèm lời giải chi tiết và phân tích các bẫy phổ biến.",
  },
];

// Color styling by subject category (Google Calendar style cards with left border accent)
const CATEGORY_STYLES: Record<
  string,
  {
    border: string;
    bg: string;
    text: string;
    badgeBg: string;
    badgeText: string;
    dotColor: string;
  }
> = {
  toan: {
    border: "border-l-[#D97706] border-slate-200",
    bg: "bg-[#FFFBEB] hover:bg-[#FEF3C7]",
    text: "text-[#92400E]",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-800",
    dotColor: "bg-amber-500",
  },
  ielts: {
    border: "border-l-[#2563EB] border-slate-200",
    bg: "bg-[#EFF6FF] hover:bg-[#DBEAFE]",
    text: "text-[#1E40AF]",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-800",
    dotColor: "bg-blue-500",
  },
  ly: {
    border: "border-l-[#7C3AED] border-slate-200",
    bg: "bg-[#F5F3FF] hover:bg-[#EDE9FE]",
    text: "text-[#5B21B6]",
    badgeBg: "bg-purple-100",
    badgeText: "text-purple-800",
    dotColor: "bg-purple-500",
  },
  tin: {
    border: "border-l-[#059669] border-slate-200",
    bg: "bg-[#ECFDF5] hover:bg-[#D1FAE5]",
    text: "text-[#065F46]",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-800",
    dotColor: "bg-emerald-500",
  },
  sat: {
    border: "border-l-[#4F46E5] border-slate-200",
    bg: "bg-[#EEF2FF] hover:bg-[#E0E7FF]",
    text: "text-[#3730A3]",
    badgeBg: "bg-indigo-100",
    badgeText: "text-indigo-800",
    dotColor: "bg-indigo-500",
  },
  khac: {
    border: "border-l-[#0F2747] border-slate-200",
    bg: "bg-[#F8FAFC] hover:bg-[#F1F5F9]",
    text: "text-[#0F2747]",
    badgeBg: "bg-slate-200",
    badgeText: "text-slate-800",
    dotColor: "bg-[#0F2747]",
  },
};

// Available hourly grid slots from 07:00 to 22:00
const GRID_HOURS = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
const ROW_HEIGHT_PX = 60; // 60px per 1 hour slot for readable event cards

export function SchoolhouseDashboard({
  onOpenApplyTutor,
  onNavigateClasses,
}: SchoolhouseDashboardProps) {
  const {
    user,
    classes,
    registeredClassIds,
    registerClass,
    cancelClassRegistration,
    addPoints,
    language,
  } = usePencily();

  // Navigation & View States
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedView, setSelectedView] = useState<"week" | "day" | "agenda">("week");
  const [filterMode, setFilterMode] = useState<"all" | "enrolled">("all");
  const [selectedDayIndex, setSelectedDayIndex] = useState(0); // 0 to 6
  const [activeModalEvent, setActiveModalEvent] = useState<CalendarEventItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Local storage cache for seed registrations so user clicks immediately take effect
  const [localRegisteredSeeds, setLocalRegisteredSeeds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("pencily_seed_registered") || "[]");
      if (Array.isArray(saved)) setLocalRegisteredSeeds(saved);
    } catch {}
  }, []);

  const saveLocalSeedRegistration = (id: string, enrolled: boolean) => {
    const updated = enrolled
      ? [...localRegisteredSeeds.filter((item) => item !== id), id]
      : localRegisteredSeeds.filter((item) => item !== id);
    setLocalRegisteredSeeds(updated);
    try {
      localStorage.setItem("pencily_seed_registered", JSON.stringify(updated));
    } catch {}
  };

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

  // Set default selected day to today if weekOffset === 0
  useEffect(() => {
    if (weekOffset === 0) {
      const todayIndex = weekDays.findIndex((d) => d.isToday);
      if (todayIndex !== -1) setSelectedDayIndex(todayIndex);
    }
  }, [weekOffset, weekDays]);

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

  // Merge seed peer classes with dynamic classes from PencilyContext
  const allCalendarEvents: CalendarEventItem[] = useMemo(() => {
    // 1. Process seed events
    const processedSeeds: CalendarEventItem[] = SEED_WEEKLY_EVENTS.map((item) => {
      const isRegistered =
        registeredClassIds.includes(item.id) || localRegisteredSeeds.includes(item.id);
      return {
        ...item,
        isRegistered,
      };
    });

    // 2. Process dynamic user/backend classes
    const processedDynamic: CalendarEventItem[] = classes.map((c, idx) => {
      const isRegistered = registeredClassIds.includes(c.id);
      let dayIndex = idx % 7;
      let startH = 19.0;
      let durationH = 1.5;
      let timeSlot = c.timeSlot || "19:00 – 20:30";

      if (c.schedule) {
        if (c.schedule.includes("19:30")) {
          startH = 19.5;
        } else if (c.schedule.includes("20:00")) {
          startH = 20.0;
        } else if (c.schedule.includes("09:00") || c.schedule.includes("9:00")) {
          startH = 9.0;
        }
      }

      return {
        id: c.id,
        title: c.title,
        category: c.category || "khac",
        categoryLabel: c.categoryLabel || "Chuyên đề",
        dayOfWeek: dayIndex,
        startHour: startH,
        durationHours: durationH,
        timeSlot: timeSlot,
        tutorName: c.tutorName || "Peer Tutor",
        tutorSchool: c.tutorSchool || "The Pencily",
        tutorRole: c.tutorRole || "Host phòng học",
        discordRoom: c.discordRoom || "#voice-phong-hoc",
        meetUrl: c.meetUrl || "https://discord.gg/6hpEf4wC4z",
        maxSeats: c.maxSeats || 8,
        enrolledCount: c.enrolledCount || 1,
        description: c.description || "Phòng học trực tiếp trên The Pencily.",
        isRegistered,
      };
    });

    // Combine and deduplicate
    const combined = [...processedSeeds];
    for (const item of processedDynamic) {
      if (!combined.some((c) => c.id === item.id)) {
        combined.push(item);
      }
    }

    return combined;
  }, [classes, registeredClassIds, localRegisteredSeeds]);

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
      if (event.id.startsWith("seed-")) {
        saveLocalSeedRegistration(event.id, false);
      } else {
        await cancelClassRegistration(event.id);
      }
      setToastMessage(
        language === "vi"
          ? `Đã hủy giữ chỗ buổi học: "${event.title}"`
          : `Cancelled booking for: "${event.title}"`
      );
    } else {
      if (event.id.startsWith("seed-")) {
        saveLocalSeedRegistration(event.id, true);
        addPoints?.(10, `Ghi danh buổi học: ${event.title}`);
      } else {
        await registerClass(event.id);
      }
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
    <div className="w-full space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F2747] text-white px-5 py-3 rounded-sm border-2 border-amber-400 shadow-xl flex items-center gap-3 animate-fadeIn text-xs sm:text-sm font-semibold max-w-md">
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

      {/* 1. CALENDAR HEADER & METRICS BAR (Unboxed, strictly no nốt ruồi) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b-2 border-slate-300">
        <div>
          <h2 className="font-poppins font-black text-2xl sm:text-3xl text-[#0F2747] tracking-tight">
            {language === "vi" ? "Lịch Học & Buổi Thảo Luận" : "Study Schedule & Sessions"}
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] mt-1 font-medium">
            {language === "vi"
              ? "Thời khóa biểu tuần các lớp học kèm trực tuyến và phòng tự học Discord Voice"
              : "Weekly timetable for peer study pods and Discord Voice live rooms"}
          </p>
        </div>

        {/* Live Synced Stat Badges */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-2 rounded-sm bg-white border-2 border-slate-300 shadow-2xs text-xs font-bold text-[#0F2747]">
            <Trophy className="w-4 h-4 text-[#EAB308]" />
            <span>{user.points} PP</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-sm bg-white border-2 border-slate-300 shadow-2xs text-xs font-bold text-[#0F2747]">
            <Clock className="w-4 h-4 text-[#4F7ECB]" />
            <span>
              {user.learningMinutes} {language === "vi" ? "phút học" : "mins"}
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-sm bg-[#22C55E]/15 border-2 border-emerald-400 text-xs font-bold text-[#16A34A]">
            <CalendarIcon className="w-4 h-4 text-[#16A34A]" />
            <span>
              {enrolledSessionsCount}{" "}
              {language === "vi" ? "buổi đã giữ chỗ" : "sessions enrolled"}
            </span>
          </div>
        </div>
      </div>

      {/* 2. GOOGLE CALENDAR CONTROLS & TOOLBAR */}
      <div className="bg-white rounded-md border-2 border-slate-300 p-3 sm:p-4 shadow-2xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Left: Navigation Buttons & Date Range Display */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Today Button */}
          <button
            onClick={() => setWeekOffset(0)}
            className="px-3.5 py-1.5 rounded-sm bg-white hover:bg-slate-100 text-[#0F2747] border-2 border-slate-300 text-xs font-bold transition shadow-2xs cursor-pointer active:scale-95"
          >
            {language === "vi" ? "Hôm nay" : "Today"}
          </button>

          {/* Prev / Next Buttons */}
          <div className="flex items-center rounded-sm border-2 border-slate-300 bg-white shadow-2xs overflow-hidden">
            <button
              onClick={() => setWeekOffset((prev) => prev - 1)}
              className="p-1.5 text-slate-700 hover:bg-slate-100 hover:text-[#0F2747] transition cursor-pointer"
              title={language === "vi" ? "Tuần trước" : "Previous week"}
              aria-label="Previous week"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="w-[1px] h-4 bg-slate-200" />
            <button
              onClick={() => setWeekOffset((prev) => prev + 1)}
              className="p-1.5 text-slate-700 hover:bg-slate-100 hover:text-[#0F2747] transition cursor-pointer"
              title={language === "vi" ? "Tuần sau" : "Next week"}
              aria-label="Next week"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Week Range Display */}
          <div className="font-poppins font-bold text-sm sm:text-base text-[#0F2747] tracking-tight ml-1">
            {weekRangeLabel}
          </div>
        </div>

        {/* Center: Filter Mode (All Sessions vs Only Enrolled) */}
        <div className="flex items-center bg-slate-100 p-1 rounded-sm border-2 border-slate-300 shrink-0">
          <button
            onClick={() => setFilterMode("all")}
            className={`px-3 py-1 text-xs font-bold rounded-xs transition cursor-pointer ${
              filterMode === "all"
                ? "bg-[#0F2747] text-white shadow-xs"
                : "text-slate-600 hover:text-[#0F2747]"
            }`}
          >
            {language === "vi" ? "Tất cả lớp học tuần này" : "All Weekly Pods"} (
            {allCalendarEvents.length})
          </button>
          <button
            onClick={() => setFilterMode("enrolled")}
            className={`px-3 py-1 text-xs font-bold rounded-xs transition cursor-pointer flex items-center gap-1.5 ${
              filterMode === "enrolled"
                ? "bg-[#0F2747] text-white shadow-xs"
                : "text-slate-600 hover:text-[#0F2747]"
            }`}
          >
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {language === "vi" ? "Lớp đã đăng ký" : "My Bookings"} (
              {enrolledSessionsCount})
            </span>
          </button>
        </div>

        {/* Right: View Switcher (Tuần / Ngày / Danh sách) & Browse Button */}
        <div className="flex items-center gap-2 justify-between lg:justify-end flex-wrap">
          <div className="flex items-center bg-slate-100 p-1 rounded-sm border-2 border-slate-300">
            <button
              onClick={() => setSelectedView("week")}
              className={`px-2.5 py-1 text-xs font-bold rounded-xs transition cursor-pointer flex items-center gap-1 ${
                selectedView === "week"
                  ? "bg-white text-[#0F2747] shadow-xs border border-slate-300"
                  : "text-slate-600 hover:text-[#0F2747]"
              }`}
              title={language === "vi" ? "Xem lưới tuần" : "Week Grid View"}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {language === "vi" ? "Tuần" : "Week"}
              </span>
            </button>
            <button
              onClick={() => setSelectedView("day")}
              className={`px-2.5 py-1 text-xs font-bold rounded-xs transition cursor-pointer flex items-center gap-1 ${
                selectedView === "day"
                  ? "bg-white text-[#0F2747] shadow-xs border border-slate-300"
                  : "text-slate-600 hover:text-[#0F2747]"
              }`}
              title={language === "vi" ? "Xem theo ngày" : "Day View"}
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {language === "vi" ? "Ngày" : "Day"}
              </span>
            </button>
            <button
              onClick={() => setSelectedView("agenda")}
              className={`px-2.5 py-1 text-xs font-bold rounded-xs transition cursor-pointer flex items-center gap-1 ${
                selectedView === "agenda"
                  ? "bg-white text-[#0F2747] shadow-xs border border-slate-300"
                  : "text-slate-600 hover:text-[#0F2747]"
              }`}
              title={language === "vi" ? "Xem danh sách" : "Agenda List View"}
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {language === "vi" ? "Danh sách" : "Agenda"}
              </span>
            </button>
          </div>

          {onNavigateClasses && (
            <button
              onClick={onNavigateClasses}
              className="px-3.5 py-1.5 rounded-sm bg-[#FFC83D] hover:bg-[#EAB308] text-[#0F2747] border-2 border-amber-500 text-xs font-bold shadow-2xs transition active:scale-95 flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Compass className="w-3.5 h-3.5 text-[#0F2747]" />
              <span>{language === "vi" ? "Tìm thêm lớp" : "Browse More"}</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. GOOGLE CALENDAR TIME GRID (MAIN VIEW) */}
      {selectedView === "week" && (
        <div className="bg-white rounded-md border-2 border-slate-300 shadow-xs overflow-hidden">
          {/* Calendar Table Container with Horizontal Scroll on Mobile */}
          <div className="overflow-x-auto min-w-full">
            <div className="min-w-[760px] select-none">
              {/* Header Row: Timezone Label + 7 Day Headers */}
              <div className="grid grid-cols-[64px_repeat(7,1fr)] sm:grid-cols-[76px_repeat(7,1fr)] border-b-2 border-slate-300 bg-slate-50 sticky top-0 z-20">
                {/* Timezone label cell */}
                <div className="p-3 text-[11px] font-bold text-slate-400 border-r-2 border-slate-300 flex items-center justify-center font-mono">
                  GMT+7
                </div>

                {/* 7 Day Column Headers */}
                {weekDays.map((d) => (
                  <div
                    key={d.index}
                    onClick={() => {
                      setSelectedDayIndex(d.index);
                      // On click day header, allow quickly focusing
                    }}
                    className={`p-2.5 sm:p-3 text-center border-r-2 border-slate-200 last:border-r-0 transition cursor-pointer hover:bg-slate-100/70 ${
                      d.isToday ? "bg-amber-50/60" : ""
                    }`}
                  >
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      {d.shortName}
                    </div>
                    <div className="mt-1 flex items-center justify-center">
                      <span
                        className={`text-sm sm:text-base font-black px-2 py-0.5 rounded-sm transition ${
                          d.isToday
                            ? "bg-[#0F2747] text-white shadow-2xs"
                            : "text-[#0F2747]"
                        }`}
                      >
                        {d.dayNumber}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* All-Day / Pinned Pods Bar (Classic Google Calendar touch) */}
              <div className="grid grid-cols-[64px_repeat(7,1fr)] sm:grid-cols-[76px_repeat(7,1fr)] border-b-2 border-slate-200 bg-slate-50/50 text-xs">
                <div className="p-2 text-[10px] font-bold text-slate-400 border-r-2 border-slate-300 text-center uppercase tracking-wider flex items-center justify-center">
                  24/7
                </div>
                <div className="col-span-7 p-2 flex items-center justify-between px-4 text-xs font-semibold text-[#0F2747] bg-[#FAF7EE] border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-sm bg-[#0F2747] text-white text-[10px] font-bold uppercase tracking-wide">
                      Discord Voice
                    </span>
                    <span className="text-xs text-slate-700">
                      {language === "vi"
                        ? "Các phòng tự học #voice-phong-tu-hoc mở xuyên suốt 24/7"
                        : "Discord Voice peer study pods are open 24/7"}
                    </span>
                  </div>
                  <a
                    href="https://discord.gg/6hpEf4wC4z"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#4F7ECB] font-bold text-xs hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>{language === "vi" ? "Vào phòng tự do" : "Join Free Pod"}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Grid Body: Time Rows & Day Columns */}
              <div
                className="relative grid grid-cols-[64px_repeat(7,1fr)] sm:grid-cols-[76px_repeat(7,1fr)]"
                style={{ height: `${GRID_HOURS.length * ROW_HEIGHT_PX}px` }}
              >
                {/* 1. Background Grid Lines (Horizontal hour divider lines) */}
                <div className="absolute inset-0 pointer-events-none">
                  {GRID_HOURS.map((hour, idx) => (
                    <div
                      key={hour}
                      className="w-full border-t border-slate-200"
                      style={{ top: `${idx * ROW_HEIGHT_PX}px`, height: `${ROW_HEIGHT_PX}px` }}
                    />
                  ))}
                </div>

                {/* 2. Left Time Column (Gutter) */}
                <div className="border-r-2 border-slate-300 bg-white relative z-10 select-none">
                  {GRID_HOURS.map((hour, idx) => (
                    <div
                      key={hour}
                      className="absolute right-2 text-[11px] font-mono font-bold text-slate-400 transform -translate-y-2.5"
                      style={{ top: `${idx * ROW_HEIGHT_PX}px` }}
                    >
                      {hour.toString().padStart(2, "0")}:00
                    </div>
                  ))}
                </div>

                {/* 3. Seven Day Columns */}
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
                      {/* Red Live Time Line across current day's column (Google Calendar signature) */}
                      {isCurrentDay &&
                        currentLiveTime >= 7 &&
                        currentLiveTime <= 23 && (
                          <div
                            className="absolute left-0 right-0 z-20 pointer-events-none flex items-center"
                            style={{
                              top: `${(currentLiveTime - 7) * ROW_HEIGHT_PX}px`,
                            }}
                          >
                            <div className="w-2 h-2 bg-red-600 rounded-xs -ml-1 shadow-2xs" />
                            <div className="h-[2px] bg-red-500 w-full" />
                          </div>
                        )}

                      {/* Render Events inside this day column */}
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
                              height: `${Math.max(heightPx, 44)}px`,
                            }}
                            className={`absolute left-1 right-1 sm:left-1.5 sm:right-1.5 p-2 rounded-xs border-2 ${style.border} ${style.bg} transition-all duration-150 cursor-pointer shadow-2xs hover:shadow-md hover:scale-[1.01] z-10 flex flex-col justify-between overflow-hidden group`}
                          >
                            <div>
                              <div className="flex items-center justify-between gap-1 mb-1">
                                <span className="font-mono text-[10px] font-black text-slate-600 leading-none">
                                  {event.timeSlot}
                                </span>
                                {event.isRegistered ? (
                                  <span className="px-1.5 py-0.5 rounded-xs bg-[#22C55E]/20 text-[#16A34A] text-[9px] font-black tracking-tight border border-emerald-400 shrink-0">
                                    {language === "vi" ? "Đã giữ chỗ" : "Enrolled"}
                                  </span>
                                ) : (
                                  <span
                                    className={`px-1.5 py-0.5 rounded-xs ${style.badgeBg} ${style.badgeText} text-[9px] font-bold shrink-0`}
                                  >
                                    {event.categoryLabel}
                                  </span>
                                )}
                              </div>

                              <h4 className="font-poppins font-bold text-xs sm:text-[13px] text-[#0F2747] leading-snug line-clamp-2">
                                {event.title}
                              </h4>
                            </div>

                            <div className="pt-1 border-t border-slate-200/60 flex items-center justify-between gap-1 text-[10px] text-slate-600">
                              <span className="font-medium truncate">
                                {event.tutorName}
                              </span>
                              <span className="font-bold text-[#5865F2] shrink-0 flex items-center gap-0.5">
                                <Volume2 className="w-3 h-3" />
                                <span className="hidden sm:inline">{event.discordRoom}</span>
                              </span>
                            </div>
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

      {/* 4. GOOGLE CALENDAR DAY VIEW */}
      {selectedView === "day" && (
        <div className="bg-white rounded-md border-2 border-slate-300 shadow-xs overflow-hidden">
          {/* Day Navigation Tabs */}
          <div className="flex items-center border-b-2 border-slate-300 bg-slate-50 overflow-x-auto">
            {weekDays.map((d) => (
              <button
                key={d.index}
                onClick={() => setSelectedDayIndex(d.index)}
                className={`py-3 px-4 sm:px-6 text-center border-r-2 border-slate-200 last:border-r-0 transition cursor-pointer flex-1 min-w-[90px] ${
                  selectedDayIndex === d.index
                    ? "bg-white border-b-2 border-b-transparent text-[#0F2747] font-black"
                    : "text-slate-600 hover:bg-slate-100/70"
                }`}
              >
                <div className="text-[11px] uppercase tracking-wider font-bold">
                  {d.shortName}
                </div>
                <div className="mt-0.5 text-base font-black">
                  {d.dayNumber} Th{d.monthNumber}
                </div>
              </button>
            ))}
          </div>

          {/* Day Hour Grid */}
          <div className="p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b-2 border-slate-200">
              <h3 className="font-poppins font-black text-lg sm:text-xl text-[#0F2747]">
                {weekDays[selectedDayIndex]?.fullName},{" "}
                {weekDays[selectedDayIndex]?.dayNumber} Tháng{" "}
                {weekDays[selectedDayIndex]?.monthNumber}
              </h3>
              <span className="text-xs font-bold text-slate-500">
                {
                  filteredEvents.filter((e) => e.dayOfWeek === selectedDayIndex).length
                }{" "}
                {language === "vi" ? "buổi học" : "sessions"}
              </span>
            </div>

            {filteredEvents.filter((e) => e.dayOfWeek === selectedDayIndex).length > 0 ? (
              <div className="space-y-3">
                {filteredEvents
                  .filter((e) => e.dayOfWeek === selectedDayIndex)
                  .map((event) => {
                    const style = CATEGORY_STYLES[event.category] || CATEGORY_STYLES.khac;
                    return (
                      <div
                        key={event.id}
                        className={`p-4 sm:p-5 rounded-md border-2 ${style.border} ${style.bg} shadow-2xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2 py-0.5 rounded-xs bg-white text-slate-700 text-xs font-mono font-bold border border-slate-300">
                              {event.timeSlot}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-xs ${style.badgeBg} ${style.badgeText} text-xs font-bold`}
                            >
                              {event.categoryLabel}
                            </span>
                            {event.isRegistered && (
                              <span className="px-2 py-0.5 rounded-xs bg-[#22C55E]/20 text-[#16A34A] text-xs font-bold border border-emerald-400">
                                {language === "vi" ? "Đã giữ chỗ" : "Enrolled"}
                              </span>
                            )}
                          </div>
                          <h4 className="font-poppins font-bold text-base sm:text-lg text-[#0F2747]">
                            {event.title}
                          </h4>
                          <p className="text-xs text-slate-600">
                            {language === "vi" ? "Tutor: " : "Tutor: "}
                            <strong className="text-[#0F2747]">{event.tutorName}</strong> (
                            {event.tutorSchool}) • Room:{" "}
                            <span className="text-[#5865F2] font-semibold">
                              {event.discordRoom}
                            </span>
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleToggleRegistration(event)}
                            className={`px-4 py-2 rounded-sm text-xs font-bold transition border-2 cursor-pointer ${
                              event.isRegistered
                                ? "bg-white hover:bg-red-50 text-red-600 border-red-300"
                                : "bg-[#FFC83D] hover:bg-[#EAB308] text-[#0F2747] border-amber-500 shadow-2xs"
                            }`}
                          >
                            {event.isRegistered
                              ? language === "vi"
                                ? "Hủy giữ chỗ"
                                : "Cancel"
                              : language === "vi"
                              ? "Giữ chỗ (+10 PP)"
                              : "Book (+10 PP)"}
                          </button>
                          <a
                            href={event.meetUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-4 py-2 rounded-sm bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-2xs border-2 border-indigo-400 cursor-pointer"
                          >
                            <span>{language === "vi" ? "Vào phòng" : "Join"}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className="p-8 text-center bg-slate-50 rounded-sm border-2 border-dashed border-slate-300 space-y-2">
                <CalendarDays className="w-8 h-8 text-slate-400 mx-auto" />
                <div className="font-bold text-sm text-[#0F2747]">
                  {language === "vi"
                    ? "Không có lớp học nào được xếp vào ngày này"
                    : "No scheduled sessions on this day"}
                </div>
                <p className="text-xs text-slate-500">
                  {language === "vi"
                    ? "Bạn có thể vào các phòng Discord Voice tự do để ôn tập bài tập cùng bạn bè."
                    : "You can hop into 24/7 Discord Voice study rooms anytime."}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. GOOGLE CALENDAR AGENDA / LIST VIEW */}
      {selectedView === "agenda" && (
        <div className="bg-white rounded-md border-2 border-slate-300 shadow-xs p-5 sm:p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b-2 border-slate-200">
            <h3 className="font-poppins font-black text-xl text-[#0F2747]">
              {language === "vi" ? "Lịch trình toàn tuần" : "Weekly Agenda Schedule"}
            </h3>
            <span className="text-xs font-bold text-slate-500">
              {filteredEvents.length} {language === "vi" ? "buổi học" : "total sessions"}
            </span>
          </div>

          <div className="space-y-6">
            {weekDays.map((d) => {
              const dayEvents = filteredEvents.filter((e) => e.dayOfWeek === d.index);
              if (dayEvents.length === 0) return null;

              return (
                <div key={d.index} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-black px-2.5 py-1 rounded-sm ${
                        d.isToday
                          ? "bg-[#0F2747] text-white"
                          : "bg-slate-200 text-slate-800"
                      }`}
                    >
                      {d.fullName}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {d.dayNumber} Tháng {d.monthNumber}
                    </span>
                    <div className="flex-1 h-[1px] bg-slate-200" />
                  </div>

                  <div className="space-y-2.5 pl-2 sm:pl-4">
                    {dayEvents.map((event) => {
                      const style = CATEGORY_STYLES[event.category] || CATEGORY_STYLES.khac;
                      return (
                        <div
                          key={event.id}
                          onClick={() => setActiveModalEvent(event)}
                          className={`p-3.5 sm:p-4 rounded-sm border-2 ${style.border} ${style.bg} hover:shadow-xs transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-mono text-xs font-bold text-slate-700 bg-white px-2 py-0.5 rounded-xs border border-slate-300">
                                {event.timeSlot}
                              </span>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-xs ${style.badgeBg} ${style.badgeText}`}
                              >
                                {event.categoryLabel}
                              </span>
                              {event.isRegistered && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-xs bg-[#22C55E]/20 text-[#16A34A] border border-emerald-400">
                                  {language === "vi" ? "Đã giữ chỗ" : "Enrolled"}
                                </span>
                              )}
                            </div>
                            <h4 className="font-poppins font-bold text-sm sm:text-base text-[#0F2747]">
                              {event.title}
                            </h4>
                            <p className="text-xs text-slate-600">
                              {event.tutorName} ({event.tutorSchool}) • {event.discordRoom}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-xs font-bold text-[#4F7ECB] flex items-center gap-1">
                              <span>{language === "vi" ? "Chi tiết" : "Details"}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {filteredEvents.length === 0 && (
              <div className="text-center py-10 space-y-3">
                <OwlMascot size="md" className="mx-auto" />
                <div className="font-bold text-base text-[#0F2747]">
                  {language === "vi"
                    ? "Chưa có buổi học nào phù hợp với bộ lọc"
                    : "No sessions matching your filter"}
                </div>
                <button
                  onClick={() => setFilterMode("all")}
                  className="px-4 py-2 rounded-sm bg-[#FFC83D] text-[#0F2747] text-xs font-bold border-2 border-amber-500 shadow-2xs hover:bg-[#EAB308] cursor-pointer"
                >
                  {language === "vi" ? "Xem tất cả lớp học tuần này" : "View all weekly pods"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. GOOGLE CALENDAR EVENT DETAIL MODAL (Classic popup card when clicking event chip) */}
      {activeModalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0F2747]/70 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white border-2 border-[#0F2747] rounded-md shadow-2xl p-5 sm:p-7 max-h-[92vh] overflow-y-auto space-y-5">
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
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-xs bg-slate-100 border border-slate-300 text-slate-800">
                  {activeModalEvent.categoryLabel}
                </span>
                {activeModalEvent.isRegistered ? (
                  <span className="text-[11px] font-black px-2.5 py-0.5 rounded-xs bg-[#22C55E]/20 text-[#16A34A] border border-emerald-400 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>{language === "vi" ? "Bạn đã đăng ký" : "You are enrolled"}</span>
                  </span>
                ) : (
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-xs bg-amber-50 text-amber-800 border border-amber-300">
                    {language === "vi" ? "Đang mở giữ chỗ" : "Open for booking"}
                  </span>
                )}
              </div>

              <h3 className="font-poppins font-black text-xl sm:text-2xl text-[#0F2747] leading-snug">
                {activeModalEvent.title}
              </h3>
            </div>

            {/* Time & Location details */}
            <div className="space-y-2.5 bg-slate-50 p-4 rounded-sm border-2 border-slate-200 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5 text-[#0F2747] font-semibold">
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

              <div className="flex items-center gap-2.5 text-slate-700">
                <Volume2 className="w-4 h-4 text-[#5865F2] shrink-0" />
                <span>
                  Discord Voice:{" "}
                  <strong className="text-[#5865F2]">
                    {activeModalEvent.discordRoom}
                  </strong>
                </span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-700">
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
            <div className="space-y-1.5">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {language === "vi" ? "Nội dung & Mục tiêu buổi học" : "Session Outline"}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-[#FAF7EE] p-3 rounded-sm border border-slate-300">
                {activeModalEvent.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t-2 border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                onClick={() => handleToggleRegistration(activeModalEvent)}
                className={`px-5 py-2.5 rounded-sm text-xs font-bold transition border-2 cursor-pointer active:scale-95 text-center ${
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
                className="px-5 py-2.5 rounded-sm bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-2xs border-2 border-indigo-400 cursor-pointer active:scale-95"
              >
                <span>
                  {language === "vi" ? "Vào phòng học Discord" : "Join Discord Voice"}
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
