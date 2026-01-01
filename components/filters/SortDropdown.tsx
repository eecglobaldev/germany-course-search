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
        className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl hover:border-purple-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 shadow-sm hover:shadow-md group"
      >
        <span className="text-sm font-semibold text-gray-700 group-hover:text-purple-600 transition-colors">
          Sort by: <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{selectedLabel}</span>
        </span>
        <ChevronDown className={`h-4 w-4 text-gray-500 group-hover:text-purple-600 transition-all duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Overlay to close dropdown */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          {/* Dropdown menu */}
          <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            {sortOptions.map((option) => {
              const isSelected = value === option.value;
              return (
                <div key={option.value} className="border-b border-gray-100 last:border-b-0">
                  {/* Ascending option */}
                  <button
                    onClick={() => handleSelect(option.value, 'asc')}
                    className={`w-full text-left px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      isSelected && sortOrder === 'asc'
                        ? 'bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 border-l-4 border-purple-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-purple-600'
                    }`}
                  >
                    {option.labelAsc}
                  </button>
                  {/* Descending option (only for name and grade) */}
                  {option.value !== 'relevance' && (
                    <button
                      onClick={() => handleSelect(option.value, 'desc')}
                      className={`w-full text-left px-4 py-3 text-sm font-medium transition-all duration-200 ${
                        isSelected && sortOrder === 'desc'
                          ? 'bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 border-l-4 border-purple-600'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-purple-600'
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

