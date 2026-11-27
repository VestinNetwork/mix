"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Deliberately do not send error details or user input to third-party telemetry.
    console.error("MIX application boundary:", error.name, error.digest ?? "no-digest");
  }, [error]);

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, background: "#090b10", color: "#eef1f8", fontFamily: "Arial, sans-serif" }}>
      <section style={{ maxWidth: 520, border: "1px solid #30394a", borderRadius: 14, padding: 28, background: "#111620" }}>
        <p style={{ color: "#a99aff", fontSize: 12, letterSpacing: 2 }}>MIX / APPLICATION ERROR</p>
        <h1 style={{ fontSize: 28 }}>This page could not be loaded.</h1>
        <p style={{ color: "#9ba8c8", lineHeight: 1.7 }}>The application encountered an unexpected error. No private circuit inputs are intentionally included in this error report.</p>
        <button onClick={() => reset()} style={{ border: 0, borderRadius: 8, padding: "11px 16px", background: "#8c78ef", color: "white", cursor: "pointer" }}>Try again</button>
      </section>
    </main>
  );
}
