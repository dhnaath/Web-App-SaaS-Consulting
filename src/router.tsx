import React from "react";
import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { AppShell } from "@/app/app-shell";
import { getCurrentSession } from "@/core/session";
import { resolveAccess } from "@/core/routeAccess";
import { slugify, SLUG_TO_FRAMEWORK_NAME } from "@/frameworkData";
import { CURRICULUM_DISCIPLINES } from "@/features/curated/curriculumData";
import {
  getUnifiedWorkspaceById,
  type WorkspaceId,
} from "@/core/unifiedTaxonomy";

// Core portals, launcher & unified 4-level hierarchy funnel
import { LauncherPage } from "./routes/LauncherPage";
import {
  AccessDeniedPage,
  HomeDashboardPage,
  PartnerWorkspacePage,
  PortalWorkspacePage,
} from "./routes/CorePortals";
import {
  HierarchyDirectoryPage,
  HierarchyCategoryPage,
  HierarchyModulePage,
} from "@/features/hierarchy/HierarchyPages";
import { getHierarchyPage } from "@/core/hierarchyRegistry";

// Pre-wrapped AppShell Views from NonWhiteAppRenderer, LifeOS, PEH, ValueTreated
import {
  CatatanView,
  CommodityView,
  FrameworkByNameView,
  IncotermsView,
  InvestmentAppView,
  KlienWorkspaceView,
  LainnyaView,
  MatrixAssetView,
  MatrixEarningView,
  MatrixExpenseView,
  MatrixFinancialHealthView,
  MatrixLiabilityView,
  MatrixSwotView,
  MatrixTowsView,
  ShariaAkadView,
  ShariaAsuransiView,
  ShariaTerlarangView,
  SocietyView,
  SpectrumStageView,
  TaxAppView,
  ValuationView,
  WaterView,
  WiraView,
  ZakatAppView,
} from "@/features/nonWhiteApps/NonWhiteAppRenderer";
import { LainnyaWorkspace } from "@/features/standalone/LainnyaWorkspace";
import { ValueTreatedPage } from "@/features/value-treated/ValueTreatedPage";

// Master workspace pages (need AppShell)
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
import { FamilyCommunityPage } from "@/features/family-community/FamilyCommunityPage";
import { HomeLeisurePage } from "@/features/home-leisure/HomeLeisurePage";
import { KnowledgeAndLearningPage } from "@/features/knowledge-learning/KnowledgeAndLearningPage";

// Launcher sections usable standalone
import { FinancialWealthSection } from "@/features/launcher/FinancialWealthSection";
import { getToolsGradient, Tools100Section } from "@/features/launcher/Tools100Section";
import { getGradient } from "@/features/launcher/ModeSectionView";
import { useFavorites } from "@/hooks/useFavorites";

// Curated, Credit, Product
import CuratedApp from "@/features/curated/App";
import CreditApp from "@/features/credit/App";
import ProductApp from "@/features/product/App";

// Standalone feature modules (need AppShell)
import { ApprovalManagerApp } from "@/features/approval-manager/ApprovalManagerApp";
import { AssetManagerApp } from "@/features/asset-manager/AssetManagerApp";
import { BookmarkManagerApp } from "@/features/bookmark-manager/BookmarkManagerApp";
import { CalendarApp } from "@/features/calendar/CalendarApp";
import { CollaborationApp } from "@/features/collaboration/CollaborationApp";
import { CountdownApp } from "@/features/countdown/CountdownApp";
import { DatabaseApp } from "@/features/database/DatabaseApp";
import { DeliverableManagerApp } from "@/features/deliverable-manager/DeliverableManagerApp";
import { DocumentsApp } from "@/features/documents/DocumentsApp";
import { EisenhowerApp } from "@/features/eisenhower/EisenhowerApp";
import { ExpenseTrackerApp } from "@/features/expense-tracker/ExpenseTrackerApp";
import { FocusTimerApp } from "@/features/focus-timer/FocusTimerApp";
import { FormsApp } from "@/features/forms/FormsApp";
import { GoalManagerApp } from "@/features/goal-manager/GoalManagerApp";
import { HabitTrackerApp } from "@/features/habit-tracker/HabitTrackerApp";
import { InteractionManagerApp } from "@/features/interaction-manager/InteractionManagerApp";
import { KanbanApp } from "@/features/kanban/KanbanApp";
import { KnowledgeBaseApp } from "@/features/knowledge-base/KnowledgeBaseApp";
import { KomunitasWargaApp } from "@/features/komunitas/KomunitasWargaApp";
import { MeetingManagerApp } from "@/features/meeting-manager/MeetingManagerApp";
import { MilestoneManagerApp } from "@/features/milestone-manager/MilestoneManagerApp";
import { NotesApp } from "@/features/notes/NotesApp";
import { NotificationCenterApp } from "@/features/notification-center/NotificationCenterApp";
import { PeopleManagerApp } from "@/features/people-manager/PeopleManagerApp";
import { PlannerApp } from "@/features/planner/PlannerApp";
import {
  ProjectExecutionUnifiedPage,
  UNIFIED_PROJECT_MODULE,
} from "@/features/project-manager/ProjectExecutionUnifiedModule";
import { ReminderManagerApp } from "@/features/reminder-manager/ReminderManagerApp";
import { ResearchManagerApp } from "@/features/research-manager/ResearchManagerApp";
import { ResourceManagerApp } from "@/features/resource-manager/ResourceManagerApp";
import { ScheduleManagerApp } from "@/features/schedule-manager/ScheduleManagerApp";
import { SearchManagerApp } from "@/features/search-manager/SearchManagerApp";
import { StatisticsApp } from "@/features/statistics/StatisticsApp";
import { SubscriptionManagerApp } from "@/features/subscription-manager/SubscriptionManagerApp";
import { TaskManagerApp } from "@/features/task-manager/TaskManagerApp";
import { TemplateManagerApp } from "@/features/template-manager/TemplateManagerApp";
import { TimeTrackerApp } from "@/features/time-tracker/TimeTrackerApp";
import { TimelineApp } from "@/features/timeline/TimelineApp";
import { WebClipperApp } from "@/features/web-clipper/WebClipperApp";
import { WikiApp } from "@/features/wiki/WikiApp";
import { WorkflowManagerApp } from "@/features/workflow-manager/WorkflowManagerApp";

