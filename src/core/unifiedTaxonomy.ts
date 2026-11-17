import type { LucideIcon } from "lucide-react";
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
  LayoutDashboard,
  Sparkles,
  Wrench,
  GitBranch,
  Zap,
  BarChart3,
  FileCode2,
  Database,
  BookOpen,
  Settings,
} from "lucide-react";

// ============================================================================
// LEVEL 1: 10 MASTER WORKSPACES (LAMAN UTAMA)
// ============================================================================
export const WORKSPACE_IDS = [
  "financial",
  "mode_business",
  "mode_employment",
  "mode_creative",
  "mode_research",
  "mode_sharia",
  "mode_personal",
  "mode_family",
  "mode_public_affairs",
  "mode_networks",
] as const;

export type WorkspaceId = (typeof WORKSPACE_IDS)[number];

export interface UnifiedWorkspaceMeta {
  readonly id: WorkspaceId;
  readonly code: string;
  readonly modeId: string;
  readonly taxonomyPageId: string;
  readonly labelId: string;
  readonly labelEn: string;
  readonly description: string;
  readonly routePath: string;
  readonly icon: LucideIcon;
  readonly defaultBadge: string;
}

export type UnifiedWorkspaceDef = UnifiedWorkspaceMeta;

export const UNIFIED_WORKSPACES: readonly UnifiedWorkspaceDef[] = Object.freeze([
  {
    id: "financial",
    code: "01-financial-planning-and-wealth-management",
    modeId: "financial",
    taxonomyPageId: "financial-planning-and-wealth-management",
    labelId: "Perencanaan Keuangan & Kekayaan",
    labelEn: "Financial Planning and Wealth Management",
    description:
      "Perencanaan keuangan terpadu, 5 tahapan kekayaan (Surety, Flow, Build, Grow, Legacy), kuadran aset, dan valuasi bisnis.",
    routePath: "/financial-planning-and-wealth-management",
    icon: Coins,
    defaultBadge: "5 Tahapan",
  },
  {
    id: "mode_business",
    code: "02-business-administration-and-operations-management",
    modeId: "business",
    taxonomyPageId: "business-administration-and-operations-management",
    labelId: "Administrasi & Operasional Bisnis",
    labelEn: "Business Administration and Operations Management",
    description:
      "Operasional bisnis, pengadaan, klien, SDM, aset, tata kelola perusahaan, dan 100 Strategic Frameworks.",
    routePath: "/business-administration-and-operations-management",
    icon: Store,
    defaultBadge: "28+ Modul",
  },
  {
    id: "mode_employment",
    code: "03-productivity-workspace-and-workflow-systems",
    modeId: "employment",
    taxonomyPageId: "productivity-workspace-and-workflow-systems",
    labelId: "Ruang Produktivitas & Sistem Alur Kerja",
    labelEn: "Productivity Workspace and Workflow Systems",
    description:
      "Sistem eksekusi proyek, manajemen tugas, kanban, jadwal kalender, deliverable, dan otomasi alur kerja.",
    routePath: "/productivity-workspace-and-workflow-systems",
    icon: Briefcase,
    defaultBadge: "9 Modul",
  },
  {
    id: "mode_creative",
    code: "04-creative-workspace-and-media-production",
    modeId: "creative",
    taxonomyPageId: "creative-workspace-and-media-production",
    labelId: "Ruang Kreatif & Produksi Media",
    labelEn: "Creative Workspace and Media Production",
    description:
      "Studio perancangan visual, naskah & penulisan, produksi video/audio, repositori kode, dan media interaktif.",
    routePath: "/creative-workspace-and-media-production",
    icon: Palette,
    defaultBadge: "6 Modul",
  },
  {
    id: "mode_research",
    code: "05-research-foundations-and-reference-frameworks",
    modeId: "research",
    taxonomyPageId: "research-foundations-and-reference-frameworks",
    labelId: "Fondasi Riset & Kerangka Referensi",
    labelEn: "Research Foundations and Reference Frameworks",
    description:
      "Pusat terpadu Markets, Academia, Intelligence, Consulting, dan Knowledge.",
    routePath: "/research-foundations-and-reference-frameworks",
    icon: GraduationCap,
    defaultBadge: "23 Modul",
  },
  {
    id: "mode_sharia",
    code: "06-islamic-principles-and-sharia-values",
    modeId: "sharia",
    taxonomyPageId: "islamic-principles-and-sharia-values",
    labelId: "Prinsip Islam & Nilai Syariah",
    labelEn: "Islamic Principles and Sharia Values",
    description:
      "Etika bisnis Islam, keuangan sosial syariah, akad komersial, proteksi takaful & wadiah, zakat, investasi, dan kepatuhan syariah.",
    routePath: "/islamic-principles-and-sharia-values",
    icon: Scale,
    defaultBadge: "20 Modul",
  },
  {
    id: "mode_personal",
    code: "07-personal-life-management",
    modeId: "personal",
    taxonomyPageId: "personal-life-management",
    labelId: "Manajemen Kehidupan Pribadi",
    labelEn: "Personal Life Management",
    description:
      "Pengembangan diri, kesehatan & kebugaran, refleksi & jurnal, administrasi pribadi, keuangan personal, pembelajaran, dan keamanan digital.",
    routePath: "/personal-life-management",
    icon: Heart,
    defaultBadge: "24 Modul",
  },
  {
    id: "mode_family",
    code: "08-household-planning-and-family-records",
    modeId: "family",
    taxonomyPageId: "household-planning-and-family-records",
    labelId: "Perencanaan Rumah Tangga & Arsip Keluarga",
    labelEn: "Household Planning and Family Records",
    description:
      "Manajemen keluarga, operasional rumah, keuangan bersama, properti, dapur, keselamatan, kendaraan, dan administrasi keluarga.",
    routePath: "/household-planning-and-family-records",
    icon: Home,
    defaultBadge: "24 Modul",
  },
  {
    id: "mode_public_affairs",
    code: "09-policy-affairs-and-public-relations",
    modeId: "public_affairs",
    taxonomyPageId: "policy-affairs-and-public-relations",
    labelId: "Urusan Kebijakan & Hubungan Masyarakat",
    labelEn: "Policy Affairs and Public Relations",
    description:
      "Urusan komunitas, layanan publik, kebijakan & tata kelola, pelibatan publik, hubungan media, dan hubungan kelembagaan.",
    routePath: "/policy-affairs-and-public-relations",
    icon: Landmark,
    defaultBadge: "18 Modul",
  },
  {
    id: "mode_networks",
    code: "10-contact-directory-and-social-networks",
    modeId: "networks",
    taxonomyPageId: "contact-directory-and-social-networks",
    labelId: "Direktori Kontak & Jejaring Sosial",
    labelEn: "Contact Directory and Social Networks",
    description:
      "Direktori identitas dan kontak, manajemen relasi, grup & komunitas, jejaring profesional, pelibatan sosial, dan koordinasi.",
    routePath: "/contact-directory-and-social-networks",
    icon: Users,
    defaultBadge: "18 Modul",
  },
]);

