import React from "react";
import { PEHGenericApp } from "../../common/PEHGenericApp";

export const CapTableApp: React.FC = () => (
  <PEHGenericApp
    moduleKey="ownership_cap_table"
    title="Struktur Saham & Ekuitas"
    subtitle="Tabel pemegang saham (Cap Table), persentase kepemilikan & vesting"
    iconName="PieChart"
    categories={["Pendiri (Founders)", "Investor", "ESOP", "Saham Preferen", "Obligasi Konversi"]}
    addButtonLabel="Tambah Pemegang Saham"
    titlePlaceholder="Misal: PT Investama Nusantara - Seri A"
    metricLabel="Jumlah Lembar / Porsi Ekuitas"
  />
);
export default CapTableApp;
