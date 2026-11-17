import React, { useState, useMemo, useEffect } from "react";
import { useFavorites } from "@/hooks/useFavorites";
import { HeaderNavPills, ShellHeader } from "@/app/shell-header";
import {
  STANDALONE_MBA_APPS,
  ToolsFlipCard,
  getToolsGradient,
} from "@/features/launcher/Tools100Section";
import { MBACard } from "@/components/common/MBACard";
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
  Truck,
  Package,
  Briefcase,
  MessagesSquare,
  Clock,
  Receipt,
  LineChart,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Store,
  FileCheck,
  Award,
  UserCheck,
  Grid2X2,
  CalendarDays,
  Layers,
  Building,
  Building2,
} from "lucide-react";

export type BizOpsCategory =
  | "all"
  | "strategy"
  | "operations"
  | "commercial"
  | "resources"
  | "administration"
  | "people"
  | "governance";

const LEGACY_BIZ_OPS_CATEGORY_MAP: Record<string, BizOpsCategory> = {
  supply: "operations",
  customers: "commercial",
  "back-office": "administration",
  innovation: "strategy",
  organization: "people",
};

export function normalizeBizOpsCategory(raw?: string | null): BizOpsCategory {
  if (!raw) return "all";
  const key = raw.trim().toLowerCase();
  if (
    key === "all" ||
    key === "strategy" ||
    key === "operations" ||
    key === "commercial" ||
    key === "resources" ||
    key === "administration" ||
    key === "people" ||
    key === "governance"
  ) {
    return key;
  }
  return LEGACY_BIZ_OPS_CATEGORY_MAP[key] ?? "all";
}

export interface BizOpsSubMenu {
  id: string;
  label: string;
  to: string;
}

export type ModuleComponentCategory =
  | "Features"
  | "Tools"
  | "Dashboards"
  | "Workflows"
  | "Automations"
  | "Templates"
  | "Analytics"
  | "Records"
  | "Settings"
  | "Guides";

export interface BizOpsComponentGroup {
  category: ModuleComponentCategory;
  items: BizOpsSubMenu[];
}

export interface BizOpsAppItem {
  id: string;
  name: string;
  category: Exclude<BizOpsCategory, "all">;
  categoryLabel: string;
  shortDesc: string;
  to: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  badge: string;
  accentGradient: string;
  accentBorder: string;
  badgeBg: string;
  badgeText: string;
  features: BizOpsSubMenu[];
  tools: BizOpsSubMenu[];
  componentGroups: BizOpsComponentGroup[];
  subMenus: BizOpsSubMenu[];
}

