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
  Shield,
  Book,
  Bookmark,
  Truck,
  Building2,
  AlertOctagon,
  Map,
  ListChecks,
  GitBranch,
  PackageCheck,
  Factory,
  UserCheck,
  CalendarClock,
  Scale3d,
  Wrench,
  BadgeCheck,
  FileDiff,
  BarChart3,
  Award,
  Microscope,
  Send,
  Database,
  UserSearch,
  Stethoscope,
  Library,
  Search,
  Settings,
  Bell,
  Brain,
  PiggyBank,
  Lock,
  Handshake,
  Sprout,
  Zap,
  Fuel,
  CalendarRange,
  Archive,
  Gauge,
  Globe,
  Megaphone,
  PhoneCall,
  Trophy,
  Radio,
  ScrollText,
  type LucideIcon,
} from "lucide-react";
import {
  getUnifiedWorkspaceById,
  resolveWorkspaceIdForRoute,
} from "@/core/taxonomy";
import {
  FIN_SUMMARY_DESC,
  FIN_TOTAL_BADGE,
  STANDALONE_FINANCIAL_APPS,
} from "@/features/launcher/FinancialWealthSection";
import { STANDALONE_MBA_APPS } from "@/features/launcher/Tools100Section";
import {
  BIZ_OPS_SUMMARY_DESC,
  BIZ_OPS_TOTAL_BADGE,
} from "@/features/business-operations/BusinessOperationsCustomersPage";
import {
  WORK_SUMMARY_DESC,
  WORK_TOTAL_BADGE,
} from "@/features/work-productivity/WorkProductivityPage";
import {
  CREATIVE_APPS,
  CREATIVE_CATEGORY_TABS,
  CREATIVE_SUMMARY_DESC,
  CREATIVE_TOTAL_BADGE,
} from "@/features/creative-workspace/CreativeWorkspaceMediaPage";
import {
  RESEARCH_SUMMARY_DESC,
  RESEARCH_TOTAL_BADGE,
} from "@/features/research-frameworks/ResearchFrameworksPage";
import {
  SHARIA_SUMMARY_DESC,
  SHARIA_TOTAL_BADGE,
} from "@/features/syariah/IslamicPrinciplesShariaValuesPage";
import {
  PERSONAL_SUMMARY_DESC,
  PERSONAL_TOTAL_BADGE,
} from "@/features/personal-life/PersonalLifePage";
import {
  FAMILY_SUMMARY_DESC,
  FAMILY_TOTAL_BADGE,
} from "@/features/family-records/FamilyRecordsHouseholdPage";
import {
  PUBLIC_AFFAIRS_SUMMARY_DESC,
  PUBLIC_AFFAIRS_TOTAL_BADGE,
} from "@/features/public-affairs/PublicRelationsPolicyAffairsPage";
import {
  SOCIAL_SUMMARY_DESC,
  SOCIAL_TOTAL_BADGE,
} from "@/features/social-networks/ContactDirectoryNetworksPage";
import {
  PHASE_SIDE_APPS,
  PHASE_SIDE_SUMMARY_DESC,
  PHASE_SIDE_TOTAL_BADGE,
} from "@/features/phase-side/PhaseSidePage";

export type WorkspaceFeatureCategory =
  | "Features"
  | "Tools"
  | "Dashboards"
  | "Workflows"
  | "Automations"
  | "Templates"
  | "Analytics"
  | "Records"
  | "Settings"
  | "Guides";

export interface WorkspaceFeatureItem {
  title: string;
  to: string;
  icon: LucideIcon;
  desc?: string;
  componentCategory?: WorkspaceFeatureCategory;
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
  features:
    app.features?.map((f) => ({
      title: f.title,
      to: f.to,
      icon: f.icon,
      desc: f.desc,
      componentCategory: f.componentCategory,
    })) || [],
}));

const BIZ_CORE_MODULES: WorkspaceModuleItem[] = [
      // 1. Strategy (2)
      {
        id: "biz-performance",
        title: "Performance Management",
        to: "/goal-manager",
        icon: Target,
        categoryLabel: "Strategy",
        desc: "Pengelolaan sasaran OKR/KPI, evaluasi kinerja berkala, statistik operasional, pencarian terpadu, matriks hak akses, dan laporan kustom",
        features: [
          { title: "Goal Manager", to: "/goal-manager", icon: Target, componentCategory: "Features" },
          { title: "Performance Review", to: "/lainnya?app=retro", icon: CheckCircle2, componentCategory: "Workflows" },
          { title: "Statistics", to: "/statistics", icon: LineChart, componentCategory: "Dashboards" },
          { title: "Search Manager", to: "/search-manager", icon: Eye, componentCategory: "Tools" },
          { title: "Access Directory", to: "/lainnya?app=access-matrix", icon: Key, componentCategory: "Settings" },
          { title: "Custom Reports", to: "/lainnya?app=custom-reports", icon: NotebookText, componentCategory: "Analytics" },
        ],
      },
      {
        id: "biz-framework",
        title: "Strategic Frameworks",
        to: "/100-framework",
        icon: Grid2X2,
        categoryLabel: "Strategy",
        desc: "Kerangka 8 Pilar Strategis dan kumpulan lengkap 100 MBA Tools untuk perencanaan serta evaluasi strategi bisnis",
        features: [
          { title: "Framework Library", to: "/100-framework", icon: Layers, componentCategory: "Templates" },
          { title: "8 Strategic Pillars", to: "/100-framework?view=pillars", icon: Grid2X2, componentCategory: "Guides" },
        ],
      },
      // 2. Operations (5)
      {
        id: "biz-vendor-management",
        title: "Vendor Management",
        to: "/peh/vendors",
        icon: Building2,
        categoryLabel: "Operations",
        desc: "Direktori vendor mitra eksternal dan evaluasi SLA kinerja kontrak",
        features: [
          { title: "SLA Evaluation", to: "/resource-manager", icon: ShieldCheck, componentCategory: "Features" },
          { title: "Vendor Directory", to: "/peh/vendors", icon: Building2, componentCategory: "Records" },
        ],
      },
      {
        id: "biz-procurement",
        title: "Procurement Management",
        to: "/peh/procurement",
        icon: Truck,
        categoryLabel: "Operations",
        desc: "Katalog penawaran produk, proses purchase orders, dan persetujuan approval belanja",
        features: [
          { title: "Purchase Orders", to: "/peh/procurement", icon: DollarSign, componentCategory: "Workflows" },
          { title: "Approval Requests", to: "/approval-manager", icon: FileCheck, componentCategory: "Workflows" },
          { title: "Product Catalog", to: "/katalog-produk", icon: Package, componentCategory: "Records" },
        ],
      },
      {
        id: "biz-inventory",
        title: "Inventory Management",
        to: "/inventory",
        icon: Package,
        categoryLabel: "Operations",
        desc: "Pengendalian stok, pelacakan batch, dan logistik rantai dingin",
        features: [
          { title: "Inventory", to: "/inventory", icon: Package, componentCategory: "Features" },
          { title: "Batch Track", to: "/lainnya?app=batch-track", icon: ShieldCheck, componentCategory: "Tools" },
          { title: "Cold Chain", to: "/lainnya?app=cold-chain", icon: Clock, componentCategory: "Dashboards" },
        ],
      },
      {
        id: "biz-quality-control",
        title: "Quality Control",
        to: "/lainnya?app=quality-check",
        icon: ShieldCheck,
        categoryLabel: "Operations",
        desc: "Pemeriksaan standar mutu operasional harian dan meja tiket penyelesaian masalah",
        features: [
          { title: "Quality Check", to: "/lainnya?app=quality-check", icon: ShieldCheck, componentCategory: "Tools" },
          { title: "Ticket Desk", to: "/lainnya?app=ticket-desk", icon: Workflow, componentCategory: "Workflows" },
        ],
      },
      {
        id: "biz-workplace-safety",
        title: "Workplace Safety",
        to: "/peh/compliance",
        icon: ShieldAlert,
        categoryLabel: "Operations",
        desc: "Pemantauan keselamatan dan kesehatan kerja serta pencatatan log insiden lapangan",
        features: [
          { title: "Keselamatan Kerja", to: "/peh/compliance", icon: ShieldCheck, desc: "Pemantauan keselamatan dan kesehatan kerja.", componentCategory: "Features" },
          { title: "Incident Log", to: "/lainnya?app=incident-log", icon: ShieldAlert, componentCategory: "Records" },
        ],
      },
      // 3. Commercial (4)
      {
        id: "biz-client",
        title: "Client Management",
        to: "/klien",
        icon: Briefcase,
        categoryLabel: "Commercial",
        desc: "Pengelolaan akun klien, relasi partner usaha, prospek, dan kontak CRM",
        features: [
          { title: "Client Directory", to: "/klien", icon: Briefcase, componentCategory: "Records" },
          { title: "Klien dan Partner", to: "/klien", icon: Users, desc: "Relasi klien dan mitra usaha untuk pengelolaan kerja sama bisnis.", componentCategory: "Records" },
          { title: "Contact Management", to: "/contacts", icon: Users, componentCategory: "Features" },
        ],
      },
      {
        id: "biz-client-comms",
        title: "Client Communications",
        to: "/portal",
        icon: MessagesSquare,
        categoryLabel: "Commercial",
        desc: "Portal kolaborasi klien, pesan terintegrasi, riwayat interaksi, dan umpan balik kepuasan",
        features: [
          { title: "Client Portal", to: "/portal", icon: MessagesSquare, componentCategory: "Features" },
          { title: "Client Messaging", to: "/portal/pesan", icon: MessagesSquare, componentCategory: "Features" },
          { title: "Interaction Log", to: "/interaction-manager", icon: BookOpen, componentCategory: "Records" },
          { title: "Client Feedback", to: "/lainnya?app=feedback-loop", icon: LineChart, componentCategory: "Analytics" },
        ],
      },
      {
        id: "biz-scheduling",
        title: "Service Scheduling",
        to: "/lainnya?app=queue-line",
        icon: CalendarDays,
        categoryLabel: "Commercial",
        desc: "Pengaturan antrean layanan pelanggan, reservasi jadwal konsultasi, dan buku tamu kunjungan",
        features: [
          { title: "Queue Management", to: "/lainnya?app=queue-line", icon: Clock, componentCategory: "Workflows" },
          { title: "Appointment Booking", to: "/lainnya?app=book-slot", icon: CalendarDays, componentCategory: "Workflows" },
          { title: "Visitor Records", to: "/lainnya?app=visitor-log", icon: Users, componentCategory: "Records" },
        ],
      },
      {
        id: "biz-commercial-services",
        title: "Commercial Services",
        to: "/lainnya?app=client-orders",
        icon: Store,
        categoryLabel: "Commercial",
        desc: "Pesanan klien, tarif layanan baku, program poin loyalitas, dan pengelolaan keanggotaan",
        features: [
          { title: "Client Orders", to: "/lainnya?app=client-orders", icon: ShoppingCart, componentCategory: "Records" },
          { title: "Service Rates", to: "/lainnya?app=services-ratecard", icon: Receipt, componentCategory: "Templates" },
          { title: "Loyalty Program", to: "/lainnya?app=loyalty-point", icon: Star, componentCategory: "Features" },
          { title: "Membership Management", to: "/lainnya?app=membership-card", icon: Key, componentCategory: "Features" },
        ],
      },
      // 4. Resources (2)
      {
        id: "biz-expense-control",
        title: "Expense Control",
        to: "/expense-tracker",
        icon: Receipt,
        categoryLabel: "Resources",
        desc: "Pencatatan pengeluaran operasional, pajak usaha (PPN), dan pemantauan langganan berkala",
        features: [
          { title: "Expense Tracker", to: "/expense-tracker", icon: Receipt, componentCategory: "Tools" },
          { title: "VAT and Other Taxes", to: "/pajak?app=ppn", icon: Receipt, desc: "Referensi dan pengelolaan pajak pertambahan nilai serta pajak usaha lainnya.", componentCategory: "Tools" },
          { title: "Subscription Manager", to: "/subscription-manager", icon: Clock, componentCategory: "Automations" },
        ],
      },
      {
        id: "biz-asset-management",
        title: "Asset Management",
        to: "/asset-manager",
        icon: Layers,
        categoryLabel: "Resources",
        desc: "Inventarisasi aset fasilitas kantor dan alokasi kapasitas sumber daya operasional",
        features: [
          { title: "Asset Manager", to: "/asset-manager", icon: Building, componentCategory: "Records" },
          { title: "Resource Manager", to: "/resource-manager", icon: Layers, componentCategory: "Features" },
        ],
      },
      {
        id: "biz-valuation",
        title: "Business Valuation",
        to: "/valuasi",
        icon: Building,
        categoryLabel: "Resources",
        desc: "Instrumen valuasi perusahaan terstandar MAPPI: Discounted Cash Flow (DCF), Multiples, dan Asset-Based Approach",
        features: [
          { title: "DCF Valuation", to: "/valuasi", icon: Calculator, componentCategory: "Tools" },
          { title: "Market Multiples", to: "/valuasi", icon: LineChart, componentCategory: "Analytics" },
          { title: "Asset-Based Valuation", to: "/valuasi", icon: Building, componentCategory: "Tools" },
        ],
      },
      // 5. Administration (1)
      {
        id: "biz-documents",
        title: "Document Management",
        to: "/lainnya?app=mailroom",
        icon: FileCheck,
        categoryLabel: "Administration",
        desc: "Administrasi korespondensi, template dokumen kerja, format baku, formulir digital, dan panduan SOP Guidelines",
        features: [
          { title: "Correspondence Log", to: "/lainnya?app=mailroom", icon: FileCheck, componentCategory: "Records" },
          { title: "Document Templates", to: "/lainnya?app=templates", icon: BookOpen, componentCategory: "Templates" },
          { title: "Template Manager", to: "/template-manager", icon: Layers, componentCategory: "Templates" },
          { title: "Forms", to: "/forms", icon: CheckSquare, componentCategory: "Tools" },
          { title: "SOP Guidelines", to: "/lainnya?app=sop", icon: BookOpen, componentCategory: "Guides" },
        ],
      },
      // 6. People (1)
      {
        id: "biz-workforce",
        title: "Workforce Management",
        to: "/lainnya?app=time-clock",
        icon: Clock,
        categoryLabel: "People",
        desc: "Pencatatan kehadiran, serah terima pekerjaan, pelatihan SDM, dan kapasitas beban kerja",
        features: [
          { title: "Time Clock", to: "/lainnya?app=time-clock", icon: Clock, componentCategory: "Tools" },
          { title: "Workload Planning", to: "/lainnya?app=workload", icon: Activity, componentCategory: "Workflows" },
          { title: "Handover Notes", to: "/lainnya?app=handover-notes", icon: BookOpen, componentCategory: "Records" },
          { title: "Training Track", to: "/lainnya?app=training-track", icon: GraduationCap, componentCategory: "Guides" },
        ],
      },
      // 7. Governance (1)
      {
        id: "biz-governance",
        title: "Corporate Governance",
        to: "/peh/compliance",
        icon: ShieldCheck,
        categoryLabel: "Governance",
        desc: "Pemantauan kepatuhan regulasi, compliance check, audit trail, struktur pemegang saham, dan lisensi HKI",
        features: [
          { title: "Kepatuhan Regulasi", to: "/peh/compliance", icon: ShieldCheck, componentCategory: "Settings" },
          { title: "Compliance Check", to: "/peh/compliance", icon: CheckCircle2, componentCategory: "Settings" },
          { title: "Audit Trail", to: "/audit-log", icon: FileCheck, componentCategory: "Records" },
          { title: "Shareholder Structure", to: "/peh/cap-table", icon: LayoutGrid, componentCategory: "Records" },
          { title: "Cap Table Matrix", to: "/peh/cap-table", icon: LayoutGrid, componentCategory: "Records" },
          { title: "Shareholders", to: "/shareholder-registry", icon: Users, componentCategory: "Records" },
          { title: "Intellectual Property", to: "/peh/ip-licenses", icon: Lightbulb, componentCategory: "Records" },
        ],
      },
];

const BIZ_MBA_PILLAR_TO_CATEGORY: Record<string, string> = {
  Strategy: "Strategy",
  Innovation: "Strategy",
  Operations: "Operations",
  Commercial: "Commercial",
  Finance: "Resources",
  Analytics: "Administration",
  Organization: "People",
  Governance: "Governance",
};

const BIZ_CATEGORY_ORDER = [
  "Strategy",
  "Operations",
  "Commercial",
  "Resources",
  "Administration",
  "People",
  "Governance",
] as const;

const BIZ_MBA_MODULES: WorkspaceModuleItem[] = STANDALONE_MBA_APPS.map((app) => ({
  id: `biz-mba-${app.id}`,
  title: app.title,
  to: app.to,
  icon: app.icon,
  categoryLabel: BIZ_MBA_PILLAR_TO_CATEGORY[app.pillar] || "Strategy",
  desc: app.subtitle,
  features: app.features.map((f) => ({
    title: f.title,
    to: f.to,
    icon: f.icon,
    desc: f.desc,
    componentCategory: f.componentCategory || "Tools",
  })),
}));

