import React, { useMemo, useState } from "react";
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
  CheckCircle2,
  Compass,
  Eye,
  Heart,
  Layers,
  Lightbulb,
  MessagesSquare,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Workflow,
  BarChart3,
  type LucideIcon,
} from "lucide-react";

export type PhaseSideCategory =
  | "all"
  | "self-shaping"
  | "mutual-mapping"
  | "organization-optimizing";

export interface PhaseSideSubMenu {
  id: string;
  label: string;
  to: string;
  componentCategory: ModuleComponentCategory;
}

export interface PhaseSideAppItem {
  id: string;
  name: string;
  category: Exclude<PhaseSideCategory, "all">;
  categoryLabel: string;
  shortDesc: string;
  to: string;
  icon: LucideIcon;
  badge: string;
  accentGradient: string;
  badgeText: string;
  subMenus: PhaseSideSubMenu[];
}

export const PHASE_SIDE_APPS: PhaseSideAppItem[] = [
  // 1. Self-Shaping (4)
  {
    id: "phase-reliance",
    name: "Reliance",
    category: "self-shaping",
    categoryLabel: "Self-Shaping",
    shortDesc:
      "Self-reliance matrix for mapping single points of failure, critical operational dependencies, and emergency contingency plans.",
    to: "/reliance",
    icon: ShieldCheck,
    badge: "Self-Shaping",
    accentGradient: "from-indigo-500 to-blue-600",
    badgeText: "Self-Shaping",
    subMenus: [
      { id: "rel-metrics", label: "Dependency Audit", to: "/reliance", componentCategory: "Analytics" },
      { id: "rel-contingency", label: "Contingency Plans", to: "/reliance", componentCategory: "Workflows" },
      { id: "rel-checklist", label: "Resilience Checklist", to: "/reliance", componentCategory: "Tools" },
    ],
  },
  {
    id: "phase-sufficient",
    name: "Sufficient",
    category: "self-shaping",
    categoryLabel: "Self-Shaping",
    shortDesc:
      "Baseline resource sufficiency tracking reserve ratios, core capacity coverage, and sustainable operating buffers.",
    to: "/sufficient",
    icon: CheckCircle2,
    badge: "Self-Shaping",
    accentGradient: "from-emerald-500 to-teal-600",
    badgeText: "Self-Shaping",
    subMenus: [
      { id: "suf-dashboard", label: "Sufficiency Dashboard", to: "/sufficient", componentCategory: "Dashboards" },
      { id: "suf-thresholds", label: "Reserve Thresholds", to: "/sufficient", componentCategory: "Settings" },
      { id: "suf-records", label: "Capacity Records", to: "/sufficient", componentCategory: "Records" },
    ],
  },
  {
    id: "phase-improvement",
    name: "Improvement",
    category: "self-shaping",
    categoryLabel: "Self-Shaping",
    shortDesc:
      "Continuous Kaizen improvement engine focused on bottleneck elimination, operational efficiency, and cycle acceleration.",
    to: "/improvement",
    icon: TrendingUp,
    badge: "Self-Shaping",
    accentGradient: "from-sky-500 to-cyan-600",
    badgeText: "Self-Shaping",
    subMenus: [
      { id: "imp-analysis", label: "Bottleneck Analysis", to: "/improvement", componentCategory: "Analytics" },
      { id: "imp-log", label: "Optimization Log", to: "/improvement", componentCategory: "Records" },
      { id: "imp-workflow", label: "Process Refinement", to: "/improvement", componentCategory: "Workflows" },
    ],
  },
  {
    id: "phase-development",
    name: "Development",
    category: "self-shaping",
    categoryLabel: "Self-Shaping",
    shortDesc:
      "Long-term capability evolution roadmap aligning skill mastery, strategic growth programs, and milestone progression.",
    to: "/development",
    icon: Sparkles,
    badge: "Self-Shaping",
    accentGradient: "from-violet-500 to-purple-600",
    badgeText: "Self-Shaping",
    subMenus: [
      { id: "dev-roadmap", label: "Capability Roadmap", to: "/development", componentCategory: "Features" },
      { id: "dev-initiatives", label: "Growth Initiatives", to: "/development", componentCategory: "Workflows" },
      { id: "dev-milestones", label: "Evolution Milestones", to: "/development", componentCategory: "Records" },
    ],
  },

  // 2. Mutual-Mapping (4)
  {
    id: "phase-interact",
    name: "Interact",
    category: "mutual-mapping",
    categoryLabel: "Mutual-Mapping",
    shortDesc:
      "Bilateral stakeholder engagement hub logging touchpoints, communication reciprocity, sentiment trends, and next steps.",
    to: "/interact",
    icon: MessagesSquare,
    badge: "Mutual-Mapping",
    accentGradient: "from-blue-500 to-indigo-600",
    badgeText: "Mutual-Mapping",
    subMenus: [
      { id: "int-log", label: "Engagement Log", to: "/interact", componentCategory: "Records" },
      { id: "int-reciprocity", label: "Reciprocity Analytics", to: "/interact", componentCategory: "Analytics" },
      { id: "int-followup", label: "Follow-Up Queue", to: "/interact", componentCategory: "Workflows" },
    ],
  },
  {
    id: "phase-interest",
    name: "Interest",
    category: "mutual-mapping",
    categoryLabel: "Mutual-Mapping",
    shortDesc:
      "Shared-interest alignment matrix balancing partner priorities, mutual value drivers, and collaborative incentives.",
    to: "/interest",
    icon: Heart,
    badge: "Mutual-Mapping",
    accentGradient: "from-rose-500 to-pink-600",
    badgeText: "Mutual-Mapping",
    subMenus: [
      { id: "inr-matrix", label: "Interest Matrix", to: "/interest", componentCategory: "Tools" },
      { id: "inr-priorities", label: "Partner Priorities", to: "/interest", componentCategory: "Records" },
      { id: "inr-drivers", label: "Shared Value Board", to: "/interest", componentCategory: "Dashboards" },
    ],
  },
  {
    id: "phase-intersect",
    name: "Intersect",
    category: "mutual-mapping",
    categoryLabel: "Mutual-Mapping",
    shortDesc:
      "Cross-disciplinary convergence workspace identifying common ground across domains, teams, and multi-party initiatives.",
    to: "/intersect",
    icon: Layers,
    badge: "Mutual-Mapping",
    accentGradient: "from-amber-500 to-orange-600",
    badgeText: "Mutual-Mapping",
    subMenus: [
      { id: "ins-convergence", label: "Domain Convergence", to: "/intersect", componentCategory: "Tools" },
      { id: "ins-ventures", label: "Joint Initiatives", to: "/intersect", componentCategory: "Features" },
      { id: "ins-synergy", label: "Synergy Canvas", to: "/intersect", componentCategory: "Dashboards" },
    ],
  },
  {
    id: "phase-interdependence",
    name: "Interdependence",
    category: "mutual-mapping",
    categoryLabel: "Mutual-Mapping",
    shortDesc:
      "Mutualistic symbiosis tracker measuring reciprocal reliability, shared ecosystem nodes, and cooperative resilience.",
    to: "/interdependence",
    icon: Workflow,
    badge: "Mutual-Mapping",
    accentGradient: "from-teal-500 to-emerald-600",
    badgeText: "Mutual-Mapping",
    subMenus: [
      { id: "ind-scorecard", label: "Symbiosis Scorecard", to: "/interdependence", componentCategory: "Analytics" },
      { id: "ind-workflows", label: "Mutual Workflows", to: "/interdependence", componentCategory: "Workflows" },
      { id: "ind-nodes", label: "Ecosystem Nodes", to: "/interdependence", componentCategory: "Records" },
    ],
  },

  // 3. Organization-Optimizing (4)
  {
    id: "phase-insider",
    name: "Insider",
    category: "organization-optimizing",
    categoryLabel: "Organization-Optimizing",
    shortDesc:
      "Internal governance and organizational intelligence monitoring structural health, operating discipline, and core alignment.",
    to: "/insider",
    icon: Eye,
    badge: "Organization-Optimizing",
    accentGradient: "from-slate-600 to-zinc-800",
    badgeText: "Organization-Optimizing",
    subMenus: [
      { id: "in-governance", label: "Internal Governance", to: "/insider", componentCategory: "Features" },
      { id: "in-signals", label: "Organizational Radar", to: "/insider", componentCategory: "Dashboards" },
      { id: "in-review", label: "Alignment Review", to: "/insider", componentCategory: "Analytics" },
    ],
  },
  {
    id: "phase-insight",
    name: "Insight",
    category: "organization-optimizing",
    categoryLabel: "Organization-Optimizing",
    shortDesc:
      "Strategic intelligence synthesis transforming operational patterns and cross-functional findings into clear executive briefs.",
    to: "/insight",
    icon: Lightbulb,
    badge: "Organization-Optimizing",
    accentGradient: "from-yellow-500 to-amber-600",
    badgeText: "Organization-Optimizing",
    subMenus: [
      { id: "igi-synthesis", label: "Strategic Synthesis", to: "/insight", componentCategory: "Analytics" },
      { id: "igi-briefs", label: "Executive Briefs", to: "/insight", componentCategory: "Records" },
      { id: "igi-board", label: "Insight Board", to: "/insight", componentCategory: "Dashboards" },
    ],
  },
  {
    id: "phase-outward",
    name: "Outward",
    category: "organization-optimizing",
    categoryLabel: "Organization-Optimizing",
    shortDesc:
      "External environment observatory scanning market dynamics, regulatory shifts, competitive moves, and ecosystem signals.",
    to: "/outward",
    icon: Compass,
    badge: "Organization-Optimizing",
    accentGradient: "from-cyan-500 to-blue-600",
    badgeText: "Organization-Optimizing",
    subMenus: [
      { id: "out-radar", label: "External Radar", to: "/outward", componentCategory: "Dashboards" },
      { id: "out-scan", label: "Environment Scan", to: "/outward", componentCategory: "Analytics" },
      { id: "out-signals", label: "Macro Signals", to: "/outward", componentCategory: "Records" },
    ],
  },
  {
    id: "phase-outlook",
    name: "Outlook",
    category: "organization-optimizing",
    categoryLabel: "Organization-Optimizing",
    shortDesc:
      "Forward-looking horizon modeling projecting multi-quarter scenarios, strategic readiness, and future expansion paths.",
    to: "/outlook",
    icon: BarChart3,
    badge: "Organization-Optimizing",
    accentGradient: "from-purple-500 to-indigo-600",
    badgeText: "Organization-Optimizing",
    subMenus: [
      { id: "otl-scenarios", label: "Horizon Scenarios", to: "/outlook", componentCategory: "Tools" },
      { id: "otl-readiness", label: "Readiness Forecast", to: "/outlook", componentCategory: "Analytics" },
      { id: "otl-trajectory", label: "Trajectory Board", to: "/outlook", componentCategory: "Dashboards" },
    ],
  },
];

