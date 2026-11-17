import { useState, useMemo } from "react";
import {
  Scale,
  Globe,
  Umbrella,
  Vault,
  Lock,
  CreditCard,
  ArrowRightLeft,
  Banknote,
  Receipt,
  Activity,
  Brain,
  Network,
  Briefcase,
  Landmark,
  BookOpen,
  PieChart,
  Zap,
  TrendingUp,
  RefreshCw,
  GraduationCap,
  Building,
  HeartHandshake,
  ReceiptText,
  Gift,
  Coins,
  DollarSign,
  ShoppingCart,
  Wallet,
  Home,
  ScrollText,
  Binary,
  Lightbulb,
  HeartPulse,
  LineChart,
  Package,
  Calculator,
  Key,
  Users,
  Layers,
  ShieldCheck,
  Heart,
  Shield,
  Sprout,
  FileText,
  CalendarDays,
  Settings,
  CheckSquare,
  type LucideIcon,
} from "lucide-react";
import { type NavItem } from "@/config/nav";
import { HeaderNavPills, ShellHeader } from "@/app/shell-header";
import {
  MBACard,
  buildModuleCategoryGroups,
  type ModuleComponentCategory,
} from "@/components/common/MBACard";
import { MovedCardsSection } from "@/components/common/MovedCardsGridItems";
import {
  LauncherPageProvider,
  adjustCategoryTabsCount,
  syncLauncherPageBadge,
  useCardPageMover,
  useCurrentLauncherPage,
} from "@/hooks/useCardPageMover";
import { usePinnedCards, sortCardsWithPinned } from "@/hooks/usePinnedCards";
import { useLanguage, type Language } from "@/features/finance/hooks/useLanguage";


export interface FinancialStandaloneFeature {
  title: string;
  to: string;
  icon: LucideIcon;
  desc?: string;
  componentCategory: ModuleComponentCategory;
}

export interface StandaloneFinancialAppDef {
  id: string;
  to: string;
  title: string;
  subtitle: string;
  category: "surety" | "flow" | "build" | "grow" | "legacy" | "sharia";
  categoryLabel: string;
  icon: LucideIcon;
  badge?: string;
  isEmpty?: boolean;
  features?: FinancialStandaloneFeature[];
}