const BIZ_ADMIN_MODULES: WorkspaceModuleItem[] = BIZ_CATEGORY_ORDER.flatMap((catName) => [
  ...BIZ_CORE_MODULES.filter((m) => m.categoryLabel === catName),
  ...BIZ_MBA_MODULES.filter((m) => m.categoryLabel === catName),
]);

const EMPLOYMENT_MODULES: WorkspaceModuleItem[] = [
      // 1. Planning (7)
      {
        id: "emp-goal-management",
        title: "Goal Management",
        to: "/peh/milestones",
        icon: Target,
        categoryLabel: "Planning",
        desc: "Penetapan sasaran terukur beserta pengelolaan tahapan milestone dan checkpoint eksekusi proyek",
        features: [
          { title: "Milestone Management", to: "/milestone-manager", icon: Target, componentCategory: "Features" },
        ],
      },
      {
        id: "emp-roadmap-management",
        title: "Roadmap Management",
        to: "/goal-manager",
        icon: Compass,
        categoryLabel: "Planning",
        desc: "Penyusunan peta jalan strategis jangka menengah dan panjang yang selaras dengan sasaran organisasi",
        features: [
          { title: "Strategic Roadmap", to: "/goal-manager", icon: Compass, componentCategory: "Features" },
        ],
      },
      {
        id: "emp-goal-planning",
        title: "Goal Planning",
        to: "/peh/goals",
        icon: Target,
        categoryLabel: "Planning",
        desc: "Penyelarasan sasaran strategis tim, penyusun sasaran SMART, serta dasbor pemantauan progres target",
        features: [
          { title: "Goal Alignment", to: "", icon: Target, componentCategory: "Features" },
          { title: "SMART Goal Builder", to: "", icon: Wrench, componentCategory: "Tools" },
          { title: "Goal Progress Dashboard", to: "", icon: LayoutGrid, componentCategory: "Dashboards" },
        ],
      },
      {
        id: "emp-project-planning",
        title: "Project Planning",
        to: "/proyek",
        icon: FolderKanban,
        categoryLabel: "Planning",
        desc: "Perumusan ruang lingkup proyek menggunakan kanvas terstruktur dan template ringkasan inisiatif",
        features: [
          { title: "Project Scope Canvas", to: "", icon: Wrench, componentCategory: "Tools" },
          { title: "Project Brief Template", to: "", icon: BookOpen, componentCategory: "Templates" },
        ],
      },
      {
        id: "emp-project-portfolio",
        title: "Project Portfolio",
        to: "/proyek?view=portfolio",
        icon: Briefcase,
        categoryLabel: "Planning",
        desc: "Ikhtisar menyeluruh portofolio proyek berjalan beserta matriks penentuan prioritas inisiatif",
        features: [
          { title: "Portfolio Overview", to: "", icon: LayoutGrid, componentCategory: "Dashboards" },
          { title: "Portfolio Prioritization Matrix", to: "", icon: Grid2X2, componentCategory: "Tools" },
        ],
      },
      {
        id: "emp-roadmap-planning",
        title: "Roadmap Planning",
        to: "/timeline",
        icon: Map,
        categoryLabel: "Planning",
        desc: "Linimasa roadmap lintas kuartal serta pemetaan ketergantungan antartahapan dan antar-tim",
        features: [
          { title: "Roadmap Timeline", to: "", icon: Compass, componentCategory: "Features" },
          { title: "Dependency Mapper", to: "", icon: Network, componentCategory: "Tools" },
        ],
      },
      {
        id: "emp-resource-planning",
        title: "Resource Planning",
        to: "/resource-manager",
        icon: Users,
        categoryLabel: "Planning",
        desc: "Perencanaan kapasitas sumber daya, pemantauan kebutuhan alokasi, dan alur permintaan tenaga",
        features: [
          { title: "Resource Capacity Planner", to: "", icon: Users, componentCategory: "Tools" },
          { title: "Resource Demand Dashboard", to: "", icon: LayoutGrid, componentCategory: "Dashboards" },
          { title: "Resource Request Workflow", to: "", icon: Workflow, componentCategory: "Workflows" },
        ],
      },
      // 2. Execution (8)
      {
        id: "emp-task-management",
        title: "Task Management",
        to: "/task-manager",
        icon: CheckSquare,
        categoryLabel: "Execution",
        desc: "Penugasan aktivitas tim, pencatatan register tugas menyeluruh, serta kendali prioritas penyelesaian",
        features: [
          { title: "Task Assignment", to: "/collaboration", icon: Users, componentCategory: "Features" },
          { title: "Task Register", to: "/database", icon: NotebookText, componentCategory: "Records" },
          { title: "Task Workspace", to: "/task-manager", icon: CheckSquare, componentCategory: "Features" },
        ],
      },
      {
        id: "emp-workflow-management",
        title: "Workflow Management",
        to: "/kanban",
        icon: Workflow,
        categoryLabel: "Execution",
        desc: "Visualisasi alur kerja kanban board untuk memastikan kelancaran perpindahan tahapan pekerjaan",
        features: [
          { title: "Kanban Board", to: "/kanban", icon: Workflow, componentCategory: "Tools" },
        ],
      },
      {
        id: "emp-delivery-management",
        title: "Delivery Management",
        to: "/deliverable-manager",
        icon: Truck,
        categoryLabel: "Execution",
        desc: "Pelacakan status serah terima deliverable proyek, pemantauan tenggat SLA, dan kesiapan rilis",
        features: [
          { title: "Delivery Workspace", to: "/deliverable-manager", icon: Truck, componentCategory: "Features" },
        ],
      },
      {
        id: "emp-production-management",
        title: "Production Management",
        to: "/peh/projects",
        icon: Layers,
        categoryLabel: "Execution",
        desc: "Pengelolaan proyek produksi kreatif, jadwal kalender publikasi karya, serta pipeline alur produksi",
        features: [
          { title: "Production Projects", to: "/peh/projects", icon: FolderKanban, componentCategory: "Features" },
          { title: "Publishing Calendar", to: "/schedule-manager", icon: CalendarDays, componentCategory: "Features" },
          { title: "Production Pipeline", to: "/workflow-manager", icon: Workflow, componentCategory: "Workflows" },
        ],
      },
      {
        id: "emp-task-tracking",
        title: "Task Tracking",
        to: "/peh/tasks",
        icon: ListChecks,
        categoryLabel: "Execution",
        desc: "Antrean pemantauan tugas aktif, matriks penentuan prioritas pekerjaan, dan otomasi pengingat tenggat",
        features: [
          { title: "Task Queue Dashboard", to: "", icon: LayoutGrid, componentCategory: "Dashboards" },
          { title: "Task Prioritization Matrix", to: "", icon: Grid2X2, componentCategory: "Tools" },
          { title: "Task Reminder Automation", to: "", icon: Clock, componentCategory: "Automations" },
          { title: "Time Audit", to: "/peh/time-audit", icon: Clock, componentCategory: "Analytics" },
        ],
      },
      {
        id: "emp-workflow-design",
        title: "Workflow Design",
        to: "/peh/workflows",
        icon: GitBranch,
        categoryLabel: "Execution",
        desc: "Perancangan arsitektur alur kerja, pemetaan proses lintas peran, dan pustaka template alur baku",
        features: [
          { title: "Workflow Designer", to: "", icon: Workflow, componentCategory: "Features" },
          { title: "Process Mapping Tool", to: "", icon: GitBranch, componentCategory: "Tools" },
          { title: "Workflow Template", to: "", icon: Layers, componentCategory: "Templates" },
        ],
      },
      {
        id: "emp-delivery-tracking",
        title: "Delivery Tracking",
        to: "/deliverable-manager?view=tracking",
        icon: PackageCheck,
        categoryLabel: "Execution",
        desc: "Daftar periksa penerimaan serah terima hasil kerja beserta alur persetujuan kelayakan rilis",
        features: [
          { title: "Delivery Acceptance Checklist", to: "", icon: ListChecks, componentCategory: "Tools" },
          { title: "Delivery Approval Workflow", to: "", icon: FileCheck, componentCategory: "Workflows" },
        ],
      },
      {
        id: "emp-production-planning",
        title: "Production Planning",
        to: "/planner",
        icon: Factory,
        categoryLabel: "Execution",
        desc: "Penjadwalan lini produksi berkala dan analitik capaian keluaran output produksi",
        features: [
          { title: "Production Schedule", to: "", icon: CalendarDays, componentCategory: "Features" },
          { title: "Production Output Analytics", to: "", icon: LineChart, componentCategory: "Analytics" },
        ],
      },
      // 3. Collaboration (5)
      {
        id: "emp-meeting-management",
        title: "Meeting Management",
        to: "/peh/meetings",
        icon: CalendarDays,
        categoryLabel: "Collaboration",
        desc: "Dokumentasi notulensi rapat, agenda pembahasan tim, serta pencatatan tindakan tindak lanjut",
        features: [
          { title: "Meeting Minutes", to: "/peh/meetings", icon: CheckSquare, componentCategory: "Features" },
        ],
      },
      {
        id: "emp-decision-management",
        title: "Decision Management",
        to: "/decision-log",
        icon: Scale,
        categoryLabel: "Collaboration",
        desc: "Registri ketetapan konsensus resmi organisasi beserta arsip historis alasan pengambilan keputusan",
        features: [
          { title: "Decision Register", to: "/decision-log", icon: BookOpen, componentCategory: "Records" },
          { title: "Decision History", to: "/lainnya?app=meeting-resolutions", icon: NotebookText, componentCategory: "Records" },
        ],
      },
      {
        id: "emp-team-coordination",
        title: "Team Coordination",
        to: "/collaboration",
        icon: UserCheck,
        categoryLabel: "Collaboration",
        desc: "Matriks pembagian tanggung jawab tim, alur serah terima pekerjaan, dan catatan log aktivitas kolaborasi",
        features: [
          { title: "Team Responsibility Matrix", to: "", icon: Users, componentCategory: "Tools" },
          { title: "Team Handover Workflow", to: "", icon: Workflow, componentCategory: "Workflows" },
          { title: "Team Activity Log", to: "", icon: NotebookText, componentCategory: "Records" },
        ],
      },
      {
        id: "emp-meeting-coordination",
        title: "Meeting Coordination",
        to: "/meeting-manager",
        icon: CalendarClock,
        categoryLabel: "Collaboration",
        desc: "Penyusun agenda rapat terarah, pengingat jadwal otomatis, dan template standar notulensi rapat",
        features: [
          { title: "Meeting Agenda Builder", to: "", icon: CalendarClock, componentCategory: "Tools" },
          { title: "Meeting Reminder Automation", to: "", icon: Clock, componentCategory: "Automations" },
          { title: "Meeting Minutes Template", to: "", icon: BookOpen, componentCategory: "Templates" },
        ],
      },
      {
        id: "emp-decision-support",
        title: "Decision Support",
        to: "/eisenhower",
        icon: Scale3d,
        categoryLabel: "Collaboration",
        desc: "Matriks perbandingan opsi pengambilan keputusan serta template ringkasan usulan keputusan eksekutif",
        features: [
          { title: "Decision Matrix", to: "", icon: Grid2X2, componentCategory: "Tools" },
          { title: "Decision Brief Template", to: "", icon: BookOpen, componentCategory: "Templates" },
        ],
      },
      // 4. Control (6)
      {
        id: "emp-risk-management",
        title: "Risk Management",
        to: "/risk-management",
        icon: ShieldCheck,
        categoryLabel: "Control",
        desc: "Identifikasi potensi hambatan operasional, penilaian dampak risiko, dan perencanaan langkah mitigasi",
        features: [
          { title: "Risk Mitigation", to: "/risk-management", icon: ShieldCheck, componentCategory: "Features" },
        ],
      },
      {
        id: "emp-issue-management",
        title: "Issue Management",
        to: "/peh/incidents",
        icon: AlertOctagon,
        categoryLabel: "Control",
        desc: "Pelacakan penyelesaian masalah harian, penanganan insiden eskalasi, dan arsip log kendala",
        features: [
          { title: "Issue Tracking", to: "/lainnya?app=ticket-desk", icon: Activity, componentCategory: "Features" },
          { title: "Incident Management", to: "/peh/incidents", icon: ShieldAlert, componentCategory: "Features" },
          { title: "Issue Log", to: "/lainnya?app=incident-log", icon: AlertOctagon, componentCategory: "Records" },
        ],
      },
      {
        id: "emp-risk-control",
        title: "Risk Control",
        to: "/risk-management?view=control",
        icon: ShieldAlert,
        categoryLabel: "Control",
        desc: "Matriks evaluasi tingkat risiko, otomasi peringatan dini, dan register pengendalian risiko",
        features: [
          { title: "Risk Assessment Matrix", to: "", icon: ShieldAlert, componentCategory: "Tools" },
          { title: "Risk Alert Automation", to: "", icon: Clock, componentCategory: "Automations" },
          { title: "Risk Register", to: "", icon: NotebookText, componentCategory: "Records" },
        ],
      },
      {
        id: "emp-issue-resolution",
        title: "Issue Resolution",
        to: "/lainnya?app=ticket-desk",
        icon: Wrench,
        categoryLabel: "Control",
        desc: "Alur eskalasi penyelesaian kendala, instrumen analisis akar masalah (RCA), dan template laporan insiden",
        features: [
          { title: "Issue Escalation Workflow", to: "", icon: Workflow, componentCategory: "Workflows" },
          { title: "Root Cause Analysis", to: "", icon: Wrench, componentCategory: "Tools" },
          { title: "Incident Report Template", to: "", icon: BookOpen, componentCategory: "Templates" },
        ],
      },
      {
        id: "emp-quality-assurance",
        title: "Quality Assurance",
        to: "/lainnya?app=quality-check",
        icon: BadgeCheck,
        categoryLabel: "Control",
        desc: "Daftar periksa inspeksi mutu operasional dan panduan standar kualitas hasil kerja",
        features: [
          { title: "Quality Inspection Checklist", to: "", icon: BadgeCheck, componentCategory: "Tools" },
          { title: "Quality Standards Guide", to: "", icon: BookOpen, componentCategory: "Guides" },
        ],
      },
      {
        id: "emp-change-control",
        title: "Change Control",
        to: "/approval-manager",
        icon: FileDiff,
        categoryLabel: "Control",
        desc: "Formulir pengajuan perubahan lingkup atau sistem beserta alur persetujuan pengendalian perubahan",
        features: [
          { title: "Change Request Form", to: "", icon: FileDiff, componentCategory: "Features" },
          { title: "Change Approval Workflow", to: "", icon: Workflow, componentCategory: "Workflows" },
        ],
      },
      // 5. Performance (4)
      {
        id: "emp-kpi-management",
        title: "KPI Management",
        to: "/statistics",
        icon: BarChart3,
        categoryLabel: "Performance",
        desc: "Dasbor indikator kinerja utama, kartu skor pencapaian KPI, dan register catatan metrik target",
        features: [
          { title: "KPI Dashboard", to: "", icon: LayoutGrid, componentCategory: "Dashboards" },
          { title: "KPI Scorecard", to: "", icon: BarChart3, componentCategory: "Tools" },
          { title: "KPI Register", to: "", icon: NotebookText, componentCategory: "Records" },
        ],
      },
      {
        id: "emp-performance-review",
        title: "Performance Review",
        to: "/lainnya?app=retro",
        icon: Award,
        categoryLabel: "Performance",
        desc: "Template evaluasi kinerja berkala, analisis kesenjangan performa, dan otomasi siklus tinjauan",
        features: [
          { title: "Performance Review Template", to: "", icon: BookOpen, componentCategory: "Templates" },
          { title: "Performance Gap Analysis", to: "", icon: LineChart, componentCategory: "Analytics" },
          { title: "Review Cycle Automation", to: "", icon: Clock, componentCategory: "Automations" },
        ],
      },
      {
        id: "emp-productivity-analysis",
        title: "Productivity Analysis",
        to: "/time-tracker",
        icon: Activity,
        categoryLabel: "Performance",
        desc: "Analitik tren produktivitas kerja serta pelacak tingkat pemanfaatan waktu operasional tim",
        features: [
          { title: "Productivity Trend Analytics", to: "", icon: LineChart, componentCategory: "Analytics" },
          { title: "Time Utilization Tracker", to: "", icon: Clock, componentCategory: "Features" },
        ],
      },
      {
        id: "emp-outcome-analysis",
        title: "Outcome Analysis",
        to: "/reports",
        icon: TrendingUp,
        categoryLabel: "Performance",
        desc: "Pelacakan dampak hasil strategis serta analisis realisasi manfaat dari setiap inisiatif berjalan",
        features: [
          { title: "Outcome Tracking", to: "", icon: TrendingUp, componentCategory: "Features" },
          { title: "Benefits Realization Analysis", to: "", icon: PieChart, componentCategory: "Analytics" },
        ],
      },
];

const CREATIVE_CATEGORY_ORDER = CREATIVE_CATEGORY_TABS.filter((t) => t.id !== "all").map(
  (t) => t.label
);