// PEH views (already wrapped with AppShell)
import {
  PehAdvocacyView,
  PehAssetsView,
  PehBudgetView,
  PehCapTableView,
  PehCharityView,
  PehChoresView,
  PehCivicView,
  PehCommunityEventsView,
  PehComplianceView,
  PehContactsView,
  PehDocumentsView,
  PehEcosystemComparisonView,
  PehFamilyBudgetView,
  PehFamilyHealthView,
  PehFamilyRecipesView,
  PehFamilyTreeView,
  PehFitnessView,
  PehGiftsView,
  PehGlobalOverviewView,
  PehGoalsView,
  PehHabitsView,
  PehIncidentsView,
  PehInnovationsHubView,
  PehInsuranceView,
  PehIntroductionsView,
  PehInvestmentsView,
  PehIpLicensesView,
  PehJournalView,
  PehKnowledgeView,
  PehMaintenanceView,
  PehMeetingsView,
  PehMentorshipView,
  PehMilestonesView,
  PehPantryView,
  PehPetCareView,
  PehPlantsView,
  PehProcurementView,
  PehProjectsView,
  PehReadingView,
  PehRealEstateView,
  PehSleepView,
  PehSubscriptionsView,
  PehTasksView,
  PehTimeAuditView,
  PehTraditionsView,
  PehVaultView,
  PehVehiclesView,
  PehVendorsView,
  PehVolunteeringView,
  PehWorkflowsView,
} from "@/peh/PehAppRenderer";

// LifeOS views (already wrapped with AppShell)
import {
  LifeOSAssetsView,
  LifeOSBudgetView,
  LifeOSCertificateView,
  LifeOSContactsView,
  LifeOSDoctorView,
  LifeOSFinanceView,
  LifeOSGroceryView,
  LifeOSHabitsView,
  LifeOSHouseholdView,
  LifeOSJournalView,
  LifeOSMovieView,
  LifeOSNotesView,
  LifeOSPlannerView,
  LifeOSRecipeView,
  LifeOSSimpleFinanceView,
  LifeOSSubscriptionsView,
  LifeOSTravelView,
  LifeOSWeightView,
  LifeOSWishlistView,
} from "@/life-os/LifeOSAppRenderer";

function shellWrap(
  title: string,
  subtitle: string,
  Component: React.ComponentType<any>,
  props?: Record<string, any>,
) {
  return function WrappedShellRoute() {
    return (
      <AppShell title={title} subtitle={subtitle}>
        <div className="w-full max-w-[1815px] mx-auto px-4 sm:px-6 pb-8 pt-2">
          <Component {...(props || {})} />
        </div>
      </AppShell>
    );
  };
}

function StandaloneFinancialPage() {
  const { favorites, toggleFavorite } = useFavorites();
  return (
    <AppShell
      title="Financial Planning and Wealth Management"
      subtitle="Spektrum lengkap Surety, Flow, Build, Grow, dan Legacy"
    >
      <div className="w-full max-w-[1815px] mx-auto px-4 sm:px-6 pb-8 pt-2">
        <FinancialWealthSection
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          getGradient={getGradient}
        />
      </div>
    </AppShell>
  );
}

function StandaloneTools100Page() {
  const { favorites, toggleFavorite } = useFavorites();
  return (
    <AppShell
      title="8 Pilar Strategis & 100 MBA Tools"
      subtitle="Katalog lengkap 100 kerangka kerja strategis dan kanvas keputusan"
    >
      <div className="w-full max-w-[1815px] mx-auto px-4 sm:px-6 pb-8 pt-2">
        <Tools100Section
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          getGradient={getToolsGradient}
        />
      </div>
    </AppShell>
  );
}

