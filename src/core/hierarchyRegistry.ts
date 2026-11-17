import type { LucideIcon } from "lucide-react";
import {
  Compass,
  FolderKanban,
  Layers,
  Sparkles,
  Wrench,
  LayoutDashboard,
  GitBranch,
  Zap,
  BarChart3,
  FileCode2,
  Database,
  BookOpen,
  Settings,
} from "lucide-react";
import {
  WORKSPACE_PAGES,
  getModuleCategory,
  type WorkspacePageDef,
  type WorkspaceModuleItem,
} from "@/config/workspacePages";
import {
  SUB_COMPONENT_KEYS,
  SUB_COMPONENT_TABS,
  SUB_COMPONENT_TAB_MAP,
  getUnifiedWorkspaceById,
  type SubComponentKey,
  type SubComponentTabDef,
} from "@/core/unifiedTaxonomy";

export interface HierarchyComponentItem {
  readonly id: string;
  readonly title: string;
  readonly desc?: string;
  readonly icon: LucideIcon;
  readonly route: string;
  readonly componentKey: SubComponentKey;
}

export interface HierarchyComponentSlot {
  readonly key: SubComponentKey;
  readonly meta: SubComponentTabDef;
  readonly routePath: string;
  readonly status: "ready" | "empty";
  readonly items: readonly HierarchyComponentItem[];
}

export interface HierarchyModule {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly desc: string;
  readonly badge?: string;
  readonly icon: LucideIcon;
  readonly pageId: string;
  readonly pageSlug: string;
  readonly categorySlug: string;
  readonly categoryLabel: string;
  readonly routePath: string;
  readonly legacyRoute: string;
  readonly defaultComponentKey: SubComponentKey;
  readonly activeComponentKeys: readonly SubComponentKey[];
  readonly totalItems: number;
  readonly components: Readonly<Record<SubComponentKey, HierarchyComponentSlot>>;
}

export interface HierarchyCategory {
  readonly id: string;
  readonly slug: string;
  readonly label: string;
  readonly pageId: string;
  readonly pageSlug: string;
  readonly routePath: string;
  readonly icon: LucideIcon;
  readonly modules: readonly HierarchyModule[];
  readonly activeComponentCount: number;
}

export interface HierarchyPage {
  readonly id: string;
  readonly slug: string;
  readonly modeId: string;
  readonly label: string;
  readonly labelId: string;
  readonly desc: string;
  readonly badge: string;
  readonly icon: LucideIcon;
  readonly routePath: string;
  readonly legacyRoute: string;
  readonly categories: readonly HierarchyCategory[];
  readonly totalModules: number;
  readonly totalActiveComponents: number;
}

const PAGE_SLUG_BY_ID: Record<string, string> = {
  financial: "financial-planning-and-wealth-management",
  mode_business: "business-administration-and-operations-management",
  mode_employment: "productivity-workspace-and-workflow-systems",
  mode_creative: "creative-workspace-and-media-production",
  mode_research: "research-foundations-and-reference-frameworks",
  mode_sharia: "islamic-principles-and-sharia-values",
  mode_personal: "personal-life-management",
  mode_family: "household-planning-and-family-records",
  mode_public_affairs: "policy-affairs-and-public-relations",
  mode_networks: "contact-directory-and-social-networks",
  mode_phase_side: "phase-mutual-self-organization",
};

