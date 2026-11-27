# Engineering Quality Gates

## Local commands

```bash
npm install
npm test
npm run lint
npm run typecheck
npm run build
```

Use `npm ci` after the repository commits a lockfile. Until then, installs are not fully reproducible.

## Current automated coverage

The Node test suite checks:
- Valid multiplication constraints.
- Invalid multiplication constraints.
- Zero-valued operands.
- Negative, decimal, formatted, and empty input rejection.
- Maximum preview input bounds.
- The committed valid and invalid circuit test vectors.

These tests validate the shared JavaScript input-checking module, which exposes TypeScript declarations for the web application. They do not compile Circom, generate a witness, generate a cryptographic proof, or verify a proof.

## CI gates

GitHub Actions is configured to run tests, ESLint, TypeScript checking, and the Next.js production build. Previous workflow attempts ended before a runner was assigned (the job had no runner ID and no steps), so those failures do not establish a source-code failure or a successful build. Re-run the workflow on a functioning GitHub Actions runner and retain the result before release.

## Required next gates

1. Commit a generated npm lockfile and move CI to `npm ci`.
2. Confirm the app build on a clean Node 22 environment.
3. Compile the Circom example with the pinned compiler.
4. Execute witness-generation tests with valid and invalid inputs.
5. Generate and locally verify a proof only after setup artifacts and their provenance are documented.
6. Add worker isolation and cancellation tests.
7. Add browser tests for keyboard navigation, responsive layouts, and error states.
8. Add contract unit/fuzz tests before any verifier deployment.
9. Complete independent security and cryptographic review before production claims.
