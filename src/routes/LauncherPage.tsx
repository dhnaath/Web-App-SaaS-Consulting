import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoHeight from "embla-carousel-auto-height";
import { AppShell } from "@/app/app-shell";
import { ShellHeaderActiveProvider } from "@/app/shell-header";
import { WORKSPACE_PAGES, type WorkspacePageDef } from "@/config/workspacePages";
import {
  getUnifiedWorkspaces,
  getUnifiedWorkspaceById,
} from "@/core/unifiedTaxonomy";
import { getRaw, setRaw } from "@/core/rawStorage";
import { useDockStore } from "@/hooks/useDockState";
import { useFavorites } from "@/hooks/useFavorites";
import {
  getLastLauncherPage,
  setLastLauncherPage,
} from "@/utils/launcherCategoryMapper";
import { ValueTreatedSection } from "@/features/launcher/ValueTreatedSection";
import { FinancialWealthSection } from "@/features/launcher/FinancialWealthSection";
import { ModeSectionView, getGradient } from "@/features/launcher/ModeSectionView";
import { BusinessOperationsCustomersPage } from "@/features/business-operations/BusinessOperationsCustomersPage";
import { WorkProductivityPage } from "@/features/work-productivity/WorkProductivityPage";
import { CreativeWorkspaceMediaPage } from "@/features/creative-workspace/CreativeWorkspaceMediaPage";
import { ResearchFrameworksPage } from "@/features/research-frameworks/ResearchFrameworksPage";
import { IslamicPrinciplesShariaValuesPage } from "@/features/syariah/IslamicPrinciplesShariaValuesPage";
import { PersonalLifePage } from "@/features/personal-life/PersonalLifePage";
import { FamilyRecordsHouseholdPage } from "@/features/family-records/FamilyRecordsHouseholdPage";
import { PublicRelationsPolicyAffairsPage } from "@/features/public-affairs/PublicRelationsPolicyAffairsPage";
import { ContactDirectoryNetworksPage } from "@/features/social-networks/ContactDirectoryNetworksPage";
import { PhaseSidePage } from "@/features/phase-side/PhaseSidePage";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

const SWITCHER_EXTRA_DELAY_MS = 2000;
const SEARCH_LETTERS = ["S", "e", "a", "r", "c", "h"] as const;

function resolveWorkspaceIndexFromInput(raw?: string | null): number {
  if (!raw) return -1;
  const normalized = raw.trim().toLowerCase();
  return WORKSPACE_PAGES.findIndex(
    (w) =>
      w.id.toLowerCase() === normalized ||
      w.modeId.toLowerCase() === normalized,
  );
}

const VALUE_TREATED_ALIASES = new Set([
  "valuetreated",
  "value-treated",
  "value_treated",
  "disiplin",
  "applied-value-framework",
  "applied-value",
  "applied_value_framework",
  "applied",
]);

function isValueTreatedAlias(raw?: string | null): boolean {
  if (!raw) return false;
  return VALUE_TREATED_ALIASES.has(raw.trim().toLowerCase());
}

function getInitialSlideState(): {
  initialIdx: number;
  isValueTreated: boolean;
} {
  if (typeof window !== "undefined") {
    try {
      const params = new URLSearchParams(window.location.search);
      const rawParam =
        params.get("page") ||
        params.get("mode") ||
        params.get("tab") ||
        params.get("workspace");
      if (rawParam) {
        if (isValueTreatedAlias(rawParam)) {
          return { initialIdx: 0, isValueTreated: true };
        }
        const paramIdx = resolveWorkspaceIndexFromInput(rawParam);
        if (paramIdx >= 0) {
          return { initialIdx: paramIdx, isValueTreated: false };
        }
      }
    } catch {}
  }

  const rawMode =
    getRaw("aio_active_mode") || getRaw("client_os_active_mode");
  const modeIdx = resolveWorkspaceIndexFromInput(rawMode);
  if (modeIdx >= 0) {
    return { initialIdx: modeIdx, isValueTreated: false };
  }

  const lastIdx = getLastLauncherPage(WORKSPACE_PAGES.length);
  return {
    initialIdx: lastIdx >= 0 && lastIdx < WORKSPACE_PAGES.length ? lastIdx : 0,
    isValueTreated: false,
  };
}

