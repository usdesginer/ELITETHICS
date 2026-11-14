'use client';

import { Shield, Twitter, Linkedin, Send, Radio, Mail } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

export function Footer() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchLogo();
  }, []);

  const fetchLogo = async () => {
    try {
      const { data } = supabase.storage
        .from('assets')
        .getPublicUrl('logo.png');
      
      if (data?.publicUrl) {
        setLogoUrl(`${data.publicUrl}?t=${Date.now()}`);
      }
    } catch (error) {
      setLogoUrl(null);
    }
  };

  return (
    <footer id="contact" className="bg-card border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className={cn(
                "w-12 h-12 rounded flex items-center justify-center transition-all overflow-hidden",
                logoUrl ? "bg-transparent p-1" : "bg-primary shadow-lg"
              )}>
                {logoUrl ? (
                  <img 
                    src={logoUrl} 
                    alt="Logo" 
                    className="w-full h-full object-contain"
                    onError={() => setLogoUrl(null)}
                  />
                ) : (
                  <Shield className="text-white w-7 h-7" />
                )}
              </div>
              <span className="text-xl font-headline font-bold">ELITETHICS</span>
            </Link>
            <p className="text-muted-foreground text-xs leading-relaxed mb-6 font-normal">
              Elitethics is a Delaware-registered digital asset and fraud investigation firm. We trace stolen crypto and fraudulent transactions to help victims build evidence for asset recovery.
            </p>
            
            <div className="flex items-center gap-4">
              <Link href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
                <Twitter className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
                <Send className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
                <Radio className="w-4 h-4" />
              </Link>
            </div>
          </div>
          
          <div>
            <h5 className="text-[11px] font-bold mb-5 text-foreground uppercase tracking-[0.2em]">Scam Recovery</h5>
            <ul className="space-y-2.5 text-xs text-muted-foreground font-medium">
              <li><Link href="/loan-scam-recovery" className="hover:text-primary transition-colors">Loan Scam Recovery</Link></li>
              <li><Link href="/wallet-scam-recovery" className="hover:text-primary transition-colors">Wallet Scam Recovery</Link></li>
              <li><Link href="/investment-scam-recovery" className="hover:text-primary transition-colors">Investment Scam Recovery</Link></li>
              <li><Link href="/romance-scam-recovery" className="hover:text-primary transition-colors">Romance Scam Recovery</Link></li>
              <li><Link href="/cryptocurrency-scam-recovery" className="hover:text-primary transition-colors">Cryptocurrency Scam Recovery</Link></li>
              <li><Link href="/trading-scam-recovery" className="hover:text-primary transition-colors">Trading Scam Recovery</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-[11px] font-bold mb-5 text-foreground uppercase tracking-[0.2em]">Our Process</h5>
            <ul className="space-y-3 text-xs text-muted-foreground font-medium">
              <li><Link href="/#process" className="hover:text-primary transition-colors">How It Works</Link></li>
              <li><Link href="/#preservation" className="hover:text-primary transition-colors">Evidence Checklist</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us (Our Team & Limits)</Link></li>
              <li><Link href="/#recovery-assessment" className="hover:text-primary transition-colors">Case Assessment</Link></li>
              <li><a href="mailto:investigator@elitethics.com" className="hover:text-primary transition-colors">Desk: <strong className="font-extrabold text-white hover:text-primary">investigator@elitethics.com</strong></a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[11px] font-bold mb-5 text-foreground uppercase tracking-[0.2em]">Resources</h5>
            <ul className="space-y-3 text-xs text-muted-foreground font-medium">
              <li><Link href="/#faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/#success-stories" className="hover:text-primary transition-colors">Case Resolutions</Link></li>
              <li><Link href="/#why-us" className="hover:text-primary transition-colors">Why Choose Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-[11px] font-bold mb-5 text-foreground uppercase tracking-[0.2em]">Contact Us</h5>
            <ul className="space-y-3 text-xs text-muted-foreground font-medium">
              <li><a href="mailto:investigator@elitethics.com" className="text-white block hover:text-primary transition-colors text-sm"><strong className="font-extrabold text-primary hover:text-white">investigator@elitethics.com</strong></a></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Our Hubs</Link></li>
              <li><Link href="#forensic-intake" className="hover:text-primary transition-colors">Case Intake</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} Elitethics. Delaware Division of Corporations Registered.
          </p>
          <div className="flex gap-6">
            <p className="text-[9px] text-muted-foreground max-w-md text-left md:text-right leading-relaxed italic uppercase tracking-[0.1em] opacity-50 font-bold">
              Note: Elitethics is a legally registered entity in the State of Delaware. Recovery involves complex jurisdictions and evidence review.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
