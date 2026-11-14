'use client';

import { XCircle, CheckCircle2, ShieldAlert, ShieldCheck } from 'lucide-react';
import { SectionReveal } from '@/components/ui/section-reveal';

const RED_FLAGS = [
  {
    title: 'Promises "100% Guaranteed Recovery"',
    desc: 'No legitimate investigator, attorney, or police agency can guarantee fund recovery. Anyone making this promise is a secondary scammer seeking an upfront fee.'
  },
  {
    title: 'Demands Upfront Fees in Crypto or Gift Cards',
    desc: 'They ask for "server access fees", "decryption fees", or "deposit taxes" before even verifying if your funds can be traced.'
  },
  {
    title: 'Claims to "Hack the Blockchain"',
    desc: 'Blockchains are cryptographically immutable. Legitimate recovery relies on following transaction ledgers to centralized exchanges, not fictional "hacking".'
  },
  {
    title: 'Operates Solely on Telegram, WhatsApp, or Instagram',
    desc: 'Anonymous accounts using stolen photos, fake badges, and burner numbers that disappear the moment they receive your money.'
  },
  {
    title: 'Zero Legal Corporate Registration',
    desc: 'No registered company number, no verifiable business address, no regulatory compliance, and zero legal accountability.'
  }
];

const ELITETHICS_STANDARDS = [
  {
    title: 'Honest Viability Review',
    desc: 'If your assets were cashed out beyond reachable jurisdictions, we tell you frankly. We only accept cases where actionable evidence can be gathered.'
  },
  {
    title: 'Free Preliminary Case Assessment',
    desc: 'Our team examines your transaction hashes, timelines, and communications upfront at no cost before any formal agreement.'
  },
  {
    title: 'Legitimate Forensic Tracing & Exchange Freezes',
    desc: 'We follow funds across blockchain hops to terminal exchange accounts, delivering court-admissible dossiers to freeze accounts.'
  },
  {
    title: 'Verified Official Communication',
    desc: (
      <>
        Direct communication with dedicated forensic specialists via official corporate channels (<strong className="font-extrabold text-white">investigator@elitethics.com</strong>) and secure forms.
      </>
    )
  },
  {
    title: 'Delaware Division of Corporations Registered',
    desc: 'A legally registered investigative corporate entity in the State of Delaware, adhering to strict legal and ethical compliance standards.'
  }
];

export function EthicsComparison() {
  return (
    <section className="py-24 md:py-36 bg-background relative overflow-hidden border-b border-white/5">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionReveal className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-semibold mb-6 tracking-wider uppercase">
            <ShieldAlert className="w-4 h-4 text-primary" />
            Protect Yourself From Secondary Scams
          </div>
          
          <h2 className="heading-section text-white uppercase tracking-tight mb-6">
            Fake Recovery "Hackers" vs. The Elitethics Standard
          </h2>
          
          <p className="body-large text-muted-foreground leading-relaxed font-normal max-w-2xl mx-auto">
            Fraud victims are frequently targeted a second time by fraudulent "recovery agents." Knowing the difference is your first line of defense.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 max-w-6xl mx-auto">
          {/* Red Flags Card */}
          <SectionReveal delay={100} duration={500} className="h-full">
            <div className="h-full p-8 md:p-12 rounded-xl bg-red-950/10 border border-red-500/25 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-red-500/20">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                    <XCircle className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="heading-card text-red-200 uppercase tracking-tight">
                      Fake Recovery Scammers
                    </h3>
                    <p className="text-xs text-red-400 font-semibold uppercase tracking-wider">
                      Dangerous Red Flags to Avoid
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {RED_FLAGS.map((flag, idx) => (
                    <div key={idx} className="flex items-start gap-3.5">
                      <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-base font-bold text-red-100 uppercase tracking-wide mb-1">
                          {flag.title}
                        </h4>
                        <p className="body-detail text-muted-foreground leading-relaxed">
                          {flag.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Elitethics Standard Card */}
          <SectionReveal delay={200} duration={500} className="h-full">
            <div className="h-full p-8 md:p-12 rounded-xl bg-card border border-primary/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-primary/20">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="heading-card text-white uppercase tracking-tight">
                      The Elitethics Standard
                    </h3>
                    <p className="text-xs text-primary font-semibold uppercase tracking-wider">
                      Legitimate, Verifiable Investigation
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {ELITETHICS_STANDARDS.map((std, idx) => (
                    <div key={idx} className="flex items-start gap-3.5">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-base font-bold text-white uppercase tracking-wide mb-1">
                          {std.title}
                        </h4>
                        <p className="body-detail text-muted-foreground leading-relaxed">
                          {std.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
