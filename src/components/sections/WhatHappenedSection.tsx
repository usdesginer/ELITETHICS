'use client';

import Link from 'next/link';
import { 
  CreditCard, 
  Wallet, 
  TrendingUp, 
  Heart, 
  Coins, 
  CandlestickChart, 
  ArrowRight,
  ShieldCheck,
  HelpCircle
} from 'lucide-react';
import { SectionReveal } from '@/components/ui/section-reveal';

interface ScamCardItem {
  id: string;
  emoji: string;
  title: string;
  question: string;
  message: string;
  href: string;
  ctaText: string;
  icon: any;
  tag: string;
}

const WHAT_HAPPENED_CARDS: ScamCardItem[] = [
  {
    id: 'loan',
    emoji: '💳',
    title: 'Loan Scam',
    question: 'Were you promised a loan but asked to pay fees first?',
    message: 'We trace payment records to fake lenders, identify receiving accounts, and help you take recovery action.',
    href: '/loan-scam-recovery',
    ctaText: 'Explore Loan Recovery',
    icon: CreditCard,
    tag: 'Advance-Fee Loans'
  },
  {
    id: 'wallet',
    emoji: '👛',
    title: 'Wallet Scam',
    question: 'Did someone gain access to your wallet or convince you to send funds?',
    message: 'We examine the transaction history to understand where the money moved and locate destination exchange accounts.',
    href: '/wallet-scam-recovery',
    ctaText: 'Explore Wallet Recovery',
    icon: Wallet,
    tag: 'Unauthorized Access'
  },
  {
    id: 'investment',
    emoji: '📈',
    title: 'Investment Scam',
    question: 'Were you promised high returns from an investment that turned out to be fake?',
    message: 'We examine deposit paths into fake platforms and help you understand your legal and asset freeze options.',
    href: '/investment-scam-recovery',
    ctaText: 'Explore Investment Recovery',
    icon: TrendingUp,
    tag: 'Fake Platforms'
  },
  {
    id: 'romance',
    emoji: '❤️',
    title: 'Romance Scam',
    question: 'Did someone build a relationship with you and eventually ask for money?',
    message: 'We trace the financial trails and communication records left by organized relationship fraud groups.',
    href: '/romance-scam-recovery',
    ctaText: 'Explore Romance Recovery',
    icon: Heart,
    tag: 'Relationship Fraud'
  },
  {
    id: 'crypto',
    emoji: '₿',
    title: 'Cryptocurrency Scam',
    question: 'Did you send cryptocurrency to a scammer, fake platform or unknown wallet?',
    message: 'We examine the available transaction information and help you understand your options.',
    href: '/cryptocurrency-scam-recovery',
    ctaText: 'Explore Crypto Recovery',
    icon: Coins,
    tag: 'Stolen Crypto'
  },
  {
    id: 'trading',
    emoji: '📊',
    title: 'Trading Scam',
    question: 'Did a trading platform prevent you from withdrawing your money?',
    message: 'We audit fake broker platforms, trace payment gateways, and prepare evidence for bank chargebacks and recalls.',
    href: '/trading-scam-recovery',
    ctaText: 'Explore Trading Recovery',
    icon: CandlestickChart,
    tag: 'Blocked Withdrawals'
  }
];

export function WhatHappenedSection() {
  return (
    <section id="what-happened" className="py-24 md:py-36 bg-card/25 border-b border-white/10 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionReveal className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-semibold mb-6 tracking-wider uppercase">
            <HelpCircle className="w-4 h-4 text-primary" />
            Clear Situation Guide
          </div>
          
          {/* Section heading: 42–52px target (Clean, Serious, Calm) */}
          <h2 className="heading-section text-white uppercase tracking-tight mb-6">
            What Happened to Your Money?
          </h2>
          
          {/* Body: 17–19px target */}
          <p className="body-large text-muted-foreground leading-relaxed font-normal max-w-2xl mx-auto">
            Select the situation that best describes what occurred. Each situation has a clear path forward, and our investigators can examine what happened.
          </p>
        </SectionReveal>

        {/* The 6 Large Spacious Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto">
          {WHAT_HAPPENED_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <SectionReveal key={card.id} delay={idx * 60} duration={400} className="h-full">
                <Link 
                  href={card.href}
                  className="group block h-full p-8 md:p-12 rounded-xl bg-card border border-white/10 hover:border-primary/60 card-hover-lift flex flex-col justify-between"
                >
                  <div>
                    {/* Top row: Emoji & Category Tag */}
                    <div className="flex items-center justify-between gap-4 mb-8">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl select-none" role="img" aria-label={card.title}>
                          {card.emoji}
                        </span>
                        <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                        {card.tag}
                      </span>
                    </div>

                    {/* Card heading: 22–26px */}
                    <h3 className="heading-card text-white uppercase tracking-tight mb-4 group-hover:text-primary transition-colors">
                      {card.title}
                    </h3>

                    {/* The Direct Question: 18–20px bold */}
                    <p className="text-lg md:text-xl text-white font-semibold leading-snug mb-4">
                      "{card.question}"
                    </p>

                    {/* One Clear Message: 16–17px */}
                    <p className="body-detail text-muted-foreground leading-relaxed mb-8">
                      {card.message}
                    </p>
                  </div>

                  {/* Immediate Action Link */}
                  <div className="pt-6 border-t border-white/10 flex items-center justify-between text-base font-bold text-primary group-hover:text-primary transition-colors">
                    <span>{card.ctaText}</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </Link>
              </SectionReveal>
            );
          })}
        </div>

        {/* Reassurance */}
        <div className="mt-16 text-center">
          <p className="body-detail text-muted-foreground flex items-center justify-center gap-2 font-medium">
            <ShieldCheck className="w-5 h-5 text-primary" />
            Every situation is handled with strict confidentiality by Delaware-registered forensic investigators.
          </p>
        </div>
      </div>
    </section>
  );
}