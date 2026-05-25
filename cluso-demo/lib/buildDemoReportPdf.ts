import { PDFDocument, StandardFonts, rgb, PDFFont, PDFPage } from "pdf-lib";

/* ──────────────────────────────────────────────
   Types for report data consumed by the PDF builder.
   These mirror the shape of `reportData` from demoData.ts.
   ────────────────────────────────────────────── */

type ReportAnswer = {
  question: string;
  value: string;
  fieldType: string;
};

type ReportAttempt = {
  attemptedAt: string;
  status: string;
  verificationMode: string;
  comment: string;
  verifierName: string;
  managerName: string;
  respondentName: string;
  respondentEmail: string;
  respondentComment?: string;
};

type ReportService = {
  serviceId: string;
  serviceName: string;
  status: string;
  verificationMode: string;
  comment: string;
  candidateAnswers: ReportAnswer[];
  attempts: ReportAttempt[];
};

type DemoReportData = {
  reportNumber: string;
  generatedAt: string;
  generatedByName: string;
  candidate: { name: string; email: string; phone: string };
  company: { name: string; email: string };
  status: string;
  createdAt: string;
  createdByName: string;
  verifiedByName: string;
  personalDetails: ReportAnswer[];
  services: ReportService[];
};

/* ──────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────── */

function sanitize(text: string) {
  return text
    .replace(/₹/g, "INR ")
    .replace(/[^\u0009\u000A\u000D\u0020-\u00FF]/g, "");
}

