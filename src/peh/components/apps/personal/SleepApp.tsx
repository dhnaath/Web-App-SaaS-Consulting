import React from "react";
import { PEHGenericApp } from "../../common/PEHGenericApp";

export const SleepApp: React.FC = () => (
  <PEHGenericApp
    moduleKey="personal_sleep"
    title="Tidur & Pemulihan"
    subtitle="Kualitas tidur, jam istirahat malam & pemantauan pemulihan harian"
    iconName="Moon"
    categories={["Tidur Malam", "Power Nap", "Kualitas Pemulihan", "Catatan Siklus"]}
    addButtonLabel="Catat Tidur"
    titlePlaceholder="Misal: Tidur Malam 22:30 - 05:45"
    metricLabel="Durasi / Skor Kualitas"
  />
);
export default SleepApp;
