"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Send, X } from "lucide-react";
import { usePencily } from "@/context/PencilyContext";
import {
  PencilyProfileIcon,
  PencilyPortfolioIcon,
  PencilyClassroomsIcon,
  PencilySettingsIcon,
  PencilyReferFriendIcon,
  PencilyBugReportIcon,
  PencilyHelpDeskIcon,
  PencilySupportChatIcon,
  PencilySafetyFlagIcon,
  PencilyLogOutIcon,
  PencilyChatBubbleIcon,
  PencilyBellIcon,
  PencilyCalendarIcon,
  PencilyShieldIcon,
  PencilyStoreIcon,
} from "./icons/PencilyIcons";

interface SchoolhouseHeaderMenuProps {
  onOpenSafetyModal?: () => void;
  onOpenBugModal?: () => void;
  onOpenTutorModal?: () => void;
  onOpenReferModal?: () => void;
  onOpenHelpModal?: () => void;
  onOpenSupportModal?: () => void;
  onOpenSettingsTab?: () => void;
}

export function SchoolhouseHeaderMenu({
  onOpenSafetyModal,
  onOpenBugModal,
  onOpenTutorModal,
  onOpenReferModal,
  onOpenHelpModal,
  onOpenSupportModal,
  onOpenSettingsTab,
}: SchoolhouseHeaderMenuProps) {
  const { user, isLoggedIn, logout, language, setUnreadNotifCount } = usePencily();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Notification items & unread state management
  const standardNotifications = [
    {
      id: "notif-tutor",
      title: language === "vi" ? "Mở Đăng Ký Peer Tutor" : "Peer Tutor Applications Open",
      desc:
        language === "vi"
          ? "Cơ hội rèn luyện giảng dạy và nhận chứng nhận ngoại khóa verified."
          : "Opportunity to sharpen teaching skills and receive verified credentials.",
      href: "/dashboard?tab=tutor",
    },
    {
      id: "notif-discord",
      title: language === "vi" ? "Phòng Discord Voice 24/7 Đã Sẵn Sàng" : "24/7 Discord Voice Pods Active",
      desc:
        language === "vi"
          ? "Học nhóm yên lặng và thảo luận giải đề cùng đồng trang lứa."
          : "Silent study pods and live peer problem-solving are online.",
      href: "/dashboard?tab=discord",
    },
    {
      id: "notif-materials",
      title: language === "vi" ? "Thư viện bài tập Cornell mới" : "New Cornell Study Notes",
      desc:
        language === "vi"
          ? "Đã cập nhật bộ tóm tắt trọng tâm môn Toán & ĐGNL tuần này."
          : "Newly updated math and exam preparation summary sheets.",
      href: "/dashboard?tab=library",
    },
  ];

  const [readNotifIds, setReadNotifIds] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("pencily_read_notifs");
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const markNotifAsRead = (id: string) => {
    setReadNotifIds((prev) => {
      if (prev.includes(id)) return prev;
      const updated = [...prev, id];
      try {
        localStorage.setItem("pencily_read_notifs", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const markAllNotifsAsRead = () => {
    const allIds = standardNotifications.map((n) => n.id);
    setReadNotifIds(allIds);
    try {
      localStorage.setItem("pencily_read_notifs", JSON.stringify(allIds));
    } catch {}
  };

  const unreadStandardCount = standardNotifications.filter((n) => !readNotifIds.includes(n.id)).length;
  const importantIncompleteCount = !user.hasCompletedProfile ? 1 : 0;
  const totalNotifCount = importantIncompleteCount + unreadStandardCount;

  useEffect(() => {
    setUnreadNotifCount(totalNotifCount);
  }, [totalNotifCount, setUnreadNotifCount]);

  // Direct Messages & Interactive Conversations
  interface DmMessage {
    id: string;
    sender: "me" | "them";
    text: string;
    time: string;
  }

  const defaultDirectMessages = [
    {
      id: "dm-1",
      name: "Minh Anh",
      school: "THPT Chuyên Hà Nội - Amsterdam",
      lastMessage: "Đề cương buổi luyện giải SAT Math tối mai mình đã cập nhật nhé!",
      time: "10p trước",
      unread: true,
      avatar: "MA",
    },
    {
      id: "dm-2",
      name: "Bảo Trâm",
      school: "THPT Lê Hồng Phong",
      lastMessage: "File bài mẫu speaking part 2 bạn xem qua trước khi vào phòng Meet nha.",
      time: "1h trước",
      unread: false,
      avatar: "BT",
    },
    {
      id: "dm-3",
      name: "Hoàng Long",
      school: "THPT Chuyên Khoa Học Tự Nhiên",
      lastMessage: "Tối nay 8h vào phòng voice học chung không bạn ơi?",
      time: "Hôm qua",
      unread: false,
      avatar: "HL",
    },
  ];

  const defaultConversationHistory: Record<string, DmMessage[]> = {
    "dm-1": [
      { id: "m-1", sender: "them", text: "Chào bạn! Mình là Minh Anh, Peer Tutor SAT Math.", time: "14:10" },
      { id: "m-2", sender: "them", text: "Đề cương buổi luyện giải SAT Math tối mai mình đã cập nhật nhé!", time: "14:15" },
    ],
    "dm-2": [
      { id: "m-3", sender: "them", text: "File bài mẫu speaking part 2 bạn xem qua trước khi vào phòng Meet nha.", time: "13:00" },
    ],
    "dm-3": [
      { id: "m-4", sender: "them", text: "Tối nay 8h vào phòng voice học chung không bạn ơi?", time: "Hôm qua" },
    ],
  };

  const [activeDmId, setActiveDmId] = useState<string | null>(null);
  const [typedDmText, setTypedDmText] = useState("");
  const [conversations, setConversations] = useState<Record<string, DmMessage[]>>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("pencily_dm_conversations");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return defaultConversationHistory;
  });
  const dmScrollRef = useRef<HTMLDivElement>(null);

  const activePeer = defaultDirectMessages.find((d) => d.id === activeDmId);
  const currentDmMessages = activeDmId ? (conversations[activeDmId] || []) : [];

  const handleSendDm = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!typedDmText.trim() || !activeDmId) return;

    const newMsg: DmMessage = {
      id: `m-${Date.now()}`,
      sender: "me",
      text: typedDmText.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const targetId = activeDmId;
    setConversations((prev) => {
      const updated = {
        ...prev,
        [targetId]: [...(prev[targetId] || []), newMsg],
      };
      try {
        localStorage.setItem("pencily_dm_conversations", JSON.stringify(updated));
      } catch {}
      return updated;
    });

    setTypedDmText("");

    // Friendly auto-reply simulation from peer tutor after 1.5s
    setTimeout(() => {
      const replies = [
        "Mình nhận được tin nhắn của bạn rồi nhé! Hẹn gặp bạn ở buổi học tới nha.",
        "Cảm ơn bạn! Nếu có câu hỏi nào về bài tập cứ nhắn mình giải đáp thêm nhé.",
        "Tuyệt vời! Bạn có thể vào phòng học chung để cùng luyện đề bất cứ lúc nào.",
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      const botReply: DmMessage = {
        id: `m-reply-${Date.now()}`,
        sender: "them",
        text: randomReply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setConversations((prev) => {
        const updated = {
          ...prev,
          [targetId]: [...(prev[targetId] || []), botReply],
        };
        try {
          localStorage.setItem("pencily_dm_conversations", JSON.stringify(updated));
        } catch {}
        return updated;
      });
    }, 1500);
  };

  useEffect(() => {
    if (activeDmId && dmScrollRef.current) {
      dmScrollRef.current.scrollTop = dmScrollRef.current.scrollHeight;
    }
  }, [conversations, activeDmId]);

  const unreadChatCount = defaultDirectMessages.filter((m) => m.unread && !conversations[m.id]?.some((msg) => msg.sender === "me")).length;

  // Close menus on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
        setBellOpen(false);
        setCalendarOpen(false);
        setChatOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Initials for avatar button
  const nameParts = (user.name || "Student").trim().split(" ");
  const initials =
    nameParts.length >= 2
      ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
      : (user.name || "P").substring(0, 2).toUpperCase();

  return (
    <div className="flex items-center gap-2 sm:gap-2.5" ref={containerRef}>
      {/* 1. DIRECT MESSAGE / MESSENGER STYLE POPOVER */}
      <div className="relative shrink-0">
        <button
          type="button"
          onClick={() => {
            setChatOpen(!chatOpen);
            setBellOpen(false);
            setDropdownOpen(false);
            setCalendarOpen(false);
          }}
          className={`relative h-9 w-9 flex items-center justify-center rounded-md transition-all border-2 cursor-pointer shadow-2xs ${
            chatOpen
              ? "bg-[#0F2747] text-white border-[#0F2747] shadow-xs"
              : "bg-white hover:bg-slate-50 text-[#0F2747] border-slate-300 hover:border-[#0F2747]"
          }`}
          title={language === "vi" ? "Tin nhắn trực tiếp" : "Direct Messages"}
          aria-expanded={chatOpen}
        >
          <PencilyChatBubbleIcon size={19} strokeWidth={2} />
          {unreadChatCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-[#EF4444] text-white font-mono text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-xs pointer-events-none">
              {unreadChatCount}
            </span>
          )}
        </button>

        {chatOpen && (
          <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-md border-2 border-[#0F2747] shadow-xl z-50 py-3 px-3 animate-fadeIn text-[#0F2747]">
            {activePeer ? (
              /* ACTIVE CONVERSATION VIEW */
              <div className="flex flex-col h-[380px]">
                {/* Conversation Header */}
                <div className="flex items-center justify-between pb-2.5 border-b-2 border-slate-100 mb-2 px-1 shrink-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <button
                      type="button"
                      onClick={() => setActiveDmId(null)}
                      className="p-1 rounded-sm hover:bg-slate-100 text-slate-700 transition cursor-pointer"
                      title={language === "vi" ? "Quay lại" : "Back"}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <div className="w-7 h-7 rounded-sm bg-[#0F2747] text-[#FFC83D] font-extrabold text-xs flex items-center justify-center shrink-0 border border-slate-300">
                      {activePeer.avatar}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-xs text-[#0F2747] truncate leading-tight">
                        {activePeer.name}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate font-medium">
                        {activePeer.school}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setChatOpen(false)}
                    className="p-1 rounded-sm text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Messages Feed */}
                <div ref={dmScrollRef} className="flex-1 overflow-y-auto space-y-2 p-1 pr-1.5 text-xs">
                  {currentDmMessages.map((msg) => {
                    const isMe = msg.sender === "me";
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-md px-3 py-2 text-xs leading-relaxed ${
                            isMe
                              ? "bg-[#0F2747] text-white rounded-br-xs shadow-2xs font-medium"
                              : "bg-[#FFF9EF] text-[#0F2747] border border-slate-300 rounded-bl-xs"
                          }`}
                        >
                          {msg.text}
                        </div>
                        <span className="text-[9px] text-slate-400 mt-0.5 px-1 font-mono">
                          {msg.time}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Message Input Dock */}
                <form onSubmit={handleSendDm} className="pt-2 border-t border-slate-100 flex items-center gap-1.5 shrink-0">
                  <input
                    type="text"
                    value={typedDmText}
                    onChange={(e) => setTypedDmText(e.target.value)}
                    placeholder={language === "vi" ? `Nhắn tin cho ${activePeer.name}...` : `Message ${activePeer.name}...`}
                    className="flex-1 px-3 py-2 bg-slate-50 border-2 border-slate-200 focus:border-[#0F2747] rounded-sm text-xs outline-none"
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={!typedDmText.trim()}
                    className="h-8 w-8 flex items-center justify-center rounded-sm bg-[#0F2747] hover:bg-[#1A3E6D] text-[#FFC83D] transition disabled:opacity-40 cursor-pointer shrink-0"
                    title={language === "vi" ? "Gửi tin nhắn" : "Send message"}
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            ) : (
              /* CONVERSATION LIST VIEW */
              <>
                <div className="flex items-center justify-between pb-2 border-b-2 border-slate-100 mb-2 px-1">
                  <span className="font-poppins font-black text-sm text-[#0F2747]">
                    {language === "vi" ? "Tin nhắn trực tiếp" : "Direct Messages"}
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    {defaultDirectMessages.length} {language === "vi" ? "hội thoại" : "chats"}
                  </span>
                </div>

                {/* List of Direct Messages */}
                <div className="space-y-1.5 max-h-[320px] overflow-y-auto">
                  {defaultDirectMessages.map((msg) => {
                    const thread = conversations[msg.id] || [];
                    const lastMsg = thread.length > 0 ? thread[thread.length - 1] : null;
                    const previewText = lastMsg ? (lastMsg.sender === "me" ? `Bạn: ${lastMsg.text}` : lastMsg.text) : msg.lastMessage;
                    const previewTime = lastMsg ? lastMsg.time : msg.time;

                    return (
                      <div
                        key={msg.id}
                        onClick={() => setActiveDmId(msg.id)}
                        className="p-2.5 rounded-sm flex items-start gap-3 transition cursor-pointer border bg-[#FFFDF9] border-slate-200 hover:border-[#0F2747] hover:bg-[#FFF9EF]"
                      >
                        {/* Avatar */}
                        <div className="w-9 h-9 rounded-sm bg-[#0F2747] text-[#FFC83D] font-extrabold text-xs flex items-center justify-center shrink-0 border border-slate-300">
                          {msg.avatar}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs truncate font-bold text-slate-800">
                              {msg.name}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono shrink-0">
                              {previewTime}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-600 truncate mt-0.5 font-normal">
                            {previewText}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom: Contact Discord */}
                <div className="pt-2.5 mt-2 border-t border-slate-100 text-center flex items-center justify-between px-1 text-xs">
                  <a
                    href="https://discord.gg/6hpEf4wC4z"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-bold text-[#4F7ECB] hover:underline"
                  >
                    {language === "vi" ? "Mở phòng chat Discord →" : "Open Discord DMs →"}
                  </a>
                  <span className="text-[10px] text-slate-500">P2P Encrypted</span>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* 2. NOTIFICATIONS BELL WITH INTERACTIVE POPOVER */}
      <div className="relative shrink-0">
        <button
          type="button"
          onClick={() => {
            setBellOpen(!bellOpen);
            setChatOpen(false);
            setDropdownOpen(false);
            setCalendarOpen(false);
          }}
          className={`relative h-9 w-9 flex items-center justify-center rounded-md transition-all border-2 cursor-pointer shadow-2xs ${
            bellOpen
              ? "bg-[#0F2747] text-white border-[#0F2747] shadow-xs"
              : "bg-white hover:bg-slate-50 text-[#0F2747] border-slate-300 hover:border-[#0F2747]"
          }`}
          title={language === "vi" ? "Thông báo hệ thống" : "Notifications"}
          aria-expanded={bellOpen}
        >
          <PencilyBellIcon size={19} strokeWidth={2} />
          {totalNotifCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-[#FFC83D] text-[#0F2747] font-mono text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-xs pointer-events-none">
              {totalNotifCount}
            </span>
          )}
        </button>

        {bellOpen && (
          <div className="absolute right-0 mt-2 w-72 sm:w-84 bg-white rounded-md border-2 border-[#0F2747] shadow-xl z-50 py-3 px-4 animate-fadeIn text-[#0F2747]">
            {/* Popover Header */}
            <div className="flex items-center justify-between pb-2 border-b-2 border-slate-100 mb-2.5">
              <div className="flex items-center gap-1.5">
                <span className="font-poppins font-black text-xs uppercase tracking-wider text-[#0F2747]">
                  {language === "vi" ? "Thông Báo" : "Notifications"}
                </span>
                {totalNotifCount > 0 && (
                  <span className="text-[10px] font-mono font-bold bg-[#0F2747] text-white px-1.5 py-0.2 rounded-xs">
                    {totalNotifCount}
                  </span>
                )}
              </div>
              {unreadStandardCount > 0 && (
                <button
                  type="button"
                  onClick={markAllNotifsAsRead}
                  className="text-[11px] font-bold text-[#4F7ECB] hover:underline cursor-pointer"
                >
                  {language === "vi" ? "Đọc tất cả" : "Mark all read"}
                </button>
              )}
            </div>

            {/* Notification Items List */}
            <div className="space-y-2 text-xs max-h-[65vh] overflow-y-auto pr-0.5">
              {/* 1. IMPORTANT NOTIFICATION: Hoàn thiện hồ sơ học sinh (chỉ ngưng có màu khi đã hoàn thành) */}
              {!user.hasCompletedProfile ? (
                <Link
                  href="/onboarding"
                  onClick={() => setBellOpen(false)}
                  className="block p-2.5 rounded-sm bg-amber-50/90 border-2 border-amber-400 hover:bg-amber-100/90 transition cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-black text-xs text-[#0F2747]">
                      {language === "vi" ? "Hoàn thiện hồ sơ học sinh" : "Complete Student Profile"}
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-wider text-amber-900 bg-amber-200 px-1.5 py-0.5 rounded-xs border border-amber-300 shrink-0">
                      {language === "vi" ? "QUAN TRỌNG" : "IMPORTANT"}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-700 mt-1 leading-relaxed">
                    {language === "vi"
                      ? "Cập nhật trường học, khối lớp và môn quan tâm để tối ưu trải nghiệm học."
                      : "Update your school, grade, and focus subjects to personalize your learning."}
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-[10px] font-semibold text-amber-900 pt-1 border-t border-amber-200/60">
                    <span>{language === "vi" ? "Cần hoàn thành mới hết màu" : "Must complete to clear alert"}</span>
                    <span className="underline">{language === "vi" ? "Hoàn tất ngay →" : "Complete now →"}</span>
                  </div>
                </Link>
              ) : (
                <div className="p-2.5 rounded-sm bg-slate-50 border border-slate-200 text-slate-500">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-semibold text-xs text-slate-700">
                      {language === "vi" ? "Hồ sơ học sinh" : "Student Profile"}
                    </span>
                    <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded-xs border border-emerald-200 shrink-0">
                      {language === "vi" ? "ĐÃ HOÀN THÀNH" : "COMPLETED"}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {language === "vi"
                      ? "Hồ sơ cá nhân và khối lớp học của bạn đã được lưu đầy đủ."
                      : "Your student profile and grade info are fully set up."}
                  </div>
                </div>
              )}

              {/* 2. UNREAD / STANDARD NOTIFICATIONS (bấm vô xem là hết trạng thái chưa đọc) */}
              {standardNotifications.map((notif) => {
                const isUnread = !readNotifIds.includes(notif.id);
                return (
                  <Link
                    key={notif.id}
                    href={notif.href}
                    onClick={() => {
                      if (isUnread) markNotifAsRead(notif.id);
                      setBellOpen(false);
                    }}
                    className={`block p-2.5 rounded-sm transition cursor-pointer border ${
                      isUnread
                        ? "bg-sky-50/80 border-2 border-sky-300 hover:bg-sky-100/80"
                        : "bg-white border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className={`text-xs ${
                          isUnread ? "font-black text-[#0F2747]" : "font-semibold text-slate-700"
                        }`}
                      >
                        {notif.title}
                      </span>
                      {isUnread && (
                        <span className="text-[9px] font-bold uppercase tracking-wider text-sky-800 bg-sky-200/90 px-1.5 py-0.5 rounded-xs border border-sky-300 shrink-0">
                          {language === "vi" ? "CHƯA ĐỌC" : "UNREAD"}
                        </span>
                      )}
                    </div>
                    <div className={`text-[11px] mt-0.5 ${isUnread ? "text-slate-700" : "text-slate-500"}`}>
                      {notif.desc}
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Popover Footer */}
            <div className="pt-2 mt-2 border-t border-slate-100 text-center">
              <Link
                href="/dashboard?tab=classes"
                onClick={() => setBellOpen(false)}
                className="text-[11px] font-bold text-[#4F7ECB] hover:underline"
              >
                {language === "vi" ? "Xem tất cả thông báo lớp học →" : "View all class updates →"}
              </Link>
            </div>
          </div>
        )}
      </div>

        {/* Calendar is directly accessible from sidebar Lớp của tôi */}

      {/* 4. SCHOOLHOUSE AVATAR / ACCOUNT HUB TRIGGER */}
      <div className="relative shrink-0">
        <button
          type="button"
          onClick={() => {
            setDropdownOpen(!dropdownOpen);
            setBellOpen(false);
            setCalendarOpen(false);
          }}
          className={`h-9 flex items-center gap-2 pl-1.5 pr-2.5 rounded-md border-2 transition-all cursor-pointer shadow-2xs ${
            dropdownOpen
              ? "bg-[#0F2747] text-white border-[#0F2747]"
              : "bg-white hover:bg-slate-50 text-[#0F2747] border-slate-300 hover:border-[#0F2747]"
          }`}
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
        >
          {/* Avatar chip */}
          <div
            className={`w-7 h-7 rounded-sm flex items-center justify-center font-black text-xs shrink-0 border ${
              isLoggedIn
                ? dropdownOpen
                  ? "bg-[#FFC83D] text-[#0F2747] border-amber-300"
                  : "bg-emerald-700 text-white border-emerald-800"
                : "bg-slate-800 text-white border-slate-900"
            }`}
          >
            {isLoggedIn ? (
              user.avatar?.startsWith("http") ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-xs" />
              ) : (
                initials
              )
            ) : (
              "P"
            )}
          </div>

          <span className="hidden sm:inline text-xs font-bold truncate max-w-[90px]">
            {isLoggedIn ? user.name : language === "vi" ? "Tài khoản" : "Account"}
          </span>

          {/* Micro chevron */}
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* 5. DROPDOWN MENU (WORKS FOR BOTH GUEST & LOGGED-IN USERS) */}
        {dropdownOpen && (
          <div
            className="absolute right-0 mt-2 w-64 sm:w-72 bg-white rounded-md border-2 border-[#0F2747] shadow-xl z-50 py-1.5 animate-fadeIn text-[#0F2747]"
            role="menu"
          >
            {isLoggedIn ? (
              /* LOGGED-IN USER VIEW */
              <>
                {/* User Glance Info */}
                <div className="px-4 py-2.5 border-b-2 border-slate-100 bg-[#FFFDF9]">
                  <div className="font-poppins font-black text-xs sm:text-sm text-[#0F2747] truncate">
                    {user.name || "Học sinh Pencily"}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-0.5">
                    <span>{user.school || "The Pencily Academy"}</span>
                    <span className="font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded-xs border border-amber-200">
                      {user.points} PP
                    </span>
                  </div>
                </div>

                {/* TIER 1: ACADEMIC & CLASSROOM NAVIGATION */}
                <div className="py-1 border-b-2 border-slate-100">
                  <Link
                    href="/dashboard?tab=profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-xs font-semibold hover:bg-slate-100 transition"
                    role="menuitem"
                  >
                    <PencilyProfileIcon size={16} strokeWidth={2.2} className="text-slate-600" />
                    <span>{language === "vi" ? "Hồ Sơ Của Tôi" : "My Profile"}</span>
                  </Link>

                  <Link
                    href="/dashboard?tab=profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-xs font-semibold hover:bg-slate-100 transition"
                    role="menuitem"
                  >
                    <PencilyPortfolioIcon size={16} strokeWidth={2.2} className="text-slate-600" />
                    <span>{language === "vi" ? "Hồ Sơ Năng Lực" : "My Portfolio"}</span>
                  </Link>

                  <Link
                    href="/dashboard?tab=classes"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-xs font-semibold hover:bg-slate-100 transition"
                    role="menuitem"
                  >
                    <PencilyClassroomsIcon size={16} strokeWidth={2.2} className="text-slate-600" />
                    <span>{language === "vi" ? "Phòng Học Của Tôi" : "My Classrooms"}</span>
                  </Link>

                  {onOpenSettingsTab ? (
                    <button
                      type="button"
                      onClick={() => {
                        setDropdownOpen(false);
                        onOpenSettingsTab();
                      }}
                      className="w-full text-left flex items-center gap-3 px-4 py-2 text-xs font-semibold hover:bg-slate-100 transition cursor-pointer"
                      role="menuitem"
                    >
                      <PencilySettingsIcon size={16} strokeWidth={2.2} className="text-slate-600" />
                      <span>{language === "vi" ? "Cài Đặt" : "Settings"}</span>
                    </button>
                  ) : (
                    <Link
                      href="/dashboard?tab=settings"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-xs font-semibold hover:bg-slate-100 transition"
                      role="menuitem"
                    >
                      <PencilySettingsIcon size={16} strokeWidth={2.2} className="text-slate-600" />
                      <span>{language === "vi" ? "Cài Đặt" : "Settings"}</span>
                    </Link>
                  )}
                </div>

                {/* TIER 2: COMMUNITY & SUPPORT */}
                <div className="py-1 border-b-2 border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setDropdownOpen(false);
                      if (onOpenReferModal) {
                        onOpenReferModal();
                      } else if (typeof navigator !== "undefined" && navigator.clipboard) {
                        navigator.clipboard.writeText(window.location.origin);
                        alert(language === "vi" ? "Đã sao chép link The Pencily để gửi bạn bè!" : "Copied invite link!");
                      }
                    }}
                    className="w-full text-left flex items-center gap-3 px-4 py-2 text-xs font-semibold hover:bg-slate-100 transition cursor-pointer"
                    role="menuitem"
                  >
                    <PencilyReferFriendIcon size={16} strokeWidth={2.2} className="text-slate-600" />
                    <span>{language === "vi" ? "Mời Bạn Học Cùng" : "Refer a Friend"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDropdownOpen(false);
                      if (onOpenBugModal) {
                        onOpenBugModal();
                      } else {
                        window.open("https://discord.gg/6hpEf4wC4z", "_blank");
                      }
                    }}
                    className="w-full text-left flex items-center gap-3 px-4 py-2 text-xs font-semibold hover:bg-slate-100 transition cursor-pointer"
                    role="menuitem"
                  >
                    <PencilyBugReportIcon size={16} strokeWidth={2.2} className="text-slate-600" />
                    <span>{language === "vi" ? "Báo Cáo Lỗi" : "Report a Bug"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDropdownOpen(false);
                      if (onOpenHelpModal) {
                        onOpenHelpModal();
                      } else {
                        router.push("/#how-it-works");
                      }
                    }}
                    className="w-full text-left flex items-center gap-3 px-4 py-2 text-xs font-semibold hover:bg-slate-100 transition cursor-pointer"
                    role="menuitem"
                  >
                    <PencilyHelpDeskIcon size={16} strokeWidth={2.2} className="text-slate-600" />
                    <span>{language === "vi" ? "Trung Tâm Trợ Giúp" : "Help Desk"}</span>
                  </button>

                  <a
                    href="https://discord.gg/6hpEf4wC4z"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-xs font-semibold hover:bg-slate-100 transition"
                    role="menuitem"
                  >
                    <PencilySupportChatIcon size={16} strokeWidth={2.2} className="text-slate-600" />
                    <span>{language === "vi" ? "Trò Chuyện Hỗ Trợ" : "Chat with Support"}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setDropdownOpen(false);
                      if (onOpenSafetyModal) {
                        onOpenSafetyModal();
                      } else {
                        alert(
                          language === "vi"
                            ? "The Pencily tuân thủ quy chuẩn an toàn và bình đẳng. Để báo cáo vi phạm, vui lòng gửi ticket trên kênh Discord hoặc liên hệ ban học vụ."
                            : "The Pencily enforces a strict safety honor code. Please report violations via Discord tickets."
                        );
                      }
                    }}
                    className="w-full text-left flex items-center gap-3 px-4 py-2 text-xs font-semibold hover:bg-slate-100 transition cursor-pointer"
                    role="menuitem"
                  >
                    <PencilySafetyFlagIcon size={16} strokeWidth={2.2} className="text-slate-600" />
                    <span>{language === "vi" ? "Báo Cáo An Toàn" : "Share Safety Concern"}</span>
                  </button>
                </div>

                {/* TIER 3: LOGOUT */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setDropdownOpen(false);
                      logout();
                    }}
                    className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 transition cursor-pointer"
                    role="menuitem"
                  >
                    <PencilyLogOutIcon size={16} strokeWidth={2.2} className="text-red-600" />
                    <span>{language === "vi" ? "Đăng Xuất" : "Log Out"}</span>
                  </button>
                </div>
              </>
            ) : (
              /* GUEST USER VIEW (Rich Quick Hub) */
              <>
                <div className="px-4 py-3 border-b-2 border-slate-100 bg-[#FFFDF9]">
                  <div className="font-poppins font-black text-xs sm:text-sm text-[#0F2747]">
                    {language === "vi" ? "Chào Bạn Đến Với The Pencily" : "Welcome to The Pencily"}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    {language === "vi"
                      ? "Nền tảng học nhóm đồng hành peer-to-peer 100% phi lợi nhuận."
                      : "100% non-profit peer-to-peer collaborative learning platform."}
                  </p>
                  <div className="mt-2.5 flex flex-col gap-1.5">
                    <Link
                      href="/signin?mode=signin"
                      onClick={() => setDropdownOpen(false)}
                      className="w-full text-center px-3 py-1.5 rounded-sm bg-[#0F2747] hover:bg-[#1E3A8A] text-white text-xs font-bold transition shadow-xs cursor-pointer"
                    >
                      {language === "vi" ? "Đăng Nhập Ngay" : "Sign In Now"}
                    </Link>
                    <Link
                      href="/signin?mode=register"
                      onClick={() => setDropdownOpen(false)}
                      className="w-full text-center px-3 py-1.5 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] border-2 border-slate-300 hover:border-[#0F2747] text-xs font-bold transition cursor-pointer"
                    >
                      {language === "vi" ? "Tạo Tài Khoản Học Sinh" : "Create Student Account"}
                    </Link>
                  </div>
                </div>

                {/* Quick Shortcuts */}
                <div className="py-1 border-b-2 border-slate-100">
                  <Link
                    href="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-xs font-semibold hover:bg-slate-100 transition"
                  >
                    <PencilyClassroomsIcon size={16} strokeWidth={2.2} className="text-slate-600" />
                    <span>{language === "vi" ? "Trải Nghiệm Dashboard" : "Explore Dashboard"}</span>
                  </Link>

                  <Link
                    href="/dashboard?tab=shop"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-xs font-semibold hover:bg-slate-100 transition"
                  >
                    <PencilyStoreIcon size={16} strokeWidth={2.2} className="text-slate-600" />
                    <span>{language === "vi" ? "Cửa Hàng Pencily Points (PP)" : "Pencily Points Shop"}</span>
                  </Link>

                  <a
                    href="https://discord.gg/6hpEf4wC4z"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-xs font-semibold hover:bg-slate-100 transition"
                  >
                    <PencilySupportChatIcon size={16} strokeWidth={2.2} className="text-slate-600" />
                    <span>{language === "vi" ? "Tham Gia Máy Chủ Discord" : "Join Discord Server"}</span>
                  </a>
                </div>

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setDropdownOpen(false);
                      alert(
                        language === "vi"
                          ? "The Pencily hoạt động 100% phi lợi nhuận với sứ mệnh bình đẳng hóa cơ hội tiếp cận giáo dục chất lượng cho mọi học sinh."
                          : "The Pencily is 100% non-profit, dedicated to democratizing equal education access for every student."
                      );
                    }}
                    className="w-full text-left flex items-center gap-3 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                  >
                    <PencilyShieldIcon size={16} strokeWidth={2.2} className="text-slate-500" />
                    <span>{language === "vi" ? "Cam Kết Phi Lợi Nhuận" : "Non-Profit Pledge"}</span>
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