const PAGE_ALIASES: Record<string, string> = {
  financial: "financial-planning-and-wealth-management",
  "financial-planning": "financial-planning-and-wealth-management",
  "financial-wealth": "financial-planning-and-wealth-management",
  "financial-planning-and-wealth-management": "financial-planning-and-wealth-management",
  mode_business: "business-administration-and-operations-management",
  business: "business-administration-and-operations-management",
  "business-operations": "business-administration-and-operations-management",
  "business-administration-and-operations-management": "business-administration-and-operations-management",
  mode_employment: "productivity-workspace-and-workflow-systems",
  employment: "productivity-workspace-and-workflow-systems",
  "work-productivity": "productivity-workspace-and-workflow-systems",
  "productivity-workspace-and-workflow-systems": "productivity-workspace-and-workflow-systems",
  mode_creative: "creative-workspace-and-media-production",
  creative: "creative-workspace-and-media-production",
  "creative-workspace": "creative-workspace-and-media-production",
  "creative-workspace-and-media-production": "creative-workspace-and-media-production",
  mode_research: "research-foundations-and-reference-frameworks",
  research: "research-foundations-and-reference-frameworks",
  "research-frameworks": "research-foundations-and-reference-frameworks",
  "research-foundations-and-reference-frameworks": "research-foundations-and-reference-frameworks",
  mode_sharia: "islamic-principles-and-sharia-values",
  sharia: "islamic-principles-and-sharia-values",
  syariah: "islamic-principles-and-sharia-values",
  "sharia-values": "islamic-principles-and-sharia-values",
  "islamic-principles": "islamic-principles-and-sharia-values",
  "islamic-principles-and-sharia-values": "islamic-principles-and-sharia-values",
  mode_personal: "personal-life-management",
  personal: "personal-life-management",
  "personal-life": "personal-life-management",
  "personal-life-management": "personal-life-management",
  mode_family: "household-planning-and-family-records",
  family: "household-planning-and-family-records",
  "family-records": "household-planning-and-family-records",
  "family-records-and-household-planning": "household-planning-and-family-records",
  "household-planning-and-family-records": "household-planning-and-family-records",
  mode_public_affairs: "policy-affairs-and-public-relations",
  public_affairs: "policy-affairs-and-public-relations",
  "public-affairs": "policy-affairs-and-public-relations",
  "public-relations-and-policy-affairs": "policy-affairs-and-public-relations",
  "policy-affairs-and-public-relations": "policy-affairs-and-public-relations",
  mode_networks: "contact-directory-and-social-networks",
  networks: "contact-directory-and-social-networks",
  "social-networks": "contact-directory-and-social-networks",
  "contact-directory": "contact-directory-and-social-networks",
  "contact-directory-and-social-networks": "contact-directory-and-social-networks",
  mode_phase_side: "phase-mutual-self-organization",
  phase_side: "phase-mutual-self-organization",
  "phase-side": "phase-mutual-self-organization",
  "mutual-self-organization": "phase-mutual-self-organization",
  "phase-mutual-self-organization": "phase-mutual-self-organization",
};

export function slugifySegment(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "item";
}

function normalizeComponentKey(raw?: string): SubComponentKey {
  if (!raw) return "features";
  const lower = raw.trim().toLowerCase();
  if ((SUB_COMPONENT_KEYS as readonly string[]).includes(lower)) {
    return lower as SubComponentKey;
  }
  return "features";
}

