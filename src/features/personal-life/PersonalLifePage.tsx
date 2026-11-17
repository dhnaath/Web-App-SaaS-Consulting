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
  Flame,
  Target,
  FolderKanban,
  Dumbbell,
  HeartPulse,
  Brain,
  Sparkles,
  BookOpen,
  Compass,
  FileCheck,
  CalendarDays,
  NotebookText,
  Wallet,
  Receipt,
  PiggyBank,
  GraduationCap,
  Award,
  Book,
  Heart,
  Plane,
  Package,
  Key,
  Calculator,
  Lock,
  Search,
} from "lucide-react";

export type PersonalLifeCategory =
  | "all"
  | "development"
  | "wellness"
  | "reflection"
  | "administration"
  | "finance"
  | "learning"
  | "lifestyle"
  | "technology";

const LEGACY_PERSONAL_CATEGORY_MAP: Record<string, PersonalLifeCategory> = {
  pengembangan: "development",
  refleksi: "reflection",
  kesehatan: "wellness",
  utilitas: "technology",
  "personal-growth": "development",
  "health-wellbeing": "wellness",
  "reflection-mindfulness": "reflection",
  "personal-administration": "administration",
  "personal-finance": "finance",
  "learning-knowledge": "learning",
  "lifestyle-leisure": "lifestyle",
  "digital-security-utilities": "technology",
};

export function normalizePersonalCategory(raw?: string | null): PersonalLifeCategory {
  if (!raw) return "all";
  const key = raw.trim().toLowerCase();
  if (
    key === "all" ||
    key === "development" ||
    key === "wellness" ||
    key === "reflection" ||
    key === "administration" ||
    key === "finance" ||
    key === "learning" ||
    key === "lifestyle" ||
    key === "technology"
  ) {
    return key;
  }
  return LEGACY_PERSONAL_CATEGORY_MAP[key] ?? "all";
}

export interface PersonalLifeSubMenu {
  id: string;
  label: string;
  to: string;
  inverted?: boolean;
  componentCategory: ModuleComponentCategory;
}

export interface PersonalLifeAppItem {
  id: string;
  name: string;
  category: Exclude<PersonalLifeCategory, "all">;
  categoryLabel: string;
  shortDesc: string;
  to: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  badge: string;
  accentGradient: string;
  accentBorder: string;
  badgeBg: string;
  badgeText: string;
  subMenus: PersonalLifeSubMenu[];
}

