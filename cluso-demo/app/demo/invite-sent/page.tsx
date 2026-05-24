"use client";

import { ListChecks, Search } from "lucide-react";
import { DemoPortalFrame } from "@/components/DemoPortalFrame";
import { DemoStepIndicator } from "@/components/DemoStepIndicator";
import { customerUser, demoRequests } from "@/lib/demoData";

export default function InviteSentPage() {
  const companyRequests = demoRequests.filter((r) => r.customerName === "TechVista Solutions Pvt. Ltd.");
  const newRequest = companyRequests[0]; // Rahul Sharma — pending

  return (
    <>
      <DemoStepIndicator currentSlug="invite-sent" />
      <DemoPortalFrame
        portal="customer"
        userName={customerUser.name}
        title="Verification Requests"
        subtitle="Track pending, enterprise decisions, and verified items."
        activeNavLabel="Requests"
      >
        <div className="block-card" style={{ padding: "1.2rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <h3 className="block-title"><ListChecks size={18} /> All Requests</h3>
            <div style={{ position: "relative" }}>
              <Search size={14} style={{ position: "absolute", left: "0.7rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
              <input className="input" placeholder="Search candidates..." readOnly style={{ paddingLeft: "2.2rem", width: "240px" }} />
            </div>
          </div>

          <p className="inline-alert inline-alert-info" style={{ marginBottom: "0.8rem" }}>
            📧 An invite email has been sent to <strong>{newRequest.candidateEmail}</strong> for form submission.
          </p>

          <div className="request-list">
            {companyRequests.map((request) => {
              const isNew = request._id === newRequest._id;
              return (
                <div key={request._id} className={`request-item ${isNew ? "highlighted" : ""}`}>
                  <div className="request-item-left">
                    <span className="request-item-name">
                      {request.candidateName}
                      {isNew && (
                        <span style={{ background: "#dbeafe", color: "#1d4ed8", fontSize: "0.68rem", padding: "0.12rem 0.45rem", borderRadius: "4px", fontWeight: 700, marginLeft: "0.5rem" }}>
                          NEW
                        </span>
                      )}
                    </span>
                    <span className="request-item-services">
                      {request.selectedServices.map((s) => s.serviceName).join(", ")}
                    </span>
                    <span className="request-item-meta">
                      {new Date(request.createdAt).toLocaleDateString("en-IN")} • {request.candidateEmail}
                    </span>
                  </div>
                  <div className="request-item-right">
                    <span className={`status-pill status-pill-${request.status}`}>
                      {request.status}
                    </span>
                    <span className="request-item-meta">
                      Form: {request.candidateFormStatus}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </DemoPortalFrame>
    </>
  );
}
