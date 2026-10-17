"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { usePencily } from "@/context/PencilyContext";
import { Logo } from "@/components/Logo";
import { User, GraduationCap, Building2, ArrowRight, Check, CheckCircle2, BookOpen, HelpCircle, Award, ChevronLeft, Languages } from "lucide-react";

const GRADES_VI = ["Lớp 10", "Lớp 11", "Lớp 12", "Đại học / Khác"];
const GRADES_EN = ["Grade 10", "Grade 11", "Grade 12", "College / Other"];

const SUBJECT_OPTIONS = [
  { id: "toan", nameVi: "Toán học", nameEn: "Mathematics", icon: "📐" },
  { id: "ly", nameVi: "Vật lý", nameEn: "Physics", icon: "⚡" },
  { id: "hoa", nameVi: "Hóa học", nameEn: "Chemistry", icon: "🧪" },
  { id: "sinh", nameVi: "Sinh học", nameEn: "Biology", icon: "🧬" },
  { id: "van", nameVi: "Ngữ văn", nameEn: "Literature", icon: "📖" },
  { id: "anh", nameVi: "Tiếng Anh IELTS & SAT", nameEn: "English (IELTS / SAT)", icon: "🌍" },
  { id: "dgnl", nameVi: "ĐGNL ĐHQG", nameEn: "National Univ Competency", icon: "🎯" },
  { id: "tin", nameVi: "Tin học / Lập trình", nameEn: "Computer Science", icon: "💻" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { user, completeProfile, updateUser, language, setLanguage, backendAuthenticated } = usePencily();

  // Current onboarding step: 1 (Name & Display) -> 2 (School & Grade) -> 3 (Subjects & Goal) -> 4 (Finished)
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

  // Sync with user context and skip completed steps
  React.useEffect(() => {
    if (user.realName || (user.name !== "Học sinh Pencily" && !user.name.includes("#"))) {
      setRealName(user.realName || user.name);
    }
    if (user.school && user.school !== "Chưa cập nhật") {
      setSchool(user.school);
    }
    if (user.grade && user.grade !== "Học sinh") {
      setGrade(user.grade);
    }
    if (
      user.school &&
      user.school !== "Chưa cập nhật" &&
      (user.realName || (user.name !== "Học sinh Pencily" && !user.name.includes("#")))
    ) {
      setStep((prev) => (prev < 3 ? 3 : prev));
    }
  }, [user]);

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
        setErrorMessage(
          language === "vi"
            ? "Vui lòng nhập Họ và tên của bạn để tiếp tục."
            : "Please enter your full name to proceed."
        );
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!school.trim()) {
        setErrorMessage(
          language === "vi"
            ? "Vui lòng nhập tên trường THPT bạn đang theo học."
            : "Please enter your high school or institution name."
        );
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
          role:
            language === "vi"
              ? "Ứng viên Peer Tutor: The Pencily"
              : "Peer Tutor Candidate: The Pencily",
        });
      }

      setStep(4);
    }
  };

  const handleFinish = () => {
    router.push("/dashboard");
  };

  const gradesList = language === "vi" ? GRADES_VI : GRADES_EN;

  return (
    <div className="min-h-screen bg-[#FFF9EF] text-[#0F2747] flex flex-col justify-between selection:bg-[#FFC83D]/30">
      {/* Top Header */}
      <header className="max-w-4xl w-full mx-auto px-6 py-6 sm:py-8 flex items-center justify-between">
        <Link href="/" className="inline-block" title={language === "vi" ? "Về trang chủ" : "Back to Home"}>
          <Logo variant="nav" size="sm" />
        </Link>

        {/* Step indicator + Language Switcher */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-white px-3 py-1.5 rounded-sm border-2 border-slate-300">
            <span className="text-[#4F7ECB]">
              {language === "vi" ? `Bước ${step}/3` : `Step ${step}/3`}
            </span>
            <span className="text-slate-300">/</span>
            <span>{language === "vi" ? "Thiết lập hồ sơ" : "Profile Setup"}</span>
          </div>

          <button
            type="button"
            onClick={() => setLanguage(language === "vi" ? "en" : "vi")}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm bg-white hover:bg-slate-50 text-xs font-bold text-[#0F2747] border-2 border-slate-300 cursor-pointer transition shadow-2xs"
            title="Đổi ngôn ngữ / Change language"
          >
            <Languages className="w-3.5 h-3.5 text-[#4F7ECB]" />
            <span>{language === "vi" ? "EN" : "VI"}</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-2xl w-full mx-auto px-6 py-4 flex-1 flex flex-col justify-center">
        <div className="bg-white rounded-md p-7 sm:p-10 border-2 border-slate-300 shadow-sm relative">
          {/* Guest prompt if not authenticated */}
          {!backendAuthenticated && (
            <div className="mb-6 p-3 bg-amber-50 rounded-sm border-2 border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <span className="text-amber-900 font-medium">
                {language === "vi"
                  ? "Bạn đang điền hồ sơ ở chế độ Khách. Hãy tạo tài khoản học sinh để lưu trữ vĩnh viễn và nhận chứng nhận!"
                  : "You are setting up a guest profile. Create a student account to save permanently and receive credentials!"}
              </span>
              <Link
                href="/signin?mode=register"
                className="px-3 py-1.5 rounded-xs bg-[#0F2747] hover:bg-slate-800 text-white font-bold text-[11px] whitespace-nowrap self-start sm:self-auto transition cursor-pointer"
              >
                {language === "vi" ? "Tạo tài khoản học sinh →" : "Create account →"}
              </Link>
            </div>
          )}

          {/* Owl Mascot Lockup at top */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b-2 border-slate-100">
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
              <div className="text-xs font-black uppercase tracking-wider text-[#4F7ECB]">
                {language === "vi" ? "Cú Pencily Đồng Hành" : "Pencily Owl Companion"}
              </div>
              <h1 className="font-poppins font-black text-xl sm:text-2xl text-[#0F2747] mt-0.5 leading-snug">
                {step === 1 &&
                  (language === "vi"
                    ? "Chào bạn mới! Chúng mình xưng hô thế nào?"
                    : "Welcome! How should we address you?")}
                {step === 2 &&
                  (language === "vi"
                    ? "Bạn đang học trường nào & khối mấy?"
                    : "Which school & grade are you in?")}
                {step === 3 &&
                  (language === "vi"
                    ? "Môn học bạn quan tâm & Vai trò mong muốn"
                    : "Your Interests & Desired Role")}
                {step === 4 &&
                  (language === "vi"
                    ? "Tuyệt vời! Hồ sơ của bạn đã sẵn sàng 🎉"
                    : "Awesome! Your profile is ready 🎉")}
              </h1>
              <p className="text-xs sm:text-sm text-[#475569] mt-1 leading-relaxed">
                {step === 1 &&
                  (language === "vi"
                    ? "Hồ sơ giúp các bạn học và peer tutor dễ dàng nhận diện và trao đổi trong phòng học."
                    : "Your profile helps study peers and peer tutors connect with you in study rooms.")}
                {step === 2 &&
                  (language === "vi"
                    ? "The Pencily kết nối học sinh khắp các trường THPT để cùng nhau chia sẻ tài liệu."
                    : "The Pencily connects students across high schools to collaborate and exchange study materials.")}
                {step === 3 &&
                  (language === "vi"
                    ? "Chúng mình sẽ ưu tiên hiển thị các lớp học và kênh thảo luận phù hợp nhất với bạn."
                    : "We will tailor recommended classes and discussions to your focus areas.")}
                {step === 4 &&
                  (language === "vi"
                    ? "Chào mừng bạn chính thức gia nhập cộng đồng học tập mở The Pencily!"
                    : "Welcome to The Pencily open learning community!")}
              </p>
            </div>
          </div>

          {/* Error notice */}
          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-sm bg-red-50 border-2 border-red-300 text-xs font-semibold text-red-700">
              {errorMessage}
            </div>
          )}

          {/* STEP 1: Name & Display Name */}
          {step === 1 && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1.5">
                  {language === "vi" ? "Họ và tên thật của bạn *" : "Your Full Real Name *"}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    autoFocus
                    placeholder={language === "vi" ? "Ví dụ: Nguyễn Hoàng Minh" : "e.g. Alex Johnson"}
                    value={realName}
                    onChange={(e) => setRealName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-sm border-2 border-slate-300 bg-white text-sm text-[#0F2747] font-medium focus:outline-none focus:border-[#0F2747]"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  {language === "vi"
                    ? "Được dùng để ghi nhận giấy chứng nhận cống hiến & bảo đảm môi trường văn minh."
                    : "Used for official certificates and community accountability."}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider">
                    {language === "vi"
                      ? "Tên hiển thị trong phòng học"
                      : "Display Name in Study Rooms"}
                  </label>
                  <span className="text-[10px] text-slate-400 font-semibold">
                    {language === "vi" ? "Tối đa 9 ký tự" : "Max 9 chars"}
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={9}
                  placeholder={defaultDisplayName || (language === "vi" ? "Ví dụ: Minh" : "e.g. Alex")}
                  value={customDisplayName}
                  onChange={(e) => setCustomDisplayName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-sm border-2 border-slate-300 bg-white text-sm text-[#0F2747] font-medium focus:outline-none focus:border-[#0F2747]"
                />
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1.5">
                  <span>
                    {language === "vi" ? "Hiển thị trên bảng thành viên: " : "Shown on member list: "}
                    <b>{effectiveDisplayName || (language === "vi" ? "(Chưa nhập)" : "(Not set)")}</b>
                  </span>
                  <span>{(customDisplayName || defaultDisplayName).length}/9</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1.5">
                  {language === "vi" ? "Độ tuổi" : "Age"}
                </label>
                <input
                  type="number"
                  min={12}
                  max={25}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-28 px-4 py-2.5 rounded-sm border-2 border-slate-300 bg-white text-sm text-[#0F2747] font-medium focus:outline-none focus:border-[#0F2747]"
                />
              </div>
            </div>
          )}

          {/* STEP 2: School & Grade */}
          {step === 2 && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-1.5">
                  {language === "vi" ? "Trường bạn đang học *" : "School / Institution *"}
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    autoFocus
                    placeholder={
                      language === "vi"
                        ? "Ví dụ: THPT Gia Định, THPT Chuyên Lê Hồng Phong..."
                        : "e.g. Hanoi - Amsterdam, Le Hong Phong High School..."
                    }
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-sm border-2 border-slate-300 bg-white text-sm text-[#0F2747] font-medium focus:outline-none focus:border-[#0F2747]"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  {language === "vi"
                    ? "Giúp tìm kiếm bạn bè cùng trường hoặc các bạn cùng chung chương trình ôn tập."
                    : "Helps you find peers from the same school or matching curricula."}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-2">
                  {language === "vi" ? "Khối lớp hiện tại" : "Current Grade"}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {gradesList.map((g) => {
                    const isSelected = grade === g;
                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGrade(g)}
                        className={`py-3 px-3 rounded-sm text-xs font-bold transition-all text-center cursor-pointer border-2 ${
                          isSelected
                            ? "bg-white text-[#0F2747] border-[#0F2747] shadow-2xs"
                            : "bg-white text-slate-600 border-slate-300 hover:border-slate-400"
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
                  {language === "vi"
                    ? "Môn học bạn quan tâm (chọn các môn bạn muốn học hoặc chia sẻ)"
                    : "Subjects of Interest (select all you wish to study or share)"}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {SUBJECT_OPTIONS.map((sub) => {
                    const isSelected = selectedSubjects.includes(sub.id);
                    const name = language === "vi" ? sub.nameVi : sub.nameEn;
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => toggleSubject(sub.id)}
                        className={`p-2.5 rounded-sm text-xs font-bold transition-all text-left flex items-center gap-2 cursor-pointer border-2 ${
                          isSelected
                            ? "bg-white text-[#0F2747] border-[#0F2747] shadow-2xs"
                            : "bg-white text-slate-600 border-slate-300 hover:border-slate-400"
                        }`}
                      >
                        <span className="text-base">{sub.icon}</span>
                        <span className="truncate">{name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider mb-2">
                  {language === "vi" ? "Mục tiêu ban đầu của bạn tại The Pencily" : "Your Initial Goal at The Pencily"}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRoleIntent("learner")}
                    className={`p-4 rounded-sm border-2 text-left cursor-pointer transition ${
                      roleIntent === "learner"
                        ? "bg-white text-[#0F2747] border-[#0F2747] shadow-2xs"
                        : "bg-white text-slate-600 border-slate-300 hover:border-slate-400"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-sm text-[#0F2747] mb-1">
                      <GraduationCap className="w-4 h-4 text-[#4F7ECB]" />
                      <span>{language === "vi" ? "Học viên" : "Learner"}</span>
                    </div>
                    <p className="text-[11px] text-[#64748B] leading-relaxed">
                      {language === "vi"
                        ? "Tham gia các lớp bootcamp, tải tài liệu, hỏi bài khi gặp câu hỏi khó và học nhóm mỗi tối."
                        : "Join bootcamps, download notes, ask tough questions and join nightly study rooms."}
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRoleIntent("tutor_candidate")}
                    className={`p-4 rounded-sm border-2 text-left cursor-pointer transition ${
                      roleIntent === "tutor_candidate"
                        ? "bg-white text-[#0F2747] border-[#0F2747] shadow-2xs"
                        : "bg-white text-slate-600 border-slate-300 hover:border-slate-400"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-sm text-[#0F2747] mb-1">
                      <Award className="w-4 h-4 text-amber-600" />
                      <span>{language === "vi" ? "Muốn thử sức làm Tutor" : "Peer Tutor Candidate"}</span>
                    </div>
                    <p className="text-[11px] text-[#64748B] leading-relaxed">
                      {language === "vi"
                        ? "Chia sẻ kiến thức môn học thế mạnh, rèn luyện kỹ năng truyền đạt và xây dựng Portfolio cống hiến."
                        : "Share academic strengths, hone communication skills and build your service portfolio."}
                    </p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Success / Welcome Card */}
          {step === 4 && (
            <div className="space-y-6 text-center py-4 animate-scaleUp">
              <div className="w-16 h-16 rounded-sm bg-emerald-50 text-emerald-600 border-2 border-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h3 className="font-poppins font-black text-2xl text-[#0F2747]">
                  {language === "vi" ? `Chào mừng ${effectiveDisplayName}!` : `Welcome, ${effectiveDisplayName}!`}
                </h3>
                <p className="text-sm text-[#475569] mt-1.5 max-w-md mx-auto leading-relaxed">
                  {language === "vi" ? (
                    <>
                      Hồ sơ học sinh tại <b>{school}</b> ({grade}) đã được lưu thành công. Bạn đã sẵn sàng khám phá các lớp học và diễn đàn của The Pencily.
                    </>
                  ) : (
                    <>
                      Profile for <b>{school}</b> ({grade}) saved successfully. You are ready to explore classes and community spaces on The Pencily.
                    </>
                  )}
                </p>
              </div>

              {/* Profile Card Preview */}
              <div className="max-w-sm mx-auto p-4 rounded-sm bg-[#FAF7F2] border-2 border-slate-300 text-left space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-sm bg-[#0F2747] text-white flex items-center justify-center font-bold text-sm border-2 border-slate-300">
                    {effectiveDisplayName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#0F2747]">{realName}</div>
                    <div className="text-[11px] text-[#64748B]">{school} • {grade}</div>
                  </div>
                </div>
                <div className="text-[11px] font-semibold text-[#4F7ECB] pt-1 border-t-2 border-slate-200">
                  {roleIntent === "tutor_candidate"
                    ? language === "vi" ? "Ứng viên Peer Tutor" : "Peer Tutor Candidate"
                    : language === "vi" ? "Học viên The Pencily" : "Pencily Learner"}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleFinish}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] border-2 border-slate-300 hover:border-slate-400 font-bold text-sm shadow-2xs transition active:scale-98 cursor-pointer"
                >
                  <span>{language === "vi" ? "Bắt đầu vào Dashboard học tập" : "Go to Study Dashboard"}</span>
                  <ArrowRight className="w-4 h-4 text-[#4F7ECB]" />
                </button>
              </div>
            </div>
          )}

          {/* Action buttons (Steps 1, 2, 3) */}
          {step < 4 && (
            <div className="flex items-center justify-between gap-3 pt-6 mt-6 border-t-2 border-slate-100">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage(null);
                    setStep((prev) => (prev - 1) as any);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-sm border-2 border-slate-300 text-xs font-bold text-slate-600 hover:text-[#0F2747] hover:bg-slate-50 transition cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{language === "vi" ? "Quay lại" : "Back"}</span>
                </button>
              ) : (
                <Link
                  href="/dashboard"
                  className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition"
                >
                  {language === "vi" ? "Bỏ qua lúc này" : "Skip for now"}
                </Link>
              )}

              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] border-2 border-slate-300 hover:border-slate-400 font-bold text-sm shadow-2xs transition active:scale-98 cursor-pointer"
              >
                <span>
                  {step === 3
                    ? language === "vi" ? "Hoàn tất hồ sơ" : "Complete Profile"
                    : language === "vi" ? "Tiếp tục" : "Continue"}
                </span>
                <ArrowRight className="w-4 h-4 text-[#4F7ECB]" />
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl w-full mx-auto px-6 py-6 text-center text-xs text-slate-400">
        {language === "vi"
          ? "The Pencily: Môi trường học tập bình đẳng, 100% phi lợi nhuận"
          : "The Pencily: Equal education access, 100% non-profit"}
      </footer>
    </div>
  );
}
