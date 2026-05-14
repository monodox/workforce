# Security Policy

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

We take security seriously at Workforce. If you discover a security vulnerability, please report it responsibly.

### How to Report

1. **Do NOT** open a public GitHub issue for security vulnerabilities.
2. Email us at **security@workforce.app** with:
   - A description of the vulnerability
   - Steps to reproduce the issue
   - Potential impact assessment
   - Any suggested fixes (optional)

### What to Expect

- **Acknowledgment:** We will acknowledge your report within 48 hours.
- **Assessment:** We will investigate and provide an initial assessment within 5 business days.
- **Resolution:** Critical vulnerabilities will be patched within 7 days. Non-critical issues will be addressed in the next scheduled release.
- **Disclosure:** We will coordinate with you on public disclosure timing.

### Scope

The following are in scope:
- Authentication and authorization flaws
- Data exposure or leakage
- Cross-site scripting (XSS)
- Cross-site request forgery (CSRF)
- SQL injection or other injection attacks
- Server-side request forgery (SSRF)
- Privilege escalation

### Out of Scope

- Denial of service attacks
- Social engineering
- Physical security
- Issues in third-party dependencies (report to the respective maintainers)

## Security Best Practices

- All data is encrypted at rest (AES-256) and in transit (TLS 1.3)
- We follow OWASP Top 10 guidelines
- Regular dependency audits via `npm audit`
- Environment variables for all secrets (never committed to source)
- GDPR and CCPA compliant data handling

## Contact

For security concerns: **security@workforce.app**
