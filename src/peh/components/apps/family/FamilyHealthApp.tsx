import React from "react";
import { PEHGenericApp } from "../../common/PEHGenericApp";

export const FamilyHealthApp: React.FC = () => (
  <PEHGenericApp
    moduleKey="family_health"
    title="Kesehatan Keluarga"
    subtitle="Profil golongan darah, riwayat alergi, obat rutin & kontak darurat"
    iconName="HeartPulse"
    categories={["Rekam Medis", "Vaksinasi", "Alergi", "Obat Rutin", "Kontak Dokter"]}
    addButtonLabel="Tambah Data Kesehatan"
    titlePlaceholder="Misal: Vaksinasi Influenza Tahunan - Anak"
    metricLabel="Nama Anggota / Catatan Medis"
  />
);
export default FamilyHealthApp;
