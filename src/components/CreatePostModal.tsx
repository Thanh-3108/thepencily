"use client";

import React, { useState } from "react";
import { X, Send, BookOpen, HelpCircle, Bell, Sparkles } from "lucide-react";
import { PencilMascot } from "./Logo";

import { usePencily } from "@/context/PencilyContext";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitPost: (post: {
    title: string;
    content: string;
    category: "docs" | "doubt" | "announcement" | "tips";
    subworld: string;
    discordChannel: string;
    authorName: string;
    authorSchool: string;
  }) => void;
}

export function CreatePostModal({
  isOpen,
  onClose,
  onSubmitPost,
}: CreatePostModalProps) {
  const { user } = usePencily();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<"docs" | "doubt" | "announcement" | "tips">("doubt");
  const [subworld, setSubworld] = useState("Toán học");
  const [authorName, setAuthorName] = useState(user?.name || "Học sinh");
  const [authorSchool, setAuthorSchool] = useState(user?.school || "THPT");
  const [discordChannel, setDiscordChannel] = useState("#doubt-clearing");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onSubmitPost({
      title,
      content,
      category,
      subworld,
      discordChannel,
      authorName,
      authorSchool,
    });

    // Reset & close
    setTitle("");
    setContent("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#FFFDF9] border-2 border-[#0F2747] rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#687280] hover:text-[#0F2747] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2.5">
            <PencilMascot size="sm" />
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#FFC83D] bg-[#0F2747] px-3 py-0.5 rounded-full inline-block">
                Cơ Chế Bài Đăng • The Pencily
              </span>
              <h2 className="font-poppins font-black text-2xl sm:text-3xl text-[#0F2747] mt-0.5">
                Đăng Bài Hoặc Đặt Câu Hỏi
              </h2>
            </div>
          </div>
          <p className="text-sm sm:text-base text-[#4B5563] mt-1.5">
            Chia sẻ tài liệu Cornell hoặc đặt câu hỏi để peer tutors và cộng đồng hỗ trợ trên Discord.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Post Type Selector */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-[#0F2747] mb-2 uppercase tracking-wide">
              Loại bài đăng
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-sm">
              <button
                type="button"
                onClick={() => {
                  setCategory("doubt");
                  setDiscordChannel("#doubt-clearing");
                }}
                className={`p-3 rounded-2xl border text-center font-bold transition cursor-pointer ${
                  category === "doubt"
                    ? "bg-[#0F2747] text-white border-[#0F2747] shadow-xs"
                    : "bg-white text-[#0F2747] border-[#0F2747]/15 hover:border-[#0F2747]/40"
                }`}
              >
                ❓ Hỏi bài
              </button>
              <button
                type="button"
                onClick={() => {
                  setCategory("docs");
                  setDiscordChannel("#tai-lieu-chia-se");
                }}
                className={`p-3 rounded-2xl border text-center font-bold transition cursor-pointer ${
                  category === "docs"
                    ? "bg-[#0F2747] text-white border-[#0F2747] shadow-xs"
                    : "bg-white text-[#0F2747] border-[#0F2747]/15 hover:border-[#0F2747]/40"
                }`}
              >
                📚 Tài liệu
              </button>
              <button
                type="button"
                onClick={() => {
                  setCategory("tips");
                  setDiscordChannel("#kinh-nghiem-hoc-tap");
                }}
                className={`p-3 rounded-2xl border text-center font-bold transition cursor-pointer ${
                  category === "tips"
                    ? "bg-[#0F2747] text-white border-[#0F2747] shadow-xs"
                    : "bg-white text-[#0F2747] border-[#0F2747]/15 hover:border-[#0F2747]/40"
                }`}
              >
                💡 Kinh nghiệm
              </button>
              <button
                type="button"
                onClick={() => {
                  setCategory("announcement");
                  setDiscordChannel("#thong-bao-hoc-nhom");
                }}
                className={`p-3 rounded-2xl border text-center font-bold transition cursor-pointer ${
                  category === "announcement"
                    ? "bg-[#0F2747] text-white border-[#0F2747] shadow-xs"
                    : "bg-white text-[#0F2747] border-[#0F2747]/15 hover:border-[#0F2747]/40"
                }`}
              >
                📢 Lớp mới
              </button>
            </div>
          </div>

          {/* Subject / Subworld */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-[#0F2747] mb-2 uppercase tracking-wide">
              Môn học / Chuyên đề
            </label>
            <select
              value={subworld}
              onChange={(e) => setSubworld(e.target.value)}
              className="w-full bg-white border border-[#0F2747]/20 rounded-2xl px-4 py-3 text-sm text-[#0F2747] font-medium focus:outline-none focus:border-[#0F2747]"
            >
              <option value="Toán học">Toán học (Giải tích, Hình không gian)</option>
              <option value="Tin học & Lập trình">Tin học & Lập trình thuật toán</option>
              <option value="Khoa học Tự nhiên">Khoa học Tự nhiên (Vật lý, Hóa học)</option>
              <option value="Tiếng Anh & IELTS">Tiếng Anh & Luyện thi IELTS</option>
              <option value="Kỹ năng tự học">Kỹ năng tự học & Quản lý thời gian</option>
            </select>
          </div>

          {/* Author Name & School */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-bold text-[#0F2747] mb-2 uppercase tracking-wide">
                Họ & Tên
              </label>
              <input
                type="text"
                placeholder="VD: Nguyễn Văn A"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full bg-white border border-[#0F2747]/20 rounded-2xl px-4 py-2.5 sm:py-3 text-sm text-[#0F2747] focus:outline-none focus:border-[#0F2747]"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-bold text-[#0F2747] mb-2 uppercase tracking-wide">
                Trường THPT
              </label>
              <input
                type="text"
                placeholder="VD: THPT Chuyên KHTN"
                value={authorSchool}
                onChange={(e) => setAuthorSchool(e.target.value)}
                className="w-full bg-white border border-[#0F2747]/20 rounded-2xl px-4 py-2.5 sm:py-3 text-sm text-[#0F2747] focus:outline-none focus:border-[#0F2747]"
              />
            </div>
          </div>

          {/* Post Title */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-[#0F2747] mb-2 uppercase tracking-wide">
              Tiêu đề ngắn gọn
            </label>
            <input
              type="text"
              required
              placeholder="VD: Cách giải nhanh bài toán cực trị hình Oxyz bằng Casio?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white border border-[#0F2747]/20 rounded-2xl px-4 py-3 text-sm text-[#0F2747] focus:outline-none focus:border-[#0F2747]"
            />
          </div>

          {/* Content / Question snippet */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-[#0F2747] mb-2 uppercase tracking-wide">
              Nội dung chi tiết (hoặc link tài liệu)
            </label>
            <textarea
              required
              rows={3}
              placeholder="Mô tả câu hỏi, bài toán cần giải đáp, hoặc tóm tắt tài liệu đính kèm..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-white border border-[#0F2747]/20 rounded-2xl p-4 text-sm text-[#0F2747] focus:outline-none focus:border-[#0F2747]"
            />
          </div>

          {/* Discord integration notice */}
          <div className="bg-[#5865F2]/10 border border-[#5865F2]/20 rounded-2xl p-4 text-xs sm:text-sm text-[#29328a] flex items-center justify-between">
            <div>
              <span className="font-bold">Đồng bộ Discord:</span> Bài viết sẽ tạo một thread tại kênh{" "}
              <span className="font-mono font-bold text-[#0F2747]">{discordChannel}</span>.
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-bold text-[#687280] hover:text-[#0F2747] cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#FFC83D] hover:bg-[#EAB308] text-[#0F2747] text-sm font-bold shadow-xs active:scale-95 transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Đăng Bài Lên Cộng Đồng</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
