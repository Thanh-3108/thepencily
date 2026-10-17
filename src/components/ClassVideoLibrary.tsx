"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Clock, Play, FileText, BookOpen, CheckCircle2, ArrowRight, ListVideo, Search, ExternalLink, GraduationCap, Calendar, Gift } from "lucide-react";
import { usePencily } from "@/context/PencilyContext";
import { OwlMascot } from "@/components/Logo";

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
 
export function getDefaultLessons(isVi: boolean): VideoLesson[] {
  return [
    {
      id: "rick-astley-never-gonna-give-you-up",
      youtubeId: "dQw4w9WgXcQ",
      title: isVi
        ? "Rick Astley - Never Gonna Give You Up (Bài Học Mẫu / Placeholder)"
        : "Rick Astley - Never Gonna Give You Up (Sample Lesson / Placeholder)",
      duration: "3:33",
      totalSeconds: 213,
      subject: isVi ? "Kỹ Năng & Động Lực" : "Motivation & Mindset",
      tutor: {
        name: "Rick Astley",
        avatar: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
        school: isVi ? "Học Viện Âm Nhạc The Pencily" : "The Pencily Music Academy",
        grade: isVi ? "Cố Vấn Cấp Cao" : "Senior Mentor",
        bio: "Never gonna give you up, never gonna let you down, never gonna run around and desert you!",
        sessions: 1987,
        specialty: isVi ? "Động lực & Tinh thần kiên trì" : "Motivation & Perseverance",
        badge: isVi ? "Huyền Thoại" : "Legendary",
      },
      syllabus: [
        {
          id: "ch-1",
          title: isVi ? "Khúc dạo đầu & Giới thiệu nguyên tắc học tập" : "Introduction & Core Principles",
          time: "0:18",
          seconds: 18,
          summary: "We're no strangers to love, you know the rules and so do I...",
        },
        {
          id: "ch-2",
          title: isVi ? "Điệp khúc cốt lõi: Cam kết không bao giờ bỏ cuộc" : "Core Chorus: Commitment to Never Give Up",
          time: "0:43",
          seconds: 43,
          summary: "Never gonna give you up, never gonna let you down, never gonna run around and desert you!",
        },
        {
          id: "ch-3",
          title: isVi ? "Phát triển tư duy & Hiểu rõ mục tiêu đồng hành" : "Mindset Shift & Mutual Understanding",
          time: "1:08",
          seconds: 68,
          summary: "We've known each other for so long, inside we both know what's been going on...",
        },
        {
          id: "ch-4",
          title: isVi ? "Điệp khúc cao trào & Lời động viên kiên trì" : "Climax Chorus & Words of Encouragement",
          time: "2:16",
          seconds: 136,
          summary: "Never gonna make you cry, never gonna say goodbye, never gonna tell a lie and hurt you.",
        },
      ],
      transcript: [
        { time: "0:18", seconds: 18, speaker: "Rick Astley", text: "We're no strangers to love" },
        { time: "0:22", seconds: 22, speaker: "Rick Astley", text: "You know the rules and so do I" },
        { time: "0:27", seconds: 27, speaker: "Rick Astley", text: "A full commitment's what I'm thinking of" },
        { time: "0:31", seconds: 31, speaker: "Rick Astley", text: "You wouldn't get this from any other guy" },
        { time: "0:35", seconds: 35, speaker: "Rick Astley", text: "I just wanna tell you how I'm feeling" },
        { time: "0:40", seconds: 40, speaker: "Rick Astley", text: "Gotta make you understand" },
        { time: "0:43", seconds: 43, speaker: "Rick Astley", text: "Never gonna give you up, never gonna let you down" },
        { time: "0:48", seconds: 48, speaker: "Rick Astley", text: "Never gonna run around and desert you" },
        { time: "0:52", seconds: 52, speaker: "Rick Astley", text: "Never gonna make you cry, never gonna say goodbye" },
        { time: "0:56", seconds: 56, speaker: "Rick Astley", text: "Never gonna tell a lie and hurt you" },
        { time: "1:08", seconds: 68, speaker: "Rick Astley", text: "We've known each other for so long" },
        { time: "1:13", seconds: 73, speaker: "Rick Astley", text: "Your heart's been aching, but you're too shy to say it" },
        { time: "1:17", seconds: 77, speaker: "Rick Astley", text: "Inside, we both know what's been going on" },
        { time: "1:21", seconds: 81, speaker: "Rick Astley", text: "We know the game and we're gonna play it" },
        { time: "1:25", seconds: 85, speaker: "Rick Astley", text: "And if you ask me how I'm feeling, don't tell me you're too blind to see" },
        { time: "1:34", seconds: 94, speaker: "Rick Astley", text: "Never gonna give you up, never gonna let you down!" },
        { time: "1:43", seconds: 103, speaker: "Rick Astley", text: "Never gonna make you cry, never gonna say goodbye" },
        { time: "2:16", seconds: 136, speaker: "Rick Astley", text: "(Ooh, give you up) Never gonna give, never gonna give (Give you up)" },
        { time: "2:32", seconds: 152, speaker: "Rick Astley", text: "Never gonna give you up, never gonna let you down, never gonna run around and desert you!" },
      ],
    },
  ];
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
  lessons,
}: ClassVideoLibraryProps) {
  const router = useRouter();
  const { addPoints, language } = usePencily();
  const isVi = language === "vi";

  const defaultLessons = React.useMemo(() => getDefaultLessons(isVi), [isVi]);
  const effectiveLessons = lessons && lessons.length > 0 ? lessons : defaultLessons;

  const [activeLesson, setActiveLesson] = useState<VideoLesson | null>(
    effectiveLessons[0] || null
  );
  const [startSeconds, setStartSeconds] = useState(0);
  const [activeTab, setActiveTab] = useState<"transcript" | "syllabus">("transcript");
  const [transcriptSearch, setTranscriptSearch] = useState("");
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);

  // Update active lesson if effectiveLessons change
  useEffect(() => {
    if (effectiveLessons.length > 0) {
      if (!activeLesson || !effectiveLessons.some((l) => l.id === activeLesson.id)) {
        setActiveLesson(effectiveLessons[0]);
      }
    } else {
      setActiveLesson(null);
    }
  }, [effectiveLessons, activeLesson]);

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
  if (!activeLesson || effectiveLessons.length === 0) {
    return (
      <div className="w-full space-y-6 animate-fadeIn select-none">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-slate-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-amber-100/70 border-2 border-amber-300 flex items-center justify-center text-[#0F2747] shadow-2xs shrink-0">
              <BookOpen className="w-5 h-5 text-[#0F2747]" />
            </div>
            <div>
              <h2 className="font-poppins font-black text-2xl sm:text-3xl text-[#0F2747] tracking-tight">
                {language === "vi" ? "Thư viện bài học" : "Lesson Library"}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === "vi"
                  ? "Kho lưu trữ video và bản ghi hình các buổi học trực tuyến từ Peer Tutors The Pencily."
                  : "Archive of recorded peer tutoring sessions and transcripts from The Pencily mentors."}
              </p>
            </div>
          </div>

          {onOpenExchangeShop && (
            <button
              onClick={onOpenExchangeShop}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-sm bg-white hover:bg-[#FFF9EF] border-2 border-amber-400 text-[#0F2747] text-xs font-bold transition shadow-2xs cursor-pointer active:scale-95 shrink-0 self-start sm:self-auto"
            >
              <Gift className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>{language === "vi" ? "Cửa Hàng Đổi Quà PP →" : "PP Rewards Shop →"}</span>
            </button>
          )}
        </div>

        {/* Clean, authentic empty state */}
        <div className="bg-white rounded-md p-8 sm:p-14 border-2 border-slate-300 shadow-2xs text-center space-y-6">
          <OwlMascot size="lg" className="mx-auto" />

          <div className="max-w-xl mx-auto space-y-2.5">
            <h3 className="font-poppins font-bold text-xl sm:text-2xl text-[#0F2747]">
              {language === "vi"
                ? "Chưa có tài liệu hay video nào trong Thư viện"
                : "No video lessons in the library yet"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {language === "vi"
                ? "The Pencily đang trong giai đoạn khởi động các lớp học tương tác đầu tiên. Sau mỗi buổi học online cùng Peer Tutor được ghi hình và kiểm duyệt nội dung, video bài giảng cùng toàn bộ bản ghi lời sẽ tự động xuất bản tại thư viện!"
                : "The Pencily is launching its first cohort of live peer sessions. Once recorded and verified, full video lessons and transcripts will be automatically published here!"}
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            {onGoToClasses && (
              <button
                onClick={onGoToClasses}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-sm bg-[#0F2747] hover:bg-[#1E3A8A] text-white text-xs sm:text-sm font-bold shadow-xs active:scale-95 transition cursor-pointer border-2 border-slate-700"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>{language === "vi" ? "Khám phá các phòng học đang mở" : "Explore live study rooms"}</span>
              </button>
            )}

            <a
              href="https://discord.gg/6hpEf4wC4z"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] border-2 border-slate-300 text-xs sm:text-sm font-semibold shadow-2xs active:scale-95 transition cursor-pointer"
            >
              <span>{language === "vi" ? "Tham gia máy chủ Discord" : "Join Discord Server"}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  // When real video lessons exist: render full player
  const isCompleted = completedLessonIds.includes(activeLesson.id);
  const filteredTranscript = activeLesson.transcript.filter(
    (item) =>
      item.text.toLowerCase().includes(transcriptSearch.toLowerCase()) ||
      item.speaker.toLowerCase().includes(transcriptSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn w-full select-none">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-slate-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-sm bg-amber-100/70 border-2 border-amber-300 flex items-center justify-center text-[#0F2747] shadow-2xs shrink-0">
            <BookOpen className="w-5 h-5 text-[#0F2747]" />
          </div>
          <div>
            <h2 className="font-poppins font-black text-2xl sm:text-3xl text-[#0F2747] tracking-tight">
              {language === "vi" ? "Thư viện bài học" : "Lesson Library"}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === "vi" ? (
                <>
                  Xem lại các buổi học ghi hình từ Peer Tutors. Mỗi buổi học hoàn thành bạn nhận được{" "}
                  <strong className="text-amber-700 font-bold">+5 PP</strong> để đổi đặc quyền học thuật.
                </>
              ) : (
                <>
                  Review recorded peer tutoring sessions. Each completed lesson awards you{" "}
                  <strong className="text-amber-700 font-bold">+5 PP</strong> to redeem academic perks.
                </>
              )}
            </p>
          </div>
        </div>

        {onOpenExchangeShop && (
          <button
            onClick={onOpenExchangeShop}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-sm bg-white hover:bg-[#FFF9EF] border-2 border-amber-400 text-[#0F2747] text-xs font-bold transition shadow-2xs cursor-pointer active:scale-95 shrink-0"
          >
            <Gift className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>{language === "vi" ? "Mở Cửa Hàng Đổi Quà PP →" : "Open PP Rewards Shop →"}</span>
          </button>
        )}
      </div>

      {/* 2-COLUMN YOUTUBE THEATER LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* LEFT MAIN THEATER */}
        <div className="lg:col-span-8 space-y-5">
          {/* 1. YOUTUBE EMBED PLAYER */}
          <div className="bg-white rounded-md border-2 border-[#F59E0B] shadow-sm overflow-hidden">
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
            <div className="p-4 sm:p-5 bg-white border-t-2 border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-sm bg-amber-100 text-amber-900 border border-amber-200">
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
                  <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-sm bg-emerald-50 border-2 border-emerald-300 text-emerald-800 text-xs font-bold shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{language === "vi" ? "Đã nhận +5 PP buổi học" : "+5 PP Awarded"}</span>
                  </div>
                ) : (
                  <button
                    onClick={handleClaimPoints}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition active:scale-95 shadow-md cursor-pointer border-2 border-amber-600"
                    title="Bấm để ghi nhận đã tham gia học và nhận điểm thưởng"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{language === "vi" ? "Điểm danh học (+5 PP)" : "Claim Attendance (+5 PP)"}</span>
                  </button>
                )}
              </div>
            </div>

            {/* 2. TUTOR PROFILE CARD */}
            <div className="p-4 sm:p-5 bg-[#FFFDF9] border-t-2 border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-13 h-13 rounded-sm overflow-hidden border-2 border-amber-300 shadow-xs shrink-0">
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
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-blue-100 text-[#0F2747] border border-blue-200">
                        Peer Tutor
                      </span>
                      {activeLesson.tutor.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-amber-100 text-amber-900 border border-amber-300">
                          {activeLesson.tutor.badge}
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-slate-600 mt-0.5">
                      <span>{activeLesson.tutor.school}</span>
                      <span className="mx-1.5 text-slate-300">/</span>
                      <span>{activeLesson.tutor.grade}</span>
                      <span className="mx-1.5 text-slate-300">/</span>
                      <span className="font-semibold text-amber-700">
                        {language === "vi" ? `Đã dạy ${activeLesson.tutor.sessions} buổi` : `${activeLesson.tutor.sessions} sessions taught`}
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
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white hover:bg-slate-100 text-[#0F2747] border-2 border-slate-300 text-xs font-bold transition shadow-2xs cursor-pointer active:scale-95"
                    title="Xem trang cá nhân của gia sư"
                  >
                    <span>{language === "vi" ? "Xem hồ sơ" : "View Profile"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 3. TRANSCRIPTION & SYLLABUS TABS */}
          <div className="bg-white rounded-md border-2 border-slate-300 shadow-2xs overflow-hidden">
            <div className="flex items-center justify-between border-b-2 border-slate-200 bg-[#FFF9EF]/80 px-4 sm:px-6">
              <div className="flex items-center gap-2 sm:gap-4">
                <button
                  onClick={() => setActiveTab("transcript")}
                  className={`py-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition cursor-pointer -mb-[2px] ${
                    activeTab === "transcript"
                      ? "border-[#F59E0B] text-[#0F2747]"
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <FileText className="w-4 h-4 text-[#F59E0B]" />
                  <span>{language === "vi" ? "Bản ghi lời" : "Transcript"}</span>
                </button>

                <button
                  onClick={() => setActiveTab("syllabus")}
                  className={`py-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition cursor-pointer -mb-[2px] ${
                    activeTab === "syllabus"
                      ? "border-[#F59E0B] text-[#0F2747]"
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-[#4F7ECB]" />
                  <span>
                    {language === "vi"
                      ? `Các chặng bài học (${activeLesson.syllabus.length})`
                      : `Chapters (${activeLesson.syllabus.length})`}
                  </span>
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                <span>{language === "vi" ? "💡 Bấm nút" : "💡 Click"}</span>
                <span className="px-1.5 py-0.5 rounded-xs bg-slate-200 text-slate-800 font-bold text-[10px]">
                  CC
                </span>
                <span>{language === "vi" ? "trên YouTube để xem phụ đề" : "on YouTube for captions"}</span>
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
                    placeholder={language === "vi" ? "Tìm kiếm từ khóa trong bản ghi lời..." : "Search keywords in transcript..."}
                    className="w-full pl-9 pr-4 py-2 rounded-sm bg-slate-50 border-2 border-slate-300 text-xs text-[#0F2747] placeholder:text-slate-400 focus:outline-none focus:border-[#0F2747] focus:bg-white transition"
                  />
                  {transcriptSearch && (
                    <button
                      onClick={() => setTranscriptSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
                    >
                      {language === "vi" ? "Xóa" : "Clear"}
                    </button>
                  )}
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                  {filteredTranscript.length === 0 ? (
                    <div className="text-center py-8 text-xs text-slate-400">
                      {language === "vi"
                        ? `Không tìm thấy đoạn ghi âm nào chứa từ khóa "${transcriptSearch}".`
                        : `No transcript matches for "${transcriptSearch}".`}
                    </div>
                  ) : (
                    filteredTranscript.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleSeek(item.seconds)}
                        className="w-full text-left p-3 rounded-sm hover:bg-[#FFF9EF] border-2 border-transparent hover:border-amber-300 transition flex items-start gap-3 group cursor-pointer"
                        title={`Bấm để tua video đến mốc ${item.time}`}
                      >
                        <span className="font-mono font-bold text-xs text-[#4F7ECB] bg-blue-50 px-2 py-0.5 rounded-sm group-hover:bg-[#4F7ECB] group-hover:text-white transition-colors shrink-0">
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
                          {language === "vi" ? "Tua tới →" : "Seek →"}
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
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider pb-1 border-b-2 border-slate-100">
                  {language === "vi" ? "Mục lục các chặng kiến thức chính:" : "Key Knowledge Chapters:"}
                </div>
                <div className="space-y-2">
                  {activeLesson.syllabus.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSeek(item.seconds)}
                      className="w-full text-left p-3.5 rounded-sm bg-slate-50 hover:bg-[#FFF9EF] border-2 border-slate-200 hover:border-amber-400 transition flex items-start justify-between gap-3 group cursor-pointer"
                    >
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-[#4F7ECB] bg-blue-50 px-2 py-0.5 rounded-sm group-hover:bg-[#4F7ECB] group-hover:text-white transition-colors">
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
                        {language === "vi" ? "Tua tới →" : "Seek →"}
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
          <div className="bg-white rounded-md border-2 border-slate-300 shadow-2xs overflow-hidden">
            <div className="p-4 bg-[#FFF9EF] border-b-2 border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ListVideo className="w-4 h-4 text-[#F59E0B]" />
                <h3 className="font-poppins font-bold text-sm text-[#0F2747]">
                  {language === "vi" ? `Danh sách bài học (${effectiveLessons.length})` : `Lessons (${effectiveLessons.length})`}
                </h3>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">
                {language === "vi" ? "Chọn video để xem" : "Select to watch"}
              </span>
            </div>

            <div className="divide-y divide-slate-100 max-h-[750px] overflow-y-auto">
              {effectiveLessons.map((lesson) => {
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
                    <div className="relative w-28 aspect-video rounded-sm overflow-hidden bg-slate-900 shrink-0 border-2 border-slate-200 shadow-2xs group-hover:shadow-xs transition">
                      <img
                        src={`https://img.youtube.com/vi/${lesson.youtubeId}/mqdefault.jpg`}
                        alt={lesson.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        loading="lazy"
                      />
                      <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-xs bg-black/80 text-white font-mono font-bold text-[10px]">
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
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-700">
                          {lesson.subject}
                        </span>
                        {isLessonDone && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-sm flex items-center gap-0.5">
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
                        <span>/</span>
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
