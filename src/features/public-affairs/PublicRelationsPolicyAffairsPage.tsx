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
  Building,
  CalendarDays,
  Sprout,
  Compass,
  FileCheck,
  Gauge,
  Scale,
  Microscope,
  Workflow,
  Landmark,
  ShieldAlert,
  MessagesSquare,
  BarChart3,
  Globe,
  Megaphone,
  Handshake,
  Building2,
  Network,
  Search,
} from "lucide-react";

export type PublicAffairsCategory =
  | "all"
  | "community"
  | "services"
  | "governance"
  | "engagement"
  | "relations"
  | "institutions";

const LEGACY_PUBLIC_AFFAIRS_CATEGORY_MAP: Record<string, PublicAffairsCategory> = {
  policy: "governance",
  media: "relations",
  "community-affairs": "community",
  "public-services": "services",
  "policy-governance": "governance",
  "public-engagement": "engagement",
  "public-relations": "relations",
  "institutional-relations": "institutions",
};

export function normalizePublicAffairsCategory(raw?: string | null): PublicAffairsCategory {
  if (!raw) return "all";
  const key = raw.trim().toLowerCase();
  if (
    key === "all" ||
    key === "community" ||
    key === "services" ||
    key === "governance" ||
    key === "engagement" ||
    key === "relations" ||
    key === "institutions"
  ) {
    return key;
  }
  return LEGACY_PUBLIC_AFFAIRS_CATEGORY_MAP[key] ?? "all";
}

export interface PublicAffairsSubMenu {
  id: string;
  label: string;
  to: string;
  inverted?: boolean;
  componentCategory: ModuleComponentCategory;
}

export interface PublicAffairsAppItem {
  id: string;
  name: string;
  category: Exclude<PublicAffairsCategory, "all">;
  categoryLabel: string;
  shortDesc: string;
  to: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  badge: string;
  accentGradient: string;
  accentBorder: string;
  badgeBg: string;
  badgeText: string;
  subMenus: PublicAffairsSubMenu[];
}