const CREATIVE_MODULES: WorkspaceModuleItem[] = CREATIVE_CATEGORY_ORDER.flatMap((catName) =>
  CREATIVE_APPS.filter((app) => app.categoryLabel === catName).map((app) => ({
    id: `cr-${app.id}`,
    title: app.name,
    to: app.to,
    icon: app.icon as LucideIcon,
    categoryLabel: app.categoryLabel,
    desc: app.shortDesc,
    features: app.subMenus.map((sub) => ({
      title: sub.label,
      to: sub.to,
      icon: app.icon as LucideIcon,
      componentCategory: sub.componentCategory,
    })),
  }))
);

const RESEARCH_MODULES: WorkspaceModuleItem[] = [
  // 1. Business Research (5)
  {
    id: "res-market-research",
    title: "Market Research",
    to: "/research-foundations-and-reference-frameworks?module=market-research",
    icon: TrendingUp,
    categoryLabel: "Markets",
    desc: "Estimasi ukuran pasar (TAM/SAM/SOM), dinamika permintaan, serta penyusunan brief studi riset pasar",
    features: [
      { title: "Market Sizing Calculator", to: "", icon: Calculator, componentCategory: "Tools" },
      { title: "Market Demand Analytics", to: "", icon: LineChart, componentCategory: "Analytics" },
      { title: "Market Study Brief", to: "", icon: BookOpen, componentCategory: "Templates" },
    ],
  },
  {
    id: "res-industry-research",
    title: "Industry Research",
    to: "/research-foundations-and-reference-frameworks?module=industry-research",
    icon: Building2,
    categoryLabel: "Markets",
    desc: "Pemetaan struktur sektor industri, klasifikasi KBLI/NAICS, dinamika rantai nilai sektor, dan lanskap regulasi",
    features: [
      { title: "Industry Profile Repository", to: "", icon: NotebookText, componentCategory: "Records" },
      { title: "Industry Structure Analysis", to: "", icon: LineChart, componentCategory: "Analytics" },
      { title: "Industry Landscape Guide", to: "", icon: BookOpen, componentCategory: "Guides" },
    ],
  },
  {
    id: "res-competitor-research",
    title: "Competitor Intelligence",
    to: "/research-foundations-and-reference-frameworks?module=competitor-research",
    icon: Target,
    categoryLabel: "Markets",
    desc: "Intelijen kompetitif, registri profil pesaing, pemetaan positioning penawaran, dan pemantauan pergerakan rival",
    features: [
      { title: "Competitor Registry", to: "", icon: NotebookText, componentCategory: "Records" },
      { title: "Competitive Positioning Matrix", to: "", icon: Grid2X2, componentCategory: "Tools" },
      { title: "Competitor Watch Dashboard", to: "", icon: LayoutGrid, componentCategory: "Dashboards" },
    ],
  },
  {
    id: "res-customer-research",
    title: "Customer Intelligence",
    to: "/research-foundations-and-reference-frameworks?module=customer-research",
    icon: Users,
    categoryLabel: "Markets",
    desc: "Riset perilaku pembeli, penyusunan persona pelanggan, sintesis suara pelanggan (VoC), dan protokol wawancara",
    features: [
      { title: "Customer Persona Builder", to: "", icon: Wrench, componentCategory: "Tools" },
      { title: "Customer Voice", to: "", icon: LineChart, componentCategory: "Analytics" },
      { title: "Customer Interview Guide", to: "", icon: BookOpen, componentCategory: "Guides" },
    ],
  },
  {
    id: "res-opportunity-research",
    title: "Opportunity Analysis",
    to: "/research-foundations-and-reference-frameworks?module=opportunity-research",
    icon: Sparkles,
    categoryLabel: "Markets",
    desc: "Identifikasi celah pasar yang belum terlayani, penilaian daya tarik peluang ekspansi, dan alur validasi peluang baru",
    features: [
      { title: "Market Whitespace Mapper", to: "", icon: Compass, componentCategory: "Tools" },
      { title: "Opportunity Scoring Matrix", to: "", icon: LineChart, componentCategory: "Analytics" },
      { title: "Opportunity Pipeline", to: "", icon: Workflow, componentCategory: "Workflows" },
    ],
  },

  // 2. Academic Research (5)
  {
    id: "res-research-design",
    title: "Research Design",
    to: "/research-manager",
    icon: Compass,
    categoryLabel: "Academia",
    desc: "Perumusan pertanyaan riset, kerangka konseptual, hipotesis, manajemen bukti ilmiah, serta template proposal penelitian",
    features: [
      { title: "Research Workspace", to: "/research-manager", icon: Compass, componentCategory: "Features" },
      { title: "Hypothesis Formulation Canvas", to: "", icon: Wrench, componentCategory: "Tools" },
      { title: "Research Proposal Template", to: "", icon: BookOpen, componentCategory: "Templates" },
    ],
  },
  {
    id: "res-research-methodology",
    title: "Research Methods",
    to: "/research-foundations-and-reference-frameworks?module=research-methodology",
    icon: Microscope,
    categoryLabel: "Academia",
    desc: "Pemilihan metode kualitatif, kuantitatif, atau mixed-methods, kalkulasi ukuran sampel, dan uji validitas instrumen",
    features: [
      { title: "Sampling Size Calculator", to: "", icon: Calculator, componentCategory: "Tools" },
      { title: "Methodology Selection Guide", to: "", icon: BookOpen, componentCategory: "Guides" },
      { title: "Instrument Validation Checklist", to: "", icon: Workflow, componentCategory: "Workflows" },
    ],
  },
  {
    id: "res-literature-review",
    title: "Literature Review",
    to: "/notes",
    icon: BookOpen,
    categoryLabel: "Academia",
    desc: "Penyaringan studi terdahulu secara sistematis, catatan riset terstruktur, pemetaan research gap, dan sintesis tematik",
    features: [
      { title: "Research Notes", to: "/notes", icon: NotebookText, componentCategory: "Records" },
      { title: "Literature Synthesis Matrix", to: "", icon: Grid2X2, componentCategory: "Tools" },
      { title: "Systematic Review Workflow", to: "", icon: Workflow, componentCategory: "Workflows" },
    ],
  },
  {
    id: "res-academic-writing",
    title: "Academic Writing",
    to: "/research-foundations-and-reference-frameworks?module=academic-writing",
    icon: PenTool,
    categoryLabel: "Academia",
    desc: "Penyusunan struktur naskah ilmiah IMRaD, alur argumentasi akademik, serta pedoman gaya selingkung dan sitasi",
    features: [
      { title: "Academic Manuscript Template", to: "", icon: BookOpen, componentCategory: "Templates" },
      { title: "Citation Style Guide", to: "", icon: Compass, componentCategory: "Guides" },
      { title: "Argument Outline Builder", to: "", icon: PenTool, componentCategory: "Tools" },
    ],
  },
  {
    id: "res-publication-research",
    title: "Publication Resources",
    to: "/research-foundations-and-reference-frameworks?module=publication-research",
    icon: Send,
    categoryLabel: "Academia",
    desc: "Pemetaan jurnal ilmiah sasaran, pelacakan proses submisi peer-review, serta panduan etika publikasi akademik",
    features: [
      { title: "Target Journal Directory", to: "", icon: NotebookText, componentCategory: "Records" },
      { title: "Peer-Review Submission Workflow", to: "", icon: Workflow, componentCategory: "Workflows" },
      { title: "Publication Ethics Guide", to: "", icon: BookOpen, componentCategory: "Guides" },
    ],
  },

  // 3. Business Intelligence (4)
  {
    id: "res-data-intelligence",
    title: "Data Intelligence",
    to: "/research-foundations-and-reference-frameworks?module=data-intelligence",
    icon: Database,
    categoryLabel: "Intelligence",
    desc: "Katalog sumber data terverifikasi, otomasi pipeline agregasi data intelijen, dan pengaturan tata kelola indikator",
    features: [
      { title: "Data Source Catalog", to: "", icon: Database, componentCategory: "Records" },
      { title: "Intelligence Pipeline Automation", to: "", icon: Workflow, componentCategory: "Automations" },
      { title: "Data Governance Settings", to: "", icon: Settings, componentCategory: "Settings" },
      { title: "Statistical Analysis", to: "/kurasi/statistik", icon: LineChart, componentCategory: "Analytics" },
    ],
  },
  {
    id: "res-business-insights",
    title: "Business Intelligence",
    to: "/research-foundations-and-reference-frameworks?module=business-insights",
    icon: Lightbulb,
    categoryLabel: "Intelligence",
    desc: "Dasbor ringkasan intelijen eksekutif, analisis korelasi lintas metrik, dan template penyajian brief insight bisnis",
    features: [
      { title: "Executive Insights Dashboard", to: "", icon: LayoutGrid, componentCategory: "Dashboards" },
      { title: "Cross-Metric Insight Analytics", to: "", icon: LineChart, componentCategory: "Analytics" },
      { title: "Insight Brief Template", to: "", icon: BookOpen, componentCategory: "Templates" },
    ],
  },
  {
    id: "res-trend-analysis",
    title: "Trend Intelligence",
    to: "/research-foundations-and-reference-frameworks?module=trend-analysis",
    icon: LineChart,
    categoryLabel: "Intelligence",
    desc: "Pelacakan sinyal perubahan makro-mikro, analitik deret waktu untuk peramalan tren, dan otomasi peringatan ambang batas",
    features: [
      { title: "Trend Signal Tracker", to: "", icon: Search, componentCategory: "Features" },
      { title: "Time-Series Forecast Analytics", to: "", icon: LineChart, componentCategory: "Analytics" },
      { title: "Trend Alert Automation", to: "", icon: Bell, componentCategory: "Automations" },
    ],
  },
  {
    id: "res-benchmarking",
    title: "Benchmark Intelligence",
    to: "/research-foundations-and-reference-frameworks?module=benchmarking",
    icon: Scale,
    categoryLabel: "Intelligence",
    desc: "Komparasi rasio kinerja lintas entitas, matriks pembandingan parameter operasional, dan arsip dataset acuan industri",
    features: [
      { title: "Peer Benchmark Analytics", to: "", icon: BarChart3, componentCategory: "Analytics" },
      { title: "Benchmarking Matrix Tool", to: "", icon: Grid2X2, componentCategory: "Tools" },
      { title: "Benchmark Dataset Records", to: "", icon: NotebookText, componentCategory: "Records" },
    ],
  },

  // 4. Consulting Research (4)
  {
    id: "res-client-research",
    title: "Client Intelligence",
    to: "/research-foundations-and-reference-frameworks?module=client-research",
    icon: UserSearch,
    categoryLabel: "Consulting",
    desc: "Dossier latar belakang perusahaan klien, alur discovery pra-penugasan, dan template ringkasan konteks awal klien",
    features: [
      { title: "Client Background Dossier", to: "", icon: NotebookText, componentCategory: "Records" },
      { title: "Client Discovery Workflow", to: "", icon: Workflow, componentCategory: "Workflows" },
      { title: "Engagement Brief Template", to: "", icon: BookOpen, componentCategory: "Templates" },
    ],
  },
  {
    id: "res-business-diagnosis",
    title: "Business Diagnostics",
    to: "/research-foundations-and-reference-frameworks?module=business-diagnosis",
    icon: Stethoscope,
    categoryLabel: "Consulting",
    desc: "Asesmen kesehatan organisasi lintas fungsi, pemetaan kematangan & hambatan bisnis, serta laporan temuan diagnosis",
    features: [
      { title: "Diagnostic Assessment Tool", to: "", icon: Stethoscope, componentCategory: "Tools" },
      { title: "Maturity Analytics", to: "", icon: LineChart, componentCategory: "Analytics" },
      { title: "Diagnosis Report Template", to: "", icon: BookOpen, componentCategory: "Templates" },
    ],
  },
  {
    id: "res-feasibility-analysis",
    title: "Feasibility Studies",
    to: "/research-foundations-and-reference-frameworks?module=feasibility-analysis",
    icon: Calculator,
    categoryLabel: "Consulting",
    desc: "Evaluasi kelayakan multi-aspek proyek (pasar, teknis, finansial, legal), uji sensitivitas asumsi, dan kerangka studi kelayakan",
    features: [
      { title: "Feasibility Scorecard", to: "", icon: Calculator, componentCategory: "Tools" },
      { title: "Scenario Analytics", to: "", icon: LineChart, componentCategory: "Analytics" },
      { title: "Feasibility Study Template", to: "", icon: BookOpen, componentCategory: "Templates" },
    ],
  },
  {
    id: "res-strategic-research",
    title: "Strategic Research",
    to: "/research-foundations-and-reference-frameworks?module=strategic-research",
    icon: GitBranch,
    categoryLabel: "Consulting",
    desc: "Evaluasi opsi strategis berbasis bukti riset konsultasi, dasbor keterkaitan temuan, dan alur validasi rekomendasi",
    features: [
      { title: "Strategic Options Evaluator", to: "", icon: GitBranch, componentCategory: "Tools" },
      { title: "Strategic Evidence Dashboard", to: "", icon: LayoutGrid, componentCategory: "Dashboards" },
      { title: "Advisory Recommendation Workflow", to: "", icon: Workflow, componentCategory: "Workflows" },
    ],
  },

  // 5. Knowledge and References (5)
  {
    id: "res-frameworks",
    title: "Business Frameworks",
    to: "/100-framework",
    icon: Layers,
    categoryLabel: "Knowledge",
    desc: "Katalog lengkap model strategi keputusan eksekutif: BCG Matrix, Porter 5 Forces, SWOT/TOWS, PESTEL, hingga Value Chain",
    features: [
      { title: "Framework Library", to: "/100-framework", icon: Layers, componentCategory: "Templates" },
      { title: "BCG Matrix", to: "/bcg", icon: PieChart, componentCategory: "Analytics" },
      { title: "Porter's Five Forces", to: "/porter", icon: ShieldAlert, componentCategory: "Analytics" },
      { title: "PESTEL Analysis", to: "/pestel", icon: Compass, componentCategory: "Analytics" },
    ],
  },
  {
    id: "res-kurasi",
    title: "Business Knowledge",
    to: "/kurasi",
    icon: BookOpen,
    categoryLabel: "Knowledge",
    desc: "Modul kurasi pengetahuan bisnis 10 chapter: Ekonomi, Statistik, Manajemen, Komunikasi, Logistik, Akuntansi, Asuransi, Investasi",
    features: [
      { title: "Economics", to: "/kurasi/ekonomi", icon: Coins, componentCategory: "Guides" },
      { title: "Management", to: "/kurasi/manajemen", icon: Briefcase, componentCategory: "Guides" },
      { title: "Communication", to: "/kurasi/komunikasi", icon: MessagesSquare, componentCategory: "Guides" },
    ],
  },
  {
    id: "res-wiki",
    title: "Knowledge Management",
    to: "/wiki",
    icon: FileCheck,
    categoryLabel: "Knowledge",
    desc: "Repositori Standard Operating Procedure (SOP), dokumentasi pangkalan pengetahuan korporat, dan rujukan Incoterms",
    features: [
      { title: "SOP Library", to: "/wiki", icon: BookOpen, componentCategory: "Templates" },
      { title: "Knowledge Repository", to: "/knowledge-base", icon: NotebookText, componentCategory: "Records" },
      { title: "Vault Archive", to: "/peh/knowledge", icon: BookOpen, componentCategory: "Records" },
      { title: "Incoterms Guide", to: "/incoterms", icon: Compass, componentCategory: "Guides" },
    ],
  },
  {
    id: "res-reading",
    title: "Reading Resources",
    to: "/reading",
    icon: Book,
    categoryLabel: "Knowledge",
    desc: "Daftar bacaan terarah literatur ilmiah, buku teks bisnis, jurnal manajemen, dan ringkasan bacaan",
    features: [
      { title: "Reading List", to: "/reading", icon: Book, componentCategory: "Workflows" },
      { title: "Book Notes", to: "/notes", icon: NotebookText, componentCategory: "Records" },
      { title: "Bookmarks", to: "/bookmarks", icon: Bookmark, componentCategory: "Records" },
    ],
  },
  {
    id: "res-reference-library",
    title: "Reference Resources",
    to: "/web-clipper",
    icon: Library,
    categoryLabel: "Knowledge",
    desc: "Pustaka rujukan eksternal, pengumpulan artikel web clipper, registri bibliografi sumber primer, dan pedoman kurasi referensi",
    features: [
      { title: "Web Clipper", to: "/web-clipper", icon: Bookmark, componentCategory: "Tools" },
      { title: "Citation Registry", to: "", icon: NotebookText, componentCategory: "Records" },
      { title: "Reference Curation Guide", to: "", icon: BookOpen, componentCategory: "Guides" },
    ],
  },
];

