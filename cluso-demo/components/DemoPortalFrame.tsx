"use client";

import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  Clipboard,
  ListChecks,
  ReceiptText,
  Users,
  Settings,
  LogOut,
  User,
  Menu,
  FileSignature,
  SlidersHorizontal,
  Building,
  Package,
  Shield,
  PieChart,
  Activity,
  FileText,
  Briefcase,
  Search,
  ScanEye,
  Wallet,
  CreditCard,
  Sliders,
  BellRing,
  UserRound,
  ShieldCheck,
  BriefcaseBusiness,
  type LucideIcon,
} from "lucide-react";
import { ReactNode, useState } from "react";

type NavItemTheme = {
  bg: string;
  border: string;
  text: string;
  iconColor: string;
  gradient: string;
};

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  description: string;
  subIcons: LucideIcon[];
  theme: NavItemTheme;
};

const customerNav: NavItem[] = [
  {
    href: "/demo/company-hr",
    label: "Overview",
    icon: LayoutDashboard,
    description: "Get a bird's-eye view of your candidate progress, recent activity, and overall health metrics.",
    subIcons: [PieChart, Activity],
    theme: {
      bg: "bg-blue-50 dark:bg-blue-900/40",
      border: "border-blue-200 dark:border-blue-800",
      text: "text-blue-800 dark:text-blue-300",
      iconColor: "text-blue-600 dark:text-blue-400",
      gradient: "from-blue-500 to-cyan-400",
    },
  },
  {
    href: "/demo/creates-order",
    label: "Orders",
    icon: Clipboard,
    description: "Place new verification orders and track the fulfillment of individual candidate background reports.",
    subIcons: [FileText, Briefcase],
    theme: {
      bg: "bg-emerald-50 dark:bg-emerald-900/40",
      border: "border-emerald-200 dark:border-emerald-800",
      text: "text-emerald-800 dark:text-emerald-300",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      gradient: "from-emerald-500 to-teal-400",
    },
  },
  {
    href: "/demo/hr-reviews",
    label: "Requests",
    icon: ListChecks,
    description: "Review detailed candidate form submissions, evaluate enterprise decisions, and track verifications.",
    subIcons: [Search, ScanEye],
    theme: {
      bg: "bg-violet-50 dark:bg-violet-900/40",
      border: "border-violet-200 dark:border-violet-800",
      text: "text-violet-800 dark:text-violet-300",
      iconColor: "text-violet-600 dark:text-violet-400",
      gradient: "from-violet-500 to-fuchsia-400",
    },
  },
  {
    href: "/demo/delivered",
    label: "Invoices",
    icon: ReceiptText,
    description: "Access your billing history, download comprehensive invoices, and manage payment receipts safely.",
    subIcons: [Wallet, CreditCard],
    theme: {
      bg: "bg-rose-50 dark:bg-rose-900/40",
      border: "border-rose-200 dark:border-rose-800",
      text: "text-rose-800 dark:text-rose-300",
      iconColor: "text-rose-600 dark:text-rose-400",
      gradient: "from-rose-500 to-pink-400",
    },
  },
  {
    href: "/demo/company-hr",
    label: "Team",
    icon: Users,
    description: "Manage your enterprise organization members, configure their roles, and set collaboration boundaries.",
    subIcons: [Users, Shield],
    theme: {
      bg: "bg-amber-50 dark:bg-amber-900/40",
      border: "border-amber-200 dark:border-amber-800",
      text: "text-amber-800 dark:text-amber-300",
      iconColor: "text-amber-600 dark:text-amber-400",
      gradient: "from-amber-500 to-orange-400",
    },
  },
  {
    href: "/demo/company-hr",
    label: "Settings",
    icon: Settings,
    description: "Configure notifications, update company profiling securely, and tailor your platform experience.",
    subIcons: [Sliders, BellRing],
    theme: {
      bg: "bg-slate-100 dark:bg-slate-800/80",
      border: "border-slate-200 dark:border-slate-700",
      text: "text-slate-800 dark:text-slate-300",
      iconColor: "text-slate-600 dark:text-slate-400",
      gradient: "from-slate-500 to-gray-400",
    },
  },
];

