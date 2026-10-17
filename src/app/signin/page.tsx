"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Logo } from "@/components/Logo";
import { DiscordLogo } from "@/components/BrandIcons";
import { usePencily } from "@/context/PencilyContext";
import { supabase } from "@/lib/supabaseClient";
import SchoolSelectDropdown from "@/components/SchoolSelectDropdown";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Lock,
  Mail,
  User,
  GraduationCap,
  Building2,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
} from "lucide-react";

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginWithCustomDatabase, isLoggedIn, language, setLanguage } = usePencily();
  const isVi = language === "vi";

  // URL query params
  const modeParam = searchParams.get("mode");
  const redirectParam = searchParams.get("redirect");

  // Mode: "signin" | "register"
  const [authMode, setAuthMode] = useState<"signin" | "register">(
    modeParam === "register" || modeParam === "signup" ? "register" : "signin"
  );

  // Sync authMode if URL searchParam changes
  useEffect(() => {
    if (modeParam === "register" || modeParam === "signup") {
      setAuthMode("register");
    } else if (modeParam === "signin") {
      setAuthMode("signin");
    }
  }, [modeParam]);

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

  // If already logged in, show quick redirection card
  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FFF9EF] flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-white rounded-md p-8 border-2 border-[#0F2747] shadow-lg space-y-5 animate-fadeIn">
          <div className="w-14 h-14 mx-auto rounded-sm bg-emerald-100 border-2 border-emerald-500 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-[#0F2747]">
            {isVi ? "Bạn đã đăng nhập!" : "Already Signed In!"}
          </h2>
          <p className="text-sm text-[#4B5563]">
            {isVi
              ? "Tài khoản The Pencily của bạn hiện đang hoạt động."
              : "Your The Pencily account is active."}
          </p>
          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => router.push(redirectParam || "/dashboard")}
              className="w-full py-3.5 px-6 rounded-sm bg-[#0F2747] hover:bg-slate-800 text-white font-bold text-sm shadow-md transition active:scale-98 cursor-pointer"
            >
              {isVi ? "Vào Dashboard ngay →" : "Go to Dashboard →"}
            </button>
            <Link
              href="/"
              className="w-full py-3 px-6 rounded-sm border-2 border-slate-300 text-[#0F2747] hover:bg-slate-50 font-bold text-sm transition cursor-pointer"
            >
              {isVi ? "Về Trang chủ" : "Back to Home"}
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
      isVi
        ? `Cổng đăng nhập ${providerName} đang được hoàn thiện cho phiên bản Public Beta! Hiện tại bạn có thể đăng nhập ngay bằng Discord hoặc đăng nhập trực tiếp bằng Database The Pencily bên dưới.`
        : `${providerName} sign-in is scheduled for our Public Beta release! For now, please use Discord OAuth or your The Pencily email credentials below.`
    );
  };

  // Handle Discord OAuth with Supabase PKCE flow
  const handleDiscordAuth = async () => {
    if (!supabase) {
      setErrorMessage(
        isVi
          ? "Chưa cấu hình Supabase OAuth."
          : "Supabase OAuth is not configured."
      );
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
      setErrorMessage(
        err instanceof Error ? err.message : isVi ? "Chưa thể kết nối tới Discord." : "Could not connect to Discord."
      );
      setIsSubmitting(false);
    }
  };

  // Switch tabs cleanly
  const handleSwitchTab = (mode: "signin" | "register") => {
    setAuthMode(mode);
    setErrorMessage(null);
    setInfoMessage(null);
  };

  // Handle Sign In / Register Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setInfoMessage(null);

    if (!email.trim()) {
      setErrorMessage(isVi ? "Vui lòng nhập Email." : "Please enter your email.");
      return;
    }

    if (!password.trim() || password.length < 6) {
      setErrorMessage(
        isVi
          ? "Mật khẩu cần tối thiểu 6 ký tự."
          : "Password must be at least 6 characters."
      );
      return;
    }

    if (authMode === "register" && !fullName.trim()) {
      setErrorMessage(
        isVi
          ? "Vui lòng nhập Họ và tên học sinh."
          : "Please enter the student's full name."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      if (!supabase) {
        // Fallback for preview / demo environment
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

        setTimeout(() => {
          if (authMode === "register") {
            router.push(redirectParam || "/onboarding");
          } else {
            router.push(redirectParam || "/dashboard");
          }
        }, 400);
        return;
      }

      // Supabase Authenticated Path
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
          // If session returned immediately, route to onboarding or target
          router.push(redirectParam || "/onboarding");
        } else {
          setInfoMessage(
            isVi
              ? "Tài khoản học sinh đã được tạo thành công! Hãy kiểm tra hộp thư email của bạn để xác thực hoặc đăng nhập ngay."
              : "Student account created successfully! Please check your email to verify and sign in."
          );
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim(),
        });
        if (error) throw error;
        router.push(redirectParam || "/dashboard");
      }
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : isVi
          ? "Xác thực chưa thành công. Vui lòng kiểm tra lại thông tin!"
          : "Authentication unsuccessful. Please verify your details."
      );
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
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F2747] hover:text-[#4F7ECB] transition group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>{isVi ? "Trang chủ" : "Home"}</span>
        </Link>
        <Link href="/" title="The Pencily">
          <Logo variant="nav" size="md" />
        </Link>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-4">
        <div className="w-full max-w-[500px] bg-white rounded-md border-2 border-[#0F2747] shadow-sm p-6 sm:p-8 space-y-6">
          {/* Header titles */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs bg-[#FFC83D]/25 border border-amber-300 text-[#0F2747] text-xs font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>{isVi ? "Cổng Tài Khoản The Pencily" : "The Pencily Unified Portal"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0F2747] tracking-tight">
              {authMode === "signin"
                ? isVi
                  ? "Đăng nhập học sinh"
                  : "Student Sign In"
                : isVi
                ? "Tạo tài khoản học sinh"
                : "Create Student Account"}
            </h1>
            <p className="text-xs sm:text-sm text-[#4B5563]">
              {authMode === "signin"
                ? isVi
                  ? "Đăng nhập để vào phòng học P2P, ghi danh lớp và nhận chứng nhận"
                  : "Sign in to access P2P pods, join classes, and earn verified certificates"
                : isVi
                ? "Tham gia 100% miễn phí cộng đồng học tập do học sinh, vì học sinh"
                : "Join our 100% free student-led learning community nationwide"}
            </p>
          </div>

          {/* Unified Tabs: Đăng Nhập vs Tạo Tài Khoản Học Sinh */}
          <div className="grid grid-cols-2 p-1 bg-[#FAF7F2] rounded-md border-2 border-slate-300 gap-1">
            <button
              type="button"
              onClick={() => handleSwitchTab("signin")}
              className={`py-2.5 px-3 text-xs sm:text-sm font-bold rounded-sm transition cursor-pointer text-center ${
                authMode === "signin"
                  ? "bg-[#0F2747] text-white shadow-2xs font-black"
                  : "text-[#475569] hover:text-[#0F2747] hover:bg-slate-200/60"
              }`}
            >
              {isVi ? "Đăng Nhập" : "Sign In"}
            </button>
            <button
              type="button"
              onClick={() => handleSwitchTab("register")}
              className={`py-2.5 px-3 text-xs sm:text-sm font-bold rounded-sm transition cursor-pointer text-center ${
                authMode === "register"
                  ? "bg-[#0F2747] text-white shadow-2xs font-black"
                  : "text-[#475569] hover:text-[#0F2747] hover:bg-slate-200/60"
              }`}
            >
              {isVi ? "Tạo Tài Khoản Học Sinh" : "Create Account"}
            </button>
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

          {/* Social Auth Providers (Discord First-Class) */}
          <div className="space-y-2.5">
            {/* 1. DISCORD (OAuth2 via Supabase) */}
            <button
              type="button"
              onClick={handleDiscordAuth}
              disabled={isSubmitting}
              className="w-full flex items-center justify-between px-4 py-3 rounded-sm bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-98 cursor-pointer group border-2 border-[#5865F2] disabled:opacity-50"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-xs bg-white/20 flex items-center justify-center shrink-0">
                  <DiscordLogo className="w-3.5 h-3.5 text-white" />
                </div>
                <span>
                  {authMode === "signin"
                    ? isVi
                      ? "Đăng nhập nhanh với Discord"
                      : "Sign in with Discord"
                    : isVi
                    ? "Tạo tài khoản nhanh với Discord"
                    : "Register with Discord"}
                </span>
              </div>
              <span className="text-[10px] font-semibold bg-white/20 px-2 py-0.5 rounded-xs uppercase tracking-wider">
                {isVi ? "Khuyên dùng" : "Recommended"}
              </span>
            </button>

            {/* 2. GOOGLE & FACEBOOK (Coming Soon) */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handlePendingProvider("Google")}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] border-2 border-slate-300 text-xs font-bold transition active:scale-98 cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={() => handlePendingProvider("Facebook")}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] border-2 border-slate-300 text-xs font-bold transition active:scale-98 cursor-pointer"
              >
                <svg
                  className="w-4 h-4 text-[#1877F2] shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Facebook</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t-2 border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
              {isVi ? "Hoặc dùng tài khoản The Pencily" : "Or use Pencily Account"}
            </span>
          </div>

          {/* Database Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Register extra fields */}
            {authMode === "register" && (
              <>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#0F2747] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#4F7ECB]" />
                    <span>{isVi ? "Họ và tên thật của bạn *" : "Full Legal Name *"}</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={isVi ? "VD: Nguyễn Hoàng Anh" : "e.g. Alex Johnson"}
                    className="w-full px-4 py-2.5 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none text-sm text-[#0F2747] placeholder:text-slate-400 transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#0F2747] flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#4F7ECB]" />
                    <span>{isVi ? "Trường THPT / Học viện đang học" : "Current School / Institution"}</span>
                  </label>
                  <SchoolSelectDropdown
                    value={school}
                    onChange={setSchool}
                    language={language as "vi" | "en"}
                    placeholder={isVi ? "VD: THPT Chuyên Lê Hồng Phong" : "e.g. High School Name"}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#0F2747] flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-[#4F7ECB]" />
                    <span>{isVi ? "Khối lớp" : "Current Grade"}</span>
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none text-sm text-[#0F2747] bg-white transition cursor-pointer"
                  >
                    <option value="Lớp 10">{isVi ? "Lớp 10" : "Grade 10"}</option>
                    <option value="Lớp 11">{isVi ? "Lớp 11" : "Grade 11"}</option>
                    <option value="Lớp 12">{isVi ? "Lớp 12" : "Grade 12"}</option>
                    <option value="Đại học">{isVi ? "Đại học / Tự do" : "University / Other"}</option>
                  </select>
                </div>
              </>
            )}

            {/* Email field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0F2747] flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#4F7ECB]" />
                <span>
                  {authMode === "signin"
                    ? isVi
                      ? "Email hoặc Tên đăng nhập *"
                      : "Email or Username *"
                    : isVi
                    ? "Email học sinh *"
                    : "Student Email *"}
                </span>
              </label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="VD: hocsinh@thepencily.org"
                className="w-full px-4 py-2.5 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none text-sm text-[#0F2747] placeholder:text-slate-400 transition"
              />
            </div>

            {/* Password field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#0F2747] flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#4F7ECB]" />
                  <span>{isVi ? "Mật khẩu *" : "Password *"}</span>
                </label>
                {authMode === "signin" && (
                  <button
                    type="button"
                    onClick={() =>
                      setInfoMessage(
                        isVi
                          ? "Nếu bạn quên mật khẩu, hãy đăng nhập nhanh bằng Discord để phục hồi truy cập tài khoản ngay lập tức."
                          : "If you forgot your password, please sign in with Discord to instantly restore access."
                      )
                    }
                    className="text-[11px] font-semibold text-[#4F7ECB] hover:underline cursor-pointer"
                  >
                    {isVi ? "Quên mật khẩu?" : "Forgot password?"}
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isVi ? "Tối thiểu 6 ký tự" : "At least 6 characters"}
                  className="w-full px-4 py-2.5 pr-10 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none text-sm text-[#0F2747] placeholder:text-slate-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0F2747] p-1 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Primary Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-sm bg-[#0F2747] hover:bg-slate-800 text-white font-bold text-sm shadow-md transition active:scale-98 cursor-pointer disabled:opacity-50 mt-3 border-2 border-[#0F2747] flex items-center justify-center gap-2"
            >
              <span>
                {isSubmitting
                  ? isVi
                    ? "Đang xử lý..."
                    : "Processing..."
                  : authMode === "signin"
                  ? isVi
                    ? "Đăng Nhập Ngay"
                    : "Sign In Now"
                  : isVi
                  ? "Tạo Tài Khoản Học Sinh Miễn Phí"
                  : "Create Free Student Account"}
              </span>
              <ArrowRight className="w-4 h-4 text-[#FFC83D]" />
            </button>
          </form>

          {/* Switch Tab Helper Link */}
          <div className="pt-2 text-center text-xs">
            {authMode === "signin" ? (
              <p className="text-slate-600">
                {isVi ? "Bạn là học sinh mới? " : "New student? "}
                <button
                  type="button"
                  onClick={() => handleSwitchTab("register")}
                  className="font-bold text-[#4F7ECB] hover:text-[#0F2747] underline underline-offset-2 cursor-pointer"
                >
                  {isVi ? "Tạo tài khoản học sinh ngay →" : "Create student account →"}
                </button>
              </p>
            ) : (
              <p className="text-slate-600">
                {isVi ? "Đã có tài khoản The Pencily? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => handleSwitchTab("signin")}
                  className="font-bold text-[#4F7ECB] hover:text-[#0F2747] underline underline-offset-2 cursor-pointer"
                >
                  {isVi ? "Đăng nhập tại đây →" : "Sign in here →"}
                </button>
              </p>
            )}
          </div>

          {/* Privacy & Terms Note */}
          <p className="text-[11px] text-center text-slate-400 leading-normal border-t border-slate-100 pt-4">
            {isVi
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

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FFF9EF] flex items-center justify-center p-6 text-[#0F2747]">
          <div className="text-sm font-bold font-mono">Loading The Pencily Portal...</div>
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  );
}
