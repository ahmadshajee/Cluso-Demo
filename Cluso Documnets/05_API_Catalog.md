# API Catalog

## Admin Portal APIs

- POST /api/setup: initialize superadmin and seed default services.
- GET /api/admins: list admin, superadmin, and manager users.
- POST /api/admins: create admin, superadmin, or manager user.
- POST /api/auth/login: admin login.
- POST /api/auth/logout: admin logout.
- GET /api/auth/me: current admin identity.
- POST /api/auth/change-password: admin password update.
- GET /api/customers: list customer companies with stats and profile snapshot.
- POST /api/customers: create customer company login and selected services.
- PATCH /api/customers: update company selected services.
- GET /api/verifiers: list verifiers, managers, and company mappings.
- POST /api/verifiers: create verifier user.
- PATCH /api/verifiers: update verifier or manager company access.
- PUT /api/verifiers: assign or clear manager for selected verifiers.
- GET /api/services: list services and form definitions.
- POST /api/services: create service or package service.
- PATCH /api/services: update service form fields.
- DELETE /api/services: delete service by id.
- GET /api/requests: list role-scoped verification requests.
- PATCH /api/requests: log verify-service action and update request status.
- POST /api/requests/[requestId]/report: generate report metadata and invoice snapshot.
- GET /api/requests/[requestId]/report: download generated PDF report.

## Customer Portal APIs

- POST /api/auth/login: customer, delegate, or delegate_user login.
- POST /api/auth/logout: customer side logout.
- GET /api/auth/me: current customer side identity and available services.
- POST /api/auth/change-password: customer side password update.
- GET /api/orders: list company-scoped requests with decision window metadata.
- POST /api/orders: create new verification request and trigger candidate invite email.
- PATCH /api/orders: enterprise approve/reject, reject selected fields, or update rejected request.
- GET /api/delegates: list team members for company.
- POST /api/delegates: create delegate or delegate_user.
- PATCH /api/delegates: switch role or deactivate team member.
- GET /api/settings/profile: read partner profile.
- PATCH /api/settings/profile: update partner profile.

## Candidate Portal APIs

- POST /api/auth/login: candidate login.
- POST /api/auth/logout: candidate logout.
- GET /api/auth/me: current candidate identity.
- POST /api/auth/change-password: candidate password update.
- GET /api/requests: list candidate-owned verification requests and service forms.
- PATCH /api/requests: submit candidate responses and file payloads.
