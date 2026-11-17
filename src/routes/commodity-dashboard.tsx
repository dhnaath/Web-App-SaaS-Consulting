import React, { useEffect, useMemo, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { AppShell } from "@/app/app-shell";
import { HeaderNavPills, ShellHeader } from "@/app/shell-header";
import {
  COMMODITY_DATA,
  type CommodityItem,
  type PricingType,
  type UpdateCadence,
} from "@/commodityData";
import { MACRO_PRICE_INDICES_DATA, type MacroPriceIndexItem } from "@/data/priceIndicesData";
import { NAVIGATOR_CARDS } from "@/features/commodity/data/commodityLinks";
import { CommodityCatalogSection } from "@/features/commodity/components/CommodityCatalogSection";
import { MacroPriceIndicesSection } from "@/features/commodity/components/MacroPriceIndicesSection";
import { SpotQuotesSection } from "@/features/commodity/components/SpotQuotesSection";
import {
  CommodityDetailModal,
  JsonSchemaModal,
  MacroIndexDetailModal,
} from "@/features/commodity/components/CommodityModals";
import { NationalIndicesSection } from "@/features/launcher/NationalIndicesSection";
import { cn } from "@/lib/utils";
import { Database, Download, LayoutGrid, Table as TableIcon } from "lucide-react";

function normalizeTabParam(raw?: string | null): string {
  if (!raw) return "commodity_all";
  const v = raw.trim().toLowerCase();
  if (v === "syariah" || v === "saham_syariah") return "saham_syariah";
  if (v === "national" || v === "national_indices") return "national_indices";
  if (v === "makro" || v === "indeks_harga_makro") return "indeks_harga_makro";
  if (v === "logam" || v === "logam_mulia") return "logam_mulia";
  if (v === "global" || v === "indeks_global") return "indeks_global";
  const matched = NAVIGATOR_CARDS.find((c) => c.id.toLowerCase() === v);
  return matched ? matched.id : "commodity_all";
}

export function CommodityDashboard() {
  const searchStr = useRouterState({ select: (s) => s.location.searchStr });
  const tabParam = useMemo(
    () => new URLSearchParams(searchStr || "").get("tab"),
    [searchStr],
  );

  const [activeNavigatorTab, setActiveNavigatorTab] = useState<string>(() =>
    normalizeTabParam(tabParam),
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [selectedCadence, setSelectedCadence] = useState<UpdateCadence | "Semua">("Semua");
  const [selectedSource, setSelectedSource] = useState<string>("Semua");
  const [selectedPricingType, setSelectedPricingType] = useState<PricingType | "Semua">("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"table" | "cards">("cards");
  const [sortBy, setSortBy] = useState<"id" | "nama" | "harga" | "cadence">("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const [selectedItem, setSelectedItem] = useState<CommodityItem | null>(null);
  const [selectedMacroItem, setSelectedMacroItem] = useState<MacroPriceIndexItem | null>(null);
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [notifyMsg, setNotifyMsg] = useState<string | null>(null);

  useEffect(() => {
    if (tabParam) {
      const next = normalizeTabParam(tabParam);
      setActiveNavigatorTab(next);
      const isSectorCard = COMMODITY_DATA.some((c) => c.kategori === next);
      setSelectedCategory(isSectorCard ? next : "Semua");
    }
  }, [tabParam]);

  const showToast = (msg: string) => {
    setNotifyMsg(msg);
    setTimeout(() => setNotifyMsg(null), 2600);
  };

  const handleSelectNavCard = (cardId: string) => {
    setActiveNavigatorTab(cardId);
    const isSector = COMMODITY_DATA.some((c) => c.kategori === cardId);
    setSelectedCategory(isSector ? cardId : "Semua");
  };

  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const list = COMMODITY_DATA.filter((item) => {
      if (selectedCategory !== "Semua" && item.kategori !== selectedCategory) return false;
      if (selectedCadence !== "Semua" && item.updateCadence !== selectedCadence) return false;
      if (selectedSource !== "Semua" && item.sumberData !== selectedSource) return false;
      if (selectedPricingType !== "Semua" && item.jenisBatas !== selectedPricingType) return false;
      if (q) {
        const hit =
          item.nama.toLowerCase().includes(q) ||
          item.kategori.toLowerCase().includes(q) ||
          item.sumberData.toLowerCase().includes(q) ||
          item.statusRegulasi.toLowerCase().includes(q);
        if (!hit) return false;
      }
      return true;
    });

    return [...list].sort((a, b) => {
      const dir = sortDirection === "asc" ? 1 : -1;
      if (sortBy === "nama") return a.nama.localeCompare(b.nama) * dir;
      if (sortBy === "harga") return (a.hargaTerbaru - b.hargaTerbaru) * dir;
      if (sortBy === "cadence") return a.updateCadence.localeCompare(b.updateCadence) * dir;
      return (a.id - b.id) * dir;
    });
  }, [
    selectedCategory,
    selectedCadence,
    selectedSource,
    selectedPricingType,
    searchQuery,
    sortBy,
    sortDirection,
  ]);

  const groupedCategories = useMemo(() => {
    const groups = new Map<string, CommodityItem[]>();
    for (const item of filteredData) {
      const list = groups.get(item.kategori) || [];
      list.push(item);
      groups.set(item.kategori, list);
    }
    return Array.from(groups.entries()).map(([category, items]) => ({
      category,
      items,
    }));
  }, [filteredData]);

  const handleResetSort = () => {
    setSortBy("id");
    setSortDirection("asc");
  };

  const handleResetAllFilters = () => {
    setSelectedCategory("Semua");
    setSelectedCadence("Semua");
    setSelectedSource("Semua");
    setSelectedPricingType("Semua");
    setSearchQuery("");
    handleResetSort();
  };

  const handleExportCSV = () => {
    const headers = [
      "ID",
      "Komoditas",
      "Kategori",
      "Harga",
      "Mata Uang",
      "Satuan",
      "Jenis Batas",
      "Sumber",
      "Cadence",
    ];
    const rows = filteredData.map((d) => [
      d.id,
      `"${d.nama.replace(/"/g, '""')}"`,
      `"${d.kategori.replace(/"/g, '""')}"`,
      d.hargaTerbaru,
      d.mataUang,
      d.satuan,
      `"${d.jenisBatas}"`,
      `"${d.sumberData.replace(/"/g, '""')}"`,
      d.updateCadence,
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "100-komoditas-acuan.csv";
    link.click();
    URL.revokeObjectURL(url);
    showToast("Data 100 komoditas berhasil diekspor ke CSV!");
  };

  const handleExportMacroCSV = () => {
    const headers = ["No", "Kode", "Nama Indeks", "Kategori", "Nilai", "YoY", "Sumber"];
    const rows = MACRO_PRICE_INDICES_DATA.map((m) => [
      m.number,
      m.code,
      `"${m.name.replace(/"/g, '""')}"`,
      `"${m.category}"`,
      `"${m.formatNilai.replace(/"/g, '""')}"`,
      `"${m.perubahanYoY}"`,
      `"${m.sumberResmi.replace(/"/g, '""')}"`,
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "8-indeks-harga-makro.csv";
    link.click();
    URL.revokeObjectURL(url);
    showToast("Data 8 indeks harga makro diekspor ke CSV!");
  };

  const handleCopyAllJson = () => {
    navigator.clipboard.writeText(JSON.stringify(COMMODITY_DATA, null, 2));
    showToast("Seluruh 100 entitas JSON komoditas disalin ke clipboard!");
  };

  const showSpotQuotes =
    activeNavigatorTab === "logam_mulia" ||
    activeNavigatorTab === "indeks_global" ||
    activeNavigatorTab === "saham_syariah" ||
    activeNavigatorTab === "spot_realtime";

  const showMacroIndices = activeNavigatorTab === "indeks_harga_makro";
  const showNationalIndices = activeNavigatorTab === "national_indices";

  return (
    <AppShell
      title="100 Komoditas & Indeks Ekonomi"
      subtitle="Pantauan harga acuan komoditas pangan, energi, logam mulia, saham syariah, dan indeks makro BPS/BI"
    >
      <ShellHeader>
        <HeaderNavPills
          items={NAVIGATOR_CARDS.slice(0, 6).map((c) => ({
            id: c.id,
            label: c.label,
          }))}
          activeId={activeNavigatorTab}
          onSelect={(id) => handleSelectNavCard(String(id))}
        />
      </ShellHeader>

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 py-4 space-y-6">
        {notifyMsg && (
          <div className="fixed bottom-24 right-6 z-50 px-4 py-2.5 rounded-xl bg-neutral-900 text-white text-xs font-semibold shadow-xl border border-white/10">
            {notifyMsg}
          </div>
        )}

        {/* Navigator Bar & Toolbar */}
        <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
                Pusat Data Komoditas, Logam Mulia & Indeks Nasional
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Pilih fokus data melalui kartu navigator di bawah untuk menyaring sektor atau tolok ukur makro.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1 p-1 bg-muted/60 rounded-xl border border-border">
                <button
                  type="button"
                  onClick={() => setViewMode("cards")}
                  className={cn(
                    "p-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                    viewMode === "cards"
                      ? "bg-primary text-primary-foreground shadow-2xs"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  title="Tampilan Kartu"
                >
                  <LayoutGrid size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("table")}
                  className={cn(
                    "p-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                    viewMode === "table"
                      ? "bg-primary text-primary-foreground shadow-2xs"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  title="Tampilan Tabel"
                >
                  <TableIcon size={15} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-background hover:bg-muted text-xs font-semibold text-foreground transition-colors cursor-pointer"
              >
                <Download size={14} />
                <span>Ekspor CSV</span>
              </button>

              <button
                type="button"
                onClick={() => setIsJsonModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Database size={14} />
                <span>Skema JSON</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
            {NAVIGATOR_CARDS.map((card) => {
              const Icon = card.icon;
              const isActive = activeNavigatorTab === card.id;
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => handleSelectNavCard(card.id)}
                  className={cn(
                    "text-left p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-2",
                    isActive
                      ? cn("bg-card shadow-sm ring-2", card.borderActive, card.ringActive)
                      : "bg-muted/30 border-border/70 hover:bg-muted/60",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={cn("p-1.5 rounded-lg", card.bgLight, card.color)}>
                      <Icon size={15} />
                    </span>
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-background border border-border/60 text-muted-foreground">
                      {card.badge}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground leading-tight truncate">
                      {card.label}
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-0.5 truncate">
                      {card.subtext}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Sections */}
        {showNationalIndices && <NationalIndicesSection isEmbedded hideHeaderBanner={false} />}

        {showMacroIndices && (
          <MacroPriceIndicesSection
            showSectionHeader={false}
            onSelectMacroItem={(item) => setSelectedMacroItem(item)}
            handleExportCSV={handleExportMacroCSV}
          />
        )}

        {showSpotQuotes && <SpotQuotesSection activeNavigatorTab={activeNavigatorTab} />}

        <CommodityCatalogSection
          activeNavigatorTab={activeNavigatorTab}
          filteredData={filteredData}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            if (cat === "Semua") setActiveNavigatorTab("commodity_all");
          }}
          selectedCadence={selectedCadence}
          onSelectCadence={setSelectedCadence}
          selectedSource={selectedSource}
          onSelectSource={setSelectedSource}
          selectedPricingType={selectedPricingType}
          onSelectPricingType={setSelectedPricingType}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          viewMode={viewMode}
          sortBy={sortBy}
          sortDirection={sortDirection}
          onResetSort={handleResetSort}
          onResetAllFilters={handleResetAllFilters}
          onSelectItem={(item) => setSelectedItem(item)}
          groupedCategories={groupedCategories}
        />

        <CommodityDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onCopyNotify={showToast}
        />

        <MacroIndexDetailModal
          item={selectedMacroItem}
          onClose={() => setSelectedMacroItem(null)}
          onCopyNotify={showToast}
        />

        <JsonSchemaModal
          isOpen={isJsonModalOpen}
          onClose={() => setIsJsonModalOpen(false)}
          onCopyAllJson={handleCopyAllJson}
        />
      </div>
    </AppShell>
  );
}

export default CommodityDashboard;
