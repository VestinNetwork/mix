import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, background: "#090b10", color: "#eef1f8", fontFamily: "Arial, sans-serif" }}>
      <section style={{ maxWidth: 480, textAlign: "center" }}>
        <p style={{ color: "#a99aff", fontSize: 12, letterSpacing: 2 }}>MIX / 404</p>
        <h1 style={{ fontSize: 48, margin: "12px 0" }}>Page not found</h1>
        <p style={{ color: "#9ba8c8", lineHeight: 1.7 }}>The requested page does not exist or may have moved.</p>
        <Link href="/" style={{ display: "inline-block", marginTop: 14, color: "#c2b6ff" }}>Return to dashboard →</Link>
      </section>
    </main>
  );
}
