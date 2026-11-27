"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  Boxes,
  Check,
  ChevronDown,
  CircleHelp,
  Code2,
  Command,
  Cpu,
  ExternalLink,
  FileCheck2,
  Fingerprint,
  FlaskConical,
  GitBranch,
  Globe2,
  LayoutDashboard,
  LockKeyhole,
  Menu,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  Wallet,
  X
} from "lucide-react";

type Section = "Overview" | "Playground" | "Proof explorer" | "Merkle explorer" | "Contracts" | "Documentation";

const navItems: { label: Section; icon: typeof LayoutDashboard; tag?: string }[] = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Playground", icon: FlaskConical, tag: "Soon" },
  { label: "Proof explorer", icon: FileCheck2, tag: "Soon" },
  { label: "Merkle explorer", icon: GitBranch, tag: "Soon" },
  { label: "Contracts", icon: Boxes, tag: "Soon" },
  { label: "Documentation", icon: BookOpen }
];

const modules = [
  {
    number: "01",
    title: "ZK Playground",
    description: "Experiment with circuits, inputs, constraints, and proof verification in a guided workspace.",
    icon: FlaskConical,
    status: "In development",
    tone: "violet"
  },
  {
    number: "02",
    title: "Proof Explorer",
    description: "Inspect proof metadata, public signals, circuit versions, and verification outcomes.",
    icon: FileCheck2,
    status: "Planned",
    tone: "blue"
  },
  {
    number: "03",
    title: "Merkle Explorer",
    description: "Explore tree structure, leaf nodes, root hashes, and membership concepts.",
    icon: GitBranch,
    status: "Planned",
    tone: "mint"
  },
  {
    number: "04",
    title: "Contract Explorer",
    description: "Review verifier deployments and transaction activity on the selected test network.",
    icon: Boxes,
    status: "Planned",
    tone: "amber"
  }
];

