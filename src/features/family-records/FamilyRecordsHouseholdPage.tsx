import React, { useState, useMemo } from "react";
import { useFavorites } from "@/hooks/useFavorites";
import { HeaderNavPills, ShellHeader } from "@/app/shell-header";
import {
  MBACard,
  buildModuleCategoryGroups,
  type ModuleComponentCategory,
} from "@/components/common/MBACard";
import { MovedCardsGridItems } from "@/components/common/MovedCardsGridItems";
import {
  LauncherPageProvider,
  adjustCategoryTabsCount,
  syncLauncherPageBadge,
  useCardPageMover,
  useCurrentLauncherPage,
} from "@/hooks/useCardPageMover";
import { usePinnedCards, sortCardsWithPinned } from "@/hooks/usePinnedCards";
import {
  GitFork,
  Users,
  Handshake,
  Home,
  CheckSquare,
  Wrench,
  Sprout,
  Wallet,
  Receipt,
  Building2,
  Package,
  Zap,
  Utensils,
  CalendarDays,
  ShoppingCart,
  ShieldAlert,
  HeartPulse,
  ShieldCheck,
  Car,
  Fuel,
  Compass,
  FileCheck,
  CalendarRange,
  Archive,
  Search,
} from "lucide-react";

export type FamilyCategory =
  | "all"
  | "family"
  | "operations"
  | "finance"
  | "property"
  | "culinary"
  | "safety"
  | "mobility"
  | "administration";

const LEGACY_FAMILY_CATEGORY_MAP: Record<string, FamilyCategory> = {
  keluarga: "family",
  "rumah-tangga": "operations",
  kendaraan: "mobility",
  "family-management": "family",
  "household-operations": "operations",
  "household-finance": "finance",
  "home-and-property": "property",
  "food-and-kitchen": "culinary",
  "family-safety-wellbeing": "safety",
  "vehicles-and-mobility": "mobility",
  "family-administration": "administration",
};

export function normalizeFamilyCategory(raw?: string | null): FamilyCategory {
  if (!raw) return "all";
  const key = raw.trim().toLowerCase();
  if (
    key === "all" ||
    key === "family" ||
    key === "operations" ||
    key === "finance" ||
    key === "property" ||
    key === "culinary" ||
    key === "safety" ||
    key === "mobility" ||
    key === "administration"
  ) {
    return key;
  }
  return LEGACY_FAMILY_CATEGORY_MAP[key] ?? "all";
}

export interface FamilySubMenu {
  id: string;
  label: string;
  to: string;
  inverted?: boolean;
  componentCategory: ModuleComponentCategory;
}

export interface FamilyAppItem {
  id: string;
  name: string;
  category: Exclude<FamilyCategory, "all">;
  categoryLabel: string;
  shortDesc: string;
  to: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  badge: string;
  accentGradient: string;
  accentBorder: string;
  badgeBg: string;
  badgeText: string;
  subMenus: FamilySubMenu[];
}