export const PERSONAL_LIFE_APPS: PersonalLifeAppItem[] = [
  // ============================================================================
  // 1. Development (3 Modul)
  // ============================================================================
  {
    id: "personal-development",
    name: "Personal Development",
    category: "development",
    categoryLabel: "Development",
    shortDesc:
      "Pembangunan kebiasaan positif harian, pelacakan konsistensi streak rutinitas, serta penguatan disiplin pengembangan diri.",
    to: "/habit-tracker",
    icon: Flame,
    badge: "Development",
    accentGradient: "from-emerald-500 to-teal-600",
    accentBorder: "border-emerald-500/30 hover:border-emerald-500/60",
    badgeBg: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    badgeText: "Development",
    subMenus: [
      { id: "habit-tracker", label: "Habit Tracker", to: "/habit-tracker", inverted: false, componentCategory: "Automations" },
      { id: "personal-growth-matrix", label: "Personal Growth Matrix", to: "", componentCategory: "Tools" },
      { id: "personal-habits-guide", label: "Personal Habits Guide", to: "", componentCategory: "Guides" },
    ],
  },
  {
    id: "goal-and-life-planning",
    name: "Life Planning",
    category: "development",
    categoryLabel: "Development",
    shortDesc:
      "Perumusan visi hidup jangka panjang, penetapan target pribadi per kuartal, dan evaluasi keselarasan pencapaian sasaran hidup.",
    to: "/life/life-planner",
    icon: Target,
    badge: "Development",
    accentGradient: "from-teal-500 to-cyan-600",
    accentBorder: "border-teal-500/30 hover:border-teal-500/60",
    badgeBg: "bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30",
    badgeText: "Development",
    subMenus: [
      { id: "life-planner", label: "Life Planner", to: "/life/life-planner", inverted: false, componentCategory: "Features" },
      { id: "annual-life-blueprint", label: "Annual Life Blueprint", to: "", componentCategory: "Templates" },
      { id: "milestone-alignment-analytics", label: "Milestone Alignment Analytics", to: "", componentCategory: "Analytics" },
    ],
  },
  {
    id: "personal-productivity",
    name: "Personal Productivity",
    category: "development",
    categoryLabel: "Development",
    shortDesc:
      "Pengelolaan inisiatif proyek mandiri di luar pekerjaan kantor, alokasi fokus waktu individu, dan ringkasan capaian pribadi.",
    to: "/proyek-personal",
    icon: FolderKanban,
    badge: "Development",
    accentGradient: "from-sky-500 to-blue-600",
    accentBorder: "border-sky-500/30 hover:border-sky-500/60",
    badgeBg: "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30",
    badgeText: "Development",
    subMenus: [
      { id: "personal-projects", label: "Personal Projects", to: "/proyek-personal", inverted: false, componentCategory: "Workflows" },
      { id: "daily-focus-planner", label: "Daily Focus Planner", to: "", componentCategory: "Tools" },
      { id: "personal-output-dashboard", label: "Personal Output Dashboard", to: "", componentCategory: "Dashboards" },
    ],
  },

  // ============================================================================
  // 2. Wellness (4 Modul)
  // ============================================================================
  {
    id: "health-and-fitness",
    name: "Health Management",
    category: "wellness",
    categoryLabel: "Wellness",
    shortDesc:
      "Pusat pencatatan latihan fisik harian, kualitas tidur malam, komposisi metrik tubuh, serta pengingat konsumsi air minum.",
    to: "/health?tab=workouts",
    icon: Dumbbell,
    badge: "Wellness",
    accentGradient: "from-blue-500 to-indigo-600",
    accentBorder: "border-blue-500/30 hover:border-blue-500/60",
    badgeBg: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
    badgeText: "Wellness",
    subMenus: [
      { id: "workouts", label: "Workout Tracker", to: "/health?tab=workouts", inverted: false, componentCategory: "Features" },
      { id: "sleep-quality", label: "Sleep Tracker", to: "/health?tab=sleep", inverted: false, componentCategory: "Analytics" },
      { id: "body-metrics", label: "Body Metrics", to: "/health?tab=body-metrics", inverted: false, componentCategory: "Dashboards" },
      { id: "water-intake", label: "Water Tracker", to: "/health?tab=water", inverted: false, componentCategory: "Automations" },
    ],
  },
  {
    id: "health-records",
    name: "Health Records",
    category: "wellness",
    categoryLabel: "Wellness",
    shortDesc:
      "Pusat rekam medis klinis pribadi: ringkasan kondisi kesehatan, arsip riwayat pemeriksaan dokter, tanda vital, dan pengingat jadwal obat.",
    to: "/health",
    icon: HeartPulse,
    badge: "Wellness",
    accentGradient: "from-rose-500 to-pink-600",
    accentBorder: "border-rose-500/30 hover:border-rose-500/60",
    badgeBg: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
    badgeText: "Wellness",
    subMenus: [
      { id: "health-tracker", label: "Health Overview", to: "/health", inverted: false, componentCategory: "Dashboards" },
      { id: "medical-records", label: "Medical Records", to: "/health?tab=medical-records", inverted: false, componentCategory: "Records" },
      { id: "vitals-tracker", label: "Vital Signs", to: "/health?tab=vitals", inverted: false, componentCategory: "Analytics" },
      { id: "med-reminder", label: "Medication Reminder", to: "/lainnya?app=med-reminder", inverted: false, componentCategory: "Automations" },
    ],
  },
  {
    id: "mental-wellbeing",
    name: "Mental Wellbeing",
    category: "wellness",
    categoryLabel: "Wellness",
    shortDesc:
      "Pemantauan tingkat stres harian, rutinitas latihan pernapasan untuk regulasi emosi, dan analisis ketahanan kesehatan mental pribadi.",
    to: "/personal-life-management?module=mental-wellbeing",
    icon: Brain,
    badge: "Wellness",
    accentGradient: "from-violet-500 to-purple-600",
    accentBorder: "border-violet-500/30 hover:border-violet-500/60",
    badgeBg: "bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/30",
    badgeText: "Wellness",
    subMenus: [
      { id: "stress-resilience-checkin", label: "Stress Check-In", to: "", componentCategory: "Tools" },
      { id: "breathing-mindfulness-routine", label: "Mindfulness Routine", to: "", componentCategory: "Workflows" },
      { id: "emotional-wellbeing-trends", label: "Emotional Wellbeing Trends", to: "", componentCategory: "Analytics" },
    ],
  },
  {
    id: "nutrition-and-self-care",
    name: "Personal Wellness",
    category: "wellness",
    categoryLabel: "Wellness",
    shortDesc:
      "Pengelolaan rutinitas perawatan kulit pagi-malam, pencatatan asupan nutrisi pribadi, dan panduan kebiasaan merawat diri sehari-hari.",
    to: "/health?tab=skincare",
    icon: Sparkles,
    badge: "Wellness",
    accentGradient: "from-pink-500 to-rose-600",
    accentBorder: "border-pink-500/30 hover:border-pink-500/60",
    badgeBg: "bg-pink-500/15 text-pink-600 dark:text-pink-400 border-pink-500/30",
    badgeText: "Wellness",
    subMenus: [
      { id: "skincare-log", label: "Skincare Tracker", to: "/health?tab=skincare", inverted: false, componentCategory: "Workflows" },
      { id: "personal-nutrition-log", label: "Personal Nutrition Log", to: "", componentCategory: "Records" },
      { id: "self-care-routine-guide", label: "Self-Care Routine Guide", to: "", componentCategory: "Guides" },
    ],
  },

  // ============================================================================
  // 3. Reflection (2 Modul)
  // ============================================================================
  {
    id: "personal-journaling",
    name: "Personal Reflection",
    category: "reflection",
    categoryLabel: "Reflection",
    shortDesc:
      "Ruang penulisan jurnal harian privat, catatan rasa syukur berkala, serta pemetaan dinamika suasana hati (mood tracker).",
    to: "/journal",
    icon: BookOpen,
    badge: "Reflection",
    accentGradient: "from-teal-500 to-emerald-600",
    accentBorder: "border-teal-500/30 hover:border-teal-500/60",
    badgeBg: "bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30",
    badgeText: "Reflection",
    subMenus: [
      { id: "daily-journal", label: "Daily Journal", to: "/journal", inverted: false, componentCategory: "Records" },
      { id: "gratitude-journal", label: "Gratitude Journal", to: "/journal?tab=gratitude", inverted: false, componentCategory: "Templates" },
      { id: "mood-tracker", label: "Mood Tracker", to: "/journal?tab=mood", inverted: false, componentCategory: "Analytics" },
    ],
  },
  {
    id: "life-reflection",
    name: "Life Reflection",
    category: "reflection",
    categoryLabel: "Reflection",
    shortDesc:
      "Evaluasi berkala kualitas hidup mingguan dan tahunan, kompas nilai inti pribadi, serta arsip pelajaran bermakna kehidupan.",
    to: "/personal-life-management?module=life-reflection",
    icon: Compass,
    badge: "Reflection",
    accentGradient: "from-indigo-500 to-violet-600",
    accentBorder: "border-indigo-500/30 hover:border-indigo-500/60",
    badgeBg: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    badgeText: "Reflection",
    subMenus: [
      { id: "weekly-annual-review-template", label: "Periodic Review Template", to: "", componentCategory: "Templates" },
      { id: "core-values-purpose-compass", label: "Values Compass", to: "", componentCategory: "Tools" },
      { id: "life-lessons-archive", label: "Life Lessons Archive", to: "", componentCategory: "Records" },
    ],
  },

  // ============================================================================
  // 4. Administration (3 Modul)
  // ============================================================================
  {
    id: "personal-documents",
    name: "Personal Documents",
    category: "administration",
    categoryLabel: "Administration",
    shortDesc:
      "Registri berkas identitas diri pribadi (KTP, paspor, SIM, ijazah), pengingat masa berlaku dokumen, dan panduan administrasi individu.",
    to: "/personal-life-management?module=personal-documents",
    icon: FileCheck,
    badge: "Administration",
    accentGradient: "from-slate-500 to-blue-600",
    accentBorder: "border-slate-500/30 hover:border-slate-500/60",
    badgeBg: "bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30",
    badgeText: "Administration",
    subMenus: [
      { id: "personal-id-certificate-registry", label: "ID Certificate Registry", to: "", componentCategory: "Records" },
      { id: "personal-document-renewal-reminder", label: "Document Renewal Reminder", to: "", componentCategory: "Automations" },
      { id: "personal-admin-checklist-guide", label: "Admin Checklist Guide", to: "", componentCategory: "Guides" },
    ],
  },
  {
    id: "personal-scheduling",
    name: "Personal Scheduling",
    category: "administration",
    categoryLabel: "Administration",
    shortDesc:
      "Pengaturan kalender dan komitmen agenda pribadi, pola blok waktu harian individu, serta pengingat otomatis janji pribadi.",
    to: "/personal-life-management?module=personal-scheduling",
    icon: CalendarDays,
    badge: "Administration",
    accentGradient: "from-cyan-500 to-sky-600",
    accentBorder: "border-cyan-500/30 hover:border-cyan-500/60",
    badgeBg: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
    badgeText: "Administration",
    subMenus: [
      { id: "personal-calendar-commitments", label: "Personal Schedule", to: "", componentCategory: "Features" },
      { id: "time-blocking-template", label: "Time Blocking Template", to: "", componentCategory: "Templates" },
      { id: "personal-appointment-reminder", label: "Personal Appointment Reminder", to: "", componentCategory: "Automations" },
    ],
  },
  {
    id: "personal-records",
    name: "Personal Records",
    category: "administration",
    categoryLabel: "Administration",
    shortDesc:
      "Arsip catatan penting riwayat pribadi, kartu informasi medis darurat individu, dan pengaturan retensi catatan personal.",
    to: "/personal-life-management?module=personal-records",
    icon: NotebookText,
    badge: "Administration",
    accentGradient: "from-blue-500 to-slate-600",
    accentBorder: "border-blue-500/30 hover:border-blue-500/60",
    badgeBg: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
    badgeText: "Administration",
    subMenus: [
      { id: "personal-milestones-logs", label: "Milestone Log", to: "", componentCategory: "Records" },
      { id: "emergency-medical-info-card", label: "Emergency Medical Card", to: "", componentCategory: "Templates" },
      { id: "personal-archive-settings", label: "Personal Archive Settings", to: "", componentCategory: "Settings" },
    ],
  },

  // ============================================================================
  // 5. Finance (3 Modul)
  // ============================================================================
  {
    id: "personal-budgeting",
    name: "Personal Finance",
    category: "finance",
    categoryLabel: "Finance",
    shortDesc:
      "Perencanaan anggaran bulanan kebutuhan pribadi sehari-hari, batas belanja per pos pengeluaran, dan evaluasi varian anggaran individu.",
    to: "/personal-life-management?module=personal-budgeting",
    icon: Wallet,
    badge: "Finance",
    accentGradient: "from-emerald-500 to-green-600",
    accentBorder: "border-emerald-500/30 hover:border-emerald-500/60",
    badgeBg: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    badgeText: "Finance",
    subMenus: [
      { id: "monthly-personal-budget-plan", label: "Personal Budget Plan", to: "", componentCategory: "Templates" },
      { id: "personal-spending-limits", label: "Personal Spending Limits", to: "", componentCategory: "Settings" },
      { id: "budget-variance-analytics", label: "Budget Variance Analytics", to: "", componentCategory: "Analytics" },
    ],
  },
  {
    id: "income-and-expense-tracking",
    name: "Cash Flow",
    category: "finance",
    categoryLabel: "Finance",
    shortDesc:
      "Buku kas harian pribadi untuk mencatat pemasukan dan pengeluaran rutin sehari-hari beserta ringkasan arus kas harian individu.",
    to: "/personal-life-management?module=income-and-expense-tracking",
    icon: Receipt,
    badge: "Finance",
    accentGradient: "from-green-500 to-teal-600",
    accentBorder: "border-green-500/30 hover:border-green-500/60",
    badgeBg: "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/30",
    badgeText: "Finance",
    subMenus: [
      { id: "daily-expense-ledger", label: "Daily Expense Ledger", to: "", componentCategory: "Records" },
      { id: "personal-income-log", label: "Personal Income Log", to: "", componentCategory: "Records" },
      { id: "daily-cashflow-overview", label: "Daily Cashflow Overview", to: "", componentCategory: "Dashboards" },
    ],
  },
  {
    id: "savings-and-financial-goals",
    name: "Financial Goals",
    category: "finance",
    categoryLabel: "Finance",
    shortDesc:
      "Pengelolaan daftar wishlist barang atau pengalaman pribadi, kalkulator tabungan target personal, dan pemantauan progres menabung.",
    to: "/life/wishlist",
    icon: PiggyBank,
    badge: "Finance",
    accentGradient: "from-amber-500 to-emerald-600",
    accentBorder: "border-amber-500/30 hover:border-amber-500/60",
    badgeBg: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    badgeText: "Finance",
    subMenus: [
      { id: "wishlist", label: "Savings Wishlist", to: "/life/wishlist", inverted: false, componentCategory: "Records" },
      { id: "personal-savings-target-calculator", label: "Savings Target Calculator", to: "", componentCategory: "Tools" },
      { id: "savings-goal-progress-analytics", label: "Savings Goal Analytics", to: "", componentCategory: "Analytics" },
    ],
  },

  // ============================================================================
  // 6. Learning (3 Modul)
  // ============================================================================
  {
    id: "personal-learning",
    name: "Personal Learning",
    category: "learning",
    categoryLabel: "Learning",
    shortDesc:
      "Perencanaan belajar mandiri pribadi, pemantauan sesi studi personal, serta panduan teknik belajar efektif untuk pengembangan wawasan.",
    to: "/personal-life-management?module=personal-learning",
    icon: GraduationCap,
    badge: "Learning",
    accentGradient: "from-purple-500 to-indigo-600",
    accentBorder: "border-purple-500/30 hover:border-purple-500/60",
    badgeBg: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
    badgeText: "Learning",
    subMenus: [
      { id: "self-study-plan-tracker", label: "Self-Study Plan Tracker", to: "", componentCategory: "Workflows" },
      { id: "personal-study-session-dashboard", label: "Study Session Dashboard", to: "", componentCategory: "Dashboards" },
      { id: "effective-self-learning-guide", label: "Effective Self-Learning Guide", to: "", componentCategory: "Guides" },
    ],
  },
  {
    id: "skills-development",
    name: "Skills Development",
    category: "learning",
    categoryLabel: "Learning",
    shortDesc:
      "Inventarisasi daftar keahlian pribadi, pemetaan latihan keterampilan baru yang sedang diasah, dan analitik penguasaan skill individu.",
    to: "/personal-life-management?module=skills-development",
    icon: Award,
    badge: "Learning",
    accentGradient: "from-fuchsia-500 to-purple-600",
    accentBorder: "border-fuchsia-500/30 hover:border-fuchsia-500/60",
    badgeBg: "bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/30",
    badgeText: "Learning",
    subMenus: [
      { id: "personal-skill-inventory", label: "Personal Skill Inventory", to: "", componentCategory: "Records" },
      { id: "skill-gap-practice-matrix", label: "Skill Gap Matrix", to: "", componentCategory: "Tools" },
      { id: "skill-mastery-analytics", label: "Skill Mastery Analytics", to: "", componentCategory: "Analytics" },
    ],
  },
  {
    id: "reading-and-knowledge",
    name: "Knowledge Resources",
    category: "learning",
    categoryLabel: "Learning",
    shortDesc:
      "Log bacaan buku dan artikel pribadi untuk pengayaan wawasan, format ringkasan intisari bacaan personal, dan panduan kurasi bacaan.",
    to: "/personal-life-management?module=reading-and-knowledge",
    icon: Book,
    badge: "Learning",
    accentGradient: "from-indigo-500 to-blue-600",
    accentBorder: "border-indigo-500/30 hover:border-indigo-500/60",
    badgeBg: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    badgeText: "Learning",
    subMenus: [
      { id: "personal-book-article-log", label: "Reading Log", to: "", componentCategory: "Records" },
      { id: "personal-takeaways-highlights", label: "Reading Takeaways", to: "", componentCategory: "Templates" },
      { id: "curated-personal-reading-guide", label: "Personal Reading Guide", to: "", componentCategory: "Guides" },
    ],
  },

  // ============================================================================
  // 7. Lifestyle (3 Modul)
  // ============================================================================
  {
    id: "hobbies-and-interests",
    name: "Personal Interests",
    category: "lifestyle",
    categoryLabel: "Lifestyle",
    shortDesc:
      "Catatan sesi hobi dan eksplorasi minat pribadi, penjadwalan waktu luang berkualitas, serta panduan perlengkapan dan inspirasi hobi.",
    to: "/personal-life-management?module=hobbies-and-interests",
    icon: Heart,
    badge: "Lifestyle",
    accentGradient: "from-orange-500 to-rose-600",
    accentBorder: "border-orange-500/30 hover:border-orange-500/60",
    badgeBg: "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/30",
    badgeText: "Lifestyle",
    subMenus: [
      { id: "hobby-activity-log", label: "Hobby Activity Log", to: "", componentCategory: "Records" },
      { id: "hobby-time-interest-planner", label: "Hobby Interest Planner", to: "", componentCategory: "Features" },
      { id: "hobby-gear-inspiration-guide", label: "Hobby Gear Guide", to: "", componentCategory: "Guides" },
    ],
  },
  {
    id: "travel-and-experiences",
    name: "Travel Experiences",
    category: "lifestyle",
    categoryLabel: "Lifestyle",
    shortDesc:
      "Daftar destinasi dan pengalaman hidup impian pribadi, daftar periksa perlengkapan solo travel, dan dokumentasi kisah perjalanan pribadi.",
    to: "/personal-life-management?module=travel-and-experiences",
    icon: Plane,
    badge: "Lifestyle",
    accentGradient: "from-amber-500 to-orange-600",
    accentBorder: "border-amber-500/30 hover:border-amber-500/60",
    badgeBg: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    badgeText: "Lifestyle",
    subMenus: [
      { id: "personal-travel-wishlist-bucket-list", label: "Travel Wishlist", to: "", componentCategory: "Records" },
      { id: "solo-packing-experience-checklist", label: "Solo Packing Checklist", to: "", componentCategory: "Tools" },
      { id: "personal-experience-journal-workflow", label: "Experience Journal Workflow", to: "", componentCategory: "Workflows" },
    ],
  },
  {
    id: "personal-inventory",
    name: "Personal Assets",
    category: "lifestyle",
    categoryLabel: "Lifestyle",
    shortDesc:
      "Inventarisasi barang kepemilikan individu (gadget, koleksi, aksesori), kurasi lemari kapsul pribadi, dan pengingat garansi barang pribadi.",
    to: "/personal-life-management?module=personal-inventory",
    icon: Package,
    badge: "Lifestyle",
    accentGradient: "from-yellow-500 to-amber-600",
    accentBorder: "border-yellow-500/30 hover:border-yellow-500/60",
    badgeBg: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border-yellow-500/30",
    badgeText: "Lifestyle",
    subMenus: [
      { id: "personal-belongings-registry", label: "Personal Belongings Registry", to: "", componentCategory: "Records" },
      { id: "personal-wardrobe-capsule-planner", label: "Wardrobe Capsule Planner", to: "", componentCategory: "Tools" },
      { id: "warranty-service-due-reminder", label: "Warranty Service Reminder", to: "", componentCategory: "Automations" },
    ],
  },

  // ============================================================================
  // 8. Technology (3 Modul: 2 Split Legacy + 1 New)
  // ============================================================================
  {
    id: "personal-security",
    name: "Personal Security",
    category: "technology",
    categoryLabel: "Technology",
    shortDesc:
      "Brankas manajemen kata sandi akun personal terenkripsi, daftar periksa audit keamanan akun & 2FA, serta panduan pengamanan kode pemulihan.",
    to: "/passwords",
    icon: Key,
    badge: "Technology",
    accentGradient: "from-cyan-500 to-blue-600",
    accentBorder: "border-cyan-500/30 hover:border-cyan-500/60",
    badgeBg: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
    badgeText: "Technology",
    subMenus: [
      { id: "passwords", label: "Passwords", to: "/passwords", inverted: false, componentCategory: "Settings" },
      { id: "account-security-audit-checklist", label: "Security Audit Checklist", to: "", componentCategory: "Tools" },
      { id: "recovery-codes-backup-guide", label: "Recovery Backup Guide", to: "", componentCategory: "Guides" },
    ],
  },
  {
    id: "personal-utilities",
    name: "Personal Utilities",
    category: "technology",
    categoryLabel: "Technology",
    shortDesc:
      "Kalkulator utilitas serbaguna untuk kebutuhan komputasi harian pribadi, konverter satuan & waktu cepat, serta preferensi alat bantu personal.",
    to: "/kalkulator",
    icon: Calculator,
    badge: "Technology",
    accentGradient: "from-sky-500 to-indigo-600",
    accentBorder: "border-sky-500/30 hover:border-sky-500/60",
    badgeBg: "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30",
    badgeText: "Technology",
    subMenus: [
      { id: "utilities", label: "Utility Calculator", to: "/kalkulator", inverted: false, componentCategory: "Tools" },
      { id: "personal-quick-converters", label: "Personal Quick Converters", to: "", componentCategory: "Tools" },
      { id: "utility-shortcuts-preferences", label: "Utility Shortcuts Preferences", to: "", componentCategory: "Settings" },
    ],
  },
  {
    id: "digital-privacy",
    name: "Digital Privacy",
    category: "technology",
    categoryLabel: "Technology",
    shortDesc:
      "Alur audit privasi izin aplikasi dan akun digital, pembersihan jejak digital pribadi, serta panduan perlindungan data diri di internet.",
    to: "/personal-life-management?module=digital-privacy",
    icon: Lock,
    badge: "Technology",
    accentGradient: "from-slate-600 to-zinc-700",
    accentBorder: "border-slate-500/30 hover:border-slate-500/60",
    badgeBg: "bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30",
    badgeText: "Technology",
    subMenus: [
      { id: "account-privacy-audit-workflow", label: "Privacy Audit Workflow", to: "", componentCategory: "Workflows" },
      { id: "digital-footprint-cleanup", label: "Digital Footprint Cleanup", to: "", componentCategory: "Records" },
      { id: "personal-data-protection-guide", label: "Data Protection Guide", to: "", componentCategory: "Guides" },
    ],
  },
];