// ============================================================================
// LEVEL 3: 10 JENIS SUB-KOMPONEN STANDAR
// ============================================================================
export const SUB_COMPONENT_KEYS = [
  "dashboards",
  "features",
  "tools",
  "workflows",
  "automations",
  "analytics",
  "templates",
  "records",
  "guides",
  "settings",
] as const;

export type SubComponentKey = (typeof SUB_COMPONENT_KEYS)[number];

export interface SubComponentTabDef {
  readonly key: SubComponentKey;
  readonly order: number;
  readonly label: string;
  readonly shortLabel: string;
  readonly description: string;
  readonly icon: LucideIcon;
  readonly defaultActionRequired: "read" | "write";
}

export const SUB_COMPONENT_TABS: readonly SubComponentTabDef[] = Object.freeze([
  {
    key: "dashboards",
    order: 1,
    label: "Dashboards",
    shortLabel: "Dashboards",
    description: "Ringkasan eksekutif, KPI utama, dan pantauan kesehatan modul.",
    icon: LayoutDashboard,
    defaultActionRequired: "read",
  },
  {
    key: "features",
    order: 2,
    label: "Features",
    shortLabel: "Features",
    description: "Instrumen kerja interaktif utama dan ruang eksekusi harian.",
    icon: Sparkles,
    defaultActionRequired: "write",
  },
  {
    key: "tools",
    order: 3,
    label: "Tools",
    shortLabel: "Tools",
    description: "Kalkulator analisis, simulator skenario, dan instrumen kerja terapan.",
    icon: Wrench,
    defaultActionRequired: "read",
  },
  {
    key: "workflows",
    order: 4,
    label: "Workflows",
    shortLabel: "Workflows",
    description: "Tahapan proses, papan Kanban, milestone, dan gate persetujuan.",
    icon: GitBranch,
    defaultActionRequired: "write",
  },
  {
    key: "automations",
    order: 5,
    label: "Automations",
    shortLabel: "Automations",
    description: "Pemicu otomatis (triggers), aturan eskalasi SLA, dan integrasi jadwal.",
    icon: Zap,
    defaultActionRequired: "write",
  },
  {
    key: "analytics",
    order: 6,
    label: "Analytics",
    shortLabel: "Analytics",
    description: "Visualisasi tren, komparasi historis, dan matriks diagnostik.",
    icon: BarChart3,
    defaultActionRequired: "read",
  },
  {
    key: "templates",
    order: 7,
    label: "Templates",
    shortLabel: "Templates",
    description: "Cetak biru dokumen, kuesioner asesmen, dan standar deliverable.",
    icon: FileCode2,
    defaultActionRequired: "read",
  },
  {
    key: "records",
    order: 8,
    label: "Records",
    shortLabel: "Records",
    description: "Tabel data master, arsip log transaksi, dan riwayat entitas klien.",
    icon: Database,
    defaultActionRequired: "read",
  },
  {
    key: "guides",
    order: 9,
    label: "Guides",
    shortLabel: "Guides",
    description: "Metodologi konsultasi, kerangka referensi, dan panduan praktik terbaik.",
    icon: BookOpen,
    defaultActionRequired: "read",
  },
  {
    key: "settings",
    order: 10,
    label: "Settings",
    shortLabel: "Settings",
    description: "Konfigurasi parameter modul, skema kustom, dan hak akses ruang kerja.",
    icon: Settings,
    defaultActionRequired: "write",
  },
]);

