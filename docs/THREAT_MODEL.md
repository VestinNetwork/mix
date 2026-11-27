# Initial Threat Model

**Status:** Preliminary; requires review before production.

## Assets to protect

- Private circuit inputs and witness values held in browser memory.
- User wallet credentials and transaction approvals, if wallet support is added later.
- Circuit source, compiler versions, proving artifacts, and verification keys.
- Integrity of public signals and proof-verification results.
- Deployment configuration and release artifacts.

## Trust boundaries

1. Browser and browser extensions.
2. Static hosting/CDN and build pipeline.
3. Package registry and dependency supply chain.
4. RPC provider and block explorer.
5. User wallet, if connected in a future release.
6. Circom compiler, witness calculator, proving library, and setup artifacts.

## Threats and controls

| Threat | Initial control | Remaining work |
| --- | --- | --- |
| Secret input accidentally logged | No analytics or backend submission in current Playground | Automated log/network inspection |
| Misleading proof status | UI explicitly labels arithmetic-only preview | Add typed proof states and UI tests |
| Dependency compromise | Exact direct dependency versions | Lockfile, audit policy, provenance checks |
| Unexpected chain | No write operations currently exist | Runtime chain-ID guard before wallet writes |
| Malicious proof artifact | No proof import or verification path yet | Strict schema validation and malformed artifact tests |
| XSS or clickjacking | Framework escaping and baseline response headers | CSP design, penetration testing |
| Supply-chain artifact substitution | Source circuit committed | Reproducible compilation and artifact digests |
| User device compromise | Warn users not to enter sensitive data | Document browser and extension risks |

## Security invariants

- Private witness values must never be logged, transmitted to application servers, or placed in URLs.
- Public signals must be distinguished from private witness inputs.
- A local arithmetic check must never be presented as proof verification.
- Verification keys must be versioned with circuit and public-signal schemas.
- Testnet must be explicit; no silent mainnet fallback.
- No secret key material is stored by MIX.

## Scope exclusions

This platform is not a custody service, mixer, financial transaction relay, or asset-concealment system. This threat model does not evaluate those systems.

## Review status

No independent security audit or cryptographic review has been completed. This document is a starting point, not a certification.
