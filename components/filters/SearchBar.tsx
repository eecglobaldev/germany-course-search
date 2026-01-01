/**
 * SearchBar Component
 * Global search with debouncing
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search courses, universities, cities...',
  debounceMs = 300,
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);

    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set new timer
    debounceTimer.current = setTimeout(() => {
      onChange(newValue);
    }, debounceMs);
  };

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-[var(--text-muted)] group-hover:text-purple-500 transition-colors duration-300" />
        </div>
        <input
          type="text"
          value={localValue}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          className="block w-full pl-12 pr-12 py-3.5 border-2 border-[var(--border-color)] rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-[var(--bg-glass)] backdrop-blur-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] shadow-lg hover:shadow-xl transition-all duration-300 focus:bg-[var(--bg-card)]"
        />
        {localValue && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-[var(--text-muted)] hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
