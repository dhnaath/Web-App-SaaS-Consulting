import React, { useState, useMemo } from "react";
import { useFavorites } from "@/hooks/useFavorites";
import { HeaderNavPills, ShellHeader } from "@/app/shell-header";
import {
  MBACard,
  buildModuleCategoryGroups,
  type ModuleComponentCategory,
} from "@/components/common/MBACard";
import { MovedCardsGridItems } from "@/components/common/MovedCardsGridItems";
import {
  LauncherPageProvider,
  adjustCategoryTabsCount,
  syncLauncherPageBadge,
  useCardPageMover,
  useCurrentLauncherPage,
} from "@/hooks/useCardPageMover";
import { usePinnedCards, sortCardsWithPinned } from "@/hooks/usePinnedCards";
import {
  TrendingUp,
  Building2,
  Target,
  Users,
  Sparkles,
  Compass,
  Microscope,
  BookOpen,
  PenTool,
  Send,
  Database,
  Lightbulb,
  LineChart,
  Scale,
  UserSearch,
  Stethoscope,
  Calculator,
  GitBranch,
  Layers,
  FileCheck,
  Book,
  Library,
  Search,
} from "lucide-react";

export type ResearchCategory =
  | "all"
  | "markets"
  | "academia"
  | "intelligence"
  | "consulting"
  | "knowledge";

export interface ResearchSubMenu {
  id: string;
  label: string;
  to: string;
  inverted?: boolean;
  componentCategory: ModuleComponentCategory;
}

export interface ResearchAppItem {
  id: string;
  name: string;
  category: Exclude<ResearchCategory, "all">;
  categoryLabel: string;
  shortDesc: string;
  to: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  badge: string;
  accentGradient: string;
  accentBorder: string;
  badgeBg: string;
  badgeText: string;
  subMenus: ResearchSubMenu[];
}

