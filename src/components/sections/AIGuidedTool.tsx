"use client"

import { useState } from 'react'
import { aiGuidedRecoveryPreparation } from '@/ai/flows/ai-guided-recovery-preparation'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase'
import { 
  Loader2, 
  CheckCircle2, 
  ArrowRight,
  Lock,
  Shield,
  Mail,
  HelpCircle,
  ShieldCheck,
  RotateCcw,
  AlertTriangle,
  FileCheck2,
  Calendar,
  DollarSign
} from 'lucide-react'
import { SectionReveal } from '@/components/ui/section-reveal'
import { cn } from '@/lib/utils'

// Step 1: The 6 User-Specified Situation Options
const SITUATIONS = [
  { id: 'investment', title: 'I lost money through an investment', category: 'Investment Scam', asset: 'Cryptocurrency / Wire' },
  { id: 'crypto', title: 'I sent cryptocurrency', category: 'Cryptocurrency Scam', asset: 'BTC / ETH / USDT' },
  { id: 'romance', title: 'I was scammed by someone I met online', category: 'Romance / Relationship Scam', asset: 'Wire / Crypto' },
  { id: 'trading', title: 'I was tricked by a trading platform', category: 'Trading & Broker Scam', asset: 'Broker Deposit' },
  { id: 'loan', title: 'I paid money for a loan', category: 'Advance-Fee Loan Scam', asset: 'Upfront Fees / Wire' },
  { id: 'wallet', title: 'My wallet/account was compromised', category: 'Wallet / Unauthorized Drain', asset: 'Drained Wallet' }
];

// Step 2: The 5 User-Specified Amount Ranges
const AMOUNT_RANGES = [
  'Under $1,000',
  '$1,000–$10,000',
  '$10,000–$50,000',
  '$50,000–$100,000',
  '$100,000+'
];

// Step 3: The 5 User-Specified Timing Ranges
const TIMING_RANGES = [
  'Within the last 24 hours',
  'Within the last week',
  'Within the last month',
  '1–6 months ago',
  'More than 6 months ago'
];

