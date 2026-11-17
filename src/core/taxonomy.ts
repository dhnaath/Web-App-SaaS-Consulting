/**
 * OFFICIAL PRODUCT TAXONOMY — DNA CONSULTING SaaS
 *
 * Strict Hierarchy:
 * Page → Module → Feature / Tool
 *
 * Definitions:
 * - Page: The highest-level application area representing a major functional or business domain.
 * - Module: A functional grouping within a Page organizing related capabilities.
 * - Feature: A system capability or functional workflow provided within a Module.
 * - Tool: A specific instrument used to perform an activity, analysis, calculation, assessment, or produce an output.
 *
 * Feature and Tool are parallel elements under a Module (a Tool is not a child of a Feature).
 */

import { CATEGORIES } from "@/frameworkData";
import {
  WORKSPACE_IDS,
  UNIFIED_WORKSPACES,
  SUB_COMPONENT_KEYS,
  SUB_COMPONENT_TABS,
  SUB_COMPONENT_TAB_MAP,
  UNIFIED_SUB_COMPONENTS,
  getUnifiedWorkspaces,
  getUnifiedWorkspaceById,
  getSubComponentTabs,
  getSubComponentTab,
  type WorkspaceId,
  type UnifiedWorkspaceDef,
  type UnifiedWorkspaceMeta,
  type SubComponentKey,
  type SubComponentType,
  type SubComponentTabDef,
} from "./unifiedTaxonomy";

export {
  WORKSPACE_IDS,
  UNIFIED_WORKSPACES,
  SUB_COMPONENT_KEYS,
  SUB_COMPONENT_TABS,
  SUB_COMPONENT_TAB_MAP,
  UNIFIED_SUB_COMPONENTS,
  getUnifiedWorkspaces,
  getUnifiedWorkspaceById,
  getSubComponentTabs,
  getSubComponentTab,
  type WorkspaceId,
  type UnifiedWorkspaceDef,
  type UnifiedWorkspaceMeta,
  type SubComponentKey,
  type SubComponentType,
  type SubComponentTabDef,
};

/**
 * LEVEL 1: 10 Laman Utama Resmi (Urutan, ID, dan Nama Seragam)
 */
export const UNIFIED_LEVEL1_WORKSPACES: ReadonlyArray<{
  readonly id: WorkspaceId;
  readonly name: string;
  readonly route: string;
}> = Object.freeze([
  { id: "financial", name: "Financial Planning and Wealth Management", route: "/financial-planning-and-wealth-management" },
  { id: "mode_business", name: "Business Administration and Operations Management", route: "/business-administration-and-operations-management" },
  { id: "mode_employment", name: "Productivity Workspace and Workflow Systems", route: "/productivity-workspace-and-workflow-systems" },
  { id: "mode_creative", name: "Creative Workspace and Media Production", route: "/creative-workspace-and-media-production" },
  { id: "mode_research", name: "Research Foundations and Reference Frameworks", route: "/research-foundations-and-reference-frameworks" },
  { id: "mode_sharia", name: "Islamic Principles and Sharia Values", route: "/islamic-principles-and-sharia-values" },
  { id: "mode_personal", name: "Personal Life Management", route: "/personal-life-management" },
  { id: "mode_family", name: "Household Planning and Family Records", route: "/household-planning-and-family-records" },
  { id: "mode_public_affairs", name: "Policy Affairs and Public Relations", route: "/policy-affairs-and-public-relations" },
  { id: "mode_networks", name: "Contact Directory and Social Networks", route: "/contact-directory-and-social-networks" },
]);

export type ProductNodeType = "page" | "module" | "feature" | "tool";

export interface TaxonomyItem {
  readonly id: string;
  readonly name: string;
  readonly type: "feature" | "tool";
  readonly route: string;
  readonly description?: string;
  readonly badge?: string;
  readonly iconName?: string;
}

export interface TaxonomyModule {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly pageId: string;
  readonly features: readonly TaxonomyItem[];
  readonly tools: readonly TaxonomyItem[];
}

export interface TaxonomyPage {
  readonly id: string;
  readonly workspaceId: WorkspaceId;
  readonly name: string;
  readonly description: string;
  readonly route: string;
  readonly badge?: string;
  readonly modules: readonly TaxonomyModule[];
}

/**
 * Master Product Taxonomy Registry
 * Defines all 10 Master Pages and their structured Modules, Features, and Tools.
 */
