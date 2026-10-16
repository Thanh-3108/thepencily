"use client";

import React, { useState } from "react";
import { CheckCircle2, Send, ArrowRight, ExternalLink, Sparkles, BookOpen, Clock, ShieldCheck, Heart } from "lucide-react";
import { usePencily } from "@/context/PencilyContext";
import { PencilyProfileIcon, PencilyPortfolioIcon, PencilyClassroomsIcon } from "./icons/PencilyIcons";

interface NativeTutorApplicationProps {
  onSuccess?: () => void;
  className?: string;
}

export function NativeTutorApplication({ onSuccess, className = "" }: NativeTutorApplicationProps) {
  const { user, language } = usePencily();
  const isVi = language === "vi";

  // Form state
  const [formData, setFormData] = useState({
    fullName: user.name || "",
    email: user.email || "",
    discordTag: user.discord || user.handle || "",
    phoneOrZalo: "",
    school: user.school || "",
    gradeOrYear: user.grade || "Lớp 11",
    primarySubject: "IELTS",
    secondarySubjects: ["SAT"],
    scoreOrCredential: "",
    tutoringExperience: "",
    motivation: "",
    weeklyHours: "2-4 giờ/tuần",
    availabilityDays: ["Thứ 7", "Chủ nhật"],
    hasAgreedHonorCode: false,
  });

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const subjectOptions = [
    { id: "IELTS", labelVi: "IELTS (Writing/Speaking/Overall)", labelEn: "IELTS (Writing/Speaking/Overall)" },
    { id: "SAT", labelVi: "Digital SAT (Math/RW 1450+)", labelEn: "Digital SAT (Math/RW 1450+)" },
    { id: "TOAN", labelVi: "Toán THPT & ĐGNL 9+", labelEn: "High School Math & VNU Test 9+" },
    { id: "LY", labelVi: "Vật Lý THPT & Chuyên", labelEn: "Physics (Standard & Gifted)" },
    { id: "HOA", labelVi: "Hóa Học THPT", labelEn: "Chemistry" },
    { id: "TIN", labelVi: "Tin Học / Web Dev / Python", labelEn: "Computer Science / Web / Python" },
    { id: "KHAC", labelVi: "Khai Phóng / Kỹ Năng / Khác", labelEn: "Liberal Arts / Soft Skills" },
  ];

  const handleToggleSecondary = (subj: string) => {
    setFormData((prev) => {
      const exists = prev.secondarySubjects.includes(subj);
      if (exists) {
        return { ...prev, secondarySubjects: prev.secondarySubjects.filter((s) => s !== subj) };
      }
      return { ...prev, secondarySubjects: [...prev.secondarySubjects, subj] };
    });
  };

  const handleToggleDay = (day: string) => {
    setFormData((prev) => {
      const exists = prev.availabilityDays.includes(day);
      if (exists) {
        return { ...prev, availabilityDays: prev.availabilityDays.filter((d) => d !== day) };
      }
      return { ...prev, availabilityDays: [...prev.availabilityDays, day] };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.hasAgreedHonorCode) {
      alert(isVi ? "Vui lòng cam kết tuân thủ quy chuẩn phòng học The Pencily." : "Please agree to the The Pencily Honor Code.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onSuccess) onSuccess();
    }, 900);
  };

  if (isSubmitted) {
    return (
      <div className={`bg-white rounded-md border-2 border-emerald-500 p-8 sm:p-12 text-center space-y-5 shadow-sm ${className}`}>
        <div className="w-16 h-16 rounded-sm bg-emerald-50 border-2 border-emerald-400 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-xs border border-emerald-300">
            {isVi ? "ĐÃ GỬI ĐƠN ỨNG TUYỂN" : "APPLICATION SUBMITTED"}
          </span>
          <h3 className="font-poppins font-black text-2xl sm:text-3xl text-[#0F2747]">
            {isVi ? "Cảm ơn bạn đã sẵn sàng lan tỏa tri thức!" : "Thank you for empowering peer learning!"}
          </h3>
          <p className="text-xs sm:text-sm text-[#475569] max-w-lg mx-auto leading-relaxed">
            {isVi
              ? `Hồ sơ ứng tuyển môn ${formData.primarySubject} của bạn (${formData.fullName}) đã được ghi nhận vào hệ thống học thuật The Pencily Gen 1.0. Ban điều phối sẽ liên hệ qua Discord/Zalo trong 48h để hẹn lịch phỏng vấn và cấp quyền Tutor Studio.`
              : `Your tutor application for ${formData.primarySubject} has been successfully recorded. The Academic Team will reach out via Discord/Email within 48 hours for onboarding.`}
          </p>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://discord.gg/6hpEf4wC4z"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold transition shadow-xs"
          >
            <span>{isVi ? "Vào kênh #nhan-role trên Discord" : "Join #role-assignment on Discord"}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="px-4 py-2.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-[#0F2747] text-xs font-bold transition"
          >
            {isVi ? "Xem lại form" : "Edit Application"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-md border-2 border-slate-300 shadow-sm overflow-hidden ${className}`}>
      {/* 1. Header Progress Bar */}
      <div className="bg-[#FAF7F2] p-5 sm:p-6 border-b-2 border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-[#4F7ECB] uppercase tracking-wider mb-1">
            <PencilyPortfolioIcon size={16} />
            <span>{isVi ? "BẢN ĐĂNG KÝ NGUYÊN BẢN THE PENCILY" : "THE PENCILY NATIVE APPLICATION"}</span>
          </div>
          <h3 className="font-poppins font-black text-xl sm:text-2xl text-[#0F2747] leading-tight">
            {isVi ? "Đơn Ứng Tuyển Peer Tutor & Mentor" : "Peer Tutor & Mentor Application"}
          </h3>
          <p className="text-xs text-[#687280] mt-0.5">
            {isVi ? "Chia sẻ kỹ năng, hướng dẫn bạn bè và nhận chứng nhận hoạt động ngoại khóa chính thức." : "Mentor junior peers, earn PP, and obtain verified extracurricular certificates."}
          </p>
        </div>

        {/* Step Indicator Pills */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          {[
            { num: 1, labelVi: "1. Cá nhân", labelEn: "1. Info" },
            { num: 2, labelVi: "2. Chuyên môn", labelEn: "2. Subject" },
            { num: 3, labelVi: "3. Cam kết", labelEn: "3. Commit" },
          ].map((s) => (
            <button
              key={s.num}
              type="button"
              onClick={() => setStep(s.num as 1 | 2 | 3)}
              className={`px-3 py-1.5 rounded-sm text-xs font-bold border-2 transition cursor-pointer ${
                step === s.num
                  ? "bg-[#0F2747] text-white border-[#0F2747]"
                  : "bg-white text-slate-600 border-slate-300 hover:border-slate-400"
              }`}
            >
              {isVi ? s.labelVi : s.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Step Form Body */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 text-[#0F2747]">
        {/* STEP 1: PERSONAL & CONTACT */}
        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                  {isVi ? "Họ và tên đầy đủ *" : "Full Name *"}
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder={isVi ? "Ví dụ: Nguyễn Minh Anh" : "e.g. Alex Nguyen"}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-slate-50 border-2 border-slate-300 focus:border-[#0F2747] text-xs font-semibold focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                  {isVi ? "Địa chỉ Email liên hệ *" : "Contact Email *"}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="student@school.edu.vn"
                  className="w-full px-3.5 py-2.5 rounded-sm bg-slate-50 border-2 border-slate-300 focus:border-[#0F2747] text-xs font-semibold focus:outline-none transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                  {isVi ? "Tên tài khoản Discord *" : "Discord Username *"}
                </label>
                <input
                  type="text"
                  required
                  value={formData.discordTag}
                  onChange={(e) => setFormData({ ...formData, discordTag: e.target.value })}
                  placeholder="username hoặc @tag"
                  className="w-full px-3.5 py-2.5 rounded-sm bg-slate-50 border-2 border-slate-300 focus:border-[#0F2747] text-xs font-semibold focus:outline-none transition"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  {isVi ? "Dùng để liên hệ phỏng vấn và gán role Tutor" : "Used for Discord interview and role setup"}
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                  {isVi ? "Số điện thoại / Zalo" : "Phone or Zalo"}
                </label>
                <input
                  type="text"
                  value={formData.phoneOrZalo}
                  onChange={(e) => setFormData({ ...formData, phoneOrZalo: e.target.value })}
                  placeholder="09xx xxx xxx"
                  className="w-full px-3.5 py-2.5 rounded-sm bg-slate-50 border-2 border-slate-300 focus:border-[#0F2747] text-xs font-semibold focus:outline-none transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                  {isVi ? "Trường học hiện tại *" : "Current School *"}
                </label>
                <input
                  type="text"
                  required
                  value={formData.school}
                  onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                  placeholder={isVi ? "THPT Chuyên Lê Hồng Phong, VNU, ..." : "High School or University"}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-slate-50 border-2 border-slate-300 focus:border-[#0F2747] text-xs font-semibold focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                  {isVi ? "Khối lớp / Năm học *" : "Grade / Year *"}
                </label>
                <select
                  value={formData.gradeOrYear}
                  onChange={(e) => setFormData({ ...formData, gradeOrYear: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-slate-50 border-2 border-slate-300 focus:border-[#0F2747] text-xs font-semibold focus:outline-none transition"
                >
                  <option value="Lớp 10">Lớp 10 (Grade 10)</option>
                  <option value="Lớp 11">Lớp 11 (Grade 11)</option>
                  <option value="Lớp 12">Lớp 12 (Grade 12)</option>
                  <option value="Đại học">Sinh viên Đại học (Undergraduate)</option>
                  <option value="Gap Year">Gap Year</option>
                </select>
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-sm bg-[#0F2747] hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer"
              >
                <span>{isVi ? "Tiếp theo: Chọn môn chuyên môn" : "Next: Subject Expertise"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: ACADEMIC CREDENTIALS & SUBJECTS */}
        {step === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2">
                {isVi ? "Môn học thế mạnh đăng ký phụ trách chính *" : "Primary Subject Expertise *"}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {subjectOptions.map((subj) => (
                  <button
                    key={subj.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, primarySubject: subj.id })}
                    className={`p-3 rounded-sm text-left border-2 transition cursor-pointer flex items-center justify-between text-xs ${
                      formData.primarySubject === subj.id
                        ? "bg-amber-100/70 border-[#0F2747] font-black text-[#0F2747]"
                        : "bg-slate-50 border-slate-300 hover:border-slate-400 font-semibold text-slate-700"
                    }`}
                  >
                    <span>{isVi ? subj.labelVi : subj.labelEn}</span>
                    {formData.primarySubject === subj.id && <CheckCircle2 className="w-4 h-4 text-[#0F2747]" />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                {isVi ? "Điểm số hoặc thành tích chứng minh năng lực *" : "Scores or Academic Honors *"}
              </label>
              <input
                type="text"
                required
                value={formData.scoreOrCredential}
                onChange={(e) => setFormData({ ...formData, scoreOrCredential: e.target.value })}
                placeholder={isVi ? "Ví dụ: IELTS 8.0 (Writing 7.5), SAT 1520 (Math 800), Giải Ba HSG Tỉnh..." : "e.g. IELTS 8.0, SAT 1520, Math Olympiad..."}
                className="w-full px-3.5 py-2.5 rounded-sm bg-slate-50 border-2 border-slate-300 focus:border-[#0F2747] text-xs font-semibold focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                {isVi ? "Kinh nghiệm giảng dạy / chữa bài trước đây (nếu có)" : "Prior Tutoring or Peer-Learning Experience"}
              </label>
              <textarea
                rows={3}
                value={formData.tutoringExperience}
                onChange={(e) => setFormData({ ...formData, tutoringExperience: e.target.value })}
                placeholder={isVi ? "Đã từng kèm bạn bè ôn thi, lập nhóm học tập tại trường, viết tài liệu ôn tập..." : "Describe any study groups, tutoring, or study guides you have created..."}
                className="w-full px-3.5 py-2.5 rounded-sm bg-slate-50 border-2 border-slate-300 focus:border-[#0F2747] text-xs font-semibold focus:outline-none transition"
              />
            </div>

            <div className="pt-3 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-[#0F2747] text-xs font-bold transition"
              >
                {isVi ? "← Quay lại" : "← Back"}
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-sm bg-[#0F2747] hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer"
              >
                <span>{isVi ? "Tiếp theo: Lịch rảnh & Cam kết" : "Next: Availability & Honor Code"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SCHEDULE & HONOR CODE */}
        {step === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                  {isVi ? "Thời gian cam kết đóng góp hàng tuần" : "Weekly Time Commitment"}
                </label>
                <select
                  value={formData.weeklyHours}
                  onChange={(e) => setFormData({ ...formData, weeklyHours: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-slate-50 border-2 border-slate-300 focus:border-[#0F2747] text-xs font-semibold focus:outline-none transition"
                >
                  <option value="1-2 giờ/tuần">1-2 giờ/tuần (Mở 1 buổi/tuần)</option>
                  <option value="2-4 giờ/tuần">2-4 giờ/tuần (Đề xuất chuẩn)</option>
                  <option value="4+ giờ/tuần">4+ giờ/tuần (Phụ trách Flagship Cohort)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                  {isVi ? "Khung ngày rảnh thường lệ" : "Preferred Active Days"}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {["Thứ 2", "Thứ 4", "Thứ 6", "Thứ 7", "Chủ nhật"].map((day) => {
                    const active = formData.availabilityDays.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleToggleDay(day)}
                        className={`px-3 py-1.5 rounded-xs text-xs font-bold border transition cursor-pointer ${
                          active
                            ? "bg-[#0F2747] text-white border-[#0F2747]"
                            : "bg-slate-100 text-slate-700 border-slate-300 hover:border-slate-400"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                {isVi ? "Lý do bạn muốn tham gia The Pencily? *" : "Why do you want to join The Pencily? *"}
              </label>
              <textarea
                rows={3}
                required
                value={formData.motivation}
                onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                placeholder={isVi ? "Chia sẻ ngắn gọn điều thúc đẩy bạn đồng hành cùng các bạn học sinh..." : "Briefly tell us what motivates you to share knowledge..."}
                className="w-full px-3.5 py-2.5 rounded-sm bg-slate-50 border-2 border-slate-300 focus:border-[#0F2747] text-xs font-semibold focus:outline-none transition"
              />
            </div>

            {/* Honor Code & Equity Agreement */}
            <div className="p-4 rounded-md bg-amber-50/70 border-2 border-amber-300 space-y-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasAgreedHonorCode}
                  onChange={(e) => setFormData({ ...formData, hasAgreedHonorCode: e.target.checked })}
                  className="mt-0.5 w-4 h-4 rounded-xs border-2 border-[#0F2747] text-[#0F2747] focus:ring-0 cursor-pointer"
                />
                <span className="text-xs font-semibold text-[#0F2747] leading-relaxed">
                  {isVi
                    ? "Tôi cam kết tham gia với tinh thần học tập bình đẳng, phi lợi nhuận, kiên nhẫn hỗ trợ học sinh và tuân thủ quy chuẩn phòng học văn minh (Safety & Honor Code) của The Pencily."
                    : "I commit to non-profit educational equity, respectful mentorship, and upholding The Pencily Safety & Honor Code."}
                </span>
              </label>
            </div>

            <div className="pt-3 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-[#0F2747] text-xs font-bold transition"
              >
                {isVi ? "← Quay lại" : "← Back"}
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !formData.hasAgreedHonorCode}
                className="inline-flex items-center gap-2 px-7 py-2.5 rounded-sm bg-[#FFC83D] hover:bg-[#f3bd30] text-[#0F2747] font-black text-xs shadow-xs border-2 border-[#0F2747] transition active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? (isVi ? "Đang gửi đơn..." : "Submitting...") : (isVi ? "Hoàn tất & Gửi Đơn Ứng Tuyển" : "Submit Tutor Application")}</span>
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
