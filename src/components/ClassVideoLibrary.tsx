"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Clock,
  Play,
  FileText,
  BookOpen,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ListVideo,
  Search,
  ExternalLink,
  GraduationCap,
  Calendar,
  Gift,
} from "lucide-react";
import { usePencily } from "@/context/PencilyContext";
import { PencilMascot } from "@/components/Logo";

export interface VideoTranscriptItem {
  time: string;
  seconds: number;
  speaker: string;
  text: string;
}

export interface SyllabusChapter {
  id: string;
  title: string;
  time: string;
  seconds: number;
  summary: string;
}

export interface TutorInfo {
  name: string;
  avatar: string;
  school: string;
  grade: string;
  bio: string;
  sessions: number;
  specialty: string;
  badge?: string;
}

export interface VideoLesson {
  id: string;
  youtubeId: string;
  title: string;
  duration: string;
  totalSeconds: number;
  subject: string;
  tutor: TutorInfo;
  syllabus: SyllabusChapter[];
  transcript: VideoTranscriptItem[];
}

interface ClassVideoLibraryProps {
  onGoToProfile?: () => void;
  onOpenExchangeShop?: () => void;
  onGoToClasses?: () => void;
  lessons?: VideoLesson[];
}

export function ClassVideoLibrary({
  onGoToProfile,
  onOpenExchangeShop,
  onGoToClasses,
  lessons = [],
}: ClassVideoLibraryProps) {
  const router = useRouter();
  const { addPoints } = usePencily();
  const [activeLesson, setActiveLesson] = useState<VideoLesson | null>(
    lessons.length > 0 ? lessons[0] : null
  );
  const [startSeconds, setStartSeconds] = useState(0);
  const [activeTab, setActiveTab] = useState<"transcript" | "syllabus">("transcript");
  const [transcriptSearch, setTranscriptSearch] = useState("");
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);

  // Update active lesson if lessons prop changes
  useEffect(() => {
    if (lessons.length > 0 && !activeLesson) {
      setActiveLesson(lessons[0]);
    } else if (lessons.length === 0) {
      setActiveLesson(null);
    }
  }, [lessons, activeLesson]);

  // Load completed video sessions from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("pencily_completed_videos");
      if (saved) {
        setCompletedLessonIds(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSelectLesson = (lesson: VideoLesson) => {
    setActiveLesson(lesson);
    setStartSeconds(0);
    setTranscriptSearch("");
  };

  const handleSeek = (seconds: number) => {
    setStartSeconds(seconds);
  };

  const handleClaimPoints = () => {
    if (!activeLesson || completedLessonIds.includes(activeLesson.id)) return;

    // Reward student +5 PP
    addPoints(5, `Điểm danh xem buổi học: ${activeLesson.title}`);

    const updated = Array.from(new Set([...completedLessonIds, activeLesson.id]));
    setCompletedLessonIds(updated);

    try {
      localStorage.setItem("pencily_completed_videos", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleGoToProfile = () => {
    if (onGoToProfile) {
      onGoToProfile();
    } else {
      router.push("/dashboard?tab=profile");
    }
  };

  // If no real video lessons are hooked up yet: Show clean authentic empty state
  if (!activeLesson || lessons.length === 0) {
    return (
      <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto select-none">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100/70 border border-amber-300/60 flex items-center justify-center text-[#0F2747] shadow-2xs shrink-0">
              <BookOpen className="w-5.5 h-5.5 text-[#0F2747]" />
            </div>
            <div>
              <h2 className="font-poppins font-black text-2xl sm:text-3xl text-[#0F2747] tracking-tight">
                Thư viện
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Kho lưu trữ video và bản ghi hình các buổi học trực tuyến từ Peer Tutors The Pencily.
              </p>
            </div>
          </div>

          {onOpenExchangeShop && (
            <button
              onClick={onOpenExchangeShop}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white hover:bg-[#FFF9EF] border border-[#F59E0B]/40 text-[#0F2747] text-xs font-bold transition shadow-2xs cursor-pointer active:scale-95 shrink-0 self-start sm:self-auto"
            >
              <Gift className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Cửa Hàng Đổi Quà PP →</span>
            </button>
          )}
        </div>

        {/* Clean, authentic empty state - Zero fake mock videos */}
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-slate-200/90 shadow-2xs text-center space-y-6">
          <PencilMascot size="lg" className="mx-auto" />

          <div className="max-w-xl mx-auto space-y-2.5">
            <h3 className="font-poppins font-bold text-xl sm:text-2xl text-[#0F2747]">
              Chưa có tài liệu hay video nào trong Thư viện
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              The Pencily đang trong giai đoạn khởi động các lớp học tương tác đầu tiên. Sau mỗi buổi học online cùng Peer Tutor được ghi hình và kiểm duyệt nội dung, video bài giảng cùng toàn bộ <strong>Bản ghi lời (Transcript)</strong> sẽ tự động xuất bản tại thư viện!
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            {onGoToClasses && (
              <button
                onClick={onGoToClasses}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#0F2747] hover:bg-[#1E3A8A] text-white text-xs sm:text-sm font-bold shadow-xs active:scale-95 transition cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Khám phá các phòng học đang mở</span>
              </button>
            )}

            <a
              href="https://discord.gg/6hpEf4wC4z"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 text-[#0F2747] border border-slate-300 text-xs sm:text-sm font-semibold shadow-2xs active:scale-95 transition cursor-pointer"
            >
              <span>Tham gia máy chủ Discord</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  // When real video lessons exist: render full authentic player
  const isCompleted = completedLessonIds.includes(activeLesson.id);
  const filteredTranscript = activeLesson.transcript.filter(
    (item) =>
      item.text.toLowerCase().includes(transcriptSearch.toLowerCase()) ||
      item.speaker.toLowerCase().includes(transcriptSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn max-w-7xl mx-auto select-none">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100/70 border border-amber-300/60 flex items-center justify-center text-[#0F2747] shadow-2xs shrink-0">
            <BookOpen className="w-5.5 h-5.5 text-[#0F2747]" />
          </div>
          <div>
            <h2 className="font-poppins font-black text-2xl sm:text-3xl text-[#0F2747] tracking-tight">
              Thư viện bài học
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Xem lại các buổi học ghi hình từ Peer Tutors. Mỗi buổi học hoàn thành bạn nhận được{" "}
              <strong className="text-amber-700 font-bold">+5 PP</strong> để đổi quà.
            </p>
          </div>
        </div>

        {onOpenExchangeShop && (
          <button
            onClick={onOpenExchangeShop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white hover:bg-[#FFF9EF] border border-[#F59E0B]/40 text-[#0F2747] text-xs font-bold transition shadow-2xs cursor-pointer active:scale-95 shrink-0"
          >
            <Gift className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Mở Cửa Hàng Đổi Quà PP →</span>
          </button>
        )}
      </div>

      {/* 2-COLUMN YOUTUBE THEATER LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* LEFT MAIN THEATER */}
        <div className="lg:col-span-8 space-y-5">
          {/* 1. YOUTUBE EMBED PLAYER */}
          <div className="bg-white rounded-3xl border-[2.5px] border-[#F59E0B] shadow-sm overflow-hidden">
            <div className="relative w-full aspect-video bg-slate-950">
              <iframe
                key={`${activeLesson.id}-${startSeconds}`}
                src={`https://www.youtube-nocookie.com/embed/${activeLesson.youtubeId}?autoplay=1&start=${startSeconds}&rel=0`}
                title={activeLesson.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Video Title & Actions Bar */}
            <div className="p-4 sm:p-5 bg-white border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200/50">
                    {activeLesson.subject}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
                    {activeLesson.duration}
                  </span>
                </div>
                <h3 className="font-poppins font-bold text-base sm:text-lg text-[#0F2747] leading-snug">
                  {activeLesson.title}
                </h3>
              </div>

              {/* Attendance & Points Button (+5 PP) */}
              <div className="shrink-0 flex items-center gap-2">
                {isCompleted ? (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Đã nhận +5 PP buổi học</span>
                  </div>
                ) : (
                  <button
                    onClick={handleClaimPoints}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs transition active:scale-95 shadow-md cursor-pointer"
                    title="Bấm để ghi nhận đã tham gia học và nhận điểm thưởng"
                  >
                    <Sparkles className="w-4 h-4 fill-current" />
                    <span>Điểm danh học (+5 PP)</span>
                  </button>
                )}
              </div>
            </div>

            {/* 2. TUTOR PROFILE CARD */}
            <div className="p-4 sm:p-5 bg-[#FFFDF9] border-t border-[#0F2747]/8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-13 h-13 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xs shrink-0">
                    <img
                      src={activeLesson.tutor.avatar}
                      alt={activeLesson.tutor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-poppins font-bold text-sm sm:text-base text-[#0F2747]">
                        {activeLesson.tutor.name}
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-[#0F2747] border border-blue-200">
                        Peer Tutor
                      </span>
                      {activeLesson.tutor.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300/80">
                          {activeLesson.tutor.badge}
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-slate-600 mt-0.5">
                      <span>{activeLesson.tutor.school}</span>
                      <span className="mx-1.5 text-slate-300">•</span>
                      <span>{activeLesson.tutor.grade}</span>
                      <span className="mx-1.5 text-slate-300">•</span>
                      <span className="font-semibold text-amber-700">
                        Đã dạy {activeLesson.tutor.sessions} buổi
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 mt-1 max-w-xl line-clamp-2">
                      {activeLesson.tutor.bio}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <button
                    onClick={handleGoToProfile}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-[#0F2747] border border-slate-300 text-xs font-bold transition shadow-2xs cursor-pointer active:scale-95"
                    title="Xem trang cá nhân của gia sư"
                  >
                    <span>Xem hồ sơ</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 3. TRANSCRIPTION & SYLLABUS TABS */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200/80 bg-[#FFF9EF]/80 px-4 sm:px-6">
              <div className="flex items-center gap-2 sm:gap-4">
                <button
                  onClick={() => setActiveTab("transcript")}
                  className={`py-3.5 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition cursor-pointer ${
                    activeTab === "transcript"
                      ? "border-[#F59E0B] text-[#0F2747]"
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <FileText className="w-4 h-4 text-[#F59E0B]" />
                  <span>Bản ghi lời (Transcript)</span>
                </button>

                <button
                  onClick={() => setActiveTab("syllabus")}
                  className={`py-3.5 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition cursor-pointer ${
                    activeTab === "syllabus"
                      ? "border-[#F59E0B] text-[#0F2747]"
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-[#4F7ECB]" />
                  <span>Các chặng bài học ({activeLesson.syllabus.length})</span>
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                <span>💡 Bấm nút</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 font-bold text-[10px]">
                  CC
                </span>
                <span>trên YouTube để xem phụ đề trực tiếp</span>
              </div>
            </div>

            {/* TAB: TRANSCRIPTION */}
            {activeTab === "transcript" && (
              <div className="p-4 sm:p-6 space-y-4 animate-fadeIn">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={transcriptSearch}
                    onChange={(e) => setTranscriptSearch(e.target.value)}
                    placeholder="Tìm kiếm từ khóa trong bản ghi lời..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#0F2747] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/40 focus:bg-white transition"
                  />
                  {transcriptSearch && (
                    <button
                      onClick={() => setTranscriptSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
                    >
                      Xóa
                    </button>
                  )}
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                  {filteredTranscript.length === 0 ? (
                    <div className="text-center py-8 text-xs text-slate-400">
                      Không tìm thấy đoạn ghi âm nào chứa từ khóa &quot;{transcriptSearch}&quot;.
                    </div>
                  ) : (
                    filteredTranscript.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleSeek(item.seconds)}
                        className="w-full text-left p-3 rounded-2xl hover:bg-[#FFF9EF] border border-transparent hover:border-[#F59E0B]/30 transition flex items-start gap-3 group cursor-pointer"
                        title={`Bấm để tua video đến mốc ${item.time}`}
                      >
                        <span className="font-mono font-bold text-xs text-[#4F7ECB] bg-blue-50 px-2 py-0.5 rounded group-hover:bg-[#4F7ECB] group-hover:text-white transition-colors shrink-0">
                          ▶ {item.time}
                        </span>

                        <div className="flex-1 min-w-0">
                          <span className="font-bold text-xs text-[#0F2747] mr-1.5">
                            {item.speaker}:
                          </span>
                          <span className="text-xs text-slate-700 leading-relaxed group-hover:text-[#0F2747]">
                            {item.text}
                          </span>
                        </div>

                        <span className="text-[11px] font-bold text-slate-400 group-hover:text-[#4F7ECB] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          Tua tới →
                        </span>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB: SYLLABUS */}
            {activeTab === "syllabus" && (
              <div className="p-4 sm:p-6 space-y-3 animate-fadeIn">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider pb-1 border-b border-slate-100">
                  Mục lục các chặng kiến thức chính:
                </div>
                <div className="space-y-2">
                  {activeLesson.syllabus.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSeek(item.seconds)}
                      className="w-full text-left p-3.5 rounded-2xl bg-slate-50 hover:bg-[#FFF9EF] border border-slate-200/70 hover:border-[#F59E0B]/40 transition flex items-start justify-between gap-3 group cursor-pointer"
                    >
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-[#4F7ECB] bg-blue-50 px-2 py-0.5 rounded group-hover:bg-[#4F7ECB] group-hover:text-white transition-colors">
                            ▶ {item.time}
                          </span>
                          <h4 className="font-bold text-xs sm:text-sm text-[#0F2747] group-hover:text-amber-800 transition-colors">
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed pl-1">
                          {item.summary}
                        </p>
                      </div>

                      <span className="text-xs font-bold text-slate-400 group-hover:text-[#4F7ECB] shrink-0 pt-0.5">
                        Tua tới →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PLAYLIST QUEUE */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <div className="p-4 bg-[#FFF9EF] border-b border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ListVideo className="w-4 h-4 text-[#F59E0B]" />
                <h3 className="font-poppins font-bold text-sm text-[#0F2747]">
                  Danh sách bài học ({lessons.length})
                </h3>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">
                Chọn video để xem
              </span>
            </div>

            <div className="divide-y divide-slate-100 max-h-[750px] overflow-y-auto">
              {lessons.map((lesson) => {
                const isCurrent = lesson.id === activeLesson.id;
                const isLessonDone = completedLessonIds.includes(lesson.id);

                return (
                  <button
                    key={lesson.id}
                    onClick={() => handleSelectLesson(lesson)}
                    className={`w-full text-left p-3.5 transition flex items-start gap-3 cursor-pointer group ${
                      isCurrent
                        ? "bg-amber-50/70 border-l-4 border-amber-500"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <div className="relative w-28 aspect-video rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200 shadow-2xs group-hover:shadow-xs transition">
                      <img
                        src={`https://img.youtube.com/vi/${lesson.youtubeId}/mqdefault.jpg`}
                        alt={lesson.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        loading="lazy"
                      />
                      <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-white font-mono font-bold text-[10px]">
                        {lesson.duration}
                      </div>

                      {isCurrent && (
                        <div className="absolute inset-0 bg-[#0F2747]/40 flex items-center justify-center">
                          <Play className="w-5 h-5 text-amber-400 fill-amber-400" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                          {lesson.subject}
                        </span>
                        {isLessonDone && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>+5 PP</span>
                          </span>
                        )}
                      </div>

                      <h4
                        className={`font-poppins font-bold text-xs leading-snug line-clamp-2 ${
                          isCurrent ? "text-amber-900" : "text-[#0F2747] group-hover:text-amber-800"
                        }`}
                      >
                        {lesson.title}
                      </h4>

                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                        <span className="truncate">{lesson.tutor.name}</span>
                        <span>•</span>
                        <span className="text-amber-700 font-semibold">{lesson.duration}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
