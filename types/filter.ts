/**
 * TypeScript types for Filter state
 * Based on FRONTEND_IMPLEMENTATION_PLAN.md Section 4.1
 */

export type SortBy = 'relevance' | 'name' | 'university' | 'city' | 'duration' | 'tuition';
export type SortOrder = 'asc' | 'desc';
export type TuitionFilter = 'all' | 'free' | 'paid';

export interface FilterState {
  // Search
  searchQuery: string;
  
  // Filters
  selectedSubjects: string[];
  selectedDegreeLevels: string[];
  selectedDegreeTypes: string[];
  selectedStudyTypes: string[];
  selectedStudyModes: string[];
  selectedAdmissionModes: string[];
  tuitionModel: TuitionFilter;
  ieltsScore?: number; // User's IELTS score - show courses requiring <= this
  toeflIbtScore?: number; // User's TOEFL IBT score - show courses requiring <= this
  toeflPbtScore?: number; // User's TOEFL PBT score - show courses requiring <= this
  toeflCbtScore?: number; // User's TOEFL CBT score - show courses requiring <= this
  toeicScore?: number; // User's TOEIC score - show courses requiring <= this
  gradeScore?: number; // User's grade - show courses requiring <= this (German grading: lower is better)
  durationRange: [number, number];
  selectedIntakeMonths: string[];
  selectedCities: string[];
  selectedUniversities: string[];
  
  // Display
  sortBy: SortBy;
  sortOrder: SortOrder;
  page: number;
  itemsPerPage: number;
}

export const DEFAULT_FILTER_STATE: FilterState = {
  searchQuery: '',
  selectedSubjects: [],
  selectedDegreeLevels: [],
  selectedDegreeTypes: [],
  selectedStudyTypes: [],
  selectedStudyModes: [],
  selectedAdmissionModes: [],
  tuitionModel: 'all',
  durationRange: [1, 20], // 1 to 20 semesters
  selectedIntakeMonths: [],
  selectedCities: [],
  selectedUniversities: [],
  sortBy: 'relevance',
  sortOrder: 'asc',
  page: 1,
  itemsPerPage: 20,
};

