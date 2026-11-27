# MIX

**Zero-Knowledge Infrastructure**

MIX is a global, developer-oriented platform for learning, experimenting with, and integrating zero-knowledge proofs. The first release is a web application with a ZK Playground, proof verification, Merkle explorer, and developer documentation.

> **Current stage:** Product foundation / pre-MVP  
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

## Proposed stack

- Next.js App Router + React + TypeScript
- Tailwind CSS + shadcn/ui
- wagmi + viem for wallet and EVM integration
- Solidity + Foundry for verifier contracts and tests
- Circom + snarkjs for the initial Groth16 learning path
- Vitest for frontend/unit tests

Versions will be pinned when the application scaffold is created.

## Repository map

```text
.
├── README.md
├── docs/
│   ├── PRODUCT_SPEC.md
│   ├── ARCHITECTURE.md
│   ├── ROADMAP.md
│   ├── SECURITY.md
│   └── DEVELOPMENT.md
└── (application and contracts will be added in subsequent milestones)
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

The repository currently contains the product and engineering foundation. No production contract has been deployed, no user funds are accepted, and no mainnet release is planned.

See [Product Specification](docs/PRODUCT_SPEC.md), [Architecture](docs/ARCHITECTURE.md), [Roadmap](docs/ROADMAP.md), [Security](docs/SECURITY.md), and [Development Guide](docs/DEVELOPMENT.md).

## License

License selection is pending. Do not assume that third-party code, circuits, ceremony artifacts, or assets are covered by a future MIX license. Review each dependency's license before reuse.
