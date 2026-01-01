/**
 * Filter utility functions
 * Implements filtering logic for courses
 */

import type { ProcessedCourse } from '@/types/course';
import type { FilterState } from '@/types/filter';

/**
 * Filter courses based on filter state
 * All filters use AND logic (except subject which uses OR)
 */
export function filterCourses(
  courses: ProcessedCourse[],
  filters: FilterState
): ProcessedCourse[] {
  return courses.filter((course) => {
    // Subject filter (OR logic)
    if (filters.selectedSubjects.length > 0) {
      const hasMatchingSubject = filters.selectedSubjects.some((subject) =>
        course.broadCategories.includes(subject)
      );
      if (!hasMatchingSubject) return false;
    }

    // Degree level filter (OR logic)
    if (filters.selectedDegreeLevels.length > 0) {
      if (!filters.selectedDegreeLevels.includes(course.degreeLevel)) {
        return false;
      }
    }

    // Degree type filter (OR logic)
    if (filters.selectedDegreeTypes.length > 0) {
      if (!filters.selectedDegreeTypes.includes(course.degreeType)) {
        return false;
      }
    }

    // Study type filter (OR logic)
    if (filters.selectedStudyTypes.length > 0) {
      if (!filters.selectedStudyTypes.includes(course.studyType)) {
        return false;
      }
    }

    // Study mode filter (OR logic - course can have multiple modes)
    if (filters.selectedStudyModes.length > 0) {
      const hasMatchingMode = filters.selectedStudyModes.some((mode) =>
        course.studyModes.includes(mode)
      );
      if (!hasMatchingMode) return false;
    }

    // Tuition filter
    if (filters.tuitionModel !== 'all') {
      if (course.tuitionModel !== filters.tuitionModel) {
        return false;
      }
    }

    // IELTS filter - show courses requiring <= user's score
    if (filters.ieltsScore !== undefined) {
      if (course.minIelts === null || course.minIelts === undefined) {
        // Include courses with unknown IELTS requirements
        // This is intentional - don't hide courses with missing data
      } else if (course.minIelts > filters.ieltsScore) {
        return false; // Course requires higher score than user has
      }
    }

    // TOEFL IBT filter - show courses requiring <= user's score
    if (filters.toeflIbtScore !== undefined) {
      if (course.minToeflIbt === null || course.minToeflIbt === undefined) {
        // Include courses with unknown TOEFL IBT requirements
      } else if (course.minToeflIbt > filters.toeflIbtScore) {
        return false; // Course requires higher score than user has
      }
    }

    // TOEFL PBT filter - show courses requiring <= user's score
    if (filters.toeflPbtScore !== undefined) {
      if (course.minToeflPbt === null || course.minToeflPbt === undefined) {
        // Include courses with unknown TOEFL PBT requirements
      } else if (course.minToeflPbt > filters.toeflPbtScore) {
        return false; // Course requires higher score than user has
      }
    }

    // TOEFL CBT filter - show courses requiring <= user's score
    if (filters.toeflCbtScore !== undefined) {
      if (course.minToeflCbt === null || course.minToeflCbt === undefined) {
        // Include courses with unknown TOEFL CBT requirements
      } else if (course.minToeflCbt > filters.toeflCbtScore) {
        return false; // Course requires higher score than user has
      }
    }

    // TOEIC filter - show courses requiring <= user's score
    if (filters.toeicScore !== undefined) {
      if (course.minToeic === null || course.minToeic === undefined) {
        // Include courses with unknown TOEIC requirements
      } else if (course.minToeic > filters.toeicScore) {
        return false; // Course requires higher score than user has
      }
    }

    // Grade filter - show courses requiring <= user's grade (German grading: lower is better)
    if (filters.gradeScore !== undefined) {
      if (course.minGrade === null || course.minGrade === undefined) {
        // Include courses with unknown grade requirements
      } else if (course.minGrade > filters.gradeScore) {
        return false; // Course requires better grade (lower number) than user has
      }
    }

    // Duration filter
    const [minDuration, maxDuration] = filters.durationRange;
    if (
      course.durationSemesters < minDuration ||
      course.durationSemesters > maxDuration
    ) {
      return false;
    }

    // Intake months filter (array overlap)
    if (filters.selectedIntakeMonths.length > 0) {
      const hasMatchingMonth = filters.selectedIntakeMonths.some((month) =>
        course.intakeMonths.includes(month)
      );
      if (!hasMatchingMonth) return false;
    }

    // Admission mode filter (OR logic - multi-select)
    if (filters.selectedAdmissionModes.length > 0) {
      if (!filters.selectedAdmissionModes.includes(course.admissionMode)) {
        return false;
      }
    }

    // City filter (OR logic)
    if (filters.selectedCities.length > 0) {
      const hasMatchingCity = filters.selectedCities.some((city) =>
        course.city.toLowerCase() === city.toLowerCase() ||
        course.cities?.some((c) => c.toLowerCase() === city.toLowerCase())
      );
      if (!hasMatchingCity) return false;
    }

    // University filter (OR logic)
    if (filters.selectedUniversities.length > 0) {
      if (!filters.selectedUniversities.includes(course.university)) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Sort courses based on sort criteria
 */
export function sortCourses(
  courses: ProcessedCourse[],
  sortBy: FilterState['sortBy'],
  sortOrder: FilterState['sortOrder']
): ProcessedCourse[] {
  const sorted = [...courses];

  sorted.sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'name':
        comparison = a.courseName.localeCompare(b.courseName);
        break;
      case 'university':
        comparison = a.university.localeCompare(b.university);
        break;
      case 'city':
        comparison = a.city.localeCompare(b.city);
        break;
      case 'duration':
        comparison = a.durationSemesters - b.durationSemesters;
        break;
      case 'tuition':
        const aTuition = a.tuitionAmountApprox ?? Infinity;
        const bTuition = b.tuitionAmountApprox ?? Infinity;
        comparison = aTuition - bTuition;
        break;
      case 'relevance':
      default:
        // Relevance sorting would be handled by search
        comparison = 0;
        break;
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return sorted;
}

