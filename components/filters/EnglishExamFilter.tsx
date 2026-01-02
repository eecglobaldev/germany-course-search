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
  selectedValue?: number; // For non-IELTS filters (backward compatibility)
  selectedValues?: number[]; // For IELTS multi-select
  notSpecified?: boolean; // For "Not Specified" option (IELTS only)
  onChange?: (value: number | undefined) => void; // For non-IELTS filters
  onChangeMultiple?: (values: number[]) => void; // For IELTS multi-select
  onNotSpecifiedChange?: (value: boolean) => void; // For "Not Specified" toggle
  scoreOptions: number[];
  allowMultiple?: boolean; // Enable multi-select mode
  showNotSpecified?: boolean; // Show "Not Specified" button
}

export default function EnglishExamFilter({
  title,
  examType,
  selectedValue,
  selectedValues,
  notSpecified,
  onChange,
  onChangeMultiple,
  onNotSpecifiedChange,
  scoreOptions,
  allowMultiple = false,
  showNotSpecified = false,
}: EnglishExamFilterProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  // Determine if this is multi-select mode (IELTS)
  const isMultiSelect = allowMultiple && onChangeMultiple !== undefined;
  const currentSelected = isMultiSelect ? (selectedValues || []) : (selectedValue !== undefined ? [selectedValue] : []);

  const handleScoreClick = (score: number) => {
    if (isMultiSelect) {
      // Multi-select mode: toggle score in array
      const newValues = currentSelected.includes(score)
        ? currentSelected.filter(s => s !== score)
        : [...currentSelected, score].sort((a, b) => a - b);
      onChangeMultiple!(newValues);
    } else {
      // Single-select mode: toggle single value
      if (onChange) {
        if (selectedValue === score) {
          onChange(undefined);
        } else {
          onChange(score);
        }
        setIsOpen(false);
      }
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMultiSelect) {
      onChangeMultiple!([]);
    } else {
      if (onChange) {
        onChange(undefined);
      }
    }
    setIsOpen(false);
  };

  const hasSelection = isMultiSelect
    ? currentSelected.length > 0 || notSpecified
    : selectedValue !== undefined;
  
  const displayText = isMultiSelect
    ? (() => {
        const parts = [];
        if (currentSelected.length > 0) {
          parts.push(`${currentSelected.length} score${currentSelected.length > 1 ? 's' : ''}`);
        }
        if (notSpecified) {
          parts.push('Not Specified');
        }
        return parts.length > 0 ? `${title} (${parts.join(', ')})` : title;
      })()
    : selectedValue !== undefined
    ? `${title} (≤${selectedValue})`
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
        <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {scoreOptions.map((score) => {
              const isSelected = isMultiSelect
                ? currentSelected.includes(score)
                : selectedValue === score;
              return (
                <button
                  key={score}
                  onClick={() => handleScoreClick(score)}
                  className={`w-full h-10 flex items-center justify-center text-sm font-medium rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${isSelected
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-500 dark:to-blue-500 text-white border-transparent shadow-lg'
                      : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-color)] hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-900/30 dark:hover:to-blue-900/30 hover:border-purple-300 dark:hover:border-purple-500/50 shadow-sm hover:shadow-md'
                    }`}
                >
                  {score}
                </button>
              );
            })}
          </div>
          {showNotSpecified && (
            <button
              onClick={() => {
                if (onNotSpecifiedChange) {
                  onNotSpecifiedChange(!notSpecified);
                }
              }}
              className={`w-full mt-2 h-10 flex items-center justify-center text-sm font-medium rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${notSpecified
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-500 dark:to-blue-500 text-white border-transparent shadow-lg'
                  : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-color)] hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-900/30 dark:hover:to-blue-900/30 hover:border-purple-300 dark:hover:border-purple-500/50 shadow-sm hover:shadow-md'
                }`}
            >
              Not Specified
            </button>
          )}
          {hasSelection && (
            <button
              onClick={handleClear}
              className="mt-3 text-xs font-semibold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent hover:from-purple-700 hover:to-blue-700 dark:hover:from-purple-300 dark:hover:to-blue-300 transition-all duration-300"
            >
              Clear selection
            </button>
          )}
        </div>
      )}
    </div>
  );
}
