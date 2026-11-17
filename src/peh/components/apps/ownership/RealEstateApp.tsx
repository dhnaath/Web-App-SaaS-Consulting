import React from "react";
import { PEHGenericApp } from "../../common/PEHGenericApp";

export const RealEstateApp: React.FC = () => (
  <PEHGenericApp
    moduleKey="ownership_real_estate"
    title="Properti & Lahan Komersial"
    subtitle="Portofolio tanah, bangunan komersial, penyewa & estimasi cap rate"
    iconName="Building"
    categories={["Rumah Tinggal", "Ruko / Komersial", "Apartemen", "Lahan Produktif", "Gudang"]}
    addButtonLabel="Tambah Properti"
    titlePlaceholder="Misal: Unit Perkantoran Sudirman Lt. 12"
    metricLabel="Valuasi / Sewa Tahunan"
  />
);
export default RealEstateApp;
