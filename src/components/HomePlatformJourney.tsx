"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Video,
  Users,
  BookOpen,
  Gift,
  Award,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  FileText,
  ChevronRight,
  ExternalLink,
  Compass,
  ArrowUpRight,
  School,
  CheckCircle2,
} from "lucide-react";
import { usePencily } from "@/context/PencilyContext";

interface Chapter {
  id: string;
  chapterNumber: string;
  pillarVi: string;
  pillarEn: string;
  titleVi: string;
  titleEn: string;
  taglineVi: string;
  taglineEn: string;
  descriptionVi: string;
  descriptionEn: string;
  sealLabelVi: string;
  sealLabelEn: string;
  sealCrest: string;
  themeColor: {
    primary: string;
    border: string;
    bg: string;
    text: string;
    lightBg: string;
    accent: string;
    glow: string;
  };
  metrics: {
    labelVi: string;
    labelEn: string;
    value: string;
  }[];
  highlightsVi: string[];
  highlightsEn: string[];
  actionLink: string;
  actionTextVi: string;
  actionTextEn: string;
  mapNode: {
    cx: number;
    cy: number;
    shortLabelVi: string;
    shortLabelEn: string;
    code: string;
  };
}

const CHAPTERS: Chapter[] = [
  {
    id: "p2p-pods",
    chapterNumber: "01",
    pillarVi: "PHÒNG HỌC P2P",
    pillarEn: "P2P STUDY PODS",
    titleVi: "Phòng học trực tuyến chuẩn quốc tế, xóa nhòa khoảng cách",
    titleEn: "Low-latency virtual study rooms bridging every distance",
    taglineVi: "Không gian nhỏ 3–8 bạn • Micro & Bảng vẽ thời gian thực",
    taglineEn: "Cozy 3–8 student pods • Real-time audio & shared scratchpad",
    descriptionVi:
      "Tạm biệt những buổi học thụ động hàng trăm người. Tại The Pencily, các nhóm học tập nhỏ được kết nối trực tiếp qua WebRTC P2P siêu tốc và Supabase Realtime Broadcast. Cùng nhau bật mic, vẽ sơ đồ tư duy trên bảng scratchpad chung và gỡ rối từng bài toán mà không lo bị phán xét.",
    descriptionEn:
      "Say goodbye to passive lectures with hundreds of silent participants. At The Pencily, small study pods connect over ultra-fast WebRTC P2P and live real-time broadcasts. Turn on your mic, sketch logic on the shared scratchpad, and debug complex problems without fear of judgment.",
    sealLabelVi: "CHUẨN WEBRTC • TƯƠNG TÁC THỰC",
    sealLabelEn: "VERIFIED WEBRTC • REALTIME POD",
    sealCrest: "POD-01",
    themeColor: {
      primary: "#2563EB",
      border: "border-blue-600",
      bg: "bg-blue-600",
      text: "text-blue-600",
      lightBg: "bg-blue-50",
      accent: "text-blue-700",
      glow: "rgba(37, 99, 235, 0.25)",
    },
    metrics: [
      { labelVi: "Độ trễ P2P", labelEn: "P2P Latency", value: "< 85ms" },
      { labelVi: "Quy mô mỗi phòng", labelEn: "Pod Capacity", value: "3 – 8 bạn" },
      { labelVi: "Phí dịch vụ", labelEn: "Access Fee", value: "0 VNĐ" },
    ],
    highlightsVi: [
      "Bảng ghi chú Scratchpad & Code đồng bộ tức thời",
      "Chia sẻ màn hình mượt mà, hỗ trợ giải bài tập trực tiếp",
      "Hoàn toàn tự do trên trình duyệt web, không cần cài đặt",
    ],
    highlightsEn: [
      "Instant shared scratchpad & live code sync",
      "Smooth screen sharing for peer homework walkthroughs",
      "100% browser-based with zero software installation",
    ],
    actionLink: "/room/demo",
    actionTextVi: "Vào thử phòng học mẫu",
    actionTextEn: "Test a demo room",
    mapNode: {
      cx: 110,
      cy: 110,
      shortLabelVi: "Phòng Học P2P",
      shortLabelEn: "P2P Pods",
      code: "POD-P2P",
    },
  },
  {
    id: "peer-tutors",
    chapterNumber: "02",
    pillarVi: "GIA SƯ ĐỒNG TRANG LỨA",
    pillarEn: "PEER TUTORS NETWORK",
    titleVi: "Học cùng những người bạn đi trước xuất sắc nhất",
    titleEn: "Learn alongside exceptional peer mentors who've been there",
    taglineVi: "Tutor SAT 1500+ • IELTS 7.5–8.5 • Học sinh trường chuyên",
    taglineEn: "Vetted SAT 1500+ • IELTS 7.5–8.5 • Gifted school mentors",
    descriptionVi:
      "Không phải những giảng viên xa cách, gia sư tại The Pencily là những học sinh xuất sắc vừa trải qua đúng những kỳ thi bạn đang đối mặt. Họ hiểu rõ từng bẫy đề thi, từng áp lực tâm lý và cách diễn đạt gần gũi, dễ nhớ nhất cho học sinh Việt Nam.",
    descriptionEn:
      "Not distant professors, our tutors are high-achieving peers who just conquered the exact exams you are preparing for. They know every tricky trap, every mental pressure point, and the most intuitive peer-to-peer explanation styles.",
    sealLabelVi: "HỌC BỔNG QUỐC TẾ • ĐÃ DUYỆT ĐỀ CƯƠNG",
    sealLabelEn: "ACADEMIC PEER • VETTED SYLLABUS",
    sealCrest: "TUTOR-02",
    themeColor: {
      primary: "#059669",
      border: "border-emerald-600",
      bg: "bg-emerald-600",
      text: "text-emerald-600",
      lightBg: "bg-emerald-50",
      accent: "text-emerald-700",
      glow: "rgba(5, 150, 105, 0.25)",
    },
    metrics: [
      { labelVi: "Tỉ lệ duyệt Tutor", labelEn: "Acceptance Rate", value: "24.5%" },
      { labelVi: "Điểm SAT bình quân", labelEn: "Avg. SAT Score", value: "1510" },
      { labelVi: "Hài lòng từ học viên", labelEn: "Student Rating", value: "4.98 / 5" },
    ],
    highlightsVi: [
      "100% đề cương buổi học được kiểm duyệt nội dung trước khi host",
      "Kèm cặp theo phương pháp gợi mở, không dạy vẹt",
      "Cơ hội ứng tuyển trở thành Tutor và tích lũy kỹ năng lãnh đạo",
    ],
    highlightsEn: [
      "100% session outlines thoroughly vetted before going live",
      "Socratic inquiry method, eliminating rote memorization",
      "Direct pathway to apply as a tutor and hone leadership skills",
    ],
    actionLink: "/dashboard?tab=classes",
    actionTextVi: "Xem danh sách lớp học",
    actionTextEn: "Browse open classes",
    mapNode: {
      cx: 490,
      cy: 110,
      shortLabelVi: "Đội Ngũ Tutors",
      shortLabelEn: "Peer Tutors",
      code: "TUTOR-NET",
    },
  },
  {
    id: "cornell-vault",
    chapterNumber: "03",
    pillarVi: "KHO TRI THỨC CORNELL",
    pillarEn: "CORNELL KNOWLEDGE VAULT",
    titleVi: "Hệ thống ghi chú khoa học & ngân hàng tài liệu mở",
    titleEn: "Scientific Cornell notes & open-source exam archives",
    taglineVi: "Chuẩn hóa Cue - Notes - Summary • Đề thi có lời giải",
    taglineEn: "Standardized Cue - Notes - Summary • Curated exam bank",
    descriptionVi:
      "Tất cả tài liệu và bài giảng của The Pencily đều được đúc kết theo phương pháp Cornell kinh điển: tóm lược từ khóa (Cue Column), ghi chú bài học (Notes) và tổng kết cốt lõi (Summary). Bạn có thể tra cứu nhanh đề thi chuyên, tài liệu SAT/IELTS độc quyền và flashcards hoàn toàn miễn phí.",
    descriptionEn:
      "All lecture materials and key study guides at The Pencily are distilled using the classic Cornell Note-Taking System: key cue words, lecture notes, and synthesized takeaways. Access curated past papers, specialized SAT/IELTS summaries, and flashcards free forever.",
    sealLabelVi: "PHƯƠNG PHÁP CORNELL • TỔNG HỢP CHUẨN",
    sealLabelEn: "CORNELL SYSTEM • CURATED ARCHIVE",
    sealCrest: "VAULT-03",
    themeColor: {
      primary: "#D97706",
      border: "border-amber-600",
      bg: "bg-amber-600",
      text: "text-amber-600",
      lightBg: "bg-amber-50",
      accent: "text-amber-700",
      glow: "rgba(217, 119, 6, 0.25)",
    },
    metrics: [
      { labelVi: "Tài liệu lưu trữ", labelEn: "Archived Guides", value: "350+ Files" },
      { labelVi: "Định dạng hỗ trợ", labelEn: "Formats", value: "PDF & Web" },
      { labelVi: "Chi phí tải về", labelEn: "Download Cost", value: "0 VNĐ" },
    ],
    highlightsVi: [
      "Bộ sưu tập ghi chú Cornell chuẩn cho từng chuyên đề trọng điểm",
      "Ngân hàng đề thi thử THPT Quốc Gia, SAT & IELTS kèm giải chi tiết",
      "Học sinh có thể đóng góp tài liệu để nhận Pencily Points",
    ],
    highlightsEn: [
      "Curated Cornell note sheets covering high-yield exam topics",
      "Mock exam database for SAT, IELTS & National Exams with solutions",
      "Contribute your own notes to earn Pencily Points",
    ],
    actionLink: "/dashboard?tab=resources",
    actionTextVi: "Tra cứu kho tài liệu",
    actionTextEn: "Open knowledge vault",
    mapNode: {
      cx: 300,
      cy: 250,
      shortLabelVi: "Kho Cornell",
      shortLabelEn: "Cornell Vault",
      code: "HUB-CORNELL",
    },
  },
  {
    id: "pencily-points",
    chapterNumber: "04",
    pillarVi: "PENCILY POINTS & SHOP",
    pillarEn: "PENCILY MERIT SHOP",
    titleVi: "Mỗi giờ học đều được trân trọng & tưởng thưởng xứng đáng",
    titleEn: "Every focused hour is recognized and meaningfully rewarded",
    taglineVi: "Tích điểm tự động • Đổi sổ tay, văn phòng phẩm & tài liệu",
    taglineEn: "Earn PP automatically • Redeem journals, stationery & perks",
    descriptionVi:
      "Học tập chăm chỉ xứng đáng được ghi nhận. Với cơ chế Pencily Points (PP), mỗi giờ bạn tham gia phòng học, hoàn thành bài tập hoặc host lớp giúp đỡ bạn bè đều tự động chuyển thành điểm PP. Bạn có thể dùng PP để đổi sổ tay Cornell The Pencily, bộ bút highlight, móc khóa Cú Pencily và các đặc quyền số.",
    descriptionEn:
      "Dedicated focus deserves tangible recognition. With Pencily Points (PP), every verified hour in study pods, completed homework, or peer tutoring session automatically yields PP merits. Redeem your points for exclusive Cornell notebooks, highlighters, Pencily Owl mascots, and academic perks.",
    sealLabelVi: "TƯỞNG THƯỞNG NỖ LỰC • ĐỔI QUÀ THỰC TẾ",
    sealLabelEn: "MERIT REWARD • VALUE IN EVERY HOUR",
    sealCrest: "MERIT-04",
    themeColor: {
      primary: "#7C3AED",
      border: "border-purple-600",
      bg: "bg-purple-600",
      text: "text-purple-600",
      lightBg: "bg-purple-50",
      accent: "text-purple-700",
      glow: "rgba(124, 58, 237, 0.25)",
    },
    metrics: [
      { labelVi: "Điểm thưởng mỗi giờ", labelEn: "Earn Rate", value: "+50 PP / h" },
      { labelVi: "Quà tặng sẵn sàng", labelEn: "Catalog Items", value: "24+ Món" },
      { labelVi: "Giao nhận", labelEn: "Fulfillment", value: "Toàn quốc" },
    ],
    highlightsVi: [
      "Cơ chế chống spam và xác thực thời gian học chủ động",
      "Đổi quà vật phẩm chuyển phát tận nhà hoặc nhận mã quà tặng số",
      "Bảng vinh danh Leaderboard học sinh chăm chỉ hàng tuần",
    ],
    highlightsEn: [
      "Anti-spam and active study pod time verification algorithms",
      "Redeem tangible physical merchandise shipped straight to your door",
      "Weekly Leaderboard honoring top learners and contributors",
    ],
    actionLink: "/dashboard?tab=shop",
    actionTextVi: "Khám phá Cửa hàng PP",
    actionTextEn: "Explore PP Shop",
    mapNode: {
      cx: 110,
      cy: 400,
      shortLabelVi: "Shop Đổi Quà",
      shortLabelEn: "Merit Shop",
      code: "SHOP-MERIT",
    },
  },
  {
    id: "credentials",
    chapterNumber: "05",
    pillarVi: "CHỨNG NHẬN NGOẠI KHÓA",
    pillarEn: "OFFICIAL CERTIFICATE",
    titleVi: "Tấm vé vàng làm đẹp hồ sơ du học & đại học mơ ước",
    titleEn: "Verified extracurricular credential for your college dossier",
    taglineVi: "Bản xuất PDF 2 trang chuẩn: Bản Tiếng Việt & Bản Tiếng Anh",
    taglineEn: "2-Page bilingual PDF: Vietnamese Page & English Page",
    descriptionVi:
      "Tích lũy giờ cống hiến và thành tích học tập để nhận Chứng nhận Hoạt động Ngoại khóa chính thức từ Ban Giám Đốc The Pencily. Chứng nhận được thiết kế trang trọng, xuất 2 trang song ngữ độc lập (trang 1: Tiếng Việt, trang 2: Tiếng Anh), kèm con dấu điện tử và mã định danh tra cứu duy nhất cho hồ sơ tuyển sinh.",
    descriptionEn:
      "Accumulate tutoring hours and study dedication to earn an Official Extracurricular Certificate signed by The Pencily's Board of Directors. Formatted as an international 2-page bilingual PDF (Page 1: Vietnamese, Page 2: English), complete with cryptographic verification IDs for your university admissions.",
    sealLabelVi: "BAN GIÁM ĐỐC KÝ DUYỆT • SONG NGỮ ANH - VIỆT",
    sealLabelEn: "BOARD SIGNED • BILINGUAL DUAL-PAGE",
    sealCrest: "CERT-05",
    themeColor: {
      primary: "#BE123C",
      border: "border-rose-700",
      bg: "bg-rose-700",
      text: "text-rose-700",
      lightBg: "bg-rose-50",
      accent: "text-rose-800",
      glow: "rgba(190, 18, 60, 0.25)",
    },
    metrics: [
      { labelVi: "Định dạng chứng nhận", labelEn: "Format", value: "2 Trang PDF" },
      { labelVi: "Xác thực số hóa", labelEn: "Verification", value: "Mã Hash QR" },
      { labelVi: "Chữ ký phê duyệt", labelEn: "Signatures", value: "Ban Giám Đốc" },
    ],
    highlightsVi: [
      "Xuất trực tiếp 2 trang song ngữ chất lượng cao phục vụ xét tuyển",
      "Liệt kê chi tiết tổng số giờ học tập và số giờ hướng dẫn peer tutoring",
      "Chứng nhận có giá trị đối với hồ sơ học bổng và hoạt động cộng đồng",
    ],
    highlightsEn: [
      "Direct 2-page bilingual high-res export ready for university submissions",
      "Full audit trail detailing study pod hours and peer mentoring sessions",
      "High recognition for global scholarship and extracurricular portfolios",
    ],
    actionLink: "/dashboard?tab=profile",
    actionTextVi: "Xem hồ sơ & Chứng nhận",
    actionTextEn: "View profile & certs",
    mapNode: {
      cx: 490,
      cy: 400,
      shortLabelVi: "Chứng Nhận",
      shortLabelEn: "Credentials",
      code: "HALL-CERT",
    },
  },
];

