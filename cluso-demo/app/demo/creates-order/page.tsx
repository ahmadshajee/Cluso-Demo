"use client";

import { useRouter } from "next/navigation";
import { ClipboardPlus, Sparkles } from "lucide-react";
import { DemoPortalFrame } from "@/components/DemoPortalFrame";
import { DemoStepIndicator } from "@/components/DemoStepIndicator";
import { DemoCallout } from "@/components/DemoCallout";
import { customerUser, services } from "@/lib/demoData";
import { useState } from "react";

export default function CreatesOrderPage() {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState(["svc_001", "svc_002", "svc_003"]);
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => router.push("/demo/invite-sent"), 1200);
  };

  const handleClear = () => {
    setSelectedIds([]);
  };

  return (
    <>
      <DemoStepIndicator currentSlug="creates-order" />
      <DemoPortalFrame
        portal="customer"
        userName={customerUser.name}
        title="Create New Order"
        subtitle="Submit candidate verification requests with assigned services."
        activeNavLabel="Orders"
      >
        <DemoCallout items={[
          { title: "Order Form", text: "The HR user fills in the candidate's name, email, and phone number. These details are used to send the candidate an invite.", arrow: "down" },
          { title: "Service Selection", text: "HR picks which background check services to run — Employment, Education, Address, Criminal, or Reference checks.", arrow: "down" },
          { title: "Package Bundles", text: "Services can be grouped into packages (e.g. 'Comprehensive BGV') so HR can select multiple checks with one click.", arrow: "down" },
        ]} />
        <div className="block-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.2rem" }}>
            <span className="icon-chip"><ClipboardPlus size={14} /></span>
            <h2 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700 }}>New Verification Order</h2>
            <span className="demo-label"><Sparkles size={11} /> Demo</span>
          </div>

          {submitted && (
            <div className="inline-alert inline-alert-success" style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              ✅ Order submitted successfully! Redirecting to invite screen...
            </div>
          )}

          <div className="form-grid">
            <div className="form-grid-two-col">
              <div className="form-field">
                <label className="label">Candidate Name *</label>
                <input className="input" defaultValue="Rahul Sharma" readOnly />
              </div>
              <div className="form-field">
                <label className="label">Candidate Email *</label>
                <input className="input" defaultValue="rahul.sharma@email.com" readOnly />
              </div>
            </div>
            <div className="form-grid-two-col">
              <div className="form-field">
                <label className="label">Candidate Phone</label>
                <input className="input" defaultValue="+91 98765 43210" readOnly />
              </div>
              <div className="form-field">
                <label className="label">Verification Country</label>
                <select className="input" defaultValue="India" disabled>
                  <option>India</option>
                </select>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "1.2rem" }}>
            <label className="label">Select Services</label>
            <input className="input" placeholder="Search services by name" readOnly style={{ marginTop: "0.4rem", marginBottom: "0.7rem" }} />
            <div className="service-check-grid">
              {services.filter((s) => !s.isPackage).map((service) => (
                <label key={service.serviceId} className="service-check" style={{ cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(service.serviceId)}
                    onChange={() => toggleService(service.serviceId)}
                  />
                  <span style={{ fontWeight: 500 }}>{service.serviceName}</span>
                </label>
              ))}
              {services.filter((s) => s.isPackage).map((service) => (
                <div key={service.serviceId} className="service-check" style={{ flexDirection: "column", alignItems: "flex-start", gap: "0.5rem" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(service.serviceId)}
                      onChange={() => toggleService(service.serviceId)}
                    />
                    <span style={{ fontWeight: 500 }}>{service.serviceName}</span>
                    <span style={{ background: "#dbeafe", color: "#1d4ed8", fontSize: "0.72rem", padding: "0.1rem 0.4rem", borderRadius: "4px", fontWeight: 700 }}>PACKAGE</span>
                  </label>
                  {service.includedServiceNames && (
                    <div style={{ paddingLeft: "1.5rem", fontSize: "0.82rem", color: "#64748b" }}>
                      <span style={{ fontWeight: 500 }}>Includes:</span>{" "}
                      {service.includedServiceNames.join(", ")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.6rem", marginTop: "1.5rem", justifyContent: "flex-end" }}>
            <button className="btn btn-secondary" type="button" onClick={handleClear}>Clear</button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleSubmit}
              disabled={submitted || selectedIds.length === 0}
              style={submitted ? { opacity: 0.6 } : {}}
            >
              {submitted ? "Submitting..." : "Submit Order"}
            </button>
          </div>
        </div>
      </DemoPortalFrame>
    </>
  );
}