const SHARIA_MODULES: WorkspaceModuleItem[] = [
  // 1. Islamic Principles and Ethics (2)
  {
    id: "sh-principles-ethics",
    title: "Islamic Principles",
    to: "/islamic-principles-and-sharia-values?module=islamic-principles-and-ethics",
    icon: Compass,
    categoryLabel: "Principles",
    desc: "Referensi edukatif prinsip dasar syariah, kaidah muamalah, dan kerangka Maqasid al-Sharia sebagai rujukan nilai",
    features: [
      { title: "Islamic Principles Library", to: "", icon: BookOpen, componentCategory: "Guides" },
      { title: "Maqasid al-Sharia Framework", to: "", icon: Compass, componentCategory: "Tools" },
    ],
  },
  {
    id: "sh-business-ethics",
    title: "Business Ethics",
    to: "/islamic-principles-and-sharia-values?module=islamic-business-ethics",
    icon: Briefcase,
    categoryLabel: "Principles",
    desc: "Panduan etika bisnis Islami (amanah, keadilan, transparansi transaksi) dan instrumen refleksi penilaian keputusan etis usaha",
    features: [
      { title: "Islamic Ethics Guide", to: "", icon: BookOpen, componentCategory: "Guides" },
      { title: "Ethical Decision Assessment", to: "", icon: Scale, componentCategory: "Tools" },
    ],
  },

  // 2. Islamic Social Finance (3)
  {
    id: "sh-tabarru",
    title: "Tabarru' Hibah",
    to: "/syariah/akad?app=tabarru",
    icon: HeartHandshake,
    categoryLabel: "Finance",
    desc: "Pengelolaan akad tabarru', hibah keluarga, catatan infaq/sedekah, pintasan modul Qardh Hasan, dan registrasi kontribusi sosial",
    features: [
      { title: "Tabarru' Contract", to: "/syariah/akad?app=tabarru", icon: HeartHandshake, componentCategory: "Templates" },
      { title: "Family Hibah", to: "/syariah/akad?app=hibah", icon: Gift, componentCategory: "Records" },
      { title: "Infaq Sadaqah", to: "/zakat?app=infaq", icon: Coins, componentCategory: "Records" },
      { title: "Qardh Calculator", to: "/syariah/akad?app=qardh", icon: Wallet, componentCategory: "Tools" },
      { title: "Social Contribution Register", to: "", icon: FileCheck, componentCategory: "Records" },
    ],
  },
  {
    id: "sh-qardh",
    title: "Qardh Hasan",
    to: "/syariah/akad?app=qardh",
    icon: Coins,
    categoryLabel: "Finance",
    desc: "Sistem pinjaman kebajikan tanpa bunga dengan buku catatan qardh, jadwal pengembalian pokok, dan panduan keringanan utang",
    features: [
      { title: "Qardh Ledger", to: "/syariah/akad?app=qardh", icon: BookOpen, componentCategory: "Records" },
      { title: "Principal Repayment Schedule", to: "/syariah/akad?app=qardh", icon: CalendarDays, componentCategory: "Workflows" },
      { title: "Debt Relief Terms", to: "/syariah/akad?app=qardh", icon: ShieldCheck, componentCategory: "Guides" },
    ],
  },
  {
    id: "sh-wakaf",
    title: "Waqf Management",
    to: "/syariah/akad?app=wakaf",
    icon: Building2,
    categoryLabel: "Finance",
    desc: "Tata kelola wakaf tunai, registri aset wakaf, pelaporan nazhir profesional, serta analitik dampak manfaat wakaf produktif",
    features: [
      { title: "Cash Waqf", to: "/syariah/akad?app=wakaf", icon: Coins, componentCategory: "Features" },
      { title: "Waqf Asset Register", to: "/syariah/akad?app=wakaf", icon: Building2, componentCategory: "Records" },
      { title: "Nazhir Reporting", to: "/syariah/akad?app=wakaf", icon: LineChart, componentCategory: "Analytics" },
      { title: "Waqf Impact Analytics", to: "", icon: BarChart3, componentCategory: "Analytics" },
    ],
  },

  // 3. Islamic Commercial Contracts (5)
  {
    id: "sh-mudharabah",
    title: "Mudharabah Sharing",
    to: "/syariah/akad?app=mudharabah",
    icon: TrendingUp,
    categoryLabel: "Contracts",
    desc: "Kemitraan bagi hasil pemodal dan pengelola dengan kalkulator nisbah, akad, audit laba-rugi, dan catatan distribusi",
    features: [
      { title: "Profit-Sharing Calculator", to: "/syariah/akad?app=mudharabah", icon: Calculator, componentCategory: "Tools" },
      { title: "Mudharabah Contract", to: "/syariah/akad?app=mudharabah", icon: FileCheck, componentCategory: "Templates" },
      { title: "Profit Audit", to: "/syariah/akad?app=mudharabah", icon: LineChart, componentCategory: "Analytics" },
      { title: "Profit-Sharing Distribution Record", to: "", icon: Receipt, componentCategory: "Records" },
    ],
  },
  {
    id: "sh-musyarakah",
    title: "Musharakah Capital",
    to: "/syariah/akad?app=musyarakah",
    icon: Users,
    categoryLabel: "Contracts",
    desc: "Penyertaan modal bersama (syirkah), skema musyarakah mutanaqisah, kontrak syirkah, kepemilikan modal, dan pelacak modal mitra",
    features: [
      { title: "Diminishing Musharakah", to: "/syariah/akad?app=musyarakah", icon: Users, componentCategory: "Features" },
      { title: "Shirkah Contracts", to: "/syariah/akad?app=musyarakah", icon: FileCheck, componentCategory: "Templates" },
      { title: "Capital Ownership", to: "/syariah/akad?app=musyarakah", icon: PieChart, componentCategory: "Records" },
      { title: "Partnership Capital Tracker", to: "", icon: Banknote, componentCategory: "Records" },
    ],
  },
  {
    id: "sh-murabahah",
    title: "Murabaha Sale",
    to: "/syariah/akad?app=murabahah",
    icon: Receipt,
    categoryLabel: "Contracts",
    desc: "Jual beli dengan penetapan margin keuntungan, tenor cicilan, dan verifikasi kepemilikan aset sebelum penjualan",
    features: [
      { title: "Murabaha Margin Calculator", to: "/syariah/akad?app=murabahah", icon: Calculator, componentCategory: "Tools" },
      { title: "Installment Schedule", to: "/syariah/akad?app=murabahah", icon: Banknote, componentCategory: "Workflows" },
      { title: "Asset Ownership Verification", to: "/syariah/akad?app=murabahah", icon: ShieldCheck, componentCategory: "Records" },
    ],
  },
  {
    id: "sh-ijarah",
    title: "Ijarah Lease",
    to: "/syariah/akad?app=ijarah",
    icon: FileCheck,
    categoryLabel: "Contracts",
    desc: "Penyewaan aset manfaat, kalkulator sewa beli kepemilikan bertahap (IMBT), dan panduan tanggung jawab pemilik aset",
    features: [
      { title: "Ijarah Contract", to: "/syariah/akad?app=ijarah", icon: FileCheck, componentCategory: "Templates" },
      { title: "IMBT Calculator", to: "/syariah/akad?app=ijarah", icon: Calculator, componentCategory: "Tools" },
      { title: "Asset Owner Responsibilities", to: "/syariah/akad?app=ijarah", icon: Building, componentCategory: "Guides" },
    ],
  },
  {
    id: "sh-salam-istisna",
    title: "Salam Istisna",
    to: "/syariah/akad?app=istishna",
    icon: Package,
    categoryLabel: "Contracts",
    desc: "Akad pembiayaan pesanan manufaktur bertahap, jual beli komoditas di muka, dan panduan standar spesifikasi objek",
    features: [
      { title: "Project Payment Milestones", to: "/syariah/akad?app=istishna", icon: Workflow, componentCategory: "Workflows" },
      { title: "Salam Commodity Contract", to: "/syariah/akad?app=salam", icon: FileCheck, componentCategory: "Templates" },
      { title: "Quality Specifications", to: "/syariah/akad?app=istishna", icon: ShieldCheck, componentCategory: "Guides" },
    ],
  },

  // 4. Islamic Protection and Deposits (2)
  {
    id: "sh-takaful",
    title: "Takaful Insurance",
    to: "/syariah/akad?app=takaful",
    icon: ShieldCheck,
    categoryLabel: "Protection",
    desc: "Proteksi tolong-menolong berbasis dana tabarru' bersama, kalkulasi surplus underwriting, klaim ta'awun, dan pelacak kontribusi",
    features: [
      { title: "Tabarru' Pool", to: "/syariah/akad?app=takaful", icon: ShieldCheck, componentCategory: "Records" },
      { title: "Underwriting Surplus", to: "/syariah/akad?app=takaful", icon: Calculator, componentCategory: "Tools" },
      { title: "Ta'awun Claims", to: "/syariah/akad?app=takaful", icon: Workflow, componentCategory: "Workflows" },
      { title: "Takaful Contribution Tracker", to: "", icon: Wallet, componentCategory: "Records" },
    ],
  },
  {
    id: "sh-wadiah",
    title: "Wadiah Custody",
    to: "/syariah/akad?app=wadiah",
    icon: Shield,
    categoryLabel: "Protection",
    desc: "Penyimpanan dana dan titipan murni (Wadiah Yad Dhamanah & Amanah) tanpa bunga dengan transparansi keutuhan titipan",
    features: [
      { title: "Wadiah Yad Dhamanah", to: "/syariah/akad?app=wadiah", icon: Shield, componentCategory: "Features" },
      { title: "Physical Gold Custody", to: "/syariah/akad?app=wadiah", icon: Package, componentCategory: "Records" },
      { title: "Custody Book", to: "/syariah/akad?app=wadiah", icon: BookOpen, componentCategory: "Records" },
    ],
  },

  // 5. Zakat and Wealth Purification (3)
  {
    id: "sh-zakat-maal",
    title: "Wealth Zakat",
    to: "/zakat?app=maal",
    icon: Coins,
    categoryLabel: "Zakat",
    desc: "Pelacak nisab emas 85 gram, kalender haul 354 hari hijriyah, zakat saham & reksa dana, serta panduan klasifikasi aset zakat",
    features: [
      { title: "Gold Nisab Tracker", to: "/zakat?app=maal", icon: Coins, componentCategory: "Tools" },
      { title: "Haul Calendar", to: "/zakat?app=maal", icon: CalendarDays, componentCategory: "Automations" },
      { title: "Zakat Securities", to: "/zakat?app=saham", icon: LineChart, componentCategory: "Tools" },
      { title: "Wealth Classification Guide", to: "", icon: BookOpen, componentCategory: "Guides" },
    ],
  },
  {
    id: "sh-zakat-profesi",
    title: "Income Zakat",
    to: "/zakat?app=profesi",
    icon: Wallet,
    categoryLabel: "Zakat",
    desc: "Kalkulasi zakat 2.5% dari pendapatan bersih bulanan, pengurang biaya pokok, dan histori penyaluran LAZ resmi",
    features: [
      { title: "Monthly Zakat Calculator", to: "/zakat?app=profesi", icon: Calculator, componentCategory: "Tools" },
      { title: "Cost Deduction", to: "/zakat?app=profesi", icon: Receipt, componentCategory: "Tools" },
      { title: "LAZ Distribution History", to: "/zakat?app=profesi", icon: BookOpen, componentCategory: "Records" },
    ],
  },
  {
    id: "sh-zakat-fitrah",
    title: "Zakat Fitr",
    to: "/zakat?app=fitrah",
    icon: Scale,
    categoryLabel: "Zakat",
    desc: "Kalkulator konversi sha' beras / rupiah untuk zakat fitrah, penghitungan fidyah harian, dan panduan penebus kaffarah",
    features: [
      { title: "Sha Rupiah Conversion", to: "/zakat?app=fitrah", icon: Scale, componentCategory: "Tools" },
      { title: "Daily Fidyah", to: "/zakat?app=fidyah", icon: Calculator, componentCategory: "Tools" },
      { title: "Kaffarah Guide", to: "/zakat?app=kaffarah", icon: BookOpen, componentCategory: "Guides" },
    ],
  },

  // 6. Sharia Investment (1)
  {
    id: "sh-saham",
    title: "Sharia Investments",
    to: "/100-komoditas?tab=syariah",
    icon: ShieldCheck,
    categoryLabel: "Investment",
    desc: "Indikator penapisan parameter OJK/DES (rasio utang berbasis bunga <45% & pendapatan non-halal <10%) serta riwayat skrining",
    features: [
      { title: "Financial Ratio Screen (45%)", to: "/100-komoditas?tab=syariah", icon: ShieldCheck, componentCategory: "Tools" },
      { title: "Non-Halal Revenue (<10%)", to: "/100-komoditas?tab=syariah", icon: LineChart, componentCategory: "Analytics" },
      { title: "Sharia Securities List", to: "/100-komoditas?tab=syariah", icon: Package, componentCategory: "Records" },
      { title: "Sharia Screening History", to: "", icon: FileCheck, componentCategory: "Records" },
    ],
  },

  // 7. Sharia Governance and Compliance (4)
  {
    id: "sh-audit-riba",
    title: "Riba Compliance",
    to: "/syariah/terlarang?app=riba",
    icon: ShieldAlert,
    categoryLabel: "Governance",
    desc: "Identifikasi indikator riba akad, kalkulator cleansing dana bunga konvensional, rujukan Fatwa DSN-MUI, dan asesmen eksposur riba",
    features: [
      { title: "Interest Cleansing", to: "/syariah/terlarang?app=cleansing", icon: Calculator, componentCategory: "Tools" },
      { title: "Riba Identification", to: "/syariah/terlarang?app=riba", icon: ShieldAlert, componentCategory: "Analytics" },
      { title: "DSN-MUI Fatwa Guide", to: "/syariah/terlarang?app=fatwa", icon: BookOpen, componentCategory: "Guides" },
      { title: "Riba Exposure Assessment", to: "", icon: BarChart3, componentCategory: "Analytics" },
    ],
  },
  {
    id: "sh-audit-gharar",
    title: "Gharar Compliance",
    to: "/syariah/terlarang?app=gharar",
    icon: Scale,
    categoryLabel: "Governance",
    desc: "Pemeriksaan kejelasan objek (gharar), deteksi unsur spekulasi maysir, dan rujukan standar syariah AAOIFI",
    features: [
      { title: "Object Clarity Check", to: "/syariah/terlarang?app=gharar", icon: ShieldCheck, componentCategory: "Tools" },
      { title: "Maysir Detection", to: "/syariah/terlarang?app=maysir", icon: ShieldAlert, componentCategory: "Analytics" },
      { title: "AAOIFI Standards", to: "/syariah/terlarang?app=aaoifi", icon: BookOpen, componentCategory: "Guides" },
    ],
  },
  {
    id: "sh-governance-audit",
    title: "Sharia Governance",
    to: "/islamic-principles-and-sharia-values?module=sharia-governance-and-audit",
    icon: Landmark,
    categoryLabel: "Governance",
    desc: "Pemantauan tata kelola syariah, alur kerja audit kepatuhan internal, registri kepatuhan, dan penilaian risiko syariah",
    features: [
      { title: "Sharia Governance Dashboard", to: "", icon: LayoutGrid, componentCategory: "Dashboards" },
      { title: "Sharia Audit Workflow", to: "", icon: Workflow, componentCategory: "Workflows" },
      { title: "Sharia Compliance Register", to: "", icon: FileCheck, componentCategory: "Records" },
      { title: "Sharia Risk Assessment", to: "", icon: BarChart3, componentCategory: "Analytics" },
    ],
  },
  {
    id: "sh-standards-fatwa",
    title: "Sharia Standards",
    to: "/islamic-principles-and-sharia-values?module=sharia-standards-and-fatwa",
    icon: ScrollText,
    categoryLabel: "Governance",
    desc: "Direktori standar syariah dan pustaka fatwa yang merujuk otoritas penerbit, tanggal terbit, dan status keberlakuan",
    features: [
      { title: "Fatwa Ruling Library", to: "", icon: Library, componentCategory: "Records" },
      { title: "Sharia Standards Directory", to: "", icon: Book, componentCategory: "Records" },
      { title: "Fatwa Reference Tracker", to: "", icon: Search, componentCategory: "Tools" },
      { title: "Standards Update Alerts", to: "", icon: Bell, componentCategory: "Automations" },
    ],
  },
];

