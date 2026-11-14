import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionReveal } from '@/components/ui/section-reveal';
import { Button } from '@/components/ui/button';
import { OurLimitsSection } from '@/components/sections/OurLimitsSection';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Building2, 
  Award, 
  Lock, 
  Briefcase, 
  Globe, 
  ArrowRight, 
  Mail, 
  CheckCircle2, 
  FileCheck2,
  Scale,
  Users
} from 'lucide-react';

export const metadata = {
  title: 'About Us | People Behind the Investigation | Elitethics',
  description: 'Meet the certified fraud examiners, blockchain analysts, and financial investigators at Elitethics. Delaware registered entity with transparent standards and strict client confidentiality.',
};

const TEAM_MEMBERS = [
  { 
    name: "Adrian Vance",
    role: "Senior Forensic Investigator",
    experience: "14+ Years in Financial Crime Investigation",
    qualifications: "Certified Fraud Examiner (CFE)",
    jurisdictions: "United States, United Kingdom, Offshore Financial Centers",
    memberships: "Association of Certified Fraud Examiners (ACFE)",
    bio: "Adrian has spent over a decade investigating high-yield investment schemes, fraudulent commodity brokers, and offshore asset diversion. He specializes in unmasking fake platform ownership, analyzing banking payment rails, and assembling evidence dossiers for bank recalls and law enforcement proceedings."
  },
  { 
    name: "Elena Rostova",
    role: "Lead Blockchain Analyst",
    experience: "9+ Years in Digital Asset Forensics",
    qualifications: "M.S. Digital Forensics • Chainalysis Certified Specialist",
    jurisdictions: "Global / Cross-Border Cryptocurrency Exchanges",
    memberships: "High Technology Crime Investigation Association (HTCIA)",
    bio: "Elena focuses on multi-hop blockchain ledger reconstruction and smart contract analysis. She has traced tens of millions in diverted crypto across bridges, mixers, and decentralized protocols directly to centralized exchange off-ramps (CEXs), working with exchange compliance teams to initiate account freezes."
  },
  { 
    name: "Marcus Chen",
    role: "Banking & Wire Recovery Specialist",
    experience: "11+ Years in Commercial Banking Compliance",
    qualifications: "ACAMS Certified Anti-Money Laundering Specialist (CAMS)",
    jurisdictions: "Federal Reserve Wire Network, SWIFT, SEPA (Europe)",
    memberships: "Association of Certified Anti-Money Laundering Specialists",
    bio: "Marcus previously served as a compliance and fraud dispute officer for international banking institutions. He helps victims initiate emergency wire recalls, file structured merchant chargebacks, and navigate correspondent banking channels."
  },
  { 
    name: "Sarah Lindqvist",
    role: "Client Care & Case Advocate",
    experience: "8+ Years in Victim Support & Case Coordination",
    qualifications: "Certified Information Privacy Professional (CIPP/US)",
    jurisdictions: "North America, United Kingdom, Australia, New Zealand",
    memberships: "Victim Rights and Fraud Support Network",
    bio: "Sarah ensures every victim is treated with compassion, confidentiality, and respect. She oversees case onboarding, helps clients systematically preserve digital evidence, and maintains transparent communication throughout the investigative lifecycle."
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-28 bg-card/25 border-b border-white/5 relative overflow-hidden">
        {/* Warm glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/[0.04] rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-5xl text-center">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-semibold mb-6 tracking-wider uppercase">
              <Users className="w-4 h-4 text-primary" />
              People Behind the Investigation
            </div>

            <h1 className="heading-hero text-white uppercase tracking-tight mb-6">
              Who Are You Giving Your Information To?
            </h1>

            <p className="body-large text-muted-foreground leading-relaxed font-normal max-w-3xl mx-auto mb-10">
              When dealing with a financial loss, you need to know exactly who is handling your case. Elitethics is a Delaware-registered investigative firm built on verified credentials, legal accountability, and complete transparency.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/#recovery-assessment">
                <Button size="lg" className="h-14 px-8 bg-primary text-black hover:bg-primary/90 font-bold uppercase tracking-wider rounded-lg shadow-xl shadow-primary/20">
                  Start My Recovery Assessment <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <a href="mailto:investigator@elitethics.com">
                <Button size="lg" variant="outline" className="h-14 px-8 border-white/15 bg-card hover:bg-white/10 font-bold uppercase tracking-wider rounded-lg">
                  <Mail className="mr-2 w-4 h-4 text-primary" /> <span className="font-semibold text-muted-foreground mr-1.5">Desk:</span> <strong className="font-extrabold text-white">investigator@elitethics.com</strong>
                </Button>
              </a>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Corporate Registration & Legal Legitimacy */}
      <section className="py-20 md:py-28 bg-background border-b border-white/5 relative">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
          <SectionReveal className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              <Building2 className="w-4 h-4" /> Legal Corporate Entity
            </div>
            <h2 className="heading-section text-white uppercase tracking-tight mb-4">
              Registered in Delaware, Accountable to You
            </h2>
            <p className="body-large text-muted-foreground font-normal">
              Unlike anonymous online recovery groups operating solely from Telegram or burner social media accounts, Elitethics is a verifiable corporate entity governed by US corporate law.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-8 rounded-xl bg-card border border-white/10 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Corporate Registration</span>
              <h3 className="heading-card text-white uppercase tracking-tight">Delaware Division of Corporations</h3>
              <p className="body-detail text-muted-foreground leading-relaxed">
                Legally incorporated and in active good standing in the State of Delaware. Operating under formal commercial and evidentiary compliance standards.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-card border border-white/10 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Evidentiary Standards</span>
              <h3 className="heading-card text-white uppercase tracking-tight">Court-Admissible Dossiers</h3>
              <p className="body-detail text-muted-foreground leading-relaxed">
                All investigative outputs are constructed to withstand international legal scrutiny, structured specifically for exchange compliance desks and cybercrime authorities.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-card border border-white/10 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Data Protection</span>
              <h3 className="heading-card text-white uppercase tracking-tight">AES-256 Confidentiality</h3>
              <p className="body-detail text-muted-foreground leading-relaxed">
                Your case documentation is encrypted at rest and in transit. We never sell data, never share case files with third parties, and never request your private keys or seed phrases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Investigative Team Profiles */}
      <section className="py-20 md:py-32 bg-card/25 border-b border-white/5 relative">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
          <SectionReveal className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              <Award className="w-4 h-4" /> Certified Investigators
            </div>
            <h2 className="heading-section text-white uppercase tracking-tight mb-4">
              Meet the Specialists Leading Your File
            </h2>
            <p className="body-large text-muted-foreground font-normal">
              Experienced fraud examiners, certified blockchain analysts, and banking compliance officers with decades of combined experience.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {TEAM_MEMBERS.map((member, idx) => (
              <SectionReveal key={idx} delay={idx * 80} className="h-full">
                <div className="p-8 md:p-10 rounded-xl bg-card border border-white/10 hover:border-primary/50 transition-all card-hover-lift h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                      <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary font-headline font-bold text-2xl">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="heading-card text-white uppercase tracking-tight">
                          {member.name}
                        </h3>
                        <p className="text-xs font-semibold text-primary uppercase tracking-wide">
                          {member.role}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {member.experience}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6 text-xs">
                      <div className="flex items-start gap-2 text-white/90 font-medium">
                        <Award className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span><strong>Qualifications:</strong> {member.qualifications}</span>
                      </div>
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <Globe className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span><strong>Jurisdictions:</strong> {member.jurisdictions}</span>
                      </div>
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <Scale className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span><strong>Professional Memberships:</strong> {member.memberships}</span>
                      </div>
                    </div>

                    <p className="body-detail text-muted-foreground leading-relaxed">
                      {member.bio}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-primary font-semibold">
                    <span>Delaware Admitted Dossier Standards</span>
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Limits Section - Embedded on About Page */}
      <OurLimitsSection />

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-card border-t border-white/10 text-center relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl relative z-10">
          <SectionReveal className="space-y-6">
            <h2 className="heading-section text-white uppercase tracking-tight">
              Ready to Discuss Your Case?
            </h2>
            <p className="body-large text-muted-foreground">
              Our initial review is 100% free, completely confidential, and carries zero obligation.
            </p>
            <div className="pt-2">
              <Link href="/#recovery-assessment">
                <Button size="lg" className="h-16 px-10 text-base bg-primary text-black hover:bg-primary/90 font-bold uppercase tracking-wider rounded-lg shadow-xl shadow-primary/20">
                  Start My Recovery Assessment <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}

