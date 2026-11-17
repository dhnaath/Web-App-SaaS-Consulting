import React from "react";
import { PEHGenericApp } from "../../common/PEHGenericApp";

export const GoalsApp: React.FC = () => (
  <PEHGenericApp
    moduleKey="personal_goals"
    title="Target & Sasaran"
    subtitle="Peta jalan sasaran jangka pendek & panjang dengan tahapan checkpoint"
    iconName="Target"
    categories={["Karier", "Finansial", "Kesehatan", "Keluarga", "Pengembangan Diri"]}
    addButtonLabel="Tambah Target"
    titlePlaceholder="Misal: Sertifikasi Konsultan Q3"
    metricLabel="Target Capaian / Tenggat"
  />
);
export default GoalsApp;
