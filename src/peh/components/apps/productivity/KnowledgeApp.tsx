import React from "react";
import { PEHGenericApp } from "../../common/PEHGenericApp";

export const KnowledgeApp: React.FC = () => (
  <PEHGenericApp
    moduleKey="productivity_knowledge"
    title="Pustaka SOP & Playbook"
    subtitle="Dokumentasi standar operasional, artikel panduan & panduan kerja"
    iconName="BookOpen"
    categories={["SOP Operasional", "Playbook Penjualan", "Panduan Teknis", "Kebijakan SDM", "Onboarding"]}
    addButtonLabel="Tambah Dokumen SOP"
    titlePlaceholder="Misal: Playbook Audit Keuangan Triwulanan"
    metricLabel="Versi / Pemilik SOP"
  />
);
export default KnowledgeApp;
