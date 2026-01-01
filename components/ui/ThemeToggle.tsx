'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-slate-800 animate-pulse" />
    );
  }

  // Explicitly determine state
  const isDark = resolvedTheme === 'dark';

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      // CONDITIONAL CLASSES:
      // We force the background color based on the JS 'isDark' state.
      // This prevents the "Split Brain" issue where the Icon is Light but the CSS thinks it's Dark.
      className={`
        relative w-9 h-9 rounded-full flex items-center justify-center 
        border transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500/50 shadow-sm
        ${isDark
          ? 'bg-slate-900 border-slate-700 hover:border-purple-500'
          : 'bg-white border-gray-200 hover:border-purple-500'}
      `}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 0 : 1,
          opacity: isDark ? 0 : 1,
          rotate: isDark ? 180 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun className="h-5 w-5 text-amber-500" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 1 : 0,
          opacity: isDark ? 1 : 0,
          rotate: isDark ? 0 : -180,
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon className="h-4.5 w-4.5 text-blue-400" />
      </motion.div>
    </motion.button>
  );
}
