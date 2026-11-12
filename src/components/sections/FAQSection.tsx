'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SectionReveal } from "@/components/ui/section-reveal";
import { 
  ShieldCheck, 
  HelpCircle, 
  AlertTriangle, 
  Search, 
  FileCheck2,
  Clock,
  Lock
} from 'lucide-react';

// The 6 User-Specified Core Questions and Direct Honest Answers
const CORE_PROMINENT_FAQS = [
  {
    question: "Can you guarantee recovery?",
    answer: "No. No legitimate company can guarantee recovery in every case. We assess the available information and explain what options may exist.",
    highlight: "Zero false promises. Anyone guaranteeing 100% recovery is a secondary scammer.",
    icon: ShieldCheck
  },
  {
    question: "Can stolen funds really be traced?",
    answer: "Sometimes. It depends on how the funds moved, where they went, when the transaction occurred and what information is available.",
    highlight: "Public blockchain ledgers and wire routes leave records, but success depends on destination exit points.",
    icon: Search
  },
  {
    question: "What evidence do I need to get started?",
    answer: "Start with what you have. Bank records, wallet addresses, transaction IDs, emails, messages and screenshots can all help.",
    highlight: "Do not wait until you have everything organized. Even a single transaction hash or deposit receipt helps.",
    icon: FileCheck2
  },
  {
    question: "What if I already paid extra fees or taxes?",
    answer: "Tell us. Additional payments and communications may be relevant to understanding your situation.",
    highlight: "Every additional payment creates a new financial trail that can help identify the receiving account.",
    icon: AlertTriangle
  },
  {
    question: "How long does an investigation take?",
    answer: "There is no universal timeframe. Each case is different.",
    highlight: "Preliminary ledger mapping takes 48–72 hours; formal multi-hop dossiers depend on case complexity.",
    icon: Clock
  },
  {
    question: "What if the platform is demanding more money to release my money?",
    answer: "Be extremely cautious. Requests for additional “release,” “tax,” “verification” or “processing” payments are common in scams.",
    highlight: "Never send more funds. Legitimate brokers deduct fees directly from your balance.",
    icon: Lock
  }
];

const DETAILED_CATEGORIES = [
  {
    title: "Investigation Process & Next Steps",
    icon: Search,
    questions: [
      {
        question: "What actually happens after I submit my case?",
        answer: "A dedicated forensic investigator reviews your submission within 24 to 48 hours. We examine public ledger hashes or payment routes to determine whether funds reached a regulated exchange where an account freeze can be requested."
      },
      {
        question: "What if the scammer is based overseas?",
        answer: "Most digital fraud networks operate internationally. We construct court-admissible dossiers according to international evidentiary standards, allowing them to be utilized by global crypto exchange compliance teams and cybercrime divisions."
      }
    ]
  },
  {
    title: "Fees, Privacy & Legitimacy",
    icon: ShieldCheck,
    questions: [
      {
        question: "Is there an upfront fee for the initial evaluation?",
        answer: "No. The initial assessment is 100% free with zero obligation. We evaluate your transaction records first to give you an honest appraisal of whether recovery is realistic before any formal engagement begins."
      },
      {
        question: "Is Elitethics a registered company?",
        answer: "Yes. Elitethics is legally registered with the Delaware Division of Corporations. We operate with strict corporate accountability, adhering to Delaware corporate law and formal evidentiary standards."
      }
    ]
  }
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24 md:py-36 bg-[#F8FAFC] text-[#111827] border-y border-gray-200 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
        
        {/* Section Header (Clean Dark Typography, Calm Tone) */}
        <SectionReveal className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs sm:text-sm font-semibold mb-6 tracking-wider uppercase">
            <HelpCircle className="w-4 h-4 text-primary" />
            Transparent Answers
          </div>
          
          <h2 className="heading-section text-[#111827] uppercase tracking-tight mb-6">
            Clear Answers to Critical Questions
          </h2>
          
          <p className="body-large text-[#4B5563] leading-relaxed font-normal max-w-2xl mx-auto">
            Victims deserve absolute transparency. We do not make false promises or give misleading guarantees. Here are direct answers to the most important questions.
          </p>
        </SectionReveal>

        {/* PROMINENT CORE 6 QUESTIONS GRID (Crisp White Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20">
          {CORE_PROMINENT_FAQS.map((faq, idx) => {
            const Icon = faq.icon;
            return (
              <SectionReveal key={idx} delay={idx * 60} duration={400} className="h-full">
                <div className="p-8 rounded-xl bg-white border border-gray-200 hover:border-primary/60 transition-all duration-300 card-hover-lift h-full flex flex-col justify-between shadow-sm hover:shadow-lg">
                  <div>
                    {/* Top Row: Icon & Number (Strategic Orange) */}
                    <div className="flex items-center justify-between gap-4 mb-5 pb-3 border-b border-gray-100">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-bold text-primary">0{idx + 1}</span>
                    </div>

                    <h3 className="heading-card text-[#111827] uppercase tracking-tight mb-3">
                      {faq.question}
                    </h3>

                    {/* Direct Honest Answer */}
                    <p className="body-detail text-[#1F2937] font-semibold leading-relaxed mb-4">
                      {faq.answer}
                    </p>
                  </div>

                  {/* Context Note */}
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      {faq.highlight}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>

        {/* Detailed Secondary Categories */}
        <div className="pt-8 border-t border-gray-200">
          <SectionReveal className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-xl md:text-2xl font-headline font-bold text-[#111827] uppercase tracking-tight mb-2">
              Additional Investigation Details
            </h3>
            <p className="body-detail text-[#4B5563]">
              Learn more about our methodology, legal compliance, and evidentiary standards.
            </p>
          </SectionReveal>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {DETAILED_CATEGORIES.map((category, catIdx) => (
              <div key={catIdx} className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <category.icon className="w-5 h-5" />
                  </div>
                  <h4 className="heading-card text-[#111827] uppercase tracking-tight">{category.title}</h4>
                </div>
                
                <Accordion type="single" collapsible className="w-full space-y-3">
                  {category.questions.map((faq, idx) => (
                    <AccordionItem key={idx} value={`item-${catIdx}-${idx}`} className="border border-gray-200 bg-white px-6 py-1 rounded-xl shadow-sm">
                      <AccordionTrigger className="text-left text-base font-semibold text-[#111827] py-4 hover:no-underline hover:text-primary transition-colors">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="body-detail text-[#4B5563] leading-relaxed pb-5 font-normal">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
