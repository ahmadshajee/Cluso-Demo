"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ListChecks, RotateCw, FileText, AlertCircle } from "lucide-react";
import { DemoPortalFrame } from "@/components/DemoPortalFrame";
import { DemoStepIndicator } from "@/components/DemoStepIndicator";
import { DemoCallout } from "@/components/DemoCallout";
import { customerUser, demoRequests } from "@/lib/demoData";
import { useState } from "react";

export default function CompanyHRReviewPage() {
  const router = useRouter();
  const verifiedRequest = demoRequests.find((r) => r._id === "req_003")!; // Vikram Desai — verified
  const companyRequests = demoRequests.filter((r) => r.customerName === "TechVista Solutions Pvt. Ltd.");
  const [expandedId, setExpandedId] = useState<string>("req_003");

  return (
    <>
      <DemoStepIndicator currentSlug="company-hr-review" />
      <DemoPortalFrame
        portal="customer"
        userName={customerUser.name}
        title="Verification Requests"
        subtitle="Review verified requests, view reports, and file appeals."
        activeNavLabel="Requests"
      >
        <DemoCallout items={[
          { title: "Report Access", text: "Once verification is complete, HR can view the full report, download a PDF copy, or share it with stakeholders.", arrow: "down" },
          { title: "PDF Download", text: "The system generates a professional PDF report with all candidate answers, verification attempts, and respondent confirmations.", arrow: "down" },
          { title: "Reverification Appeal", text: "If HR disagrees with any finding, they can file an appeal for re-verification. The admin team will re-investigate the flagged services.", arrow: "down" },
        ]} />
        <div className="block-card" style={{ padding: "1.2rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <h3 className="block-title"><ListChecks size={18} /> Requests</h3>
          </div>

          <div className="request-list">
            {companyRequests.map((request) => {
              const isExpanded = expandedId === request._id;
              const isVerified = request.status === "verified";
              return (
                <div key={request._id}>
                  <div
                    className={`request-item ${isExpanded ? "highlighted" : ""}`}
                    onClick={() => setExpandedId(isExpanded ? "" : request._id)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="request-item-left">
                      <span className="request-item-name">
                        {request.candidateName}
                        {isExpanded && isVerified && (
                          <span style={{ background: "#e8f8f3", color: "#0f766e", fontSize: "0.68rem", padding: "0.12rem 0.45rem", borderRadius: "4px", fontWeight: 700, marginLeft: "0.5rem" }}>
                            REPORT AVAILABLE
                          </span>
                        )}
                      </span>
                      <span className="request-item-services">
                        {request.selectedServices.map((s) => s.serviceName).join(", ")}
                      </span>
                      <span className="request-item-meta">
                        {new Date(request.createdAt).toLocaleDateString("en-IN")}
                      </span>
                    </div>
                    <div className="request-item-right">
                      <span className={`status-pill status-pill-${request.status}`}>{request.status}</span>
                    </div>
                  </div>

                  {isExpanded && isVerified && (
                    <div style={{ border: "1px solid #0f766e", borderTop: "none", borderRadius: "0 0 14px 14px", padding: "1.2rem", background: "#f0fdfa" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.8rem" }}>
                        <span style={{ fontSize: "1.1rem" }}>📄</span>
                        <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#134e4a" }}>
                          Verification Report — {request.candidateName}
                        </h4>
                      </div>

                      <div style={{ display: "grid", gap: "0.4rem", marginBottom: "1rem", fontSize: "0.88rem", color: "#334155" }}>
                        <div><strong>Report No:</strong> CLR-2026-00347</div>
                        <div><strong>Status:</strong> <span className="status-pill status-pill-verified" style={{ marginLeft: "0.3rem" }}>Verified</span></div>
                        <div><strong>Generated:</strong> 23 May 2026</div>
                        <div><strong>Services:</strong> {request.selectedServices.map((s) => s.serviceName).join(", ")}</div>
                      </div>

                      <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
                        <Link href="/demo/report-ready" className="btn btn-primary" style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.84rem", textDecoration: "none" }}>
                          <FileText size={15} /> View Full Report
                        </Link>
                        <button className="btn btn-secondary" type="button" style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.84rem" }}>
                          📥 Download PDF
                        </button>
                        <button className="btn btn-ghost" type="button" style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.84rem", borderColor: "#f59e0b", color: "#92400e" }} onClick={() => router.push("/demo/hire-decision")}>
                          <RotateCw size={15} /> Appeal for Reverification
                        </button>
                      </div>

                      <div style={{ marginTop: "1rem", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "10px", padding: "0.7rem", display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.82rem", color: "#92400e" }}>
                        <AlertCircle size={16} style={{ flexShrink: 0, marginTop: "0.1rem" }} />
                        <div>
                          <strong>Appeal Process:</strong> If you believe any verification result is inaccurate, you can file an appeal for reverification. The admin team will review your appeal and re-verify the requested services.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </DemoPortalFrame>
    </>
  );
}
