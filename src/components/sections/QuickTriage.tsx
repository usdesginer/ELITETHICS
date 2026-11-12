'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  AlertTriangle,
  FileCheck2,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionReveal } from '@/components/ui/section-reveal';

const SCAM_TYPES = [
  { id: 'investment', label: 'Fake Investment Platform (High Returns / Ponzi)' },
  { id: 'trading', label: 'Trading & Broker Scam (Withdrawal Blocked)' },
  { id: 'crypto', label: 'Cryptocurrency Sent to Scam Address' },
  { id: 'wallet', label: 'Wallet Drained / Malicious Approval' },
  { id: 'romance', label: 'Romance or Friendship Scam' },
  { id: 'loan', label: 'Advance-Fee Fake Loan Scam' }
];

const TIMELINES = [
  { id: 'critical', label: 'Under 48 Hours Ago', desc: 'Highest chance of freezing funds before off-ramping' },
  { id: 'recent', label: '3 to 7 Days Ago', desc: 'Assets likely in transit or exchange deposit queues' },
  { id: 'moderate', label: '1 to 4 Weeks Ago', desc: 'Requires multi-hop ledger tracing to identify exit accounts' },
  { id: 'older', label: 'More than 30 Days Ago', desc: 'Requires cold cluster analysis and formal legal requests' }
];

const EVIDENCE_ITEMS = [
  { id: 'hashes', label: 'Transaction IDs (TxHash) or Destination Wallet Addresses' },
  { id: 'receipts', label: 'Bank Wire, Card, or Payment Receipts' },
  { id: 'chats', label: 'Chat Logs (WhatsApp, Telegram, SMS, Email)' },
  { id: 'urls', label: 'Scam Website URL or Trading App Link' }
];

