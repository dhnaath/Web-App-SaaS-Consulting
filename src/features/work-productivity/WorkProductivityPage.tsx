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
  Target,
  Compass,
  CheckSquare,
  Workflow,
  Truck,
  Layers,
  CalendarDays,
  Scale,
  ShieldCheck,
  AlertOctagon,
  Search,
  FolderKanban,
  Briefcase,
  Map,
  Users,
  ListChecks,
  GitBranch,
  PackageCheck,
  Factory,
  UserCheck,
  CalendarClock,
  Scale3d,
  ShieldAlert,
  Wrench,
  BadgeCheck,
  FileDiff,
  BarChart3,
  Award,
  Activity,
  TrendingUp,
} from "lucide-react";

export type WorkCategory =
  | "all"
  | "planning"
  | "execution"
  | "collaboration"
  | "control"
  | "performance";

export interface WorkAppItem {
  id: string;
  name: string;
  category: Exclude<WorkCategory, "all">;
  categoryLabel: string;
  shortDesc: string;
  to: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  badge: string;
  accentGradient: string;
  accentBorder: string;
  badgeBg: string;
  badgeText: string;
  subMenus: {
    id: string;
    label: string;
    to?: string;
    inverted?: boolean;
    componentCategory: ModuleComponentCategory;
  }[];
}

