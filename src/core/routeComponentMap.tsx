import React from "react";
import { slugify, SLUG_TO_FRAMEWORK_NAME } from "@/frameworkData";
import { CURRICULUM_DISCIPLINES } from "@/features/curated/curriculumData";

import {
  HomeDashboardPage,
  PartnerWorkspacePage,
  PortalWorkspacePage,
} from "@/routes/CorePortals";

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
import { IslamicPrinciplesShariaValuesPage } from "@/features/syariah/IslamicPrinciplesShariaValuesPage";
import { KnowledgeAndLearningPage } from "@/features/knowledge-learning/KnowledgeAndLearningPage";
import { FamilyCommunityPage } from "@/features/family-community/FamilyCommunityPage";
import { HomeLeisurePage } from "@/features/home-leisure/HomeLeisurePage";

import CuratedApp from "@/features/curated/App";
import CreditApp from "@/features/credit/App";
import ProductApp from "@/features/product/App";

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
import { ProjectManagerApp } from "@/features/project-manager/ProjectManagerApp";
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

import { FinancialWealthSection } from "@/features/launcher/FinancialWealthSection";
import { Tools100Section, getToolsGradient } from "@/features/launcher/Tools100Section";
import { getGradient } from "@/features/launcher/ModeSectionView";
import { useFavorites } from "@/hooks/useFavorites";

function EmbeddedFinancialWealth() {
  const { favorites, toggleFavorite } = useFavorites();
  return (
    <FinancialWealthSection
      favorites={favorites}
      toggleFavorite={toggleFavorite}
      getGradient={getGradient}
    />
  );
}

function EmbeddedTools100() {
  const { favorites, toggleFavorite } = useFavorites();
  return (
    <Tools100Section
      favorites={favorites}
      toggleFavorite={toggleFavorite}
      getGradient={getToolsGradient}
    />
  );
}

