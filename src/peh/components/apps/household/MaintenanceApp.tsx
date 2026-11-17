import React from "react";
import { PEHGenericApp } from "../../common/PEHGenericApp";

export const MaintenanceApp: React.FC = () => (
  <PEHGenericApp
    moduleKey="household_maintenance"
    title="Perbaikan & Servis Rumah"
    subtitle="Jadwal servis AC, pipa, kelistrikan & log vendor tukang"
    iconName="Wrench"
    categories={["AC & Pendingin", "Listrik", "Pipa & Sanitasi", "Atap & Dinding", "Elektronik"]}
    addButtonLabel="Catat Servis"
    titlePlaceholder="Misal: Cuci AC Ruang Keluarga (3 Bulan)"
    metricLabel="Biaya / Teknisi"
  />
);
export default MaintenanceApp;