function inferPrimaryComponentKey(mod: WorkspaceModuleItem): SubComponentKey {
  const path = (mod.to || "").toLowerCase();
  const title = (mod.title || "").toLowerCase();

  if (
    path.includes("overview") ||
    path.includes("dashboard") ||
    path.includes("financial-health") ||
    path.includes("life-planner") ||
    title.includes("dashboard") ||
    title.includes("overview")
  ) {
    return "dashboards";
  }
  if (
    path.includes("statistics") ||
    path.includes("investments") ||
    path.includes("time-audit") ||
    path.includes("comparison") ||
    path.includes("analytics")
  ) {
    return "analytics";
  }
  if (
    path.includes("workflow") ||
    path.includes("kanban") ||
    path.includes("approval") ||
    path.includes("milestone") ||
    path.includes("planner") ||
    path.includes("timeline") ||
    path.includes("schedule")
  ) {
    return "workflows";
  }
  if (
    path.includes("automation") ||
    path.includes("reminder") ||
    path.includes("notification") ||
    path.includes("subscription")
  ) {
    return "automations";
  }
  if (path.includes("template") || path.includes("forms")) {
    return "templates";
  }
  if (
    path.includes("wiki") ||
    path.includes("kurasi") ||
    path.includes("knowledge") ||
    path.includes("reading") ||
    path.includes("courses") ||
    path.includes("incoterms") ||
    path.includes("syariah") ||
    path.includes("framework")
  ) {
    return path.includes("framework/") ? "tools" : "guides";
  }
  if (
    path.includes("kalkulator") ||
    path.includes("budget") ||
    path.includes("valuasi") ||
    path.includes("zakat") ||
    path.includes("pajak") ||
    path.includes("eisenhower") ||
    path.includes("pomodoro") ||
    path.includes("countdown") ||
    path.includes("swot") ||
    path.includes("tows") ||
    path.includes("matrix")
  ) {
    return "tools";
  }
  if (path.includes("settings") || path.includes("access-matrix")) {
    return "settings";
  }
  if (
    path.includes("database") ||
    path.includes("documents") ||
    path.includes("vault") ||
    path.includes("contacts") ||
    path.includes("people") ||
    path.includes("assets") ||
    path.includes("inventory") ||
    path.includes("records") ||
    path.includes("cap-table") ||
    path.includes("real-estate") ||
    path.includes("ip-licenses")
  ) {
    return "records";
  }
  return "features";
}

function getCategoryIcon(label: string): LucideIcon {
  const l = label.toLowerCase();
  if (l.includes("strateg") || l.includes("plan") || l.includes("surety")) return Compass;
  if (l.includes("operat") || l.includes("execut") || l.includes("workflow")) return GitBranch;
  if (l.includes("financ") || l.includes("flow") || l.includes("grow") || l.includes("invest")) return BarChart3;
  if (l.includes("tool") || l.includes("util") || l.includes("tech")) return Wrench;
  if (l.includes("govern") || l.includes("control") || l.includes("admin") || l.includes("compliance")) return Settings;
  if (l.includes("know") || l.includes("learn") || l.includes("academ") || l.includes("research")) return BookOpen;
  if (l.includes("record") || l.includes("propert") || l.includes("asset") || l.includes("build")) return Database;
  if (l.includes("auto")) return Zap;
  if (l.includes("template")) return FileCode2;
  if (l.includes("dashboard") || l.includes("overview")) return LayoutDashboard;
  if (l.includes("design") || l.includes("creative") || l.includes("media")) return Sparkles;
  return Layers;
}

function buildModuleHierarchy(
  mod: WorkspaceModuleItem,
  pageSlug: string,
  pageId: string,
  categorySlug: string,
  categoryLabel: string,
  moduleSlug: string,
): HierarchyModule {
  const moduleRoutePath = `/${pageSlug}/${categorySlug}/${moduleSlug}`;

  const buckets: Record<SubComponentKey, HierarchyComponentItem[]> = {
    dashboards: [],
    features: [],
    tools: [],
    workflows: [],
    automations: [],
    analytics: [],
    templates: [],
    records: [],
    guides: [],
    settings: [],
  };

  const seenRoutes = new Set<string>();

  if (mod.features && mod.features.length > 0) {
    mod.features.forEach((feat, idx) => {
      const key = normalizeComponentKey(feat.componentCategory);
      const targetRoute = feat.to && feat.to.trim() ? feat.to : mod.to;
      seenRoutes.add(targetRoute);
      buckets[key].push({
        id: `${moduleSlug}-${key}-${idx}-${slugifySegment(feat.title)}`,
        title: feat.title,
        desc: feat.desc,
        icon: feat.icon || mod.icon,
        route: targetRoute,
        componentKey: key,
      });
    });
  }

  // Pastikan rute utama modul selalu tersedia di slot komponen yang paling sesuai
  if (mod.to && mod.to.trim() && !seenRoutes.has(mod.to)) {
    const primaryKey = inferPrimaryComponentKey(mod);
    buckets[primaryKey].unshift({
      id: `${moduleSlug}-primary`,
      title: mod.title,
      desc: mod.desc,
      icon: mod.icon,
      route: mod.to,
      componentKey: primaryKey,
    });
  }

  const components = {} as Record<SubComponentKey, HierarchyComponentSlot>;
  const activeComponentKeys: SubComponentKey[] = [];
  let totalItems = 0;

  for (const key of SUB_COMPONENT_KEYS) {
    const items = buckets[key];
    if (items.length > 0) {
      activeComponentKeys.push(key);
      totalItems += items.length;
    }
    components[key] = {
      key,
      meta: SUB_COMPONENT_TAB_MAP[key],
      routePath: `${moduleRoutePath}/${key}`,
      status: items.length > 0 ? "ready" : "empty",
      items,
    };
  }

  const defaultComponentKey: SubComponentKey =
    activeComponentKeys[0] || "features";

  return {
    id: mod.id,
    slug: moduleSlug,
    title: mod.title,
    desc: mod.desc || "Modul operasional dan instrumen kerja terstruktur.",
    badge: mod.badge,
    icon: mod.icon || FolderKanban,
    pageId,
    pageSlug,
    categorySlug,
    categoryLabel,
    routePath: moduleRoutePath,
    legacyRoute: mod.to,
    defaultComponentKey,
    activeComponentKeys,
    totalItems,
    components,
  };
}

