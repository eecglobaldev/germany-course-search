/**
 * EnglishExamFilter Component
 * Shows clickable score options on first click, collapses after selection
 */

'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

interface EnglishExamFilterProps {
  title: string;
  examType: 'ielts' | 'toeflIbt' | 'toeflPbt' | 'toeflCbt' | 'toeic';
  selectedValue?: number;
  onChange: (value: number | undefined) => void;
  scoreOptions: number[];
}

export default function EnglishExamFilter({
  title,
  examType,
  selectedValue,
  onChange,
  scoreOptions,
}: EnglishExamFilterProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleScoreClick = (score: number) => {
    if (selectedValue === score) {
      // If clicking the same score, clear the filter
      onChange(undefined);
    } else {
      // Set the selected score
      onChange(score);
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
    ? `${title} (≤${selectedValue})`
    : title;

  return (
    <div className="border-b border-gray-200 dark:border-gray-800 pb-4 mb-4 relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left"
      >
        <span className="text-sm font-semibold text-gray-900 dark:text-white">
          {displayText}
        </span>
        <ChevronDown className={`h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="mt-2">
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
            {scoreOptions.map((score) => {
              const isSelected = selectedValue === score;
              return (
                <button
                  key={score}
                  onClick={() => handleScoreClick(score)}
                  className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                    isSelected
                      ? 'bg-blue-600 dark:bg-blue-500 text-white border-blue-600 dark:border-blue-500'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
                  }`}
                >
                  {score}
                </button>
              );
            })}
          </div>
          {selectedValue !== undefined && (
            <button
              onClick={handleClear}
              className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              Clear selection
            </button>
          )}
        </div>
      )}
    </div>
  );
}

