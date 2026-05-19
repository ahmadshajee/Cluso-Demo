# ClusoCRM System Context & Overview

## 1. Project Overview

**ClusoCRM** is a centralized, role-based background verification platform. It consists of a suite of three interconnected front-end/back-end applications (portals). Together, these portals manage the full lifecycle of background checks—from onboarding companies and initiating checks, to candidates submitting their documents, and finally, verifiers performing checks and generating reports.

## 2. Directory Tree & Architecture

The workspace is structured into three main Next.js applications alongside a shared documentation folder serving as the authoritative architecture and workflow index:

``text
cluso-new-suite/
│
├── Cluso Documnets/              # Detailed architectural, dataflow, and workflow logic (Data Models, API Catalog, etc.)
│
├── cluso-admin/                  # ADMIN PORTAL (Default Port: 3010)
│   ├── app/                      # Next.js App Router (UI & API routes for admins/verifiers)
│   ├── components/               # UI components (AdminManagement, VerifierManagement, etc.)
│   ├── lib/                      # Shared logic, db connections, models, mail/PDF generators
│   └── scripts/                  # Admin utility scripts (db seeding, reset, assignments)
│
├── cluso-candidates/             # CANDIDATE PORTAL (Default Port: 3012)
│   ├── app/                      # Next.js App Router (UI & API routes for candidates)
│   ├── components/               # Candidate-facing UI components
│   └── lib/                      # Auth, history, file processing logic
│
├── cluso-customer/               # CUSTOMER / ENTERPRISE PORTAL (Default Port: 3011)
│   ├── app/                      # Next.js App Router (Enterprise requests, decisioning)
│   ├── components/               # Dashboard and request creation components
│   └── lib/                      # Auth, invoice logic, receipts, mailers
│
└── local_deployment_secrets.txt  # Environment references and DB URIs
``

## 3. The Portals (What they are & what they do)

The platform is split into three independent Next.js applications:

### A. Cluso Admin Portal (cluso-admin)
*   **Target Users:** Platform Administrators, Managers, and Verifiers.
*   **Purpose:** System oversight. Admins use this to onboard client companies (customers), set up verification services, assign tasks to verifiers, manage system users, oversee ongoing verifications, and generate final PDF reports.
*   **Key Optimizations:** Interactive report previews at the forefront, enhanced loading screens.
*   **Port:** 3010

### B. Cluso Customer Portal (cluso-customer)
*   **Target Users:** Enterprise clients (HR teams, company representatives).
*   **Purpose:** The client interface. Client companies log in here to create verification orders (Requests) for their potential hires (Candidates). It allows them to track progress, assign delegates, handle enterprise-level decisioning (Approve/Reject data), and view final verification reports and invoices.
*   **Key Optimizations:** Strong INP (Interaction to Next Paint) optimizations using memoization for heavy modal components. Role-scoped filtering blocks cross-company access securely.
*   **Port:** 3011

### C. Cluso Candidates Portal (cluso-candidates)
*   **Target Users:** The end-users undergoing the background check.
*   **Purpose:** The data-gathering interface. Candidates receive invite links via email to access this portal securely. Here, they complete customized verification forms, upload required documents (IDs, degrees), and make corrections if the customer or admin rejects a submission due to issues.
*   **Key Optimizations:** Dynamic email previews with temporary passwords; enforcement of password changes upon first login.
*   **Port:** 3012

## 4. How They Are Interconnected

Though these portals run as separate servers/applications, they act as a singular system sharing a central nervous system:

1.  **Shared Database (MongoDB):** All three portals connect to the exact same MongoDB database (named cluso). This acts as the shared state. For instance, when a Customer creates a "Request" in cluso-customer, the cluso-candidates portal reads that exact same database record to show the candidate their tasks.
2.  **Stateflow / Lifecycle Dependency:** 
    *   **Customer Portal** triggers an invitation (via SMTP email).
    *   **Candidate Portal** generates the forms based on the services mapped to that Request.
    *   Once submitted, **Customer Portal** exposes it to the customer for HR approval.
    *   Upon HR approval, **Admin Portal** opens the request to Verifiers to conduct the background checks.
3.  **Authentication & Security:** Authentication is primarily handled via JWTs (JSON Web Tokens) set in HTTP-only cookies. Each portal uses a portal-specific cookie name to ensure sessions do not cross over. 
    * *Security enhancement:* Sessions enforce strict validation utilizing sessionVersion inside tokens.

## 5. Deployment Strategy

Based on the project files (
ext.config.ts, local_deployment_secrets.txt), the deployment model is optimized for Serverless environments:

*   **Hosting:** Designed to be deployed on **Vercel** (indicated by ercel-admin-email.env.txt and Next.js foundations). Each portal is deployed as its own distinct Vercel Project.
*   **Database:** Hosted on **MongoDB Atlas** (Cloud). A single cluster (e.g., cluster0.qettuov.mongodb.net) contains the cluso database accessed by all three apps.
*   **Environment Variables:** 
    *   Each deployed Vercel app sets environment variables unique to its scope.
    *   Common variables across all three apps: MONGODB_URI and JWT_SECRET.
    *   App-specific variables: Setup keys (ADMIN_SETUP_KEY), SMTP credentials for email sending, and Node environment settings.
*   **Local Development:** Locally, the apps run on separate ports (3010, 3011, 3012) using 
pm run dev in three separate terminal instances.

## 6. Other Key Technical Details & Strict Guards

*   **Frameworks Used:** Next.js (App Router), React, TypeScript (preferred), Tailwind CSS (via postcss/globals.css).
*   **Email & Reporting:** Relying heavily on SMTP integrations (found in lib/alerts.ts and *Mail.ts files across apps) for automated workflow notifications (Correction requests, team invites, verifier notifications) and automated PDF generation (invoicePdf.ts, lib/pdf.ts) for invoices and final reports.
*   **Role-Based Access Control (RBAC):** Strongly enforced in the Admin portal (separating Super Admins, Managers, and Verifiers) and Customer portal (Separating Primary Owners and Delegates) using strict route filters and API guards.
*   **Business Rules Enforcement:**
    *   *Customer rejection window:* Customers can only transition an "Approved" request back to "Rejected" within a strict 10-minute window.
    *   *Candidate lock:* Candidate responses are completely locked upon approval or verification; they cannot mutate form data post-submission.
