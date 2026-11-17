import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { LayoutGroup, motion } from "framer-motion";
import {
  UNIFIED_SUB_COMPONENTS,
  SUB_COMPONENT_TAB_MAP,
  type SubComponentKey,
} from "@/core/taxonomy";
import { useShellHeaderPresence } from "@/app/shell-header";

export interface ModuleSubComponentBarProps {
  /** Controlled active sub-component tab */
  activeTab?: SubComponentKey;
  /** Initial tab when uncontrolled (defaults to "dashboards") */
  defaultTab?: SubComponentKey;
  /** Callback when a user selects one of the 10 standard sub-component tabs */
  onTabChange?: (tab: SubComponentKey) => void;
  /** Optional subset of tabs that currently have configured content; others remain visible but subtly dimmed unless hideUnavailable=true */
  availableTabs?: readonly SubComponentKey[];
  /** Hide tabs that are not in availableTabs (default: false — always displays all 10 standard tabs) */
  hideUnavailable?: boolean;
  /** Optional count or badge text per sub-component tab */
  counts?: Partial<Record<SubComponentKey, number | string>>;
  /** Optional label overrides per sub-component tab */
  labels?: Partial<Record<SubComponentKey, string>>;
  /** Render into #app-header-actions-portal via createPortal (default: true) */
  portal?: boolean;
  /** Display mode: portal only (with optional inline fallback), inline only, or both */
  variant?: "portal" | "inline" | "both";
  /** Render inline bar as fallback when portal=true and #app-header-actions-portal is not mounted (default: true) */
  fallbackInline?: boolean;
  /** Show Lucide icons alongside tab labels (default: true for inline, compact for portal) */
  showIcons?: boolean;
  /** Additional class name for the inline bar container */
  className?: string;
}

export function ModuleSubComponentBar({
  activeTab: controlledTab,
  defaultTab = "dashboards",
  onTabChange,
  availableTabs,
  hideUnavailable = false,
  counts,
  labels,
  portal = true,
  variant = "portal",
  fallbackInline = true,
  showIcons = true,
  className = "",
}: ModuleSubComponentBarProps) {
  const groupId = useId();
  const [internalTab, setInternalTab] = useState<SubComponentKey>(defaultTab);
  const [hoveredPortalTab, setHoveredPortalTab] =
    useState<SubComponentKey | null>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null,
  );

  const currentTab = controlledTab ?? internalTab;

  useEffect(() => {
    if (!controlledTab && defaultTab) {
      setInternalTab(defaultTab);
    }
  }, [controlledTab, defaultTab]);

  const shouldUsePortal = portal && (variant === "portal" || variant === "both");

  useEffect(() => {
    if (!shouldUsePortal) {
      setPortalContainer(null);
      return;
    }

    const resolveTarget = () => {
      const target = document.getElementById("app-header-actions-portal");
      setPortalContainer(target);
    };

    resolveTarget();
    const timer = setTimeout(resolveTarget, 50);
    return () => clearTimeout(timer);
  }, [shouldUsePortal]);

  useShellHeaderPresence(shouldUsePortal && Boolean(portalContainer));

  const handleSelectTab = useCallback(
    (tabKey: SubComponentKey) => {
      if (!controlledTab) {
        setInternalTab(tabKey);
      }
      onTabChange?.(tabKey);
    },
    [controlledTab, onTabChange],
  );

  const availableSet = useMemo(
    () => (availableTabs ? new Set<SubComponentKey>(availableTabs) : null),
    [availableTabs],
  );

  const visibleTabs = useMemo(() => {
    return UNIFIED_SUB_COMPONENTS.filter((item) => {
      if (hideUnavailable && availableSet) {
        return availableSet.has(item.id);
      }
      return true;
    }).map((item) => {
      const meta = SUB_COMPONENT_TAB_MAP[item.id];
      return {
        key: item.id,
        label: labels?.[item.id] ?? item.label,
        description: meta.description,
        icon: meta.icon,
        count: counts?.[item.id],
        isAvailable: availableSet ? availableSet.has(item.id) : true,
      };
    });
  }, [availableSet, hideUnavailable, labels, counts]);

  const portalElement =
    shouldUsePortal && portalContainer
      ? createPortal(
          <div className="flex items-center justify-end gap-1.5 shrink-0 shell-header-portal-actions h-full overflow-visible">
            <LayoutGroup id={`module-subcomponent-portal-${groupId}`}>
              <div
                data-nav-pill-group="true"
                onMouseLeave={() => setHoveredPortalTab(null)}
                className="relative inline-flex items-center justify-end h-[46px] rounded-full liquid-glass-header-pill bg-white/60 dark:bg-zinc-800/60 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xs p-1 overflow-x-auto overflow-y-visible no-scrollbar max-w-full gap-0.5"
              >
                {visibleTabs.map((tab) => {
                  const TabIcon = tab.icon;
                  const isSelected = currentTab === tab.key;
                  const isHighlighted =
                    (hoveredPortalTab ?? currentTab) === tab.key;

                  return (
                    <button
                      key={tab.key}
                      type="button"
                      data-nav-pill-btn="true"
                      data-nav-selected={isSelected ? "true" : undefined}
                      data-pill-highlighted={isHighlighted ? "true" : undefined}
                      onMouseEnter={() => setHoveredPortalTab(tab.key)}
                      onClick={() => handleSelectTab(tab.key)}
                      title={`${tab.label} — ${tab.description}`}
                      className={`relative h-[38px] px-3 text-xs font-semibold rounded-full transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer select-none ${
                        isHighlighted
                          ? "text-primary-foreground"
                          : isSelected
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                      } ${!tab.isAvailable ? "opacity-60" : ""}`}
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
                        {showIcons && (
                          <TabIcon className="size-3.5 shrink-0" />
                        )}
                        <span>{tab.label}</span>
                        {tab.count !== undefined && (
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-full leading-none ${
                              isHighlighted
                                ? "bg-white/20 text-primary-foreground"
                                : "bg-black/10 dark:bg-white/15 text-foreground"
                            }`}
                          >
                            {tab.count}
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
        )
      : null;

  const shouldRenderInline =
    variant === "inline" ||
    variant === "both" ||
    (!portalElement && fallbackInline);

  return (
    <>
      {portalElement}
      {shouldRenderInline && (
        <div
          role="tablist"
          aria-label="Sub-Komponen Modul"
          className={`flex items-center gap-1 overflow-x-auto no-scrollbar pb-0.5 ${className}`}
        >
          {visibleTabs.map((tab) => {
            const TabIcon = tab.icon;
            const isSelected = currentTab === tab.key;

            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => handleSelectTab(tab.key)}
                title={`${tab.label} — ${tab.description}`}
                className={`group relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer select-none ${
                  isSelected
                    ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                    : !tab.isAvailable
                      ? "text-muted-foreground/60 hover:text-foreground hover:bg-muted/50"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                }`}
              >
                {showIcons && <TabIcon className="size-3.5 shrink-0" />}
                <span className="whitespace-nowrap">{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold leading-none ${
                      isSelected
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}

export default ModuleSubComponentBar;
