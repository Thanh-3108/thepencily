"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { DiscordLogo } from "@/components/BrandIcons";
import { usePencily } from "@/context/PencilyContext";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import SchoolSelectDropdown from "@/components/SchoolSelectDropdown";
import { ArrowLeft, CheckCircle2, AlertCircle, Lock, Mail, User, GraduationCap, Building2, Eye, EyeOff } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const { loginWithCustomDatabase, isLoggedIn, language, setLanguage } = usePencily();

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
        <div className="max-w-md w-full bg-white rounded-md p-8 border-2 border-[#0F2747] shadow-lg space-y-5 animate-fadeIn">
          <div className="w-14 h-14 mx-auto rounded-sm bg-[#57F287]/20 border-2 border-emerald-400 text-[#1f8b4c] flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-[#0F2747]">
            {language === "vi" ? "Bạn đã đăng nhập!" : "Already Signed In!"}
          </h2>
          <p className="text-sm text-[#4B5563]">
            {language === "vi" ? "Tài khoản The Pencily của bạn hiện đang hoạt động." : "Your The Pencily account is active."}
          </p>
          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full py-3.5 px-6 rounded-sm bg-[#0F2747] hover:bg-slate-800 text-white font-bold text-sm shadow-md transition active:scale-98 cursor-pointer"
            >
              {language === "vi" ? "Vào Dashboard ngay" : "Go to Dashboard"}
            </button>
            <Link
              href="/"
              className="w-full py-3 px-6 rounded-sm border-2 border-slate-300 text-[#0F2747] hover:bg-slate-50 font-bold text-sm transition cursor-pointer"
            >
              {language === "vi" ? "Về Trang chủ" : "Back to Home"}
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

  // Handle Discord OAuth with Supabase PKCE flow
  const handleDiscordAuth = async () => {
    if (!supabase) {
      setErrorMessage("Chưa cấu hình Supabase.");
      return;
    }
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "discord",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          scopes: "identify email",
        },
      });
      if (error) throw error;
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Chưa thể kết nối tới Discord.");
      setIsSubmitting(false);
    }
  };

  // Handle Database Sign In / Sign Up with real Supabase Auth
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setInfoMessage(null);

    if (!email.trim()) {
      setErrorMessage("Vui lòng nhập Email.");
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
      if (!supabase) {
        // Fallback for preview mode
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

        setTimeout(() => router.push("/dashboard"), 500);
        return;
      }

      if (authMode === "register") {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password.trim(),
          options: {
            data: {
              full_name: fullName.trim(),
              school: school.trim() || "The Pencily Academy",
              grade: grade || "Lớp 11",
            },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (error) throw error;

        if (data.session) {
          router.push("/dashboard");
        } else {
          setInfoMessage("Tài khoản đã tạo thành công! Hãy kiểm tra email để kích hoạt hoặc đăng nhập ngay nếu đã tắt confirm email.");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim(),
        });
        if (error) throw error;
        router.push("/dashboard");
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Đăng nhập chưa thành công. Vui lòng thử lại!");
    } finally {
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
        <div className="w-full max-w-[480px] bg-white rounded-md border-2 border-slate-300 shadow-sm p-6 sm:p-8 space-y-6">
          {/* Header titles */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs bg-[#FFC83D]/25 border border-amber-300 text-[#0F2747] text-xs font-bold mb-1">
              <span>{language === "vi" ? "Cổng học tập The Pencily" : "The Pencily Portal"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0F2747] tracking-tight">
              {authMode === "signin"
                ? (language === "vi" ? "Chào mừng trở lại!" : "Welcome back!")
                : (language === "vi" ? "Tạo tài khoản học sinh" : "Create Student Account")}
            </h1>
            <p className="text-xs sm:text-sm text-[#4B5563]">
              {authMode === "signin"
                ? (language === "vi" ? "Đăng nhập để vào lớp học trực tuyến, xem lịch và thảo luận" : "Sign in to join live rooms, view schedules, and discuss")
                : (language === "vi" ? "Tham gia miễn phí cộng đồng học tập do học sinh vì học sinh" : "Join our free student-led learning community")}
            </p>
          </div>

          {/* Alert notifications */}
          {infoMessage && (
            <div className="p-3.5 rounded-sm bg-amber-50 border-2 border-amber-300 text-amber-900 text-xs flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{infoMessage}</div>
            </div>
          )}

          {errorMessage && (
            <div className="p-3.5 rounded-sm bg-red-50 border-2 border-red-300 text-red-700 text-xs flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>{errorMessage}</div>
            </div>
          )}

          {/* Social Auth Providers */}
          <div className="space-y-3">
            {/* 1. DISCORD (Active OAuth2 via Supabase) */}
            <button
              type="button"
              onClick={handleDiscordAuth}
              disabled={isSubmitting}
              className="w-full flex items-center justify-between px-5 py-3.5 rounded-sm bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-sm shadow-sm hover:shadow transition-all active:scale-98 cursor-pointer group border-2 border-[#5865F2] disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-xs bg-white/20 flex items-center justify-center">
                  <DiscordLogo className="w-4 h-4 text-white" />
                </div>
                <span>{language === "vi" ? "Tiếp tục với Discord" : "Continue with Discord"}</span>
              </div>
              <span className="text-[10px] font-semibold bg-white/20 px-2 py-0.5 rounded-xs uppercase tracking-wider">
                {language === "vi" ? "Khuyên dùng" : "Recommended"}
              </span>
            </button>

            {/* 2. GOOGLE (Placeholder) */}
            <button
              type="button"
              onClick={() => handlePendingProvider("Google")}
              className="w-full flex items-center justify-between px-5 py-3 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] border-2 border-slate-300 hover:border-[#0F2747] font-bold text-sm transition-all active:scale-98 cursor-pointer group"
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
                <span>{language === "vi" ? "Tiếp tục với Google" : "Continue with Google"}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-normal">
                {language === "vi" ? "Sắp ra mắt" : "Coming Soon"}
              </span>
            </button>

            {/* 3. FACEBOOK (Placeholder) */}
            <button
              type="button"
              onClick={() => handlePendingProvider("Facebook")}
              className="w-full flex items-center justify-between px-5 py-3 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] border-2 border-slate-300 hover:border-[#0F2747] font-bold text-sm transition-all active:scale-98 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-[#1877F2] shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>{language === "vi" ? "Tiếp tục với Facebook" : "Continue with Facebook"}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-normal">
                {language === "vi" ? "Sắp ra mắt" : "Coming Soon"}
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t-2 border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
              {language === "vi" ? "Hoặc dùng tài khoản Pencily" : "Or use Pencily Account"}
            </span>
          </div>

          {/* Tabs for Sign in vs Register */}
          <div className="flex p-1 bg-[#FFF9EF] rounded-sm border-2 border-slate-300">
            <button
              type="button"
              onClick={() => {
                setAuthMode("signin");
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xs transition cursor-pointer ${
                authMode === "signin"
                  ? "bg-[#0F2747] text-white shadow-2xs font-black"
                  : "text-[#0F2747] hover:bg-black/5"
              }`}
            >
              {language === "vi" ? "Đăng nhập" : "Sign In"}
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode("register");
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xs transition cursor-pointer ${
                authMode === "register"
                  ? "bg-[#0F2747] text-white shadow-2xs font-black"
                  : "text-[#0F2747] hover:bg-black/5"
              }`}
            >
              {language === "vi" ? "Đăng ký mới" : "Register"}
            </button>
          </div>

          {/* Database Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === "register" && (
              <>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#0F2747] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#4F7ECB]" />
                    <span>{language === "vi" ? "Họ và tên học sinh" : "Student Full Name"}</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={language === "vi" ? "VD: Nguyễn Nhật Nam" : "e.g. John Doe"}
                    className="w-full px-4 py-2.5 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none text-sm text-[#0F2747] placeholder:text-slate-400 transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#0F2747] flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#4F7ECB]" />
                    <span>{language === "vi" ? "Trường học" : "School"}</span>
                  </label>
                  <SchoolSelectDropdown
                    value={school}
                    onChange={setSchool}
                    language={language as "vi" | "en"}
                    placeholder={language === "vi" ? "VD: THPT Gia Định" : "e.g. High School"}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#0F2747] flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-[#4F7ECB]" />
                    <span>{language === "vi" ? "Khối lớp" : "Grade"}</span>
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none text-sm text-[#0F2747] bg-white transition cursor-pointer"
                  >
                    <option value="Lớp 10">{language === "vi" ? "Lớp 10" : "Grade 10"}</option>
                    <option value="Lớp 11">{language === "vi" ? "Lớp 11" : "Grade 11"}</option>
                    <option value="Lớp 12">{language === "vi" ? "Lớp 12" : "Grade 12"}</option>
                    <option value="Đại học">{language === "vi" ? "Đại học / Tự do" : "University / Other"}</option>
                  </select>
                </div>
              </>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0F2747] flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#4F7ECB]" />
                <span>{language === "vi" ? "Email hoặc Tên đăng nhập" : "Email or Username"}</span>
              </label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="VD: student@thepencily.org"
                className="w-full px-4 py-2.5 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none text-sm text-[#0F2747] placeholder:text-slate-400 transition"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#0F2747] flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#4F7ECB]" />
                  <span>{language === "vi" ? "Mật khẩu" : "Password"}</span>
                </label>
                {authMode === "signin" && (
                  <button
                    type="button"
                    onClick={() =>
                      setInfoMessage(
                        language === "vi"
                          ? "Nếu bạn quên mật khẩu, bạn có thể đăng nhập bằng Discord để phục hồi truy cập tài khoản ngay lập tức."
                          : "If you forgot your password, you can sign in with Discord to restore access instantly."
                      )
                    }
                    className="text-[11px] font-semibold text-[#4F7ECB] hover:underline cursor-pointer"
                  >
                    {language === "vi" ? "Quên mật khẩu?" : "Forgot password?"}
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={language === "vi" ? "Tối thiểu 6 ký tự" : "At least 6 characters"}
                  className="w-full px-4 py-2.5 pr-10 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none text-sm text-[#0F2747] placeholder:text-slate-400 transition"
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
              className="w-full py-3.5 px-6 rounded-sm bg-[#0F2747] hover:bg-slate-800 text-white font-bold text-sm shadow-md transition active:scale-98 cursor-pointer disabled:opacity-50 mt-2 border-2 border-[#0F2747]"
            >
              {isSubmitting
                ? (language === "vi" ? "Đang xử lý..." : "Processing...")
                : authMode === "signin"
                ? (language === "vi" ? "Đăng nhập với Database Pencily" : "Sign In with Pencily")
                : (language === "vi" ? "Hoàn tất đăng ký học sinh" : "Complete Registration")}
            </button>
          </form>

          {/* Privacy & Terms Note */}
          <p className="text-[11px] text-center text-slate-400 leading-normal">
            {language === "vi"
              ? "Bằng việc tiếp tục, bạn đồng ý với Quy chuẩn Học tập và Chính sách Bảo mật phi lợi nhuận của The Pencily."
              : "By continuing, you agree to The Pencily Community Guidelines and Non-Profit Privacy Policy."}
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-xs text-[#687280]">
        The Pencily: Built by Students, For Students.
      </footer>
    </div>
  );
}
