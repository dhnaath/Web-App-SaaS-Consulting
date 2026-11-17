import React from "react";
import { PEHGenericApp } from "../../common/PEHGenericApp";

export const MilestonesApp: React.FC = () => (
  <PEHGenericApp
    moduleKey="people_milestones"
    title="Milestone Relasi & Ulang Tahun"
    subtitle="Pengingat momen penting, anniversary & hari lahir rekanan"
    iconName="CalendarDays"
    categories={["Ulang Tahun", "Anniversary", "Promosi Jabatan", "Peluncuran Usaha", "Pencapaian Akademik"]}
    addButtonLabel="Tambah Milestone"
    titlePlaceholder="Misal: Anniversary 5 Tahun Kerja Sama Mitra"
    metricLabel="Tanggal Momen / PIC"
  />
);
export default MilestonesApp;
