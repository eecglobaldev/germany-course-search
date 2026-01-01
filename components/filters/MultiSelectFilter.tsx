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
    <div className="border-b border-gray-200 pb-4 mb-4 relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left"
      >
        <span className="text-sm font-semibold text-gray-900">
          {displayText}
        </span>
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="mt-2 space-y-2">
          {options.map((option) => {
            const isSelected = selectedValues.includes(option);
            return (
              <label
                key={option}
                className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleToggle(option)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{option}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

