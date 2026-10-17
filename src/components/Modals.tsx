"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Send, BookOpen, UserCheck, UploadCloud, MessageSquare, Plus, Edit3, ExternalLink } from "lucide-react";
import { usePencily } from "@/context/PencilyContext";
import SchoolSelectDropdown from "./SchoolSelectDropdown";
import { PencilyProfileIcon, PencilyHelpDeskIcon, PencilySettingsIcon } from "./icons/PencilyIcons";

export { DiscordAuthModal } from "./DiscordAuthModal";

export function TutorApplicationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { language } = usePencily();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0F2747]/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#FFFDF9] border-2 border-[#0F2747] rounded-md shadow-2xl p-4 sm:p-6 max-h-[92vh] overflow-y-auto flex flex-col space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-sm border-2 border-transparent hover:border-slate-300 text-[#0F2747] hover:bg-slate-100 transition-colors cursor-pointer z-10"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pr-10 pb-3 border-b-2 border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-[#0F2747] text-white flex items-center justify-center shrink-0 border-2 border-slate-300">
              <PencilyProfileIcon size={20} />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4F7ECB] w-fit">
                <UserCheck className="w-3.5 h-3.5" />
                <span>{language === "vi" ? "Đơn Ứng Tuyển Peer Tutor" : "Peer Tutor Application"}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-[#0F2747] font-poppins mt-0.5">
                {language === "vi" ? "Trở thành Peer Tutor" : "Become a Peer Tutor"}
              </h3>
            </div>
          </div>

          <a
            href="https://forms.gle/y7143v1g2qCMjPZU8"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] border-2 border-slate-300 hover:border-[#0F2747] text-xs font-bold shadow-2xs transition active:scale-95 shrink-0"
          >
            <span>{language === "vi" ? "Mở trên Google Forms" : "Open in Google Forms"}</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#4F7ECB]" />
          </a>
        </div>

        {/* Embedded Google Form Container */}
        <div className="bg-white rounded-sm border-2 border-slate-300 overflow-hidden shadow-2xs">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfNSYz6QjgEi_C_yx2TAFdtYkus8_ncFT-SKnk_-4IargrFTg/viewform?embedded=true"
            width="100%"
            height="800"
            className="w-full min-h-[750px] border-0"
            title="Đơn đăng ký Peer Tutor The Pencily"
          >
            {language === "vi" ? "Đang tải biểu mẫu ứng tuyển..." : "Loading application form..."}
          </iframe>
        </div>
      </div>
    </div>
  );
}

