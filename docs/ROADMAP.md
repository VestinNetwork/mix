# MIX Roadmap

**Status:** Initial plan v0.2

## Milestone 0 — Product foundation
- [x] Confirm product positioning and MVP direction.
- [x] Identify repository and confirm it is empty.
- [x] Add initial product and architecture documentation.
- [ ] Add contribution and coding-agent instructions.
- [x] Select and record initial dependency versions.

**Exit criteria:** scope, boundaries, and implementation structure are agreed.

## Milestone 1 — Web foundation
- [x] Create Next.js App Router + TypeScript application scaffold.
- [x] Establish responsive layout and MIX visual design system.
- [x] Add dashboard navigation and module overview.
- [x] Add initial Arbitrum Sepolia network identity in the UI.
- [ ] Add typed runtime chain configuration and wallet integration.
- [ ] Add package lockfile and CI lint, typecheck, and build validation.
- [ ] Run and record a successful production build.

**Exit criteria:** clean install, lint, typecheck, and production build succeed.

## Milestone 2 — ZK learning engine
- [ ] Add one small, non-financial educational circuit.
- [ ] Pin compiler and proof-library versions.
- [ ] Add known-good test vectors.
- [ ] Add browser worker adapter.
- [ ] Generate and locally verify a proof.
- [ ] Handle invalid inputs and malformed proofs.
- [ ] Document setup and artifact provenance.

**Exit criteria:** reproducible local proof generation and verification with automated tests.

## Milestone 3 — Explorers
- [ ] Implement Proof Explorer with public-signal schema.
- [ ] Implement Merkle Explorer using synthetic sample data.
- [ ] Explain hash parameters and root construction.
- [ ] Add accessibility and responsive tests.

**Exit criteria:** users can inspect and understand each step of the educational example.

## Milestone 4 — Testnet verifier
- [ ] Implement a minimal verifier integration for the educational circuit.
- [ ] Add Foundry unit and fuzz tests.
- [ ] Review verifier key and public-signal ordering.
- [ ] Deploy only to Arbitrum Sepolia.
- [ ] Verify source code on the block explorer.
- [ ] Add contract address and deployment metadata to the repository.
- [ ] Add explicit testnet-only guardrails in the UI.

**Exit criteria:** a test proof is accepted and an invalid proof is rejected on Arbitrum Sepolia.

## Milestone 5 — Developer experience
- [ ] Publish typed SDK interfaces.
- [ ] Add integration example.
- [ ] Document errors and version compatibility.
- [ ] Add circuit registry metadata format.
- [ ] Add API/SDK tests and examples.

**Exit criteria:** an external sample app can integrate the documented verifier interface.

## Milestone 6 — Security and public testnet release
- [ ] Threat model review.
- [ ] Dependency and artifact provenance review.
- [ ] Static analysis and contract test review.
- [ ] Independent cryptographic review.
- [ ] Privacy and telemetry review.
- [ ] Publish known limitations and responsible disclosure process.

**Exit criteria:** all release gates are documented and blockers resolved.

## Release policy

- Testnet only during MVP.
- No user funds or asset custody.
- No mainnet deployment before independent review and a separate risk decision.
- No security or privacy guarantees beyond tested, documented behavior.
- No token required for product functionality.