const STATIC_ROUTE_FACTORIES: Record<string, () => React.ReactNode> = {
  "/home": () => <HomeDashboardPage />,
  "/partner": () => <PartnerWorkspacePage />,
  "/portal": () => <PortalWorkspacePage defaultTab="overview" />,
  "/portal/pesan": () => <PortalWorkspacePage defaultTab="messages" />,
  "/klien": () => <KlienWorkspaceView />,
  "/client-hub": () => <KlienWorkspaceView />,
  "/catatan": () => <CatatanView />,
  "/lainnya": () => <LainnyaView />,

  "/financial-planning-and-wealth-management": () => <EmbeddedFinancialWealth />,
  "/financial-planning": () => <EmbeddedFinancialWealth />,
  "/financial-wealth": () => <EmbeddedFinancialWealth />,
  "/100-framework": () => <EmbeddedTools100 />,
  "/value-treated": () => <ValueTreatedPage />,
  "/applied-value": () => <ValueTreatedPage />,
  "/valuetreated": () => <ValueTreatedPage />,
  "/kurasi-wealth": () => <ValueTreatedPage />,
  "/kurasi": () => <CuratedApp />,
  "/100-komoditas": () => <CommodityView />,
  "/10-indeks": () => <CommodityView />,
  "/physical-commodities": () => <CommodityView />,
  "/valuasi": () => <ValuationView />,
  "/incoterms": () => <IncotermsView />,
  "/water": () => <WaterView />,
  "/zakat": () => <ZakatAppView />,
  "/pajak": () => <TaxAppView />,
  "/investasi": () => <InvestmentAppView />,
  "/syariah": () => <IslamicPrinciplesShariaValuesPage />,
  "/syariah/akad": () => <ShariaAkadView />,
  "/syariah/terlarang": () => <ShariaTerlarangView />,
  "/syariah/asuransi": () => <ShariaAsuransiView />,
  "/kredit": () => <CreditApp />,
  "/katalog-produk": () => <ProductApp />,
  "/knowledge-and-learning": () => <KnowledgeAndLearningPage />,
  "/family-and-community": () => <FamilyCommunityPage />,
  "/family-community": () => <FamilyCommunityPage />,
  "/home-and-leisure": () => <HomeLeisurePage />,
  "/home-leisure": () => <HomeLeisurePage />,

  // Matrix & Spectrum
  "/asset": () => <MatrixAssetView />,
  "/earning": () => <MatrixEarningView />,
  "/liability": () => <MatrixLiabilityView />,
  "/expense": () => <MatrixExpenseView />,
  "/financial-health": () => <MatrixFinancialHealthView />,
  "/swot": () => <MatrixSwotView />,
  "/tows": () => <MatrixTowsView />,
  "/surety": () => <SpectrumStageView stage="surety" />,
  "/flow": () => <SpectrumStageView stage="flow" />,
  "/build": () => <SpectrumStageView stage="build" />,
  "/grow": () => <SpectrumStageView stage="grow" />,
  "/legacy": () => <SpectrumStageView stage="legacy" />,
  "/liquid-reserves": () => <SpectrumStageView stage="surety" />,
  "/paper-securities": () => <SpectrumStageView stage="grow" />,
  "/finance": () => <SpectrumStageView stage="flow" />,

  // Society & Phase Side
  "/development": () => <SocietyView type="development" />,
  "/improvement": () => <SocietyView type="improvement" />,
  "/reliance": () => <SocietyView type="reliance" />,
  "/sufficient": () => <SocietyView type="sufficient" />,
  "/interact": () => <SocietyView type="interact" />,
  "/interdependence": () => <SocietyView type="interdependence" />,
  "/interest": () => <SocietyView type="interest" />,
  "/intersect": () => <SocietyView type="intersect" />,
  "/insider": () => <SocietyView type="insider" />,
  "/insight": () => <SocietyView type="insight" />,
  "/outward": () => <SocietyView type="outward" />,
  "/outlook": () => <SocietyView type="outlook" />,

  // Dedicated Framework Paths
  "/pestel": () => <FrameworkByNameView name="PESTEL Analysis" />,
  "/porter": () => <FrameworkByNameView name="Porter's Five Forces" />,
  "/vrio": () => <FrameworkByNameView name="VRIO Framework" />,
  "/value-chain": () => <FrameworkByNameView name="Value Chain Analysis" />,
  "/bcg": () => <FrameworkByNameView name="BCG Matrix" />,
  "/ge-mckinsey": () => <FrameworkByNameView name="GE-McKinsey Matrix" />,
  "/ansoff": () => <FrameworkByNameView name="Ansoff Matrix" />,
  "/blue-ocean": () => <FrameworkByNameView name="Blue Ocean Strategy (ERRC)" />,
  "/value-disciplines": () => <FrameworkByNameView name="Value Disciplines Model" />,
  "/bmc": () => <FrameworkByNameView name="Business Model Canvas (BMC)" />,
  "/lean-canvas": () => <FrameworkByNameView name="Lean Canvas" />,
  "/value-proposition-canvas": () => <FrameworkByNameView name="Value Proposition Canvas" />,
  "/empathy-map": () => <FrameworkByNameView name="Empathy Map" />,
  "/stp": () => <FrameworkByNameView name="STP Model (Segmentation-Targeting-Positioning)" />,
  "/marketing-mix": () => <FrameworkByNameView name="Marketing Mix (7Ps / 4Ps)" />,
  "/customer-journey-map": () => <FrameworkByNameView name="Customer Journey Map" />,
  "/kano-model": () => <FrameworkByNameView name="Kano Feature Prioritization" />,
  "/product-life-cycle": () => <FrameworkByNameView name="Product Life Cycle (PLC)" />,

  // Wira
  "/budget": () => <WiraView type="budget" />,
  "/code": () => <WiraView type="code" />,
  "/contacts": () => <WiraView type="contacts" />,
  "/courses": () => <WiraView type="courses" />,
  "/design": () => <WiraView type="design" />,
  "/exams": () => <WiraView type="exams" />,
  "/flashcards": () => <WiraView type="flashcards" />,
  "/games": () => <WiraView type="games" />,
  "/health": () => <WiraView type="health" />,
  "/ideas": () => <WiraView type="ideas" />,
  "/inventory": () => <WiraView type="inventory" />,
  "/journal": () => <WiraView type="journal" />,
  "/kalkulator": () => <WiraView type="kalkulator" />,
  "/languages": () => <WiraView type="languages" />,
  "/movies": () => <WiraView type="movies" />,
  "/music": () => <WiraView type="music" />,
  "/passwords": () => <WiraView type="passwords" />,
  "/photography": () => <WiraView type="photography" />,
  "/podcasts": () => <WiraView type="podcasts" />,
  "/proyek-personal": () => <WiraView type="proyek-personal" />,
  "/reading": () => <WiraView type="reading" />,
  "/recipes": () => <WiraView type="recipes" />,
  "/shopping": () => <WiraView type="shopping" />,
  "/subscriptions": () => <WiraView type="subscriptions" />,
  "/trips": () => <WiraView type="trips" />,
  "/weather": () => <WiraView type="weather" />,
  "/workouts": () => <WiraView type="workouts" />,
  "/writing": () => <WiraView type="writing" />,

  // Standalone Apps
  "/approval-manager": () => <ApprovalManagerApp />,
  "/asset-manager": () => <AssetManagerApp />,
  "/bookmarks": () => <BookmarkManagerApp />,
  "/calendar": () => <CalendarApp />,
  "/kalender": () => <CalendarApp />,
  "/collaboration": () => <CollaborationApp />,
  "/countdown": () => <CountdownApp />,
  "/database": () => <DatabaseApp />,
  "/deliverable-manager": () => <DeliverableManagerApp />,
  "/documents": () => <DocumentsApp />,
  "/eisenhower": () => <EisenhowerApp />,
  "/expense-tracker": () => <ExpenseTrackerApp />,
  "/pomodoro": () => <FocusTimerApp />,
  "/forms": () => <FormsApp />,
  "/goal-manager": () => <GoalManagerApp />,
  "/habit-tracker": () => <HabitTrackerApp />,
  "/interaction-manager": () => <InteractionManagerApp />,
  "/kanban": () => <KanbanApp />,
  "/knowledge-base": () => <KnowledgeBaseApp />,
  "/komunitas-warga": () => <KomunitasWargaApp />,
  "/meeting-manager": () => <MeetingManagerApp />,
  "/milestone-manager": () => <MilestoneManagerApp />,
  "/notes": () => <NotesApp />,
  "/notification-center": () => <NotificationCenterApp />,
  "/people-manager": () => <PeopleManagerApp />,
  "/planner": () => <PlannerApp />,
  "/proyek": () => <ProjectManagerApp />,
  "/reminder-manager": () => <ReminderManagerApp />,
  "/research-manager": () => <ResearchManagerApp />,
  "/resource-manager": () => <ResourceManagerApp />,
  "/schedule-manager": () => <ScheduleManagerApp />,
  "/search-manager": () => <SearchManagerApp />,
  "/statistics": () => <StatisticsApp />,
  "/subscription-manager": () => <SubscriptionManagerApp />,
  "/task-manager": () => <TaskManagerApp />,
  "/template-manager": () => <TemplateManagerApp />,
  "/time-tracker": () => <TimeTrackerApp />,
  "/timeline": () => <TimelineApp />,
  "/web-clipper": () => <WebClipperApp />,
  "/wiki": () => <WikiApp />,
  "/workflow-manager": () => <WorkflowManagerApp />,

  // Special Drawer, Registry & Aliases
  "/digital-assets": () => <LainnyaWorkspace initialAppId="digital-assets" />,
  "/real-estate": () => <PehRealEstateView />,
  "/intellectual-property": () => <PehIpLicensesView />,
  "/shareholder-registry": () => <PehCapTableView />,
  "/reports": () => <LainnyaWorkspace initialAppId="custom-reports" />,
  "/audit-log": () => <LainnyaWorkspace initialAppId="access-matrix" />,
  "/decision-log": () => <LainnyaWorkspace initialAppId="minutes" />,
  "/risk-management": () => <PehIncidentsView />,
  "/wallet": () => <WiraView type="budget" />,
  "/pocket": () => <WiraView type="subscriptions" />,
  "/pouch": () => <LifeOSTravelView />,
  "/vault": () => <PehVaultView />,
  "/trunk": () => <LifeOSHouseholdView />,

  // PEH
  "/peh/global-overview": () => <PehGlobalOverviewView />,
  "/peh/innovations-hub": () => <PehInnovationsHubView />,
  "/peh/ecosystem-comparison": () => <PehEcosystemComparisonView />,
  "/peh/habits": () => <PehHabitsView />,
  "/peh/journal": () => <PehJournalView />,
  "/peh/goals": () => <PehGoalsView />,
  "/peh/reading": () => <PehReadingView />,
  "/peh/fitness": () => <PehFitnessView />,
  "/peh/sleep": () => <PehSleepView />,
  "/peh/vault": () => <PehVaultView />,
  "/peh/documents": () => <PehDocumentsView />,
  "/peh/subscriptions": () => <PehSubscriptionsView />,
  "/peh/budget": () => <PehBudgetView />,
  "/peh/insurance": () => <PehInsuranceView />,
  "/peh/chores": () => <PehChoresView />,
  "/peh/maintenance": () => <PehMaintenanceView />,
  "/peh/pantry": () => <PehPantryView />,
  "/peh/plants": () => <PehPlantsView />,
  "/peh/vehicles": () => <PehVehiclesView />,
  "/peh/family-tree": () => <PehFamilyTreeView />,
  "/peh/family-health": () => <PehFamilyHealthView />,
  "/peh/family-recipes": () => <PehFamilyRecipesView />,
  "/peh/traditions": () => <PehTraditionsView />,
  "/peh/family-budget": () => <PehFamilyBudgetView />,
  "/peh/pet-care": () => <PehPetCareView />,
  "/peh/workflows": () => <PehWorkflowsView />,
  "/peh/vendors": () => <PehVendorsView />,
  "/peh/incidents": () => <PehIncidentsView />,
  "/peh/procurement": () => <PehProcurementView />,
  "/peh/compliance": () => <PehComplianceView />,
  "/peh/assets": () => <PehAssetsView />,
  "/peh/ip-licenses": () => <PehIpLicensesView />,
  "/peh/cap-table": () => <PehCapTableView />,
  "/peh/investments": () => <PehInvestmentsView />,
  "/peh/real-estate": () => <PehRealEstateView />,
  "/peh/contacts": () => <PehContactsView />,
  "/peh/milestones": () => <PehMilestonesView />,
  "/peh/gifts": () => <PehGiftsView />,
  "/peh/introductions": () => <PehIntroductionsView />,
  "/peh/mentorship": () => <PehMentorshipView />,
  "/peh/knowledge": () => <PehKnowledgeView />,
  "/peh/meetings": () => <PehMeetingsView />,
  "/peh/projects": () => <PehProjectsView />,
  "/peh/tasks": () => <PehTasksView />,
  "/peh/time-audit": () => <PehTimeAuditView />,
  "/peh/civic": () => <PehCivicView />,
  "/peh/volunteering": () => <PehVolunteeringView />,
  "/peh/charity": () => <PehCharityView />,
  "/peh/community-events": () => <PehCommunityEventsView />,
  "/peh/advocacy": () => <PehAdvocacyView />,

  // LifeOS
  "/life/life-planner": () => <LifeOSPlannerView />,
  "/life/finance-os": () => <LifeOSFinanceView />,
  "/life/simple-finance": () => <LifeOSSimpleFinanceView />,
  "/life/budget-tracker": () => <LifeOSBudgetView />,
  "/life/weight-tracker": () => <LifeOSWeightView />,
  "/life/doctor-consultation": () => <LifeOSDoctorView />,
  "/life/household-tracker": () => <LifeOSHouseholdView />,
  "/life/wishlist": () => <LifeOSWishlistView />,
  "/life/grocery-list": () => <LifeOSGroceryView />,
  "/life/movie-tracker": () => <LifeOSMovieView />,
  "/life/recipe-book": () => <LifeOSRecipeView />,
  "/life/certificate-tracker": () => <LifeOSCertificateView />,
  "/life/travel-backpack": () => <LifeOSTravelView />,
  "/life/notes": () => <LifeOSNotesView />,
  "/life/journal": () => <LifeOSJournalView />,
  "/life/habits": () => <LifeOSHabitsView />,
  "/life/contacts": () => <LifeOSContactsView />,
  "/life/subscriptions": () => <LifeOSSubscriptionsView />,
  "/life/assets": () => <LifeOSAssetsView />,
};

export function resolveEmbeddedRouteElement(rawRoute?: string): React.ReactNode | null {
  if (!rawRoute) return null;
  const cleanPath = rawRoute.split("?")[0].trim();
  if (!cleanPath) return null;

  const factory = STATIC_ROUTE_FACTORIES[cleanPath];
  if (factory) {
    return factory();
  }

  if (cleanPath.startsWith("/framework/")) {
    const slug = cleanPath.slice("/framework/".length);
    const normalized = slugify(slug);
    const name = SLUG_TO_FRAMEWORK_NAME[normalized] || SLUG_TO_FRAMEWORK_NAME[slug] || slug;
    return <FrameworkByNameView name={name} />;
  }

  if (cleanPath.startsWith("/kurasi/")) {
    const chapter = cleanPath.slice("/kurasi/".length).toLowerCase();
    const disc = CURRICULUM_DISCIPLINES.find((d) => d.slug === chapter);
    return <CuratedApp initialChapterId={disc?.id ?? 1} />;
  }

  return null;
}