export const BIZ_OPS_APPS: BizOpsAppItem[] = [
  // ============================================================================
  // 1. Operations (5 Apps)
  // ============================================================================
  {
    id: "vendor-management",
    name: "Vendor Management",
    category: "operations",
    categoryLabel: "Operations",
    shortDesc:
      "Direktori menyeluruh vendor dan mitra bisnis eksternal serta evaluasi SLA kinerja kontrak kerja sama.",
    to: "/peh/vendors",
    icon: Building2,
    badge: "Operations",
    accentGradient: "from-amber-500 to-orange-600",
    accentBorder: "border-amber-500/30 hover:border-amber-500/60",
    badgeBg: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    badgeText: "Operations",
    features: [
      { id: "vendor-directory", label: "Vendor Directory", to: "/peh/vendors" },
      { id: "sla-evaluation", label: "SLA Evaluation", to: "/resource-manager" },
    ],
    tools: [],
    componentGroups: [
      {
        category: "Features",
        items: [
          { id: "sla-evaluation", label: "SLA Evaluation", to: "/resource-manager" },
        ],
      },
      {
        category: "Records",
        items: [
          { id: "vendor-directory", label: "Vendor Directory", to: "/peh/vendors" },
        ],
      },
    ],
    subMenus: [
      { id: "vendor-directory", label: "Vendor Directory", to: "/peh/vendors" },
      { id: "sla-evaluation", label: "SLA Evaluation", to: "/resource-manager" },
    ],
  },
  {
    id: "vendors-and-procurement",
    name: "Procurement Management",
    category: "operations",
    categoryLabel: "Operations",
    shortDesc:
      "Katalog penawaran produk terstruktur, persetujuan pengadaan purchase orders (PO), dan alur approval permintaan belanja.",
    to: "/peh/procurement",
    icon: Truck,
    badge: "Operations",
    accentGradient: "from-amber-500 to-orange-600",
    accentBorder: "border-amber-500/30 hover:border-amber-500/60",
    badgeBg: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    badgeText: "Operations",
    features: [
      { id: "product-catalog", label: "Product Catalog", to: "/katalog-produk" },
    ],
    tools: [
      { id: "procurement", label: "Purchase Orders", to: "/peh/procurement" },
      { id: "approval-requests", label: "Approval Requests", to: "/approval-manager" },
    ],
    componentGroups: [
      {
        category: "Workflows",
        items: [
          { id: "procurement", label: "Purchase Orders", to: "/peh/procurement" },
          { id: "approval-requests", label: "Approval Requests", to: "/approval-manager" },
        ],
      },
      {
        category: "Records",
        items: [
          { id: "product-catalog", label: "Product Catalog", to: "/katalog-produk" },
        ],
      },
    ],
    subMenus: [
      { id: "product-catalog", label: "Product Catalog", to: "/katalog-produk" },
      { id: "procurement", label: "Purchase Orders", to: "/peh/procurement" },
      { id: "approval-requests", label: "Approval Requests", to: "/approval-manager" },
    ],
  },
  {
    id: "products-and-stock",
    name: "Inventory Management",
    category: "operations",
    categoryLabel: "Operations",
    shortDesc:
      "Pengendalian inventaris stok pergudangan, pelacakan lot batch, dan pemantauan rantai dingin (cold chain).",
    to: "/inventory",
    icon: Package,
    badge: "Operations",
    accentGradient: "from-cyan-500 to-blue-600",
    accentBorder: "border-cyan-500/30 hover:border-cyan-500/60",
    badgeBg: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
    badgeText: "Operations",
    features: [
      { id: "inventory", label: "Inventory", to: "/inventory" },
    ],
    tools: [
      { id: "batch-track", label: "Batch Track", to: "/lainnya?app=batch-track" },
      { id: "cold-chain", label: "Cold Chain", to: "/lainnya?app=cold-chain" },
    ],
    componentGroups: [
      {
        category: "Features",
        items: [
          { id: "inventory", label: "Inventory", to: "/inventory" },
        ],
      },
      {
        category: "Tools",
        items: [
          { id: "batch-track", label: "Batch Track", to: "/lainnya?app=batch-track" },
        ],
      },
      {
        category: "Dashboards",
        items: [
          { id: "cold-chain", label: "Cold Chain", to: "/lainnya?app=cold-chain" },
        ],
      },
    ],
    subMenus: [
      { id: "inventory", label: "Inventory", to: "/inventory" },
      { id: "batch-track", label: "Batch Track", to: "/lainnya?app=batch-track" },
      { id: "cold-chain", label: "Cold Chain", to: "/lainnya?app=cold-chain" },
    ],
  },
  {
    id: "quality-control",
    name: "Quality Control",
    category: "operations",
    categoryLabel: "Operations",
    shortDesc:
      "Pemeriksaan standar mutu operasional harian dan pengelolaan meja tiket penyelesaian masalah.",
    to: "/lainnya?app=quality-check",
    icon: ShieldCheck,
    badge: "Operations",
    accentGradient: "from-orange-500 to-red-600",
    accentBorder: "border-orange-500/30 hover:border-orange-500/60",
    badgeBg: "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/30",
    badgeText: "Operations",
    features: [],
    tools: [
      { id: "quality-check", label: "Quality Check", to: "/lainnya?app=quality-check" },
      { id: "ticket-desk", label: "Ticket Desk", to: "/lainnya?app=ticket-desk" },
    ],
    componentGroups: [
      {
        category: "Tools",
        items: [
          { id: "quality-check", label: "Quality Check", to: "/lainnya?app=quality-check" },
        ],
      },
      {
        category: "Workflows",
        items: [
          { id: "ticket-desk", label: "Ticket Desk", to: "/lainnya?app=ticket-desk" },
        ],
      },
    ],
    subMenus: [
      { id: "quality-check", label: "Quality Check", to: "/lainnya?app=quality-check" },
      { id: "ticket-desk", label: "Ticket Desk", to: "/lainnya?app=ticket-desk" },
    ],
  },
  {
    id: "workplace-safety",
    name: "Workplace Safety",
    category: "operations",
    categoryLabel: "Operations",
    shortDesc:
      "Pemantauan keselamatan dan kesehatan kerja tim operasional serta pencatatan log insiden lapangan.",
    to: "/peh/compliance",
    icon: ShieldAlert,
    badge: "Operations",
    accentGradient: "from-red-500 to-rose-600",
    accentBorder: "border-red-500/30 hover:border-red-500/60",
    badgeBg: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30",
    badgeText: "Operations",
    features: [
      { id: "keselamatan-kerja", label: "Keselamatan Kerja", to: "/peh/compliance" },
      { id: "incident-log", label: "Incident Log", to: "/lainnya?app=incident-log" },
    ],
    tools: [],
    componentGroups: [
      {
        category: "Features",
        items: [
          { id: "keselamatan-kerja", label: "Keselamatan Kerja", to: "/peh/compliance" },
        ],
      },
      {
        category: "Records",
        items: [
          { id: "incident-log", label: "Incident Log", to: "/lainnya?app=incident-log" },
        ],
      },
    ],
    subMenus: [
      { id: "keselamatan-kerja", label: "Keselamatan Kerja", to: "/peh/compliance" },
      { id: "incident-log", label: "Incident Log", to: "/lainnya?app=incident-log" },
    ],
  },

  // ============================================================================
  // 3. Commercial (2 Apps)
  // ============================================================================
  {
    id: "client-records",
    name: "Client Management",
    category: "commercial",
    categoryLabel: "Commercial",
    shortDesc:
      "Direktori profil klien korporasi, relasi klien dan mitra usaha (partner), serta pengelolaan kontak relasi (CRM).",
    to: "/klien",
    icon: Briefcase,
    badge: "Commercial",
    accentGradient: "from-blue-500 to-indigo-600",
    accentBorder: "border-blue-500/30 hover:border-blue-500/60",
    badgeBg: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
    badgeText: "Commercial",
    features: [
      { id: "clients-directory", label: "Client Directory", to: "/klien" },
      { id: "klien-dan-partner", label: "Klien dan Partner", to: "/klien" },
    ],
    tools: [
      { id: "contacts-crm", label: "Contact Management", to: "/contacts" },
    ],
    componentGroups: [
      {
        category: "Features",
        items: [
          { id: "contacts-crm", label: "Contact Management", to: "/contacts" },
        ],
      },
      {
        category: "Records",
        items: [
          { id: "clients-directory", label: "Client Directory", to: "/klien" },
          { id: "klien-dan-partner", label: "Klien dan Partner", to: "/klien" },
        ],
      },
    ],
    subMenus: [
      { id: "clients-directory", label: "Client Directory", to: "/klien" },
      { id: "klien-dan-partner", label: "Klien dan Partner", to: "/klien" },
      { id: "contacts-crm", label: "Contact Management", to: "/contacts" },
    ],
  },
  {
    id: "client-communications",
    name: "Client Communications",
    category: "commercial",
    categoryLabel: "Commercial",
    shortDesc:
      "Portal kolaborasi klien, saluran pesan terintegrasi, riwayat log interaksi, dan pengumpulan umpan balik kepuasan.",
    to: "/portal",
    icon: MessagesSquare,
    badge: "Commercial",
    accentGradient: "from-violet-500 to-purple-600",
    accentBorder: "border-violet-500/30 hover:border-violet-500/60",
    badgeBg: "bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/30",
    badgeText: "Commercial",
    features: [
      { id: "collab-portal", label: "Client Portal", to: "/portal" },
      { id: "client-messages", label: "Client Messaging", to: "/portal/pesan" },
    ],
    tools: [
      { id: "interaction-manager", label: "Interaction Log", to: "/interaction-manager" },
      { id: "feedback-loop", label: "Client Feedback", to: "/lainnya?app=feedback-loop" },
    ],
    componentGroups: [
      {
        category: "Features",
        items: [
          { id: "collab-portal", label: "Client Portal", to: "/portal" },
          { id: "client-messages", label: "Client Messaging", to: "/portal/pesan" },
        ],
      },
      {
        category: "Analytics",
        items: [
          { id: "feedback-loop", label: "Client Feedback", to: "/lainnya?app=feedback-loop" },
        ],
      },
      {
        category: "Records",
        items: [
          { id: "interaction-manager", label: "Interaction Log", to: "/interaction-manager" },
        ],
      },
    ],
    subMenus: [
      { id: "collab-portal", label: "Client Portal", to: "/portal" },
      { id: "client-messages", label: "Client Messaging", to: "/portal/pesan" },
      { id: "interaction-manager", label: "Interaction Log", to: "/interaction-manager" },
      { id: "feedback-loop", label: "Client Feedback", to: "/lainnya?app=feedback-loop" },
    ],
  },
  {
    id: "service-scheduling",
    name: "Service Scheduling",
    category: "commercial",
    categoryLabel: "Commercial",
    shortDesc:
      "Pengaturan antrean layanan pelanggan, reservasi jadwal konsultasi, serta pencatatan buku tamu kunjungan.",
    to: "/lainnya?app=queue-line",
    icon: CalendarDays,
    badge: "Commercial",
    accentGradient: "from-sky-500 to-indigo-600",
    accentBorder: "border-sky-500/30 hover:border-sky-500/60",
    badgeBg: "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30",
    badgeText: "Commercial",
    features: [
      { id: "visitor-log", label: "Visitor Records", to: "/lainnya?app=visitor-log" },
    ],
    tools: [
      { id: "queue-line", label: "Queue Management", to: "/lainnya?app=queue-line" },
      { id: "book-slot", label: "Appointment Booking", to: "/lainnya?app=book-slot" },
    ],
    componentGroups: [
      {
        category: "Workflows",
        items: [
          { id: "queue-line", label: "Queue Management", to: "/lainnya?app=queue-line" },
          { id: "book-slot", label: "Appointment Booking", to: "/lainnya?app=book-slot" },
        ],
      },
      {
        category: "Records",
        items: [
          { id: "visitor-log", label: "Visitor Records", to: "/lainnya?app=visitor-log" },
        ],
      },
    ],
    subMenus: [
      { id: "queue-line", label: "Queue Management", to: "/lainnya?app=queue-line" },
      { id: "book-slot", label: "Appointment Booking", to: "/lainnya?app=book-slot" },
      { id: "visitor-log", label: "Visitor Records", to: "/lainnya?app=visitor-log" },
    ],
  },
  {
    id: "commercial-services",
    name: "Commercial Services",
    category: "commercial",
    categoryLabel: "Commercial",
    shortDesc:
      "Administrasi pesanan klien, daftar tarif layanan baku, program poin loyalitas, dan pengelolaan keanggotaan.",
    to: "/lainnya?app=client-orders",
    icon: Store,
    badge: "Commercial",
    accentGradient: "from-emerald-500 to-teal-600",
    accentBorder: "border-emerald-500/30 hover:border-emerald-500/60",
    badgeBg: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    badgeText: "Commercial",
    features: [
      { id: "loyalty-point", label: "Loyalty Program", to: "/lainnya?app=loyalty-point" },
      { id: "membership-card", label: "Membership Management", to: "/lainnya?app=membership-card" },
      { id: "client-orders", label: "Client Orders", to: "/lainnya?app=client-orders" },
    ],
    tools: [
      { id: "service-rates", label: "Service Rates", to: "/lainnya?app=services-ratecard" },
    ],
    componentGroups: [
      {
        category: "Features",
        items: [
          { id: "loyalty-point", label: "Loyalty Program", to: "/lainnya?app=loyalty-point" },
          { id: "membership-card", label: "Membership Management", to: "/lainnya?app=membership-card" },
        ],
      },
      {
        category: "Templates",
        items: [
          { id: "service-rates", label: "Service Rates", to: "/lainnya?app=services-ratecard" },
        ],
      },
      {
        category: "Records",
        items: [
          { id: "client-orders", label: "Client Orders", to: "/lainnya?app=client-orders" },
        ],
      },
    ],
    subMenus: [
      { id: "client-orders", label: "Client Orders", to: "/lainnya?app=client-orders" },
      { id: "service-rates", label: "Service Rates", to: "/lainnya?app=services-ratecard" },
      { id: "loyalty-point", label: "Loyalty Program", to: "/lainnya?app=loyalty-point" },
      { id: "membership-card", label: "Membership Management", to: "/lainnya?app=membership-card" },
    ],
  },

  // ============================================================================
  // 4. Resources (3 Apps)
  // ============================================================================
  {
    id: "expense-control",
    name: "Expense Control",
    category: "resources",
    categoryLabel: "Resources",
    shortDesc:
      "Pelacakan pos pengeluaran operasional usaha, pengelolaan PPN dan pajak usaha, serta pemantauan langganan layanan berkala.",
    to: "/expense-tracker",
    icon: Receipt,
    badge: "Resources",
    accentGradient: "from-rose-500 to-pink-600",
    accentBorder: "border-rose-500/30 hover:border-rose-500/60",
    badgeBg: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
    badgeText: "Resources",
    features: [],
    tools: [
      { id: "expense-tracker", label: "Expense Tracker", to: "/expense-tracker" },
      { id: "subscription-manager", label: "Subscription Manager", to: "/subscription-manager" },
      { id: "vat-and-other-taxes", label: "VAT and Other Taxes", to: "/pajak?app=ppn" },
    ],
    componentGroups: [
      {
        category: "Tools",
        items: [
          { id: "expense-tracker", label: "Expense Tracker", to: "/expense-tracker" },
          { id: "vat-and-other-taxes", label: "VAT and Other Taxes", to: "/pajak?app=ppn" },
        ],
      },
      {
        category: "Automations",
        items: [
          { id: "subscription-manager", label: "Subscription Manager", to: "/subscription-manager" },
        ],
      },
    ],
    subMenus: [
      { id: "expense-tracker", label: "Expense Tracker", to: "/expense-tracker" },
      { id: "vat-and-other-taxes", label: "VAT and Other Taxes", to: "/pajak?app=ppn" },
      { id: "subscription-manager", label: "Subscription Manager", to: "/subscription-manager" },
    ],
  },
  {
    id: "asset-management",
    name: "Asset Management",
    category: "resources",
    categoryLabel: "Resources",
    shortDesc:
      "Inventarisasi aset fasilitas kantor, peralatan kerja, serta alokasi kapasitas sumber daya operasional.",
    to: "/asset-manager",
    icon: Layers,
    badge: "Resources",
    accentGradient: "from-amber-500 to-rose-600",
    accentBorder: "border-amber-500/30 hover:border-amber-500/60",
    badgeBg: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    badgeText: "Resources",
    features: [
      { id: "asset-manager", label: "Asset Manager", to: "/asset-manager" },
      { id: "resource-manager", label: "Resource Manager", to: "/resource-manager" },
    ],
    tools: [],
    componentGroups: [
      {
        category: "Features",
        items: [
          { id: "resource-manager", label: "Resource Manager", to: "/resource-manager" },
        ],
      },
      {
        category: "Records",
        items: [
          { id: "asset-manager", label: "Asset Manager", to: "/asset-manager" },
        ],
      },
    ],
    subMenus: [
      { id: "asset-manager", label: "Asset Manager", to: "/asset-manager" },
      { id: "resource-manager", label: "Resource Manager", to: "/resource-manager" },
    ],
  },
  {
    id: "business-valuation-mappi",
    name: "Business Valuation",
    category: "resources",
    categoryLabel: "Resources",
    shortDesc:
      "Instrumen valuasi perusahaan terstandar MAPPI: Discounted Cash Flow (DCF), Multiples (PBV, PER, EV/EBITDA), dan Asset-Based Approach.",
    to: "/valuasi",
    icon: Building,
    badge: "Resources",
    accentGradient: "from-emerald-500 to-teal-600",
    accentBorder: "border-emerald-500/30 hover:border-emerald-500/60",
    badgeBg: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    badgeText: "Resources",
    features: [],
    tools: [
      { id: "valuasi-dcf", label: "DCF Valuation", to: "/valuasi" },
      { id: "valuasi-multiples", label: "Market Multiples", to: "/valuasi" },
      { id: "valuasi-asset", label: "Asset-Based Valuation", to: "/valuasi" },
    ],
    componentGroups: [
      {
        category: "Tools",
        items: [
          { id: "valuasi-dcf", label: "DCF Valuation", to: "/valuasi" },
          { id: "valuasi-asset", label: "Asset-Based Valuation", to: "/valuasi" },
        ],
      },
      {
        category: "Analytics",
        items: [
          { id: "valuasi-multiples", label: "Market Multiples", to: "/valuasi" },
        ],
      },
    ],
    subMenus: [
      { id: "valuasi-dcf", label: "DCF Valuation", to: "/valuasi" },
      { id: "valuasi-multiples", label: "Market Multiples", to: "/valuasi" },
      { id: "valuasi-asset", label: "Asset-Based Valuation", to: "/valuasi" },
    ],
  },
  // ============================================================================
  // 5. Administration (1 App)
  // ============================================================================
  {
    id: "documents-and-correspondence",
    name: "Document Management",
    category: "administration",
    categoryLabel: "Administration",
    shortDesc:
      "Buku agenda surat-menyurat korporat, pustaka template dokumen kerja, manajemen format baku, formulir administrasi digital, serta panduan SOP Guidelines.",
    to: "/lainnya?app=mailroom",
    icon: FileCheck,
    badge: "Administration",
    accentGradient: "from-sky-500 to-teal-600",
    accentBorder: "border-sky-500/30 hover:border-sky-500/60",
    badgeBg: "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30",
    badgeText: "Administration",
    features: [
      { id: "letter-log", label: "Correspondence Log", to: "/lainnya?app=mailroom" },
      { id: "template-dokumen-kerja", label: "Document Templates", to: "/lainnya?app=templates" },
      { id: "sop", label: "SOP Guidelines", to: "/lainnya?app=sop" },
    ],
    tools: [
      { id: "template-manager", label: "Template Manager", to: "/template-manager" },
      { id: "forms", label: "Forms", to: "/forms" },
    ],
    componentGroups: [
      {
        category: "Tools",
        items: [
          { id: "forms", label: "Forms", to: "/forms" },
        ],
      },
      {
        category: "Templates",
        items: [
          { id: "template-dokumen-kerja", label: "Document Templates", to: "/lainnya?app=templates" },
          { id: "template-manager", label: "Template Manager", to: "/template-manager" },
        ],
      },
      {
        category: "Records",
        items: [
          { id: "letter-log", label: "Correspondence Log", to: "/lainnya?app=mailroom" },
        ],
      },
      {
        category: "Guides",
        items: [
          { id: "sop", label: "SOP Guidelines", to: "/lainnya?app=sop" },
        ],
      },
    ],
    subMenus: [
      { id: "letter-log", label: "Correspondence Log", to: "/lainnya?app=mailroom" },
      { id: "template-dokumen-kerja", label: "Document Templates", to: "/lainnya?app=templates" },
      { id: "template-manager", label: "Template Manager", to: "/template-manager" },
      { id: "forms", label: "Forms", to: "/forms" },
      { id: "sop", label: "SOP Guidelines", to: "/lainnya?app=sop" },
    ],
  },

  // ============================================================================
  // 4. Strategy (2 Apps)
  // ============================================================================
  {
    id: "goals-and-performance",
    name: "Performance Management",
    category: "strategy",
    categoryLabel: "Strategy",
    shortDesc:
      "Penyelarasan sasaran strategis perusahaan (OKR/KPI), evaluasi retrospektif tim, statistik kinerja operasional, pencarian arsip terpadu, direktori matriks hak akses pengguna, dan penyusunan laporan kustom.",
    to: "/goal-manager",
    icon: Award,
    badge: "Strategy",
    accentGradient: "from-yellow-500 to-amber-600",
    accentBorder: "border-yellow-500/30 hover:border-yellow-500/60",
    badgeBg: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border-yellow-500/30",
    badgeText: "Strategy",
    features: [
      { id: "goal-manager", label: "Goal Manager", to: "/goal-manager" },
      { id: "access-directory", label: "Access Directory", to: "/lainnya?app=access-matrix" },
      { id: "custom-reports", label: "Custom Reports", to: "/lainnya?app=custom-reports" },
    ],
    tools: [
      { id: "review-retrospective", label: "Performance Review", to: "/lainnya?app=retro" },
      { id: "statistics", label: "Statistics", to: "/statistics" },
      { id: "search-manager", label: "Search Manager", to: "/search-manager" },
    ],
    componentGroups: [
      {
        category: "Features",
        items: [
          { id: "goal-manager", label: "Goal Manager", to: "/goal-manager" },
        ],
      },
      {
        category: "Tools",
        items: [
          { id: "search-manager", label: "Search Manager", to: "/search-manager" },
        ],
      },
      {
        category: "Dashboards",
        items: [
          { id: "statistics", label: "Statistics", to: "/statistics" },
        ],
      },
      {
        category: "Workflows",
        items: [
          { id: "review-retrospective", label: "Performance Review", to: "/lainnya?app=retro" },
        ],
      },
      {
        category: "Analytics",
        items: [
          { id: "custom-reports", label: "Custom Reports", to: "/lainnya?app=custom-reports" },
        ],
      },
      {
        category: "Settings",
        items: [
          { id: "access-directory", label: "Access Directory", to: "/lainnya?app=access-matrix" },
        ],
      },
    ],
    subMenus: [
      { id: "goal-manager", label: "Goal Manager", to: "/goal-manager" },
      { id: "review-retrospective", label: "Performance Review", to: "/lainnya?app=retro" },
      { id: "statistics", label: "Statistics", to: "/statistics" },
      { id: "search-manager", label: "Search Manager", to: "/search-manager" },
      { id: "access-directory", label: "Access Directory", to: "/lainnya?app=access-matrix" },
      { id: "custom-reports", label: "Custom Reports", to: "/lainnya?app=custom-reports" },
    ],
  },
  {
    id: "strategic-frameworks",
    name: "Strategic Frameworks",
    category: "strategy",
    categoryLabel: "Strategy",
    shortDesc:
      "Kerangka 8 Pilar Strategis dan kumpulan lengkap 100 MBA Tools untuk perencanaan serta evaluasi strategi bisnis.",
    to: "/100-framework",
    icon: Grid2X2,
    badge: "Strategy",
    accentGradient: "from-purple-500 to-indigo-600",
    accentBorder: "border-purple-500/30 hover:border-purple-500/60",
    badgeBg: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
    badgeText: "Strategy",
    features: [
      { id: "framework-library", label: "Framework Library", to: "/100-framework" },
      { id: "strategic-pillars", label: "8 Strategic Pillars", to: "/100-framework?view=pillars" },
    ],
    tools: [],
    componentGroups: [
      {
        category: "Templates",
        items: [
          { id: "framework-library", label: "Framework Library", to: "/100-framework" },
        ],
      },
      {
        category: "Guides",
        items: [
          { id: "strategic-pillars", label: "8 Strategic Pillars", to: "/100-framework?view=pillars" },
        ],
      },
    ],
    subMenus: [
      { id: "framework-library", label: "Framework Library", to: "/100-framework" },
      { id: "strategic-pillars", label: "8 Strategic Pillars", to: "/100-framework?view=pillars" },
    ],
  },

  // ============================================================================
  // 6. People (1 App)
  // ============================================================================
  {
    id: "people-and-attendance",
    name: "Workforce Management",
    category: "people",
    categoryLabel: "People",
    shortDesc:
      "Pencatatan kehadiran jam kerja tim, serah terima tugas pergantian shift, pelacakan pelatihan SDM, dan pemantauan kapasitas beban kerja.",
    to: "/lainnya?app=time-clock",
    icon: UserCheck,
    badge: "People",
    accentGradient: "from-teal-500 to-cyan-600",
    accentBorder: "border-teal-500/30 hover:border-teal-500/60",
    badgeBg: "bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30",
    badgeText: "People",
    features: [
      { id: "handover-notes", label: "Handover Notes", to: "/lainnya?app=handover-notes" },
      { id: "training-track", label: "Training Track", to: "/lainnya?app=training-track" },
    ],
    tools: [
      { id: "time-clock", label: "Time Clock", to: "/lainnya?app=time-clock" },
      { id: "workload-capacity", label: "Workload Planning", to: "/lainnya?app=workload" },
    ],
    componentGroups: [
      {
        category: "Tools",
        items: [
          { id: "time-clock", label: "Time Clock", to: "/lainnya?app=time-clock" },
        ],
      },
      {
        category: "Workflows",
        items: [
          { id: "workload-capacity", label: "Workload Planning", to: "/lainnya?app=workload" },
        ],
      },
      {
        category: "Records",
        items: [
          { id: "handover-notes", label: "Handover Notes", to: "/lainnya?app=handover-notes" },
        ],
      },
      {
        category: "Guides",
        items: [
          { id: "training-track", label: "Training Track", to: "/lainnya?app=training-track" },
        ],
      },
    ],
    subMenus: [
      { id: "time-clock", label: "Time Clock", to: "/lainnya?app=time-clock" },
      { id: "handover-notes", label: "Handover Notes", to: "/lainnya?app=handover-notes" },
      { id: "training-track", label: "Training Track", to: "/lainnya?app=training-track" },
      { id: "workload-capacity", label: "Workload Planning", to: "/lainnya?app=workload" },
    ],
  },
  // ============================================================================
  // 7. Governance (1 App)
  // ============================================================================
  {
    id: "compliance-and-governance-records",
    name: "Corporate Governance",
    category: "governance",
    categoryLabel: "Governance",
    shortDesc:
      "Pemantauan kepatuhan regulasi hukum, compliance check, jejak audit trail, administrasi struktur saham pemegang saham (cap table matrix), serta pencatatan hak cipta dan lisensi IP.",
    to: "/peh/compliance",
    icon: Shield,
    badge: "Governance",
    accentGradient: "from-fuchsia-500 to-purple-600",
    accentBorder: "border-fuchsia-500/30 hover:border-fuchsia-500/60",
    badgeBg: "bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/30",
    badgeText: "Governance",
    features: [
      { id: "cap-table", label: "Shareholder Structure", to: "/peh/cap-table" },
      { id: "ip-licenses", label: "Intellectual Property", to: "/peh/ip-licenses" },
      { id: "audit-trail", label: "Audit Trail", to: "/audit-log" },
      { id: "cap-table-matrix", label: "Cap Table Matrix", to: "/peh/cap-table" },
      { id: "shareholders", label: "Shareholders", to: "/shareholder-registry" },
    ],
    tools: [
      { id: "kepatuhan-regulasi", label: "Kepatuhan Regulasi", to: "/peh/compliance" },
      { id: "compliance-check", label: "Compliance Check", to: "/peh/compliance" },
    ],
    componentGroups: [
      {
        category: "Records",
        items: [
          { id: "cap-table", label: "Shareholder Structure", to: "/peh/cap-table" },
          { id: "ip-licenses", label: "Intellectual Property", to: "/peh/ip-licenses" },
          { id: "audit-trail", label: "Audit Trail", to: "/audit-log" },
          { id: "cap-table-matrix", label: "Cap Table Matrix", to: "/peh/cap-table" },
          { id: "shareholders", label: "Shareholders", to: "/shareholder-registry" },
        ],
      },
      {
        category: "Settings",
        items: [
          { id: "kepatuhan-regulasi", label: "Kepatuhan Regulasi", to: "/peh/compliance" },
          { id: "compliance-check", label: "Compliance Check", to: "/peh/compliance" },
        ],
      },
    ],
    subMenus: [
      { id: "kepatuhan-regulasi", label: "Kepatuhan Regulasi", to: "/peh/compliance" },
      { id: "compliance-check", label: "Compliance Check", to: "/peh/compliance" },
      { id: "audit-trail", label: "Audit Trail", to: "/audit-log" },
      { id: "cap-table", label: "Shareholder Structure", to: "/peh/cap-table" },
      { id: "cap-table-matrix", label: "Cap Table Matrix", to: "/peh/cap-table" },
      { id: "shareholders", label: "Shareholders", to: "/shareholder-registry" },
      { id: "ip-licenses", label: "Intellectual Property", to: "/peh/ip-licenses" },
    ],
  },
];