export const STANDALONE_FINANCIAL_APPS: StandaloneFinancialAppDef[] = [
  // ==========================================
  // PILAR 1: SURETY (KEPASTIAN & PROTEKSI) - 5 MODUL
  // ==========================================
  {
    id: "kepatuhan-hukum",
    to: "/surety?tab=cat_kepatuhan",
    title: "Legal Compliance",
    subtitle: "Kepatuhan finansial pribadi dan keluarga, regulasi perbankan, audit kepatuhan, serta arsip catatan kepatuhan.",
    category: "surety",
    categoryLabel: "Surety",
    icon: Scale,
    badge: "Standalone",
    features: [
      { title: "Compliance Audit", to: "/surety?tab=cat_kepatuhan&sub=audit", icon: Scale, componentCategory: "Analytics" },
      { title: "Regulatory Guide", to: "/surety?tab=cat_kepatuhan&sub=regulasi", icon: ShieldCheck, componentCategory: "Guides" },
      { title: "Compliance Records", to: "", icon: FileText, componentCategory: "Records" },
    ],
  },
  {
    id: "perlindungan-publik",
    to: "/surety?tab=cat_publik",
    title: "Public Protection",
    subtitle: "Perlindungan sosial pribadi dan keluarga melalui program jaminan sosial nasional, evaluasi cakupan proteksi, dan catatan klaim.",
    category: "surety",
    categoryLabel: "Surety",
    icon: Globe,
    badge: "Standalone",
    features: [
      { title: "Social Security", to: "/surety?tab=cat_publik&sub=bpjs", icon: Globe, componentCategory: "Features" },
      { title: "Coverage Assessment", to: "", icon: Shield, componentCategory: "Analytics" },
      { title: "Claims Records", to: "", icon: ReceiptText, componentCategory: "Records" },
    ],
  },
  {
    id: "asuransi-pribadi",
    to: "/surety?tab=cat_asuransi",
    title: "Private Insurance",
    subtitle: "Proteksi risiko kesehatan personal, penyakit kritis, asuransi jiwa, catatan polis, evaluasi cakupan, serta manajemen klaim.",
    category: "surety",
    categoryLabel: "Surety",
    icon: Umbrella,
    badge: "Standalone",
    features: [
      { title: "Health Coverage", to: "/surety?tab=cat_asuransi&sub=kesehatan", icon: HeartPulse, componentCategory: "Features" },
      { title: "Life Coverage", to: "/surety?tab=cat_asuransi&sub=jiwa", icon: Umbrella, componentCategory: "Features" },
      { title: "Policy Records", to: "", icon: FileText, componentCategory: "Records" },
      { title: "Coverage Assessment", to: "", icon: Shield, componentCategory: "Analytics" },
      { title: "Claims Management", to: "", icon: Activity, componentCategory: "Workflows" },
    ],
  },
  {
    id: "kecukupan-dana",
    to: "/surety?tab=cat_dana",
    title: "Fund Sufficiency",
    subtitle: "Pemantauan cadangan likuid yang tersedia, perencanaan target dana darurat, dan analisis kecukupan cadangan dana.",
    category: "surety",
    categoryLabel: "Surety",
    icon: Vault,
    badge: "Standalone",
    features: [
      { title: "Reserve Dashboard", to: "/liquid-reserves", icon: Coins, componentCategory: "Dashboards", desc: "Dashboard posisi cadangan likuid yang tersedia." },
      { title: "Emergency Planner", to: "/surety?tab=cat_dana&sub=darurat", icon: Vault, componentCategory: "Tools", desc: "Perencanaan target dan progres dana darurat." },
      { title: "Reserve Analysis", to: "", icon: LineChart, componentCategory: "Analytics", desc: "Analisis ketahanan, rasio kecukupan, dan proyeksi cadangan dana." },
    ],
  },
  {
    id: "proteksi-aset",
    to: "/surety?tab=cat_proteksi",
    title: "Asset Protection",
    subtitle: "Pengamanan dokumen kepemilikan aset dan bukti pembelian serta arsip garansi aset.",
    category: "surety",
    categoryLabel: "Surety",
    icon: Lock,
    badge: "Standalone",
    features: [
      { title: "Asset Documents", to: "/surety?tab=cat_proteksi&sub=vault", icon: ShieldCheck, componentCategory: "Records", desc: "Arsip dokumen kepemilikan aset dan catatan bukti pembelian (purchase records)." },
      { title: "Warranty Records", to: "/surety?tab=cat_proteksi", icon: ShieldCheck, componentCategory: "Records", desc: "Arsip dan pelacakan garansi aset." },
    ],
  },

  // ==========================================
  // PILAR 2: FLOW (ARUS KAS & LIABILITAS) - 5 MODUL
  // ==========================================
  {
    id: "beban-liabilitas",
    to: "/flow?tab=cat_liabilitas",
    title: "Burden Liability",
    subtitle: "Pengelolaan kewajiban finansial jangka pendek dan panjang, kredit, rasio utang, cicilan, serta arsip liabilitas.",
    category: "flow",
    categoryLabel: "Flow",
    icon: CreditCard,
    badge: "Standalone",
    features: [
      { title: "Liability Dashboard", to: "/liability", icon: CreditCard, componentCategory: "Dashboards" },
      { title: "Debt Ratio Calculator", to: "/flow?tab=cat_liabilitas", icon: Calculator, componentCategory: "Tools" },
      { title: "Debt Management", to: "/kredit", icon: CreditCard, componentCategory: "Features" },
      { title: "Liability Records", to: "", icon: FileText, componentCategory: "Records" },
    ],
  },
  {
    id: "pemasukan-pengeluaran",
    to: "/flow?tab=cat_pengeluaran",
    title: "Income-Expense",
    subtitle: "Pemantauan pendapatan, pengeluaran, penyusunan anggaran, dan analisis realisasi anggaran personal maupun keluarga.",
    category: "flow",
    categoryLabel: "Flow",
    icon: ArrowRightLeft,
    badge: "Standalone",
    features: [
      { title: "Income Dashboard", to: "/earning", icon: DollarSign, componentCategory: "Dashboards" },
      { title: "Expense Dashboard", to: "/expense", icon: ShoppingCart, componentCategory: "Dashboards" },
      { title: "Budget Planner", to: "/budget", icon: Wallet, componentCategory: "Templates" },
      { title: "Budget Analysis", to: "", icon: LineChart, componentCategory: "Analytics" },
      { title: "Income Forecast", to: "", icon: TrendingUp, componentCategory: "Analytics" },
    ],
  },
  {
    id: "kas-kredit",
    to: "/flow?tab=cat_kredit",
    title: "Cash-Credit",
    subtitle: "Pemantauan saldo likuiditas, mutasi rekening, buku kas transaksi harian, serta analisis arus kas dan likuiditas.",
    category: "flow",
    categoryLabel: "Flow",
    icon: Banknote,
    badge: "Standalone",
    features: [
      { title: "Cash Ledger", to: "/flow?tab=transactions", icon: Banknote, componentCategory: "Records", desc: "Buku kas dan ledger mutasi transaksi pemasukan serta pengeluaran rinci." },
      { title: "Account Records", to: "", icon: FileText, componentCategory: "Records" },
      { title: "Cashflow Dashboard", to: "", icon: LineChart, componentCategory: "Dashboards" },
      { title: "Liquidity Analysis", to: "", icon: TrendingUp, componentCategory: "Analytics" },
      { title: "Liquidity Forecast", to: "", icon: LineChart, componentCategory: "Analytics" },
    ],
  },
  {
    id: "retribusi-kontribusi",
    to: "/flow?tab=cat_pajak",
    title: "Retribution-Contribution",
    subtitle: "Perhitungan estimasi pajak penghasilan pribadi (PPh 21 progresif), arsip pajak, analisis beban pajak, dan panduan kepatuhan.",
    category: "flow",
    categoryLabel: "Flow",
    icon: Receipt,
    badge: "Standalone",
    features: [
      { title: "Tax Calculator", to: "/pajak?app=pph21", icon: Calculator, componentCategory: "Tools" },
      { title: "Tax Records", to: "", icon: FileText, componentCategory: "Records" },
      { title: "Tax Analysis", to: "", icon: LineChart, componentCategory: "Analytics" },
      { title: "Tax Guide", to: "", icon: BookOpen, componentCategory: "Guides" },
    ],
  },
  {
    id: "sistem-otomatisasi",
    to: "/flow?tab=cat_otomatisasi",
    title: "Automation System",
    subtitle: "Otomatisasi pembayaran, jadwal tagihan rutin, dan alokasi tabungan otomatis sesuai jadwal yang ditetapkan.",
    category: "flow",
    categoryLabel: "Flow",
    icon: Activity,
    badge: "Standalone",
    features: [
      { title: "Payment Automation", to: "/flow?tab=cat_otomatisasi&sub=autodebet", icon: Activity, componentCategory: "Automations" },
      { title: "Payment Schedule", to: "", icon: CalendarDays, componentCategory: "Workflows" },
      { title: "Savings Automation", to: "", icon: RefreshCw, componentCategory: "Automations" },
    ],
  },

  // ==========================================
  // PILAR 3: BUILD (AKUMULASI & PORTOFOLIO) - 5 MODUL
  // ==========================================
  {
    id: "modal-manusia",
    to: "/build?tab=cat_modal",
    title: "Human Capital",
    subtitle: "Valuasi kapasitas nilai keahlian diri, analisis daya ungkit karier profesional, dan asesmen kapital manusia.",
    category: "build",
    categoryLabel: "Build",
    icon: Brain,
    badge: "Standalone",
    features: [
      { title: "Skills Assessment", to: "/build?tab=cat_modal&sub=skill", icon: Brain, componentCategory: "Tools" },
      { title: "Career Analysis", to: "/build?tab=cat_modal&sub=karier", icon: TrendingUp, componentCategory: "Analytics" },
      { title: "Capital Assessment", to: "", icon: Activity, componentCategory: "Analytics" },
    ],
  },
  {
    id: "jaringan",
    to: "/build?tab=cat_jaringan",
    title: "Net-Work",
    subtitle: "Jaringan profesional finansial personal dan keluarga, arsip penasihat, serta evaluasi kinerja penasihat.",
    category: "build",
    categoryLabel: "Build",
    icon: Network,
    badge: "Standalone",
    features: [
      { title: "Professional Directory", to: "/people-manager", icon: Users, desc: "Direktori profesional finansial personal dan keluarga, termasuk banker, akuntan, konsultan pajak, dan penasihat.", componentCategory: "Features" },
      { title: "Advisor Records", to: "", icon: FileText, componentCategory: "Records" },
      { title: "Advisor Assessment", to: "", icon: ShieldCheck, componentCategory: "Analytics" },
    ],
  },
  {
    id: "portofolio",
    to: "/build?tab=cat_portofolio",
    title: "Portfolio",
    subtitle: "Manajemen kepemilikan multi-aset: properti real estate, surat berharga, aset digital, HKI, pemantauan harga pasar, serta analitik portofolio.",
    category: "build",
    categoryLabel: "Build",
    icon: Briefcase,
    badge: "Standalone",
    features: [
      { title: "Real Estate", to: "/real-estate", icon: Home, componentCategory: "Features" },
      { title: "Securities", to: "/paper-securities", icon: ScrollText, componentCategory: "Features" },
      { title: "Digital Assets", to: "/digital-assets", icon: Binary, componentCategory: "Features" },
      { title: "Intellectual Property", to: "/intellectual-property", icon: Lightbulb, componentCategory: "Records" },
      { title: "Market Monitor", to: "/100-komoditas", icon: Package, componentCategory: "Dashboards", desc: "Pemantauan harga pasar dan nilai terkini instrumen atau aset yang dimiliki." },
      { title: "Portfolio Dashboard", to: "", icon: PieChart, componentCategory: "Dashboards" },
      { title: "Portfolio Analysis", to: "", icon: LineChart, componentCategory: "Analytics" },
      { title: "Asset Valuation", to: "", icon: Calculator, componentCategory: "Tools" },
    ],
  },
  {
    id: "kekayaan-bersih",
    to: "/build?tab=cat_kekayaan",
    title: "Net-Worth",
    subtitle: "Perhitungan kalkulasi total net worth bersih dari seluruh kelas aset, asesmen kesehatan finansial, dan arsip kekayaan bersih.",
    category: "build",
    categoryLabel: "Build",
    icon: Landmark,
    badge: "Standalone",
    features: [
      { title: "Asset Dashboard", to: "/asset", icon: Briefcase, componentCategory: "Dashboards" },
      { title: "Financial Assessment", to: "/financial-health", icon: HeartPulse, componentCategory: "Analytics" },
      { title: "Net Worth Calculator", to: "", icon: Calculator, componentCategory: "Tools" },
      { title: "Net Worth Records", to: "", icon: FileText, componentCategory: "Records" },
    ],
  },
  {
    id: "pembukuan",
    to: "/build?tab=cat_pembukuan",
    title: "Book Entry",
    subtitle: "Sistem pembukuan neraca saldo aset personal, jurnal transaksi, buku besar, dan alat rekonsiliasi.",
    category: "build",
    categoryLabel: "Build",
    icon: BookOpen,
    badge: "Standalone",
    features: [
      { title: "Asset Balance", to: "/build?tab=cat_pembukuan&sub=neraca", icon: BookOpen, componentCategory: "Analytics" },
      { title: "Journal Entries", to: "/build?tab=cat_pembukuan&sub=jurnal", icon: ReceiptText, componentCategory: "Records" },
      { title: "Ledger Records", to: "", icon: FileText, componentCategory: "Records" },
      { title: "Reconciliation Tools", to: "", icon: RefreshCw, componentCategory: "Tools" },
    ],
  },

  // ==========================================
  // PILAR 4: GROW (PERTUMBUHAN & INVESTASI) - 5 MODUL
  // ==========================================
  {
    id: "profil-risiko",
    to: "/grow?tab=cat_profil",
    title: "Risk Profiling",
    subtitle: "Asesmen toleransi dan kapasitas risiko, horizon waktu investasi, profil investor, serta laporan kesesuaian.",
    category: "grow",
    categoryLabel: "Grow",
    icon: Activity,
    badge: "Standalone",
    features: [
      { title: "Risk Assessment", to: "/grow?tab=cat_profil&sub=toleransi", icon: Activity, componentCategory: "Tools" },
      { title: "Investment Horizon", to: "/grow?tab=cat_profil", icon: LineChart, componentCategory: "Settings" },
      { title: "Risk Capacity", to: "", icon: Shield, componentCategory: "Tools" },
      { title: "Investor Profile", to: "", icon: Users, componentCategory: "Records" },
      { title: "Suitability Report", to: "", icon: FileText, componentCategory: "Templates" },
    ],
  },
  {
    id: "alokasi",
    to: "/grow?tab=cat_alokasi",
    title: "Allocation",
    subtitle: "Penyusunan alokasi aset dan instrumen investasi, perencanaan, analisis, serta pengaturan batas alokasi.",
    category: "grow",
    categoryLabel: "Grow",
    icon: PieChart,
    badge: "Standalone",
    features: [
      { title: "Asset Allocation", to: "/grow?tab=cat_alokasi", icon: Coins, componentCategory: "Features", desc: "Penyusunan bobot modal untuk kelas aset dan instrumen investasi; terpisah dari pemantauan harga pasar." },
      { title: "Allocation Planner", to: "", icon: Layers, componentCategory: "Tools" },
      { title: "Allocation Analysis", to: "", icon: LineChart, componentCategory: "Analytics" },
      { title: "Allocation Settings", to: "", icon: Settings, componentCategory: "Settings" },
    ],
  },
  {
    id: "efektif-efisien",
    to: "/grow?tab=cat_efektif",
    title: "Effective-Efficient",
    subtitle: "Analisis biaya transaksi, optimalisasi imbal hasil bersih, kalkulator biaya, dan perbandingan produk investasi.",
    category: "grow",
    categoryLabel: "Grow",
    icon: Zap,
    badge: "Standalone",
    features: [
      { title: "Cost Analysis", to: "/grow?tab=cat_efektif", icon: Zap, componentCategory: "Analytics" },
      { title: "Net Return Analysis", to: "/grow?tab=cat_efektif", icon: TrendingUp, componentCategory: "Analytics" },
      { title: "Fee Calculator", to: "", icon: Calculator, componentCategory: "Tools" },
      { title: "Product Comparison", to: "", icon: Scale, componentCategory: "Analytics" },
    ],
  },
  {
    id: "bunga-berbunga",
    to: "/grow?tab=cat_bunga",
    title: "Compounding",
    subtitle: "Kalkulator kekuatan bunga majemuk (compounding interest) dan simulator imbal hasil investasi berkala.",
    category: "grow",
    categoryLabel: "Grow",
    icon: TrendingUp,
    badge: "Standalone",
    features: [
      { title: "Compound Calculator", to: "/investasi?app=bunga-majemuk", icon: Calculator, componentCategory: "Tools" },
      { title: "Return Simulator", to: "/investasi?app=roi", icon: TrendingUp, componentCategory: "Tools" },
    ],
  },
  {
    id: "rebalancing-periodik",
    to: "/grow?tab=cat_rebalance",
    title: "Periodic Rebalancing",
    subtitle: "Pemantauan deviasi alokasi aset, jadwal rebalancing, kalkulator penyesuaian, dan alur kerja rebalancing.",
    category: "grow",
    categoryLabel: "Grow",
    icon: RefreshCw,
    badge: "Standalone",
    features: [
      { title: "Allocation Drift", to: "/grow?tab=cat_rebalance&sub=deviasi", icon: RefreshCw, componentCategory: "Analytics" },
      { title: "Rebalancing Schedule", to: "/grow?tab=cat_rebalance&sub=jadwal", icon: Layers, componentCategory: "Workflows" },
      { title: "Rebalancing Calculator", to: "", icon: Calculator, componentCategory: "Tools" },
      { title: "Rebalancing Workflow", to: "", icon: Activity, componentCategory: "Workflows" },
    ],
  },

  // ==========================================
  // PILAR 5: LEGACY (WARISAN & FILANTROPI) - 5 MODUL
  // ==========================================
  {
    id: "pembelajaran-seumur-hidup",
    to: "/legacy?tab=cat_pembelajaran",
    title: "Lifelong Learning",
    subtitle: "Literasi finansial antargenerasi, filosofi nilai keluarga, rencana pembelajaran, dan catatan pembelajaran.",
    category: "legacy",
    categoryLabel: "Legacy",
    icon: GraduationCap,
    badge: "Standalone",
    features: [
      { title: "Financial Literacy", to: "/legacy?tab=cat_pembelajaran&sub=literasi", icon: GraduationCap, componentCategory: "Guides" },
      { title: "Family Values", to: "/legacy?tab=cat_pembelajaran", icon: BookOpen, componentCategory: "Guides" },
      { title: "Learning Plan", to: "", icon: CalendarDays, componentCategory: "Workflows" },
      { title: "Learning Records", to: "", icon: FileText, componentCategory: "Records" },
    ],
  },
  {
    id: "tata-kelola",
    to: "/legacy?tab=cat_tatakelola",
    title: "Good Governance",
    subtitle: "Tinjauan tata kelola aset keluarga, struktur kepemilikan, registri aset keluarga, kerangka kerja, dan alur tata kelola.",
    category: "legacy",
    categoryLabel: "Legacy",
    icon: Building,
    badge: "Standalone",
    features: [
      { title: "Governance Review", to: "/legacy?tab=cat_tatakelola", icon: Scale, componentCategory: "Analytics", desc: "Pengawasan tata kelola, dokumentasi, dan audit aset keluarga." },
      { title: "Ownership Structure", to: "/legacy?tab=cat_tatakelola&sub=struktur", icon: Building, componentCategory: "Settings" },
      { title: "Family Asset Registry", to: "", icon: FileText, componentCategory: "Records" },
      { title: "Governance Framework", to: "", icon: BookOpen, componentCategory: "Guides" },
      { title: "Governance Workflow", to: "", icon: Activity, componentCategory: "Workflows" },
    ],
  },
  {
    id: "kontribusi-amal",
    to: "/legacy?tab=cat_amal",
    title: "Charitable Concern",
    subtitle: "Catatan donasi dan infaq, log relawan sosial, perencanaan filantropi, serta analisis kontribusi amal.",
    category: "legacy",
    categoryLabel: "Legacy",
    icon: HeartHandshake,
    badge: "Standalone",
    features: [
      { title: "Donation Records", to: "/lainnya?app=donation-tracker", icon: Coins, componentCategory: "Records" },
      { title: "Volunteer Records", to: "/lainnya?app=volunteer-log", icon: Heart, componentCategory: "Records" },
      { title: "Giving Analysis", to: "", icon: LineChart, componentCategory: "Analytics" },
      { title: "Giving Planner", to: "", icon: CalendarDays, componentCategory: "Tools" },
    ],
  },
  {
    id: "likuidasi-kewajiban",
    to: "/legacy?tab=cat_likuidasi",
    title: "Liability Liquidation",
    subtitle: "Alur penyelesaian pelunasan kewajiban, catatan pelunasan, dan daftar periksa likuidasi sebelum suksesi.",
    category: "legacy",
    categoryLabel: "Legacy",
    icon: ReceiptText,
    badge: "Standalone",
    features: [
      { title: "Settlement Workflow", to: "/legacy?tab=cat_likuidasi&sub=pelunasan", icon: ReceiptText, componentCategory: "Workflows" },
      { title: "Settlement Records", to: "", icon: FileText, componentCategory: "Records" },
      { title: "Settlement Checklist", to: "", icon: CheckSquare, componentCategory: "Templates" },
    ],
  },
  {
    id: "transfer-kekayaan",
    to: "/legacy?tab=cat_transfer",
    title: "Wealth Transfer",
    subtitle: "Alur suksesi peralihan kekayaan (referensi silang ke modul Portfolio), registri ahli waris, kalkulator waris, panduan, dan catatan transfer.",
    category: "legacy",
    categoryLabel: "Legacy",
    icon: Gift,
    badge: "Standalone",
    features: [
      { title: "Succession Workflow", to: "/legacy?tab=cat_transfer&sub=suksesi", icon: Gift, componentCategory: "Workflows" },
      { title: "Beneficiary Registry", to: "", icon: Users, componentCategory: "Records" },
      { title: "Estate Calculator", to: "", icon: Calculator, componentCategory: "Tools" },
      { title: "Estate Guide", to: "", icon: BookOpen, componentCategory: "Guides" },
      { title: "Transfer Records", to: "", icon: FileText, componentCategory: "Records" },
      { title: "Distribution Planner", to: "", icon: Layers, componentCategory: "Tools" },
    ],
  },
];

