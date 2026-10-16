"use client";

import React, { useState, useRef, useEffect } from "react";
import { Hash, Volume2, ShieldCheck, Users, MessageSquare, ExternalLink, Bot, Send, Mic, MicOff, Headphones, Settings, Smile, PlusCircle } from "lucide-react";
import { DiscordLogo } from "./BrandIcons";
import { usePencily } from "@/context/PencilyContext";

interface DiscordMessage {
  id: string;
  sender: string;
  role: "bot" | "admin" | "tutor" | "student" | "me";
  avatarBg: string;
  avatarText: string;
  time: string;
  content: string;
  badge?: string;
}

export function DiscordCommunity() {
  const { user, language } = usePencily();
  const isVi = language === "vi";

  const [activeChannelId, setActiveChannelId] = useState("thong-bao-chung");
  const [typedMessage, setTypedMessage] = useState("");
  const [isVoiceConnected, setIsVoiceConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Channels setup
  const channels = [
    {
      id: "thong-bao-chung",
      name: "thong-bao-chung",
      type: "text",
      category: "CHÀO MỪNG",
      description: "Kênh thông báo lịch học, tài liệu và hoạt động chính thức của The Pencily",
    },
    {
      id: "quy-tac-ung-xu",
      name: "quy-tac-ung-xu",
      type: "text",
      category: "CHÀO MỪNG",
      description: "Quy chuẩn an toàn, học tập văn minh & bình đẳng",
    },
    {
      id: "giai-dap-toan",
      name: "hoi-dap-toan-hoc",
      type: "text",
      category: "DIỄN ĐÀN HỌC TẬP",
      description: "Thảo luận bài tập Toán 10-12, đề thi ĐGNL & mẹo giải đề",
    },
    {
      id: "ielts-practice",
      name: "ielts-speaking-writing",
      type: "text",
      category: "DIỄN ĐÀN HỌC TẬP",
      description: "Trao đổi bài viết Writing Task 1-2 và luyện Speaking theo bộ Forecast",
    },
    {
      id: "digital-sat-chat",
      name: "sat-desmos-math",
      type: "text",
      category: "DIỄN ĐÀN HỌC TẬP",
      description: "Thảo luận bẫy Reading & Writing và hack 800 Math bằng Desmos",
    },
    {
      id: "voice-pomodoro",
      name: "Phòng Pomodoro Tập Trung 24/7",
      type: "voice",
      category: "PHÒNG HỌC VOICE",
      description: "Phòng học im lặng, bật cam/screen share cùng học bài",
    },
    {
      id: "voice-ielts-mock",
      name: "Phòng Live Speaking 1-on-1",
      type: "voice",
      category: "PHÒNG HỌC VOICE",
      description: "Phòng luyện nói trực tiếp cùng Peer Tutor band 8.0+",
    },
  ];

  // Channel-specific message histories
  const [channelMessages, setChannelMessages] = useState<Record<string, DiscordMessage[]>>({
    "thong-bao-chung": [
      {
        id: "msg-1",
        sender: "Pencily Bot",
        role: "bot",
        avatarBg: "bg-[#5865F2]",
        avatarText: "🤖",
        time: "Hôm nay lúc 19:30",
        badge: "BOT",
        content: "🎉 Chào mừng các bạn học sinh đến với **The Pencily**! Toàn bộ phòng học, tài liệu Cornell và buổi kèm 1-1 đều mở tự do 100% phi lợi nhuận.",
      },
      {
        id: "msg-2",
        sender: "Academic Core Team",
        role: "admin",
        avatarBg: "bg-[#FFC83D] text-[#0F2747]",
        avatarText: "👑",
        time: "Hôm nay lúc 20:00",
        badge: "CORE",
        content: "Lịch học tuần này đã lên: Tối thứ 5 có Workshop *Giải nhanh ĐGNL 900+*, Tối thứ 7 là *Chiến lược Hack 800 SAT Math bằng Desmos*. Hãy nhận role để nhận ping nhé!",
      },
    ],
    "quy-tac-ung-xu": [
      {
        id: "msg-rule-1",
        sender: "Pencily Honor Code",
        role: "admin",
        avatarBg: "bg-emerald-600 text-white",
        avatarText: "🛡️",
        time: "Ghim tự động",
        content: "1. Tôn trọng mọi câu hỏi, không phán xét bất kể xuất phát điểm học lực.\n2. Giữ phòng Voice trật tự và lịch sự.\n3. Tuyệt đối không chia sẻ tài liệu vi phạm bản quyền thương mại.",
      },
    ],
    "giai-dap-toan": [
      {
        id: "msg-math-1",
        sender: "Minh Triết (Tutor 9.8 Toán)",
        role: "tutor",
        avatarBg: "bg-amber-600 text-white",
        avatarText: "MT",
        time: "Hôm nay lúc 14:15",
        badge: "TUTOR",
        content: "Bạn nào vừa hỏi câu số phức min-max trong đề thi thử ĐHQG thì chú ý phương pháp hình học elip nhé, vẽ đường tròn phụ sẽ bấm máy nhanh hơn giải tích đại số!",
      },
      {
        id: "msg-math-2",
        sender: "Hoàng Long (Lớp 12)",
        role: "student",
        avatarBg: "bg-blue-600 text-white",
        avatarText: "HL",
        time: "Hôm nay lúc 14:20",
        content: "Dạ em hiểu rồi ạ, cảm ơn anh Triết! Nhờ cách này em tiết kiệm được gần 3 phút cho câu 45.",
      },
    ],
    "ielts-practice": [
      {
        id: "msg-ielts-1",
        sender: "Bảo Ngọc (IELTS 8.0)",
        role: "tutor",
        avatarBg: "bg-purple-600 text-white",
        avatarText: "BN",
        time: "Hôm nay lúc 16:00",
        badge: "TUTOR",
        content: "Topic Speaking Part 2 tuần này: *Describe a skill you learned from an older person*. Tối nay 20:30 phòng Voice Live Speaking sẽ mở để luyện phản xạ 1-1 nha mọi người!",
      },
    ],
    "digital-sat-chat": [
      {
        id: "msg-sat-1",
        sender: "Đăng Khoa (SAT 1540)",
        role: "tutor",
        avatarBg: "bg-teal-600 text-white",
        avatarText: "DK",
        time: "Hôm nay lúc 17:45",
        badge: "TUTOR",
        content: "Nhắc nhẹ các bạn thi Digital SAT: Gặp hệ phương trình bậc 2 có tham số `k`, gõ thẳng `y = ...` vào Desmos rồi dùng thanh trượt slider đếm số giao điểm trong 5 giây, đừng vội giải Delta bằng tay nhé!",
      },
    ],
  });

  const activeChannel = channels.find((c) => c.id === activeChannelId) || channels[0];
  const currentMessages = channelMessages[activeChannelId] || [];

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [channelMessages, activeChannelId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;

    const newMsg: DiscordMessage = {
      id: `msg-${Date.now()}`,
      sender: user.name || "Bạn (Học sinh)",
      role: "me",
      avatarBg: "bg-emerald-600 text-white",
      avatarText: (user.name || "P").substring(0, 2).toUpperCase(),
      time: "Vừa xong",
      content: typedMessage.trim(),
    };

    setChannelMessages((prev) => ({
      ...prev,
      [activeChannelId]: [...(prev[activeChannelId] || []), newMsg],
    }));

    setTypedMessage("");

    // Realistic bot automated reaction after 1.2s
    setTimeout(() => {
      setChannelMessages((prev) => {
        const currentList = prev[activeChannelId] || [];
        const botReply: DiscordMessage = {
          id: `bot-reply-${Date.now()}`,
          sender: "Pencily Bot",
          role: "bot",
          avatarBg: "bg-[#5865F2]",
          avatarText: "🤖",
          time: "Vừa xong",
          badge: "BOT",
          content: `Tin nhắn của bạn đã được ghi nhận trong **#${activeChannel.name}**! Các bạn trong nhóm học tập và Peer Tutor sẽ nhận được thông báo phản hồi.`,
        };
        return {
          ...prev,
          [activeChannelId]: [...currentList, botReply],
        };
      });
    }, 1200);
  };

  const handleChannelSelect = (ch: typeof channels[0]) => {
    setActiveChannelId(ch.id);
    if (ch.type === "voice") {
      setIsVoiceConnected(true);
    }
  };

  return (
    <section id="discord" className="py-16 sm:py-24 bg-[#FFF9EF] border-b-2 border-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-[#5865F2]/15 text-[#5865F2] border-2 border-[#5865F2]/30 text-xs font-black uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{isVi ? "Trình Mô Phỏng Tương Tác" : "Interactive Community Simulator"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0F2747] font-poppins tracking-tight">
            {isVi ? "Không Gian Học Tập Discord The Pencily" : "The Pencily Discord Learning Hub"}
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#4B5563] leading-relaxed">
            {isVi
              ? "Bấm vào các kênh bên dưới, thử nhắn tin hoặc kết nối voice room để trải nghiệm môi trường học tập đồng hành trước khi tham gia chính thức."
              : "Click channels, send test questions, or connect voice rooms to preview our real peer-learning environment."}
          </p>
        </div>

        {/* Discord Simulator Window */}
        <div className="max-w-5xl mx-auto rounded-md bg-[#1E1F22] text-slate-200 border-2 border-[#0F2747] shadow-2xl overflow-hidden font-sans">
          {/* Top Title Bar */}
          <div className="bg-[#111214] px-4 py-2.5 flex items-center justify-between border-b-2 border-[#2B2D31]">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <DiscordLogo className="w-4 h-4 text-[#5865F2]" />
              <span className="text-slate-200 font-extrabold">The Pencily Server</span>
              <span className="text-slate-500 hidden sm:inline">/ Discord Web Simulator</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-xs">
                {isVi ? "128 bạn đang online" : "128 online"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px]">
            {/* 1. LEFT SIDEBAR (Channels, Voice Control, User Dock) */}
            <div className="md:col-span-4 bg-[#2B2D31] flex flex-col justify-between border-r-2 border-[#1E1F22]">
              <div className="p-3 space-y-4">
                {/* Server Badge Card */}
                <div className="flex items-center justify-between p-2 rounded-xs bg-[#1E1F22] border border-[#3F4147]">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-xs bg-[#FFC83D] text-[#0F2747] font-black text-xs flex items-center justify-center">
                      P
                    </span>
                    <span className="font-black text-xs sm:text-sm text-white truncate">
                      The Pencily
                    </span>
                  </div>
                  <span className="text-[10px] bg-[#5865F2] text-white px-1.5 py-0.5 rounded-xs font-bold">
                    Official
                  </span>
                </div>

                {/* Channels List by Category */}
                <div className="space-y-3 text-xs">
                  {["CHÀO MỪNG", "DIỄN ĐÀN HỌC TẬP", "PHÒNG HỌC VOICE"].map((cat) => {
                    const groupChannels = channels.filter((c) => c.category === cat);
                    return (
                      <div key={cat} className="space-y-1">
                        <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-2">
                          {cat}
                        </div>
                        {groupChannels.map((ch) => {
                          const isSelected = activeChannelId === ch.id;
                          return (
                            <button
                              key={ch.id}
                              type="button"
                              onClick={() => handleChannelSelect(ch)}
                              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xs text-left transition-colors cursor-pointer border ${
                                isSelected
                                  ? "bg-[#35373C] text-white font-bold border-[#5865F2]"
                                  : "text-slate-400 hover:bg-[#313338] hover:text-slate-200 border-transparent"
                              }`}
                            >
                              <div className="flex items-center gap-2 truncate">
                                {ch.type === "voice" ? (
                                  <Volume2 className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-emerald-400" : "text-slate-400"}`} />
                                ) : (
                                  <Hash className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                                )}
                                <span className="truncate">{ch.name}</span>
                              </div>
                              {ch.type === "voice" && isSelected && isVoiceConnected && (
                                <span className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-1 py-0.2 rounded-xs font-bold">
                                  LIVE
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Connected Voice Dock (if connected) & User Status Bar */}
              <div className="border-t-2 border-[#1E1F22] bg-[#232428]">
                {/* Active Voice Status if Voice Room Selected */}
                {isVoiceConnected && (
                  <div className="p-2.5 bg-emerald-950/30 border-b border-emerald-500/20 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                      <div>
                        <div className="text-[11px] font-bold text-emerald-300 leading-none">
                          {isVi ? "Đã kết nối Voice" : "Voice Connected"}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate max-w-[120px]">
                          {activeChannel.name}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsVoiceConnected(false)}
                      className="px-2 py-1 rounded-xs bg-red-600/30 hover:bg-red-600 text-red-300 hover:text-white text-[10px] font-bold border border-red-500/40 transition cursor-pointer"
                    >
                      {isVi ? "Ngắt" : "Disconnect"}
                    </button>
                  </div>
                )}

                {/* Bottom User Bar */}
                <div className="p-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xs bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {(user.name || "P").substring(0, 2).toUpperCase()}
                    </div>
                    <div className="truncate max-w-[110px]">
                      <div className="font-bold text-xs text-white truncate leading-none">
                        {user.name || "Student"}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">
                        {user.discord || "@pencily_learner"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-slate-400">
                    <button
                      type="button"
                      onClick={() => setIsMuted(!isMuted)}
                      className={`p-1.5 rounded-xs hover:bg-[#35373C] hover:text-white transition cursor-pointer ${
                        isMuted ? "text-red-400 bg-red-950/40" : ""
                      }`}
                      title={isMuted ? "Bật mic" : "Tắt mic"}
                    >
                      {isMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsDeafened(!isDeafened)}
                      className={`p-1.5 rounded-xs hover:bg-[#35373C] hover:text-white transition cursor-pointer ${
                        isDeafened ? "text-red-400 bg-red-950/40" : ""
                      }`}
                      title={isDeafened ? "Mở tai nghe" : "Tắt âm thanh"}
                    >
                      <Headphones className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. RIGHT CHAT FEED & INTERACTIVE MESSAGING */}
            <div className="md:col-span-8 bg-[#313338] flex flex-col justify-between h-[460px]">
              {/* Channel Header Bar */}
              <div className="px-4 py-3 bg-[#313338] border-b-2 border-[#3F4147] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2 text-xs font-bold text-white truncate">
                  {activeChannel.type === "voice" ? (
                    <Volume2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Hash className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                  <span className="text-white font-extrabold">{activeChannel.name}</span>
                  <span className="text-slate-400 font-normal hidden lg:inline truncate">
                    : {activeChannel.description}
                  </span>
                </div>

                <a
                  href="https://discord.gg/6hpEf4wC4z"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs bg-[#5865F2] hover:bg-[#4752C4] text-white text-[11px] font-bold transition shadow-2xs shrink-0"
                >
                  <DiscordLogo className="w-3 h-3" />
                  <span className="hidden sm:inline">{isVi ? "Vào server thật" : "Join Real Server"}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Chat Message Scrollable Container */}
              <div ref={chatScrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 text-xs sm:text-sm">
                {/* Voice channel specific preview screen if voice selected */}
                {activeChannel.type === "voice" ? (
                  <div className="bg-[#2B2D31] p-6 rounded-md border-2 border-[#3F4147] text-center space-y-4 my-4">
                    <div className="w-12 h-12 rounded-sm bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto">
                      <Volume2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-poppins font-black text-base text-white">
                        {activeChannel.name}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                        {isVi
                          ? "Phòng voice đang mở trên máy chủ Discord The Pencily. Bạn có thể bật mic chia sẻ bài tập hoặc nghe giảng trực tiếp từ peer tutor."
                          : "Live Discord audio room. Connect with mic to practice 1-on-1 or listen to ongoing study sessions."}
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-3 pt-2">
                      {!isVoiceConnected ? (
                        <button
                          type="button"
                          onClick={() => setIsVoiceConnected(true)}
                          className="px-5 py-2 rounded-sm bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition cursor-pointer"
                        >
                          {isVi ? "🔊 Kết nối thử âm thanh" : "🔊 Test Connect Audio"}
                        </button>
                      ) : (
                        <span className="text-xs text-emerald-400 font-bold bg-emerald-950/60 px-3 py-1.5 rounded-xs border border-emerald-500/40">
                          ✓ {isVi ? "Đang trong phòng voice ảo" : "Connected in virtual voice"}
                        </span>
                      )}
                    </div>
                  </div>
                ) : null}

                {/* Render Channel Messages */}
                {currentMessages.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-3 group">
                    <div className={`w-8 h-8 rounded-xs ${msg.avatarBg} flex items-center justify-center font-bold text-xs shrink-0 select-none shadow-2xs`}>
                      {msg.avatarText}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`font-bold text-xs ${
                          msg.role === "admin"
                            ? "text-[#FFC83D]"
                            : msg.role === "tutor"
                            ? "text-amber-400"
                            : msg.role === "bot"
                            ? "text-[#5865F2]"
                            : "text-white"
                        }`}>
                          {msg.sender}
                        </span>
                        {msg.badge && (
                          <span className="bg-[#5865F2] text-white text-[9px] px-1 py-0.2 rounded-xs font-bold leading-none">
                            {msg.badge}
                          </span>
                        )}
                        <span className="text-[10px] text-slate-500">{msg.time}</span>
                      </div>
                      <div className="mt-1 text-slate-200 leading-relaxed break-words whitespace-pre-wrap">
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input Dock */}
              <div className="p-3 bg-[#313338] border-t-2 border-[#3F4147] shrink-0">
                <form onSubmit={handleSendMessage} className="relative flex items-center">
                  <input
                    type="text"
                    value={typedMessage}
                    onChange={(e) => setTypedMessage(e.target.value)}
                    placeholder={
                      isVi
                        ? `Gõ tin nhắn thử vào #${activeChannel.name}... (Nhấn Enter để gửi)`
                        : `Message #${activeChannel.name}... (Press Enter to send)`
                    }
                    className="w-full pl-4 pr-12 py-2.5 bg-[#383A40] text-slate-100 placeholder:text-slate-500 rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-[#5865F2] transition"
                  />
                  <button
                    type="submit"
                    disabled={!typedMessage.trim()}
                    className="absolute right-2 p-1.5 text-slate-400 hover:text-white disabled:opacity-40 transition cursor-pointer"
                    title="Gửi tin nhắn"
                  >
                    <Send className="w-4 h-4 text-[#5865F2]" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
