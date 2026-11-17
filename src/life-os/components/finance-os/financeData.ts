export interface FinanceIncomeItem {
  id: string;
  name: string;
  category: string;
  amount: number;
  tagColor: string;
}

export interface FinanceIncomeGroup {
  month: string;
  items: FinanceIncomeItem[];
}

export interface FinanceExpenseItem {
  id: string;
  type: 'expense';
  name: string;
  amount: number;
  date: string;
  category: string;
}

export interface FinanceExpenseGroup {
  title: string;
  items: FinanceExpenseItem[];
}

export const FINANCE_REPORT_MONTH_LABEL = 'Apr 2026';
export const FINANCE_REPORT_MONTH_KEY = '2026-04';
export const FINANCE_REPORT_YEAR = '2026';

export const incomeGroups: FinanceIncomeGroup[] = [
  {
    month: 'Apr 2026',
    items: [
      { id: 'inc-g1', name: 'Performance bonus', category: 'Salary', amount: 10000, tagColor: 'bg-[#F2EFE9] text-[#635E54]' },
      { id: 'inc-g2', name: 'Rental maintenance reimbursement', category: 'Real Estate', amount: 2500, tagColor: 'bg-[#FDE8E8] text-[#9B1C1C]' },
      { id: 'inc-g3', name: 'Ecommerce payout', category: 'Ecommerce', amount: 8800, tagColor: 'bg-[#EDE9FE] text-[#6D28D9]' },
      { id: 'inc-g4', name: 'Digital product sales', category: 'Digital Products', amount: 6400, tagColor: 'bg-[#E0E7FF] text-[#3730A3]' },
      { id: 'inc-g5', name: 'Affiliate commissions', category: 'Affiliates', amount: 3100, tagColor: 'bg-[#FEF3C7] text-[#92400E]' },
      { id: 'inc-g6', name: 'Interest credit', category: 'Salary', amount: 420, tagColor: 'bg-[#F2EFE9] text-[#635E54]' },
      { id: 'inc-g7', name: 'Ecommerce sales', category: 'Ecommerce', amount: 19500, tagColor: 'bg-[#EDE9FE] text-[#6D28D9]' },
      { id: 'inc-g8', name: 'Consulting payment', category: 'Digital Products', amount: 8000, tagColor: 'bg-[#E0E7FF] text-[#3730A3]' },
      { id: 'inc-g9', name: 'Affiliate bonus', category: 'Affiliates', amount: 2600, tagColor: 'bg-[#FEF3C7] text-[#92400E]' },
      { id: 'inc-g10', name: 'Ecommerce sales', category: 'Ecommerce', amount: 13400, tagColor: 'bg-[#EDE9FE] text-[#6D28D9]' },
    ],
  },
  {
    month: 'Feb 2026',
    items: [
      { id: 'inc-g11', name: 'Icon Pack', category: 'Digital Products', amount: 800, tagColor: 'bg-[#E0E7FF] text-[#3730A3]' },
      { id: 'inc-g12', name: 'Monthly Salary', category: 'Salary', amount: 4500, tagColor: 'bg-[#F2EFE9] text-[#635E54]' },
      { id: 'inc-g13', name: 'Rental Income', category: 'Real Estate', amount: 2000, tagColor: 'bg-[#FDE8E8] text-[#9B1C1C]' },
    ],
  },
  {
    month: 'Jan 2026',
    items: [
      { id: 'inc-g14', name: 'E-commerce Sales', category: 'Ecommerce', amount: 1850, tagColor: 'bg-[#EDE9FE] text-[#6D28D9]' },
      { id: 'inc-g15', name: 'Affiliate Commission', category: 'Affiliates', amount: 450, tagColor: 'bg-[#FEF3C7] text-[#92400E]' },
      { id: 'inc-g16', name: 'October Salary', category: 'Salary', amount: 4500, tagColor: 'bg-[#F2EFE9] text-[#635E54]' },
    ],
  },
];

