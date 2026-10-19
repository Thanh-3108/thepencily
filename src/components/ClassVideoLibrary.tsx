"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Clock,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  FileText,
  BookOpen,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ListVideo,
  Search,
  ExternalLink,
  GraduationCap,
  Calendar,
  Gift,
  HelpCircle,
  Sparkles,
  Share2,
  Layers,
  Award,
  ChevronRight,
  BookmarkCheck,
  Check,
  RefreshCw,
} from "lucide-react";
import { usePencily } from "@/context/PencilyContext";
import { OwlMascot } from "@/components/Logo";

// Declare YT window global
declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export interface VideoTranscriptItem {
  time: string;
  seconds: number;
  speaker: string;
  text: string;
}

export interface SyllabusChapter {
  id: string;
  title: string;
  time: string;
  seconds: number;
  summary: string;
}

export interface MilestoneOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface VideoMilestone {
  id: string;
  seconds: number;
  timeFormatted: string;
  title: string;
  question: string;
  options: MilestoneOption[];
  points: number;
  hint?: string;
}

export interface TutorInfo {
  name: string;
  avatar: string;
  school: string;
  grade: string;
  bio: string;
  sessions: number;
  specialty: string;
  badge?: string;
}

export interface VideoLesson {
  id: string;
  youtubeId: string;
  title: string;
  duration: string;
  totalSeconds: number;
  subject: string;
  gradeLevel: string;
  tutor: TutorInfo;
  syllabus: SyllabusChapter[];
  transcript: VideoTranscriptItem[];
  milestones: VideoMilestone[];
}

