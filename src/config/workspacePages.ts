/**
 * SINGLE SOURCE OF TRUTH — WORKSPACE PAGES TAXONOMY
 *
 * Defines the 10 Master Workspaces + Phase Side pages, their modules,
 * and individual features/tools for the sidebar pillars navigation and launcher.
 * Extracted from SidebarPillarsMenu.tsx in Fase 3 refactoring.
 */

import {
  Coins,
  Store,
  Briefcase,
  Palette,
  GraduationCap,
  Scale,
  Heart,
  Home,
  Landmark,
  Users,
  ShieldCheck,
  Wallet,
  Building,
  TrendingUp,
  BookOpen,
  DollarSign,
  Receipt,
  ShoppingCart,
  Grid2X2,
  Package,
  MessagesSquare,
  Clock,
  LineChart,
  Target,
  CheckCircle2,
  FolderKanban,
  ShieldAlert,
  LayoutGrid,
  Film,
  PenTool,
  Activity,
  Camera,
  Code,
  Compass,
  NotebookText,
  HeartHandshake,
  FileCheck,
  Flame,
  Dumbbell,
  Key,
  GitFork,
  Utensils,
  Car,
  CalendarDays,
  Star,
  CheckSquare,
  HeartPulse,
  Banknote,
  Network,
  Lightbulb,
  PieChart,
  Layers,
  Gift,
  Calculator,
  Sparkles,
  Workflow,
  Eye,
  type LucideIcon,
} from "lucide-react";
import { STANDALONE_FINANCIAL_APPS } from "@/features/launcher/FinancialWealthSection";

export interface WorkspaceFeatureItem {
  title: string;
  to: string;
  icon: LucideIcon;
  desc?: string;
}

export interface WorkspaceModuleItem {
  id: string;
  title: string;
  to: string;
  icon: LucideIcon;
  desc?: string;
  badge?: string;
  categoryLabel?: string;
  features?: WorkspaceFeatureItem[];
}

export interface WorkspacePageDef {
  id: string;
  modeId: string;
  label: string;
  badge: string;
  desc: string;
  icon: LucideIcon;
  modules: WorkspaceModuleItem[];
}

// 1. Modul Persis dari Launcher Financial Wealth Management (25 Modul Terstruktur)
const FINANCIAL_MODULES: WorkspaceModuleItem[] = STANDALONE_FINANCIAL_APPS.map((app) => ({
  id: app.id,
  title: app.title,
  to: app.to,
  icon: app.icon,
  desc: app.subtitle,
  categoryLabel: app.categoryLabel,
  features: app.features?.map((f) => ({
    title: f.title,
    to: f.to,
    icon: f.icon,
    desc: f.desc,
  })) || [],
}));

