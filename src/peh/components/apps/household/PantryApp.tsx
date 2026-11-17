import React from "react";
import { PEHGenericApp } from "../../common/PEHGenericApp";

export const PantryApp: React.FC = () => (
  <PEHGenericApp
    moduleKey="household_pantry"
    title="Dapur & Stok Bahan Makanan"
    subtitle="Inventaris bahan pangan, bumbu dapur & radar kedaluwarsa"
    iconName="Utensils"
    categories={["Bahan Pokok", "Sayur & Buah", "Protein", "Bumbu Dapur", "Minuman"]}
    addButtonLabel="Tambah Stok Dapur"
    titlePlaceholder="Misal: Beras Organik 10 kg"
    metricLabel="Jumlah / Tanggal Kedaluwarsa"
  />
);
export default PantryApp;
