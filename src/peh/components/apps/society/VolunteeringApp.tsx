import React from "react";
import { PEHGenericApp } from "../../common/PEHGenericApp";

export const VolunteeringApp: React.FC = () => (
  <PEHGenericApp
    moduleKey="society_volunteering"
    title="Relawan & Aksi Sosial"
    subtitle="Pencatat jam kontribusi sosial, komunitas pegiat & program sosial"
    iconName="HeartHandshake"
    categories={["Edukasi", "Lingkungan", "Tanggap Bencana", "Kesehatan Masyarakat", "Mentoring UMKM"]}
    addButtonLabel="Catat Aksi Relawan"
    titlePlaceholder="Misal: Kelas Literasi Keuangan UMKM Lokal"
    metricLabel="Jam Kontribusi / Lokasi"
  />
);
export default VolunteeringApp;