export const SUB_COMPONENT_TAB_MAP: Readonly<Record<SubComponentKey, SubComponentTabDef>> =
  Object.freeze(
    SUB_COMPONENT_TABS.reduce(
      (acc, tab) => {
        acc[tab.key] = tab;
        return acc;
      },
      {} as Record<SubComponentKey, SubComponentTabDef>,
    ),
  );

export const UNIFIED_SUB_COMPONENTS: ReadonlyArray<{
  readonly id: SubComponentKey;
  readonly label: string;
  readonly icon: LucideIcon;
}> = Object.freeze(
  SUB_COMPONENT_TABS.map((tab) => ({
    id: tab.key,
    label: tab.label,
    icon: tab.icon,
  })),
);

export type SubComponentType = SubComponentKey;

// ============================================================================
// HELPER QUERIES (SINGLE SOURCE OF TRUTH CONSUMERS)
// ============================================================================

export function getUnifiedWorkspaces(): readonly UnifiedWorkspaceDef[] {
  return UNIFIED_WORKSPACES;
}

export function getUnifiedWorkspaceById(
  idOrKey: string | null | undefined,
): UnifiedWorkspaceDef | undefined {
  if (!idOrKey) return undefined;
  const normalized = idOrKey.trim().toLowerCase();
  const cleanRoute = normalized.split("?")[0].replace(/\/+$/, "");
  return UNIFIED_WORKSPACES.find(
    (ws) =>
      ws.id.toLowerCase() === normalized ||
      ws.code.toLowerCase() === normalized ||
      ws.modeId.toLowerCase() === normalized ||
      ws.taxonomyPageId.toLowerCase() === normalized ||
      ws.routePath.toLowerCase() === cleanRoute,
  );
}

