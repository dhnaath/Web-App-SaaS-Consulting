import React from "react";
import { PEHGenericApp } from "../../common/PEHGenericApp";

export const FamilyRecipesApp: React.FC = () => (
  <PEHGenericApp
    moduleKey="family_recipes"
    title="Resep Warisan Keluarga"
    subtitle="Buku resep turun-temurun, takaran porsi & bumbu khas"
    iconName="ChefHat"
    categories={["Masakan Utama", "Kue Tradisional", "Sambal & Bumbu", "Minuman", "Menu Lebaran"]}
    addButtonLabel="Tambah Resep"
    titlePlaceholder="Misal: Rendang Padang Nenek"
    metricLabel="Porsi / Waktu Masak"
  />
);
export default FamilyRecipesApp;
