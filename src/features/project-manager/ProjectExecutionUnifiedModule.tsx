import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Briefcase,
  Plus,
  FolderKanban,
  Clock,
  PackageCheck,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Database,
  DollarSign,
} from "lucide-react";
import { useSession } from "@/core/session";
import { can, MATRIX, type Action, type Resource } from "@/core/permissions";
import { clientsQuery, projectsQuery, rupiahRingkas } from "@/lib/data";
import { ModuleWorkbenchShell } from "@/shared/workbench/ModuleWorkbenchShell";
import {
  SUB_COMPONENT_KEYS,
  type ModuleDefinition,
  type SubComponentType,
  type WorkbenchExecutionContext,
} from "@/core/taxonomy/subComponentSchema";

// Impor komponen eksisting terintegrasi tanpa menulis ulang logikanya
import { ProjectManagerApp } from "@/features/project-manager/ProjectManagerApp";
import { KanbanApp } from "@/features/kanban/KanbanApp";
import { DeliverableManagerApp } from "@/features/deliverable-manager/DeliverableManagerApp";
import { TimeTrackerApp } from "@/features/time-tracker/TimeTrackerApp";
import { WorkflowManagerApp } from "@/features/workflow-manager/WorkflowManagerApp";
import { TemplateManagerApp } from "@/features/template-manager/TemplateManagerApp";
import { StatisticsApp } from "@/features/statistics/StatisticsApp";
import { WikiApp } from "@/features/wiki/WikiApp";
import { useTimeTrackerStore } from "@/features/time-tracker/store";
import { useDeliverableStore } from "@/features/deliverable-manager/store";
import { useKanbanBoard } from "@/features/kanban/store";

function EmbeddedFeatureFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-background overflow-hidden shadow-2xs [&>div]:!h-[680px] [&>div]:min-h-[540px]">
      {children}
    </div>
  );
}