function NotFoundView() {
  return (
    <AppShell title="Halaman Tidak Ditemukan" subtitle="Rute belum tersedia">
      <div className="max-w-lg mx-auto my-12 p-6 rounded-2xl border border-border bg-card text-center space-y-3">
        <h2 className="text-lg font-bold text-foreground">404 — Modul Tidak Ditemukan</h2>
        <p className="text-xs text-muted-foreground">
          Alamat yang Anda akses tidak terdaftar di peta rute aplikasi.
        </p>
        <Link
          to="/"
          className="inline-block px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold"
        >
          Kembali ke Launcher Utama
        </Link>
      </div>
    </AppShell>
  );
}

const rootRoute = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  beforeLoad: ({ location }) => {
    const pathname = location.pathname;
    if (pathname === "/akses-ditolak") return;
    const session = getCurrentSession();
    const decision = resolveAccess(session, pathname);
    if (!decision.allow && decision.redirectTo !== pathname) {
      throw redirect({ to: decision.redirectTo as any });
    }
  },
  component: () => <Outlet />,
  notFoundComponent: NotFoundView,
});

function r(path: string, component: React.FC<any>) {
  return createRoute({
    getParentRoute: () => rootRoute,
    path,
    component,
  });
}

// Param routes
const partnerChildRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/partner/$",
  component: PartnerWorkspacePage,
});

const portalChildRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/portal/$",
  component: () => <PortalWorkspacePage defaultTab="overview" />,
});

const kurasiChapterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/kurasi/$chapter",
  component: function KurasiChapterPage() {
    const { chapter } = kurasiChapterRoute.useParams();
    const disc = CURRICULUM_DISCIPLINES.find(
      (d) => d.slug === chapter.toLowerCase(),
    );
    const id = disc?.id ?? 1;
    return (
      <AppShell
        title={`Kurasi: ${disc?.title || chapter}`}
        subtitle={disc?.subtitle || "Materi kurasi terapan"}
      >
        <div className="w-full">
          <CuratedApp initialChapterId={id} />
        </div>
      </AppShell>
    );
  },
});

const frameworkSlugRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/framework/$slug",
  component: function FrameworkSlugPage() {
    const { slug } = frameworkSlugRoute.useParams();
    const normalized = slugify(slug);
    const name =
      SLUG_TO_FRAMEWORK_NAME[normalized] ||
      SLUG_TO_FRAMEWORK_NAME[slug] ||
      slug;
    return <FrameworkByNameView name={name} />;
  },
});

function redirectRoute(fromPath: string, toPath: string) {
  return createRoute({
    getParentRoute: () => rootRoute,
    path: fromPath,
    beforeLoad: () => {
      throw redirect({ to: toPath as any });
    },
    component: () => null,
  });
}

// Legacy /w/* redirect routes -> Rute kanonik /:pageSlug/:categorySlug/:moduleSlug/:componentSlug
const legacyWPageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/w/$pageSlug",
  beforeLoad: ({ params }) => {
    const resolvedSlug = getHierarchyPage(params.pageSlug)?.slug || params.pageSlug;
    throw redirect({
      to: "/$pageSlug" as any,
      params: { pageSlug: resolvedSlug } as any,
    });
  },
  component: () => null,
});

const legacyWCategoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/w/$pageSlug/$categorySlug",
  beforeLoad: ({ params }) => {
    const resolvedSlug = getHierarchyPage(params.pageSlug)?.slug || params.pageSlug;
    throw redirect({
      to: "/$pageSlug/$categorySlug" as any,
      params: { pageSlug: resolvedSlug, categorySlug: params.categorySlug } as any,
    });
  },
  component: () => null,
});

const legacyWModuleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/w/$pageSlug/$categorySlug/$moduleSlug",
  beforeLoad: ({ params }) => {
    const resolvedSlug = getHierarchyPage(params.pageSlug)?.slug || params.pageSlug;
    throw redirect({
      to: "/$pageSlug/$categorySlug/$moduleSlug" as any,
      params: {
        pageSlug: resolvedSlug,
        categorySlug: params.categorySlug,
        moduleSlug: params.moduleSlug,
      } as any,
    });
  },
  component: () => null,
});

const legacyWComponentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/w/$pageSlug/$categorySlug/$moduleSlug/$componentSlug",
  beforeLoad: ({ params }) => {
    const resolvedSlug = getHierarchyPage(params.pageSlug)?.slug || params.pageSlug;
    throw redirect({
      to: "/$pageSlug/$categorySlug/$moduleSlug/$componentSlug" as any,
      params: {
        pageSlug: resolvedSlug,
        categorySlug: params.categorySlug,
        moduleSlug: params.moduleSlug,
        componentSlug: params.componentSlug,
      } as any,
    });
  },
  component: () => null,
});

