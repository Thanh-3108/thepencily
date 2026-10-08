"use client";

import React, { useState } from "react";
import { BookOpen, Download, FileText, Share2, UploadCloud, CheckCircle, ExternalLink, Sparkles, Tag } from "lucide-react";

interface ResourceItem {
  id: string;
  title: string;
  subject: string;
  type: string;
  grade: string;
  author: string;
  authorRole: string;
  pages: number;
  downloads: number;
  tags: string[];
  link: string;
}

export function ResourceLibrary({ onOpenContributeModal }: { onOpenContributeModal: () => void }) {
  const [selectedSubject, setSelectedSubject] = useState("all");

  const resources: ResourceItem[] = [
    {
      id: "res-1",
      title: "Sổ Tay Tổng Hợp Công Thức Giải Tích 12 & Kỹ Thuật Bấm Casio Siêu Tốc",
      subject: "Toán học",
      type: "Cheat Sheet",
      grade: "Lớp 12",
      author: "Hoàng Minh",
      authorRole: "Tutor Toán",
      pages: 18,
      downloads: 480,
      tags: ["Đạo hàm", "Nguyên hàm", "Tích phân", "Casio"],
      link: "#",
    },
    {
      id: "res-2",
      title: "Bộ Ghi Chú Cornell: To Toàn Diện 500 Từ Vựng & Collocation IELTS C2",
      subject: "Tiếng Anh",
      type: "Cornell Notes",
      grade: "Chung",
      author: "Khánh Linh",
      authorRole: "Contributor",
      pages: 24,
      downloads: 712,
      tags: ["IELTS", "Vocabulary", "Writing Task 2"],
      link: "#",
    },
    {
      id: "res-3",
      title: "Cẩm Nang Thuật Toán & Cấu Trúc Dữ Liệu Dành Cho Thi HSG Bằng Python/C++",
      subject: "Lập trình",
      type: "Ebook / Handout",
      grade: "Lớp 10-12",
      author: "Ban ACA Tech",
      authorRole: "Core Team",
      pages: 42,
      downloads: 620,
      tags: ["Binary Search", "Dynamic Programming", "Graph"],
      link: "#",
    },
    {
      id: "res-4",
      title: "Tóm Tắt Sơ Đồ Tư Duy Sóng Cơ & Dòng Điện Xoay Chiều Có Mô Hình",
      subject: "Vật lý",
      type: "Mindmap / Notes",
      grade: "Lớp 12",
      author: "Vũ Tuấn Kiệt",
      authorRole: "Tutor Vật lý",
      pages: 12,
      downloads: 390,
      tags: ["Giao thoa sóng", "Mạch RLC", "Đồ thị điện áp"],
      link: "#",
    },
    {
      id: "res-5",
      title: "Bộ Đề Dự Đoán Kỳ Thi Học Sinh Giỏi Môn Hóa Kèm Phân Tích Lời Giải Chi Tiết",
      subject: "Hóa học",
      type: "Đề thi & Lời giải",
      grade: "Lớp 11-12",
      author: "Phương Linh",
      authorRole: "Tutor Hóa",
      pages: 35,
      downloads: 510,
      tags: ["Hóa hữu cơ", "Este", "Điện phân"],
      link: "#",
    },
    {
      id: "res-6",
      title: "Framework Xây Dựng Second Brain Học Tập Trên Notion Chuẩn Gen Z",
      subject: "Kỹ năng",
      type: "Template",
      grade: "Tất cả",
      author: "The Pencily Team",
      authorRole: "Core Team",
      pages: 8,
      downloads: 940,
      tags: ["Notion Template", "Quản lý thời gian", "Active Recall"],
      link: "#",
    },
  ];

  const filteredResources =
    selectedSubject === "all"
      ? resources
      : resources.filter((r) => r.subject === selectedSubject);

  return (
    <section id="resources" className="py-16 sm:py-24 bg-white border-b border-[#0F2747]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFC83D]/25 text-[#0F2747] text-xs font-bold uppercase tracking-wider mb-3">
              <BookOpen className="w-3.5 h-3.5 text-[#0F2747]" />
              <span>Open Academic Resource</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2747] font-heading tracking-tight">
              Thư Viện Tài Liệu Mở
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#4B5563] max-w-xl">
              Nguồn học liệu mở do Tutor và các bạn học sinh chọn lọc, tổng hợp với tinh thần sẻ chia tri thức không giới hạn.
            </p>
          </div>

          <button
            onClick={onOpenContributeModal}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#0F2747] hover:bg-[#1A3E6D] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition self-start md:self-auto"
          >
            <UploadCloud className="w-4 h-4 text-[#FFC83D]" />
            <span>Đóng góp tài liệu mới</span>
          </button>
        </div>

        {/* Subject Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 pb-2 border-b border-[#0F2747]/10">
          {[
            { id: "all", label: "Tất cả tài nguyên" },
            { id: "Toán học", label: "Toán học" },
            { id: "Tiếng Anh", label: "Tiếng Anh" },
            { id: "Lập trình", label: "Lập trình" },
            { id: "Vật lý", label: "Vật lý" },
            { id: "Hóa học", label: "Hóa học" },
            { id: "Kỹ năng", label: "Kỹ năng tự học" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedSubject(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedSubject === tab.id
                  ? "bg-[#FFC83D] text-[#0F2747] shadow-sm"
                  : "bg-[#FFF9EF] text-[#0F2747] hover:bg-[#FFC83D]/20"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((item) => (
            <div
              key={item.id}
              className="bg-[#FFFDF9] rounded-2xl border-2 border-[#0F2747]/15 hover:border-[#0F2747] p-6 transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div>
                {/* Meta header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md bg-[#4F7ECB]/15 text-[#4F7ECB]">
                    {item.type}
                  </span>
                  <span className="text-[11px] font-bold text-[#6B7280]">
                    {item.grade} • {item.pages} trang
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-[#0F2747] font-heading mb-2 leading-snug line-clamp-2">
                  {item.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded bg-gray-100 text-[#4B5563]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Author attribution */}
                <div className="flex items-center justify-between text-xs text-[#6B7280] pt-3 border-t border-[#0F2747]/10 mb-4">
                  <span>
                    Biên soạn: <b className="text-[#0F2747]">{item.author}</b> ({item.authorRole})
                  </span>
                  <span className="text-[11px]">📥 {item.downloads} lượt xem</span>
                </div>
              </div>

              {/* Action Button */}
              <a
                href={item.link}
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Đang mở tài liệu: "${item.title}". Tài liệu này được mở truy cập qua kho lưu trữ The Pencily.`);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-white border-2 border-[#0F2747] hover:bg-[#0F2747] hover:text-white text-[#0F2747] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 group"
              >
                <span>Xem & Tải Tài Liệu</span>
                <Download className="w-4 h-4 text-[#4F7ECB] group-hover:text-[#FFC83D] transition-colors" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