const MBA_PILLARS_BY_CATEGORY: Record<
  Exclude<BizOpsCategory, "all">,
  readonly string[]
> = {
  strategy: ["Strategy", "Innovation"],
  operations: ["Operations"],
  commercial: ["Commercial"],
  resources: ["Finance"],
  administration: ["Analytics"],
  people: ["Organization"],
  governance: ["Governance"],
};

const countCategoryModules = (cat: Exclude<BizOpsCategory, "all">): number => {
  const opsCount = BIZ_OPS_APPS.filter((a) => a.category === cat).length;
  const pillars = MBA_PILLARS_BY_CATEGORY[cat];
  const mbaCount = STANDALONE_MBA_APPS.filter((a) =>
    pillars.includes(a.pillar)
  ).length;
  return opsCount + mbaCount;
};

export const BIZ_OPS_CATEGORY_TABS: {
  id: BizOpsCategory;
  label: string;
  title?: string;
  count: number;
}[] = [
  {
    id: "all",
    label: "Semua",
    count: BIZ_OPS_APPS.length + STANDALONE_MBA_APPS.length,
  },
  {
    id: "strategy",
    label: "Strategy",
    title: "Strategy",
    count: countCategoryModules("strategy"),
  },
  {
    id: "operations",
    label: "Operations",
    title: "Operations",
    count: countCategoryModules("operations"),
  },
  {
    id: "commercial",
    label: "Commercial",
    title: "Commercial",
    count: countCategoryModules("commercial"),
  },
  {
    id: "resources",
    label: "Resources",
    title: "Resources",
    count: countCategoryModules("resources"),
  },
  {
    id: "administration",
    label: "Administration",
    title: "Administration",
    count: countCategoryModules("administration"),
  },
  {
    id: "people",
    label: "People",
    title: "People",
    count: countCategoryModules("people"),
  },
  {
    id: "governance",
    label: "Governance",
    title: "Governance",
    count: countCategoryModules("governance"),
  },
];

