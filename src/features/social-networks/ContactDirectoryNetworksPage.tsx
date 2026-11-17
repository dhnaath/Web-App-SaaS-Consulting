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
  UserCheck,
  PhoneCall,
  Building2,
  MessagesSquare,
  HeartHandshake,
  BarChart3,
  Network,
  CalendarDays,
  ShieldCheck,
  Award,
  Compass,
  Handshake,
  Gift,
  Sparkles,
  Trophy,
  Radio,
  CalendarClock,
  GitBranch,
  Search,
} from "lucide-react";

export type SocialCategory =
  | "all"
  | "directory"
  | "relationships"
  | "communities"
  | "professional"
  | "engagement"
  | "communication";

const LEGACY_SOCIAL_CATEGORY_MAP: Record<string, SocialCategory> = {
  direktori: "directory",
  relasi: "relationships",
  jaringan: "professional",
  "identity-directories": "directory",
  "relationship-management": "relationships",
  "groups-communities": "communities",
  "professional-networks": "professional",
  "social-engagement": "engagement",
  "communication-coordination": "communication",
};

export function normalizeSocialCategory(raw?: string | null): SocialCategory {
  if (!raw) return "all";
  const key = raw.trim().toLowerCase();
  if (
    key === "all" ||
    key === "directory" ||
    key === "relationships" ||
    key === "communities" ||
    key === "professional" ||
    key === "engagement" ||
    key === "communication"
  ) {
    return key;
  }
  return LEGACY_SOCIAL_CATEGORY_MAP[key] ?? "all";
}

export interface SocialSubMenu {
  id: string;
  label: string;
  to: string;
  inverted?: boolean;
  componentCategory: ModuleComponentCategory;
}

export interface SocialAppItem {
  id: string;
  name: string;
  category: Exclude<SocialCategory, "all">;
  categoryLabel: string;
  shortDesc: string;
  to: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  badge: string;
  accentGradient: string;
  accentBorder: string;
  badgeBg: string;
  badgeText: string;
  subMenus: SocialSubMenu[];
}

