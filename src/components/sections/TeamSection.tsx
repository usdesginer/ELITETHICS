'use client';

import { ShieldCheck, Award, UserCheck, Briefcase, Globe, FileCheck2, Building2, ArrowRight } from 'lucide-react';
import { SectionReveal } from '@/components/ui/section-reveal';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  experience: string;
  qualifications: string;
  jurisdictions: string;
  memberships: string;
  whatTheyDo: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  { 
    id: 'team-1', 
    name: "Adrian Vance",
    role: "Senior Forensic Investigator",
    experience: "14+ Years in Financial Crime Investigation",
    qualifications: "Certified Fraud Examiner (CFE)",
    jurisdictions: "United States, United Kingdom, Offshore Brokerages",
    memberships: "Association of Certified Fraud Examiners (ACFE)",
    whatTheyDo: "Examines fraudulent investment and broker platforms, audits payment flow records, and compiles evidentiary dossiers for bank chargebacks and asset freezes."
  },
  { 
    id: 'team-2', 
    name: "Elena Rostova",
    role: "Lead Blockchain Analyst",
    experience: "9+ Years in Digital Asset Forensics",
    qualifications: "M.S. Digital Forensics • Chainalysis Certified",
    jurisdictions: "Global / Cross-Border Cryptocurrency Exchanges",
    memberships: "High Technology Crime Investigation Association (HTCIA)",
    whatTheyDo: "Performs multi-hop blockchain ledger analysis, traces coin movements through decentralized swaps, and maps funds to KYC-verified exchange deposit accounts."
  },
  { 
    id: 'team-3', 
    name: "Marcus Chen",
    role: "Banking & Wire Recovery Specialist",
    experience: "11+ Years in Commercial Bank Compliance",
    qualifications: "ACAMS Certified Anti-Money Laundering (CAMS)",
    jurisdictions: "Federal Reserve Wire Network, SWIFT, SEPA (Europe)",
    memberships: "Association of Certified Anti-Money Laundering Specialists",
    whatTheyDo: "Assists fraud victims with swift bank recall notices, payment processor disputes, and identifying recipient shell accounts."
  },
  { 
    id: 'team-4', 
    name: "Sarah Lindqvist",
    role: "Client Care & Case Advocate",
    experience: "8+ Years in Victim Advocacy & Evidence Handling",
    qualifications: "Certified Privacy Professional • Victim Advocacy Liaison",
    jurisdictions: "North America, United Kingdom, Australia, New Zealand",
    memberships: "Victim Rights and Fraud Support Network",
    whatTheyDo: "Helps victims systematically organize digital chats, emails, and screenshots, ensuring proper chain-of-custody while protecting client confidentiality."
  }
];

export function TeamSection() {
  return (
    <section id="about" className="py-24 md:py-36 bg-card/25 border-b border-white/5 relative overflow-hidden">
      {/* Warm ambient glow */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        <SectionReveal className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-semibold mb-6 tracking-wider uppercase">
            <UserCheck className="w-4 h-4 text-primary" />
            People Behind the Investigation
          </div>
          
          <h2 className="heading-section text-white uppercase tracking-tight mb-6">
            Who Are You Giving Your Information To?
          </h2>
          
          <p className="body-large text-muted-foreground leading-relaxed font-normal max-w-2xl mx-auto">
            You deal with real, certified investigators with verifiable professional credentials and legal accountability, not anonymous social media avatars.
          </p>
        </SectionReveal>

        {/* 4 Large Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
          {TEAM_MEMBERS.map((member, idx) => (
            <SectionReveal key={member.id} delay={idx * 80} duration={500} className="h-full">
              <div className="h-full p-8 rounded-xl bg-card border border-white/10 hover:border-primary/50 transition-all duration-300 card-hover-lift flex flex-col justify-between group">
                <div>
                  {/* Avatar / Initials */}
                  <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary font-headline font-bold text-xl mb-6 group-hover:bg-primary group-hover:text-black transition-colors">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>

                  <h3 className="heading-card text-white uppercase tracking-tight mb-1 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>

                  <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-4">
                    {member.role}
                  </p>

                  {/* Credentials & Experience */}
                  <div className="space-y-2.5 pb-4 mb-4 border-b border-white/10 text-xs">
                    <div className="flex items-center gap-2 text-white/90 font-medium">
                      <Award className="w-4 h-4 text-primary shrink-0" />
                      <span>{member.qualifications}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Briefcase className="w-4 h-4 text-primary shrink-0" />
                      <span>{member.experience}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Globe className="w-4 h-4 text-primary shrink-0" />
                      <span>{member.jurisdictions}</span>
                    </div>
                  </div>

                  {/* What they actually do */}
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-primary mb-1.5">
                      What They Actually Do:
                    </h4>
                    <p className="body-detail text-muted-foreground leading-relaxed">
                      {member.whatTheyDo}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="font-semibold text-foreground/80 truncate mr-2">{member.memberships}</span>
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Corporate Registration & Accountability Box */}
        <SectionReveal className="p-8 md:p-12 rounded-xl bg-card border border-primary/30 max-w-5xl mx-auto shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                <Building2 className="w-4 h-4 text-primary" /> Verifiable Corporate Registration
              </div>
              <h3 className="heading-card text-white uppercase tracking-tight">
                Elitethics LLC • Delaware Division of Corporations
              </h3>
              <p className="body-detail text-muted-foreground max-w-2xl leading-relaxed">
                Elitethics operates as a legally incorporated investigative consulting entity under the laws of the State of Delaware. All case records are safeguarded under strict US evidentiary handling and confidentiality regulations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <Link href="/about">
                <Button variant="outline" className="h-13 px-6 border-white/20 bg-background hover:bg-white/5 font-semibold text-xs uppercase tracking-wider rounded-lg">
                  Read Our Full Story <ArrowRight className="ml-1.5 w-4 h-4" />
                </Button>
              </Link>
              <Link href="#recovery-assessment">
                <Button className="h-13 px-6 bg-primary text-black hover:bg-primary/90 font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg shadow-primary/20">
                  Start My Recovery Assessment
                </Button>
              </Link>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