export const WORK_APPS: WorkAppItem[] = [
  // ==========================================================================
  // 1. Planning (7 Modul)
  // ==========================================================================
  {
    id: "goal-management",
    name: "Goal Management",
    category: "planning",
    categoryLabel: "Planning",
    shortDesc:
      "Penetapan sasaran terukur beserta pengelolaan tahapan milestone dan checkpoint eksekusi proyek.",
    to: "/peh/milestones",
    icon: Target,
    badge: "Planning",
    accentGradient: "from-blue-500 to-indigo-600",
    accentBorder: "border-blue-500/30 hover:border-blue-500/60",
    badgeBg: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
    badgeText: "Planning",
    subMenus: [
      {
        id: "milestone-management",
        label: "Milestone Management",
        to: "/milestone-manager",
        inverted: false,
        componentCategory: "Features",
      },
    ],
  },
  {
    id: "roadmap-management",
    name: "Roadmap Management",
    category: "planning",
    categoryLabel: "Planning",
    shortDesc:
      "Penyusunan peta jalan strategis jangka menengah dan panjang yang selaras dengan sasaran organisasi.",
    to: "/goal-manager",
    icon: Compass,
    badge: "Planning",
    accentGradient: "from-sky-500 to-blue-600",
    accentBorder: "border-sky-500/30 hover:border-sky-500/60",
    badgeBg: "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30",
    badgeText: "Planning",
    subMenus: [
      {
        id: "strategic-roadmap",
        label: "Strategic Roadmap",
        to: "/goal-manager",
        inverted: false,
        componentCategory: "Features",
      },
    ],
  },
  {
    id: "goal-planning",
    name: "Goal Planning",
    category: "planning",
    categoryLabel: "Planning",
    shortDesc:
      "Penyelarasan sasaran strategis tim, penyusun sasaran SMART, serta dasbor pemantauan progres target.",
    to: "/peh/goals",
    icon: Target,
    badge: "Planning",
    accentGradient: "from-blue-500 to-cyan-600",
    accentBorder: "border-blue-500/30 hover:border-blue-500/60",
    badgeBg: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
    badgeText: "Planning",
    subMenus: [
      { id: "goal-alignment", label: "Goal Alignment", to: "", componentCategory: "Features" },
      { id: "smart-goal-builder", label: "SMART Goal Builder", to: "", componentCategory: "Tools" },
      { id: "goal-progress-dashboard", label: "Goal Progress Dashboard", to: "", componentCategory: "Dashboards" },
    ],
  },
  {
    id: "project-planning",
    name: "Project Planning",
    category: "planning",
    categoryLabel: "Planning",
    shortDesc:
      "Perumusan ruang lingkup proyek menggunakan kanvas terstruktur dan template ringkasan inisiatif.",
    to: "/proyek",
    icon: FolderKanban,
    badge: "Planning",
    accentGradient: "from-indigo-500 to-blue-600",
    accentBorder: "border-indigo-500/30 hover:border-indigo-500/60",
    badgeBg: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    badgeText: "Planning",
    subMenus: [
      { id: "project-scope-canvas", label: "Project Scope Canvas", to: "", componentCategory: "Tools" },
      { id: "project-brief-template", label: "Project Brief Template", to: "", componentCategory: "Templates" },
    ],
  },
  {
    id: "project-portfolio",
    name: "Project Portfolio",
    category: "planning",
    categoryLabel: "Planning",
    shortDesc:
      "Ikhtisar menyeluruh portofolio proyek berjalan beserta matriks penentuan prioritas inisiatif.",
    to: "/proyek?view=portfolio",
    icon: Briefcase,
    badge: "Planning",
    accentGradient: "from-violet-500 to-indigo-600",
    accentBorder: "border-violet-500/30 hover:border-violet-500/60",
    badgeBg: "bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/30",
    badgeText: "Planning",
    subMenus: [
      { id: "portfolio-overview", label: "Portfolio Overview", to: "", componentCategory: "Dashboards" },
      { id: "portfolio-prioritization-matrix", label: "Portfolio Prioritization Matrix", to: "", componentCategory: "Tools" },
    ],
  },
  {
    id: "roadmap-planning",
    name: "Roadmap Planning",
    category: "planning",
    categoryLabel: "Planning",
    shortDesc:
      "Linimasa roadmap lintas kuartal serta pemetaan ketergantungan antartahapan dan antar-tim.",
    to: "/timeline",
    icon: Map,
    badge: "Planning",
    accentGradient: "from-sky-500 to-teal-600",
    accentBorder: "border-sky-500/30 hover:border-sky-500/60",
    badgeBg: "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30",
    badgeText: "Planning",
    subMenus: [
      { id: "roadmap-timeline", label: "Roadmap Timeline", to: "", componentCategory: "Features" },
      { id: "dependency-mapper", label: "Dependency Mapper", to: "", componentCategory: "Tools" },
    ],
  },
  {
    id: "resource-planning",
    name: "Resource Planning",
    category: "planning",
    categoryLabel: "Planning",
    shortDesc:
      "Perencanaan kapasitas sumber daya, pemantauan kebutuhan alokasi, dan alur permintaan tenaga.",
    to: "/resource-manager",
    icon: Users,
    badge: "Planning",
    accentGradient: "from-cyan-500 to-blue-600",
    accentBorder: "border-cyan-500/30 hover:border-cyan-500/60",
    badgeBg: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
    badgeText: "Planning",
    subMenus: [
      { id: "resource-capacity-planner", label: "Resource Capacity Planner", to: "", componentCategory: "Tools" },
      { id: "resource-demand-dashboard", label: "Resource Demand Dashboard", to: "", componentCategory: "Dashboards" },
      { id: "resource-request-workflow", label: "Resource Request Workflow", to: "", componentCategory: "Workflows" },
    ],
  },

  // ==========================================================================
  // 2. Execution (8 Modul)
  // ==========================================================================
  {
    id: "task-management",
    name: "Task Management",
    category: "execution",
    categoryLabel: "Execution",
    shortDesc:
      "Penugasan aktivitas tim, pencatatan register tugas menyeluruh, serta kendali prioritas penyelesaian.",
    to: "/task-manager",
    icon: CheckSquare,
    badge: "Execution",
    accentGradient: "from-indigo-500 to-violet-600",
    accentBorder: "border-indigo-500/30 hover:border-indigo-500/60",
    badgeBg: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    badgeText: "Execution",
    subMenus: [
      {
        id: "task-assignment",
        label: "Task Assignment",
        to: "/collaboration",
        inverted: false,
        componentCategory: "Features",
      },
      {
        id: "task-register",
        label: "Task Register",
        to: "/database",
        inverted: false,
        componentCategory: "Records",
      },
      {
        id: "task-workspace",
        label: "Task Workspace",
        to: "/task-manager",
        inverted: false,
        componentCategory: "Features",
      },
    ],
  },
  {
    id: "workflow-management",
    name: "Workflow Management",
    category: "execution",
    categoryLabel: "Execution",
    shortDesc:
      "Visualisasi alur kerja kanban board untuk memastikan kelancaran perpindahan tahapan pekerjaan.",
    to: "/kanban",
    icon: Workflow,
    badge: "Execution",
    accentGradient: "from-violet-500 to-purple-600",
    accentBorder: "border-violet-500/30 hover:border-violet-500/60",
    badgeBg: "bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/30",
    badgeText: "Execution",
    subMenus: [
      {
        id: "kanban-board",
        label: "Kanban Board",
        to: "/kanban",
        inverted: false,
        componentCategory: "Tools",
      },
    ],
  },
  {
    id: "delivery-management",
    name: "Delivery Management",
    category: "execution",
    categoryLabel: "Execution",
    shortDesc:
      "Pelacakan status serah terima deliverable proyek, pemantauan tenggat SLA, dan kesiapan rilis.",
    to: "/deliverable-manager",
    icon: Truck,
    badge: "Execution",
    accentGradient: "from-cyan-500 to-teal-600",
    accentBorder: "border-cyan-500/30 hover:border-cyan-500/60",
    badgeBg: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
    badgeText: "Execution",
    subMenus: [
      {
        id: "delivery-workspace",
        label: "Delivery Workspace",
        to: "/deliverable-manager",
        inverted: false,
        componentCategory: "Features",
      },
    ],
  },
  {
    id: "production-management",
    name: "Production Management",
    category: "execution",
    categoryLabel: "Execution",
    shortDesc:
      "Pengelolaan proyek produksi kreatif, jadwal kalender publikasi karya, serta pipeline alur produksi.",
    to: "/peh/projects",
    icon: Layers,
    badge: "Execution",
    accentGradient: "from-cyan-500 to-blue-600",
    accentBorder: "border-cyan-500/30 hover:border-cyan-500/60",
    badgeBg: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
    badgeText: "Execution",
    subMenus: [
      {
        id: "production-projects",
        label: "Production Projects",
        to: "/peh/projects",
        inverted: false,
        componentCategory: "Features",
      },
      {
        id: "publishing-calendar",
        label: "Publishing Calendar",
        to: "/schedule-manager",
        inverted: false,
        componentCategory: "Features",
      },
      {
        id: "production-pipeline",
        label: "Production Pipeline",
        to: "/workflow-manager",
        inverted: false,
        componentCategory: "Workflows",
      },
    ],
  },
  {
    id: "task-tracking",
    name: "Task Tracking",
    category: "execution",
    categoryLabel: "Execution",
    shortDesc:
      "Antrean pemantauan tugas aktif, matriks penentuan prioritas pekerjaan, dan otomasi pengingat tenggat.",
    to: "/peh/tasks",
    icon: ListChecks,
    badge: "Execution",
    accentGradient: "from-indigo-500 to-blue-600",
    accentBorder: "border-indigo-500/30 hover:border-indigo-500/60",
    badgeBg: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    badgeText: "Execution",
    subMenus: [
      { id: "task-queue-dashboard", label: "Task Queue Dashboard", to: "", componentCategory: "Dashboards" },
      { id: "task-prioritization-matrix", label: "Task Prioritization Matrix", to: "", componentCategory: "Tools" },
      { id: "task-reminder-automation", label: "Task Reminder Automation", to: "", componentCategory: "Automations" },
      { id: "time-audit", label: "Time Audit", to: "/peh/time-audit", inverted: false, componentCategory: "Analytics" },
    ],
  },
  {
    id: "workflow-design",
    name: "Workflow Design",
    category: "execution",
    categoryLabel: "Execution",
    shortDesc:
      "Perancangan arsitektur alur kerja, pemetaan proses lintas peran, dan pustaka template alur baku.",
    to: "/peh/workflows",
    icon: GitBranch,
    badge: "Execution",
    accentGradient: "from-purple-500 to-violet-600",
    accentBorder: "border-purple-500/30 hover:border-purple-500/60",
    badgeBg: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
    badgeText: "Execution",
    subMenus: [
      { id: "workflow-designer", label: "Workflow Designer", to: "", componentCategory: "Features" },
      { id: "process-mapping-tool", label: "Process Mapping Tool", to: "", componentCategory: "Tools" },
      { id: "workflow-template", label: "Workflow Template", to: "", componentCategory: "Templates" },
    ],
  },
  {
    id: "delivery-tracking-module",
    name: "Delivery Tracking",
    category: "execution",
    categoryLabel: "Execution",
    shortDesc:
      "Daftar periksa penerimaan serah terima hasil kerja beserta alur persetujuan kelayakan rilis.",
    to: "/deliverable-manager?view=tracking",
    icon: PackageCheck,
    badge: "Execution",
    accentGradient: "from-teal-500 to-cyan-600",
    accentBorder: "border-teal-500/30 hover:border-teal-500/60",
    badgeBg: "bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30",
    badgeText: "Execution",
    subMenus: [
      { id: "delivery-acceptance-checklist", label: "Delivery Acceptance Checklist", to: "", componentCategory: "Tools" },
      { id: "delivery-approval-workflow", label: "Delivery Approval Workflow", to: "", componentCategory: "Workflows" },
    ],
  },
  {
    id: "production-planning",
    name: "Production Planning",
    category: "execution",
    categoryLabel: "Execution",
    shortDesc:
      "Penjadwalan lini produksi berkala dan analitik capaian keluaran output produksi.",
    to: "/planner",
    icon: Factory,
    badge: "Execution",
    accentGradient: "from-blue-500 to-sky-600",
    accentBorder: "border-blue-500/30 hover:border-blue-500/60",
    badgeBg: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
    badgeText: "Execution",
    subMenus: [
      { id: "production-schedule", label: "Production Schedule", to: "", componentCategory: "Features" },
      { id: "production-output-analytics", label: "Production Output Analytics", to: "", componentCategory: "Analytics" },
    ],
  },

  // ==========================================================================
  // 3. Collaboration (5 Modul)
  // ==========================================================================
  {
    id: "meeting-management",
    name: "Meeting Management",
    category: "collaboration",
    categoryLabel: "Collaboration",
    shortDesc:
      "Dokumentasi notulensi rapat, agenda pembahasan tim, serta pencatatan tindakan tindak lanjut.",
    to: "/peh/meetings",
    icon: CalendarDays,
    badge: "Collaboration",
    accentGradient: "from-emerald-500 to-teal-600",
    accentBorder: "border-emerald-500/30 hover:border-emerald-500/60",
    badgeBg: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    badgeText: "Collaboration",
    subMenus: [
      {
        id: "meeting-minutes",
        label: "Meeting Minutes",
        to: "/peh/meetings",
        inverted: false,
        componentCategory: "Features",
      },
    ],
  },
  {
    id: "decision-management",
    name: "Decision Management",
    category: "collaboration",
    categoryLabel: "Collaboration",
    shortDesc:
      "Registri ketetapan konsensus resmi organisasi beserta arsip historis alasan pengambilan keputusan.",
    to: "/decision-log",
    icon: Scale,
    badge: "Collaboration",
    accentGradient: "from-teal-500 to-emerald-600",
    accentBorder: "border-teal-500/30 hover:border-teal-500/60",
    badgeBg: "bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30",
    badgeText: "Collaboration",
    subMenus: [
      {
        id: "decision-register",
        label: "Decision Register",
        to: "/decision-log",
        inverted: false,
        componentCategory: "Records",
      },
      {
        id: "decision-history",
        label: "Decision History",
        to: "/lainnya?app=meeting-resolutions",
        inverted: false,
        componentCategory: "Records",
      },
    ],
  },
  {
    id: "team-coordination",
    name: "Team Coordination",
    category: "collaboration",
    categoryLabel: "Collaboration",
    shortDesc:
      "Matriks pembagian tanggung jawab tim, alur serah terima pekerjaan, dan catatan log aktivitas kolaborasi.",
    to: "/collaboration",
    icon: UserCheck,
    badge: "Collaboration",
    accentGradient: "from-emerald-500 to-green-600",
    accentBorder: "border-emerald-500/30 hover:border-emerald-500/60",
    badgeBg: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    badgeText: "Collaboration",
    subMenus: [
      { id: "team-responsibility-matrix", label: "Team Responsibility Matrix", to: "", componentCategory: "Tools" },
      { id: "team-handover-workflow", label: "Team Handover Workflow", to: "", componentCategory: "Workflows" },
      { id: "team-activity-log", label: "Team Activity Log", to: "", componentCategory: "Records" },
    ],
  },
  {
    id: "meeting-coordination",
    name: "Meeting Coordination",
    category: "collaboration",
    categoryLabel: "Collaboration",
    shortDesc:
      "Penyusun agenda rapat terarah, pengingat jadwal otomatis, dan template standar notulensi rapat.",
    to: "/meeting-manager",
    icon: CalendarClock,
    badge: "Collaboration",
    accentGradient: "from-teal-500 to-cyan-600",
    accentBorder: "border-teal-500/30 hover:border-teal-500/60",
    badgeBg: "bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30",
    badgeText: "Collaboration",
    subMenus: [
      { id: "meeting-agenda-builder", label: "Meeting Agenda Builder", to: "", componentCategory: "Tools" },
      { id: "meeting-reminder-automation", label: "Meeting Reminder Automation", to: "", componentCategory: "Automations" },
      { id: "meeting-minutes-template", label: "Meeting Minutes Template", to: "", componentCategory: "Templates" },
    ],
  },
  {
    id: "decision-support",
    name: "Decision Support",
    category: "collaboration",
    categoryLabel: "Collaboration",
    shortDesc:
      "Matriks perbandingan opsi pengambilan keputusan serta template ringkasan usulan keputusan eksekutif.",
    to: "/eisenhower",
    icon: Scale3d,
    badge: "Collaboration",
    accentGradient: "from-green-500 to-teal-600",
    accentBorder: "border-green-500/30 hover:border-green-500/60",
    badgeBg: "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/30",
    badgeText: "Collaboration",
    subMenus: [
      { id: "decision-matrix", label: "Decision Matrix", to: "", componentCategory: "Tools" },
      { id: "decision-brief-template", label: "Decision Brief Template", to: "", componentCategory: "Templates" },
    ],
  },

  // ==========================================================================
  // 4. Control (6 Modul)
  // ==========================================================================
  {
    id: "risk-management",
    name: "Risk Management",
    category: "control",
    categoryLabel: "Control",
    shortDesc:
      "Identifikasi potensi hambatan operasional, penilaian dampak risiko, dan perencanaan langkah mitigasi.",
    to: "/risk-management",
    icon: ShieldCheck,
    badge: "Control",
    accentGradient: "from-amber-500 to-rose-600",
    accentBorder: "border-amber-500/30 hover:border-amber-500/60",
    badgeBg: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    badgeText: "Control",
    subMenus: [
      {
        id: "risk-mitigation",
        label: "Risk Mitigation",
        to: "/risk-management",
        inverted: false,
        componentCategory: "Features",
      },
    ],
  },
  {
    id: "issue-management",
    name: "Issue Management",
    category: "control",
    categoryLabel: "Control",
    shortDesc:
      "Pelacakan penyelesaian masalah harian, penanganan insiden eskalasi, dan arsip log kendala.",
    to: "/peh/incidents",
    icon: AlertOctagon,
    badge: "Control",
    accentGradient: "from-rose-500 to-pink-600",
    accentBorder: "border-rose-500/30 hover:border-rose-500/60",
    badgeBg: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
    badgeText: "Control",
    subMenus: [
      {
        id: "issue-tracking",
        label: "Issue Tracking",
        to: "/lainnya?app=ticket-desk",
        inverted: false,
        componentCategory: "Features",
      },
      {
        id: "incident-management",
        label: "Incident Management",
        to: "/peh/incidents",
        inverted: false,
        componentCategory: "Features",
      },
      {
        id: "issue-log",
        label: "Issue Log",
        to: "/lainnya?app=incident-log",
        inverted: false,
        componentCategory: "Records",
      },
    ],
  },
  {
    id: "risk-control",
    name: "Risk Control",
    category: "control",
    categoryLabel: "Control",
    shortDesc:
      "Matriks evaluasi tingkat risiko, otomasi peringatan dini, dan register pengendalian risiko.",
    to: "/risk-management?view=control",
    icon: ShieldAlert,
    badge: "Control",
    accentGradient: "from-orange-500 to-red-600",
    accentBorder: "border-orange-500/30 hover:border-orange-500/60",
    badgeBg: "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/30",
    badgeText: "Control",
    subMenus: [
      { id: "risk-assessment-matrix", label: "Risk Assessment Matrix", to: "", componentCategory: "Tools" },
      { id: "risk-alert-automation", label: "Risk Alert Automation", to: "", componentCategory: "Automations" },
      { id: "risk-register", label: "Risk Register", to: "", componentCategory: "Records" },
    ],
  },
  {
    id: "issue-resolution",
    name: "Issue Resolution",
    category: "control",
    categoryLabel: "Control",
    shortDesc:
      "Alur eskalasi penyelesaian kendala, instrumen analisis akar masalah (RCA), dan template laporan insiden.",
    to: "/lainnya?app=ticket-desk",
    icon: Wrench,
    badge: "Control",
    accentGradient: "from-red-500 to-rose-600",
    accentBorder: "border-red-500/30 hover:border-red-500/60",
    badgeBg: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30",
    badgeText: "Control",
    subMenus: [
      { id: "issue-escalation-workflow", label: "Issue Escalation Workflow", to: "", componentCategory: "Workflows" },
      { id: "root-cause-analysis", label: "Root Cause Analysis", to: "", componentCategory: "Tools" },
      { id: "incident-report-template", label: "Incident Report Template", to: "", componentCategory: "Templates" },
    ],
  },
  {
    id: "quality-assurance",
    name: "Quality Assurance",
    category: "control",
    categoryLabel: "Control",
    shortDesc:
      "Daftar periksa inspeksi mutu operasional dan panduan standar kualitas hasil kerja.",
    to: "/lainnya?app=quality-check",
    icon: BadgeCheck,
    badge: "Control",
    accentGradient: "from-amber-500 to-orange-600",
    accentBorder: "border-amber-500/30 hover:border-amber-500/60",
    badgeBg: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    badgeText: "Control",
    subMenus: [
      { id: "quality-inspection-checklist", label: "Quality Inspection Checklist", to: "", componentCategory: "Tools" },
      { id: "quality-standards-guide", label: "Quality Standards Guide", to: "", componentCategory: "Guides" },
    ],
  },
  {
    id: "change-control",
    name: "Change Control",
    category: "control",
    categoryLabel: "Control",
    shortDesc:
      "Formulir pengajuan perubahan lingkup atau sistem beserta alur persetujuan pengendalian perubahan.",
    to: "/approval-manager",
    icon: FileDiff,
    badge: "Control",
    accentGradient: "from-pink-500 to-rose-600",
    accentBorder: "border-pink-500/30 hover:border-pink-500/60",
    badgeBg: "bg-pink-500/15 text-pink-600 dark:text-pink-400 border-pink-500/30",
    badgeText: "Control",
    subMenus: [
      { id: "change-request-form", label: "Change Request Form", to: "", componentCategory: "Features" },
      { id: "change-approval-workflow", label: "Change Approval Workflow", to: "", componentCategory: "Workflows" },
    ],
  },

  // ==========================================================================
  // 5. Performance (4 Modul)
  // ==========================================================================
  {
    id: "kpi-management",
    name: "KPI Management",
    category: "performance",
    categoryLabel: "Performance",
    shortDesc:
      "Dasbor indikator kinerja utama, kartu skor pencapaian KPI, dan register catatan metrik target.",
    to: "/statistics",
    icon: BarChart3,
    badge: "Performance",
    accentGradient: "from-purple-500 to-indigo-600",
    accentBorder: "border-purple-500/30 hover:border-purple-500/60",
    badgeBg: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
    badgeText: "Performance",
    subMenus: [
      { id: "kpi-dashboard", label: "KPI Dashboard", to: "", componentCategory: "Dashboards" },
      { id: "kpi-scorecard", label: "KPI Scorecard", to: "", componentCategory: "Tools" },
      { id: "kpi-register", label: "KPI Register", to: "", componentCategory: "Records" },
    ],
  },
  {
    id: "performance-review",
    name: "Performance Review",
    category: "performance",
    categoryLabel: "Performance",
    shortDesc:
      "Template evaluasi kinerja berkala, analisis kesenjangan performa, dan otomasi siklus tinjauan.",
    to: "/lainnya?app=retro",
    icon: Award,
    badge: "Performance",
    accentGradient: "from-fuchsia-500 to-purple-600",
    accentBorder: "border-fuchsia-500/30 hover:border-fuchsia-500/60",
    badgeBg: "bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/30",
    badgeText: "Performance",
    subMenus: [
      { id: "performance-review-template", label: "Performance Review Template", to: "", componentCategory: "Templates" },
      { id: "performance-gap-analysis", label: "Performance Gap Analysis", to: "", componentCategory: "Analytics" },
      { id: "review-cycle-automation", label: "Review Cycle Automation", to: "", componentCategory: "Automations" },
    ],
  },
  {
    id: "productivity-analysis",
    name: "Productivity Analysis",
    category: "performance",
    categoryLabel: "Performance",
    shortDesc:
      "Analitik tren produktivitas kerja serta pelacak tingkat pemanfaatan waktu operasional tim.",
    to: "/time-tracker",
    icon: Activity,
    badge: "Performance",
    accentGradient: "from-violet-500 to-fuchsia-600",
    accentBorder: "border-violet-500/30 hover:border-violet-500/60",
    badgeBg: "bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/30",
    badgeText: "Performance",
    subMenus: [
      { id: "productivity-trend-analytics", label: "Productivity Trend Analytics", to: "", componentCategory: "Analytics" },
      { id: "time-utilization-tracker", label: "Time Utilization Tracker", to: "", componentCategory: "Features" },
    ],
  },
  {
    id: "outcome-analysis",
    name: "Outcome Analysis",
    category: "performance",
    categoryLabel: "Performance",
    shortDesc:
      "Pelacakan dampak hasil strategis serta analisis realisasi manfaat dari setiap inisiatif berjalan.",
    to: "/reports",
    icon: TrendingUp,
    badge: "Performance",
    accentGradient: "from-indigo-500 to-purple-600",
    accentBorder: "border-indigo-500/30 hover:border-indigo-500/60",
    badgeBg: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    badgeText: "Performance",
    subMenus: [
      { id: "outcome-tracking", label: "Outcome Tracking", to: "", componentCategory: "Features" },
      { id: "benefits-realization-analysis", label: "Benefits Realization Analysis", to: "", componentCategory: "Analytics" },
    ],
  },
];

