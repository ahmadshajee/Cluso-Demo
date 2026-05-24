"use client";

import { CheckCircle2, XCircle, AlertTriangle, ListChecks, Search } from "lucide-react";
import { DemoPortalFrame } from "@/components/DemoPortalFrame";
import { DemoStepIndicator } from "@/components/DemoStepIndicator";
import { customerUser, demoRequests } from "@/lib/demoData";

export default function ApprovedPage() {
  const companyRequests = demoRequests.filter((r) => r.customerName === "TechVista Solutions Pvt. Ltd.");

  return (
    <>
      <DemoStepIndicator currentSlug="approved" />
      <DemoPortalFrame
        portal="customer"
        userName={customerUser.name}
        title="Review Requests"
        subtitle="Track pending, enterprise decisions, and verified items."
        activeNavLabel="Requests"
      >
        <div className="block-card" style={{ padding: "1.2rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <h3 className="block-title"><ListChecks size={18} /> All Requests</h3>
          </div>

          <div className="request-list" style={{ opacity: 0.4, pointerEvents: "none" }}>
            {companyRequests.slice(0, 3).map((request) => (
              <div key={request._id} className="request-item">
                <div className="request-item-left">
                  <span className="request-item-name">{request.candidateName}</span>
                  <span className="request-item-services">
                    {request.selectedServices.map((s) => s.serviceName).join(", ")}
                  </span>
                </div>
                <div className="request-item-right">
                  <span className={`status-pill status-pill-${request.status}`}>{request.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Approval/Rejection Dialog Overlay */}
        <div className="demo-overlay">
          <div className="demo-dialog">
            <h3 className="demo-dialog-title">
              <AlertTriangle size={20} style={{ color: "#f59e0b" }} />
              Enterprise Decision
            </h3>
            <div className="demo-dialog-body">
              <p style={{ margin: 0, color: "#4a5568", fontSize: "0.92rem" }}>
                You are about to make an enterprise decision for:
              </p>
              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "0.8rem" }}>
                <div style={{ display: "grid", gap: "0.3rem" }}>
                  <div style={{ fontSize: "0.88rem" }}><strong>Candidate:</strong> Arjun Nair</div>
                  <div style={{ fontSize: "0.88rem" }}><strong>Email:</strong> arjun.nair@email.com</div>
                  <div style={{ fontSize: "0.88rem" }}><strong>Services:</strong> Education Verification, Address Verification</div>
                  <div style={{ fontSize: "0.88rem" }}><strong>Created:</strong> 21/5/2026</div>
                </div>
              </div>

              <div style={{ marginTop: "0.5rem" }}>
                <label className="label">Decision Note (optional)</label>
                <textarea className="textarea" placeholder="Add a note about your decision..." defaultValue="All candidate information has been reviewed and verified against submitted documents. Approved for background verification processing." readOnly />
              </div>

              <p style={{ margin: 0, fontSize: "0.78rem", color: "#94a3b8" }}>
                ⏱️ You will have 10 minutes to reverse this decision after approval.
              </p>
            </div>

            <div className="demo-dialog-footer">
              <button className="btn btn-secondary" type="button" style={{ fontSize: "0.84rem" }}>Cancel</button>
              <button className="btn btn-danger" type="button" style={{ fontSize: "0.84rem", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <XCircle size={15} /> Reject
              </button>
              <button className="btn btn-green" type="button" style={{ fontSize: "0.84rem", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <CheckCircle2 size={15} /> Approve
              </button>
            </div>
          </div>
        </div>
      </DemoPortalFrame>
    </>
  );
}
