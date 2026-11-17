import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useId,
} from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  Search,
  X,
  Plus,
  Building2,
  FolderKanban,
  ArrowUpDown,
  Layers,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import {
  useShellHeaderPresence,
  ShellHeaderActiveProvider,
} from "@/app/shell-header";
import {
  SUB_COMPONENT_KEYS,
  UNIFIED_SUB_COMPONENTS,
  getSubComponentTabs,
  getSubComponentTab,
  getUnifiedWorkspaceById,
  type SubComponentKey,
  type SubComponentType,
  type UnifiedWorkspaceMeta,
  type WorkspaceId,
} from "@/core/unifiedTaxonomy";

export interface UnifiedModuleLayoutContext {
  workspaceId: WorkspaceId;
  activeTab: SubComponentType;
  searchQuery: string;
  sortOrder: "asc" | "desc";
  activeClientId: string | null;
  activeProjectId: string | null;
  setActiveTab: (tab: SubComponentType) => void;
  setSearchQuery: (query: string) => void;
}

export interface UnifiedTabSlotConfig {
  label?: string;
  badgeCount?: number;
  content:
    | React.ReactNode
    | ((ctx: UnifiedModuleLayoutContext) => React.ReactNode);
}

export type UnifiedTabSlotValue =
  | React.ReactNode
  | ((ctx: UnifiedModuleLayoutContext) => React.ReactNode)
  | UnifiedTabSlotConfig;

export interface UnifiedPrimaryActionConfig {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick: () => void;
}

export interface UnifiedModuleLayoutProps {
  /** Level 1 Workspace metadata dari src/core/unifiedTaxonomy.ts */
  workspace?: UnifiedWorkspaceMeta;
  /** Alternatif ID Workspace Level 1 bila tidak mengirim object workspace langsung */
  workspaceId?: WorkspaceId;
  /** Judul modul (Level 2) */
  title: string;
  /** Deskripsi singkat modul */
  subtitle?: string;
  /** Ikon Lucide modul */
  icon: React.ComponentType<{ className?: string }>;
  /** Controlled active tab (Level 3) */
  activeTab?: SubComponentType;
  /** Tab default jika uncontrolled */
  defaultTab?: SubComponentType;
  /** Callback perubahan tab */
  onTabChange?: (tab: SubComponentType) => void;
  /** Daftar klien aktif untuk filter konteks */
  availableClients?: Array<{ id: string; name: string }>;
  /** Daftar proyek aktif untuk filter konteks */
  availableProjects?: Array<{ id: string; name: string; clientId?: string }>;
  /** Pemetaan konten per SubComponentType */
  tabs?: Partial<Record<SubComponentKey, UnifiedTabSlotValue>>;
  /** Konten modul: mendukung render-prop `(activeTab, ctx) => ReactNode` atau ReactNode biasa */
  children?:
    | React.ReactNode
    | ((
        activeTab: SubComponentType,
        context: {
          searchQuery: string;
          sortOrder: "asc" | "desc";
          activeClientId: string | null;
          activeProjectId: string | null;
        },
      ) => React.ReactNode);
  /** Tombol aksi utama opsional di header modul (objek konfigurasi atau ReactNode) */
  primaryAction?: React.ReactNode | UnifiedPrimaryActionConfig;
  /** Tampilkan kotak pencarian internal modul (default: true) */
  showSearch?: boolean;
  /** Class tambahan kontainer luar */
  className?: string;
}

function isTabConfigObject(
  value: UnifiedTabSlotValue | undefined,
): value is UnifiedTabSlotConfig {
  return (
    typeof value === "object" &&
    value !== null &&
    !React.isValidElement(value) &&
    "content" in value
  );
}

function isPrimaryActionConfig(
  value: UnifiedModuleLayoutProps["primaryAction"],
): value is UnifiedPrimaryActionConfig {
  return (
    typeof value === "object" &&
    value !== null &&
    !React.isValidElement(value) &&
    "label" in value &&
    "onClick" in value
  );
}

