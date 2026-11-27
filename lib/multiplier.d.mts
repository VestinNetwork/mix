export type MultiplierResult =
  | { ok: true; valid: boolean; message: string; a: number; b: number; product: number }
  | { ok: false; valid: false; message: string };

/** Validate the educational relation a * b = product. This is not a cryptographic proof. */
export function evaluateMultiplier(aRaw: string, bRaw: string, productRaw: string): MultiplierResult;
