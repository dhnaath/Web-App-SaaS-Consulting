const REVISED_ROUTES = new Set<string>([
  "/business-administration-and-operations-management",
  "/business-operations",
  "/100-framework",
  "/100-komoditas",
  "/financial-planning-and-wealth-management",
  "/financial-wealth",
  "/value-treated",
  "/valuetreated",
  "/applied-value",
  "/kurasi-wealth",
  "/islamic-principles-and-sharia-values",
  "/syariah",
]);

export function isNewlyRevisedApp(route?: string, _title?: string): boolean {
  if (!route) return false;
  const base = route.split("?")[0];
  return REVISED_ROUTES.has(base);
}
