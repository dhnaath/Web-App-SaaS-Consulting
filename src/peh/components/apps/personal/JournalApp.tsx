import React from "react";
import { PEHGenericApp } from "../../common/PEHGenericApp";

export const JournalApp: React.FC = () => (
  <PEHGenericApp
    moduleKey="personal_journal"
    title="Jurnal & Mood"
    subtitle="Ruang refleksi privat, pencatatan suasana hati & pemikiran harian"
    iconName="BookOpen"
    categories={["Refleksi Harian", "Gratitude", "Evaluasi", "Mood Log", "Ide"]}
    addButtonLabel="Tulis Jurnal"
    titlePlaceholder="Misal: Evaluasi pencapaian minggu ini"
    metricLabel="Suasana Hati / Energi"
  />
);
export default JournalApp;
