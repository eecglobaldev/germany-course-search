/**
 * CourseGrid Component
 * Bento Box grid layout with varied card sizes
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CourseCard from './CourseCard';
import EmptyState from '@/components/ui/EmptyState';
import type { ProcessedCourse } from '@/types/course';

interface CourseGridProps {
  courses: ProcessedCourse[];
  loading?: boolean;
  onExpand?: (course: ProcessedCourse) => void;
}

export default function CourseGrid({ courses, loading, onExpand }: CourseGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl p-5 animate-pulse border border-gray-200 dark:border-gray-700 h-full"
          >
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/2"></div>
            <div className="flex gap-2 mb-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            </div>
            <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return <EmptyState />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      {courses.map((course, index) => (
        <CourseCard
          key={course.id}
          course={course}
          onExpand={onExpand}
          index={index}
        />
      ))}
    </motion.div>
  );
}
