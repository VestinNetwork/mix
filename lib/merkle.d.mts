export type MerkleProofStep = { side: "left" | "right"; hash: string };
export type MerkleTree = { levels: string[][]; root: string; proofs: MerkleProofStep[][] };

/** Build a SHA-256 educational Merkle tree with domain-separated leaf/parent hashes. */
export function buildMerkleTree(leaves: string[]): Promise<MerkleTree>;
/** Verify a leaf membership path against a root hash. */
export function verifyMerkleProof(leaf: string, proof: MerkleProofStep[], expectedRoot: string): Promise<boolean>;
