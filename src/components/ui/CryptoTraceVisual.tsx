'use client';

import { useState } from 'react';
import { 
  Wallet, 
  ArrowRight, 
  AlertTriangle, 
  Layers, 
  Building2, 
  FileCheck2, 
  ShieldCheck, 
  ExternalLink,
  Lock,
  CheckCircle2,
  HelpCircle,
  Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TraceNode {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  icon: any;
  statusTag: string;
  statusColor: string;
  evidencePreserved: string;
  investigatorAction: string;
  technicalNote: string;
}

const TRACE_NODES: TraceNode[] = [
  {
    id: 'origin',
    step: '01',
    title: "Your Wallet / Exchange",
    subtitle: "The point of initial transfer",
    icon: Wallet,
    statusTag: "Confirmed Ledger Record",
    statusColor: "text-primary bg-primary/10 border-primary/25",
    evidencePreserved: "Transaction Hash (TxID), sending timestamp, exact coin amount, and your public wallet address.",
    investigatorAction: "We verify the initial transaction on public ledger explorers (Etherscan, Blockchain.com, Solscan) to confirm the exact block timestamp and sender metadata.",
    technicalNote: "Every outbound transfer is cryptographically signed and permanently recorded. It cannot be altered or erased by the scammer."
  },
  {
    id: 'receiving',
    step: '02',
    title: "Scammer Deposit Wallet",
    subtitle: "The recipient address",
    icon: AlertTriangle,
    statusTag: "Flagged Fraud Address",
    statusColor: "text-amber-400 bg-amber-400/10 border-amber-400/25",
    evidencePreserved: "Destination address provided on fake platform, deposit memo, and smart contract interaction logs.",
    investigatorAction: "We query global threat-intelligence databases and transaction clusters to check whether this address has been reported by other victims or flagged by international cybercrime units.",
    technicalNote: "Scammers often generate unique deposit addresses for each victim, but these addresses quickly sweep funds into consolidated pooling wallets."
  },
  {
    id: 'hops',
    step: '03',
    title: "Intermediate Movement",
    subtitle: "Obfuscation & cross-chain hops",
    icon: Layers,
    statusTag: "Multi-Hop Cluster Tracing",
    statusColor: "text-orange-400 bg-orange-400/10 border-orange-400/25",
    evidencePreserved: "Split transactions, bridge transaction IDs, liquidity pool swaps, and decentralized exchange (DEX) logs.",
    investigatorAction: "Using behavioral heuristics and blockchain accounting, we trace funds across multi-hop splits, cross-chain bridges, and token swaps that scammers use to confuse victims.",
    technicalNote: "While bridges change the token, the mathematical ledger trail remains unbroken. Each bridge leaves a permanent deposit on one chain and a mint/claim on the other."
  },
  {
    id: 'destination',
    step: '04',
    title: "Centralized Exchange (CEX)",
    subtitle: "Where funds must exit",
    icon: Building2,
    statusTag: "KYC Identity Gateway",
    statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
    evidencePreserved: "Exchange deposit address, internal transfer IDs, and exchange deposit block confirmation.",
    investigatorAction: "We identify the regulated exchange hosting the recipient deposit account (e.g., Binance, OKX, Kraken, Coinbase, Bybit). This is the critical chokepoint where scammers must prove their real-world identity to cash out.",
    technicalNote: "Regulated exchanges are legally obligated under AML/KYC regulations to verify user IDs, retain passport copies, and comply with law enforcement freeze orders."
  },
  {
    id: 'resolution',
    step: '05',
    title: "Evidence Dossier & Freeze",
    subtitle: "Actionable recovery package",
    icon: FileCheck2,
    statusTag: "Court-Admissible Dossier",
    statusColor: "text-primary bg-primary/10 border-primary/30",
    evidencePreserved: "Certified forensic timeline, visual path diagram, exchange compliance packet, and police report exhibits.",
    investigatorAction: "We assemble a court-admissible forensic audit dossier with Delaware corporate verification and deliver urgent freeze notices to exchange compliance departments and cybercrime investigators.",
    technicalNote: "Exchanges can place administrative holds on accounts when served with formal forensic proof, preserving the assets before fiat off-ramping."
  }
];

export function CryptoTraceVisual() {
  const [activeNode, setActiveNode] = useState<TraceNode>(TRACE_NODES[3]); // default to destination exchange

  return (
    <div className="w-full max-w-6xl mx-auto my-12">
      {/* Diagram Container */}
      <div className="p-6 md:p-10 rounded-xl bg-card border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Interactive Fund Flow Map
            </div>
            <h3 className="heading-card text-white uppercase tracking-tight">
              How Blockchain Tracing Actually Follows Stolen Funds
            </h3>
            <p className="body-detail text-muted-foreground mt-1">
              Select any stage below to inspect the evidence collected and forensic action taken at each step.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-white/[0.02] px-3 py-1.5 rounded-lg border border-white/10">
            <Eye className="w-3.5 h-3.5 text-primary" />
            <span>Click any node to inspect</span>
          </div>
        </div>

        {/* 5-Step Node Diagram Flow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4 relative mb-8">
          {TRACE_NODES.map((node, idx) => {
            const Icon = node.icon;
            const isSelected = activeNode.id === node.id;

            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setActiveNode(node)}
                className={cn(
                  "p-5 rounded-xl border text-left transition-all duration-300 relative flex flex-col justify-between group",
                  isSelected
                    ? "bg-primary/10 border-primary shadow-lg shadow-primary/15 -translate-y-1"
                    : "bg-background/80 border-white/10 hover:border-white/25 hover:bg-white/[0.02]"
                )}
              >
                {/* Node Step Header */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                      isSelected
                        ? "bg-primary text-black font-bold"
                        : "bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-black"
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-muted-foreground">
                      {node.step}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white uppercase tracking-tight mb-1 group-hover:text-primary transition-colors">
                    {node.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-snug line-clamp-2">
                    {node.subtitle}
                  </p>
                </div>

                {/* Status Indicator */}
                <div className="mt-4 pt-3 border-t border-white/5">
                  <span className={cn(
                    "text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block border tracking-wide uppercase",
                    node.statusColor
                  )}>
                    {node.statusTag}
                  </span>
                </div>

                {/* Desktop Arrow Indicator (between steps) */}
                {idx < TRACE_NODES.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                    <div className="w-6 h-6 rounded-full bg-card border border-white/10 flex items-center justify-center shadow-md">
                      <ArrowRight className="w-3.5 h-3.5 text-primary" />
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Node Deep-Dive Inspection Panel */}
        <div className="p-6 md:p-8 rounded-xl bg-background border border-primary/30 relative">
          <div className="flex flex-col lg:flex-row gap-6 items-start justify-between pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-primary">Stage {activeNode.step}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className={cn("text-xs font-semibold px-2.5 py-0.5 rounded-full border", activeNode.statusColor)}>
                  {activeNode.statusTag}
                </span>
              </div>
              <h3 className="heading-card text-white uppercase tracking-tight">
                {activeNode.title}
              </h3>
              <p className="body-detail text-muted-foreground mt-1">
                {activeNode.subtitle}
              </p>
            </div>

            <div className="px-4 py-2 rounded-lg bg-card border border-white/10 text-xs font-semibold text-primary flex items-center gap-2 shrink-0">
              <Lock className="w-4 h-4 text-primary" />
              <span>Immutable Blockchain Record</span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            {/* Box 1 */}
            <div className="p-5 rounded-lg bg-card/60 border border-white/5 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary block">
                Evidence Preserved:
              </span>
              <p className="body-detail text-white/90 leading-relaxed font-normal">
                {activeNode.evidencePreserved}
              </p>
            </div>

            {/* Box 2 */}
            <div className="p-5 rounded-lg bg-card/60 border border-white/5 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary block">
                Investigative Action:
              </span>
              <p className="body-detail text-white/90 leading-relaxed font-normal">
                {activeNode.investigatorAction}
              </p>
            </div>

            {/* Box 3 */}
            <div className="p-5 rounded-lg bg-card/60 border border-white/5 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary block">
                Forensic Reality:
              </span>
              <p className="body-detail text-muted-foreground leading-relaxed font-normal">
                {activeNode.technicalNote}
              </p>
            </div>
          </div>
        </div>

        {/* Clean Trust Callout (Zero Cliche Stock Imagery) */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground pt-4 border-t border-white/10">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            No generic "hacker" gimmicks: based on real-world cryptographic ledger tracing
          </span>
          <span className="font-semibold text-primary">
            Delaware Registered Entity #Verified
          </span>
        </div>
      </div>
    </div>
  );
}