export default function Home() {
  const [active, setActive] = useState<Section>("Overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNetwork, setShowNetwork] = useState(false);
  const [query, setQuery] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  const filteredModules = useMemo(
    () => modules.filter((module) => `${module.title} ${module.description}`.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const selectSection = (section: Section) => {
    setActive(section);
    setMobileOpen(false);
    if (section === "Documentation") {
      document.getElementById("documentation")?.scrollIntoView({ behavior: "smooth" });
    } else if (section === "Overview") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById("modules")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="app-shell">
      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="brand-lockup">
          <div className="brand-mark"><span>M</span><i /></div>
          <div className="brand-name">MIX<span> / ZK INFRASTRUCTURE</span></div>
          <button className="icon-button mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={18} /></button>
        </div>

        <div className="workspace-label">WORKSPACE</div>
        <div className="workspace-card">
          <div className="workspace-avatar">M</div>
          <div className="workspace-copy"><strong>Personal workspace</strong><span>Free research environment</span></div>
          <ChevronDown size={15} className="muted-icon" />
        </div>

        <div className="nav-label">PLATFORM</div>
        <nav className="side-nav" aria-label="Main navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.label} className={`nav-item ${active === item.label ? "active" : ""}`} onClick={() => selectSection(item.label)}>
                <Icon size={17} strokeWidth={1.8} />
                <span>{item.label}</span>
                {item.tag && <small>{item.tag}</small>}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="network-mini"><span className="live-dot" /><div><b>Test environment</b><small>Arbitrum Sepolia</small></div><span className="network-mini-id">421614</span></div>
          <div className="sidebar-links">
            <a href="https://github.com/VestinNetwork/mix" target="_blank" rel="noreferrer"><Code2 size={15} /> GitHub <ExternalLink size={12} /></a>
            <button onClick={() => setShowInfo(true)}><CircleHelp size={15} /> About MIX</button>
          </div>
          <div className="sidebar-version">MIX WEB <span>v0.1.0 · FOUNDATION</span></div>
        </div>
      </aside>

      {mobileOpen && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}

      <section className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={19} /></button>
            <div className="breadcrumb"><span>Workspace</span><span className="crumb-slash">/</span><b>{active}</b></div>
          </div>
          <div className="topbar-actions">
            <div className="network-wrap">
              <button className="network-select" onClick={() => setShowNetwork(!showNetwork)} aria-expanded={showNetwork}>
                <span className="arb-mark">A</span><span>Arbitrum Sepolia</span><span className="testnet-pill">TESTNET</span><ChevronDown size={14} />
              </button>
              {showNetwork && <div className="network-popover"><div className="popover-title">ACTIVE NETWORK</div><div className="network-option"><span className="live-dot" /><div><b>Arbitrum Sepolia</b><small>Chain ID 421614 · Testnet</small></div><Check size={15} /></div><p>Production networks are not enabled in this MVP.</p></div>}
            </div>
            <button className="wallet-button" onClick={() => setShowInfo(true)}><Wallet size={16} /> <span>Wallet integration soon</span></button>
          </div>
        </header>

        <div className="content-wrap">
          <div className="hero-row">
            <div>
              <div className="eyebrow"><span className="eyebrow-line" /> ZERO-KNOWLEDGE DEVELOPER WORKSPACE</div>
              <h1>Build with <span>zero knowledge.</span></h1>
              <p className="hero-description">Explore cryptographic proofs, understand verification, and bring privacy-preserving computation into your applications.</p>
            </div>
            <div className="hero-art" aria-hidden="true">
              <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
              <div className="core-symbol"><Fingerprint size={39} strokeWidth={1.25} /></div>
              <span className="orbit-node node-a" /><span className="orbit-node node-b" /><span className="orbit-node node-c" />
              <span className="art-caption">PROOF SYSTEMS / 001</span>
            </div>
          </div>

          <div className="notice-bar">
            <div className="notice-icon"><ShieldCheck size={17} /></div>
            <div><b>Research environment</b><span>MIX is in early development. No assets are held and no production contracts are deployed.</span></div>
            <button onClick={() => setShowInfo(true)}>Read scope <ArrowUpRight size={14} /></button>
          </div>

          <div className="section-heading">
            <div><div className="section-kicker">YOUR WORKSPACE</div><h2>Platform overview</h2></div>
            <div className="updated-label"><span className="live-dot" /> Environment ready</div>
          </div>

          <div className="stats-grid">
            <div className="stat-card"><div className="stat-top"><span>NETWORK</span><Globe2 size={16} /></div><div className="stat-value stat-network">Arbitrum <span>Sepolia</span></div><div className="stat-foot"><span className="status-check"><Check size={11} /></span> Testnet configuration</div></div>
            <div className="stat-card"><div className="stat-top"><span>CHAIN ID</span><Network size={16} /></div><div className="stat-value mono">421614</div><div className="stat-foot">EVM-compatible network</div></div>
            <div className="stat-card"><div className="stat-top"><span>VERIFIER CONTRACTS</span><LockKeyhole size={16} /></div><div className="stat-value">— <small>not deployed</small></div><div className="stat-foot">Deployment planned for a later milestone</div></div>
            <div className="stat-card"><div className="stat-top"><span>PROOF SYSTEM</span><Cpu size={16} /></div><div className="stat-value">Groth16 <small>planned</small></div><div className="stat-foot">Initial learning path · subject to review</div></div>
          </div>

          <div className="section-heading modules-heading" id="modules">
            <div><div className="section-kicker">EXPLORE THE PLATFORM</div><h2>Core modules</h2><p className="section-subtitle">A unified toolkit for learning and integrating ZK technology.</p></div>
            <label className="search-box"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a module..." aria-label="Find a module" /><kbd>⌘ K</kbd></label>
          </div>

          <div className="modules-grid">
            {filteredModules.map((module) => {
              const Icon = module.icon;
              return <article className="module-card" key={module.number}>
                <div className="module-top"><div className={`module-icon ${module.tone}`}><Icon size={19} /></div><span className="module-number">{module.number}</span></div>
                <h3>{module.title}</h3><p>{module.description}</p>
                <div className="module-bottom"><span className="module-status"><i />{module.status}</span><ArrowUpRight size={16} className="module-arrow" /></div>
              </article>;
            })}
            {filteredModules.length === 0 && <div className="empty-state">No modules match “{query}”. Try another search.</div>}
          </div>

          <div className="lower-grid" id="documentation">
            <section className="quickstart-card">
              <div className="quickstart-visual"><div className="quickstart-orbit" /><div className="quickstart-icon"><Command size={27} /></div><span>START HERE</span></div>
              <div className="quickstart-content"><div className="section-kicker">DEVELOPER QUICKSTART</div><h2>Understand the proof lifecycle.</h2><p>Start with the fundamentals: private inputs, public signals, constraints, proof generation, and verification.</p><a href="https://docs.circom.io/" target="_blank" rel="noreferrer">Explore Circom documentation <ArrowUpRight size={14} /></a></div>
            </section>
            <section className="resources-card">
              <div className="section-kicker">PROJECT RESOURCES</div>
              <h3>Build on a clear foundation.</h3>
              <a href="https://github.com/VestinNetwork/mix" target="_blank" rel="noreferrer"><span className="resource-icon"><Code2 size={16} /></span><span><b>Source repository</b><small>Project code and roadmap</small></span><ExternalLink size={14} /></a>
              <a href="https://docs.arbitrum.io/chain-info" target="_blank" rel="noreferrer"><span className="resource-icon"><Globe2 size={16} /></span><span><b>Arbitrum network info</b><small>Official chain parameters</small></span><ExternalLink size={14} /></a>
              <a href="https://docs.iden3.io/circom-snarkjs/" target="_blank" rel="noreferrer"><span className="resource-icon"><Sparkles size={16} /></span><span><b>Circom & snarkjs</b><small>Proof-system learning path</small></span><ExternalLink size={14} /></a>
            </section>
          </div>

          <footer className="footer"><div className="footer-brand"><span className="brand-mark small"><span>M</span><i /></span><b>MIX</b><span>Zero-Knowledge Infrastructure</span></div><span>Independent research project · Testnet only</span><a href="https://github.com/VestinNetwork/mix" target="_blank" rel="noreferrer">GitHub <ExternalLink size={11} /></a></footer>
        </div>
      </section>

      {showInfo && <div className="modal-backdrop" role="presentation" onClick={() => setShowInfo(false)}><section className="info-modal" role="dialog" aria-modal="true" aria-labelledby="info-title" onClick={(event) => event.stopPropagation()}><button className="icon-button modal-close" onClick={() => setShowInfo(false)} aria-label="Close"><X size={18} /></button><div className="modal-symbol"><ShieldCheck size={23} /></div><div className="section-kicker">PROJECT STATUS</div><h2 id="info-title">MIX is a research workspace.</h2><p>The current interface is the initial web foundation. Proof generation, wallet connection, and verifier contracts are not implemented yet.</p><ul><li><Check size={14} /> Documentation foundation published</li><li><Check size={14} /> Arbitrum Sepolia configuration identified</li><li><Activity size={14} /> Cryptographic engine in planned milestones</li></ul><div className="modal-note">Educational demonstrations are not audited production cryptography. Never enter private keys, seed phrases, or sensitive personal data.</div><button className="primary-button modal-action" onClick={() => setShowInfo(false)}>Got it <ArrowDownRight size={15} /></button></section></div>}
    </main>
  );
}
