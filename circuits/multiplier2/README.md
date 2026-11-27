# Multiplier2 educational circuit

This is MIX's first small, non-financial Circom example. It demonstrates the distinction between private inputs and a public signal.

- Private inputs: `a`, `b`
- Public input: `product`
- Constraint: `a * b === product`

This circuit is a teaching example, not a production protocol. It does not represent identity, ownership, balances, payments, or transaction privacy. A valid witness only shows that the supplied values satisfy this arithmetic relation.

## Requirements

- Node.js 20 or later
- Circom 2.1.6
- snarkjs 0.7.5

Install the compiler using the official Circom installation guide. Install snarkjs locally in your development environment; do not use unpinned global packages for reproducible work.

## Compile

From the repository root:

```bash
circom circuits/multiplier2/Multiplier2.circom --r1cs --wasm --sym -o circuits/multiplier2/build
```

Create the output directory first:

```bash
mkdir -p circuits/multiplier2/build
```

The compile step produces an R1CS constraint system, a WASM witness calculator, and a symbol map. These are build artifacts and should not be committed unless a reviewed artifact policy explicitly requires them.

## Scope and limitations

This example intentionally stops before trusted setup and proof generation. A later milestone must select and document a reproducible ceremony process, pin the exact toolchain, validate artifact provenance, add known-good vectors, and test both valid and invalid witnesses before a proof flow is exposed in the web app.

Never interpret a successful arithmetic check in the web UI as a cryptographic proof. Never reuse this example for financial or sensitive production data.
