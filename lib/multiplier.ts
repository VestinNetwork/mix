export type MultiplierResult =
  | { ok: true; valid: boolean; message: string; a: number; b: number; product: number }
  | { ok: false; valid: false; message: string };

const MAX_INPUT = 1_000_000;

/**
 * Validates the educational relation a * b = product.
 * This is an arithmetic preview, never a cryptographic proof.
 */
export function evaluateMultiplier(aRaw: string, bRaw: string, productRaw: string): MultiplierResult {
  const raw = [aRaw, bRaw, productRaw];
  if (raw.some((value) => !/^(0|[1-9][0-9]*)$/.test(value))) {
    return { ok: false, valid: false, message: "Use non-negative whole numbers without separators." };
  }

  const [a, b, product] = raw.map(Number);
  if ([a, b, product].some((value) => !Number.isSafeInteger(value) || value > MAX_INPUT)) {
    return { ok: false, valid: false, message: `Each value must be between 0 and ${MAX_INPUT.toLocaleString("en-US")}.` };
  }

  const valid = a * b === product;
  return {
    ok: true,
    valid,
    message: valid
      ? "The values satisfy the multiplication constraint."
      : "The values do not satisfy the multiplication constraint.",
    a,
    b,
    product
  };
}