export const BIZ_OPS_TOTAL_MODULES =
  BIZ_OPS_APPS.length + STANDALONE_MBA_APPS.length;
const BIZ_OPS_TOTAL_ITEMS = BIZ_OPS_APPS.reduce(
  (acc, app) => acc + app.subMenus.length,
  0
);
const MBA_TOTAL_TOOLS = STANDALONE_MBA_APPS.reduce(
  (acc, app) => acc + app.features.length,
  0
);
export const BIZ_OPS_TOTAL_BADGE = `${BIZ_OPS_TOTAL_MODULES} Modul • ${BIZ_OPS_TOTAL_ITEMS} Features • ${MBA_TOTAL_TOOLS} Tools`;
syncLauncherPageBadge("mode_business", BIZ_OPS_TOTAL_BADGE);
export const BIZ_OPS_SUMMARY_DESC = BIZ_OPS_CATEGORY_TABS.map(
  (t) => `${t.label} (${t.count})`
).join(" · ");

export const CATEGORY_SUBTITLES: Record<BizOpsCategory, string> = {
  all: "Ruang kendali terpadu yang menyatukan modul administrasi bisnis bersama 8 Pilar Strategis dan 100 MBA Tools dalam satu halaman kerja.",
  strategy:
    "Penyelarasan sasaran kinerja (OKR/KPI), evaluasi retrospektif, serta kerangka kerja strategis yang dipadukan dengan instrumen MBA pilar Strategy dan Innovation.",
  operations:
    "Pengelolaan pengadaan vendor, inventaris stok pergudangan, serta kendali mutu dan insiden yang terintegrasi dengan instrumen MBA pilar Operations.",
  commercial:
    "Manajemen profil klien, portal komunikasi, serta alur layanan dan loyalitas pelanggan yang diselaraskan dengan instrumen MBA pilar Commercial.",
  resources:
    "Pengendalian sumber daya, aset fasilitas, pengeluaran usaha, langganan, dan perpajakan yang diperkuat oleh instrumen MBA pilar Finance.",
  administration:
    "Tata persuratan korespondensi, template dokumen kerja, formulir digital, dan panduan SOP bersama instrumen MBA pilar Analytics.",
  people:
    "Pengaturan kehadiran, serah terima shift, pelatihan, dan kapasitas beban kerja SDM yang menyatu dengan instrumen MBA pilar Organization.",
  governance:
    "Pencatatan kepatuhan regulasi, struktur ekuitas pemegang saham, dan lisensi hak cipta yang selaras dengan instrumen MBA pilar Governance.",
};

