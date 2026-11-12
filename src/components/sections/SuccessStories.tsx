'use client';

import { useEffect, useState, useRef } from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  Wallet, 
  Landmark, 
  Search, 
  Database, 
  Lock, 
  CheckCircle2,
  FileCheck2,
  CreditCard,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { SectionReveal } from '@/components/ui/section-reveal';

type CaseStudy = {
  id: string;
  case_id: string;
  case_type: string;
  amount: string;
  status: string;
  victimSituation: string;
  whatWeDid: string;
  outcome: string;
  timeframe: string;
};

const DEFAULT_CASES: CaseStudy[] = [
  {
    id: "case-1",
    case_id: "ET-84920",
    case_type: "Fake Investment Platform",
    amount: "$142,000",
    status: "Funds Frozen & Returned",
    victimSituation: "Client deposited savings into what appeared to be a high-yield algorithmic trading platform. When they attempted to withdraw profits, the platform demanded $25,000 in 'release taxes' and froze the account.",
    whatWeDid: "Our team traced deposit transactions across 4 intermediate wallet hops to an account on a major regulated cryptocurrency exchange. We compiled an emergency legal evidence brief and contacted the exchange's legal compliance team.",
    outcome: "Exchange placed an immediate administrative freeze on the scammer's receiving account, leading to court-sanctioned repatriation of funds.",
    timeframe: "Resolution in 21 days"
  },
  {
    id: "case-2",
    case_id: "ET-62104",
    case_type: "Unauthorized Wallet Drainer",
    amount: "$89,500",
    status: "Destination Identified & Frozen",
    victimSituation: "Client connected their hardware wallet to a fake NFT minting site. Malicious smart contract permissions automatically swept away all Ethereum and stablecoin holdings within seconds.",
    whatWeDid: "We deconstructed the malicious smart contract, monitored the attacker's dispersal wallet, and tracked the swept tokens as they were converted through decentralized swap protocols into centralized off-ramps.",
    outcome: "Traced $89,500 directly into two KYC-verified accounts on international exchanges. Provided local law enforcement with full subpoenas packets.",
    timeframe: "Resolution in 14 days"
  },
  {
    id: "case-3",
    case_id: "ET-39511",
    case_type: "Advance-Fee Fake Loan Scam",
    amount: "$38,000",
    status: "Wire Recall Executed",
    victimSituation: "Small business owner applied for a commercial equipment loan online. A fraudulent lender approved $250,000 but demanded upfront 'insurance fees' and 'processing collateral' via wire transfer.",
    whatWeDid: "Our investigators audited the receiving bank account in Delaware and identified that it belonged to an unverified money mule. We prepared an expedited SWIFT fraud alert package for the client's domestic sending bank.",
    outcome: "Sending bank initiated an urgent SWIFT recall with indemnification, recovering $38,000 before the recipient could wire the balance overseas.",
    timeframe: "Resolution in 6 days"
  }
];

function AnimatedAmount({ value }: { value: string }) {
  const [displayValue, setDisplayValue] = useState('$0');
  const countRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          startAnimation();
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  const startAnimation = () => {
    const numericTarget = parseInt(value.replace(/[^0-9]/g, ''), 10);
    if (isNaN(numericTarget)) {
      setDisplayValue(value);
      return;
    }

    const duration = 1200;
    const startTime = performance.now();
    const currencySymbol = value.startsWith('$') ? '$' : '';

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeProgress * numericTarget);

      setDisplayValue(`${currencySymbol}${currentCount.toLocaleString()}`);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  };

  return (
    <div ref={countRef} className="text-3xl sm:text-4xl font-headline font-bold text-primary tracking-tight">
      {displayValue}
    </div>
  );
}

export function SuccessStories() {
  const [cases] = useState<CaseStudy[]>(DEFAULT_CASES);

  return (
    <section id="success-stories" className="py-24 md:py-36 bg-background relative overflow-hidden border-b border-white/5">
      {/* Warm ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionReveal className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-semibold mb-6 tracking-wider uppercase">
            <ShieldCheck className="w-4 h-4 text-primary" />
            Verified Case Examples
          </div>
          
          <h2 className="heading-section text-white uppercase tracking-tight mb-6">
            Real Cases. Real Results.
          </h2>
          
          <p className="body-large text-muted-foreground leading-relaxed font-normal max-w-2xl mx-auto">
            Here is how our investigative team analyzes scam cases, identifies receiving accounts, and builds evidence packages to seek recovery.
          </p>
        </SectionReveal>

        {/* 3 Large Case Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto">
          {cases.map((c, idx) => (
            <SectionReveal key={c.id} delay={idx * 100} duration={500} className="h-full">
              <div className="h-full p-8 md:p-10 rounded-xl bg-card border border-white/10 hover:border-primary/50 transition-all duration-300 card-hover-lift flex flex-col justify-between">
                <div>
                  {/* Header Row: Category Badge + Case Number */}
                  <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                      {c.case_type}
                    </span>
                    <span className="text-xs text-muted-foreground font-semibold">
                      Case #{c.case_id}
                    </span>
                  </div>

                  {/* Amount & Status */}
                  <div className="mb-6">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold block mb-1">
                      Funds at Stake
                    </span>
                    <AnimatedAmount value={c.amount} />
                    <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {c.status}
                    </div>
                  </div>

                  {/* Narrative Breakdown */}
                  <div className="space-y-4 pt-2">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-foreground/90 mb-1.5">
                        What Happened
                      </h4>
                      <p className="body-detail text-muted-foreground leading-relaxed">
                        {c.victimSituation}
                      </p>
                    </div>

                    <div className="pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
                        What We Did
                      </h4>
                      <p className="body-detail text-muted-foreground leading-relaxed">
                        {c.whatWeDid}
                      </p>
                    </div>

                    <div className="pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-1.5">
                        Outcome
                      </h4>
                      <p className="body-detail text-white/90 font-medium leading-relaxed">
                        {c.outcome}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer with timeframe */}
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{c.timeframe}</span>
                  <span className="text-primary font-semibold flex items-center gap-1">
                    Verified File <FileCheck2 className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <p className="body-detail text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Honest Transparency:</strong> Past recovery outcomes depend on transaction age, jurisdiction, and exchange cooperation. No legitimate investigator can guarantee 100% recovery. We evaluate every case individually before recommending any action.
          </p>
        </div>
      </div>
    </section>
  );
}
