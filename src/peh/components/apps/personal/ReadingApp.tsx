import React from "react";
import { PEHGenericApp } from "../../common/PEHGenericApp";

export const ReadingApp: React.FC = () => (
  <PEHGenericApp
    moduleKey="personal_reading"
    title="Buku & Bahan Bacaan"
    subtitle="Pelacak target membaca buku, kutipan inspiratif & rak bacaan"
    iconName="Book"
    categories={["Bisnis & Strategi", "Keuangan", "Biografi", "Filsafat", "Teknologi"]}
    addButtonLabel="Tambah Bacaan"
    titlePlaceholder="Misal: Good Strategy Bad Strategy"
    metricLabel="Halaman / Progres Baca"
  />
);
export default ReadingApp;