export function getDefaultLessons(isVi: boolean): VideoLesson[] {
  return [
    {
      id: "ptnk-hoa-11-chuan-do-acid-base",
      youtubeId: "__v3ZZldoCg",
      title: isVi
        ? "Video Bài giảng: Phương pháp chuẩn độ Acid-Base"
        : "Video Lecture: Acid-Base Titration Method",
      duration: "10:59",
      totalSeconds: 659,
      subject: isVi ? "Hóa Học 11 • Thí Nghiệm & Chuẩn Độ" : "Chemistry 11 • Titration Labs",
      gradeLevel: isVi ? "Chương trình GDPT Hóa 11 Mới" : "Grade 11 Chemistry",
      tutor: {
        name: isVi ? "Tổ Hóa học Trường PTNK & Ban Học thuật The Pencily" : "PTNK Chemistry Faculty & The Pencily Academic Board",
        avatar: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=256&q=80",
        school: isVi ? "Trường Phổ thông Năng khiếu (PTNK) - ĐHQG TP.HCM" : "High School for the Gifted (PTNK) - VNU HCM",
        grade: isVi ? "Học liệu số & Cố vấn chuyên môn" : "Digital Curriculum & Subject Mentor",
        bio: isVi
          ? "Bài giảng trực quan theo chương trình Hóa học 11 mới, hướng dẫn quy tắc chuẩn độ dung dịch acid - base, kỹ thuật dùng burette, pipette và chất chỉ thị phenolphthalein."
          : "Interactive video lecture following the modern grade 11 curriculum, explaining titration principles, burette and indicator techniques.",
        sessions: 1420,
        specialty: isVi ? "Hóa Phân Tích & Hóa Đại Cương" : "Analytical & General Chemistry",
        badge: isVi ? "Học liệu PTNK" : "PTNK Certified",
      },
      syllabus: [
        {
          id: "ch-1",
          title: isVi ? "1. Mục tiêu bài học & Khái niệm chuẩn độ" : "1. Objectives & Titration Concept",
          time: "0:39",
          seconds: 39,
          summary: isVi
            ? "Nêu nguyên tắc xác định nồng độ acid mạnh, base mạnh bằng phương pháp chuẩn độ thể tích."
            : "Core principle of volumetric acid-base titration using standardized solutions.",
        },
        {
          id: "ch-2",
          title: isVi ? "2. Bộ dụng cụ chuẩn độ: Burette, Pipette, Erlenmeyer" : "2. Apparatus: Burette, Pipette, Flask",
          time: "2:45",
          seconds: 165,
          summary: isVi
            ? "Cách tráng rửa, nạp dung dịch vào burette và kỹ thuật lấy thể tích chính xác bằng pipette bầu."
            : "Proper handling, rinsing and meniscus reading techniques for burettes and volumetric pipettes.",
        },
        {
          id: "ch-3",
          title: isVi ? "3. Chất chỉ thị màu & Điểm tương đương" : "3. Indicators & Equivalence Point",
          time: "6:15",
          seconds: 375,
          summary: isVi
            ? "Hiện tượng đổi màu của Phenolphthalein tại điểm kết thúc chuẩn độ (hồng nhạt bền vững)."
            : "Color transition of phenolphthalein indicator at the stoichiometric end point.",
        },
        {
          id: "ch-4",
          title: isVi ? "4. Công thức tính toán nồng độ mol & Sai số" : "4. Molarity Calculation & Error Analysis",
          time: "9:20",
          seconds: 560,
          summary: isVi
            ? "Áp dụng định luật đương lượng C1.V1 = C2.V2 để tìm nồng độ dung dịch acid/base chưa biết."
            : "Applying C1.V1 = C2.V2 to calculate unknown acid/base concentration with precision.",
        },
      ],
      transcript: [
        { time: "0:05", seconds: 5, speaker: "Cô giáo PTNK", text: isVi ? "Chào các em học sinh, hôm nay chúng ta cùng tìm hiểu chuyên đề Phương pháp chuẩn độ Acid-Base." : "Welcome students, today we explore the Acid-Base Titration Method." },
        { time: "0:20", seconds: 20, speaker: "Cô giáo PTNK", text: isVi ? "Mục tiêu bài học: Nêu được nguyên tắc xác định nồng độ acid mạnh, base mạnh bằng phương pháp chuẩn độ." : "Lesson objective: State the principle of determining strong acid/base concentrations via titration." },
        { time: "0:39", seconds: 39, speaker: "Cô giáo PTNK", text: isVi ? "Trình bày được nguyên tắc xác định nồng độ của axit mạnh và chuẩn bị thực hành đo đạc." : "Presenting the core theory behind neutralizing acids and quantitative measurement." },
        { time: "1:15", seconds: 75, speaker: "Cô giáo PTNK", text: isVi ? "Chuẩn độ là phương pháp xác định nồng độ của một chất bằng một dung dịch khác đã biết chính xác nồng độ." : "Titration determines an unknown concentration using a carefully standardized solution." },
        { time: "2:45", seconds: 165, speaker: "Cô giáo PTNK", text: isVi ? "Chúng ta sử dụng một burette chứa dung dịch chuẩn NaOH 0.1M và bình tam giác chứa HCl cần xác định." : "We use a burette filled with 0.1M standard NaOH and a conical flask holding the unknown HCl." },
        { time: "4:10", seconds: 250, speaker: "Cô giáo PTNK", text: isVi ? "Khi nhỏ dung dịch, tay trái vòng qua khóa burette điều chỉnh từng giọt, tay phải lắc đều bình tam giác." : "Turn the stopcock with your left hand while gently swirling the flask with your right." },
        { time: "6:15", seconds: 375, speaker: "Cô giáo PTNK", text: isVi ? "Khi dung dịch xuất hiện màu hồng nhạt bền vững trong 30 giây, đó chính là điểm dừng chuẩn độ." : "When the solution turns pale pink and remains for 30 seconds, we reached the end point." },
        { time: "8:00", seconds: 480, speaker: "Cô giáo PTNK", text: isVi ? "Ghi lại thể tích NaOH đã dùng trên vạch chia của burette ngang tầm mắt để tránh sai số khúc xạ." : "Read the burette volume at eye level to avoid parallax errors." },
        { time: "9:20", seconds: 560, speaker: "Cô giáo PTNK", text: isVi ? "Áp dụng công thức C_acid nhân V_acid bằng C_base nhân V_base để tính ra nồng độ mol chính xác." : "Apply C_acid * V_acid = C_base * V_base to calculate the exact molarity." },
      ],
      milestones: [
        {
          id: "m-1",
          seconds: 39,
          timeFormatted: "0:39",
          title: isVi ? "Cột mốc 1: Mục tiêu & Nguyên tắc Chuẩn độ" : "Milestone 1: Principle of Titration",
          question: isVi
            ? "Mục đích chính của phương pháp chuẩn độ acid - base là gì?"
            : "What is the primary objective of an acid-base titration?",
          options: [
            {
              id: "opt-1a",
              text: isVi
                ? "Xác định nồng độ của dung dịch acid (hoặc base) chưa biết bằng một dung dịch chuẩn đã biết chính xác nồng độ."
                : "Determine the concentration of an unknown acid/base solution using a known standard solution.",
              isCorrect: true,
              explanation: isVi
                ? "Chính xác! Chuẩn độ là phương pháp phân tích định lượng thể tích dựa trên phản ứng trung hòa vừa đủ với dung dịch chuẩn."
                : "Correct! Titration is a quantitative volumetric analysis technique based on exact neutralization with a standard solution.",
            },
            {
              id: "opt-1b",
              text: isVi
                ? "Làm biến đổi màu sắc dung dịch sang màu đỏ để kiểm tra độ độc hại của hóa chất."
                : "Change the solution color to red to test chemical toxicity.",
              isCorrect: false,
              explanation: isVi
                ? "Chưa đúng. Màu sắc đổi là do chất chỉ thị pH, mục đích thực sự là xác định nồng độ mol của dung dịch."
                : "Incorrect. The color change is just an indicator transition; the true goal is finding the concentration.",
            },
            {
              id: "opt-1c",
              text: isVi
                ? "Tách kết tủa không tan giữa acid mạnh và base mạnh ra khỏi hỗn hợp."
                : "Precipitate an insoluble salt from the acid-base mixture.",
              isCorrect: false,
              explanation: isVi
                ? "Chưa đúng. Phản ứng giữa acid mạnh và base mạnh sinh ra muối tan và nước (H+ + OH- -> H2O), không tạo kết tủa."
                : "Incorrect. Strong acid and base neutralization yields soluble salt and water, not a precipitate.",
            },
            {
              id: "opt-1d",
              text: isVi
                ? "Đo nhiệt độ sôi của dung dịch acid khi hòa tan trong nước cất."
                : "Measure the boiling point of the acid solution in distilled water.",
              isCorrect: false,
              explanation: isVi
                ? "Chưa đúng. Chuẩn độ không đo nhiệt độ sôi mà đo thể tích dung dịch chuẩn tiêu tốn."
                : "Incorrect. Titration measures consumed volume, not boiling points.",
            },
          ],
          points: 5,
          hint: isVi ? "Gợi ý: Hãy chú ý từ khóa 'xác định nồng độ' và 'dung dịch chuẩn'." : "Hint: Focus on 'determining concentration' using a 'standard solution'.",
        },
        {
          id: "m-2",
          seconds: 165,
          timeFormatted: "2:45",
          title: isVi ? "Cột mốc 2: Dụng cụ chứa dung dịch chuẩn" : "Milestone 2: Titration Apparatus",
          question: isVi
            ? "Trong thí nghiệm chuẩn độ, dụng cụ chia độ có khóa điều chỉnh giọt dùng để chứa dung dịch chuẩn là gì?"
            : "In a titration setup, which glassware with a stopcock holds the titrant?",
          options: [
            {
              id: "opt-2a",
              text: isVi ? "Burette (buret)" : "Burette",
              isCorrect: true,
              explanation: isVi
                ? "Chính xác! Burette là ống thủy tinh chia độ có khóa ở đáy giúp kiểm soát chính xác thể tích dung dịch nhỏ xuống."
                : "Correct! A burette is calibrated glassware with a stopcock to precisely dispense the titrant.",
            },
            {
              id: "opt-2b",
              text: isVi ? "Ống đong hình trụ (graduated cylinder)" : "Graduated cylinder",
              isCorrect: false,
              explanation: isVi
                ? "Chưa đúng. Ống đong có độ chia lớn và không có khóa nhỏ giọt nên độ chính xác không đủ cho chuẩn độ."
                : "Incorrect. Measuring cylinders lack precise drop control and volumetric accuracy.",
            },
            {
              id: "opt-2c",
              text: isVi ? "Cốc thủy tinh chịu nhiệt (Beaker)" : "Beaker",
              isCorrect: false,
              explanation: isVi
                ? "Chưa đúng. Cốc thủy tinh chỉ dùng để chứa hóa chất trung gian, vạch chia chỉ mang tính ước lượng."
                : "Incorrect. Beakers are for rough holding, not precise titration delivery.",
            },
            {
              id: "opt-2d",
              text: isVi ? "Phễu chiết quả lê" : "Separatory funnel",
              isCorrect: false,
              explanation: isVi
                ? "Chưa đúng. Phễu chiết dùng để chiết tách 2 chất lỏng không hòa tan vào nhau."
                : "Incorrect. Separatory funnels are used for liquid-liquid extraction.",
            },
          ],
          points: 5,
          hint: isVi ? "Dụng cụ hình ống dài, có vạch chia từ 0 đến 25ml hoặc 50ml và có khóa xoay ở đáy." : "Long cylindrical tube with stopcock.",
        },
        {
          id: "m-3",
          seconds: 375,
          timeFormatted: "6:15",
          title: isVi ? "Cột mốc 3: Nhận biết Điểm dừng chuẩn độ" : "Milestone 3: Detecting End Point",
          question: isVi
            ? "Khi chuẩn độ HCl bằng dung dịch chuẩn NaOH với chất chỉ thị Phenolphthalein, dấu hiệu nào cho biết phản ứng vừa đủ (điểm dừng)?"
            : "When titrating HCl with NaOH using phenolphthalein indicator, how do you spot the end point?",
          options: [
            {
              id: "opt-3a",
              text: isVi
                ? "Dung dịch trong bình tam giác từ không màu chuyển sang màu hồng nhạt bền vững trong 30 giây."
                : "The solution turns from colorless to faint persistent pink for 30 seconds.",
              isCorrect: true,
              explanation: isVi
                ? "Chính xác! Khi 1 giọt NaOH dư làm pH vượt qua điểm tương đương (~8.2), phenolphthalein chuyển sang màu hồng nhạt báo hiệu kết thúc chuẩn độ."
                : "Correct! When a tiny excess drop of NaOH elevates the pH above 8.2, phenolphthalein exhibits a persistent faint pink shade.",
            },
            {
              id: "opt-3b",
              text: isVi
                ? "Dung dịch xuất hiện kết tủa trắng đục và tỏa nhiều khói trắng."
                : "A dense white precipitate forms with white smoke.",
              isCorrect: false,
              explanation: isVi
                ? "Chưa đúng. Phản ứng trung hòa HCl + NaOH không tạo kết tủa hay khói trắng."
                : "Incorrect. Neutralization creates soluble NaCl, not precipitates.",
            },
            {
              id: "opt-3c",
              text: isVi
                ? "Dung dịch chuyển sang màu xanh dương đậm ngay lập tức."
                : "The solution flashes intense deep blue.",
              isCorrect: false,
              explanation: isVi
                ? "Chưa đúng. Phenolphthalein chỉ chuyển từ không màu sang hồng hoặc tím đỏ trong môi trường kiềm."
                : "Incorrect. Phenolphthalein transitions from colorless to pink, never blue.",
            },
            {
              id: "opt-3d",
              text: isVi
                ? "Bình tam giác rung lắc mạnh và phát ra tiếng nổ lách tách."
                : "The flask violently rattles and crackles.",
              isCorrect: false,
              explanation: isVi
                ? "Chưa đúng. Chuẩn độ là thao tác thí nghiệm êm dịu, không gây nổ."
                : "Incorrect. Titration is an orderly and controlled chemical operation.",
            },
          ],
          points: 5,
          hint: isVi ? "Chất chỉ thị phenolphthalein trong môi trường base chuyển sang màu gì?" : "Recall phenolphthalein color in basic medium.",
        },
        {
          id: "m-4",
          seconds: 560,
          timeFormatted: "9:20",
          title: isVi ? "Cột mốc 4: Công thức tính toán Nồng độ Mol" : "Milestone 4: Concentration Formula",
          question: isVi
            ? "Tại điểm tương đương của phản ứng HCl + NaOH → NaCl + H2O, hệ thức nào sau đây được dùng để tính nồng độ mol C_acid?"
            : "At the equivalence point of HCl + NaOH, which formula yields C_acid?",
          options: [
            {
              id: "opt-4a",
              text: isVi ? "C_acid = (C_base × V_base) / V_acid" : "C_acid = (C_base * V_base) / V_acid",
              isCorrect: true,
              explanation: isVi
                ? "Chính xác! Vì số mol n_acid = n_base (tỉ lệ 1:1), nên C_acid × V_acid = C_base × V_base, suy ra C_acid = (C_base × V_base) / V_acid."
                : "Correct! Due to 1:1 stoichiometry, n_acid = n_base, hence C_acid * V_acid = C_base * V_base.",
            },
            {
              id: "opt-4b",
              text: isVi ? "C_acid = (C_base × V_acid) / V_base" : "C_acid = (C_base * V_acid) / V_base",
              isCorrect: false,
              explanation: isVi
                ? "Chưa đúng. Phép biến đổi công thức bị nghịch đảo thể tích."
                : "Incorrect. The volume terms are inverted.",
            },
            {
              id: "opt-4c",
              text: isVi ? "C_acid = C_base + V_base - V_acid" : "C_acid = C_base + V_base - V_acid",
              isCorrect: false,
              explanation: isVi
                ? "Chưa đúng. Không thể cộng trừ nồng độ mol với thể tích lít."
                : "Incorrect. Units cannot be directly added.",
            },
            {
              id: "opt-4d",
              text: isVi ? "C_acid = C_base × V_base × V_acid" : "C_acid = C_base * V_base * V_acid",
              isCorrect: false,
              explanation: isVi
                ? "Chưa đúng. Đây không phải biểu thức của định luật đương lượng."
                : "Incorrect. This violates stoichiometric conservation.",
            },
          ],
          points: 5,
          hint: isVi ? "Áp dụng định luật bảo toàn số mol: n_acid = n_base." : "Apply mole equivalence: n_acid = n_base.",
        },
      ],
    },
    {
      id: "sat-math-quadratic-speed",
      youtubeId: "WTsaFN9hmOE",
      title: isVi
        ? "Video Bài giảng: Digital SAT Math - Kỹ thuật Giải Nhanh Đồ Thị Bậc Hai & Parabola"
        : "Video Lecture: Digital SAT Math - Quick Vertex & Parabola Tricks",
      duration: "12:40",
      totalSeconds: 760,
      subject: isVi ? "Toán Học • Digital SAT Math" : "Mathematics • Digital SAT",
      gradeLevel: isVi ? "Chương trình Luyện thi Chuẩn hóa SAT" : "SAT Standardized Prep",
      tutor: {
        name: "Nguyễn Minh Đức",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
        school: isVi ? "Đại học Bách Khoa TP.HCM & Peer Tutor The Pencily" : "HCMUT & The Pencily Senior Peer Tutor",
        grade: isVi ? "SAT 1560 (Math 800)" : "SAT 1560 (Math 800)",
        bio: isVi
          ? "Thủ khoa khối A1, hướng dẫn chiến thuật đọc đồ thị bậc hai Desmos, công thức đỉnh Parabola và bẫy nghiệm phương trình trong bài thi Digital SAT."
          : "SAT Math 800 mentor sharing vertex speed strategies and Desmos shortcuts.",
        sessions: 340,
        specialty: isVi ? "Toán Cao Cấp & Digital SAT" : "Advanced Math & SAT Prep",
        badge: isVi ? "Math 800 Tutor" : "Math 800 Tutor",
      },
      syllabus: [
        {
          id: "sat-ch-1",
          title: isVi ? "1. Tọa độ đỉnh Parabola (-b/2a) & Giá trị cực trị" : "1. Vertex Formula (-b/2a) & Extremum",
          time: "0:45",
          seconds: 45,
          summary: isVi ? "Bí quyết tìm nhanh tọa độ đỉnh không cần đạo hàm." : "Fast vertex identification without derivatives.",
        },
        {
          id: "sat-ch-2",
          title: isVi ? "2. Định lý Vi-et và tổng tích hai nghiệm" : "2. Vieta Formulas for Sum and Product",
          time: "4:30",
          seconds: 270,
          summary: isVi ? "Sử dụng S = -b/a và P = c/a để triệt tiêu thời gian bấm máy." : "Eliminate manual steps using Vieta rules.",
        },
        {
          id: "sat-ch-3",
          title: isVi ? "3. Biện luận số giao điểm bằng biệt thức Delta" : "3. Discriminant Delta & Intersections",
          time: "8:50",
          seconds: 530,
          summary: isVi ? "Dấu hiệu Delta > 0, = 0, < 0 trong các bài toán chứa tham số k." : "Analyzing zero, one or two roots in parametric SAT questions.",
        },
      ],
      transcript: [
        { time: "0:10", seconds: 10, speaker: "Minh Đức", text: isVi ? "Chào các bạn! Trong Digital SAT Math, phần Parabola chiếm tới 15% tổng số câu hỏi Đại số." : "Hello everyone! Parabolas make up 15% of algebra questions on Digital SAT." },
        { time: "0:45", seconds: 45, speaker: "Minh Đức", text: isVi ? "Hãy luôn nhớ tọa độ đỉnh h bằng trừ b chia cho 2a khi đề bài hỏi giá trị lớn nhất hoặc nhỏ nhất." : "Always remember h = -b / (2a) when asked for maximum or minimum values." },
        { time: "4:30", seconds: 270, speaker: "Minh Đức", text: isVi ? "Đừng bao giờ giải từng nghiệm x1, x2 nếu đề bài chỉ hỏi tổng nghiệm x1 + x2." : "Never compute individual roots if the question only seeks x1 + x2." },
        { time: "8:50", seconds: 530, speaker: "Minh Đức", text: isVi ? "Khi đường thẳng tiếp xúc với parabol, delta của phương trình hoành độ giao điểm luôn bằng 0." : "When a line is tangent to a parabola, the discriminant delta is strictly 0." },
      ],
      milestones: [
        {
          id: "sat-m-1",
          seconds: 45,
          timeFormatted: "0:45",
          title: isVi ? "Cột mốc 1: Tọa độ hoành độ đỉnh Parabola" : "Milestone 1: Vertex x-coordinate",
          question: isVi
            ? "Cho hàm số f(x) = 2x² - 8x + 5. Hoành độ của đỉnh parabol đạt giá trị là bao nhiêu?"
            : "For f(x) = 2x² - 8x + 5, what is the x-coordinate of the vertex?",
          options: [
            {
              id: "sat-opt-1a",
              text: "x = 2",
              isCorrect: true,
              explanation: isVi
                ? "Chính xác! Công thức hoành độ đỉnh x_v = -b / (2a) = -(-8) / (2 × 2) = 8 / 4 = 2."
                : "Correct! x_v = -b / (2a) = -(-8) / (2 * 2) = 2.",
            },
            {
              id: "sat-opt-1b",
              text: "x = -2",
              isCorrect: false,
              explanation: isVi ? "Chưa đúng. Chú ý dấu trừ trong công thức -b / (2a)." : "Incorrect. Check the sign in -b / (2a).",
            },
            {
              id: "sat-opt-1c",
              text: "x = 4",
              isCorrect: false,
              explanation: isVi ? "Chưa đúng. Mẫu số phải là 2a = 4, do đó 8 / 4 = 2." : "Incorrect. The denominator is 2a.",
            },
            {
              id: "sat-opt-1d",
              text: "x = -4",
              isCorrect: false,
              explanation: isVi ? "Chưa đúng. Vui lòng kiểm tra lại phép tính." : "Incorrect. Recalculate -(-8) / (2*2).",
            },
          ],
          points: 5,
        },
        {
          id: "sat-m-2",
          seconds: 270,
          timeFormatted: "4:30",
          title: isVi ? "Cột mốc 2: Định lý Vi-et thần tốc" : "Milestone 2: Quick Vieta Theorem",
          question: isVi
            ? "Phương trình x² - 14x + 48 = 0 có hai nghiệm phân biệt x1 và x2. Giá trị của (x1 + x2) là:"
            : "For x² - 14x + 48 = 0 with roots x1 and x2, what is (x1 + x2)?",
          options: [
            {
              id: "sat-opt-2a",
              text: "14",
              isCorrect: true,
              explanation: isVi
                ? "Chính xác! Theo định lý Vi-et: x1 + x2 = -b / a = -(-14) / 1 = 14 mà không cần phân tích đa thức thành nhân tử."
                : "Correct! Vieta's theorem gives x1 + x2 = -(-14) / 1 = 14 instantly.",
            },
            {
              id: "sat-opt-2b",
              text: "-14",
              isCorrect: false,
              explanation: isVi ? "Chưa đúng. -(-14) là dương 14." : "Incorrect. -(-14) is positive 14.",
            },
            {
              id: "sat-opt-2c",
              text: "48",
              isCorrect: false,
              explanation: isVi ? "Chưa đúng. 48 là tích hai nghiệm (x1 × x2)." : "Incorrect. 48 is the product x1 * x2.",
            },
            {
              id: "sat-opt-2d",
              text: "7",
              isCorrect: false,
              explanation: isVi ? "Chưa đúng. 7 là trung bình cộng hai nghiệm." : "Incorrect. 7 is the average of roots.",
            },
          ],
          points: 5,
        },
      ],
    },
    {
      id: "ielts-writing-task-2-mastery",
      youtubeId: "uE7Np9W6Ors",
      title: isVi
        ? "Video Bài giảng: IELTS Writing Task 2 - Paraphrase & Thesis Statement Đạt Band 8.0"
        : "Video Lecture: IELTS Writing Task 2 - 8.0 Intro & Thesis Statement",
      duration: "14:15",
      totalSeconds: 855,
      subject: isVi ? "Tiếng Anh • IELTS Academic Writing" : "English • IELTS Academic",
      gradeLevel: isVi ? "Luyện thi Chứng chỉ Quốc tế IELTS" : "IELTS International Certification",
      tutor: {
        name: "Trần Mai Anh",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
        school: isVi ? "Học viện Ngoại giao & Peer Tutor The Pencily" : "Diplomatic Academy & The Pencily Tutor",
        grade: isVi ? "IELTS Overall 8.5 (Writing 8.0)" : "IELTS Overall 8.5 (Writing 8.0)",
        bio: isVi
          ? "Cố vấn phương pháp viết luận học thuật Task 2, hướng dẫn cấu trúc mở bài 2 câu gãy gọn, chuyển ngữ từ vựng C1/C2 tự nhiên và trả lời dứt khoát prompt."
          : "IELTS 8.5 mentor showing exact 2-sentence intro templates and academic paraphrasing.",
        sessions: 512,
        specialty: isVi ? "IELTS Writing & Speaking" : "IELTS Writing & Speaking",
        badge: isVi ? "IELTS 8.5 Mentor" : "IELTS 8.5 Mentor",
      },
      syllabus: [
        {
          id: "ielts-ch-1",
          title: isVi ? "1. Phân tích yêu cầu đề bài (Prompt Deconstruction)" : "1. Prompt Deconstruction",
          time: "1:00",
          seconds: 60,
          summary: isVi ? "Xác định dạng bài Opinion, Discussion hay Two-part question." : "Classify prompt type accurately.",
        },
        {
          id: "ielts-ch-2",
          title: isVi ? "2. Kỹ thuật Paraphrase câu dẫn chủ đề" : "2. Academic Paraphrasing Techniques",
          time: "5:20",
          seconds: 320,
          summary: isVi ? "Biến đổi từ loại (nominalisation) và dùng từ đồng nghĩa chuẩn xác." : "Use word-family shifts and precise synonyms.",
        },
        {
          id: "ielts-ch-3",
          title: isVi ? "3. Viết Thesis Statement thể hiện lập trường dứt khoát" : "3. Drafting a Direct Thesis Statement",
          time: "10:15",
          seconds: 615,
          summary: isVi ? "Cách trình bày quan điểm người viết rõ ràng ngay trong phần mở bài." : "State your clear stance in the introductory paragraph.",
        },
      ],
      transcript: [
        { time: "0:15", seconds: 15, speaker: "Mai Anh", text: isVi ? "Chào các bạn! Một mở bài Task 2 chuẩn mực chỉ cần đúng 2 câu và hoàn thành trong tối đa 5 phút." : "Hello! A solid Task 2 intro needs just two sentences written within 5 minutes." },
        { time: "1:00", seconds: 60, speaker: "Mai Anh", text: isVi ? "Câu thứ nhất để paraphrase lại đề bài, và câu thứ hai là thesis statement thể hiện rõ quan điểm của bạn." : "Sentence one paraphrases the prompt, while sentence two states your clear thesis." },
        { time: "5:20", seconds: 320, speaker: "Mai Anh", text: isVi ? "Tránh thay thế từ mù quáng bằng từ điển thesaurus; hãy ưu tiên thay đổi cấu trúc ngữ pháp trước." : "Avoid blind synonym substitution; prioritize grammatical restructuring first." },
      ],
      milestones: [
        {
          id: "ielts-m-1",
          seconds: 60,
          timeFormatted: "1:00",
          title: isVi ? "Cột mốc 1: Cấu trúc mở bài tối ưu" : "Milestone 1: Optimal Intro Structure",
          question: isVi
            ? "Độ dài và số lượng câu lý tưởng cho phần Mở bài (Introduction) của bài luận IELTS Writing Task 2 là bao nhiêu?"
            : "What is the recommended sentence count for an IELTS Task 2 introduction?",
          options: [
            {
              id: "ielts-opt-1a",
              text: isVi
                ? "2 câu (1 câu Paraphrase đề bài + 1 câu Thesis Statement trả lời trực diện câu hỏi)"
                : "2 sentences (1 Paraphrase sentence + 1 direct Thesis Statement)",
              isCorrect: true,
              explanation: isVi
                ? "Chính xác! Cấu trúc 2 câu (khoảng 35 - 45 từ) giúp bạn tiết kiệm thời gian cho 2 đoạn thân bài mà vẫn đảm bảo tiêu chí Task Response tối đa."
                : "Correct! A crisp 2-sentence intro (35-45 words) satisfies Task Response while leaving ample time for body paragraphs.",
            },
            {
              id: "ielts-opt-1b",
              text: isVi ? "5 đến 6 câu thật dài để tạo ấn tượng cho giám khảo" : "5 to 6 long sentences to impress examiners",
              isCorrect: false,
              explanation: isVi ? "Chưa đúng. Viết mở bài quá dài sẽ làm bạn thiếu thời gian viết thân bài và kết bài." : "Incorrect. Long intros waste crucial body paragraph time.",
            },
            {
              id: "ielts-opt-1c",
              text: isVi ? "Chỉ cần 1 câu sao chép y hệt đề bài" : "Just 1 sentence copying the prompt exactly",
              isCorrect: false,
              explanation: isVi ? "Chưa đúng. Từ ngữ sao chép y hệt đề bài sẽ bị giám khảo gạch bỏ và không tính điểm từ vựng." : "Incorrect. Copied words are discounted from your score.",
            },
          ],
          points: 5,
        },
      ],
    },
  ];
}

