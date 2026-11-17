import React, { useState } from 'react';
import {
  aggregateFinanceItemsByCategory,
  FINANCE_REPORT_MONTH_KEY,
  FINANCE_REPORT_MONTH_LABEL,
  getExpenseItemsForMonth,
  getIncomeItemsForMonth,
  sumFinanceItems,
} from './financeData';
import { ArrowDownLeft, ArrowUpRight, Filter } from 'lucide-react';

interface Segment {
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

export const DonutBreakdownChart: React.FC = () => {
  const [activeType, setActiveType] = useState<'expense' | 'income'>('expense');
  const [hoveredSegment, setHoveredSegment] = useState<Segment | null>(null);

  const categoryColors: Record<string, string> = {
    'Bills & Utilities': '#F59E0B',
    Shopping: '#EC4899',
    Healthcare: '#8B5CF6',
    'Food & Dining': '#3B82F6',
    Groceries: '#10B981',
    Transportation: '#6366F1',
    Salary: '#10B981',
    Ecommerce: '#3B82F6',
    'Digital Products': '#8B5CF6',
    Affiliates: '#F59E0B',
    'Real Estate': '#EC4899',
  };

  const createSegments = (items: ReadonlyArray<{ category: string; amount: number }>): Segment[] => {
    const total = sumFinanceItems(items);
    return aggregateFinanceItemsByCategory(items).map((item) => ({
      name: item.category,
      amount: item.amount,
      percentage: total > 0 ? (item.amount / total) * 100 : 0,
      color: categoryColors[item.category] ?? '#D1D5DB',
    }));
  };

  const expenseSegments = createSegments(getExpenseItemsForMonth(FINANCE_REPORT_MONTH_KEY));
  const incomeSegments = createSegments(getIncomeItemsForMonth(FINANCE_REPORT_MONTH_LABEL));
  const currentSegments = activeType === 'expense' ? expenseSegments : incomeSegments;
  const currentTotal = sumFinanceItems(currentSegments);

  // Geometry for SVG Donut
  const size = 200;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativeAngle = 0;

  return (
    <div className="bg-white rounded-lg border border-neutral-200/70 p-4 shadow-2xs select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold text-neutral-800">
          This Month Breakdown
        </h3>
        <button className="text-neutral-400 hover:text-neutral-600 transition-colors p-1">
          <Filter className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-3">
        <button
          onClick={() => setActiveType('expense')}
          className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
            activeType === 'expense'
              ? 'bg-neutral-100 text-neutral-900 font-semibold'
              : 'text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <ArrowDownLeft className="w-3 h-3 text-neutral-400" />
          <span>Expense</span>
        </button>
        <button
          onClick={() => setActiveType('income')}
          className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
            activeType === 'income'
              ? 'bg-neutral-100 text-neutral-900 font-semibold'
              : 'text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <ArrowUpRight className="w-3 h-3 text-neutral-400" />
          <span>Income</span>
        </button>
      </div>

      {/* Donut graphic and details */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-2">
        {/* SVG Donut */}
        <div className="relative w-44 h-44 flex items-center justify-center shrink-0">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
            {/* Background ring */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#F3F4F6"
              strokeWidth={strokeWidth}
              fill="none"
            />
            {currentSegments.map((seg, i) => {
              const strokeDasharray = `${(seg.percentage / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -cumulativeAngle;
              cumulativeAngle += (seg.percentage / 100) * circumference;

              return (
                <circle
                  key={i}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke={seg.color}
                  strokeWidth={hoveredSegment?.name === seg.name ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  fill="none"
                  className="transition-all duration-200 cursor-pointer"
                  onMouseEnter={() => setHoveredSegment(seg)}
                  onMouseLeave={() => setHoveredSegment(null)}
                />
              );
            })}
          </svg>

          {/* Center Info */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="font-serif-title text-2xl font-bold text-neutral-900 font-mono-nums">
              ${hoveredSegment ? hoveredSegment.amount.toLocaleString() : currentTotal.toLocaleString()}
            </span>
            <span className="text-[10px] text-neutral-400 font-medium">
              {hoveredSegment ? hoveredSegment.name : 'Total Amount'}
            </span>
            {hoveredSegment && (
              <span className="text-[10px] text-neutral-600 font-mono-nums font-semibold">
                {hoveredSegment.percentage.toFixed(1)}%
              </span>
            )}
          </div>
        </div>

        {/* Legend / Category list */}
        <div className="flex-1 space-y-1 w-full text-xs">
          {currentSegments.slice(0, 5).map((seg) => (
            <div
              key={seg.name}
              onMouseEnter={() => setHoveredSegment(seg)}
              onMouseLeave={() => setHoveredSegment(null)}
              className={`flex items-center justify-between p-1 rounded-sm cursor-pointer transition-colors ${
                hoveredSegment?.name === seg.name ? 'bg-neutral-100' : 'hover:bg-neutral-50'
              }`}
            >
              <div className="flex items-center gap-1.5 truncate">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
                <span className="truncate text-neutral-700">{seg.name}</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono-nums text-[11px] shrink-0">
                <span className="font-medium text-neutral-800">${seg.amount.toLocaleString()}</span>
                <span className="text-neutral-400 text-[10px]">({seg.percentage.toFixed(1)}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