export const PHASE_SIDE_CATEGORY_TABS: {
  id: PhaseSideCategory;
  label: string;
  count: number;
}[] = [
  { id: "all", label: "All", count: PHASE_SIDE_APPS.length },
  {
    id: "self-shaping",
    label: "Self-Shaping",
    count: PHASE_SIDE_APPS.filter((a) => a.category === "self-shaping").length,
  },
  {
    id: "mutual-mapping",
    label: "Mutual-Mapping",
    count: PHASE_SIDE_APPS.filter((a) => a.category === "mutual-mapping").length,
  },
  {
    id: "organization-optimizing",
    label: "Organization-Optimizing",
    count: PHASE_SIDE_APPS.filter((a) => a.category === "organization-optimizing").length,
  },
];

export const PHASE_SIDE_TOTAL_MODULES = PHASE_SIDE_APPS.length;
export const PHASE_SIDE_TOOLS_COUNT = PHASE_SIDE_APPS.reduce(
  (sum, app) => sum + app.subMenus.filter((s) => s.componentCategory === "Tools").length,
  0
);
export const PHASE_SIDE_FEATURES_COUNT = PHASE_SIDE_APPS.reduce(
  (sum, app) => sum + app.subMenus.filter((s) => s.componentCategory !== "Tools").length,
  0
);
export const PHASE_SIDE_TOTAL_BADGE = `${PHASE_SIDE_TOTAL_MODULES} Modules • ${PHASE_SIDE_FEATURES_COUNT} Features • ${PHASE_SIDE_TOOLS_COUNT} Tools`;
syncLauncherPageBadge("mode_phase_side", PHASE_SIDE_TOTAL_BADGE);
export const PHASE_SIDE_SUMMARY_DESC = PHASE_SIDE_CATEGORY_TABS.filter(
  (t) => t.id !== "all"
)
  .map((t) => `${t.label} (${t.count})`)
  .join(" · ");

