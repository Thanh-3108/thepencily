"use client";

import React from "react";
import Link from "next/link";
import { MessageSquare, ArrowRight, ExternalLink, ShieldCheck, Video, BookOpen } from "lucide-react";
import { usePencily } from "@/context/PencilyContext";

export function HomeStudySpace() {
  const { language } = usePencily();
  const isVi = language === "vi";

  return (
    <section id="community-space" className="pt-20 sm:pt-28 pb-10">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
            <div className="text-xs font-bold uppercase tracking-wider text-[#4F7ECB]">
              {isVi ? "Không gian sinh hoạt trực tuyến" : "Online Community Space"}
            </div>
            <h2 className="font-poppins font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0F2747] tracking-tight text-balance">
              {isVi ? "Phòng học mở trực tiếp trên Web & Discord 24/7" : "Open Study Rooms directly on Web & Discord 24/7"}
            </h2>
          </div>

          {/* 4 Feature Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-slate-200/60">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#4F7ECB] flex items-center justify-center mb-3">
                <Video className="w-5 h-5" />
              </div>
              <h4 className="font-poppins font-bold text-sm text-[#0F2747] mb-1">
                Web Voice & Board
              </h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                {isVi
                  ? "Đàm thoại mic, chia sẻ màn hình và bảng vẽ ghi chú trực quan ngay trên web The Pencily."
                  : "Voice chat, screen-sharing, and interactive visual note-taking directly on The Pencily Web."}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-slate-200/60">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h4 className="font-poppins font-bold text-sm text-[#0F2747] mb-1">
                {isVi ? "Discord Kênh Môn Học" : "Discord Subject Channels"}
              </h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                {isVi
                  ? "Các phòng #toan-hoc, #vat-ly, #ngoai-ngu hoạt động 24/7, luôn có bạn học cùng thức ôn thi."
                  : "Channels for #math, #physics, #languages active 24/7, with peers always studying alongside you."}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-slate-200/60">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-poppins font-bold text-sm text-[#0F2747] mb-1">
                {isVi ? "Kênh #doubt-clearing" : "#doubt-clearing Channel"}
              </h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                {isVi
                  ? "Đăng ảnh đề bài khó, peer tutors và các bạn giỏi môn sẽ cùng hỗ trợ gỡ rối không phán xét."
                  : "Post tricky exam questions; peer tutors and classmates jump in with non-judgmental explanations."}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-slate-200/60">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-poppins font-bold text-sm text-[#0F2747] mb-1">
                Red Line Policy
              </h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                {isVi
                  ? "Quy chuẩn văn hóa nghiêm ngặt: môi trường an toàn, tôn trọng và tuyệt đối không thương mại hóa."
                  : "Strict community guidelines: safe, respectful, and strictly non-commercial."}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="https://discord.gg/6hpEf4wC4z"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#0F2747] border border-slate-300 hover:border-slate-400 font-semibold text-sm shadow-2xs transition active:scale-98"
            >
              <span>{isVi ? "Vào máy chủ Discord The Pencily" : "Join The Pencily Discord Server"}</span>
              <ExternalLink className="w-4 h-4 text-[#5865F2]" />
            </a>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#0F2747] border border-slate-300 hover:border-slate-400 font-semibold text-sm shadow-2xs transition active:scale-98"
            >
              <span>{isVi ? "Mở Dashboard học tập" : "Open Learning Dashboard"}</span>
              <ArrowRight className="w-4 h-4 text-[#4F7ECB]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
