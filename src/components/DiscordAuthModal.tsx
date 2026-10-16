"use client";

import React, { useState, useEffect } from "react";
import { X, ExternalLink, ShieldCheck, Volume2, ChevronDown, ChevronUp, Check, Info } from "lucide-react";
import { usePencily } from "@/context/PencilyContext";
import { DiscordLogo } from "./BrandIcons";

interface DiscordAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DiscordAuthModal({ isOpen, onClose }: DiscordAuthModalProps) {
  const { loginWithDiscord, isLoggedIn, user, logout, language } = usePencily();
  const [showDevGuide, setShowDevGuide] = useState(false);
  const [oauthConfigured, setOauthConfigured] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Check if Discord OAuth is configured on the server
      fetch("/api/auth/discord/status")
        .then((res) => res.json())
        .then((data) => {
          setOauthConfigured(Boolean(data.configured));
        })
        .catch(() => {
          setOauthConfigured(false);
        });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRealDiscordLogin = () => {
    setIsLoading(true);
    // Redirects to /api/auth/discord which handles the OAuth2 redirect
    window.location.href = "/api/auth/discord";
  };

  const handleDemoDiscordLogin = () => {
    setIsLoading(true);
    // Simulate instantaneous verified Discord OAuth login
    loginWithDiscord({
      discordId: "891273918239129031",
      name: "Học sinh Pencily",
      handle: "@pencily_student",
      discord: "pencily_student",
      email: "student@thepencily.edu.vn",
      school: "THPT Chuyên",
      grade: "Lớp 11",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      role: language === "vi" ? "Học viên Discord: The Pencily" : "Discord Learner: The Pencily",
      verified: true,
      points: 20,
    });
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F2747]/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#FFFDF9] border-2 border-[#0F2747] rounded-md shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-sm border-2 border-transparent hover:border-slate-300 hover:bg-slate-100 text-[#0F2747] transition-colors cursor-pointer"
          aria-label={language === "vi" ? "Đóng" : "Close"}
        >
          <X className="w-5 h-5" />
        </button>

