import React from "react";
import { PEHGenericApp } from "../../common/PEHGenericApp";

export const PetCareApp: React.FC = () => (
  <PEHGenericApp
    moduleKey="family_pet_care"
    title="Hewan Peliharaan & Anabul"
    subtitle="Profil anabul, riwayat vaksinasi, jadwal vet & log perawatan"
    iconName="PawPrint"
    categories={["Vaksinasi", "Grooming", "Kontrol Dokter", "Pakan", "Vitamin"]}
    addButtonLabel="Tambah Catatan Anabul"
    titlePlaceholder="Misal: Vaksin Rabies Tahunan - Milo"
    metricLabel="Nama Anabul / Klinik Vet"
  />
);
export default PetCareApp;
