import { jsPDF } from "jspdf";
import { StudentUser } from "@/context/PencilyContext";

/**
 * Loads a font file from the public directory as a Base64 string for jsPDF.
 */
async function loadFontAsBase64(url: string): Promise<string | null> {
  if (typeof window === "undefined") return null;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        const base64 = base64data.split(",")[1];
        resolve(base64);
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    console.warn("Could not load font for certificate PDF:", err);
    return null;
  }
}

/**
 * Generates and triggers download of an official 2-page The Pencily Certificate:
 * - Page 1: Vietnamese version (Bản Tiếng Việt)
 * - Page 2: English version (Bản Tiếng Anh)
 */
export async function downloadPencilyCertificatePdf(user: StudentUser, language: "vi" | "en" = "vi") {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const marginLeft = 20;
  const marginRight = 20;
  const contentWidth = pageWidth - marginLeft - marginRight;

  // Attempt to load full Unicode fonts (Arial Regular & Bold) and Grand Hotel
  const [regularFontB64, boldFontB64, grandHotelB64] = await Promise.all([
    loadFontAsBase64("/fonts/arial.ttf"),
    loadFontAsBase64("/fonts/arialbd.ttf"),
    loadFontAsBase64("/fonts/GrandHotel-Regular.ttf"),
  ]);

  let fontRegular = "helvetica";
  let fontBold = "helvetica";
  let fontBrand = "helvetica";
  let hasUnicode = false;

  if (regularFontB64) {
    try {
      doc.addFileToVFS("Arial-Regular.ttf", regularFontB64);
      doc.addFont("Arial-Regular.ttf", "Arial", "normal");
      fontRegular = "Arial";
      hasUnicode = true;
    } catch (e) {
      console.warn("Error adding regular font:", e);
    }
  }

  if (boldFontB64) {
    try {
      doc.addFileToVFS("Arial-Bold.ttf", boldFontB64);
      doc.addFont("Arial-Bold.ttf", "Arial", "bold");
      fontBold = "Arial";
    } catch (e) {
      console.warn("Error adding bold font:", e);
    }
  }

  fontBrand = fontBold;
  if (grandHotelB64) {
    try {
      doc.addFileToVFS("GrandHotel-Regular.ttf", grandHotelB64);
      doc.addFont("GrandHotel-Regular.ttf", "GrandHotel", "normal");
      fontBrand = "GrandHotel";
    } catch (e) {
      console.warn("Error adding GrandHotel font:", e);
    }
  }

  // Fallback diacritic remover if Unicode font is not available
  const removeVietnameseTones = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };

  const sanitizeVi = (str: string) => {
    return hasUnicode ? str : removeVietnameseTones(str);
  };

  const rawStudentName = user.realName || user.name || "Student Peer";
  const studentNameVi = sanitizeVi(rawStudentName);
  const studentNameEn = removeVietnameseTones(rawStudentName);

  const verifiedHours = Math.max(1, Math.round((user.learningMinutes || 120) / 60));
  const sessionsCount = Math.max(1, user.sessionsAttended || 3);
  const certId = `TP-CERT-GEN1-${Date.now().toString(36).toUpperCase()}`;

  const today = new Date();
  const dateStrVi = `Ngày ${today.getDate()} tháng ${today.getMonth() + 1} năm ${today.getFullYear()}`;
  const dateStrEn = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Reusable signature vector drawing helper
  const drawSignature = (startY: number) => {
    doc.setDrawColor(15, 39, 71);
    doc.setLineWidth(1);
    doc.lines(
      [
        [8, -6],
        [14, 4],
        [6, -8],
        [12, 6],
        [8, -4],
        [15, 0],
      ],
      marginLeft,
      startY + 6
    );
  };

  // ==========================================
  // PAGE 1: BẢN TIẾNG VIỆT (VIETNAMESE VERSION)
  // ==========================================

  // 1. Top Architectural Bar
  doc.setFillColor(15, 39, 71); // #0F2747 Deep Navy
  doc.rect(marginLeft, 15, contentWidth, 3, "F");

  // Logo / Title in Grand Hotel brand font
  if (fontBrand === "GrandHotel") {
    doc.setFont(fontBrand, "normal");
    doc.setFontSize(32);
    doc.setTextColor(15, 39, 71);
    doc.text("The Pencily", marginLeft, 28);
  } else {
    doc.setFont(fontBold, "bold");
    doc.setFontSize(22);
    doc.setTextColor(15, 39, 71);
    doc.text("The Pencily", marginLeft, 28);
  }

  doc.setFont(fontRegular, "normal");
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(
    sanitizeVi("Mạng lưới Học tập Ngang hàng Bình đẳng | 100% Phi lợi nhuận"),
    marginLeft,
    33
  );

  // Verification Code (top right) - Using Unicode font to prevent character corruption
  doc.setFont(fontBold, "bold");
  doc.setFontSize(8);
  doc.setTextColor(79, 126, 203);
  doc.text(`MÃ XÁC THỰC: ${certId}`, pageWidth - marginRight, 28, { align: "right" });

  // Divider line
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(marginLeft, 38, pageWidth - marginRight, 38);

  // 2. Date
  doc.setFont(fontRegular, "normal");
  doc.setFontSize(10);
  doc.setTextColor(15, 39, 71);
  doc.text(dateStrVi, marginLeft, 47);

  // 3. Salutation
  doc.setFont(fontBold, "bold");
  doc.setFontSize(11);
  doc.text(
    sanitizeVi("Kính gửi: Các Quý Cơ quan, Hội đồng Tuyển sinh và Đơn vị Hữu quan,"),
    marginLeft,
    56
  );

  // 4. Letter Body
  doc.setFont(fontRegular, "normal");
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);

  const viPara1 = sanitizeVi(
    `Ban Điều phối Học thuật The Pencily trân trọng xác nhận rằng bạn ${studentNameVi} đã hoàn thành xuất sắc ${verifiedHours} giờ tham gia học tập chủ động và phụng sự cộng đồng dưới vai trò người học và Peer Tutor tích cực tại The Pencily Gen 1.0 trong giai đoạn từ tháng 04/2026 đến nay.`
  );

  const viPara2 = sanitizeVi(
    `The Pencily là nền tảng giáo dục phi lợi nhuận hướng tới mục tiêu bình đẳng hóa cơ hội tiếp cận tri thức chất lượng cao. Chúng tôi kết nối các học sinh, sinh viên có thành tích xuất sắc trên khắp cả nước và quốc tế để triển khai các buổi kèm học nhóm nhỏ miễn phí, ôn luyện các chứng chỉ chuẩn hóa (Digital SAT, IELTS, Toán học Nâng cao) và xây dựng các nhóm học tập tương trợ lẫn nhau.`
  );

  const viPara3 = sanitizeVi(
    `Toàn bộ số giờ học, nhật ký điểm danh và các đóng góp học thuật đều được kiểm định minh bạch thông qua hệ thống giám sát thời gian thực của The Pencily, tuân thủ nghiêm ngặt Bộ Quy tắc Danh dự (Honor Code). Mọi thắc mắc hoặc yêu cầu đối soát chứng thực, xin vui lòng liên hệ qua email academic@thepencily.org hoặc ban điều phối dự án.`
  );

  const linesViPara1 = doc.splitTextToSize(viPara1, contentWidth);
  doc.text(linesViPara1, marginLeft, 64, { lineHeightFactor: 1.4 });

  let currentY = 64 + linesViPara1.length * 5.2 + 4;
  const linesViPara2 = doc.splitTextToSize(viPara2, contentWidth);
  doc.text(linesViPara2, marginLeft, currentY, { lineHeightFactor: 1.4 });

  currentY += linesViPara2.length * 5.2 + 4;
  const linesViPara3 = doc.splitTextToSize(viPara3, contentWidth);
  doc.text(linesViPara3, marginLeft, currentY, { lineHeightFactor: 1.4 });

  currentY += linesViPara3.length * 5.2 + 6;

  // 5. Signature Block
  doc.setFont(fontRegular, "normal");
  doc.text(sanitizeVi("Trân trọng,"), marginLeft, currentY);

  currentY += 4;
  drawSignature(currentY);

  currentY += 12;
  doc.setFont(fontBold, "bold");
  doc.setFontSize(10);
  doc.setTextColor(15, 39, 71);
  doc.text(sanitizeVi("Ban Điều phối Học thuật & Mạng lưới Peer Tutor"), marginLeft, currentY);

  doc.setFont(fontRegular, "normal");
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(sanitizeVi("Dự án Giáo dục Phi lợi nhuận The Pencily Gen 1.0"), marginLeft, currentY + 4);

  currentY += 16;

  // 6. Section Header: Volunteer Hours
  doc.setDrawColor(15, 39, 71);
  doc.setLineWidth(0.8);
  doc.line(marginLeft, currentY, pageWidth - marginRight, currentY);

  currentY += 7;
  doc.setFont(fontBold, "bold");
  doc.setFontSize(12);
  doc.setTextColor(15, 39, 71);
  doc.text(sanitizeVi("Chi tiết Hoạt động Học thuật & Đóng góp Cộng đồng"), marginLeft, currentY);

  doc.setFont(fontRegular, "normal");
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(
    sanitizeVi(`Chu kỳ hoạt động: 04/2026 - ${today.toLocaleDateString("vi-VN")}`),
    pageWidth - marginRight,
    currentY,
    { align: "right" }
  );

  currentY += 7;

  // 7. Table Header
  doc.setFillColor(248, 250, 252);
  doc.rect(marginLeft, currentY, contentWidth, 7, "F");
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.rect(marginLeft, currentY, contentWidth, 7, "S");

  doc.setFont(fontBold, "bold");
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(sanitizeVi("HOẠT ĐỘNG"), marginLeft + 4, currentY + 4.8);
  doc.text(sanitizeVi("THỜI GIAN"), marginLeft + 105, currentY + 4.8);
  doc.text(sanitizeVi("THỜI LƯỢNG / ĐƠN VỊ"), pageWidth - marginRight - 4, currentY + 4.8, {
    align: "right",
  });

  currentY += 7;

  // Table Rows (Vietnamese)
  const viRows = [
    {
      activity: sanitizeVi("Học nhóm nhỏ Peer Pods & Giải đề thi trực tiếp"),
      date: sanitizeVi("Kỳ Mùa Xuân 2026"),
      duration: sanitizeVi(`${verifiedHours} giờ được xác thực`),
    },
    {
      activity: sanitizeVi("Ôn luyện chứng chỉ chuẩn hóa & Cố vấn học thuật (SAT/IELTS)"),
      date: sanitizeVi("Kỳ Mùa Xuân 2026"),
      duration: sanitizeVi(`${sessionsCount} buổi hoàn thành`),
    },
    {
      activity: sanitizeVi("Hỗ trợ diễn đàn cộng đồng & Trao đổi tài liệu học tập"),
      date: sanitizeVi("Kỳ Mùa Xuân 2026"),
      duration: `${user.points} Pencily Points (PP)`,
    },
  ];

  viRows.forEach((r, idx) => {
    const isEven = idx % 2 === 0;
    doc.setFillColor(isEven ? 255 : 250, isEven ? 255 : 250, isEven ? 255 : 250);
    doc.rect(marginLeft, currentY, contentWidth, 7, "F");
    doc.setDrawColor(226, 232, 240);
    doc.rect(marginLeft, currentY, contentWidth, 7, "S");

    doc.setFont(fontRegular, "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    doc.text(r.activity, marginLeft + 4, currentY + 4.8);

    doc.setFont(fontRegular, "normal");
    doc.setTextColor(100, 116, 139);
    doc.text(r.date, marginLeft + 105, currentY + 4.8);

    doc.setFont(fontBold, "bold");
    doc.setTextColor(15, 39, 71);
    doc.text(r.duration, pageWidth - marginRight - 4, currentY + 4.8, { align: "right" });

    currentY += 7;
  });

  currentY += 4;

  // 8. Total Summary Pill
  doc.setFillColor(238, 242, 255);
  doc.rect(marginLeft, currentY, contentWidth, 9, "F");
  doc.setDrawColor(79, 126, 203);
  doc.setLineWidth(0.5);
  doc.rect(marginLeft, currentY, contentWidth, 9, "S");

  doc.setFont(fontBold, "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(15, 39, 71);
  doc.text(
    sanitizeVi(`Tổng thời lượng hoạt động được chứng thực: ${verifiedHours} giờ (${sessionsCount} buổi học)`),
    pageWidth / 2,
    currentY + 5.8,
    { align: "center" }
  );

  // 9. Page 1 Footer
  doc.setFont(fontRegular, "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  const footerVi = sanitizeVi(
    "Giấy Chứng Nhận Hoàn Thành & Xác Thực Giờ Phụng Sự • Nền tảng Giáo dục Phi lợi nhuận The Pencily • https://thepencily.org"
  );
  doc.text(footerVi, pageWidth / 2, 280, { align: "center" });

  doc.setFont(fontBold, "bold");
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(sanitizeVi("Trang 1 / 2 (Bản Tiếng Việt)"), pageWidth / 2, 285, { align: "center" });

  // ==========================================
  // PAGE 2: BẢN TIẾNG ANH (ENGLISH VERSION)
  // ==========================================
  doc.addPage();

  // 1. Top Architectural Bar
  doc.setFillColor(15, 39, 71);
  doc.rect(marginLeft, 15, contentWidth, 3, "F");

  // Logo / Title in Grand Hotel brand font
  if (fontBrand === "GrandHotel") {
    doc.setFont(fontBrand, "normal");
    doc.setFontSize(32);
    doc.setTextColor(15, 39, 71);
    doc.text("The Pencily", marginLeft, 28);
  } else {
    doc.setFont(fontBold, "bold");
    doc.setFontSize(22);
    doc.setTextColor(15, 39, 71);
    doc.text("The Pencily", marginLeft, 28);
  }

  doc.setFont(fontRegular, "normal");
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text("Equal Peer-to-Peer Learning Network | 100% Non-Profit", marginLeft, 33);

  // Verification Code (top right)
  doc.setFont(fontBold, "bold");
  doc.setFontSize(8);
  doc.setTextColor(79, 126, 203);
  doc.text(`CERT ID: ${certId}`, pageWidth - marginRight, 28, { align: "right" });

  // Divider line
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(marginLeft, 38, pageWidth - marginRight, 38);

  // 2. Date
  doc.setFont(fontRegular, "normal");
  doc.setFontSize(10);
  doc.setTextColor(15, 39, 71);
  doc.text(dateStrEn, marginLeft, 47);

  // 3. Salutation
  doc.setFont(fontBold, "bold");
  doc.setFontSize(11);
  doc.text("To whom it may concern,", marginLeft, 56);

  // 4. Letter Body
  doc.setFont(fontRegular, "normal");
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);

  const enPara1 = `I am pleased to confirm that ${studentNameEn} has successfully completed ${verifiedHours} hours of verified academic engagement and community service as an active peer learner and tutor at The Pencily Gen 1.0 between April 2026 and ${dateStrEn}.`;

  const enPara2 = `The Pencily is an educational non-profit platform dedicated to democratizing equal access to high-quality learning. We connect passionate, high-achieving high school and college peers across Vietnam and internationally for free, small-group tutoring sessions, standardized test mastery (Digital SAT, IELTS, Advanced Mathematics), and collaborative study pods.`;

  const enPara3 = `All session hours, attendance logs, and tutoring contributions are authenticated through The Pencily academic tracking system and strictly uphold our verified Honor Code. If you have any inquiries regarding this student's credentials, please reach out to academic@thepencily.org or verify with our operations team.`;

  const linesEnPara1 = doc.splitTextToSize(enPara1, contentWidth);
  doc.text(linesEnPara1, marginLeft, 64, { lineHeightFactor: 1.4 });

  let currentYEn = 64 + linesEnPara1.length * 5.2 + 4;
  const linesEnPara2 = doc.splitTextToSize(enPara2, contentWidth);
  doc.text(linesEnPara2, marginLeft, currentYEn, { lineHeightFactor: 1.4 });

  currentYEn += linesEnPara2.length * 5.2 + 4;
  const linesEnPara3 = doc.splitTextToSize(enPara3, contentWidth);
  doc.text(linesEnPara3, marginLeft, currentYEn, { lineHeightFactor: 1.4 });

  currentYEn += linesEnPara3.length * 5.2 + 6;

  // 5. Signature Block
  doc.setFont(fontRegular, "normal");
  doc.text("Best regards,", marginLeft, currentYEn);

  currentYEn += 4;
  drawSignature(currentYEn);

  currentYEn += 12;
  doc.setFont(fontBold, "bold");
  doc.setFontSize(10);
  doc.setTextColor(15, 39, 71);
  doc.text("Academic Operations & Peer Tutoring Board", marginLeft, currentYEn);

  doc.setFont(fontRegular, "normal");
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text("The Pencily Gen 1.0 Initiative", marginLeft, currentYEn + 4);

  currentYEn += 16;

  // 6. Section: Volunteer Hours
  doc.setDrawColor(15, 39, 71);
  doc.setLineWidth(0.8);
  doc.line(marginLeft, currentYEn, pageWidth - marginRight, currentYEn);

  currentYEn += 7;
  doc.setFont(fontBold, "bold");
  doc.setFontSize(12);
  doc.setTextColor(15, 39, 71);
  doc.text("Volunteer & Learning Engagement Details", marginLeft, currentYEn);

  doc.setFont(fontRegular, "normal");
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(`Active Cycle: 04/2026 - ${today.toLocaleDateString("en-US")}`, pageWidth - marginRight, currentYEn, {
    align: "right",
  });

  currentYEn += 7;

  // 7. Table Header
  doc.setFillColor(248, 250, 252);
  doc.rect(marginLeft, currentYEn, contentWidth, 7, "F");
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.rect(marginLeft, currentYEn, contentWidth, 7, "S");

  doc.setFont(fontBold, "bold");
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text("ACTIVITY", marginLeft + 4, currentYEn + 4.8);
  doc.text("DATE", marginLeft + 105, currentYEn + 4.8);
  doc.text("DURATION / UNITS", pageWidth - marginRight - 4, currentYEn + 4.8, { align: "right" });

  currentYEn += 7;

  // Table Rows (English)
  const enRows = [
    {
      activity: "Small-Group Peer Pod Tutoring & Live Problem Solving",
      date: "Spring 2026",
      duration: `${verifiedHours} hours verified`,
    },
    {
      activity: "Standardized Test Prep & Academic Mentorship (SAT/IELTS)",
      date: "Spring 2026",
      duration: `${sessionsCount} sessions completed`,
    },
    {
      activity: "Community Forum Peer Support & Study Notes Exchange",
      date: "Spring 2026",
      duration: `${user.points} Pencily Points (PP)`,
    },
  ];

  enRows.forEach((r, idx) => {
    const isEven = idx % 2 === 0;
    doc.setFillColor(isEven ? 255 : 250, isEven ? 255 : 250, isEven ? 255 : 250);
    doc.rect(marginLeft, currentYEn, contentWidth, 7, "F");
    doc.setDrawColor(226, 232, 240);
    doc.rect(marginLeft, currentYEn, contentWidth, 7, "S");

    doc.setFont(fontRegular, "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    doc.text(r.activity, marginLeft + 4, currentYEn + 4.8);

    doc.setFont(fontRegular, "normal");
    doc.setTextColor(100, 116, 139);
    doc.text(r.date, marginLeft + 105, currentYEn + 4.8);

    doc.setFont(fontBold, "bold");
    doc.setTextColor(15, 39, 71);
    doc.text(r.duration, pageWidth - marginRight - 4, currentYEn + 4.8, { align: "right" });

    currentYEn += 7;
  });

  currentYEn += 4;

  // 8. Total Summary Pill
  doc.setFillColor(238, 242, 255);
  doc.rect(marginLeft, currentYEn, contentWidth, 9, "F");
  doc.setDrawColor(79, 126, 203);
  doc.setLineWidth(0.5);
  doc.rect(marginLeft, currentYEn, contentWidth, 9, "S");

  doc.setFont(fontBold, "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(15, 39, 71);
  doc.text(
    `Total Verified Community Service: ${verifiedHours} hours (${sessionsCount} sessions)`,
    pageWidth / 2,
    currentYEn + 5.8,
    { align: "center" }
  );

  // 9. Page 2 Footer
  doc.setFont(fontRegular, "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  const footerEn =
    "Official Certificate of Completion & Verified Service • The Pencily Non-Profit Education Platform • https://thepencily.org";
  doc.text(footerEn, pageWidth / 2, 280, { align: "center" });

  doc.setFont(fontBold, "bold");
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("Page 2 / 2 (English Version)", pageWidth / 2, 285, { align: "center" });

  // TRIGGER INSTANT DIRECT BROWSER DOWNLOAD
  const sanitizedFilename = `The_Pencily_Certificate_Bilingual_${studentNameEn.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;
  doc.save(sanitizedFilename);
}
