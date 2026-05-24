"use client";

import Link from "next/link";
import { CheckCheck } from "lucide-react";
import { DemoPortalFrame } from "@/components/DemoPortalFrame";
import { DemoStepIndicator } from "@/components/DemoStepIndicator";
import { DemoCallout } from "@/components/DemoCallout";
import { customerUser } from "@/lib/demoData";

export default function DeliveredPage() {
  return (
    <>
      <DemoStepIndicator currentSlug="delivered" />
      <DemoPortalFrame
        portal="customer"
        userName={customerUser.name}
        title="Enterprise Overview"
        subtitle="Use quick actions to complete one task at a time with less clutter."
        activeNavLabel="Overview"
      >
        <DemoCallout items={[
          { title: "Report Delivered", text: "The company HR receives a notification that the verification report is ready. They can view it directly from the notification panel.", arrow: "down" },
          { title: "Notification System", text: "Real-time notifications alert HR about new requests, approvals, completed verifications, and delivered reports.", arrow: "down" },
          { title: "One-Click Access", text: "Each notification links directly to the relevant page — click to view the full report, check a request, or review an order.", arrow: "down" },
        ]} />
        {/* Simplified stat cards */}
        <div className="portal-stats-grid">
          {[
            { label: "Pending", value: 3, tone: "portal-stat-sky", href: "/demo/hr-reviews" },
            { label: "Approved", value: 3, tone: "portal-stat-emerald", href: "/demo/approved" },
            { label: "Verified", value: 3, tone: "portal-stat-cyan", href: "/demo/report-ready" },
            { label: "Total", value: 9, tone: "portal-stat-violet", href: "/demo/invite-sent" },
          ].map((card) => (
            <Link key={card.label} href={card.href} className={`portal-stat ${card.tone}`} style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
              <div className="portal-stat-head">
                <p className="portal-stat-value">{card.value}</p>
              </div>
              <p className="portal-stat-label">{card.label}</p>
            </Link>
          ))}
        </div>

        {/* Notification panel showing delivered report notification */}
        <div style={{ position: "relative", display: "inline-block" }}>
          <div className="notification-panel-demo" style={{ position: "relative", top: 0, right: 0, width: "100%", maxWidth: "480px" }}>
            <div className="notification-panel-head">
              <strong style={{ color: "#2d405e" }}>🔔 Notifications</strong>
              <button type="button" style={{ border: "none", background: "transparent", color: "#2d405e", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.85rem" }}>
                <CheckCheck size={14} /> Clear all
              </button>
            </div>
            <div className="notification-list">
              <Link href="/demo/report-ready" className="notification-item" style={{ borderColor: "#9ddccb", background: "#e8f8f3", textDecoration: "none", color: "inherit", cursor: "pointer", display: "block" }}>
                <span className="notification-item-title">📄 Report ready for Vikram Desai</span>
                <span className="notification-item-detail">
                  Background verification report has been generated and is ready for review. Click to view the full report.
                </span>
                <span className="notification-item-time">23 May 2026, 6:30 PM</span>
              </Link>
              <Link href="/demo/checks-done" className="notification-item" style={{ borderColor: "#9ddccb", background: "#e8f8f3", textDecoration: "none", color: "inherit", cursor: "pointer", display: "block" }}>
                <span className="notification-item-title">✅ Request verified — Karan Singh</span>
                <span className="notification-item-detail">
                  Karan Singh verification is now verified. Report will be generated shortly.
                </span>
                <span className="notification-item-time">22 May 2026, 4:15 PM</span>
              </Link>
              <Link href="/demo/approved" className="notification-item notification-item-info" style={{ textDecoration: "none", color: "inherit", cursor: "pointer", display: "block" }}>
                <span className="notification-item-title">🏢 Request approved by enterprise</span>
                <span className="notification-item-detail">
                  Ananya Gupta verification was approved by enterprise.
                </span>
                <span className="notification-item-time">20 May 2026, 2:30 PM</span>
              </Link>
              <Link href="/demo/creates-order" className="notification-item notification-item-info" style={{ textDecoration: "none", color: "inherit", cursor: "pointer", display: "block" }}>
                <span className="notification-item-title">📋 New request created</span>
                <span className="notification-item-detail">
                  Rahul Sharma is waiting for review.
                </span>
                <span className="notification-item-time">20 May 2026, 9:15 AM</span>
              </Link>
            </div>
          </div>
        </div>

        <Link href="/demo/company-hr-review" className="inline-alert inline-alert-success" style={{ textDecoration: "none", color: "inherit", cursor: "pointer", display: "block" }}>
          📬 A new verification report has been delivered to your workspace. Open Requests to view the full report for Vikram Desai.
        </Link>
      </DemoPortalFrame>
    </>
  );
}
