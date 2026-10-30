# QYBERNEX Security Principles & Standards

QYBERNEX is engineered with strict security defaults to protect infrastructure and maintain operational integrity.

---

## 1. Truthful Operations & No Synthetic Data Directive
- Unintegrated or planned security modules must never simulate or display fake threat alerts or synthesized attack streams.
- Modules in development are clearly labeled with their phase target (e.g. `Phase 2 Placeholder`) to prevent operator deception.

## 2. Least Privilege & Controlled AI Execution
- Autopilot AI agents and automation routines are restricted from possessing root operating-system privileges or unrestricted raw network sockets.
- All administrative API operations require authenticated authorization and audited role boundaries.

## 3. Secret Management & Non-Disclosure
- Credentials, API keys, and database passwords must never be committed to source control.
- Configuration parameters are loaded via environment variables or `.env` files protected by root `.gitignore`.

## 4. Secure API Defaults
- **CORS Restrictions**: API endpoints restrict origins exclusively to explicitly configured frontend domains.
- **Input Validation**: All requests pass through strict Pydantic model schemas.
- **Safe Error Handling**: Internal exception details and stack traces are suppressed in API responses to avoid information disclosure.

## 5. Quantum-Safe Cryptographic Integrity (PQC)
- Future evidence custody models will utilize Post-Quantum Cryptography compliant algorithms:
  - **ML-DSA (FIPS 204)** for quantum-resistant digital signatures on forensic evidence.
  - **ML-KEM (FIPS 203)** for quantum-safe key encapsulation.
