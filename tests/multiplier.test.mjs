import { readFile } from "node:fs/promises";
import test from "node:test";
import assert from "node:assert/strict";
import { evaluateMultiplier } from "../lib/multiplier.mjs";

test("accepts a valid multiplication relation", () => {
  const result = evaluateMultiplier("3", "7", "21");
  assert.equal(result.ok, true);
  assert.equal(result.valid, true);
});

test("rejects an invalid multiplication relation", () => {
  const result = evaluateMultiplier("3", "7", "20");
  assert.equal(result.ok, true);
  assert.equal(result.valid, false);
});

test("accepts zero as a valid operand", () => {
  assert.equal(evaluateMultiplier("0", "42", "0").valid, true);
});

test("rejects negative values, decimals, and formatted strings", () => {
  for (const value of ["-1", "1.5", "1,000", " 2", ""]) {
    assert.equal(evaluateMultiplier(value, "2", "4").ok, false);
  }
});

test("rejects values outside the documented preview range", () => {
  assert.equal(evaluateMultiplier("1000001", "1", "1000001").ok, false);
});

test("matches the committed educational circuit test vectors", async () => {
  const vectors = JSON.parse(await readFile(new URL("../circuits/multiplier2/test-vectors.json", import.meta.url), "utf8"));
  for (const vector of vectors.valid) {
    const result = evaluateMultiplier(vector.a, vector.b, vector.product);
    assert.equal(result.ok && result.valid, true, JSON.stringify(vector));
  }
  for (const vector of vectors.invalid) {
    const result = evaluateMultiplier(vector.a, vector.b, vector.product);
    assert.equal(result.ok && result.valid, false, JSON.stringify(vector));
  }
});
