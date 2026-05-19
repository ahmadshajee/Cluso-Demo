# Data Model and Status Reference

## User Entity

Key responsibilities:

- Stores auth identity for admin, manager, verifier, customer, delegate, delegate_user, and candidate.
- Carries hierarchy links through parentCustomer, manager, and createdByDelegate.
- Stores selectedServices snapshot for customer company accounts.
- Stores partnerProfile for customer company settings.
- Uses sessionVersion and isActive to enforce token invalidation and account deactivation.

## Service Entity

Key responsibilities:

- Defines available verification services.
- Supports package services through isPackage and includedServiceIds.
- Stores per-service formFields with fieldType, required, repeatable, and text constraints.
- Stores defaultPrice and defaultCurrency.

## VerificationRequest Entity

Key responsibilities:

- Tracks request ownership and actor chain (customer, createdBy, candidateUser).
- Stores selectedServices snapshot used for workflow and invoice generation.
- Stores candidateFormResponses and customerRejectedFields for correction loops.
- Stores serviceVerifications and attempts audit trail for each selected service.
- Stores reportMetadata, reportData, and invoiceSnapshot after report generation.

## Status Fields

Request status values:

- pending
- approved
- rejected
- verified

Candidate form status values:

- pending
- submitted

Service verification status values:

- pending
- verified
- unverified

## Typical Transition Sequence

1. Request created: status pending and candidateFormStatus pending.
2. Candidate submits: candidateFormStatus submitted and status pending.
3. Enterprise approves: status approved and enterpriseApprovedAt set.
4. Verifier attempts logged per service.
5. All selected services resolved: status verified.

Alternative loops:

- Enterprise rejects whole request: status rejected.
- Enterprise rejects selected candidate fields: status rejected and candidateFormStatus pending.
- Candidate resubmits corrected data: candidateFormStatus submitted and status pending.
- Customer updates rejected request and reissues: status pending and form reset.

## Time Window Rule

After enterprise approval, rejection is allowed only during a 10-minute window. After the window expires, enterpriseDecisionLockedAt is set.
