import test from "node:test";
import assert from "node:assert/strict";
import { buildMerkleTree, verifyMerkleProof } from "../lib/merkle.mjs";

test("builds a root and valid membership proofs for each leaf", async () => {
  const leaves = ["alpha", "beta", "gamma", "delta"];
  const tree = await buildMerkleTree(leaves);
  assert.match(tree.root, /^[0-9a-f]{64}$/);
  for (let i = 0; i < leaves.length; i += 1) {
    assert.equal(await verifyMerkleProof(leaves[i], tree.proofs[i], tree.root), true);
  }
});

test("promotes an unpaired node and still verifies its proof", async () => {
  const leaves = ["one", "two", "three"];
  const tree = await buildMerkleTree(leaves);
  assert.equal(await verifyMerkleProof("three", tree.proofs[2], tree.root), true);
});

test("rejects a changed leaf and a changed sibling hash", async () => {
  const tree = await buildMerkleTree(["red", "green", "blue"]);
  assert.equal(await verifyMerkleProof("not-blue", tree.proofs[2], tree.root), false);
  const tampered = tree.proofs[0].map((step) => ({ ...step, hash: "0".repeat(64) }));
  assert.equal(await verifyMerkleProof("red", tampered, tree.root), false);
});

test("rejects invalid tree sizes and leaf values", async () => {
  await assert.rejects(() => buildMerkleTree([]));
  await assert.rejects(() => buildMerkleTree(Array(17).fill("x")));
  await assert.rejects(() => buildMerkleTree([""]));
  await assert.rejects(() => buildMerkleTree(["x".repeat(257)]));
});

test("rejects malformed membership proof data", async () => {
  const tree = await buildMerkleTree(["a", "b"]);
  assert.equal(await verifyMerkleProof("a", [{ side: "up", hash: "bad" }], tree.root), false);
});

test("verifies every leaf for all supported tree sizes", async () => {
  for (let size = 1; size <= 16; size += 1) {
    const leaves = Array.from({ length: size }, (_, index) => `leaf-${size}-${index}`);
    const tree = await buildMerkleTree(leaves);
    for (let index = 0; index < size; index += 1) {
      assert.equal(
        await verifyMerkleProof(leaves[index], tree.proofs[index], tree.root),
        true,
        `failed for size ${size}, index ${index}`
      );
    }
  }
});