const PERSONAL_MODULES: WorkspaceModuleItem[] = [
  // 1. Personal Growth (3)
  {
    id: "per-personal-development",
    title: "Personal Development",
    to: "/habit-tracker",
    icon: Flame,
    categoryLabel: "Development",
    desc: "Pembangunan kebiasaan positif harian, pelacakan konsistensi streak rutinitas, dan penguatan disiplin diri",
    features: [
      { title: "Habit Tracker", to: "/habit-tracker", icon: Flame, componentCategory: "Automations" },
      { title: "Personal Growth Matrix", to: "", icon: Grid2X2, componentCategory: "Tools" },
      { title: "Personal Habits Guide", to: "", icon: BookOpen, componentCategory: "Guides" },
    ],
  },
  {
    id: "per-goal-life-planning",
    title: "Life Planning",
    to: "/life/life-planner",
    icon: Target,
    categoryLabel: "Development",
    desc: "Perumusan visi hidup jangka panjang, penetapan target pribadi per kuartal, dan evaluasi keselarasan pencapaian hidup",
    features: [
      { title: "Life Planner", to: "/life/life-planner", icon: Target, componentCategory: "Features" },
      { title: "Annual Life Blueprint", to: "", icon: BookOpen, componentCategory: "Templates" },
      { title: "Milestone Alignment Analytics", to: "", icon: LineChart, componentCategory: "Analytics" },
    ],
  },
  {
    id: "per-personal-productivity",
    title: "Personal Productivity",
    to: "/proyek-personal",
    icon: FolderKanban,
    categoryLabel: "Development",
    desc: "Pengelolaan inisiatif proyek mandiri di luar pekerjaan kantor, alokasi fokus waktu individu, dan ringkasan capaian pribadi",
    features: [
      { title: "Personal Projects", to: "/proyek-personal", icon: FolderKanban, componentCategory: "Workflows" },
      { title: "Daily Focus Planner", to: "", icon: Clock, componentCategory: "Tools" },
      { title: "Personal Output Dashboard", to: "", icon: LayoutGrid, componentCategory: "Dashboards" },
    ],
  },

  // 2. Health and Wellbeing (4)
  {
    id: "per-health-fit",
    title: "Health Management",
    to: "/health?tab=workouts",
    icon: Dumbbell,
    categoryLabel: "Wellness",
    desc: "Log aktivitas olahraga fisik, kualitas tidur malam, komposisi metrik tubuh, dan hidrasi air minum",
    features: [
      { title: "Workout Tracker", to: "/health?tab=workouts", icon: Dumbbell, componentCategory: "Features" },
      { title: "Sleep Tracker", to: "/health?tab=sleep", icon: Clock, componentCategory: "Analytics" },
      { title: "Body Metrics", to: "/health?tab=body-metrics", icon: Activity, componentCategory: "Dashboards" },
      { title: "Water Tracker", to: "/health?tab=water", icon: Flame, componentCategory: "Automations" },
    ],
  },
  {
    id: "per-health-rec",
    title: "Health Records",
    to: "/health",
    icon: HeartPulse,
    categoryLabel: "Wellness",
    desc: "Rekam medis klinis pribadi, riwayat pemeriksaan dokter, tanda vital tubuh, dan pengingat jadwal minum obat",
    features: [
      { title: "Health Overview", to: "/health", icon: HeartPulse, componentCategory: "Dashboards" },
      { title: "Medical Records", to: "/health?tab=medical-records", icon: FileCheck, componentCategory: "Records" },
      { title: "Vital Signs", to: "/health?tab=vitals", icon: Activity, componentCategory: "Analytics" },
      { title: "Medication Reminder", to: "/lainnya?app=med-reminder", icon: ShieldCheck, componentCategory: "Automations" },
    ],
  },
  {
    id: "per-mental-wellbeing",
    title: "Mental Wellbeing",
    to: "/personal-life-management?module=mental-wellbeing",
    icon: Brain,
    categoryLabel: "Wellness",
    desc: "Pemantauan tingkat stres harian, rutinitas latihan pernapasan untuk regulasi emosi, dan analisis ketahanan mental pribadi",
    features: [
      { title: "Stress Check-In", to: "", icon: Brain, componentCategory: "Tools" },
      { title: "Mindfulness Routine", to: "", icon: Workflow, componentCategory: "Workflows" },
      { title: "Emotional Wellbeing Trends", to: "", icon: LineChart, componentCategory: "Analytics" },
    ],
  },
  {
    id: "per-nutrition-self-care",
    title: "Personal Wellness",
    to: "/health?tab=skincare",
    icon: Sparkles,
    categoryLabel: "Wellness",
    desc: "Pengelolaan rutinitas perawatan kulit pagi-malam, catatan asupan nutrisi pribadi, dan panduan kebiasaan merawat diri harian",
    features: [
      { title: "Skincare Tracker", to: "/health?tab=skincare", icon: Sparkles, componentCategory: "Workflows" },
      { title: "Personal Nutrition Log", to: "", icon: NotebookText, componentCategory: "Records" },
      { title: "Self-Care Routine Guide", to: "", icon: BookOpen, componentCategory: "Guides" },
    ],
  },

  // 3. Reflection and Mindfulness (2)
  {
    id: "per-journal",
    title: "Personal Reflection",
    to: "/journal",
    icon: BookOpen,
    categoryLabel: "Reflection",
    desc: "Ruang refleksi privat harian, catatan rasa syukur berkala, dan pemetaan suasana hati (mood tracker)",
    features: [
      { title: "Daily Journal", to: "/journal", icon: BookOpen, componentCategory: "Records" },
      { title: "Gratitude Journal", to: "/journal?tab=gratitude", icon: Heart, componentCategory: "Templates" },
      { title: "Mood Tracker", to: "/journal?tab=mood", icon: Activity, componentCategory: "Analytics" },
    ],
  },
  {
    id: "per-life-reflection",
    title: "Life Reflection",
    to: "/personal-life-management?module=life-reflection",
    icon: Compass,
    categoryLabel: "Reflection",
    desc: "Evaluasi berkala kualitas hidup mingguan dan tahunan, kompas nilai inti pribadi, serta arsip pelajaran bermakna kehidupan",
    features: [
      { title: "Periodic Review Template", to: "", icon: BookOpen, componentCategory: "Templates" },
      { title: "Values Compass", to: "", icon: Compass, componentCategory: "Tools" },
      { title: "Life Lessons Archive", to: "", icon: NotebookText, componentCategory: "Records" },
    ],
  },

  // 4. Personal Administration (3)
  {
    id: "per-personal-documents",
    title: "Personal Documents",
    to: "/personal-life-management?module=personal-documents",
    icon: FileCheck,
    categoryLabel: "Administration",
    desc: "Registri berkas identitas diri pribadi (KTP, paspor, SIM, ijazah), pengingat masa berlaku dokumen, dan panduan administrasi individu",
    features: [
      { title: "ID Certificate Registry", to: "", icon: FileCheck, componentCategory: "Records" },
      { title: "Document Renewal Reminder", to: "", icon: Bell, componentCategory: "Automations" },
      { title: "Admin Checklist Guide", to: "", icon: BookOpen, componentCategory: "Guides" },
    ],
  },
  {
    id: "per-personal-scheduling",
    title: "Personal Scheduling",
    to: "/personal-life-management?module=personal-scheduling",
    icon: CalendarDays,
    categoryLabel: "Administration",
    desc: "Pengaturan kalender dan komitmen agenda pribadi, pola blok waktu harian individu, serta pengingat otomatis janji pribadi",
    features: [
      { title: "Personal Schedule", to: "", icon: CalendarDays, componentCategory: "Features" },
      { title: "Time Blocking Template", to: "", icon: Clock, componentCategory: "Templates" },
      { title: "Personal Appointment Reminder", to: "", icon: Bell, componentCategory: "Automations" },
    ],
  },
  {
    id: "per-personal-records",
    title: "Personal Records",
    to: "/personal-life-management?module=personal-records",
    icon: NotebookText,
    categoryLabel: "Administration",
    desc: "Arsip catatan penting riwayat pribadi, kartu informasi medis darurat individu, dan pengaturan retensi catatan personal",
    features: [
      { title: "Milestone Log", to: "", icon: NotebookText, componentCategory: "Records" },
      { title: "Emergency Medical Card", to: "", icon: HeartPulse, componentCategory: "Templates" },
      { title: "Personal Archive Settings", to: "", icon: Settings, componentCategory: "Settings" },
    ],
  },

  // 5. Personal Finance (3)
  {
    id: "per-personal-budgeting",
    title: "Personal Finance",
    to: "/personal-life-management?module=personal-budgeting",
    icon: Wallet,
    categoryLabel: "Finance",
    desc: "Perencanaan anggaran bulanan kebutuhan pribadi sehari-hari, batas belanja per pos pengeluaran, dan evaluasi varian anggaran individu",
    features: [
      { title: "Personal Budget Plan", to: "", icon: Wallet, componentCategory: "Templates" },
      { title: "Personal Spending Limits", to: "", icon: Settings, componentCategory: "Settings" },
      { title: "Budget Variance Analytics", to: "", icon: LineChart, componentCategory: "Analytics" },
    ],
  },
  {
    id: "per-income-expense-tracking",
    title: "Cash Flow",
    to: "/personal-life-management?module=income-and-expense-tracking",
    icon: Receipt,
    categoryLabel: "Finance",
    desc: "Buku kas harian pribadi untuk mencatat pemasukan dan pengeluaran rutin sehari-hari beserta ringkasan arus kas harian individu",
    features: [
      { title: "Daily Expense Ledger", to: "", icon: Receipt, componentCategory: "Records" },
      { title: "Personal Income Log", to: "", icon: NotebookText, componentCategory: "Records" },
      { title: "Daily Cashflow Overview", to: "", icon: LayoutGrid, componentCategory: "Dashboards" },
    ],
  },
  {
    id: "per-savings-financial-goals",
    title: "Financial Goals",
    to: "/life/wishlist",
    icon: PiggyBank,
    categoryLabel: "Finance",
    desc: "Pengelolaan daftar wishlist barang atau pengalaman pribadi, kalkulator tabungan target personal, dan pemantauan progres menabung",
    features: [
      { title: "Savings Wishlist", to: "/life/wishlist", icon: Gift, componentCategory: "Records" },
      { title: "Savings Target Calculator", to: "", icon: Calculator, componentCategory: "Tools" },
      { title: "Savings Goal Analytics", to: "", icon: LineChart, componentCategory: "Analytics" },
    ],
  },

  // 6. Learning and Knowledge (3)
  {
    id: "per-personal-learning",
    title: "Personal Learning",
    to: "/personal-life-management?module=personal-learning",
    icon: GraduationCap,
    categoryLabel: "Learning",
    desc: "Perencanaan belajar mandiri pribadi, pemantauan sesi studi personal, serta panduan teknik belajar efektif untuk pengembangan wawasan",
    features: [
      { title: "Self-Study Plan Tracker", to: "", icon: Workflow, componentCategory: "Workflows" },
      { title: "Study Session Dashboard", to: "", icon: LayoutGrid, componentCategory: "Dashboards" },
      { title: "Effective Self-Learning Guide", to: "", icon: BookOpen, componentCategory: "Guides" },
    ],
  },
  {
    id: "per-skills-development",
    title: "Skills Development",
    to: "/personal-life-management?module=skills-development",
    icon: Award,
    categoryLabel: "Learning",
    desc: "Inventarisasi daftar keahlian pribadi, pemetaan latihan keterampilan baru yang sedang diasah, dan analitik penguasaan skill individu",
    features: [
      { title: "Personal Skill Inventory", to: "", icon: NotebookText, componentCategory: "Records" },
      { title: "Skill Gap Matrix", to: "", icon: Wrench, componentCategory: "Tools" },
      { title: "Skill Mastery Analytics", to: "", icon: LineChart, componentCategory: "Analytics" },
    ],
  },
  {
    id: "per-reading-and-knowledge",
    title: "Knowledge Resources",
    to: "/personal-life-management?module=reading-and-knowledge",
    icon: Book,
    categoryLabel: "Learning",
    desc: "Log bacaan buku dan artikel pribadi untuk pengayaan wawasan, format ringkasan intisari bacaan personal, dan panduan kurasi bacaan",
    features: [
      { title: "Reading Log", to: "", icon: Book, componentCategory: "Records" },
      { title: "Reading Takeaways", to: "", icon: NotebookText, componentCategory: "Templates" },
      { title: "Personal Reading Guide", to: "", icon: BookOpen, componentCategory: "Guides" },
    ],
  },

  // 7. Lifestyle and Leisure (3)
  {
    id: "per-hobbies-and-interests",
    title: "Personal Interests",
    to: "/personal-life-management?module=hobbies-and-interests",
    icon: Heart,
    categoryLabel: "Lifestyle",
    desc: "Catatan sesi hobi dan eksplorasi minat pribadi, penjadwalan waktu luang berkualitas, serta panduan perlengkapan dan inspirasi hobi",
    features: [
      { title: "Hobby Activity Log", to: "", icon: NotebookText, componentCategory: "Records" },
      { title: "Hobby Interest Planner", to: "", icon: Heart, componentCategory: "Features" },
      { title: "Hobby Gear Guide", to: "", icon: BookOpen, componentCategory: "Guides" },
    ],
  },
  {
    id: "per-travel-and-experiences",
    title: "Travel Experiences",
    to: "/personal-life-management?module=travel-and-experiences",
    icon: Compass,
    categoryLabel: "Lifestyle",
    desc: "Daftar destinasi dan pengalaman hidup impian pribadi, daftar periksa perlengkapan solo travel, dan dokumentasi kisah perjalanan pribadi",
    features: [
      { title: "Travel Wishlist", to: "", icon: NotebookText, componentCategory: "Records" },
      { title: "Solo Packing Checklist", to: "", icon: Wrench, componentCategory: "Tools" },
      { title: "Experience Journal Workflow", to: "", icon: Workflow, componentCategory: "Workflows" },
    ],
  },
  {
    id: "per-personal-inventory",
    title: "Personal Assets",
    to: "/personal-life-management?module=personal-inventory",
    icon: Package,
    categoryLabel: "Lifestyle",
    desc: "Inventarisasi barang kepemilikan individu (gadget, koleksi, aksesori), kurasi lemari kapsul pribadi, dan pengingat garansi barang pribadi",
    features: [
      { title: "Personal Belongings Registry", to: "", icon: Package, componentCategory: "Records" },
      { title: "Wardrobe Capsule Planner", to: "", icon: Wrench, componentCategory: "Tools" },
      { title: "Warranty Service Reminder", to: "", icon: Bell, componentCategory: "Automations" },
    ],
  },

  // 8. Digital Security and Utilities (3)
  {
    id: "per-personal-security",
    title: "Personal Security",
    to: "/passwords",
    icon: Key,
    categoryLabel: "Technology",
    desc: "Brankas manajemen kata sandi akun personal terenkripsi, daftar periksa audit keamanan akun & 2FA, dan panduan pengamanan kode pemulihan",
    features: [
      { title: "Passwords", to: "/passwords", icon: Key, componentCategory: "Settings" },
      { title: "Security Audit Checklist", to: "", icon: ShieldCheck, componentCategory: "Tools" },
      { title: "Recovery Backup Guide", to: "", icon: BookOpen, componentCategory: "Guides" },
    ],
  },
  {
    id: "per-personal-utilities",
    title: "Personal Utilities",
    to: "/kalkulator",
    icon: Calculator,
    categoryLabel: "Technology",
    desc: "Kalkulator utilitas serbaguna untuk kebutuhan komputasi harian pribadi, konverter satuan & waktu cepat, dan preferensi alat bantu personal",
    features: [
      { title: "Utility Calculator", to: "/kalkulator", icon: Calculator, componentCategory: "Tools" },
      { title: "Personal Quick Converters", to: "", icon: Wrench, componentCategory: "Tools" },
      { title: "Utility Shortcuts Preferences", to: "", icon: Settings, componentCategory: "Settings" },
    ],
  },
  {
    id: "per-digital-privacy",
    title: "Digital Privacy",
    to: "/personal-life-management?module=digital-privacy",
    icon: Lock,
    categoryLabel: "Technology",
    desc: "Alur audit privasi izin aplikasi dan akun digital, pembersihan jejak digital pribadi, serta panduan perlindungan data diri di internet",
    features: [
      { title: "Privacy Audit Workflow", to: "", icon: Workflow, componentCategory: "Workflows" },
      { title: "Digital Footprint Cleanup", to: "", icon: NotebookText, componentCategory: "Records" },
      { title: "Data Protection Guide", to: "", icon: Lock, componentCategory: "Guides" },
    ],
  },
];

