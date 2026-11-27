# MIX Security and Privacy Baseline

**Status:** Baseline v0.1  
**Applies to:** Web application, circuits, build artifacts, SDK, and testnet contracts

## 1. Security posture

MIX is experimental software. Educational circuits and testnet contracts are not audited production systems. The UI and documentation must say so clearly.

## 2. MVP safety boundaries

- No custody of assets.
- No deposit, withdrawal, pooled-balance, or financial-relayer functionality.
- No handling of production funds.
- No mainnet deployment in the MVP.
- No collection of private witnesses by a backend.
- No claim that a proof makes a user, transaction, or activity anonymous.

## 3. Private input handling

- Keep private inputs and witnesses in browser memory where possible.
- Do not transmit private inputs to MIX servers.
- Do not include private inputs in analytics, error reports, logs, URLs, or browser storage.
- Clear transient state when the user resets or leaves the playground.
- Explain that local processing does not protect against a compromised device, malicious extension, screen capture, or browser debugging tools.

## 4. Circuit and proof integrity

- Pin compiler and proof-library versions.
- Version every circuit and its public-signal schema.
- Record verification-key digests and artifact provenance.
- Maintain test vectors for valid, invalid, and boundary cases.
- Review constraints for under-constrained witnesses.
- Ensure the verifier key matches the circuit build.
- Never describe a proof as stronger than the statement encoded by its circuit.

## 5. Smart contract security

- Keep contracts minimal and non-upgradeable for the first demonstration unless a clear requirement justifies otherwise.
- Use explicit access control only where required.
- Test malformed inputs, invalid proofs, unexpected public signals, and boundary conditions.
- Use Foundry unit, fuzz, and invariant tests where appropriate.
- Run static analysis and independent review before any production consideration.
- Publish source and deployment metadata.
- Treat testnet ETH and test deployments as experimental.

## 6. Wallet and network safety

- Check chain ID before contract writes.
- Display chain name and contract address before user confirmation.
- Do not request seed phrases or private keys.
- Use wallet-provider signing; never ask users to paste secrets into the app.
- Keep testnet and production configuration separate.
- Do not silently fall back to a different chain or RPC.

## 7. Dependencies and supply chain

- Pin direct dependencies and commit the lockfile.
- Review package licenses and maintenance status.
- Minimize dependencies in cryptographic code paths.
- Use reproducible build steps where feasible.
- Protect CI workflows with least-privilege permissions.
- Never expose secrets in build logs or client-side environment variables.

## 8. Data and telemetry

Allowed operational metadata may include circuit version, duration bucket, failure category, app version, and explicitly submitted testnet transaction hash.

Do not collect raw witness data, secret inputs, wallet seed phrases, or private keys. Make telemetry opt-in where practical and document retention.

## 9. Incident handling

Provide a security contact before public release. Document a responsible disclosure process, severity triage, affected versions, remediation, and user notification policy.

## 10. Release blockers

A release is blocked if:
- Private inputs are transmitted or logged unexpectedly.
- Circuit constraints are not reviewed.
- Circuit and verification key versions mismatch.
- Invalid proofs pass verification tests.
- The UI misrepresents testnet as mainnet or vice versa.
- Deployment addresses or source verification status are unconfirmed.
- Critical or high-severity security findings remain unresolved.
