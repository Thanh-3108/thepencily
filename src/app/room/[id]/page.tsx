"use client";

import React, { useState, useEffect, useRef, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  MonitorOff,
  MessageSquare,
  Users,
  LogOut,
  Check,
  Send,
  Sparkles,
  Edit3,
  FileText,
  Share2,
  Maximize2,
  Minimize2,
  ChevronLeft,
} from "lucide-react";
import { usePencily } from "@/context/PencilyContext";
import { PencilMascot } from "@/components/Logo";
import CompleteProfileModal from "@/components/CompleteProfileModal";

interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  time: string;
  isSystem?: boolean;
}

interface PeerUser {
  id: string;
  name: string;
  avatar: string;
  isHost?: boolean;
  isMicOn: boolean;
  isCamOn: boolean;
  isSpeaking: boolean;
  audioLevel?: number;
}

export default function StudyRoomPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const roomId = resolvedParams.id;
  const router = useRouter();
  const { user, classes } = usePencily();

  // Find class title if exists
  const currentClass = classes.find((c) => c.meetUrl?.includes(roomId) || c.id === roomId);
  const roomTitle = currentClass?.title || `Phòng Học Nhóm #${roomId.slice(-4)}`;
  const subjectName = currentClass?.categoryLabel || "Học Trực Tuyến";

  // Media states
  const [isMicOn, setIsMicOn] = useState(false);
  const [isCamOn, setIsCamOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [localAudioLevel, setLocalAudioLevel] = useState(0);
  const localMeterRef = useRef<HTMLDivElement>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  // Layout & Workspace states
  const [activeTab, setActiveTab] = useState<"chat" | "notes">("chat");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(380);
  const isDraggingSidebarRef = useRef(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Shared Scratchpad state
  const [sharedNotes, setSharedNotes] = useState(
    `# BẢNG GHI CHÚ CHUNG • ${roomTitle}\n- Hãy ghi lại công thức, đề bài hoặc thắc mắc tại đây\n- Mọi người trong phòng đều có thể xem và đóng góp!`
  );
  const [copiedNotes, setCopiedNotes] = useState(false);

  // Chat & Messages
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "sys-1",
      sender: "The Pencily",
      text: "Chào mừng bạn đến với phòng học! Hãy bật mic khi thảo luận hoặc chia sẻ bài tập để cùng học nhé.",
      time: "Vừa xong",
      isSystem: true,
    },
  ]);
  const [messageInput, setMessageInput] = useState("");

  // Participants in the room
  const [peers, setPeers] = useState<PeerUser[]>([]);

  // Refs for Media & WebRTC
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const screenVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const broadcastRef = useRef<BroadcastChannel | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const localUserId = useRef(`user-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Check if student has completed real-name verification
  useEffect(() => {
    const hasRawDiscordHandle =
      user.name &&
      (user.name.startsWith("@") ||
        user.name.includes("#") ||
        user.name === "Học sinh Pencily" ||
        user.name.length > 25);
    if (!user.hasCompletedProfile && (!user.realName || hasRawDiscordHandle)) {
      setIsProfileModalOpen(true);
    }
  }, [user.hasCompletedProfile, user.realName, user.name]);

  // 1. Room Timer Stopwatch
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getGivenName = (fullName: string) => {
    if (!fullName) return "";
    const parts = fullName.trim().split(/\s+/).filter(Boolean);
    return parts.length > 0 ? parts[parts.length - 1] : fullName;
  };

  // 2. Realtime Multi-user Room Signaling (BroadcastChannel for multi-tab/P2P on same domain)
  useEffect(() => {
    const channelName = `pencily_room_${roomId}`;
    const channel = new BroadcastChannel(channelName);
    broadcastRef.current = channel;

    // Send Join Announcement with verified given name (chỉ hiện đúng phần tên trong họ và tên)
    const rawFullName = user.realName || user.name;
    const studentDisplayName =
      (rawFullName && !rawFullName.startsWith("@") && !rawFullName.includes("#") && rawFullName !== "Học sinh Pencily"
        ? getGivenName(rawFullName)
        : "Học sinh");

    const myProfile: PeerUser = {
      id: localUserId.current,
      name: studentDisplayName,
      avatar: user.avatar || "P",
      isHost: Boolean(currentClass?.tutorName === user.name || user.role?.includes("Tutor")),
      isMicOn,
      isCamOn,
      isSpeaking: false,
    };

    channel.postMessage({
      type: "PEER_JOIN",
      peer: myProfile,
    });

    channel.onmessage = (event) => {
      const { type, peer, peerId, message, speaking, micOn, camOn, notesContent, audioLevel } = event.data;

      if (type === "PEER_JOIN") {
        if (peer.id !== localUserId.current) {
          setPeers((prev) => {
            const exists = prev.some((p) => p.id === peer.id);
            if (exists) return prev;
            return [...prev, peer];
          });

          // Respond with presence so new user knows we are here
          channel.postMessage({
            type: "PEER_PRESENCE",
            peer: {
              ...myProfile,
              isMicOn,
              isCamOn,
            },
            notesContent: sharedNotes,
          });

          setChatMessages((prev) => [
            ...prev,
            {
              id: `sys-${Date.now()}`,
              sender: "Hệ thống",
              text: `${peer.name} đã tham gia phòng học.`,
              time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              isSystem: true,
            },
          ]);
        }
      } else if (type === "PEER_PRESENCE") {
        if (peer.id !== localUserId.current) {
          setPeers((prev) => {
            const exists = prev.some((p) => p.id === peer.id);
            if (exists) {
              return prev.map((p) => (p.id === peer.id ? { ...p, ...peer } : p));
            }
            return [...prev, peer];
          });
          if (notesContent && notesContent !== sharedNotes) {
            setSharedNotes(notesContent);
          }
        }
      } else if (type === "PEER_LEAVE") {
        setPeers((prev) => prev.filter((p) => p.id !== peerId));
      } else if (type === "CHAT_MESSAGE") {
        setChatMessages((prev) => [...prev, message]);
      } else if (type === "SPEAKING_STATE") {
        setPeers((prev) =>
          prev.map((p) =>
            p.id === peerId
              ? { ...p, isSpeaking: speaking, audioLevel: audioLevel ?? (speaking ? 60 : 0) }
              : p
          )
        );
      } else if (type === "MEDIA_TOGGLE") {
        setPeers((prev) =>
          prev.map((p) =>
            p.id === peerId
              ? {
                  ...p,
                  isMicOn: micOn !== undefined ? micOn : p.isMicOn,
                  isCamOn: camOn !== undefined ? camOn : p.isCamOn,
                }
              : p
          )
        );
      } else if (type === "SCRATCHPAD_UPDATE") {
        setSharedNotes(notesContent);
      }
    };

    return () => {
      channel.postMessage({
        type: "PEER_LEAVE",
        peerId: localUserId.current,
      });
      channel.close();
    };
  }, [roomId, user.name]);

  // Scroll chat to bottom on new message
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Resizable sidebar drag effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingSidebarRef.current) return;
      const newWidth = window.innerWidth - e.clientX;
      const clampedWidth = Math.max(280, Math.min(newWidth, Math.min(760, window.innerWidth * 0.65)));
      setSidebarWidth(clampedWidth);
    };

    const handleMouseUp = () => {
      if (isDraggingSidebarRef.current) {
        isDraggingSidebarRef.current = false;
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // 3. Audio Activity Detection & Measure (tiếng to đến đâu mức xanh dâng cao đến đó)
  const setupAudioDetection = (stream: MediaStream) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.35;
      source.connect(analyser);
      analyserRef.current = analyser;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      let lastBroadcastTime = 0;

      const checkVolume = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const average = sum / dataArray.length;
        // Normalize: speech volume mapped to 0-100%
        const normalized = Math.min(100, Math.max(0, Math.round((average / 50) * 100)));
        const speakingNow = normalized > 10;

        setIsSpeaking((prev) => (prev !== speakingNow ? speakingNow : prev));
        setLocalAudioLevel(normalized);

        if (localMeterRef.current) {
          localMeterRef.current.style.height = `${normalized}%`;
        }

        const now = Date.now();
        if (now - lastBroadcastTime > 90) {
          lastBroadcastTime = now;
          if (broadcastRef.current) {
            broadcastRef.current.postMessage({
              type: "SPEAKING_STATE",
              peerId: localUserId.current,
              speaking: speakingNow,
              audioLevel: normalized,
            });
          }
        }

        animationFrameRef.current = requestAnimationFrame(checkVolume);
      };

      checkVolume();
    } catch (e) {
      console.warn("Audio detection setup failed:", e);
    }
  };

  // 4. Toggle Microphone
  const toggleMic = async () => {
    setPermissionError(null);
    if (!isMicOn) {
      try {
        let stream = localStreamRef.current;
        if (!stream) {
          stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          localStreamRef.current = stream;
        } else {
          const audioTrack = stream.getAudioTracks()[0];
          if (!audioTrack) {
            const newAudio = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.addTrack(newAudio.getAudioTracks()[0]);
          } else {
            audioTrack.enabled = true;
          }
        }
        setIsMicOn(true);
        setupAudioDetection(stream);

        broadcastRef.current?.postMessage({
          type: "MEDIA_TOGGLE",
          peerId: localUserId.current,
          micOn: true,
        });
      } catch (err: any) {
        console.error("Mic access denied:", err);
        setPermissionError("Không thể truy cập Microphone. Vui lòng cho phép quyền trong trình duyệt.");
      }
    } else {
      if (localStreamRef.current) {
        localStreamRef.current.getAudioTracks().forEach((track) => {
          track.enabled = false;
        });
      }
      setIsMicOn(false);
      setIsSpeaking(false);
      setLocalAudioLevel(0);
      if (localMeterRef.current) {
        localMeterRef.current.style.height = "0%";
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      broadcastRef.current?.postMessage({
        type: "MEDIA_TOGGLE",
        peerId: localUserId.current,
        micOn: false,
      });
    }
  };

  // 5. Toggle Camera
  const toggleCam = async () => {
    setPermissionError(null);
    if (!isCamOn) {
      try {
        const videoStream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 640 }, height: { ideal: 480 } },
        });

        if (localStreamRef.current) {
          videoStream.getVideoTracks().forEach((track) => localStreamRef.current?.addTrack(track));
        } else {
          localStreamRef.current = videoStream;
        }

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = videoStream;
        }

        setIsCamOn(true);

        broadcastRef.current?.postMessage({
          type: "MEDIA_TOGGLE",
          peerId: localUserId.current,
          camOn: true,
        });
      } catch (err: any) {
        console.error("Camera access denied:", err);
        setPermissionError("Không thể truy cập Camera. Vui lòng cho phép quyền trong trình duyệt.");
      }
    } else {
      if (localStreamRef.current) {
        localStreamRef.current.getVideoTracks().forEach((track) => {
          track.stop();
          localStreamRef.current?.removeTrack(track);
        });
      }
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = null;
      }
      setIsCamOn(false);

      broadcastRef.current?.postMessage({
        type: "MEDIA_TOGGLE",
        peerId: localUserId.current,
        camOn: false,
      });
    }
  };

  // 6. Toggle Screen Share
  const toggleScreenShare = async () => {
    if (!isScreenSharing) {
      try {
        const displayStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        });
        screenStreamRef.current = displayStream;

        if (screenVideoRef.current) {
          screenVideoRef.current.srcObject = displayStream;
        }

        setIsScreenSharing(true);

        displayStream.getVideoTracks()[0].onended = () => {
          stopScreenShare();
        };

        setChatMessages((prev) => [
          ...prev,
          {
            id: `sys-${Date.now()}`,
            sender: "Hệ thống",
            text: `${user.realName || user.name} đang chia sẻ màn hình giảng bài.`,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            isSystem: true,
          },
        ]);
      } catch (err) {
        console.warn("Screen share cancelled or failed:", err);
      }
    } else {
      stopScreenShare();
    }
  };

  const stopScreenShare = () => {
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((track) => track.stop());
      screenStreamRef.current = null;
    }
    if (screenVideoRef.current) {
      screenVideoRef.current.srcObject = null;
    }
    setIsScreenSharing(false);
  };

  // Sync screen video stream as soon as video element is mounted in DOM
  useEffect(() => {
    if (isScreenSharing && screenVideoRef.current && screenStreamRef.current) {
      screenVideoRef.current.srcObject = screenStreamRef.current;
      screenVideoRef.current.play().catch((err) => console.warn("Screen share play error:", err));
    }
  }, [isScreenSharing]);

  // 7. Send In-Room Message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: user.realName || user.name || "Tôi",
      text: messageInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setMessageInput("");

    broadcastRef.current?.postMessage({
      type: "CHAT_MESSAGE",
      message: newMsg,
    });
  };

  // 8. Update Shared Scratchpad
  const handleNotesChange = (value: string) => {
    setSharedNotes(value);
    broadcastRef.current?.postMessage({
      type: "SCRATCHPAD_UPDATE",
      notesContent: value,
    });
  };

  const handleCopyNotes = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(sharedNotes);
      setCopiedNotes(true);
      setTimeout(() => setCopiedNotes(false), 2000);
    }
  };

  // Copy Room Link
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Leave room cleanly
  const handleLeaveRoom = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((t) => t.stop());
    }
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((t) => t.stop());
    }
    router.push("/dashboard");
  };

  return (
    <div className="h-screen w-full bg-[#FFF9EF] text-[#0F2747] flex flex-col overflow-hidden font-sans select-none">
      {/* 1. TOP ROOM HEADER - AUTHENTIC THE PENCILY WARM CREAM & DEEP NAVY */}
      <header className="h-16 px-4 sm:px-6 bg-[#FFF9EF]/90 backdrop-blur-md border-b border-[#0F2747]/10 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-3.5 min-w-0">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-[#0F2747] border border-[#0F2747]/15 transition text-xs font-bold shadow-2xs shrink-0 cursor-pointer"
            title="Quay lại Dashboard"
          >
            <ChevronLeft className="w-4 h-4 text-[#0F2747]" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>

          <div className="h-5 w-px bg-[#0F2747]/10 hidden sm:block shrink-0" />

          <div className="flex items-center gap-2.5 min-w-0">
            <PencilMascot size="sm" className="hidden sm:inline-flex" />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-black text-[#0F2747] truncate max-w-[180px] sm:max-w-md tracking-tight font-poppins">
                  {roomTitle}
                </h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FFC83D]/30 text-[#0F2747] border border-[#FFC83D] shrink-0">
                  {formatDuration(elapsedSeconds)}
                </span>
              </div>
              <p className="text-[11px] text-[#52637A] truncate hidden md:block">
                {subjectName} • Phòng học trực tiếp The Pencily
              </p>
            </div>
          </div>
        </div>

        {/* Room Header Actions */}
        <div className="flex items-center gap-2">
          {/* Share Room Button */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#FFC83D] hover:bg-[#EAB308] text-[#0F2747] text-xs font-black transition-all shadow-2xs active:scale-95 cursor-pointer"
            title="Sao chép link mời bạn cùng vào học"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#0F2747]" />
                <span>Đã sao chép!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mời bạn học</span>
              </>
            )}
          </button>

          {/* Members Count Badge */}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#0F2747]/10 text-xs font-bold text-[#0F2747] shadow-2xs">
            <Users className="w-3.5 h-3.5 text-[#4F7ECB]" />
            <span>{peers.length + 1} bạn</span>
          </div>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-white hover:bg-slate-50 text-[#0F2747] border border-[#0F2747]/10 transition cursor-pointer hidden md:flex shadow-2xs"
            title="Toàn màn hình"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Toggle Sidebar (Chat / Notes) */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-2 rounded-xl border transition cursor-pointer shadow-2xs ${
              isSidebarOpen
                ? "bg-[#0F2747] text-white border-[#0F2747]"
                : "bg-white text-[#0F2747] border-[#0F2747]/15 hover:bg-slate-50"
            }`}
            title="Mở bảng ghi chú & chat"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Permission alert banner if any */}
      {permissionError && (
        <div className="bg-amber-100 text-amber-900 border-b border-amber-300 px-4 py-2 text-xs text-center flex items-center justify-between z-30">
          <span className="mx-auto font-bold">⚠️ {permissionError}</span>
          <button
            onClick={() => setPermissionError(null)}
            className="text-amber-900 hover:text-black font-bold ml-2 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* 2. MAIN STAGE & SIDEBAR WORKSPACE */}
      <div className="flex-1 flex min-h-0 relative">
        {/* Central Stage (Study Desk) */}
        <div className={`flex-1 p-3 sm:p-5 flex flex-col justify-center items-center relative bg-[#FFF9EF] min-h-0 ${isScreenSharing ? "overflow-hidden" : "overflow-y-auto"}`}>
          {/* SCREEN SHARE STAGE (if active) */}
          {isScreenSharing && (
            <div className="w-full flex-1 min-h-0 mb-3 bg-slate-900 rounded-3xl overflow-hidden border-2 border-[#0F2747]/20 relative shadow-xl flex items-center justify-center">
              <video
                ref={screenVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-contain"
              />
              <div className="absolute top-3 left-3 bg-[#0F2747]/85 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold text-white flex items-center gap-2 border border-white/10 shadow-md">
                <Monitor className="w-3.5 h-3.5 text-[#FFC83D]" />
                <span>Màn hình bài học đang được chia sẻ</span>
              </div>
            </div>
          )}

          {/* PARTICIPANTS GRID */}
          <div
            className={`w-full transition-all flex items-center justify-center ${
              isScreenSharing
                ? "flex flex-wrap gap-2.5 max-h-32 shrink-0 overflow-y-auto py-1"
                : peers.length === 0
                ? "flex flex-col items-center justify-center max-w-2xl w-full"
                : peers.length === 1
                ? "grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl w-full"
                : peers.length === 2
                ? "grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl w-full"
                : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl w-full"
            }`}
          >
            {/* TILE 1: LOCAL USER (YOU) */}
            <div
              className={`relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border-2 transition-all flex flex-col items-center justify-center shadow-md ${
                isScreenSharing
                  ? "w-28 sm:w-36 h-20 sm:h-24 shrink-0"
                  : peers.length === 0
                  ? "w-full aspect-[16/10] max-h-[420px]"
                  : "aspect-[4/3] w-full"
              } ${
                isSpeaking
                  ? "border-[#FFC83D] shadow-[0_10px_35px_rgba(255,200,61,0.35)] ring-4 ring-[#FFC83D]/30"
                  : "border-[#0F2747]/15 hover:border-[#0F2747]/30"
              }`}
            >
              {/* Camera Stream if ON */}
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className={`absolute inset-0 w-full h-full object-cover -scale-x-100 ${
                  isCamOn ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              />

              {/* Avatar View if Camera is OFF */}
              {!isCamOn && (
                <div className={`relative flex flex-col items-center justify-center text-center ${isScreenSharing ? "p-1.5" : "p-6"}`}>
                  {/* Profile Avatar */}
                  <div
                    className={`relative rounded-full flex items-center justify-center font-black text-white shadow-lg border-2 sm:border-3 transition-all z-10 ${
                      isScreenSharing
                        ? "w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm"
                        : peers.length === 0
                        ? "w-24 h-24 sm:w-28 sm:h-28 text-3xl sm:text-4xl"
                        : "w-20 h-20 text-2xl"
                    } ${
                      isSpeaking
                        ? "bg-[#0F2747] border-[#FFC83D] ring-2 sm:ring-4 ring-[#FFC83D]/40"
                        : "bg-[#0F2747] border-[#FFC83D]"
                    }`}
                  >
                    {user.avatar?.startsWith("http") ? (
                      <img
                        src={user.avatar}
                        alt={user.realName || user.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      user.avatar || (getGivenName(user.realName || user.name)).charAt(0) || "P"
                    )}
                  </div>

                  <div className={`z-10 ${isScreenSharing ? "mt-1" : "mt-4"}`}>
                    <span
                      title={user.realName || user.name}
                      className={`font-black text-[#0F2747] block font-poppins truncate max-w-[80px] sm:max-w-[110px] ${isScreenSharing ? "text-[10px] sm:text-xs" : "text-base sm:text-lg"}`}
                    >
                      {getGivenName(user.realName || user.name) || "Bạn"} (Bạn)
                    </span>
                    {!isScreenSharing && (
                      <span className="text-xs text-[#52637A] font-bold mt-0.5 inline-flex items-center gap-1">
                        {currentClass?.tutorName === (user.realName || user.name) ? "★ Trưởng phòng (Host)" : "Học viên"}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Status Tags */}
              <div className={`absolute flex items-center gap-1 z-10 ${isScreenSharing ? "top-1.5 left-1.5" : "top-4 left-4"}`}>
                <span className={`rounded-lg font-black bg-[#FFC83D] text-[#0F2747] shadow-xs ${isScreenSharing ? "px-1.5 py-0.5 text-[8px]" : "px-2.5 py-1 text-[10px]"}`}>
                  BẠN
                </span>
              </div>

              {/* Bottom Mic Badge with Audio Level Measure (Tiếng to đến đâu mức xanh dâng cao đến đó) */}
              <div className={`absolute z-10 ${isScreenSharing ? "bottom-1.5 right-1.5" : "bottom-3 sm:bottom-4 right-3 sm:right-4"}`}>
                {isMicOn ? (
                  <div
                    className={`flex items-center gap-1.5 bg-white/95 backdrop-blur-md border border-[#0F2747]/15 shadow-md ${
                      isScreenSharing ? "px-1.5 py-1 rounded-lg" : "px-2.5 py-1.5 rounded-xl"
                    }`}
                    title="Micro đang bật (Đo âm lượng giọng nói)"
                  >
                    <Mic className={`${isScreenSharing ? "w-3 h-3" : "w-4 h-4"} text-emerald-600 shrink-0`} />
                    {/* Vertical Volume Measure Bar */}
                    <div
                      className={`bg-slate-200/90 rounded-xs overflow-hidden flex flex-col justify-end p-[1px] ${
                        isScreenSharing ? "w-1.5 h-4" : "w-2.5 h-6"
                      }`}
                    >
                      <div
                        ref={localMeterRef}
                        className="w-full bg-gradient-to-t from-emerald-600 via-emerald-500 to-emerald-400 rounded-xs transition-[height] duration-75 ease-out"
                        style={{ height: `${localAudioLevel}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    className={`rounded-xl bg-red-500 text-white flex items-center justify-center shadow-md ${
                      isScreenSharing ? "w-5 h-5" : "w-8 h-8"
                    }`}
                    title="Micro đã tắt"
                  >
                    <MicOff className={isScreenSharing ? "w-3 h-3" : "w-4 h-4"} />
                  </div>
                )}
              </div>
            </div>

            {/* PEER PARTICIPANTS (Other students in room) */}
            {peers.map((peer) => (
              <div
                key={peer.id}
                className={`relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border-2 transition-all flex flex-col items-center justify-center shadow-md ${
                  isScreenSharing
                    ? "w-28 sm:w-36 h-20 sm:h-24 shrink-0"
                    : "aspect-[4/3] w-full"
                } ${
                  peer.isSpeaking
                    ? "border-[#FFC83D] shadow-[0_10px_35px_rgba(255,200,61,0.35)] ring-4 ring-[#FFC83D]/30"
                    : "border-[#0F2747]/15 hover:border-[#0F2747]/30"
                }`}
              >
                <div className={`relative flex flex-col items-center justify-center text-center ${isScreenSharing ? "p-1.5" : "p-4"}`}>

                  <div
                    className={`rounded-full flex items-center justify-center font-bold text-white shadow-md border-2 sm:border-3 transition-all z-10 ${
                      isScreenSharing
                        ? "w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm"
                        : "w-20 h-20 text-2xl"
                    } ${
                      peer.isSpeaking
                        ? "bg-[#0F2747] border-[#FFC83D] ring-2 sm:ring-4 ring-[#FFC83D]/40"
                        : "bg-[#0F2747] border-[#FFC83D]"
                    }`}
                  >
                    {peer.avatar?.startsWith("http") ? (
                      <img
                        src={peer.avatar}
                        alt={peer.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      peer.avatar || (getGivenName(peer.name)).charAt(0) || "S"
                    )}
                  </div>

                  <span
                    title={peer.name}
                    className={`font-black text-[#0F2747] z-10 block truncate max-w-[80px] sm:max-w-[110px] ${isScreenSharing ? "text-[10px] sm:text-xs mt-1" : "text-sm mt-3"}`}
                  >
                    {getGivenName(peer.name)}
                  </span>
                  {!isScreenSharing && (
                    <span className="text-[11px] text-[#52637A] font-medium z-10">
                      {peer.isHost ? "Trưởng phòng" : "Học sinh"}
                    </span>
                  )}
                </div>

                {/* Peer Mic Badge with Audio Level Measure */}
                <div className={`absolute z-10 ${isScreenSharing ? "bottom-1.5 right-1.5" : "bottom-3 sm:bottom-4 right-3 sm:right-4"}`}>
                  {peer.isMicOn ? (
                    <div
                      className={`flex items-center gap-1.5 bg-white/95 backdrop-blur-md border border-[#0F2747]/15 shadow-md ${
                        isScreenSharing ? "px-1.5 py-1 rounded-lg" : "px-2.5 py-1.5 rounded-xl"
                      }`}
                      title={`${peer.name} đang bật micro`}
                    >
                      <Mic className={`${isScreenSharing ? "w-2.5 h-2.5" : "w-3.5 h-3.5"} text-emerald-600 shrink-0`} />
                      {/* Vertical Volume Measure Bar */}
                      <div
                        className={`bg-slate-200/90 rounded-xs overflow-hidden flex flex-col justify-end p-[1px] ${
                          isScreenSharing ? "w-1.5 h-4" : "w-2.5 h-6"
                        }`}
                      >
                        <div
                          className="w-full bg-gradient-to-t from-emerald-600 via-emerald-500 to-emerald-400 rounded-xs transition-[height] duration-100 ease-out"
                          style={{ height: `${peer.audioLevel !== undefined ? peer.audioLevel : peer.isSpeaking ? 65 : 0}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`rounded-xl bg-red-500 text-white flex items-center justify-center shadow-md ${
                        isScreenSharing ? "w-5 h-5" : "w-8 h-8"
                      }`}
                      title={`${peer.name} đã tắt micro`}
                    >
                      <MicOff className={isScreenSharing ? "w-2.5 h-2.5" : "w-3.5 h-3.5"} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Helper Banner when alone in room */}
          {peers.length === 0 && !isScreenSharing && (
            <div className="mt-6 text-center max-w-md p-4 rounded-2xl bg-white/90 border border-[#0F2747]/10 shadow-xs backdrop-blur-sm">
              <p className="text-xs text-[#4B5563] leading-relaxed">
                🎉 Bạn đã mở phòng học thành công! Bấm{" "}
                <strong className="text-[#0F2747] underline cursor-pointer font-bold" onClick={handleCopyLink}>
                  Mời bạn học
                </strong>{" "}
                để gửi link cho bạn bè cùng vào học bài và giải đề nhé.
              </p>
            </div>
          )}
        </div>

        {/* 3. RIGHT SIDEBAR: DUAL TABS (CHAT & SCRATCHPAD) - RESIZABLE */}
        {isSidebarOpen && (
          <aside
            style={{ width: `${sidebarWidth}px` }}
            className="relative bg-white border-l border-[#0F2747]/10 flex flex-col h-full z-10 shrink-0 shadow-lg max-w-[85vw]"
          >
            {/* Left Edge Resize Drag Handle */}
            <div
              onMouseDown={(e) => {
                e.preventDefault();
                isDraggingSidebarRef.current = true;
                document.body.style.cursor = "col-resize";
                document.body.style.userSelect = "none";
              }}
              className="absolute top-0 bottom-0 -left-2 w-4 cursor-col-resize z-30 group hover:bg-[#FFC83D]/30 flex items-center justify-center transition-colors select-none"
              title="Kéo sang trái/phải để chỉnh độ rộng khung trò chuyện & ghi chú"
            >
              <div className="w-[3px] h-10 rounded-xs bg-[#0F2747]/20 group-hover:bg-[#0F2747] transition-colors" />
            </div>

            {/* Tabs Header */}
            <div className="p-2 border-b border-[#0F2747]/10 grid grid-cols-2 gap-1.5 bg-[#FFFDF9]">
              <button
                type="button"
                onClick={() => setActiveTab("chat")}
                className={`py-2 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === "chat"
                    ? "bg-[#0F2747] text-white shadow-xs"
                    : "text-[#52637A] hover:text-[#0F2747] hover:bg-black/5"
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Trò chuyện</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("notes")}
                className={`py-2 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === "notes"
                    ? "bg-[#0F2747] text-white shadow-xs"
                    : "text-[#52637A] hover:text-[#0F2747] hover:bg-black/5"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Bảng ghi chú</span>
              </button>
            </div>

            {/* TAB CONTENT 1: CHAT */}
            {activeTab === "chat" && (
              <div className="flex-1 flex flex-col min-h-0 bg-[#FFFDF9]">
                <div className="p-3 border-b border-[#0F2747]/10 flex items-center justify-between text-xs text-[#52637A] bg-white">
                  <span className="font-bold text-[#0F2747]">Tin nhắn phòng học</span>
                  <span className="text-[11px] font-semibold">{peers.length + 1} thành viên</span>
                </div>

                {/* Messages Stream - 2 distinct sides for self vs others */}
                <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3.5">
                  {chatMessages.map((msg) => {
                    if (msg.isSystem) {
                      return (
                        <div
                          key={msg.id}
                          className="my-1.5 p-2 rounded-xl bg-amber-50 text-amber-900 italic text-[11px] border border-amber-200/80 text-center leading-relaxed"
                        >
                          {msg.text}
                        </div>
                      );
                    }

                    const isMe = msg.sender === user.name || msg.sender === "Tôi";

                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                      >
                        {/* Header: Sender & Time */}
                        <div
                          className={`flex items-center gap-1.5 text-[11px] mb-1 px-1 ${
                            isMe ? "flex-row-reverse" : "flex-row"
                          }`}
                        >
                          <span
                            className={`font-black ${
                              isMe ? "text-[#0F2747]" : "text-[#52637A]"
                            }`}
                          >
                            {isMe ? `${msg.sender} (Bạn)` : msg.sender}
                          </span>
                          <span className="text-[10px] text-gray-400">{msg.time}</span>
                        </div>

                        {/* Bubble - Compact fit without stretching full width */}
                        <div
                          className={`max-w-[85%] w-fit px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed break-words shadow-xs ${
                            isMe
                              ? "bg-[#0F2747] text-white rounded-tr-xs"
                              : "bg-white text-[#0F2747] border border-[#0F2747]/15 rounded-tl-xs"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    );
                  })}
                  <div ref={chatBottomRef} />
                </div>

                {/* Message Input Box */}
                <form onSubmit={handleSendMessage} className="p-3 border-t border-[#0F2747]/10 flex gap-2 bg-white">
                  <input
                    type="text"
                    placeholder="Nhập tin nhắn..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="flex-1 bg-[#FFFDF9] border border-[#0F2747]/15 rounded-xl px-3.5 py-2.5 text-xs text-[#0F2747] placeholder-[#94A3B8] focus:outline-none focus:border-[#0F2747]"
                  />
                  <button
                    type="submit"
                    className="p-2.5 rounded-xl bg-[#FFC83D] hover:bg-[#EAB308] text-[#0F2747] font-bold transition cursor-pointer shrink-0 active:scale-95 shadow-2xs"
                    title="Gửi tin nhắn"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* TAB CONTENT 2: SHARED SCRATCHPAD (GHI CHÚ) */}
            {activeTab === "notes" && (
              <div className="flex-1 flex flex-col min-h-0 p-3 bg-[#FFFDF9]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-[#0F2747] flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5 text-[#4F7ECB]" />
                    Ghi chú bài học đồng bộ
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyNotes}
                    className="text-[11px] font-bold text-[#0F2747] hover:underline cursor-pointer"
                  >
                    {copiedNotes ? "✓ Đã copy!" : "Copy ghi chú"}
                  </button>
                </div>

                <p className="text-[11px] text-[#52637A] mb-2 leading-relaxed">
                  Mọi nội dung bạn gõ ở đây sẽ được đồng bộ trực tiếp tới tất cả bạn học trong phòng.
                </p>

                <textarea
                  value={sharedNotes}
                  onChange={(e) => handleNotesChange(e.target.value)}
                  placeholder="Nhập ghi chú, công thức Toán, từ vựng hoặc đề thi cần thảo luận..."
                  className="flex-1 w-full p-3.5 rounded-xl bg-white border border-[#0F2747]/15 text-xs text-[#0F2747] placeholder-slate-400 focus:outline-none focus:border-[#0F2747] resize-none font-mono leading-relaxed shadow-2xs"
                />

                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleNotesChange(sharedNotes + "\n- [ ] ")}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 text-[#0F2747] font-semibold cursor-pointer border border-[#0F2747]/15 shadow-2xs"
                  >
                    + Việc cần làm
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNotesChange(sharedNotes + "\n💡 Công thức: ")}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 text-[#0F2747] font-semibold cursor-pointer border border-[#0F2747]/15 shadow-2xs"
                  >
                    + Công thức
                  </button>
                </div>
              </div>
            )}
          </aside>
        )}
      </div>

      {/* 4. BOTTOM FLOATING CONTROLS BAR (THE PENCILY BRANDED CLEAN DOCK - ICON ONLY) */}
      <footer className="h-16 bg-[#FFF9EF]/95 backdrop-blur-md border-t border-[#0F2747]/10 px-4 flex items-center justify-center shrink-0 z-20">
        <div className="flex items-center gap-2 sm:gap-2.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-[#0F2747]/15 shadow-lg">
          {/* Micro Button */}
          <button
            type="button"
            onClick={toggleMic}
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition cursor-pointer active:scale-95 shadow-2xs ${
              isMicOn
                ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300"
                : "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
            }`}
            title={isMicOn ? "Tắt micro" : "Bật micro"}
            aria-label={isMicOn ? "Tắt micro" : "Bật micro"}
          >
            {isMicOn ? <Mic className="w-5 h-5 text-emerald-600" /> : <MicOff className="w-5 h-5 text-red-500" />}
          </button>

          {/* Camera Button */}
          <button
            type="button"
            onClick={toggleCam}
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition cursor-pointer active:scale-95 shadow-2xs ${
              isCamOn
                ? "bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
            }`}
            title={isCamOn ? "Tắt camera" : "Bật camera"}
            aria-label={isCamOn ? "Tắt camera" : "Bật camera"}
          >
            {isCamOn ? <Video className="w-5 h-5 text-amber-600" /> : <VideoOff className="w-5 h-5 text-slate-400" />}
          </button>

          {/* Screen Share Button */}
          <button
            type="button"
            onClick={toggleScreenShare}
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition cursor-pointer active:scale-95 shadow-2xs ${
              isScreenSharing
                ? "bg-[#0F2747] text-white border border-[#0F2747]"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
            }`}
            title={isScreenSharing ? "Dừng chia sẻ màn hình" : "Chia sẻ màn hình"}
            aria-label={isScreenSharing ? "Dừng chia sẻ màn hình" : "Chia sẻ màn hình"}
          >
            {isScreenSharing ? <MonitorOff className="w-5 h-5 text-[#FFC83D]" /> : <Monitor className="w-5 h-5 text-[#0F2747]" />}
          </button>

          {/* Toggle Notes tab directly */}
          <button
            type="button"
            onClick={() => {
              if (isSidebarOpen && activeTab === "notes") {
                setIsSidebarOpen(false);
              } else {
                setIsSidebarOpen(true);
                setActiveTab("notes");
              }
            }}
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition cursor-pointer shadow-2xs ${
              isSidebarOpen && activeTab === "notes"
                ? "bg-[#FFC83D]/30 text-[#0F2747] border border-[#FFC83D]"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
            }`}
            title="Bảng ghi chú chung"
            aria-label="Bảng ghi chú chung"
          >
            <FileText className="w-5 h-5 text-[#0F2747]" />
          </button>

          {/* Toggle Chat tab directly */}
          <button
            type="button"
            onClick={() => {
              if (isSidebarOpen && activeTab === "chat") {
                setIsSidebarOpen(false);
              } else {
                setIsSidebarOpen(true);
                setActiveTab("chat");
              }
            }}
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition cursor-pointer shadow-2xs ${
              isSidebarOpen && activeTab === "chat"
                ? "bg-[#FFC83D]/30 text-[#0F2747] border border-[#FFC83D]"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
            }`}
            title="Trò chuyện"
            aria-label="Trò chuyện"
          >
            <MessageSquare className="w-5 h-5 text-[#0F2747]" />
          </button>

          <div className="h-6 w-px bg-slate-200 mx-1" />

          {/* Single, Dedicated Clean Leave Button */}
          <button
            type="button"
            onClick={handleLeaveRoom}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center bg-red-600 hover:bg-red-700 text-white shadow-2xs transition-all cursor-pointer active:scale-95"
            title="Rời khỏi phòng học"
            aria-label="Rời khỏi phòng học"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </footer>

      {/* Profile Completion Modal for Real Name verification */}
      <CompleteProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        required={true}
      />
    </div>
  );
}
