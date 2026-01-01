/**
 * Footer Component
 * Simple footer with project information
 */

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            Study in Germany Course Explorer
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
            Explore {2389} English-taught courses at German universities
          </p>
        </div>
      </div>
    </footer>
  );
}

