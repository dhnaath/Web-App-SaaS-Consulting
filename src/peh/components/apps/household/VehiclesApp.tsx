import React from "react";
import { PEHGenericApp } from "../../common/PEHGenericApp";

export const VehiclesApp: React.FC = () => (
  <PEHGenericApp
    moduleKey="household_vehicles"
    title="Kendaraan & Otomotif"
    subtitle="Log servis berkala, pajak STNK, ganti oli & efisiensi BBM"
    iconName="Car"
    categories={["Servis Berkala", "Pajak STNK", "BBM & Odometer", "Asuransi", "Ban & Aki"]}
    addButtonLabel="Tambah Log Kendaraan"
    titlePlaceholder="Misal: Ganti Oli Mesin KM 45.000"
    metricLabel="Odometer / Biaya Servis"
  />
);
export default VehiclesApp;
