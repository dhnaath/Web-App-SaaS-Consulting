import React from "react";
import { PEHGenericApp } from "../../common/PEHGenericApp";

export const InvestmentsApp: React.FC = () => (
  <PEHGenericApp
    moduleKey="ownership_investments"
    title="Portofolio Investasi"
    subtitle="Alokasi aset instrumen pasar modal, yield dividen & reksa dana"
    iconName="TrendingUp"
    categories={["Saham Bluechip", "Reksa Dana", "SBN / Obligasi", "Deposito", "Emas & Komoditas"]}
    addButtonLabel="Tambah Posisi Investasi"
    titlePlaceholder="Misal: SBN Ritel ORI026 Tenor 3 Tahun"
    metricLabel="Nilai Investasi / Imbal Hasil"
  />
);
export default InvestmentsApp;
