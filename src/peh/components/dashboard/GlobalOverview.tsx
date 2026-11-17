import React from "react";
import { Link } from "@tanstack/react-router";
import { usePEH } from "../../context/PEHContext";
import { Icon } from "../common/Icon";

const DOMAIN_SUMMARY = [
  { label: "Habit & Personal", route: "/peh/habits", icon: "Repeat", key: "personal_habits" },
  { label: "Operasional & Vendor", route: "/peh/vendors", icon: "Building2", key: "operations_vendors" },
  { label: "Aset & Kepemilikan", route: "/peh/assets", icon: "Layers", key: "ownership_assets" },
  { label: "Proyek & Produktivitas", route: "/peh/projects", icon: "FolderKanban", key: "productivity_projects" },
  { label: "Rumah Tangga & Dapur", route: "/peh/chores", icon: "CheckSquare", key: "household_chores" },
  { label: "Keluarga & Komunitas", route: "/peh/civic", icon: "Landmark", key: "society_civic" },
];

export const GlobalOverview: React.FC = () => {
  const {
    budgetEnvelopes,
    documents,
    insurancePolicies,
    subscriptions,
    vaultItems,
    getModuleRecords,
  } = usePEH();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
          PEH Ecosystem Global Overview
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
          Ringkasan terpadu seluruh pilar Personal, Essentials, Household, Family, Operations, Ownership, People, Productivity, dan Society.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: "Pos Anggaran", val: budgetEnvelopes.length, to: "/peh/budget" },
          { label: "Dokumen Legal", val: documents.length, to: "/peh/documents" },
          { label: "Polis Asuransi", val: insurancePolicies.length, to: "/peh/insurance" },
          { label: "Langganan Aktif", val: subscriptions.length, to: "/peh/subscriptions" },
          { label: "Brankas Kredensial", val: vaultItems.length, to: "/peh/vault" },
        ].map((item) => (
          <Link
            key={item.to}
            to={item.to as any}
            className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-400 transition-colors"
          >
            <div className="text-[11px] text-neutral-500">{item.label}</div>
            <div className="text-xl font-bold text-neutral-900 dark:text-white mt-1 tabular-nums">
              {item.val}
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {DOMAIN_SUMMARY.map((dom) => {
          const count = getModuleRecords(dom.key).length;
          return (
            <Link
              key={dom.route}
              to={dom.route as any}
              className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-400 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200">
                  <Icon name={dom.icon} size={18} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-neutral-900 dark:text-white">
                    {dom.label}
                  </div>
                  <div className="text-xs text-neutral-500">{count} entri tercatat</div>
                </div>
              </div>
              <Icon name="ChevronRight" size={16} className="text-neutral-400" />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default GlobalOverview;
