import React from "react";
import { PEHGenericApp } from "../../common/PEHGenericApp";

export const ProcurementApp: React.FC = () => (
  <PEHGenericApp
    moduleKey="operations_procurement"
    title="Pengadaan & Pembelian"
    subtitle="Alur pengajuan belanja, Purchase Orders & matriks otorisasi"
    iconName="ShoppingCart"
    categories={["Purchase Order", "Pengadaan Aset", "Operasional", "Jasa Eksternal", "ATK"]}
    addButtonLabel="Buat Pengajuan PO"
    titlePlaceholder="Misal: PO #2026-041 Pengadaan Perangkat Kerja"
    metricLabel="Nilai PO / Vendor"
  />
);
export default ProcurementApp;
