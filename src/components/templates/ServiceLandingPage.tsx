'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionReveal } from '@/components/ui/section-reveal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { aiGuidedRecoveryPreparation } from '@/ai/flows/ai-guided-recovery-preparation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  ShieldCheck, 
  ArrowRight, 
  Mail, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  FileText, 
  ChevronRight, 
  Clock, 
  HelpCircle, 
  Loader2, 
  Home, 
  Heart, 
  Search, 
  ArrowDown,
  Wallet,
  ArrowRightLeft,
  Layers,
  GitFork,
  Building2,
  FileCheck,
  FileCheck2
} from 'lucide-react';
import { CryptoTraceVisual } from '@/components/ui/CryptoTraceVisual';

function getFlowchartIcon(idx: number, iconName?: string) {
  if (iconName === 'wallet' || idx === 0) return Wallet;
  if (iconName === 'arrow' || idx === 1) return ArrowRightLeft;
  if (iconName === 'layers' || idx === 2) return Layers;
  if (iconName === 'fork' || idx === 3) return GitFork;
  if (iconName === 'building' || idx === 4) return Building2;
  return FileCheck;
}

export interface ServicePageData {
  slug: string;
  emoji: string;
  title: string;
  subtitle: string;
  heroHeadline: string;
  heroDescription?: string;
  heroBulletIntro?: string;
  heroBullets?: string[];
  heroCtaText?: string;
  categoryTag: string;
  intakeCategoryName: string;
  defaultLossEstimate?: string;
  
  // Custom Empathy & Human Tone (e.g., Romance Scam)
  empathyCard?: {
    heading: string;
    text: string;
  };

  // Critical Advice Banner (e.g., Investment & Trading Scam warning)
  adviceBanner?: {
    heading: string;
    text: string;
  };

  // Plain-English Explainer (e.g., Wallet: "We look at the trail")
  trailExplainer?: {
    badge: string;
    title: string;
    tagline: string;
    jargonReplaced: {
      technicalTerm: string;
      plainEnglish: string;
    };
    explanation: string;
  };

  // Visual Flowchart Diagram (e.g., Cryptocurrency Scam)
  visualFlowchart?: {
    title: string;
    subtitle: string;
    steps: {
      number: string;
      label: string;
      detail: string;
      iconName?: string;
    }[];
  };

  // Specific Scam Types / Scenarios Cards (e.g., 7 Loan Scam cards, 6 Investment questions)
  scamTypeCards?: {
    title: string;
    subtitle: string;
    cards: {
      title: string;
      desc: string;
      tag?: string;
    }[];
  };

  mechanics?: {
    hookTitle: string;
    hookDesc: string;
    extractionTitle: string;
    extractionDesc: string;
    lockoutTitle: string;
    lockoutDesc: string;
  };

  warningSigns?: string[];

  recoverySteps: {
    title: string;
    desc: string;
  }[];

  evidenceToSave: string[];
  mistakesToAvoid: string[];

  faqs: {
    q: string;
    a: string;
  }[];
}