        {isLoggedIn ? (
          /* Already Logged In State */
          <div className="text-center py-2 space-y-4">
            <div className="w-16 h-16 rounded-sm mx-auto overflow-hidden border-2 border-[#5865F2] shadow-xs">
              {user.avatar?.startsWith("http") ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-[#5865F2] text-white flex items-center justify-center font-bold text-2xl">
                  {user.avatar || "P"}
                </div>
              )}
            </div>

            <div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-xs bg-[#57F287]/15 text-[#16A34A] border-2 border-emerald-300 text-xs font-bold mb-1">
                <Check className="w-3.5 h-3.5" />
                {language === "vi" ? "Đã đăng nhập Discord" : "Connected with Discord"}
              </span>
              <h3 className="text-xl font-bold text-[#0F2747] font-jakarta">{user.name}</h3>
              <p className="text-xs text-[#6B7280] font-mono">{user.handle || `@${user.discord}`}</p>
            </div>

            <div className="p-3 bg-[#5865F2]/10 border-2 border-[#5865F2]/30 rounded-sm text-xs text-[#5865F2] text-left">
              {language === "vi"
                ? "🎉 Bạn đã sẵn sàng tham gia tất cả các lớp học và phòng Voice 24/7 trên Discord của The Pencily."
                : "🎉 You are ready to join all live study sessions and 24/7 voice rooms on The Pencily Discord."}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  logout();
                }}
                className="w-1/2 py-2.5 px-4 rounded-sm border-2 border-red-300 text-red-600 hover:bg-red-50 text-xs font-bold transition cursor-pointer"
              >
                {language === "vi" ? "Đăng xuất" : "Sign Out"}
              </button>
              <button
                onClick={onClose}
                className="w-1/2 py-2.5 px-4 rounded-sm bg-[#0F2747] text-white border-2 border-[#0F2747] hover:bg-[#1E3A8A] text-xs font-bold transition cursor-pointer shadow-xs"
              >
                {language === "vi" ? "Đến Dashboard" : "Go to Dashboard"}
              </button>
            </div>
          </div>
        ) : (
          /* Unauthenticated: Connect with Discord */
          <div>
            {/* Header Lockup */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-sm bg-[#5865F2] border-2 border-[#5865F2] text-white flex items-center justify-center shadow-xs shrink-0">
                <DiscordLogo className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5865F2] flex items-center gap-1">
                  Discord OAuth2
                </span>
                <h3 className="text-2xl font-black text-[#0F2747] font-jakarta tracking-tight">
                  {language === "vi" ? "Tham gia The Pencily" : "Join The Pencily"}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-5">
              {language === "vi"
                ? "Toàn bộ các buổi học peer-learning, phòng thảo luận và voice chat diễn ra trực tiếp trên Discord. Đăng nhập 1 chạm để bắt đầu ngay!"
                : "All peer-learning sessions and voice rooms run seamlessly on Discord. Connect in one tap to get started!"}
            </p>

            {/* Benefits Pills */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2.5 p-2.5 rounded-sm bg-white border-2 border-slate-300 text-xs text-[#0F2747]">
                <div className="w-6 h-6 rounded-xs bg-[#57F287]/15 text-[#16A34A] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>{language === "vi" ? "Không cần tạo tài khoản hay điền form dài dòng" : "No tedious forms or passwords needed"}</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-sm bg-white border-2 border-slate-300 text-xs text-[#0F2747]">
                <div className="w-6 h-6 rounded-xs bg-[#5865F2]/15 text-[#5865F2] flex items-center justify-center shrink-0">
                  <Volume2 className="w-3.5 h-3.5" />
                </div>
                <span>{language === "vi" ? "Tự động kết nối với phòng học Voice & kênh bài tập" : "Auto-connected to voice study rooms & materials"}</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-sm bg-white border-2 border-slate-300 text-xs text-[#0F2747]">
                <div className="w-6 h-6 rounded-xs bg-[#FFC83D]/25 text-[#0F2747] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span>{language === "vi" ? "100% Phi lợi nhuận & Miễn phí trọn đời" : "100% Non-profit & Free forever"}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              {/* Primary: Real Discord OAuth */}
              <button
                onClick={handleRealDiscordLogin}
                disabled={isLoading}
                className="w-full py-3.5 px-5 rounded-sm bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-sm shadow-xs border-2 border-[#5865F2] transition-all active:scale-98 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
              >
                <DiscordLogo className="w-5 h-5" />
                <span>{language === "vi" ? "Ủy quyền bằng Discord" : "Authorize with Discord"}</span>
                <ExternalLink className="w-4 h-4 opacity-75" />
              </button>

              {/* Secondary: Instant Demo Login */}
              <button
                onClick={handleDemoDiscordLogin}
                disabled={isLoading}
                className="w-full py-3 px-5 rounded-sm bg-[#FFF9EF] hover:bg-[#FFF3D6] border-2 border-slate-300 text-[#0F2747] font-bold text-xs sm:text-sm transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>⚡ {language === "vi" ? "Thử nghiệm nhanh (Demo 1-Click)" : "Instant Demo (1-Click)"}</span>
              </button>
            </div>

            {/* Developer Guide Accordion */}
            <div className="mt-5 pt-4 border-t-2 border-slate-200">
              <button
                type="button"
                onClick={() => setShowDevGuide(!showDevGuide)}
                className="w-full flex items-center justify-between text-left text-xs font-semibold text-[#687280] hover:text-[#0F2747] py-1 cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#5865F2]" />
                  {language === "vi" ? "Hướng dẫn cấu hình Discord App ID" : "Discord App ID Configuration Guide"}
                </span>
                {showDevGuide ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showDevGuide && (
                <div className="mt-2.5 p-3 rounded-sm bg-slate-100 border-2 border-slate-200 text-[11px] text-slate-700 space-y-2 leading-relaxed animate-fadeIn">
                  <div className="font-bold text-[#0F2747]">
                    {language === "vi" ? "Các bước kết nối Discord Bot / OAuth2 thực tế:" : "Steps to configure Discord OAuth2:"}
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-slate-600">
                    <li>{language === "vi" ? "Vào" : "Visit"} <a href="https://discord.com/developers/applications" target="_blank" rel="noreferrer" className="text-[#5865F2] font-semibold underline">Discord Developer Portal</a></li>
                    <li>{language === "vi" ? "Tạo" : "Create"} <b>New Application</b> → {language === "vi" ? "đặt tên" : "name it"} <b>The Pencily</b></li>
                    <li>{language === "vi" ? "Vào" : "Go to"} <b>OAuth2</b> → <b>Redirects</b>: {language === "vi" ? "thêm" : "add"} <code className="bg-white px-1 py-0.5 rounded-xs border border-slate-300 font-mono text-[10px]">http://localhost:3000/api/auth/discord/callback</code></li>
                    <li>Copy <b>Client ID</b> &amp; <b>Client Secret</b> → <code className="bg-white px-1 py-0.5 rounded-xs border border-slate-300 font-mono text-[10px]">.env.local</code></li>
                  </ol>
                  <div className="text-[10px] text-slate-500 pt-1">
                    {language === "vi" ? "Trạng thái hiện tại:" : "Current status:"} {oauthConfigured ? "✅ Đã cấu hình credentials" : "ℹ️ Chưa có .env.local (Dùng nút Demo để thử nghiệm ngay)"}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
