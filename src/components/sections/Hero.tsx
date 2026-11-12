'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShieldCheck, ArrowRight, Mail } from 'lucide-react';
import { SectionReveal } from '@/components/ui/section-reveal';
import { supabase } from '@/lib/supabase';

export function Hero() {
  const [bgUrl, setBgUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchHeroBg();
  }, []);

  const fetchHeroBg = async () => {
    try {
      const { data } = supabase.storage
        .from('assets')
        .getPublicUrl('hero-bg.png');
      
      if (data?.publicUrl) {
        const res = await fetch(data.publicUrl, { method: 'HEAD' });
        if (res.ok) {
          setBgUrl(`${data.publicUrl}?t=${Date.now()}`);
        } else {
          setBgUrl(null);
        }
      }
    } catch {
      setBgUrl(null);
    }
  };

  return (
    <section className="relative pt-36 pb-24 md:pt-48 md:pb-36 overflow-hidden hero-gradient border-b border-white/10 min-h-[85vh] flex items-center">
      {/* Restrained Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-primary/[0.04] rounded-full blur-[180px] pointer-events-none" />

      {/* Optional Background Asset */}
      {bgUrl && (
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <Image 
            src={bgUrl} 
            alt="Hero Background" 
            fill 
            className="object-cover"
            priority
            onError={() => setBgUrl(null)}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background" />
        </div>
      )}

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <SectionReveal delay={100} duration={600} threshold={0}>
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs sm:text-sm font-semibold mb-8 tracking-wider">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Delaware Registered • Digital Fraud & Scam Recovery Specialists
            </div>
            
            {/* 64–80px Target Hero Heading (Clean, Serious, Calm) */}
            <h1 className="heading-hero font-headline font-bold text-white mb-6 md:mb-8 uppercase tracking-tight text-balance">
              Lost Money to a Scam? <br />
              <span className="text-white/90 font-medium">
                You May Still Have Options.
              </span>
            </h1>
            
            {/* 17–19px Target Body */}
            <p className="body-large text-muted-foreground mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed font-normal text-balance">
              We help people investigate scams, trace where their money went, gather court-ready evidence, and determine what recovery steps may be available.
            </p>
            
            {/* Prominent Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-10">
              <Link href="#recovery-assessment" className="w-full sm:w-auto">
                <Button size="lg" className="h-16 px-10 text-base md:text-lg bg-primary text-black hover:bg-primary/90 font-bold w-full shadow-2xl shadow-primary/25 group uppercase tracking-wider rounded-lg transition-all duration-300">
                  Start My Recovery Assessment
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </Button>
              </Link>
              <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
                <a href="mailto:investigator@elitethics.com" className="w-full">
                  <Button size="lg" variant="outline" className="h-16 px-8 md:px-10 text-base md:text-lg border-white/15 bg-card hover:bg-white/10 w-full font-semibold uppercase tracking-wider rounded-lg">
                    <Mail className="mr-2.5 w-5 h-5 text-primary" /> Speak With Our Team
                  </Button>
                </a>
              </div>
            </div>

            {/* Crucial Trust Anchor & Reassurance (Clean, Not Cramped) */}
            <div className="max-w-2xl mx-auto mb-10 p-5 md:p-6 rounded-lg bg-card border border-white/10 text-center shadow-xl">
              <p className="text-sm sm:text-base text-foreground/90 leading-relaxed font-medium">
                <span className="text-primary font-bold">Important Reassurance:</span> No recovery is ever guaranteed. We assess your situation honestly first and explain your realistic options before any commitment.
              </p>
            </div>

            {/* Trust Badges in Clean 14–16px Scale */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm md:text-base font-medium text-muted-foreground">
               <div className="flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-primary" /> Delaware Registered Entity
               </div>
               <div className="flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-primary" /> 100% Confidential
               </div>
               <div className="flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-primary" /> Free Preliminary Review
               </div>
               <div className="flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-primary" /> Zero False Promises
               </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}