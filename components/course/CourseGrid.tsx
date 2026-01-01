/**
 * CourseGrid Component
 * Displays courses in a responsive grid layout
 */

import React from 'react';
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-lg p-5 animate-pulse"
          >
            <div className="h-6 bg-gray-200 rounded mb-3"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
            <div className="flex gap-2 mb-4">
              <div className="h-6 bg-gray-200 rounded w-20"></div>
              <div className="h-6 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="h-9 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          onExpand={onExpand}
        />
      ))}
    </div>
  );
}