export const FAMILY_HOUSEHOLD_APPS: FamilyAppItem[] = [
  // ============================================================================
  // 1. Family (3 Modul)
  // ============================================================================
  {
    id: "family-heritage",
    name: "Family Heritage",
    category: "family",
    categoryLabel: "Family",
    shortDesc:
      "Pencatatan silsilah garis keturunan, garis asal-usul keluarga besar, serta pelestarian kisah sejarah dan tradisi keluarga lintas generasi.",
    to: "/peh/family-tree",
    icon: GitFork,
    badge: "Family",
    accentGradient: "from-rose-500 to-pink-600",
    accentBorder: "border-rose-500/30 hover:border-rose-500/60",
    badgeBg: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
    badgeText: "Family",
    subMenus: [
      { id: "family-tree", label: "Family Tree", to: "/peh/family-tree", inverted: false, componentCategory: "Records" },
      { id: "tradisi-keluarga", label: "Family History", to: "/peh/traditions", inverted: false, componentCategory: "Records" },
    ],
  },
  {
    id: "family-members",
    name: "Family Members",
    category: "family",
    categoryLabel: "Family",
    shortDesc:
      "Direktori keanggotaan inti dan keluarga besar yang mencatat peran domestik, informasi identitas anggota rumah tangga, dan data kerabat.",
    to: "/household-planning-and-family-records?module=family-members",
    icon: Users,
    badge: "Family",
    accentGradient: "from-pink-500 to-rose-600",
    accentBorder: "border-pink-500/30 hover:border-pink-500/60",
    badgeBg: "bg-pink-500/15 text-pink-600 dark:text-pink-400 border-pink-500/30",
    badgeText: "Family",
    subMenus: [
      { id: "family-directory", label: "Family Directory", to: "", componentCategory: "Records" },
    ],
  },
  {
    id: "family-coordination",
    name: "Family Coordination",
    category: "family",
    categoryLabel: "Family",
    shortDesc:
      "Kesepakatan tata tertib rumah bersama, papan pembagian tanggung jawab anggota keluarga, serta perencanaan agenda musyawarah keluarga.",
    to: "/lainnya?app=family-rules",
    icon: Handshake,
    badge: "Family",
    accentGradient: "from-fuchsia-500 to-pink-600",
    accentBorder: "border-fuchsia-500/30 hover:border-fuchsia-500/60",
    badgeBg: "bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/30",
    badgeText: "Family",
    subMenus: [
      { id: "house-rules", label: "Household Rules", to: "/lainnya?app=family-rules", inverted: false, componentCategory: "Guides" },
      { id: "shared-responsibilities-board", label: "Shared Responsibilities Board", to: "", componentCategory: "Dashboards" },
      { id: "family-meeting-planner", label: "Family Meeting Planner", to: "", componentCategory: "Workflows" },
    ],
  },

  // ============================================================================
  // 2. Operations (4 Modul)
  // ============================================================================
  {
    id: "household-management",
    name: "Household Management",
    category: "operations",
    categoryLabel: "Operations",
    shortDesc:
      "Pusat koordinasi operasional harian rumah tangga: sinkronisasi pekerjaan rutin domestik, pemeliharaan fisik hunian, taman, dan hewan peliharaan.",
    to: "/peh/chores",
    icon: Home,
    badge: "Operations",
    accentGradient: "from-amber-500 to-orange-600",
    accentBorder: "border-amber-500/30 hover:border-amber-500/60",
    badgeBg: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    badgeText: "Operations",
    subMenus: [
      { id: "household-tracker", label: "Household Tracker", to: "/life/household-tracker", inverted: false, componentCategory: "Dashboards" },
    ],
  },
  {
    id: "household-chores",
    name: "Domestic Operations",
    category: "operations",
    categoryLabel: "Operations",
    shortDesc:
      "Daftar pekerjaan kebersihan dan kerapian rumah harian beserta alur pembagian giliran tugas kepada masing-masing anggota rumah tangga.",
    to: "/peh/chores",
    icon: CheckSquare,
    badge: "Operations",
    accentGradient: "from-orange-500 to-amber-600",
    accentBorder: "border-orange-500/30 hover:border-orange-500/60",
    badgeBg: "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/30",
    badgeText: "Operations",
    subMenus: [
      { id: "chores-list", label: "Household Chores", to: "/peh/chores", inverted: false, componentCategory: "Workflows" },
      { id: "chore-assignment-planner", label: "Chore Assignment Planner", to: "", componentCategory: "Workflows" },
    ],
  },
  {
    id: "home-maintenance",
    name: "Property Maintenance",
    category: "operations",
    categoryLabel: "Operations",
    shortDesc:
      "Pencatatan perbaikan fisik bangunan, instalasi air/listrik, perawatan AC dan atap, serta jadwal pemeliharaan preventif berkala.",
    to: "/peh/maintenance",
    icon: Wrench,
    badge: "Operations",
    accentGradient: "from-yellow-500 to-orange-600",
    accentBorder: "border-yellow-500/30 hover:border-yellow-500/60",
    badgeBg: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border-yellow-500/30",
    badgeText: "Operations",
    subMenus: [
      { id: "home-maintenance-log", label: "Home Maintenance Log", to: "/peh/maintenance", inverted: false, componentCategory: "Records" },
      { id: "maintenance-schedule", label: "Maintenance Schedule", to: "", componentCategory: "Automations" },
    ],
  },
  {
    id: "garden-and-pet-care",
    name: "Home Environment",
    category: "operations",
    categoryLabel: "Operations",
    shortDesc:
      "Pengelolaan kebun dan tanaman hias rumah, jadwal penyiraman dan pemupukan, perawatan hewan peliharaan, vaksinasi, dan log harian.",
    to: "/peh/plants",
    icon: Sprout,
    badge: "Operations",
    accentGradient: "from-lime-500 to-emerald-600",
    accentBorder: "border-lime-500/30 hover:border-lime-500/60",
    badgeBg: "bg-lime-500/15 text-lime-600 dark:text-lime-400 border-lime-500/30",
    badgeText: "Operations",
    subMenus: [
      { id: "plants-garden", label: "Garden Management", to: "/peh/plants", inverted: false, componentCategory: "Features" },
      { id: "pet-care", label: "Pet Care", to: "/peh/pet-care", inverted: false, componentCategory: "Features" },
      { id: "garden-pet-care-log", label: "Home Activity Log", to: "", componentCategory: "Records" },
    ],
  },

  // ============================================================================
  // 3. Finance (2 Modul)
  // ============================================================================
  {
    id: "household-finance",
    name: "Household Finance",
    category: "finance",
    categoryLabel: "Finance",
    shortDesc:
      "Perencanaan anggaran bersama keluarga, alokasi pos belanja rumah tangga bulanan, dan pencatatan pengeluaran rutin domestik.",
    to: "/peh/family-budget",
    icon: Wallet,
    badge: "Finance",
    accentGradient: "from-emerald-500 to-teal-600",
    accentBorder: "border-emerald-500/30 hover:border-emerald-500/60",
    badgeBg: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    badgeText: "Finance",
    subMenus: [
      { id: "family-budget", label: "Family Budget", to: "/peh/family-budget", inverted: false, componentCategory: "Features" },
      { id: "monthly-expenses", label: "Expense Tracker", to: "/peh/budget", inverted: false, componentCategory: "Tools" },
    ],
  },
  {
    id: "bills-and-payments",
    name: "Financial Obligations",
    category: "finance",
    categoryLabel: "Finance",
    shortDesc:
      "Pengelolaan jadwal jatuh tempo tagihan listrik, air, internet, IPL lingkungan, serta otomatisasi pengingat pembayaran rumah tangga.",
    to: "/household-planning-and-family-records?module=bills-and-payments",
    icon: Receipt,
    badge: "Finance",
    accentGradient: "from-teal-500 to-cyan-600",
    accentBorder: "border-teal-500/30 hover:border-teal-500/60",
    badgeBg: "bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30",
    badgeText: "Finance",
    subMenus: [
      { id: "bill-payment-calendar", label: "Bill Payment Calendar", to: "", componentCategory: "Automations" },
    ],
  },

  // ============================================================================
  // 4. Property (3 Modul)
  // ============================================================================
  {
    id: "property-records",
    name: "Property Records",
    category: "property",
    categoryLabel: "Property",
    shortDesc:
      "Registri dokumen kepemilikan atau sewa tempat tinggal keluarga (SHM, IMB/PBG, PBB, akta kontrak hunian, dan surat tanah).",
    to: "/household-planning-and-family-records?module=property-records",
    icon: Building2,
    badge: "Property",
    accentGradient: "from-slate-500 to-indigo-600",
    accentBorder: "border-slate-500/30 hover:border-slate-500/60",
    badgeBg: "bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30",
    badgeText: "Property",
    subMenus: [
      { id: "property-document-register", label: "Property Document Register", to: "", componentCategory: "Records" },
    ],
  },
  {
    id: "home-inventory",
    name: "Household Assets",
    category: "property",
    categoryLabel: "Property",
    shortDesc:
      "Inventarisasi aset rumah tangga bersama seperti perabotan dan elektronik, lengkap dengan pelacakan kartu garansi dan bukti kepemilikan.",
    to: "/household-planning-and-family-records?module=home-inventory",
    icon: Package,
    badge: "Property",
    accentGradient: "from-stone-500 to-amber-600",
    accentBorder: "border-stone-500/30 hover:border-stone-500/60",
    badgeBg: "bg-stone-500/15 text-stone-600 dark:text-stone-400 border-stone-500/30",
    badgeText: "Property",
    subMenus: [
      { id: "household-asset-register", label: "Household Asset Register", to: "", componentCategory: "Records" },
      { id: "warranty-ownership-tracker", label: "Ownership Warranty Tracker", to: "", componentCategory: "Records" },
    ],
  },
  {
    id: "home-utilities",
    name: "Home Utilities",
    category: "property",
    categoryLabel: "Property",
    shortDesc:
      "Pemantauan konsumsi utilitas rumah tangga seperti listrik, air bersih, gas, dan bandwidth internet untuk efisiensi penggunaan hunian.",
    to: "/household-planning-and-family-records?module=home-utilities",
    icon: Zap,
    badge: "Property",
    accentGradient: "from-cyan-500 to-blue-600",
    accentBorder: "border-cyan-500/30 hover:border-cyan-500/60",
    badgeBg: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
    badgeText: "Property",
    subMenus: [
      { id: "utility-consumption-analytics", label: "Utility Consumption Analytics", to: "", componentCategory: "Analytics" },
    ],
  },

  // ============================================================================
  // 5. Culinary (3 Modul)
  // ============================================================================
  {
    id: "kitchen-management",
    name: "Kitchen Operations",
    category: "culinary",
    categoryLabel: "Culinary",
    shortDesc:
      "Pusat kegiatan dapur keluarga yang menghimpun koleksi resep masakan harian maupun resep kuliner warisan turun-temurun.",
    to: "/recipes",
    icon: Utensils,
    badge: "Culinary",
    accentGradient: "from-orange-500 to-red-600",
    accentBorder: "border-orange-500/30 hover:border-orange-500/60",
    badgeBg: "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/30",
    badgeText: "Culinary",
    subMenus: [
      { id: "recipes-catalog", label: "Recipe Collection", to: "/recipes", inverted: false, componentCategory: "Records" },
      { id: "family-recipes", label: "Family Recipes", to: "/peh/family-recipes", inverted: false, componentCategory: "Templates" },
    ],
  },
  {
    id: "meal-planning",
    name: "Food Planning",
    category: "culinary",
    categoryLabel: "Culinary",
    shortDesc:
      "Perencanaan menu makan mingguan keluarga agar gizi seimbang terjaga, persiapan bahan terukur, dan pemborosan makanan berkurang.",
    to: "/household-planning-and-family-records?module=meal-planning",
    icon: CalendarDays,
    badge: "Culinary",
    accentGradient: "from-amber-500 to-yellow-600",
    accentBorder: "border-amber-500/30 hover:border-amber-500/60",
    badgeBg: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    badgeText: "Culinary",
    subMenus: [
      { id: "weekly-meal-planner", label: "Weekly Meal Planner", to: "", componentCategory: "Workflows" },
    ],
  },
  {
    id: "food-and-grocery-inventory",
    name: "Food Supply",
    category: "culinary",
    categoryLabel: "Culinary",
    shortDesc:
      "Inventarisasi stok bahan makanan di pantry dan kulkas, pelacakan masa kedaluwarsa pangan, serta daftar belanja kebutuhan dapur keluarga.",
    to: "/peh/pantry",
    icon: ShoppingCart,
    badge: "Culinary",
    accentGradient: "from-emerald-500 to-lime-600",
    accentBorder: "border-emerald-500/30 hover:border-emerald-500/60",
    badgeBg: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    badgeText: "Culinary",
    subMenus: [
      { id: "pantry-inventory", label: "Pantry Inventory", to: "/peh/pantry", inverted: false, componentCategory: "Records" },
      { id: "grocery-list", label: "Grocery List", to: "/shopping", inverted: false, componentCategory: "Tools" },
      { id: "food-stock-tracker", label: "Food Stock Tracker", to: "", componentCategory: "Records" },
    ],
  },

  // ============================================================================
  // 6. Safety (3 Modul)
  // ============================================================================
  {
    id: "family-safety",
    name: "Family Security",
    category: "safety",
    categoryLabel: "Safety",
    shortDesc:
      "Direktori kontak darurat terpadu (dokter, rumah sakit, pemadam, keamanan lingkungan) serta pengamanan keselamatan anggota keluarga.",
    to: "/lainnya?app=emergency-hub",
    icon: ShieldAlert,
    badge: "Safety",
    accentGradient: "from-red-500 to-rose-600",
    accentBorder: "border-red-500/30 hover:border-red-500/60",
    badgeBg: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30",
    badgeText: "Safety",
    subMenus: [
      { id: "emergency-contacts", label: "Emergency Contacts", to: "/lainnya?app=emergency-hub", inverted: false, componentCategory: "Records" },
    ],
  },
  {
    id: "family-health-records",
    name: "Family Health",
    category: "safety",
    categoryLabel: "Safety",
    shortDesc:
      "Rekam medis terpusat anggota keluarga meliputi golongan darah, riwayat alergi, imunisasi anak, serta lini masa perawatan kesehatan keluarga.",
    to: "/peh/family-health",
    icon: HeartPulse,
    badge: "Safety",
    accentGradient: "from-rose-500 to-red-600",
    accentBorder: "border-rose-500/30 hover:border-rose-500/60",
    badgeBg: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
    badgeText: "Safety",
    subMenus: [
      { id: "family-health", label: "Family Health Records", to: "/peh/family-health", inverted: false, componentCategory: "Records" },
      { id: "family-care-timeline", label: "Family Care Timeline", to: "", componentCategory: "Records" },
    ],
  },
  {
    id: "emergency-preparedness",
    name: "Emergency Planning",
    category: "safety",
    categoryLabel: "Safety",
    shortDesc:
      "Panduan kesiapsiagaan bencana rumah tangga, checklist tas siaga darurat, serta protokol evakuasi dan titik kumpul keluarga.",
    to: "/lainnya?app=disaster-prep",
    icon: ShieldCheck,
    badge: "Safety",
    accentGradient: "from-orange-500 to-red-600",
    accentBorder: "border-orange-500/30 hover:border-orange-500/60",
    badgeBg: "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/30",
    badgeText: "Safety",
    subMenus: [
      { id: "disaster-prep", label: "Emergency Preparedness", to: "/lainnya?app=disaster-prep", inverted: false, componentCategory: "Guides" },
      { id: "emergency-response-plan", label: "Emergency Response Plan", to: "", componentCategory: "Guides" },
    ],
  },

  // ============================================================================
  // 7. Mobility (3 Modul)
  // ============================================================================
  {
    id: "vehicle-records",
    name: "Vehicle Records",
    category: "mobility",
    categoryLabel: "Mobility",
    shortDesc:
      "Registri identitas kendaraan keluarga beserta dokumen legalitas kepemilikan seperti STNK, BPKB, nomor rangka/mesin, dan masa pajak.",
    to: "/peh/vehicles",
    icon: Car,
    badge: "Mobility",
    accentGradient: "from-blue-500 to-indigo-600",
    accentBorder: "border-blue-500/30 hover:border-blue-500/60",
    badgeBg: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
    badgeText: "Mobility",
    subMenus: [
      { id: "vehicle-identity", label: "Vehicle Registry", to: "/peh/vehicles", inverted: false, componentCategory: "Records" },
    ],
  },
  {
    id: "vehicle-maintenance",
    name: "Vehicle Maintenance",
    category: "mobility",
    categoryLabel: "Mobility",
    shortDesc:
      "Pemantauan jarak tempuh dan konsumsi bahan bakar, otomatisasi jadwal servis berkala, serta pelacakan histori bengkel dan penggantian suku cadang.",
    to: "/lainnya?app=mileage-fuel",
    icon: Fuel,
    badge: "Mobility",
    accentGradient: "from-indigo-500 to-blue-600",
    accentBorder: "border-indigo-500/30 hover:border-indigo-500/60",
    badgeBg: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    badgeText: "Mobility",
    subMenus: [
      { id: "mileage-fuel", label: "Fuel Mileage Log", to: "/lainnya?app=mileage-fuel", inverted: false, componentCategory: "Records" },
      { id: "service-schedule", label: "Vehicle Maintenance Schedule", to: "/lainnya?app=vehicle-service", inverted: false, componentCategory: "Automations" },
      { id: "vehicle-service-tracker", label: "Vehicle Service Tracker", to: "", componentCategory: "Records" },
    ],
  },
  {
    id: "mobility-planning",
    name: "Family Mobility",
    category: "mobility",
    categoryLabel: "Mobility",
    shortDesc:
      "Koordinasi jadwal penggunaan kendaraan bersama, rencana antar-jemput sekolah dan aktivitas rutin, serta logistik transportasi keluarga.",
    to: "/household-planning-and-family-records?module=mobility-planning",
    icon: Compass,
    badge: "Mobility",
    accentGradient: "from-sky-500 to-indigo-600",
    accentBorder: "border-sky-500/30 hover:border-sky-500/60",
    badgeBg: "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30",
    badgeText: "Mobility",
    subMenus: [
      { id: "family-mobility-planner", label: "Family Mobility Planner", to: "", componentCategory: "Workflows" },
      { id: "mobility-forecast", label: "Mobility Forecast", to: "/weather", inverted: false, componentCategory: "Dashboards" },
    ],
  },

  // ============================================================================
  // 8. Administration (3 Modul)
  // ============================================================================
  {
    id: "family-documents",
    name: "Family Documents",
    category: "administration",
    categoryLabel: "Administration",
    shortDesc:
      "Brankas penyimpanan dokumen resmi keluarga bersama seperti Kartu Keluarga, akta nikah, akta kelahiran anak, dan polis asuransi rumah tangga.",
    to: "/household-planning-and-family-records?module=family-documents",
    icon: FileCheck,
    badge: "Administration",
    accentGradient: "from-violet-500 to-purple-600",
    accentBorder: "border-violet-500/30 hover:border-violet-500/60",
    badgeBg: "bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/30",
    badgeText: "Administration",
    subMenus: [
      { id: "family-document-vault", label: "Family Document Vault", to: "", componentCategory: "Records" },
    ],
  },
  {
    id: "family-calendar",
    name: "Family Scheduling",
    category: "administration",
    categoryLabel: "Administration",
    shortDesc:
      "Kalender bersama keluarga untuk menyelaraskan agenda sekolah anak, acara keluarga besar, hari penting, dan jadwal liburan bersama.",
    to: "/household-planning-and-family-records?module=family-calendar",
    icon: CalendarRange,
    badge: "Administration",
    accentGradient: "from-purple-500 to-indigo-600",
    accentBorder: "border-purple-500/30 hover:border-purple-500/60",
    badgeBg: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
    badgeText: "Administration",
    subMenus: [
      { id: "shared-family-calendar", label: "Shared Family Calendar", to: "", componentCategory: "Workflows" },
    ],
  },
  {
    id: "family-archives",
    name: "Family Archives",
    category: "administration",
    categoryLabel: "Administration",
    shortDesc:
      "Perpustakaan arsip kenangan keluarga, album dokumentasi momen penting lintas tahun, serta rekaman pencapaian bersejarah rumah tangga.",
    to: "/household-planning-and-family-records?module=family-archives",
    icon: Archive,
    badge: "Administration",
    accentGradient: "from-indigo-500 to-violet-600",
    accentBorder: "border-indigo-500/30 hover:border-indigo-500/60",
    badgeBg: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    badgeText: "Administration",
    subMenus: [
      { id: "family-archive-library", label: "Family Archive Library", to: "", componentCategory: "Records" },
    ],
  },
];