function buildHierarchyPages(): readonly HierarchyPage[] {
  return WORKSPACE_PAGES.map((page: WorkspacePageDef) => {
    const pageSlug = PAGE_SLUG_BY_ID[page.id] || slugifySegment(page.id);
    const unified = getUnifiedWorkspaceById(page.id);

    const catOrder: string[] = [];
    const catModulesMap = new Map<string, WorkspaceModuleItem[]>();

    for (const mod of page.modules) {
      const catLabel = getModuleCategory(mod, page.id) || "Modul";
      if (!catModulesMap.has(catLabel)) {
        catOrder.push(catLabel);
        catModulesMap.set(catLabel, []);
      }
      catModulesMap.get(catLabel)!.push(mod);
    }

    const usedCategorySlugs = new Set<string>();
    const categories: HierarchyCategory[] = catOrder.map((catLabel) => {
      let catSlug = slugifySegment(catLabel);
      if (usedCategorySlugs.has(catSlug)) {
        let n = 2;
        while (usedCategorySlugs.has(`${catSlug}-${n}`)) n += 1;
        catSlug = `${catSlug}-${n}`;
      }
      usedCategorySlugs.add(catSlug);

      const rawMods = catModulesMap.get(catLabel) || [];
      const usedModuleSlugs = new Set<string>();
      const modules: HierarchyModule[] = rawMods.map((mod) => {
        let modSlug = slugifySegment(mod.title || mod.id);
        if (usedModuleSlugs.has(modSlug)) {
          let n = 2;
          while (usedModuleSlugs.has(`${modSlug}-${n}`)) n += 1;
          modSlug = `${modSlug}-${n}`;
        }
        usedModuleSlugs.add(modSlug);
        return buildModuleHierarchy(
          mod,
          pageSlug,
          page.id,
          catSlug,
          catLabel,
          modSlug,
        );
      });

      const activeComponentCount = modules.reduce(
        (acc, m) => acc + m.activeComponentKeys.length,
        0,
      );

      return {
        id: `${pageSlug}:${catSlug}`,
        slug: catSlug,
        label: catLabel,
        pageId: page.id,
        pageSlug,
        routePath: `/${pageSlug}/${catSlug}`,
        icon: getCategoryIcon(catLabel),
        modules,
        activeComponentCount,
      };
    });

    const totalModules = categories.reduce((acc, c) => acc + c.modules.length, 0);
    const totalActiveComponents = categories.reduce(
      (acc, c) => acc + c.activeComponentCount,
      0,
    );

    return {
      id: page.id,
      slug: pageSlug,
      modeId: page.modeId,
      label: unified?.labelEn || page.label,
      labelId: unified?.labelId || page.label,
      desc: unified?.description || page.desc,
      badge: page.badge,
      icon: unified?.icon || page.icon,
      routePath: `/${pageSlug}`,
      legacyRoute: unified?.routePath || `/${pageSlug}`,
      categories,
      totalModules,
      totalActiveComponents,
    };
  });
}

