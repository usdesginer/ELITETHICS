import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Shield, Search, FileText, UserCheck, Database, Network } from 'lucide-react';
import { SectionReveal } from '@/components/ui/section-reveal';

const steps = [
  {
    number: "01",
    title: "Free Case Review & Evidence Intake",
    description: "You share what happened: transaction receipts, wallet addresses, or platform chats. We review the evidence to confirm if your funds can be traced.",
    icon: FileText,
    details: ["No upfront review fee", "100% confidential vault", "Fast 48-hour initial scan"]
  },
  {
    number: "02",
    title: "Follow The Money Trail",
    description: "Our investigators track your funds across blockchains and bank accounts, uncovering the exact wallets and exchanges where the scammer moved your money.",
    icon: Search,
    details: ["Blockchain tracing", "Exchange account identification", "Wallet cluster mapping"]
  },
  {
    number: "03",
    title: "Official Forensic Evidence Report",
    description: "We compile a comprehensive, verified evidence dossier documenting the entire fraud trail, formatted specifically for exchange fraud teams and law enforcement.",
    icon: Database,
    details: ["Court-ready format", "Exchange compliance proof", "Cryptographic transaction proof"]
  },
  {
    number: "04",
    title: "Account Freeze & Recovery Action",
    description: "We help you submit the forensic package to the relevant exchange fraud desks, banking partners, and authorities to freeze the scammer's accounts and demand fund return.",
    icon: Shield,
    details: ["Exchange freeze requests", "Law enforcement coordination", "Ongoing case guidance"]
  }
];

export function ProcessSection() {
  return (
    <section id="process" className="py-20 md:py-32 bg-card/30 relative overflow-hidden border-y border-white/5">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
          <SectionReveal>
            <h2 className="text-[9px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-primary mb-3">Our Methodology</h2>
            <h3 className="text-3xl md:text-6xl font-headline font-bold mb-4 md:mb-6 uppercase tracking-tighter leading-tight">How Asset Recovery Works</h3>
            <p className="text-muted-foreground text-base md:text-xl leading-relaxed max-w-2xl mx-auto font-normal">
              A straightforward, transparent 4-step process designed to locate your money and take concrete action to get it back.
            </p>
          </SectionReveal>
        </div>
        
        <div className="max-w-5xl mx-auto space-y-0 relative">
          {steps.map((step, idx) => (
            <SectionReveal 
              key={idx} 
              delay={idx * 150} 
              threshold={0.3}
              className="group relative pb-12 md:pb-16 last:pb-0 active"
            >
              {idx !== steps.length - 1 && (
                <div className="absolute left-6 md:left-8 top-16 md:top-20 bottom-0 w-px bg-white/5 hidden md:block overflow-hidden">
                  <div className="timeline-line-fill absolute top-0 left-0 w-full bg-primary" />
                </div>
              )}
              
              <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">
                <div className="md:col-span-2 flex md:flex-col items-center gap-4 md:gap-0">
                  <div className="timeline-node w-12 h-12 md:w-16 md:h-16 rounded-xl border border-white/10 bg-[#12151C] flex items-center justify-center text-primary-foreground transition-all duration-700 shadow-xl relative z-20 overflow-hidden group-hover:scale-105 group-hover:border-primary/50 shrink-0">
                    <step.icon className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-500 text-primary" />
                  </div>
                  <span className="md:mt-4 text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest">{step.number}</span>
                </div>
                
                <div className="md:col-span-7">
                  <h4 className="text-xl md:text-2xl font-headline font-bold mb-3 md:mb-4 group-hover:text-primary transition-colors tracking-tight">{step.title}</h4>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 font-normal">
                    {step.description}
                  </p>
                </div>

                <div className="md:col-span-3">
                  <div className="p-4 md:p-6 bg-card/60 border border-white/5 rounded-xl space-y-2 md:space-y-3 hover:border-primary/30 transition-colors relative">
                    {step.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-[10px] md:text-[11px] font-medium text-foreground/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        <div className="mt-16 md:mt-24 text-center">
          <SectionReveal>
            <div className="inline-block p-6 md:p-12 glass-card border-white/5 shadow-2xl relative overflow-hidden group hover:border-primary/40 rounded-2xl transition-all duration-300 w-full sm:w-auto">
              <div className="relative z-10">
                <h4 className="text-xl md:text-2xl font-headline font-bold mb-3 md:mb-4 tracking-tight">Ready to see if your funds can be recovered?</h4>
                <p className="text-muted-foreground text-sm max-w-xl mx-auto mb-6">
                  Submit your details confidentially. Our investigators will review your case and explain your options with zero pressure.
                </p>
                <Link href="#forensic-intake" className="block sm:inline-block">
                  <Button size="lg" className="w-full sm:w-auto h-14 md:h-16 px-8 md:px-12 text-sm md:text-base bg-primary text-black hover:bg-primary/90 font-bold uppercase tracking-widest group rounded-none premium-cta">
                    Start Your Free Case Review
                    <ArrowRight className="ml-2 w-5 md:w-6 h-5 md:h-6 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
