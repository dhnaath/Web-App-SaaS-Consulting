import React from "react";
import {
  createRoute,
  useNavigate,
  useRouterState,
  type AnyRoute,
} from "@tanstack/react-router";
import { AppShell } from "@/app/app-shell";
import { navKonsultan, type NavItem } from "@/config/nav";
import { STANDALONE_APPS } from "@/features/standalone/standaloneAppsData";
import { StandaloneAppView } from "@/features/standalone/StandaloneAppView";
import { ArrowLeft } from "lucide-react";

// PEH Imports
import {
  PehHabitsView,
  PehJournalView,
  PehGoalsView,
  PehReadingView,
  PehFitnessView,
  PehSleepView,
  PehVaultView,
  PehDocumentsView,
  PehSubscriptionsView,
  PehBudgetView,
  PehInsuranceView,
  PehChoresView,
  PehMaintenanceView,
  PehPantryView,
  PehPlantsView,
  PehVehiclesView,
  PehFamilyTreeView,
  PehFamilyHealthView,
  PehFamilyRecipesView,
  PehTraditionsView,
  PehFamilyBudgetView,
  PehPetCareView,
  PehWorkflowsView,
  PehVendorsView,
  PehIncidentsView,
  PehProcurementView,
  PehComplianceView,
  PehAssetsView,
  PehIpLicensesView,
  PehCapTableView,
  PehInvestmentsView,
  PehRealEstateView,
  PehContactsView,
  PehMilestonesView,
  PehGiftsView,
  PehIntroductionsView,
  PehMentorshipView,
  PehKnowledgeView,
  PehMeetingsView,
  PehProjectsView,
  PehTasksView,
  PehTimeAuditView,
  PehCivicView,
  PehVolunteeringView,
  PehCharityView,
  PehCommunityEventsView,
  PehAdvocacyView,
  PehGlobalOverviewView,
  PehInnovationsHubView,
  PehEcosystemComparisonView,
} from "@/peh/PehAppRenderer";

// LifeOS Imports
import {
  LifeOSPlannerView,
  LifeOSFinanceView,
  LifeOSSimpleFinanceView,
  LifeOSBudgetView,
  LifeOSWeightView,
  LifeOSDoctorView,
  LifeOSHouseholdView,
  LifeOSWishlistView,
  LifeOSGroceryView,
  LifeOSMovieView,
  LifeOSRecipeView,
  LifeOSCertificateView,
  LifeOSTravelView,
  LifeOSNotesView,
  LifeOSJournalView,
  LifeOSHabitsView,
  LifeOSContactsView,
  LifeOSSubscriptionsView,
  LifeOSAssetsView,
} from "@/life-os/LifeOSAppRenderer";

// Fallback views
import {
  CommodityView,
  ShariaAkadView,
  ShariaTerlarangView,
  ShariaAsuransiView,
  ZakatAppView,
  TaxAppView,
  InvestmentAppView,
  ValuationView,
  IncotermsView,
  WaterView,
  MatrixAssetView,
  MatrixEarningView,
  MatrixLiabilityView,
  MatrixExpenseView,
  MatrixFinancialHealthView,
  MatrixSwotView,
  MatrixTowsView,
  SpectrumStageView,
  SocietyView,
  FrameworkByNameView,
  WiraView,
  KlienWorkspaceView,
  CatatanView,
  LainnyaView,
} from "@/features/nonWhiteApps/NonWhiteAppRenderer";
import { ValueTreatedPage } from "@/features/value-treated/ValueTreatedPage";
import { NationalIndicesDashboard } from "@/routes/national-indices";

function PartnerAreaPlaceholder() {
  return (
    <AppShell title="Ruang Kerja Mitra" subtitle="Akses Khusus Mitra DNA Consulting">
      <div className="w-full max-w-4xl mx-auto p-6 bg-card border border-border rounded-2xl shadow-xs text-center space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Ruang Kerja Mitra</h1>
        <p className="text-muted-foreground text-sm max-w-lg mx-auto">
          Halaman ruang kerja mitra belum diaktifkan pada tahap ini. Hubungi administrator untuk informasi akses kemitraan.
        </p>
      </div>
    </AppShell>
  );
}

