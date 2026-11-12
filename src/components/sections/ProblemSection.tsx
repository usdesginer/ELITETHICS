import Link from 'next/link';
import { AlertCircle, Clock, ShieldAlert, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const scamTypes = [
  "Fake Crypto Exchanges & Wallet Drains",
  "Unregulated Forex & Trading Broker Fraud",
  "High-Yield Investment Programs (Ponzi Schemes)",
  "Social Media & Messaging App Investment Traps",
  "Romance & Trust-Based Financial Deception",
  "Bank Wire & Compromised Account Fraud",
  "Impersonation & Fake Legal Recovery Scams"
];

export function ProblemSection() {
  return (
    <section className="py-24 bg-card/40 border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            <div className="glass-card rounded-2xl p-8 md:p-14 border border-white/5 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-primary font-bold mb-6">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <span className="tracking-[0.2em] text-xs uppercase font-bold">Scams We Investigate</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-headline font-bold mb-6 leading-tight">
                  We Trace What Was Taken And Show You Where It Went
                </h2>
                <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed">
                  If you deposited funds into an online platform and can't withdraw, or transferred crypto to an address that turned out to be a scam, you need clear facts. We analyze the transaction chain, verify where the money ended up, and build a concrete recovery path.
                </p>
                
                <div className="space-y-4 mb-10">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Types of Cases We Handle Daily:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {scamTypes.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm font-medium text-foreground/90">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Link href="#forensic-intake">
                <Button size="lg" className="h-14 px-8 bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-widest shadow-xl shadow-primary/20 group rounded-none">
                  Request Free Case Evaluation
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="p-8 md:p-12 rounded-2xl bg-primary/5 border border-primary/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Clock className="w-32 h-32 text-primary" />
                </div>
                
                <div className="inline-flex items-center gap-2 text-primary font-bold mb-6">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="tracking-[0.2em] text-xs uppercase font-bold">Why Time Matters</span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-headline font-bold mb-4">
                  The Sooner You Act, The Better The Chances
                </h3>
                <p className="text-base text-foreground/80 mb-8 leading-relaxed">
                  Scammers don't leave stolen money sitting in one wallet. They split and bounce funds between addresses and bank accounts to cash out through major exchanges. Fast action allows us to flag and freeze those accounts.
                </p>
                
                <div className="grid gap-4">
                  {[
                    { 
                      title: "Rapid Fund Transfers", 
                      desc: "Criminals quickly hop funds between wallets or wire them overseas before victims realize they've been scammed." 
                    },
                    { 
                      title: "Websites Suddenly Vanish", 
                      desc: "Fake broker platforms and chat groups shut down without warning once withdrawal requests begin piling up." 
                    },
                    { 
                      title: "Exchange Account Freezes", 
                      desc: "Regulated exchanges have compliance desks that can freeze funds if an official forensic notice is filed promptly." 
                    },
                    { 
                      title: "Evidence Can Disappear", 
                      desc: "Scammers delete messages, block victims, and scrub transaction portals if they suspect an investigation is underway." 
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl bg-card/60 border border-white/5">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white mb-0.5">{item.title}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/10 flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Important:</strong> Never send more money for "withdrawal taxes", "verification fees", or "liquidity deposits". Legitimate platforms do not ask for external payments to unlock your balance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