const candidateNav: NavItem[] = [
  {
    href: "/demo/candidate",
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "Monitor your overall background screening progress and see required actions.",
    subIcons: [PieChart, Activity],
    theme: {
      bg: "bg-blue-50 dark:bg-blue-900/40",
      border: "border-blue-200 dark:border-blue-800",
      text: "text-blue-800 dark:text-blue-300",
      iconColor: "text-blue-600 dark:text-blue-400",
      gradient: "from-blue-500 to-cyan-400",
    },
  },
  {
    href: "/demo/fills-forms",
    label: "Forms to Fill",
    icon: FileSignature,
    description: "Complete assigned verification forms, submit necessary documents, and sign disclosures.",
    subIcons: [FileText, Briefcase],
    theme: {
      bg: "bg-emerald-50 dark:bg-emerald-900/40",
      border: "border-emerald-200 dark:border-emerald-800",
      text: "text-emerald-800 dark:text-emerald-300",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      gradient: "from-emerald-500 to-teal-400",
    },
  },
  {
    href: "/demo/uploads-docs",
    label: "History",
    icon: ListChecks,
    description: "Access your verification history and review past background screening checks.",
    subIcons: [Search, ScanEye],
    theme: {
      bg: "bg-violet-50 dark:bg-violet-900/40",
      border: "border-violet-200 dark:border-violet-800",
      text: "text-violet-800 dark:text-violet-300",
      iconColor: "text-violet-600 dark:text-violet-400",
      gradient: "from-violet-500 to-fuchsia-400",
    },
  },
  {
    href: "/demo/candidate",
    label: "Profile",
    icon: UserRound,
    description: "Manage your profile, work history, education details, and account security.",
    subIcons: [Sliders, BellRing],
    theme: {
      bg: "bg-slate-100 dark:bg-slate-800",
      border: "border-slate-200 dark:border-slate-700",
      text: "text-slate-800 dark:text-slate-300",
      iconColor: "text-slate-600 dark:text-slate-400",
      gradient: "from-slate-400 to-slate-300",
    },
  },
  {
    href: "/demo/candidate",
    label: "Settings",
    icon: Settings,
    description: "Adjust notification preferences, security, and account details.",
    subIcons: [SlidersHorizontal, BellRing],
    theme: {
      bg: "bg-slate-100 dark:bg-slate-800/80",
      border: "border-slate-200 dark:border-slate-700",
      text: "text-slate-800 dark:text-slate-300",
      iconColor: "text-slate-600 dark:text-slate-400",
      gradient: "from-slate-500 to-gray-400",
    },
  },
];

const adminNav: NavItem[] = [
  {
    href: "/demo/admin",
    label: "Overview",
    icon: LayoutDashboard,
    description: "Get a bird's-eye view of your enterprise metrics, recent activity, and platform health.",
    subIcons: [PieChart, Activity],
    theme: {
      bg: "bg-blue-50 dark:bg-blue-900/40",
      border: "border-blue-200 dark:border-blue-800",
      text: "text-blue-800 dark:text-blue-300",
      iconColor: "text-blue-600 dark:text-blue-400",
      gradient: "from-blue-500 to-cyan-400",
    },
  },
  {
    href: "/demo/verifier",
    label: "Requests",
    icon: ShieldCheck,
    description: "Review detailed candidate form submissions, evaluate enterprise decisions, and track verifications.",
    subIcons: [Search, ScanEye],
    theme: {
      bg: "bg-violet-50 dark:bg-violet-900/40",
      border: "border-violet-200 dark:border-violet-800",
      text: "text-violet-800 dark:text-violet-300",
      iconColor: "text-violet-600 dark:text-violet-400",
      gradient: "from-violet-500 to-fuchsia-400",
    },
  },
  {
    href: "/demo/checks-done",
    label: "Services",
    icon: BriefcaseBusiness,
    description: "Configure verification service offerings, custom checks, and specific client integrations.",
    subIcons: [Settings, Shield],
    theme: {
      bg: "bg-orange-50 dark:bg-orange-900/40",
      border: "border-orange-200 dark:border-orange-800",
      text: "text-orange-800 dark:text-orange-300",
      iconColor: "text-orange-600 dark:text-orange-400",
      gradient: "from-orange-500 to-amber-400",
    },
  },
  {
    href: "/demo/admin",
    label: "Companies",
    icon: Building,
    description: "Manage client organizations, their sub-accounts, and view active enterprise relationships.",
    subIcons: [BriefcaseBusiness, Users],
    theme: {
      bg: "bg-indigo-50 dark:bg-indigo-900/40",
      border: "border-indigo-200 dark:border-indigo-800",
      text: "text-indigo-800 dark:text-indigo-300",
      iconColor: "text-indigo-600 dark:text-indigo-400",
      gradient: "from-indigo-500 to-purple-400",
    },
  },
  {
    href: "/demo/admin",
    label: "Team",
    icon: Users,
    description: "Manage admin users, configure member permission levels, and secure platform access.",
    subIcons: [User, ShieldCheck],
    theme: {
      bg: "bg-cyan-50 dark:bg-cyan-900/40",
      border: "border-cyan-200 dark:border-cyan-800",
      text: "text-cyan-800 dark:text-cyan-300",
      iconColor: "text-cyan-600 dark:text-cyan-400",
      gradient: "from-cyan-500 to-sky-400",
    },
  },
  {
    href: "/demo/admin",
    label: "Settings",
    icon: Settings,
    description: "Adjust system preferences, authentication parameters, and core profile details.",
    subIcons: [Sliders, BellRing],
    theme: {
      bg: "bg-slate-100 dark:bg-slate-800",
      border: "border-slate-200 dark:border-slate-700",
      text: "text-slate-800 dark:text-slate-300",
      iconColor: "text-slate-600 dark:text-slate-400",
      gradient: "from-slate-400 to-slate-300",
    },
  },
];

