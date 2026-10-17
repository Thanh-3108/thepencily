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
      <div className="h-[100dvh] bg-[#FFF9EF] flex flex-col items-center justify-center p-4 text-center">
        <div className="max-w-md w-full bg-white rounded-md p-6 sm:p-8 border-2 border-[#0F2747] shadow-lg space-y-4 animate-fadeIn">
          <div className="w-12 h-12 mx-auto rounded-sm bg-emerald-100 border-2 border-emerald-500 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-black text-[#0F2747]">
            {isVi ? "Bạn đã đăng nhập!" : "Already Signed In!"}
          </h2>
          <p className="text-xs text-[#4B5563]">
            {isVi
              ? "Tài khoản The Pencily của bạn hiện đang hoạt động."
              : "Your The Pencily account is active."}
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => router.push(redirectParam || "/dashboard")}
              className="w-full py-2.5 px-4 rounded-sm bg-[#0F2747] hover:bg-slate-800 text-white font-bold text-xs shadow-md transition active:scale-98 cursor-pointer"
            >
              {isVi ? "Vào Dashboard ngay →" : "Go to Dashboard →"}
            </button>
            <Link
              href="/"
              className="w-full py-2 px-4 rounded-sm border-2 border-slate-300 text-[#0F2747] hover:bg-slate-50 font-bold text-xs transition cursor-pointer"
            >
              {isVi ? "Về Trang chủ" : "Back to Home"}
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
          router.push(redirectParam || "/onboarding");
        } else {
          setInfoMessage(
            isVi
              ? "Tài khoản học sinh đã được tạo! Hãy kiểm tra email để xác thực hoặc đăng nhập ngay."
              : "Account created! Please check your email to verify and sign in."
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
    <div className="h-[100dvh] max-h-[100dvh] bg-[#FFF9EF] flex flex-col justify-between overflow-y-auto selection:bg-[#FFC83D] selection:text-[#0F2747]">
      {/* Top Header - Compact */}
      <header className="w-full py-2.5 px-4 sm:px-8 max-w-6xl mx-auto flex items-center justify-between shrink-0">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F2747] hover:text-[#4F7ECB] transition group cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>{isVi ? "Trang chủ" : "Home"}</span>
        </Link>
        <Link href="/" title="The Pencily">
          <Logo variant="nav" size="sm" />
        </Link>
      </header>

      {/* Main Container - Compact without scrolling */}
      <main className="flex-1 flex items-center justify-center p-3 sm:p-4">
        <div className="w-full max-w-[480px] bg-white rounded-md border-2 border-[#0F2747] shadow-sm p-4 sm:p-5 space-y-3">
          {/* Header titles */}
          <div className="text-center space-y-1">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-xs bg-[#FFC83D]/25 border border-amber-300 text-[#0F2747] text-[10px] font-bold">
              <Sparkles className="w-3 h-3 text-amber-700" />
              <span>{isVi ? "Cổng Tài Khoản The Pencily" : "The Pencily Portal"}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#0F2747] tracking-tight">
              {authMode === "signin"
                ? isVi
                  ? "Đăng nhập học sinh"
                  : "Student Sign In"
                : isVi
                ? "Tạo tài khoản học sinh"
                : "Create Student Account"}
            </h1>
            <p className="text-[11px] text-[#4B5563]">
              {authMode === "signin"
                ? isVi
                  ? "Vào phòng học P2P, ghi danh lớp và nhận chứng nhận"
                  : "Access P2P pods, join classes, and earn certificates"
                : isVi
                ? "100% miễn phí cộng đồng học tập do học sinh, vì học sinh"
                : "100% free student-led learning community nationwide"}
            </p>
          </div>

          {/* Unified Tabs: Đăng Nhập vs Tạo Tài Khoản Học Sinh */}
          <div className="grid grid-cols-2 p-0.5 bg-[#FAF7F2] rounded-md border-2 border-slate-300 gap-1">
            <button
              type="button"
              onClick={() => handleSwitchTab("signin")}
              className={`py-1.5 px-2 text-xs font-bold rounded-sm transition cursor-pointer text-center ${
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
              className={`py-1.5 px-2 text-xs font-bold rounded-sm transition cursor-pointer text-center ${
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
            <div className="p-2.5 rounded-sm bg-amber-50 border-2 border-amber-300 text-amber-900 text-xs flex items-start gap-2 animate-fadeIn">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <div className="leading-snug text-[11px]">{infoMessage}</div>
            </div>
          )}

          {errorMessage && (
            <div className="p-2.5 rounded-sm bg-red-50 border-2 border-red-300 text-red-700 text-xs flex items-start gap-2 animate-fadeIn">
              <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
              <div className="text-[11px]">{errorMessage}</div>
            </div>
          )}

          {/* Quick Discord OAuth Button */}
          <button
            type="button"
            onClick={handleDiscordAuth}
            disabled={isSubmitting}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-sm bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-xs shadow-2xs transition-all active:scale-98 cursor-pointer border-2 border-[#5865F2] disabled:opacity-50"
          >
            <div className="flex items-center gap-2">
              <DiscordLogo className="w-4 h-4 text-white" />
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
            <span className="text-[9px] font-semibold bg-white/20 px-1.5 py-0.5 rounded-xs uppercase tracking-wider">
              {isVi ? "1 Chạm" : "1 Click"}
            </span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
              {isVi ? "Hoặc điền thông tin" : "Or fill details"}
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-2.5">
            {/* REGISTER FIELDS (2-Column Grid Layout for Zero-Scroll) */}
            {authMode === "register" ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#0F2747] flex items-center gap-1">
                      <User className="w-3 h-3 text-[#4F7ECB]" />
                      <span>{isVi ? "Họ và tên thật *" : "Full Name *"}</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={isVi ? "VD: Nguyễn Nhật Nam" : "e.g. Alex Johnson"}
                      className="w-full px-3 py-1.5 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none text-xs text-[#0F2747] placeholder:text-slate-400 transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#0F2747] flex items-center gap-1">
                      <GraduationCap className="w-3 h-3 text-[#4F7ECB]" />
                      <span>{isVi ? "Khối lớp" : "Grade"}</span>
                    </label>
                    <select
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none text-xs text-[#0F2747] bg-white transition cursor-pointer"
                    >
                      <option value="Lớp 10">{isVi ? "Lớp 10" : "Grade 10"}</option>
                      <option value="Lớp 11">{isVi ? "Lớp 11" : "Grade 11"}</option>
                      <option value="Lớp 12">{isVi ? "Lớp 12" : "Grade 12"}</option>
                      <option value="Đại học">{isVi ? "Đại học / Tự do" : "University / Other"}</option>
                    </select>
                  </div>
                </div>

                {/* School autocomplete input with 64-province support */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#0F2747] flex items-center justify-between">
                    <span>{isVi ? "Tỉnh/Thành & Trường học *" : "Province & School *"}</span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      {isVi ? "Toàn quốc 64 tỉnh/thành" : "Nationwide directory"}
                    </span>
                  </label>
                  <SchoolSelectDropdown
                    value={school}
                    onChange={setSchool}
                    language={language as "vi" | "en"}
                    placeholder={isVi ? "Gõ tìm trường (VD: Năng khiếu, Gia Định, Amsterdam...)" : "Search schools (e.g. Gifted High School...)"}
                  />
                </div>

                {/* Email and Password on a 2-column grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#0F2747] flex items-center gap-1">
                      <Mail className="w-3 h-3 text-[#4F7ECB]" />
                      <span>{isVi ? "Email học sinh *" : "Email *"}</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@gmail.com"
                      className="w-full px-3 py-1.5 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none text-xs text-[#0F2747] placeholder:text-slate-400 transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#0F2747] flex items-center gap-1">
                      <Lock className="w-3 h-3 text-[#4F7ECB]" />
                      <span>{isVi ? "Mật khẩu (≥6 ký tự) *" : "Password (≥6) *"}</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••"
                        className="w-full px-3 py-1.5 pr-8 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none text-xs text-[#0F2747] placeholder:text-slate-400 transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0F2747] p-0.5 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* SIGN IN FIELDS */
              <>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#0F2747] flex items-center gap-1">
                    <Mail className="w-3 h-3 text-[#4F7ECB]" />
                    <span>{isVi ? "Email hoặc Tên đăng nhập *" : "Email or Username *"}</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="VD: student@thepencily.org"
                    className="w-full px-3 py-2 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none text-xs text-[#0F2747] placeholder:text-slate-400 transition"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-[#0F2747] flex items-center gap-1">
                      <Lock className="w-3 h-3 text-[#4F7ECB]" />
                      <span>{isVi ? "Mật khẩu *" : "Password *"}</span>
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setInfoMessage(
                          isVi
                            ? "Nếu bạn quên mật khẩu, hãy đăng nhập nhanh bằng Discord để phục hồi truy cập tài khoản ngay lập tức."
                            : "If you forgot your password, please sign in with Discord to instantly restore access."
                        )
                      }
                      className="text-[10px] font-semibold text-[#4F7ECB] hover:underline cursor-pointer"
                    >
                      {isVi ? "Quên mật khẩu?" : "Forgot password?"}
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={isVi ? "Tối thiểu 6 ký tự" : "At least 6 characters"}
                      className="w-full px-3 py-2 pr-8 rounded-sm border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none text-xs text-[#0F2747] placeholder:text-slate-400 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0F2747] p-0.5 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Primary Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 rounded-sm bg-[#0F2747] hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition active:scale-98 cursor-pointer disabled:opacity-50 mt-1 border-2 border-[#0F2747] flex items-center justify-center gap-2"
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
              <ArrowRight className="w-3.5 h-3.5 text-[#FFC83D]" />
            </button>
          </form>

          {/* Switch Tab Helper Link */}
          <div className="text-center text-[11px] pt-1">
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
        </div>
      </main>

      {/* Footer - Minimal */}
      <footer className="w-full py-2 text-center text-[11px] text-[#687280] shrink-0">
        The Pencily: Built by Students, For Students.
      </footer>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="h-[100dvh] bg-[#FFF9EF] flex items-center justify-center p-4 text-[#0F2747]">
          <div className="text-xs font-bold font-mono">Loading The Pencily Portal...</div>
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  );
}