// Hierarchical Funnel Routes (Kanonik Full UI/UX):
// Halaman -> Kategori -> Modul -> 10 Jenis Komponen
const hierarchyPageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/$pageSlug",
  beforeLoad: ({ params, location }) => {
    const page = getHierarchyPage(params.pageSlug);
    if (!page) return;
    const rawSearch =
      typeof location.searchStr === "string"
        ? location.searchStr
        : typeof window !== "undefined"
          ? window.location.search
          : "";
    if (rawSearch) {
      const modParam = new URLSearchParams(rawSearch).get("module");
      if (modParam) {
        const needle = modParam.trim().toLowerCase();
        for (const cat of page.categories) {
          const found = cat.modules.find(
            (m) => m.id.toLowerCase() === needle || m.slug === needle,
          );
          if (found) {
            throw redirect({
              to: "/$pageSlug/$categorySlug/$moduleSlug/$componentSlug" as any,
              params: {
                pageSlug: page.slug,
                categorySlug: cat.slug,
                moduleSlug: found.slug,
                componentSlug: found.defaultComponentKey,
              } as any,
            });
          }
        }
      }
    }
    if (page.slug !== params.pageSlug) {
      throw redirect({
        to: "/$pageSlug" as any,
        params: { pageSlug: page.slug } as any,
      });
    }
  },
  component: function HierarchyPageRouteView() {
    const { pageSlug } = hierarchyPageRoute.useParams();
    const page = getHierarchyPage(pageSlug);
    if (!page) return <NotFoundView />;

    if (page.id === "financial") {
      return <StandaloneFinancialPage />;
    }

    const renderPageContent = () => {
      switch (page.id) {
        case "mode_business":
          return <BusinessOperationsCustomersPage />;
        case "mode_employment":
          return <WorkProductivityPage />;
        case "mode_creative":
          return <CreativeWorkspaceMediaPage />;
        case "mode_research":
          return <ResearchFrameworksPage />;
        case "mode_sharia":
          return <IslamicPrinciplesShariaValuesPage />;
        case "mode_personal":
          return <PersonalLifePage />;
        case "mode_family":
          return <FamilyRecordsHouseholdPage />;
        case "mode_public_affairs":
          return <PublicRelationsPolicyAffairsPage />;
        case "mode_networks":
          return <ContactDirectoryNetworksPage />;
        case "mode_phase_side":
          return <PhaseSidePage />;
        default:
          return null;
      }
    };

    const content = renderPageContent();
    if (!content) return <NotFoundView />;

    return (
      <AppShell title={page.label} subtitle={page.desc}>
        <div className="w-full max-w-[1815px] mx-auto px-4 sm:px-6 pb-8 pt-2">
          {content}
        </div>
      </AppShell>
    );
  },
});

const hierarchyCategoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/$pageSlug/$categorySlug",
  beforeLoad: ({ params }) => {
    const page = getHierarchyPage(params.pageSlug);
    if (page && page.slug !== params.pageSlug) {
      throw redirect({
        to: "/$pageSlug/$categorySlug" as any,
        params: { pageSlug: page.slug, categorySlug: params.categorySlug } as any,
      });
    }
  },
  component: function HierarchyCategoryRouteView() {
    const { pageSlug, categorySlug } = hierarchyCategoryRoute.useParams();
    const page = getHierarchyPage(pageSlug);
    if (!page) return <NotFoundView />;
    return (
      <HierarchyCategoryPage pageSlug={page.slug} categorySlug={categorySlug} />
    );
  },
});

const hierarchyModuleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/$pageSlug/$categorySlug/$moduleSlug",
  beforeLoad: ({ params }) => {
    const page = getHierarchyPage(params.pageSlug);
    if (page && page.slug !== params.pageSlug) {
      throw redirect({
        to: "/$pageSlug/$categorySlug/$moduleSlug" as any,
        params: {
          pageSlug: page.slug,
          categorySlug: params.categorySlug,
          moduleSlug: params.moduleSlug,
        } as any,
      });
    }
  },
  component: function HierarchyModuleRouteView() {
    const { pageSlug, categorySlug, moduleSlug } = hierarchyModuleRoute.useParams();
    const page = getHierarchyPage(pageSlug);
    if (!page) return <NotFoundView />;
    return (
      <HierarchyModulePage
        pageSlug={page.slug}
        categorySlug={categorySlug}
        moduleSlug={moduleSlug}
      />
    );
  },
});

const hierarchyComponentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/$pageSlug/$categorySlug/$moduleSlug/$componentSlug",
  beforeLoad: ({ params }) => {
    const page = getHierarchyPage(params.pageSlug);
    if (page && page.slug !== params.pageSlug) {
      throw redirect({
        to: "/$pageSlug/$categorySlug/$moduleSlug/$componentSlug" as any,
        params: {
          pageSlug: page.slug,
          categorySlug: params.categorySlug,
          moduleSlug: params.moduleSlug,
          componentSlug: params.componentSlug,
        } as any,
      });
    }
  },
  component: function HierarchyComponentRouteView() {
    const { pageSlug, categorySlug, moduleSlug, componentSlug } =
      hierarchyComponentRoute.useParams();
    const page = getHierarchyPage(pageSlug);
    if (!page) return <NotFoundView />;
    return (
      <HierarchyModulePage
        pageSlug={page.slug}
        categorySlug={categorySlug}
        moduleSlug={moduleSlug}
        componentSlug={componentSlug}
      />
    );
  },
});

const catchAllRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/$",
  component: NotFoundView,
});

