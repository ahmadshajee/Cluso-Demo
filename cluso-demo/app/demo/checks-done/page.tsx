"use client";

import { CheckCircle2, Clock, Shield, AlertCircle, Sparkles } from "lucide-react";
import { DemoPortalFrame } from "@/components/DemoPortalFrame";
import { DemoStepIndicator } from "@/components/DemoStepIndicator";
import { adminUser, demoRequests } from "@/lib/demoData";

export default function ChecksDonePage() {
  const approvedRequests = demoRequests.filter((r) => r.status === "approved");
  const workingRequest = approvedRequests[0]; // Ananya Gupta

  return (
    <>
      <DemoStepIndicator currentSlug="checks-done" />
      <DemoPortalFrame
        portal="admin"
        userName={adminUser.name}
        title="Request Verification Status"
        subtitle="View verification progress and mark requests as complete."
        activeNavLabel="Requests"
      >
        <div className="block-card" style={{ padding: "1.2rem", opacity: 0.4, pointerEvents: "none" }}>
          <div className="request-list">
            {approvedRequests.map((request) => (
              <div key={request._id} className="request-item">
                <div className="request-item-left">
                  <span className="request-item-name">{request.candidateName}</span>
                  <span className="request-item-services">
                    {request.selectedServices.map((s) => s.serviceName).join(", ")}
                  </span>
                </div>
                <div className="request-item-right">
                  <span className="status-pill status-pill-approved">approved</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Dialog */}
        <div className="demo-overlay">
          <div className="demo-dialog" style={{ width: "min(600px, 95vw)" }}>
            <h3 className="demo-dialog-title">
              <Shield size={20} style={{ color: "#3b82f6" }} />
              Verification Status — {workingRequest.candidateName}
              <span className="demo-label" style={{ marginLeft: "auto" }}><Sparkles size={11} /> Demo</span>
            </h3>

            <div className="demo-dialog-body">
              <div style={{ display: "grid", gap: "0.6rem" }}>
                {workingRequest.selectedServices.map((service, i) => {
                  const isVerified = i === 0;
                  const isInProgress = i === 1;
                  return (
                    <div key={service.serviceId} style={{
                      border: `1px solid ${isVerified ? "#86efac" : isInProgress ? "#93c5fd" : "#e2e8f0"}`,
                      borderRadius: "12px",
                      padding: "0.8rem 1rem",
                      background: isVerified ? "#f0fdf4" : isInProgress ? "#eff6ff" : "#f8fafc",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          {isVerified ? (
                            <CheckCircle2 size={18} style={{ color: "#16a34a" }} />
                          ) : (
                            <Clock size={18} style={{ color: "#3b82f6" }} />
                          )}
                          <strong style={{ fontSize: "0.92rem" }}>{service.serviceName}</strong>
                        </div>
                        <span className={`status-pill ${isVerified ? "status-pill-verified" : "status-pill-in-progress"}`}>
                          {isVerified ? "Verified" : "In Progress"}
                        </span>
                      </div>
                      {isVerified && (
                        <div style={{ marginTop: "0.5rem", fontSize: "0.82rem", color: "#4b5563" }}>
                          <div>✅ Verified by <strong>Amit Patel</strong> on 22/5/2026</div>
                          <div style={{ marginTop: "0.15rem" }}>Respondent: Priya Singh (priya.singh@company.com)</div>
                          <div style={{ marginTop: "0.15rem", fontStyle: "italic" }}>&quot;Employment details confirmed with HR department.&quot;</div>
                        </div>
                      )}
                      {isInProgress && (
                        <div style={{ marginTop: "0.5rem", fontSize: "0.82rem", color: "#4b5563" }}>
                          <div>⏳ Verification attempt logged by <strong>Amit Patel</strong></div>
                          <div style={{ marginTop: "0.15rem" }}>Awaiting respondent confirmation...</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "10px", padding: "0.7rem", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "#92400e" }}>
                <AlertCircle size={16} />
                Once all services are verified, the request will be marked as &quot;Verified&quot; and a report can be generated.
              </div>
            </div>

            <div className="demo-dialog-footer">
              <button className="btn btn-secondary" type="button">Close</button>
              <button className="btn btn-green" type="button" style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <CheckCircle2 size={15} /> Mark as Verified
              </button>
            </div>
          </div>
        </div>
      </DemoPortalFrame>
    </>
  );
}
