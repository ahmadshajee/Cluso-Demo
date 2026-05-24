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
import { DemoCallout } from "@/components/DemoCallout";
import { candidateUser } from "@/lib/demoData";

export default function CandidateDashboardPage() {
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
        <DemoCallout items={[
          { title: "Candidate Portal", text: "This is the candidate's view. After receiving an invite email, the candidate logs in to complete verification forms and upload documents.", arrow: "down" },
          { title: "Pending Forms", text: "Shows how many verification forms still need to be filled out. The candidate clicks here to start completing them.", arrow: "down" },
          { title: "Verification Activity", text: "A feed showing the latest requests and their current status — whether forms are pending, approved by enterprise, or fully verified.", arrow: "down" },
        ]} />
        <div className="dashboard-header">
          <h2>Dashboard</h2>
          <div className="top-actions">
            <Link href="/demo/fills-forms" className="btn btn-green">Forms to fill</Link>
            <Link href="/demo/uploads-docs" className="btn btn-blue">History</Link>
          </div>
        </div>

        <div className="portal-stats-grid">
          <Link href="/demo/fills-forms" className="portal-stat portal-stat-sky" style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
              <div className="portal-stat-icon-wrap"><FileText size={24} /></div>
              <div className="portal-stat-info">
                <span className="portal-stat-value">{pendingFormsCount}</span>
                <span className="portal-stat-label" style={{ margin: 0 }}>Pending Forms</span>
              </div>
            </div>
          </Link>

          <Link href="/demo/hr-reviews" className="portal-stat portal-stat-amber" style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
              <div className="portal-stat-icon-wrap"><Clock3 size={24} /></div>
              <div className="portal-stat-info">
                <span className="portal-stat-value">{inReviewCount}</span>
                <span className="portal-stat-label" style={{ margin: 0 }}>In Review</span>
              </div>
            </div>
          </Link>

          <Link href="/demo/report-ready" className="portal-stat portal-stat-emerald" style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
              <div className="portal-stat-icon-wrap"><CheckCircle2 size={24} /></div>
              <div className="portal-stat-info">
                <span className="portal-stat-value">{verifiedCount}</span>
                <span className="portal-stat-label" style={{ margin: 0 }}>Verified</span>
              </div>
            </div>
          </Link>

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
            <Link href="/demo/fills-forms" className="quick-action-card" style={{ alignItems: "center", textAlign: "center", justifyItems: "center", textDecoration: "none", color: "inherit" }}>
              <FileSignature size={28} />
              <span style={{ fontWeight: 600 }}>Complete Forms</span>
            </Link>
            <Link href="/demo/uploads-docs" className="quick-action-card" style={{ alignItems: "center", textAlign: "center", justifyItems: "center", textDecoration: "none", color: "inherit" }}>
              <ListChecks size={28} />
              <span style={{ fontWeight: 600 }}>Track Verification</span>
            </Link>
            <Link href="/demo/candidate" className="quick-action-card" style={{ alignItems: "center", textAlign: "center", justifyItems: "center", textDecoration: "none", color: "inherit" }}>
              <SlidersHorizontal size={28} />
              <span style={{ fontWeight: 600 }}>Profile</span>
            </Link>
          </div>
        </div>

        <div className="block-card">
          <h3 className="block-title">Latest Verification Activity</h3>
          <p className="block-subtitle">Recent candidate tasks and current review state.</p>
          <div className="recent-request-list">
            {[
              { name: "TechVista Solutions Pvt. Ltd.", services: "Employment Verification, Education Verification, Address Verification", status: "pending", formStatus: "form pending", date: "20/5/2026", href: "/demo/fills-forms" },
              { name: "TechVista Solutions Pvt. Ltd.", services: "Employment Verification, Criminal Record Check", status: "approved", formStatus: "approved by enterprise", date: "18/5/2026", href: "/demo/approved" },
              { name: "TechVista Solutions Pvt. Ltd.", services: "Employment Verification, Education Verification, Reference Check", status: "verified", formStatus: "verified", date: "15/5/2026", href: "/demo/report-ready" },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="recent-request-item" style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
                <div>
                  <strong>{item.name}</strong>
                  <span className="recent-request-meta" style={{ display: "block" }}>{item.services}</span>
                </div>
                <div className="recent-request-right">
                  <span className={`status-pill status-pill-${item.status}`}>{item.formStatus}</span>
                  <span className="recent-request-meta">{item.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </DemoPortalFrame>
    </>
  );
}
