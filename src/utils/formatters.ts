/**
 * Formatters for currency (IDR), dates, relative times, and domain statuses.
 */

export function rupiah(amount: number | string | null | undefined): string {
  const num = Number(amount ?? 0);
  if (!Number.isFinite(num)) return "Rp 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

export function rupiahRingkas(amount: number | string | null | undefined): string {
  const num = Number(amount ?? 0);
  if (!Number.isFinite(num)) return "Rp 0";
  const abs = Math.abs(num);
  const sign = num < 0 ? "-" : "";
  if (abs >= 1_000_000_000_000) {
    return `${sign}Rp ${(abs / 1_000_000_000_000).toFixed(1).replace(/\.0$/, "")} T`;
  }
  if (abs >= 1_000_000_000) {
    return `${sign}Rp ${(abs / 1_000_000_000).toFixed(1).replace(/\.0$/, "")} M`;
  }
  if (abs >= 1_000_000) {
    return `${sign}Rp ${(abs / 1_000_000).toFixed(1).replace(/\.0$/, "")} jt`;
  }
  if (abs >= 1_000) {
    return `${sign}Rp ${(abs / 1_000).toFixed(0)} rb`;
  }
  return rupiah(num);
}

function parseDate(input: string | number | Date | null | undefined): Date | null {
  if (input === null || input === undefined || input === "") return null;
  const d = input instanceof Date ? input : new Date(input);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function tanggal(input: string | number | Date | null | undefined): string {
  const d = parseDate(input);
  if (!d) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

export function tanggalPendek(input: string | number | Date | null | undefined): string {
  const d = parseDate(input);
  if (!d) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

export function jamMenit(input: string | number | Date | null | undefined): string {
  const d = parseDate(input);
  if (!d) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);
}

export function tanggalJam(input: string | number | Date | null | undefined): string {
  const d = parseDate(input);
  if (!d) return "-";
  return `${tanggalPendek(d)}, ${jamMenit(d)}`;
}

export function hariPendek(input: string | number | Date | null | undefined): string {
  const d = parseDate(input);
  if (!d) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "short",
  }).format(d);
}

export function waktuRelatif(input: string | number | Date | null | undefined): string {
  const d = parseDate(input);
  if (!d) return "-";
  const diffMs = Date.now() - d.getTime();
  const absSec = Math.round(Math.abs(diffMs) / 1000);
  const isFuture = diffMs < 0;

  const suffix = isFuture ? "lagi" : "lalu";
  if (absSec < 60) return "Baru saja";
  const mins = Math.floor(absSec / 60);
  if (mins < 60) return `${mins} menit ${suffix}`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} jam ${suffix}`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} hari ${suffix}`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks} minggu ${suffix}`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} bulan ${suffix}`;
  const years = Math.floor(days / 365);
  return `${years} tahun ${suffix}`;
}

export function sisaHari(input: string | number | Date | null | undefined): string {
  const d = parseDate(input);
  if (!d) return "-";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(d);
  target.setHours(0, 0, 0, 0);
  const diffDays = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Hari ini";
  if (diffDays === 1) return "Besok";
  if (diffDays === -1) return "Kemarin";
  if (diffDays > 1) return `${diffDays} hari lagi`;
  return `Terlambat ${Math.abs(diffDays)} hari`;
}

export function statusTugas(status: string): string {
  const map: Record<string, string> = {
    todo: "Akan Dikerjakan",
    belum: "Belum Mulai",
    proses: "Sedang Berjalan",
    in_progress: "Sedang Berjalan",
    review: "Menunggu Review",
    selesai: "Selesai",
    done: "Selesai",
    tertunda: "Tertunda",
    blocked: "Terhambat",
  };
  return map[status?.toLowerCase?.() ?? ""] ?? status ?? "-";
}

export function statusProyek(status: string): string {
  const map: Record<string, string> = {
    prospek: "Prospek",
    perencanaan: "Perencanaan",
    aktif: "Aktif",
    berjalan: "Berjalan",
    review: "Review",
    selesai: "Selesai",
    arsip: "Diarsipkan",
    ditunda: "Ditunda",
  };
  return map[status?.toLowerCase?.() ?? ""] ?? status ?? "-";
}
