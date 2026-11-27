const MAX_LEAVES = 16;
const MAX_LEAF_LENGTH = 256;

function concatBytes(...parts) {
  const size = parts.reduce((total, part) => total + part.length, 0);
  const result = new Uint8Array(size);
  let offset = 0;
  for (const part of parts) {
    result.set(part, offset);
    offset += part.length;
  }
  return result;
}

function toHex(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function fromHex(hex) {
  if (!/^[0-9a-f]{64}$/i.test(hex)) throw new Error("Expected a 32-byte hexadecimal hash.");
  return Uint8Array.from(hex.match(/.{2}/g), (byte) => Number.parseInt(byte, 16));
}

async function digest(bytes) {
  return new Uint8Array(await globalThis.crypto.subtle.digest("SHA-256", bytes));
}

async function hashLeaf(value) {
  const payload = new TextEncoder().encode(value);
  return toHex(await digest(concatBytes(new Uint8Array([0]), payload)));
}

async function hashParent(left, right) {
  return toHex(await digest(concatBytes(new Uint8Array([1]), fromHex(left), fromHex(right))));
}

/**
 * Build a small educational SHA-256 Merkle tree.
 * Odd unpaired nodes are promoted unchanged to the next level.
 * Leaf and parent hashes use distinct domain prefixes (0x00 and 0x01).
 */
export async function buildMerkleTree(leaves) {
  if (!Array.isArray(leaves) || leaves.length < 1 || leaves.length > MAX_LEAVES) {
    throw new Error(`Provide between 1 and ${MAX_LEAVES} leaves.`);
  }
  if (leaves.some((leaf) => typeof leaf !== "string" || leaf.length < 1 || leaf.length > MAX_LEAF_LENGTH)) {
    throw new Error(`Each leaf must contain between 1 and ${MAX_LEAF_LENGTH} characters.`);
  }

  const levels = [await Promise.all(leaves.map(hashLeaf))];
  while (levels.at(-1).length > 1) {
    const current = levels.at(-1);
    const next = [];
    for (let i = 0; i < current.length; i += 2) {
      if (i + 1 < current.length) next.push(await hashParent(current[i], current[i + 1]));
      else next.push(current[i]);
    }
    levels.push(next);
  }

  const proofs = leaves.map((_, leafIndex) => {
    const path = [];
    let index = leafIndex;
    for (let level = 0; level < levels.length - 1; level += 1) {
      const nodes = levels[level];
      if (index % 2 === 0 && index + 1 < nodes.length) {
        path.push({ side: "right", hash: nodes[index + 1] });
      } else if (index % 2 === 1) {
        path.push({ side: "left", hash: nodes[index - 1] });
      }
      index = Math.floor(index / 2);
    }
    return path;
  });

  return { levels, root: levels.at(-1)[0], proofs };
}

/** Verify membership for a leaf against a root using its Merkle path. */
export async function verifyMerkleProof(leaf, proof, expectedRoot) {
  try {
    if (typeof leaf !== "string" || leaf.length < 1 || leaf.length > MAX_LEAF_LENGTH) return false;
    let current = await hashLeaf(leaf);
    for (const step of proof) {
      if (!step || (step.side !== "left" && step.side !== "right")) return false;
      const sibling = fromHex(step.hash);
      const currentBytes = fromHex(current);
      current = toHex(await digest(step.side === "left"
        ? concatBytes(new Uint8Array([1]), sibling, currentBytes)
        : concatBytes(new Uint8Array([1]), currentBytes, sibling)));
    }
    return current.toLowerCase() === expectedRoot.toLowerCase();
  } catch {
    return false;
  }
}