const FAMILY_MODULES: WorkspaceModuleItem[] = [
  // 1. Family Management (3 Modul)
  {
    id: "fam-heritage",
    title: "Family Heritage",
    to: "/peh/family-tree",
    icon: GitFork,
    categoryLabel: "Family",
    desc: "Pencatatan silsilah garis keturunan, garis asal-usul keluarga besar, dan pelestarian sejarah serta tradisi keluarga",
    features: [
      { title: "Family Tree", to: "/peh/family-tree", icon: GitFork, componentCategory: "Records" },
      { title: "Family History", to: "/peh/traditions", icon: BookOpen, componentCategory: "Records" },
    ],
  },
  {
    id: "fam-members",
    title: "Family Members",
    to: "/household-planning-and-family-records?module=family-members",
    icon: Users,
    categoryLabel: "Family",
    desc: "Direktori keanggotaan inti dan keluarga besar yang mencatat peran domestik dan informasi anggota rumah tangga",
    features: [
      { title: "Family Directory", to: "", icon: Users, componentCategory: "Records" },
    ],
  },
  {
    id: "fam-coordination",
    title: "Family Coordination",
    to: "/lainnya?app=family-rules",
    icon: Handshake,
    categoryLabel: "Family",
    desc: "Kesepakatan tata tertib rumah bersama, papan pembagian tanggung jawab keluarga, dan perencanaan rapat keluarga",
    features: [
      { title: "Household Rules", to: "/lainnya?app=family-rules", icon: ShieldCheck, componentCategory: "Guides" },
      { title: "Shared Responsibilities Board", to: "", icon: LayoutGrid, componentCategory: "Dashboards" },
      { title: "Family Meeting Planner", to: "", icon: Workflow, componentCategory: "Workflows" },
    ],
  },

  // 2. Household Operations (4 Modul)
  {
    id: "fam-household-management",
    title: "Household Management",
    to: "/peh/chores",
    icon: Home,
    categoryLabel: "Operations",
    desc: "Pusat koordinasi operasional harian rumah tangga: sinkronisasi tugas domestik, pemeliharaan, kebun, dan hewan peliharaan",
    features: [
      { title: "Household Tracker", to: "/life/household-tracker", icon: Home, componentCategory: "Dashboards" },
    ],
  },
  {
    id: "fam-chores",
    title: "Domestic Operations",
    to: "/peh/chores",
    icon: CheckSquare,
    categoryLabel: "Operations",
    desc: "Daftar pekerjaan kebersihan rumah harian dan alur pembagian giliran tugas kepada anggota rumah tangga",
    features: [
      { title: "Household Chores", to: "/peh/chores", icon: CheckSquare, componentCategory: "Workflows" },
      { title: "Chore Assignment Planner", to: "", icon: Workflow, componentCategory: "Workflows" },
    ],
  },
  {
    id: "fam-home-maintenance",
    title: "Property Maintenance",
    to: "/peh/maintenance",
    icon: Wrench,
    categoryLabel: "Operations",
    desc: "Pencatatan perbaikan fisik bangunan, instalasi air/listrik, perawatan perangkat rumah, dan jadwal pemeliharaan berkala",
    features: [
      { title: "Home Maintenance Log", to: "/peh/maintenance", icon: Wrench, componentCategory: "Records" },
      { title: "Maintenance Schedule", to: "", icon: Clock, componentCategory: "Automations" },
    ],
  },
  {
    id: "fam-garden-pet",
    title: "Home Environment",
    to: "/peh/plants",
    icon: Sprout,
    categoryLabel: "Operations",
    desc: "Pengelolaan kebun dan tanaman hias rumah, perawatan hewan peliharaan, vaksinasi, dan log harian",
    features: [
      { title: "Garden Management", to: "/peh/plants", icon: Sprout, componentCategory: "Features" },
      { title: "Pet Care", to: "/peh/pet-care", icon: Heart, componentCategory: "Features" },
      { title: "Home Activity Log", to: "", icon: NotebookText, componentCategory: "Records" },
    ],
  },

  // 3. Household Finance (2 Modul)
  {
    id: "fam-budget",
    title: "Household Finance",
    to: "/peh/family-budget",
    icon: Wallet,
    categoryLabel: "Finance",
    desc: "Perencanaan anggaran bersama keluarga, alokasi pos belanja rumah tangga, dan pencatatan pengeluaran domestik",
    features: [
      { title: "Family Budget", to: "/peh/family-budget", icon: Wallet, componentCategory: "Features" },
      { title: "Expense Tracker", to: "/peh/budget", icon: Receipt, componentCategory: "Tools" },
    ],
  },
  {
    id: "fam-bills-payments",
    title: "Financial Obligations",
    to: "/household-planning-and-family-records?module=bills-and-payments",
    icon: Receipt,
    categoryLabel: "Finance",
    desc: "Pengelolaan jadwal jatuh tempo tagihan listrik, air, internet, IPL lingkungan, serta pengingat pembayaran rutin",
    features: [
      { title: "Bill Payment Calendar", to: "", icon: CalendarDays, componentCategory: "Automations" },
    ],
  },

  // 4. Home and Property (3 Modul)
  {
    id: "fam-property-records",
    title: "Property Records",
    to: "/household-planning-and-family-records?module=property-records",
    icon: Building2,
    categoryLabel: "Property",
    desc: "Registri dokumen kepemilikan atau sewa tempat tinggal keluarga seperti SHM, IMB/PBG, PBB, dan akta kontrak hunian",
    features: [
      { title: "Property Document Register", to: "", icon: FileCheck, componentCategory: "Records" },
    ],
  },
  {
    id: "fam-home-inventory",
    title: "Household Assets",
    to: "/household-planning-and-family-records?module=home-inventory",
    icon: Package,
    categoryLabel: "Property",
    desc: "Inventarisasi aset rumah tangga bersama seperti perabotan dan elektronik beserta pelacakan garansi dan kepemilikan",
    features: [
      { title: "Household Asset Register", to: "", icon: Package, componentCategory: "Records" },
      { title: "Ownership Warranty Tracker", to: "", icon: ShieldCheck, componentCategory: "Records" },
    ],
  },
  {
    id: "fam-home-utilities",
    title: "Home Utilities",
    to: "/household-planning-and-family-records?module=home-utilities",
    icon: Zap,
    categoryLabel: "Property",
    desc: "Pemantauan konsumsi utilitas rumah tangga meliputi listrik, air bersih, gas, dan bandwidth internet",
    features: [
      { title: "Utility Consumption Analytics", to: "", icon: LineChart, componentCategory: "Analytics" },
    ],
  },

  // 5. Food and Kitchen (3 Modul)
  {
    id: "fam-kitchen",
    title: "Kitchen Operations",
    to: "/recipes",
    icon: Utensils,
    categoryLabel: "Culinary",
    desc: "Pusat kegiatan dapur keluarga yang menghimpun koleksi resep masakan harian maupun resep warisan keluarga",
    features: [
      { title: "Recipe Collection", to: "/recipes", icon: BookOpen, componentCategory: "Records" },
      { title: "Family Recipes", to: "/peh/family-recipes", icon: NotebookText, componentCategory: "Templates" },
    ],
  },
  {
    id: "fam-meal-planning",
    title: "Food Planning",
    to: "/household-planning-and-family-records?module=meal-planning",
    icon: CalendarDays,
    categoryLabel: "Culinary",
    desc: "Perencanaan menu makan mingguan keluarga agar gizi seimbang terjaga dan persiapan bahan dapur terukur",
    features: [
      { title: "Weekly Meal Planner", to: "", icon: Workflow, componentCategory: "Workflows" },
    ],
  },
  {
    id: "fam-food-grocery",
    title: "Food Supply",
    to: "/peh/pantry",
    icon: ShoppingCart,
    categoryLabel: "Culinary",
    desc: "Inventarisasi stok bahan makanan di pantry dan kulkas, pelacakan kesegaran stok, serta daftar belanja kebutuhan dapur",
    features: [
      { title: "Pantry Inventory", to: "/peh/pantry", icon: Utensils, componentCategory: "Records" },
      { title: "Grocery List", to: "/shopping", icon: ShoppingCart, componentCategory: "Tools" },
      { title: "Food Stock Tracker", to: "", icon: Package, componentCategory: "Records" },
    ],
  },

  // 6. Family Safety and Wellbeing (3 Modul)
  {
    id: "fam-safety",
    title: "Family Security",
    to: "/lainnya?app=emergency-hub",
    icon: ShieldAlert,
    categoryLabel: "Safety",
    desc: "Direktori kontak darurat terpadu dan pengamanan keselamatan anggota keluarga dalam situasi kritis",
    features: [
      { title: "Emergency Contacts", to: "/lainnya?app=emergency-hub", icon: ShieldAlert, componentCategory: "Records" },
    ],
  },
  {
    id: "fam-health-records",
    title: "Family Health",
    to: "/peh/family-health",
    icon: HeartPulse,
    categoryLabel: "Safety",
    desc: "Rekam medis terpusat anggota keluarga meliputi alergi, golongan darah, imunisasi, dan lini masa perawatan kesehatan",
    features: [
      { title: "Family Health Records", to: "/peh/family-health", icon: HeartPulse, componentCategory: "Records" },
      { title: "Family Care Timeline", to: "", icon: CalendarClock, componentCategory: "Records" },
    ],
  },
  {
    id: "fam-emergency-prep",
    title: "Emergency Planning",
    to: "/lainnya?app=disaster-prep",
    icon: ShieldCheck,
    categoryLabel: "Safety",
    desc: "Panduan kesiapsiagaan bencana rumah tangga, checklist perlengkapan darurat, dan rencana respons darurat keluarga",
    features: [
      { title: "Emergency Preparedness", to: "/lainnya?app=disaster-prep", icon: ShieldCheck, componentCategory: "Guides" },
      { title: "Emergency Response Plan", to: "", icon: BookOpen, componentCategory: "Guides" },
    ],
  },

  // 7. Vehicles and Mobility (3 Modul)
  {
    id: "fam-vehicles",
    title: "Vehicle Records",
    to: "/peh/vehicles",
    icon: Car,
    categoryLabel: "Mobility",
    desc: "Registri identitas kendaraan keluarga beserta dokumen legalitas kepemilikan STNK, BPKB, dan masa pajak",
    features: [
      { title: "Vehicle Registry", to: "/peh/vehicles", icon: Car, componentCategory: "Records" },
    ],
  },
  {
    id: "fam-vehicle-maintenance",
    title: "Vehicle Maintenance",
    to: "/lainnya?app=mileage-fuel",
    icon: Fuel,
    categoryLabel: "Mobility",
    desc: "Log jarak tempuh dan BBM, jadwal servis berkala kendaraan, serta pelacakan histori perawatan bengkel",
    features: [
      { title: "Fuel Mileage Log", to: "/lainnya?app=mileage-fuel", icon: Fuel, componentCategory: "Records" },
      { title: "Vehicle Maintenance Schedule", to: "/lainnya?app=vehicle-service", icon: ShieldCheck, componentCategory: "Automations" },
      { title: "Vehicle Service Tracker", to: "", icon: Wrench, componentCategory: "Records" },
    ],
  },
  {
    id: "fam-mobility-planning",
    title: "Family Mobility",
    to: "/household-planning-and-family-records?module=mobility-planning",
    icon: Compass,
    categoryLabel: "Mobility",
    desc: "Koordinasi jadwal penggunaan kendaraan bersama, rencana antar-jemput keluarga, dan logistik mobilitas harian",
    features: [
      { title: "Family Mobility Planner", to: "", icon: Compass, componentCategory: "Workflows" },
      { title: "Mobility Forecast", to: "/weather", icon: Globe, componentCategory: "Dashboards" },
    ],
  },

  // 8. Family Administration (3 Modul)
  {
    id: "fam-family-documents",
    title: "Family Documents",
    to: "/household-planning-and-family-records?module=family-documents",
    icon: FileCheck,
    categoryLabel: "Administration",
    desc: "Brankas penyimpanan dokumen resmi keluarga bersama seperti Kartu Keluarga, akta kelahiran, akta nikah, dan polis keluarga",
    features: [
      { title: "Family Document Vault", to: "", icon: FileCheck, componentCategory: "Records" },
    ],
  },
  {
    id: "fam-family-calendar",
    title: "Family Scheduling",
    to: "/household-planning-and-family-records?module=family-calendar",
    icon: CalendarRange,
    categoryLabel: "Administration",
    desc: "Kalender bersama keluarga untuk menyelaraskan agenda sekolah, acara keluarga besar, dan jadwal kebersamaan",
    features: [
      { title: "Shared Family Calendar", to: "", icon: CalendarRange, componentCategory: "Workflows" },
    ],
  },
  {
    id: "fam-family-archives",
    title: "Family Archives",
    to: "/household-planning-and-family-records?module=family-archives",
    icon: Archive,
    categoryLabel: "Administration",
    desc: "Perpustakaan arsip kenangan keluarga, album dokumentasi momen penting, serta rekaman pencapaian rumah tangga",
    features: [
      { title: "Family Archive Library", to: "", icon: Archive, componentCategory: "Records" },
    ],
  },
];

const PUBLIC_AFFAIRS_MODULES: WorkspaceModuleItem[] = [
  // 1. Community Affairs (3 Modul)
  {
    id: "pub-community",
    title: "Community Affairs",
    to: "/komunitas-warga",
    icon: Building,
    categoryLabel: "Community",
    desc: "Direktori warga, transparansi iuran kas komunitas, dan penerbitan surat pengantar sipil",
    features: [
      { title: "Resident Directory", to: "/komunitas-warga", icon: Building, componentCategory: "Records" },
      { title: "Community Fund", to: "/komunitas-warga", icon: Wallet, componentCategory: "Features" },
      { title: "Civic Letters", to: "/komunitas-warga", icon: FileCheck, componentCategory: "Templates" },
    ],
  },
  {
    id: "pub-calendar",
    title: "Community Events",
    to: "/lainnya?app=civic-calendar",
    icon: CalendarDays,
    categoryLabel: "Community",
    desc: "Kalender agenda warga, jadwal musyawarah komunitas, dan arsip notulen pertemuan",
    features: [
      { title: "Community Calendar", to: "/lainnya?app=civic-calendar", icon: CalendarDays, componentCategory: "Workflows" },
      { title: "Meeting Schedule", to: "/calendar", icon: Clock, componentCategory: "Workflows" },
      { title: "Meeting Minutes", to: "/meeting-manager", icon: BookOpen, componentCategory: "Records" },
    ],
  },
  {
    id: "pub-community-dev",
    title: "Community Development",
    to: "/policy-affairs-and-public-relations?module=community-development",
    icon: Sprout,
    categoryLabel: "Community",
    desc: "Pemetaan kebutuhan masyarakat dan evaluasi program pengembangan komunitas",
    features: [
      { title: "Community Needs Assessment", to: "", icon: BarChart3, componentCategory: "Analytics" },
      { title: "Charity Impact", to: "/peh/charity", icon: Gift, componentCategory: "Records" },
      { title: "Volunteer Outreach", to: "/peh/volunteering", icon: HeartHandshake, componentCategory: "Workflows" },
    ],
  },

  // 2. Public Services (3 Modul)
  {
    id: "pub-services",
    title: "Public Services",
    to: "/lainnya?app=public-services-guide",
    icon: Compass,
    categoryLabel: "Services",
    desc: "Panduan layanan publik, syarat dokumen administrasi sipil, dan direktori kantor dinas",
    features: [
      { title: "Civic Services Guide", to: "/lainnya?app=public-services-guide", icon: Compass, componentCategory: "Guides" },
      { title: "Civic Services Hub", to: "/peh/civic", icon: Landmark, componentCategory: "Features" },
      { title: "Document Requirements", to: "/documents", icon: FileCheck, componentCategory: "Guides" },
      { title: "Public Office Directory", to: "/contacts", icon: Users, componentCategory: "Records" },
    ],
  },
  {
    id: "pub-civic-admin",
    title: "Civic Administration",
    to: "/policy-affairs-and-public-relations?module=civic-administration",
    icon: FileCheck,
    categoryLabel: "Services",
    desc: "Pengelolaan kasus administrasi sipil dan alur dokumen pelayanan publik",
    features: [
      { title: "Civic Case Management", to: "", icon: Database, componentCategory: "Records" },
      { title: "Civic Document Workflow", to: "", icon: Workflow, componentCategory: "Workflows" },
    ],
  },
  {
    id: "pub-service-performance",
    title: "Service Performance",
    to: "/policy-affairs-and-public-relations?module=public-service-performance",
    icon: Gauge,
    categoryLabel: "Services",
    desc: "Dasbor pemantauan kualitas, ketepatan waktu, dan kinerja penyelenggaraan layanan publik",
    features: [
      { title: "Service Delivery Dashboard", to: "", icon: LayoutGrid, componentCategory: "Dashboards" },
    ],
  },

  // 3. Policy and Governance (4 Modul)
  {
    id: "pub-compliance",
    title: "Regulatory Compliance",
    to: "/peh/compliance",
    icon: Scale,
    categoryLabel: "Governance",
    desc: "Pelacakan kepatuhan regulasi daerah/nasional, audit kepatuhan hukum, dan daftar regulasi",
    features: [
      { title: "Compliance Tracker", to: "/peh/compliance", icon: ShieldCheck, componentCategory: "Features" },
      { title: "Legal Compliance Audit", to: "/surety?tab=cat_kepatuhan", icon: Scale, componentCategory: "Workflows" },
      { title: "Regulatory Library", to: "/documents", icon: BookOpen, componentCategory: "Records" },
    ],
  },
  {
    id: "pub-policy-research",
    title: "Policy Research",
    to: "/policy-affairs-and-public-relations?module=policy-research",
    icon: Microscope,
    categoryLabel: "Governance",
    desc: "Ruang penelitian kebijakan publik serta pustaka bukti empiris dan kajian regulasi",
    features: [
      { title: "Policy Research Workspace", to: "", icon: Microscope, componentCategory: "Features" },
      { title: "Evidence Library", to: "", icon: Library, componentCategory: "Records" },
    ],
  },
  {
    id: "pub-policy-dev",
    title: "Policy Development",
    to: "/policy-affairs-and-public-relations?module=policy-development",
    icon: Workflow,
    categoryLabel: "Governance",
    desc: "Alur siklus perumusan kebijakan publik dan penilaian dampak implementasi kebijakan",
    features: [
      { title: "Policy Lifecycle Workflow", to: "", icon: Workflow, componentCategory: "Workflows" },
      { title: "Policy Impact Assessment", to: "", icon: LineChart, componentCategory: "Analytics" },
    ],
  },
  {
    id: "pub-legislative-monitoring",
    title: "Legislative Affairs",
    to: "/policy-affairs-and-public-relations?module=legislative-monitoring",
    icon: Landmark,
    categoryLabel: "Governance",
    desc: "Pemantauan status rancangan legislasi dan peringatan otomatis atas perubahan regulasi",
    features: [
      { title: "Legislative Tracker", to: "", icon: Landmark, componentCategory: "Records" },
      { title: "Regulatory Change Alerts", to: "", icon: Bell, componentCategory: "Automations" },
    ],
  },

  // 4. Public Engagement (3 Modul)
  {
    id: "pub-advocacy",
    title: "Public Advocacy",
    to: "/peh/advocacy",
    icon: ShieldAlert,
    categoryLabel: "Engagement",
    desc: "Kanal aspirasi masyarakat, risalah usulan kebijakan publik, dan survei opini warga",
    features: [
      { title: "Public Feedback", to: "/peh/advocacy", icon: ShieldAlert, componentCategory: "Records" },
      { title: "Policy Proposals", to: "/notes", icon: NotebookText, componentCategory: "Workflows" },
      { title: "Public Opinion Survey", to: "/forms", icon: CheckSquare, componentCategory: "Tools" },
    ],
  },
  {
    id: "pub-consultation",
    title: "Public Consultation",
    to: "/policy-affairs-and-public-relations?module=public-consultation",
    icon: MessagesSquare,
    categoryLabel: "Engagement",
    desc: "Perencanaan kampanye konsultasi publik dan pencatatan masukan serta tanggapan publik",
    features: [
      { title: "Consultation Campaign Planner", to: "", icon: Workflow, componentCategory: "Workflows" },
      { title: "Public Submission Register", to: "", icon: Database, componentCategory: "Records" },
    ],
  },
  {
    id: "pub-opinion-intel",
    title: "Public Sentiment",
    to: "/policy-affairs-and-public-relations?module=public-opinion-intelligence",
    icon: BarChart3,
    categoryLabel: "Engagement",
    desc: "Analisis sentimen opini masyarakat dan dasbor pemantauan tren persepsi publik",
    features: [
      { title: "Public Sentiment Analytics", to: "", icon: BarChart3, componentCategory: "Analytics" },
      { title: "Public Opinion Trends", to: "", icon: LayoutGrid, componentCategory: "Dashboards" },
    ],
  },

  // 5. Public Relations (3 Modul)
  {
    id: "pub-pr",
    title: "Public Relations",
    to: "/peh/global-overview",
    icon: Globe,
    categoryLabel: "Relations",
    desc: "Pengelolaan siaran pers resmi, pembaruan stakeholder eksternal, dan pemantauan media",
    features: [
      { title: "Press Releases", to: "/peh/global-overview", icon: MessagesSquare, componentCategory: "Templates" },
      { title: "Stakeholder Updates", to: "/notification-center", icon: Sparkles, componentCategory: "Workflows" },
      { title: "Media Monitoring", to: "/web-clipper", icon: Compass, componentCategory: "Analytics" },
    ],
  },
  {
    id: "pub-media-relations",
    title: "Media Affairs",
    to: "/policy-affairs-and-public-relations?module=media-relations",
    icon: Megaphone,
    categoryLabel: "Relations",
    desc: "Registri kontak redaksi & jurnalis media massa serta perencanaan agenda media briefing",
    features: [
      { title: "Media Contact Register", to: "", icon: Users, componentCategory: "Records" },
      { title: "Media Briefing Planner", to: "", icon: Megaphone, componentCategory: "Workflows" },
    ],
  },
  {
    id: "pub-stakeholder-relations",
    title: "Stakeholder Affairs",
    to: "/policy-affairs-and-public-relations?module=stakeholder-relations",
    icon: Handshake,
    categoryLabel: "Relations",
    desc: "Pemetaan posisi pemangku kepentingan eksternal dan pelacakan keterlibatan stakeholder",
    features: [
      { title: "Stakeholder Mapping", to: "", icon: Handshake, componentCategory: "Tools" },
      { title: "Stakeholder Engagement Tracker", to: "", icon: Database, componentCategory: "Records" },
    ],
  },

  // 6. Institutional Relations (2 Modul)
  {
    id: "pub-gov-relations",
    title: "Government Affairs",
    to: "/policy-affairs-and-public-relations?module=government-relations",
    icon: Building2,
    categoryLabel: "Institutions",
    desc: "Kalender agenda audiensi dan hubungan kelembagaan bersama instansi pemerintah",
    features: [
      { title: "Government Relations Calendar", to: "", icon: CalendarDays, componentCategory: "Workflows" },
    ],
  },
  {
    id: "pub-interagency-coord",
    title: "Institutional Coordination",
    to: "/policy-affairs-and-public-relations?module=interagency-coordination",
    icon: Network,
    categoryLabel: "Institutions",
    desc: "Registri rencana aksi, kesepakatan kerja sama, dan koordinasi program antarinstansi",
    features: [
      { title: "Interagency Action Register", to: "", icon: Network, componentCategory: "Records" },
    ],
  },
];

