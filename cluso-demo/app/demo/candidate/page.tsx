"use client";

import Link from "next/link";
import {
  FileText,
  Clock3,
  CheckCircle2,
  TriangleAlert,
  FileSignature,
  ListChecks,
  SlidersHorizontal,
} from "lucide-react";
import { DemoPortalFrame } from "@/components/DemoPortalFrame";
import { DemoStepIndicator } from "@/components/DemoStepIndicator";
import { candidateUser, demoRequests } from "@/lib/demoData";

export default function CandidateDashboardPage() {
  const candidateRequests = demoRequests.filter((r) => r.candidateEmail === candidateUser.email || r.candidateName === candidateUser.name);
  const pendingFormsCount = 2;
  const inReviewCount = 1;
  const verifiedCount = 1;
  const rejectedCount = 0;

  return (
    <>
      <DemoStepIndicator currentSlug="candidate" />
      <DemoPortalFrame
        portal="candidate"
        userName={candidateUser.name}
        title=""
        subtitle=""
        activeNavLabel="Dashboard"
      >
        <div className="dashboard-header">
          <h2>Dashboard</h2>
          <div className="top-actions">
            <Link href="/demo/fills-forms" className="btn btn-green">Forms to fill</Link>
            <button className="btn btn-blue" type="button">History</button>
          </div>
        </div>

        <div className="portal-stats-grid">
          <div className="portal-stat portal-stat-sky">
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
              <div className="portal-stat-icon-wrap"><FileText size={24} /></div>
              <div className="portal-stat-info">
                <span className="portal-stat-value">{pendingFormsCount}</span>
                <span className="portal-stat-label" style={{ margin: 0 }}>Pending Forms</span>
              </div>
            </div>
          </div>

          <div className="portal-stat portal-stat-amber">
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
              <div className="portal-stat-icon-wrap"><Clock3 size={24} /></div>
              <div className="portal-stat-info">
                <span className="portal-stat-value">{inReviewCount}</span>
                <span className="portal-stat-label" style={{ margin: 0 }}>In Review</span>
              </div>
            </div>
          </div>

          <div className="portal-stat portal-stat-emerald">
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
              <div className="portal-stat-icon-wrap"><CheckCircle2 size={24} /></div>
              <div className="portal-stat-info">
                <span className="portal-stat-value">{verifiedCount}</span>
                <span className="portal-stat-label" style={{ margin: 0 }}>Verified</span>
              </div>
            </div>
          </div>

          <div className="portal-stat portal-stat-rose">
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
              <div className="portal-stat-icon-wrap"><TriangleAlert size={24} /></div>
              <div className="portal-stat-info">
                <span className="portal-stat-value">{rejectedCount}</span>
                <span className="portal-stat-label" style={{ margin: 0 }}>Needs Update</span>
              </div>
            </div>
          </div>
        </div>

        <div className="quick-actions-section">
          <h3>Quick Actions</h3>
          <div className="quick-actions-grid">
            <Link href="/demo/fills-forms" className="quick-action-card" style={{ alignItems: "center", textAlign: "center", justifyItems: "center" }}>
              <FileSignature size={28} />
              <span style={{ fontWeight: 600 }}>Complete Forms</span>
            </Link>
            <div className="quick-action-card" style={{ alignItems: "center", textAlign: "center", justifyItems: "center" }}>
              <ListChecks size={28} />
              <span style={{ fontWeight: 600 }}>Track Verification</span>
            </div>
            <div className="quick-action-card" style={{ alignItems: "center", textAlign: "center", justifyItems: "center" }}>
              <SlidersHorizontal size={28} />
              <span style={{ fontWeight: 600 }}>Profile</span>
            </div>
          </div>
        </div>

        <div className="block-card">
          <h3 className="block-title">Latest Verification Activity</h3>
          <p className="block-subtitle">Recent candidate tasks and current review state.</p>
          <div className="recent-request-list">
            {[
              { name: "TechVista Solutions Pvt. Ltd.", services: "Employment Verification, Education Verification, Address Verification", status: "pending", formStatus: "form pending", date: "20/5/2026" },
              { name: "TechVista Solutions Pvt. Ltd.", services: "Employment Verification, Criminal Record Check", status: "approved", formStatus: "approved by enterprise", date: "18/5/2026" },
              { name: "TechVista Solutions Pvt. Ltd.", services: "Employment Verification, Education Verification, Reference Check", status: "verified", formStatus: "verified", date: "15/5/2026" },
            ].map((item, i) => (
              <div key={i} className="recent-request-item">
                <div>
                  <strong>{item.name}</strong>
                  <span className="recent-request-meta" style={{ display: "block" }}>{item.services}</span>
                </div>
                <div className="recent-request-right">
                  <span className={`status-pill status-pill-${item.status}`}>{item.formStatus}</span>
                  <span className="recent-request-meta">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DemoPortalFrame>
    </>
  );
}
