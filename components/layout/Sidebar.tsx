/**
 * Sidebar Component
 * Premium glassmorphism sidebar with animations
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SidebarProps {
  children?: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto relative z-10"
    >
      <div className="p-4 sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white tracking-tight">
          Filters
        </h2>
      </div>
      <div className="px-4 pb-4">
        {children || (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Filter components will be added here
          </p>
        )}
      </div>
    </motion.aside>
  );
}