export const RESEARCH_APPS: ResearchAppItem[] = [
  // ==========================================================================
  // 1. Business Research (5 Modul)
  // ==========================================================================
  {
    id: "market-research",
    name: "Market Research",
    category: "markets",
    categoryLabel: "Markets",
    shortDesc:
      "Estimasi ukuran pasar (TAM/SAM/SOM), dinamika permintaan, serta penyusunan brief studi riset pasar.",
    to: "/research-foundations-and-reference-frameworks?module=market-research",
    icon: TrendingUp,
    badge: "Markets",
    accentGradient: "from-blue-500 to-indigo-600",
    accentBorder: "border-blue-500/30 hover:border-blue-500/60",
    badgeBg: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
    badgeText: "Markets",
    subMenus: [
      { id: "market-sizing-calculator", label: "Market Sizing Calculator", to: "", componentCategory: "Tools" },
      { id: "market-demand-analytics", label: "Market Demand Analytics", to: "", componentCategory: "Analytics" },
      { id: "market-study-brief-template", label: "Market Study Brief", to: "", componentCategory: "Templates" },
    ],
  },
  {
    id: "industry-research",
    name: "Industry Research",
    category: "markets",
    categoryLabel: "Markets",
    shortDesc:
      "Pemetaan struktur sektor industri, klasifikasi KBLI/NAICS, dinamika rantai nilai sektor, dan lanskap regulasi.",
    to: "/research-foundations-and-reference-frameworks?module=industry-research",
    icon: Building2,
    badge: "Markets",
    accentGradient: "from-sky-500 to-blue-600",
    accentBorder: "border-sky-500/30 hover:border-sky-500/60",
    badgeBg: "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30",
    badgeText: "Markets",
    subMenus: [
      { id: "industry-profile-repository", label: "Industry Profile Repository", to: "", componentCategory: "Records" },
      { id: "industry-structure-analysis", label: "Industry Structure Analysis", to: "", componentCategory: "Analytics" },
      { id: "industry-landscape-guide", label: "Industry Landscape Guide", to: "", componentCategory: "Guides" },
    ],
  },
  {
    id: "competitor-research",
    name: "Competitor Intelligence",
    category: "markets",
    categoryLabel: "Markets",
    shortDesc:
      "Intelijen kompetitif, registri profil pesaing, pemetaan positioning penawaran, dan pemantauan pergerakan rival.",
    to: "/research-foundations-and-reference-frameworks?module=competitor-research",
    icon: Target,
    badge: "Markets",
    accentGradient: "from-indigo-500 to-violet-600",
    accentBorder: "border-indigo-500/30 hover:border-indigo-500/60",
    badgeBg: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    badgeText: "Markets",
    subMenus: [
      { id: "competitor-registry", label: "Competitor Registry", to: "", componentCategory: "Records" },
      { id: "competitive-positioning-matrix", label: "Competitive Positioning Matrix", to: "", componentCategory: "Tools" },
      { id: "competitor-watch-dashboard", label: "Competitor Watch Dashboard", to: "", componentCategory: "Dashboards" },
    ],
  },
  {
    id: "customer-research",
    name: "Customer Intelligence",
    category: "markets",
    categoryLabel: "Markets",
    shortDesc:
      "Riset perilaku pembeli, penyusunan persona pelanggan, sintesis suara pelanggan (VoC), dan protokol wawancara.",
    to: "/research-foundations-and-reference-frameworks?module=customer-research",
    icon: Users,
    badge: "Markets",
    accentGradient: "from-cyan-500 to-blue-600",
    accentBorder: "border-cyan-500/30 hover:border-cyan-500/60",
    badgeBg: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
    badgeText: "Markets",
    subMenus: [
      { id: "customer-persona-builder", label: "Customer Persona Builder", to: "", componentCategory: "Tools" },
      { id: "voice-of-customer-analytics", label: "Customer Voice", to: "", componentCategory: "Analytics" },
      { id: "customer-interview-guide", label: "Customer Interview Guide", to: "", componentCategory: "Guides" },
    ],
  },
  {
    id: "opportunity-research",
    name: "Opportunity Analysis",
    category: "markets",
    categoryLabel: "Markets",
    shortDesc:
      "Identifikasi celah pasar yang belum terlayani, penilaian daya tarik peluang ekspansi, dan alur validasi peluang baru.",
    to: "/research-foundations-and-reference-frameworks?module=opportunity-research",
    icon: Sparkles,
    badge: "Markets",
    accentGradient: "from-teal-500 to-emerald-600",
    accentBorder: "border-teal-500/30 hover:border-teal-500/60",
    badgeBg: "bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30",
    badgeText: "Markets",
    subMenus: [
      { id: "market-whitespace-mapper", label: "Market Whitespace Mapper", to: "", componentCategory: "Tools" },
      { id: "opportunity-scoring-matrix", label: "Opportunity Scoring Matrix", to: "", componentCategory: "Analytics" },
      { id: "opportunity-pipeline", label: "Opportunity Pipeline", to: "", componentCategory: "Workflows" },
    ],
  },

  // ==========================================================================
  // 2. Academic Research (5 Modul)
  // ==========================================================================
  {
    id: "research-design",
    name: "Research Design",
    category: "academia",
    categoryLabel: "Academia",
    shortDesc:
      "Perumusan pertanyaan riset, kerangka konseptual, hipotesis, manajemen bukti ilmiah, serta template proposal penelitian.",
    to: "/research-manager",
    icon: Compass,
    badge: "Academia",
    accentGradient: "from-purple-500 to-violet-600",
    accentBorder: "border-purple-500/30 hover:border-purple-500/60",
    badgeBg: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
    badgeText: "Academia",
    subMenus: [
      {
        id: "research-manager",
        label: "Research Workspace",
        to: "/research-manager",
        inverted: false,
        componentCategory: "Features",
      },
      { id: "hypothesis-formulation-canvas", label: "Hypothesis Formulation Canvas", to: "", componentCategory: "Tools" },
      { id: "research-proposal-template", label: "Research Proposal Template", to: "", componentCategory: "Templates" },
    ],
  },
  {
    id: "research-methodology",
    name: "Research Methods",
    category: "academia",
    categoryLabel: "Academia",
    shortDesc:
      "Pemilihan metode kualitatif, kuantitatif, atau mixed-methods, kalkulasi ukuran sampel, dan uji validitas instrumen.",
    to: "/research-foundations-and-reference-frameworks?module=research-methodology",
    icon: Microscope,
    badge: "Academia",
    accentGradient: "from-violet-500 to-fuchsia-600",
    accentBorder: "border-violet-500/30 hover:border-violet-500/60",
    badgeBg: "bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/30",
    badgeText: "Academia",
    subMenus: [
      { id: "sampling-size-calculator", label: "Sampling Size Calculator", to: "", componentCategory: "Tools" },
      { id: "methodology-selection-guide", label: "Methodology Selection Guide", to: "", componentCategory: "Guides" },
      { id: "instrument-validation-checklist", label: "Instrument Validation Checklist", to: "", componentCategory: "Workflows" },
    ],
  },
  {
    id: "literature-review",
    name: "Literature Review",
    category: "academia",
    categoryLabel: "Academia",
    shortDesc:
      "Penyaringan studi terdahulu secara sistematis, catatan riset terstruktur, pemetaan research gap, dan sintesis tematik.",
    to: "/notes",
    icon: BookOpen,
    badge: "Academia",
    accentGradient: "from-fuchsia-500 to-pink-600",
    accentBorder: "border-fuchsia-500/30 hover:border-fuchsia-500/60",
    badgeBg: "bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/30",
    badgeText: "Academia",
    subMenus: [
      {
        id: "research-notes",
        label: "Research Notes",
        to: "/notes",
        inverted: false,
        componentCategory: "Records",
      },
      { id: "literature-synthesis-matrix", label: "Literature Synthesis Matrix", to: "", componentCategory: "Tools" },
      { id: "systematic-review-workflow", label: "Systematic Review Workflow", to: "", componentCategory: "Workflows" },
    ],
  },
  {
    id: "academic-writing",
    name: "Academic Writing",
    category: "academia",
    categoryLabel: "Academia",
    shortDesc:
      "Penyusunan struktur naskah ilmiah IMRaD, alur argumentasi akademik, serta pedoman gaya selingkung dan sitasi.",
    to: "/research-foundations-and-reference-frameworks?module=academic-writing",
    icon: PenTool,
    badge: "Academia",
    accentGradient: "from-rose-500 to-pink-600",
    accentBorder: "border-rose-500/30 hover:border-rose-500/60",
    badgeBg: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
    badgeText: "Academia",
    subMenus: [
      { id: "academic-manuscript-template", label: "Academic Manuscript Template", to: "", componentCategory: "Templates" },
      { id: "academic-style-citation-guide", label: "Citation Style Guide", to: "", componentCategory: "Guides" },
      { id: "argument-outline-builder", label: "Argument Outline Builder", to: "", componentCategory: "Tools" },
    ],
  },
  {
    id: "publication-research",
    name: "Publication Resources",
    category: "academia",
    categoryLabel: "Academia",
    shortDesc:
      "Pemetaan jurnal ilmiah sasaran, pelacakan proses submisi peer-review, serta panduan etika publikasi akademik.",
    to: "/research-foundations-and-reference-frameworks?module=publication-research",
    icon: Send,
    badge: "Academia",
    accentGradient: "from-indigo-500 to-purple-600",
    accentBorder: "border-indigo-500/30 hover:border-indigo-500/60",
    badgeBg: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    badgeText: "Academia",
    subMenus: [
      { id: "target-journal-directory", label: "Target Journal Directory", to: "", componentCategory: "Records" },
      { id: "peer-review-submission-workflow", label: "Peer-Review Submission Workflow", to: "", componentCategory: "Workflows" },
      { id: "publication-ethics-guide", label: "Publication Ethics Guide", to: "", componentCategory: "Guides" },
    ],
  },

  // ==========================================================================
  // 3. Business Intelligence (4 Modul)
  // ==========================================================================
  {
    id: "data-intelligence",
    name: "Data Intelligence",
    category: "intelligence",
    categoryLabel: "Intelligence",
    shortDesc:
      "Katalog sumber data terverifikasi, otomasi pipeline agregasi data intelijen, dan pengaturan tata kelola indikator.",
    to: "/research-foundations-and-reference-frameworks?module=data-intelligence",
    icon: Database,
    badge: "Intelligence",
    accentGradient: "from-emerald-500 to-teal-600",
    accentBorder: "border-emerald-500/30 hover:border-emerald-500/60",
    badgeBg: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    badgeText: "Intelligence",
    subMenus: [
      { id: "data-source-catalog", label: "Data Source Catalog", to: "", componentCategory: "Records" },
      { id: "intelligence-pipeline-automation", label: "Intelligence Pipeline Automation", to: "", componentCategory: "Automations" },
      { id: "data-governance-settings", label: "Data Governance Settings", to: "", componentCategory: "Settings" },
      { id: "chapter-2-statistik", label: "Statistical Analysis", to: "/kurasi/statistik", inverted: false, componentCategory: "Analytics" },
    ],
  },
  {
    id: "business-insights",
    name: "Business Intelligence",
    category: "intelligence",
    categoryLabel: "Intelligence",
    shortDesc:
      "Dasbor ringkasan intelijen eksekutif, analisis korelasi lintas metrik, dan template penyajian brief insight bisnis.",
    to: "/research-foundations-and-reference-frameworks?module=business-insights",
    icon: Lightbulb,
    badge: "Intelligence",
    accentGradient: "from-teal-500 to-cyan-600",
    accentBorder: "border-teal-500/30 hover:border-teal-500/60",
    badgeBg: "bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30",
    badgeText: "Intelligence",
    subMenus: [
      { id: "executive-insights-dashboard", label: "Executive Insights Dashboard", to: "", componentCategory: "Dashboards" },
      { id: "cross-metric-insight-analytics", label: "Cross-Metric Insight Analytics", to: "", componentCategory: "Analytics" },
      { id: "insight-brief-template", label: "Insight Brief Template", to: "", componentCategory: "Templates" },
    ],
  },
  {
    id: "trend-analysis",
    name: "Trend Intelligence",
    category: "intelligence",
    categoryLabel: "Intelligence",
    shortDesc:
      "Pelacakan sinyal perubahan makro-mikro, analitik deret waktu untuk peramalan tren, dan otomasi peringatan ambang batas.",
    to: "/research-foundations-and-reference-frameworks?module=trend-analysis",
    icon: LineChart,
    badge: "Intelligence",
    accentGradient: "from-cyan-500 to-sky-600",
    accentBorder: "border-cyan-500/30 hover:border-cyan-500/60",
    badgeBg: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
    badgeText: "Intelligence",
    subMenus: [
      { id: "trend-signal-tracker", label: "Trend Signal Tracker", to: "", componentCategory: "Features" },
      { id: "time-series-forecast-analytics", label: "Time-Series Forecast Analytics", to: "", componentCategory: "Analytics" },
      { id: "trend-alert-automation", label: "Trend Alert Automation", to: "", componentCategory: "Automations" },
    ],
  },
  {
    id: "benchmarking",
    name: "Benchmark Intelligence",
    category: "intelligence",
    categoryLabel: "Intelligence",
    shortDesc:
      "Komparasi rasio kinerja lintas entitas, matriks pembandingan parameter operasional, dan arsip dataset acuan industri.",
    to: "/research-foundations-and-reference-frameworks?module=benchmarking",
    icon: Scale,
    badge: "Intelligence",
    accentGradient: "from-green-500 to-emerald-600",
    accentBorder: "border-green-500/30 hover:border-green-500/60",
    badgeBg: "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/30",
    badgeText: "Intelligence",
    subMenus: [
      { id: "peer-benchmark-analytics", label: "Peer Benchmark Analytics", to: "", componentCategory: "Analytics" },
      { id: "benchmarking-matrix-tool", label: "Benchmarking Matrix Tool", to: "", componentCategory: "Tools" },
      { id: "benchmark-dataset-records", label: "Benchmark Dataset Records", to: "", componentCategory: "Records" },
    ],
  },

  // ==========================================================================
  // 4. Consulting Research (4 Modul)
  // ==========================================================================
  {
    id: "client-research",
    name: "Client Intelligence",
    category: "consulting",
    categoryLabel: "Consulting",
    shortDesc:
      "Dossier latar belakang perusahaan klien, alur discovery pra-penugasan, dan template ringkasan konteks awal klien.",
    to: "/research-foundations-and-reference-frameworks?module=client-research",
    icon: UserSearch,
    badge: "Consulting",
    accentGradient: "from-amber-500 to-orange-600",
    accentBorder: "border-amber-500/30 hover:border-amber-500/60",
    badgeBg: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    badgeText: "Consulting",
    subMenus: [
      { id: "client-background-dossier", label: "Client Background Dossier", to: "", componentCategory: "Records" },
      { id: "client-discovery-workflow", label: "Client Discovery Workflow", to: "", componentCategory: "Workflows" },
      { id: "engagement-brief-template", label: "Engagement Brief Template", to: "", componentCategory: "Templates" },
    ],
  },
  {
    id: "business-diagnosis",
    name: "Business Diagnostics",
    category: "consulting",
    categoryLabel: "Consulting",
    shortDesc:
      "Asesmen kesehatan organisasi lintas fungsi, pemetaan kematangan & hambatan bisnis, serta laporan temuan diagnosis.",
    to: "/research-foundations-and-reference-frameworks?module=business-diagnosis",
    icon: Stethoscope,
    badge: "Consulting",
    accentGradient: "from-orange-500 to-red-600",
    accentBorder: "border-orange-500/30 hover:border-orange-500/60",
    badgeBg: "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/30",
    badgeText: "Consulting",
    subMenus: [
      { id: "diagnostic-assessment-tool", label: "Diagnostic Assessment Tool", to: "", componentCategory: "Tools" },
      { id: "bottleneck-maturity-analytics", label: "Maturity Analytics", to: "", componentCategory: "Analytics" },
      { id: "diagnosis-report-template", label: "Diagnosis Report Template", to: "", componentCategory: "Templates" },
    ],
  },
  {
    id: "feasibility-analysis",
    name: "Feasibility Studies",
    category: "consulting",
    categoryLabel: "Consulting",
    shortDesc:
      "Evaluasi kelayakan multi-aspek proyek (pasar, teknis, finansial, legal), uji sensitivitas asumsi, dan kerangka studi kelayakan.",
    to: "/research-foundations-and-reference-frameworks?module=feasibility-analysis",
    icon: Calculator,
    badge: "Consulting",
    accentGradient: "from-rose-500 to-amber-600",
    accentBorder: "border-rose-500/30 hover:border-rose-500/60",
    badgeBg: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
    badgeText: "Consulting",
    subMenus: [
      { id: "feasibility-scorecard", label: "Feasibility Scorecard", to: "", componentCategory: "Tools" },
      { id: "sensitivity-scenario-analytics", label: "Scenario Analytics", to: "", componentCategory: "Analytics" },
      { id: "feasibility-study-template", label: "Feasibility Study Template", to: "", componentCategory: "Templates" },
    ],
  },
  {
    id: "strategic-research",
    name: "Strategic Research",
    category: "consulting",
    categoryLabel: "Consulting",
    shortDesc:
      "Evaluasi opsi strategis berbasis bukti riset konsultasi, dasbor keterkaitan temuan, dan alur validasi rekomendasi.",
    to: "/research-foundations-and-reference-frameworks?module=strategic-research",
    icon: GitBranch,
    badge: "Consulting",
    accentGradient: "from-yellow-500 to-amber-600",
    accentBorder: "border-yellow-500/30 hover:border-yellow-500/60",
    badgeBg: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border-yellow-500/30",
    badgeText: "Consulting",
    subMenus: [
      { id: "strategic-options-evaluator", label: "Strategic Options Evaluator", to: "", componentCategory: "Tools" },
      { id: "strategic-evidence-dashboard", label: "Strategic Evidence Dashboard", to: "", componentCategory: "Dashboards" },
      { id: "advisory-recommendation-workflow", label: "Advisory Recommendation Workflow", to: "", componentCategory: "Workflows" },
    ],
  },

  // ==========================================================================
  // 5. Knowledge and References (5 Modul: 4 Kept Legacy + 1 New)
  // ==========================================================================
  {
    id: "mba-frameworks",
    name: "Business Frameworks",
    category: "knowledge",
    categoryLabel: "Knowledge",
    shortDesc:
      "Katalog lengkap model strategi keputusan eksekutif: BCG Matrix, Porter 5 Forces, SWOT/TOWS, PESTEL, Ansoff, hingga Value Chain.",
    to: "/100-framework",
    icon: Layers,
    badge: "100 Frameworks",
    accentGradient: "from-blue-500 to-indigo-600",
    accentBorder: "border-blue-500/30 hover:border-blue-500/60",
    badgeBg: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
    badgeText: "Knowledge",
    subMenus: [
      { id: "all-frameworks", label: "Framework Library", to: "/100-framework", inverted: false, componentCategory: "Templates" },
      { id: "bcg-matrix", label: "BCG Matrix", to: "/bcg", inverted: false, componentCategory: "Analytics" },
      { id: "porter-forces", label: "Porter's Five Forces", to: "/porter", inverted: false, componentCategory: "Analytics" },
      { id: "pestel-analysis", label: "PESTEL Analysis", to: "/pestel", inverted: false, componentCategory: "Analytics" },
    ],
  },
  {
    id: "kurasi-pengetahuan",
    name: "Business Knowledge",
    category: "knowledge",
    categoryLabel: "Knowledge",
    shortDesc:
      "Modul kurasi pengetahuan bisnis 10 chapter: Ekonomi, Statistik, Manajemen, Komunikasi, Logistik, Akuntansi, Asuransi, dan Investasi.",
    to: "/kurasi",
    icon: BookOpen,
    badge: "10 Chapter",
    accentGradient: "from-purple-500 to-violet-600",
    accentBorder: "border-purple-500/30 hover:border-purple-500/60",
    badgeBg: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
    badgeText: "Knowledge",
    subMenus: [
      { id: "chapter-1-ekonomi", label: "Economics", to: "/kurasi/ekonomi", inverted: false, componentCategory: "Guides" },
      { id: "chapter-3-manajemen", label: "Management", to: "/kurasi/manajemen", inverted: false, componentCategory: "Guides" },
      { id: "chapter-4-komunikasi", label: "Communication", to: "/kurasi/komunikasi", inverted: false, componentCategory: "Guides" },
    ],
  },
  {
    id: "wiki-corporate-knowledge",
    name: "Knowledge Management",
    category: "knowledge",
    categoryLabel: "Knowledge",
    shortDesc:
      "Repositori Standard Operating Procedure (SOP), dokumentasi pangkalan pengetahuan korporat, dan rujukan klausul Incoterms logistik global.",
    to: "/wiki",
    icon: FileCheck,
    badge: "Knowledge Base",
    accentGradient: "from-amber-500 to-rose-600",
    accentBorder: "border-amber-500/30 hover:border-amber-500/60",
    badgeBg: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    badgeText: "Knowledge",
    subMenus: [
      { id: "wiki-engine", label: "SOP Library", to: "/wiki", inverted: false, componentCategory: "Templates" },
      { id: "knowledge-base", label: "Knowledge Repository", to: "/knowledge-base", inverted: false, componentCategory: "Records" },
      { id: "vault-archive", label: "Vault Archive", to: "/peh/knowledge", inverted: false, componentCategory: "Records" },
      { id: "incoterms", label: "Incoterms Guide", to: "/incoterms", inverted: false, componentCategory: "Guides" },
    ],
  },
  {
    id: "reading-library",
    name: "Reading Resources",
    category: "knowledge",
    categoryLabel: "Knowledge",
    shortDesc:
      "Daftar bacaan terarah literatur ilmiah, buku teks bisnis, jurnal manajemen, serta pengarsipan ringkasan intisari bab bacaan.",
    to: "/reading",
    icon: Book,
    badge: "Library",
    accentGradient: "from-indigo-500 to-sky-600",
    accentBorder: "border-indigo-500/30 hover:border-indigo-500/60",
    badgeBg: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    badgeText: "Knowledge",
    subMenus: [
      { id: "reading-list", label: "Reading List", to: "/reading", inverted: false, componentCategory: "Workflows" },
      { id: "reading-notes", label: "Book Notes", to: "/notes", inverted: false, componentCategory: "Records" },
      { id: "bookmarks", label: "Bookmarks", to: "/bookmarks", inverted: false, componentCategory: "Records" },
    ],
  },
  {
    id: "reference-library",
    name: "Reference Resources",
    category: "knowledge",
    categoryLabel: "Knowledge",
    shortDesc:
      "Pustaka rujukan eksternal, pengumpulan artikel web clipper, registri bibliografi sumber primer, dan pedoman kurasi referensi.",
    to: "/web-clipper",
    icon: Library,
    badge: "Knowledge",
    accentGradient: "from-slate-500 to-indigo-600",
    accentBorder: "border-slate-500/30 hover:border-slate-500/60",
    badgeBg: "bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30",
    badgeText: "Knowledge",
    subMenus: [
      {
        id: "web-clipper",
        label: "Web Clipper",
        to: "/web-clipper",
        inverted: false,
        componentCategory: "Tools",
      },
      { id: "citation-source-registry", label: "Citation Registry", to: "", componentCategory: "Records" },
      { id: "reference-curation-guide", label: "Reference Curation Guide", to: "", componentCategory: "Guides" },
    ],
  },
];

