# MIX Roadmap

**Status:** Initial plan v0.2

## Milestone 0 — Product foundation
- [x] Confirm product positioning and MVP direction.
- [x] Identify repository and confirm it is empty.
- [x] Add initial product and architecture documentation.
- [x] Add contribution and coding-agent instructions.
- [x] Select and record initial dependency versions.

**Exit criteria:** scope, boundaries, and implementation structure are agreed.

## Milestone 1 — Web foundation
- [x] Create Next.js App Router + TypeScript application scaffold.
- [x] Establish responsive layout and MIX visual design system.
- [x] Add dashboard navigation and module overview.
- [x] Add initial Arbitrum Sepolia network identity in the UI.
- [ ] Add typed runtime chain configuration and wallet integration.
- [ ] Add package lockfile; CI workflow configured, but hosted runner has not started.
- [ ] Run and record a successful production build on a functioning runner.

**Exit criteria:** clean install, lint, typecheck, and production build succeed.

## Milestone 2 — ZK learning engine

Current partial implementation: an interactive arithmetic-only Playground, a shared input validator, twelve passing unit tests in an isolated Node 22.16 test run, and a Circom source example. No Circom compilation, witness generation, cryptographic proof generation, or proof verification has been run.
- [x] Add one small, non-financial educational circuit (Multiplier2 example).
- [ ] Pin compiler/proof-library versions and commit reproducible dependency lockfile.
- [x] Add committed known-good valid/invalid test vectors and Node unit tests.
- [ ] Add browser worker adapter.
- [ ] Generate and locally verify a proof (not implemented; current Playground is arithmetic-only).
- [ ] Handle invalid inputs and malformed proofs.
- [ ] Document setup and artifact provenance.

**Exit criteria:** reproducible local proof generation and verification with automated tests.

## Milestone 3 — Explorers

Current partial implementation: Merkle Explorer builds a domain-separated SHA-256 tree (leaf prefix `0x00`, parent prefix `0x01`), promotes odd nodes unchanged, and verifies local membership paths. This is not a ZK proof or an interoperable external Merkle standard.
- [ ] Implement Proof Explorer with public-signal schema.
- [x] Implement local Merkle Explorer using synthetic sample data and SHA-256 membership paths.
- [x] Explain hash parameters and root construction in the Merkle Explorer guide.
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
