'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  CreditCard, 
  Wallet, 
  TrendingUp, 
  HeartHandshake, 
  Coins, 
  CandlestickChart, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  ChevronRight,
  Search,
  Lock,
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionReveal } from '@/components/ui/section-reveal';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';

export interface ScamService {
  id: string;
  category: string;
  title: string;
  tagline: string;
  icon: any;
  symptoms: string[];
  summary: string;
  explanation: string;
  recoverySteps: string[];
  evidenceNeeded: string[];
}

export const SCAM_SERVICES: ScamService[] = [
  {
    id: 'loan-scam',
    category: 'Loan Scam Recovery',
    title: 'Loan Scam Recovery',
    tagline: 'Advance-fee loan fraud & fake lending platforms',
    icon: CreditCard,
    symptoms: [
      'Asked to pay "insurance" or "activation fee"',
      'Guaranteed approval with no credit check',
      'Lender disappeared after fee was sent',
      'Demanded collateral payment in crypto or wire'
    ],
    summary: 'We trace payments sent to fake lenders, locate receiving bank accounts or crypto addresses, and build evidence packages for recovery.',
    explanation: 'Legitimate lenders never require upfront fees or insurance deposits before releasing loan funds. Fake lenders create convincing contracts and loan approval letters, take your fees, and continue inventing new fees until you stop paying.',
    recoverySteps: [
      'Payment Path Audit: Tracing wire routes, Zelle/peer-to-peer transfers, or crypto deposits.',
      'Recipient Entity Profiling: Unmasking the shell companies and accounts receiving your fees.',
      'Recovery Evidence Dossier: Compiling an official report for bank fraud desks and enforcement.'
    ],
    evidenceNeeded: [
      'Proof of payments (wire receipts, transfer confirmations)',
      'Loan agreement documents and emails from the lender',
      'Account details or wallet addresses where money was sent'
    ]
  },
  {
    id: 'wallet-scam',
    category: 'Wallet Scam Recovery',
    title: 'Wallet Scam Recovery',
    tagline: 'Compromised seed phrases, malicious permits & drained assets',
    icon: Wallet,
    symptoms: [
      'Wallet balance emptied without your permission',
      'Signed a "free mint" or "verification" transaction',
      'Shared seed phrase with fake customer support',
      'Tokens automatically swapped and swept away'
    ],
    summary: 'We analyze malicious drainer smart contracts, track swept tokens across exchanges, and guide you on securing remaining accounts.',
    explanation: 'Drainer scripts trick users into signing approvals that give malicious smart contracts permission to transfer tokens out of their wallet. Even if your wallet was wiped out, the stolen tokens must pass through identifiable exit points.',
    recoverySteps: [
      'Smart Contract Audit: Analyzing the drainer contract logic and sweep transactions.',
      'Multi-Hop Asset Tracing: Following tokens as they are swapped across DEXs and centralized exchanges.',
      'Exchange Freeze Requests: Transmitting evidence packets to destination exchanges holding the assets.'
    ],
    evidenceNeeded: [
      'Your compromised wallet public address',
      'Transaction hashes (TxIDs) of unauthorized outgoing transfers',
      'Website URL where you signed the approval'
    ]
  },
  {
    id: 'investment-scam',
    category: 'Investment Scam Recovery',
    title: 'Investment Scam Recovery',
    tagline: 'Fake high-yield platforms, Ponzi schemes & capital lockups',
    icon: TrendingUp,
    symptoms: [
      'Website showed huge daily returns or bonuses',
      'Account frozen when attempting to withdraw',
      'Demanded 15%–30% "tax" or "gas fee" to release funds',
      'Platform website suddenly went offline'
    ],
    summary: 'We trace deposits into organized investment schemes, unmask operator wallets, and prepare institutional dossiers for legal retrieval.',
    explanation: 'Fake investment websites display fabricated account balances and simulated trading profits. The numbers on screen are completely fictional; the money you deposited was immediately routed into scammer-controlled wallets.',
    recoverySteps: [
      'Deposit Flow Mapping: Tracing your original capital from entry point to scammer treasury.',
      'Cluster & Co-Conspirator Analysis: Identifying connected platforms run by the same syndicate.',
      'Legal & Law Enforcement Brief: Assembling an investigative report admissible in legal proceedings.'
    ],
    evidenceNeeded: [
      'Platform login URL and account username',
      'Complete record of deposits (crypto hashes, wire slips)',
      'Screenshots of platform dashboard showing balances'
    ]
  },
  {
    id: 'romance-scam',
    category: 'Romance Scam Recovery',
    title: 'Romance Scam Recovery',
    tagline: 'Dating app manipulation & "Pig Butchering" (Sha Zhu Pan)',
    icon: HeartHandshake,
    symptoms: [
      'Met on Tinder, Hinge, or social media',
      'Built trust over weeks before mentioning "crypto"',
      'Guided you to a private trading app or website',
      'Vanished after you refused to deposit more money'
    ],
    summary: 'We combine blockchain tracking with OSINT digital intelligence to trace funds and unmask criminal networks behind romance fraud.',
    explanation: 'Pig butchering scams are organized criminal operations run out of industrial fraud compounds. Scammers spend months grooming victims emotionally before steering them to rigged platforms. Recovery starts with unmasking their financial trails.',
    recoverySteps: [
      'Digital Footprint Investigation: Tracing communication origins, phone numbers, and domains.',
      'Crypto Route Tracing: Tracking where crypto was deposited and identifying exchange off-ramps.',
      'Official Law Enforcement Liaison: Preparing formatted evidence packages for FBI IC3 and regional police.'
    ],
    evidenceNeeded: [
      'Chat transcripts (WhatsApp, Telegram, SMS)',
      'Platform link they instructed you to register on',
      'Full list of transaction hashes and wallet addresses'
    ]
  },
  {
    id: 'crypto-scam',
    category: 'Cryptocurrency Scam Recovery',
    title: 'Cryptocurrency Scam Recovery',
    tagline: 'Stolen BTC, ETH, USDT & cross-chain token theft',
    icon: Coins,
    symptoms: [
      'Crypto sent to a fake custodial service or escrow',
      'Assets routed through cross-chain bridges or mixers',
      'Impersonation of genuine crypto exchange support',
      'Unauthorized transfer from exchange or personal wallet'
    ],
    summary: 'We conduct rigorous forensic blockchain analysis to trace stolen cryptocurrency from the first hop to final exchange exit points.',
    explanation: 'The public ledger of cryptocurrency means that scammers cannot truly erase their financial history. Even when they use mixers or cross-chain bridges, advanced behavioral heuristics allow investigators to link transactions back to real-world deposit accounts.',
    recoverySteps: [
      'Blockchain Ledger Reconstruction: Following every split, hop, and coin-swap.',
      'Mixer & Bridge De-obfuscation: Correlating time, amount, and fee patterns to pierce anonymity tools.',
      'Centralized Exchange Freezes: Providing actionable intelligence directly to compliance teams.'
    ],
    evidenceNeeded: [
      'Transaction hash (TxID) of all outgoing transfers',
      'Public receiving addresses provided by the scammer',
      'Details of the cryptocurrency asset and amounts'
    ]
  },
  {
    id: 'trading-scam',
    category: 'Trading Scam Recovery',
    title: 'Trading Scam Recovery',
    tagline: 'Manipulated Forex, CFD & fake crypto brokers',
    icon: CandlestickChart,
    symptoms: [
      'Manipulated MT4/MT5 charts and false margin calls',
      'Pressure from "senior account managers" to deposit more',
      'Withdrawals rejected citing "regulatory compliance"',
      'Demanded extra payments to unlock your balance'
    ],
    summary: 'We expose fraudulent brokerage operations, trace payments to their payment processors, and build evidence for bank clawbacks and legal action.',
    explanation: 'Unregulated fake brokers operate proprietary trading interfaces designed to look like real markets. They control the charts, fabricate losses to demand more capital, or fabricate profits to demand huge withdrawal fees.',
    recoverySteps: [
      'Brokerage Infrastructure Audit: Uncovering the real owners and hosted servers of the fake platform.',
      'Payment Gateway Tracing: Tracing credit card, wire, and crypto merchant gateways used by the broker.',
      'Chargeback & Dispute Dossier: Equipping victims with specialized reports for bank and card disputes.'
    ],
    evidenceNeeded: [
      'Brokerage name and website URL',
      'Deposit receipts (credit card statements, bank wires, crypto TxIDs)',
      'Emails or chat records from account managers'
    ]
  }
];