export const PUBLIC_AFFAIRS_APPS: PublicAffairsAppItem[] = [
  // ============================================================================
  // 1. Community (3 Modul)
  // ============================================================================
  {
    id: "komunitas-warga-rt-rw",
    name: "Community Affairs",
    category: "community",
    categoryLabel: "Community",
    shortDesc:
      "Manajemen rukun warga dan komunitas terpadu: pencatatan direktori warga, transparansi iuran kas komunitas, serta penerbitan surat pengantar sipil.",
    to: "/komunitas-warga",
    icon: Building,
    badge: "Community",
    accentGradient: "from-blue-500 to-indigo-600",
    accentBorder: "border-blue-500/30 hover:border-blue-500/60",
    badgeBg: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
    badgeText: "Community",
    subMenus: [
      { id: "warga-directory", label: "Resident Directory", to: "/komunitas-warga", inverted: false, componentCategory: "Records" },
      { id: "iuran-kas", label: "Community Fund", to: "/komunitas-warga", inverted: false, componentCategory: "Features" },
      { id: "surat-pengantar", label: "Civic Letters", to: "/komunitas-warga", inverted: false, componentCategory: "Templates" },
    ],
  },
  {
    id: "civic-calendar-agenda",
    name: "Community Events",
    category: "community",
    categoryLabel: "Community",
    shortDesc:
      "Kalender agenda gotong royong dan kegiatan masyarakat, penjadwalan forum musyawarah warga, serta arsip notulen pertemuan komunitas.",
    to: "/lainnya?app=civic-calendar",
    icon: CalendarDays,
    badge: "Community",
    accentGradient: "from-amber-500 to-orange-600",
    accentBorder: "border-amber-500/30 hover:border-amber-500/60",
    badgeBg: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    badgeText: "Community",
    subMenus: [
      { id: "kalender-warga", label: "Community Calendar", to: "/lainnya?app=civic-calendar", inverted: false, componentCategory: "Workflows" },
      { id: "jadwal-musyawarah", label: "Meeting Schedule", to: "/calendar", inverted: false, componentCategory: "Workflows" },
      { id: "notulen-pertemuan", label: "Meeting Minutes", to: "/meeting-manager", inverted: false, componentCategory: "Records" },
    ],
  },
  {
    id: "community-development",
    name: "Community Development",
    category: "community",
    categoryLabel: "Community",
    shortDesc:
      "Pemetaan kebutuhan sosial masyarakat, evaluasi prioritas program pemberdayaan lokal, serta perencanaan inisiatif pengembangan komunitas.",
    to: "/policy-affairs-and-public-relations?module=community-development",
    icon: Sprout,
    badge: "Community",
    accentGradient: "from-emerald-500 to-green-600",
    accentBorder: "border-emerald-500/30 hover:border-emerald-500/60",
    badgeBg: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    badgeText: "Community",
    subMenus: [
      { id: "community-needs-assessment", label: "Community Needs Assessment", to: "", componentCategory: "Analytics" },
      { id: "charity-impact", label: "Charity Impact", to: "/peh/charity", inverted: false, componentCategory: "Records" },
      { id: "volunteer-outreach", label: "Volunteer Outreach", to: "/peh/volunteering", inverted: false, componentCategory: "Workflows" },
    ],
  },

  // ============================================================================
  // 2. Services (3 Modul)
  // ============================================================================
  {
    id: "civic-services-guide",
    name: "Public Services",
    category: "services",
    categoryLabel: "Services",
    shortDesc:
      "Direktori panduan layanan publik dan administrasi kependudukan, persyaratan berkas legal sipil, serta kontak kantor dinas pelayanan publik.",
    to: "/lainnya?app=public-services-guide",
    icon: Compass,
    badge: "Services",
    accentGradient: "from-teal-500 to-cyan-600",
    accentBorder: "border-teal-500/30 hover:border-teal-500/60",
    badgeBg: "bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30",
    badgeText: "Services",
    subMenus: [
      { id: "panduan-layanan", label: "Civic Services Guide", to: "/lainnya?app=public-services-guide", inverted: false, componentCategory: "Guides" },
      { id: "civic-services-hub", label: "Civic Services Hub", to: "/peh/civic", inverted: false, componentCategory: "Features" },
      { id: "syarat-berkas", label: "Document Requirements", to: "/documents", inverted: false, componentCategory: "Guides" },
      { id: "kontak-instansi", label: "Public Office Directory", to: "/contacts", inverted: false, componentCategory: "Records" },
    ],
  },
  {
    id: "civic-administration",
    name: "Civic Administration",
    category: "services",
    categoryLabel: "Services",
    shortDesc:
      "Pengelolaan berkas kasus administrasi sipil dan pengurusan dokumen pelayanan publik dari tahap pengajuan hingga penyelesaian layanan.",
    to: "/policy-affairs-and-public-relations?module=civic-administration",
    icon: FileCheck,
    badge: "Services",
    accentGradient: "from-cyan-500 to-sky-600",
    accentBorder: "border-cyan-500/30 hover:border-cyan-500/60",
    badgeBg: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
    badgeText: "Services",
    subMenus: [
      { id: "civic-case-management", label: "Civic Case Management", to: "", componentCategory: "Records" },
      { id: "civic-document-workflow", label: "Civic Document Workflow", to: "", componentCategory: "Workflows" },
    ],
  },
  {
    id: "public-service-performance",
    name: "Service Performance",
    category: "services",
    categoryLabel: "Services",
    shortDesc:
      "Pemantauan kinerja mutu penyelenggaraan layanan publik, waktu penyelesaian berkas layanan (SLA), dan tingkat respons pengaduan layanan.",
    to: "/policy-affairs-and-public-relations?module=public-service-performance",
    icon: Gauge,
    badge: "Services",
    accentGradient: "from-sky-500 to-blue-600",
    accentBorder: "border-sky-500/30 hover:border-sky-500/60",
    badgeBg: "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30",
    badgeText: "Services",
    subMenus: [
      { id: "service-delivery-dashboard", label: "Service Delivery Dashboard", to: "", componentCategory: "Dashboards" },
    ],
  },

  // ============================================================================
  // 3. Governance (4 Modul)
  // ============================================================================
  {
    id: "policy-compliance-audit",
    name: "Regulatory Compliance",
    category: "governance",
    categoryLabel: "Governance",
    shortDesc:
      "Pelacakan kepatuhan terhadap regulasi perundang-undangan daerah/nasional, audit kepatuhan hukum, serta pustaka regulasi kebijakan.",
    to: "/peh/compliance",
    icon: Scale,
    badge: "Governance",
    accentGradient: "from-purple-500 to-violet-600",
    accentBorder: "border-purple-500/30 hover:border-purple-500/60",
    badgeBg: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
    badgeText: "Governance",
    subMenus: [
      { id: "compliance-tracker", label: "Compliance Tracker", to: "/peh/compliance", inverted: false, componentCategory: "Features" },
      { id: "audit-hukum", label: "Legal Compliance Audit", to: "/surety?tab=cat_kepatuhan", inverted: false, componentCategory: "Workflows" },
      { id: "daftar-regulasi", label: "Regulatory Library", to: "/documents", inverted: false, componentCategory: "Records" },
    ],
  },
  {
    id: "policy-research",
    name: "Policy Research",
    category: "governance",
    categoryLabel: "Governance",
    shortDesc:
      "Ruang kajian kebijakan publik berbasis bukti (evidence-based policy), kurasi bukti empiris, dan repositori naskah riset kebijakan.",
    to: "/policy-affairs-and-public-relations?module=policy-research",
    icon: Microscope,
    badge: "Governance",
    accentGradient: "from-violet-500 to-indigo-600",
    accentBorder: "border-violet-500/30 hover:border-violet-500/60",
    badgeBg: "bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/30",
    badgeText: "Governance",
    subMenus: [
      { id: "policy-research-workspace", label: "Policy Research Workspace", to: "", componentCategory: "Features" },
      { id: "evidence-research-library", label: "Evidence Library", to: "", componentCategory: "Records" },
    ],
  },
  {
    id: "policy-development",
    name: "Policy Development",
    category: "governance",
    categoryLabel: "Governance",
    shortDesc:
      "Pengelolaan siklus perumusan hingga pengesahan kebijakan publik serta analisis dampak regulasi dan dampak sosial ekonomi kebijakan.",
    to: "/policy-affairs-and-public-relations?module=policy-development",
    icon: Workflow,
    badge: "Governance",
    accentGradient: "from-indigo-500 to-blue-600",
    accentBorder: "border-indigo-500/30 hover:border-indigo-500/60",
    badgeBg: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    badgeText: "Governance",
    subMenus: [
      { id: "policy-lifecycle-workflow", label: "Policy Lifecycle Workflow", to: "", componentCategory: "Workflows" },
      { id: "policy-impact-assessment", label: "Policy Impact Assessment", to: "", componentCategory: "Analytics" },
    ],
  },
  {
    id: "legislative-monitoring",
    name: "Legislative Affairs",
    category: "governance",
    categoryLabel: "Governance",
    shortDesc:
      "Pemantauan perkembangan rancangan undang-undang, peraturan daerah, dan peringatan otomatis atas perubahan regulasi pemerintah terbaru.",
    to: "/policy-affairs-and-public-relations?module=legislative-monitoring",
    icon: Landmark,
    badge: "Governance",
    accentGradient: "from-fuchsia-500 to-purple-600",
    accentBorder: "border-fuchsia-500/30 hover:border-fuchsia-500/60",
    badgeBg: "bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/30",
    badgeText: "Governance",
    subMenus: [
      { id: "legislative-tracker", label: "Legislative Tracker", to: "", componentCategory: "Records" },
      { id: "regulatory-change-alerts", label: "Regulatory Change Alerts", to: "", componentCategory: "Automations" },
    ],
  },

  // ============================================================================
  // 4. Engagement (3 Modul)
  // ============================================================================
  {
    id: "advocacy-public-affairs",
    name: "Public Advocacy",
    category: "engagement",
    categoryLabel: "Engagement",
    shortDesc:
      "Kanal penjaringan aspirasi dan umpan balik konstituen, penyusunan usulan kebijakan publik, serta penyelenggaraan survei opini masyarakat.",
    to: "/peh/advocacy",
    icon: ShieldAlert,
    badge: "Engagement",
    accentGradient: "from-rose-500 to-pink-600",
    accentBorder: "border-rose-500/30 hover:border-rose-500/60",
    badgeBg: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
    badgeText: "Engagement",
    subMenus: [
      { id: "aspirasi-publik", label: "Public Feedback", to: "/peh/advocacy", inverted: false, componentCategory: "Records" },
      { id: "risalah-kebijakan", label: "Policy Proposals", to: "/notes", inverted: false, componentCategory: "Workflows" },
      { id: "survei-warga", label: "Public Opinion Survey", to: "/forms", inverted: false, componentCategory: "Tools" },
    ],
  },
  {
    id: "public-consultation",
    name: "Public Consultation",
    category: "engagement",
    categoryLabel: "Engagement",
    shortDesc:
      "Perencanaan kampanye konsultasi publik resmi serta pencatatan seluruh masukan tertulis dan pengajuan publik terhadap rancangan kebijakan.",
    to: "/policy-affairs-and-public-relations?module=public-consultation",
    icon: MessagesSquare,
    badge: "Engagement",
    accentGradient: "from-pink-500 to-rose-600",
    accentBorder: "border-pink-500/30 hover:border-pink-500/60",
    badgeBg: "bg-pink-500/15 text-pink-600 dark:text-pink-400 border-pink-500/30",
    badgeText: "Engagement",
    subMenus: [
      { id: "consultation-campaign-planner", label: "Consultation Campaign Planner", to: "", componentCategory: "Workflows" },
      { id: "public-submission-register", label: "Public Submission Register", to: "", componentCategory: "Records" },
    ],
  },
  {
    id: "public-opinion-intelligence",
    name: "Public Sentiment",
    category: "engagement",
    categoryLabel: "Engagement",
    shortDesc:
      "Analisis sentimen opini masyarakat terhadap isu kebijakan serta dasbor pelacakan tren persepsi publik lintas wilayah dan topik.",
    to: "/policy-affairs-and-public-relations?module=public-opinion-intelligence",
    icon: BarChart3,
    badge: "Engagement",
    accentGradient: "from-red-500 to-orange-600",
    accentBorder: "border-red-500/30 hover:border-red-500/60",
    badgeBg: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30",
    badgeText: "Engagement",
    subMenus: [
      { id: "public-sentiment-analytics", label: "Public Sentiment Analytics", to: "", componentCategory: "Analytics" },
      { id: "public-opinion-trends", label: "Public Opinion Trends", to: "", componentCategory: "Dashboards" },
    ],
  },

  // ============================================================================
  // 5. Relations (3 Modul)
  // ============================================================================
  {
    id: "public-relations-media",
    name: "Public Relations",
    category: "relations",
    categoryLabel: "Relations",
    shortDesc:
      "Pengelolaan siaran pers resmi, pembaruan komunikasi bagi pemangku kepentingan eksternal, serta pemantauan narasi dan liputan media.",
    to: "/peh/global-overview",
    icon: Globe,
    badge: "Relations",
    accentGradient: "from-emerald-500 to-teal-600",
    accentBorder: "border-emerald-500/30 hover:border-emerald-500/60",
    badgeBg: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    badgeText: "Relations",
    subMenus: [
      { id: "siaran-pers", label: "Press Releases", to: "/peh/global-overview", inverted: false, componentCategory: "Templates" },
      { id: "stakeholder-news", label: "Stakeholder Updates", to: "/notification-center", inverted: false, componentCategory: "Workflows" },
      { id: "media-clipping", label: "Media Monitoring", to: "/web-clipper", inverted: false, componentCategory: "Analytics" },
    ],
  },
  {
    id: "media-relations",
    name: "Media Affairs",
    category: "relations",
    categoryLabel: "Relations",
    shortDesc:
      "Direktori daftar kontak jurnalis dan redaksi media massa beserta alur perencanaan konferensi pers dan media briefing resmi.",
    to: "/policy-affairs-and-public-relations?module=media-relations",
    icon: Megaphone,
    badge: "Relations",
    accentGradient: "from-teal-500 to-emerald-600",
    accentBorder: "border-teal-500/30 hover:border-teal-500/60",
    badgeBg: "bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30",
    badgeText: "Relations",
    subMenus: [
      { id: "media-contact-register", label: "Media Contact Register", to: "", componentCategory: "Records" },
      { id: "media-briefing-planner", label: "Media Briefing Planner", to: "", componentCategory: "Workflows" },
    ],
  },
  {
    id: "stakeholder-relations",
    name: "Stakeholder Affairs",
    category: "relations",
    categoryLabel: "Relations",
    shortDesc:
      "Pemetaan pengaruh dan kepentingan pemangku kepentingan eksternal serta pencatatan riwayat keterlibatan stakeholder publik.",
    to: "/policy-affairs-and-public-relations?module=stakeholder-relations",
    icon: Handshake,
    badge: "Relations",
    accentGradient: "from-green-500 to-teal-600",
    accentBorder: "border-green-500/30 hover:border-green-500/60",
    badgeBg: "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/30",
    badgeText: "Relations",
    subMenus: [
      { id: "stakeholder-mapping", label: "Stakeholder Mapping", to: "", componentCategory: "Tools" },
      { id: "stakeholder-engagement-tracker", label: "Stakeholder Engagement Tracker", to: "", componentCategory: "Records" },
    ],
  },

  // ============================================================================
  // 6. Institutions (2 Modul)
  // ============================================================================
  {
    id: "government-relations",
    name: "Government Affairs",
    category: "institutions",
    categoryLabel: "Institutions",
    shortDesc:
      "Penjadwalan agenda hubungan kelembagaan pemerintah, audiensi dengan pembuat kebijakan, serta pertemuan resmi lintas kementerian/daerah.",
    to: "/policy-affairs-and-public-relations?module=government-relations",
    icon: Building2,
    badge: "Institutions",
    accentGradient: "from-slate-500 to-blue-600",
    accentBorder: "border-slate-500/30 hover:border-slate-500/60",
    badgeBg: "bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30",
    badgeText: "Institutions",
    subMenus: [
      { id: "government-relations-calendar", label: "Government Relations Calendar", to: "", componentCategory: "Workflows" },
    ],
  },
  {
    id: "interagency-coordination",
    name: "Institutional Coordination",
    category: "institutions",
    categoryLabel: "Institutions",
    shortDesc:
      "Pencatatan dan pelacakan tindak lanjut nota kesepahaman, program kerja bersama, serta aksi koordinasi antarinstansi dan lembaga mitra.",
    to: "/policy-affairs-and-public-relations?module=interagency-coordination",
    icon: Network,
    badge: "Institutions",
    accentGradient: "from-blue-500 to-slate-600",
    accentBorder: "border-blue-500/30 hover:border-blue-500/60",
    badgeBg: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
    badgeText: "Institutions",
    subMenus: [
      { id: "interagency-action-register", label: "Interagency Action Register", to: "", componentCategory: "Records" },
    ],
  },
];

