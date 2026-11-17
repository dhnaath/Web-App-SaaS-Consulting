import React from "react";
import { PEHGenericApp } from "../../common/PEHGenericApp";

export const TimeAuditApp: React.FC = () => (
  <PEHGenericApp
    moduleKey="productivity_time_audit"
    title="Audit Waktu & Deep Work"
    subtitle="Pelacakan alokasi jam kerja produktif, analisis distraksi & ritme fokus"
    iconName="Timer"
    categories={["Deep Work", "Kolaborasi Tim", "Administrasi", "Riset & Belajar"]}
    addButtonLabel="Catat Blok Waktu"
    titlePlaceholder="Misal: Blok Fokus Penulisan Laporan Valuasi (120 mnt)"
    metricLabel="Durasi / Skor Fokus"
  />
);
export default TimeAuditApp;
