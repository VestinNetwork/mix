# AGENTS.md

## Project intent

MIX is a global Zero-Knowledge Infrastructure research and developer platform. The MVP is a web application for learning and experimenting with non-financial ZK examples, inspecting proofs, exploring Merkle structures, and verifying educational statements on Arbitrum Sepolia.

Read these files before substantial changes:
- `README.md`
- `docs/PRODUCT_SPEC.md`
- `docs/ARCHITECTURE.md`
- `docs/SECURITY.md`
- `docs/ROADMAP.md`

## Engineering rules

1. Think before coding. State assumptions and surface ambiguity rather than guessing.
2. Prefer small, reviewable changes with a clear purpose.
3. Do not claim code is tested, secure, audited, deployed, or production-ready unless there is evidence.
4. Add tests with behavior changes. Run lint, typecheck, tests, and build when the environment permits.
5. Keep dependencies minimal and pin versions. Review licenses before adopting third-party code or artifacts.
6. Never commit secrets, private keys, seed phrases, local environment files, or user data.
7. Keep cryptographic operations in isolated, typed modules rather than UI components.
8. Version circuits, public-signal schemas, and verification keys together.
9. Never log or transmit private witness values. Avoid persistence of sensitive inputs.
10. Explicitly check chain IDs and label testnet deployments. Do not silently target mainnet.
11. Do not create tokenomics, custody, pooled-asset, deposit/withdrawal, or financial-relayer functionality as part of this MVP.
12. Update documentation when architecture, behavior, commands, or security assumptions change.

## UI rules

- Maintain responsive layouts and keyboard accessibility.
- Use clear loading, empty, error, and success states.
- Distinguish demo data from live chain data.
- Do not present mock behavior as real cryptographic verification.
- Keep wallet connection and transaction actions explicit and user-confirmed.

## Completion report

When finishing a task, report:
- What changed.
- Files changed.
- Tests actually run and their results.
- Known limitations or follow-up work.