export const SOCIAL_NETWORKS_APPS: SocialAppItem[] = [
  // 1. Identity and Directories (3)
  {
    id: "people-manager-identity",
    name: "People Directory",
    category: "directory",
    categoryLabel: "Directory",
    shortDesc:
      "Identity Layer rujukan identitas tunggal seluruh ekosistem: profil person, pemetaan peran, keanggotaan organisasi, dan riwayat asosiasi.",
    to: "/people-manager",
    icon: UserCheck,
    badge: "Directory",
    accentGradient: "from-blue-500 to-indigo-600",
    accentBorder: "border-blue-500/30 hover:border-blue-500/60",
    badgeBg: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
    badgeText: "Directory",
    subMenus: [
      { id: "identity-profiles", label: "Identity Profiles", to: "/people-manager", inverted: false, componentCategory: "Records" },
      { id: "roles-mapping", label: "Role Mapping", to: "/people-manager", inverted: false, componentCategory: "Tools" },
      { id: "org-members", label: "Organization Membership", to: "/people-manager", inverted: false, componentCategory: "Records" },
    ],
  },
  {
    id: "executive-contacts-book",
    name: "Contact Directory",
    category: "directory",
    categoryLabel: "Directory",
    shortDesc:
      "Buku alamat kontak profesional dan personal, daftar mitra strategis, sinkronisasi nomor telepon, serta pengelolaan kartu nama digital.",
    to: "/peh/contacts",
    icon: PhoneCall,
    badge: "Directory",
    accentGradient: "from-teal-500 to-cyan-600",
    accentBorder: "border-teal-500/30 hover:border-teal-500/60",
    badgeBg: "bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30",
    badgeText: "Directory",
    subMenus: [
      { id: "all-contacts", label: "Contact List", to: "/peh/contacts", inverted: false, componentCategory: "Records" },
      { id: "vip-partners", label: "Strategic Partners", to: "/contacts", inverted: false, componentCategory: "Records" },
      { id: "import-export", label: "Address Book", to: "/klien", inverted: false, componentCategory: "Records" },
    ],
  },
  {
    id: "organization-directory",
    name: "Organization Directory",
    category: "directory",
    categoryLabel: "Directory",
    shortDesc:
      "Direktori organisasi eksternal, asosiasi, institusi mitra, serta peta keterhubungan antarorganisasi dalam jejaring relasi dan komunitas.",
    to: "/contact-directory-and-social-networks?module=organization-directory",
    icon: Building2,
    badge: "Directory",
    accentGradient: "from-indigo-500 to-violet-600",
    accentBorder: "border-indigo-500/30 hover:border-indigo-500/60",
    badgeBg: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    badgeText: "Directory",
    subMenus: [
      { id: "organization-profiles", label: "Organization Profiles", to: "", componentCategory: "Records" },
      { id: "organization-relationship-map", label: "Organization Relationship Map", to: "", componentCategory: "Tools" },
    ],
  },

  // 2. Relationship Management (3)
  {
    id: "interaction-timeline-relations",
    name: "Relationship Management",
    category: "relationships",
    categoryLabel: "Relationships",
    shortDesc:
      "Histori lini masa komunikasi terpadu, log catatan panggilan dan diskusi penting, serta otomatisasi pengingat tindak lanjut relasi.",
    to: "/interaction-manager",
    icon: MessagesSquare,
    badge: "Relationships",
    accentGradient: "from-emerald-500 to-teal-600",
    accentBorder: "border-emerald-500/30 hover:border-emerald-500/60",
    badgeBg: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    badgeText: "Relationships",
    subMenus: [
      { id: "follow-up-schedule", label: "Follow-Up Schedule", to: "/interaction-manager", inverted: false, componentCategory: "Automations" },
      { id: "meeting-history", label: "Discussion History", to: "/meeting-manager", inverted: false, componentCategory: "Records" },
    ],
  },
  {
    id: "personal-connections",
    name: "Personal Connections",
    category: "relationships",
    categoryLabel: "Relationships",
    shortDesc:
      "Perencanaan pemeliharaan hubungan pribadi dan pencatatan tanggal penting orang-orang terdekat agar silaturahmi tetap terjaga.",
    to: "/contact-directory-and-social-networks?module=personal-connections",
    icon: HeartHandshake,
    badge: "Relationships",
    accentGradient: "from-rose-500 to-pink-600",
    accentBorder: "border-rose-500/30 hover:border-rose-500/60",
    badgeBg: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
    badgeText: "Relationships",
    subMenus: [
      { id: "personal-relationship-planner", label: "Personal Relationship Planner", to: "", componentCategory: "Workflows" },
      { id: "important-dates-register", label: "Important Dates Register", to: "", componentCategory: "Records" },
    ],
  },
  {
    id: "relationship-insights",
    name: "Relationship Intelligence",
    category: "relationships",
    categoryLabel: "Relationships",
    shortDesc:
      "Analitik kesehatan relasi, frekuensi interaksi berkala, serta ringkasan kondisi dan jangkauan jejaring kontak secara menyeluruh.",
    to: "/contact-directory-and-social-networks?module=relationship-insights",
    icon: BarChart3,
    badge: "Relationships",
    accentGradient: "from-cyan-500 to-blue-600",
    accentBorder: "border-cyan-500/30 hover:border-cyan-500/60",
    badgeBg: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
    badgeText: "Relationships",
    subMenus: [
      { id: "relationship-health-analytics", label: "Relationship Health Analytics", to: "", componentCategory: "Analytics" },
      { id: "network-overview-dashboard", label: "Network Overview Dashboard", to: "", componentCategory: "Dashboards" },
    ],
  },

  // 3. Groups and Communities (3)
  {
    id: "circle-groups-communities",
    name: "Groups Communities",
    category: "communities",
    categoryLabel: "Communities",
    shortDesc:
      "Klaster lingkaran pertemanan, komunitas alumni, paguyuban hobi, dan pengelolaan kelompok kolaborasi berbasis minat bersama.",
    to: "/lainnya?app=circle-groups",
    icon: Network,
    badge: "Communities",
    accentGradient: "from-purple-500 to-violet-600",
    accentBorder: "border-purple-500/30 hover:border-purple-500/60",
    badgeBg: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
    badgeText: "Communities",
    subMenus: [
      { id: "circles-list", label: "Relationship Groups", to: "/lainnya?app=circle-groups", inverted: false, componentCategory: "Records" },
      { id: "alumni-community", label: "Alumni Communities", to: "/peh/community-events", inverted: false, componentCategory: "Records" },
      { id: "group-projects", label: "Group Collaboration", to: "/collaboration", inverted: false, componentCategory: "Workflows" },
    ],
  },
  {
    id: "community-engagement",
    name: "Community Engagement",
    category: "communities",
    categoryLabel: "Communities",
    shortDesc:
      "Kalender aktivitas komunitas serta pelacakan tingkat partisipasi dan keterlibatan anggota dalam berbagai program kelompok sosial.",
    to: "/contact-directory-and-social-networks?module=community-engagement",
    icon: CalendarDays,
    badge: "Communities",
    accentGradient: "from-fuchsia-500 to-purple-600",
    accentBorder: "border-fuchsia-500/30 hover:border-fuchsia-500/60",
    badgeBg: "bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/30",
    badgeText: "Communities",
    subMenus: [
      { id: "community-activity-calendar", label: "Community Activity Calendar", to: "", componentCategory: "Workflows" },
      { id: "community-participation-tracker", label: "Community Participation Tracker", to: "", componentCategory: "Analytics" },
    ],
  },
  {
    id: "community-administration",
    name: "Community Affairs",
    category: "communities",
    categoryLabel: "Communities",
    shortDesc:
      "Administrasi keanggotaan grup sosial, pencatatan peran anggota komunitas, dan dokumentasi pedoman tata tertib kelompok.",
    to: "/contact-directory-and-social-networks?module=community-administration",
    icon: ShieldCheck,
    badge: "Communities",
    accentGradient: "from-slate-500 to-zinc-600",
    accentBorder: "border-slate-500/30 hover:border-slate-500/60",
    badgeBg: "bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30",
    badgeText: "Communities",
    subMenus: [
      { id: "group-membership-register", label: "Group Membership Register", to: "", componentCategory: "Records" },
      { id: "community-guidelines", label: "Community Guidelines", to: "", componentCategory: "Guides" },
    ],
  },

  // 4. Professional Networks (3)
  {
    id: "mentorship-introductions",
    name: "Professional Networks",
    category: "professional",
    categoryLabel: "Professional",
    shortDesc:
      "Pencatatan sesi bimbingan karir dan bisnis, riwayat perkenalan mitra strategis, serta pemetaan interaktif jejaring profesional.",
    to: "/peh/mentorship",
    icon: Award,
    badge: "Professional",
    accentGradient: "from-amber-500 to-orange-600",
    accentBorder: "border-amber-500/30 hover:border-amber-500/60",
    badgeBg: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    badgeText: "Professional",
    subMenus: [
      { id: "mentorship-log", label: "Mentorship Sessions", to: "/peh/mentorship", inverted: false, componentCategory: "Workflows" },
      { id: "warm-intros", label: "Professional Introductions", to: "/peh/introductions", inverted: false, componentCategory: "Records" },
      { id: "career-network-map", label: "Career Network Map", to: "", componentCategory: "Tools" },
    ],
  },
  {
    id: "mentorship-and-advisory",
    name: "Advisory Networks",
    category: "professional",
    categoryLabel: "Professional",
    shortDesc:
      "Pengelolaan dewan penasihat, perencanaan program mentorship terstruktur, dan registri mentor serta penasihat profesional.",
    to: "/contact-directory-and-social-networks?module=mentorship-and-advisory",
    icon: Compass,
    badge: "Professional",
    accentGradient: "from-sky-500 to-indigo-600",
    accentBorder: "border-sky-500/30 hover:border-sky-500/60",
    badgeBg: "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30",
    badgeText: "Professional",
    subMenus: [
      { id: "advisory-board", label: "Board Members", to: "/klien", inverted: false, componentCategory: "Records" },
      { id: "mentorship-program-planner", label: "Mentorship Program Planner", to: "", componentCategory: "Workflows" },
      { id: "advisory-board-register", label: "Advisory Board Register", to: "", componentCategory: "Records" },
    ],
  },
  {
    id: "partnership-networks",
    name: "Partnership Networks",
    category: "professional",
    categoryLabel: "Professional",
    shortDesc:
      "Pengelolaan pipeline pengembangan kemitraan profesional serta direktori mitra kolaborasi lintas organisasi dan ekosistem.",
    to: "/contact-directory-and-social-networks?module=partnership-networks",
    icon: Handshake,
    badge: "Professional",
    accentGradient: "from-emerald-500 to-green-600",
    accentBorder: "border-emerald-500/30 hover:border-emerald-500/60",
    badgeBg: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    badgeText: "Professional",
    subMenus: [
      { id: "partnership-pipeline", label: "Partnership Pipeline", to: "", componentCategory: "Workflows" },
      { id: "partnership-directory", label: "Partnership Directory", to: "", componentCategory: "Records" },
    ],
  },

  // 5. Social Engagement (3)
  {
    id: "celebrations-gift-tracker",
    name: "Social Occasions",
    category: "engagement",
    categoryLabel: "Engagement",
    shortDesc:
      "Pengingat hari ulang tahun, kalender perayaan hari jadi mitra, log riwayat bingkisan apresiasi, dan templat kartu ucapan selamat.",
    to: "/lainnya?app=gift-tracker",
    icon: Gift,
    badge: "Engagement",
    accentGradient: "from-rose-500 to-red-600",
    accentBorder: "border-rose-500/30 hover:border-rose-500/60",
    badgeBg: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
    badgeText: "Engagement",
    subMenus: [
      { id: "gift-tracker", label: "Gift History", to: "/lainnya?app=gift-tracker", inverted: false, componentCategory: "Records" },
      { id: "anniversaries", label: "Anniversary Calendar", to: "/peh/gifts", inverted: false, componentCategory: "Automations" },
      { id: "greeting-cards", label: "Greeting Cards", to: "/notes", inverted: false, componentCategory: "Templates" },
    ],
  },
  {
    id: "social-events",
    name: "Social Events",
    category: "engagement",
    categoryLabel: "Engagement",
    shortDesc:
      "Perencanaan acara sosial, pertemuan komunitas atau keluarga besar, serta penyusunan templat undangan kegiatan silaturahmi.",
    to: "/contact-directory-and-social-networks?module=social-events",
    icon: Sparkles,
    badge: "Engagement",
    accentGradient: "from-pink-500 to-rose-600",
    accentBorder: "border-pink-500/30 hover:border-pink-500/60",
    badgeBg: "bg-pink-500/15 text-pink-600 dark:text-pink-400 border-pink-500/30",
    badgeText: "Engagement",
    subMenus: [
      { id: "social-event-planner", label: "Social Event Planner", to: "", componentCategory: "Workflows" },
      { id: "event-invitations", label: "Event Invitations", to: "", componentCategory: "Templates" },
    ],
  },
  {
    id: "recognition-and-appreciation",
    name: "Recognition Programs",
    category: "engagement",
    categoryLabel: "Engagement",
    shortDesc:
      "Pelacakan momen penghargaan, catatan apresiasi personal maupun profesional, dan rekaman ucapan terima kasih kepada jejaring.",
    to: "/contact-directory-and-social-networks?module=recognition-and-appreciation",
    icon: Trophy,
    badge: "Engagement",
    accentGradient: "from-yellow-500 to-amber-600",
    accentBorder: "border-yellow-500/30 hover:border-yellow-500/60",
    badgeBg: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border-yellow-500/30",
    badgeText: "Engagement",
    subMenus: [
      { id: "recognition-tracker", label: "Recognition Tracker", to: "", componentCategory: "Records" },
    ],
  },

  // 6. Communication and Coordination (3)
  {
    id: "communication-channels",
    name: "Communication Channels",
    category: "communication",
    categoryLabel: "Communication",
    shortDesc:
      "Pengelolaan preferensi saluran komunikasi setiap kontak, kanal prioritas, dan panduan etika waktu menghubungi relasi.",
    to: "/contact-directory-and-social-networks?module=communication-channels",
    icon: Radio,
    badge: "Communication",
    accentGradient: "from-blue-600 to-cyan-600",
    accentBorder: "border-blue-500/30 hover:border-blue-500/60",
    badgeBg: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
    badgeText: "Communication",
    subMenus: [
      { id: "communication-preference-profiles", label: "Communication Preference Profiles", to: "", componentCategory: "Records" },
    ],
  },
  {
    id: "interaction-planning",
    name: "Interaction Management",
    category: "communication",
    categoryLabel: "Communication",
    shortDesc:
      "Perencanaan jadwal pertemuan, agenda check-in berkala, dan prioritas komunikasi relasi agar interaksi strategis berjalan teratur.",
    to: "/contact-directory-and-social-networks?module=interaction-planning",
    icon: CalendarClock,
    badge: "Communication",
    accentGradient: "from-violet-500 to-indigo-600",
    accentBorder: "border-violet-500/30 hover:border-violet-500/60",
    badgeBg: "bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/30",
    badgeText: "Communication",
    subMenus: [
      { id: "interaction-log", label: "Interaction Log", to: "/interaction-manager", inverted: false, componentCategory: "Records" },
    ],
  },
  {
    id: "network-coordination",
    name: "Network Management",
    category: "communication",
    categoryLabel: "Communication",
    shortDesc:
      "Koordinasi tindak lanjut jejaring lintas lingkaran relasi dan otomatisasi pengingat sapaan maupun tindak lanjut komunikasi.",
    to: "/contact-directory-and-social-networks?module=network-coordination",
    icon: GitBranch,
    badge: "Communication",
    accentGradient: "from-teal-500 to-emerald-600",
    accentBorder: "border-teal-500/30 hover:border-teal-500/60",
    badgeBg: "bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30",
    badgeText: "Communication",
    subMenus: [
      { id: "relationship-follow-up-automations", label: "Relationship Follow-Up Automations", to: "", componentCategory: "Automations" },
    ],
  },
];

