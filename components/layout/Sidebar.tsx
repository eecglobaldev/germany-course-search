/**
 * Sidebar Component
 * Premium glassmorphism sidebar with animations
 * Collapsible on mobile devices
 */

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface SidebarProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ children, isOpen = true, onClose }: SidebarProps) {
  const [isMobile, setIsMobile] = React.useState(true);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // On desktop, always show sidebar regardless of isOpen
  const sidebarX = isMobile ? (isOpen ? 0 : -320) : 0;

  return (
    <>
      {/* Mobile Overlay - Only show on mobile when sidebar is open */}
      <AnimatePresence>
        {isOpen && onClose && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: sidebarX,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`
          ${isMobile ? 'fixed' : 'static'}
          top-0 left-0
          ${isMobile && !isOpen ? 'w-0 overflow-hidden' : 'w-64'}
          h-full
          glass border-r border-[var(--glass-border)]
          overflow-y-auto
          relative z-50 lg:z-10
          shadow-xl
          ${isMobile && !isOpen ? 'pointer-events-none opacity-0' : 'opacity-100'}
          transition-all duration-300
        `}
      >
        {/* Mobile Header with Close Button */}
        <div className="p-4 sticky top-0 glass border-b border-[var(--glass-border)] mb-4 backdrop-blur-xl flex items-center justify-between lg:justify-start">
          <h2 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent tracking-tight">
            Filters
          </h2>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-white/30 dark:hover:bg-white/10 transition-colors"
              aria-label="Close filters"
            >
              <X className="h-5 w-5 text-[var(--text-secondary)]" />
            </button>
          )}
        </div>
        <div className="px-4 pb-4 text-[var(--text-primary)]">
          {children || (
            <p className="text-sm text-[var(--text-secondary)]">
              Filter components will be added here
            </p>
          )}
        </div>
      </motion.aside>
    </>
  );
}
