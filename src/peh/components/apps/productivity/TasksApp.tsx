import React from "react";
import { PEHGenericApp } from "../../common/PEHGenericApp";

export const TasksApp: React.FC = () => (
  <PEHGenericApp
    moduleKey="productivity_tasks"
    title="Tugas & Manajemen Waktu"
    subtitle="Daftar to-do berorientasi prioritas, delegasi tugas & tenggat"
    iconName="CheckCircle2"
    categories={["Prioritas Tinggi", "Harian", "Mingguan", "Delegasi Tim", "Follow-Up"]}
    addButtonLabel="Tambah Tugas"
    titlePlaceholder="Misal: Finalisasi Proposal Audit Kepatuhan"
    metricLabel="Prioritas / Estimasi Durasi"
  />
);
export default TasksApp;