export const expenseGroups: FinanceExpenseGroup[] = [
  {
    title: 'Apr 26 – May 2 2026',
    items: [
      { id: 'gw-1', type: 'expense', name: 'Grocery Shopping', amount: 146.0, date: '2026-04-28', category: 'Groceries' },
    ],
  },
  {
    title: 'Apr 19 – 25 2026',
    items: [
      { id: 'gw-2', type: 'expense', name: 'Online Shopping', amount: 100.0, date: '2026-04-23', category: 'Shopping' },
      { id: 'gw-3', type: 'expense', name: 'Home supplies', amount: 560.0, date: '2026-04-20', category: 'Bills & Utilities' },
      { id: 'gw-4', type: 'expense', name: 'Gas Station', amount: 65.0, date: '2026-04-19', category: 'Transportation' },
    ],
  },
  {
    title: 'Apr 12 – 18 2026',
    items: [
      { id: 'gw-5', type: 'expense', name: 'Online order', amount: 379.0, date: '2026-04-18', category: 'Shopping' },
      { id: 'gw-6', type: 'expense', name: 'Internet Bill', amount: 80.0, date: '2026-04-17', category: 'Bills & Utilities' },
      { id: 'gw-7', type: 'expense', name: 'Pharmacy purchase', amount: 340.0, date: '2026-04-15', category: 'Healthcare' },
      { id: 'gw-8', type: 'expense', name: 'Electricity Bill', amount: 85.0, date: '2026-04-14', category: 'Bills & Utilities' },
      { id: 'gw-9', type: 'expense', name: 'Doctor Visit', amount: 50.0, date: '2026-04-13', category: 'Healthcare' },
      { id: 'gw-10', type: 'expense', name: 'Dining out', amount: 120.0, date: '2026-04-12', category: 'Food & Dining' },
    ],
  },
  {
    title: 'Apr 5 – 11 2026',
    items: [
      { id: 'gw-11', type: 'expense', name: 'Restaurant Dinner', amount: 85.0, date: '2026-04-10', category: 'Food & Dining' },
      { id: 'gw-12', type: 'expense', name: 'Uber Ride', amount: 33.0, date: '2026-04-09', category: 'Transportation' },
      { id: 'gw-13', type: 'expense', name: 'Mobile recharge', amount: 499.0, date: '2026-04-07', category: 'Bills & Utilities' },
      { id: 'gw-14', type: 'expense', name: 'Movie tickets', amount: 150.0, date: '2026-04-05', category: 'Shopping' },
    ],
  },
  {
    title: 'Mar 29 – Apr 4 2026',
    items: [
      { id: 'gw-15', type: 'expense', name: 'Fuel refill', amount: 2200.0, date: '2026-04-02', category: 'Transportation' },
      { id: 'gw-16', type: 'expense', name: 'Coffee & snack', amount: 180.0, date: '2026-04-01', category: 'Food & Dining' },
    ],
  },
];

export function formatFinanceAmount(amount: number): string {
  return String.fromCharCode(36) + amount.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

export function sumFinanceItems(items: ReadonlyArray<{ amount: number }>): number {
  return items.reduce((total, item) => total + item.amount, 0);
}

export function getIncomeItemsForMonth(monthLabel: string): FinanceIncomeItem[] {
  return incomeGroups.find((group) => group.month === monthLabel)?.items ?? [];
}

export function getExpenseItemsForMonth(monthKey: string): FinanceExpenseItem[] {
  return expenseGroups
    .flatMap((group) => group.items)
    .filter((item) => item.date.startsWith(monthKey));
}

export function aggregateFinanceItemsByCategory(
  items: ReadonlyArray<{ category: string; amount: number }>
): { category: string; amount: number }[] {
  const totals = new Map<string, number>();

  items.forEach((item) => {
    totals.set(item.category, (totals.get(item.category) ?? 0) + item.amount);
  });

  return Array.from(totals, ([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);
}

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function getMonthLabelFromDate(date: string): string {
  const [year, month] = date.split('-');
  const monthName = MONTH_LABELS[Number(month) - 1];
  return monthName ? `${monthName} ${year}` : '';
}

export function getMonthKeyFromLabel(monthLabel: string): string {
  const [month, year] = monthLabel.split(' ');
  const monthIndex = MONTH_LABELS.indexOf(month);
  return monthIndex < 0 ? '' : `${year}-${String(monthIndex + 1).padStart(2, '0')}`;
}

export function getFinanceMonthLabelsForYear(year: string): string[] {
  const labels = new Set([
    ...incomeGroups.map((group) => group.month),
    ...expenseGroups.flatMap((group) => group.items.map((item) => getMonthLabelFromDate(item.date))),
  ]);

  return Array.from(labels)
    .filter((label) => label.endsWith(` ${year}`))
    .sort((a, b) => getMonthKeyFromLabel(a).localeCompare(getMonthKeyFromLabel(b)));
}