export const PERSONAL_LIFE_CATEGORY_TABS: {
  id: PersonalLifeCategory;
  label: string;
  count: number;
}[] = [
  { id: "all", label: "Semua", count: PERSONAL_LIFE_APPS.length },
  {
    id: "development",
    label: "Development",
    count: PERSONAL_LIFE_APPS.filter((a) => a.category === "development").length,
  },
  {
    id: "wellness",
    label: "Wellness",
    count: PERSONAL_LIFE_APPS.filter((a) => a.category === "wellness").length,
  },
  {
    id: "reflection",
    label: "Reflection",
    count: PERSONAL_LIFE_APPS.filter((a) => a.category === "reflection").length,
  },
  {
    id: "administration",
    label: "Administration",
    count: PERSONAL_LIFE_APPS.filter((a) => a.category === "administration").length,
  },
  {
    id: "finance",
    label: "Finance",
    count: PERSONAL_LIFE_APPS.filter((a) => a.category === "finance").length,
  },
  {
    id: "learning",
    label: "Learning",
    count: PERSONAL_LIFE_APPS.filter((a) => a.category === "learning").length,
  },
  {
    id: "lifestyle",
    label: "Lifestyle",
    count: PERSONAL_LIFE_APPS.filter((a) => a.category === "lifestyle").length,
  },
  {
    id: "technology",
    label: "Technology",
    count: PERSONAL_LIFE_APPS.filter((a) => a.category === "technology").length,
  },
];