export const FAMILY_CATEGORY_TABS: {
  id: FamilyCategory;
  label: string;
  count: number;
}[] = [
  { id: "all", label: "Semua", count: FAMILY_HOUSEHOLD_APPS.length },
  {
    id: "family",
    label: "Family",
    count: FAMILY_HOUSEHOLD_APPS.filter((a) => a.category === "family").length,
  },
  {
    id: "operations",
    label: "Operations",
    count: FAMILY_HOUSEHOLD_APPS.filter((a) => a.category === "operations").length,
  },
  {
    id: "finance",
    label: "Finance",
    count: FAMILY_HOUSEHOLD_APPS.filter((a) => a.category === "finance").length,
  },
  {
    id: "property",
    label: "Property",
    count: FAMILY_HOUSEHOLD_APPS.filter((a) => a.category === "property").length,
  },
  {
    id: "culinary",
    label: "Culinary",
    count: FAMILY_HOUSEHOLD_APPS.filter((a) => a.category === "culinary").length,
  },
  {
    id: "safety",
    label: "Safety",
    count: FAMILY_HOUSEHOLD_APPS.filter((a) => a.category === "safety").length,
  },
  {
    id: "mobility",
    label: "Mobility",
    count: FAMILY_HOUSEHOLD_APPS.filter((a) => a.category === "mobility").length,
  },
  {
    id: "administration",
    label: "Administration",
    count: FAMILY_HOUSEHOLD_APPS.filter((a) => a.category === "administration").length,
  },
];

