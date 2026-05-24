"use client";

import { Bell, CheckCheck } from "lucide-react";
import { DemoPortalFrame } from "@/components/DemoPortalFrame";
import { DemoStepIndicator } from "@/components/DemoStepIndicator";
import { customerUser, demoRequests } from "@/lib/demoData";

export default function DeliveredPage() {
  const companyRequests = demoRequests.filter((r) => r.customerName === "TechVista Solutions Pvt. Ltd.");

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
        {/* Simplified stat cards */}
        <div className="portal-stats-grid">
          {[
            { label: "Pending", value: 3, tone: "portal-stat-sky" },
            { label: "Approved", value: 3, tone: "portal-stat-emerald" },
            { label: "Verified", value: 3, tone: "portal-stat-cyan" },
            { label: "Total", value: 9, tone: "portal-stat-violet" },
          ].map((card) => (
            <div key={card.label} className={`portal-stat ${card.tone}`}>
              <div className="portal-stat-head">
                <p className="portal-stat-value">{card.value}</p>
              </div>
              <p className="portal-stat-label">{card.label}</p>
            </div>
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
              <div className="notification-item" style={{ borderColor: "#9ddccb", background: "#e8f8f3" }}>
                <span className="notification-item-title">📄 Report ready for Vikram Desai</span>
                <span className="notification-item-detail">
                  Background verification report has been generated and is ready for review. Click to view the full report.
                </span>
                <span className="notification-item-time">23 May 2026, 6:30 PM</span>
              </div>
              <div className="notification-item" style={{ borderColor: "#9ddccb", background: "#e8f8f3" }}>
                <span className="notification-item-title">✅ Request verified — Karan Singh</span>
                <span className="notification-item-detail">
                  Karan Singh verification is now verified. Report will be generated shortly.
                </span>
                <span className="notification-item-time">22 May 2026, 4:15 PM</span>
              </div>
              <div className="notification-item notification-item-info">
                <span className="notification-item-title">🏢 Request approved by enterprise</span>
                <span className="notification-item-detail">
                  Ananya Gupta verification was approved by enterprise.
                </span>
                <span className="notification-item-time">20 May 2026, 2:30 PM</span>
              </div>
              <div className="notification-item notification-item-info">
                <span className="notification-item-title">📋 New request created</span>
                <span className="notification-item-detail">
                  Rahul Sharma is waiting for review.
                </span>
                <span className="notification-item-time">20 May 2026, 9:15 AM</span>
              </div>
            </div>
          </div>
        </div>

        <p className="inline-alert inline-alert-success">
          📬 A new verification report has been delivered to your workspace. Open Requests to view the full report for Vikram Desai.
        </p>
      </DemoPortalFrame>
    </>
  );
}
