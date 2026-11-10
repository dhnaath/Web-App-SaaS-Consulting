import { getCurrentSession } from "./session";
import {
  DEFAULT_WORKSPACE_ID,
  buildStorageKey,
  resolveLegacyKeyTarget,
} from "./storage";

/**
 * Shared storage helpers for workspace-scoped storage adaptors
 * (consolidates duplicated internal primitives between persistStorage and rawStorage).
 */

export function getSafeLocalStorage(): Storage | null {
  try {
    if (typeof window === "undefined" || !window.localStorage) {
      return null;
    }
    return window.localStorage;
  } catch {
    return null;
  }
}

export function resolveSessionWorkspaceId(): string {
  try {
    const ws = getCurrentSession()?.workspaceId?.trim();
    return ws && ws.length > 0 ? ws : DEFAULT_WORKSPACE_ID;
  } catch {
    return DEFAULT_WORKSPACE_ID;
  }
}

export function resolveLockedPhysicalKey(
  keyOrName: string,
  lockedWorkspaceId: string,
): string {
  const targetKey = resolveLegacyKeyTarget(keyOrName) ?? keyOrName;
  return buildStorageKey(targetKey, lockedWorkspaceId);
}
