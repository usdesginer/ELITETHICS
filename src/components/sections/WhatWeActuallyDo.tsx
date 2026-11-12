'use client';

import { 
  MessageSquare, 
  Search, 
  GitMerge, 
  Compass, 
  FileCheck2,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SectionReveal } from '@/components/ui/section-reveal';
import { CryptoTraceVisual } from '@/components/ui/CryptoTraceVisual';

const STEPS = [
  {
    number: '1',
    title: 'Understand what happened',
    description: 'We listen to your story and review the information you provide.',
    icon: MessageSquare,
    detail: 'Every scam begins with a specific conversation, promise, or deceptive transaction. We take the time to understand your unique situation without judgment.'
  },
  {
    number: '2',
    title: 'Follow the money',
    description: 'Where possible, we examine payment and transaction records to understand where funds went.',
    icon: Search,
    detail: 'Whether funds were sent via cryptocurrency, bank wire, or payment cards, money leaves digital records. We follow the movement step-by-step.'
  },
  {
    number: '3',
    title: 'Connect the evidence',
    description: 'We compare the information available to identify useful connections.',
    icon: GitMerge,
    detail: 'We cross-reference wallet addresses, bank details, platform hosts, and communication channels to identify who received the funds.'
  },
  {
    number: '4',
    title: 'Identify possible next steps',
    description: 'We explain what options may be available based on the evidence.',
    icon: Compass,
    detail: 'We provide an honest assessment of whether the destination accounts can be reached, without making false promises or giving unrealistic guarantees.'
  },
  {
    number: '5',
    title: 'Help you prepare',
    description: 'We help organize relevant information for appropriate reporting, legal or recovery channels.',
    icon: FileCheck2,
    detail: 'We organize all records into clear, verified evidentiary dossiers ready for bank fraud desks, exchange compliance teams, and legal counsel.'
  }
];

export function WhatWeActuallyDo() {
  return (
    <section id="what-we-do" className="py-24 md:py-36 bg-card/20 border-b border-white/10 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionReveal className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-semibold mb-6 tracking-wider uppercase">
            <ShieldCheck className="w-4 h-4 text-primary" />
            Plain-English Process
          </div>
          <h2 className="heading-section text-white uppercase tracking-tight mb-6">
            What We Actually Do
          </h2>
          <p className="body-large text-muted-foreground leading-relaxed font-normal">
            No confusing buzzwords, and no mysterious automated black boxes. Here is exactly how our investigators examine your situation:
          </p>
        </SectionReveal>

        {/* 5 Human Steps Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === STEPS.length - 1;
            return (
              <SectionReveal 
                key={step.number} 
                delay={idx * 80} 
                className={`h-full ${isLast ? 'md:col-span-2 lg:col-span-2' : ''}`}
              >
                <div className="p-8 md:p-10 rounded-xl bg-card border border-white/10 hover:border-primary/50 card-hover-lift h-full flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-sm font-mono font-bold text-primary px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                        Step 0{step.number}
                      </span>
                    </div>

                    <h3 className="heading-card text-white uppercase tracking-tight mb-3 group-hover:text-primary transition-colors">
                      {step.number}. {step.title}
                    </h3>

                    <p className="text-base md:text-lg font-bold text-primary mb-3 leading-snug">
                      {step.description}
                    </p>

                    <p className="body-detail text-muted-foreground leading-relaxed font-normal">
                      {step.detail}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>

        {/* Visual Ledger Tracing Diagram (No generic hacker photos) */}
        <SectionReveal className="mb-16">
          <CryptoTraceVisual />
        </SectionReveal>

        {/* Reassurance Callout */}
        <SectionReveal className="max-w-3xl mx-auto p-8 md:p-10 bg-card border border-white/10 text-center rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-left space-y-1">
            <h4 className="heading-card text-white uppercase tracking-tight">
              Have questions about your situation?
            </h4>
            <p className="body-detail text-muted-foreground font-normal">
              Our initial preliminary review is confidential, free of charge, and carries zero obligation.
            </p>
          </div>
          <Link href="#recovery-assessment" className="shrink-0 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base bg-primary text-black hover:bg-primary/90 font-bold uppercase tracking-wider rounded-lg premium-cta">
              Start Free Assessment <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </SectionReveal>
      </div>
    </section>
  );
}