const routeTree = rootRoute.addChildren([
  // Core portals & launcher
  r("/", LauncherPage),
  r("/home", HomeDashboardPage),
  r("/partner", PartnerWorkspacePage),
  partnerChildRoute,
  r("/portal", () => <PortalWorkspacePage defaultTab="overview" />),
  r("/portal/pesan", () => <PortalWorkspacePage defaultTab="messages" />),
  portalChildRoute,
  r("/akses-ditolak", AccessDeniedPage),
  r("/klien", KlienWorkspaceView),
  r("/client-hub", KlienWorkspaceView),
  r("/catatan", CatatanView),
  r("/lainnya", LainnyaView),

  // Unified 4-Level Funnel Routes (Halaman -> Kategori -> Modul -> 10 Komponen)
  r("/workspace-directory", HierarchyDirectoryPage),
  redirectRoute("/w", "/workspace-directory"),
  legacyWPageRoute,
  legacyWCategoryRoute,
  legacyWModuleRoute,
  legacyWComponentRoute,
  hierarchyPageRoute,
  hierarchyCategoryRoute,
  hierarchyModuleRoute,
  hierarchyComponentRoute,

  // Redirect Rute Singkat Lama -> Rute Kanonik Full UI/UX
  redirectRoute("/financial-planning", "/financial-planning-and-wealth-management"),
  redirectRoute("/financial-wealth", "/financial-planning-and-wealth-management"),
  redirectRoute("/business-operations", "/business-administration-and-operations-management"),
  redirectRoute("/work-productivity", "/productivity-workspace-and-workflow-systems"),
  redirectRoute("/creative-workspace", "/creative-workspace-and-media-production"),
  redirectRoute("/research-frameworks", "/research-foundations-and-reference-frameworks"),
  redirectRoute("/islamic-principles", "/islamic-principles-and-sharia-values"),
  redirectRoute("/sharia-values", "/islamic-principles-and-sharia-values"),
  redirectRoute("/personal-life", "/personal-life-management"),
  redirectRoute("/family-records", "/household-planning-and-family-records"),
  redirectRoute("/public-affairs", "/policy-affairs-and-public-relations"),
  redirectRoute("/contact-directory", "/contact-directory-and-social-networks"),
  redirectRoute("/social-networks", "/contact-directory-and-social-networks"),
  redirectRoute("/phase-side", "/phase-mutual-self-organization"),

  // Hub Tambahan
  r("/knowledge-and-learning", shellWrap("Knowledge and Learning", "Pusat literasi, wiki, riset, dan kurasi pengetahuan", KnowledgeAndLearningPage)),
  r("/family-and-community", shellWrap("Family and Community", "Jejaring keluarga, warga, dan aktivitas komunitas", FamilyCommunityPage)),
  r("/family-community", shellWrap("Family and Community", "Jejaring keluarga, warga, dan aktivitas komunitas", FamilyCommunityPage)),
  r("/home-and-leisure", shellWrap("Home and Leisure", "Hunian, hobi, gaya hidup, dan rencana perjalanan", HomeLeisurePage)),
  r("/home-leisure", shellWrap("Home and Leisure", "Hunian, hobi, gaya hidup, dan rencana perjalanan", HomeLeisurePage)),

  // Strategic Tools, Curated & Commodity
  r("/100-framework", StandaloneTools100Page),
  r("/value-treated", ValueTreatedPage),
  r("/applied-value", ValueTreatedPage),
  r("/valuetreated", ValueTreatedPage),
  r("/kurasi-wealth", ValueTreatedPage),
  r("/kurasi", shellWrap("Kurasi Pengetahuan Bisnis", "10 Bidang Disiplin Ilmu Manajemen, Ekonomi & Keuangan", CuratedApp)),
  kurasiChapterRoute,
  r("/100-komoditas", CommodityView),
  r("/10-indeks", CommodityView),
  r("/physical-commodities", CommodityView),
  r("/valuasi", ValuationView),
  r("/incoterms", IncotermsView),
  r("/water", WaterView),
  r("/zakat", ZakatAppView),
  r("/pajak", TaxAppView),
  r("/investasi", InvestmentAppView),
  r("/syariah", shellWrap("Akad & Prinsip Syariah", "Referensi syariah dan kalkulator muamalah", IslamicPrinciplesShariaValuesPage)),
  r("/syariah/akad", ShariaAkadView),
  r("/syariah/terlarang", ShariaTerlarangView),
  r("/syariah/asuransi", ShariaAsuransiView),
  r("/kredit", shellWrap("Kartu Kredit & Kewajiban", "Pengelolaan kartu kredit dan cicilan terstruktur", CreditApp)),
  r("/katalog-produk", shellWrap("Katalog Produk", "Daftar produk, SKU, harga, dan ketersediaan", ProductApp)),

  // Matrix & Wealth Spectrum Stages
  r("/asset", MatrixAssetView),
  r("/earning", MatrixEarningView),
  r("/liability", MatrixLiabilityView),
  r("/expense", MatrixExpenseView),
  r("/financial-health", MatrixFinancialHealthView),
  r("/swot", MatrixSwotView),
  r("/tows", MatrixTowsView),
  r("/surety", () => <SpectrumStageView stage="surety" />),
  r("/flow", () => <SpectrumStageView stage="flow" />),
  r("/build", () => <SpectrumStageView stage="build" />),
  r("/grow", () => <SpectrumStageView stage="grow" />),
  r("/legacy", () => <SpectrumStageView stage="legacy" />),
  r("/liquid-reserves", () => <SpectrumStageView stage="surety" />),
  r("/paper-securities", () => <SpectrumStageView stage="grow" />),
  r("/finance", () => <SpectrumStageView stage="flow" />),

  // Society & Phase Side
  r("/development", () => <SocietyView type="development" />),
  r("/improvement", () => <SocietyView type="improvement" />),
  r("/reliance", () => <SocietyView type="reliance" />),
  r("/sufficient", () => <SocietyView type="sufficient" />),
  r("/interact", () => <SocietyView type="interact" />),
  r("/interdependence", () => <SocietyView type="interdependence" />),
  r("/interest", () => <SocietyView type="interest" />),
  r("/intersect", () => <SocietyView type="intersect" />),
  r("/insider", () => <SocietyView type="insider" />),
  r("/insight", () => <SocietyView type="insight" />),
  r("/outward", () => <SocietyView type="outward" />),
  r("/outlook", () => <SocietyView type="outlook" />),

  // Dedicated Framework Paths & Dynamic Slug
  frameworkSlugRoute,
  r("/pestel", () => <FrameworkByNameView name="PESTEL Analysis" />),
  r("/porter", () => <FrameworkByNameView name="Porter's Five Forces" />),
  r("/vrio", () => <FrameworkByNameView name="VRIO Framework" />),
  r("/value-chain", () => <FrameworkByNameView name="Value Chain Analysis" />),
  r("/bcg", () => <FrameworkByNameView name="BCG Matrix" />),
  r("/ge-mckinsey", () => <FrameworkByNameView name="GE-McKinsey Matrix" />),
  r("/ansoff", () => <FrameworkByNameView name="Ansoff Matrix" />),
  r("/blue-ocean", () => <FrameworkByNameView name="Blue Ocean Strategy (ERRC)" />),
  r("/value-disciplines", () => <FrameworkByNameView name="Value Disciplines Model" />),
  r("/bmc", () => <FrameworkByNameView name="Business Model Canvas (BMC)" />),
  r("/lean-canvas", () => <FrameworkByNameView name="Lean Canvas" />),
  r("/value-proposition-canvas", () => <FrameworkByNameView name="Value Proposition Canvas" />),
  r("/empathy-map", () => <FrameworkByNameView name="Empathy Map" />),
  r("/stp", () => <FrameworkByNameView name="STP Model (Segmentation-Targeting-Positioning)" />),
  r("/marketing-mix", () => <FrameworkByNameView name="Marketing Mix (7Ps / 4Ps)" />),
  r("/customer-journey-map", () => <FrameworkByNameView name="Customer Journey Map" />),
  r("/kano-model", () => <FrameworkByNameView name="Kano Feature Prioritization" />),
  r("/product-life-cycle", () => <FrameworkByNameView name="Product Life Cycle (PLC)" />),

  // Wira views
  r("/budget", () => <WiraView type="budget" />),
  r("/code", () => <WiraView type="code" />),
  r("/contacts", () => <WiraView type="contacts" />),
  r("/courses", () => <WiraView type="courses" />),
  r("/design", () => <WiraView type="design" />),
  r("/exams", () => <WiraView type="exams" />),
  r("/flashcards", () => <WiraView type="flashcards" />),
  r("/games", () => <WiraView type="games" />),
  r("/health", () => <WiraView type="health" />),
  r("/ideas", () => <WiraView type="ideas" />),
  r("/inventory", () => <WiraView type="inventory" />),
  r("/journal", () => <WiraView type="journal" />),
  r("/kalkulator", () => <WiraView type="kalkulator" />),
  r("/languages", () => <WiraView type="languages" />),
  r("/movies", () => <WiraView type="movies" />),
  r("/music", () => <WiraView type="music" />),
  r("/passwords", () => <WiraView type="passwords" />),
  r("/photography", () => <WiraView type="photography" />),
  r("/podcasts", () => <WiraView type="podcasts" />),
  r("/proyek-personal", () => <WiraView type="proyek-personal" />),
  r("/reading", () => <WiraView type="reading" />),
  r("/recipes", () => <WiraView type="recipes" />),
  r("/shopping", () => <WiraView type="shopping" />),
  r("/subscriptions", () => <WiraView type="subscriptions" />),
  r("/trips", () => <WiraView type="trips" />),
  r("/weather", () => <WiraView type="weather" />),
  r("/workouts", () => <WiraView type="workouts" />),
  r("/writing", () => <WiraView type="writing" />),

  // Standalone SaaS & Productivity Modules
  r("/approval-manager", shellWrap("Approval Manager", "Manajemen alur persetujuan dokumen dan pengadaan", ApprovalManagerApp)),
  r("/asset-manager", shellWrap("Asset Manager", "Inventarisasi aset perusahaan dan pelacakan lokasi", AssetManagerApp)),
  r("/bookmarks", shellWrap("Bookmark Manager", "Koleksi tautan dan referensi terorganisir", BookmarkManagerApp)),
  r("/calendar", shellWrap("Kalender", "Penjadwalan agenda dan pertemuan", CalendarApp)),
  r("/kalender", shellWrap("Kalender", "Penjadwalan agenda dan pertemuan", CalendarApp)),
  r("/collaboration", shellWrap("Collaboration Hub", "Ruang kolaborasi tim lintas divisi", CollaborationApp)),
  r("/countdown", shellWrap("Countdown", "Hitung mundur tenggat waktu penting", CountdownApp)),
  r("/database", shellWrap("Database Manager", "Basis data terstruktur dan tabel dinamis", DatabaseApp)),
  r("/deliverable-manager", shellWrap("Deliverable Manager", "Pelacakan serah terima deliverable proyek", DeliverableManagerApp)),
  r("/documents", shellWrap("Documents", "Pusat dokumen dan arsip digital", DocumentsApp)),
  r("/eisenhower", shellWrap("Eisenhower Matrix", "Prioritisasi tugas berdasarkan urgensi dan kepentingan", EisenhowerApp)),
  r("/expense-tracker", shellWrap("Expense Tracker", "Pencatatan pengeluaran harian dan operasional", ExpenseTrackerApp)),
  r("/pomodoro", shellWrap("Focus Timer", "Timer Pomodoro untuk sesi deep work", FocusTimerApp)),
  r("/forms", shellWrap("Forms Builder", "Pembuat formulir dan survei digital", FormsApp)),
  r("/goal-manager", shellWrap("Goal Manager", "Penetapan OKR, sasaran, dan milestone terukur", GoalManagerApp)),
  r("/habit-tracker", shellWrap("Habit Tracker", "Pelacak kebiasaan produktif harian", HabitTrackerApp)),
  r("/interaction-manager", shellWrap("Interaction Manager", "Riwayat interaksi dan relasi stakeholder", InteractionManagerApp)),
  r("/kanban", shellWrap("Kanban Board", "Papan visual alur kerja tugas", KanbanApp)),
  r("/knowledge-base", shellWrap("Knowledge Base", "Dokumentasi SOP dan basis pengetahuan tim", KnowledgeBaseApp)),
  r("/komunitas-warga", shellWrap("Komunitas Warga", "Portal iuran, pengurus, dan aspirasi warga", KomunitasWargaApp)),
  r("/meeting-manager", shellWrap("Meeting Manager", "Agenda, notulensi, dan tindak lanjut rapat", MeetingManagerApp)),
  r("/milestone-manager", shellWrap("Milestone Manager", "Pemantauan pencapaian fase proyek", MilestoneManagerApp)),
  r("/notes", shellWrap("Notes", "Catatan cepat dan dokumentasi kerja", NotesApp)),
  r("/notification-center", shellWrap("Notification Center", "Pusat pemberitahuan dan pembaruan aktivitas", NotificationCenterApp)),
  r("/people-manager", shellWrap("People Manager", "Direktori anggota, peran, dan struktur tim", PeopleManagerApp)),
  r("/planner", shellWrap("Planner", "Perencanaan harian dan alokasi jadwal", PlannerApp)),
  r("/proyek", shellWrap(UNIFIED_PROJECT_MODULE.title, UNIFIED_PROJECT_MODULE.subtitle, ProjectExecutionUnifiedPage)),
  r("/reminder-manager", shellWrap("Reminder Manager", "Pengingat tenggat waktu dan tindak lanjut", ReminderManagerApp)),
  r("/research-manager", shellWrap("Research Manager", "Pengelolaan riset pasar dan referensi industri", ResearchManagerApp)),
  r("/resource-manager", shellWrap("Resource Manager", "Alokasi kapasitas sumber daya dan tim", ResourceManagerApp)),
  r("/schedule-manager", shellWrap("Schedule Manager", "Pengaturan jadwal publikasi dan operasional", ScheduleManagerApp)),
  r("/search-manager", shellWrap("Search Manager", "Pencarian lintas modul dan arsip terpadu", SearchManagerApp)),
  r("/statistics", shellWrap("Statistics", "Statistik performa dan metrik operasional", StatisticsApp)),
  r("/subscription-manager", shellWrap("Subscription Manager", "Pemantauan layanan langganan dan tagihan berulang", SubscriptionManagerApp)),
  r("/task-manager", shellWrap("Task Manager", "Pengelolaan daftar tugas dan tenggat kerja", TaskManagerApp)),
  r("/template-manager", shellWrap("Template Manager", "Pustaka template dokumen kerja standar", TemplateManagerApp)),
  r("/time-tracker", shellWrap("Time Tracker", "Pencatatan jam kerja dan alokasi waktu proyek", TimeTrackerApp)),
  r("/timeline", shellWrap("Timeline", "Linimasa visual jadwal dan milestone", TimelineApp)),
  r("/web-clipper", shellWrap("Web Clipper", "Arsip artikel dan referensi web", WebClipperApp)),
  r("/wiki", shellWrap("Wiki", "Ensiklopedia internal dan panduan tim", WikiApp)),
  r("/workflow-manager", shellWrap("Workflow Manager", "Desain dan otomasi alur kerja", WorkflowManagerApp)),

  // Special Drawer, Registry, & Alias routes
  r("/digital-assets", () => <LainnyaWorkspace initialAppId="digital-assets" />),
  r("/real-estate", PehRealEstateView),
  r("/intellectual-property", PehIpLicensesView),
  r("/shareholder-registry", PehCapTableView),
  r("/reports", () => <LainnyaWorkspace initialAppId="custom-reports" />),
  r("/audit-log", () => <LainnyaWorkspace initialAppId="access-matrix" />),
  r("/decision-log", () => <LainnyaWorkspace initialAppId="minutes" />),
  r("/risk-management", PehIncidentsView),
  r("/wallet", () => <WiraView type="budget" />),
  r("/pocket", () => <WiraView type="subscriptions" />),
  r("/pouch", LifeOSTravelView),
  r("/vault", PehVaultView),
  r("/trunk", LifeOSHouseholdView),

  // All PEH Routes (49)
  r("/peh/global-overview", PehGlobalOverviewView),
  r("/peh/innovations-hub", PehInnovationsHubView),
  r("/peh/ecosystem-comparison", PehEcosystemComparisonView),
  r("/peh/habits", PehHabitsView),
  r("/peh/journal", PehJournalView),
  r("/peh/goals", PehGoalsView),
  r("/peh/reading", PehReadingView),
  r("/peh/fitness", PehFitnessView),
  r("/peh/sleep", PehSleepView),
  r("/peh/vault", PehVaultView),
  r("/peh/documents", PehDocumentsView),
  r("/peh/subscriptions", PehSubscriptionsView),
  r("/peh/budget", PehBudgetView),
  r("/peh/insurance", PehInsuranceView),
  r("/peh/chores", PehChoresView),
  r("/peh/maintenance", PehMaintenanceView),
  r("/peh/pantry", PehPantryView),
  r("/peh/plants", PehPlantsView),
  r("/peh/vehicles", PehVehiclesView),
  r("/peh/family-tree", PehFamilyTreeView),
  r("/peh/family-health", PehFamilyHealthView),
  r("/peh/family-recipes", PehFamilyRecipesView),
  r("/peh/traditions", PehTraditionsView),
  r("/peh/family-budget", PehFamilyBudgetView),
  r("/peh/pet-care", PehPetCareView),
  r("/peh/workflows", PehWorkflowsView),
  r("/peh/vendors", PehVendorsView),
  r("/peh/incidents", PehIncidentsView),
  r("/peh/procurement", PehProcurementView),
  r("/peh/compliance", PehComplianceView),
  r("/peh/assets", PehAssetsView),
  r("/peh/ip-licenses", PehIpLicensesView),
  r("/peh/cap-table", PehCapTableView),
  r("/peh/investments", PehInvestmentsView),
  r("/peh/real-estate", PehRealEstateView),
  r("/peh/contacts", PehContactsView),
  r("/peh/milestones", PehMilestonesView),
  r("/peh/gifts", PehGiftsView),
  r("/peh/introductions", PehIntroductionsView),
  r("/peh/mentorship", PehMentorshipView),
  r("/peh/knowledge", PehKnowledgeView),
  r("/peh/meetings", PehMeetingsView),
  r("/peh/projects", PehProjectsView),
  r("/peh/tasks", PehTasksView),
  r("/peh/time-audit", PehTimeAuditView),
  r("/peh/civic", PehCivicView),
  r("/peh/volunteering", PehVolunteeringView),
  r("/peh/charity", PehCharityView),
  r("/peh/community-events", PehCommunityEventsView),
  r("/peh/advocacy", PehAdvocacyView),

  // All LifeOS Routes (19)
  r("/life/life-planner", LifeOSPlannerView),
  r("/life/finance-os", LifeOSFinanceView),
  r("/life/simple-finance", LifeOSSimpleFinanceView),
  r("/life/budget-tracker", LifeOSBudgetView),
  r("/life/weight-tracker", LifeOSWeightView),
  r("/life/doctor-consultation", LifeOSDoctorView),
  r("/life/household-tracker", LifeOSHouseholdView),
  r("/life/wishlist", LifeOSWishlistView),
  r("/life/grocery-list", LifeOSGroceryView),
  r("/life/movie-tracker", LifeOSMovieView),
  r("/life/recipe-book", LifeOSRecipeView),
  r("/life/certificate-tracker", LifeOSCertificateView),
  r("/life/travel-backpack", LifeOSTravelView),
  r("/life/notes", LifeOSNotesView),
  r("/life/journal", LifeOSJournalView),
  r("/life/habits", LifeOSHabitsView),
  r("/life/contacts", LifeOSContactsView),
  r("/life/subscriptions", LifeOSSubscriptionsView),
  r("/life/assets", LifeOSAssetsView),

  catchAllRoute,
]);

export function getRouter(queryClient: QueryClient) {
  return createRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: "intent",
  });
}
