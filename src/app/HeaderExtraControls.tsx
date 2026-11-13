import React, { useState } from "react";
import { Info, ArrowUpDown, Settings } from "lucide-react";

interface HeaderExtraControlsProps {
  isTopPanelOpen?: boolean;
  onToggleTopPanel?: () => void;
  onOpenInfo?: () => void;
  isLightOnDark?: boolean;
}

export function HeaderExtraControls({
  isTopPanelOpen = false,
  onToggleTopPanel,
  onOpenInfo,
  isLightOnDark = false,
}: HeaderExtraControlsProps) {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleInfo = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent("app-info"));
    if (onOpenInfo) {
      onOpenInfo();
    }
  };

  const handleSort = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(nextOrder);
    window.dispatchEvent(
      new CustomEvent("app-sort", { detail: { order: nextOrder } })
    );
  };

  const handleSettings = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleTopPanel) {
      onToggleTopPanel();
    }
  };

  const baseBtnClass = isLightOnDark
    ? "size-9 rounded-full aspect-square shrink-0 transition-colors text-white/90 hover:text-white hover:bg-white/20 cursor-pointer flex items-center justify-center"
    : "size-9 rounded-full aspect-square shrink-0 transition-colors text-muted-foreground hover:text-foreground hover:bg-accent cursor-pointer flex items-center justify-center";

  const settingsBtnClass = isTopPanelOpen
    ? "size-9 rounded-full aspect-square shrink-0 transition-colors bg-primary text-primary-foreground font-bold shadow-2xs cursor-pointer flex items-center justify-center"
    : baseBtnClass;

  return (
    <div className="relative z-10 flex items-center gap-0.5 sm:gap-1 shrink-0">
      {/* 1. Ikon Info */}
      <button
        type="button"
        onClick={handleInfo}
        className={baseBtnClass}
        title="Informasi Sistem & Pintasan Keyboard"
        aria-label="Informasi"
      >
        <Info size={20} className="shrink-0" />
      </button>

      {/* 2. Ikon Sortir */}
      <button
        type="button"
        onClick={handleSort}
        className={baseBtnClass}
        title={`Sortir / Urutkan Data (${sortOrder === "asc" ? "Menaik A-Z" : "Menurun Z-A"})`}
        aria-label="Sortir"
      >
        <ArrowUpDown
          size={20}
          className={`shrink-0 transition-transform duration-200 ${
            sortOrder === "desc" ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* 3. Ikon Gear Setting (Sementara) */}
      <button
        type="button"
        onClick={handleSettings}
        className={settingsBtnClass}
        title={
          isTopPanelOpen
            ? "Tutup Panel Pengaturan Atas"
            : "Pengaturan (Akun, Tema & Preferensi)"
        }
        aria-label="Toggle panel pengaturan atas"
      >
        <Settings size={20} className="shrink-0" />
      </button>
    </div>
  );
}