export function LauncherPage() {
  const [{ initialIdx, isValueTreated: initialValueTreated }] = useState(
    getInitialSlideState,
  );
  const [activeIndex, setActiveIndex] = useState<number>(initialIdx);
  const [showValueTreated, setShowValueTreated] = useState<boolean>(
    initialValueTreated,
  );
  const { favorites, toggleFavorite } = useFavorites();
  const isDockMinimized = useDockStore((s) => s.isMinimized);
  const [isSwitcherMinimized, setIsSwitcherMinimized] = useState(false);

  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wheelCooldownRef = useRef<number>(0);
  const isSyncingFromEventRef = useRef<boolean>(false);
  const switcherTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHoveringSwitcherRef = useRef<boolean>(false);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      startIndex: initialIdx,
      align: "start",
      loop: false,
      skipSnaps: false,
      dragThreshold: 12,
      containScroll: "trimSnaps",
    },
    [AutoHeight()],
  );

  const activeWorkspace = useMemo(() => {
    return WORKSPACE_PAGES[activeIndex] || WORKSPACE_PAGES[0];
  }, [activeIndex]);

  const activeUnifiedWorkspace = useMemo(
    () => getUnifiedWorkspaceById(activeWorkspace.id),
    [activeWorkspace.id],
  );

  const unifiedWorkspacesMap = useMemo(() => {
    return new Map(getUnifiedWorkspaces().map((ws) => [ws.id, ws]));
  }, []);

  const syncWorkspaceState = useCallback(
    (idx: number, broadcast = true) => {
      const ws = WORKSPACE_PAGES[idx];
      if (!ws) return;
      setLastLauncherPage(idx);
      setRaw("aio_active_mode", ws.modeId);
      setRaw("client_os_active_mode", ws.modeId);
      if (broadcast && typeof window !== "undefined") {
        isSyncingFromEventRef.current = true;
        window.dispatchEvent(
          new CustomEvent("aio_launcher_page_changed", { detail: ws.id }),
        );
        window.dispatchEvent(
          new CustomEvent("aio_launcher_mode_changed", { detail: ws.modeId }),
        );
        window.dispatchEvent(new Event("aio_mode_changed"));
        setTimeout(() => {
          isSyncingFromEventRef.current = false;
        }, 0);
      }
    },
    [],
  );

  // Listen to Embla slide selection (swipe / drag / scrollTo)
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const nextIdx = emblaApi.selectedScrollSnap();
      setShowValueTreated(false);
      setActiveIndex(nextIdx);
      syncWorkspaceState(nextIdx, true);
    };

    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, syncWorkspaceState]);

  // Keep Embla AutoHeight synchronized when active slide height changes (filter pills / card flip / move)
  useEffect(() => {
    if (!emblaApi || showValueTreated) return;
    const activeEl = slideRefs.current[activeIndex];
    if (!activeEl || typeof ResizeObserver === "undefined") return;

    let rafId: number | null = null;
    const ro = new ResizeObserver(() => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        emblaApi.reInit();
      });
    });
    ro.observe(activeEl);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [emblaApi, activeIndex, showValueTreated]);

  const scrollToIndex = useCallback(
    (targetIdx: number) => {
      const clamped = Math.max(
        0,
        Math.min(WORKSPACE_PAGES.length - 1, targetIdx),
      );
      setShowValueTreated(false);
      setActiveIndex(clamped);
      syncWorkspaceState(clamped, true);
      if (emblaApi) {
        emblaApi.scrollTo(clamped);
      }
    },
    [emblaApi, syncWorkspaceState],
  );

  const clearSwitcherTimer = useCallback(() => {
    if (switcherTimerRef.current) {
      clearTimeout(switcherTimerRef.current);
      switcherTimerRef.current = null;
    }
  }, []);

  const scheduleSwitcherMinimize = useCallback(() => {
    clearSwitcherTimer();
    if (!isDockMinimized || showValueTreated || isHoveringSwitcherRef.current) {
      return;
    }
    switcherTimerRef.current = setTimeout(() => {
      if (!isHoveringSwitcherRef.current) {
        setIsSwitcherMinimized(true);
      }
    }, SWITCHER_EXTRA_DELAY_MS);
  }, [clearSwitcherTimer, isDockMinimized, showValueTreated]);

  // Minimize switcher 2 seconds (+2s) after the bottom dock minimizes
  useEffect(() => {
    if (!isDockMinimized || showValueTreated) {
      clearSwitcherTimer();
      setIsSwitcherMinimized(false);
      return;
    }

    setIsSwitcherMinimized(false);
    scheduleSwitcherMinimize();
    return clearSwitcherTimer;
  }, [
    isDockMinimized,
    showValueTreated,
    activeIndex,
    clearSwitcherTimer,
    scheduleSwitcherMinimize,
  ]);

  // Respond to external navigation (SidebarPillarsMenu, CardMoreMenu, mode changes)
  useEffect(() => {
    const navigateToTarget = (rawTarget?: string | null) => {
      if (isSyncingFromEventRef.current || !rawTarget) return;
      const normalized = rawTarget.trim().toLowerCase();
      if (isValueTreatedAlias(normalized)) {
        setShowValueTreated(true);
        return;
      }
      const targetIdx = resolveWorkspaceIndexFromInput(normalized);
      if (targetIdx >= 0) {
        setShowValueTreated(false);
        setActiveIndex(targetIdx);
        setLastLauncherPage(targetIdx);
        if (emblaApi && emblaApi.selectedScrollSnap() !== targetIdx) {
          emblaApi.scrollTo(targetIdx);
        }
      }
    };

    const onNavigatePage = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const target =
        typeof detail === "string" ? detail : detail?.id || detail?.modeId;
      navigateToTarget(target);
    };

    const onModeChanged = () => {
      if (isSyncingFromEventRef.current) return;
      const rawMode =
        getRaw("aio_active_mode") || getRaw("client_os_active_mode");
      navigateToTarget(rawMode);
    };

    window.addEventListener("aio_navigate_launcher_page", onNavigatePage);
    window.addEventListener("aio_launcher_mode_changed", onNavigatePage);
    window.addEventListener("aio_active_workspace_changed", onNavigatePage);
    window.addEventListener("aio_mode_changed", onModeChanged);

    return () => {
      window.removeEventListener("aio_navigate_launcher_page", onNavigatePage);
      window.removeEventListener("aio_launcher_mode_changed", onNavigatePage);
      window.removeEventListener("aio_active_workspace_changed", onNavigatePage);
      window.removeEventListener("aio_mode_changed", onModeChanged);
    };
  }, [emblaApi]);

  // Keyboard ArrowLeft / ArrowRight navigation
  useEffect(() => {
    if (showValueTreated) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      const activeEl = document.activeElement as HTMLElement | null;
      if (
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.tagName === "SELECT" ||
          activeEl.isContentEditable)
      ) {
        return;
      }

      if (e.key === "ArrowRight") {
        if (activeIndex < WORKSPACE_PAGES.length - 1) {
          e.preventDefault();
          scrollToIndex(activeIndex + 1);
        }
      } else if (e.key === "ArrowLeft") {
        if (activeIndex > 0) {
          e.preventDefault();
          scrollToIndex(activeIndex - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, scrollToIndex, showValueTreated]);

  // Trackpad two-finger horizontal wheel swipe
  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (showValueTreated || !emblaApi) return;

      // Skip if wheel originated inside a horizontally scrollable child (e.g., category pill bar)
      const target = e.target as HTMLElement | null;
      if (target?.closest("[data-nav-pill-group='true'], .overflow-x-auto")) {
        return;
      }

      if (
        Math.abs(e.deltaX) > 28 &&
        Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.4
      ) {
        const now = Date.now();
        if (now - wheelCooldownRef.current < 550) return;

        if (e.deltaX > 0 && activeIndex < WORKSPACE_PAGES.length - 1) {
          wheelCooldownRef.current = now;
          scrollToIndex(activeIndex + 1);
        } else if (e.deltaX < 0 && activeIndex > 0) {
          wheelCooldownRef.current = now;
          scrollToIndex(activeIndex - 1);
        }
      }
    },
    [activeIndex, emblaApi, scrollToIndex, showValueTreated],
  );

  const renderSlideBody = (ws: WorkspacePageDef) => {
    switch (ws.id) {
      case "financial":
        return (
          <FinancialWealthSection
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            getGradient={getGradient}
          />
        );
      case "mode_business":
        return <BusinessOperationsCustomersPage isEmbedded={true} />;
      case "mode_employment":
        return <WorkProductivityPage isEmbedded={true} />;
      case "mode_creative":
        return <CreativeWorkspaceMediaPage isEmbedded={true} />;
      case "mode_research":
        return <ResearchFrameworksPage isEmbedded={true} />;
      case "mode_sharia":
        return <IslamicPrinciplesShariaValuesPage isEmbedded={true} />;
      case "mode_personal":
        return <PersonalLifePage isEmbedded={true} />;
      case "mode_family":
        return <FamilyRecordsHouseholdPage isEmbedded={true} />;
      case "mode_public_affairs":
        return <PublicRelationsPolicyAffairsPage isEmbedded={true} />;
      case "mode_networks":
        return <ContactDirectoryNetworksPage isEmbedded={true} />;
      case "mode_phase_side":
        return <PhaseSidePage isEmbedded={true} />;
      default:
        return (
          <ModeSectionView
            modeId={ws.id}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        );
    }
  };

  return (
    <AppShell
      title={
        showValueTreated
          ? "Applied Value Framework"
          : activeUnifiedWorkspace?.labelEn || activeWorkspace.label
      }
      subtitle={
        showValueTreated
          ? "Pusat Kurasi Nilai Terapan Komprehensif Melintasi 10 Bidang Value & 5 Jenjang SKS"
          : activeUnifiedWorkspace?.description || activeWorkspace.desc
      }
    >
      <div
        className="w-full max-w-[1815px] mx-auto px-4 sm:px-6 pb-16 pt-2"
        onWheel={handleWheel}
      >
        {showValueTreated ? (
          <div className="space-y-4">
            <div className="flex justify-center pt-1">
              <button
                type="button"
                onClick={() => scrollToIndex(activeIndex)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full liquid-glass-header-pill bg-white/70 dark:bg-zinc-800/70 border border-border/60 text-xs font-medium text-foreground hover:text-primary transition-colors cursor-pointer"
              >
                <ChevronLeft className="size-3.5" />
                <span>Kembali ke Laman Launcher ({activeIndex + 1}/{WORKSPACE_PAGES.length})</span>
              </button>
            </div>
            <ValueTreatedSection
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          </div>
        ) : (
          <>
            {/* Horizontal Swipe / Drag Carousel across all 11 Laman */}
            <div ref={emblaRef} className="overflow-hidden w-full">
              <div className="flex items-start transition-[height] duration-300 ease-out">
                {WORKSPACE_PAGES.map((ws, idx) => {
                  const isActiveSlide = idx === activeIndex;
                  return (
                    <div
                      key={ws.id}
                      ref={(el) => {
                        slideRefs.current[idx] = el;
                      }}
                      className="flex-[0_0_100%] min-w-0 w-full select-none"
                    >
                      <ShellHeaderActiveProvider value={isActiveSlide}>
                        {renderSlideBody(ws)}
                      </ShellHeaderActiveProvider>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Slide Indicator & Page Switcher Bar positioned right above the bottom dock */}
            <div
              className={`fixed z-30 left-1/2 -translate-x-1/2 flex items-center justify-center max-w-[95vw] pointer-events-none transition-all duration-300 ease-out ${
                isDockMinimized ? "bottom-10" : "bottom-[92px]"
              }`}
            >
              <motion.div
                layout
                transition={{
                  layout: {
                    type: "spring",
                    stiffness: 360,
                    damping: 28,
                    mass: 0.75,
                  },
                }}
                onMouseEnter={() => {
                  isHoveringSwitcherRef.current = true;
                  clearSwitcherTimer();
                }}
                onMouseLeave={() => {
                  isHoveringSwitcherRef.current = false;
                  if (isDockMinimized && !isSwitcherMinimized && !showValueTreated) {
                    scheduleSwitcherMinimize();
                  }
                }}
                className="pointer-events-auto inline-flex items-center rounded-full liquid-glass-header-pill bg-white/65 dark:bg-zinc-800/65 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xs max-w-full overflow-hidden"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isSwitcherMinimized ? (
                    <motion.button
                      key="minimized-search"
                      type="button"
                      onClick={() =>
                        window.dispatchEvent(new CustomEvent("aio_open_search"))
                      }
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{
                        opacity: 0,
                        scale: 0.92,
                        transition: { duration: 0.14 },
                      }}
                      transition={{ duration: 0.18 }}
                      title="Pencarian (Cmd/Ctrl+K)"
                      aria-label="Search"
                      className="relative z-10 inline-flex items-center gap-2 px-4 h-9 rounded-full text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none whitespace-nowrap"
                    >
                      <span
                        className="inline-flex items-center tracking-tight"
                        aria-hidden="true"
                      >
                        {SEARCH_LETTERS.map((char, idx) => (
                          <motion.span
                            key={`${char}-${idx}`}
                            initial={{ opacity: 0, maxWidth: 0, x: -2 }}
                            animate={{ opacity: 1, maxWidth: 16, x: 0 }}
                            transition={{
                              delay: 0.06 + idx * 0.065,
                              duration: 0.09,
                              ease: "easeOut",
                            }}
                            className="inline-block overflow-hidden"
                          >
                            {char}
                          </motion.span>
                        ))}
                        <motion.span
                          initial={{ opacity: 0.9, width: 1.5 }}
                          animate={{
                            opacity: [0.9, 0.2, 0.9, 0],
                            width: [1.5, 1.5, 1.5, 0],
                          }}
                          transition={{
                            delay: 0.04,
                            duration: 0.52,
                            times: [0, 0.4, 0.85, 1],
                            ease: "easeOut",
                          }}
                          className="inline-block h-3.5 bg-primary/80 rounded-full ml-0.5 overflow-hidden"
                        />
                      </span>
                      <motion.span
                        initial={{ opacity: 0, scale: 0.35, rotate: -25 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{
                          delay: 0.5,
                          type: "spring",
                          stiffness: 420,
                          damping: 20,
                        }}
                        className="inline-flex items-center justify-center shrink-0"
                      >
                        <Search className="size-3.5 stroke-[2.25]" />
                      </motion.span>
                    </motion.button>
                  ) : (
                    <motion.div
                      key="expanded-dots"
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{
                        opacity: 0,
                        scale: 0.92,
                        transition: { duration: 0.16 },
                      }}
                      transition={{ duration: 0.2 }}
                      className="relative z-10 inline-flex items-center gap-1 sm:gap-1.5 px-2 py-1"
                    >
                      <button
                        type="button"
                        onClick={() => scrollToIndex(activeIndex - 1)}
                        disabled={activeIndex === 0}
                        title={
                          activeIndex > 0
                            ? `Geser ke ${
                                unifiedWorkspacesMap.get(WORKSPACE_PAGES[activeIndex - 1].id as any)?.labelEn ||
                                WORKSPACE_PAGES[activeIndex - 1].label
                              }`
                            : "Ini halaman pertama"
                        }
                        aria-label="Halaman sebelumnya"
                        className="relative z-10 size-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer shrink-0"
                      >
                        <ChevronLeft className="size-4" />
                      </button>

                      <div
                        className="relative z-10 flex items-center gap-1.5 px-1.5 py-2 overflow-x-auto overflow-y-visible no-scrollbar"
                        role="tablist"
                        aria-label="Pilih Halaman Launcher"
                      >
                        {WORKSPACE_PAGES.map((ws, idx) => {
                          const isCurrent = idx === activeIndex;
                          const unified = unifiedWorkspacesMap.get(ws.id as any);
                          const wsLabel = unified?.labelEn || ws.label;
                          return (
                            <button
                              key={ws.id}
                              type="button"
                              role="tab"
                              aria-selected={isCurrent}
                              aria-label={wsLabel}
                              title={unified ? `${unified.code} · ${wsLabel}` : wsLabel}
                              onClick={() => scrollToIndex(idx)}
                              className={`block h-2 rounded-full transition-all duration-200 cursor-pointer shrink-0 ${
                                isCurrent
                                  ? "w-6 bg-primary shadow-2xs"
                                  : "w-2 bg-muted-foreground/35 hover:bg-muted-foreground/70"
                              }`}
                            />
                          );
                        })}
                      </div>

                      <button
                        type="button"
                        onClick={() => scrollToIndex(activeIndex + 1)}
                        disabled={activeIndex === WORKSPACE_PAGES.length - 1}
                        title={
                          activeIndex < WORKSPACE_PAGES.length - 1
                            ? `Geser ke ${
                                unifiedWorkspacesMap.get(WORKSPACE_PAGES[activeIndex + 1].id as any)?.labelEn ||
                                WORKSPACE_PAGES[activeIndex + 1].label
                              }`
                            : "Ini halaman terakhir"
                        }
                        aria-label="Halaman berikutnya"
                        className="relative z-10 size-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer shrink-0"
                      >
                        <ChevronRight className="size-4" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}

export default LauncherPage;
