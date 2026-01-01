/**
 * Header Component
 * Premium glassmorphism navbar with theme toggle
 */

'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';

interface HeaderProps {
  resultsCount?: number;
}

export default function Header({ resultsCount }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  const handleClick = () => {
    console.log('Button clicked, current theme:', theme);
    toggleTheme();
    console.log('After toggleTheme call');
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Title */}
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Study in Germany
            </h1>
            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Course Explorer
            </span>
          </div>

          {/* Right side: Results Count + Theme Toggle */}
          <div className="flex items-center gap-6">
            {/* Results Count */}
            {resultsCount !== undefined && (
              <div className="hidden sm:flex items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold text-gray-900 dark:text-white">{resultsCount.toLocaleString()}</span>
                  {' '}courses
                </span>
              </div>
            )}

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={handleClick}
              className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 group cursor-pointer"
              aria-label="Toggle theme"
            >
              <div className="relative w-5 h-5 pointer-events-none">
                <Sun 
                  className="absolute inset-0 w-5 h-5 text-gray-700 dark:text-gray-300 transition-all duration-300 rotate-0 scale-100 opacity-100 dark:rotate-90 dark:scale-0 dark:opacity-0"
                />
                <Moon 
                  className="absolute inset-0 w-5 h-5 text-gray-700 dark:text-gray-300 transition-all duration-300 -rotate-90 scale-0 opacity-0 dark:rotate-0 dark:scale-100 dark:opacity-100"
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