export const SOCIAL_CATEGORY_TABS: {
  id: SocialCategory;
  label: string;
  count: number;
}[] = [
  { id: "all", label: "Semua", count: SOCIAL_NETWORKS_APPS.length },
  {
    id: "directory",
    label: "Directory",
    count: SOCIAL_NETWORKS_APPS.filter((a) => a.category === "directory").length,
  },
  {
    id: "relationships",
    label: "Relationships",
    count: SOCIAL_NETWORKS_APPS.filter((a) => a.category === "relationships").length,
  },
  {
    id: "communities",
    label: "Communities",
    count: SOCIAL_NETWORKS_APPS.filter((a) => a.category === "communities").length,
  },
  {
    id: "professional",
    label: "Professional",
    count: SOCIAL_NETWORKS_APPS.filter((a) => a.category === "professional").length,
  },
  {
    id: "engagement",
    label: "Engagement",
    count: SOCIAL_NETWORKS_APPS.filter((a) => a.category === "engagement").length,
  },
  {
    id: "communication",
    label: "Communication",
    count: SOCIAL_NETWORKS_APPS.filter((a) => a.category === "communication").length,
  },
];

export const SOCIAL_TOTAL_MODULES = SOCIAL_NETWORKS_APPS.length;
export const SOCIAL_TOOLS_COUNT = SOCIAL_NETWORKS_APPS.reduce(
  (sum, app) => sum + app.subMenus.filter((s) => s.componentCategory === "Tools").length,
  0
);
export const SOCIAL_FEATURES_COUNT = SOCIAL_NETWORKS_APPS.reduce(
  (sum, app) => sum + app.subMenus.filter((s) => s.componentCategory !== "Tools").length,
  0
);
export const SOCIAL_TOTAL_BADGE = `${SOCIAL_TOTAL_MODULES} Modul • ${SOCIAL_FEATURES_COUNT} Features • ${SOCIAL_TOOLS_COUNT} Tools`;
syncLauncherPageBadge("mode_networks", SOCIAL_TOTAL_BADGE);
export const SOCIAL_SUMMARY_DESC = SOCIAL_CATEGORY_TABS.filter((t) => t.id !== "all")
  .map((t) => `${t.label} (${t.count})`)
  .join(" · ");

