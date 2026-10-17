"use client";

import React, { useState, useEffect, useRef, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mic, MicOff, Video, VideoOff, Monitor, MonitorOff, MessageSquare, Users, LogOut, Check, Send, Edit3, FileText, Share2, Maximize2, Minimize2, ChevronLeft } from "lucide-react";
import { usePencily } from "@/context/PencilyContext";
import { PencilyClassroomsIcon } from "@/components/icons/PencilyIcons";
import { supabase } from "@/lib/supabaseClient";

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
  const { user, classes, language } = usePencily();

  // Find class title if exists
  const currentClass = classes.find((c) => c.meetUrl?.includes(roomId) || c.id === roomId);
  const roomTitle = currentClass?.title || (language === "vi" ? `Phòng Học Nhóm #${roomId.slice(-4)}` : `Study Room #${roomId.slice(-4)}`);
  const subjectName = currentClass?.categoryLabel || (language === "vi" ? "Học Trực Tuyến" : "Online Learning");

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
  const defaultNotesVi = `# BẢNG GHI CHÚ CHUNG: ${roomTitle}\n- Hãy ghi lại công thức, đề bài hoặc thắc mắc tại đây\n- Mọi người trong phòng đều có thể xem và đóng góp!`;
  const defaultNotesEn = `# SHARED SCRATCHPAD: ${roomTitle}\n- Write down formulas, questions, or notes here\n- Synchronized live with all study room peers!`;
  const [sharedNotes, setSharedNotes] = useState(language === "vi" ? defaultNotesVi : defaultNotesEn);
  const [copiedNotes, setCopiedNotes] = useState(false);

  // Chat & Messages
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "sys-1",
      sender: "The Pencily",
      text: language === "vi"
        ? "Chào mừng bạn đến với phòng học! Hãy bật mic khi thảo luận hoặc chia sẻ bài tập để cùng học nhé."
        : "Welcome to the study room! Turn on your mic to discuss questions or share exercises.",
      time: language === "vi" ? "Vừa xong" : "Just now",
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
  const chatTextareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (chatTextareaRef.current) {
      chatTextareaRef.current.style.height = "auto";
      chatTextareaRef.current.style.height = `${Math.min(chatTextareaRef.current.scrollHeight, 112)}px`;
    }
  }, [messageInput]);

  const localUserId = useRef(`user-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`);

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

    // Send Join Announcement with verified given name
    const rawFullName = user.realName || user.name;
    const studentDisplayName =
      (rawFullName && !rawFullName.startsWith("@") && !rawFullName.includes("#") && rawFullName !== "Học sinh Pencily"
        ? getGivenName(rawFullName)
        : (language === "vi" ? "Học sinh" : "Learner"));

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
              sender: language === "vi" ? "Hệ thống" : "System",
              text: language === "vi" ? `${peer.name} đã tham gia phòng học.` : `${peer.name} joined the study room.`,
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

    // 2b. Cross-device Realtime WebSocket Broadcast (Syncs messages across different devices with 0 database tables)
    let realtimeChannel: any = null;
    if (supabase) {
      try {
        realtimeChannel = supabase.channel(`pencily-room-${roomId}`, {
          config: { broadcast: { self: false } },
        });

        realtimeChannel
          .on("broadcast", { event: "CHAT_MESSAGE" }, (event: any) => {
            if (event.payload) {
              setChatMessages((prev) => {
                if (prev.some((m) => m.id === event.payload.id)) return prev;
                return [...prev, event.payload];
              });
            }
          })
          .on("broadcast", { event: "SCRATCHPAD_UPDATE" }, (event: any) => {
            if (event.payload?.notesContent !== undefined) {
              setSharedNotes(event.payload.notesContent);
            }
          })
          .on("broadcast", { event: "PEER_JOIN" }, (event: any) => {
            const peer = event.payload?.peer;
            if (peer && peer.id !== localUserId.current) {
              setPeers((prev) => (prev.some((p) => p.id === peer.id) ? prev : [...prev, peer]));
            }
          })
          .on("broadcast", { event: "PEER_LEAVE" }, (event: any) => {
            const peerId = event.payload?.peerId;
            if (peerId) {
              setPeers((prev) => prev.filter((p) => p.id !== peerId));
            }
          })
          .subscribe();

        realtimeChannel.send({
          type: "broadcast",
          event: "PEER_JOIN",
          payload: { peer: myProfile },
        }).catch(() => {});
      } catch (err) {
        console.warn("Supabase realtime setup skipped/failed:", err);
      }
    }

    return () => {
      channel.postMessage({
        type: "PEER_LEAVE",
        peerId: localUserId.current,
      });
      channel.close();

      if (supabase && realtimeChannel) {
        try {
          realtimeChannel.send({
            type: "broadcast",
            event: "PEER_LEAVE",
            payload: { peerId: localUserId.current },
          }).catch(() => {});
          supabase.removeChannel(realtimeChannel);
        } catch {}
      }
    };
  }, [roomId, user.name, language]);

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

  // 3. Audio Activity Detection & Measure
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
        setPermissionError(
          language === "vi"
            ? "Không thể truy cập Microphone. Vui lòng cho phép quyền trong trình duyệt."
            : "Cannot access Microphone. Please allow permissions in your browser."
        );
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
        setPermissionError(
          language === "vi"
            ? "Không thể truy cập Camera. Vui lòng cho phép quyền trong trình duyệt."
            : "Cannot access Camera. Please allow permissions in your browser."
        );
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
            sender: language === "vi" ? "Hệ thống" : "System",
            text: language === "vi"
              ? `${user.realName || user.name} đang chia sẻ màn hình giảng bài.`
              : `${user.realName || user.name} is sharing their screen.`,
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
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!messageInput.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: user.realName || user.name || (language === "vi" ? "Tôi" : "Me"),
      text: messageInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setMessageInput("");
    if (chatTextareaRef.current) {
      chatTextareaRef.current.style.height = "auto";
    }

    broadcastRef.current?.postMessage({
      type: "CHAT_MESSAGE",
      message: newMsg,
    });

    if (supabase) {
      try {
        supabase.channel(`pencily-room-${roomId}`).send({
          type: "broadcast",
          event: "CHAT_MESSAGE",
          payload: newMsg,
        }).catch(() => {});
      } catch {}
    }
  };

  // 8. Update Shared Scratchpad
  const handleNotesChange = (value: string) => {
    setSharedNotes(value);
    broadcastRef.current?.postMessage({
      type: "SCRATCHPAD_UPDATE",
      notesContent: value,
    });

    if (supabase) {
      try {
        supabase.channel(`pencily-room-${roomId}`).send({
          type: "broadcast",
          event: "SCRATCHPAD_UPDATE",
          payload: { notesContent: value },
        }).catch(() => {});
      } catch {}
    }
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
    <div className="h-[100dvh] max-h-[100dvh] w-full bg-[#FFF9EF] text-[#0F2747] flex flex-col overflow-hidden font-sans select-none">
      {/* 1. TOP ROOM HEADER */}
      <header className="h-16 px-4 sm:px-6 bg-[#FFF9EF] border-b-2 border-slate-300 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-3.5 min-w-0">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] border-2 border-slate-300 transition text-xs font-bold shadow-xs shrink-0 cursor-pointer"
            title={language === "vi" ? "Quay lại Dashboard" : "Back to Dashboard"}
          >
            <ChevronLeft className="w-4 h-4 text-[#0F2747]" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>

          <div className="h-5 w-px bg-slate-300 hidden sm:block shrink-0" />

          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-sm bg-[#0F2747] text-white hidden sm:flex items-center justify-center shrink-0 border border-slate-300">
              <PencilyClassroomsIcon size={14} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1
                  title={roomTitle}
                  className="text-sm sm:text-base font-black text-[#0F2747] truncate max-w-xs sm:max-w-xl md:max-w-2xl tracking-tight font-poppins"
                >
                  {roomTitle}
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded-xs text-[11px] font-bold bg-[#FFC83D]/30 text-[#0F2747] border-2 border-[#FFC83D] shrink-0">
                  {formatDuration(elapsedSeconds)}
                </span>
              </div>
              <p className="text-[11px] text-[#52637A] truncate hidden md:block">
                {subjectName} | {language === "vi" ? "Phòng học trực tiếp The Pencily" : "The Pencily Live Study Room"}
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
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-[#FFC83D] hover:bg-[#EAB308] text-[#0F2747] text-xs font-black transition-all border-2 border-[#0F2747] shadow-xs active:scale-95 cursor-pointer"
            title={language === "vi" ? "Sao chép link mời bạn cùng vào học" : "Copy link to invite study peers"}
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#0F2747]" />
                <span>{language === "vi" ? "Đã sao chép!" : "Copied!"}</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{language === "vi" ? "Mời bạn học" : "Invite Peers"}</span>
              </>
            )}
          </button>

          {/* Members Count Badge */}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white border-2 border-slate-300 text-xs font-bold text-[#0F2747] shadow-xs">
            <Users className="w-3.5 h-3.5 text-[#4F7ECB]" />
            <span>{peers.length + 1} {language === "vi" ? "bạn" : "peers"}</span>
          </div>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] border-2 border-slate-300 transition cursor-pointer hidden md:flex shadow-xs"
            title={language === "vi" ? "Toàn màn hình" : "Fullscreen"}
            aria-label={language === "vi" ? "Toàn màn hình" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Toggle Sidebar (Chat / Notes) */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-2 rounded-sm border-2 transition cursor-pointer shadow-xs ${
              isSidebarOpen
                ? "bg-[#0F2747] text-white border-[#0F2747]"
                : "bg-white text-[#0F2747] border-slate-300 hover:bg-slate-50"
            }`}
            title={language === "vi" ? "Mở bảng ghi chú & chat" : "Toggle notes & chat"}
            aria-label={language === "vi" ? "Mở bảng ghi chú & chat" : "Toggle notes & chat"}
          >
            <MessageSquare className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Permission alert banner if any */}
      {permissionError && (
        <div className="bg-amber-100 text-amber-900 border-b-2 border-amber-300 px-4 py-2 text-xs text-center flex items-center justify-between z-30">
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
        {/* Central Stage */}
        <div className={`flex-1 p-3 sm:p-5 flex flex-col justify-center items-center relative bg-[#FFF9EF] min-h-0 ${isScreenSharing ? "overflow-hidden" : "overflow-y-auto"}`}>
          {/* SCREEN SHARE STAGE (if active) */}
          {isScreenSharing && (
            <div className="w-full flex-1 min-h-0 mb-3 bg-slate-900 rounded-md overflow-hidden border-2 border-[#0F2747] relative shadow-xl flex items-center justify-center">
              <video
                ref={screenVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-contain"
              />
              <div className="absolute top-3 left-3 bg-[#0F2747]/90 px-3 py-1.5 rounded-sm text-xs font-bold text-white flex items-center gap-2 border-2 border-white/20 shadow-md">
                <Monitor className="w-3.5 h-3.5 text-[#FFC83D]" />
                <span>{language === "vi" ? "Màn hình bài học đang được chia sẻ" : "Screen sharing is active"}</span>
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
              className={`relative rounded-md overflow-hidden bg-white border-2 transition-all flex flex-col items-center justify-center shadow-xs ${
                isScreenSharing
                  ? "w-28 sm:w-36 h-20 sm:h-24 shrink-0"
                  : peers.length === 0
                  ? "w-full aspect-[16/10] max-h-[420px]"
                  : "aspect-[4/3] w-full"
              } ${
                isSpeaking
                  ? "border-[#FFC83D] ring-2 ring-[#FFC83D]/40"
                  : "border-slate-300 hover:border-[#0F2747]"
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
                    className={`relative rounded-sm flex items-center justify-center font-black text-white shadow-xs border-2 transition-all z-10 ${
                      isScreenSharing
                        ? "w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm"
                        : peers.length === 0
                        ? "w-20 h-20 sm:w-24 sm:h-24 text-3xl sm:text-4xl"
                        : "w-16 h-16 text-xl"
                    } ${
                      isSpeaking
                        ? "bg-[#0F2747] border-[#FFC83D] ring-2 ring-[#FFC83D]/40"
                        : "bg-[#0F2747] border-[#FFC83D]"
                    }`}
                  >
                    {user.avatar?.startsWith("http") ? (
                      <img
                        src={user.avatar}
                        alt={user.realName || user.name}
                        className="w-full h-full rounded-sm object-cover"
                      />
                    ) : (
                      user.avatar || (getGivenName(user.realName || user.name)).charAt(0) || "P"
                    )}
                  </div>

                  <div className={`z-10 px-2 text-center ${isScreenSharing ? "mt-1" : "mt-4"}`}>
                    <span
                      title={user.realName || user.name}
                      className={`font-black text-[#0F2747] block font-poppins truncate ${isScreenSharing ? "max-w-[120px] sm:max-w-[150px] text-[10px] sm:text-xs" : "max-w-[180px] sm:max-w-[240px] text-base sm:text-lg"}`}
                    >
                      {getGivenName(user.realName || user.name) || (language === "vi" ? "Bạn" : "You")} ({language === "vi" ? "Bạn" : "You"})
                    </span>
                    {!isScreenSharing && (
                      <span className="text-xs text-[#52637A] font-bold mt-0.5 inline-flex items-center gap-1">
                        {currentClass?.tutorName === (user.realName || user.name)
                          ? (language === "vi" ? " Trưởng phòng" : " Host")
                          : (language === "vi" ? "Học viên" : "Learner")}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Status Tags */}
              <div className={`absolute flex items-center gap-1 z-10 ${isScreenSharing ? "top-1.5 left-1.5" : "top-3 left-3"}`}>
                <span className={`rounded-xs font-black bg-[#FFC83D] text-[#0F2747] border border-[#0F2747] shadow-xs ${isScreenSharing ? "px-1.5 py-0.5 text-[8px]" : "px-2 py-0.5 text-[10px]"}`}>
                  {language === "vi" ? "BẠN" : "YOU"}
                </span>
              </div>

              {/* Bottom Mic Badge with Audio Level Measure */}
              <div className={`absolute z-10 ${isScreenSharing ? "bottom-1.5 right-1.5" : "bottom-3 right-3"}`}>
                {isMicOn ? (
                  <div
                    className={`flex items-center gap-1.5 bg-white border-2 border-slate-300 shadow-xs ${
                      isScreenSharing ? "px-1.5 py-1 rounded-xs" : "px-2 py-1 rounded-sm"
                    }`}
                    title={language === "vi" ? "Micro đang bật (Đo âm lượng giọng nói)" : "Mic is on (Voice volume level)"}
                  >
                    <Mic className={`${isScreenSharing ? "w-3 h-3" : "w-4 h-4"} text-emerald-600 shrink-0`} />
                    {/* Vertical Volume Measure Bar */}
                    <div
                      className={`bg-slate-200 rounded-xs overflow-hidden flex flex-col justify-end p-[1px] ${
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
                    className={`rounded-sm bg-red-600 text-white flex items-center justify-center border-2 border-red-700 shadow-xs ${
                      isScreenSharing ? "w-5 h-5" : "w-7 h-7"
                    }`}
                    title={language === "vi" ? "Micro đã tắt" : "Mic is off"}
                  >
                    <MicOff className={isScreenSharing ? "w-3 h-3" : "w-3.5 h-3.5"} />
                  </div>
                )}
              </div>
            </div>

            {/* PEER PARTICIPANTS (Other students in room) */}
            {peers.map((peer) => (
              <div
                key={peer.id}
                className={`relative rounded-md overflow-hidden bg-white border-2 transition-all flex flex-col items-center justify-center shadow-xs ${
                  isScreenSharing
                    ? "w-28 sm:w-36 h-20 sm:h-24 shrink-0"
                    : "aspect-[4/3] w-full"
                } ${
                  peer.isSpeaking
                    ? "border-[#FFC83D] ring-2 ring-[#FFC83D]/40"
                    : "border-slate-300 hover:border-[#0F2747]"
                }`}
              >
                <div className={`relative flex flex-col items-center justify-center text-center ${isScreenSharing ? "p-1.5" : "p-4"}`}>
                  <div
                    className={`rounded-sm flex items-center justify-center font-bold text-white shadow-xs border-2 transition-all z-10 ${
                      isScreenSharing
                        ? "w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm"
                        : "w-16 h-16 text-xl"
                    } ${
                      peer.isSpeaking
                        ? "bg-[#0F2747] border-[#FFC83D] ring-2 ring-[#FFC83D]/40"
                        : "bg-[#0F2747] border-[#FFC83D]"
                    }`}
                  >
                    {peer.avatar?.startsWith("http") ? (
                      <img
                        src={peer.avatar}
                        alt={peer.name}
                        className="w-full h-full rounded-sm object-cover"
                      />
                    ) : (
                      peer.avatar || (getGivenName(peer.name)).charAt(0) || "S"
                    )}
                  </div>

                  <span
                    title={peer.name}
                    className={`font-black text-[#0F2747] z-10 block truncate px-2 ${isScreenSharing ? "max-w-[120px] sm:max-w-[150px] text-[10px] sm:text-xs mt-1" : "max-w-[180px] sm:max-w-[240px] text-sm mt-3"}`}
                  >
                    {getGivenName(peer.name)}
                  </span>
                  {!isScreenSharing && (
                    <span className="text-[11px] text-[#52637A] font-medium z-10">
                      {peer.isHost
                        ? (language === "vi" ? "Trưởng phòng" : "Host")
                        : (language === "vi" ? "Học sinh" : "Learner")}
                    </span>
                  )}
                </div>

                {/* Peer Mic Badge with Audio Level Measure */}
                <div className={`absolute z-10 ${isScreenSharing ? "bottom-1.5 right-1.5" : "bottom-3 right-3"}`}>
                  {peer.isMicOn ? (
                    <div
                      className={`flex items-center gap-1.5 bg-white border-2 border-slate-300 shadow-xs ${
                        isScreenSharing ? "px-1.5 py-1 rounded-xs" : "px-2 py-1 rounded-sm"
                      }`}
                      title={`${peer.name} ${language === "vi" ? "đang bật micro" : "has mic turned on"}`}
                    >
                      <Mic className={`${isScreenSharing ? "w-2.5 h-2.5" : "w-3.5 h-3.5"} text-emerald-600 shrink-0`} />
                      <div
                        className={`bg-slate-200 rounded-xs overflow-hidden flex flex-col justify-end p-[1px] ${
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
                      className={`rounded-sm bg-red-600 text-white flex items-center justify-center border-2 border-red-700 shadow-xs ${
                        isScreenSharing ? "w-5 h-5" : "w-7 h-7"
                      }`}
                      title={`${peer.name} ${language === "vi" ? "đã tắt micro" : "has mic turned off"}`}
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
            <div className="mt-6 text-center max-w-md p-4 rounded-md bg-white border-2 border-slate-300 shadow-xs">
              <p className="text-xs text-[#4B5563] leading-relaxed">
                🎉 {language === "vi" ? "Bạn đã mở phòng học thành công! Bấm" : "Room launched successfully! Click"}{" "}
                <strong className="text-[#0F2747] underline cursor-pointer font-bold" onClick={handleCopyLink}>
                  {language === "vi" ? "Mời bạn học" : "Invite Peers"}
                </strong>{" "}
                {language === "vi"
                  ? "để gửi link cho bạn bè cùng vào học bài và giải đề nhé."
                  : "to share the study link with peers to practice problems together."}
              </p>
            </div>
          )}
        </div>

        {/* 3. RIGHT SIDEBAR: DUAL TABS (CHAT & SCRATCHPAD) */}
        {isSidebarOpen && (
          <aside
            style={{ width: `${sidebarWidth}px` }}
            className="relative bg-white border-l-2 border-slate-300 flex flex-col h-full z-10 shrink-0 shadow-lg max-w-[85vw]"
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
              title={language === "vi" ? "Kéo sang trái/phải để chỉnh độ rộng khung" : "Drag left/right to resize sidebar"}
            >
              <div className="w-[3px] h-10 rounded-xs bg-[#0F2747]/30 group-hover:bg-[#0F2747] transition-colors" />
            </div>

            {/* Tabs Header */}
            <div className="px-4 border-b-2 border-slate-200 flex items-center gap-6 bg-white">
              <button
                type="button"
                onClick={() => setActiveTab("chat")}
                className={`py-3 text-xs font-bold transition flex items-center gap-2 cursor-pointer border-b-2 ${
                  activeTab === "chat"
                    ? "text-[#0F2747] border-[#0F2747]"
                    : "text-[#64748B] border-transparent hover:text-[#0F2747]"
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{language === "vi" ? "Trò chuyện" : "Chat"}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("notes")}
                className={`py-3 text-xs font-bold transition flex items-center gap-2 cursor-pointer border-b-2 ${
                  activeTab === "notes"
                    ? "text-[#0F2747] border-[#0F2747]"
                    : "text-[#64748B] border-transparent hover:text-[#0F2747]"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{language === "vi" ? "Bảng ghi chú" : "Scratchpad"}</span>
              </button>
            </div>

            {/* TAB CONTENT 1: CHAT */}
            {activeTab === "chat" && (
              <div className="flex-1 flex flex-col min-h-0 bg-[#FFFDF9]">
                <div className="p-3 border-b-2 border-slate-200 flex items-center justify-between text-xs text-[#52637A] bg-white">
                  <span className="font-bold text-[#0F2747]">
                    {language === "vi" ? "Tin nhắn phòng học" : "Room Chat"}
                  </span>
                  <span className="text-[11px] font-semibold">
                    {peers.length + 1} {language === "vi" ? "thành viên" : "members"}
                  </span>
                </div>

                {/* Messages Stream */}
                <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3.5">
                  {chatMessages.map((msg) => {
                    if (msg.isSystem) {
                      return (
                        <div
                          key={msg.id}
                          className="my-1.5 p-2 rounded-xs bg-amber-50 text-amber-900 italic text-[11px] border-2 border-amber-300 text-center leading-relaxed"
                        >
                          {msg.text}
                        </div>
                      );
                    }

                    const isMe = msg.sender === user.name || msg.sender === (language === "vi" ? "Tôi" : "Me") || msg.sender === "Tôi";

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
                            {isMe ? `${msg.sender} (${language === "vi" ? "Bạn" : "You"})` : msg.sender}
                          </span>
                          <span className="text-[10px] text-gray-400">{msg.time}</span>
                        </div>

                        {/* Bubble */}
                        <div
                          className={`max-w-[85%] w-fit px-3.5 py-2.5 rounded-sm text-xs leading-relaxed whitespace-pre-wrap break-words border-2 shadow-xs ${
                            isMe
                              ? "bg-[#0F2747] text-white border-[#0F2747]"
                              : "bg-white text-[#0F2747] border-slate-300"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    );
                  })}
                  <div ref={chatBottomRef} />
                </div>

                {/* Message Input Box with Multiline Support */}
                <form
                  onSubmit={handleSendMessage}
                  className="p-3 border-t-2 border-slate-200 flex flex-col gap-1.5 bg-white"
                >
                  <div className="flex items-end gap-2">
                    <textarea
                      ref={chatTextareaRef}
                      rows={1}
                      placeholder={language === "vi" ? "Nhập tin nhắn..." : "Type a message..."}
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="flex-1 bg-[#FFFDF9] border-2 border-slate-300 rounded-sm px-3.5 py-2 text-xs text-[#0F2747] placeholder-slate-400 focus:outline-none focus:border-[#0F2747] min-h-[40px] max-h-28 resize-none overflow-y-auto leading-relaxed font-sans"
                    />
                    <button
                      type="submit"
                      disabled={!messageInput.trim()}
                      className="p-2.5 rounded-sm bg-[#FFC83D] hover:bg-[#EAB308] border-2 border-[#0F2747] disabled:opacity-40 disabled:cursor-not-allowed text-[#0F2747] font-bold transition cursor-pointer shrink-0 active:scale-95 shadow-xs h-[40px] w-[40px] flex items-center justify-center"
                      title={language === "vi" ? "Gửi tin nhắn" : "Send message"}
                      aria-label={language === "vi" ? "Gửi tin nhắn" : "Send message"}
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between px-1 text-[10px] text-gray-400 select-none">
                    <span>{language === "vi" ? "Shift + Enter để xuống dòng" : "Shift + Enter for new line"}</span>
                    <span>{language === "vi" ? "Enter để gửi" : "Enter to send"}</span>
                  </div>
                </form>
              </div>
            )}

            {/* TAB CONTENT 2: SHARED SCRATCHPAD */}
            {activeTab === "notes" && (
              <div className="flex-1 flex flex-col min-h-0 p-3 bg-[#FFFDF9]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-[#0F2747] flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5 text-[#4F7ECB]" />
                    {language === "vi" ? "Ghi chú bài học đồng bộ" : "Live Synchronized Scratchpad"}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyNotes}
                    className="text-[11px] font-bold text-[#0F2747] hover:underline cursor-pointer"
                  >
                    {copiedNotes ? (language === "vi" ? "✓ Đã copy!" : "✓ Copied!") : (language === "vi" ? "Copy ghi chú" : "Copy Notes")}
                  </button>
                </div>

                <p className="text-[11px] text-[#52637A] mb-2 leading-relaxed">
                  {language === "vi"
                    ? "Mọi nội dung bạn gõ ở đây sẽ được đồng bộ trực tiếp tới tất cả bạn học trong phòng."
                    : "Notes entered here synchronize in real-time across all room participants."}
                </p>

                <textarea
                  value={sharedNotes}
                  onChange={(e) => handleNotesChange(e.target.value)}
                  placeholder={
                    language === "vi"
                      ? "Nhập ghi chú, công thức Toán, từ vựng hoặc đề thi cần thảo luận..."
                      : "Type notes, Math formulas, vocabulary, or review problems..."
                  }
                  className="flex-1 w-full p-3.5 rounded-sm bg-white border-2 border-slate-300 text-xs text-[#0F2747] placeholder-slate-400 focus:outline-none focus:border-[#0F2747] resize-none font-mono leading-relaxed shadow-xs"
                />

                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleNotesChange(sharedNotes + "\n- [ ] ")}
                    className="text-[11px] px-2.5 py-1 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] font-bold cursor-pointer border-2 border-slate-300 shadow-xs"
                  >
                    + {language === "vi" ? "Việc cần làm" : "To-do item"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNotesChange(sharedNotes + (language === "vi" ? "\n💡 Công thức: " : "\n💡 Formula: "))}
                    className="text-[11px] px-2.5 py-1 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] font-bold cursor-pointer border-2 border-slate-300 shadow-xs"
                  >
                    + {language === "vi" ? "Công thức" : "Formula"}
                  </button>
                </div>
              </div>
            )}
          </aside>
        )}
      </div>

      {/* 4. BOTTOM FLOATING CONTROLS BAR (ICON-ONLY DOCK) */}
      <footer className="h-16 bg-[#FFF9EF] border-t-2 border-slate-300 px-4 flex items-center justify-center shrink-0 z-20">
        <div className="flex items-center gap-2 sm:gap-2.5 bg-white p-1.5 rounded-md border-2 border-slate-300 shadow-lg">
          {/* Micro Button */}
          <button
            type="button"
            onClick={toggleMic}
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-sm flex items-center justify-center transition cursor-pointer active:scale-95 shadow-xs border-2 ${
              isMicOn
                ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-400"
                : "bg-red-50 hover:bg-red-100 text-red-600 border-red-300"
            }`}
            title={isMicOn ? (language === "vi" ? "Tắt micro" : "Mute mic") : (language === "vi" ? "Bật micro" : "Unmute mic")}
            aria-label={isMicOn ? (language === "vi" ? "Tắt micro" : "Mute mic") : (language === "vi" ? "Bật micro" : "Unmute mic")}
          >
            {isMicOn ? <Mic className="w-5 h-5 text-emerald-600" /> : <MicOff className="w-5 h-5 text-red-500" />}
          </button>

          {/* Camera Button */}
          <button
            type="button"
            onClick={toggleCam}
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-sm flex items-center justify-center transition cursor-pointer active:scale-95 shadow-xs border-2 ${
              isCamOn
                ? "bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-400"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-300"
            }`}
            title={isCamOn ? (language === "vi" ? "Tắt camera" : "Turn off camera") : (language === "vi" ? "Bật camera" : "Turn on camera")}
            aria-label={isCamOn ? (language === "vi" ? "Tắt camera" : "Turn off camera") : (language === "vi" ? "Bật camera" : "Turn on camera")}
          >
            {isCamOn ? <Video className="w-5 h-5 text-amber-600" /> : <VideoOff className="w-5 h-5 text-slate-400" />}
          </button>

          {/* Screen Share Button */}
          <button
            type="button"
            onClick={toggleScreenShare}
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-sm flex items-center justify-center transition cursor-pointer active:scale-95 shadow-xs border-2 ${
              isScreenSharing
                ? "bg-[#0F2747] text-white border-[#0F2747]"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-300"
            }`}
            title={isScreenSharing ? (language === "vi" ? "Dừng chia sẻ màn hình" : "Stop screen sharing") : (language === "vi" ? "Chia sẻ màn hình" : "Share screen")}
            aria-label={isScreenSharing ? (language === "vi" ? "Dừng chia sẻ màn hình" : "Stop screen sharing") : (language === "vi" ? "Chia sẻ màn hình" : "Share screen")}
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
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-sm flex items-center justify-center transition cursor-pointer shadow-xs border-2 ${
              isSidebarOpen && activeTab === "notes"
                ? "bg-[#FFC83D]/30 text-[#0F2747] border-[#0F2747]"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-300"
            }`}
            title={language === "vi" ? "Bảng ghi chú chung" : "Shared Scratchpad"}
            aria-label={language === "vi" ? "Bảng ghi chú chung" : "Shared Scratchpad"}
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
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-sm flex items-center justify-center transition cursor-pointer shadow-xs border-2 ${
              isSidebarOpen && activeTab === "chat"
                ? "bg-[#FFC83D]/30 text-[#0F2747] border-[#0F2747]"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-300"
            }`}
            title={language === "vi" ? "Trò chuyện" : "Chat"}
            aria-label={language === "vi" ? "Trò chuyện" : "Chat"}
          >
            <MessageSquare className="w-5 h-5 text-[#0F2747]" />
          </button>

          <div className="h-6 w-px bg-slate-300 mx-1" />

          {/* Single Dedicated Clean Leave Button */}
          <button
            type="button"
            onClick={handleLeaveRoom}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-sm flex items-center justify-center bg-red-600 hover:bg-red-700 text-white shadow-xs border-2 border-red-700 transition-all cursor-pointer active:scale-95"
            title={language === "vi" ? "Rời khỏi phòng học" : "Leave Room"}
            aria-label={language === "vi" ? "Rời khỏi phòng học" : "Leave Room"}
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
}
