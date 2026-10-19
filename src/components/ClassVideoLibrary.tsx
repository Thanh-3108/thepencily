"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Gauge,
  Settings,
  Maximize,
  Minimize,
  HelpCircle,
  Check,
  CheckCircle2,
  XCircle,
  RotateCcw,
  RefreshCw,
  Sparkles,
  Share2,
  Layers,
  Award,
  BookOpen,
  FileText,
  Search,
  GraduationCap,
  Gift,
  ChevronRight,
} from "lucide-react";
import { usePencily } from "@/context/PencilyContext";

// Declare YT window global
declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

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

export interface MilestoneOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface VideoMilestone {
  id: string;
  seconds: number;
  timeFormatted: string;
  title: string;
  question: string;
  options: MilestoneOption[];
  points: number;
  hint?: string;
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
  gradeLevel: string;
  tutor: TutorInfo;
  syllabus: SyllabusChapter[];
  transcript: VideoTranscriptItem[];
  milestones: VideoMilestone[];
}

export const QUALITY_LABELS: Record<string, { label: string; badge?: string }> = {
  auto: { label: "Tự động", badge: "Auto" },
  default: { label: "Tự động", badge: "Auto" },
  hd1080: { label: "1080p", badge: "Full HD" },
  hd720: { label: "720p", badge: "HD" },
  large: { label: "480p", badge: "SD" },
  medium: { label: "360p" },
  small: { label: "240p" },
  tiny: { label: "144p" },
};

// 1 SINGLE MASTER LESSON: NEVER GONNA GIVE YOU UP (Rick Astley)
export function getDefaultLessons(isVi: boolean): VideoLesson[] {
  return [
    {
      id: "rick-astley-never-gonna-give-you-up",
      youtubeId: "dQw4w9WgXcQ",
      title: isVi
        ? "Rick Astley - Never Gonna Give You Up (Bài Học Mẫu / Interactive Lesson)"
        : "Rick Astley - Never Gonna Give You Up (Interactive Sample Lesson)",
      duration: "3:33",
      totalSeconds: 213,
      subject: isVi ? "Kỹ Năng & Động Lực Học Tập" : "Motivation & Resilience",
      gradeLevel: isVi ? "Bài giảng Tương tác Mẫu The Pencily" : "The Pencily Interactive Masterclass",
      tutor: {
        name: "Rick Astley",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
        school: isVi ? "Học Viện Âm Nhạc & Cố Vấn Tinh Thần The Pencily" : "The Pencily Music Academy & Senior Mentor",
        grade: isVi ? "Cố Vấn Truyền Cảm Hứng Danh Dự" : "Honorary Inspirational Mentor",
        bio: isVi
          ? "Tác giả của bài hát bất hủ 'Never Gonna Give You Up'. Bài giảng mẫu tương tác với các cột mốc kiểm tra kiến thức về tinh thần kiên trì, cam kết không bỏ cuộc và bộ quy tắc danh dự The Pencily."
          : "Creator of the iconic anthem 'Never Gonna Give You Up'. Interactive masterclass exploring persistence, commitment and the honor code.",
        sessions: 1987,
        specialty: isVi ? "Động lực kiên trì & Tinh thần bất bại" : "Resilience & Never Giving Up",
        badge: isVi ? "Huyền Thoại (Legendary)" : "Legendary",
      },
      syllabus: [
        {
          id: "ch-1",
          title: isVi ? "1. Khúc dạo đầu & Giới thiệu nguyên tắc học tập" : "1. Introduction & Core Principles",
          time: "0:18",
          seconds: 18,
          summary: "We're no strangers to love, you know the rules and so do I...",
        },
        {
          id: "ch-2",
          title: isVi ? "2. Điệp khúc cốt lõi: Cam kết không bao giờ bỏ cuộc" : "2. Core Chorus: Never Give Up",
          time: "0:43",
          seconds: 43,
          summary: "Never gonna give you up, never gonna let you down, never gonna run around and desert you!",
        },
        {
          id: "ch-3",
          title: isVi ? "3. Điệp khúc 2: Tinh thần kiên trì & Thấu hiểu mục tiêu" : "3. Chorus 2: Perseverance & Vision",
          time: "1:34",
          seconds: 94,
          summary: "We've known each other for so long, inside we both know what's been going on...",
        },
        {
          id: "ch-4",
          title: isVi ? "4. Điệp khúc cao trào & Lời cam kết danh dự" : "4. Climax Chorus & Honor Code",
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
        { time: "3:00", seconds: 180, speaker: "Rick Astley", text: "Never gonna make you cry, never gonna say goodbye, never gonna tell a lie and hurt you!" },
      ],
      milestones: [
        {
          id: "m-1",
          seconds: 43,
          timeFormatted: "0:43",
          title: isVi ? "Cột mốc 1: Điệp khúc cốt lõi (0:43)" : "Milestone 1: The Core Chorus (0:43)",
          question: isVi
            ? "Tại điệp khúc kinh điển bắt đầu ở giây 0:43, Rick Astley đã đưa ra lời hứa hẹn cốt lõi nào đầu tiên?"
            : "At the iconic chorus at 0:43, what is Rick Astley's primary promise?",
          options: [
            {
              id: "opt-1a",
              text: "Never gonna give you up, never gonna let you down",
              isCorrect: true,
              explanation: isVi
                ? "Chính xác! Lời hứa bất hủ 'Never gonna give you up, never gonna let you down' là cam kết kiên trì nổi tiếng nhất thế giới!"
                : "Correct! 'Never gonna give you up, never gonna let you down' is the worldwide anthem of loyalty and dedication!",
            },
            {
              id: "opt-1b",
              text: "Always gonna give you up, always gonna let you down",
              isCorrect: false,
              explanation: isVi ? "Chưa đúng. Rick Astley cam kết 'Never' chứ không phải 'Always'!" : "Incorrect. Rick promises 'Never', not 'Always'!",
            },
            {
              id: "opt-1c",
              text: "Never gonna dance again, guilty feet have got no rhythm",
              isCorrect: false,
              explanation: isVi ? "Chưa đúng. Đây là bài Careless Whisper của George Michael!" : "Incorrect. That's Careless Whisper by George Michael!",
            },
            {
              id: "opt-1d",
              text: "Don't stop believin', hold on to that feelin'",
              isCorrect: false,
              explanation: isVi ? "Chưa đúng. Đây là bài hát của Journey!" : "Incorrect. That's Journey's Don't Stop Believin'!",
            },
          ],
          points: 5,
          hint: isVi ? "Gợi ý: Tên của bài hát chính là câu mở đầu điệp khúc." : "Hint: The song title is the first line of the chorus.",
        },
        {
          id: "m-2",
          seconds: 94,
          timeFormatted: "1:34",
          title: isVi ? "Cột mốc 2: Tinh thần kiên trì trong học tập (1:34)" : "Milestone 2: Perseverance in Learning (1:34)",
          question: isVi
            ? "Thông điệp cốt lõi của 'Never Gonna Give You Up' khi áp dụng vào tinh thần học tập tại The Pencily là gì?"
            : "How does the message of 'Never Gonna Give You Up' apply to learning at The Pencily?",
          options: [
            {
              id: "opt-2a",
              text: isVi
                ? "Kiên trì tới cùng, không bao giờ bỏ cuộc trước các bài toán khó và thử thách học thuật"
                : "Persevere relentlessly; never give up when facing tough academic challenges",
              isCorrect: true,
              explanation: isVi
                ? "Chính xác! Tinh thần 'Never give up' của Rick Astley chính là kim chỉ nam cho học sinh The Pencily khi ôn luyện thi và giải đề."
                : "Correct! The 'Never give up' mindset empowers The Pencily peers to conquer difficult exams and concepts.",
            },
            {
              id: "opt-2b",
              text: isVi ? "Gặp bài khó thì lập tức tắt máy đi ngủ" : "Give up immediately when encountering difficult problems",
              isCorrect: false,
              explanation: isVi ? "Chưa đúng. Tinh thần của The Pencily là học tập chủ động và tương trợ lẫn nhau!" : "Incorrect. The Pencily stands for active peer collaboration!",
            },
            {
              id: "opt-2c",
              text: isVi ? "Chỉ học khi có thưởng đồ ăn" : "Only study when bribed with snacks",
              isCorrect: false,
              explanation: isVi ? "Chưa đúng. Động lực học tập phải xuất phát từ mục tiêu tri thức của bản thân." : "Incorrect. Motivation comes from personal growth.",
            },
            {
              id: "opt-2d",
              text: isVi ? "Không cần tự học vì đã có người giải hộ" : "Rely entirely on others to do homework",
              isCorrect: false,
              explanation: isVi ? "Chưa đúng. The Pencily khuyến khích tư duy phản biện độc lập." : "Incorrect. Independence and peer synergy are core.",
            },
          ],
          points: 5,
          hint: isVi ? "Hãy chọn phương án thể hiện tinh thần kiên trì và tích cực nhất." : "Choose the option representing resilience.",
        },
        {
          id: "m-3",
          seconds: 136,
          timeFormatted: "2:16",
          title: isVi ? "Cột mốc 3: Lời cam kết Danh dự (2:16)" : "Milestone 3: The Honor Code (2:16)",
          question: isVi
            ? "Ở đoạn chuyển tiếp (Bridge) tại phút 2:16, câu hát nào sau đây thể hiện sự trung thực và tôn trọng?"
            : "In the bridge at 2:16, which line expresses honesty and mutual respect?",
          options: [
            {
              id: "opt-3a",
              text: "Never gonna tell a lie and hurt you",
              isCorrect: true,
              explanation: isVi
                ? "Chính xác! 'Never gonna tell a lie and hurt you' - cam kết trung thực tuyệt đối, tương đồng với Bộ Quy tắc Danh dự (Honor Code) của The Pencily!"
                : "Correct! 'Never gonna tell a lie and hurt you' aligns perfectly with The Pencily academic Honor Code!",
            },
            {
              id: "opt-3b",
              text: "Tell me why, ain't nothing but a heartache",
              isCorrect: false,
              explanation: isVi ? "Chưa đúng. Đây là bài I Want It That Way của Backstreet Boys!" : "Incorrect. That's Backstreet Boys!",
            },
            {
              id: "opt-3c",
              text: "We will, we will rock you",
              isCorrect: false,
              explanation: isVi ? "Chưa đúng. Đây là bài hát của Queen!" : "Incorrect. That's Queen!",
            },
            {
              id: "opt-3d",
              text: "Is this the real life, is this just fantasy",
              isCorrect: false,
              explanation: isVi ? "Chưa đúng. Đây là Bohemian Rhapsody!" : "Incorrect. That's Bohemian Rhapsody!",
            },
          ],
          points: 5,
          hint: isVi ? "Câu hát nhấn mạnh tính trung thực (tell a lie)." : "Line emphasizes honesty.",
        },
      ],
    },
  ];
}

// ==========================================
// UNIFORM VIDEO CONTROLS (1 THANH ĐỒNG NHẤT DUY NHẤT)
// ==========================================
interface UniformVideoControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackRate: number;
  isMuted: boolean;
  milestones: VideoMilestone[];
  solvedMilestoneIds: string[];
  currentQuality: string;
  availableQualities: string[];
  autoPauseAtMilestone: boolean;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  onChangeSpeed: (speed: number) => void;
  onToggleMute: () => void;
  onToggleFullscreen: () => void;
  onMilestoneClick: (milestone: VideoMilestone) => void;
  onSelectQuality: (quality: string) => void;
  onToggleAutoPause: () => void;
}

