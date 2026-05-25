# ClusoCRM System Context & Overview

## 1. Project Overview

**ClusoCRM** is a centralized, role-based background verification platform. It consists of a suite of three interconnected front-end/back-end applications (portals). Together, these portals manage the full lifecycle of background checks—from onboarding companies and initiating checks, to candidates submitting their documents, and finally, verifiers performing checks and generating reports.

## 2. Directory Tree & Architecture

The workspace is structured into three main Next.js applications alongside a shared documentation folder serving as the authoritative architecture and workflow index:

```text
cluso-new-suite/
│
├── Cluso Documnets/              # Detailed architectural, dataflow, and workflow logic
│   ├── 01_Project_Overview.md
│   ├── 02_System_Dataflow_Diagram.md
│   ├── 03_Request_Lifecycle_Stateflow.md
│   ├── 04_Role_Based_Swimlane.md
│   ├── 05_API_Catalog.md
│   ├── 06_Data_Model_and_Status.md
│   ├── 07_Environment_and_External_Dependencies.md
│   ├── 08_Source_References.md
│   ├── Feature Name How to.xls
│   └── README.md
│
├── cluso-admin/                  # ADMIN PORTAL (Port 3010)
├── cluso-candidates/             # CANDIDATE PORTAL (Port 3012)
├── cluso-customer/               # CUSTOMER / ENTERPRISE PORTAL (Port 3011)
│
├── contxt.md                     # This file — project-wide context
├── WORKFLOW_DATAFLOW_DIAGRAM.md
└── local_deployment_secrets.txt  # Environment references and DB URIs
```

---

## 3. The Portals — Detailed Structure

### A. Cluso Admin Portal (`cluso-admin`) — Port 3010

**Target Users:** Platform Administrators, Managers, and Verifiers.
**Purpose:** System oversight. Admins onboard client companies, set up verification services, assign tasks to verifiers, manage system users, oversee ongoing verifications, and generate final PDF reports.

```text
cluso-admin/
├── app/
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Login / landing page
│   ├── providers.tsx                 # React Query provider
│   ├── globals.css                   # Global styles (~34KB, comprehensive design system)
│   ├── icon.png                      # Favicon
│   ├── api/
│   │   ├── admins/                   # Admin user CRUD
│   │   ├── auth/                     # Login, logout, me, change-password
│   │   ├── customers/                # Company onboarding & management
│   │   ├── invoices/                 # Invoice generation & management
│   │   ├── requests/                 # Verification request lifecycle
│   │   ├── services/                 # Background check service definitions
│   │   ├── settings/                 # Platform-wide settings (Cluso company details)
│   │   ├── setup/                    # Initial superadmin setup
│   │   ├── verification-emails/      # Verification email dispatch
│   │   └── verifiers/                # Verifier user management
│   └── dashboard/
│       ├── page.tsx                  # Admin dashboard home
│       ├── companies/page.tsx        # Company management (~88KB — full CRUD, service assignment)
│       ├── completed/page.tsx        # Completed verifications (~203KB — report generation, PDF)
│       ├── invoices/page.tsx         # Invoice management (~173KB — billing, payment tracking)
│       ├── requests/page.tsx         # Active requests (~207KB — verification workflow, assignment)
│       ├── services/page.tsx         # Service definition (~27KB — form builder integration)
│       ├── settings/page.tsx         # Platform settings (~44KB — Cluso profile, branding)
│       └── team/page.tsx             # Team page (delegates to components)
├── components/
│   ├── AdminManagement.tsx           # Admin user list & CRUD
│   ├── MonthPicker.tsx               # Month/year picker widget
│   ├── SearchableSelect.tsx          # Filterable dropdown select
│   ├── ServiceFormBuilder.tsx        # Dynamic form field builder (~126KB — the core service form designer)
│   ├── VerifierManagement.tsx        # Verifier list, assignment, management (~32KB)
│   ├── dashboard/
│   │   ├── AdminPortalFrame.tsx      # Sidebar nav frame (~26KB — nav items, notifications, topbar)
│   │   └── VerificationEmailModal.tsx # Email composition modal (~20KB)
│   └── ui/
│       └── LoadingScreen.tsx         # Animated loading spinner
├── lib/
│   ├── alerts.ts                     # Alert tone utility (success/error/warning classification)
│   ├── auth.ts                       # JWT verification & session extraction
│   ├── currencies.ts                 # Supported currency type (INR/USD/GBP/EUR/AED)
│   ├── customerReportMail.ts         # Email template for customer report delivery
│   ├── graphMail.ts                  # Microsoft Graph API mail sender
│   ├── invoiceMail.ts                # Invoice email template
│   ├── invoicePdf.ts                 # PDF generation for invoices (pdf-lib)
│   ├── locationHierarchy.ts          # Country/state/city hierarchy
│   ├── mongodb.ts                    # Mongoose connection singleton
│   ├── types.ts                      # Shared TypeScript types (~11KB)
│   ├── hooks/
│   │   └── useAdminSession.ts        # Admin session hook (me, loading, logout, refreshMe)
│   └── models/
│       ├── ClusoDetails.ts           # Platform-level company profile schema
│       ├── Invoice.ts                # Invoice schema (line items, payment proof, GST)
│       ├── Service.ts                # Service definition schema (form fields, pricing)
│       ├── User.ts                   # User schema (admin, verifier, candidate, customer roles)
│       └── VerificationRequest.ts    # Core request schema (~14KB — full lifecycle state)
└── scripts/
    ├── assign-verifiers-to-managers.mjs  # Bulk verifier-to-manager assignment
    └── fill-techcorp-profile.mjs         # Seed script for test company profile
```