export const PRODUCT_TAXONOMY: readonly TaxonomyPage[] = Object.freeze([
  // 1. FINANCIAL PLANNING AND WEALTH MANAGEMENT
  {
    id: "financial-planning-and-wealth-management",
    workspaceId: "financial",
    name: "Financial Planning and Wealth Management",
    description: "Perencanaan keuangan terpadu, 5 tahapan kekayaan, kuadran aset, dan valuasi bisnis.",
    route: "/financial-planning-and-wealth-management",
    badge: "5 Tahapan",
    modules: [
      {
        id: "fin-strategic-valuation",
        name: "Strategic Valuation & Frameworks",
        description: "Metodologi penilaian aset dan pemantauan valuasi bisnis.",
        pageId: "financial-planning-and-wealth-management",
        features: [
          { id: "fw-catalog", name: "Katalog Framework Valuasi", type: "feature", route: "/100-framework" },
          { id: "value-treated-hub", name: "Kurasi Nilai Kekayaan (Value Treated)", type: "feature", route: "/value-treated" },
        ],
        tools: [
          { id: "fw-100", name: "100 Framework", type: "tool", route: "/100-framework" },
          { id: "valuasi-mappi", name: "Valuasi MAPPI", type: "tool", route: "/valuasi" },
        ],
      },
      {
        id: "fin-commodity-indices",
        name: "Commodity & National Indices",
        description: "Pemantauan harga komoditas dan indikator pembangunan nasional.",
        pageId: "financial-planning-and-wealth-management",
        features: [
          { id: "market-monitor", name: "Market Price Monitor", type: "feature", route: "/100-komoditas" },
          { id: "physical-commodities", name: "Physical Commodities", type: "feature", route: "/physical-commodities" },
        ],
        tools: [
          { id: "national-indices", name: "10 Indeks Pembangunan", type: "tool", route: "/10-indeks" },
        ],
      },
      {
        id: "fin-assets-earning",
        name: "Assets & Earning Quadrants",
        description: "Alokasi modal, instrumen likuiditas, dan optimalisasi kuadran pendapatan.",
        pageId: "financial-planning-and-wealth-management",
        features: [
          { id: "kuadran-aset", name: "Kuadran Aset", type: "feature", route: "/asset" },
          { id: "kuadran-pendapatan", name: "Kuadran Pendapatan", type: "feature", route: "/earning" },
          { id: "kesehatan-finansial", name: "Kesehatan Finansial", type: "feature", route: "/financial-health" },
          { id: "liquid-reserves-app", name: "Liquid Reserves", type: "feature", route: "/liquid-reserves" },
          { id: "paper-securities-app", name: "Paper Securities", type: "feature", route: "/paper-securities" },
          { id: "digital-assets-app", name: "Digital Assets", type: "feature", route: "/digital-assets" },
          { id: "real-estate-app", name: "Real Estate", type: "feature", route: "/real-estate" },
          { id: "peh-investments-app", name: "Portfolio & Investments (PEH)", type: "feature", route: "/peh/investments" },
          { id: "peh-real-estate-app", name: "Real Estate Registry (PEH)", type: "feature", route: "/peh/real-estate" },
          { id: "peh-insurance-app", name: "Insurance Coverage (PEH)", type: "feature", route: "/peh/insurance" },
          { id: "life-finance-os-app", name: "Finance OS (Life OS)", type: "feature", route: "/life/finance-os" },
          { id: "life-simple-finance-app", name: "Simple Finance (Life OS)", type: "feature", route: "/life/simple-finance" },
          { id: "life-assets-app", name: "Personal Assets (Life OS)", type: "feature", route: "/life/assets" },
        ],
        tools: [
          { id: "bunga-majemuk", name: "Kalkulator Bunga Majemuk", type: "tool", route: "/investasi?app=bunga-majemuk" },
          { id: "roi-calc", name: "Return on Investment (ROI)", type: "tool", route: "/investasi?app=roi" },
        ],
      },
      {
        id: "fin-liabilities-expense",
        name: "Liabilities & Expense Control",
        description: "Pengendalian beban utang, kewajiban pajak, dan efisiensi pengeluaran.",
        pageId: "financial-planning-and-wealth-management",
        features: [
          { id: "kuadran-liabilitas", name: "Kuadran Liabilitas", type: "feature", route: "/liability" },
          { id: "kuadran-pengeluaran", name: "Kuadran Pengeluaran", type: "feature", route: "/expense" },
          { id: "kredit-utang", name: "Kredit & Utang", type: "feature", route: "/kredit" },
          { id: "langganan-tagihan", name: "Subscriptions", type: "feature", route: "/subscriptions" },
          { id: "wira-budget-app", name: "Budget & Cash Book (Wira)", type: "feature", route: "/budget" },
          { id: "wallet-app", name: "Wallet & Pocket", type: "feature", route: "/wallet" },
          { id: "pocket-app", name: "Recurring Pocket", type: "feature", route: "/pocket" },
          { id: "sub-manager-app", name: "Subscription Manager", type: "feature", route: "/subscription-manager" },
          { id: "peh-subscriptions-app", name: "Subscriptions (PEH)", type: "feature", route: "/peh/subscriptions" },
          { id: "life-budget-tracker-app", name: "Budget Tracker (Life OS)", type: "feature", route: "/life/budget-tracker" },
          { id: "life-subscriptions-app", name: "Subscriptions (Life OS)", type: "feature", route: "/life/subscriptions" },
        ],
        tools: [
          { id: "pph21-tool", name: "PPh 21 Personal", type: "tool", route: "/pajak?app=pph21" },
          { id: "pajak-saham", name: "Pajak Saham & Dividen", type: "tool", route: "/pajak?app=saham" },
          { id: "pajak-properti", name: "Pajak Properti", type: "tool", route: "/pajak?app=properti" },
        ],
      },
      {
        id: "fin-wealth-spectrum",
        name: "Wealth Spectrum 5 Tahapan",
        description: "Progression model kekayaan: Surety, Flow, Build, Grow, Legacy.",
        pageId: "financial-planning-and-wealth-management",
        features: [
          { id: "stage-surety", name: "Tahap 1: Surety", type: "feature", route: "/surety" },
          { id: "stage-flow", name: "Tahap 2: Flow", type: "feature", route: "/flow" },
          { id: "stage-build", name: "Tahap 3: Build", type: "feature", route: "/build" },
          { id: "stage-grow", name: "Tahap 4: Grow", type: "feature", route: "/grow" },
          { id: "stage-legacy", name: "Tahap 5: Legacy", type: "feature", route: "/legacy" },
        ],
        tools: [
          { id: "risk-profile-tool", name: "Profil Risiko & Alokasi", type: "tool", route: "/grow?tab=cat_profil" },
          { id: "rebalance-tool", name: "Rebalancing Periodik", type: "tool", route: "/grow?tab=cat_rebalance" },
        ],
      },
    ],
  },

  // 2. BUSINESS ADMINISTRATION AND OPERATIONS MANAGEMENT
  {
    id: "business-administration-and-operations-management",
    workspaceId: "mode_business",
    name: "Business Administration and Operations Management",
    description: "Operasional bisnis, pengadaan, logistik, katalog produk, dan 100 Strategic Frameworks.",
    route: "/business-administration-and-operations-management",
    badge: `${17 + CATEGORIES.length} Modul`,
    modules: [
      {
        id: "biz-strategic-management",
        name: "Strategic Frameworks",
        description: "Analisis lingkungan bisnis makro, 8 Pilar Strategis, 100 MBA Tools, dan strategi posisi bersaing.",
        pageId: "business-administration-and-operations-management",
        features: [
          { id: "strategic-planning", name: "Strategic Planning", type: "feature", route: "/business-administration-and-operations-management" },
        ],
        tools: [
          { id: "swot-tool", name: "SWOT Analysis", type: "tool", route: "/swot" },
          { id: "tows-tool", name: "TOWS Matrix", type: "tool", route: "/tows" },
          { id: "pestel-tool", name: "PESTEL Analysis", type: "tool", route: "/pestel" },
          { id: "porter-tool", name: "Porter's Five Forces", type: "tool", route: "/porter" },
          { id: "vrio-tool", name: "VRIO Framework", type: "tool", route: "/vrio" },
          { id: "value-chain-tool", name: "Value Chain Analysis", type: "tool", route: "/value-chain" },
          { id: "bcg-tool", name: "BCG Matrix", type: "tool", route: "/bcg" },
          { id: "ansoff-tool", name: "Ansoff Matrix", type: "tool", route: "/ansoff" },
          { id: "blue-ocean-tool", name: "Blue Ocean Strategy (ERRC)", type: "tool", route: "/blue-ocean" },
          { id: "value-disciplines-tool", name: "Value Disciplines Model", type: "tool", route: "/value-disciplines" },
        ],
      },
      {
        id: "biz-models-propositions",
        name: "Business Model dan Value Proposition",
        description: "Desain model bisnis dan validasi proposisi nilai pelanggan.",
        pageId: "business-administration-and-operations-management",
        features: [
          { id: "business-modeling", name: "Business Modeling", type: "feature", route: "/bmc" },
        ],
        tools: [
          { id: "bmc-tool", name: "Business Model Canvas (BMC)", type: "tool", route: "/bmc" },
          { id: "lean-canvas-tool", name: "Lean Canvas", type: "tool", route: "/lean-canvas" },
          { id: "vpc-tool", name: "Value Proposition Canvas", type: "tool", route: "/value-proposition-canvas" },
          { id: "empathy-map-tool", name: "Empathy Map", type: "tool", route: "/empathy-map" },
        ],
      },
      {
        id: "biz-procurement-supply",
        name: "Procurement Management",
        description: "Manajemen vendor, pesanan pembelian, dan inventaris barang.",
        pageId: "business-administration-and-operations-management",
        features: [
          { id: "procurement-system", name: "Procurement Management", type: "feature", route: "/peh/procurement" },
          { id: "vendor-system", name: "Vendor Management (PEH)", type: "feature", route: "/peh/vendors" },
          { id: "inventory-system", name: "Inventory Management", type: "feature", route: "/inventory" },
          { id: "catalog-system", name: "Product Catalog", type: "feature", route: "/katalog-produk" },
          { id: "client-system", name: "Client Management", type: "feature", route: "/klien" },
          { id: "customer-service-system", name: "Customer Service Management", type: "feature", route: "/portal" },
          { id: "partner-workspace", name: "Partner Workspace", type: "feature", route: "/partner" },
          { id: "resource-system", name: "Business Resource Management", type: "feature", route: "/expense-tracker" },
          { id: "asset-manager-system", name: "Business Asset Manager", type: "feature", route: "/asset-manager" },
          { id: "peh-assets-system", name: "Enterprise Assets (PEH)", type: "feature", route: "/peh/assets" },
          { id: "ip-licenses-system", name: "IP & Licenses (PEH)", type: "feature", route: "/peh/ip-licenses" },
          { id: "intellectual-property-system", name: "Intellectual Property", type: "feature", route: "/intellectual-property" },
          { id: "document-system", name: "Document Management", type: "feature", route: "/lainnya?app=mailroom" },
          { id: "performance-system", name: "Performance Management", type: "feature", route: "/goal-manager" },
          { id: "statistics-system", name: "Business Statistics", type: "feature", route: "/statistics" },
          { id: "reports-system", name: "Executive Reports", type: "feature", route: "/reports" },
          { id: "audit-log-system", name: "Audit & Access Log", type: "feature", route: "/audit-log" },
          { id: "workforce-system", name: "Workforce Management", type: "feature", route: "/lainnya?app=time-clock" },
          { id: "governance-system", name: "Corporate Governance", type: "feature", route: "/peh/compliance" },
          { id: "database-system", name: "Business Database", type: "feature", route: "/database" },
        ],
        tools: [
          { id: "incoterms-tool", name: "Incoterms Navigator", type: "tool", route: "/incoterms" },
          { id: "sipoc-tool", name: "SIPOC Diagram", type: "tool", route: "/framework/sipoc-diagram" },
          { id: "ppn-calc", name: "VAT and Other Taxes", type: "tool", route: "/pajak?app=ppn" },
        ],
      },
      {
        id: "biz-business-valuation",
        name: "Business Valuation",
        description: "Instrumen valuasi perusahaan terstandar MAPPI: Discounted Cash Flow (DCF), Market Multiples, dan Asset-Based Valuation.",
        pageId: "business-administration-and-operations-management",
        features: [],
        tools: [
          { id: "dcf-valuation-tool", name: "DCF Valuation", type: "tool", route: "/valuasi" },
          { id: "market-multiples-tool", name: "Market Multiples", type: "tool", route: "/valuasi" },
          { id: "asset-based-valuation-tool", name: "Asset-Based Valuation", type: "tool", route: "/valuasi" },
        ],
      },
    ],
  },

  // 3. PRODUCTIVITY WORKSPACE AND WORKFLOW SYSTEMS
  {
    id: "productivity-workspace-and-workflow-systems",
    workspaceId: "mode_employment",
    name: "Productivity Workspace and Workflow Systems",
    description: "Sistem eksekusi tugas, jadwal kalender, manajemen proyek, dan otomasi alur kerja.",
    route: "/productivity-workspace-and-workflow-systems",
    badge: "9 Modul",
    modules: [
      {
        id: "prod-task-execution",
        name: "Task & Time Execution",
        description: "Manajemen tugas harian, sprint kanban, dan alokasi waktu fokus.",
        pageId: "productivity-workspace-and-workflow-systems",
        features: [
          { id: "task-manager-app", name: "Task Manager", type: "feature", route: "/task-manager" },
          { id: "calendar-app", name: "Calendar", type: "feature", route: "/kalender" },
          { id: "kanban-app", name: "Kanban Board", type: "feature", route: "/kanban" },
          { id: "timeline-app", name: "Timeline Manager", type: "feature", route: "/timeline" },
          { id: "planner-app", name: "Planner", type: "feature", route: "/planner" },
        ],
        tools: [
          { id: "pomodoro-tool", name: "Focus Timer (Pomodoro)", type: "tool", route: "/pomodoro" },
          { id: "eisenhower-tool", name: "Eisenhower Matrix", type: "tool", route: "/eisenhower" },
          { id: "countdown-tool", name: "Countdown", type: "tool", route: "/countdown" },
        ],
      },
      {
        id: "prod-delivery-governance",
        name: "Project Governance & Delivery",
        description: "Pengendalian deliverable formal, milestone, dan alur persetujuan SLA.",
        pageId: "productivity-workspace-and-workflow-systems",
        features: [
          { id: "project-manager-app", name: "Project Manager", type: "feature", route: "/proyek" },
          { id: "peh-projects-app", name: "Projects (PEH)", type: "feature", route: "/peh/projects" },
          { id: "peh-tasks-app", name: "Tasks (PEH)", type: "feature", route: "/peh/tasks" },
          { id: "peh-workflows-app", name: "Workflows (PEH)", type: "feature", route: "/peh/workflows" },
          { id: "peh-meetings-app", name: "Meetings (PEH)", type: "feature", route: "/peh/meetings" },
          { id: "peh-milestones-app", name: "Milestones (PEH)", type: "feature", route: "/peh/milestones" },
          { id: "peh-incidents-app", name: "Incidents & Risk (PEH)", type: "feature", route: "/peh/incidents" },
          { id: "peh-cap-table-app", name: "Cap Table (PEH)", type: "feature", route: "/peh/cap-table" },
          { id: "deliverable-manager-app", name: "Deliverable Manager", type: "feature", route: "/deliverable-manager" },
          { id: "workflow-manager-app", name: "Workflow Manager", type: "feature", route: "/workflow-manager" },
          { id: "approval-manager-app", name: "Approval Manager", type: "feature", route: "/approval-manager" },
          { id: "meeting-manager-app", name: "Meeting Manager", type: "feature", route: "/meeting-manager" },
          { id: "reminder-manager-app", name: "Reminder Manager", type: "feature", route: "/reminder-manager" },
          { id: "schedule-manager-app", name: "Schedule Manager", type: "feature", route: "/schedule-manager" },
          { id: "resource-manager-app", name: "Resource Manager", type: "feature", route: "/resource-manager" },
          { id: "template-manager-app", name: "Template Manager", type: "feature", route: "/template-manager" },
          { id: "decision-log-app", name: "Decision Log", type: "feature", route: "/decision-log" },
          { id: "risk-management-app", name: "Risk Management", type: "feature", route: "/risk-management" },
          { id: "shareholder-registry-app", name: "Shareholder Registry", type: "feature", route: "/shareholder-registry" },
        ],
        tools: [
          { id: "goal-manager-tool", name: "Goal Manager", type: "tool", route: "/goal-manager" },
          { id: "milestone-tool", name: "Milestone & Roadmap", type: "tool", route: "/milestone-manager" },
          { id: "time-tracker-tool", name: "Time Tracker", type: "tool", route: "/time-tracker" },
          { id: "peh-time-audit-tool", name: "Time Audit", type: "tool", route: "/peh/time-audit" },
          { id: "search-manager-tool", name: "Search Manager", type: "tool", route: "/search-manager" },
        ],
      },
    ],
  },

  // 4. CREATIVE WORKSPACE AND MEDIA PRODUCTION
  {
    id: "creative-workspace-and-media-production",
    workspaceId: "mode_creative",
    name: "Creative Workspace and Media Production",
    description: "Studio perancangan, repositori kode, dokumentasi kreatif, dan produksi media.",
    route: "/creative-workspace-and-media-production",
    badge: "6 Modul",
    modules: [
      {
        id: "creative-studio",
        name: "Creative Studio & Publishing",
        description: "Laboratorium ide, kanvas visual, media produksi, dan repositori naskah/kode.",
        pageId: "creative-workspace-and-media-production",
        features: [
          { id: "ideas-feature", name: "Ideas and Concepts", type: "feature", route: "/ideas" },
          { id: "design-feature", name: "Design Studio (Wira)", type: "feature", route: "/design" },
          { id: "writing-feature", name: "Writing and Documentation", type: "feature", route: "/writing" },
          { id: "movies-feature", name: "Movies & Video (Wira)", type: "feature", route: "/movies" },
          { id: "music-feature", name: "Music & Audio (Wira)", type: "feature", route: "/music" },
          { id: "podcasts-feature", name: "Podcasts (Wira)", type: "feature", route: "/podcasts" },
          { id: "photography-feature", name: "Photography (Wira)", type: "feature", route: "/photography" },
          { id: "games-feature", name: "Interactive Games (Wira)", type: "feature", route: "/games" },
          { id: "catatan-feature", name: "Catatan Studio", type: "feature", route: "/catatan" },
        ],
        tools: [
          { id: "canvas-tool", name: "Whiteboard & Canvas", type: "tool", route: "/lainnya?app=canvas" },
          { id: "code-tool", name: "Code Studio (Wira)", type: "tool", route: "/code" },
          { id: "code-snippets-tool", name: "Code Snippet Repository", type: "tool", route: "/peh/code-snippet" },
        ],
      },
    ],
  },

  // 5. RESEARCH FOUNDATIONS AND REFERENCE FRAMEWORKS
  {
    id: "research-foundations-and-reference-frameworks",
    workspaceId: "mode_research",
    name: "Research Foundations and Reference Frameworks",
    description: "Pusat terpadu Markets, Academia, Intelligence, Consulting, dan Knowledge (5 kategori, 23 modul).",
    route: "/research-foundations-and-reference-frameworks",
    badge: "23 Modul",
    modules: [
      {
        id: "res-cat-business-research",
        name: "Markets",
        description: "Riset pasar, industri, kompetitor, pelanggan, dan peluang bisnis.",
        pageId: "research-foundations-and-reference-frameworks",
        features: [
          { id: "market-research-mod", name: "Market Research", type: "feature", route: "/research-foundations-and-reference-frameworks?module=market-research" },
          { id: "industry-research-mod", name: "Industry Research", type: "feature", route: "/research-foundations-and-reference-frameworks?module=industry-research" },
          { id: "competitor-research-mod", name: "Competitor Intelligence", type: "feature", route: "/research-foundations-and-reference-frameworks?module=competitor-research" },
          { id: "customer-research-mod", name: "Customer Intelligence", type: "feature", route: "/research-foundations-and-reference-frameworks?module=customer-research" },
          { id: "opportunity-research-mod", name: "Opportunity Analysis", type: "feature", route: "/research-foundations-and-reference-frameworks?module=opportunity-research" },
        ],
        tools: [],
      },
      {
        id: "res-cat-academic-research",
        name: "Academia",
        description: "Penelitian ilmiah, metodologi, literatur, penulisan akademik, dan publikasi.",
        pageId: "research-foundations-and-reference-frameworks",
        features: [
          { id: "research-design-app", name: "Research Workspace", type: "feature", route: "/research-manager" },
          { id: "literature-review-app", name: "Research Notes", type: "feature", route: "/notes" },
          { id: "research-methodology-mod", name: "Research Methods", type: "feature", route: "/research-foundations-and-reference-frameworks?module=research-methodology" },
          { id: "academic-writing-mod", name: "Academic Writing", type: "feature", route: "/research-foundations-and-reference-frameworks?module=academic-writing" },
          { id: "publication-research-mod", name: "Publication Resources", type: "feature", route: "/research-foundations-and-reference-frameworks?module=publication-research" },
        ],
        tools: [],
      },
      {
        id: "res-cat-business-intelligence",
        name: "Intelligence",
        description: "Pengumpulan, pengolahan, interpretasi, dan penyajian data untuk menghasilkan insight bisnis.",
        pageId: "research-foundations-and-reference-frameworks",
        features: [
          { id: "data-intelligence-mod", name: "Data Intelligence", type: "feature", route: "/research-foundations-and-reference-frameworks?module=data-intelligence" },
          { id: "business-insights-mod", name: "Business Intelligence", type: "feature", route: "/research-foundations-and-reference-frameworks?module=business-insights" },
          { id: "trend-analysis-mod", name: "Trend Intelligence", type: "feature", route: "/research-foundations-and-reference-frameworks?module=trend-analysis" },
          { id: "benchmarking-mod", name: "Benchmark Intelligence", type: "feature", route: "/research-foundations-and-reference-frameworks?module=benchmarking" },
        ],
        tools: [],
      },
      {
        id: "res-cat-consulting-research",
        name: "Consulting",
        description: "Riset klien, diagnosis perusahaan, studi kelayakan, dan dukungan rekomendasi konsultasi.",
        pageId: "research-foundations-and-reference-frameworks",
        features: [
          { id: "client-research-mod", name: "Client Intelligence", type: "feature", route: "/research-foundations-and-reference-frameworks?module=client-research" },
          { id: "business-diagnosis-mod", name: "Business Diagnostics", type: "feature", route: "/research-foundations-and-reference-frameworks?module=business-diagnosis" },
          { id: "feasibility-analysis-mod", name: "Feasibility Studies", type: "feature", route: "/research-foundations-and-reference-frameworks?module=feasibility-analysis" },
          { id: "strategic-research-mod", name: "Strategic Research", type: "feature", route: "/research-foundations-and-reference-frameworks?module=strategic-research" },
        ],
        tools: [],
      },
      {
        id: "res-cat-knowledge-references",
        name: "Knowledge",
        description: "Kerangka kerja bisnis, pengetahuan profesional, knowledge base, reading library, dan reference library.",
        pageId: "research-foundations-and-reference-frameworks",
        features: [
          { id: "knowledge-base-app", name: "Knowledge Repository", type: "feature", route: "/knowledge-base" },
          { id: "wiki-engine-app", name: "SOP Library", type: "feature", route: "/wiki" },
          { id: "kurasi-app", name: "Business Knowledge", type: "feature", route: "/kurasi" },
          { id: "reading-library-app", name: "Reading Library", type: "feature", route: "/reading" },
          { id: "bookmarks-app", name: "Bookmark Manager", type: "feature", route: "/bookmarks" },
          { id: "courses-app", name: "Study Courses", type: "feature", route: "/courses" },
          { id: "exams-app", name: "Exam Assessment", type: "feature", route: "/exams" },
          { id: "flashcards-app", name: "Flashcard Recall", type: "feature", route: "/flashcards" },
          { id: "languages-app", name: "Language Credentials", type: "feature", route: "/languages" },
          { id: "peh-knowledge-app", name: "Vault Archive", type: "feature", route: "/peh/knowledge" },
          { id: "peh-innovations-app", name: "Innovations Hub (PEH)", type: "feature", route: "/peh/innovations-hub" },
          { id: "peh-ecosystem-app", name: "Ecosystem Comparison (PEH)", type: "feature", route: "/peh/ecosystem-comparison" },
          { id: "peh-reading-app", name: "Reading Tracker", type: "feature", route: "/peh/reading" },
        ],
        tools: [
          { id: "web-clipper-tool", name: "Web Clipper", type: "tool", route: "/web-clipper" },
          { id: "framework-library-tool", name: "Framework Library", type: "tool", route: "/100-framework" },
          { id: "bcg-matrix-tool", name: "BCG Matrix", type: "tool", route: "/bcg" },
          { id: "porter-tool", name: "Porter's Five Forces", type: "tool", route: "/porter" },
          { id: "pestel-tool", name: "PESTEL Analysis", type: "tool", route: "/pestel" },
        ],
      },
    ],
  },

  // 6. ISLAMIC PRINCIPLES AND SHARIA VALUES
  {
    id: "islamic-principles-and-sharia-values",
    workspaceId: "mode_sharia",
    name: "Islamic Principles and Sharia Values",
    description:
      "Prinsip & etika Islam, keuangan sosial Islam, akad komersial, proteksi & titipan, zakat, investasi syariah, serta tata kelola dan kepatuhan syariah.",
    route: "/islamic-principles-and-sharia-values",
    badge: "20 Modul",
    modules: [
      {
        id: "sh-cat-principles-ethics",
        name: "Principles",
        description: "Referensi edukatif prinsip syariah, Maqasid al-Sharia, dan etika bisnis Islami.",
        pageId: "islamic-principles-and-sharia-values",
        features: [
          { id: "islamic-principles-library", name: "Islamic Principles Library", type: "feature", route: "/islamic-principles-and-sharia-values?module=islamic-principles-and-ethics" },
          { id: "islamic-business-ethics-guide", name: "Islamic Ethics Guide", type: "feature", route: "/islamic-principles-and-sharia-values?module=islamic-business-ethics" },
        ],
        tools: [
          { id: "maqasid-al-sharia-framework", name: "Maqasid al-Sharia Framework", type: "tool", route: "/islamic-principles-and-sharia-values?module=islamic-principles-and-ethics" },
          { id: "ethical-decision-assessment", name: "Ethical Decision Assessment", type: "tool", route: "/islamic-principles-and-sharia-values?module=islamic-business-ethics" },
        ],
      },
      {
        id: "sh-cat-social-finance",
        name: "Finance",
        description: "Tabarru' & hibah, Qardh Hasan, dan pengelolaan wakaf.",
        pageId: "islamic-principles-and-sharia-values",
        features: [
          { id: "tabarru-contract", name: "Tabarru' Contract", type: "feature", route: "/syariah/akad?app=tabarru" },
          { id: "family-hibah", name: "Family Hibah", type: "feature", route: "/syariah/akad?app=hibah" },
          { id: "infaq-sadaqah", name: "Infaq Sadaqah", type: "feature", route: "/zakat?app=infaq" },
          { id: "social-contribution-register", name: "Social Contribution Register", type: "feature", route: "/syariah/akad?app=tabarru" },
          { id: "qardh-ledger", name: "Qardh Ledger", type: "feature", route: "/syariah/akad?app=qardh" },
          { id: "principal-repayment-schedule", name: "Principal Repayment Schedule", type: "feature", route: "/syariah/akad?app=qardh" },
          { id: "debt-relief-terms", name: "Debt Relief Terms", type: "feature", route: "/syariah/akad?app=qardh" },
          { id: "cash-waqf", name: "Cash Waqf", type: "feature", route: "/syariah/akad?app=wakaf" },
          { id: "waqf-asset-register", name: "Waqf Asset Register", type: "feature", route: "/syariah/akad?app=wakaf" },
          { id: "nazhir-reporting", name: "Nazhir Reporting", type: "feature", route: "/syariah/akad?app=wakaf" },
          { id: "waqf-impact-analytics", name: "Waqf Impact Analytics", type: "feature", route: "/syariah/akad?app=wakaf" },
        ],
        tools: [
          { id: "qardh-hasan-shortcut", name: "Qardh Calculator", type: "tool", route: "/syariah/akad?app=qardh" },
        ],
      },
      {
        id: "sh-cat-commercial-contracts",
        name: "Contracts",
        description: "Akad Mudharabah, Musharakah, Murabaha, Ijarah, serta Salam dan Istisna.",
        pageId: "islamic-principles-and-sharia-values",
        features: [
          { id: "mudharabah-contract", name: "Mudharabah Contract", type: "feature", route: "/syariah/akad?app=mudharabah" },
          { id: "profit-loss-audit", name: "Profit Audit", type: "feature", route: "/syariah/akad?app=mudharabah" },
          { id: "profit-sharing-distribution-record", name: "Profit-Sharing Distribution Record", type: "feature", route: "/syariah/akad?app=mudharabah" },
          { id: "diminishing-musharakah", name: "Diminishing Musharakah", type: "feature", route: "/syariah/akad?app=musyarakah" },
          { id: "shirkah-contracts", name: "Shirkah Contracts", type: "feature", route: "/syariah/akad?app=musyarakah" },
          { id: "capital-ownership", name: "Capital Ownership", type: "feature", route: "/syariah/akad?app=musyarakah" },
          { id: "partnership-capital-tracker", name: "Partnership Capital Tracker", type: "feature", route: "/syariah/akad?app=musyarakah" },
          { id: "installment-schedule", name: "Installment Schedule", type: "feature", route: "/syariah/akad?app=murabahah" },
          { id: "asset-ownership-verification", name: "Asset Ownership Verification", type: "feature", route: "/syariah/akad?app=murabahah" },
          { id: "ijarah-contract", name: "Ijarah Contract", type: "feature", route: "/syariah/akad?app=ijarah" },
          { id: "asset-owner-responsibilities", name: "Asset Owner Responsibilities", type: "feature", route: "/syariah/akad?app=ijarah" },
          { id: "project-payment-milestones", name: "Project Payment Milestones", type: "feature", route: "/syariah/akad?app=istishna" },
          { id: "salam-commodity-contract", name: "Salam Commodity Contract", type: "feature", route: "/syariah/akad?app=salam" },
          { id: "specifications-quality-standards", name: "Quality Specifications", type: "feature", route: "/syariah/akad?app=istishna" },
        ],
        tools: [
          { id: "profit-sharing-calculator", name: "Profit-Sharing Calculator", type: "tool", route: "/syariah/akad?app=mudharabah" },
          { id: "murabaha-margin-calculator", name: "Murabaha Margin Calculator", type: "tool", route: "/syariah/akad?app=murabahah" },
          { id: "imbt-calculator", name: "IMBT Calculator", type: "tool", route: "/syariah/akad?app=ijarah" },
        ],
      },
      {
        id: "sh-cat-protection-deposits",
        name: "Protection",
        description: "Proteksi Takaful berbasis tabarru' serta penyimpanan amanah Wadiah.",
        pageId: "islamic-principles-and-sharia-values",
        features: [
          { id: "pool-dana-tabarru", name: "Tabarru' Pool", type: "feature", route: "/syariah/akad?app=takaful" },
          { id: "klaim-taawun", name: "Ta'awun Claims", type: "feature", route: "/syariah/akad?app=takaful" },
          { id: "takaful-contribution-tracker", name: "Takaful Contribution Tracker", type: "feature", route: "/syariah/akad?app=takaful" },
          { id: "wadiah-yad-dhamanah", name: "Wadiah Yad Dhamanah", type: "feature", route: "/syariah/akad?app=wadiah" },
          { id: "titipan-fisik-emas", name: "Physical Gold Custody", type: "feature", route: "/syariah/akad?app=wadiah" },
          { id: "buku-titipan", name: "Custody Book", type: "feature", route: "/syariah/akad?app=wadiah" },
        ],
        tools: [
          { id: "kalkulasi-surplus-underwriting", name: "Underwriting Surplus", type: "tool", route: "/syariah/akad?app=takaful" },
        ],
      },
      {
        id: "sh-cat-zakat-purification",
        name: "Zakat",
        description: "Zakat harta (maal), zakat penghasilan, dan zakat fitrah, fidyah, serta kaffarah.",
        pageId: "islamic-principles-and-sharia-values",
        features: [
          { id: "kalender-haul-354", name: "Haul Calendar", type: "feature", route: "/zakat?app=maal" },
          { id: "zakat-asset-classification-guide", name: "Wealth Classification Guide", type: "feature", route: "/zakat?app=maal" },
          { id: "histori-penyaluran-laz", name: "LAZ Distribution History", type: "feature", route: "/zakat?app=profesi" },
          { id: "panduan-kaffarah", name: "Kaffarah Guide", type: "feature", route: "/zakat?app=kaffarah" },
        ],
        tools: [
          { id: "live-tracker-nisab-emas", name: "Gold Nisab Tracker", type: "tool", route: "/zakat?app=maal" },
          { id: "zakat-saham-reksa-dana", name: "Zakat Securities", type: "tool", route: "/zakat?app=saham" },
          { id: "kalkulator-zakat-bulanan", name: "Monthly Zakat Calculator", type: "tool", route: "/zakat?app=profesi" },
          { id: "pengurang-biaya-pokok", name: "Cost Deduction", type: "tool", route: "/zakat?app=profesi" },
          { id: "konversi-sha-beras-rupiah", name: "Sha Rupiah Conversion", type: "tool", route: "/zakat?app=fitrah" },
          { id: "hitung-fidyah-harian", name: "Daily Fidyah", type: "tool", route: "/zakat?app=fidyah" },
        ],
      },
      {
        id: "sh-cat-investment",
        name: "Investment",
        description: "Penapisan saham syariah dan riwayat skrining efek syariah.",
        pageId: "islamic-principles-and-sharia-values",
        features: [
          { id: "non-halal-revenue", name: "Non-Halal Revenue (<10%)", type: "feature", route: "/100-komoditas?tab=syariah" },
          { id: "daftar-efek-syariah", name: "Sharia Securities List", type: "feature", route: "/100-komoditas?tab=syariah" },
          { id: "sharia-screening-history", name: "Sharia Screening History", type: "feature", route: "/100-komoditas?tab=syariah" },
        ],
        tools: [
          { id: "financial-ratio-screen", name: "Financial Ratio Screen (45%)", type: "tool", route: "/100-komoditas?tab=syariah" },
        ],
      },
      {
        id: "sh-cat-governance-compliance",
        name: "Governance",
        description: "Kepatuhan riba & gharar, tata kelola & audit syariah, serta standar & fatwa.",
        pageId: "islamic-principles-and-sharia-values",
        features: [
          { id: "identifikasi-riba-akad", name: "Riba Identification", type: "feature", route: "/syariah/terlarang?app=riba" },
          { id: "rujukan-fatwa-dsn-mui", name: "DSN-MUI Fatwa Guide", type: "feature", route: "/syariah/terlarang?app=fatwa" },
          { id: "riba-exposure-assessment", name: "Riba Exposure Assessment", type: "feature", route: "/syariah/terlarang?app=riba" },
          { id: "deteksi-spekulasi-maysir", name: "Maysir Detection", type: "feature", route: "/syariah/terlarang?app=maysir" },
          { id: "standar-syariah-aaoifi", name: "AAOIFI Standards", type: "feature", route: "/syariah/terlarang?app=aaoifi" },
          { id: "sharia-governance-dashboard", name: "Sharia Governance Dashboard", type: "feature", route: "/islamic-principles-and-sharia-values?module=sharia-governance-and-audit" },
          { id: "sharia-audit-workflow", name: "Sharia Audit Workflow", type: "feature", route: "/islamic-principles-and-sharia-values?module=sharia-governance-and-audit" },
          { id: "sharia-compliance-register", name: "Sharia Compliance Register", type: "feature", route: "/islamic-principles-and-sharia-values?module=sharia-governance-and-audit" },
          { id: "sharia-risk-assessment", name: "Sharia Risk Assessment", type: "feature", route: "/islamic-principles-and-sharia-values?module=sharia-governance-and-audit" },
          { id: "fatwa-and-ruling-library", name: "Fatwa Ruling Library", type: "feature", route: "/islamic-principles-and-sharia-values?module=sharia-standards-and-fatwa" },
          { id: "sharia-standards-directory", name: "Sharia Standards Directory", type: "feature", route: "/islamic-principles-and-sharia-values?module=sharia-standards-and-fatwa" },
          { id: "regulatory-and-fatwa-updates", name: "Standards Update Alerts", type: "feature", route: "/islamic-principles-and-sharia-values?module=sharia-standards-and-fatwa" },
        ],
        tools: [
          { id: "cleansing-dana-bunga", name: "Interest Cleansing", type: "tool", route: "/syariah/terlarang?app=cleansing" },
          { id: "cek-kejelasan-objek", name: "Object Clarity Check", type: "tool", route: "/syariah/terlarang?app=gharar" },
          { id: "fatwa-reference-tracker", name: "Fatwa Reference Tracker", type: "tool", route: "/islamic-principles-and-sharia-values?module=sharia-standards-and-fatwa" },
        ],
      },
    ],
  },

  // 7. PERSONAL LIFE MANAGEMENT
  {
    id: "personal-life-management",
    workspaceId: "mode_personal",
    name: "Personal Life Management",
    description: "Pusat pengelolaan kehidupan pribadi: Development, Wellness, Reflection, Administration, Finance, Learning, Lifestyle, serta Technology (8 kategori, 24 modul).",
    route: "/personal-life-management",
    badge: "24 Modul",
    modules: [
      {
        id: "per-cat-growth",
        name: "Development",
        description: "Pengembangan diri, tujuan hidup, kebiasaan, perencanaan, dan produktivitas pribadi.",
        pageId: "personal-life-management",
        features: [
          { id: "habit-tracker-app", name: "Habit Tracker", type: "feature", route: "/habit-tracker" },
          { id: "peh-habits-app", name: "Habits & Routines (PEH)", type: "feature", route: "/peh/habits" },
          { id: "peh-goals-app", name: "Personal Goals (PEH)", type: "feature", route: "/peh/goals" },
          { id: "life-habits-app", name: "Habits (Life OS)", type: "feature", route: "/life/habits" },
          { id: "life-planner-app", name: "Life Planner (Life OS)", type: "feature", route: "/life/life-planner" },
          { id: "personal-projects-app", name: "Personal Projects (Wira)", type: "feature", route: "/proyek-personal" },
        ],
        tools: [],
      },
      {
        id: "per-cat-health",
        name: "Wellness",
        description: "Kesehatan fisik, kebugaran, rekam medis, kesehatan mental, nutrisi, dan perawatan diri.",
        pageId: "personal-life-management",
        features: [
          { id: "workout-tracker-app", name: "Workout Tracker", type: "feature", route: "/health?tab=workouts" },
          { id: "workouts-wira-app", name: "Workouts Log (Wira)", type: "feature", route: "/workouts" },
          { id: "sleep-tracker-app", name: "Sleep Tracker", type: "feature", route: "/health?tab=sleep" },
          { id: "peh-fitness-app", name: "Fitness Tracker (PEH)", type: "feature", route: "/peh/fitness" },
          { id: "peh-sleep-app", name: "Sleep Quality (PEH)", type: "feature", route: "/peh/sleep" },
          { id: "body-metrics-app", name: "Body Metrics", type: "feature", route: "/health?tab=body-metrics" },
          { id: "water-tracker-app", name: "Water Tracker", type: "feature", route: "/water" },
          { id: "health-overview-app", name: "Health Overview", type: "feature", route: "/health" },
          { id: "medical-records-app", name: "Medical Records", type: "feature", route: "/health?tab=medical-records" },
          { id: "life-weight-app", name: "Weight Tracker (Life OS)", type: "feature", route: "/life/weight-tracker" },
          { id: "life-doctor-app", name: "Doctor Consultation (Life OS)", type: "feature", route: "/life/doctor-consultation" },
          { id: "vital-signs-app", name: "Vital Signs", type: "feature", route: "/health?tab=vitals" },
          { id: "medication-reminder-app", name: "Medication Reminder", type: "feature", route: "/lainnya?app=med-reminder" },
          { id: "skincare-tracker-app", name: "Skincare Tracker", type: "feature", route: "/health?tab=skincare" },
          { id: "mental-wellbeing-mod", name: "Mental Wellbeing", type: "feature", route: "/personal-life-management?module=mental-wellbeing" },
        ],
        tools: [],
      },
      {
        id: "per-cat-reflection",
        name: "Reflection",
        description: "Jurnal pribadi, rasa syukur, pelacakan suasana hati, dan evaluasi kehidupan.",
        pageId: "personal-life-management",
        features: [
          { id: "daily-journal-app", name: "Daily Journal", type: "feature", route: "/journal" },
          { id: "peh-journal-app", name: "Journal & Mood (PEH)", type: "feature", route: "/peh/journal" },
          { id: "life-journal-app", name: "Journal (Life OS)", type: "feature", route: "/life/journal" },
          { id: "life-notes-app", name: "Personal Notes (Life OS)", type: "feature", route: "/life/notes" },
          { id: "gratitude-journal-app", name: "Gratitude Journal", type: "feature", route: "/journal?tab=gratitude" },
          { id: "mood-tracker-app", name: "Mood Tracker", type: "feature", route: "/journal?tab=mood" },
          { id: "life-reflection-mod", name: "Life Reflection", type: "feature", route: "/personal-life-management?module=life-reflection" },
        ],
        tools: [],
      },
      {
        id: "per-cat-administration",
        name: "Administration",
        description: "Dokumen identitas pribadi, penjadwalan agenda individu, dan catatan penting pribadi.",
        pageId: "personal-life-management",
        features: [
          { id: "personal-documents-mod", name: "Personal Documents", type: "feature", route: "/personal-life-management?module=personal-documents" },
          { id: "peh-documents-app", name: "Document Vault (PEH)", type: "feature", route: "/peh/documents" },
          { id: "life-certificate-app", name: "Certificate Tracker (Life OS)", type: "feature", route: "/life/certificate-tracker" },
          { id: "personal-scheduling-mod", name: "Personal Scheduling", type: "feature", route: "/personal-life-management?module=personal-scheduling" },
          { id: "personal-records-mod", name: "Personal Records", type: "feature", route: "/personal-life-management?module=personal-records" },
        ],
        tools: [],
      },
      {
        id: "per-cat-finance",
        name: "Finance",
        description: "Anggaran pribadi, pemasukan dan pengeluaran harian, serta tabungan tujuan individu.",
        pageId: "personal-life-management",
        features: [
          { id: "personal-budgeting-mod", name: "Personal Finance", type: "feature", route: "/personal-life-management?module=personal-budgeting" },
          { id: "income-expense-mod", name: "Cash Flow", type: "feature", route: "/personal-life-management?module=income-and-expense-tracking" },
          { id: "wishlist-savings-app", name: "Savings Wishlist", type: "feature", route: "/life/wishlist" },
        ],
        tools: [],
      },
      {
        id: "per-cat-learning",
        name: "Learning",
        description: "Pembelajaran mandiri, pengembangan keterampilan, bacaan, dan pengetahuan pribadi.",
        pageId: "personal-life-management",
        features: [
          { id: "personal-learning-mod", name: "Personal Learning", type: "feature", route: "/personal-life-management?module=personal-learning" },
          { id: "skills-development-mod", name: "Skills Development", type: "feature", route: "/personal-life-management?module=skills-development" },
          { id: "reading-knowledge-mod", name: "Knowledge Resources", type: "feature", route: "/personal-life-management?module=reading-and-knowledge" },
        ],
        tools: [],
      },
      {
        id: "per-cat-lifestyle",
        name: "Lifestyle",
        description: "Hobi, minat pribadi, perjalanan, pengalaman hidup, dan inventaris barang individu.",
        pageId: "personal-life-management",
        features: [
          { id: "hobbies-interests-mod", name: "Personal Interests", type: "feature", route: "/personal-life-management?module=hobbies-and-interests" },
          { id: "travel-experiences-mod", name: "Travel Experiences", type: "feature", route: "/trips" },
          { id: "life-travel-app", name: "Travel Backpack (Life OS)", type: "feature", route: "/life/travel-backpack" },
          { id: "pouch-travel-app", name: "Travel Pouch", type: "feature", route: "/pouch" },
          { id: "weather-app", name: "Weather Monitor (Wira)", type: "feature", route: "/weather" },
          { id: "life-movies-app", name: "Movie Tracker (Life OS)", type: "feature", route: "/life/movie-tracker" },
          { id: "personal-inventory-mod", name: "Personal Assets", type: "feature", route: "/personal-life-management?module=personal-inventory" },
        ],
        tools: [],
      },
      {
        id: "per-cat-security-utilities",
        name: "Technology",
        description: "Keamanan kata sandi, privasi digital, kalkulator, dan utilitas pribadi.",
        pageId: "personal-life-management",
        features: [
          { id: "passwords-app", name: "Passwords", type: "feature", route: "/passwords" },
          { id: "vault-app", name: "Security Vault", type: "feature", route: "/vault" },
          { id: "peh-vault-app", name: "Identity & Security Vault (PEH)", type: "feature", route: "/peh/vault" },
          { id: "digital-privacy-mod", name: "Digital Privacy", type: "feature", route: "/personal-life-management?module=digital-privacy" },
        ],
        tools: [
          { id: "calculator-utilities-tool", name: "Utility Calculator", type: "tool", route: "/kalkulator" },
        ],
      },
    ],
  },

  // 8. HOUSEHOLD PLANNING AND FAMILY RECORDS
  {
    id: "household-planning-and-family-records",
    workspaceId: "mode_family",
    name: "Household Planning and Family Records",
    description: "Pusat pengelolaan keluarga dan rumah tangga: Family, Operations, Finance, Property, Culinary, Safety, Mobility, serta Administration (8 kategori, 24 modul).",
    route: "/household-planning-and-family-records",
    badge: "24 Modul",
    modules: [
      {
        id: "fam-cat-family-management",
        name: "Family",
        description: "Silsilah keluarga, sejarah & tradisi, keanggotaan keluarga, aturan rumah, tanggung jawab bersama, dan agenda keluarga.",
        pageId: "household-planning-and-family-records",
        features: [
          { id: "family-tree-app", name: "Family Tree", type: "feature", route: "/peh/family-tree" },
          { id: "family-history-app", name: "Family History", type: "feature", route: "/peh/traditions" },
          { id: "family-members-mod", name: "Family Members", type: "feature", route: "/household-planning-and-family-records?module=family-members" },
          { id: "household-rules-app", name: "Household Rules", type: "feature", route: "/lainnya?app=family-rules" },
        ],
        tools: [],
      },
      {
        id: "fam-cat-household-operations",
        name: "Operations",
        description: "Operasional rumah tangga harian, pekerjaan rumah, pemeliharaan bangunan, kebun, dan hewan peliharaan.",
        pageId: "household-planning-and-family-records",
        features: [
          { id: "household-chores-app", name: "Household Chores", type: "feature", route: "/peh/chores" },
          { id: "home-maintenance-app", name: "Home Maintenance Log", type: "feature", route: "/peh/maintenance" },
          { id: "garden-management-app", name: "Garden Management", type: "feature", route: "/peh/plants" },
          { id: "pet-care-app", name: "Pet Care", type: "feature", route: "/peh/pet-care" },
        ],
        tools: [],
      },
      {
        id: "fam-cat-household-finance",
        name: "Finance",
        description: "Anggaran rumah tangga bersama, pengeluaran harian keluarga, serta jadwal tagihan dan pembayaran rumah.",
        pageId: "household-planning-and-family-records",
        features: [
          { id: "family-budget-app", name: "Family Budget", type: "feature", route: "/peh/family-budget" },
          { id: "bills-payments-mod", name: "Financial Obligations", type: "feature", route: "/household-planning-and-family-records?module=bills-and-payments" },
        ],
        tools: [
          { id: "family-expense-tool", name: "Expense Tracker", type: "tool", route: "/peh/budget" },
        ],
      },
      {
        id: "fam-cat-home-property",
        name: "Property",
        description: "Dokumen properti tempat tinggal, inventaris aset rumah tangga, garansi barang, dan analitik utilitas.",
        pageId: "household-planning-and-family-records",
        features: [
          { id: "property-records-mod", name: "Property Records", type: "feature", route: "/household-planning-and-family-records?module=property-records" },
          { id: "home-inventory-mod", name: "Household Assets", type: "feature", route: "/household-planning-and-family-records?module=home-inventory" },
          { id: "life-household-app", name: "Household Tracker", type: "feature", route: "/life/household-tracker" },
          { id: "trunk-household-app", name: "Household Trunk", type: "feature", route: "/trunk" },
          { id: "home-utilities-mod", name: "Home Utilities", type: "feature", route: "/household-planning-and-family-records?module=home-utilities" },
        ],
        tools: [],
      },
      {
        id: "fam-cat-food-kitchen",
        name: "Culinary",
        description: "Koleksi resep masakan, resep warisan keluarga, perencanaan menu mingguan, stok pantry, dan daftar belanja.",
        pageId: "household-planning-and-family-records",
        features: [
          { id: "recipe-collection-app", name: "Recipe Collection", type: "feature", route: "/recipes" },
          { id: "family-recipes-app", name: "Family Recipes", type: "feature", route: "/peh/family-recipes" },
          { id: "meal-planning-mod", name: "Food Planning", type: "feature", route: "/household-planning-and-family-records?module=meal-planning" },
          { id: "pantry-inventory-app", name: "Pantry Inventory", type: "feature", route: "/peh/pantry" },
        ],
        tools: [
          { id: "grocery-list-tool", name: "Grocery List", type: "tool", route: "/shopping" },
        ],
      },
      {
        id: "fam-cat-safety-wellbeing",
        name: "Safety",
        description: "Kontak darurat keluarga, rekam kesehatan keluarga terpusat, serta panduan kesiapsiagaan darurat.",
        pageId: "household-planning-and-family-records",
        features: [
          { id: "emergency-contacts-app", name: "Emergency Contacts", type: "feature", route: "/lainnya?app=emergency-hub" },
          { id: "family-health-app", name: "Family Health Records", type: "feature", route: "/peh/family-health" },
          { id: "emergency-prep-app", name: "Emergency Preparedness", type: "feature", route: "/lainnya?app=disaster-prep" },
        ],
        tools: [],
      },
      {
        id: "fam-cat-vehicles-mobility",
        name: "Mobility",
        description: "Registri kendaraan, catatan jarak tempuh dan BBM, jadwal servis berkala, serta perencanaan mobilitas.",
        pageId: "household-planning-and-family-records",
        features: [
          { id: "vehicle-registry-app", name: "Vehicle Registry", type: "feature", route: "/peh/vehicles" },
          { id: "mileage-fuel-app", name: "Fuel Mileage Log", type: "feature", route: "/lainnya?app=mileage-fuel" },
          { id: "vehicle-maintenance-app", name: "Vehicle Maintenance Schedule", type: "feature", route: "/lainnya?app=vehicle-service" },
          { id: "mobility-planning-mod", name: "Family Mobility", type: "feature", route: "/household-planning-and-family-records?module=mobility-planning" },
        ],
        tools: [],
      },
      {
        id: "fam-cat-family-administration",
        name: "Administration",
        description: "Dokumen resmi keluarga, kalender bersama keluarga, dan perpustakaan arsip kenangan rumah tangga.",
        pageId: "household-planning-and-family-records",
        features: [
          { id: "family-documents-mod", name: "Family Documents", type: "feature", route: "/household-planning-and-family-records?module=family-documents" },
          { id: "family-calendar-mod", name: "Family Scheduling", type: "feature", route: "/household-planning-and-family-records?module=family-calendar" },
          { id: "family-archives-mod", name: "Family Archives", type: "feature", route: "/household-planning-and-family-records?module=family-archives" },
        ],
        tools: [],
      },
    ],
  },

  // 9. POLICY AFFAIRS AND PUBLIC RELATIONS
  {
    id: "policy-affairs-and-public-relations",
    workspaceId: "mode_public_affairs",
    name: "Policy Affairs and Public Relations",
    description: "Pusat pengelolaan urusan komunitas, layanan publik, kebijakan dan tata kelola, advokasi masyarakat, hubungan publik, serta hubungan kelembagaan (6 kategori, 18 modul).",
    route: "/policy-affairs-and-public-relations",
    badge: "18 Modul",
    modules: [
      {
        id: "pub-cat-community-affairs",
        name: "Community",
        description: "Pengelolaan komunitas warga, kalender acara masyarakat, dan pengembangan komunitas.",
        pageId: "policy-affairs-and-public-relations",
        features: [
          { id: "resident-directory-app", name: "Resident Directory", type: "feature", route: "/komunitas-warga" },
          { id: "community-fund-app", name: "Community Fund", type: "feature", route: "/komunitas-warga" },
          { id: "civic-letters-app", name: "Civic Letters", type: "feature", route: "/komunitas-warga" },
          { id: "peh-volunteering-app", name: "Volunteer Outreach", type: "feature", route: "/peh/volunteering" },
          { id: "peh-charity-app", name: "Charity Impact", type: "feature", route: "/peh/charity" },
          { id: "community-calendar-app", name: "Community Calendar", type: "feature", route: "/lainnya?app=civic-calendar" },
          { id: "meeting-schedule-app", name: "Meeting Schedule", type: "feature", route: "/calendar" },
          { id: "meeting-minutes-app", name: "Meeting Minutes", type: "feature", route: "/meeting-manager" },
          { id: "community-dev-mod", name: "Community Development", type: "feature", route: "/policy-affairs-and-public-relations?module=community-development" },
        ],
        tools: [],
      },
      {
        id: "pub-cat-public-services",
        name: "Services",
        description: "Panduan layanan publik, administrasi sipil, dan pemantauan kinerja pelayanan masyarakat.",
        pageId: "policy-affairs-and-public-relations",
        features: [
          { id: "civic-services-guide-app", name: "Civic Services Guide", type: "feature", route: "/lainnya?app=public-services-guide" },
          { id: "peh-civic-app", name: "Civic Services Hub", type: "feature", route: "/peh/civic" },
          { id: "document-requirements-app", name: "Document Requirements", type: "feature", route: "/documents" },
          { id: "public-office-directory-app", name: "Public Office Directory", type: "feature", route: "/contacts" },
          { id: "civic-administration-mod", name: "Civic Administration", type: "feature", route: "/policy-affairs-and-public-relations?module=civic-administration" },
          { id: "public-service-perf-mod", name: "Service Performance", type: "feature", route: "/policy-affairs-and-public-relations?module=public-service-performance" },
        ],
        tools: [],
      },
      {
        id: "pub-cat-policy-governance",
        name: "Governance",
        description: "Kepatuhan regulasi, penelitian kebijakan, pengembangan kebijakan, dan pemantauan legislasi.",
        pageId: "policy-affairs-and-public-relations",
        features: [
          { id: "compliance-tracker-app", name: "Compliance Tracker", type: "feature", route: "/peh/compliance" },
          { id: "legal-compliance-audit-app", name: "Legal Compliance Audit", type: "feature", route: "/surety?tab=cat_kepatuhan" },
          { id: "regulatory-library-app", name: "Regulatory Library", type: "feature", route: "/documents" },
          { id: "policy-research-mod", name: "Policy Research", type: "feature", route: "/policy-affairs-and-public-relations?module=policy-research" },
          { id: "policy-development-mod", name: "Policy Development", type: "feature", route: "/policy-affairs-and-public-relations?module=policy-development" },
          { id: "legislative-monitoring-mod", name: "Legislative Affairs", type: "feature", route: "/policy-affairs-and-public-relations?module=legislative-monitoring" },
        ],
        tools: [],
      },
      {
        id: "pub-cat-public-engagement",
        name: "Engagement",
        description: "Advokasi publik, konsultasi masyarakat, penjaringan aspirasi, dan intelijen opini publik.",
        pageId: "policy-affairs-and-public-relations",
        features: [
          { id: "public-feedback-app", name: "Public Feedback", type: "feature", route: "/peh/advocacy" },
          { id: "policy-proposals-app", name: "Policy Proposals", type: "feature", route: "/notes" },
          { id: "public-consultation-mod", name: "Public Consultation", type: "feature", route: "/policy-affairs-and-public-relations?module=public-consultation" },
          { id: "public-opinion-intel-mod", name: "Public Sentiment", type: "feature", route: "/policy-affairs-and-public-relations?module=public-opinion-intelligence" },
        ],
        tools: [
          { id: "public-opinion-survey-tool", name: "Public Opinion Survey", type: "tool", route: "/forms" },
        ],
      },
      {
        id: "pub-cat-public-relations",
        name: "Relations",
        description: "Komunikasi resmi publik, siaran pers, hubungan media massa, dan hubungan pemangku kepentingan.",
        pageId: "policy-affairs-and-public-relations",
        features: [
          { id: "press-releases-app", name: "Press Releases", type: "feature", route: "/peh/global-overview" },
          { id: "stakeholder-updates-app", name: "Stakeholder Updates", type: "feature", route: "/notification-center" },
          { id: "media-monitoring-app", name: "Media Monitoring", type: "feature", route: "/web-clipper" },
          { id: "media-relations-mod", name: "Media Affairs", type: "feature", route: "/policy-affairs-and-public-relations?module=media-relations" },
          { id: "stakeholder-relations-mod", name: "Stakeholder Affairs", type: "feature", route: "/policy-affairs-and-public-relations?module=stakeholder-relations" },
        ],
        tools: [],
      },
      {
        id: "pub-cat-institutional-relations",
        name: "Institutions",
        description: "Hubungan kelembagaan pemerintah serta koordinasi program dan aksi antarinstansi.",
        pageId: "policy-affairs-and-public-relations",
        features: [
          { id: "government-relations-mod", name: "Government Affairs", type: "feature", route: "/policy-affairs-and-public-relations?module=government-relations" },
          { id: "interagency-coord-mod", name: "Institutional Coordination", type: "feature", route: "/policy-affairs-and-public-relations?module=interagency-coordination" },
        ],
        tools: [],
      },
    ],
  },

  // 10. CONTACT DIRECTORY AND SOCIAL NETWORKS
  {
    id: "contact-directory-and-social-networks",
    workspaceId: "mode_networks",
    name: "Contact Directory and Social Networks",
    description:
      "Direktori identitas dan kontak, manajemen relasi, grup dan komunitas, jejaring profesional, pelibatan sosial, serta komunikasi dan koordinasi.",
    route: "/contact-directory-and-social-networks",
    badge: "18 Modul",
    modules: [
      {
        id: "social-identity-directories",
        name: "Directory",
        description: "Direktori identitas tunggal, buku alamat kontak, dan direktori organisasi eksternal.",
        pageId: "contact-directory-and-social-networks",
        features: [
          { id: "identity-profiles", name: "Identity Profiles", type: "feature", route: "/people-manager" },
          { id: "org-membership", name: "Organization Membership", type: "feature", route: "/people-manager" },
          { id: "contact-list", name: "Contact List", type: "feature", route: "/peh/contacts" },
          { id: "strategic-partners", name: "Strategic Partners", type: "feature", route: "/contacts" },
          { id: "address-book", name: "Address Book", type: "feature", route: "/klien" },
          { id: "organization-profiles", name: "Organization Profiles", type: "feature", route: "/contact-directory-and-social-networks?module=organization-directory" },
        ],
        tools: [
          { id: "role-mapping", name: "Role Mapping", type: "tool", route: "/people-manager" },
          { id: "organization-relationship-map", name: "Organization Relationship Map", type: "tool", route: "/contact-directory-and-social-networks?module=organization-directory" },
        ],
      },
      {
        id: "social-relationship-management",
        name: "Relationships",
        description: "Riwayat interaksi komunikasi, koneksi personal, dan analitik kesehatan relasi.",
        pageId: "contact-directory-and-social-networks",
        features: [
          { id: "follow-up-schedule", name: "Follow-Up Schedule", type: "feature", route: "/interaction-manager" },
          { id: "discussion-history", name: "Discussion History", type: "feature", route: "/meeting-manager" },
          { id: "personal-relationship-planner", name: "Personal Relationship Planner", type: "feature", route: "/contact-directory-and-social-networks?module=personal-connections" },
          { id: "important-dates-register", name: "Important Dates Register", type: "feature", route: "/contact-directory-and-social-networks?module=personal-connections" },
          { id: "relationship-health-analytics", name: "Relationship Health Analytics", type: "feature", route: "/contact-directory-and-social-networks?module=relationship-insights" },
          { id: "network-overview-dashboard", name: "Network Overview Dashboard", type: "feature", route: "/contact-directory-and-social-networks?module=relationship-insights" },
        ],
        tools: [],
      },
      {
        id: "social-groups-communities",
        name: "Communities",
        description: "Lingkaran sosial, partisipasi komunitas, serta administrasi keanggotaan dan pedoman grup.",
        pageId: "contact-directory-and-social-networks",
        features: [
          { id: "relationship-groups", name: "Relationship Groups", type: "feature", route: "/lainnya?app=circle-groups" },
          { id: "alumni-communities", name: "Alumni Communities", type: "feature", route: "/peh/community-events" },
          { id: "group-collaboration", name: "Group Collaboration", type: "feature", route: "/collaboration" },
          { id: "community-activity-calendar", name: "Community Activity Calendar", type: "feature", route: "/contact-directory-and-social-networks?module=community-engagement" },
          { id: "community-participation-tracker", name: "Community Participation Tracker", type: "feature", route: "/contact-directory-and-social-networks?module=community-engagement" },
          { id: "group-membership-register", name: "Group Membership Register", type: "feature", route: "/contact-directory-and-social-networks?module=community-administration" },
          { id: "community-guidelines", name: "Community Guidelines", type: "feature", route: "/contact-directory-and-social-networks?module=community-administration" },
        ],
        tools: [],
      },
      {
        id: "social-professional-networks",
        name: "Professional",
        description: "Jejaring karir, program mentorship dan dewan penasihat, serta pengembangan kemitraan.",
        pageId: "contact-directory-and-social-networks",
        features: [
          { id: "mentorship-sessions", name: "Mentorship Sessions", type: "feature", route: "/peh/mentorship" },
          { id: "professional-introductions", name: "Professional Introductions", type: "feature", route: "/peh/introductions" },
          { id: "advisory-board", name: "Board Members", type: "feature", route: "/klien" },
          { id: "mentorship-program-planner", name: "Mentorship Program Planner", type: "feature", route: "/contact-directory-and-social-networks?module=mentorship-and-advisory" },
          { id: "advisory-board-register", name: "Advisory Board Register", type: "feature", route: "/contact-directory-and-social-networks?module=mentorship-and-advisory" },
          { id: "partnership-pipeline", name: "Partnership Pipeline", type: "feature", route: "/contact-directory-and-social-networks?module=partnership-networks" },
          { id: "partnership-directory", name: "Partnership Directory", type: "feature", route: "/contact-directory-and-social-networks?module=partnership-networks" },
        ],
        tools: [
          { id: "career-network-map", name: "Career Network Map", type: "tool", route: "/peh/mentorship" },
        ],
      },
      {
        id: "social-engagement",
        name: "Engagement",
        description: "Perayaan, riwayat hadiah, acara sosial, serta pelacakan apresiasi dan penghargaan.",
        pageId: "contact-directory-and-social-networks",
        features: [
          { id: "gift-history", name: "Gift History", type: "feature", route: "/lainnya?app=gift-tracker" },
          { id: "anniversary-calendar", name: "Anniversary Calendar", type: "feature", route: "/peh/gifts" },
          { id: "greeting-cards", name: "Greeting Cards", type: "feature", route: "/notes" },
          { id: "social-event-planner", name: "Social Event Planner", type: "feature", route: "/contact-directory-and-social-networks?module=social-events" },
          { id: "event-invitations", name: "Event Invitations", type: "feature", route: "/contact-directory-and-social-networks?module=social-events" },
          { id: "recognition-tracker", name: "Recognition Tracker", type: "feature", route: "/contact-directory-and-social-networks?module=recognition-and-appreciation" },
        ],
        tools: [],
      },
      {
        id: "social-communication-coordination",
        name: "Communication",
        description: "Saluran komunikasi, perencanaan interaksi berkala, dan otomatisasi tindak lanjut relasi.",
        pageId: "contact-directory-and-social-networks",
        features: [
          { id: "communication-preference-profiles", name: "Communication Preference Profiles", type: "feature", route: "/contact-directory-and-social-networks?module=communication-channels" },
          { id: "interaction-planning-mod", name: "Interaction Management", type: "feature", route: "/contact-directory-and-social-networks?module=interaction-planning" },
          { id: "interaction-log", name: "Interaction Log", type: "feature", route: "/interaction-manager" },
          { id: "relationship-follow-up-automations", name: "Relationship Follow-Up Automations", type: "feature", route: "/contact-directory-and-social-networks?module=network-coordination" },
        ],
        tools: [],
      },
    ],
  },
]);

