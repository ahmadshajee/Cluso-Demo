"use client";

import Link from "next/link";
import { CheckCircle2, Shield, ArrowLeft } from "lucide-react";
import { DemoStepIndicator } from "@/components/DemoStepIndicator";
import { DemoCallout } from "@/components/DemoCallout";

export default function HireDecisionPage() {
  return (
    <>
      <DemoStepIndicator currentSlug="hire-decision" />
      <div className="hire-decision-page" style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #f8f9fc 40%, #f0fff4 100%)" }}>
        <DemoCallout items={[
          { title: "Process Complete", text: "The entire background verification workflow is finished. All services have been checked, attempts logged, and the report delivered.", arrow: "down" },
          { title: "Enterprise Decision", text: "Cluso's work ends here. The hiring decision now rests entirely with the company HR based on the verified report.", arrow: "down" },
          { title: "Full Audit Trail", text: "Every step — from order creation to final report — is recorded with timestamps, respondent details, and verifier comments.", arrow: "down" },
        ]} />
        <div className="hire-decision-card">
          <div className="hire-decision-icon">🎯</div>
          <h1 className="hire-decision-title">Our Work is Done</h1>
          <p className="hire-decision-text">
            We have provided an extensive background verification report on behalf of this candidate.
            The comprehensive report covers employment history, education credentials, reference checks,
            and all other requested verification services.
          </p>
          <p className="hire-decision-text" style={{ fontSize: "0.95rem", color: "#64748b" }}>
            The hiring decision now rests with the enterprise. All verified data, respondent confirmations,
            and verifier comments have been compiled into the final report delivered to the company HR team.
          </p>

          <div className="hire-decision-badge">
            <Shield size={18} />
            Background Verification Complete
          </div>

          <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "0.8rem", alignItems: "center" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", width: "100%", maxWidth: "400px" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#059669" }}>3</div>
                <div style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 500 }}>Services Verified</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#2563eb" }}>3</div>
                <div style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 500 }}>Attempts Logged</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#7c3aed" }}>1</div>
                <div style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 500 }}>Report Generated</div>
              </div>
            </div>

            <Link href="/" style={{ marginTop: "1rem", display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "#3b82f6", fontWeight: 600, fontSize: "0.92rem" }}>
              <ArrowLeft size={16} />
              Back to Verification Flow
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