interface FinancialWealthSectionProps {
  isActive?: boolean;
  page?: {
    title: string;
    subCategories: { title: string; rawItems: NavItem[] }[];
  };
  favorites: string[];
  toggleFavorite: (to: string) => void;
  setActiveFolder?: (folder: any) => void;
  getGradient: (name: string) => string;
  FolderTile?: any;
}


export type FinancialCategoryTab = "all" | "spectrum" | "surety" | "flow" | "build" | "grow" | "legacy";

export interface StageFeatureItem {
  id: string;
  title: string;
  subtitle: string;
  to: string;
  icon: LucideIcon;
  badge?: string;
  subFeatures?: { title: string; to: string; icon: LucideIcon }[];
}

export interface WealthStageMainBoxDef {
  step: number;
  id: "surety" | "flow" | "build" | "grow" | "legacy";
  name: string;
  subtitle: string;
  to: string;
  icon: LucideIcon;
  themeColor: string;
  accentClass: string;
  borderClass: string;
  badgeBg: string;
  gradientBg: string;
  description: string;
  principles: { num: number; text: string }[];
  features: StageFeatureItem[];
}

export const WEALTH_STAGE_MAIN_BOXES: WealthStageMainBoxDef[] = [
  {
    step: 1,
    id: "surety",
    name: "Surety",
    subtitle: "Mitigasi dan Kepastian Risiko",
    to: "/surety",
    icon: ShieldCheck,
    themeColor: "blue",
    accentClass: "text-blue-600 dark:text-blue-400",
    borderClass: "border-blue-500/30 hover:border-blue-500/50",
    badgeBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/25",
    gradientBg: "from-blue-500/15 via-blue-500/5 to-transparent",
    description:
      "Fondasi keamanan ekonomi dan instrumen penjamin terhadap risiko kegagalan, melindungi aset dan aliran nilai dari peristiwa tak terduga serta memastikan stabilitas finansial berkelanjutan sebelum proses ekspansi nilai dimulai.",
    principles: [
      { num: 1, text: "Instrumen hukum dan institusional yang berfungsi sebagai penjamin terhadap risiko kegagalan atau kelalaian finansial." },
      { num: 2, text: "Lapisan ketahanan sistemik yang melindungi aset dan aliran nilai dari peristiwa tak terduga serta gangguan struktural." },
      { num: 3, text: "Syarat minimum stabilitas finansial yang harus terpenuhi sebelum proses pertumbuhan dan ekspansi nilai dimulai." },
      { num: 4, text: "Prinsip dasar perlindungan dalam sistem keuangan yang memastikan terpenuhinya kewajiban dan terjaganya stabilitas nilai ekonomi." },
      { num: 5, text: "Fondasi keamanan ekonomi yang memungkinkan perencanaan, akumulasi, dan pengembangan kekayaan secara berkelanjutan." },
    ],
    features: [
      {
        id: "kepatuhan-hukum",
        title: "Legal Compliance",
        subtitle: "Kepatuhan legalitas keuangan perbankan, regulasi otoritas jasa keuangan, audit kepatuhan, serta catatan kepatuhan.",
        to: "/surety?tab=cat_kepatuhan",
        icon: Scale,
        subFeatures: [
          { title: "Compliance Audit", to: "/surety?tab=cat_kepatuhan&sub=audit", icon: Scale },
          { title: "Regulatory Guide", to: "/surety?tab=cat_kepatuhan&sub=regulasi", icon: ShieldCheck },
          { title: "Compliance Records", to: "", icon: FileText },
        ],
      },
      {
        id: "perlindungan-publik",
        title: "Public Protection",
        subtitle: "Perlindungan sosial pribadi dan keluarga melalui program jaminan sosial nasional, evaluasi cakupan, dan catatan klaim.",
        to: "/surety?tab=cat_publik",
        icon: Globe,
        subFeatures: [
          { title: "Social Security", to: "/surety?tab=cat_publik&sub=bpjs", icon: Globe },
          { title: "Coverage Assessment", to: "", icon: Shield },
          { title: "Claims Records", to: "", icon: ReceiptText },
        ],
      },
      {
        id: "asuransi-pribadi",
        title: "Private Insurance",
        subtitle: "Proteksi risiko kesehatan personal, proteksi jiwa, catatan polis, evaluasi cakupan, dan manajemen klaim.",
        to: "/surety?tab=cat_asuransi",
        icon: Umbrella,
        subFeatures: [
          { title: "Health Coverage", to: "/surety?tab=cat_asuransi&sub=kesehatan", icon: HeartPulse },
          { title: "Life Coverage", to: "/surety?tab=cat_asuransi&sub=jiwa", icon: Umbrella },
          { title: "Policy Records", to: "", icon: FileText },
          { title: "Coverage Assessment", to: "", icon: Shield },
          { title: "Claims Management", to: "", icon: Activity },
        ],
      },
      {
        id: "kecukupan-dana",
        title: "Fund Sufficiency",
        subtitle: "Pemantauan cadangan likuid, perencanaan dana darurat, dan analisis kecukupan cadangan dana.",
        to: "/surety?tab=cat_dana",
        icon: Vault,
        subFeatures: [
          { title: "Reserve Dashboard", to: "/liquid-reserves", icon: Coins },
          { title: "Emergency Planner", to: "/surety?tab=cat_dana&sub=darurat", icon: Vault },
          { title: "Reserve Analysis", to: "", icon: LineChart },
        ],
      },
      {
        id: "proteksi-aset",
        title: "Asset Protection",
        subtitle: "Pengamanan dokumen kepemilikan aset dan bukti pembelian serta arsip garansi aset.",
        to: "/surety?tab=cat_proteksi",
        icon: Lock,
        subFeatures: [
          { title: "Asset Documents", to: "/surety?tab=cat_proteksi&sub=vault", icon: ShieldCheck },
          { title: "Warranty Records", to: "/surety?tab=cat_proteksi", icon: ShieldCheck },
        ],
      },
    ],
  },
  {
    step: 2,
    id: "flow",
    name: "Flow",
    subtitle: "Agresi dan Agilitas Kas",
    to: "/flow",
    icon: Coins,
    themeColor: "emerald",
    accentClass: "text-emerald-600 dark:text-emerald-400",
    borderClass: "border-emerald-500/30 hover:border-emerald-500/50",
    badgeBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25",
    gradientBg: "from-emerald-500/15 via-emerald-500/5 to-transparent",
    description:
      "Sirkulasi modal dan arus kas adaptif yang memastikan kemampuan finansial aktual dalam memenuhi kebutuhan dan kewajiban berkala tanpa mengorbankan likuiditas dan stabilitas jangka panjang.",
    principles: [
      { num: 1, text: "Prasyarat operasional yang memastikan aset dan pendapatan dapat terus bersirkulasi secara berkelanjutan." },
      { num: 2, text: "Arus kas bersih yang menunjukkan kemampuan finansial aktual dalam memenuhi kebutuhan dan kewajiban secara berkala." },
      { num: 3, text: "Indikator efisiensi penggunaan modal dalam menjaga likuiditas tanpa mengorbankan stabilitas jangka panjang." },
      { num: 4, text: "Dinamika pergerakan dana yang mencerminkan aktivitas ekonomi dan kelangsungan sistem finansial." },
      { num: 5, text: "Sirkulasi nilai ekonomi yang memungkinkan sistem finansial tetap adaptif, hidup, dan berfungsi secara optimal." },
    ],
    features: [
      {
        id: "beban-liabilitas",
        title: "Burden Liability",
        subtitle: "Pengelolaan kewajiban finansial jangka pendek dan panjang, kredit, rasio utang, cicilan, serta arsip liabilitas.",
        to: "/flow?tab=cat_liabilitas",
        icon: CreditCard,
        subFeatures: [
          { title: "Liability Dashboard", to: "/liability", icon: CreditCard },
          { title: "Debt Ratio Calculator", to: "/flow?tab=cat_liabilitas", icon: Calculator },
          { title: "Debt Management", to: "/kredit", icon: CreditCard },
          { title: "Liability Records", to: "", icon: FileText },
        ],
      },
      {
        id: "pemasukan-pengeluaran",
        title: "Income-Expense",
        subtitle: "Pemantauan pendapatan, pengeluaran, penyusunan anggaran, dan analisis realisasi anggaran personal maupun keluarga.",
        to: "/flow?tab=cat_pengeluaran",
        icon: ArrowRightLeft,
        subFeatures: [
          { title: "Income Dashboard", to: "/earning", icon: DollarSign },
          { title: "Expense Dashboard", to: "/expense", icon: ShoppingCart },
          { title: "Budget Planner", to: "/budget", icon: Wallet },
          { title: "Budget Analysis", to: "", icon: LineChart },
          { title: "Income Forecast", to: "", icon: TrendingUp },
        ],
      },
      {
        id: "kas-kredit",
        title: "Cash-Credit",
        subtitle: "Pemantauan saldo likuiditas, mutasi rekening, buku kas transaksi harian, serta analisis arus kas dan likuiditas.",
        to: "/flow?tab=cat_kredit",
        icon: Banknote,
        subFeatures: [
          { title: "Cash Ledger", to: "/flow?tab=transactions", icon: Banknote },
          { title: "Account Records", to: "", icon: FileText },
          { title: "Cashflow Dashboard", to: "", icon: LineChart },
          { title: "Liquidity Analysis", to: "", icon: TrendingUp },
          { title: "Liquidity Forecast", to: "", icon: LineChart },
        ],
      },
      {
        id: "retribusi-kontribusi",
        title: "Retribution-Contribution",
        subtitle: "Perhitungan estimasi pajak penghasilan pribadi (PPh 21 progresif), arsip pajak, analisis beban pajak, dan panduan kepatuhan.",
        to: "/flow?tab=cat_pajak",
        icon: Receipt,
        subFeatures: [
          { title: "Tax Calculator", to: "/pajak?app=pph21", icon: Calculator },
          { title: "Tax Records", to: "", icon: FileText },
          { title: "Tax Analysis", to: "", icon: LineChart },
          { title: "Tax Guide", to: "", icon: BookOpen },
        ],
      },
      {
        id: "sistem-otomatisasi",
        title: "Automation System",
        subtitle: "Otomatisasi pembayaran, jadwal tagihan rutin, dan alokasi tabungan otomatis sesuai jadwal yang ditetapkan.",
        to: "/flow?tab=cat_otomatisasi",
        icon: Activity,
        subFeatures: [
          { title: "Payment Automation", to: "/flow?tab=cat_otomatisasi&sub=autodebet", icon: Activity },
          { title: "Payment Schedule", to: "", icon: CalendarDays },
          { title: "Savings Automation", to: "", icon: RefreshCw },
        ],
      },
    ],
  },
  {
    step: 3,
    id: "build",
    name: "Build",
    subtitle: "Fondasi dan Modal Fundamental",
    to: "/build",
    icon: Building,
    themeColor: "amber",
    accentClass: "text-amber-600 dark:text-amber-400",
    borderClass: "border-amber-500/30 hover:border-amber-500/50",
    badgeBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25",
    gradientBg: "from-amber-500/15 via-amber-500/5 to-transparent",
    description:
      "Proses konstruksi dan akumulasi aset bertahap di mana arus kas dikonversi menjadi aset bernilai jangka panjang yang kokoh sebelum memasuki fase pertumbuhan dan ekspansi agresif.",
    principles: [
      { num: 1, text: "Proses akumulasi aset secara bertahap untuk membangun fondasi kekayaan yang stabil." },
      { num: 2, text: "Basis kekayaan yang menjadi penopang utama bagi ekspansi dan keberlanjutan nilai ekonomi." },
      { num: 3, text: "Tahap konstruksi modal di mana arus kas dikonversi menjadi aset bernilai jangka panjang." },
      { num: 4, text: "Struktur konsolidasi finansial yang memperkuat posisi ekonomi sebelum memasuki fase pertumbuhan agresif." },
      { num: 5, text: "Fase pembentukan sistem aset yang dirancang untuk mendukung pertumbuhan dan ketahanan jangka panjang." },
    ],
    features: [
      {
        id: "modal-manusia",
        title: "Human Capital",
        subtitle: "Valuasi kapasitas nilai keahlian diri, analisis daya ungkit karier profesional, dan asesmen kapital manusia.",
        to: "/build?tab=cat_modal",
        icon: Brain,
        subFeatures: [
          { title: "Skills Assessment", to: "/build?tab=cat_modal&sub=skill", icon: Brain },
          { title: "Career Analysis", to: "/build?tab=cat_modal&sub=karier", icon: TrendingUp },
          { title: "Capital Assessment", to: "", icon: Activity },
        ],
      },
      {
        id: "jaringan",
        title: "Net-Work",
        subtitle: "Jaringan profesional finansial personal dan keluarga, arsip penasihat, serta evaluasi kinerja penasihat.",
        to: "/build?tab=cat_jaringan",
        icon: Network,
        subFeatures: [
          { title: "Professional Directory", to: "/people-manager", icon: Users },
          { title: "Advisor Records", to: "", icon: FileText },
          { title: "Advisor Assessment", to: "", icon: ShieldCheck },
        ],
      },
      {
        id: "portofolio",
        title: "Portfolio",
        subtitle: "Manajemen kepemilikan multi-aset: properti real estate, surat berharga, aset digital, HKI, pemantauan harga pasar, serta analitik portofolio.",
        to: "/build?tab=cat_portofolio",
        icon: Briefcase,
        subFeatures: [
          { title: "Real Estate", to: "/real-estate", icon: Home },
          { title: "Securities", to: "/paper-securities", icon: ScrollText },
          { title: "Digital Assets", to: "/digital-assets", icon: Binary },
          { title: "Intellectual Property", to: "/intellectual-property", icon: Lightbulb },
          { title: "Market Monitor", to: "/100-komoditas", icon: Package },
          { title: "Portfolio Dashboard", to: "", icon: PieChart },
          { title: "Portfolio Analysis", to: "", icon: LineChart },
          { title: "Asset Valuation", to: "", icon: Calculator },
        ],
      },
      {
        id: "kekayaan-bersih",
        title: "Net-Worth",
        subtitle: "Perhitungan kalkulasi total net worth bersih dari seluruh kelas aset, asesmen kesehatan finansial, dan arsip kekayaan bersih.",
        to: "/build?tab=cat_kekayaan",
        icon: Landmark,
        subFeatures: [
          { title: "Asset Dashboard", to: "/asset", icon: Briefcase },
          { title: "Financial Assessment", to: "/financial-health", icon: HeartPulse },
          { title: "Net Worth Calculator", to: "", icon: Calculator },
          { title: "Net Worth Records", to: "", icon: FileText },
        ],
      },
      {
        id: "pembukuan",
        title: "Book Entry",
        subtitle: "Sistem pembukuan neraca saldo aset personal, jurnal transaksi, buku besar, dan alat rekonsiliasi.",
        to: "/build?tab=cat_pembukuan",
        icon: BookOpen,
        subFeatures: [
          { title: "Asset Balance", to: "/build?tab=cat_pembukuan&sub=neraca", icon: BookOpen },
          { title: "Journal Entries", to: "/build?tab=cat_pembukuan&sub=jurnal", icon: ReceiptText },
          { title: "Ledger Records", to: "", icon: FileText },
          { title: "Reconciliation Tools", to: "", icon: RefreshCw },
        ],
      },
    ],
  },
  {
    step: 4,
    id: "grow",
    name: "Grow",
    subtitle: "Akselerasi dan Skalabilitas Aset",
    to: "/grow",
    icon: Sprout,
    themeColor: "teal",
    accentClass: "text-teal-600 dark:text-teal-400",
    borderClass: "border-teal-500/30 hover:border-teal-500/50",
    badgeBg: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/25",
    gradientBg: "from-teal-500/15 via-teal-500/5 to-transparent",
    description:
      "Strategi akselerasi melalui alokasi sektor produktif, efek berlipat bunga majemuk (compounding), dan penyesuaian berkala agar return melampaui inflasi secara terukur dan berkelanjutan.",
    principles: [
      { num: 1, text: "Proses menentukan batas kenyamanan dan kapasitas finansial dalam merespons dinamika pasar, memastikan strategi pertumbuhan yang dipilih tetap terukur dan berkelanjutan." },
      { num: 2, text: "Metode pendistribusian modal ke berbagai sektor produktif untuk mengoptimalkan potensi apresiasi nilai aset secara keseluruhan." },
      { num: 3, text: "Prinsip pengelolaan dana yang mengutamakan akurasi hasil dan efisiensi proses agar nilai kekayaan dapat melampaui inflasi." },
      { num: 4, text: "Mekanisme pertumbuhan nilai di mana keuntungan yang dihasilkan diinvestasikan kembali untuk menciptakan efek berlipat pada kekayaan dari waktu ke waktu." },
      { num: 5, text: "Tindakan meninjau dan menyesuaikan strategi secara berkala untuk memastikan seluruh instrumen tetap berjalan sesuai tujuan jangka panjang." },
    ],
    features: [
      {
        id: "profil-risiko",
        title: "Risk Profiling",
        subtitle: "Asesmen toleransi dan kapasitas risiko, horizon waktu investasi, profil investor, serta laporan kesesuaian.",
        to: "/grow?tab=cat_profil",
        icon: Activity,
        subFeatures: [
          { title: "Risk Assessment", to: "/grow?tab=cat_profil&sub=toleransi", icon: Activity },
          { title: "Investment Horizon", to: "/grow?tab=cat_profil", icon: LineChart },
          { title: "Risk Capacity", to: "", icon: Shield },
          { title: "Investor Profile", to: "", icon: Users },
          { title: "Suitability Report", to: "", icon: FileText },
        ],
      },
      {
        id: "alokasi",
        title: "Allocation",
        subtitle: "Penyusunan alokasi aset dan instrumen investasi, perencanaan, analisis, serta pengaturan batas alokasi.",
        to: "/grow?tab=cat_alokasi",
        icon: PieChart,
        subFeatures: [
          { title: "Asset Allocation", to: "/grow?tab=cat_alokasi", icon: Coins },
          { title: "Allocation Planner", to: "", icon: Layers },
          { title: "Allocation Analysis", to: "", icon: LineChart },
          { title: "Allocation Settings", to: "", icon: Settings },
        ],
      },
      {
        id: "efektif-efisien",
        title: "Effective-Efficient",
        subtitle: "Analisis biaya transaksi, optimalisasi imbal hasil bersih, kalkulator biaya, dan perbandingan produk investasi.",
        to: "/grow?tab=cat_efektif",
        icon: Zap,
        subFeatures: [
          { title: "Cost Analysis", to: "/grow?tab=cat_efektif", icon: Zap },
          { title: "Net Return Analysis", to: "/grow?tab=cat_efektif", icon: TrendingUp },
          { title: "Fee Calculator", to: "", icon: Calculator },
          { title: "Product Comparison", to: "", icon: Scale },
        ],
      },
      {
        id: "bunga-berbunga",
        title: "Compounding",
        subtitle: "Kalkulator kekuatan bunga majemuk (compounding interest) dan simulator imbal hasil investasi berkala.",
        to: "/grow?tab=cat_bunga",
        icon: TrendingUp,
        subFeatures: [
          { title: "Compound Calculator", to: "/investasi?app=bunga-majemuk", icon: Calculator },
          { title: "Return Simulator", to: "/investasi?app=roi", icon: TrendingUp },
        ],
      },
      {
        id: "rebalancing-periodik",
        title: "Periodic Rebalancing",
        subtitle: "Pemantauan deviasi alokasi aset, jadwal rebalancing, kalkulator penyesuaian, dan alur kerja rebalancing.",
        to: "/grow?tab=cat_rebalance",
        icon: RefreshCw,
        subFeatures: [
          { title: "Allocation Drift", to: "/grow?tab=cat_rebalance&sub=deviasi", icon: RefreshCw },
          { title: "Rebalancing Schedule", to: "/grow?tab=cat_rebalance&sub=jadwal", icon: Layers },
          { title: "Rebalancing Calculator", to: "", icon: Calculator },
          { title: "Rebalancing Workflow", to: "", icon: Activity },
        ],
      },
    ],
  },
  {
    step: 5,
    id: "legacy",
    name: "Legacy",
    subtitle: "Transmisi dan Tata Kelola Nilai",
    to: "/legacy",
    icon: BookOpen,
    themeColor: "rose",
    accentClass: "text-rose-600 dark:text-rose-400",
    borderClass: "border-rose-500/30 hover:border-rose-500/50",
    badgeBg: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/25",
    gradientBg: "from-rose-500/15 via-rose-500/5 to-transparent",
    description:
      "Manifestasi tertinggi sistem finansial melalui tata kelola hukum aset keluarga, transmisi nilai antargenerasi, filantropi terstruktur, dan suksesi bebas sengketa yang lestari.",
    principles: [
      { num: 1, text: "Jejak panjang dari seluruh keputusan finansial yang membentuk makna dan tujuan dari kekayaan." },
      { num: 2, text: "Struktur hukum dan institusional yang memastikan manfaat ekonomi tetap terjaga sepanjang waktu." },
      { num: 3, text: "Dimensi keberlanjutan finansial yang melampaui batas hidup seorang individu atau entitas." },
      { num: 4, text: "Sistem transmisi kekayaan yang menjaga kesinambungan nilai antar generasi." },
      { num: 5, text: "Manifestasi tertinggi dari sebuah sistem finansial yang terintegrasi, stabil, dan berkelanjutan." },
    ],
    features: [
      {
        id: "pembelajaran-seumur-hidup",
        title: "Lifelong Learning",
        subtitle: "Literasi finansial antargenerasi, filosofi nilai keluarga, rencana pembelajaran, dan catatan pembelajaran.",
        to: "/legacy?tab=cat_pembelajaran",
        icon: GraduationCap,
        subFeatures: [
          { title: "Financial Literacy", to: "/legacy?tab=cat_pembelajaran&sub=literasi", icon: GraduationCap },
          { title: "Family Values", to: "/legacy?tab=cat_pembelajaran", icon: BookOpen },
          { title: "Learning Plan", to: "", icon: CalendarDays },
          { title: "Learning Records", to: "", icon: FileText },
        ],
      },
      {
        id: "tata-kelola",
        title: "Good Governance",
        subtitle: "Tinjauan tata kelola aset keluarga, struktur kepemilikan, registri aset keluarga, kerangka kerja, dan alur tata kelola.",
        to: "/legacy?tab=cat_tatakelola",
        icon: Building,
        subFeatures: [
          { title: "Governance Review", to: "/legacy?tab=cat_tatakelola", icon: Scale },
          { title: "Ownership Structure", to: "/legacy?tab=cat_tatakelola&sub=struktur", icon: Building },
          { title: "Family Asset Registry", to: "", icon: FileText },
          { title: "Governance Framework", to: "", icon: BookOpen },
          { title: "Governance Workflow", to: "", icon: Activity },
        ],
      },
      {
        id: "kontribusi-amal",
        title: "Charitable Concern",
        subtitle: "Catatan donasi dan infaq, log relawan sosial, perencanaan filantropi, serta analisis kontribusi amal.",
        to: "/legacy?tab=cat_amal",
        icon: HeartHandshake,
        subFeatures: [
          { title: "Donation Records", to: "/lainnya?app=donation-tracker", icon: Coins },
          { title: "Volunteer Records", to: "/lainnya?app=volunteer-log", icon: Heart },
          { title: "Giving Analysis", to: "", icon: LineChart },
          { title: "Giving Planner", to: "", icon: CalendarDays },
        ],
      },
      {
        id: "likuidasi-kewajiban",
        title: "Liability Liquidation",
        subtitle: "Alur penyelesaian pelunasan kewajiban, catatan pelunasan, dan daftar periksa likuidasi sebelum suksesi.",
        to: "/legacy?tab=cat_likuidasi",
        icon: ReceiptText,
        subFeatures: [
          { title: "Settlement Workflow", to: "/legacy?tab=cat_likuidasi&sub=pelunasan", icon: ReceiptText },
          { title: "Settlement Records", to: "", icon: FileText },
          { title: "Settlement Checklist", to: "", icon: CheckSquare },
        ],
      },
      {
        id: "transfer-kekayaan",
        title: "Wealth Transfer",
        subtitle: "Alur suksesi peralihan kekayaan (referensi silang ke modul Portfolio), registri ahli waris, kalkulator waris, panduan, dan catatan transfer.",
        to: "/legacy?tab=cat_transfer",
        icon: Gift,
        subFeatures: [
          { title: "Succession Workflow", to: "/legacy?tab=cat_transfer&sub=suksesi", icon: Gift },
          { title: "Beneficiary Registry", to: "", icon: Users },
          { title: "Estate Calculator", to: "", icon: Calculator },
          { title: "Estate Guide", to: "", icon: BookOpen },
          { title: "Transfer Records", to: "", icon: FileText },
          { title: "Distribution Planner", to: "", icon: Layers },
        ],
      },
    ],
  },
];