---

### B. Cluso Customer Portal (`cluso-customer`) — Port 3011

**Target Users:** Enterprise clients (HR teams, company representatives).
**Purpose:** Client companies log in to create verification orders (Requests) for potential hires. They track progress, manage delegate access, handle enterprise-level decisioning (Approve/Reject data), view final reports, and manage invoices.

```text
cluso-customer/
├── app/
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Login / landing page
│   ├── providers.tsx                 # React Query provider
│   ├── globals.css                   # Global styles
│   ├── icon.png
│   ├── api/
│   │   ├── auth/                     # Login, logout, me, change-password
│   │   ├── delegates/                # Team delegate management
│   │   ├── invoices/                 # Invoice viewing & payment proof upload
│   │   ├── orders/                   # Request creation & candidate invitation
│   │   └── settings/                 # Company profile / billing settings
│   └── dashboard/
│       ├── page.tsx                  # Customer dashboard home
│       ├── completed/page.tsx        # Completed verifications (~173KB — report viewing)
│       ├── invoices/page.tsx         # Invoice history & payment (~121KB)
│       ├── orders/page.tsx           # New request creation (~24KB)
│       ├── requests/page.tsx         # Active requests & decisioning (~169KB)
│       ├── settings/page.tsx         # Company profile editor (~37KB)
│       └── team/page.tsx             # Delegate team management (~35KB)
├── components/
│   ├── MonthPicker.tsx               # Month/year picker (shared pattern)
│   ├── dashboard/
│   │   └── PortalFrame.tsx           # Sidebar nav frame (~30KB — nav, notifications, topbar)
│   └── ui/
│       ├── LoadingScreen.tsx         # Loading spinner
│       └── blocks.tsx                # BlockCard, BlockTitle reusable card components
├── lib/
│   ├── alerts.ts                     # Alert tone utility
│   ├── auth.ts                       # JWT auth with delegate support (~4KB)
│   ├── currencies.ts                 # Currency types
│   ├── graphMail.ts                  # Microsoft Graph mail sender
│   ├── invoicePdf.ts                 # Invoice PDF generation
│   ├── mongodb.ts                    # Mongoose connection singleton
│   ├── paymentReceiptAcknowledgementMail.ts  # Payment receipt email template
│   ├── teamCredentialsMail.ts        # Delegate credential email template
│   ├── types.ts                      # Shared TypeScript types (~12KB)
│   ├── hooks/
│   │   ├── usePortalSession.ts       # Portal session hook
│   │   └── useRequestsData.ts        # Requests data fetching hook
│   └── models/
│       ├── Invoice.ts                # Invoice schema
│       ├── Service.ts                # Service schema
│       ├── User.ts                   # User schema (includes delegate roles)
│       └── VerificationRequest.ts    # Request schema
```

---

### C. Cluso Candidates Portal (`cluso-candidates`) — Port 3012

**Target Users:** End-users undergoing the background check.
**Purpose:** Candidates receive invite links via email to access this portal. They complete customized verification forms, upload required documents, view their verification history, manage their profile, and make corrections if submissions are rejected.