export const PUBLIC_AFFAIRS_CATEGORY_TABS: {
  id: PublicAffairsCategory;
  label: string;
  count: number;
}[] = [
  { id: "all", label: "Semua", count: PUBLIC_AFFAIRS_APPS.length },
  {
    id: "community",
    label: "Community",
    count: PUBLIC_AFFAIRS_APPS.filter((a) => a.category === "community").length,
  },
  {
    id: "services",
    label: "Services",
    count: PUBLIC_AFFAIRS_APPS.filter((a) => a.category === "services").length,
  },
  {
    id: "governance",
    label: "Governance",
    count: PUBLIC_AFFAIRS_APPS.filter((a) => a.category === "governance").length,
  },
  {
    id: "engagement",
    label: "Engagement",
    count: PUBLIC_AFFAIRS_APPS.filter((a) => a.category === "engagement").length,
  },
  {
    id: "relations",
    label: "Relations",
    count: PUBLIC_AFFAIRS_APPS.filter((a) => a.category === "relations").length,
  },
  {
    id: "institutions",
    label: "Institutions",
    count: PUBLIC_AFFAIRS_APPS.filter((a) => a.category === "institutions").length,
  },
];

export const PUBLIC_AFFAIRS_TOTAL_MODULES = PUBLIC_AFFAIRS_APPS.length;
export const PUBLIC_AFFAIRS_TOOLS_COUNT = PUBLIC_AFFAIRS_APPS.reduce(
  (sum, app) => sum + app.subMenus.filter((s) => s.componentCategory === "Tools").length,
  0
);
export const PUBLIC_AFFAIRS_FEATURES_COUNT = PUBLIC_AFFAIRS_APPS.reduce(
  (sum, app) => sum + app.subMenus.filter((s) => s.componentCategory !== "Tools").length,
  0
);
export const PUBLIC_AFFAIRS_TOTAL_BADGE = `${PUBLIC_AFFAIRS_TOTAL_MODULES} Modul • ${PUBLIC_AFFAIRS_FEATURES_COUNT} Features • ${PUBLIC_AFFAIRS_TOOLS_COUNT} Tools`;
syncLauncherPageBadge("mode_public_affairs", PUBLIC_AFFAIRS_TOTAL_BADGE);
export const PUBLIC_AFFAIRS_SUMMARY_DESC = PUBLIC_AFFAIRS_CATEGORY_TABS.filter((t) => t.id !== "all")
  .map((t) => `${t.label} (${t.count})`)
  .join(" · ");

