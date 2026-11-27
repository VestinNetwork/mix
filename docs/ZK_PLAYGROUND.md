# ZK Playground — implementation notes

## First exercise: multiplication constraint

The first exercise uses `circuits/multiplier2/Multiplier2.circom`.

The relation is:

```text
a * b = product
```

The values `a` and `b` are private inputs to the circuit. `product` is declared public. Circom enforces the relation as a constraint; the circuit source alone does not generate a proof.

## UI behavior in the first iteration

The web Playground may let a learner change the three values and inspect whether the arithmetic relation is satisfied. The UI must call this a **constraint preview** or **local arithmetic check**, not proof generation, proof verification, privacy, or zero-knowledge guarantee.

## Cryptographic implementation gates

Before enabling proof generation:

1. Pin Circom, snarkjs, Node.js, and all transitive dependencies through a committed lockfile.
2. Choose and document the proving system and setup assumptions.
3. Define artifact provenance, checksums, and version metadata.
4. Add positive and negative witness test vectors.
5. Run witness generation and proof verification in an isolated worker.
6. Keep private witness values out of logs, analytics, URLs, and network requests.
7. Test malformed inputs and malformed proof artifacts.
8. Review the circuit and verification path independently.

## Non-goals

The first Playground is not a mixer, transaction relay, asset custody system, or financial privacy product. It does not accept deposits, construct withdrawals, conceal asset flows, or route third-party transactions.