const NETWORKS_MODULES: WorkspaceModuleItem[] = [
  // 1. Identity and Directories (3)
  {
    id: "net-people",
    title: "People Directory",
    to: "/people-manager",
    icon: UserCheck,
    categoryLabel: "Directory",
    desc: "Identity Layer rujukan identitas tunggal seluruh ekosistem: profil person, pemetaan peran, keanggotaan organisasi, dan riwayat asosiasi",
    features: [
      { title: "Identity Profiles", to: "/people-manager", icon: UserCheck, componentCategory: "Records" },
      { title: "Role Mapping", to: "/people-manager", icon: ShieldCheck, componentCategory: "Tools" },
      { title: "Organization Membership", to: "/people-manager", icon: Building2, componentCategory: "Records" },
    ],
  },
  {
    id: "net-vault",
    title: "Contact Directory",
    to: "/peh/contacts",
    icon: PhoneCall,
    categoryLabel: "Directory",
    desc: "Buku alamat kontak profesional dan personal, daftar mitra strategis, sinkronisasi nomor telepon, serta kartu nama digital",
    features: [
      { title: "Contact List", to: "/peh/contacts", icon: PhoneCall, componentCategory: "Records" },
      { title: "Strategic Partners", to: "/contacts", icon: Handshake, componentCategory: "Records" },
      { title: "Address Book", to: "/klien", icon: BookOpen, componentCategory: "Records" },
    ],
  },
  {
    id: "net-org-directory",
    title: "Organization Directory",
    to: "/contact-directory-and-social-networks?module=organization-directory",
    icon: Building2,
    categoryLabel: "Directory",
    desc: "Direktori organisasi eksternal, asosiasi, institusi mitra, serta peta keterhubungan antarorganisasi dalam jejaring relasi",
    features: [
      { title: "Organization Profiles", to: "", icon: Building2, componentCategory: "Records" },
      { title: "Organization Relationship Map", to: "", icon: Network, componentCategory: "Tools" },
    ],
  },

  // 2. Relationship Management (3)
  {
    id: "net-relations",
    title: "Relationship Management",
    to: "/interaction-manager",
    icon: MessagesSquare,
    categoryLabel: "Relationships",
    desc: "Histori lini masa komunikasi terpadu, log catatan panggilan/diskusi penting, serta otomatisasi jadwal tindak lanjut relasi",
    features: [
      { title: "Follow-Up Schedule", to: "/interaction-manager", icon: Clock, componentCategory: "Automations" },
      { title: "Discussion History", to: "/meeting-manager", icon: BookOpen, componentCategory: "Records" },
    ],
  },
  {
    id: "net-personal-connections",
    title: "Personal Connections",
    to: "/contact-directory-and-social-networks?module=personal-connections",
    icon: HeartHandshake,
    categoryLabel: "Relationships",
    desc: "Perencanaan pemeliharaan hubungan pribadi dan pencatatan tanggal penting orang-orang terdekat agar silaturahmi terjaga",
    features: [
      { title: "Personal Relationship Planner", to: "", icon: HeartHandshake, componentCategory: "Workflows" },
      { title: "Important Dates Register", to: "", icon: CalendarDays, componentCategory: "Records" },
    ],
  },
  {
    id: "net-relationship-insights",
    title: "Relationship Intelligence",
    to: "/contact-directory-and-social-networks?module=relationship-insights",
    icon: BarChart3,
    categoryLabel: "Relationships",
    desc: "Analitik kesehatan relasi, frekuensi interaksi berkala, serta ringkasan kondisi dan jangkauan jejaring kontak secara menyeluruh",
    features: [
      { title: "Relationship Health Analytics", to: "", icon: BarChart3, componentCategory: "Analytics" },
      { title: "Network Overview Dashboard", to: "", icon: PieChart, componentCategory: "Dashboards" },
    ],
  },

  // 3. Groups and Communities (3)
  {
    id: "net-groups",
    title: "Groups Communities",
    to: "/lainnya?app=circle-groups",
    icon: Network,
    categoryLabel: "Communities",
    desc: "Klaster lingkaran pertemanan, komunitas alumni, paguyuban hobi, dan pengelolaan kelompok kolaborasi berbasis minat bersama",
    features: [
      { title: "Relationship Groups", to: "/lainnya?app=circle-groups", icon: Users, componentCategory: "Records" },
      { title: "Alumni Communities", to: "/peh/community-events", icon: CalendarDays, componentCategory: "Records" },
      { title: "Group Collaboration", to: "/collaboration", icon: Workflow, componentCategory: "Workflows" },
    ],
  },
  {
    id: "net-community-engagement",
    title: "Community Engagement",
    to: "/contact-directory-and-social-networks?module=community-engagement",
    icon: CalendarDays,
    categoryLabel: "Communities",
    desc: "Kalender aktivitas komunitas serta pelacakan tingkat partisipasi dan keterlibatan anggota dalam program kelompok sosial",
    features: [
      { title: "Community Activity Calendar", to: "", icon: CalendarDays, componentCategory: "Workflows" },
      { title: "Community Participation Tracker", to: "", icon: BarChart3, componentCategory: "Analytics" },
    ],
  },
  {
    id: "net-community-administration",
    title: "Community Affairs",
    to: "/contact-directory-and-social-networks?module=community-administration",
    icon: ShieldCheck,
    categoryLabel: "Communities",
    desc: "Administrasi keanggotaan grup sosial, pencatatan peran anggota komunitas, dan dokumentasi pedoman tata tertib kelompok",
    features: [
      { title: "Group Membership Register", to: "", icon: Users, componentCategory: "Records" },
      { title: "Community Guidelines", to: "", icon: BookOpen, componentCategory: "Guides" },
    ],
  },

  // 4. Professional Networks (3)
  {
    id: "net-mentorship",
    title: "Professional Networks",
    to: "/peh/mentorship",
    icon: Award,
    categoryLabel: "Professional",
    desc: "Pencatatan sesi bimbingan karir dan bisnis, riwayat perkenalan mitra strategis, serta pemetaan interaktif jejaring profesional",
    features: [
      { title: "Mentorship Sessions", to: "/peh/mentorship", icon: Award, componentCategory: "Workflows" },
      { title: "Professional Introductions", to: "/peh/introductions", icon: Users, componentCategory: "Records" },
      { title: "Career Network Map", to: "", icon: Network, componentCategory: "Tools" },
    ],
  },
  {
    id: "net-mentorship-advisory",
    title: "Advisory Networks",
    to: "/contact-directory-and-social-networks?module=mentorship-and-advisory",
    icon: Compass,
    categoryLabel: "Professional",
    desc: "Pengelolaan dewan penasihat, perencanaan program mentorship terstruktur, dan registri mentor serta penasihat profesional",
    features: [
      { title: "Board Members", to: "/klien", icon: Briefcase, componentCategory: "Records" },
      { title: "Mentorship Program Planner", to: "", icon: Compass, componentCategory: "Workflows" },
      { title: "Advisory Board Register", to: "", icon: FileCheck, componentCategory: "Records" },
    ],
  },
  {
    id: "net-partnership-networks",
    title: "Partnership Networks",
    to: "/contact-directory-and-social-networks?module=partnership-networks",
    icon: Handshake,
    categoryLabel: "Professional",
    desc: "Pengelolaan pipeline pengembangan kemitraan profesional serta direktori mitra kolaborasi lintas organisasi dan ekosistem",
    features: [
      { title: "Partnership Pipeline", to: "", icon: Workflow, componentCategory: "Workflows" },
      { title: "Partnership Directory", to: "", icon: Handshake, componentCategory: "Records" },
    ],
  },

  // 5. Social Engagement (3)
  {
    id: "net-gifts",
    title: "Social Occasions",
    to: "/lainnya?app=gift-tracker",
    icon: Gift,
    categoryLabel: "Engagement",
    desc: "Pengingat hari ulang tahun, kalender perayaan hari jadi mitra, log riwayat bingkisan apresiasi, dan templat kartu ucapan selamat",
    features: [
      { title: "Gift History", to: "/lainnya?app=gift-tracker", icon: Gift, componentCategory: "Records" },
      { title: "Anniversary Calendar", to: "/peh/gifts", icon: CalendarDays, componentCategory: "Automations" },
      { title: "Greeting Cards", to: "/notes", icon: BookOpen, componentCategory: "Templates" },
    ],
  },
  {
    id: "net-social-events",
    title: "Social Events",
    to: "/contact-directory-and-social-networks?module=social-events",
    icon: Sparkles,
    categoryLabel: "Engagement",
    desc: "Perencanaan acara sosial, pertemuan komunitas atau keluarga besar, serta penyusunan templat undangan kegiatan silaturahmi",
    features: [
      { title: "Social Event Planner", to: "", icon: Sparkles, componentCategory: "Workflows" },
      { title: "Event Invitations", to: "", icon: Send, componentCategory: "Templates" },
    ],
  },
  {
    id: "net-recognition-appreciation",
    title: "Recognition Programs",
    to: "/contact-directory-and-social-networks?module=recognition-and-appreciation",
    icon: Trophy,
    categoryLabel: "Engagement",
    desc: "Pelacakan momen penghargaan, catatan apresiasi personal maupun profesional, dan rekaman ucapan terima kasih kepada jejaring",
    features: [
      { title: "Recognition Tracker", to: "", icon: Trophy, componentCategory: "Records" },
    ],
  },

  // 6. Communication and Coordination (3)
  {
    id: "net-communication-channels",
    title: "Communication Channels",
    to: "/contact-directory-and-social-networks?module=communication-channels",
    icon: Radio,
    categoryLabel: "Communication",
    desc: "Pengelolaan preferensi saluran komunikasi setiap kontak, kanal prioritas, dan panduan etika waktu menghubungi relasi",
    features: [
      { title: "Communication Preference Profiles", to: "", icon: Radio, componentCategory: "Records" },
    ],
  },
  {
    id: "net-interaction-planning",
    title: "Interaction Management",
    to: "/contact-directory-and-social-networks?module=interaction-planning",
    icon: CalendarClock,
    categoryLabel: "Communication",
    desc: "Perencanaan jadwal pertemuan, agenda check-in berkala, dan prioritas komunikasi relasi agar interaksi strategis berjalan teratur",
    features: [
      { title: "Interaction Log", to: "/interaction-manager", icon: MessagesSquare, componentCategory: "Records" },
    ],
  },
  {
    id: "net-network-coordination",
    title: "Network Management",
    to: "/contact-directory-and-social-networks?module=network-coordination",
    icon: GitBranch,
    categoryLabel: "Communication",
    desc: "Koordinasi tindak lanjut jejaring lintas lingkaran relasi dan otomatisasi pengingat sapaan maupun tindak lanjut komunikasi",
    features: [
      { title: "Relationship Follow-Up Automations", to: "", icon: GitBranch, componentCategory: "Automations" },
    ],
  },
];

const PHASE_SIDE_MODULES: WorkspaceModuleItem[] = PHASE_SIDE_APPS.map((app) => ({
  id: app.id,
  title: app.name,
  to: app.to,
  icon: app.icon,
  categoryLabel: app.categoryLabel,
  desc: app.shortDesc,
  features: app.subMenus.map((sub) => ({
    title: sub.label,
    to: sub.to,
    icon: app.icon,
    componentCategory: sub.componentCategory,
  })),
}));

