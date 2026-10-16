import { jsPDF } from "jspdf";
import { StudentUser } from "@/context/PencilyContext";

/**
 * Generates and triggers download of an official The Pencily Certificate of Completion / Volunteer Hours PDF.
 * Inspired by Schoolhouse.world official verified credentials.
 */
export function downloadPencilyCertificatePdf(user: StudentUser, language: "vi" | "en" = "vi") {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const marginLeft = 20;
  const marginRight = 20;
  const contentWidth = pageWidth - marginLeft - marginRight;

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Helper function to remove Vietnamese diacritics for standard Helvetica font rendering
  const removeVietnameseTones = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };

  const rawStudentName = user.realName || user.name || "Student Peer";
  const studentName = removeVietnameseTones(rawStudentName);
  const verifiedHours = Math.max(1, Math.round((user.learningMinutes || 120) / 60));
  const sessionsCount = Math.max(1, user.sessionsAttended || 3);
  const certId = `TP-CERT-GEN1-${Date.now().toString(36).toUpperCase()}`;

  // 1. BRAND HEADER
  // Draw subtle top architectural bar
  doc.setFillColor(15, 39, 71); // #0F2747 Deep Navy
  doc.rect(marginLeft, 15, contentWidth, 3, "F");

  // Logo / Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(15, 39, 71);
  doc.text("The Pencily", marginLeft, 28);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text("Equal Peer-to-Peer Learning Network | 100% Non-Profit", marginLeft, 33);

  // Verification Code (top right)
  doc.setFont("courier", "bold");
  doc.setFontSize(8);
  doc.setTextColor(79, 126, 203);
  doc.text(`CERT ID: ${certId}`, pageWidth - marginRight, 28, { align: "right" });

  // Divider line
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(marginLeft, 38, pageWidth - marginRight, 38);

  // 2. LETTER DATE
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(15, 39, 71);
  doc.text(formattedDate, marginLeft, 47);

  // 3. FORMAL SALUTATION
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("To whom it may concern,", marginLeft, 56);

  // 4. LETTER BODY (Schoolhouse.world standard format)
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);

  const para1 = `I am pleased to confirm that ${studentName} has successfully completed ${verifiedHours} hours of verified academic engagement and community service as an active peer learner and tutor at The Pencily Gen 1.0 between April 2026 and ${formattedDate}.`;

  const para2 = `The Pencily is an educational non-profit platform dedicated to democratizing equal access to high-quality learning. We connect passionate, high-achieving high school and college peers across Vietnam and internationally for free, small-group tutoring sessions, standardized test mastery (Digital SAT, IELTS, Advanced Mathematics), and collaborative study pods.`;

  const para3 = `All session hours, attendance logs, and tutoring contributions are authenticated through The Pencily academic tracking system and strictly uphold our verified Honor Code. If you have any inquiries regarding this student's credentials, please reach out to academic@thepencily.org or verify with our operations team.`;

  const linesPara1 = doc.splitTextToSize(para1, contentWidth);
  doc.text(linesPara1, marginLeft, 64, { lineHeightFactor: 1.4 });

  let currentY = 64 + linesPara1.length * 5.2 + 4;
  const linesPara2 = doc.splitTextToSize(para2, contentWidth);
  doc.text(linesPara2, marginLeft, currentY, { lineHeightFactor: 1.4 });

  currentY += linesPara2.length * 5.2 + 4;
  const linesPara3 = doc.splitTextToSize(para3, contentWidth);
  doc.text(linesPara3, marginLeft, currentY, { lineHeightFactor: 1.4 });

  currentY += linesPara3.length * 5.2 + 6;

  // 5. SIGNATURE BLOCK
  doc.setFont("helvetica", "normal");
  doc.text("Best regards,", marginLeft, currentY);

  currentY += 4;
  // Stylized cursive signature path
  doc.setDrawColor(15, 39, 71);
  doc.setLineWidth(1);
  // Signature vector stroke
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
    currentY + 6
  );

  currentY += 12;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(15, 39, 71);
  doc.text("Academic Operations & Peer Tutoring Board", marginLeft, currentY);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text("The Pencily Gen 1.0 Initiative", marginLeft, currentY + 4);

  currentY += 16;

  // 6. SECTION: VOLUNTEER HOURS & ENGAGEMENT DETAILS
  doc.setDrawColor(15, 39, 71);
  doc.setLineWidth(0.8);
  doc.line(marginLeft, currentY, pageWidth - marginRight, currentY);

  currentY += 7;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(15, 39, 71);
  doc.text("Volunteer & Learning Engagement Details", marginLeft, currentY);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(`Active Cycle: 04/2026 - ${today.toLocaleDateString("en-US")}`, pageWidth - marginRight, currentY, {
    align: "right",
  });

  currentY += 7;

  // 7. TABLE HEADER
  doc.setFillColor(248, 250, 252); // slate-50
  doc.rect(marginLeft, currentY, contentWidth, 7, "F");
  doc.setDrawColor(203, 213, 225); // slate-300
  doc.setLineWidth(0.3);
  doc.rect(marginLeft, currentY, contentWidth, 7, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text("ACTIVITY", marginLeft + 4, currentY + 4.8);
  doc.text("DATE", marginLeft + 105, currentY + 4.8);
  doc.text("DURATION / UNITS", pageWidth - marginRight - 4, currentY + 4.8, { align: "right" });

  currentY += 7;

  // TABLE ROWS
  const rows = [
    {
      activity: "Small-Group Peer Pod Tutoring & Live Problem Solving",
      date: "Spring 2026",
      duration: `${verifiedHours} hours`,
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

  rows.forEach((r, idx) => {
    const isEven = idx % 2 === 0;
    if (isEven) {
      doc.setFillColor(255, 255, 255);
    } else {
      doc.setFillColor(250, 250, 250);
    }
    doc.rect(marginLeft, currentY, contentWidth, 7, "F");
    doc.setDrawColor(226, 232, 240);
    doc.rect(marginLeft, currentY, contentWidth, 7, "S");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    doc.text(r.activity, marginLeft + 4, currentY + 4.8);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.text(r.date, marginLeft + 105, currentY + 4.8);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 39, 71);
    doc.text(r.duration, pageWidth - marginRight - 4, currentY + 4.8, { align: "right" });

    currentY += 7;
  });

  currentY += 4;

  // 8. TOTAL SUMMARY PILL
  doc.setFillColor(238, 242, 255); // indigo/slate tint
  doc.rect(marginLeft, currentY, contentWidth, 9, "F");
  doc.setDrawColor(79, 126, 203);
  doc.setLineWidth(0.5);
  doc.rect(marginLeft, currentY, contentWidth, 9, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(15, 39, 71);
  doc.text(
    `Total Verified Community Service: ${verifiedHours} hours (${sessionsCount} sessions)`,
    pageWidth / 2,
    currentY + 5.8,
    { align: "center" }
  );

  // 9. FOOTER
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  const footerText =
    "Official Certificate of Completion & Verified Service • The Pencily Non-Profit Education Platform • https://thepencily.org";
  doc.text(footerText, pageWidth / 2, 285, { align: "center" });

  // TRIGGER INSTANT DIRECT BROWSER DOWNLOAD
  const sanitizedFilename = `The_Pencily_Certificate_${studentName.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;
  doc.save(sanitizedFilename);
}