export const CATEGORY_TABS: { id: WorkCategory; label: string; count: number }[] = [
  { id: "all", label: "Semua", count: WORK_APPS.length },
  { id: "planning", label: "Planning", count: WORK_APPS.filter((a) => a.category === "planning").length },
  { id: "execution", label: "Execution", count: WORK_APPS.filter((a) => a.category === "execution").length },
  { id: "collaboration", label: "Collaboration", count: WORK_APPS.filter((a) => a.category === "collaboration").length },
  { id: "control", label: "Control", count: WORK_APPS.filter((a) => a.category === "control").length },
  { id: "performance", label: "Performance", count: WORK_APPS.filter((a) => a.category === "performance").length },
];

export const WORK_TOTAL_MODULES = WORK_APPS.length;
export const WORK_TOOLS_COUNT = WORK_APPS.reduce(
  (sum, app) => sum + app.subMenus.filter((s) => s.componentCategory === "Tools").length,
  0
);
export const WORK_FEATURES_COUNT = WORK_APPS.reduce(
  (sum, app) => sum + app.subMenus.filter((s) => s.componentCategory !== "Tools").length,
  0
);
export const WORK_TOTAL_BADGE = `${WORK_TOTAL_MODULES} Modul • ${WORK_FEATURES_COUNT} Features • ${WORK_TOOLS_COUNT} Tools`;
syncLauncherPageBadge("mode_employment", WORK_TOTAL_BADGE);
export const WORK_SUMMARY_DESC = CATEGORY_TABS.map((t) => `${t.label} (${t.count})`).join(" · ");

