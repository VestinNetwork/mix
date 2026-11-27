# MIX Product Specification

**Status:** Draft v0.1  
**Product:** MIX — Zero-Knowledge Infrastructure  
**Audience:** Global developers, researchers, students, and technical users

## 1. Vision

Make zero-knowledge technology easier to understand, test, verify, and integrate by providing one coherent web-based developer workspace.

MIX begins as a research and learning product. The long-term direction is developer infrastructure: reusable SDKs, documented verification interfaces, circuit examples, and reliable tooling.

## 2. Problem

ZK development is fragmented across circuit languages, proof-generation tools, smart contracts, command-line workflows, and chain explorers. New developers often struggle to understand how private inputs, public signals, proofs, and on-chain verification relate.

MIX brings those concepts together with transparent, inspectable examples.

## 3. Users

- Web3 and smart-contract developers learning ZK.
- Researchers experimenting with proof systems.
- Educators demonstrating cryptographic concepts.
- Product teams evaluating ZK integration patterns.

## 4. Product principles

1. **Understandability:** explain each cryptographic concept and its assumptions.
2. **Verifiability:** show what is checked, where it is checked, and what the result means.
3. **Privacy by design:** minimize collection of user inputs; prefer local proof generation for demos.
4. **No custody:** the MVP never takes custody of user assets.
5. **Explicit scope:** educational examples must not be presented as audited production cryptography.
6. **Network clarity:** visibly distinguish local development, testnet, and any future production network.
7. **Independent implementation:** MIX has its own architecture, code, brand, and user experience.

## 5. MVP scope

### 5.1 Dashboard
- Display selected network and connection status.
- Show available demo circuits and verifier deployment status.
- Show locally generated demo history where feasible.
- Clearly label sample data versus live chain data.

### 5.2 ZK Playground
- Provide guided, non-financial example circuits.
- Explain private inputs, public inputs, constraints, proof generation, and verification.
- Generate proofs locally in the browser or a controlled worker.
- Show generation time and proof metadata without uploading private witness data.
- Include reset and sample-input controls.

Initial example candidates:
- Arithmetic statement / constraint satisfaction.
- Range predicate demonstration.
- Merkle membership demonstration using synthetic data.

### 5.3 Proof Explorer
- Inspect proof format, circuit identifier, public signals, and verification outcome.
- Validate proof structure before submitting verification.
- Explain that public signals are public by design.
- Do not claim that a proof establishes facts outside its defined circuit.

### 5.4 Merkle Explorer
- Create a small synthetic tree from user-provided demo values.
- Visualize leaf-to-root hashing.
- Show a membership path and local verification result.
- Use documented hash parameters and test vectors.

### 5.5 Contract Explorer
- Display the configured verifier address, chain ID, deployment transaction, and source-verification status.
- Read contract metadata and submit only supported proof-verification calls.
- Link transactions to Arbiscan Sepolia.
- Never show a deployment as verified until the explorer confirms it.

### 5.6 Developer Docs
- Explain proof-system lifecycle and trust assumptions.
- Document circuit interfaces and public-signal ordering.
- Document verifier contract ABI and integration examples.
- Include local setup, tests, and deployment checklists.

## 6. Out of scope for MVP

- Token launch, tokenomics, points farming, or financial incentives.
- Mainnet deployment or handling real user assets.
- Custodial wallets, deposits, withdrawals, pooled assets, or financial relaying.
- A service marketed as making fund flows untraceable.
- Claims of anonymity, censorship resistance, or audited security without evidence.
- User identity databases or collection of private witness values on a backend.

## 7. Success criteria

- A new developer can complete the guided example without external setup beyond the documented prerequisites.
- A valid demo proof verifies locally and against the test verifier.
- Invalid or malformed proofs are rejected with understandable errors.
- Public signals and circuit version are displayed consistently.
- Tests cover positive, negative, boundary, and malformed-input cases.
- The UI identifies the active network and contract address unambiguously.
- No secrets or private witness inputs are written to application logs.

## 8. Product metrics

Measure learning and reliability rather than financial volume:
- Playground completion rate.
- Successful versus failed verification rate.
- Median local proof-generation time by device class.
- Documentation task completion.
- SDK integration test pass rate.
- Frontend and contract error rates.

Do not use transaction value, pooled balance, or concealment volume as product success metrics.

## 9. UX direction

Visual identity: technical, calm, precise, and accessible. Use a dark-first interface with restrained accent color, clear typography, strong contrast, and diagrams that explain cryptographic flows. Avoid visual language that implies guaranteed anonymity or financial concealment.

Primary navigation:
- Overview
- Playground
- Proofs
- Merkle
- Contracts
- Docs
- Settings

## 10. Release definition

The MVP is ready for public testnet evaluation only when the security checklist is complete, test contracts are clearly labeled, test coverage is documented, and all user-facing claims accurately describe the implementation and limitations.