export const PERSONAL_TOTAL_MODULES = PERSONAL_LIFE_APPS.length;
export const PERSONAL_TOOLS_COUNT = PERSONAL_LIFE_APPS.reduce(
  (sum, app) => sum + app.subMenus.filter((s) => s.componentCategory === "Tools").length,
  0
);
export const PERSONAL_FEATURES_COUNT = PERSONAL_LIFE_APPS.reduce(
  (sum, app) => sum + app.subMenus.filter((s) => s.componentCategory !== "Tools").length,
  0
);
export const PERSONAL_TOTAL_BADGE = `${PERSONAL_TOTAL_MODULES} Modul • ${PERSONAL_FEATURES_COUNT} Features • ${PERSONAL_TOOLS_COUNT} Tools`;
syncLauncherPageBadge("mode_personal", PERSONAL_TOTAL_BADGE);
export const PERSONAL_SUMMARY_DESC = PERSONAL_LIFE_CATEGORY_TABS.map(
  (t) => `${t.label} (${t.count})`
).join(" · ");

export function PersonalLifePage({ isEmbedded: _isEmbedded = false }: { isEmbedded?: boolean } = {}) {
  const [selectedCategory, setSelectedCategory] = useState<PersonalLifeCategory>(() => {
    if (typeof window !== "undefined") {
      try {
        const params = new URLSearchParams(window.location.search);
        const cat = params.get("category") || params.get("pill");
        if (cat) return normalizePersonalCategory(cat);
      } catch {}
    }
    return "all";
  });
  const [searchQuery, setSearchQuery] = useState("");
  const { isFavorite, toggleFavorite } = useFavorites();
  const pageId = useCurrentLauncherPage("mode_personal") || "mode_personal";
  const { getPageCountDelta, getCardsMovedIntoPage } = useCardPageMover();
  const { pinnedList } = usePinnedCards(pageId);

  const filteredApps = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = PERSONAL_LIFE_APPS.filter((app) => {
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
      {/* Portaled ShellHeader Filter Pills (Direct Selected / Unselected Layers) */}
      <ShellHeader>
        <HeaderNavPills
          items={adjustCategoryTabsCount(PERSONAL_LIFE_CATEGORY_TABS, getPageCountDelta(pageId))}
          activeId={selectedCategory}
          onSelect={(id) => setSelectedCategory(id as PersonalLifeCategory)}
        />
      </ShellHeader>

      {/* Main Page Container */}
      <div className="w-full mx-auto pt-3 sm:pt-4 space-y-3 sm:space-y-4">
        {/* Title (Matching MBA Page Header Style) */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground/90 tracking-tight flex items-center justify-center gap-2.5">
            <span>Personal Life Management</span>
          </h1>
        </div>

        {/* Applications Grid */}
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

        {/* Empty Search Result Fallback */}
        {filteredApps.length === 0 &&
          (selectedCategory !== "all" || getCardsMovedIntoPage(pageId).length === 0) && (
          <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl border border-dashed border-border bg-card/40 my-6">
            <div className="size-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-3">
              <Search className="size-6" />
            </div>
            <h3 className="text-base font-bold text-foreground">Tidak ada modul ditemukan</h3>
            <p className="text-xs text-muted-foreground max-w-sm mt-1">
              Tidak ada aplikasi yang cocok dengan kata kunci &quot;{searchQuery}&quot; pada kategori {selectedCategory}.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              Reset Filter & Pencarian
            </button>
          </div>
        )}
      </div>
    </div>
    </LauncherPageProvider>
  );
}

export default PersonalLifePage;