export function PhaseSidePage({
  isEmbedded = false,
}: {
  isEmbedded?: boolean;
} = {}) {
  const [selectedCategory, setSelectedCategory] = useState<PhaseSideCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { isFavorite, toggleFavorite } = useFavorites();
  const pageId = useCurrentLauncherPage("mode_phase_side") || "mode_phase_side";
  const { getPageCountDelta, getCardsMovedIntoPage } = useCardPageMover();
  const { pinnedList } = usePinnedCards(pageId);

  const filteredApps = useMemo(() => {
    const list = PHASE_SIDE_APPS.filter((app) => {
      const matchCategory =
        selectedCategory === "all" || app.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === "" ||
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.subMenus.some((sub) =>
          sub.label.toLowerCase().includes(searchQuery.toLowerCase())
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
            items={adjustCategoryTabsCount(
              PHASE_SIDE_CATEGORY_TABS,
              getPageCountDelta(pageId)
            )}
            activeId={selectedCategory}
            onSelect={(id) => setSelectedCategory(id as PhaseSideCategory)}
          />
        </ShellHeader>

        <div className="w-full mx-auto pt-3 sm:pt-4 space-y-3 sm:space-y-4">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground/90 tracking-tight flex items-center justify-center gap-2.5">
              <span>Phase: Mutual-Self-Organization</span>
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
                  to: sub.to || app.to,
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
            (selectedCategory !== "all" ||
              getCardsMovedIntoPage(pageId).length === 0) && (
              <div className="text-center py-16 rounded-3xl border border-dashed border-border p-8 bg-card/40">
                <Search className="size-8 text-muted-foreground mx-auto mb-3 opacity-60" />
                <h3 className="text-base font-semibold text-foreground">
                  No modules found
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Try another keyword or switch the selected category filter.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                  }}
                  className="mt-4 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-medium cursor-pointer"
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

export default PhaseSidePage;