export const HIERARCHY_PAGES: readonly HierarchyPage[] = buildHierarchyPages();

export function getHierarchyPages(): readonly HierarchyPage[] {
  return HIERARCHY_PAGES;
}

export function resolvePageSlug(rawSlugOrId: string | null | undefined): string | null {
  if (!rawSlugOrId) return null;
  const normalized = rawSlugOrId.trim().toLowerCase().replace(/^\/+|\/+$/g, "");
  return PAGE_ALIASES[normalized] || normalized;
}

export function getHierarchyPage(pageSlugOrId: string | null | undefined): HierarchyPage | undefined {
  const resolved = resolvePageSlug(pageSlugOrId);
  if (!resolved) return undefined;
  return HIERARCHY_PAGES.find(
    (p) => p.slug === resolved || p.id.toLowerCase() === resolved || p.modeId.toLowerCase() === resolved,
  );
}

export function getHierarchyCategory(
  pageSlugOrId: string | null | undefined,
  categorySlugOrName: string | null | undefined,
): HierarchyCategory | undefined {
  const page = getHierarchyPage(pageSlugOrId);
  if (!page || !categorySlugOrName) return undefined;
  const norm = slugifySegment(categorySlugOrName);
  return (
    page.categories.find((c) => c.slug === norm) ||
    page.categories.find((c) => c.label.toLowerCase() === categorySlugOrName.trim().toLowerCase())
  );
}

export function getHierarchyModule(
  pageSlugOrId: string | null | undefined,
  categorySlugOrName: string | null | undefined,
  moduleSlugOrId: string | null | undefined,
): HierarchyModule | undefined {
  const cat = getHierarchyCategory(pageSlugOrId, categorySlugOrName);
  if (!cat || !moduleSlugOrId) return undefined;
  const norm = slugifySegment(moduleSlugOrId);
  return (
    cat.modules.find((m) => m.slug === norm) ||
    cat.modules.find((m) => slugifySegment(m.id) === norm) ||
    cat.modules.find((m) => m.id.toLowerCase() === moduleSlugOrId.trim().toLowerCase()) ||
    cat.modules.find((m) => m.title.toLowerCase() === moduleSlugOrId.trim().toLowerCase())
  );
}

export function getHierarchyModuleRoute(
  pageIdOrSlug: string,
  categoryLabelOrSlug: string,
  moduleIdOrSlug: string,
  componentKey?: SubComponentKey,
): string | null {
  const mod = getHierarchyModule(pageIdOrSlug, categoryLabelOrSlug, moduleIdOrSlug);
  if (!mod) return null;
  if (componentKey) {
    return `${mod.routePath}/${componentKey}`;
  }
  return `${mod.routePath}/${mod.defaultComponentKey}`;
}

export function findHierarchyByLegacyRoute(rawRoute: string): {
  page: HierarchyPage;
  category: HierarchyCategory;
  module: HierarchyModule;
  componentKey: SubComponentKey;
} | null {
  const clean = (rawRoute || "").split("?")[0].trim();
  if (!clean) return null;

  for (const page of HIERARCHY_PAGES) {
    for (const category of page.categories) {
      for (const mod of category.modules) {
        if (mod.legacyRoute.split("?")[0] === clean) {
          return {
            page,
            category,
            module: mod,
            componentKey: mod.defaultComponentKey,
          };
        }
        for (const key of SUB_COMPONENT_KEYS) {
          const slot = mod.components[key];
          if (slot.items.some((item) => item.route.split("?")[0] === clean)) {
            return {
              page,
              category,
              module: mod,
              componentKey: key,
            };
          }
        }
      }
    }
  }
  return null;
}

export { SUB_COMPONENT_TABS, SUB_COMPONENT_KEYS, type SubComponentKey };
