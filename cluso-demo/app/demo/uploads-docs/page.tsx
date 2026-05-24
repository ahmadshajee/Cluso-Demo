"use client";

import { Upload, CheckCircle2, FileText, Sparkles } from "lucide-react";
import { DemoPortalFrame } from "@/components/DemoPortalFrame";
import { DemoStepIndicator } from "@/components/DemoStepIndicator";
import { candidateUser, uploadedDocuments } from "@/lib/demoData";

export default function UploadsDocsPage() {
  return (
    <>
      <DemoStepIndicator currentSlug="uploads-docs" />
      <DemoPortalFrame
        portal="candidate"
        userName={candidateUser.name}
        title="Upload Documents"
        subtitle="Upload supporting documents for your verification."
        activeNavLabel="Forms to Fill"
      >
        <div className="block-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.2rem" }}>
            <span className="icon-chip"><Upload size={14} /></span>
            <h2 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700 }}>Document Upload</h2>
            <span className="demo-label"><Sparkles size={11} /> Demo</span>
          </div>

          <div className="upload-zone">
            <div className="upload-zone-icon">📁</div>
            <p style={{ margin: "0 0 0.3rem", fontWeight: 600, color: "#334155" }}>
              Drag and drop files here
            </p>
            <p className="upload-zone-text">
              or <span className="upload-zone-cta">click to browse</span>
            </p>
            <p style={{ margin: "0.5rem 0 0", fontSize: "0.78rem", color: "#94a3b8" }}>
              Accepted: PDF, PNG, JPG, WEBP (max 5 MB per file)
            </p>
          </div>

          <div style={{ marginTop: "1.2rem" }}>
            <h3 style={{ margin: "0 0 0.6rem", fontSize: "0.95rem", fontWeight: 700, color: "#2d3748" }}>
              Uploaded Documents ({uploadedDocuments.length})
            </h3>
            <div className="uploaded-file-list">
              {uploadedDocuments.map((doc, i) => (
                <div key={i} className="uploaded-file-item">
                  <div className="uploaded-file-info">
                    <FileText size={16} style={{ color: "#3b82f6", flexShrink: 0 }} />
                    <span>{doc.name}</span>
                    <span className="uploaded-file-size">{doc.size}</span>
                  </div>
                  <CheckCircle2 size={18} className="uploaded-file-check" />
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.6rem", marginTop: "1.5rem", justifyContent: "flex-end" }}>
            <button className="btn btn-primary" type="button">Submit All Documents</button>
          </div>
        </div>
      </DemoPortalFrame>
    </>
  );
}
