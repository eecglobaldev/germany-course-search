/**
 * SortDropdown Component
 * Dropdown for sorting courses by relevance, name, or grade
 */

'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { SortBy } from '@/types/filter';

interface SortDropdownProps {
  value: SortBy;
  sortOrder: 'asc' | 'desc';
  onChange: (sortBy: SortBy, sortOrder: 'asc' | 'desc') => void;
}

const sortOptions: { value: SortBy; labelAsc: string; labelDesc: string }[] = [
  { value: 'relevance', labelAsc: 'Relevance', labelDesc: 'Relevance' },
  { value: 'name', labelAsc: 'Name (A-Z)', labelDesc: 'Name (Z-A)' },
  { value: 'grade', labelAsc: 'Grade (Low to High)', labelDesc: 'Grade (High to Low)' },
];

export default function SortDropdown({ value, sortOrder, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = sortOptions.find(opt => opt.value === value) || sortOptions[0];
  const selectedLabel = sortOrder === 'desc' ? selectedOption.labelDesc : selectedOption.labelAsc;

  const handleSelect = (optionValue: SortBy, order: 'asc' | 'desc') => {
    onChange(optionValue, order);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 bg-[var(--bg-card)] border-2 border-[var(--border-color)] rounded-xl hover:border-purple-300 dark:hover:border-purple-500/50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 shadow-sm hover:shadow-md group"
      >
        <span className="text-sm font-semibold text-[var(--text-secondary)] group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          Sort by: <span className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">{selectedLabel}</span>
        </span>
        <ChevronDown className={`h-4 w-4 text-[var(--text-muted)] group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-all duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Overlay to close dropdown */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          {/* Dropdown menu */}
          <div className="absolute top-full right-0 lg:left-0 mt-2 w-64 bg-[var(--bg-card)] rounded-xl shadow-xl border border-[var(--border-color)] z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            {sortOptions.map((option) => {
              const isSelected = value === option.value;
              return (
                <div key={option.value} className="border-b border-[var(--border-color)] last:border-b-0">
                  {/* Ascending option */}
                  <button
                    onClick={() => handleSelect(option.value, 'asc')}
                    className={`w-full text-left px-4 py-3 text-sm font-medium transition-all duration-200 ${isSelected && sortOrder === 'asc'
                        ? 'bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 text-purple-700 dark:text-purple-300 border-l-4 border-purple-600 dark:border-purple-500'
                        : 'text-[var(--text-secondary)] hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-purple-600 dark:hover:text-purple-400'
                      }`}
                  >
                    {option.labelAsc}
                  </button>
                  {/* Descending option (only for name and grade) */}
                  {option.value !== 'relevance' && (
                    <button
                      onClick={() => handleSelect(option.value, 'desc')}
                      className={`w-full text-left px-4 py-3 text-sm font-medium transition-all duration-200 ${isSelected && sortOrder === 'desc'
                          ? 'bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 text-purple-700 dark:text-purple-300 border-l-4 border-purple-600 dark:border-purple-500'
                          : 'text-[var(--text-secondary)] hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-purple-600 dark:hover:text-purple-400'
                        }`}
                    >
                      {option.labelDesc}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
