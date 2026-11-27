import test from "node:test";
import assert from "node:assert/strict";
import { evaluateMultiplier } from "../lib/multiplier.ts";

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