export function WorkProductivityPage({ isEmbedded: _isEmbedded = false }: { isEmbedded?: boolean } = {}) {
  const [selectedCategory, setSelectedCategory] = useState<WorkCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { isFavorite, toggleFavorite } = useFavorites();
  const pageId = useCurrentLauncherPage("mode_employment") || "mode_employment";
  const { getPageCountDelta, getCardsMovedIntoPage } = useCardPageMover();
  const { pinnedList } = usePinnedCards(pageId);

  const filteredApps = useMemo(() => {
    const list = WORK_APPS.filter((app) => {
      const matchCategory = selectedCategory === "all" || app.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === "" ||
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.badge.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.subMenus.some((sub) =>
          sub.label.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchCategory && matchSearch;
    });
    return sortCardsWithPinned(list, (app) => app.to || app.name, pinnedList);
  }, [selectedCategory, searchQuery, pinnedList]);

  return (
    <LauncherPageProvider pageId={pageId}>
    <div className="w-full flex-1 flex flex-col font-sans pb-16">
      {/* Portaled ShellHeader Filter Pills */}
      <ShellHeader>
        <HeaderNavPills
          items={adjustCategoryTabsCount(CATEGORY_TABS, getPageCountDelta(pageId))}
          activeId={selectedCategory}
          onSelect={(id) => setSelectedCategory(id as any)}
        />
      </ShellHeader>

      {/* Main Page Container */}
      <div className="w-full mx-auto pt-3 sm:pt-4 space-y-3 sm:space-y-4">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground/90 tracking-tight flex items-center justify-center gap-2.5">
            <span>Productivity Workspace <span className="font-normal">and</span> Workflow Systems</span>
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
export default WorkProductivityPage;
