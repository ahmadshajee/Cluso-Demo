"use client";

import { ListChecks, Search, Sparkles, User, Mail, Phone, MapPin, Calendar, Send } from "lucide-react";
import { DemoPortalFrame } from "@/components/DemoPortalFrame";
import { DemoStepIndicator } from "@/components/DemoStepIndicator";
import { adminUser, verifierUser, demoRequests, candidateFormFields } from "@/lib/demoData";

export default function VerifierPage() {
  const approvedRequests = demoRequests.filter((r) => r.status === "approved");
  const workingRequest = approvedRequests[0]; // Ananya Gupta

  return (
    <>
      <DemoStepIndicator currentSlug="verifier" />
      <DemoPortalFrame
        portal="admin"
        userName={adminUser.name}
        title="Verifier Workspace"
        subtitle={`Logged in as verifier: ${verifierUser.name}`}
        activeNavLabel="Requests"
      >
        <div className="verifier-workspace">
          <div className="block-card" style={{ padding: "1.2rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <h3 className="block-title"><ListChecks size={18} /> Approved Requests Queue</h3>
              <span className="demo-label"><Sparkles size={11} /> Verifier View</span>
            </div>

            <div className="request-list">
              {approvedRequests.map((request) => {
                const isActive = request._id === workingRequest._id;
                return (
                  <div key={request._id} className={`request-item ${isActive ? "highlighted" : ""}`}>
                    <div className="request-item-left">
                      <span className="request-item-name">
                        {request.candidateName}
                        {isActive && (
                          <span style={{ background: "#dbeafe", color: "#1d4ed8", fontSize: "0.68rem", padding: "0.12rem 0.45rem", borderRadius: "4px", fontWeight: 700, marginLeft: "0.5rem" }}>
                            WORKING
                          </span>
                        )}
                      </span>
                      <span className="request-item-services">
                        {request.selectedServices.map((s) => s.serviceName).join(", ")}
                      </span>
                      <span className="request-item-meta">{request.customerName} • {new Date(request.createdAt).toLocaleDateString("en-IN")}</span>
                    </div>
                    <div className="request-item-right">
                      <span className="status-pill status-pill-approved">approved</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Verification Attempt Form */}
          <div className="block-card" style={{ padding: "1.2rem" }}>
            <h3 className="block-title" style={{ marginBottom: "0.8rem" }}>
              📝 Log Verification Attempt — {workingRequest.candidateName}
            </h3>

            <div className="form-grid-two-col" style={{ marginBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.88rem" }}>
                <User size={15} style={{ color: "#6366f1" }} />
                <strong>Candidate:</strong> {workingRequest.candidateName}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.88rem" }}>
                <Mail size={15} style={{ color: "#6366f1" }} />
                <strong>Email:</strong> {workingRequest.candidateEmail}
              </div>
            </div>

            {workingRequest.selectedServices.map((service) => (
              <div key={service.serviceId} className="verifier-attempt-form">
                <h4 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 700, color: "#334155" }}>
                  🔍 {service.serviceName}
                </h4>
                <div className="form-grid-two-col">
                  <div className="form-field">
                    <label className="label">Verification Mode</label>
                    <select className="input" defaultValue="Manual" disabled>
                      <option>Manual</option>
                      <option>Email</option>
                      <option>Phone</option>
                      <option>Portal</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label className="label">Status</label>
                    <select className="input" defaultValue="in-progress" disabled>
                      <option value="in-progress">In Progress</option>
                      <option value="verified">Verified</option>
                      <option value="unverified">Unverified</option>
                    </select>
                  </div>
                </div>
                <div className="form-field">
                  <label className="label">Respondent Name</label>
                  <input className="input" defaultValue="Priya Singh (HR Manager)" readOnly />
                </div>
                <div className="form-field">
                  <label className="label">Respondent Email</label>
                  <input className="input" defaultValue="priya.singh@company.com" readOnly />
                </div>
                <div className="form-field">
                  <label className="label">Verification Comment</label>
                  <textarea className="textarea" defaultValue="Contacted HR department. Verification in progress. Awaiting official confirmation letter." readOnly />
                </div>
              </div>
            ))}

            <div style={{ display: "flex", gap: "0.6rem", marginTop: "1rem", justifyContent: "flex-end" }}>
              <button className="btn btn-secondary" type="button">Save Draft</button>
              <button className="btn btn-primary" type="button" style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <Send size={14} /> Submit Attempt
              </button>
            </div>
          </div>
        </div>
      </DemoPortalFrame>
    </>
  );
}