export const RESEARCH_CATEGORY_TABS: {
  id: ResearchCategory;
  label: string;
  count: number;
}[] = [
  { id: "all", label: "Semua", count: RESEARCH_APPS.length },
  {
    id: "markets",
    label: "Markets",
    count: RESEARCH_APPS.filter((a) => a.category === "markets").length,
  },
  {
    id: "academia",
    label: "Academia",
    count: RESEARCH_APPS.filter((a) => a.category === "academia").length,
  },
  {
    id: "intelligence",
    label: "Intelligence",
    count: RESEARCH_APPS.filter((a) => a.category === "intelligence").length,
  },
  {
    id: "consulting",
    label: "Consulting",
    count: RESEARCH_APPS.filter((a) => a.category === "consulting").length,
  },
  {
    id: "knowledge",
    label: "Knowledge",
    count: RESEARCH_APPS.filter((a) => a.category === "knowledge").length,
  },
];

export const RESEARCH_TOTAL_MODULES = RESEARCH_APPS.length;
export const RESEARCH_TOOLS_COUNT = RESEARCH_APPS.reduce(
  (sum, app) => sum + app.subMenus.filter((s) => s.componentCategory === "Tools").length,
  0
);
export const RESEARCH_FEATURES_COUNT = RESEARCH_APPS.reduce(
  (sum, app) => sum + app.subMenus.filter((s) => s.componentCategory !== "Tools").length,
  0
);
export const RESEARCH_TOTAL_BADGE = `${RESEARCH_TOTAL_MODULES} Modul • ${RESEARCH_FEATURES_COUNT} Features • ${RESEARCH_TOOLS_COUNT} Tools`;
syncLauncherPageBadge("mode_research", RESEARCH_TOTAL_BADGE);
export const RESEARCH_SUMMARY_DESC = RESEARCH_CATEGORY_TABS.map(
  (t) => `${t.label} (${t.count})`
).join(" · ");

