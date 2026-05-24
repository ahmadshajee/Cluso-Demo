"use client";

import { useRouter } from "next/navigation";
import { ListChecks, Search, ChevronDown, ChevronUp, User, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { DemoPortalFrame } from "@/components/DemoPortalFrame";
import { DemoStepIndicator } from "@/components/DemoStepIndicator";
import { customerUser, demoRequests } from "@/lib/demoData";
import { useState } from "react";

export default function HRReviewsPage() {
  const router = useRouter();
  const companyRequests = demoRequests.filter((r) => r.customerName === "TechVista Solutions Pvt. Ltd.");
  const [expandedId, setExpandedId] = useState<string>("req_005");

  const handleApprove = () => {
    router.push("/demo/approved");
  };

  const handleReject = () => {
    router.push("/demo/approved");
  };

  return (
    <>
      <DemoStepIndicator currentSlug="hr-reviews" />
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
            <div style={{ position: "relative" }}>
              <Search size={14} style={{ position: "absolute", left: "0.7rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
              <input className="input" placeholder="Search candidates..." readOnly style={{ paddingLeft: "2.2rem", width: "240px" }} />
            </div>
          </div>

          <div className="request-list">
            {companyRequests.map((request) => {
              const isExpanded = expandedId === request._id;
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
                        {isExpanded && (
                          <span style={{ background: "#fef3c7", color: "#92400e", fontSize: "0.68rem", padding: "0.12rem 0.45rem", borderRadius: "4px", fontWeight: 700, marginLeft: "0.5rem" }}>
                            REVIEWING
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
                      <span className={`status-pill status-pill-${request.status}`}>{request.status}</span>
                      {isExpanded ? <ChevronUp size={16} style={{ color: "#94a3b8" }} /> : <ChevronDown size={16} style={{ color: "#94a3b8" }} />}
                    </div>
                  </div>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div style={{ border: "1px solid #3b82f6", borderTop: "none", borderRadius: "0 0 14px 14px", padding: "1rem", background: "#f8faff" }}>
                      <div className="form-grid-two-col" style={{ marginBottom: "1rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.88rem" }}>
                          <User size={15} style={{ color: "#6366f1" }} />
                          <strong>Name:</strong> {request.candidateName}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.88rem" }}>
                          <Mail size={15} style={{ color: "#6366f1" }} />
                          <strong>Email:</strong> {request.candidateEmail}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.88rem" }}>
                          <Phone size={15} style={{ color: "#6366f1" }} />
                          <strong>Phone:</strong> {request.candidatePhone}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.88rem" }}>
                          <MapPin size={15} style={{ color: "#6366f1" }} />
                          <strong>Country:</strong> {request.verificationCountry}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.88rem" }}>
                          <Calendar size={15} style={{ color: "#6366f1" }} />
                          <strong>Created:</strong> {new Date(request.createdAt).toLocaleDateString("en-IN")}
                        </div>
                      </div>

                      <h4 style={{ margin: "0 0 0.5rem", fontSize: "0.92rem", color: "#334155" }}>Selected Services</h4>
                      <div className="service-check-grid">
                        {request.selectedServices.map((s) => (
                          <div key={s.serviceId} className="service-check">
                            <span style={{ fontWeight: 500 }}>{s.serviceName}</span>
                          </div>
                        ))}
                      </div>

                      <div style={{ display: "flex", gap: "0.6rem", marginTop: "1rem" }}>
                        <button className="btn btn-green" type="button" style={{ fontSize: "0.84rem", padding: "0.5rem 0.9rem" }} onClick={handleApprove}>
                          ✅ Approve Request
                        </button>
                        <button className="btn btn-danger" type="button" style={{ fontSize: "0.84rem", padding: "0.5rem 0.9rem" }} onClick={handleReject}>
                          ❌ Reject Request
                        </button>
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
