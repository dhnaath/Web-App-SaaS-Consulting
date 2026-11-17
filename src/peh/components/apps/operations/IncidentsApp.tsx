import React from "react";
import { PEHGenericApp } from "../../common/PEHGenericApp";

export const IncidentsApp: React.FC = () => (
  <PEHGenericApp
    moduleKey="operations_incidents"
    title="Log Masalah & Insiden"
    subtitle="Pencatatan gangguan operasional, resolusi & analisis akar masalah"
    iconName="ShieldAlert"
    categories={["Sistem & IT", "Keselamatan Kerja", "Kualitas Layanan", "Keamanan", "Supplier"]}
    addButtonLabel="Catat Insiden"
    titlePlaceholder="Misal: Gangguan Jaringan Server Regional"
    metricLabel="Tingkat Dampak / PIC"
  />
);
export default IncidentsApp;