```text
cluso-candidates/
├── app/
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Login page
│   ├── providers.tsx                 # React Query provider
│   ├── globals.css                   # Global styles (~12KB + profile layout styles)
│   ├── icon.png
│   ├── api/
│   │   ├── auth/                     # Login, logout, me, change-password
│   │   ├── delegates/                # Delegate endpoints
│   │   ├── orders/                   # Form retrieval & submission
│   │   ├── profile/                  # Candidate profile CRUD (skills, employment, education)
│   │   └── requests/                 # Request history viewing
│   └── dashboard/
│       ├── page.tsx                  # Candidate dashboard home
│       ├── orders/page.tsx           # Form filling & document upload (~138KB)
│       ├── profile/page.tsx          # Profile management — Naukri-style layout with sliding drawer
│       ├── requests/page.tsx         # Verification history viewing (~23KB)
│       ├── settings/page.tsx         # Settings placeholder
│       └── team/page.tsx             # Team placeholder
├── components/
│   ├── dashboard/
│   │   ├── PortalFrame.tsx           # Sidebar nav frame (~23KB — nav, notifications, topbar)
│   │   └── ProfileEditDrawer.tsx     # Sliding right-side edit drawer (reusable)
│   └── ui/
│       ├── LoadingScreen.tsx         # Loading spinner
│       └── blocks.tsx                # BlockCard, BlockTitle components
├── lib/
│   ├── alerts.ts                     # Alert tone utility
│   ├── auth.ts                       # JWT auth
│   ├── currencies.ts                 # Currency types
│   ├── history.ts                    # History helper utilities
│   ├── locationHierarchy.ts          # Country/state/city hierarchy (~6KB)
│   ├── mobilePhone.ts               # Phone number formatting & validation (~5KB)
│   ├── mongodb.ts                    # Mongoose connection singleton
│   ├── types.ts                      # Shared TypeScript types (~11KB)
│   ├── hooks/
│   │   ├── usePortalSession.ts       # Portal session hook (me, loading, logout, refreshMe)
│   │   └── useRequestsData.ts        # Requests data fetching hook
│   └── models/
│       ├── Service.ts                # Service schema
│       ├── User.ts                   # User schema (candidate-specific fields, profile sub-doc)
│       └── VerificationRequest.ts    # Request schema
```

---

## 4. Key UI Patterns & Components

### Portal Frame (Navigation Shell)
Each portal uses a dedicated frame component as the layout shell:
- **Admin:** `AdminPortalFrame.tsx` — Sidebar with: Dashboard, Companies, Requests, Completed, Invoices, Services, Team, Settings
- **Customer:** `PortalFrame.tsx` — Sidebar with: Dashboard, Create Order, Requests, Completed, Invoices, Team, Settings
- **Candidate:** `PortalFrame.tsx` — Sidebar with: Dashboard, Forms, History, Profile

All frames include: sticky topbar, user info display, notification bell (real-time via polling with React Query), mobile hamburger nav, and hover tooltip popover for nav items.

### Profile Page (Candidate Portal) — Naukri-style Layout
The candidate profile page uses a **Naukri.com-inspired layout**:
- **Quick Links sidebar** (left, sticky) — Section anchors for Password, Key Skills, Employment, Education with quick "Add" buttons
- **Read-only summary cards** (center) — Compact cards showing skills as pill chips, employment/education as summary rows with edit pencil buttons
- **Sliding edit drawer** (`ProfileEditDrawer.tsx`) — Right-side panel that slides in when clicking Edit/Add on any section. Contains the edit form, saves and auto-closes on success. Supports Escape key, backdrop click, and body scroll lock.

### Shared UI Components
- `BlockCard` / `BlockTitle` — Card container and titled header (used in Customer & Candidate portals)
- `LoadingScreen` — Animated loading state (used across all portals)
- `MonthPicker` — Month/year selector (Admin & Customer)
- `SearchableSelect` — Filterable dropdown (Admin)

---

## 5. Data Models (Mongoose Schemas)

All three portals share the same MongoDB database (`cluso`) and reference the same core collections:

