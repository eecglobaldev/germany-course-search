/**
 * Custom hook for loading and managing course data
 * Loads courses_processed.json from public directory
 */

'use client';

import { useState, useEffect, useMemo } from 'react';
import type { ProcessedCourse } from '@/types/course';

interface UseCourseDataReturn {
  courses: ProcessedCourse[];
  loading: boolean;
  error: Error | null;
  totalCount: number;
}

export function useCourseData(): UseCourseDataReturn {
  const [courses, setCourses] = useState<ProcessedCourse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadCourses() {
      try {
        setLoading(true);
        setError(null);

        // Load from public directory
        const response = await fetch('/courses_processed.json');
        
        if (!response.ok) {
          throw new Error(`Failed to load courses: ${response.statusText}`);
        }

        const data: ProcessedCourse[] = await response.json();
        
        // Validate data structure
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format: expected array');
        }

        setCourses(data);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error occurred');
        setError(error);
        console.error('Error loading courses:', error);
      } finally {
        setLoading(false);
      }
    }

    loadCourses();
  }, []);

  const totalCount = useMemo(() => courses.length, [courses]);

  return {
    courses,
    loading,
    error,
    totalCount,
  };
}

