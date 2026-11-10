import React from "react";
import { createRoute, type AnyRoute } from "@tanstack/react-router";
import { AppShell } from "@/app/app-shell";
import { ValueTreatedPage } from "@/features/value-treated/ValueTreatedPage";
import { WorkProductivityPage } from "@/features/work-productivity/WorkProductivityPage";
import { PersonalLifePage } from "@/features/personal-life/PersonalLifePage";
import {
  BIZ_OPS_SUMMARY_DESC,
  BusinessOperationsCustomersPage,
} from "@/features/business-operations/BusinessOperationsCustomersPage";
import { KnowledgeAndLearningPage } from "@/features/knowledge-learning/KnowledgeAndLearningPage";
import { HomeLeisurePage } from "@/features/home-leisure/HomeLeisurePage";
import { FamilyCommunityPage } from "@/features/family-community/FamilyCommunityPage";
import { IslamicPrinciplesShariaValuesPage } from "@/features/syariah/IslamicPrinciplesShariaValuesPage";
import { CreativeWorkspaceMediaPage } from "@/features/creative-workspace/CreativeWorkspaceMediaPage";
import { ResearchFrameworksPage } from "@/features/research-frameworks/ResearchFrameworksPage";
import { FamilyRecordsHouseholdPage } from "@/features/family-records/FamilyRecordsHouseholdPage";
import { PublicRelationsPolicyAffairsPage } from "@/features/public-affairs/PublicRelationsPolicyAffairsPage";
import { ContactDirectoryNetworksPage } from "@/features/social-networks/ContactDirectoryNetworksPage";
import { FinancialWealthSection } from "@/features/launcher/FinancialWealthSection";
import { useFavorites } from "@/hooks/useFavorites";

function WorkProductivityView() {
  return (
    <AppShell
      title="Productivity Workspace and Workflow Systems"
      subtitle="Semua (9) · Planning (1) · Workflow (2) · Resources (2) · Coordination (1) · Governance (2) · Ownership (1)"
    >
      <WorkProductivityPage />
    </AppShell>
  );
}

function PersonalLifeView() {
  return (
    <AppShell
      title="Personal Life Management"
      subtitle="Semua (6) · Pengembangan (1) · Refleksi (1) · Kesehatan (2) · Utilitas (2)"
    >
      <PersonalLifePage />
    </AppShell>
  );
}

function BusinessOperationsCustomersView() {
  return (
    <AppShell
      title="Business Administration and Operations Management"
      subtitle={BIZ_OPS_SUMMARY_DESC}
    >
      <BusinessOperationsCustomersPage />
    </AppShell>
  );
}

function KnowledgeAndLearningView() {
  return (
    <AppShell
      title="Knowledge and Learning"
      subtitle="Semua (7) · Documents (3) · Learning (2) · Creative (2)"
    >
      <KnowledgeAndLearningPage />
    </AppShell>
  );
}

function HomeLeisureView() {
  return (
    <AppShell
      title="Home and Leisure"
      subtitle="Semua (6) · Home (2) · Vehicle (2) · Leisure (2)"
    >
      <HomeLeisurePage />
    </AppShell>
  );
}

function FamilyCommunityView() {
  return (
    <AppShell
      title="Family and Community"
      subtitle="Semua (9) · Family (3) · Relationships (2) · Neighborhood (3) · Giving (1)"
    >
      <FamilyCommunityPage />
    </AppShell>
  );
}

function IslamicPrinciplesShariaValuesView() {
  return (
    <AppShell
      title="Islamic Principles and Sharia Values"
      subtitle="Semua (16) · Sosial (3) · Komersial (5) · Proteksi (1) · Simpanan (1) · Zakat (3) · Investasi (1) · Kepatuhan (2)"
    >
      <IslamicPrinciplesShariaValuesPage />
    </AppShell>
  );
}

function CreativeWorkspaceMediaView() {
  return (
    <AppShell
      title="Creative Workspace and Media Production"
      subtitle="Semua (6) · Studio (2) · Publishing (1) · Media (2) · Interactive (1)"
    >
      <CreativeWorkspaceMediaPage />
    </AppShell>
  );
}

function ResearchFrameworksView() {
  return (
    <AppShell
      title="Research Foundations and Reference Frameworks"
      subtitle="Semua (6) · Frameworks (2) · Reference (2) · Research (2)"
    >
      <ResearchFrameworksPage />
    </AppShell>
  );
}

function FamilyRecordsHouseholdView() {
  return (
    <AppShell
      title="Family Records and Household Planning"
      subtitle="Semua (6) · Keluarga (3) · Rumah Tangga (2) · Kendaraan (1)"
    >
      <FamilyRecordsHouseholdPage />
    </AppShell>
  );
}

function PublicRelationsPolicyAffairsView() {
  return (
    <AppShell
      title="Public Affairs and Relations"
      subtitle="Semua (6) · Civic (3) · Policy (2) · Media (1)"
    >
      <PublicRelationsPolicyAffairsPage />
    </AppShell>
  );
}

function ContactDirectoryNetworksView() {
  return (
    <AppShell
      title="Contact Directory and Social Networks"
      subtitle="Semua (6) · Direktori (2) · Relasi (2) · Jaringan (2)"
    >
      <ContactDirectoryNetworksPage />
    </AppShell>
  );
}

function FinancialPlanningWealthView() {
  const { favorites, toggleFavorite } = useFavorites();
  return (
    <AppShell
      title="Financial Planning and Wealth Management"
      subtitle="Semua (25) · Surety (5) · Flow (5) · Build (5) · Grow (5) · Legacy (5)"
    >
      <div className="w-full max-w-[1815px] mx-auto px-2 sm:px-4 py-2">
        <FinancialWealthSection
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          getGradient={() => "from-emerald-500 to-teal-700"}
        />
      </div>
    </AppShell>
  );
}

export function createDomainHubRoutes(parentRoute: AnyRoute) {
  return [
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/value-treated",
      component: ValueTreatedPage,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/work-productivity",
      component: WorkProductivityView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/work",
      component: WorkProductivityView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/app-module",
      component: WorkProductivityView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/productivity",
      component: WorkProductivityView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/personal-life",
      component: PersonalLifeView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/personal-life-hub",
      component: PersonalLifeView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/personal",
      component: PersonalLifeView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/business-operations",
      component: BusinessOperationsCustomersView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/business-operations-and-customers",
      component: BusinessOperationsCustomersView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/business-ops",
      component: BusinessOperationsCustomersView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/knowledge-and-learning",
      component: KnowledgeAndLearningView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/knowledge-learning",
      component: KnowledgeAndLearningView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/home-and-leisure",
      component: HomeLeisureView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/home-leisure",
      component: HomeLeisureView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/family-and-community",
      component: FamilyCommunityView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/family-community",
      component: FamilyCommunityView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/sharia-values",
      component: IslamicPrinciplesShariaValuesView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/islamic-principles",
      component: IslamicPrinciplesShariaValuesView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/creative-workspace",
      component: CreativeWorkspaceMediaView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/research-frameworks",
      component: ResearchFrameworksView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/family-records",
      component: FamilyRecordsHouseholdView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/public-affairs",
      component: PublicRelationsPolicyAffairsView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/social-networks",
      component: ContactDirectoryNetworksView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/financial-planning",
      component: FinancialPlanningWealthView,
    }),
  ];
}
