"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Send,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { DiscordLogo } from "./BrandIcons";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
  links?: Array<{ text: string; url: string; external?: boolean }>;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome-1",
    sender: "bot",
    text: "Chào bạn! Mình là Cú Pencily 🦉 – trợ lý học tập The Pencily. Bạn cần hỗ trợ về phòng học, cách tích lũy & đổi điểm PP, hay liên hệ trực tiếp ban điều phối?",
    time: "Vừa xong",
    links: [
      { text: "Cửa hàng đổi quà PP", url: "/dashboard?tab=classes" },
      { text: "Kênh hỗ trợ Discord", url: "https://discord.gg/6hpEf4wC4z", external: true },
    ],
  },
];

const QUICK_PROMPTS = [
  { label: "🎁 Đổi quà & dùng PP?", key: "pp" },
  { label: "🎓 Cách vào phòng học?", key: "class" },
  { label: "👨‍🏫 Đăng ký làm Tutor?", key: "tutor" },
  { label: "💬 Liên hệ hỗ trợ Discord?", key: "discord" },
];

export function PencilyMascotCompanion() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new message arrives or drawer opens
  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendQuestion = (questionText: string, promptKey?: string) => {
    if (!questionText.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: questionText,
      time: "Vừa xong",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = "";
      let links: Array<{ text: string; url: string; external?: boolean }> | undefined;

      const lower = questionText.toLowerCase();

      if (promptKey === "pp" || lower.includes("pp") || lower.includes("điểm") || lower.includes("quà") || lower.includes("đổi")) {
        botResponse = "Pencily Points (PP) được tích lũy khi bạn tham gia lớp học (+10 PP), đăng thảo luận (+5 PP) hoặc điểm danh bài học (+5 PP). Bạn có thể bấm vào huy hiệu PP ở góc phải trên Dashboard để mở Cửa Hàng Đổi Quà (Exchange Shop) nhận Mindmap 12 môn, kho đề chuyên hoặc vé kèm 1-1!";
        links = [{ text: "Mở Dashboard kiểm tra PP", url: "/dashboard" }];
      } else if (promptKey === "class" || lower.includes("phòng") || lower.includes("lớp") || lower.includes("học")) {
        botResponse = "Các phòng học trực tuyến mở tự do tại tab 'Tìm lớp học'. Khi lớp bắt đầu, bạn bấm 'Vào phòng học' để tham gia qua Web Room trực tiếp hoặc phòng Voice trên máy chủ Discord The Pencily hoàn toàn miễn phí!";
        links = [{ text: "Khám phá phòng học", url: "/dashboard?tab=classes" }];
      } else if (promptKey === "tutor" || lower.includes("tutor") || lower.includes("gia sư") || lower.includes("dạy")) {
        botResponse = "The Pencily luôn chào đón các bạn học sinh giỏi, đam mê chia sẻ trở thành Peer Tutor! Bạn vào tab 'Trở thành Peer Tutor' trong Dashboard để hoàn thiện 3 bước xác thực và nhận Portfolio chứng nhận cống hiến.";
        links = [{ text: "Đăng ký làm Peer Tutor", url: "/dashboard?tab=become-tutor" }];
      } else if (promptKey === "discord" || lower.includes("discord") || lower.includes("liên hệ") || lower.includes("admin") || lower.includes("hỗ trợ")) {
        botResponse = "Để được hỗ trợ kỹ thuật hoặc giải đáp thắc mắc 1-1, bạn có thể tham gia máy chủ Discord The Pencily và tạo ticket tại kênh #ho-tro. Ban điều phối và đội ngũ Tutors trực 24/7 luôn sẵn sàng lắng nghe bạn!";
        links = [{ text: "Mở máy chủ Discord The Pencily", url: "https://discord.gg/6hpEf4wC4z", external: true }];
      } else {
        botResponse = `Cảm ơn bạn đã nhắn tin: "${questionText}". Nếu bạn cần câu trả lời chi tiết hơn hoặc giải đáp riêng môn học, hãy ghé ngay kênh #hoi-dap trên Discord The Pencily để các bạn Peer Tutors và Admin hỗ trợ ngay nhé!`;
        links = [{ text: "Nhắn tin trên Discord", url: "https://discord.gg/6hpEf4wC4z", external: true }];
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: botResponse,
        time: "Vừa xong",
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* 1. BACKDROP OVERLAY (smooth fade, click to close) */}
      <div
        className={`fixed inset-0 bg-slate-900/30 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* 2. SLIDE-OUT SIDE DRAWER / TAB (Full height animated slide from right) */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-full sm:w-96 md:w-[420px] max-w-full bg-white border-l border-slate-200 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out select-none ${
          isOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
        aria-label="Cửa sổ trợ lý Cú Pencily"
      >
        {/* Header: Clean pure white, NO blue gradients */}
        <div className="p-4 sm:p-5 bg-white border-b border-slate-200/90 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200/80 p-1 flex items-center justify-center shrink-0 shadow-2xs">
              <Image
                src="/brand/mascot-owl.png"
                alt="Cú Pencily"
                width={60}
                height={60}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h4 className="font-poppins font-black text-sm sm:text-base text-[#0F2747] leading-tight">
                Cú Pencily Assistant
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-tight mt-0.5">
                Trợ lý học tập & Hỗ trợ The Pencily
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition cursor-pointer"
            aria-label="Đóng trợ lý"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 bg-[#FFFDF9] text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-[#0F2747] text-white rounded-br-xs shadow-2xs"
                    : "bg-white border border-slate-200/80 text-[#0F2747] rounded-bl-xs shadow-xs"
                }`}
              >
                <p className="whitespace-pre-line text-xs sm:text-[13px]">{msg.text}</p>

                {/* Links attached to response */}
                {msg.links && msg.links.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-2">
                    {msg.links.map((link, idx) => (
                      <div key={idx}>
                        {link.external ? (
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5865F2] hover:underline"
                          >
                            <DiscordLogo className="w-3.5 h-3.5 fill-current" />
                            <span>{link.text}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <Link
                            href={link.url}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 hover:text-amber-950 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200/80 transition"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                            <span>{link.text} →</span>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1.5 text-slate-400 text-xs italic pl-2">
              <span>Cú Pencily đang soạn câu trả lời...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2.5 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
          {QUICK_PROMPTS.map((p) => (
            <button
              key={p.key}
              onClick={() => handleSendQuestion(p.label, p.key)}
              className="px-3 py-1.5 rounded-full bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 text-[#0F2747] text-[11px] font-semibold transition whitespace-nowrap cursor-pointer shrink-0 shadow-2xs"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Input & Direct Contact Footer */}
        <div className="p-4 bg-white border-t border-slate-100 space-y-2.5 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuestion(inputValue);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Nhắn tin hỏi Cú Pencily..."
              className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#0F2747] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/40 focus:bg-white transition"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="w-9 h-9 rounded-xl bg-[#0F2747] hover:bg-slate-800 text-white flex items-center justify-center transition disabled:opacity-30 cursor-pointer shrink-0 shadow-2xs"
              title="Gửi"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Direct Contact Banner */}
          <div className="pt-1 flex items-center justify-between text-xs text-slate-500">
            <span className="truncate">Cần hỗ trợ trực tiếp từ Admin?</span>
            <a
              href="https://discord.gg/6hpEf4wC4z"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-[#5865F2] hover:underline flex items-center gap-1.5 shrink-0 ml-1"
            >
              <DiscordLogo className="w-3.5 h-3.5 fill-current" />
              <span>Mở Ticket Discord</span>
            </a>
          </div>
        </div>
      </aside>

      {/* 3. COMPACT FLOATING TRIGGER BUTTON (Circular by default, slides out text on hover) */}
      <div className="fixed bottom-5 right-5 z-40 select-none">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`group relative flex items-center p-1.5 sm:p-2 bg-white/95 hover:bg-white rounded-full border border-slate-300 hover:border-[#F59E0B] shadow-md hover:shadow-xl transition-all duration-300 active:scale-95 cursor-pointer backdrop-blur-xs ${
            isOpen ? "ring-2 ring-[#F59E0B]" : ""
          }`}
          aria-label="Cú Pencily trợ giúp"
        >
          {/* Text pill that slides out on hover */}
          <div className="max-w-0 opacity-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:opacity-100 group-hover:pl-3 group-hover:pr-1 transition-all duration-300 ease-in-out flex flex-col text-right">
            <span className="text-[11px] font-black text-[#0F2747] leading-tight">
              Cú Pencily
            </span>
            <span className="text-[10px] text-amber-700 font-bold">
              {isOpen ? "Đang mở trợ lý" : "Cần hỗ trợ?"}
            </span>
          </div>

          {/* Mascot Circle */}
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 shrink-0 group-hover:scale-105 transition-transform duration-200">
            <Image
              src="/brand/mascot-owl.png"
              alt="The Pencily Mascot"
              width={419}
              height={439}
              className="w-full h-full object-contain"
            />
          </div>
        </button>
      </div>
    </>
  );
}
