import React, { useState } from 'react';
import { expenseGroups, sumFinanceItems } from './financeData';
import { useLifeOS } from '../../context/LifeOSContext';
import {
  ChevronDown,
  ChevronRight,
  Filter,
  ArrowUpDown,
  Plus,
  UtensilsCrossed,
  Home,
  Car,
  ShoppingBag,
  Stethoscope,
  Film,
  Apple,
  Layers,
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Groceries: Apple,
  Shopping: ShoppingBag,
  'Bills & Utilities': Home,
  Transportation: Car,
  'Food & Dining': UtensilsCrossed,
  Healthcare: Stethoscope,
  Entertainment: Film,
};

export const GroupedExpensesList: React.FC = () => {
  const { openModal } = useLifeOS();
  const [activeTab, setActiveTab] = useState<'weekly' | 'month' | 'chart'>('weekly');
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const groupedWeeks = expenseGroups;

  const toggleGroup = (title: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className="bg-white rounded-lg border border-neutral-200/70 p-4 shadow-2xs select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-neutral-800">
          Expenses
        </h3>
        <div className="flex items-center gap-1">
          <button className="text-neutral-400 hover:text-neutral-600 transition-colors p-1">
            <Filter className="w-3.5 h-3.5" />
          </button>
          <button className="text-neutral-400 hover:text-neutral-600 transition-colors p-1">
            <ArrowUpDown className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => openModal('expense')}
            className="p-1 text-neutral-500 hover:text-neutral-800 transition-colors"
            title="Add Expense"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-3">
        <button
          onClick={() => setActiveTab('weekly')}
          className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
            activeTab === 'weekly'
              ? 'bg-neutral-100 text-neutral-900 font-semibold'
              : 'text-neutral-500 hover:text-neutral-800'
          }`}
        >
          Weekly
        </button>
        <button
          onClick={() => setActiveTab('month')}
          className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
            activeTab === 'month'
              ? 'bg-neutral-100 text-neutral-900 font-semibold'
              : 'text-neutral-500 hover:text-neutral-800'
          }`}
        >
          This Month
        </button>
        <button
          onClick={() => setActiveTab('chart')}
          className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
            activeTab === 'chart'
              ? 'bg-neutral-100 text-neutral-900 font-semibold'
              : 'text-neutral-500 hover:text-neutral-800'
          }`}
        >
          Chart
        </button>
      </div>

      {/* Grouped Weeks */}
      <div className="space-y-3">
        {groupedWeeks.map((week) => {
          const total = sumFinanceItems(week.items);
          const isCollapsed = collapsedGroups[week.title];

          return (
            <div key={week.title} className="space-y-1">
              {/* Accordion Header */}
              <button
                onClick={() => toggleGroup(week.title)}
                className="w-full flex items-center justify-between py-1 px-1.5 rounded-sm hover:bg-neutral-50 transition-colors text-left group"
              >
                <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-800">
                  {isCollapsed ? (
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-700" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-700" />
                  )}
                  <span>{week.title}</span>
                </div>
                <span className="text-xs font-mono-nums font-semibold text-neutral-700">
                  ${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </button>

              {/* Items in week */}
              {!isCollapsed && (
                <div className="pl-4 pr-1 divide-y divide-neutral-100">
                  {week.items.map((item) => {
                    const Icon = CATEGORY_ICONS[item.category] || Layers;
                    return (
                      <div
                        key={item.id}
                        className="py-1.5 flex items-center justify-between text-xs text-neutral-700 hover:bg-neutral-50 px-1 rounded-xs transition-colors group"
                      >
                        <span className="font-medium text-neutral-800">
                          {item.name}
                        </span>

                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center gap-1 text-neutral-500 text-[11px]">
                            <Icon className="w-3 h-3 text-neutral-400" />
                            <span>{item.category}</span>
                          </span>

                          <span className="font-mono-nums font-medium text-neutral-800 w-16 text-right">
                            ${item.amount.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
