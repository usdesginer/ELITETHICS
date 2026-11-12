'use client';

import { 
  FileText, 
  Search, 
  ArrowRight, 
  Layers, 
  FileCheck, 
  HelpCircle, 
  CheckSquare2, 
  ArrowDown
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SectionReveal } from '@/components/ui/section-reveal';

const JOURNEY_STEPS = [
  {
    step: '01',
    title: 'Tell Us What Happened',
    desc: 'Securely provide the basic details.',
    detail: 'Fill out our confidential intake form or email our desk. Tell us what platform was used, approximately how much was lost, and when it occurred.',
    icon: FileText
  },
  {
    step: '02',
    title: 'We Review Your Information',
    desc: 'We look at the payments, accounts, messages and other evidence available.',
    detail: 'An experienced human investigator examines your transaction hashes, bank wire slips, and communication logs to understand the nature of the fraud.',
    icon: Search
  },
  {
    step: '03',
    title: 'We Trace the Money Where Possible',
    desc: 'We examine transaction and payment trails.',
    detail: 'We track the movement of your funds step-by-step across blockchains or payment networks to see where the money was routed.',
    icon: Layers
  },
  {
    step: '04',
    title: 'We Build the Case',
    desc: 'Relevant information is organized into a clear picture.',
    detail: 'We compile the transaction paths, receiving accounts, server records, and chat transcripts into a coherent, verified evidence dossier.',
    icon: FileCheck
  },
  {
    step: '05',
    title: 'We Explain Your Options',
    desc: 'You receive a clear explanation of possible next steps.',
    detail: 'We tell you honestly whether your funds can be targeted for an exchange freeze, bank recall, or legal reporting. No false promises.',
    icon: HelpCircle
  },
  {
    step: '06',
    title: 'You Decide What Happens Next',
    desc: 'No pressure. You decide how you want to proceed.',
    detail: 'You are completely in control. You choose whether you want our team to assist with official submissions and recovery representation.',
    icon: CheckSquare2
  }
];

export function RecoveryJourney() {
  return (
    <section id="recovery-journey" className="py-24 md:py-36 bg-background relative overflow-hidden border-b border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-primary/[0.03] rounded-full blur-[180px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionReveal className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-semibold mb-6 tracking-wider uppercase">
            <span>Clear Roadmap</span>
          </div>
          
          <h2 className="heading-section text-white uppercase tracking-tight mb-6">
            From Scam to Recovery: One Step at a Time
          </h2>
          
          <p className="body-large text-muted-foreground leading-relaxed font-normal">
            Recovering from fraud can feel overwhelming. We break the entire path down into a clear, predictable journey so you always know where you stand.
          </p>
        </SectionReveal>

        {/* 6 Sequential Steps Grid with Directional Progression */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-16">
          {JOURNEY_STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <SectionReveal key={item.step} delay={idx * 70} className="h-full">
                <div className="p-8 md:p-12 rounded-xl bg-card border border-white/10 hover:border-primary/50 card-hover-lift h-full flex flex-col justify-between group relative overflow-hidden">
                  <div>
                    {/* Header: Step Number & Icon */}
                    <div className="flex items-center justify-between gap-4 mb-8">
                      <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-base font-mono font-bold text-primary px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                        {item.step}
                      </span>
                    </div>

                    <h3 className="heading-card text-white uppercase tracking-tight mb-3 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-base md:text-lg font-bold text-primary mb-3 leading-snug">
                      {item.desc}
                    </p>

                    <p className="body-detail text-muted-foreground leading-relaxed font-normal">
                      {item.detail}
                    </p>
                  </div>

                  {/* Flow Arrow for sequential feel */}
                  <div className="pt-6 border-t border-white/10 mt-8 flex items-center justify-between text-sm text-muted-foreground font-mono">
                    <span>Phase {idx + 1} of 6</span>
                    {idx < JOURNEY_STEPS.length - 1 ? (
                      <ArrowRight className="w-5 h-5 text-primary opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all" />
                    ) : (
                      <span className="text-primary font-bold">You Decide</span>
                    )}
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="text-center">
          <Link href="#recovery-assessment">
            <Button size="lg" className="h-16 px-10 text-base md:text-lg font-bold uppercase tracking-wider bg-primary text-black hover:bg-primary/90 rounded-lg shadow-xl shadow-primary/20 premium-cta">
              Begin Step 01: Tell Us What Happened
              <ArrowRight className="ml-2.5 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}