export function UnifiedModuleLayout({
  workspace,
  workspaceId: propWorkspaceId,
  title,
  subtitle,
  icon: ModuleIcon,
  activeTab: controlledTab,
  defaultTab,
  onTabChange,
  availableClients = [],
  availableProjects = [],
  tabs,
  children,
  primaryAction,
  showSearch = true,
  className = "",
}: UnifiedModuleLayoutProps) {
  const groupId = useId();
  const subTabs = useMemo(() => getSubComponentTabs(), []);

  const resolvedWorkspace = useMemo(
    () =>
      workspace ??
      getUnifiedWorkspaceById(propWorkspaceId ?? "mode_business"),
    [workspace, propWorkspaceId],
  );

  const resolvedWorkspaceId: WorkspaceId =
    resolvedWorkspace?.id ?? propWorkspaceId ?? "mode_business";

  // Tentukan daftar tab yang sudah terisi kontennya
  const configuredTabKeys = useMemo<SubComponentKey[]>(() => {
    if (!tabs) {
      return typeof children === "function"
        ? [...SUB_COMPONENT_KEYS]
        : children
          ? ["features"]
          : [];
    }
    return SUB_COMPONENT_KEYS.filter((key) => tabs[key] !== undefined);
  }, [tabs, children]);

  // Tab awal prioritas: controlledTab -> defaultTab -> tab pertama yang aktif -> "dashboards"
  const resolvedDefaultTab = useMemo<SubComponentType>(() => {
    if (defaultTab) return defaultTab;
    if (tabs && configuredTabKeys.length > 0) return configuredTabKeys[0];
    return "dashboards";
  }, [defaultTab, tabs, configuredTabKeys]);

  const [internalTab, setInternalTab] =
    useState<SubComponentType>(resolvedDefaultTab);
  const currentTab = controlledTab ?? internalTab;

  const [hoveredTab, setHoveredTab] = useState<SubComponentType | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [activeClientId, setActiveClientId] = useState<string | null>(null);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null,
  );

  // Sinkronkan defaultTab bila berubah
  useEffect(() => {
    if (!controlledTab && defaultTab) {
      setInternalTab(defaultTab);
    }
  }, [controlledTab, defaultTab]);

  // Temukan elemen portal #app-header-actions-portal di AppShell
  useEffect(() => {
    const checkPortal = () => {
      const target = document.getElementById("app-header-actions-portal");
      if (target) {
        setPortalContainer(target);
      }
    };
    checkPortal();
    const timer = setTimeout(checkPortal, 50);
    return () => clearTimeout(timer);
  }, []);

  // Beritahu AppShell bahwa portal header aktif agar label "Modul Aktif" duplikat disembunyikan
  useShellHeaderPresence(Boolean(portalContainer));

  // Tangkap event sortir global dari HeaderExtraControls.tsx ("app-sort")
  useEffect(() => {
    const handleAppSort = (e: Event) => {
      const customEvent = e as CustomEvent<{ order?: "asc" | "desc" }>;
      if (
        customEvent.detail?.order === "asc" ||
        customEvent.detail?.order === "desc"
      ) {
        setSortOrder(customEvent.detail.order);
      } else {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
      }
    };
    window.addEventListener("app-sort", handleAppSort);
    return () => window.removeEventListener("app-sort", handleAppSort);
  }, []);

  const handleSelectTab = useCallback(
    (tab: SubComponentType) => {
      if (!controlledTab) {
        setInternalTab(tab);
      }
      onTabChange?.(tab);
    },
    [controlledTab, onTabChange],
  );

  const filteredProjects = useMemo(() => {
    if (!activeClientId) return availableProjects;
    return availableProjects.filter(
      (p) => !p.clientId || p.clientId === activeClientId,
    );
  }, [availableProjects, activeClientId]);

  const layoutContext = useMemo<UnifiedModuleLayoutContext>(
    () => ({
      workspaceId: resolvedWorkspaceId,
      activeTab: currentTab,
      searchQuery,
      sortOrder,
      activeClientId,
      activeProjectId,
      setActiveTab: handleSelectTab,
      setSearchQuery,
    }),
    [
      resolvedWorkspaceId,
      currentTab,
      searchQuery,
      sortOrder,
      activeClientId,
      activeProjectId,
      handleSelectTab,
    ],
  );

  const activeTabMeta = getSubComponentTab(currentTab);

  // Render slot atau render-prop children untuk tab aktif
  const activeTabContent = useMemo<React.ReactNode>(() => {
    if (typeof children === "function") {
      return children(currentTab, {
        searchQuery,
        sortOrder,
        activeClientId,
        activeProjectId,
      });
    }
    const rawSlot = tabs?.[currentTab];
    if (rawSlot !== undefined) {
      const contentOrFn = isTabConfigObject(rawSlot)
        ? rawSlot.content
        : rawSlot;
      return typeof contentOrFn === "function"
        ? contentOrFn(layoutContext)
        : contentOrFn;
    }
    if (!tabs && currentTab === "features" && children) {
      return children;
    }
    return null;
  }, [
    tabs,
    currentTab,
    layoutContext,
    children,
    searchQuery,
    sortOrder,
    activeClientId,
    activeProjectId,
  ]);

  return (
    <div
      className={`flex flex-col w-full min-h-[calc(100vh-4rem)] bg-background text-foreground rounded-2xl border border-border/60 overflow-hidden shadow-xs ${className}`}
    >
      {/* Portal ke Header Pill Kanan (#app-header-actions-portal) */}
      {portalContainer &&
        createPortal(
          <div className="flex items-center justify-end gap-1.5 shrink-0 shell-header-portal-actions h-full overflow-visible">
            <LayoutGroup id={`unified-header-nav-${groupId}`}>
              <div
                data-nav-pill-group="true"
                onMouseLeave={() => setHoveredTab(null)}
                className="relative inline-flex items-center justify-end h-[46px] rounded-full liquid-glass-header-pill bg-white/60 dark:bg-zinc-800/60 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xs p-1 overflow-x-auto overflow-y-visible no-scrollbar max-w-full gap-0.5"
              >
                {UNIFIED_SUB_COMPONENTS.map((sub) => {
                  const slot = tabs?.[sub.id];
                  const isConfigured =
                    typeof children === "function" ||
                    slot !== undefined ||
                    (!tabs && sub.id === "features" && Boolean(children));
                  const customLabel = isTabConfigObject(slot)
                    ? slot.label
                    : undefined;
                  const badgeCount = isTabConfigObject(slot)
                    ? slot.badgeCount
                    : undefined;
                  const isSelected = currentTab === sub.id;
                  const isHighlighted = (hoveredTab ?? currentTab) === sub.id;
                  const meta = getSubComponentTab(sub.id);

                  return (
                    <button
                      key={sub.id}
                      type="button"
                      data-nav-pill-btn="true"
                      data-nav-selected={isSelected ? "true" : undefined}
                      data-pill-highlighted={isHighlighted ? "true" : undefined}
                      onMouseEnter={() => setHoveredTab(sub.id)}
                      onClick={() => handleSelectTab(sub.id)}
                      title={`${sub.label} — ${meta.description}`}
                      className={`relative h-[38px] px-3 text-xs font-semibold rounded-full transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer select-none ${
                        isHighlighted
                          ? "text-primary-foreground"
                          : isSelected
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                      } ${!isConfigured ? "opacity-60" : ""}`}
                    >
                      {isHighlighted && (
                        <motion.div
                          layoutId="nav-pill"
                          data-nav-pill-indicator="true"
                          className="absolute inset-0 rounded-full z-0 pointer-events-none bg-primary"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 32,
                          }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
                        <span>{customLabel || sub.label}</span>
                        {badgeCount !== undefined && badgeCount > 0 && (
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-full leading-none ${
                              isHighlighted
                                ? "bg-white/20 text-primary-foreground"
                                : "bg-black/10 dark:bg-white/15 text-foreground"
                            }`}
                          >
                            {badgeCount}
                          </span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>
          </div>,
          portalContainer,
        )}

      {/* Header Modul (Level 2) */}
      <div className="px-4 sm:px-6 pt-4 pb-3 border-b border-border bg-card/70 backdrop-blur-md">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3.5 min-w-0">
            <div className="size-11 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0 shadow-2xs">
              <ModuleIcon className="size-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-foreground truncate">
                  {title}
                </h1>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-primary" />
                  {resolvedWorkspace
                    ? `${resolvedWorkspace.code} — ${resolvedWorkspace.labelEn}`
                    : resolvedWorkspaceId}
                </span>
                {tabs && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                    {configuredTabKeys.length}/10 Komponen Aktif
                  </span>
                )}
              </div>
              {subtitle && (
                <p className="text-xs text-muted-foreground truncate mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Filter Klien, Proyek, Pencarian, Sortir & Tombol Aksi */}
          <div className="flex flex-wrap items-center gap-2">
            {availableClients.length > 0 && (
              <div className="relative flex items-center">
                <Building2 className="size-3.5 text-muted-foreground absolute left-2.5 pointer-events-none" />
                <select
                  value={activeClientId ?? ""}
                  onChange={(e) => {
                    setActiveClientId(e.target.value || null);
                    setActiveProjectId(null);
                  }}
                  className="pl-8 pr-6 py-1.5 text-xs rounded-xl bg-background border border-border text-foreground focus:outline-none"
                >
                  <option value="">Semua Klien</option>
                  {availableClients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {filteredProjects.length > 0 && (
              <div className="relative flex items-center">
                <FolderKanban className="size-3.5 text-muted-foreground absolute left-2.5 pointer-events-none" />
                <select
                  value={activeProjectId ?? ""}
                  onChange={(e) => setActiveProjectId(e.target.value || null)}
                  className="pl-8 pr-6 py-1.5 text-xs rounded-xl bg-background border border-border text-foreground focus:outline-none"
                >
                  <option value="">Semua Proyek</option>
                  {filteredProjects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {showSearch && (
              <div className="relative flex-1 sm:flex-initial sm:w-52">
                <Search className="size-3.5 text-muted-foreground absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Cari di ${activeTabMeta.shortLabel}...`}
                  className="w-full pl-8 pr-7 py-1.5 text-xs rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Hapus pencarian"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <X className="size-3" />
                  </button>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={() =>
                setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
              }
              title={`Urutan saat ini: ${sortOrder === "asc" ? "A-Z / Terawal" : "Z-A / Terbaru"}`}
              className="px-2.5 py-1.5 rounded-xl text-xs font-medium bg-background border border-border text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowUpDown className="size-3.5" />
              <span className="uppercase text-[10px] font-mono">
                {sortOrder}
              </span>
            </button>

            {primaryAction &&
              (isPrimaryActionConfig(primaryAction) ? (
                <button
                  type="button"
                  onClick={primaryAction.onClick}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-primary text-primary-foreground shadow-xs hover:opacity-95 transition-opacity flex items-center gap-1.5 cursor-pointer"
                >
                  {primaryAction.icon ? (
                    <primaryAction.icon className="size-3.5" />
                  ) : (
                    <Plus className="size-3.5" />
                  )}
                  <span>{primaryAction.label}</span>
                </button>
              ) : (
                <div className="shrink-0">{primaryAction}</div>
              ))}
          </div>
        </div>

        {/* Bilah Navigasi Sub-Komponen Level 3 */}
        <div className="flex items-center gap-1 mt-3.5 overflow-x-auto no-scrollbar pb-0.5">
          {subTabs.map((tab) => {
            const TabIcon = tab.icon;
            const slot = tabs?.[tab.key];
            const isActive = currentTab === tab.key;
            const isConfigured =
              typeof children === "function" ||
              slot !== undefined ||
              (!tabs && tab.key === "features" && Boolean(children));
            const customLabel = isTabConfigObject(slot)
              ? slot.label
              : undefined;
            const badgeCount = isTabConfigObject(slot)
              ? slot.badgeCount
              : undefined;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => handleSelectTab(tab.key)}
                title={tab.description}
                className={`group relative flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer select-none ${
                  isActive
                    ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                    : !isConfigured
                      ? "text-muted-foreground/60 hover:text-foreground hover:bg-muted/50"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                }`}
              >
                <TabIcon className="size-3.5 shrink-0" />
                <span>{customLabel || tab.label}</span>

                {badgeCount !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold leading-none ${
                      isActive
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {badgeCount}
                  </span>
                )}

                {!isActive && isConfigured && tabs && (
                  <span
                    className="size-1.5 rounded-full bg-emerald-500"
                    title="Komponen Aktif"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Viewport Konten Level 3 */}
      <ShellHeaderActiveProvider value={false}>
        <div className="flex-1 p-4 sm:p-6 min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${resolvedWorkspaceId}-${title}-${currentTab}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.12 }}
              className="h-full"
            >
              {activeTabContent !== null && activeTabContent !== undefined ? (
                activeTabContent
              ) : (
                <div className="max-w-xl mx-auto my-12 p-6 sm:p-8 rounded-3xl border border-dashed border-border bg-card/50 text-center">
                  <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3.5">
                    <Layers className="size-6" />
                  </div>
                  <h2 className="text-sm sm:text-base font-bold text-foreground">
                    Komponen {activeTabMeta.label} Siap Dikonfigurasi
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    {activeTabMeta.description} Slot sub-komponen{" "}
                    <span className="font-mono text-foreground">
                      {activeTabMeta.key}
                    </span>{" "}
                    telah terstandarisasi pada arsitektur modul{" "}
                    <span className="font-semibold text-foreground">
                      {title}
                    </span>
                    .
                  </p>

                  {configuredTabKeys.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-border/70">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2.5">
                        Buka Komponen yang Sudah Aktif
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        {configuredTabKeys.map((tabKey) => {
                          const meta = getSubComponentTab(tabKey);
                          const TabIcon = meta.icon;
                          return (
                            <button
                              key={tabKey}
                              type="button"
                              onClick={() => handleSelectTab(tabKey)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-background hover:bg-primary hover:text-primary-foreground border border-border hover:border-primary transition-colors cursor-pointer"
                            >
                              <CheckCircle2 className="size-3.5 text-emerald-500" />
                              <TabIcon className="size-3.5" />
                              <span>{meta.label}</span>
                              <ArrowRight className="size-3 opacity-70" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </ShellHeaderActiveProvider>
    </div>
  );
}

export default UnifiedModuleLayout;
