'use client';

import { SectionReveal } from '@/components/ui/section-reveal';
import { 
  BookOpen, 
  ArrowRight,
  Calendar,
  Clock,
  ShieldCheck,
  FileText
} from 'lucide-react';
import Link from 'next/link';

interface ArticleGuide {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  keyTakeaway: string;
}

const ARTICLES: ArticleGuide[] = [
  {
    id: "guide-1",
    title: "Why Fake Brokers Demand 'Taxes' to Release Your Money",
    category: "Trading & Investment Scams",
    readTime: "4 min read",
    summary: "Scam platforms routinely invent 'release fees', 'anti-money laundering deposits', or 'tax payments' when you attempt to withdraw. Paying never releases your funds: it is simply another extraction phase.",
    keyTakeaway: "Never send additional money to withdraw funds. Legitimate brokers deduct fees directly from your account balance."
  },
  {
    id: "guide-2",
    title: "How Cryptocurrency Is Traced: Dispelling the Anonymity Myth",
    category: "Blockchain Forensics",
    readTime: "5 min read",
    summary: "Many victims believe stolen cryptocurrency is completely untraceable. In reality, the public blockchain permanently records every hop, allowing investigators to track funds directly into KYC-verified exchange deposit accounts.",
    keyTakeaway: "Blockchains are public ledgers. Scammers must eventually off-ramp funds at centralized exchanges where identities are verified."
  },
  {
    id: "guide-3",
    title: "The Anatomy of Romance Scams: From Trust to Financial Requests",
    category: "Relationship Fraud",
    readTime: "6 min read",
    summary: "Romance scammers build months of trust before introducing 'exclusive investment opportunities' or sudden emergencies. Understanding their psychological playbook helps preserve critical evidence early.",
    keyTakeaway: "Save all chat histories, photos, and payment receipts before confronting the person or closing accounts."
  }
];

export function IntelligenceReports() {
  return (
    <section id="guides" className="py-24 md:py-36 bg-background relative overflow-hidden border-b border-white/5">
      {/* Warm ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionReveal className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-semibold mb-6 tracking-wider uppercase">
            <BookOpen className="w-4 h-4 text-primary" />
            Victim Education & Guides
          </div>
          
          <h2 className="heading-section text-white uppercase tracking-tight mb-6">
            Practical Guides for Scam Victims
          </h2>
          
          <p className="body-large text-muted-foreground leading-relaxed font-normal max-w-2xl mx-auto">
            Clear, honest information to help you understand how scams work, avoid secondary fraud, and know what evidence matters most.
          </p>
        </SectionReveal>

        {/* 3 Large Article Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto">
          {ARTICLES.map((article, idx) => (
            <SectionReveal key={article.id} delay={idx * 100} duration={500} className="h-full">
              <div className="h-full p-8 md:p-10 rounded-xl bg-card border border-white/10 hover:border-primary/50 transition-all duration-300 card-hover-lift flex flex-col justify-between">
                <div>
                  {/* Category & Read Time */}
                  <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                      {article.category}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> {article.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="heading-card text-white uppercase tracking-tight mb-4 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>

                  {/* Summary */}
                  <p className="body-detail text-muted-foreground leading-relaxed mb-6">
                    {article.summary}
                  </p>

                  {/* Key Takeaway Box */}
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 mb-6">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
                      Key Takeaway:
                    </p>
                    <p className="text-xs text-white/90 leading-relaxed font-medium">
                      {article.keyTakeaway}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-primary">
                  <span>Educational Guide</span>
                  <FileText className="w-4 h-4 text-primary" />
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
