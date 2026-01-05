/**
 * Intake Season Filter Component
 * Single-select, mandatory filter for Winter/Summer intake
 */

'use client';

import React from 'react';

interface IntakeSeasonFilterProps {
  selectedSeason: 'winter' | 'summer';
  onChange: (season: 'winter' | 'summer') => void;
}

export default function IntakeSeasonFilter({ selectedSeason, onChange }: IntakeSeasonFilterProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Intake Semester</h3>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onChange('winter')}
          className={`flex-1 px-4 py-2 rounded-lg border transition-all duration-200 text-sm font-medium ${
            selectedSeason === 'winter'
              ? 'bg-blue-500 text-white border-blue-500 shadow-md dark:bg-blue-600 dark:border-blue-600'
              : 'bg-[var(--bg-card)] text-[var(--text-primary)] border-[var(--border-color)] hover:border-blue-300 dark:hover:border-blue-600'
          }`}
        >
          Winter
        </button>
        <button
          type="button"
          onClick={() => onChange('summer')}
          className={`flex-1 px-4 py-2 rounded-lg border transition-all duration-200 text-sm font-medium ${
            selectedSeason === 'summer'
              ? 'bg-blue-500 text-white border-blue-500 shadow-md dark:bg-blue-600 dark:border-blue-600'
              : 'bg-[var(--bg-card)] text-[var(--text-primary)] border-[var(--border-color)] hover:border-blue-300 dark:hover:border-blue-600'
          }`}
        >
          Summer
        </button>
      </div>
    </div>
  );
}
