# MIX

**Zero-Knowledge Infrastructure**

MIX is a global, developer-oriented platform for learning, experimenting with, and integrating zero-knowledge proofs. The first release is a web application with a ZK Playground, proof verification, Merkle explorer, and developer documentation.

> **Current stage:** Web foundation / pre-MVP  
> **Initial network:** Arbitrum Sepolia (chain ID 421614)  
> **Mainnet:** Not in scope for the MVP

## Product direction

MIX aims to make zero-knowledge technology understandable and usable through a coherent developer experience:

- Explore proof-system concepts and circuit examples.
- Generate and verify educational proofs.
- Inspect public signals and verification results.
- Visualize Merkle trees and membership proofs.
- Interact with a clearly identified testnet verifier contract.
- Reuse documented, reviewed developer interfaces.

MIX is an independent project. It is not affiliated with Tornado Cash and is not a deposit, withdrawal, mixing, or asset-obfuscation service.

## MVP modules

| Module | Purpose |
| --- | --- |
| Dashboard | Project status, network state, and recent demo verifications |
| ZK Playground | Guided, non-financial circuit experiments |
| Proof Explorer | Inspect proof metadata and public signals |
| Merkle Explorer | Visualize leaves, roots, and membership verification |
| Contract Explorer | Inspect MIX testnet verifier deployments |
| Developer Docs | Concepts, API contracts, setup, and examples |

## Technology

| Layer | Choice |
| --- | --- |
| Web framework | Next.js App Router 16.4.6 |
| UI runtime | React 19.2.3 + TypeScript 5.9.3 |
| Styling | Custom responsive CSS design system |
| Icons | lucide-react |
| Wallet / EVM | wagmi + viem (planned integration) |
| Smart contracts | Solidity + Foundry (planned) |
| ZK circuits | Circom + snarkjs (planned initial learning path) |

Direct dependency versions are pinned in `package.json`. A generated npm lockfile is still required before installs are reproducible; CI currently uses `npm install` until that lockfile is committed.

## Repository map

```text
.
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── docs/
│   ├── PRODUCT_SPEC.md
│   ├── ARCHITECTURE.md
│   ├── ROADMAP.md
│   ├── SECURITY.md
│   └── DEVELOPMENT.md
├── .env.example
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Network configuration

| Parameter | Value |
| --- | --- |
| Network | Arbitrum Sepolia |
| Chain ID | 421614 |
| RPC | https://sepolia-rollup.arbitrum.io/rpc |
| Explorer | https://sepolia.arbiscan.io |
| Native currency | ETH (testnet) |

Do not commit private keys, seed phrases, API secrets, or production credentials. Use environment variables and local-only wallet configuration.

## Development status

The repository now contains a responsive dashboard, an arithmetic-only ZK Playground preview, a shared input validator, a Circom teaching circuit, committed test vectors, six Node unit tests, error/not-found boundaries, baseline HTTP security headers, and deployment/quality/threat-model documentation. The arithmetic preview is not a cryptographic proof. Circom compilation, witness generation, proof generation/verification, wallet integration, verifier contracts, and deployment are not yet complete. GitHub Actions is configured, but recent runs failed before a hosted runner was assigned; a successful full build has not been verified. No production contract has been deployed, no user funds are accepted, and no mainnet release is planned.

See [Product Specification](docs/PRODUCT_SPEC.md), [Architecture](docs/ARCHITECTURE.md), [Roadmap](docs/ROADMAP.md), [Security](docs/SECURITY.md), [Development Guide](docs/DEVELOPMENT.md), [Deployment Guide](docs/DEPLOYMENT.md), [Quality Gates](docs/QUALITY_GATES.md), and [Threat Model](docs/THREAT_MODEL.md).

## License

License selection is pending. Do not assume that third-party code, circuits, ceremony artifacts, or assets are covered by a future MIX license. Review each dependency's license before reuse.
