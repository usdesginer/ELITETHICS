'use client';

import { 
  Ban, 
  Save, 
  MessageSquareOff, 
  Building2, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight,
  AlertTriangle,
  FileCheck2
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SectionReveal } from '@/components/ui/section-reveal';

const ACTIONS = [
  {
    number: '1',
    title: 'Stop sending money',
    instruction: "Don't send another payment because the scammer says it will unlock your funds.",
    detail: 'No legitimate organization or regulator demands additional deposits, taxes, or clearance fees to release your existing funds. Demands for more money are simply attempts to take more before disappearing.',
    icon: Ban,
    isUrgent: true
  },
  {
    number: '2',
    title: 'Save everything',
    instruction: 'Keep emails, messages, receipts, screenshots and transaction records.',
    detail: 'Export transaction hashes (TxIDs), bank wire confirmations, platform deposit slips, and images of your account balance. Every receipt helps establish where the money moved.',
    icon: Save,
    isUrgent: false
  },
  {
    number: '3',
    title: "Don't delete conversations",
    instruction: 'Even embarrassing conversations may contain useful evidence.',
    detail: 'Export your full chat histories from WhatsApp, Telegram, or SMS right now. Scammers frequently delete messages or delete entire accounts once they realize you suspect fraud.',
    icon: MessageSquareOff,
    isUrgent: false
  },
  {
    number: '4',
    title: 'Contact your bank or payment provider',
    instruction: 'If money was sent through a bank or payment service, contact them as soon as possible.',
    detail: 'If funds were transferred via bank wire, credit card, or payment apps (Zelle, PayPal), alert their fraud department immediately. There may be a limited recall or dispute window.',
    icon: Building2,
    isUrgent: true
  },
  {
    number: '5',
    title: 'Secure your accounts',
    instruction: 'Change passwords and secure accounts that may have been compromised.',
    detail: 'Change passwords on your email, bank, and crypto exchanges immediately. If you installed remote software (AnyDesk, TeamViewer) at the scammer’s request, uninstall it right away.',
    icon: ShieldAlert,
    isUrgent: false
  },
  {
    number: '6',
    title: 'Get your situation assessed',
    instruction: "Give us the available information and we'll explain what may be possible.",
    detail: 'You do not have to figure this out alone. Submit your case details to our Delaware-registered investigators for a free, confidential review with zero obligation.',
    icon: CheckCircle2,
    isUrgent: false
  }
];

export function ImmediateActionGuide() {
  return (
    <section id="preservation" className="py-24 md:py-36 bg-[#F4F6F9] text-[#111827] border-y border-gray-200/80 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header (Clean Dark Typography, No Decorative Orange Gimmicks) */}
        <SectionReveal className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 border border-red-200 text-red-800 text-xs sm:text-sm font-bold mb-6 tracking-wider uppercase">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            Evidence Preservation & First Aid
          </div>
          
          <h2 className="heading-section text-[#111827] uppercase tracking-tight mb-6">
            If You've Just Been Scammed, <br className="hidden sm:block" />
            Do These Things First
          </h2>
          
          <p className="body-large text-[#4B5563] leading-relaxed font-normal max-w-2xl mx-auto">
            The hours following a scam are critical. Taking these 6 immediate steps protects you from secondary losses and preserves the evidence needed to investigate.
          </p>
        </SectionReveal>

        {/* 6 Actions Grid (Crisp White Paper Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto mb-16">
          {ACTIONS.map((action, idx) => {
            const Icon = action.icon;
            return (
              <SectionReveal key={action.number} delay={idx * 60} className="h-full">
                <div className={`p-8 md:p-10 rounded-xl bg-white border card-hover-lift h-full flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl ${
                  action.isUrgent 
                    ? 'border-l-4 border-l-red-500 border-gray-200' 
                    : 'border-gray-200 hover:border-primary/60'
                }`}>
                  <div>
                    {/* Header Row: Icon & Step Number */}
                    <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        action.isUrgent 
                          ? 'bg-red-50 text-red-600 border border-red-200' 
                          : 'bg-primary/10 text-primary border border-primary/20'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      
                      {/* Strategic Orange on Step Number */}
                      <span className="text-xs font-mono font-bold text-primary px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                        Step 0{action.number}
                      </span>
                    </div>

                    <h3 className="heading-card text-[#111827] uppercase tracking-tight mb-2">
                      {action.title}
                    </h3>

                    {/* Bold Instruction */}
                    <p className="text-base text-[#111827] font-semibold leading-snug mb-3">
                      "{action.instruction}"
                    </p>

                    {/* Factual Detail */}
                    <p className="body-detail text-[#4B5563] leading-relaxed font-normal">
                      {action.detail}
                    </p>
                  </div>

                  {action.isUrgent && (
                    <div className="mt-6 pt-3 border-t border-red-100">
                      <span className="text-xs font-bold text-red-600 uppercase tracking-wider flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" /> High Urgency Action
                      </span>
                    </div>
                  )}
                </div>
              </SectionReveal>
            );
          })}
        </div>

        {/* Action Callout Box */}
        <SectionReveal className="max-w-4xl mx-auto p-8 md:p-10 bg-white border border-gray-200 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="text-left space-y-1">
            <h4 className="heading-card text-[#111827] uppercase tracking-tight">
              Ready to have your situation assessed?
            </h4>
            <p className="body-detail text-[#4B5563] font-normal">
              Send us what you have. We will review your documentation confidentially and explain your options.
            </p>
          </div>
          <Link href="#recovery-assessment" className="shrink-0 w-full md:w-auto">
            <Button size="lg" className="w-full md:w-auto h-14 px-8 text-base bg-primary text-black hover:bg-primary/90 font-bold uppercase tracking-wider rounded-lg premium-cta shadow-lg shadow-primary/20">
              Start My Recovery Assessment <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </SectionReveal>

      </div>
    </section>
  );
}