export function ContactDirectoryNetworksPage({
  isEmbedded: _isEmbedded = false,
}: {
  isEmbedded?: boolean;
} = {}) {
  const [selectedCategory, setSelectedCategory] = useState<SocialCategory>(() => {
    if (typeof window !== "undefined") {
      try {
        const params = new URLSearchParams(window.location.search);
        const cat = params.get("category") || params.get("pill");
        if (cat) return normalizeSocialCategory(cat);
      } catch {}
    }
    return "all";
  });
  const [searchQuery, setSearchQuery] = useState("");
  const { isFavorite, toggleFavorite } = useFavorites();
  const pageId = useCurrentLauncherPage("mode_networks") || "mode_networks";
  const { getPageCountDelta, getCardsMovedIntoPage } = useCardPageMover();
  const { pinnedList } = usePinnedCards(pageId);

  const filteredApps = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = SOCIAL_NETWORKS_APPS.filter((app) => {
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
          items={adjustCategoryTabsCount(SOCIAL_CATEGORY_TABS, getPageCountDelta(pageId))}
          activeId={selectedCategory}
          onSelect={(id) => setSelectedCategory(id as SocialCategory)}
        />
      </ShellHeader>

      <div className="w-full mx-auto pt-3 sm:pt-4 space-y-3 sm:space-y-4">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground/90 tracking-tight flex items-center justify-center gap-2.5">
            <span>Contact Directory <span className="font-normal">and</span> Social Networks</span>
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
              Tidak ada modul relasi ditemukan
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
