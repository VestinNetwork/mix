# MIX Development Guide

**Status:** Initial guide v0.1

## 1. Prerequisites

Install supported, current releases of:
- Node.js LTS
- pnpm
- Git
- Foundry (for Solidity contract work)
- Circom and snarkjs (when implementing the circuit milestone)

Exact versions will be pinned in the application package and toolchain configuration during Milestone 1.

## 2. Clone the repository

```bash
git clone https://github.com/VestinNetwork/mix.git
cd mix
```

The repository is currently at the documentation foundation stage. Application commands will be added when the web scaffold is committed.

## 3. Arbitrum Sepolia

| Setting | Value |
| --- | --- |
| Network | Arbitrum Sepolia |
| Chain ID | 421614 |
| RPC URL | https://sepolia-rollup.arbitrum.io/rpc |
| Explorer | https://sepolia.arbiscan.io |
| Currency | ETH (testnet) |

The official Arbitrum chain information page is the source of truth for network parameters and RPC availability: https://docs.arbitrum.io/chain-info

Public RPC services may impose rate limits and availability constraints. For repeatable integration testing, configure a dedicated provider through a server-side or local environment variable as appropriate.

## 4. Environment variables

A future application scaffold will provide an `.env.example`. Never commit a populated local `.env` file.

Only public configuration may be exposed to the browser. Never prefix secrets with `NEXT_PUBLIC_`.

## 5. Development workflow

1. Read the relevant product and architecture documents.
2. Create a focused branch for each feature.
3. Add or update tests with implementation.
4. Run formatting, lint, typecheck, and tests.
5. Run a production build.
6. Review the diff for secrets, generated artifacts, and unrelated changes.
7. Open a pull request with scope, test evidence, and limitations.

## 6. Contract workflow

Use local Foundry tests first. Deploy only to Arbitrum Sepolia after tests pass and the deployment script has been reviewed. Record the chain ID, contract address, deployment transaction, compiler version, and source-verification result.

Do not put deployer private keys in source files, shell history, CI logs, or repository secrets unless the workflow explicitly requires a protected secret and has been reviewed. Prefer a hardware wallet or secure signer for any future production deployment.

## 7. References

- Arbitrum chain information: https://docs.arbitrum.io/chain-info
- Arbitrum bridge quickstart: https://developer.arbitrum.io/arbitrum-bridge/quickstart
- Next.js App Router: https://nextjs.org/docs/app
- Circom documentation: https://docs.circom.io/
- snarkjs: https://github.com/iden3/snarkjs
- Foundry Book: https://book.getfoundry.sh/

## 8. Current implementation status

This guide describes the intended workflow. The web application, circuits, contracts, and CI pipeline have not yet been implemented in this documentation-only milestone.
