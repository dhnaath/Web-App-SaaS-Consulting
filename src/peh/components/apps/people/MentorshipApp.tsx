import React from "react";
import { PEHGenericApp } from "../../common/PEHGenericApp";

export const MentorshipApp: React.FC = () => (
  <PEHGenericApp
    moduleKey="people_mentorship"
    title="Bimbingan & Mentoring"
    subtitle="Catatan sesi konsultasi, roadmap bimbingan karir & action items"
    iconName="GraduationCap"
    categories={["Sebagai Mentee", "Sebagai Mentor", "Advisory Board", "Executive Coaching"]}
    addButtonLabel="Tambah Sesi Mentoring"
    titlePlaceholder="Misal: Review Strategi Ekspansi Q4 bersama Advisor"
    metricLabel="Mentor / Action Item"
  />
);
export default MentorshipApp;
