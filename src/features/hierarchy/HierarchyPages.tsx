import React, { useMemo, useState, useEffect, useId } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { motion, LayoutGroup } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Layers,
} from "lucide-react";
import { AppShell } from "@/app/app-shell";
import {
  HeaderNavPills,
  ShellHeader,
  type HeaderNavPillItem,
} from "@/app/shell-header";
import {
  MBACard,
  getComponentCategoryIcon,
  type MBACardCategoryGroup,
} from "@/components/common/MBACard";
import { LauncherPageProvider } from "@/hooks/useCardPageMover";
import { useFavorites } from "@/hooks/useFavorites";
import {
  getHierarchyPages,
  getHierarchyPage,
  getHierarchyCategory,
  getHierarchyModule,
  SUB_COMPONENT_TABS,
  SUB_COMPONENT_KEYS,
  type HierarchyPage,
  type HierarchyCategory,
  type HierarchyModule,
  type SubComponentKey,
} from "@/core/hierarchyRegistry";
import { resolveEmbeddedRouteElement } from "@/core/routeComponentMap";
import { setRaw } from "@/core/rawStorage";

const CARD_GRADIENTS = [
  "bg-linear-to-br from-blue-500 to-indigo-700",
  "bg-linear-to-br from-indigo-500 to-purple-700",
  "bg-linear-to-br from-purple-500 to-pink-700",
  "bg-linear-to-br from-rose-500 to-red-700",
  "bg-linear-to-br from-amber-500 to-orange-700",
  "bg-linear-to-br from-emerald-500 to-teal-700",
  "bg-linear-to-br from-cyan-500 to-blue-700",
  "bg-linear-to-br from-violet-500 to-fuchsia-700",
  "bg-linear-to-br from-teal-500 to-emerald-700",
  "bg-linear-to-br from-sky-500 to-blue-700",
];

function pickCardGradient(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return CARD_GRADIENTS[Math.abs(hash) % CARD_GRADIENTS.length];
}

// ============================================================================
// LEVEL 0: DIREKTORI SEMUA HALAMAN (/workspace-directory)
// ============================================================================

