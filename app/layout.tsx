import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MIX — Zero-Knowledge Infrastructure",
  description:
    "A developer workspace for exploring, generating, and verifying zero-knowledge proofs.",
  applicationName: "MIX"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
