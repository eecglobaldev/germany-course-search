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
    <div className="text-center py-12 px-4">
      <div className="text-gray-400 text-6xl mb-4">🔍</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{message}</p>
      {onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

