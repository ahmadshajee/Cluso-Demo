# Request Lifecycle Stateflow

```mermaid
stateDiagram-v2
  [*] --> PendingForm: Order created by customer or delegate
  PendingForm --> SubmittedForReview: Candidate submits form
  SubmittedForReview --> PendingForm: Customer rejects selected fields
  SubmittedForReview --> Approved: Enterprise approves
  SubmittedForReview --> Rejected: Enterprise rejects before verification
  Approved --> Rejected: Enterprise rejects within 10-minute window
  Approved --> LockedApproved: Rejection window expires
  LockedApproved --> InVerification: Admin or verifier logs attempts
  Approved --> InVerification: Admin or verifier logs attempts
  InVerification --> InVerification: More service attempts
  InVerification --> Verified: All services resolved
  Rejected --> PendingForm: Customer edits and re-issues request

  note right of PendingForm
    status = pending or rejected
    candidateFormStatus = pending
  end note

  note right of SubmittedForReview
    status = pending
    candidateFormStatus = submitted
  end note

  note right of Approved
    status = approved
    enterpriseApprovedAt is set
  end note

  note right of Verified
    status = verified
    report generation enabled
  end note
```

## Practical Reading

- Candidate correction loops move the request back to pending form state.
- Enterprise rejection after approval is time-bound.
- Service-level attempts are tracked until all selected services are verified or unverified.
