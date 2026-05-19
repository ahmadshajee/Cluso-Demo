# ClusoCRM Project Overview

## Platform Scope

ClusoCRM is a three-portal background verification platform.

1. Admin portal on port 3010 for onboarding companies, managing services, assigning verifiers and managers, and report generation.
2. Customer portal on port 3011 for enterprise login, request creation, delegate management, and enterprise decisioning.
3. Candidate portal on port 3012 for form completion, document upload, and correction resubmission.

## Core Architecture

- Frontend framework: Next.js app router in each portal.
- Backend style: API routes inside each portal under app/api.
- Database: MongoDB with shared logical database name cluso.
- Auth model: JWT cookies with portal-specific cookie names.
- Integrations: SMTP email for invites/corrections and PDF generation for final reports.

## Primary Business Flow

1. Admin seeds services and creates customer company access.
2. Customer or delegate creates verification order.
3. Candidate receives invite email and submits data.
4. Customer reviews submission and either approves or rejects/corrects.
5. Admin, manager, or verifier logs service-level verification outcomes.
6. After verification completion, admin or manager generates report and downloads PDF.

## Important Guards

- Role-scoped filtering prevents cross-company access.
- Customer rejection after approval is limited by a 10-minute window.
- Candidate response updates are blocked after approval/verification.
- Session invalidation uses sessionVersion in customer and delegate flows.
