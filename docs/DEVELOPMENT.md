# MIX Development Guide

**Status:** Initial guide v0.2

## 1. Prerequisites

For the web application:
- Node.js 20.9 or newer (use an active LTS release).
- npm 10 or newer.
- Git.

For later cryptography and contract milestones:
- Foundry.
- Circom 2.
- snarkjs.

The current frontend dependencies are pinned in `package.json`. Commit a package lockfile before treating installs as reproducible.

## 2. Clone and run the web shell

```bash
git clone https://github.com/VestinNetwork/mix.git
cd mix
npm install
npm run dev
```

Open http://localhost:3000.

Available checks:
```bash
npm run lint
npm run typecheck
npm run build
```

The dashboard is currently a UI scaffold. It does not yet generate cryptographic proofs, connect a wallet, or call a verifier contract.

## 3. Arbitrum Sepolia

| Setting | Value |
| --- | --- |
| Network | Arbitrum Sepolia |
| Chain ID | 421614 |
| RPC URL | https://sepolia-rollup.arbitrum.io/rpc |
| Explorer | https://sepolia.arbiscan.io |
| Currency | ETH (testnet) |

The official Arbitrum chain information page is the source of truth for network parameters and RPC availability: https://docs.arbitrum.io/chain-info

Public RPC services may impose rate limits and availability constraints. For repeatable integration testing, configure a dedicated provider through a local environment variable as appropriate.

## 4. Environment variables

Copy `.env.example` to `.env.local` when local configuration is needed. Never commit a populated local environment file.

Only public configuration may be exposed to the browser. Never prefix secrets with `NEXT_PUBLIC_`. Never place private keys, seed phrases, or deployer credentials in frontend environment variables.

## 5. Development workflow

1. Read the relevant product, architecture, and security documents.
2. Create a focused branch for each feature.
3. State assumptions and security implications before changing cryptographic or contract code.
4. Add or update tests with implementation.
5. Run lint, typecheck, tests, and a production build.
6. Review the diff for secrets, generated artifacts, and unrelated changes.
7. Open a pull request with scope, test evidence, and limitations.

## 6. Contract workflow

Use local Foundry tests first. Deploy only to Arbitrum Sepolia after tests pass and the deployment script has been reviewed. Record the chain ID, contract address, deployment transaction, compiler version, and source-verification result.

Do not put deployer private keys in source files, shell history, CI logs, or repository secrets unless a reviewed protected workflow explicitly requires one. Prefer a hardware wallet or secure signer for any future production deployment.

## 7. References

- Arbitrum chain information: https://docs.arbitrum.io/chain-info
- Arbitrum bridge quickstart: https://developer.arbitrum.io/arbitrum-bridge/quickstart
- Next.js App Router: https://nextjs.org/docs/app
- Circom documentation: https://docs.circom.io/
- snarkjs: https://github.com/iden3/snarkjs
- Foundry Book: https://book.getfoundry.sh/

## 8. Current implementation status

Implemented: initial responsive dashboard shell, navigation state, module search, project-status modal, network identity display, product documentation, and environment template.

Not implemented: real wallet connection, proof generation, local proof verification, Merkle computations, contract explorer data, verifier contracts, automated CI, and a committed package lockfile.

No production or testnet contract is currently deployed.
