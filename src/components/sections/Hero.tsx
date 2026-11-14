'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShieldCheck, ArrowRight, Mail, Copy, Check } from 'lucide-react';
import { SectionReveal } from '@/components/ui/section-reveal';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export function Hero() {
  const [bgUrl, setBgUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchHeroBg();
  }, []);

  const fetchHeroBg = async () => {
    // 1. Try local API route first (written by Admin Dashboard)
    try {
      const res = await fetch('/api/admin/hero-bg', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.exists && data.url) {
          setBgUrl(data.url);
          return;
        }
      }
    } catch {
      // Continue to next fallback
    }

    // 2. Try Supabase storage
    try {
      const { data } = supabase.storage
        .from('assets')
        .getPublicUrl('hero-bg.png');
      
      if (data?.publicUrl) {
        setBgUrl(`${data.publicUrl}?t=${Date.now()}`);
        return;
      }
    } catch {
      // Continue to fallback
    }

    // 3. Fallback to localStorage if cached
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('elitethics_hero_bg');
      if (cached) {
        setBgUrl(cached);
      }
    }
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('investigator@elitethics.com');
    setCopied(true);
    toast({
      title: "Email Copied",
      description: "investigator@elitethics.com copied to clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-36 pb-24 md:pt-48 md:pb-36 overflow-hidden hero-gradient border-b border-white/10 min-h-[85vh] flex items-center">
      {/* Restrained Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-primary/[0.04] rounded-full blur-[180px] pointer-events-none" />

      {/* Dynamic Background Asset (Custom uploaded from Admin) */}
      {bgUrl && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <Image 
            src={bgUrl} 
            alt="Hero Background" 
            fill 
            className="object-cover opacity-25 scale-105 transition-transform duration-1000"
            priority
            unoptimized
            onError={() => setBgUrl(null)}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F1318]/90 via-[#0F1318]/70 to-[#0F1318]" />
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
            <p className="body-large text-muted-foreground mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed font-normal text-balance">
              We help people investigate scams, trace where their money went, gather court-ready evidence, and determine what recovery steps may be available.
            </p>
            
            {/* Prominent Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-6">
              <Link href="#recovery-assessment" className="w-full sm:w-auto">
                <Button size="lg" className="h-16 px-10 text-base md:text-lg bg-primary text-black hover:bg-primary/90 font-bold w-full shadow-2xl shadow-primary/25 group uppercase tracking-wider rounded-lg transition-all duration-300">
                  Start My Recovery Assessment
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </Button>
              </Link>
              
              <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
                <a href="mailto:investigator@elitethics.com" className="w-full">
                  <Button size="lg" variant="outline" className="h-16 px-8 md:px-10 text-base md:text-lg border-white/15 bg-card hover:bg-white/10 w-full font-semibold uppercase tracking-wider rounded-lg group">
                    <Mail className="mr-2.5 w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    <span>Speak With Our Team</span>
                  </Button>
                </a>
              </div>
            </div>

            {/* BOLD OFFICIAL COMPANY EMAIL HERO BANNER */}
            <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 px-6 py-3 rounded-2xl bg-card/90 border border-primary/30 backdrop-blur-md shadow-2xl shadow-primary/10 mb-10 transition-all hover:border-primary/50">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Official Investigation Desk:
              </div>
              <div className="flex items-center gap-2">
                <a 
                  href="mailto:investigator@elitethics.com" 
                  className="text-base sm:text-lg text-primary hover:text-white font-black tracking-wide transition-colors group flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <strong className="font-extrabold text-primary group-hover:text-white underline underline-offset-4 decoration-primary/60">
                    investigator@elitethics.com
                  </strong>
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-md hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
                  title="Copy official email"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Crucial Trust Anchor & Reassurance (Clean, Not Cramped) */}
            <div className="max-w-2xl mx-auto mb-10 p-5 md:p-6 rounded-lg bg-card border border-white/10 text-center shadow-xl">
              <p className="text-sm sm:text-base text-foreground/90 leading-relaxed font-medium">
                <span className="text-primary font-bold">Important Reassurance:</span> No recovery is ever guaranteed. We assess your situation honestly first and explain your realistic options before any commitment. Send inquiries directly to our secure inbox at <strong className="text-white font-extrabold">investigator@elitethics.com</strong>.
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
