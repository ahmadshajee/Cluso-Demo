"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardPlus,
  Layers3,
  ListChecks,
  ShieldCheck,
  TriangleAlert,
  UserPlus,
} from "lucide-react";
import { DemoPortalFrame } from "@/components/DemoPortalFrame";
import { DemoStepIndicator } from "@/components/DemoStepIndicator";
import { DemoCallout } from "@/components/DemoCallout";
import { customerUser, demoRequests } from "@/lib/demoData";

export default function CompanyHRPage() {
  const pendingCount = demoRequests.filter((r) => r.status === "pending").length;
  const approvedCount = demoRequests.filter((r) => r.status === "approved").length;
  const verifiedCount = demoRequests.filter((r) => r.status === "verified").length;
  const rejectedCount = demoRequests.filter((r) => r.status === "rejected").length;

  const cards = [
    { label: "Pending", value: pendingCount, tone: "portal-stat-sky", icon: ClipboardPlus, href: "/demo/hr-reviews" },
    { label: "Approved By Enterprise", value: approvedCount, tone: "portal-stat-emerald", icon: BadgeCheck, href: "/demo/approved" },
    { label: "Rejected By Enterprise", value: rejectedCount, tone: "portal-stat-rose", icon: TriangleAlert, href: "/demo/hr-reviews" },
    { label: "Verified", value: verifiedCount, tone: "portal-stat-sky", icon: ShieldCheck, href: "/demo/company-hr-review" },
    { label: "Total", value: demoRequests.filter((r) => r.customerName === "TechVista Solutions Pvt. Ltd.").length, tone: "portal-stat-violet", icon: Layers3, href: "/demo/invite-sent" },
  ];

  return (
    <>
      <DemoStepIndicator currentSlug="company-hr" />
      <DemoPortalFrame
        portal="customer"
        userName={customerUser.name}
        title="Enterprise Overview"
        subtitle="Use quick actions to complete one task at a time with less clutter."
        activeNavLabel="Overview"
      >
        <DemoCallout items={[
          { title: "Enterprise Dashboard", text: "This is the Company HR portal. The enterprise user sees an overview of all verification requests they've created.", arrow: "down" },
          { title: "Stat Cards", text: "Each card shows a live count of requests by status — Pending, Approved, Rejected, Verified, and Total.", arrow: "down" },
          { title: "Quick Actions", text: "One-click shortcuts to create orders, review requests, or manage team access without navigating through menus.", arrow: "down" },
        ]} />
        <section className="portal-stats-grid" aria-label="Request overview">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.label} href={card.href} className={`portal-stat portal-stat-link ${card.tone}`} style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
                <div className="portal-stat-head">
                  <p className="portal-stat-value">{card.value}</p>
                  <span className="portal-stat-icon" aria-hidden="true">
                    <Icon size={18} />
                  </span>
                </div>
                <p className="portal-stat-label">{card.label}</p>
              </Link>
            );
          })}
        </section>

        <section className="quick-actions-grid" aria-label="Quick actions">
          <div className="quick-action-card">
            <div className="quick-action-head">
              <span className="icon-chip" aria-hidden="true">
                <ClipboardPlus size={14} />
              </span>
              <strong>Create New Order</strong>
            </div>
            <p className="block-subtitle">Submit candidate verification requests with assigned services.</p>
            <Link href="/demo/creates-order" className="quick-action-link">
              Open Orders <ArrowRight size={14} />
            </Link>
          </div>

          <div className="quick-action-card">
            <div className="quick-action-head">
              <span className="icon-chip" aria-hidden="true">
                <ListChecks size={14} />
              </span>
              <strong>Review Requests</strong>
            </div>
            <p className="block-subtitle">Track pending, enterprise decisions, and verified items with a focused request view.</p>
            <Link href="/demo/hr-reviews" className="quick-action-link">
              Open Requests <ArrowRight size={14} />
            </Link>
          </div>

          <div className="quick-action-card">
            <div className="quick-action-head">
              <span className="icon-chip" aria-hidden="true">
                <UserPlus size={14} />
              </span>
              <strong>Manage Team Access</strong>
            </div>
            <p className="block-subtitle">Create delegate or user accounts without leaving this workspace.</p>
            <Link href="/demo/company-hr" className="quick-action-link">
              Open Team <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </DemoPortalFrame>
    </>
  );
}
