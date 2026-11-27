# Merkle Explorer

## Purpose

The Merkle Explorer is a local educational tool for inspecting SHA-256 Merkle trees and membership paths. It is not a zero-knowledge proof system and does not hide the selected leaf.

## Hash construction

This implementation uses explicit domain separation:

- Leaf: `SHA-256(0x00 || UTF-8(leafValue))`
- Parent: `SHA-256(0x01 || leftHash || rightHash)`

The hashes are 32-byte SHA-256 digests. Parent hashes concatenate the 32-byte left digest and 32-byte right digest after the parent prefix.

## Odd node rule

If a level has an unpaired final node, that node is promoted unchanged to the next level. It is not duplicated or rehashed. This is a deliberate choice for this teaching implementation; other Merkle formats use different rules and are not interchangeable.

## Limits

- 1–16 leaves.
- Each leaf is 1–256 JavaScript characters.
- Hashing runs locally through the Web Crypto API.
- The app does not transmit leaf values to a MIX backend.
- The selected membership path is checked locally against the displayed root.

## Security and compatibility

This tree format is specific to MIX's educational example. Do not assume compatibility with Ethereum storage tries, OpenZeppelin Merkle trees, Bitcoin Merkle trees, or any other protocol. Any future on-chain or cross-system integration must specify byte encoding, hash function, domain separation, ordering, odd-node handling, and test vectors exactly.

A valid Merkle membership path proves only that a leaf is included under a root according to this tree construction. It does not prove that the leaf is secret, true, authorized, or private.
