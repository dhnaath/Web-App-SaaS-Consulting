import React from "react";
import { PEHGenericApp } from "../../common/PEHGenericApp";

export const MeetingsApp: React.FC = () => (
  <PEHGenericApp
    moduleKey="productivity_meetings"
    title="Notulensi Rapat & Keputusan"
    subtitle="Pencatatan agenda rapat, keputusan konsensus & daftar PIC"
    iconName="CalendarCheck"
    categories={["Rapat Direksi", "Review Klien", "Weekly Sync", "Townhall", "Komite Audit"]}
    addButtonLabel="Tambah Notulen"
    titlePlaceholder="Misal: Review Roadmap Produk Semester II"
    metricLabel="Keputusan / Daftar PIC"
  />
);
export default MeetingsApp;
