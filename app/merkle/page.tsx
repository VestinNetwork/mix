"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, CircleAlert, GitBranch, ShieldAlert } from "lucide-react";
import { buildMerkleTree, verifyMerkleProof, type MerkleTree } from "@/lib/merkle.mjs";

const initialLeaves = "MIX circuit v1\npublic signal: 21\neducational statement\nArbitrum Sepolia demo";

export default function MerkleExplorerPage() {
  const [rawLeaves, setRawLeaves] = useState(initialLeaves);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [tree, setTree] = useState<MerkleTree | null>(null);
  const [error, setError] = useState("");
  const [verified, setVerified] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(true);

  const leaves = useMemo(() => rawLeaves.split("\n").map((value) => value.trim()).filter(Boolean), [rawLeaves]);

  useEffect(() => {
    let cancelled = false;
    buildMerkleTree(leaves).then((nextTree) => {
      if (!cancelled) {
        setTree(nextTree);
        setBusy(false);
      }
    }).catch((reason: unknown) => {
      if (!cancelled) {
        setError(reason instanceof Error ? reason.message : "Unable to build this Merkle tree.");
        setBusy(false);
      }
    });
    return () => { cancelled = true; };
  }, [leaves]);

  useEffect(() => {
    let cancelled = false;
    if (!tree || !leaves[safeIndex]) return;
    verifyMerkleProof(leaves[safeIndex], tree.proofs[safeIndex], tree.root).then((result) => {
      if (!cancelled) setVerified(result);
    });
    return () => { cancelled = true; };
  }, [tree, safeIndex, leaves]);

  const panel: React.CSSProperties = { background: "#11182a", border: "1px solid #26314b", borderRadius: 14, padding: 20 };
  const mono: React.CSSProperties = { fontFamily: "ui-monospace, SFMono-Regular, monospace", overflowWrap: "anywhere" };
  const safeIndex = Math.min(selectedIndex, Math.max(leaves.length - 1, 0));
  const selectedProof = tree?.proofs[safeIndex] ?? [];

  return (
    <main style={{ minHeight: "100vh", background: "#080c18", color: "#eef1ff", padding: "26px 20px 60px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <Link href="/" style={{ color: "#aeb8d4", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14 }}><ArrowLeft size={16} /> Back to MIX</Link>
        <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#a78bfa", fontSize: 12, letterSpacing: 2, fontWeight: 700, marginTop: 38 }}><GitBranch size={17} /> MIX / HASH STRUCTURE LAB</div>
        <h1 style={{ fontSize: "clamp(34px, 6vw, 56px)", letterSpacing: -2, margin: "14px 0 10px" }}>Merkle Explorer</h1>
        <p style={{ color: "#aab3ca", lineHeight: 1.7, maxWidth: 720, margin: 0 }}>Build a small SHA-256 Merkle tree, inspect its root, and verify membership paths locally in your browser.</p>

        <div style={{ display: "flex", gap: 11, alignItems: "flex-start", padding: 15, marginTop: 22, border: "1px solid #72502a", borderRadius: 11, background: "#251d13", color: "#f5d6a4", lineHeight: 1.6, fontSize: 13 }}>
          <ShieldAlert size={19} style={{ flexShrink: 0, marginTop: 1 }} />
          <span><strong>Important distinction:</strong> Merkle membership verification is not a zero-knowledge proof. This explorer demonstrates hash-tree integrity only; it does not conceal the leaf or prove a private statement.</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 330px), 1fr))", gap: 16, marginTop: 20 }}>
          <section style={panel}>
            <div style={{ color: "#9ba8c8", fontSize: 11, letterSpacing: 1.5, fontWeight: 700 }}>01 / LEAF DATA</div>
            <h2 style={{ fontSize: 20, margin: "10px 0 8px" }}>Edit the tree leaves</h2>
            <p style={{ color: "#8995b0", fontSize: 12, lineHeight: 1.6 }}>One leaf per line. Inputs stay in this page and are not sent to a MIX backend.</p>
            <textarea aria-label="Merkle tree leaf values" value={rawLeaves} onChange={(event) => { setBusy(true); setError(""); setVerified(null); setRawLeaves(event.target.value); }} rows={8} spellCheck={false} style={{ width: "100%", resize: "vertical", background: "#0b1020", border: "1px solid #29334c", borderRadius: 10, color: "#e7eaff", padding: 13, font: "13px/1.8 ui-monospace, monospace", outline: "none" }} />
            <div style={{ color: "#8d9ab6", fontSize: 11, marginTop: 8 }}>Leaves: {leaves.length} / 16 · Maximum 256 characters per leaf</div>
            <label style={{ display: "block", color: "#cbd3e7", fontSize: 12, margin: "18px 0 7px" }}>Select a leaf to inspect</label>
            <select aria-label="Selected Merkle leaf" value={safeIndex} onChange={(event) => { setVerified(null); setSelectedIndex(Number(event.target.value)); }} style={{ width: "100%", background: "#0b1020", border: "1px solid #29334c", borderRadius: 9, color: "#eef1ff", padding: 12 }}>
              {leaves.map((leaf, index) => <option key={index} value={index}>{index + 1}. {leaf.slice(0, 48)}</option>)}
            </select>
          </section>

          <section style={panel}>
            <div style={{ color: "#9ba8c8", fontSize: 11, letterSpacing: 1.5, fontWeight: 700 }}>02 / TREE ROOT</div>
            <h2 style={{ fontSize: 20, margin: "10px 0 18px" }}>Computed root hash</h2>
            {busy && <p style={{ color: "#aab3ca" }}>Building tree…</p>}
            {error && <div role="alert" style={{ color: "#ffb1b1", background: "#2a1b20", padding: 12, borderRadius: 9 }}>{error}</div>}
            {tree && <div style={{ background: "#0b1020", border: "1px solid #29334c", borderRadius: 10, padding: 15 }}>
              <div style={{ color: "#8d9ab6", fontSize: 10, letterSpacing: 1.2, marginBottom: 9 }}>SHA-256 MERKLE ROOT</div>
              <div style={{ ...mono, color: "#b9adff", fontSize: 12, lineHeight: 1.8 }}>{tree.root}</div>
            </div>}
            {tree && <div style={{ marginTop: 18, display: "grid", gap: 12 }}>
              {tree.levels.map((level, levelIndex) => <div key={levelIndex}>
                <div style={{ color: "#9ba8c8", fontSize: 11, marginBottom: 7 }}>Level {levelIndex} · {level.length} {level.length === 1 ? "node" : "nodes"}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {level.map((hash, index) => <span key={index} title={hash} style={{ background: levelIndex === tree.levels.length - 1 ? "#292343" : "#1a2438", border: "1px solid #34415d", color: levelIndex === tree.levels.length - 1 ? "#c9beff" : "#b8c5df", borderRadius: 7, padding: "7px 9px", font: "10px ui-monospace, monospace" }}>{hash.slice(0, 10)}…</span>)}
                </div>
              </div>)}
            </div>}
          </section>
        </div>

        <section style={{ ...panel, marginTop: 16 }}>
          <div style={{ color: "#9ba8c8", fontSize: 11, letterSpacing: 1.5, fontWeight: 700 }}>03 / MEMBERSHIP PATH</div>
          <h2 style={{ fontSize: 20, margin: "10px 0 8px" }}>Verify the selected leaf</h2>
          {tree && <div style={{ color: "#cbd3e7", fontSize: 13, marginBottom: 14 }}>Selected leaf: <strong>{leaves[safeIndex]}</strong></div>}
          {verified === true && <div role="status" style={{ display: "flex", alignItems: "center", gap: 9, color: "#8ce0b6", background: "#10271f", borderRadius: 9, padding: 12 }}><CheckCircle2 size={18} /> Membership path verified against the displayed root.</div>}
          {verified === false && <div role="status" style={{ display: "flex", alignItems: "center", gap: 9, color: "#ffb1b1", background: "#2a1b20", borderRadius: 9, padding: 12 }}><CircleAlert size={18} /> Membership verification failed.</div>}
          {tree && selectedProof.length === 0 && <p style={{ color: "#aab3ca", fontSize: 12 }}>This tree contains a single leaf, so the membership path is empty and the leaf hash is the root.</p>}
          {selectedProof.map((step, index) => <div key={index} style={{ display: "grid", gridTemplateColumns: "82px 1fr", gap: 12, padding: "11px 0", borderBottom: "1px solid #25304a" }}>
            <span style={{ color: "#9ba8c8", fontSize: 11 }}>Sibling {index + 1} · {step.side}</span>
            <span style={{ ...mono, color: "#b8c5df", fontSize: 11 }}>{step.hash}</span>
          </div>)}
          <p style={{ color: "#7f8ca8", fontSize: 11, lineHeight: 1.7, marginBottom: 0 }}>Hash rules: leaf = SHA-256(0x00 || UTF-8(value)); parent = SHA-256(0x01 || left || right). An unpaired node is promoted unchanged to the next level. These rules are specific to this educational example.</p>
        </section>
        <footer style={{ color: "#65718e", fontSize: 11, marginTop: 24 }}>MIX · Local SHA-256 Merkle demonstration · Not a ZK proof</footer>
      </div>
    </main>
  );
}
