import React from "react";
import { PEHGenericApp } from "../../common/PEHGenericApp";

export const VendorsApp: React.FC = () => (
  <PEHGenericApp
    moduleKey="operations_vendors"
    title="Vendor & Rekanan Bisnis"
    subtitle="Direktori pihak ketiga, evaluasi SLA kontrak & log kemitraan"
    iconName="Building2"
    categories={["IT & Cloud", "Logistik", "Manufaktur", "Konsultan Legal", "Fasilitas Kantor"]}
    addButtonLabel="Tambah Vendor"
    titlePlaceholder="Misal: PT Teknologi Awan Nusantara"
    metricLabel="PIC / Skor SLA"
  />
);
export default VendorsApp;
