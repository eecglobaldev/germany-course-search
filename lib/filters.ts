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
    // Subject filter (OR logic) - consolidated study fields (broadCategories)
    if (filters.selectedSubjects.length > 0) {
      const categories = course.broadCategories ?? [];
      if (categories.length === 0) return false;

      const hasMatching = filters.selectedSubjects.some((selected) =>
        categories.some((cat) => cat.toLowerCase() === selected.toLowerCase())
      );

      if (!hasMatching) return false;
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

    // IELTS filter - show courses requiring exactly the selected scores or "Not Specified"
    const hasIeltsFilter = filters.ieltsScores.length > 0 || filters.ieltsNotSpecified;
    
    if (hasIeltsFilter) {
      const hasIeltsScore = course.minIelts !== null && course.minIelts !== undefined;
      const courseIeltsScore = course.minIelts;
      
      let matchesFilter = false;
      
      // Check if course matches "Not Specified" filter
      if (filters.ieltsNotSpecified && !hasIeltsScore) {
        matchesFilter = true;
      }
      
      // Check if course matches selected scores
      if (filters.ieltsScores.length > 0 && hasIeltsScore && courseIeltsScore !== undefined) {
        if (filters.ieltsScores.includes(courseIeltsScore)) {
          matchesFilter = true;
        }
      }
      
      // If filter is active but course doesn't match, exclude it
      if (!matchesFilter) {
        return false;
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

    // Grade filter - show courses requiring <= selected grade or "Not Specified"
    const hasGradeFilter = filters.gradeScore !== undefined || filters.gradeNotSpecified;
    
    if (hasGradeFilter) {
      const hasGrade = course.minGrade !== null && course.minGrade !== undefined;
      const courseGrade = course.minGrade;
      
      let matchesFilter = false;
      
      // Check if course matches "Not Specified" filter
      if (filters.gradeNotSpecified && !hasGrade) {
        matchesFilter = true;
      }
      
      // Check if course matches selected grade (show courses with grade >= selected)
      // German grading: lower is better (1.0 = best, 3.0 = minimum passing)
      // If user selects 2.0, show courses requiring 2.0 or higher (2.0, 2.2, 2.3, 2.5, 2.6, 2.7, 2.8, 2.9, 3.0)
      if (filters.gradeScore !== undefined && hasGrade && courseGrade !== undefined) {
        if (courseGrade >= filters.gradeScore) {
          matchesFilter = true;
        }
      }
      
      // If filter is active but course doesn't match, exclude it
      if (!matchesFilter) {
        return false;
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

    // Intake season filter (mandatory, single-select)
    const selectedSeason = filters.selectedIntakeSeason;
    if (selectedSeason === 'summer') {
      // Include if: intakeSeason is 'summer' or 'all', OR has summer deadline
      if (!(course.intakeSeason === 'summer' || 
            course.intakeSeason === 'all' || 
            course.deadlineSummer)) {
        return false;
      }
    } else if (selectedSeason === 'winter') {
      // Include if: intakeSeason is 'winter' or 'all', OR has winter deadline
      if (!(course.intakeSeason === 'winter' || 
            course.intakeSeason === 'all' || 
            course.deadlineWinter)) {
        return false;
      }
    }

    // Admission mode filter (OR logic - multi-select)
    if (filters.selectedAdmissionModes.length > 0) {
      if (!filters.selectedAdmissionModes.includes(course.admissionMode)) {
        return false;
      }
    }

    // City filter (OR logic)
    if (filters.selectedCities.length > 0) {
      // Extract all cities from course (handle comma-separated cities)
      const courseCities: string[] = [];
      if (course.city) {
        const splitCities = course.city.split(',').map(c => c.trim()).filter(c => c);
        courseCities.push(...splitCities);
      }
      if (course.cities) {
        course.cities.forEach((city) => {
          if (city) {
            const splitCities = city.split(',').map(c => c.trim()).filter(c => c);
            courseCities.push(...splitCities);
          }
        });
      }
      
      // Check if any selected city matches any course city (case-insensitive)
      const hasMatchingCity = filters.selectedCities.some((selectedCity) =>
        courseCities.some((courseCity) => 
          courseCity.toLowerCase() === selectedCity.toLowerCase()
        )
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
      case 'grade':
        // German grading: lower is better (1.0 = excellent, 3.0 = minimum passing)
        // Sort courses with lower grade requirements first
        const aGrade = a.minGrade ?? Infinity;
        const bGrade = b.minGrade ?? Infinity;
        comparison = aGrade - bGrade;
        break;
      case 'relevance':
      default:
        // Relevance sorting would be handled by search - keep original order
        comparison = 0;
        break;
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return sorted;
}

