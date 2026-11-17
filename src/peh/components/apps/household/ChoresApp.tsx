import React from "react";
import { PEHGenericApp } from "../../common/PEHGenericApp";

export const ChoresApp: React.FC = () => (
  <PEHGenericApp
    moduleKey="household_chores"
    title="Tugas Domestik & Kebersihan"
    subtitle="Distribusi tanggung jawab kebersihan rumah & ceklis berkala"
    iconName="CheckSquare"
    categories={["Harian", "Mingguan", "Bulanan", "Area Dapur", "Area Taman"]}
    addButtonLabel="Tambah Tugas Rumah"
    titlePlaceholder="Misal: Ganti Filter Air Dapur"
    metricLabel="PIC / Frekuensi"
  />
);
export default ChoresApp;