export function getSubComponentTabs(): readonly SubComponentTabDef[] {
  return SUB_COMPONENT_TABS;
}

export function getSubComponentTab(key: SubComponentKey): SubComponentTabDef {
  return SUB_COMPONENT_TAB_MAP[key];
}

export function resolveWorkspaceIdForRoute(route: string): WorkspaceId {
  const normalized = (route || "").toLowerCase();
  const cleanFirstSeg = normalized.split("?")[0].replace(/^\/+/, "").split("/")[0] || "";
  if (cleanFirstSeg) {
    const directWs = UNIFIED_WORKSPACES.find(
      (ws) => ws.taxonomyPageId.toLowerCase() === cleanFirstSeg,
    );
    if (directWs) return directWs.id;
  }

  if (
    normalized.includes("financial") ||
    normalized.includes("asset") ||
    normalized.includes("wealth") ||
    normalized.includes("finance") ||
    normalized.includes("valuasi") ||
    normalized.includes("surety") ||
    normalized.includes("flow") ||
    normalized.includes("build") ||
    normalized.includes("grow") ||
    normalized.includes("legacy")
  ) {
    return "financial";
  }
  if (
    normalized.includes("business") ||
    normalized.includes("100-framework") ||
    normalized.includes("framework") ||
    normalized.includes("database") ||
    normalized.includes("klien") ||
    normalized.includes("vendor")
  ) {
    return "mode_business";
  }
  if (
    normalized.includes("productivity-workspace") ||
    normalized.includes("work-productivity") ||
    normalized.includes("proyek") ||
    normalized.includes("task") ||
    normalized.includes("kanban") ||
    normalized.includes("workflow") ||
    normalized.includes("kalender")
  ) {
    return "mode_employment";
  }
  if (normalized.includes("creative") || normalized.includes("podcast") || normalized.includes("video")) {
    return "mode_creative";
  }
  if (
    normalized.includes("research") ||
    normalized.includes("knowledge") ||
    normalized.includes("wiki") ||
    normalized.includes("notes") ||
    normalized.includes("reading")
  ) {
    return "mode_research";
  }
  if (
    normalized.includes("islamic-principles") ||
    normalized.includes("sharia") ||
    normalized.includes("syariah") ||
    normalized.includes("zakat")
  ) {
    return "mode_sharia";
  }
  if (
    normalized.includes("personal") ||
    normalized.includes("habit") ||
    normalized.includes("health") ||
    normalized.includes("journal")
  ) {
    return "mode_personal";
  }
  if (normalized.includes("family") || normalized.includes("household") || normalized.includes("recipe")) {
    return "mode_family";
  }
  if (
    normalized.includes("policy-affairs") ||
    normalized.includes("public-affairs") ||
    normalized.includes("public-relations") ||
    normalized.includes("komoditas") ||
    normalized.includes("indeks") ||
    normalized.includes("komunitas")
  ) {
    return "mode_public_affairs";
  }
  if (
    normalized.includes("social-networks") ||
    normalized.includes("contact-directory") ||
    normalized.includes("contact") ||
    normalized.includes("client") ||
    normalized.includes("collaboration") ||
    normalized.includes("portal")
  ) {
    return "mode_networks";
  }
  return "mode_business";
}
