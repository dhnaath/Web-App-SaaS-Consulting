import React, { useState, useEffect, useMemo, useCallback, useId } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  Search,
  Building2,
  FolderKanban,
  Lock,
  Plus,
  Layers,
  CheckCircle2,
  ArrowUpDown,
} from "lucide-react";
import { ShellHeader, ShellHeaderActiveProvider } from "@/app/shell-header";
import {
  SUB_COMPONENT_KEYS,
  SUB_COMPONENT_REGISTRY,
  type SubComponentType,
  type ModuleDefinition,
  type WorkbenchExecutionContext,
  type ImplementationStatus,
} from "@/core/taxonomy/subComponentSchema";

export interface ModuleWorkbenchShellProps {
  module: ModuleDefinition;
  /** Opsional: dikendalikan dari search params URL TanStack Router (?tab=records) */
  activeTab?: SubComponentType;
  onTabChange?: (tab: SubComponentType) => void;
  /** Konteks sesi dari src/core/session.tsx */
  workspaceId?: string;
  userRole?: "konsultan" | "mitra" | "klien";
  /** Fungsi pemeriksa izin dari src/core/permissions.ts */
  checkPermission?: (action: string, resource: string) => boolean;
  /** Daftar klien & proyek dari clientsRepo / projectsRepo untuk filter konteks */
  availableClients?: Array<{ id: string; name: string }>;
  availableProjects?: Array<{ id: string; name: string; clientId?: string | null }>;
  /** Aksi utama tambahan di kanan atas modul */
  primaryAction?: {
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
    onClick: (ctx: WorkbenchExecutionContext) => void;
  };
}

const STATUS_BADGE_MAP: Record<
  ImplementationStatus,
  { label: string; className: string; dotClass: string }
> = {
  ready: {
    label: "Aktif (Workspace Isolated)",
    className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    dotClass: "bg-emerald-500",
  },
  legacy: {
    label: "Aktif (Legacy Storage)",
    className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    dotClass: "bg-amber-500",
  },
  static: {
    label: "Kalkulator / Dataset Statis",
    className: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    dotClass: "bg-blue-500",
  },
  placeholder: {
    label: "Kerangka UI (Placeholder)",
    className: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    dotClass: "bg-purple-500",
  },
  empty: {
    label: "Belum Dikonfigurasi",
    className: "bg-neutral-500/10 text-neutral-500 dark:text-neutral-400 border-neutral-500/20",
    dotClass: "bg-neutral-400",
  },
};