export function AIGuidedTool() {
  // Stepper: 1 = initial 3-choice questionnaire, 2 = review & contact details, 3 = confirmed
  const [step, setStep] = useState<1 | 2 | 3>(1);
  
  const [selectedSituation, setSelectedSituation] = useState(SITUATIONS[0].id);
  const [selectedAmount, setSelectedAmount] = useState(AMOUNT_RANGES[2]); // $10k - $50k default
  const [selectedTiming, setSelectedTiming] = useState(TIMING_RANGES[1]); // last week default

  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [caseId, setCaseId] = useState('');

  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    country: ''
  });
  
  const { toast } = useToast();

  const currentSituationObj = SITUATIONS.find(s => s.id === selectedSituation) || SITUATIONS[0];

  const handleContinueToReview = () => {
    // Smooth transition to stage 2: Case Profile & Evidence Review
    setStep(2);
    // Scroll smoothly to form container
    const el = document.getElementById('assessment-container');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFinalSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!contactInfo.email || !contactInfo.name) {
      toast({ 
        variant: 'destructive', 
        title: "Contact Details Required", 
        description: "Please enter your name and email so our investigators can send your review." 
      });
      return;
    }
    
    setLoading(true);
    const generatedId = `ETH-${Math.floor(10000 + Math.random() * 90000)}`;
    setCaseId(generatedId);

    try {
      const promptText = `
SCAM SITUATION: ${currentSituationObj.title}
CATEGORY: ${currentSituationObj.category}
APPROXIMATE LOSS: ${selectedAmount}
TIMING: ${selectedTiming}
NAME: ${contactInfo.name}
EMAIL: ${contactInfo.email}
PHONE: ${contactInfo.phone}
COUNTRY: ${contactInfo.country}
NARRATIVE: ${description || 'Preliminary intake submitted via quick assessment.'}
      `.trim();

      await supabase.from('cases').insert([{
        case_id: generatedId,
        case_type: currentSituationObj.category,
        user_name: contactInfo.name,
        user_email: contactInfo.email,
        user_phone: contactInfo.phone,
        user_country: contactInfo.country,
        description: `[${currentSituationObj.title} | ${selectedAmount} | ${selectedTiming}]\n${description}`,
        status: 'Review Pending',
        risk_level: 'Initial Intake'
      }]);

      aiGuidedRecoveryPreparation({ initialProblemDescription: promptText }).then(aiOutput => {
         supabase.from('cases').update({ result_data: aiOutput }).eq('case_id', generatedId);
      }).catch(err => console.error("Background processing error:", err));

      setStep(3);
    } catch (error: any) {
      toast({ variant: 'destructive', title: "Submission Error", description: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div id="recovery-assessment" className="scroll-mt-24" />
      <section id="assessment-container" className="py-24 md:py-36 bg-gradient-to-b from-[#1C1410] via-[#261A13] to-[#1C1410] border-y border-primary/30 relative overflow-hidden">
        {/* Warm copper ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/[0.08] rounded-full blur-[160px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
          
          {/* STEP 1: Simple 3-Question Intake */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <SectionReveal className="text-center mb-12 md:mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/40 text-primary text-xs sm:text-sm font-bold mb-6 tracking-wider uppercase">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  Confidential Recovery Assessment
                </div>
                
                <h2 className="heading-section text-white uppercase tracking-tight mb-6">
                  Start Your Case Assessment
                </h2>
                
                <p className="body-large text-white/80 leading-relaxed font-normal max-w-2xl mx-auto">
                  Instead of filling out a complicated form, answer 3 simple questions to see how our team reviews your situation.
                </p>
              </SectionReveal>

              <div className="p-8 md:p-12 rounded-xl bg-card border border-white/10 shadow-2xl space-y-10">
                {/* Question 1: What happened? */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-lg bg-primary text-black font-bold text-sm flex items-center justify-center">1</span>
                    <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-white">
                      What happened to your money?
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {SITUATIONS.map((sit) => {
                      const isSelected = selectedSituation === sit.id;
                      return (
                        <button
                          key={sit.id}
                          type="button"
                          onClick={() => setSelectedSituation(sit.id)}
                          className={cn(
                            "p-5 rounded-xl border text-left transition-all flex items-start justify-between gap-3 group",
                            isSelected
                              ? "bg-primary/10 border-primary text-white shadow-md shadow-primary/10"
                              : "bg-background border-white/10 hover:border-white/30 text-foreground/80 hover:text-white"
                          )}
                        >
                          <div>
                            <span className="text-sm sm:text-base font-semibold block leading-snug mb-1">
                              [ {sit.title} ]
                            </span>
                            <span className="text-xs text-primary/80 font-medium">
                              {sit.category}
                            </span>
                          </div>
                          <div className={cn(
                            "w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5",
                            isSelected ? "border-primary bg-primary text-black" : "border-white/20"
                          )}>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-black" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Question 2: Amount Range */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-lg bg-primary text-black font-bold text-sm flex items-center justify-center">2</span>
                    <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-white">
                      Approximately how much was lost?
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {AMOUNT_RANGES.map((amt) => {
                      const isSelected = selectedAmount === amt;
                      return (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setSelectedAmount(amt)}
                          className={cn(
                            "py-3.5 px-3 rounded-xl border text-center text-sm font-semibold transition-all",
                            isSelected
                              ? "bg-primary text-black font-bold border-primary shadow-md shadow-primary/20"
                              : "bg-background border-white/10 text-muted-foreground hover:border-white/30 hover:text-white"
                          )}
                        >
                          {amt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Question 3: Timing */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-lg bg-primary text-black font-bold text-sm flex items-center justify-center">3</span>
                    <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-white">
                      When did the transaction or scam occur?
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {TIMING_RANGES.map((time) => {
                      const isSelected = selectedTiming === time;
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTiming(time)}
                          className={cn(
                            "py-3.5 px-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between",
                            isSelected
                              ? "bg-primary/10 border-primary text-white font-semibold"
                              : "bg-background border-white/10 text-muted-foreground hover:border-white/30 hover:text-white"
                          )}
                        >
                          <span>{time}</span>
                          {isSelected && <span className="w-2 h-2 rounded-full bg-primary" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-muted-foreground">
                    Zero obligation • Strictly confidential preliminary assessment
                  </span>
                  
                  <Button
                    type="button"
                    onClick={handleContinueToReview}
                    size="lg"
                    className="w-full sm:w-auto h-14 px-8 text-base bg-primary text-black hover:bg-primary/90 font-bold uppercase tracking-wider rounded-xl premium-cta"
                  >
                    Continue Assessment <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Case Summary, Next Steps & Secure Submission */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center mb-10">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline mb-4 uppercase tracking-wider"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Edit Assessment Choices
                </button>
                <h2 className="heading-section text-white uppercase tracking-tight mb-3">
                  Your Case Assessment Summary
                </h2>
                <p className="body-large text-muted-foreground max-w-xl mx-auto">
                  Based on the information you have provided, here is how our investigative team views your situation:
                </p>
              </div>

              {/* Case Summary Card */}
              <div className="p-8 md:p-10 rounded-xl bg-card border border-primary/30 shadow-2xl mb-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-white/10 text-center sm:text-left">
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">
                      Case Situation:
                    </span>
                    <span className="text-base sm:text-lg font-bold text-white uppercase tracking-tight">
                      {currentSituationObj.category}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">
                      Primary Asset / Method:
                    </span>
                    <span className="text-base sm:text-lg font-bold text-primary">
                      {currentSituationObj.asset}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">
                      Estimated Loss Range:
                    </span>
                    <span className="text-base sm:text-lg font-bold text-white">
                      {selectedAmount}
                    </span>
                  </div>
                </div>

                {/* User-Mandated Next Steps Notice */}
                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-primary" /> Next Step:
                  </h4>
                  <p className="text-sm sm:text-base text-foreground/95 leading-relaxed font-medium">
                    Based on the information you've provided, the next step is to review the available evidence and determine what recovery options may exist.
                  </p>
                </div>

                {/* User-Mandated Prominent Disclaimer */}
                <div className="p-5 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" /> Important Honesty Notice:
                  </h4>
                  <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-medium">
                    Important: No legitimate recovery service can guarantee that lost funds will be recovered. Recovery depends on the circumstances, available evidence, payment method, timing and other factors.
                  </p>
                </div>

                {/* Final Contact Fields to Receive the Case Review */}
                <form onSubmit={handleFinalSubmit} className="pt-4 space-y-5">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                    Where should our investigators send your evaluation?
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">
                        Full Name *
                      </Label>
                      <Input
                        required
                        placeholder="e.g. David Miller"
                        value={contactInfo.name}
                        onChange={e => setContactInfo({...contactInfo, name: e.target.value})}
                        className="h-12 bg-background border-white/10 rounded-xl text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">
                        Email Address *
                      </Label>
                      <Input
                        required
                        type="email"
                        placeholder="e.g. david@example.com"
                        value={contactInfo.email}
                        onChange={e => setContactInfo({...contactInfo, email: e.target.value})}
                        className="h-12 bg-background border-white/10 rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">
                        Phone or WhatsApp (Optional)
                      </Label>
                      <Input
                        placeholder="+1 (555) 000-0000"
                        value={contactInfo.phone}
                        onChange={e => setContactInfo({...contactInfo, phone: e.target.value})}
                        className="h-12 bg-background border-white/10 rounded-xl text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">
                        Country of Residence
                      </Label>
                      <Input
                        placeholder="e.g. United States, UK, Canada..."
                        value={contactInfo.country}
                        onChange={e => setContactInfo({...contactInfo, country: e.target.value})}
                        className="h-12 bg-background border-white/10 rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">
                      Brief Notes / Platform Name / Wallet Addresses (Optional)
                    </Label>
                    <Textarea
                      placeholder="Briefly describe what happened (platform name, approximate dates, or receiving addresses if you have them ready). Start with whatever you have."
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      className="min-h-[100px] bg-background border-white/10 rounded-xl text-sm leading-relaxed"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-16 text-base font-bold uppercase tracking-wider bg-primary text-black hover:bg-primary/90 rounded-xl shadow-xl shadow-primary/20"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Generating Confidential Dossier...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Submit For Confidential Case Review <ArrowRight className="w-5 h-5" />
                      </span>
                    )}
                  </Button>

                  <div className="flex flex-wrap items-center justify-between text-xs text-muted-foreground pt-2">
                    <span className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-primary" /> 256-Bit Encrypted Intake
                    </span>
                    <span>No Upfront Fees</span>
                    <span>Delaware Registered Corporate Entity</span>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* STEP 3: Confirmation Screen */}
          {step === 3 && (
            <div className="animate-in fade-in zoom-in-95 duration-700 text-center py-16">
              <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/20">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>

              <h2 className="heading-section text-white uppercase tracking-tight mb-4">
                Case Intake Registered
              </h2>

              <div className="inline-block px-4 py-2 rounded-full bg-card border border-white/10 text-primary font-mono text-sm font-bold mb-6">
                Case Reference: {caseId}
              </div>

              <p className="body-large text-muted-foreground max-w-xl mx-auto leading-relaxed mb-8">
                Thank you, {contactInfo.name}. A senior investigator has received your submission and will review your transaction timeline and available records within 24 to 48 hours.
              </p>

              <div className="p-6 rounded-xl bg-card border border-white/10 max-w-lg mx-auto text-left space-y-3 mb-10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Important Next Steps:</h4>
                <ul className="space-y-2 text-xs text-muted-foreground leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    Do not delete any chat threads, deposit receipts, or platform emails.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    Be extremely cautious: do not send any extra money for "release fees" or "taxes".
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    Check your email ({contactInfo.email}) for your confirmation receipt.
                  </li>
                </ul>
              </div>

              <Button
                onClick={() => setStep(1)}
                className="h-12 px-8 rounded-xl bg-primary text-black font-bold uppercase tracking-wider hover:bg-primary/90"
              >
                Submit Another Case
              </Button>
            </div>
          )}

        </div>
      </section>
    </>
  );
}
