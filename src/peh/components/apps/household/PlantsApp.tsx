import React from "react";
import { PEHGenericApp } from "../../common/PEHGenericApp";

export const PlantsApp: React.FC = () => (
  <PEHGenericApp
    moduleKey="household_plants"
    title="Tanaman & Kebun"
    subtitle="Jadwal penyiraman, pemupukan, repotting & log kesehatan flora"
    iconName="Sprout"
    categories={["Tanaman Hias", "Hidroponik", "Buah & Sayur", "Bunga", "Pemupukan"]}
    addButtonLabel="Tambah Tanaman"
    titlePlaceholder="Misal: Monstera Deliciosa - Teras Depan"
    metricLabel="Jadwal Siram / Pupuk"
  />
);
export default PlantsApp;
