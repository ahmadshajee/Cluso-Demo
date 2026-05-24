"use client";

import { useRouter } from "next/navigation";
import { FileSignature, Sparkles } from "lucide-react";
import { DemoPortalFrame } from "@/components/DemoPortalFrame";
import { DemoStepIndicator } from "@/components/DemoStepIndicator";
import { DemoCallout } from "@/components/DemoCallout";
import { candidateUser, candidateFormFields } from "@/lib/demoData";
import { useState } from "react";

export default function FillsFormsPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => router.push("/demo/uploads-docs"), 1200);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      <DemoStepIndicator currentSlug="fills-forms" />
      <DemoPortalFrame
        portal="candidate"
        userName={candidateUser.name}
        title="Complete Your Forms"
        subtitle="Fill out the required verification forms below."
        activeNavLabel="Forms to Fill"
      >
        <DemoCallout items={[
          { title: "Dynamic Forms", text: "Each verification service generates its own set of form fields. These questions are configured by the admin when setting up services.", arrow: "down" },
          { title: "Pre-filled Data", text: "Some fields may be pre-filled from the candidate's profile. The candidate reviews and corrects any data before submitting.", arrow: "down" },
          { title: "Save & Submit", text: "Candidates can save a draft to return later, or submit the form when complete. Submitted forms cannot be edited unless rejected by HR.", arrow: "down" },
        ]} />
        <div className="block-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <span className="icon-chip"><FileSignature size={14} /></span>
            <h2 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700 }}>Employment Verification Form</h2>
            <span className="demo-label"><Sparkles size={11} /> Demo</span>
          </div>
          <p className="block-subtitle" style={{ marginBottom: "1.2rem" }}>
            Requested by <strong>TechVista Solutions Pvt. Ltd.</strong>
          </p>

          {submitted && (
            <div className="inline-alert inline-alert-success" style={{ marginBottom: "1rem" }}>
              ✅ Form submitted successfully! Redirecting to document upload...
            </div>
          )}
          {saved && (
            <div className="inline-alert inline-alert-info" style={{ marginBottom: "1rem" }}>
              💾 Draft saved successfully!
            </div>
          )}

          <div className="form-section" style={{ marginBottom: "1rem" }}>
            <h3 className="form-section-title">📋 Employment Details</h3>
            <div className="form-grid">
              {candidateFormFields.employmentVerification.map((field, i) => (
                <div key={i} className="form-field">
                  <label className="label">{field.question}</label>
                  <input
                    className="input"
                    type={field.fieldType === "date" ? "date" : field.fieldType === "email" ? "email" : "text"}
                    defaultValue={field.value}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h3 className="form-section-title">👤 Personal Details</h3>
            <div className="form-grid">
              {candidateFormFields.personalDetails.map((field, i) => (
                <div key={i} className="form-field">
                  <label className="label">{field.question}</label>
                  <input
                    className="input"
                    type={field.fieldType === "date" ? "date" : field.fieldType === "email" ? "email" : "text"}
                    defaultValue={field.value}
                  />
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.6rem", marginTop: "1.5rem", justifyContent: "flex-end" }}>
            <button className="btn btn-secondary" type="button" onClick={handleSave} disabled={saved}>
              {saved ? "Saved ✓" : "Save Draft"}
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleSubmit}
              disabled={submitted}
              style={submitted ? { opacity: 0.6 } : {}}
            >
              {submitted ? "Submitting..." : "Submit Form"}
            </button>
          </div>
        </div>
      </DemoPortalFrame>
    </>
  );
}
