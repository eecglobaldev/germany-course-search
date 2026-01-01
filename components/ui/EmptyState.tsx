/**
 * EmptyState Component
 * Displayed when no results are found
 */

import React from 'react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title = 'No courses found',
  message = 'Try adjusting your search or removing some filters',
  actionLabel = 'Clear All Filters',
  onAction,
}: EmptyStateProps) {
  return (
    <div className="text-center py-16 px-4">
      <div className="relative inline-block mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
        <div className="relative text-7xl">🔍</div>
      </div>
      <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto text-lg">{message}</p>
      {onAction && (
        <button
          onClick={onAction}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-500 dark:to-blue-500 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 dark:hover:from-purple-600 dark:hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
