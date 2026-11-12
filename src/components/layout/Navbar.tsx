'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

const scamServices = [
  { label: "Loan Scam Recovery", href: "/loan-scam-recovery", emoji: "💳" },
  { label: "Wallet Scam Recovery", href: "/wallet-scam-recovery", emoji: "👛" },
  { label: "Investment Scam Recovery", href: "/investment-scam-recovery", emoji: "📈" },
  { label: "Romance Scam Recovery", href: "/romance-scam-recovery", emoji: "❤️" },
  { label: "Cryptocurrency Scam Recovery", href: "/cryptocurrency-scam-recovery", emoji: "₿" },
  { label: "Trading Scam Recovery", href: "/trading-scam-recovery", emoji: "📊" }
];

const navLinks = [
  { href: "/#what-happened", label: "Scam Recovery" },
  { href: "/#process", label: "How It Works" },
  { href: "/#preservation", label: "Evidence Checklist" },
  { href: "/#why-us", label: "Why Choose Us" },
  { href: "/#success-stories", label: "Case Results" },
  { href: "/#faq", label: "FAQ" },
  { href: "/about", label: "About Us" },
];

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 md:gap-3 group">
          <div className={cn(
            "w-10 h-10 md:w-14 md:h-14 rounded-lg flex items-center justify-center transition-all overflow-hidden",
            logoUrl ? "bg-transparent p-0.5" : "bg-primary group-hover:bg-primary/90 shadow-[0_0_15px_rgba(212,118,68,0.3)]"
          )}>
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt="Elitethics Logo" 
                className="w-full h-full object-contain"
                onError={() => setLogoUrl(null)}
              />
            ) : (
              <Shield className="text-white w-6 h-6 md:w-8 md:h-8" />
            )}
          </div>
          <span className="text-lg md:text-2xl font-headline font-bold tracking-tight">
            ELITETHICS<span className="text-primary group-hover:text-primary/80 transition-colors">.</span>
          </span>
        </Link>
        
        <div className="hidden lg:flex items-center gap-6 xl:gap-7 ml-auto mr-8">
          {mounted && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-xs font-semibold text-foreground/90 hover:text-primary transition-colors outline-none cursor-pointer">
                Scam Recovery <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-72 bg-card border-white/10 shadow-2xl p-2 rounded-xl">
                {scamServices.map((service) => (
                  <DropdownMenuItem key={service.href} asChild>
                    <Link href={service.href} className="w-full cursor-pointer py-2.5 px-3 text-xs font-medium rounded-lg hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-2.5">
                      <span>{service.emoji}</span>
                      <span>{service.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {navLinks.slice(1).map((link) => (
            <Link key={link.href} href={link.href} className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <a href="mailto:investigator@elitethics.com" className="hidden xl:inline-block text-xs font-semibold text-muted-foreground hover:text-primary transition-colors">
            Speak With Our Team
          </a>

          <Button asChild className="hidden sm:flex bg-primary hover:bg-primary/90 text-black font-bold h-10 md:h-11 px-5 rounded-lg text-xs md:text-sm shadow-lg shadow-primary/20">
            <Link href="/#recovery-assessment">
              Start My Recovery Assessment
            </Link>
          </Button>

          {/* Mobile Menu Trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden h-10 w-10 text-primary">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-card border-white/5 w-full sm:max-w-xs p-0">
              <SheetHeader className="p-6 border-b border-white/5 text-left">
                <SheetTitle className="text-xl font-headline font-bold uppercase tracking-tight flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" /> ELITETHICS
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-6 space-y-6">
                <div className="space-y-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">Recovery Services</p>
                  <div className="grid gap-2">
                    {scamServices.map((service) => (
                      <Link 
                        key={service.href} 
                        href={service.href} 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-sm text-foreground/80 hover:text-primary transition-colors py-1 flex items-center gap-2"
                      >
                        <span>{service.emoji}</span>
                        <span>{service.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/5">
                  {navLinks.slice(1).map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-sm font-medium text-muted-foreground hover:text-white py-1"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div className="pt-4 space-y-3">
                  <Link href="#recovery-assessment" onClick={() => setIsMobileMenuOpen(false)} className="block w-full">
                    <Button className="w-full bg-primary text-black font-bold rounded-lg h-12 uppercase tracking-wider text-xs">
                      Start My Recovery Assessment
                    </Button>
                  </Link>
                  <a href="mailto:investigator@elitethics.com" className="block text-center text-xs text-primary font-medium py-2">
                    investigator@elitethics.com
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
