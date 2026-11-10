import React from "react";
import { createRoute, type AnyRoute } from "@tanstack/react-router";
import {
  ShariaAkadView,
  ShariaTerlarangView,
  ShariaAsuransiView,
  ZakatAppView,
  TaxAppView,
  InvestmentAppView,
  ValuationView,
  CommodityView,
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
} from "@/features/nonWhiteApps/NonWhiteAppRenderer";
import { NationalIndicesDashboard } from "@/routes/national-indices";

export function createAnalyticsRoutes(parentRoute: AnyRoute) {
  return [
    // Non-White Market & Syariah
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/syariah/indeks",
      component: CommodityView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/syariah/akad",
      component: ShariaAkadView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/syariah/terlarang",
      component: ShariaTerlarangView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/syariah/asuransi",
      component: ShariaAsuransiView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/syariah",
      component: CommodityView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/zakat",
      component: ZakatAppView,
    }),

    // Tax & Investment & Valuation
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/pajak",
      component: TaxAppView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/investasi",
      component: InvestmentAppView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/valuasi",
      component: ValuationView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/100-komoditas",
      component: CommodityView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/commodity-dashboard",
      component: CommodityView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/10-indeks",
      component: NationalIndicesDashboard,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/indeks-pembangunan",
      component: NationalIndicesDashboard,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/incoterms",
      component: IncotermsView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/water",
      component: WaterView,
    }),

    // Quadrants & Matrices
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/asset",
      component: MatrixAssetView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/earning",
      component: MatrixEarningView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/liability",
      component: MatrixLiabilityView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/expense",
      component: MatrixExpenseView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/financial-health",
      component: MatrixFinancialHealthView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/swot",
      component: MatrixSwotView,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/tows",
      component: MatrixTowsView,
    }),

    // Spectrum Stages
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/grow",
      component: () => <SpectrumStageView stage="grow" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/flow",
      component: () => <SpectrumStageView stage="flow" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/build",
      component: () => <SpectrumStageView stage="build" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/legacy",
      component: () => <SpectrumStageView stage="legacy" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/surety",
      component: () => <SpectrumStageView stage="surety" />,
    }),

    // Society Views
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/development",
      component: () => <SocietyView type="development" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/improvement",
      component: () => <SocietyView type="improvement" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/reliance",
      component: () => <SocietyView type="reliance" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/sufficient",
      component: () => <SocietyView type="sufficient" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/interact",
      component: () => <SocietyView type="interact" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/interdependence",
      component: () => <SocietyView type="interdependence" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/interest",
      component: () => <SocietyView type="interest" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/intersect",
      component: () => <SocietyView type="intersect" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/insider",
      component: () => <SocietyView type="insider" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/insight",
      component: () => <SocietyView type="insight" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/outward",
      component: () => <SocietyView type="outward" />,
    }),
    createRoute({
      getParentRoute: () => parentRoute,
      path: "/outlook",
      component: () => <SocietyView type="outlook" />,
    }),
  ];
}
