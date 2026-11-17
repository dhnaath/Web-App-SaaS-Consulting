import React from "react";
import { PEHGenericApp } from "../../common/PEHGenericApp";

export const CommunityEventsApp: React.FC = () => (
  <PEHGenericApp
    moduleKey="society_community_events"
    title="Acara & Agenda Komunitas"
    subtitle="Kalender kegiatan publik, kepanitiaan acara & daftar hadir"
    iconName="Calendar"
    categories={["Forum Bisnis", "Kerja Bakti", "Seminar Terbuka", "Bazar Warga", "Diskusi Publik"]}
    addButtonLabel="Tambah Agenda Komunitas"
    titlePlaceholder="Misal: Forum Diskusi Ekonomi Daerah"
    metricLabel="Lokasi / Estimasi Hadir"
  />
);
export default CommunityEventsApp;
