/**
 * GradeFilter Component
 * Shows clickable grade options on first click, collapses after selection
 */

'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

interface GradeFilterProps {
  selectedValue?: number;
  onChange: (value: number | undefined) => void;
  gradeOptions: number[];
}

export default function GradeFilter({
  selectedValue,
  onChange,
  gradeOptions,
}: GradeFilterProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleGradeClick = (grade: number) => {
    if (selectedValue === grade) {
      // If clicking the same grade, clear the filter
      onChange(undefined);
    } else {
      // Set the selected grade
      onChange(grade);
    }
    // Close after selection
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(undefined);
    setIsOpen(false);
  };

  const displayText = selectedValue !== undefined
    ? `Minimum Grade (≤${selectedValue})`
    : 'Minimum Grade';

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
        <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {gradeOptions.map((grade) => {
              const isSelected = selectedValue === grade;
              return (
                <button
                  key={grade}
                  onClick={() => handleGradeClick(grade)}
                  className={`w-full h-10 flex items-center justify-center text-sm font-medium rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-transparent shadow-lg'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:border-purple-300 shadow-sm hover:shadow-md'
                  }`}
                >
                  {grade}
                </button>
              );
            })}
          </div>
          {selectedValue !== undefined && (
            <button
              onClick={handleClear}
              className="mt-3 text-xs font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
            >
              Clear selection
            </button>
          )}
        </div>
      )}
    </div>
  );
}

