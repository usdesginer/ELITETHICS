'use client';

import { XCircle, CheckCircle2, ShieldAlert, ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import { SectionReveal } from '@/components/ui/section-reveal';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const WHAT_WE_DONT_DO = [
  {
    title: "Guarantee Recovery",
    desc: "No legitimate investigator, attorney, or government authority can guarantee fund recovery. Anyone who makes this promise is attempting to deceive you a second time."
  },
  {
    title: "Pretend to Be Law Enforcement",
    desc: "We are private forensic investigators and financial analysts. We do not claim police powers or represent any government authority."
  },
  {
    title: "Promise Immediate Access to Frozen Accounts",
    desc: "Freezing an account on an exchange or at a bank is a formal legal step. We provide the certified evidentiary dossiers required for compliance officers and courts to take action."
  },
  {
    title: "Impersonate Banks or Government Agencies",
    desc: "We operate strictly under our registered corporate identity (Elitethics) in Delaware. We never send messages pretending to be Interpol, the FBI, or your bank."
  },
  {
    title: "Ask Victims to Pay a Scammer",
    desc: "We will never advise you to pay 'withdrawal taxes', 'release fees', or 'insurance deposits' to the fraudulent platform. That is always a trap."
  },
  {
    title: "Claim We Can Magically Reverse Every Transaction",
    desc: "Blockchains are cryptographically immutable. Legitimate recovery is not about fictional 'hacking': it relies on tracing fund movement to regulated exit points where accounts can be identified and frozen."
  }
];

const WHAT_WE_DO = [
  {
    title: "Review Information",
    desc: "We carefully examine the transaction hashes, bank receipts, platform links, and communication histories you provide to assess case viability."
  },
  {
    title: "Investigate Available Evidence",
    desc: "We inspect wallet clusters, domain registrations, corporate shell records, and payment gateway infrastructure to uncover the real actors."
  },
  {
    title: "Trace Financial Activity Where Possible",
    desc: "We follow the digital path of funds through blockchain hops, bridges, or bank clearing networks to identify the destination accounts."
  },
  {
    title: "Organize Information",
    desc: "We compile all evidence into structured, court-admissible forensic dossiers formatted to meet the legal standards of international exchanges and law enforcement."
  },
  {
    title: "Explain Options",
    desc: "We give you an honest, clear appraisal of what avenues exist, whether that involves exchange freeze petitions, bank recalls, or police referrals, without false hope."
  },
  {
    title: "Help People Understand Their Next Steps",
    desc: "We support you through every stage, helping you preserve critical evidence, protect remaining accounts, and avoid secondary recovery fraud."
  }
];

export function OurLimitsSection() {
  return (
    <section id="our-limits" className="py-24 md:py-36 bg-background relative overflow-hidden border-b border-white/5">
      {/* Subtle warm glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/[0.02] rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        <SectionReveal className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-semibold mb-6 tracking-wider uppercase">
            <ShieldCheck className="w-4 h-4 text-primary" />
            Clear Boundaries & Ethical Standards
          </div>

          <h2 className="heading-section text-white uppercase tracking-tight mb-6">
            Our Limits & Our Standards
          </h2>

          <p className="body-large text-muted-foreground leading-relaxed font-normal max-w-2xl mx-auto">
            Honest boundaries build real trust. Knowing what an investigative firm will not do is just as important as knowing what it can do.
          </p>
        </SectionReveal>

        {/* 2-Column Side-by-Side Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          
          {/* Column 1: What We Don't Do */}
          <SectionReveal delay={100} duration={500} className="h-full">
            <div className="h-full p-8 md:p-12 rounded-xl bg-red-950/10 border border-red-500/25 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-red-500/20">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                    <XCircle className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="heading-card text-red-100 uppercase tracking-tight">
                      What We Don't Do
                    </h3>
                    <p className="text-xs text-red-400 font-semibold uppercase tracking-wider">
                      Strict Ethical Boundaries
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {WHAT_WE_DONT_DO.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3.5">
                      <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-1" />
                      <div>
                        <h4 className="text-base font-bold text-red-100 uppercase tracking-wide mb-1">
                          We Don't {item.title}
                        </h4>
                        <p className="body-detail text-muted-foreground leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-red-500/20">
                <p className="text-xs text-red-300/80 leading-relaxed font-medium">
                  <strong>Why this matters:</strong> Anyone promising instant results, magic hacking, or 100% guarantees is almost certainly a secondary recovery scammer.
                </p>
              </div>
            </div>
          </SectionReveal>

          {/* Column 2: What We Do */}
          <SectionReveal delay={200} duration={500} className="h-full">
            <div className="h-full p-8 md:p-12 rounded-xl bg-card border border-primary/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-primary/20">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="heading-card text-white uppercase tracking-tight">
                      What We Do
                    </h3>
                    <p className="text-xs text-primary font-semibold uppercase tracking-wider">
                      Professional Investigative Practice
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {WHAT_WE_DO.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3.5">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                      <div>
                        <h4 className="text-base font-bold text-white uppercase tracking-wide mb-1">
                          We {item.title}
                        </h4>
                        <p className="body-detail text-muted-foreground leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-muted-foreground font-medium">
                  Delaware Division of Corporations Registered
                </span>
                <Link href="#recovery-assessment" className="w-full sm:w-auto">
                  <Button size="sm" className="w-full sm:w-auto h-11 px-5 bg-primary text-black hover:bg-primary/90 font-bold uppercase tracking-wider text-xs rounded-lg">
                    Start My Recovery Assessment <ArrowRight className="ml-1.5 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </SectionReveal>

        </div>
      </div>
    </section>
  );
}

