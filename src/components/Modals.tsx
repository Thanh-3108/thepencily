"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Sparkles, Send, BookOpen, UserCheck, UploadCloud, MessageSquare, Plus, Edit3, ExternalLink } from "lucide-react";
import { PencilMascot } from "./Logo";

export { DiscordAuthModal } from "./DiscordAuthModal";

export function TutorApplicationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#FFFDF9] border-2 border-[#0F2747] rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto flex flex-col space-y-4">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-[#0F2747] hover:bg-[#FFC83D]/20 transition-colors cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pr-8">
          <div className="flex items-center gap-3">
            <PencilMascot size="sm" />
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FFC83D] bg-[#0F2747] px-2.5 py-0.5 rounded-md w-fit">
                <UserCheck className="w-3.5 h-3.5" />
                Đơn Ứng Tuyển Tutor
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F2747] font-poppins mt-0.5">
                Trở thành Peer Tutor
              </h3>
            </div>
          </div>

          <a
            href="https://forms.gle/y7143v1g2qCMjPZU8"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F2747] hover:bg-[#1A3E6D] text-white text-xs font-bold shadow-xs transition active:scale-95 shrink-0"
          >
            <span>Mở trong tab mới</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#FFC83D]" />
          </a>
        </div>

        <p className="text-xs sm:text-sm text-[#4B5563]">
          Điền biểu mẫu đăng ký bên dưới để trở thành Peer Tutor đồng hành cùng các bạn học sinh The Pencily.
        </p>

        {/* Embedded Google Form Container */}
        <div className="w-full rounded-2xl border border-[#0F2747]/15 overflow-hidden bg-slate-50 shadow-2xs">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfNSYz6QjgEi_C_yx2TAFdtYkus8_ncFT-SKnk_-4IargrFTg/viewform?embedded=true"
            width="100%"
            height="620"
            className="w-full min-h-[620px] border-0"
            title="Đơn đăng ký Peer Tutor"
          >
            Đang tải biểu mẫu...
          </iframe>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#687280] pt-1 border-t border-slate-100">
          <span>Nếu gặp lỗi hiển thị biểu mẫu, vui lòng mở trực tiếp trên Google Forms.</span>
          <a
            href="https://forms.gle/y7143v1g2qCMjPZU8"
            target="_blank"
            rel="noreferrer"
            className="font-bold text-[#4F7ECB] hover:underline inline-flex items-center gap-1"
          >
            <span>forms.gle/y7143v1g2qCMjPZU8</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

export function ContributeResourceModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: "",
    subject: "Toán học",
    authorName: "",
    resourceType: "Ghi chú Cornell",
    driveLink: "",
    notes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#FFFDF9] border-2 border-[#0F2747] rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-[#0F2747] hover:bg-[#FFC83D]/20 transition-colors"
          aria-label="Đóng"
        >
          <X className="w-6 h-6" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F2747] mb-2">
              <UploadCloud className="w-4 h-4 text-[#4F7ECB]" />
              Kho Tài Nguyên Mở The Pencily
            </div>
            <h3 className="text-2xl font-extrabold text-[#0F2747] mb-2 font-heading">
              Đóng góp Tài liệu Học tập
            </h3>
            <p className="text-sm text-[#4B5563] mb-5">
              Chia sẻ những bản ghi chú đẹp, lời giải hay, cheat sheet hoặc tóm tắt công thức của bạn để cùng lan tỏa giá trị tri thức cho bạn bè đồng trang lứa.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1">
                  Tiêu đề tài liệu *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Tổng hợp công thức Hình không gian 12 & Mẹo casio"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-[#0F2747]/20 focus:border-[#0F2747] focus:outline-none bg-white text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1">
                    Môn học *
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#0F2747]/20 focus:border-[#0F2747] focus:outline-none bg-white text-sm font-medium text-[#0F2747]"
                  >
                    <option value="Toán học">Toán học</option>
                    <option value="Lập trình & CNTT">Lập trình & CNTT</option>
                    <option value="Tiếng Anh">Tiếng Anh</option>
                    <option value="Vật lý">Vật lý</option>
                    <option value="Hóa học">Hóa học</option>
                    <option value="Phương pháp tự học">Phương pháp tự học</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1">
                    Định dạng tài liệu *
                  </label>
                  <select
                    value={formData.resourceType}
                    onChange={(e) => setFormData({ ...formData, resourceType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#0F2747]/20 focus:border-[#0F2747] focus:outline-none bg-white text-sm font-medium text-[#0F2747]"
                  >
                    <option value="Ghi chú Cornell / Sổ tay">Ghi chú Cornell / Sổ tay</option>
                    <option value="Tổng hợp công thức / Cheat sheet">Tổng hợp công thức / Cheat sheet</option>
                    <option value="Bộ đề ôn tập có giải chi tiết">Bộ đề thi & Lời giải</option>
                    <option value="Slide thuyết trình">Slide thuyết trình</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1">
                    Tên tác giả / Người đóng góp *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Tên bạn hoặc Bút danh"
                    value={formData.authorName}
                    onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-[#0F2747]/20 focus:border-[#0F2747] focus:outline-none bg-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1">
                    Link Google Drive / PDF *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://drive.google.com/..."
                    value={formData.driveLink}
                    onChange={(e) => setFormData({ ...formData, driveLink: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-[#0F2747]/20 focus:border-[#0F2747] focus:outline-none bg-white text-sm"
                  />
                </div>
              </div>

              <div className="p-3 bg-[#0F2747]/5 border border-[#0F2747]/10 rounded-xl text-xs text-[#4B5563]">
                🛡️ <b>Cam kết bản quyền:</b> Tài liệu bạn đóng góp phải là tài liệu tự biên soạn hoặc tài liệu mở có trích dẫn nguồn rõ ràng theo Quy chuẩn Giới Hạn Đỏ của The Pencily.
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/3 py-3 px-4 rounded-xl border-2 border-[#0F2747] text-sm font-bold text-[#0F2747] hover:bg-black/5 transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 px-4 rounded-xl bg-[#0F2747] hover:bg-[#1A3E6D] text-white text-sm font-bold shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  Gửi Tài Liệu
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-[#22C55E]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#16A34A]">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-[#0F2747] mb-2 font-heading">
              Cảm ơn đóng góp của bạn!
            </h3>
            <p className="text-sm text-[#4B5563] mb-6">
              Tài liệu <b>{formData.title}</b> đã được chuyển đến ban Academic & Quality để kiểm duyệt và đưa lên kho tài nguyên công khai.
            </p>
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="py-3 px-8 rounded-xl bg-[#0F2747] text-white font-bold text-sm"
            >
              Đóng
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// 4. MODAL: ĐỀ XUẤT CHUYÊN ĐỀ / MÔN HỌC (Request Class Modal)
export function RequestClassModal({
  isOpen,
  onClose,
  onSubmitRequest,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmitRequest: (data: { topic: string; subject: string }) => void;
}) {
  const [subject, setSubject] = useState("Toán 12");
  const [topic, setTopic] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onSubmitRequest({ topic: topic.trim(), subject });
    setTopic("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#FFFDF9] border-2 border-[#0F2747] rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-1.5 rounded-full text-[#0F2747] hover:bg-[#FFC83D]/20 transition cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <PencilMascot size="sm" />
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#FFC83D] bg-[#0F2747] px-2.5 py-0.5 rounded-md">
              Cộng đồng học sinh
            </span>
            <h3 className="text-2xl font-extrabold text-[#0F2747] font-poppins mt-0.5">
              Đề Xuất Môn / Chuyên Đề
            </h3>
          </div>
        </div>

        <p className="text-sm text-[#4B5563] mb-6">
          Bạn đang gặp khó khăn ở phần nào? Hãy đề xuất để các Peer Tutor mở lớp hoặc cùng các bạn vote để tổ chức buổi thảo luận.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1">
              Phân môn *
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#0F2747]/20 focus:border-[#0F2747] focus:outline-none bg-white text-sm font-medium text-[#0F2747]"
            >
              <option value="Toán 12">Toán 12 & Ôn thi tốt nghiệp</option>
              <option value="Tin học & DSA">Tin học, Thuật toán & Lập trình</option>
              <option value="IELTS Speaking">Tiếng Anh & IELTS / SAT</option>
              <option value="Vật Lý 12">Vật Lý 12 & Dao động / Điện xoay chiều</option>
              <option value="Hóa học 12">Hóa học 12</option>
              <option value="Kỹ năng tự học">Kỹ năng tự học & Ghi chép Cornell</option>
              <option value="Khác">Chuyên đề khác</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1">
              Tên chủ đề / Vấn đề cụ thể bạn cần học *
            </label>
            <textarea
              rows={3}
              required
              placeholder="Ví dụ: Ôn tập cực trị hàm số chứa dấu giá trị tuyệt đối / Luyện phản xạ IELTS Speaking Part 2..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-[#0F2747]/20 focus:border-[#0F2747] focus:outline-none bg-white text-sm"
            />
          </div>

          <div className="p-3 bg-[#FFF9EF] border border-[#FFC83D] rounded-xl text-xs text-[#0F2747]">
            💡 <b>Quy trình:</b> Đề xuất của bạn sẽ được hiển thị công khai để các bạn học sinh khác bấm vote. Khi đạt đủ quan tâm, Peer Tutor sẽ xếp lịch và mở phòng Discord.
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-3 px-4 rounded-xl border-2 border-[#0F2747] text-sm font-bold text-[#0F2747] hover:bg-black/5 transition cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="w-2/3 py-3 px-4 rounded-xl bg-[#0F2747] hover:bg-[#1A3E6D] text-white text-sm font-bold shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#FFC83D]" />
              Gửi đề xuất (+5 PP)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 5. MODAL: MỞ LỚP HỌC MỚI (Create Class Modal)
export function CreateClassModal({
  isOpen,
  onClose,
  onSubmitCreate,
  tutorName,
  tutorSchool,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmitCreate: (data: {
    title: string;
    category: "toan" | "tin" | "ielts" | "ly" | "sat" | "khac";
    categoryLabel: string;
    badge: "BOOTCAMP" | "WORKSHOP" | "VOICE" | "OPEN";
    badgeColor: string;
    tutorName: string;
    tutorSchool: string;
    tutorRole: string;
    schedule: string;
    timeSlot: string;
    dayLabel: string;
    discordChannel: string;
    discordRoom: string;
    meetUrl: string;
    maxSeats: number;
    description: string;
  }) => void;
  tutorName: string;
  tutorSchool: string;
}) {
  const [roomType, setRoomType] = useState<"web" | "external">("web");
  const [title, setTitle] = useState("");
  const [meetUrl, setMeetUrl] = useState("");
  const [schedule, setSchedule] = useState("Đang mở ngay bây giờ");
  const [hostName, setHostName] = useState(tutorName || "Host Học Sinh");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    let finalMeetUrl = "";
    if (roomType === "web") {
      // Free4Talk style in-website room
      const uniqueRoomCode = `room-${Date.now().toString(36)}`;
      finalMeetUrl = `/room/${uniqueRoomCode}`;
    } else {
      let validUrl = meetUrl.trim();
      if (!validUrl) {
        validUrl = "https://discord.gg";
      } else if (!validUrl.startsWith("http://") && !validUrl.startsWith("https://")) {
        validUrl = `https://${validUrl}`;
      }
      finalMeetUrl = validUrl;
    }

    onSubmitCreate({
      title: title.trim(),
      category: "khac",
      categoryLabel: roomType === "web" ? "Phòng Trực Tiếp (Web)" : "Phòng học trực tuyến",
      badge: "VOICE",
      badgeColor: roomType === "web" ? "bg-[#22C55E]/15 text-[#16A34A]" : "bg-[#4F7ECB]/15 text-[#4F7ECB]",
      tutorName: hostName.trim() || tutorName || "Host Học Sinh",
      tutorSchool: tutorSchool || "The Pencily",
      tutorRole: "Host phòng học",
      schedule: schedule.trim() || "Đang mở ngay bây giờ",
      timeSlot: "Trực tuyến",
      dayLabel: "Hôm nay",
      discordChannel: "#voice-phong-hoc",
      discordRoom: "#voice-phong-hoc",
      meetUrl: finalMeetUrl,
      maxSeats: 50,
      description: roomType === "web" 
        ? "Phòng học trực tiếp trên The Pencily: bật mic, cam, bảng ghi chú và chia sẻ màn hình ngay trên trình duyệt."
        : "Phòng học qua Google Meet / Discord Voice.",
    });

    setTitle("");
    setMeetUrl("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#FFFDF9] border-2 border-[#0F2747] rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-[#0F2747] hover:bg-black/5 transition cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFC83D] bg-[#0F2747] px-2.5 py-0.5 rounded-md">
            Trực tuyến
          </span>
          <h3 className="text-2xl font-black text-[#0F2747] font-poppins mt-1">
            Tạo Phòng Học Mới
          </h3>
          <p className="text-xs text-[#4B5563] mt-1">
            Host phòng học trực tiếp trên web hoặc liên kết qua Google Meet / Discord.
          </p>
        </div>

        {/* Room Type Selector */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-200/60 rounded-xl mb-4">
          <button
            type="button"
            onClick={() => setRoomType("web")}
            className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              roomType === "web"
                ? "bg-[#0F2747] text-white shadow-xs"
                : "text-[#4B5563] hover:text-[#0F2747]"
            }`}
          >
            <span>🎙️ Phòng Web Pencily</span>
          </button>
          <button
            type="button"
            onClick={() => setRoomType("external")}
            className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              roomType === "external"
                ? "bg-[#0F2747] text-white shadow-xs"
                : "text-[#4B5563] hover:text-[#0F2747]"
            }`}
          >
            <span>🔗 Meet / Discord</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1">
              Tên phòng / Chủ đề học *
            </label>
            <input
              type="text"
              required
              autoFocus
              placeholder="Ví dụ: Ôn tập Toán 12, Giải đề Lý, Luyện Speaking..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-[#0F2747]/20 focus:border-[#0F2747] focus:outline-none bg-white text-sm"
            />
          </div>

          {roomType === "web" ? (
            <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-[#0F2747] space-y-1">
              <div className="font-bold text-[#0F2747]">
                <span>Học trực tiếp trên The Pencily</span>
              </div>
              <p className="text-[11px] text-[#4B5563] leading-relaxed">
                Diễn ra ngay trong trình duyệt: bạn và các bạn học có thể đàm thoại mic, camera, ghi chú công thức và chia sẻ bài học tức thì.
              </p>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1">
                Link phòng học (Meet / Discord Voice) *
              </label>
              <input
                type="text"
                required
                placeholder="https://meet.google.com/xyz-abcd-efg hoặc link Discord"
                value={meetUrl}
                onChange={(e) => setMeetUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-[#0F2747]/20 focus:border-[#0F2747] focus:outline-none bg-white text-sm font-mono text-xs"
              />
              <div className="flex items-center gap-2 mt-1.5">
                <a
                  href="https://meet.google.com/new"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] font-semibold text-[#2563EB] hover:underline"
                >
                  + Tạo link Google Meet mới ↗
                </a>
                <span className="text-[11px] text-slate-400">•</span>
                <button
                  type="button"
                  onClick={() => setMeetUrl("https://discord.gg")}
                  className="text-[11px] font-semibold text-[#5865F2] hover:underline cursor-pointer"
                >
                  Dùng Discord
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1">
                Thời gian
              </label>
              <input
                type="text"
                placeholder="Đang mở ngay bây giờ"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#0F2747]/20 focus:border-[#0F2747] focus:outline-none bg-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1">
                Người Host
              </label>
              <input
                type="text"
                placeholder="Tên bạn"
                value={hostName}
                onChange={(e) => setHostName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#0F2747]/20 focus:border-[#0F2747] focus:outline-none bg-white text-sm"
              />
            </div>
          </div>

          <div className="flex gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-3 px-4 rounded-xl border border-slate-300 text-sm font-bold text-[#0F2747] hover:bg-slate-100 transition cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="w-2/3 py-3 px-4 rounded-xl bg-[#0F2747] hover:bg-[#1A3E6D] text-white text-sm font-bold shadow-md transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Plus className="w-4 h-4 text-[#FFC83D]" />
              <span>Tạo phòng học ngay</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 6. MODAL: CHỈNH SỬA HỒ SƠ HỌC SINH (Edit Profile Modal)
export function EditProfileModal({
  isOpen,
  onClose,
  initialData,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialData: { name: string; school: string; grade: string; discord: string };
  onSave: (data: { name: string; school: string; grade: string; discord: string }) => void;
}) {
  const [name, setName] = useState(initialData.name);
  const [school, setSchool] = useState(initialData.school);
  const [grade, setGrade] = useState(initialData.grade);
  const [discord, setDiscord] = useState(initialData.discord);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ name: name.trim(), school: school.trim(), grade: grade.trim(), discord: discord.trim() });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#FFFDF9] border-2 border-[#0F2747] rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-1.5 rounded-full text-[#0F2747] hover:bg-[#FFC83D]/20 transition cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <PencilMascot size="sm" />
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#FFC83D] bg-[#0F2747] px-2.5 py-0.5 rounded-md">
              Tài khoản
            </span>
            <h3 className="text-2xl font-extrabold text-[#0F2747] font-poppins mt-0.5">
              Chỉnh Sửa Thông Tin
            </h3>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1">
              Họ và tên *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-[#0F2747]/20 focus:border-[#0F2747] focus:outline-none bg-white text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1">
              Trường học
            </label>
            <input
              type="text"
              placeholder="Ví dụ: THPT Chuyên Lê Hồng Phong"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-[#0F2747]/20 focus:border-[#0F2747] focus:outline-none bg-white text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1">
                Khối lớp
              </label>
              <input
                type="text"
                placeholder="Lớp 11 / Lớp 12"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-[#0F2747]/20 focus:border-[#0F2747] focus:outline-none bg-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1">
                Discord Tag
              </label>
              <input
                type="text"
                placeholder="username#0000"
                value={discord}
                onChange={(e) => setDiscord(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-[#0F2747]/20 focus:border-[#0F2747] focus:outline-none bg-white text-sm"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-3 px-4 rounded-xl border-2 border-[#0F2747] text-sm font-bold text-[#0F2747] hover:bg-black/5 transition cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="w-2/3 py-3 px-4 rounded-xl bg-[#0F2747] hover:bg-[#1A3E6D] text-white text-sm font-bold shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Edit3 className="w-4 h-4 text-[#FFC83D]" />
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
