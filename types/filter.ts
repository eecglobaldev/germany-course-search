/**
 * TypeScript types for Filter state
 * Based on FRONTEND_IMPLEMENTATION_PLAN.md Section 4.1
 */

export type SortBy = 'relevance' | 'name' | 'grade' | 'university' | 'city' | 'duration' | 'tuition';
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
  ieltsScores: number[]; // Selected IELTS scores - show courses requiring exactly these scores
  ieltsNotSpecified: boolean; // Show courses without IELTS requirement
  toeflIbtScore?: number; // User's TOEFL IBT score - show courses requiring <= this
  toeflPbtScore?: number; // User's TOEFL PBT score - show courses requiring <= this
  toeflCbtScore?: number; // User's TOEFL CBT score - show courses requiring <= this
  toeicScore?: number; // User's TOEIC score - show courses requiring <= this
  gradeScore?: number; // Selected grade - show courses requiring <= this (German grading: lower is better)
  gradeNotSpecified: boolean; // Show courses without grade requirement
  durationRange: [number, number];
  selectedIntakeMonths: string[];
  selectedIntakeSeason: 'winter' | 'summer'; // Single-select, mandatory
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
  selectedIntakeSeason: 'summer', // Mandatory, default to summer
  selectedCities: [],
  selectedUniversities: [],
  ieltsScores: [],
  ieltsNotSpecified: false,
  gradeNotSpecified: false,
  sortBy: 'relevance',
  sortOrder: 'asc',
  page: 1,
  itemsPerPage: 20,
};

