import React from "react";
import { PEHGenericApp } from "../../common/PEHGenericApp";

export const FitnessApp: React.FC = () => (
  <PEHGenericApp
    moduleKey="personal_fitness"
    title="Latihan & Olahraga"
    subtitle="Log sesi latihan fisik, kalori, intensitas detak & beban latihan"
    iconName="Dumbbell"
    categories={["Kardio", "Kekuatan", "Mobilitas", "Lari", "Renang"]}
    addButtonLabel="Catat Latihan"
    titlePlaceholder="Misal: Lari Pagi Zona 2 - 5 km"
    metricLabel="Durasi / Kalori"
  />
);
export default FitnessApp;
