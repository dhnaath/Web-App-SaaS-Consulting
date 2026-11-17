import React from "react";
import { PEHGenericApp } from "../../common/PEHGenericApp";

export const GiftsApp: React.FC = () => (
  <PEHGenericApp
    moduleKey="people_gifts"
    title="Ide Kado & Tanda Kasih"
    subtitle="Pencatat preferensi bingkisan, riwayat kado & anggaran apresiasi"
    iconName="Gift"
    categories={["Keluarga", "Klien VIP", "Hari Raya", "Pernikahan", "Apresiasi Tim"]}
    addButtonLabel="Tambah Ide Kado"
    titlePlaceholder="Misal: Hampers Kopi Spesialti untuk Klien"
    metricLabel="Anggaran / Penerima"
  />
);
export default GiftsApp;
