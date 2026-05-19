# Environment and External Dependencies

## Core Environment Variables

- MONGODB_URI: required for database connection.
- JWT_SECRET: required for signing and verifying auth tokens.
- NODE_ENV: affects secure cookie behavior.

## Admin Setup

- ADMIN_SETUP_KEY: required to call setup endpoint.

## Candidate Email Delivery

- SMTP_HOST
- SMTP_PORT
- SMTP_USER
- SMTP_PASS
- SMTP_SECURE
- VERIFICATION_MAIL_FROM
- CANDIDATE_PORTAL_URL

## Integration Behaviors

- Email sending is best effort for invite and correction flows; order creation still persists even if email delivery fails.
- Candidate uploads are validated for MIME type and size before persistence.
- Final report generation uses PDF engine and stored report payloads in VerificationRequest.

## Auth and Session Notes

- Portal cookies are scoped by app using separate token names.
- Customer side auth validates sessionVersion from database to invalidate stale tokens.
- Deactivation and role switches increment sessionVersion for forced re-login.
