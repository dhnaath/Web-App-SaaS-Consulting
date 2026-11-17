import React, { useMemo, useState } from "react";
import { usePEH } from "../../context/PEHContext";
import type { PEHModuleRecord } from "../../types";
import { Icon } from "./Icon";
import { EmptyState } from "./EmptyState";
import { Modal } from "./Modal";

export interface PEHGenericAppProps {
  moduleKey: string;
  title: string;
  subtitle: string;
  iconName: string;
  categories: string[];
  addButtonLabel?: string;
  titlePlaceholder?: string;
  metricLabel?: string;
  emptyTitle?: string;
  emptyDescription?: string;
}

export const PEHGenericApp: React.FC<PEHGenericAppProps> = ({
  moduleKey,
  title,
  subtitle,
  iconName,
  categories,
  addButtonLabel = "Tambah Data",
  titlePlaceholder = "Masukkan judul entri...",
  metricLabel = "Keterangan / Nilai",
  emptyTitle = "Belum ada data tercatat",
  emptyDescription = "Tambahkan entri baru untuk mulai mengelola dan memantau modul ini.",
}) => {
  const { getModuleRecords, addModuleRecord, updateModuleRecordStatus, deleteModuleRecord } =
    usePEH();

  const records = getModuleRecords(moduleKey);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("Semua");

  const [entryTitle, setEntryTitle] = useState("");
  const [entryCategory, setEntryCategory] = useState(categories[0] || "Umum");
  const [entryMetric, setEntryMetric] = useState("");
  const [entryDate, setEntryDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [entryNotes, setEntryNotes] = useState("");

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return records.filter((r) => {
      const matchStatus = statusFilter === "Semua" || r.status === statusFilter;
      const matchQ =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        (r.metric && r.metric.toLowerCase().includes(q)) ||
        (r.notes && r.notes.toLowerCase().includes(q));
      return matchStatus && matchQ;
    });
  }, [records, statusFilter, searchQuery]);

  const counts = useMemo(() => {
    return {
      total: records.length,
      aktif: records.filter((r) => r.status === "Aktif" || r.status === "Proses").length,
      selesai: records.filter((r) => r.status === "Selesai").length,
    };
  }, [records]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!entryTitle.trim()) return;
    addModuleRecord(moduleKey, {
      title: entryTitle.trim(),
      category: entryCategory,
      status: "Aktif",
      date: entryDate,
      metric: entryMetric.trim() || undefined,
      notes: entryNotes.trim() || undefined,
    });
    setEntryTitle("");
    setEntryMetric("");
    setEntryNotes("");
    setIsModalOpen(false);
  };

  const cycleStatus = (rec: PEHModuleRecord) => {
    const order: PEHModuleRecord["status"][] = ["Aktif", "Proses", "Selesai", "Arsip"];
    const next = order[(order.indexOf(rec.status) + 1) % order.length];
    updateModuleRecordStatus(moduleKey, rec.id, next);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
              <Icon name={iconName} size={16} />
            </span>
            <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
              {title}
            </h1>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{subtitle}</p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white dark:text-neutral-900 bg-neutral-900 dark:bg-neutral-100 hover:opacity-90 rounded-lg transition-opacity shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Icon name="Plus" size={14} />
          <span>{addButtonLabel}</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <div className="text-[11px] text-neutral-500">Total Tercatat</div>
          <div className="text-xl font-bold text-neutral-900 dark:text-white mt-1 tabular-nums">
            {counts.total}
          </div>
        </div>
        <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <div className="text-[11px] text-neutral-500">Aktif / Berjalan</div>
          <div className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-1 tabular-nums">
            {counts.aktif}
          </div>
        </div>
        <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <div className="text-[11px] text-neutral-500">Selesai</div>
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1 tabular-nums">
            {counts.selesai}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-xs font-medium">
          {["Semua", "Aktif", "Proses", "Selesai"].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                statusFilter === st
                  ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-2xs font-semibold"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari entri..."
          className="text-xs px-3 py-1.5 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 w-52 focus:outline-hidden"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          iconName={iconName}
          title={emptyTitle}
          description={emptyDescription}
          actionLabel={addButtonLabel}
          onAction={() => setIsModalOpen(true)}
        />
      ) : (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl divide-y divide-neutral-100 dark:divide-neutral-800">
          {filtered.map((rec) => (
            <div
              key={rec.id}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                    {rec.title}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-medium">
                    {rec.category}
                  </span>
                </div>
                <div className="text-xs text-neutral-500 mt-1 flex items-center gap-2 flex-wrap">
                  {rec.date && <span className="font-mono">{rec.date}</span>}
                  {rec.metric && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="font-medium text-neutral-700 dark:text-neutral-300">
                        {rec.metric}
                      </span>
                    </>
                  )}
                  {rec.notes && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{rec.notes}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => cycleStatus(rec)}
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                  title="Klik untuk ubah status"
                >
                  {rec.status}
                </button>
                <button
                  type="button"
                  onClick={() => deleteModuleRecord(moduleKey, rec.id)}
                  className="p-1.5 text-neutral-400 hover:text-rose-600 rounded-md transition-colors cursor-pointer"
                  title="Hapus"
                >
                  <Icon name="Trash2" size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={addButtonLabel}
        subtitle={title}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Judul / Nama Entri *
            </label>
            <input
              type="text"
              required
              value={entryTitle}
              onChange={(e) => setEntryTitle(e.target.value)}
              placeholder={titlePlaceholder}
              className="w-full text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Kategori
              </label>
              <select
                value={entryCategory}
                onChange={(e) => setEntryCategory(e.target.value)}
                className="w-full text-xs px-2.5 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Tanggal
              </label>
              <input
                type="date"
                value={entryDate}
                onChange={(e) => setEntryDate(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              {metricLabel}
            </label>
            <input
              type="text"
              value={entryMetric}
              onChange={(e) => setEntryMetric(e.target.value)}
              placeholder="Misal: Rp 1.500.000 / 45 menit / PIC: Andi"
              className="w-full text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Catatan
            </label>
            <input
              type="text"
              value={entryNotes}
              onChange={(e) => setEntryNotes(e.target.value)}
              placeholder="Catatan tambahan..."
              className="w-full text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-3.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-xs font-medium cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-semibold cursor-pointer"
            >
              Simpan
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