export const WORKSPACE_PAGES: WorkspacePageDef[] = [
  {
    id: "financial",
    modeId: "financial",
    label: "Financial Planning and Wealth Management",
    badge: "25 Modul • 80 Features • 10 Tools",
    desc: "Semua (25) · Surety (5) · Flow (5) · Build (5) · Grow (5) · Legacy (5)",
    icon: Coins,
    modules: FINANCIAL_MODULES,
  },
  {
    id: "mode_business",
    modeId: "business",
    label: "Business Administration and Operations Management",
    badge: "33 Modul • 44 Features • 100 Tools",
    desc: "Operations (3) · Customers (3) · Administration (3) · Strategy (2) · Organization (2)",
    icon: Store,
    modules: [
      // 1. Operations (3)
      {
        id: "biz-procurement",
        title: "Procurement",
        to: "/peh/vendors",
        icon: Building,
        categoryLabel: "Operations",
        desc: "Direktori penyedia jasa dan persetujuan pengadaan purchase orders (PO)",
        features: [
          { title: "Vendor Directory", to: "/peh/vendors", icon: Building },
          { title: "Purchase Orders", to: "/peh/procurement", icon: DollarSign },
        ],
      },
      {
        id: "biz-inventory",
        title: "Inventory Management",
        to: "/katalog-produk",
        icon: Package,
        categoryLabel: "Operations",
        desc: "Katalog penawaran produk terstruktur dan pengendalian inventaris stok",
        features: [
          { title: "Product Catalog", to: "/katalog-produk", icon: Package },
          { title: "Inventory Tracker", to: "/inventory", icon: Package },
          { title: "Batch Tracking", to: "/lainnya?app=batch-track", icon: ShieldCheck },
          { title: "Cold Chain Logistics", to: "/lainnya?app=cold-chain", icon: Clock },
        ],
      },
      {
        id: "biz-quality",
        title: "Quality Management",
        to: "/lainnya?app=quality-check",
        icon: ShieldCheck,
        categoryLabel: "Operations",
        desc: "Pemeriksaan kendali mutu operasional dan meja penanganan masalah",
        features: [
          { title: "Quality Check", to: "/lainnya?app=quality-check", icon: ShieldCheck },
          { title: "Incident Log", to: "/peh/incidents", icon: ShieldAlert },
          { title: "SOP Guidelines", to: "/knowledge-base", icon: BookOpen },
        ],
      },
      // 2. Customers (3)
      {
        id: "biz-client",
        title: "Client Management",
        to: "/klien",
        icon: Briefcase,
        categoryLabel: "Customers",
        desc: "Pengelolaan relasi akun bisnis B2B dan pipeline penjualan",
        features: [
          { title: "Client Directory", to: "/klien", icon: Briefcase },
          { title: "CRM Sales Pipeline", to: "/klien?tab=pipeline", icon: TrendingUp },
          { title: "Sales Leads", to: "/klien?tab=leads", icon: Target },
        ],
      },
      {
        id: "biz-customer",
        title: "Customer Relations",
        to: "/portal",
        icon: MessagesSquare,
        categoryLabel: "Customers",
        desc: "Layanan purnajual, tiket bantuan pembeli, dan direktori pelanggan",
        features: [
          { title: "Support Tickets", to: "/portal", icon: MessagesSquare },
          { title: "Contact Directory", to: "/people-manager", icon: Users },
        ],
      },
      {
        id: "biz-service",
        title: "Service Management",
        to: "/lainnya?app=queue-line",
        icon: Clock,
        categoryLabel: "Customers",
        desc: "Antrean pelayanan pelanggan dan kalender reservasi waktu",
        features: [
          { title: "Queue & Waitlist", to: "/lainnya?app=queue-line", icon: Clock },
          { title: "Schedule Appointments", to: "/schedule-manager", icon: CalendarDays },
        ],
      },
      // 3. Administration (3)
      {
        id: "biz-expenses",
        title: "Expenses and Assets",
        to: "/expense-tracker",
        icon: Receipt,
        categoryLabel: "Administration",
        desc: "Pencatatan pengeluaran operasional dan inventaris aset berharga",
        features: [
          { title: "Expense Tracker", to: "/expense-tracker", icon: Receipt },
          { title: "Asset Tracker", to: "/asset-manager", icon: Building },
        ],
      },
      {
        id: "biz-documents",
        title: "Document Management",
        to: "/lainnya?app=mailroom",
        icon: FileCheck,
        categoryLabel: "Administration",
        desc: "Agenda surat-menyurat korporat dan pustaka template dokumen kerja",
        features: [
          { title: "Correspondence Log", to: "/lainnya?app=mailroom", icon: FileCheck },
          { title: "Document Templates", to: "/lainnya?app=templates", icon: BookOpen },
        ],
      },
      {
        id: "biz-analytics",
        title: "Data Management",
        to: "/statistics",
        icon: LineChart,
        categoryLabel: "Administration",
        desc: "Pemantauan analitik bisnis dan metrik kesehatan perusahaan",
        features: [
          { title: "Business Intelligence", to: "/statistics", icon: LineChart },
          { title: "Company Health", to: "/financial-health", icon: HeartPulse },
        ],
      },
      // 4. Strategy (2)
      {
        id: "biz-performance",
        title: "Performance Management",
        to: "/goal-manager",
        icon: Target,
        categoryLabel: "Strategy",
        desc: "Penyelarasan sasaran strategis perusahaan OKR/KPI dan evaluasi berkala",
        features: [
          { title: "Goal Manager OKR", to: "/goal-manager", icon: Target },
          { title: "Performance Review", to: "/lainnya?app=retro", icon: CheckCircle2 },
        ],
      },
      {
        id: "biz-framework",
        title: "8 Pilar Strategis & 100 MBA Tools",
        to: "/100-framework",
        icon: Grid2X2,
        categoryLabel: "Strategy",
        desc: "100 instrumen strategis terapan bisnis eksekutif",
        features: [
          { title: "100 Strategic Frameworks", to: "/100-framework", icon: Grid2X2 },
          { title: "Valuasi Bisnis MAPPI", to: "/valuasi", icon: Landmark },
        ],
      },
      // 5. Organization (2)
      {
        id: "biz-workforce",
        title: "Workforce Management",
        to: "/lainnya?app=time-clock",
        icon: Clock,
        categoryLabel: "Organization",
        desc: "Pencatatan kehadiran jam kerja tim, shift kerja, dan kapasitas beban",
        features: [
          { title: "Time Clock", to: "/lainnya?app=time-clock", icon: Clock },
          { title: "Handover Notes", to: "/lainnya?app=handover-notes", icon: BookOpen },
        ],
      },
      {
        id: "biz-governance",
        title: "Corporate Governance",
        to: "/peh/compliance",
        icon: ShieldCheck,
        categoryLabel: "Organization",
        desc: "Pemantauan kepatuhan regulasi hukum dan administrasi struktur saham",
        features: [
          { title: "Kepatuhan Regulasi", to: "/peh/compliance", icon: ShieldCheck },
          { title: "Shareholder Structure", to: "/peh/cap-table", icon: LayoutGrid },
        ],
      },
    ],
  },
  {
    id: "mode_employment",
    modeId: "employment",
    label: "Productivity Workspace and Workflow Systems",
    badge: "9 Modul",
    desc: "Perencanaan alur kerja, pengiriman proyek, vendor, kepatuhan, dan ekuitas",
    icon: Briefcase,
    modules: [
      {
        id: "emp-milestones",
        title: "Goals & Milestones",
        to: "/peh/milestones",
        icon: Target,
        categoryLabel: "Planning",
        desc: "Target capaian kuartalan dan milestone prioritas tim",
        features: [
          { title: "Active Milestones", to: "/peh/milestones", icon: Target },
          { title: "Target Roadmap", to: "/goal-manager", icon: TrendingUp },
        ],
      },
      {
        id: "emp-workflows",
        title: "Workflow & Delivery Pipeline",
        to: "/peh/workflows",
        icon: CheckCircle2,
        categoryLabel: "Workflow",
        desc: "Siklus alur kerja kanban dan penugasan deliverables",
        features: [
          { title: "Kanban Pipeline", to: "/peh/workflows", icon: CheckCircle2 },
          { title: "Delivery Tasks", to: "/task-manager", icon: CheckSquare },
        ],
      },
      {
        id: "emp-projects",
        title: "Content Production Pipeline",
        to: "/peh/projects",
        icon: FolderKanban,
        categoryLabel: "Workflow",
        desc: "Manajemen proyek editorial dan jadwal publikasi karya",
        features: [
          { title: "Production Projects", to: "/peh/projects", icon: FolderKanban },
          { title: "Publishing Calendar", to: "/schedule-manager", icon: CalendarDays },
        ],
      },
      {
        id: "emp-vendors",
        title: "Vendor & Service Management",
        to: "/peh/vendors",
        icon: Building,
        categoryLabel: "Resources",
        desc: "Daftar vendor eksternal, SLA kerja sama, dan review kinerja",
        features: [
          { title: "Vendor Directory", to: "/peh/vendors", icon: Building },
          { title: "SLA Evaluation", to: "/resource-manager", icon: ShieldCheck },
        ],
      },
      {
        id: "emp-procurement",
        title: "Procurement & Purchase Orders",
        to: "/peh/procurement",
        icon: DollarSign,
        categoryLabel: "Resources",
        desc: "Persetujuan anggaran pengadaan dan pesanan pembelian",
        features: [
          { title: "Purchase Orders", to: "/peh/procurement", icon: DollarSign },
          { title: "Approval Requests", to: "/approval-manager", icon: ShieldCheck },
        ],
      },
      {
        id: "emp-meetings",
        title: "Meetings & Decision Log",
        to: "/peh/meetings",
        icon: CheckSquare,
        categoryLabel: "Coordination",
        desc: "Notula rapat, action item terukur, dan log keputusan organisasi",
        features: [
          { title: "Meeting Minutes", to: "/peh/meetings", icon: CheckSquare },
          { title: "Decision Registry", to: "/decision-log", icon: BookOpen },
        ],
      },
      {
        id: "emp-incidents",
        title: "Issues & Incident Management",
        to: "/peh/incidents",
        icon: ShieldAlert,
        categoryLabel: "Governance",
        desc: "Mitigasi kendala operasional dan eskalasi penanganan insiden",
        features: [
          { title: "Issue Log", to: "/peh/incidents", icon: ShieldAlert },
          { title: "Risk Mitigation", to: "/risk-management", icon: ShieldCheck },
        ],
      },
      {
        id: "emp-compliance",
        title: "Compliance & Regulatory Audit",
        to: "/peh/compliance",
        icon: ShieldCheck,
        categoryLabel: "Governance",
        desc: "Pemeriksaan kepatuhan SOP dan audit kepatuhan legalitas",
        features: [
          { title: "Compliance Check", to: "/peh/compliance", icon: ShieldCheck },
          { title: "Audit Trail", to: "/audit-log", icon: FileCheck },
        ],
      },
      {
        id: "emp-captable",
        title: "Equity & Cap Table",
        to: "/peh/cap-table",
        icon: LayoutGrid,
        categoryLabel: "Ownership",
        desc: "Struktur kepemilikan saham, vesting pendiri, dan modal",
        features: [
          { title: "Cap Table Matrix", to: "/peh/cap-table", icon: LayoutGrid },
          { title: "Shareholders", to: "/shareholder-registry", icon: Users },
        ],
      },
    ],
  },
  {
    id: "mode_creative",
    modeId: "creative",
    label: "Creative Workspace and Media Production",
    badge: "6 Modul",
    desc: "Design (1) · Publishing (1) · Production (3) · Interactive (1)",
    icon: Palette,
    modules: [
      {
        id: "cr-design",
        title: "Design Management",
        to: "/design",
        icon: Palette,
        categoryLabel: "Design",
        desc: "Manajemen aset grafis, brand identity, dan visual asset",
        features: [
          { title: "Brand Assets", to: "/design", icon: Palette },
          { title: "Design Guidelines", to: "/design?tab=guidelines", icon: BookOpen },
        ],
      },
      {
        id: "cr-writing",
        title: "Writing and Publishing",
        to: "/writing",
        icon: PenTool,
        categoryLabel: "Publishing",
        desc: "Penyusunan naskah, artikel, dan penerbitan editorial",
        features: [
          { title: "Manuscript Editor", to: "/writing", icon: PenTool },
          { title: "Editorial Pipeline", to: "/writing?tab=pipeline", icon: BookOpen },
        ],
      },
      {
        id: "cr-movies",
        title: "Video Production",
        to: "/movies",
        icon: Film,
        categoryLabel: "Production",
        desc: "Storyboard, jadwal syuting, dan workflow pascaproduksi video",
        features: [
          { title: "Video Projects", to: "/movies", icon: Film },
          { title: "Storyboards", to: "/movies?tab=storyboard", icon: Layers },
        ],
      },
      {
        id: "cr-podcasts",
        title: "Audio & Podcast Production",
        to: "/podcasts",
        icon: Activity,
        categoryLabel: "Production",
        desc: "Produksi siniar audio, mixing track, dan rilis episode",
        features: [
          { title: "Podcast Episodes", to: "/podcasts", icon: Activity },
          { title: "Audio Assets", to: "/podcasts?tab=audio", icon: SparklesIcon() },
        ],
      },
      {
        id: "cr-photo",
        title: "Photography and Media",
        to: "/photography",
        icon: Camera,
        categoryLabel: "Production",
        desc: "Katalog foto, pemotretan produk, dan kurasi visual portofolio",
        features: [
          { title: "Photo Shoots", to: "/photography", icon: Camera },
          { title: "Media Library", to: "/photography?tab=library", icon: FolderKanban },
        ],
      },
      {
        id: "cr-games",
        title: "Interactive Media & Games",
        to: "/games",
        icon: Code,
        categoryLabel: "Interactive",
        desc: "Pengembangan media interaktif, game ringan, dan game logic",
        features: [
          { title: "Interactive Canvas", to: "/games", icon: Code },
          { title: "Game Engine Assets", to: "/games?tab=assets", icon: Layers },
        ],
      },
    ],
  },
  {
    id: "mode_research",
    modeId: "research",
    label: "Research Foundations and Reference Frameworks",
    badge: "6 Modul",
    desc: "Frameworks (2) · Reference (2) · Research (2)",
    icon: GraduationCap,
    modules: [
      {
        id: "res-frameworks",
        title: "100 Strategic Frameworks",
        to: "/100-framework",
        icon: Grid2X2,
        categoryLabel: "Frameworks",
        desc: "Kompilasi model analisis strategi bisnis kelas dunia",
        features: [
          { title: "Strategy Matrix", to: "/100-framework", icon: Grid2X2 },
          { title: "Framework Library", to: "/100-framework?tab=library", icon: BookOpen },
        ],
      },
      {
        id: "res-valuation",
        title: "Business Valuation & MAPPI",
        to: "/valuasi",
        icon: Building,
        categoryLabel: "Frameworks",
        desc: "Metodologi valuasi bisnis, DCF, dan standar penilai aset",
        features: [
          { title: "Valuasi MAPPI", to: "/valuasi", icon: Building },
          { title: "DCF Calculator", to: "/valuasi?tab=dcf", icon: Calculator },
        ],
      },
      {
        id: "res-kurasi",
        title: "Kurasi Pengetahuan Bisnis",
        to: "/kurasi/bisnis",
        icon: BookOpen,
        categoryLabel: "Reference",
        desc: "Rangkuman buku bisnis esensial dan studi kasus terapan",
        features: [
          { title: "Business Summaries", to: "/kurasi/bisnis", icon: BookOpen },
          { title: "Executive Highlights", to: "/kurasi/bisnis?tab=highlights", icon: BookmarkIcon() },
        ],
      },
      {
        id: "res-wiki",
        title: "Knowledge Base & Wiki",
        to: "/knowledge-base",
        icon: NotebookText,
        categoryLabel: "Reference",
        desc: "Dokumentasi standar organisasi, SOP, dan panduan kerja",
        features: [
          { title: "Organization Wiki", to: "/knowledge-base", icon: NotebookText },
          { title: "SOP Handbook", to: "/knowledge-base?tab=sop", icon: FileCheck },
        ],
      },
      {
        id: "res-manager",
        title: "Research Intelligence",
        to: "/research-manager",
        icon: Compass,
        categoryLabel: "Research",
        desc: "Pelacakan data pasar, wawasan kompetitor, dan hipotesis",
        features: [
          { title: "Market Intelligence", to: "/research-manager", icon: Compass },
          { title: "Competitor Analysis", to: "/research-manager?tab=competitor", icon: Target },
        ],
      },
      {
        id: "res-courses",
        title: "Academic Studies & Credentials",
        to: "/courses",
        icon: GraduationCap,
        categoryLabel: "Research",
        desc: "Pencatatan materi pelatihan, kursus, dan sertifikasi keahlian",
        features: [
          { title: "Course Catalog", to: "/courses", icon: GraduationCap },
          { title: "Certificates", to: "/courses?tab=certs", icon: AwardIcon() },
        ],
      },
    ],
  },
  {
    id: "mode_sharia",
    modeId: "sharia",
    label: "Islamic Principles and Sharia Values",
    badge: "16 Modul",
    desc: "Akad syariah komersial & sosial, zakat, kepatuhan anti-riba, dan instrumen halal",
    icon: Scale,
    modules: [
      {
        id: "sh-tabarru",
        title: "Tabarru' & Hibah Manager",
        to: "/syariah/akad?app=tabarru",
        icon: HeartHandshake,
        categoryLabel: "Sosial",
        desc: "Akad tolong-menolong sosial, donasi sukarela, dan proteksi musibah",
        features: [
          { title: "Dana Tabarru'", to: "/syariah/akad?app=tabarru", icon: HeartHandshake },
          { title: "Santunan Sosial", to: "/syariah/akad?app=tabarru&tab=santunan", icon: ShieldCheck },
        ],
      },
      {
        id: "sh-mudharabah",
        title: "Mudharabah Bagi Hasil Usaha",
        to: "/syariah/akad?app=mudharabah",
        icon: TrendingUp,
        categoryLabel: "Komersial",
        desc: "Kemitraan bagi hasil pemodal dan pengelola dengan nisbah transparan",
        features: [
          { title: "Nisbah Bagi Hasil", to: "/syariah/akad?app=mudharabah", icon: TrendingUp },
          { title: "Kalkulator Profit", to: "/syariah/akad?app=mudharabah&tab=calc", icon: Calculator },
        ],
      },
      {
        id: "sh-musyarakah",
        title: "Musyarakah & Kemitraan",
        to: "/syariah/akad?app=musyarakah",
        icon: Users,
        categoryLabel: "Komersial",
        desc: "Penyertaan modal bersama dan pembagian laba proporsional",
        features: [
          { title: "Modal Musyarakah", to: "/syariah/akad?app=musyarakah", icon: Users },
          { title: "Bagi Laba Rugi", to: "/syariah/akad?app=musyarakah&tab=ratio", icon: PieChart },
        ],
      },
      {
        id: "sh-murabahah",
        title: "Murabahah & Margin Transparan",
        to: "/syariah/akad?app=murabahah",
        icon: Receipt,
        categoryLabel: "Komersial",
        desc: "Jual beli dengan penetapan margin keuntungan dan tenor cicilan",
        features: [
          { title: "Akad Jual Beli", to: "/syariah/akad?app=murabahah", icon: Receipt },
          { title: "Skema Cicilan", to: "/syariah/akad?app=murabahah&tab=installments", icon: Banknote },
        ],
      },
      {
        id: "sh-ijarah",
        title: "Ijarah & Sewa Jasa (IMBT)",
        to: "/syariah/akad?app=ijarah",
        icon: FileCheck,
        categoryLabel: "Komersial",
        desc: "Penyewaan aset manfaat dan sewa beli kepemilikan bertahap",
        features: [
          { title: "Sewa Ijarah", to: "/syariah/akad?app=ijarah", icon: FileCheck },
          { title: "Peralihan Hak IMBT", to: "/syariah/akad?app=ijarah&tab=imbt", icon: Building },
        ],
      },
      {
        id: "sh-zakat-maal",
        title: "Zakat Maal & Portofolio",
        to: "/zakat?app=maal",
        icon: Coins,
        categoryLabel: "Zakat",
        desc: "Kalkulator hisab zakat harta simpanan, emas, dan efek investasi",
        features: [
          { title: "Hisab Zakat Emas", to: "/zakat?app=maal", icon: Coins },
          { title: "Zakat Investasi", to: "/zakat?app=maal&tab=portofolio", icon: LineChart },
        ],
      },
      {
        id: "sh-zakat-profesi",
        title: "Zakat Profesi & Penghasilan",
        to: "/zakat?app=profesi",
        icon: Wallet,
        categoryLabel: "Zakat",
        desc: "Perhitungan zakat pendapatan bulanan sesuai nishab beras/emas",
        features: [
          { title: "Zakat Gaji Bulanan", to: "/zakat?app=profesi", icon: Wallet },
          { title: "Pengurang Biaya Hidup", to: "/zakat?app=profesi&tab=deductions", icon: Calculator },
        ],
      },
      {
        id: "sh-audit-riba",
        title: "Audit Bebas Riba & Gharar",
        to: "/syariah/terlarang?app=riba",
        icon: ShieldAlert,
        categoryLabel: "Kepatuhan",
        desc: "Pemeriksaan akad transaksi dari unsur bunga, judi, dan ketidakjelasan",
        features: [
          { title: "Riba Screening", to: "/syariah/terlarang?app=riba", icon: ShieldAlert },
          { title: "Gharar Checklist", to: "/syariah/terlarang?app=riba&tab=gharar", icon: ShieldCheck },
        ],
      },
      {
        id: "sh-saham",
        title: "Saham Syariah & Pasar Halal",
        to: "/100-komoditas?tab=syariah",
        icon: ShieldCheck,
        categoryLabel: "Investasi",
        desc: "Daftar efek syariah (DES) dan instrumen komoditas halal fisik",
        features: [
          { title: "Daftar Efek Syariah", to: "/100-komoditas?tab=syariah", icon: ShieldCheck },
          { title: "Pasar Komoditas Halal", to: "/100-komoditas", icon: Package },
        ],
      },
    ],
  },
  {
    id: "mode_personal",
    modeId: "personal",
    label: "Personal Life Management",
    badge: "5 Modul",
    desc: "Pengembangan (1) · Refleksi (1) · Kesehatan (2) · Utilitas (1)",
    icon: Heart,
    modules: [
      {
        id: "per-habits",
        title: "Personal Development & Habits",
        to: "/habit-tracker",
        icon: Flame,
        categoryLabel: "Pengembangan",
        desc: "Pencatatan konsistensi kebiasaan harian dan streak produktivitas",
        features: [
          { title: "Habit Tracker", to: "/habit-tracker", icon: Flame },
          { title: "Streak Analytics", to: "/habit-tracker?tab=analytics", icon: LineChart },
        ],
      },
      {
        id: "per-journal",
        title: "Personal Journaling & Mood",
        to: "/journal",
        icon: BookOpen,
        categoryLabel: "Refleksi",
        desc: "Ruang refleksi privat, catatan harian, dan pemetaan emosi",
        features: [
          { title: "Daily Journal", to: "/journal", icon: BookOpen },
          { title: "Mood Map", to: "/journal?tab=mood", icon: Activity },
        ],
      },
      {
        id: "per-health-fit",
        title: "Health and Fitness",
        to: "/health?tab=workouts",
        icon: Dumbbell,
        categoryLabel: "Kesehatan",
        desc: "Log aktivitas olahraga, kebugaran fisik, dan estimasi kalori",
        features: [
          { title: "Workouts Log", to: "/health?tab=workouts", icon: Dumbbell },
          { title: "Calorie Tracker", to: "/health?tab=calories", icon: Flame },
        ],
      },
      {
        id: "per-health-rec",
        title: "Health & Medical Records",
        to: "/health",
        icon: HeartPulse,
        categoryLabel: "Kesehatan",
        desc: "Kartu golongan darah, profil alergi, tensi darah, dan resep",
        features: [
          { title: "Medical History", to: "/health", icon: HeartPulse },
          { title: "Doctor Consultations", to: "/life/doctor-consultation", icon: ShieldCheck },
        ],
      },
      {
        id: "per-tools",
        title: "Personal Tools & Vault",
        to: "/passwords",
        icon: Key,
        categoryLabel: "Utilitas",
        desc: "Penyimpanan kredensial akun aman dan generator sandi",
        features: [
          { title: "Password Vault", to: "/passwords", icon: Key },
          { title: "Web Clipper", to: "/web-clipper", icon: BookmarkIcon() },
        ],
      },
    ],
  },
  {
    id: "mode_family",
    modeId: "family",
    label: "Family Records and Household Planning",
    badge: "6 Modul",
    desc: "Keluarga (2) · Rumah Tangga (3) · Kendaraan (1)",
    icon: Home,
    modules: [
      {
        id: "fam-tree",
        title: "Family Heritage & Tree",
        to: "/peh/family-tree",
        icon: GitFork,
        categoryLabel: "Keluarga",
        desc: "Pohon silsilah keluarga besar dan direktori anggota kerabat trah",
        features: [
          { title: "Family Tree", to: "/peh/family-tree", icon: GitFork },
          { title: "Kinship Directory", to: "/peh/family-tree?tab=directory", icon: Users },
        ],
      },
      {
        id: "fam-safety",
        title: "Family Safety & Emergency",
        to: "/lainnya?app=emergency-hub",
        icon: ShieldAlert,
        categoryLabel: "Keluarga",
        desc: "Protokol keselamatan hunian darurat dan kontak darurat keluarga",
        features: [
          { title: "Emergency Hub", to: "/lainnya?app=emergency-hub", icon: ShieldAlert },
          { title: "Safety Protocol", to: "/lainnya?app=emergency-hub?tab=protocol", icon: ShieldCheck },
        ],
      },
      {
        id: "fam-budget",
        title: "Household Finance & Budget",
        to: "/peh/family-budget",
        icon: Wallet,
        categoryLabel: "Rumah Tangga",
        desc: "Pos pengeluaran belanja bulanan, tagihan listrik, air, dan internet",
        features: [
          { title: "Household Budget", to: "/peh/family-budget", icon: Wallet },
          { title: "Utility Bills", to: "/peh/budget", icon: Receipt },
        ],
      },
      {
        id: "fam-chores",
        title: "Household Chores & Maintenance",
        to: "/peh/chores",
        icon: CheckSquare,
        categoryLabel: "Rumah Tangga",
        desc: "Jadwal tugas rumah tangga dan pemeliharaan alat elektronik",
        features: [
          { title: "Chores Schedule", to: "/peh/chores", icon: CheckSquare },
          { title: "Household Inventory", to: "/life/household-tracker", icon: Home },
        ],
      },
      {
        id: "fam-pantry",
        title: "Kitchen & Pantry Management",
        to: "/peh/pantry",
        icon: Utensils,
        categoryLabel: "Rumah Tangga",
        desc: "Daftar stok bahan sembako, keranjang belanja, dan resep masakan",
        features: [
          { title: "Pantry Inventory", to: "/peh/pantry", icon: Utensils },
          { title: "Grocery List", to: "/life/grocery-list", icon: ShoppingCart },
          { title: "Family Recipes", to: "/peh/family-recipes", icon: BookOpen },
        ],
      },
      {
        id: "fam-vehicles",
        title: "Vehicle Records & Service",
        to: "/peh/vehicles",
        icon: Car,
        categoryLabel: "Kendaraan",
        desc: "Log servis berkala kendaraan, ganti oli, dan perpanjangan pajak",
        features: [
          { title: "Service History", to: "/peh/vehicles", icon: Car },
          { title: "Tax & Insurance", to: "/peh/vehicles?tab=tax", icon: ShieldCheck },
        ],
      },
    ],
  },
  {
    id: "mode_public_affairs",
    modeId: "public_affairs",
    label: "Public Affairs and Relations",
    badge: "6 Modul",
    desc: "Community (2) · Public Services (1) · Policy (2) · Media (1)",
    icon: Landmark,
    modules: [
      {
        id: "pub-community",
        title: "Komunitas Warga & RT/RW",
        to: "/komunitas-warga",
        icon: Building,
        categoryLabel: "Community",
        desc: "Agenda lingkungan warga, iuran rukun tetangga, dan ronda malam",
        features: [
          { title: "Agenda Warga", to: "/komunitas-warga", icon: Building },
          { title: "Iuran & Kas RT", to: "/komunitas-warga?tab=iuran", icon: Wallet },
        ],
      },
      {
        id: "pub-services",
        title: "Layanan Publik & Tata Kelola",
        to: "/lainnya?app=public-services-guide",
        icon: Compass,
        categoryLabel: "Public Services",
        desc: "Panduan pengurusan dokumen kependudukan dan instansi dinas",
        features: [
          { title: "Services Guide", to: "/lainnya?app=public-services-guide", icon: Compass },
          { title: "Civil Docs Checklist", to: "/lainnya?app=public-services-guide?tab=docs", icon: FileCheck },
        ],
      },
      {
        id: "pub-calendar",
        title: "Agenda Musyawarah Publik",
        to: "/lainnya?app=civic-calendar",
        icon: CalendarDays,
        categoryLabel: "Community",
        desc: "Jadwal rapat musyawarah warga dan forum dialog publik",
        features: [
          { title: "Civic Calendar", to: "/lainnya?app=civic-calendar", icon: CalendarDays },
          { title: "Townhall Minutes", to: "/lainnya?app=civic-calendar?tab=minutes", icon: BookOpen },
        ],
      },
      {
        id: "pub-advocacy",
        title: "Advokasi Kebijakan & Regulasi",
        to: "/peh/advocacy",
        icon: ShieldAlert,
        categoryLabel: "Policy",
        desc: "Penyusunan usulan kebijakan publik dan tanggapan hukum",
        features: [
          { title: "Policy Proposals", to: "/peh/advocacy", icon: ShieldAlert },
          { title: "Legal Review", to: "/peh/advocacy?tab=legal", icon: Scale },
        ],
      },
      {
        id: "pub-media",
        title: "Humas & Hubungan Media",
        to: "/peh/media",
        icon: MessagesSquare,
        categoryLabel: "Media",
        desc: "Pemberitaan pers, siaran pers resmi, dan kontak jurnalis",
        features: [
          { title: "Press Releases", to: "/peh/media", icon: MessagesSquare },
          { title: "Journalist Contacts", to: "/peh/media?tab=contacts", icon: Users },
        ],
      },
      {
        id: "pub-philanthropy",
        title: "Zakat, Filantropi & Dampak",
        to: "/zakat",
        icon: Wallet,
        categoryLabel: "Policy",
        desc: "Penyaluran dana kebajikan umum, infaq, dan dampak kemanusiaan",
        features: [
          { title: "Philanthropy Hub", to: "/zakat", icon: Wallet },
          { title: "Impact Reports", to: "/zakat?tab=impact", icon: LineChart },
        ],
      },
    ],
  },
  {
    id: "mode_networks",
    modeId: "networks",
    label: "Contact Directory and Social Networks",
    badge: "6 Modul",
    desc: "Direktori kontak, jejaring profesional, relasi pertemanan, komunitas, dan perayaan",
    icon: Users,
    modules: [
      {
        id: "net-people",
        title: "People Directory",
        to: "/people-manager",
        icon: Users,
        categoryLabel: "Direktori",
        desc: "Identity Layer rujukan identitas tunggal: profil person, relasi keluarga, dan peran organisasi",
        features: [
          { title: "Identity Profiles", to: "/people-manager", icon: Users },
          { title: "Role Mapping", to: "/people-manager", icon: ShieldCheck },
          { title: "Organization Membership", to: "/people-manager", icon: Building },
        ],
      },
      {
        id: "net-vault",
        title: "Contact Directory",
        to: "/peh/contacts",
        icon: Key,
        categoryLabel: "Direktori",
        desc: "Buku alamat kontak profesional, sinkronisasi nomor telepon, dan kartu nama digital",
        features: [
          { title: "Contact List", to: "/peh/contacts", icon: Users },
          { title: "Strategic Partners", to: "/contacts", icon: Key },
          { title: "Address Book", to: "/klien", icon: BookOpen },
        ],
      },
      {
        id: "net-relations",
        title: "Relationship Management",
        to: "/interaction-manager",
        icon: MessagesSquare,
        categoryLabel: "Relasi",
        desc: "Histori lini masa komunikasi terpadu, log catatan penting, dan jadwal pengingat tindak lanjut",
        features: [
          { title: "Interaction Log", to: "/interaction-manager", icon: MessagesSquare },
          { title: "Follow-Up Schedule", to: "/interaction-manager", icon: Clock },
          { title: "Discussion History", to: "/meeting-manager", icon: BookOpen },
        ],
      },
      {
        id: "net-groups",
        title: "Groups and Communities",
        to: "/lainnya?app=circle-groups",
        icon: Network,
        categoryLabel: "Relasi",
        desc: "Klaster lingkaran pertemanan, grup alumni, paguyuban hobi, dan kelompok minat bersama",
        features: [
          { title: "Relationship Groups", to: "/lainnya?app=circle-groups", icon: Users },
          { title: "Alumni Communities", to: "/peh/community-events", icon: CalendarDays },
          { title: "Group Collaboration", to: "/collaboration", icon: Users },
        ],
      },
      {
        id: "net-mentorship",
        title: "Professional Networking",
        to: "/peh/mentorship",
        icon: Compass,
        categoryLabel: "Jaringan",
        desc: "Pencatatan sesi bimbingan karir/bisnis, jejak rekam perkenalan mitra, dan sinergi kemitraan",
        features: [
          { title: "Mentorship Sessions", to: "/peh/mentorship", icon: Compass },
          { title: "Professional Introductions", to: "/peh/introductions", icon: Users },
          { title: "Advisory Board", to: "/klien", icon: Briefcase },
        ],
      },
      {
        id: "net-gifts",
        title: "Celebrations and Gifts",
        to: "/lainnya?app=gift-tracker",
        icon: Star,
        categoryLabel: "Jaringan",
        desc: "Pengingat hari ulang tahun, perayaan hari jadi mitra, log riwayat bingkisan, dan ide kado",
        features: [
          { title: "Gift History", to: "/lainnya?app=gift-tracker", icon: Gift },
          { title: "Anniversary Calendar", to: "/peh/gifts", icon: CalendarDays },
          { title: "Greeting Cards", to: "/notes", icon: BookOpen },
        ],
      },
    ],
  },
  {
    id: "mode_phase_side",
    modeId: "phase_side",
    label: "Phase: Mutual-Self-Organization",
    badge: "12 Modul • 3 Fase",
    desc: "Self-Shaping (4) · Mutual-Mapping (4) · Organization-Optimizing (4)",
    icon: Compass,
    modules: [
      {
        id: "phase-self-shaping",
        title: "Self-Shaping (Fase Diri)",
        to: "/reliance",
        icon: ShieldCheck,
        categoryLabel: "Self-Shaping",
        desc: "Kemandirian, pemenuhan kecukupan, perbaikan berkelanjutan, dan pengembangan evolusi",
        features: [
          { title: "Reliance (Kemandirian)", to: "/reliance", icon: ShieldCheck },
          { title: "Sufficient (Kecukupan)", to: "/sufficient", icon: CheckCircle2 },
          { title: "Improvement (Perbaikan)", to: "/improvement", icon: TrendingUp },
          { title: "Development (Pengembangan)", to: "/development", icon: Sparkles },
        ],
      },
      {
        id: "phase-mutual-mapping",
        title: "Mutual-Mapping (Fase Timbal Balik)",
        to: "/interact",
        icon: Workflow,
        categoryLabel: "Mutual-Mapping",
        desc: "Interaksi sosial, kepentingan bersama, titik temu multidisiplin, dan simbiosis mutualisme",
        features: [
          { title: "Interact (Interaksi Sosial)", to: "/interact", icon: MessagesSquare },
          { title: "Interest (Kepentingan Bersama)", to: "/interest", icon: Heart },
          { title: "Intersect (Titik Temu)", to: "/intersect", icon: Layers },
          { title: "Interdependence (Simbiosis)", to: "/interdependence", icon: Workflow },
        ],
      },
      {
        id: "phase-organization-optimizing",
        title: "Organization-Optimizing (Fase Organisasi)",
        to: "/insider",
        icon: Eye,
        categoryLabel: "Organization-Optimizing",
        desc: "Tata kelola dan intelijen internal, wawasan strategis, pemantauan dinamika eksternal, dan prospek",
        features: [
          { title: "Insider (Tata Kelola Internal)", to: "/insider", icon: Eye },
          { title: "Insight (Wawasan Strategis)", to: "/insight", icon: Lightbulb },
          { title: "Outward (Dinamika Eksternal)", to: "/outward", icon: Compass },
          { title: "Outlook (Prospek Masa Depan)", to: "/outlook", icon: TrendingUp },
        ],
      },
    ],
  },
];

// Helper icon fallback
function SparklesIcon() {
  return Sparkles;
}
function BookmarkIcon() {
  return BookOpen;
}
function AwardIcon() {
  return Star;
}
