/**
 * Sort courses by deadline band priority
 * Order: Green, Yellow, Purple, Black+Green, Black+Yellow, Black+Purple, Red
 */

import type { ProcessedCourse } from '@/types/course';
import { getSemesterDeadlineStatus, getBandPriority } from './deadlineUtils';

/**
 * Sort courses by deadline band priority for a specific semester
 */
export function sortByDeadlineBand(
  courses: ProcessedCourse[],
  selectedSemester: 'winter' | 'summer'
): ProcessedCourse[] {
  const sorted = [...courses];

  sorted.sort((a, b) => {
    // Get deadline status for each course
    const aDeadline = getSemesterDeadlineStatus(
      a.deadlineWinter,
      a.deadlineSummer,
      selectedSemester
    );
    const bDeadline = getSemesterDeadlineStatus(
      b.deadlineWinter,
      b.deadlineSummer,
      selectedSemester
    );

    // Get band priority for each course
    const aPriority = getBandPriority(aDeadline.status, a.admissionMode);
    const bPriority = getBandPriority(bDeadline.status, b.admissionMode);

    // Sort by priority (lower number = higher priority)
    return aPriority - bPriority;
  });

  return sorted;
}
