"use client";

import Link from "next/link";
import {
  AlertTriangle,
  Archive,
  ArrowRight,
  Building,
  CheckCircle2,
  Clock,
  ListFilter,
  Package,
  Shield,
  ShieldAlert,
  UserCheck,
  Users,
} from "lucide-react";
import { DemoPortalFrame } from "@/components/DemoPortalFrame";
import { DemoStepIndicator } from "@/components/DemoStepIndicator";
import { adminUser, demoRequests } from "@/lib/demoData";

export default function AdminDashboardPage() {
  const pendingCount = demoRequests.filter((r) => r.status === "pending").length;
  const approvedCount = demoRequests.filter((r) => r.status === "approved").length;
  const verifiedCount = demoRequests.filter((r) => r.status === "verified").length;
  const rejectedCount = demoRequests.filter((r) => r.status === "rejected").length;

  const cards = [
    { label: "Pending Requests", value: pendingCount, icon: Clock, tone: "amber" as const, href: "/demo/hr-reviews" },
    { label: "Approved Requests", value: approvedCount, icon: CheckCircle2, tone: "emerald" as const, href: "/demo/verifier" },
    { label: "Verified Requests", value: verifiedCount, icon: Shield, tone: "cyan" as const, href: "/demo/checks-done" },
    { label: "Rejected Requests", value: rejectedCount, icon: AlertTriangle, tone: "rose" as const, href: "/demo/hr-reviews" },
    { label: "Archived Requests", value: 2, icon: Archive, tone: "violet" as const, href: "/demo/company-hr-review" },
    { label: "Services", value: 6, icon: Package, tone: "sky" as const, href: "/demo/checks-done" },
    { label: "Companies", value: 3, icon: Building, tone: "cyan" as const, href: "/demo/company-hr" },
    { label: "Verifiers", value: 4, icon: Users, tone: "sky" as const, href: "/demo/verifier" },
    { label: "Admins", value: 2, icon: Shield, tone: "violet" as const, href: "/demo/admin" },
  ];

  return (
    <>
      <DemoStepIndicator currentSlug="admin" />
      <DemoPortalFrame
        portal="admin"
        userName={adminUser.name}
        title="Admin Overview"
        subtitle="Use dedicated sections to manage requests, services, teams, and companies without clutter."
        activeNavLabel="Overview"
      >
        <section className="portal-stats-grid" aria-label="Admin overview metrics">
          {cards.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.label} href={item.href} className={`portal-stat portal-stat-link portal-stat-${item.tone}`} style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
                <div className="portal-stat-head">
                  <span className="portal-stat-icon" aria-hidden="true"><Icon size={18} /></span>
                  <p className="portal-stat-value">{item.value}</p>
                </div>
                <p className="portal-stat-label">{item.label}</p>
              </Link>
            );
          })}
        </section>

        <section className="quick-actions-grid" aria-label="Admin quick actions">
          <Link href="/demo/verifier" className="quick-action-card">
            <div className="quick-action-head">
              <ListFilter size={16} />
              <strong>Review Request Queue</strong>
            </div>
            <p className="quick-action-copy">Approve, reject, and monitor archived requests with focused controls.</p>
            <span className="quick-action-link">Open Requests <ArrowRight size={14} /></span>
          </Link>

          <Link href="/demo/company-hr" className="quick-action-card">
            <div className="quick-action-head">
              <Building size={16} />
              <strong>Manage Company Access</strong>
            </div>
            <p className="quick-action-copy">Issue company logins and update service pricing assignments.</p>
            <span className="quick-action-link">Open Companies <ArrowRight size={14} /></span>
          </Link>

          <Link href="/demo/checks-done" className="quick-action-card">
            <div className="quick-action-head">
              <Package size={16} />
              <strong>Configure Services</strong>
            </div>
            <p className="quick-action-copy">Add service catalog entries and maintain service form structures.</p>
            <span className="quick-action-link">Open Services <ArrowRight size={14} /></span>
          </Link>

          <Link href="/demo/admin" className="quick-action-card">
            <div className="quick-action-head">
              <UserCheck size={16} />
              <strong>Team Permissions</strong>
            </div>
            <p className="quick-action-copy">Manage verifier access and administrative accounts by role.</p>
            <span className="quick-action-link">Open Team <ArrowRight size={14} /></span>
          </Link>
        </section>

        <section className="glass-card" style={{ padding: "1.2rem" }}>
          <h2 style={{ marginTop: 0, display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1.1rem" }}>
            <ShieldAlert size={20} color="#4A90E2" />
            Workflow Guidance
          </h2>
          <ol style={{ margin: 0, paddingLeft: "1.1rem", color: "#4a5568", lineHeight: 1.8 }}>
            <li>Process pending requests first to keep queue latency low.</li>
            <li>Update company service assignments before issuing credentials.</li>
            <li>Review verifier/admin access after any org structure changes.</li>
          </ol>
        </section>
      </DemoPortalFrame>
    </>
  );
}
