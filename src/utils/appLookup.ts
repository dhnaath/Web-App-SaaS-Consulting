import {
  Compass,
  FolderKanban,
  Gem,
  Home,
  LayoutDashboard,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { navAllSidebar } from "@/config/nav";
import { WORKSPACE_PAGES } from "@/config/workspacePages";
import { LAUNCHER_PAGE_OPTIONS } from "@/hooks/useCardPageMover";
import { STANDALONE_APPS } from "@/features/standalone/standaloneAppsData";

export interface AppRouteMeta {
  to: string;
  label: string;
  icon: LucideIcon;
  category: string;
  iconColor: string;
  accentGradient: string;
}

const DEFAULT_META: AppRouteMeta = {
  to: "/",
  label: "Modul Aplikasi",
  icon: Layers,
  category: "Workspace",
  iconColor: "text-primary",
  accentGradient: "from-slate-600 to-slate-800",
};

const CATEGORY_GRADIENTS: Record<string, string> = {
  Finance: "from-emerald-500 to-teal-700",
  "Keuangan & Pasar": "from-emerald-500 to-teal-700",
  Business: "from-amber-500 to-orange-700",
  "Knowledge & Bisnis": "from-amber-500 to-orange-700",
  Productivity: "from-blue-500 to-indigo-700",
  "100 Tools": "from-indigo-500 to-violet-700",
  "100 Framework": "from-indigo-500 to-violet-700",
  "Personal Life": "from-rose-500 to-pink-700",
  Personal: "from-teal-500 to-emerald-700",
  "Home and Leisure": "from-sky-500 to-blue-700",
  "Family and Community": "from-purple-500 to-fuchsia-700",
  "Phase Side": "from-cyan-500 to-blue-700",
  "Master Workspaces": "from-slate-600 to-zinc-800",
};

function buildLookupMap(): Map<string, AppRouteMeta> {
  const map = new Map<string, AppRouteMeta>();

  map.set("/", {
    to: "/",
    label: "Launcher Modul",
    icon: LayoutDashboard,
    category: "System",
    iconColor: "text-primary",
    accentGradient: "from-slate-700 to-slate-900",
  });
  map.set("/home", {
    to: "/home",
    label: "Beranda Eksekutif",
    icon: Home,
    category: "Executive",
    iconColor: "text-primary",
    accentGradient: "from-blue-600 to-indigo-700",
  });
  map.set("/proyek", {
    to: "/proyek",
    label: "Project Manager",
    icon: FolderKanban,
    category: "Productivity",
    iconColor: "text-blue-600",
    accentGradient: "from-blue-500 to-indigo-700",
  });
  for (const vtRoute of [
    "/value-treated",
    "/valuetreated",
    "/applied-value",
    "/kurasi-wealth",
  ]) {
    map.set(vtRoute, {
      to: "/value-treated",
      label: "Applied Value Framework",
      icon: Gem,
      category: "Value Treated",
      iconColor: "text-amber-500",
      accentGradient: "from-amber-500 to-orange-600",
    });
  }
  map.set("/kurasi", {
    to: "/kurasi",
    label: "Kurasi Pengetahuan Bisnis",
    icon: Gem,
    category: "Value Treated",
    iconColor: "text-amber-500",
    accentGradient: "from-amber-500 to-orange-600",
  });

  for (const pageOpt of LAUNCHER_PAGE_OPTIONS) {
    if (pageOpt.to) {
      map.set(pageOpt.to, {
        to: pageOpt.to,
        label: pageOpt.shortLabel,
        icon: pageOpt.icon,
        category: "Workspace",
        iconColor: "text-primary",
        accentGradient: "from-indigo-500 to-slate-700",
      });
    }
  }

  for (const group of navAllSidebar) {
    const gradient =
      CATEGORY_GRADIENTS[group.parentCategory || group.title] ||
      "from-slate-600 to-zinc-800";
    for (const item of group.items) {
      if (!map.has(item.to)) {
        map.set(item.to, {
          to: item.to,
          label: item.label,
          icon: item.icon || Compass,
          category: group.parentCategory || group.title,
          iconColor: "text-primary",
          accentGradient: gradient,
        });
      }
      const basePath = item.to.split("?")[0];
      if (!map.has(basePath)) {
        map.set(basePath, {
          to: item.to,
          label: item.label,
          icon: item.icon || Compass,
          category: group.parentCategory || group.title,
          iconColor: "text-primary",
          accentGradient: gradient,
        });
      }
    }
  }

  for (const ws of WORKSPACE_PAGES) {
    for (const mod of ws.modules) {
      if (!map.has(mod.to)) {
        map.set(mod.to, {
          to: mod.to,
          label: mod.title,
          icon: mod.icon || Layers,
          category: mod.categoryLabel || ws.label,
          iconColor: "text-primary",
          accentGradient: "from-indigo-500 to-blue-700",
        });
      }
      if (mod.features) {
        for (const feat of mod.features) {
          if (!map.has(feat.to)) {
            map.set(feat.to, {
              to: feat.to,
              label: feat.title,
              icon: feat.icon || mod.icon || Layers,
              category: mod.categoryLabel || mod.title,
              iconColor: "text-primary",
              accentGradient: "from-slate-600 to-slate-800",
            });
          }
        }
      }
    }
  }

  for (const [appId, cfg] of Object.entries(STANDALONE_APPS)) {
    const route = `/lainnya?app=${appId}`;
    if (!map.has(route)) {
      map.set(route, {
        to: route,
        label: cfg.title,
        icon: cfg.icon,
        category: cfg.categoryGroup,
        iconColor: "text-primary",
        accentGradient: cfg.colorScheme || "from-slate-600 to-slate-800",
      });
    }
  }

  return map;
}

let cachedMap: Map<string, AppRouteMeta> | null = null;

export function getAppMetaByRoute(route: string): AppRouteMeta {
  if (!route) return DEFAULT_META;
  if (!cachedMap) {
    cachedMap = buildLookupMap();
  }

  const exact = cachedMap.get(route);
  if (exact) return exact;

  const base = route.split("?")[0];
  const baseMatch = cachedMap.get(base);
  if (baseMatch) return baseMatch;

  const cleanLabel = base
    .replace(/^\//, "")
    .split("/")
    .pop()
    ?.replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    ...DEFAULT_META,
    to: route,
    label: cleanLabel || DEFAULT_META.label,
  };
}
