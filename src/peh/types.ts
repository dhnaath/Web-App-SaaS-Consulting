export interface BudgetItem {
  id: string;
  envelopeName: string;
  category:
    | "Kebutuhan Pokok"
    | "Transportasi"
    | "Gaya Hidup & Hobi"
    | "Pendidikan"
    | "Tabungan & Investasi";
  allocatedAmount: number;
  spentAmount: number;
  monthPeriod: string;
  notes?: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  category:
    | "Identitas & Sipil"
    | "Garansi Barang"
    | "Asuransi & Polis"
    | "Kontrak & Properti"
    | "Lainnya";
  identifierNumber?: string;
  physicalLocation: string;
  expiryDate?: string;
  tags: string[];
}

export interface InsuranceItem {
  id: string;
  providerName: string;
  policyNumber: string;
  type:
    | "Kesehatan"
    | "Jiwa (Term Life)"
    | "Kendaraan"
    | "Properti / Rumah"
    | "Pendidikan Anak";
  insuredPerson: string;
  premiumAmount: number;
  paymentFrequency: "Bulanan" | "Triwulanan" | "Tahunan";
  coverageLimit: number;
  expiryDate: string;
  status: "Aktif" | "Grace Period" | "Klaim Berjalan";
  notes?: string;
}

export interface SubscriptionItem {
  id: string;
  serviceName: string;
  category:
    | "Hiburan & Streaming"
    | "Produktivitas & Cloud"
    | "Utilitas Rumah"
    | "Gym & Keanggotaan"
    | "Lainnya";
  cost: number;
  billingCycle: "Bulanan" | "Tahunan" | "Mingguan";
  renewalDate: string;
  paymentMethod: string;
  autoRenew: boolean;
}

export interface VaultItem {
  id: string;
  title: string;
  type:
    | "Login / Akun"
    | "Kunci API / Token"
    | "PIN & Sandi Kartu"
    | "Catatan Rahasia";
  identifier: string;
  secretValue: string;
  serviceUrl?: string;
  notes?: string;
}

export interface PEHModuleRecord {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  status: "Aktif" | "Proses" | "Selesai" | "Arsip";
  date?: string;
  metric?: string;
  notes?: string;
}
