import React from "react";
import { PEHGenericApp } from "../../common/PEHGenericApp";

export const TraditionsApp: React.FC = () => (
  <PEHGenericApp
    moduleKey="family_traditions"
    title="Acara & Tradisi Bersama"
    subtitle="Kalender reuni keluarga, tradisi tahunan & kas acara"
    iconName="CalendarHeart"
    categories={["Reuni Tahunan", "Hari Raya", "Ziarah", "Liburan Keluarga", "Syukuran"]}
    addButtonLabel="Tambah Agenda Tradisi"
    titlePlaceholder="Misal: Halal Bihalal Keluarga Besar"
    metricLabel="Lokasi / Estimasi Peserta"
  />
);
export default TraditionsApp;