| Model | Collection | Used By | Description |
|-------|-----------|---------|-------------|
| `User` | `users` | All 3 | Unified user model with role-based fields (admin, superadmin, manager, verifier, candidate, customer, delegate). Candidates have embedded `profile` sub-document (keySkills, employment, education). |
| `VerificationRequest` | `verificationrequests` | All 3 | Core request lifecycle document (~14KB schema). Tracks status, candidate form responses, service verifications, report metadata, reverification appeals, invoice snapshots, and rejection fields. |
| `Service` | `services` | Admin + Candidate | Background check service definitions with dynamic form fields, pricing, country-specific rates, package bundling, and multi-entry support. |
| `Invoice` | `invoices` | Admin + Customer | Billing records with line items, GST support, payment proof uploads, multi-currency totals. |
| `ClusoDetails` | `clusodetails` | Admin | Platform-level company profile (Cluso's own billing info, bank details, branding). |

---

## 6. How The Portals Are Interconnected

Though these portals run as separate servers, they act as a singular system sharing a central nervous system:

1. **Shared Database (MongoDB):** All three portals connect to the same MongoDB database (`cluso`). When a Customer creates a Request in `cluso-customer`, the `cluso-candidates` portal reads that same record to show the candidate their tasks.

2. **Stateflow / Lifecycle Dependency:**
   - **Customer Portal** creates a verification request and triggers a candidate invitation (via SMTP email with temporary credentials).
   - **Candidate Portal** generates forms based on the services mapped to that Request. Candidate fills forms & uploads documents.
   - Once submitted, **Customer Portal** exposes it to the customer for HR approval/rejection (with a field-level rejection capability).
   - Upon HR approval, **Admin Portal** opens the request to Verifiers to conduct background checks, record verification attempts, and generate final PDF reports.

3. **Authentication & Security:** JWT-based auth via HTTP-only cookies. Each portal uses a portal-specific cookie name to prevent session crossover. Sessions enforce strict validation using `sessionVersion` inside tokens.

---

## 7. Technology Stack & Dependencies

**Core Framework:** Next.js 16.1.6 (App Router), React 19.2.3, TypeScript 5

| Category | Technology | Used By |
|----------|-----------|---------|
| Database | MongoDB (Mongoose 9.2.4) | All 3 |
| Auth | jsonwebtoken, bcryptjs | All 3 |
| UI Icons | lucide-react 0.577 | All 3 |
| Data Fetching | @tanstack/react-query 5.95 | All 3 |
| Styling | Tailwind CSS 4 (via PostCSS) + vanilla CSS | All 3 |
| Validation | Zod 4.3 | All 3 |
| Email | nodemailer 8 + Microsoft Graph API (googleapis 171) | Admin + Customer |
| PDF | pdf-lib 1.17 + @pdf-lib/fontkit | Admin + Customer |
| Location Data | country-state-city 3.2 | Admin + Candidate |

---

## 8. Deployment Strategy

**Hosting:** Designed for **Vercel** — each portal is deployed as its own distinct Vercel Project.

**Database:** Hosted on **MongoDB Atlas** (Cloud). A single cluster contains the `cluso` database accessed by all three apps.

**Environment Variables:**
- Common across all apps: `MONGODB_URI`, `JWT_SECRET`
- App-specific: `ADMIN_SETUP_KEY` (Admin), SMTP credentials (`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`), Graph API OAuth tokens, `NODE_ENV`

**Local Development:**
```bash
# Run each in a separate terminal
cd cluso-admin    && npm run dev   # → http://localhost:3010
cd cluso-customer && npm run dev   # → http://localhost:3011
cd cluso-candidates && npm run dev # → http://localhost:3012
```

---

## 9. Business Rules & Strict Guards

- **Customer rejection window:** Customers can only transition an "Approved" request back to "Rejected" within a strict 10-minute window (`enterpriseDecisionLockedAt` field).
- **Candidate lock:** Candidate responses are completely locked upon approval or verification; they cannot mutate form data post-submission.
- **Role-Based Access Control (RBAC):** Strongly enforced in Admin portal (Super Admins > Managers > Verifiers) and Customer portal (Primary Owners > Delegates) using route filters and API guards.
- **First-login password change:** Candidates must change their temporary password on first login (`mustChangePassword` flag auto-triggers the password drawer).
- **Field-level rejection:** Customers can reject specific fields with notes, prompting candidates to correct only those fields.
- **Reverification appeals:** After verification, customers can submit reverification appeals with supporting documents.