// -----------------------------------------------------------------------------
// Lookup and Query Helpers
// -----------------------------------------------------------------------------

export function getTaxonomyPage(pageId: string): TaxonomyPage | undefined {
  return PRODUCT_TAXONOMY.find((p) => p.id === pageId);
}

export function getAllModules(): readonly TaxonomyModule[] {
  return PRODUCT_TAXONOMY.flatMap((p) => p.modules);
}

export function getModuleById(moduleId: string): TaxonomyModule | undefined {
  return getAllModules().find((m) => m.id === moduleId);
}

export function getModulesForPage(pageId: string): readonly TaxonomyModule[] {
  return getTaxonomyPage(pageId)?.modules ?? [];
}

export function getToolsForModule(moduleId: string): readonly TaxonomyItem[] {
  return getModuleById(moduleId)?.tools ?? [];
}

export function getFeaturesForModule(moduleId: string): readonly TaxonomyItem[] {
  return getModuleById(moduleId)?.features ?? [];
}

/**
 * Searches the taxonomy tree for an item matching a given route or identifier.
 */
export function findTaxonomyItemByRoute(routeOrPath: string): {
  page?: TaxonomyPage;
  module?: TaxonomyModule;
  item?: TaxonomyItem;
} {
  const clean = routeOrPath.split("?")[0].replace(/\/+$/, "") || "/";
  for (const page of PRODUCT_TAXONOMY) {
    if (page.route === clean) {
      return { page };
    }
    for (const mod of page.modules) {
      const toolMatch = mod.tools.find((t) => t.route.split("?")[0] === clean);
      if (toolMatch) {
        return { page, module: mod, item: toolMatch };
      }
      const featureMatch = mod.features.find((f) => f.route.split("?")[0] === clean);
      if (featureMatch) {
        return { page, module: mod, item: featureMatch };
      }
    }
  }
  return {};
}

export function getUnifiedWorkspaceForPage(
  pageId: string,
): UnifiedWorkspaceDef | undefined {
  return getUnifiedWorkspaceById(pageId);
}

/**
 * Resolves any application route (SaaS Inti, /peh/*, /life/*, Wira, Frameworks)
 * to its Level-1 WorkspaceId in the 10-Laman Taxonomy.
 */
export function resolveWorkspaceIdForRoute(
  routeOrPath: string,
): WorkspaceId | undefined {
  const clean = (routeOrPath || "").split("?")[0].replace(/\/+$/, "") || "/";
  if (clean === "/") return undefined;

  for (const page of PRODUCT_TAXONOMY) {
    if (page.route === clean) return page.workspaceId;
    for (const mod of page.modules) {
      if (mod.tools.some((t) => t.route.split("?")[0] === clean)) {
        return page.workspaceId;
      }
      if (mod.features.some((f) => f.route.split("?")[0] === clean)) {
        return page.workspaceId;
      }
    }
  }
  return undefined;
}

