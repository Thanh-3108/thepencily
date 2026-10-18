"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Hash,
  Volume2,
  Bell,
  Pin,
  Users,
  Search,
  Inbox,
  HelpCircle,
  Plus,
  Gift,
  Smile,
  Send,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Compass,
  Calendar,
  Tag,
  ShieldAlert,
  Folder,
  Radio,
  FileText,
  Megaphone,
  HelpCircle as QuestionIcon,
  Link2,
  Newspaper,
  CornerDownRight,
  Flame,
} from "lucide-react";
import { DiscordLogo } from "./BrandIcons";
import { usePencily } from "@/context/PencilyContext";

interface ChatReaction {
  emoji: string;
  count: number;
  reacted?: boolean;
}

interface ChatMessage {
  id: string;
  sender: string;
  senderColor?: string;
  badge?: string;
  avatar: string;
  time: string;
  replyTo?: {
    text: string;
    sender?: string;
  };
  content?: string;
  image?: string;
  reactions?: ChatReaction[];
}

export function DiscordCommunity() {
  const { user, language } = usePencily();
  const isVi = language === "vi";

  const [activeChannel, setActiveChannel] = useState("goi-y-lop-hoc");
  const [showMemberList, setShowMemberList] = useState(true);
  const [inputText, setInputText] = useState("");
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Exact messages reconstructed directly from the user's authentic Discord screenshot
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "Double Counter",
      badge: "APP",
      avatar: "/brand/elements/discord-avatar-counter.png",
      time: "8/21/2026 11:32 AM",
      image: "/brand/elements/discord-gigachad.png",
    },
    {
      id: "msg-2",
      sender: "ProfessionalTaxEvader",
      senderColor: "#F59E0B", // Gold / amber
      avatar: "/brand/elements/discord-avatar-tax.png",
      time: "8/21/2026 11:37 AM",
      content: "câm mồm!",
    },
    {
      id: "msg-3",
      sender: "Gp ⚔️ NOOB",
      senderColor: "#FBBF24", // Yellow
      avatar: "/brand/elements/discord-avatar-gp.png",
      time: "8/21/2026 11:37 AM",
      replyTo: {
        text: "Original message was deleted",
      },
      content: "ai hỏi mà đại biểu trả lời",
    },
    {
      id: "msg-4",
      sender: "Huỳnh Công Thành 🗡️ TDS",
      senderColor: "#F43F5E", // Rose / Red
      avatar: "/brand/elements/discord-avatar-thanh.png",
      time: "8/21/2026 11:38 AM",
      content: "ko ấy kiếm gì đó về học tập r spam aya 🤑",
      reactions: [
        { emoji: "😭", count: 1, reacted: true },
        { emoji: "🙂", count: 0, reacted: false },
      ],
    },
    {
      id: "msg-5",
      sender: "NGỌC LINH [✓]VN 💖 Fatboy",
      senderColor: "#34D399", // Mint / Emerald
      avatar: "/brand/elements/discord-avatar-ngoclinh.png",
      time: "8/21/2026 11:42 AM",
      content: "Thoi mà",
    },
    {
      id: "msg-6",
      sender: "Huỳnh Công Thành 🗡️ TDS",
      senderColor: "#F43F5E", // Rose / Red
      avatar: "/brand/elements/discord-avatar-thanh.png",
      time: "8/21/2026 5:55 PM",
      content: "hmmm",
      image: "/brand/elements/discord-thanh-photo.png", // Authentic photo of Thanh holding Dan Nhi
    },
  ]);

  // Auto-scroll chat to bottom on new message
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: user?.name || "Học sinh Pencily",
      senderColor: "#38BDF8", // Sky blue for current student
      avatar: user?.avatar || "/brand/elements/discord-avatar-thanh.png",
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      content: inputText.trim(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
  };

  const toggleReaction = (msgId: string, emojiIdx: number) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id !== msgId || !msg.reactions) return msg;
        const nextReactions = [...msg.reactions];
        const r = nextReactions[emojiIdx];
        if (r) {
          const reacted = !r.reacted;
          nextReactions[emojiIdx] = {
            ...r,
            reacted,
            count: reacted ? r.count + 1 : Math.max(0, r.count - 1),
          };
        }
        return { ...msg, reactions: nextReactions };
      })
    );
  };

  return (
    <div className="w-full space-y-4 animate-fadeIn">
      {/* Top Banner & Quick Join Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b-2 border-slate-300">
        <div>
          <h2 className="font-poppins font-black text-2xl sm:text-3xl text-[#0F2747] tracking-tight flex items-center gap-2.5">
            <DiscordLogo className="w-7 h-7 text-[#5865F2]" />
            <span>{isVi ? "Máy Chủ Discord The Pencily" : "The Pencily Discord Community"}</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] mt-0.5 font-medium">
            {isVi
              ? "Không gian học tập, phòng voice trực tiếp và kết nối với học sinh & peer tutors."
              : "Live study lounges, peer-to-peer discussion channels, and direct tutor support."}
          </p>
        </div>

        <a
          href="https://discord.gg/6hpEf4wC4z"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold shadow-2xs active:scale-95 transition cursor-pointer shrink-0"
        >
          <DiscordLogo className="w-4 h-4 fill-white" />
          <span>{isVi ? "Vào Discord The Pencily" : "Join Our Discord"}</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-80" />
        </a>
      </div>

      {/* Main Discord App Window (Faithful Reconstruction from User Screenshot) */}
      <div className="rounded-md bg-[#313338] text-slate-200 border-2 border-[#1E1F22] shadow-xl overflow-hidden font-sans select-text">
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[580px] max-h-[720px]">
          {/* =========================================================================
              1. LEFT SIDEBAR: CHANNELS & SERVER INFO (#1E1F22 / #2B2D31)
              ========================================================================= */}
          <div className="md:col-span-4 lg:col-span-3 bg-[#1E1F22] border-r border-[#111214] flex flex-col justify-between overflow-y-auto [scrollbar-width:none]">
            <div>
              {/* Server Header Dropdown */}
              <div className="h-12 px-4 flex items-center justify-between border-b border-[#111214] bg-[#2B2D31]/40 hover:bg-[#35373C]/60 transition cursor-pointer">
                <div className="flex items-center gap-2 font-bold text-sm text-white truncate">
                  <div className="w-5 h-5 rounded-xs bg-gradient-to-tr from-purple-500 via-pink-500 to-amber-400 shrink-0" />
                  <span className="truncate">The Pencily</span>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-300 shrink-0" />
              </div>

              {/* Boost Goal Bar */}
              <div className="p-2.5 mx-2 my-2 rounded-xs bg-[#2B2D31] text-[11px] font-semibold flex items-center justify-between cursor-pointer hover:bg-[#35373C] transition">
                <div className="flex items-center gap-1.5 text-pink-400 font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Boost Goal</span>
                </div>
                <span className="text-slate-400 font-mono text-[10px]">2/36 Boosts &gt;</span>
              </div>

              {/* Server Nav Links */}
              <div className="px-2 space-y-0.5 text-xs text-slate-400 font-medium pb-2 border-b border-[#2B2D31]/50">
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-xs hover:bg-[#35373C] hover:text-white cursor-pointer transition">
                  <Compass className="w-4 h-4" />
                  <span>Server Guide</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-xs hover:bg-[#35373C] hover:text-white cursor-pointer transition">
                  <Calendar className="w-4 h-4" />
                  <span>Events</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-xs hover:bg-[#35373C] hover:text-white cursor-pointer transition">
                  <Tag className="w-4 h-4" />
                  <span>Channels & Roles</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-xs hover:bg-[#35373C] hover:text-white cursor-pointer transition">
                  <Users className="w-4 h-4" />
                  <span>Members</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-xs hover:bg-[#35373C] hover:text-white cursor-pointer transition">
                  <Flame className="w-4 h-4 text-pink-400" />
                  <span>Server Boosts</span>
                </div>
              </div>

              {/* Channel Category: PINNED CHANNELS */}
              <div className="px-2 pt-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1 flex items-center justify-between">
                  <span>Pinned Channels</span>
                </div>

                <div className="space-y-0.5 text-xs">
                  {/* Active Channel: goi-y-lop-hoc */}
                  <button
                    type="button"
                    onClick={() => setActiveChannel("goi-y-lop-hoc")}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xs font-semibold transition text-left cursor-pointer ${
                      activeChannel === "goi-y-lop-hoc"
                        ? "bg-[#35373C] text-white"
                        : "text-slate-400 hover:bg-[#35373C]/50 hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <Hash className="w-4 h-4 text-slate-300 shrink-0" />
                      <span className="truncate">🎯 goi-y-lop-hoc</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveChannel("phan-hoi-de-xuat")}
                    className={`w-full flex items-center gap-1.5 px-2.5 py-1.5 rounded-xs font-medium transition text-left cursor-pointer ${
                      activeChannel === "phan-hoi-de-xuat"
                        ? "bg-[#35373C] text-white"
                        : "text-slate-400 hover:bg-[#35373C]/50 hover:text-slate-200"
                    }`}
                  >
                    <span className="text-sm">📝</span>
                    <span className="truncate">phản-hồi-đề-xuất</span>
                  </button>
                </div>
              </div>

              {/* Voice Channel: SAT Math */}
              <div className="px-2 pt-3">
                <div className="space-y-0.5 text-xs">
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xs text-slate-400 hover:bg-[#35373C]/50 hover:text-slate-200 cursor-pointer transition">
                    <Radio className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="truncate">SAT Math Tutoring Session</span>
                  </div>
                </div>
              </div>

              {/* Category: SERVER STATS */}
              <div className="px-2 pt-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1 flex items-center justify-between cursor-pointer">
                  <span>📊 SERVER STATS</span>
                  <Plus className="w-3 h-3 hover:text-white" />
                </div>
              </div>

              {/* Category: INFO & WELCOME */}
              <div className="px-2 pt-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1 flex items-center justify-between cursor-pointer">
                  <span>📢 INFO & WELCOME</span>
                  <Plus className="w-3 h-3 hover:text-white" />
                </div>

                <div className="space-y-0.5 text-xs text-slate-400">
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-xs hover:bg-[#35373C]/50 hover:text-slate-200 cursor-pointer">
                    <FileText className="w-3.5 h-3.5" />
                    <span>rules</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-xs hover:bg-[#35373C]/50 hover:text-slate-200 cursor-pointer">
                    <FileText className="w-3.5 h-3.5" />
                    <span>about-pencily</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-xs hover:bg-[#35373C]/50 hover:text-slate-200 cursor-pointer">
                    <Megaphone className="w-3.5 h-3.5" />
                    <span>announcements</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-xs hover:bg-[#35373C]/50 hover:text-slate-200 cursor-pointer">
                    <QuestionIcon className="w-3.5 h-3.5" />
                    <span>self-introduction</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-xs hover:bg-[#35373C]/50 hover:text-slate-200 cursor-pointer">
                    <Hash className="w-3.5 h-3.5" />
                    <span>👥 get-roles</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-xs hover:bg-[#35373C]/50 hover:text-slate-200 cursor-pointer">
                    <Hash className="w-3.5 h-3.5" />
                    <span>💬 discord-announcements</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-xs hover:bg-[#35373C]/50 hover:text-slate-200 cursor-pointer">
                    <Newspaper className="w-3.5 h-3.5" />
                    <span>thời-báo-pencily</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-xs hover:bg-[#35373C]/50 hover:text-slate-200 cursor-pointer">
                    <Link2 className="w-3.5 h-3.5" />
                    <span>liên-kết</span>
                  </div>
                </div>
              </div>

              {/* Category: Pencily Directory */}
              <div className="px-2 pt-3 pb-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1 flex items-center justify-between cursor-pointer">
                  <span>📁 Pencily Directory</span>
                  <Plus className="w-3 h-3 hover:text-white" />
                </div>
                <div className="space-y-0.5 text-xs text-slate-400">
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-xs hover:bg-[#35373C]/50 hover:text-slate-200 cursor-pointer">
                    <Hash className="w-3.5 h-3.5" />
                    <span>everything-pencily</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-xs hover:bg-[#35373C]/50 hover:text-slate-200 cursor-pointer">
                    <Hash className="w-3.5 h-3.5" />
                    <span>admin-only</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom NEW UNREADS pill */}
            <div className="p-2 border-t border-[#111214]">
              <div className="w-full py-1 text-center bg-[#5865F2] hover:bg-[#4752C4] text-white font-black text-[10px] uppercase tracking-wider rounded-xs cursor-pointer shadow-xs transition">
                NEW UNREADS
              </div>
            </div>
          </div>

          {/* =========================================================================
              2. CENTER CHAT FEED (#313338)
              ========================================================================= */}
          <div className="md:col-span-8 lg:col-span-6 bg-[#313338] flex flex-col justify-between min-h-[580px]">
            {/* Channel Top Header Bar */}
            <div className="h-12 px-4 flex items-center justify-between border-b border-[#1F2023] bg-[#313338] text-white">
              <div className="flex items-center gap-2 min-w-0">
                <Hash className="w-5 h-5 text-slate-400 shrink-0" />
                <span className="font-bold text-sm text-white truncate">🎯 goi-y-lop-hoc</span>
                <span className="hidden sm:inline text-slate-500 font-light">|</span>
                <span className="hidden sm:inline text-xs text-slate-400 font-medium truncate">
                  phản-hồi-đề-xuất
                </span>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center gap-3 text-slate-300">
                <button
                  type="button"
                  title="Thông báo"
                  className="hover:text-white transition cursor-pointer"
                >
                  <Bell className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  title="Ghim tin nhắn"
                  className="hover:text-white transition cursor-pointer"
                >
                  <Pin className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  title="Danh sách thành viên"
                  onClick={() => setShowMemberList(!showMemberList)}
                  className={`hover:text-white transition cursor-pointer ${
                    showMemberList ? "text-white" : "text-slate-400"
                  }`}
                >
                  <Users className="w-4 h-4" />
                </button>

                {/* Search Bar */}
                <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-xs bg-[#1E1F22] text-xs text-slate-400 w-36">
                  <span className="text-[11px] truncate">Search The Pencily</span>
                  <Search className="w-3.5 h-3.5 ml-auto text-slate-400" />
                </div>
                <Inbox className="w-4 h-4 hidden sm:block hover:text-white cursor-pointer" />
                <HelpCircle className="w-4 h-4 hidden sm:block hover:text-white cursor-pointer" />
              </div>
            </div>

            {/* Chat Messages Stream */}
            <div
              ref={chatScrollRef}
              className="flex-1 p-4 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-200 [scrollbar-width:thin] [scrollbar-color:#1E1F22_transparent]"
            >
              {messages.map((msg) => (
                <div key={msg.id} className="group flex items-start gap-3 hover:bg-[#2E3035]/60 -mx-4 px-4 py-1 rounded-xs transition-colors">
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-800 shrink-0 relative mt-0.5 border border-white/10 shadow-xs">
                    <Image
                      src={msg.avatar}
                      alt={msg.sender}
                      fill
                      className="object-cover"
                      sizes="36px"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Reply thread indicator if applicable */}
                    {msg.replyTo && (
                      <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-1 opacity-80">
                        <CornerDownRight className="w-3 h-3 text-slate-500" />
                        <span className="italic">{msg.replyTo.text}</span>
                      </div>
                    )}

                    {/* Sender Header */}
                    <div className="flex items-baseline gap-2 mb-1">
                      <span
                        className="font-bold text-sm hover:underline cursor-pointer"
                        style={{ color: msg.senderColor || "#FFFFFF" }}
                      >
                        {msg.sender}
                      </span>

                      {msg.badge && (
                        <span className="px-1.5 py-0.2 rounded-xs bg-[#5865F2] text-white font-bold text-[9px] tracking-wider uppercase">
                          {msg.badge}
                        </span>
                      )}

                      <span className="text-[10px] text-slate-400 font-mono">
                        {msg.time}
                      </span>
                    </div>

                    {/* Content text */}
                    {msg.content && (
                      <p className="text-slate-200 leading-relaxed break-words font-normal select-text">
                        {msg.content}
                      </p>
                    )}

                    {/* Image Attachment (Photo) */}
                    {msg.image && (
                      <div className="mt-2 rounded-md overflow-hidden border border-[#2B2D31] max-w-[240px] shadow-sm relative">
                        <Image
                          src={msg.image}
                          alt="Attachment"
                          width={240}
                          height={340}
                          className="object-cover rounded-md"
                        />
                      </div>
                    )}

                    {/* Interactive Reactions */}
                    {msg.reactions && msg.reactions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {msg.reactions.map((r, rIdx) => (
                          <button
                            key={rIdx}
                            type="button"
                            onClick={() => toggleReaction(msg.id, rIdx)}
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-xs text-xs font-medium border transition cursor-pointer ${
                              r.reacted
                                ? "bg-[#5865F2]/20 border-[#5865F2] text-white"
                                : "bg-[#2B2D31] border-transparent text-slate-400 hover:border-slate-500"
                            }`}
                          >
                            <span>{r.emoji}</span>
                            {r.count > 0 && <span className="font-mono text-[11px]">{r.count}</span>}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Date divider matching screenshot */}
              <div className="relative flex items-center justify-center my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#3F4147]" />
                </div>
                <span className="relative px-3 bg-[#313338] text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  September 4, 2026
                </span>
              </div>
            </div>

            {/* Bottom Message Input Bar */}
            <div className="p-3 bg-[#313338] border-t border-[#2B2D31]/40">
              <form
                onSubmit={handleSendMessage}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-sm bg-[#383A40] text-slate-200 border border-transparent focus-within:border-slate-500"
              >
                <button
                  type="button"
                  className="w-6 h-6 rounded-full bg-[#4E5058] hover:bg-[#6D6F78] text-white flex items-center justify-center shrink-0 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Gửi tin nhắn tới #goi-y-lop-hoc..."
                  className="flex-1 bg-transparent text-xs sm:text-sm text-white focus:outline-none placeholder-slate-400"
                />

                <div className="flex items-center gap-2 text-slate-400 shrink-0">
                  <Gift className="w-4 h-4 hover:text-white cursor-pointer hidden sm:block" />
                  <span className="px-1 text-[10px] font-bold bg-[#4E5058] rounded-xs text-slate-300 hidden sm:inline">GIF</span>
                  <Smile className="w-4 h-4 hover:text-white cursor-pointer" />
                  <button
                    type="submit"
                    className="p-1 rounded-xs text-[#5865F2] hover:text-white transition cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Micro Bot Label below input bar */}
              <div className="flex items-center gap-1.5 mt-1.5 px-1 text-[10px] text-slate-400 font-mono">
                <span className="px-1 py-0.2 rounded-xs bg-[#5865F2] text-white text-[8px] font-bold uppercase">APP</span>
                <span>Double Counter</span>
              </div>
            </div>
          </div>

          {/* =========================================================================
              3. RIGHT SIDEBAR: MEMBER LIST & ACTIVITIES (#2B2D31)
              ========================================================================= */}
          {showMemberList && (
            <div className="hidden lg:block lg:col-span-3 bg-[#2B2D31] border-l border-[#1F2023] p-3 overflow-y-auto [scrollbar-width:thin] text-xs">
              {/* Activity Section Header */}
              <div className="mb-4">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Activity — 10</span>
                </div>

                {/* 3 Rich Activity Cards */}
                <div className="space-y-2">
                  {/* Activity 1: buitruonglinh */}
                  <div className="p-2 rounded-xs bg-[#1E1F22] border border-slate-700/50 flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xs bg-amber-500/20 border border-amber-500/40 shrink-0 overflow-hidden flex items-center justify-center font-bold text-amber-300">
                      🎵
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-white text-[11px] truncate">Mr.Kun</div>
                      <div className="text-[10px] text-slate-400 truncate">buitruonglinh</div>
                      <div className="text-[9px] text-amber-400/90 font-mono">13 tracks this week</div>
                    </div>
                  </div>

                  {/* Activity 2: RRQ congooni */}
                  <div className="p-2 rounded-xs bg-[#1E1F22] border border-slate-700/50 flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xs bg-purple-500/20 border border-purple-500/40 shrink-0 overflow-hidden flex items-center justify-center font-bold text-purple-300">
                      🎮
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-white text-[11px] truncate">RRQ congooni</div>
                      <div className="text-[10px] text-slate-400 truncate">Milthm</div>
                      <div className="text-[9px] text-purple-300/90 font-mono">3d ago • New Player</div>
                    </div>
                  </div>

                  {/* Activity 3: Cupid$No */}
                  <div className="p-2 rounded-xs bg-[#1E1F22] border border-slate-700/50 flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xs bg-pink-500/20 border border-pink-500/40 shrink-0 overflow-hidden flex items-center justify-center font-bold text-pink-300">
                      🎧
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-white text-[11px] truncate">Cupid$No</div>
                      <div className="text-[10px] text-slate-400 truncate">The Rare Occasions</div>
                      <div className="text-[9px] text-pink-300/90 font-mono">8 tracks this week</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category: Người không phải bàn — 1 */}
              <div className="mb-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1 mb-1">
                  Người không phải bàn — 1
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-xs hover:bg-[#35373C] cursor-pointer transition">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-800 shrink-0 relative border border-white/20">
                    <Image
                      src="/brand/elements/discord-avatar-thanh.png"
                      alt="Huỳnh Công Thành"
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-rose-400 text-xs truncate">
                      Huỳnh Công Thành 🗡️ TDS
                    </div>
                  </div>
                </div>
              </div>

              {/* Category: Core Team — 1 */}
              <div className="mb-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1 mb-1">
                  Core Team — 1
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-xs hover:bg-[#35373C] cursor-pointer transition">
                  <div className="w-8 h-8 rounded-full bg-blue-600/30 text-blue-400 border border-blue-500/40 flex items-center justify-center font-bold text-xs shrink-0">
                    🛡️
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-blue-400 text-xs flex items-center gap-1">
                      <span>Security</span>
                      <span className="px-1 py-0.2 rounded-xs bg-[#5865F2] text-white text-[8px] font-bold">✓ APP</span>
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">/help | securitybot.xyz</div>
                  </div>
                </div>
              </div>

              {/* Category: Clanker — 7 (Bots) */}
              <div className="mb-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1 mb-1">
                  Clanker — 7
                </div>
                <div className="space-y-0.5">
                  {[
                    { name: "Carl-bot", sub: "/help | carl.gg", icon: "🐢" },
                    { name: "DISBOARD", sub: "/help | 1,677,796 servers", icon: "🌐" },
                    { name: "Dyno", sub: "Dungeon crawling | Use /raid", icon: "🐾" },
                    { name: "Jockie Music", sub: "m!help", icon: "🎶" },
                    { name: "Sapphire", sub: "sapph.xyz", icon: "💎" },
                    { name: "ServerStats", sub: "counters | /help", icon: "📊" },
                    { name: "Top.gg", sub: "Voting bot", icon: "🚀" },
                  ].map((bot, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2 px-2 py-1 rounded-xs hover:bg-[#35373C] cursor-pointer transition">
                      <div className="w-6 h-6 rounded-xs bg-[#1E1F22] border border-slate-700 flex items-center justify-center text-xs shrink-0">
                        {bot.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-slate-300 text-xs flex items-center gap-1">
                          <span className="truncate">{bot.name}</span>
                          <span className="px-1 py-0.2 rounded-xs bg-[#5865F2] text-white text-[7px] font-bold">✓ APP</span>
                        </div>
                        <div className="text-[9px] text-slate-500 truncate">{bot.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category: Tutor - Lý/Hóa/Sinh — 1 */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1 mb-1">
                  Tutor - Lý/Hóa/Sinh — 1
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-xs hover:bg-[#35373C] cursor-pointer transition">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold text-xs shrink-0">
                    👑
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-amber-300 text-xs truncate">Sun 👑 KING</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
