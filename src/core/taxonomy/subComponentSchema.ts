import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  SUB_COMPONENT_KEYS,
  SUB_COMPONENT_TAB_MAP,
  type WorkspaceId,
  type SubComponentKey,
} from "@/core/unifiedTaxonomy";

// Re-ekspor Level 1 & Level 3 kunci kanonik dari Single Source of Truth
export { SUB_COMPONENT_KEYS, type WorkspaceId, type SubComponentKey };
export type SubComponentType = SubComponentKey;

/**
 * Status kematangan implementasi per sub-komponen (untuk audit & UI badge)
 * - ready: Berfungsi penuh + terisolasi di namespace ws-main:*
 * - legacy: Berfungsi penuh namun masih di storage lama (PEH / LifeOS / Wira)
 * - static: Kalkulator murni / dataset statis tanpa penyimpanan record
 * - placeholder: Hanya kerangka UI, logika belum terhubung
 * - empty: Belum diimplementasikan (dirender dengan Empty Workbench State standar)
 */
export type ImplementationStatus =
  | "ready"
  | "legacy"
  | "static"
  | "placeholder"
  | "empty";

export type OriginSubsystem =
  | "core-saas"
  | "peh"
  | "life-os"
  | "wira"
  | "standalone";

// Selaras dengan src/core/permissions.ts
export type PermissionResource =
  | "client"
  | "project"
  | "task"
  | "deliverable"
  | "document"
  | "note"
  | "approval"
  | "meeting"
  | "finance"
  | "settings"
  | "collaboration"
  | "personal_tools";

export type PermissionAction = "read" | "write" | "delete" | "share" | "approve";

// ============================================================================
// METADATA DEFAULT UNTUK 10 TAB SUB-KOMPONEN (DISINKRONKAN DARI unifiedTaxonomy.ts)
// ============================================================================
export interface SubComponentMeta {
  type: SubComponentType;
  label: string;
  shortLabel: string;
  description: string;
  icon: LucideIcon;
  defaultActionRequired: PermissionAction;
}

export const SUB_COMPONENT_REGISTRY: Record<SubComponentType, SubComponentMeta> =
  SUB_COMPONENT_KEYS.reduce(
    (acc, key) => {
      const def = SUB_COMPONENT_TAB_MAP[key];
      acc[key] = {
        type: key,
        label: def.label,
        shortLabel: def.shortLabel,
        description: def.description,
        icon: def.icon,
        defaultActionRequired: def.defaultActionRequired,
      };
      return acc;
    },
    {} as Record<SubComponentType, SubComponentMeta>,
  );

// ============================================================================
// KONTRAK KONTEKS KERJA KONSULTAN (DIKIRIM KE SETIAP SUB-KOMPONEN)
// ============================================================================
export interface WorkbenchExecutionContext {
  workspaceId: string;            // Contoh: "ws-main"
  activeClientId: string | null;  // Filter konteks klien aktif
  activeProjectId: string | null; // Filter konteks proyek aktif
  role: "konsultan" | "mitra" | "klien";
  searchQuery: string;
  sortOrder: "asc" | "desc";
  navigateToSubTab: (tab: SubComponentType) => void;
}

// ============================================================================
// KONTRAK KONFIGURASI PER SUB-KOMPONEN & MODUL (LEVEL 2 -> LEVEL 3)
// ============================================================================
export interface SubComponentSlotConfig {
  status: ImplementationStatus;
  badgeCount?: number;
  customLabel?: string;
  storageKey?: string; // Contoh: "ws-main:projects.manager_v1"
  requiredAction?: PermissionAction;
  /**
   * Render function atau React Node untuk isi sub-komponen.
   * Menerima WorkbenchExecutionContext agar komponen di dalamnya otomatis
   * mengetahui klien/proyek mana yang sedang dipilih konsultan.
   */
  render?: (ctx: WorkbenchExecutionContext) => ReactNode;
}

export interface ModuleDefinition {
  id: string;
  workspaceId: WorkspaceId;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  routePath: string;
  origin: OriginSubsystem;
  resourceType: PermissionResource;
  defaultSubTab?: SubComponentType;
  /**
   * Pemetaan ke-10 jenis sub-komponen di dalam modul ini.
   * Sub-komponen yang tidak didefinisikan akan otomatis ditandai "empty"
   * dan merender tampilan standar Empty/Placeholder yang rapi.
   */
  subComponents: Partial<Record<SubComponentType, SubComponentSlotConfig>>;
}
