import React from "react";
import { Link } from "@tanstack/react-router";
import { Icon } from "../common/Icon";

const INNOVATION_MODULES = [
  { title: "Audit Waktu & Deep Work", desc: "Pemantauan blok fokus dan korelasi output proyek.", to: "/peh/time-audit", icon: "Timer" },
  { title: "Struktur Saham & Cap Table", desc: "Pemodelan dilusi, vesting, dan kepemilikan ekuitas.", to: "/peh/cap-table", icon: "PieChart" },
  { title: "Hak Cipta & Lisensi IP", desc: "Registri merek dagang, paten, dan masa aktif domain.", to: "/peh/ip-licenses", icon: "Award" },
  { title: "Brankas Kredensial Lokal", desc: "Penyimpanan rahasia lokal tanpa sinkronisasi pihak ketiga.", to: "/peh/vault", icon: "Lock" },
];

export const InnovationsHub: React.FC = () => (
  <div className="space-y-6 max-w-5xl mx-auto">
    <div className="pb-4 border-b border-neutral-200 dark:border-neutral-800">
      <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
        Innovations Hub
      </h1>
      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
        Eksplorasi modul lanjutan dan kapabilitas terintegrasi di dalam ekosistem PEH.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {INNOVATION_MODULES.map((m) => (
        <Link
          key={m.to}
          to={m.to as any}
          className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-400 transition-colors flex items-start gap-3.5"
        >
          <div className="p-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 shrink-0">
            <Icon name={m.icon} size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white">{m.title}</h3>
            <p className="text-xs text-neutral-500 mt-1">{m.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>
);
export default InnovationsHub;
