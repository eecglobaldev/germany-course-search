/**
 * Header Component
 * Premium glassmorphism navbar
 */

'use client';

import React from 'react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

interface HeaderProps {
  resultsCount?: number;
}

export default function Header({ resultsCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 glass border-b border-white/20 dark:border-white/10 shadow-lg backdrop-blur-xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Title */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-20"></div>
              <h1 className="relative text-xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Study in Germany
              </h1>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium hidden sm:inline">
              Course Explorer
            </span>
          </div>

          {/* Right side: Results Count + Theme Toggle */}
          <div className="flex items-center gap-4">
            {/* Results Count */}
            {resultsCount !== undefined && (
              <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-100 dark:border-purple-800/30">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {resultsCount.toLocaleString()}
                  </span>
                  {' '}
                  <span className="text-gray-600 dark:text-gray-400">courses</span>
                </span>
              </div>
            )}

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