export const WEALTH_STAGE_PRINCIPLES_I18N: Record<
  string,
  Record<
    Language,
    {
      subtitle: string;
      description: string;
      principles: { num: number; text: string }[];
    }
  >
> = {
  surety: {
    id: {
      subtitle: "Mitigasi dan Kepastian Risiko",
      description: "Fondasi keamanan ekonomi dan instrumen penjamin terhadap risiko kegagalan, melindungi aset dan aliran nilai dari peristiwa tak terduga serta memastikan stabilitas finansial berkelanjutan sebelum proses ekspansi nilai dimulai.",
      principles: [
        { num: 1, text: "Instrumen hukum dan institusional yang berfungsi sebagai penjamin terhadap risiko kegagalan atau kelalaian finansial." },
        { num: 2, text: "Lapisan ketahanan sistemik yang melindungi aset dan aliran nilai dari peristiwa tak terduga serta gangguan struktural." },
        { num: 3, text: "Syarat minimum stabilitas finansial yang harus terpenuhi sebelum proses pertumbuhan dan ekspansi nilai dimulai." },
        { num: 4, text: "Prinsip dasar perlindungan dalam sistem keuangan yang memastikan terpenuhinya kewajiban dan terjaganya stabilitas nilai ekonomi." },
        { num: 5, text: "Fondasi keamanan ekonomi yang memungkinkan perencanaan, akumulasi, dan pengembangan kekayaan secara berkelanjutan." },
      ],
    },
    en: {
      subtitle: "Risk Mitigation & Certainty",
      description: "Economic security foundation and institutional guarantee against default, safeguarding assets and value streams from unexpected shocks while ensuring sustainable stability before value expansion begins.",
      principles: [
        { num: 1, text: "Legal and institutional instruments that act as guarantors against the risk of financial default or negligence." },
        { num: 2, text: "Systemic resilience layers that shield assets and value streams from unforeseen events and structural disruptions." },
        { num: 3, text: "Minimum financial stability prerequisites that must be satisfied before growth and value expansion begin." },
        { num: 4, text: "Foundational protection principles within the financial system ensuring fulfillment of obligations and preservation of economic value." },
        { num: 5, text: "Economic security foundations empowering disciplined, long-term wealth planning, accumulation, and stewardship." },
      ],
    },
    ms: {
      subtitle: "Mitigasi dan Kepastian Risiko",
      description: "Asas keselamatan ekonomi dan instrumen penjamin terhadap risiko kegagalan, melindungi aset dan aliran nilai daripada peristiwa tidak diduga serta memastikan kestabilan kewangan mampan sebelum proses pengembangan bermula.",
      principles: [
        { num: 1, text: "Instrumen undang-undang dan institusi yang berfungsi sebagai penjamin terhadap risiko kegagalan atau kecuaian kewangan." },
        { num: 2, text: "Lapisan ketahanan sistemik yang melindungi aset dan aliran nilai daripada peristiwa tidak diduga serta gangguan struktur." },
        { num: 3, text: "Syarat minimum kestabilan kewangan yang mesti dipenuhi sebelum proses pertumbuhan dan pengembangan nilai bermula." },
        { num: 4, text: "Prinsip asas perlindungan dalam sistem kewangan yang memastikan kewajipan dipenuhi dan kestabilan nilai ekonomi terpelihara." },
        { num: 5, text: "Asas keselamatan ekonomi yang membolehkan perancangan, pengumpulan, dan pembangunan kekayaan secara mampan." },
      ],
    },
    zh: {
      subtitle: "风险缓释与确定性",
      description: "经济安全基石与防范违约的制度保障，保护资产与资金流免受意外冲击，并在开启价值扩张前确立长效稳固的财务基本盘。",
      principles: [
        { num: 1, text: "作为防范财务违约或过失风险担保的法律与制度工具。" },
        { num: 2, text: "保护资产与价值流免受意外事件与结构性扰动影响的系统性韧性防御层。" },
        { num: 3, text: "在启动增长与财富价值规模扩张之前必须满足的最低财务稳定性前提。" },
        { num: 4, text: "金融体系中确保契约义务兑现并维持经济价值稳定的基础保护原则。" },
        { num: 5, text: "支持持续开展长期财富规划、资产积累与稳健增值的经济安全基石。" },
      ],
    },
  },
  flow: {
    id: {
      subtitle: "Agresi dan Agilitas Kas",
      description: "Sirkulasi modal dan arus kas adaptif yang memastikan kemampuan finansial aktual dalam memenuhi kebutuhan dan kewajiban berkala tanpa mengorbankan likuiditas dan stabilitas jangka panjang.",
      principles: [
        { num: 1, text: "Prasyarat operasional yang memastikan aset dan pendapatan dapat terus bersirkulasi secara berkelanjutan." },
        { num: 2, text: "Arus kas bersih yang menunjukkan kemampuan finansial aktual dalam memenuhi kebutuhan dan kewajiban secara berkala." },
        { num: 3, text: "Indikator efisiensi penggunaan modal dalam menjaga likuiditas tanpa mengorbankan stabilitas jangka panjang." },
        { num: 4, text: "Dinamika pergerakan dana yang mencerminkan aktivitas ekonomi dan kelangsungan sistem finansial." },
        { num: 5, text: "Sirkulasi nilai ekonomi yang memungkinkan sistem finansial tetap adaptif, hidup, dan berfungsi secara optimal." },
      ],
    },
    en: {
      subtitle: "Cash Flow & Capital Agility",
      description: "Adaptive capital circulation and cash velocity ensuring actual financial capability to fulfill recurring obligations without compromising liquidity and long-term stability.",
      principles: [
        { num: 1, text: "Operational prerequisites ensuring assets and income continue to circulate sustainably." },
        { num: 2, text: "Net cash flows reflecting actual financial capacity to meet routine needs and recurring obligations." },
        { num: 3, text: "Indicators of capital efficiency in maintaining liquidity without sacrificing long-term stability." },
        { num: 4, text: "Cash dynamics reflecting active economic participation and the continuity of the financial framework." },
        { num: 5, text: "Economic value circulation empowering the financial architecture to stay adaptive, vital, and functionally optimal." },
      ],
    },
    ms: {
      subtitle: "Aliran Tunai & Agiliti Modal",
      description: "Peredaran modal dan aliran tunai adaptif yang memastikan keupayaan kewangan sebenar dalam memenuhi keperluan dan komitmen berkala tanpa menjejaskan kecairan jangka panjang.",
      principles: [
        { num: 1, text: "Prasyarat operasi yang memastikan aset dan pendapatan dapat terus beredar secara mampan." },
        { num: 2, text: "Aliran tunai bersih yang menunjukkan keupayaan kewangan sebenar dalam memenuhi keperluan dan kewajipan berkala." },
        { num: 3, text: "Penunjuk kecekapan penggunaan modal dalam mengekalkan kecairan tanpa menjejaskan kestabilan jangka panjang." },
        { num: 4, text: "Dinamik pergerakan dana yang mencerminkan aktiviti ekonomi dan kelangsungan sistem kewangan." },
        { num: 5, text: "Peredaran nilai ekonomi yang membolehkan sistem kewangan kekal adaptif, hidup, dan berfungsi secara optimum." },
      ],
    },
    zh: {
      subtitle: "现金流与资本敏捷性",
      description: "自适应的资本周转与现金流转体系，确保在不牺牲流动性与长期稳健的前提下，持续具备兑现日常需求与定期债务的实际财务能力。",
      principles: [
        { num: 1, text: "确保资产与日常收入能够持续稳步循环周转的运营前提条件。" },
        { num: 2, text: "真实反映按期兑现各项生活需求与法定财务承诺能力的净现金流。" },
        { num: 3, text: "在不牺牲长期稳健前提下平衡即时流动性与资金利用率的资本效率指标。" },
        { num: 4, text: "反映真实经济活动活力与金融架构健康持续性的资金流动态势。" },
        { num: 5, text: "让整体财务体系保持高度灵活性、旺盛生命力与最优运转效能的价值循环机制。" },
      ],
    },
  },
  build: {
    id: {
      subtitle: "Fondasi dan Modal Fundamental",
      description: "Proses konstruksi dan akumulasi aset bertahap di mana arus kas dikonversi menjadi aset bernilai jangka panjang yang kokoh sebelum memasuki fase pertumbuhan dan ekspansi agresif.",
      principles: [
        { num: 1, text: "Proses akumulasi aset secara bertahap untuk membangun fondasi kekayaan yang stabil." },
        { num: 2, text: "Basis kekayaan yang menjadi penopang utama bagi ekspansi dan keberlanjutan nilai ekonomi." },
        { num: 3, text: "Tahap konstruksi modal di mana arus kas dikonversi menjadi aset bernilai jangka panjang." },
        { num: 4, text: "Struktur konsolidasi finansial yang memperkuat posisi ekonomi sebelum memasuki fase pertumbuhan agresif." },
        { num: 5, text: "Fase pembentukan sistem aset yang dirancang untuk mendukung pertumbuhan dan ketahanan jangka panjang." },
      ],
    },
    en: {
      subtitle: "Foundation & Fundamental Capital",
      description: "Disciplined capital construction and asset accumulation converting free cash flow into enduring valuable property before entering aggressive growth and market scaling.",
      principles: [
        { num: 1, text: "Gradual asset accumulation process to establish a resilient and stable wealth foundation." },
        { num: 2, text: "Wealth base serving as the foundational pillar for economic expansion and long-term value sustainability." },
        { num: 3, text: "Capital construction stage where cash flows are converted into enduring valuable long-term assets." },
        { num: 4, text: "Financial consolidation structure reinforcing economic standing prior to entering aggressive growth phases." },
        { num: 5, text: "Asset system development phase engineered to bolster ongoing growth and systemic long-term resilience." },
      ],
    },
    ms: {
      subtitle: "Asas dan Modal Fundamental",
      description: "Proses pembinaan dan pengumpulan aset berperingkat di mana aliran tunai ditukarkan kepada aset bernilai jangka panjang sebelum memasuki fasa pertumbuhan agresif.",
      principles: [
        { num: 1, text: "Proses pengumpulan aset secara berperingkat untuk membina asas kekayaan yang stabil." },
        { num: 2, text: "Asas kekayaan yang menjadi tonggak utama bagi pengembangan dan kemampanan nilai ekonomi." },
        { num: 3, text: "Tahap pembinaan modal di mana aliran tunai ditukarkan kepada aset bernilai jangka panjang." },
        { num: 4, text: "Struktur penyatuan kewangan yang memperkukuh kedudukan ekonomi sebelum melangkah ke fasa pertumbuhan agresif." },
        { num: 5, text: "Fase pembentukan sistem aset yang direka untuk menyokong pertumbuhan dan daya tahan jangka panjang." },
      ],
    },
    zh: {
      subtitle: "财富基石与基础资本",
      description: "扎实的资本构建与循序渐进的资产积累过程，在步入激进增长与规模扩张之前，将自由现金流转化为稳固持久的生产性长期资产。",
      principles: [
        { num: 1, text: "通过循序渐进的资产积累构建稳固持久财富底座的发展过程。" },
        { num: 2, text: "作为支撑未来经济扩张与长期价值延续核心支柱的底层财富基石。" },
        { num: 3, text: "将日常经营现金流稳健转化为具有长期保值增值属性资产的资本构建阶段。" },
        { num: 4, text: "在步入激进增长周期之前全面巩固资产负债表与抗风险能力的财务整合架构。" },
        { num: 5, text: "专门为支撑跨周期长期可持续增长与抵御市场波动而设计的资产体系构建阶段。" },
      ],
    },
  },
  grow: {
    id: {
      subtitle: "Akselerasi dan Skalabilitas Aset",
      description: "Strategi akselerasi melalui alokasi sektor produktif, efek berlipat bunga majemuk (compounding), dan penyesuaian berkala agar return melampaui inflasi secara terukur dan berkelanjutan.",
      principles: [
        { num: 1, text: "Proses menentukan batas kenyamanan dan kapasitas finansial dalam merespons dinamika pasar, memastikan strategi pertumbuhan yang dipilih tetap terukur dan berkelanjutan." },
        { num: 2, text: "Metode pendistribusian modal ke berbagai sektor produktif untuk mengoptimalkan potensi apresiasi nilai aset secara keseluruhan." },
        { num: 3, text: "Prinsip pengelolaan dana yang mengutamakan akurasi hasil dan efisiensi proses agar nilai kekayaan dapat melampaui inflasi." },
        { num: 4, text: "Mekanisme pertumbuhan nilai di mana keuntungan yang dihasilkan diinvestasikan kembali untuk menciptakan efek berlipat pada kekayaan dari waktu ke waktu." },
        { num: 5, text: "Tindakan meninjau dan menyesuaikan strategi secara berkala untuk memastikan seluruh instrumen tetap berjalan sesuai tujuan jangka panjang." },
      ],
    },
    en: {
      subtitle: "Asset Acceleration & Scalability",
      description: "Acceleration strategies through productive sector allocations, compounding yield mechanisms, and periodic rebalancing to consistently outperform inflation safely.",
      principles: [
        { num: 1, text: "Process of defining risk comfort thresholds and financial capacity when responding to market dynamics, ensuring growth strategies remain measured and sustainable." },
        { num: 2, text: "Methods of allocating capital across productive sectors to optimize overall capital appreciation potential." },
        { num: 3, text: "Fund management principles prioritizing accurate outcomes and cost efficiency so wealth growth consistently outpaces inflation." },
        { num: 4, text: "Value multiplication mechanism where earned returns are reinvested to generate compounding wealth expansion over time." },
        { num: 5, text: "Periodic review and adjustment actions ensuring all financial instruments remain aligned with long-term strategic objectives." },
      ],
    },
    ms: {
      subtitle: "Pecutan dan Skalabiliti Aset",
      description: "Strategi pecutan melalui pengagihan sektor produktif, kesan faedah kompaun, dan pelarasan berkala supaya pulangan mengatasi inflasi secara mampan.",
      principles: [
        { num: 1, text: "Proses menentukan batas keselesaan dan kapasiti kewangan terhadap dinamik pasaran, memastikan strategi pertumbuhan kekal terukur dan mampan." },
        { num: 2, text: "Kaedah pengagihan modal ke pelbagai sektor produktif bagi mengoptimumkan potensi kenaikan nilai aset secara menyeluruh." },
        { num: 3, text: "Prinsip pengurusan dana yang mengutamakan ketepatan hasil dan kecekapan proses supaya nilai kekayaan mengatasi inflasi." },
        { num: 4, text: "Mekanisme pertumbuhan nilai di mana keuntungan yang dijana dilaburkan semula bagi mencipta kesan penggandaan kekayaan dari semasa ke semasa." },
        { num: 5, text: "Tindakan menyemak dan melaraskan strategi secara berkala untuk memastikan semua instrumen kekal selaras dengan matlamat jangka panjang." },
      ],
    },
    zh: {
      subtitle: "资产加速与规模化",
      description: "通过优质生产性板块配置、复利再投资机制与定期动态再平衡的加速增值策略，确保投资回报在可控风险下长期稳健战胜通胀。",
      principles: [
        { num: 1, text: "在应对市场波动时科学厘定心理舒适阈值与量化资金承受能力，确保所选增长策略始终可测、可控且可持续的过程。" },
        { num: 2, text: "将资本广泛配置于多元生产性实体产业与金融品类，以最大化挖掘全域资产综合升值潜力的方法。" },
        { num: 3, text: "坚持追求确定性收益成果与极低费率损耗摩擦，确保真实财富增幅持续稳健跑赢通胀的资金管理准则。" },
        { num: 4, text: "将已实现的投资收益持续滚存再投资、从而随时间推移释放指数级财富复利乘数效应的价值增值机制。" },
        { num: 5, text: "定期深度评估并动态调优资产配置策略，确保全套投资工具组合始终紧密贴合既定长期战略目标的管理举措。" },
      ],
    },
  },
  legacy: {
    id: {
      subtitle: "Transmisi dan Tata Kelola Nilai",
      description: "Manifestasi tertinggi sistem finansial melalui tata kelola hukum aset keluarga, transmisi nilai antargenerasi, filantropi terstruktur, dan suksesi bebas sengketa yang lestari.",
      principles: [
        { num: 1, text: "Jejak panjang dari seluruh keputusan finansial yang membentuk makna dan tujuan dari kekayaan." },
        { num: 2, text: "Struktur hukum dan institusional yang memastikan manfaat ekonomi tetap terjaga sepanjang waktu." },
        { num: 3, text: "Dimensi keberlanjutan finansial yang melampaui batas hidup seorang individu atau entitas." },
        { num: 4, text: "Sistem transmisi kekayaan yang menjaga kesinambungan nilai antar generasi." },
        { num: 5, text: "Manifestasi tertinggi dari sebuah sistem finansial yang terintegrasi, stabil, dan berkelanjutan." },
      ],
    },
    en: {
      subtitle: "Value Transmission & Governance",
      description: "The apex of wealth stewardship through family legal governance, intergenerational value transmission, structured philanthropy, and dispute-free perpetual succession.",
      principles: [
        { num: 1, text: "The enduring footprint of cumulative financial decisions shaping the deeper meaning and ultimate purpose of family wealth." },
        { num: 2, text: "Legal and institutional frameworks ensuring economic benefits and protections endure across time." },
        { num: 3, text: "Financial sustainability dimension that transcends the natural lifespan of any single individual or entity." },
        { num: 4, text: "Wealth transmission architecture safeguarding intergenerational continuity and preserving family core values." },
        { num: 5, text: "The apex manifestation of a comprehensively integrated, stable, and perpetual financial system." },
      ],
    },
    ms: {
      subtitle: "Penyampaian dan Tadbir Urus Nilai",
      description: "Manifestasi tertinggi sistem kewangan melalui tadbir urus undang-undang aset keluarga, pemindahan nilai antara generasi, dan pewarisan mampan.",
      principles: [
        { num: 1, text: "Jejak panjang daripada keseluruhan keputusan kewangan yang membentuk makna dan tujuan kekayaan." },
        { num: 2, text: "Struktur undang-undang dan institusi yang memastikan manfaat ekonomi kekal terpelihara sepanjang masa." },
        { num: 3, text: "Dimensi kemampanan kewangan yang menjangkaui batas hayat seorang individu atau entiti." },
        { num: 4, text: "Sistem pemindahan kekayaan yang memelihara kesinambungan nilai antara generasi." },
        { num: 5, text: "Manifestasi tertinggi bagi sebuah sistem kewangan yang bersepadu, stabil, dan berkekalan." },
      ],
    },
    zh: {
      subtitle: "价值传承与财富治理",
      description: "家族财富架构的至高形态：通过完善的法律信托架构、跨代精神与物质财富传承、结构化家族慈善及无争议永续接班体系。",
      principles: [
        { num: 1, text: "贯穿历代全部财务决策轨迹并深刻铸就财富精神内涵与终极使命的历史印记。" },
        { num: 2, text: "借助严谨法律信托与制度化治理结构确保核心经济利益与家族收益历久弥新的长效保障。" },
        { num: 3, text: "远远超越单一自然人或企业个体生命周期限制的超长周期财务可持续性维度。" },
        { num: 4, text: "在跨代传承过程中全方位保障精神文化底蕴、伦理价值与物质资产完整延续的财富交接体系。" },
        { num: 5, text: "高度整合、至臻稳固且代际永续的现代化金融与财富治理生态体系的至高形态。" },
      ],
    },
  },
};