const LEGACY_RESEARCH_CATEGORY_MAP: Record<string, ResearchCategory> = {
  "business-research": "markets",
  "academic-research": "academia",
  "business-intelligence": "intelligence",
  "consulting-research": "consulting",
  "knowledge-references": "knowledge",
};

function normalizeResearchCategory(raw?: string | null): ResearchCategory {
  if (!raw) return "all";
  const key = raw.trim().toLowerCase();
  if (
    key === "all" ||
    key === "markets" ||
    key === "academia" ||
    key === "intelligence" ||
    key === "consulting" ||
    key === "knowledge"
  ) {
    return key;
  }
  return LEGACY_RESEARCH_CATEGORY_MAP[key] ?? "all";
}

export function ResearchFrameworksPage({
  isEmbedded: _isEmbedded = false,
}: {
  isEmbedded?: boolean;
} = {}) {
  const [selectedCategory, setSelectedCategory] = useState<ResearchCategory>(() => {
    if (typeof window !== "undefined") {
      try {
        const params = new URLSearchParams(window.location.search);
        const cat = params.get("category") || params.get("pill");
        if (cat) return normalizeResearchCategory(cat);
      } catch {}
    }
    return "all";
  });
  const [searchQuery, setSearchQuery] = useState("");
  const { isFavorite, toggleFavorite } = useFavorites();
  const pageId = useCurrentLauncherPage("mode_research") || "mode_research";
  const { getPageCountDelta, getCardsMovedIntoPage } = useCardPageMover();
  const { pinnedList } = usePinnedCards(pageId);

  const filteredApps = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = RESEARCH_APPS.filter((app) => {
      const matchCategory =
        selectedCategory === "all" || app.category === selectedCategory;
      const matchSearch =
        q === "" ||
        app.name.toLowerCase().includes(q) ||
        app.shortDesc.toLowerCase().includes(q) ||
        app.categoryLabel.toLowerCase().includes(q) ||
        app.badge.toLowerCase().includes(q) ||
        app.subMenus.some((sub) =>
          sub.label.toLowerCase().includes(q)
        );
      return matchCategory && matchSearch;
    });
    return sortCardsWithPinned(list, (app) => app.to || app.name, pinnedList);
  }, [selectedCategory, searchQuery, pinnedList]);

  return (
    <LauncherPageProvider pageId={pageId}>
    <div className="w-full flex-1 flex flex-col font-sans pb-16">
      <ShellHeader>
        <HeaderNavPills
          items={adjustCategoryTabsCount(RESEARCH_CATEGORY_TABS, getPageCountDelta(pageId))}
          activeId={selectedCategory}
          onSelect={(id) => setSelectedCategory(id as ResearchCategory)}
        />
      </ShellHeader>

      <div className="w-full mx-auto pt-3 sm:pt-4 space-y-3 sm:space-y-4">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground/90 tracking-tight flex items-center justify-center gap-2.5">
            <span>Research Foundations <span className="font-normal">and</span> Reference Frameworks</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5 sm:gap-5">
          {filteredApps.map((app) => (
            <MBACard
              key={app.id}
              title={app.name}
              to={app.to}
              icon={app.icon}
              badge={app.badgeText}
              shortDesc={app.shortDesc}
              accentGradient={app.accentGradient}
              categoryGroups={buildModuleCategoryGroups(app.subMenus, app.to)}
              features={app.subMenus.map((sub) => ({
                title: sub.label,
                to: sub.to ?? app.to,
                inverted: sub.inverted,
              }))}
              isFav={isFavorite(app.to)}
              toggleFavorite={toggleFavorite}
            />
          ))}
          {selectedCategory === "all" && (
            <MovedCardsGridItems pageId={pageId} searchQuery={searchQuery} />
          )}
        </div>

        {filteredApps.length === 0 &&
          (selectedCategory !== "all" || getCardsMovedIntoPage(pageId).length === 0) && (
          <div className="text-center py-16 rounded-3xl border border-dashed border-border p-8 bg-card/40">
            <Search className="size-8 text-muted-foreground mx-auto mb-3 opacity-60" />
            <h3 className="text-base font-semibold text-foreground">
              Tidak ada modul riset ditemukan
            </h3>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-xl text-xs font-semibold transition-colors"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </div>
    </LauncherPageProvider>
  );
}
