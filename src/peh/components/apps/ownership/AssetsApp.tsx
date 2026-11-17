import React from "react";
import { PEHGenericApp } from "../../common/PEHGenericApp";

export const AssetsApp: React.FC = () => (
  <PEHGenericApp
    moduleKey="ownership_assets"
    title="Aset Modal & Inventaris"
    subtitle="Daftar inventaris bernilai tinggi, penempatan & depresiasi"
    iconName="Layers"
    categories={["Perangkat Kerja", "Mesin & Alat", "Kendaraan Bisnis", "Furnitur", "Inventaris Gudang"]}
    addButtonLabel="Tambah Aset Modal"
    titlePlaceholder="Misal: Workstation MacBook Pro M4"
    metricLabel="Nilai Perolehan / Lokasi"
  />
);
export default AssetsApp;