export function HomePlatformJourney() {
  const { language } = usePencily();
  const isVi = language === "vi";

  const [activeStep, setActiveStep] = useState(0);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const activeChapter = CHAPTERS[activeStep];
  const containerRef = useRef<HTMLDivElement>(null);

  // Jump to specific chapter
  const handleSelectChapter = (index: number) => {
    setActiveStep(index);
  };

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % CHAPTERS.length);
  };

  const handlePrev = () => {
    setActiveStep((prev) => (prev - 1 + CHAPTERS.length) % CHAPTERS.length);
  };

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative z-10 bg-[#FAF7F2] border-t-2 border-[#0F2747]/15 py-16 sm:py-24 text-[#0F2747] overflow-hidden"
    >
      {/* Anchor alias for #how-it-works */}
      <div id="how-it-works" className="absolute -top-10 left-0" />

      {/* Subtle blueprint paper background grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#0F2747 1px, transparent 1px), linear-gradient(90deg, #0F2747 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-[#0F2747]/20 rounded-md text-xs font-bold uppercase tracking-wider text-[#4F7ECB] mb-3 shadow-xs">
            <Compass className="w-3.5 h-3.5 text-[#4F7ECB]" />
            <span>
              {isVi ? "Hành Trình Khám Phá Nền Tảng" : "Platform Discovery Journey"}
            </span>
          </div>
          <h2 className="font-poppins font-black text-3xl sm:text-4xl lg:text-5xl text-[#0F2747] tracking-tight text-balance">
            {isVi
              ? "5 Trụ cột kiến tạo nên hệ sinh thái The Pencily"
              : "5 Core Pillars Powering The Pencily Ecosystem"}
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-[#475569] max-w-2xl mx-auto leading-relaxed">
            {isVi
              ? "Từ phòng học nhóm WebRTC độ trễ thấp đến mạng lưới gia sư chuyên ban, kho tài liệu Cornell và chứng nhận ngoại khóa song ngữ."
              : "From low-latency WebRTC study pods to peer mentors, Cornell knowledge vaults, and verified bilingual credentials."}
          </p>

          {/* Quick Chapter Switcher Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {CHAPTERS.map((ch, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={ch.id}
                  onClick={() => handleSelectChapter(idx)}
                  className={`group px-3 sm:px-4 py-2 rounded-md font-poppins text-xs font-bold border-2 transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "bg-[#0F2747] text-white border-[#0F2747] shadow-sm scale-102"
                      : "bg-white text-[#475569] border-slate-300 hover:border-[#0F2747] hover:text-[#0F2747]"
                  }`}
                >
                  <span
                    className={`font-mono text-[11px] ${
                      isActive ? "text-[#FFC83D]" : "text-slate-400 group-hover:text-[#0F2747]"
                    }`}
                  >
                    {ch.chapterNumber}
                  </span>
                  <span>{isVi ? ch.pillarVi : ch.pillarEn}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN STAGE: Split Layout (Left: Story & Milestone Card, Right: Interactive Academy Campus Network) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ================= LEFT COLUMN: Chapter Details & Milestone Card ================= */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            {/* Story Card Container */}
            <div className="bg-white rounded-md border-2 border-[#0F2747] p-6 sm:p-8 shadow-xs relative overflow-hidden transition-all duration-300">
              {/* Top Accent Strip */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5 transition-colors duration-300"
                style={{ backgroundColor: activeChapter.themeColor.primary }}
              />

              {/* Kicker & Chapter ID */}
              <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b-2 border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-black px-2 py-0.5 bg-[#0F2747] text-white rounded-sm">
                    CH.{activeChapter.chapterNumber}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4F7ECB]">
                    {isVi ? activeChapter.pillarVi : activeChapter.pillarEn}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                  <span>STEP</span>
                  <strong className="text-[#0F2747]">{activeStep + 1}</strong>
                  <span>/</span>
                  <span>{CHAPTERS.length}</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <h3 className="font-poppins font-black text-2xl sm:text-3xl text-[#0F2747] tracking-tight leading-snug mb-2">
                {isVi ? activeChapter.titleVi : activeChapter.titleEn}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-[#4F7ECB] mb-5">
                {isVi ? activeChapter.taglineVi : activeChapter.taglineEn}
              </p>

              {/* Body Copy */}
              <p className="text-sm sm:text-base text-[#475569] leading-relaxed mb-6">
                {isVi ? activeChapter.descriptionVi : activeChapter.descriptionEn}
              </p>

              {/* Key Metrics Strip (Samsung squarish style, thick borders) */}
              <div className="grid grid-cols-3 gap-3 p-3.5 bg-[#FAF7F2] rounded-md border-2 border-slate-200 mb-6">
                {activeChapter.metrics.map((m, idx) => (
                  <div key={idx} className="text-center px-1">
                    <div className="font-poppins font-black text-base sm:text-lg text-[#0F2747]">
                      {m.value}
                    </div>
                    <div className="text-[10px] sm:text-xs font-medium text-slate-500 truncate">
                      {isVi ? m.labelVi : m.labelEn}
                    </div>
                  </div>
                ))}
              </div>

              {/* Feature Highlights Checklist */}
              <div className="space-y-2.5 mb-7">
                {(isVi ? activeChapter.highlightsVi : activeChapter.highlightsEn).map(
                  (hl, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-xs bg-[#0F2747]/10 text-[#0F2747] flex items-center justify-center shrink-0 mt-0.5 font-mono text-[10px] font-bold">
                        ✦
                      </div>
                      <span className="text-xs sm:text-sm text-[#334155] font-medium leading-tight">
                        {hl}
                      </span>
                    </div>
                  )
                )}
              </div>

              {/* Action Buttons & Navigation Switcher */}
              <div className="pt-4 border-t-2 border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <Link
                  href={activeChapter.actionLink}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-[#0F2747] hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all shadow-2xs group cursor-pointer"
                >
                  <span>{isVi ? activeChapter.actionTextVi : activeChapter.actionTextEn}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#FFC83D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>

                {/* Prev / Next controls */}
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous chapter"
                    className="px-3 py-2 rounded-md bg-white border-2 border-slate-300 hover:border-[#0F2747] text-xs font-bold text-[#0F2747] transition cursor-pointer"
                  >
                    ← {isVi ? "Trước" : "Prev"}
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next chapter"
                    className="px-3 py-2 rounded-md bg-white border-2 border-slate-300 hover:border-[#0F2747] text-xs font-bold text-[#0F2747] transition cursor-pointer"
                  >
                    {isVi ? "Tiếp theo" : "Next"} →
                  </button>
                </div>
              </div>
            </div>

            {/* Academic Seal Dossier Card (Dấu Ấn Tri Thức) */}
            <div className="bg-[#FAF7EE] rounded-md border-2 border-[#0F2747]/20 p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5">
              {/* Embossed University Seal Stamp Graphic (No dots, crisp geometric seal) */}
              <div
                className="w-24 h-24 shrink-0 rounded-md border-2 border-dashed flex flex-col items-center justify-center text-center p-2 relative select-none"
                style={{
                  borderColor: activeChapter.themeColor.primary,
                  backgroundColor: activeChapter.themeColor.lightBg,
                }}
              >
                <div className="text-[9px] font-mono font-bold tracking-widest text-slate-500 uppercase">
                  SEAL OF
                </div>
                <div
                  className="font-poppins font-black text-sm my-0.5"
                  style={{ color: activeChapter.themeColor.primary }}
                >
                  THE PENCILY
                </div>
                <div className="w-8 h-0.5 bg-slate-300 my-0.5" />
                <div className="text-[9px] font-mono font-semibold text-slate-600">
                  {activeChapter.sealCrest}
                </div>
              </div>

              {/* Seal metadata */}
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-[11px] font-mono font-bold tracking-wider text-slate-500 uppercase">
                  {isVi ? "DẤU ẤN TRI THỨC ĐÃ XÁC THỰC" : "VERIFIED KNOWLEDGE SEAL"}
                </div>
                <div className="font-poppins font-bold text-sm sm:text-base text-[#0F2747]">
                  {isVi ? activeChapter.sealLabelVi : activeChapter.sealLabelEn}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {isVi
                    ? "Được bảo chứng theo tiêu chuẩn học thuật mở và quy chế Red Line Policy của cộng đồng The Pencily."
                    : "Guaranteed under open academic standards and The Pencily community Red Line Policy."}
                </p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: Interactive Campus Network Map ================= */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            {/* Interactive Campus SVG Vector Map */}
            <div className="bg-white rounded-md border-2 border-[#0F2747] p-5 sm:p-6 shadow-xs relative">
              {/* Campus Header & Coordinates */}
              <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-sm bg-[#0F2747] text-white flex items-center justify-center font-mono text-[10px] font-bold">
                    TP
                  </div>
                  <div>
                    <h4 className="font-poppins font-bold text-xs text-[#0F2747]">
                      {isVi ? "BẢN ĐỒ HỆ SINH THÁI TRI THỨC" : "ACADEMY ECOSYSTEM BLUEPRINT"}
                    </h4>
                    <p className="text-[10px] font-mono text-slate-400">
                      GRID REF: CAMPUS-05 • CLICK A NODE TO NAVIGATE
                    </p>
                  </div>
                </div>

                <div className="px-2 py-0.5 rounded-sm bg-slate-100 border border-slate-200 text-[10px] font-mono font-bold text-slate-600">
                  5 NODES
                </div>
              </div>

              {/* SVG Blueprint Canvas */}
              <div className="relative aspect-[600/500] w-full bg-[#FAF7EE] rounded-sm border-2 border-slate-200 overflow-hidden">
                {/* Background Compass Watermark */}
                <div className="absolute right-3 top-3 pointer-events-none opacity-20 text-[10px] font-mono font-bold text-[#0F2747] text-right">
                  <div>✦ N 00°00&apos;</div>
                  <div>THE PENCILY</div>
                </div>

                <svg
                  viewBox="0 0 600 500"
                  className="w-full h-full select-none"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Grid Lines */}
                  <defs>
                    <pattern
                      id="grid-pattern"
                      width="40"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 40 0 L 0 0 0 40"
                        fill="none"
                        stroke="#0F2747"
                        strokeWidth="0.5"
                        strokeOpacity="0.08"
                      />
                    </pattern>
                  </defs>
                  <rect width="600" height="500" fill="url(#grid-pattern)" />

                  {/* Interconnecting SVG Conduits (Geometric Curves) */}
                  <g className="conduits">
                    {/* Path 1 -> 3 (Pod to Cornell Hub) */}
                    <path
                      d="M 110 110 Q 200 180 300 250"
                      fill="none"
                      stroke={activeStep === 0 || activeStep === 2 ? "#0F2747" : "#CBD5E1"}
                      strokeWidth={activeStep === 0 || activeStep === 2 ? "2.5" : "1.5"}
                      strokeDasharray={activeStep === 0 || activeStep === 2 ? "6 3" : "none"}
                    />
                    {/* Path 2 -> 3 (Tutors to Cornell Hub) */}
                    <path
                      d="M 490 110 Q 400 180 300 250"
                      fill="none"
                      stroke={activeStep === 1 || activeStep === 2 ? "#0F2747" : "#CBD5E1"}
                      strokeWidth={activeStep === 1 || activeStep === 2 ? "2.5" : "1.5"}
                      strokeDasharray={activeStep === 1 || activeStep === 2 ? "6 3" : "none"}
                    />
                    {/* Path 1 -> 2 (Top Cross-Connection) */}
                    <path
                      d="M 110 110 Q 300 70 490 110"
                      fill="none"
                      stroke="#CBD5E1"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />
                    {/* Path 3 -> 4 (Cornell Hub to Merit Shop) */}
                    <path
                      d="M 300 250 Q 200 320 110 400"
                      fill="none"
                      stroke={activeStep === 2 || activeStep === 3 ? "#0F2747" : "#CBD5E1"}
                      strokeWidth={activeStep === 2 || activeStep === 3 ? "2.5" : "1.5"}
                      strokeDasharray={activeStep === 2 || activeStep === 3 ? "6 3" : "none"}
                    />
                    {/* Path 3 -> 5 (Cornell Hub to Certification) */}
                    <path
                      d="M 300 250 Q 400 320 490 400"
                      fill="none"
                      stroke={activeStep === 2 || activeStep === 4 ? "#0F2747" : "#CBD5E1"}
                      strokeWidth={activeStep === 2 || activeStep === 4 ? "2.5" : "1.5"}
                      strokeDasharray={activeStep === 2 || activeStep === 4 ? "6 3" : "none"}
                    />
                    {/* Path 4 -> 5 (Bottom Cross-Connection) */}
                    <path
                      d="M 110 400 Q 300 440 490 400"
                      fill="none"
                      stroke="#CBD5E1"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />
                  </g>

                  {/* Nodes Rendering */}
                  {CHAPTERS.map((ch, idx) => {
                    const isActive = activeStep === idx;
                    const isHovered = hoveredNode === idx;
                    const { cx, cy } = ch.mapNode;

                    return (
                      <g
                        key={ch.id}
                        className="cursor-pointer transition-all duration-200"
                        onClick={() => handleSelectChapter(idx)}
                        onMouseEnter={() => setHoveredNode(idx)}
                        onMouseLeave={() => setHoveredNode(null)}
                      >
                        {/* Outer Geometric Target Ring when active (NO DOTS, clean square/circle outline) */}
                        {isActive && (
                          <circle
                            cx={cx}
                            cy={cy}
                            r="42"
                            fill="none"
                            stroke={ch.themeColor.primary}
                            strokeWidth="1.5"
                            strokeDasharray="3 3"
                            className="animate-spin"
                            style={{ animationDuration: "20s", transformOrigin: `${cx}px ${cy}px` }}
                          />
                        )}

                        {/* Node Halo Base */}
                        <circle
                          cx={cx}
                          cy={cy}
                          r={isActive ? "32" : isHovered ? "28" : "24"}
                          fill={isActive ? "#0F2747" : isHovered ? "#1E293B" : "#FFFFFF"}
                          stroke={isActive ? ch.themeColor.primary : "#0F2747"}
                          strokeWidth={isActive ? "3" : "2"}
                          className="transition-all duration-200"
                        />

                        {/* Node Label Inside (Number/Symbol) */}
                        <text
                          x={cx}
                          y={cy + 5}
                          textAnchor="middle"
                          fill={isActive || isHovered ? "#FFFFFF" : "#0F2747"}
                          fontSize={isActive ? "14" : "12"}
                          fontWeight="bold"
                          fontFamily="monospace"
                        >
                          {ch.chapterNumber}
                        </text>

                        {/* Badge Label Under the Node */}
                        <g transform={`translate(${cx}, ${cy + 42})`}>
                          <rect
                            x="-65"
                            y="-10"
                            width="130"
                            height="20"
                            rx="3"
                            fill={isActive ? "#0F2747" : "#FFFFFF"}
                            stroke={isActive ? ch.themeColor.primary : "#CBD5E1"}
                            strokeWidth="1.5"
                          />
                          <text
                            x="0"
                            y="4"
                            textAnchor="middle"
                            fill={isActive ? "#FFFFFF" : "#0F2747"}
                            fontSize="9"
                            fontWeight="bold"
                            fontFamily="sans-serif"
                          >
                            {isVi ? ch.mapNode.shortLabelVi : ch.mapNode.shortLabelEn}
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Node Telemetry Box (HUD Specs under the map) */}
              <div className="mt-4 p-3.5 bg-[#FAF7F2] rounded-md border-2 border-slate-200 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] font-bold text-slate-500 uppercase">
                    {isVi ? "THÔNG SỐ PHÂN HỆ ĐANG CHỌN" : "ACTIVE SUBSYSTEM TELEMETRY"}
                  </span>
                  <span className="font-mono text-[11px] font-bold text-[#4F7ECB]">
                    [{activeChapter.mapNode.code}]
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block">
                      {isVi ? "Tên phân hệ:" : "Module Name:"}
                    </span>
                    <strong className="text-[#0F2747]">
                      {isVi ? activeChapter.pillarVi : activeChapter.pillarEn}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">
                      {isVi ? "Trạng thái:" : "Status:"}
                    </span>
                    <strong className="text-emerald-700 font-mono">
                      ONLINE / VERIFIED
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Fast-Track Links to Explore Other Areas */}
            <div className="p-4 bg-white rounded-md border-2 border-slate-300 flex items-center justify-between gap-3">
              <div className="text-xs">
                <div className="font-bold text-[#0F2747]">
                  {isVi ? "Bạn muốn trải nghiệm ngay?" : "Want to test instantly?"}
                </div>
                <div className="text-slate-500 text-[11px]">
                  {isVi
                    ? "Tự do đi dạo dashboard và xem các lớp học mở mà không cần đăng nhập."
                    : "Freely explore dashboard and browse open classes without logging in."}
                </div>
              </div>
              <Link
                href="/dashboard"
                className="shrink-0 px-3.5 py-2 rounded-md bg-[#FAF7F2] hover:bg-[#0F2747] text-[#0F2747] hover:text-white border-2 border-[#0F2747] text-xs font-bold transition-colors"
              >
                {isVi ? "Mở Dashboard" : "Open Dashboard"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
