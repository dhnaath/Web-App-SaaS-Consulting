import React from "react";
import { PEHGenericApp } from "../../common/PEHGenericApp";

export const ContactsApp: React.FC = () => (
  <PEHGenericApp
    moduleKey="people_contacts"
    title="Buku Kontak & Relasi"
    subtitle="Direktori relasi profesional, personal, riwayat interaksi & tag"
    iconName="Users"
    categories={["Klien Utama", "Mitra Strategis", "Investor", "Penasihat", "Keluarga & Sahabat"]}
    addButtonLabel="Tambah Kontak"
    titlePlaceholder="Misal: Budi Santoso - Direktur Operasional"
    metricLabel="Instansi / Telepon"
  />
);
export default ContactsApp;