export function ServiceLandingPage({ data }: { data: ServicePageData }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [caseId, setCaseId] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    estimatedLoss: data.defaultLossEstimate || '$10,000 - $50,000',
    description: ''
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.description) {
      toast({
        variant: 'destructive',
        title: 'Missing Required Fields',
        description: 'Please provide your name, email address, and a brief description of what occurred.'
      });
      return;
    }

    setLoading(true);
    const generatedId = `ETH-${Math.floor(10000 + Math.random() * 90000)}`;
    setCaseId(generatedId);

    try {
      const narrative = `
SERVICE: ${data.intakeCategoryName}
ESTIMATED LOSS: ${formData.estimatedLoss}
NAME: ${formData.name}
EMAIL: ${formData.email}
PHONE: ${formData.phone}
COUNTRY: ${formData.country}
NARRATIVE: ${formData.description}
      `.trim();

      await supabase.from('cases').insert([{
        case_id: generatedId,
        case_type: data.intakeCategoryName,
        user_name: formData.name,
        user_email: formData.email,
        user_phone: formData.phone,
        user_country: formData.country,
        description: `[${data.intakeCategoryName} | Loss: ${formData.estimatedLoss}]\n${formData.description}`,
        status: 'Review Pending',
        risk_level: 'Initial Intake'
      }]);

      aiGuidedRecoveryPreparation({ initialProblemDescription: narrative })
        .then(aiOutput => {
          supabase.from('cases').update({ result_data: aiOutput }).eq('case_id', generatedId);
        })
        .catch(err => console.error('AI intake evaluation background error:', err));

      setFormSubmitted(true);
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Transmission Error',
        description: err.message || 'Unable to submit your case. Please try emailing us directly.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-36 pb-24 md:pt-48 md:pb-36 overflow-hidden hero-gradient border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1.5 font-medium">
              <Home className="w-4 h-4" /> Home
            </Link>
            <span>/</span>
            <Link href="/#what-happened" className="hover:text-primary transition-colors font-medium">
              Scam Recovery
            </Link>
            <span>/</span>
            <span className="text-primary font-semibold">{data.title}</span>
          </div>

          <div className="max-w-5xl">
            <SectionReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs sm:text-sm font-semibold mb-8 tracking-wider">
                <ShieldCheck className="w-4 h-4 text-primary" />
                Delaware Registered • Specialized {data.categoryTag} Desk
              </div>

              <div className="flex items-start sm:items-center gap-5 mb-6">
                <span className="text-5xl md:text-7xl select-none" role="img" aria-label={data.title}>
                  {data.emoji}
                </span>
                <h1 className="heading-hero font-headline font-bold text-white uppercase tracking-tight">
                  {data.heroHeadline}
                </h1>
              </div>

              {data.heroDescription && (
                <p className="body-large text-muted-foreground leading-relaxed font-normal mb-8 max-w-3xl">
                  {data.heroDescription}
                </p>
              )}

              {/* Bullet Points in Hero (e.g., Loan Scam specifics) */}
              {data.heroBulletIntro && (
                <p className="text-base sm:text-lg font-bold text-white mb-4">
                  {data.heroBulletIntro}
                </p>
              )}
              {data.heroBullets && data.heroBullets.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-10 max-w-3xl">
                  {data.heroBullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-3 p-4 bg-card border border-white/10 rounded-lg text-sm sm:text-base text-foreground/90 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 mb-10">
                <a href="#assessment-form" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto h-16 px-10 text-base md:text-lg bg-primary text-black hover:bg-primary/90 font-bold uppercase tracking-wider rounded-lg shadow-2xl shadow-primary/20 premium-cta">
                    {data.heroCtaText || "Request Free Case Review"}
                    <ArrowRight className="ml-2.5 w-5 h-5" />
                  </Button>
                </a>
                <a href="mailto:investigator@elitethics.com" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto h-16 px-8 md:px-10 text-base md:text-lg border-white/15 bg-card hover:bg-white/10 font-bold uppercase tracking-wider rounded-lg group">
                    <Mail className="mr-2.5 w-5 h-5 text-primary group-hover:scale-110 transition-transform" /> 
                    <span className="font-semibold text-muted-foreground mr-1.5">Desk:</span> 
                    <strong className="font-extrabold text-white group-hover:text-primary">investigator@elitethics.com</strong>
                  </Button>
                </a>
              </div>

              {/* Crucial Trust Disclaimer */}
              <div className="p-6 md:p-8 bg-card border border-white/10 rounded-xl max-w-3xl shadow-xl">
                <p className="text-sm sm:text-base text-foreground/90 leading-relaxed font-medium">
                  <span className="text-primary font-bold">Important Reassurance:</span> No recovery is guaranteed. We review your case details confidentially first and explain your realistic legal and tracing options before any commitment.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Human Empathy Section (e.g., Romance Scam) */}
      {data.empathyCard && (
        <section className="py-14 bg-card/60 border-b border-primary/20 relative">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <SectionReveal>
              <div className="p-8 md:p-12 bg-card border-l-4 border-primary border-y border-r border-white/10 rounded-none shadow-2xl relative overflow-hidden">
                <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4">
                  <Heart className="w-4 h-4 text-primary" />
                  {data.empathyCard.heading}
                </div>
                <p className="text-lg sm:text-xl md:text-2xl text-white font-medium leading-relaxed italic">
                  "{data.empathyCard.text}"
                </p>
              </div>
            </SectionReveal>
          </div>
        </section>
      )}

      {/* Critical Advice Warning Banner (e.g., Investment / Trading Scam warning) */}
      {data.adviceBanner && (
        <section className="py-10 bg-amber-950/20 border-b border-amber-500/30">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <SectionReveal>
              <div className="p-6 md:p-8 bg-card border border-amber-500/40 rounded-none flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg md:text-xl font-headline font-bold text-amber-200 uppercase tracking-tight mb-2">
                    {data.adviceBanner.heading}
                  </h3>
                  <p className="text-sm md:text-base text-foreground/90 leading-relaxed font-medium">
                    {data.adviceBanner.text}
                  </p>
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>
      )}

      {/* Plain-English Explainer (e.g., Wallet Scam: "We look at the trail") */}
      {data.trailExplainer && (
        <section className="py-20 md:py-28 bg-card/20 border-b border-white/5">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <SectionReveal className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-3 uppercase tracking-wider">
                <Search className="w-3.5 h-3.5" />
                {data.trailExplainer.badge}
              </div>
              <h2 className="text-3xl md:text-5xl font-headline font-bold text-white uppercase tracking-tight mb-3">
                {data.trailExplainer.title}
              </h2>
              <p className="text-base text-muted-foreground font-normal">
                {data.trailExplainer.tagline}
              </p>
            </SectionReveal>

            <SectionReveal delay={100}>
              <div className="p-8 md:p-10 bg-card border border-white/10 rounded-none space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 border-b border-white/10">
                  <div className="p-4 bg-red-950/20 border border-red-500/30 space-y-1">
                    <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Confusing Technical Jargon</p>
                    <p className="text-sm text-red-200/90 line-through font-mono">{data.trailExplainer.jargonReplaced.technicalTerm}</p>
                  </div>
                  <div className="p-4 bg-primary/10 border border-primary/40 space-y-1">
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest">What We Actually Do</p>
                    <p className="text-sm text-white font-bold">{data.trailExplainer.jargonReplaced.plainEnglish}</p>
                  </div>
                </div>
                <p className="text-base text-foreground/90 leading-relaxed font-normal">
                  {data.trailExplainer.explanation}
                </p>
              </div>
            </SectionReveal>
          </div>
        </section>
      )}

      {/* Visual Flowchart / Interactive Ledger Diagram */}
      {data.visualFlowchart && (
        <section className="py-20 md:py-28 bg-card/25 border-b border-white/5">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <SectionReveal className="text-center mb-16 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                Visual Process Map
              </div>
              <h3 className="heading-section text-white uppercase tracking-tight mb-4">
                {data.visualFlowchart.title}
              </h3>
              <p className="body-large text-muted-foreground font-normal">
                {data.visualFlowchart.subtitle}
              </p>
            </SectionReveal>

            {/* If cryptocurrency or wallet recovery, render interactive diagram */}
            {(data.slug === 'cryptocurrency-scam-recovery' || data.slug === 'wallet-scam-recovery') ? (
              <CryptoTraceVisual />
            ) : (
              <div className="space-y-4 max-w-2xl mx-auto">
                {data.visualFlowchart.steps.map((step, idx) => {
                  const Icon = getFlowchartIcon(idx, step.iconName);
                  return (
                    <div key={idx}>
                      <SectionReveal delay={idx * 70}>
                        <div className="p-6 md:p-8 rounded-xl bg-card border border-white/10 hover:border-primary/50 transition-colors flex items-center justify-between gap-4 card-hover-lift">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                              <Icon className="w-6 h-6" />
                            </div>
                            <div>
                              <div className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
                                Step {step.number}
                              </div>
                              <h4 className="heading-card text-white uppercase tracking-tight mb-1">
                                {step.label}
                              </h4>
                              <p className="body-detail text-muted-foreground font-normal">
                                {step.detail}
                              </p>
                            </div>
                          </div>
                          <span className="text-xs font-mono text-primary font-bold">0{step.number}</span>
                        </div>
                      </SectionReveal>

                      {idx < data.visualFlowchart!.steps.length - 1 && (
                        <div className="flex justify-center py-2">
                          <ArrowDown className="w-5 h-5 text-primary/70 animate-bounce" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Specific Scam Types / Scenarios Cards Grid (e.g., 7 Loan Scam cards, 6 Investment questions) */}
      {data.scamTypeCards && (
        <section className="py-20 md:py-28 bg-background border-b border-white/5">
          <div className="container mx-auto px-4 md:px-6">
            <SectionReveal className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-xs font-black uppercase tracking-[0.25em] text-primary mb-3">
                Scenarios & Categories
              </h2>
              <h3 className="text-3xl md:text-5xl font-headline font-bold text-white uppercase tracking-tight mb-4">
                {data.scamTypeCards.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground font-normal">
                {data.scamTypeCards.subtitle}
              </p>
            </SectionReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {data.scamTypeCards.cards.map((card, idx) => (
                <SectionReveal key={idx} delay={idx * 50} className="h-full">
                  <div className="p-6 md:p-8 bg-card border border-white/10 hover:border-primary/40 transition-all h-full flex flex-col justify-between">
                    <div>
                      {card.tag && (
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 mb-4 border border-primary/20">
                          {card.tag}
                        </span>
                      )}
                      <h4 className="text-lg md:text-xl font-headline font-bold text-white uppercase tracking-tight mb-3">
                        {card.title}
                      </h4>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-normal">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mechanics Breakdown (if provided) */}
      {data.mechanics && (
        <section className="py-20 md:py-28 bg-card/20 border-b border-white/5">
          <div className="container mx-auto px-4 md:px-6">
            <SectionReveal className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-xs font-black uppercase tracking-[0.25em] text-primary mb-3">
                The Fraud Anatomy
              </h2>
              <h3 className="text-3xl md:text-5xl font-headline font-bold text-white uppercase tracking-tight mb-4">
                How This Scam Works
              </h3>
              <p className="text-sm md:text-base text-muted-foreground font-normal">
                Understanding the psychological and technical methods used by the perpetrators is the first step in locating your assets.
              </p>
            </SectionReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <SectionReveal delay={100} className="h-full">
                <div className="p-8 rounded-none bg-card border border-white/10 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-none bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm mb-6">
                      01
                    </div>
                    <h4 className="text-xl font-headline font-bold text-white uppercase tracking-tight mb-3">
                      {data.mechanics.hookTitle}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed font-normal">
                      {data.mechanics.hookDesc}
                    </p>
                  </div>
                </div>
              </SectionReveal>

              <SectionReveal delay={200} className="h-full">
                <div className="p-8 rounded-none bg-card border border-white/10 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-none bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm mb-6">
                      02
                    </div>
                    <h4 className="text-xl font-headline font-bold text-white uppercase tracking-tight mb-3">
                      {data.mechanics.extractionTitle}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed font-normal">
                      {data.mechanics.extractionDesc}
                    </p>
                  </div>
                </div>
              </SectionReveal>

              <SectionReveal delay={300} className="h-full">
                <div className="p-8 rounded-none bg-card border border-white/10 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-none bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm mb-6">
                      03
                    </div>
                    <h4 className="text-xl font-headline font-bold text-white uppercase tracking-tight mb-3">
                      {data.mechanics.lockoutTitle}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed font-normal">
                      {data.mechanics.lockoutDesc}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>
      )}

      {/* Warning Signs Section (if provided) */}
      {data.warningSigns && data.warningSigns.length > 0 && (
        <section className="py-20 md:py-28 bg-background border-b border-white/5">
          <div className="container mx-auto px-4 md:px-6">
            <SectionReveal className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-xs font-black uppercase tracking-[0.25em] text-primary mb-3">
                Did This Happen To You?
              </h2>
              <h3 className="text-3xl md:text-5xl font-headline font-bold text-white uppercase tracking-tight mb-4">
                Common Warning Signs
              </h3>
              <p className="text-sm md:text-base text-muted-foreground font-normal">
                If you recognize any of these patterns, your situation is typical of organized digital fraud.
              </p>
            </SectionReveal>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.warningSigns.map((sign, idx) => (
                <SectionReveal key={idx} delay={idx * 60}>
                  <div className="p-5 bg-card border border-white/10 flex items-start gap-3.5 hover:border-primary/40 transition-colors">
                    <AlertTriangle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground/90 font-medium leading-relaxed">
                      {sign}
                    </p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section: Our 4-Step Recovery Plan */}
      <section className="py-20 md:py-28 bg-card/30 border-b border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <SectionReveal className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-black uppercase tracking-[0.25em] text-primary mb-3">
              Our Methodology
            </h2>
            <h3 className="text-3xl md:text-5xl font-headline font-bold text-white uppercase tracking-tight mb-4">
              How We Investigate & Trace
            </h3>
            <p className="text-sm md:text-base text-muted-foreground font-normal">
              We employ forensic ledger reconstruction, subpoena preparation, and direct coordination with exchange compliance desks.
            </p>
          </SectionReveal>

          <div className="max-w-5xl mx-auto space-y-4">
            {data.recoverySteps.map((step, idx) => (
              <SectionReveal key={idx} delay={idx * 80}>
                <div className="p-6 md:p-8 bg-card border border-white/10 flex flex-col sm:flex-row items-start gap-5 hover:border-primary/40 transition-colors">
                  <div className="w-12 h-12 rounded-none bg-primary/10 border border-primary/20 text-primary font-headline font-bold text-lg flex items-center justify-center shrink-0">
                    0{idx + 1}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg md:text-xl font-headline font-bold text-white uppercase tracking-tight">
                      {step.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Evidence Preservation Guide */}
      <section className="py-20 md:py-28 bg-background border-b border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <SectionReveal className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-black uppercase tracking-[0.25em] text-primary mb-3">
              Immediate Checklist
            </h2>
            <h3 className="text-3xl md:text-5xl font-headline font-bold text-white uppercase tracking-tight mb-4">
              What to Do Right Now
            </h3>
            <p className="text-sm md:text-base text-muted-foreground font-normal">
              What you do in the first hours after discovering a scam significantly impacts the investigability of your case.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* What to save */}
            <div className="p-6 md:p-8 bg-card border border-white/10">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                <h4 className="text-lg font-headline font-bold text-white uppercase tracking-tight">
                  Critical Evidence to Preserve
                </h4>
              </div>
              <div className="space-y-3">
                {data.evidenceToSave.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/80 font-medium">
                    <span className="text-primary font-bold">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What NOT to do */}
            <div className="p-6 md:p-8 bg-card border border-red-500/20 bg-red-950/10">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-red-500/20">
                <XCircle className="w-6 h-6 text-red-400" />
                <h4 className="text-lg font-headline font-bold text-red-200 uppercase tracking-tight">
                  Dangerous Actions to Avoid
                </h4>
              </div>
              <div className="space-y-3">
                {data.mistakesToAvoid.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-red-200/80 font-medium">
                    <span className="text-red-400 font-bold">✕</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Scam-Specific FAQs */}
      <section className="py-20 md:py-28 bg-card/20 border-b border-white/5">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-xs font-black uppercase tracking-[0.25em] text-primary mb-3">
              Clear Questions & Answers
            </h2>
            <h3 className="text-3xl md:text-5xl font-headline font-bold text-white uppercase tracking-tight mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-sm md:text-base text-muted-foreground font-normal">
              Transparent answers regarding recovery feasibility, costs, and timelines.
            </p>
          </SectionReveal>

          <Accordion type="single" collapsible className="space-y-4">
            {data.faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border border-white/10 bg-card px-6 py-2 rounded-none">
                <AccordionTrigger className="text-base sm:text-lg font-headline font-bold text-white hover:text-primary transition-colors text-left py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4 pt-1 font-normal">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Section: Dedicated Intake Assessment Form */}
      <section id="assessment-form" className="py-20 md:py-32 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
          {!formSubmitted ? (
            <SectionReveal>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-semibold mb-6 tracking-wider uppercase">
                  <Lock className="w-4 h-4 text-primary" /> Confidential Case Review
                </div>
                <h3 className="heading-section text-white uppercase tracking-tight mb-4">
                  Request Your Free {data.title} Evaluation
                </h3>
                <p className="body-large text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Submit your details for a preliminary forensic review. Our investigation team evaluates submissions within 24–48 hours at zero cost or obligation.
                </p>
              </div>

              {/* Next Steps & Reassurance Boxes */}
              <div className="max-w-3xl mx-auto space-y-4 mb-8">
                <div className="p-5 rounded-xl bg-card border border-white/10 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-primary" /> Next Step:
                  </h4>
                  <p className="body-detail text-white/95 leading-relaxed font-medium">
                    Based on the information you've provided, the next step is to review the available evidence and determine what recovery options may exist.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" /> Important Honesty Notice:
                  </h4>
                  <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-medium">
                    Important: No legitimate recovery service can guarantee that lost funds will be recovered. Recovery depends on the circumstances, available evidence, payment method, timing and other factors.
                  </p>
                </div>
              </div>

              <div className="p-8 md:p-12 rounded-xl bg-card border border-white/10 max-w-3xl mx-auto shadow-2xl">
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-foreground/80 uppercase tracking-wider">
                        Full Name *
                      </Label>
                      <Input
                        placeholder="e.g. John Smith"
                        className="bg-background border-white/10 rounded-xl h-14 text-sm"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-foreground/80 uppercase tracking-wider">
                        Email Address *
                      </Label>
                      <Input
                        type="email"
                        placeholder="e.g. john@example.com"
                        className="bg-background border-white/10 rounded-xl h-14 text-sm"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-foreground/80 uppercase tracking-wider">
                        Phone or WhatsApp
                      </Label>
                      <Input
                        placeholder="+1 (555) 000-0000"
                        className="bg-background border-white/10 rounded-xl h-14 text-sm"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-foreground/80 uppercase tracking-wider">
                        Approximate Amount Lost
                      </Label>
                      <select
                        value={formData.estimatedLoss}
                        onChange={e => setFormData({ ...formData, estimatedLoss: e.target.value })}
                        className="w-full bg-background border border-white/10 rounded-xl h-14 px-4 text-xs md:text-sm text-white focus:outline-none focus:border-primary"
                      >
                        <option value="Under $1,000">Under $1,000</option>
                        <option value="$1,000–$10,000">$1,000–$10,000</option>
                        <option value="$10,000–$50,000">$10,000–$50,000</option>
                        <option value="$50,000–$100,000">$50,000–$100,000</option>
                        <option value="$100,000+">$100,000+</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-foreground/80 uppercase tracking-wider">
                      Case Narrative (Platform names, dates, amounts, transaction hashes) *
                    </Label>
                    <Textarea
                      placeholder="Please describe what happened in your own words. Include dates, platform URLs, payment methods used, and any transaction hashes or recipient addresses if available."
                      className="min-h-[140px] bg-background border-white/10 rounded-xl text-sm leading-relaxed p-4"
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      required
                    />
                  </div>

                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl text-xs text-foreground/80 leading-relaxed">
                    <p className="font-semibold text-white mb-0.5">Strict Confidentiality:</p>
                    All submissions are handled securely in accordance with US Delaware privacy laws. Your information is never sold or shared with third parties.
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-16 text-base font-bold uppercase tracking-wider bg-primary text-black hover:bg-primary/90 premium-cta rounded-xl shadow-xl shadow-primary/20"
                  >
                    {loading ? (
                      <div className="flex items-center gap-3">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Transmitting Secure Case Brief...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>{data.heroCtaText || "Submit For Free Case Evaluation"}</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    )}
                  </Button>

                  <div className="text-center pt-2">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Or email our team directly: <a href="mailto:investigator@elitethics.com" className="text-primary hover:underline"><strong className="font-extrabold text-primary">investigator@elitethics.com</strong></a>
                    </p>
                  </div>
                </form>
              </div>
            </SectionReveal>
          ) : (
            <SectionReveal>
              <div className="text-center py-16 bg-card border border-white/10 p-8 md:p-16 max-w-2xl mx-auto">
                <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-3xl font-headline font-bold text-white uppercase tracking-tight mb-2">
                  Case Brief Submitted
                </h3>
                <p className="text-primary text-xs font-bold uppercase tracking-widest mb-6">
                  Reference ID: {caseId}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto mb-8 font-normal">
                  Thank you for submitting your case details. A dedicated investigator from our {data.title} desk will review your narrative and get in touch via email within 24–48 hours.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button onClick={() => setFormSubmitted(false)} variant="outline" className="rounded-none h-12 uppercase tracking-wider text-xs">
                    Submit Additional Details
                  </Button>
                  <Link href="/">
                    <Button className="bg-primary text-black hover:bg-primary/90 rounded-none h-12 uppercase tracking-wider text-xs font-bold">
                      Return to Homepage
                    </Button>
                  </Link>
                </div>
              </div>
            </SectionReveal>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}