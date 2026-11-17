import React from "react";
import { PEHGenericApp } from "../../common/PEHGenericApp";

export const CharityApp: React.FC = () => (
  <PEHGenericApp
    moduleKey="society_charity"
    title="Filantropi & Donasi"
    subtitle="Rekapitulasi donasi sosial, komitmen zakat & laporan dampak"
    iconName="Coins"
    categories={["Zakat & Infaq", "Beasiswa", "Kemanusiaan", "Wakaf Produktif", "Rumah Ibadah"]}
    addButtonLabel="Catat Donasi"
    titlePlaceholder="Misal: Penyaluran Zakat Maal Tahunan"
    metricLabel="Nominal / Lembaga Penyalur"
  />
);
export default CharityApp;
