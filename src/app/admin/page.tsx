'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { 
  Shield, 
  Activity, 
  FileText, 
  ChevronRight, 
  User, 
  Globe, 
  Clock, 
  LogOut, 
  Search,
  Filter,
  Trash2,
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Fingerprint,
  Target,
  ShieldCheck,
  Network,
  Upload,
  Image as ImageIcon,
  Settings,
  Info,
  Layers,
  Star,
  Plus,
  TrendingUp,
  Landmark,
  Wallet,
  Briefcase,
  Download,
  Database,
  Lock,
  RefreshCw,
  SlidersHorizontal,
  X,
  ExternalLink,
  Copy,
  FileSpreadsheet,
  AlertTriangle,
  Check,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Eye,
  ArrowUpDown,
  Coins,
  CreditCard,
  Heart,
  CandlestickChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import placeholderData from '@/app/lib/placeholder-images.json';

type CaseRecord = {
  id: string;
  case_id: string;
  case_type: string;
  user_name: string;
  user_email: string;
  user_phone?: string;
  user_country: string;
  risk_level: string;
  evidence_integrity: string;
  status: string;
  created_at: string;
  description: string;
  result_data: any;
  form_values: any;
  evidence_files: {name: string, path: string, url: string}[];
  best_contact_time?: string;
  preferred_method?: string;
};

type SuccessStory = {
  id: string;
  case_id: string;
  case_type: string;
  amount: string;
  status: string;
  challenge: string;
  focus: string;
  outcome: string;
  narrative: string;
  icon_name: string;
};

const STATUS_OPTIONS = [
  'Review Pending',
  'Investigating',
  'Evidence Verified',
  'Escalated to Authorities',
  'Resolved',
  'Closed / Unviable'
];

/**
 * InstitutionalDecryptor - Clinical state wrapper for sensitive case file expansion.
 */
function InstitutionalDecryptor({ children, caseId, label = "Case File" }: { children: React.ReactNode, caseId?: string, label?: string }) {
  const [state, setState] = useState<'decrypting' | 'open'>('decrypting');

  useEffect(() => {
    const timer = setTimeout(() => setState('open'), 350);
    return () => clearTimeout(timer);
  }, []);

  if (state === 'decrypting') {
    return (
      <div className="h-[420px] flex flex-col items-center justify-center space-y-6 bg-card/60 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-primary">
            {label} {caseId && `: ${caseId}`}
          </span>
        </div>
        <div className="text-xl md:text-2xl font-headline font-bold uppercase tracking-tight text-white flex items-center gap-3">
          <Lock className="w-5 h-5 text-primary animate-pulse" />
          Decrypting Forensic Dossier...
        </div>
        <div className="w-72 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
          <div className="absolute top-0 h-full w-28 bg-gradient-to-r from-transparent via-primary to-transparent animate-stream-pulse" />
        </div>
        <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
          Delaware Department Record • Authorized Access Only
        </p>
      </div>
    );
  }

  return <div className="animate-in fade-in duration-300">{children}</div>;
}

