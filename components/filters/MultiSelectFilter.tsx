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
  displayMap?: Record<string, string>; // Optional mapping for display labels
  maxHeight?: string; // Optional max height for scrollable dropdown (e.g., "200px", "10rem")
}

export default function MultiSelectFilter({
  title,
  options,
  selectedValues,
  onChange,
  displayMap,
  maxHeight,
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
    <div className="border-b border-[var(--border-color)] pb-4 mb-4 relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left group hover:bg-white/30 dark:hover:bg-slate-700/30 rounded-lg p-2 -m-2 transition-all duration-300"
      >
        <span className="text-sm font-semibold text-[var(--text-primary)] group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 dark:group-hover:from-purple-400 dark:group-hover:to-blue-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
          {displayText}
        </span>
        <ChevronDown className={`h-4 w-4 text-[var(--text-muted)] group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-all duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div 
          className={`mt-3 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300 ${maxHeight ? 'overflow-y-auto pr-2' : ''}`}
          style={maxHeight ? { maxHeight } : undefined}
        >
          {options.map((option) => {
            const isSelected = selectedValues.includes(option);
            return (
              <label
                key={option}
                className="flex items-center cursor-pointer hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-900/10 dark:hover:to-blue-900/10 p-2 rounded-lg transition-all duration-300 group/option"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleToggle(option)}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-[var(--border-color)] rounded bg-[var(--bg-card)] checked:bg-gradient-to-r checked:from-purple-600 checked:to-blue-600 transition-all duration-300"
                />
                <span className={`ml-3 text-sm transition-all duration-300 ${isSelected ? 'font-semibold text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'} group-hover/option:text-purple-700 dark:group-hover/option:text-purple-400`}>
                  {displayMap?.[option] || option}
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
