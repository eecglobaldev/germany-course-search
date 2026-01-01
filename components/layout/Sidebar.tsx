/**
 * Sidebar Component (Skeleton)
 * Will contain filter components - placeholder for now
 */

import React from 'react';

interface SidebarProps {
  children?: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Filters
        </h2>
        {children || (
          <p className="text-sm text-gray-500">
            Filter components will be added here
          </p>
        )}
      </div>
    </aside>
  );
}

