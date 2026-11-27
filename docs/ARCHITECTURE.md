# MIX Technical Architecture

**Status:** Proposed architecture v0.1

## 1. System overview

MIX is a web-first ZK developer workspace. The browser owns the interactive experience and, for the initial educational circuits, performs witness and proof operations locally. An EVM verifier contract on Arbitrum Sepolia provides a public demonstration of on-chain verification.

```text
┌───────────────────────────────────────────────────────────┐
│                    MIX Web Application                    │
│                                                           │
│  Dashboard  Playground  Proof Explorer  Merkle Explorer  │
│       │          │             │              │            │
│       └──────────┴─────────────┴──────────────┘            │
│                          │                                │
│                Typed application services                 │
│                          │                                │
│        ┌─────────────────┴──────────────────┐              │
│        │                                    │              │
│  Local ZK Worker                     EVM Client            │
│  Circom / snarkjs                    wagmi / viem          │
│        │                                    │              │
│  Witness + proof                    Arbitrum Sepolia       │
│  generation                         verifier contract      │
└───────────────────────────────────────────────────────────┘
```

## 2. Application layers

### Presentation
Next.js App Router, React, TypeScript, Tailwind CSS, and accessible UI components. Server Components are preferred for static content; Client Components are limited to interactive wallet, playground, and explorer features.

### Domain layer
Typed models and use cases:
- Circuit metadata.
- Proof metadata.
- Public signals.
- Verification request/result.
- Merkle tree and membership path.
- Network and deployment configuration.

Keep cryptographic operations out of presentation components.

### Cryptography adapter
A small adapter boundary isolates the UI from specific proof libraries. The first implementation may use Circom and snarkjs for a Groth16 educational example. Keep circuit version, compiler version, proving-key provenance, and verification-key identity explicit.

### Chain adapter
wagmi and viem provide wallet connection, chain detection, contract reads, and user-confirmed verification transactions. The app must reject unexpected chain IDs and must never silently switch to a production network.

### Smart contracts
A minimal verifier integration for deterministic educational statements. Contract code must be independently tested and reviewed. A successful verification means only that the verifier accepted the proof and public signals under the deployed verification key; it does not certify broader real-world claims.

## 3. Suggested repository structure

```text
mix/
├── apps/
│   └── web/
│       ├── app/
│       ├── components/
│       ├── features/
│       │   ├── dashboard/
│       │   ├── playground/
│       │   ├── proofs/
│       │   ├── merkle/
│       │   └── contracts/
│       ├── lib/
│       │   ├── chain/
│       │   ├── zk/
│       │   └── config/
│       └── public/
├── packages/
│   ├── zk-core/
│   ├── sdk/
│   └── config/
├── circuits/
│   └── examples/
├── contracts/
│   ├── src/
│   ├── test/
│   └── script/
├── docs/
├── .github/
│   └── workflows/
├── .env.example
├── .gitignore
└── README.md
```

This is a target structure, not a claim that these directories have already been implemented.

## 4. Initial proof lifecycle

1. User selects a documented example circuit.
2. UI explains which inputs are private and which are public.
3. Input validation runs locally.
4. A worker computes the witness and proof.
5. The UI displays proof metadata and public signals.
6. Local verification checks the proof against the matching verification key.
7. Optional testnet verification calls the configured verifier contract.
8. UI displays transaction state and links to the testnet explorer.

Private witness values should remain in memory and must not be sent to analytics, application servers, or logs. The user must be warned that browser extensions, compromised devices, and screenshots can still expose data.

## 5. Network configuration

Initial supported chain:
- Name: Arbitrum Sepolia
- Chain ID: 421614
- RPC: https://sepolia-rollup.arbitrum.io/rpc
- Explorer: https://sepolia.arbiscan.io
- Native currency: ETH testnet

Use a single typed chain configuration source. The chain ID must be checked at runtime before any write operation. Public RPC endpoints may rate-limit; production-grade reliability requires an explicitly configured provider and monitoring.

## 6. Data model (initial)

### CircuitDefinition
- id
- version
- title
- description
- proofSystem
- inputSchema
- publicSignalSchema
- verificationKeyDigest
- documentationUrl

### ProofRecord
- id (local identifier)
- circuitId
- circuitVersion
- publicSignals
- proofDigest (optional)
- generatedAt
- localVerificationResult
- onchainVerificationTx (optional)

Do not persist private witness values. Do not treat a proof digest as proof of provenance or as a privacy guarantee.

### Deployment
- chainId
- contractAddress
- contractName
- deploymentTx
- sourceVerificationUrl
- verifierKeyDigest
- releaseVersion

## 7. Trust boundaries

- Browser memory: private input and witness boundary.
- Build pipeline: circuit compiler and artifact provenance boundary.
- Wallet: transaction authorization boundary.
- RPC provider: availability and response integrity boundary.
- Verifier contract: proof acceptance boundary.
- Explorer: independent transaction/source inspection boundary.

Document which components are trusted and what a user can independently verify.

## 8. Performance strategy

- Run expensive proof generation in Web Workers.
- Load proving artifacts only when a circuit is selected.
- Display progress and cancellation where supported.
- Cache only public, versioned circuit artifacts.
- Avoid uploading witnesses or proofs by default.
- Benchmark on representative low-, mid-, and high-range devices.

## 9. Observability

Collect operational metrics without collecting private inputs:
- Circuit ID and version.
- Duration buckets.
- Success/failure category.
- Browser and app version.
- Chain ID and transaction hash for explicitly submitted testnet calls.

Never log seed phrases, private keys, raw witnesses, or user-entered secret values.
