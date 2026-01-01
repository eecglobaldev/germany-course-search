/**
 * MultiSelectFilter Component
 * Reusable multi-select filter component with checkboxes
 * Shows dropdown on click, closes after selection
 */

'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

interface MultiSelectFilterProps {
  title: string;
  options: readonly string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

export default function MultiSelectFilter({
  title,
  options,
  selectedValues,
  onChange,
}: MultiSelectFilterProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggle = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
    // Keep open for multi-select - user may want to select multiple items
  };

  const selectedCount = selectedValues.length;
  const displayText = selectedCount > 0 
    ? `${title} (${selectedCount} selected)`
    : title;

  return (
    <div className="border-b border-white/20 pb-4 mb-4 relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left group hover:bg-white/30 rounded-lg p-2 -m-2 transition-all duration-300"
      >
        <span className="text-sm font-semibold text-gray-900 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
          {displayText}
        </span>
        <ChevronDown className={`h-4 w-4 text-gray-500 group-hover:text-purple-600 transition-all duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="mt-3 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
          {options.map((option) => {
            const isSelected = selectedValues.includes(option);
            return (
              <label
                key={option}
                className="flex items-center cursor-pointer hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 p-2 rounded-lg transition-all duration-300 group/option"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleToggle(option)}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded bg-white checked:bg-gradient-to-r checked:from-purple-600 checked:to-blue-600 transition-all duration-300"
                />
                <span className={`ml-3 text-sm transition-all duration-300 ${isSelected ? 'font-semibold text-gray-900' : 'text-gray-700'} group-hover/option:text-purple-700`}>{option}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

