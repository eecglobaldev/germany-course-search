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
            {scoreOptions.map((score) => {
              const isSelected = selectedValue === score;
              return (
                <button
                  key={score}
                  onClick={() => handleScoreClick(score)}
                  className={`w-full h-10 flex items-center justify-center text-sm font-medium rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-transparent shadow-lg'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:border-purple-300 shadow-sm hover:shadow-md'
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

