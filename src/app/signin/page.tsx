"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Logo } from "@/components/Logo";
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
        <div className="max-w-md w-full bg-white rounded-3xl p-7 sm:p-9 border border-[#E6DEC8] shadow-pencily-soft space-y-4 animate-fade-quick">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-[#0F2747]">
            {isVi ? "Bạn đã đăng nhập!" : "Already Signed In!"}
          </h2>
          <p className="text-xs sm:text-sm text-[#526277]">
            {isVi
              ? "Tài khoản The Pencily của bạn hiện đang hoạt động."
              : "Your The Pencily account is active."}
          </p>
          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => router.push(redirectParam || "/dashboard")}
              className="w-full py-3 px-5 rounded-full bg-[#0F2747] hover:bg-[#193B6B] text-white font-semibold text-xs sm:text-sm shadow-tactile-navy transition cursor-pointer"
            >
              {isVi ? "Vào Dashboard ngay →" : "Go to Dashboard →"}
            </button>
            <Link
              href="/"
              className="w-full py-2.5 px-5 rounded-full border border-[#E6DEC8] text-[#0F2747] hover:bg-[#FAF7EE] font-semibold text-xs sm:text-sm transition cursor-pointer"
            >
              {isVi ? "Về Trang chủ" : "Back to Home"}
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
          router.push(redirectParam || "/dashboard");
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
          router.push(redirectParam || "/dashboard");
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

      {/* Main Container - Compact, warm & welcoming */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-[490px] bg-white rounded-3xl border border-[#E6DEC8] shadow-pencily-soft p-6 sm:p-8 space-y-4">
          {/* Header titles */}
          <div className="text-center space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF6DC] text-amber-800 text-[11px] font-semibold">
              <span>{isVi ? "Cổng Học Sinh The Pencily" : "The Pencily Portal"}</span>
            </div>
            <h1 className="text-2xl sm:text-[26px] font-bold text-[#0F2747] tracking-tight">
              {authMode === "signin"
                ? isVi
                  ? "Chào mừng bạn quay lại"
                  : "Welcome Back"
                : isVi
                ? "Tạo tài khoản miễn phí"
                : "Create Free Account"}
            </h1>
            <p className="text-xs sm:text-sm text-[#526277]">
              {authMode === "signin"
                ? isVi
                  ? "Vào phòng học nhóm, ghi danh lớp và lưu chứng nhận"
                  : "Access study pods, join classes, and track certificates"
                : isVi
                ? "Cộng đồng học tập do học sinh, vì học sinh"
                : "100% free student-led learning community"}
            </p>
          </div>

          {/* Unified Capsule Tabs */}
          <div className="grid grid-cols-2 p-1 bg-[#FAF7EE] rounded-full border border-[#E6DEC8] gap-1">
            <button
              type="button"
              onClick={() => handleSwitchTab("signin")}
              className={`py-2 px-3 text-xs font-semibold rounded-full transition cursor-pointer text-center ${
                authMode === "signin"
                  ? "bg-[#0F2747] text-white shadow-xs"
                  : "text-[#526277] hover:text-[#0F2747]"
              }`}
            >
              {isVi ? "Đăng nhập" : "Sign In"}
            </button>
            <button
              type="button"
              onClick={() => handleSwitchTab("register")}
              className={`py-2 px-3 text-xs font-semibold rounded-full transition cursor-pointer text-center ${
                authMode === "register"
                  ? "bg-[#0F2747] text-white shadow-xs"
                  : "text-[#526277] hover:text-[#0F2747]"
              }`}
            >
              {isVi ? "Tạo tài khoản mới" : "Create Account"}
            </button>
          </div>

          {/* Alert notifications */}
          {infoMessage && (
            <div className="p-3 rounded-2xl bg-[#FFF6DC] border border-[#F5D67B] text-amber-900 text-xs flex items-start gap-2 animate-fade-quick">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{infoMessage}</div>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2 animate-fade-quick">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>{errorMessage}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* REGISTER FIELDS */}
            {authMode === "register" ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#0F2747] flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#4F7ECB]" />
                      <span>{isVi ? "Họ và tên *" : "Full Name *"}</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={isVi ? "VD: Nguyễn Nhật Nam" : "e.g. Alex Johnson"}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#DFD6C0] focus:border-[#4F7ECB] focus:outline-none text-xs text-[#0F2747] placeholder:text-slate-400 transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#0F2747] flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-[#4F7ECB]" />
                      <span>{isVi ? "Khối lớp" : "Grade"}</span>
                    </label>
                    <select
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#DFD6C0] focus:border-[#4F7ECB] focus:outline-none text-xs text-[#0F2747] bg-white transition cursor-pointer"
                    >
                      <option value="Lớp 10">{isVi ? "Lớp 10" : "Grade 10"}</option>
                      <option value="Lớp 11">{isVi ? "Lớp 11" : "Grade 11"}</option>
                      <option value="Lớp 12">{isVi ? "Lớp 12" : "Grade 12"}</option>
                      <option value="Đại học">{isVi ? "Đại học / Tự do" : "University / Other"}</option>
                    </select>
                  </div>
                </div>

                {/* School autocomplete input */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#0F2747] flex items-center justify-between">
                    <span>{isVi ? "Trường học *" : "School *"}</span>
                    <span className="text-[11px] text-slate-400 font-normal">
                      {isVi ? "Hỗ trợ 64 tỉnh/thành" : "Nationwide directory"}
                    </span>
                  </label>
                  <SchoolSelectDropdown
                    value={school}
                    onChange={setSchool}
                    language={language as "vi" | "en"}
                    placeholder={isVi ? "Gõ tìm trường (VD: Năng khiếu, Gia Định...)" : "Search schools..."}
                  />
                </div>

                {/* Email and Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#0F2747] flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#4F7ECB]" />
                      <span>{isVi ? "Email *" : "Email *"}</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@gmail.com"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#DFD6C0] focus:border-[#4F7ECB] focus:outline-none text-xs text-[#0F2747] placeholder:text-slate-400 transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#0F2747] flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#4F7ECB]" />
                      <span>{isVi ? "Mật khẩu (≥6 ký tự) *" : "Password (≥6) *"}</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••"
                        className="w-full px-3.5 py-2 pr-9 rounded-xl border border-[#DFD6C0] focus:border-[#4F7ECB] focus:outline-none text-xs text-[#0F2747] placeholder:text-slate-400 transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0F2747] p-0.5 cursor-pointer"
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
                  <label className="text-xs font-semibold text-[#0F2747] flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#4F7ECB]" />
                    <span>{isVi ? "Email hoặc Tên đăng nhập *" : "Email or Username *"}</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="VD: student@thepencily.org"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFD6C0] focus:border-[#4F7ECB] focus:outline-none text-xs sm:text-sm text-[#0F2747] placeholder:text-slate-400 transition"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#0F2747] flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#4F7ECB]" />
                      <span>{isVi ? "Mật khẩu *" : "Password *"}</span>
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setInfoMessage(
                          isVi
                            ? "Nếu bạn quên mật khẩu, vui lòng gửi email đến contact@thepencily.com để được hỗ trợ cấp lại mật khẩu nhanh chóng."
                            : "If you forgot your password, please email contact@thepencily.com for quick password recovery."
                        )
                      }
                      className="text-xs font-medium text-[#4F7ECB] hover:underline cursor-pointer"
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
                      className="w-full px-3.5 py-2.5 pr-9 rounded-xl border border-[#DFD6C0] focus:border-[#4F7ECB] focus:outline-none text-xs sm:text-sm text-[#0F2747] placeholder:text-slate-400 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0F2747] p-0.5 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Primary Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-5 rounded-full bg-[#0F2747] hover:bg-[#193B6B] text-white font-semibold text-xs sm:text-sm shadow-tactile-navy transition cursor-pointer disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
            >
              <span>
                {isSubmitting
                  ? isVi
                    ? "Đang xử lý..."
                    : "Processing..."
                  : authMode === "signin"
                  ? isVi
                    ? "Đăng nhập ngay"
                    : "Sign In Now"
                  : isVi
                  ? "Tạo tài khoản miễn phí"
                  : "Create Free Account"}
              </span>
              <ArrowRight className="w-4 h-4 text-[#FFC83D]" />
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
