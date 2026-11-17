import React, { useState } from 'react';
import { incomeGroups, sumFinanceItems } from './financeData';
import { useLifeOS } from '../../context/LifeOSContext';
import {
  ChevronDown,
  ChevronRight,
  Filter,
  ArrowUpDown,
  Plus,
} from 'lucide-react';

export const GroupedIncomesList: React.FC = () => {
  const { openModal } = useLifeOS();
  const [activeTab, setActiveTab] = useState<'monthly' | 'yearly'>('monthly');
  const [collapsedMonths, setCollapsedMonths] = useState<Record<string, boolean>>({});

  const toggleMonth = (month: string) => {
    setCollapsedMonths((prev) => ({
      ...prev,
      [month]: !prev[month],
    }));
  };

  return (
    <div className="bg-white rounded-lg border border-neutral-200/70 p-4 shadow-2xs select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-neutral-800">
          Incomes
        </h3>
        <div className="flex items-center gap-1">
          <button className="text-neutral-400 hover:text-neutral-600 transition-colors p-1">
            <Filter className="w-3.5 h-3.5" />
          </button>
          <button className="text-neutral-400 hover:text-neutral-600 transition-colors p-1">
            <ArrowUpDown className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => openModal('income')}
            className="p-1 text-neutral-500 hover:text-neutral-800 transition-colors"
            title="Add Income"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-3">
        <button
          onClick={() => setActiveTab('monthly')}
          className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
            activeTab === 'monthly'
              ? 'bg-neutral-100 text-neutral-900 font-semibold'
              : 'text-neutral-500 hover:text-neutral-800'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setActiveTab('yearly')}
          className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
            activeTab === 'yearly'
              ? 'bg-neutral-100 text-neutral-900 font-semibold'
              : 'text-neutral-500 hover:text-neutral-800'
          }`}
        >
          Yearly
        </button>
        <span className="text-[11px] text-neutral-400 px-1">
          3 more...
        </span>
      </div>

      {/* Grouped Month Accordion */}
      <div className="space-y-3">
        {incomeGroups.map((group) => {
          const total = sumFinanceItems(group.items);
          const isCollapsed = collapsedMonths[group.month];

          return (
            <div key={group.month} className="space-y-1">
              <button
                onClick={() => toggleMonth(group.month)}
                className="w-full flex items-center justify-between py-1 px-1.5 rounded-sm hover:bg-neutral-50 transition-colors text-left group"
              >
                <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-800">
                  {isCollapsed ? (
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-700" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-700" />
                  )}
                  <span>{group.month}</span>
                </div>
                <span className="text-xs font-mono-nums font-semibold text-neutral-700">
                  ${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </button>

              {!isCollapsed && (
                <div className="pl-4 pr-1 divide-y divide-neutral-100">
                  {group.items.map((item) => (
                    <div
                      key={item.id}
                      className="py-1.5 flex items-center justify-between text-xs text-neutral-700 hover:bg-neutral-50 px-1 rounded-xs transition-colors"
                    >
                      <span className="font-medium text-neutral-800 truncate max-w-[200px] sm:max-w-none">
                        {item.name}
                      </span>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className={`px-2 py-0.5 rounded-xs text-[10px] font-medium ${item.tagColor}`}>
                          {item.category}
                        </span>
                        <span className="font-mono-nums font-medium text-neutral-800 w-20 text-right">
                          ${item.amount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