export const WORKSPACE_PAGES: WorkspacePageDef[] = [
  {
    id: "financial",
    modeId: "financial",
    label: getUnifiedWorkspaceById("financial")?.labelEn || "Financial Planning and Wealth Management",
    badge: FIN_TOTAL_BADGE,
    desc: FIN_SUMMARY_DESC,
    icon: getUnifiedWorkspaceById("financial")?.icon || Coins,
    modules: FINANCIAL_MODULES,
  },
  {
    id: "mode_business",
    modeId: "business",
    label: getUnifiedWorkspaceById("mode_business")?.labelEn || "Business Administration and Operations Management",
    badge: BIZ_OPS_TOTAL_BADGE,
    desc: BIZ_OPS_SUMMARY_DESC,
    icon: getUnifiedWorkspaceById("mode_business")?.icon || Store,
    modules: BIZ_ADMIN_MODULES,
  },
  {
    id: "mode_employment",
    modeId: "employment",
    label: getUnifiedWorkspaceById("mode_employment")?.labelEn || "Productivity Workspace and Workflow Systems",
    badge: WORK_TOTAL_BADGE,
    desc: WORK_SUMMARY_DESC,
    icon: getUnifiedWorkspaceById("mode_employment")?.icon || Briefcase,
    modules: EMPLOYMENT_MODULES,
  },
  {
    id: "mode_creative",
    modeId: "creative",
    label: getUnifiedWorkspaceById("mode_creative")?.labelEn || "Creative Workspace and Media Production",
    badge: CREATIVE_TOTAL_BADGE,
    desc: CREATIVE_SUMMARY_DESC,
    icon: getUnifiedWorkspaceById("mode_creative")?.icon || Palette,
    modules: CREATIVE_MODULES,
  },
  {
    id: "mode_research",
    modeId: "research",
    label: getUnifiedWorkspaceById("mode_research")?.labelEn || "Research Foundations and Reference Frameworks",
    badge: RESEARCH_TOTAL_BADGE,
    desc: RESEARCH_SUMMARY_DESC,
    icon: getUnifiedWorkspaceById("mode_research")?.icon || GraduationCap,
    modules: RESEARCH_MODULES,
  },
  {
    id: "mode_sharia",
    modeId: "sharia",
    label: getUnifiedWorkspaceById("mode_sharia")?.labelEn || "Islamic Principles and Sharia Values",
    badge: SHARIA_TOTAL_BADGE,
    desc: SHARIA_SUMMARY_DESC,
    icon: getUnifiedWorkspaceById("mode_sharia")?.icon || Scale,
    modules: SHARIA_MODULES,
  },
  {
    id: "mode_personal",
    modeId: "personal",
    label: getUnifiedWorkspaceById("mode_personal")?.labelEn || "Personal Life Management",
    badge: PERSONAL_TOTAL_BADGE,
    desc: PERSONAL_SUMMARY_DESC,
    icon: getUnifiedWorkspaceById("mode_personal")?.icon || Heart,
    modules: PERSONAL_MODULES,
  },
  {
    id: "mode_family",
    modeId: "family",
    label: getUnifiedWorkspaceById("mode_family")?.labelEn || "Household Planning and Family Records",
    badge: FAMILY_TOTAL_BADGE,
    desc: FAMILY_SUMMARY_DESC,
    icon: getUnifiedWorkspaceById("mode_family")?.icon || Home,
    modules: FAMILY_MODULES,
  },
  {
    id: "mode_public_affairs",
    modeId: "public_affairs",
    label: getUnifiedWorkspaceById("mode_public_affairs")?.labelEn || "Policy Affairs and Public Relations",
    badge: PUBLIC_AFFAIRS_TOTAL_BADGE,
    desc: PUBLIC_AFFAIRS_SUMMARY_DESC,
    icon: getUnifiedWorkspaceById("mode_public_affairs")?.icon || Landmark,
    modules: PUBLIC_AFFAIRS_MODULES,
  },
  {
    id: "mode_networks",
    modeId: "networks",
    label: getUnifiedWorkspaceById("mode_networks")?.labelEn || "Contact Directory and Social Networks",
    badge: SOCIAL_TOTAL_BADGE,
    desc: SOCIAL_SUMMARY_DESC,
    icon: getUnifiedWorkspaceById("mode_networks")?.icon || Users,
    modules: NETWORKS_MODULES,
  },
  {
    id: "mode_phase_side",
    modeId: "phase_side",
    label: "Phase: Mutual-Self-Organization",
    badge: PHASE_SIDE_TOTAL_BADGE,
    desc: PHASE_SIDE_SUMMARY_DESC,
    icon: Compass,
    modules: PHASE_SIDE_MODULES,
  },
];

export function getModuleCategory(mod: WorkspaceModuleItem, wsId?: string): string {
  if (mod.categoryLabel) return mod.categoryLabel;

  if (wsId === "mode_networks" || mod.id.startsWith("net-")) {
    if (["net-people", "net-vault", "net-org-directory"].includes(mod.id)) return "Directory";
    if (["net-relations", "net-personal-connections", "net-relationship-insights"].includes(mod.id)) return "Relationships";
    if (["net-groups", "net-community-engagement", "net-community-administration"].includes(mod.id)) return "Communities";
    if (["net-mentorship", "net-mentorship-advisory", "net-partnership-networks"].includes(mod.id)) return "Professional";
    if (["net-gifts", "net-social-events", "net-recognition-appreciation"].includes(mod.id)) return "Engagement";
    if (["net-communication-channels", "net-interaction-planning", "net-network-coordination"].includes(mod.id)) return "Communication";
  }

  if (wsId === "mode_business" || mod.id.startsWith("biz-")) {
    if (["biz-performance", "biz-framework"].includes(mod.id)) return "Strategy";
    if (["biz-procurement", "biz-inventory", "biz-quality", "biz-quality-control", "biz-workplace-safety"].includes(mod.id)) return "Operations";
    if (["biz-client", "biz-customer", "biz-service", "biz-client-comms", "biz-scheduling", "biz-commercial-services"].includes(mod.id)) return "Commercial";
    if (["biz-expenses", "biz-expense-control", "biz-asset-management", "biz-valuation"].includes(mod.id)) return "Resources";
    if (["biz-documents"].includes(mod.id)) return "Administration";
    if (["biz-workforce"].includes(mod.id)) return "People";
    if (["biz-governance"].includes(mod.id)) return "Governance";
  }

  if (wsId === "mode_employment" || mod.id.startsWith("emp-")) {
    if (mod.id === "emp-milestones") return "Planning";
    if (["emp-workflows", "emp-projects"].includes(mod.id)) return "Execution";
    if (["emp-vendors", "emp-procurement"].includes(mod.id)) return "Resources";
    if (mod.id === "emp-meetings") return "Collaboration";
    if (["emp-incidents", "emp-compliance"].includes(mod.id)) return "Control";
    if (mod.id === "emp-captable") return "Ownership";
  }

  if (wsId === "mode_creative" || mod.id.startsWith("cr-")) {
    if (["cr-design"].includes(mod.id)) return "Design";
    if (["cr-writing"].includes(mod.id)) return "Publishing";
    if (["cr-movies", "cr-podcasts", "cr-photo"].includes(mod.id)) return "Production";
    if (["cr-games"].includes(mod.id)) return "Interactive";
  }

  if (wsId === "mode_research" || mod.id.startsWith("res-")) {
    if (["res-market-research", "res-industry-research", "res-competitor-research", "res-customer-research", "res-opportunity-research"].includes(mod.id)) return "Markets";
    if (["res-research-design", "res-research-methodology", "res-literature-review", "res-academic-writing", "res-publication-research", "res-manager", "res-courses"].includes(mod.id)) return "Academia";
    if (["res-data-intelligence", "res-business-insights", "res-trend-analysis", "res-benchmarking"].includes(mod.id)) return "Intelligence";
    if (["res-client-research", "res-business-diagnosis", "res-feasibility-analysis", "res-strategic-research"].includes(mod.id)) return "Consulting";
    if (["res-frameworks", "res-kurasi", "res-wiki", "res-reading", "res-reference-library"].includes(mod.id)) return "Knowledge";
  }

  if (wsId === "mode_sharia" || mod.id.startsWith("sh-") || mod.id.startsWith("sha-")) {
    if (["sh-principles-ethics", "sh-business-ethics"].includes(mod.id)) return "Principles";
    if (["sh-tabarru", "sh-qardh", "sh-wakaf"].includes(mod.id)) return "Finance";
    if (["sh-mudharabah", "sh-musyarakah", "sh-murabahah", "sh-ijarah", "sh-salam-istisna"].includes(mod.id)) return "Contracts";
    if (["sh-takaful", "sh-wadiah"].includes(mod.id)) return "Protection";
    if (["sh-zakat-maal", "sh-zakat-profesi", "sh-zakat-fitrah"].includes(mod.id)) return "Zakat";
    if (["sh-saham"].includes(mod.id)) return "Investment";
    if (["sh-audit-riba", "sh-audit-gharar", "sh-governance-audit", "sh-standards-fatwa"].includes(mod.id)) return "Governance";
  }

  if (wsId === "mode_personal" || mod.id.startsWith("per-")) {
    if (["per-personal-development", "per-goal-life-planning", "per-personal-productivity", "per-habits"].includes(mod.id)) return "Development";
    if (["per-health-fit", "per-health-rec", "per-mental-wellbeing", "per-nutrition-self-care", "per-health", "per-fitness"].includes(mod.id)) return "Wellness";
    if (["per-journal", "per-life-reflection"].includes(mod.id)) return "Reflection";
    if (["per-personal-documents", "per-personal-scheduling", "per-personal-records"].includes(mod.id)) return "Administration";
    if (["per-personal-budgeting", "per-income-expense-tracking", "per-savings-financial-goals"].includes(mod.id)) return "Finance";
    if (["per-personal-learning", "per-skills-development", "per-reading-and-knowledge"].includes(mod.id)) return "Learning";
    if (["per-hobbies-and-interests", "per-travel-and-experiences", "per-personal-inventory"].includes(mod.id)) return "Lifestyle";
    if (["per-personal-security", "per-personal-utilities", "per-digital-privacy", "per-tools", "per-utilities"].includes(mod.id)) return "Technology";
  }

  if (wsId === "mode_family" || mod.id.startsWith("fam-")) {
    if (["fam-heritage", "fam-members", "fam-coordination", "fam-tree"].includes(mod.id)) return "Family";
    if (["fam-household-management", "fam-chores", "fam-home-maintenance", "fam-garden-pet"].includes(mod.id)) return "Operations";
    if (["fam-budget", "fam-bills-payments"].includes(mod.id)) return "Finance";
    if (["fam-property-records", "fam-home-inventory", "fam-home-utilities", "fam-home"].includes(mod.id)) return "Property";
    if (["fam-kitchen", "fam-meal-planning", "fam-food-grocery", "fam-pantry"].includes(mod.id)) return "Culinary";
    if (["fam-safety", "fam-health-records", "fam-emergency-prep"].includes(mod.id)) return "Safety";
    if (["fam-vehicles", "fam-vehicle-maintenance", "fam-mobility-planning"].includes(mod.id)) return "Mobility";
    if (["fam-family-documents", "fam-family-calendar", "fam-family-archives", "fam-vault"].includes(mod.id)) return "Administration";
  }

  if (wsId === "mode_public_affairs" || mod.id.startsWith("pub-")) {
    if (["pub-community", "pub-calendar", "pub-community-dev"].includes(mod.id)) return "Community";
    if (["pub-services", "pub-civic-admin", "pub-service-performance"].includes(mod.id)) return "Services";
    if (["pub-compliance", "pub-policy-research", "pub-policy-dev", "pub-legislative-monitoring"].includes(mod.id)) return "Governance";
    if (["pub-advocacy", "pub-consultation", "pub-opinion-intel", "pub-philanthropy"].includes(mod.id)) return "Engagement";
    if (["pub-pr", "pub-media-relations", "pub-stakeholder-relations", "pub-media"].includes(mod.id)) return "Relations";
    if (["pub-gov-relations", "pub-interagency-coord"].includes(mod.id)) return "Institutions";
  }

  return "Modul";
}

export function findWorkspaceForRoute(pathname: string): WorkspacePageDef | undefined {
  if (!pathname || pathname === "/") return undefined;

  // 1. Direct path & feature match across WORKSPACE_PAGES
  for (const page of WORKSPACE_PAGES) {
    for (const mod of page.modules) {
      const modPath = mod.to.split("?")[0];
      if (modPath === pathname) return page;
      if (mod.features) {
        for (const feat of mod.features) {
          const featPath = feat.to.split("?")[0];
          if (featPath === pathname) return page;
        }
      }
    }
  }

  // 1b. Full-slug first segment match (including Phase Side)
  const cleanFirstSeg = pathname.split("?")[0].replace(/^\/+/, "").split("/")[0]?.toLowerCase() || "";
  if (cleanFirstSeg === "phase-mutual-self-organization" || cleanFirstSeg === "phase-side") {
    return WORKSPACE_PAGES.find((w) => w.id === "mode_phase_side");
  }
  const directWs = getUnifiedWorkspaceById(cleanFirstSeg);
  if (directWs) {
    const match = WORKSPACE_PAGES.find((w) => w.id === directWs.id);
    if (match) return match;
  }

  // 2. Canonical Taxonomy Route Lookup (SaaS Inti, PEH, LifeOS, Wira, Frameworks)
  const resolvedId = resolveWorkspaceIdForRoute(pathname);
  if (resolvedId) {
    const match = WORKSPACE_PAGES.find((w) => w.id === resolvedId);
    if (match) return match;
  }

  // 3. Route segment keyword fallback
  const p = pathname.toLowerCase();
  if (
    p.includes("financial") || p.includes("wealth") || p.includes("budget") ||
    p.includes("investment") || p.includes("cashflow") || p.includes("fire") ||
    p.includes("audit") || p.includes("succession") || p.includes("property")
  ) {
    return WORKSPACE_PAGES.find((w) => w.id === "financial");
  }
  if (
    p.includes("business") || p.includes("procurement") || p.includes("inventory") ||
    p.includes("quality") || p.includes("klien") || p.includes("portal") ||
    p.includes("expense") || p.includes("asset") || p.includes("statistic") ||
    p.includes("100-framework") || p.includes("valuasi") || p.includes("pos") ||
    p.includes("toko") || p.includes("katalog")
  ) {
    return WORKSPACE_PAGES.find((w) => w.id === "mode_business");
  }
  if (
    p.includes("project") || p.includes("task") || p.includes("kanban") ||
    p.includes("milestone") || p.includes("work") || p.includes("team") ||
    p.includes("time") || p.includes("leave") || p.includes("sprint") ||
    p.includes("employment")
  ) {
    return WORKSPACE_PAGES.find((w) => w.id === "mode_employment");
  }
  if (
    p.includes("creative") || p.includes("studio") || p.includes("canvas") ||
    p.includes("media") || p.includes("photo") || p.includes("video") ||
    p.includes("design") || p.includes("audio")
  ) {
    return WORKSPACE_PAGES.find((w) => w.id === "mode_creative");
  }
  if (
    p.includes("research") || p.includes("academic") || p.includes("paper") ||
    p.includes("framework") || p.includes("study") || p.includes("thesis") ||
    p.includes("kurasi") || p.includes("wiki") || p.includes("knowledge") ||
    p.includes("incoterms") || p.includes("reading") || p.includes("bookmarks") ||
    p.includes("web-clipper")
  ) {
    return WORKSPACE_PAGES.find((w) => w.id === "mode_research");
  }
  if (
    p.includes("sharia") || p.includes("syariah") || p.includes("zakat") ||
    p.includes("infaq") || p.includes("wakaf") || p.includes("sedekah") ||
    p.includes("halal") || p.includes("hijrah") || p.includes("faraidh")
  ) {
    return WORKSPACE_PAGES.find((w) => w.id === "mode_sharia");
  }
  if (
    p.includes("personal") || p.includes("habit") || p.includes("journal") ||
    p.includes("health") || p.includes("mood") || p.includes("diary") ||
    p.includes("passwords") || p.includes("kalkulator") || p.includes("life-planner") ||
    p.includes("proyek-personal") || p.includes("wishlist")
  ) {
    return WORKSPACE_PAGES.find((w) => w.id === "mode_personal");
  }
  if (
    p.includes("family") || p.includes("household") || p.includes("vehicle") ||
    p.includes("child") || p.includes("parent") || p.includes("home") ||
    p.includes("chores") || p.includes("maintenance") || p.includes("plants") ||
    p.includes("pet-care") || p.includes("pantry") || p.includes("recipes") ||
    p.includes("shopping") || p.includes("traditions") || p.includes("emergency-hub") ||
    p.includes("disaster-prep") || p.includes("mileage-fuel")
  ) {
    return WORKSPACE_PAGES.find((w) => w.id === "mode_family");
  }
  if (
    p.includes("public") || p.includes("civic") || p.includes("policy") ||
    p.includes("government") || p.includes("community") || p.includes("komunitas-warga") ||
    p.includes("advocacy") || p.includes("compliance")
  ) {
    return WORKSPACE_PAGES.find((w) => w.id === "mode_public_affairs");
  }
  if (
    p.includes("network") || p.includes("contact") || p.includes("social") ||
    p.includes("directory") || p.includes("people") || p.includes("relation") ||
    p.includes("interaction") || p.includes("mentorship") || p.includes("introductions") ||
    p.includes("circle-groups") || p.includes("gift-tracker") || p.includes("community-events")
  ) {
    return WORKSPACE_PAGES.find((w) => w.id === "mode_networks");
  }
  if (
    p.includes("phase-mutual-self-organization") || p.includes("phase-side") ||
    p.includes("reliance") || p.includes("sufficient") || p.includes("improvement") ||
    p.includes("development") || p.includes("interact") || p.includes("interest") ||
    p.includes("intersect") || p.includes("interdependence") || p.includes("insider") ||
    p.includes("insight") || p.includes("outward") || p.includes("outlook")
  ) {
    return WORKSPACE_PAGES.find((w) => w.id === "mode_phase_side");
  }

  return undefined;
}
