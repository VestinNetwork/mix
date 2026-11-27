# Deployment Guide

## Current release classification

MIX is currently a development preview. The repository does not yet contain a verified dependency lockfile, a successful production build record, a deployed production URL, or an audited cryptographic implementation. Do not describe the current revision as production-ready.

## Supported deployment target

The initial web frontend is designed for a managed Next.js hosting platform such as Vercel. A self-hosted container deployment can be added after the dependency lockfile and standalone build are validated.

## Required environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_APP_URL` | Yes for public release | Canonical HTTPS origin used by robots and sitemap |
| `NEXT_PUBLIC_CHAIN_ID` | Testnet integration only | Expected chain ID; must be validated at runtime |
| `NEXT_PUBLIC_CHAIN_NAME` | Testnet integration only | Human-readable network name |
| `NEXT_PUBLIC_RPC_URL` | Testnet integration only | Public Arbitrum Sepolia RPC endpoint |
| `NEXT_PUBLIC_EXPLORER_URL` | Testnet integration only | Arbitrum Sepolia explorer origin |

Only public configuration belongs in `NEXT_PUBLIC_*` variables. Never put private keys, seed phrases, API secrets, signing keys, or deployment credentials in public environment variables.

## Deployment sequence

1. Confirm the release commit and review all changed files.
2. Generate and commit the package manager lockfile using the supported Node/npm toolchain.
3. Run `npm ci`, `npm test`, `npm run lint`, `npm run typecheck`, and `npm run build` from a clean checkout.
4. Configure the production HTTPS domain and `NEXT_PUBLIC_APP_URL`.
5. Configure only public testnet network metadata. No production chain is enabled in this MVP.
6. Deploy a preview build and test dashboard navigation, Playground validation, mobile layout, error boundary, robots, and sitemap.
7. Inspect response headers and verify no secrets or private witness data are sent to the browser or server logs.
8. Promote to production only after all release gates below are satisfied.

## Release gates

- [ ] Reproducible lockfile committed; CI uses `npm ci`.
- [ ] Unit tests, lint, typecheck, and production build pass on a clean runner.
- [ ] Accessibility and cross-browser checks completed.
- [ ] Dependency audit and license review completed.
- [ ] Content Security Policy designed and tested. It is intentionally not enabled yet because the current UI uses inline styles and an external font stylesheet; do not copy a permissive policy without reviewing it.
- [ ] Domain, DNS, HTTPS, and security headers verified.
- [ ] Error monitoring configured without collecting private inputs, witnesses, keys, or secrets.
- [ ] Backup, rollback, incident response, and responsible disclosure procedures documented.
- [ ] Cryptographic code and any verifier contracts independently reviewed before being exposed as production security functionality.

## Operational notes

- The app currently has no backend database or user account system.
- The current Playground performs a local arithmetic check only.
- Do not store or transmit private witness values.
- Do not deploy financial, custody, transaction-routing, or asset-obfuscation features under this project scope.
- Testnet RPC endpoints may be rate-limited. Use an approved provider for repeatable integration testing and monitor availability.
- Roll back to the last known-good frontend release if a deployment breaks core navigation, metadata, or security headers.

## Why no live deployment is claimed

A deployment requires control of a hosting account and domain, plus the ability to inspect the resulting build and runtime. Repository changes alone cannot establish that a deployment succeeded. Those external credentials and deployment actions are not assumed.