export function ScamServicesGrid() {
  const [selectedService, setSelectedService] = useState<ScamService | null>(null);

  return (
    <section id="scam-services" className="py-24 md:py-32 bg-background relative overflow-hidden border-b border-white/5">
      {/* Ambient glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-primary/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionReveal className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] md:text-xs font-bold mb-4 tracking-[0.2em] uppercase">
            <ShieldCheck className="w-4 h-4 text-primary" />
            Specialized Scam Recovery Areas
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-headline font-bold text-white uppercase tracking-tight mb-6">
            We Help Victims Trace & Recover <br />
            <span className="gradient-text italic font-medium copper-glow">Funds Lost to 6 Major Scams</span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed font-normal">
            Every scam leaves a paper and digital trail. Select your situation below to learn how our investigators trace your funds and what evidence you need.
          </p>
        </SectionReveal>

        {/* The 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto mb-16">
          {SCAM_SERVICES.map((service, idx) => {
            const Icon = service.icon;
            return (
              <SectionReveal key={service.id} delay={idx * 80} duration={500} className="h-full">
                <div className="h-full flex flex-col justify-between p-8 rounded-none bg-card border border-white/10 hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 relative overflow-hidden">
                  {/* Subtle top indicator */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-primary transition-colors duration-300" />
                  
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="w-14 h-14 rounded-none bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-black text-primary transition-colors duration-300">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-headline font-bold text-white uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-xs font-semibold text-primary/90 uppercase tracking-wide mb-4">
                      {service.tagline}
                    </p>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-normal">
                      {service.summary}
                    </p>

                    {/* Symptoms / Did this happen? */}
                    <div className="space-y-2 mb-8 pt-4 border-t border-white/5">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/75 flex items-center gap-1.5 mb-3">
                        <AlertTriangle className="w-3.5 h-3.5 text-primary" /> Common Signs:
                      </p>
                      {service.symptoms.slice(0, 3).map((symptom, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2 text-xs text-foreground/80 font-medium">
                          <ChevronRight className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                          <span>{symptom}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setSelectedService(service)}
                          className="w-full h-11 text-xs font-bold uppercase tracking-wider border-white/15 bg-white/5 hover:bg-white/10 hover:border-primary/40 rounded-none"
                        >
                          How Recovery Works
                          <ArrowRight className="ml-1.5 w-3.5 h-3.5 text-primary" />
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto glass-card border-white/10 p-6 md:p-10">
                        <DialogHeader className="text-left mb-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 rounded-none bg-primary/10 border border-primary/25 flex items-center justify-center text-primary">
                              <Icon className="w-6 h-6" />
                            </div>
                            <div>
                              <DialogTitle className="text-2xl md:text-3xl font-headline font-bold text-white uppercase tracking-tight">
                                {service.title}
                              </DialogTitle>
                              <DialogDescription className="text-xs font-semibold text-primary uppercase tracking-wider">
                                {service.tagline}
                              </DialogDescription>
                            </div>
                          </div>
                        </DialogHeader>

                        <div className="space-y-8">
                          {/* Plain English Breakdown */}
                          <div className="space-y-3">
                            <h4 className="text-xs font-black uppercase tracking-[0.25em] text-primary flex items-center gap-2">
                              <Search className="w-4 h-4 text-primary" /> What Actually Happened
                            </h4>
                            <p className="text-sm md:text-base text-foreground/90 leading-relaxed font-normal bg-white/[0.02] p-4 border-l-2 border-primary">
                              {service.explanation}
                            </p>
                          </div>

                          {/* How our investigators help */}
                          <div className="space-y-3">
                            <h4 className="text-xs font-black uppercase tracking-[0.25em] text-primary flex items-center gap-2">
                              <ShieldCheck className="w-4 h-4 text-primary" /> Our 3-Step Recovery Action
                            </h4>
                            <div className="space-y-3">
                              {service.recoverySteps.map((step, sIdx) => (
                                <div key={sIdx} className="p-3.5 bg-white/5 border border-white/5 flex items-start gap-3">
                                  <span className="w-6 h-6 rounded-none bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                                    0{sIdx + 1}
                                  </span>
                                  <p className="text-xs md:text-sm text-foreground/80 leading-relaxed font-medium">
                                    {step}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Evidence you should keep */}
                          <div className="space-y-3">
                            <h4 className="text-xs font-black uppercase tracking-[0.25em] text-primary flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Evidence Needed For Best Results
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {service.evidenceNeeded.map((ev, eIdx) => (
                                <div key={eIdx} className="p-3 bg-white/[0.02] border border-white/5 text-xs text-foreground/80 flex items-start gap-2 font-normal">
                                  <span className="text-primary font-bold">•</span>
                                  <span>{ev}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Honest Disclaimer */}
                          <div className="p-4 bg-primary/5 border border-primary/20 text-xs text-foreground/80 leading-relaxed">
                            <p className="font-semibold text-white mb-1">Honest Assessment Guarantee:</p>
                            We will never ask you for upfront fees to "hack your money back." We first examine your evidence to verify if a viable recovery pathway exists.
                          </div>

                          {/* CTA Inside Modal */}
                          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
                            <Link href={`#recovery-assessment`} className="w-full sm:w-auto flex-1">
                              <DialogClose asChild>
                                <Button className="w-full h-12 bg-primary text-black hover:bg-primary/90 font-bold uppercase tracking-wider rounded-none">
                                  Start Free Assessment For This Case
                                  <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                              </DialogClose>
                            </Link>
                            <a href="mailto:investigator@elitethics.com" className="w-full sm:w-auto">
                              <Button variant="outline" className="w-full h-12 border-white/15 bg-white/5 font-bold uppercase tracking-wider rounded-none">
                                <Mail className="mr-2 w-4 h-4 text-primary" /> Email Investigator
                              </Button>
                            </a>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>

        {/* Bottom Reassurance Banner */}
        <SectionReveal className="max-w-4xl mx-auto p-6 md:p-8 bg-card border border-white/10 rounded-none text-center flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <h4 className="text-lg md:text-xl font-headline font-bold text-white uppercase tracking-tight">
              Not sure which category fits your situation?
            </h4>
            <p className="text-xs md:text-sm text-muted-foreground font-normal">
              Many modern scams combine elements of romance grooming, fake loans, and fake trading apps.
            </p>
          </div>
          <Link href="#quick-triage" className="shrink-0 w-full md:w-auto">
            <Button size="lg" className="w-full md:w-auto h-12 px-6 bg-primary text-black hover:bg-primary/90 font-bold uppercase tracking-wider rounded-none premium-cta">
              Use 60-Second Case Triage
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </SectionReveal>
      </div>
    </section>
  );
}
