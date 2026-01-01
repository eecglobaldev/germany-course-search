/**
 * Header Component
 * Premium glassmorphism navbar
 */

'use client';

import React from 'react';

interface HeaderProps {
  resultsCount?: number;
}

export default function Header({ resultsCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 glass border-b border-white/20 shadow-lg backdrop-blur-xl">
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
            <span className="text-sm text-gray-600 font-medium hidden sm:inline">
              Course Explorer
            </span>
          </div>

          {/* Right side: Results Count */}
          <div className="flex items-center gap-6">
            {/* Results Count */}
            {resultsCount !== undefined && (
              <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100">
                <span className="text-sm text-gray-700">
                  <span className="font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {resultsCount.toLocaleString()}
                  </span>
                  {' '}
                  <span className="text-gray-600">courses</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
