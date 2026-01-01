/**
 * Header Component
 * Top navigation bar with search and key metrics
 */

import React from 'react';

interface HeaderProps {
  resultsCount?: number;
}

export default function Header({ resultsCount }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Title */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">
              Study in Germany
            </h1>
            <span className="ml-2 text-sm text-gray-500">
              Course Explorer
            </span>
          </div>

          {/* Results Count */}
          {resultsCount !== undefined && (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">{resultsCount.toLocaleString()}</span>
                {' '}courses
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