function PortalAreaPlaceholder() {
  return (
    <AppShell title="Portal Klien" subtitle="Pusat Kolaborasi Klien & Proyek">
      <div className="w-full max-w-4xl mx-auto p-6 bg-card border border-border rounded-2xl shadow-xs text-center space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Portal Klien</h1>
        <p className="text-muted-foreground text-sm max-w-lg mx-auto">
          Halaman portal klien belum diaktifkan pada tahap ini. Hubungi konsultan pembimbing Anda untuk deliverables proyek.
        </p>
      </div>
    </AppShell>
  );
}

function AksesDitolakPlaceholder() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card border border-destructive/20 rounded-2xl p-6 shadow-sm text-center space-y-4">
        <h1 className="text-xl font-bold text-destructive">Akses Ditolak</h1>
        <p className="text-muted-foreground text-sm">
          Sesi Anda tidak valid atau tidak memiliki izin untuk mengakses halaman ini.
        </p>
      </div>
    </div>
  );
}

function DynamicAppView() {
  const routerState = useRouterState();
  const navigate = useNavigate();
  const pathname = routerState.location.pathname.replace(/\/$/, "");
  const search = (routerState.location.search || {}) as Record<string, any>;
  const currentAppParam = typeof search?.app === "string" ? search.app : "";

  // PEH / PFS / POO routes
  const pehMap: Record<string, React.ComponentType> = {
    "/peh/habits": PehHabitsView,
    "/peh/journal": PehJournalView,
    "/peh/goals": PehGoalsView,
    "/peh/reading": PehReadingView,
    "/peh/fitness": PehFitnessView,
    "/peh/sleep": PehSleepView,
    "/peh/vault": PehVaultView,
    "/peh/documents": PehDocumentsView,
    "/peh/subscriptions": PehSubscriptionsView,
    "/peh/budget": PehBudgetView,
    "/peh/insurance": PehInsuranceView,
    "/peh/chores": PehChoresView,
    "/peh/maintenance": PehMaintenanceView,
    "/peh/pantry": PehPantryView,
    "/peh/plants": PehPlantsView,
    "/peh/vehicles": PehVehiclesView,
    "/peh/family-tree": PehFamilyTreeView,
    "/peh/family-health": PehFamilyHealthView,
    "/peh/family-recipes": PehFamilyRecipesView,
    "/peh/traditions": PehTraditionsView,
    "/peh/family-budget": PehFamilyBudgetView,
    "/peh/pet-care": PehPetCareView,
    "/peh/workflows": PehWorkflowsView,
    "/peh/vendors": PehVendorsView,
    "/peh/incidents": PehIncidentsView,
    "/peh/procurement": PehProcurementView,
    "/peh/compliance": PehComplianceView,
    "/peh/assets": PehAssetsView,
    "/peh/ip-licenses": PehIpLicensesView,
    "/peh/cap-table": PehCapTableView,
    "/peh/investments": PehInvestmentsView,
    "/peh/real-estate": PehRealEstateView,
    "/peh/contacts": PehContactsView,
    "/peh/milestones": PehMilestonesView,
    "/peh/gifts": PehGiftsView,
    "/peh/introductions": PehIntroductionsView,
    "/peh/mentorship": PehMentorshipView,
    "/peh/knowledge": PehKnowledgeView,
    "/peh/meetings": PehMeetingsView,
    "/peh/projects": PehProjectsView,
    "/peh/tasks": PehTasksView,
    "/peh/time-audit": PehTimeAuditView,
    "/peh/civic": PehCivicView,
    "/peh/volunteering": PehVolunteeringView,
    "/peh/charity": PehCharityView,
    "/peh/community-events": PehCommunityEventsView,
    "/peh/advocacy": PehAdvocacyView,
    "/peh/global-overview": PehGlobalOverviewView,
    "/peh/innovations-hub": PehInnovationsHubView,
    "/peh/ecosystem-comparison": PehEcosystemComparisonView,
  };

  const PehComponent = pehMap[pathname];
  if (PehComponent) {
    return <PehComponent />;
  }

  // LifeOS routes
  const lifeMap: Record<string, React.ComponentType> = {
    "/life/life-planner": LifeOSPlannerView,
    "/life/finance-os": LifeOSFinanceView,
    "/life/simple-finance": LifeOSSimpleFinanceView,
    "/life/budget-tracker": LifeOSBudgetView,
    "/life/weight-tracker": LifeOSWeightView,
    "/life/doctor-consultation": LifeOSDoctorView,
    "/life/household-tracker": LifeOSHouseholdView,
    "/life/wishlist": LifeOSWishlistView,
    "/life/grocery-list": LifeOSGroceryView,
    "/life/movie-tracker": LifeOSMovieView,
    "/life/recipe-book": LifeOSRecipeView,
    "/life/certificate-tracker": LifeOSCertificateView,
    "/life/travel-backpack": LifeOSTravelView,
    "/life/notes": LifeOSNotesView,
    "/life/journal": LifeOSJournalView,
    "/life/habits": LifeOSHabitsView,
    "/life/contacts": LifeOSContactsView,
    "/life/subscriptions": LifeOSSubscriptionsView,
    "/life/assets": LifeOSAssetsView,
  };

  const LifeComponent = lifeMap[pathname];
  if (LifeComponent) {
    return <LifeComponent />;
  }

  // Sharia routes
  if (pathname === "/syariah/indeks") return <CommodityView />;
  if (pathname === "/syariah/akad") return <ShariaAkadView />;
  if (pathname === "/syariah/terlarang") return <ShariaTerlarangView />;
  if (pathname === "/syariah/asuransi") return <ShariaAsuransiView />;
  if (pathname === "/syariah") return <CommodityView />;
  if (pathname === "/zakat") return <ZakatAppView />;

  // Value Treated & Finance
  if (pathname === "/value-treated" || pathname === "/applied-value") return <ValueTreatedPage />;
  if (pathname === "/pajak") return <TaxAppView />;
  if (pathname === "/investasi") return <InvestmentAppView />;
  if (pathname === "/valuasi") return <ValuationView />;
  if (pathname === "/100-komoditas" || pathname === "/commodity-dashboard") return <CommodityView />;
  if (pathname === "/10-indeks" || pathname === "/indeks-pembangunan") return <NationalIndicesDashboard />;
  if (pathname === "/incoterms") return <IncotermsView />;
  if (pathname === "/water") return <WaterView />;

  // Matrix & Quadrants
  if (pathname === "/asset") return <MatrixAssetView />;
  if (pathname === "/earning") return <MatrixEarningView />;
  if (pathname === "/liability") return <MatrixLiabilityView />;
  if (pathname === "/expense") return <MatrixExpenseView />;
  if (pathname === "/financial-health") return <MatrixFinancialHealthView />;
  if (pathname === "/swot") return <MatrixSwotView />;
  if (pathname === "/tows") return <MatrixTowsView />;

  // Spectrum Stages
  if (pathname === "/grow") return <SpectrumStageView stage="grow" />;
  if (pathname === "/flow") return <SpectrumStageView stage="flow" />;
  if (pathname === "/build") return <SpectrumStageView stage="build" />;
  if (pathname === "/legacy") return <SpectrumStageView stage="legacy" />;
  if (pathname === "/surety") return <SpectrumStageView stage="surety" />;

  // Society Views
  if (pathname === "/development") return <SocietyView type="development" />;
  if (pathname === "/improvement") return <SocietyView type="improvement" />;
  if (pathname === "/reliance") return <SocietyView type="reliance" />;
  if (pathname === "/sufficient") return <SocietyView type="sufficient" />;
  if (pathname === "/interact") return <SocietyView type="interact" />;
  if (pathname === "/interdependence") return <SocietyView type="interdependence" />;
  if (pathname === "/interest") return <SocietyView type="interest" />;
  if (pathname === "/intersect") return <SocietyView type="intersect" />;
  if (pathname === "/insider") return <SocietyView type="insider" />;
  if (pathname === "/insight") return <SocietyView type="insight" />;
  if (pathname === "/outward") return <SocietyView type="outward" />;
  if (pathname === "/outlook") return <SocietyView type="outlook" />;

  // Framework Views
  const frameworkMap: Record<string, string> = {
    "/bcg": "BCG Matrix",
    "/pestel": "PESTEL Analysis",
    "/porter": "Porter's Five Forces",
    "/ge-mckinsey": "GE McKinsey Matrix",
    "/ansoff": "Ansoff Matrix",
    "/blue-ocean": "Blue Ocean Strategy",
    "/bmc": "Business Model Canvas (BMC)",
    "/lean-canvas": "Lean Canvas",
    "/value-proposition-canvas": "Value Proposition Canvas",
    "/customer-journey-map": "Customer Journey Map",
    "/empathy-map": "Empathy Map",
    "/kano-model": "Kano Model",
    "/marketing-mix": "Marketing Mix (7P/4P)",
    "/product-life-cycle": "Product Life Cycle",
    "/stp": "STP (Segmentation, Targeting, Positioning)",
    "/value-chain": "Value Chain Analysis",
    "/value-disciplines": "Value Disciplines",
    "/vrio": "VRIO Framework",
    "/100-framework": "Katalog 100 Framework",
  };
  if (frameworkMap[pathname]) {
    return <FrameworkByNameView name={frameworkMap[pathname]} />;
  }

  // Wira personal & productivity views
  const wiraKeys = [
    "budget", "code", "contacts", "courses", "design", "exams",
    "flashcards", "games", "health", "ideas", "inventory", "journal",
    "kalkulator", "languages", "movies", "music", "passwords", "photography",
    "podcasts", "proyek-personal", "reading", "recipes", "shopping",
    "subscriptions", "trips", "weather", "workouts", "writing"
  ];
  const matchedWira = wiraKeys.find((k) => pathname === "/" + k);
  if (matchedWira) {
    return <WiraView type={matchedWira} />;
  }

  // Client & Notes & Custom Workspace
  if (pathname === "/klien") return <KlienWorkspaceView />;
  if (pathname === "/catatan") return <CatatanView />;
  if (pathname === "/lainnya") return <LainnyaView />;

  // Standalone app requested via query or path
  const effectiveAppKey = currentAppParam || (pathname.startsWith("/") ? pathname.slice(1) : pathname);
  if (effectiveAppKey && STANDALONE_APPS[effectiveAppKey]) {
    const standaloneConfig = STANDALONE_APPS[effectiveAppKey];
    return (
      <AppShell title={standaloneConfig.title} subtitle={standaloneConfig.subtitle}>
        <div className="w-full">
          <StandaloneAppView appId={effectiveAppKey} />
        </div>
      </AppShell>
    );
  }

  // Fallback: search nav for matching metadata
  let matchedItem: NavItem | undefined;
  let matchedGroupTitle = "Workspace";
  for (const group of navKonsultan) {
    for (const item of group.items) {
      if (item.to === pathname || (currentAppParam && item.to.includes(currentAppParam))) {
        matchedItem = item;
        matchedGroupTitle = group.title;
        break;
      }
    }
    if (matchedItem) break;
  }

  const title = matchedItem?.label || currentAppParam || pathname.replace("/", "").replace(/-/g, " ");

  return (
    <AppShell title={title} subtitle={matchedGroupTitle + " — All in One Workspace"}>
      <div className="w-full max-w-[1720px] mx-auto p-4 sm:p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-card border border-border rounded-[1.25rem] p-4 sm:p-6 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate({ to: "/" })}
              className="p-2.5 rounded-xl border border-border bg-background hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              title="Kembali ke Launcher"
            >
              <ArrowLeft className="size-5" />
            </button>
            <div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-primary/10 text-primary">
                {matchedGroupTitle}
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground capitalize mt-1">
                {title}
              </h1>
            </div>
          </div>
          <button
            onClick={() => navigate({ to: "/" })}
            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium shadow-xs hover:opacity-95 transition-opacity cursor-pointer"
          >
            Beranda Launcher
          </button>
        </div>
      </div>
    </AppShell>
  );
}

export function createDynamicRoutes(parentRoute: AnyRoute) {
  return [
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/partner",
      component: PartnerAreaPlaceholder,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/portal",
      component: PortalAreaPlaceholder,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/akses-ditolak",
      component: AksesDitolakPlaceholder,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "$",
      component: DynamicAppView,
    }),
  ];
}
