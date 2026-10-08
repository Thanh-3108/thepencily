"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { DiscordLogo } from "@/components/BrandIcons";
import { usePencily } from "@/context/PencilyContext";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Lock,
  Mail,
  User,
  GraduationCap,
  Building2,
  Eye,
  EyeOff,
} from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const { loginWithCustomDatabase, isLoggedIn } = usePencily();

  // Mode: "signin" | "register"
  const [authMode, setAuthMode] = useState<"signin" | "register">("signin");

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("Lớp 11");

  // Feedback states
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already logged in, show quick redirection button
  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FFF9EF] flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#0F2747]/10 shadow-lg space-y-5 animate-fadeIn">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#57F287]/20 text-[#1f8b4c] flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-[#0F2747]">
            Bạn đã đăng nhập!
          </h2>
          <p className="text-sm text-[#4B5563]">
            Tài khoản The Pencily của bạn hiện đang hoạt động.
          </p>
          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#0F2747] hover:bg-[#1A3E6D] text-white font-bold text-sm shadow-md transition active:scale-98 cursor-pointer"
            >
              Vào Dashboard ngay
            </button>
            <Link
              href="/"
              className="w-full py-3 px-6 rounded-2xl border border-slate-200 text-[#0F2747] hover:bg-slate-50 font-bold text-sm transition cursor-pointer"
            >
              Về Trang chủ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Handle Google / Facebook placeholder click
  const handlePendingProvider = (providerName: string) => {
    setErrorMessage(null);
    setInfoMessage(
      `Cổng đăng nhập ${providerName} đang được hoàn thiện cho phiên bản Public Beta! Hiện tại bạn có thể đăng nhập ngay bằng Discord (có liên kết tự động máy chủ The Pencily) hoặc đăng nhập trực tiếp bằng Database The Pencily bên dưới.`
    );
  };

  // Handle Database Sign In / Sign Up
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setInfoMessage(null);

    if (!email.trim()) {
      setErrorMessage("Vui lòng nhập Email hoặc Tên đăng nhập.");
      return;
    }

    if (!password.trim() || password.length < 6) {
      setErrorMessage("Mật khẩu cần tối thiểu 6 ký tự.");
      return;
    }

    if (authMode === "register" && !fullName.trim()) {
      setErrorMessage("Vui lòng nhập Họ và tên học sinh.");
      return;
    }

    setIsSubmitting(true);

    try {
      const studentName =
        authMode === "register"
          ? fullName.trim()
          : email.split("@")[0].replace(/[._-]/g, " ");

      loginWithCustomDatabase({
        email: email.trim(),
        name: studentName,
        realName: authMode === "register" ? fullName.trim() : undefined,
        school: school.trim() || "The Pencily Academy",
        grade: grade || "Học sinh",
      });

      // Smooth redirect
      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    } catch (err) {
      setErrorMessage("Đã có lỗi xảy ra. Vui lòng thử lại!");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9EF] flex flex-col justify-between selection:bg-[#FFC83D] selection:text-[#0F2747]">
      {/* Top Header */}
      <header className="w-full py-6 px-6 sm:px-12 max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F2747] hover:text-[#4F7ECB] transition group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Trang chủ</span>
        </Link>
        <Link href="/" title="The Pencily">
          <Logo variant="nav" size="md" />
        </Link>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-4">
        <div className="w-full max-w-[480px] bg-white rounded-3xl border border-[#0F2747]/12 shadow-[0_12px_40px_rgba(15,39,71,0.06)] p-6 sm:p-8 space-y-6">
          {/* Header titles */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFC83D]/25 text-[#0F2747] text-xs font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#0F2747]" />
              <span>Cổng học tập The Pencily</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0F2747] tracking-tight">
              {authMode === "signin"
                ? "Chào mừng trở lại!"
                : "Tạo tài khoản học sinh"}
            </h1>
            <p className="text-xs sm:text-sm text-[#4B5563]">
              {authMode === "signin"
                ? "Đăng nhập để vào lớp học trực tuyến, xem lịch và thảo luận"
                : "Tham gia miễn phí cộng đồng học tập do học sinh vì học sinh"}
            </p>
          </div>

          {/* Alert notifications */}
          {infoMessage && (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{infoMessage}</div>
            </div>
          )}

          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>{errorMessage}</div>
            </div>
          )}

          {/* Social Auth Providers */}
          <div className="space-y-3">
            {/* 1. DISCORD (Active OAuth2) */}
            <a
              href="/api/auth/discord"
              className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-sm shadow-sm hover:shadow transition-all active:scale-98 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                  <DiscordLogo className="w-4 h-4 text-white" />
                </div>
                <span>Tiếp tục với Discord</span>
              </div>
              <span className="text-[10px] font-semibold bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Khuyên dùng
              </span>
            </a>

            {/* 2. GOOGLE (Placeholder) */}
            <button
              type="button"
              onClick={() => handlePendingProvider("Google")}
              className="w-full flex items-center justify-between px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 text-[#0F2747] border border-slate-200 font-bold text-sm transition-all active:scale-98 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.94H1.27v3.13C3.25 21.31 7.34 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.26c-.25-.72-.38-1.49-.38-2.26s.13-1.54.38-2.26V6.61H1.27C.46 8.23 0 10.06 0 12s.46 3.77 1.27 5.39l4.01-3.13z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.25 2.69 1.27 6.61l4.01 3.13c.95-2.84 3.6-4.99 6.72-4.99z"
                  />
                </svg>
                <span>Tiếp tục với Google</span>
              </div>
              <span className="text-[10px] text-slate-400 font-normal">
                Sắp ra mắt
              </span>
            </button>

            {/* 3. FACEBOOK (Placeholder) */}
            <button
              type="button"
              onClick={() => handlePendingProvider("Facebook")}
              className="w-full flex items-center justify-between px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 text-[#0F2747] border border-slate-200 font-bold text-sm transition-all active:scale-98 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-[#1877F2] shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Tiếp tục với Facebook</span>
              </div>
              <span className="text-[10px] text-slate-400 font-normal">
                Sắp ra mắt
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
              Hoặc dùng tài khoản Pencily
            </span>
          </div>

          {/* Tabs for Sign in vs Register */}
          <div className="flex p-1 bg-[#FFF9EF] rounded-2xl border border-[#0F2747]/10">
            <button
              type="button"
              onClick={() => {
                setAuthMode("signin");
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
                authMode === "signin"
                  ? "bg-[#0F2747] text-white shadow-2xs"
                  : "text-[#0F2747] hover:bg-black/5"
              }`}
            >
              Đăng nhập
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode("register");
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
                authMode === "register"
                  ? "bg-[#0F2747] text-white shadow-2xs"
                  : "text-[#0F2747] hover:bg-black/5"
              }`}
            >
              Đăng ký mới
            </button>
          </div>

          {/* Database Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === "register" && (
              <>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#0F2747] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#4F7ECB]" />
                    <span>Họ và tên học sinh</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="VD: Nguyễn Nhật Nam"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#0F2747] focus:ring-1 focus:ring-[#0F2747] text-sm text-[#0F2747] placeholder:text-slate-400 transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0F2747] flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#4F7ECB]" />
                      <span>Trường học</span>
                    </label>
                    <input
                      type="text"
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      placeholder="VD: THPT Gia Định"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#0F2747] focus:ring-1 focus:ring-[#0F2747] text-sm text-[#0F2747] placeholder:text-slate-400 transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0F2747] flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-[#4F7ECB]" />
                      <span>Khối lớp</span>
                    </label>
                    <select
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#0F2747] focus:ring-1 focus:ring-[#0F2747] text-sm text-[#0F2747] bg-white transition cursor-pointer"
                    >
                      <option value="Lớp 10">Lớp 10</option>
                      <option value="Lớp 11">Lớp 11</option>
                      <option value="Lớp 12">Lớp 12</option>
                      <option value="Đại học">Đại học / Tự do</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0F2747] flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#4F7ECB]" />
                <span>Email hoặc Tên đăng nhập</span>
              </label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="VD: student@thepencily.org"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#0F2747] focus:ring-1 focus:ring-[#0F2747] text-sm text-[#0F2747] placeholder:text-slate-400 transition"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#0F2747] flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#4F7ECB]" />
                  <span>Mật khẩu</span>
                </label>
                {authMode === "signin" && (
                  <button
                    type="button"
                    onClick={() =>
                      setInfoMessage(
                        "Nếu bạn quên mật khẩu, bạn có thể đăng nhập bằng Discord để phục hồi truy cập tài khoản ngay lập tức."
                      )
                    }
                    className="text-[11px] font-semibold text-[#4F7ECB] hover:underline cursor-pointer"
                  >
                    Quên mật khẩu?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tối thiểu 6 ký tự"
                  className="w-full px-4 py-2.5 pr-10 rounded-xl border border-slate-200 focus:border-[#0F2747] focus:ring-1 focus:ring-[#0F2747] text-sm text-[#0F2747] placeholder:text-slate-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0F2747] p-1 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#0F2747] hover:bg-[#1A3E6D] text-white font-bold text-sm shadow-md transition active:scale-98 cursor-pointer disabled:opacity-50 mt-2"
            >
              {isSubmitting
                ? "Đang xử lý..."
                : authMode === "signin"
                ? "Đăng nhập với Database Pencily"
                : "Hoàn tất đăng ký học sinh"}
            </button>
          </form>

          {/* Privacy & Terms Note */}
          <p className="text-[11px] text-center text-slate-400 leading-normal">
            Bằng việc tiếp tục, bạn đồng ý với Quy chuẩn Học tập và Chính sách
            Bảo mật phi lợi nhuận của The Pencily.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-xs text-[#687280]">
        The Pencily Gen 1.0 • Built by Students, For Students.
      </footer>
    </div>
  );
}
