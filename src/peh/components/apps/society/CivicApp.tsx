import React from "react";
import { PEHGenericApp } from "../../common/PEHGenericApp";

export const CivicApp: React.FC = () => (
  <PEHGenericApp
    moduleKey="society_civic"
    title="Warga & Lingkungan RT/RW"
    subtitle="Direktori pengurus sipil, jadwal ronda, kas warga & zonasi fasilitas"
    iconName="Landmark"
    categories={["Kas Warga", "Pengurus RT/RW", "Keamanan", "Kebersihan Lingkungan", "Musyawarah"]}
    addButtonLabel="Tambah Catatan Warga"
    titlePlaceholder="Misal: Iuran Keamanan & Kebersihan Bulanan"
    metricLabel="Nominal / Penanggung Jawab"
  />
);
export default CivicApp;