export function ContributeResourceModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { language } = usePencily();
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
      <div className="relative w-full max-w-lg bg-[#FFFDF9] border-2 border-[#0F2747] rounded-md shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-sm border-2 border-transparent hover:border-slate-300 text-[#0F2747] hover:bg-slate-100 transition-colors"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F2747] mb-2">
              <UploadCloud className="w-4 h-4 text-[#4F7ECB]" />
              <span>{language === "vi" ? "Kho Tài Nguyên Mở The Pencily" : "The Pencily Open Resources"}</span>
            </div>
            <h3 className="text-2xl font-extrabold text-[#0F2747] mb-2 font-heading">
              {language === "vi" ? "Đóng góp Tài liệu Học tập" : "Contribute Study Materials"}
            </h3>
            <p className="text-sm text-[#4B5563] mb-5">
              {language === "vi"
                ? "Chia sẻ những bản ghi chú đẹp, lời giải hay, cheat sheet hoặc tóm tắt công thức của bạn để cùng lan tỏa giá trị tri thức cho bạn bè đồng trang lứa."
                : "Share neat study notes, cheat sheets, or problem walkthroughs to empower high school peers nationwide."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1">
                  {language === "vi" ? "Tiêu đề tài liệu *" : "Resource Title *"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={language === "vi" ? "Ví dụ: Tổng hợp công thức Hình không gian 12" : "e.g. Grade 12 Solid Geometry Formulas Cheat Sheet"}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none bg-white text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1">
                    {language === "vi" ? "Môn học *" : "Subject *"}
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none bg-white text-sm font-medium text-[#0F2747]"
                  >
                    <option value="Toán học">Toán học / Math</option>
                    <option value="Lập trình & CNTT">Tin học / Computer Science</option>
                    <option value="Tiếng Anh">Tiếng Anh (IELTS/SAT)</option>
                    <option value="Vật lý">Vật lý / Physics</option>
                    <option value="Hóa học">Hóa học / Chemistry</option>
                    <option value="Phương pháp tự học">Phương pháp tự học / Cornell</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1">
                    {language === "vi" ? "Định dạng tài liệu *" : "Format *"}
                  </label>
                  <select
                    value={formData.resourceType}
                    onChange={(e) => setFormData({ ...formData, resourceType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none bg-white text-sm font-medium text-[#0F2747]"
                  >
                    <option value="Ghi chú Cornell / Sổ tay">Ghi chú Cornell / Notes</option>
                    <option value="Tổng hợp công thức / Cheat sheet">Tổng hợp công thức / Cheat sheet</option>
                    <option value="Bộ đề ôn tập có giải chi tiết">Bộ đề thi & Lời giải / Mock Exam</option>
                    <option value="Slide thuyết trình">Slide bài giảng / Slides</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1">
                    {language === "vi" ? "Tên tác giả / Người đóng góp *" : "Author / Contributor *"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={language === "vi" ? "Tên bạn hoặc Bút danh" : "Your name or alias"}
                    value={formData.authorName}
                    onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none bg-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1">
                    {language === "vi" ? "Link Google Drive / PDF *" : "Google Drive / PDF URL *"}
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://drive.google.com/..."
                    value={formData.driveLink}
                    onChange={(e) => setFormData({ ...formData, driveLink: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none bg-white text-sm"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 border-2 border-slate-200 rounded-sm text-xs text-[#4B5563]">
                🛡️ <b>{language === "vi" ? "Cam kết bản quyền: " : "Copyright agreement: "}</b>
                {language === "vi"
                  ? "Tài liệu bạn đóng góp phải là tài liệu tự biên soạn hoặc tài liệu mở có trích dẫn nguồn rõ ràng theo Quy chuẩn Giới Hạn Đỏ của The Pencily."
                  : "Materials must be original or open educational resources with proper citations."}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/3 py-2.5 px-4 rounded-sm border-2 border-slate-300 text-xs font-bold text-[#0F2747] hover:bg-slate-100 transition"
                >
                  {language === "vi" ? "Hủy" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 px-4 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] border-2 border-slate-300 hover:border-slate-400 text-xs font-bold shadow-2xs transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <BookOpen className="w-4 h-4 text-[#4F7ECB]" />
                  <span>{language === "vi" ? "Gửi Tài Liệu" : "Submit Material"}</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-[#22C55E]/15 rounded-sm border-2 border-emerald-400 flex items-center justify-center mx-auto text-[#16A34A]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#0F2747] font-heading">
              {language === "vi" ? "Cảm ơn đóng góp của bạn!" : "Thank you for contributing!"}
            </h3>
            <p className="text-xs text-[#4B5563]">
              {language === "vi" ? (
                <>Tài liệu <b>{formData.title}</b> đã được chuyển đến ban Academic & Quality để kiểm duyệt và đưa lên kho tài nguyên công khai.</>
              ) : (
                <>Material <b>{formData.title}</b> has been queued for verification before public release.</>
              )}
            </p>
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="py-2.5 px-8 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] border-2 border-slate-300 hover:border-slate-400 font-bold text-xs shadow-2xs cursor-pointer active:scale-95 transition"
            >
              {language === "vi" ? "Đóng" : "Close"}
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
  const { language } = usePencily();
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
      <div className="relative w-full max-w-lg bg-[#FFFDF9] border-2 border-[#0F2747] rounded-md shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-1.5 rounded-sm border-2 border-transparent hover:border-slate-300 text-[#0F2747] hover:bg-slate-100 transition cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-sm bg-[#0F2747] text-white flex items-center justify-center shrink-0 border-2 border-slate-300">
            <PencilyHelpDeskIcon size={20} />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#4F7ECB]">
              {language === "vi" ? "Cộng đồng học sinh" : "Student Community"}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F2747] font-poppins mt-0.5">
              {language === "vi" ? "Đề Xuất Môn / Chuyên Đề" : "Request a Study Topic"}
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#4B5563] mb-6">
          {language === "vi"
            ? "Bạn đang gặp khó khăn ở phần nào? Hãy đề xuất để các Peer Tutor mở lớp hoặc cùng các bạn vote để tổ chức buổi thảo luận."
            : "Stuck on a tricky subject? Suggest a topic so Peer Tutors can schedule a dedicated live room."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1">
              {language === "vi" ? "Phân môn *" : "Subject *"}
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none bg-white text-xs font-medium text-[#0F2747]"
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
              {language === "vi" ? "Tên chủ đề / Vấn đề cụ thể bạn cần học *" : "Specific Topic / Question *"}
            </label>
            <textarea
              rows={3}
              required
              placeholder={
                language === "vi"
                  ? "Ví dụ: Ôn tập cực trị hàm số chứa dấu giá trị tuyệt đối / Luyện phản xạ IELTS Speaking Part 2..."
                  : "e.g. Absolute value extrema in Calculus / IELTS Speaking Part 2 fluency practice..."
              }
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-2.5 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none bg-white text-xs"
            />
          </div>

          <div className="p-3 bg-[#FFF9EF] border-2 border-amber-300 rounded-sm text-xs text-[#0F2747]">
            💡 <b>{language === "vi" ? "Quy trình: " : "How it works: "}</b>
            {language === "vi"
              ? "Đề xuất của bạn sẽ được hiển thị công khai để các bạn học sinh khác bấm vote. Khi đạt đủ quan tâm, Peer Tutor sẽ xếp lịch và mở phòng Discord."
              : "Your topic will be listed for peers to upvote. When interest is confirmed, a Peer Tutor will host a live session."}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-2.5 px-4 rounded-sm border-2 border-slate-300 text-xs font-bold text-[#0F2747] hover:bg-slate-100 transition cursor-pointer"
            >
              {language === "vi" ? "Hủy" : "Cancel"}
            </button>
            <button
              type="submit"
              className="w-2/3 py-2.5 px-4 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] border-2 border-slate-300 hover:border-slate-400 text-xs font-bold shadow-2xs transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4 text-[#4F7ECB]" />
              <span>{language === "vi" ? "Gửi đề xuất (+5 PP)" : "Submit Topic (+5 PP)"}</span>
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
  const { language } = usePencily();
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
      const uniqueRoomCode = `room-${Date.now().toString(36)}`;
      finalMeetUrl = `/room/${uniqueRoomCode}`;
    } else {
      let validUrl = meetUrl.trim();
      if (!validUrl) {
        validUrl = "https://discord.gg/6hpEf4wC4z";
      } else if (!validUrl.startsWith("http://") && !validUrl.startsWith("https://")) {
        validUrl = `https://${validUrl}`;
      }
      finalMeetUrl = validUrl;
    }

    onSubmitCreate({
      title: title.trim(),
      category: "khac",
      categoryLabel: roomType === "web" ? "Phòng học trực tiếp" : "Phòng học trực tuyến",
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
      <div className="relative w-full max-w-md bg-[#FFFDF9] border-2 border-[#0F2747] rounded-md shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-sm border-2 border-transparent hover:border-slate-300 text-[#0F2747] hover:bg-slate-100 transition cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5">
          <span className="text-xs font-bold uppercase tracking-wider text-[#4F7ECB]">
            {language === "vi" ? "Trực tuyến" : "Live Room"}
          </span>
          <h3 className="text-2xl font-black text-[#0F2747] font-poppins mt-1">
            {language === "vi" ? "Tạo Phòng Học Mới" : "Create New Room"}
          </h3>
          <p className="text-xs text-[#4B5563] mt-1">
            {language === "vi"
              ? "Host phòng học trực tiếp trên web hoặc liên kết qua Google Meet / Discord."
              : "Host live web rooms or connect via Google Meet / Discord."}
          </p>
        </div>

        {/* Room Type Selector */}
        <div className="grid grid-cols-2 gap-2 mb-4 border-b-2 border-slate-200">
          <button
            type="button"
            onClick={() => setRoomType("web")}
            className={`py-2 px-3 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border-b-2 -mb-[2px] ${
              roomType === "web"
                ? "border-[#0F2747] text-[#0F2747]"
                : "border-transparent text-slate-500 hover:text-[#0F2747]"
            }`}
          >
            <span>🎙️ {language === "vi" ? "Phòng Web Pencily" : "Pencily Web Room"}</span>
          </button>
          <button
            type="button"
            onClick={() => setRoomType("external")}
            className={`py-2 px-3 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border-b-2 -mb-[2px] ${
              roomType === "external"
                ? "border-[#0F2747] text-[#0F2747]"
                : "border-transparent text-slate-500 hover:text-[#0F2747]"
            }`}
          >
            <span>🔗 Meet / Discord</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1">
              {language === "vi" ? "Tên phòng / Chủ đề học *" : "Room Title / Topic *"}
            </label>
            <input
              type="text"
              required
              autoFocus
              placeholder={language === "vi" ? "Ví dụ: Ôn tập Toán 12, Giải đề Lý, Luyện Speaking..." : "e.g. SAT Math review, IELTS Speaking practice..."}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none bg-white text-xs"
            />
          </div>

          {roomType === "web" ? (
            <div className="p-3 rounded-sm bg-amber-50/80 border-2 border-amber-200 text-xs text-[#0F2747] space-y-1">
              <div className="font-bold text-[#0F2747]">
                <span>{language === "vi" ? "Học trực tiếp trên The Pencily" : "Native Web Study Room"}</span>
              </div>
              <p className="text-[11px] text-[#4B5563] leading-relaxed">
                {language === "vi"
                  ? "Diễn ra ngay trong trình duyệt: bạn và các bạn học có thể đàm thoại mic, camera, ghi chú công thức và chia sẻ bài học tức thì."
                  : "Runs directly in your browser: voice, video, notes, and screen sharing."}
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
                placeholder="https://meet.google.com/xyz-abcd-efg"
                value={meetUrl}
                onChange={(e) => setMeetUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none bg-white font-mono text-xs"
              />
              <div className="flex items-center gap-2 mt-1.5">
                <a
                  href="https://meet.google.com/new"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] font-semibold text-[#2563EB] hover:underline"
                >
                  + Google Meet ↗
                </a>
                <span className="text-[11px] text-slate-400">/</span>
                <button
                  type="button"
                  onClick={() => setMeetUrl("https://discord.gg/6hpEf4wC4z")}
                  className="text-[11px] font-semibold text-[#5865F2] hover:underline cursor-pointer"
                >
                  Discord Voice
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1">
                {language === "vi" ? "Thời gian" : "Schedule"}
              </label>
              <input
                type="text"
                placeholder={language === "vi" ? "Đang mở ngay bây giờ" : "Live now"}
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none bg-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1">
                {language === "vi" ? "Người Host" : "Host Name"}
              </label>
              <input
                type="text"
                placeholder={language === "vi" ? "Tên bạn" : "Your name"}
                value={hostName}
                onChange={(e) => setHostName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none bg-white text-xs"
              />
            </div>
          </div>

          <div className="flex gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-2.5 px-4 rounded-sm border-2 border-slate-300 text-xs font-bold text-[#0F2747] hover:bg-slate-100 transition cursor-pointer"
            >
              {language === "vi" ? "Hủy" : "Cancel"}
            </button>
            <button
              type="submit"
              className="w-2/3 py-2.5 px-4 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] border-2 border-slate-300 hover:border-slate-400 text-xs font-bold shadow-2xs transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Plus className="w-4 h-4 text-[#4F7ECB]" />
              <span>{language === "vi" ? "Tạo phòng học ngay" : "Create Room"}</span>
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
  const { language } = usePencily();
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
      <div className="relative w-full max-w-md bg-[#FFFDF9] border-2 border-[#0F2747] rounded-md shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-1.5 rounded-sm border-2 border-transparent hover:border-slate-300 text-[#0F2747] hover:bg-slate-100 transition cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-sm bg-[#0F2747] text-white flex items-center justify-center shrink-0 border-2 border-slate-300">
            <PencilySettingsIcon size={20} />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#4F7ECB]">
              {language === "vi" ? "Tài khoản" : "Account"}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F2747] font-poppins mt-0.5">
              {language === "vi" ? "Chỉnh Sửa Thông Tin" : "Edit Profile"}
            </h3>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1">
              {language === "vi" ? "Họ và tên *" : "Full Name *"}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none bg-white text-xs"
            />
          </div>

          <SchoolSelectDropdown
            value={school}
            onChange={setSchool}
            label={language === "vi" ? "Trường học" : "School"}
            language={language as "vi" | "en"}
            placeholder={language === "vi" ? "Ví dụ: THPT Chuyên Lê Hồng Phong" : "e.g. Le Hong Phong High School"}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1">
                {language === "vi" ? "Khối lớp" : "Grade"}
              </label>
              <input
                type="text"
                placeholder={language === "vi" ? "Lớp 11 / Lớp 12" : "Grade 11 / 12"}
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-4 py-2.5 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none bg-white text-xs"
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
                className="w-full px-4 py-2.5 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none bg-white text-xs"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-2.5 px-4 rounded-sm border-2 border-slate-300 text-xs font-bold text-[#0F2747] hover:bg-slate-100 transition cursor-pointer"
            >
              {language === "vi" ? "Hủy" : "Cancel"}
            </button>
            <button
              type="submit"
              className="w-2/3 py-2.5 px-4 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] border-2 border-slate-300 hover:border-slate-400 text-xs font-bold shadow-2xs transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Edit3 className="w-4 h-4 text-[#4F7ECB]" />
              <span>{language === "vi" ? "Lưu thay đổi" : "Save Changes"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
