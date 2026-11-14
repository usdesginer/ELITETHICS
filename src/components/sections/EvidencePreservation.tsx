'use client';

import { SectionReveal } from '@/components/ui/section-reveal';
import { 
  ShieldAlert, 
  XCircle, 
  CheckCircle2, 
  Save, 
  AlertTriangle,
  Lock,
  Mail,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const PRESERVATION_PROTOCOLS = [
  {
    title: "What You Should Save Right Now",
    icon: Save,
    items: [
      { label: "Transaction Hashes & Receipts", desc: "Crypto transfer IDs (TxIDs), wallet addresses, or bank wire confirmations." },
      { label: "Full Chat Logs & Emails", desc: "Screenshots of all WhatsApp, Telegram, or website chat conversations with the perpetrators." },
      { label: "Website Links & Names", desc: "The exact platform URLs, domain names, and referral codes used." },
      { label: "Account Balance Screenshots", desc: "Images showing your account balance, deposit history, or 'rejected' withdrawal errors." }
    ]
  },
  {
    title: "What You Must NOT Do",
    icon: XCircle,
    variant: "destructive",
    items: [
      { label: "Do Not Confront The Scammer", desc: "Don't warn them you are investigating: they may delete chat logs and quickly move funds." },
      { label: "Never Pay 'Release Taxes' or Fees", desc: "Scammers often ask for 10%-20% more to 'release' funds. This is always a secondary trap." },
      { label: "Do Not Delete Apps or Accounts", desc: "Keep all app installations and message threads intact as digital forensic evidence." },
      { label: "Beware Social Media 'Hackers'", desc: "Anyone on Instagram, X, or Telegram claiming they can 'hack' your money back in minutes is another scammer." }
    ]
  }
];

export function EvidencePreservation() {
  return (
    <section id="preservation" className="py-24 md:py-32 bg-background relative overflow-hidden border-y border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/3">
            <SectionReveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-[10px] font-bold mb-6 tracking-[0.25em] uppercase">
                <ShieldAlert className="w-3.5 h-3.5" />
                Evidence Checklist
              </div>
              <h2 className="text-3xl md:text-5xl font-headline font-bold mb-6 uppercase tracking-tighter leading-tight">
                Protecting <br />
                <span className="text-primary italic font-medium copper-glow">Your Evidence.</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed font-normal">
                What you do right after realizing you were scammed is critical. Saving the right records ensures our investigators can trace the transaction and prove ownership.
              </p>
              
              <div className="p-6 md:p-8 bg-card/60 border border-white/5 rounded-xl space-y-5">
                <h4 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                  <Lock className="w-4 h-4 text-primary" /> Confidential Case Ingestion
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  All evidence you share is stored in encrypted private vaults and never disclosed to third parties without your written consent.
                </p>
                <div className="space-y-3 pt-2">
                  <Link href="#forensic-intake" className="block">
                    <Button className="w-full h-12 bg-primary text-black font-bold uppercase tracking-widest text-xs premium-cta rounded-none">
                      Submit Your Evidence
                    </Button>
                  </Link>
                  <div className="pt-2 text-center">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Prefer direct email?</p>
                    <a href="mailto:investigator@elitethics.com" className="inline-flex items-center gap-2 text-xs text-primary hover:underline">
                      <Mail className="w-3.5 h-3.5" /> <strong className="font-extrabold text-primary text-sm">investigator@elitethics.com</strong>
                    </a>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>

          <div className="lg:w-2/3 grid md:grid-cols-2 gap-8 w-full">
            {PRESERVATION_PROTOCOLS.map((protocol, pIdx) => (
              <SectionReveal key={pIdx} delay={pIdx * 200}>
                <Card className={cn(
                  "glass-card h-full rounded-2xl border-white/5 relative overflow-hidden group transition-all duration-500",
                  protocol.variant === 'destructive' ? "hover:border-destructive/40" : "hover:border-primary/40"
                )}>
                  <CardContent className="p-8 md:p-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center border",
                        protocol.variant === 'destructive' ? "bg-destructive/10 border-destructive/25 text-destructive" : "bg-primary/10 border-primary/25 text-primary"
                      )}>
                        <protocol.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-headline font-bold uppercase tracking-tight leading-tight">
                        {protocol.title}
                      </h3>
                    </div>

                    <div className="space-y-6">
                      {protocol.items.map((item, iIdx) => (
                        <div key={iIdx} className="group/item">
                          <div className="flex items-start gap-3 mb-1">
                            {protocol.variant === 'destructive' ? (
                              <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                            ) : (
                              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            )}
                            <p className="text-sm font-bold text-white group-hover/item:text-primary transition-colors">
                              {item.label}
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed pl-7">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </SectionReveal>
            ))}
          </div>
        </div>

        <SectionReveal delay={400} className="mt-16 md:mt-20 max-w-4xl mx-auto p-8 md:p-12 bg-card/60 border border-white/5 rounded-2xl text-center">
          <h3 className="text-2xl font-headline font-bold uppercase tracking-tight mb-3">Already Have Your Files Ready?</h3>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-6">
            If you already have a folder of screenshots, receipts, or TXIDs, you can email them directly to our investigative team for immediate review.
          </p>
          <a 
            href="mailto:investigator@elitethics.com" 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black bg-primary px-8 py-4 hover:bg-primary/90 transition-all rounded-none premium-cta"
          >
            Email Evidence to Investigators <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </SectionReveal>
      </div>
    </section>
  );
}