type Portal = "customer" | "candidate" | "admin";

type DemoPortalFrameProps = {
  portal: Portal;
  userName: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  activeNavLabel?: string;
  focusMode?: boolean;
};

function getNavItems(portal: Portal) {
  if (portal === "candidate") return candidateNav;
  if (portal === "admin") return adminNav;
  return customerNav;
}

export function DemoPortalFrame({
  portal,
  userName,
  title,
  subtitle,
  children,
  activeNavLabel,
  focusMode = false,
}: DemoPortalFrameProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const navItems = getNavItems(portal);

  return (
    <div
      className="admin-layout"
      style={focusMode ? { gridTemplateColumns: "minmax(0, 1fr)", gap: 0 } : undefined}
    >
      {!focusMode ? (
        <aside
          className={`admin-sidebar ${isMobileNavOpen ? "mobile-open" : ""}`}
          aria-label="Portal navigation menu"
        >
          <div className="sidebar-brand flex items-center justify-center p-4">
            <Image
              src="/images/cluso-infolink-logo.png"
              alt="Cluso Infolink"
              width={220}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
          </div>

          <nav className="portal-nav" aria-label="Portal sections">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNavLabel
                ? item.label === activeNavLabel
                : item.label === "Overview" || item.label === "Dashboard";
              return (
                <div key={item.label} className="relative group z-0 flex items-stretch lg:group-hover:z-[1600]">
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileNavOpen(false)}
                    className={`portal-nav-link w-full ${isActive ? "active" : ""}`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>

                  <div 
                    className="absolute left-full ml-[0.35rem] top-1/2 w-[270px] -translate-y-1/2 hidden lg:group-hover:flex flex-col z-[1700] pointer-events-none scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 origin-left"
                  >
                    <div className={`absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 rotate-45 border-l border-b bg-white dark:bg-slate-900 ${item.theme.border} z-[1] drop-shadow-sm`}></div>
                    
                    <div className={`relative px-4 py-4 pb-5 rounded-2xl shadow-xl bg-white dark:bg-slate-900 border ${item.theme.border} z-[2] overflow-hidden`}>
                      <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${item.theme.gradient}`} />

                      <div className="flex items-center gap-3 mb-2 pt-1">
                        <div className={`p-1.5 rounded-lg flex items-center justify-center ${item.theme.bg} ${item.theme.text}`}>
                          <Icon size={16} strokeWidth={2.5} className="drop-shadow-sm" />
                        </div>
                        <strong className="text-[14.5px] font-bold tracking-tight text-slate-800 dark:text-slate-100">{item.label}</strong>
                      </div>
                      
                      <p className="text-[13px] leading-relaxed text-slate-500 dark:text-slate-400 mt-2 mb-4 font-medium px-0.5">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center gap-2 mt-auto px-0.5">
                        {item.subIcons?.map((SubIcon, idx) => (
                           <div key={idx} className={`p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/80 ${item.theme.iconColor}`}>
                             <SubIcon size={16} strokeWidth={2} />
                           </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>
        </aside>
      ) : null}

      {!focusMode && isMobileNavOpen ? (
        <button
          type="button"
          className="portal-mobile-backdrop"
          aria-label="Close navigation menu"
          onClick={() => setIsMobileNavOpen(false)}
        />
      ) : null}

      <main className="admin-main">
        {!focusMode ? (
            <header className="admin-topbar">
            <div className="portal-topbar-leading" style={{ display: "flex", alignItems: "center", gap: "0.65rem", minWidth: 0, flex: 1, overflow: "hidden" }}>
              <button
                type="button"
                className="portal-nav-overflow-trigger"
                onClick={() => setIsMobileNavOpen((prev) => !prev)}
                aria-label="Open menu"
              >
                <Menu size={18} />
              </button>
              <div style={{ display: "grid", gap: "0.15rem", minWidth: 0 }}>
                <h1 className="admin-topbar-title" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title || "Enterprise Panel"}</h1>
                {subtitle ? (
                  <p style={{ margin: 0, color: "#6B7A90", fontSize: "0.85rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{subtitle}</p>
                ) : null}
              </div>
            </div>
            <div className="account-actions-wrap" style={{ flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 500, whiteSpace: "nowrap" }}>
                <User size={18} style={{ flexShrink: 0 }} />
                {userName}
              </div>
              <button className="logout-btn" type="button" onClick={() => {}}>
                <LogOut size={16} /> Sign out
              </button>
            </div>
          </header>
        ) : null}

        <div className="portal-shell">
          <div className="dashboard-stack">{children}</div>
        </div>
      </main>
    </div>
  );
}
