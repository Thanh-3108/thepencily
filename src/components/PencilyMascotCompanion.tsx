"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Send, ExternalLink, Mail } from "lucide-react";
import { usePencily } from "@/context/PencilyContext";

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
    text: "Chào bạn! Mình là Cú Pencily 🦉: trợ lý học tập The Pencily. Bạn cần hỗ trợ về phòng học, cách tích lũy & đổi điểm PP, hay liên hệ trực tiếp ban điều phối?",
    time: "Vừa xong",
    links: [
      { text: "Cửa hàng đổi đặc quyền PP", url: "/dashboard?tab=shop" },
      { text: "Lịch phòng học mở", url: "/dashboard?tab=classes" },
    ],
  },
];

const QUICK_PROMPTS = [
  { label: "🎁 Đổi đặc quyền & dùng PP?", key: "pp" },
  { label: "🎓 Cách vào phòng học?", key: "class" },
  { label: "👨‍🏫 Đăng ký làm Tutor?", key: "tutor" },
  { label: "✉️ Email hỗ trợ kỹ thuật?", key: "support" },
];

export function PencilyMascotCompanion() {
  const { language } = usePencily();
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
        botResponse = "Pencily Points (PP) được tích lũy khi bạn tham gia lớp học (+10 PP), đăng thảo luận (+5 PP) hoặc điểm danh bài học (+5 PP). Bạn có thể ghé ngay Cửa Hàng PP để đổi Mindmap 12 môn, kho đề chuyên hoặc vé kèm 1-1 với Top Tutor!";
        links = [{ text: "Đến Cửa Hàng PP", url: "/dashboard?tab=shop" }];
      } else if (promptKey === "class" || lower.includes("phòng") || lower.includes("lớp") || lower.includes("học")) {
        botResponse = "Các phòng học trực tuyến mở tự do tại tab 'Tìm lớp học'. Khi lớp bắt đầu, bạn bấm 'Vào lớp' để tham gia qua Web Room trực tiếp hoặc phòng Google Meet hoàn toàn miễn phí!";
        links = [{ text: "Khám phá phòng học", url: "/dashboard?tab=classes" }];
      } else if (promptKey === "tutor" || lower.includes("tutor") || lower.includes("gia sư") || lower.includes("dạy")) {
        botResponse = "The Pencily luôn chào đón các bạn học sinh giỏi, đam mê chia sẻ trở thành Peer Tutor! Bạn vào tab 'Trở thành Peer Tutor' trong Dashboard để hoàn thiện 3 bước xác thực và nhận Portfolio chứng nhận cống hiến.";
        links = [{ text: "Đăng ký làm Peer Tutor", url: "/dashboard?tab=become-tutor" }];
      } else if (promptKey === "support" || lower.includes("liên hệ") || lower.includes("admin") || lower.includes("hỗ trợ") || lower.includes("discord")) {
        botResponse = "Để được hỗ trợ kỹ thuật hoặc giải đáp thắc mắc 1-1, bạn có thể gửi email trực tiếp đến ban điều phối qua contact@thepencily.com. Đội ngũ The Pencily luôn sẵn sàng đồng hành cùng bạn!";
        links = [{ text: "Gửi email hỗ trợ kỹ thuật", url: "mailto:contact@thepencily.com", external: true }];
      } else {
        botResponse = `Cảm ơn bạn đã nhắn tin: "${questionText}". Đội ngũ The Pencily luôn sẵn sàng giải đáp mọi thắc mắc học tập qua email contact@thepencily.com hoặc thảo luận tại mục Diễn đàn!`;
        links = [{ text: "Xem lịch mở lớp", url: "/dashboard?tab=classes" }];
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

      {/* 2. SLIDE-OUT SIDE DRAWER */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-full sm:w-96 md:w-[420px] max-w-full bg-[#FFFDF9] border-l border-[#E6DEC8] shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out select-none ${
          isOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
        aria-label="Cửa sổ trợ lý Cú Pencily"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#E6DEC8] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#FFF6DC] p-1 flex items-center justify-center shrink-0 shadow-2xs">
              <Image
                src="/brand/mascot-owl.png"
                alt="Cú Pencily"
                width={60}
                height={60}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h4 className="font-poppins font-bold text-sm sm:text-base text-[#0F2747] leading-tight">
                Cú Pencily
              </h4>
              <p className="text-xs text-[#6B7A90] leading-tight mt-0.5">
                {language === "vi" ? "Người bạn đồng hành học tập" : "Friendly Study Companion"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="w-9 h-9 rounded-full hover:bg-[#FAF7EE] flex items-center justify-center text-slate-400 hover:text-[#0F2747] transition cursor-pointer"
            aria-label="Đóng trợ lý"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 bg-[#FAF7EE]/60 text-xs">
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
                    ? "bg-[#0F2747] text-white shadow-xs rounded-br-sm"
                    : "bg-white border border-[#E6DEC8] text-[#0F2747] shadow-2xs rounded-bl-sm"
                }`}
              >
                <p className="whitespace-pre-line text-xs sm:text-[13px]">{msg.text}</p>

                {/* Links attached to response */}
                {msg.links && msg.links.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-[#F0EAE0] space-y-2">
                    {msg.links.map((link, idx) => (
                      <div key={idx}>
                        {link.external ? (
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3B6FD8] hover:underline"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>{link.text}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <Link
                            href={link.url}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900 hover:text-amber-950 bg-[#FFF6DC] hover:bg-[#FDEBA8] px-3.5 py-1.5 rounded-full transition"
                          >
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
              <span>{language === "vi" ? "Cú Pencily đang soạn câu trả lời..." : "Pencily Owl is typing..."}</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-3 bg-white border-t border-[#ECE4CE] flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
          {QUICK_PROMPTS.map((p) => (
            <button
              key={p.key}
              onClick={() => handleSendQuestion(p.label, p.key)}
              className="px-3.5 py-1.5 rounded-full bg-[#FAF7EE] hover:bg-[#FFF6DC] border border-[#E6DEC8] hover:border-[#F5D67B] text-[#0F2747] text-[11px] font-medium transition whitespace-nowrap cursor-pointer shrink-0"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Input & Direct Contact Footer */}
        <div className="p-4 bg-white border-t border-[#ECE4CE] space-y-2.5 shrink-0">
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
              placeholder={language === "vi" ? "Nhắn tin hỏi Cú Pencily..." : "Message Pencily Owl..."}
              className="flex-1 px-4 py-2.5 bg-[#FAF7EE] border border-[#E6DEC8] rounded-full text-xs text-[#0F2747] placeholder:text-slate-400 focus:outline-none focus:border-[#4F7ECB] focus:bg-white transition"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="w-10 h-10 rounded-full bg-[#0F2747] hover:bg-[#193B6B] text-white flex items-center justify-center transition disabled:opacity-30 cursor-pointer shrink-0 shadow-xs"
              title="Gửi"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Direct Contact Banner */}
          <div className="pt-1 flex items-center justify-between text-xs text-[#6B7A90]">
            <span className="truncate">{language === "vi" ? "Cần hỗ trợ từ ban học vụ?" : "Need staff support?"}</span>
            <a
              href="mailto:contact@thepencily.com"
              className="font-semibold text-[#3B6FD8] hover:underline flex items-center gap-1.5 shrink-0 ml-1"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{language === "vi" ? "Gửi Email Hỗ Trợ" : "Email Support"}</span>
            </a>
          </div>
        </div>
      </aside>

      {/* 3. FRIENDLY FLOATING MASCOT TRIGGER */}
      <div className="fixed bottom-5 right-5 z-40 select-none">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`group relative flex items-center justify-center p-2 bg-[#FFFDF9]/95 hover:bg-white rounded-2xl border border-[#E6DEC8] hover:border-[#FFC83D] shadow-pencily-soft hover:shadow-xl hover:-translate-y-1 transition-all duration-300 active:scale-95 cursor-pointer backdrop-blur-xs ${
            isOpen ? "opacity-0 pointer-events-none scale-90" : "opacity-100 scale-100"
          }`}
          aria-label="Cú Pencily trợ giúp"
        >
          {/* Vertical speech bubble that slides up on hover */}
          <div
            className="absolute bottom-[calc(100%+10px)] right-0 opacity-0 translate-y-2 scale-95 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-300 ease-out"
          >
            <div className="relative bg-white border border-[#E6DEC8] shadow-pencily-soft rounded-2xl px-4 py-2 whitespace-nowrap text-center">
              <span className="block text-xs font-bold text-[#0F2747] leading-tight">
                {language === "vi" ? "Chào bạn! Mình là Cú Pencily" : "Hi! I'm Pencily Owl"}
              </span>
              <span className="block text-[11px] text-amber-700 font-semibold mt-0.5 leading-tight">
                {language === "vi" ? "Bấm để trò chuyện cùng mình nhé" : "Click to chat with me"}
              </span>
              <div className="absolute -bottom-1.5 right-5 w-3 h-3 bg-white border-b border-r border-[#E6DEC8] rotate-45" />
            </div>
          </div>

          {/* Mascot Box */}
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 shrink-0 group-hover:scale-105 transition-transform duration-200">
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
