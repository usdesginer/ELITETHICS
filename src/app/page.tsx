'use client';

import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { WhatHappenedSection } from '@/components/sections/WhatHappenedSection';
import { RecoveryJourney } from '@/components/sections/RecoveryJourney';
import { ImmediateActionGuide } from '@/components/sections/ImmediateActionGuide';
import { EthicsComparison } from '@/components/sections/EthicsComparison';
import { WhyPeopleComeToUs } from '@/components/sections/WhyPeopleComeToUs';
import { SuccessStories } from '@/components/sections/SuccessStories';
import { TeamSection } from '@/components/sections/TeamSection';
import { IntelligenceReports } from '@/components/sections/IntelligenceReports';
import { FAQSection } from '@/components/sections/FAQSection';
import { AIGuidedTool } from '@/components/sections/AIGuidedTool';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { SectionReveal } from '@/components/ui/section-reveal';
import { 
  ArrowRight, 
  ShieldCheck, 
  Shield, 
  Lock, 
  Mail, 
  CheckCircle2,
  FileCheck2
} from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Navbar />
      
      {/* 1. Hero Section: Empathy, Identity and Honest Reassurance */}
      <Hero />

      {/* 2. Immediate "What Happened to Your Money?" (6 Large Self-Identification Cards) */}
      <WhatHappenedSection />

      {/* 3. Recovery Journey: From Scam to Recovery, One Step at a Time (6 Steps) */}
      <div id="process" className="scroll-mt-24" />
      <RecoveryJourney />

      {/* 4. Immediate Action Guide: If You've Just Been Scammed, Do These Things First */}
      <div id="preservation" className="scroll-mt-24" />
      <ImmediateActionGuide />

      {/* 5. Ethics Comparison: Fake Recovery Scammers vs Elitethics Standard */}
      <EthicsComparison />

      {/* 6. Huge Trust Section: "Why People Come to Us" (6 Simple Trust Cards) */}
      <WhyPeopleComeToUs />

      {/* 7. Delaware Registered Entity and Legitimacy Anchor */}
      <section id="about" className="py-24 md:py-36 bg-background relative overflow-hidden border-b border-white/5">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <SectionReveal className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-semibold mb-6 tracking-wider uppercase">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Legitimate Investigation & Recovery
            </div>
            
            <h2 className="heading-section text-white uppercase tracking-tight mb-6">
              Clear Facts. Real Investigators. Court-Admissible Evidence.
            </h2>
            
            <div className="space-y-6 body-large text-muted-foreground leading-relaxed font-normal">
              <p className="text-foreground font-semibold">
                Elitethics is a legally registered investigative firm incorporated in the State of Delaware, specializing in digital fraud investigation, cryptocurrency ledger tracing, and cross-border recovery preparation.
              </p>
              <p>
                We understand how distressing it is to lose money to online fraud. Our commitment is simple: absolute honesty, transparent methodologies, and relentless forensic pursuit of your funds. We trace the financial movement, compile actionable dossiers, and coordinate with international exchanges and law enforcement to seek recovery.
              </p>
              
              <div className="pt-8 flex flex-col items-center gap-3">
                <div className="w-16 h-px bg-primary/40 mb-2" />
                <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-card border border-white/10 text-primary font-bold text-xs sm:text-sm uppercase tracking-wider">
                  <Shield className="w-4 h-4 text-primary" />
                  Delaware Division of Corporations Registered • Verified File
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(223,117,54,0.04)_0%,transparent_70%)] pointer-events-none" />
      </section>

      {/* 8. Verified Case Studies and Resolutions */}
      <SuccessStories />

      {/* 9. Dedicated Human Specialists Team */}
      <TeamSection />

      {/* 10. Practical Fraud Advisories and Consumer Guides */}
      <IntelligenceReports />

      {/* 11. Frequently Asked Questions with Transparent Answers */}
      <FAQSection />

      {/* 12. The Assessment Intake Form */}
      <AIGuidedTool />

      {/* 13. Direct Contact CTA / Speak With Our Team */}
      <section className="py-24 md:py-36 border-t border-white/5 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <SectionReveal className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-semibold mb-6 tracking-wider uppercase">
              <Mail className="w-4 h-4 text-primary" />
              Direct Specialist Contact
            </div>
            
            <h2 className="heading-section text-white uppercase tracking-tight mb-6">
              Speak Directly With Our Investigators
            </h2>
            
            <p className="body-large text-muted-foreground max-w-2xl mx-auto leading-relaxed font-normal">
              Whether you are reporting a suspected scam, dealing with a drained wallet, or trying to trace payments made to a fake broker, our team is ready to evaluate your situation.
            </p>
          </SectionReveal>

          <div className="grid md:grid-cols-2 gap-8 md:gap-10 max-w-5xl mx-auto">
            <SectionReveal delay={100} className="h-full">
              <div className="p-8 md:p-12 rounded-xl bg-card border border-white/10 hover:border-primary/50 transition-all duration-300 card-hover-lift h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary font-headline font-bold text-lg flex items-center justify-center">01</span>
                    <h3 className="heading-card text-white uppercase tracking-tight">
                      Submit Your Case Online
                    </h3>
                  </div>
                  <p className="body-detail text-muted-foreground mb-8 leading-relaxed">
                    Complete our confidential intake assessment. Our forensic desk reviews your submission within 24 to 48 hours at zero cost or obligation.
                  </p>
                </div>
                <Link href="#recovery-assessment" className="w-full">
                  <Button size="lg" className="w-full h-14 md:h-16 bg-primary text-black hover:bg-primary/90 font-bold uppercase tracking-wider premium-cta rounded-xl">
                    Start My Recovery Assessment <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </SectionReveal>

            <SectionReveal delay={200} className="h-full">
              <div className="p-8 md:p-12 rounded-xl bg-card border border-primary/30 hover:border-primary/60 transition-all duration-300 card-hover-lift h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary font-headline font-bold text-lg flex items-center justify-center">02</span>
                    <h3 className="heading-card text-white uppercase tracking-tight">
                      Email Our Investigation Desk
                    </h3>
                  </div>
                  <p className="body-detail text-muted-foreground mb-8 leading-relaxed">
                    Send your transaction IDs, transfer receipts, and platform screenshots directly to our dedicated investigation inbox.
                  </p>
                </div>
                <div className="space-y-3 w-full">
                  <a href="mailto:investigator@elitethics.com" className="block w-full">
                    <Button size="lg" variant="outline" className="w-full h-14 md:h-16 border-white/15 bg-white/5 hover:bg-white/10 font-bold uppercase tracking-wider rounded-xl">
                      <Mail className="mr-2 w-5 h-5 text-primary" /> Email An Investigator
                    </Button>
                  </a>
                  <p className="text-xs text-center font-bold text-primary uppercase tracking-wider">
                    investigator@elitethics.com
                  </p>
                </div>
              </div>
            </SectionReveal>
          </div>

          <div className="mt-16 flex flex-col items-center gap-4">
            <div className="w-16 h-px bg-primary/30" />
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary" /> End-to-End Confidential
              </span>
              <span className="w-px h-3 bg-white/10" />
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" /> Delaware Registered Entity
              </span>
              <span className="w-px h-3 bg-white/10" />
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Free Preliminary Case Review
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 14. Footer */}
      <Footer />
    </main>
  );
}