const NON_INVERTED_BIZ_OPS_LABELS = new Set<string>([
  "Product Catalog",
  "Inventory",
  "Batch Track",
  "Cold Chain",
  "Quality Check",
  "Incident Log",
  "Client Directory",
  "Contact Management",
  "Client Portal",
  "Client Messaging",
  "Interaction Log",
  "Client Feedback",
  "Queue Management",
  "Appointment Booking",
  "Visitor Records",
  "Loyalty Program",
  "Membership Management",
  "Client Orders",
  "Service Rates",
  "Expense Tracker",
  "Subscription Manager",
  "Asset Manager",
  "Resource Manager",
  "Correspondence Log",
  "Document Templates",
  "Template Manager",
  "Custom Reports",
  "Statistics",
  "Search Manager",
  "Goal Manager",
  "Performance Review",
  "Time Clock",
  "Workload Planning",
  "Handover Notes",
  "Training Track",
  "Shareholder Structure",
  "Intellectual Property",
  "DCF Valuation",
  "Market Multiples",
  "Asset-Based Valuation",
  "Framework Library",
  "8 Strategic Pillars",
]);

export function BusinessOperationsCustomersPage({
  isEmbedded = false,
}: {
  isEmbedded?: boolean;
} = {}) {
  const [selectedCategory, setSelectedCategory] = useState<BizOpsCategory>(
    () => {
      if (typeof window !== "undefined") {
        try {
          const params = new URLSearchParams(window.location.search);
          const cat = params.get("category") || params.get("pill");
          if (cat) return normalizeBizOpsCategory(cat);
        } catch {}
      }
      return "all";
    }
  );
  const [searchQuery, setSearchQuery] = useState("");
  const { isFavorite, toggleFavorite } = useFavorites();
  const pageId = useCurrentLauncherPage("mode_business") || "mode_business";
  const { getPageCountDelta, getCardsMovedIntoPage } = useCardPageMover();
  const { pinnedList } = usePinnedCards(pageId);

  const activeCategory = normalizeBizOpsCategory(selectedCategory);

  const filteredApps = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return BIZ_OPS_APPS.filter((app) => {
      const matchCategory =
        activeCategory === "all" || app.category === activeCategory;

      const matchSearch =
        q === "" ||
        app.name.toLowerCase().includes(q) ||
        app.shortDesc.toLowerCase().includes(q) ||
        app.categoryLabel.toLowerCase().includes(q) ||
        app.subMenus.some((sub) => sub.label.toLowerCase().includes(q));
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const filteredMbaApps = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return STANDALONE_MBA_APPS.filter((app) => {
      const matchCategory =
        activeCategory === "all" ||
        MBA_PILLARS_BY_CATEGORY[activeCategory].includes(app.pillar);

      const matchSearch =
        q === "" ||
        app.title.toLowerCase().includes(q) ||
        app.subtitle.toLowerCase().includes(q) ||
        app.categoryLabel.toLowerCase().includes(q) ||
        app.pillar.toLowerCase().includes(q) ||
        app.features.some(
          (feat) =>
            feat.title.toLowerCase().includes(q) ||
            (feat.desc && feat.desc.toLowerCase().includes(q))
        );

      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const displayCards = useMemo(() => {
    const bizOpsCards = filteredApps.map((app) => ({
      id: app.to || app.name,
      key: app.id,
      element: (
        <MBACard
          key={app.id}
          title={app.name}
          to={app.to}
          icon={app.icon}
          badge={app.badgeText}
          shortDesc={app.shortDesc}
          accentGradient={app.accentGradient}
          features={app.features.map((sub) => ({
            title: sub.label,
            to: sub.to || app.to,
            inverted: !NON_INVERTED_BIZ_OPS_LABELS.has(sub.label),
          }))}
          tools={app.tools.map((sub) => ({
            title: sub.label,
            to: sub.to || app.to,
            inverted: !NON_INVERTED_BIZ_OPS_LABELS.has(sub.label),
          }))}
          categoryGroups={app.componentGroups.map((group, idx) => ({
            id: idx + 1,
            categoryNumber: idx + 1,
            name: group.category,
            items: group.items.map((sub) => ({
              title: sub.label,
              to: sub.to || app.to,
              inverted: !NON_INVERTED_BIZ_OPS_LABELS.has(sub.label),
            })),
          }))}
          isFav={isFavorite(app.to)}
          toggleFavorite={toggleFavorite}
        />
      ),
    }));

    const mbaCards = filteredMbaApps.map((app) => ({
      id: app.to || app.title,
      key: app.id,
      element: (
        <ToolsFlipCard
          key={app.id}
          app={app}
          isFav={isFavorite(app.to)}
          toggleFavorite={toggleFavorite}
          gradient={getToolsGradient(app.title)}
        />
      ),
    }));

    return sortCardsWithPinned(
      [...bizOpsCards, ...mbaCards],
      (c) => c.id,
      pinnedList
    );
  }, [filteredApps, filteredMbaApps, pinnedList, isFavorite, toggleFavorite]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      window.dispatchEvent(new Event("resize"));
    });
    return () => cancelAnimationFrame(raf);
  }, [activeCategory, filteredApps.length, filteredMbaApps.length]);

  return (
    <LauncherPageProvider pageId={pageId}>
      <div className="w-full flex-1 flex flex-col font-sans pb-16">
        {/* Portaled ShellHeader Filter Pills (6 Single-Word Functional Axis Pills) */}
        <ShellHeader>
          <HeaderNavPills
            items={adjustCategoryTabsCount(
              BIZ_OPS_CATEGORY_TABS,
              getPageCountDelta(pageId)
            )}
            activeId={activeCategory}
            onSelect={(id) => setSelectedCategory(normalizeBizOpsCategory(id))}
          />
        </ShellHeader>

        {/* Main Page Container */}
        <div className="w-full mx-auto pt-3 sm:pt-4 space-y-3 sm:space-y-4">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground/90 tracking-tight flex items-center justify-center gap-2.5">
              <span>Business Administration <span className="font-normal">and</span> Operations Management</span>
            </h1>
          </div>

          {/* Applications Grid: Unified sorted with pinned cards at the 1st position */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5 sm:gap-5">
            {displayCards.map((c) => c.element)}
            {activeCategory === "all" && (
              <MovedCardsGridItems pageId={pageId} searchQuery={searchQuery} />
            )}
          </div>

          {/* Empty Search Result Fallback */}
          {filteredApps.length === 0 &&
            filteredMbaApps.length === 0 &&
            (activeCategory !== "all" ||
              getCardsMovedIntoPage(pageId).length === 0) && (
              <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl border border-dashed border-border bg-card/40 my-6">
                <div className="size-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-3">
                  <Search className="size-6" />
                </div>
                <h3 className="text-base font-bold text-foreground">
                  Tidak ada modul ditemukan
                </h3>
                <p className="text-xs text-muted-foreground max-w-sm mt-1">
                  Tidak ada aplikasi yang cocok dengan kata kunci &quot;{searchQuery}&quot; pada kategori {activeCategory}.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="mt-4 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Reset Filter dan Pencarian
                </button>
              </div>
            )}
        </div>
      </div>
    </LauncherPageProvider>
  );
}

export default BusinessOperationsCustomersPage;