export const FAMILY_TOTAL_MODULES = FAMILY_HOUSEHOLD_APPS.length;
export const FAMILY_TOOLS_COUNT = FAMILY_HOUSEHOLD_APPS.reduce(
  (sum, app) => sum + app.subMenus.filter((s) => s.componentCategory === "Tools").length,
  0
);
export const FAMILY_FEATURES_COUNT = FAMILY_HOUSEHOLD_APPS.reduce(
  (sum, app) => sum + app.subMenus.filter((s) => s.componentCategory !== "Tools").length,
  0
);
export const FAMILY_TOTAL_BADGE = `${FAMILY_TOTAL_MODULES} Modul • ${FAMILY_FEATURES_COUNT} Features • ${FAMILY_TOOLS_COUNT} Tools`;
syncLauncherPageBadge("mode_family", FAMILY_TOTAL_BADGE);
export const FAMILY_SUMMARY_DESC = FAMILY_CATEGORY_TABS.filter((t) => t.id !== "all")
  .map((t) => `${t.label} (${t.count})`)
  .join(" · ");

export function FamilyRecordsHouseholdPage({
  isEmbedded: _isEmbedded = false,
}: {
  isEmbedded?: boolean;
} = {}) {
  const [selectedCategory, setSelectedCategory] = useState<FamilyCategory>(() => {
    if (typeof window !== "undefined") {
      try {
        const params = new URLSearchParams(window.location.search);
        const cat = params.get("category") || params.get("pill");
        if (cat) return normalizeFamilyCategory(cat);
      } catch {}
    }
    return "all";
  });
  const [searchQuery, setSearchQuery] = useState("");
  const { isFavorite, toggleFavorite } = useFavorites();
  const pageId = useCurrentLauncherPage("mode_family") || "mode_family";
  const { getPageCountDelta, getCardsMovedIntoPage } = useCardPageMover();
  const { pinnedList } = usePinnedCards(pageId);

  const filteredApps = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = FAMILY_HOUSEHOLD_APPS.filter((app) => {
      const matchCategory =
        selectedCategory === "all" || app.category === selectedCategory;
      const matchSearch =
        q === "" ||
        app.name.toLowerCase().includes(q) ||
        app.shortDesc.toLowerCase().includes(q) ||
        app.categoryLabel.toLowerCase().includes(q) ||
        app.badge.toLowerCase().includes(q) ||
        app.subMenus.some((sub) =>
          sub.label.toLowerCase().includes(q)
        );
      return matchCategory && matchSearch;
    });
    return sortCardsWithPinned(list, (app) => app.to || app.name, pinnedList);
  }, [selectedCategory, searchQuery, pinnedList]);

  return (
    <LauncherPageProvider pageId={pageId}>
    <div className="w-full flex-1 flex flex-col font-sans pb-16">
      <ShellHeader>
        <HeaderNavPills
          items={adjustCategoryTabsCount(FAMILY_CATEGORY_TABS, getPageCountDelta(pageId))}
          activeId={selectedCategory}
          onSelect={(id) => setSelectedCategory(id as FamilyCategory)}
        />
      </ShellHeader>

      <div className="w-full mx-auto pt-3 sm:pt-4 space-y-3 sm:space-y-4">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground/90 tracking-tight flex items-center justify-center gap-2.5">
            <span>Household Planning <span className="font-normal">and</span> Family Records</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5 sm:gap-5">
          {filteredApps.map((app) => (
            <MBACard
              key={app.id}
              title={app.name}
              to={app.to}
              icon={app.icon}
              badge={app.badgeText}
              shortDesc={app.shortDesc}
              accentGradient={app.accentGradient}
              features={app.subMenus.map((sub) => ({
                title: sub.label,
                to: sub.to ?? app.to,
                inverted: sub.inverted,
              }))}
              categoryGroups={buildModuleCategoryGroups(app.subMenus, app.to)}
              isFav={isFavorite(app.to)}
              toggleFavorite={toggleFavorite}
            />
          ))}
          {selectedCategory === "all" && (
            <MovedCardsGridItems pageId={pageId} searchQuery={searchQuery} />
          )}
        </div>

        {filteredApps.length === 0 &&
          (selectedCategory !== "all" || getCardsMovedIntoPage(pageId).length === 0) && (
          <div className="text-center py-16 rounded-3xl border border-dashed border-border p-8 bg-card/40">
            <Search className="size-8 text-muted-foreground mx-auto mb-3 opacity-60" />
            <h3 className="text-base font-semibold text-foreground">
              Tidak ada modul keluarga ditemukan
            </h3>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-xl text-xs font-semibold transition-colors"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </div>
    </LauncherPageProvider>
  );
}
