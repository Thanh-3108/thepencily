"use client";

import React, { useState } from "react";
import { X, Send, BookOpen, HelpCircle, Bell } from "lucide-react";
import { PencilyChatBubbleIcon } from "./icons/PencilyIcons";
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
  const { user, language } = usePencily();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F2747]/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#FFFDF9] border-2 border-[#0F2747] rounded-md shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#687280] hover:text-[#0F2747] hover:bg-slate-100 rounded-sm border-2 border-transparent hover:border-slate-300 transition-colors cursor-pointer"
          aria-label={language === "vi" ? "Đóng" : "Close"}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2.5">
            <div className="w-10 h-10 rounded-sm bg-[#0F2747] text-white flex items-center justify-center shrink-0 border-2 border-slate-300">
              <PencilyChatBubbleIcon size={20} />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#4F7ECB] inline-block">
                {language === "vi" ? "Cơ Chế Bài Đăng: The Pencily" : "Post Mechanism: The Pencily"}
              </span>
              <h2 className="font-poppins font-black text-2xl sm:text-3xl text-[#0F2747] mt-0.5">
                {language === "vi" ? "Đăng Bài Hoặc Đặt Câu Hỏi" : "Create Post or Ask Question"}
              </h2>
            </div>
          </div>
          <p className="text-sm sm:text-base text-[#4B5563] mt-1.5 leading-relaxed">
            {language === "vi"
              ? "Chia sẻ tài liệu học tập hoặc đặt câu hỏi để peer tutors và cộng đồng hỗ trợ trên Discord."
              : "Share study notes or ask questions for peer tutors and community support on Discord."}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Post Type Selector */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-[#0F2747] mb-2 uppercase tracking-wide">
              {language === "vi" ? "Loại bài đăng" : "Post Category"}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-sm">
              <button
                type="button"
                onClick={() => {
                  setCategory("doubt");
                  setDiscordChannel("#doubt-clearing");
                }}
                className={`p-3 rounded-sm border-2 text-center font-bold transition cursor-pointer ${
                  category === "doubt"
                    ? "bg-[#0F2747] text-white border-[#0F2747] shadow-xs"
                    : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
                }`}
              >
                ❓ {language === "vi" ? "Hỏi bài" : "Questions"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setCategory("docs");
                  setDiscordChannel("#tai-lieu-chia-se");
                }}
                className={`p-3 rounded-sm border-2 text-center font-bold transition cursor-pointer ${
                  category === "docs"
                    ? "bg-[#0F2747] text-white border-[#0F2747] shadow-xs"
                    : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
                }`}
              >
                📚 {language === "vi" ? "Tài liệu" : "Materials"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setCategory("tips");
                  setDiscordChannel("#kinh-nghiem-hoc-tap");
                }}
                className={`p-3 rounded-sm border-2 text-center font-bold transition cursor-pointer ${
                  category === "tips"
                    ? "bg-[#0F2747] text-white border-[#0F2747] shadow-xs"
                    : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
                }`}
              >
                💡 {language === "vi" ? "Kinh nghiệm" : "Tips & Advice"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setCategory("announcement");
                  setDiscordChannel("#thong-bao-hoc-nhom");
                }}
                className={`p-3 rounded-sm border-2 text-center font-bold transition cursor-pointer ${
                  category === "announcement"
                    ? "bg-[#0F2747] text-white border-[#0F2747] shadow-xs"
                    : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
                }`}
              >
                📢 {language === "vi" ? "Lớp mới" : "Announcements"}
              </button>
            </div>
          </div>

          {/* Subject / Subworld */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-[#0F2747] mb-2 uppercase tracking-wide">
              {language === "vi" ? "Môn học / Chuyên đề" : "Subject / Topic"}
            </label>
            <select
              value={subworld}
              onChange={(e) => setSubworld(e.target.value)}
              className="w-full bg-white border-2 border-slate-300 rounded-sm px-4 py-3 text-sm text-[#0F2747] font-medium focus:outline-none focus:border-[#0F2747]"
            >
              <option value="Toán học">{language === "vi" ? "Toán học (Giải tích, Hình không gian)" : "Mathematics (Calculus, Geometry)"}</option>
              <option value="Tin học & Lập trình">{language === "vi" ? "Tin học & Lập trình thuật toán" : "Computer Science & Algorithms"}</option>
              <option value="Khoa học Tự nhiên">{language === "vi" ? "Khoa học Tự nhiên (Vật lý, Hóa học)" : "Natural Sciences (Physics, Chemistry)"}</option>
              <option value="Tiếng Anh & IELTS">{language === "vi" ? "Tiếng Anh & Luyện thi IELTS/SAT" : "English, IELTS & SAT Prep"}</option>
              <option value="Kỹ năng tự học">{language === "vi" ? "Kỹ năng tự học & Quản lý thời gian" : "Self-Study Skills & Productivity"}</option>
            </select>
          </div>

          {/* Author Name & School */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-bold text-[#0F2747] mb-2 uppercase tracking-wide">
                {language === "vi" ? "Họ & Tên" : "Full Name"}
              </label>
              <input
                type="text"
                placeholder={language === "vi" ? "VD: Nguyễn Văn A" : "e.g. Alex Nguyen"}
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full bg-white border-2 border-slate-300 rounded-sm px-4 py-2.5 sm:py-3 text-sm text-[#0F2747] focus:outline-none focus:border-[#0F2747]"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-bold text-[#0F2747] mb-2 uppercase tracking-wide">
                {language === "vi" ? "Trường THPT" : "High School"}
              </label>
              <input
                type="text"
                placeholder={language === "vi" ? "VD: THPT Chuyên KHTN" : "e.g. Gifted High School"}
                value={authorSchool}
                onChange={(e) => setAuthorSchool(e.target.value)}
                className="w-full bg-white border-2 border-slate-300 rounded-sm px-4 py-2.5 sm:py-3 text-sm text-[#0F2747] focus:outline-none focus:border-[#0F2747]"
              />
            </div>
          </div>

          {/* Post Title */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-[#0F2747] mb-2 uppercase tracking-wide">
              {language === "vi" ? "Tiêu đề ngắn gọn" : "Short Title"}
            </label>
            <input
              type="text"
              required
              placeholder={
                language === "vi"
                  ? "VD: Cách giải nhanh bài toán cực trị hình Oxyz bằng Casio?"
                  : "e.g. Fast method to solve spatial geometry extrema?"
              }
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white border-2 border-slate-300 rounded-sm px-4 py-3 text-sm text-[#0F2747] focus:outline-none focus:border-[#0F2747]"
            />
          </div>

          {/* Content / Question snippet */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-[#0F2747] mb-2 uppercase tracking-wide">
              {language === "vi" ? "Nội dung chi tiết (hoặc link tài liệu)" : "Detailed Content or Link"}
            </label>
            <textarea
              required
              rows={3}
              placeholder={
                language === "vi"
                  ? "Mô tả câu hỏi, bài toán cần giải đáp, hoặc tóm tắt tài liệu đính kèm..."
                  : "Describe the problem, question, or summarize your attached materials..."
              }
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-white border-2 border-slate-300 rounded-sm p-4 text-sm text-[#0F2747] focus:outline-none focus:border-[#0F2747]"
            />
          </div>

          {/* Discord integration notice */}
          <div className="bg-[#5865F2]/10 border-2 border-[#5865F2]/30 rounded-sm p-4 text-xs sm:text-sm text-[#29328a] flex items-center justify-between">
            <div>
              <span className="font-bold">{language === "vi" ? "Đồng bộ Discord:" : "Discord Sync:"}</span>{" "}
              {language === "vi" ? "Bài viết sẽ tạo một thread tại kênh" : "Post creates a thread in channel"}{" "}
              <span className="font-mono font-bold text-[#0F2747]">{discordChannel}</span>.
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-bold text-[#687280] hover:text-[#0F2747] rounded-sm border-2 border-transparent hover:border-slate-300 cursor-pointer transition"
            >
              {language === "vi" ? "Hủy" : "Cancel"}
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-sm bg-[#FFC83D] hover:bg-[#EAB308] text-[#0F2747] border-2 border-[#0F2747] text-sm font-bold shadow-xs active:scale-95 transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{language === "vi" ? "Đăng Bài Lên Cộng Đồng" : "Post to Community"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
