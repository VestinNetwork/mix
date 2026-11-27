"use client";

import Link from "next/link";
import { useState } from "react";
import { evaluateMultiplier } from "@/lib/multiplier";
import { ArrowLeft, CheckCircle2, CircleAlert, Code2, FlaskConical, ShieldAlert } from "lucide-react";

const circuitSource = `template Multiplier2() {
    signal input a;
    signal input b;
    signal input product;

    a * b === product;
}

component main {public [product]} = Multiplier2();`;

export default function PlaygroundPage() {
  const [a, setA] = useState("3");
  const [b, setB] = useState("7");
  const [product, setProduct] = useState("21");

  const result = evaluateMultiplier(a, b, product);

  const fieldStyle = {
    width: "100%",
    background: "#0b1020",
    border: "1px solid #29334c",
    borderRadius: 10,
    color: "#f4f6ff",
    padding: "13px 14px",
    fontSize: 16,
    outline: "none"
  } as const;

  return (
    <main style={{ minHeight: "100vh", background: "#080c18", color: "#eef1ff", padding: "28px 22px 64px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Link href="/" style={{ color: "#aeb8d4", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14 }}>
          <ArrowLeft size={16} /> Back to MIX
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 42, color: "#a78bfa", fontSize: 12, letterSpacing: 2, fontWeight: 700 }}>
          <FlaskConical size={17} /> MIX / LEARNING ENVIRONMENT
        </div>
        <h1 style={{ fontSize: "clamp(34px, 6vw, 58px)", letterSpacing: -2, margin: "16px 0 12px" }}>ZK Playground</h1>
        <p style={{ maxWidth: 680, color: "#aab3ca", lineHeight: 1.7, fontSize: 16, margin: 0 }}>
          Explore how a circuit constrains private inputs and a public output. Change the values below and inspect the constraint result.
        </p>

        <div style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "#251d13", border: "1px solid #72502a", borderRadius: 12, padding: 16, marginTop: 28, color: "#f5d6a4", lineHeight: 1.6 }}>
          <ShieldAlert size={19} style={{ flexShrink: 0, marginTop: 2 }} />
          <div><strong style={{ display: "block", marginBottom: 3 }}>Important: this is not a cryptographic proof</strong>
            This page performs a local arithmetic check only. It does not generate a witness, create a ZK proof, verify a proof, or provide a privacy guarantee.
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 330px), 1fr))", gap: 20, marginTop: 24 }}>
          <section style={{ background: "#11182a", border: "1px solid #26314b", borderRadius: 16, padding: 22 }}>
            <div style={{ color: "#9ba8c8", fontSize: 11, letterSpacing: 1.5, fontWeight: 700 }}>01 / INPUT VALUES</div>
            <h2 style={{ fontSize: 21, margin: "12px 0 22px" }}>Try the constraint</h2>
            <label style={{ display: "block", color: "#cbd3e7", fontSize: 13, marginBottom: 7 }}>Private input · a</label>
            <input aria-label="Private input a" inputMode="numeric" value={a} onChange={(event) => setA(event.target.value)} style={fieldStyle} />
            <label style={{ display: "block", color: "#cbd3e7", fontSize: 13, margin: "18px 0 7px" }}>Private input · b</label>
            <input aria-label="Private input b" inputMode="numeric" value={b} onChange={(event) => setB(event.target.value)} style={fieldStyle} />
            <label style={{ display: "block", color: "#cbd3e7", fontSize: 13, margin: "18px 0 7px" }}>Public signal · product</label>
            <input aria-label="Public signal product" inputMode="numeric" value={product} onChange={(event) => setProduct(event.target.value)} style={fieldStyle} />
            <div style={{ marginTop: 20, background: "#0b1020", borderRadius: 10, padding: 14, color: "#dbe2f4", fontFamily: "monospace", fontSize: 14 }}>
              {a || "a"} × {b || "b"} = {product || "product"}
            </div>
            <div aria-live="polite" style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 16, borderRadius: 10, padding: 13, background: result.ok && result.valid ? "#10271f" : "#2a1b20", color: result.ready && result.valid ? "#8ce0b6" : "#ffb1b1" }}>
              {result.ok && result.valid ? <CheckCircle2 size={18} /> : <CircleAlert size={18} />}
              <span style={{ fontSize: 13, lineHeight: 1.5 }}>{result.message}</span>
            </div>
          </section>

          <section style={{ background: "#11182a", border: "1px solid #26314b", borderRadius: 16, padding: 22 }}>
            <div style={{ color: "#9ba8c8", fontSize: 11, letterSpacing: 1.5, fontWeight: 700 }}>02 / CIRCUIT LOGIC</div>
            <h2 style={{ fontSize: 21, margin: "12px 0 18px" }}>One multiplication constraint</h2>
            <div style={{ background: "#080d19", border: "1px solid #25304a", borderRadius: 12, padding: 18, overflowX: "auto" }}>
              <div style={{ color: "#7e8bab", fontSize: 11, marginBottom: 14 }}>Multiplier2.circom</div>
              <pre style={{ margin: 0, color: "#c6d5ff", fontSize: 13, lineHeight: 1.9, whiteSpace: "pre-wrap" }}>{circuitSource}</pre>
            </div>
            <div style={{ marginTop: 22, display: "grid", gap: 12 }}>
              <div style={{ borderLeft: "2px solid #8b75ef", paddingLeft: 13 }}>
                <strong style={{ fontSize: 13 }}>Private inputs</strong>
                <p style={{ margin: "5px 0 0", color: "#9ba8c8", fontSize: 13, lineHeight: 1.6 }}>The values a and b are used by the circuit but are not declared as public signals.</p>
              </div>
              <div style={{ borderLeft: "2px solid #54c6a0", paddingLeft: 13 }}>
                <strong style={{ fontSize: 13 }}>Public signal</strong>
                <p style={{ margin: "5px 0 0", color: "#9ba8c8", fontSize: 13, lineHeight: 1.6 }}>The product is explicitly listed in the main component's public signal declaration.</p>
              </div>
              <div style={{ borderLeft: "2px solid #e4b76d", paddingLeft: 13 }}>
                <strong style={{ fontSize: 13 }}>Constraint</strong>
                <p style={{ margin: "5px 0 0", color: "#9ba8c8", fontSize: 13, lineHeight: 1.6 }}>The circuit requires a multiplied by b to equal product.</p>
              </div>
            </div>
          </section>
        </div>

        <section style={{ marginTop: 20, padding: 22, border: "1px solid #26314b", borderRadius: 16, background: "#0d1424" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#a78bfa" }}><Code2 size={18} /><strong style={{ color: "#e7eaff", fontSize: 15 }}>Next step: compile the circuit locally</strong></div>
          <p style={{ color: "#aab3ca", fontSize: 13, lineHeight: 1.7 }}>The source circuit and compile instructions are in the repository. Proof generation will be added only after the proving-system setup, dependency versions, test vectors, and artifact provenance are documented.</p>
          <Link href="https://github.com/VestinNetwork/mix/tree/main/circuits/multiplier2" target="_blank" style={{ color: "#b6a7ff", textDecoration: "none", fontSize: 13 }}>View circuit source on GitHub ↗</Link>
        </section>

        <footer style={{ marginTop: 30, color: "#65718e", fontSize: 12 }}>MIX · Educational circuit preview · No cryptographic proof generated</footer>
      </div>
    </main>
  );
}