export const UniformVideoControls: React.FC<UniformVideoControlsProps> = ({
  isPlaying,
  currentTime,
  duration,
  playbackRate,
  isMuted,
  milestones,
  solvedMilestoneIds,
  currentQuality,
  availableQualities,
  autoPauseAtMilestone,
  onTogglePlay,
  onSeek,
  onChangeSpeed,
  onToggleMute,
  onToggleFullscreen,
  onMilestoneClick,
  onSelectQuality,
  onToggleAutoPause,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const settingsMenuRef = useRef<HTMLDivElement>(null);

  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [settingsView, setSettingsView] = useState<"main" | "quality" | "speed">("main");

  // Close settings popover when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (settingsMenuRef.current && !settingsMenuRef.current.contains(e.target as Node)) {
        setIsSettingsOpen(false);
        setSettingsView("main");
      }
    };
    if (isSettingsOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isSettingsOpen]);

  const progressPercent = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current || duration <= 0) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clickRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    onSeek(clickRatio * duration);
  };

  const currentQualityDisplay = useMemo(() => {
    const info = QUALITY_LABELS[currentQuality];
    if (info) {
      return info.badge ? `${info.label} (${info.badge})` : info.label;
    }
    return currentQuality || "Tự động";
  }, [currentQuality]);

  // Build selectable quality list
  const qualityList = useMemo(() => {
    const standardKeys = ["auto", "hd1080", "hd720", "large", "medium", "small"];
    const merged = Array.from(new Set(["auto", ...(availableQualities.length > 0 ? availableQualities : standardKeys)]));
    return merged.map((key) => {
      const meta = QUALITY_LABELS[key] || { label: key };
      return {
        id: key,
        label: meta.label,
        badge: meta.badge,
      };
    });
  }, [availableQualities]);

  const speedList = [0.75, 1, 1.25, 1.5, 2];

  return (
    /* Thanh điều khiển đồng nhất (1 hàng ngang duy nhất ở đáy video) */
    <div className="relative w-full bg-[#1e1e1e]/95 backdrop-blur-sm px-4 py-2.5 flex items-center gap-4 text-white select-none z-20 border-t border-white/10">
      {/* 1. Nút Play / Pause */}
      <button
        onClick={onTogglePlay}
        className="hover:text-amber-400 transition-colors focus:outline-none shrink-0 cursor-pointer"
        title={isPlaying ? "Tạm dừng" : "Phát"}
      >
        {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
      </button>

      {/* 2. Thanh Timeline duy nhất (tích hợp cả tiến độ lẫn các cột mốc) */}
      <div
        ref={trackRef}
        onClick={handleTrackClick}
        className="relative flex-1 h-5 flex items-center cursor-pointer group"
      >
        {/* Nền thanh timeline */}
        <div className="w-full h-1.5 bg-white/25 rounded-full overflow-visible relative">
          {/* Phần thời lượng đã phát */}
          <div
            className="h-full bg-white rounded-full transition-all duration-75"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Các cột mốc câu hỏi (Milestones) ghim trực tiếp lên thanh timeline này */}
        {duration > 0 &&
          milestones.map((m) => {
            const leftPercent = Math.min(Math.max((m.seconds / duration) * 100, 0), 100);
            const isCompleted = solvedMilestoneIds.includes(m.id);

            return (
              <button
                key={m.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onMilestoneClick(m);
                }}
                style={{ left: `${leftPercent}%` }}
                className={`absolute -translate-x-1/2 z-10 w-4 h-5 rounded-sm flex items-center justify-center border transition-transform hover:scale-125 cursor-pointer shadow-xs ${
                  isCompleted
                    ? "bg-emerald-500 border-emerald-300 text-slate-950"
                    : "bg-amber-400 border-amber-600 text-slate-950"
                }`}
                title={`Cột mốc tại ${m.timeFormatted}: ${m.title} (${isCompleted ? "Đã xong" : "Chưa làm"})`}
              >
                {isCompleted ? (
                  <Check className="w-3 h-3 stroke-[3]" />
                ) : (
                  <HelpCircle className="w-3 h-3 stroke-[2.5]" />
                )}
              </button>
            );
          })}

        {/* Con chạy (Thumb) kiểu chữ nhật có vạch khía như ảnh mẫu */}
        <div
          style={{ left: `${progressPercent}%` }}
          className="absolute -translate-x-1/2 z-20 w-3.5 h-4 bg-white rounded-[3px] shadow-md flex items-center justify-center gap-[1.5px] pointer-events-none transition-transform group-hover:scale-110"
        >
          <span className="w-[1px] h-2 bg-neutral-400" />
          <span className="w-[1px] h-2 bg-neutral-400" />
          <span className="w-[1px] h-2 bg-neutral-400" />
        </div>
      </div>

      {/* 3. Thời gian hiện tại / Tổng thời lượng */}
      <div className="text-xs font-medium tabular-nums tracking-tight whitespace-nowrap shrink-0">
        <span className="text-white font-semibold">{formatTime(currentTime)}</span>
        <span className="text-white/60"> / {formatTime(duration)}</span>
      </div>

      {/* 4. Cụm nút chức năng bên phải: Tốc độ, Âm lượng, Cài đặt, Fullscreen */}
      <div className="flex items-center gap-3 shrink-0 relative" ref={settingsMenuRef}>
        {/* Nút chu kỳ tốc độ nhanh */}
        <button
          onClick={() => {
            const nextIdx = (speedList.indexOf(playbackRate) + 1) % speedList.length;
            onChangeSpeed(speedList[nextIdx]);
          }}
          className="hover:text-amber-400 transition-colors flex items-center gap-1 text-xs font-semibold cursor-pointer"
          title={`Tốc độ phát: ${playbackRate}x (Bấm để đổi)`}
        >
          <Gauge className="w-4 h-4" />
          <span>{playbackRate}x</span>
        </button>

        {/* Nút bật/tắt tiếng */}
        <button
          onClick={onToggleMute}
          className="hover:text-amber-400 transition-colors cursor-pointer"
          title={isMuted ? "Bật tiếng" : "Tắt tiếng"}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Nút Cài đặt (Mở menu chất lượng & tùy chọn xịn xò) */}
        <button
          onClick={() => {
            setIsSettingsOpen(!isSettingsOpen);
            setSettingsView("main");
          }}
          className={`hover:text-amber-400 transition-colors cursor-pointer p-1 rounded-xs ${
            isSettingsOpen ? "text-amber-400 bg-white/10" : ""
          }`}
          title="Cài đặt chất lượng video & tùy chọn"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* Nút Toàn màn hình */}
        <button
          onClick={onToggleFullscreen}
          className="hover:text-amber-400 transition-colors cursor-pointer"
          title="Toàn màn hình"
        >
          <Maximize className="w-4 h-4" />
        </button>

        {/* FLOATING SETTINGS & QUALITY POPOVER MENU */}
        {isSettingsOpen && (
          <div className="absolute bottom-11 right-0 z-50 w-64 bg-[#18181b]/98 backdrop-blur-md rounded-md border border-white/15 shadow-2xl overflow-hidden text-xs select-none animate-fadeIn">
            {/* Header */}
            <div className="px-3 py-2 bg-white/5 border-b border-white/10 flex items-center justify-between font-bold text-slate-200">
              <div className="flex items-center gap-1.5">
                <Settings className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {settingsView === "main"
                    ? "Cài đặt trình phát"
                    : settingsView === "quality"
                    ? "Chất lượng video"
                    : "Tốc độ phát"}
                </span>
              </div>
              {settingsView !== "main" && (
                <button
                  onClick={() => setSettingsView("main")}
                  className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
                >
                  ← Quay lại
                </button>
              )}
            </div>

            {/* MAIN SETTINGS MENU */}
            {settingsView === "main" && (
              <div className="p-1 space-y-0.5">
                {/* 1. Chất lượng video */}
                <button
                  type="button"
                  onClick={() => setSettingsView("quality")}
                  className="w-full px-3 py-2 rounded-xs hover:bg-white/10 flex items-center justify-between text-left transition cursor-pointer"
                >
                  <span className="text-slate-300">Chất lượng</span>
                  <div className="flex items-center gap-1 text-slate-400">
                    <span className="text-[11px] text-amber-400 font-bold">{currentQualityDisplay}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </button>

                {/* 2. Tốc độ phát */}
                <button
                  type="button"
                  onClick={() => setSettingsView("speed")}
                  className="w-full px-3 py-2 rounded-xs hover:bg-white/10 flex items-center justify-between text-left transition cursor-pointer"
                >
                  <span className="text-slate-300">Tốc độ phát</span>
                  <div className="flex items-center gap-1 text-slate-400">
                    <span className="text-[11px] text-amber-400 font-bold">{playbackRate === 1 ? "Chuẩn (1.0x)" : `${playbackRate}x`}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </button>

                {/* 3. Tự dừng khi gặp cột mốc câu hỏi */}
                <div className="px-3 py-2 rounded-xs flex items-center justify-between text-left border-t border-white/10 mt-1 pt-1.5">
                  <div className="space-y-0.5">
                    <span className="text-slate-300 block text-[11px]">Tự dừng khi gặp câu hỏi</span>
                    <span className="text-[10px] text-slate-500 block">Dừng video để học sinh làm bài tập</span>
                  </div>
                  <button
                    type="button"
                    onClick={onToggleAutoPause}
                    className={`w-8 h-4 rounded-xs border transition-colors cursor-pointer relative shrink-0 ${
                      autoPauseAtMilestone ? "bg-amber-400 border-amber-600" : "bg-neutral-700 border-neutral-600"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-3 h-3 bg-slate-950 rounded-xs transition-transform ${
                        autoPauseAtMilestone ? "right-0.5" : "left-0.5"
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}

            {/* QUALITY SELECT SUBMENU */}
            {settingsView === "quality" && (
              <div className="p-1 max-h-56 overflow-y-auto space-y-0.5">
                {qualityList.map((q) => {
                  const isSelected = currentQuality === q.id || (q.id === "auto" && (!currentQuality || currentQuality === "default"));
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => {
                        onSelectQuality(q.id);
                        setIsSettingsOpen(false);
                      }}
                      className={`w-full px-3 py-2 rounded-xs flex items-center justify-between text-left transition cursor-pointer ${
                        isSelected ? "bg-amber-400/20 text-amber-300 font-bold" : "hover:bg-white/10 text-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isSelected ? <Check className="w-3.5 h-3.5 text-amber-400 stroke-[3]" /> : <span className="w-3.5" />}
                        <span>{q.label}</span>
                      </div>
                      {q.badge && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded-xs bg-amber-400/20 text-amber-300 font-mono font-bold">
                          {q.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* SPEED SELECT SUBMENU */}
            {settingsView === "speed" && (
              <div className="p-1 space-y-0.5">
                {speedList.map((s) => {
                  const isSelected = playbackRate === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        onChangeSpeed(s);
                        setIsSettingsOpen(false);
                      }}
                      className={`w-full px-3 py-2 rounded-xs flex items-center justify-between text-left transition cursor-pointer ${
                        isSelected ? "bg-amber-400/20 text-amber-300 font-bold" : "hover:bg-white/10 text-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isSelected ? <Check className="w-3.5 h-3.5 text-amber-400 stroke-[3]" /> : <span className="w-3.5" />}
                        <span>{s === 1 ? "Chuẩn (1.0x)" : `${s}x`}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// MAIN CLASS VIDEO LIBRARY COMPONENT
// ==========================================
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

  const defaultLessons = useMemo(() => getDefaultLessons(isVi), [isVi]);
  const effectiveLessons = lessons && lessons.length > 0 ? lessons : defaultLessons;

  // Active Lesson State
  const [activeLesson, setActiveLesson] = useState<VideoLesson>(effectiveLessons[0]);
  const [activeTab, setActiveTab] = useState<"milestones" | "transcript" | "syllabus" | "summary">("milestones");

  // Real YouTube Player State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(213);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentQuality, setCurrentQuality] = useState<string>("auto");
  const [availableQualities, setAvailableQualities] = useState<string[]>([]);
  const [autoPauseAtMilestone, setAutoPauseAtMilestone] = useState<boolean>(true);

  // Interactive Milestones State (H5P features)
  const [activeMilestone, setActiveMilestone] = useState<VideoMilestone | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [solvedMilestoneIds, setSolvedMilestoneIds] = useState<string[]>([]);
  const [claimedLessonIds, setClaimedLessonIds] = useState<string[]>([]);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [rewardToast, setRewardToast] = useState<{ message: string; points: number } | null>(null);

  // Transcript Search
  const [transcriptSearch, setTranscriptSearch] = useState<string>("");

  // Refs
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const triggeredMilestoneRef = useRef<Set<string>>(new Set());
  const lastSecondRef = useRef<number>(-1);

  // Load saved progress from localStorage
  useEffect(() => {
    try {
      const savedSolved = localStorage.getItem("pencily_solved_milestones");
      if (savedSolved) setSolvedMilestoneIds(JSON.parse(savedSolved));
      const savedClaimed = localStorage.getItem("pencily_claimed_lessons");
      if (savedClaimed) setClaimedLessonIds(JSON.parse(savedClaimed));
    } catch {
      // ignore
    }
  }, []);

  // Update activeLesson when defaultLessons changes
  useEffect(() => {
    if (effectiveLessons.length > 0) {
      setActiveLesson(effectiveLessons[0]);
    }
  }, [effectiveLessons]);

  // INITIALIZE YOUTUBE IFRAME API (controls: 0, disablekb: 1, modestbranding: 1)
  useEffect(() => {
    let isMounted = true;

    const setupPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      // Destroy existing player if any
      try {
        if (playerRef.current && typeof playerRef.current.destroy === "function") {
          playerRef.current.destroy();
          playerRef.current = null;
        }
      } catch (e) {}

      const container = document.getElementById("pencily-yt-iframe-container");
      if (!container) return;

      playerRef.current = new window.YT.Player("pencily-yt-iframe-container", {
        videoId: activeLesson.youtubeId,
        width: "100%",
        height: "100%",
        playerVars: {
          controls: 0, // Tắt hoàn toàn thanh timeline màu đỏ mặc định của YouTube
          disablekb: 1, // Tắt phím tắt mặc định của YouTube để tránh xung đột
          fs: 0, // Dùng nút Fullscreen của container thay vì của iframe
          iv_load_policy: 3, // Ẩn annotations
          modestbranding: 1, // Giảm thiểu logo YouTube
          rel: 0, // Hạn chế gợi ý video ngoài kênh khi tạm dừng
          playsinline: 1,
          autoplay: 0,
          enablejsapi: 1,
          cc_load_policy: 0, // Tắt hiển thị phụ đề mặc định
          origin: typeof window !== "undefined" ? window.location.origin : undefined,
        },
        events: {
          onReady: (event: any) => {
            if (!isMounted) return;
            const dur = event.target.getDuration();
            if (dur && dur > 0) {
              setDuration(Math.floor(dur));
            }
            // Fetch available qualities
            if (typeof event.target.getAvailableQualityLevels === "function") {
              const qLevels = event.target.getAvailableQualityLevels();
              if (Array.isArray(qLevels) && qLevels.length > 0) {
                setAvailableQualities(qLevels);
              }
            }
            if (typeof event.target.getPlaybackQuality === "function") {
              const currentQ = event.target.getPlaybackQuality();
              if (currentQ) setCurrentQuality(currentQ);
            }
          },
          onStateChange: (event: any) => {
            if (!isMounted) return;
            // 1: PLAYING, 2: PAUSED, 0: ENDED
            if (event.data === 1) {
              setIsPlaying(true);
              if (typeof event.target.getPlaybackQuality === "function") {
                const currentQ = event.target.getPlaybackQuality();
                if (currentQ) setCurrentQuality(currentQ);
              }
            } else if (event.data === 2) {
              setIsPlaying(false);
            } else if (event.data === 0) {
              setIsPlaying(false);
              try {
                // Ngăn chặn YouTube tự ý hiển thị lưới 12 video gợi ý ở màn hình kết thúc
                event.target.pauseVideo();
                event.target.seekTo(0, true);
              } catch (e) {}
              const dur = event.target.getDuration();
              if (dur > 0) setCurrentTime(Math.floor(dur));
              setActiveTab("summary");
            }
          },
        },
      });
    };

    if (typeof window !== "undefined") {
      if (!window.YT) {
        const tag = document.createElement("script");
        tag.id = "yt-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
          if (isMounted) setupPlayer();
        };
      } else {
        setupPlayer();
      }
    }

    return () => {
      isMounted = false;
      try {
        if (playerRef.current && typeof playerRef.current.destroy === "function") {
          playerRef.current.destroy();
          playerRef.current = null;
        }
      } catch (e) {}
    };
  }, [activeLesson.id, activeLesson.youtubeId]);

  // HIGH-PRECISION PLAYHEAD SYNC LOOP (Direct from YouTube engine, ZERO fake increments)
  useEffect(() => {
    let animId: number;

    const checkPlayhead = () => {
      const player = playerRef.current;
      if (player && typeof player.getCurrentTime === "function") {
        try {
          const state = player.getPlayerState();
          if (state === 1) {
            setIsPlaying(true);
            const rawTime = player.getCurrentTime();
            const rawDur = player.getDuration();
            if (rawDur && rawDur > 0) {
              setDuration(Math.floor(rawDur));
            }

            const currentSecond = Math.floor(rawTime);
            setCurrentTime(currentSecond);

            // Milestone Check (Only once per integer second):
            if (currentSecond !== lastSecondRef.current) {
              lastSecondRef.current = currentSecond;

              // Check if any milestone falls on this exact second and autoPause is enabled
              if (autoPauseAtMilestone) {
                const hitMilestone = activeLesson.milestones.find(
                  (m) =>
                    m.seconds === currentSecond &&
                    !triggeredMilestoneRef.current.has(m.id) &&
                    !solvedMilestoneIds.includes(m.id)
                );

                if (hitMilestone) {
                  triggeredMilestoneRef.current.add(hitMilestone.id);
                  player.pauseVideo();
                  setIsPlaying(false);
                  setActiveMilestone(hitMilestone);
                  setSelectedOptionId(null);
                  setIsAnswerSubmitted(false);
                  setIsAnswerCorrect(null);
                  setShowHint(false);
                }
              }
            }
          } else if (state === 2) {
            setIsPlaying(false);
          } else if (state === 0) {
            setIsPlaying(false);
            const rawDur = player.getDuration();
            if (rawDur > 0) setCurrentTime(Math.floor(rawDur));
          }
        } catch (err) {}
      }

      animId = requestAnimationFrame(checkPlayhead);
    };

    animId = requestAnimationFrame(checkPlayhead);
    return () => cancelAnimationFrame(animId);
  }, [activeLesson, solvedMilestoneIds, autoPauseAtMilestone]);

  // Player controls
  const handlePlay = useCallback(() => {
    if (playerRef.current && typeof playerRef.current.playVideo === "function") {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  }, []);

  const handlePause = useCallback(() => {
    if (playerRef.current && typeof playerRef.current.pauseVideo === "function") {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    }
  }, []);

  const handleTogglePlay = useCallback(() => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  }, [isPlaying, handlePlay, handlePause]);

  const handleSeek = useCallback(
    (seconds: number) => {
      const target = Math.max(0, Math.min(seconds, duration));
      if (playerRef.current && typeof playerRef.current.seekTo === "function") {
        playerRef.current.seekTo(target, true);
      }
      setCurrentTime(target);
      lastSecondRef.current = Math.floor(target);

      // If user sought backwards, allow future milestones to re-trigger
      triggeredMilestoneRef.current.forEach((id) => {
        const ms = activeLesson.milestones.find((m) => m.id === id);
        if (ms && ms.seconds > target + 2) {
          triggeredMilestoneRef.current.delete(id);
        }
      });
    },
    [duration, activeLesson]
  );

  const handleSetSpeed = useCallback((speed: number) => {
    setPlaybackRate(speed);
    if (playerRef.current && typeof playerRef.current.setPlaybackRate === "function") {
      playerRef.current.setPlaybackRate(speed);
    }
  }, []);

  const handleSelectQuality = useCallback((qualityId: string) => {
    setCurrentQuality(qualityId);
    if (playerRef.current && typeof playerRef.current.setPlaybackQuality === "function") {
      playerRef.current.setPlaybackQuality(qualityId);
    }
    const meta = QUALITY_LABELS[qualityId];
    const name = meta ? (meta.badge ? `${meta.label} (${meta.badge})` : meta.label) : qualityId;
    setRewardToast({
      message: `⚙️ Đã thiết lập chất lượng video: ${name}`,
      points: 0,
    });
    setTimeout(() => setRewardToast(null), 3000);
  }, []);

  const handleToggleAutoPause = useCallback(() => {
    setAutoPauseAtMilestone((prev) => {
      const next = !prev;
      setRewardToast({
        message: next
          ? "⏸️ Đã bật: Tự động dừng tại cột mốc câu hỏi"
          : "▶️ Đã tắt: Video sẽ phát liên tục qua cột mốc",
        points: 0,
      });
      setTimeout(() => setRewardToast(null), 3000);
      return next;
    });
  }, []);

  const handleToggleMute = useCallback(() => {
    if (playerRef.current) {
      if (isMuted) {
        if (typeof playerRef.current.unMute === "function") playerRef.current.unMute();
        setIsMuted(false);
      } else {
        if (typeof playerRef.current.mute === "function") playerRef.current.mute();
        setIsMuted(true);
      }
    }
  }, [isMuted]);

  const handleToggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Click on a milestone marker on progress bar
  const handleOpenMilestone = (milestone: VideoMilestone) => {
    handlePause();
    handleSeek(milestone.seconds);
    setActiveMilestone(milestone);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setIsAnswerCorrect(null);
    setShowHint(false);
  };

  // Submit answer for interactive milestone
  const handleSubmitMilestone = () => {
    if (!activeMilestone || !selectedOptionId) return;

    const chosen = activeMilestone.options.find((o) => o.id === selectedOptionId);
    const correct = chosen ? chosen.isCorrect : false;

    setIsAnswerSubmitted(true);
    setIsAnswerCorrect(correct);

    if (correct) {
      if (!solvedMilestoneIds.includes(activeMilestone.id)) {
        const updated = [...solvedMilestoneIds, activeMilestone.id];
        setSolvedMilestoneIds(updated);
        try {
          localStorage.setItem("pencily_solved_milestones", JSON.stringify(updated));
        } catch {}

        // Award Pencily Points!
        addPoints(activeMilestone.points, `Hoàn thành bài tập tương tác: ${activeMilestone.title}`);
        setRewardToast({
          message: isVi
            ? `🎉 Chính xác! Bạn nhận được +${activeMilestone.points} PP!`
            : `🎉 Correct! You earned +${activeMilestone.points} PP!`,
          points: activeMilestone.points,
        });
        setTimeout(() => setRewardToast(null), 4000);
      }
    }
  };

  // Resume video after solving or reviewing
  const handleResumePlayback = () => {
    setActiveMilestone(null);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setIsAnswerCorrect(null);
    handlePlay();
  };

  // Rewind 15 seconds to hear teacher explain concept again
  const handleReviewLesson = () => {
    if (activeMilestone) {
      handleSeek(Math.max(0, activeMilestone.seconds - 15));
    }
    setActiveMilestone(null);
    handlePlay();
  };

  // Claim full lesson completion bonus (+5 PP)
  const handleClaimLesson = () => {
    if (claimedLessonIds.includes(activeLesson.id)) return;
    const updated = [...claimedLessonIds, activeLesson.id];
    setClaimedLessonIds(updated);
    try {
      localStorage.setItem("pencily_claimed_lessons", JSON.stringify(updated));
    } catch {}

    addPoints(5, `Hoàn thành xem toàn bộ buổi học: ${activeLesson.title}`);
    setRewardToast({
      message: isVi ? "🎓 Đã xác thực hoàn thành bài học (+5 PP)!" : "🎓 Lesson completion confirmed (+5 PP)!",
      points: 5,
    });
    setTimeout(() => setRewardToast(null), 4000);
  };

  const solvedCountInLesson = activeLesson.milestones.filter((m) =>
    solvedMilestoneIds.includes(m.id)
  ).length;
  const totalMilestonesInLesson = activeLesson.milestones.length;
  const isLessonClaimed = claimedLessonIds.includes(activeLesson.id);

  // Filtered transcript search
  const filteredTranscript = activeLesson.transcript.filter(
    (item) =>
      item.text.toLowerCase().includes(transcriptSearch.toLowerCase()) ||
      item.speaker.toLowerCase().includes(transcriptSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn w-full select-none">
      {/* 1. TOP HEADER & SHOP CALLOUT */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-slate-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-sm bg-amber-100/70 border-2 border-amber-300 flex items-center justify-center text-[#0F2747] shadow-2xs shrink-0">
            <BookOpen className="w-5 h-5 text-[#0F2747]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-poppins font-black text-2xl sm:text-3xl text-[#0F2747] tracking-tight">
                {isVi ? "Thư viện bài học tương tác" : "Interactive Lesson Library"}
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-indigo-100 text-indigo-900 border border-indigo-300">
                {isVi ? "Chuẩn H5P Interactive" : "H5P Interactive Standard"}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {isVi ? (
                <>
                  Học trực quan cùng video bài giảng và <strong>cột mốc bài tập tương tác</strong>. Video sẽ tự động dừng tại các điểm kiểm tra để bạn làm bài và nhận thưởng{" "}
                  <strong className="text-amber-700 font-bold">+5 PP</strong> mỗi câu!
                </>
              ) : (
                <>
                  Interactive video lectures with embedded quiz milestones. Videos pause at checkpoints for real-time practice and awards{" "}
                  <strong className="text-amber-700 font-bold">+5 PP</strong> per solved task!
                </>
              )}
            </p>
          </div>
        </div>

        {onOpenExchangeShop && (
          <button
            onClick={onOpenExchangeShop}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-sm bg-white hover:bg-[#FFF9EF] border-2 border-amber-400 text-[#0F2747] text-xs font-bold transition shadow-2xs cursor-pointer active:scale-95 shrink-0 self-start sm:self-auto"
          >
            <Gift className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>{isVi ? "Cửa Hàng Đổi Quà PP →" : "PP Rewards Shop →"}</span>
          </button>
        )}
      </div>

      {/* REWARD / STATUS TOAST POPUP */}
      {rewardToast && (
        <div className="p-3 bg-emerald-50 border-2 border-emerald-500 rounded-sm text-emerald-950 font-bold text-xs flex items-center justify-between shadow-md animate-fadeIn">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{rewardToast.message}</span>
          </div>
          {rewardToast.points > 0 && (
            <span className="text-[11px] bg-emerald-600 text-white px-2 py-0.5 rounded-xs font-mono">
              +{rewardToast.points} PP
            </span>
          )}
        </div>
      )}

      {/* 2. THEATER LAYOUT: 12-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* LEFT COLUMN: INTERACTIVE VIDEO PLAYER (8 COLS) */}
        <div className="lg:col-span-8 space-y-4">
          {/* THEATER BOX (UNIFORM PLAYER CONTAINER) */}
          <div
            ref={playerContainerRef}
            className="relative w-full aspect-video bg-black flex flex-col overflow-hidden rounded-md border-2 border-slate-800 shadow-xl"
          >
            {/* FLOATING TOP BADGES */}
            <div className="absolute top-3 left-3 z-15 flex items-center gap-2 pointer-events-none">
              <span className="px-2 py-0.5 rounded-xs bg-black/80 backdrop-blur-xs text-white text-[11px] font-bold border border-white/10">
                {activeLesson.title}
              </span>
              <span className="px-2 py-0.5 rounded-xs bg-amber-400/90 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-2xs">
                {solvedCountInLesson}/{totalMilestonesInLesson} {isVi ? "Cột mốc bài tập" : "Milestones"}
              </span>
            </div>

            {/* VÙNG HIỂN THỊ VIDEO */}
            <div className="relative flex-1 w-full overflow-hidden bg-black flex items-center justify-center">
              {/* LỚP CẮT CẢNH (CROP & SCALE) ĐỂ ẨN HOÀN TOÀN NÚT 'VIDEO KHÁC', LOGO VÀ WATERMARK YOUTUBE */}
              <div className="absolute inset-0 overflow-hidden flex items-center justify-center pointer-events-none">
                <div
                  style={{ transform: "scale(1.18)", transformOrigin: "50% 20%" }}
                  className="w-full h-full pointer-events-none [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:pointer-events-none"
                >
                  <div
                    id="pencily-yt-iframe-container"
                    className="w-full h-full pointer-events-none"
                  />
                </div>
              </div>

              {/* LỚP CHẮN TRONG SUỐT NHẬN CLICK ĐỂ PLAY/PAUSE MƯỢT MÀ */}
              <div
                onClick={handleTogglePlay}
                onDoubleClick={handleToggleFullscreen}
                className="absolute inset-0 z-10 cursor-pointer"
                title={isPlaying ? "Bấm để tạm dừng" : "Bấm để phát"}
              />

              {/* H5P INTERACTIVE QUESTION OVERLAY (POPS UP AT MILESTONE) */}
              {activeMilestone && (
                <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 z-30 animate-fadeIn">
                  <div className="w-full max-w-xl bg-white rounded-sm border-2 border-[#0F2747] shadow-2xl p-5 sm:p-6 space-y-4 max-h-full overflow-y-auto">
                    {/* Milestone Header */}
                    <div className="flex items-start justify-between gap-3 border-b-2 border-slate-100 pb-3">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-xs bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider">
                            {isVi ? "Cột mốc bài tập" : "Checkpoint Quiz"}
                          </span>
                          <span className="text-[11px] font-mono font-bold text-slate-500">
                            ⏱ {activeMilestone.timeFormatted}
                          </span>
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200">
                            +{activeMilestone.points} PP
                          </span>
                        </div>
                        <h4 className="font-poppins font-black text-sm sm:text-base text-[#0F2747]">
                          {activeMilestone.title}
                        </h4>
                      </div>

                      <button
                        onClick={handleResumePlayback}
                        className="text-slate-400 hover:text-slate-600 p-1 rounded-xs transition cursor-pointer"
                        title={isVi ? "Bỏ qua & Tiếp tục xem" : "Skip & Continue"}
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Question Prompt */}
                    <div className="p-3 rounded-xs bg-amber-50/70 border border-amber-200 text-xs sm:text-sm font-semibold text-[#0F2747] leading-relaxed">
                      {activeMilestone.question}
                    </div>

                    {/* Options List */}
                    <div className="space-y-2">
                      {activeMilestone.options.map((opt) => {
                        const isSelected = selectedOptionId === opt.id;
                        let optStyle = "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800";

                        if (isSelected && !isAnswerSubmitted) {
                          optStyle = "bg-amber-100/80 border-amber-500 text-[#0F2747] ring-1 ring-amber-500";
                        } else if (isAnswerSubmitted) {
                          if (opt.isCorrect) {
                            optStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-500";
                          } else if (isSelected && !opt.isCorrect) {
                            optStyle = "bg-rose-50 border-rose-400 text-rose-950";
                          }
                        }

                        return (
                          <button
                            key={opt.id}
                            disabled={isAnswerSubmitted}
                            onClick={() => setSelectedOptionId(opt.id)}
                            className={`w-full text-left p-3 rounded-xs border-2 text-xs transition flex items-start gap-2.5 cursor-pointer ${optStyle}`}
                          >
                            <span className="font-black text-slate-500 shrink-0">
                              {isSelected ? (
                                <span className="w-4 h-4 rounded-xs bg-[#0F2747] text-white flex items-center justify-center text-[10px]">
                                  ✓
                                </span>
                              ) : (
                                <span className="w-4 h-4 rounded-xs border border-slate-400 flex items-center justify-center text-[10px]">
                                  •
                                </span>
                              )}
                            </span>
                            <span className="flex-1 leading-snug">{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Feedback Explanation */}
                    {isAnswerSubmitted && (
                      <div
                        className={`p-3 rounded-xs border-2 text-xs space-y-1 ${
                          isAnswerCorrect
                            ? "bg-emerald-50 border-emerald-400 text-emerald-950"
                            : "bg-rose-50 border-rose-400 text-rose-950"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-bold">
                          {isAnswerCorrect ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>{isVi ? "Chính xác tuyệt vời! (+5 PP)" : "Excellent! Correct (+5 PP)"}</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-rose-600" />
                              <span>{isVi ? "Chưa chính xác! Hãy đọc lại lời giải dưới đây:" : "Not quite! Read the explanation below:"}</span>
                            </>
                          )}
                        </div>
                        <p className="text-[11px] leading-relaxed text-slate-700">
                          {activeMilestone.options.find((o) => o.isCorrect)?.explanation}
                        </p>
                      </div>
                    )}

                    {/* Hint */}
                    {showHint && activeMilestone.hint && !isAnswerSubmitted && (
                      <div className="p-2.5 rounded-xs bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-2">
                        <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{activeMilestone.hint}</span>
                      </div>
                    )}

                    {/* Bottom Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-200">
                      <div className="flex items-center gap-2">
                        {!isAnswerSubmitted && activeMilestone.hint && (
                          <button
                            type="button"
                            onClick={() => setShowHint(!showHint)}
                            className="text-xs text-slate-500 hover:text-slate-800 underline font-semibold cursor-pointer"
                          >
                            {showHint ? (isVi ? "Ẩn gợi ý" : "Hide hint") : (isVi ? "💡 Xem gợi ý" : "💡 Show hint")}
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={handleReviewLesson}
                          className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-[#0F2747] font-semibold cursor-pointer"
                          title={isVi ? "Tua lại 15 giây trước để nghe lại" : "Rewind 15s to re-listen"}
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>{isVi ? "Xem lại 15s trước" : "Re-watch 15s"}</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        {!isAnswerSubmitted ? (
                          <button
                            type="button"
                            disabled={!selectedOptionId}
                            onClick={handleSubmitMilestone}
                            className={`px-5 py-2 rounded-xs font-bold text-xs transition cursor-pointer shadow-xs ${
                              selectedOptionId
                                ? "bg-amber-400 hover:bg-amber-500 text-slate-950 border-2 border-amber-600 active:scale-95"
                                : "bg-slate-200 text-slate-400 border-2 border-slate-300 cursor-not-allowed"
                            }`}
                          >
                            {isVi ? "Kiểm tra đáp án" : "Check Answer"}
                          </button>
                        ) : (
                          <div className="flex items-center gap-2">
                            {!isAnswerCorrect && (
                              <button
                                type="button"
                                onClick={() => {
                                  setIsAnswerSubmitted(false);
                                  setSelectedOptionId(null);
                                }}
                                className="px-3.5 py-2 rounded-xs bg-white hover:bg-slate-50 border-2 border-slate-300 text-slate-800 text-xs font-bold transition active:scale-95 cursor-pointer"
                              >
                                <RefreshCw className="w-3.5 h-3.5 inline mr-1" />
                                <span>{isVi ? "Thử lại" : "Retry"}</span>
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={handleResumePlayback}
                              className="px-5 py-2 rounded-xs bg-[#0F2747] hover:bg-[#1E3A8A] text-white border-2 border-slate-800 font-bold text-xs transition active:scale-95 cursor-pointer flex items-center gap-1.5"
                            >
                              <span>{isVi ? "Tiếp tục xem bài giảng ▶" : "Continue Lecture ▶"}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* THANH TIMELINE DUY NHẤT Ở ĐÁY (UNIFORM VIDEO CONTROLS WITH QUALITY MENU) */}
            <UniformVideoControls
              isPlaying={isPlaying}
              currentTime={currentTime}
              duration={duration}
              playbackRate={playbackRate}
              isMuted={isMuted}
              milestones={activeLesson.milestones}
              solvedMilestoneIds={solvedMilestoneIds}
              currentQuality={currentQuality}
              availableQualities={availableQualities}
              autoPauseAtMilestone={autoPauseAtMilestone}
              onTogglePlay={handleTogglePlay}
              onSeek={handleSeek}
              onChangeSpeed={handleSetSpeed}
              onToggleMute={handleToggleMute}
              onToggleFullscreen={handleToggleFullscreen}
              onMilestoneClick={handleOpenMilestone}
              onSelectQuality={handleSelectQuality}
              onToggleAutoPause={handleToggleAutoPause}
            />

            {/* H5P FOOTER INFO BAR */}
            <div className="px-4 py-2 bg-slate-950 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    alert(isVi ? "Đã sao chép liên kết bài học tương tác!" : "Copied interactive lesson link!");
                  }}
                  className="inline-flex items-center gap-1 hover:text-slate-200 transition cursor-pointer"
                >
                  <Share2 className="w-3 h-3 text-slate-400" />
                  <span>{isVi ? "Sử dụng lại / Chia sẻ" : "Reuse / Share"}</span>
                </button>
                <span className="text-slate-700">|</span>
                <span>{activeLesson.gradeLevel}</span>
              </div>

              <div className="flex items-center gap-1.5 font-bold text-slate-400">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>{isVi ? "Học liệu số The Pencily • Chuẩn H5P" : "The Pencily Interactive H5P"}</span>
              </div>
            </div>
          </div>

          {/* 3. TUTOR & ATTENDANCE BAR */}
          <div className="p-4 sm:p-5 bg-white rounded-md border-2 border-slate-300 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-13 h-13 rounded-sm overflow-hidden border-2 border-amber-300 shadow-xs shrink-0">
                  <img
                    src={activeLesson.tutor.avatar}
                    alt={activeLesson.tutor.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-poppins font-bold text-sm sm:text-base text-[#0F2747] truncate">
                      {activeLesson.tutor.name}
                    </h4>
                    {activeLesson.tutor.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-amber-100 text-amber-900 border border-amber-300 shrink-0">
                        {activeLesson.tutor.badge}
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-slate-600 mt-0.5">
                    <span>{activeLesson.tutor.school}</span>
                    <span className="mx-1.5 text-slate-300">•</span>
                    <span className="font-semibold text-amber-700">
                      {isVi ? `Đã dạy ${activeLesson.tutor.sessions} buổi` : `${activeLesson.tutor.sessions} sessions`}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-1 max-w-xl line-clamp-2">
                    {activeLesson.tutor.bio}
                  </p>
                </div>
              </div>

              {/* Attendance & Points Button (+5 PP) */}
              <div className="shrink-0 flex items-center gap-2">
                {isLessonClaimed ? (
                  <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-sm bg-emerald-50 border-2 border-emerald-300 text-emerald-800 text-xs font-bold shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{isVi ? "Đã nhận +5 PP buổi học" : "+5 PP Awarded"}</span>
                  </div>
                ) : (
                  <button
                    onClick={handleClaimLesson}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition active:scale-95 shadow-md cursor-pointer border-2 border-amber-600"
                    title={isVi ? "Bấm để xác thực hoàn thành toàn bộ bài học và nhận thêm điểm" : "Claim completion points"}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isVi ? "Điểm danh học xong (+5 PP)" : "Claim Completion (+5 PP)"}</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 4. TABS: MILESTONES / TRANSCRIPT / SYLLABUS / SUMMARY */}
          <div className="bg-white rounded-md border-2 border-slate-300 shadow-2xs overflow-hidden">
            <div className="flex items-center justify-between border-b-2 border-slate-200 bg-[#FFF9EF]/80 px-4 sm:px-6 overflow-x-auto">
              <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                {/* TAB 1: MILESTONES */}
                <button
                  onClick={() => setActiveTab("milestones")}
                  className={`py-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition cursor-pointer -mb-[2px] ${
                    activeTab === "milestones"
                      ? "border-[#F59E0B] text-[#0F2747]"
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                  <span>
                    {isVi
                      ? `Cột mốc bài tập (${solvedCountInLesson}/${totalMilestonesInLesson})`
                      : `Milestones (${solvedCountInLesson}/${totalMilestonesInLesson})`}
                  </span>
                </button>

                {/* TAB 2: TRANSCRIPTION */}
                <button
                  onClick={() => setActiveTab("transcript")}
                  className={`py-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition cursor-pointer -mb-[2px] ${
                    activeTab === "transcript"
                      ? "border-[#F59E0B] text-[#0F2747]"
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <FileText className="w-4 h-4 text-[#F59E0B]" />
                  <span>{isVi ? "Bản ghi lời" : "Transcript"}</span>
                </button>

                {/* TAB 3: SYLLABUS */}
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
                    {isVi ? `Chặng kiến thức (${activeLesson.syllabus.length})` : `Chapters (${activeLesson.syllabus.length})`}
                  </span>
                </button>

                {/* TAB 4: SUMMARY & SCORE */}
                <button
                  onClick={() => setActiveTab("summary")}
                  className={`py-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition cursor-pointer -mb-[2px] ${
                    activeTab === "summary"
                      ? "border-[#F59E0B] text-[#0F2747]"
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>{isVi ? "Tổng kết & Đổi quà" : "Scorecard"}</span>
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-500 font-medium shrink-0">
                <span>{isVi ? "💡 Video tự dừng tại mỗi cột mốc" : "💡 Video auto-pauses at each milestone"}</span>
              </div>
            </div>

            {/* TAB CONTENT: MILESTONES OVERVIEW */}
            {activeTab === "milestones" && (
              <div className="p-4 sm:p-6 space-y-3 animate-fadeIn">
                <div className="text-xs font-bold text-slate-600 pb-1 border-b border-slate-100 flex items-center justify-between">
                  <span>{isVi ? "Danh sách bài tập tương tác trong video bài giảng:" : "Interactive exercise checkpoints in this lecture:"}</span>
                  <span className="text-amber-800 font-mono font-bold">
                    +{activeLesson.milestones.reduce((acc, m) => acc + m.points, 0)} PP {isVi ? "tổng thưởng" : "total PP"}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {activeLesson.milestones.map((m) => {
                    const isSolved = solvedMilestoneIds.includes(m.id);

                    return (
                      <div
                        key={m.id}
                        className={`p-3.5 rounded-sm border-2 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isSolved
                            ? "bg-emerald-50/60 border-emerald-300"
                            : "bg-slate-50 hover:bg-[#FFF9EF] border-slate-200 hover:border-amber-400"
                        }`}
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono font-bold text-xs text-[#0F2747] bg-white px-2 py-0.5 rounded-xs border border-slate-300">
                              ⏱ {m.timeFormatted}
                            </span>
                            <span className="font-poppins font-bold text-xs sm:text-sm text-[#0F2747]">
                              {m.title}
                            </span>
                            {isSolved ? (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-xs bg-emerald-600 text-white flex items-center gap-1">
                                <Check className="w-3 h-3 stroke-[3]" />
                                <span>{isVi ? "Đã hoàn thành" : "Completed"}</span>
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-xs bg-amber-100 text-amber-900 border border-amber-300">
                                +{m.points} PP
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 line-clamp-1">{m.question}</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                          <button
                            type="button"
                            onClick={() => handleOpenMilestone(m)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs text-xs font-bold transition cursor-pointer active:scale-95 shadow-2xs ${
                              isSolved
                                ? "bg-white hover:bg-slate-100 text-emerald-900 border border-emerald-400"
                                : "bg-amber-400 hover:bg-amber-500 text-slate-950 border border-amber-600"
                            }`}
                          >
                            <span>{isSolved ? (isVi ? "Xem lại bài" : "Review") : (isVi ? "Làm bài tập →" : "Solve Quiz →")}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB CONTENT: TRANSCRIPTION */}
            {activeTab === "transcript" && (
              <div className="p-4 sm:p-6 space-y-4 animate-fadeIn">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={transcriptSearch}
                    onChange={(e) => setTranscriptSearch(e.target.value)}
                    placeholder={isVi ? "Tìm kiếm từ khóa trong bản ghi lời..." : "Search transcript keywords..."}
                    className="w-full pl-9 pr-4 py-2 rounded-sm bg-slate-50 border-2 border-slate-300 text-xs text-[#0F2747] placeholder:text-slate-400 focus:outline-none focus:border-[#0F2747] focus:bg-white transition"
                  />
                  {transcriptSearch && (
                    <button
                      onClick={() => setTranscriptSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
                    >
                      {isVi ? "Xóa" : "Clear"}
                    </button>
                  )}
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                  {filteredTranscript.length === 0 ? (
                    <div className="text-center py-8 text-xs text-slate-400">
                      {isVi
                        ? `Không tìm thấy đoạn ghi lời nào chứa từ khóa "${transcriptSearch}".`
                        : `No matches for "${transcriptSearch}".`}
                    </div>
                  ) : (
                    filteredTranscript.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleSeek(item.seconds)}
                        className="w-full text-left p-3 rounded-sm hover:bg-[#FFF9EF] border-2 border-transparent hover:border-amber-300 transition flex items-start gap-3 group cursor-pointer"
                        title={isVi ? `Bấm để tua video đến mốc ${item.time}` : `Seek to ${item.time}`}
                      >
                        <span className="font-mono font-bold text-xs text-[#4F7ECB] bg-blue-50 px-2 py-0.5 rounded-sm group-hover:bg-[#4F7ECB] group-hover:text-white transition-colors shrink-0">
                          ▶ {item.time}
                        </span>

                        <div className="flex-1 min-w-0">
                          <span className="font-bold text-xs text-[#0F2747] mr-1.5">{item.speaker}:</span>
                          <span className="text-xs text-slate-700 leading-relaxed group-hover:text-[#0F2747]">
                            {item.text}
                          </span>
                        </div>

                        <span className="text-[11px] font-bold text-slate-400 group-hover:text-[#4F7ECB] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          {isVi ? "Tua tới →" : "Seek →"}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB CONTENT: SYLLABUS CHAPTERS */}
            {activeTab === "syllabus" && (
              <div className="p-4 sm:p-6 space-y-3 animate-fadeIn">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider pb-1 border-b-2 border-slate-100">
                  {isVi ? "Mục lục các chặng kiến thức chính:" : "Key Knowledge Chapters:"}
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
                        <p className="text-xs text-slate-500 leading-relaxed pl-1">{item.summary}</p>
                      </div>

                      <span className="text-xs font-bold text-slate-400 group-hover:text-[#4F7ECB] shrink-0 pt-0.5">
                        {isVi ? "Tua tới →" : "Seek →"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: SUMMARY SCORECARD */}
            {activeTab === "summary" && (
              <div className="p-5 sm:p-7 space-y-5 animate-fadeIn">
                <div className="p-4 rounded-sm bg-emerald-50/70 border-2 border-emerald-300 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <h4 className="font-poppins font-black text-base text-emerald-950">
                      {isVi ? "Kết Quả Học Tập Tương Tác" : "Interactive Learning Performance"}
                    </h4>
                    <p className="text-xs text-emerald-800">
                      {isVi
                        ? `Bạn đã hoàn thành ${solvedCountInLesson}/${totalMilestonesInLesson} cột mốc bài tập trong bài giảng này.`
                        : `You have completed ${solvedCountInLesson}/${totalMilestonesInLesson} interactive checkpoints in this lecture.`}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-center px-4 py-2 rounded-xs bg-white border border-emerald-400 shadow-2xs">
                      <span className="block text-[10px] text-slate-500 uppercase font-bold">{isVi ? "Điểm PP Đạt Được" : "PP Earned"}</span>
                      <span className="font-mono font-black text-lg text-emerald-700">
                        +{solvedCountInLesson * 5} PP
                      </span>
                    </div>

                    {onOpenExchangeShop && (
                      <button
                        onClick={onOpenExchangeShop}
                        className="px-4 py-2.5 rounded-xs bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition active:scale-95 cursor-pointer shadow-xs border border-emerald-950"
                      >
                        {isVi ? "Đổi Quà PP →" : "Redeem Perks →"}
                      </button>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-sm border border-slate-200 text-xs text-slate-600 space-y-2">
                  <div className="font-bold text-[#0F2747] flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-amber-500" />
                    <span>{isVi ? "Ghi nhận vào Giấy Chứng Nhận Ngoại Khóa The Pencily:" : "Official Extracurricular Certificate Record:"}</span>
                  </div>
                  <p>
                    {isVi
                      ? "Toàn bộ thời gian xem video bài giảng và hoàn thành câu hỏi tương tác được hệ thống ghi nhận tự động vào hồ sơ học thuật cá nhân. Bạn có thể xuất Giấy Xác Nhận Ngoại Khóa (PDF Certificate) tại trang Hồ Sơ Cá Nhân."
                      : "All interactive lecture completion hours are officially tracked and verified in your student transcript, exportable as an official extracurricular certificate."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: LESSON INFO & STUDY CALLOUT (4 COLS) */}
        <div className="lg:col-span-4 space-y-4">
          {/* ACTIVE LESSON DETAILS CARD */}
          <div className="bg-white rounded-md border-2 border-slate-300 shadow-2xs overflow-hidden p-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-amber-100 text-amber-900 border border-amber-300 inline-block">
                {activeLesson.subject}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {activeLesson.duration}
              </span>
            </div>

            <div className="relative w-full aspect-video rounded-sm overflow-hidden bg-slate-900 border-2 border-slate-200 shadow-2xs">
              <img
                src={`https://img.youtube.com/vi/${activeLesson.youtubeId}/mqdefault.jpg`}
                alt={activeLesson.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded-xs bg-black/80 text-white font-mono font-bold text-xs">
                {activeLesson.duration}
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="font-poppins font-bold text-sm text-[#0F2747] leading-snug">
                {activeLesson.title}
              </h4>
              <p className="text-xs text-slate-500">
                {activeLesson.tutor.name} • {activeLesson.tutor.school}
              </p>
            </div>

            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-sm text-xs text-[#0F2747] space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-amber-900">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{isVi ? "Cột mốc kiểm tra kiến thức:" : "Interactive Checkpoints:"}</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {isVi
                  ? `Bài giảng có ${activeLesson.milestones.length} điểm dừng tại 0:43, 1:34 và 2:16. Trả lời đúng mỗi câu bạn sẽ được cộng +5 PP ngay lập tức!`
                  : `This lecture features ${activeLesson.milestones.length} checkpoints at 0:43, 1:34, and 2:16. Earn +5 PP per correct answer!`}
              </p>
            </div>
          </div>

          {/* COMMUNITY STUDY PROMPT */}
          <div className="p-4 bg-white rounded-md border-2 border-slate-300 shadow-2xs space-y-2.5">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-amber-500" />
              <h4 className="font-poppins font-bold text-xs text-[#0F2747]">
                {isVi ? "Học Cùng Bạn Bè Trực Tiếp?" : "Want to study live with peers?"}
              </h4>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {isVi
                ? "Ngoài bài học tương tác, bạn có thể tham gia trực tiếp các phòng học ảo (Study Rooms) có Peer Tutors kèm giải bài tập hoàn toàn miễn phí."
                : "Join active study pods with live student tutors and interactive whiteboards."}
            </p>
            {onGoToClasses && (
              <button
                type="button"
                onClick={onGoToClasses}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xs bg-[#0F2747] hover:bg-[#1E3A8A] text-white text-xs font-bold transition cursor-pointer shadow-2xs"
              >
                <span>{isVi ? "Xem Lịch Phòng Học Đang Mở →" : "View Active Study Rooms →"}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
