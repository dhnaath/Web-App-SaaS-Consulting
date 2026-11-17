import React from "react";

const PILLARS = [
  {
    code: "PEH",
    name: "Personal & Essentials Hub",
    focus: "Identitas, kesehatan pribadi, kebiasaan, dokumen legal, brankas sandi, dan rumah tangga.",
    modules: "22 Modul Inti",
  },
  {
    code: "PFS",
    name: "Personal Financial Spectrum",
    focus: "5 Tahap Spektrum Kekayaan (Surety, Flow, Build, Grow, Legacy) beserta analisis rasio finansial.",
    modules: "25+ Instrumen Finansial",
  },
  {
    code: "POO",
    name: "Productivity, Operations & Ownership",
    focus: "Alur kerja, vendor, insiden, proyek, rapat, cap table, lisensi IP, dan tata kelola perusahaan.",
    modules: "20+ Modul Operasional",
  },
];

export const EcosystemComparison: React.FC = () => (
  <div className="space-y-6 max-w-5xl mx-auto">
    <div className="pb-4 border-b border-neutral-200 dark:border-neutral-800">
      <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
        Ecosystem Architecture Comparison
      </h1>
      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
        Pembandingan cakupan domain antara PEH, PFS, dan POO dalam satu ruang kerja terintegrasi.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {PILLARS.map((p) => (
        <div
          key={p.code}
          className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-2.5"
        >
          <span className="inline-block text-[11px] font-bold font-mono px-2.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
            {p.code}
          </span>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">{p.name}</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">{p.focus}</p>
          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            Cakupan: {p.modules}
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default EcosystemComparison;