export function HierarchyDirectoryPage() {
  const pages = useMemo(() => getHierarchyPages(), []);

  return (
    <AppShell
      title="Workspace Directory"
      subtitle="Halaman → Kategori → Modul → 10 Jenis Komponen"
    >
      <div className="w-full max-w-[1815px] mx-auto px-4 sm:px-6 pb-16 pt-3 sm:pt-4 space-y-4">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground/90 tracking-tight">
            Workspace <span className="font-normal">Directory</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5 sm:gap-5">
          {pages.map((page) => {
            const PageIcon = page.icon;
            const gradient = pickCardGradient(page.id);
            return (
              <div
                key={page.id}
                className="w-full min-h-[280px] rounded-[28px] border border-border bg-card p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between gap-4 group"
              >
                <div className="flex flex-col flex-1">
                  <Link
                    to={"/$pageSlug" as any}
                    params={{ pageSlug: page.slug } as any}
                    className="flex items-center gap-3.5 group/header min-w-0 outline-none"
                  >
                    <div
                      className={`h-12 w-12 rounded-full flex items-center justify-center text-white shadow-xs shrink-0 ${gradient} group-hover/header:scale-105 transition-all`}
                    >
                      <PageIcon className="h-6 w-6 opacity-90 drop-shadow-sm" strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-base text-foreground group-hover/header:text-primary transition-colors truncate">
                        {page.label}
                      </h4>
                      <span className="text-[11px] text-muted-foreground truncate block mt-0.5">
                        {page.categories.length} Kategori • {page.totalModules} Modul
                      </span>
                    </div>
                  </Link>

                  <div className="mt-4 pt-1 flex flex-col flex-1">
                    <span className="inline-flex items-center justify-center gap-1 text-[10px] font-normal tracking-wider text-muted-foreground mb-2 text-center shrink-0">
                      <Layers size={11} className="shrink-0" />
                      <span>Kategori ({page.categories.length}):</span>
                    </span>
                    <div className="flex flex-wrap justify-center content-start gap-1.5 w-full">
                      {page.categories.map((cat) => (
                        <Link
                          key={cat.id}
                          to={"/$pageSlug/$categorySlug" as any}
                          params={{ pageSlug: page.slug, categorySlug: cat.slug } as any}
                          className="w-auto max-w-full inline-flex items-center justify-center px-[8px] py-[6px] rounded-full bg-muted/60 hover:bg-primary/10 hover:text-primary text-[11px] font-medium text-foreground transition-all cursor-pointer border border-border/40 hover:border-primary/30 text-center"
                        >
                          <span>{cat.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end text-xs shrink-0">
                  <Link
                    to={"/$pageSlug" as any}
                    params={{ pageSlug: page.slug } as any}
                    className="p-1.5 rounded-xl border border-border/60 hover:border-border hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all cursor-pointer active:scale-95 shrink-0 flex items-center justify-center group/btn"
                    title={`Buka ${page.label}`}
                    aria-label={`Buka ${page.label}`}
                  >
                    <ArrowRight className="size-4 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}

// ============================================================================
// LEVEL 1: HALAMAN -> KATEGORI (/:pageSlug & Launcher slides)
// ============================================================================

export function HierarchyWorkspaceView({
  pageSlug,
  hideBreadcrumb: _hideBreadcrumb = false,
  registerHeaderPills = true,
}: {
  pageSlug: string;
  hideBreadcrumb?: boolean;
  registerHeaderPills?: boolean;
}) {
  const navigate = useNavigate();
  const page = useMemo(() => getHierarchyPage(pageSlug), [pageSlug]);

  useEffect(() => {
    if (!page) return;
    try {
      setRaw("aio_active_mode", page.modeId);
      setRaw("client_os_active_mode", page.modeId);
      window.dispatchEvent(
        new CustomEvent("aio_active_workspace_changed", { detail: page.id }),
      );
    } catch {}
  }, [page]);

  const headerPills = useMemo<HeaderNavPillItem[]>(() => {
    if (!page || !registerHeaderPills) return [];
    return page.categories.map((cat) => ({
      id: cat.slug,
      label: cat.label,
      count: cat.modules.length,
    }));
  }, [page, registerHeaderPills]);

  if (!page) {
    return (
      <div className="max-w-lg mx-auto my-12 p-6 rounded-[28px] border border-border bg-card text-center space-y-3">
        <h2 className="text-base font-bold text-foreground">Halaman Tidak Ditemukan</h2>
        <Link
          to={"/workspace-directory" as any}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold"
        >
          Lihat Semua Halaman
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full flex-1 flex flex-col font-sans pb-16">
      {registerHeaderPills && headerPills.length > 0 && (
        <ShellHeader>
          <HeaderNavPills
            items={headerPills}
            activeId=""
            onSelect={(catSlug) => {
              navigate({
                to: "/$pageSlug/$categorySlug" as any,
                params: { pageSlug: page.slug, categorySlug: catSlug } as any,
              });
            }}
          />
        </ShellHeader>
      )}

      <div className="w-full mx-auto pt-3 sm:pt-4 space-y-3 sm:space-y-4">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground/90 tracking-tight flex items-center justify-center gap-2.5">
            <span>{page.label}</span>
          </h1>
        </div>

        {/* Grid Kategori bergaya kartu asli (MBACard aesthetic) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5 sm:gap-5">
          {page.categories.map((cat) => {
            const CatIcon = cat.icon;
            const gradient = pickCardGradient(`${page.slug}-${cat.slug}`);

            return (
              <div
                key={cat.id}
                className="w-full min-h-[280px] rounded-[28px] border border-border bg-card p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between gap-4 group"
              >
                <div className="flex flex-col flex-1">
                  <Link
                    to={"/$pageSlug/$categorySlug" as any}
                    params={{ pageSlug: page.slug, categorySlug: cat.slug } as any}
                    className="flex items-center gap-3.5 group/header min-w-0 outline-none"
                  >
                    <div
                      className={`h-12 w-12 rounded-full flex items-center justify-center text-white shadow-xs shrink-0 ${gradient} group-hover/header:scale-105 transition-all`}
                    >
                      <CatIcon
                        className="h-6 w-6 opacity-90 drop-shadow-sm"
                        strokeWidth={1.75}
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-base text-foreground group-hover/header:text-primary transition-colors truncate">
                        {cat.label}
                      </h4>
                      <span className="text-[11px] text-muted-foreground truncate block mt-0.5">
                        {cat.modules.length} Modul
                      </span>
                    </div>
                  </Link>

                  <div className="mt-4 pt-1 flex flex-col flex-1">
                    <span className="inline-flex items-center justify-center gap-1 text-[10px] font-normal tracking-wider text-muted-foreground mb-2 text-center shrink-0">
                      <Layers size={11} className="shrink-0" />
                      <span>Modul ({cat.modules.length}):</span>
                    </span>
                    <div className="flex flex-wrap justify-center content-start gap-1.5 w-full">
                      {cat.modules.map((mod) => (
                        <Link
                          key={mod.id}
                          to={"/$pageSlug/$categorySlug/$moduleSlug/$componentSlug" as any}
                          params={{
                            pageSlug: page.slug,
                            categorySlug: cat.slug,
                            moduleSlug: mod.slug,
                            componentSlug: mod.defaultComponentKey,
                          } as any}
                          title={mod.desc}
                          className="w-auto max-w-full inline-flex items-center justify-center px-[8px] py-[6px] rounded-full bg-muted/60 hover:bg-primary/10 hover:text-primary text-[11px] font-medium text-foreground transition-all cursor-pointer border border-border/40 hover:border-primary/30 text-center"
                        >
                          <span className="module-chip-label whitespace-normal">
                            {mod.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end text-xs shrink-0">
                  <Link
                    to={"/$pageSlug/$categorySlug" as any}
                    params={{ pageSlug: page.slug, categorySlug: cat.slug } as any}
                    className="p-1.5 rounded-xl border border-border/60 hover:border-border hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all cursor-pointer active:scale-95 shrink-0 flex items-center justify-center group/btn"
                    title={`Buka kategori ${cat.label}`}
                    aria-label={`Buka kategori ${cat.label}`}
                  >
                    <ArrowRight className="size-4 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function HierarchyWorkspacePage({ pageSlug }: { pageSlug: string }) {
  const page = getHierarchyPage(pageSlug);
  return (
    <AppShell
      title={page?.label || "Halaman Workspace"}
      subtitle={page?.desc || "Pilih kategori untuk membuka modul"}
    >
      <div className="w-full max-w-[1815px] mx-auto px-4 sm:px-6 pb-16 pt-2">
        <HierarchyWorkspaceView pageSlug={pageSlug} />
      </div>
    </AppShell>
  );
}

// ============================================================================
// LEVEL 2: KATEGORI -> MODUL (/:pageSlug/:categorySlug) memakai MBACard asli
// ============================================================================

function buildModuleFunnelCategoryGroups(
  mod: HierarchyModule,
): MBACardCategoryGroup[] | undefined {
  const groups: MBACardCategoryGroup[] = [];
  let idx = 1;
  for (const key of SUB_COMPONENT_KEYS) {
    const slot = mod.components[key];
    if (slot.items.length > 0) {
      groups.push({
        id: idx,
        categoryNumber: idx,
        name: slot.meta.label,
        items: slot.items.map((item) => ({
          title: item.title,
          desc: item.desc,
          to: `${mod.routePath}/${key}?item=${encodeURIComponent(item.route.split("?")[0])}`,
        })),
      });
      idx += 1;
    }
  }
  return groups.length > 0 ? groups : undefined;
}

export function HierarchyCategoryPage({
  pageSlug,
  categorySlug,
}: {
  pageSlug: string;
  categorySlug: string;
}) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const page = useMemo(() => getHierarchyPage(pageSlug), [pageSlug]);
  const category = useMemo(
    () => getHierarchyCategory(pageSlug, categorySlug),
    [pageSlug, categorySlug],
  );

  const headerPills = useMemo<HeaderNavPillItem[]>(() => {
    if (!page) return [];
    return page.categories.map((cat) => ({
      id: cat.slug,
      label: cat.label,
      count: cat.modules.length,
    }));
  }, [page]);

  if (!page || !category) {
    return (
      <AppShell title="Kategori Tidak Ditemukan" subtitle="Periksa jalur kategori">
        <div className="max-w-lg mx-auto my-12 p-6 rounded-[28px] border border-border bg-card text-center space-y-3">
          <h2 className="text-base font-bold text-foreground">Kategori Tidak Ditemukan</h2>
          <Link
            to={page ? ("/$pageSlug" as any) : ("/workspace-directory" as any)}
            params={page ? ({ pageSlug: page.slug } as any) : undefined}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold"
          >
            Kembali ke Halaman
          </Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell
      title={`${category.label} — ${page.label}`}
      subtitle={`Modul pada kategori ${category.label}`}
    >
      <ShellHeader>
        <HeaderNavPills
          items={headerPills}
          activeId={category.slug}
          onSelect={(nextCatSlug) => {
            navigate({
              to: "/$pageSlug/$categorySlug" as any,
              params: { pageSlug: page.slug, categorySlug: nextCatSlug } as any,
            });
          }}
        />
      </ShellHeader>

      <LauncherPageProvider pageId={page.id}>
        <div className="w-full max-w-[1815px] mx-auto px-4 sm:px-6 pb-16 pt-3 sm:pt-4 space-y-3 sm:space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Link
              to={"/$pageSlug" as any}
              params={{ pageSlug: page.slug } as any}
              className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              <span>{page.label}</span>
            </Link>
            <ChevronRight className="size-3.5 opacity-60" />
            <span className="font-semibold text-foreground">{category.label}</span>
          </div>

          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground/90 tracking-tight">
              {category.label}
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5 sm:gap-5">
            {category.modules.map((mod) => {
              const moduleTarget = `${mod.routePath}/${mod.defaultComponentKey}`;
              const categoryGroups = buildModuleFunnelCategoryGroups(mod);
              return (
                <MBACard
                  key={mod.id}
                  id={mod.id}
                  title={mod.title}
                  to={moduleTarget}
                  icon={mod.icon}
                  badge={`${category.label} • ${mod.activeComponentKeys.length}/10 Komponen`}
                  shortDesc={mod.desc}
                  categoryGroups={categoryGroups}
                  isFav={isFavorite(moduleTarget) || isFavorite(mod.legacyRoute)}
                  toggleFavorite={toggleFavorite}
                  gradient={pickCardGradient(mod.id)}
                />
              );
            })}
          </div>
        </div>
      </LauncherPageProvider>
    </AppShell>
  );
}

// ============================================================================
// LEVEL 3 & 4: MODUL -> 10 JENIS KOMPONEN (Gaya ModuleWorkbenchShell asli)
// ============================================================================

export function HierarchyModulePage({
  pageSlug,
  categorySlug,
  moduleSlug,
  componentSlug,
}: {
  pageSlug: string;
  categorySlug: string;
  moduleSlug: string;
  componentSlug?: string;
}) {
  const navigate = useNavigate();
  const pillGroupId = useId();
  const [hoveredTab, setHoveredTab] = useState<SubComponentKey | null>(null);

  const page = useMemo(() => getHierarchyPage(pageSlug), [pageSlug]);
  const category = useMemo(
    () => getHierarchyCategory(pageSlug, categorySlug),
    [pageSlug, categorySlug],
  );
  const module = useMemo(
    () => getHierarchyModule(pageSlug, categorySlug, moduleSlug),
    [pageSlug, categorySlug, moduleSlug],
  );

  const activeComponentKey: SubComponentKey = useMemo(() => {
    if (
      componentSlug &&
      (SUB_COMPONENT_KEYS as readonly string[]).includes(componentSlug.toLowerCase())
    ) {
      return componentSlug.toLowerCase() as SubComponentKey;
    }
    return module?.defaultComponentKey || "features";
  }, [componentSlug, module]);

  const activeSlot = module?.components[activeComponentKey];
  const [selectedItemIdx, setSelectedItemIdx] = useState(0);

  useEffect(() => {
    setSelectedItemIdx(0);
  }, [module?.id, activeComponentKey]);

  useEffect(() => {
    if (!activeSlot || activeSlot.items.length <= 1 || typeof window === "undefined") {
      return;
    }
    try {
      const params = new URLSearchParams(window.location.search);
      const itemRoute = params.get("item");
      if (itemRoute) {
        const idx = activeSlot.items.findIndex(
          (it) => it.route === itemRoute || it.route.split("?")[0] === itemRoute,
        );
        if (idx >= 0) setSelectedItemIdx(idx);
      }
    } catch {}
  }, [activeSlot]);

  if (!page || !category || !module || !activeSlot) {
    return (
      <AppShell title="Modul Tidak Ditemukan" subtitle="Periksa jalur modul">
        <div className="max-w-lg mx-auto my-12 p-6 rounded-[28px] border border-border bg-card text-center space-y-3">
          <h2 className="text-base font-bold text-foreground">Modul Tidak Ditemukan</h2>
          <Link
            to={"/workspace-directory" as any}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold"
          >
            Kembali ke Workspace Directory
          </Link>
        </div>
      </AppShell>
    );
  }

  const ModIcon = module.icon;
  const selectedItem =
    activeSlot.items[selectedItemIdx] || activeSlot.items[0] || null;
  const embeddedContent = selectedItem
    ? resolveEmbeddedRouteElement(selectedItem.route)
    : null;

  const handleSelectComponentTab = (tabKey: SubComponentKey) => {
    navigate({
      to: "/$pageSlug/$categorySlug/$moduleSlug/$componentSlug" as any,
      params: {
        pageSlug: page.slug,
        categorySlug: category.slug,
        moduleSlug: module.slug,
        componentSlug: tabKey,
      } as any,
    });
  };

  return (
    <AppShell
      title={`${module.title} — ${activeSlot.meta.label}`}
      subtitle={`${page.label} › ${category.label}`}
    >
      {/* 10 Jenis Komponen langsung di ShellHeader dengan gaya liquid-glass-header-pill asli */}
      <ShellHeader>
        <LayoutGroup id={`hierarchy-module-${pillGroupId}`}>
          <div
            data-nav-pill-group="true"
            className="relative inline-flex items-center justify-end h-[46px] rounded-full liquid-glass-header-pill bg-white/60 dark:bg-zinc-800/60 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xs p-1 overflow-x-auto overflow-y-visible no-scrollbar max-w-full gap-0.5"
          >
            {SUB_COMPONENT_TABS.map((tab) => {
              const slot = module.components[tab.key];
              const isSelected = activeComponentKey === tab.key;
              const isHighlighted = (hoveredTab ?? activeComponentKey) === tab.key;
              const isImplemented = slot.items.length > 0;

              return (
                <button
                  key={tab.key}
                  type="button"
                  data-nav-pill-btn="true"
                  data-nav-selected={isSelected ? "true" : undefined}
                  data-pill-highlighted={isHighlighted ? "true" : undefined}
                  onMouseEnter={() => setHoveredTab(tab.key)}
                  onMouseLeave={() => setHoveredTab(null)}
                  onClick={() => handleSelectComponentTab(tab.key)}
                  title={`${tab.label} — ${tab.description}`}
                  className={`relative h-[38px] px-3 text-xs font-semibold rounded-full transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer select-none ${
                    isHighlighted
                      ? "text-primary-foreground"
                      : isSelected
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                  } ${!isImplemented ? "opacity-55" : ""}`}
                >
                  {isHighlighted && (
                    <motion.div
                      layoutId="nav-pill"
                      data-nav-pill-indicator="true"
                      className="absolute inset-0 rounded-full z-0 pointer-events-none bg-primary"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
                    <span>{tab.shortLabel}</span>
                    {slot.items.length > 0 && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full leading-none ${
                          isHighlighted
                            ? "bg-white/20 text-primary-foreground"
                            : "bg-black/10 dark:bg-white/15 text-foreground"
                        }`}
                      >
                        {slot.items.length}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </ShellHeader>

      <div className="w-full max-w-[1815px] mx-auto px-4 sm:px-6 pb-16 pt-2">
        <div className="flex flex-col w-full min-h-[calc(100vh-5rem)] bg-background text-foreground rounded-[28px] border border-border/60 overflow-hidden shadow-xs">
          {/* Header Modul gaya ModuleWorkbenchShell asli */}
          <div className="px-4 sm:px-6 pt-4 pb-3 border-b border-border bg-card/70 backdrop-blur-md">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
              <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                <div
                  className={`size-11 rounded-full ${pickCardGradient(module.id)} text-white flex items-center justify-center shrink-0 shadow-xs`}
                >
                  <ModIcon className="size-5 opacity-90" strokeWidth={1.75} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-0.5 flex-wrap">
                    <Link
                      to={"/$pageSlug" as any}
                      params={{ pageSlug: page.slug } as any}
                      className="hover:text-foreground transition-colors truncate"
                    >
                      {page.label}
                    </Link>
                    <ChevronRight className="size-3 shrink-0 opacity-60" />
                    <Link
                      to={"/$pageSlug/$categorySlug" as any}
                      params={{ pageSlug: page.slug, categorySlug: category.slug } as any}
                      className="hover:text-foreground transition-colors truncate"
                    >
                      {category.label}
                    </Link>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-base sm:text-lg font-bold tracking-tight text-foreground truncate">
                      {module.title}
                    </h1>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                      {module.activeComponentKeys.length}/10 Komponen Aktif
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {module.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {selectedItem && (
                  <Link
                    to={selectedItem.route.split("?")[0] as any}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-background border border-border text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors inline-flex items-center gap-1.5"
                    title="Buka di rute layar penuh"
                  >
                    <ExternalLink className="size-3.5" />
                    <span>Layar Penuh</span>
                  </Link>
                )}
              </div>
            </div>

            {/* Sub-switcher jika slot komponen punya > 1 item */}
            {activeSlot.items.length > 1 && (
              <div className="mt-3 pt-3 border-t border-border/60 flex flex-wrap items-center gap-1.5">
                {activeSlot.items.map((item, idx) => {
                  const active = idx === selectedItemIdx;
                  const ItemIcon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedItemIdx(idx)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer border ${
                        active
                          ? "bg-primary text-primary-foreground border-primary shadow-2xs"
                          : "bg-muted/60 text-foreground border-border/60 hover:bg-primary/10 hover:text-primary"
                      }`}
                    >
                      <ItemIcon className="size-3.5 shrink-0" />
                      <span>{item.title}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Konten Komponen Aktif */}
          <div className="flex-1 p-4 sm:p-6">
            {activeSlot.items.length > 0 && selectedItem ? (
              embeddedContent ? (
                embeddedContent
              ) : (
                <div className="max-w-lg mx-auto my-8 p-6 rounded-[28px] border border-border bg-card text-center space-y-3">
                  <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                    <selectedItem.icon className="size-5" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">
                    {selectedItem.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {selectedItem.desc || activeSlot.meta.description}
                  </p>
                  <Link
                    to={selectedItem.route.split("?")[0] as any}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold"
                  >
                    <span>Buka Modul</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              )
            ) : (
              <div className="max-w-xl mx-auto my-8 p-8 rounded-[28px] border border-dashed border-border bg-card/50 text-center space-y-4">
                <div className="size-12 rounded-full bg-muted text-muted-foreground flex items-center justify-center mx-auto">
                  <activeSlot.meta.icon className="size-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-foreground">
                    {activeSlot.meta.label} — {module.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {activeSlot.meta.description}
                  </p>
                </div>
                {module.activeComponentKeys.length > 0 && (
                  <div className="pt-1 flex flex-wrap items-center justify-center gap-1.5">
                    {module.activeComponentKeys.map((k) => {
                      const s = module.components[k];
                      const CatIcon = getComponentCategoryIcon(s.meta.label) || s.meta.icon;
                      return (
                        <Link
                          key={k}
                          to={"/$pageSlug/$categorySlug/$moduleSlug/$componentSlug" as any}
                          params={{
                            pageSlug: page.slug,
                            categorySlug: category.slug,
                            moduleSlug: module.slug,
                            componentSlug: k,
                          } as any}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/60 hover:bg-primary/10 hover:text-primary border border-border/40 text-xs font-medium text-foreground transition-colors"
                        >
                          <CatIcon className="size-3.5" />
                          <span>{s.meta.label}</span>
                          <span className="text-[10px] text-muted-foreground">
                            ({s.items.length})
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
