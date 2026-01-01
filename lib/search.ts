/**
 * Search utilities using Fuse.js for fuzzy search
 */

import Fuse from 'fuse.js';
import type { ProcessedCourse } from '@/types/course';

// Configure Fuse.js search
// Focus on course name, subject, and areas of concentration
const fuseOptions = {
  keys: [
    { name: 'courseName', weight: 0.4 },
    { name: 'subject', weight: 0.3 },
    { name: 'subjectDisplay', weight: 0.2 },
    { name: 'areasOfConcentration', weight: 0.1 },
  ],
  threshold: 0.4, // 0 = exact match, 1 = match anything (slightly more lenient)
  includeScore: true,
  minMatchCharLength: 2,
};

let fuseInstance: Fuse<ProcessedCourse> | null = null;

/**
 * Initialize Fuse.js with course data
 */
export function initializeSearch(courses: ProcessedCourse[]): void {
  fuseInstance = new Fuse(courses, fuseOptions);
}

/**
 * Search courses using Fuse.js
 */
export function searchCourses(query: string, courses: ProcessedCourse[]): ProcessedCourse[] {
  if (!query.trim()) {
    return courses;
  }

  // Always reinitialize to ensure we have the latest courses
  // This is safer than trying to check if collection changed
  initializeSearch(courses);

  if (!fuseInstance) {
    return courses;
  }

  const results = fuseInstance.search(query);
  return results.map((result) => result.item);
}

