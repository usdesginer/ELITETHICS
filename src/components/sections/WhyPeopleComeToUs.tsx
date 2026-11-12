'use client';

import { 
  MessageCircle, 
  FileCheck2, 
  ShieldCheck, 
  Lock, 
  HeartHandshake, 
  Compass,
  Building
} from 'lucide-react';
import { SectionReveal } from '@/components/ui/section-reveal';

const TRUST_PILLARS = [
  {
    title: 'Clear Communication',
    subtitle: 'No confusing technical language.',
    desc: 'We explain findings in plain, everyday English. You will never need a computer science degree to understand where your money went and what your options are.',
    icon: MessageCircle
  },
  {
    title: 'Evidence First',
    subtitle: 'We base our assessment on the information available.',
    desc: 'We do not guess or rely on unverified claims. We follow real transaction hashes, wire routes, and server records to build court-admissible proof.',
    icon: FileCheck2
  },
  {
    title: 'Honest Expectations',
    subtitle: 'We never promise a recovery we cannot guarantee.',
    desc: 'If your money was cashed out into an unreachable offshore jurisdiction, we tell you frankly. We will never give you false hope just to take a fee.',
    icon: ShieldCheck
  },
  {
    title: 'Privacy Conscious',
    subtitle: 'Your case information should be handled carefully and securely.',
    desc: 'All communications, financial records, and case briefs are handled under strict Delaware corporate confidentiality and 256-bit data encryption.',
    icon: Lock
  },
  {
    title: 'Human Support',
    subtitle: "You speak with people who understand what you're dealing with.",
    desc: 'You work directly with dedicated, empathetic investigators who understand the emotional distress of fraud, not automated bots or outsourced call centers.',
    icon: HeartHandshake
  },
  {
    title: 'Transparent Process',
    subtitle: 'You know what happens next before you proceed.',
    desc: 'Every phase of the recovery roadmap is clearly outlined upfront. There are no surprise fees, no hidden obligations, and no high-pressure tactics.',
    icon: Compass
  }
];

export function WhyPeopleComeToUs() {
  return (
    <section id="why-us" className="py-24 md:py-36 bg-background relative overflow-hidden border-b border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[700px] h-[700px] bg-primary/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionReveal className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-semibold mb-6 tracking-wider uppercase">
            <ShieldCheck className="w-4 h-4 text-primary" />
            Verified Standards
          </div>
          
          <h2 className="heading-section text-white uppercase tracking-tight mb-6">
            Why People Come to Us
          </h2>
          
          <p className="body-large text-muted-foreground leading-relaxed font-normal max-w-2xl mx-auto">
            When you have lost money, you need clarity, honesty, and professional capability. Here is the standard of care every client receives:
          </p>
        </SectionReveal>

        {/* 6 Trust Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto mb-16">
          {TRUST_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <SectionReveal key={pillar.title} delay={idx * 70} className="h-full">
                <div className="p-8 md:p-12 rounded-xl bg-card border border-white/10 hover:border-primary/50 card-hover-lift h-full flex flex-col justify-between group relative overflow-hidden">
                  <div>
                    <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors mb-8">
                      <Icon className="w-7 h-7" />
                    </div>

                    <h3 className="heading-card text-white uppercase tracking-tight mb-3 group-hover:text-primary transition-colors">
                      {pillar.title}
                    </h3>

                    <p className="text-base md:text-lg font-bold text-primary mb-3 leading-snug">
                      {pillar.subtitle}
                    </p>

                    <p className="body-detail text-muted-foreground leading-relaxed font-normal">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>

        {/* Delaware Entity Seal */}
        <SectionReveal className="max-w-3xl mx-auto p-8 md:p-10 bg-card border border-primary/30 rounded-xl text-center shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm md:text-base text-foreground/90 font-medium leading-relaxed">
            <Building className="w-6 h-6 text-primary shrink-0" />
            <span>
              <strong>Delaware Division of Corporations Registered:</strong> An officially incorporated US investigative entity subject to legal oversight and professional regulatory standards.
            </span>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

// Re-export as WhyChooseUs for compatibility
export { WhyPeopleComeToUs as WhyChooseUs };