export function QuickTriage() {
  const [selectedType, setSelectedType] = useState<string>('investment');
  const [selectedTimeline, setSelectedTimeline] = useState<string>('recent');
  const [selectedEvidence, setSelectedEvidence] = useState<string[]>(['hashes', 'chats']);

  const toggleEvidence = (id: string) => {
    setSelectedEvidence(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const getFeasibilityAssessment = () => {
    const isCritical = selectedTimeline === 'critical';
    const isRecent = selectedTimeline === 'recent';

    let badge = 'Active Investigation Window';
    let badgeColor = 'text-primary bg-primary/10 border-primary/30';
    let summary = 'Your situation has viable investigative leads that can be traced.';
    let recommendations: string[] = [];

    if (isCritical) {
      badge = 'Urgent Action Window (Under 48 Hours)';
      badgeColor = 'text-amber-400 bg-amber-400/10 border-amber-400/30';
      summary = 'Because this happened within the last 48 hours, there is a strong possibility funds are still in transit or awaiting withdrawal clearing at a centralized exchange.';
      recommendations = [
        'Do not send any more money, even if the scammer demands a "withdrawal fee" or "tax".',
        'Collect all transaction IDs (TxIDs) immediately before platforms disable your access.',
        'Request an expedited review so our team can prepare exchange freeze notifications.'
      ];
    } else if (isRecent) {
      badge = 'Actionable Forensic Tracing Window';
      badgeColor = 'text-primary bg-primary/10 border-primary/30';
      summary = 'Assets may have moved through several intermediate hops, but the permanent digital ledger cannot be erased. Tracing can pinpoint the final destination account.';
      recommendations = [
        'Document all communication records and do not delete any chat threads.',
        'Stop interacting with the scam platform to prevent them from moving funds further.',
        'Have our Delaware-registered team conduct a preliminary transaction review.'
      ];
    } else {
      badge = 'Historical Investigation Review';
      badgeColor = 'text-white/80 bg-white/5 border-white/10';
      summary = 'Even older transactions remain recorded on the blockchain ledger and bank payment networks. Recovery relies on connecting clusters to KYC exchange records.';
      recommendations = [
        'Organize all historic bank receipts, account numbers, and transaction IDs.',
        'Beware of secondary "recovery hackers" on Telegram who promise instant 100% results.',
        'Submit your details for a confidential, no-obligation feasibility evaluation.'
      ];
    }

    return { badge, badgeColor, summary, recommendations };
  };

  const assessment = getFeasibilityAssessment();

  return (
    <section id="quick-triage" className="py-24 md:py-36 bg-card/25 border-b border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionReveal className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-semibold mb-6 tracking-wider uppercase">
            <Clock className="w-4 h-4 text-primary" />
            60-Second Viability Check
          </div>
          
          <h2 className="heading-section text-white uppercase tracking-tight mb-6">
            Check Your Recovery Viability
          </h2>
          
          <p className="body-large text-muted-foreground leading-relaxed font-normal max-w-2xl mx-auto">
            Answer 3 quick questions to understand where your case stands and what immediate actions you should take right now.
          </p>
        </SectionReveal>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
          {/* Inputs Column */}
          <div className="lg:col-span-7 space-y-8 bg-card border border-white/10 p-8 md:p-10 rounded-xl">
            {/* Step 1: Scam Type */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-7 h-7 rounded-lg bg-primary text-black font-bold text-sm flex items-center justify-center">1</span>
                <label className="text-sm font-bold uppercase tracking-wider text-white">
                  What type of scam occurred?
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SCAM_TYPES.map(type => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type.id)}
                    className={`text-left p-4 text-sm font-medium rounded-lg border transition-all ${
                      selectedType === type.id
                        ? 'border-primary bg-primary/10 text-white font-semibold'
                        : 'border-white/10 bg-white/[0.02] text-muted-foreground hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Timeline */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-7 h-7 rounded-lg bg-primary text-black font-bold text-sm flex items-center justify-center">2</span>
                <label className="text-sm font-bold uppercase tracking-wider text-white">
                  When did the transfer or loss happen?
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TIMELINES.map(timeline => (
                  <button
                    key={timeline.id}
                    type="button"
                    onClick={() => setSelectedTimeline(timeline.id)}
                    className={`text-left p-4 rounded-lg border transition-all ${
                      selectedTimeline === timeline.id
                        ? 'border-primary bg-primary/10 text-white'
                        : 'border-white/10 bg-white/[0.02] text-muted-foreground hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <div className="text-sm font-bold text-white mb-1">{timeline.label}</div>
                    <div className="text-xs text-muted-foreground">{timeline.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Evidence */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-7 h-7 rounded-lg bg-primary text-black font-bold text-sm flex items-center justify-center">3</span>
                <label className="text-sm font-bold uppercase tracking-wider text-white">
                  What evidence do you have right now?
                </label>
              </div>
              <div className="space-y-2.5">
                {EVIDENCE_ITEMS.map(item => {
                  const isChecked = selectedEvidence.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleEvidence(item.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-lg border text-sm font-medium transition-all ${
                        isChecked 
                          ? 'border-primary/60 bg-primary/10 text-white font-semibold'
                          : 'border-white/10 bg-white/[0.02] text-muted-foreground hover:border-white/20 hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                      <CheckCircle2 className={`w-5 h-5 shrink-0 ${isChecked ? 'text-primary' : 'text-white/20'}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Result Column */}
          <div className="lg:col-span-5 bg-card border border-primary/30 p-8 md:p-10 rounded-xl relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6 border uppercase tracking-wider ${assessment.badgeColor}">
              <ShieldCheck className="w-4 h-4" />
              {assessment.badge}
            </div>

            <h3 className="heading-card text-white uppercase tracking-tight mb-4">
              Investigative Assessment
            </h3>

            <p className="body-detail text-muted-foreground leading-relaxed mb-6">
              {assessment.summary}
            </p>

            <div className="pt-4 border-t border-white/10 mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
                Immediate Recommended Actions:
              </h4>
              <ul className="space-y-3">
                {assessment.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-foreground/90 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link href="#recovery-assessment" className="w-full block">
              <Button size="lg" className="w-full h-14 bg-primary text-black hover:bg-primary/90 font-bold uppercase tracking-wider premium-cta rounded-xl">
                Start Full Case Evaluation <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>

            <div className="mt-4 text-center">
              <span className="text-xs text-muted-foreground">
                Zero cost or obligation • Delaware registered
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
