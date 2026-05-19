# ClusoCRM Workflow and Dataflow Diagram

## System Dataflow

```mermaid
flowchart LR
  %% Actors
  A1[Superadmin or Admin]
  A2[Customer or Delegate]
  A3[Candidate]
  A4[Manager or Verifier]

  %% Frontends
  subgraph Frontends
    F1[Admin Portal :3010]
    F2[Customer Portal :3011]
    F3[Candidate Portal :3012]
  end

  %% API Layers
  subgraph APIs
    P1[Admin API routes]
    P2[Customer API routes]
    P3[Candidate API routes]
  end

  %% Shared Data + Integrations
  subgraph Data_and_Integrations
    D1[(MongoDB User collection)]
    D2[(MongoDB Service collection)]
    D3[(MongoDB VerificationRequest collection)]
    I1[SMTP Mailer]
    I2[PDF Report Engine]
  end

  %% Access
  A1 --> F1
  A2 --> F2
  A3 --> F3
  A4 --> F1

  %% Frontend to API
  F1 --> P1
  F2 --> P2
  F3 --> P3

  %% Setup and master data
  P1 -- setup superadmin + seed services --> D1
  P1 -- setup service catalog --> D2
  P1 -- create companies and assign services --> D1
  P1 -- manage managers/verifiers and company assignment --> D1
  P1 -- service CRUD and package definitions --> D2

  %% Order creation and candidate onboarding
  P2 -- create order with selected service IDs --> D3
  P2 -- ensure or create candidate user --> D1
  P2 -- resolve package services to concrete services --> D2
  P2 -- send invite with candidate portal URL and temp password --> I1

  %% Candidate form flow
  P3 -- list candidate-owned requests --> D3
  P3 -- load service form definitions --> D2
  P3 -- submit candidateFormResponses --> D3

  %% Enterprise decision flow
  P2 -- approve request sets status approved and starts 10 min reject window --> D3
  P2 -- reject request sets status rejected and note --> D3
  P2 -- reject selected candidate fields and reopen form --> D3
  P2 -- send correction email --> I1

  %% Admin verification flow
  P1 -- list role-scoped requests --> D3
  P1 -- verify per service and append attempts --> D3
  P1 -- resolve verifier manager and assignee metadata --> D1

  %% Reporting
  P1 -- generate report metadata and invoice snapshot when status verified --> D3
  P1 -- build downloadable PDF --> I2

  %% Status legend
  S1[Request status: pending -> approved -> verified]
  S2[Alternative path: pending or approved -> rejected]
  S3[Form status: pending -> submitted -> pending if corrections requested]

  D3 -. stores .-> S1
  D3 -. stores .-> S2
  D3 -. stores .-> S3
```

## Request Lifecycle Stateflow

```mermaid
stateDiagram-v2
  [*] --> PendingForm: Order created by customer or delegate
  PendingForm --> SubmittedForReview: Candidate submits form
  SubmittedForReview --> PendingForm: Customer rejects selected fields
  SubmittedForReview --> Approved: Enterprise approves
  SubmittedForReview --> Rejected: Enterprise rejects before verify
  Approved --> Rejected: Enterprise rejects within 10 minute window
  Approved --> LockedApproved: Rejection window expires
  LockedApproved --> InVerification: Admin or verifier logs service attempts
  Approved --> InVerification: Admin or verifier logs service attempts
  InVerification --> InVerification: Service attempts continue
  InVerification --> Verified: All selected services resolved
  Rejected --> PendingForm: Customer edits and re-issues request

  note right of PendingForm
    status = pending or rejected
    candidateFormStatus = pending
  end note

  note right of SubmittedForReview
    candidateFormStatus = submitted
    status = pending
  end note

  note right of Approved
    status = approved
    enterpriseApprovedAt set
  end note

  note right of Verified
    status = verified
    report generation enabled
  end note
```

## Role-Based Swimlane Workflow

```mermaid
flowchart TB
  %% Swimlane: Admin
  subgraph L1[Admin or Superadmin]
    A1[Run initial setup]
    A2[Create enterprise account]
    A3[Assign managers and verifiers]
    A4[Monitor enterprise-approved requests]
    A5[Verify each service with attempts]
    A6[Generate and download verification report]
  end

  %% Swimlane: Customer
  subgraph L2[Customer or Delegate]
    C1[Create order with selected services]
    C2[Review candidate submission]
    C3[Approve for admin verification]
    C4[Reject request or reject specific fields]
    C5[Update rejected request and re-issue]
  end

  %% Swimlane: Candidate
  subgraph L3[Candidate]
    U1[Receive invitation email]
    U2[Login to candidate portal]
    U3[Open assigned request forms]
    U4[Submit responses and uploads]
    U5[Correct and resubmit if asked]
  end

  %% Swimlane: Manager or Verifier
  subgraph L4[Manager or Verifier]
    V1[Open scoped request queue]
    V2[Log verification outcome per service]
  end

  %% Swimlane: System Data and Integrations
  subgraph L5[System Data and Integrations]
    D1[(User)]
    D2[(Service)]
    D3[(VerificationRequest)]
    E1[SMTP Mail]
    P1[PDF Engine]
  end

  A1 --> D1
  A1 --> D2
  A2 --> D1
  A3 --> D1
  C1 --> D2
  C1 --> D3
  C1 --> E1
  E1 --> U1
  U1 --> U2 --> U3 --> U4
  U4 --> D3
  U4 --> C2

  C2 --> C3
  C2 --> C4
  C3 --> D3
  C3 --> A4

  C4 --> D3
  C4 --> E1
  E1 --> U5
  U5 --> U4
  C5 --> D3

  A4 --> V1
  V1 --> V2
  V2 --> D3
  A5 --> D3

  D3 --> A6
  A6 --> P1
  A6 --> D3
```

## Source-of-truth paths used

- cluso-new-suite/cluso-admin/app/api/requests/route.ts
- cluso-new-suite/cluso-admin/app/api/requests/[requestId]/report/route.ts
- cluso-new-suite/cluso-admin/app/api/customers/route.ts
- cluso-new-suite/cluso-admin/app/api/verifiers/route.ts
- cluso-new-suite/cluso-admin/app/api/services/route.ts
- cluso-new-suite/cluso-admin/app/api/setup/route.ts
- cluso-new-suite/cluso-customer/app/api/orders/route.ts
- cluso-new-suite/cluso-customer/app/api/delegates/route.ts
- cluso-new-suite/cluso-customer/app/api/settings/profile/route.ts
- cluso-new-suite/cluso-candidates/app/api/requests/route.ts
- cluso-new-suite/cluso-admin/lib/models/VerificationRequest.ts
- cluso-new-suite/cluso-customer/lib/models/User.ts
- cluso-new-suite/cluso-admin/lib/models/Service.ts
