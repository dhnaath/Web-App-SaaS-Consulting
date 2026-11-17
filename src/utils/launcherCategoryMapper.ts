import { getRaw, setRaw } from "@/core/rawStorage";
import { WORKSPACE_PAGES } from "@/config/workspacePages";

const LAST_PAGE_KEY = "aio_last_launcher_page_idx";
const LAST_ACTIVE_APP_KEY = "aio_last_active_app_route";

export function findLauncherPageIndexForRoute(pathname: string): number {
  if (!pathname || pathname === "/" || pathname === "/home") return 0;
  const normalized = pathname.split("?")[0].toLowerCase();

  for (let i = 0; i < WORKSPACE_PAGES.length; i++) {
    const ws = WORKSPACE_PAGES[i];
    for (const mod of ws.modules) {
      const modPath = mod.to.split("?")[0].toLowerCase();
      if (modPath === normalized || (modPath !== "/" && normalized.startsWith(modPath))) {
        return i;
      }
      if (mod.features) {
        for (const feat of mod.features) {
          const featPath = feat.to.split("?")[0].toLowerCase();
          if (featPath === normalized || (featPath !== "/" && normalized.startsWith(featPath))) {
            return i;
          }
        }
      }
    }
  }

  return 0;
}

export function setLastLauncherPage(pageIndex: number): void {
  try {
    const safeIdx = Math.max(0, Math.floor(pageIndex));
    setRaw(LAST_PAGE_KEY, String(safeIdx));
    const page = WORKSPACE_PAGES[safeIdx];
    if (page) {
      setRaw("aio_active_mode", page.modeId);
      setRaw("client_os_active_mode", page.modeId);
    }
  } catch {
    // ignore storage errors
  }
}

export function getLastLauncherPage(totalPages = WORKSPACE_PAGES.length): number {
  try {
    const raw = getRaw(LAST_PAGE_KEY);
    if (raw !== null) {
      const parsed = Number(raw);
      if (Number.isFinite(parsed) && parsed >= 0 && parsed < totalPages) {
        return Math.floor(parsed);
      }
    }
    const rawMode = getRaw("aio_active_mode") || getRaw("client_os_active_mode");
    if (rawMode) {
      const idx = WORKSPACE_PAGES.findIndex(
        (w) => w.id === rawMode || w.modeId === rawMode,
      );
      if (idx >= 0 && idx < totalPages) {
        return idx;
      }
    }
  } catch {
    // ignore
  }
  return 0;
}

export function recordActiveApp(pathname: string): void {
  if (!pathname || pathname === "/" || pathname === "/home") return;
  try {
    setRaw(LAST_ACTIVE_APP_KEY, pathname);
    const pageIdx = findLauncherPageIndexForRoute(pathname);
    if (pageIdx >= 0 && pageIdx < WORKSPACE_PAGES.length) {
      setLastLauncherPage(pageIdx);
    }
  } catch {
    // ignore
  }
}

export function getLastActiveApp(): string | null {
  try {
    return getRaw(LAST_ACTIVE_APP_KEY);
  } catch {
    return null;
  }
}
