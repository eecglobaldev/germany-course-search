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
  const baseClasses = 'inline-flex items-center font-medium rounded-full border backdrop-blur-sm';
  
  const variantClasses = {
    default: 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-blue-200/50 shadow-sm hover:shadow-md transition-shadow',
    success: 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200/50 shadow-sm hover:shadow-md transition-shadow',
    warning: 'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border-amber-200/50 shadow-sm hover:shadow-md transition-shadow',
    info: 'bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 border-teal-200/50 shadow-sm hover:shadow-md transition-shadow',
    gray: 'bg-gradient-to-r from-gray-50 to-slate-50 text-gray-700 border-gray-200/50 shadow-sm hover:shadow-md transition-shadow',
  };
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
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