export default function AdminDashboard() {
  const [cases, setCases] = useState<CaseRecord[]>([]);
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCase, setSelectedCase] = useState<CaseRecord | null>(null);
  
  // Search & Filtering State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  // Logo State
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  // Hero Background State
  const [heroBgFile, setHeroBgFile] = useState<File | null>(null);
  const [heroBgPreview, setHeroBgPreview] = useState<string | null>(null);
  const [uploadingHeroBg, setUploadingHeroBg] = useState(false);
  const [heroBgUrl, setHeroBgUrl] = useState<string | null>(null);
  
  // Success Story Form State
  const [isStoryDialogOpen, setIsStoryDialogOpen] = useState(false);
  const [storyForm, setStoryForm] = useState<Partial<SuccessStory>>({
    case_id: '',
    case_type: '',
    amount: '',
    status: 'Resolved',
    challenge: '',
    focus: '',
    outcome: '',
    narrative: '',
    icon_name: 'TrendingUp'
  });

  // Media Library State
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [assetFile, setAssetFile] = useState<File | null>(null);
  const [assetPreview, setAssetPreview] = useState<string | null>(null);
  const [uploadingAsset, setUploadingAsset] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    fetchCases();
    fetchStories();
    fetchLogo();
    fetchHeroBg();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/admin/login');
    }
  };

  const fetchLogo = async () => {
    try {
      const { data } = supabase.storage
        .from('assets')
        .getPublicUrl('logo.png');
      
      if (data?.publicUrl) {
        setLogoUrl(`${data.publicUrl}?t=${Date.now()}`);
      }
    } catch {
      setLogoUrl(null);
    }
  };

  const fetchHeroBg = async () => {
    // 1. Check local API endpoint (persisted on server/public)
    try {
      const res = await fetch('/api/admin/hero-bg', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.exists && data.url) {
          setHeroBgUrl(data.url);
          return;
        }
      }
    } catch {
      // Continue to Supabase fallback
    }

    // 2. Check Supabase storage
    try {
      const { data } = supabase.storage
        .from('assets')
        .getPublicUrl('hero-bg.png');
      
      if (data?.publicUrl) {
        setHeroBgUrl(`${data.publicUrl}?t=${Date.now()}`);
        return;
      }
    } catch {
      // Continue to localStorage fallback
    }

    // 3. Fallback to localStorage cache
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('elitethics_hero_bg');
      if (cached) {
        setHeroBgUrl(cached);
        return;
      }
    }

    setHeroBgUrl(null);
  };

  const fetchCases = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching cases:', error);
      toast({
        variant: 'destructive',
        title: 'Sync Error',
        description: 'Unable to reach case database.'
      });
    } else {
      setCases(data || []);
    }
    setLoading(false);
  };

  const fetchStories = async () => {
    const { data, error } = await supabase
      .from('success_stories')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching stories:', error);
    } else {
      setStories(data || []);
    }
  };

  const updateCaseStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('cases')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setCases(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
      if (selectedCase && selectedCase.id === id) {
        setSelectedCase(prev => prev ? { ...prev, status: newStatus } : null);
      }

      toast({
        title: 'Status Updated',
        description: `Case marked as '${newStatus}'.`
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: error.message || 'Could not update status.'
      });
    }
  };

  const deleteCase = async (id: string) => {
    if (confirm('Permanently delete this forensic record from the ledger? This action cannot be undone.')) {
      const { error } = await supabase.from('cases').delete().eq('id', id);
      if (!error) {
        setCases(cases.filter(c => c.id !== id));
        if (selectedCase?.id === id) setSelectedCase(null);
        toast({ title: "Record Removed", description: "Forensic record purged." });
      } else {
        toast({ variant: 'destructive', title: "Delete Failed", description: error.message });
      }
    }
  };

  const insertSampleCase = async () => {
    try {
      const sampleId = `ET-${Math.floor(10000 + Math.random() * 90000)}`;
      const sampleData = {
        case_id: sampleId,
        case_type: 'Cryptocurrency Scam',
        user_name: 'Arthur Sterling',
        user_email: 'a.sterling@forensicclient.org',
        user_phone: '+1 (302) 555-0194',
        user_country: 'United States',
        risk_level: 'Critical',
        evidence_integrity: 'Substantial',
        status: 'Review Pending',
        description: 'Transferred 2.4 BTC to an unverified decentralized staking smart contract claiming guaranteed yield. Transaction hash generated on-chain but funds redirected to multiple tumbling hops.',
        form_values: {
          platformName: 'StakingVault-X',
          lossAmount: '$148,000 USD equivalent',
          timeElapsed: 'Within last 48 hours',
          transactionHash: '0x7b23f81e9d1a55c2f8101a1829e34c9103bc2143'
        },
        evidence_files: [
          { name: 'blockchain_tx_receipt.pdf', path: 'evidence/tx.pdf', url: 'https://picsum.photos/seed/doc1/800/600' }
        ],
        best_contact_time: 'Morning EST',
        preferred_method: 'Email & WhatsApp'
      };

      const { data, error } = await supabase.from('cases').insert([sampleData]).select();
      if (error) throw error;

      toast({
        title: "Test Intake Injected",
        description: `Sample case #${sampleId} created for review.`
      });
      fetchCases();
    } catch (err: any) {
      toast({ variant: 'destructive', title: "Creation Failed", description: err.message });
    }
  };

  const deleteStory = async (id: string) => {
    if (confirm('Delete this case insight?')) {
      const { error } = await supabase.from('success_stories').delete().eq('id', id);
      if (!error) {
        setStories(stories.filter(s => s.id !== id));
        toast({ title: "Insight Removed" });
      }
    }
  };

  const saveStory = async () => {
    if (!storyForm.case_id || !storyForm.challenge) {
      toast({ variant: 'destructive', title: "Missing Information", description: "Case ID and Challenge are required." });
      return;
    }

    try {
      const { error } = await supabase
        .from('success_stories')
        .insert([storyForm]);

      if (error) throw error;

      toast({ title: "Resolution Registered", description: "The case insight is now live on the site." });
      setIsStoryDialogOpen(false);
      setStoryForm({
        case_id: '',
        case_type: '',
        amount: '',
        status: 'Resolved',
        challenge: '',
        focus: '',
        outcome: '',
        narrative: '',
        icon_name: 'TrendingUp'
      });
      fetchStories();
    } catch (error: any) {
      toast({ variant: 'destructive', title: "Save Failed", description: error.message });
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const uploadLogo = async () => {
    if (!logoFile) return;
    setUploadingLogo(true);

    try {
      const { error } = await supabase.storage
        .from('assets')
        .upload('logo.png', logoFile, {
          upsert: true,
          contentType: logoFile.type
        });

      if (error) throw error;

      toast({
        title: "Branding Updated",
        description: "The website logo has been successfully synchronized.",
      });
      setLogoFile(null);
      setLogoPreview(null);
      fetchLogo();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Upload Error",
        description: error.message || "Ensure 'assets' bucket exists and is Public.",
      });
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleHeroBgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setHeroBgFile(file);
      setHeroBgPreview(URL.createObjectURL(file));
    }
  };

  const uploadHeroBg = async () => {
    if (!heroBgFile) return;
    setUploadingHeroBg(true);

    let uploaded = false;

    // 1. Upload to local API route (guaranteed server persistence)
    try {
      const formData = new FormData();
      formData.append('file', heroBgFile);
      const res = await fetch('/api/admin/hero-bg', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.url) {
          uploaded = true;
          setHeroBgUrl(json.url);
        }
      }
    } catch (apiErr) {
      console.warn('API hero upload failed, trying Supabase fallback:', apiErr);
    }

    // 2. Also try Supabase storage
    try {
      const { error } = await supabase.storage
        .from('assets')
        .upload('hero-bg.png', heroBgFile, {
          upsert: true,
          contentType: heroBgFile.type
        });
      if (!error) {
        uploaded = true;
      }
    } catch (sbErr) {
      console.warn('Supabase storage fallback skipped:', sbErr);
    }

    // 3. Cache base64 in localStorage for immediate client-side display
    try {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          localStorage.setItem('elitethics_hero_bg', ev.target.result as string);
        }
      };
      reader.readAsDataURL(heroBgFile);
    } catch {}

    if (uploaded || heroBgPreview) {
      toast({
        title: "Hero Background Synchronized",
        description: "The website hero background has been successfully updated and applied.",
      });
      setHeroBgFile(null);
      setHeroBgPreview(null);
      fetchHeroBg();
    } else {
      toast({
        variant: "destructive",
        title: "Upload Error",
        description: "Could not apply hero background. Please check file format and try again.",
      });
    }

    setUploadingHeroBg(false);
  };

  const resetHeroBg = async () => {
    if (!confirm('Revert the website hero to the default ambient gradient?')) return;
    try {
      await fetch('/api/admin/hero-bg', { method: 'DELETE' });
    } catch {}
    if (typeof window !== 'undefined') {
      localStorage.removeItem('elitethics_hero_bg');
    }
    try {
      await supabase.storage.from('assets').remove(['hero-bg.png']);
    } catch {}
    setHeroBgUrl(null);
    setHeroBgPreview(null);
    setHeroBgFile(null);
    toast({
      title: "Hero Background Reset",
      description: "Website hero reverted to standard ambient glow.",
    });
  };

  const handleAssetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAssetFile(file);
      setAssetPreview(URL.createObjectURL(file));
    }
  };

  const uploadAsset = async () => {
    if (!assetFile || !selectedAssetId) return;
    setUploadingAsset(true);

    try {
      const fileName = `${selectedAssetId}.png`;
      const { error } = await supabase.storage
        .from('assets')
        .upload(fileName, assetFile, {
          upsert: true,
          contentType: assetFile.type
        });

      if (error) throw error;

      toast({
        title: "Media Synchronized",
        description: `The asset '${selectedAssetId}' has been updated successfully.`,
      });
      setAssetFile(null);
      setAssetPreview(null);
      setSelectedAssetId(null);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Media Error",
        description: error.message,
      });
    } finally {
      setUploadingAsset(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  // Export Table as CSV
  const exportCasesCSV = () => {
    if (cases.length === 0) {
      toast({ title: "No Data", description: "No case records to export." });
      return;
    }

    const headers = ["Case ID", "Date", "Name", "Email", "Phone", "Country", "Category", "Risk Level", "Status", "Description"];
    const rows = filteredCases.map(c => [
      c.case_id,
      new Date(c.created_at).toISOString(),
      `"${c.user_name || ''}"`,
      `"${c.user_email || ''}"`,
      `"${c.user_phone || ''}"`,
      `"${c.user_country || ''}"`,
      `"${c.case_type || ''}"`,
      c.risk_level || '',
      c.status || '',
      `"${(c.description || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `elitethics_cases_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: "Dossiers Exported", description: `Exported ${filteredCases.length} records.` });
  };

  // Filtered & Sorted Cases
  const filteredCases = useMemo(() => {
    return cases.filter(c => {
      // Search
      const search = searchQuery.toLowerCase().trim();
      const matchesSearch = !search || 
        c.case_id?.toLowerCase().includes(search) ||
        c.user_name?.toLowerCase().includes(search) ||
        c.user_email?.toLowerCase().includes(search) ||
        c.user_phone?.toLowerCase().includes(search) ||
        c.user_country?.toLowerCase().includes(search) ||
        c.case_type?.toLowerCase().includes(search) ||
        c.description?.toLowerCase().includes(search);

      // Status
      const matchesStatus = statusFilter === 'all' || c.status?.toLowerCase() === statusFilter.toLowerCase();

      // Risk
      const matchesRisk = riskFilter === 'all' || c.risk_level?.toLowerCase() === riskFilter.toLowerCase();

      // Category
      const matchesCategory = categoryFilter === 'all' || c.case_type?.toLowerCase().includes(categoryFilter.toLowerCase());

      return matchesSearch && matchesStatus && matchesRisk && matchesCategory;
    }).sort((a, b) => {
      const timeA = new Date(a.created_at).getTime();
      const timeB = new Date(b.created_at).getTime();
      return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
    });
  }, [cases, searchQuery, statusFilter, riskFilter, categoryFilter, sortOrder]);

  const activeFiltersCount = (statusFilter !== 'all' ? 1 : 0) + (riskFilter !== 'all' ? 1 : 0) + (categoryFilter !== 'all' ? 1 : 0) + (searchQuery ? 1 : 0);

  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setRiskFilter('all');
    setCategoryFilter('all');
    setSortOrder('newest');
  };

  // Helper icons for categories
  const getCategoryBadge = (category: string) => {
    const cat = (category || '').toLowerCase();
    if (cat.includes('crypto') || cat.includes('coin') || cat.includes('btc')) {
      return { icon: Coins, label: 'Crypto Forensic', color: 'border-amber-500/30 text-amber-400 bg-amber-500/10' };
    }
    if (cat.includes('invest') || cat.includes('trading') || cat.includes('broker')) {
      return { icon: CandlestickChart, label: 'Investment Fraud', color: 'border-blue-500/30 text-blue-400 bg-blue-500/10' };
    }
    if (cat.includes('loan') || cat.includes('credit')) {
      return { icon: CreditCard, label: 'Advance Fee / Loan', color: 'border-purple-500/30 text-purple-400 bg-purple-500/10' };
    }
    if (cat.includes('romance') || cat.includes('heart')) {
      return { icon: Heart, label: 'Romance Scam', color: 'border-rose-500/30 text-rose-400 bg-rose-500/10' };
    }
    if (cat.includes('wallet')) {
      return { icon: Wallet, label: 'Wallet Compromise', color: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' };
    }
    return { icon: Target, label: category || 'General Intake', color: 'border-white/10 text-white/80 bg-white/5' };
  };

  return (
    <main className="min-h-screen bg-[#0A0D12] text-foreground selection:bg-primary/30 relative font-body pb-20">
      
      {/* Tactical Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[700px] h-[450px] bg-primary/[0.035] rounded-full blur-[160px]" />
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-secondary/[0.02] rounded-full blur-[140px]" />
      </div>

      {/* TOP COMMAND NAVIGATION */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0F1319]/90 backdrop-blur-xl">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo & Platform ID */}
          <div className="flex items-center gap-3.5">
            <div className={cn(
              "w-11 h-11 rounded-lg flex items-center justify-center transition-all overflow-hidden border border-white/10 shadow-lg",
              logoUrl ? "bg-black/60 p-1" : "bg-gradient-to-br from-primary to-primary/80"
            )}>
              {logoUrl ? (
                <img 
                  src={logoUrl} 
                  alt="Elitethics Logo" 
                  className="w-full h-full object-contain"
                  onError={() => setLogoUrl(null)}
                />
              ) : (
                <Shield className="text-black w-6 h-6" />
              )}
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-headline font-bold tracking-tight uppercase text-white">
                  Command Center
                </h1>
                <div className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[9px] font-mono font-semibold tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  NODE 01 • ACTIVE
                </div>
              </div>
              <p className="text-[9px] font-mono uppercase tracking-[0.22em] text-primary">
                Elitethics Forensic Intelligence Engine
              </p>
            </div>
          </div>

          {/* Action Center Modals & Signout */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Export CSV */}
            <Button
              onClick={exportCasesCSV}
              variant="outline"
              size="sm"
              className="hidden md:inline-flex h-9 border-white/10 bg-card/60 hover:bg-white/10 text-xs font-semibold uppercase tracking-wider rounded-lg"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 mr-2 text-primary" />
              Export CSV
            </Button>

            {/* Resolutions Modal */}
            <Dialog open={isStoryDialogOpen} onOpenChange={setIsStoryDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-9 border-white/10 bg-card/60 hover:bg-white/10 text-xs font-semibold uppercase tracking-wider rounded-lg"
                >
                  <Star className="w-3.5 h-3.5 mr-1.5 text-primary" />
                  <span className="hidden sm:inline">Resolutions</span>
                  <Badge className="ml-1.5 px-1.5 py-0 h-4 bg-primary/20 text-primary border-primary/30 text-[9px]">
                    {stories.length}
                  </Badge>
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-card border-white/15 max-w-5xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
                <DialogHeader>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono uppercase tracking-wider w-fit mb-2">
                    <Sparkles className="w-3 h-3" /> Case Evidence Showcases
                  </div>
                  <DialogTitle className="text-2xl font-headline font-bold uppercase tracking-tight text-white">
                    Forensic Case Resolutions
                  </DialogTitle>
                  <DialogDescription className="text-xs text-muted-foreground">
                    Create and manage verified case insights and client recovery outcomes presented on the public portal.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="py-6 grid md:grid-cols-2 gap-8">
                  {/* Form */}
                  <div className="p-6 rounded-xl border border-primary/25 bg-primary/[0.03] space-y-4">
                    <h4 className="text-xs font-headline font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                      <Plus className="w-4 h-4" /> Register New Case Outcome
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground">Case ID</Label>
                        <Input 
                          placeholder="e.g. ET-84920" 
                          className="bg-black/40 border-white/10 text-xs h-9" 
                          value={storyForm.case_id} 
                          onChange={e => setStoryForm({...storyForm, case_id: e.target.value})} 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground">Division</Label>
                        <Input 
                          placeholder="e.g. Crypto / Forex" 
                          className="bg-black/40 border-white/10 text-xs h-9" 
                          value={storyForm.case_type} 
                          onChange={e => setStoryForm({...storyForm, case_type: e.target.value})} 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground">Recovered / Traced</Label>
                        <Input 
                          placeholder="e.g. $145,000 USD" 
                          className="bg-black/40 border-white/10 text-xs h-9" 
                          value={storyForm.amount} 
                          onChange={e => setStoryForm({...storyForm, amount: e.target.value})} 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground">Visual Category</Label>
                        <Select value={storyForm.icon_name} onValueChange={val => setStoryForm({...storyForm, icon_name: val})}>
                          <SelectTrigger className="bg-black/40 border-white/10 text-xs h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-white/10">
                            <SelectItem value="TrendingUp">Market / Forex</SelectItem>
                            <SelectItem value="Wallet">Digital Asset / Crypto</SelectItem>
                            <SelectItem value="Landmark">Institutional Wire</SelectItem>
                            <SelectItem value="Briefcase">Advance Fee / Loan</SelectItem>
                            <SelectItem value="Database">Darknet Tracing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground">Technical Challenge</Label>
                      <Input 
                        placeholder="e.g. Multi-hop wallet peeling and obfuscated mixers" 
                        className="bg-black/40 border-white/10 text-xs h-9" 
                        value={storyForm.challenge} 
                        onChange={e => setStoryForm({...storyForm, challenge: e.target.value})} 
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground">Forensic Focus</Label>
                      <Input 
                        placeholder="e.g. UTXO cluster analysis and subpoena preparation" 
                        className="bg-black/40 border-white/10 text-xs h-9" 
                        value={storyForm.focus} 
                        onChange={e => setStoryForm({...storyForm, focus: e.target.value})} 
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground">Investigative Outcome</Label>
                      <Input 
                        placeholder="e.g. Wallet cluster frozen on tier-1 exchange" 
                        className="bg-black/40 border-white/10 text-xs h-9" 
                        value={storyForm.outcome} 
                        onChange={e => setStoryForm({...storyForm, outcome: e.target.value})} 
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground">Public Case Narrative</Label>
                      <Textarea 
                        placeholder="Clinical summary of the case..." 
                        className="bg-black/40 border-white/10 text-xs min-h-[70px]" 
                        value={storyForm.narrative} 
                        onChange={e => setStoryForm({...storyForm, narrative: e.target.value})} 
                      />
                    </div>

                    <Button 
                      onClick={saveStory} 
                      className="w-full bg-primary text-black font-bold uppercase tracking-wider text-xs h-10 hover:bg-primary/90"
                    >
                      Publish Resolution
                    </Button>
                  </div>

                  {/* List */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-headline font-bold uppercase tracking-wider text-muted-foreground">
                      Published Case Insights ({stories.length})
                    </h4>
                    
                    <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
                      {stories.length === 0 ? (
                        <div className="p-8 border border-dashed border-white/10 text-center rounded-xl">
                          <p className="text-xs text-muted-foreground">No case insights registered yet.</p>
                        </div>
                      ) : (
                        stories.map(s => (
                          <div key={s.id} className="p-4 bg-card/60 border border-white/10 rounded-xl flex justify-between items-start group hover:border-primary/30 transition-all">
                            <div className="space-y-1 pr-3">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-[9px] font-mono text-primary border-primary/30">
                                  {s.case_id}
                                </Badge>
                                <span className="text-[11px] font-bold text-white uppercase">{s.case_type}</span>
                                {s.amount && (
                                  <span className="text-[11px] font-mono text-emerald-400 font-bold ml-1">{s.amount}</span>
                                )}
                              </div>
                              <p className="text-xs font-semibold text-white/90">{s.challenge}</p>
                              <p className="text-[11px] text-muted-foreground line-clamp-2">{s.outcome}</p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => deleteStory(s.id)} 
                              className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Branding Modal */}
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-9 border-white/10 bg-card/60 hover:bg-white/10 text-xs font-semibold uppercase tracking-wider rounded-lg"
                >
                  <Settings className="w-3.5 h-3.5 mr-1.5 text-primary" />
                  <span className="hidden sm:inline">Branding</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-card border-white/15 max-w-lg max-h-[90vh] overflow-y-auto p-6 sm:p-8">
                <DialogHeader>
                  <DialogTitle className="text-xl font-headline font-bold uppercase tracking-tight text-white">
                    Platform Assets & Branding
                  </DialogTitle>
                  <DialogDescription className="text-xs text-muted-foreground">
                    Upload official logos and high-resolution hero backgrounds to synchronize with the public site.
                  </DialogDescription>
                </DialogHeader>

                <div className="py-6 space-y-6">
                  {/* Logo Upload */}
                  <div className="p-5 border border-white/10 bg-card/50 rounded-xl space-y-3">
                    <Label className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" /> Official Platform Logo
                    </Label>
                    <div className="flex flex-col items-center justify-center p-6 border border-dashed border-white/15 bg-black/40 rounded-lg relative cursor-pointer group hover:border-primary/50 transition-colors">
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        onChange={handleLogoChange}
                      />
                      {logoPreview ? (
                        <img src={logoPreview} alt="Preview" className="h-14 w-auto object-contain mb-2" />
                      ) : (
                        <Upload className="w-7 h-7 text-muted-foreground mb-2 group-hover:text-primary transition-colors" />
                      )}
                      <p className="text-[11px] text-muted-foreground font-mono uppercase tracking-wider text-center">
                        {logoFile ? logoFile.name : 'Choose Logo (PNG / SVG with transparency)'}
                      </p>
                    </div>
                    <Button 
                      onClick={uploadLogo} 
                      disabled={!logoFile || uploadingLogo}
                      size="sm"
                      className="w-full h-9 bg-primary text-black font-bold uppercase tracking-wider text-xs"
                    >
                      {uploadingLogo ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-2" /> : <Upload className="w-3.5 h-3.5 mr-2" />}
                      Sync Logo
                    </Button>
                  </div>

                  {/* Hero Background Upload */}
                  <div className="p-5 border border-white/10 bg-card/50 rounded-xl space-y-3">
                    <Label className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" /> Hero Ambient Background
                    </Label>
                    <div className="flex flex-col items-center justify-center p-6 border border-dashed border-white/15 bg-black/40 rounded-lg relative cursor-pointer group hover:border-primary/50 transition-colors">
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        onChange={handleHeroBgChange}
                      />
                      {heroBgPreview ? (
                        <img src={heroBgPreview} alt="Preview" className="h-20 w-auto object-cover rounded mb-2" />
                      ) : (
                        <Upload className="w-7 h-7 text-muted-foreground mb-2 group-hover:text-primary transition-colors" />
                      )}
                      <p className="text-[11px] text-muted-foreground font-mono uppercase tracking-wider text-center">
                        {heroBgFile ? heroBgFile.name : 'Choose High-Res Background (PNG / WebP)'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={uploadHeroBg} 
                        disabled={!heroBgFile || uploadingHeroBg}
                        size="sm"
                        className="flex-1 h-9 bg-primary text-black font-bold uppercase tracking-wider text-xs"
                      >
                        {uploadingHeroBg ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-2" /> : <Upload className="w-3.5 h-3.5 mr-2" />}
                        Sync Hero Background
                      </Button>
                      {heroBgUrl && (
                        <Button 
                          onClick={resetHeroBg} 
                          variant="outline"
                          size="sm"
                          className="h-9 border-destructive/30 text-destructive hover:bg-destructive/10 text-xs font-bold uppercase tracking-wider px-3"
                        >
                          Reset
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Dedicated Hero Background Modal */}
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={cn(
                    "h-9 border-white/10 bg-card/60 hover:bg-white/10 text-xs font-semibold uppercase tracking-wider rounded-lg",
                    heroBgUrl && "border-primary/40 text-primary"
                  )}
                >
                  <ImageIcon className="w-3.5 h-3.5 mr-1.5 text-primary" />
                  <span className="hidden sm:inline">Hero Background</span>
                  {heroBgUrl && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-1.5" title="Custom Hero Active" />
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-card border-white/15 max-w-xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
                <DialogHeader>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono uppercase tracking-wider w-fit mb-2">
                    <Sparkles className="w-3 h-3" /> Live Landing Visuals
                  </div>
                  <DialogTitle className="text-2xl font-headline font-bold uppercase tracking-tight text-white">
                    Hero Background Customizer
                  </DialogTitle>
                  <DialogDescription className="text-xs text-muted-foreground">
                    Upload an ambient forensic image or texture to display behind the main Hero on the public website.
                  </DialogDescription>
                </DialogHeader>

                <div className="py-6 space-y-6">
                  {/* Current Active Preview */}
                  <div className="p-4 rounded-xl border border-white/10 bg-black/50 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono uppercase font-bold text-muted-foreground text-[10px]">Current Status:</span>
                      {heroBgUrl ? (
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px] font-mono">
                          Custom Image Active
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-white/10 text-muted-foreground text-[10px] font-mono">
                          Default Ambient Glow Active
                        </Badge>
                      )}
                    </div>

                    <div className="aspect-[16/9] w-full rounded-lg bg-black border border-white/10 overflow-hidden relative flex items-center justify-center">
                      {heroBgPreview ? (
                        <img src={heroBgPreview} alt="Selected Preview" className="w-full h-full object-cover" />
                      ) : heroBgUrl ? (
                        <img src={heroBgUrl} alt="Active Hero Background" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-center p-6 space-y-2">
                          <ImageIcon className="w-8 h-8 text-muted-foreground/40 mx-auto" />
                          <p className="text-xs text-muted-foreground font-mono">Default charcoal & copper ambient gradient</p>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-3 left-3 right-3 text-center">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white/80 bg-black/60 px-2 py-1 rounded">
                          {heroBgPreview ? 'New Image Selected (Click Upload To Apply)' : heroBgUrl ? 'Live Hero Active' : 'Default Glow'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* File Upload Dropzone */}
                  <div className="p-5 border border-dashed border-white/15 bg-card/40 rounded-xl space-y-3 relative group hover:border-primary/40 transition-colors">
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      onChange={handleHeroBgChange}
                    />
                    <div className="flex flex-col items-center justify-center py-4 text-center">
                      <Upload className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                        {heroBgFile ? heroBgFile.name : 'Choose Hero Background Image'}
                      </p>
                      <p className="text-[11px] text-muted-foreground font-mono">
                        Supports PNG, JPG, JPEG, WEBP (Recommended: 1920x1080 or higher)
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={uploadHeroBg} 
                      disabled={!heroBgFile || uploadingHeroBg}
                      className="flex-1 h-11 bg-primary text-black font-bold uppercase tracking-wider text-xs shadow-lg shadow-primary/20 hover:bg-primary/90"
                    >
                      {uploadingHeroBg ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Upload className="w-4 h-4 mr-2" />}
                      Upload & Apply Background
                    </Button>

                    {heroBgUrl && (
                      <Button 
                        onClick={resetHeroBg} 
                        variant="outline"
                        className="h-11 border-destructive/30 text-destructive hover:bg-destructive/10 text-xs font-semibold uppercase tracking-wider"
                      >
                        Reset to Default
                      </Button>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Media Library Modal */}
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-9 border-white/10 bg-card/60 hover:bg-white/10 text-xs font-semibold uppercase tracking-wider rounded-lg"
                >
                  <Layers className="w-3.5 h-3.5 mr-1.5 text-primary" />
                  <span className="hidden sm:inline">Media Library</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-card border-white/15 max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
                <DialogHeader>
                  <DialogTitle className="text-xl font-headline font-bold uppercase tracking-tight text-white">
                    Platform Media Assets
                  </DialogTitle>
                  <DialogDescription className="text-xs text-muted-foreground">
                    Replace forensic analyst avatars and institutional imagery across the site.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="py-6 space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {placeholderData.placeholderImages.map((asset) => (
                      <div 
                        key={asset.id}
                        onClick={() => setSelectedAssetId(asset.id)}
                        className={cn(
                          "p-3 rounded-lg border border-white/10 bg-card/50 cursor-pointer hover:border-primary/50 transition-all text-center space-y-2",
                          selectedAssetId === asset.id && "border-primary ring-1 ring-primary bg-primary/10"
                        )}
                      >
                        <div className="aspect-[4/3] bg-black/50 rounded flex items-center justify-center relative overflow-hidden">
                          <img src={asset.imageUrl} alt={asset.id} className="object-cover w-full h-full opacity-60" />
                        </div>
                        <p className="text-[10px] font-mono uppercase font-bold text-white/90 truncate">{asset.id.replace('-', ' ')}</p>
                      </div>
                    ))}
                  </div>

                  {selectedAssetId && (
                    <div className="p-6 rounded-xl border border-primary/30 bg-primary/[0.04] space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-mono uppercase font-bold text-primary">
                          Replace Media: {selectedAssetId}
                        </h4>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedAssetId(null)} className="h-6 text-[10px] uppercase">
                          Cancel
                        </Button>
                      </div>

                      <div className="flex flex-col items-center justify-center p-6 border border-dashed border-primary/30 bg-black/50 rounded-lg relative cursor-pointer">
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="absolute inset-0 opacity-0 cursor-pointer z-10"
                          onChange={handleAssetChange}
                        />
                        {assetPreview ? (
                          <img src={assetPreview} alt="Preview" className="h-28 w-auto object-contain mb-2" />
                        ) : (
                          <Upload className="w-8 h-8 text-primary/60 mb-2" />
                        )}
                        <p className="text-xs font-mono uppercase text-muted-foreground">
                          {assetFile ? assetFile.name : 'Select replacement file'}
                        </p>
                      </div>

                      <Button 
                        onClick={uploadAsset} 
                        disabled={!assetFile || uploadingAsset}
                        className="w-full h-10 bg-primary text-black font-bold uppercase tracking-wider text-xs"
                      >
                        {uploadingAsset ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <ShieldCheck className="w-4 h-4 mr-2" />}
                        Synchronize Asset
                      </Button>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            {/* Logout */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout} 
              className="h-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10 text-xs font-semibold uppercase tracking-wider rounded-lg"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>

        </div>
      </header>

      {/* MAIN DASHBOARD CONTENT */}
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* STATS TILES (CLICKABLE FILTERS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          
          {/* Tile 1: Total Cases */}
          <Card 
            onClick={() => { setStatusFilter('all'); setRiskFilter('all'); }}
            className={cn(
              "glass-card border-white/10 hover:border-primary/40 transition-all cursor-pointer p-6 rounded-2xl relative overflow-hidden group",
              statusFilter === 'all' && riskFilter === 'all' && "border-primary/40 bg-card/80"
            )}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 text-primary">
                <FileText className="w-5 h-5" />
              </div>
              <Badge variant="outline" className="border-white/10 text-[9px] font-mono tracking-widest uppercase">
                All Ledgers
              </Badge>
            </div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
              Total Inbound Dossiers
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-headline font-bold text-white tabular-nums">
                {cases.length}
              </h3>
              <span className="text-xs text-muted-foreground">cases logged</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Card>

          {/* Tile 2: Critical Risk */}
          <Card 
            onClick={() => { setRiskFilter('Critical'); }}
            className={cn(
              "glass-card border-white/10 hover:border-destructive/40 transition-all cursor-pointer p-6 rounded-2xl relative overflow-hidden group",
              riskFilter === 'Critical' && "border-destructive/50 bg-destructive/[0.05]"
            )}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-destructive/10 rounded-xl border border-destructive/20 text-destructive">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <Badge className="bg-destructive/20 text-destructive border-destructive/30 text-[9px] font-mono uppercase tracking-widest">
                Priority
              </Badge>
            </div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
              Critical Risk Factors
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-headline font-bold text-destructive tabular-nums">
                {cases.filter(c => (c.risk_level || '').toLowerCase() === 'critical').length}
              </h3>
              <span className="text-xs text-muted-foreground">require fast interdiction</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-destructive/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Card>

          {/* Tile 3: Investigating Active */}
          <Card 
            onClick={() => { setStatusFilter('Investigating'); }}
            className={cn(
              "glass-card border-white/10 hover:border-amber-500/40 transition-all cursor-pointer p-6 rounded-2xl relative overflow-hidden group",
              statusFilter === 'Investigating' && "border-amber-500/50 bg-amber-500/[0.05]"
            )}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-400">
                <Activity className="w-5 h-5" />
              </div>
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-[9px] font-mono uppercase tracking-widest">
                In Progress
              </Badge>
            </div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
              Active Investigations
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-headline font-bold text-amber-400 tabular-nums">
                {cases.filter(c => (c.status || '').toLowerCase() === 'investigating').length}
              </h3>
              <span className="text-xs text-muted-foreground">tracing active</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Card>

          {/* Tile 4: Review Pending */}
          <Card 
            onClick={() => { setStatusFilter('Review Pending'); }}
            className={cn(
              "glass-card border-white/10 hover:border-primary/40 transition-all cursor-pointer p-6 rounded-2xl relative overflow-hidden group",
              statusFilter === 'Review Pending' && "border-primary/50 bg-primary/[0.05]"
            )}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 text-primary">
                <Clock className="w-5 h-5" />
              </div>
              <Badge className="bg-primary/20 text-primary border-primary/30 text-[9px] font-mono uppercase tracking-widest">
                Triage
              </Badge>
            </div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
              Pending Initial Triage
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-headline font-bold text-white tabular-nums">
                {cases.filter(c => (c.status || '').toLowerCase().includes('pending')).length}
              </h3>
              <span className="text-xs text-muted-foreground">awaiting analyst review</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Card>

        </div>

        {/* SEARCH, QUICK TABS & FILTER TOOLBAR */}
        <div className="p-4 sm:p-5 rounded-2xl bg-card/60 border border-white/10 backdrop-blur-md space-y-4">
          
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by Case ID, Participant name, Email, Country, or Description..."
                className="w-full h-11 pl-10 pr-10 bg-black/40 border-white/10 text-xs sm:text-sm rounded-xl focus:border-primary/50 text-white placeholder:text-muted-foreground/70"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Status Pill Tabs (Desktop) */}
            <div className="flex items-center gap-1.5 p-1 bg-black/40 border border-white/10 rounded-xl overflow-x-auto">
              {[
                { id: 'all', label: 'All Dossiers' },
                { id: 'Review Pending', label: 'Pending' },
                { id: 'Investigating', label: 'Investigating' },
                { id: 'Resolved', label: 'Resolved' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap",
                    statusFilter.toLowerCase() === tab.id.toLowerCase()
                      ? "bg-primary text-black font-bold shadow-md shadow-primary/20"
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Filter Dropdowns & Refresh */}
            <div className="flex items-center gap-2.5">
              
              {/* Detailed Filter Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className={cn(
                      "h-11 border-white/10 bg-black/40 text-xs font-semibold uppercase tracking-wider rounded-xl",
                      activeFiltersCount > 0 && "border-primary text-primary bg-primary/5"
                    )}
                  >
                    <Filter className="w-3.5 h-3.5 mr-2" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge className="ml-2 px-1.5 py-0 h-4 bg-primary text-black text-[9px] font-bold">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-80 p-5 bg-[#12161E] border-white/15 text-foreground rounded-2xl shadow-2xl space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <h4 className="text-xs font-headline font-bold uppercase tracking-wider text-white">
                      Filter Ledger Records
                    </h4>
                    {activeFiltersCount > 0 && (
                      <button 
                        onClick={resetFilters} 
                        className="text-[10px] uppercase font-mono text-primary hover:underline"
                      >
                        Reset All
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <Label className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground">Risk Level</Label>
                      <Select value={riskFilter} onValueChange={setRiskFilter}>
                        <SelectTrigger className="h-9 bg-black/40 border-white/10 text-xs rounded-lg">
                          <SelectValue placeholder="All Risk Levels" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-white/15">
                          <SelectItem value="all">All Risk Levels</SelectItem>
                          <SelectItem value="Critical">Critical</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Initial Intake">Initial Intake</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground">Scam Category</Label>
                      <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="h-9 bg-black/40 border-white/10 text-xs rounded-lg">
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-white/15">
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="crypto">Cryptocurrency / Blockchain</SelectItem>
                          <SelectItem value="invest">Investment / Fake Broker</SelectItem>
                          <SelectItem value="loan">Advance Fee / Loan</SelectItem>
                          <SelectItem value="romance">Romance / Imposter</SelectItem>
                          <SelectItem value="wallet">Wallet Compromise</SelectItem>
                          <SelectItem value="trading">Trading / Withdrawal Block</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground">Order by Date</Label>
                      <Select value={sortOrder} onValueChange={(val: any) => setSortOrder(val)}>
                        <SelectTrigger className="h-9 bg-black/40 border-white/10 text-xs rounded-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-white/15">
                          <SelectItem value="newest">Newest Intake First</SelectItem>
                          <SelectItem value="oldest">Oldest Intake First</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Refresh Button */}
              <Button 
                onClick={fetchCases} 
                variant="outline" 
                className="h-11 border-white/10 bg-black/40 hover:bg-white/10 text-xs font-semibold uppercase tracking-wider rounded-xl"
              >
                <RefreshCw className={cn("w-3.5 h-3.5 mr-2 text-primary", loading && "animate-spin")} />
                Refresh
              </Button>

            </div>

          </div>

          {/* Active Filter Indicators Bar */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2 pt-2 border-t border-white/5 flex-wrap">
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                Active Criteria:
              </span>
              {searchQuery && (
                <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary text-[10px] pl-2 pr-1 py-0.5 rounded-md">
                  Query: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="ml-1.5 hover:text-white"><X className="w-3 h-3" /></button>
                </Badge>
              )}
              {statusFilter !== 'all' && (
                <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary text-[10px] pl-2 pr-1 py-0.5 rounded-md">
                  Status: {statusFilter}
                  <button onClick={() => setStatusFilter('all')} className="ml-1.5 hover:text-white"><X className="w-3 h-3" /></button>
                </Badge>
              )}
              {riskFilter !== 'all' && (
                <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary text-[10px] pl-2 pr-1 py-0.5 rounded-md">
                  Risk: {riskFilter}
                  <button onClick={() => setRiskFilter('all')} className="ml-1.5 hover:text-white"><X className="w-3 h-3" /></button>
                </Badge>
              )}
              {categoryFilter !== 'all' && (
                <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary text-[10px] pl-2 pr-1 py-0.5 rounded-md">
                  Category: {categoryFilter}
                  <button onClick={() => setCategoryFilter('all')} className="ml-1.5 hover:text-white"><X className="w-3 h-3" /></button>
                </Badge>
              )}
              <button 
                onClick={resetFilters} 
                className="text-[10px] font-mono text-muted-foreground hover:text-destructive uppercase underline ml-auto"
              >
                Clear All
              </button>
            </div>
          )}

        </div>

        {/* CASES TABLE */}
        <Card className="glass-card border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-[#12161E] border-b border-white/10">
                <TableRow className="hover:bg-transparent border-white/10">
                  <TableHead className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground py-5 px-6">
                    Case Identity
                  </TableHead>
                  <TableHead className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground">
                    Participant Contact
                  </TableHead>
                  <TableHead className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground">
                    Fraud Category
                  </TableHead>
                  <TableHead className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground text-center">
                    Risk Factor
                  </TableHead>
                  <TableHead className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground text-center">
                    Current Status
                  </TableHead>
                  <TableHead className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground text-right px-6">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-white/5">
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-72 text-center">
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">
                          Querying Delaware Node Ledgers...
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredCases.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-80 text-center">
                      <div className="max-w-md mx-auto flex flex-col items-center justify-center py-10 space-y-4">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground">
                          <ShieldCheck className="w-8 h-8 text-primary/60" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-base font-headline font-bold uppercase tracking-tight text-white">
                            No Investigative Records Found
                          </h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {cases.length === 0 
                              ? "Your case database is currently awaiting inbound assessments from client intakes."
                              : "No records match your active search and filter criteria."}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 pt-2">
                          {cases.length === 0 ? (
                            <Button 
                              onClick={insertSampleCase} 
                              size="sm"
                              className="bg-primary text-black font-bold uppercase text-xs tracking-wider rounded-lg h-9 shadow-lg shadow-primary/20"
                            >
                              <Plus className="w-3.5 h-3.5 mr-1.5" /> Inject Sample Dossier
                            </Button>
                          ) : (
                            <Button 
                              onClick={resetFilters} 
                              variant="outline" 
                              size="sm"
                              className="border-white/10 text-xs uppercase rounded-lg"
                            >
                              Reset Filters
                            </Button>
                          )}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCases.map((c) => {
                    const categoryInfo = getCategoryBadge(c.case_type);
                    const CategoryIcon = categoryInfo.icon;

                    return (
                      <TableRow 
                        key={c.id} 
                        className="border-white/5 hover:bg-white/[0.02] group transition-colors"
                      >
                        {/* Case Identity */}
                        <TableCell className="py-4 px-6 whitespace-nowrap">
                          <div className="flex items-center gap-3.5">
                            <div className="p-2.5 rounded-xl bg-card border border-white/10 text-primary shrink-0 group-hover:border-primary/40 transition-colors">
                              <Fingerprint className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-sm text-white">
                                  #{c.case_id}
                                </span>
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(c.case_id);
                                    toast({ title: "Copied", description: `Case #${c.case_id} copied to clipboard.` });
                                  }}
                                  className="text-muted-foreground hover:text-primary transition-colors"
                                  title="Copy Case ID"
                                >
                                  <Copy className="w-3 h-3" />
                                </button>
                              </div>
                              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mt-0.5">
                                {new Date(c.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        {/* Participant Contact */}
                        <TableCell className="whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs text-primary shrink-0">
                              {c.user_name ? c.user_name.slice(0, 2).toUpperCase() : 'NA'}
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-white">
                                {c.user_name || 'Anonymous Intake'}
                              </p>
                              <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                                <span>{c.user_email || 'No email provided'}</span>
                                {c.user_country && (
                                  <>
                                    <span>•</span>
                                    <span className="font-mono uppercase text-[10px] text-white/70">{c.user_country}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </TableCell>

                        {/* Fraud Category */}
                        <TableCell className="whitespace-nowrap">
                          <div className={cn(
                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-medium",
                            categoryInfo.color
                          )}>
                            <CategoryIcon className="w-3.5 h-3.5" />
                            <span>{categoryInfo.label}</span>
                          </div>
                        </TableCell>

                        {/* Risk Factor */}
                        <TableCell className="text-center whitespace-nowrap">
                          <div className="inline-flex items-center gap-2">
                            <span className={cn(
                              "w-2 h-2 rounded-full",
                              (c.risk_level || '').toLowerCase() === 'critical' ? 'bg-destructive animate-ping' :
                              (c.risk_level || '').toLowerCase() === 'high' ? 'bg-amber-400' : 'bg-primary'
                            )} />
                            <span className={cn(
                              "text-xs font-mono font-bold uppercase tracking-wider",
                              (c.risk_level || '').toLowerCase() === 'critical' ? 'text-destructive font-black' :
                              (c.risk_level || '').toLowerCase() === 'high' ? 'text-amber-400' : 'text-foreground'
                            )}>
                              {c.risk_level || 'Initial'}
                            </span>
                          </div>
                        </TableCell>

                        {/* Status (Inline Quick Toggle) */}
                        <TableCell className="text-center whitespace-nowrap">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 px-3 rounded-full bg-card border border-white/10 hover:border-primary/40 text-[10px] font-mono uppercase tracking-wider text-white"
                              >
                                <span className={cn(
                                  "w-1.5 h-1.5 rounded-full mr-2",
                                  c.status === 'Resolved' ? 'bg-emerald-400' :
                                  c.status === 'Investigating' ? 'bg-amber-400' : 'bg-primary'
                                )} />
                                {c.status || 'Review Pending'}
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="center" className="bg-[#12161E] border-white/15 w-48 shadow-2xl">
                              <DropdownMenuLabel className="text-[9px] uppercase font-mono tracking-widest text-muted-foreground">
                                Update Status
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator className="bg-white/10" />
                              {STATUS_OPTIONS.map(status => (
                                <DropdownMenuItem 
                                  key={status}
                                  onClick={() => updateCaseStatus(c.id, status)}
                                  className={cn(
                                    "text-xs font-medium py-2 cursor-pointer flex items-center justify-between",
                                    c.status === status && "text-primary font-bold"
                                  )}
                                >
                                  {status}
                                  {c.status === status && <Check className="w-3.5 h-3.5 text-primary" />}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="text-right px-6 whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            
                            {/* View Full Dossier Dialog */}
                            <Dialog open={selectedCase?.id === c.id} onOpenChange={(open) => setSelectedCase(open ? c : null)}>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => setSelectedCase(c)}
                                  className="h-8 px-3 border-white/10 bg-white/5 hover:bg-primary hover:text-black font-bold uppercase text-[10px] tracking-wider rounded-lg transition-all"
                                >
                                  <Eye className="w-3.5 h-3.5 mr-1.5" />
                                  Review Brief
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[92vh] overflow-y-auto glass-card border-white/15 p-0 rounded-2xl shadow-2xl">
                                <DialogTitle className="sr-only">Forensic Dossier #{c.case_id}</DialogTitle>
                                <DialogDescription className="sr-only">Detailed case brief for participant {c.user_name}</DialogDescription>
                                
                                <InstitutionalDecryptor caseId={c.case_id} label="Delaware Certified Brief">
                                  
                                  {/* Dossier Header */}
                                  <div className="p-6 md:p-8 border-b border-white/10 bg-[#121720]/90 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div className="flex items-center gap-4">
                                      <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                                        <Fingerprint className="w-6 h-6" />
                                      </div>
                                      <div>
                                        <div className="flex items-center gap-2.5">
                                          <h2 className="text-xl md:text-2xl font-headline font-bold uppercase tracking-tight text-white">
                                            Investigation Brief
                                          </h2>
                                          <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px] font-mono uppercase">
                                            #{c.case_id}
                                          </Badge>
                                        </div>
                                        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mt-0.5">
                                          Intake Recorded: {new Date(c.created_at).toLocaleString()}
                                        </p>
                                      </div>
                                    </div>

                                    {/* Status dropdown inside modal */}
                                    <div className="flex items-center gap-3">
                                      <Select value={c.status} onValueChange={(val) => updateCaseStatus(c.id, val)}>
                                        <SelectTrigger className="h-9 w-44 bg-card border-white/15 text-xs font-mono uppercase rounded-lg">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-card border-white/15">
                                          {STATUS_OPTIONS.map(opt => (
                                            <SelectItem key={opt} value={opt} className="text-xs font-mono uppercase">
                                              {opt}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>

                                  {/* Dossier Body */}
                                  <div className="p-6 md:p-8 space-y-8">
                                    
                                    {/* 3 Overview Cards */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                      
                                      {/* Participant Profile */}
                                      <div className="p-5 rounded-xl bg-card/60 border border-white/10 space-y-3">
                                        <h4 className="text-[10px] font-mono uppercase tracking-widest text-primary flex items-center gap-1.5 font-bold">
                                          <User className="w-3.5 h-3.5" /> Participant Profile
                                        </h4>
                                        <div className="space-y-2 text-xs">
                                          <div>
                                            <span className="text-[10px] text-muted-foreground uppercase font-mono">Full Name</span>
                                            <p className="font-bold text-white text-sm">{c.user_name || 'N/A'}</p>
                                          </div>
                                          <div>
                                            <span className="text-[10px] text-muted-foreground uppercase font-mono">Email Contact</span>
                                            <p className="font-medium text-white/90">
                                              <a href={`mailto:${c.user_email}`} className="hover:text-primary transition-colors">
                                                {c.user_email || 'N/A'}
                                              </a>
                                            </p>
                                          </div>
                                          <div>
                                            <span className="text-[10px] text-muted-foreground uppercase font-mono">Phone</span>
                                            <p className="font-medium text-white/90">
                                              <a href={`tel:${c.user_phone}`} className="hover:text-primary transition-colors">
                                                {c.user_phone || 'N/A'}
                                              </a>
                                            </p>
                                          </div>
                                          <div>
                                            <span className="text-[10px] text-muted-foreground uppercase font-mono">Jurisdiction / Country</span>
                                            <p className="font-bold text-white">{c.user_country || 'Undisclosed'}</p>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Intake Triage Metrics */}
                                      <div className="p-5 rounded-xl bg-card/60 border border-white/10 space-y-3">
                                        <h4 className="text-[10px] font-mono uppercase tracking-widest text-primary flex items-center gap-1.5 font-bold">
                                          <Activity className="w-3.5 h-3.5" /> Triage Metrics
                                        </h4>
                                        <div className="space-y-2 text-xs">
                                          <div>
                                            <span className="text-[10px] text-muted-foreground uppercase font-mono">Assigned Risk Level</span>
                                            <p className={cn(
                                              "font-bold uppercase font-mono text-sm",
                                              c.risk_level === 'Critical' ? 'text-destructive' : 'text-primary'
                                            )}>{c.risk_level || 'Initial'}</p>
                                          </div>
                                          <div>
                                            <span className="text-[10px] text-muted-foreground uppercase font-mono">Evidence Integrity</span>
                                            <p className="font-bold text-white uppercase">{c.evidence_integrity || 'Pending Review'}</p>
                                          </div>
                                          <div>
                                            <span className="text-[10px] text-muted-foreground uppercase font-mono">Preferred Comms</span>
                                            <p className="font-medium text-white/90">
                                              {c.preferred_method || 'Email'} {c.best_contact_time ? `(${c.best_contact_time})` : ''}
                                            </p>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Platform & Incident Details */}
                                      <div className="p-5 rounded-xl bg-card/60 border border-white/10 space-y-3">
                                        <h4 className="text-[10px] font-mono uppercase tracking-widest text-primary flex items-center gap-1.5 font-bold">
                                          <Target className="w-3.5 h-3.5" /> Incident Details
                                        </h4>
                                        <div className="space-y-2 text-xs">
                                          <div>
                                            <span className="text-[10px] text-muted-foreground uppercase font-mono">Scam Classification</span>
                                            <p className="font-bold text-white">{c.case_type || 'Unspecified'}</p>
                                          </div>
                                          {c.form_values && Object.entries(c.form_values).map(([k, v]: any) => (
                                            <div key={k}>
                                              <span className="text-[10px] text-muted-foreground uppercase font-mono">
                                                {k.replace(/([A-Z])/g, ' $1')}
                                              </span>
                                              <p className="font-mono text-white/90 truncate">{String(v)}</p>
                                            </div>
                                          ))}
                                        </div>
                                      </div>

                                    </div>

                                    {/* Narrative & Evidence Files */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      
                                      {/* Victim Narrative */}
                                      <div className="space-y-2.5">
                                        <h4 className="text-xs font-mono uppercase font-bold text-muted-foreground flex items-center gap-2">
                                          <Search className="w-3.5 h-3.5 text-primary" /> Case Narrative & Statement
                                        </h4>
                                        <div className="p-5 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-white/90 leading-relaxed italic border-l-4 border-l-primary relative">
                                          "{c.description || 'No detailed statement submitted during intake.'}"
                                        </div>
                                      </div>

                                      {/* Attached Evidence Files */}
                                      <div className="space-y-2.5">
                                        <h4 className="text-xs font-mono uppercase font-bold text-muted-foreground flex items-center gap-2">
                                          <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Attached Evidence Documents
                                        </h4>
                                        <div className="space-y-2">
                                          {c.evidence_files && c.evidence_files.length > 0 ? (
                                            c.evidence_files.map((file, idx) => (
                                              <a
                                                key={idx}
                                                href={file.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-between p-3.5 rounded-xl bg-card border border-white/10 hover:border-primary/50 transition-colors group"
                                              >
                                                <div className="flex items-center gap-3 truncate">
                                                  <FileText className="w-4 h-4 text-primary shrink-0" />
                                                  <span className="text-xs font-mono font-medium text-white truncate">
                                                    {file.name}
                                                  </span>
                                                </div>
                                                <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 ml-2" />
                                              </a>
                                            ))
                                          ) : (
                                            <div className="p-6 rounded-xl border border-dashed border-white/10 text-center">
                                              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                                                No direct files uploaded by client
                                              </p>
                                            </div>
                                          )}
                                        </div>
                                      </div>

                                    </div>

                                    {/* AI Forensic Insights if Present */}
                                    {c.result_data?.preliminaryCaseFindings && (
                                      <div className="space-y-3 pt-4 border-t border-white/10">
                                        <h4 className="text-xs font-mono uppercase font-bold text-primary flex items-center gap-2">
                                          <Sparkles className="w-4 h-4" /> Automated Case Diagnostic Findings
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                          {Object.entries(c.result_data.preliminaryCaseFindings).map(([key, val]: any) => (
                                            <div key={key} className="p-3.5 rounded-xl bg-card border border-white/10">
                                              <p className="text-[10px] text-muted-foreground uppercase font-mono mb-1">{key.replace(/([A-Z])/g, ' $1')}</p>
                                              <p className="text-xs font-bold uppercase text-white">{String(val)}</p>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                  </div>
                                </InstitutionalDecryptor>
                              </DialogContent>
                            </Dialog>

                            {/* Row Action Dropdown */}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-white/5 rounded-lg">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-[#12161E] border-white/15 w-48 shadow-2xl">
                                <DropdownMenuItem 
                                  onClick={() => updateCaseStatus(c.id, 'Investigating')}
                                  className="text-xs font-medium py-2 cursor-pointer hover:bg-primary/10 hover:text-primary"
                                >
                                  <Activity className="w-3.5 h-3.5 mr-2 text-primary" /> Mark Investigating
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => updateCaseStatus(c.id, 'Resolved')}
                                  className="text-xs font-medium py-2 cursor-pointer hover:bg-emerald-500/10 hover:text-emerald-400"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-emerald-400" /> Mark Resolved
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-white/10" />
                                <DropdownMenuItem 
                                  onClick={() => deleteCase(c.id)}
                                  className="text-xs font-medium py-2 cursor-pointer text-destructive hover:bg-destructive/10"
                                >
                                  <Trash2 className="w-3.5 h-3.5 mr-2" /> Delete Record
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>

                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* Table Footer Stats Bar */}
          <div className="p-4 bg-[#12161E] border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground font-mono">
            <div>
              Showing <span className="font-bold text-white">{filteredCases.length}</span> of <span className="font-bold text-white">{cases.length}</span> forensic files
            </div>
            <div className="flex items-center gap-4">
              <span>Delaware Division of Corporations Node</span>
              <span>•</span>
              <span>Encrypted Session</span>
            </div>
          </div>
        </Card>

      </div>
    </main>
  );
}
