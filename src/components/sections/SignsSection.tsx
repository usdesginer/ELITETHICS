import Link from 'next/link';
import { CheckCircle2, ArrowRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionReveal } from '@/components/ui/section-reveal';

const signs = [
  "Your broker or account manager suddenly stopped answering",
  "Withdrawals are blocked or stuck on 'under review'",
  "They demand upfront 'taxes' or 'gas fees' before allowing you to withdraw",
  "Your account showed massive profits, but you cannot take any money out",
  "The investment website or chat group suddenly disappeared",
  "An online friend, mentor, or romantic interest urged you to invest",
  "A remote job offer required you to pay for equipment or process crypto",
  "Your wallet was mysteriously drained after clicking a link or signing a contract"
];

export function SignsSection() {
  return (
    <section className="py-24 bg-card/10 relative overflow-hidden border-y border-white/5">
      {/* Forensic Background Detail */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.03] blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-[9px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-primary mb-3">Recognize The Red Flags</h2>
            <h3 className="text-3xl md:text-5xl font-headline font-bold mb-4 uppercase tracking-tighter">Are You Experiencing Any of These?</h3>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
              Online fraud schemes share telltale patterns. If any of the situations below sound familiar, you are dealing with a scam, and you should stop sending money immediately.
            </p>
          </SectionReveal>
          
          <div className="grid md:grid-cols-2 gap-4 mb-16">
            {signs.map((sign, idx) => (
              <SectionReveal key={idx} delay={idx * 50} duration={400} className="active">
                <div className="group flex items-start gap-4 p-5 md:p-6 rounded-xl bg-card/60 border border-white/5 hover:border-primary/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 relative overflow-hidden">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-all duration-300">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  
                  <div className="space-y-1 pt-1">
                    <span className="text-foreground/90 font-medium text-sm md:text-base tracking-tight leading-relaxed group-hover:text-foreground transition-colors block">
                      {sign}
                    </span>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal className="text-center">
            <div className="inline-block p-1 bg-white/5 rounded-2xl w-full max-w-4xl">
              <div className="p-8 md:p-12 glass-card rounded-xl border-white/5 relative overflow-hidden group">
                <div className="relative z-10">
                  <h4 className="text-2xl font-headline font-bold mb-4 uppercase tracking-tight">Recognize Your Situation?</h4>
                  <p className="text-muted-foreground text-sm max-w-lg mx-auto mb-8 font-normal">
                    Don't wait until the scammers close their platform. Let our team run a free preliminary trace to see where your money went.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
                    <Link href="#forensic-intake">
                      <Button size="lg" className="h-14 md:h-16 px-10 text-base bg-primary text-black hover:bg-primary/90 font-bold uppercase tracking-widest group shadow-2xl shadow-primary/20 rounded-none premium-cta">
                        Start Free Case Review
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>

                  <div className="pt-6 border-t border-white/5 max-w-2xl mx-auto space-y-3">
                    <p className="text-xs text-muted-foreground font-medium">Prefer to send an email first?</p>
                    <a href="mailto:investigator@elitethics.com" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-primary hover:copper-glow transition-all">
                      <Mail className="w-4 h-4" /> <strong className="font-extrabold text-primary hover:underline">investigator@elitethics.com</strong>
                    </a>
                  </div>

                  <div className="mt-8 flex items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-breathing" />
                      Confidential
                    </span>
                    <span className="w-px h-3 bg-white/10" />
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-breathing" />
                      No Obligation
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
