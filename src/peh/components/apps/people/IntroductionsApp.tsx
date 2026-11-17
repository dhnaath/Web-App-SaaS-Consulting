import React from "react";
import { PEHGenericApp } from "../../common/PEHGenericApp";

export const IntroductionsApp: React.FC = () => (
  <PEHGenericApp
    moduleKey="people_introductions"
    title="Jejaring & Perkenalan"
    subtitle="Log mediasi relasi dua arah, pembuka kolaborasi & follow-up"
    iconName="Network"
    categories={["Investor - Founder", "Klien - Vendor", "Mentor - Mentee", "Lintas Industri"]}
    addButtonLabel="Catat Perkenalan"
    titlePlaceholder="Misal: Intro Tim Supply Chain ke Logistik Nasional"
    metricLabel="Pihak Terhubung / Hasil"
  />
);
export default IntroductionsApp;