interface CategorySectionViewProps {
  stage: WealthStageMainBoxDef;
  apps: StandaloneFinancialAppDef[];
  favorites: string[];
  toggleFavorite: (to: string) => void;
  getGradient?: (title: string) => string;
  showDescription?: boolean;
}

function CategorySectionView({
  stage,
  apps,
  favorites,
  toggleFavorite,
  getGradient,
  showDescription = true,
}: CategorySectionViewProps) {
  const Icon = stage.icon;
  const lang = useLanguage();

  const stageI18n =
    WEALTH_STAGE_PRINCIPLES_I18N[stage.id]?.[lang] ||
    WEALTH_STAGE_PRINCIPLES_I18N[stage.id]?.id || {
      subtitle: stage.subtitle,
      principles: stage.principles,
    };

  const stagePrefix =
    lang === "en"
      ? `Stage #${stage.step}`
      : lang === "zh"
      ? `阶段 #${stage.step}`
      : `Tahap #${stage.step}`;

  return (
    <section id={`category-${stage.id}`} className={`w-full ${showDescription ? "space-y-4 sm:space-y-4.5" : ""}`}>
      {showDescription && (
        /* Kotak Utama: Khusus 5 Deskripsi (Hanya di Bilah Masing-Masing) */
        <div
          className={`w-full rounded-2xl sm:rounded-3xl border ${stage.borderClass} bg-card/85 backdrop-blur-md shadow-xs hover:shadow-md transition-all p-4.5 sm:p-5 relative overflow-hidden`}
        >
          {/* Accent top gradient line */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stage.gradientBg}`} />

          {/* Header Kategori Ringkas */}
          <div className="flex items-center gap-2.5 mb-3.5 px-0.5">
            <div className={`p-1.5 rounded-lg border ${stage.badgeBg}`}>
              <Icon className="size-4" />
            </div>
            <span className={`text-[11px] font-bold font-mono px-2 py-0.5 rounded-full border ${stage.badgeBg}`}>
              {stagePrefix}
            </span>
            <h3 className="text-sm sm:text-base font-bold text-foreground">
              {stage.name}
            </h3>
            <span className="text-xs text-muted-foreground font-medium hidden sm:inline">
              — {stageI18n.subtitle}
            </span>
          </div>

          {/* Khusus 5 Deskripsi dalam Kotak Utama */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-3.5">
            {stageI18n.principles.map((p) => {
              const pointLabel =
                lang === "en"
                  ? `Principle ${p.num}`
                  : lang === "zh"
                  ? `原则 ${p.num}`
                  : `Prinsip ${p.num}`;

              return (
                <div
                  key={p.num}
                  className="p-3.5 rounded-xl sm:rounded-2xl bg-muted/25 border border-border/60 hover:border-primary/40 hover:bg-muted/40 transition-all flex flex-col justify-start gap-2 shadow-2xs group/card"
                >
                  <div className="flex items-center gap-2">
                    <span className="size-5.5 rounded-md bg-primary/10 text-primary text-[11px] font-bold font-mono flex items-center justify-center shrink-0 group-hover/card:bg-primary group-hover/card:text-primary-foreground transition-colors">
                      {p.num}
                    </span>
                    <span className="text-xs font-bold text-foreground tracking-tight leading-snug">
                      {pointLabel}
                    </span>
                  </div>
                  <p className="text-[11.5px] text-foreground/80 leading-relaxed font-normal">
                    {p.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Grid Kotak-Kotak Modul (Gaya Seperti di Page Lain dengan MBACard) */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5 sm:gap-5">
        {apps.map((app) => (
          <MBACard
            key={app.id}
            title={app.title}
            to={app.to}
            icon={app.icon}
            badge={app.categoryLabel}
            shortDesc={app.subtitle}
            gradient={getGradient ? getGradient(app.title) : undefined}
            categoryGroups={buildModuleCategoryGroups(app.features, app.to)}
            features={app.features?.map((f) => ({
              title: f.title,
              to: f.to,
              icon: f.icon,
            }))}
            isFav={favorites.includes(app.to)}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </section>
  );
}

export const FIN_CATEGORY_TABS: {
  id: FinancialCategoryTab;
  label: string;
  count: number;
}[] = [
  { id: "all", label: "Semua", count: STANDALONE_FINANCIAL_APPS.length },
  {
    id: "surety",
    label: "Surety",
    count: STANDALONE_FINANCIAL_APPS.filter((a) => a.category === "surety").length,
  },
  {
    id: "flow",
    label: "Flow",
    count: STANDALONE_FINANCIAL_APPS.filter((a) => a.category === "flow").length,
  },
  {
    id: "build",
    label: "Build",
    count: STANDALONE_FINANCIAL_APPS.filter((a) => a.category === "build").length,
  },
  {
    id: "grow",
    label: "Grow",
    count: STANDALONE_FINANCIAL_APPS.filter((a) => a.category === "grow").length,
  },
  {
    id: "legacy",
    label: "Legacy",
    count: STANDALONE_FINANCIAL_APPS.filter((a) => a.category === "legacy").length,
  },
];

export const FIN_TOTAL_MODULES = STANDALONE_FINANCIAL_APPS.length;
export const FIN_TOOLS_COUNT = STANDALONE_FINANCIAL_APPS.reduce(
  (sum, app) =>
    sum + (app.features?.filter((f) => f.componentCategory === "Tools").length || 0),
  0
);
export const FIN_FEATURES_COUNT = STANDALONE_FINANCIAL_APPS.reduce(
  (sum, app) =>
    sum + (app.features?.filter((f) => f.componentCategory !== "Tools").length || 0),
  0
);
export const FIN_TOTAL_BADGE = `${FIN_TOTAL_MODULES} Modul • ${FIN_FEATURES_COUNT} Features • ${FIN_TOOLS_COUNT} Tools`;
syncLauncherPageBadge("financial", FIN_TOTAL_BADGE);
export const FIN_SUMMARY_DESC = FIN_CATEGORY_TABS.map(
  (t) => `${t.label} (${t.count})`
).join(" · ");

export function FinancialWealthSection({
  favorites,
  toggleFavorite,
  getGradient,
}: FinancialWealthSectionProps) {
  const [selectedTab, setSelectedTab] = useState<FinancialCategoryTab>("all");
  const lang = useLanguage();
  const pageId = useCurrentLauncherPage("financial") || "financial";
  const { getPageCountDelta } = useCardPageMover();
  const { pinnedList } = usePinnedCards(pageId);

  const displayedStages = useMemo(() => {
    if (selectedTab === "all" || selectedTab === "spectrum") {
      return WEALTH_STAGE_MAIN_BOXES;
    }
    return WEALTH_STAGE_MAIN_BOXES.filter((s) => s.id === selectedTab);
  }, [selectedTab]);

  const allLabel = lang === "en" ? "All" : lang === "zh" ? "全部" : "Semua";
  const localizedTabs = useMemo(
    () =>
      FIN_CATEGORY_TABS.map((t) =>
        t.id === "all" ? { ...t, label: allLabel } : t
      ),
    [allLabel]
  );

  return (
    <LauncherPageProvider pageId={pageId}>
    <div className="w-full flex flex-col items-center">
      {/* Portaled ShellHeader: Clean Category Selector di Top Right Bar */}
      <ShellHeader>
        <HeaderNavPills
          items={adjustCategoryTabsCount(localizedTabs, getPageCountDelta(pageId))}
          activeId={selectedTab}
          onSelect={(id) => setSelectedTab(id)}
        />
      </ShellHeader>

      {/* Title */}
      <div className="text-center mb-3 sm:mb-4">
        <h3 className="text-2xl sm:text-3xl font-bold text-foreground/90 tracking-tight flex items-center justify-center gap-2">
          <span>Financial Planning <span className="font-normal">and</span> Wealth Management</span>
        </h3>
      </div>

      {selectedTab === "all" && (
        <MovedCardsSection pageId={pageId} className="mb-8" />
      )}

      {/* Konten Kategori: Menyatukan Semua Modul dalam 1 Grid 3-Kolom Bersih Tanpa Pembeda */}
      {selectedTab === "all" ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5 sm:gap-5">
          {sortCardsWithPinned(
            STANDALONE_FINANCIAL_APPS,
            (a) => a.to || a.title,
            pinnedList
          ).map((app) => (
            <MBACard
              key={app.id}
              title={app.title}
              to={app.to}
              icon={app.icon}
              badge={app.categoryLabel}
              shortDesc={app.subtitle}
              gradient={getGradient ? getGradient(app.title) : undefined}
              categoryGroups={buildModuleCategoryGroups(app.features, app.to)}
              features={app.features?.map((f) => ({
                title: f.title,
                to: f.to,
                icon: f.icon,
              }))}
              isFav={favorites.includes(app.to)}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="w-full space-y-10 sm:space-y-12">
          {displayedStages.map((stage) => {
            const stageApps = sortCardsWithPinned(
              STANDALONE_FINANCIAL_APPS.filter(
                (app) => app.category === stage.id
              ),
              (a) => a.to || a.title,
              pinnedList
            );
            return (
              <CategorySectionView
                key={stage.id}
                stage={stage}
                apps={stageApps}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                getGradient={getGradient}
                showDescription={true}
              />
            );
          })}
        </div>
      )}
    </div>
    </LauncherPageProvider>
  );
}