export function PublicRelationsPolicyAffairsPage({
  isEmbedded: _isEmbedded = false,
}: {
  isEmbedded?: boolean;
} = {}) {
  const [selectedCategory, setSelectedCategory] = useState<PublicAffairsCategory>(() => {
    if (typeof window !== "undefined") {
      try {
        const params = new URLSearchParams(window.location.search);
        const cat = params.get("category") || params.get("pill");
        if (cat) return normalizePublicAffairsCategory(cat);
      } catch {}
    }
    return "all";
  });
  const [searchQuery, setSearchQuery] = useState("");
  const { isFavorite, toggleFavorite } = useFavorites();
  const pageId = useCurrentLauncherPage("mode_public_affairs") || "mode_public_affairs";
  const { getPageCountDelta, getCardsMovedIntoPage } = useCardPageMover();
  const { pinnedList } = usePinnedCards(pageId);

  const filteredApps = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = PUBLIC_AFFAIRS_APPS.filter((app) => {
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
          items={adjustCategoryTabsCount(PUBLIC_AFFAIRS_CATEGORY_TABS, getPageCountDelta(pageId))}
          activeId={selectedCategory}
          onSelect={(id) => setSelectedCategory(id as PublicAffairsCategory)}
        />
      </ShellHeader>

      <div className="w-full mx-auto pt-3 sm:pt-4 space-y-3 sm:space-y-4">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground/90 tracking-tight flex items-center justify-center gap-2.5">
            <span>Policy Affairs <span className="font-normal">and</span> Public Relations</span>
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
              features={app.subMenus.map((sub) => ({
                title: sub.label,
                to: sub.to ?? app.to,
                inverted: sub.inverted,
              }))}
              categoryGroups={buildModuleCategoryGroups(app.subMenus, app.to)}
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
              Tidak ada modul publik ditemukan
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
