"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { usePencily } from "@/context/PencilyContext";
import { Logo } from "@/components/Logo";
import {
  User,
  GraduationCap,
  Building2,
  Sparkles,
  ArrowRight,
  Check,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  Award,
  ChevronLeft,
} from "lucide-react";

const GRADES = ["Lớp 10", "Lớp 11", "Lớp 12", "Đại học / Khác"];

const SUBJECT_OPTIONS = [
  { id: "toan", name: "Toán học", icon: "📐" },
  { id: "ly", name: "Vật lý", icon: "⚡" },
  { id: "hoa", name: "Hóa học", icon: "🧪" },
  { id: "sinh", name: "Sinh học", icon: "🧬" },
  { id: "van", name: "Ngữ văn", icon: "📖" },
  { id: "anh", name: "Tiếng Anh (IELTS/SAT)", icon: "🌍" },
  { id: "dgnl", name: "ĐGNL ĐHQG", icon: "🎯" },
  { id: "tin", name: "Tin học / Lập trình", icon: "💻" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { user, completeProfile, updateUser } = usePencily();

  // Current onboarding step: 1 (Họ tên & Danh tính) -> 2 (Trường & Khối lớp) -> 3 (Môn học & Mục tiêu) -> 4 (Hoàn tất)
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [realName, setRealName] = useState(
    user.realName || (user.name !== "Học sinh Pencily" && !user.name.includes("#") ? user.name : "")
  );
  const [customDisplayName, setCustomDisplayName] = useState<string>("");
  const [age, setAge] = useState(user.age ? String(user.age) : "17");
  const [school, setSchool] = useState(user.school !== "Chưa cập nhật" ? user.school : "");
  const [grade, setGrade] = useState(user.grade !== "Học sinh" ? user.grade : "Lớp 11");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(["toan", "anh"]);
  const [roleIntent, setRoleIntent] = useState<"learner" | "tutor_candidate">("learner");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Derive default given name
  const getGivenName = (fullName: string) => {
    if (!fullName) return "";
    const parts = fullName.trim().split(/\s+/).filter(Boolean);
    return parts.length > 0 ? parts[parts.length - 1] : "";
  };

  const defaultDisplayName = getGivenName(realName);
  const effectiveDisplayName = (customDisplayName.trim() || defaultDisplayName).slice(0, 9);

  // Toggle subject selection
  const toggleSubject = (id: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  // Handle Next button per step
  const handleNextStep = () => {
    setErrorMessage(null);

    if (step === 1) {
      const trimmed = realName.trim();
      if (!trimmed || trimmed.length < 2) {
        setErrorMessage("Vui lòng nhập Họ và tên của bạn để tiếp tục.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!school.trim()) {
        setErrorMessage("Vui lòng nhập tên trường THPT bạn đang theo học.");
        return;
      }
      setStep(3);
    } else if (step === 3) {
      // Save everything to profile
      completeProfile({
        realName: realName.trim(),
        displayName: effectiveDisplayName || undefined,
        age: age ? Number(age) : 17,
        school: school.trim(),
        grade,
      });

      if (roleIntent === "tutor_candidate") {
        updateUser({
          role: "Ứng viên Peer Tutor • The Pencily Gen 1.0",
        });
      }

      setStep(4);
    }
  };

  const handleFinish = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#FFF9EF] text-[#0F2747] flex flex-col justify-between selection:bg-[#FFC83D]/30">
      {/* Top Header */}
      <header className="max-w-4xl w-full mx-auto px-6 py-6 sm:py-8 flex items-center justify-between">
        <Link href="/" className="inline-block" title="Về trang chủ">
          <Logo variant="nav" size="sm" />
        </Link>

        {/* Step indicator (clean text, no dots) */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <span className="text-[#4F7ECB]">Bước {step}/3</span>
          <span className="text-slate-300">/</span>
          <span>Thiết lập hồ sơ</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-2xl w-full mx-auto px-6 py-4 flex-1 flex flex-col justify-center">
        <div className="bg-white rounded-3xl p-7 sm:p-10 border border-slate-200/80 shadow-sm relative">
          {/* Owl Mascot Lockup at top */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0">
              <Image
                src="/brand/mascot-owl.png"
                alt="Cú Pencily"
                width={419}
                height={439}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold uppercase tracking-wider text-[#4F7ECB]">
                Cú Pencily Đồng Hành
              </div>
              <h1 className="font-poppins font-black text-xl sm:text-2xl text-[#0F2747] mt-0.5 leading-snug">
                {step === 1 && "Chào bạn mới! Chúng mình xưng hô thế nào?"}
                {step === 2 && "Bạn đang học trường nào & khối mấy?"}
                {step === 3 && "Môn học bạn quan tâm & Vai trò mong muốn"}
                {step === 4 && "Tuyệt vời! Hồ sơ của bạn đã sẵn sàng 🎉"}
              </h1>
              <p className="text-xs sm:text-sm text-[#475569] mt-1 leading-relaxed">
                {step === 1 && "Hồ sơ giúp các bạn học và peer tutor dễ dàng nhận diện và trao đổi trong phòng học."}
                {step === 2 && "The Pencily kết nối học sinh khắp các trường THPT để cùng nhau chia sẻ tài liệu."}
                {step === 3 && "Chúng mình sẽ ưu tiên hiển thị các lớp học và kênh thảo luận phù hợp nhất với bạn."}
                {step === 4 && "Chào mừng bạn chính thức gia nhập cộng đồng học tập mở The Pencily Gen 1.0!"}
              </p>
            </div>
          </div>

          {/* Error notice */}
          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-700">
              {errorMessage}
            </div>
          )}

          {/* STEP 1: Name & Display Name */}
          {step === 1 && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1.5">
                  Họ và tên thật của bạn *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    autoFocus
                    placeholder="Ví dụ: Nguyễn Hoàng Minh"
                    value={realName}
                    onChange={(e) => setRealName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-[#0F2747] font-medium focus:outline-none focus:border-[#0F2747] focus:ring-1 focus:ring-[#0F2747]"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Được dùng để ghi nhận giấy chứng nhận cống hiến & bảo đảm môi trường văn minh.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider">
                    Tên hiển thị trong phòng học (Nickname)
                  </label>
                  <span className="text-[10px] text-slate-400 font-semibold">
                    Tối đa 9 ký tự
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={9}
                  placeholder={defaultDisplayName || "Ví dụ: Minh"}
                  value={customDisplayName}
                  onChange={(e) => setCustomDisplayName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-[#0F2747] font-medium focus:outline-none focus:border-[#0F2747]"
                />
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1.5">
                  <span>
                    Hiển thị trên bảng thành viên: <b>{effectiveDisplayName || "(Chưa nhập)"}</b>
                  </span>
                  <span>{(customDisplayName || defaultDisplayName).length}/9</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1.5">
                  Độ tuổi
                </label>
                <input
                  type="number"
                  min={12}
                  max={25}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-28 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-[#0F2747] font-medium focus:outline-none focus:border-[#0F2747]"
                />
              </div>
            </div>
          )}

          {/* STEP 2: School & Grade */}
          {step === 2 && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1.5">
                  Trường bạn đang học *
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    autoFocus
                    placeholder="Ví dụ: THPT Gia Định, THPT Chuyên Lê Hồng Phong..."
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-[#0F2747] font-medium focus:outline-none focus:border-[#0F2747] focus:ring-1 focus:ring-[#0F2747]"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Giúp tìm kiếm bạn bè cùng trường hoặc các bạn cùng chung chương trình ôn tập.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-2">
                  Khối lớp hiện tại
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {GRADES.map((g) => {
                    const isSelected = grade === g;
                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGrade(g)}
                        className={`py-3 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer border ${
                          isSelected
                            ? "bg-white text-[#0F2747] border-2 border-[#0F2747] shadow-2xs"
                            : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        {g}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Subjects & Role Intent */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-2">
                  Môn học bạn quan tâm (chọn các môn bạn muốn học hoặc chia sẻ)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {SUBJECT_OPTIONS.map((sub) => {
                    const isSelected = selectedSubjects.includes(sub.id);
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => toggleSubject(sub.id)}
                        className={`p-2.5 rounded-xl text-xs font-bold transition-all text-left flex items-center gap-2 cursor-pointer border ${
                          isSelected
                            ? "bg-white text-[#0F2747] border-2 border-[#0F2747] shadow-2xs"
                            : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <span className="text-base">{sub.icon}</span>
                        <span className="truncate">{sub.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-2">
                  Mục tiêu ban đầu của bạn tại The Pencily
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRoleIntent("learner")}
                    className={`p-4 rounded-2xl border text-left cursor-pointer transition ${
                      roleIntent === "learner"
                        ? "bg-white text-[#0F2747] border-2 border-[#0F2747] shadow-2xs"
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-sm text-[#0F2747] mb-1">
                      <GraduationCap className="w-4 h-4 text-[#4F7ECB]" />
                      <span>Học viên (Learner)</span>
                    </div>
                    <p className="text-[11px] text-[#64748B] leading-relaxed">
                      Tham gia các lớp bootcamp, tải tài liệu, hỏi bài khi gặp câu hỏi khó và học nhóm mỗi tối.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRoleIntent("tutor_candidate")}
                    className={`p-4 rounded-2xl border text-left cursor-pointer transition ${
                      roleIntent === "tutor_candidate"
                        ? "bg-white text-[#0F2747] border-2 border-[#0F2747] shadow-2xs"
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-sm text-[#0F2747] mb-1">
                      <Award className="w-4 h-4 text-amber-600" />
                      <span>Muốn thử sức làm Tutor</span>
                    </div>
                    <p className="text-[11px] text-[#64748B] leading-relaxed">
                      Chia sẻ kiến thức môn học thế mạnh, rèn luyện kỹ năng truyền đạt và xây dựng Portfolio cống hiến.
                    </p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Success / Welcome Card */}
          {step === 4 && (
            <div className="space-y-6 text-center py-4 animate-scaleUp">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h3 className="font-poppins font-black text-2xl text-[#0F2747]">
                  Chào mừng {effectiveDisplayName}!
                </h3>
                <p className="text-sm text-[#475569] mt-1.5 max-w-md mx-auto leading-relaxed">
                  Hồ sơ học sinh tại <b>{school}</b> ({grade}) đã được lưu thành công. Bạn đã sẵn sàng khám phá các lớp học và diễn đàn của The Pencily.
                </p>
              </div>

              {/* Profile Card Preview */}
              <div className="max-w-sm mx-auto p-4 rounded-2xl bg-[#FAF7F2] border border-slate-200/80 text-left space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0F2747] text-white flex items-center justify-center font-bold text-sm">
                    {effectiveDisplayName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#0F2747]">{realName}</div>
                    <div className="text-[11px] text-[#64748B]">{school} • {grade}</div>
                  </div>
                </div>
                <div className="text-[11px] font-semibold text-[#4F7ECB] pt-1 border-t border-slate-200/60">
                  {roleIntent === "tutor_candidate" ? "Ứng viên Peer Tutor Gen 1.0" : "Học viên The Pencily Gen 1.0"}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleFinish}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#0F2747] border border-slate-300 hover:border-slate-400 font-bold text-sm shadow-2xs transition active:scale-98 cursor-pointer"
                >
                  <span>Bắt đầu vào Dashboard học tập</span>
                  <ArrowRight className="w-4 h-4 text-[#4F7ECB]" />
                </button>
              </div>
            </div>
          )}

          {/* Action buttons (Steps 1, 2, 3) */}
          {step < 4 && (
            <div className="flex items-center justify-between gap-3 pt-6 mt-6 border-t border-slate-100">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage(null);
                    setStep((prev) => (prev - 1) as any);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-[#0F2747] hover:bg-slate-50 transition cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Quay lại</span>
                </button>
              ) : (
                <Link
                  href="/dashboard"
                  className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition"
                >
                  Bỏ qua lúc này
                </Link>
              )}

              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-white hover:bg-slate-50 text-[#0F2747] border border-slate-300 hover:border-slate-400 font-bold text-sm shadow-2xs transition active:scale-98 cursor-pointer"
              >
                <span>{step === 3 ? "Hoàn tất hồ sơ" : "Tiếp tục"}</span>
                <ArrowRight className="w-4 h-4 text-[#4F7ECB]" />
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl w-full mx-auto px-6 py-6 text-center text-xs text-slate-400">
        The Pencily Gen 1.0 • Môi trường học tập bình đẳng, 100% phi lợi nhuận
      </footer>
    </div>
  );
}