interface ClassVideoLibraryProps {
  onGoToProfile?: () => void;
  onOpenExchangeShop?: () => void;
  onGoToClasses?: () => void;
  lessons?: VideoLesson[];
}

export function ClassVideoLibrary({
  onGoToProfile,
  onOpenExchangeShop,
  onGoToClasses,
  lessons,
}: ClassVideoLibraryProps) {
  const router = useRouter();
  const { addPoints, language } = usePencily();
  const isVi = language === "vi";

  const defaultLessons = useMemo(() => getDefaultLessons(isVi), [isVi]);
  const effectiveLessons = lessons && lessons.length > 0 ? lessons : defaultLessons;

  // Active Lesson State
  const [activeLesson, setActiveLesson] = useState<VideoLesson>(effectiveLessons[0]);
  const [activeTab, setActiveTab] = useState<"milestones" | "transcript" | "syllabus" | "summary">("milestones");

  // Player State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(effectiveLessons[0]?.totalSeconds || 659);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showCaptions, setShowCaptions] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Interactive Milestones State (H5P features)
  const [activeMilestone, setActiveMilestone] = useState<VideoMilestone | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [solvedMilestoneIds, setSolvedMilestoneIds] = useState<string[]>([]);
  const [claimedLessonIds, setClaimedLessonIds] = useState<string[]>([]);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [rewardToast, setRewardToast] = useState<{ message: string; points: number } | null>(null);

  // Transcript Search
  const [transcriptSearch, setTranscriptSearch] = useState<string>("");

  // Refs
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timePollerRef = useRef<NodeJS.Timeout | null>(null);
  const triggeredMilestoneRef = useRef<Set<string>>(new Set());

  // Load saved progress from localStorage
  useEffect(() => {
    try {
      const savedSolved = localStorage.getItem("pencily_solved_milestones");
      if (savedSolved) setSolvedMilestoneIds(JSON.parse(savedSolved));
      const savedClaimed = localStorage.getItem("pencily_claimed_lessons");
      if (savedClaimed) setClaimedLessonIds(JSON.parse(savedClaimed));
    } catch {
      // ignore
    }
  }, []);

  // Update duration when activeLesson changes
  useEffect(() => {
    if (activeLesson) {
      setDuration(activeLesson.totalSeconds);
      setCurrentTime(0);
      setIsPlaying(false);
      setActiveMilestone(null);
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
      setIsAnswerCorrect(null);
      triggeredMilestoneRef.current = new Set();
    }
  }, [activeLesson]);

  // Send command to YouTube iframe via postMessage
  const postToPlayer = useCallback((func: string, args: any[] = []) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: "command",
          func,
          args,
        }),
        "*"
      );
    }
  }, []);

  // Player controls
  const handlePlay = useCallback(() => {
    postToPlayer("playVideo");
    setIsPlaying(true);
  }, [postToPlayer]);

  const handlePause = useCallback(() => {
    postToPlayer("pauseVideo");
    setIsPlaying(false);
  }, [postToPlayer]);

  const handleTogglePlay = useCallback(() => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  }, [isPlaying, handlePlay, handlePause]);

  const handleSeek = useCallback(
    (seconds: number) => {
      const target = Math.max(0, Math.min(seconds, duration));
      postToPlayer("seekTo", [target, true]);
      setCurrentTime(target);
      // If student sought backwards, allow upcoming milestones to re-trigger
      triggeredMilestoneRef.current.forEach((id) => {
        const ms = activeLesson.milestones.find((m) => m.id === id);
        if (ms && ms.seconds > target + 2) {
          triggeredMilestoneRef.current.delete(id);
        }
      });
    },
    [duration, postToPlayer, activeLesson]
  );

  const handleSkip = useCallback(
    (delta: number) => {
      handleSeek(currentTime + delta);
    },
    [currentTime, handleSeek]
  );

  const handleSetRate = useCallback(
    (rate: number) => {
      setPlaybackRate(rate);
      postToPlayer("setPlaybackRate", [rate]);
    },
    [postToPlayer]
  );

  const handleToggleMute = useCallback(() => {
    if (isMuted) {
      postToPlayer("unMute");
      setIsMuted(false);
    } else {
      postToPlayer("mute");
      setIsMuted(true);
    }
  }, [isMuted, postToPlayer]);

  const handleToggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Listen to postMessage responses from YouTube player
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (typeof event.data !== "string") return;
      try {
        const data = JSON.parse(event.data);
        if (data.event === "infoDelivery" && data.info) {
          if (typeof data.info.currentTime === "number") {
            setCurrentTime(Math.floor(data.info.currentTime));
          }
          if (typeof data.info.playerState === "number") {
            // 1 = playing, 2 = paused
            setIsPlaying(data.info.playerState === 1);
          }
        }
      } catch {
        // ignore other messages
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Interval timer to poll YouTube current time and trigger milestone pauses
  useEffect(() => {
    if (timePollerRef.current) clearInterval(timePollerRef.current);

    timePollerRef.current = setInterval(() => {
      // Send polling ping
      postToPlayer("getCurrentTime");

      // Fallback increment if playing
      if (isPlaying && !activeMilestone) {
        setCurrentTime((prev) => {
          const next = prev + 1;

          // Check if we hit any milestone in activeLesson
          const hitMilestone = activeLesson.milestones.find(
            (m) =>
              Math.abs(m.seconds - next) <= 1 &&
              !triggeredMilestoneRef.current.has(m.id) &&
              !solvedMilestoneIds.includes(m.id)
          );

          if (hitMilestone) {
            triggeredMilestoneRef.current.add(hitMilestone.id);
            handlePause();
            setActiveMilestone(hitMilestone);
            setSelectedOptionId(null);
            setIsAnswerSubmitted(false);
            setIsAnswerCorrect(null);
            setShowHint(false);
          }

          return next > duration ? duration : next;
        });
      }
    }, 1000);

    return () => {
      if (timePollerRef.current) clearInterval(timePollerRef.current);
    };
  }, [isPlaying, activeMilestone, activeLesson, duration, solvedMilestoneIds, handlePause, postToPlayer]);

  // Click on a milestone marker on progress bar
  const handleOpenMilestone = (milestone: VideoMilestone) => {
    handlePause();
    handleSeek(milestone.seconds);
    setActiveMilestone(milestone);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setIsAnswerCorrect(null);
    setShowHint(false);
  };

  // Submit answer for interactive milestone
  const handleSubmitMilestone = () => {
    if (!activeMilestone || !selectedOptionId) return;

    const chosen = activeMilestone.options.find((o) => o.id === selectedOptionId);
    const correct = chosen ? chosen.isCorrect : false;

    setIsAnswerSubmitted(true);
    setIsAnswerCorrect(correct);

    if (correct) {
      if (!solvedMilestoneIds.includes(activeMilestone.id)) {
        const updated = [...solvedMilestoneIds, activeMilestone.id];
        setSolvedMilestoneIds(updated);
        try {
          localStorage.setItem("pencily_solved_milestones", JSON.stringify(updated));
        } catch {}

        // Award Pencily Points!
        addPoints(activeMilestone.points, `Hoàn thành bài tập tương tác: ${activeMilestone.title}`);
        setRewardToast({
          message: isVi
            ? `🎉 Chính xác! Bạn nhận được +${activeMilestone.points} PP!`
            : `🎉 Correct! You earned +${activeMilestone.points} PP!`,
          points: activeMilestone.points,
        });
        setTimeout(() => setRewardToast(null), 4000);
      }
    }
  };

  // Resume video after solving or reviewing
  const handleResumePlayback = () => {
    setActiveMilestone(null);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setIsAnswerCorrect(null);
    handlePlay();
  };

  // Rewind 15 seconds to hear teacher explain concept again
  const handleReviewLesson = () => {
    if (activeMilestone) {
      handleSeek(Math.max(0, activeMilestone.seconds - 15));
    }
    setActiveMilestone(null);
    handlePlay();
  };

  // Claim full lesson completion bonus (+5 PP)
  const handleClaimLesson = () => {
    if (claimedLessonIds.includes(activeLesson.id)) return;
    const updated = [...claimedLessonIds, activeLesson.id];
    setClaimedLessonIds(updated);
    try {
      localStorage.setItem("pencily_claimed_lessons", JSON.stringify(updated));
    } catch {}

    addPoints(5, `Hoàn thành xem toàn bộ buổi học: ${activeLesson.title}`);
    setRewardToast({
      message: isVi ? "🎓 Đã xác thực hoàn thành bài học (+5 PP)!" : "🎓 Lesson completion confirmed (+5 PP)!",
      points: 5,
    });
    setTimeout(() => setRewardToast(null), 4000);
  };

  // Helper format seconds -> mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Current synchronized caption from transcript
  const currentCaption = useMemo(() => {
    const item = [...activeLesson.transcript]
      .reverse()
      .find((t) => currentTime >= t.seconds);
    return item ? item.text : "";
  }, [activeLesson.transcript, currentTime]);

  const solvedCountInLesson = activeLesson.milestones.filter((m) =>
    solvedMilestoneIds.includes(m.id)
  ).length;
  const totalMilestonesInLesson = activeLesson.milestones.length;
  const isLessonClaimed = claimedLessonIds.includes(activeLesson.id);

  // Filtered transcript search
  const filteredTranscript = activeLesson.transcript.filter(
    (item) =>
      item.text.toLowerCase().includes(transcriptSearch.toLowerCase()) ||
      item.speaker.toLowerCase().includes(transcriptSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn w-full select-none">
      {/* 1. TOP HEADER & SHOP CALLOUT */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-slate-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-sm bg-amber-100/70 border-2 border-amber-300 flex items-center justify-center text-[#0F2747] shadow-2xs shrink-0">
            <BookOpen className="w-5 h-5 text-[#0F2747]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-poppins font-black text-2xl sm:text-3xl text-[#0F2747] tracking-tight">
                {isVi ? "Thư viện bài học tương tác" : "Interactive Lesson Library"}
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-indigo-100 text-indigo-900 border border-indigo-300">
                {isVi ? "Chuẩn H5P Interactive" : "H5P Interactive Standard"}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {isVi ? (
                <>
                  Học trực quan cùng video bài giảng và <strong>cột mốc bài tập tương tác</strong>. Video sẽ tự động dừng tại các điểm kiểm tra để bạn làm bài và nhận thưởng{" "}
                  <strong className="text-amber-700 font-bold">+5 PP</strong> mỗi câu!
                </>
              ) : (
                <>
                  Interactive video lectures with embedded quiz milestones. Videos pause at checkpoints for real-time practice and awards{" "}
                  <strong className="text-amber-700 font-bold">+5 PP</strong> per solved task!
                </>
              )}
            </p>
          </div>
        </div>

        {onOpenExchangeShop && (
          <button
            onClick={onOpenExchangeShop}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-sm bg-white hover:bg-[#FFF9EF] border-2 border-amber-400 text-[#0F2747] text-xs font-bold transition shadow-2xs cursor-pointer active:scale-95 shrink-0 self-start sm:self-auto"
          >
            <Gift className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>{isVi ? "Cửa Hàng Đổi Quà PP →" : "PP Rewards Shop →"}</span>
          </button>
        )}
      </div>

      {/* REWARD TOAST POPUP */}
      {rewardToast && (
        <div className="p-3 bg-emerald-50 border-2 border-emerald-500 rounded-sm text-emerald-950 font-bold text-xs flex items-center justify-between shadow-md animate-fadeIn">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{rewardToast.message}</span>
          </div>
          <span className="text-[11px] bg-emerald-600 text-white px-2 py-0.5 rounded-xs font-mono">
            +{rewardToast.points} PP
          </span>
        </div>
      )}

      {/* 2. THEATER LAYOUT: 12-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* LEFT COLUMN: INTERACTIVE VIDEO PLAYER (8 COLS) */}
        <div className="lg:col-span-8 space-y-4">
          {/* THEATER BOX */}
          <div
            ref={playerContainerRef}
            className="bg-slate-950 rounded-md border-2 border-slate-800 shadow-lg overflow-hidden flex flex-col relative"
          >
            {/* LECTURE HEADER BANNER (Matching user screenshot: "Video Bài giảng: ...") */}
            <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-white z-10">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="px-2 py-0.5 rounded-xs bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider shrink-0">
                  {isVi ? "Video Bài giảng" : "Lecture Video"}
                </span>
                <h3 className="font-poppins font-bold text-xs sm:text-sm text-slate-100 truncate">
                  {activeLesson.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-mono text-amber-300 font-bold">
                  {solvedCountInLesson}/{totalMilestonesInLesson} {isVi ? "Cột mốc bài tập" : "Milestones"}
                </span>
              </div>
            </div>

            {/* VIDEO VIEWPORT & OVERLAYS */}
            <div className="relative w-full aspect-video bg-black overflow-hidden group">
              {/* YOUTUBE IFRAME WITH EMBED API */}
              <iframe
                ref={iframeRef}
                key={activeLesson.id}
                src={`https://www.youtube-nocookie.com/embed/${activeLesson.youtubeId}?enablejsapi=1&autoplay=0&rel=0&controls=0&modestbranding=1&playsinline=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}`}
                title={activeLesson.title}
                className="w-full h-full border-0 pointer-events-auto"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />

              {/* CLOSED CAPTIONS OVERLAY (Subtitles banner like in user screenshot) */}
              {showCaptions && currentCaption && !activeMilestone && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 max-w-[88%] px-4 py-1.5 rounded-xs bg-black/85 text-white text-xs sm:text-sm font-medium text-center shadow-lg pointer-events-none backdrop-blur-xs border border-white/10 animate-fadeIn">
                  {currentCaption}
                </div>
              )}

              {/* H5P INTERACTIVE QUESTION OVERLAY (POPS UP AT MILESTONE) */}
              {activeMilestone && (
                <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 z-30 animate-fadeIn">
                  <div className="w-full max-w-xl bg-white rounded-sm border-2 border-[#0F2747] shadow-2xl p-5 sm:p-6 space-y-4 max-h-full overflow-y-auto">
                    {/* Milestone Header */}
                    <div className="flex items-start justify-between gap-3 border-b-2 border-slate-100 pb-3">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-xs bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider">
                            {isVi ? "Cột mốc bài tập" : "Checkpoint Quiz"}
                          </span>
                          <span className="text-[11px] font-mono font-bold text-slate-500">
                            ⏱ {activeMilestone.timeFormatted}
                          </span>
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200">
                            +{activeMilestone.points} PP
                          </span>
                        </div>
                        <h4 className="font-poppins font-black text-sm sm:text-base text-[#0F2747]">
                          {activeMilestone.title}
                        </h4>
                      </div>

                      <button
                        onClick={handleResumePlayback}
                        className="text-slate-400 hover:text-slate-600 p-1 rounded-xs transition cursor-pointer"
                        title={isVi ? "Bỏ qua & Tiếp tục xem" : "Skip & Continue"}
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Question Prompt */}
                    <div className="p-3 rounded-xs bg-amber-50/70 border border-amber-200 text-xs sm:text-sm font-semibold text-[#0F2747] leading-relaxed">
                      {activeMilestone.question}
                    </div>

                    {/* Options List */}
                    <div className="space-y-2">
                      {activeMilestone.options.map((opt) => {
                        const isSelected = selectedOptionId === opt.id;
                        let optStyle = "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800";

                        if (isSelected && !isAnswerSubmitted) {
                          optStyle = "bg-amber-100/80 border-amber-500 text-[#0F2747] ring-1 ring-amber-500";
                        } else if (isAnswerSubmitted) {
                          if (opt.isCorrect) {
                            optStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-500";
                          } else if (isSelected && !opt.isCorrect) {
                            optStyle = "bg-rose-50 border-rose-400 text-rose-950";
                          }
                        }

                        return (
                          <button
                            key={opt.id}
                            disabled={isAnswerSubmitted}
                            onClick={() => setSelectedOptionId(opt.id)}
                            className={`w-full text-left p-3 rounded-xs border-2 text-xs transition flex items-start gap-2.5 cursor-pointer ${optStyle}`}
                          >
                            <span className="font-black text-slate-500 shrink-0">
                              {isSelected ? (
                                <span className="w-4 h-4 rounded-xs bg-[#0F2747] text-white flex items-center justify-center text-[10px]">
                                  ✓
                                </span>
                              ) : (
                                <span className="w-4 h-4 rounded-xs border border-slate-400 flex items-center justify-center text-[10px]">
                                  •
                                </span>
                              )}
                            </span>
                            <span className="flex-1 leading-snug">{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Feedback Explanation */}
                    {isAnswerSubmitted && (
                      <div
                        className={`p-3 rounded-xs border-2 text-xs space-y-1 ${
                          isAnswerCorrect
                            ? "bg-emerald-50 border-emerald-400 text-emerald-950"
                            : "bg-rose-50 border-rose-400 text-rose-950"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-bold">
                          {isAnswerCorrect ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>{isVi ? "Chính xác tuyệt vời! (+5 PP)" : "Excellent! Correct (+5 PP)"}</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-rose-600" />
                              <span>{isVi ? "Chưa chính xác! Hãy đọc lại lời giải dưới đây:" : "Not quite! Read the explanation below:"}</span>
                            </>
                          )}
                        </div>
                        <p className="text-[11px] leading-relaxed text-slate-700">
                          {activeMilestone.options.find((o) => o.isCorrect)?.explanation}
                        </p>
                      </div>
                    )}

                    {/* Hint */}
                    {showHint && activeMilestone.hint && !isAnswerSubmitted && (
                      <div className="p-2.5 rounded-xs bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-2">
                        <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{activeMilestone.hint}</span>
                      </div>
                    )}

                    {/* Bottom Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-200">
                      <div className="flex items-center gap-2">
                        {!isAnswerSubmitted && activeMilestone.hint && (
                          <button
                            type="button"
                            onClick={() => setShowHint(!showHint)}
                            className="text-xs text-slate-500 hover:text-slate-800 underline font-semibold cursor-pointer"
                          >
                            {showHint ? (isVi ? "Ẩn gợi ý" : "Hide hint") : (isVi ? "💡 Xem gợi ý" : "💡 Show hint")}
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={handleReviewLesson}
                          className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-[#0F2747] font-semibold cursor-pointer"
                          title={isVi ? "Tua lại 15 giây trước để nghe lại cô giảng" : "Rewind 15s to hear teacher"}
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>{isVi ? "Xem lại 15s trước" : "Re-watch 15s"}</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        {!isAnswerSubmitted ? (
                          <button
                            type="button"
                            disabled={!selectedOptionId}
                            onClick={handleSubmitMilestone}
                            className={`px-5 py-2 rounded-xs font-bold text-xs transition cursor-pointer shadow-xs ${
                              selectedOptionId
                                ? "bg-amber-400 hover:bg-amber-500 text-slate-950 border-2 border-amber-600 active:scale-95"
                                : "bg-slate-200 text-slate-400 border-2 border-slate-300 cursor-not-allowed"
                            }`}
                          >
                            {isVi ? "Kiểm tra đáp án" : "Check Answer"}
                          </button>
                        ) : (
                          <div className="flex items-center gap-2">
                            {!isAnswerCorrect && (
                              <button
                                type="button"
                                onClick={() => {
                                  setIsAnswerSubmitted(false);
                                  setSelectedOptionId(null);
                                }}
                                className="px-3.5 py-2 rounded-xs bg-white hover:bg-slate-50 border-2 border-slate-300 text-slate-800 text-xs font-bold transition active:scale-95 cursor-pointer"
                              >
                                <RefreshCw className="w-3.5 h-3.5 inline mr-1" />
                                <span>{isVi ? "Thử lại" : "Retry"}</span>
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={handleResumePlayback}
                              className="px-5 py-2 rounded-xs bg-[#0F2747] hover:bg-[#1E3A8A] text-white border-2 border-slate-800 font-bold text-xs transition active:scale-95 cursor-pointer flex items-center gap-1.5"
                            >
                              <span>{isVi ? "Tiếp tục xem bài giảng ▶" : "Continue Lecture ▶"}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CUSTOM INTERACTIVE CONTROLS TOOLBAR (H5P STYLE) */}
            <div className="p-3 bg-slate-900 border-t border-slate-800 text-white space-y-2">
              {/* TIMELINE PROGRESS BAR WITH MILESTONE PINS */}
              <div className="space-y-1">
                <div
                  className="relative w-full h-3 bg-slate-800 hover:h-4 rounded-xs cursor-pointer group transition-all"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const pct = clickX / rect.width;
                    handleSeek(pct * duration);
                  }}
                >
                  {/* Played Track */}
                  <div
                    className="absolute top-0 left-0 bottom-0 bg-amber-400 rounded-xs transition-all"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />

                  {/* MILESTONE TICK MARKERS (NO "NỐT RUỒI" - SQUARISH TABS ONLY!) */}
                  {activeLesson.milestones.map((m) => {
                    const leftPct = (m.seconds / duration) * 100;
                    const isSolved = solvedMilestoneIds.includes(m.id);

                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenMilestone(m);
                        }}
                        style={{ left: `${leftPct}%` }}
                        className={`absolute -top-1.5 -translate-x-1/2 w-3.5 h-6 rounded-xs border flex items-center justify-center shadow-xs transition-transform hover:scale-125 cursor-pointer z-10 ${
                          isSolved
                            ? "bg-emerald-500 border-emerald-800 text-white"
                            : "bg-amber-300 hover:bg-amber-400 border-amber-700 text-slate-950"
                        }`}
                        title={`${m.title} (${m.timeFormatted}) • ${isSolved ? (isVi ? "Đã làm (+5 PP)" : "Solved") : (isVi ? "Chưa làm" : "Unsolved")}`}
                      >
                        {isSolved ? (
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        ) : (
                          <HelpCircle className="w-2.5 h-2.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Timeline timecode labels */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>{formatTime(currentTime)}</span>
                  <div className="flex items-center gap-1 text-[10px] text-amber-300">
                    <Sparkles className="w-3 h-3" />
                    <span>
                      {isVi
                        ? `Đã hoàn thành ${solvedCountInLesson}/${totalMilestonesInLesson} cột mốc`
                        : `${solvedCountInLesson}/${totalMilestonesInLesson} milestones completed`}
                    </span>
                  </div>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* CONTROLS BUTTONS ROW */}
              <div className="flex items-center justify-between pt-1">
                {/* Left: Play / Pause, Rewind, FastForward, Time */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={handleTogglePlay}
                    className="w-8 h-8 rounded-xs bg-amber-400 hover:bg-amber-500 text-slate-950 flex items-center justify-center transition active:scale-95 cursor-pointer shadow-xs border border-amber-600"
                    title={isPlaying ? "Tạm dừng (Space)" : "Phát video (Space)"}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSkip(-10)}
                    className="p-1.5 rounded-xs hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
                    title={isVi ? "Tua lại 10s" : "Rewind 10s"}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSkip(10)}
                    className="p-1.5 rounded-xs hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
                    title={isVi ? "Tua tới 10s" : "Forward 10s"}
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleToggleMute}
                    className="p-1.5 rounded-xs hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
                    title={isMuted ? "Bật âm thanh" : "Tắt tiếng"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  {/* Time counter matching user's image: 0:39 / 10:59 */}
                  <span className="font-mono text-xs text-slate-200 font-semibold px-2 py-0.5 rounded-xs bg-slate-800">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                {/* Right: Captions, Speed, Fullscreen */}
                <div className="flex items-center gap-2">
                  {/* Captions toggle button */}
                  <button
                    type="button"
                    onClick={() => setShowCaptions(!showCaptions)}
                    className={`px-2 py-1 rounded-xs font-bold text-[11px] transition cursor-pointer border ${
                      showCaptions
                        ? "bg-amber-400 text-slate-950 border-amber-500"
                        : "bg-slate-800 text-slate-400 border-slate-700 hover:text-white"
                    }`}
                    title={isVi ? "Bật / tắt phụ đề bài giảng" : "Toggle captions"}
                  >
                    CC
                  </button>

                  {/* Playback speed selector */}
                  <div className="flex items-center bg-slate-800 rounded-xs border border-slate-700 p-0.5">
                    {[1, 1.25, 1.5].map((rate) => (
                      <button
                        key={rate}
                        type="button"
                        onClick={() => handleSetRate(rate)}
                        className={`px-1.5 py-0.5 rounded-xs text-[10px] font-mono font-bold transition cursor-pointer ${
                          playbackRate === rate ? "bg-amber-400 text-slate-950" : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>

                  {/* Fullscreen */}
                  <button
                    type="button"
                    onClick={handleToggleFullscreen}
                    className="p-1.5 rounded-xs hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
                    title={isFullscreen ? "Thoát toàn màn hình" : "Toàn màn hình"}
                  >
                    {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* H5P FOOTER INFO BAR (Matching user screenshot: "Sử dụng lại", H5P icon) */}
            <div className="px-4 py-2 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    alert(isVi ? "Đã sao chép liên kết bài học tương tác!" : "Copied interactive lesson link!");
                  }}
                  className="inline-flex items-center gap-1 hover:text-slate-200 transition cursor-pointer"
                >
                  <Share2 className="w-3 h-3 text-slate-400" />
                  <span>{isVi ? "Sử dụng lại / Chia sẻ" : "Reuse / Share"}</span>
                </button>
                <span className="text-slate-700">|</span>
                <span>{activeLesson.gradeLevel}</span>
              </div>

              <div className="flex items-center gap-1.5 font-bold text-slate-400">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>{isVi ? "Học liệu số The Pencily • Chuẩn H5P" : "The Pencily Interactive H5P"}</span>
              </div>
            </div>
          </div>

          {/* 3. TUTOR & ATTENDANCE BAR */}
          <div className="p-4 sm:p-5 bg-white rounded-md border-2 border-slate-300 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-13 h-13 rounded-sm overflow-hidden border-2 border-amber-300 shadow-xs shrink-0">
                  <img
                    src={activeLesson.tutor.avatar}
                    alt={activeLesson.tutor.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-poppins font-bold text-sm sm:text-base text-[#0F2747] truncate">
                      {activeLesson.tutor.name}
                    </h4>
                    {activeLesson.tutor.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-amber-100 text-amber-900 border border-amber-300 shrink-0">
                        {activeLesson.tutor.badge}
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-slate-600 mt-0.5">
                    <span>{activeLesson.tutor.school}</span>
                    <span className="mx-1.5 text-slate-300">•</span>
                    <span className="font-semibold text-amber-700">
                      {isVi ? `Đã dạy ${activeLesson.tutor.sessions} buổi` : `${activeLesson.tutor.sessions} sessions`}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-1 max-w-xl line-clamp-2">
                    {activeLesson.tutor.bio}
                  </p>
                </div>
              </div>

              {/* Attendance & Points Button (+5 PP) */}
              <div className="shrink-0 flex items-center gap-2">
                {isLessonClaimed ? (
                  <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-sm bg-emerald-50 border-2 border-emerald-300 text-emerald-800 text-xs font-bold shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{isVi ? "Đã nhận +5 PP buổi học" : "+5 PP Awarded"}</span>
                  </div>
                ) : (
                  <button
                    onClick={handleClaimLesson}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition active:scale-95 shadow-md cursor-pointer border-2 border-amber-600"
                    title={isVi ? "Bấm để xác thực hoàn thành toàn bộ bài học và nhận thêm điểm" : "Claim completion points"}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isVi ? "Điểm danh học xong (+5 PP)" : "Claim Completion (+5 PP)"}</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 4. TABS: MILESTONES / TRANSCRIPT / SYLLABUS / SUMMARY */}
          <div className="bg-white rounded-md border-2 border-slate-300 shadow-2xs overflow-hidden">
            <div className="flex items-center justify-between border-b-2 border-slate-200 bg-[#FFF9EF]/80 px-4 sm:px-6 overflow-x-auto">
              <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                {/* TAB 1: MILESTONES (NEW) */}
                <button
                  onClick={() => setActiveTab("milestones")}
                  className={`py-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition cursor-pointer -mb-[2px] ${
                    activeTab === "milestones"
                      ? "border-[#F59E0B] text-[#0F2747]"
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                  <span>
                    {isVi
                      ? `Cột mốc bài tập (${solvedCountInLesson}/${totalMilestonesInLesson})`
                      : `Milestones (${solvedCountInLesson}/${totalMilestonesInLesson})`}
                  </span>
                </button>

                {/* TAB 2: TRANSCRIPTION */}
                <button
                  onClick={() => setActiveTab("transcript")}
                  className={`py-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition cursor-pointer -mb-[2px] ${
                    activeTab === "transcript"
                      ? "border-[#F59E0B] text-[#0F2747]"
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <FileText className="w-4 h-4 text-[#F59E0B]" />
                  <span>{isVi ? "Bản ghi lời" : "Transcript"}</span>
                </button>

                {/* TAB 3: SYLLABUS */}
                <button
                  onClick={() => setActiveTab("syllabus")}
                  className={`py-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition cursor-pointer -mb-[2px] ${
                    activeTab === "syllabus"
                      ? "border-[#F59E0B] text-[#0F2747]"
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-[#4F7ECB]" />
                  <span>
                    {isVi ? `Chặng kiến thức (${activeLesson.syllabus.length})` : `Chapters (${activeLesson.syllabus.length})`}
                  </span>
                </button>

                {/* TAB 4: SUMMARY & SCORE */}
                <button
                  onClick={() => setActiveTab("summary")}
                  className={`py-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition cursor-pointer -mb-[2px] ${
                    activeTab === "summary"
                      ? "border-[#F59E0B] text-[#0F2747]"
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>{isVi ? "Tổng kết & Đổi quà" : "Scorecard"}</span>
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-500 font-medium shrink-0">
                <span>{isVi ? "💡 Video tự dừng tại mỗi cột mốc" : "💡 Video auto-pauses at each milestone"}</span>
              </div>
            </div>

            {/* TAB CONTENT: MILESTONES OVERVIEW */}
            {activeTab === "milestones" && (
              <div className="p-4 sm:p-6 space-y-3 animate-fadeIn">
                <div className="text-xs font-bold text-slate-600 pb-1 border-b border-slate-100 flex items-center justify-between">
                  <span>{isVi ? "Danh sách bài tập tương tác trong video bài giảng:" : "Interactive exercise checkpoints in this lecture:"}</span>
                  <span className="text-amber-800 font-mono font-bold">
                    +{activeLesson.milestones.reduce((acc, m) => acc + m.points, 0)} PP {isVi ? "tổng thưởng" : "total PP"}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {activeLesson.milestones.map((m, idx) => {
                    const isSolved = solvedMilestoneIds.includes(m.id);

                    return (
                      <div
                        key={m.id}
                        className={`p-3.5 rounded-sm border-2 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isSolved
                            ? "bg-emerald-50/60 border-emerald-300"
                            : "bg-slate-50 hover:bg-[#FFF9EF] border-slate-200 hover:border-amber-400"
                        }`}
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono font-bold text-xs text-[#0F2747] bg-white px-2 py-0.5 rounded-xs border border-slate-300">
                              ⏱ {m.timeFormatted}
                            </span>
                            <span className="font-poppins font-bold text-xs sm:text-sm text-[#0F2747]">
                              {m.title}
                            </span>
                            {isSolved ? (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-xs bg-emerald-600 text-white flex items-center gap-1">
                                <Check className="w-3 h-3 stroke-[3]" />
                                <span>{isVi ? "Đã hoàn thành" : "Completed"}</span>
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-xs bg-amber-100 text-amber-900 border border-amber-300">
                                +{m.points} PP
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 line-clamp-1">{m.question}</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                          <button
                            type="button"
                            onClick={() => handleOpenMilestone(m)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs text-xs font-bold transition cursor-pointer active:scale-95 shadow-2xs ${
                              isSolved
                                ? "bg-white hover:bg-slate-100 text-emerald-900 border border-emerald-400"
                                : "bg-amber-400 hover:bg-amber-500 text-slate-950 border border-amber-600"
                            }`}
                          >
                            <span>{isSolved ? (isVi ? "Xem lại bài" : "Review") : (isVi ? "Làm bài tập →" : "Solve Quiz →")}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB CONTENT: TRANSCRIPTION */}
            {activeTab === "transcript" && (
              <div className="p-4 sm:p-6 space-y-4 animate-fadeIn">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={transcriptSearch}
                    onChange={(e) => setTranscriptSearch(e.target.value)}
                    placeholder={isVi ? "Tìm kiếm từ khóa trong bản ghi lời..." : "Search transcript keywords..."}
                    className="w-full pl-9 pr-4 py-2 rounded-sm bg-slate-50 border-2 border-slate-300 text-xs text-[#0F2747] placeholder:text-slate-400 focus:outline-none focus:border-[#0F2747] focus:bg-white transition"
                  />
                  {transcriptSearch && (
                    <button
                      onClick={() => setTranscriptSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
                    >
                      {isVi ? "Xóa" : "Clear"}
                    </button>
                  )}
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                  {filteredTranscript.length === 0 ? (
                    <div className="text-center py-8 text-xs text-slate-400">
                      {isVi
                        ? `Không tìm thấy đoạn ghi lời nào chứa từ khóa "${transcriptSearch}".`
                        : `No matches for "${transcriptSearch}".`}
                    </div>
                  ) : (
                    filteredTranscript.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleSeek(item.seconds)}
                        className="w-full text-left p-3 rounded-sm hover:bg-[#FFF9EF] border-2 border-transparent hover:border-amber-300 transition flex items-start gap-3 group cursor-pointer"
                        title={isVi ? `Bấm để tua video đến mốc ${item.time}` : `Seek to ${item.time}`}
                      >
                        <span className="font-mono font-bold text-xs text-[#4F7ECB] bg-blue-50 px-2 py-0.5 rounded-sm group-hover:bg-[#4F7ECB] group-hover:text-white transition-colors shrink-0">
                          ▶ {item.time}
                        </span>

                        <div className="flex-1 min-w-0">
                          <span className="font-bold text-xs text-[#0F2747] mr-1.5">{item.speaker}:</span>
                          <span className="text-xs text-slate-700 leading-relaxed group-hover:text-[#0F2747]">
                            {item.text}
                          </span>
                        </div>

                        <span className="text-[11px] font-bold text-slate-400 group-hover:text-[#4F7ECB] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          {isVi ? "Tua tới →" : "Seek →"}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB CONTENT: SYLLABUS CHAPTERS */}
            {activeTab === "syllabus" && (
              <div className="p-4 sm:p-6 space-y-3 animate-fadeIn">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider pb-1 border-b-2 border-slate-100">
                  {isVi ? "Mục lục các chặng kiến thức chính:" : "Key Knowledge Chapters:"}
                </div>
                <div className="space-y-2">
                  {activeLesson.syllabus.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSeek(item.seconds)}
                      className="w-full text-left p-3.5 rounded-sm bg-slate-50 hover:bg-[#FFF9EF] border-2 border-slate-200 hover:border-amber-400 transition flex items-start justify-between gap-3 group cursor-pointer"
                    >
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-[#4F7ECB] bg-blue-50 px-2 py-0.5 rounded-sm group-hover:bg-[#4F7ECB] group-hover:text-white transition-colors">
                            ▶ {item.time}
                          </span>
                          <h4 className="font-bold text-xs sm:text-sm text-[#0F2747] group-hover:text-amber-800 transition-colors">
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed pl-1">{item.summary}</p>
                      </div>

                      <span className="text-xs font-bold text-slate-400 group-hover:text-[#4F7ECB] shrink-0 pt-0.5">
                        {isVi ? "Tua tới →" : "Seek →"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: SUMMARY SCORECARD */}
            {activeTab === "summary" && (
              <div className="p-5 sm:p-7 space-y-5 animate-fadeIn">
                <div className="p-4 rounded-sm bg-emerald-50/70 border-2 border-emerald-300 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <h4 className="font-poppins font-black text-base text-emerald-950">
                      {isVi ? "Kết Quả Học Tập Tương Tác" : "Interactive Learning Performance"}
                    </h4>
                    <p className="text-xs text-emerald-800">
                      {isVi
                        ? `Bạn đã hoàn thành ${solvedCountInLesson}/${totalMilestonesInLesson} cột mốc bài tập trong bài giảng này.`
                        : `You have completed ${solvedCountInLesson}/${totalMilestonesInLesson} interactive checkpoints in this lecture.`}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-center px-4 py-2 rounded-xs bg-white border border-emerald-400 shadow-2xs">
                      <span className="block text-[10px] text-slate-500 uppercase font-bold">{isVi ? "Điểm PP Đạt Được" : "PP Earned"}</span>
                      <span className="font-mono font-black text-lg text-emerald-700">
                        +{solvedCountInLesson * 5} PP
                      </span>
                    </div>

                    {onOpenExchangeShop && (
                      <button
                        onClick={onOpenExchangeShop}
                        className="px-4 py-2.5 rounded-xs bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition active:scale-95 cursor-pointer shadow-xs border border-emerald-950"
                      >
                        {isVi ? "Đổi Quà PP →" : "Redeem Perks →"}
                      </button>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-sm border border-slate-200 text-xs text-slate-600 space-y-2">
                  <div className="font-bold text-[#0F2747] flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-amber-500" />
                    <span>{isVi ? "Ghi nhận vào Giấy Chứng Nhận Ngoại Khóa The Pencily:" : "Official Extracurricular Certificate Record:"}</span>
                  </div>
                  <p>
                    {isVi
                      ? "Toàn bộ thời gian xem video bài giảng và hoàn thành câu hỏi tương tác được hệ thống ghi nhận tự động vào hồ sơ học thuật cá nhân. Bạn có thể xuất Giấy Xác Nhận Ngoại Khóa (PDF Certificate) tại trang Hồ Sơ Cá Nhân."
                      : "All interactive lecture completion hours are officially tracked and verified in your student transcript, exportable as an official extracurricular certificate."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: PLAYLIST QUEUE & SELECTOR (4 COLS) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-md border-2 border-slate-300 shadow-2xs overflow-hidden">
            <div className="p-4 bg-[#FFF9EF] border-b-2 border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ListVideo className="w-4 h-4 text-[#F59E0B]" />
                <h3 className="font-poppins font-bold text-sm text-[#0F2747]">
                  {isVi ? `Danh sách bài giảng (${effectiveLessons.length})` : `Lectures (${effectiveLessons.length})`}
                </h3>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">
                {isVi ? "Chọn bài để học" : "Select lecture"}
              </span>
            </div>

            <div className="divide-y divide-slate-100 max-h-[750px] overflow-y-auto">
              {effectiveLessons.map((lesson) => {
                const isCurrent = lesson.id === activeLesson.id;
                const isClaimed = claimedLessonIds.includes(lesson.id);
                const solvedCount = lesson.milestones.filter((m) => solvedMilestoneIds.includes(m.id)).length;

                return (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      setActiveLesson(lesson);
                      setTranscriptSearch("");
                    }}
                    className={`w-full text-left p-3.5 transition flex items-start gap-3 cursor-pointer group ${
                      isCurrent
                        ? "bg-amber-50/70 border-l-4 border-amber-500"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <div className="relative w-28 aspect-video rounded-sm overflow-hidden bg-slate-900 shrink-0 border-2 border-slate-200 shadow-2xs group-hover:shadow-xs transition">
                      <img
                        src={`https://img.youtube.com/vi/${lesson.youtubeId}/mqdefault.jpg`}
                        alt={lesson.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        loading="lazy"
                      />
                      <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-xs bg-black/80 text-white font-mono font-bold text-[10px]">
                        {lesson.duration}
                      </div>

                      {isCurrent && (
                        <div className="absolute inset-0 bg-[#0F2747]/40 flex items-center justify-center">
                          <Play className="w-5 h-5 text-amber-400 fill-amber-400" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-700 truncate">
                          {lesson.subject}
                        </span>
                        {isClaimed && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-sm flex items-center gap-0.5 shrink-0">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>+5 PP</span>
                          </span>
                        )}
                      </div>

                      <h4
                        className={`font-poppins font-bold text-xs leading-snug line-clamp-2 ${
                          isCurrent ? "text-amber-900" : "text-[#0F2747] group-hover:text-amber-800"
                        }`}
                      >
                        {lesson.title}
                      </h4>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                        <span className="truncate max-w-[120px]">{lesson.tutor.name}</span>
                        <span className="font-mono text-amber-700 font-semibold shrink-0">
                          {solvedCount}/{lesson.milestones.length} {isVi ? "cột mốc" : "quiz"}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* COMMUNITY STUDY PROMPT */}
          <div className="p-4 bg-white rounded-md border-2 border-slate-300 shadow-2xs space-y-2.5">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-amber-500" />
              <h4 className="font-poppins font-bold text-xs text-[#0F2747]">
                {isVi ? "Học Cùng Bạn Bè Trực Tiếp?" : "Want to study live with peers?"}
              </h4>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {isVi
                ? "Ngoài thư viện video học liệu, bạn có thể tham gia trực tiếp các phòng học ảo (Study Rooms) có Peer Tutors kèm giải bài tập hoàn toàn miễn phí."
                : "Join active study pods with live student tutors and interactive whiteboards."}
            </p>
            {onGoToClasses && (
              <button
                type="button"
                onClick={onGoToClasses}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xs bg-[#0F2747] hover:bg-[#1E3A8A] text-white text-xs font-bold transition cursor-pointer shadow-2xs"
              >
                <span>{isVi ? "Xem Lịch Phòng Học Đang Mở →" : "View Active Study Rooms →"}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
