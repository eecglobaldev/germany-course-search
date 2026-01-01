/**
 * Badge Component
 * Premium badge design with dark mode support
 */

import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'info' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}: BadgeProps) {
  const baseClasses = 'inline-flex items-center font-medium rounded-full border shadow-sm backdrop-blur-sm transition-colors duration-300';

  const variantClasses = {
    default: 'bg-[var(--badge-default-bg)] text-[var(--badge-default-text)] border-[var(--badge-default-border)]',
    success: 'bg-[var(--badge-success-bg)] text-[var(--badge-success-text)] border-[var(--badge-success-border)]',
    warning: 'bg-[var(--badge-warning-bg)] text-[var(--badge-warning-text)] border-[var(--badge-warning-border)]',
    info: 'bg-[var(--badge-info-bg)] text-[var(--badge-info-text)] border-[var(--badge-info-border)]',
    gray: 'bg-[var(--badge-gray-bg)] text-[var(--badge-gray-text)] border-[var(--badge-gray-border)]',
  };

  const sizeClasses = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
}