function ProjectDashboardsOverview({ ctx }: { ctx: WorkbenchExecutionContext }) {
  const { data: clients = [] } = useQuery(clientsQuery);
  const { data: projects = [] } = useQuery(projectsQuery);
  const { entries } = useTimeTrackerStore();
  const { deliverables } = useDeliverableStore();
  const { activeBoard } = useKanbanBoard();

  const filteredProjects = useMemo(() => {
    const q = ctx.searchQuery.trim().toLowerCase();
    const list = projects.filter((p) => {
      if (ctx.activeClientId && p.client_id !== ctx.activeClientId) return false;
      if (ctx.activeProjectId && p.id !== ctx.activeProjectId) return false;
      if (q) {
        const hay = `${p.nama} ${p.ringkasan ?? ""} ${p.konsultan ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    return [...list].sort((a, b) =>
      ctx.sortOrder === "asc"
        ? a.nama.localeCompare(b.nama)
        : b.nama.localeCompare(a.nama),
    );
  }, [projects, ctx.activeClientId, ctx.activeProjectId, ctx.searchQuery, ctx.sortOrder]);

  const activeClientName = useMemo(() => {
    if (!ctx.activeClientId) return "Semua Klien";
    return clients.find((c) => c.id === ctx.activeClientId)?.nama ?? ctx.activeClientId;
  }, [clients, ctx.activeClientId]);

  const totalNilai = useMemo(
    () => filteredProjects.reduce((acc, p) => acc + (p.nilai || 0), 0),
    [filteredProjects],
  );

  const avgProgres = useMemo(() => {
    if (filteredProjects.length === 0) return 0;
    return Math.round(
      filteredProjects.reduce((acc, p) => acc + (p.progres || 0), 0) / filteredProjects.length,
    );
  }, [filteredProjects]);

  const billableHours = useMemo(() => {
    const mins = entries.filter((e) => e.isBillable).reduce((sum, e) => sum + e.durationMinutes, 0);
    return (mins / 60).toFixed(1);
  }, [entries]);

  const pendingDeliverables = useMemo(
    () =>
      deliverables.filter((d) => d.status === "submitted" || d.status === "in_review").length,
    [deliverables],
  );

  return (
    <div className="space-y-4">
      {/* KPI & Filter Konteks Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Portofolio Proyek ({activeClientName})</span>
            <FolderKanban className="size-4 text-primary" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-foreground">{filteredProjects.length}</span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              {rupiahRingkas(totalNilai)}
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">
            Rata-rata progres: <strong className="text-foreground">{avgProgres}%</strong>
          </p>
        </div>

        <div
          onClick={() => ctx.navigateToSubTab("tools")}
          className="p-4 rounded-2xl border border-border bg-card hover:border-primary/40 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Billable Hours Tercatat</span>
            <Clock className="size-4 text-blue-500" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-foreground">{billableHours} jam</span>
            <span className="text-[11px] text-primary flex items-center gap-1 font-medium">
              Time Tracker <ArrowRight className="size-3" />
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">
            {entries.length} entri waktu aktif di {ctx.workspaceId}
          </p>
        </div>

        <div
          onClick={() => ctx.navigateToSubTab("workflows")}
          className="p-4 rounded-2xl border border-border bg-card hover:border-primary/40 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Alur Kanban ({activeBoard.name})</span>
            <TrendingUp className="size-4 text-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-foreground">
              {activeBoard.columns.length} Kolom
            </span>
            <span className="text-[11px] text-primary flex items-center gap-1 font-medium">
              Buka Kanban <ArrowRight className="size-3" />
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">
            Urutan: {ctx.sortOrder.toUpperCase()} | Peran: {ctx.role}
          </p>
        </div>

        <div
          onClick={() => ctx.navigateToSubTab("records")}
          className="p-4 rounded-2xl border border-border bg-card hover:border-primary/40 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Deliverables Menunggu Review</span>
            <PackageCheck className="size-4 text-emerald-500" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-foreground">{pendingDeliverables}</span>
            <span className="text-[11px] text-primary flex items-center gap-1 font-medium">
              Arsip Deliverable <ArrowRight className="size-3" />
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">
            Total {deliverables.length} deliverable terdaftar
          </p>
        </div>
      </div>

      {/* Ringkasan Eksekusi & Project Manager Live */}
      <EmbeddedFeatureFrame>
        <ProjectManagerApp
          initialViewMode="overview"
          externalSearchQuery={ctx.searchQuery}
          externalProjectId={ctx.activeProjectId}
        />
      </EmbeddedFeatureFrame>
    </div>
  );
}

function ProjectExecutionSettingsPanel({ ctx }: { ctx: WorkbenchExecutionContext }) {
  const { rateCards, addRateCard } = useTimeTrackerStore();
  const [roleTitle, setRoleTitle] = useState("");
  const [hourlyRate, setHourlyRate] = useState("750000");

  const matrixForRole = MATRIX[ctx.role];

  const handleAddRate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleTitle.trim()) return;
    addRateCard({
      appliesTo: roleTitle.trim(),
      hourlyRate: Number(hourlyRate) || 750000,
      currency: "IDR",
      effectiveFrom: new Date().toISOString().split("T")[0],
    });
    setRoleTitle("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Pengaturan Tarif Billable Role */}
      <div className="p-5 rounded-2xl border border-border bg-card space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="size-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <DollarSign className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">Tarif Billable & Rate Card</h3>
            <p className="text-xs text-muted-foreground">
              Tersinkronisasi langsung dengan tab Time Tracker & Billable.
            </p>
          </div>
        </div>

        <form onSubmit={handleAddRate} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={roleTitle}
            onChange={(e) => setRoleTitle(e.target.value)}
            placeholder="Peran / Kategori (mis. Principal Advisor)"
            className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <input
            type="number"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            min={0}
            step={50000}
            className="w-36 px-3 py-1.5 text-xs rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <button
            type="submit"
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:opacity-95 transition-opacity cursor-pointer shrink-0"
          >
            Tambah Tarif
          </button>
        </form>

        <div className="divide-y divide-border border border-border rounded-xl overflow-hidden">
          {rateCards.map((rc) => (
            <div
              key={rc.id}
              className="px-3.5 py-2.5 bg-background flex items-center justify-between text-xs"
            >
              <div>
                <p className="font-semibold text-foreground">{rc.appliesTo}</p>
                <p className="text-[11px] text-muted-foreground">
                  Berlaku sejak {rc.effectiveFrom}
                </p>
              </div>
              <span className="font-mono font-semibold text-foreground">
                {rupiahRingkas(rc.hourlyRate)}/jam
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Isolasi Workspace & RBAC */}
      <div className="p-5 rounded-2xl border border-border bg-card space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="size-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">
              Isolasi Storage & Matriks Izin ({ctx.role})
            </h3>
            <p className="text-xs text-muted-foreground">
              Namespace aktif: <code className="font-mono text-foreground">{ctx.workspaceId}</code>
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {(["project", "task", "deliverable", "settings"] as Resource[]).map((res) => (
            <div
              key={res}
              className="px-3 py-2 rounded-xl border border-border bg-background flex items-center justify-between text-xs"
            >
              <span className="font-medium capitalize text-foreground">{res}</span>
              <div className="flex flex-wrap gap-1">
                {matrixForRole[res].length === 0 ? (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 font-medium">
                    Tidak ada akses
                  </span>
                ) : (
                  matrixForRole[res].map((act) => (
                    <span
                      key={act}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono"
                    >
                      {act}
                    </span>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 rounded-xl border border-border bg-muted/40 text-[11px] text-muted-foreground flex items-start gap-2">
          <Database className="size-4 shrink-0 mt-0.5 text-primary" />
          <div>
            Seluruh 10 slot sub-komponen Level 3 pada modul <strong>/proyek</strong> terhubung ke
            penyimpanan terisolasi per workspace (<code className="font-mono">{ctx.workspaceId}:*</code>).
          </div>
        </div>
      </div>
    </div>
  );
}

export const UNIFIED_PROJECT_MODULE: ModuleDefinition = {
  id: "unified-project-execution",
  workspaceId: "mode_employment",
  title: "Project & Engagement Management",
  subtitle:
    "Manajemen siklus penuh proyek konsultasi, kanban, deliverable, timesheet, dan persetujuan klien.",
  icon: Briefcase,
  routePath: "/proyek",
  origin: "core-saas",
  resourceType: "project",
  defaultSubTab: "dashboards",

  // PEMETAAN 10 SUB-KOMPONEN (LEVEL 3)
  subComponents: {
    dashboards: {
      status: "ready",
      storageKey: "ws-main:projects.manager_v1",
      render: (ctx) => <ProjectDashboardsOverview ctx={ctx} />,
    },

    features: {
      status: "ready",
      customLabel: "Daftar Proyek & Gantt",
      storageKey: "ws-main:projects.manager_v1",
      render: (ctx) => (
        <EmbeddedFeatureFrame>
          <ProjectManagerApp
            initialViewMode="timeline"
            externalSearchQuery={ctx.searchQuery}
            externalProjectId={ctx.activeProjectId}
          />
        </EmbeddedFeatureFrame>
      ),
    },

    tools: {
      status: "ready",
      customLabel: "Time Tracker & Billable",
      storageKey: "ws-main:projects.time_tracker_v1",
      render: () => (
        <EmbeddedFeatureFrame>
          <TimeTrackerApp />
        </EmbeddedFeatureFrame>
      ),
    },

    workflows: {
      status: "ready",
      customLabel: "Kanban & Approval",
      storageKey: "ws-main:kanban.board_v1",
      render: () => (
        <EmbeddedFeatureFrame>
          <KanbanApp />
        </EmbeddedFeatureFrame>
      ),
    },

    automations: {
      status: "ready",
      storageKey: "ws-main:workflows.ecosystem_v1",
      render: () => (
        <EmbeddedFeatureFrame>
          <WorkflowManagerApp />
        </EmbeddedFeatureFrame>
      ),
    },

    analytics: {
      status: "ready",
      storageKey: "ws-main:analytics.statistics_v1",
      render: () => (
        <EmbeddedFeatureFrame>
          <StatisticsApp />
        </EmbeddedFeatureFrame>
      ),
    },

    templates: {
      status: "ready",
      storageKey: "ws-main:templates.ecosystem_v1",
      render: () => (
        <EmbeddedFeatureFrame>
          <TemplateManagerApp />
        </EmbeddedFeatureFrame>
      ),
    },

    records: {
      status: "ready",
      customLabel: "Deliverables & Arsip",
      storageKey: "ws-main:deliverables.ecosystem_v1",
      requiredAction: "read",
      render: () => (
        <EmbeddedFeatureFrame>
          <DeliverableManagerApp />
        </EmbeddedFeatureFrame>
      ),
    },

    guides: {
      status: "ready",
      storageKey: "ws-main:wiki.data_v1",
      render: () => (
        <EmbeddedFeatureFrame>
          <WikiApp />
        </EmbeddedFeatureFrame>
      ),
    },

    settings: {
      status: "ready",
      requiredAction: "write",
      render: (ctx) => <ProjectExecutionSettingsPanel ctx={ctx} />,
    },
  },
};

function readInitialTabFromUrl(): SubComponentType | undefined {
  if (typeof window === "undefined") return undefined;
  const tabParam = new URLSearchParams(window.location.search).get("tab");
  if (tabParam && (SUB_COMPONENT_KEYS as readonly string[]).includes(tabParam)) {
    return tabParam as SubComponentType;
  }
  return undefined;
}

export function ProjectExecutionUnifiedPage() {
  const { session } = useSession();
  const { data: clients = [] } = useQuery(clientsQuery);
  const { data: projects = [] } = useQuery(projectsQuery);
  const { deliverables } = useDeliverableStore();
  const { activeBoard, columnTaskMap } = useKanbanBoard();

  const [activeTab, setActiveTab] = useState<SubComponentType>(
    () => readInitialTabFromUrl() ?? UNIFIED_PROJECT_MODULE.defaultSubTab ?? "dashboards",
  );

  const handleTabChange = (nextTab: SubComponentType) => {
    setActiveTab(nextTab);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", nextTab);
      window.history.replaceState(window.history.state, "", url.toString());
    }
  };

  // Enrich badge counts secara dinamis dari store nyata
  const dynamicModule = useMemo<ModuleDefinition>(() => {
    const kanbanCardCount = activeBoard.columns.reduce(
      (sum, col) => sum + (columnTaskMap[col.id]?.length ?? 0),
      0,
    );
    return {
      ...UNIFIED_PROJECT_MODULE,
      subComponents: {
        ...UNIFIED_PROJECT_MODULE.subComponents,
        workflows: {
          ...UNIFIED_PROJECT_MODULE.subComponents.workflows!,
          badgeCount: kanbanCardCount,
        },
        records: {
          ...UNIFIED_PROJECT_MODULE.subComponents.records!,
          badgeCount: deliverables.length,
        },
      },
    };
  }, [activeBoard.columns, columnTaskMap, deliverables.length]);

  return (
    <ModuleWorkbenchShell
      module={dynamicModule}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      workspaceId={session.workspaceId}
      userRole={session.role}
      checkPermission={(action, resource) =>
        can(session, action as Action, resource as Resource, {
          workspaceId: session.workspaceId,
          clientId: session.clientId,
          projectId: session.projectIds?.[0],
        })
      }
      availableClients={clients.map((c) => ({ id: c.id, name: c.nama }))}
      availableProjects={projects.map((p) => ({
        id: p.id,
        name: p.nama,
        clientId: p.client_id,
      }))}
      primaryAction={{
        label: "Proyek Baru",
        icon: Plus,
        onClick: (ctx) => {
          ctx.navigateToSubTab("features");
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent("aio_project_manager_new_project"));
          }, 80);
        },
      }}
    />
  );
}