function formatDateTime(value: string) {
  const d = new Date(value);
  if (isNaN(d.getTime())) return "-";
  return d.toLocaleString("en-IN", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

function formatDateOnly(value: string) {
  const d = new Date(value);
  if (isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
}

function toDisplayStatus(value: string) {
  const n = value.trim().toLowerCase();
  if (!n) return "-";
  if (n === "in-progress") return "In Progress";
  return `${n.charAt(0).toUpperCase()}${n.slice(1)}`;
}

function toDisplayMode(value: string) {
  const n = value.trim();
  if (!n) return "Manual";
  if (n === n.toLowerCase()) return `${n.charAt(0).toUpperCase()}${n.slice(1)}`;
  return n;
}

/* ──────────────────────────────────────────────
   Main PDF builder — runs entirely client-side
   ────────────────────────────────────────────── */

export async function buildDemoReportPdf(report: DemoReportData): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  /* ── Page dimensions & layout constants ── */
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const contentLeft = 70;
  const contentRight = pageWidth - 70;
  const contentWidth = contentRight - contentLeft;
  const topStartY = pageHeight - 58;
  const bottomLimitY = 118;

  const palette = {
    titleBlue: rgb(0.14, 0.28, 0.6),
    headingBlue: rgb(0.12, 0.26, 0.55),
    success: rgb(0.08, 0.52, 0.18),
    danger: rgb(0.78, 0.13, 0.1),
    ink: rgb(0.08, 0.08, 0.08),
    muted: rgb(0.42, 0.42, 0.42),
    borderStrong: rgb(0.56, 0.08, 0.15),
    borderSoft: rgb(0.76, 0.72, 0.44),
    lineStrong: rgb(0.1, 0.1, 0.1),
    lineSoft: rgb(0.46, 0.46, 0.46),
  };

  let page: PDFPage = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = topStartY;

  /* ── Utility drawing functions ── */

  function drawPageFrame(targetPage: PDFPage) {
    targetPage.drawRectangle({
      x: 14,
      y: 14,
      width: pageWidth - 28,
      height: pageHeight - 28,
      borderColor: palette.borderStrong,
      borderWidth: 2,
    });
    targetPage.drawRectangle({
      x: 18,
      y: 18,
      width: pageWidth - 36,
      height: pageHeight - 36,
      borderColor: palette.borderSoft,
      borderWidth: 1,
    });

    const footerText = "Generated Report By ClusoInfolink";
    const footerSize = 11;
    const footerWidth = regularFont.widthOfTextAtSize(footerText, footerSize);
    targetPage.drawText(footerText, {
      x: (pageWidth - footerWidth) / 2,
      y: 38,
      size: footerSize,
      font: regularFont,
      color: palette.muted,
    });
  }

  function addPage() {
    page = pdfDoc.addPage([pageWidth, pageHeight]);
    drawPageFrame(page);
    y = topStartY;
  }

  drawPageFrame(page);

  function ensureSpace(requiredHeight: number) {
    if (y - requiredHeight >= bottomLimitY) return false;
    addPage();
    return true;
  }

  function wrapText(
    text: string,
    size: number,
    maxWidth: number,
    font: PDFFont = regularFont,
    fallback = "",
  ): string[] {
    const normalized = sanitize(text).replace(/\s+/g, " ").trim();
    if (!normalized) return fallback ? [fallback] : [];

    const words = normalized.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    for (const word of words) {
      const candidate = currentLine ? `${currentLine} ${word}` : word;
      if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
        currentLine = candidate;
        continue;
      }
      if (currentLine) lines.push(currentLine);

      if (font.widthOfTextAtSize(word, size) <= maxWidth) {
        currentLine = word;
        continue;
      }
      // Break very long words
      let segment = "";
      for (const char of word) {
        const next = `${segment}${char}`;
        if (font.widthOfTextAtSize(next, size) <= maxWidth) {
          segment = next;
          continue;
        }
        if (segment) lines.push(segment);
        segment = char;
      }
      currentLine = segment;
    }
    if (currentLine) lines.push(currentLine);
    return lines.length > 0 ? lines : fallback ? [fallback] : [];
  }

  function drawHLine(
    lineY: number,
    x = contentLeft,
    width = contentWidth,
    color = palette.lineSoft,
    thickness = 0.8,
  ) {
    page.drawLine({
      start: { x, y: lineY },
      end: { x: x + width, y: lineY },
      thickness,
      color,
    });
  }

  function drawCentered(
    text: string,
    lineY: number,
    size: number,
    font: PDFFont = regularFont,
    color = palette.ink,
  ) {
    const safe = sanitize(text);
    const w = font.widthOfTextAtSize(safe, size);
    page.drawText(safe, {
      x: (pageWidth - w) / 2,
      y: lineY,
      size,
      font,
      color,
    });
  }

  function drawWrapped(
    lines: string[],
    x: number,
    startY: number,
    size: number,
    color = palette.ink,
    font: PDFFont = regularFont,
    lineHeight = size + 2,
  ) {
    for (let i = 0; i < lines.length; i++) {
      page.drawText(sanitize(lines[i]), {
        x,
        y: startY - i * lineHeight,
        size,
        font,
        color,
      });
    }
  }

  function drawLabelValue(
    x: number,
    lineY: number,
    label: string,
    value: string,
    valueColor = palette.ink,
    size = 11,
  ) {
    const sl = sanitize(label);
    const sv = sanitize(value || "-");
    page.drawText(sl, { x, y: lineY, size, font: boldFont, color: palette.ink });
    const lw = boldFont.widthOfTextAtSize(sl, size);
    page.drawText(sv, { x: x + lw + 4, y: lineY, size, font: regularFont, color: valueColor });
  }

  function colorForStatus(status: string) {
    const n = status.trim().toLowerCase();
    if (n === "verified") return palette.success;
    if (n === "unverified" || n === "rejected") return palette.danger;
    if (n === "in-progress" || n === "pending") return rgb(0.63, 0.38, 0.03);
    return palette.ink;
  }

  function colorForAttemptStatus(status: string) {
    const n = status.trim().toLowerCase();
    if (n === "verified") return palette.success;
    if (n === "unverified") return palette.danger;
    return rgb(0.63, 0.38, 0.03);
  }

  /* ───────────────────────────────────────────
     COVER / HEADER AREA
     ─────────────────────────────────────────── */

  const logoBoxY = pageHeight - 245;

  // Fallback text for logo (no filesystem access in browser)
  const fallbackText = "Cluso-Infolink";
  const fallbackSize = 12;
  const fallbackWidth = regularFont.widthOfTextAtSize(fallbackText, fallbackSize);
  page.drawText(fallbackText, {
    x: contentLeft + (200 - fallbackWidth) / 2,
    y: logoBoxY + 170 / 2 - 6,
    size: fallbackSize,
    font: regularFont,
    color: palette.muted,
  });

  // Report metadata (top-right)
  const reportMetaX = contentRight - 170;
  const reportMetaY = pageHeight - 120;
  drawLabelValue(reportMetaX, reportMetaY, "Report #: ", report.reportNumber, palette.muted, 12);
  drawLabelValue(
    reportMetaX + 47,
    reportMetaY - 20,
    "Date: ",
    formatDateOnly(report.generatedAt),
    palette.muted,
    12,
  );

  // Title
  drawCentered("Verification Report", logoBoxY - 60, 48, boldFont, palette.titleBlue);

  /* ───────────────────────────────────────────
     SUMMARY BOX
     ─────────────────────────────────────────── */
  const summaryTopY = logoBoxY - 78;
  const summaryHeight = 74;
  const summaryY = summaryTopY - summaryHeight;

  page.drawRectangle({
    x: contentLeft,
    y: summaryY,
    width: contentWidth,
    height: summaryHeight,
    borderColor: rgb(0.8, 0.8, 0.8),
    borderWidth: 0.8,
    color: rgb(0.98, 0.98, 0.98),
    opacity: 1,
  });

  const summaryLeftX = contentLeft + 10;
  const summaryRightX = contentLeft + contentWidth / 2 + 8;
  let sty = summaryTopY - 20;

  drawLabelValue(summaryLeftX, sty, "Report Number:", report.reportNumber, palette.ink, 10.8);
  drawLabelValue(summaryRightX, sty, "Generated At:", formatDateTime(report.generatedAt), palette.ink, 10.8);
  sty -= 17;
  drawLabelValue(summaryLeftX, sty, "Request Created:", formatDateTime(report.createdAt), palette.ink, 10.8);
  drawLabelValue(summaryRightX, sty, "Generated By:", report.generatedByName || "-", palette.ink, 10.8);
  sty -= 17;
  drawLabelValue(
    summaryLeftX,
    sty,
    "Overall Status:",
    toDisplayStatus(report.status),
    colorForStatus(report.status),
    10.8,
  );

  y = summaryY - 28;

  /* ───────────────────────────────────────────
     CANDIDATE & COMPANY DETAILS (two-column)
     ─────────────────────────────────────────── */
  function drawCandidateAndCompanyDetails(startY: number) {
    const columnGap = 20;
    const detailsColumnWidth = (contentWidth - columnGap) / 2;
    const leftColumnX = contentLeft;
    const rightColumnX = contentLeft + detailsColumnWidth + columnGap;

    page.drawText("Candidate Details", {
      x: leftColumnX,
      y: startY,
      size: 12,
      font: boldFont,
      color: palette.headingBlue,
    });
    page.drawText("Company Details", {
      x: rightColumnX,
      y: startY,
      size: 12,
      font: boldFont,
      color: palette.headingBlue,
    });

    const lineHeight = 16;
    const leftDetails = [
      { label: "Name:", value: report.candidate.name || "-" },
      { label: "Email:", value: report.candidate.email || "-" },
      { label: "Phone:", value: report.candidate.phone || "-" },
    ];
    const rightDetails = [
      { label: "Company:", value: report.company.name || "-" },
      { label: "Email:", value: report.company.email || "-" },
    ];

    let ldy = startY - 22;
    for (const entry of leftDetails) {
      drawLabelValue(leftColumnX, ldy, entry.label, entry.value, palette.ink, 11);
      ldy -= lineHeight;
    }
    let rdy = startY - 22;
    for (const entry of rightDetails) {
      drawLabelValue(rightColumnX, rdy, entry.label, entry.value, palette.ink, 11);
      rdy -= lineHeight;
    }

    const bottomY = Math.min(ldy, rdy) - 10;
    drawHLine(bottomY, contentLeft + 16, contentWidth - 16, palette.lineSoft, 0.9);
    return bottomY - 22;
  }

  y = drawCandidateAndCompanyDetails(y);

  /* ───────────────────────────────────────────
     Q&A TABLE — reusable for personal details
     and candidate answers
     ─────────────────────────────────────────── */
  const qaColumns = {
    question: { x: contentLeft, width: Math.floor(contentWidth * 0.42) },
    response: {
      x: contentLeft + Math.floor(contentWidth * 0.42),
      width: contentWidth - Math.floor(contentWidth * 0.42),
    },
  };

  function drawQATableHeader(leftLabel: string, rightLabel: string) {
    const headerHeight = 20;
    ensureSpace(headerHeight + 4);

    page.drawRectangle({
      x: contentLeft,
      y: y - headerHeight,
      width: contentWidth,
      height: headerHeight,
      borderColor: palette.lineSoft,
      borderWidth: 0.7,
      color: rgb(0.97, 0.98, 1),
      opacity: 1,
    });
    page.drawLine({
      start: { x: qaColumns.response.x, y },
      end: { x: qaColumns.response.x, y: y - headerHeight },
      thickness: 0.7,
      color: palette.lineSoft,
    });
    page.drawText(leftLabel, {
      x: qaColumns.question.x + 4,
      y: y - 14,
      size: 10.5,
      font: boldFont,
      color: palette.ink,
    });
    page.drawText(rightLabel, {
      x: qaColumns.response.x + 4,
      y: y - 14,
      size: 10.5,
      font: boldFont,
      color: palette.ink,
    });
    y -= headerHeight;
  }

  function drawQATableRow(questionText: string, responseText: string, fontSize = 10.2) {
    const qLines = wrapText(questionText || "Field", fontSize, qaColumns.question.width - 8, regularFont, "-");
    const rLines = wrapText(responseText || "-", fontSize, qaColumns.response.width - 8, regularFont, "-");
    const lineH = 10;
    const rowLineCount = Math.max(qLines.length, rLines.length, 1);
    const rowHeight = rowLineCount * lineH + 6;

    ensureSpace(rowHeight + 1);
    page.drawRectangle({
      x: contentLeft,
      y: y - rowHeight,
      width: contentWidth,
      height: rowHeight,
      borderColor: palette.lineSoft,
      borderWidth: 0.65,
    });
    page.drawLine({
      start: { x: qaColumns.response.x, y },
      end: { x: qaColumns.response.x, y: y - rowHeight },
      thickness: 0.65,
      color: palette.lineSoft,
    });
    drawWrapped(qLines, qaColumns.question.x + 4, y - 10, fontSize, palette.ink, regularFont, lineH);
    drawWrapped(rLines, qaColumns.response.x + 4, y - 10, fontSize, palette.ink, regularFont, lineH);
    y -= rowHeight;
  }

  /* ── Personal Details ── */
  if (report.personalDetails.length > 0) {
    ensureSpace(58);
    page.drawText("Personal Details", {
      x: contentLeft,
      y,
      size: 14,
      font: boldFont,
      color: palette.headingBlue,
    });
    y -= 16;

    drawQATableHeader("Field", "Response");
    for (const detail of report.personalDetails) {
      drawQATableRow(detail.question || "Field", detail.value || "-", 10.2);
    }
    y -= 6;
  }

  /* ───────────────────────────────────────────
     SERVICE VERIFICATION SUMMARY
     ─────────────────────────────────────────── */

  const tableColumns = {
    dateTime: { x: contentLeft, width: 130 },
    status: { x: contentLeft + 140, width: 66 },
    mode: { x: contentLeft + 214, width: 62 },
    details: { x: contentLeft + 286, width: contentRight - (contentLeft + 286) },
  };

  function drawServiceTableHeader() {
    ensureSpace(30);
    drawHLine(y, contentLeft, contentWidth, palette.lineStrong, 0.9);
    const headerY = y - 16;

    page.drawText("Date & Time", { x: tableColumns.dateTime.x, y: headerY, size: 11, font: boldFont, color: palette.ink });
    page.drawText("Status", { x: tableColumns.status.x, y: headerY, size: 11, font: boldFont, color: palette.ink });
    page.drawText("Mode", { x: tableColumns.mode.x, y: headerY, size: 11, font: boldFont, color: palette.ink });
    page.drawText("Attempt Details", { x: tableColumns.details.x, y: headerY, size: 11, font: boldFont, color: palette.ink });

    y = headerY - 8;
    drawHLine(y, contentLeft, contentWidth, palette.lineSoft, 0.8);
    y -= 12;
  }

  ensureSpace(36);
  page.drawText("Service Verification Summary", {
    x: contentLeft,
    y,
    size: 15,
    font: boldFont,
    color: palette.headingBlue,
  });
  y -= 28;

  report.services.forEach((service, serviceIndex) => {
    // Service heading
    ensureSpace(80);
    const heading = `${serviceIndex + 1}. ${service.serviceName}`;
    page.drawText(sanitize(heading), {
      x: contentLeft,
      y,
      size: 13.5,
      font: boldFont,
      color: palette.ink,
    });
    y -= 22;

    // Final status + mode
    drawLabelValue(
      contentLeft,
      y,
      "Final Status:",
      toDisplayStatus(service.status),
      colorForStatus(service.status),
      11.5,
    );

    const modeText = `Mode: ${toDisplayMode(service.verificationMode)}`;
    const modeLines = wrapText(modeText, 11.5, contentRight - (contentLeft + 170), boldFont, "-");
    drawWrapped(modeLines, contentLeft + 170, y, 11.5, palette.ink, boldFont, 14);
    y -= Math.max(14, modeLines.length * 14);

    // Comment
    if (service.comment?.trim()) {
      const commentLines = wrapText(`Comment: ${service.comment.trim()}`, 11, contentWidth, regularFont, "-");
      drawWrapped(commentLines, contentLeft, y, 11, palette.ink, regularFont, 13);
      y -= commentLines.length * 13;
    }

    // Candidate answers Q&A
    if (service.candidateAnswers.length > 0) {
      y -= 2;
      drawQATableHeader("Candidate Answers", "Response");
      for (const answer of service.candidateAnswers) {
        drawQATableRow(answer.question || "Field", answer.value || "-", 10.2);
      }
    }

    y -= 5;
    drawServiceTableHeader();

    // Verification attempts
    if (service.attempts.length === 0) {
      page.drawText("No verification attempts were logged for this service.", {
        x: contentLeft,
        y,
        size: 10.5,
        font: regularFont,
        color: palette.muted,
      });
      y -= 18;
      drawHLine(y + 4, contentLeft, contentWidth, palette.lineSoft, 0.8);
      y -= 10;
      return;
    }

    for (const attempt of [...service.attempts].reverse()) {
      const dateLines = wrapText(formatDateTime(attempt.attemptedAt), 10.8, tableColumns.dateTime.width, regularFont, "-");
      const statusLines = wrapText(toDisplayStatus(attempt.status), 10.8, tableColumns.status.width, regularFont, "-");
      const mLines = wrapText(toDisplayMode(attempt.verificationMode || service.verificationMode), 10.8, tableColumns.mode.width, regularFont, "-");

      const detailParts: string[] = [];
      if (attempt.verifierName?.trim()) detailParts.push(`Verifier: ${attempt.verifierName.trim()}`);
      if (attempt.managerName?.trim()) detailParts.push(`Manager: ${attempt.managerName.trim()}`);
      if (attempt.respondentName?.trim()) detailParts.push(`Respondent Name: ${attempt.respondentName.trim()}`);
      if (attempt.respondentEmail?.trim()) detailParts.push(`Respondent Email: ${attempt.respondentEmail.trim()}`);
      if (attempt.respondentComment?.trim()) detailParts.push(`Respondent Comment: ${attempt.respondentComment.trim()}`);
      if (attempt.comment?.trim()) detailParts.push(`Note: ${attempt.comment.trim()}`);

      const detailsLines = detailParts.flatMap((part) =>
        wrapText(part, 10.8, tableColumns.details.width, regularFont, "-"),
      );

      const rowLineHeight = 12.8;
      const rowLineCount = Math.max(dateLines.length, statusLines.length, mLines.length, detailsLines.length);
      const rowHeight = rowLineCount * rowLineHeight + 5;

      ensureSpace(rowHeight + 8);
      const rowTop = y;

      drawWrapped(dateLines, tableColumns.dateTime.x, rowTop, 10.8, palette.ink, regularFont, rowLineHeight);
      drawWrapped(statusLines, tableColumns.status.x, rowTop, 10.8, colorForAttemptStatus(attempt.status), regularFont, rowLineHeight);
      drawWrapped(mLines, tableColumns.mode.x, rowTop, 10.8, palette.ink, regularFont, rowLineHeight);
      drawWrapped(detailsLines, tableColumns.details.x, rowTop, 10.8, palette.ink, regularFont, rowLineHeight);

      y -= rowHeight;
      drawHLine(y + 2, contentLeft, contentWidth, rgb(0.35, 0.35, 0.35), 0.65);
      y -= 6;
    }

    y -= 6;
  });

  /* ───────────────────────────────────────────
     CREATED BY / VERIFIED BY SIGNATURES
     ─────────────────────────────────────────── */
  ensureSpace(58);
  const signatureTopY = y;

  page.drawText("Created By:", {
    x: contentLeft,
    y: signatureTopY,
    size: 12,
    font: boldFont,
    color: palette.ink,
  });
  page.drawText(sanitize(report.generatedByName || "-"), {
    x: contentLeft,
    y: signatureTopY - 18,
    size: 12,
    font: regularFont,
    color: palette.ink,
  });

  const verifiedLabel = "Verified By:";
  const verifiedLabelWidth = boldFont.widthOfTextAtSize(verifiedLabel, 12);
  const safeVerifiedName = sanitize(report.verifiedByName || "-");
  const verifiedNameWidth = regularFont.widthOfTextAtSize(safeVerifiedName, 12);

  page.drawText(verifiedLabel, {
    x: contentRight - verifiedLabelWidth,
    y: signatureTopY,
    size: 12,
    font: boldFont,
    color: palette.ink,
  });
  page.drawText(safeVerifiedName, {
    x: contentRight - verifiedNameWidth,
    y: signatureTopY - 18,
    size: 12,
    font: regularFont,
    color: palette.ink,
  });

  y = signatureTopY - 52;

  /* ───────────────────────────────────────────
     DISCLAIMER / NOTICE BLOCK
     ─────────────────────────────────────────── */
  const noticeHeading = "--END OF REPORT--";
  const noticeSubheading = "IMPORTANT NOTICE & DISCLAIMER";
  const noticeParagraphs = [
    "This report is provided by CLUSO INFOLINK PRIVATE LIMITED on a strictly confidential basis, solely for the exclusive use of the recipient for legitimate corporate and business purposes. It may not be reproduced, redistributed, or disclosed, in whole or in part, in any manner whatsoever without prior written consent.",
    "While CLUSO INFOLINK PRIVATE LIMITED endeavors to ensure the highest level of accuracy and diligence in procuring, collecting, and compiling this data, it does not warrant or guarantee the absolute completeness, correctness, or timeliness of the information contained herein. Consequently, CLUSO INFOLINK PRIVATE LIMITED shall not be held liable for any direct, indirect, or consequential loss, damage, or injury resulting from any errors, omissions, or negligence in the procurement or communication of this information. Reliance upon this report is strictly at the user's sole risk.",
    "The recipient acknowledges that the handling and utilization of this data must strictly align with all prevailing Indian regulatory frameworks, including but not limited to the Digital Personal Data Protection Act, 2023 (DPDP Act) and the Information Technology Act, 2000, along with all subsequent amendments and rules.",
  ];
  const questionHeading = "QUESTIONS?";
  const questionSupportText =
    "If you have any questions about this report, please feel free to contact us:";
  const questionContactText = "Email: support@cluso.in";

  const noticeBoxPadding = 14;
  const noticeInnerWidth = contentWidth - noticeBoxPadding * 2;
  const noticeBodySize = 8.7;
  const noticeBodyLineHeight = 10.2;

  const paragraphLines = noticeParagraphs.map((p) =>
    wrapText(p, noticeBodySize, noticeInnerWidth, regularFont, "-"),
  );
  const questionSupportLines = wrapText(
    questionSupportText,
    noticeBodySize,
    noticeInnerWidth,
    regularFont,
    "-",
  );
  const questionContactLines = wrapText(
    questionContactText,
    noticeBodySize,
    noticeInnerWidth,
    regularFont,
    "-",
  );

  const noticeHeight =
    noticeBoxPadding +
    11 +
    14 +
    paragraphLines.reduce((sum, lines) => sum + lines.length * noticeBodyLineHeight + 7, 0) +
    6 +
    11 +
    questionSupportLines.length * noticeBodyLineHeight +
    5 +
    questionContactLines.length * noticeBodyLineHeight +
    14 +
    noticeBoxPadding;

  ensureSpace(noticeHeight + 12);

  const noticeTopY = y;
  const noticeBoxY = noticeTopY - noticeHeight;

  page.drawRectangle({
    x: contentLeft + 2,
    y: noticeBoxY,
    width: contentWidth - 4,
    height: noticeHeight,
    borderColor: palette.lineSoft,
    borderWidth: 0.9,
  });

  let ncY = noticeTopY - noticeBoxPadding - 2;

  page.drawText(noticeHeading, {
    x: contentLeft + noticeBoxPadding,
    y: ncY,
    size: 11,
    font: boldFont,
    color: palette.ink,
  });
  ncY -= 14;

  page.drawText(noticeSubheading, {
    x: contentLeft + noticeBoxPadding,
    y: ncY,
    size: 10.4,
    font: boldFont,
    color: palette.ink,
  });
  ncY -= 12;

  for (const lines of paragraphLines) {
    drawWrapped(lines, contentLeft + noticeBoxPadding, ncY, noticeBodySize, palette.ink, regularFont, noticeBodyLineHeight);
    ncY -= lines.length * noticeBodyLineHeight + 7;
  }

  drawHLine(ncY + 3, contentLeft + noticeBoxPadding, noticeInnerWidth, palette.lineSoft, 0.7);
  ncY -= 12;

  page.drawText(questionHeading, {
    x: contentLeft + noticeBoxPadding,
    y: ncY,
    size: 10.2,
    font: boldFont,
    color: palette.ink,
  });
  ncY -= 12;

  drawWrapped(questionSupportLines, contentLeft + noticeBoxPadding, ncY, noticeBodySize, palette.ink, regularFont, noticeBodyLineHeight);
  ncY -= questionSupportLines.length * noticeBodyLineHeight + 5;

  drawWrapped(questionContactLines, contentLeft + noticeBoxPadding, ncY, noticeBodySize, palette.ink, regularFont, noticeBodyLineHeight);

  const revisionText = "Rev 3.2 (15322)";
  const revisionSize = 7.6;
  const revisionWidth = regularFont.widthOfTextAtSize(revisionText, revisionSize);
  page.drawText(revisionText, {
    x: contentLeft + contentWidth - noticeBoxPadding - revisionWidth,
    y: noticeBoxY + 6,
    size: revisionSize,
    font: regularFont,
    color: palette.ink,
  });

  /* ── Save and return ── */
  return await pdfDoc.save();
}
