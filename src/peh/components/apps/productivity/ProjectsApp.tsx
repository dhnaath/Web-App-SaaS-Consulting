import React from "react";
import { PEHGenericApp } from "../../common/PEHGenericApp";

export const ProjectsApp: React.FC = () => (
  <PEHGenericApp
    moduleKey="productivity_projects"
    title="Proyek & Inisiatif Kerja"
    subtitle="Papan perencanaan multi-proyek, progres tahapan & deliverable"
    iconName="FolderKanban"
    categories={["Konsultasi Klien", "Transformasi Digital", "Riset Pasar", "Ekspansi Internal"]}
    addButtonLabel="Tambah Proyek"
    titlePlaceholder="Misal: Implementasi ERP PT Sejahtera"
    metricLabel="Fase / Target Selesai"
  />
);
export default ProjectsApp;
