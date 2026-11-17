import React from "react";
import { PEHGenericApp } from "../../common/PEHGenericApp";

export const HabitsApp: React.FC = () => (
  <PEHGenericApp
    moduleKey="personal_habits"
    title="Habit & Rutinitas"
    subtitle="Pelacak kebiasaan harian & konsistensi ritme hidup"
    iconName="Repeat"
    categories={["Kesehatan", "Produktivitas", "Spiritual", "Pembelajaran", "Keluarga"]}
    addButtonLabel="Tambah Habit"
    titlePlaceholder="Misal: Olahraga Pagi 30 Menit"
    metricLabel="Target / Streak"
  />
);
export default HabitsApp;