export function ModuleWorkbenchShell({
  module,
  activeTab: controlledTab,
  onTabChange,
  workspaceId = "ws-main",
  userRole = "konsultan",
  checkPermission,
  availableClients = [],
  availableProjects = [],
  primaryAction,
}: ModuleWorkbenchShellProps) {
  const pillGroupId = useId();

  // 1. Tentukan tab awal (prioritaskan prop -> defaultSubTab -> tab pertama yang 'ready' -> 'dashboards')
  const initialTab = useMemo<SubComponentType>(() => {
    if (controlledTab) return controlledTab;
    if (module.defaultSubTab) return module.defaultSubTab;
    const firstImplemented = SUB_COMPONENT_KEYS.find(
      (k) => module.subComponents[k] && module.subComponents[k]?.status !== "empty",
    );
    return firstImplemented || "dashboards";
  }, [controlledTab, module]);

  const [internalTab, setInternalTab] = useState<SubComponentType>(initialTab);
  const currentTab = controlledTab ?? internalTab;

  const [hoveredTab, setHoveredTab] = useState<SubComponentType | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [activeClientId, setActiveClientId] = useState<string | null>(null);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  // Sinkronisasi ketika modul berganti
  useEffect(() => {
    if (!controlledTab) {
      setInternalTab(initialTab);
    }
  }, [module.id, initialTab, controlledTab]);

  // Dengarkan event sortir dari HeaderExtraControls.tsx ("app-sort")
  useEffect(() => {
    const handleAppSort = (e: Event) => {
      const customEvent = e as CustomEvent<{ order?: "asc" | "desc" }>;
      if (customEvent.detail?.order) {
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

  // Proyek yang disaring berdasarkan klien aktif
  const filteredProjects = useMemo(() => {
    if (!activeClientId) return availableProjects;
    return availableProjects.filter((p) => !p.clientId || p.clientId === activeClientId);
  }, [availableProjects, activeClientId]);

  // Konteks eksekusi yang diteruskan ke semua sub-komponen
  const executionContext: WorkbenchExecutionContext = useMemo(
    () => ({
      workspaceId,
      activeClientId,
      activeProjectId,
      role: userRole,
      searchQuery,
      sortOrder,
      navigateToSubTab: handleSelectTab,
    }),
    [
      workspaceId,
      activeClientId,
      activeProjectId,
      userRole,
      searchQuery,
      sortOrder,
      handleSelectTab,
    ],
  );

  const currentSlot = module.subComponents[currentTab];
  const currentMeta = SUB_COMPONENT_REGISTRY[currentTab];
  const currentStatus: ImplementationStatus = currentSlot?.status ?? "empty";
  const statusInfo = STATUS_BADGE_MAP[currentStatus];

  // Pemeriksaan RBAC (Fail-safe ke true pada konsultan jika fungsi tidak disuplai)
  const requiredAction = currentSlot?.requiredAction ?? currentMeta.defaultActionRequired;
  const isPermitted = useMemo(() => {
    if (checkPermission) {
      return checkPermission(requiredAction, module.resourceType);
    }
    if (userRole === "konsultan") return true;
    if (userRole === "klien" && requiredAction !== "read" && requiredAction !== "approve") {
      return false;
    }
    return true;
  }, [checkPermission, requiredAction, module.resourceType, userRole]);

  const ModuleIcon = module.icon;

  // Hitung statistik kelengkapan 10 sub-komponen pada modul ini
  const implementedCount = useMemo(() => {
    return SUB_COMPONENT_KEYS.filter((k) => {
      const st = module.subComponents[k]?.status;
      return st && st !== "empty";
    }).length;
  }, [module.subComponents]);

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-4rem)] bg-background text-foreground rounded-2xl border border-border/60 overflow-hidden shadow-xs">
      {/* =====================================================================
          PORTAL KE HEADER ATAS (#app-header-actions-portal) VIA <ShellHeader>
          Mematuhi selektor CSS [data-nav-pill-group="true"] & hasAppHeader AppShell
         ===================================================================== */}
      <ShellHeader>
        <LayoutGroup id={`workbench-header-${pillGroupId}`}>
          <div
            data-nav-pill-group="true"
            className="relative inline-flex items-center justify-end h-[46px] rounded-full liquid-glass-header-pill bg-white/60 dark:bg-zinc-800/60 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xs p-1 overflow-x-auto overflow-y-visible no-scrollbar max-w-full gap-0.5"
          >
            {SUB_COMPONENT_KEYS.map((key) => {
              const meta = SUB_COMPONENT_REGISTRY[key];
              const slot = module.subComponents[key];
              const isSelected = currentTab === key;
              const isHighlighted = (hoveredTab ?? currentTab) === key;
              const isImplemented = Boolean(slot && slot.status !== "empty");

              return (
                <button
                  key={key}
                  type="button"
                  data-nav-pill-btn="true"
                  data-nav-selected={isSelected ? "true" : undefined}
                  data-pill-highlighted={isHighlighted ? "true" : undefined}
                  onMouseEnter={() => setHoveredTab(key)}
                  onMouseLeave={() => setHoveredTab(null)}
                  onClick={() => handleSelectTab(key)}
                  title={`${meta.label} — ${meta.description}`}
                  className={`relative h-[38px] px-3 text-xs font-semibold rounded-full transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer select-none ${
                    isHighlighted
                      ? "text-primary-foreground"
                      : isSelected
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  } ${!isImplemented ? "opacity-60" : ""}`}
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
                    <span>{slot?.customLabel || meta.shortLabel}</span>
                    {slot?.badgeCount !== undefined && slot.badgeCount > 0 && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full leading-none ${
                          isHighlighted
                            ? "bg-white/20 text-primary-foreground"
                            : "bg-black/10 dark:bg-white/15 text-foreground"
                        }`}
                      >
                        {slot.badgeCount}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </ShellHeader>

      {/* =====================================================================
          BAGIAN 1: HEADER MODUL & KONTEKS PENUGASAN KLIEN/PROYEK
         ===================================================================== */}
      <div className="px-4 sm:px-6 pt-4 pb-3 border-b border-border bg-card/70 backdrop-blur-md">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          {/* Identitas Modul (Level 2) */}
          <div className="flex items-start sm:items-center gap-3.5 min-w-0">
            <div className="size-11 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0 shadow-2xs">
              <ModuleIcon className="size-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-foreground truncate">
                  {module.title}
                </h1>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border flex items-center gap-1.5 ${statusInfo.className}`}
                >
                  <span className={`size-1.5 rounded-full ${statusInfo.dotClass}`} />
                  {statusInfo.label}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                  {implementedCount}/10 Komponen Aktif
                </span>
              </div>
              <p className="text-xs text-muted-foreground truncate mt-0.5">
                {module.subtitle}
              </p>
            </div>
          </div>

          {/* Kontrol Konteks Klien, Proyek, Pencarian, Sortir & Tombol Utama */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Pemilih Konteks Klien */}
            {availableClients.length > 0 && (
              <div className="relative flex items-center">
                <Building2 className="size-3.5 text-muted-foreground absolute left-2.5 pointer-events-none" />
                <select
                  aria-label="Filter konteks klien"
                  value={activeClientId ?? ""}
                  onChange={(e) => {
                    const val = e.target.value || null;
                    setActiveClientId(val);
                    setActiveProjectId(null);
                  }}
                  className="pl-8 pr-6 py-1.5 text-xs rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  <option value="">Semua Klien (Internal Firma)</option>
                  {availableClients.map((c) => (
                    <option key={c.id} value={c.id}>
                      Klien: {c.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Pemilih Konteks Proyek */}
            {filteredProjects.length > 0 && (
              <div className="relative flex items-center">
                <FolderKanban className="size-3.5 text-muted-foreground absolute left-2.5 pointer-events-none" />
                <select
                  aria-label="Filter konteks proyek"
                  value={activeProjectId ?? ""}
                  onChange={(e) => setActiveProjectId(e.target.value || null)}
                  className="pl-8 pr-6 py-1.5 text-xs rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  <option value="">Semua Proyek</option>
                  {filteredProjects.map((p) => (
                    <option key={p.id} value={p.id}>
                      Proyek: {p.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Pencarian Cepat di Dalam Modul */}
            <div className="relative flex-1 sm:flex-initial sm:w-52">
              <Search className="size-3.5 text-muted-foreground absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Cari di ${currentMeta.shortLabel}...`}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            {/* Tombol Urutan */}
            <button
              type="button"
              onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
              title={`Urutan saat ini: ${sortOrder === "asc" ? "A-Z / Terawal" : "Z-A / Terbaru"}`}
              className="px-2.5 py-1.5 rounded-xl text-xs font-medium bg-background border border-border text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowUpDown className="size-3.5" />
              <span className="uppercase text-[10px] font-mono">{sortOrder}</span>
            </button>

            {/* Tombol Aksi Utama Modul */}
            {primaryAction && isPermitted && (
              <button
                type="button"
                onClick={() => primaryAction.onClick(executionContext)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-primary text-primary-foreground shadow-xs hover:opacity-95 transition-opacity flex items-center gap-1.5 cursor-pointer"
              >
                {primaryAction.icon ? (
                  <primaryAction.icon className="size-3.5" />
                ) : (
                  <Plus className="size-3.5" />
                )}
                <span>{primaryAction.label}</span>
              </button>
            )}
          </div>
        </div>

        {/* ===================================================================
            BAGIAN 2: BILAH NAVIGASI 10 SUB-KOMPONEN (LEVEL 3 BAR)
           =================================================================== */}
        <div className="flex items-center gap-1 mt-3.5 overflow-x-auto no-scrollbar pb-0.5">
          {SUB_COMPONENT_KEYS.map((key) => {
            const meta = SUB_COMPONENT_REGISTRY[key];
            const slot = module.subComponents[key];
            const Icon = meta.icon;
            const isActive = currentTab === key;
            const status = slot?.status ?? "empty";

            return (
              <button
                key={key}
                type="button"
                onClick={() => handleSelectTab(key)}
                className={`group relative flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer select-none ${
                  isActive
                    ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                    : status === "empty"
                    ? "text-muted-foreground/60 hover:text-foreground hover:bg-muted/50"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                }`}
              >
                <Icon className="size-3.5 shrink-0" />
                <span>{slot?.customLabel || meta.label}</span>

                {/* Indikator Jumlah Item */}
                {slot?.badgeCount !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold leading-none ${
                      isActive
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {slot.badgeCount}
                  </span>
                )}

                {/* Titik Indikator Status Kematangan jika tidak aktif */}
                {!isActive && status !== "empty" && (
                  <span
                    className={`size-1.5 rounded-full ${STATUS_BADGE_MAP[status].dotClass}`}
                    title={STATUS_BADGE_MAP[status].label}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* =====================================================================
          BAGIAN 3: AREA KONTEN DINAMIS SUB-KOMPONEN (LEVEL 3 VIEWPORT)
          Menonaktifkan <ShellHeader> milik anak agar 10 tab header portal tidak tertimpa
         ===================================================================== */}
      <ShellHeaderActiveProvider value={false}>
        <div className="flex-1 p-4 sm:p-6 min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${module.id}-${currentTab}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="h-full"
            >
              {/* KASUS A: AKSES DITOLAK OLEH RBAC */}
              {!isPermitted ? (
                <div className="max-w-md mx-auto my-12 p-6 rounded-3xl border border-rose-500/20 bg-rose-500/5 text-center">
                  <div className="size-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-3">
                    <Lock className="size-5" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground">
                    Akses Komponen Dibatasi
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Peran sesi aktif Anda (<strong>{userRole}</strong>) tidak memiliki izin{" "}
                    <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-[11px]">
                      {requiredAction}
                    </code>{" "}
                    pada sumber daya <strong>{module.resourceType}</strong>.
                  </p>
                </div>
              ) : currentSlot?.render ? (
                /* KASUS B: SUB-KOMPONEN TERIMPLEMENTASI -> RENDER KONTENNYA */
                currentSlot.render(executionContext)
              ) : (
                /* KASUS C: SUB-KOMPONEN BELUM TERISI -> EMPTY WORKBENCH STATE STANDAR */
                <EmptySubComponentState
                  module={module}
                  subMeta={currentMeta}
                  status={currentStatus}
                  context={executionContext}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </ShellHeaderActiveProvider>
    </div>
  );
}

// ============================================================================
// KOMPONEN FALLBACK STANDAR UNTUK SUB-KOMPONEN YANG MASIH KOSONG / PLACEHOLDER
// ============================================================================
function EmptySubComponentState({
  module,
  subMeta,
  status,
  context,
}: {
  module: ModuleDefinition;
  subMeta: (typeof SUB_COMPONENT_REGISTRY)[SubComponentType];
  status: ImplementationStatus;
  context: WorkbenchExecutionContext;
}) {
  const Icon = subMeta.icon;
  const availableTabs = SUB_COMPONENT_KEYS.filter(
    (k) => module.subComponents[k] && module.subComponents[k]?.status !== "empty",
  );

  return (
    <div className="max-w-2xl mx-auto my-8 p-6 sm:p-8 rounded-3xl border border-dashed border-border bg-card/40 text-center">
      <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3.5">
        <Icon className="size-6" />
      </div>

      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-muted text-muted-foreground mb-2">
        <Layers className="size-3" />
        <span>
          Sub-Struktur Level 3: <strong>{subMeta.label}</strong>
        </span>
      </div>

      <h3 className="text-base font-bold text-foreground">
        Komponen {subMeta.label} pada {module.title}
      </h3>
      <p className="text-xs text-muted-foreground max-w-md mx-auto mt-1.5 leading-relaxed">
        {subMeta.description} Saat ini slot <strong>{subMeta.label}</strong> berstatus{" "}
        <span className="font-semibold text-foreground">
          {STATUS_BADGE_MAP[status].label}
        </span>
        .
      </p>

      {/* Pintasan ke Sub-Komponen yang Sudah Aktif di Modul Ini */}
      {availableTabs.length > 0 && (
        <div className="mt-6 pt-5 border-t border-border/60">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Komponen yang Sudah Aktif di Modul Ini:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {availableTabs.map((tabKey) => {
              const meta = SUB_COMPONENT_REGISTRY[tabKey];
              const TabIcon = meta.icon;
              return (
                <button
                  key={tabKey}
                  type="button"
                  onClick={() => context.navigateToSubTab(tabKey)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-background hover:bg-accent text-foreground border border-border shadow-2xs transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="size-3.5 text-emerald-500" />
                  <TabIcon className="size-3.5 text-muted-foreground" />
                  <span>Buka {meta.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
